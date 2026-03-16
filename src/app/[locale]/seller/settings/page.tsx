'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { BottomNav } from '@/components/seller/BottomNav';
import { useClientAuth } from '@/hooks/useClientAuth';
import { useAuthProtection } from '@/hooks/useAuthProtection';
import { useSellerStore } from '@/hooks/useSellerStore';
import { useMutation } from '@tanstack/react-query';
import { apolloClient } from '@/lib/graphql-client';
import { UPDATE_STORE as UPDATE_STORE_SETTINGS } from '@/graphql/mutations';
import { Toggle } from '@/components/ui/Toggle';
import { FileUpload } from '@/components/ui/FileUpload';

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
 const { isLoading: isAuthLoading, isAuthorized } = useAuthProtection(['SELLER', 'ADMIN']);
 const { data: store, isLoading: storeLoading } = useSellerStore(user?.id);

 const [storeName, setStoreName] = useState('');
 const [description, setDescription] = useState('');
 const [email, setEmail] = useState('');
 const [address, setAddress] = useState('');
 const [schedule, setSchedule] = useState('');
 const [logoFile, setLogoFile] = useState<File | null>(null);
 const [logoUrl, setLogoUrl] = useState('');
 const [bannerFile, setBannerFile] = useState<File | null>(null);
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

 // Redirect to login if not authorized
 useEffect(() => {
 if (!isAuthLoading && !isAuthorized) {
 router.replace(`/${locale}/auth/login`);
 }
 }, [isAuthLoading, isAuthorized, router, locale]);

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
 setShippingMethods(store.shippingMethods as unknown as ShippingMethod[]);
 }
 }
 }, [store]);

 const updateSettingsMutation = useMutation<any, Error, any>({
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
 <header className="sticky top-0 z-20 w-full bg-card/95 backdrop-blur-md border-b border-border">
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
 <h2 className="text-xl font-bold flex items-center gap-2">
 <span className="material-symbols-outlined text-primary">storefront</span>
 Perfil da Loja
 </h2>
 <div className="rounded-xl border border-border bg-card shadow-sm p-6 lg:p-8">
 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
 <div className="flex flex-col gap-4 items-center text-center">
 <FileUpload
 label="Logo da Loja"
 description="PNG ou JPG até 2MB"
 accept="image/*"
 preview={logoUrl}
 onFileSelect={(file) => setLogoFile(file)}
 onRemove={() => setLogoFile(null)}
 />
 </div>

 <div className="md:col-span-2 flex flex-col gap-5">
 <FileUpload
 label="Banner da Loja"
 description="1200x300 pixels (PNG ou JPG)"
 accept="image/*"
 preview={bannerUrl}
 onFileSelect={(file) => setBannerFile(file)}
 />

 <div className="grid grid-cols-1 gap-4">
 <div className="flex flex-col gap-1.5">
 <label className="text-sm font-medium text-foreground">
 Nome da Loja
 </label>
 <input
 className="w-full rounded-lg border border-border bg-card text-foreground focus:border-primary focus:outline-none sm:text-sm py-2.5 px-3"
 type="text"
 value={storeName}
 onChange={(e) => setStoreName(e.target.value)}
 />
 </div>
 <div className="flex flex-col gap-1.5">
 <label className="text-sm font-medium text-foreground">
 Descrição Curta
 </label>
 <textarea
 className="w-full rounded-lg border border-border bg-card text-foreground focus:border-primary focus:outline-none sm:text-sm p-2.5"
 rows={3}
 value={description}
 onChange={(e) => setDescription(e.target.value)}
 />
 </div>

              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5 border-t border-border pt-4 mt-2">
                <label className="text-sm font-medium text-foreground">
                  E-mail de Contato
                </label>
                <input
                  className="w-full rounded-lg border border-border bg-card text-foreground focus:border-primary focus:outline-none sm:text-sm py-2.5 px-3"
                  type="email"
                  placeholder="contato@minhaloja.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1.5 border-t border-border pt-4 mt-2">
                <label className="text-sm font-medium text-foreground">
                  Horário de Funcionamento
                </label>
                <input
                  className="w-full rounded-lg border border-border bg-card text-foreground focus:border-primary focus:outline-none sm:text-sm py-2.5 px-3"
                  type="text"
                  placeholder="Seg a Sex: 09h - 18h"
                  value={schedule}
                  onChange={(e) => setSchedule(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1.5 md:col-span-2">
                <label className="text-sm font-medium text-foreground">
                  Tempo de Tratamento ou Endereço Completo
                </label>
                <input
                  className="w-full rounded-lg border border-border bg-card text-foreground focus:border-primary focus:outline-none sm:text-sm py-2.5 px-3"
                  type="text"
                  placeholder="Rua Exemplo, 123 - Centro, Cidade - UF"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </div>

 </div>
 </div>
 </section>

 {/* Shipping Policies */}
 <section className="flex flex-col gap-4">
 <h2 className="text-xl font-bold flex items-center gap-2">
 <span className="material-symbols-outlined text-primary">local_shipping</span>
 Políticas de Envio
 </h2>
 <div className="rounded-xl border border-border bg-card overflow-hidden shadow-sm">
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

 <div className="divide-y divide-border">
 {shippingMethods.map((method) => (
 <div
 key={method.id}
 className="p-4 flex items-center justify-between hover:bg-muted/40 transition-colors"
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
 : 'border-muted-foreground'
 }`}
 id={`shipping-${method.id}`}
 type="checkbox"
 checked={method.enabled}
 onChange={() => toggleShippingMethod(method.id)}
 />
 <label
 className={`toggle-label block overflow-hidden h-5 rounded-full cursor-pointer ${
 method.enabled ? 'bg-primary' : 'bg-muted'
 }`}
 htmlFor={`shipping-${method.id}`}
 ></label>
 </div>
 </div>
 ))}
 </div>

 <div className="p-4 border-t border-border">
 <div className="flex flex-col gap-3">
 <h4 className="text-sm font-semibold text-foreground">
 Configurações Avançadas de Frete
 </h4>
 <div className="flex items-center gap-3">
 <Toggle
 label="Oferecer Frete Grátis acima de AOA"
 checked={enableFreeShipping}
 onChange={(e) => setEnableFreeShipping(e.currentTarget.checked)}
 />
 <input
 className="w-24 rounded border border-border bg-card py-1 px-2 text-sm focus:ring-primary focus:border-primary disabled:bg-muted disabled:text-muted-foreground"
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
 <h2 className="text-xl font-bold flex items-center gap-2">
 <span className="material-symbols-outlined text-primary">credit_card</span>
 Métodos de Pagamento
 </h2>
 <div className="rounded-xl border border-border bg-card shadow-sm p-6">
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <div className="border border-border rounded-lg p-4 flex items-start gap-4 hover:border-primary transition-colors cursor-pointer group relative">
 {pixKey && (
 <div className="absolute top-4 right-4 text-primary">
 <span className="material-symbols-outlined">check_circle</span>
 </div>
 )}
 <div className="h-10 w-10 rounded bg-green-50 flex items-center justify-center text-primary">
 <span className="material-symbols-outlined">pix</span>
 </div>
 <div className="flex-1">
 <h3 className="font-medium group-hover:text-primary transition-colors">
 PIX
 </h3>
 <input
 type="text"
 value={pixKey}
 onChange={(e) => setPixKey(e.target.value)}
 placeholder="Chave PIX (CNPJ, email, telefone)"
 className="text-xs w-full mt-2 px-2 py-1 border border-border rounded bg-card text-foreground focus:outline-none focus:border-primary"
 />
 </div>
 </div>

 <div
 className={`border rounded-lg p-4 flex items-between gap-4 transition-colors cursor-pointer group relative ${
 acceptsCreditCard
 ? 'border-primary bg-primary/5'
 : 'border-border hover:border-primary/50'
 }`}
 >
 {acceptsCreditCard && (
 <div className="absolute top-4 right-4 text-primary">
 <span className="material-symbols-outlined">check_circle</span>
 </div>
 )}
 <div className="h-10 w-10 rounded bg-primary50 flex items-center justify-center text-primary flex-shrink-0">
 <span className="material-symbols-outlined">credit_score</span>
 </div>
 <div className="flex-1">
 <h3 className="font-medium group-hover:text-primary transition-colors">
 Cartão de Crédito
 </h3>
 <p className="text-xs mt-1">
 Visa, Mastercard, Elo (via Gateway)
 </p>
 </div>
 <Toggle
 checked={acceptsCreditCard}
 onChange={(e) => setAcceptsCreditCard(e.currentTarget.checked)}
 />
 </div>

 <div
 className={`border rounded-lg p-4 flex items-between gap-4 transition-colors cursor-pointer ${
 acceptsBoleto
 ? 'border-primary bg-primary/5'
 : 'border-border hover:border-primary/50 opacity-70'
 }`}
 >
 {acceptsBoleto && (
 <div className="absolute top-4 right-4 text-primary">
 <span className="material-symbols-outlined">check_circle</span>
 </div>
 )}
 <div className="h-10 w-10 rounded flex items-center justify-center text-muted-foreground flex-shrink-0">
 <span className="material-symbols-outlined">receipt</span>
 </div>
 <div className="flex-1">
 <h3 className="font-medium">Boleto Bancário</h3>
 <p className="text-xs mt-1">
 {acceptsBoleto ? 'Ativo' : 'Desativado'}
 </p>
 </div>
 <Toggle
 checked={acceptsBoleto}
 onChange={(e) => setAcceptsBoleto(e.currentTarget.checked)}
 />
 </div>
 </div>
 </div>
 </section>

 {/* Social Media */}
 <section className="flex flex-col gap-4">
 <h2 className="text-xl font-bold flex items-center gap-2">
 <span className="material-symbols-outlined text-primary">share</span>
 Redes Sociais
 </h2>
 <div className="rounded-xl border border-border bg-card shadow-sm p-6">
 <div className="flex flex-col gap-4">
 <div className="flex items-center gap-3">
 <div className="w-8 flex justify-center text-pink-600">
 <span className="material-symbols-outlined">photo_camera</span>
 </div>
 <div className="flex-1">
 <label className="text-xs font-semibold uppercase mb-1 block">
 Instagram
 </label>
 <input
 className="w-full rounded-lg bg-card border border-border text-foreground focus:border-primary focus:outline-none text-sm py-2 px-3"
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
 <label className="text-xs font-semibold uppercase mb-1 block">
 Facebook
 </label>
 <input
 className="w-full rounded-lg bg-card border border-border text-foreground focus:border-primary focus:outline-none text-sm py-2 px-3"
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
 <label className="text-xs font-semibold uppercase mb-1 block">
 WhatsApp (Botão flutuante)
 </label>
 <input
 className="w-full rounded-lg bg-card border border-border text-foreground focus:border-primary focus:outline-none text-sm py-2 px-3"
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

 {/* Finance Section */}
 <section className="flex flex-col gap-4">
 <h2 className="text-xl font-bold flex items-center gap-2">
 <span className="material-symbols-outlined text-primary">attach_money</span>
 Finanças
 </h2>
 <div className="rounded-xl border border-border bg-card shadow-sm p-6">
 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
 {/* Revenue Card */}
 <div className="p-4 rounded-lg border border-border/50 bg-background-light hover:border-primary/50 transition-colors">
 <div className="flex items-center justify-between">
 <div>
 <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">Receita Total</p>
 <p className="text-2xl font-bold text-foreground">AOA 12.540,00</p>
 <p className="text-xs text-muted-foreground mt-1">Este mês</p>
 </div>
 <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center text-green-600">
 <span className="material-symbols-outlined">trending_up</span>
 </div>
 </div>
 </div>

 {/* Pending Payouts Card */}
 <div className="p-4 rounded-lg border border-border/50 bg-background-light hover:border-primary/50 transition-colors">
 <div className="flex items-center justify-between">
 <div>
 <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">Pendente de Saque</p>
 <p className="text-2xl font-bold text-foreground">AOA 3.200,50</p>
 <p className="text-xs text-muted-foreground mt-1">Próximo saque em 3 dias</p>
 </div>
 <div className="h-10 w-10 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600">
 <span className="material-symbols-outlined">schedule</span>
 </div>
 </div>
 </div>

 {/* Transactions Card */}
 <div className="p-4 rounded-lg border border-border/50 bg-background-light hover:border-primary/50 transition-colors">
 <div className="flex items-center justify-between">
 <div>
 <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">Transações</p>
 <p className="text-2xl font-bold text-foreground">2.847</p>
 <p className="text-xs text-muted-foreground mt-1">Histórico completo</p>
 </div>
 <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
 <span className="material-symbols-outlined">receipt_long</span>
 </div>
 </div>
 </div>
 </div>

 {/* Payment Methods Configuration */}
 <div className="pt-4 border-t">
 <h3 className="text-sm font-semibold mb-3">Configuração de Pagamentos</h3>
 <div className="flex gap-3 flex-wrap">
 <button className="px-4 py-2 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-colors text-sm font-medium">
 <span className="inline-block mr-2">💳</span> Configurar Cartão
 </button>
 <button className="px-4 py-2 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-colors text-sm font-medium">
 <span className="inline-block mr-2">🏦</span> Conta Bancária
 </button>
 <button className="px-4 py-2 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-colors text-sm font-medium">
 <span className="inline-block mr-2">📊</span> Ver Extrato
 </button>
 </div>
 </div>
 </div>
 </section>

 {/* Reports Section */}
 <section className="flex flex-col gap-4">
 <h2 className="text-xl font-bold flex items-center gap-2">
 <span className="material-symbols-outlined text-primary">assessment</span>
 Relatórios
 </h2>
 <div className="rounded-xl border border-border bg-card shadow-sm p-6">
 <div className="mb-6">
 <h3 className="text-sm font-semibold mb-3">Baixar Relatórios</h3>
 <p className="text-xs text-muted-foreground mb-4">Exporte seus dados de vendas para análise detalhada</p>
 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
 {/* Sales Report */}
 <div className="p-4 rounded-lg border border-border/50 bg-background-light hover:border-primary/50 transition-colors cursor-pointer group">
 <div className="flex items-start justify-between mb-3">
 <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
 <span className="material-symbols-outlined text-lg">receipt</span>
 </div>
 <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">CSV/PDF</span>
 </div>
 <h4 className="text-sm font-semibold mb-1">Relatório de Vendas</h4>
 <p className="text-xs text-muted-foreground mb-3">Resumo completo de todas as vendas e receitas</p>
 <button className="w-full px-3 py-2 rounded-lg bg-primary text-white text-xs font-semibold hover:bg-primary-dark transition-colors">
 Baixar Agora
 </button>
 </div>

 {/* Product Performance */}
 <div className="p-4 rounded-lg border border-border/50 bg-background-light hover:border-primary/50 transition-colors cursor-pointer group">
 <div className="flex items-start justify-between mb-3">
 <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
 <span className="material-symbols-outlined text-lg">bar_chart</span>
 </div>
 <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">CSV/PDF</span>
 </div>
 <h4 className="text-sm font-semibold mb-1">Desempenho de Produtos</h4>
 <p className="text-xs text-muted-foreground mb-3">Produtos mais vendidos e rentáveis</p>
 <button className="w-full px-3 py-2 rounded-lg bg-primary text-white text-xs font-semibold hover:bg-primary-dark transition-colors">
 Baixar Agora
 </button>
 </div>

 {/* Order Details */}
 <div className="p-4 rounded-lg border border-border/50 bg-background-light hover:border-primary/50 transition-colors cursor-pointer group">
 <div className="flex items-start justify-between mb-3">
 <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
 <span className="material-symbols-outlined text-lg">shopping_cart</span>
 </div>
 <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">CSV/PDF</span>
 </div>
 <h4 className="text-sm font-semibold mb-1">Detalhes de Pedidos</h4>
 <p className="text-xs text-muted-foreground mb-3">Lista completa de pedidos com rastreamento</p>
 <button className="w-full px-3 py-2 rounded-lg bg-primary text-white text-xs font-semibold hover:bg-primary-dark transition-colors">
 Baixar Agora
 </button>
 </div>

 {/* Customer Data */}
 <div className="p-4 rounded-lg border border-border/50 bg-background-light hover:border-primary/50 transition-colors cursor-pointer group">
 <div className="flex items-start justify-between mb-3">
 <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
 <span className="material-symbols-outlined text-lg">people</span>
 </div>
 <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">CSV/PDF</span>
 </div>
 <h4 className="text-sm font-semibold mb-1">Dados de Clientes</h4>
 <p className="text-xs text-muted-foreground mb-3">Lista e histórico de seus clientes</p>
 <button className="w-full px-3 py-2 rounded-lg bg-primary text-white text-xs font-semibold hover:bg-primary-dark transition-colors">
 Baixar Agora
 </button>
 </div>
 </div>
 </div>

 {/* Reports Frequency */}
 <div className="pt-4 border-t">
 <h3 className="text-sm font-semibold mb-3">Relatórios Automáticos</h3>
 <div className="flex items-center gap-3 p-3 rounded-lg bg-background-light border border-border/50">
 <Toggle
 label="Enviar relatório semanal por e-mail"
 defaultChecked={true}
 id="auto-reports"
 />
 <select className="text-sm px-2 py-1 rounded border border-border bg-card text-foreground ml-auto">
 <option>Segunda-feira</option>
 <option>Terça-feira</option>
 <option>Quarta-feira</option>
 </select>
 </div>
 </div>
 </div>
 </section>

 {/* Stock Management Section */}
 <section className="flex flex-col gap-4">
 <h2 className="text-xl font-bold flex items-center gap-2">
 <span className="material-symbols-outlined text-primary">inventory_2</span>
 Gestão de Stock
 </h2>
 <div className="rounded-xl border border-border bg-card shadow-sm p-6">
 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
 {/* Total Stock */}
 <div className="p-4 rounded-lg border border-border/50 bg-background-light hover:border-primary/50 transition-colors">
 <div className="flex items-center justify-between">
 <div>
 <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">Total em Stock</p>
 <p className="text-2xl font-bold text-foreground">1.234</p>
 <p className="text-xs text-muted-foreground mt-1">Unidades</p>
 </div>
 <div className="h-10 w-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
 <span className="material-symbols-outlined">boxes</span>
 </div>
 </div>
 </div>

 {/* Low Stock Items */}
 <div className="p-4 rounded-lg border border-border/50 bg-background-light hover:border-primary/50 transition-colors">
 <div className="flex items-center justify-between">
 <div>
 <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">Baixo Estoque</p>
 <p className="text-2xl font-bold text-orange-600">7</p>
 <p className="text-xs text-muted-foreground mt-1">Produtos</p>
 </div>
 <div className="h-10 w-10 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600">
 <span className="material-symbols-outlined">warning</span>
 </div>
 </div>
 </div>

 {/* No Stock Items */}
 <div className="p-4 rounded-lg border border-border/50 bg-background-light hover:border-primary/50 transition-colors">
 <div className="flex items-center justify-between">
 <div>
 <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">Sem Estoque</p>
 <p className="text-2xl font-bold text-red-600">2</p>
 <p className="text-xs text-muted-foreground mt-1">Produtos</p>
 </div>
 <div className="h-10 w-10 rounded-lg bg-red-100 flex items-center justify-center text-red-600">
 <span className="material-symbols-outlined">stock_media</span>
 </div>
 </div>
 </div>
 </div>

 {/* Stock Alerts */}
 <div className="mb-6 p-4 rounded-lg bg-orange-50 border border-orange-200">
 <h3 className="text-sm font-semibold text-orange-900 mb-3 flex items-center gap-2">
 <span className="material-symbols-outlined text-lg">notifications_active</span>
 Alertas de Estoque
 </h3>
 <div className="space-y-2 text-sm text-orange-800">
 <p>🔴 <strong>Sem Estoque:</strong> Camiseta Preta (SKU: CAM-001)</p>
 <p>🟠 <strong>Baixo Estoque:</strong> Tênis Branco (SKU: TEN-045) - 3 unidades</p>
 <p>🟠 <strong>Baixo Estoque:</strong> Jaqueta Azul (SKU: JAC-089) - 5 unidades</p>
 </div>
 </div>

 {/* Stock Configuration */}
 <div className="pt-4 border-t">
 <h3 className="text-sm font-semibold mb-4">Configurações de Estoque</h3>
 <div className="space-y-4">
 <div className="flex items-center justify-between p-3 rounded-lg border border-border/50 bg-background-light hover:border-primary/50 transition-colors">
 <div>
 <p className="text-sm font-medium">Limite de Estoque Baixo</p>
 <p className="text-xs text-muted-foreground">Aviso quando quantidade for menor que</p>
 </div>
 <input type="number" defaultValue="10" className="w-20 px-2 py-1 rounded border border-border bg-card text-foreground text-sm" />
 </div>

 <div className="flex items-center justify-between p-3 rounded-lg border border-border/50 bg-background-light hover:border-primary/50 transition-colors">
 <div className="flex-1">
 <p className="text-sm font-medium mb-1">Notificações de Estoque</p>
 <p className="text-xs text-muted-foreground">Receba alertas quando o estoque ficar baixo</p>
 </div>
 <Toggle defaultChecked={true} />
 </div>

 <div className="flex items-center justify-between p-3 rounded-lg border border-border/50 bg-background-light hover:border-primary/50 transition-colors">
 <div className="flex-1">
 <p className="text-sm font-medium mb-1">Atualizar Estoque Automaticamente</p>
 <p className="text-xs text-muted-foreground">Sincronizar com plataforma de vendas</p>
 </div>
 <Toggle defaultChecked={true} />
 </div>
 </div>
 </div>

 {/* Stock Actions */}
 <div className="pt-4 border-t">
 <h3 className="text-sm font-semibold mb-3">Ações Rápidas</h3>
 <div className="flex gap-3 flex-wrap">
 <button className="px-4 py-2 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-colors text-sm font-medium">
 <span className="inline-block mr-2">📈</span> Ajustar Estoque
 </button>
 <button className="px-4 py-2 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-colors text-sm font-medium">
 <span className="inline-block mr-2">📊</span> Histórico
 </button>
 <button className="px-4 py-2 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-colors text-sm font-medium">
 <span className="inline-block mr-2">🔄</span> Sincronizar
 </button>
 </div>
 </div>
 </div>
 </section>

 <div className="h-12"></div>
 </div>

 {/* Mobile Save Button */}
 <div className="fixed bottom-0 left-0 right-0 z-10 w-full border-t border-border bg-card p-4 lg:hidden">
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
