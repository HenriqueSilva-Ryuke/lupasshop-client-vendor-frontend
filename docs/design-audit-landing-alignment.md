# Audit de Design — Alinhamento com Landing (06/03/2026)

## Objetivo
Padronizar as páginas internas com a linguagem visual da landing: tokens semânticos, componentes reutilizáveis e eliminação de estilos hardcoded (`bg-white`, `text-gray-*`, etc.).

## Achados principais
- A landing já segue majoritariamente tokens semânticos (`bg-background`, `text-foreground`, `border-border`) e usa `Button` compartilhado.
- Páginas internas tinham muitos estilos manuais com classes de cor específicas (`gray`, `white`, `zinc`) e botões/inputs não padronizados.
- Foram identificadas 200+ ocorrências (cap de busca) de classes não semânticas em `src/app/**`.

## Primitivas criadas/ajustadas (baseadas na landing)
- `src/components/ui/primitives.ts`
  - `pageContainerClass`
  - `surfaceClass`
  - `sectionTitleClass`
  - `subsectionTitleClass`
  - `labelClass`
  - `inputBaseClass`
  - `inputErrorClass`
  - `helperTextClass`
  - `errorTextClass`
- `src/components/ui/Button.tsx`
  - refinado para linguagem da landing
  - novos variants: `landing`, `landing-primary`
  - compatibilidade mantida para `inset` e `slide`
- `src/components/ui/Card.tsx`
  - superfície padrão alinhada (`rounded-xl`, `border-border`, `bg-card`)
  - correção de `displayName`
- `src/components/ui/FormInput.tsx`
- `src/components/ui/FormTextarea.tsx`
- `src/components/ui/FormSelect.tsx`
  - migrados para primitivas compartilhadas
- `src/components/ui/index.ts`
  - exporta `Button`, `Card` e primitivas

## Páginas migradas nesta etapa
- `src/app/seller/settings/page.tsx`
- `src/app/[locale]/user/addresses/page.tsx`
- `src/app/[locale]/user/profile/page.tsx`
- `src/app/[locale]/user/wishlist/page.tsx`
- `src/app/[locale]/user/orders/page.tsx`

## Divergências restantes (prioridade alta)
- `src/app/[locale]/seller/settings/page.tsx`
- `src/app/[locale]/seller/products/page.tsx`
- `src/app/[locale]/seller/orders/page.tsx`
- `src/app/[locale]/seller/returns/page.tsx`
- `src/app/[locale]/seller/shipments/page.tsx`
- `src/app/[locale]/cart/page.tsx`
- `src/app/[locale]/cart/checkout/page.tsx`
- `src/app/[locale]/store/[slug]/page.tsx`
- `src/app/[locale]/auth/*`

## Próximo passo recomendado
Executar Fase 2 de migração nessas páginas, substituindo gradualmente:
- superfícies manuais por `Card` / `surfaceClass`
- títulos por `sectionTitleClass` / `subsectionTitleClass`
- inputs por `inputBaseClass`
- ações por `Button` com variantes semânticas
- classes `gray/white/zinc` por tokens semânticos
