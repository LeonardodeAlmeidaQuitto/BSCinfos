import brawlstats
import pandas as pd
import os
from datetime import datetime, timedelta, timezone

# --- CONFIGURAÇÃO ---
# A chave da API do Brawl Stars é lida da variável de ambiente BRAWL_API_KEY.
# NUNCA coloque a chave diretamente no código: use um secret (GitHub Actions)
# ou uma variável de ambiente local.
API_KEY = os.environ.get("BRAWL_API_KEY", "")
if not API_KEY:
    raise SystemExit(
        "ERRO: variável de ambiente BRAWL_API_KEY não definida. "
        "Defina-a antes de rodar (ex.: export BRAWL_API_KEY=...) ou configure "
        "o secret BRAWL_API_KEY no repositório do GitHub."
    )

client = brawlstats.Client(API_KEY, base_url="https://bsproxy.royaleapi.dev/v1")

# --- DEFINIÇÃO DOS ARQUIVOS EXCLUSIVOS DO TEAM ---
ARQUIVO_BRUTO_TEAM = "teams_partidas.csv"

CATEGORIAS = {
    "PLAYER": {
        "#SUATAG1": "SeuNome1",
        "#SUATAG2": "SeuNome2",
        "#SUATAG3": "SeuNome3"
    },
    "COACH": {
        "#SUATAG4": "SeuCoach1",
        "#SUATAG5": "SeuCoach2"
    }
}

TAG_PARA_CATEGORIA = {tag: cat for cat, lista in CATEGORIAS.items() for tag in lista}

def minerar_dados_team():
    # Ajuste de Horário Brasília
    fuso_brasilia = timezone(timedelta(hours=-3))
    momento_revisao = datetime.now(fuso_brasilia).strftime('%d/%m/%Y %H:%M:%S')
    
    print(f"🚀 Iniciando varredura do TEAM via Proxy... Horário: {momento_revisao}")
    
    colunas = ['id_partida', 'categoria', 'id_players', 'name_players', 'pick', 'win', 'win_rate', 'modo', 'mapa', 'data_adicao']
    
    # Verifica ou cria o arquivo bruto exclusivo de times
    if os.path.exists(ARQUIVO_BRUTO_TEAM):
        try:
            df_existente = pd.read_csv(ARQUIVO_BRUTO_TEAM, sep=',', dtype=str, keep_default_na=False)
            ids_registrados = set(df_existente['id_partida'].unique())
        except:
            ids_registrados = set()
    else:
        pd.DataFrame(columns=colunas).to_csv(ARQUIVO_BRUTO_TEAM, index=False)
        ids_registrados = set()

    novas_linhas = []
    total_novas = 0

    for cat_busca, jogadores in CATEGORIAS.items():
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
                    # Vincula a partida à categoria (PLAYER ou COACH) com base nas tags mapeadas
                    cat_final = "/".join(sorted({TAG_PARA_CATEGORIA[t] for t in tags_list if t in TAG_PARA_CATEGORIA} or {cat_busca}))
                    res = battle.get('result')

                    for i in range(6):
                        venceu = 1 if (i < 3 and res == 'victory') or (i >= 3 and res == 'defeat') else 0
                        novas_linhas.append([
                            m_id, cat_final, ";".join(tags_list), ";".join(nicks_list),
                            brawlers_list[i], venceu, f"{venceu*100}.0%", 
                            battle.get('mode', 'Unknown'), mapa, momento_revisao
                        ])
                    
                    ids_registrados.add(m_id)
                    total_novas += 1
            except:
                continue

    if novas_linhas:
        df_novos = pd.DataFrame(novas_linhas, columns=colunas)
        df_novos.to_csv(ARQUIVO_BRUTO_TEAM, mode='a', header=False, index=False, sep=',', encoding='utf-8')
        
    if os.path.exists(ARQUIVO_BRUTO_TEAM):
        df_total = pd.read_csv(ARQUIVO_BRUTO_TEAM, keep_default_na=False)
        df_total['win'] = pd.to_numeric(df_total['win'], errors='coerce').fillna(0)
        
        # Função para extrair Ano e Mês por extenso da coluna data_adicao
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

        df_total['cat_list'] = df_total['categoria'].str.split('/')
        df_stats = df_total.explode('cat_list')
        
        os.makedirs('api/stats_team', exist_ok=True)

        def gerar_json_consolidado_team(df_input, path):
            consolidado = df_input.groupby(['modo', 'mapa', 'pick', 'ano', 'mes']).agg(
                picks=('win', 'count'),
                vitorias=('win', 'sum')
            ).reset_index()
            consolidado['win_rate'] = (consolidado['vitorias'] / consolidado['picks'] * 100).round(1).astype(str) + '%'
            consolidado.to_json(path, orient='records', force_ascii=False)

        # Salva o geral apenas do seu time
        gerar_json_consolidado_team(df_stats, 'api/stats_team/geral.json')

        # Cria os JSONs individuais de subpastas ('player.json' e 'coach.json')
        for cat in df_stats['cat_list'].unique():
            if cat:
                df_cat = df_stats[df_stats['cat_list'] == cat]
                gerar_json_consolidado_team(df_cat, f"api/stats_team/{str(cat).lower()}.json")

    print(f"\n✅ Concluído! Total de novas partidas do Team salvas: {total_novas}")

if __name__ == "__main__":
    minerar_dados_team()
