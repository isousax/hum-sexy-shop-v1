# huumsexshop - E-commerce de Produtos Íntimos

> Frontend moderno e discreto para loja de produtos íntimos, desenvolvido com React + Vite + TypeScript + Tailwind CSS

## 🚀 Quick Start

```bash
# Instalar dependências
npm install

# Copiar arquivo de variáveis de ambiente  
cp .env.example .env

# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
```

## 📋 Pré-requisitos

- Node.js 18+
- npm ou yarn

## 🛠️ Tech Stack

### Core
- **React 18** - Biblioteca UI
- **Vite** - Build tool e dev server
- **TypeScript** - Type safety
- **React Router DOM** - Roteamento SPA

### Styling & Animations
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animações e micro-interações

### Components & UI
- **Headless UI** - Componentes acessíveis (Modal, Dialog)
- **Radix UI** - Primitivos acessíveis (Toast, Tabs, Select, etc.)
- **Lucide React** - Ícones

### Forms & Validation
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de schema
- **@hookform/resolvers** - Integração Zod + RHF

### State Management
- **Context API** - State global (Cart, Age Gate, Toast)
- **Local Storage** - Persistência do carrinho

### Testing
- **Vitest** - Test runner
- **Testing Library** - Testes de componentes
- **jsdom** - Ambiente DOM para testes

### Dev Tools
- **ESLint** - Linting
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **TypeScript** strict mode

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes React
│   ├── ui/             # Componentes base (Button, Input, Card, etc.)
│   ├── layout/         # Header, Footer, Navigation
│   ├── product/        # ProductCard, ProductGrid, etc.
│   └── forms/          # Form components
├── pages/              # Páginas/rotas
│   ├── admin/          # Admin pages (futuro)
│   ├── handle/         # NotFound, Error pages
│   └── legal/          # Privacy, Terms
├── contexts/           # React Contexts (Cart, AgeGate, Toast)
├── hooks/              # Custom hooks
├── services/           # API clients e serviços
├── mocks/              # Dados mockados (products, categories, etc.)
├── types/              # TypeScript types e interfaces
├── lib/                # Utilitários (utils.ts)
├── styles/             # Estilos globais
└── test/               # Setup de testes
```

## 🎨 Design System

### Paleta de Cores
- **Background**: Near-black (`#0f0f0f`)
- **Brand**: Wine/Purple (`#b94879`)
- **Accent**: Soft Gold (`#d4a574`)
- **Neutral**: Grays (`#171717` - `#fafafa`)

### Componentes Base
- `Button` - 5 variants (primary, secondary, outline, ghost, danger)
- `Input` - Com suporte a ícones, error states, labels
- `Card` - Card, CardHeader, CardBody, CardFooter
- `Badge` - 6 variants
- `Modal` - Headless UI Dialog
- `Toast` - Notificações
- `AgeGate` - Verificação de idade (18+)

## 🧭 Rotas

- `/` - Home page
- `/collections` - Todas as categorias
- `/collections/:slug` - Categoria específica
- `/product/:slug` - Detalhe do produto
- `/cart` - Carrinho
- `/checkout` - Checkout (integração WhatsApp)
- `/about` - Sobre nós
- `/faq` - Perguntas frequentes
- `/shipping-returns` - Envio e devoluções
- `/legal/privacy` - Política de privacidade
- `/legal/terms` - Termos de serviço

## 🔌 API & Mocks

Os dados estão mockados em `/src/mocks/`. O `/src/services/api.ts` fornece funções async que simulam chamadas de API.

### Substituindo Mocks por API Real

1. Atualize `.env` com `VITE_API_URL`
2. Edite `/src/services/api.ts` e substitua os mocks por `fetch`

## 🧪 Testes

```bash
npm test              # Rodar todos os testes
npm run test:ui       # UI do vitest
npm run test:coverage # Coverage
```

## 🌐 Variáveis de Ambiente

```env
VITE_API_URL=http://localhost:3000/api
VITE_WHATSAPP_NUMBER=5511999999999
VITE_STORE_NAME=huumsexshop
```

## 📦 Scripts

| Script | Descrição |
|--------|-----------|
| `npm run dev` | Dev server |
| `npm run build` | Build produção |
| `npm run lint` | ESLint |
| `npm test` | Testes |

---

**huumsexshop** - Bem-estar íntimo com discrição e qualidade 💜
