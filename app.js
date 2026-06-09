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

// Variáveis Globais de Dados
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
// LÓGICA DA ABA 1: META (TABELAS E PROCESSAMENTO)
// ========================================================
window.filtrarEAplicarDados = function() {
    const ano = document.getElementById("select-ano").value;
    const mesSelec = document.getElementById("select-mes").value;
    
    const mesesNomes = { "04": "APRIL", "05": "MAY" };
    const mesFiltro = mesesNomes[mesSelec] || "TODOS";

    let dadosFiltrados = dadosOriginaisRegiao.filter(d => {
        const matchAno = d.ano === ano;
        const matchMes = mesFiltro === "TODOS" || d.mes === mesFiltro;
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
    const configuracaoMapas = MAPAS_POR_MES[chaveMes] || {};

    Object.keys(configuracaoMapas).forEach(modo => {
        const mapasDoModo = configuracaoMapas[modo];
        let mapasHTML = "";

        mapasDoModo.forEach(mapa => {
            const dadosMapa = dados.filter(d => d.mapa.toLowerCase() === mapa.toLowerCase());
            if (dadosMapa.length === 0) return;

            // Ordena por maior número de picks
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
                                <th style="text-align: left;">BRAWLER</th>
                                <th class="col-stats">P</th>
                                <th class="col-stats">W</th>
                                <th class="col-stats">WR</th>
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
        const wr = ((item.vitorias / item.picks) * 100).toFixed(1) + "%";
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
// LÓGICA DA ABA 2: BRAWLERS (SIDEBAR + SINERGIAS)
// ========================================================
function renderizarListaBrawlers() {
    const listaContainer = document.getElementById("lista-brawlers-sidebar");
    if (!listaContainer) return;

    const brawlersOrdenados = Object.keys(dadosBrawlers).sort();
    
    listaContainer.innerHTML = brawlersOrdenados.map(brawler => `
        <div class="sidebar-item" onclick="exibirInfoBrawler('${brawler}')">
            <img src="${formatarNomeImagem(brawler)}" onerror="this.src='brawlers/default.png'">
            <span>${brawler}</span>
        </div>
    `).join('');
}

window.filtrarBrawlersSidebar = function() {
    const termo = document.getElementById("search-brawler-sidebar").value.toLowerCase();
    const itens = document.querySelectorAll("#lista-brawlers-sidebar .sidebar-item");

    itens.forEach(item => {
        const nome = item.querySelector("span").textContent.toLowerCase();
        item.style.display = nome.includes(termo) ? "flex" : "none";
    });
};

window.exibirInfoBrawler = function(brawlerNome) {
    const info = dadosBrawlers[brawlerNome];
    const painel = document.getElementById("painel-info-brawler");
    if (!info || !painel) return;

    // Remove destaque do brawler anterior na sidebar e adiciona ao atual
    document.querySelectorAll("#lista-brawlers-sidebar .sidebar-item").forEach(item => {
        if(item.querySelector("span").textContent === brawlerNome) item.classList.add("active");
        else item.classList.remove("active");
    });

    let sinergiasHTML = info.sinergias.map(sin => `
        <div class="sinergia-card">
            <img src="${formatarNomeImagem(sin)}" onerror="this.src='brawlers/default.png'">
            <span>${sin}</span>
        </div>
    `).join('');

    if (info.sinergias.length === 0) {
        sinergiasHTML = `<p class="no-data">Sem registros de sinergia para este brawler.</p>`;
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

    listaContainer.innerHTML = dadosTimes.map(time => `
        <div class="sidebar-item" onclick="exibirInfoTime('${time.nome_time}')">
            <span>${time.nome_time}</span>
        </div>
    `).join('');
}

window.exibirInfoTime = function(nomeTime) {
    const time = dadosTimes.find(t => t.nome_time === nomeTime);
    const painel = document.getElementById("painel-info-time");
    if (!time || !painel) return;

    // Gerencia classe active na barra lateral de times
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
            picksListHTML = `<span class="no-data-tag">Nenhum pick em competições recentes</span>`;
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
