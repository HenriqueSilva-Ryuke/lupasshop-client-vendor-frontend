import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateStoreSchema, CreateStoreInput } from '@/lib/validations';
import { useCreateStore } from '../useStores';
import { useClientAuth } from '@/hooks/useClientAuth';

export const useCreateStoreForm = () => {
  const { user } = useClientAuth();
  const createStore = useCreateStore();
  
  const form = useForm<CreateStoreInput>({
    resolver: zodResolver(CreateStoreSchema),
    defaultValues: {
      name: '',
      description: '',
      location: '',
      ownerId: user?.id || '',
      isPremium: false,
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    createStore.mutate(data);
  });

  return {
    form,
    onSubmit,
    isLoading: createStore.isPending,
    error: createStore.error,
    isSuccess: createStore.isSuccess,
  };
};
