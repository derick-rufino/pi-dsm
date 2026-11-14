# comer bem: estrutura HTML

O CSS já está pronto. Monte o `index.html` desta pasta com as tags e classes abaixo. Não escreva CSS novo: se faltar algo, avise.

Esta página e `cena-e-role/` têm **a mesma estrutura**. Só muda o texto (e a cor, que o CSS resolve sozinho).

## `<head>`

```html
<link rel="stylesheet" href="../global.css">
<link rel="stylesheet" href="../components.css">
<link rel="stylesheet" href="index.css">
<script src="../menu.js" defer></script>
```

## Header, menu mobile e footer

Copie do `../index.html` (a home) e ajuste:

- links com `../` na frente (`../`, `../cena-e-role/`, `../calculadora/`)
- no link desta página, adicione `aria-current="page"`. O CSS pinta ele de azul e deixa os outros neutros.

## `<main>`

```
main
├── section.page-hero
│   ├── h1.page-hero__title
│   │   ├── span.page-hero__row
│   │   │   └── span.pill.pill--lg.title-pill--light      "comida boa entre"
│   │   └── span.page-hero__row
│   │       ├── span.strip.strip--blue  (aria-hidden)     7× <span></span> vazios
│   │       └── span.pill.pill--lg.title-pill--accent     "uma aula e outra."
│   ├── div.page-hero__info
│   │   ├── p.page-hero__lead                             subtítulo
│   │   └── div.stat
│   │       ├── span.stat__value                          "24+"
│   │       └── span
│   │           ├── span.stat__label                      "opções"
│   │           └── span.stat__desc                       "verificadas nos últimos 60 dias"
│   ├── span.burst  (aria-hidden)
│   └── span.stairs (aria-hidden)                         10× <span></span> vazios
│
├── section.filters-section
│   └── form.filters  role="search"
│       ├── label.filters__search
│       │   ├── span.icon.icon--search (aria-hidden)
│       │   ├── span.sr-only                              "buscar"
│       │   └── input.filters__input  type="search" placeholder="buscar em comer bem..."
│       ├── label.select                                  (repita para "ordenar por")
│       │   ├── span.select__label                        "bairro"
│       │   ├── select.select__input > option…            "todos", …
│       │   └── span.icon.icon--chevron (aria-hidden)
│       └── button.pill.pill--md.filters__clear  type="reset"   "limpar filtros"
│
└── section.results  aria-labelledby="titulo-resultados"
    ├── h2.sr-only#titulo-resultados                    "resultados" (só leitor de tela)
    ├── p.sr-only  aria-live="polite"                     "3 resultados" (o JS atualiza)
    ├── article.feature                                   ← card grande de destaque
    │   ├── div.card__top
    │   │   ├── span.category                             "Restaurante universitário"
    │   │   └── span.verified                             "verificado"
    │   ├── h3.card__title#titulo-…                       "Bandejão Universitário"
    │   ├── p.seal.feature__seal                          "R$ 4–9"  (logo após o título: ordem de leitura)
    │   ├── p.card__desc
    │   ├── ul.meta
    │   │   ├── li > span.icon.icon--pin   + texto        "Montana · No campus Unesp"
    │   │   └── li > span.icon.icon--clock + texto        "2 min a pé"
    │   ├── ul.chips > li.chip                            "Mais barato", "Vegetariano"
    │   ├── div.card__footer
    │   │   └── p.card__date                              "verificado em 11 jun. 2026"
    │   └── span.burst (aria-hidden)
    └── ul.results__grid
        └── li > article.card                             ← um por lugar
            ├── div.card__top     (igual ao destaque)
            ├── h3.card__title#titulo-…
            ├── p.card__desc
            ├── p.price
            │   ├── span.price__value                     "R$ 12–28"
            │   └── span.price__unit                      "/ compra"
            ├── ul.meta           (igual ao destaque)
            ├── ul.chips          (igual ao destaque)
            └── div.card__footer  (igual ao destaque)
```

## Regras rápidas

- **Ícones:** `<span class="icon icon--pin" aria-hidden="true"></span>`. Eles herdam a cor do texto. Disponíveis: `arrow bus check chevron clock food info pin plus search star`.
- **Lista vazia ou erro:** `div.empty` com um `p` e um `button.pill.pill--md.filters__clear`.
- **Dados:** os textos acima são do Figma, só exemplo. Os reais vêm de `/dados`.
