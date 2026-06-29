import requests
import pandas as pd
import os
import json
from datetime import datetime, timedelta, timezone

# =============================================================================
# CONFIGURAÇÃO GERAL
# =============================================================================
API_KEY = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjU0ODZlOGQxLTRkNWQtNDJmYy1iOWE3LWU5ODYyMWJhOWI0NSIsImlhdCI6MTc3ODUwODgwOCwic3ViIjoiZGV2ZWxvcGVyLzc0NjFhNGJkLThhZDctNjg2Mi0wOGVkLTJiYmEzMzAxMWE3NiIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiNDUuNzkuMjE4Ljc5Il0sInR5cGUiOiJjbGllbnQifV19.yvcSQalBqNz6Q6DjZWU5IL1XvBjn5DGck"

ARQUIVO_BRUTO = "historico_bruto.csv"
ARQUIVO_BANS = "historico_bans.csv"

COLUNAS_PICKS = [
    "id_partida", "regiao", "id_players", "name_players", "pick", "win", 
    "win_rate", "modo", "mapa", "data_adicao", "player_tag", "player_name", 
    "id_time", "nome_time", "tipo"
]

COLUNAS_BANS = [
    "id_partida", "regiao", "mapa", "modo", "id_time", "nome_time", 
    "brawler", "data_adicao", "tipo"
]

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

TAG_PARA_REGIAO = {tag: info["regiao"] for tag, info in MAPEAMENTO_PLAYERS.items()}

# =============================================================================
# FUNÇÕES AUXILIARES
# =============================================================================
def obter_fuso_brasilia():
    return timezone(timedelta(hours=-3))

def formatar_data_brawl(battle_time_str):
    try:
        dt = datetime.strptime(battle_time_str, "%Y%m%dT%H%M%S.%fZ").replace(tzinfo=timezone.utc)
        dt_br = dt.astimezone(obter_fuso_brasilia())
        return dt_br.strftime("%d/%m/%Y %H:%M:%S")
    except:
        dt_agora = datetime.now(obter_fuso_brasilia())
        return dt_agora.strftime("%d/%m/%Y %H:%M:%S")

def nome_brawler(b):
    if isinstance(b, str): 
        return b.upper()
    if isinstance(b, dict):
        return str(b.get('brawler') or b.get('brawlerName') or b.get('name') or 'UNKNOWN').upper()
    return 'UNKNOWN'

# =============================================================================
# CARREGAMENTO DE BANCO DE DADOS EXISTENTE (PREVENÇÃO DE DUPLICADAS)
# =============================================================================
ids_registrados = set()
if os.path.exists(ARQUIVO_BRUTO):
    try:
        df_existente = pd.read_csv(ARQUIVO_BRUTO)
        if not df_existente.empty and "id_partida" in df_existente.columns:
            ids_registrados = set(df_existente["id_partida"].dropna().astype(str).unique())
    except Exception as e:
        print(f"Aviso ao ler {ARQUIVO_BRUTO}: {e}")

ids_bans = set()
if os.path.exists(ARQUIVO_BANS):
    try:
        df_bans_existente = pd.read_csv(ARQUIVO_BANS)
        if not df_bans_existente.empty and "id_partida" in df_bans_existente.columns:
            ids_bans = set(df_bans_existente["id_partida"].dropna().astype(str).unique())
    except Exception as e:
        print(f"Aviso ao ler {ARQUIVO_BANS}: {e}")

# =============================================================================
# MINERAÇÃO PRINCIPAL VIA API
# =============================================================================
novas_picks = []
novos_bans = []
total_jogos = 0

headers = {"Authorization": f"Bearer {API_KEY}"}

for tag_busca in MAPEAMENTO_PLAYERS.keys():
    sigla_busca = MAPEAMENTO_PLAYERS[tag_busca]["regiao"]
    tag_url = tag_busca.replace("#", "%23")
    url = f"https://api.brawlstars.com/v1/players/{tag_url}/battlelog"
    
    try:
        response = requests.get(url, headers=headers, timeout=15)
        if response.status_code != 200:
            continue
        
        dados_api = response.json()
        partidas = dados_api.get("items", [])
        
        for item in partidas:
            try:
                battle = item.get("battle", {})
                teams = battle.get("teams", [])
                
                # Garante que é um modo 3v3 competitivo válido
                if len(teams) != 2 or len(teams[0]) != 3 or len(teams[1]) != 3:
                    continue
                
                mapa = item.get("event", {}).get("map", "Unknown")
                modo = item.get("event", {}).get("mode", "Unknown")
                battle_time = item.get("battleTime")
                momento = formatar_data_brawl(battle_time)
                
                # Organização de Players e Brawlers
                team_0 = teams[0]
                team_1 = teams[1]
                all_players = team_0 + team_1
                
                tags_list = [p.get('tag', '') for p in all_players]
                nicks_list = [p.get('name', 'Unknown') for p in all_players]
                brawlers_list = [nome_brawler(p.get('brawler', {})) for p in all_players]
                
                # Identificação de Tipo (Scrim vs Tournament)
                tipo_raw = battle.get('type', 'friendly').lower()
                tipo_final = 'scrim' if 'friendly' in tipo_raw else 'tournament'
                
                # Definição Única da Partida ID
                time_str = battle_time.split(".")[0] if battle_time else "00000000T000000"
                pid = f"{time_str}_{mapa}_{'_'.join(tags_list)}_{'_'.join(brawlers_list)}"
                
                # Atribuição Regional Dinâmica
                reg_final = "/".join(sorted({TAG_PARA_REGIAO[t] for t in tags_list if t in TAG_PARA_REGIAO} or {sigla_busca}))
                
                # Identifica os metadados de times locais envolvidos
                t0_id, t0_nome = "OPONENTE_T0", "DESCONHECIDO T0"
                t1_id, t1_nome = "OPONENTE_T1", "DESCONHECIDO T1"
                
                for p in team_0:
                    ptag = p.get('tag')
                    if ptag in MAPEAMENTO_PLAYERS:
                        t0_id = MAPEAMENTO_PLAYERS[ptag]["id_time"]
                        t0_nome = MAPEAMENTO_PLAYERS[ptag]["nome_time"]
                        break
                        
                for p in team_1:
                    ptag = p.get('tag')
                    if ptag in MAPEAMENTO_PLAYERS:
                        t1_id = MAPEAMENTO_PLAYERS[ptag]["id_time"]
                        t1_nome = MAPEAMENTO_PLAYERS[ptag]["nome_time"]
                        break

                # 1. PROCESSAMENTO DE PICKS (Se for ID novo)
                if pid not in ids_registrados:
                    res = battle.get('result')
                    
                    for i in range(6):
                        # Se index < 3 pertence ao Team 0, senão Team 1
                        venceu = 1 if (i < 3 and res == 'victory') or (i >= 3 and res == 'defeat') else 0
                        
                        id_time_atual = t0_id if i < 3 else t1_id
                        nome_time_atual = t0_nome if i < 3 else t1_nome
                        
                        novas_picks.append([
                            pid, reg_final, ";".join(tags_list), ";".join(nicks_list), 
                            brawlers_list[i], venceu, f"{venceu*100}.0%", modo, mapa, 
                            momento, tags_list[i], nicks_list[i], id_time_atual, 
                            nome_time_atual, tipo_final
                        ])
                        
                    ids_registrados.add(pid)
                    total_jogos += 1

                # 2. PROCESSAMENTO DE BANS (Se houver bans e o ID de ban for novo)
                if pid not in ids_bans:
                    # Captura bans direto da API (comum em Power Match / Amistoso competitivo)
                    bans_raw = battle.get('bans', [])
                    
                    bans_a_raw, bans_b_raw = [], []
                    if bans_raw:
                        # Distribuição padrão de bans estruturados ou alternados se lista flat
                        if isinstance(bans_raw, list):
                            if len(bans_raw) <= 2:
                                # 1 ban para cada lado
                                if len(bans_raw) > 0: bans_a_raw.append(bans_raw[0])
                                if len(bans_raw) > 1: bans_b_raw.append(bans_raw[1])
                            else:
                                # Divide metade/metade ou se houver indicação
                                meio = len(bans_raw) // 2
                                bans_a_raw = bans_raw[:meio]
                                bans_b_raw = bans_raw[meio:]
                    
                    for b in bans_a_raw:
                        novos_bans.append([pid, reg_final, mapa, modo, t0_id, t0_nome, nome_brawler(b), momento, tipo_final])
                    for b in bans_b_raw:
                        novos_bans.append([pid, reg_final, mapa, modo, t1_id, t1_nome, nome_brawler(b), momento, tipo_final])
                        
                    if bans_a_raw or bans_b_raw:
                        ids_bans.add(pid)

            except Exception as e:
                continue
    except Exception as e:
        continue

# =============================================================================
# SALVAMENTO EM ARQUIVO (APPEND SEGURO)
# =============================================================================
if novas_picks:
    df_novas_picks = pd.DataFrame(novas_picks, columns=COLUNAS_PICKS)
    if not os.path.exists(ARQUIVO_BRUTO):
        df_novas_picks.to_csv(ARQUIVO_BRUTO, index=False, encoding='utf-8')
    else:
        df_novas_picks.to_csv(ARQUIVO_BRUTO, mode='a', header=False, index=False, encoding='utf-8')
    print(f"OK Matcherino/API: {total_jogos} novos jogos salvos em {ARQUIVO_BRUTO}.")

if novos_bans:
    df_novos_bans = pd.DataFrame(novos_bans, columns=COLUNAS_BANS)
    if not os.path.exists(ARQUIVO_BANS):
        df_novos_bans.to_csv(ARQUIVO_BANS, index=False, encoding='utf-8')
    else:
        df_novos_bans.to_csv(ARQUIVO_BANS, mode='a', header=False, index=False, encoding='utf-8')
    print(f"OK Bans: {len(novos_bans)} novos registros de bans salvos em {ARQUIVO_BANS}.")
