# 05. Arquitetura de front-end

Restrição do semestre: HTML, CSS e JavaScript puros. Sem framework, sem bundler obrigatório, sem back-end. Isso não significa código desorganizado. Significa que a organização é responsabilidade explícita do grupo, e não de uma ferramenta.

## 5.1 Estrutura de pastas

```
/
  index.html               home, os três pilares e a chamada da calculadora
  moradia.html
  comer.html
  cena.html
  calculadora.html
  metodologia.html         de onde vem cada dado
  acessibilidade.html      declaração de acessibilidade
  sobre.html               o grupo e o projeto
  /assets
    /css
      tokens.css           variáveis geradas a partir do Figma
      base.css             reset, tipografia, elementos nativos
      layout.css           grid, container, seções
      /componentes
        cartao.css
        filtro.css
        comparador.css
        calculadora.css
        navegacao.css
      utilitarios.css      helpers curtos, sem virar framework
    /js
      main.js              ponto de entrada por página
      dados.js             carregamento e cache dos JSON
      estado.js            estado da tela e sincronia com a URL
      filtros.js           filtrar, buscar e ordenar
      render.js            transformar dados em DOM
      comparador.js
      calculadora.js
      revelar.js           animação ao scroll
      formatar.js          moeda, distância, data
      a11y.js              foco, anúncios em região viva
    /img                   webp, com versão de fallback quando necessário
    /fontes                subconjunto das fontes escolhidas
  /dados                   os JSON descritos em 04-modelo-de-dados.md
  /docs                    esta documentação
```

Princípio: **um arquivo, uma responsabilidade.** Se `filtros.js` começar a manipular DOM, ele virou duas coisas e precisa ser dividido.

## 5.2 Módulos ES, sem bundler

Usar módulos nativos do navegador:

```html
<script type="module" src="/assets/js/main.js"></script>
```

Ganhos: escopo isolado por arquivo, `import` e `export` explícitos, sem variável global acidental, sem preocupação com ordem de tags `<script>`. Custo: exige servir por HTTP, então **abrir o arquivo com duplo clique (`file://`) não funciona**. O time roda um servidor local:

```bash
# qualquer uma destas
python -m http.server 5500
npx serve .
# ou a extensão Live Server do VS Code
```

Isso é conteúdo de Sistemas Operacionais e Redes na prática: origem, protocolo e política de mesma origem explicam por que `file://` quebra o `fetch` e o módulo.

## 5.3 Fluxo de dados

Ciclo único e previsível, o mesmo em toda página de listagem:

```
carregar JSON  ->  estado inicial (lido da URL)  ->  aplicar filtros
      ->  renderizar lista  ->  anunciar contagem para leitor de tela
      ->  evento do usuário  ->  atualizar estado  ->  atualizar URL  ->  aplicar filtros ...
```

Uma função de render, sempre a mesma, que recebe a lista já filtrada e reescreve o container. Nada de manipular o DOM em cinco lugares diferentes.

### Carregamento (`dados.js`)

```js
const cache = new Map();

export async function carregar(nomeArquivo) {
  if (cache.has(nomeArquivo)) return cache.get(nomeArquivo);

  const resposta = await fetch(`/dados/${nomeArquivo}.json`);
  if (!resposta.ok) {
    throw new Error(`Falha ao carregar ${nomeArquivo}: ${resposta.status}`);
  }
  const json = await resposta.json();
  cache.set(nomeArquivo, json);
  return json;
}
```

Tratamento de erro obrigatório: se o `fetch` falhar, a página mostra uma mensagem em texto ("não foi possível carregar os dados, recarregue a página") em vez de ficar em branco. Página em branco é o defeito mais comum de projeto sem framework, e é o que a banca percebe primeiro.

### Estado (`estado.js`)

```js
export const estado = {
  busca: '',
  bairros: [],
  etiquetas: [],
  precoMax: null,
  campus: 'fatec',
  ordem: 'preco-asc',
  selecionados: []
};

export function lerDaURL() {
  const p = new URLSearchParams(location.search);
  estado.busca     = p.get('q') ?? '';
  estado.bairros   = p.getAll('bairro');
  estado.etiquetas = p.getAll('tag');
  estado.precoMax  = p.get('ate') ? Number(p.get('ate')) : null;
  estado.campus    = p.get('campus') ?? 'fatec';
  estado.ordem     = p.get('ordem') ?? 'preco-asc';
  estado.selecionados = p.getAll('cmp');
}

export function gravarNaURL() {
  const p = new URLSearchParams();
  if (estado.busca) p.set('q', estado.busca);
  estado.bairros.forEach(b => p.append('bairro', b));
  estado.etiquetas.forEach(t => p.append('tag', t));
  if (estado.precoMax) p.set('ate', estado.precoMax);
  if (estado.campus !== 'fatec') p.set('campus', estado.campus);
  if (estado.ordem !== 'preco-asc') p.set('ordem', estado.ordem);
  estado.selecionados.forEach(id => p.append('cmp', id));

  const url = p.toString() ? `?${p}` : location.pathname;
  history.replaceState(null, '', url);
}
```

Usar `replaceState` e não `pushState` para mudança de filtro: cada tecla digitada na busca não deve virar uma entrada no histórico do navegador. `pushState` fica reservado para ações grandes, como abrir a comparação.

## 5.4 Filtro, busca e ordenação (`filtros.js`)

### Normalização de texto
Busca que não acha "republica" quando o dado é "República" é busca quebrada.

```js
export function normalizar(texto) {
  return String(texto)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}
```

`normalize('NFD')` separa a letra do acento, e a expressão remove os acentos combinados. É a solução padrão e vale explicar na apresentação, porque é o tipo de detalhe que mostra domínio.

### Pipeline de filtro

```js
export function filtrar(itens, estado) {
  const termo = normalizar(estado.busca);

  return itens.filter(item => {
    if (!item.ativo) return false;

    if (termo) {
      const alvo = normalizar(`${item.nome} ${item.bairro} ${item.etiquetas.join(' ')}`);
      if (!alvo.includes(termo)) return false;
    }
    if (estado.bairros.length && !estado.bairros.includes(item.bairro)) return false;
    if (estado.etiquetas.length && !estado.etiquetas.every(t => item.etiquetas.includes(t))) return false;
    if (estado.precoMax !== null && item.preco_min > estado.precoMax) return false;

    return true;
  });
}
```

Decisões embutidas, todas defensáveis em banca:
- Etiquetas usam **E** (`every`), bairros usam **OU** (`includes`). Marcar dois bairros amplia o resultado, marcar duas etiquetas restringe. É o que o usuário espera, ainda que ninguém saiba explicar por quê.
- O filtro de preço compara com `preco_min`, porque o usuário pergunta "o que cabe em até R$ 700", e uma casa de R$ 650 a R$ 800 cabe parcialmente e deve aparecer, com a faixa visível.
- `ativo: false` sai da lista sempre, sem exceção.

### Ordenação

```js
const comparadores = {
  'preco-asc':  (a, b) => a.preco_min - b.preco_min,
  'preco-desc': (a, b) => b.preco_min - a.preco_min,
  'distancia':  (a, b) => distanciaAte(a, estado.campus) - distanciaAte(b, estado.campus),
  'recentes':   (a, b) => b.verificado_em.localeCompare(a.verificado_em)
};

export function ordenar(itens, chave) {
  return [...itens].sort(comparadores[chave] ?? comparadores['preco-asc']);
}
```

Copiar o array antes de ordenar (`[...itens]`), porque `sort` altera o original e o original é o cache dos dados. Esse é um bug clássico e silencioso.

### Debounce na busca

```js
export function debounce(fn, espera = 250) {
  let id;
  return (...args) => {
    clearTimeout(id);
    id = setTimeout(() => fn(...args), espera);
  };
}
```

Com base pequena, 250 ms já evita renderizar a cada tecla sem parecer lento.

## 5.5 Renderização (`render.js`)

Usar `<template>` no HTML e clonar, em vez de montar string gigante:

```html
<template id="tpl-cartao">
  <article class="cartao">
    <h3 class="cartao__titulo"></h3>
    <p class="cartao__preco"></p>
    <p class="cartao__bairro"></p>
    <ul class="cartao__etiquetas"></ul>
    <p class="cartao__verificacao"></p>
    <label class="cartao__comparar">
      <input type="checkbox" class="cartao__check"> Comparar
    </label>
  </article>
</template>
```

```js
export function renderizarLista(itens, container) {
  const tpl = document.querySelector('#tpl-cartao');
  const fragmento = document.createDocumentFragment();

  for (const item of itens) {
    const no = tpl.content.cloneNode(true);
    no.querySelector('.cartao__titulo').textContent = item.nome;
    no.querySelector('.cartao__preco').textContent = formatarFaixa(item.preco_min, item.preco_max);
    // ... demais campos
    fragmento.append(no);
  }

  container.replaceChildren(fragmento);
}
```

Regras:
- `textContent`, nunca `innerHTML` com dado. Mesmo sendo dado próprio, o hábito certo evita injeção quando o dado passar a vir de terceiros no 3º semestre.
- `DocumentFragment` para inserir tudo de uma vez, um único reflow.
- `replaceChildren` para limpar e preencher em uma operação.
- Estado vazio é obrigatório: quando a lista filtrada tem zero itens, mostrar mensagem com sugestão de ação ("nenhuma opção com esses filtros, tente aumentar o preço máximo") e um botão de limpar filtros.

### Delegação de eventos
Um ouvinte no container, e não um por cartão:

```js
container.addEventListener('click', (evento) => {
  const botao = evento.target.closest('[data-acao]');
  if (!botao) return;
  const acao = botao.dataset.acao;
  // despachar por ação
});
```

Cartões são recriados a cada render. Com delegação, o ouvinte sobrevive, e não há vazamento de listeners.

## 5.6 Comparador (`comparador.js`)

- Limite rígido de 3 itens. Ao tentar o quarto, a interface avisa em texto e não silenciosamente ignora.
- Só compara itens do mesmo pilar, porque os campos são diferentes.
- A comparação é uma `<table>` de verdade, com `<th scope="col">` para cada item e `<th scope="row">` para cada atributo. Tabela de dados é o elemento certo aqui, e leitor de tela navega tabela muito melhor do que um grid de `<div>`.
- Diferença de valores destacada por texto além de cor ("mais barato"), nunca só por cor.
- Estado no parâmetro `cmp` da URL, o que torna a comparação compartilhável. Esse é um recurso pequeno de implementar e alto de impressionar.

## 5.7 Calculadora (`calculadora.js`)

Regras de implementação:
- Toda a aritmética em inteiros. Reais para valores mensais, centavos onde o centavo importa.
- Uma única função pura `calcular(perfil, custos) -> { min, tipico, max, detalhes }`. Função pura é testável e é o que permite mostrar o cálculo item a item na tela.
- Nenhum valor mágico no código: todo número vem de `custos.json`. Se um valor está escrito no JavaScript, ele é um bug de manutenção esperando o próximo semestre.
- Cada linha do resultado exibe a origem: "média de 62 respostas, out/2026" ou "tarifa oficial AMTU, set/2026".
- Recalcular no evento `input` dos campos, com resultado em uma região `aria-live="polite"` para que o leitor de tela anuncie o novo total.
- Persistir o último perfil em `localStorage` é opcional e entra só se sobrar tempo (RF14). Se entrar, envolver em `try/catch`, porque em navegação privada o acesso pode lançar exceção.

```js
export function calcular(perfil, custos) {
  const parcelas = [
    moradia(perfil, custos),
    alimentacao(perfil, custos),
    transporte(perfil, custos),
    pessoais(perfil, custos),
    academicos(perfil, custos)
  ];

  const somar = chave => parcelas.reduce((total, p) => total + p[chave], 0);

  return {
    min: somar('min'),
    tipico: somar('tipico'),
    max: somar('max'),
    detalhes: parcelas
  };
}
```

## 5.8 Animação ao scroll (`revelar.js`)

```js
const preferReduzir = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const alvos = document.querySelectorAll('[data-revelar]');

if (preferReduzir || !('IntersectionObserver' in window)) {
  alvos.forEach(el => el.classList.add('revelado'));
} else {
  const observador = new IntersectionObserver((entradas) => {
    for (const entrada of entradas) {
      if (!entrada.isIntersecting) continue;
      entrada.target.classList.add('revelado');
      observador.unobserve(entrada.target);   // revela uma vez só
    }
  }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });

  alvos.forEach(el => observador.observe(el));
}
```

```css
/* estado inicial aplicado só quando há JS, para não sumir conteúdo sem JS */
.js [data-revelar] {
  opacity: 0;
  transform: translateY(12px);
  transition: opacity 400ms ease-out, transform 400ms ease-out;
}
.js [data-revelar].revelado {
  opacity: 1;
  transform: none;
}
@media (prefers-reduced-motion: reduce) {
  .js [data-revelar] { opacity: 1; transform: none; transition: none; }
}
```

A classe `js` é adicionada ao `<html>` pela primeira linha do script. Sem JavaScript, nada fica invisível. Esse detalhe é a diferença entre animação e conteúdo perdido.

Limites autoimpostos:
- Só `opacity` e `transform`, que o navegador compõe sem recalcular layout.
- Nada de paralaxe, nada de animação disparada por posição contínua de scroll, nada que dependa de `scroll` com listener.
- Duração entre 300 ms e 450 ms. Acima disso a página parece travada.
- Elementos acima da dobra não recebem `data-revelar`. Animar o que já está visível ao carregar atrasa a percepção de carregamento e prejudica a métrica de LCP.

## 5.9 CSS

- Nomenclatura **BEM** (`bloco__elemento--modificador`), previsível e fácil de revisar em grupo.
- `tokens.css` só declara variáveis, e nenhum outro arquivo declara cor, espaçamento ou tamanho de fonte literal. Ver `06-design-system.md`.
- Layout com `grid` e `flex`, mobile primeiro, `min-width` nas media queries.
- Unidades: `rem` para tipografia e espaçamento, `px` apenas para bordas e detalhes de 1 px.
- `clamp()` para tipografia fluida, com limite mínimo confortável para leitura em 320 px.
- Nada de `!important` fora de utilitário de acessibilidade documentado.
- Ordem dos arquivos importa: `tokens`, `base`, `layout`, `componentes`, `utilitarios`.

## 5.10 Performance

| Prática | Razão |
| --- | --- |
| Imagens em WebP com `width` e `height` no HTML | Evita deslocamento de layout, protege a métrica CLS |
| `loading="lazy"` fora da primeira dobra | Reduz o peso do carregamento inicial |
| Fonte com subconjunto e `font-display: swap` | Texto visível imediatamente, mesmo antes da fonte carregar |
| `fetch` de JSON apenas na página que usa | Home não carrega a base de moradia inteira |
| Um render por interação, com `DocumentFragment` | Menos reflow, lista fluida |
| Sem biblioteca externa | Nenhuma dependência é o maior ganho de performance disponível |

Orçamento declarado: **abaixo de 300 KB** no carregamento inicial, contando HTML, CSS, JS, fontes e imagens acima da dobra. Medido na aba Network com cache desativado, e o número entra na apresentação.

## 5.11 Erros e casos de borda a tratar desde o começo

- JSON não carrega, por rede ou arquivo movido.
- Filtro sem resultado.
- Item sem coordenada, logo sem distância calculável (mostrar "distância não informada", nunca `NaN`).
- Faixa de preço com `min` igual a `max` (exibir valor único, não "R$ 600 a R$ 600").
- Data de verificação antiga (exibir aviso).
- URL compartilhada com filtro que não existe mais (ignorar o parâmetro inválido em silêncio, e nunca quebrar a página).
- Usuário tenta comparar 4 itens.
- Navegação por teclado no filtro com muitos resultados (foco precisa ir para a lista, ver `07-acessibilidade.md`).
