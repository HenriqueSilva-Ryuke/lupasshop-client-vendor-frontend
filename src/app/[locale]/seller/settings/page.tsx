'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { BottomNav } from '@/components/seller/BottomNav';
import { useClientAuth } from '@/hooks/useClientAuth';
import { useSellerStore } from '@/hooks/useSellerStore';
import { useMutation } from '@tanstack/react-query';
import { apolloClient } from '@/lib/graphql-client';
import { UPDATE_STORE_SETTINGS } from '@/graphql/mutations';
import { useRouter } from 'next/navigation';

interface ShippingMethod {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  icon: string;
  bgColor: string;
  textColor: string;
}

export default function SettingsPage() {
  const locale = useLocale();
  const router = useRouter();
  const { user, isClient } = useClientAuth();
  const { data: store, isLoading: storeLoading } = useSellerStore(user?.id);

  const [storeName, setStoreName] = useState('');
  const [description, setDescription] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [bannerUrl, setBannerUrl] = useState('');
  const [instagramUrl, setInstagramUrl] = useState('');
  const [facebookUrl, setFacebookUrl] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [pixKey, setPixKey] = useState('');
  const [freeShippingMin, setFreeShippingMin] = useState('299');
  const [enableFreeShipping, setEnableFreeShipping] = useState(false);
  const [acceptsCreditCard, setAcceptsCreditCard] = useState(true);
  const [acceptsBoleto, setAcceptsBoleto] = useState(false);

  const [shippingMethods, setShippingMethods] = useState<ShippingMethod[]>([
    {
      id: 'correios',
      name: 'Correios (SEDEX / PAC)',
      description: 'Calculado automaticamente',
      enabled: true,
      icon: 'CORREIOS',
      bgColor: 'bg-yellow-400',
      textColor: 'text-blue-900',
    },
    {
      id: 'loggi',
      name: 'Loggi Express',
      description: 'Entrega local no mesmo dia',
      enabled: false,
      icon: 'LOGGI',
      bgColor: 'bg-primary600',
      textColor: 'text-white',
    },
    {
      id: 'motobay',
      name: 'Entrega Própria',
      description: 'Taxa fixa por região',
      enabled: true,
      icon: 'MOTOBAY',
      bgColor: '',
      textColor: 'text-white',
    },
  ]);

  useEffect(() => {
    if (isClient && !user) {
      router.push(`/${locale}/auth/seller-login`);
    }
  }, [isClient, user, router, locale]);

  useEffect(() => {
    if (store) {
      setStoreName(store.name || '');
      setDescription(store.description || '');
      setLogoUrl(store.logoUrl || '');
      setBannerUrl(store.bannerUrl || '');
      setInstagramUrl(store.instagramUrl || '');
      setFacebookUrl(store.facebookUrl || '');
      setWhatsappNumber(store.whatsappNumber || '');
      setPixKey(store.pixKey || '');
      setAcceptsCreditCard(store.acceptsCreditCard ?? true);
      setAcceptsBoleto(store.acceptsBoleto ?? false);
      
      if (store.freeShippingMin) {
        setFreeShippingMin(store.freeShippingMin.toString());
        setEnableFreeShipping(true);
      }

      if (store.shippingMethods && Array.isArray(store.shippingMethods)) {
        setShippingMethods(store.shippingMethods as ShippingMethod[]);
      }
    }
  }, [store]);

  const updateSettingsMutation = useMutation({
    mutationFn: async (data: any) => {
      const result = await apolloClient.mutate<{ updateStore: any }>({
        mutation: UPDATE_STORE_SETTINGS,
        variables: {
          id: store?.id,
          input: data,
        },
      });
      return result.data?.updateStore;
    },
    onSuccess: () => {
      alert('Configurações salvas com sucesso!');
    },
    onError: (error) => {
      console.error('Error updating settings:', error);
      alert('Erro ao salvar configurações');
    },
  });

  const handleSaveSettings = () => {
    const input = {
      name: storeName,
      description,
      logoUrl,
      bannerUrl,
      instagramUrl,
      facebookUrl,
      whatsappNumber,
      pixKey,
      acceptsCreditCard,
      acceptsBoleto,
      shippingMethods: shippingMethods,
      freeShippingMin: enableFreeShipping ? parseFloat(freeShippingMin) : null,
    };

    updateSettingsMutation.mutate(input);
  };

  const toggleShippingMethod = (id: string) => {
    setShippingMethods((prev) =>
      prev.map((method) =>
        method.id === id ? { ...method, enabled: !method.enabled } : method
      )
    );
  };

  if (storeLoading || !store) {
    return (
      <div className="flex h-screen w-full overflow-hidden">
        <BottomNav />
        <main className="flex-1 overflow-y-auto h-full bg-background-light">
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <BottomNav />
      <main className="flex-1 overflow-y-auto h-full relative scroll-smooth bg-background-light pb-20 lg:pb-0">
        <header className="sticky top-0 z-20 w-full bg-white/95 backdrop-blur-md border-b border-gray-200">
          <div className="px-6 py-4 lg:px-10">
            <div className="flex flex-wrap justify-between items-center gap-4">
              <div className="flex flex-col gap-1">
                <h1 className="text-2xl lg:text-3xl font-black leading-tight tracking-[-0.033em] ">
                  Configurações da Loja
                </h1>
                <p className=" text-sm lg:text-base font-normal">
                  Gerencie o perfil da sua loja, pagamentos e envios.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleSaveSettings}
                  disabled={updateSettingsMutation.isPending}
                  className="flex items-center justify-center rounded-lg h-10 px-4 bg-primary text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary-dark transition-colors shadow-lg shadow-primary/30 disabled:opacity-50"
                >
                  <span className="mr-2 material-symbols-outlined text-[18px]">save</span>
                  <span className="truncate">
                    {updateSettingsMutation.isPending ? 'Salvando...' : 'Salvar Alterações'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </header>

        <div className="px-6 py-8 lg:px-10 max-w-[1000px] mx-auto flex flex-col gap-8">
          {/* Store Profile */}
          <section className="flex flex-col gap-4">
            <h2 className="text-xl font-bold  flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">storefront</span>
              Perfil da Loja
            </h2>
            <div className="bg-white rounded-xl border shadow-sm p-6 lg:p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex flex-col gap-4 items-center text-center">
                  <div className="relative group cursor-pointer">
                    <div
                      className="w-32 h-32 rounded-full overflow-hidden border-2 border-dashed flex items-center justify-center bg-cover bg-center"
                      style={{
                        backgroundImage: logoUrl ? `url(${logoUrl})` : 'none',
                      }}
                    >
                      {!logoUrl && (
                        <span className="material-symbols-outlined text-4xl">
                          store
                        </span>
                      )}
                    </div>
                    <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="material-symbols-outlined text-white">edit</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold ">Logo da Loja</h3>
                    <p className="text-xs  mt-1">PNG ou JPG até 2MB</p>
                  </div>
                  <input
                    type="text"
                    value={logoUrl}
                    onChange={(e) => setLogoUrl(e.target.value)}
                    placeholder="URL da logo"
                    className="text-sm w-full px-3 py-1.5 border rounded-lg"
                  />
                </div>

                <div className="md:col-span-2 flex flex-col gap-5">
                  <div className="w-full relative group cursor-pointer">
                    <div
                      className="h-32 w-full rounded-lg border-2 border-dashed flex items-center justify-center bg-cover bg-center relative overflow-hidden"
                      style={{
                        backgroundImage: bannerUrl ? `url(${bannerUrl})` : 'none',
                      }}
                    >
                      {!bannerUrl && (
                        <>
                          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary-light/10"></div>
                          <span className=" text-sm flex items-center gap-2 relative z-10">
                            <span className="material-symbols-outlined">image</span> Banner da Loja
                            (1200x300)
                          </span>
                        </>
                      )}
                    </div>
                    <input
                      type="text"
                      value={bannerUrl}
                      onChange={(e) => setBannerUrl(e.target.value)}
                      placeholder="URL do banner"
                      className="text-sm w-full px-3 py-1.5 border rounded-lg mt-2"
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-medium ">
                        Nome da Loja
                      </label>
                      <input
                        className="w-full rounded-lg bg-white  focus:border-primary focus:ring-primary sm:text-sm py-2.5"
                        type="text"
                        value={storeName}
                        onChange={(e) => setStoreName(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-sm font-medium ">
                        Descrição Curta
                      </label>
                      <textarea
                        className="w-full rounded-lg bg-white  focus:border-primary focus:ring-primary sm:text-sm p-2.5"
                        rows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Shipping Policies */}
          <section className="flex flex-col gap-4">
            <h2 className="text-xl font-bold  flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">local_shipping</span>
              Políticas de Envio
            </h2>
            <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
              <div className="p-6 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-semibold ">
                    Transportadoras Ativas
                  </h3>
                  <p className="text-sm ">
                    Selecione quais serviços de entrega deseja oferecer.
                  </p>
                </div>
              </div>

              <div className="divide-y divide-gray-100">
                {shippingMethods.map((method) => (
                  <div
                    key={method.id}
                    className="p-4 flex items-center justify-between hover:bg-accent50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`h-10 w-10 rounded-lg ${method.bgColor} flex items-center justify-center font-bold ${method.textColor} text-xs shadow-sm`}
                      >
                        {method.icon}
                      </div>
                      <div>
                        <p className="text-sm font-medium ">{method.name}</p>
                        <p className="text-xs ">{method.description}</p>
                      </div>
                    </div>
                    <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                      <input
                        className={`toggle-checkbox absolute block w-5 h-5 rounded-full border-4 appearance-none cursor-pointer ${
                          method.enabled
                            ? 'border-primary translate-x-5'
                            : 'border-gray-300'
                        }`}
                        id={`shipping-${method.id}`}
                        type="checkbox"
                        checked={method.enabled}
                        onChange={() => toggleShippingMethod(method.id)}
                      />
                      <label
                        className={`toggle-label block overflow-hidden h-5 rounded-full cursor-pointer ${
                          method.enabled ? 'bg-primary' : 'bg-gray-300'
                        }`}
                        htmlFor={`shipping-${method.id}`}
                      ></label>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 border-t border-gray-100">
                <div className="flex flex-col gap-3">
                  <h4 className="text-sm font-semibold ">
                    Configurações Avançadas de Frete
                  </h4>
                  <div className="flex items-center gap-3">
                    <input
                      className="rounded text-primary focus:ring-primary"
                      id="free-shipping"
                      type="checkbox"
                      checked={enableFreeShipping}
                      onChange={(e) => setEnableFreeShipping(e.target.checked)}
                    />
                    <label className="text-sm " htmlFor="free-shipping">
                      Oferecer Frete Grátis acima de R$
                    </label>
                    <input
                      className="w-24 rounded py-1 px-2 text-sm focus:ring-primary focus:border-primary"
                      type="number"
                      value={freeShippingMin}
                      onChange={(e) => setFreeShippingMin(e.target.value)}
                      disabled={!enableFreeShipping}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Payment Methods */}
          <section className="flex flex-col gap-4">
            <h2 className="text-xl font-bold  flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">credit_card</span>
              Métodos de Pagamento
            </h2>
            <div className="bg-white rounded-xl border shadow-sm p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border rounded-lg p-4 flex items-start gap-4 hover:border-primary transition-colors cursor-pointer group relative">
                  {pixKey && (
                    <div className="absolute top-4 right-4 text-primary">
                      <span className="material-symbols-outlined">check_circle</span>
                    </div>
                  )}
                  <div className="h-10 w-10 rounded bg-green-50 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined">pix</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium  group-hover:text-primary transition-colors">
                      PIX
                    </h3>
                    <input
                      type="text"
                      value={pixKey}
                      onChange={(e) => setPixKey(e.target.value)}
                      placeholder="Chave PIX (CNPJ, email, telefone)"
                      className="text-xs w-full mt-2 px-2 py-1 border rounded"
                    />
                  </div>
                </div>

                <div
                  className={`border rounded-lg p-4 flex items-start gap-4 transition-colors cursor-pointer group relative ${
                    acceptsCreditCard
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setAcceptsCreditCard(!acceptsCreditCard)}
                >
                  {acceptsCreditCard && (
                    <div className="absolute top-4 right-4 text-primary">
                      <span className="material-symbols-outlined">check_circle</span>
                    </div>
                  )}
                  <div className="h-10 w-10 rounded bg-primary50 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined">credit_score</span>
                  </div>
                  <div>
                    <h3 className="font-medium  group-hover:text-primary transition-colors">
                      Cartão de Crédito
                    </h3>
                    <p className="text-xs  mt-1">
                      Visa, Mastercard, Elo (via Gateway)
                    </p>
                  </div>
                </div>

                <div
                  className={`border rounded-lg p-4 flex items-start gap-4 transition-colors cursor-pointer ${
                    acceptsBoleto
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-200 hover:border-gray-300 opacity-70'
                  }`}
                  onClick={() => setAcceptsBoleto(!acceptsBoleto)}
                >
                  {acceptsBoleto && (
                    <div className="absolute top-4 right-4 text-primary">
                      <span className="material-symbols-outlined">check_circle</span>
                    </div>
                  )}
                  <div className="h-10 w-10 rounded flex items-center justify-center text-gray-500">
                    <span className="material-symbols-outlined">receipt</span>
                  </div>
                  <div>
                    <h3 className="font-medium ">Boleto Bancário</h3>
                    <p className="text-xs  mt-1">
                      {acceptsBoleto ? 'Ativo' : 'Clique para ativar'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Social Media */}
          <section className="flex flex-col gap-4">
            <h2 className="text-xl font-bold  flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">share</span>
              Redes Sociais
            </h2>
            <div className="bg-white rounded-xl border shadow-sm p-6">
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 flex justify-center text-pink-600">
                    <span className="material-symbols-outlined">photo_camera</span>
                  </div>
                  <div className="flex-1">
                    <label className="text-xs font-semibold uppercase  mb-1 block">
                      Instagram
                    </label>
                    <input
                      className="w-full rounded-lg bg-gray-50  focus:border-primary focus:ring-primary text-sm py-2"
                      placeholder="@seuinstagram"
                      type="text"
                      value={instagramUrl}
                      onChange={(e) => setInstagramUrl(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 flex justify-center text-primary">
                    <span className="material-symbols-outlined">groups</span>
                  </div>
                  <div className="flex-1">
                    <label className="text-xs font-semibold uppercase  mb-1 block">
                      Facebook
                    </label>
                    <input
                      className="w-full rounded-lg bg-gray-50  focus:border-primary focus:ring-primary text-sm py-2"
                      placeholder="facebook.com/suapagina"
                      type="text"
                      value={facebookUrl}
                      onChange={(e) => setFacebookUrl(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 flex justify-center text-green-500">
                    <span className="material-symbols-outlined">chat</span>
                  </div>
                  <div className="flex-1">
                    <label className="text-xs font-semibold uppercase  mb-1 block">
                      WhatsApp (Botão flutuante)
                    </label>
                    <input
                      className="w-full rounded-lg bg-gray-50  focus:border-primary focus:ring-primary text-sm py-2"
                      placeholder="(00) 00000-0000"
                      type="text"
                      value={whatsappNumber}
                      onChange={(e) => setWhatsappNumber(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="h-12"></div>
        </div>

        {/* Mobile Save Button */}
        <div className="fixed bottom-0 left-0 right-0 z-10 w-full border-t p-4 lg:hidden">
          <button
            onClick={handleSaveSettings}
            disabled={updateSettingsMutation.isPending}
            className="w-full flex items-center justify-center rounded-lg h-12 px-4 bg-primary text-base font-bold leading-normal tracking-[0.015em] hover:bg-primary-dark transition-colors shadow-lg disabled:opacity-50"
          >
            {updateSettingsMutation.isPending ? 'Salvando...' : 'Salvar Todas as Alterações'}
          </button>
        </div>
      </main>
    </div>
  );
}
