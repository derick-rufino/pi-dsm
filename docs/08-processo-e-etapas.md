# 08. Processo e etapas

Quatro pessoas, 10 a 12 semanas, entrega em novembro ou dezembro de 2026. O maior risco de um Projeto Integrador não é técnico: é a semana 8 chegar com dados incompletos, identidade indefinida e três pessoas esperando a quarta.

## 8.1 Papéis

Papel não é cargo, é responsabilidade por um entregável nomeado. Todo mundo programa, mas cada entregável tem um dono único.

| Papel | Dono | Entregáveis |
| --- | --- | --- |
| **Design e front-end base** | Derick | Design system, tokens, HTML e CSS de todas as páginas, acessibilidade, revisão final de todo o código |
| **Dados e lógica** | Colega 1 | Coleta de campo, arquivos JSON, filtro, busca, ordenação, comparador e calculadora em JavaScript |
| **Documentação e processo** | Colega 2 | Artefatos de Engenharia de Software, cronograma, atas, roteiro e slides da apresentação |
| **Modelagem e conteúdo** | Colega 3 | Modelo ER, dicionário de dados, textos do site, página de metodologia |

Regras de convivência:
- Quem é dono do entregável decide o detalhe. Discussão sem decisão vira item na ata com prazo.
- Revisão cruzada obrigatória: nenhum merge sem uma segunda pessoa lendo.
- Ninguém fica bloqueado por mais de 48 horas em silêncio. Bloqueio vira mensagem no grupo no mesmo dia.

## 8.2 Fases

Cada fase tem entrada, saída e critério de pronto. Fase sem critério de pronto é fase que não termina.

### Fase 0, Alinhamento (semana 1)
**Entrada:** tema aprovado.
**Atividades:** ler esta documentação inteira em grupo, dividir papéis, criar repositório, abrir o quadro de tarefas, marcar reunião semanal fixa.
**Saída:** repositório com `docs/`, quadro com backlog inicial, papéis registrados em ata.
**Pronto quando:** os quatro sabem dizer, sem consultar, qual é o próprio entregável e qual é o do vizinho.

### Fase 1, Pesquisa (semanas 2 e 3)
**Entrada:** questionário de `03-pesquisa-de-campo.md`.
**Atividades:** pré-teste com 5 pessoas, ajuste, autorização com professores, aplicação presencial em pelo menos 3 turmas, início do campo (primeiro bairro), levantamento das fontes institucionais.
**Saída:** 80 ou mais respostas válidas tabuladas, primeiras 15 fichas de campo, tabela de fontes públicas com data.
**Pronto quando:** a aba `agregado` da planilha responde: quanto se gasta por categoria, e qual recurso o público mais quer (pergunta F4).
**Risco:** esta é a fase que atrasa. Aplicar o formulário na semana 2, não na 3.

### Fase 2, Modelagem e conteúdo (semanas 3 e 4, sobrepõe a fase 1)
**Entrada:** primeiras fichas de campo.
**Atividades:** fechar o modelo ER, escrever o dicionário de dados, criar os JSON com dados reais (nem que sejam 10 itens por pilar), escrever o texto das páginas.
**Saída:** ER validado, `dados/*.json` populados, textos aprovados.
**Pronto quando:** um item real de cada pilar percorre o caminho completo: ficha de campo, linha na planilha, objeto no JSON, com fonte e data.

### Fase 3, Identidade e design system (semanas 4 e 5)
**Entrada:** resultado da pergunta F4 e o volume real de dados.
**Atividades:** decidir nome e marca, definir paleta com contraste verificado, escolher tipografia, montar as Variables no Figma, desenhar os componentes do inventário, gerar `tokens.css`, montar `estilos.html`.
**Saída:** `tokens.css` preenchido, página de estilos com todos os estados, protótipo das telas principais no Figma.
**Pronto quando:** todos os pares de cor passam no verificador de contraste e nenhum componente do inventário está sem estado de foco desenhado.
**Congelamento:** a partir daqui, identidade não muda. Mudança de identidade depois da fase 4 custa uma semana inteira.

### Fase 4, Construção (semanas 5 a 9)
**Entrada:** tokens, JSON com dados reais, requisitos priorizados.
**Atividades, nesta ordem:**
1. Estrutura HTML semântica de todas as páginas, com conteúdo real e sem JavaScript.
2. CSS base, layout e componentes a partir dos tokens.
3. Carregamento de dados e renderização da lista.
4. Filtro, busca e ordenação.
5. Comparador.
6. Calculadora.
7. Animação ao scroll, por último.

**Saída:** site funcional com todos os requisitos "Deve".
**Pronto quando:** as três tarefas do teste de usuário (`03-pesquisa-de-campo.md`, seção 3.8) são executáveis do início ao fim.
**Razão da ordem:** conteúdo antes de estilo, estilo antes de interação, interação antes de enfeite. Quem começa pela animação entrega uma animação bonita em cima de um site incompleto.

### Fase 5, Acessibilidade, testes e polimento (semanas 9 e 10)
**Entrada:** site funcional.
**Atividades:** rotina completa de `07-acessibilidade.md`, teste com 5 usuários reais, correção dos defeitos encontrados, otimização de imagem e fonte, reverificação de todos os dados, revisão de texto.
**Saída:** relatórios salvos em `docs/relatorios/`, defeitos corrigidos, dados com verificação recente.
**Pronto quando:** Lighthouse com 100 em acessibilidade, checklist manual sem pendência crítica, e nenhum dado com mais de 60 dias.

### Fase 6, Entrega e apresentação (semanas 11 e 12)
**Entrada:** site pronto.
**Atividades:** publicar, escrever o README do repositório, montar os slides, ensaiar cronometrado, preparar respostas para as perguntas prováveis, gravar um plano B (vídeo ou capturas) para o caso de a internet falhar na apresentação.
**Saída:** URL pública, repositório organizado, apresentação ensaiada.
**Pronto quando:** o ensaio completo cabe no tempo e os quatro conseguem responder "por que vocês fizeram assim" em qualquer decisão técnica.

### Resumo

| Fase | Semanas | Marco |
| --- | --- | --- |
| 0, Alinhamento | 1 | Repositório e papéis |
| 1, Pesquisa | 2 a 3 | 80 respostas tabuladas |
| 2, Modelagem e conteúdo | 3 a 4 | JSON com dado real |
| 3, Identidade | 4 a 5 | Tokens congelados |
| 4, Construção | 5 a 9 | Requisitos "Deve" completos |
| 5, Testes | 9 a 10 | Relatórios e correções |
| 6, Entrega | 11 a 12 | Publicado e ensaiado |

## 8.3 Ritmo semanal

- **Reunião fixa, 30 minutos, mesmo dia e hora toda semana.** Pauta: o que fechou, o que travou, o que entra até a próxima. Ata curta no repositório, em `docs/atas/`.
- **Quadro de tarefas** (GitHub Projects, Trello ou o que o grupo já usa) com quatro colunas: A fazer, Fazendo, Em revisão, Pronto. Limite de duas tarefas simultâneas por pessoa.
- **Nenhuma tarefa sem dono e sem data.** Tarefa sem dono é tarefa de ninguém.

## 8.4 Git

Fluxo simples, adequado a quatro pessoas iniciando:

```
main            sempre publicável
  feat/filtro-moradia
  feat/calculadora
  fix/contraste-etiqueta
  docs/metodologia
  dados/moradia-lote-2
```

- Branch por tarefa, nome com prefixo de tipo.
- Commits pequenos, mensagem em português no imperativo: `adiciona filtro por bairro`, `corrige contraste da etiqueta`, `atualiza dados de moradia do Palmital`.
- Pull request com descrição do que mudou e como testar. Revisão de pelo menos um colega antes do merge.
- `main` sempre funcionando. Se `main` quebrou, isso vira a prioridade de todo mundo.
- `.gitignore` com: planilha de respostas do formulário, fotos brutas de campo, arquivos do sistema operacional, e qualquer arquivo com contato pessoal.

**Nunca commitar:** respostas individuais do formulário, contato pessoal de morador ou proprietário, foto com pessoa identificável.

## 8.5 Publicação

Hospedagem estática, gratuita, com HTTPS: GitHub Pages, Netlify ou Vercel. Qualquer uma serve, já que não há back-end.

Checklist de publicação:
- Caminhos relativos corretos (`/dados/moradia.json` funciona na raiz do domínio, mas quebra em subpasta de GitHub Pages, atenção a isso).
- `404.html` com link de volta.
- Meta tags de compartilhamento (`og:title`, `og:description`, `og:image`).
- Favicon.
- `<html lang="pt-BR">`.
- Verificar HTTPS ativo.
- Testar em um celular real, não só no emulador do DevTools.

Isso conversa com Sistemas Operacionais e Redes: vale registrar na documentação o caminho da requisição (DNS, TLS, HTTP, cache do navegador) para uma página do site. É um parágrafo curto que amarra mais uma disciplina ao projeto.

## 8.6 Artefatos de Engenharia de Software

Entregáveis do Colega 2, alinhados ao que a disciplina costuma pedir:

| Artefato | Onde vive | Base |
| --- | --- | --- |
| Documento de visão | `docs/01-visao-e-contexto.md` | Já escrito |
| Especificação de requisitos | `docs/02-escopo-e-requisitos.md` | Já escrito, RF e RNF numerados |
| Histórias de usuário e backlog | `docs/02` mais o quadro de tarefas | Já escrito |
| Casos de uso | `docs/eng-software/casos-de-uso.md` | A escrever: filtrar itens, comparar itens, calcular custo |
| Diagrama de casos de uso | Figma ou draw.io, exportado para `docs/img/` | A fazer |
| Diagrama de atividades da calculadora | Idem | A fazer |
| Modelo ER | `docs/04-modelo-de-dados.md` | Já escrito, com diagrama Mermaid |
| Cronograma | `docs/08-processo-e-etapas.md`, seção 8.2 | Já escrito, converter em Gantt se a disciplina pedir |
| Matriz de riscos | `docs/01`, seção 1.7 | Já escrito |
| Atas de reunião | `docs/atas/AAAA-MM-DD.md` | Semanal |
| Relatório de testes | `docs/relatorios/` | Fase 5 |

## 8.7 Matriz de navegadores

| Navegador | Versão | Quem testa |
| --- | --- | --- |
| Chrome desktop | Duas últimas | Dados e lógica |
| Firefox desktop | Duas últimas | Documentação |
| Edge desktop | Duas últimas | Modelagem |
| Safari (iOS, celular de alguém do grupo ou de colega) | Atual | Design e front |
| Chrome Android | Atual | Design e front |

Safari é o que mais surpreende, principalmente em `gap`, unidades de viewport e formulário. Testar cedo, não na véspera.
