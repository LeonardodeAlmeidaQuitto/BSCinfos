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
        // Sempre usa o historico bruto para permitir navegar por TODOS os mapas.
        let bruto = [];
        try { if (typeof dadosBrutos !== "undefined" && Array.isArray(dadosBrutos)) bruto = dadosBrutos; } catch (_) {}
        if (!bruto.length) {
            try { if (typeof dadosFiltrados !== "undefined" && Array.isArray(dadosFiltrados)) bruto = dadosFiltrados; } catch (_) {}
        }
        return condensarHistoricoEmSets(bruto).filter(set =>
            chaveNormalizada(set.modo) === chaveNormalizada(modo) &&
            chaveNormalizada(set.mapa) === chaveNormalizada(mapa)
        );
    }

    function obterTimesCadastrados() {
        const mapa = new Map();
        const registrar = (item, regiaoInformada) => {
            if (!item || typeof item !== "object") return;
            const id = String(item.id_time || item.id || "").trim();
            const nome = String(item.nome_time || item.nome || "").trim();
            const regiao = String(item.regiao || regiaoInformada || "SA").toUpperCase();
            if (!id || /^UNK/i.test(id) || /desconhecid|unknown|unknow/i.test(nome)) return;
            mapa.set(id, { id, nome: nome || obterNomeTimeAutomatico(id), regiao });
        };
        const percorrer = (obj, regiaoInformada) => {
            if (!obj || typeof obj !== "object") return;
            if (Array.isArray(obj)) { obj.forEach(x => percorrer(x, regiaoInformada)); return; }
            if (obj.id_time || obj.id) registrar(obj, regiaoInformada);
            Object.keys(obj).forEach(chave => {
                const valor = obj[chave];
                const novaRegiao = /^(SA|NA|EA|EMEA|ALL)$/i.test(chave) ? chave.toUpperCase() : regiaoInformada;
                if (valor && typeof valor === "object") percorrer(valor, novaRegiao);
            });
        };
        try {
            const rosters = typeof ROSTERS_AUTOMATICOS !== "undefined" ? ROSTERS_AUTOMATICOS : window.ROSTERS_AUTOMATICOS;
            percorrer(rosters, null);
        } catch (_) {}
        try {
            const cfg = typeof CONFIGURACAO_MANUAL_TIMES !== "undefined" ? CONFIGURACAO_MANUAL_TIMES : window.CONFIGURACAO_MANUAL_TIMES;
            percorrer(cfg, null);
        } catch (_) {}
        return mapa;
    }

    function timeRegistradoNaRegiao(idTime) {
        const id = String(idTime || "").trim();
        if (!id || /^UNK/i.test(id)) return false;
        const item = obterTimesCadastrados().get(id);
        if (!item) return false;
        const regiao = obterRegiaoAtualMapas();
        return regiao === "ALL" || item.regiao === regiao;
    }

    function construirEstatisticas(modo, mapa) {
        const sets = obterSetsParaMapa(modo, mapa);
        const times = new Map(), sinergias = new Map(), comps = new Map();

        const registrarTime = (id, nome) => {
            if (!id || !timeRegistradoNaRegiao(id)) return null;
            if (!times.has(id)) times.set(id, { id, nome: nome || obterNomeTimeAutomatico(id), games: 0, wins: 0, losses: 0 });
            return times.get(id);
        };

        const registrarSinergia = (a, b, venceu) => {
            const nomes = [a,b].map(x => String(x || "").toUpperCase()).sort();
            if (!nomes[0] || nomes[0] === nomes[1]) return;
            const chave = nomes.join(" + ");
            if (!sinergias.has(chave)) sinergias.set(chave, { nome: chave, brawlers: nomes, games: 0, wins: 0, losses: 0 });
            const x = sinergias.get(chave); x.games++; venceu ? x.wins++ : x.losses++;
        };

        const registrarComp = (time, comp, venceu) => {
            if (!time || !Array.isArray(comp) || comp.length !== 3) return;
            const trio = [...new Set(comp.map(x => String(x).toUpperCase()))].sort();
            if (trio.length !== 3) return;
            const chave = `${time.id}|||${trio.join(" + ")}`;
            if (!comps.has(chave)) comps.set(chave, { chave, teamId: time.id, teamName: time.nome, comp: trio, games: 0, wins: 0, losses: 0 });
            const x = comps.get(chave); x.games++; venceu ? x.wins++ : x.losses++;
        };

        // Cada GAME real entra uma única vez. SETS não são usados nas tabelas.
        sets.forEach(set => {
            const games = Array.isArray(set.games) ? set.games : [];
            games.forEach(game => {
                const a = registrarTime(game.teamA, game.nomeA), b = registrarTime(game.teamB, game.nomeB);
                if (!a || !b) return; // não mostra partidas com time não cadastrado
                const venceuA = String(game.vencedor) === String(game.teamA);
                const venceuB = String(game.vencedor) === String(game.teamB);
                a.games++; b.games++;
                if (venceuA) { a.wins++; b.losses++; }
                else if (venceuB) { b.wins++; a.losses++; }
                const ca = game.compA || [], cb = game.compB || [];
                for (let i=0;i<ca.length;i++) for (let j=i+1;j<ca.length;j++) registrarSinergia(ca[i],ca[j],venceuA);
                for (let i=0;i<cb.length;i++) for (let j=i+1;j<cb.length;j++) registrarSinergia(cb[i],cb[j],venceuB);
                registrarComp(a,ca,venceuA); registrarComp(b,cb,venceuB);
            });
        });

        const timesArray = Array.from(times.values()).filter(t => t.games > 0).map(t => ({...t, winRate: t.wins/t.games*100}));
        const sinergiasArray = Array.from(sinergias.values()).filter(x => x.games > 0).map(x => ({...x, winRate: x.wins/x.games*100}));
        const compsArray = Array.from(comps.values()).filter(x => x.games > 0).map(x => ({...x, winRate: x.wins/x.games*100}));
        return { sets, times: timesArray, sinergias: sinergiasArray, comps: compsArray };
    }

    function criarTabelaTimes(lista) {
        if (!lista.length) return `<div class="mapas-empty">Sem dados suficientes.</div>`;
        return `<div class="mapas-table-wrap"><table class="excel-table mapas-table"><thead><tr><th>TIME</th><th>WINRATE%</th><th>WINS</th><th>LOSSES</th><th>GAMES</th></tr></thead><tbody>
            ${lista.map(t => `<tr><td style="text-align:left;"><div class="mapas-team-cell"><img src="${escapeHtml(teamLogoUrlSafe(t.id))}" onerror="this.onerror=null;this.src='${escapeHtml(teamLogoFallbackSafe(t.id))}'"><span>${escapeHtml(t.nome)}</span></div></td><td class="winrate-cell">${t.winRate.toFixed(1)}%</td><td>${t.wins}</td><td>${t.losses}</td><td>${t.games}</td></tr>`).join("")}
        </tbody></table></div>`;
    }

    function criarTabelaSinergias(lista) {
        if (!lista.length) return `<div class="mapas-empty">Sem sinergias suficientes.</div>`;
        return `<div class="mapas-table-wrap"><table class="excel-table mapas-table"><thead><tr><th>SINERGIA</th><th>WINRATE%</th><th>WINS</th><th>LOSSES</th><th>GAMES</th></tr></thead><tbody>
            ${lista.map(s => `<tr><td style="text-align:left;font-weight:900;"><div class="mapas-synergy-cell">${s.brawlers.map(b => `<span class="mapas-brawler-pill"><img src="brawlers/pins/${escapeHtml(formatImgSafe(b))}.png" onerror="this.onerror=null;this.src='brawlers/${escapeHtml(formatImgSafe(b))}.png'">${escapeHtml(b)}</span>`).join("")}</div></td><td class="winrate-cell">${s.winRate.toFixed(1)}%</td><td>${s.wins}</td><td>${s.losses}</td><td>${s.games}</td></tr>`).join("")}
        </tbody></table></div>`;
    }

    function criarTabelaComps(lista) {
        if (!lista.length) return `<div class="mapas-empty">Sem comps suficientes.</div>`;
        return `<div class="mapas-table-wrap"><table class="excel-table mapas-table"><thead><tr><th>TIME</th><th>COMP</th><th>WINRATE%</th><th>WINS</th><th>LOSSES</th><th>GAMES</th></tr></thead><tbody>
            ${lista.map(c => `<tr><td style="text-align:left;font-weight:900;">${escapeHtml(c.teamName)}</td><td style="text-align:left;">${c.comp.map(b => `<span class="mapas-brawler-pill"><img src="brawlers/pins/${escapeHtml(formatImgSafe(b))}.png" onerror="this.onerror=null;this.src='brawlers/${escapeHtml(formatImgSafe(b))}.png'">${escapeHtml(b)}</span>`).join("")}</td><td class="winrate-cell">${c.winRate.toFixed(1)}%</td><td>${c.wins}</td><td>${c.losses}</td><td>${c.games}</td></tr>`).join("")}
        </tbody></table></div>`;
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
                         onerror="this.style.display='none'">
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
                             onerror="this.style.display='none'">
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
            .sort((a, b) => b.winRate - a.winRate || b.wins - a.wins || b.games - a.games)
            .slice(0, 5);

        const pioresTimes = [...dados.times]
            .sort((a, b) => a.winRate - b.winRate || a.wins - b.wins || b.games - a.games)
            .slice(0, 5);

        const melhoresSinergias = [...dados.sinergias]
            .sort((a, b) => b.winRate - a.winRate || b.wins - a.wins || b.games - a.games)
            .slice(0, 5);

        const melhoresComps = [...dados.comps]
            .sort((a, b) => b.winRate - a.winRate || b.wins - a.wins || b.games - a.games)
            .slice(0, 5);

        painel.innerHTML = `
            <div class="mapas-header">
                <div>
                    <div class="mapas-mode-label">${escapeHtml(modo)}</div>
                    <h2>${escapeHtml(mapa)}</h2>
                    <div class="mapas-subtitle">
                        ${dados.sets.reduce((total, set) => total + (Array.isArray(set.games) ? set.games.length : 0), 0)} GAMES analisados
                    </div>
                </div>
                <img
                    class="mapas-main-image"
                    src="element/maps/${escapeHtml(formatImgSafe(mapa))}.png"
                    onerror="this.style.display='none'"
                >
            </div>

            <section class="mapas-section">
                <div class="mapas-section-title">
                    <span>🏆 MELHORES TIMES</span>
                    <small>Contado por GAME</small>
                </div>
                ${criarTabelaTimes(melhoresTimes)}
            </section>

            <section class="mapas-section">
                <div class="mapas-section-title">
                    <span>📉 PIORES TIMES</span>
                    <small>Top 5 com menor WinRate</small>
                </div>
                ${criarTabelaTimes(pioresTimes)}
            </section>

            <section class="mapas-section">
                <div class="mapas-section-title">
                    <span>🤝 MELHORES SINERGIAS</span>
                    <small>Par de brawlers do mesmo time, contado por GAME</small>
                </div>
                ${criarTabelaSinergias(melhoresSinergias)}
            </section>

            <section class="mapas-section">
                <div class="mapas-section-title">
                    <span>🔥 MELHORES COMPS</span>
                    <small>Trio do mesmo time, contado por GAME</small>
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
