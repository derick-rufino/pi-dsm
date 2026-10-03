# 11. Decisões em aberto

Registro de decisões, no formato leve de ADR (Architecture Decision Record). Toda decisão que muda o produto entra aqui, com data e justificativa. Decisão que só existe na cabeça de alguém não existe.

---

## Pendentes

### D01, Nome do projeto
**Situação:** aberto.
**Prazo:** fase 3, até a semana 5. Bloqueia a marca, o domínio e os textos.
**Critérios já definidos** (ver `06-design-system.md`, seção 6.3):
- Pronunciável em português, sem ambiguidade de grafia.
- Não pode se prender a um pilar só, porque os três pilares têm peso igual.
- Não pode depender de referência local que só veterano entende, já que o público prioritário é quem chegou agora.
- Disponibilidade de domínio e de perfil é desejável, não bloqueante.

**Como decidir:** cada integrante traz 3 nomes na reunião da semana 4, o grupo testa cada um contra os quatro critérios e vota. Empate resolve com a pergunta: qual deles um calouro entenderia sem explicação?

**Nome provisório para o código:** `guia-marilia`. Usar em nome de repositório e pasta, não em texto visível na interface.

---

### D02, Identidade visual
**Situação:** aberto, depende de D01.
**Prazo:** fase 3, semana 5.
**Escopo da decisão:** paleta (primitivos), duas famílias tipográficas, raio de borda dominante, nível de sombra.
**Restrições que já valem:** contraste 4,5:1 e 3:1 verificado, fonte hospedada localmente, no máximo duas famílias.
**Impacto se atrasar:** a fase 4 começa com tokens neutros (o que é aceitável), mas se a identidade mudar depois da semana 7, o retrabalho consome a semana de testes.

---

### D03, Os dois modos da calculadora
**Situação:** aberto.
**Prazo:** semana 4, antes de a calculadora entrar em construção.
**Opções:**
- **A, por profundidade.** Modo rápido com 4 entradas e modo detalhado com itens editáveis. Uma única função de cálculo, o modo detalhado apenas expõe os campos.
- **B, por situação.** Modo "vim de outra cidade" e modo "já moro em Marília". Duas listas de itens, dois textos, mais explicação na interface.

**Recomendação técnica:** opção A, por ter uma única fonte de lógica e uma única fonte de valores. A distinção da opção B pode ser atendida dentro da A com uma pergunta ("você já tem onde morar?") que zera a parcela de moradia.
**Quem decide:** grupo, com base na pergunta F4 do formulário.

---

### D04, Escopo mínimo publicável dos dados
**Situação:** aberto, depende do volume real da fase 1.
**Pergunta:** publicar 3 bairros bem cobertos ou a cidade inteira com cobertura rasa?
**Recomendação:** profundidade. Um guia que cobre bem os bairros próximos aos campi é mais útil e mais defensável do que um guia raso da cidade inteira, e a página de metodologia declara a cobertura com honestidade.
**Prazo:** semana 4.

---

### D05, Hospedagem
**Situação:** aberto, baixo impacto.
**Opções:** GitHub Pages (integrado ao repositório, exige atenção ao caminho base em subpasta), Netlify ou Vercel (deploy por push, domínio próprio mais simples).
**Prazo:** fase 6, mas testar na fase 4 para não descobrir problema de caminho na véspera.

---

### D06, Persistência local de favoritos
**Situação:** aberto, é RF14, prioridade "poderia".
**Decisão:** só entra se a fase 4 fechar na semana 8. Se entrar, `localStorage` sempre dentro de `try/catch`, porque em navegação privada o acesso pode lançar exceção, e sem nunca guardar dado pessoal.

---

## Decididas

### Tema do projeto
**Data:** setembro de 2026.
**Decisão:** Guia de Marília, escolhido por unanimidade entre três candidatas (Íris, Pulso e Guia de Marília).
**Justificativa:** dor real e verificável do público, dado coletável pelo próprio grupo dentro do prazo, escopo compatível com HTML, CSS e JavaScript puros, e caminho claro de crescimento para os semestres seguintes.

### Três pilares, com transporte como atributo
**Data:** setembro de 2026.
**Decisão:** moradia, comer e gastar pouco, cena e rolê. Transporte aparece como distância e tempo dentro dos três, e não como quarto pilar.
**Justificativa:** transporte isolado não é destino de navegação, é critério de decisão. Como atributo, ele aparece exatamente onde a pessoa está decidindo.

### Sem agenda de eventos com data
**Data:** setembro de 2026.
**Decisão:** apenas rolês recorrentes, sem calendário.
**Justificativa:** agenda exige atualização contínua e apodrece em semanas. Recorrência é dado estável e continua útil no semestre seguinte.

### Stack sem framework e sem back-end
**Data:** setembro de 2026, determinado pela disciplina.
**Decisão:** HTML, CSS e JavaScript puros, dados em JSON estático.
**Justificativa:** é o objetivo de aprendizagem do semestre, e a arquitetura foi desenhada para que o salto para banco e API no futuro seja carga de dados, não reescrita.

### Modelo ER completo mesmo sem banco
**Data:** setembro de 2026.
**Decisão:** modelar o domínio em ER normalizado, e tratar o JSON como projeção desse modelo.
**Justificativa:** entrega a disciplina de Modelagem de Banco de Dados e evita remodelagem no 2º semestre.

---

## Como registrar uma decisão nova

```markdown
### D<número>, <título curto>
**Data:** <quando foi decidido>
**Decisão:** <o que ficou valendo, em uma frase>
**Alternativas consideradas:** <o que foi descartado>
**Justificativa:** <por quê>
**Consequência:** <o que muda no código ou no processo>
```

Mover o item de "Pendentes" para "Decididas" no mesmo commit em que o código correspondente muda.
