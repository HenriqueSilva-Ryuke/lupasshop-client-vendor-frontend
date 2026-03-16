import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreateStoreSchema, CreateStoreInput } from '@/lib/validations';
import { generateSlug } from '@/lib/slug';
import { useCreateStore } from '../useStores';
import { useClientAuth } from '@/hooks/useClientAuth';

export const useCreateStoreForm = () => {
  const { user } = useClientAuth();
  const createStore = useCreateStore();
  
  const form = useForm<CreateStoreInput>({
    resolver: zodResolver(CreateStoreSchema),
    defaultValues: {
      name: '',
      slug: '',
      description: '',
      location: '',
      ownerId: user?.id || '',
      isPremium: false,
    },
  });

  const onSubmit = form.handleSubmit((data) => {
    // Auto-generate slug from name if not provided
    if (!data.slug || data.slug.trim() === '') {
      data.slug = generateSlug(data.name);
    }
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
