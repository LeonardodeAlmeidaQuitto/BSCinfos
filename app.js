// --- CONFIGURAÇÃO DOS MAPAS POR MÊS ---
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
    }
};

let dadosOriginaisRegiao = [];
let dadosBrawlers = {};
let dadosTimes = [];

// --- FUNÇÕES UTILITÁRIAS ---
const formatarNomeImagem = (n) => `brawlers/${n.toLowerCase().replace(/[^a-z0-9]/g, "")}.png`;

// --- CARREGAMENTO PRINCIPAL ---
window.carregarRegiao = async function(regiao) {
    console.log(`Carregando dados da região: ${regiao}`);
    
    // 1. Carrega dados da Aba META
    try {
        const response = await fetch(`api/stats/${regiao}.json`);
        dadosOriginaisRegiao = await response.json();
        filtrarEAplicarDados();
    } catch (error) {
        console.error("Erro ao carregar dados de Meta:", error);
    }

    // 2. Carrega dados da Aba BRAWLERS
    try {
        const responseBrawlers = await fetch(`api/stats/brawlers_data.json`);
        dadosBrawlers = await responseBrawlers.json();
        renderizarListaBrawlers();
    } catch (error) {
        console.error("Erro ao carregar dados estruturados dos brawlers:", error);
        renderizarListaBrawlers(); // Fallback seguro
    }

    // 3. Carrega dados da Aba TIMES
    try {
        const responseTimes = await fetch(`api/stats/times_sa.json`);
        dadosTimes = await responseTimes.json();
        renderizarListaTimes();
    } catch (error) {
        console.error("Erro ao carregar dados estruturados dos times:", error);
    }
};

// ========================================================
// FUNÇÃO RESTAURADA: ORDENAÇÃO DE TABELAS (EXCEL STYLE)
// ========================================================
window.ordenarTabela = function(th, tipo) {
    const table = th.closest('table');
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    const index = th.cellIndex;
    
    const isAsc = !th.classList.contains('asc');
    
    table.querySelectorAll('th').forEach(header => header.classList.remove('asc', 'desc'));
    th.classList.add(isAsc ? 'asc' : 'desc');
    
    rows.sort((a, b) => {
        let valA = a.children[index].textContent.trim();
        let valB = b.children[index].textContent.trim();
        
        if (tipo === 'number') {
            return isAsc ? parseFloat(valA) - parseFloat(valB) : parseFloat(valB) - parseFloat(valA);
        } else if (tipo === 'percent') {
            let numA = parseFloat(valA.replace('%', '')) || 0;
            let numB = parseFloat(valB.replace('%', '')) || 0;
            return isAsc ? numA - numB : numB - numA;
        } else {
            return isAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
        }
    });
    
    rows.forEach(row => tbody.appendChild(row));
};

// ========================================================
// LÓGICA DA ABA 1: META (TABELAS E PROCESSAMENTO COM CORREÇÃO DE DATA)
// ========================================================
window.filtrarEAplicarDados = function() {
    const ano = document.getElementById("select-ano").value;
    const mesSelec = document.getElementById("select-mes").value;
    
    const mesesNomes = { "04": "APRIL", "05": "MAY", "4": "APRIL", "5": "MAY" };
    const mesFiltro = mesesNomes[mesSelec] || "TODOS";

    let dadosFiltrados = dadosOriginaisRegiao.filter(d => {
        const matchAno = String(d.ano) === String(ano);
        const mLog = String(d.mes).toUpperCase();
        
        // CORREÇÃO CRÍTICA: Valida múltiplos formatos de mês simultaneamente
        const matchMes = mesSelec === "TODOS" || 
                         mLog === String(mesSelec) || 
                         mLog === String(mesFiltro) ||
                         mLog === String(parseInt(mesSelec));
                         
        return matchAno && matchMes;
    });

    renderizarGridModos(dadosFiltrados, ano, mesSelec);
    renderizarAllMaps(dadosFiltrados);
};

function renderizarGridModos(dados, ano, mes) {
    const container = document.getElementById("grid-modos");
    if (!container) return;
    container.innerHTML = "";

    const chaveMes = `${ano}-${mes}`;
    const configuracaoMapas = MAPAS_POR_MES[chaveMes] || MAPAS_POR_MES[`${ano}-0${parseInt(mes)}`] || {};

    Object.keys(configuracaoMapas).forEach(modo => {
        const mapasDoModo = configuracaoMapas[modo];
        let mapasHTML = "";

        mapasDoModo.forEach(mapa => {
            const dadosMapa = dados.filter(d => d.mapa.toLowerCase() === mapa.toLowerCase());
            if (dadosMapa.length === 0) return;

            dadosMapa.sort((a, b) => b.picks - a.picks);

            let linhasBrawlers = dadosMapa.map(d => `
                <tr>
                    <td class="col-img"><img src="${formatarNomeImagem(d.pick)}" alt="${d.pick}" onerror="this.src='brawlers/default.png'"></td>
                    <td style="text-align: left;">${d.pick}</td>
                    <td>${d.picks}</td>
                    <td>${d.vitorias}</td>
                    <td class="winrate-cell">${d.win_rate}</td>
                </tr>
            `).join('');

            mapasHTML += `
                <div class="mapa-box">
                    <h3 class="mapa-title">${mapa.toUpperCase()}</h3>
                    <table class="excel-table">
                        <thead>
                            <tr>
                                <th class="col-img">IMG</th>
                                <th style="text-align: left; cursor: pointer;" onclick="ordenarTabela(this, 'string')">BRAWLER ↕</th>
                                <th class="col-stats sortable" style="cursor: pointer;" onclick="ordenarTabela(this, 'number')">P ↕</th>
                                <th class="col-stats sortable" style="cursor: pointer;" onclick="ordenarTabela(this, 'number')">W ↕</th>
                                <th class="col-stats sortable" style="cursor: pointer;" onclick="ordenarTabela(this, 'percent')">WR ↕</th>
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
    const tbody = document.getElementById("tbody-all-maps");
    if (!tbody) return;

    let agrupadoGeral = {};
    dados.forEach(d => {
        if (!agrupadoGeral[d.pick]) {
            agrupadoGeral[d.pick] = { picks: 0, vitorias: 0 };
        }
        agrupadoGeral[d.pick].picks += d.picks;
        agrupadoGeral[d.pick].vitorias += d.vitorias;
    });

    let listaGeral = Object.keys(agrupadoGeral).map(brawler => {
        const item = agrupadoGeral[brawler];
        const wr = item.picks > 0 ? ((item.vitorias / item.picks) * 100).toFixed(1) + "%" : "0.0%";
        return { brawler, picks: item.picks, vitorias: item.vitorias, win_rate: wr };
    });

    listaGeral.sort((a, b) => b.picks - a.picks);

    tbody.innerHTML = listaGeral.map(d => `
        <tr>
            <td class="col-img"><img src="${formatarNomeImagem(d.brawler)}" alt="${d.brawler}" onerror="this.src='brawlers/default.png'"></td>
            <td style="text-align: left;">${d.brawler}</td>
            <td>${d.picks}</td>
            <td>${d.vitorias}</td>
            <td>${d.win_rate}</td>
        </tr>
    `).join('');
}

window.toggleElemento = function(header) {
    const content = header.nextElementSibling;
    const seta = header.querySelector("span");
    if (content.style.display === "none" || content.style.display === "") {
        content.style.display = "grid";
        seta.textContent = "▼";
    } else {
        content.style.display = "none";
        seta.textContent = "▶";
    }
};

// ========================================================
// LÓGICA DA ABA 2: BRAWLERS (SIDEBAR ESTILO DRAFT CARD COM FOTO)
// ========================================================
function renderizarListaBrawlers() {
    const listaContainer = document.getElementById("lista-brawlers-sidebar");
    if (!listaContainer) return;

    let brawlersOrdenados = Object.keys(dadosBrawlers);
    if (brawlersOrdenados.length === 0 && dadosOriginaisRegiao.length > 0) {
        brawlersOrdenados = [...new Set(dadosOriginaisRegiao.map(d => d.pick))];
    }
    brawlersOrdenados.sort();
    
    // Renderiza com imagem lateral perfeitamente alinhada igual ao formato de listagem visual
    listaContainer.innerHTML = brawlersOrdenados.map(brawler => `
        <div class="sidebar-item" onclick="exibirInfoBrawler('${brawler}')" style="display: flex; align-items: center; gap: 12px; padding: 10px; cursor: pointer;">
            <img src="${formatarNomeImagem(brawler)}" style="width: 35px; height: 35px; object-fit: cover; border-radius: 6px; border: 1px solid var(--border-dark);" onerror="this.src='brawlers/default.png'">
            <span class="brawler-name" style="font-weight: 600; font-size: 14px;">${brawler}</span>
        </div>
    `).join('');
}

window.filtrarBrawlersSidebar = function() {
    const termo = document.getElementById("search-brawler-sidebar").value.toLowerCase();
    const itens = document.querySelectorAll("#lista-brawlers-sidebar .sidebar-item");

    itens.forEach(item => {
        const nome = item.querySelector(".brawler-name").textContent.toLowerCase();
        item.style.display = nome.includes(termo) ? "flex" : "none";
    });
};

window.exibirInfoBrawler = function(brawlerNome) {
    const info = dadosBrawlers[brawlerNome] || { melhor_mapa: "Nenhum detectado nas Scrims", sinergias: [] };
    const painel = document.getElementById("painel-info-brawler");
    if (!painel) return;

    document.querySelectorAll("#lista-brawlers-sidebar .sidebar-item").forEach(item => {
        if(item.querySelector(".brawler-name").textContent === brawlerNome) item.classList.add("active");
        else item.classList.remove("active");
    });

    let sinergiasHTML = info.sinergias.map(sin => `
        <div class="sinergia-card">
            <img src="${formatarNomeImagem(sin)}" onerror="this.src='brawlers/default.png'">
            <span>${sin}</span>
        </div>
    `).join('');

    if (!info.sinergias || info.sinergias.length === 0) {
        sinergiasHTML = `<p class="no-data">Sem registros de sinergia para este brawler nas estatísticas locais.</p>`;
    }

    painel.innerHTML = `
        <div class="brawler-profile-header">
            <img src="${formatarNomeImagem(brawlerNome)}" class="brawler-large-avatar" onerror="this.src='brawlers/default.png'">
            <h2>${brawlerNome}</h2>
        </div>
        <div class="brawler-meta-insights">
            <div class="insight-box">
                <span class="label">MELHOR MAPA HISTÓRICO</span>
                <span class="value accent">${info.melhor_mapa || "Nenhum detectado"}</span>
            </div>
        </div>
        <div class="sinergias-section">
            <h3>Top 5 Aliados Frequentes (Sinergia)</h3>
            <div class="sinergias-grid-list">${sinergiasHTML}</div>
        </div>
    `;
};

// ========================================================
// LÓGICA DA ABA 3: TIMES - PLAYERS (ROSTERS + HISTÓRICO)
// ========================================================
function renderizarListaTimes() {
    const listaContainer = document.getElementById("lista-times-sidebar");
    if (!listaContainer) return;

    if (!dadosTimes || dadosTimes.length === 0) {
        listaContainer.innerHTML = `<p style="padding: 10px; font-size: 13px; color: #666;">Nenhum time estruturado encontrado.</p>`;
        return;
    }

    listaContainer.innerHTML = dadosTimes.map(time => `
        <div class="sidebar-item" onclick="exibirInfoTime('${time.nome_time}')" style="padding: 12px; cursor: pointer; font-weight: 600;">
            <span>${time.nome_time}</span>
        </div>
    `).join('');
}

window.exibirInfoTime = function(nomeTime) {
    const time = dadosTimes.find(t => t.nome_time === nomeTime);
    const painel = document.getElementById("painel-info-time");
    if (!time || !painel) return;

    document.querySelectorAll("#lista-times-sidebar .sidebar-item").forEach(item => {
        if(item.querySelector("span").textContent === nomeTime) item.classList.add("active");
        else item.classList.remove("active");
    });

    let playersHTML = time.roster.map(player => {
        const picksDoPlayer = time.picks[player.tag] || [];
        
        let picksListHTML = picksDoPlayer.slice(0, 5).map(p => `
            <div class="player-mini-pick">
                <img src="${formatarNomeImagem(p.brawler)}" title="${p.brawler}" onerror="this.src='brawlers/default.png'">
                <span class="pick-count">x${p.qtd}</span>
            </div>
        `).join('');

        if(picksListHTML === "") {
            picksListHTML = `<span class="no-data-tag">Nenhum pick recente gravado</span>`;
        }

        return `
            <div class="player-roster-card">
                <div class="player-info-top">
                    <span class="p-nickname">${player.nome}</span>
                    <span class="p-tag">${player.tag}</span>
                </div>
                <div class="player-history-box">
                    <h5>Principais Escolhas:</h5>
                    <div class="player-picks-row">${picksListHTML}</div>
                </div>
            </div>
        `;
    }).join('');

    painel.innerHTML = `
        <div class="team-profile-header">
            <h2>EQUIPE: <span class="accent">${time.nome_time}</span></h2>
        </div>
        <div class="roster-container-grid">
            ${playersHTML}
        </div>
    `;
};

// ========================================================
// GERENCIADOR DOS DROPDOWNS E EVENTOS GERAIS
// ========================================================
document.addEventListener("DOMContentLoaded", () => {
    const dropdowns = document.querySelectorAll(".dropdown");

    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector(".nav-link");
        if (!link) return;

        link.addEventListener("click", (e) => {
            e.preventDefault();
            dropdowns.forEach(other => {
                if (other !== dropdown) other.classList.remove("active");
            });
            dropdown.classList.toggle("active");
        });
    });

    document.addEventListener("click", (e) => {
        if (!e.target.closest(".dropdown")) {
            dropdowns.forEach(d => d.classList.remove("active"));
        }
    });
});
