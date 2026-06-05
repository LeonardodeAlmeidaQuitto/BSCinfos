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

const formatarNomeImagem = (n) => `brawlers/${n.toLowerCase().replace(/[^a-z0-9]/g, "")}.png`;

const obterClasseColorida = (wr) => {
    const v = parseFloat(wr);
    if (v >= 90) return 'wr-90-100';
    if (v >= 80) return 'wr-80';
    if (v >= 60) return 'wr-60-70';
    if (v >= 50) return 'wr-50';
    if (v <= 40) return 'wr-30-40';
    if (v >= 20) return 'wr-20';
    if (v <= 10) return 'wr-0-10';
};

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

    thElement.parentElement.querySelectorAll('th').forEach(th => {
        if (th !== thElement && th.classList.contains('sortable')) {
            th.removeAttribute('data-sort');
            th.innerHTML = th.innerHTML.replace(/[▲▼↕]/g, '').trim() + ' ↕';
        }
    });

    rows.sort((a, b) => {
        let valA = a.cells[colIndex].innerText.trim();
        let valB = b.cells[colIndex].innerText.trim();

        if (tipo === 'number' || tipo === 'percent') {
            let numA = parseFloat(valA.replace('%', '')) || 0;
            let numB = parseFloat(valB.replace('%', '')) || 0;
            return isAsc ? numA - numB : numB - numA;
        } 
        return isAsc ? valA.localeCompare(valB) : valB.localeCompare(valA);
    });

    const textoBase = thElement.innerHTML.replace(/[▲▼↕]/g, '').trim();
    thElement.innerHTML = textoBase + ' ' + (isAsc ? '▲' : '▼');

    tbody.innerHTML = '';
    rows.forEach(row => tbody.appendChild(row));
}

async function carregarRegiao(sigla) {
    const container = document.getElementById('grid-modos');
    if (!container) return;
    container.innerHTML = `<h2 style="text-align:center; color:white; margin-top:50px;">CARREGANDO...</h2>`;

    try {
        const res = await fetch(`api/stats/${sigla.toLowerCase()}.json`);
        dadosOriginaisRegiao = await res.json();
        gerarOpcoesDosFiltros();
        filtrarEAplicarDados();
    } catch (e) {
        container.innerHTML = `<h2 style="text-align:center; color:white;">ERRO AO CARREGAR DADOS</h2>`;
    }
}

function gerarOpcoesDosFiltros() {
    const selectAno = document.getElementById('select-ano');
    const selectMes = document.getElementById('select-mes');
    if (!selectAno || !selectMes) return;

    const anoSelecionado = selectAno.value || "TODOS";
    const mesSelecionado = selectMes.value || "TODOS";

    const anosExistentes = new Set();
    const mesesExistentes = new Map();

    const mesesNomes = {
        "01": "Janeiro", "02": "Fevereiro", "03": "Março", "04": "Abril",
        "05": "Maio", "06": "Junho", "07": "Julho", "08": "Agosto",
        "09": "Setembro", "10": "Outubro", "11": "Novembro", "12": "Dezembro"
    };

    Object.keys(MAPAS_POR_MES).forEach(chave => {
        if (chave.includes('-')) {
            const [ano, mesCod] = chave.split('-');
            if (ano) anosExistentes.add(ano);
            if (mesCod && mesesNomes[mesCod]) mesesExistentes.set(mesCod, mesesNomes[mesCod]);
        }
    });

    selectAno.innerHTML = '<option value="TODOS">ANO: TODOS</option>';
    Array.from(anosExistentes).sort((a, b) => b - a).forEach(ano => {
        selectAno.innerHTML += `<option value="${ano}">${ano}</option>`;
    });

    selectMes.innerHTML = '<option value="TODOS">MÊS: TODOS</option>';
    Array.from(mesesExistentes.keys()).sort((a, b) => parseInt(a) - parseInt(b)).forEach(cod => {
        selectMes.innerHTML += `<option value="${cod}">${mesesNomes[cod].toUpperCase()}</option>`;
    });

    selectAno.value = anoSelecionado;
    selectMes.value = mesSelecionado;

    if (!selectAno.dataset.hasListener) {
        selectAno.addEventListener('change', filtrarEAplicarDados);
        selectAno.dataset.hasListener = "true";
    }
    if (!selectMes.dataset.hasListener) {
        selectMes.addEventListener('change', filtrarEAplicarDados);
        selectMes.dataset.hasListener = "true";
    }
}

function filtrarEAplicarDados() {
    const container = document.getElementById('grid-modos');
    const selectAno = document.getElementById('select-ano');
    const selectMes = document.getElementById('select-mes');

    let anoAlvo = selectAno ? selectAno.value : "TODOS";
    let mesAlvo = selectMes ? selectMes.value : "TODOS";
    let mesChave = (anoAlvo !== "TODOS" && mesAlvo !== "TODOS") ? `${anoAlvo}-${mesAlvo}` : "TODOS";

    // 1. Identificar quais mapas são permitidos com base nos filtros selecionados
    let mapasPermitidos = [];
    Object.keys(MAPAS_POR_MES).forEach(chave => {
        const [ano, mesCod] = chave.split('-');
        const matchAno = (anoAlvo === "TODOS" || ano === anoAlvo);
        const matchMes = (mesAlvo === "TODOS" || mesCod === mesAlvo);

        if (matchAno && matchMes) {
            Object.values(MAPAS_POR_MES[chave]).forEach(listaMapas => {
                listaMapas.forEach(mapa => mapasPermitidos.push(mapa.toLowerCase()));
            });
        }
    });

    // 2. Filtrar os dados originais da região
    // Se "TODOS" em ambos, retorna tudo. Se filtrado, filtra pelo nome do mapa.
    let dadosFiltrados = [];
    if (anoAlvo === "TODOS" && mesAlvo === "TODOS") {
        dadosFiltrados = dadosOriginaisRegiao;
    } else {
        dadosFiltrados = dadosOriginaisRegiao.filter(i => 
            i.mapa && mapasPermitidos.includes(i.mapa.toLowerCase())
        );
    }

    // 3. Atualizar as duas seções da UI com os mesmos dados filtrados
    renderizarDinamico(dadosFiltrados, container, mesChave);
    renderizarTabelaAllMaps(dadosFiltrados);
}

function renderizarTabelaAllMaps(dados) {
    const tbody = document.getElementById('tbody-all-maps');
    if (!tbody) return;

    const stats = {};
    dados.forEach(i => {
        const n = i.pick || i.brawler;
        if (!n) return;
        if (!stats[n]) stats[n] = { p: 0, v: 0 };
        stats[n].p += Number(i.picks || 1);
        stats[n].v += Number(i.vitorias || i.win || 0);
    });

    const lista = Object.keys(stats).map(n => ({
        nome: n, 
        picks: stats[n].p, 
        wins: stats[n].v, 
        wr: stats[n].p > 0 ? (stats[n].v / stats[n].p) * 100 : 0
    })).sort((a, b) => b.picks - a.picks);

    tbody.innerHTML = lista.map(b => `
        <tr>
            <td><img src="${formatarNomeImagem(b.nome)}" onerror="this.src='brawlers/default.png';"></td>
            <td style="text-align: left !important; padding-left: 15px !important;">${b.nome.toUpperCase()}</td>
            <td>${b.picks}</td>
            <td>${b.wins}</td>
            <td class="${obterClasseColorida(b.wr)}">${b.wr.toFixed(1)}%</td>
        </tr>
    `).join('');
}

function renderizarDinamico(dados, container, mesChave) {
    container.innerHTML = ""; 

    let estruturaVisual = {};

    if (mesChave !== "TODOS" && MAPAS_POR_MES[mesChave]) {
        estruturaVisual = MAPAS_POR_MES[mesChave];
    } else {
        const selectAno = document.getElementById('select-ano');
        const selectMes = document.getElementById('select-mes');
        let anoAlvo = selectAno ? selectAno.value : "TODOS";
        let mesAlvo = selectMes ? selectMes.value : "TODOS";

        Object.keys(MAPAS_POR_MES).forEach(chave => {
            const [ano, mesCod] = chave.split('-');
            const matchAno = (anoAlvo === "TODOS" || ano === anoAlvo);
            const matchMes = (mesAlvo === "TODOS" || mesCod === mesAlvo);

            if (matchAno && matchMes) {
                Object.keys(MAPAS_POR_MES[chave]).forEach(modo => {
                    if (!estruturaVisual[modo]) estruturaVisual[modo] = [];
                    MAPAS_POR_MES[chave][modo].forEach(mapa => {
                        if (!estruturaVisual[modo].includes(mapa)) estruturaVisual[modo].push(mapa);
                    });
                });
            }
        });
    }

    Object.keys(estruturaVisual).forEach(modo => {
        const section = document.createElement('div');
        section.className = 'modo-section';
        let mapasHTML = "";

        estruturaVisual[modo].forEach(mapa => {
            const filtrados = dados.filter(i => i.modo?.toLowerCase() === modo.toLowerCase() && i.mapa?.toLowerCase() === mapa.toLowerCase());
            
            if (filtrados.length > 0) {
                const statsMapa = {};
                filtrados.forEach(i => {
                    const bName = i.pick || i.brawler;
                    if (!bName) return;
                    if (!statsMapa[bName]) statsMapa[bName] = { p: 0, v: 0 };
                    statsMapa[bName].p += Number(i.picks || 1);
                    statsMapa[bName].v += Number(i.vitorias || i.win || 0);
                });

                const listaMapaOrdenada = Object.keys(statsMapa).map(bName => {
                    const p = statsMapa[bName].p;
                    const v = statsMapa[bName].v;
                    const wr = p > 0 ? (v / p * 100) : 0;
                    return { nome: bName, picks: p, vitorias: v, winRate: wr };
                }).sort((a, b) => b.winRate - a.winRate);

                const rows = listaMapaOrdenada.map(b => `
                    <tr>
                        <td><img src="${formatarNomeImagem(b.nome)}" onerror="this.src='brawlers/default.png';"></td>
                        <td style="text-align: left !important; padding-left: 15px !important;">${b.nome}</td>
                        <td>${b.picks}</td>
                        <td>${b.vitorias}</td>
                        <td class="${obterClasseColorida(b.winRate)}">${b.winRate.toFixed(1)}%</td>
                    </tr>`).join('');

                mapasHTML += `
                    <div class="mapa-container" style="margin-bottom:10px;">
                        <div class="modo-header" style="background:#0a0a0a; font-size:0.9rem;" onclick="toggleElemento(this)">${mapa.toUpperCase()} <span>▶</span></div>
                        <div class="mapa-content" style="display:none">
                            <table class="excel-table">
                                <thead>
                                    <tr>
                                        <th>IMG</th>
                                        <th style="text-align:left" onclick="ordenarTabela(this, 'string')" class="sortable">BRAWLER ↕</th>
                                        <th onclick="ordenarTabela(this, 'number')" class="sortable">PICKS ↕</th>
                                        <th onclick="ordenarTabela(this, 'number')" class="sortable">WINS ↕</th>
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
            const nomeExibicaoModo = modo.replace(/([A-Z])/g, ' $1').trim().toUpperCase();
            section.innerHTML = `
                <div class="modo-header" onclick="toggleElemento(this)">${nomeExibicaoModo} <span>▶</span></div>
                <div class="mapa-content" style="display:none">${mapasHTML}</div>`;
            container.appendChild(section);
        }
    });
}
