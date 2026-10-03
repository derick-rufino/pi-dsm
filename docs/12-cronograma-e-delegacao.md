# 12. Cronograma e delegação

Este documento resolve dois problemas ao mesmo tempo, porque eles são o mesmo problema: **quem faz o quê, até quando, e como manter a qualidade sem uma pessoa revisar tudo à mão.**

Premissas usadas: entrega final ainda sem data definida pelo professor, cronograma montado em 12 semanas a partir de 09/09/2026, sem entregas parciais cobradas (os checkpoints abaixo são internos do grupo), e três colegas com níveis diferentes entre si.

---

## Parte 1, o problema de delegação, dito sem rodeio

A situação real: você domina front-end e design, os outros três não. A conclusão intuitiva é "eu faço as partes que importam e dou o resto para eles". Essa conclusão tem três defeitos concretos, e nenhum deles é moral, todos são práticos:

**1. Gargalo.** Se tudo que importa passa por você, o projeto anda na sua velocidade. Nas semanas 6 a 9, quando filtro, comparador e calculadora estiverem sendo construídos ao mesmo tempo que a acessibilidade e o design system, você vira o caminho crítico de quatro frentes ao mesmo tempo. É aí que o PI atrasa.

**2. A banca pergunta para quem não fez.** Professor de Projeto Integrador costuma perguntar para o integrante que ficou mais quieto. Se três pessoas não sabem explicar por que o filtro usa E para etiquetas e OU para bairros, a nota do grupo cai, e a sua junto. Um projeto que só você entende é um projeto tecnicamente bom e academicamente frágil.

**3. Desengajamento.** Quem recebe só sobra não entrega bem. Não por má vontade, mas porque tarefa vaga sem impacto visível não gera compromisso. E aí você acaba fazendo mesmo, o que confirma a previsão inicial e fecha o ciclo.

Sobre "o projeto é meu": é compreensível, e é metade verdade. A visão, o padrão de qualidade e a maior parte do trabalho visível são seus. Mas o entregável é do grupo, a nota é do grupo, e o dado que é o real diferencial do Guia não pode ser coletado por uma pessoa só em 12 semanas. Vale trocar "eu faço para sair bom" por "eu defino o que é bom, e ninguém entrega abaixo disso". A segunda frase escala, a primeira não.

### O princípio que resolve

**Delegue por contrato, não por confiança.**

Tarefa delegável é aquela em que você consegue definir, antes de entregar:
- a **entrada** (que dado chega),
- a **saída** (que dado sai, em que formato),
- o **critério de pronto** (como se verifica que está certo, sem depender do seu gosto),
- o **arquivo** onde mexer, e os arquivos onde não mexer.

Com contrato, a revisão deixa de ser "eu acho que ficou ruim" e passa a ser "esse caso de teste falha". Isso remove a discussão de gosto, que é o que gera atrito em grupo, e mantém o padrão sem microgerência.

O corolário: **o que não dá para contratar, você faz.** Design system, CSS, hierarquia visual, acessibilidade e revisão final não têm critério objetivo simples, então continuam com você. Isso não é egoísmo, é divisão por natureza da tarefa.

### O que a favor você já tem

Seus colegas sabem programar, só não sabem web. E, pelo seu próprio diagnóstico, lógica não é a sua parte mais forte. Isso não é um problema de time, é um encaixe: eles pegam a lógica pura em JavaScript (filtro, ordenação, cálculo, validação de dados), que é logo o pedaço que você menos gosta de fazer, e você pega HTML, CSS, design system, acessibilidade e integração, que é o que eles não conseguiriam fazer no seu padrão. Ninguém está recebendo sobra nessa divisão.

---

## Parte 2, mapa de propriedade

Cada arquivo tem um dono. Dono decide, os outros sugerem por pull request.

| Área | Arquivos | Dono | Quem mais pode mexer |
| --- | --- | --- | --- |
| Design system e estilo | `assets/css/**` | Derick | Ninguém, sem combinar antes |
| Estrutura das páginas | `*.html` | Derick | Ninguém, sem combinar antes |
| Acessibilidade | transversal | Derick | Todos seguem o checklist, ele valida |
| Lógica pura | `assets/js/filtros.js`, `calculadora.js`, `formatar.js` | Trilha A | Derick revisa |
| Integração e render | `assets/js/main.js`, `render.js`, `dados.js`, `estado.js` | Derick | Trilha A em par |
| Base de dados | `dados/*.json` | Trilha B | Todos coletam, um consolida |
| Modelo ER e conteúdo | `docs/04`, textos das páginas | Trilha B | Derick revisa texto |
| Documentação de Eng. de Software | `docs/eng-software/**`, `docs/atas/` | Trilha C | Todos leem |
| Apresentação | slides e roteiro | Trilha C | Todos ensaiam |

Regra de ouro do repositório: **ninguém commita direto na `main`.** Branch, pull request, uma revisão, merge. Isso protege a qualidade sem você precisar vigiar.

---

## Parte 3, as três trilhas

Como os níveis são diferentes entre os três, a delegação é por trilha e não por pessoa. Descubra na semana 1 quem cabe onde, com uma conversa direta e sem constrangimento: "o que você já fez de programação, e com o que você se sente confortável?".

### Trilha A, quem tem mais facilidade com código
**Entrega:** as funções puras do site, que é a parte de lógica mais visível da apresentação.

Como você entrega a tarefa: assinatura pronta, comportamento descrito e casos de teste escritos por você **antes**. A pessoa preenche o corpo da função. Ela não toca em HTML nem em CSS, então não tem como quebrar o layout.

Exemplo de tarefa pronta para entregar:

```js
// assets/js/filtros.js
//
// Tarefa: implementar normalizar() e filtrar().
// Não altere nenhum outro arquivo.
//
// normalizar(texto) -> string
//   minúscula, sem acento. "República" vira "republica".
//
// filtrar(itens, estado) -> array
//   estado = { busca, bairros[], etiquetas[], precoMax }
//   regras:
//     - item.ativo === false nunca aparece
//     - busca casa com nome, bairro ou etiqueta, já normalizados
//     - bairros: OU (marcar dois bairros amplia o resultado)
//     - etiquetas: E (marcar duas etiquetas restringe)
//     - precoMax compara com item.preco_min
//
// Pronto quando: os 12 casos de teste em testes/filtros.test.html passam.

export function normalizar(texto) { /* ... */ }
export function filtrar(itens, estado) { /* ... */ }
```

Os casos de teste podem ser uma página `testes/filtros.test.html` que importa o módulo, roda as asserções e pinta verde ou vermelho. São 40 linhas de código seu e economizam todas as rodadas de "acho que não está certo".

**Tarefas da trilha A no semestre:** `normalizar` e `filtrar`, `ordenar` com os quatro critérios, `calcular` da calculadora seguindo a fórmula da seção 4.6, `validar.mjs` da base de dados, e a lógica do comparador (limite de 3, mesmo pilar).

### Trilha B, quem tem perfil mais de dados e organização
**Entrega:** a base de dados, que é o diferencial real do projeto e a parte mais defensável na banca.

Isso não é trabalho menor. É o que nenhum outro grupo vai ter, e é impossível você fazer sozinho no prazo. Vale dizer isso em voz alta na primeira reunião.

**Tarefas:** aplicar o formulário nas turmas, tabular as respostas, coordenar o campo (dividir bairros entre os quatro, consolidar as fichas), transformar fichas em JSON no formato de `04-modelo-de-dados.md`, manter o modelo ER, escrever os textos das páginas e a página de metodologia.

Contrato de qualidade, que substitui sua revisão: o `validar.mjs` da trilha A roda em cima do JSON e reprova registro sem fonte, sem data, com preço invertido ou com etiqueta inexistente. **A máquina revisa o dado, não você.**

### Trilha C, quem tem menos base de código
**Entrega:** a documentação de Engenharia de Software, o processo e a apresentação.

Também não é trabalho menor: a disciplina cobra esses artefatos, eles valem nota, e sem eles o projeto perde ponto por mais bonito que esteja.

**Tarefas:** casos de uso, diagrama de casos de uso, diagrama de atividades da calculadora, cronograma em formato Gantt se o professor pedir, atas semanais, matriz de riscos atualizada, relatório de testes, slides e roteiro da apresentação, e coleta de campo junto com a trilha B (andar e fotografar não exige saber programar, e é o gargalo real do projeto).

Contrato de qualidade: modelo de documento pronto no repositório e checklist do que cada artefato precisa conter.

---

## Parte 4, como escrever uma tarefa delegável

Modelo curto, para colar no quadro de tarefas:

```
Título:
Arquivo(s) que você pode alterar:
Arquivos que você NÃO pode alterar:
Entrada (o que chega):
Saída (o que sai, formato exato):
Regras:
Pronto quando: (teste, checklist ou verificação objetiva)
Prazo:
Quem revisa:
```

Uma tarefa que você não consegue escrever nesse formato é uma tarefa que ainda não está pronta para delegar. Nesse caso, ou você quebra ela em partes menores, ou ela é sua mesmo.

**Custo honesto:** escrever a tarefa e os casos de teste leva de 20 a 40 minutos. Fazer a função você mesmo leva 30. Na primeira tarefa você perde tempo. Da terceira em diante você ganha, e ganha muito, porque a pessoa passa a produzir sem você. Delegação é investimento com retorno em três semanas, não atalho imediato.

---

## Parte 5, controle de qualidade sem microgerência

Cinco mecanismos, em ordem de custo crescente para você:

1. **Contrato na tarefa.** Já resolve a maioria dos casos.
2. **Casos de teste que você escreve antes.** A pessoa sabe se acertou sem perguntar.
3. **`validar.mjs` nos dados.** Reprova registro incompleto automaticamente.
4. **Checklist de pull request** (o de `10-guia-do-agente.md` serve para gente também). Quem abre o PR marca os itens antes de pedir revisão.
5. **Pareamento de 40 minutos** quando algo travar. Duas pessoas, uma tela. Isso resolve em 40 minutos o que resolveria em três dias de idas e vindas por mensagem, e ensina, o que reduz a próxima dúvida.

O que **não** funciona e é tentador: reescrever silenciosamente o código do colega depois que ele dorme. Isso resolve o arquivo e destrói o time. Se precisar reescrever, diga o porquê, no PR, de forma objetiva: "troquei para `textContent` porque `innerHTML` com dado abre brecha de injeção quando os dados vierem da API no 3º semestre".

---

## Parte 6, o que não delegar

- Design system, tokens e qualquer decisão de identidade.
- CSS de componente e layout.
- Estrutura semântica do HTML.
- Acessibilidade.
- Revisão final antes da entrega.
- A decisão de arquitetura (o que entra, o que fica fora).

## Parte 7, o que você precisa parar de fazer

Igualmente importante, e mais difícil:

- Coletar dado sozinho porque "é mais rápido". Não é: são três pilares e uma cidade inteira.
- Refazer o JSON dos outros na mão em vez de melhorar o validador.
- Escrever a documentação de Engenharia de Software porque ficou feia. Dê o modelo e o checklist.
- Montar os slides sozinho na véspera.
- Responder tudo no grupo em 30 segundos. Isso ensina o time a perguntar antes de tentar.

---

## Parte 8, cronograma de 12 semanas

Semanas de segunda a domingo. Datas de 2026. Ajuste tudo de uma vez se a data final vier diferente.

| Semana | Período | Foco | Marco (checkpoint interno) | Dono do marco |
| --- | --- | --- | --- | --- |
| S1 | 07 a 13/09 | Alinhamento | Repositório com `docs/`, papéis definidos, quadro de tarefas aberto, questionário revisado | Todos |
| S2 | 14 a 20/09 | Pesquisa começa | Pré-teste do formulário com 5 pessoas, autorização dos professores, formulário aplicado em pelo menos 1 turma | Trilha B |
| S3 | 21 a 27/09 | Pesquisa e campo | 80 respostas coletadas, primeiras 15 fichas de campo, `validar.mjs` funcionando | Trilha B e A |
| S4 | 28/09 a 04/10 | Tabulação e modelagem | Aba `agregado` pronta (inclui a pergunta F4), modelo ER fechado, decisões D03 e D04 tomadas | Trilha B |
| S5 | 05 a 11/10 | Identidade | Nome decidido (D01), paleta com contraste verificado, tipografia escolhida | Derick |
| S6 | 12 a 18/10 | Design system e base | `tokens.css` preenchido, `estilos.html` com todos os estados, HTML semântico das 4 páginas principais | Derick |
| S7 | 19 a 25/10 | Listagem funcionando | JSON com 30 ou mais itens reais, lista renderizando na tela, `filtrar` e `normalizar` passando nos testes | Derick e trilha A |
| S8 | 26/10 a 01/11 | Filtro completo | Filtro, busca e ordenação integrados, estado na URL funcionando, CSS dos componentes pronto | Derick e trilha A |
| S9 | 02 a 08/11 | Comparador e calculadora | Comparador com 3 itens e calculadora nos dois modos, casos de uso e diagramas entregues | Trilha A e C |
| S10 | 09 a 15/11 | Congelamento e testes | **Congelamento de funcionalidade.** Animação ao scroll, rotina de acessibilidade completa, teste com 5 usuários | Derick |
| S11 | 16 a 22/11 | Correção e dados | Defeitos do teste corrigidos, mutirão de reverificação de todos os dados, Lighthouse 100 em acessibilidade | Todos |
| S12 | 23 a 29/11 | Entrega | Site publicado, README final, slides prontos, ensaio cronometrado completo | Trilha C e Derick |
| Reserva | 30/11 a 06/12 | Folga | Só existe para absorver atraso. Se sobrar, entram os requisitos "poderia" | Todos |

### Notas de calendário
- **07/09** (S1) e **12/10** (S6) e **02/11** (S9) caem em segunda-feira de feriado, e **20/11** (S11) em sexta. Semana com feriado rende menos, e principalmente: **não dá para aplicar formulário em sala em semana de feriado**, o que reforça aplicar na S2 e S3.
- A pesquisa acontece nas semanas 2 a 4 porque tudo depende dela. Formulário aplicado na semana 5 quebra o cronograma inteiro.
- A identidade fecha na S5 e congela. Mudança de paleta na S9 custa uma semana que não existe.
- O congelamento da S10 é a regra mais importante do cronograma. Da S10 em diante, ninguém adiciona funcionalidade, só corrige. Grupo que continua adicionando recurso na semana 11 apresenta com bug.

### Marcos que não podem escorregar
Três datas. Se alguma delas atrasar, a reunião seguinte muda o escopo, não o prazo:

| Marco | Até quando | Se atrasar |
| --- | --- | --- |
| Formulário aplicado e tabulado | fim da S4, 04/10 | A calculadora vai ao ar com faixas mais amplas e um aviso de amostra menor |
| Identidade congelada | fim da S5, 11/10 | O site vai com os tokens neutros. É aceitável, e é melhor do que redesenhar em novembro |
| Congelamento de funcionalidade | fim da S10, 15/11 | Corta o requisito menos prioritário da lista "deveria" e "poderia" |

---

## Parte 9, ritmo semanal

**Reunião fixa, 30 minutos, mesmo dia e hora, toda semana.** Pauta de três perguntas, nessa ordem:

1. O que fechou desde a última? (mostrar na tela, não descrever)
2. O que travou? (e quem desbloqueia até quando)
3. O que cada um entrega até a próxima? (uma tarefa nomeada por pessoa, com data)

Ata curta em `docs/atas/AAAA-MM-DD.md`, escrita pela trilha C, com as decisões e os compromissos. Ata não é burocracia: é o que evita a conversa de "eu achei que você ia fazer".

**Regra das 48 horas:** quem travar avisa no grupo em até 48 horas. Ficar travado em silêncio é a única falha do processo que não tem conserto depois.

**Meia hora de pareamento por semana**, você com uma pessoa diferente a cada vez. Em 12 semanas, cada colega recebe 4 sessões suas. É o suficiente para os três conseguirem explicar o próprio código na apresentação, que é exatamente o risco 2 lá do começo deste documento.

---

## Parte 10, contingência

Cenários que acontecem em quase todo Projeto Integrador. Decida agora, com a cabeça fria, e registre em ata:

| Cenário | O que fazer |
| --- | --- |
| Alguém some por duas semanas | A tarefa volta para o quadro e é redistribuída na reunião. Registrar em ata, com data. Não é punição, é registro, e é o que protege o grupo se o professor perguntar sobre participação |
| A trilha A não entrega a função no prazo | Você implementa uma versão mínima e a pessoa refatora depois em par. O site não pode ficar parado esperando |
| A coleta de dados fica abaixo do mínimo | Reduzir a cobertura declarada (decisão D04, profundidade em vez de largura) e dizer isso na página de metodologia. Cobertura menor e honesta vale mais do que dado inventado |
| Você ficar sobrecarregado na S8 | Cortar da lista "poderia" primeiro (favoritos, tema escuro, exportar cálculo). Elas existem no documento justamente para serem cortadas |
| Conflito sobre qualidade de código | O critério é o contrato da tarefa e o checklist, não opinião. Se o checklist não cobre, o checklist é que precisa mudar, e isso vira decisão em ata |

---

## Parte 11, uma frase para a primeira reunião

Vale abrir a semana 1 dizendo o que este documento diz, na sua linguagem. Algo como:

> "Eu pego design, HTML, CSS e acessibilidade porque é o que eu faço melhor. Vocês pegam lógica, dados e documentação, que é o que vocês fazem melhor do que eu, e sem isso o projeto não existe. Toda tarefa vai ter entrada, saída e um jeito objetivo de saber se está pronta, para ninguém depender do meu gosto. E na apresentação cada um explica a própria parte."

Isso resolve, na primeira semana, a expectativa que costuma explodir na oitava.
