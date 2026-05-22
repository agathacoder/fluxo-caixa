export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // Index of options array
  explanation: string;
}

export interface SimulatorInputs {
  vendas: number;
  aluguel: number;
  salarios: number;
  internetServicos: number;
  insumosCategorias: number; // ingredientes/insumos
  embalagens: number;
  impostosComissoes: number;
}
