import React, { useState } from "react";
import { QuizQuestion } from "../types";
import { HelpCircle, Check, X, Award, HelpCircle as HelpIcon, ArrowRight, Play, RefreshCw, FileText } from "lucide-react";

export default function QuizSection() {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  const questions: QuizQuestion[] = [
    {
      id: 1,
      question: "O fluxo de caixa serve para:",
      options: [
        "Fazer campanhas de marketing digital",
        "Controlar todas as entradas e saídas financeiras da empresa",
        "Contratar e gerenciar novos funcionários",
        "Fazer propaganda offline"
      ],
      correctAnswer: 1,
      explanation: "O fluxo de caixa registra exatamente as entradas (receitas) e as saídas (despesas/investimentos) de recursos em um dado período, garantindo o controle total das contas do negócio."
    },
    {
      id: 2,
      question: "Quando a empresa gasta mais do que recebe ocorre:",
      options: [
        "Lucro líquido no final do período",
        "Investimento estratégico planejado",
        "Prejuízo financeiro",
        "Receita recorrente acumulada"
      ],
      correctAnswer: 2,
      explanation: "Dizemos que houve prejuízo operacional quando o total de saídas (despesas operacionais, financeiras, impostos) de dinheiro é maior que as entradas (vendas)."
    },
    {
      id: 3,
      question: "Qual dos seguintes itens representa uma Entrada financeira?",
      options: [
        "O pagamento mensal da conta de luz comercial",
        "O pagamento de salários dos atendentes",
        "A receita obtida com a venda de produtos ou serviços",
        "O pagamento mensal de aluguel do salão comercial"
      ],
      correctAnswer: 2,
      explanation: "Entradas são todo dinheiro novo que ingressa na empresa. Faturamento de vendas e recebimento de cartões são exemplos típicos."
    },
    {
      id: 4,
      question: "Qual destes gastos se encaixa no conceito de Despesa Fixa?",
      options: [
        "A compra esporádica de café e copos descartáveis",
        "O imposto sobre o faturamento de vendas",
        "O valor pago do aluguel do imóvel da cafeteria",
        "Brindes promocionais criados pontualmente"
      ],
      correctAnswer: 2,
      explanation: "A despesa fixa é recorrente e não varia de acordo com o aumento ou redução do nível de vendas. O aluguel independe de você vender zero ou 10 mil cafés no mês."
    },
    {
      id: 5,
      question: "Separar o dinheiro pessoal do empresarial ajuda a:",
      options: [
        "Organizar e mensurar de forma real as finanças do negócio",
        "Poder gastar mais em futilidades pessoais com o cartão corporativo",
        "Reduzir o pagamento de impostos sem passar pela Receita",
        "Evitar que clientes visitem a cafeteria física"
      ],
      correctAnswer: 0,
      explanation: "A regra de ouro da gestão financeira: separar contas pessoais e corporativas evita que o empresário retire o dinheiro de capital de giro da empresa para cobrir buracos particulares."
    },
    {
      id: 6,
      question: "O lucro operacional acontece quando:",
      options: [
        "As despesas gerais aumentam progressivamente",
        "As receitas / entradas totais são maiores que as despesas totais",
        "A empresa decide fechar as portas para reformas",
        "Não existem quaisquer gastos fixos ou variáveis cadastrados"
      ],
      correctAnswer: 1,
      explanation: "O lucro é o resultado positivo obtido após cobrirmos todas as saídas utilizando nossos valores arrecadados no faturamento de vendas."
    },
    {
      id: 7,
      question: "Pequenas empresas precisam obrigatoriamente do fluxo de caixa porque:",
      options: [
        "Isso permite um entendimento claro da saúde financeira e evita quebras por insolvência",
        "Trata-se de uma obrigação fiscal que serve única e exclusivamente para obter empréstimos em bancos",
        "É a ferramenta que renegocia e substitui o volume de vendas mensais",
        "Ela realiza a eliminação imediata de quaisquer despesas físicas"
      ],
      correctAnswer: 0,
      explanation: "Compreender o fluxo de caixa garante sobrevivência estrutural, permitindo antever faltas de saldo e programar investimentos com responsabilidade de caixa."
    }
  ];

  const handleOptionSelect = (optIdx: number) => {
    if (isAnswered) return;
    setSelectedOpt(optIdx);
  };

  const verifyAnswer = () => {
    if (selectedOpt === null || isAnswered) return;
    
    setIsAnswered(true);
    if (selectedOpt === questions[currentIdx].correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedOpt(null);
    setIsAnswered(false);
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(prev => prev + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const restartQuiz = () => {
    setCurrentIdx(0);
    setSelectedOpt(null);
    setIsAnswered(false);
    setScore(0);
    setQuizFinished(false);
  };

  // Score percent representation
  const scorePercent = Math.round((score / questions.length) * 100);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {!quizFinished ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Active Quiz Area (Left side) */}
          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-2xl shadow-md overflow-hidden">
            
            {/* Header progress info */}
            <div className="bg-slate-50 border-b border-slate-100 px-6 py-4 flex items-center justify-between">
              <span className="text-xs font-mono font-black text-slate-500 uppercase tracking-widest">
                QUIZ INTERATIVO DA ANA • QUESTÃO {currentIdx + 1} DE {questions.length}
              </span>
              <span className="text-xs font-semibold bg-[#005ca9] text-white px-2.5 py-1 rounded-full font-mono">
                ACERTOS: {score}
              </span>
            </div>

            {/* Progress bar */}
            <div className="h-1 bg-slate-100 w-full">
              <div 
                className="h-full bg-orange-500 transition-all duration-300" 
                style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
              />
            </div>

            <div className="p-8 space-y-6">
              <h4 className="text-lg font-sans font-extrabold text-slate-900 tracking-tight leading-snug">
                {questions[currentIdx].question}
              </h4>

              {/* Grid of Choices */}
              <div className="space-y-3">
                {questions[currentIdx].options.map((opt, idx) => {
                  let optStyle = "border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-350";
                  
                  if (selectedOpt === idx) {
                    optStyle = "border-[#005ca9] bg-[#005ca9]/5 text-[#005ca9] ring-2 ring-[#005ca9]/20 font-semibold";
                  }
                  
                  if (isAnswered) {
                    if (idx === questions[currentIdx].correctAnswer) {
                      optStyle = "border-emerald-500 bg-emerald-50 text-emerald-800 font-bold ring-2 ring-emerald-150";
                    } else if (selectedOpt === idx) {
                      optStyle = "border-red-400 bg-red-50 text-red-800 font-semibold";
                    } else {
                      optStyle = "border-slate-100 bg-slate-50/55 text-slate-400 cursor-not-allowed";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleOptionSelect(idx)}
                      disabled={isAnswered}
                      className={`w-full p-4 rounded-xl border text-left text-sm transition-all flex items-center justify-between text-slate-800 ${optStyle}`}
                    >
                      <span className="font-sans">{opt}</span>
                      <div className="flex items-center space-x-1.5 shrink-0 ml-2">
                        <span className="text-[10px] uppercase font-mono font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        {isAnswered && idx === questions[currentIdx].correctAnswer && (
                          <Check className="h-4 w-4 text-emerald-600 font-bold" />
                        )}
                        {isAnswered && selectedOpt === idx && idx !== questions[currentIdx].correctAnswer && (
                          <X className="h-4 w-4 text-red-600" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Instant feedback explanation */}
              {isAnswered && (
                <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-5 mt-4 text-xs font-sans text-amber-900 leading-relaxed">
                  <div className="flex items-center space-x-1.5 font-bold mb-1.5 text-amber-950">
                    <HelpIcon className="h-4 w-4" />
                    <span>Por que esta Resposta?</span>
                  </div>
                  {questions[currentIdx].explanation}
                </div>
              )}
            </div>

            {/* Verify / Next Button strip */}
            <div className="bg-slate-50 border-t border-slate-100 px-6 py-4 flex justify-end">
              {!isAnswered ? (
                <button
                  onClick={verifyAnswer}
                  disabled={selectedOpt === null}
                  className="px-5 py-2.5 bg-[#005ca9] text-white rounded-lg text-sm font-bold hover:bg-[#004b8a] transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  id="quiz-verify-btn"
                >
                  Registrar Resposta
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="px-5 py-2.5 bg-slate-900 text-white hover:bg-slate-800 rounded-lg text-sm font-bold flex items-center space-x-1 transition-all cursor-pointer"
                  id="quiz-next-btn"
                >
                  <span>{currentIdx < questions.length - 1 ? "Próxima Questão" : "Finalizar Teste"}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </div>

          </div>

          {/* Quiz Stats Sidebar Info */}
          <div className="lg:col-span-4 bg-slate-900 text-slate-200 rounded-2xl shadow-md p-6 space-y-6">
            <div className="flex items-center space-x-2.5 pb-3 border-b border-slate-800">
              <Award className="h-5 w-5 text-amber-400" />
              <h5 className="font-sans font-black text-sm uppercase tracking-wider text-[#ff9e1b]">
                Desafio do Empreendedor
              </h5>
            </div>
            
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              Cada pergunta simula situações reais que empresários de sucesso enfrentam no dia a dia para manter o seu fluxo de caixa saudável e os lucros em crescimento.
            </p>

            <div className="bg-slate-950/60 p-4 border border-slate-800 rounded-xl text-center">
              <span className="text-[10px] text-slate-400 uppercase font-mono block">Progresso Realizado</span>
              <span className="text-xl font-extrabold text-[#ff9e1b] block mt-1">
                {Math.round(((currentIdx + 1) / questions.length) * 100)}%
              </span>
              <span className="text-[9px] text-slate-500 block">Das questões foram visualizadas</span>
            </div>
          </div>

        </div>
      ) : (
        /* QUIZ SUMMARY SCREEN: SHOW RANK & FINAL WORDS */
        <div className="max-w-3xl mx-auto bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden p-8 text-center space-y-6 animate-in zoom-in-95 duration-300">
          <div className="flex justify-center">
            <div className="bg-amber-100 p-5 rounded-full border border-amber-200">
              <Award className="h-10 w-10 text-amber-600 animate-bounce" />
            </div>
          </div>

          <div>
            <h4 className="text-2xl font-sans font-black text-slate-900">
              Desafio Concluído! 🎉
            </h4>
            <p className="text-slate-500 text-sm mt-1">
              Você concluiu o teste interativo sobre fluxo de caixa para microempresas.
            </p>
          </div>

          {/* Score percentage card */}
          <div className="bg-slate-50 border border-slate-100 p-6 rounded-2xl max-w-sm mx-auto">
            <span className="text-xs uppercase font-mono font-bold text-slate-500">PONTUAÇÃO OBTIDA</span>
            <div className="text-4xl font-black text-[#005ca9] mt-1.5 font-sans">
              {scorePercent}%
            </div>
            <p className="text-xs font-semibold text-amber-600 mt-2">
              Você acertou {score} de {questions.length} perguntas comerciais!
            </p>
          </div>

          {/* Feedback description based on score */}
          <div className="px-6">
            {scorePercent >= 80 ? (
              <p className="text-sm font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100 p-4 rounded-xl">
                🏆 Parabéns! Você entende {scorePercent}% sobre fluxo de caixa. Você tem os fundamentos perfeitos para gerir o financeiro de uma cafeteria ou startup com maestria absoluta!
              </p>
            ) : scorePercent >= 50 ? (
              <p className="text-sm font-semibold text-amber-700 bg-amber-50 border border-[#ff9e1b]/20 p-4 rounded-xl">
                ⭐ Bom trabalho! Você entende {scorePercent}% sobre fluxo de caixa. Com pequenas correções conceituais de despesas fixas, você estará pronto para liderar!
              </p>
            ) : (
              <p className="text-sm font-semibold text-rose-700 bg-rose-50 border border-rose-100 p-4 rounded-xl">
                ⚠️ Atenção! Você acertou {scorePercent}%. Recomendamos que revise a história do Café da Ana e teste novamente, o fluxo de caixa é crucial para manter empresas vivas.
              </p>
            )}
          </div>

          {/* Strong final closing quote mandatory section */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 border-l-4 border-[#ff9e1b] text-left">
            <span className="text-[#ff9e1b] font-mono text-[10px] uppercase font-black block tracking-widest leading-none mb-1">
              Frase Finalizadora de Impacto
            </span>
            <blockquote className="text-base font-bold italic font-sans text-slate-100 leading-relaxed">
              “Uma empresa não quebra apenas por falta de vendas. Muitas quebram por falta de controle financeiro.”
            </blockquote>
          </div>

          {/* Interactivity tools */}
          <div className="pt-4 flex flex-col sm:flex-row justify-center gap-3">
            <button
              onClick={restartQuiz}
              className="flex items-center justify-center space-x-1.5 px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm rounded-xl transition-all cursor-pointer"
              id="quiz-restart-btn"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Refazer Desafio</span>
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
