const MAPAS_ALVO = {
    "brawlBall": ["Super Beach", "Pinhole Punt", "Sneaky Fields"],
    "bounty": ["Shooting Star", "Hideout", "Layer Cake"],
    "heist": ["Hot Potato", "Safe Zone", "Bridge Too Far"],
    "knockout": ["Goldarm Gulch", "Belle's Rock", "Out in the Open"],
    "gemGrab": ["Hard Rock Mine", "Double Swoosh", "Deathcap Trap"]
};

const formatarNomeImagem = (nome) => {
    if (!nome) return "brawlers/default.png";
    const nomeLimpo = nome.toLowerCase().replace(/[^a-z0-9]/g, "");
    return `brawlers/${nomeLimpo}.png`;
};

async function carregarRegiao(sigla) {
    const container = document.getElementById('grid-modos');
    if (!container) return;

    if (sigla.toLowerCase() === 'geral') {
        return carregarGeralUnificado();
    }

    container.innerHTML = `<h2 style="text-align:center; color:white; margin-top:50px;">CARREGANDO ${sigla.toUpperCase()}...</h2>`;

    try {
        // MUDANÇA: Buscando o arquivo .json gerado pelo GitHub Actions (sem a barra inicial)
        const res = await fetch(`api/stats/${sigla.toLowerCase()}.json`);
        if (!res.ok) throw new Error(`Erro HTTP: ${res.status}`);
        
        const dados = await res.json();
        
        // DEBUG: Veja no F12 se os dados estão chegando ou se o array vem vazio []
        console.log(`Dados recebidos para ${sigla}:`, dados);

        if (!dados || dados.length === 0) {
            container.innerHTML = `<h2 style='text-align:center; color:white;'>Nenhum dado encontrado para ${sigla.toUpperCase()}. <br><small style="font-size:14px; color:gray;">Verifique se o gerador.py foi executado.</small></h2>`;
            return;
        }

        renderizarDinamico(dados, container, false);
    } catch (e) {
        console.error("Erro ao carregar região:", e);
        container.innerHTML = `<h2 style='text-align:center; color:white;'>Erro ao carregar dados de ${sigla.toUpperCase()}.</h2>`;
    }
}

async function carregarGeralUnificado() {
    const container = document.getElementById('grid-modos');
    if (!container) return;
    
    container.innerHTML = `<h2 style="text-align:center; color:white; margin-top:50px;">UNIFICANDO TODAS AS REGIÕES...</h2>`;

    const regioes = ['sa', 'na', 'emea', 'ea'];

    try {
        const promessas = regioes.map(r => 
            // MUDANÇA: Buscando os arquivos .json gerados pelo GitHub Actions
            fetch(`api/stats/${r}.json`).then(async res => {
                if (!res.ok) return [];
                return await res.json();
            }).catch(() => [])
        );
        
        const resultadosDeTodasAsRegioes = await Promise.all(promessas);
        const dadosTudo = resultadosDeTodasAsRegioes.flat();
        
        if (dadosTudo.length === 0) {
            container.innerHTML = "<h2 style='text-align:center; color:white;'>Nenhum dado encontrado nas regiões.</h2>";
            return;
        }

        let consolidado = {}; 

        dadosTudo.forEach(item => {
            const brawlerNome = item.pick || item.brawler;
            if (!item.modo || !item.mapa || !brawlerNome) return;
            
            const chave = `${item.modo.toLowerCase()}|${item.mapa.toLowerCase().trim()}|${brawlerNome.toLowerCase().trim()}`;
            
            if (!consolidado[chave]) {
                consolidado[chave] = { 
                    modo: item.modo, 
                    mapa: item.mapa, 
                    pick: brawlerNome, 
                    picks: 0, 
                    vitorias: 0 
                };
            }
            
            consolidado[chave].picks += Number(item.picks || 1);
            consolidado[chave].vitorias += Number(item.win !== undefined ? item.win : (item.vitorias || 0));
        });

        const listaConsolidada = Object.values(consolidado).map(item => {
            const wr = item.picks > 0 ? (item.vitorias / item.picks) * 100 : 0;
            return {
                ...item,
                "win_rate": wr.toFixed(1) + "%"
            };
        });

        renderizarDinamico(listaConsolidada, container, true);

    } catch (e) {
        console.error("Erro ao processar unificação global:", e);
        container.innerHTML = "<h2 style='text-align:center; color:white;'>Erro crítico ao somar dados das regiões.</h2>";
    }
}

function renderizarDinamico(dados, container, isGeral) {
    container.innerHTML = ""; 
    const dadosArray = Array.isArray(dados) ? dados : [];

    Object.keys(MAPAS_ALVO).forEach(modoKey => {
        const sectionModo = document.createElement('div');
        sectionModo.className = 'modo-section';
        let mapasHTML = "";

        MAPAS_ALVO[modoKey].forEach(nomeMapaAlvo => {
            // Filtro reforçado: trim e toLowerCase em tudo para não falhar na NA
            const brawlersNoMapa = dadosArray.filter(item => {
                const modoAPI = (item.modo || "").toLowerCase().trim();
                const mapaAPI = (item.mapa || "").toLowerCase().trim();
                const modoAlvo = modoKey.toLowerCase().trim();
                const mapaAlvo = nomeMapaAlvo.toLowerCase().trim();
                
                return modoAPI === modoAlvo && mapaAPI === mapaAlvo;
            });

            brawlersNoMapa.sort((a, b) => {
                const wrA = parseFloat(a.win_rate || a['win_rate_%'] || 0);
                const wrB = parseFloat(b.win_rate || b['win_rate_%'] || 0);
                if (wrA !== wrB) return wrB - wrA;
                return (b.picks || 0) - (a.picks || 0);
            });

            if (brawlersNoMapa.length > 0) {
                const rows = brawlersNoMapa.map(b => {
                    const nomeBrawler = b.pick || b.brawler || "Brawler";
                    const winRateStr = b.win_rate || b['win_rate_%'] || "0.0%";
                    const wrFloat = parseFloat(winRateStr);
                    const brawlerImg = formatarNomeImagem(nomeBrawler);
                    const vitorias = b.vitorias !== undefined ? b.vitorias : (b.win !== undefined ? b.win : 0);

                    return `
                    <tr>
                        <td class="col-img">
                            <div class="brawler-avatar-frame">
                                <img src="${brawlerImg}" onerror="this.src='brawlers/default.png';" class="brawler-img">
                            </div>
                        </td>
                        <td style="text-align:left; font-weight:800; text-transform:uppercase;">${nomeBrawler}</td>
                        <td class="col-picks">${b.picks || 1}</td>
                        <td>${vitorias}</td>
                        <td class="win-rate ${wrFloat >= 50 ? 'victory' : 'defeat'}">${winRateStr}</td>
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

function toggleElemento(header) {
    const content = header.nextElementSibling;
    if (!content) return;
    const isHidden = content.style.display === "none" || content.style.display === "";
    content.style.display = isHidden ? "block" : "none";
    const seta = header.querySelector('span');
    if (seta) {
        seta.style.transform = isHidden ? "rotate(90deg)" : "rotate(0deg)";
    }
}

function ordenarTabela(thElement, tipo) {
    const table = thElement.closest('table');
    const tbody = table.querySelector('tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    const colIndex = thElement.cellIndex;

    let isAsc = thElement.getAttribute('data-sort') === 'asc';
    thElement.setAttribute('data-sort', isAsc ? 'desc' : 'asc');

    const allThs = table.querySelectorAll('th.sortable');
    allThs.forEach(th => {
        if (th !== thElement) {
            th.removeAttribute('data-sort');
            th.innerHTML = th.innerHTML.replace(' ↓', '').replace(' ↑', '').replace(' ↕', '') + ' ↕';
        }
    });

    const baseText = thElement.innerHTML.replace(' ↓', '').replace(' ↑', '').replace(' ↕', '');
    thElement.innerHTML = baseText + (isAsc ? ' ↑' : ' ↓');

    rows.sort((a, b) => {
        let valA = a.cells[colIndex].innerText.trim();
        let valB = b.cells[colIndex].innerText.trim();

        if (tipo === 'percent') {
            const numA = parseFloat(valA.replace('%', ''));
            const numB = parseFloat(valB.replace('%', ''));
            return isAsc ? numA - numB : numB - numA;
        } 
        if (tipo === 'number') {
            return isAsc ? parseFloat(valA) - parseFloat(valB) : parseFloat(valB) - parseFloat(valA);
        } else {
            return isAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
        }
    });

    tbody.innerHTML = '';
    rows.forEach(row => tbody.appendChild(row));
}