"use client";

import { useState, useEffect } from "react";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { useClientAuth } from "@/hooks/useClientAuth";
import { useAuthProtection } from "@/hooks/useAuthProtection";
import { useSellerStore } from "@/hooks/useSellerStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apolloClient } from "@/lib/graphql-client";
import { UPDATE_STORE as UPDATE_STORE_SETTINGS } from "@/graphql/mutations";
import { Toggle } from "@/components/ui/Toggle";
import { FileUpload } from "@/components/ui/FileUpload";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface ShippingMethod {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  badge: string;
  badgeBg: string;
  badgeText: string;
}

// ── Transportadoras e serviços de entrega em Angola ──────────────────────────
const DEFAULT_SHIPPING_METHODS: ShippingMethod[] = [
  {
    id: "speed",
    name: "Speed Angola",
    description: "Entrega rápida em Luanda e províncias — 24h a 72h",
    enabled: true,
    badge: "SPEED",
    badgeBg: "bg-[#ff5722]",
    badgeText: "text-white",
  },
  {
    id: "dhl",
    name: "DHL Angola",
    description: "Entregas internacionais e encomendas volumosas",
    enabled: false,
    badge: "DHL",
    badgeBg: "bg-[#FFCC00]",
    badgeText: "text-[#D40511]",
  },
  {
    id: "correios",
    name: "Correios de Angola (CTT)",
    description: "Serviço postal para todo o país",
    enabled: false,
    badge: "CTT",
    badgeBg: "bg-red-600",
    badgeText: "text-white",
  },
  {
    id: "mototaxi",
    name: "Motoqueiro / Entrega Própria",
    description: "Entrega local com taxa fixa por zona de Luanda",
    enabled: true,
    badge: "MOTO",
    badgeBg: "bg-primary",
    badgeText: "text-white",
  },
  {
    id: "retirada",
    name: "Levantamento na Loja",
    description: "O cliente levanta pessoalmente na sua loja",
    enabled: false,
    badge: "LOJA",
    badgeBg: "bg-muted",
    badgeText: "text-foreground",
  },
];

// ── Províncias de Angola ─────────────────────────────────────────────────────
const PROVINCIAS = [
  "Luanda", "Benguela", "Huambo", "Bié", "Malanje", "Kwanza Norte",
  "Kwanza Sul", "Uíge", "Zaire", "Cabinda", "Lunda Norte", "Lunda Sul",
  "Moxico", "Cuando Cubango", "Cunene", "Namibe", "Huíla", "Bengo",
];

export default function SettingsPage() {
  const locale = useLocale();
  const router = useRouter();
  const { user, isClient } = useClientAuth();
  const queryClient = useQueryClient();
  const { isLoading: isAuthLoading, isAuthorized } = useAuthProtection(["SELLER", "ADMIN"]);
  const { data: store, isLoading: storeLoading } = useSellerStore(user?.id);

  const [storeName, setStoreName]     = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail]             = useState("");
  const [address, setAddress]         = useState("");
  const [schedule, setSchedule]       = useState("");
  const [provincia, setProvincia]     = useState("Luanda");
  const [logoFile, setLogoFile]       = useState<File | null>(null);
  const [logoUrl, setLogoUrl]         = useState("");
  const [bannerFile, setBannerFile]   = useState<File | null>(null);
  const [bannerUrl, setBannerUrl]     = useState("");

  const [freeShippingMin, setFreeShippingMin]       = useState("5000");
  const [enableFreeShipping, setEnableFreeShipping] = useState(false);

  const [shippingMethods, setShippingMethods] = useState<ShippingMethod[]>(DEFAULT_SHIPPING_METHODS);

  useEffect(() => {
    if (isClient && !user) {
      router.push(`/${locale}/auth/seller-login`);
    }
  }, [isClient, user, router, locale]);

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
      setAddress(store.location || "");
      if (store.freeShippingMin) {
        setFreeShippingMin(store.freeShippingMin.toString());
        setEnableFreeShipping(true);
      }
      if (store.shippingMethods && Array.isArray(store.shippingMethods)) {
        // Merge saved methods with defaults (to add new ones without losing saved state)
        const saved = store.shippingMethods as unknown as ShippingMethod[];
        setShippingMethods(prev =>
          prev.map(def => {
            const found = saved.find(s => s.id === def.id);
            return found ? { ...def, enabled: found.enabled } : def;
          })
        );
      }
    }
  }, [store]);

  const updateMutation = useMutation<any, Error, any>({
    mutationFn: async (data: any) => {
      const result = await apolloClient.mutate<{ updateStore: any }>({
        mutation: UPDATE_STORE_SETTINGS,
        variables: { id: store?.id, input: data },
      });
      return result.data?.updateStore;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sellerStore', user?.id] });
      toast.success("Configurações guardadas com sucesso!");
    },
    onError: (err) => {
      toast.error(`Erro: ${err.message}`);
    },
  });

  const handleSave = () => {
    updateMutation.mutate({
      name: storeName,
      description,
      logoUrl,
      bannerUrl,
      location: `${address}${provincia ? `, ${provincia}` : ''}`,
      shippingMethods,
      freeShippingMin: enableFreeShipping ? parseFloat(freeShippingMin) : null,
    });
  };

  const toggleShipping = (id: string) => {
    setShippingMethods(prev => prev.map(m => m.id === id ? { ...m, enabled: !m.enabled } : m));
  };

  if (storeLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  if (!store && !storeLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 gap-2 text-muted-foreground">
        <p className="text-lg font-semibold">Loja não encontrada</p>
        <p className="text-sm">Crie a sua loja primeiro através do processo de integração.</p>
      </div>
    );
  }

  return (
    <div className="w-full relative bg-background-light">
      {/* Header */}
      <header className="sticky top-0 z-20 w-full bg-card/95 backdrop-blur-md border-b border-border">
        <div className="px-6 py-4 lg:px-10 flex flex-wrap justify-between items-center gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-black tracking-tight">Configurações da Loja</h1>
            <p className="text-sm text-muted-foreground mt-0.5">Perfil, localização e políticas de entrega</p>
          </div>
          <button
            onClick={handleSave}
            disabled={updateMutation.isPending}
            className="flex items-center gap-2 rounded-lg h-10 px-4 bg-primary text-sm font-bold hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            {updateMutation.isPending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <span className="material-symbols-outlined text-[18px]">save</span>
            )}
            {updateMutation.isPending ? "A guardar..." : "Guardar Alterações"}
          </button>
        </div>
      </header>

      <div className="px-6 py-8 lg:px-10 max-w-[1000px] mx-auto flex flex-col gap-8">

        {/* ── 1. Perfil da Loja ── */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">storefront</span>
            Perfil da Loja
          </h2>
          <div className="rounded-xl border border-border bg-card p-6 lg:p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Logo */}
              <div className="flex flex-col items-center text-center">
                <FileUpload
                  label="Logo da Loja"
                  description="PNG ou JPG até 2MB"
                  accept="image/*"
                  preview={logoUrl}
                  onFileSelect={file => setLogoFile(file)}
                  onRemove={() => setLogoFile(null)}
                />
              </div>

              {/* Main fields */}
              <div className="md:col-span-2 space-y-4">
                <FileUpload
                  label="Banner da Loja"
                  description="1200×300 px (PNG ou JPG)"
                  accept="image/*"
                  preview={bannerUrl}
                  onFileSelect={file => setBannerFile(file)}
                />

                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Nome da Loja</label>
                  <input
                    className="w-full rounded-lg border border-border bg-card text-foreground focus:border-primary focus:outline-none text-sm py-2.5 px-3 transition-colors"
                    type="text"
                    value={storeName}
                    onChange={e => setStoreName(e.target.value)}
                    placeholder="Ex: Loja do João"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Descrição Curta</label>
                  <textarea
                    className="w-full rounded-lg border border-border bg-card text-foreground focus:border-primary focus:outline-none text-sm p-2.5 transition-colors resize-none"
                    rows={3}
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    placeholder="Descreva brevemente a sua loja..."
                  />
                </div>
              </div>

              {/* Location / contact */}
              <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-border pt-6">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium">E-mail de Contacto</label>
                  <input
                    className="w-full rounded-lg border border-border bg-card text-foreground focus:border-primary focus:outline-none text-sm py-2.5 px-3 transition-colors"
                    type="email"
                    placeholder="contacto@minha.loja"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Horário de Funcionamento</label>
                  <input
                    className="w-full rounded-lg border border-border bg-card text-foreground focus:border-primary focus:outline-none text-sm py-2.5 px-3 transition-colors"
                    type="text"
                    placeholder="Seg–Sex: 08h–17h | Sáb: 08h–13h"
                    value={schedule}
                    onChange={e => setSchedule(e.target.value)}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Província</label>
                  <select
                    value={provincia}
                    onChange={e => setProvincia(e.target.value)}
                    className="w-full rounded-lg border border-border bg-card text-foreground focus:border-primary focus:outline-none text-sm py-2.5 px-3 transition-colors"
                  >
                    {PROVINCIAS.map(p => <option key={p}>{p}</option>)}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium">Morada / Bairro</label>
                  <input
                    className="w-full rounded-lg border border-border bg-card text-foreground focus:border-primary focus:outline-none text-sm py-2.5 px-3 transition-colors"
                    type="text"
                    placeholder="Ex: Rua da Missão, Miramar, Luanda"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 2. Transportadoras ── */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">local_shipping</span>
            Políticas de Entrega
          </h2>

          <div className="rounded-xl border border-border bg-card overflow-hidden">
            <div className="p-5 border-b border-border bg-muted/20">
              <p className="text-sm font-semibold">Serviços de Entrega Activos</p>
              <p className="text-xs text-muted-foreground mt-0.5">Seleccione os serviços que a sua loja oferece</p>
            </div>

            <div className="divide-y divide-border">
              {shippingMethods.map(method => (
                <div
                  key={method.id}
                  className="px-5 py-4 flex items-center justify-between hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`h-10 w-10 rounded-lg ${method.badgeBg} ${method.badgeText} flex items-center justify-center font-bold text-xs shadow-sm shrink-0`}
                    >
                      {method.badge}
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{method.name}</p>
                      <p className="text-xs text-muted-foreground">{method.description}</p>
                    </div>
                  </div>
                  <Toggle
                    checked={method.enabled}
                    onChange={() => toggleShipping(method.id)}
                  />
                </div>
              ))}
            </div>

            {/* Free shipping */}
            <div className="p-5 border-t border-border bg-muted/10 space-y-3">
              <p className="text-sm font-semibold">Frete Grátis</p>
              <div className="flex flex-wrap items-center gap-4">
                <Toggle
                  label="Oferecer frete grátis acima de AOA"
                  checked={enableFreeShipping}
                  onChange={e => setEnableFreeShipping(e.currentTarget.checked)}
                />
                <div className="flex items-center gap-2">
                  <input
                    className="w-28 rounded-lg border border-border bg-card py-1.5 px-3 text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none disabled:bg-muted disabled:text-muted-foreground transition-colors"
                    type="number"
                    value={freeShippingMin}
                    min={0}
                    onChange={e => setFreeShippingMin(e.target.value)}
                    disabled={!enableFreeShipping}
                  />
                  <span className="text-sm text-muted-foreground">AOA</span>
                </div>
              </div>
              {enableFreeShipping && (
                <p className="text-xs text-muted-foreground">
                  Pedidos acima de {parseInt(freeShippingMin || '0').toLocaleString('pt-AO')} AOA terão entrega gratuita.
                </p>
              )}
            </div>
          </div>
        </section>

        <div className="h-16" />
      </div>

      {/* Mobile save bar */}
      <div className="fixed bottom-0 left-0 right-0 z-10 border-t border-border bg-card p-4 lg:hidden">
        <button
          onClick={handleSave}
          disabled={updateMutation.isPending}
          className="w-full flex items-center justify-center rounded-lg h-12 px-4 bg-primary text-base font-bold hover:bg-primary/90 transition-colors disabled:opacity-50"
        >
          {updateMutation.isPending ? "A guardar..." : "Guardar Todas as Alterações"}
        </button>
      </div>
    </div>
  );
}
