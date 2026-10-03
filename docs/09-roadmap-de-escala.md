# 09. Roadmap de escala

O Guia foi escolhido para crescer junto com o curso. Este documento diz o que entra em cada semestre, com qual disciplina cada salto conversa, e principalmente **o que não fazer antes da hora**.

Princípio geral: cada salto acontece quando uma dor real aparece, não quando a tecnologia parece interessante. Adotar banco de dados sem ter problema de dados, ou framework sem ter problema de estado, é como se transforma um projeto que funciona em um projeto que precisa ser explicado.

## 1º semestre, agora: site estático com dados curados
**Estado:** HTML, CSS e JavaScript puros, dados em JSON, sem back-end.
**O que prova:** semântica, layout, lógica de filtro e cálculo, design system, acessibilidade, e um conjunto de dados que ninguém mais tem.
**Limite conhecido:** atualizar dado exige editar arquivo e publicar. Com 4 pessoas e 100 registros, isso é aceitável.
**Gatilho para o próximo salto:** editar JSON à mão começar a gerar conflito de merge e erro de digitação.

## 2º semestre: banco de dados relacional
**Disciplinas prováveis:** Banco de Dados, Programação Orientada a Objetos, Desenvolvimento Web II.

**O que entra**
- Criar o esquema real (MySQL ou PostgreSQL) a partir do ER de `04-modelo-de-dados.md`, que já está normalizado justamente para isso.
- Script de carga que lê os JSON atuais e popula as tabelas. A migração é carga de dados, não remodelagem, e isso é consequência direta de o JSON ter sido projetado como projeção do ER.
- Consultas SQL de verdade: filtro por bairro e preço, junção com distância, agregações para a calculadora.
- Um gerador que exporta do banco para os mesmos arquivos JSON que o site já consome.

**Por que gerar JSON em vez de consultar o banco direto:** o site continua estático e rápido, o deploy continua gratuito, e o banco vira a ferramenta de gestão dos dados. É a arquitetura de site gerado estaticamente, e é uma decisão de arquitetura defensável, não uma limitação.

**O que não fazer ainda:** expor o banco na internet, criar API pública, adicionar login.

## 3º semestre: API e separação de camadas
**Disciplinas prováveis:** Desenvolvimento Web III, Programação para Servidores, Estrutura de Dados.

**O que entra**
- API REST (Node com Express é o caminho mais provável dado o perfil do time) sobre o mesmo banco.
- Endpoints de leitura: `GET /locais`, `GET /locais/:id`, `GET /custos`, com filtro por query string.
- O front passa a consumir a API em vez do arquivo, com fallback para JSON estático quando a API estiver fora.
- Aqui, e não antes, entra a discussão de framework de front. O gatilho é estado compartilhado entre telas, não moda.
- Painel de administração simples para o grupo cadastrar registro sem editar arquivo.

**Cuidados que aparecem pela primeira vez**
- CORS, variáveis de ambiente, segredo fora do repositório.
- Validação de entrada no servidor, porque agora existe entrada de fora.
- Custo de hospedagem: um back-end sempre ligado deixa de ser gratuito. Avaliar plano gratuito com suspensão automática ou funções serverless.

## 4º semestre: área logada e contribuição da comunidade
**Disciplinas prováveis:** Desenvolvimento Mobile, Segurança, Engenharia de Software II.

**O que entra**
- Autenticação com e-mail institucional, que serve como filtro natural de público e reduz spam.
- Usuário sugere e corrige registro, com fila de moderação do grupo. O guia deixa de depender de quatro pessoas andando pela cidade.
- Favoritos e comparações salvas na conta.
- Aqui volta a agenda de eventos com data, que só faz sentido quando há quem alimente.
- Mapa, se ainda fizer sentido, com atenção à acessibilidade que uma biblioteca de mapa costuma quebrar.

**O que muda de responsabilidade:** a partir do momento em que existe conta de usuário, o projeto trata dado pessoal de verdade. Política de privacidade, base legal, prazo de retenção e canal de exclusão deixam de ser exercício e passam a ser obrigação. Ver `03-pesquisa-de-campo.md`, seção 3.3.

## 5º semestre: aplicativo multiplataforma
**Disciplinas prováveis:** Desenvolvimento Mobile, Computação em Nuvem, DevOps.

**O que entra**
- App em React Native com Expo, consumindo a mesma API.
- Recursos que só o app justifica: notificação de vaga nova em república e busca por proximidade usando o GPS.
- Modo offline para os dados principais, útil para quem tem plano de internet limitado, que é boa parte do público.
- Pipeline de publicação e monitoramento básico.

**Critério honesto:** se o app não fizer nada que o site responsivo já faz bem, ele não deve existir. Notificação e localização são as duas justificativas reais.

## 6º semestre e TCC: avaliação e continuidade
- Medir impacto de verdade: quantas pessoas usam, quais decisões o guia ajudou a tomar, com pesquisa de acompanhamento.
- Comparar o guia com o que a literatura diz sobre acesso à informação e permanência estudantil. Existe base acadêmica sobre custo de vida e evasão, e é o que transforma o projeto em TCC defensável.
- Definir a continuidade: quem mantém o guia quando o grupo se formar. Repositório aberto, documentação boa e um centro acadêmico interessado é o caminho mais realista.

## Decisões de arquitetura que já protegem o futuro

| Decisão de hoje | Ganho lá na frente |
| --- | --- |
| Modelo ER completo, mesmo sem banco | Migração do 2º semestre é carga de dados, não redesenho |
| Identificador textual estável (`mor-012`) | URL compartilhada continua válida depois do banco |
| Todo dado com `fonte` e `verificado_em` | Base para moderação e confiança quando terceiros contribuírem |
| Tokens em duas camadas | Troca de framework não exige redesenho |
| Estado na URL | O front já pensa em rota, o que facilita a adoção de roteador depois |
| Valores monetários como inteiros | Nenhum erro de arredondamento acumulado em relatório futuro |
| JSON como projeção do ER, não formato próprio | O contrato do front sobrevive à entrada da API |
| Acessibilidade desde o início | Não vira dívida impagável, que é o destino normal quando fica para depois |

## Sinais de que é hora de dar o próximo passo

- Dois membros editam o mesmo JSON e o merge dá conflito toda semana. Hora do banco.
- O grupo passa mais tempo publicando correção de dado do que coletando dado. Hora do painel de administração.
- Gente de fora pede para contribuir. Hora da conta de usuário.
- O mesmo dado precisa ser lido por site e por app. Hora da API.
- Nenhum desses sinais aparece? Então não é hora, mesmo que a disciplina do semestre esteja ensinando a ferramenta. Nesse caso, o exercício da disciplina pode ser feito **sobre** o projeto sem ser integrado à produção.
