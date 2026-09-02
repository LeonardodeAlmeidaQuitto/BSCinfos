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
 * A tela lista todos os mapas encontrados nas rotações do app.js.
 * As tabelas desta tela são contabilizadas por GAME.
 * O histórico bruto é usado para preservar cada game individual,
 * inclusive os games de um mesmo SET 2-0 ou 2-1.
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
        String(valor || "")
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .replace(/[^a-z0-9]/g, "");

    const numero = (valor) => {
        const n = Number(valor);
        return Number.isFinite(n) ? n : 0;
    };

    const pct = (wins, total) =>
        total > 0 ? ((wins / total) * 100).toFixed(1) + "%" : "0.0%";

    /* Estilo dos controles de navegação, sem depender do style.css. */
    const estilosNavegacao = document.createElement("style");
    estilosNavegacao.textContent = `
        .mapas-nav-btn {
            border: 1px solid rgba(192,0,255,.55);
            background: rgba(192,0,255,.08);
            color: #fff;
            border-radius: 6px;
            padding: 7px 10px;
            cursor: pointer;
            font-size: 10px;
            font-weight: 900;
        }
        .mapas-nav-btn:hover {
            background: rgba(192,0,255,.18);
        }
    `;
    if (document.head) document.head.appendChild(estilosNavegacao);

    function obterRegiaoAtualMapas() {
        return String(
            typeof _REGIAO !== "undefined"
                ? _REGIAO
                : (window.REGIAO_ATUAL || "SA")
        ).toUpperCase();
    }

    function obterRotacaoCompleta() {
        const rotacao =
            typeof ROTACAO_MAPAS !== 'undefined'
                ? ROTACAO_MAPAS
                : window.ROTACAO_MAPAS;

        if (!rotacao || typeof rotacao !== 'object') return {};

        const resultado = {};

        const adicionar = (modo, mapas) => {
            if (!Array.isArray(mapas)) return;
            if (!resultado[modo]) resultado[modo] = [];

            mapas.forEach(mapa => {
                const nome = String(mapa || '').trim();
                if (!nome) return;
                if (!resultado[modo].some(x => chaveNormalizada(x) === chaveNormalizada(nome))) {
                    resultado[modo].push(nome);
                }
            });
        };

        /* Estrutura normal do app.js: ano -> mes -> modo -> mapas[] */
        Object.keys(rotacao).forEach(ano => {
            const meses = rotacao[ano];
            if (!meses || typeof meses !== 'object') return;

            /* Tambem aceita diretamente modo -> mapas[], caso a estrutura mude. */
            Object.keys(meses).forEach(mesOuModo => {
                const valor = meses[mesOuModo];
                if (!valor || typeof valor !== 'object') return;

                if (Array.isArray(valor)) {
                    adicionar(mesOuModo, valor);
                    return;
                }

                Object.keys(valor).forEach(modo => {
                    adicionar(modo, valor[modo]);
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

    function obterRostersCadastrados() {
        /*
         * IMPORTANTE: o app.js normaliza o rosters.json e coloca a fonte
         * oficial em CONFIGURACAO_MANUAL_TIMES.
         *
         * Não usamos somente ROSTERS_AUTOMATICOS aqui porque ele é agrupado
         * por região/tier e a tela MAPAS precisa consultar exatamente os
         * times que o restante do site considera cadastrados.
         */
        try {
            if (typeof CONFIGURACAO_MANUAL_TIMES !== "undefined" &&
                CONFIGURACAO_MANUAL_TIMES &&
                typeof CONFIGURACAO_MANUAL_TIMES === "object") {
                return CONFIGURACAO_MANUAL_TIMES;
            }
        } catch (_) {}

        if (window.CONFIGURACAO_MANUAL_TIMES &&
            typeof window.CONFIGURACAO_MANUAL_TIMES === "object") {
            return window.CONFIGURACAO_MANUAL_TIMES;
        }

        return {};
    }

    function ehTimeCadastrado(idTime, nomeTime) {
        const id = String(idTime ?? "").trim();
        const nome = chaveNormalizada(nomeTime || "");
        if (!id && !nome) return false;

        /* Nunca aceitar os times artificiais criados para jogadores sem roster. */
        if (/^UNK\d*$/i.test(id)) return false;
        if (/^unknown(?:\s|$)/i.test(String(nomeTime || "").trim())) return false;
        if (/^unknow(?:\s|$)/i.test(String(nomeTime || "").trim())) return false;
        if (/^desconhecido(?:\s|$)/i.test(String(nomeTime || "").trim())) return false;

        const configuracao = obterRostersCadastrados();
        if (!configuracao || typeof configuracao !== "object") return false;

        /*
         * CONFIGURACAO_MANUAL_TIMES possui a estrutura:
         * REGIAO -> TIER -> [{ id_time, nome_time, jogadores }]
         * O próprio app.js usa essa estrutura para montar a tela TIMES.
         * Portanto esta é a mesma fonte usada para decidir se um time é
         * cadastrado, sem depender de uma cópia diferente do JSON.
         */
        for (const regiao of Object.keys(configuracao)) {
            const porTier = configuracao[regiao];
            if (!porTier || typeof porTier !== "object") continue;

            for (const tier of Object.keys(porTier)) {
                /* TIER ? contém somente times descobertos automaticamente e
                   NÃO são times cadastrados. */
                if (tier === "TIER ?") continue;

                const lista = porTier[tier];
                if (!Array.isArray(lista)) continue;

                for (const item of lista) {
                    if (!item || typeof item !== "object") continue;

                    const idCadastro = String(
                        item.id_time ?? item.teamId ?? item.team_id ?? item.id ?? ""
                    ).trim();
                    const nomeCadastro = String(
                        item.nome_time ?? item.teamName ?? item.team_name ?? item.nome ?? item.name ?? ""
                    ).trim();

                    if (id && idCadastro && idCadastro === id) return true;
                    if (nome && nomeCadastro && chaveNormalizada(nomeCadastro) === nome) return true;
                }
            }
        }

        return false;
    }

    async function carregarRosterAutomatico() {
        /*
         * O app.js já carrega e normaliza rosters.json.
         * Aqui apenas esperamos CONFIGURACAO_MANUAL_TIMES ficar disponível.
         * Fazer um fetch independente de "roster.json" causava a tela MAPAS
         * ficar sem dados quando o arquivo tinha outro fluxo de carregamento.
         */
        for (let tentativa = 0; tentativa < 60; tentativa++) {
            try {
                if (obterRostersCadastrados() &&
                    Object.keys(obterRostersCadastrados()).length > 0) {
                    return true;
                }
            } catch (_) {}

            await new Promise(resolve => setTimeout(resolve, 100));
        }

        return false;
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
        /*
         * IMPORTANTE:
         * A tela MAPAS precisa trabalhar com TODO o historico_bruto.csv,
         * e nao com dadosFiltrados/_estatisticasPorSetCache.
         *
         * Tambem nao assumimos que as 3 linhas do time A estejam sempre
         * nas primeiras 3 posições do id_partida. Agrupamos por id_time,
         * o que evita perder mapas quando a ordem das linhas do CSV muda.
         */
        if (!Array.isArray(bruto) || !bruto.length) return [];

        const grupos = new Map();

        bruto.forEach(row => {
            const id = String(row?.id_partida || '').trim();
            if (!id) return;

            if (!grupos.has(id)) grupos.set(id, []);
            grupos.get(id).push(row);
        });

        const games = [];

        grupos.forEach(linhas => {
            if (!linhas || linhas.length < 6) return;

            /* Agrupa as linhas do game pelos dois IDs de time. */
            const porTime = new Map();
            linhas.forEach(row => {
                const idTime = String(row?.id_time || '').trim();
                if (!idTime) return;
                if (!porTime.has(idTime)) porTime.set(idTime, []);
                porTime.get(idTime).push(row);
            });

            const times = Array.from(porTime.entries())
                .filter(([, rows]) => rows.length >= 3)
                .slice(0, 2);

            if (times.length !== 2) return;

            const [teamA, rowsA] = times[0];
            const [teamB, rowsB] = times[1];

            const ladoA = rowsA.slice(0, 3);
            const ladoB = rowsB.slice(0, 3);

            if (ladoA.length !== 3 || ladoB.length !== 3) return;
            if (teamA === teamB) return;

            const compA = ladoA
                .map(x => String(x?.pick || '').trim().toUpperCase())
                .filter(Boolean);
            const compB = ladoB
                .map(x => String(x?.pick || '').trim().toUpperCase())
                .filter(Boolean);

            if (compA.length !== 3 || compB.length !== 3) return;

            const vencedor = numero(ladoA[0]?.win) === 1
                ? teamA
                : teamB;

            const timestamp = (() => {
                try {
                    if (typeof parseDateBR === 'function') {
                        return parseDateBR(ladoA[0]?.data_adicao);
                    }
                } catch (_) {}
                return 0;
            })();

            games.push({
                id: String(ladoA[0]?.id_partida || ''),
                modo: String(ladoA[0]?.modo || ladoB[0]?.modo || 'Desconhecido').trim(),
                mapa: String(ladoA[0]?.mapa || ladoB[0]?.mapa || 'Desconhecido').trim(),
                teamA,
                teamB,
                nomeA: String(ladoA[0]?.nome_time || '').trim() || obterNomeTimeAutomatico(teamA),
                nomeB: String(ladoB[0]?.nome_time || '').trim() || obterNomeTimeAutomatico(teamB),
                tagsA: ladoA.map(x => x?.player_tag).filter(Boolean),
                tagsB: ladoB.map(x => x?.player_tag).filter(Boolean),
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

    function ehTimeDesconhecido(time) {
        const id = String(time?.id ?? time?.id_time ?? "").trim().toLowerCase();
        const nome = String(time?.nome ?? time?.nome_time ?? "").trim().toLowerCase();

        if (!id && !nome) return true;
        if (nome === "unknown" || nome.startsWith("unknown ")) return true;
        if (nome.includes("time desconhecido")) return true;
        if (nome === "desconhecido" || nome.startsWith("desconhecido ")) return true;
        if (id === "unknown" || id === "desconhecido") return true;
        return false;
    }

    function obterGamesParaMapa(modo, mapa) {
        /*
         * A fonte da tela MAPAS e SEMPRE o historico bruto completo.
         * Isso e o que permite consultar qualquer mapa da ROTACAO_MAPAS,
         * mesmo que o filtro atual do restante do app esteja em outro
         * ano/mes/dia/tipo.
         */
        let bruto = [];

        try {
            if (typeof dadosBrutos !== 'undefined' && Array.isArray(dadosBrutos)) {
                bruto = dadosBrutos;
            }
        } catch (_) {}

        if (bruto.length) {
            const todosGames = agruparGames(bruto);
            const modoChave = chaveNormalizada(modo);
            const mapaChave = chaveNormalizada(mapa);

            return todosGames.filter(game =>
                chaveNormalizada(game.modo) === modoChave &&
                chaveNormalizada(game.mapa) === mapaChave
            );
        }

        /* Fallback somente para o caso em que o CSV ainda nao terminou de carregar. */
        const sets = obterSetsParaMapa(modo, mapa);
        const games = [];

        sets.forEach(set => {
            if (Array.isArray(set.games) && set.games.length) {
                set.games.forEach(game => games.push(game));
                return;
            }

            if (set.teamA && set.teamB) {
                games.push({
                    id: set.id_set || '',
                    modo: set.modo || modo,
                    mapa: set.mapa || mapa,
                    teamA: set.teamA,
                    teamB: set.teamB,
                    nomeA: set.nomeA || obterNomeTimeAutomatico(set.teamA),
                    nomeB: set.nomeB || obterNomeTimeAutomatico(set.teamB),
                    compA: Array.isArray(set.compA) ? set.compA.slice(0, 3) : [],
                    compB: Array.isArray(set.compB) ? set.compB.slice(0, 3) : [],
                    vencedor: set.vencedor,
                    timestamp: 0,
                    linhas: []
                });
            }
        });

        return games.filter(game =>
            chaveNormalizada(game.modo) === chaveNormalizada(modo) &&
            chaveNormalizada(game.mapa) === chaveNormalizada(mapa)
        );
    }

    function construirEstatisticas(modo, mapa) {
        const games = obterGamesParaMapa(modo, mapa);

        const times = new Map();
        const sinergias = new Map();
        const comps = new Map();

        const registrarTime = (id, nome) => {
            if (!id) return null;

            const existente = {
                id: String(id),
                nome: nome || obterNomeTimeAutomatico(id)
            };

            if (ehTimeDesconhecido(existente)) return null;

            /* Somente times cadastrados no roster.json podem aparecer. */
            if (!ehTimeCadastrado(existente.id, existente.nome)) return null;

            if (!times.has(String(id))) {
                times.set(String(id), {
                    id: String(id),
                    nome: existente.nome,
                    games: 0,
                    wins: 0,
                    losses: 0
                });
            }

            return times.get(String(id));
        };

        const registrarSinergia = (a, b, venceu) => {
            const nomes = [String(a || "").trim().toUpperCase(), String(b || "").trim().toUpperCase()]
                .filter(Boolean)
                .sort();

            if (nomes.length !== 2 || nomes[0] === nomes[1]) return;

            const chave = nomes.join(" + ");

            if (!sinergias.has(chave)) {
                sinergias.set(chave, {
                    nome: chave,
                    games: 0,
                    wins: 0,
                    losses: 0
                });
            }

            const item = sinergias.get(chave);
            item.games++;

            if (venceu) item.wins++;
            else item.losses++;
        };

        const registrarComp = (time, comp, venceu) => {
            if (!time || !Array.isArray(comp) || comp.length !== 3) return;

            const trio = [...new Set(
                comp.map(x => String(x || "").trim().toUpperCase()).filter(Boolean)
            )].sort();

            if (trio.length !== 3) return;

            const chave = `${time.id}|||${trio.join(" + ")}`;

            if (!comps.has(chave)) {
                comps.set(chave, {
                    chave,
                    teamId: time.id,
                    teamName: time.nome,
                    comp: trio,
                    games: 0,
                    wins: 0,
                    losses: 0
                });
            }

            const item = comps.get(chave);
            item.games++;

            if (venceu) item.wins++;
            else item.losses++;
        };

        games.forEach(game => {
            const timeA = registrarTime(game.teamA, game.nomeA);
            const timeB = registrarTime(game.teamB, game.nomeB);

            /* Nunca colocar Unknown/Desconhecido nas tabelas. */
            if (!timeA || !timeB) return;

            const venceuA = String(game.vencedor) === String(game.teamA);
            const venceuB = String(game.vencedor) === String(game.teamB);

            timeA.games++;
            timeB.games++;

            if (venceuA) timeA.wins++;
            else if (venceuB) timeA.losses++;

            if (venceuB) timeB.wins++;
            else if (venceuA) timeB.losses++;

            const compA = Array.isArray(game.compA) ? game.compA.slice(0, 3) : [];
            const compB = Array.isArray(game.compB) ? game.compB.slice(0, 3) : [];

            for (let i = 0; i < compA.length; i++) {
                for (let j = i + 1; j < compA.length; j++) {
                    registrarSinergia(compA[i], compA[j], venceuA);
                }
            }

            for (let i = 0; i < compB.length; i++) {
                for (let j = i + 1; j < compB.length; j++) {
                    registrarSinergia(compB[i], compB[j], venceuB);
                }
            }

            registrarComp(timeA, compA, venceuA);
            registrarComp(timeB, compB, venceuB);
        });

        const timesArray = Array.from(times.values())
            .filter(t =>
                !ehTimeDesconhecido(t) &&
                ehTimeCadastrado(t.id, t.nome) &&
                estaNaRegiaoAtual(t.id)
            )
            .map(t => ({
                ...t,
                winRate: t.games ? (t.wins / t.games) * 100 : 0
            }));

        const sinergiasArray = Array.from(sinergias.values())
            .filter(x => x.games >= 1)
            .map(x => ({
                ...x,
                winRate: x.games ? (x.wins / x.games) * 100 : 0
            }));

        const compsArray = Array.from(comps.values())
            .filter(x =>
                x.games >= 1 &&
                !ehTimeDesconhecido({ id: x.teamId, nome: x.teamName }) &&
                ehTimeCadastrado(x.teamId, x.teamName) &&
                estaNaRegiaoAtual(x.teamId)
            )
            .map(x => ({
                ...x,
                winRate: x.games ? (x.wins / x.games) * 100 : 0
            }));

        return {
            games,
            /* Mantido para compatibilidade com qualquer código que ainda leia sets. */
            sets: obterSetsParaMapa(modo, mapa),
            times: timesArray,
            sinergias: sinergiasArray,
            comps: compsArray
        };
    }


    function criarTabelaTimes(lista) {
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
                            <th>WINS</th>
                            <th>LOSSES</th>
                            <th>GAMES</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${lista.slice(0, 5).map(t => `
                            <tr>
                                <td style="text-align:left;">
                                    <div class="mapas-team-cell">
                                        <img
                                            src="${escapeHtml(teamLogoUrlSafe(t.id))}"
                                            onerror="this.onerror=null;this.style.display='none'"
                                        >
                                        <span>${escapeHtml(t.nome)}</span>
                                    </div>
                                </td>
                                <td class="winrate-cell">${t.winRate.toFixed(1)}%</td>
                                <td>${t.wins}</td>
                                <td>${t.losses}</td>
                                <td>${t.games}</td>
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

        const imagemBrawler = (nome) => {
            const arquivo = formatImgSafe(nome);
            return `brawlers/pins/${escapeHtml(arquivo)}.png`;
        };

        const renderBrawler = (nome) => `
            <span class="mapas-brawler-pill">
                <img
                    src="${imagemBrawler(nome)}"
                    alt="${escapeHtml(nome)}"
                    onerror="this.onerror=null;this.style.display='none'"
                >
                <span>${escapeHtml(nome)}</span>
            </span>
        `;

        return `
            <div class="mapas-table-wrap">
                <table class="excel-table mapas-table">
                    <thead>
                        <tr>
                            <th>SINERGIA</th>
                            <th>WINRATE%</th>
                            <th>WINS</th>
                            <th>LOSSES</th>
                            <th>GAMES</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${lista.slice(0, 5).map(s => {
                            const nomes = String(s.nome || "").split(" + ").filter(Boolean);
                            return `
                                <tr>
                                    <td style="text-align:left;font-weight:900;">
                                        <div class="mapas-sinergia-cell">
                                            ${nomes.map(renderBrawler).join("")}
                                        </div>
                                    </td>
                                    <td class="winrate-cell">${s.winRate.toFixed(1)}%</td>
                                    <td>${s.wins}</td>
                                    <td>${s.losses}</td>
                                    <td>${s.games}</td>
                                </tr>
                            `;
                        }).join("")}
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
                            <th>GAMES</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${lista.slice(0, 5).map(c => `
                            <tr>
                                <td style="text-align:left;font-weight:900;">
                                    ${escapeHtml(c.teamName)}
                                </td>
                                <td style="text-align:left;">
                                    ${c.comp.map(b => `
                                        <span class="mapas-brawler-pill">
                                            <img
                                                src="brawlers/pins/${escapeHtml(formatImgSafe(b))}.png"
                                                alt="${escapeHtml(b)}"
                                                onerror="this.onerror=null;this.style.display='none'"
                                            >
                                            <span>${escapeHtml(b)}</span>
                                        </span>
                                    `).join("")}
                                </td>
                                <td class="winrate-cell">${c.winRate.toFixed(1)}%</td>
                                <td>${c.wins}</td>
                                <td>${c.losses}</td>
                                <td>${c.games}</td>
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
                         onerror="this.onerror=null;this.style.display='none'">
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
                    >
                        <img src="element/maps/${escapeHtml(formatImgSafe(mapa))}.png"
                             onerror="this.onerror=null;this.style.display='none'">
                        <span>${escapeHtml(mapa)}</span>
                    </button>
                `;
            });
        });

        sidebar.innerHTML = html;

        /*
         * Navegação robusta entre mapas:
         * não dependemos de onclick inline. O listener fica no próprio
         * sidebar e continua funcionando mesmo depois que o conteúdo
         * é recriado por limparCacheEAtualizarMapas().
         */
        if (!sidebar.__mapasClickHandlerInstalled) {
            sidebar.addEventListener("click", function (event) {
                const botao = event.target.closest(".mapas-sidebar-item");
                if (!botao || !sidebar.contains(botao)) return;

                event.preventDefault();
                event.stopPropagation();

                const modo = botao.dataset.modo || "";
                const mapa = botao.dataset.mapa || "";
                if (modo && mapa && typeof window.selecionarMapaAnalise === "function") {
                    window.selecionarMapaAnalise(modo, mapa);
                }
            });
            sidebar.__mapasClickHandlerInstalled = true;
        }

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

    function navegarMapaAnalise(direcao) {
        const rotacao = obterRotacaoCompleta();
        const lista = [];

        Object.entries(rotacao).forEach(([modo, mapas]) => {
            (mapas || []).forEach(mapa => lista.push({ modo, mapa }));
        });

        if (!lista.length) return;

        let indice = lista.findIndex(item =>
            chaveNormalizada(item.modo) === chaveNormalizada(mapaSelecionado?.modo) &&
            chaveNormalizada(item.mapa) === chaveNormalizada(mapaSelecionado?.mapa)
        );

        if (indice < 0) indice = 0;
        indice = (indice + direcao + lista.length) % lista.length;

        const proximo = lista[indice];
        window.selecionarMapaAnalise(proximo.modo, proximo.mapa);

        const botao = Array.from(document.querySelectorAll(".mapas-sidebar-item")).find(el =>
            chaveNormalizada(el.dataset.modo) === chaveNormalizada(proximo.modo) &&
            chaveNormalizada(el.dataset.mapa) === chaveNormalizada(proximo.mapa)
        );
        if (botao) botao.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }

    window.navegarMapaAnalise = navegarMapaAnalise;

    function renderizarDetalhesMapa(modo, mapa) {
        const painel = document.getElementById("painel-info-mapa");
        if (!painel) return;

        const chave = `${chaveNormalizada(modo)}|||${chaveNormalizada(mapa)}`;

        if (!mapaDadosCache[chave]) {
            mapaDadosCache[chave] = construirEstatisticas(modo, mapa);
        }

        const dados = mapaDadosCache[chave];

        /* TOP 5 em cada tabela. Unknown/Desconhecido já foi removido na origem. */
        const melhoresTimes = [...dados.times]
            .filter(t => !ehTimeDesconhecido(t) && ehTimeCadastrado(t.id, t.nome))
            .sort((a, b) =>
                b.winRate - a.winRate ||
                b.wins - a.wins ||
                b.games - a.games
            )
            .slice(0, 5);

        const pioresTimes = [...dados.times]
            .filter(t => !ehTimeDesconhecido(t) && ehTimeCadastrado(t.id, t.nome))
            .sort((a, b) =>
                a.winRate - b.winRate ||
                a.wins - b.wins ||
                a.games - b.games
            )
            .slice(0, 5);

        const melhoresSinergias = [...dados.sinergias]
            .sort((a, b) =>
                b.winRate - a.winRate ||
                b.wins - a.wins ||
                b.games - a.games
            )
            .slice(0, 5);

        const melhoresComps = [...dados.comps]
            .filter(c =>
                !ehTimeDesconhecido({ id: c.teamId, nome: c.teamName }) &&
                ehTimeCadastrado(c.teamId, c.teamName)
            )
            .sort((a, b) =>
                b.winRate - a.winRate ||
                b.wins - a.wins ||
                b.games - a.games
            )
            .slice(0, 5);

        const imagemMapa = `element/maps/${escapeHtml(formatImgSafe(mapa))}.png`;

        painel.innerHTML = `
            <div class="mapas-header">
                <div>
                    <div class="mapas-mode-label">${escapeHtml(modo)}</div>
                    <h2>${escapeHtml(mapa)}</h2>
                    <div class="mapas-subtitle">
                        ${(dados.games || []).length} GAMES analisados
                    </div>
                    <div class="mapas-navigation-buttons" style="display:flex;gap:8px;margin-top:12px;">
                        <button type="button" class="mapas-nav-btn" onclick="window.navegarMapaAnalise(-1)">← MAPA ANTERIOR</button>
                        <button type="button" class="mapas-nav-btn" onclick="window.navegarMapaAnalise(1)">PRÓXIMO MAPA →</button>
                    </div>
                </div>
                <img
                    class="mapas-main-image"
                    src="${imagemMapa}"
                    onerror="this.onerror=null;this.style.display='none'"
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
                    <small>Contado por GAME</small>
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
        /*
         * IMPORTANTE: nunca usamos dadosFiltrados para a tela MAPAS.
         * Os filtros de ano/mes/dia/tipo da tela principal podem mudar
         * quantos registros existem em dadosFiltrados, mas MAPAS consulta
         * o historico_bruto.csv inteiro.
         */
        mapaDadosCache = {};
        renderizarSidebarMapas();

        if (mapaSelecionado) {
            const modo = mapaSelecionado.modo;
            const mapa = mapaSelecionado.mapa;
            setTimeout(() => renderizarDetalhesMapa(modo, mapa), 0);
        }
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

    document.addEventListener("DOMContentLoaded", async () => {
        instalarIntegracaoComApp();

        /*
         * Carrega o roster antes de montar as tabelas. Isso garante que
         * somente equipes cadastradas sejam exibidas.
         */
        await carregarRosterAutomatico();
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

            if (quantidade > 0) {
                limparCacheEAtualizarMapas();
                clearInterval(timer);
            } else if (tentativas >= 60) {
                /* Mantem a interface responsiva mesmo se o CSV falhar. */
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
