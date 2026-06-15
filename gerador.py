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
        "#2GV09VJJP": {"nome": "FireCrow", "id_time": "LOUD", "nome_time": "LOUD"},
        "#CQLR0Y80": {"nome": "Tufa", "id_time": "OCX", "nome_time": "OCX Division"},
        "#L9PQUV0YC": {"nome": "BrabaoBs", "id_time": "OS", "nome_time": "OLIMPO SQUAD"},
        "#JQ8LLLY": {"nome": "FireMirillo", "id_time": "AL", "nome_time": "ACRE LOVERS"},
        "#202GJJR28": {"nome": "Doritos", "id_time": "TTPD", "nome_time": "TOPA TUDO POR DINHEIRO"},
        "#PR0P8QVQ": {"nome": "Kr ;)", "id_time": "SKC", "nome_time": "SKCALALAS SA"},
        "#R2LR2QLG": {"nome": "Mohtep", "id_time": "PCNG", "nome_time": "PIZZA CONGELADA F/A"},
        "#80VLPJCCC": {"nome": "Tilo", "id_time": "CB", "nome_time": "CRECHE BRAWL"},
        "#GJPVYUQG": {"nome": "Deykonn", "id_time": "BLD", "nome_time": "BLD F/A"},
        "#2P8RVJVUY": {"nome": "Sterixx", "id_time": "FCS", "nome_time": "FCS F/A"},
        "#820JCJJG": {"nome": "Jxcccr", "id_time": "ZRT", "nome_time": "ZURITA GANG"},
        "#2QCCC29QV": {"nome": "Magic", "id_time": "ENO", "nome_time": "ENOSIS"}
    },
    "NA": {
        "#LVRRYPV": {"nome": "Bobby", "id_time": "RLM", "nome_time": "ONLY REALM"},
        "#82RCQCVG": {"nome": "Lxffy", "id_time": "TRB", "nome_time": "TRIBE GAMING"},
        "#YUJ8PJ0LR": {"nome": "Snoiy", "id_time": "TE", "nome_time": "TEAM ELEKTROS"},
        "#VPVLG2": {"nome": "Tyrant", "id_time": "HML", "nome_time": "F/A HOMELESS"},
        "#GVLRUG9Q": {"nome": "PaiN", "id_time": "NOVA", "nome_time": "NOVA"},
        "#QURVLPG": {"nome": "Ezlivi", "id_time": "VTC", "nome_time": "VATIC"},
        "#R9CCLP8Q": {"nome": "Rafiki", "id_time": "LGCY", "nome_time": "LEGACY"},
        "#28LUY98": {"nome": "OG", "id_time": "VIC", "nome_time": "VIC"},
        "#8UL0U08V": {"nome": "Winq", "id_time": "RLMA", "nome_time": "ONLY REALM Academy"},
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
    },
    "EA": {
        "#9ULYPV8": {"nome": "Tensai", "id_time": "CR", "nome_time": "CRAZY RACCOON"},
        "#P0Y8JGL0U": {"nome": "Battoman", "id_time": "ZETA", "nome_time": "ZETA DIVISION"},
        "#J99YU9QY": {"nome": "Kuru", "id_time": "SKCEA", "nome_time": "SKC EA"},
        "#2RQQ9PGC": {"nome": "Shigemyon", "id_time": "FG", "nome_time": "FG"},
        "#GJ9V99VJG": {"nome": "Clarx", "id_time": "DF", "nome_time": "DF"},
        "#82CJYJPG2": {"nome": "Yutapin", "id_time": "RVL", "nome_time": "RIVAL"},
        "#8J9GUJJVY": {"nome": "Melty", "id_time": "RC", "nome_time": "REJECT"},
        "#28PU0P9L0": {"nome": "Achapi", "id_time": "FL", "nome_time": "FENNEL"},
        "#28VP0G808": {"nome": "Koga", "id_time": "INS", "nome_time": "INSOMNIA"},
        "#89UUQLJCC": {"nome": "Toridesu", "id_time": "FZ", "nome_time": "FZ"},
        "#2LJVR0RQ8G": {"nome": "Engine", "id_time": "TL", "nome_time": "TOXIC LOTUS"}
    }
}

TAG_PARA_REGIAO = {tag: reg for reg, lista in REGIOES.items() for tag in lista}
MAPA_JOGADORES = {tag: info for reg, lista in REGIOES.items() for tag, info in lista.items()}

def minerar_dados():
    fuso_brasilia = timezone(timedelta(hours=-3))
    momento_revisao = datetime.now(fuso_brasilia).strftime('%d/%m/%Y %H:%M:%S')
    
    colunas = ['id_partida', 'regiao', 'id_players', 'name_players', 'pick', 'win', 'win_rate', 'modo', 'mapa', 'data_adicao', 'player_tag', 'player_name', 'id_time', 'nome_time']
    
    if os.path.exists(ARQUIVO_BRUTO):
        try:
            df_existente = pd.read_csv(ARQUIVO_BRUTO, sep=',', dtype=str, keep_default_na=False)
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

                    for i in range(6):
                        venceu = 1 if (i < 3 and res == 'victory') or (i >= 3 and res == 'defeat') else 0
                        novas_linhas.append([m_id, reg_final, ";".join(tags_list), ";".join(nicks_list), brawlers_list[i], venceu, f"{venceu*100}.0%", battle.get('mode', 'Unknown'), mapa, momento_revisao, tags_list[i], nicks_list[i], t0_id if i < 3 else t1_id, t0_nome if i < 3 else t1_nome])
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
                    return "2026", "ABRIL"
                dt = datetime.strptime(str(data_str).strip(), '%d/%m/%Y %H:%M:%S')
                meses_nome = ["JANEIRO", "FEVEREIRO", "MARÇO", "ABRIL", "MAIO", "JUNHO", "JULHO", "AGOSTO", "SETEMBRO", "OUTUBRO", "NOVEMBRO", "DEZEMBRO"]
                return str(dt.year), meses_nome[dt.month - 1]
            except:
                return "2026", "ABRIL"

        df_total['ano'] = df_total['data_adicao'].apply(lambda x: tratar_datas(x)[0])
        df_total['mes'] = df_total['data_adicao'].apply(lambda x: tratar_datas(x)[1])

        # --- GERAÇÃO DOS JSONs ---
        df_total['regiao_list'] = df_total['regiao'].str.split('/')
        df_stats = df_total.explode('regiao_list')
        os.makedirs('api/stats', exist_ok=True)

        def gerar_json_consolidado(df_input, path):
            consolidado = df_input.groupby(['modo', 'mapa', 'pick', 'ano', 'mes']).agg(picks=('win', 'count'), vitorias=('win', 'sum')).reset_index()
            totais_por_mapa = df_input.groupby(['modo', 'mapa', 'ano', 'mes'])['id_partida'].nunique().reset_index(name='total_partidas_mapa')
            consolidado = consolidado.merge(totais_por_mapa, on=['modo', 'mapa', 'ano', 'mes'], how='left')
            consolidado['total_partidas_mapa'] = consolidado['total_partidas_mapa'].fillna(1).astype(int)
            consolidado['win_rate'] = (consolidado['vitorias'] / consolidado['picks'] * 100).round(1).astype(str) + '%'
            consolidado['pick_rate'] = (consolidado['picks'] / consolidado['total_partidas_mapa'] * 100).round(1).astype(str) + '%'
            consolidado.to_json(path, orient='records', force_ascii=False)

        # 1. JSONs base de mapa / modos (geral + por região)
        gerar_json_consolidado(df_stats, 'api/stats/geral.json')
        regioes_validas = [r for r in df_stats['regiao_list'].unique() if r]
        for reg in regioes_validas:
            df_reg = df_stats[df_stats['regiao_list'] == reg]
            gerar_json_consolidado(df_reg, f"api/stats/{str(reg).lower()}.json")

        # 2. DETALHES DE CADA BRAWLER (MAPAS E SINERGIAS) - VERSÃO BLINDADA CONTRA ERROS
        def gerar_detalhes_brawlers(df_input, path_json):
            detalhes = {}
            brawlers = df_input['pick'].unique()
            
            for brawler in brawlers:
                if pd.isna(brawler) or not brawler:
                    continue
                    
                df_brawler = df_input[df_input['pick'] == brawler]
                
                # Top 3 Mapas & Modos
                top_mapas_df = df_brawler.groupby(['mapa', 'modo']).size().reset_index(name='picks')
                top_mapas = top_mapas_df.sort_values(by='picks', ascending=False).head(3).to_dict(orient='records')
                
                # Coleta estruturada de parceiros aliados (mesma id_partida)
                df_aliados = df_input[df_input['id_partida'].isin(df_brawler['id_partida'])].copy()
                
                # Merge blindando sufixos e filtrando apenas colunas estritamente necessárias
                df_sinergia = df_aliados.merge(
                    df_brawler[['id_partida', 'win', 'player_tag', 'pick']], 
                    on='id_partida', 
                    suffixes=('', '_alvo')
                )
                
                # Critérios de validação da sinergia:
                # Mesmo resultado do time (win == win_alvo)
                # Jogadores com tags distintas (player_tag != player_tag_alvo)
                # Brawlers parceiros distintos do brawler analisado (pick != pick_alvo)
                df_sinergia = df_sinergia[
                    (df_sinergia['win'] == df_sinergia['win_alvo']) & 
                    (df_sinergia['player_tag'] != df_sinergia['player_tag_alvo']) &
                    (df_sinergia['pick'] != df_sinergia['pick_alvo'])
                ]
                
                sinergias = []
                if not df_sinergia.empty:
                    sinergias_df = df_sinergia.groupby('pick').agg(
                        picks=('win', 'count'), 
                        vitorias=('win', 'sum')
                    ).reset_index()
                    
                    sinergias_df['win_rate'] = (sinergias_df['vitorias'] / sinergias_df['picks'] * 100).round(1).astype(str) + '%'
                    sinergias_df = sinergias_df.sort_values(by='picks', ascending=False).head(5)
                    sinergias_df = sinergias_df.rename(columns={'pick': 'com'})
                    sinergias = sinergias_df.to_dict(orient='records')
                
                detalhes[str(brawler).upper()] = {
                    "top_mapas": top_mapas,
                    "sinergias": sinergias
                }
                
            with open(path_json, 'w', encoding='utf-8') as f:
                json.dump(detalhes, f, ensure_ascii=False, indent=4)

        # Salva os detalhes dos brawlers para o Geral e para cada Região
        gerar_detalhes_brawlers(df_stats, 'api/stats/geral_brawlers_detail.json')
        for reg in regioes_validas:
            df_reg = df_stats[df_stats['regiao_list'] == reg]
            gerar_detalhes_brawlers(df_reg, f"api/stats/{str(reg).lower()}_brawlers_detail.json")

        # 3. GERAÇÃO DOS ARQUIVOS DE TIMES (INDIVIDUAIS + GERAL)
        def extrair_dados_times(df_input):
            times_dict = {}
            for tag in df_input['player_tag'].unique():
                if pd.isna(tag) or not tag or str(tag).lower() == 'nan': 
                    continue
                df_player = df_input[df_input['player_tag'] == tag]
                picks_counts = df_player['pick'].value_counts()
                times_dict[str(tag)] = [{"brawler": str(b), "qtd": int(q)} for b, q in picks_counts.items()]
            return times_dict

        # Salva o arquivo de times geral
        times_geral = extrair_dados_times(df_stats)
        with open("api/stats/times_geral.json", 'w', encoding='utf-8') as f:
            json.dump(times_geral, f, ensure_ascii=False, indent=4)

        # Salva os arquivos de times por região
        for regiao in regioes_validas:
            df_regiao = df_stats[df_stats['regiao_list'] == regiao]
            times_regiao = extrair_dados_times(df_regiao)
            nome_arquivo = f"api/stats/times_{str(regiao).lower()}.json"
            with open(nome_arquivo, 'w', encoding='utf-8') as f:
                json.dump(times_regiao, f, ensure_ascii=False, indent=4)

    print(f"\n✅ Concluído! Total de novas partidas: {total_novas}")

if __name__ == "__main__":
    minerar_dados()
