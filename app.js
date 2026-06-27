let dadosBrutos = [];
let dadosFiltrados = [];
let listaBrawlers = [];
let brawlerSelecionado = null;
let timeSelecionado = null;

// Captura a região atual do HTML (definida no <script> do HTML). 
// Se por algum motivo não encontrar, usa "SA" como padrão de segurança.
const _REGIAO = window.REGIAO_ATUAL ? window.REGIAO_ATUAL.toUpperCase() : "SA";

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

function carregarTimesSalvosLocal() {
    let salvos = JSON.parse(localStorage.getItem('customTeams_' + _REGIAO)) || [];
    if (!CONFIGURACAO_MANUAL_TIMES[_REGIAO] && _REGIAO !== "ALL") {
        CONFIGURACAO_MANUAL_TIMES[_REGIAO] = {};
    }
    
    // Configura a região se for "ALL"
    if (_REGIAO === "ALL" && !CONFIGURACAO_MANUAL_TIMES["ALL"]) {
        CONFIGURACAO_MANUAL_TIMES["ALL"] = { "TIER ?": [], "TIMES REGISTRADOS": [] };
    }

    let regAlvo = _REGIAO === "ALL" ? "ALL" : _REGIAO;
    if (!CONFIGURACAO_MANUAL_TIMES[regAlvo]["TIMES REGISTRADOS"]) {
        CONFIGURACAO_MANUAL_TIMES[regAlvo]["TIMES REGISTRADOS"] = [];
    }
    salvos.forEach(t => CONFIGURACAO_MANUAL_TIMES[regAlvo]["TIMES REGISTRADOS"].push(t));
}
carregarTimesSalvosLocal();

const formatImg = n => { if(!n) return 'default'; return n.toLowerCase().replace(/[^a-z0-9]/g, ''); };

// Verifica dinamicamente na região atual (Modificado para aceitar TODAS quando for "ALL")
const isTimeDaRegiaoAtual = (id) => {
    if (_REGIAO === "ALL") {
        for (let reg in CONFIGURACAO_MANUAL_TIMES) {
            for (let tier in CONFIGURACAO_MANUAL_TIMES[reg]) {
                if (CONFIGURACAO_MANUAL_TIMES[reg][tier].find(t => t.id_time === id)) return true;
            }
        }
        return false;
    }
    
    let reg = CONFIGURACAO_MANUAL_TIMES[_REGIAO];
    if(!reg) return false;
    for(let tier in reg) {
        if(reg[tier].find(t => t.id_time === id)) return true;
    }
    return false;
};

function encontrarTimePorRoster(tagsArray) {
    for (let reg in CONFIGURACAO_MANUAL_TIMES) {
        for (let tier in CONFIGURACAO_MANUAL_TIMES[reg]) {
            if (tier === "TIER ?") continue;
            for (let team of CONFIGURACAO_MANUAL_TIMES[reg][tier]) {
                let matchCount = 0;
                team.jogadores.forEach(j => {
                    if (tagsArray.includes(j.tag)) matchCount++;
                });
                if (matchCount >= 2) return { id: team.id_time, nome: team.nome_time, regiao: reg };
            }
        }
    }
    return null;
}

// Converte a string de data "DD/MM/YYYY HH:MM:SS" em timestamp numérico estável
function parseDateBR(dataStr) {
    if (!dataStr) return 0;
    try {
        let partesEspaco = dataStr.split(' ');
        let dataPartes = partesEspaco[0].split('/');
        let day = parseInt(dataPartes[0], 10);
        let month = parseInt(dataPartes[1], 10) - 1;
        let year = parseInt(dataPartes[2], 10);
        
        let hour = 0, min = 0, sec = 0;
        if (partesEspaco[1]) {
            let timePartes = partesEspaco[1].split(':');
            hour = parseInt(timePartes[0], 10) || 0;
            min = parseInt(timePartes[1], 10) || 0;
            sec = parseInt(timePartes[2], 10) || 0;
        }
        return new Date(year, month, day, hour, min, sec).getTime();
    } catch (e) {
        return 0;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    carregarCSV();
});

// ==========================================
// 2. CARREGAMENTO E PROCESSAMENTO
// ==========================================
function carregarCSV() {
    Papa.parse("historico_bruto.csv", {
        download: true,
        header: true,
        skipEmptyLines: true,
        complete: function(results) {
            dadosBrutos = results.data;
            processarTimesDesconhecidos(dadosBrutos);
            popularFiltrosGlobais();
            processarDadosGlobais();
        }
    });
}

function processarTimesDesconhecidos(dados) {
    let regAlvo = _REGIAO === "ALL" ? "ALL" : _REGIAO;
    if (!CONFIGURACAO_MANUAL_TIMES[regAlvo]["TIER ?"]) {
        CONFIGURACAO_MANUAL_TIMES[regAlvo]["TIER ?"] = [];
    }

    const mapaTimesDesconhecidos = new Map();
    let unkCounter = 1;

    let partidasMap = {};
    dados.forEach(r => {
        if(!partidasMap[r.id_partida]) partidasMap[r.id_partida] = { tagsA: [], tagsB: [], timeAId: null, timeBId: null };
        if(partidasMap[r.id_partida].tagsA.length < 3 && (partidasMap[r.id_partida].timeAId === null || partidasMap[r.id_partida].timeAId === r.id_time)) {
            partidasMap[r.id_partida].tagsA.push(r.player_tag);
            partidasMap[r.id_partida].timeAId = r.id_time;
        } else {
            partidasMap[r.id_partida].tagsB.push(r.player_tag);
            partidasMap[r.id_partida].timeBId = r.id_time;
        }
    });

    dados.forEach(linha => {
        let isKnown = encontrarTimePorRoster([linha.player_tag]);

        if (!isKnown && linha.id_players && linha.name_players && linha.player_tag) {
            const idsPlayers = linha.id_players.split(';');
            const namesPlayers = linha.name_players.split(';');
            const pIndex = idsPlayers.indexOf(linha.player_tag);
            
            if (pIndex !== -1) {
                const startIndex = pIndex < 3 ? 0 : 3;
                const timeTags = idsPlayers.slice(startIndex, startIndex + 3);
                const timeNames = namesPlayers.slice(startIndex, startIndex + 3);
                
                if (timeTags.length === 3 && !timeTags.includes("None") && !timeTags.includes("")) {
                    let timeRegistrado = encontrarTimePorRoster(timeTags);
                    
                    if (timeRegistrado) {
                        linha.id_time = timeRegistrado.id;
                        linha.nome_time = timeRegistrado.nome;
                    } else {
                        let partidaTags = partidasMap[linha.id_partida];
                        let oponentesTags = (startIndex < 3) ? partidaTags.tagsB : partidaTags.tagsA;
                        let oponenteTime = encontrarTimePorRoster(oponentesTags);
                        
                        // Vincula o time desconhecido se o oponente for da região atual (ou se a região for ALL)
                        if (oponenteTime && (_REGIAO === "ALL" || oponenteTime.regiao === _REGIAO)) {
                            const assinaturaTime = timeTags.slice().sort().join('_');
                            
                            if (!mapaTimesDesconhecidos.has(assinaturaTime)) {
                                const novoId = `UNK${unkCounter}`;
                                const novoNome = `Unknow ${unkCounter}`;
                                mapaTimesDesconhecidos.set(assinaturaTime, { id: novoId, nome: novoNome });
                                
                                CONFIGURACAO_MANUAL_TIMES[regAlvo]["TIER ?"].push({
                                    id_time: novoId,
                                    nome_time: novoNome,
                                    jogadores: [
                                        { nick: timeNames[0], tag: timeTags[0] },
                                        { nick: timeNames[1], tag: timeTags[1] },
                                        { nick: timeNames[2], tag: timeTags[2] }
                                    ]
                                });
                                unkCounter++;
                            }
                            
                            const timeGerado = mapaTimesDesconhecidos.get(assinaturaTime);
                            linha.id_time = timeGerado.id;
                            linha.nome_time = timeGerado.nome;
                        }
                    }
                }
            }
        }
    });
}

function popularFiltrosGlobais() {
    let anos = new Set(), meses = new Set(), dias = new Set();
    dadosBrutos.forEach(row => {
        if(row.data_adicao) {
            let partes = row.data_adicao.split(' ')[0].split('/');
            if(partes.length === 3) {
                dias.add(partes[0]);
                meses.add(partes[1]);
                anos.add(partes[2]);
            }
        }
    });

    const selectAno = document.getElementById('select-ano');
    const selectMes = document.getElementById('select-mes');
    const selectDia = document.getElementById('select-dia');
    
    selectAno.innerHTML = '<option value="todos">Todos os Anos</option>';
    selectMes.innerHTML = '<option value="todos">Todos os Meses</option>';
    selectDia.innerHTML = '<option value="todos">Todos os Dias</option>';

    Array.from(anos).sort().forEach(a => selectAno.innerHTML += `<option value="${a}">${a}</option>`);
    Array.from(meses).sort().forEach(m => selectMes.innerHTML += `<option value="${m}">${m}</option>`);
    Array.from(dias).sort().forEach(d => selectDia.innerHTML += `<option value="${d}">${d}</option>`);
}

function processarDadosGlobais() {
    const ano = document.getElementById('select-ano').value;
    const mes = document.getElementById('select-mes').value;
    const dia = document.getElementById('select-dia').value;
    const tipo = document.getElementById('select-tipo').value;

    let dadosPeriodo = dadosBrutos.filter(row => {
        let matchAno = true, matchMes = true, matchDia = true, matchTipo = true;
        if(row.data_adicao) {
            let partes = row.data_adicao.split(' ')[0].split('/');
            if(ano !== 'todos') matchAno = partes[2] === ano;
            if(mes !== 'todos') matchMes = partes[1] === mes;
            if(dia !== 'todos') matchDia = partes[0] === dia;
        }
        if(tipo !== 'todos') matchTipo = (row.tipo === tipo);
        
        return matchAno && matchMes && matchDia && matchTipo;
    });

    // Agora filtra pela Região Dinâmica 
    dadosFiltrados = dadosPeriodo.filter(row => isTimeDaRegiaoAtual(row.id_time));

    renderizarMeta();
    renderizarSidebarBrawlers();
    if(brawlerSelecionado) renderizarDetalhesBrawler(brawlerSelecionado);
    renderizarSidebarTimes();
    if(timeSelecionado) renderizarDetalhesTime(timeSelecionado);
    
    processarScrimes(dadosPeriodo);
}

// ==========================================
// 3. TELA META 
// ==========================================
window.toggleModoMeta = function(idModo) {
    const content = document.getElementById(`modo-content-${idModo}`);
    if(content.style.display === 'none' || !content.style.display) {
        content.style.display = 'block';
    } else {
        content.style.display = 'none';
    }
}

function renderizarMeta() {
    const container = document.getElementById('conteudo-meta');
    let statsMap = {};
    let statsAll = {};

    dadosFiltrados.forEach(row => {
        let b = row.pick.toUpperCase();
        let map = row.mapa || "Desconhecido";
        let mode = row.modo || "Desconhecido";
        
        if(!statsAll[b]) statsAll[b] = { picks: 0, wins: 0 };
        statsAll[b].picks++;
        if(parseInt(row.win) === 1) statsAll[b].wins++;
        
        if(!statsMap[mode]) statsMap[mode] = {};
        if(!statsMap[mode][map]) statsMap[mode][map] = {};
        if(!statsMap[mode][map][b]) statsMap[mode][map][b] = { picks: 0, wins: 0 };
        
        statsMap[mode][map][b].picks++;
        if(parseInt(row.win) === 1) statsMap[mode][map][b].wins++;
    });

    let html = ``;

    Object.entries(statsMap).forEach(([mode, mapasDict]) => {
        let cleanMode = formatImg(mode);
        html += `
            <div class="modo-card" onclick="toggleModoMeta('${cleanMode}')">
                <img src="element/modes/${cleanMode}.png" style="width:40px; margin-right:15px;" onerror="this.src='element/modes/default.png'"> 
                ${mode}
            </div>
            <div id="modo-content-${cleanMode}" class="modo-section" style="display:none; padding:15px;">
                <div class="mapa-content">
        `;
        
        Object.entries(mapasDict).forEach(([mapa, brawlers]) => {
            let valid = Object.entries(brawlers).filter(x => x[1].picks >= 1).sort((a,b) => b[1].picks - a[1].picks);
            if(valid.length === 0) return;

            html += `
                <div style="background:var(--bg-geral); border:1px solid var(--borda-destaque); border-radius:8px; padding:15px;">
                    <div style="text-align:center; font-weight:bold; margin-bottom:10px; color:var(--texto-secundario);">${mapa.toUpperCase()}</div>
                    <table class="excel-table">
                        <thead><tr><th style="text-align:left;">BRAWLER</th><th>P</th><th>PR%</th><th>W</th><th>WR%</th></tr></thead>
                        <tbody>
                            ${valid.map(([b, s]) => `
                                <tr>
                                    <td style="text-align:left; font-weight:bold; color:var(--accent-hover)">
                                        <img src="brawlers/${formatImg(b)}.png" style="width:24px; vertical-align:middle; margin-right:5px; border-radius:4px;" onerror="this.src='brawlers/default.png'">
                                        ${b}
                                    </td>
                                    <td>${s.picks}</td>
                                    <td style="color:var(--texto-secundario);">${((s.picks/dadosFiltrados.length)*100).toFixed(1)}%</td>
                                    <td>${s.wins}</td>
                                    <td class="winrate-cell">${((s.wins/s.picks)*100).toFixed(1)}%</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            `;
        });
        
        html += `</div></div>`;
    });

    let brawlersAllValidos = Object.entries(statsAll).filter(x => x[1].picks >= 1).sort((a,b) => b[1].picks - a[1].picks);
    if (brawlersAllValidos.length > 0) {
        html += `
            <div class="modo-card" style="margin-top: 40px; border-color:var(--winrate-color); color:var(--winrate-color);" onclick="toggleModoMeta('allmaps')">
                ALL MAPS (GERAL)
            </div>
            <div id="modo-content-allmaps" class="modo-section" style="display:none; padding:15px;">
                <div class="mapa-content" style="display:block;">
                    <table class="excel-table">
                        <thead><tr><th style="text-align:left;">BRAWLER</th><th>P</th><th>W</th><th>WR%</th></tr></thead>
                        <tbody>
                            ${brawlersAllValidos.map(([b, s]) => `
                                <tr>
                                    <td style="text-align:left; font-weight:bold; color:var(--winrate-color)">
                                        <img src="brawlers/${formatImg(b)}.png" style="width:28px; vertical-align:middle; margin-right:10px; border-radius:4px;" onerror="this.src='brawlers/default.png'">
                                        ${b}
                                    </td>
                                    <td>${s.picks}</td>
                                    <td>${s.wins}</td>
                                    <td class="winrate-cell">${((s.wins/s.picks)*100).toFixed(1)}%</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    container.innerHTML = html || `<p style="padding:20px; text-align:center;">Nenhum dado encontrado para os filtros atuais na ${_REGIAO}.</p>`;
}

// ==========================================
// 4. TELA BRAWLERS 
// ==========================================
function renderizarSidebarBrawlers() {
    let pickCounts = {};
    dadosFiltrados.forEach(r => {
        let b = r.pick.toUpperCase();
        pickCounts[b] = (pickCounts[b] || 0) + 1;
    });

    listaBrawlers = Object.keys(pickCounts).filter(b => pickCounts[b] >= 1).sort();
    
    const sidebar = document.getElementById('lista-brawlers-sidebar');
    sidebar.innerHTML = '';
    
    listaBrawlers.forEach(b => {
        let div = document.createElement('div');
        div.className = 'sidebar-item';
        div.innerHTML = `<img src="brawlers/${formatImg(b)}.png" style="width:24px; border-radius:4px;" onerror="this.src='brawlers/default.png'"> <span>${b}</span>`;
        div.onclick = () => {
            document.querySelectorAll('#lista-brawlers-sidebar .sidebar-item').forEach(i => i.classList.remove('active'));
            div.classList.add('active');
            brawlerSelecionado = b;
            renderizarDetalhesBrawler(b);
        };
        sidebar.appendChild(div);
    });
}

function filtrarBrawlersSidebar() {
    const termo = document.getElementById('search-brawler-sidebar').value.toLowerCase();
    const items = document.getElementById('lista-brawlers-sidebar').children;
    Array.from(items).forEach(item => {
        let nome = item.querySelector('span').innerText.toLowerCase();
        item.style.display = nome.includes(termo) ? 'flex' : 'none';
    });
}

function renderizarDetalhesBrawler(brawler) {
    const painel = document.getElementById('painel-info-brawler');
    let partidasDeste = dadosFiltrados.filter(r => r.pick.toUpperCase() === brawler);
    let totalPicks = partidasDeste.length;
    if(totalPicks === 0) return;
    
    let wins = partidasDeste.filter(r => parseInt(r.win) === 1).length;
    let wrGeral = ((wins/totalPicks)*100).toFixed(1) + '%';
    
    let mapasStats = {};
    partidasDeste.forEach(r => {
        let m = r.mapa;
        if(!mapasStats[m]) mapasStats[m] = { picks: 0, wins: 0 };
        mapasStats[m].picks++;
        if(parseInt(r.win) === 1) mapasStats[m].wins++;
    });
    let topMapas = Object.entries(mapasStats).sort((a,b) => b[1].picks - a[1].picks).slice(0,3);

    let statsContra = {};
    let statsSinergia = {};
    let idsPartidas = [...new Set(partidasDeste.map(r => r.id_partida))];
    
    idsPartidas.forEach(id => {
        let todosNaPartida = dadosFiltrados.filter(r => r.id_partida === id);
        let brawlerRows = todosNaPartida.filter(r => r.pick.toUpperCase() === brawler);
        
        brawlerRows.forEach(meRow => {
            let timeDoBrawler = meRow.id_time;
            let ganhou = parseInt(meRow.win) === 1;
            
            todosNaPartida.forEach(p => {
                let pName = p.pick.toUpperCase();
                if(p.id_time !== timeDoBrawler) { 
                    if(!statsContra[pName]) statsContra[pName] = { matches: 0, bwWins: 0, bwLosses: 0 };
                    statsContra[pName].matches++;
                    if(ganhou) statsContra[pName].bwWins++; else statsContra[pName].bwLosses++;
                } else if(p.id_time === timeDoBrawler && pName !== brawler) { 
                    if(!statsSinergia[pName]) statsSinergia[pName] = { matches: 0, bwWins: 0 };
                    statsSinergia[pName].matches++;
                    if(ganhou) statsSinergia[pName].bwWins++;
                }
            });
        });
    });

    let matchups = Object.entries(statsContra).map(([nome, s]) => {
        return { nome, matches: s.matches, wins: s.bwWins, losses: s.bwLosses, wr: (s.bwWins / s.matches) * 100, pr: (s.matches / totalPicks) * 100 };
    }).filter(m => m.matches >= 1); 

    let countersTop = [...matchups].sort((a, b) => b.wr - a.wr).slice(0, 5); 
    let counteradosTop = [...matchups].sort((a, b) => a.wr - b.wr).slice(0, 5); 
    let sinergiasTop = Object.entries(statsSinergia).map(([nome, s]) => {
        return { nome, matches: s.matches, wins: s.bwWins, wr: (s.bwWins / s.matches) * 100, pr: (s.matches / totalPicks) * 100 };
    }).filter(m => m.matches >= 1).sort((a,b) => b.wr - a.wr).slice(0,5);

    let html = `
        <div class="brawler-profile-header">
            <img src="brawlers/${formatImg(brawler)}.png" class="brawler-large-avatar" onerror="this.src='brawlers/default.png'">
            <div>
                <h2 style="font-size:28px;">${brawler}</h2>
                <p style="color:var(--texto-secundario); font-size:14px; font-weight:bold; margin-top:5px;">PICKS: <span style="color:#fff">${totalPicks}</span> | W: <span style="color:#fff">${wins}</span> | WR%: <span class="winrate-cell">${wrGeral}</span></p>
            </div>
        </div>
        
        <h3 style="color:var(--accent-purple); font-size:16px; margin-bottom:15px;">TOP 3 MAPAS (DO BRAWLER)</h3>
        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap:15px; margin-bottom: 30px;">
            ${topMapas.map(([m, s]) => `
                <div style="background:var(--bg-cards); padding:15px; border-radius:8px; border:1px solid var(--borda-destaque); text-align:center;">
                    <div style="font-weight:900; font-size:14px; margin-bottom:8px;">${m}</div>
                    <div style="font-size:13px; color:var(--texto-secundario); display:flex; justify-content:center; gap:10px;">
                        <span>P: <strong style="color:#fff">${s.picks}</strong></span> 
                        <span>PR: <strong style="color:#fff">${((s.picks/totalPicks)*100).toFixed(1)}%</strong></span>
                    </div>
                    <div style="font-size:13px; color:var(--texto-secundario); display:flex; justify-content:center; gap:10px; margin-top:5px;">
                        <span>W: <strong style="color:#fff">${s.wins}</strong></span> 
                        <span>WR: <strong class="winrate-cell">${((s.wins/s.picks)*100).toFixed(1)}%</strong></span>
                    </div>
                </div>
            `).join('')}
        </div>

        <div class="synergy-grid">
            <div class="synergy-box">
                <h3 style="color:var(--winrate-color); margin-bottom:15px; font-size:14px;">BOM CONTRA (Adversários)</h3>
                ${countersTop.map(c => `
                    <div class="synergy-item">
                        <div style="display:flex; align-items:center;">
                            <img src="brawlers/${formatImg(c.nome)}.png" onerror="this.src='brawlers/default.png'">
                            <span style="font-weight:bold; font-size:13px;">${c.nome}</span>
                        </div>
                        <div style="text-align:right; font-size:12px; display:flex; gap:10px; font-weight:bold;">
                            <div style="display:flex; flex-direction:column; color:var(--texto-secundario);"><span>P: ${c.matches}</span><span>PR%: ${c.pr.toFixed(1)}%</span></div>
                            <div style="display:flex; flex-direction:column;"><span>W: <span style="color:#fff">${c.wins}</span></span><span style="color:var(--winrate-color);">WR%: ${c.wr.toFixed(1)}%</span></div>
                        </div>
                    </div>
                `).join('') || '<p style="font-size:12px; color:var(--texto-secundario);">Dados insuficientes</p>'}
            </div>

            <div class="synergy-box">
                <h3 style="color:var(--loss-color); margin-bottom:15px; font-size:14px;">RUIM CONTRA (Adversários)</h3>
                ${counteradosTop.map(c => `
                    <div class="synergy-item">
                        <div style="display:flex; align-items:center;">
                            <img src="brawlers/${formatImg(c.nome)}.png" onerror="this.src='brawlers/default.png'">
                            <span style="font-weight:bold; font-size:13px;">${c.nome}</span>
                        </div>
                        <div style="text-align:right; font-size:12px; display:flex; gap:10px; font-weight:bold;">
                            <div style="display:flex; flex-direction:column; color:var(--texto-secundario);"><span>P: ${c.matches}</span><span>PR%: ${c.pr.toFixed(1)}%</span></div>
                            <div style="display:flex; flex-direction:column;"><span>L: <span style="color:#fff">${c.losses}</span></span><span style="color:var(--loss-color);">WR%: ${c.wr.toFixed(1)}%</span></div>
                        </div>
                    </div>
                `).join('') || '<p style="font-size:12px; color:var(--texto-secundario);">Dados insuficientes</p>'}
            </div>

            <div class="synergy-box" style="grid-column: 1 / -1;">
                <h3 style="color:var(--synergy-color); margin-bottom:15px; font-size:14px;">TOP 5 SINERGIAS (Brawlers Juntos)</h3>
                <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap:15px;">
                ${sinergiasTop.map(c => `
                    <div style="background:var(--bg-paineis); padding:15px; border-radius:8px; text-align:center; border:1px solid var(--borda-suave);">
                        <img src="brawlers/${formatImg(c.nome)}.png" style="width:40px; height:40px; border-radius:6px; margin-bottom:8px; object-fit:cover;" onerror="this.src='brawlers/default.png'">
                        <div style="font-weight:900; font-size:14px; margin-bottom:5px;">${c.nome}</div>
                        <div style="font-size:12px; color:var(--texto-secundario); font-weight:bold;">P: ${c.matches} | PR%: ${c.pr.toFixed(1)}%</div>
                        <div style="font-size:12px; color:var(--texto-secundario); font-weight:bold; margin-top:2px;">W: <span style="color:#fff">${c.wins}</span> | <span style="color:var(--winrate-color)">WR%: ${c.wr.toFixed(1)}%</span></div>
                    </div>
                `).join('') || '<p style="font-size:12px; color:var(--texto-secundario);">Dados insuficientes</p>'}
                </div>
            </div>
        </div>
    `;
    painel.innerHTML = html;
}

// ==========================================
// 5. TELA TIMES
// ==========================================
function renderizarSidebarTimes() {
    const sidebar = document.getElementById('lista-times-sidebar');
    sidebar.innerHTML = '';
    
    let timesRegiao = {};
    
    // Se a região for "ALL", junta os times de todas as regiões configuradas
    if (_REGIAO === "ALL") {
        for (let r in CONFIGURACAO_MANUAL_TIMES) {
            for (let tier in CONFIGURACAO_MANUAL_TIMES[r]) {
                if (!timesRegiao[tier]) timesRegiao[tier] = [];
                
                CONFIGURACAO_MANUAL_TIMES[r][tier].forEach(t => {
                    // Evita exibir times duplicados se houver conflito de IDs
                    if (!timesRegiao[tier].find(existente => existente.id_time === t.id_time)) {
                        timesRegiao[tier].push(t);
                    }
                });
            }
        }
    } else {
        timesRegiao = CONFIGURACAO_MANUAL_TIMES[_REGIAO];
    }

    if(!timesRegiao) return;

    for(let tier in timesRegiao) {
        if(timesRegiao[tier].length === 0) continue;
        
        let tierHeader = document.createElement('div');
        tierHeader.className = 'sidebar-header';
        tierHeader.innerText = tier;
        sidebar.appendChild(tierHeader);

        timesRegiao[tier].forEach(t => {
            let div = document.createElement('div');
            div.className = 'sidebar-item';
            div.innerHTML = `<img src="element/teams/${t.id_time.toLowerCase()}.png" style="width:24px; height:24px; object-fit:contain; border-radius:4px;" onerror="this.src='element/teams/default.png'"> <span style="font-weight:bold;">${t.nome_time}</span>`;
            div.onclick = () => {
                document.querySelectorAll('#lista-times-sidebar .sidebar-item').forEach(i => i.classList.remove('active'));
                div.classList.add('active');
                timeSelecionado = t;
                renderizarDetalhesTime(t);
            };
            sidebar.appendChild(div);
        });
    }
}

window.registrarTimeCustom = function(oldId) {
    const newId = document.getElementById('custom-id').value.toUpperCase();
    const newName = document.getElementById('custom-name').value;
    let regAlvo = _REGIAO === "ALL" ? "ALL" : _REGIAO;
    
    let timeObj = null;
    CONFIGURACAO_MANUAL_TIMES[regAlvo]["TIER ?"] = CONFIGURACAO_MANUAL_TIMES[regAlvo]["TIER ?"].filter(t => {
        if(t.id_time === oldId) {
            timeObj = t;
            return false;
        }
        return true;
    });

    if(timeObj) {
        timeObj.id_time = newId;
        timeObj.nome_time = newName;
        
        timeObj.jogadores[0].nick = document.getElementById('nick-0').value;
        timeObj.jogadores[1].nick = document.getElementById('nick-1').value;
        timeObj.jogadores[2].nick = document.getElementById('nick-2').value;

        if(!CONFIGURACAO_MANUAL_TIMES[regAlvo]["TIMES REGISTRADOS"]) CONFIGURACAO_MANUAL_TIMES[regAlvo]["TIMES REGISTRADOS"] = [];
        CONFIGURACAO_MANUAL_TIMES[regAlvo]["TIMES REGISTRADOS"].push(timeObj);
        
        let salvos = JSON.parse(localStorage.getItem('customTeams_' + _REGIAO)) || [];
        salvos.push(timeObj);
        localStorage.setItem('customTeams_' + _REGIAO, JSON.stringify(salvos));
        
        dadosBrutos.forEach(r => {
            if(r.id_time === oldId) {
                r.id_time = newId;
                r.nome_time = newName;
            }
        });
        
        alert("Time Registrado com Sucesso!");
        processarDadosGlobais();
    }
};

function renderizarDetalhesTime(time) {
    const painel = document.getElementById('painel-info-time');
    let partidasDoTime = dadosFiltrados.filter(r => r.id_time === time.id_time);
    let logoUrl = `element/teams/${time.id_time.toLowerCase()}.png`;
    let isUnknow = time.id_time.startsWith("UNK");

    if (isUnknow) {
        painel.innerHTML = `
            <div style="background:var(--bg-cards); padding:30px; border-radius:12px; border:2px dashed var(--accent-purple);">
                <h2 style="color:var(--accent-hover); margin-bottom:20px;">Registrar Equipe Desconhecida</h2>
                
                <div class="form-group"><label>SIGLA DO TIME (ID)</label><input type="text" id="custom-id" value="${time.id_time}"></div>
                <div class="form-group"><label>NOME COMPLETO</label><input type="text" id="custom-name" value="${time.nome_time}"></div>
                
                <h4 style="margin:20px 0 10px; color:#fff;">Roster Detectado:</h4>
                <div style="display:flex; gap:10px; margin-bottom:25px;">
                    ${time.jogadores.map((j, idx) => `
                        <div style="flex:1; background:var(--bg-paineis); padding:10px; border-radius:6px; border:1px solid var(--borda-suave);">
                            <label style="font-size:11px; color:var(--texto-secundario); display:block; margin-bottom:5px;">${j.tag}</label>
                            <input type="text" id="nick-${idx}" value="${j.nick}" style="width:100%; background:transparent; border:none; border-bottom:1px solid var(--borda-destaque); color:#fff; font-weight:bold; outline:none;">
                        </div>
                    `).join('')}
                </div>
                <button class="btn-register" onclick="registrarTimeCustom('${time.id_time}')">SALVAR E REGISTRAR TIME</button>
            </div>
        `;
        return;
    }

    let timeBrawlers = {};
    partidasDoTime.forEach(r => {
        let b = r.pick.toUpperCase();
        if(!timeBrawlers[b]) timeBrawlers[b] = 0;
        timeBrawlers[b]++;
    });
    let top10Time = Object.entries(timeBrawlers).sort((a,b) => b[1] - a[1]).slice(0, 10);

    let html = `
        <div style="display:flex; align-items:center; gap:20px; margin-bottom:30px; border-bottom:1px solid var(--borda-destaque); padding-bottom:20px;">
            <img src="${logoUrl}" style="width:80px; height:80px; object-fit:contain; background:var(--bg-cards); border-radius:12px; border:2px solid var(--borda-destaque);" onerror="this.src='element/teams/default.png'">
            <h2 style="color: var(--accent-purple); font-size: 32px; font-weight:900;">${time.nome_time} <span style="font-size:14px; color:var(--texto-secundario)">(${time.id_time})</span></h2>
        </div>

        <div style="background:var(--bg-cards); padding:20px; border-radius:12px; border:1px solid var(--borda-destaque); margin-bottom:30px;">
            <h3 style="color:var(--texto); margin-bottom:15px; font-size:16px;">TOP 10 BRAWLERS DA EQUIPE</h3>
            <div style="display:flex; flex-wrap:wrap; gap:10px;">
                ${top10Time.length > 0 ? top10Time.map(([b, qtd]) => `
                    <div style="background:var(--bg-paineis); padding:8px 12px; border-radius:6px; border:1px solid var(--borda-suave); display:flex; align-items:center; gap:10px;">
                        <img src="brawlers/${formatImg(b)}.png" style="width:24px; border-radius:4px;" onerror="this.src='brawlers/default.png'">
                        <span style="font-weight:bold; font-size:13px;">${b}</span>
                        <span style="color:var(--texto-secundario); font-size:12px; font-weight:bold;">(${qtd})</span>
                    </div>
                `).join('') : '<span style="color:var(--texto-secundario); font-size:13px;">Sem dados suficientes no filtro.</span>'}
            </div>
        </div>

        <h3 style="color:var(--texto); margin-bottom:15px; font-size:16px;">JOGADORES (ROSTER OFICIAL)</h3>
        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
    `;

    time.jogadores.forEach(jogador => {
        let partidasJogador = partidasDoTime.filter(r => r.player_tag === jogador.tag);
        let picksTotal = partidasJogador.length;
        
        let brawlersJogador = {};
        partidasJogador.forEach(r => {
            let b = r.pick.toUpperCase();
            if(!brawlersJogador[b]) brawlersJogador[b] = 0;
            brawlersJogador[b]++;
        });
        
        let top5Brawlers = Object.entries(brawlersJogador).sort((a,b) => b[1] - a[1]).slice(0, 5);

        html += `
            <div style="background: var(--bg-cards); padding: 20px; border-radius: 12px; border: 1px solid var(--borda-destaque);">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:5px;">
                    <h4 style="color:var(--accent-purple); font-size:18px;">${jogador.nick}</h4>
                    <span style="font-size:10px; background:#000; padding:3px 6px; border-radius:4px; color:var(--texto-secundario);">${jogador.tag}</span>
                </div>
                <p style="color: var(--texto-secundario); font-size: 12px; margin-bottom: 20px; font-weight:bold;">Total de Picks: ${picksTotal}</p>
                <div style="display:flex; flex-direction:column; gap:8px;">
                    ${top5Brawlers.length > 0 ? top5Brawlers.map(([b, qtd], idx) => `
                        <div style="display:flex; justify-content:space-between; align-items:center; background:var(--bg-paineis); padding:8px 12px; border-radius:6px; border:1px solid var(--borda-suave);">
                            <div style="display:flex; align-items:center; gap:10px;">
                                <span style="font-weight:900; color:var(--texto-secundario); font-size:11px;">#${idx+1}</span>
                                <img src="brawlers/${formatImg(b)}.png" style="width:24px; border-radius:4px;" onerror="this.src='brawlers/default.png'">
                                <span style="font-size:13px; font-weight:bold;">${b}</span>
                            </div>
                            <span style="font-size:12px; color:var(--texto-secundario); font-weight:bold;">${qtd}</span>
                        </div>
                    `).join('') : '<span style="color:var(--texto-secundario); font-size:12px;">Sem picks no filtro.</span>'}
                </div>
            </div>
        `;
    });

    html += `</div>`;
    painel.innerHTML = html;
}

// ==========================================
// 6. TELA SCRIMS
// ==========================================
function processarScrimes(dadosPeriodo) {
    let rawMatches = {};
    dadosPeriodo.forEach(r => {
        if(!rawMatches[r.id_partida]) rawMatches[r.id_partida] = [];
        rawMatches[r.id_partida].push(r);
    });

    let partidasEstruturadas = [];
    Object.values(rawMatches).forEach(linhas => {
        if(linhas.length < 6) return; 
        let t0 = linhas.slice(0, 3);
        let t1 = linhas.slice(3, 6);
        
        let t0Id = t0[0].id_time;
        let t1Id = t1[0].id_time;

        let t0EhRegiao = isTimeDaRegiaoAtual(t0Id);
        let t1EhRegiao = isTimeDaRegiaoAtual(t1Id);

        if (!t0EhRegiao && !t1EhRegiao) return;

        if ((t0EhRegiao && !t1EhRegiao) || (!t0EhRegiao && t1EhRegiao)) {
            let oponenteId = t0EhRegiao ? t1Id : t0Id;
            let oponenteExiste = false;
            for (let reg in CONFIGURACAO_MANUAL_TIMES) {
                for (let tier in CONFIGURACAO_MANUAL_TIMES[reg]) {
                    if (CONFIGURACAO_MANUAL_TIMES[reg][tier].find(t => t.id_time === oponenteId)) {
                        oponenteExiste = true;
                        break;
                    }
                }
                if (oponenteExiste) break;
            }
            if (!oponenteExiste) return; 
        }

        let dataStr = linhas[0].data_adicao; 
        let timestamp = parseDateBR(dataStr);
        let vencedor = parseInt(t0[0].win) === 1 ? t0Id : t1Id;

        partidasEstruturadas.push({
            id: linhas[0].id_partida,
            modo: linhas[0].modo,
            mapa: linhas[0].mapa,
            tAId: t0Id,
            tBId: t1Id,
            tANome: t0[0].nome_time,
            tBNome: t1[0].nome_time,
            picksA: t0.map(p => p.pick.toUpperCase()),
            picksB: t1.map(p => p.pick.toUpperCase()),
            t0Full: t0,
            t1Full: t1,
            vencedor: vencedor,
            timestamp: timestamp,
            dataFormatada: dataStr
        });
    });

    let scrims = [];
    partidasEstruturadas.sort((a,b) => a.timestamp - b.timestamp);

    partidasEstruturadas.forEach(partida => {
        let chaveTimes = [partida.tAId, partida.tBId].sort().join(' VS ');
        let scrimExistente = scrims.find(s => s.chave === chaveTimes && (partida.timestamp - s.ultimoUpdate) <= (2 * 60 * 60 * 1000));

        if(scrimExistente) {
            scrimExistente.rounds.push(partida);
            scrimExistente.ultimoUpdate = partida.timestamp;
            if(partida.vencedor === partida.tAId) scrimExistente.scoreA++;
            if(partida.vencedor === partida.tBId) scrimExistente.scoreB++;
        } else {
            scrims.push({
                chave: chaveTimes,
                tAId: partida.tAId,
                tBId: partida.tBId,
                tANome: partida.tANome,
                tBNome: partida.tBNome,
                scoreA: partida.vencedor === partida.tAId ? 1 : 0,
                scoreB: partida.vencedor === partida.tBId ? 1 : 0,
                inicio: partida.timestamp,
                ultimoUpdate: partida.timestamp,
                dataFormatada: partida.dataFormatada.split(' ')[0], 
                rounds: [partida]
            });
        }
    });

    // ----------------------------------------------------------------------
    // FILTRO ADICIONADO: Não mostrar partidas que acabem com apenas 1 round (1 set)
    // ----------------------------------------------------------------------
    scrims = scrims.filter(s => s.rounds.length > 1);

    renderizarListaScrims(scrims.reverse()); 
}

function renderizarListaScrims(scrims) {
    const lista = document.getElementById('scrims-lista');
    const detalhe = document.getElementById('scrims-detalhe');
    lista.style.display = 'grid';
    detalhe.style.display = 'none';
    lista.innerHTML = '';

    if(scrims.length === 0) {
        lista.innerHTML = `<p style="padding:20px; color:var(--texto-secundario); font-weight:bold; grid-column:1/-1; text-align:center;">Nenhuma scrim da ${_REGIAO} encontrada no filtro atual.</p>`;
        return;
    }

    scrims.forEach((scrim) => {
        let div = document.createElement('div');
        div.className = 'scrim-card';
        div.innerHTML = `
            <div class="scrim-team-info">
                <img src="element/teams/${scrim.tAId.toLowerCase()}.png" class="scrim-team-logo" onerror="this.src='element/teams/default.png'">
                <span style="font-weight:900; font-size:14px;">${scrim.tANome}</span>
            </div>
            <div class="scrim-score">${scrim.scoreA} - ${scrim.scoreB}</div>
            <div class="scrim-team-info" style="flex-direction: row-reverse;">
                <img src="element/teams/${scrim.tBId.toLowerCase()}.png" class="scrim-team-logo" onerror="this.src='element/teams/default.png'">
                <span style="font-weight:900; font-size:14px;">${scrim.tBNome}</span>
            </div>
            <div style="position:absolute; bottom:8px; left:15px; font-size:11px; color:var(--texto-secundario); font-weight:bold;">${scrim.dataFormatada}</div>
            <div style="position:absolute; bottom:8px; right:15px; font-size:11px; color:var(--texto-secundario); font-weight:bold;">Rounds: ${scrim.rounds.length}</div>
        `;
        div.onclick = () => renderizarDetalheScrim(scrim);
        lista.appendChild(div);
    });
}

function renderizarDetalheScrim(scrim) {
    const lista = document.getElementById('scrims-lista');
    const detalhe = document.getElementById('scrims-detalhe');
    lista.style.display = 'none';
    detalhe.style.display = 'block';

    let playersA = [...new Set(scrim.rounds.flatMap(r => r.t0Full.map(p => p.player_name)))].slice(0,3);
    let playersB = [...new Set(scrim.rounds.flatMap(r => r.t1Full.map(p => p.player_name)))].slice(0,3);

    let html = `
        <button onclick="document.getElementById('scrims-lista').style.display='grid'; document.getElementById('scrims-detalhe').style.display='none';" 
                style="background: transparent; border: 2px solid var(--accent-purple); color: var(--accent-purple); padding: 8px 20px; font-weight:bold; border-radius: 6px; cursor:pointer; margin-bottom: 30px;">
            ← VOLTAR
        </button>

        <div class="scrim-detail-header">
            <div style="display: flex; justify-content: center; align-items: flex-start; gap: 40px;">
                <div style="text-align:center;">
                    <img src="element/teams/${scrim.tAId.toLowerCase()}.png" style="height:80px; object-fit:contain; background:var(--bg-cards); border-radius:8px; border:2px solid var(--borda-destaque);" onerror="this.src='element/teams/default.png'">
                    <div style="font-size:11px; color:var(--texto-secundario); display:flex; gap:8px; justify-content:center; margin-top:8px; font-weight:bold;">
                        ${playersA.map(p => `<span>${p}</span>`).join('')}
                    </div>
                </div>
                
                <div style="font-size: 42px; font-weight: 900; color: #fff; line-height:80px;">${scrim.scoreA} <span style="color:var(--accent-purple)">-</span> ${scrim.scoreB}</div>
                
                <div style="text-align:center;">
                    <img src="element/teams/${scrim.tBId.toLowerCase()}.png" style="height:80px; object-fit:contain; background:var(--bg-cards); border-radius:8px; border:2px solid var(--borda-destaque);" onerror="this.src='element/teams/default.png'">
                    <div style="font-size:11px; color:var(--texto-secundario); display:flex; gap:8px; justify-content:center; margin-top:8px; font-weight:bold;">
                        ${playersB.map(p => `<span>${p}</span>`).join('')}
                    </div>
                </div>
            </div>
        </div>

        <div class="scrim-rounds-container" id="rounds-scroll">
            ${scrim.rounds.map((r, i) => `
                <div class="scrim-round-btn ${i === 0 ? 'active' : ''}" onclick="selecionarRound(${i}, this)">
                    <span style="font-size:11px; font-weight:900; color:var(--accent-purple); display:block; margin-bottom:5px;">SET ${i+1}</span>
                    <img src="element/modes/${formatImg(r.modo)}.png" onerror="this.src='element/modes/default.png'">
                </div>
            `).join('')}
        </div>

        <div id="round-view-container"></div>
    `;

    detalhe.innerHTML = html;
    window.scrimAtual = scrim;
    selecionarRound(0, detalhe.querySelector('.scrim-round-btn'));
}

window.selecionarRound = function(index, btnElement) {
    document.querySelectorAll('.scrim-round-btn').forEach(b => b.classList.remove('active'));
    if(btnElement) btnElement.classList.add('active');

    let round = window.scrimAtual.rounds[index];
    const container = document.getElementById('round-view-container');
    
    let playersA = round.t0Full.map(p => p.player_name);
    let playersB = round.t1Full.map(p => p.player_name);

    container.innerHTML = `
        <div class="round-details-view">
            <div style="text-align:center;">
                <p style="font-size:12px; color:var(--texto-secundario); font-weight:bold;">${round.dataFormatada.split(' ')[1]} | ${round.modo.toUpperCase()}</p>
            </div>
            
            <div class="player-names-scrim" style="justify-content: space-around;">
                <div style="display:flex; gap:35px;">${playersA.map(p => `<span>${p}</span>`).join('')}</div>
                <div style="display:flex; gap:35px;">${playersB.map(p => `<span>${p}</span>`).join('')}</div>
            </div>

            <div class="scrim-picks-container">
                <div class="team-picks-scrim" style="flex-direction:row; justify-content:flex-end;">
                    ${round.picksA.map(pick => `
                        <div class="pick-row">
                            <img src="brawlers/${formatImg(pick)}.png" onerror="this.src='brawlers/default.png'">
                        </div>
                    `).join('')}
                </div>

                <div class="map-middle-scrim">
                    <img src="element/maps/${formatImg(round.mapa)}.png" onerror="this.src='element/maps/default.png'">
                    <p style="font-size:12px; font-weight:900; margin-top:8px;">${round.mapa}</p>
                </div>

                <div class="team-picks-scrim" style="flex-direction:row; justify-content:flex-start;">
                    ${round.picksB.map(pick => `
                        <div class="pick-row">
                            <img src="brawlers/${formatImg(pick)}.png" onerror="this.src='brawlers/default.png'">
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
};
