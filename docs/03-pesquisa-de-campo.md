# 03. Pesquisa de campo e coleta de dados

Este documento existe porque o diferencial do Guia não é o código: é o dado. Um site bonito com dado inventado perde para um grupo de WhatsApp. O objetivo aqui é que qualquer pessoa do grupo consiga coletar, registrar e validar dado do mesmo jeito.

## 3.1 As três fontes

| Fonte | O que produz | Confiabilidade | Custo de coleta |
| --- | --- | --- | --- |
| **Formulário aplicado nas turmas** | Percepção, hábito e valor pago de verdade por quem já mora aqui | Alta para tendência, baixa para preço pontual | Baixo, alto retorno |
| **Campo próprio** (andar, registrar, fotografar) | Preço afixado, horário, endereço, condição real do lugar | Muito alta, com data | Alto |
| **Fontes públicas e institucionais** | Tarifa de transporte, endereço de campus, programas de assistência estudantil, dados do IBGE | Alta, e citável | Baixo |

Regra de ouro: **nenhum número vai para o site sem uma das três fontes registrada no campo `fonte` e sem a data em `verificado_em`.** Estimativa de terceiro ("ouvi dizer que é uns 600") entra apenas na tabulação do formulário, como percepção agregada, nunca como preço de um item específico.

## 3.2 Metodologia do formulário

### Objetivos da pesquisa
1. Dimensionar quanto o estudante de Marília gasta por categoria, para calibrar a calculadora de custo de vida.
2. Descobrir onde a informação circula hoje, para validar que o problema existe.
3. Levantar indicações de moradia, comida e rolê que o grupo depois verifica em campo.
4. Descobrir qual pilar é o mais dolorido, para priorizar profundidade de conteúdo.

### Desenho
- **Tipo:** questionário estruturado, autoaplicado, anônimo.
- **Aplicação:** presencial em sala, com autorização do professor, e link espelho para quem não estava presente. Aplicação presencial é o que garante volume; link solto em grupo costuma render menos de 20 respostas.
- **Ferramenta:** Google Forms ou equivalente, com exportação para planilha.
- **Duração alvo:** 4 a 6 minutos. Acima disso a taxa de abandono sobe muito.
- **Meta de respostas:** 80 respostas válidas, distribuídas em pelo menos 3 instituições diferentes.

### Sobre a representatividade, dito com honestidade
Esta é uma **amostra por conveniência**, não uma amostra probabilística. O grupo não tem lista de matriculados nem sorteio aleatório, então o resultado descreve quem respondeu, e não a população universitária de Marília. Isso não invalida a pesquisa: invalida a generalização. Na apresentação e na página de metodologia, o texto correto é "entre as N pessoas que responderam", nunca "os estudantes de Marília gastam".

Para reduzir o viés dentro do possível:
- Aplicar em turmas de cursos e períodos diferentes, não só na sala do grupo.
- Aplicar em pelo menos duas instituições além da Fatec.
- Registrar quantas pessoas estavam presentes em cada aplicação, para calcular taxa de resposta.

### Pré-teste
Antes de aplicar de verdade, rodar com 5 pessoas fora do grupo, cronometrar e anotar toda pergunta que gerou dúvida. Pergunta que precisa de explicação oral está mal escrita. Corrigir e só então aplicar.

## 3.3 LGPD, o que pode e o que não pode

O formulário coleta dados de pessoas reais e o projeto é acadêmico. As regras práticas, alinhadas ao que a Autoridade Nacional de Proteção de Dados orienta para pesquisa acadêmica:

**Base legal.** Para um trabalho de graduação aplicado por estudantes, a base segura é o **consentimento** do titular (art. 7º, I da LGPD), coletado de forma livre, informada e inequívoca no cabeçalho do formulário. A hipótese de "realização de estudos por órgão de pesquisa" (art. 7º, IV) existe, mas depende de a instituição figurar como órgão de pesquisa e é discussão que o grupo não precisa comprar.

**Anonimização.** A LGPD manda anonimizar sempre que possível (arts. 7º, 11, 13 e 16). Aqui é totalmente possível, então é obrigatório na prática do projeto: o formulário **não pede nome, e-mail, telefone, RA, CPF nem endereço exato**. Bairro é o nível máximo de granularidade geográfica.

**Minimização.** Só se pergunta o que vai ser usado. Se uma pergunta não alimenta a calculadora, o conteúdo ou a priorização, ela sai do formulário. Idade exata, por exemplo, não é usada em lugar nenhum, então não se pergunta.

**Transparência.** O cabeçalho diz quem coleta, para quê, o que será publicado (apenas resultados agregados) e como a pessoa pode desistir (fechar o formulário, já que não há identificação para pedir exclusão depois).

**Dados sensíveis.** Não coletar nada de saúde, religião, orientação sexual, filiação política, origem racial ou étnica. Nenhum desses dados tem uso no produto.

**Guarda.** A planilha bruta fica em drive restrito ao grupo, fora do repositório público. **Nunca commitar a planilha de respostas.** O repositório recebe apenas a tabulação agregada.

**Campo próprio.** Fotografar fachada, cardápio e placa de preço é registro de estabelecimento, não de pessoa. Não fotografar pessoas identificáveis, e não publicar interior de residência sem autorização escrita de quem mora ou administra.

### Cabeçalho de consentimento, texto pronto

> **Pesquisa sobre vida universitária em Marília**
>
> Somos estudantes do curso de Desenvolvimento de Software Multiplataforma da Fatec Marília. Estamos construindo um guia gratuito sobre moradia, alimentação e lazer para universitários da cidade, como trabalho de faculdade.
>
> Este questionário é **anônimo**: não pedimos nome, e-mail, telefone, RA ou endereço. Leva cerca de 5 minutos. As respostas serão usadas apenas de forma agregada (médias e percentuais) no guia e na apresentação do trabalho. Nenhuma resposta individual será publicada.
>
> Você pode deixar qualquer pergunta em branco ou fechar o formulário a qualquer momento.
>
> Ao continuar, você concorda com o uso das suas respostas nas condições acima.
>
> Dúvidas: <e-mail de contato do grupo>

## 3.4 Questionário completo

Blocos, com a justificativa de cada um. A justificativa não vai no formulário, é para o grupo e para a documentação de Engenharia de Software.

### Bloco A, perfil (para cruzar as demais respostas)

**A1.** Em qual instituição você estuda?
`( ) UNESP  ( ) Famema  ( ) Unimar  ( ) Univem  ( ) Fatec Marília  ( ) Outra: ____`

**A2.** Em que período você estuda?
`( ) Manhã  ( ) Tarde  ( ) Noite  ( ) Integral`

**A3.** Em que semestre ou ano você está?
`( ) 1º  ( ) 2º  ( ) 3º  ( ) 4º  ( ) 5º ou mais`

**A4.** Você é de Marília ou veio de outra cidade?
`( ) Sempre morei em Marília  ( ) Vim de outra cidade para estudar  ( ) Moro em cidade vizinha e venho todo dia`

**A5.** Com quem você mora hoje?
`( ) Família  ( ) República ou casa compartilhada  ( ) Sozinho  ( ) Pensionato  ( ) Moradia estudantil  ( ) Outro: ____`

> Justificativa: A4 e A5 são as variáveis de corte mais importantes. Quase todo resultado da pesquisa muda entre quem mora com a família e quem se mudou para estudar, e a calculadora precisa dessa separação.

### Bloco B, moradia

**B1.** Se você paga por moradia, quanto custa por mês a sua parte, incluindo aluguel?
`( ) Não pago moradia  ( ) Até R$ 400  ( ) R$ 401 a 600  ( ) R$ 601 a 800  ( ) R$ 801 a 1.000  ( ) R$ 1.001 a 1.400  ( ) Acima de R$ 1.400`

**B2.** O que está incluso nesse valor? (marque quantas quiser)
`[ ] Água  [ ] Luz  [ ] Internet  [ ] Gás  [ ] Limpeza  [ ] Mobília  [ ] Nada, pago tudo à parte  [ ] Não sei`

**B3.** Em qual bairro você mora? `____` (texto curto, sem endereço)

**B4.** Quanto tempo você leva de casa até o campus, no meio que você mais usa?
`( ) Até 10 min  ( ) 11 a 20 min  ( ) 21 a 35 min  ( ) 36 a 60 min  ( ) Mais de 1 h`

**B5.** Como você encontrou a sua moradia atual?
`( ) Indicação de amigo ou veterano  ( ) Grupo de WhatsApp ou Telegram  ( ) Facebook Marketplace ou grupo do Facebook  ( ) Imobiliária  ( ) Placa na rua  ( ) Site de anúncios  ( ) Não procurei, já morava aqui  ( ) Outro: ____`

**B6.** Quão difícil foi encontrar moradia? `1 (muito fácil) a 5 (muito difícil)`

**B7.** O que mais faltou de informação nessa procura? `____` (texto aberto, opcional)

> Justificativa: B1 e B2 calibram a linha de moradia da calculadora, e B2 é o que justifica o filtro "contas inclusas". B5 e B6 são a evidência de que o problema existe, e viram gráfico na apresentação.

### Bloco C, alimentação

**C1.** Em um dia normal de aula, onde você almoça?
`( ) Em casa  ( ) Marmita levada de casa  ( ) Restaurante universitário  ( ) Self-service ou por quilo  ( ) Lanche  ( ) Não almoço  ( ) Outro: ____`

**C2.** Quanto você gasta com comida fora de casa por semana?
`( ) Nada  ( ) Até R$ 30  ( ) R$ 31 a 60  ( ) R$ 61 a 100  ( ) R$ 101 a 160  ( ) Acima de R$ 160`

**C3.** Quanto você gasta com mercado por mês, considerando só a sua parte?
`( ) Não faço mercado  ( ) Até R$ 150  ( ) R$ 151 a 300  ( ) R$ 301 a 450  ( ) R$ 451 a 600  ( ) Acima de R$ 600`

**C4.** Qual o preço médio que você paga em uma refeição fora?
`( ) Até R$ 15  ( ) R$ 16 a 25  ( ) R$ 26 a 35  ( ) R$ 36 a 50  ( ) Acima de R$ 50`

**C5.** Indique um lugar barato de comer que você recomenda: `____` (texto curto, opcional)

> Justificativa: C2 e C3 alimentam a calculadora, C4 define as faixas de preço do filtro de "comer", e C5 gera a lista de campo, que é o dado mais valioso do formulário inteiro.

### Bloco D, transporte

**D1.** Como você vai para a faculdade na maioria dos dias?
`( ) A pé  ( ) Bicicleta  ( ) Ônibus urbano  ( ) Carro próprio  ( ) Moto  ( ) Carona  ( ) Aplicativo  ( ) Ônibus fretado ou intermunicipal`

**D2.** Quanto você gasta com transporte por mês?
`( ) Nada  ( ) Até R$ 60  ( ) R$ 61 a 120  ( ) R$ 121 a 200  ( ) R$ 201 a 350  ( ) Acima de R$ 350`

**D3.** Você tem cartão de estudante para tarifa reduzida?
`( ) Sim  ( ) Não  ( ) Não sabia que existia`

> Justificativa: D3 é uma pergunta de produto disfarçada de pergunta de pesquisa. Se muita gente responder "não sabia que existia", a página de transporte ganha destaque e a resposta vira conteúdo.

### Bloco E, cena e lazer

**E1.** Quanto você gasta com lazer por mês?
`( ) Até R$ 50  ( ) R$ 51 a 100  ( ) R$ 101 a 200  ( ) R$ 201 a 400  ( ) Acima de R$ 400`

**E2.** O que você mais faz para se divertir em Marília? (até 3)
`[ ] Bar  [ ] Festa ou balada  [ ] Cinema  [ ] Parque ou ar livre  [ ] Esporte  [ ] Evento cultural  [ ] Fico em casa  [ ] Saio da cidade  [ ] Outro: ____`

**E3.** Você sente que conhece as opções de lazer da cidade? `1 (nada) a 5 (conheço bem)`

**E4.** Indique um rolê que você recomenda para calouro: `____` (texto curto, opcional)

### Bloco F, o problema e o produto

**F1.** Quando você chegou, onde buscou informação sobre a cidade? (marque quantas quiser)
`[ ] Amigos e veteranos  [ ] Grupo de WhatsApp  [ ] Instagram  [ ] Google  [ ] Site da instituição  [ ] Família  [ ] Não busquei  [ ] Outro: ____`

**F2.** Quão difícil foi se organizar nas primeiras semanas? `1 (fácil) a 5 (muito difícil)`

**F3.** Se existisse um site que reunisse moradia, comida barata e rolês de Marília, o quanto isso teria te ajudado? `1 (nada) a 5 (muito)`

**F4.** Qual desses seria o mais útil para você?
`( ) Lista de repúblicas com preço  ( ) Comparador de moradia  ( ) Calculadora de custo de vida  ( ) Mapa de comida barata  ( ) Guia de rolês  ( ) Informação de transporte`

**F5.** O que mais te fez falta quando você chegou? `____` (texto aberto, opcional)

> Justificativa: F4 é a pergunta que decide prioridade de desenvolvimento na fase 4. Se a calculadora ganhar, ela vira a home. Se o comparador ganhar, ele ganha destaque. **Esta pergunta precisa ser tabulada antes do congelamento do escopo.**

## 3.5 Tabulação

Estrutura da planilha de análise, uma aba por finalidade:

| Aba | Conteúdo |
| --- | --- |
| `bruto` | Exportação crua do formulário, sem edição |
| `limpo` | Respostas válidas, com faixas normalizadas e texto livre padronizado |
| `cortes` | Cruzamentos: gasto por tipo de moradia, gasto por origem (A4), dificuldade por semestre |
| `indicacoes` | Todos os textos livres de C5 e E4, deduplicados, virando fila de verificação em campo |
| `agregado` | Números finais que entram no site e na apresentação, prontos para copiar |

Critérios de resposta válida: consentimento marcado, bloco A completo e pelo menos um bloco de B a E respondido.

Estatística: usar **mediana e faixa interquartil**, não média. Renda e gasto de estudante têm distribuição assimétrica, e uma pessoa que paga R$ 2.000 de aluguel desloca a média inteira. Com faixas em vez de valores exatos, o cálculo usa o ponto médio de cada faixa, e isso precisa estar escrito na metodologia.

## 3.6 Roteiro de campo

Ficha padrão a preencher em cada visita, no celular, na hora:

```
Nome do lugar:
Tipo: (moradia | comer | cena)
Endereço (rua e número, para cálculo de distância; não vai publicado em moradia):
Bairro:
Preço observado (o que está afixado ou informado):
O que inclui:
Horário e dias:
Contato público (telefone comercial ou perfil, apenas se for estabelecimento):
Foto: (fachada, cardápio ou placa de preço)
Observações:
Coletado por:
Data:
```

Regras de campo:
- Andar em dupla, e avisar no grupo o roteiro do dia.
- Preço só entra se estiver afixado ou se for informado por quem trabalha no lugar. Preço estimado a olho não entra.
- Em moradia, **não publicar endereço exato nem nome do proprietário**. Publica-se bairro, faixa de preço e forma de contato pública quando houver anúncio público.
- Foto tirada pelo grupo, sem pessoas identificáveis. Sem foto tirada da internet.
- Toda ficha vira uma linha na planilha no mesmo dia. Ficha que dorme no bloco de notas some.

## 3.7 Verificação e frescor

- Todo registro carrega `verificado_em` (data ISO) e `fonte`.
- Registro com mais de 60 dias sem verificação aparece com aviso visual no site ("verificado em maio, confirme antes de ir").
- Mutirão de reverificação na semana anterior à entrega, dividido por bairro entre os quatro integrantes.
- Registro que não puder ser reverificado sai do ar em vez de ficar desatualizado no ar.

## 3.8 Teste com usuário, ao final

Cinco calouros que não participaram do projeto, 15 minutos cada, tarefa cronometrada:

1. "Descubra quanto custaria, por mês, morar em república e comer fora todo dia." (mede a calculadora)
2. "Ache duas opções de moradia de até R$ 700 a menos de 20 minutos do seu campus e compare as duas." (mede filtro e comparador)
3. "Descubra onde almoçar barato perto do campus numa quarta à noite." (mede o filtro de comer com horário)

Registrar: tempo por tarefa, onde a pessoa hesitou, o que ela falou em voz alta, e se concluiu sem ajuda. Três pessoas travando no mesmo ponto é um defeito de interface, não um problema do usuário.
