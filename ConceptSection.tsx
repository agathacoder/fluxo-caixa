import React, { useState } from "react";
import { PlusCircle, MinusCircle, Wallet, ArrowUpRight, ArrowDownRight, RefreshCw, AlertCircle, Sparkles } from "lucide-react";

export default function ConceptSection() {
  const [activeConcept, setActiveConcept] = useState<"fluxo" | "entradas" | "saidas" | "lucro_prejuizo" | "fixo_variavel">("fluxo");
  
  // Interactive mini simulation for concepts
  const [visualBalance, setVisualBalance] = useState<number>(3000);
  const [visualLogs, setVisualLogs] = useState<Array<{ type: "entrada" | "saida"; description: string; value: number; id: number }>>([
    { type: "entrada", description: "Venda de Expressos", value: 500, id: 1 },
    { type: "saida", description: "Conta de Energia", value: 200, id: 2 },
  ]);

  const addInteractiveEntry = () => {
    const value = 400;
    const entryTypes = ["Venda de Cappuccinos", "Encomenda de Bolos", "Serviço de Evento", "Recebimento Cliente"];
    const desc = entryTypes[Math.floor(Math.random() * entryTypes.length)];
    setVisualBalance(prev => prev + value);
    setVisualLogs(prev => [
      { type: "entrada", description: desc, value, id: Date.now() },
      ...prev.slice(0, 4)
    ]);
  };

  const addInteractiveWithdrawal = () => {
    const value = 250;
    const exitTypes = ["Compra de Copos", "Fornecedor de Leite", "Internet Comercial", "Manutenção Moedor"];
    const desc = exitTypes[Math.floor(Math.random() * exitTypes.length)];
    setVisualBalance(prev => prev - value);
    setVisualLogs(prev => [
      { type: "saida", description: desc, value, id: Date.now() },
      ...prev.slice(0, 4)
    ]);
  };

  const resetInteractive = () => {
    setVisualBalance(3000);
    setVisualLogs([
      { type: "entrada", description: "Venda de Expressos", value: 500, id: 1 },
      { type: "saida", description: "Conta de Energia", value: 200, id: 2 },
    ]);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Visual Explanation Concept Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Side: Navigation & Educational Cards */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-md p-6 space-y-6">
            <h4 className="text-xl font-sans font-extrabold text-[#005ca9] tracking-tight pb-3 border-b border-slate-100 flex items-center justify-between">
              <span>Enciclopédia de Finanças da Ana ☕</span>
              <span className="text-xs font-mono font-bold bg-amber-50 text-amber-700 px-3 py-1 rounded-full border border-amber-200">SELECIONE UM CONCEITO</span>
            </h4>

            {/* Selector Grid Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                { id: "fluxo", label: "Fluxo de Caixa" },
                { id: "entradas", label: "Entradas 💰" },
                { id: "saidas", label: "Saídas 📉" },
                { id: "lucro_prejuizo", label: "Lucro vs Prejuízo 📊" },
                { id: "fixo_variavel", label: "Fixo vs Variável" },
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveConcept(item.id as any)}
                  className={`text-xs font-bold px-3 py-2.5 rounded-xl border text-center transition-all ${
                    activeConcept === item.id
                      ? "bg-[#005ca9] text-white border-[#005ca9] shadow-sm transform scale-[1.02]"
                      : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-950"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Concept Content Body */}
            <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 min-h-[220px] flex flex-col justify-between">
              {activeConcept === "fluxo" && (
                <div className="space-y-3">
                  <span className="text-xs font-bold tracking-wider text-amber-600 uppercase font-mono block">DEFINIÇÃO PRINCIPAL</span>
                  <h5 className="text-lg font-bold text-slate-900 font-sans">O que é o Fluxo de Caixa?</h5>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    É a ferramenta mais importante de saúde financeira! Trata-se do <strong>registro e acompanhamento contínuo de todo o dinheiro que entra e sai</strong> da empresa durante um período específico (diário, semanal ou mensal).
                  </p>
                  <p className="text-slate-500 text-xs italic">
                    💡 Permite que o empresário saiba exatamente se haverá saldo em caixa para honrar os compromissos futuros.
                  </p>
                </div>
              )}

              {activeConcept === "entradas" && (
                <div className="space-y-3">
                  <span className="text-xs font-bold tracking-wider text-emerald-600 uppercase font-mono block">SALDO POSITIVO INBOUND</span>
                  <h5 className="text-lg font-bold text-slate-900 font-sans">Entradas 💰</h5>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Todo e qualquer recurso financeiro que entra no caixa da empresa. Vem principalmente de:
                  </p>
                  <ul className="text-slate-600 text-sm pl-4 list-disc space-y-1">
                    <li><strong>Vendas à Vista</strong> de produtos (cafés, salgados, bolos)</li>
                    <li><strong>Recebimentos</strong> de vendas parceladas no cartão de crédito</li>
                    <li><strong>Prestação de serviços</strong> prestados pela empresa</li>
                  </ul>
                </div>
              )}

              {activeConcept === "saidas" && (
                <div className="space-y-3">
                  <span className="text-xs font-bold tracking-wider text-red-600 uppercase font-mono block">SALDO NEGATIVO OUTBOUND</span>
                  <h5 className="text-lg font-bold text-slate-900 font-sans">Saídas 📉</h5>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Toda circulação de dinheiro que sai da empresa para efetuar pagamentos. Exemplos práticos:
                  </p>
                  <ul className="text-slate-600 text-sm pl-4 list-disc space-y-1">
                    <li><strong>Fornecedores</strong> de ingredientes e mercadorias</li>
                    <li><strong>Custos Operacionais</strong>: água, energia, internet comercial</li>
                    <li><strong>Folha de Salários</strong> e encargos dos colaboradores</li>
                    <li><strong>Impostos e Taxas</strong> fiscais e de maquininhas de cartão</li>
                  </ul>
                </div>
              )}

              {activeConcept === "lucro_prejuizo" && (
                <div className="space-y-3">
                  <span className="text-xs font-bold tracking-wider text-indigo-600 uppercase font-mono block">EQUAÇÃO DO SUCESSO OU ALERTA</span>
                  <h5 className="text-lg font-bold text-slate-900 font-sans">Lucro vs Prejuízo 📊</h5>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    A saúde financeira é definida por uma simples subtração: <br />
                    <code className="text-xs font-mono font-bold bg-slate-200 px-2 py-0.5 rounded text-neutral-800">Resultado = Entradas - Saídas</code>
                  </p>
                  <div className="grid grid-cols-2 gap-3 mt-2">
                    <div className="p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-xs leading-relaxed">
                      <strong className="text-emerald-700 block">Lucro 📈</strong>
                      Quando entra MAIS dinheiro do que sai. Sobrou dinheiro!
                    </div>
                    <div className="p-2.5 bg-rose-50 border border-rose-200 text-rose-800 rounded-lg text-xs leading-relaxed">
                      <strong className="text-rose-700 block text-xs">Prejuízo 🚨</strong>
                      Quando sai MAIS dinheiro do que entra. Faltou dinheiro!
                    </div>
                  </div>
                </div>
              )}

              {activeConcept === "fixo_variavel" && (
                <div className="space-y-3">
                  <span className="text-xs font-bold tracking-wider text-yellow-600 uppercase font-mono block">COMPARTIMENTANDO OS GASTOS</span>
                  <h5 className="text-lg font-bold text-slate-900 font-sans">Despesas Fixas vs Despesas Variáveis</h5>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    Dividir suas saídas ajuda a planejar custos.
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-2.5 bg-slate-100 rounded-lg text-xs">
                      <strong className="text-[#005ca9] block">Despesas Fixas 🏢</strong>
                      Gastos que acontecem todo mês de forma recorrente, mesmo que você não venda nada (Aluguel, Internet, Salários fixos).
                    </div>
                    <div className="p-2.5 bg-orange-50 border border-orange-200 text-orange-850 rounded-lg text-xs">
                      <strong className="text-orange-700 block">Despesas Variáveis 📦</strong>
                      Gastos que mudam proporcionalmente com as vendas (Ingredientes, embalagens, taxas por venda no cartão).
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Cash Flow Animation Pipeline */}
        <div className="lg:col-span-5 bg-slate-900 text-slate-100 border border-slate-800 rounded-2xl shadow-xl p-6 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div className="flex items-center space-x-2">
                <Wallet className="h-5 w-5 text-emerald-400" />
                <span className="font-sans font-extrabold text-sm uppercase tracking-wider text-white">Visualizador Caixa Rápido</span>
              </div>
              <button
                onClick={resetInteractive}
                className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 transition-colors"
                title="Reiniciar"
                id="concept-reset-btn"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
            </div>

            {/* Display Balance Screen */}
            <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800 text-center relative overflow-hidden">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#ff9e1b] font-bold">Saldo do Caixa em Tempo Real</span>
              <h4 className={`text-3xl font-extrabold tracking-tight font-sans mt-1 transition-colors ${visualBalance >= 0 ? "text-emerald-400" : "text-red-400"}`}>
                R$ {visualBalance.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </h4>
              <div className="flex justify-center gap-2 mt-2">
                {visualBalance > 3000 ? (
                  <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1">
                    <Sparkles className="h-3 w-3" /> Lucro Operacional Alto!
                  </span>
                ) : visualBalance < 1000 ? (
                  <span className="text-[10px] bg-red-500/10 text-red-400 border border-red-500/20 px-2.5 py-0.5 rounded-full font-semibold flex items-center gap-1 animate-pulse">
                    <AlertCircle className="h-3 w-3" /> Atenção: Caixa Apertado
                  </span>
                ) : (
                  <span className="text-[10px] bg-sky-500/10 text-sky-400 border border-sky-500/20 px-2.5 py-0.5 rounded-full font-bold">
                    Operação Estável
                  </span>
                )}
              </div>
            </div>

            {/* Logs Timeline */}
            <div className="mt-5 space-y-2">
              <span className="text-[10px] font-mono text-slate-400 uppercase block tracking-wider font-semibold">Fluxo de Lançamentos Recentes</span>
              <div className="space-y-1.5 max-h-[140px] overflow-y-auto pr-1">
                {visualLogs.map((log) => (
                  <div
                    key={log.id}
                    className="flex items-center justify-between p-2 rounded-lg bg-slate-955/50 hover:bg-slate-800/80 border border-slate-800/40 text-xs transition-colors"
                  >
                    <div className="flex items-center space-x-2">
                      {log.type === "entrada" ? (
                        <ArrowUpRight className="h-4 w-4 text-emerald-400" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4 text-red-400" />
                      )}
                      <span className="font-semibold text-slate-200">{log.description}</span>
                    </div>
                    <span className={`font-mono font-bold ${log.type === "entrada" ? "text-emerald-400" : "text-red-400"}`}>
                      {log.type === "entrada" ? "+" : "-"} R$ {log.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Simulation Buttons */}
          <div className="pt-4 border-t border-slate-800/60 space-y-3">
            <div className="text-xs text-slate-400 text-center font-sans">
              Clique nos botões para simular transações e ver o saldo flutuar:
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={addInteractiveEntry}
                className="flex items-center justify-center space-x-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 active:scale-95 transition-all text-white text-xs font-bold rounded-xl shadow-md cursor-pointer"
                id="concept-add-entry"
              >
                <PlusCircle className="h-4 w-4" />
                <span>Receber Venda (+ R$ 400)</span>
              </button>
              <button
                onClick={addInteractiveWithdrawal}
                className="flex items-center justify-center space-x-1 py-2.5 bg-rose-600 hover:bg-rose-500 active:scale-95 transition-all text-white text-xs font-bold rounded-xl shadow-md cursor-pointer"
                id="concept-add-withdrawal"
              >
                <MinusCircle className="h-4 w-4" />
                <span>Pagar Despesa (- R$ 250)</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Reserve Bonus Callout */}
      <div className="bg-gradient-to-r from-[#005ca9] to-indigo-800 text-white rounded-2xl shadow-md p-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        <div className="md:col-span-8 space-y-2">
          <span className="text-[10px] font-bold text-[#ff9e1b] uppercase tracking-widest font-mono">Resguardo Estratégico</span>
          <h4 className="text-lg font-bold font-sans">🛡️ Seção Especial: Reserva de Emergência</h4>
          <p className="text-xs text-slate-100 leading-relaxed font-sans">
            É o fundo de segurança que toda pequena empresa precisa ter. O ideal é poupar o equivalente a <strong>3 a 6 meses das suas despesas fixas operacionais</strong>. Esse dinheiro serve para segurar as pontas em meses fracos ou durante imprevistos graves (como defeito em máquinas).
          </p>
        </div>
        <div className="md:col-span-4 bg-sky-900/60 p-4 border border-sky-600/30 rounded-xl text-center">
          <span className="text-[10px] text-sky-200 block">Exemplo se a Despesa Fixa for de R$ 4.000:</span>
          <span className="text-xl font-extrabold text-[#ff9e1b] block mt-1">R$ 12.000 a R$ 24.000</span>
          <span className="text-[9px] text-slate-300 block">Como reserva alvo recomendada</span>
        </div>
      </div>
    </div>
  );
}
