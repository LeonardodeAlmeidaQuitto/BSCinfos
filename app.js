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
            { id_time: "GLXY", nome_time: "GALAXY", jogadores: [ { nick: "Doritos🐉", tag: "#202GJJR28" }, { nick: "Derpp🐰ᩚ", tag: "#2QG9LQQC8Y" }, { nick: "IceCrow", tag: "#9CPYUCGQC" } ] },
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
            { id_time: "BIG", nome_time: "BIG", jogadores: [ { nick: "Salty", tag: "#PLV89CGP" }, { nick: "Arthur🥥", tag: "#9RVPL0Q0P" }, { nick: "Melih🥥", tag: "#GLPJRCLYL" } ] }
        ],
     "TIER B": [
            { id_time: "REV", nome_time: "REVERSO HIVE", jogadores: [ { nick: "Fayelo", tag: "#LLV82LQPU" }, { nick: "Ethan", tag: "#2Y20JR8CQ" }, { nick: "Natrix", tag: "#CJ9YRGGC" } ] },
            { id_time: "TLB", nome_time: "TALENTS LAB", jogadores: [ { nick: "Yei Yei", tag: "#8RVLRVYYP" }, { nick: "Agachi", tag: "#YYUG20PQV" }, { nick: "Stas", tag: "#9LYQR9QC" } ] },
        ],
    },
    "EA": {
        "TIER S": [
            { id_time: "CR", nome_time: "CRAZY RACCOON", jogadores: [ { nick: "Tensai", tag: "#9ULYPV8" }, { nick: "Milkreo", tag: "#20C0LL00" }, { nick: "Moya", tag: "#UR2UL8YR" } ] },
            { id_time: "ZETA", nome_time: "ZETA DIVISION", jogadores: [ { nick: "Battoman", tag: "#P0Y8JGL0U" }, { nick: "Sizuku", tag: "#P90RJQ8C" }, { nick: "Sitetampo", tag: "#8Y98Q8U" } ] }
        ],
    "TIER A": [
            { id_time: "SKCEA", nome_time: "SKC EA", jogadores: [ { nick: "Kuru", tag: "#J99YU9QY" }, { nick: "Ghost T", tag: "#2CJJJGUJ20" }, { nick: "Naipishu", tag: "#2P0V0CQQ2" } ] },
            { id_time: "FG", nome_time: "IGM", jogadores: [ { nick: "Shigemyon", tag: "#2RQQ9PGC" }, { nick: "Drake", tag: "#2CJG2GGCGP" }, { nick: "Nyade", tag: "2UQVY2JL2V#" } ] },
            { id_time: "AXIS", nome_time: "AXIS", jogadores: [ { nick: "Terry", tag: "#LJ0288PRG" }, { nick: "Yume", tag: "#PJ80QPVL2" }, { nick: "Menmi", tag: "#QCLV9CL" } ] },
            { id_time: "RVL", nome_time: "RIVAL", jogadores: [ { nick: "Yutapin", tag: "#82CJYJPG2" }, { nick: "Ryohei", tag: "#82PQUPGU0" }, { nick: "Totoro", tag: "#2ULLCRYJ2Y" } ] },
            { id_time: "RC", nome_time: "REJECT", jogadores: [ { nick: "Melty", tag: "#8J9GUJJVY" }, { nick: "Levi", tag: "#29UGLJV2G" }, { nick: "Shu", tag: "#2G0RRLU2R" } ] },
            { id_time: "FL", nome_time: "FENNEL", jogadores: [ { nick: "Achapi", tag: "#28PU0P9L0" }, { nick: "Ken-G", tag: "#2282LR0YG" }, { nick: "I see", tag: "#8Y2Y0GYYG" } ] },
            { id_time: "INS", nome_time: "INSOMNIA", jogadores: [ { nick: "Koga", tag: "#28VP0G808" }, { nick: "Wahochi", tag: "#80YVJGRY" }, { nick: "Jene", tag: "#8GUPLYY" } ] },
            { id_time: "FZ", nome_time: "FRENZY", jogadores: [ { nick: "Toridesu", tag: "#89UUQLJCC" }, { nick: "Danshari", tag: "#99GGUPY2U" }, { nick: "Ferkel", tag: "#CV9Y9VPP" } ] },
            { id_time: "F0", nome_time: "FAZE ZERO", jogadores: [ { nick: "Rennosuke", tag: "#8R0JY2UJ2" }, { nick: "Telpny", tag: "#9GJ8GYCY2" }, { nick: "Mira", tag: "#88LLQGP0Q" } ] }
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
let regiaoAtiva = "SA";

let brawlerAtualSelecionado = null;
let timeAtualSelecionado = { id: null, regiao: null };

const formatarNomeImagem = (n) => `brawlers/${n.toLowerCase().replace(/[^a-z0-9]/g, "")}.png`;
const formatarNomeMapa = (m) => `element/maps/${m.toLowerCase().replace(/[^a-z0-9]/g, "")}.png`;

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
// 2. PARSERS E CARREGAMENTO DE DADOS (CSV DIRETO E LIMPO)
// ========================================================
function parseCSV(text) {
    let rows = text.split('\n').filter(r => r.trim() !== '');
    if(rows.length === 0) return [];
    let headers = rows[0].split(',').map(h => h.trim().replace(/\r/g, ""));
    return rows.slice(1).map(row => {
        let values = row.split(',');
        let obj = {};
        headers.forEach((h, i) => obj[h] = values[i] ? values[i].trim().replace(/\r/g, "") : "");
        return obj;
    });
}

function parseDateBR(dateStr) {
    if(!dateStr) return new Date();
    const [datePart, timePart] = dateStr.split(' ');
    if(!datePart) return new Date();
    const parts = datePart.split('/');
    if(parts.length < 3) return new Date();
    const [hr, min, sec] = (timePart || "00:00:00").split(':');
    return new Date(parts[2], parts[1]-1, parts[0], hr, min, sec);
}

window.carregarRegiao = async function(regiao) {
    regiaoAtiva = regiao.toUpperCase();
    dadosTimes = {};
    dadosOriginaisRegiao = [];

    try {
        // Busca ESTRITAMENTE o historico_bruto.csv
        let res = await fetch("historico_bruto.csv");
        
        if(res && res.ok) {
            const text = await res.text();
            let csvData = parseCSV(text);
            const ordemMeses = ["JANEIRO", "FEVEREIRO", "MARÇO", "ABRIL", "MAIO", "JUNHO", "JULHO", "AGOSTO", "SETEMBRO", "OUTUBRO", "NOVEMBRO", "DEZEMBRO"];
            
            dadosOriginaisRegiao = csvData.map(row => {
                const date = parseDateBR(row.data_adicao);
                return {
                    id_partida: row.id_partida,
                    pick: row.pick,
                    mapa: row.mapa,
                    modo: row.modo,
                    ano: String(date.getFullYear() || "2026"),
                    mes: ordemMeses[date.getMonth()] || "ABRIL",
                    tipo: row.tipo || "scrim",
                    vitorias: parseInt(row.win) || 0,
                    picks: 1,
                    id_time: row.id_time,
                    nome_time: row.nome_time,
                    player_name: row.player_name,
                    player_tag: row.player_tag,
                    data_adicao: row.data_adicao
                };
            });
            
            // Pré-processa dados de times para carregamento rápido
            dadosOriginaisRegiao.forEach(d => {
                if(!d.player_tag) return;
                if(!dadosTimes[d.player_tag]) dadosTimes[d.player_tag] = [];
                let list = dadosTimes[d.player_tag];
                let existing = list.find(x => x.brawler === d.pick && x.ano === d.ano && x.mes === d.mes && x.tipo === d.tipo);
                if(existing) {
                    existing.qtd += 1;
                } else {
                    list.push({ brawler: d.pick, ano: d.ano, mes: d.mes, tipo: d.tipo, qtd: 1 });
                }
            });
        } else {
            console.warn("historico_bruto.csv não encontrado.");
            document.querySelector('.main-container').innerHTML += `<div style="color:red; text-align:center; padding: 20px;">ERRO: historico_bruto.csv não encontrado na pasta raiz.</div>`;
        }
    } catch (e) { console.error("Erro no processamento do CSV.", e); }

    popularFiltrosIniciais();
    filtrarTudo();
    renderizarListaBrawlers();
    renderizarListaTimes(regiaoAtiva);
};

function popularFiltrosIniciais() {
    const selectAno = document.getElementById('select-ano');
    const selectMes = document.getElementById('select-mes');
    if (!selectAno || !selectMes) return;

    const anos = [...new Set(dadosOriginaisRegiao.map(d => d.ano))].filter(a => a);
    const meses = [...new Set(dadosOriginaisRegiao.map(d => d.mes))].filter(m => m);

    selectAno.innerHTML = '<option value="TODOS" selected>Todos os Anos</option>';
    selectMes.innerHTML = '<option value="TODOS" selected>Todos os Meses</option>';

    anos.sort().forEach(ano => selectAno.innerHTML += `<option value="${ano}">${ano}</option>`);
    const ordemMeses = ["JANEIRO", "FEVEREIRO", "MARÇO", "ABRIL", "MAIO", "JUNHO", "JULHO", "AGOSTO", "SETEMBRO", "OUTUBRO", "NOVEMBRO", "DEZEMBRO"];
    meses.sort((a, b) => ordemMeses.indexOf(a) - ordemMeses.indexOf(b)).forEach(mes => {
        selectMes.innerHTML += `<option value="${mes}">${mes}</option>`;
    });
}

// ========================================================
// 3. MASTER FILTRO
// ========================================================
window.filtrarTudo = function() {
    const anoSel = document.getElementById('select-ano')?.value || "TODOS";
    const mesSel = document.getElementById('select-mes')?.value || "TODOS";
    const tipoSel = document.getElementById('select-tipo')?.value || "overhaul";

    let dadosFiltrados = dadosOriginaisRegiao;
    if (anoSel !== "TODOS") dadosFiltrados = dadosFiltrados.filter(d => d.ano === anoSel);
    if (mesSel !== "TODOS") dadosFiltrados = dadosFiltrados.filter(d => d.mes === mesSel);
    if (tipoSel !== "overhaul") dadosFiltrados = dadosFiltrados.filter(d => d.tipo === tipoSel);

    // Validação de Mapas do Mês
    const mesesParaNumero = { "JANEIRO": "01", "FEVEREIRO": "02", "MARÇO": "03", "ABRIL": "04", "MAIO": "05", "JUNHO": "06", "JULHO": "07", "AGOSTO": "08", "SETEMBRO": "09", "OUTUBRO": "10", "NOVEMBRO": "11", "DEZEMBRO": "12" };
    if (anoSel !== "TODOS" && mesSel !== "TODOS") {
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
    renderizarScrims(dadosFiltrados);
    
    if (brawlerAtualSelecionado) exibirInfoBrawler(brawlerAtualSelecionado);
    if (timeAtualSelecionado.id) exibirInfoTime(timeAtualSelecionado.id, timeAtualSelecionado.regiao);
};

// ========================================================
// 4. META GERAL E MODOS
// ========================================================
function renderizarGridModos(dados, ano, mes) {
    const container = document.getElementById('grid-modos');
    if (!container) return;
    container.innerHTML = '';

    const mesesParaNumero = { "JANEIRO": "01", "FEVEREIRO": "02", "MARÇO": "03", "ABRIL": "04", "MAIO": "05", "JUNHO": "06", "JULHO": "07", "AGOSTO": "08", "SETEMBRO": "09", "OUTUBRO": "10", "NOVEMBRO": "11", "DEZEMBRO": "12" };
    const numMes = (mes && mes !== "TODOS") ? mesesParaNumero[mes.toUpperCase()] : "06";
    const anoAtual = (ano && ano !== "TODOS") ? ano : "2026";
    const chaveMes = `${anoAtual}-${numMes}`;
    const configuracaoMapas = MAPAS_POR_MES[chaveMes] || {};

    Object.keys(configuracaoMapas).forEach(modo => {
        const mapasDoModo = configuracaoMapas[modo];
        let mapasHTML = "";

        mapasDoModo.forEach(mapa => {
            const dadosMapa = dados.filter(d => d.mapa.toLowerCase() === mapa.toLowerCase());
            if (dadosMapa.length === 0) return;

            let brawlersAgrupados = {};
            let totalPartidasMapa = new Set(dadosMapa.map(d => d.id_partida)).size;

            dadosMapa.forEach(d => {
                if(!brawlersAgrupados[d.pick]) brawlersAgrupados[d.pick] = { pick: d.pick, picks: 0, vitorias: 0 };
                brawlersAgrupados[d.pick].picks += d.picks;
                brawlersAgrupados[d.pick].vitorias += d.vitorias;
            });
            
            // REGRA: Mostrar apenas >= 5 picks
            let listaM = Object.values(brawlersAgrupados).filter(d => d.picks >= 5);
            listaM.sort((a, b) => b.picks - a.picks);

            let linhasBrawlers = listaM.map(d => `
                <tr style="cursor: pointer;" onclick="abrirModalBrawler('${d.pick}')" title="Análise detalhada de ${d.pick}">
                    <td class="col-img"><img src="${formatarNomeImagem(d.pick)}" onerror="this.src='brawlers/default.png'"></td>
                    <td style="text-align: left; font-weight: bold;">${d.pick.toUpperCase()}</td>
                    <td>${d.picks}</td>
                    <td style="color: #aaa;">${ totalPartidasMapa > 0 ? ((d.picks / totalPartidasMapa) * 100).toFixed(1) + '%' : '0.0%' }</td>
                    <td>${d.vitorias}</td>
                    <td class="winrate-cell">${ d.picks > 0 ? ((d.vitorias / d.picks) * 100).toFixed(1) + '%' : '0.0%' }</td>
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

    let totalPartidasGerais = new Set(dados.map(d => d.id_partida)).size;
    let agrupadoGeral = {};
    
    dados.forEach(d => {
        if (!agrupadoGeral[d.pick]) agrupadoGeral[d.pick] = { picks: 0, vitorias: 0 };
        agrupadoGeral[d.pick].picks += d.picks;
        agrupadoGeral[d.pick].vitorias += d.vitorias;
    });

    // REGRA: Mostrar apenas >= 5 picks no META
    let listaGeral = Object.keys(agrupadoGeral).map(brawler => {
        const item = agrupadoGeral[brawler];
        const wr = item.picks > 0 ? ((item.vitorias / item.picks) * 100).toFixed(1) + "%" : "0.0%";
        const pr = totalPartidasGerais > 0 ? ((item.picks / totalPartidasGerais) * 100).toFixed(1) + "%" : "0.0%";
        return { brawler, picks: item.picks, vitorias: item.vitorias, win_rate: wr, pick_rate: pr };
    }).filter(d => d.picks >= 5);

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

// ========================================================
// 5. BRAWLERS (DETALHES, SINERGIA E COUNTERS)
// ========================================================
function renderizarListaBrawlers() {
    const container = document.getElementById("lista-brawlers-sidebar");
    if (!container) return;
    
    let brawlers = [...new Set(dadosOriginaisRegiao.map(d => d.pick.toLowerCase()))];
    brawlers.sort();
    
    container.innerHTML = brawlers.map(b => `
        <div class="sidebar-item" onclick="exibirInfoBrawler('${b}')" style="display: flex; align-items: center; gap: 12px; padding: 10px; cursor: pointer;">
            <img src="${formatarNomeImagem(b)}" style="width: 35px; height: 35px; object-fit: cover; border-radius: 6px; border: 1px solid var(--borda-destaque);" onerror="this.src='brawlers/default.png'">
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

function gerarHTMLDetalhesBrawler(nomeBrawler) {
    const anoSel = document.getElementById('select-ano')?.value || "TODOS";
    const mesSel = document.getElementById('select-mes')?.value || "TODOS";
    const tipoSel = document.getElementById('select-tipo')?.value || "overhaul";

    let dadosFiltrados = dadosOriginaisRegiao;
    if (anoSel !== "TODOS") dadosFiltrados = dadosFiltrados.filter(d => d.ano === anoSel);
    if (mesSel !== "TODOS") dadosFiltrados = dadosFiltrados.filter(d => d.mes === mesSel);
    if (tipoSel !== "overhaul") dadosFiltrados = dadosFiltrados.filter(d => d.tipo === tipoSel);

    // MAPAS
    let brawlerMatches = dadosFiltrados.filter(d => d.pick.toUpperCase() === nomeBrawler.toUpperCase());
    let mapaAgrupado = {};
    brawlerMatches.forEach(m => {
        let k = m.mapa + '|' + m.modo;
        if(!mapaAgrupado[k]) mapaAgrupado[k] = { mapa: m.mapa, modo: m.modo, picks: 0 };
        mapaAgrupado[k].picks += 1;
    });
    let topMapas = Object.values(mapaAgrupado).sort((a,b) => b.picks - a.picks).slice(0, 3);

    // SINERGIAS E COUNTERS
    let partidasIds = new Set(brawlerMatches.map(m => m.id_partida));
    let sinergiaAgrupada = {};
    let counteraAgrupada = {}; 
    let countersAgrupada = {}; 

    partidasIds.forEach(pid => {
        let rows = dadosFiltrados.filter(d => d.id_partida === pid);
        let myRow = rows.find(d => d.pick.toUpperCase() === nomeBrawler.toUpperCase());
        if(!myRow) return;

        // O bot insere 6 linhas por partida. As primeiras 3 são do Time A, últimas 3 Time B.
        let isMyTeamA = rows.indexOf(myRow) < 3;
        let myWin = myRow.vitorias;

        rows.forEach((r, index) => {
            if(r.pick.toUpperCase() === nomeBrawler.toUpperCase()) return; // Ignora o proprio brawler

            let isAlly = (index < 3 && isMyTeamA) || (index >= 3 && !isMyTeamA);

            if(isAlly) {
                if(!sinergiaAgrupada[r.pick]) sinergiaAgrupada[r.pick] = { nome: r.pick, picks: 0, vitorias: 0 };
                sinergiaAgrupada[r.pick].picks += 1;
                sinergiaAgrupada[r.pick].vitorias += myWin;
            } else {
                // Inimigos
                if(!counteraAgrupada[r.pick]) counteraAgrupada[r.pick] = { nome: r.pick, picks: 0, vitorias: 0 };
                counteraAgrupada[r.pick].picks += 1;
                counteraAgrupada[r.pick].vitorias += myWin; // Se eu ganhei do inimigo
                
                if(!countersAgrupada[r.pick]) countersAgrupada[r.pick] = { nome: r.pick, picks: 0, derrotas: 0 };
                countersAgrupada[r.pick].picks += 1;
                countersAgrupada[r.pick].derrotas += (myWin === 0 ? 1 : 0); // Se eu perdi pro inimigo
            }
        });
    });

    let topSinergias = Object.values(sinergiaAgrupada).map(s => ({
        nome: s.nome, picks: s.picks, taxa: s.picks > 0 ? ((s.vitorias/s.picks)*100).toFixed(1) + '% WR' : '0.0%'
    })).sort((a,b) => b.picks - a.picks).slice(0, 5);

    let topCountera = Object.values(counteraAgrupada).map(c => ({
        nome: c.nome, picks: c.picks, wr_num: c.picks > 0 ? (c.vitorias/c.picks) : 0, taxa: c.picks > 0 ? ((c.vitorias/c.picks)*100).toFixed(1) + '% WR' : '0.0%'
    })).sort((a,b) => b.wr_num - a.wr_num || b.picks - a.picks).slice(0, 5);

    let topCounters = Object.values(countersAgrupada).map(c => ({
        nome: c.nome, picks: c.picks, lr_num: c.picks > 0 ? (c.derrotas/c.picks) : 0, taxa: c.picks > 0 ? ((c.derrotas/c.picks)*100).toFixed(1) + '% LR' : '0.0%'
    })).sort((a,b) => b.lr_num - a.lr_num || b.picks - a.picks).slice(0, 5);

    let formatBox = (lista, ehCounter = false, corEdge) => {
        return lista.length > 0 ? lista.map(item => `
            <div style="display: flex; align-items: center; justify-content: space-between; padding: 10px; background: #111; border-radius: 8px; border: 1px solid var(--borda-destaque); margin-bottom: 10px;">
                <div style="display: flex; align-items: center; gap: 6px;">
                    ${!ehCounter ? `<img src="${formatarNomeImagem(nomeBrawler)}" onerror="this.src='brawlers/default.png'" style="width: 32px; height: 32px; border-radius: 4px;"> <span style="color: #666; font-size: 18px; font-weight: bold; margin: 0 4px;">+</span>` : ''}
                    <img src="${formatarNomeImagem(item.nome)}" onerror="this.src='brawlers/default.png'" style="width: 32px; height: 32px; border-radius: 4px; border: 2px solid ${corEdge};">
                    <span style="font-size: 14px; font-weight: bold; margin-left: 8px; color: #fff;">${item.nome.toUpperCase()}</span>
                </div>
                <div style="font-size: 13px; color: #ccc; display: flex; gap: 15px;">
                    <span><strong>${item.picks}</strong> ${ehCounter ? 'MATCHES' : 'PICKS'}</span>
                    <span style="color: ${corEdge}; font-weight: bold;">${item.taxa}</span>
                </div>
            </div>
        `).join('') : `<div style="font-size:13px; color:#555;">Sem dados suficientes no filtro.</div>`;
    };

    let mapasHTML = topMapas.length > 0 ? topMapas.map(m => `
        <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 12px; background: #111; padding: 10px; border-radius: 8px; border: 1px solid var(--borda-destaque);">
            <img src="${formatarNomeMapa(m.mapa)}" onerror="this.src='element/default.png'" style="width: 70px; height: 50px; border-radius: 6px; object-fit: cover;">
            <div>
                <div style="font-weight: bold; font-size: 15px; color: #fff;">${m.mapa.toUpperCase()}</div>
                <div style="color: #888; font-size: 12px; margin-top: 2px;">${m.modo.toUpperCase()}</div>
                <div style="color: var(--accent-purple); font-weight: bold; font-size: 13px; margin-top: 4px;">${m.picks} Partidas</div>
            </div>
        </div>
    `).join('') : `<div style="font-size:13px; color:#555;">Sem dados suficientes no filtro.</div>`;

    return `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
            <div style="grid-column: 1 / -1; display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                <div>
                    <h4 style="font-size: 14px; color: #888; margin-bottom: 15px; text-transform: uppercase;">Top 3 Mapas & Modos</h4>
                    ${mapasHTML}
                </div>
                <div>
                    <h4 style="font-size: 14px; color: #888; margin-bottom: 15px; text-transform: uppercase;">Top 5 Sinergias</h4>
                    ${formatBox(topSinergias, false, 'var(--accent-purple)')}
                </div>
            </div>
            <div>
                <h4 style="font-size: 14px; color: #888; margin-bottom: 15px; text-transform: uppercase; color: #00ff66;">COUNTERA (Ganha De)</h4>
                ${formatBox(topCountera, true, '#00ff66')}
            </div>
            <div>
                <h4 style="font-size: 14px; color: #888; margin-bottom: 15px; text-transform: uppercase; color: #ff3333;">COUNTERS (Perde Para)</h4>
                ${formatBox(topCounters, true, '#ff3333')}
            </div>
        </div>
    `;
}

window.exibirInfoBrawler = function(nome) {
    const painel = document.getElementById("painel-info-brawler");
    if (!painel) return;
    brawlerAtualSelecionado = nome;

    document.querySelectorAll("#lista-brawlers-sidebar .sidebar-item").forEach(i => {
        i.classList.toggle("active", i.querySelector(".brawler-name").textContent.toLowerCase() === nome.toLowerCase());
    });

    painel.innerHTML = `
        <div class="brawler-profile-header">
            <img src="${formatarNomeImagem(nome)}" class="brawler-large-avatar" onerror="this.src='brawlers/default.png'">
            <h2>${nome}</h2>
        </div>
        ${gerarHTMLDetalhesBrawler(nome)}
    `;
};

window.abrirModalBrawler = function(nomeBrawler) {
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
                    <h2>ANÁLISE AVANÇADA: ${nomeBrawler.toUpperCase()}</h2>
                </div>
                <button class="brawler-modal-close" onclick="document.getElementById('modal-analise-brawler').style.display='none'">&times;</button>
            </div>
            <div class="brawler-modal-body">${gerarHTMLDetalhesBrawler(nomeBrawler)}</div>
        </div>
    `;
    modal.style.display = 'flex';
};

// ========================================================
// 6. TIMES
// ========================================================
function renderizarListaTimes(regiaoAtual) {
    const container = document.getElementById("lista-times-sidebar");
    if (!container) return;

    let htmlFinal = "";
    const configRegiao = CONFIGURACAO_MANUAL_TIMES[regiaoAtual];
    
    if (configRegiao) {
        Object.keys(configRegiao).forEach(tier => {
            let timesHTML = "";
            configRegiao[tier].forEach(timeConfig => {
                const siglaImg = (timeConfig.id_time || "default").toLowerCase().split(' ')[0];
                timesHTML += `
                    <div class="sidebar-item" data-teamid="${timeConfig.id_time}" onclick="exibirInfoTime('${timeConfig.id_time}', '${regiaoAtual}')" style="padding: 12px; cursor: pointer; font-weight: 600; margin-left: 10px; border-left: 2px solid transparent; display: flex; align-items: center; gap: 10px;">
                        <img src="element/teams/${siglaImg}.png" style="width: 24px; height: 24px; object-fit: contain; border-radius: 4px;" onerror="this.style.display='none'">
                        <span>${timeConfig.nome_time}</span>
                    </div>`;
            });
            if (timesHTML !== "") htmlFinal += `<div style="margin-top: 15px;"><div style="font-size: 12px; color: var(--accent-purple); font-weight: 900; letter-spacing: 1px; padding: 5px 10px; text-transform: uppercase;">${tier}</div>${timesHTML}</div>`;
        });
    }
    container.innerHTML = htmlFinal;
}

window.exibirInfoTime = function(idTime, regiaoDoTime) {
    const painel = document.getElementById("painel-info-time");
    if (!painel) return;
    timeAtualSelecionado = { id: idTime, regiao: regiaoDoTime };

    document.querySelectorAll("#lista-times-sidebar .sidebar-item").forEach(i => {
        i.style.borderLeftColor = String(i.getAttribute("data-teamid")) === String(idTime) ? "var(--accent-purple)" : "transparent";
        i.style.backgroundColor = String(i.getAttribute("data-teamid")) === String(idTime) ? "var(--bg-cards)" : "transparent";
    });

    let timeConfig = null, tierTime = "";
    for (const [tier, times] of Object.entries(CONFIGURACAO_MANUAL_TIMES[regiaoDoTime] || {})) {
        const achou = times.find(t => t.id_time === idTime);
        if (achou) { timeConfig = achou; tierTime = tier; break; }
    }
    if (!timeConfig) return;

    const anoSel = document.getElementById('select-ano')?.value || "TODOS";
    const mesSel = document.getElementById('select-mes')?.value || "TODOS";
    const tipoSel = document.getElementById('select-tipo')?.value || "overhaul";

    let picksSomadosTime = {};
    timeConfig.jogadores.forEach(jogador => {
        (dadosTimes[jogador.tag] || []).forEach(p => {
            if (anoSel !== "TODOS" && p.ano !== anoSel) return;
            if (mesSel !== "TODOS" && p.mes !== mesSel) return;
            if (tipoSel !== "overhaul" && p.tipo !== tipoSel) return;

            if (!picksSomadosTime[p.brawler]) picksSomadosTime[p.brawler] = 0;
            picksSomadosTime[p.brawler] += p.qtd;
        });
    });

    let top15Time = Object.keys(picksSomadosTime).map(b => ({ brawler: b, qtd: picksSomadosTime[b] })).sort((a, b) => b.qtd - a.qtd).slice(0, 15);
    let top15TimeHTML = top15Time.map(p => `
        <div class="player-mini-pick" onclick="abrirModalBrawler('${p.brawler}')" style="cursor: pointer; display: flex; flex-direction: column; align-items: center;" title="${p.brawler}">
            <img src="${formatarNomeImagem(p.brawler)}" onerror="this.src='brawlers/default.png'" style="width: 50px; height: 50px; border-radius: 8px; border: 2px solid var(--accent-purple); object-fit: cover;">
            <span class="pick-count" style="margin-top: -10px; z-index: 2; font-size: 11px; background: #000; padding: 2px 8px; border-radius: 10px; color: var(--winrate-color); font-weight: bold;">x${p.qtd}</span>
        </div>
    `).join('');

    let playersHTML = timeConfig.jogadores.map(player => {
        let aggPlayer = {};
        (dadosTimes[player.tag] || []).forEach(p => {
            if (anoSel !== "TODOS" && p.ano !== anoSel) return;
            if (mesSel !== "TODOS" && p.mes !== mesSel) return;
            if (tipoSel !== "overhaul" && p.tipo !== tipoSel) return;
            if(!aggPlayer[p.brawler]) aggPlayer[p.brawler] = 0;
            aggPlayer[p.brawler] += p.qtd;
        });

        let picksPlayer = Object.keys(aggPlayer).map(b => ({brawler: b, qtd: aggPlayer[b]})).sort((a,b) => b.qtd - a.qtd).slice(0, 5);
        let picksHTML = picksPlayer.length ? picksPlayer.map(p => `
            <div class="player-mini-pick" onclick="abrirModalBrawler('${p.brawler}')" style="cursor: pointer; display: flex; flex-direction: column; align-items: center;">
                <img src="${formatarNomeImagem(p.brawler)}" onerror="this.src='brawlers/default.png'" style="width: 40px; height: 40px; border-radius: 4px; border: 1px solid #333; object-fit: cover;">
                <span style="margin-top: 4px; font-size: 10px; background: #111; padding: 2px 4px; border-radius: 4px; color: #ccc;">x${p.qtd}</span>
            </div>
        `).join('') : '<span style="color:#666; font-size:12px;">Sem dados p/ o filtro.</span>';

        return `
            <div class="player-roster-card" style="background: var(--bg-cards); border: 1px solid var(--borda-destaque); border-radius: 10px; padding: 15px;">
                <div class="player-info-top" style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #222; padding-bottom: 10px; margin-bottom: 15px;">
                    <span class="p-nickname" style="font-size: 16px; font-weight: 900; color: #fff;">${player.nick}</span>
                    <span class="p-tag" style="font-size: 11px; color: #888; background: #000; padding: 4px 8px; border-radius: 4px;">${player.tag}</span>
                </div>
                <div class="player-history-box"><h5 style="color: #888; margin-bottom: 10px; font-size: 12px; text-transform: uppercase;">Top 5 Brawlers</h5><div style="display: flex; gap: 10px; flex-wrap: wrap;">${picksHTML}</div></div>
            </div>`;
    }).join('');

    painel.innerHTML = `
        <div style="text-align: center; margin-bottom: 30px; padding-bottom: 20px; border-bottom: 1px solid var(--borda-destaque); display: flex; flex-direction: column; align-items: center;">
            <div style="font-size: 12px; color: var(--accent-purple); font-weight: bold; letter-spacing: 2px; margin-bottom: 10px;">${tierTime} (${regiaoDoTime})</div>
            <div style="display: flex; align-items: center; justify-content: center; gap: 15px;">
                <img src="element/teams/${(timeConfig.id_time || "default").toLowerCase().split(' ')[0]}.png" style="width: 60px; height: 60px; object-fit: contain;" onerror="this.style.display='none'">
                <h2 style="font-size: 32px; font-weight: 900; text-transform: uppercase; margin: 0;">${timeConfig.nome_time}</h2>
            </div>
        </div>
        <div style="background: var(--bg-cards); border: 1px solid var(--borda-destaque); border-radius: 10px; padding: 20px; margin-bottom: 30px;">
            <h3 style="margin-bottom: 15px; font-size: 14px; color: #888; text-transform: uppercase;">🔥 TOP 15 Picks Globais da Equipe</h3>
            <div style="display: flex; gap: 15px; flex-wrap: wrap;">${top15TimeHTML || '<span style="color:#666;">Sem dados coletados ainda.</span>'}</div>
        </div>
        <h3 style="margin-bottom: 15px; font-size: 14px; color: #888; text-transform: uppercase;">👥 Roster Principal & Picks Individuais</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">${playersHTML}</div>
    `;
};

// ========================================================
// 7. SCRIMS (Agrupamento e Interface)
// ========================================================
window.renderizarScrims = function(dadosFiltrados) {
    let matches = {};
    dadosFiltrados.forEach(row => {
        if(!matches[row.id_partida]) {
            matches[row.id_partida] = {
                id: row.id_partida, dataStr: row.data_adicao, timestamp: parseDateBR(row.data_adicao).getTime(),
                mapa: row.mapa, modo: row.modo, times: {}, picks: { timeA: [], timeB: [] }, vencedor: null
            };
        }
        let m = matches[row.id_partida];
        
        // Identificar os times pelos blocos de 6 (os primeiros 3 são time A, os próximos time B)
        let teamKey = row.id_time || "UNKNOWN";
        if (Object.keys(m.times).length < 2 && !m.times[teamKey]) {
            m.times[teamKey] = { nome: row.nome_time || teamKey, id: row.id_time, win: row.vitorias };
        }
        
        let isTeamA = (teamKey === Object.keys(m.times)[0]);
        let arr = isTeamA ? m.picks.timeA : m.picks.timeB;
        arr.push({ brawler: row.pick, player: row.player_name });
        
        if (row.vitorias === 1) m.vencedor = teamKey;
    });

    let scrims = [];
    Object.values(matches).sort((a,b) => a.timestamp - b.timestamp).forEach(m => {
        let teams = Object.keys(m.times).sort().join(" vs ");
        // Verifica se existe uma Scrim recente (2 horas de diferença = 7200000 ms) entre os mesmos times
        let found = scrims.slice().reverse().find(s => s.teamsKey === teams && (m.timestamp - s.matches[s.matches.length - 1].timestamp <= 7200000));
        
        if (found) {
            found.matches.push(m);
            if (m.vencedor) found.score[m.vencedor] = (found.score[m.vencedor] || 0) + 1;
        } else {
            let score = {}; if(m.vencedor) score[m.vencedor] = 1;
            scrims.push({ id: 's_' + m.timestamp, teamsKey: teams, times: m.times, matches: [m], score: score, data: m.dataStr });
        }
    });

    const lista = document.getElementById("scrims-lista");
    const detalhe = document.getElementById("scrims-detalhe");
    if (!lista || !detalhe) return;
    lista.style.display = "flex"; detalhe.style.display = "none";
    
    lista.innerHTML = scrims.length ? scrims.reverse().map(s => {
        let keys = Object.keys(s.times);
        let t1 = keys[0], t2 = keys[1];
        let logo1 = `element/teams/${(t1||"").toLowerCase().split(' ')[0]}.png`;
        let logo2 = `element/teams/${(t2||"").toLowerCase().split(' ')[0]}.png`;

        return `
            <div onclick='abrirScrim(${JSON.stringify(s).replace(/'/g, "&#39;")})' style="background: var(--bg-cards); padding: 15px; border-radius: 8px; border: 1px solid var(--borda-destaque); cursor: pointer; display: flex; align-items: center; justify-content: space-between;">
                <div style="font-size: 12px; color: #888; width: 120px;">${s.data.split(' ')[0]}</div>
                <div style="display: flex; align-items: center; gap: 20px;">
                    <img src="${logo1}" onerror="this.src='element/teams/default.png'" style="width: 40px; height: 40px; object-fit: contain;">
                    <span style="font-size: 24px; font-weight: bold;">${s.score[t1] || 0} - ${s.score[t2] || 0}</span>
                    <img src="${logo2}" onerror="this.src='element/teams/default.png'" style="width: 40px; height: 40px; object-fit: contain;">
                </div>
                <div style="font-size: 12px; color: var(--accent-purple);">VER DETALHES ▶</div>
            </div>
        `;
    }).join('') : '<div style="color: #666; text-align: center;">Nenhuma scrim/partida encontrada para os filtros.</div>';
};

window.abrirScrim = function(s) {
    document.getElementById("scrims-lista").style.display = "none";
    const detalhe = document.getElementById("scrims-detalhe");
    detalhe.style.display = "block";

    let keys = Object.keys(s.times);
    let t1 = keys[0], t2 = keys[1];
    let r1 = new Set(), r2 = new Set();
    s.matches.forEach(m => { m.picks.timeA.forEach(p => r1.add(p.player.split('|').pop())); m.picks.timeB.forEach(p => r2.add(p.player.split('|').pop())); });

    detalhe.innerHTML = `
        <button onclick="document.getElementById('scrims-lista').style.display='flex'; document.getElementById('scrims-detalhe').style.display='none';" style="background: none; border: none; color: var(--accent-purple); cursor: pointer; font-size: 14px; margin-bottom: 20px;">◀ VOLTAR PARA LISTA DE SCRIMS</button>
        <div style="display: flex; justify-content: space-around; background: var(--bg-cards); padding: 20px; border-radius: 8px; border: 1px solid var(--borda-destaque); margin-bottom: 20px;">
            <div style="text-align: center;">
                <img src="element/teams/${(t1||"").toLowerCase().split(' ')[0]}.png" onerror="this.src='element/teams/default.png'" style="width: 80px; height: 80px; object-fit: contain;">
                <h3 style="margin-top: 10px;">${s.times[t1].nome}</h3>
                <div style="color: #888; font-size: 12px; margin-top: 5px;">${Array.from(r1).join(' | ')}</div>
            </div>
            <div style="font-size: 32px; font-weight: bold; align-self: center;">VS</div>
            <div style="text-align: center;">
                <img src="element/teams/${(t2||"").toLowerCase().split(' ')[0]}.png" onerror="this.src='element/teams/default.png'" style="width: 80px; height: 80px; object-fit: contain;">
                <h3 style="margin-top: 10px;">${s.times[t2].nome}</h3>
                <div style="color: #888; font-size: 12px; margin-top: 5px;">${Array.from(r2).join(' | ')}</div>
            </div>
        </div>
        <h4 style="margin-bottom: 15px; color: #fff;">RODADAS (${s.matches.length})</h4>
        <div style="display: flex; flex-direction: column; gap: 10px;">
            ${s.matches.map((m, i) => `
                <div class="scrim-round" onclick="toggleRound(this)" style="background: #111; border: 1px solid var(--borda-suave); border-radius: 8px; overflow: hidden; cursor: pointer;">
                    <div style="padding: 15px; display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--borda-suave); background: var(--bg-paineis);">
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <img src="element/${m.modo}.png" onerror="this.src='element/default.png'" style="width: 30px; height: 30px;">
                            <span style="font-weight: bold;">Rodada ${i+1} - ${m.mapa}</span>
                        </div>
                        <span style="font-size: 12px; color: #888;">${m.dataStr.split(' ')[1]} ▼</span>
                    </div>
                    <div class="round-details" style="display: none; padding: 20px; text-align: center; background: var(--bg-cards);">
                        <img src="element/maps/${m.mapa.toLowerCase().replace(/[^a-z0-9]/g, "")}.png" onerror="this.style.display='none'" style="width: 150px; height: 100px; border-radius: 8px; object-fit: cover; margin-bottom: 15px;">
                        <div style="display: flex; justify-content: space-around; align-items: center;">
                            <div style="display: flex; gap: 10px;">
                                ${m.picks.timeA.map(p => `<img src="${formatarNomeImagem(p.brawler)}" onerror="this.src='brawlers/default.png'" style="width: 45px; height: 45px; border-radius: 6px; border: 2px solid ${m.vencedor===t1 ? '#00ff66' : '#ff3333'};" title="${p.player}">`).join('')}
                            </div>
                            <div style="font-size: 20px; font-weight: bold; color: #555;">X</div>
                            <div style="display: flex; gap: 10px;">
                                ${m.picks.timeB.map(p => `<img src="${formatarNomeImagem(p.brawler)}" onerror="this.src='brawlers/default.png'" style="width: 45px; height: 45px; border-radius: 6px; border: 2px solid ${m.vencedor===t2 ? '#00ff66' : '#ff3333'};" title="${p.player}">`).join('')}
                            </div>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
};
window.toggleRound = function(el) {
    let det = el.querySelector('.round-details');
    det.style.display = det.style.display === 'none' ? 'block' : 'none';
};

// ========================================================
// ORDENAÇÃO E EVENTOS
// ========================================================
window.ordenarTabela = function(th, tipo) {
    const tabela = th.closest('table'), tbody = tabela.querySelector('tbody'), linhas = Array.from(tbody.querySelectorAll('tr'));
    const colunaIndex = Array.from(th.parentNode.children).indexOf(th), ascendente = !th.classList.contains('sort-asc');
    tabela.querySelectorAll('th').forEach(h => h.classList.remove('sort-asc', 'sort-desc')); th.classList.add(ascendente ? 'sort-asc' : 'sort-desc');
    linhas.sort((linhaA, linhaB) => {
        let celulaA = linhaA.children[colunaIndex].textContent.trim(), celulaB = linhaB.children[colunaIndex].textContent.trim();
        if (tipo === 'number' || tipo === 'percent') return ascendente ? parseFloat(celulaA.replace('%', '')) - parseFloat(celulaB.replace('%', '')) : parseFloat(celulaB.replace('%', '')) - parseFloat(celulaA.replace('%', ''));
        return ascendente ? celulaA.localeCompare(celulaB) : celulaB.localeCompare(celulaA);
    });
    linhas.forEach(linha => tbody.appendChild(linha));
};

document.addEventListener("DOMContentLoaded", () => {
    const dropdowns = document.querySelectorAll(".dropdown");
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector(".nav-link");
        if (!link) return;
        link.addEventListener("click", (e) => { e.preventDefault(); dropdowns.forEach(other => { if (other !== dropdown) other.classList.remove("active"); }); dropdown.classList.toggle("active"); });
    });
    document.addEventListener("click", (e) => { if (!e.target.closest(".dropdown")) dropdowns.forEach(d => d.classList.remove("active")); });
});
