# dados/

Dados reais do kampi, coletados e conferidos em **14/11/2026**. O site lê estes arquivos pelo `dados.js` (na raiz).

| Arquivo | O que tem | Onde aparece |
| --- | --- | --- |
| `banner.json` | 3 eventos com data e 1 promoção de comida | Banner da home |
| `cena.json` | 8 lugares e rolês | Qualquer `<ul data-dados="cena">` |
| `comer.json` | 2 lugares para comer (RU da Unesp e Estação Sabor) | Qualquer `<ul data-dados="comer">` |
| `custos.json` | 8 valores de referência | Calculadora (via `kampiDados.custos()`) |
| `imagens.json` | 8 fotos com licença aberta, autor e licença | Fotos do banner e dos cards |

## Como as páginas estão ligadas

Home e comer bem já estão ligadas. A página cena & rolê fica com outro integrante: para ligá-la, basta carregar no `<head>`:

```html
<link rel="stylesheet" href="../dados.css">
<script src="../dados.js" defer></script>
```

e a lista de cards tem o atributo com o nome do JSON:

```html
<ul class="results__grid" data-dados="cena">
```

O `dados.js` então:

- troca os cards de exemplo pelos do JSON (só os com `"ativo": true`);
- coloca o item com `"destaque": true` no `<article class="feature">` da seção, com burst e selo de preço (sem foto: o selo cobriria). Sem nenhum destaque, o card grande some;
- atualiza o contador do leitor de tela, o número do hero (`.stat__value`) e troca a etiqueta "dados de exemplo" por "verificado em ...".

Destaques atuais: `com-ru-unesp` (comer bem) e `cen-cao-perere` (cena & rolê). Preço pode ter centavos (`18.9` vira R$ 18,90).

Sem servidor local (abrindo o `.html` direto do disco), o navegador bloqueia a leitura do JSON e a página continua com o HTML de exemplo. Use o Live Server do VS Code.

## Instagram

Itens com `instagram_post` mostram o botão **ver post no Instagram**. O post só carrega quando alguém clica, então não pesa no carregamento e não puxa script de fora sem necessidade. Precisa de internet na hora. Itens com só `instagram` mostram um link para o perfil.

## Imagens

### Com licença aberta (vão para o repositório)
Ficam em `assets/img/<id>.webp`. Exigem crédito visível ao autor e à licença (CC BY e CC BY-SA). O `dados.js` junta autor e licença de cada foto que aparece na página numa linha só no rodapé ("fotos: ..."), no estilo de "feito em Marília".

Como no Figma, a foto aparece **dentro do burst** (slides do banner), só no desktop. Card de destaque não tem foto. Nos slides, a data do `selo` vira uma pill ao lado do rótulo. Como as fotos são da cidade e não do lugar, entram com `alt=""` (decorativas). As originais em `assets/img/originais/` ficam fora do Git.

### De terceiros, só para a apresentação (NÃO vão para o repositório)
A pasta `assets/img-local/` está no `.gitignore`. Se um arquivo com o nome abaixo existir, o card mostra a foto. Se não existir, o card aparece sem foto. Formato `.webp`, largura de 1200 px é suficiente.

| Card | Arquivo esperado | Onde pegar |
| --- | --- | --- |
| Cão Pererê | `assets/img-local/cen-cao-perere.webp` | instagram.com/caoperere |
| Insty | `assets/img-local/cen-insty.webp` | instagram.com/o.institut.o |
| Xeque Mate Retrô Bar | `assets/img-local/cen-xeque-mate.webp` | instagram.com/xeque_mate_retro_bar |
| Vixe | `assets/img-local/cen-vixe.webp` | instagram.com/vixebar.marilia |
| Doctor Beer | `assets/img-local/cen-doctor-beer.webp` | instagram.com/doctorbeermarilia |
| Sesc Marília | `assets/img-local/cen-sesc.webp` | sescsp.org.br/unidades/marilia |
| Teatro Municipal | `assets/img-local/cen-teatro-municipal.webp` | site da prefeitura |
| Aulas de esporte | `assets/img-local/cen-esportes.webp` | site da prefeitura |
| Estação Sabor Premium | `assets/img-local/com-estacao-sabor.webp` | instagram.com/marilia.on |

Antes de publicar o projeto, peça autorização a cada lugar ou apague a pasta.

## Campos

Segue o `docs/04-modelo-de-dados.md`, com quatro acréscimos: `preco_texto` (o preço do jeito que o lugar anuncia), `instagram`, `instagram_post` e `imagem_local`. Valores em reais são inteiros. Quando a unidade termina em `_centavos`, o valor está em centavos (ex.: 287 = R$ 2,87).

## Conferir de novo antes da entrega

- Tarifa do ônibus: https://www.amtumarilia.com.br/tarifas
- Preços dos eventos (lotes mudam): links em `fonte.url` de cada item
- Próxima data da Insty: perfil do coletivo
- Endereço do Xeque Mate: veio de guia comercial
