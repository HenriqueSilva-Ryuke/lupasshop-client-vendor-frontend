'use client';

import { FileDown, Download, BarChart2, PieChart, TrendingUp, Calendar, Filter } from 'lucide-react';
import { useState } from 'react';

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState('last_30_days');

  const handleDownload = (type: string) => {
    alert(`Iniciando download do relatório: ${type}`);
  };

  return (
    <div className="w-full relative bg-background-light min-h-screen">
      <header className="sticky top-0 z-20 w-full bg-card/95 backdrop-blur-md border-b border-border">
        <div className="px-6 py-4 lg:px-10">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl lg:text-3xl font-black leading-tight tracking-[-0.033em]">
                Relatórios
              </h1>
              <p className="text-sm lg:text-base font-normal text-muted-foreground">
                Exporte dados e analise o desempenho da sua loja
              </p>
            </div>
            
            <div className="flex items-center gap-3 bg-card border border-border rounded-lg px-3 py-1.5 shadow-sm">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <select 
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="bg-transparent text-sm font-medium focus:outline-none"
              >
                <option value="today">Hoje</option>
                <option value="last_7_days">Últimos 7 dias</option>
                <option value="last_30_days">Últimos 30 dias</option>
                <option value="this_month">Este Mês</option>
                <option value="last_month">Mês Passado</option>
                <option value="this_year">Este Ano</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6 lg:p-10 max-w-[1200px] mx-auto space-y-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-sm font-medium text-muted-foreground">Vendas Totais</h3>
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><PieChart className="w-4 h-4" /></div>
            </div>
            <p className="text-2xl font-bold">1.240</p>
            <p className="text-xs text-green-600 flex items-center gap-1 mt-2">
              <TrendingUp className="w-3 h-3" /> +12% do mês passado
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-sm font-medium text-muted-foreground">Receita</h3>
              <div className="p-2 bg-green-50 text-green-600 rounded-lg"><BarChart2 className="w-4 h-4" /></div>
            </div>
            <p className="text-2xl font-bold">AOA 84.500</p>
            <p className="text-xs text-green-600 flex items-center gap-1 mt-2">
              <TrendingUp className="w-3 h-3" /> +8.5% do mês passado
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-sm font-medium text-muted-foreground">Ticket Médio</h3>
              <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><Filter className="w-4 h-4" /></div>
            </div>
            <p className="text-2xl font-bold">AOA 68</p>
            <p className="text-xs text-red-500 flex items-center gap-1 mt-2">
              <TrendingUp className="w-3 h-3 rotate-180" /> -2.1% do mês passado
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-sm font-medium text-muted-foreground">Taxa de Conversão</h3>
              <div className="p-2 bg-orange-50 text-orange-600 rounded-lg"><TrendingUp className="w-4 h-4" /></div>
            </div>
            <p className="text-2xl font-bold">3.4%</p>
            <p className="text-xs text-green-600 flex items-center gap-1 mt-2">
              <TrendingUp className="w-3 h-3" /> +0.4% do mês passado
            </p>
          </div>
        </div>

        {/* Generate Reports */}
        <section className="bg-card border border-border rounded-xl shadow-sm p-6">
          <div className="mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2 mb-1">Central de Relatórios</h2>
            <p className="text-sm text-muted-foreground">Selecione o tipo de relatório que deseja exportar. Os arquivos serão gerados no formato CSV ou PDF.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="border border-border rounded-lg p-5 hover:border-primary/50 transition-all flex flex-col h-full bg-background/50">
              <div className="flex-1">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-4">
                  <FileDown className="w-6 h-6" />
                </div>
                <h3 className="font-semibold mb-2">Vendas e Faturamento</h3>
                <p className="text-sm text-muted-foreground mb-4">Detalhamento de todas as transações, descontos aplicados e impostos cobrados no período.</p>
              </div>
              <button 
                onClick={() => handleDownload('vendas')}
                className="w-full mt-auto py-2.5 bg-primary text-white rounded-lg text-sm font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
              >
                <Download className="w-4 h-4" /> Baixar CSV
              </button>
            </div>

            <div className="border border-border rounded-lg p-5 hover:border-primary/50 transition-all flex flex-col h-full bg-background/50">
              <div className="flex-1">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-4">
                  <PieChart className="w-6 h-6" />
                </div>
                <h3 className="font-semibold mb-2">Produtos mais vendidos</h3>
                <p className="text-sm text-muted-foreground mb-4">Ranking de produtos, mostrando volume de vendas, receita gerada e margem de lucro.</p>
              </div>
              <button 
                onClick={() => handleDownload('produtos')}
                className="w-full mt-auto py-2.5 bg-primary text-white rounded-lg text-sm font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
              >
                <Download className="w-4 h-4" /> Baixar Excel
              </button>
            </div>

            <div className="border border-border rounded-lg p-5 hover:border-primary/50 transition-all flex flex-col h-full bg-background/50">
              <div className="flex-1">
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-4">
                  <Calendar className="w-6 h-6" />
                </div>
                <h3 className="font-semibold mb-2">Pedidos e Entregas</h3>
                <p className="text-sm text-muted-foreground mb-4">Status de todos os pedidos, tempo médio de entrega e volume de devoluções.</p>
              </div>
              <button 
                onClick={() => handleDownload('pedidos')}
                className="w-full mt-auto py-2.5 bg-primary text-white rounded-lg text-sm font-semibold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
              >
                <Download className="w-4 h-4" /> Baixar PDF
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
