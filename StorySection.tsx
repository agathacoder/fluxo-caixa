import React, { useState } from "react";
import { Coffee, ArrowRight, ArrowLeft, Heart, AlertTriangle, CheckCircle2, TrendingUp, Sparkles, User, Landmark, HelpCircle } from "lucide-react";

interface StorySlide {
  title: string;
  subtitle: string;
  content: string;
  charState: "happy" | "confused" | "stressed" | "organized" | "rich";
  visualType: "sales" | "crises" | "mistake" | "planning" | "success";
}

export default function StorySection({ onGoToSimulator }: { onGoToSimulator: () => void }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [dragResult, setDragResult] = useState<{ [key: string]: string }>({});
  const [showExplanation, setShowExplanation] = useState(false);

  const slides: StorySlide[] = [
    {
      title: "1. O Começo de um Sonho ☕",
      subtitle: "Ana abre o 'Café Bairro' com muito carinho",
      content: "Ana sempre amou café. Com muito esforço, realizou o seu sonho e abriu uma cafeteria aconchegante. No primeiro mês, a resposta do bairro foi fantástica! Clientes felizes, cafeteria cheia e o som doce da máquina de espresso o dia todo.",
      charState: "happy",
      visualType: "sales",
    },
    {
      title: "2. A Ilusão do Lucro 💰",
      subtitle: "Vender muito é igual a ter dinheiro?",
      content: "As vendas da cafeteria cresciam semanalmente. Ana via dinheiro entrando na gaveta o tempo todo e pensava: 'Estou rica! Meu faturamento está excelente, vou comprar uma máquina de café nova e pagar o jantar da família hoje com esse dinheiro.'",
      charState: "rich",
      visualType: "sales",
    },
    {
      title: "3. O Despertar Assustador 🚨",
      subtitle: "Cadê o dinheiro que estava aqui?",
      content: "Duas semanas depois, começaram os problemas. O boleto do fornecedor de grãos de café venceu, a conta de luz da máquina comercial chegou alta, e o aluguel bateu à porta. Ao olhar o caixa da empresa, Ana levou um susto: faltava dinheiro para comprar leite! Como isso é possível se ela vendeu tanto?",
      charState: "stressed",
      visualType: "crises",
    },
    {
      title: "4. O Erro Encoberto 🔍",
      subtitle: "Onde a Ana errou gravemente?",
      content: "Ana misturava o seu dinheiro pessoal com o dinheiro do caixa da cafeteria (comprava sapatos na mesma conta em que pagava os fornecedores de café!). Além disso, ela não sabia quanto gastava de Despesas Fixas (aluguel, internet) e Despesas Variáveis (grãos, copos descartáveis). Ela só olhava o saldo final na conta bancária.",
      charState: "confused",
      visualType: "mistake",
    },
    {
      title: "5. A Virada de Chave: O Fluxo de Caixa 💡",
      subtitle: "Análise fria e separação de contas",
      content: "Ana percebeu que precisava de controle financeiro. Ela criou duas contas bancárias distintas: uma para ela (Pessoal) e outra exclusiva para a Cafeteria (Empresa). Adotou a disciplina do Fluxo de Caixa, passando a registrar diariamente todas as Entradas de dinheiro e as Saídas, dividindo tudo entre gastos fixos e variáveis.",
      charState: "organized",
      visualType: "planning",
    },
    {
      title: "6. O Sucesso da Organização ✅",
      subtitle: "Uma cafeteria próspera e equilibrada",
      content: "Após três meses de controle rigoroso de fluxo de caixa, o 'Café Bairro' mudou da água para o vinho. Ana sabia exatamente as semanas de maior entrada, planejava as datas dos pagamentos, reduziu o desperdício de insumos, criou uma reserva de emergência e começou a colher um Lucro real e sustentável!",
      charState: "rich",
      visualType: "success",
    },
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  // Simple Interactive Mini drag/drop simulator for Ana's bills
  const handleCategorize = (item: string, category: "entrada" | "fixa" | "variavel") => {
    setDragResult(prev => ({ ...prev, [item]: category }));
  };

  const isCategorizationCorrect = 
    dragResult["venda_cafe"] === "entrada" &&
    dragResult["aluguel"] === "fixa" &&
    dragResult["leite_copos"] === "variavel";

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Intro Quote */}
      <div className="bg-amber-50 border-l-4 border-[#ff9e1b] p-6 rounded-r-xl shadow-sm">
        <h3 className="text-[#005ca9] font-sans font-extrabold text-lg mb-2">Introdução de Impacto</h3>
        <p className="text-slate-700 italic text-base leading-relaxed">
          &ldquo;Muitas pequenas empresas vendem bastante... mas mesmo assim acabam sem dinheiro no final do mês.&rdquo;
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Main Story Book Core */}
        <div className="lg:col-span-8 bg-white border border-slate-200/80 rounded-2xl shadow-md overflow-hidden">
          {/* Progress Indicator */}
          <div className="bg-slate-50 border-b border-slate-100 px-6 py-4 flex items-center justify-between">
            <span className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest">
              A HISTÓRIA DA ANA • CAPÍTULO {currentSlide + 1} DE {slides.length}
            </span>
            <div className="flex space-x-1">
              {slides.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 w-6 rounded-full transition-all duration-300 ${
                    idx === currentSlide ? "bg-[#ff9e1b] w-8" : "bg-slate-200"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="p-8 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h4 className="text-xl font-sans font-extrabold text-[#005ca9] tracking-tight">
                  {slides[currentSlide].title}
                </h4>
                <p className="text-sm font-semibold text-amber-600 mt-0.5">
                  {slides[currentSlide].subtitle}
                </p>
              </div>
              
              {/* Status Bagdes for Ana */}
              <div className="flex items-center space-x-2">
                <span className="text-xs font-semibold px-3 py-1 rounded-full border flex items-center gap-1.5">
                  {slides[currentSlide].charState === "happy" && (
                    <span className="flex items-center text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <Sparkles className="h-3 w-3 mr-1" /> Estado da Ana: Empolgada
                    </span>
                  )}
                  {slides[currentSlide].charState === "rich" && (
                    <span className="flex items-center text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                      <TrendingUp className="h-3 w-3 mr-1" /> Estado da Ana: Iludida pelo Faturamento
                    </span>
                  )}
                  {slides[currentSlide].charState === "stressed" && (
                    <span className="flex items-center text-red-600 bg-red-50 px-2 py-0.5 rounded-full border border-red-200 animate-pulse">
                      <AlertTriangle className="h-3 w-3 mr-1" /> Estado da Ana: Desesperada
                    </span>
                  )}
                  {slides[currentSlide].charState === "confused" && (
                    <span className="flex items-center text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                      <HelpCircle className="h-3 w-3 mr-1" /> Estado da Ana: Sem Compreender o Rumo
                    </span>
                  )}
                  {slides[currentSlide].charState === "organized" && (
                    <span className="flex items-center text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200">
                      <CheckCircle2 className="h-3 w-3 mr-1" /> Estado da Ana: Educada Financeiramente
                    </span>
                  )}
                </span>
              </div>
            </div>

            {/* Main Narration Body */}
            <p className="text-slate-700 text-base leading-relaxed font-sans bg-slate-50/50 p-5 rounded-xl border border-slate-100">
              {slides[currentSlide].content}
            </p>

            {/* Visual Screen matching the narrative */}
            <div className="border border-slate-200 rounded-xl overflow-hidden shadow-inner p-6 bg-slate-50 flex items-center justify-center min-h-[160px]">
              {slides[currentSlide].visualType === "sales" && (
                <div className="text-center space-y-3">
                  <div className="flex justify-center space-x-2">
                    <span className="bg-emerald-100 text-emerald-600 p-3 rounded-full text-xl animate-bounce">☕</span>
                    <span className="bg-emerald-100 text-emerald-600 p-3 rounded-full text-xl animate-bounce delay-100">🍰</span>
                    <span className="bg-emerald-100 text-emerald-600 p-3 rounded-full text-xl animate-bounce delay-200">💸</span>
                  </div>
                  <p className="text-xs font-mono text-slate-500">MUITO CAFÉ SENDO VENDIDO! Faturamento Bruto nas nuvens.</p>
                  <div className="text-xs bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-2 rounded-lg font-bold">
                    Vendas Diárias: +R$ 1.200,00 💰
                  </div>
                </div>
              )}

              {slides[currentSlide].visualType === "crises" && (
                <div className="text-center space-y-3 w-full max-w-sm">
                  <div className="text-red-500 font-extrabold text-2xl flex justify-center items-center gap-2">
                    <AlertTriangle className="h-6 w-6 text-red-500 animate-pulse" />
                    CAIXA PARADO!
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-slate-600">
                      <span>Grãos de café vencidos:</span>
                      <span className="text-red-600 font-bold">R$ 550,00 (Vencido)</span>
                    </div>
                    <div className="flex justify-between text-xs text-slate-600">
                      <span>Energia Elétrica Comercial:</span>
                      <span className="text-red-600 font-bold">R$ 780,00 (Atrasada)</span>
                    </div>
                  </div>
                  <div className="text-xs bg-red-50 border border-red-200 text-red-700 px-4 py-1.5 rounded-lg font-bold">
                    Saldo Real na conta: R$ 12,50 😢
                  </div>
                </div>
              )}

              {slides[currentSlide].visualType === "mistake" && (
                <div className="grid grid-cols-2 gap-4 w-full">
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-center">
                    <span className="text-sm font-bold block text-red-700">Cartão Pessoal 🛍️</span>
                    <p className="text-[10px] text-slate-500 mt-1">Sapatos, jantares familiares, presentes de aniversário</p>
                    <span className="text-xs text-red-600 font-mono block mt-2">MISTURADO NA CONTA DA EMPRESA!</span>
                  </div>
                  <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-lg text-center">
                    <span className="text-sm font-bold block text-indigo-700">Caixa da Cafeteria ☕</span>
                    <p className="text-[10px] text-slate-500 mt-1">Dinheiro de cada expresso vendido</p>
                    <span className="text-xs text-amber-600 font-mono block mt-2">NÃO SE SABIA O QUE ERA LUCRO OU GASTO</span>
                  </div>
                </div>
              )}

              {slides[currentSlide].visualType === "planning" && (
                <div className="space-y-2 w-full max-w-md">
                  <div className="text-center text-xs font-mono text-slate-500 mb-1">A SOLUÇÃO: FLUXO DE CAIXA SEPARADO</div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg text-center font-bold">
                      ENTRADAS 💰
                      <div className="text-[10px] text-slate-500 font-normal mt-0.5">Controlado Centavo por Centavo</div>
                    </div>
                    <div className="p-2.5 bg-red-50 text-red-800 border border-red-200 rounded-lg text-center font-bold">
                      SAÍDAS 📉
                      <div className="text-[10px] text-slate-500 font-normal mt-0.5 font-sans">Dividido: Fixas vs Variáveis</div>
                    </div>
                  </div>
                </div>
              )}

              {slides[currentSlide].visualType === "success" && (
                <div className="text-center space-y-2">
                  <span className="text-4xl">🚀</span>
                  <div className="text-emerald-700 font-extrabold text-lg">CONTROLE DE MARGINS MENSAL</div>
                  <div className="flex gap-2 justify-center text-xs">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded font-bold">Economia Garantida</span>
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded font-bold">Salas Organizadas</span>
                    <span className="px-2 py-1 bg-amber-100 text-orange-800 rounded font-bold">Lucro sob Controle</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Stepper Footer Controls */}
          <div className="bg-slate-50 border-t border-slate-100 px-6 py-4 flex items-center justify-between">
            <button
              onClick={handlePrev}
              disabled={currentSlide === 0}
              className="flex items-center space-x-1.5 px-4 py-2 border border-slate-200 rounded-lg text-sm text-slate-600 font-medium hover:bg-slate-100 transition-colors disabled:opacity-40 disabled:hover:bg-transparent"
              id="story-prev-btn"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Voltar</span>
            </button>

            {currentSlide < slides.length - 1 ? (
              <button
                onClick={handleNext}
                className="flex items-center space-x-1.5 px-5 py-2 bg-[#005ca9] text-white rounded-lg text-sm text-center font-medium hover:bg-[#004b8a] transition-colors"
                id="story-next-btn"
              >
                <span>Avançar Capítulo</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                onClick={onGoToSimulator}
                className="flex items-center space-x-1.5 px-5 py-2 bg-emerald-600 text-white rounded-lg text-sm font-bold hover:bg-emerald-700 hover:scale-105 transition-all shadow-md"
                id="story-simulation-btn"
              >
                <span>Ir para Prática (Simulador)</span>
                <Sparkles className="h-4 w-4 ml-1 text-yellow-300" />
              </button>
            )}
          </div>
        </div>

        {/* Story Sidebar Interactive Mini Game */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl shadow-md p-6">
            <div className="flex items-center space-x-2.5 mb-4 border-b border-slate-100 pb-3">
              <span className="text-xl">🎓</span>
              <div>
                <h5 className="font-sans font-extrabold text-sm text-[#005ca9] uppercase tracking-wide">
                  Desafio de Aprendizado
                </h5>
                <p className="text-[11px] text-slate-500 font-medium">Ajude Ana a categorizar esses 3 itens de fluxo!</p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Item 1 */}
              <div className="space-y-1.5 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-xs font-bold text-slate-700 block">1. R$ 350,00 de Venda de Café</span>
                <div className="flex gap-1.5 mt-1.5">
                  {(["entrada", "fixa", "variavel"] as const).map(cat => (
                    <button
                      key={cat}
                      onClick={() => handleCategorize("venda_cafe", cat)}
                      className={`text-[10px] uppercase tracking-wider font-semibold px-2 py-1 rounded transition-all ${
                        dragResult["venda_cafe"] === cat
                          ? cat === "entrada"
                            ? "bg-emerald-500 text-white shadow-sm"
                            : "bg-red-500 text-white shadow-sm"
                          : "bg-slate-200/60 text-slate-500 hover:bg-slate-200"
                      }`}
                    >
                      {cat === "entrada" ? "Entrada" : cat === "fixa" ? "Fixo" : "Variável"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Item 2 */}
              <div className="space-y-1.5 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-xs font-bold text-slate-700 block">2. R$ 1.500,00 de Aluguel do Salão</span>
                <div className="flex gap-1.5 mt-1.5">
                  {(["entrada", "fixa", "variavel"] as const).map(cat => (
                    <button
                      key={cat}
                      onClick={() => handleCategorize("aluguel", cat)}
                      className={`text-[10px] uppercase tracking-wider font-semibold px-2 py-1 rounded transition-all ${
                        dragResult["aluguel"] === cat
                          ? cat === "entrada"
                            ? "bg-emerald-500 text-white shadow-sm"
                            : cat === "fixa"
                            ? "bg-[#005ca9] text-white shadow-sm"
                            : "bg-slate-505 text-white shadow-sm"
                          : "bg-slate-200/60 text-slate-500 hover:bg-slate-200"
                      }`}
                    >
                      {cat === "entrada" ? "Entrada" : cat === "fixa" ? "Desp. Fixa" : "Desp. Var."}
                    </button>
                  ))}
                </div>
              </div>

              {/* Item 3 */}
              <div className="space-y-1.5 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-xs font-bold text-slate-700 block">3. R$ 400,00 de Mililitros de Leite e Copos</span>
                <div className="flex gap-1.5 mt-1.5">
                  {(["entrada", "fixa", "variavel"] as const).map(cat => (
                    <button
                      key={cat}
                      onClick={() => handleCategorize("leite_copos", cat)}
                      className={`text-[10px] uppercase tracking-wider font-semibold px-2 py-1 rounded transition-all ${
                        dragResult["leite_copos"] === cat
                          ? cat === "entrada"
                            ? "bg-emerald-500 text-white shadow-sm"
                            : cat === "fixa"
                            ? "bg-[#005ca9] text-white shadow-sm"
                            : "bg-[#ff9e1b] text-white shadow-sm"
                          : "bg-slate-200/60 text-slate-500 hover:bg-slate-200"
                      }`}
                    >
                      {cat === "entrada" ? "Entrada" : cat === "fixa" ? "Desp. Fixa" : "Desp. Var."}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Verification Result */}
            {Object.keys(dragResult).length === 3 && (
              <div className="mt-4 border-t border-slate-100 pt-4 text-center">
                {isCategorizationCorrect ? (
                  <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs p-3 rounded-xl">
                    <p className="font-extrabold flex items-center justify-center gap-1.5 mb-1 text-emerald-700">
                      <CheckCircle2 className="h-4 w-4" /> Categoria Correta!
                    </p>
                    A venda é Entrada, o aluguel é Despesa Fixa (independe de vender mais) e insumos são Despesa Variável (compras dependem do movimento). Você está pronto!
                  </div>
                ) : (
                  <div className="bg-rose-50 border border-rose-200 text-rose-800 text-xs p-3 rounded-xl">
                    <p className="font-extrabold text-rose-700 mb-1">Ops! Há algo trocado.</p>
                    Revise as definições. Lembre-se, gastos que variam conforme a produção são Variáveis, e o que é fixo todo mês é Despesa Fixa!
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="bg-slate-900 text-white rounded-2xl shadow-md p-6 space-y-4">
            <h5 className="font-sans font-black text-sm uppercase tracking-wider text-[#ff9e1b]">
              💡 Lição da Ana
            </h5>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              "Faturamento (quanto vende) é pura vaidade. Lucro (o dinheiro líquido que sobra) é sanidade. Mas o Fluxo de Caixa Diário é a realidade que mantém as portas abertas."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
