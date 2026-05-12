// 1. Configuração de Mapas e Modos
const MAPAS_ALVO = {
    "brawlBall": ["Super Beach", "Pinhole Punt", "Sneaky Fields"],
    "bounty": ["Shooting Star", "Hideout", "Layer Cake"],
    "heist": ["Hot Potato", "Safe Zone", "Bridge Too Far"],
    "knockout": ["Goldarm Gulch", "Belle's Rock", "Out in the Open"],
    "gemGrab": ["Hard Rock Mine", "Double Swoosh", "Deathcap Trap"]
};

// 2. Helpers (Imagens e Cores)
const formatarNomeImagem = (nome) => {
    if (!nome) return "brawlers/default.png";
    const nomeLimpo = nome.toLowerCase().replace(/[^a-z0-9]/g, "");
    return `brawlers/${nomeLimpo}.png`;
};

const obterClasseColorida = (wr) => {
    const valor = parseFloat(wr);
    if (valor >= 80) return 'wr-80';     // Verde Forte
    if (valor >= 60) return 'wr-60-70';  // Verde Claro
    if (valor >= 50) return 'wr-50';     // Amarelo
    if (valor >= 40) return 'wr-40';     // Laranja
    if (valor >= 30) return 'wr-30';     // Vermelho Claro
    return 'wr-10-20';                   // Vermelho
};

// 3. Carregamento de Dados por Região
async function carregarRegiao(sigla) {
    const container = document.getElementById('grid-modos');
    if (!container) return;

    if (sigla.toLowerCase() === 'geral') return carregarGeralUnificado();

    container.innerHTML = `<h2 style="text-align:center; color:white; margin-top:50px;">CARREGANDO ${sigla.toUpperCase()}...</h2>`;

    try {
        const res = await fetch(`api/stats/${sigla.toLowerCase()}.json`);
        if (!res.ok) throw new Error(`Erro HTTP: ${res.status}`);
        const dados = await res.json();
        
        if (!dados || dados.length === 0) {
            container.innerHTML = `<h2 style='text-align:center; color:white;'>Nenhum dado encontrado.</h2>`;
            return;
        }

        renderizarDinamico(dados, container, false);
        renderizarTabelaAllMaps(dados); 
    } catch (e) {
        console.error("Erro:", e);
        container.innerHTML = `<h2 style='text-align:center; color:white;'>Erro ao carregar dados.</h2>`;
    }
}

// 4. Unificação Global (Geral)
async function carregarGeralUnificado() {
    const container = document.getElementById('grid-modos');
    if (!container) return;
    container.innerHTML = `<h2 style="text-align:center; color:white; margin-top:50px;">UNIFICANDO TODAS AS REGIÕES...</h2>`;
    
    const regioes = ['sa', 'na', 'emea', 'ea'];

    try {
        const promessas = regioes.map(r => 
            fetch(`api/stats/${r}.json`).then(res => res.ok ? res.json() : []).catch(() => [])
        );
        
        const resultados = await Promise.all(promessas);
        const dadosTudo = resultados.flat();

        let consolidado = {}; 
        dadosTudo.forEach(item => {
            const brawlerNome = item.pick || item.brawler;
            if (!item.modo || !item.mapa || !brawlerNome) return;
            
            const chave = `${item.modo.toLowerCase()}|${item.mapa.toLowerCase().trim()}|${brawlerNome.toLowerCase().trim()}`;
            
            if (!consolidado[chave]) {
                consolidado[chave] = { 
                    modo: item.modo, mapa: item.mapa, pick: brawlerNome, picks: 0, vitorias: 0 
                };
            }
            consolidado[chave].picks += Number(item.picks || 1);
            consolidado[chave].vitorias += Number(item.win !== undefined ? item.win : (item.vitorias || 0));
        });

        const listaConsolidada = Object.values(consolidado).map(item => {
            const wr = item.picks > 0 ? (item.vitorias / item.picks) * 100 : 0;
            return { ...item, "win_rate": wr.toFixed(1) + "%" };
        });

        renderizarDinamico(listaConsolidada, container, true);
        renderizarTabelaAllMaps(listaConsolidada);
    } catch (e) {
        container.innerHTML = "<h2 style='text-align:center; color:white;'>Erro na unificação global.</h2>";
    }
}

// 5. Renderização da Tabela Inferior (All Maps Analysis)
function renderizarTabelaAllMaps(dados) {
    const tbody = document.getElementById('tbody-all-maps');
    if (!tbody) return;

    const brawlerStats = {};
    dados.forEach(item => {
        const nome = item.pick || item.brawler;
        if (!nome) return;

        if (!brawlerStats[nome]) {
            brawlerStats[nome] = { picks: 0, vitorias: 0 };
        }
        brawlerStats[nome].picks += Number(item.picks || 1);
        const vits = item.vitorias !== undefined ? item.vitorias : (item.win !== undefined ? item.win : 0);
        brawlerStats[nome].vitorias += Number(vits);
    });

    const lista = Object.keys(brawlerStats).map(nome => {
        const s = brawlerStats[nome];
        const wr = s.picks > 0 ? (s.vitorias / s.picks) * 100 : 0;
        return { nome, picks: s.picks, vitorias: s.vitorias, wr: wr };
    }).sort((a, b) => b.picks - a.picks);

    tbody.innerHTML = lista.map(b => `
        <tr>
            <td class="text-left">
                <img src="${formatarNomeImagem(b.nome)}" onerror="this.src='brawlers/default.png';">
                ${b.nome.toUpperCase()}
            </td>
            <td>${b.picks}</td>
            <td>${b.vitorias}</td>
            <td class="${obterClasseColorida(b.wr)}">
                ${b.wr.toFixed(1)}%
            </td>
        </tr>
    `).join('');
}

// 6. Renderização dos Cards de Modos/Mapas
function renderizarDinamico(dados, container, isGeral) {
    container.innerHTML = ""; 
    const dadosArray = Array.isArray(dados) ? dados : [];

    Object.keys(MAPAS_ALVO).forEach(modoKey => {
        const sectionModo = document.createElement('div');
        sectionModo.className = 'modo-section';
        let mapasHTML = "";

        MAPAS_ALVO[modoKey].forEach(nomeMapaAlvo => {
            const brawlersNoMapa = dadosArray.filter(item => 
                (item.modo || "").toLowerCase().trim() === modoKey.toLowerCase() && 
                (item.mapa || "").toLowerCase().trim() === nomeMapaAlvo.toLowerCase()
            );

            brawlersNoMapa.sort((a, b) => {
                const wrA = parseFloat(a.win_rate || 0);
                const wrB = parseFloat(b.win_rate || 0);
                return wrB - wrA;
            });

            if (brawlersNoMapa.length > 0) {
                const rows = brawlersNoMapa.map(b => {
                    const wrVal = parseFloat(b.win_rate || 0);
                    return `
                    <tr>
                        <td class="col-img">
                            <div class="brawler-avatar-frame">
                                <img src="${formatarNomeImagem(b.pick || b.brawler)}" class="brawler-img">
                            </div>
                        </td>
                        <td style="text-align:left; font-weight:800; text-transform:uppercase;">${b.pick || b.brawler}</td>
                        <td class="col-picks">${b.picks || 1}</td>
                        <td>${b.vitorias !== undefined ? b.vitorias : (b.win || 0)}</td>
                        <td class="${obterClasseColorida(wrVal)}">${b.win_rate || "0.0%"}</td>
                    </tr>`;
                }).join('');

                mapasHTML += `
                    <div class="mapa-container">
                        <div class="mapa-header" onclick="toggleElemento(this)">
                            ${nomeMapaAlvo.toUpperCase()} ${isGeral ? '(GLOBAL)' : ''} <span>▶</span>
                        </div>
                        <div class="mapa-content" style="display:none">
                            <table class="excel-table">
                                <thead>
                                    <tr>
                                        <th>IMG</th>
                                        <th style="text-align:left" onclick="ordenarTabela(this, 'string')" class="sortable">BRAWLER ↕</th>
                                        <th onclick="ordenarTabela(this, 'number')" class="sortable">PICKS ↕</th>
                                        <th>WINS</th>
                                        <th onclick="ordenarTabela(this, 'percent')" class="sortable">WR% ↕</th>
                                    </tr>
                                </thead>
                                <tbody>${rows}</tbody>
                            </table>
                        </div>
                    </div>`;
            }
        });

        if (mapasHTML) {
            sectionModo.innerHTML = `
                <div class="modo-header" onclick="toggleElemento(this)">
                    ${modoKey.toUpperCase()} <span>▶</span>
                </div>
                <div class="modo-content" style="display:none">
                    ${mapasHTML}
                </div>`;
            container.appendChild(sectionModo);
        }
    });
}

// 7. Funções de Interação (Toggle e Ordenação)
function toggleElemento(header) {
    const content = header.nextElementSibling;
    if (!content) return;
    const isHidden = content.style.display === "none" || content.style.display === "";
    content.style.display = isHidden ? "block" : "none";
    const seta = header.querySelector('span');
    if (seta) seta.style.transform = isHidden ? "rotate(90deg)" : "rotate(0deg)";
}

function ordenarTabela(thElement, tipo) {
    const table = thElement.closest('table');
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    const colIndex = thElement.cellIndex;

    let isAsc = thElement.getAttribute('data-sort') === 'asc';
    thElement.setAttribute('data-sort', isAsc ? 'desc' : 'asc');

    rows.sort((a, b) => {
        let valA = a.cells[colIndex].innerText.trim();
        let valB = b.cells[colIndex].innerText.trim();

        if (tipo === 'percent') {
            return isAsc ? parseFloat(valA) - parseFloat(valB) : parseFloat(valB) - parseFloat(valA);
        } 
        if (tipo === 'number') {
            return isAsc ? parseFloat(valA) - parseFloat(valB) : parseFloat(valB) - parseFloat(valA);
        } 
        return isAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
    });

    tbody.innerHTML = '';
    rows.forEach(row => tbody.appendChild(row));
}
