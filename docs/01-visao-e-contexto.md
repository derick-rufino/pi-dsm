# 01. Visão e contexto

## 1.1 O problema

Quem chega em Marília para estudar resolve, em poucas semanas e quase sempre sozinho, um conjunto de problemas que ninguém documentou em um lugar só:

- **Onde morar.** República, kitnet, pensionato ou quarto alugado. Cada opção tem custo, regra de convivência e distância diferente até o campus, e a informação circula em grupos fechados de WhatsApp, em anúncios soltos no Facebook Marketplace e no boca a boca de veteranos.
- **Como comer gastando pouco.** Restaurante universitário, marmitaria, self-service por quilo, mercado mais barato para compra da semana. Preço e horário mudam, e o calouro descobre por tentativa e erro.
- **O que fazer na cidade.** Bares, espaços culturais, parques, rolês recorrentes. Esse conhecimento é o mais informal de todos e some junto com a turma que se forma.

O sintoma prático é repetição: a cada início de semestre, centenas de pessoas refazem a mesma pesquisa manual, e o resultado dessa pesquisa não fica registrado em lugar nenhum.

**Recorte do problema para o Projeto Integrador:** não é um marketplace, não é uma rede social e não é um app de eventos. É um guia curado, com dados verificados e ferramentas de comparação, que responde três perguntas concretas de forma mais rápida e mais honesta do que um grupo de WhatsApp responde.

## 1.2 Público

| Segmento | Prioridade | Necessidade dominante |
| --- | --- | --- |
| Calouro que vem de outra cidade | **Primária** | Moradia e custo total antes de se mudar |
| Calouro que já mora em Marília ou região | Secundária | Comer perto do campus, transporte, cena |
| Veterano | Secundária | Comparar preço de moradia na hora de trocar de casa |
| Família de quem vai estudar | Terciária | Custo de vida estimado, segurança da região |

Uma decisão deliberada: o público é **universitário de qualquer instituição da cidade**, não só da Fatec. Isso amplia a base de pesquisa, evita um guia que só serve para um campus e é o que torna o produto defensável como projeto de cidade e não como trabalho interno de sala.

## 1.3 Contexto da cidade, dados públicos verificados

Números que entram no site precisam de fonte e data. Estes são o ponto de partida:

| Dado | Valor | Fonte e referência |
| --- | --- | --- |
| População (Censo) | 237.627 pessoas | IBGE, Censo 2022 |
| População estimada | 247.992 pessoas | IBGE, estimativa mais recente publicada |
| Área territorial | 1.170,515 km² | IBGE, 2025 |
| Densidade demográfica | 203,01 hab/km² | IBGE, Censo 2022 |
| IDHM | 0,798 | IBGE/PNUD, 2010 |
| Tarifa de ônibus urbano, básica | R$ 5,75 | AMTU Marília, tabela de tarifas |
| Tarifa de ônibus urbano, estudante | R$ 2,87 | AMTU Marília, tabela de tarifas |

> **Atenção do grupo:** a tarifa de estudante é o dado que mais impacta a calculadora de custo de vida e o que mais muda ao longo do ano. Todo valor exibido no site carrega a data em que foi verificado, e a página de metodologia explica isso. Ver `04-modelo-de-dados.md`, campo `verificado_em`.

### Instituições de ensino superior a mapear

A lista abaixo é o ponto de partida da coleta e precisa ser confirmada in loco e nos sites oficiais antes de virar dado do site:

- UNESP, Faculdade de Filosofia e Ciências, campus de Marília
- Famema, Faculdade de Medicina de Marília
- Unimar, Universidade de Marília
- Univem, Centro Universitário Eurípides de Marília
- Fatec Marília
- Etec de Marília e demais unidades técnicas com público que usa a mesma infraestrutura urbana

Para cada instituição o dado mínimo é: nome oficial, sigla, endereço do campus, bairro, e coordenadas aproximadas para o cálculo de distância. Número de matrículas é desejável para dimensionar o público, mas não é bloqueante.

## 1.4 Benchmark

O grupo não está inventando um formato inédito. Guias de cidade universitária existem, e vale copiar o que funciona e evitar o que não funciona.

| Referência | O que faz bem | O que evitar |
| --- | --- | --- |
| Guias de calouro de repúblicas (ex.: guia da UFOP mantido por uma república de Ouro Preto) | Compara tipos de moradia lado a lado, descreve bairros por distância a pé, entrega checklist prático de escolha de casa, mostra faixa de preço real | É comercial e enviesado: o guia existe para captar morador para uma casa específica. O nosso não pode ter parte interessada escondida |
| Guias institucionais em PDF (UFJF, UFMS e similares) | Cobertura oficial de assistência estudantil, linguagem confiável | PDF estático, não filtra, não compara, envelhece em um semestre e ninguém atualiza |
| Grupos de WhatsApp e Facebook Marketplace | Informação fresquíssima e negociação direta | Sem curadoria, sem histórico, sem comparação, hostil para quem chegou agora |
| Portais de aluguel genéricos | Volume de anúncios | Ignoram república, ignoram distância até campus, ignoram custo de vida agregado |

**Posicionamento resultante:** guia curado, sem parte interessada comercial, com dados datados e comparáveis, e com duas ferramentas que nenhuma das referências acima tem juntas: comparador de opções e calculadora de custo de vida.

## 1.5 Objetivos

### Objetivo de produto
Reduzir para uma sessão de navegação o que hoje leva semanas de pergunta em grupo: escolher onde morar, saber quanto custa viver aqui e descobrir o que a cidade oferece.

### Objetivos acadêmicos
O Projeto Integrador vale 2 pontos somados à nota final e precisa integrar as disciplinas do semestre. O mapeamento explícito:

| Disciplina | Como o projeto entrega |
| --- | --- |
| Modelagem de Banco de Dados | Modelo ER completo e normalizado do domínio, mesmo que a persistência do 1º semestre seja em JSON, ver `04-modelo-de-dados.md` |
| Desenvolvimento Web I | Site inteiro em HTML semântico, CSS e JavaScript, sem framework |
| Algoritmos e Lógica de Programação | Filtro, busca, ordenação, comparador e calculadora, escritos do zero |
| Engenharia de Software I | Documento de visão, requisitos, casos de uso, backlog, cronograma e atas, ver `08-processo-e-etapas.md` |
| Design Digital | Design system próprio, do Figma para tokens CSS, ver `06-design-system.md` |
| Sistemas Operacionais e Redes | Publicação, entendimento de HTTP, cache, DNS e hospedagem estática, ver `08-processo-e-etapas.md` |

### Objetivo declarado do grupo
Ser o melhor trabalho da sala e sobreviver ao semestre: o projeto foi escolhido para ser incrementado nos semestres seguintes junto com as disciplinas novas. Isso é um requisito de arquitetura, não uma aspiração. Ver `09-roadmap-de-escala.md`.

## 1.6 Métricas de sucesso

Métricas que o grupo consegue medir sem back-end e sem conta de usuário:

| Métrica | Meta | Como medir |
| --- | --- | --- |
| Cobertura de moradia | 40 ou mais opções cadastradas e verificadas | Contagem no arquivo de dados |
| Cobertura de comer | 30 ou mais estabelecimentos com faixa de preço | Contagem no arquivo de dados |
| Cobertura de cena | 20 ou mais locais ou rolês recorrentes | Contagem no arquivo de dados |
| Frescor do dado | 100% dos registros com `verificado_em` nos últimos 60 dias na entrega | Script de validação, ver `04-modelo-de-dados.md` |
| Respostas do formulário | 80 ou mais respostas válidas | Planilha de tabulação |
| Acessibilidade | 100 no Lighthouse **e** checklist manual WCAG 2.2 AA sem pendência crítica | `07-acessibilidade.md` |
| Performance | LCP abaixo de 2,5 s em conexão simulada 4G, peso inicial abaixo de 300 KB | Lighthouse, aba Network |
| Teste com usuário real | 5 calouros conseguem responder "quanto custa morar aqui" em menos de 3 minutos sem ajuda | Roteiro de teste em `03-pesquisa-de-campo.md` |

Métrica que o grupo **não** vai perseguir neste semestre: número de visitantes. Sem analytics e sem back-end, qualquer número desses seria inventado, e defender número inventado em banca é como se perde ponto.

## 1.7 Riscos

| Risco | Impacto | Mitigação |
| --- | --- | --- |
| Dado envelhece entre a coleta e a apresentação | Alto, ataca a credibilidade do produto | Campo `verificado_em` visível, mutirão de reverificação na semana anterior à entrega |
| Formulário não atinge respostas suficientes | Médio | Aplicar presencialmente em sala com autorização do professor, não só link no grupo |
| Escopo cresce (mapa, login, eventos com data) | Alto, é o modo clássico de morrer no PI | Lista de fora de escopo em `02-escopo-e-requisitos.md`, tratada como contrato |
| Divisão de trabalho desequilibrada | Alto | Papéis fixos por área com entregável nomeado, ver `08-processo-e-etapas.md` |
| Nome e identidade travarem o início do código | Médio | Construir com tokens neutros e nome provisório, decidir a marca até a fase 3, ver `11-decisoes-em-aberto.md` |
| Dado sensível de morador coletado sem base legal | Alto, risco real e não só acadêmico | Regras de LGPD em `03-pesquisa-de-campo.md` |
