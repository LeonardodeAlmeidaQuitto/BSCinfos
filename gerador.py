import brawlstats
import pandas as pd
import os
import json
import collections
from datetime import datetime, timedelta, timezone

# --- CONFIGURAÇÃO ---
API_KEY = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjU0ODZlOGQxLTRkNWQtNDJmYy1iOWE3LWU5ODYyMWJhOWI0NSIsImlhdCI6MTc3ODUwODgwOCwic3ViIjoiZGV2ZWxvcGVyLzc0NjFhNGJkLThhZDctNjg2Mi0wOGVkLTJiYmEzMzAxMWE3NiIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiNDUuNzkuMjE4Ljc5Il0sInR5cGUiOiJjbGllbnQifV19.yvcSQalBqNz6Q6DjZWU5IL1XvBjn5DGckYvy2bgl5tjVeRJ2GMhY_I2JP1zdEeLAfEG2hGVJT7OMZro4kkegFA"

client = brawlstats.Client(API_KEY, base_url="https://bsproxy.royaleapi.dev/v1")

# --- DEFINIÇÃO DOS ARQUIVOS ---
ARQUIVO_BRUTO = "historico_bruto.csv"
ARQUIVO_FINAL = "estatisticas_finais.csv"

# 🌟 NOVA ESTRUTURA: Configuração de Times com 3 slots de ID/Nome por Equipe
REGIOES = {
    "SA": {
        "LOUD": [
            {"tag": "#2GV09VJJP", "nome": "LOUD|FireCrow"},
            {"tag": "#TAG_SA_1B", "nome": "PLAYER_1B"},
            {"tag": "#TAG_SA_1C", "nome": "PLAYER_1C"}
        ],
        "ELEVATE": [
            {"tag": "#CQLR0Y80", "nome": "ELV|Tufa"},
            {"tag": "#TAG_SA_2B", "nome": "PLAYER_2B"},
            {"tag": "#TAG_SA_2C", "nome": "PLAYER_2C"}
        ],
        "OLIMPO SQUAD": [
            {"tag": "#L9PQUV0YC", "nome": "OS|BrabaoBs"},
            {"tag": "#TAG_SA_3B", "nome": "PLAYER_3B"},
            {"tag": "#TAG_SA_3C", "nome": "PLAYER_3C"}
        ],
        "ACRE LOVERS": [
            {"tag": "#JQ8LLLY", "nome": "AL|FireMirillo"},
            {"tag": "#TAG_SA_4B", "nome": "PLAYER_4B"},
            {"tag": "#TAG_SA_4C", "nome": "PLAYER_4C"}
        ],
        "SKC": [
            {"tag": "#PR0P8QVQ", "nome": "SKC| Kr ;)"},
            {"tag": "#TAG_SA_5B", "nome": "PLAYER_5B"},
            {"tag": "#TAG_SA_5C", "nome": "PLAYER_5C"}
        ],
        "ETERNAL": [
            {"tag": "#R2LR2QLG", "nome": "ETN|Mohtep"},
            {"tag": "#TAG_SA_6B", "nome": "PLAYER_6B"},
            {"tag": "#TAG_SA_6C", "nome": "PLAYER_6C"}
        ],
        "ENOSIS SA": [
            {"tag": "#GJPVYUQG", "nome": "ENO|Deykonn"},
            {"tag": "#TAG_SA_7B", "nome": "PLAYER_7B"},
            {"tag": "#TAG_SA_7C", "nome": "PLAYER_7C"}
        ],
        "OCX": [
            {"tag": "#2P8RVJVUY", "nome": "OCX|Sterixx"},
            {"tag": "#TAG_SA_8B", "nome": "PLAYER_8B"},
            {"tag": "#TAG_SA_8C", "nome": "PLAYER_8C"}
        ],
        "ODISSEY": [
            {"tag": "#2QCCC29QV", "nome": "ODS|Magic"},
            {"tag": "#TAG_SA_9B", "nome": "PLAYER_9B"},
            {"tag": "#TAG_SA_9C", "nome": "PLAYER_9C"}
        ],
        "BOUNTY HUNTERS": [
            {"tag": "#PLLRJC2V", "nome": "BH|Wesley"},
            {"tag": "#TAG_SA_10B", "nome": "PLAYER_10B"},
            {"tag": "#TAG_SA_10C", "nome": "PLAYER_10C"}
        ],
        "TTPD": [
            {"tag": "#202GJJR28", "nome": "Doritos"},
            {"tag": "#TAG_SA_11B", "nome": "PLAYER_11B"},
            {"tag": "#TAG_SA_11C", "nome": "PLAYER_11C"}
        ],
        "CRECHE BRAWL": [
            {"tag": "#80VLPJCCC", "nome": "Tilo"},
            {"tag": "#TAG_SA_12B", "nome": "PLAYER_12B"},
            {"tag": "#TAG_SA_12C", "nome": "PLAYER_12C"}
        ]
    },
    "NA": {
        "ONLY REALM": [
            {"tag": "#LVRRYPV", "nome": "RLM|Bobby"}, 
            {"tag": "#NA_1B", "nome": "P1B"}, 
            {"tag": "#NA_1C", "nome": "P1C"}],
        ],
        "TRIBE": [
            {"tag": "#82RCQCVG", "nome": "TRB|Lxffy"}, 
            {"tag": "#NA_2B", "nome": "P2B"}, 
            {"tag": "#NA_2C", "nome": "P2C"}
        ],
        "TEAM ELEKTROS": [
            {"tag": "#YUJ8PJ0LR", "nome": "TE|Snoiy"}, 
            {"tag": "#NA_3B", "nome": "P3B"}, 
            {"tag": "#NA_3C", "nome": "P3C"}
        ],
        "ZOOS": [
            {"tag": "#VPVLG2", "nome": "ZOOS|Tyrant"}, 
            {"tag": "#NA_4B", "nome": "P4B"}, 
            {"tag": "#NA_4C", "nome": "P4C"}
        ]
    },
    "EMEA": {
        "FUT": [
            {"tag": "#9PCV9L982", "nome": "FUT|AngelBoy"}, 
            {"tag": "#EMEA_1B", "nome": "P1B"}, 
            {"tag": "#EMEA_1C", "nome": "P1C"}
        ],
        "BIG TALENTS": [
            {"tag": "#2208QGGGL", "nome": "BGT|Dompe"}, 
            {"tag": "#EMEA_2B", "nome": "P2B"}, 
            {"tag": "#EMEA_2C", "nome": "P2C"}
        ]
    },
    "EA": {
        "CR": [
            {"tag": "#9ULYPV8", "nome": "CR|Tensai"}, 
            {"tag": "#EA_1B", "nome": "P1B"}, 
            {"tag": "#EA_1C", "nome": "P1C"}
        ],
        "ZETA": [
            {"tag": "#P0Y8JGL0U", "nome": "ZETA|Battoman"}, 
            {"tag": "#EA_2B", "nome": "P2B"}, 
            {"tag": "#EA_2C", "nome": "P2C"}
        ]
    }
}

# Mapeamentos para busca reversa otimizada
TAG_PARA_REGIAO = {}
TAG_PARA_NOME = {}
TAG_PARA_TIME = {}

for reg, times in REGIOES.items():
    for time_nome, membros in times.items():
        for m in membros:
            tag = m["tag"]
            TAG_PARA_REGIAO[tag] = reg
            TAG_PARA_NOME[tag] = m["nome"]
            TAG_PARA_TIME[tag] = time_nome

def minerar_dados():
    fuso_brasilia = timezone(timedelta(hours=-3))
    momento_revisao = datetime.now(fuso_brasilia).strftime('%d/%m/%Y %H:%M:%S')
    
    print(f"🚀 Iniciando varredura via Proxy... Horário: {momento_revisao}")
    
    # Adicionadas colunas explícitas para rastrear o jogador dono daquela linha de pick
    colunas = ['id_partida', 'regiao', 'player_tag', 'player_name', 'id_players', 'name_players', 'pick', 'win', 'win_rate', 'modo', 'mapa', 'data_adicao']
    
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

    for sigla_busca, times in REGIOES.items():
        for time_nome, membros in times.items():
            for m in membros:
                tag_busca = m["tag"]
                # Ignora tags coringa/temporárias para não gerar erro na API
                if "TAG_SA_" in tag_busca or "NA_" in tag_busca or "EMEA_" in tag_busca or "EA_" in tag_busca:
                    continue
                
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
                                m_id, reg_final, tags_list[i], nicks_list[i], ";".join(tags_list), ";".join(nicks_list),
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

        # ── OPÇÃO 1: GENERATE CONSOLIDATED JSON (PLANILHA META) ──
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

        # ── OPÇÃO 2: CÁLCULO DE MAPAS E SINERGIAS (TELA BRAWLERS) ──
        print("📊 Processando Sinergias e Melhores Mapas...")
        brawler_mapas = {}
        brawler_companheiros = {}

        for id_part, grupo in df_total.groupby('id_partida'):
            if len(grupo) == 6:
                registros = grupo.to_dict('records')
                time1 = registros[0:3]
                time2 = registros[3:6]
                
                for t in [time1, time2]:
                    picks_time = [r['pick'].upper() for r in t]
                    mapa_atual = t[0]['mapa']
                    
                    for idx, r in enumerate(t):
                        brawler = r['pick'].upper()
                        vitoria = int(r['win'])
                        
                        # Processa mapas do brawler
                        if brawler not in brawler_mapas: brawler_mapas[brawler] = {}
                        if mapa_atual not in brawler_mapas[brawler]: brawler_mapas[brawler][mapa_atual] = {'picks': 0, 'wins': 0}
                        brawler_mapas[brawler][mapa_atual]['picks'] += 1
                        brawler_mapas[brawler][mapa_atual]['wins'] += vitoria
                        
                        # Processa companheiros (Sinergias)
                        if brawler not in brawler_companheiros: brawler_companheiros[brawler] = {}
                        for c_idx, comp in enumerate(picks_time):
                            if idx != c_idx:
                                brawler_companheiros[brawler][comp] = brawler_companheiros[brawler].get(comp, 0) + 1

        # Formata o output final dos brawlers
        brawlers_json_data = {}
        for brawler in brawler_mapas:
            melhor_mapa = "-"
            maior_wr = -1.0
            max_picks = 0
            
            for mapa, s in brawler_mapas[brawler].items():
                wr = s['wins'] / s['picks']
                if wr > maior_wr or (wr == maior_wr and s['picks'] > max_picks):
                    maior_wr = wr
                    max_picks = s['picks']
                    melhor_mapa = mapa
            
            # Ordena e filtra os top 5 companheiros com quem mais jogou junto
            top_sinergias = sorted(brawler_companheiros.get(brawler, {}).items(), key=lambda x: x[1], reverse=True)[:5]
            sinergias_lista = [item[0] for item in top_sinergias]
            
            brawlers_json_data[brawler] = {
                "melhor_mapa": melhor_mapa,
                "sinergias": sinergias_lista
            }

        with open('api/stats/brawlers_data.json', 'w', encoding='utf-8') as f:
            json.dump(brawlers_json_data, f, ensure_ascii=False, indent=4)

        # ── OPÇÃO 3: ESTRUTURAÇÃO DE TIMES E ROSTERS (TELA TIMES) ──
        print("👥 Processando Estrutura de Times e Histórico de Player Picks...")
        times_json_data = []
        
        for time_nome, membros in REGIOES["SA"].items():
            roster_lista = []
            picks_por_jogador = {}
            
            for m in membros:
                roster_lista.append({"nome": m["nome"], "tag": m["tag"]})
                
                # Coleta os picks históricos desse jogador específico no CSV
                df_player = df_total[df_total['player_tag'] == m["tag"]]
                contagem_picks = df_player.groupby('pick').size().to_dict()
                
                # Ordena os brawlers mais usados do maior para o menor
                picks_ordenados = sorted(contagem_picks.items(), key=lambda x: x[1], reverse=True)
                picks_por_jogador[m["tag"]] = [{"brawler": b, "qtd": qtd} for b, qtd in picks_ordenados]
                
            times_json_data.append({
                "nome_time": time_nome,
                "roster": roster_lista,
                "picks": picks_por_jogador
            })

        with open('api/stats/times_sa.json', 'w', encoding='utf-8') as f:
            json.dump(times_json_data, f, ensure_ascii=False, indent=4)

    print(f"\n✅ Concluído! Arquivos consolidados, sinergias e times gerados com sucesso.")

if __name__ == "__main__":
    minerar_dados()
