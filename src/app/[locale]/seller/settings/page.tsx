"use client";

import { useState, useEffect } from "react";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useClientAuth } from "@/hooks/useClientAuth";
import { useAuthProtection } from "@/hooks/useAuthProtection";
import { useSellerStore } from "@/hooks/useSellerStore";
import { useMutation } from "@tanstack/react-query";
import { apolloClient } from "@/lib/graphql-client";
import { UPDATE_STORE as UPDATE_STORE_SETTINGS } from "@/graphql/mutations";
import { Toggle } from "@/components/ui/Toggle";
import { FileUpload } from "@/components/ui/FileUpload";

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
  const { isLoading: isAuthLoading, isAuthorized } = useAuthProtection([
    "SELLER",
    "ADMIN",
  ]);
  const { data: store, isLoading: storeLoading } = useSellerStore(user?.id);

  const [storeName, setStoreName] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [schedule, setSchedule] = useState("");
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoUrl, setLogoUrl] = useState("");
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [bannerUrl, setBannerUrl] = useState("");
  const [instagramUrl, setInstagramUrl] = useState("");
  const [facebookUrl, setFacebookUrl] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [pixKey, setPixKey] = useState("");
  const [freeShippingMin, setFreeShippingMin] = useState("299");
  const [enableFreeShipping, setEnableFreeShipping] = useState(false);
  const [acceptsCreditCard, setAcceptsCreditCard] = useState(true);
  const [acceptsBoleto, setAcceptsBoleto] = useState(false);

  const [shippingMethods, setShippingMethods] = useState<ShippingMethod[]>([
    {
      id: "correios",
      name: "Correios (SEDEX / PAC)",
      description: "Calculado automaticamente",
      enabled: true,
      icon: "CORREIOS",
      bgColor: "bg-yellow-400",
      textColor: "text-blue-900",
    },
    {
      id: "loggi",
      name: "Loggi Express",
      description: "Entrega local no mesmo dia",
      enabled: false,
      icon: "LOGGI",
      bgColor: "bg-primary600",
      textColor: "text-white",
    },
    {
      id: "motobay",
      name: "Entrega Própria",
      description: "Taxa fixa por região",
      enabled: true,
      icon: "MOTOBAY",
      bgColor: "",
      textColor: "text-white",
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
      setStoreName(store.name || "");
      setDescription(store.description || "");
      setLogoUrl(store.logoUrl || "");
      setBannerUrl(store.bannerUrl || "");
      setInstagramUrl(store.instagramUrl || "");
      setFacebookUrl(store.facebookUrl || "");
      setWhatsappNumber(store.whatsappNumber || "");
      setPixKey(store.pixKey || "");
      setAcceptsCreditCard(store.acceptsCreditCard ?? true);
      setAcceptsBoleto(store.acceptsBoleto ?? false);
      if (store.freeShippingMin) {
        setFreeShippingMin(store.freeShippingMin.toString());
        setEnableFreeShipping(true);
      }

      if (store.shippingMethods && Array.isArray(store.shippingMethods)) {
        setShippingMethods(
          store.shippingMethods as unknown as ShippingMethod[],
        );
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
      alert("Configurações salvas com sucesso!");
    },
    onError: (error) => {
      console.error("Error updating settings:", error);
      alert("Erro ao salvar configurações");
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
        method.id === id ? { ...method, enabled: !method.enabled } : method,
      ),
    );
  };

  if (storeLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!store && !storeLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <h2 className="text-xl font-bold mb-4">Loja não encontrada</h2>
        <p className="text-muted-foreground">
          Você ainda não configurou uma loja.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full relative bg-background-light">
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
                <span className="mr-2 material-symbols-outlined text-[18px]">
                  save
                </span>
                <span className="truncate">
                  {updateSettingsMutation.isPending
                    ? "Salvando..."
                    : "Salvar Alterações"}
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
            <span className="material-symbols-outlined text-primary">
              storefront
            </span>
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
            <span className="material-symbols-outlined text-primary">
              local_shipping
            </span>
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
                          ? "border-primary translate-x-5"
                          : "border-muted-foreground"
                      }`}
                      id={`shipping-${method.id}`}
                      type="checkbox"
                      checked={method.enabled}
                      onChange={() => toggleShippingMethod(method.id)}
                    />
                    <label
                      className={`toggle-label block overflow-hidden h-5 rounded-full cursor-pointer ${
                        method.enabled ? "bg-primary" : "bg-muted"
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
                    onChange={(e) =>
                      setEnableFreeShipping(e.currentTarget.checked)
                    }
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

        <div className="h-12"></div>
      </div>

      {/* Mobile Save Button */}
      <div className="fixed bottom-0 left-0 right-0 z-10 w-full border-t border-border bg-card p-4 lg:hidden">
        <button
          onClick={handleSaveSettings}
          disabled={updateSettingsMutation.isPending}
          className="w-full flex items-center justify-center rounded-lg h-12 px-4 bg-primary text-base font-bold leading-normal tracking-[0.015em] hover:bg-primary-dark transition-colors shadow-lg disabled:opacity-50"
        >
          {updateSettingsMutation.isPending
            ? "Salvando..."
            : "Salvar Todas as Alterações"}
        </button>
      </div>
    </div>
  );
}
