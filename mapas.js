/*
 * MAPAS - BSCinfos
 * ------------------------------------------------------------
 * Esta tela NÃO substitui nenhuma função do app.js.
 * Ela usa:
 *   - ROTACAO_MAPAS já existente no app.js
 *   - historico_bruto.csv já carregado pelo app.js
 *   - _estatisticasPorSetCache, quando o app.js disponibilizar
 *   - rosters.json/ROSTERS_AUTOMATICOS, quando disponível
 *
 * As estatísticas são contabilizadas por SET.
 * Um SET é formado por 2 ou 3 games do mesmo confronto,
 * no mesmo modo/mapa e com a mesma composição.
 */

(function () {
    "use strict";

    let mapaSelecionado = null;
    let mapaDadosCache = {};

    const escapeHtml = (valor) => String(valor ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

    const chaveNormalizada = (valor) =>
        String(valor || "").toLowerCase().replace(/[^a-z0-9]/g, "");

    const numero = (valor) => {
        const n = Number(valor);
        return Number.isFinite(n) ? n : 0;
    };

    const pct = (wins, total) =>
        total > 0 ? ((wins / total) * 100).toFixed(1) + "%" : "0.0%";

    function obterRegiaoAtualMapas() {
        return String(
            typeof _REGIAO !== "undefined"
                ? _REGIAO
                : (window.REGIAO_ATUAL || "SA")
        ).toUpperCase();
    }

    function obterRotacaoCompleta() {
        const rotacao =
            typeof ROTACAO_MAPAS !== "undefined"
                ? ROTACAO_MAPAS
                : window.ROTACAO_MAPAS;

        if (!rotacao || typeof rotacao !== "object") return {};

        const resultado = {};

        Object.keys(rotacao).forEach(ano => {
            const meses = rotacao[ano];
            if (!meses || typeof meses !== "object") return;

            Object.keys(meses).forEach(mes => {
                const modos = meses[mes];
                if (!modos || typeof modos !== "object") return;

                Object.keys(modos).forEach(modo => {
                    if (!Array.isArray(modos[modo])) return;

                    if (!resultado[modo]) resultado[modo] = [];

                    modos[modo].forEach(mapa => {
                        const nome = String(mapa || "").trim();
                        if (
                            nome &&
                            !resultado[modo].some(
                                x => chaveNormalizada(x) === chaveNormalizada(nome)
                            )
                        ) {
                            resultado[modo].push(nome);
                        }
                    });
                });
            });
        });

        return resultado;
    }

    function obterNomeTimeAutomatico(idTime) {
        const id = String(idTime || "");
        const rosters =
            typeof ROSTERS_AUTOMATICOS !== "undefined"
                ? ROSTERS_AUTOMATICOS
                : window.ROSTERS_AUTOMATICOS;

        if (rosters && typeof rosters === "object") {
            for (const item of Object.values(rosters)) {
                if (
                    item &&
                    String(item.id_time || "") === id &&
                    item.nome_time
                ) {
                    return item.nome_time;
                }
            }
        }

        return id || "TIME DESCONHECIDO";
    }

    function estaNaRegiaoAtual(idTime) {
        const regiao = obterRegiaoAtualMapas();

        if (regiao === "ALL") return true;

        try {
            if (typeof isTimeDaRegiaoAtual === "function") {
                return isTimeDaRegiaoAtual(idTime);
            }
        } catch (_) {}

        const rosters =
            typeof ROSTERS_AUTOMATICOS !== "undefined"
                ? ROSTERS_AUTOMATICOS
                : window.ROSTERS_AUTOMATICOS;

        if (rosters && typeof rosters === "object") {
            return Object.values(rosters).some(item =>
                item &&
                String(item.id_time || "") === String(idTime || "") &&
                String(item.regiao || "SA").toUpperCase() === regiao
            );
        }

        return true;
    }

    function obterLinhasFonte() {
        /*
         * Preferimos os dados já condensados por SET quando o app.js
         * disponibilizar o cache. Isso evita contar os 3 jogadores
         * ou os games individualmente.
         */
        try {
            const cache = window._estatisticasPorSetCache;
            if (
                cache &&
                Array.isArray(cache.linhas) &&
                cache.linhas.length
            ) {
                return cache.linhas.map(x => ({ ...x }));
            }
        } catch (_) {}

        /*
         * Fallback: usa o histórico bruto e monta os SETs aqui.
         */
        let bruto = [];
        try {
            if (typeof dadosBrutos !== "undefined" && Array.isArray(dadosBrutos)) {
                bruto = dadosBrutos;
            }
        } catch (_) {}

        if (!bruto.length) {
            try {
                if (typeof dadosFiltrados !== "undefined" && Array.isArray(dadosFiltrados)) {
                    bruto = dadosFiltrados;
                }
            } catch (_) {}
        }

        return condensarHistoricoEmSets(bruto);
    }

    function agruparGames(bruto) {
        const grupos = new Map();

        bruto.forEach(row => {
            const id = String(row.id_partida || "").trim();
            if (!id) return;

            if (!grupos.has(id)) grupos.set(id, []);
            grupos.get(id).push(row);
        });

        const games = [];

        grupos.forEach(linhas => {
            if (linhas.length < 6) return;

            const ladoA = linhas.slice(0, 3);
            const ladoB = linhas.slice(3, 6);

            if (ladoA.length !== 3 || ladoB.length !== 3) return;

            const teamA = String(ladoA[0].id_time || "").trim();
            const teamB = String(ladoB[0].id_time || "").trim();

            if (!teamA || !teamB || teamA === teamB) return;

            const tagsA = ladoA.map(x => x.player_tag).filter(Boolean);
            const tagsB = ladoB.map(x => x.player_tag).filter(Boolean);

            const compA = ladoA
                .map(x => String(x.pick || "").toUpperCase())
                .filter(Boolean);

            const compB = ladoB
                .map(x => String(x.pick || "").toUpperCase())
                .filter(Boolean);

            if (compA.length !== 3 || compB.length !== 3) return;

            const vencedor =
                numero(ladoA[0].win) === 1 ? teamA : teamB;

            const timestamp = (() => {
                try {
                    if (typeof parseDateBR === "function") {
                        return parseDateBR(ladoA[0].data_adicao);
                    }
                } catch (_) {}
                return 0;
            })();

            games.push({
                id: String(ladoA[0].id_partida),
                modo: String(ladoA[0].modo || "Desconhecido"),
                mapa: String(ladoA[0].mapa || "Desconhecido"),
                teamA,
                teamB,
                nomeA: ladoA[0].nome_time || obterNomeTimeAutomatico(teamA),
                nomeB: ladoB[0].nome_time || obterNomeTimeAutomatico(teamB),
                tagsA,
                tagsB,
                compA,
                compB,
                vencedor,
                timestamp,
                linhas: [...ladoA, ...ladoB]
            });
        });

        return games.sort((a, b) => a.timestamp - b.timestamp);
    }

    function assinaturaComposicao(comp) {
        return [...comp].sort().join("|");
    }

    function condensarHistoricoEmSets(bruto) {
        if (!Array.isArray(bruto) || !bruto.length) return [];

        const games = agruparGames(bruto);
        const sets = [];

        /*
         * Um SET:
         * - mesmo confronto;
         * - mesmo modo;
         * - mesmo mapa;
         * - mesma composição dos dois lados;
         * - máximo de 3 games;
         * - termina em 2 vitórias de um lado ou após o 3º game.
         */
        games.forEach(game => {
            const chave = [
                [game.teamA, game.teamB].sort().join("::"),
                chaveNormalizada(game.modo),
                chaveNormalizada(game.mapa),
                assinaturaComposicao(game.compA),
                assinaturaComposicao(game.compB)
            ].join("###");

            let ultimo = null;

            for (let i = sets.length - 1; i >= 0; i--) {
                const candidato = sets[i];
                if (candidato.chave === chave) {
                    ultimo = candidato;
                    break;
                }
                if (
                    game.timestamp &&
                    candidato.ultimoTimestamp &&
                    game.timestamp - candidato.ultimoTimestamp > 2 * 60 * 60 * 1000
                ) {
                    break;
                }
            }

            if (
                ultimo &&
                ultimo.games.length < 3 &&
                (!game.timestamp ||
                    !ultimo.ultimoTimestamp ||
                    game.timestamp - ultimo.ultimoTimestamp <= 2 * 60 * 60 * 1000)
            ) {
                ultimo.games.push(game);
                ultimo.ultimoTimestamp = game.timestamp;

                if (game.vencedor === ultimo.teamA) ultimo.winsA++;
                if (game.vencedor === ultimo.teamB) ultimo.winsB++;
            } else {
                const novo = {
                    chave,
                    games: [game],
                    teamA: game.teamA,
                    teamB: game.teamB,
                    nomeA: game.nomeA,
                    nomeB: game.nomeB,
                    modo: game.modo,
                    mapa: game.mapa,
                    compA: game.compA,
                    compB: game.compB,
                    winsA: game.vencedor === game.teamA ? 1 : 0,
                    winsB: game.vencedor === game.teamB ? 1 : 0,
                    ultimoTimestamp: game.timestamp
                };

                sets.push(novo);
            }
        });

        /*
         * Só consideramos SET completo quando terminou 2-0, 2-1 ou 1-2.
         * Assim uma partida isolada não vira artificialmente um SET.
         */
        return sets
            .filter(set => {
                const n = set.games.length;
                return (
                    n >= 2 &&
                    n <= 3 &&
                    (set.winsA === 2 || set.winsB === 2)
                );
            })
            .map((set, index) => ({
                ...set,
                id_set:
                    `${set.modo}|${set.mapa}|${set.teamA}|${set.teamB}|${index}`,
                vencedor:
                    set.winsA > set.winsB ? set.teamA : set.teamB
            }));
    }

    function obterSetsParaMapa(modo, mapa) {
        /*
         * Quando o app.js tem dados condensados por SET, transformamos
         * cada conjunto de 3 linhas de cada time em um registro único.
         */
        let cache = null;
        try {
            cache = window._estatisticasPorSetCache;
        } catch (_) {}

        if (
            cache &&
            Array.isArray(cache.linhas) &&
            cache.linhas.length
        ) {
            const grupos = new Map();

            cache.linhas
                .filter(row =>
                    chaveNormalizada(row.modo) === chaveNormalizada(modo) &&
                    chaveNormalizada(row.mapa) === chaveNormalizada(mapa)
                )
                .forEach(row => {
                    const idSet = String(
                        row.id_set || row.id_partida || ""
                    );

                    if (!idSet) return;

                    if (!grupos.has(idSet)) grupos.set(idSet, []);
                    grupos.get(idSet).push(row);
                });

            const resultado = [];

            grupos.forEach((linhas, idSet) => {
                const times = new Map();

                linhas.forEach(row => {
                    const id = String(row.id_time || "");
                    if (!id) return;

                    if (!times.has(id)) {
                        times.set(id, {
                            id: id,
                            nome:
                                row.nome_time ||
                                obterNomeTimeAutomatico(id),
                            picks: [],
                            rows: []
                        });
                    }

                    const time = times.get(id);
                    const pick = String(row.pick || "").toUpperCase();

                    if (pick && !time.picks.includes(pick)) {
                        time.picks.push(pick);
                    }

                    time.rows.push(row);
                });

                const lados = Array.from(times.values());

                if (lados.length !== 2) return;

                const vencedor = lados[0].rows.some(
                    r => numero(r.win) === 1
                )
                    ? lados[0].id
                    : lados[1].id;

                resultado.push({
                    id_set: idSet,
                    modo,
                    mapa,
                    teamA: lados[0].id,
                    teamB: lados[1].id,
                    nomeA: lados[0].nome,
                    nomeB: lados[1].nome,
                    compA: lados[0].picks.slice(0, 3),
                    compB: lados[1].picks.slice(0, 3),
                    vencedor,
                    games: [],
                    winsA: vencedor === lados[0].id ? 1 : 0,
                    winsB: vencedor === lados[1].id ? 1 : 0
                });
            });

            if (resultado.length) return resultado;
        }

        let bruto = [];
        try {
            if (typeof dadosBrutos !== "undefined") bruto = dadosBrutos;
        } catch (_) {}

        const sets = condensarHistoricoEmSets(bruto);

        return sets.filter(set =>
            chaveNormalizada(set.modo) === chaveNormalizada(modo) &&
            chaveNormalizada(set.mapa) === chaveNormalizada(mapa)
        );
    }

    function construirEstatisticas(modo, mapa) {
        const sets = obterSetsParaMapa(modo, mapa);

        const times = new Map();
        const sinergias = new Map();
        const comps = new Map();

        const registrarTime = (id, nome) => {
            if (!id) return null;

            if (!times.has(id)) {
                times.set(id, {
                    id,
                    nome: nome || obterNomeTimeAutomatico(id),
                    sets: 0,
                    wins: 0,
                    losses: 0,
                    games: 0,
                    gameWins: 0
                });
            }

            return times.get(id);
        };

        const registrarSinergia = (a, b, venceu) => {
            const nomes = [a, b].sort();
            const chave = nomes.join(" + ");

            if (!sinergias.has(chave)) {
                sinergias.set(chave, {
                    nome: chave,
                    sets: 0,
                    wins: 0,
                    losses: 0
                });
            }

            const item = sinergias.get(chave);
            item.sets++;

            if (venceu) item.wins++;
            else item.losses++;
        };

        const registrarComp = (time, comp, venceu) => {
            if (!time || !Array.isArray(comp) || comp.length !== 3) return;

            const trio = [...new Set(comp.map(x => String(x).toUpperCase()))]
                .sort();

            if (trio.length !== 3) return;

            const chave = `${time.id}|||${trio.join(" + ")}`;

            if (!comps.has(chave)) {
                comps.set(chave, {
                    chave,
                    teamId: time.id,
                    teamName: time.nome,
                    comp: trio,
                    sets: 0,
                    wins: 0,
                    losses: 0
                });
            }

            const item = comps.get(chave);
            item.sets++;

            if (venceu) item.wins++;
            else item.losses++;
        };

        sets.forEach(set => {
            const timeA = registrarTime(set.teamA, set.nomeA);
            const timeB = registrarTime(set.teamB, set.nomeB);

            if (!timeA || !timeB) return;

            const venceuA = String(set.vencedor) === String(set.teamA);
            const venceuB = String(set.vencedor) === String(set.teamB);

            timeA.sets++;
            timeB.sets++;

            if (venceuA) timeA.wins++;
            else timeA.losses++;

            if (venceuB) timeB.wins++;
            else timeB.losses++;

            const games = Array.isArray(set.games) ? set.games : [];

            if (games.length) {
                timeA.games += games.length;
                timeB.games += games.length;

                games.forEach(game => {
                    if (String(game.vencedor) === String(game.teamA)) {
                        timeA.gameWins++;
                        timeB.gameWins += 0;
                    } else {
                        timeB.gameWins++;
                    }
                });
            } else {
                /*
                 * O cache de SET já representa o resultado do SET.
                 * Mantemos um jogo lógico apenas para não deixar WR vazio.
                 */
                timeA.games++;
                timeB.games++;

                if (venceuA) timeA.gameWins++;
                if (venceuB) timeB.gameWins++;
            }

            const compA = set.compA || [];
            const compB = set.compB || [];

            for (let i = 0; i < compA.length; i++) {
                for (let j = i + 1; j < compA.length; j++) {
                    registrarSinergia(
                        compA[i],
                        compA[j],
                        venceuA
                    );
                }
            }

            for (let i = 0; i < compB.length; i++) {
                for (let j = i + 1; j < compB.length; j++) {
                    registrarSinergia(
                        compB[i],
                        compB[j],
                        venceuB
                    );
                }
            }

            registrarComp(timeA, compA, venceuA);
            registrarComp(timeB, compB, venceuB);
        });

        const timesArray = Array.from(times.values())
            .filter(t => estaNaRegiaoAtual(t.id))
            .map(t => ({
                ...t,
                winRate: t.games ? (t.gameWins / t.games) * 100 : 0,
                setRate: t.sets ? (t.wins / t.sets) * 100 : 0
            }));

        const sinergiasArray = Array.from(sinergias.values())
            .filter(x => x.sets >= 1)
            .map(x => ({
                ...x,
                winRate: x.sets ? (x.wins / x.sets) * 100 : 0
            }));

        const compsArray = Array.from(comps.values())
            .filter(x =>
                x.sets >= 1 &&
                estaNaRegiaoAtual(x.teamId)
            )
            .map(x => ({
                ...x,
                winRate: x.sets ? (x.wins / x.sets) * 100 : 0
            }));

        return {
            sets,
            times: timesArray,
            sinergias: sinergiasArray,
            comps: compsArray
        };
    }

    function criarTabelaTimes(lista, mostrarGames) {
        if (!lista.length) {
            return `<div class="mapas-empty">Sem dados suficientes.</div>`;
        }

        return `
            <div class="mapas-table-wrap">
                <table class="excel-table mapas-table">
                    <thead>
                        <tr>
                            <th>TIME</th>
                            <th>WINRATE%</th>
                            <th>SETRATE%</th>
                            <th>WINS</th>
                            <th>SETS</th>
                            ${mostrarGames ? "<th>GAMES</th>" : ""}
                        </tr>
                    </thead>
                    <tbody>
                        ${lista.map(t => `
                            <tr>
                                <td style="text-align:left;">
                                    <div class="mapas-team-cell">
                                        <img
                                            src="${escapeHtml(teamLogoUrlSafe(t.id))}"
                                            onerror="this.onerror=null;this.src='${escapeHtml(teamLogoFallbackSafe(t.id))}'"
                                        >
                                        <span>${escapeHtml(t.nome)}</span>
                                    </div>
                                </td>
                                <td class="winrate-cell">${t.winRate.toFixed(1)}%</td>
                                <td>${t.setRate.toFixed(1)}%</td>
                                <td>${t.wins}</td>
                                <td>${t.sets}</td>
                                ${mostrarGames ? `<td>${t.games}</td>` : ""}
                            </tr>
                        `).join("")}
                    </tbody>
                </table>
            </div>
        `;
    }

    function criarTabelaSinergias(lista) {
        if (!lista.length) {
            return `<div class="mapas-empty">Sem sinergias suficientes.</div>`;
        }

        return `
            <div class="mapas-table-wrap">
                <table class="excel-table mapas-table">
                    <thead>
                        <tr>
                            <th>SINERGIA</th>
                            <th>WINRATE%</th>
                            <th>WINS</th>
                            <th>LOSSES</th>
                            <th>SETS</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${lista.map(s => `
                            <tr>
                                <td style="text-align:left;font-weight:900;">
                                    ${s.comp ? s.comp.join(" + ") : escapeHtml(s.nome)}
                                </td>
                                <td class="winrate-cell">${s.winRate.toFixed(1)}%</td>
                                <td>${s.wins}</td>
                                <td>${s.losses}</td>
                                <td>${s.sets}</td>
                            </tr>
                        `).join("")}
                    </tbody>
                </table>
            </div>
        `;
    }

    function criarTabelaComps(lista) {
        if (!lista.length) {
            return `<div class="mapas-empty">Sem comps suficientes.</div>`;
        }

        return `
            <div class="mapas-table-wrap">
                <table class="excel-table mapas-table">
                    <thead>
                        <tr>
                            <th>TIME</th>
                            <th>COMP</th>
                            <th>WINRATE%</th>
                            <th>WINS</th>
                            <th>LOSSES</th>
                            <th>SETS</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${lista.map(c => `
                            <tr>
                                <td style="text-align:left;font-weight:900;">
                                    ${escapeHtml(c.teamName)}
                                </td>
                                <td style="text-align:left;">
                                    ${c.comp.map(b => `
                                        <span class="mapas-brawler-pill">
                                            <img src="brawlers/${escapeHtml(formatImgSafe(b))}.png"
                                                 onerror="this.src='brawlers/default.png'">
                                            ${escapeHtml(b)}
                                        </span>
                                    `).join("")}
                                </td>
                                <td class="winrate-cell">${c.winRate.toFixed(1)}%</td>
                                <td>${c.wins}</td>
                                <td>${c.losses}</td>
                                <td>${c.sets}</td>
                            </tr>
                        `).join("")}
                    </tbody>
                </table>
            </div>
        `;
    }

    function teamLogoUrlSafe(id) {
        try {
            if (typeof teamLogoUrl === "function") return teamLogoUrl(id);
        } catch (_) {}
        return `element/teams/${String(id || "").toLowerCase()}.png`;
    }

    function teamLogoFallbackSafe(id) {
        try {
            if (typeof teamLogoFallback === "function") return teamLogoFallback(id);
        } catch (_) {}
        return "element/teams/default.png";
    }

    function formatImgSafe(nome) {
        try {
            if (typeof formatImg === "function") return formatImg(nome);
        } catch (_) {}
        return String(nome || "default")
            .toLowerCase()
            .replace(/[^a-z0-9]/g, "");
    }

    function renderizarSidebarMapas() {
        const sidebar = document.getElementById("sidebar-mapas");
        if (!sidebar) return;

        const rotacao = obterRotacaoCompleta();
        const modos = Object.keys(rotacao);

        if (!modos.length) {
            sidebar.innerHTML = `
                <div class="mapas-empty">
                    Nenhuma rotação de mapas encontrada no app.js.
                </div>
            `;
            return;
        }

        let html = "";

        modos.forEach((modo, modoIndex) => {
            html += `
                <div class="mapas-modo-title">
                    <img src="element/modes/${escapeHtml(formatImgSafe(modo))}.png"
                         onerror="this.src='element/modes/default.png'">
                    <span>${escapeHtml(modo)}</span>
                </div>
            `;

            rotacao[modo].forEach((mapa, mapaIndex) => {
                const id = `mapa-${modoIndex}-${mapaIndex}`;

                html += `
                    <button
                        id="${id}"
                        class="mapas-sidebar-item"
                        data-modo="${escapeHtml(modo)}"
                        data-mapa="${escapeHtml(mapa)}"
                        onclick="window.selecionarMapaAnalise(${JSON.stringify(modo)}, ${JSON.stringify(mapa)})"
                    >
                        <img src="element/maps/${escapeHtml(formatImgSafe(mapa))}.png"
                             onerror="this.src='element/maps/default.png'">
                        <span>${escapeHtml(mapa)}</span>
                    </button>
                `;
            });
        });

        sidebar.innerHTML = html;

        if (!mapaSelecionado) {
            const primeiroModo = modos[0];
            const primeiroMapa = rotacao[primeiroModo][0];

            if (primeiroMapa) {
                window.selecionarMapaAnalise(primeiroModo, primeiroMapa);
            }
        } else {
            window.selecionarMapaAnalise(
                mapaSelecionado.modo,
                mapaSelecionado.mapa
            );
        }
    }

    window.selecionarMapaAnalise = function (modo, mapa) {
        mapaSelecionado = { modo, mapa };

        document.querySelectorAll(".mapas-sidebar-item").forEach(btn => {
            const ativo =
                chaveNormalizada(btn.dataset.modo) === chaveNormalizada(modo) &&
                chaveNormalizada(btn.dataset.mapa) === chaveNormalizada(mapa);

            btn.classList.toggle("active", ativo);
        });

        renderizarDetalhesMapa(modo, mapa);
    };

    function renderizarDetalhesMapa(modo, mapa) {
        const painel = document.getElementById("painel-info-mapa");
        if (!painel) return;

        const chave = `${chaveNormalizada(modo)}|||${chaveNormalizada(mapa)}`;

        if (!mapaDadosCache[chave]) {
            mapaDadosCache[chave] = construirEstatisticas(modo, mapa);
        }

        const dados = mapaDadosCache[chave];

        const melhoresTimes = [...dados.times]
            .sort((a, b) =>
                b.setRate - a.setRate ||
                b.wins - a.wins ||
                b.sets - a.sets
            );

        const pioresTimes = [...dados.times]
            .filter(t => t.sets >= 2)
            .sort((a, b) =>
                a.setRate - b.setRate ||
                a.wins - b.wins ||
                a.sets - b.sets
            );

        const melhoresSinergias = [...dados.sinergias]
            .sort((a, b) =>
                b.winRate - a.winRate ||
                b.wins - a.wins ||
                b.sets - a.sets
            )
            .slice(0, 15);

        const melhoresComps = [...dados.comps]
            .sort((a, b) =>
                b.winRate - a.winRate ||
                b.wins - a.wins ||
                b.sets - a.sets
            )
            .slice(0, 15);

        painel.innerHTML = `
            <div class="mapas-header">
                <div>
                    <div class="mapas-mode-label">${escapeHtml(modo)}</div>
                    <h2>${escapeHtml(mapa)}</h2>
                    <div class="mapas-subtitle">
                        ${dados.sets.length} SETS analisados
                    </div>
                </div>
                <img
                    class="mapas-main-image"
                    src="element/maps/${escapeHtml(formatImgSafe(mapa))}.png"
                    onerror="this.src='element/maps/default.png'"
                >
            </div>

            <section class="mapas-section">
                <div class="mapas-section-title">
                    <span>🏆 MELHORES TIMES</span>
                    <small>WinRate% = games | SetRate% = sets</small>
                </div>
                ${criarTabelaTimes(melhoresTimes, true)}
            </section>

            <section class="mapas-section">
                <div class="mapas-section-title">
                    <span>📉 PIORES TIMES</span>
                    <small>Mínimo de 2 sets</small>
                </div>
                ${criarTabelaTimes(pioresTimes, true)}
            </section>

            <section class="mapas-section">
                <div class="mapas-section-title">
                    <span>🤝 MELHORES SINERGIAS</span>
                    <small>Par de brawlers do mesmo time, contado por SET</small>
                </div>
                ${criarTabelaSinergias(melhoresSinergias)}
            </section>

            <section class="mapas-section">
                <div class="mapas-section-title">
                    <span>🔥 MELHORES COMPS</span>
                    <small>Trio do mesmo time, contado por SET</small>
                </div>
                ${criarTabelaComps(melhoresComps)}
            </section>
        `;
    }

    function limparCacheEAtualizarMapas() {
        mapaDadosCache = {};
        renderizarSidebarMapas();
    }

    function instalarIntegracaoComApp() {
        /*
         * processarDadosGlobais já existe no app.js.
         * Envolvemos a função sem apagar a original.
         */
        if (
            typeof window.processarDadosGlobais === "function" &&
            !window.__MAPAS_PROCESSAR_WRAPPED
        ) {
            const original = window.processarDadosGlobais;

            window.processarDadosGlobais = function () {
                const retorno = original.apply(this, arguments);

                setTimeout(() => {
                    limparCacheEAtualizarMapas();
                }, 0);

                return retorno;
            };

            window.__MAPAS_PROCESSAR_WRAPPED = true;
        }
    }

    document.addEventListener("DOMContentLoaded", () => {
        instalarIntegracaoComApp();
        renderizarSidebarMapas();

        /*
         * O CSV é carregado de forma assíncrona pelo app.js.
         * Fazemos pequenas verificações até os dados aparecerem,
         * sem alterar o fluxo original do aplicativo.
         */
        let tentativas = 0;

        const timer = setInterval(() => {
            tentativas++;

            instalarIntegracaoComApp();

            let quantidade = 0;

            try {
                if (typeof dadosBrutos !== "undefined") {
                    quantidade = Array.isArray(dadosBrutos)
                        ? dadosBrutos.length
                        : 0;
                }
            } catch (_) {}

            if (quantidade > 0 || tentativas >= 30) {
                limparCacheEAtualizarMapas();
                clearInterval(timer);
            }
        }, 500);
    });

    /*
     * Se o usuário entrar na tela MAPAS depois do carregamento,
     * ela é renderizada novamente.
     */
    document.addEventListener("click", event => {
        const alvo = event.target.closest?.('a[onclick*="mudarTela(\'mapas\')"]');
        if (alvo) {
            setTimeout(() => {
                limparCacheEAtualizarMapas();
            }, 50);
        }
    });

})();
