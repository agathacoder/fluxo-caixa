import React, { useState } from "react";
import Navbar from "./components/Navbar";
import StorySection from "./components/StorySection";
import ConceptSection from "./components/ConceptSection";
import SimulatorSection from "./components/SimulatorSection";
import QuizSection from "./components/QuizSection";
import { Coffee, DollarSign, HelpCircle, Landmark, Sparkles, TrendingUp, ChevronRight, BookOpen, AlertTriangle } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<string>("inicio");

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col justify-between" id="app-root">
      
      {/* Top Banking Accent Bar */}
      <div className="bg-[#ff9e1b] h-1.5 w-full"></div>

      {/* Dynamic Navbar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow w-full">
        
        {/* VIEW 1: HOME VIEW / TELA INICIAL */}
        {activeTab === "inicio" && (
          <div className="space-y-12 animate-in fade-in duration-300">
            
            {/* College Metadata Header Badge */}
            <div className="flex justify-center">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-mono font-bold bg-[#005ca9]/10 text-[#005ca9] border border-[#005ca9]/20 shadow-sm uppercase tracking-wider">
                💼 Gestão de Fluxo de Caixa Simples e Descomplicada
              </span>
            </div>

            {/* Hero / Impact Section */}
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <h1 className="text-3xl sm:text-5xl font-sans font-black text-slate-950 tracking-tight leading-tight">
                Você sabe para onde o <span className="text-[#005ca9] underline decoration-[#ff9e1b] decoration-4 underline-offset-4">dinheiro</span> da sua empresa está indo?
              </h1>
              <p className="text-base sm:text-lg text-slate-600 font-medium font-sans">
                &ldquo;Muitas pequenas empresas vendem muito bem diariamente... mas mesmo assim acumulam dívidas e acabam sem dinheiro em caixa no fim do mês.&rdquo;
              </p>
            </div>

            {/* Interactive Call-to-actions Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              
              {/* Card 1: Story of Ana */}
              <div 
                onClick={() => setActiveTab("historia")}
                className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:scale-[1.01] transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="bg-amber-100 text-amber-600 p-3 rounded-full w-fit group-hover:scale-110 transition-transform">
                    <Coffee className="h-6 w-6" />
                  </div>
                  <h3 className="font-sans font-extrabold text-lg text-slate-900">
                    A História do Café da Ana ☕
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-sans">
                    Acompanhe a história super didática da cafeteria da Ana, que vendia montanhas de espresso mas quase quebrou por não saber o básico sobre despesas.
                  </p>
                </div>
                <div className="flex items-center text-xs font-bold text-[#005ca9] pt-4 mt-4 border-t border-slate-50 group-hover:translate-x-1 transition-transform">
                  <span>Conhecer História</span>
                  <ChevronRight className="h-4 w-4 ml-0.5" />
                </div>
              </div>

              {/* Card 2: Interactive Simulator */}
              <div 
                onClick={() => setActiveTab("simulador")}
                className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:scale-[1.01] transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="bg-emerald-100 text-emerald-600 p-3 rounded-full w-fit group-hover:scale-110 transition-transform">
                    <DollarSign className="h-6 w-6" />
                  </div>
                  <h3 className="font-sans font-extrabold text-lg text-slate-900 flex items-center gap-1.5">
                    Simulador de Caixa 📊
                    <span className="text-[10px] uppercase font-mono font-black bg-orange-500 text-white px-2 py-0.5 rounded-full tracking-widest leading-none">
                      com Gráficos
                    </span>
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-sans">
                    Um simulador robusto integrado com **Chart.js**. Brinque de alterar as vendas, aluguéis e comissões para visualizar as flutuações e calcular a reserva de emergência ideal.
                  </p>
                </div>
                <div className="flex items-center text-xs font-bold text-emerald-600 pt-4 mt-4 border-t border-slate-50 group-hover:translate-x-1 transition-transform">
                  <span>Abrir Simulador</span>
                  <ChevronRight className="h-4 w-4 ml-0.5" />
                </div>
              </div>

              {/* Card 3: Interactive Quiz */}
              <div 
                onClick={() => setActiveTab("quiz")}
                className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow-md hover:scale-[1.01] transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="bg-[#005ca9]/10 text-[#005ca9] p-3 rounded-full w-fit group-hover:scale-110 transition-transform">
                    <HelpCircle className="h-6 w-6" />
                  </div>
                  <h3 className="font-sans font-extrabold text-lg text-slate-900">
                    Quiz Desafio (7 Perguntas) 🏆
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-sans">
                    Teste seus conhecimentos práticos sobre finanças! Um teste interativo rápido para descobrir se você sabe cuidar do caixa do seu negócio.
                  </p>
                </div>
                <div className="flex items-center text-xs font-bold text-[#005ca9] pt-4 mt-4 border-t border-slate-50 group-hover:translate-x-1 transition-transform">
                  <span>Jogar o Quiz</span>
                  <ChevronRight className="h-4 w-4 ml-0.5" />
                </div>
              </div>

            </div>

            {/* Pain Point Banner: Financial Literacy Stats */}
            <div className="max-w-4xl mx-auto rounded-2xl bg-slate-900 border border-slate-800 text-white p-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <span className="text-xs font-mono font-black text-[#ff9e1b] uppercase tracking-widest block">
                  DADO ALARMANTE NO BRASIL
                </span>
                <h3 className="text-xl sm:text-2xl font-sans font-black tracking-tight leading-snug">
                  Falta de sobrevivência ligada à má gestão financeira
                </h3>
                <p className="text-xs text-slate-400 font-sans leading-relaxed">
                  Estudos do SEBRAE revelam que mais de **60% das micro e pequenas empresas fecham as portas** em até 5 anos no mercado. A principal causa não é o produto ou serviço fraco, e sim a total ausência de controle de fluxo de caixa e capital de giro.
                </p>
              </div>
              <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 text-center space-y-2">
                <span className="text-[10px] text-slate-400 font-mono uppercase block font-semibold">PROBLEMA PRINCIPAL</span>
                <span className="text-3xl font-extrabold text-[#f39200] block">Mistura de Contas 🛍️</span>
                <span className="block text-xs text-slate-300 font-sans">
                  Ana usava a conta da cafeteria para pagar despesas domésticas particulares. Essa falta de controle quebra empresas lucrativas!
                </span>
              </div>
            </div>

          </div>
        )}

        {/* VIEW 2: THE GUIDED STORY OF ANA */}
        {activeTab === "historia" && (
          <StorySection onGoToSimulator={() => setActiveTab("simulador")} />
        )}

        {/* VIEW 3: CONCEPT SHOWCASE TAB */}
        {activeTab === "conceitos" && (
          <ConceptSection />
        )}

        {/* VIEW 4: INTERACTIVE SIMULATOR (CHART.JS) */}
        {activeTab === "simulador" && (
          <SimulatorSection />
        )}

        {/* VIEW 5: CORE QUIZ IN ACTION */}
        {activeTab === "quiz" && (
          <QuizSection />
        )}

      </main>

      {/* Structured Footer inspired by Bank Caixa aesthetics */}
      <footer className="bg-[#002f5a] text-slate-100 border-t border-[#001f3d] py-10 px-4 sm:px-6 lg:px-8 mt-12 w-full">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left items-start pb-6 border-b border-white/5">
          
          {/* Col 1: Branding info */}
          <div className="space-y-4">
            <div className="flex items-center justify-center md:justify-start space-x-3">
              <div className="bg-[#ff9e1b] p-1.5 rounded-lg flex items-center justify-center text-white font-extrabold text-sm">
                FC
              </div>
              <span className="font-sans font-extrabold text-base tracking-tight text-white block uppercase">
                FLUXO CAIXA INTELIGENTE
              </span>
            </div>
            <p className="text-[11px] font-sans text-slate-400 leading-relaxed max-w-xs mx-auto md:mx-0">
              Uma plataforma interativa focada no aprendizado e simulação de controle financeiro prático, capacitando microempreendedores (MEIs) e pequenas empresas no Brasil.
            </p>
          </div>

          {/* Col 2: Navigation checklist linkers */}
          <div className="space-y-2">
            <span className="text-[10px] uppercase font-mono text-[#ff9e1b] tracking-wider block font-black">
              MAPA DO PORTAL
            </span>
            <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 text-xs">
              <button onClick={() => setActiveTab("inicio")} className="hover:text-amber-400 text-left transition-colors cursor-pointer text-slate-300">
                • Início
              </button>
              <button onClick={() => setActiveTab("historia")} className="hover:text-amber-400 text-left transition-colors cursor-pointer text-slate-300 text-xs">
                • Café da Ana
              </button>
              <button onClick={() => setActiveTab("conceitos")} className="hover:text-amber-400 text-left transition-colors cursor-pointer text-slate-300 text-xs">
                • Conceitos Básicos
              </button>
              <button onClick={() => setActiveTab("simulador")} className="hover:text-amber-400 text-left transition-colors cursor-pointer text-slate-300 text-xs">
                • Simulador
              </button>
              <button onClick={() => setActiveTab("quiz")} className="hover:text-amber-400 text-left transition-colors cursor-pointer text-slate-300 text-xs">
                • Quiz Desafio
              </button>
            </div>
          </div>

          {/* Col 3: Educational quote */}
          <div className="space-y-2">
            <span className="text-[10px] uppercase font-mono tracking-wider block font-black text-emerald-400">
              PILARES DE GESTÃO 💡
            </span>
            <p className="text-[11px] text-slate-300 italic leading-relaxed font-sans">
              &ldquo;Controlar o fluxo de caixa não é apenas somar e subtrair; é planejar a segurança e garantir a longevidade do seu empreendimento.&rdquo;
            </p>
          </div>

        </div>

        <div className="max-w-7xl mx-auto pt-6 text-center text-[11px] text-slate-400 font-sans tracking-wide flex flex-col md:flex-row items-center justify-between gap-4">
          <span>
            © 2026 FLUXO CAIXA INTELIGENTE • Desenvolvido por <strong className="text-white font-bold">Ágatha e Nayara</strong>
          </span>
          <span className="flex items-center gap-1.5 bg-slate-950 px-3.5 py-1.5 rounded-full text-[9px] text-[#ff9e1b] border border-slate-800 font-mono">
            <Landmark className="h-3 w-3 inline text-emerald-400" /> Solução prática para controle de caixa
          </span>
        </div>

      </footer>

    </div>
  );
}
