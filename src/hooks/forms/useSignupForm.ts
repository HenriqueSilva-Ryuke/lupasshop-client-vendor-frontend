import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SignupSchema, SignupInput } from '@/lib/validations';
import { useAuth } from '../useAuth';

export const useSignupForm = () => {
  const { register: registerUser } = useAuth();
  
  const form = useForm<SignupInput>({
    resolver: zodResolver(SignupSchema),
    defaultValues: {
      email: '',
      password: '',
      fullName: '',
      role: 'BUYER',
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    await registerUser({ 
      name: data.fullName, 
      email: data.email, 
      password: data.password 
    });
  });

  return {
    form,
    onSubmit,
    isLoading: false,
    error: null,
  };
};
