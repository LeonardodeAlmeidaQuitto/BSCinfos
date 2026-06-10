import brawlstats
import pandas as pd
import os
from datetime import datetime, timedelta, timezone
import itertools
from collections import defaultdict

# --- CONFIGURAÇÃO ---
# Substitua pela sua NOVA CHAVE gerada com o IP 45.79.218.79
API_KEY = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjU0ODZlOGQxLTRkNWQtNDJmYy1iOWE3LWU5ODYyMWJhOWI0NSIsImlhdCI6MTc3ODUwODgwOCwic3ViIjoiZGV2ZWxvcGVyLzc0NjFhNGJkLThhZDctNjg2Mi0wOGVkLTJiYmEzMzAxMWE3NiIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiNDUuNzkuMjE4Ljc5Il0sInR5cGUiOiJjbGllbnQifV19.yvcSQalBqNz6Q6DjZWU5IL1XvBjn5DGckYvy2bgl5tjVeRJ2GMhY_I2JP1zdEeLAfEG2hGVJT7OMZro4kkegFA"

client = brawlstats.Client(API_KEY, base_url="https://bsproxy.royaleapi.dev/v1")

# --- DEFINIÇÃO DOS ARQUIVOS ---
ARQUIVO_BRUTO = "historico_bruto.csv"
ARQUIVO_FINAL = "estatisticas_finais.csv"

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
    fuso_brasilia = timezone(timedelta(hours=-3))
    momento_revisao = datetime.now(fuso_brasilia).strftime('%d/%m/%Y %H:%M:%S')
    
    print(f"🚀 Iniciando varredura via Proxy... Horário: {momento_revisao}")
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

        # 🌟 NOVO: Tratamento dinâmico da coluna data_adicao para gerar Ano e Mês estruturados
        def tratar_datas(data_str):
            try:
                if not data_str or "antig" in str(data_str).lower():
                    return "ANTIGO", "ANTIGO"
                # Converte o padrão do CSV "28/05/2026 11:22:39"
                dt = datetime.strptime(str(data_str).strip(), '%d/%m/%Y %H:%M:%S')
                # Mapeia números de meses para nomes legíveis em português se desejar, ou mantém número
                meses_nome = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]
                return str(dt.year), meses_nome[dt.month - 1].upper()
            except:
                return "OUTRO", "OUTRO"

        # Cria as colunas separadas antes de agrupar
        df_total['ano'] = df_total['data_adicao'].apply(lambda x: tratar_datas(x)[0])
        df_total['mes'] = df_total['data_adicao'].apply(lambda x: tratar_datas(x)[1])

        df_total['regiao_list'] = df_total['regiao'].str.split('/')
        df_stats = df_total.explode('regiao_list')
        
        os.makedirs('api/stats', exist_ok=True)

        # Atualizado para incluir 'ano' e 'mes' no groupby
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

# --- [ADICIONE OU SUBSTITUA ESTA FUNÇÃO DENTRO DO SEU GERADOR.PY] ---

def gerar_dados_com_pick_rate_e_detalhes_sa(csv_path):
    # Carrega o histórico bruto
    df = pd.read_csv(csv_path)
    
    # Tratamento de datas simplificado para agrupamento
    def obter_ano_mes(data_str):
        if str(data_str).strip().lower() == 'antiga' or pd.isna(data_str):
            return "2026", "ABRIL"
        try:
            dt = pd.to_datetime(data_str, format='%d/%m/%m %H:%M:%S', errors='coerce')
            if pd.isna(dt):
                dt = pd.to_datetime(data_str, errors='coerce')
            meses_pt = {1: "JANEIRO", 2: "FEVEREIRO", 3: "MARÇO", 4: "ABRIL", 5: "MAIO", 6: "JUNHO",
                        7: "JULHO", 8: "AGOSTO", 9: "SETEMBRO", 10: "OUTUBRO", 11: "NOVEMBRO", 12: "DEZEMBRO"}
            return str(dt.year), meses_pt.get(dt.month, "ABRIL")
        except:
            return "2026", "ABRIL"

    df['ano'] = df['data_adicao'].apply(lambda x: obter_ano_mes(x)[0])
    df['mes'] = df['data_adicao'].apply(lambda x: obter_ano_mes(x)[1])
    
    # --- 1. CÁLCULO DO PICK RATE PARA O META GERAL ---
    df['regiao_list'] = df['regiao'].str.split('/')
    df_stats = df.explode('regiao_list')
    
    # Total de partidas únicas por mapa/modo/mês/região (com base no id_partida único)
    partidas_totais = df_stats.groupby(['regiao_list', 'modo', 'mapa', 'ano', 'mes'])['id_partida'].nunique().reset_index(name='total_partidas')
    
    # Agrupamento por Brawler
    consolidado = df_stats.groupby(['regiao_list', 'modo', 'mapa', 'pick', 'ano', 'mes']).agg(
        picks=('win', 'count'),
        vitorias=('win', 'sum')
    ).reset_index()
    
    # Merge com totais para obter o Pick Rate exato
    consolidado = consolidado.merge(partidas_totais, on=['regiao_list', 'modo', 'mapa', 'ano', 'mes'])
    consolidado['win_rate'] = (consolidado['vitorias'] / consolidado['picks'] * 100).round(1).astype(str) + '%'
    consolidado['pick_rate'] = (consolidado['picks'] / consolidado['total_partidas'] * 100).round(1).astype(str) + '%'
    
    # Salva os arquivos regionais atualizados com a nova coluna pick_rate
    os.makedirs('api/stats', exist_ok=True)
    for reg, group in consolidado.groupby('regiao_list'):
        group.drop(columns=['regiao_list']).to_json(f'api/stats/{reg.lower()}.json', orient='records', force_ascii=False)

    # --- 2. GERAÇÃO DOS DETALHES DE BRAWLERS EXCLUSIVOS DA REGIAO SA ---
    df_sa = df[df['regiao'].str.contains('SA', na=False)].copy()
    brawlers_sa = df_sa['pick'].unique()
    
    detalhes_brawlers = {}
    
    # A. Top 3 Mapas e Modos
    mapas_brawler = df_sa.groupby(['pick', 'modo', 'mapa']).size().reset_index(name='picks')
    
    # B. Sinergias (Top 5 companheiros de equipe mais usados juntos)
    # Agrupa brawlers que jogaram no MESMO time (mesmo id_partida e mesmo resultado de vitória/derrota)
    times = df_sa.groupby(['id_partida', 'win'])['pick'].apply(list).reset_index()
    par_stats = defaultdict(lambda: {'picks': 0, 'vitorias': 0})
    
    for _, row in times.iterrows():
        lista_brawlers = sorted(list(set(row['pick'])))
        venceu = int(row['win'])
        if len(lista_brawlers) > 1:
            for b1, b2 in itertools.combinations(lista_brawlers, 2):
                par_stats[(b1, b2)]['picks'] += 1
                if venceu == 1:
                    par_stats[(b1, b2)]['vitorias'] += 1

    sinergias_por_brawler = defaultdict(list)
    for (b1, b2), stats in par_stats.items():
        wr = round((stats['vitorias'] / stats['picks']) * 100, 1) if stats['picks'] > 0 else 0.0
        sinergias_por_brawler[b1].append({'com': b2, 'picks': stats['picks'], 'vitorias': stats['vitorias'], 'win_rate': f"{wr}%"})
        sinergias_por_brawler[b2].append({'com': b1, 'picks': stats['picks'], 'vitorias': stats['vitorias'], 'win_rate': f"{wr}%"})

    # Compila tudo no dicionário final
    for brawler in brawlers_sa:
        # Filtra top 3 mapas
        top_mapas = mapas_brawler[mapas_brawler['pick'] == brawler].sort_values(by='picks', ascending=False).head(3)
        lista_mapas = []
        for _, r_mapa in top_mapas.iterrows():
            lista_mapas.append({
                'modo': r_mapa['modo'],
                'mapa': r_mapa['mapa'],
                'picks': int(r_mapa['picks'])
            })
            
        # Filtra top 5 sinergias
        top_sinergias = sorted(sinergias_por_brawler[brawler], key=lambda x: x['picks'], reverse=True)[:5]
        
        detalhes_brawlers[brawler.upper()] = {
            'top_mapas': lista_mapas,
            'sinergias': top_sinergias
        }
        
    # Salva o arquivo final de detalhes dos brawlers
    import json
    with open('api/stats/sa_brawlers_detail.json', 'w', encoding='utf-8') as f:
        json.dump(detalhes_brawlers, f, ensure_ascii=False, indent=4)

# Executa a função
gerar_dados_com_pick_rate_e_detalhes_sa('historico_bruto.csv')

    print(f"\n✅ Concluído! Total de novas partidas: {total_novas}")

if __name__ == "__main__":
    minerar_dados()
