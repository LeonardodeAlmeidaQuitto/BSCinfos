# Roster automático mensal — BSCinfos

## Arquivos deste pacote

- `app.js` — versão atualizada para carregar `rosters.json` em vez de manter os rosters dentro do JavaScript.
- `gerar_rosters_automaticos.py` — gera os rosters automaticamente a partir de `gerador.py` + `historico_bruto.csv`.

## Como funciona

Para cada `id_time` encontrado no `MAPEAMENTO_PLAYERS` do `gerador.py`, o script separa as partidas por `ano/mês`.

Dentro de cada mês:

1. identifica o jogador do time com mais aparições como jogador-âncora;
2. procura os jogadores que mais aparecem nas mesmas partidas que essa âncora;
3. escolhe os 2 parceiros mais frequentes;
4. forma o roster com `âncora + 2 parceiros` (3 jogadores), mantendo compatibilidade com o sistema atual do BSCinfos;
5. reinicia a contagem naturalmente no mês seguinte, porque cada mês é calculado separadamente;
6. mantém o tier e o nome do time do `rosters.json` anterior quando encontrar o mesmo `id_time`.

## Executar

Na pasta raiz do repositório:

```bash
python gerar_rosters_automaticos.py
```

O resultado é salvo diretamente em:

```text
rosters.json
```

Depois basta fazer commit do `rosters.json` atualizado.

## Importante

O `app.js` atualizado já carrega `rosters.json` quando a página abre. Portanto, não é mais necessário editar manualmente um bloco gigante `ROSTERS_POR_DATA` dentro do `app.js`.

O arquivo `gerador.py` continua sendo a fonte dos `id_time`, nomes, tags e regiões.

### API_KEY

Não foi colocado nenhum token/API key novo neste pacote. Mantenha a chave da API fora do controle de versão quando possível, preferencialmente usando variável de ambiente/secret.
