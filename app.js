let dadosBrutos = [];
let dadosFiltrados = [];
let listaBrawlers = [];
let brawlerSelecionado = null;
let timeSelecionado = null;

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

document.addEventListener("DOMContentLoaded", () => {
    carregarCSV();
});

// ==========================================
// 1. CARREGAMENTO E PROCESSAMENTO DO CSV
// ==========================================
function carregarCSV() {
    Papa.parse("historico_bruto_2.csv", {
        download: true,
        header: true,
        skipEmptyLines: true,
        complete: function(results) {
            dadosBrutos = results.data;
            popularFiltrosGlobais();
            processarDadosGlobais();
        }
    });
}

function popularFiltrosGlobais() {
    let anos = new Set();
    let meses = new Set();
    
    dadosBrutos.forEach(row => {
        if(row.data_adicao) {
            let partes = row.data_adicao.split(' ')[0].split('/');
            if(partes.length === 3) {
                meses.add(partes[1]);
                anos.add(partes[2]);
            }
        }
    });

    const selectAno = document.getElementById('select-ano');
    const selectMes = document.getElementById('select-mes');
    
    selectAno.innerHTML = '<option value="todos">Todos os Anos</option>';
    selectMes.innerHTML = '<option value="todos">Todos os Meses</option>';

    Array.from(anos).sort().forEach(a => selectAno.innerHTML += `<option value="${a}">${a}</option>`);
    Array.from(meses).sort().forEach(m => selectMes.innerHTML += `<option value="${m}">${m}</option>`);
}

function processarDadosGlobais() {
    const ano = document.getElementById('select-ano').value;
    const mes = document.getElementById('select-mes').value;
    const tipo = document.getElementById('select-tipo').value;

    dadosFiltrados = dadosBrutos.filter(row => {
        let matchAno = true, matchMes = true, matchTipo = true;
        if(row.data_adicao) {
            let partes = row.data_adicao.split(' ')[0].split('/');
            if(ano !== 'todos') matchAno = partes[2] === ano;
            if(mes !== 'todos') matchMes = partes[1] === mes;
        }
        if(tipo !== 'todos') matchTipo = (row.tipo === tipo);
        return matchAno && matchMes && matchTipo;
    });

    renderizarMeta();
    renderizarSidebarBrawlers();
    if(brawlerSelecionado) renderizarDetalhesBrawler(brawlerSelecionado);
    renderizarSidebarTimes();
    if(timeSelecionado) renderizarDetalhesTime(timeSelecionado);
    processarScrimes();
}

// ==========================================
// 2. TELA META (REGRA: 5 PICKS OU MAIS)
// ==========================================
function renderizarMeta() {
    const container = document.getElementById('conteudo-meta');
    let stats = {};

    dadosFiltrados.forEach(row => {
        let b = row.pick.toUpperCase();
        if(!stats[b]) stats[b] = { picks: 0, wins: 0 };
        stats[b].picks++;
        if(parseInt(row.win) === 1) stats[b].wins++;
    });

    let brawlersValidos = Object.entries(stats)
        .filter(([nome, s]) => s.picks >= 5)
        .sort((a, b) => b[1].picks - a[1].picks);

    let html = `
        <table class="excel-table">
            <thead>
                <tr>
                    <th style="text-align: left;">BRAWLER</th>
                    <th>PICKS</th>
                    <th>VITÓRIAS</th>
                    <th>WIN RATE</th>
                </tr>
            </thead>
            <tbody>
    `;

    brawlersValidos.forEach(([nome, s]) => {
        let wr = ((s.wins / s.picks) * 100).toFixed(1) + '%';
        html += `
            <tr>
                <td style="text-align: left; font-weight:bold; color:var(--accent-hover)">
                    <img src="element/brawlers/${nome.toLowerCase()}.png" style="width:24px; vertical-align:middle; margin-right:8px;" onerror="this.src='element/brawlers/default.png'">
                    ${nome}
                </td>
                <td>${s.picks}</td>
                <td>${s.wins}</td>
                <td class="winrate-cell">${wr}</td>
            </tr>
        `;
    });

    html += `</tbody></table>`;
    container.innerHTML = brawlersValidos.length ? html : '<p style="padding:20px;">Nenhum dado encontrado para os filtros atuais.</p>';
}

// ==========================================
// 3. TELA BRAWLERS (COUNTERS E COUNTERADOS)
// ==========================================
function renderizarSidebarBrawlers() {
    let brawlersUnicos = [...new Set(dadosFiltrados.map(r => r.pick.toUpperCase()))].sort();
    listaBrawlers = brawlersUnicos;
    
    const sidebar = document.getElementById('lista-brawlers-sidebar');
    sidebar.innerHTML = '';
    brawlersUnicos.forEach(b => {
        let div = document.createElement('div');
        div.className = 'sidebar-item';
        div.style.padding = '10px';
        div.style.cursor = 'pointer';
        div.innerText = b;
        div.onclick = () => {
            document.querySelectorAll('.sidebar-item').forEach(i => i.classList.remove('active'));
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
        item.style.display = item.innerText.toLowerCase().includes(termo) ? 'block' : 'none';
    });
}

function renderizarDetalhesBrawler(brawler) {
    const painel = document.getElementById('painel-info-brawler');
    
    let partidasDeste = dadosFiltrados.filter(r => r.pick.toUpperCase() === brawler);
    let idsPartidas = [...new Set(partidasDeste.map(r => r.id_partida))];
    
    let statsContra = {};
    
    idsPartidas.forEach(id => {
        let todosNaPartida = dadosFiltrados.filter(r => r.id_partida === id);
        let timeDoBrawler = todosNaPartida.find(r => r.pick.toUpperCase() === brawler).id_time;
        let oponentes = todosNaPartida.filter(r => r.id_time !== timeDoBrawler);
        let brawlerGanhou = parseInt(todosNaPartida.find(r => r.pick.toUpperCase() === brawler).win) === 1;

        oponentes.forEach(op => {
            let opNome = op.pick.toUpperCase();
            if(!statsContra[opNome]) statsContra[opNome] = { matches: 0, brawlerWins: 0 };
            statsContra[opNome].matches++;
            if(brawlerGanhou) statsContra[opNome].brawlerWins++;
        });
    });

    let matchups = Object.entries(statsContra).map(([opNome, s]) => {
        return { nome: opNome, matches: s.matches, wr: (s.brawlerWins / s.matches) * 100 };
    }).filter(m => m.matches >= 3);

    let countersTop = [...matchups].sort((a, b) => b.wr - a.wr).slice(0, 5);
    let counteradosTop = [...matchups].sort((a, b) => a.wr - b.wr).slice(0, 5);

    let htmlSinergia = `
        <div class="brawler-profile-header">
            <img src="element/brawlers/${brawler.toLowerCase()}.png" class="brawler-large-avatar" onerror="this.src='element/brawlers/default.png'">
            <h2>${brawler}</h2>
        </div>
        <div class="synergy-grid">
            <div class="synergy-box">
                <h3 style="color:#00ff66; margin-bottom:15px;">É BOM CONTRA (COUNTERA)</h3>
                ${countersTop.map(c => `
                    <div class="synergy-item">
                        <span><img src="element/brawlers/${c.nome.toLowerCase()}.png" onerror="this.src='element/brawlers/default.png'"> ${c.nome}</span>
                        <span style="color:var(--texto-secundario)">WR: ${c.wr.toFixed(1)}%</span>
                    </div>
                `).join('') || '<p>Dados insuficientes</p>'}
            </div>
            <div class="synergy-box">
                <h3 style="color:#ff3333; margin-bottom:15px;">RUIM CONTRA (COUNTERS)</h3>
                ${counteradosTop.map(c => `
                    <div class="synergy-item">
                        <span><img src="element/brawlers/${c.nome.toLowerCase()}.png" onerror="this.src='element/brawlers/default.png'"> ${c.nome}</span>
                        <span style="color:var(--texto-secundario)">WR: ${(100 - c.wr).toFixed(1)}%</span>
                    </div>
                `).join('') || '<p>Dados insuficientes</p>'}
            </div>
        </div>
    `;

    painel.innerHTML = htmlSinergia;
}

// ==========================================
// 4. TELA TIMES
// ==========================================
function renderizarSidebarTimes() {
    const sidebar = document.getElementById('lista-times-sidebar');
    sidebar.innerHTML = '';
    
    let timesJogaram = [...new Set(dadosFiltrados.map(r => r.nome_time))].sort();

    timesJogaram.forEach(t => {
        if(t === "DESCONHECIDO T0" || t === "DESCONHECIDO T1") return;
        let div = document.createElement('div');
        div.className = 'sidebar-item';
        div.style.padding = '10px';
        div.style.cursor = 'pointer';
        div.innerText = t;
        div.onclick = () => {
            document.querySelectorAll('#lista-times-sidebar .sidebar-item').forEach(i => i.classList.remove('active'));
            div.classList.add('active');
            timeSelecionado = t;
            renderizarDetalhesTime(t);
        };
        sidebar.appendChild(div);
    });
}

function renderizarDetalhesTime(time) {
    const painel = document.getElementById('painel-info-time');
    let partidasDoTime = dadosFiltrados.filter(r => r.nome_time === time);
    
    let jogadores = {};
    partidasDoTime.forEach(r => {
        if(!jogadores[r.player_name]) jogadores[r.player_name] = { picks: 0 };
        jogadores[r.player_name].picks++;
    });

    let html = `
        <h2 style="color: var(--accent-purple); margin-bottom: 20px;">${time}</h2>
        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px;">
    `;

    Object.entries(jogadores).sort((a,b) => b[1].picks - a[1].picks).forEach(([nick, dados]) => {
        html += `
            <div style="background: var(--bg-cards); padding: 15px; border-radius: 8px; border: 1px solid var(--borda-destaque);">
                <h3>${nick}</h3>
                <p style="color: var(--texto-secundario); font-size: 13px; margin-top: 5px;">Picks Totais (Neste Filtro): ${dados.picks}</p>
            </div>
        `;
    });

    html += `</div>`;
    painel.innerHTML = html;
}

// ==========================================
// 5. TELA SCRIMS (AGRUPAMENTO DE 2 HORAS)
// ==========================================
function processarScrimes() {
    let rawMatches = {};
    dadosFiltrados.forEach(r => {
        if(!rawMatches[r.id_partida]) rawMatches[r.id_partida] = [];
        rawMatches[r.id_partida].push(r);
    });

    let partidasEstruturadas = [];
    Object.values(rawMatches).forEach(linhas => {
        if(linhas.length < 6) return; 
        let t0 = linhas.slice(0, 3);
        let t1 = linhas.slice(3, 6);
        
        let dataStr = linhas[0].data_adicao; 
        let timestamp = parseDateBR(dataStr);

        let vencedor = parseInt(t0[0].win) === 1 ? t0[0].nome_time : t1[0].nome_time;

        partidasEstruturadas.push({
            id: linhas[0].id_partida,
            modo: linhas[0].modo,
            timeA: t0[0].nome_time,
            timeB: t1[0].nome_time,
            picksA: t0.map(p => p.pick.toUpperCase()),
            picksB: t1.map(p => p.pick.toUpperCase()),
            vencedor: vencedor,
            timestamp: timestamp,
            dataFormatada: dataStr
        });
    });

    let scrims = [];
    partidasEstruturadas.sort((a,b) => a.timestamp - b.timestamp);

    partidasEstruturadas.forEach(partida => {
        let chaveTimes = [partida.timeA, partida.timeB].sort().join(' VS ');
        
        let scrimExistente = scrims.find(s => 
            s.chave === chaveTimes && 
            (partida.timestamp - s.ultimoUpdate) <= (2 * 60 * 60 * 1000)
        );

        if(scrimExistente) {
            scrimExistente.rounds.push(partida);
            scrimExistente.ultimoUpdate = partida.timestamp;
            if(partida.vencedor === partida.timeA) scrimExistente.scoreA++;
            if(partida.vencedor === partida.timeB) scrimExistente.scoreB++;
        } else {
            scrims.push({
                chave: chaveTimes,
                timeA: partida.timeA,
                timeB: partida.timeB,
                scoreA: partida.vencedor === partida.timeA ? 1 : 0,
                scoreB: partida.vencedor === partida.timeB ? 1 : 0,
                inicio: partida.timestamp,
                ultimoUpdate: partida.timestamp,
                dataFormatada: partida.dataFormatada.split(' ')[0], 
                rounds: [partida]
            });
        }
    });

    renderizarListaScrims(scrims.reverse()); 
}

function parseDateBR(dateStr) {
    if(!dateStr) return 0;
    let partes = dateStr.split(' ');
    let d = partes[0].split('/');
    let t = partes[1] ? partes[1].split(':') : ['00','00','00'];
    return new Date(d[2], d[1]-1, d[0], t[0], t[1], t[2]).getTime();
}

function renderizarListaScrims(scrims) {
    const lista = document.getElementById('scrims-lista');
    const detalhe = document.getElementById('scrims-detalhe');
    lista.style.display = 'grid';
    detalhe.style.display = 'none';
    lista.innerHTML = '';

    if(scrims.length === 0) {
        lista.innerHTML = '<p style="padding:20px;">Nenhuma scrim encontrada nos filtros.</p>';
        return;
    }

    scrims.forEach((scrim, index) => {
        let div = document.createElement('div');
        div.className = 'scrim-card';
        div.innerHTML = `
            <div class="scrim-team-info">
                <img src="element/logos/${scrim.timeA.replace(/\s/g, '')}.png" class="scrim-team-logo" onerror="this.src='element/logos/default.png'">
                <span style="font-weight:bold; font-size:14px;">${scrim.timeA}</span>
            </div>
            <div class="scrim-score">${scrim.scoreA} - ${scrim.scoreB}</div>
            <div class="scrim-team-info" style="flex-direction: row-reverse;">
                <img src="element/logos/${scrim.timeB.replace(/\s/g, '')}.png" class="scrim-team-logo" onerror="this.src='element/logos/default.png'">
                <span style="font-weight:bold; font-size:14px;">${scrim.timeB}</span>
            </div>
            <div style="position:absolute; bottom:5px; left:15px; font-size:10px; color:var(--texto-secundario)">${scrim.dataFormatada}</div>
            <div style="position:absolute; bottom:5px; right:15px; font-size:10px; color:var(--texto-secundario)">Rounds: ${scrim.rounds.length}</div>
        `;
        div.style.position = 'relative';
        div.style.paddingBottom = '30px';

        div.onclick = () => renderizarDetalheScrim(scrim);
        lista.appendChild(div);
    });
}

function renderizarDetalheScrim(scrim) {
    const lista = document.getElementById('scrims-lista');
    const detalhe = document.getElementById('scrims-detalhe');
    lista.style.display = 'none';
    detalhe.style.display = 'block';

    let html = `
        <button onclick="document.getElementById('scrims-lista').style.display='grid'; document.getElementById('scrims-detalhe').style.display='none';" 
                style="background: transparent; border: 1px solid var(--accent-purple); color: var(--accent-purple); padding: 5px 15px; border-radius: 4px; cursor:pointer; margin-bottom: 20px;">
            ← VOLTAR
        </button>

        <div class="scrim-detail-header">
            <div style="display: flex; justify-content: center; align-items: center; gap: 30px;">
                <img src="element/logos/${scrim.timeA.replace(/\s/g, '')}.png" style="height:60px;" onerror="this.src='element/logos/default.png'">
                <div style="font-size: 32px; font-weight: 900; color: #fff;">${scrim.scoreA} <span style="color:var(--accent-purple)">x</span> ${scrim.scoreB}</div>
                <img src="element/logos/${scrim.timeB.replace(/\s/g, '')}.png" style="height:60px;" onerror="this.src='element/logos/default.png'">
            </div>
        </div>

        <div class="scrim-rounds-container" id="rounds-scroll">
            ${scrim.rounds.map((r, i) => `
                <div class="scrim-round-btn ${i === 0 ? 'active' : ''}" onclick="selecionarRound(${i}, this)">
                    <img src="element/${r.modo.toLowerCase()}.png" onerror="this.src='element/default_mode.png'">
                    <span style="font-size:12px; font-weight:bold;">SET ${i+1}</span>
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

    container.innerHTML = `
        <p style="text-align:center; font-size:12px; color:var(--texto-secundario); margin-bottom:15px;">Horário: ${round.dataFormatada.split(' ')[1]}</p>
        <div class="round-details-view" style="justify-content: space-between;">
            <div class="team-picks" style="flex: 0 1 auto;">
                ${round.picksA.map(pick => `
                    <div class="pick-row">
                        <img src="element/brawlers/${pick.toLowerCase()}.png" onerror="this.src='element/brawlers/default.png'">
                    </div>
                `).join('')}
            </div>

            <div class="team-picks" style="align-items: flex-end; flex: 0 1 auto;">
                ${round.picksB.map(pick => `
                    <div class="pick-row" style="flex-direction: row-reverse;">
                        <img src="element/brawlers/${pick.toLowerCase()}.png" onerror="this.src='element/brawlers/default.png'">
                    </div>
                `).join('')}
            </div>
        </div>
    `;
};
