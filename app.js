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
let dadosTimesSA = [];
let dadosDetalhesBrawlers = {}; // 🌟 Armazena sinergias e mapas detalhados do historico_bruto

// --- FUNÇÕES UTILITÁRIAS ---
const formatarNomeImagem = (n) => `brawlers/${n.toLowerCase().replace(/[^a-z0-9]/g, "")}.png`;
const formatarNomeMapa = (m) => `element/${m.toLowerCase().replace(/[^a-z0-9]/g, "")}.png`;

function toggleElemento(header) {
    const content = header.nextElementSibling;
    const icon = header.querySelector('span');
    if (content.style.display === "none" || !content.style.display) {
        content.style.display = "block";
        if (icon) icon.textContent = "▼";
    } else {
        content.style.display = "none";
        if (icon) icon.textContent = "▶";
    }
}

// --- CARREGAMENTO DE DADOS ---
async function carregarRegiao(regiao) {
    try {
        const urlStats = `api/stats/${regiao.toLowerCase()}.json`;
        const resStats = await fetch(urlStats);
        if (resStats.ok) {
            dadosOriginaisRegiao = await resStats.json();
        }

        if (regiao.toLowerCase() === 'sa') {
            const resTimes = await fetch('api/stats/times_sa.json');
            if (resTimes.ok) {
                dadosTimesSA = await resTimes.json();
            }
        }

        // 🌟 Carrega o arquivo de detalhes (Sinergias e Mapas gerados a partir do histórico bruto)
        try {
            const resDetalhes = await fetch('api/stats/detalhes_brawlers.json');
            if (resDetalhes.ok) {
                dadosDetalhesBrawlers = await resDetalhes.json();
            }
        } catch (e) {
            console.warn("Arquivo detalhes_brawlers.json não encontrado. Usando fallback local.");
        }

        popularFiltrosIniciais();
        filtrarEAplicarDados();
    } catch (error) {
        console.error("Erro ao carregar dados da região:", error);
    }
}

function popularFiltrosIniciais() {
    const selectAno = document.getElementById('select-ano');
    const selectMes = document.getElementById('select-mes');
    
    if (!selectAno || !selectMes) return;

    const anos = [...new Set(dadosOriginaisRegiao.map(d => d.ano))].filter(a => a && a !== "ANTIGO" && a !== "OUTRO");
    const meses = [...new Set(dadosOriginaisRegiao.map(d => d.mes))].filter(m => m && m !== "ANTIGO" && m !== "OUTRO");

    selectAno.innerHTML = selectAno.querySelector('option[value=""]') ? '<option value="">ANO (TODOS)</option>' : '';
    selectMes.innerHTML = selectMes.querySelector('option[value=""]') ? '<option value="">MÊS (TODOS)</option>' : '';

    anos.sort().forEach(ano => {
        selectAno.innerHTML += `<option value="${ano}">${ano}</option>`;
    });
    
    const ordemMeses = ["JANEIRO", "FEVEREIRO", "MARÇO", "ABRIL", "MAIO", "JUNHO", "JULHO", "AGOSTO", "SETEMBRO", "OUTUBRO", "NOVEMBRO", "DEZEMBRO"];
    meses.sort((a, b) => ordemMeses.indexOf(a) - ordemMeses.indexOf(b)).forEach(mes => {
        selectMes.innerHTML += `<option value="${mes}">${mes}</option>`;
    });

    if (anos.length > 0) selectAno.value = anos[anos.length - 1];
    if (meses.length > 0) selectMes.value = meses[meses.length - 1];
}

function filtrarEAplicarDados() {
    const anoSel = document.getElementById('select-ano')?.value;
    const mesSel = document.getElementById('select-mes')?.value;

    let dadosFiltrados = dadosOriginaisRegiao;

    if (anoSel) dadosFiltrados = dadosFiltrados.filter(d => d.ano === anoSel);
    if (mesSel) dadosFiltrados = dadosFiltrados.filter(d => d.mes === mesSel);

    renderizarGridModos(dadosFiltrados);
    renderizarTabelaGeral(dadosFiltrados);
    
    if (dadosTimesSA.length > 0) {
        renderizarPainelTimesSA();
    }
}

// --- RENDERIZAÇÃO DAS TABELAS COM EVENTO DE CLIQUE ---
function renderizarGridModos(dados) {
    const container = document.getElementById('grid-modos');
    if (!container) return;
    container.innerHTML = '';

    const modosDisponiveis = [...new Set(dados.map(d => d.modo))];

    modosDisponiveis.forEach(modo => {
        const dadosDoModo = dados.filter(d => d.modo === modo);
        const mapasDoModo = [...new Set(dadosDoModo.map(d => d.mapa))];

        const section = document.createElement('div');
        section.className = 'modo-section';

        let mapasHTML = '';
        mapasDoModo.forEach(mapa => {
            const dadosDoMapa = dadosDoModo.filter(d => d.mapa === mapa);
            dadosDoMapa.sort((a, b) => b.picks - a.picks);

            let linhasBrawlers = '';
            dadosDoMapa.forEach(row => {
                // 🌟 Adicionado estilo de cursor de clique e gatilho onclick
                linhasBrawlers += `
                    <tr style="cursor: pointer;" onclick="abrirModalBrawler('${row.pick}')" title="Clique para ver análise detalhada de ${row.pick}">
                        <td class="col-img"><img src="${formatarNomeImagem(row.pick)}" alt="${row.pick}" onerror="this.src='brawlers/default.png'"></td>
                        <td style="text-align: left; font-weight: bold;">${row.pick.toUpperCase()}</td>
                        <td>${row.picks}</td>
                        <td>${row.vitorias}</td>
                        <td class="winrate-cell">${row.win_rate}</td>
                    </tr>
                `;
            });

            mapasHTML += `
                <div class="mapa-container">
                    <h3 class="mapa-title">${mapa.toUpperCase()}</h3>
                    <table class="excel-table">
                        <thead>
                            <tr>
                                <th class="col-img">IMG</th>
                                <th style="text-align: left;">BRAWLER</th>
                                <th>PICKS</th>
                                <th>WINS</th>
                                <th>WIN RATE</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${linhasBrawlers}
                        </tbody>
                    </table>
                </div>
            `;
        });

        const nomeExibicaoModo = modo.replace(/([A-Z])/g, ' $1').trim().toUpperCase();
        section.innerHTML = `
            <div class="modo-header" onclick="toggleElemento(this)">${nomeExibicaoModo} <span>▶</span></div>
            <div class="mapa-content" style="display:none">${mapasHTML}</div>
        `;
        container.appendChild(section);
    });
}

function renderizarTabelaGeral(dados) {
    const tbody = document.getElementById('tbody-all-maps');
    if (!tbody) return;
    tbody.innerHTML = '';

    const consolidado = {};
    dados.forEach(row => {
        if (!consolidado[row.pick]) {
            consolidado[row.pick] = { picks: 0, vitorias: 0 };
        }
        consolidado[row.pick].picks += row.picks;
        consolidado[row.pick].vitorias += row.vitorias;
    });

    const listaConsolidada = Object.keys(consolidado).map(brawler => {
        const item = consolidado[brawler];
        const wr = item.picks > 0 ? ((item.vitorias / item.picks) * 100).toFixed(1) + '%' : '0.0%';
        return {
            brawler: brawler,
            picks: item.picks,
            vitorias: item.vitorias,
            win_rate: wr
        };
    });

    listaConsolidada.sort((a, b) => b.picks - a.picks);

    listaConsolidada.forEach(row => {
        // 🌟 Adicionado estilo de cursor de clique e gatilho onclick
        tbody.innerHTML += `
            <tr style="cursor: pointer;" onclick="abrirModalBrawler('${row.brawler}')" title="Clique para ver análise detalhada de ${row.brawler}">
                <td class="col-img"><img src="${formatarNomeImagem(row.brawler)}" alt="${row.brawler}" onerror="this.src='brawlers/default.png'"></td>
                <td style="text-align: left; font-weight: bold;">${row.brawler.toUpperCase()}</td>
                <td>${row.picks}</td>
                <td>${row.vitorias}</td>
                <td class="winrate-cell">${row.win_rate}</td>
            </tr>
        `;
    });
}

function renderizarPainelTimesSA() {
    const containerTimes = document.getElementById('container-times-sa');
    if (!containerTimes) return;
    
    containerTimes.innerHTML = '';

    dadosTimesSA.forEach(time => {
        const cardTime = document.createElement('div');
        cardTime.className = 'team-card';
        
        let rosterHTML = '<div class="team-roster"><strong>Roster:</strong> ';
        time.roster.forEach((jogador, idx) => {
            rosterHTML += `<span class="player-tag-span" title="${jogador.tag}">${jogador.nome}</span>`;
            if (idx < time.roster.length - 1) rosterHTML += ', ';
        });
        rosterHTML += '</div>';

        let historicoPicksHTML = '<div class="team-picks-history"><h4>BRAWLERS MAIS JOGADOS:</h4>';
        
        time.roster.forEach(jogador => {
            const picksJogador = time.picks[jogador.tag] || [];
            const topPicks = picksJogador.slice(0, 3);
            
            let brawlersLinha = '';
            if (topPicks.length === 0) {
                brawlersLinha = '<span class="no-data">Nenhuma partida registrada</span>';
            } else {
                topPicks.forEach(p => {
                    // 🌟 Permite clicar também nas fotos pequenas de brawlers do roster
                    brawlersLinha += `
                        <div class="mini-pick-item" style="cursor: pointer;" onclick="abrirModalBrawler('${p.brawler}')" title="Ver detalhes de ${p.brawler}">
                            <img src="${formatarNomeImagem(p.brawler)}" alt="${p.brawler}" onerror="this.src='brawlers/default.png'">
                            <span class="pick-count">x${p.qtd}</span>
                        </div>
                    `;
                });
            }

            historicoPicksHTML += `
                <div class="player-pick-row">
                    <span class="player-name-mini">${jogador.nome}:</span>
                    <div class="player-mini-images">${brawlersLinha}</div>
                </div>
            `;
        });
        historicoPicksHTML += '</div>';

        cardTime.innerHTML = `
            <div class="team-header-info">
                <span class="team-badge">${time.id_time}</span>
                <h2 class="team-name-title">${time.nome_time}</h2>
            </div>
            ${rosterHTML}
            ${historicoPicksHTML}
        `;

        containerTimes.appendChild(cardTime);
    });
}

// --- 🌟 INTERATIVIDADE: SISTEMA DE POPUP / MODAL DE DETALHES ---
function abrirModalBrawler(nomeBrawler) {
    const key = nomeBrawler.toLowerCase();
    
    // Fallback caso o JSON de detalhes ainda esteja sendo gerado pelo python
    const info = dadosDetalhesBrawlers[key] || {
        mapa_mais_frequente: "Mapa Exemplo",
        mapa_partidas: 0,
        mapa_vitorias: 0,
        mapa_pct_partidas: 0,
        mapa_winrate: "0.0%",
        sinergia_brawler: "Nenhum",
        sinergia_partidas: 0,
        sinergia_vitorias: 0,
        sinergia_pct_partidas: 0,
        sinergia_winrate: "0.0%"
    };

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
                            <p><strong>% do Uso Global:</strong> ${info.mapa_pct_partidas}</p>
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
                                <span>ATUAL</span>
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
                            <p><strong>% de Presença:</strong> ${info.sinergia_pct_partidas}</p>
                            <p><strong>Taxa de Vitória Dupla:</strong> <span class="winrate-cell">${info.sinergia_winrate}</span></p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    `;
    modal.style.display = 'flex';
}

function fecharModalBrawler() {
    const modal = document.getElementById('modal-analise-brawler');
    if (modal) modal.style.display = 'none';
}

// --- ORDENAÇÃO DE TABELAS DINÂMICAS ---
function ordenarTabela(th, tipo) {
    const tabela = th.closest('table');
    const tbody = tabela.querySelector('tbody');
    const linhas = Array.from(tbody.querySelectorAll('tr'));
    const colunaIndex = Array.from(th.parentNode.children).indexOf(th);
    const ascendente = !th.classList.contains('sort-asc');
    
    tabela.querySelectorAll('th').forEach(h => h.classList.remove('sort-asc', 'sort-desc'));
    th.classList.add(ascendente ? 'sort-asc' : 'sort-desc');

    linhas.sort((linhaA, SelfB) => {
        let celulaA = linhaA.children[colunaIndex].textContent.trim();
        let celulaB = SelfB.children[colunaIndex].textContent.trim();

        if (tipo === 'number') {
            return ascendente ? parseFloat(celulaA) - parseFloat(celulaB) : parseFloat(celulaB) - parseFloat(celulaA);
        } else if (tipo === 'percent') {
            let numA = parseFloat(celulaA.replace('%', ''));
            let numB = parseFloat(celulaB.replace('%', ''));
            return ascendente ? numA - numB : numB - numA;
        } else {
            return ascendente ? celulaA.localeCompare(celulaB) : celulaB.localeCompare(celulaA);
        }
    });

    linhas.forEach(linha => tbody.appendChild(linha));
}

// --- CONFIGURAÇÃO INICIAL E ESTILOS DINÂMICOS DO MODAL ---
document.addEventListener("DOMContentLoaded", () => {
    // Injeta automaticamente o estilo necessário para o modal no HTML
    const styleTag = document.createElement('style');
    styleTag.innerHTML = `
        .brawler-modal-overlay {
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0, 0, 0, 0.85); display: none; align-items: center;
            justify-content: center; z-index: 9999; padding: 20px;
        }
        .brawler-modal-card {
            background: #111111; border: 2px solid rgb(204, 0, 255);
            border-radius: 12px; width: 100%; max-width: 650px;
            box-shadow: 0 0 25px rgba(204, 0, 255, 0.4); overflow: hidden;
        }
        .brawler-modal-header {
            background: #1a1a1a; padding: 15px 20px; display: flex;
            justify-content: space-between; align-items: center;
            border-bottom: 1px solid #262626;
        }
        .brawler-modal-header h2 { font-size: 18px; color: #ffffff; letter-spacing: 1px; }
        .brawler-modal-close {
            background: none; border: none; color: #888; font-size: 28px;
            cursor: pointer; transition: color 0.2s;
        }
        .brawler-modal-close:hover { color: #ff3333; }
        .brawler-modal-body { padding: 25px; display: flex; flex-direction: column; gap: 25px; }
        .brawler-modal-section { background: #161616; padding: 15px; border-radius: 8px; border: 1px solid #222; }
        .brawler-modal-section h3 { font-size: 14px; color: rgb(204, 0, 255); margin-bottom: 15px; }
        
        /* Layout do Mapa */
        .modal-map-flex { display: flex; gap: 20px; align-items: center; }
        .modal-map-img-box { width: 110px; height: 110px; background: #000; border-radius: 8px; overflow: hidden; border: 1px solid #333; }
        .modal-map-img-box img { width: 100%; height: 100%; object-fit: cover; }
        .modal-map-details h4 { font-size: 18px; margin-bottom: 8px; color: #fff; }
        .modal-map-details p { font-size: 13px; color: #ccc; margin: 3px 0; }
        
        /* Layout da Sinergia */
        .modal-synergy-flex { display: flex; justify-content: space-between; align-items: center; gap: 20px; flex-wrap: wrap; }
        .sidebar-panel { display: flex; gap: 10px; }
        .synergy-display-images { display: flex; align-items: center; gap: 12px; }
        .synergy-unit { display: flex; flex-direction: column; align-items: center; gap: 5px; }
        .synergy-unit img { width: 55px; height: 55px; border-radius: 6px; border: 1px solid rgb(204, 0, 255); }
        .synergy-unit span { font-size: 10px; font-weight: bold; color: #888; }
        .synergy-plus { font-size: 24px; color: rgb(204, 0, 255); font-weight: bold; }
        .modal-synergy-details { flex: 1; min-width: 200px; display: flex; flex-direction: column; gap: 4px; font-size: 13px; color: #ccc; }
    `;
    document.head.appendChild(styleTag);

    // Dropdowns da Navbar
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
