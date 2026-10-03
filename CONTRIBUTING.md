# Como colaborar

Projeto Integrador DSM, Fatec Marília. Quatro pessoas, uma `main` sempre publicável.

## Fluxo, do começo ao fim
1. Pegue uma issue (ou peça uma) e coloque seu nome nela.
2. Crie a branch a partir da `main` atualizada.
3. Faça commits pequenos.
4. Abra um Pull Request e preencha o modelo.
5. Espere o check `verificar` ficar verde e a aprovação do dono do repositório.
6. Merge por **squash** ou **merge commit**. A branch é apagada sozinha.

## Nome da branch
`tipo/palavras-com-hifen`, em minúsculas. Tipos sugeridos: `feat`, `fix`, `docs`, `dados`, `chore`.

```
feat/filtro-comida    fix/contraste-etiqueta    dados/cena-lote-1
```

Fora do padrão o CI só mostra um aviso, não bloqueia.

## Commits e título do PR
Português, imperativo, curto: `adiciona filtro por bairro`, `corrige contraste da etiqueta`.

## O que o CI bloqueia
Roda `scripts/verificar-regras.sh`. Rode antes de abrir o PR.

- `innerHTML` em JavaScript: use `textContent` e `<template>`.
- Cor literal fora de `assets/css/tokens.css`.
- `!important` no CSS.
- JSON inválido em `dados/`.

## Boas práticas (a revisão confere, o CI não)
- HTML, CSS e JavaScript puros, sem framework.
- Funciona com teclado e em 320 px, com estado vazio e de erro.
- Dado real tem fonte e data de verificação. No protótipo, dado de exemplo é marcado como exemplo.

## Nunca commitar
Respostas do formulário, contato pessoal de morador ou proprietário, endereço exato de moradia, fotos com pessoas identificáveis.

## Combinados do grupo
- A aprovação dos PRs é sempre do dono do repositório. Os outros sugerem e revisam por comentário.
- Ninguém commita direto na `main`. Só o dono do repositório pode furar a regra, e apenas em emergência.
- Bloqueado por mais de 48 horas? Avise no grupo no mesmo dia.
- Se a `main` quebrar, ela vira a prioridade de todo mundo.
