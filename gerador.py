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
        "#202GJJR28": {"nome": "Doritos", "id_time": "GLXY", "nome_time": "GALAXY"},
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
    
    # NOVA COLUNA 'tipo' INSERIDA
    colunas = ['id_partida', 'regiao', 'id_players', 'name_players', 'pick', 'win', 'win_rate', 'modo', 'mapa', 'data_adicao', 'player_tag', 'player_name', 'id_time', 'nome_time', 'tipo']
    
    if os.path.exists(ARQUIVO_BRUTO):
        try:
            df_existente = pd.read_csv(ARQUIVO_BRUTO, sep=',', dtype=str, keep_default_na=False)
            
            # Reparo automático do CSV antigo: se não tiver a coluna 'tipo', adiciona como 'unknown' e salva
            if 'tipo' not in df_existente.columns:
                df_existente['tipo'] = 'unknown'
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
                    
                    # Definição do Tipo (Scrim x Tournament)
                    tipo_partida_raw = battle.get('type', 'unknown').lower()
                    tipo_partida = 'scrim' if tipo_partida_raw == 'friendly' else 'tournament'

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
                        # Adicionando o tipo de partida no final da lista
                        novas_linhas.append([m_id, reg_final, ";".join(tags_list), ";".join(nicks_list), brawlers_list[i], venceu, f"{venceu*100}.0%", battle.get('mode', 'Unknown'), mapa, momento_revisao, tags_list[i], nicks_list[i], t0_id if i < 3 else t1_id, t0_nome if i < 3 else t1_nome, tipo_partida])
                    ids_registrados.add(m_id)
                    total_novas += 1
            except: continue

    if novas_linhas:
        df_novos = pd.DataFrame(novas_linhas, columns=colunas)
        df_novos.to_csv(ARQUIVO_BRUTO, mode='a', header=False, index=False, sep=',', encoding='utf-8')
        
    if os.path.exists(ARQUIVO_BRUTO):
        df_total = pd.read_csv(ARQUIVO_BRUTO, keep_default_na=False)
        df_total['win'] = pd.to_numeric(df_total['win'], errors='coerce').fillna(0)
        
        # Garante a coluna tipo para evitar erros
        if 'tipo' not in df_total.columns:
            df_total['tipo'] = 'unknown'
            
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
            # O GroupBy agora inclui 'tipo'
            consolidado = df_input.groupby(['modo', 'mapa', 'pick', 'ano', 'mes', 'tipo']).agg(picks=('win', 'count'), vitorias=('win', 'sum')).reset_index()
            totais_por_mapa = df_input.groupby(['modo', 'mapa', 'ano', 'mes', 'tipo'])['id_partida'].nunique().reset_index(name='total_partidas_mapa')
            consolidado = consolidado.merge(totais_por_mapa, on=['modo', 'mapa', 'ano', 'mes', 'tipo'], how='left')
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

        # 2. DETALHES DE CADA BRAWLER (MAPAS E SINERGIAS) - COM FILTROS INCLUSOS
        def gerar_detalhes_brawlers(df_input, path_json):
            detalhes = {}
            brawlers = df_input['pick'].unique()
            
            for brawler in brawlers:
                if pd.isna(brawler) or not brawler: continue
                    
                df_brawler = df_input[df_input['pick'] == brawler]
                
                # Agrupando Top Mapas por Ano, Mes e Tipo (JS fará a soma de acordo com o filtro)
                top_mapas_df = df_brawler.groupby(['mapa', 'modo', 'ano', 'mes', 'tipo']).size().reset_index(name='picks')
                top_mapas = top_mapas_df.to_dict(orient='records')
                
                # Sinergias
                df_aliados = df_input[df_input['id_partida'].isin(df_brawler['id_partida'])].copy()
                df_sinergia = df_aliados.merge(
                    df_brawler[['id_partida', 'win', 'player_tag', 'pick']], 
                    on='id_partida', 
                    suffixes=('', '_alvo')
                )
                
                df_sinergia = df_sinergia[
                    (df_sinergia['win'] == df_sinergia['win_alvo']) & 
                    (df_sinergia['player_tag'] != df_sinergia['player_tag_alvo']) &
                    (df_sinergia['pick'] != df_sinergia['pick_alvo'])
                ]
                
                sinergias = []
                if not df_sinergia.empty:
                    # Agrupando Sinergias por Ano, Mes e Tipo
                    sinergias_df = df_sinergia.groupby(['pick', 'ano', 'mes', 'tipo']).agg(
                        picks=('win', 'count'), 
                        vitorias=('win', 'sum')
                    ).reset_index()
                    sinergias_df = sinergias_df.rename(columns={'pick': 'com'})
                    sinergias = sinergias_df.to_dict(orient='records')
                
                detalhes[str(brawler).upper()] = {
                    "top_mapas": top_mapas,
                    "sinergias": sinergias
                }
                
            with open(path_json, 'w', encoding='utf-8') as f:
                json.dump(detalhes, f, ensure_ascii=False, indent=4)

        def gerar_detalhes_e_scrims(df_input, path_json, regiao_str):
            detalhes = {}
            # Agrupa Scrims por intervalo de 2 horas
            scrims_dict = {}
            
            # Analisa partida por partida para gerar Sinergias e Counters Corretos
            df_partidas = df_input.groupby('id_partida')
            for id_partida, grupo in df_partidas:
                t0 = grupo[grupo['id_time'] == grupo.iloc[0]['id_time']]
                t1 = grupo[grupo['id_time'] != grupo.iloc[0]['id_time']]
                
                if len(t0) == 0 or len(t1) == 0: continue
                
                vencedor_id = t0.iloc[0]['id_time'] if t0.iloc[0]['win'] == 1 else t1.iloc[0]['id_time']
                
                data_obj = datetime.strptime(grupo.iloc[0]['data_adicao'], '%d/%m/%Y %H:%M:%S')
                ano, mes = grupo.iloc[0]['ano'], grupo.iloc[0]['mes']
                
                # ------ LÓGICA DE SCRIMS (Agrupar partidas em 2h) ------
                time_a, time_b = sorted([t0.iloc[0]['id_time'], t1.iloc[0]['id_time']])
                chave_scrim = f"{ano}_{mes}_{data_obj.strftime('%d')}_{time_a}_{time_b}"
                
                if chave_scrim not in scrims_dict:
                    scrims_dict[chave_scrim] = {
                        "ano": ano, "mes": mes, "data": data_obj.strftime('%d/%m/%Y'),
                        "t1_id": t0.iloc[0]['id_time'], "t1_nome": t0.iloc[0]['nome_time'],
                        "t2_id": t1.iloc[0]['id_time'], "t2_nome": t1.iloc[0]['nome_time'],
                        "t1_score": 0, "t2_score": 0, "rounds": []
                    }
                
                # Se time 0 for o T1 do scrim group
                if t0.iloc[0]['id_time'] == scrims_dict[chave_scrim]['t1_id']:
                    if t0.iloc[0]['win'] == 1: scrims_dict[chave_scrim]['t1_score'] += 1
                    else: scrims_dict[chave_scrim]['t2_score'] += 1
                else:
                    if t1.iloc[0]['win'] == 1: scrims_dict[chave_scrim]['t1_score'] += 1
                    else: scrims_dict[chave_scrim]['t2_score'] += 1

                scrims_dict[chave_scrim]['rounds'].append({
                    "mapa": grupo.iloc[0]['mapa'],
                    "modo": grupo.iloc[0]['modo'],
                    "hora": data_obj.strftime('%H:%M'),
                    "t1_picks": t0['pick'].tolist(),
                    "t2_picks": t1['pick'].tolist()
                })
                # -----------------------------------------------------

                # LÓGICA DE COUNTERS E SINERGIAS
                tipo_p = grupo.iloc[0]['tipo']
                
                def alimentar_relacionamento(team_aliados, team_inimigos):
                    for _, p1 in team_aliados.iterrows():
                        brawler = p1['pick']
                        if brawler not in detalhes:
                            detalhes[brawler] = {"mapas": [], "sinergias": [], "oponentes": []}
                        
                        # Inimigos (Counters)
                        for _, p2 in team_inimigos.iterrows():
                            detalhes[brawler]["oponentes"].append({
                                "com": p2['pick'], "vitorias": int(p1['win']), "ano": ano, "mes": mes, "tipo": tipo_p, "picks": 1
                            })

                alimentar_relacionamento(t0, t1)
                alimentar_relacionamento(t1, t0)

            # Salvar JSON Brawlers
            with open(path_json, 'w', encoding='utf-8') as f:
                json.dump(detalhes, f, ensure_ascii=False)
                
            # Salvar JSON Scrims
            with open(f"api/stats/scrims_{regiao_str.lower()}.json", 'w', encoding='utf-8') as fs:
                json.dump(list(scrims_dict.values()), fs, ensure_ascii=False)

        # Chamar as funções durante o loop de extração:
        gerar_detalhes_e_scrims(df_stats, "api/stats/geral_brawlers_detail.json", "GERAL")
        for reg in regioes_validas:
            df_reg = df_stats[df_stats['regiao_list'] == reg]
            gerar_detalhes_e_scrims(df_reg, f"api/stats/{str(reg).lower()}_brawlers_detail.json", reg)

    print(f"\n✅ Concluído! Total de novas partidas: {total_novas}")

if __name__ == "__main__":
    minerar_dados()
