// ========================================================
// 1. CONFIGURAÇÃO MANUAL DE TIMES, TIERS E ROSTERS
// ========================================================
const CONFIGURACAO_MANUAL_TIMES = {
    "SA": {
        "TIER S": [
            { id_time: "BH", nome_time: "Bounty Hunters", jogadores: [ { nick: "Wesley", tag: "#PLLRJC2V" }, { nick: "Prozy", tag: "#GYCYCLRJL" }, { nick: "Portox", tag: "#YGQYGCR" } ] },
            { id_time: "PIZZA", nome_time: "Pizza Congelado F/A", jogadores: [ { nick: "Jubileubr", tag: "#GVYLVUGR" }, { nick: "CAUEBR", tag: "#JQ8L0YYL" }, { nick: "Mohtep", tag: "#R2LR2QLG" } ] }
        ],
        "TIER A": [
            { id_time: "LOUD", nome_time: "LOUD", jogadores: [ { nick: "KaioDog", tag: "#GGUQCG0G" }, { nick: "FireCrow", tag: "#2GV09VJJP" }, { nick: "Edinho", tag: "#QJULVGU" } ] },
            { id_time: "OS", nome_time: "Olimpo Squad", jogadores: [ { nick: "Golden", tag: "#9QCJPL20" }, { nick: "Brabao", tag: "#L9PQUV0YC" }, { nick: "Pekka", tag: "#QJULVGU" } ] },
            { id_time: "TTPD", nome_time: "Topa Tudo Por Dinheiro", jogadores: [ { nick: "Doritos🐉", tag: "#202GJJR28" }, { nick: "Derpp🐰ᩚ", tag: "#2QG9LQQC8Y" }, { nick: "IceCrow", tag: "#9CPYUCGQC" } ] },
            { id_time: "SKC", nome_time: "SKCalalas SA", jogadores: [ { nick: "Kr ;)", tag: "#PR0P8QVQ" }, { nick: "Rhz", tag: "#89PVJG9R0" }, { nick: "Juan Carlos", tag: "#PR9U2JL" } ] },
            { id_time: "ENO", nome_time: "ENOSIS", jogadores: [ { nick: "Magic🎩", tag: "#2QCCC29QV" }, { nick: "REI DO FUT", tag: "#RVL0RPR9" }, { nick: "Fantas🌖", tag: "#PU20LUCQG" } ] },
            { id_time: "OCX", nome_time: "OCX Division", jogadores: [ { nick: "Tufa", tag: "#CQLR0Y80" }, { nick: "Enid", tag: "#2JGP0LYV2Q" }, { nick: "Red Eyes", tag: "#CUGVUYPG" } ] },
            { id_time: "AL", nome_time: "ACRE LOVERS", jogadores: [ { nick: "FireMirillo", tag: "#JQ8LLLY" }, { nick: "Satisfiyer", tag: "#PLJ8VQY2C" }, { nick: "Star Lipi", tag: "#2UQCCG92VG" } ] }
        ],
        "TIER B": [
            { id_time: "CB", nome_time: "Creche Brawl", jogadores: [ { nick: "Tilo", tag: "#80VLPJCCC" }, { nick: "Bielz", tag: "#9Q22C88V8" }, { nick: "Yichy", tag: "#2LVGCJ2UQR" } ] },
            { id_time: "ZRT", nome_time: "ZURITA GANG", jogadores: [ { nick: "Jxcccr", tag: "#820JCJJG" }, { nick: "Exic", tag: "#RCYQUJU0" }, { nick: "Todd", tag: "#22PGQU98R" } ] },
            { id_time: "FCS", nome_time: "FCS F/A", jogadores: [ { nick: "Sterixx", tag: "#2P8RVJVUY" }, { nick: "", tag: "#" }, { nick: "", tag: "#" } ] },
            { id_time: "BLD F/A", nome_time: "BLD F/A", jogadores: [ { nick: "Deykonn", tag: "#GJPVYUQG" }, { nick: "B4st", tag: "#2CJ0RCJ" }, { nick: "LeleONinja", tag: "#L880JGGL" } ] }
        ]
    },
    "NA": {
        "TIER S": [
            { id_time: "RLM", nome_time: "ONLY REALM", jogadores: [ { nick: "Bobby", tag: "#LVRRYPV" }, { nick: "Patch", tag: "#RLLRJ2" }, { nick: "Sans", tag: "#QUYCVC2" } ] },
            { id_time: "TRB", nome_time: "TRIBE GAMING", jogadores: [ { nick: "Lxffy", tag: "#82RCQCVG" }, { nick: "RBM", tag: "#U9GC8G02" }, { nick: "Diegogamer", tag: "#QLCJGQUP" } ] },
        ],
        "TIER A": [
            { id_time: "TE", nome_time: "TEAM ELEKTROS", jogadores: [ { nick: "Snoiy", tag: "#YUJ8PJ0LR" }, { nick: "Memxn", tag: "#PJPPY9LRC" }, { nick: "Doin", tag: "#8CRU0PQRQ" } ] },
            { id_time: "HML", nome_time: "F/A Homeless", jogadores: [ { nick: "Tyrant", tag: "#VPVLG2" }, { nick: "Xemp", tag: "#2P9CJVGJ8" }, { nick: "Ducky", tag: "#20P2GP99" } ] },
            { id_time: "NOVA", nome_time: "NOVA", jogadores: [ { nick: "PaiN", tag: "#GVLRUG9Q" }, { nick: "Roledu", tag: "#LPQQLYL2" }, { nick: "Kiritom", tag: "#LU8C9YJU" } ] },
            { id_time: "VTC", nome_time: "VATIC", jogadores: [ { nick: "Ezlivi", tag: "#QURVLPG" }, { nick: "Belal", tag: "#Q2VCLG9Y9" }, { nick: "Duckie", tag: "#22JR2JLYC" } ] },
            { id_time: "LGCY", nome_time: "LEGACY", jogadores: [ { nick: "Rafiki", tag: "#R9CCLP8Q" }, { nick: "Zoulan", tag: "#LYR0Q9C" }, { nick: "Zeus", tag: "#2Q028GQQP" } ] },
            { id_time: "VIC", nome_time: "VIC", jogadores: [ { nick: "OG", tag: "#28LUY98" }, { nick: "Juice", tag: "#RP0UL9QUG" }, { nick: "SecondBest", tag: "#PVQ9QUY" } ] },
            { id_time: "VICD", nome_time: "VIC Day", jogadores: [ { nick: "Vegeta", tag: "#JJ09PC0P" }, { nick: "Tacos", tag: "#GCJCRVQ8" }, { nick: "Chino", tag: "#VJUQ0Y" } ] }
        ],
        "TIER B": [
            { id_time: "RLMA", nome_time: "ONLY REALM Academy", jogadores: [ { nick: "Winq", tag: "#8UL0U08V" }, { nick: "Nerf", tag: "#9YYUPGJ2V" }, { nick: "Juni", tag: "#PL0GRVJRJ" } ] },
            { id_time: "PFZ", nome_time: "PFZ", jogadores: [ { nick: "Squeezy", tag: "#R80QRP0G" }, { nick: "Diegofr", tag: "#8CC2CL8Q" }, { nick: "Alyanys", tag: "#2LQ0RGCRU" } ] },
            { id_time: "ENONA", nome_time: "ENOSIS NA", jogadores: [ { nick: "David", tag: "#88PL8L2JC" }, { nick: "GN", tag: "#9GPQR8CGL" }, { nick: "Razuen", tag: "#8Q2QUV00J" } ] }
        ]
    },
    "EMEA": {
        "TIER S": [
            { id_time: "FUT", nome_time: "FUT ESPORTS", jogadores: [ { nick: "AngelBoy", tag: "#9PCV9L982" }, { nick: "Guesti", tag: "#2R0JLJJ9PP" }, { nick: "Nob", tag: "#P2808PRC" } ] },
            { id_time: "HMB", nome_time: "HMBLE", jogadores: [ { nick: "Symantec", tag: "#YQUCCJ2"}, { nick: "BosS", tag: "#V89Y2GP0" }, { nick: "Lukii", tag: "#8V92UYCJ" } ] }

        ],
    "TIER A": [
            { id_time: "KUMA", nome_time: "KUMA", jogadores: [ { nick: "Dompe", tag: "#2208QGGGL" }, { nick: "Mine", tag: "#V888YPGU" }, { nick: "Nes", tag: "#Q808R2CV" } ] },
            { id_time: "NAVI", nome_time: "NAVI", jogadores: [ { nick: "Enraged", tag: "#80PVPCC29" }, { nick: "GeRo", tag: "#2VJCCCQGP" }, { nick: "Drage", tag: "#J089RQ" } ] },
            { id_time: "MZP", nome_time: "MZP", jogadores: [ { nick: "Decaii", tag: "#2Y822YJYJC" }, { nick: "Ćiro", tag: "#2RR2RU8UL" }, { nick: "LeNain", tag: "#20L88L2J" } ] },     
            { id_time: "SK", nome_time: "SK GAMING", jogadores: [ { nick: "Ope", tag: "#9LVUC2PY" }, { nick: "Yoshi825", tag: "#CJV2PJ0R" }, { nick: "Yoko", tag: "#29VRJU08C" } ] },
            { id_time: "TH", nome_time: "TEAM HERETICS", jogadores: [ { nick: "IKaoss", tag: "#PCPRPJV" }, { nick: "Marco", tag: "#Q22ULY9JY" }, { nick: "Zimon", tag: "#22CL00PG0" } ] },
            { id_time: "TTM", nome_time: "REPLY TOTEM", jogadores: [ { nick: "Maru", tag: "#2Q892QVU" }, { nick: "Joker", tag: "#9JCG0VY8U" }, { nick: "Maury", tag: "#82RGU8PR" } ] },
            { id_time: "NOVO", nome_time: "NOVO ESPORTS", jogadores: [ { nick: "Filippo", tag: "#9PQQ8GQQ" }, { nick: "MeOw", tag: "#90JCYPQU" }, { nick: "Jus", tag: "#JJ92RGPL" } ] },
            { id_time: "BIG", nome_time: "BIG", jogadores: [ { nick: "Salty", tag: "#PLV89CGP" }, { nick: "", tag: "#" }, { nick: "", tag: "#" } ] }
        ],
     "TIER B": [
            { id_time: "REV", nome_time: "REVERSO HIVE", jogadores: [ { nick: "Fayelo", tag: "#LLV82LQPU" }, { nick: "Ethan", tag: "#2Y20JR8CQ" }, { nick: "Natrix", tag: "#CJ9YRGGC" } ] },
            { id_time: "TLB", nome_time: "TALENTS LAB", jogadores: [ { nick: "Yei Yei", tag: "#8RVLRVYYP" }, { nick: "Agachi", tag: "#YYUG20PQV" }, { nick: "Stas", tag: "#9LYQR9QC" } ] },
        ],
    },
    "EA": {
        "TIER S": [
            { id_time: "CR", nome_time: "CRAZY RACCOON", jogadores: [ { nick: "Tensai", tag: "#9ULYPV8" }, { nick: "", tag: "#" }, { nick: "", tag: "#" } ] },
            { id_time: "ZETA", nome_time: "ZETA DIVISION", jogadores: [ { nick: "Battoman", tag: "#P0Y8JGL0U" }, { nick: "", tag: "#" }, { nick: "", tag: "#" } ] }
        ],
    "TIER A": [
            { id_time: "SKCEA", nome_time: "SKC EA", jogadores: [ { nick: "Kuru", tag: "#J99YU9QY" }, { nick: "", tag: "#" }, { nick: "", tag: "#" } ] },
            { id_time: "FG", nome_time: "FG", jogadores: [ { nick: "Shigemyon", tag: "#2RQQ9PGC" }, { nick: "", tag: "#" }, { nick: "", tag: "#" } ] },
            { id_time: "DF", nome_time: "DF", jogadores: [ { nick: "Clarx", tag: "#GJ9V99VJG" }, { nick: "", tag: "#" }, { nick: "", tag: "#" } ] },
            { id_time: "RVL", nome_time: "RIVAL", jogadores: [ { nick: "Yutapin", tag: "#82CJYJPG2" }, { nick: "", tag: "#" }, { nick: "", tag: "#" } ] },
            { id_time: "RC", nome_time: "REJECT", jogadores: [ { nick: "Melty", tag: "#8J9GUJJVY" }, { nick: "", tag: "#" }, { nick: "", tag: "#" } ] },
            { id_time: "FL", nome_time: "FENNEL", jogadores: [ { nick: "Achapi", tag: "#28PU0P9L0" }, { nick: "", tag: "#" }, { nick: "", tag: "#" } ] },
            { id_time: "INS", nome_time: "INSOMNIA", jogadores: [ { nick: "Koga", tag: "#28VP0G808" }, { nick: "", tag: "#" }, { nick: "", tag: "#" } ] },
            { id_time: "FZ", nome_time: "FZ", jogadores: [ { nick: "Toridesu", tag: "#89UUQLJCC" }, { nick: "", tag: "#" }, { nick: "", tag: "#" } ] },
            { id_time: "TL", nome_time: "TOXIC LOTUS", jogadores: [ { nick: "Engine", tag: "#2LJVR0RQ8G" }, { nick: "", tag: "#" }, { nick: "", tag: "#" } ] }
        ]
    }
};

// ========================================================
// 2. CONFIGURAÇÕES GLOBAIS
// ========================================================
let dadosOriginaisGlobal = [];    
let dadosFiltradosGlobal = [];     
let dadosDetalhesBrawlers = {};    
let dadosTimesBrawlers = {};       
let regiaoAtivaGlobal = "";        

const CONFIG_MODOS = {
    "brawlBall": { nome: "BRAWL BALL"},
    "heist": { nome: "HEIST" },
    "bounty": { nome: "BOUNTY" },
    "gemGrab": { nome: "GEM GRAB" },
    "hotZone": { nome: "HOT ZONE" },
    "knockout": { nome: "KNOCKOUT" },
    "wipeout": { nome: "WIPEOUT" },
    "Unknown": { nome: "OUTROS MODOS" }
};

const ORDEM_ESTRICTA_MODOS = ["gemGrab", "brawlBall", "knockout", "bounty", "heist", "hotZone"];

let colunaOrdenadaAtual = null;
let ordemCrescente = true;

// ========================================================
// 3. FLUXO PRINCIPAL DE CARREGAMENTO DE DADOS
// ========================================================
window.carregarRegiao = async function(regiao) {
    regiaoAtivaGlobal = regiao.toLowerCase();
    console.log(`[SITE] A carregar dados para a região: ${regiaoAtivaGlobal}`);

    try {
        const resposta = await fetch(`api/stats/${regiaoAtivaGlobal}.json`);
        if (!resposta.ok) throw new Error(`Erro ao carregar ${regiaoAtivaGlobal}.json`);
        dadosOriginaisGlobal = await resposta.json();

        try {
            const respostaDetalhes = await fetch(`api/stats/${regiaoAtivaGlobal}_brawlers_detail.json`);
            if (respostaDetalhes.ok) dadosDetalhesBrawlers = await respostaDetalhes.json();
        } catch (e) { console.warn("[SITE] Ficheiro de detalhes de brawlers indisponível.", e); }

        try {
            const respostaTimes = await fetch(`api/stats/times_${regiaoAtivaGlobal}.json`);
            if (respostaTimes.ok) dadosTimesBrawlers = await respostaTimes.json();
        } catch (e) { console.warn("[SITE] Ficheiro de histórico de times indisponível.", e); }

        configurarFiltrosIniciais();
        filtrarEAplicarDados();

        if (CONFIGURACAO_MANUAL_TIMES[regiao.toUpperCase()]) {
            construirAbasDeTimesEJogadores(regiao.toUpperCase());
        }

    } catch (erro) {
        console.error("[SITE] Erro fatal no fluxo de inicialização:", erro);
        document.getElementById("grid-modos").innerHTML = `<p class="erro">Erro ao carregar dados da API.</p>`;
    }
};

// ========================================================
// 4. SISTEMA DE FILTRAGEM (ANO / MÊS)
// ========================================================
function configurarFiltrosIniciais() {
    const selectAno = document.getElementById("select-ano");
    const selectMes = document.getElementById("select-mes");

    if (!selectAno || !selectMes) return;

    const anosValidos = [...new Set(dadosOriginaisGlobal.map(item => item.ano))].filter(Boolean).sort();
    const mesesValidos = [...new Set(dadosOriginaisGlobal.map(item => item.mes))].filter(Boolean);

    const ordemMeses = ["JANEIRO", "FEVEREIRO", "MARÇO", "ABRIL", "MAIO", "JUNHO", "JULHO", "AGOSTO", "SETEMBRO", "OUTUBRO", "NOVEMBRO", "DEZEMBRO"];
    mesesValidos.sort((a, b) => ordemMeses.indexOf(a) - ordemMeses.indexOf(b));

    selectAno.innerHTML = '<option value="TODOS">ANO: TODOS</option>';
    anosValidos.forEach(ano => {
        selectAno.innerHTML += `<option value="${ano}">ANO: ${ano}</option>`;
    });

    selectMes.innerHTML = '<option value="TODOS">MÊS: TODOS</option>';
    mesesValidos.forEach(mes => {
        selectMes.innerHTML += `<option value="${mes}">MÊS: ${mes}</option>`;
    });
}

window.filtrarEAplicarDados = function() {
    const filtroAno = document.getElementById("select-ano")?.value || "TODOS";
    const filtroMes = document.getElementById("select-mes")?.value || "TODOS";

    dadosFiltradosGlobal = dadosOriginaisGlobal.filter(item => {
        const bateAno = (filtroAno === "TODOS" || String(item.ano) === filtroAno);
        const bateMes = (filtroMes === "TODOS" || String(item.mes) === filtroMes);
        return bateAno && bateMes;
    });

    processarERenderizarPaineis();
};

// ========================================================
// 5. PROCESSAMENTO E RENDERIZAÇÃO DOS PAINÉIS (HTML)
// ========================================================
function processarERenderizarPaineis() {
    const gridModos = document.getElementById("grid-modos");
    if (!gridModos) return;

    gridModos.innerHTML = "";

    const estruturaAgrupada = {};
    dadosFiltradosGlobal.forEach(item => {
        const m = item.modo || "Unknown";
        const map = item.mapa || "";
        
        if (!estruturaAgrupada[m]) estruturaAgrupada[m] = {};
        if (!estruturaAgrupada[m][map]) estruturaAgrupada[m][map] = [];
        
        estruturaAgrupada[m][map].push(item);
    });

    const modosOrdenados = Object.keys(estruturaAgrupada).sort((a, b) => {
        let idxA = ORDEM_ESTRICTA_MODOS.indexOf(a);
        let idxB = ORDEM_ESTRICTA_MODOS.indexOf(b);
        if (idxA === -1) idxA = 99;
        if (idxB === -1) idxB = 99;
        return idxA - idxB;
    });

    modosOrdenados.forEach(modoChave => {
        const mapasDoModo = estruturaAgrupada[modoChave];
        const configModo = CONFIG_MODOS[modoChave] || CONFIG_MODOS["Unknown"];

        const modoSection = document.createElement("div");
        modoSection.className = "modo-section";

        modoSection.innerHTML = `
            <button class="modo-header" style="border-left: 5px solid ${configModo.color}" onclick="toggleElemento(this)">
                ${configModo.icon} ${configModo.nome} <span>▶</span>
            </button>
            <div class="mapa-content" style="display: none;"></div>
        `;

        const containerMapasContent = modoSection.querySelector(".mapa-content");
        const nomesMapasOrdenados = Object.keys(mapasDoModo).sort((a, b) => a.localeCompare(b));

        nomesMapasOrdenados.forEach(nomeMapa => {
            if (!nomeMapa) return; 

            const linhasBrawlers = mapasDoModo[nomeMapa];
            const consolidadosBrawler = {};
            linhasBrawlers.forEach(l => {
                const b = l.pick.toUpperCase();
                if (!consolidadosBrawler[b]) {
                    consolidadosBrawler[b] = { pick: b, picks: 0, vitorias: 0, total_partidas_mapa: l.total_partidas_mapa };
                }
                consolidadosBrawler[b].picks += parseInt(l.picks || 0);
                consolidadosBrawler[b].vitorias += parseInt(l.vitorias || 0);
            });

            const brawlersArray = Object.values(consolidadosBrawler);
            brawlersArray.forEach(b => {
                b.win_rate = b.picks > 0 ? ((b.vitorias / b.picks) * 100).round(1) : 0;
                b.pick_rate = b.total_partidas_mapa > 0 ? ((b.picks / b.total_partidas_mapa) * 100).round(1) : 0;
            });

            brawlersArray.sort((a, b) => b.win_rate - a.win_rate || b.picks - a.picks);

            const mapaBloco = document.createElement("div");
            mapaBloco.className = "mapa-bloco";
            mapaBloco.innerHTML = `<h3>MAPA: ${nomeMapa.toUpperCase()}</h3>`;

            const tabela = document.createElement("table");
            tabela.className = "excel-table";
            tabela.innerHTML = `
                <thead>
                    <tr>
                        <th class="col-img">IMG</th>
                        <th class="col-brawler sortable" onclick="ordenarTabela(this, 'string')" style="text-align: left;">BRAWLER ↕</th>
                        <th class="col-stats sortable" onclick="ordenarTabela(this, 'number')">PICKS ↕</th>
                        <th class="col-stats sortable" onclick="ordenarTabela(this, 'number')">WINS ↕</th>
                        <th class="col-stats sortable" onclick="ordenarTabela(this, 'percent')">WIN RATE ↕</th>
                    </tr>
                </thead>
                <tbody></tbody>
            `;

            const tbody = tabela.querySelector("tbody");

            brawlersArray.forEach(b => {
                const tr = document.createElement("tr");
                tr.onclick = () => abrirModalDetalhesBrawler(b.pick);
                
                const corWinRate = b.win_rate >= 55 ? "#00ffcc" : b.win_rate >= 48 ? "#ffa502" : "#ff4d4d";

                tr.innerHTML = `
                    <td class="col-img">
                        <img src="elements/brawlers/${b.pick.toLowerCase()}.png" alt="${b.pick}" onerror="this.src='elements/brawlers/unknown.png';">
                    </td>
                    <td class="col-brawler" style="text-align: left; font-weight: bold; color: #fff;">${b.pick}</td>
                    <td class="col-stats">${b.picks}</td>
                    <td class="col-stats">${b.vitorias}</td>
                    <td class="col-stats" style="color: ${corWinRate}; font-weight: bold;">${b.win_rate}%</td>
                `;
                tbody.appendChild(tr);
            });

            mapaBloco.appendChild(tabela);
            containerMapasContent.appendChild(mapaBloco);
        });

        gridModos.appendChild(modoSection);
    });

    renderizarTabelaAllMaps();
}

// ========================================================
// 6. RENDERIZAÇÃO DA TABELA CONSOLIDADA (ALL MAPS)
// ========================================================
function renderizarTabelaAllMaps() {
    const tbodyAll = document.getElementById("tbody-all-maps");
    if (!tbodyAll) return;

    tbodyAll.innerHTML = "";

    const consolidadoGlobalBrawlers = {};
    let totalPartidasGeraisDoFiltro = 0;

    const idsPartidasUnicas = [...new Set(dadosFiltradosGlobal.map(item => item.id_partida))];
    totalPartidasGeraisDoFiltro = idsPartidasUnicas.length;

    dadosFiltradosGlobal.forEach(item => {
        const brawlerNome = item.pick.toUpperCase();
        if (!consolidadoGlobalBrawlers[brawlerNome]) {
            consolidadoGlobalBrawlers[brawlerNome] = { pick: brawlerNome, picks: 0, vitorias: 0, mapa_bruto: item.mapa || "" };
        }
        consolidadoGlobalBrawlers[brawlerNome].picks += parseInt(item.picks || item.win !== undefined ? 1 : 0 || 0);
        if (item.vitorias !== undefined) {
            consolidadoGlobalBrawlers[brawlerNome].vitorias += parseInt(item.vitorias || 0);
        } else {
            consolidadoGlobalBrawlers[brawlerNome].vitorias += parseInt(item.win || 0);
        }
        if (item.mapa && !consolidadoGlobalBrawlers[brawlerNome].mapa_bruto) {
            consolidadoGlobalBrawlers[brawlerNome].mapa_bruto = item.mapa;
        }
    });

    const listaFinalGlobal = Object.values(consolidadoGlobalBrawlers);
    listaFinalGlobal.forEach(b => {
        b.win_rate = b.picks > 0 ? ((b.vitorias / b.picks) * 100).round(1) : 0;
    });

    listaFinalGlobal.sort((a, b) => b.picks - a.picks);

    listaFinalGlobal.forEach(b => {
        const tr = document.createElement("tr");
        tr.onclick = () => abrirModalDetalhesBrawler(b.pick);

        const corWinRate = b.win_rate >= 55 ? "#00ffcc" : b.win_rate >= 48 ? "#ffa502" : "#ff4d4d";

        const nomeArquivoMapa = b.mapa_bruto.toLowerCase().replace(/[^a-z0-9]/g, "");
        const caminhoFotoMapa = nomeArquivoMapa ? `elements/maps/${nomeArquivoMapa}.png` : `elements/maps/unknown.png`;

        tr.innerHTML = `
            <td class="col-img">
                <img src="${caminhoFotoMapa}" alt="Mapa" onerror="this.src='elements/maps/unknown.png';" style="width: 40px; height: 40px; border-radius: 6px; object-fit: cover; border: 1px solid var(--accent-purple);">
            </td>
            <td class="col-brawler" style="text-align: left; font-weight: bold; color: #fff;">${b.pick}</td>
            <td class="col-stats">${b.picks}</td>
            <td class="col-stats">${b.vitorias}</td>
            <td class="col-stats" style="color: ${corWinRate}; font-weight: bold;">${b.win_rate}%</td>
        `;
        tbodyAll.appendChild(tr);
    });
}

// ========================================================
// 7. SISTEMA DE ORDENAÇÃO DINÂMICA (EXCEL STYLE)
// ========================================================
window.ordenarTabela = function(thElement, tipoDado) {
    const tabela = thElement.closest("table");
    const tbody = tabela.querySelector("tbody");
    const linhas = Array.from(tbody.querySelectorAll("tr"));
    const indiceColuna = Array.from(thElement.parentNode.children).indexOf(thElement);

    if (colunaOrdenadaAtual === thElement) {
        ordemCrescente = !ordemCrescente;
    } else {
        colunaOrdenadaAtual = thElement;
        ordemCrescente = false; 
    }

    linhas.sort((linhaA, linhaB) => {
        let textoA = linhaA.children[indiceColuna].textContent.trim();
        let textoB = linhaB.children[indiceColuna].textContent.trim();

        if (tipoDado === 'number') {
            let numA = parseFloat(textoA) || 0;
            let numB = parseFloat(textoB) || 0;
            return ordemCrescente ? numA - numB : numB - numA;
        } else if (tipoDado === 'percent') {
            let numA = parseFloat(textoA.replace('%', '')) || 0;
            let numB = parseFloat(textoB.replace('%', '')) || 0;
            return ordemCrescente ? numA - numB : numB - numA;
        } else {
            return ordemCrescente ? textoA.localeCompare(textoB) : textoB.localeCompare(textoA);
        }
    });

    linhas.forEach(l => tbody.appendChild(l));
};

// ========================================================
// 8. INTERFACE DO MODAL (DETALHES DE SINERGIA DO BRAWLER)
// ========================================================
function abrirModalDetalhesBrawler(nomeBrawler) {
    const brawlerChave = nomeBrawler.toUpperCase();
    const detalhes = dadosDetalhesBrawlers[brawlerChave];

    let overlay = document.getElementById("modal-brawler-detalhes");
    if (!overlay) {
        overlay = document.createElement("div");
        overlay.id = "modal-brawler-detalhes";
        overlay.className = "brawler-modal-overlay";
        overlay.onclick = (e) => { if (e.target === overlay) fecharModalDetalhesBrawler(); };
        document.body.appendChild(overlay);
    }

    if (!detalhes) {
        overlay.innerHTML = `
            <div class="brawler-modal-card">
                <div class="brawler-modal-header">
                    <h2>${brawlerChave}</h2>
                    <button class="brawler-modal-close" onclick="fecharModalDetalhesBrawler()">&times;</button>
                </div>
                <div style="padding: 20px; color: var(--texto-suave);">Sem dados adicionais registados para este Brawler.</div>
            </div>
        `;
        overlay.style.display = "flex";
        return;
    }

    let htmlMapas = "";
    if (detalhes.top_mapas && detalhes.top_mapas.length > 0) {
        detalhes.top_mapas.forEach(m => {
            const configM = CONFIG_MODOS[m.modo] || CONFIG_MODOS["Unknown"];
            htmlMapas += `
                <div class="modal-item-linha">
                    <span style="color: ${configM.color}; font-weight: bold;">${configM.icon} [${configM.nome}]</span>
                    <span style="color: #fff; font-weight: bold;">${m.mapa}</span>
                    <span class="badge-picks">${m.picks} Picks</span>
                </div>
            `;
        });
    } else { htmlMapas = "<p style='color: var(--texto-suave);'>Nenhum mapa dominante registado.</p>"; }

    let htmlSinergias = "";
    if (detalhes.sinergias && detalhes.sinergias.length > 0) {
        detalhes.sinergias.forEach(s => {
            const vrateNum = parseFloat(s.win_rate) || 0;
            const corVRate = vrateNum >= 55 ? "#00ffcc" : vrateNum >= 48 ? "#ffa502" : "#ff4d4d";
            htmlSinergias += `
                <div class="modal-item-linha">
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <img src="elements/brawlers/${s.com.toLowerCase()}.png" alt="${s.com}" onerror="this.src='elements/brawlers/unknown.png';" style="width: 30px; height: 30px; border-radius: 4px;">
                        <span style="color: #fff; font-weight: bold;">${s.com}</span>
                    </div>
                    <div style="display: flex; gap: 15px; font-size: 13px;">
                        <span>Picks: <strong>${s.picks}</strong></span>
                        <span style="color: ${corVRate}; font-weight: bold;">WR: ${s.win_rate}</span>
                    </div>
                </div>
            `;
        });
    } else { htmlSinergias = "<p style='color: var(--texto-suave);'>Sem dados de sinergia mapeados.</p>"; }

    overlay.innerHTML = `
        <div class="brawler-modal-card animate-modal">
            <div class="brawler-modal-header">
                <div style="display: flex; align-items: center; gap: 15px;">
                    <img src="elements/brawlers/${brawlerChave.toLowerCase()}.png" alt="${brawlerChave}" onerror="this.src='elements/brawlers/unknown.png';" style="width: 45px; height: 45px; border-radius: 6px; border: 1px solid var(--accent-purple);">
                    <h2 style="margin: 0; color: #fff; letter-spacing: 1px;">ANÁLISE DE COMBINAÇÃO: <span class="accent">${brawlerChave}</span></h2>
                </div>
                <button class="brawler-modal-close" onclick="fecharModalDetalhesBrawler()">&times;</button>
            </div>
            <div class="brawler-modal-body" style="padding: 20px; display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                <div class="modal-secao-coluna">
                    <h3 style="color: var(--accent-purple); border-bottom: 1px solid var(--borda-suave); padding-bottom: 5px; margin-top: 0;">📍 TOP MAPAS UTILIZADOS</h3>
                    <div class="modal-lista-scroll">${htmlMapas}</div>
                </div>
                <div class="modal-secao-coluna">
                    <h3 style="color: var(--accent-purple); border-bottom: 1px solid var(--borda-suave); padding-bottom: 5px; margin-top: 0;">🤝 MAIORES SINERGIAS (TIME ALIADO)</h3>
                    <div class="modal-lista-scroll">${htmlSinergias}</div>
                </div>
            </div>
        </div>
    `;
    overlay.style.display = "flex";
}

window.fecharModalDetalhesBrawler = function() {
    const overlay = document.getElementById("modal-brawler-detalhes");
    if (overlay) overlay.style.display = "none";
};

// ========================================================
// 9. CONSTRUTOR DINÂMICO DAS ABAS DE TIMES E JOGADORES (SA)
// ========================================================
function construirAbasDeTimesEJogadores(regiaoChave) {
    const containerTimes = document.getElementById("container-times-tiers");
    const containerPlayers = document.getElementById("container-players-list");
    
    if (!containerTimes || !containerPlayers) return;

    containerTimes.innerHTML = "";
    containerPlayers.innerHTML = "";

    const dadosRegiao = CONFIGURACAO_MANUAL_TIMES[regiaoChave];
    if (!dadosRegiao) return;

    for (const [tierNome, listaTimes] of Object.entries(dadosRegiao)) {
        const tierBlock = document.createElement("div");
        tierBlock.className = "tier-block-section";
        tierBlock.innerHTML = `<h2 class="tier-titulo-header">${tierNome}</h2><div class="tier-grid-cards"></div>`;
        const gridCards = tierBlock.querySelector(".tier-grid-cards");

        listaTimes.forEach(time => {
            const card = document.createElement("div");
            card.className = "time-card-item";
            
            let htmlIntegrantes = "";
            time.jogadores.forEach(j => {
                const picksDoJogador = dadosTimesBrawlers[j.tag] || [];
                const totalPicks = picksDoJogador.reduce((acc, brawler) => acc + brawler.qtd, 0);
                
                const top3MostPlayed = [...picksDoJogador].sort((a, b) => b.qtd - a.qtd).slice(0, 3);
                let htmlIconsBrawlers = "";
                top3MostPlayed.forEach(tb => {
                    htmlIconsBrawlers += `
                        <div class="mini-brawler-wrapper">
                            <img src="elements/brawlers/${tb.brawler.toLowerCase()}.png" title="${tb.brawler} (${tb.qtd} picks)" onerror="this.src='elements/brawlers/unknown.png';">
                            <span class="mini-brawler-qtd">${tb.qtd}</span>
                        </div>
                    `;
                });

                htmlIntegrantes += `
                    <div class="jogador-linha-status">
                        <div>
                            <div class="j-nick">${j.nick}</div>
                            <div class="j-tag">${j.tag}</div>
                        </div>
                        <div style="display: flex; align-items: center; gap: 12px;">
                            <div class="j-total-matches">${totalPicks} Partidas</div>
                            <div class="j-pool-icons">${htmlIconsBrawlers}</div>
                        </div>
                    </div>
                `;
            });

            card.innerHTML = `
                <div class="time-card-header-info">
                    <img src="elements/times/${time.id_time.toLowerCase()}.png" class="logo-time-badge" onerror="this.src='elements/times/unknown.png';">
                    <h3>${time.nome_time}</h3>
                </div>
                <div class="time-card-body-players">${htmlIntegrantes}</div>
            `;
            gridCards.appendChild(card);
        });

        containerTimes.appendChild(tierBlock);
    }

    const todosJogadoresDaRegiao = [];
    for (const [tier, listaTimes] of Object.entries(dadosRegiao)) {
        listaTimes.forEach(t => {
            t.jogadores.forEach(j => {
                todosJogadoresDaRegiao.push({ ...j, nome_time: t.nome_time, id_time: t.id_time, tier: tier });
            });
        });
    }

    todosJogadoresDaRegiao.sort((a, b) => a.nick.localeCompare(b.nick));

    todosJogadoresDaRegiao.forEach(j => {
        const picksDoJogador = dadosTimesBrawlers[j.tag] || [];
        const totalPicks = picksDoJogador.reduce((acc, brawler) => acc + brawler.qtd, 0);
        const top5Brawlers = [...picksDoJogador].sort((a, b) => b.qtd - a.qtd).slice(0, 5);

        let htmlPoolCompleta = "";
        top5Brawlers.forEach(b => {
            htmlPoolCompleta += `
                <div class="pool-item-row">
                    <img src="elements/brawlers/${b.brawler.toLowerCase()}.png" alt="${b.brawler}" onerror="this.src='elements/brawlers/unknown.png';">
                    <div class="pool-item-name-qty">
                        <span class="p-brawler-name">${b.brawler}</span>
                        <span class="p-brawler-qtd">${b.qtd} Picks</span>
                    </div>
                </div>
            `;
        });

        if (htmlPoolCompleta === "") {
            htmlPoolCompleta = "<p style='color: var(--texto-suave); margin: 0; font-size: 13px;'>Nenhuma partida registada nesta temporada.</p>";
        }

        const playerRowCard = document.createElement("div");
        playerRowCard.className = "player-row-card-container";
        playerRowCard.innerHTML = `
            <div class="player-main-identity-box">
                <div style="display: flex; align-items: center; gap: 15px;">
                    <img src="elements/times/${j.id_time.toLowerCase()}.png" class="player-team-logo-badge" onerror="this.src='elements/times/unknown.png';">
                    <div>
                        <div class="player-profile-nickname">${j.nick}</div>
                        <div class="player-profile-subdetails">${j.nome_time} • <span style="color: var(--accent-purple); font-weight: bold;">${j.tier}</span></div>
                    </div>
                </div>
                <div class="player-profile-total-games-counter">
                    <div class="counter-number">${totalPicks}</div>
                    <div class="counter-label">PARTIDAS</div>
                </div>
            </div>
            <div class="player-pool-analysis-box">
                <div class="pool-header-title">FAVOURITE BRAWLERS POOL</div>
                <div class="pool-grid-items-container">${htmlPoolCompleta}</div>
            </div>
        `;
        containerPlayers.appendChild(playerRowCard);
    });
}

// ========================================================
// 10. FUNÇÕES AUXILIARES / INTERFACES DE SUPORTE
// ========================================================
window.toggleElemento = function(botaoHeader) {
    const content = botaoHeader.nextElementSibling;
    const indicador = botaoHeader.querySelector("span");

    if (content.style.display === "none" || content.style.display === "") {
        content.style.display = "block";
        if (indicador) indicador.textContent = "▼";
    } else {
        content.style.display = "none";
        if (indicador) indicador.textContent = "▶";
    }
};

Number.prototype.round = function(casasDecimais) {
    return +(Math.round(this + "e+" + casasDecimais) + "e-" + casasDecimais);
};

document.addEventListener("DOMContentLoaded", () => {
    const dropdowns = document.querySelectorAll(".dropdown");
    dropdowns.forEach(dropdown => {
        const btn = dropdown.querySelector(".nav-link");
        if (!btn) return;
        btn.addEventListener("click", (e) => {
            e.preventDefault();
            dropdowns.forEach(other => { if (other !== dropdown) other.classList.remove("active"); });
            dropdown.classList.toggle("active");
        });
    });
    document.addEventListener("click", (e) => {
        if (!e.target.closest(".dropdown")) dropdowns.forEach(d => d.classList.remove("active"));
    });

    const styleTag = document.createElement('style');
    styleTag.innerHTML = `
        .brawler-modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.85); display: none; align-items: center; justify-content: center; z-index: 9999; padding: 20px; }
        .brawler-modal-card { background: var(--bg-paineis); border: 2px solid var(--accent-purple); border-radius: 12px; width: 100%; max-width: 800px; box-shadow: 0 0 25px rgba(204, 0, 255, 0.4); overflow: hidden; }
        .brawler-modal-header { background: #000; padding: 15px 20px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--borda-suave); }
        .brawler-modal-close { background: none; border: none; color: #fff; font-size: 28px; cursor: pointer; transition: color 0.2s; }
        .brawler-modal-close:hover { color: var(--accent-purple); }
        .modal-item-linha { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05); padding: 10px 15px; border-radius: 6px; display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
        .modal-lista-scroll { max-height: 320px; overflow-y: auto; padding-right: 5px; }
        .badge-picks { background: rgba(204, 0, 255, 0.15); border: 1px solid var(--accent-purple); color: #fff; padding: 3px 8px; border-radius: 4px; font-size: 12px; font-weight: bold; }
        .animate-modal { animation: modalFadeIn 0.25s ease-out forwards; }
        @keyframes modalFadeIn { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
        .modal-lista-scroll::-webkit-scrollbar { width: 6px; }
        .modal-lista-scroll::-webkit-scrollbar-track { background: rgba(0,0,0,0.1); }
        .modal-lista-scroll::-webkit-scrollbar-thumb { background: var(--borda-suave); border-radius: 3px; }
        .modal-lista-scroll::-webkit-scrollbar-thumb:hover { background: var(--accent-purple); }
    `;
    document.head.appendChild(styleTag);
});
2. draft.js Final
JavaScript
// --- DADOS DO SISTEMA ---
const MAPAS_ALVO = {
    "Brawl Ball": ["Super Beach", "Pinhole Punt", "Sneaky Fields", "Triple Dribble", "Pinhole Punt", "Pinball Dreams"],
    "Bounty": ["Shooting Star", "Hideout", "Layer Cake", "Dry Season"],
    "Heist": ["Hot Potato", "Safe Zone", "Bridge Too Far", "Pit Stop", "Kaboom Canyon"],
    "Knockout": ["Goldarm Gulch", "Belle's Rock", "Out in the Open", "New Horizons"],
    "Gem Grab": ["Hard Rock Mine", "Double Swoosh", "Deathcap Trap", "Ring of Fire", "Dueling Beetles", "Open Business"]
};

// SUBSTITUA PELOS SEUS DADOS DA PLANILHA (META)
const DADOS_META = {
    "Super Beach": ["Max", "Sandy", "Cordelius", "Melodie", "Stu", "Buster", "Charlie", "Rico", "Fang", "Colt"],
    "Pinhole Punt": [],
    "Sneaky Fields": [],
    "Shooting Star": [],
    "Hideout": [],
    "Layer Cake": [],
    "Hot Potato": [],
    "Safe Zone": [],
    "Bridge Too Far": [],
    "Goldarm Gulch": [],
    "Belle's Rock": [],
    "Out in the Open": [],
    "Hard Rock Mine": [],
    "Double Swoosh": [],
    "Deathcap Trap": []
};

// ADICIONADO/MODIFICADO: Atualização visual do mapa pegando a foto estritamente da pasta elements/maps/
window.atualizarMapaVisual = function() {
    const mapSelect = document.getElementById('map-select');
    const mapImg = document.getElementById('map-image') || document.getElementById('mapa-visual');
    if (!mapSelect || !mapImg) return;
    
    const mapa = mapSelect.value;
    const nomeFormatado = mapa.toLowerCase().replace(/[^a-z0-9]/g, "");
    
    mapImg.src = mapa ? `elements/maps/${nomeFormatado}.png` : `elements/maps/unknown.png`;
};

window.resetDraft = function() {
    currentStep = 0; selected = []; picksVermelhos = []; picksAzuis = []; preSelected = null;
    document.querySelectorAll('.slot').forEach(s => s.innerHTML = '');
    document.querySelectorAll('.brawler-icon').forEach(b => b.classList.remove('disabled'));
    buildOrder(); atualizarFoco(); window.atualizarMeta(); calcularCounters(); calcularPodeTomar();
};
 
window.filtrar = function() {
    const searchInput = document.getElementById('search') || document.querySelector('.search-bar');
    if(!searchInput) return;
    const t = searchInput.value.toLowerCase();
    document.querySelectorAll('.brawler-icon').forEach(div => {
        const n = div.querySelector('.brawler-name').textContent.toLowerCase();
        div.style.display = n.includes(t) ? 'flex' : 'none';
    });
};
 
function inicializarSistema() {
    popularMapas(); gerarRoster(); resetDraft();
    const mapSelect = document.getElementById('map-select');
    if (mapSelect) {
        mapSelect.addEventListener('change', () => { window.atualizarMeta(); window.atualizarMapaVisual(); });
    }
    const searchInput = document.getElementById('search');
    if (searchInput) { searchInput.removeAttribute('oninput'); searchInput.addEventListener('input', window.filtrar); }
}
 
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inicializarSistema);
} else {
    inicializarSistema();
}
