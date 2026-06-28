cat > /home/claude/gerador.py << 'PYEOF'
import requests
import pandas as pd
import os
from datetime import datetime, timedelta, timezone

# =============================================================================
# CONFIGURAÇÃO
# =============================================================================
API_KEY   = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjU0ODZlOGQxLTRkNWQtNDJmYy1iOWE3LWU5ODYyMWJhOWI0NSIsImlhdCI6MTc3ODUwODgwOCwic3ViIjoiZGV2ZWxvcGVyLzc0NjFhNGJkLThhZDctNjg2Mi0wOGVkLTJiYmEzMzAxMWE3NiIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiNDUuNzkuMjE4Ljc5Il0sInR5cGUiOiJjbGllbnQifV19.yvcSQalBqNz6Q6DjZWU5IL1XvBjn5DGckYvy2bgl5tjVeRJ2GMhY_I2JP1zdEeLAfEG2hGVJT7OMZro4kkegFA"
PROXY_URL = "https://bsproxy.royaleapi.dev/v1"
ARQUIVO_BRUTO = "historico_bruto.csv"
ARQUIVO_BANS  = "bans_matcherino.csv"

# =============================================================================
# TORNEIOS MATCHERINO
# =============================================================================
# Adicione aqui os IDs dos torneios que quer capturar.
# O ID está na URL: matcherino.com/supercell/tournaments/123456 -> ID = 123456
#
# COMO DESCOBRIR OS ENDPOINTS (necessario uma vez por torneio):
#   1. Abra o torneio no Chrome com F12 aberto
#   2. Va em Network -> Fetch/XHR
#   3. Clique num match no bracket para ver as requisicoes
#   4. Copie as URLs e coloque em 'endpoint_matches' e 'endpoint_game'
#   5. Se deixar None, o bot tenta os padroes mais comuns automaticamente
#
# Formato:
#   { id_torneio: { 'regiao': 'SA', 'endpoint_matches': None, 'endpoint_game': None } }
TORNEIOS_MATCHERINO = {
    # Exemplo (substitua pelo ID e endpoints reais):
    # ID: {
    #     'regiao': 'Region',
    #     'endpoint_matches': None,
    #     'endpoint_game':    None,
    # },
}

# =============================================================================
# REGIOES
# =============================================================================
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
MAPA_JOGADORES  = {tag: info for reg, lista in REGIOES.items() for tag, info in lista.items()}

MAPA_TIMES_BY_NOME = {}
for _reg, _jogs in REGIOES.items():
    for _tag, _info in _jogs.items():
        MAPA_TIMES_BY_NOME[_info['nome_time'].lower().strip()] = (_info['id_time'], _info['nome_time'], _reg)

def resolver_time(nome_matcherino):
    key = nome_matcherino.lower().strip()
    if key in MAPA_TIMES_BY_NOME:
        return MAPA_TIMES_BY_NOME[key]
    for k, v in MAPA_TIMES_BY_NOME.items():
        if key in k or k in key:
            return v
    return (f"EXT_{nome_matcherino[:6].upper().replace(' ','_')}", nome_matcherino, "?")


def buscar_battle_log(tag):
    url     = f"{PROXY_URL}/players/{tag.replace('#', '%23')}/battlelog"
    headers = {"Authorization": f"Bearer {API_KEY}"}
    try:
        r = requests.get(url, headers=headers, timeout=15)
        r.raise_for_status()
        return r.json().get('items', [])
    except Exception as e:
        print(f"  aviso: erro ao buscar {tag}: {e}")
        return []


def tentar_endpoint_matcherino(session, tournament_id, endpoint_custom=None):
    candidatos = []
    if endpoint_custom:
        candidatos.append(endpoint_custom)
    candidatos += [
        f"https://matcherino.com/__api/bounties/{tournament_id}/matches",
        f"https://matcherino.com/__api/bounties/{tournament_id}",
        f"https://matcherino.com/api/v1/tournaments/{tournament_id}/matches",
        f"https://matcherino.com/api/v1/bounties/{tournament_id}",
        f"https://matcherino.com/__api/events/{tournament_id}/bracket",
    ]
    for url in candidatos:
        try:
            r = session.get(url, timeout=12)
            if r.status_code == 200:
                print(f"  endpoint ativo: {url}")
                return url, r.json()
        except Exception:
            pass
    return None, {}


def tentar_endpoint_game(session, match_id, endpoint_custom=None):
    candidatos = []
    if endpoint_custom:
        candidatos.append(endpoint_custom.replace('{match_id}', str(match_id)))
    candidatos += [
        f"https://matcherino.com/__api/matches/{match_id}",
        f"https://matcherino.com/__api/matches/{match_id}/games",
        f"https://matcherino.com/api/v1/matches/{match_id}",
    ]
    for url in candidatos:
        try:
            r = session.get(url, timeout=12)
            if r.status_code == 200:
                return r.json()
        except Exception:
            pass
    return {}

def minerar_dados_api():
    fuso_brasilia   = timezone(timedelta(hours=-3))
    momento_revisao = datetime.now(fuso_brasilia).strftime('%d/%m/%Y %H:%M:%S')

    colunas = [
        'id_partida', 'regiao', 'id_players', 'name_players', 'pick',
        'win', 'win_rate', 'modo', 'mapa', 'data_adicao',
        'player_tag', 'player_name', 'id_time', 'nome_time', 'tipo'
    ]

    ids_registrados = set()
    if os.path.exists(ARQUIVO_BRUTO):
        try:
            df_ex = pd.read_csv(ARQUIVO_BRUTO, dtype=str, keep_default_na=False)
            if 'tipo' not in df_ex.columns:
                df_ex['tipo'] = 'scrim'
                df_ex.to_csv(ARQUIVO_BRUTO, index=False)
            ids_registrados = set(df_ex['id_partida'].unique())
        except Exception:
            ids_registrados = set()
    else:
        pd.DataFrame(columns=colunas).to_csv(ARQUIVO_BRUTO, index=False)

    novas_linhas = []
    total_novas  = 0

    for sigla_busca, jogadores in REGIOES.items():
        for tag_busca in jogadores:
            for entry in buscar_battle_log(tag_busca):
                battle = entry.get('battle', {})

                # WHITELIST — so aceita friendly (scrim) e tournament
                tipo_raw = battle.get('type', '').lower()
                if tipo_raw not in ('friendly', 'tournament'):
                    continue

                teams = battle.get('teams')
                if not teams or len(teams) < 2:
                    continue

                t0t = [MAPA_JOGADORES[p['tag']] for p in teams[0] if p['tag'] in MAPA_JOGADORES]
                t1t = [MAPA_JOGADORES[p['tag']] for p in teams[1] if p['tag'] in MAPA_JOGADORES]
                t0_id   = t0t[0]['id_time']   if t0t else "OPONENTE_T0"
                t0_nome = t0t[0]['nome_time'] if t0t else "DESCONHECIDO T0"
                t1_id   = t1t[0]['id_time']   if t1t else "OPONENTE_T1"
                t1_nome = t1t[0]['nome_time'] if t1t else "DESCONHECIDO T1"

                all_p    = teams[0] + teams[1]
                tags     = [p['tag'] for p in all_p]
                brawlers = [p['brawler']['name'].upper() for p in all_p]
                nicks    = [p.get('name', '?') for p in all_p]

                # FIX: battleTime direto do JSON (sem conversao snake_case do brawlstats)
                time_str = entry.get('battleTime', 'UNKNOWN')
                mapa     = entry.get('event', {}).get('map', 'Unknown')
                m_id     = f"{time_str}_{mapa}_{'_'.join(tags)}_{'_'.join(brawlers)}"

                if m_id in ids_registrados:
                    continue

                reg_final  = "/".join(sorted({TAG_PARA_REGIAO[t] for t in tags if t in TAG_PARA_REGIAO} or {sigla_busca}))
                res        = battle.get('result')
                tipo_final = 'scrim' if tipo_raw == 'friendly' else 'tournament'

                for i in range(6):
                    venceu = 1 if (i < 3 and res == 'victory') or (i >= 3 and res == 'defeat') else 0
                    novas_linhas.append([
                        m_id, reg_final, ";".join(tags), ";".join(nicks),
                        brawlers[i], venceu, f"{venceu*100}.0%",
                        battle.get('mode', 'Unknown'), mapa, momento_revisao,
                        tags[i], nicks[i],
                        t0_id if i < 3 else t1_id,
                        t0_nome if i < 3 else t1_nome,
                        tipo_final
                    ])
                ids_registrados.add(m_id)
                total_novas += 1

    if novas_linhas:
        pd.DataFrame(novas_linhas, columns=colunas).to_csv(
            ARQUIVO_BRUTO, mode='a', header=False, index=False, encoding='utf-8')

    print(f"OK API BS: {total_novas} novas partidas adicionadas a {ARQUIVO_BRUTO}.")
    return total_novas

def minerar_matcherino():
    if not TORNEIOS_MATCHERINO:
        print("INFO: Nenhum torneio em TORNEIOS_MATCHERINO. Adicione os IDs para ativar.")
        return

    fuso_brasilia = timezone(timedelta(hours=-3))
    momento       = datetime.now(fuso_brasilia).strftime('%d/%m/%Y %H:%M:%S')

    colunas_picks = [
        'id_partida', 'regiao', 'id_players', 'name_players', 'pick',
        'win', 'win_rate', 'modo', 'mapa', 'data_adicao',
        'player_tag', 'player_name', 'id_time', 'nome_time', 'tipo'
    ]
    colunas_bans = [
        'id_partida', 'regiao', 'mapa', 'modo',
        'id_time', 'nome_time', 'brawler_banido', 'data_adicao', 'tipo'
    ]

    ids_picks = set()
    if os.path.exists(ARQUIVO_BRUTO):
        try:
            df = pd.read_csv(ARQUIVO_BRUTO, dtype=str, keep_default_na=False)
            ids_picks = set(df[df['id_partida'].str.startswith('mtcr_', na=False)]['id_partida'])
        except Exception:
            pass

    ids_bans = set()
    if os.path.exists(ARQUIVO_BANS):
        try:
            df_b = pd.read_csv(ARQUIVO_BANS, dtype=str, keep_default_na=False)
            ids_bans = set(df_b['id_partida'].unique())
        except Exception:
            pass
    else:
        pd.DataFrame(columns=colunas_bans).to_csv(ARQUIVO_BANS, index=False)

    sess = requests.Session()
    sess.headers.update({
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        "Accept": "application/json",
        "Referer": "https://matcherino.com"
    })

    novas_picks = []
    novos_bans  = []
    total_jogos = 0

    for t_id, t_cfg in TORNEIOS_MATCHERINO.items():
        regiao     = t_cfg.get('regiao', 'SA')
        ep_matches = t_cfg.get('endpoint_matches')
        ep_game    = t_cfg.get('endpoint_game')

        print(f"\nMatcherino #{t_id} ({regiao})")

        _, data = tentar_endpoint_matcherino(sess, t_id, ep_matches)
        if not data:
            print(f"  AVISO: Endpoint nao encontrado. Use DevTools para descobrir a URL.")
            continue

        matches = data if isinstance(data, list) else \
                  data.get('matches', data.get('items', data.get('data', data.get('results', []))))

        for match in matches:
            m_id   = match.get('id') or match.get('matchId') or match.get('match_id')
            ta_raw = match.get('team1') or match.get('teamA') or (match.get('teams', [{}])[0] if match.get('teams') else {})
            tb_raw = match.get('team2') or match.get('teamB') or (match.get('teams', [{},{}])[1] if len(match.get('teams', [])) > 1 else {})
            ta_nome = ta_raw.get('name', 'TIME A') if isinstance(ta_raw, dict) else str(ta_raw)
            tb_nome = tb_raw.get('name', 'TIME B') if isinstance(tb_raw, dict) else str(tb_raw)
            ta_id, ta_nome_int, _ = resolver_time(ta_nome)
            tb_id, tb_nome_int, _ = resolver_time(tb_nome)

            games = match.get('games', match.get('maps', match.get('sets', match.get('rounds', []))))
            if not games and m_id:
                gd    = tentar_endpoint_game(sess, m_id, ep_game)
                games = gd if isinstance(gd, list) else gd.get('games', gd.get('maps', []))

            for g_num, game in enumerate(games, 1):
                mapa = game.get('map') or game.get('mapName') or game.get('map_name') or 'Unknown'
                modo = game.get('mode') or game.get('gameMode') or game.get('game_mode') or 'knockout'
                pid  = f"mtcr_{t_id}_{m_id}_g{g_num}"

                # PICKS
                if pid not in ids_picks:
                    picks_a = (game.get('team1Picks') or game.get('picksA') or
                               (game.get('picks') or {}).get('team1') or
                               (game.get('picks') or {}).get('a') or [])
                    picks_b = (game.get('team2Picks') or game.get('picksB') or
                               (game.get('picks') or {}).get('team2') or
                               (game.get('picks') or {}).get('b') or [])

                    winner   = str(game.get('winner') or game.get('winnerTeam') or game.get('winning_team') or '').lower()
                    venceu_a = 1 if winner in ('team1', '1', 'a', ta_nome.lower(), ta_id.lower()) else 0
                    venceu_b = 1 - venceu_a

                    def parse_player(p):
                        if isinstance(p, str):
                            return {'tag': f'MTCR_{p[:6]}', 'name': p, 'brawler': p}
                        brawler = str(p.get('brawler') or p.get('brawlerName') or p.get('brawler_name') or 'UNKNOWN').upper()
                        return {
                            'tag':     p.get('tag') or p.get('playerId') or f"MTCR_{p.get('name','?')[:6]}",
                            'name':    p.get('name') or p.get('nick') or p.get('playerName') or '?',
                            'brawler': brawler
                        }

                    pa = [parse_player(p) for p in picks_a[:3]]
                    pb = [parse_player(p) for p in picks_b[:3]]
                    while len(pa) < 3: pa.append({'tag': f'MTCR_A{len(pa)}', 'name': '?', 'brawler': 'UNKNOWN'})
                    while len(pb) < 3: pb.append({'tag': f'MTCR_B{len(pb)}', 'name': '?', 'brawler': 'UNKNOWN'})

                    all_tags     = [p['tag']     for p in pa + pb]
                    all_nicks    = [p['name']    for p in pa + pb]
                    all_brawlers = [p['brawler'] for p in pa + pb]

                    for i in range(6):
                        v   = venceu_a if i < 3 else venceu_b
                        t_i = ta_id       if i < 3 else tb_id
                        n_i = ta_nome_int if i < 3 else tb_nome_int
                        novas_picks.append([
                            pid, regiao, ";".join(all_tags), ";".join(all_nicks),
                            all_brawlers[i], v, f"{v*100}.0%",
                            modo, mapa, momento,
                            all_tags[i], all_nicks[i], t_i, n_i, 'tournament'
                        ])
                    ids_picks.add(pid)
                    total_jogos += 1

                # BANS
                if pid not in ids_bans:
                    bans_raw = game.get('bans') or game.get('ban_phase') or {}

                    if isinstance(bans_raw, dict):
                        bans_a_raw = bans_raw.get('team1') or bans_raw.get('a') or bans_raw.get('teamA') or []
                        bans_b_raw = bans_raw.get('team2') or bans_raw.get('b') or bans_raw.get('teamB') or []
                    elif isinstance(bans_raw, list):
                        bans_a_raw = [x for x in bans_raw if str((x.get('team','') if isinstance(x, dict) else '')).lower() in ('team1','a', ta_id.lower())]
                        bans_b_raw = [x for x in bans_raw if str((x.get('team','') if isinstance(x, dict) else '')).lower() in ('team2','b', tb_id.lower())]
                    else:
                        bans_a_raw, bans_b_raw = [], []

                    def nome_brawler(b):
                        if isinstance(b, str): return b.upper()
                        return str(b.get('brawler') or b.get('brawlerName') or b.get('name') or 'UNKNOWN').upper()

                    for b in bans_a_raw:
                        novos_bans.append([pid, regiao, mapa, modo, ta_id, ta_nome_int, nome_brawler(b), momento, 'tournament'])
                    for b in bans_b_raw:
                        novos_bans.append([pid, regiao, mapa, modo, tb_id, tb_nome_int, nome_brawler(b), momento, 'tournament'])

                    if bans_a_raw or bans_b_raw:
                        ids_bans.add(pid)

    if novas_picks:
        pd.DataFrame(novas_picks, columns=colunas_picks).to_csv(
            ARQUIVO_BRUTO, mode='a', header=False, index=False, encoding='utf-8')
        print(f"OK Matcherino: {total_jogos} novos jogos salvos em {ARQUIVO_BRUTO}.")

    if novos_bans:
        pd.DataFrame(novos_bans, columns=colunas_bans).to_csv(
            ARQUIVO_BANS, mode='a', header=False, index=False, encoding='utf-8')
        n_jogos_ban = len({b[0] for b in novos_bans})
        print(f"OK Matcherino: {n_jogos_ban} jogos com bans salvos em {ARQUIVO_BANS}.")

    if not novas_picks and not novos_bans:
        print("INFO Matcherino: nenhum dado novo encontrado.")


if __name__ == "__main__":
    minerar_dados_api()
    minerar_matcherino()
PYEOF
echo "gerador.py criado: $(wc -l < /home/claude/gerador.py) linhas"
