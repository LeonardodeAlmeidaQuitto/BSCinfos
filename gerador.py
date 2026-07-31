import requests
import pandas as pd
import os
import csv
from datetime import datetime, timedelta, timezone
import re

# =============================================================================
# CONFIGURAÇÃO GERAL
# =============================================================================
API_KEY = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjU0ODZlOGQxLTRkNWQtNDJmYy1iOWE3LWU5ODYyMWJhOWI0NSIsImlhdCI6MTc3ODUwODgwOCwic3ViIjoiZGV2ZWxvcGVyLzc0NjFhNGJkLThhZDctNjg2Mi0wOGVkLTJiYmEzMzAxMWE3NiIsInNjb3BlcyI6WyJicmF3bHN0YXJzIl0sImxpbWl0cyI6W3sidGllciI6ImRldmVsb3Blci9zaWx2ZXIiLCJ0eXBlIjoidGhyb3R0bGluZyJ9LHsiY2lkcnMiOlsiNDUuNzkuMjE4Ljc5Il0sInR5cGUiOiJjbGllbnQifV19.yvcSQalBqNz6Q6DjZWU5IL1XvBjn5DGckYvy2bgl5tjVeRJ2GMhY_I2JP1zdEeLAfEG2hGVJT7OMZro4kkegFA"

# Adicione sua chave da RapidAPI Djole33 abaixo (Substitua o texto abaixo pela sua chave)
RAPIDAPI_KEY = "e28d71b8f2msh519f1b75f65bb54p1d5598jsnae80ec5aa0a2" 

PROXY_URL = "https://bsproxy.royaleapi.dev/v1"
API_OFICIAL_URL = "https://api.brawlstars.com/v1"

ARQUIVO_BRUTO = "historico_bruto.csv"
ARQUIVO_BANS = "bans_matcherino.csv"

# Cabeçalho exato solicitado
HEADER_CSV_BRUTO = "id_partida,região,time1,player1,brawler1,gadget,starrpower,gear1,gear2,player2,brawler2,gadget,starrpower,gear1,gear2,player3,brawler3,gadget,starrpower,gear1,gear2,time2,player4,brawler4,gadget,starrpower,gear1,gear2,player5,brawler5,gadget,starrpower,gear1,gear2,player6,brawler6,gadget,starrpower,gear1,gear2,modo,mapa,tipo,dt_adição"

COLUNAS_BANS = ["id_partida", "regiao", "mapa", "modo", "id_time", "nome_time", "brawler_banido", "data_adicao", "tipo"]

# Mapeamento de Tags para identificação automática de Região, Time e Nick
#
# OBS: quando um time "Unknow" é registrado pelo site (aba TIMES -> Registrar Equipe Desconhecida),
# o app.js gera automaticamente um botão "COPIAR" com as linhas prontas no formato abaixo para você
# colar aqui dentro de MAPEAMENTO_PLAYERS. Isso é necessário porque o navegador não tem permissão
# para escrever em arquivos do servidor/repositório — então a sincronização desse arquivo .py
# (que roda separadamente, minerando dados via API) precisa desse passo manual de copiar/colar.
MAPEAMENTO_PLAYERS = {
# SA  
        "#PLLRJC2V": {"nome": "Wesley", "id_time": "BH", "nome_time": "BH ESPORTS", "regiao": "SA"},
        "#JQ8LLLY": {"nome": "FireCrow", "id_time": "LOUD", "nome_time": "LOUD", "regiao": "SA"},
        "#CQLR0Y80": {"nome": "Tufa", "id_time": "OCX", "nome_time": "OCX DIVISION", "regiao": "SA"},
        "#L9PQUV0YC": {"nome": "BrabaoBs", "id_time": "OS", "nome_time": "OLIMPO SQUAD", "regiao": "SA"},
        "#2GV09VJJP": {"nome": "FireMirillo", "id_time": "AL", "nome_time": "ACRE LOVERS", "regiao": "SA"},
        "#202GJJR28": {"nome": "Doritos", "id_time": "GLXY", "nome_time": "GALAXY", "regiao": "SA"},
        "#PR0P8QVQ": {"nome": "Kr ;)", "id_time": "SKC", "nome_time": "SKCALALAS SA", "regiao": "SA"},
        "#R2LR2QLG": {"nome": "Mohtep", "id_time": "PCNG", "nome_time": "PIZZA CONGELADA F/A", "regiao": "SA"},
        "#80VLPJCCC": {"nome": "Tilo", "id_time": "CB", "nome_time": "CRECHE BRAWL", "regiao": "SA"},
        "#GJPVYUQG": {"nome": "Deykonn", "id_time": "LVL", "nome_time": "LEVEL ESPORTS", "regiao": "SA"},
        "#2P8RVJVUY": {"nome": "Sterixx", "id_time": "OCXA", "nome_time": "OCX DIVISION ACADEMY", "regiao": "SA"},
        "#820JCJJG": {"nome": "Jxcccr", "id_time": "ZRT", "nome_time": "ZURITA GANG", "regiao": "SA"},
        "#2QCCC29QV": {"nome": "Magic", "id_time": "ENO", "nome_time": "ENOSIS", "regiao": "SA"},
        "#2YRRL8GG2": {"nome": "Bebaxo", "id_time": "HAWK", "nome_time": "RED HAWK", "regiao": "SA"},
        "#VQ8YP9C0": {"nome": "JoeFav", "id_time": "LVLA", "nome_time": "LEVEL ACADEMY", "regiao": "SA"},
        "#80YUV29GR": {"nome": "Lion", "id_time": "AG", "nome_time": "AG ESPORTS", "regiao": "SA"},
        "#YCUGURU89": {"nome": "Azuri", "id_time": "JPFC", "nome_time": "JAPÃO FC ESPORTS", "regiao": "SA"},
# NA
        "#LVRRYPV": {"nome": "Bobby", "id_time": "BOB", "nome_time": "F/A BOBBY", "regiao": "NA"},
        "#82RCQCVG": {"nome": "Lxffy", "id_time": "TRB", "nome_time": "TRIBE GAMING", "regiao": "NA"},
        "#YUJ8PJ0LR": {"nome": "Snoiy", "id_time": "TE", "nome_time": "TEAM ELEKTROS", "regiao": "NA"},
        "#VPVLG2": {"nome": "Tyrant", "id_time": "HML", "nome_time": "F/A HOMELESS", "regiao": "NA"},
        "#GVLRUG9Q": {"nome": "PaiN", "id_time": "NOVA", "nome_time": "NOVA", "regiao": "NA"},
        "#QURVLPG": {"nome": "Ezlivi", "id_time": "VTC", "nome_time": "VATIC", "regiao": "NA"},
        "#R9CCLP8Q": {"nome": "Rafiki", "id_time": "LGCY", "nome_time": "LEGACY", "regiao": "NA"},
        "#28LUY98": {"nome": "OG", "id_time": "VIC", "nome_time": "VIC", "regiao": "NA"},
        "#8UL0U08V": {"nome": "Winq", "id_time": "UTP", "nome_time": "UTOPIA", "regiao": "NA"},
        "#JJ09PC0P": {"nome": "Vegeta", "id_time": "VICD", "nome_time": "VIC Day", "regiao": "NA"},
        "#R80QRP0G": {"nome": "Squeezy", "id_time": "PFZ", "nome_time": "PFZ", "regiao": "NA"},
        "#88PL8L2JC": {"nome": "David", "id_time": "ENONA", "nome_time": "ENOSIS NA", "regiao": "NA"},
# EMEA
        "#9PCV9L982": {"nome": "AngelBoy", "id_time": "FUT", "nome_time": "FUT ESPORTS", "regiao": "EMEA"},
        "#2208QGGGL": {"nome": "Dompe", "id_time": "KUMA", "nome_time": "KUMA", "regiao": "EMEA"},
        "#80PVPCC29": {"nome": "Enraged", "id_time": "NAVI", "nome_time": "NAVI", "regiao": "EMEA"},
        "#2Y822YJYJC": {"nome": "Decaii", "id_time": "MZP", "nome_time": "METIZPORT", "regiao": "EMEA"},
        "#YQUCCJ2": {"nome": "Symantec", "id_time": "HMB", "nome_time": "HMBLE", "regiao": "EMEA"},
        "#9LVUC2PY": {"nome": "Ope", "id_time": "SK", "nome_time": "SK GAMING", "regiao": "EMEA"},
        "#PCPRPJV": {"nome": "IKaoss", "id_time": "TH", "nome_time": "TEAM HERETICS", "regiao": "EMEA"},
        "#2Q892QVU": {"nome": "Maru", "id_time": "TTM", "nome_time": "REPLY TOTEM", "regiao": "EMEA"},
        "#9PQQ8GQQ": {"nome": "Filippo", "id_time": "NOVO", "nome_time": "NOVO ESPORTS", "regiao": "EMEA"},
        "#PLV89CGP": {"nome": "Salty", "id_time": "BIG", "nome_time": "BIG", "regiao": "EMEA"},
        "#LLV82LQPU": {"nome": "Fayelo", "id_time": "REV", "nome_time": "REVERSO HIVE", "regiao": "EMEA"},
        "#8RVLRVYYP": {"nome": "Yei Yei", "id_time": "TLB", "nome_time": "TALENTS LAB", "regiao": "EMEA"},
        "#82GG2RLQG": {"nome": "ZeyroX", "id_time": "FUTA", "nome_time": "FUT ACADEMY", "regiao": "EMEA"},
# EA
        "#9ULYPV8": {"nome": "Tensai", "id_time": "CR", "nome_time": "CRAZY RACCOON", "regiao": "EA"},
        "#P0Y8JGL0U": {"nome": "Battoman", "id_time": "ZETA", "nome_time": "ZETA DIVISION", "regiao": "EA"},
        "#J99YU9QY": {"nome": "Kuru", "id_time": "SKCEA", "nome_time": "SKC EA", "regiao": "EA"},
        "#2RQQ9PGC": {"nome": "Shigemyon", "id_time": "IGM", "nome_time": "IGNUM", "regiao": "EA"},
        "#LJ0288PRG": {"nome": "Terry", "id_time": "AXIS", "nome_time": "AXIS", "regiao": "EA"},
        "#82CJYJPG2": {"nome": "Yutapin", "id_time": "RVL", "nome_time": "RIVAL", "regiao": "EA"},
        "#8J9GUJJVY": {"nome": "Melty", "id_time": "RC", "nome_time": "REJECT", "regiao": "EA"},
        "#28PU0P9L0": {"nome": "Achapi", "id_time": "FL", "nome_time": "FENNEL", "regiao": "EA"},
        "#28VP0G808": {"nome": "Koga", "id_time": "INS", "nome_time": "INSOMNIA", "regiao": "EA"},
        "#89UUQLJCC": {"nome": "Toridesu", "id_time": "FZ", "nome_time": "FRENZY", "regiao": "EA"},
        "#8R0JY2UJ2": {"nome": "Rennosuke", "id_time": "F0", "nome_time": "FAZE ZERO", "regiao": "EA"}

}

def obter_fuso_brasilia():
    return timezone(timedelta(hours=-3))

def formatar_data_brawl(battle_time_str):
    try:
        dt = datetime.strptime(battle_time_str, "%Y%m%dT%H%M%S.%fZ").replace(tzinfo=timezone.utc)
        return dt.astimezone(obter_fuso_brasilia()).strftime("%d/%m/%Y %H:%M:%S")
    except:
        return datetime.now(obter_fuso_brasilia()).strftime("%d/%m/%Y %H:%M:%S")

def nome_brawler(b):
    if isinstance(b, str): return b.upper()
    if isinstance(b, dict): return str(b.get('brawler') or b.get('brawlerName') or b.get('name') or 'UNKNOWN').upper()
    return 'UNKNOWN'

def obter_extras(player_data):
    """Extrai gadget, starpower, gear1 e gear2 do dicionario do jogador."""
    brawler = player_data.get('brawler', {})
    gadgets = brawler.get('gadgets', [])
    starpowers = brawler.get('starPowers', [])
    gears = brawler.get('gears', [])
    
    gadget = gadgets[0].get('name', '') if gadgets else ''
    sp = starpowers[0].get('name', '') if starpowers else ''
    g1 = gears[0].get('name', '') if len(gears) > 0 else ''
    g2 = gears[1].get('name', '') if len(gears) > 1 else ''
    
    return gadget, sp, g1, g2

def buscar_battlelog(tag_url, headers_api):
    """
    Tenta buscar o battlelog usando a RapidAPI primeiro para obter os dados extras (gears/starpowers).
    Se falhar, faz fallback para proxy ou oficial.
    """
    rapid_headers = {
        "X-RapidAPI-Key": RAPIDAPI_KEY,
        "X-RapidAPI-Host": "brawlstarsapi.p.rapidapi.com"
    }
    
    tentativas = [
        (f"https://brawlstarsapi.p.rapidapi.com/v1/player/battlelog?playerTag={tag_url}", "rapidapi", rapid_headers),
        (f"{PROXY_URL}/players/{tag_url}/battlelog", "proxy", headers_api),
        (f"{API_OFICIAL_URL}/players/{tag_url}/battlelog", "direto", headers_api),
    ]
    ultimo_erro = None
    for url, origem, h in tentativas:
        try:
            resp = requests.get(url, headers=h, timeout=10)
            if resp.status_code == 200:
                return resp, origem, None
            ultimo_erro = f"HTTP {resp.status_code} via {origem} -> {resp.text[:150]}"
        except Exception as e:
            ultimo_erro = f"Exceção via {origem} -> {e}"
    return None, None, ultimo_erro

def minerar_dados():
    global MAPEAMENTO_PLAYERS
    tags_torneio = set()

    # Busca em torneios.txt para tags dinâmicas do Matcherino
    if os.path.exists('torneios.txt'):
        with open('torneios.txt', 'r') as f:
            for linha in f:
                t_id = linha.strip()
                if t_id.isdigit():
                    try:
                        url = f"https://matcherino.com/__api/bounties/{t_id}/participants"
                        req = requests.get(url, headers={'User-Agent': 'Mozilla/5.0'}, timeout=10)
                        if req.status_code == 200:
                            for player in req.json().get('body', []):
                                game_accs = str(player.get('gameAccounts', ''))
                                tags = re.findall(r'#[A-Z0-9]{6,10}', game_accs)
                                for tag in tags:
                                    if tag not in MAPEAMENTO_PLAYERS:
                                        MAPEAMENTO_PLAYERS[tag] = {"nome": "Player", "id_time": f"TRN_{t_id}", "nome_time": "Time Torneio", "regiao": "SA"}
                                    tags_torneio.add(tag)
                    except Exception as e:
                        print(f"Erro Matcherino {t_id}: {e}")

    TAG_PARA_REGIAO = {t: i.get("regiao", "SA") for t, i in MAPEAMENTO_PLAYERS.items()}

    ids_registrados, ids_bans = set(), set()
    
    # Lê os IDs já existentes
    if os.path.exists(ARQUIVO_BRUTO):
        try:
            df = pd.read_csv(ARQUIVO_BRUTO, usecols=[0])
            ids_registrados = set(df.iloc[:, 0].dropna().astype(str).unique())
        except: pass

    if os.path.exists(ARQUIVO_BANS):
        try:
            dfb = pd.read_csv(ARQUIVO_BANS)
            if "id_partida" in dfb.columns: ids_bans = set(dfb["id_partida"].dropna().astype(str).unique())
        except: pass

    novas_picks, novos_bans = [], []
    headers_api = {"Authorization": f"Bearer {API_KEY}"}

    stats = {
        'total_players': 0, 'status_ok': 0, 'falhas_conexao': 0,
        'origem_sucesso': {}, 'total_items_lidos': 0, 'items_nao_3v3': 0,
        'items_ja_existentes': 0, 'items_novos': 0, 'erros_processamento': 0,
    }

    for tag_busca, info_busca in list(MAPEAMENTO_PLAYERS.items()):
        sigla_busca = info_busca.get("regiao", "SA")
        tag_url = tag_busca.replace("#", "%23")
        stats['total_players'] += 1

        resp, origem, erro = buscar_battlelog(tag_url, headers_api)
        if resp is None:
            stats['falhas_conexao'] += 1
            if stats['falhas_conexao'] <= 8:
                print(f"  [FALHA] {tag_busca}: {erro}")
            continue

        stats['status_ok'] += 1
        stats['origem_sucesso'][origem] = stats['origem_sucesso'].get(origem, 0) + 1

        try:
            items = resp.json().get("items", [])
        except Exception:
            items = []
        stats['total_items_lidos'] += len(items)

        for item in items:
            try:
                battle = item.get("battle", {})
                teams = battle.get("teams", [])
                
                # Ignora modos que não são 3v3
                if len(teams) != 2 or len(teams[0]) != 3 or len(teams[1]) != 3:
                    stats['items_nao_3v3'] += 1
                    continue

                mapa = item.get("event", {}).get("map", "Unknown")
                modo = item.get("event", {}).get("mode", "Unknown")
                b_time = item.get("battleTime")
                momento = formatar_data_brawl(b_time)

                all_p = teams[0] + teams[1]
                tags_list = [p.get('tag', '') for p in all_p]
                brawlers_list = [nome_brawler(p.get('brawler', {})) for p in all_p]

                is_matcherino = any(t in tags_torneio for t in tags_list)
                tipo_raw = battle.get('type', 'friendly').lower()
                bans_raw = battle.get('bannedBrawlers') or battle.get('bans') or []
                tipo_final = 'tournament' if (is_matcherino or len(bans_raw) > 0 or 'ranked' in tipo_raw) else 'scrim'

                time_str = b_time.split(".")[0] if b_time else "00000000T000000"
                pid = f"{time_str}_{mapa}_{'_'.join(tags_list)}_{'_'.join(brawlers_list)}"
                reg_final = "/".join(sorted({TAG_PARA_REGIAO.get(t, sigla_busca) for t in tags_list}))

                t0_id, t0_nome = "OPONENTE_T0", "DESCONHECIDO T0"
                t1_id, t1_nome = "OPONENTE_T1", "DESCONHECIDO T1"

                for p in teams[0]:
                    if p.get('tag') in MAPEAMENTO_PLAYERS:
                        t0_id, t0_nome = MAPEAMENTO_PLAYERS[p['tag']]["id_time"], MAPEAMENTO_PLAYERS[p['tag']]["nome_time"]
                        break
                for p in teams[1]:
                    if p.get('tag') in MAPEAMENTO_PLAYERS:
                        t1_id, t1_nome = MAPEAMENTO_PLAYERS[p['tag']]["id_time"], MAPEAMENTO_PLAYERS[p['tag']]["nome_time"]
                        break

                if pid not in ids_registrados:
                    stats['items_novos'] += 1
                    
                    def build_player_data(player_dict):
                        tag = player_dict.get('tag', '')
                        nick = player_dict.get('name', 'Unknown')
                        player_str = f"{tag} {nick}"
                        brawler = nome_brawler(player_dict.get('brawler', {}))
                        gadget, sp, g1, g2 = obter_extras(player_dict)
                        return [player_str, brawler, gadget, sp, g1, g2]

                    # Estruturando a linha do CSV com as 44 colunas
                    nova_linha = [
                        pid, reg_final, t0_nome,
                        *build_player_data(teams[0][0]),
                        *build_player_data(teams[0][1]),
                        *build_player_data(teams[0][2]),
                        t1_nome,
                        *build_player_data(teams[1][0]),
                        *build_player_data(teams[1][1]),
                        *build_player_data(teams[1][2]),
                        modo, mapa, tipo_final, momento
                    ]
                    novas_picks.append(nova_linha)
                    ids_registrados.add(pid)
                else:
                    stats['items_ja_existentes'] += 1

                # Lógica de Bans
                if bans_raw and pid not in ids_bans:
                    bans_a, bans_b = [], []
                    if isinstance(bans_raw, list):
                        if len(bans_raw) <= 2:
                            if len(bans_raw) > 0: bans_a.append(bans_raw[0])
                            if len(bans_raw) > 1: bans_b.append(bans_raw[1])
                        else:
                            m = len(bans_raw)//2
                            bans_a, bans_b = bans_raw[:m], bans_raw[m:]

                    for b in bans_a:
                        bb = nome_brawler(b)
                        if bb != 'UNKNOWN': novos_bans.append([pid, reg_final, mapa, modo, t0_id, t0_nome, bb, momento, tipo_final])
                    for b in bans_b:
                        bb = nome_brawler(b)
                        if bb != 'UNKNOWN': novos_bans.append([pid, reg_final, mapa, modo, t1_id, t1_nome, bb, momento, tipo_final])
                    ids_bans.add(pid)

            except Exception as e:
                stats['erros_processamento'] += 1
                if stats['erros_processamento'] <= 5:
                    print(f"  [ERRO processamento] {tag_busca}: {e}")

    # Salva no arquivo CSV
    if novas_picks:
        if not os.path.exists(ARQUIVO_BRUTO):
            with open(ARQUIVO_BRUTO, 'w', encoding='utf-8') as f:
                f.write(HEADER_CSV_BRUTO + "\n")
                
        with open(ARQUIVO_BRUTO, 'a', encoding='utf-8', newline='') as f:
            writer = csv.writer(f)
            for row in novas_picks:
                writer.writerow(row)
        print(f"Salvo: {len(novas_picks)} novos jogos no {ARQUIVO_BRUTO}")

    if novos_bans:
        df_b = pd.DataFrame(novos_bans, columns=COLUNAS_BANS)
        df_b.to_csv(ARQUIVO_BANS, mode='a', header=not os.path.exists(ARQUIVO_BANS), index=False)
        print(f"Salvo: {len(novos_bans)} bans no {ARQUIVO_BANS}")

    if not novas_picks and not novos_bans:
        print("Nenhum dado novo para salvar.")

    print("\n========== DIAGNOSTICO DA EXECUCAO ==========")
    print(f"Jogadores consultados: {stats['total_players']}")
    print(f"Respostas OK: {stats['status_ok']} (Proxy: {stats['origem_sucesso'].get('proxy',0)} | Direto: {stats['origem_sucesso'].get('direto',0)} | RapidAPI: {stats['origem_sucesso'].get('rapidapi',0)})")
    print(f"Novas partidas adicionadas: {stats['items_novos']}")
    print("==============================================\n")

if __name__ == "__main__":
    minerar_dados()
