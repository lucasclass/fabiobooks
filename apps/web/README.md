
# FábioBooks Frontend

## Visão Geral

Este é o frontend do projeto FábioBooks, uma aplicação React moderna para busca, recomendação e exibição de livros. O projeto utiliza Vite, TypeScript, Tailwind CSS, shadcn-ui e segue boas práticas de organização em monorepo.

## Estrutura de Pastas

```
apps/web/
├── src/
│   ├── components/
│   │   ├── BookCard.tsx
│   │   ├── ChatModal.tsx
│   │   ├── Header.tsx
│   │   ├── HeroSection.tsx
│   │   └── ui/ (componentes reutilizáveis)
│   ├── hooks/
│   ├── lib/
│   ├── pages/
│   │   ├── Index.tsx
│   │   └── NotFound.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── vite.config.ts
```

## Tecnologias Utilizadas

- React
- TypeScript
- Vite
- Tailwind CSS
- shadcn-ui
- Radix UI

## Como rodar o projeto localmente

1. Clone o repositório:
   ```sh
   git clone <YOUR_GIT_URL>
   cd fabiobooks/apps/web
   ```
2. Instale as dependências:
   ```sh
   npm install
   ```
3. Inicie o servidor de desenvolvimento:
   ```sh
   npm run dev
   ```
4. Acesse `http://localhost:8080` no navegador.

## Principais Funcionalidades

- Busca de livros com feedback instantâneo
- Exibição de livros em destaque
- Recomendações via IA (ChatModal)
- Componentes visuais modernos e responsivos
- Toasts para notificações

## Convenções de Commit

Utilize mensagens de commit claras, por exemplo:

- `chore(config): ajustes nas configurações do projeto`
- `feat(ui): adiciona novos componentes de interface`
- `fix: corrige erro de importação no componente X`

---
Projeto mantido por devscarioca.
