import ast
import json
import os
from collections import Counter, defaultdict
from datetime import datetime

import pandas as pd

ARQUIVO_BRUTO = "historico_bruto.csv"
ARQUIVO_GERADOR = "gerador.py"
ARQUIVO_ROSTERS = "rosters.json"
TAMANHO_ROSTER = 3


def carregar_mapeamento_players():
    """Lê somente MAPEAMENTO_PLAYERS de gerador.py, sem executar o arquivo."""
    with open(ARQUIVO_GERADOR, "r", encoding="utf-8") as f:
        arvore = ast.parse(f.read(), filename=ARQUIVO_GERADOR)

    for no in arvore.body:
        if isinstance(no, ast.Assign):
            for alvo in no.targets:
                if isinstance(alvo, ast.Name) and alvo.id == "MAPEAMENTO_PLAYERS":
                    return ast.literal_eval(no.value)

    raise RuntimeError("MAPEAMENTO_PLAYERS não foi encontrado em gerador.py")


def normalizar_mes(data):
    if pd.isna(data):
        return None
    try:
        texto = str(data).strip()
        dt = datetime.strptime(texto, "%d/%m/%Y %H:%M:%S")
        return dt.year, f"{dt.month:02d}"
    except ValueError:
        return None


def carregar_rosters_existentes():
    if not os.path.exists(ARQUIVO_ROSTERS):
        return {}
    try:
        with open(ARQUIVO_ROSTERS, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        print("Aviso: rosters.json inválido. Será recriado.")
        return {}


def coletar_partidas(df):
    """Converte o CSV em partidas únicas, mantendo os jogadores de cada lado."""
    partidas = {}

    colunas_obrigatorias = {
        "id_partida", "data_adicao", "player_tag", "player_name", "id_time", "nome_time", "regiao"
    }
    faltando = colunas_obrigatorias - set(df.columns)
    if faltando:
        raise RuntimeError(f"Colunas ausentes no CSV: {', '.join(sorted(faltando))}")

    for partida_id, grupo in df.groupby("id_partida", sort=False):
        if pd.isna(partida_id):
            continue

        grupo = grupo.drop_duplicates(subset=["id_time", "player_tag"])
        if grupo.empty:
            continue

        data_ref = grupo.iloc[0]["data_adicao"]
        ym = normalizar_mes(data_ref)
        if not ym:
            continue

        for id_time, lado in grupo.groupby("id_time", sort=False):
            if not id_time or str(id_time) in {"nan", "OPONENTE_T0", "OPONENTE_T1", "DESCONHECIDO"}:
                continue

            jogadores = []
            for _, linha in lado.iterrows():
                tag = str(linha.get("player_tag", "")).strip()
                if not tag or tag.lower() == "nan":
                    continue
                jogadores.append({
                    "tag": tag,
                    "nick": str(linha.get("player_name", "Player")),
                })

            if len(jogadores) != 3:
                continue

            chave = (ym[0], ym[1], str(id_time))
            partidas.setdefault(chave, []).append(jogadores)

    return partidas


def localizar_metadados_roster(rosters_existentes, ano, mes, regiao, id_time):
    """Mantém tier/nome/IGL existentes quando possível."""
    bloco = rosters_existentes.get(str(ano), {}).get(str(mes), {}).get(regiao, {})
    for tier, times in bloco.items():
        if not isinstance(times, list):
            continue
        for time in times:
            if str(time.get("id_time")) == str(id_time):
                return tier, time

    # Procura o mesmo time em qualquer mês/região para preservar o nome.
    for ano_data in rosters_existentes.values():
        if not isinstance(ano_data, dict):
            continue
        for mes_data in ano_data.values():
            if not isinstance(mes_data, dict):
                continue
            for times in mes_data.values():
                if not isinstance(times, dict):
                    continue
                for tier, lista in times.items():
                    if not isinstance(lista, list):
                        continue
                    for time in lista:
                        if str(time.get("id_time")) == str(id_time):
                            return tier, time

    return "TIER ?", None


def montar_rosters(mapeamento, partidas, rosters_existentes):
    saida = {}
    estatisticas = []

    # Times existentes no gerador.py. Um time pode ter mais de um jogador mapeado.
    times = defaultdict(list)
    for tag, info in mapeamento.items():
        id_time = str(info.get("id_time", "")).strip()
        if not id_time:
            continue
        times[id_time].append((tag, info))

    # Organiza por mês para que o contador seja naturalmente zerado a cada período.
    for (ano, mes, id_time), jogos in sorted(partidas.items()):
        candidatos = Counter()
        aparicoes = Counter()
        nicks = {}
        regioes = Counter()

        for jogo in jogos:
            tags_jogo = {p["tag"] for p in jogo}
            for p in jogo:
                aparicoes[p["tag"]] += 1
                nicks[p["tag"]] = p["nick"]

            # Cada jogador da equipe conta como parceiro dos outros jogadores daquela equipe.
            for p in jogo:
                for outro in jogo:
                    if outro["tag"] != p["tag"]:
                        candidatos[outro["tag"]] += 1

        # O jogador-âncora é o jogador do gerador.py com mais aparições no mês.
        tags_mapeadas = {tag for tag, _ in times.get(id_time, [])}
        anchors = [tag for tag in tags_mapeadas if aparicoes[tag] > 0]
        if not anchors:
            continue

        anchor = sorted(anchors, key=lambda tag: (-aparicoes[tag], tag))[0]

        # Para atender à regra "os 2 que mais jogam com ele", contamos apenas
        # parceiros que apareceram nas mesmas partidas do jogador-âncora.
        parceiros_anchor = Counter()
        for jogo in jogos:
            tags = {p["tag"] for p in jogo}
            if anchor in tags:
                for p in jogo:
                    if p["tag"] != anchor:
                        parceiros_anchor[p["tag"]] += 1
                        nicks[p["tag"]] = p["nick"]

        dois_parceiros = [tag for tag, _ in sorted(parceiros_anchor.items(), key=lambda x: (-x[1], x[0]))[:2]]
        tags_roster = [anchor] + dois_parceiros

        # Se houver menos de 2 parceiros, completa pelos mais frequentes do time.
        if len(tags_roster) < TAMANHO_ROSTER:
            for tag, _ in sorted(candidatos.items(), key=lambda x: (-x[1], x[0])):
                if tag not in tags_roster:
                    tags_roster.append(tag)
                if len(tags_roster) == TAMANHO_ROSTER:
                    break

        # Nunca publica roster incompleto.
        if len(tags_roster) < TAMANHO_ROSTER:
            continue

        regiao = None
        for tag, info in times.get(id_time, []):
            if tag == anchor:
                regiao = info.get("regiao", "SA")
                break
        if not regiao:
            regiao = "SA"

        tier, antigo = localizar_metadados_roster(rosters_existentes, ano, mes, regiao, id_time)
        nome_time = (
            antigo.get("nome_time") if antigo else None
        ) or next((info.get("nome_time") for tag, info in times[id_time] if info.get("nome_time")), id_time)

        jogadores = [
            {"nick": nicks.get(tag, next((info.get("nome", "Player") for t, info in times[id_time] if t == tag), "Player")), "tag": tag}
            for tag in tags_roster
        ]

        entrada = {
            "id_time": id_time,
            "nome_time": nome_time,
            "jogadores": jogadores,
            "qtd_jogadores": len(jogadores),
            "igl": anchor,
            "automatico": True,
            "criterio": "âncora + 2 jogadores com maior número de partidas junto no mês",
            "contagem_mes": {tag: parceiros_anchor.get(tag, 0) for tag in tags_roster if tag != anchor},
        }

        saida.setdefault(str(ano), {}).setdefault(str(mes), {}).setdefault(regiao, {}).setdefault(tier, []).append(entrada)
        estatisticas.append((str(ano), str(mes), regiao, id_time, nome_time, anchor, parceiros_anchor))

    # PADRAO = último mês disponível. Isso mantém o comportamento do app quando
    # o filtro estiver em "todos" ou quando não houver mês específico selecionado.
    meses = []
    for ano_key, ano_data in saida.items():
        if str(ano_key).isdigit() and isinstance(ano_data, dict):
            for mes_key in ano_data.keys():
                if str(mes_key).isdigit():
                    meses.append((int(ano_key), int(mes_key)))
    if meses:
        ultimo_ano, ultimo_mes = max(meses)
        saida["PADRAO"] = json.loads(json.dumps(saida[str(ultimo_ano)][f"{ultimo_mes:02d}"], ensure_ascii=False))
    else:
        saida["PADRAO"] = rosters_existentes.get("PADRAO", {})

    # Ordenação determinística.
    for ano_data in saida.values():
        if not isinstance(ano_data, dict):
            continue
        for mes_data in ano_data.values():
            if not isinstance(mes_data, dict):
                continue
            for regiao, tiers in mes_data.items():
                if not isinstance(tiers, dict):
                    continue
                for tier, lista in tiers.items():
                    if isinstance(lista, list):
                        lista.sort(key=lambda x: str(x.get("nome_time", "")))

    return saida, estatisticas


def main():
    if not os.path.exists(ARQUIVO_BRUTO):
        raise FileNotFoundError(f"Arquivo não encontrado: {ARQUIVO_BRUTO}")
    if not os.path.exists(ARQUIVO_GERADOR):
        raise FileNotFoundError(f"Arquivo não encontrado: {ARQUIVO_GERADOR}")

    print("Lendo MAPEAMENTO_PLAYERS de gerador.py...")
    mapeamento = carregar_mapeamento_players()

    print("Lendo historico_bruto.csv...")
    df = pd.read_csv(ARQUIVO_BRUTO, dtype=str)
    partidas = coletar_partidas(df)
    rosters_existentes = carregar_rosters_existentes()
    rosters, estatisticas = montar_rosters(mapeamento, partidas, rosters_existentes)

    with open(ARQUIVO_ROSTERS, "w", encoding="utf-8") as f:
        json.dump(rosters, f, ensure_ascii=False, indent=2)
        f.write("\n")

    print(f"Rosters salvos em {ARQUIVO_ROSTERS}")
    print(f"Meses/time calculados: {len(estatisticas)}")

    for ano, mes, regiao, id_time, nome, anchor, parceiros in estatisticas:
        top = sorted(parceiros.items(), key=lambda x: (-x[1], x[0]))[:2]
        texto = ", ".join(f"{tag} ({qtd})" for tag, qtd in top)
        print(f"  {ano}-{mes} | {regiao} | {id_time} | âncora {anchor} | parceiros: {texto}")


if __name__ == "__main__":
    main()
