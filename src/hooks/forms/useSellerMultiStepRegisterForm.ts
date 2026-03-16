'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { apolloClient } from '@/lib/graphql-client';
import { SIGNUP, CREATE_STORE } from '@/graphql/mutations';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useClientAuth } from '@/hooks/useClientAuth';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000';

const fullFormSchema = z.object({
  fullName: z.string().min(3, 'Nome completo deve ter no mínimo 3 caracteres'),
  email: z.string().email('E-mail inválido').min(1, 'E-mail é obrigatório'),
  password: z.string().min(8, 'Senha deve ter no mínimo 8 caracteres'),
  confirmPassword: z.string().min(1, 'Confirme sua senha'),
  nif: z.string().min(8, 'NIF deve ter pelo menos 8 dígitos'),
  razaoSocial: z.string().min(3, 'Razão social é obrigatória'),
  nomeFantasia: z.string().min(3, 'Nome da loja é obrigatório'),
  category: z.string().min(1, 'Selecione uma categoria'),
  alvaraComercial: z.instanceof(File).optional().nullable(),
  licencaVenda: z.instanceof(File).optional().nullable(),
  localizacaoFisica: z.instanceof(File).optional().nullable(),
  logotipo: z.instanceof(File).optional().nullable(),
  imagemCapa: z.instanceof(File).optional().nullable(),
  fotosEspaco: z.instanceof(File).array().optional().default([]),
}).refine(data => data.password === data.confirmPassword, {
  message: 'As senhas não coincidem',
  path: ['confirmPassword'],
});

export type SellerMultiStepFormData = z.infer<typeof fullFormSchema>;

interface SignupResponse {
  signup: {
    token: string;
    user: {
      id: string;
      email: string;
      fullName: string;
      role: string;
    };
  };
}

interface CreateStoreResponse {
  createStore: {
    id: string;
    name: string;
    slug: string;
  };
}

/** Upload a single File to the backend REST endpoint. Returns the URL. */
async function uploadFile(file: File, token: string, folder = 'stores'): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);

  const res = await fetch(`${BACKEND_URL}/upload?folder=${folder}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Upload falhou' }));
    throw new Error(err.error || 'Upload falhou');
  }

  const json = await res.json();
  return json.url as string;
}

export function useSellerMultiStepRegisterForm() {
  const locale = useLocale();
  const router = useRouter();
  const { setUser } = useClientAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, File | File[]>>({});

  const registerMutation = useMutation({
    mutationFn: async (data: SellerMultiStepFormData) => {
      // ── Step 1: Create user account ────────────────────────────────
      const { data: signupResponse } = await apolloClient.mutate<SignupResponse>({
        mutation: SIGNUP,
        variables: {
          input: {
            email: data.email,
            password: data.password,
            fullName: data.fullName,
            role: 'SELLER',
          },
        },
      });

      if (!signupResponse?.signup) {
        throw new Error('Falha ao criar conta de lojista');
      }

      const { token, user } = signupResponse.signup;

      // ── Step 2: Upload files ───────────────────────────────────────
      const uploadResults: {
        logoUrl?: string;
        coverImageUrl?: string;
      } = {};

      if (data.logotipo instanceof File) {
        uploadResults.logoUrl = await uploadFile(data.logotipo, token, 'stores');
      }

      if (data.imagemCapa instanceof File) {
        uploadResults.coverImageUrl = await uploadFile(data.imagemCapa, token, 'stores');
      }

      // Documents go to 'proofs' folder
      if (data.alvaraComercial instanceof File) {
        await uploadFile(data.alvaraComercial, token, 'proofs');
      }
      if (data.licencaVenda instanceof File) {
        await uploadFile(data.licencaVenda, token, 'proofs');
      }
      if (data.localizacaoFisica instanceof File) {
        await uploadFile(data.localizacaoFisica, token, 'proofs');
      }
      if (data.fotosEspaco && data.fotosEspaco.length > 0) {
        await Promise.all(data.fotosEspaco.map(f => uploadFile(f, token, 'stores')));
      }

      // ── Step 3: Create the store ───────────────────────────────────
      const { data: storeResponse } = await apolloClient.mutate<CreateStoreResponse>({
        mutation: CREATE_STORE,
        variables: {
          input: {
            ownerId: user.id,
            name: data.nomeFantasia,
            description: data.razaoSocial,
            location: data.nif,
            ...uploadResults,
          },
        },
      });

      if (!storeResponse?.createStore) {
        throw new Error('Conta criada, mas falha ao criar a loja. Tente novamente.');
      }

      return { user, token };
    },
    onSuccess: ({ user }) => {
      setError(null);
      setUser({
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: (user.role as 'BUYER' | 'SELLER' | 'ADMIN') || 'SELLER',
      });

      setTimeout(() => {
        router.push(`/${locale}/seller/onboarding`);
      }, 500);
    },
    onError: (err) => {
      const errorMessage = err instanceof Error ? err.message : 'Falha ao criar conta';
      setError(errorMessage);
      console.error('Seller multi-step register error:', err);
    },
  });

  const form = useForm<SellerMultiStepFormData>({
    resolver: zodResolver(fullFormSchema) as any,
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
      nif: '',
      razaoSocial: '',
      nomeFantasia: '',
      category: '',
      alvaraComercial: undefined,
      licencaVenda: undefined,
      localizacaoFisica: undefined,
      logotipo: undefined,
      imagemCapa: undefined,
      fotosEspaco: [],
    },
    mode: 'onChange',
  });

  const handleNextStep = async () => {
    let fieldsToValidate: (keyof SellerMultiStepFormData)[] = [];

    if (currentStep === 1) {
      fieldsToValidate = ['fullName', 'email', 'password', 'confirmPassword'];
    } else if (currentStep === 2) {
      fieldsToValidate = ['nif', 'razaoSocial', 'nomeFantasia', 'category'];
    } else if (currentStep === 3) {
      fieldsToValidate = ['alvaraComercial', 'licencaVenda', 'localizacaoFisica'];
    } else if (currentStep === 4) {
      fieldsToValidate = ['logotipo', 'imagemCapa', 'fotosEspaco'];
    }

    const isValid = await form.trigger(fieldsToValidate);
    if (isValid && currentStep < 4) {
      setCurrentStep(currentStep + 1);
      setError(null);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setError(null);
    }
  };

  const handleSubmit = form.handleSubmit((data) => {
    if (currentStep !== 4) return;
    registerMutation.mutate(data);
  });

  const handleFileUpload = (fieldName: string, file: File) => {
    setUploadedFiles(prev => ({ ...prev, [fieldName]: file }));
    form.setValue(fieldName as any, file);
  };

  const handleMultipleFileUpload = (fieldName: string, files: FileList) => {
    const fileArray = Array.from(files);
    setUploadedFiles(prev => ({ ...prev, [fieldName]: fileArray }));
    form.setValue(fieldName as any, fileArray);
  };

  return {
    form,
    currentStep,
    handleNextStep,
    handlePreviousStep,
    handleSubmit,
    handleFileUpload,
    handleMultipleFileUpload,
    showPassword,
    showConfirmPassword,
    togglePasswordVisibility: () => setShowPassword(v => !v),
    toggleConfirmPasswordVisibility: () => setShowConfirmPassword(v => !v),
    isLoading: registerMutation.isPending,
    error,
    uploadedFiles,
  };
}
