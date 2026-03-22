'use client';

import { useTranslations } from 'next-intl';
import { PackageX, AlertTriangle, PackageSearch, Save } from 'lucide-react';
import { Toggle } from '@/components/ui/Toggle';
import { useState } from 'react';

export default function StockPage() {
  const [lowStockLimit, setLowStockLimit] = useState('10');
  const [stockNotifs, setStockNotifs] = useState(true);
  const [autoSync, setAutoSync] = useState(true);

  const handleSave = () => {
    alert("Configurações salvas com sucesso!");
  };

  return (
    <div className="w-full relative bg-background-light min-h-screen">
      <header className="sticky top-0 z-20 w-full bg-card/95 backdrop-blur-md border-b border-border">
        <div className="px-6 py-4 lg:px-10">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl lg:text-3xl font-black leading-tight tracking-[-0.033em]">
                Gestão de Estoque
              </h1>
              <p className="text-sm lg:text-base font-normal text-muted-foreground">
                Monitore e gerencie o estoque dos seus produtos
              </p>
            </div>
            <button
              onClick={handleSave}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              <Save className="w-4 h-4" /> Salvar Configurações
            </button>
          </div>
        </div>
      </header>

      <div className="p-6 lg:p-10 max-w-[1000px] mx-auto space-y-8">
        
        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <PackageSearch className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total em Estoque</p>
                <p className="text-2xl font-bold">1.234</p>
                <p className="text-xs text-muted-foreground mt-1">Unidades</p>
              </div>
            </div>
          </div>

          <div className="bg-card border border-orange-200 rounded-xl p-5 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-orange-800">Baixo Estoque</p>
                <p className="text-2xl font-bold text-orange-600">7</p>
                <p className="text-xs text-orange-700/80 mt-1">Produtos requerem atenção</p>
              </div>
            </div>
          </div>

          <div className="bg-card border border-red-200 rounded-xl p-5 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                <PackageX className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-red-800">Sem Estoque</p>
                <p className="text-2xl font-bold text-red-600">2</p>
                <p className="text-xs text-red-700/80 mt-1">Produtos esgotados</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stock Alerts Widget */}
        <div className="mb-6 p-5 rounded-xl bg-orange-50/50 border border-orange-200 shadow-sm">
          <h3 className="text-sm font-semibold text-orange-900 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            Alertas Ativos
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center bg-white/60 p-3 rounded-lg border border-orange-100">
              <p className="text-sm text-red-800">🔴 <strong>Esgotado:</strong> Camiseta Preta Algodão (SKU: CAM-001)</p>
              <button className="text-xs px-3 py-1.5 bg-white border border-border rounded-md hover:bg-muted font-medium">Repor</button>
            </div>
            <div className="flex justify-between items-center bg-white/60 p-3 rounded-lg border border-orange-100">
              <p className="text-sm text-orange-800">🟠 <strong>Baixo:</strong> Tênis Branco Sport (SKU: TEN-045) — Restam 3 un.</p>
              <button className="text-xs px-3 py-1.5 bg-white border border-border rounded-md hover:bg-muted font-medium">Repor</button>
            </div>
            <div className="flex justify-between items-center bg-white/60 p-3 rounded-lg border border-orange-100">
              <p className="text-sm text-orange-800">🟠 <strong>Baixo:</strong> Jaqueta Jeans (SKU: JAC-089) — Restam 5 un.</p>
              <button className="text-xs px-3 py-1.5 bg-white border border-border rounded-md hover:bg-muted font-medium">Repor</button>
            </div>
          </div>
        </div>

        {/* Settings */}
        <section className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
          <div className="border-b border-border p-5 bg-muted/20">
            <h3 className="text-base font-bold">Configurações de Estoque</h3>
          </div>
          
          <div className="p-6 space-y-6">
            <div className="flex sm:items-center justify-between flex-col sm:flex-row gap-4 p-4 rounded-lg border border-border/50 bg-background hover:border-primary/50 transition-colors">
              <div>
                <p className="text-sm font-medium">Limite de Estoque Baixo</p>
                <p className="text-xs text-muted-foreground mt-1">Aviso quando a quantidade for menor que</p>
              </div>
              <input 
                type="number" 
                value={lowStockLimit}
                onChange={(e) => setLowStockLimit(e.target.value)}
                className="w-24 px-3 py-2 rounded-lg border border-border bg-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" 
              />
            </div>

            <div className="flex sm:items-center justify-between flex-col sm:flex-row gap-4 p-4 rounded-lg border border-border/50 bg-background hover:border-primary/50 transition-colors">
              <div className="flex-1">
                <p className="text-sm font-medium mb-1">Notificações de Estoque</p>
                <p className="text-xs text-muted-foreground">Receba alertas no e-mail quando o estoque ficar baixo</p>
              </div>
              <Toggle checked={stockNotifs} onChange={(e) => setStockNotifs(e.currentTarget.checked)} />
            </div>

            <div className="flex sm:items-center justify-between flex-col sm:flex-row gap-4 p-4 rounded-lg border border-border/50 bg-background hover:border-primary/50 transition-colors">
              <div className="flex-1">
                <p className="text-sm font-medium mb-1">Sincronização Automática</p>
                <p className="text-xs text-muted-foreground">Sincronizar quantidades de estoques de plataformas integradas</p>
              </div>
              <Toggle checked={autoSync} onChange={(e) => setAutoSync(e.currentTarget.checked)} />
            </div>
          </div>
          
          <div className="border-t border-border p-5 bg-muted/10">
            <h3 className="text-sm font-semibold mb-3">Ações Rápidas</h3>
            <div className="flex gap-3 flex-wrap">
              <button className="px-4 py-2 rounded-lg border border-border bg-card hover:border-primary hover:text-primary transition-colors text-sm font-medium">
                <span className="inline-block mr-2">📊</span> Histórico de Entradas
              </button>
              <button className="px-4 py-2 rounded-lg border border-border bg-card hover:border-primary hover:text-primary transition-colors text-sm font-medium">
                <span className="inline-block mr-2">🔄</span> Forçar Sincronização
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
