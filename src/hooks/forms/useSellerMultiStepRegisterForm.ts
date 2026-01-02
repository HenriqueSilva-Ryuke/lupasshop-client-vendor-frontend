'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { apolloClient } from '@/lib/graphql-client';
import { SIGNUP } from '@/graphql/mutations';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useClientAuth } from '@/hooks/useClientAuth';

const fullFormSchema = z.object({
  fullName: z.string().min(3, 'Nome completo deve ter no mínimo 3 caracteres'),
  email: z.string().email('E-mail inválido').min(1, 'E-mail é obrigatório'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
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

export function useSellerMultiStepRegisterForm() {
  const locale = useLocale();
  const router = useRouter();
  const { setUser, setToken } = useClientAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, File | File[]>>({});

  const registerMutation = useMutation({
    mutationFn: async (data: SellerMultiStepFormData) => {
      // Aqui você implementaria upload de arquivos para um serviço de storage
      // Por enquanto, vamos apenas prosseguir com a autenticação
      const { data: response } = await apolloClient.mutate<SignupResponse>({
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

      if (!response?.signup) {
        throw new Error('Falha ao criar conta de lojista');
      }

      return response.signup;
    },
    onSuccess: (data) => {
      setError(null);
      
      if (data.token) {
        setToken(data.token);
        localStorage.setItem('authToken', data.token);
      }

      if (data.user) {
        setUser({
          id: data.user.id,
          email: data.user.email,
          fullName: data.user.fullName,
          role: (data.user.role as 'BUYER' | 'SELLER' | 'ADMIN') || 'SELLER',
        });
      }

      setTimeout(() => {
        router.push(`/${locale}/seller/dashboard`);
      }, 500);
    },
    onError: (err) => {
      const errorMessage = err instanceof Error ? err.message : 'Falha ao criar conta';
      setError(errorMessage);
      console.error('Seller multi-step register error:', err);
    },
  });

  const fullSchema = z.object({
    fullName: z.string().min(3, 'Nome completo deve ter no mínimo 3 caracteres'),
    email: z.string().email('E-mail inválido').min(1, 'E-mail é obrigatório'),
    password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
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

  const form = useForm<SellerMultiStepFormData>({
    resolver: zodResolver(fullSchema) as any,
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
    // Validate only current step fields
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
    registerMutation.mutate(data);
  });

  const handleFileUpload = (fieldName: string, file: File) => {
    setUploadedFiles(prev => ({
      ...prev,
      [fieldName]: file,
    }));
    form.setValue(fieldName as any, file);
  };

  const handleMultipleFileUpload = (fieldName: string, files: FileList) => {
    const fileArray = Array.from(files);
    setUploadedFiles(prev => ({
      ...prev,
      [fieldName]: fileArray,
    }));
    form.setValue(fieldName as any, fileArray);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
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
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
    isLoading: registerMutation.isPending,
    error,
    uploadedFiles,
  };
}
