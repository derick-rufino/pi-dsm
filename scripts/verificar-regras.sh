#!/usr/bin/env bash
# Verifica as regras do projeto. Roda local (bash scripts/verificar-regras.sh) e no CI.
# Só usa grep: nenhuma dependência.
falhou=0

# checar "descrição" "regex" arquivos...
checar() {
  local desc="$1" regex="$2"; shift 2
  local achou
  achou=$(grep -nE "$regex" "$@" 2>/dev/null)
  if [ -n "$achou" ]; then
    echo "::error::$desc"
    echo "$achou"
    falhou=1
  fi
}

shopt -s nullglob globstar

# Todo .js e .css do site, fora de pastas de ferramenta
fora_do_site='^(node_modules|pi-shadow-auditor|shadow-report|docs)/'
js=();  for f in **/*.js;  do [[ "$f" =~ $fora_do_site ]] || js+=("$f"); done
css=(); for f in **/*.css; do [[ "$f" =~ $fora_do_site ]] || css+=("$f"); done

# global.css guarda os tokens: é o único lugar onde cor literal é permitida
css_sem_tokens=()
for f in "${css[@]}"; do [[ "$f" == global.css ]] || css_sem_tokens+=("$f"); done

[ ${#js[@]} -gt 0 ] && \
  checar "Sem innerHTML: use textContent e <template>" 'innerHTML' "${js[@]}"

[ ${#css_sem_tokens[@]} -gt 0 ] && {
  checar "Cor literal fora de global.css" '#[0-9a-fA-F]{3,8}\b|rgba?\(|hsla?\(' "${css_sem_tokens[@]}"
  checar "Sem !important" '!important' "${css_sem_tokens[@]}"
}

[ $falhou -eq 0 ] && echo "Regras do projeto: tudo certo."
exit $falhou
