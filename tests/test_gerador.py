import re
from datetime import timedelta

import pandas as pd
import pytest

import gerador


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------
class FakeResp:
    """Minimal stand-in for a requests.Response."""

    def __init__(self, status_code=200, json_data=None, text=""):
        self.status_code = status_code
        self._json_data = json_data if json_data is not None else {}
        self.text = text

    def json(self):
        return self._json_data


def make_player(tag, name="Player", brawler="shelly"):
    return {"tag": tag, "name": name, "brawler": {"name": brawler}}


def make_item(result="victory", battle_type="friendly", bans=None,
              battle_time="20250101T120000.000Z"):
    team0 = [make_player("#AAA", "Wesley", "shelly"),
             make_player("#B1", "b1", "colt"),
             make_player("#B2", "b2", "bo")]
    team1 = [make_player("#DDD", "FireCrow", "gale"),
             make_player("#C1", "c1", "bull"),
             make_player("#C2", "c2", "eve")]
    battle = {"teams": [team0, team1], "result": result, "type": battle_type}
    if bans is not None:
        battle["bannedBrawlers"] = bans
    return {"battle": battle,
            "event": {"map": "Hard Rock Mine", "mode": "gemGrab"},
            "battleTime": battle_time}


# ---------------------------------------------------------------------------
# obter_fuso_brasilia
# ---------------------------------------------------------------------------
def test_obter_fuso_brasilia_is_minus_3():
    tz = gerador.obter_fuso_brasilia()
    assert tz.utcoffset(None) == timedelta(hours=-3)


# ---------------------------------------------------------------------------
# formatar_data_brawl
# ---------------------------------------------------------------------------
def test_formatar_data_brawl_valid_converts_to_brasilia():
    # 12:00 UTC -> 09:00 in UTC-3
    assert gerador.formatar_data_brawl("20250101T120000.000Z") == "01/01/2025 09:00:00"


def test_formatar_data_brawl_crosses_day_boundary():
    # 01:00 UTC -> 22:00 previous day in UTC-3
    assert gerador.formatar_data_brawl("20250101T010000.000Z") == "31/12/2024 22:00:00"


@pytest.mark.parametrize("bad", ["", "not-a-date", None])
def test_formatar_data_brawl_invalid_falls_back_to_now(bad):
    out = gerador.formatar_data_brawl(bad)
    assert re.fullmatch(r"\d{2}/\d{2}/\d{4} \d{2}:\d{2}:\d{2}", out)


# ---------------------------------------------------------------------------
# nome_brawler
# ---------------------------------------------------------------------------
@pytest.mark.parametrize("value,expected", [
    ("shelly", "SHELLY"),
    ({"brawler": "colt"}, "COLT"),
    ({"brawlerName": "bo"}, "BO"),
    ({"name": "bull"}, "BULL"),
    ({}, "UNKNOWN"),
    (None, "UNKNOWN"),
    (12345, "UNKNOWN"),
])
def test_nome_brawler(value, expected):
    assert gerador.nome_brawler(value) == expected


def test_nome_brawler_prefers_brawler_key_over_others():
    assert gerador.nome_brawler({"brawler": "leon", "name": "colt"}) == "LEON"


# ---------------------------------------------------------------------------
# buscar_battlelog
# ---------------------------------------------------------------------------
def _patch_get(monkeypatch, sequence):
    """sequence is a list of FakeResp instances or Exception instances."""
    calls = {"count": 0, "urls": []}

    def fake_get(url, headers=None, timeout=None):
        calls["urls"].append(url)
        item = sequence[calls["count"]]
        calls["count"] += 1
        if isinstance(item, Exception):
            raise item
        return item

    monkeypatch.setattr(gerador.requests, "get", fake_get)
    return calls


def test_buscar_battlelog_proxy_success(monkeypatch):
    calls = _patch_get(monkeypatch, [FakeResp(200, {"items": []})])
    resp, origem, erro = gerador.buscar_battlelog("%23AAA", {})
    assert origem == "proxy"
    assert erro is None
    assert resp.status_code == 200
    assert calls["count"] == 1  # did not need the fallback


def test_buscar_battlelog_falls_back_to_direto_on_non_200(monkeypatch):
    _patch_get(monkeypatch, [FakeResp(500, text="boom"), FakeResp(200, {"items": []})])
    resp, origem, erro = gerador.buscar_battlelog("%23AAA", {})
    assert origem == "direto"
    assert erro is None
    assert resp.status_code == 200


def test_buscar_battlelog_falls_back_to_direto_on_exception(monkeypatch):
    _patch_get(monkeypatch, [RuntimeError("conn reset"), FakeResp(200)])
    resp, origem, erro = gerador.buscar_battlelog("%23AAA", {})
    assert origem == "direto"
    assert resp is not None


def test_buscar_battlelog_both_non_200_returns_error(monkeypatch):
    _patch_get(monkeypatch, [FakeResp(403, text="nope"), FakeResp(500, text="down")])
    resp, origem, erro = gerador.buscar_battlelog("%23AAA", {})
    assert resp is None
    assert origem is None
    assert "HTTP 500" in erro


def test_buscar_battlelog_both_raise_returns_exception_error(monkeypatch):
    _patch_get(monkeypatch, [RuntimeError("a"), RuntimeError("b")])
    resp, origem, erro = gerador.buscar_battlelog("%23AAA", {})
    assert resp is None
    assert "Exceção" in erro


# ---------------------------------------------------------------------------
# minerar_dados (integration with mocked network + temp files)
# ---------------------------------------------------------------------------
@pytest.fixture
def small_mapeamento(monkeypatch):
    mapa = {
        "#AAA": {"nome": "Wesley", "id_time": "BH", "nome_time": "BH ESPORTS", "regiao": "SA"},
        "#DDD": {"nome": "FireCrow", "id_time": "LOUD", "nome_time": "LOUD", "regiao": "SA"},
    }
    monkeypatch.setattr(gerador, "MAPEAMENTO_PLAYERS", mapa)
    return mapa


def test_minerar_dados_writes_picks_and_bans(monkeypatch, tmp_path, small_mapeamento):
    bruto = tmp_path / "hist.csv"
    bans = tmp_path / "bans.csv"
    monkeypatch.setattr(gerador, "ARQUIVO_BRUTO", str(bruto))
    monkeypatch.setattr(gerador, "ARQUIVO_BANS", str(bans))
    monkeypatch.chdir(tmp_path)

    item = make_item(result="victory", bans=["gale", "bo"])
    monkeypatch.setattr(gerador.requests, "get",
                        lambda *a, **k: FakeResp(200, {"items": [item]}))

    gerador.minerar_dados()

    df = pd.read_csv(bruto)
    assert list(df.columns) == gerador.COLUNAS_PICKS
    assert len(df) == 6  # one 3v3 game -> 6 rows
    # team0 won (victory), team1 lost
    assert df["win"].tolist() == [1, 1, 1, 0, 0, 0]
    assert df.loc[0, "pick"] == "SHELLY"
    assert df.loc[0, "nome_time"] == "BH ESPORTS"
    assert df.loc[3, "nome_time"] == "LOUD"
    assert set(df["regiao"]) == {"SA"}

    df_bans = pd.read_csv(bans)
    assert list(df_bans.columns) == gerador.COLUNAS_BANS
    assert set(df_bans["brawler_banido"]) == {"GALE", "BO"}


def test_minerar_dados_skips_non_3v3(monkeypatch, tmp_path, small_mapeamento):
    bruto = tmp_path / "hist.csv"
    monkeypatch.setattr(gerador, "ARQUIVO_BRUTO", str(bruto))
    monkeypatch.setattr(gerador, "ARQUIVO_BANS", str(tmp_path / "bans.csv"))
    monkeypatch.chdir(tmp_path)

    bad = {"battle": {"teams": [[make_player("#AAA")], [make_player("#DDD")]]},
           "event": {"map": "M", "mode": "mode"}, "battleTime": "20250101T120000.000Z"}
    monkeypatch.setattr(gerador.requests, "get",
                        lambda *a, **k: FakeResp(200, {"items": [bad]}))

    gerador.minerar_dados()
    assert not bruto.exists()  # nothing valid was written


def test_minerar_dados_handles_connection_failures(monkeypatch, tmp_path, small_mapeamento, capsys):
    monkeypatch.setattr(gerador, "ARQUIVO_BRUTO", str(tmp_path / "hist.csv"))
    monkeypatch.setattr(gerador, "ARQUIVO_BANS", str(tmp_path / "bans.csv"))
    monkeypatch.chdir(tmp_path)

    def boom(*a, **k):
        raise ConnectionError("down")

    monkeypatch.setattr(gerador.requests, "get", boom)
    gerador.minerar_dados()
    out = capsys.readouterr().out
    assert "Nenhum dado novo." in out


def test_minerar_dados_splits_more_than_two_bans(monkeypatch, tmp_path, small_mapeamento):
    bruto = tmp_path / "hist.csv"
    bans = tmp_path / "bans.csv"
    monkeypatch.setattr(gerador, "ARQUIVO_BRUTO", str(bruto))
    monkeypatch.setattr(gerador, "ARQUIVO_BANS", str(bans))
    monkeypatch.chdir(tmp_path)

    item = make_item(result="defeat", bans=["gale", "bo", "leon", "eve"])
    monkeypatch.setattr(gerador.requests, "get",
                        lambda *a, **k: FakeResp(200, {"items": [item]}))

    gerador.minerar_dados()

    df_bans = pd.read_csv(bans)
    assert len(df_bans) == 4
    # first half attributed to team0 (BH), second half to team1 (LOUD)
    assert set(df_bans[df_bans["nome_time"] == "BH ESPORTS"]["brawler_banido"]) == {"GALE", "BO"}
    assert set(df_bans[df_bans["nome_time"] == "LOUD"]["brawler_banido"]) == {"LEON", "EVE"}


def test_minerar_dados_reads_tournament_tags_from_torneios_txt(monkeypatch, tmp_path):
    monkeypatch.setattr(gerador, "MAPEAMENTO_PLAYERS", {})
    monkeypatch.setattr(gerador, "ARQUIVO_BRUTO", str(tmp_path / "hist.csv"))
    monkeypatch.setattr(gerador, "ARQUIVO_BANS", str(tmp_path / "bans.csv"))
    monkeypatch.chdir(tmp_path)
    (tmp_path / "torneios.txt").write_text("12345\n")

    def fake_get(url, headers=None, timeout=None):
        if "matcherino" in url:
            return FakeResp(200, {"body": [{"gameAccounts": "tag #ZZZZZZ end"}]})
        return FakeResp(200, {"items": []})

    monkeypatch.setattr(gerador.requests, "get", fake_get)
    gerador.minerar_dados()

    assert "#ZZZZZZ" in gerador.MAPEAMENTO_PLAYERS
    assert gerador.MAPEAMENTO_PLAYERS["#ZZZZZZ"]["id_time"] == "TRN_12345"


def test_minerar_dados_deduplicates_existing_ids(monkeypatch, tmp_path, small_mapeamento):
    bruto = tmp_path / "hist.csv"
    monkeypatch.setattr(gerador, "ARQUIVO_BRUTO", str(bruto))
    monkeypatch.setattr(gerador, "ARQUIVO_BANS", str(tmp_path / "bans.csv"))
    monkeypatch.chdir(tmp_path)

    item = make_item(result="victory")
    monkeypatch.setattr(gerador.requests, "get",
                        lambda *a, **k: FakeResp(200, {"items": [item]}))

    gerador.minerar_dados()
    first = len(pd.read_csv(bruto))
    # Running again with the same item must not append duplicate rows
    gerador.minerar_dados()
    second = len(pd.read_csv(bruto))
    assert first == second == 6
