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
let dadosTimesSA = [];
let dadosDetalhesBrawlers = {};

const formatarNomeImagem = (n) => `brawlers/${n.toLowerCase().replace(/[^a-z0-9]/g, "")}.png`;
const formatarNomeMapa = (m) => `element/${m.toLowerCase().replace(/[^a-z0-9]/g, "")}.png`;

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
// 2. CARREGAMENTO E TRATAMENTO DE DADOS (ANTIGA -> ABRIL)
// ========================================================
window.carregarRegiao = async function(regiao) {
    console.log(`Carregando dados da região: ${regiao}`);
    
    try {
        const urlStats = `api/stats/${regiao.toLowerCase()}.json`;
        const resStats = await fetch(urlStats);
        if (resStats.ok) {
            let dadosBrutos = await resStats.json();
            
            // Tratamento automático de Datas Antigas para ABRIL 2026
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

        if (regiao.toLowerCase() === 'sa') {
            const resTimes = await fetch('api/stats/times_sa.json');
            if (resTimes.ok) dadosTimesSA = await resTimes.json();
        }

        try {
            const resDetalhes = await fetch('api/stats/detalhes_brawlers.json');
            if (resDetalhes.ok) dadosDetalhesBrawlers = await resDetalhes.json();
        } catch (e) {
            console.warn("detalhes_brawlers.json ausente. Os modais usarão placeholders.");
        }

        popularFiltrosIniciais();
        filtrarEAplicarDados();
        renderizarListaBrawlers();
        renderizarListaTimes();
    } catch (error) {
        console.error("Erro ao carregar dados da região:", error);
    }
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

// ========================================================
// 3. FILTRAGEM RESTRITA POR MAPAS VÁLIDOS
// ========================================================
window.filtrarEAplicarDados = function() {
    const anoSel = document.getElementById('select-ano')?.value;
    const mesSel = document.getElementById('select-mes')?.value;

    let dadosFiltrados = dadosOriginaisRegiao;

    if (anoSel) dadosFiltrados = dadosFiltrados.filter(d => d.ano === anoSel);
    if (mesSel) dadosFiltrados = dadosFiltrados.filter(d => d.mes === mesSel);

    const mesesParaNumero = {
        "JANEIRO": "01", "FEVEREIRO": "02", "MARÇO": "03", "ABRIL": "04",
        "MAIO": "05", "JUNHO": "06", "JULHO": "07", "AGOSTO": "08",
        "SETEMBRO": "09", "OUTUBRO": "10", "NOVEMBRO": "11", "DEZEMBRO": "12"
    };

    if (anoSel && mesSel) {
        const numMes = mesesParaNumero[mesSel.toUpperCase()];
        const chaveMapa = `${anoSel}-${numMes}`;
        const mapasDoMes = MAPAS_POR_MES[chaveMapa];

        if (mapasDoMes) {
            let mapasValidos = [];
            Object.values(mapasDoMes).forEach(lista => {
                lista.forEach(m => mapasValidos.push(m.toLowerCase()));
            });
            // Mantém APENAS mapas que estão no dicionário
            dadosFiltrados = dadosFiltrados.filter(d => mapasValidos.includes(d.mapa.toLowerCase()));
        } else {
            // Se o mês não estiver configurado no MAPAS_POR_MES, limpa a tabela
            dadosFiltrados = [];
        }
    }

    renderizarGridModos(dadosFiltrados, anoSel, mesSel);
    renderizarAllMaps(dadosFiltrados);
};

// ========================================================
// 4. RENDERIZAÇÃO DA ABA META (TABELAS)
// ========================================================
function renderizarGridModos(dados, ano, mes) {
    const container = document.getElementById('grid-modos');
    if (!container) return;
    container.innerHTML = '';

    const mesesParaNumero = { "JANEIRO": "01", "FEVEREIRO": "02", "MARÇO": "03", "ABRIL": "04", "MAIO": "05", "JUNHO": "06", "JULHO": "07", "AGOSTO": "08", "SETEMBRO": "09", "OUTUBRO": "10", "NOVEMBRO": "11", "DEZEMBRO": "12" };
    const numMes = mes ? mesesParaNumero[mes.toUpperCase()] : "05";
    const chaveMes = `${ano}-${numMes}`;
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
    const tbody = document.getElementById('tbody-all-maps');
    if (!tbody) return;

    let agrupadoGeral = {};
    dados.forEach(d => {
        if (!agrupadoGeral[d.pick]) agrupadoGeral[d.pick] = { picks: 0, vitorias: 0 };
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
        <tr style="cursor: pointer;" onclick="abrirModalBrawler('${d.brawler}')" title="Análise detalhada de ${d.brawler}">
            <td class="col-img"><img src="${formatarNomeImagem(d.brawler)}" onerror="this.src='brawlers/default.png'"></td>
            <td style="text-align: left; font-weight: bold;">${d.brawler.toUpperCase()}</td>
            <td>${d.picks}</td>
            <td>${d.vitorias}</td>
            <td class="winrate-cell">${d.win_rate}</td>
        </tr>
    `).join('');
}

// ========================================================
// 5. ABA BRAWLERS E TIMES (SIDEBAR E INFO PANEL)
// ========================================================
function renderizarListaBrawlers() {
    const container = document.getElementById("lista-brawlers-sidebar");
    if (!container) return;
    
    let brawlers = Object.keys(dadosDetalhesBrawlers);
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

window.exibirInfoBrawler = function(nome) {
    const painel = document.getElementById("painel-info-brawler");
    if (!painel) return;
    
    document.querySelectorAll("#lista-brawlers-sidebar .sidebar-item").forEach(i => {
        i.classList.toggle("active", i.querySelector(".brawler-name").textContent.toLowerCase() === nome.toLowerCase());
    });

    const info = dadosDetalhesBrawlers[nome.toLowerCase()] || criarFallbackDetalhes();
    painel.innerHTML = gerarHTMLDetalhesAvançados(nome, info);
};

function renderizarListaTimes() {
    const container = document.getElementById("lista-times-sidebar");
    if (!container) return;
    if (dadosTimesSA.length === 0) {
        container.innerHTML = `<p style="padding: 10px; color: #666;">Sem dados de times.</p>`;
        return;
    }

    container.innerHTML = dadosTimesSA.map(t => `
        <div class="sidebar-item" data-teamid="${t.id_time}" onclick="exibirInfoTime('${t.id_time}')" style="padding: 12px; cursor: pointer; font-weight: 600;">
            <span>${t.nome_time}</span>
        </div>
    `).join('');
}

window.exibirInfoTime = function(idTime) {
    const time = dadosTimesSA.find(t => String(t.id_time) === String(idTime));
    const painel = document.getElementById("painel-info-time");
    if (!time || !painel) return;

    document.querySelectorAll("#lista-times-sidebar .sidebar-item").forEach(i => {
        i.classList.toggle("active", String(i.getAttribute("data-teamid")) === String(idTime));
    });

    let playersHTML = time.roster.map(player => {
        const picks = (time.picks[player.tag] || []).slice(0, 5);
        let picksHTML = picks.length ? picks.map(p => `
            <div class="player-mini-pick" onclick="abrirModalBrawler('${p.brawler}')" style="cursor: pointer;" title="Detalhes de ${p.brawler}">
                <img src="${formatarNomeImagem(p.brawler)}" onerror="this.src='brawlers/default.png'">
                <span class="pick-count">x${p.qtd}</span>
            </div>
        `).join('') : '<span class="no-data-tag">Sem picks recentes</span>';

        return `
            <div class="player-roster-card">
                <div class="player-info-top">
                    <span class="p-nickname">${player.nome}</span>
                    <span class="p-tag">${player.tag}</span>
                </div>
                <div class="player-history-box">
                    <h5>Principais Escolhas:</h5>
                    <div class="player-picks-row">${picksHTML}</div>
                </div>
            </div>
        `;
    }).join('');

    painel.innerHTML = `
        <div class="team-profile-header">
            <h2>EQUIPE: <span class="accent">${time.nome_time}</span></h2>
        </div>
        <div class="roster-container-grid">${playersHTML}</div>
    `;
};

// ========================================================
// 6. MODAL DE ANÁLISE AVANÇADA (MAPAS E SINERGIA)
// ========================================================
window.abrirModalBrawler = function(nomeBrawler) {
    const key = nomeBrawler.toLowerCase();
    const info = dadosDetalhesBrawlers[key] || criarFallbackDetalhes();

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
                <h2>ANÁLISE AVANÇADA: ${nomeBrawler.toUpperCase()}</h2>
                <button class="brawler-modal-close" onclick="fecharModalBrawler()">&times;</button>
            </div>
            <div class="brawler-modal-body">
                ${gerarHTMLDetalhesAvançados(nomeBrawler, info)}
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
// 7. FUNÇÕES AUXILIARES E CSS INJETADO (MODAL/DETALHES)
// ========================================================
function criarFallbackDetalhes() {
    return {
        mapa_mais_frequente: "Indisponível", mapa_partidas: 0, mapa_vitorias: 0, mapa_pct_partidas: "0%", mapa_winrate: "0.0%",
        sinergia_brawler: "Nenhum", sinergia_partidas: 0, sinergia_vitorias: 0, sinergia_pct_partidas: "0%", sinergia_winrate: "0.0%"
    };
}

function gerarHTMLDetalhesAvançados(nomeBrawler, info) {
    return `
        <div class="brawler-modal-section">
            <h3>📌 MAPA MAIS FREQUENTE</h3>
            <div class="modal-map-flex">
                <div class="modal-map-img-box">
                    <img src="${formatarNomeMapa(info.mapa_mais_frequente)}" alt="${info.mapa_mais_frequente}" onerror="this.src='element/default.png'">
                </div>
                <div class="modal-map-details">
                    <h4>${info.mapa_mais_frequente.toUpperCase()}</h4>
                    <p><strong>Total de Partidas:</strong> ${info.mapa_partidas}</p>
                    <p><strong>Total de Vitórias:</strong> ${info.mapa_vitorias}</p>
                    <p><strong>% de Escolha Global:</strong> ${info.mapa_pct_partidas}</p>
                    <p><strong>Taxa de Vitória (WR):</strong> <span class="winrate-cell">${info.mapa_winrate}</span></p>
                </div>
            </div>
        </div>

        <div class="brawler-modal-section">
            <h3>🤝 MELHOR SINERGIA DETECTADA</h3>
            <div class="modal-synergy-flex">
                <div class="synergy-display-images">
                    <div class="synergy-unit">
                        <img src="${formatarNomeImagem(nomeBrawler)}" onerror="this.src='brawlers/default.png'">
                        <span>${nomeBrawler.toUpperCase()}</span>
                    </div>
                    <div class="synergy-plus">+</div>
                    <div class="synergy-unit">
                        <img src="${formatarNomeImagem(info.sinergia_brawler)}" onerror="this.src='brawlers/default.png'">
                        <span>${info.sinergia_brawler.toUpperCase()}</span>
                    </div>
                </div>
                <div class="modal-synergy-details">
                    <p><strong>Partidas Juntos:</strong> ${info.sinergia_partidas}</p>
                    <p><strong>Vitórias Juntos:</strong> ${info.sinergia_vitorias}</p>
                    <p><strong>% de Presença Dupla:</strong> ${info.sinergia_pct_partidas}</p>
                    <p><strong>Taxa de Vitória Dupla:</strong> <span class="winrate-cell">${info.sinergia_winrate}</span></p>
                </div>
            </div>
        </div>
    `;
}

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

        if (tipo === 'number') {
            return ascendente ? parseFloat(celulaA) - parseFloat(celulaB) : parseFloat(celulaB) - parseFloat(celulaA);
        } else if (tipo === 'percent') {
            return ascendente ? parseFloat(celulaA) - parseFloat(celulaB) : parseFloat(celulaB) - parseFloat(celulaA);
        } else {
            return ascendente ? celulaA.localeCompare(celulaB) : celulaB.localeCompare(celulaA);
        }
    });

    linhas.forEach(linha => tbody.appendChild(linha));
};

document.addEventListener("DOMContentLoaded", () => {
    // Injeção limpa de CSS do Modal e Componentes de Detalhe
    const styleTag = document.createElement('style');
    styleTag.innerHTML = `
        .brawler-modal-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.85); display: none; align-items: center; justify-content: center; z-index: 9999; padding: 20px; }
        .brawler-modal-card { background: #111111; border: 2px solid rgb(204, 0, 255); border-radius: 12px; width: 100%; max-width: 650px; box-shadow: 0 0 25px rgba(204, 0, 255, 0.4); overflow: hidden; }
        .brawler-modal-header { background: #1a1a1a; padding: 15px 20px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #262626; }
        .brawler-modal-header h2 { font-size: 18px; color: #ffffff; letter-spacing: 1px; }
        .brawler-modal-close { background: none; border: none; color: #888; font-size: 28px; cursor: pointer; }
        .brawler-modal-close:hover { color: #ff3333; }
        .brawler-modal-body { padding: 25px; display: flex; flex-direction: column; gap: 25px; }
        .brawler-modal-section { background: #161616; padding: 15px; border-radius: 8px; border: 1px solid #222; }
        .brawler-modal-section h3 { font-size: 14px; color: rgb(204, 0, 255); margin-bottom: 15px; }
        
        /* Map Layout */
        .modal-map-flex { display: flex; gap: 20px; align-items: center; }
        .modal-map-img-box { width: 110px; height: 110px; background: #000; border-radius: 8px; overflow: hidden; border: 1px solid #333; flex-shrink: 0; }
        .modal-map-img-box img { width: 100%; height: 100%; object-fit: cover; }
        .modal-map-details h4 { font-size: 18px; margin-bottom: 8px; color: #fff; }
        .modal-map-details p { font-size: 13px; color: #ccc; margin: 3px 0; }
        
        /* Synergy Layout */
        .modal-synergy-flex { display: flex; justify-content: space-between; align-items: center; gap: 20px; flex-wrap: wrap; }
        .synergy-display-images { display: flex; align-items: center; gap: 15px; background: #0b0c10; padding: 10px 20px; border-radius: 8px; border: 1px solid #222; }
        .synergy-unit { display: flex; flex-direction: column; align-items: center; gap: 5px; }
        .synergy-unit img { width: 60px; height: 60px; border-radius: 6px; border: 1px solid rgb(204, 0, 255); object-fit: cover;}
        .synergy-unit span { font-size: 11px; font-weight: bold; color: #888; }
        .synergy-plus { font-size: 26px; color: rgb(204, 0, 255); font-weight: bold; margin-bottom: 15px;}
        .modal-synergy-details { flex: 1; min-width: 200px; display: flex; flex-direction: column; gap: 4px; font-size: 13px; color: #ccc; }
    `;
    document.head.appendChild(styleTag);

    // Configuração dos Menus Dropdown
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
});
