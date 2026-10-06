# SecuraDist Landing — System Design "Respiro Seguro"

> Fonte: leitura minuciosa de 46 frames (1fps) — `uiux/video1` (lazy.moco.ao, 26 frames, tema escuro) + `uiux/video2` (moco.ao, 20 frames, tema claro).
> Objetivo: landing limpa, direta, que respira. Pouca informação por ecrã. Sem "muro de cards". Sem sensação de "ler um livro".

---

## 1. O que os 46 frames provam (leitura)

### lazy.moco.ao (escuro, 26 frames)
- **1 ideia por viewport.** Cada ecrã = 1 título + 1 ação. Títulos com 4–9 palavras ("Somos especialistas", "Nossos Projetos", "Enquanto o mercado…").
- **Subs curtos:** 15–20 palavras no máximo, e só em metade das secções. Muitas secções não têm sub nenhum.
- **Serviços sem cards:** lista vertical em **accordion com divisórias finas** (ícone esquerda + seta direita). 4 serviços = 4 linhas, zero caixas.
- **Cards só como exceção:** 2–3 por secção, sem borda, preenchidos `#141414`, radius grande, ícone line pequeno, ~15 palavras cada. Sempre seguidos de **1 CTA único centrado** (pill verde, texto preto).
- **Prova sem caixas:** depoimento = texto solto + avatar (sem card); logos de clientes em marquee; stack tech = ícones grayscale sem labels.
- **Respiro extremo:** gaps entre secções chegam a ~70% do viewport vazio. Padding vertical sempre grande.
- **Formulário denso, resto arejado:** inputs só com borda-bottom (underline), labels mínimas. Contraste intencional: só o form é compacto.
- **Persistentes:** FAB WhatsApp + botão voltar-ao-topo.

### moco.ao (claro, 20 frames)
- **Fórmula repetida por secção:** eyebrow pill → H2 gigante em 2 linhas → sub cinza ~10 palavras → **1 CTA único**. Nunca 2 CTAs lado a lado no corpo.
- **Mostrar, não contar:** bento com mockups de UI aninhada (chat + dashboard) em vez de parágrafos. Texto por card: ~8 palavras.
- **Pills como resumo escaneável:** 8 tags com ícone (2 linhas de 4) substituem uma secção inteira de "funcionalidades".
- **FAQ accordion + card de ajuda sticky** com botão WhatsApp — suporte sem texto corrido.
- **Footer fundido com o CTA final** (mesmo bloco, sem fundo separado) + barra de certificação (selo AGT + QR).
- **Status pill** tipo SaaS (dot verde + "sistema operacional").

### Números-guia extraídos
| Regra | Valor |
|---|---|
| Título de secção | 4–9 palavras |
| Subtítulo (quando existe) | ≤ 20 palavras |
| Corpo de card | ≤ 18 palavras |
| Ideias por viewport | 1 |
| CTAs por secção | 1 (hero: máx 2) |
| Gap entre secções | ≥ 96px desktop / 64px mobile |
| Cards por secção | 0–3 (0 = preferido) |

---

## 2. Princípios (intent: decisor que escaneia em 30s,00)

1. **Um ecrã, uma ideia.** Se a secção precisa de subtítulo + 3 parágrafos, são 2 secções.
2. **Texto é UI cara.** Cada palavra tem de justificar o pixel. Cortar > explicar.
3. **Cards são exceção, não grelha.** Contentor só para: formulário, preço, mockup visual. Todo o resto = texto solto + divisórias hairline.
4. **Prova > promessa.** Números grandes, selos, marquee — nunca parágrafos de auto-elogio.
5. **1 CTA por secção.** O utilizador nunca escolhe entre dois botões no corpo.
6. **Respiro é conteúdo.** Espaço vazio transmite confiança (quem tem pouco para esconder mostra pouco).

---

## 3. Tokens

### Cor (manter mundo SecuraDist, só disciplinar o uso)
- Canvas: `navy #0B1F3A` → alternar com `navy-deep #060E1C` por secção (nunca 2 escuras iguais seguidas sem divisor).
- Acento único: `teal-brand #00AF91` (ação + prova). `gold #C9A84C` SÓ para: preço, selos, certificação. Nunca os dois a competir no mesmo bloco.
- Texto: branco 100% (títulos) / 65% (corpo, 1 linha) / 45% (meta). Corpo nunca abaixo de 60% em parágrafo.
- Divisórias: `white 8%` hairline 1px. Bordas de cards (quando existirem): `white 8%`, hover `teal 35%`.

### Tipografia
- Display: Plus Jakarta Sans 800, títulos `clamp(28px, 4vw, 44px)`, 2 linhas máx, `text-balance`.
- Kicker mono `// 01 — NOME` 11px tracking 2.5px (assinatura "perímetro", manter).
- Corpo: 15–17px, **1–2 linhas por bloco**. Sem blocos de 4+ linhas fora do formulário.
- Números-prova: 800, tabular-nums, ≥ 36px.

### Espaçamento (base 4pt)
- Secção: `py-24 lg:py-32` (96/128px). Mobile: `py-16` (64px).
- Gap título → conteúdo: 48px. Entre itens de lista: 0 (divisória faz o trabalho).
- Container: `max-w-[1200px]`, `px-[6%]`.

### Raio
- Botões: pill/full ou 10px. Cards (exceção): 18–24px. Pills/tags: full.

---

## 4. Componentes (e quando NÃO usar)

| Componente | Uso | Limite |
|---|---|---|
| `Eyebrow` | kicker mono por secção | 3–4 palavras |
| `H2` | 1 por secção, 2 linhas máx | 4–9 palavras |
| `Lead` | opcional, 1 linha | ≤ 20 palavras; se precisar de mais, é outra secção |
| `CTA solo` | 1 por secção, centrado ou alinhado ao texto | verbo + seta |
| `AccordionRow` | serviços, FAQ, detalhe de pilares | título 2–5 palavras; corpo ≤ 30 palavras, colapsado por defeito |
| `ProofPill` | capacidades, normas, garantias | 1–3 palavras cada, marquee ou wrap |
| `StatNumber` | métricas com count-up | número + label 2–3 palavras |
| `Hairline` | separar itens e secções | 1px, sem cor sólida |
| `PriceBox` | SÓ onde há preço | 1 por pilar, colapsado ou em accordion |
| `FormCard` | SÓ contacto | inputs underline ou minimal, labels 1–2 palavras |
| `FABs` | WhatsApp + topo, após 900px scroll | — |
| ❌ `GridDeCards` | **PROIBIDO como padrão de secção.** Máx 3 cards por página inteira, só com visual (mockup/imagem), nunca só texto |

---

## 5. Mapa de secções proposto (landing ajustada)

1. **Hero** — kicker + H1 2 linhas + sub 1 linha + 1 CTA (+ link fantasma). Prova compacta: 3 stats em linha, sem cards.
2. **Rail marquee** (manter, 2 linhas já existem — reduzir a 1 linha em mobile).
3. **Serviços** — accordion 5 linhas (título + preço curto). Detalhe de cada pilar colapsa dentro da linha. Zero cards, zero grelhas.
4. **Processo** — 4 passos em linha temporal horizontal (números grandes, 1 frase cada). Sem boxes: número + título + 1 linha.
5. **Prova** — 4 `StatNumber` grandes + selos (ISO/RGPD/SOC) em pills. Sem parágrafos.
6. **FAQ** (novo, derivado do conteúdo existente: preços, prazos, NDA, presencial/remoto) — accordion 4–5 itens. Elimina 60% do texto corrido atual.
7. **Contacto** — 2 colunas: esquerda 3 linhas (email/tel/localização, sem cards) + direita `FormCard` compacto.
8. **CTA final + footer fundidos** (padrão Moco f_018): 1 bloco, 1 título, 1 botão, links em baixo sem fundo separado.

**Corte estimado:** de ~1.600 palavras visíveis para ~450. Secções com cards de texto: de 6 para 1 (só form).

---

## 6. Motion (manter sistema atual, reduzir quantidade)
- Regra: **1–2 elementos animados por viewport**, só `transform/opacity`, 150–300ms micro / ≤500ms blocos.
- Manter: `Reveal` stagger, `CountUp`, marquee (pausa no hover), `btn-shine`, scroll progress, FABs.
- Remover na versão limpa: scanline do hero, anéis radar (ruído), cantoneiras nos cards (cards deixam de existir).
- `prefers-reduced-motion`: já respeitado, manter.

## 7. Anti-patterns removidos (aplicado 2026-10-05)
- [x] Grelha `PILARES` 5 cards + card extra (→ accordion 5 linhas)
- [x] 5 blocos `pilar-detail` com 6 bullets cada (→ colapsados no accordion; ≤ 4 bullets, ≤ 5 palavras cada)
- [x] Secção `why` 4 cards de texto (→ fundida em `Prova`: stats + selos)
- [x] `sobre` com missão + visão + 4 valores em texto corrido (→ 1 lead de 2 linhas + FAQ)
- [x] 2 CTAs lado a lado no corpo (→ 1 por secção; hero tem CTA + link fantasma; WhatsApp vive no FAB)
- [x] `sobre-strip` + stats triplicados (→ 1 bloco de stats, 1 vez, na Prova)
- [x] Scanline + anéis radar no hero (ruído removido; hero centrado)
- [x] Footer separado (→ fundido com CTA final)
- [x] Emojis / bandeiras como ícone (não reintroduzir)

## 8. Checklist pré-entrega (skill ui-ux-pro-max §1–3)
- [ ] Contraste 4.5:1 corpo / 3:1 grande — rever `white/45` e `white/55` sobre navy
- [ ] Targets ≥ 44px (accordion rows `min-h-11`, FABs 48px)
- [ ] `aria-expanded` no accordion, `role=status` no form, skip-link (existem — manter)
- [ ] 375px sem scroll horizontal; marquee com `overflow-hidden`
- [ ] Texto 16px+ no mobile (inputs já 16px)
