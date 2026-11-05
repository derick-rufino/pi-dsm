# cena & rolê: estrutura HTML

Esta página tem **a mesma estrutura de `comer-bem/`**. Siga a árvore de [`../comer-bem/README.md`](../comer-bem/README.md) inteira, mudando só isto:

| Onde | comer bem | cena & rolê |
| --- | --- | --- |
| `<link>` do CSS da página | `index.css` | `index.css` (desta pasta) |
| `aria-current="page"` no header | link "comer bem" | link "cena & rolê" |
| 1ª linha do título | só a pill `title-pill--light` | pill `title-pill--light` **e depois** `span.strip.strip--sky` |
| 2ª linha do título | strip + pill `title-pill--accent` | só a pill `title-pill--accent` |
| degraus (`span.stairs`) | sim | **não**: esta página só tem o `span.burst` |
| placeholder da busca | "buscar em comer bem..." | "buscar em cena & rolê..." |

```
h1.page-hero__title
├── span.page-hero__row
│   ├── span.pill.pill--lg.title-pill--light    "a cidade também"
│   └── span.strip.strip--sky (aria-hidden)     7× <span></span>
└── span.page-hero__row
    └── span.pill.pill--lg.title-pill--accent   "acontece depois da aula."
```

O preço sem unidade (ex.: "Entrada gratuita") é um `p.price` só com `span.price__value`.

As cores (azul claro) vêm do `index.css` desta pasta. Não precisa de classe extra.
