# 02. Escopo e requisitos

## 2.1 Os três pilares

O site tem três eixos de conteúdo e nenhum quarto. Transporte não é pilar: é **atributo** que aparece dentro dos outros três, na forma de distância e tempo até cada campus.

### Pilar 1, Moradia
República, kitnet, pensionato e quarto em casa compartilhada. Para cada opção: faixa de preço, o que está incluso (água, luz, internet, gás, limpeza), bairro, distância e tempo até os campi, perfil da casa (quantidade de moradores, regras de convivência declaradas) e data da última verificação.

### Pilar 2, Comer e gastar pouco
Restaurante universitário, marmitaria, self-service, lanche barato, mercado para compra da semana e feira. Para cada um: faixa de preço da refeição, horário de funcionamento, dias, bairro, distância até os campi e observações úteis (aceita vale, tem opção vegetariana, tem entrega).

### Pilar 3, Cena e rolê
Bar, espaço cultural, parque, quadra, cinema, rolê recorrente sem data fixa (por exemplo "quarta de samba no bar X"). Para cada um: tipo, faixa de preço, dia recorrente quando houver, bairro e distância.

> **Por que "rolê recorrente" e não "evento com data":** agenda de eventos exige atualização contínua e morre em duas semanas de abandono. Recorrência semanal é dado estável, que sobrevive ao semestre e ainda serve ao calouro.

## 2.2 Funcionalidades carro-chefe

Três, e são o que diferencia o projeto de uma página de conteúdo estático.

### F1, Filtro, busca e comparador
- Filtro por pilar, bairro, faixa de preço, distância até um campus escolhido e etiquetas (por exemplo "contas inclusas", "aceita pet", "vegetariano").
- Busca textual que ignora acento e caixa.
- Ordenação por preço, por distância e por data de verificação.
- Comparador: o usuário marca de 2 a 3 itens do mesmo pilar e vê uma tabela lado a lado com os mesmos campos.
- Estado do filtro refletido na URL, para que um link compartilhado abra a mesma seleção.

### F2, Calculadora de custo de vida, dois modos
Estimativa mensal do custo de viver em Marília como estudante, apresentada sempre como **faixa** (mínimo, típico, máximo), nunca como número único falsamente preciso.

Os dois modos ainda estão em aberto e a decisão está registrada em `11-decisoes-em-aberto.md`. As duas leituras candidatas:

- **Leitura A, por profundidade.** Modo rápido com 4 entradas (tipo de moradia, come em casa ou fora, usa ônibus ou não, perfil de lazer) e modo detalhado com itens editáveis linha a linha.
- **Leitura B, por situação.** Modo "vim de outra cidade" (inclui moradia, mudança e enxoval) e modo "já moro em Marília" (exclui moradia, foca em transporte, alimentação e lazer).

Recomendação técnica: **Leitura A**, porque o modo detalhado é o modo rápido com os campos abertos, o que significa uma única função de cálculo e uma única fonte de valores. A Leitura B duplicaria a lógica.

### F3, Animação ao scroll enxuta
Revelação suave de blocos ao entrar na viewport, com `IntersectionObserver`, respeitando `prefers-reduced-motion` e sem esconder conteúdo de quem está sem JavaScript. Detalhes em `05-arquitetura-front-end.md`, seção de animação.

## 2.3 Requisitos funcionais

| ID | Requisito | Prioridade |
| --- | --- | --- |
| RF01 | Listar itens de cada pilar a partir de arquivos JSON locais | Deve |
| RF02 | Filtrar a lista por bairro, faixa de preço, etiquetas e campus de referência | Deve |
| RF03 | Buscar por texto, ignorando acentuação e caixa | Deve |
| RF04 | Ordenar por preço, distância e data de verificação | Deve |
| RF05 | Selecionar de 2 a 3 itens e exibir comparação em tabela | Deve |
| RF06 | Refletir filtros e seleção na URL e restaurar o estado ao abrir o link | Deve |
| RF07 | Calcular faixa de custo mensal em dois modos | Deve |
| RF08 | Exibir, em cada item, a distância e o tempo estimado até o campus selecionado | Deve |
| RF09 | Exibir, em cada item, a data da última verificação e a origem do dado | Deve |
| RF10 | Revelar blocos ao scroll, desativável por preferência do sistema | Deve |
| RF11 | Página de metodologia explicando como cada dado foi obtido | Deve |
| RF12 | Página de acessibilidade declarando o nível alcançado e as limitações conhecidas | Deveria |
| RF13 | Exportar ou copiar o resultado da calculadora como texto | Poderia |
| RF14 | Marcar favoritos com persistência local no navegador | Poderia |
| RF15 | Alternância de tema claro e escuro | Poderia |

Escala de prioridade: **Deve** (sem isso não há entrega), **Deveria** (entra se a fase 4 fechar no prazo), **Poderia** (só se sobrar tempo, e a primeira coisa a cair).

## 2.4 Requisitos não funcionais

| ID | Requisito | Verificação |
| --- | --- | --- |
| RNF01 | HTML, CSS e JavaScript puros, sem framework e sem dependência de runtime | Inspeção do repositório, ausência de `node_modules` no produto final |
| RNF02 | Sem back-end, dados servidos como arquivos estáticos | Deploy funciona em hospedagem estática |
| RNF03 | Conformidade WCAG 2.2 nível AA nos fluxos principais | `07-acessibilidade.md` |
| RNF04 | Lighthouse 100 em Acessibilidade e 90 ou mais em Performance e Boas Práticas | Relatório salvo no repositório |
| RNF05 | Peso do carregamento inicial abaixo de 300 KB, considerando fontes e imagens | Aba Network com cache desativado |
| RNF06 | Layout utilizável de 320 px a 1920 px, sem rolagem horizontal | Teste manual e emulador |
| RNF07 | Funciona nas duas últimas versões de Chrome, Firefox, Edge e Safari | Teste manual, matriz em `08-processo-e-etapas.md` |
| RNF08 | Conteúdo principal legível sem JavaScript (progressive enhancement no que for viável) | Desativar JS e navegar |
| RNF09 | Código com nomes em português no domínio e em inglês nas APIs do navegador, padronizado | Revisão de código |
| RNF10 | Todo dado exibido tem origem rastreável e data de verificação | Script de validação de dados |
| RNF11 | Nenhum dado pessoal identificável publicado no site | Revisão de conteúdo, ver LGPD em `03-pesquisa-de-campo.md` |

## 2.5 Histórias de usuário

Formato: como <perfil>, quero <ação>, para <resultado>.

**Moradia**
- Como calouro de outra cidade, quero filtrar repúblicas por faixa de preço e por distância até o meu campus, para saber quais eu consigo pagar e alcançar a pé.
- Como calouro, quero comparar três casas lado a lado, para decidir sem abrir dez abas.
- Como responsável financeiro de um estudante, quero ver o que está incluso no aluguel, para não ser surpreendido com contas.

**Comer**
- Como estudante do período noturno, quero filtrar por lugares abertos à noite perto do campus, para não jantar sempre a mesma coisa.
- Como estudante com orçamento apertado, quero ver a faixa de preço da refeição antes de ir, para planejar a semana.

**Cena**
- Como calouro, quero ver o que acontece de forma recorrente na cidade, para não depender de convite de veterano.
- Como estudante sem carro, quero saber a distância do rolê até onde eu moro, para calcular a volta.

**Calculadora**
- Como candidato que ainda vai se mudar, quero uma estimativa de custo mensal, para negociar em casa se dá para vir.
- Como veterano, quero ajustar os itens da estimativa, para comparar com o que eu gasto de verdade.

**Transversal**
- Como pessoa que usa leitor de tela, quero navegar todo o filtro pelo teclado e ouvir quantos resultados sobraram, para usar o site sem depender do mouse.
- Como usuário desconfiado, quero saber quando o preço foi verificado, para saber se posso confiar.

## 2.6 Fora de escopo, primeiro semestre

Esta lista é contrato. Alterar exige decisão registrada em `11-decisoes-em-aberto.md`.

| Item | Por que fica de fora | Quando volta |
| --- | --- | --- |
| Agenda de eventos com data | Exige atualização contínua e apodrece rápido | 3º semestre, com back-end e área de administração |
| Conta de usuário, login, perfil | Exige back-end, autenticação e tratamento de dado pessoal | 3º ou 4º semestre |
| Framework de front-end (React, Vue e afins) | O objetivo da disciplina é dominar a base | 3º semestre, ver `09-roadmap-de-escala.md` |
| Mapa com biblioteca externa (Leaflet, Google Maps) | Peso, dependência externa e complexidade de acessibilidade | 4º semestre, ou antes como página estática de imagem se houver tempo |
| Comentário, avaliação e nota de usuário | Moderação, spam e responsabilidade sobre conteúdo de terceiros | 4º semestre com moderação |
| Aplicativo mobile | Fora do escopo da disciplina do semestre | 4º ou 5º semestre |
| Scraping de sites de imóveis | Risco jurídico e dado sem verificação | Não previsto |
| Anúncio pago, parceria comercial | Compromete a neutralidade que é o diferencial do produto | Não previsto |

## 2.7 Restrições

- **Prazo:** entrega no fim do semestre, novembro ou dezembro de 2026, cerca de 10 a 12 semanas úteis.
- **Time:** 4 pessoas, com um perfil forte em front-end e três com experiência em lógica e outras linguagens.
- **Tecnologia:** determinada pela disciplina, sem negociação neste semestre.
- **Dados:** coletados pelo próprio grupo, o que limita o volume e exige priorizar profundidade em vez de cobertura total da cidade.
