import brawlstats
import pandas as pd
import os
from datetime import datetime, timedelta, timezone # Adicionado timedelta e timezone

# --- CONFIGURAÇÃO ---
API_KEY = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjU0ODZlOGQxLTRkNWQtNDJmYy1iOWE3LWU5ODYyMWJhOWI0NSIsImlhdCI6MTc3ODUwODgwOCwic3ViIjoiZGV2ZWxvcGVyLzc0NjFhNGJkLThhZDctNjg2Mi0wOGVkLTJiYmEzMzAxMWE3NiIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiNDUuNzkuMjE4Ljc5Il0sInR5cGUiOiJjbGllbnQifV19.yvcSQalBqNz6Q6DjZWU5IL1XvBjn5DGckYvy2bgl5tjVeRJ2GMhY_I2JP1zdEeLAfEG2hGVJT7OMZro4kkegFA"

client = brawlstats.Client(API_KEY, base_url="https://bsproxy.royaleapi.dev/v1")

REGIOES = {

    "SA": {"#PLLRJC2V": "BH|Wesley",
           "#2GV09VJJP": "LOUD|FireCrow",
           "#CQLR0Y80": "ELV|Tufa",
           "#L9PQUV0YC": "OS|BrabaoBs",
           "#JQ8LLLY": "AL|FireMirillo",
           "#202GJJR28": "Doritos",
           "#PR0P8QVQ": "SKC| Kr ;)",
           "#R2LR2QLG": "ETN|Mohtep",
           "#80VLPJCCC": "Tilo",
           "#GJPVYUQG": "ENO|Deykonn",
           "#2P8RVJVUY": "OCX|Sterixx",
           "#2QCCC29QV": "ODS|Magic"},

    "NA": {"#LVRRYPV": "RLM|Bobby",
           "#82RCQCVG": "TRB|Lxffy",
           "#YUJ8PJ0LR": "TE|Snoiy",
           "#VPVLG2": "ZOOS|Tyrant",
           "#P8GVQ28": "Math",
           "#QURVLPG": "VTC|Ezlivi",
           "#R9CCLP8Q": "LGCY|Rafiki",
           "#28LUY98": "OG",
           "#82J2VLRQ": "Zhar",
           "#9PP0G2CG": "VIC|SecondBest",
           "#GCJCRVQ8": "STMN|Tacos",
           "#2G82CGU": "NAME|Zee"},

    "EMEA": {"#9PCV9L982": "FUT|AngelBoy",
             "#2208QGGGL": "BGT|Dompe",
             "#80PVPCC29": "NAVI|Enraged",
             "#9JRGJ0RY9": "MAD|Rup",
             "#YQUCCJ2": "HMB|Symantec",
             "#9LVUC2PY": "SK| Ope",
             "#PCPRPJV": "TH|IKaoss",
             "#CJ9YRGGC": "HK|Natrix",
             "#2Q892QVU": "TTM|Maru",
             "#9PQQ8GQQ": "NOVO|Filippo",
             "#2Y822YJYJC": "Decaii",  
             "#PLV89CGP": "BIG|Salty"},

    "EA": {"#9ULYPV8": "CR|Tensai",
           "#P0Y8JGL0U": "ZETA|Battoman",
           "#J99YU9QY": "SKCEA|Kuru",
           "#2RQQ9PGC": "FG|Shigemyon",
           "#GJ9V99VJG": "DF|Clarx",
           "#82CJYJPG2": "RVL|Yutapin",
           "#8J9GUJJVY": "RC|Melty",
           "#28PU0P9L0": "FL|Achapi",
           "#28VP0G808": "INS|Koga",
           "#89UUQLJCC": "FZ|Toridesu",
           "#2LJVR0RQ8G": "TL|Engine"} 

}

TAG_PARA_REGIAO = {tag: reg for reg, lista in REGIOES.items() for tag in lista}

def minerar_dados():
    # --- AJUSTE DE HORÁRIO (BRASÍLIA UTC-3) ---
    fuso_brasilia = timezone(timedelta(hours=-3))
    momento_revisao = datetime.now(fuso_brasilia).strftime('%d/%m/%Y %H:%M:%S')
    
    print(f"🚀 Iniciando varredura via Proxy (RoyaleAPI)... Horário: {momento_revisao}")
    
    colunas = ['id_partida', 'regiao', 'id_players', 'name_players', 'pick', 'win', 'win_rate', 'modo', 'mapa', 'data_adicao']
    
    if os.path.exists(ARQUIVO_BRUTO):
        try:
            df_existente = pd.read_csv(ARQUIVO_BRUTO, sep=',', dtype=str, keep_default_na=False)
            ids_registrados = set(df_existente['id_partida'].unique())
        except:
            ids_registrados = set()
    else:
        pd.DataFrame(columns=colunas).to_csv(ARQUIVO_BRUTO, index=False)
        ids_registrados = set()

    novas_linhas = []
    total_novas = 0

    for sigla_busca, jogadores in REGIOES.items():
        for tag_busca, nome_player in jogadores.items():
            try:
                logs = client.get_battle_logs(tag_busca)
                for entry in logs:
                    battle = entry.get('battle', {})
                    if 'ranked' in battle.get('type', '').lower(): continue
                    teams = battle.get('teams')
                    if not teams or len(teams) < 2: continue
                    
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

                    for i in range(6):
                        venceu = 1 if (i < 3 and res == 'victory') or (i >= 3 and res == 'defeat') else 0
                        novas_linhas.append([
                            m_id, reg_final, ";".join(tags_list), ";".join(nicks_list),
                            brawlers_list[i], venceu, f"{venceu*100}.0%", 
                            battle.get('mode', 'Unknown'), mapa, momento_revisao
                        ])
                    
                    ids_registrados.add(m_id)
                    total_novas += 1
            except: continue

    if novas_linhas:
        df_novos = pd.DataFrame(novas_linhas, columns=colunas)
        df_novos.to_csv(ARQUIVO_BRUTO, mode='a', header=False, index=False, sep=',', encoding='utf-8')
        
    if os.path.exists(ARQUIVO_BRUTO):
        df_total = pd.read_csv(ARQUIVO_BRUTO, keep_default_na=False)
        df_total['win'] = pd.to_numeric(df_total['win'], errors='coerce').fillna(0)
        df_total['regiao_list'] = df_total['regiao'].str.split('/')
        df_stats = df_total.explode('regiao_list')
        
        os.makedirs('api/stats', exist_ok=True)

        def gerar_json_consolidado(df_input, path):
            consolidado = df_input.groupby(['modo', 'mapa', 'pick']).agg(
                picks=('win', 'count'),
                vitorias=('win', 'sum')
            ).reset_index()
            consolidado['win_rate'] = (consolidado['vitorias'] / consolidado['picks'] * 100).round(1).astype(str) + '%'
            consolidado.to_json(path, orient='records')

        gerar_json_consolidado(df_stats, 'api/stats/geral.json')

        for reg in df_stats['regiao_list'].unique():
            if reg:
                df_reg = df_stats[df_stats['regiao_list'] == reg]
                gerar_json_consolidado(df_reg, f"api/stats/{str(reg).lower()}.json")

    print(f"\n✅ Concluído! Total de novas partidas: {total_novas}")

if __name__ == "__main__":
    minerar_dados()
