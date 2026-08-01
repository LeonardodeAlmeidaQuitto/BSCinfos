import requests
import pandas as pd
import os
import json
import time
from datetime import datetime, timedelta, timezone
import re

# =============================================================================
# CONFIGURAÇÃO GERAL
# =============================================================================
# Chave da API oficial da Supercell (battlelog).
# IMPORTANTÍSSIMO: Se você receber "HTTP 403 accessDenied Invalid authorization",
# significa que este token EXPIROU. Gere um novo em:
#   https://developer.supercell.com -> My Keys -> Create Key
# e cole o novo JWT abaixo.
API_KEY = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjU0ODZlOGQxLTRkNWQtNDJmYy1iOWE3LWU5ODYyMWJhOWI0NSIsImlhdCI6MTc3ODUwODgwOCwic3ViIjoiZGV2ZWxvcGVyLzc0NjFhNGJkLThhZDctNjg2Mi0wOGVkLTJiYmEzMzAxMWE3NiIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZSJ9LHsiY2lkcnMiOlsiNDUuNzkuMjE4Ljc5Il0sInR5cGUiOiJjbGllbnQifV19.yvcSQalBqNz6Q6DjZWU5IL1XvBjn5DGckYvy2bgl5tjVeRJ2GMhY_I2JP1zdEeLAfEG2hGVJT7OMZro4kkegFA"

# Proxy da RoyaleAPI: tentado primeiro (contorna o IP fixo travado no token).
PROXY_URL = "https://bsproxy.royaleapi.dev/v1"
# API oficial da Supercell: usada como fallback automático se o proxy falhar.
API_OFICIAL_URL = "https://api.brawlstars.com/v1"

# -----------------------------------------------------------------------------
# RAPIDAPI - BrawlStarsAPI (Djole33)
# Endpoint: GET /brawlers  -> retorna lista de todos os brawlers com:
#   "1st gadget", "2nd gadget", "1st star power", "2nd star power", id, name
#
# Esta API NÃO tem endpoint de perfil de jogador (/players/{tag} NÃO existe).
# Os gadgets/star powers/gears de cada partida já vêm DENTRO do battlelog da
# API oficial da Supercell (battle.teams[].brawler.gadgets/starPowers/gears).
# A RapidAPI é usada apenas como FALLBACK para preencher nomes de gadgets/star
# powers quando o battlelog não os trouxer (raro), e os gears não estão
# disponíveis nela.
#
# IMPORTANTE: Substitua RAPIDAPI_KEY pela sua chave gratuita obtida em
# https://rapidapi.com/Djole33/api/brawlstarsapi
# -----------------------------------------------------------------------------
RAPIDAPI_KEY = "e28d71b8f2msh519f1b75f65bb54p1d5598jsnae80ec5aa0a2"
RAPIDAPI_HOST = "brawlstarsapi.p.rapidapi.com"
RAPIDAPI_URL = f"https://{RAPIDAPI_HOST}"

ARQUIVO_BRUTO = "historico_bruto.csv"
ARQUIVO_BANS = "bans_matcherino.csv"
ARQUIVO_CACHE_BRAWLERS = "cache_brawlers_rapidapi.json"

# -----------------------------------------------------------------------------
# NOVO FORMATO: 1 linha por partida (antes eram 6 linhas por partida).
# Cada time tem 3 jogadores; cada jogador tem player, brawler, gadget,
# starrpower, gear1 e gear2.
# -----------------------------------------------------------------------------
COLUNAS_PICKS = [
    "id_partida", "regiao",
    "time1",
    "player1", "brawler1", "gadget1", "starrpower1", "gear1_1", "gear1_2",
    "player2", "brawler2", "gadget2", "starrpower2", "gear2_1", "gear2_2",
    "player3", "brawler3", "gadget3", "starrpower3", "gear3_1", "gear3_2",
    "time2",
    "player4", "brawler4", "gadget4", "starrpower4", "gear4_1", "gear4_2",
    "player5", "brawler5", "gadget5", "starrpower5", "gear5_1", "gear5_2",
    "player6", "brawler6", "gadget6", "starrpower6", "gear6_1", "gear6_2",
    "modo", "mapa", "tipo", "dt_adicao"
]
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
        "#PLLRJC2V": {"nome": "Wesley", "id_time": "BH", "nome_time": "BH ESPORTS", "regiao": "SA"},
        "#JQ8LLLY": {"nome": "FireCrow", "id_time": "LOUD", "nome_time": "LOUD", "regiao": "SA"},
        "#CQLR0Y80": {"nome": "Tufa", "id_time": "OCX", "nome_time": "OCX DIVISION", "regiao": "SA"},
        "#L9PQUV0YC": {"nome": "BrabaoBs", "id_time": "OS", "nome_time": "OLIMPO SQUAD", "regiao": "SA"},
        "#2GV09VJJP": {"nome": "FireMirillo", "id_time": "AL", "nome_time": "ACRE LOVERS", "regiao": "SA"},
        "#202GJJR28": {"nome": "Doritos", "id_time": "GLXY", "nome_time": "GALAXY", "regiao": "SA"},
        "#PR0P8QVQ": {"nome": "Kr ;)", "id_time": "SKC", "nome_time": "SKCALALAS SA", "regiao": "SA"},
        "#R2LR2QLG": {"nome": "Mohtep", "id_time": "PCNG", "nome_time": "PIZZA CONGELADA F/A", "regiao": "SA"},
        "#80VLPJCCC": {"nome": "Tilo", "id_time": "CB", "nome_time": "CRECHE BRAWL", "regiao": "SA"},
        "#GJPVYUQG": {"nome": "Deykonn", "id_time": "LVL", "nome_time": "LEVEL ESPORTS", "regiao": "SA"},
        "#2P8RVJVUY": {"nome": "Sterixx", "id_time": "OCXA", "nome_time": "OCX DIVISION ACADEMY", "regiao": "SA"},
        "#820JCJJG": {"nome": "Jxcccr", "id_time": "ZRT", "nome_time": "ZURITA GANG", "regiao": "SA"},
        "#2QCCC29QV": {"nome": "Magic", "id_time": "ENO", "nome_time": "ENOSIS", "regiao": "SA"},
        "#2YRRL8GG2": {"nome": "Bebaxo", "id_time": "HAWK", "nome_time": "RED HAWK", "regiao": "SA"},
        "#VQ8YP9C0": {"nome": "JoeFav", "id_time": "LVLA", "nome_time": "LEVEL ACADEMY", "regiao": "SA"},
        "#80YUV29GR": {"nome": "Lion", "id_time": "AG", "nome_time": "AG ESPORTS", "regiao": "SA"},
        "#YCUGURU89": {"nome": "Azuri", "id_time": "JPFC", "nome_time": "JAPÃO FC ESPORTS", "regiao": "SA"},
# NA
        "#LVRRYPV": {"nome": "Bobby", "id_time": "BOB", "nome_time": "F/A BOBBY", "regiao": "NA"},
        "#82RCQCVG": {"nome": "Lxffy", "id_time": "TRB", "nome_time": "TRIBE GAMING", "regiao": "NA"},
        "#YUJ8PJ0LR": {"nome": "Snoiy", "id_time": "TE", "nome_time": "TEAM ELEKTROS", "regiao": "NA"},
        "#VPVLG2": {"nome": "Tyrant", "id_time": "HML", "nome_time": "F/A HOMELESS", "regiao": "NA"},
        "#GVLRUG9Q": {"nome": "PaiN", "id_time": "NOVA", "nome_time": "NOVA", "regiao": "NA"},
        "#QURVLPG": {"nome": "Ezlivi", "id_time": "VTC", "nome_time": "VATIC", "regiao": "NA"},
        "#R9CCLP8Q": {"nome": "Rafiki", "id_time": "LGCY", "nome_time": "LEGACY", "regiao": "NA"},
        "#28LUY98": {"nome": "OG", "id_time": "VIC", "nome_time": "VIC", "regiao": "NA"},
        "#8UL0U08V": {"nome": "Winq", "id_time": "UTP", "nome_time": "UTOPIA", "regiao": "NA"},
        "#JJ09PC0P": {"nome": "Vegeta", "id_time": "VICD", "nome_time": "VIC Day", "regiao": "NA"},
        "#R80QRP0G": {"nome": "Squeezy", "id_time": "PFZ", "nome_time": "PFZ", "regiao": "NA"},
        "#88PL8L2JC": {"nome": "David", "id_time": "ENONA", "nome_time": "ENOSIS NA", "regiao": "NA"},
# EMEA
        "#9PCV9L982": {"nome": "AngelBoy", "id_time": "FUT", "nome_time": "FUT ESPORTS", "regiao": "EMEA"},
        "#2208QGGGL": {"nome": "Dompe", "id_time": "KUMA", "nome_time": "KUMA", "regiao": "EMEA"},
        "#80PVPCC29": {"nome": "Enraged", "id_time": "NAVI", "nome_time": "NAVI", "regiao": "EMEA"},
        "#2Y822YJYJC": {"nome": "Decaii", "id_time": "MZP", "nome_time": "METIZPORT", "regiao": "EMEA"},
        "#YQUCCJ2": {"nome": "Symantec", "id_time": "HMB", "nome_time": "HMBLE", "regiao": "EMEA"},
        "#9LVUC2PY": {"nome": "Ope", "id_time": "SK", "nome_time": "SK GAMING", "regiao": "EMEA"},
        "#PCPRPJV": {"nome": "IKaoss", "id_time": "TH", "nome_time": "TEAM HERETICS", "regiao": "EMEA"},
        "#2Q892QVU": {"nome": "Maru", "id_time": "TTM", "nome_time": "REPLY TOTEM", "regiao": "EMEA"},
        "#9PQQ8GQQ": {"nome": "Filippo", "id_time": "NOVO", "nome_time": "NOVO ESPORTS", "regiao": "EMEA"},
        "#PLV89CGP": {"nome": "Salty", "id_time": "BIG", "nome_time": "BIG", "regiao": "EMEA"},
        "#LLV82LQPU": {"nome": "Fayelo", "id_time": "REV", "nome_time": "REVERSO HIVE", "regiao": "EMEA"},
        "#8RVLRVYYP": {"nome": "Yei Yei", "id_time": "TLB", "nome_time": "TALENTS LAB", "regiao": "EMEA"},
        "#82GG2RLQG": {"nome": "ZeyroX", "id_time": "FUTA", "nome_time": "FUT ACADEMY", "regiao": "EMEA"},
# EA
        "#9ULYPV8": {"nome": "Tensai", "id_time": "CR", "nome_time": "CRAZY RACCOON", "regiao": "EA"},
        "#P0Y8JGL0U": {"nome": "Battoman", "id_time": "ZETA", "nome_time": "ZETA DIVISION", "regiao": "EA"},
        "#J99YU9QY": {"nome": "Kuru", "id_time": "SKCEA", "nome_time": "SKC EA", "regiao": "EA"},
        "#2RQQ9PGC": {"nome": "Shigemyon", "id_time": "IGM", "nome_time": "IGNUM", "regiao": "EA"},
        "#LJ0288PRG": {"nome": "Terry", "id_time": "AXIS", "nome_time": "AXIS", "regiao": "EA"},
        "#82CJYJPG2": {"nome": "Yutapin", "id_time": "RVL", "nome_time": "RIVAL", "regiao": "EA"},
        "#8J9GUJJVY": {"nome": "Melty", "id_time": "RC", "nome_time": "REJECT", "regiao": "EA"},
        "#28PU0P9L0": {"nome": "Achapi", "id_time": "FL", "nome_time": "FENNEL", "regiao": "EA"},
        "#28VP0G808": {"nome": "Koga", "id_time": "INS", "nome_time": "INSOMNIA", "regiao": "EA"},
        "#89UUQLJCC": {"nome": "Toridesu", "id_time": "FZ", "nome_time": "FRENZY", "regiao": "EA"},
        "#8R0JY2UJ2": {"nome": "Rennosuke", "id_time": "F0", "nome_time": "FAZE ZERO", "regiao": "EA"}

}

# =============================================================================
# CACHE DA LISTA DE BRAWLERS (RapidAPI) — usada apenas como FALLBACK
# =============================================================================
_cache_brawlers_rapidapi = {}


def obter_fuso_brasilia():
    return timezone(timedelta(hours=-3))


def formatar_data_brawl(battle_time_str):
    try:
        dt = datetime.strptime(battle_time_str, "%Y%m%dT%H%M%S.%fZ").replace(tzinfo=timezone.utc)
        return dt.astimezone(obter_fuso_brasilia()).strftime("%d/%m/%Y %H:%M:%S")
    except Exception:
        return datetime.now(obter_fuso_brasilia()).strftime("%d/%m/%Y %H:%M:%S")


def nome_brawler(b):
    if isinstance(b, str):
        return b.upper()
    if isinstance(b, dict):
        return str(b.get('brawler') or b.get('brawlerName') or b.get('name') or 'UNKNOWN').upper()
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


# =============================================================================
# EXTRAÇÃO DE EQUIPAMENTOS DIRETO DO BATTLELOG
# =============================================================================
# A API oficial da Supercell já retorna, dentro de cada item do battlelog,
# a estrutura battle.teams[].players[].brawler com:
#   - gadgets:   [{"id": 1, "name": "Nome do Gadget"}, ...]
#   - starPowers: [{"id": 1, "name": "Nome do Star Power"}, ...]
#   - gears:      [{"id": 1, "name": "Nome do Gear", "level": 3}, ...]
#
# Assim, NÃO precisamos de um endpoint de perfil de jogador. Extraímos
# tudo diretamente do objeto brawler que vem na própria partida.
# =============================================================================

def _extrair_nome_lista(lista, indice=0):
    """De uma lista de dicts [{'id':..,'name':..}], pega o nome do índice dado."""
    if not lista or indice >= len(lista):
        return ""
    item = lista[indice]
    if isinstance(item, dict):
        return item.get("name", "")
    if isinstance(item, str):
        return item
    return ""


def extrair_equipamentos_do_brawler(brawler_obj):
    """
    Dado o objeto brawler que vem dentro de cada player no battlelog,
    retorna (gadget, starrpower, gear1, gear2) como strings.
    Se o brawler não trouxer esses campos, retorna vazios.
    """
    vazio = ("", "", "", "")
    if not brawler_obj or not isinstance(brawler_obj, dict):
        return vazio

    gadgets = brawler_obj.get("gadgets") or []
    star_powers = brawler_obj.get("starPowers") or []
    gears = brawler_obj.get("gears") or []

    gadget = _extrair_nome_lista(gadgets, 0)
    starrpower = _extrair_nome_lista(star_powers, 0)
    gear1 = _extrair_nome_lista(gears, 0)
    gear2 = _extrair_nome_lista(gears, 1)

    # Se o battlelog não trouxe nomes (algumas respostas antigas podem trazer só IDs),
    # tenta o fallback via RapidAPI.
    if not gadget or not starrpower:
        nome_b = nome_brawler(brawler_obj)
        fb_gadget, fb_sp = _fallback_rapidapi(nome_b)
        if not gadget:
            gadget = fb_gadget
        if not starrpower:
            starrpower = fb_sp

    return (gadget, starrpower, gear1, gear2)


# =============================================================================
# FALLBACK RAPIDAPI (/brawlers) — só usado se o battlelog não trouxer nomes
# =============================================================================
def _rapidapi_ativa():
    return bool(RAPIDAPI_KEY) and RAPIDAPI_KEY != "SUA_CHAVE_RAPIDAPI_AQUI"


def _carregar_brawlers_rapidapi():
    """
    Busca a lista de todos os brawlers via GET /brawlers (RapidAPI).
    Cada item tem: "1st gadget", "2nd gadget", "1st star power",
    "2nd star power", id, name.
    Cacheia em arquivo JSON para não repetir a chamada a cada execução.
    """
    global _cache_brawlers_rapidapi
    if _cache_brawlers_rapidapi:
        return _cache_brawlers_rapidapi

    # Tenta carregar do cache em arquivo
    if os.path.exists(ARQUIVO_CACHE_BRAWLERS):
        try:
            with open(ARQUIVO_CACHE_BRAWLERS, "r", encoding="utf-8") as f:
                _cache_brawlers_rapidapi = json.load(f)
                return _cache_brawlers_rapidapi
        except Exception:
            pass

    if not _rapidapi_ativa():
        return {}

    try:
        url = f"{RAPIDAPI_URL}/brawlers"
        headers = {"X-RapidAPI-Key": RAPIDAPI_KEY, "X-RapidAPI-Host": RAPIDAPI_HOST}
        resp = requests.get(url, headers=headers, timeout=30)
        if resp.status_code == 200:
            lista = resp.json()
            for b in lista:
                nome = str(b.get("name", "")).upper()
                _cache_brawlers_rapidapi[nome] = {
                    "gadget": b.get("1st gadget", ""),
                    "starrpower": b.get("1st star power", ""),
                }
            # Salva cache em arquivo
            try:
                with open(ARQUIVO_CACHE_BRAWLERS, "w", encoding="utf-8") as f:
                    json.dump(_cache_brawlers_rapidapi, f, ensure_ascii=False, indent=2)
            except Exception:
                pass
            print(f"[RapidAPI] Lista de {len(lista)} brawlers carregada e cacheada.")
            return _cache_brawlers_rapidapi
        else:
            print(f"[RapidAPI] Falha ao buscar /brawlers: HTTP {resp.status_code}")
    except Exception as e:
        print(f"[RapidAPI] Erro ao buscar /brawlers: {e}")
    return {}


def _fallback_rapidapi(nome_brawler_alvo):
    """
    Retorna (gadget, starrpower) do fallback da RapidAPI para o brawler dado.
    Gears não estão disponíveis nesta API (retorna "").
    """
    dados = _carregar_brawlers_rapidapi()
    if not dados:
        return ("", "")
    info = dados.get(nome_brawler_alvo.upper())
    if info:
        return (info.get("gadget", ""), info.get("starrpower", ""))
    return ("", "")


def formatar_player(tag, nick):
    """
    Formata o campo de jogador como 'TAG (#) Nick In Game'.
    Ex.: '#PLLRJC2V (#) Wesley'
    """
    tag_fmt = tag if tag else ""
    nick_fmt = nick if nick else "Unknown"
    return f"{tag_fmt} (#) {nick_fmt}"


def minerar_dados():
    global MAPEAMENTO_PLAYERS
    tags_torneio = set()

    # -------------------------------------------------------------------------
    # PRÉ-CARREGAR FALLBACK RAPIDAPI (lista de brawlers) — só se a chave existir
    # -------------------------------------------------------------------------
    if _rapidapi_ativa():
        _carregar_brawlers_rapidapi()

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

    # Conjunto de partidas já registradas (para não duplicar)
    ids_registrados, ids_bans = set(), set()
    if os.path.exists(ARQUIVO_BRUTO):
        try:
            df = pd.read_csv(ARQUIVO_BRUTO)
            if "id_partida" in df.columns:
                ids_registrados = set(df["id_partida"].dropna().astype(str).unique())
        except Exception:
            pass

    if os.path.exists(ARQUIVO_BANS):
        try:
            dfb = pd.read_csv(ARQUIVO_BANS)
            if "id_partida" in dfb.columns:
                ids_bans = set(dfb["id_partida"].dropna().astype(str).unique())
        except Exception:
            pass

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

                # all_p = lista de 6 players (3 do time 0 + 3 do time 1)
                all_p = teams[0] + teams[1]
                tags_list = [p.get('tag', '') for p in all_p]
                nicks_list = [p.get('name', 'Unknown') for p in all_p]
                brawlers_list = [nome_brawler(p.get('brawler', {})) for p in all_p]
                # OBJETOS brawler completos (com gadgets/starPowers/gears)
                brawler_objs = [p.get('brawler', {}) for p in all_p]

                is_matcherino = any(t in tags_torneio for t in tags_list)
                tipo_raw = battle.get('type', 'friendly').lower()
                bans_raw = battle.get('bannedBrawlers') or battle.get('bans') or []

                tipo_final = 'tournament' if (is_matcherino or len(bans_raw) > 0 or 'ranked' in tipo_raw) else 'scrim'

                time_str = b_time.split(".")[0] if b_time else "00000000T000000"
                pid = f"{time_str}_{mapa}_{'_'.join(tags_list)}_{'_'.join(brawlers_list)}"

                if pid in ids_registrados:
                    stats['items_ja_existentes'] += 1
                else:
                    stats['items_novos'] += 1

                    # Extrair equipamentos diretamente do objeto brawler do battlelog
                    slots = []
                    for i in range(6):
                        tag = tags_list[i]
                        nick = nicks_list[i]
                        brawler = brawlers_list[i]
                        brawler_obj = brawler_objs[i]
                        gadget, starrpower, gear1, gear2 = extrair_equipamentos_do_brawler(brawler_obj)
                        slots.append((formatar_player(tag, nick), brawler, gadget, starrpower, gear1, gear2))

                    # Identificar os times (T0 e T1)
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

                    reg_final = "/".join(sorted({TAG_PARA_REGIAO.get(t, sigla_busca) for t in tags_list}))

                    # Construir a linha final: 1 linha por partida (44 colunas)
                    # Ordem exata do COLUNAS_PICKS:
                    # id_partida, regiao, time1,
                    # p1,b1,g1,sp1,gr1_1,gr1_2,
                    # p2,b2,g2,sp2,gr2_1,gr2_2,
                    # p3,b3,g3,sp3,gr3_1,gr3_2,
                    # time2,
                    # p4,b4,g4,sp4,gr4_1,gr4_2,
                    # p5,b5,g5,sp5,gr5_1,gr5_2,
                    # p6,b6,g6,sp6,gr6_1,gr6_2,
                    # modo, mapa, tipo, dt_adicao
                    linha_final = [pid, reg_final, t0_nome]
                    for s in slots[:3]:
                        linha_final.extend(s)
                    linha_final.append(t1_nome)
                    for s in slots[3:6]:
                        linha_final.extend(s)
                    linha_final.extend([modo, mapa, tipo_final, momento])

                    novas_picks.append(linha_final)
                    ids_registrados.add(pid)

                # Bans são coletados independentemente de a partida ser nova
                if bans_raw and pid not in ids_bans:
                    bans_a, bans_b = [], []
                    if isinstance(bans_raw, list):
                        if len(bans_raw) <= 2:
                            if len(bans_raw) > 0:
                                bans_a.append(bans_raw[0])
                            if len(bans_raw) > 1:
                                bans_b.append(bans_raw[1])
                        else:
                            m = len(bans_raw) // 2
                            bans_a, bans_b = bans_raw[:m], bans_raw[m:]

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

                    for b in bans_a:
                        bb = nome_brawler(b)
                        if bb != 'UNKNOWN':
                            novos_bans.append([pid, "/".join(sorted({TAG_PARA_REGIAO.get(t, sigla_busca) for t in tags_list})), mapa, modo, t0_id, t0_nome, bb, momento, tipo_final])
                    for b in bans_b:
                        bb = nome_brawler(b)
                        if bb != 'UNKNOWN':
                            novos_bans.append([pid, "/".join(sorted({TAG_PARA_REGIAO.get(t, sigla_busca) for t in tags_list})), mapa, modo, t1_id, t1_nome, bb, momento, tipo_final])
                    ids_bans.add(pid)

            except Exception as e:
                stats['erros_processamento'] += 1
                if stats['erros_processamento'] <= 5:
                    print(f"  [ERRO processamento] {tag_busca}: {e}")

    # -------------------------------------------------------------------------
    # Salvar os arquivos CSV
    # -------------------------------------------------------------------------
    if novas_picks:
        df_p = pd.DataFrame(novas_picks, columns=COLUNAS_PICKS)
        df_p.to_csv(ARQUIVO_BRUTO, mode='a', header=not os.path.exists(ARQUIVO_BRUTO), index=False)
        print(f"Salvo: {len(df_p)} jogos (1 linha cada) no {ARQUIVO_BRUTO}")

    if novos_bans:
        df_b = pd.DataFrame(novos_bans, columns=COLUNAS_BANS)
        df_b.to_csv(ARQUIVO_BANS, mode='a', header=not os.path.exists(ARQUIVO_BANS), index=False)
        print(f"Salvo: {len(novos_bans)} bans no {ARQUIVO_BANS}")

    if not novas_picks and not novos_bans:
        print("Nenhum dado novo.")

    print("\n========== DIAGNOSTICO DA EXECUCAO ==========")
    print(f"Jogadores consultados: {stats['total_players']}")
    print(f"  Respostas OK: {stats['status_ok']}  (proxy: {stats['origem_sucesso'].get('proxy',0)}, direto: {stats['origem_sucesso'].get('direto',0)})")
    print(f"  Falhas de conexao/autenticacao: {stats['falhas_conexao']}")
    print(f"Partidas brutas lidas nos battlelogs: {stats['total_items_lidos']}")
    print(f"  Descartadas (nao eram 3v3): {stats['items_nao_3v3']}")
    print(f"  Ja existentes no historico: {stats['items_ja_existentes']}")
    print(f"  Novas partidas: {stats['items_novos']}")
    print(f"  Erros ao processar item: {stats['erros_processamento']}")
    if stats['falhas_conexao'] == stats['total_players'] and stats['total_players'] > 0:
        print("")
        print("  !!! ATENCAO: TODAS as chamadas falharam com 403 (accessDenied).")
        print("  !!! O token API_KEY da Supercell EXPIROU.")
        print("  !!! Gere um novo token em https://developer.supercell.com")
        print("  !!! e substitua o valor de API_KEY no topo deste arquivo.")
    print("==============================================\n")


if __name__ == "__main__":
    minerar_dados()
