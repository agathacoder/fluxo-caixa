import React, { useState, useEffect, useRef } from "react";
import { SimulatorInputs } from "../types";
import { DollarSign, ShieldCheck, AlertTriangle, Play, HelpCircle, FileText, ArrowRight, BookOpen, RefreshCw } from "lucide-react";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

// Register Chart.js components
Chart.register(
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function SimulatorSection() {
  // Setup state with Preset 1 (Ana in crisis) initially
  const [inputs, setInputs] = useState<SimulatorInputs>({
    vendas: 4500,
    aluguel: 1500,
    salarios: 2000,
    internetServicos: 150,
    insumosCategorias: 1200,
    embalagens: 300,
    impostosComissoes: 250,
  });

  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  // Business presets
  const presets = [
    {
      name: "Cafeteria da Ana (Crise Inicial)",
      inputs: {
        vendas: 4500,
        aluguel: 1500,
        salarios: 2000,
        internetServicos: 150,
        insumosCategorias: 1200,
        embalagens: 300,
        impostosComissoes: 250,
      },
      description: "Muitas saídas acumuladas, vendas baixas e salário inflado para o tamanho. Resultado deficitário.",
    },
    {
      name: "Cafeteria da Ana (Controlada)",
      inputs: {
        vendas: 8200,
        aluguel: 1500,
        salarios: 2200,
        internetServicos: 150,
        insumosCategorias: 1800,
        embalagens: 450,
        impostosComissoes: 550,
      },
      description: "Vendas aumentaram por conta de melhorias, e despesas fixas foram contidas. Resultado positivo saudável!",
    },
    {
      name: "Minha Doceria do Bairro",
      inputs: {
        vendas: 12500,
        aluguel: 2000,
        salarios: 3500,
        internetServicos: 200,
        insumosCategorias: 2900,
        embalagens: 600,
        impostosComissoes: 950,
      },
      description: "Faturamento sólido e boa margem, propício para constituir a reserva de emergência recomendada.",
    },
    {
      name: "Loja de Roupas (Alerta Vermelho)",
      inputs: {
        vendas: 16000,
        aluguel: 4500,
        salarios: 6000,
        internetServicos: 350,
        insumosCategorias: 5000,
        embalagens: 800,
        impostosComissoes: 1200,
      },
      description: "Aluguel excessivamente caro e folha de pagamento muito alta para as vendas do setor.",
    },
  ];

  const applyPreset = (idx: number) => {
    setInputs(presets[idx].inputs);
  };

  const handleInputChange = (field: keyof SimulatorInputs, val: string) => {
    const num = parseFloat(val) || 0;
    setInputs(prev => ({ ...prev, [field]: num }));
  };

  // Intermediate calculations
  const totalEntradas = inputs.vendas;
  const totalSaidasFixas = inputs.aluguel + inputs.salarios + inputs.internetServicos;
  const totalSaidasVariaveis = inputs.insumosCategorias + inputs.embalagens + inputs.impostosComissoes;
  const totalSaidas = totalSaidasFixas + totalSaidasVariaveis;
  const saldoFinal = totalEntradas - totalSaidas;

  const margemLucroPercent = totalEntradas > 0 ? (saldoFinal / totalEntradas) * 100 : 0;
  const despesaFixaPercent = totalEntradas > 0 ? (totalSaidasFixas / totalEntradas) * 100 : 0;

  // Recommended Emergency Reserve suggestion (3 to 6 months of fixed exp)
  const reservaMinima = totalSaidasFixas * 3;
  const reservaMaxima = totalSaidasFixas * 6;

  // React on changes to rebuild/update the graph
  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        // Destroy existing chart instance to prevent canvas collision
        if (chartInstanceRef.current) {
          chartInstanceRef.current.destroy();
        }

        // Build new customized financial compare chart
        chartInstanceRef.current = new Chart(ctx, {
          type: "bar",
          data: {
            labels: [
              "Entradas (Receitas)",
              "Saídas Fixas (Aluguel, Folha)",
              "Saídas Variáveis (Insumos, Margem)",
              "Total Saídas",
              "Saldo de Caixa",
            ],
            datasets: [
              {
                label: "Valores do Mês (R$)",
                data: [
                  totalEntradas,
                  totalSaidasFixas,
                  totalSaidasVariaveis,
                  totalSaidas,
                  saldoFinal,
                ],
                backgroundColor: [
                  "rgba(16, 185, 129, 0.85)", // Emerald green
                  "rgba(0, 92, 169, 0.85)",   // Caixa Blue
                  "rgba(243, 146, 0, 0.85)",   // Caixa Orange
                  "rgba(239, 68, 68, 0.85)",   // Red
                  saldoFinal >= 0 ? "rgba(52, 211, 153, 0.95)" : "rgba(244, 63, 94, 0.95)", // Vivid green / dark red
                ],
                borderColor: [
                  "#10b981",
                  "#005ca9",
                  "#f39200",
                  "#ef4444",
                  saldoFinal >= 0 ? "#34d399" : "#f43f5e",
                ],
                borderWidth: 1.5,
                borderRadius: 8,
                barThickness: 36,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                callbacks: {
                  label: (context) => {
                    const value = context.parsed.y;
                    return ` R$ ${value.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`;
                  },
                },
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                grid: {
                  color: "#f1f5f9",
                },
                ticks: {
                  callback: (value) => `R$ ${value}`,
                  font: {
                    size: 11,
                  }
                },
              },
              x: {
                grid: {
                  display: false,
                },
                ticks: {
                  font: {
                    size: 10,
                  }
                }
              },
            },
          },
        });
      }
    }

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [inputs, totalEntradas, totalSaidasFixas, totalSaidasVariaveis, totalSaidas, saldoFinal]);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Alert Banner / Presentation hook info */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-md p-6">
        <h4 className="text-lg font-sans font-extrabold text-[#005ca9] mb-1">
          📊 Simulador de Fluxo de Caixa Financeiro
        </h4>
        <p className="text-sm text-slate-500 leading-relaxed">
          Simule os faturamentos e despesas para ver em tempo real como o gráfico responde! Veja quando a empresa obtém Lucro ou entra em Prejuízo, e descubra a meta de reserva de segurança.
        </p>
      </div>

      {/* Preset Chooser Widget */}
      <div className="bg-[#005ca9]/10 border border-[#005ca9]/20 rounded-2xl p-6 text-slate-800">
        <span className="text-xs font-mono font-black text-[#005ca9] uppercase tracking-wider block mb-3">
          ⚡ Presets Recomendados para Apresentação em Sala:
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {presets.map((preset, idx) => (
            <button
              key={preset.name}
              onClick={() => applyPreset(idx)}
              className="p-3 bg-white hover:bg-[#005ca9] hover:text-white rounded-xl border border-slate-200 shadow-sm transition-all text-left group cursor-pointer"
            >
              <div className="font-sans font-extrabold text-xs text-slate-900 group-hover:text-white transition-colors">
                {preset.name}
              </div>
              <div className="text-[10px] text-slate-500 group-hover:text-slate-200 mt-1 line-clamp-2 leading-relaxed font-sans">
                {preset.description}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid Area (Form on Left / Graph on Right) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        
        {/* INPUT FORM: Left Side */}
        <div className="xl:col-span-5 bg-white border border-slate-200 rounded-2xl shadow-md p-6 space-y-6">
          <h5 className="font-sans font-black text-xs uppercase tracking-wider text-[#005ca9] pb-3 border-b border-slate-100 flex items-center justify-between">
            <span>DADOS DE ENTRADAS & SAÍDAS</span>
            <span className="text-[10px] font-mono text-slate-400 font-bold">VALORES MENSAIS</span>
          </h5>

          {/* Section A: Receitas */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-emerald-600 block uppercase tracking-wider font-mono">
              Entrada Principal (Positiva) 💰
            </span>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 flex justify-between">
                <span>Vendas do Mês / Faturamento</span>
                <span className="text-emerald-600 font-mono">+)</span>
              </label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <span className="text-slate-400 text-xs font-bold font-mono">R$</span>
                </div>
                <input
                  type="number"
                  value={inputs.vendas || ""}
                  onChange={(e) => handleInputChange("vendas", e.target.value)}
                  className="block w-full pl-10 pr-4 py-2 text-sm text-slate-900 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#005ca9] focus:border-transparent font-medium"
                />
              </div>
            </div>
          </div>

          {/* Section B: Custos Fixos */}
          <div className="space-y-4 border-t border-slate-100 pt-4">
            <span className="text-xs font-bold text-[#005ca9] block uppercase tracking-wider font-mono">
              Despesas Fixas Mensais (Negativas) 🏢
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Aluguel do Espaço</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 text-xs font-mono">R$</span>
                  <input
                    type="number"
                    value={inputs.aluguel || ""}
                    onChange={(e) => handleInputChange("aluguel", e.target.value)}
                    className="block w-full pl-8 pr-3 py-2 text-sm border border-slate-200 rounded-xl focus:ring-[#005ca9] focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Salários / Pró-labore</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 text-xs font-mono">R$</span>
                  <input
                    type="number"
                    value={inputs.salarios || ""}
                    onChange={(e) => handleInputChange("salarios", e.target.value)}
                    className="block w-full pl-8 pr-3 py-2 text-sm border border-slate-200 rounded-xl focus:ring-[#005ca9] focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="text-xs font-semibold text-slate-700">Internet, Contador, Energia (Fração Fixa)</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 text-xs font-mono">R$</span>
                  <input
                    type="number"
                    value={inputs.internetServicos || ""}
                    onChange={(e) => handleInputChange("internetServicos", e.target.value)}
                    className="block w-full pl-8 pr-3 py-2 text-sm border border-slate-200 rounded-xl focus:ring-[#005ca9] focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section C: Custos Variaveis */}
          <div className="space-y-4 border-t border-slate-100 pt-4">
            <span className="text-xs font-bold text-[#f39200] block uppercase tracking-wider font-mono">
              Despesas Variáveis Mensais (Negativas) 📦
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Matéria-Prima / Insumos</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 text-xs font-mono">R$</span>
                  <input
                    type="number"
                    value={inputs.insumosCategorias || ""}
                    onChange={(e) => handleInputChange("insumosCategorias", e.target.value)}
                    className="block w-full pl-8 pr-3 py-2 text-sm border border-slate-200 rounded-xl focus:ring-[#005ca9] focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Embalagens / Copos</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 text-xs font-mono">R$</span>
                  <input
                    type="number"
                    value={inputs.embalagens || ""}
                    onChange={(e) => handleInputChange("embalagens", e.target.value)}
                    className="block w-full pl-8 pr-3 py-2 text-sm border border-slate-200 rounded-xl focus:ring-[#005ca9] focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="text-xs font-semibold text-slate-700">Impostos Federais e Estaduais + Comissões</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 text-xs font-mono">R$</span>
                  <input
                    type="number"
                    value={inputs.impostosComissoes || ""}
                    onChange={(e) => handleInputChange("impostosComissoes", e.target.value)}
                    className="block w-full pl-8 pr-3 py-2 text-sm border border-slate-200 rounded-xl focus:ring-[#005ca9] focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CHAT/GRAPH & METRICS: Right Side */}
        <div className="xl:col-span-7 flex flex-col justify-between space-y-6">
          
          {/* Real-time Indicator Panels */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-4 text-center">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 font-mono">Total Entradas</span>
              <h5 className="text-lg font-black text-emerald-600 mt-1">R$ {totalEntradas.toLocaleString("pt-BR")}</h5>
            </div>
            
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-4 text-center">
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 font-mono">Total Saídas</span>
              <h5 className="text-lg font-black text-red-500 mt-1">R$ {totalSaidas.toLocaleString("pt-BR")}</h5>
            </div>

            <div className={`border rounded-2xl shadow-sm p-4 text-center transition-all ${
              saldoFinal >= 0 ? "bg-emerald-50/50 border-emerald-200" : "bg-red-50/50 border-red-200"
            }`}>
              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-600 font-mono flex items-center justify-center gap-1">
                Saldo de Caixa {saldoFinal >= 0 ? "📈" : "🚨"}
              </span>
              <h5 className={`text-lg font-black mt-1 ${saldoFinal >= 0 ? "text-emerald-700" : "text-rose-700"}`}>
                R$ {saldoFinal.toLocaleString("pt-BR")}
              </h5>
            </div>
          </div>

          {/* Gráfico Section */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-md p-6 flex flex-col justify-between">
            <h5 className="font-sans font-black text-xs uppercase tracking-wider text-[#005ca9] mb-4 flex items-center justify-between pb-3 border-b border-slate-150">
              <span>Comparativo Visual de Fluxo</span>
              <span className="text-[9px] font-mono text-slate-400">Desenhado via Chart.js</span>
            </h5>
            
            {/* The Canvas for Chart.js */}
            <div className="h-[240px] relative w-full mb-2">
              <canvas ref={chartRef}></canvas>
            </div>
          </div>

          {/* Feedback Card regarding current simulation status */}
          <div className={`p-6 rounded-2xl shadow-sm border ${
            saldoFinal > 0 
              ? "bg-slate-900 border-emerald-500 text-white" 
              : "bg-rose-50 border-rose-250 text-rose-950"
          }`}>
            <div className="flex items-start space-x-3">
              {saldoFinal > 0 ? (
                <ShieldCheck className="h-6 w-6 text-emerald-450 shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle className="h-6 w-6 text-rose-600 shrink-0 mt-0.5" />
              )}
              <div className="space-y-1">
                <h6 className="font-sans font-extrabold text-sm mb-1">
                  Análise de Desempenho do Mês
                </h6>
                <p className="text-xs leading-relaxed text-slate-300 font-sans">
                  {saldoFinal > 0 ? (
                    <span>
                      Parabéns! Sua empresa está tendo um saldo líquido positivo de <strong>R$ {saldoFinal.toLocaleString("pt-BR")}</strong>. Sua margem de lucro operacional é de <strong>{margemLucroPercent.toFixed(1)}%</strong>. Sua estrutura de despesa fixa representa <strong>{despesaFixaPercent.toFixed(1)}%</strong> do seu volume faturado.
                    </span>
                  ) : (
                    <span className="text-slate-800">
                      Cuidado! Suas despesas superaram suas receitas em <strong>R$ {Math.abs(saldoFinal).toLocaleString("pt-BR")}</strong>. Se essa situação persistir por alguns meses sem reservas, você precisará contrair dívidas bancárias pesadas ou sua empresa irá à falência. Reduza custos fixos imediatamente e tente atrair mais clientes.
                    </span>
                  )}
                </p>

                <div className="mt-3 pt-3 border-t border-slate-700/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-mono block">Reserva de Emergência Recomendável</span>
                    <span className="text-xs font-bold text-[#ff9e1b]">R$ {reservaMinima.toLocaleString("pt-BR")} até R$ {reservaMaxima.toLocaleString("pt-BR")}</span>
                  </div>
                  <span className="text-[9px] text-slate-400 italic block font-sans">Calculado com base em 3 a 6 meses de Despesas Fixas (R$ {totalSaidasFixas.toLocaleString("pt-BR")}/mês)</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
