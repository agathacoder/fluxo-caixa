# Fluxo Caixa Inteligente 📈

Uma plataforma web interativa, moderna e extremamente intuitiva voltada para o aprendizado e simulação de **controle financeiro prático (Fluxo de Caixa)**. Projetada para apoiar microempreendedores (MEIs), pequenos empresários e estudantes que desejam compreender a saúde financeira de um negócio de forma dinâmica e descomplicada.

---

## ✨ Funcionalidades Principais

* **📖 Caso de Estudo (O Café da Ana):** Uma narrativa interativa e visual que mostra os desafios reais enfrentados por um pequeno café, facilitando a compreensão de conceitos contábeis na prática.
* **💡 Biblioteca de Conceitos Básicos:** Seção educativa com explicações objetivas sobre Entradas, Saídas, Saldo Acumulado, Capital de Giro e a importância de projetar o caixa futura.
* **📊 Simulador Prático de Caixa:** Um painel financeiro para simular cenários personalizados (otimistas, realistas, pessimistas). Insira receitas e despesas com atualização de gráficos em tempo real.
* **🏆 Quiz Desafio do Empreendedor:** Teste interativo rápido de 7 perguntas com feedbacks detalhados para consolidar o conhecimento financeiro adquirido.

---

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído utilizando as ferramentas de desenvolvimento web modernas para garantir performance, responsividade e código limpo:

* **[React 18](https://react.dev/):** Biblioteca para a construção de interfaces reativas e modulares.
* **[Vite](https://vite.dev/):** Ferramenta de build de nova geração rápida e leve para desenvolvimento.
* **[TypeScript](https://www.typescriptlang.org/):** Superset da linguagem JavaScript que adiciona tipagem estática e segurança ao código.
* **[Tailwind CSS](https://tailwindcss.com/):** Framework CSS guiado por classes utilitárias para estilização fluida e de alta qualidade.
* **[Chart.js](https://www.chartjs.org/):** Visualizações gráficas interativas e elegantes para a análise do caixa mensal.
* **[Motion (framer-motion)](https://motion.dev/):** Animações suaves e micro-interações na troca de abas e resultados.
* **[Lucide React](https://lucide.dev/):** Um pacote de ícones altamente consistentes e leves.

---

## 🚀 Como Executar o Projeto Localmente

Siga os passos abaixo para baixar, instalar as dependências e rodar o projeto em sua máquina de forma rápida:

### 1. Clonar o Repositório
Abra o seu terminal e clone o repositório do projeto:
```bash
git clone https://github.com/SEU-USUARIO/fluxo-caixa-inteligente.git
cd fluxo-caixa-inteligente
```

### 2. Instalar as Dependências
Instale todos os pacotes necessários especificados no `package.json`:
```bash
npm install
```
*(Se preferir, também poderá usar `yarn install`, `pnpm install` ou `bun install`)*

### 3. Rodar em Modo de Desenvolvimento
Inicie o servidor local para ver o sistema rodando em tempo real:
```bash
npm run dev
```
O console mostrará o endereço local acessível, geralmente `http://localhost:3000`. Abra esta URL em seu navegador de preferência.

### 4. Compilar para Produção (Build)
Para compilar um build otimizado e pronto para produção na pasta `/dist`:
```bash
npm run build
```

---

## 📂 Estrutura de Pastas

* `/src`: Contém todo o código-fonte do projeto.
  * `/src/components`: Componentes modulares reutilizáveis (Abas, Simulador, Seções de Conceito, Quiz, etc).
  * `/src/types.ts`: Definições comuns de tipos TypeScript utilizados no sistema.
  * `/src/index.css`: Ponto de entrada CSS global para variáveis de fontes, temas e Tailwind.
  * `/src/App.tsx`: Gerenciador principal de layouts e estado de navegação da aplicação.
* `/index.html`: Arquivo HTML base onde o app de página única (SPA) é montado.
* `/package.json`: Manifesto onde configurações, scripts e dependências do projeto são declaradas.

---

## 📄 Licença

Este projeto está sob a licença MIT. Sinta-se livre para usar, estudar, testar e modificar para propósitos educacionais e comerciais!

Desenvolvido com carinho para fortalecer a educação financeira de empreendedores pelo Brasil! 🇧🇷
