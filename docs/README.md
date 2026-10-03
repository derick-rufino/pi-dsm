# Guia de Marília, documentação do projeto

Projeto Integrador do 1º semestre de Desenvolvimento de Software Multiplataforma (DSM), Fatec Marília, segundo semestre letivo de 2026.

Esta pasta é a fonte de verdade do projeto. Código sem documentação correspondente aqui é código que ninguém do grupo consegue defender na apresentação, e é código que um agente de IA vai reescrever errado na semana seguinte.

## O que é o produto, em uma frase

Um guia web da vida universitária em Marília, feito para quem estuda em qualquer instituição da cidade e principalmente para quem acabou de chegar, organizado em três pilares: **moradia**, **comer e gastar pouco**, e **cena e rolê**.

## Estado atual

| Item | Situação |
| --- | --- |
| Tema | Definido (votação unânime do grupo, set/2026) |
| Pilares e escopo | Definidos, ver `02-escopo-e-requisitos.md` |
| Stack | HTML, CSS e JavaScript puros, sem framework e sem back-end |
| Nome e marca | **Em aberto**, ver `11-decisoes-em-aberto.md` |
| Identidade visual | **Em aberto** (tipografia, paleta, linguagem de forma) |
| Pesquisa de campo | **Não iniciada**, questionário pronto em `03-pesquisa-de-campo.md` |
| Modelo de dados | Proposto em `04-modelo-de-dados.md`, falta validar com dados reais |

## Índice

| Arquivo | Para quê |
| --- | --- |
| [01-visao-e-contexto.md](01-visao-e-contexto.md) | Problema, público, benchmark, dados públicos de Marília, objetivos e métricas |
| [02-escopo-e-requisitos.md](02-escopo-e-requisitos.md) | Pilares, requisitos funcionais e não funcionais, histórias de usuário, fora de escopo |
| [03-pesquisa-de-campo.md](03-pesquisa-de-campo.md) | Metodologia, questionário completo, amostragem, LGPD, roteiro de campo, tabulação |
| [04-modelo-de-dados.md](04-modelo-de-dados.md) | Modelo ER, dicionário de dados, JSON equivalente, validação |
| [05-arquitetura-front-end.md](05-arquitetura-front-end.md) | Estrutura de pastas, padrões de JS sem framework, filtro, comparador, calculadora, animação |
| [06-design-system.md](06-design-system.md) | Tokens, escalas, componentes, ponte Figma para CSS |
| [07-acessibilidade.md](07-acessibilidade.md) | Critérios WCAG 2.2 AA aplicáveis, testes manuais e automáticos, limites do Lighthouse |
| [08-processo-e-etapas.md](08-processo-e-etapas.md) | Fases do projeto, entregáveis por fase, papéis, fluxo de Git, artefatos de Engenharia de Software |
| [09-roadmap-de-escala.md](09-roadmap-de-escala.md) | Como o projeto cresce a cada semestre, do JSON estático ao aplicativo |
| [10-guia-do-agente.md](10-guia-do-agente.md) | Regras para o Claude Code e para qualquer agente que toque no repositório |
| [11-decisoes-em-aberto.md](11-decisoes-em-aberto.md) | Decisões pendentes, critérios de escolha e prazo para decidir |
| [12-cronograma-e-delegacao.md](12-cronograma-e-delegacao.md) | Cronograma de 12 semanas, marcos, trilhas de delegação e contingência |
| [fontes.md](fontes.md) | Fontes externas consultadas, com data de verificação |

## Como ler isso pela primeira vez

1. `01` e `02` para entender o que o projeto é e o que ele não é.
2. `08` para saber em que fase o grupo está.
3. `12` para saber qual é a sua trilha e o que você entrega em cada semana.
4. O arquivo da sua área (`03` para quem coleta dados, `04` para quem modela, `05` e `06` para quem constrói).
5. `11` antes de tomar qualquer decisão que pareça já resolvida. Provavelmente não está.

## Convenção de atualização

Toda decisão que muda o produto vira uma linha em `11-decisoes-em-aberto.md` (movida para a seção "Decidido" com data e justificativa) e uma atualização no arquivo temático correspondente, no mesmo commit da mudança de código.
