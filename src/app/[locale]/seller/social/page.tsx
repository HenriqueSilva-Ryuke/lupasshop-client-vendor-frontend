'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useSellerStore } from '@/hooks/useSellerStore';
import { apolloClient } from '@/lib/graphql-client';
import { UPDATE_STORE } from '@/graphql/mutations';
import { Facebook, Instagram, Save, Smartphone } from 'lucide-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function SocialPage() {
  const { user } = useAuth();
  const { data: store, isLoading } = useSellerStore(user?.id);
  const queryClient = useQueryClient();

  const [instagramUrl, setInstagramUrl] = useState('');
  const [facebookUrl, setFacebookUrl] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');

  useEffect(() => {
    if (store) {
      setInstagramUrl(store.instagramUrl || '');
      setFacebookUrl(store.facebookUrl || '');
      setWhatsappNumber(store.whatsappNumber || '');
    }
  }, [store]);

  const updateMutation = useMutation({
    mutationFn: async (input: any) => {
      if (!store?.id) throw new Error('Store ID missing');
      return apolloClient.mutate({
        mutation: UPDATE_STORE,
        variables: { id: store.id, input },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sellerStore', user?.id] });
      alert('Redes sociais atualizadas!');
    },
  });

  const handleSave = () => {
    updateMutation.mutate({
      instagramUrl,
      facebookUrl,
      whatsappNumber,
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="w-full relative bg-background-light min-h-screen">
      <header className="sticky top-0 z-20 w-full bg-card/95 backdrop-blur-md border-b border-border">
        <div className="px-6 py-4 lg:px-10">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl lg:text-3xl font-black leading-tight tracking-[-0.033em]">
                Redes Sociais
              </h1>
              <p className="text-sm lg:text-base font-normal text-muted-foreground">
                Conecte suas redes para aumentar o engajamento
              </p>
            </div>
            <button
              onClick={handleSave}
              disabled={updateMutation.isPending}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 disabled:opacity-50"
            >
              {updateMutation.isPending ? 'Salvando...' : <Save className="w-4 h-4" />}
              {updateMutation.isPending ? '' : 'Salvar Alterações'}
            </button>
          </div>
        </div>
      </header>

      <div className="p-6 lg:p-10 max-w-[800px] mx-auto">
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-6">
          
          <div className="space-y-4">
            <h3 className="font-semibold text-lg flex items-center gap-2 border-b pb-2">
              <Instagram className="text-pink-600" />
              Instagram
            </h3>
            <div>
              <label className="block text-sm font-medium mb-1">URL do Instagram</label>
              <input
                type="url"
                value={instagramUrl}
                onChange={(e) => setInstagramUrl(e.target.value)}
                placeholder="https://instagram.com/sua.loja"
                className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <h3 className="font-semibold text-lg flex items-center gap-2 border-b pb-2">
              <Facebook className="text-blue-600" />
              Facebook
            </h3>
            <div>
              <label className="block text-sm font-medium mb-1">URL da Página do Facebook</label>
              <input
                type="url"
                value={facebookUrl}
                onChange={(e) => setFacebookUrl(e.target.value)}
                placeholder="https://facebook.com/sualoja"
                className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <h3 className="font-semibold text-lg flex items-center gap-2 border-b pb-2">
              <Smartphone className="text-green-600" />
              WhatsApp
            </h3>
            <div>
              <label className="block text-sm font-medium mb-1">Número do WhatsApp Comercial</label>
              <input
                type="text"
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                placeholder="(11) 99999-9999"
                className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary/20"
              />
              <p className="text-xs text-muted-foreground mt-1">Este número será exibido no seu perfil para os clientes entrarem em contato.</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
