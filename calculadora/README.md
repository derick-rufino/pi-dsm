# calculadora: estrutura HTML

O CSS já está pronto. Monte o `index.html` desta pasta com as tags e classes abaixo. Não escreva CSS novo: se faltar algo, avise.

## `<head>`

```html
<link rel="stylesheet" href="../global.css">
<link rel="stylesheet" href="../components.css">
<link rel="stylesheet" href="index.css">
<script src="../menu.js" defer></script>
```

## Header, menu mobile e footer

Copie do `../index.html` (a home), com links usando `../`. No link "calculadora" do header, adicione `aria-current="page"`.

## `<main>`

```
main
├── section.page-hero
│   ├── h1.page-hero__title
│   │   ├── span.page-hero__row
│   │   │   ├── span.pill.pill--lg.title-pill--light     "planeje o mês"
│   │   │   └── span.strip.strip--mint (aria-hidden)     7× <span></span> vazios
│   │   └── span.page-hero__row
│   │       └── span.pill.pill--lg.title-pill--accent    "antes de chegar."
│   ├── div.page-hero__info
│   │   ├── p.page-hero__lead                            subtítulo
│   │   └── span.pill.tag                                "valores de exemplo"
│   ├── span.burst  (aria-hidden)
│   └── span.stairs (aria-hidden)                        10× <span></span> vazios
│
└── form.calc
    ├── div.calc__questions
    │   └── fieldset.question                            ← repita 3× (refeições, transporte, lazer)
    │       ├── legend.question__head
    │       │   ├── span.question__number (aria-hidden)  "1"
    │       │   └── span
    │       │       ├── span.question__title             "Quantas refeições fora por semana?"
    │       │       └── span.question__hint              "O restante considera mercado…"
    │       └── div.options
    │           └── label.option                         ← repita 3× (uma por resposta)
    │               ├── input.sr-only  type="radio" name="refeicoes" value="ate-3"
    │               ├── span.option__radio (aria-hidden)
    │               └── span
    │                   ├── span.option__title           "Até 3"
    │                   └── span.option__desc            "Alguns dias da semana"
    │
    └── aside.estimate  aria-labelledby="(id do pill abaixo)"
        ├── span.pill.pill--ink                          "estimativa mensal"
        ├── output.estimate__total  aria-live="polite"   "R$ 420"
        ├── p.estimate__note                             "Esta estimativa considera…"
        ├── ul.breakdown
        │   └── li.breakdown__item                       ← 3× (alimentação, transporte, lazer)
        │       ├── span.breakdown__icon (aria-hidden)
        │       │   └── span.icon.icon--food             (bus / star nas outras linhas)
        │       ├── span.breakdown__name                 "alimentação"
        │       ├── span.breakdown__value                "R$ 300"
        │       └── span.breakdown__op (aria-hidden)     "+"  ("=" na última)
        ├── div.estimate__method
        │   ├── span.icon.icon--info (aria-hidden)
        │   └── div
        │       ├── strong                               "Como calculamos?"
        │       └── p                                    "Valores baseados em…"
        ├── button.pill.pill--ink.estimate__copy  type="button"
        │   ├── texto                                    "copiar minha estimativa"
        │   └── span.round-btn (aria-hidden)
        │       └── span.icon.icon--arrow
        ├── p.estimate__disclaimer                       "Esta é uma estimativa, não…"
        └── span.burst (aria-hidden)
```

## Regras rápidas

- **Opção marcada:** é só o `<input type="radio">` estar `checked`. O CSS pinta o card de verde sozinho, sem classe extra. Os radios de uma mesma pergunta têm o mesmo `name`.
- **Total:** o JS só troca o texto do `output.estimate__total` e dos `breakdown__value`.
- **Ícones:** `<span class="icon icon--food" aria-hidden="true"></span>`. Disponíveis: `arrow bus check chevron clock food info pin plus search star`.
- **Valores:** os números acima são do Figma, só exemplo. Os reais vêm de `/dados/custos.json`.
