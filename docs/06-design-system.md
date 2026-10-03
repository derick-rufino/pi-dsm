# 06. Design system

O design system é um dos dois diferenciais declarados do projeto (o outro é acessibilidade). Ele existe por três razões práticas, e nenhuma delas é estética:

1. **Consistência entre quatro pessoas escrevendo CSS.** Sem token, cada integrante inventa um cinza.
2. **Entregável de Design Digital.** O sistema, documentado, é o trabalho da disciplina.
3. **Sobrevivência do projeto.** No 3º semestre, quando entrar um framework, os tokens migram sem redesenho.

> **Status:** nome, marca, paleta, tipografia e linguagem de forma **ainda não estão definidos**. Este documento define a estrutura que vai receber essas decisões e os critérios para tomá-las. Ver `11-decisoes-em-aberto.md`.

## 6.1 Fluxo Figma para CSS

```
Figma (Variables)  ->  export  ->  tokens.json  ->  tokens.css  ->  componentes
```

Neste semestre, com quatro pessoas e prazo curto, a conversão pode ser **manual e documentada**: as Variables do Figma são organizadas com os mesmos nomes dos custom properties do CSS, e a cópia é feita à mão em uma única sessão, com o arquivo `tokens.css` como destino exclusivo. Isso é aceitável desde que:

- o nome da variável no Figma seja idêntico ao nome no CSS (`cor/superficie/base` vira `--cor-superficie-base`);
- ninguém edite cor fora de `tokens.css`;
- o arquivo do Figma seja citado no `sobre.html` como origem.

Automatizar (plugin de exportação ou Style Dictionary transformando `tokens.json` em CSS) é a evolução natural, e cabe no 2º ou 3º semestre. Automatizar agora custa mais tempo do que economiza numa base desse tamanho, e a decisão consciente vale mais na banca do que a ferramenta.

## 6.2 Estrutura de tokens em duas camadas

Camada 1, **primitivos**: valores brutos, sem significado de uso.
Camada 2, **semânticos**: apontam para primitivos e carregam a intenção.

Componentes consomem **apenas semânticos**. Essa separação é o que permite trocar a paleta inteira sem tocar em um único componente, e é exatamente o que vai acontecer quando a marca for decidida.

```css
:root {
  /* ---- camada 1, primitivos (valores a definir na fase 3) ---- */
  --azul-100: #000000;
  --azul-500: #000000;
  --azul-900: #000000;
  --neutro-0:   #ffffff;
  --neutro-100: #f4f4f5;
  --neutro-600: #52525b;
  --neutro-900: #18181b;

  /* ---- camada 2, semânticos ---- */
  --cor-superficie-base:    var(--neutro-0);
  --cor-superficie-elevada: var(--neutro-100);
  --cor-texto-forte:        var(--neutro-900);
  --cor-texto-suave:        var(--neutro-600);
  --cor-acao:               var(--azul-500);
  --cor-acao-hover:         var(--azul-900);
  --cor-foco:               var(--azul-500);
  --cor-borda:              var(--neutro-100);

  /* ---- espaçamento, escala de 4 px ---- */
  --esp-1: 0.25rem;  /*  4px */
  --esp-2: 0.5rem;   /*  8px */
  --esp-3: 0.75rem;  /* 12px */
  --esp-4: 1rem;     /* 16px */
  --esp-6: 1.5rem;   /* 24px */
  --esp-8: 2rem;     /* 32px */
  --esp-12: 3rem;    /* 48px */
  --esp-16: 4rem;    /* 64px */

  /* ---- tipografia, escala 1.25 (terça maior) ---- */
  --fonte-titulo: /* a definir */ system-ui, sans-serif;
  --fonte-texto:  /* a definir */ system-ui, sans-serif;
  --txt-xs:  0.8rem;
  --txt-sm:  0.9rem;
  --txt-base: 1rem;
  --txt-lg:  1.25rem;
  --txt-xl:  1.563rem;
  --txt-2xl: 1.953rem;
  --txt-3xl: clamp(2rem, 1.5rem + 2.5vw, 2.441rem);

  --altura-linha-texto: 1.6;
  --altura-linha-titulo: 1.15;

  /* ---- forma ---- */
  --raio-sm: 4px;
  --raio-md: 8px;
  --raio-lg: 16px;
  --sombra-1: 0 1px 2px rgb(0 0 0 / 0.06);
  --sombra-2: 0 4px 12px rgb(0 0 0 / 0.08);

  /* ---- movimento ---- */
  --dur-rapida: 150ms;
  --dur-media: 300ms;
  --dur-lenta: 420ms;
  --ease-saida: cubic-bezier(0.22, 1, 0.36, 1);

  /* ---- layout ---- */
  --largura-conteudo: 72rem;
  --largura-texto: 68ch;
}
```

Regra de nomenclatura: `--<categoria>-<papel>-<variação>`, sempre em português, sempre em minúsculas, separado por hífen. `--cor-acao-hover`, não `--primaryHover`.

## 6.3 Critérios para decidir a identidade

Quando o grupo for fechar nome, paleta e tipografia, os critérios abaixo já estão definidos pelo produto e não são negociáveis por gosto:

**Cor**
- Todo par texto sobre fundo precisa de contraste mínimo de **4,5:1** (texto normal) e **3:1** (texto grande a partir de 18,66 px em negrito ou 24 px). Isso elimina paletas pastel sobre branco antes de começar.
- Componentes de interface e borda de campo de formulário precisam de **3:1** contra o fundo adjacente.
- Cor nunca é o único portador de informação. "Mais barato" precisa de rótulo, não só de verde.
- Definir um papel por cor e respeitar: uma cor de ação, uma de marca, uma de estado. Duas cores disputando a mesma função geram interface confusa.

**Tipografia**
- Duas famílias no máximo, uma para título e uma para texto. Três famílias é decoração, não sistema.
- Corpo de texto com no mínimo 16 px e altura de linha 1,5 ou mais.
- Se usar fonte externa, hospedar localmente com subconjunto latino. Fonte externa por CDN adiciona uma requisição de terceiro, atrasa o texto e é dependência que o projeto declarou não querer.

**Forma**
- Um raio de borda dominante, aplicado de forma consistente. Cartão, botão e campo com raios diferentes parecem erro.
- Sombra é hierarquia, não enfeite: no máximo dois níveis.

**Nome**
- Pronunciável em português, sem ambiguidade de grafia.
- Domínio ou usuário disponível é desejável, e não é bloqueante para o PI.
- Não deve travar o produto em um pilar só ("GuiaRepública" morre quando o pilar de comida crescer).
- Não deve depender de trocadilho local que só quem já mora aqui entende, já que o público prioritário é justamente quem acabou de chegar.

## 6.4 Inventário de componentes

Componentes que o projeto realmente precisa. A lista é curta de propósito.

| Componente | Onde aparece | Estados obrigatórios |
| --- | --- | --- |
| Cabeçalho e navegação | Todas as páginas | Padrão, foco visível, menu aberto no mobile |
| Link de pular para o conteúdo | Todas as páginas | Oculto até receber foco |
| Cartão de item | Listagens | Padrão, hover, foco, selecionado para comparar |
| Barra de filtro | Listagens | Padrão, foco, com filtro ativo, contagem de resultados |
| Campo de busca | Listagens | Padrão, foco, com texto, limpar |
| Etiqueta | Cartões e filtro | Padrão, ativa, desativada |
| Selo de verificação | Cartões e detalhes | Recente, antigo (aviso) |
| Botão | Todo lugar | Padrão, hover, foco, ativo, desabilitado |
| Tabela de comparação | Comparador | Padrão, coluna destacada |
| Campo de formulário | Calculadora | Padrão, foco, erro, com ajuda |
| Resultado da calculadora | Calculadora | Padrão, recalculando, região viva |
| Estado vazio | Listagens | Único |
| Mensagem de erro | Todas as páginas | Único |
| Rodapé com fontes e data | Todas as páginas | Único |

Cada componente é documentado em uma página `estilos.html` (não publicada no menu, mas presente no repositório), mostrando todos os estados lado a lado. Essa página é a prova viva do design system na apresentação, e serve de teste visual quando alguém mexe no CSS.

## 6.5 Tema claro e escuro

Fica como RF15 (poderia). Se entrar, a estrutura de tokens já está pronta:

```css
@media (prefers-color-scheme: dark) {
  :root {
    --cor-superficie-base:    var(--neutro-900);
    --cor-superficie-elevada: #27272a;
    --cor-texto-forte:        var(--neutro-0);
    --cor-texto-suave:        #a1a1aa;
    --cor-borda:              #3f3f46;
  }
}
```

Só a camada semântica muda. Nenhum componente é tocado. Se essa troca exigir editar componente, os tokens foram mal desenhados e o problema é anterior ao tema.

Atenção: contraste precisa ser verificado **nos dois temas**. Uma paleta que passa em claro pode falhar em escuro, e o inverso.

## 6.6 O que não fazer

- Não criar um utilitário para cada propriedade CSS. O projeto não precisa de um Tailwind caseiro, e essa é a forma mais rápida de o CSS virar ilegível.
- Não usar valor literal de cor ou espaçamento fora de `tokens.css`.
- Não criar variante de componente para um uso único. Se aparece uma vez, é exceção local, e exceção documentada no próprio arquivo do componente.
- Não redesenhar depois de a fase 4 começar. A identidade fecha na fase 3 e congela. Retrabalho de identidade em cima de código pronto é a forma mais cara de perder a semana final.
