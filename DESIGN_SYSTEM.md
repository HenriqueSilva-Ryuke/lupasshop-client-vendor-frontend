# Design System - Tokens CSS Reference

## Cores Primárias (CSS Variables)

### Variables Disponíveis

```css
:root {
  /* Backgrounds */
  --background: #ffffff;
  --foreground: #09090b;
  
  /* Primary Brand Color */
  --primary: #412778;
  --primary-foreground: #ffffff;
  
  /* Secondary */
  --secondary: #f4f4f5;
  --secondary-foreground: #18181b;
  
  /* Muted (disabled, placeholder states) */
  --muted: #f4f4f5;
  --muted-foreground: #71717a;
  
  /* Accent (hover, active states) */
  --accent: #f4f4f5;
  --accent-foreground: #18181b;
  
  /* Destructive (delete, error) */
  --destructive: #ef4444;
  --destructive-foreground: #ffffff;
  
  /* Borders & Inputs */
  --border: #e4e4e7;
  --input: #e4e4e7;
  --ring: #412778;
  
  /* Cards & Popovers */
  --card: #ffffff;
  --card-foreground: #09090b;
  --popover: #ffffff;
  --popover-foreground: #09090b;
  
  /* Radius */
  --radius: 0.5rem;
}

.dark {
  --background: #09090b;
  --foreground: #fafafa;
  --primary: #5a3491;
  --primary-foreground: #ffffff;
  --secondary: #27272a;
  --secondary-foreground: #fafafa;
  --muted: #27272a;
  --muted-foreground: #a1a1aa;
  --accent: #27272a;
  --accent-foreground: #fafafa;
  --destructive: #7f1d1d;
  --destructive-foreground: #fafafa;
  --border: #27272a;
  --input: #27272a;
  --ring: #5a3491;
  --card: #09090b;
  --card-foreground: #fafafa;
  --popover: #09090b;
  --popover-foreground: #fafafa;
}
```

## Tailwind Classes - Mapeamento

### Backgrounds
- `bg-background` → backgrounds principais
- `bg-card` → cards, containers secundários
- `bg-muted` → backgrounds desabilitados, placeholders
- `bg-primary` → ações primárias
- `bg-secondary` → ações secundárias
- `bg-accent` → hover, active states
- `bg-destructive` → delete, error actions

### Textos (Foreground)
- `text-foreground` → texto principal
- `text-muted-foreground` → texto desabilitado, secundário
- `text-card-foreground` → texto em cards
- `text-primary-foreground` → texto em elementos primários
- `text-destructive` → mensagens de erro

### Borders
- `border-border` → borders comuns
- `border-input` → borders de inputs

### Implementação NO PRÓXIMA REFATOR

**Nunca use:**
- ❌ `bg-white`, `bg-gray-*`, `bg-blue-*`, `bg-red-*`
- ❌ `text-white`, `text-gray-*`, `text-blue-*`
- ❌ `border-white`, `border-gray-*`, `border-blue-*`
- ❌ Hex colors como `#412778`
- ❌ Color-specific utilities

**Use sempre:**
- ✅ CSS variables (custom properties)
- ✅ Tailwind semantic classes
- ✅ Design system tokens
- ✅ Utility classes em função do contexto semântico

## Componentes UI

### Button
```tsx
<Button>Default</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Delete</Button>
```

### Card
```tsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>Content</CardContent>
</Card>
```

### Container
```tsx
<Container>Centered content</Container>
<Container fluid>Full width content</Container>
```

## Dark Mode

O sistema de design usa CSS variables que automaticamente mudam conforme a classe `.dark` no elemento raiz. Não há necessidade de usar `dark:` prefixes nos Tailwind classes.

O modo escuro é controlado por JavaScript/CSS, não por preferências do sistema, para máximo controle sobre UX.
