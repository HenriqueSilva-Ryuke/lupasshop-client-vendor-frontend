'use client';

import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client/react';
import { Save, Loader2, ExternalLink } from 'lucide-react';
import { UPDATE_STORE } from '@/graphql/mutations';
import { useAuth } from '@/hooks/useAuth';
import { useSellerStore } from '@/hooks/useSellerStore';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

/* ──────────────────────────────────────────────
   Social network config
────────────────────────────────────────────── */
const NETWORKS = [
  {
    id: 'instagram',
    label: 'Instagram',
    placeholder: 'https://instagram.com/minha.loja',
    hint: 'Partilhe fotos dos seus produtos e ganhe seguidores',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
    color: 'text-pink-600',
    bg: 'bg-pink-50',
  },
  {
    id: 'facebook',
    label: 'Facebook',
    placeholder: 'https://facebook.com/minha.loja',
    hint: 'Alcance mais clientes com a sua página de negócios',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
  {
    id: 'tiktok',
    label: 'TikTok',
    placeholder: 'https://tiktok.com/@minha.loja',
    hint: 'Vídeos curtos são a forma mais eficaz de vender em Angola',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.79 1.54V6.78a4.85 4.85 0 01-1.02-.09z"/>
      </svg>
    ),
    color: 'text-foreground',
    bg: 'bg-muted',
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp Business',
    placeholder: '+244 9XX XXX XXX',
    hint: 'Número angolano visível no perfil para os clientes contactarem directamente',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
    color: 'text-green-600',
    bg: 'bg-green-50',
    isPhone: true,
  },
];

export default function SocialPage() {
  const { user } = useAuth();
  const { data: store, isLoading } = useSellerStore(user?.id);
  const queryClient = useQueryClient();

  const [values, setValues] = useState<Record<string, string>>({
    instagram: '',
    facebook: '',
    tiktok: '',
    whatsapp: '',
  });

  useEffect(() => {
    if (store) {
      setValues({
        instagram: store.instagramUrl || '',
        facebook: store.facebookUrl || '',
        tiktok: '',                              // field will be added to backend
        whatsapp: store.whatsappNumber || '',
      });
    }
  }, [store]);

  const [updateStore, { loading: saving }] = useMutation(UPDATE_STORE, {
    onCompleted: () => {
      queryClient.invalidateQueries({ queryKey: ['sellerStore', user?.id] });
      toast.success('Redes sociais actualizadas!');
    },
    onError: err => toast.error(err.message),
  });

  const handleSave = () => {
    if (!store?.id) return;
    updateStore({
      variables: {
        id: store.id,
        input: {
          instagramUrl: values.instagram,
          facebookUrl: values.facebook,
          whatsappNumber: values.whatsapp,
          // tiktokUrl will be added once schema is updated
        },
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full bg-background-light min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-20 w-full bg-card/95 backdrop-blur-md border-b border-border">
        <div className="px-6 py-4 lg:px-10 flex flex-wrap justify-between items-center gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-black tracking-tight">Redes Sociais</h1>
            <p className="text-sm text-muted-foreground mt-0.5">Conecte a sua loja às redes onde os seus clientes estão</p>
          </div>
          <button
            onClick={handleSave}
            disabled={saving || !store?.id}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 disabled:opacity-50 transition-colors"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? 'A guardar...' : 'Guardar Alterações'}
          </button>
        </div>
      </header>

      <div className="p-6 lg:p-10 max-w-[800px] mx-auto space-y-5">

        {/* Tip banner */}
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 text-sm text-primary/90">
          💡 <strong>Dica:</strong> Em Angola, o Instagram e o WhatsApp são os canais com maior conversão para vendas online. O TikTok tem crescido muito entre os jovens.
        </div>

        {NETWORKS.map(net => (
          <div key={net.id} className="bg-card border border-border rounded-xl p-5 hover:border-primary/30 transition-colors">
            <div className="flex items-start gap-4">
              <div className={`w-10 h-10 rounded-xl ${net.bg} ${net.color} flex items-center justify-center shrink-0 mt-0.5`}>
                {net.icon}
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{net.label}</p>
                    <p className="text-xs text-muted-foreground">{net.hint}</p>
                  </div>
                  {values[net.id] && (
                    <a
                      href={net.isPhone ? `https://wa.me/${values[net.id].replace(/\D/g, '')}` : values[net.id]}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs text-primary flex items-center gap-1 hover:underline"
                    >
                      Ver <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
                <input
                  type={net.isPhone ? 'tel' : 'url'}
                  value={values[net.id]}
                  onChange={e => setValues(v => ({ ...v, [net.id]: e.target.value }))}
                  placeholder={net.placeholder}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
                {net.isPhone && values.whatsapp && (
                  <p className="text-xs text-muted-foreground">
                    Formato angolano: +244 9XX XXX XXX
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}
