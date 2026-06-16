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
            { id_time: "GLXY", nome_time: "Topa Tudo Por Dinheiro", jogadores: [ { nick: "Doritos🐉", tag: "#202GJJR28" }, { nick: "Derpp🐰ᩚ", tag: "#2QG9LQQC8Y" }, { nick: "IceCrow", tag: "#9CPYUCGQC" } ] },
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
const MAPAS_POR_MES = {
    "2026-04": {
        "brawlBall": ["Super Beach", "Pinhole Punt", "Sneaky Fields"],
        "bounty": ["Shooting Star", "Hideout", "Layer Cake"],
        "heist": ["Hot Potato", "Safe Zone", "Bridge Too Far"],
        "knockout": ["Goldarm Gulch", "Belle's Rock", "Out in the Open"],
        "gemGrab": ["Hard Rock Mine", "Double Swoosh", "Deathcap Trap"],
        "hotZone": ["Ring of Fire", "Open Business", "Dueling Beetles"]
    },
    "2026-05": {
        "brawlBall": ["Triple Dribble", "Pinhole Punt", "Pinball Dreams"],
        "bounty": ["Dry Season", "Hideout", "Layer Cake"],
        "heist": ["Pit Stop", "Safe Zone", "Kaboom Canyon"],
        "knockout": ["Goldarm Gulch", "New Horizons", "Out in the Open"],
        "gemGrab": ["Hard Rock Mine", "Gem Fort", "Crystal Arcade"],
        "hotZone": ["Ring of Fire", "Dueling Beetles", "Open Business"]
    },
    "2026-06": {
        "brawlBall": ["Triple Dribble", "Pinhole Punt", "Pinball Dreams"],
        "bounty": ["Dry Season", "Hideout", "Layer Cake"],
        "heist": ["Pit Stop", "Safe Zone", "Kaboom Canyon"],
        "knockout": ["Goldarm Gulch", "New Horizons", "Out in the Open"],
        "gemGrab": ["Hard Rock Mine", "Gem Fort", "Crystal Arcade"],
        "hotZone": ["Ring of Fire", "Dueling Beetles", "Open Business"]
    }
};

let dadosOriginaisRegiao = [];
let dadosTimes = {};
let detalhesBrawlers = {};
let regiaoAtiva = "SA";

const formatarNomeImagem = (n) => `brawlers/${n.toLowerCase().replace(/[^a-z0-9]/g, "")}.png`;
const formatarNomeMapa = (m) => `elements/${m.toLowerCase().replace(/[^a-z0-9]/g, "")}.png`;

window.toggleElemento = function(header) {
    const content = header.nextElementSibling;
    const icon = header.querySelector('span');
    if (content.style.display === "none" || !content.style.display) {
        content.style.display = "grid";
        if (icon) icon.textContent = "▼";
    } else {
        content.style.display = "none";
        if (icon) icon.textContent = "▶";
    }
};

// ========================================================
// 3. CARREGAMENTO DINÂMICO
// ========================================================
window.carregarRegiao = async function(regiao) {
    regiaoAtiva = regiao.toUpperCase();
    
    dadosTimes = {};
    detalhesBrawlers = {};

    try {
        const urlStats = `api/stats/${regiao.toLowerCase()}.json`;
        const resStats = await fetch(urlStats);
        if (resStats.ok) {
            let dadosBrutos = await resStats.json();
            dadosOriginaisRegiao = dadosBrutos.map(d => {
                if (d.mes && (d.mes.toUpperCase() === "ANTIGO" || d.mes.toUpperCase() === "ANTIGA")) {
                    d.mes = "ABRIL";
                    if (d.ano === "ANTIGO" || !d.ano) d.ano = "2026";
                } else if (d.mes) {
                    d.mes = d.mes.toUpperCase();
                }
                return d;
            });
        }
    } catch (e) { console.warn("Erro ao carregar dados da região.", e); }

    try {
        const resTimes = await fetch(`api/stats/times_${regiao.toLowerCase()}.json`);
        if (resTimes.ok) dadosTimes = await resTimes.json();
    } catch (e) {}
    
    try {
        const resDetalhes = await fetch(`api/stats/${regiao.toLowerCase()}_brawlers_detail.json`);
        if (resDetalhes.ok) detalhesBrawlers = await resDetalhes.json();
    } catch (e) {}

    try { popularFiltrosIniciais(); } catch(e) {}
    try { filtrarEAplicarDados(); } catch(e) {}
    try { renderizarListaBrawlers(); } catch(e) {}
    try { renderizarListaTimes(regiaoAtiva); } catch(e) { console.error(e); }
};

function popularFiltrosIniciais() {
    const selectAno = document.getElementById('select-ano');
    const selectMes = document.getElementById('select-mes');
    if (!selectAno || !selectMes) return;

    const anos = [...new Set(dadosOriginaisRegiao.map(d => d.ano))].filter(a => a);
    const meses = [...new Set(dadosOriginaisRegiao.map(d => d.mes))].filter(m => m);

    selectAno.innerHTML = '';
    selectMes.innerHTML = '';

    anos.sort().forEach(ano => selectAno.innerHTML += `<option value="${ano}">${ano}</option>`);
    const ordemMeses = ["JANEIRO", "FEVEREIRO", "MARÇO", "ABRIL", "MAIO", "JUNHO", "JULHO", "AGOSTO", "SETEMBRO", "OUTUBRO", "NOVEMBRO", "DEZEMBRO"];
    meses.sort((a, b) => ordemMeses.indexOf(a) - ordemMeses.indexOf(b)).forEach(mes => {
        selectMes.innerHTML += `<option value="${mes}">${mes}</option>`;
    });

    if (anos.length > 0) selectAno.value = anos[anos.length - 1];
    if (meses.length > 0) selectMes.value = meses[meses.length - 1];
}

window.filtrarEAplicarDados = function() {
    const anoSel = document.getElementById('select-ano')?.value;
    const mesSel = document.getElementById('select-mes')?.value;

    let dadosFiltrados = dadosOriginaisRegiao;

    if (anoSel && anoSel !== "TODOS") dadosFiltrados = dadosFiltrados.filter(d => d.ano === anoSel);
    if (mesSel && mesSel !== "TODOS") dadosFiltrados = dadosFiltrados.filter(d => d.mes === mesSel);

    const mesesParaNumero = {
        "JANEIRO": "01", "FEVEREIRO": "02", "MARÇO": "03", "ABRIL": "04",
        "MAIO": "05", "JUNHO": "06", "JULHO": "07", "AGOSTO": "08",
        "SETEMBRO": "09", "OUTUBRO": "10", "NOVEMBRO": "11", "DEZEMBRO": "12"
    };

    if (anoSel && mesSel && anoSel !== "TODOS" && mesSel !== "TODOS") {
        const numMes = mesesParaNumero[mesSel.toUpperCase()];
        const chaveMapa = `${anoSel}-${numMes}`;
        const mapasDoMes = MAPAS_POR_MES[chaveMapa];

        if (mapasDoMes) {
            let mapasValidos = [];
            Object.values(mapasDoMes).forEach(lista => lista.forEach(m => mapasValidos.push(m.toLowerCase())));
            dadosFiltrados = dadosFiltrados.filter(d => mapasValidos.includes(d.mapa.toLowerCase()));
        } else {
            dadosFiltrados = [];
        }
    }

    renderizarGridModos(dadosFiltrados, anoSel, mesSel);
    renderizarAllMaps(dadosFiltrados);
};

function renderizarGridModos(dados, ano, mes) {
    const container = document.getElementById('grid-modos');
    if (!container) return;
    container.innerHTML = '';

    const mesesParaNumero = { "JANEIRO": "01", "FEVEREIRO": "02", "MARÇO": "03", "ABRIL": "04", "MAIO": "05", "JUNHO": "06", "JULHO": "07", "AGOSTO": "08", "SETEMBRO": "09", "OUTUBRO": "10", "NOVEMBRO": "11", "DEZEMBRO": "12" };
    const numMes = (mes && mes !== "TODOS") ? mesesParaNumero[mes.toUpperCase()] : "05";
    const anoAtual = (ano && ano !== "TODOS") ? ano : "2026";
    const chaveMes = `${anoAtual}-${numMes}`;
    const configuracaoMapas = MAPAS_POR_MES[chaveMes] || {};

    Object.keys(configuracaoMapas).forEach(modo => {
        const mapasDoModo = configuracaoMapas[modo];
        let mapasHTML = "";

        mapasDoModo.forEach(mapa => {
            const dadosMapa = dados.filter(d => d.mapa.toLowerCase() === mapa.toLowerCase());
            if (dadosMapa.length === 0) return;

            dadosMapa.sort((a, b) => b.picks - a.picks);

            let linhasBrawlers = dadosMapa.map(d => `
                <tr style="cursor: pointer;" onclick="abrirModalBrawler('${d.pick}')" title="Análise detalhada de ${d.pick}">
                    <td class="col-img"><img src="${formatarNomeImagem(d.pick)}" onerror="this.src='brawlers/default.png'"></td>
                    <td style="text-align: left; font-weight: bold;">${d.pick.toUpperCase()}</td>
                    <td>${d.picks}</td>
                    <td style="color: #aaa;">${d.pick_rate || '0.0%'}</td>
                    <td>${d.vitorias}</td>
                    <td class="winrate-cell">${d.win_rate}</td>
                </tr>
            `).join('');

            mapasHTML += `
                <div class="mapa-container">
                    <h3 class="mapa-title">${mapa.toUpperCase()}</h3>
                    <table class="excel-table">
                        <thead>
                            <tr>
                                <th class="col-img">IMG</th>
                                <th style="text-align: left; cursor: pointer;" onclick="ordenarTabela(this, 'string')">BRAWLER ↕</th>
                                <th class="col-stats sortable" style="cursor: pointer;" onclick="ordenarTabela(this, 'number')">P ↕</th>
                                <th class="col-stats sortable" style="cursor: pointer;" onclick="ordenarTabela(this, 'percent')">PR% ↕</th>
                                <th class="col-stats sortable" style="cursor: pointer;" onclick="ordenarTabela(this, 'number')">W ↕</th>
                                <th class="col-stats sortable" style="cursor: pointer;" onclick="ordenarTabela(this, 'percent')">WR% ↕</th>
                            </tr>
                        </thead>
                        <tbody>${linhasBrawlers}</tbody>
                    </table>
                </div>
            `;
        });

        if (mapasHTML) {
            const section = document.createElement("div");
            section.className = "modo-section";
            const nomeExibicaoModo = modo.replace(/([A-Z])/g, ' $1').trim().toUpperCase();
            section.innerHTML = `
                <div class="modo-header" onclick="toggleElemento(this)">${nomeExibicaoModo} <span>▶</span></div>
                <div class="mapa-content" style="display:none">${mapasHTML}</div>`;
            container.appendChild(section);
        }
    });
}

function renderizarAllMaps(dados) {
    const tbody = document.getElementById('tbody-all-maps');
    if (!tbody) return;

    let mapasVistos = new Set();
    let totalPartidasGerais = 0;
    
    dados.forEach(d => {
        let key = d.mapa + d.ano + d.mes;
        if(!mapasVistos.has(key)) {
            mapasVistos.add(key);
            totalPartidasGerais += (d.total_partidas_mapa || 0);
        }
    });

    let agrupadoGeral = {};
    dados.forEach(d => {
        if (!agrupadoGeral[d.pick]) agrupadoGeral[d.pick] = { picks: 0, vitorias: 0 };
        agrupadoGeral[d.pick].picks += d.picks;
        agrupadoGeral[d.pick].vitorias += d.vitorias;
    });

    let listaGeral = Object.keys(agrupadoGeral).map(brawler => {
        const item = agrupadoGeral[brawler];
        const wr = item.picks > 0 ? ((item.vitorias / item.picks) * 100).toFixed(1) + "%" : "0.0%";
        const pr = totalPartidasGerais > 0 ? ((item.picks / totalPartidasGerais) * 100).toFixed(1) + "%" : "0.0%";
        return { brawler, picks: item.picks, vitorias: item.vitorias, win_rate: wr, pick_rate: pr };
    });

    listaGeral.sort((a, b) => b.picks - a.picks);

    tbody.innerHTML = listaGeral.map(d => `
        <tr style="cursor: pointer;" onclick="abrirModalBrawler('${d.brawler}')" title="Análise detalhada de ${d.brawler}">
            <td class="col-img"><img src="${formatarNomeImagem(d.brawler)}" onerror="this.src='brawlers/default.png'"></td>
            <td style="text-align: left; font-weight: bold;">${d.brawler.toUpperCase()}</td>
            <td>${d.picks}</td>
            <td style="color: #aaa;">${d.pick_rate}</td>
            <td>${d.vitorias}</td>
            <td class="winrate-cell">${d.win_rate}</td>
        </tr>
    `).join('');
}

function renderizarListaBrawlers() {
    const container = document.getElementById("lista-brawlers-sidebar");
    if (!container) return;
    
    let brawlers = Object.keys(detalhesBrawlers);
    if (brawlers.length === 0 && dadosOriginaisRegiao.length > 0) {
        brawlers = [...new Set(dadosOriginaisRegiao.map(d => d.pick.toLowerCase()))];
    }
    brawlers.sort();
    
    container.innerHTML = brawlers.map(b => `
        <div class="sidebar-item" onclick="exibirInfoBrawler('${b}')" style="display: flex; align-items: center; gap: 12px; padding: 10px; cursor: pointer;">
            <img src="${formatarNomeImagem(b)}" style="width: 35px; height: 35px; object-fit: cover; border-radius: 6px; border: 1px solid var(--border-dark);" onerror="this.src='brawlers/default.png'">
            <span class="brawler-name" style="font-weight: 600; font-size: 14px; text-transform: uppercase;">${b}</span>
        </div>
    `).join('');
}

window.filtrarBrawlersSidebar = function() {
    const termo = document.getElementById("search-brawler-sidebar").value.toLowerCase();
    document.querySelectorAll("#lista-brawlers-sidebar .sidebar-item").forEach(item => {
        const nome = item.querySelector(".brawler-name").textContent.toLowerCase();
        item.style.display = nome.includes(termo) ? "flex" : "none";
    });
};

function gerarHTMLDetalhes(nomeBrawler, info) {
    let mapasHTML = info.top_mapas && info.top_mapas.length > 0 ? info.top_mapas.map(m => `
        <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 12px; background: #111; padding: 10px; border-radius: 8px; border: 1px solid var(--borda-destaque);">
            <img src="${formatarNomeMapa(m.mapa)}" onerror="this.src='elements/default.png'" style="width: 70px; height: 50px; border-radius: 6px; object-fit: cover;">
            <div>
                <div style="font-weight: bold; font-size: 15px; color: #fff;">${m.mapa.toUpperCase()}</div>
                <div style="color: #888; font-size: 12px; margin-top: 2px;">${m.modo.toUpperCase()}</div>
                <div style="color: var(--accent-purple); font-weight: bold; font-size: 13px; margin-top: 4px;">${m.picks} Partidas</div>
            </div>
        </div>
    `).join('') : `<div style="font-size:13px; color:#555;">Sem dados suficientes em ${regiaoAtiva}.</div>`;

    let sinergiasHTML = info.sinergias && info.sinergias.length > 0 ? info.sinergias.map(s => `
        <div style="display: flex; align-items: center; justify-content: space-between; padding: 10px; background: #111; border-radius: 8px; border: 1px solid var(--borda-destaque); margin-bottom: 10px;">
            <div style="display: flex; align-items: center; gap: 6px;">
                <img src="${formatarNomeImagem(nomeBrawler)}" style="width: 32px; height: 32px; border-radius: 4px;">
                <span style="color: #666; font-size: 18px; font-weight: bold; margin: 0 4px;">+</span>
                <img src="${formatarNomeImagem(s.com)}" style="width: 32px; height: 32px; border-radius: 4px; border: 2px solid var(--accent-purple);">
                <span style="font-size: 14px; font-weight: bold; margin-left: 8px; color: #fff;">${s.com.toUpperCase()}</span>
            </div>
            <div style="font-size: 13px; color: #ccc; display: flex; gap: 15px;">
                <span><strong>${s.picks}</strong> PICKS</span>
                <span><strong>${s.vitorias}</strong> WINS</span>
                <span style="color: var(--winrate-color); font-weight: bold;">${s.win_rate} WR</span>
            </div>
        </div>
    `).join('') : `<div style="font-size:13px; color:#555;">Sem dados de companheiros de equipe na região ${regiaoAtiva}.</div>`;

    return `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
            <div>
                <h4 style="font-size: 14px; color: #888; margin-bottom: 15px; text-transform: uppercase;">Top 3 Mapas & Modos</h4>
                ${mapasHTML}
            </div>
            <div>
                <h4 style="font-size: 14px; color: #888; margin-bottom: 15px; text-transform: uppercase;">Top 5 Sinergias (Mesmo Time)</h4>
                ${sinergiasHTML}
            </div>
        </div>
    `;
}

window.exibirInfoBrawler = function(nome) {
    const painel = document.getElementById("painel-info-brawler");
    if (!painel) return;
    
    document.querySelectorAll("#lista-brawlers-sidebar .sidebar-item").forEach(i => {
        i.classList.toggle("active", i.querySelector(".brawler-name").textContent.toLowerCase() === nome.toLowerCase());
    });

    const info = detalhesBrawlers[nome.toUpperCase()] || {top_mapas: [], sinergias: []};
    painel.innerHTML = `
        <div class="brawler-profile-header">
            <img src="${formatarNomeImagem(nome)}" class="brawler-large-avatar" onerror="this.src='brawlers/default.png'">
            <h2>${nome} <span style="font-size: 14px; color: #888; font-weight: normal;">/ REGIÃO ${regiaoAtiva}</span></h2>
        </div>
        ${gerarHTMLDetalhes(nome, info)}
    `;
};

window.abrirModalBrawler = function(nomeBrawler) {
    const info = detalhesBrawlers[nomeBrawler.toUpperCase()] || {top_mapas: [], sinergias: []};
    let modal = document.getElementById('modal-analise-brawler');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'modal-analise-brawler';
        modal.className = 'brawler-modal-overlay';
        document.body.appendChild(modal);
    }

    modal.innerHTML = `
        <div class="brawler-modal-card">
            <div class="brawler-modal-header">
                <div style="display:flex; align-items:center; gap: 15px;">
                    <img src="${formatarNomeImagem(nomeBrawler)}" style="width: 40px; height: 40px; border-radius: 6px; border: 1px solid var(--accent-purple);">
                    <h2>ANÁLISE AVANÇADA: ${nomeBrawler.toUpperCase()} <span style="color:#666; font-size:12px;">(${regiaoAtiva})</span></h2>
                </div>
                <button class="brawler-modal-close" onclick="fecharModalBrawler()">&times;</button>
            </div>
            <div class="brawler-modal-body">
                ${gerarHTMLDetalhes(nomeBrawler, info)}
            </div>
        </div>
    `;
    modal.style.display = 'flex';
};

window.fecharModalBrawler = function() {
    const modal = document.getElementById('modal-analise-brawler');
    if (modal) modal.style.display = 'none';
};

// ========================================================
// 5. RENDERIZAÇÃO DE TIMES
// ========================================================
function renderizarListaTimes(regiaoAtual) {
    const container = document.getElementById("lista-times-sidebar");
    if (!container) return;

    let htmlFinal = "";

    if (regiaoAtual === "GERAL") {
        Object.keys(CONFIGURACAO_MANUAL_TIMES).forEach(reg => {
             htmlFinal += `
                <div class="sidebar-header" style="margin-top:20px; color:#fff; background: var(--bg-paineis); padding: 5px; text-align: center; border-radius: 4px;">
                    🌍 REGIÃO: ${reg}
                </div>
             `;
             htmlFinal += gerarHTMLTierTimes(CONFIGURACAO_MANUAL_TIMES[reg], reg);
        });
    } else {
        const configRegiao = CONFIGURACAO_MANUAL_TIMES[regiaoAtual];
        if (!configRegiao) {
            container.innerHTML = `<p style="padding: 10px; color: #666;">Região não configurada.</p>`;
            return;
        }
        htmlFinal = gerarHTMLTierTimes(configRegiao, regiaoAtual);
    }

    container.innerHTML = htmlFinal;
}

function gerarHTMLTierTimes(configRegiao, regiaoDoTime) {
    let html = "";
    Object.keys(configRegiao).forEach(tier => {
        const timesDoTier = configRegiao[tier];
        let timesHTML = "";

        timesDoTier.forEach(timeConfig => {
            const siglaImg = (timeConfig.id_time || "default").toLowerCase().split(' ')[0];
            timesHTML += `
                <div class="sidebar-item" data-teamid="${timeConfig.id_time}" onclick="exibirInfoTime('${timeConfig.id_time}', '${regiaoDoTime}')" style="padding: 12px; cursor: pointer; font-weight: 600; margin-left: 10px; border-left: 2px solid transparent; display: flex; align-items: center; gap: 10px;">
                    <img src="element/teams/${siglaImg}.png" style="width: 24px; height: 24px; object-fit: contain; border-radius: 4px;" onerror="this.style.display='none'">
                    <span>${timeConfig.nome_time}</span>
                </div>
            `;
        });

        if (timesHTML !== "") {
            html += `
                <div style="margin-top: 15px;">
                    <div style="font-size: 12px; color: var(--accent-purple); font-weight: 900; letter-spacing: 1px; padding: 5px 10px; text-transform: uppercase;">
                        ${tier}
                    </div>
                    ${timesHTML}
                </div>
            `;
        }
    });
    return html;
}

window.exibirInfoTime = function(idTime, regiaoDoTime) {
    const painel = document.getElementById("painel-info-time");
    if (!painel) return;

    document.querySelectorAll("#lista-times-sidebar .sidebar-item").forEach(i => {
        i.style.borderLeftColor = String(i.getAttribute("data-teamid")) === String(idTime) ? "var(--accent-purple)" : "transparent";
        i.style.backgroundColor = String(i.getAttribute("data-teamid")) === String(idTime) ? "var(--bg-cards)" : "transparent";
    });

    let timeConfig = null;
    let tierTime = "";
    const configRegiao = CONFIGURACAO_MANUAL_TIMES[regiaoDoTime];
    
    if (configRegiao) {
        for (const [tier, times] of Object.entries(configRegiao)) {
            const achou = times.find(t => t.id_time === idTime);
            if (achou) {
                timeConfig = achou;
                tierTime = tier;
                break;
            }
        }
    }

    if (!timeConfig) return;

    let picksSomadosTime = {};
    timeConfig.jogadores.forEach(jogador => {
        const picksDoJogador = dadosTimes[jogador.tag] || [];
        picksDoJogador.forEach(p => {
            if (!picksSomadosTime[p.brawler]) picksSomadosTime[p.brawler] = 0;
            picksSomadosTime[p.brawler] += p.qtd;
        });
    });

    let top15Time = Object.keys(picksSomadosTime)
        .map(b => ({ brawler: b, qtd: picksSomadosTime[b] }))
        .sort((a, b) => b.qtd - a.qtd)
        .slice(0, 15);

    let top15TimeHTML = top15Time.map(p => `
        <div class="player-mini-pick" onclick="abrirModalBrawler('${p.brawler}')" style="cursor: pointer; display: flex; flex-direction: column; align-items: center;" title="${p.brawler}">
            <img src="${formatarNomeImagem(p.brawler)}" onerror="this.src='brawlers/default.png'" style="width: 50px; height: 50px; border-radius: 8px; border: 2px solid var(--accent-purple); object-fit: cover;">
            <span class="pick-count" style="margin-top: -10px; z-index: 2; font-size: 11px; background: #000; padding: 2px 8px; border-radius: 10px; color: var(--winrate-color); font-weight: bold;">x${p.qtd}</span>
        </div>
    `).join('');

    let playersHTML = timeConfig.jogadores.map(player => {
        const picksPlayer = (dadosTimes[player.tag] || []).slice(0, 5);
        
        let picksHTML = picksPlayer.length ? picksPlayer.map(p => `
            <div class="player-mini-pick" onclick="abrirModalBrawler('${p.brawler}')" style="cursor: pointer; display: flex; flex-direction: column; align-items: center;">
                <img src="${formatarNomeImagem(p.brawler)}" onerror="this.src='brawlers/default.png'" style="width: 40px; height: 40px; border-radius: 4px; border: 1px solid #333; object-fit: cover;">
                <span style="margin-top: 4px; font-size: 10px; background: #111; padding: 2px 4px; border-radius: 4px; color: #ccc;">x${p.qtd}</span>
            </div>
        `).join('') : '<span style="color:#666; font-size:12px;">Sem partidas registradas.</span>';

        return `
            <div class="player-roster-card" style="background: var(--bg-cards); border: 1px solid var(--borda-destaque); border-radius: 10px; padding: 15px;">
                <div class="player-info-top" style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #222; padding-bottom: 10px; margin-bottom: 15px;">
                    <span class="p-nickname" style="font-size: 16px; font-weight: 900; color: #fff;">${player.nick}</span>
                    <span class="p-tag" style="font-size: 11px; color: #888; background: #000; padding: 4px 8px; border-radius: 4px;">${player.tag}</span>
                </div>
                <div class="player-history-box">
                    <h5 style="color: #888; margin-bottom: 10px; font-size: 12px; text-transform: uppercase;">Top 5 Brawlers</h5>
                    <div style="display: flex; gap: 10px; flex-wrap: wrap;">${picksHTML}</div>
                </div>
            </div>
        `;
    }).join('');

    const siglaImgPainel = (timeConfig.id_time || "default").toLowerCase().split(' ')[0];

    painel.innerHTML = `
        <div style="text-align: center; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 1px solid var(--borda-destaque); display: flex; flex-direction: column; align-items: center;">
            <div style="font-size: 12px; color: var(--accent-purple); font-weight: bold; letter-spacing: 2px; margin-bottom: 10px;">${tierTime} (${regiaoDoTime})</div>
            <div style="display: flex; align-items: center; justify-content: center; gap: 15px;">
                <img src="element/teams/${siglaImgPainel}.png" style="width: 60px; height: 60px; object-fit: contain;" onerror="this.style.display='none'">
                <h2 style="font-size: 32px; font-weight: 900; text-transform: uppercase; margin: 0;">${timeConfig.nome_time}</h2>
            </div>
        </div>
        
        <div style="background: var(--bg-cards); border: 1px solid var(--borda-destaque); border-radius: 10px; padding: 20px; margin-bottom: 30px;">
            <h3 style="margin-bottom: 15px; font-size: 14px; color: #888; text-transform: uppercase;">🔥 TOP 15 Picks Globais da Equipe</h3>
            <div style="display: flex; gap: 15px; flex-wrap: wrap;">
                ${top15TimeHTML || '<span style="color:#666;">Sem dados coletados ainda.</span>'}
            </div>
        </div>

        <h3 style="margin-bottom: 15px; font-size: 14px; color: #888; text-transform: uppercase;">👥 Roster Principal & Picks Individuais</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
            ${playersHTML}
        </div>
    `;
};


// ========================================================
// 6. FUNÇÕES DE ORDENAÇÃO E EVENTOS DE UI
// ========================================================
window.ordenarTabela = function(th, tipo) {
    const tabela = th.closest('table');
    const tbody = tabela.querySelector('tbody');
    const linhas = Array.from(tbody.querySelectorAll('tr'));
    const colunaIndex = Array.from(th.parentNode.children).indexOf(th);
    const ascendente = !th.classList.contains('sort-asc');
    
    tabela.querySelectorAll('th').forEach(h => h.classList.remove('sort-asc', 'sort-desc'));
    th.classList.add(ascendente ? 'sort-asc' : 'sort-desc');

    linhas.sort((linhaA, linhaB) => {
        let celulaA = linhaA.children[colunaIndex].textContent.trim();
        let celulaB = linhaB.children[colunaIndex].textContent.trim();

        if (tipo === 'number' || tipo === 'percent') {
            let numA = parseFloat(celulaA.replace('%', ''));
            let numB = parseFloat(celulaB.replace('%', ''));
            return ascendente ? numA - numB : numB - numA;
        } else {
            return ascendente ? celulaA.localeCompare(celulaB) : celulaB.localeCompare(celulaA);
        }
    });

    linhas.forEach(linha => tbody.appendChild(linha));
};

document.addEventListener("DOMContentLoaded", () => {
    const dropdowns = document.querySelectorAll(".dropdown");
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector(".nav-link");
        if (!link) return;
        link.addEventListener("click", (e) => {
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
        .brawler-modal-header h2 { font-size: 18px; color: #ffffff; letter-spacing: 1px; margin: 0; }
        .brawler-modal-close { background: none; border: none; color: #888; font-size: 28px; cursor: pointer; }
        .brawler-modal-close:hover { color: #ff3333; }
        .brawler-modal-body { padding: 25px; max-height: 80vh; overflow-y: auto; }
    `;
    document.head.appendChild(styleTag);
});
