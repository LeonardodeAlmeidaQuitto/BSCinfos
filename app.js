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
// 2. ESTADO GLOBAL DA APLICAÇÃO
// ========================================================
let dadosBrawlersRegiao = {};
let dadosTimesGeral = {};
let regiaoAtual = 'sa';

// ========================================================
// 3. INICIALIZAÇÃO E EVENTOS (DOM)
// ========================================================
document.addEventListener("DOMContentLoaded", () => {
    // Configuração de Menus Dropdown
    const dropdowns = document.querySelectorAll(".dropdown");
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector(".nav-link");
        if (!link) return;
        
        link.addEventListener("click", (e) => {
            if (link.getAttribute('href') === '#') {
                e.preventDefault();
                dropdowns.forEach(other => { if (other !== dropdown) other.classList.remove("active"); });
                dropdown.classList.toggle("active");
            }
        });
    });

    // Fechar dropdowns ao clicar fora
    document.addEventListener("click", (e) => {
        if (!e.target.closest(".dropdown")) {
            dropdowns.forEach(d => d.classList.remove("active"));
        }
    });

    // Ouvintes para Filtros Globais (caso existam na página)
    const filtroTipo = document.getElementById('filtro-tipo');
    const filtroMes = document.getElementById('filtro-mes');
    
    if (filtroTipo) filtroTipo.addEventListener('change', () => renderizarTelas());
    if (filtroMes) filtroMes.addEventListener('change', () => renderizarTelas());
});

// ========================================================
// 4. CARREGAMENTO DE DADOS (API)
// ========================================================
window.carregarRegiao = async function(regiao) {
    regiaoAtual = regiao.toLowerCase();
    
    try {
        // Carrega dados específicos dos brawlers da região
        const resBrawlers = await fetch(`api/stats/${regiaoAtual}_brawlers_detail.json`);
        if (resBrawlers.ok) {
            dadosBrawlersRegiao = await resBrawlers.json();
        } else {
            console.warn(`Aviso: Não foi possível carregar os detalhes dos brawlers para a região: ${regiaoAtual}`);
            dadosBrawlersRegiao = {};
        }

        // Carrega dados consolidados de picks por tag de player
        const resTimes = await fetch(`api/stats/times_geral.json`);
        if (resTimes.ok) {
            dadosTimesGeral = await resTimes.json();
        } else {
            console.warn("Aviso: Ficheiro times_geral.json não encontrado.");
            dadosTimesGeral = {};
        }

        // Renderiza as telas após carregar as fontes de dados
        renderizarTelas();

    } catch (erro) {
        console.error("Erro crítico ao processar o carregamento da região:", erro);
    }
};

// ========================================================
// 5. SISTEMA DE ORDENAÇÃO DE TABELAS (SORT)
// ========================================================
window.ordenarTabela = function(th, tipo) {
    const tabela = th.closest('table');
    const tbody = tabela.querySelector('tbody');
    if (!tbody) return;
    
    const linhas = Array.from(tbody.querySelectorAll('tr'));
    const colunaIndex = Array.from(th.parentNode.children).indexOf(th);
    const ascendente = !th.classList.contains('sort-asc');
    
    tabela.querySelectorAll('th').forEach(h => h.classList.remove('sort-asc', 'sort-desc'));
    th.classList.add(ascendente ? 'sort-asc' : 'sort-desc');
    
    linhas.sort((linhaA, linhaB) => {
        let celulaA = linhaA.children[colunaIndex] ? linhaA.children[colunaIndex].textContent.trim() : '';
        let celulaB = linhaB.children[colunaIndex] ? linhaB.children[colunaIndex].textContent.trim() : '';
        
        if (tipo === 'number' || tipo === 'percent') {
            let numA = parseFloat(celulaA.replace('%', '').replace(/\s/g, '').replace(',', '.')) || 0;
            let numB = parseFloat(celulaB.replace('%', '').replace(/\s/g, '').replace(',', '.')) || 0;
            return ascendente ? numA - numB : numB - numA;
        }
        return ascendente ? celulaA.localeCompare(celulaB) : celulaB.localeCompare(celulaA);
    });
    
    linhas.forEach(linha => tbody.appendChild(linha));
};

// ========================================================
// 6. CONTROLADORES DE RENDERIZAÇÃO DE TELAS
// ========================================================
function renderizarTelas() {
    // Captura os valores atuais dos filtros se presentes no DOM
    const filtroTipoVal = document.getElementById('filtro-tipo') ? document.getElementById('filtro-tipo').value : 'todos';
    const filtroMesVal = document.getElementById('filtro-mes') ? document.getElementById('filtro-mes').value : 'todos';

    renderizarMeta(filtroTipoVal, filtroMesVal);
    renderizarBrawlers(filtroTipoVal, filtroMesVal);
    renderizarTimes(filtroTipoVal, filtroMesVal);
    renderizarPlayers(filtroTipoVal, filtroMesVal);
}

// --- TELA META ---
function renderizarMeta(tipoFiltro, mesFiltro) {
    const container = document.getElementById('conteudo-meta');
    if (!container) return;

    // Constrói visualização rápida baseada nos brawlers mais vitoriosos/populares
    let html = `
        <div style="padding: 20px;">
            <h2 style="margin-bottom: 20px; border-bottom: 2px solid var(--accent-purple); padding-bottom: 10px;">META GERAL DA REGIÃO</h2>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px;">
    `;

    const brawlersOrdenados = Object.entries(dadosBrawlersRegiao)
        .map(([nome, dados]) => ({ nome, ...dados }))
        .sort((a, b) => (b.vitorias || 0) - (a.vitorias || 0))
        .slice(0, 6);

    if (brawlersOrdenados.length === 0) {
        html += `<p style="color: var(--texto-secundario);">Nenhum dado estatístico disponível para o Meta neste filtro.</p>`;
    } else {
        brawlersOrdenados.forEach((b, idx) => {
            html += `
                <div style="background: var(--bg-cards); border: 1px solid var(--borda-destaque); border-radius: 8px; padding: 15px; text-align: center; position: relative;">
                    <div style="position: absolute; top: 10px; left: 10px; background: var(--accent-purple); color: #fff; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold;">#${idx+1}</div>
                    <h3 style="color: var(--accent-hover); margin-bottom: 10px; margin-top: 10px;">${b.nome.toUpperCase()}</h3>
                    <p style="font-size: 14px; color: var(--texto-secundario);">Vitórias Totais: <strong style="color: #fff">${b.vitorias || 0}</strong></p>
                    <p style="font-size: 16px; margin-top: 5px; color: var(--winrate-color);">Win Rate: ${b.win_rate || '0.0%'}</p>
                </div>
            `;
        });
    }

    html += `</div></div>`;
    container.innerHTML = html;
}

// --- TELA BRAWLERS ---
function renderizarBrawlers(tipoFiltro, mesFiltro) {
    const container = document.getElementById('conteudo-brawlers');
    if (!container) return;

    let html = `
        <div style="padding: 20px;">
            <h2 style="margin-bottom: 20px; border-bottom: 2px solid var(--accent-purple); padding-bottom: 10px;">ESTATÍSTICAS DOS BRAWLERS</h2>
            <table class="tabela-stats" style="width: 100%; border-collapse: collapse; background: var(--bg-paineis);">
                <thead>
                    <tr style="background: #000; text-align: left;">
                        <th style="padding: 12px; cursor: pointer;" onclick="ordenarTabela(this, 'string')">Brawler ▼</th>
                        <th style="padding: 12px; cursor: pointer;" onclick="ordenarTabela(this, 'number')">Picks ▼</th>
                        <th style="padding: 12px; cursor: pointer;" onclick="ordenarTabela(this, 'number')">Vitórias ▼</th>
                        <th style="padding: 12px; cursor: pointer;" onclick="ordenarTabela(this, 'percent')">Win Rate ▼</th>
                        <th style="padding: 12px;">Ações</th>
                    </tr>
                </thead>
                <tbody>
    `;

    const entradas = Object.entries(dadosBrawlersRegiao);
    if (entradas.length === 0) {
        html += `<tr><td colspan="5" style="padding: 20px; text-align: center; color: var(--texto-secundario);">Sem dados de partidas registrados.</td></tr>`;
    } else {
        entradas.forEach(([nome, dados]) => {
            html += `
                <tr style="border-bottom: 1px solid var(--borda-suave);">
                    <td style="padding: 12px; font-weight: bold; color: var(--accent-hover);">${nome.toUpperCase()}</td>
                    <td style="padding: 12px;">${dados.total || 0}</td>
                    <td style="padding: 12px;">${dados.vitorias || 0}</td>
                    <td style="padding: 12px; color: var(--winrate-color); font-weight: bold;">${dados.win_rate || '0.0%'}</td>
                    <td style="padding: 12px;"><button style="background: var(--accent-purple); border: none; color: white; padding: 6px 12px; border-radius: 4px; cursor: pointer;" onclick="abrirModalBrawler('${nome}')">Detalhes</button></td>
                </tr>
            `;
        });
    }

    html += `</tbody></table></div>`;
    container.innerHTML = html;
}

// --- TELA TIMES ---
function renderizarTimes(tipoFiltro, mesFiltro) {
    const container = document.getElementById('conteudo-times');
    if (!container) return;

    const regiaoChave = regiaoAtual.toUpperCase();
    const tiers = CONFIGURACAO_MANUAL_TIMES[regiaoChave];

    if (!tiers) {
        container.innerHTML = `<p style="padding: 20px; color: var(--texto-secundario);">Nenhuma configuração de roster manual encontrada para a região: ${regiaoChave}</p>`;
        return;
    }

    let html = `<div style="padding: 20px;">`;

    for (const [nomeTier, listaTimes] of Object.entries(tiers)) {
        html += `
            <h2 style="margin-top: 20px; margin-bottom: 15px; color: var(--accent-hover); font-size: 22px; border-left: 4px solid var(--accent-purple); padding-left: 10px;">${nomeTier}</h2>
            <div class="roster-container-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 20px; margin-bottom: 30px;">
        `;

        listaTimes.forEach(time => {
            html += `
                <div class="team-card" style="background: var(--bg-paineis); border: 1px solid var(--borda-destaque); border-radius: 10px; padding: 20px;">
                    <h3 style="font-size: 20px; color: #fff; margin-bottom: 15px; text-transform: uppercase;">${time.nome_time} <span style="font-size: 12px; color: var(--texto-secundario);">(${time.id_time})</span></h3>
                    <div style="display: flex; flex-direction: column; gap: 10px;">
            `;

            time.jogadores.forEach(j => {
                // Filtra os picks do jogador a partir do JSON carregado da API de acordo com os filtros de ano/mês/tipo
                const historicoPicks = dadosTimesGeral[j.tag] || [];
                
                let picksFiltrados = historicoPicks.filter(item => {
                    let matchTipo = (tipoFiltro === 'todos' || item.tipo === tipoFiltro);
                    let matchMes = true;
                    if (mesFiltro !== 'todos') {
                        let [mes, ano] = mesFiltro.split('-'); // ex: "06-2026"
                        matchMes = (item.mes == parseInt(mes) && item.ano == parseInt(ano));
                    }
                    return matchTipo && matchMes;
                });

                // Consolida a contagem dos brawlers mais jogados por este player
                let picksAgrupados = {};
                picksFiltrados.forEach(p => {
                    picksAgrupados[p.pick] = (picksAgrupados[p.pick] || 0) + (p.qtd || 1);
                });

                let topPicksStr = Object.entries(picksAgrupados)
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 3)
                    .map(([brawler, qtd]) => `${brawler}(${qtd})`)
                    .join(', ');

                html += `
                    <div style="background: var(--bg-cards); padding: 10px; border-radius: 6px; border-left: 3px solid var(--accent-purple);">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <span style="font-weight: bold; color: var(--texto);">${j.nick}</span>
                            <span style="font-size: 11px; background: #000; padding: 2px 6px; border-radius: 4px; color: var(--texto-secundario);">${j.tag}</span>
                        </div>
                        <div style="font-size: 12px; color: var(--texto-secundario); margin-top: 6px;">
                            Picks Recentes: <span style="color: #fff;">${topPicksStr || 'Nenhum registro'}</span>
                        </div>
                    </div>
                `;
            });

            html += `</div></div>`;
        });

        html += `</div>`;
    }

    html += `</div>`;
    container.innerHTML = html;
}

// --- TELA PLAYERS ---
function renderizarPlayers(tipoFiltro, mesFiltro) {
    const container = document.getElementById('conteudo-players');
    if (!container) return;

    let html = `
        <div style="padding: 20px;">
            <h2 style="margin-bottom: 20px; border-bottom: 2px solid var(--accent-purple); padding-bottom: 10px;">RANKING E DADOS DOS JOGADORES</h2>
            <table class="tabela-stats" style="width: 100%; border-collapse: collapse; background: var(--bg-paineis);">
                <thead>
                    <tr style="background: #000; text-align: left;">
                        <th style="padding: 12px; cursor: pointer;" onclick="ordenarTabela(this, 'string')">Jogador ▼</th>
                        <th style="padding: 12px; cursor: pointer;" onclick="ordenarTabela(this, 'string')">Tag ▼</th>
                        <th style="padding: 12px; cursor: pointer;" onclick="ordenarTabela(this, 'number')">Total Picks ▼</th>
                        <th style="padding: 12px;">Brawler Favorito</th>
                    </tr>
                </thead>
                <tbody>
    `;

    const regiaoChave = regiaoAtual.toUpperCase();
    const tiers = CONFIGURACAO_MANUAL_TIMES[regiaoChave];
    let listaTodosJogadores = [];

    if (tiers) {
        for (const [tier, times] of Object.entries(tiers)) {
            times.forEach(t => {
                t.jogadores.forEach(j => {
                    listaTodosJogadores.push(j);
                });
            });
        }
    }

    if (listaTodosJogadores.length === 0) {
        html += `<tr><td colspan="4" style="padding: 20px; text-align: center; color: var(--texto-secundario);">Nenhum jogador mapeado na base.</td></tr>`;
    } else {
        listaTodosJogadores.forEach(j => {
            const historicoPicks = dadosTimesGeral[j.tag] || [];
            
            let picksFiltrados = historicoPicks.filter(item => {
                let matchTipo = (tipoFiltro === 'todos' || item.tipo === tipoFiltro);
                let matchMes = true;
                if (mesFiltro !== 'todos') {
                    let [mes, ano] = mesFiltro.split('-');
                    matchMes = (item.mes == parseInt(mes) && item.ano == parseInt(ano));
                }
                return matchTipo && matchMes;
            });

            let totalPicks = 0;
            let picksAgrupados = {};
            
            picksFiltrados.forEach(p => {
                let qtdVal = p.qtd || 1;
                totalPicks += qtdVal;
                picksAgrupados[p.pick] = (picksAgrupados[p.pick] || 0) + qtdVal;
            });

            let brawlerMaisJogado = Object.entries(picksAgrupados)
                .sort((a, b) => b[1] - a[1])[0];
            
            let brawlerFavoritoStr = brawlerMaisJogado ? `${brawlerMaisJogado[0].toUpperCase()} (${brawlerMaisJogado[1]})` : 'N/A';

            html += `
                <tr style="border-bottom: 1px solid var(--borda-suave);">
                    <td style="padding: 12px; font-weight: bold; color: var(--accent-hover);">${j.nick}</td>
                    <td style="padding: 12px; color: var(--texto-secundario); font-family: monospace;">${j.tag}</td>
                    <td style="padding: 12px;">${totalPicks}</td>
                    <td style="padding: 12px; color: #fff;">${brawlerFavoritoStr}</td>
                </tr>
            `;
        });
    }

    html += `</tbody></table></div>`;
    container.innerHTML = html;
}

// ========================================================
// 7. JANELA MODAL DETALHADA DO BRAWLER
// ========================================================
window.abrirModalBrawler = function(nomeBrawler) {
    const brawlerData = dadosBrawlersRegiao[nomeBrawler];
    if (!brawlerData) return;

    let modal = document.getElementById('brawler-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'brawler-modal';
        modal.className = 'brawler-modal-overlay';
        modal.onclick = function(e) {
            if (e.target === modal) modal.style.display = 'none';
        };
        document.body.appendChild(modal);
    }

    // Estruturação do conteúdo interno renderizado dinamicamente no modal
    modal.innerHTML = `
        <div class="brawler-modal-card" style="background: var(--bg-paineis); border: 2px solid var(--accent-purple); border-radius: 12px; width: 100%; max-width: 600px; margin: 5% auto; box-shadow: 0 0 25px rgba(204, 0, 255, 0.4); overflow: hidden; color: white;">
            <div class="brawler-modal-header" style="background: #000; padding: 15px 20px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--borda-suave);">
                <h2 style="color: var(--accent-hover); margin: 0;">ANÁLISE DE ${nomeBrawler.toUpperCase()}</h2>
                <span style="cursor: pointer; font-size: 28px; color: var(--texto-secundario); line-height: 1;" onclick="document.getElementById('brawler-modal').style.display='none'">&times;</span>
            </div>
            <div style="padding: 20px; max-height: 65vh; overflow-y: auto;">
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; background: var(--bg-cards); padding: 15px; border-radius: 8px; border: 1px solid var(--borda-destaque); margin-bottom: 20px;">
                    <div>
                        <p style="color: var(--texto-secundario); font-size: 13px; margin: 0;">Taxa de Vitória</p>
                        <p style="font-size: 24px; font-weight: bold; color: var(--winrate-color); margin: 5px 0 0 0;">${brawlerData.win_rate || '0.0%'}</p>
                    </div>
                    <div>
                        <p style="color: var(--texto-secundario); font-size: 13px; margin: 0;">Partidas Computadas</p>
                        <p style="font-size: 24px; font-weight: bold; color: #fff; margin: 5px 0 0 0;">${brawlerData.total || 0}</p>
                    </div>
                </div>
                
                <h4 style="margin-bottom: 10px; color: var(--accent-hover); border-bottom: 1px solid var(--borda-suave); padding-bottom: 5px;">MÉTRICAS ADICIONAIS</h4>
                <p style="font-size: 14px; color: var(--texto-secundario); margin: 8px 0;">Vitórias Registadas: <span style="color: #fff; font-weight: bold;">${brawlerData.vitorias || 0}</span></p>
                <p style="font-size: 14px; color: var(--texto-secundario); margin: 8px 0;">Status de Amostragem: <span style="color: var(--winrate-color); font-weight: bold;">Ativo</span></p>
                <p style="font-size: 12px; color: var(--texto-secundario); margin-top: 20px; font-style: italic;">*Dados baseados em torneios e treinos coletados de forma automatizada via API do Brawl Stars.</p>
            </div>
        </div>
    `;

    modal.style.display = 'block';
};
