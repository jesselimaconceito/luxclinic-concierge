# LuxClinic - Premium Clinic Dashboard

Dashboard elegante e moderno para gestão de clínicas de saúde, 100% otimizado para dispositivos móveis e desktop.

## ✨ Funcionalidades

### 🎨 Tema Claro/Escuro
- Alternância entre tema claro e escuro
- Preferência salva no localStorage
- Ícone de toggle no cabeçalho da sidebar
- Cores elegantes e premium em ambos os temas

### 📱 100% Responsivo
- **Mobile-First Design**: Interface otimizada para dispositivos móveis
- **Desktop Otimizado**: Layout com sidebar fixa para telas grandes
- **Menu Hamburger**: Navegação em slide-out para mobile
- **Touch Optimized**: Interações otimizadas para toque
- **Breakpoints**: 
  - Mobile: < 640px
  - Tablet: 640px - 1024px
  - Desktop: > 1024px

### 📊 Dashboard
- KPIs principais com animações
- Agenda do dia
- Ações rápidas
- Cards responsivos e interativos

### 📅 Agenda
- Calendário mensal interativo
- Visualizações: Dia, Semana, Mês
- Lista de próximos compromissos
- Indicadores visuais de status

### 👥 CRM
- Gestão de pacientes
- Busca inteligente
- Cards informativos com detalhes de contato
- Status de atividade

### 💳 Assinaturas
- Três planos disponíveis
- Comparação visual de recursos
- Indicador de plano atual
- Design responsivo de cards

### 🔌 Integrações
- WhatsApp (Oficial e Não-oficial)
- OpenAI
- Webhooks customizados
- Toggle de ativação
- Badges de status

## 🚀 Tecnologias

- **React 18** - Framework principal
- **TypeScript** - Type safety
- **Tailwind CSS** - Estilização responsiva
- **Vite** - Build tool
- **React Router** - Navegação
- **Radix UI** - Componentes acessíveis
- **Lucide React** - Ícones modernos

## 💻 Como Executar

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview
```

## 📱 Otimizações Mobile

### CSS
- `-webkit-tap-highlight-color: transparent` - Remove highlight em toque
- `touch-action: manipulation` - Melhora performance de toque
- `overflow-x: hidden` - Previne scroll horizontal
- Safe area insets para devices com notch
- Hover states apenas para dispositivos com hover

### HTML
- Meta tags viewport otimizadas
- Support para PWA
- Theme color adaptativo
- Apple-specific meta tags

### Layout
- Header fixo no mobile com 64px de altura
- Sidebar transformada em menu lateral
- Padding e margins adaptivos
- Tipografia escalável (rem/em)
- Elementos de toque com mínimo 44px

## 🎨 Sistema de Cores

### Tema Claro
- Background: Bege claro elegante
- Foreground: Azul escuro profundo
- Accent: Dourado premium

### Tema Escuro
- Background: Azul escuro profundo
- Foreground: Bege claro
- Accent: Dourado brilhante

## 📂 Estrutura do Projeto

```
src/
├── components/
│   ├── ui/           # Componentes Radix UI
│   ├── Layout.tsx    # Layout principal responsivo
│   ├── NavLink.tsx   # Links de navegação
│   └── KPICard.tsx   # Cards de métricas
├── contexts/
│   └── ThemeContext.tsx  # Contexto de tema
├── pages/
│   ├── Dashboard.tsx
│   ├── Agenda.tsx
│   ├── CRM.tsx
│   ├── Subscription.tsx
│   ├── Integrations.tsx
│   └── NotFound.tsx
├── lib/
│   └── utils.ts      # Utilitários
├── App.tsx
├── main.tsx
└── index.css         # Estilos globais

```

## 🔧 Configuração

O projeto está configurado com:
- ESLint para linting
- TypeScript strict mode
- Path aliases (@/)
- Tailwind CSS com plugins de animação

## 📄 Licença

Este projeto é privado e proprietário.

## 👨‍💻 Desenvolvido por

LuxClinic Team

---

**Nota**: Este projeto foi otimizado para oferecer a melhor experiência possível tanto em dispositivos móveis quanto em desktops, com atenção especial a performance, acessibilidade e design premium.
