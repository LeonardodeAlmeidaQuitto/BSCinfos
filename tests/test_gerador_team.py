import json

import pandas as pd
import pytest

import gerador_team


def make_player(tag, name="Player", brawler="shelly"):
    return {"tag": tag, "name": name, "brawler": {"name": brawler}}


def make_entry(result="victory", battle_type="friendly",
               battle_time="20250101T120000.000Z"):
    team0 = [make_player("#AAA", "Me", "shelly"),
             make_player("#B1", "b1", "colt"),
             make_player("#B2", "b2", "bo")]
    team1 = [make_player("#DDD", "Coach", "gale"),
             make_player("#C1", "c1", "bull"),
             make_player("#C2", "c2", "eve")]
    return {"battle": {"teams": [team0, team1], "result": result,
                       "type": battle_type, "mode": "gemGrab"},
            "event": {"map": "Hard Rock Mine"},
            "battleTime": battle_time}


# ---------------------------------------------------------------------------
# module-level TAG_PARA_CATEGORIA derivation
# ---------------------------------------------------------------------------
def test_tag_para_categoria_maps_every_tag():
    for cat, tags in gerador_team.CATEGORIAS.items():
        for tag in tags:
            assert gerador_team.TAG_PARA_CATEGORIA[tag] == cat


# ---------------------------------------------------------------------------
# minerar_dados_team (integration with mocked client + temp files)
# ---------------------------------------------------------------------------
@pytest.fixture
def patched_categorias(monkeypatch):
    monkeypatch.setattr(gerador_team, "CATEGORIAS", {"PLAYER": {"#AAA": "Me"}})
    monkeypatch.setattr(gerador_team, "TAG_PARA_CATEGORIA",
                        {"#AAA": "PLAYER", "#DDD": "COACH"})


def test_minerar_dados_team_writes_csv_and_json(monkeypatch, tmp_path, patched_categorias):
    monkeypatch.chdir(tmp_path)
    monkeypatch.setattr(gerador_team.client, "get_battle_logs",
                        lambda tag: [make_entry(result="victory")])

    gerador_team.minerar_dados_team()

    csv_path = tmp_path / gerador_team.ARQUIVO_BRUTO_TEAM
    assert csv_path.exists()
    df = pd.read_csv(csv_path)
    assert len(df) == 6
    assert df["win"].tolist() == [1, 1, 1, 0, 0, 0]

    geral = tmp_path / "api" / "stats_team" / "geral.json"
    assert geral.exists()
    data = json.loads(geral.read_text())
    assert isinstance(data, list) and len(data) > 0
    assert all("win_rate" in row for row in data)


def test_minerar_dados_team_skips_ranked(monkeypatch, tmp_path, patched_categorias):
    monkeypatch.chdir(tmp_path)
    monkeypatch.setattr(gerador_team.client, "get_battle_logs",
                        lambda tag: [make_entry(battle_type="rankedGame")])

    gerador_team.minerar_dados_team()

    df = pd.read_csv(tmp_path / gerador_team.ARQUIVO_BRUTO_TEAM)
    assert len(df) == 0  # ranked matches are ignored


def test_minerar_dados_team_swallows_client_errors(monkeypatch, tmp_path, patched_categorias):
    monkeypatch.chdir(tmp_path)

    def boom(tag):
        raise RuntimeError("api down")

    monkeypatch.setattr(gerador_team.client, "get_battle_logs", boom)
    # Must not raise even when the client fails for every tag
    gerador_team.minerar_dados_team()
    df = pd.read_csv(tmp_path / gerador_team.ARQUIVO_BRUTO_TEAM)
    assert len(df) == 0
