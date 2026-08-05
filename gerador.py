import requests
import pandas as pd
import os
import json
from datetime import datetime, timedelta, timezone
import re
import time

# =============================================================================
# CONFIGURAÇÃO GERAL
# =============================================================================
API_KEY = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9..." # INSIRA SUA CHAVE OFICIAL DA SUPERCELL COMPLETA AQUI

# --- CONFIGURAÇÃO DA RAPIDAPI (Djole33/api/brawlstarsapi) ---
RAPIDAPI_KEY = "SUA_CHAVE_RAPIDAPI_AQUI"
RAPIDAPI_HOST = "brawl-stars-api3.p.rapidapi.com"

PROXY_URL = "https://bsproxy.royaleapi.dev/v1"
API_OFICIAL_URL = "https://api.brawlstars.com/v1"

ARQUIVO_BRUTO = "historico_bruto.csv"
ARQUIVO_BANS = "bans_matcherino.csv"

# NOVA ORGANIZAÇÃO DE COLUNAS CONFORME SOLICITADO
COLUNAS_PICKS = [
    "id_partida", "regiao", 
    "time1", "player1", "brawler1", "gadget", "starrpower", "gear1", "gear2", 
    "player2", "brawler2", "gadget2", "starrpower2", "gear1_2", "gear2_2", 
    "player3", "brawler3", "gadget3", "starrpower3", "gear1_3", "gear2_3", 
    "time2", "player4", "brawler4", "gadget4", "starrpower4", "gear1_4", "gear2_4", 
    "player5", "brawler5", "gadget5", "starrpower5", "gear1_5", "gear2_5", 
    "player6", "brawler6", "gadget6", "starrpower6", "gear1_6", "gear2_6", 
    "modo", "mapa", "tipo", "dt_adicao"
]

COLUNAS_BANS = ["id_partida", "regiao", "mapa", "modo", "id_time", "nome_time", "brawler_banido", "data_adicao", "tipo"]

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

# Função conectada à RapidAPI do Djole33 para buscar equipamentos
def buscar_equipamentos_rapidapi(tag, brawler_name):
    tag_limpa = tag.replace("#", "")
    url = f"https://{RAPIDAPI_HOST}/players/%23{tag_limpa}"
    
    headers = {
        "X-RapidAPI-Key": RAPIDAPI_KEY,
        "X-RapidAPI-Host": RAPIDAPI_HOST
    }
    
    try:
        req = requests.get(url, headers=headers, timeout=5)
        if req.status_code == 200:
            dados = req.json()
            brawlers = dados.get("brawlers", [])
            for b in brawlers:
                if str(b.get("name", "")).upper() == brawler_name:
                    # Capturando os atributos equipados ou desbloqueados 
                    star_powers = [sp["name"] for sp in b.get("starPowers", [])]
                    gadgets = [gd["name"] for gd in b.get("gadgets", [])]
                    gears = [gr["name"] for gr in b.get("gears", [])]
                    
                    gd_final = gadgets[0] if len(gadgets) > 0 else "None"
                    sp_final = star_powers[0] if len(star_powers) > 0 else "None"
                    gr1_final = gears[0] if len(gears) > 0 else "None"
                    gr2_final = gears[1] if len(gears) > 1 else "None"
                    
                    return gd_final, sp_final, gr1_final, gr2_final
    except Exception as e:
        print(f"Erro na RapidAPI para {tag}: {e}")
        
    return "None", "None", "None", "None"

def minerar_dados():
    global MAPEAMENTO_PLAYERS
    tags_torneio = set()

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

    novas_picks, novos_bans = [], []
    headers_api = {"Authorization": f"Bearer {API_KEY}"}

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
                reg_final = "/".join(sorted({TAG_PARA_REGIAO.get(t, sigla_busca) for t in tags_list}))

                if pid not in ids_registrados:
                    t0_nome, t1_nome = "DESCONHECIDO T0", "DESCONHECIDO T1"
                    for p in teams[0]:
                        if p.get('tag') in MAPEAMENTO_PLAYERS: t0_nome = MAPEAMENTO_PLAYERS[p['tag']]["nome_time"]
                    for p in teams[1]:
                        if p.get('tag') in MAPEAMENTO_PLAYERS: t1_nome = MAPEAMENTO_PLAYERS[p['tag']]["nome_time"]
                        
                    # MONTAR LINHA HORIZONTAL (1 POR PARTIDA)
                    linha_partida = [pid, reg_final, t0_nome]
                    
                    for i in range(6):
                        # Pular inserção do nome do Time2 antes do player 4
                        if i == 3:
                            linha_partida.append(t1_nome)
                            
                        t = tags_list[i]
                        n = nicks_list[i]
                        b = brawlers_list[i]
                        
                        nome_formatado = f"{t} {n}"
                        gd, sp, gr1, gr2 = buscar_equipamentos_rapidapi(t, b)
                        
                        linha_partida.extend([nome_formatado, b, gd, sp, gr1, gr2])
                        
                        # Evitar limite de requests rápidos
                        time.sleep(0.1)

                    linha_partida.extend([modo, mapa, tipo_final, momento])
                    novas_picks.append(linha_partida)
                    ids_registrados.add(pid)
                    stats['items_novos'] += 1
                else:
                    stats['items_ja_existentes'] += 1

            except Exception as e:
                stats['erros_processamento'] += 1

    if novas_picks:
        df_p = pd.DataFrame(novas_picks, columns=COLUNAS_PICKS)
        df_p.to_csv(ARQUIVO_BRUTO, mode='a', header=not os.path.exists(ARQUIVO_BRUTO), index=False)
        print(f"Salvo: {len(novas_picks)} novos jogos no {ARQUIVO_BRUTO}")

    if not novas_picks and not novos_bans:
        print("Nenhum dado novo.")

if __name__ == "__main__":
    minerar_dados()

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
    # Executa a mineração de dados
    minerar_dados()
