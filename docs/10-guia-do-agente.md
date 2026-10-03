# 10. Guia do agente

Este arquivo é para o Claude Code e para qualquer assistente de IA que trabalhe neste repositório. Leia este arquivo e `11-decisoes-em-aberto.md` antes de qualquer alteração.

## Contexto em 10 linhas

- Projeto Integrador do 1º semestre de DSM, Fatec Marília, entrega em nov/dez de 2026.
- Produto: guia da vida universitária em Marília, com três pilares (moradia, comer e gastar pouco, cena e rolê).
- Stack obrigatória: **HTML, CSS e JavaScript puros**. Sem framework, sem bundler, sem back-end, sem dependência de terceiros em produção.
- Dados: arquivos JSON em `/dados`, descritos em `04-modelo-de-dados.md`.
- Idioma do código e da documentação: **português do Brasil**, exceto APIs do navegador.
- Time de 4 pessoas, com papéis definidos em `08-processo-e-etapas.md`.
- Diferenciais declarados: design system próprio e acessibilidade WCAG 2.2 AA.
- Nome, marca e identidade visual **ainda não decididos**.
- Este é um trabalho acadêmico avaliado. Código que o grupo não sabe explicar é pior do que código simples.

## Regras rígidas

1. **Não adicione dependência.** Nada de npm em produção, nada de CDN, nada de biblioteca. Se a solução parece exigir uma biblioteca, ou existe uma API nativa, ou o requisito precisa ser renegociado com o grupo.
2. **Não introduza framework** (React, Vue, Svelte, Alpine, jQuery). Vale também para "só um pedacinho".
3. **Não crie back-end** nem função serverless neste semestre.
4. **Não invente dado.** Nenhum preço, endereço, horário ou estatística pode ser escrito por um agente. Dado vem da coleta do grupo. Para exemplo em código, usar dado claramente fictício e marcado como exemplo.
5. **Não altere `/dados/*.json` com conteúdo novo.** Estrutura sim (quando o esquema mudar, e com atualização de `04-modelo-de-dados.md`), conteúdo não.
6. **Não remova `outline` de foco** sem repor um indicador equivalente e com contraste adequado.
7. **Não use `innerHTML` com dado.** Use `textContent` e `<template>`.
8. **Não escreva cor, espaçamento ou tamanho de fonte literal** fora de `assets/css/tokens.css`.
9. **Não decida nome, marca, paleta ou tipografia.** Essas decisões são do grupo, estão listadas em `11-decisoes-em-aberto.md` e não devem ser resolvidas por conveniência de implementação. Use os tokens neutros existentes.
10. **Não commite** planilha de respostas, contato pessoal ou foto com pessoa identificável.

## Convenções

**Nomenclatura**
- Domínio em português: `moradia`, `bairro`, `precoMin`, `verificadoEm`.
- APIs do navegador em inglês, como são: `addEventListener`, `querySelector`.
- CSS em BEM: `.cartao__titulo`, `.filtro--ativo`.
- Custom properties: `--cor-acao`, `--esp-4`, `--txt-lg`.
- Arquivos em minúsculas com hífen: `filtro-moradia.js`.

**JavaScript**
- Módulos ES com `import` e `export`. Nada de variável global.
- `const` por padrão, `let` quando reatribuir, nunca `var`.
- Funções puras para cálculo e filtro. Efeito no DOM isolado em `render.js`.
- Toda função `async` com tratamento de erro e mensagem visível ao usuário.
- Sem `console.log` em código entregue.
- Comentário explica **por que**, nunca **o que**. Código que precisa de comentário para dizer o que faz precisa de nome melhor.

**HTML**
- Semântico. `button` para ação, `a` para navegação, `table` para dado tabular, `fieldset` e `legend` para grupo de campos.
- Um `h1` por página, hierarquia sem pular nível.
- Todo campo com `label` associado.

**CSS**
- Mobile primeiro, `min-width` nas media queries.
- `rem` para tipografia e espaçamento.
- Sem `!important`.
- Grid e flex para layout, nada de posicionamento absoluto para estruturar página.

## Antes de propor qualquer alteração

1. Ler `02-escopo-e-requisitos.md` e confirmar que o pedido não está na lista de fora de escopo.
2. Ler `11-decisoes-em-aberto.md` e verificar se a mudança depende de decisão ainda pendente. Se depender, **pergunte, não decida**.
3. Verificar impacto em acessibilidade contra a tabela de `07-acessibilidade.md`.
4. Verificar se a mudança exige atualização da documentação. Alteração de esquema de dados, de token ou de requisito **sempre** exige.

## Checklist antes de considerar uma tarefa concluída

- [ ] Funciona com teclado, do início ao fim, com foco sempre visível
- [ ] Nenhuma dependência nova
- [ ] Nenhum valor literal de cor, espaçamento ou tipografia fora dos tokens
- [ ] Estado vazio e estado de erro tratados
- [ ] Sem `console.log`
- [ ] Testado em 320 px de largura, sem rolagem horizontal
- [ ] Mudança de conteúdo dinâmico anunciada em região `aria-live` quando aplicável
- [ ] Documentação atualizada no mesmo commit, se a mudança afeta esquema, token ou requisito
- [ ] Mensagem de commit em português, no imperativo

## Como pedir ajuda a este repositório, exemplos de bom prompt

Bom, porque delimita e aponta o documento:
> "Implemente o filtro por etiqueta em `filtros.js` seguindo o pipeline descrito na seção 5.4 de `docs/05-arquitetura-front-end.md`. Etiquetas combinam com E. Não altere `render.js`."

> "Revise `calculadora.js` contra a fórmula da seção 4.6 de `docs/04-modelo-de-dados.md` e me diga onde a implementação diverge. Não corrija ainda."

> "Escreva o estado vazio da listagem de moradia usando os tokens existentes e o padrão de mensagem descrito em 5.5. Sem novo token."

Ruim, porque abre espaço para o agente decidir o que não é dele:
> "Deixa essa página bonita."
> "Melhora o código."
> "Adiciona uma biblioteca de máscara de moeda."

## Perguntas que o agente deve fazer em vez de assumir

- Este valor é dado real coletado pelo grupo ou é exemplo?
- Esta mudança de layout afeta a ordem de tabulação?
- Este novo campo já existe no ER, ou o modelo precisa mudar primeiro?
- Isso depende de uma decisão de identidade ainda em aberto?
- Este recurso está na lista de fora de escopo do semestre?
