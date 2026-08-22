# BCSInfos FOUND

Coloque na raiz do repositório:
- index.html (substitui o atual)
- found.html
- found.css
- found.js

O FOUND adiciona a opção na navbar, recebe uma #tag, procura o nome mais recente disponível em `api/rosters_auto.json` e salva todas as pesquisas no `localStorage`.

A lista continua após atualizar ou fechar a página. Cada cartão pode ser removido individualmente.

IMPORTANTE: o nick é tão atual quanto o último `nome_atual` publicado em `api/rosters_auto.json`. Para refletir mudanças de nick imediatamente, o processo que gera esse JSON precisa ser executado/atualizado novamente.
