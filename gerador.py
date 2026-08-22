import requests
import pandas as pd
import os
import json
from datetime import datetime, timedelta, timezone
import re

# =============================================================================
# CONFIGURAÇÃO GERAL
# =============================================================================
API_KEY = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImEzYWMwNWZhLWY0NWYtNDFmOC04ZDA5LTA4ZGNmN2U5ZGRiMyIsImlhdCI6MTc4NjI5ODQzOCwic3ViIjoiZGV2ZWxvcGVyLzc0NjFhNGJkLThhZDctNjg2Mi0wOGVkLTJiYmEzMzAxMWE3NiIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiNDUuNzkuMjE4Ljc5Il0sInR5cGUiOiJjbGllbnQifV19.fsBdZM3P7b6vavuXNvVZUF93eJKR4kQPrpAqhw5YgrMtrwDITQKmZIR7ZoZzclyO4zcY_Cj7RTdjTOCxkacTjg"

# Proxy da RoyaleAPI: tentado primeiro (contorna o IP fixo travado no token).
PROXY_URL = "https://bsproxy.royaleapi.dev/v1"
# API oficial da Supercell: usada como fallback automático se o proxy falhar.
API_OFICIAL_URL = "https://api.brawlstars.com/v1"

ARQUIVO_BRUTO = "historico_bruto.csv"
ARQUIVO_BANS = "bans_matcherino.csv"
ARQUIVO_ROSTERS = "rosters.js"
ARQUIVO_ROSTERS_SEED = "rosters_seed.json"

COLUNAS_PICKS = ["id_partida", "regiao", "id_players", "name_players", "pick", "win", "win_rate", "modo", "mapa", "data_adicao", "player_tag", "player_name", "id_time", "nome_time", "tipo"]
COLUNAS_BANS = ["id_partida", "regiao", "mapa", "modo", "id_time", "nome_time", "brawler_banido", "data_adicao", "tipo"]

# Mapeamento de Tags para identificação automática de Região, Time e Nick
#
# OBS: quando um time "Unknow" é registrado pelo site (aba TIMES -> Registrar Equipe Desconhecida),
# o app.js gera automaticamente um botão "COPIAR" com as linhas prontas no formato abaixo para você
# colar aqui dentro de MAPEAMENTO_PLAYERS. Isso é necessário porque o navegador não tem permissão
# para escrever em arquivos do servidor/repositório — então a sincronização desse arquivo .py
# (que roda separadamente, minerando dados via API) precisa desse passo manual de copiar/colar.
MAPEAMENTO_PLAYERS = {
# SA  
        "#PLLRJC2V": {"nome": "BH|Wesley", "id_time": "BH", "nome_time": "BH ESPORTS", "regiao": "SA"},
        "#JQ8LLLY": {"nome": "LOUD|FireCrow", "id_time": "LOUD", "nome_time": "LOUD", "regiao": "SA"},
        "#JVRCVJ9Q": {"nome": "OCX|Pekka", "id_time": "OCX", "nome_time": "OCX DIVISION", "regiao": "SA"},
        "#L9PQUV0YC": {"nome": "OS|BrabaoBs", "id_time": "OS", "nome_time": "OLIMPO SQUAD", "regiao": "SA"},
        "#2GV09VJJP": {"nome": "FireMirillo", "id_time": "AL", "nome_time": "ACRE LOVERS", "regiao": "SA"},
        "#PR9U2JL": {"nome": "SKC|Juan Carlos", "id_time": "SKC", "nome_time": "SKCALALAS SA", "regiao": "SA"},
        "#R2LR2QLG": {"nome": "RED|Mohtep", "id_time": "RED", "nome_time": "RED CANIDS", "regiao": "SA"},
        "#80VLPJCCC": {"nome": "CB|Tilo", "id_time": "CB", "nome_time": "CRECHE BRAWL", "regiao": "SA"},
        "#GJPVYUQG": {"nome": "QQQ|Deykonn", "id_time": "QQQ", "nome_time": "QUERO QUE QUE", "regiao": "SA"},
# NA
        "#LVRRYPV": {"nome": "KDS|Bobby", "id_time": "KDS", "nome_time": "KDS", "regiao": "NA"},
        "#82RCQCVG": {"nome": "TRB|Lxffy", "id_time": "TRB", "nome_time": "TRIBE GAMING", "regiao": "NA"},
        "#YUJ8PJ0LR": {"nome": "Snoiy", "id_time": "TE", "nome_time": "TEAM ELEKTROS", "regiao": "NA"},
        "#VPVLG2": {"nome": "Tyrant", "id_time": "HML", "nome_time": "F/A HOMELESS", "regiao": "NA"},
        "#GVLRUG9Q": {"nome": "PaiN", "id_time": "NOVA", "nome_time": "NOVA", "regiao": "NA"},
        "#QURVLPG": {"nome": "Ezlivi", "id_time": "VTC", "nome_time": "VATIC", "regiao": "NA"},
        "#R9CCLP8Q": {"nome": "Rafiki", "id_time": "LGCY", "nome_time": "LEGACY", "regiao": "NA"},
        "#28LUY98": {"nome": "OG", "id_time": "VIC", "nome_time": "VIC", "regiao": "NA"},
        "#8UL0U08V": {"nome": "Winq", "id_time": "UTP", "nome_time": "UTOPIA", "regiao": "NA"},
        "#JJ09PC0P": {"nome": "Vegeta", "id_time": "VICD", "nome_time": "VIC Day", "regiao": "NA"},
        "#R80QRP0G": {"nome": "Squeezy", "id_time": "PFZ", "nome_time": "PFZ", "regiao": "NA"},
# EMEA
        "#9PCV9L982": {"nome": "FUT|AngelBoy", "id_time": "FUT", "nome_time": "FUT ESPORTS", "regiao": "EMEA"},
        "#80PVPCC29": {"nome": "NAVI|Enraged", "id_time": "NAVI", "nome_time": "NAVI", "regiao": "EMEA"},
        "#YQUCCJ2": {"nome": "HMB|Symantec", "id_time": "HMB", "nome_time": "HMBLE", "regiao": "EMEA"},
        "#9LVUC2PY": {"nome": "SK|Ope", "id_time": "SK", "nome_time": "SK GAMING", "regiao": "EMEA"},
        "#PCPRPJV": {"nome": "TH|IKaoss", "id_time": "TH", "nome_time": "TEAM HERETICS", "regiao": "EMEA"},
        "#2Q892QVU": {"nome": "TTM|Maru", "id_time": "TTM", "nome_time": "REPLY TOTEM", "regiao": "EMEA"},
        "#9PQQ8GQQ": {"nome": "NOVO|Filippo", "id_time": "NOVO", "nome_time": "NOVO ESPORTS", "regiao": "EMEA"},
        "#PLV89CGP": {"nome": "BIG|Salty", "id_time": "BIG", "nome_time": "BIG", "regiao": "EMEA"},
        "#8RVLRVYYP": {"nome": "TLB|Yei Yei", "id_time": "TLB", "nome_time": "TALENTS LAB", "regiao": "EMEA"},
        "#82GG2RLQG": {"nome": "FUT|ZeyroX", "id_time": "FUTA", "nome_time": "FUT ACADEMY", "regiao": "EMEA"},
# EA
        "#9ULYPV8": {"nome": "CR|Tensai", "id_time": "CR", "nome_time": "CRAZY RACCOON", "regiao": "EA"},
        "#P0Y8JGL0U": {"nome": "ZETA|Battoman", "id_time": "ZETA", "nome_time": "ZETA DIVISION", "regiao": "EA"},
        "#J99YU9QY": {"nome": "SKC|Kuru", "id_time": "SKCEA", "nome_time": "SKC EA", "regiao": "EA"},
        "#2RQQ9PGC": {"nome": "IGM|Shigemyon", "id_time": "IGM", "nome_time": "IGNUM", "regiao": "EA"},
        "#LJ0288PRG": {"nome": "AXIS|Terry", "id_time": "AXIS", "nome_time": "AXIS", "regiao": "EA"},
        "#82CJYJPG2": {"nome": "RVL|Yutapin", "id_time": "RVL", "nome_time": "RIVAL", "regiao": "EA"},
        "#8J9GUJJVY": {"nome": "RC|Melty", "id_time": "RC", "nome_time": "REJECT", "regiao": "EA"},
        "#28PU0P9L0": {"nome": "FL|Achapi", "id_time": "FL", "nome_time": "FENNEL", "regiao": "EA"},
        "#28VP0G808": {"nome": "INS|Koga", "id_time": "INS", "nome_time": "INSOMNIA", "regiao": "EA"},
        "#89UUQLJCC": {"nome": "FZ|Toridesu", "id_time": "FZ", "nome_time": "FRENZY", "regiao": "EA"},

}

def obter_fuso_brasilia():
    return timezone(timedelta(hours=-3))

def formatar_data_brawl(battle_time_str):
    try:
        dt = datetime.strptime(battle_time_str, "%Y%m%dT%H%M%S.%fZ").replace(tzinfo=timezone.utc)
        return dt.astimezone(obter_fuso_brasilia()).strftime("%d/%m/%Y %H:%M:%S")
    except:
        return datetime.now(obter_fuso_brasilia()).strftime("%d/%m/%Y %H:%M:%S")

def nome_brawler(b):
    if isinstance(b, str): return b.upper()
    if isinstance(b, dict): return str(b.get('brawler') or b.get('brawlerName') or b.get('name') or 'UNKNOWN').upper()
    return 'UNKNOWN'

def buscar_battlelog(tag_url, headers_api):
    """
    Tenta buscar o battlelog primeiro via proxy RoyaleAPI, e se falhar
    (qualquer erro de conexão ou status != 200), tenta de novo via API
    oficial da Supercell direto. Retorna (resposta, origem, erro).
    Se as duas tentativas falharem, resposta vem None e erro tem o motivo.
    """
    tentativas = [
        (f"{PROXY_URL}/players/{tag_url}/battlelog", "proxy"),
        (f"{API_OFICIAL_URL}/players/{tag_url}/battlelog", "direto"),
    ]
    ultimo_erro = None
    for url, origem in tentativas:
        try:
            resp = requests.get(url, headers=headers_api, timeout=10)
            if resp.status_code == 200:
                return resp, origem, None
            ultimo_erro = f"HTTP {resp.status_code} via {origem} -> {resp.text[:150]}"
        except Exception as e:
            ultimo_erro = f"Exceção via {origem} -> {e}"
    return None, None, ultimo_erro


def _carregar_rosters_existentes():
    """Carrega rosters.js para preservar meses anteriores."""
    if not os.path.exists(ARQUIVO_ROSTERS):
        return {}
    try:
        texto = open(ARQUIVO_ROSTERS, "r", encoding="utf-8").read()
        marcador = "window.ROSTERS_POR_DATA = "
        if marcador not in texto:
            return {}
        texto = texto.split(marcador, 1)[1].strip()
        if texto.endswith(";"):
            texto = texto[:-1]
        return json.loads(texto)
    except Exception as e:
        print(f"[ROSTERS] Não foi possível ler {ARQUIVO_ROSTERS}: {e}")
        return {}


def _salvar_rosters_js(dados):
    """Salva rosters.js em formato JSON válido dentro de uma variável global."""
    texto = json.dumps(dados, ensure_ascii=False, indent=2)
    with open(ARQUIVO_ROSTERS, "w", encoding="utf-8") as f:
        f.write("// GERADO AUTOMATICAMENTE PELO gerador.py - NÃO EDITE MANUALMENTE.\n")
        f.write("window.ROSTERS_POR_DATA = ")
        f.write(texto)
        f.write(";\n")


def _extrair_ano_mes(data_str):
    try:
        dt = datetime.strptime(str(data_str).strip(), "%d/%m/%Y %H:%M:%S")
        return str(dt.year), f"{dt.month:02d}"
    except Exception:
        return None, None


def atualizar_rosters_do_historico():
    """Reconstrói os rosters usando todo o historico_bruto.csv."""
    if not os.path.exists(ARQUIVO_BRUTO):
        print("[ROSTERS] historico_bruto.csv não existe; nada para atualizar.")
        return

    try:
        df = pd.read_csv(ARQUIVO_BRUTO, dtype=str, keep_default_na=False)
    except Exception as e:
        print(f"[ROSTERS] Erro lendo {ARQUIVO_BRUTO}: {e}")
        return

    obrigatorias = {"id_partida", "player_tag", "player_name", "id_time", "nome_time", "regiao", "data_adicao"}
    faltantes = obrigatorias - set(df.columns)
    if faltantes:
        print(f"[ROSTERS] Colunas ausentes: {', '.join(sorted(faltantes))}")
        return

    rosters = _carregar_rosters_existentes()
    if not isinstance(rosters, dict):
        rosters = {}

    # Descobre o tier já usado para cada time.
    tier_por_time = {}
    for ano_data in rosters.values():
        if not isinstance(ano_data, dict):
            continue
        for mes_data in ano_data.values():
            if not isinstance(mes_data, dict):
                continue
            for reg_data in mes_data.values():
                if not isinstance(reg_data, dict):
                    continue
                for tier, times in reg_data.items():
                    if not isinstance(times, list):
                        continue
                    for time in times:
                        if isinstance(time, dict) and time.get("id_time"):
                            tier_por_time[str(time["id_time"])] = tier

    # Nick mais recente encontrado para cada tag.
    ultimo_nick = {}
    ultima_data = {}
    for _, row in df.iterrows():
        tag = str(row.get("player_tag", "")).strip()
        nick = str(row.get("player_name", "")).strip()
        data = str(row.get("data_adicao", "")).strip()
        if not tag or tag == "#" or not nick:
            continue
        if tag not in ultima_data or data >= ultima_data[tag]:
            ultima_data[tag] = data
            ultimo_nick[tag] = nick

    # Uma partida aparece em 6 linhas. Agrupamos pelo id_partida.
    partidas = {}
    for _, row in df.iterrows():
        pid = str(row.get("id_partida", "")).strip()
        if pid:
            partidas.setdefault(pid, []).append(row)

    # (ano, mês, id_time, jogador-base) -> {companheiro: quantidade}
    contagens = {}
    dados_time = {}

    for pid, linhas in partidas.items():
        if len(linhas) < 6:
            continue

        for inicio in (0, 3):
            lado = linhas[inicio:inicio + 3]
            if len(lado) != 3:
                continue

            primeira = lado[0]
            ano, mes = _extrair_ano_mes(primeira.get("data_adicao", ""))
            if not ano or not mes:
                continue

            id_time = str(primeira.get("id_time", "")).strip()
            regiao = str(primeira.get("regiao", "SA")).strip() or "SA"
            nome_time = str(primeira.get("nome_time", "")).strip() or id_time
            tags_lado = [str(x.get("player_tag", "")).strip() for x in lado]
            tags_lado = [t for t in tags_lado if t and t != "#"]

            if not id_time or len(tags_lado) != 3:
                continue

            dados_time[(ano, mes, id_time)] = {"regiao": regiao, "nome_time": nome_time}

            for base_tag in tags_lado:
                if base_tag not in MAPEAMENTO_PLAYERS:
                    continue
                chave = (ano, mes, id_time, base_tag)
                contagens.setdefault(chave, {})
                for companheiro in tags_lado:
                    if companheiro != base_tag:
                        contagens[chave][companheiro] = contagens[chave].get(companheiro, 0) + 1

    # IDs cadastrados no gerador são os únicos que o algoritmo altera.
    controlados = {str(info.get("id_time")) for info in MAPEAMENTO_PLAYERS.values() if info.get("id_time")}

    # Remove os times controlados dos meses calculados para reconstruí-los do zero.
    meses_calculados = sorted({(ano, mes) for ano, mes, _ in dados_time.keys()})
    for ano, mes in meses_calculados:
        rosters.setdefault(ano, {})
        rosters[ano].setdefault(mes, {})
        for regiao, tiers in list(rosters[ano][mes].items()):
            if not isinstance(tiers, dict):
                continue
            for tier, times in list(tiers.items()):
                if isinstance(times, list):
                    tiers[tier] = [t for t in times if str(t.get("id_time", "")) not in controlados]

    total = 0

    for base_tag, info in MAPEAMENTO_PLAYERS.items():
        id_time = str(info.get("id_time", "")).strip()
        if not id_time:
            continue

        chaves = sorted(
            [k for k in contagens if k[2] == id_time and k[3] == base_tag],
            key=lambda k: (k[0], k[1])
        )

        for ano, mes, _, _ in chaves:
            ranking = sorted(contagens[(ano, mes, id_time, base_tag)].items(), key=lambda x: (-x[1], x[0]))
            melhores = [tag for tag, _qtd in ranking[:2]]
            if len(melhores) < 2:
                print(f"[ROSTER] {ano}/{mes} | {id_time} | {base_tag}: menos de 2 companheiros encontrados.")
                continue

            base_nick = ultimo_nick.get(base_tag, str(info.get("nome", "Player")).split("|", 1)[-1])
            jogadores = [{"nick": base_nick, "tag": base_tag}]
            jogadores.extend({"nick": ultimo_nick.get(tag, tag), "tag": tag} for tag in melhores)

            dados = dados_time.get((ano, mes, id_time), {})
            regiao = str(info.get("regiao") or dados.get("regiao") or "SA")
            nome_time = str(info.get("nome_time") or dados.get("nome_time") or id_time)
            tier = tier_por_time.get(id_time, "TIMES REGISTRADOS")

            rosters.setdefault(ano, {}).setdefault(mes, {}).setdefault(regiao, {}).setdefault(tier, [])
            rosters[ano][mes][regiao][tier].append({
                "id_time": id_time,
                "nome_time": nome_time,
                "jogadores": jogadores
            })

            total += 1
            print(f"[ROSTER] {ano}/{mes} | {id_time} | {base_tag} -> {melhores[0]} ({ranking[0][1]}) + {melhores[1]} ({ranking[1][1]})")

    for meses in rosters.values():
        if not isinstance(meses, dict):
            continue
        for regioes in meses.values():
            if not isinstance(regioes, dict):
                continue
            for tiers in regioes.values():
                if not isinstance(tiers, dict):
                    continue
                for times in tiers.values():
                    if isinstance(times, list):
                        times.sort(key=lambda t: str(t.get("id_time", "")))

    _salvar_rosters_js(rosters)
    print(f"[ROSTERS] {total} rosters atualizados automaticamente em {ARQUIVO_ROSTERS}.")

def minerar_dados():
    global MAPEAMENTO_PLAYERS
    tags_torneio = set()

    # Automatização do Matcherino via arquivo 'torneios.txt'
    if os.path.exists('torneios.txt'):
        with open('torneios.txt', 'r') as f:
            for linha in f:
                t_id = linha.strip()
                if t_id.isdigit():
                    try:
                        url = f"https://matcherino.com/__api/bounties/{t_id}/participants"
                        req = requests.get(url, headers={'User-Agent': 'Mozilla/5.0'}, timeout=10)
                        if req.status_code == 200:
                            for player in req.json().get('body', []):
                                game_accs = str(player.get('gameAccounts', ''))
                                tags = re.findall(r'#[A-Z0-9]{6,10}', game_accs)
                                for tag in tags:
                                    if tag not in MAPEAMENTO_PLAYERS:
                                        MAPEAMENTO_PLAYERS[tag] = {"nome": "Player", "id_time": f"TRN_{t_id}", "nome_time": "Time Torneio", "regiao": "SA"}
                                    tags_torneio.add(tag)
                    except Exception as e:
                        print(f"Erro Matcherino {t_id}: {e}")

    TAG_PARA_REGIAO = {t: i.get("regiao", "SA") for t, i in MAPEAMENTO_PLAYERS.items()}

    ids_registrados, ids_bans = set(), set()
    if os.path.exists(ARQUIVO_BRUTO):
        try:
            df = pd.read_csv(ARQUIVO_BRUTO)
            if "id_partida" in df.columns: ids_registrados = set(df["id_partida"].dropna().astype(str).unique())
        except: pass

    if os.path.exists(ARQUIVO_BANS):
        try:
            dfb = pd.read_csv(ARQUIVO_BANS)
            if "id_partida" in dfb.columns: ids_bans = set(dfb["id_partida"].dropna().astype(str).unique())
        except: pass

    novas_picks, novos_bans = [], []
    headers_api = {"Authorization": f"Bearer {API_KEY}"}

    # --- Contadores de diagnóstico ---
    stats = {
        'total_players': 0, 'status_ok': 0, 'falhas_conexao': 0,
        'origem_sucesso': {}, 'total_items_lidos': 0, 'items_nao_3v3': 0,
        'items_ja_existentes': 0, 'items_novos': 0, 'erros_processamento': 0,
    }

    for tag_busca, info_busca in list(MAPEAMENTO_PLAYERS.items()):
        sigla_busca = info_busca.get("regiao", "SA")
        tag_url = tag_busca.replace("#", "%23")
        stats['total_players'] += 1

        resp, origem, erro = buscar_battlelog(tag_url, headers_api)
        if resp is None:
            stats['falhas_conexao'] += 1
            if stats['falhas_conexao'] <= 8:
                print(f"  [FALHA] {tag_busca}: {erro}")
            continue

        stats['status_ok'] += 1
        stats['origem_sucesso'][origem] = stats['origem_sucesso'].get(origem, 0) + 1

        try:
            items = resp.json().get("items", [])
        except Exception:
            items = []
        stats['total_items_lidos'] += len(items)

        for item in items:
            try:
                battle = item.get("battle", {})
                teams = battle.get("teams", [])
                if len(teams) != 2 or len(teams[0]) != 3 or len(teams[1]) != 3:
                    stats['items_nao_3v3'] += 1
                    continue

                mapa = item.get("event", {}).get("map", "Unknown")
                modo = item.get("event", {}).get("mode", "Unknown")
                b_time = item.get("battleTime")
                momento = formatar_data_brawl(b_time)

                all_p = teams[0] + teams[1]
                tags_list = [p.get('tag', '') for p in all_p]
                nicks_list = [p.get('name', 'Unknown') for p in all_p]
                brawlers_list = [nome_brawler(p.get('brawler', {})) for p in all_p]

                is_matcherino = any(t in tags_torneio for t in tags_list)
                tipo_raw = battle.get('type', 'friendly').lower()
                bans_raw = battle.get('bannedBrawlers') or battle.get('bans') or []

                tipo_final = 'tournament' if (is_matcherino or len(bans_raw) > 0 or 'ranked' in tipo_raw) else 'scrim'

                time_str = b_time.split(".")[0] if b_time else "00000000T000000"
                pid = f"{time_str}_{mapa}_{'_'.join(tags_list)}_{'_'.join(brawlers_list)}"

                res = battle.get('result')
                reg_final = "/".join(sorted({TAG_PARA_REGIAO.get(t, sigla_busca) for t in tags_list}))

                t0_id, t0_nome = "OPONENTE_T0", "DESCONHECIDO T0"
                t1_id, t1_nome = "OPONENTE_T1", "DESCONHECIDO T1"

                for p in teams[0]:
                    if p.get('tag') in MAPEAMENTO_PLAYERS:
                        t0_id, t0_nome = MAPEAMENTO_PLAYERS[p['tag']]["id_time"], MAPEAMENTO_PLAYERS[p['tag']]["nome_time"]
                        break
                for p in teams[1]:
                    if p.get('tag') in MAPEAMENTO_PLAYERS:
                        t1_id, t1_nome = MAPEAMENTO_PLAYERS[p['tag']]["id_time"], MAPEAMENTO_PLAYERS[p['tag']]["nome_time"]
                        break

                if pid not in ids_registrados:
                    stats['items_novos'] += 1
                    for i in range(6):
                        venceu = 1 if (i < 3 and res == 'victory') or (i >= 3 and res == 'defeat') else 0
                        id_t, nm_t = (t0_id, t0_nome) if i < 3 else (t1_id, t1_nome)
                        novas_picks.append([
                            pid, reg_final, ";".join(tags_list), ";".join(nicks_list),
                            brawlers_list[i], venceu, f"{venceu*100}.0%", modo, mapa,
                            momento, tags_list[i], nicks_list[i], id_t, nm_t, tipo_final
                        ])
                    ids_registrados.add(pid)
                else:
                    stats['items_ja_existentes'] += 1

                if bans_raw and pid not in ids_bans:
                    bans_a, bans_b = [], []
                    if isinstance(bans_raw, list):
                        if len(bans_raw) <= 2:
                            if len(bans_raw) > 0: bans_a.append(bans_raw[0])
                            if len(bans_raw) > 1: bans_b.append(bans_raw[1])
                        else:
                            m = len(bans_raw)//2
                            bans_a, bans_b = bans_raw[:m], bans_raw[m:]

                    for b in bans_a:
                        bb = nome_brawler(b)
                        if bb != 'UNKNOWN': novos_bans.append([pid, reg_final, mapa, modo, t0_id, t0_nome, bb, momento, tipo_final])
                    for b in bans_b:
                        bb = nome_brawler(b)
                        if bb != 'UNKNOWN': novos_bans.append([pid, reg_final, mapa, modo, t1_id, t1_nome, bb, momento, tipo_final])
                    ids_bans.add(pid)

            except Exception as e:
                stats['erros_processamento'] += 1
                if stats['erros_processamento'] <= 5:
                    print(f"  [ERRO processamento] {tag_busca}: {e}")

    if novas_picks:
        df_p = pd.DataFrame(novas_picks, columns=COLUNAS_PICKS)
        df_p.to_csv(ARQUIVO_BRUTO, mode='a', header=not os.path.exists(ARQUIVO_BRUTO), index=False)
        print(f"Salvo: {len(df_p)//6} jogos no {ARQUIVO_BRUTO}")

    if novos_bans:
        df_b = pd.DataFrame(novos_bans, columns=COLUNAS_BANS)
        df_b.to_csv(ARQUIVO_BANS, mode='a', header=not os.path.exists(ARQUIVO_BANS), index=False)
        print(f"Salvo: {len(novos_bans)} bans no {ARQUIVO_BANS}")

    if not novas_picks and not novos_bans:
        print("Nenhum dado novo.")

    # Depois de atualizar o histórico, reconstrói automaticamente os rosters.
    atualizar_rosters_do_historico()

    print("\n========== DIAGNOSTICO DA EXECUCAO ==========")
    print(f"Jogadores consultados: {stats['total_players']}")
    print(f"  Respostas OK: {stats['status_ok']}  (proxy: {stats['origem_sucesso'].get('proxy',0)}, direto: {stats['origem_sucesso'].get('direto',0)})")
    print(f"  Falhas de conexao/autenticacao: {stats['falhas_conexao']}")
    print(f"Partidas brutas lidas nos battlelogs: {stats['total_items_lidos']}")
    print(f"  Descartadas (nao eram 3v3): {stats['items_nao_3v3']}")
    print(f"  Ja existentes no historico: {stats['items_ja_existentes']}")
    print(f"  Novas partidas: {stats['items_novos']}")
    print(f"  Erros ao processar item: {stats['erros_processamento']}")
    print("==============================================\n")

if __name__ == "__main__":
    minerar_dados()
