# 07. Acessibilidade

Meta declarada: **WCAG 2.2, nível AA**, verificada por ferramenta automática **e** por teste manual. A meta de 100 no Lighthouse é útil como piso, e não é a prova. Ferramentas automáticas detectam apenas parte dos problemas reais (as estimativas mais citadas na área ficam na faixa de 30% a 40% dos critérios), porque nenhuma delas julga se o texto alternativo descreve a imagem, se a ordem de tabulação faz sentido ou se o rótulo explica o campo. O restante é teste humano.

## 7.1 Critérios aplicáveis, nível A e AA

Recorte dos critérios que este projeto realmente pode violar. Cada linha é verificável.

### Perceptível
| Critério | O que fazer aqui |
| --- | --- |
| 1.1.1 Conteúdo não textual | Toda imagem de conteúdo com `alt` descritivo. Imagem decorativa com `alt=""`. Ícone sozinho em botão precisa de nome acessível |
| 1.3.1 Informação e relações | HTML semântico: `header`, `nav`, `main`, `section`, `footer`, hierarquia de títulos sem pular nível, tabela de comparação com `th` e `scope` |
| 1.3.2 Sequência com significado | Ordem no DOM igual à ordem visual. Nada de reordenar coluna só com `order` do flex |
| 1.3.5 Identificar propósito da entrada | `autocomplete` nos campos que pedem dado pessoal comum |
| 1.4.1 Uso de cor | "Mais barato", "verificado", "indisponível": sempre com texto ou ícone, nunca só cor |
| 1.4.3 Contraste mínimo | 4,5:1 texto normal, 3:1 texto grande. Verificar nos dois temas |
| 1.4.4 Redimensionar texto | Zoom de 200% sem perda de conteúdo ou função. Testar de verdade |
| 1.4.10 Refluxo | 320 px de largura sem rolagem horizontal |
| 1.4.11 Contraste de não texto | Borda de campo, indicador de foco e ícone informativo com 3:1 |
| 1.4.12 Espaçamento de texto | Layout aguenta espaçamento aumentado sem cortar texto. Evitar altura fixa em cartão |
| 1.4.13 Conteúdo em foco ou hover | Tooltip e popover dispensáveis, persistentes e não obstrutivos. Se der trabalho, não usar tooltip |

### Operável
| Critério | O que fazer aqui |
| --- | --- |
| 2.1.1 Teclado | Filtro, busca, comparador e calculadora inteiramente operáveis por teclado |
| 2.1.2 Sem armadilha de teclado | Nenhum componente prende o foco. Se houver modal, ele fecha com `Esc` e devolve o foco |
| 2.4.1 Ignorar blocos | Link "pular para o conteúdo" como primeiro elemento focável |
| 2.4.2 Página com título | `<title>` único e descritivo por página |
| 2.4.3 Ordem do foco | Tabulação segue a leitura. Verificar depois de cada mudança de layout |
| 2.4.4 Finalidade do link | Nada de "clique aqui" ou "saiba mais" sem contexto |
| 2.4.6 Cabeçalhos e rótulos | Títulos que descrevem a seção, rótulos que descrevem o campo |
| 2.4.7 Foco visível | Indicador de foco próprio, nunca `outline: none` sem substituto |
| **2.4.11 Foco não obscurecido (mínimo)** | **Novo na 2.2.** Cabeçalho fixo não pode cobrir o elemento focado. Usar `scroll-margin-top` |
| **2.5.7 Movimentos de arrastar** | **Novo na 2.2.** Se houver controle deslizante de preço, oferecer também campo numérico |
| **2.5.8 Tamanho do alvo (mínimo)** | **Novo na 2.2.** Alvo de toque com pelo menos 24 por 24 px CSS, ou espaçamento equivalente. Atinge checkbox de comparar, chip de etiqueta e botão de limpar |
| 2.5.3 Rótulo no nome | O nome acessível contém o texto visível do botão |

### Compreensível
| Critério | O que fazer aqui |
| --- | --- |
| 3.1.1 Idioma da página | `<html lang="pt-BR">` |
| 3.2.1 e 3.2.2 Em foco, em entrada | Nada muda de contexto sozinho. Filtro atualiza a lista sem mover o foco do usuário |
| 3.2.3 e 3.2.4 Navegação e identificação consistentes | Mesmo menu, mesma ordem, mesmos nomes em todas as páginas |
| **3.2.6 Ajuda consistente** | **Novo na 2.2.** Se houver link de contato ou ajuda, ele fica na mesma posição em todas as páginas |
| 3.3.1 Identificação de erro | Erro da calculadora descrito em texto, próximo do campo |
| 3.3.2 Rótulos ou instruções | Todo campo com `<label>` associado. `placeholder` não é rótulo |
| 3.3.3 Sugestão de erro | Dizer o que corrigir, não só que está errado |
| **3.3.7 Entrada redundante** | **Novo na 2.2.** Não pedir duas vezes o mesmo dado na calculadora |

### Robusto
| Critério | O que fazer aqui |
| --- | --- |
| 4.1.2 Nome, função, valor | Controle customizado com `role`, estado e nome corretos. Preferir sempre elemento nativo |
| 4.1.3 Mensagens de status | Contagem de resultados e total da calculadora em `aria-live="polite"` |

Critérios que não se aplicam neste escopo: mídia com áudio ou vídeo (1.2.x), autenticação (3.3.8, já que não há login), sessão com limite de tempo (2.2.1).

## 7.2 Padrões de implementação

### Link de pular
```html
<a class="pular" href="#conteudo">Pular para o conteúdo</a>
...
<main id="conteudo" tabindex="-1">
```
```css
.pular {
  position: absolute;
  left: -9999px;
}
.pular:focus {
  left: var(--esp-4);
  top: var(--esp-4);
  z-index: 100;
  /* visível, com fundo sólido e contraste adequado */
}
```

### Foco visível
```css
:focus-visible {
  outline: 3px solid var(--cor-foco);
  outline-offset: 2px;
  border-radius: var(--raio-sm);
}
/* nunca remover sem substituto */
```

### Cabeçalho fixo e critério 2.4.11
```css
:target, [tabindex="-1"]:focus, .cartao:focus-within {
  scroll-margin-top: 5rem;  /* altura do cabeçalho fixo + folga */
}
```

### Anúncio de resultados
```html
<p class="filtro__contagem" role="status" aria-live="polite">
  38 opções encontradas
</p>
```
A região precisa existir no HTML desde o carregamento. Criar o elemento e preencher no mesmo instante não é anunciado por boa parte dos leitores de tela.

### Grupo de filtros
```html
<fieldset>
  <legend>Bairro</legend>
  <label><input type="checkbox" name="bairro" value="palmital"> Palmital</label>
  <label><input type="checkbox" name="bairro" value="centro"> Centro</label>
</fieldset>
```
`fieldset` com `legend` é o que dá contexto ao leitor de tela. Um `<div>` com um `<h3>` acima não cumpre a mesma função.

### Alvo de toque, critério 2.5.8
```css
.etiqueta, .cartao__check + span, .botao--icone {
  min-inline-size: 24px;
  min-block-size: 24px;
  /* alvo confortável de verdade fica em 44px, meta AAA e boa prática mobile */
}
```

## 7.3 Rotina de teste

### Automático, a cada entrega de fase
1. Lighthouse, aba Acessibilidade, em modo anônimo, com todas as páginas principais. Salvar o relatório em `docs/relatorios/`.
2. axe DevTools (extensão de navegador) na home, em uma listagem com filtro aplicado e na calculadora.
3. Validador de HTML do W3C, zero erro. Erro de HTML costuma ser causa raiz de problema de leitor de tela.

### Manual, obrigatório antes da entrega final
| Teste | Como fazer | Critério de aprovação |
| --- | --- | --- |
| Teclado | Guardar o mouse. Tab, Shift+Tab, Enter, Espaço, setas | Todo recurso alcançável, foco sempre visível, sem armadilha |
| Leitor de tela | NVDA no Windows (gratuito) ou VoiceOver no macOS. Navegar por títulos, por regiões e por formulário | Cada elemento anuncia nome e função corretos, contagem de resultados é anunciada |
| Zoom | 200% e 400% no navegador | Sem perda de conteúdo, sem rolagem horizontal |
| 320 px | DevTools, largura 320 | Sem rolagem horizontal, alvos ainda tocáveis |
| Sem cor | Filtro de escala de cinza no DevTools | Toda informação continua compreensível |
| Sem JavaScript | Desativar JS | Conteúdo principal continua legível, nada invisível |
| Movimento reduzido | Ativar "reduzir movimento" no sistema | Nenhuma animação de revelação executa |
| Contraste | Amostrar os pares reais da tela em um verificador | 4,5:1 e 3:1 conforme o caso, nos dois temas |

Registrar os resultados em uma tabela dentro de `docs/relatorios/`, com data e responsável. Essa tabela é o que sustenta a afirmação "o site é acessível" na apresentação. Sem ela, é só uma frase.

## 7.4 Declaração de acessibilidade

A página `acessibilidade.html` declara, em linguagem simples:
- o nível almejado (WCAG 2.2 AA) e a data da última verificação;
- quais tecnologias assistivas foram testadas e em qual navegador;
- as limitações conhecidas e ainda não resolvidas, sem maquiagem;
- como reportar um problema (e-mail do grupo).

Declarar limitação conhecida é sinal de maturidade e não de fraqueza. Um site que afirma conformidade total sem teste é o que a banca desmonta em trinta segundos.

## 7.5 Erros que este projeto tem chance real de cometer

- Remover `outline` no reset do CSS e esquecer de repor.
- Usar `<div>` clicável em vez de `<button>` no cartão e no filtro.
- Trocar toda a lista sem anunciar nada, deixando quem usa leitor de tela sem saber que algo mudou.
- Colocar `placeholder` no lugar do `<label>` na calculadora.
- Etiquetas com contraste baixo, que é o preço quase inevitável de uma paleta escolhida só pelo visual.
- Cabeçalho fixo cobrindo o elemento que acabou de receber foco (critério novo 2.4.11, e o mais fácil de violar sem perceber).
- Checkbox de comparar pequeno demais no mobile (critério novo 2.5.8).
