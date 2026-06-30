import requests
import pandas as pd
import os
import json
from datetime import datetime, timedelta, timezone
import re

# =============================================================================
# CONFIGURAÇÃO GERAL
# =============================================================================
API_KEY = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjU0ODZlOGQxLTRkNWQtNDJmYy1iOWE3LWU5ODYyMWJhOWI0NSIsImlhdCI6MTc3ODUwODgwOCwic3ViIjoiZGV2ZWxvcGVyLzc0NjFhNGJkLThhZDctNjg2Mi0wOGVkLTJiYmEzMzAxMWE3NiIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiNDUuNzkuMjE4Ljc5Il0sInR5cGUiOiJjbGllbnQifV19.yvcSQalBqNz6Q6DjZWU5IL1XvBjn5DGck"

ARQUIVO_BRUTO = "historico_bruto.csv"
ARQUIVO_BANS = "bans_matcherino.csv"

COLUNAS_PICKS = ["id_partida", "regiao", "id_players", "name_players", "pick", "win", "win_rate", "modo", "mapa", "data_adicao", "player_tag", "player_name", "id_time", "nome_time", "tipo"]
COLUNAS_BANS = ["id_partida", "regiao", "mapa", "modo", "id_time", "nome_time", "brawler_banido", "data_adicao", "tipo"]

# Mapeamento de Tags para identificação automática de Região, Time e Nick
MAPEAMENTO_PLAYERS = {
# SA  
        "#PLLRJC2V": {"nome": "Wesley", "id_time": "BH", "nome_time": "BH ESPORTS"},
        "#JQ8LLLY": {"nome": "FireCrow", "id_time": "LOUD", "nome_time": "LOUD"},
        "#CQLR0Y80": {"nome": "Tufa", "id_time": "OCX", "nome_time": "OCX DIVISION"},
        "#L9PQUV0YC": {"nome": "BrabaoBs", "id_time": "OS", "nome_time": "OLIMPO SQUAD"},
        "#2GV09VJJP": {"nome": "FireMirillo", "id_time": "AL", "nome_time": "ACRE LOVERS"},
        "#202GJJR28": {"nome": "Doritos", "id_time": "GLXY", "nome_time": "GALAXY"},
        "#PR0P8QVQ": {"nome": "Kr ;)", "id_time": "SKC", "nome_time": "SKCALALAS SA"},
        "#R2LR2QLG": {"nome": "Mohtep", "id_time": "PCNG", "nome_time": "PIZZA CONGELADA F/A"},
        "#80VLPJCCC": {"nome": "Tilo", "id_time": "CB", "nome_time": "CRECHE BRAWL"},
        "#GJPVYUQG": {"nome": "Deykonn", "id_time": "LVL", "nome_time": "LEVEL ESPORTS"},
        "#2P8RVJVUY": {"nome": "Sterixx", "id_time": "OCXA", "nome_time": "OCX DIVISION ACADEMY"},
        "#820JCJJG": {"nome": "Jxcccr", "id_time": "ZRT", "nome_time": "ZURITA GANG"},
        "#2QCCC29QV": {"nome": "Magic", "id_time": "ENO", "nome_time": "ENOSIS"},
        "#2YRRL8GG2": {"nome": "Bebaxo", "id_time": "HAWK", "nome_time": "RED HAWK"},
        "#VQ8YP9C0": {"nome": "JoeFav", "id_time": "LVLA", "nome_time": "LEVEL ACADEMY"},
# NA
        "#LVRRYPV": {"nome": "Bobby", "id_time": "BOB", "nome_time": "F/A BOBBY"},
        "#82RCQCVG": {"nome": "Lxffy", "id_time": "TRB", "nome_time": "TRIBE GAMING"},
        "#YUJ8PJ0LR": {"nome": "Snoiy", "id_time": "TE", "nome_time": "TEAM ELEKTROS"},
        "#VPVLG2": {"nome": "Tyrant", "id_time": "HML", "nome_time": "F/A HOMELESS"},
        "#GVLRUG9Q": {"nome": "PaiN", "id_time": "NOVA", "nome_time": "NOVA"},
        "#QURVLPG": {"nome": "Ezlivi", "id_time": "VTC", "nome_time": "VATIC"},
        "#R9CCLP8Q": {"nome": "Rafiki", "id_time": "LGCY", "nome_time": "LEGACY"},
        "#28LUY98": {"nome": "OG", "id_time": "VIC", "nome_time": "VIC"},
        "#8UL0U08V": {"nome": "Winq", "id_time": "UTP", "nome_time": "UTOPIA"},
        "#JJ09PC0P": {"nome": "Vegeta", "id_time": "VICD", "nome_time": "VIC Day"},
        "#R80QRP0G": {"nome": "Squeezy", "id_time": "PFZ", "nome_time": "PFZ"},
        "#88PL8L2JC": {"nome": "David", "id_time": "ENONA", "nome_time": "ENOSIS NA"},
# EMEA
        "#9PCV9L982": {"nome": "AngelBoy", "id_time": "FUT", "nome_time": "FUT ESPORTS"},
        "#2208QGGGL": {"nome": "Dompe", "id_time": "KUMA", "nome_time": "KUMA"},
        "#80PVPCC29": {"nome": "Enraged", "id_time": "NAVI", "nome_time": "NAVI"},
        "#2Y822YJYJC": {"nome": "Decaii", "id_time": "MZP", "nome_time": "MZP"},
        "#YQUCCJ2": {"nome": "Symantec", "id_time": "HMB", "nome_time": "HMBLE"},
        "#9LVUC2PY": {"nome": "Ope", "id_time": "SK", "nome_time": "SK GAMING"},
        "#PCPRPJV": {"nome": "IKaoss", "id_time": "TH", "nome_time": "TEAM HERETICS"},
        "#2Q892QVU": {"nome": "Maru", "id_time": "TTM", "nome_time": "REPLY TOTEM"},
        "#9PQQ8GQQ": {"nome": "Filippo", "id_time": "NOVO", "nome_time": "NOVO ESPORTS"},
        "#PLV89CGP": {"nome": "Salty", "id_time": "BIG", "nome_time": "BIG"},
        "#LLV82LQPU": {"nome": "Fayelo", "id_time": "REV", "nome_time": "REVERSO HIVE"},
        "#8RVLRVYYP": {"nome": "Yei Yei", "id_time": "TLB", "nome_time": "TALENTS LAB"},
        "#82GG2RLQG": {"nome": "ZeyroX", "id_time": "FUTA", "nome_time": "FUT ACADEMY"},
# EA
        "#9ULYPV8": {"nome": "Tensai", "id_time": "CR", "nome_time": "CRAZY RACCOON"},
        "#P0Y8JGL0U": {"nome": "Battoman", "id_time": "ZETA", "nome_time": "ZETA DIVISION"},
        "#J99YU9QY": {"nome": "Kuru", "id_time": "SKCEA", "nome_time": "SKC EA"},
        "#2RQQ9PGC": {"nome": "Shigemyon", "id_time": "IGM", "nome_time": "IGNUM"},
        "#LJ0288PRG": {"nome": "Terry", "id_time": "AXIS", "nome_time": "AXIS"},
        "#82CJYJPG2": {"nome": "Yutapin", "id_time": "RVL", "nome_time": "RIVAL"},
        "#8J9GUJJVY": {"nome": "Melty", "id_time": "RC", "nome_time": "REJECT"},
        "#28PU0P9L0": {"nome": "Achapi", "id_time": "FL", "nome_time": "FENNEL"},
        "#28VP0G808": {"nome": "Koga", "id_time": "INS", "nome_time": "INSOMNIA"},
        "#89UUQLJCC": {"nome": "Toridesu", "id_time": "FZ", "nome_time": "FRENZY"},
        "#8R0JY2UJ2": {"nome": "Rennosuke", "id_time": "F0", "nome_time": "FAZE ZERO"}

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

def minerar_dados():
    global MAPEAMENTO_PLAYERS
    tags_torneio = set()
    
    # Automatização do Matcherino via arquivo 'torneios.txt'
    # Cada linha do arquivo = um ID de torneio/bounty do Matcherino.
    # O bot busca os participantes daquele torneio e extrai as tags de
    # Brawl Stars vinculadas a cada um, passando a rastreá-los.
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

    # .get() com fallback "SA": se algum player for adicionado manualmente
    # no futuro e esquecerem de incluir "regiao", o bot não quebra mais.
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

    for tag_busca, info_busca in list(MAPEAMENTO_PLAYERS.items()):
        sigla_busca = info_busca.get("regiao", "SA")
        tag_url = tag_busca.replace("#", "%23")
        url = f"{PROXY_URL}/players/{tag_url}/battlelog"
        
        try:
            resp = requests.get(url, headers=headers_api, timeout=10)
            if resp.status_code != 200: continue
            
            for item in resp.json().get("items", []):
                try:
                    battle = item.get("battle", {})
                    teams = battle.get("teams", [])
                    if len(teams) != 2 or len(teams[0]) != 3 or len(teams[1]) != 3: continue
                    
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
                    
                    # Definição do Tipo (SCRIM vs TOURNAMENT)
                    tipo_final = 'tournament' if (is_matcherino or len(bans_raw) > 0 or 'ranked' in tipo_raw) else 'scrim'
                    
                    time_str = b_time.split(".")[0] if b_time else "00000000T000000"
                    pid = f"{time_str}_{mapa}_{'_'.join(tags_list)}_{'_'.join(brawlers_list)}"
                    
                    # reg_final / t0_* / t1_* ficam disponíveis tanto para o
                    # bloco de picks quanto para o de bans abaixo, mesmo que
                    # só um dos dois precise rodar nesta passada.
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
                        for i in range(6):
                            venceu = 1 if (i < 3 and res == 'victory') or (i >= 3 and res == 'defeat') else 0
                            id_t, nm_t = (t0_id, t0_nome) if i < 3 else (t1_id, t1_nome)
                            novas_picks.append([
                                pid, reg_final, ";".join(tags_list), ";".join(nicks_list),
                                brawlers_list[i], venceu, f"{venceu*100}.0%", modo, mapa,
                                momento, tags_list[i], nicks_list[i], id_t, nm_t, tipo_final
                            ])
                        ids_registrados.add(pid)

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

                except Exception: pass
        except Exception: pass

    if novas_picks:
        df_p = pd.DataFrame(novas_picks, columns=COLUNAS_PICKS)
        df_p.to_csv(ARQUIVO_BRUTO, mode='a', header=not os.path.exists(ARQUIVO_BRUTO), index=False)
        print(f"Salvo: {len(df_p)//6} jogos no {ARQUIVO_BRUTO}")
    
    if novos_bans:
        df_b = pd.DataFrame(novos_bans, columns=COLUNAS_BANS)
        df_b.to_csv(ARQUIVO_BANS, mode='a', header=not os.path.exists(ARQUIVO_BANS), index=False)
        print(f"Salvo: {len(novos_bans)} bans no {ARQUIVO_BANS}")
    
    if not novas_picks and not novos_bans: print("Nenhum dado novo.")

if __name__ == "__main__":
    minerar_dados()
