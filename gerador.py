import brawlstats
import pandas as pd
import os
import json
from datetime import datetime, timedelta, timezone

# --- CONFIGURAÇÃO ---
API_KEY = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjU0ODZlOGQxLTRkNWQtNDJmYy1iOWE3LWU5ODYyMWJhOWI0NSIsImlhdCI6MTc3ODUwODgwOCwic3ViIjoiZGV2ZWxvcGVyLzc0NjFhNGJkLThhZDctNjg2Mi0wOGVkLTJiYmEzMzAxMWE3NiIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiNDUuNzkuMjE4Ljc5Il0sInR5cGUiOiJjbGllbnQifV19.yvcSQalBqNz6Q6DjZWU5IL1XvBjn5DGckYvy2bgl5tjVeRJ2GMhY_I2JP1zdEeLAfEG2hGVJT7OMZro4kkegFA"

client = brawlstats.Client(API_KEY, base_url="https://bsproxy.royaleapi.dev/v1")

# --- DEFINIÇÃO DOS ARQUIVOS ---
ARQUIVO_BRUTO = "historico_bruto.csv"
ARQUIVO_FINAL = "estatisticas_finais.csv"

# --- ESTRUTURAÇÃO COMPLETA DOS TIMES E ID'S ---
REGIOES = {
    "SA": {
        "#PLLRJC2V": {"nome": "Wesley", "id_time": "BH", "nome_time": "BH "},
        "#2GV09VJJP": {"nome": "FireCrow", "id_time": "LOUD", "nome_time": "LOUD"},
        "#CQLR0Y80": {"nome": "Tufa", "id_time": "ELV", "nome_time": "ELV"},
        "#L9PQUV0YC": {"nome": "BrabaoBs", "id_time": "OS", "nome_time": "OS"},
        "#JQ8LLLY": {"nome": "FireMirillo", "id_time": "AL", "nome_time": "AL"},
        "#202GJJR28": {"nome": "Doritos", "id_time": "DOR", "nome_time": "DORITOS"},
        "#PR0P8QVQ": {"nome": "Kr ;)", "id_time": "SKC", "nome_time": "SKC SA"},
        "#R2LR2QLG": {"nome": "Mohtep", "id_time": "ETN", "nome_time": "ETN"},
        "#80VLPJCCC": {"nome": "Tilo", "id_time": "TILO", "nome_time": "CB"},
        "#GJPVYUQG": {"nome": "Deykonn", "id_time": "ENO", "nome_time": "ENO"},
        "#2P8RVJVUY": {"nome": "Sterixx", "id_time": "OCX", "nome_time": "OCX"},
        "#2QCCC29QV": {"nome": "Magic", "id_time": "ODS", "nome_time": "ODS"}
    },
    "NA": {
        "#LVRRYPV": {"nome": "Bobby", "id_time": "RLM", "nome_time": "RLM"},
        "#82RCQCVG": {"nome": "Lxffy", "id_time": "TRB", "nome_time": "TRB"},
        "#YUJ8PJ0LR": {"nome": "Snoiy", "id_time": "TE", "nome_time": "TE"},
        "#VPVLG2": {"nome": "Tyrant", "id_time": "ZOOS", "nome_time": "ZOOS"},
        "#P8GVQ28": {"nome": "Math", "id_time": "MATH", "nome_time": "MATH ESPORTS"},
        "#QURVLPG": {"nome": "Ezlivi", "id_time": "VTC", "nome_time": "VTC"},
        "#R9CCLP8Q": {"nome": "Rafiki", "id_time": "LGCY", "nome_time": "LGCY"},
        "#28LUY98": {"nome": "OG", "id_time": "OG", "nome_time": "OG"},
        "#82J2VLRQ": {"nome": "Zhar", "id_time": "ZHAR", "nome_time": "ZHAR"},
        "#9PP0G2CG": {"nome": "SecondBest", "id_time": "VIC", "nome_time": "VIC"},
        "#GCJCRVQ8": {"nome": "Tacos", "id_time": "STMN", "nome_time": "STMN"},
        "#2G82CGU": {"nome": "Zee", "id_time": "NAME", "nome_time": "NAME"}
    },
    "EMEA": {
        "#9PCV9L982": {"nome": "AngelBoy", "id_time": "FUT", "nome_time": "FUT"},
        "#2208QGGGL": {"nome": "Dompe", "id_time": "BGT", "nome_time": "BGT"},
        "#80PVPCC29": {"nome": "Enraged", "id_time": "NAVI", "nome_time": "NAVI"},
        "#9JRGJ0RY9": {"nome": "Rup", "id_time": "MAD", "nome_time": "MAD"},
        "#YQUCCJ2": {"nome": "Symantec", "id_time": "HMB", "nome_time": "HMBLE"},
        "#9LVUC2PY": {"nome": "Ope", "id_time": "SK", "nome_time": "SK"},
        "#PCPRPJV": {"nome": "IKaoss", "id_time": "TH", "nome_time": "TH"},
        "#CJ9YRGGC": {"nome": "Natrix", "id_time": "HK", "nome_time": "HK"},
        "#2Q892QVU": {"nome": "Maru", "id_time": "TTM", "nome_time": "TTM"},
        "#9PQQ8GQQ": {"nome": "Filippo", "id_time": "NOVO", "nome_time": "NOVO"},
        "#2Y822YJYJC": {"nome": "Decaii", "id_time": "DEC", "nome_time": "DECAII"},
        "#PLV89CGP": {"nome": "Salty", "id_time": "BIG", "nome_time": "BIG"}
    },
    "EA": {
        "#9ULYPV8": {"nome": "Tensai", "id_time": "CR", "nome_time": "CR"},
        "#P0Y8JGL0U": {"nome": "Battoman", "id_time": "ZETA", "nome_time": "ZETA"},
        "#J99YU9QY": {"nome": "Kuru", "id_time": "SKCEA", "nome_time": "SKC EA"},
        "#2RQQ9PGC": {"nome": "Shigemyon", "id_time": "FG", "nome_time": "FG"},
        "#GJ9V99VJG": {"nome": "Clarx", "id_time": "DF", "nome_time": "DF"},
        "#82CJYJPG2": {"nome": "Yutapin", "id_time": "RVL", "nome_time": "RVL"},
        "#8J9GUJJVY": {"nome": "Melty", "id_time": "RC", "nome_time": "RC"},
        "#28PU0P9L0": {"nome": "Achapi", "id_time": "FL", "nome_time": "FL"},
        "#28VP0G808": {"nome": "Koga", "id_time": "INS", "nome_time": "INS"},
        "#89UUQLJCC": {"nome": "Toridesu", "id_time": "FZ", "nome_time": "FZ"},
        "#2LJVR0RQ8G": {"nome": "Engine", "id_time": "TL", "nome_time": "TL"}
    }
}

TAG_PARA_REGIAO = {tag: reg for reg, lista in REGIOES.items() for tag in lista}
MAPA_JOGADORES = {tag: info for reg, lista in REGIOES.items() for tag, info in lista.items()}

def minerar_dados():
    fuso_brasilia = timezone(timedelta(hours=-3))
    momento_revisao = datetime.now(fuso_brasilia).strftime('%d/%m/%Y %H:%M:%S')
    
    print(f"🚀 Iniciando varredura via Proxy... Horário: {momento_revisao}")
    
    # NOVAS COLUNAS ADICIONADAS: player_tag, player_name, id_time, nome_time
    colunas = [
        'id_partida', 'regiao', 'id_players', 'name_players', 'pick', 'win', 'win_rate', 
        'modo', 'mapa', 'data_adicao', 'player_tag', 'player_name', 'id_time', 'nome_time'
    ]
    
    if os.path.exists(ARQUIVO_BRUTO):
        try:
            df_existente = pd.read_csv(ARQUIVO_BRUTO, sep=',', dtype=str, keep_default_na=False)
            # Atualiza colunas caso o arquivo antigo não tenha as novas
            for col in colunas:
                if col not in df_existente.columns:
                    df_existente[col] = ""
            ids_registrados = set(df_existente['id_partida'].unique())
        except:
            ids_registrados = set()
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
                    
                    # Identifica qual time mapeado está jogando na Team 0 ou Team 1
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

                    for i in range(6):
                        venceu = 1 if (i < 3 and res == 'victory') or (i >= 3 and res == 'defeat') else 0
                        
                        p_tag = tags_list[i]
                        p_name = nicks_list[i]
                        
                        # Define dinamicamente o ID do time com base no lado da partida (i < 3 é time 0)
                        id_time_linha = t0_id if i < 3 else t1_id
                        nome_time_linha = t0_nome if i < 3 else t1_nome

                        novas_linhas.append([
                            m_id, reg_final, ";".join(tags_list), ";".join(nicks_list),
                            brawlers_list[i], venceu, f"{venceu*100}.0%", 
                            battle.get('mode', 'Unknown'), mapa, momento_revisao,
                            p_tag, p_name, id_time_linha, nome_time_linha
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
        
        def tratar_datas(data_str):
            try:
                if not data_str or "antig" in str(data_str).lower():
                    return "ANTIGO", "ANTIGO"
                dt = datetime.strptime(str(data_str).strip(), '%d/%m/%Y %H:%M:%S')
                meses_nome = ["JANEIRO", "FEVEREIRO", "MARÇO", "ABRIL", "MAIO", "JUNHO", "JULHO", "AGOSTO", "SETEMBRO", "OUTUBRO", "NOVEMBRO", "DEZEMBRO"]
                return str(dt.year), meses_nome[dt.month - 1]
            except:
                return "OUTRO", "OUTRO"

        df_total['ano'] = df_total['data_adicao'].apply(lambda x: tratar_datas(x)[0])
        df_total['mes'] = df_total['data_adicao'].apply(lambda x: tratar_datas(x)[1])

        df_total['regiao_list'] = df_total['regiao'].str.split('/')
        df_stats = df_total.explode('regiao_list')
        
        os.makedirs('api/stats', exist_ok=True)

        def gerar_json_consolidado(df_input, path):
            consolidado = df_input.groupby(['modo', 'mapa', 'pick', 'ano', 'mes']).agg(
                picks=('win', 'count'),
                vitorias=('win', 'sum')
            ).reset_index()
            consolidado['win_rate'] = (consolidado['vitorias'] / consolidado['picks'] * 100).round(1).astype(str) + '%'
            consolidado.to_json(path, orient='records', force_ascii=False)

        gerar_json_consolidado(df_stats, 'api/stats/geral.json')

        for reg in df_stats['regiao_list'].unique():
            if reg:
                df_reg = df_stats[df_stats['regiao_list'] == reg]
                gerar_json_consolidado(df_reg, f"api/stats/{str(reg).lower()}.json")

        # 🌟 COMPILAÇÃO AUTOMÁTICA DO TIMES_SA.JSON PARA O DASHBOARD
        df_times_validos = df_total[
            (df_total['id_time'] != "") & 
            (~df_total['id_time'].str.contains('OPONENTE', na=True))
        ]
        
        times_sa_data = []
        if not df_times_validos.empty:
            for t_id, df_time in df_times_validos.groupby('id_time'):
                t_nome = str(df_time['nome_time'].iloc[0]).upper()
                roster = []
                picks_history = {}

                jogadores_grupo = df_time.groupby(['player_tag', 'player_name']).size().reset_index()
                for _, r_jog in jogadores_grupo.iterrows():
                    tag_j = r_jog['player_tag']
                    nome_j = r_jog['player_name']
                    roster.append({"nome": nome_j, "tag": tag_j})

                    df_p = df_time[df_time['player_tag'] == tag_j]
                    p_counts = df_p['pick'].value_counts().reset_index()
                    p_counts.columns = ['brawler', 'qtd']
                    picks_history[tag_j] = [
                        {"brawler": str(row_p['brawler']).upper(), "qtd": int(row_p['qtd'])} 
                        for _, row_p in p_counts.iterrows()
                    ]

                times_sa_data.append({
                    "id_time": str(t_id),
                    "nome_time": t_nome,
                    "roster": roster,
                    "picks": picks_history
                })

            with open('api/stats/times_sa.json', 'w', encoding='utf-8') as f:
                json.dump(times_sa_data, f, ensure_ascii=False, indent=4)
            print("✓ Arquivo api/stats/times_sa.json atualizado com sucesso!")

    print(f"\n✅ Concluído! Total de novas partidas: {total_novas}")

if __name__ == "__main__":
    minerar_dados()
