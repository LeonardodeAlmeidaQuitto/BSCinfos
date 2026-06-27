import brawlstats
import pandas as pd
import os
import json
from datetime import datetime, timedelta, timezone

# --- CONFIGURAÇÃO ---
API_KEY = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjU0ODZlOGQxLTRkNWQtNDJmYy1iOWE3LWU5ODYyMWJhOWI0NSIsImlhdCI6MTc3ODUwODgwOCwic3ViIjoiZGV2ZWxvcGVyLzc0NjFhNGJkLThhZDctNjg2Mi0wOGVkLTJiYmEzMzAxMWE3NiIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiNDUuNzkuMjE4Ljc5Il0sInR5cGUiOiJjbGllbnQifV19.yvcSQalBqNz6Q6DjZWU5IL1XvBjn5DGckYvy2bgl5tjVeRJ2GMhY_I2JP1zdEeLAfEG2hGVJT7OMZro4kkegFA"

client = brawlstats.Client(API_KEY, base_url="https://bsproxy.royaleapi.dev/v1")

ARQUIVO_BRUTO = "historico_bruto.csv"

REGIOES = {
    "SA": {
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
        "#VQ8YP9C0": {"nome": "JoeFav", "id_time": "LVLA", "nome_time": "LEVEL ACADEMY"}
    },
    "NA": {
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
        "#88PL8L2JC": {"nome": "David", "id_time": "ENONA", "nome_time": "ENOSIS NA"}
    },
    "EMEA": {
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
        "#82GG2RLQG": {"nome": "ZeyroX", "id_time": "FUTA", "nome_time": "FUT ACADEMY"}
    },
    "EA": {
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
}

TAG_PARA_REGIAO = {tag: reg for reg, lista in REGIOES.items() for tag in lista}
MAPA_JOGADORES = {tag: info for reg, lista in REGIOES.items() for tag, info in lista.items()}

def minerar_dados():
    fuso_brasilia = timezone(timedelta(hours=-3))
    momento_revisao = datetime.now(fuso_brasilia).strftime('%d/%m/%Y %H:%M:%S')
    
    colunas = ['id_partida', 'regiao', 'id_players', 'name_players', 'pick', 'win', 'win_rate', 'modo', 'mapa', 'data_adicao', 'player_tag', 'player_name', 'id_time', 'nome_time', 'tipo']
    
    if os.path.exists(ARQUIVO_BRUTO):
        try:
            df_existente = pd.read_csv(ARQUIVO_BRUTO, sep=',', dtype=str, keep_default_na=False)
            if 'tipo' not in df_existente.columns:
                df_existente['tipo'] = 'scrim'
                df_existente.to_csv(ARQUIVO_BRUTO, index=False)
            ids_registrados = set(df_existente['id_partida'].unique())
        except: ids_registrados = set()
    else:
        pd.DataFrame(columns=colunas).to_csv(ARQUIVO_BRUTO, index=False)
        ids_registrados = set()

    novas_linhas = []
    total_novas = 0

    for sigla_busca, jogadores in REGIOES.items():
        for tag_busca, info_busca in jogadores.items():
            try:
                logs = client.get_battle_logs(tag_busca)
                for entry in logs:
                    battle = entry.get('battle', {})
                    if 'ranked' in battle.get('type', '').lower(): continue
                    teams = battle.get('teams')
                    if not teams or len(teams) < 2: continue
                    
                    t0_tracked = [MAPA_JOGADORES[p['tag']] for p in teams[0] if p['tag'] in MAPA_JOGADORES]
                    t1_tracked = [MAPA_JOGADORES[p['tag']] for p in teams[1] if p['tag'] in MAPA_JOGADORES]
                    t0_id = t0_tracked[0]['id_time'] if t0_tracked else "OPONENTE_T0"
                    t0_nome = t0_tracked[0]['nome_time'] if t0_tracked else "DESCONHECIDO T0"
                    t1_id = t1_tracked[0]['id_time'] if t1_tracked else "OPONENTE_T1"
                    t1_nome = t1_tracked[0]['nome_time'] if t1_tracked else "DESCONHECIDO T1"
                    
                    all_players = teams[0] + teams[1]
                    tags_list = [p['tag'] for p in all_players]
                    brawlers_list = [p['brawler']['name'].upper() for p in all_players]
                    time_str = str(entry.get('battleTime'))
                    mapa = entry.get('event', {}).get('map', 'Unknown')
                    m_id = f"{time_str}_{mapa}_{'_'.join(tags_list)}_{'_'.join(brawlers_list)}"
                    
                    if m_id in ids_registrados: continue
                    nicks_list = [p.get('name', 'Unknown') for p in all_players]
                    reg_final = "/".join(sorted({TAG_PARA_REGIAO[t] for t in tags_list if t in TAG_PARA_REGIAO} or {sigla_busca}))
                    res = battle.get('result')

                    tipo_raw = battle.get('type', 'friendly').lower()
                    tipo_final = 'scrim' if 'friendly' in tipo_raw else 'tournament'

                    for i in range(6):
                        venceu = 1 if (i < 3 and res == 'victory') or (i >= 3 and res == 'defeat') else 0
                        novas_linhas.append([m_id, reg_final, ";".join(tags_list), ";".join(nicks_list), brawlers_list[i], venceu, f"{venceu*100}.0%", battle.get('mode', 'Unknown'), mapa, momento_revisao, tags_list[i], nicks_list[i], t0_id if i < 3 else t1_id, t0_nome if i < 3 else t1_nome, tipo_final])
                    ids_registrados.add(m_id)
                    total_novas += 1
            except: continue

    if novas_linhas:
        df_novos = pd.DataFrame(novas_linhas, columns=colunas)
        df_novos.to_csv(ARQUIVO_BRUTO, mode='a', header=False, index=False, sep=',', encoding='utf-8')
        
    print(f"✅ Sucesso! {total_novas} novas partidas adicionadas ao historico_bruto.csv.")

if __name__ == "__main__":
    minerar_dados()
