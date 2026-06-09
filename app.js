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

Aqui tens o código JavaScript completo e atualizado (app.js ou o script que gerencia o teu painel).

Este script foi adaptado para ler a nova estrutura do times_sa.json (que o teu novo gerador.py cria automaticamente) e renderizar a lista de times, os rosters reais com as tags de cada jogador, e o histórico de brawlers mais jogados por eles.

JavaScript
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
let dadosTimesSA = []; // Armazena os dados dos times carregados do JSON novo

// --- FUNÇÕES UTILITÁRIAS ---
const formatarNomeImagem = (n) => `brawlers/${n.toLowerCase().replace(/[^a-z0-9]/g, "")}.png`;

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

        // Se a região for South America, carrega também os dados estruturados dos times
        if (regiao.toLowerCase() === 'sa') {
            const resTimes = await fetch('api/stats/times_sa.json');
            if (resTimes.ok) {
                dadosTimesSA = await resTimes.json();
            }
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

    // Limpa mantendo a opção "TODOS" se houver
    selectAno.innerHTML = selectAno.querySelector('option[value=""]') ? '<option value="">ANO (TODOS)</option>' : '';
    selectMes.innerHTML = selectMes.querySelector('option[value=""]') ? '<option value="">MÊS (TODOS)</option>' : '';

    anos.sort().forEach(ano => {
        selectAno.innerHTML += `<option value="${ano}">${ano}</option>`;
    });
    
    // Ordem personalizada de meses para exibição limpa
    const ordemMeses = ["JANEIRO", "FEVEREIRO", "MARÇO", "ABRIL", "MAIO", "JUNHO", "JULHO", "AGOSTO", "SETEMBRO", "OUTUBRO", "NOVEMBRO", "DEZEMBRO"];
    meses.sort((a, b) => ordemMeses.indexOf(a) - ordemMeses.indexOf(b)).forEach(mes => {
        selectMes.innerHTML += `<option value="${mes}">${mes}</option>`;
    });

    // Seleciona automaticamente o ano e mês mais recentes se houver dados
    if (anos.length > 0) selectAno.value = anos[anos.length - 1];
    if (meses.length > 0) selectMes.value = meses[meses.length - 1];
}

// --- FILTRAGEM E RENDERIZAÇÃO DAS TABELAS ---
function filtrarEAplicarDados() {
    const anoSel = document.getElementById('select-ano')?.value;
    const mesSel = document.getElementById('select-mes')?.value;

    let dadosFiltrados = dadosOriginaisRegiao;

    if (anoSel) dadosFiltrados = dadosFiltrados.filter(d => d.ano === anoSel);
    if (mesSel) dadosFiltrados = dadosFiltrados.filter(d => d.mes === mesSel);

    renderizarGridModos(dadosFiltrados);
    renderizarTabelaGeral(dadosFiltrados);
    
    // Se tivermos os dados estruturados dos times, renderiza-os no painel
    if (dadosTimesSA.length > 0) {
        renderizarPainelTimesSA();
    }
}

function renderizarGridModos(dados) {
    const container = document.getElementById('grid-modos');
    if (!container) return;
    container.innerHTML = '';

    // Agrupa dados por modo
    const modosDisponiveis = [...new Set(dados.map(d => d.modo))];

    modosDisponiveis.forEach(modo => {
        const dadosDoModo = dados.filter(d => d.modo === modo);
        const mapasDoModo = [...new Set(dadosDoModo.map(d => d.mapa))];

        const section = document.createElement('div');
        section.className = 'modo-section';

        let mapasHTML = '';
        mapasDoModo.forEach(mapa => {
            const dadosDoMapa = dadosDoModo.filter(d => d.mapa === mapa);
            
            // Ordena os picks do mapa por quantidade de escolhas decrescente
            dadosDoMapa.sort((a, b) => b.picks - a.picks);

            let linhasBrawlers = '';
            dadosDoMapa.forEach(row => {
                linhasBrawlers += `
                    <tr>
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
            <div class="modo-header" onclick=\"toggleElemento(this)\">${nomeExibicaoModo} <span>▶</span></div>
            <div class="mapa-content" style="display:none">${mapasHTML}</div>
        `;
        container.appendChild(section);
    });
}

function renderizarTabelaGeral(dados) {
    const tbody = document.getElementById('tbody-all-maps');
    if (!tbody) return;
    tbody.innerHTML = '';

    // Consolida todos os mapas somando picks e vitórias por Brawler
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

    // Ordena por maior número de picks por padrão
    listaConsolidada.sort((a, b) => b.picks - a.picks);

    listaConsolidada.forEach(row => {
        tbody.innerHTML += `
            <tr>
                <td class="col-img"><img src="${formatarNomeImagem(row.brawler)}" alt="${row.brawler}" onerror="this.src='brawlers/default.png'"></td>
                <td style="text-align: left; font-weight: bold;">${row.brawler.toUpperCase()}</td>
                <td>${row.picks}</td>
                <td>${row.vitorias}</td>
                <td class="winrate-cell">${row.win_rate}</td>
            </tr>
        `;
    });
}

// --- 🌟 NOVO: RENDERIZADOR DO PAINEL DE TIMES BASEADO NO JSON ESTRUTURADO ---
function renderizarPainelTimesSA() {
    const containerTimes = document.getElementById('container-times-sa');
    if (!containerTimes) return; // Só executa se o elemento existir na tela (ex: na aba SA)
    
    containerTimes.innerHTML = '';

    dadosTimesSA.forEach(time => {
        // Cria a estrutura HTML do card do Time
        const cardTime = document.createElement('div');
        cardTime.className = 'team-card';
        
        // Gera a lista visual dos Jogadores (Roster)
        let rosterHTML = '<div class="team-roster"><strong>Roster:</strong> ';
        time.roster.forEach((jogador, idx) => {
            rosterHTML += `<span class="player-tag-span" title="${jogador.tag}">${jogador.nome}</span>`;
            if (idx < time.roster.length - 1) rosterHTML += ', ';
        });
        rosterHTML += '</div>';

        // Gera a lista dos picks históricos dos jogadores deste time
        let historicoPicksHTML = '<div class="team-picks-history"><h4>BRAWLERS MAIS JOGADOS:</h4>';
        
        time.roster.forEach(jogador => {
            const picksJogador = time.picks[jogador.tag] || [];
            // Pega no máximo os 3 Brawlers mais jogados pelo player
            const topPicks = picksJogador.slice(0, 3);
            
            let brawlersLinha = '';
            if (topPicks.length === 0) {
                brawlersLinha = '<span class="no-data">Nenhuma partida registrada</span>';
            } else {
                topPicks.forEach(p => {
                    brawlersLinha += `
                        <div class="mini-pick-item">
                            <img src="${formatarNomeImagem(p.brawler)}" alt="${p.brawler}" onerror="this.src='brawlers/default.png'" title="${p.brawler}">
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

        // Junta tudo dentro do card do Time
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

// --- ORDENAÇÃO DE TABELAS DINÂMICAS ---
function ordenarTabela(th, tipo) {
    const tabela = th.closest('table');
    const tbody = tabela.querySelector('tbody');
    const linhas = Array.from(tbody.querySelectorAll('tr'));
    const colunaIndex = Array.from(th.parentNode.children).indexOf(th);
    const ascendente = !th.classList.contains('sort-asc');
    
    // Limpa classes antigas de ordenação
    tabela.querySelectorAll('th').forEach(h => h.classList.remove('sort-asc', 'sort-desc'));
    th.classList.add(ascendente ? 'sort-asc' : 'sort-desc');

    linhas.sort((linhaA, linhaB) => {
        let celulaA = linhaA.children[colunaIndex].textContent.trim();
        let celulaB = linhaB.children[colunaIndex].textContent.trim();

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

// --- CONFIGURAÇÃO DOS DROPDOWNS DO MENU DA NAVBAR ---
document.addEventListener("DOMContentLoaded", () => {
    const dropdowns = document.querySelectorAll(".dropdown");

    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector(".nav-link");
        if (!link) return;

        link.addEventListener("click", (e) => {
            e.preventDefault();
            dropdowns.forEach(other => {
                if (other !== dropdown) {
                    other.classList.remove("active");
                }
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
