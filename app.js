const MAPAS_ALVO = {
    "brawlBall": ["Super Beach", "Pinhole Punt", "Sneaky Fields"],
    "bounty": ["Shooting Star", "Hideout", "Layer Cake"],
    "heist": ["Hot Potato", "Safe Zone", "Bridge Too Far"],
    "knockout": ["Goldarm Gulch", "Belle's Rock", "Out in the Open"],
    "gemGrab": ["Hard Rock Mine", "Double Swoosh", "Deathcap Trap"],
    "hotZone": ["Ring of Fire", "Open Business", "Dueling Beetles"]
};

// Armazenamento global dos dados originais da região ativa
let dadosOriginaisRegiao = [];

const formatarNomeImagem = (n) => `brawlers/${n.toLowerCase().replace(/[^a-z0-9]/g, "")}.png`;

const obterClasseColorida = (wr) => {
    const v = parseFloat(wr);
    if (v >= 80) return 'wr-80';
    if (v >= 60) return 'wr-60-70';
    if (v >= 50) return 'wr-50';
    return 'wr-30';
};

// Auxiliar para ler a data do JSON e quebrar em Ano e Mês por extenso
function obterAnoEMes(item) {
    if (!item.data) return { ano: "SEM DATA", mesCodigo: "SEM DATA", mesNome: "SEM DATA" };
    
    let ano = "", mesCodigo = "";
    if (item.data.includes('-')) {
        const partes = item.data.split('-');
        ano = partes[0];
        mesCodigo = partes[1];
    } else if (item.data.includes('/')) {
        const partes = item.data.split('/');
        ano = partes[2];
        mesCodigo = partes[1];
    }

    const mesesNomes = {
        "01": "Janeiro", "02": "Fevereiro", "03": "Março", "04": "Abril",
        "05": "Maio", "06": "Junho", "07": "Julho", "08": "Agosto",
        "09": "Setembro", "10": "Outubro", "11": "Novembro", "12": "Dezembro"
    };

    return {
        ano: ano,
        mesCodigo: mesCodigo,
        mesNome: mesesNomes[mesCodigo] || "Desconhecido"
    };
}

// Função de abrir/fechar (Toggle)
function toggleElemento(header) {
    const content = header.nextElementSibling;
    if (!content) return;
    const isHidden = content.style.display === "none" || content.style.display === "";
    content.style.display = isHidden ? "block" : "none";
    const seta = header.querySelector('span');
    if (seta) seta.style.transform = isHidden ? "rotate(90deg)" : "rotate(0deg)";
}

// LÓGICA DE FILTRO E ORDENAÇÃO POR CATEGORIAS (Brawler, Picks, Wins, WR)
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

// Carrega os dados brutos e gera a interface de tempo
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

// Monta as caixas de seleção de Ano e Mês dinamicamente baseado no JSON carregado
function gerarOpcoesDosFiltros() {
    const selectAno = document.getElementById('select-ano');
    const selectMes = document.getElementById('select-mes');
    if (!selectAno || !selectMes) return;

    selectAno.innerHTML = '<option value="TODOS">ANO: TODOS</option>';
    selectMes.innerHTML = '<option value="TODOS">MÊS: TODOS</option>';

    const anosExistentes = new Set();
    const mesesExistentes = new Set();

    dadosOriginaisRegiao.forEach(item => {
        const infoTempo = obterAnoEMes(item);
        if (infoTempo.ano && infoTempo.ano !== "SEM DATA") anosExistentes.add(infoTempo.ano);
        if (infoTempo.mesCodigo && infoTempo.mesCodigo !== "SEM DATA") {
            mesesExistentes.add(JSON.stringify({ cod: infoTempo.mesCodigo, nome: infoTempo.mesNome }));
        }
    });

    // Adiciona anos encontrados de forma decrescente
    Array.from(anosExistentes).sort((a, b) => b - a).forEach(ano => {
        selectAno.innerHTML += `<option value="${ano}">${ano}</option>`;
    });

    // Adiciona meses encontrados de forma crescente
    Array.from(mesesExistentes).map(m => JSON.parse(m))
        .sort((a, b) => parseInt(a.cod) - parseInt(b.cod))
        .forEach(m => {
            selectMes.innerHTML += `<option value="${m.cod}">${m.nome.toUpperCase()}</option>`;
        });
}

// Executa a filtragem por tempo e reconstrói as tabelas na tela
function filtrarEAplicarDados() {
    const container = document.getElementById('grid-modos');
    const selectAno = document.getElementById('select-ano');
    const selectMes = document.getElementById('select-mes');

    let anoAlvo = selectAno ? selectAno.value : "TODOS";
    let mesAlvo = selectMes ? selectMes.value : "TODOS";

    // Filtra a matriz bruta conforme a escolha do usuário
    let dadosFiltrados = dadosOriginaisRegiao.filter(item => {
        const infoTempo = obterAnoEMes(item);
        const matchAno = (anoAlvo === "TODOS" || infoTempo.ano === anoAlvo);
        const matchMes = (mesAlvo === "TODOS" || infoTempo.mesCodigo === mesAlvo);
        return matchAno && matchMes;
    });

    // Renderiza as seções individuais e a tabela unificada
    renderizarDinamico(dadosFiltrados, container);
    renderizarTabelaAllMaps(dadosFiltrados);
}

// Renderiza a Tabela Geral Combinada (All Maps Analysis)
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
        nome: n, picks: stats[n].p, wins: stats[n].v, wr: (stats[n].v / stats[n].p) * 100
    })).sort((a, b) => b.picks - a.picks);

    tbody.innerHTML = lista.map(b => `
        <tr>
            <td><img src="${formatarNomeImagem(b.nome)}" onerror="this.src='brawlers/default.png';"></td>
            <td>${b.nome.toUpperCase()}</td>
            <td>${b.picks}</td>
            <td>${b.wins}</td>
            <td class="${obterClasseColorida(b.wr)}">${b.wr.toFixed(1)}%</td>
        </tr>
    `).join('');
}

// Renderiza os Modos e Mapas Dinamicamente
function renderizarDinamico(dados, container) {
    container.innerHTML = ""; 
    Object.keys(MAPAS_ALVO).forEach(modo => {
        const section = document.createElement('div');
        section.className = 'modo-section';
        let mapasHTML = "";

        MAPAS_ALVO[modo].forEach(mapa => {
            const filtrados = dados.filter(i => i.modo?.toLowerCase() === modo.toLowerCase() && i.mapa?.toLowerCase() === mapa.toLowerCase());
            if (filtrados.length > 0) {
                const rows = filtrados.sort((a,b) => parseFloat(b.win_rate) - parseFloat(a.win_rate)).map(b => `
                    <tr>
                        <td><img src="${formatarNomeImagem(b.pick || b.brawler)}"></td>
                        <td>${b.pick || b.brawler}</td>
                        <td>${b.picks || 1}</td>
                        <td>${b.vitorias || b.win || 0}</td>
                        <td class="${obterClasseColorida(b.win_rate)}">${b.win_rate}</td>
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
            section.innerHTML = `
                <div class="modo-header" onclick="toggleElemento(this)">${modo.toUpperCase()} <span>▶</span></div>
                <div class="mapa-content" style="display:none">${mapasHTML}</div>`;
            container.appendChild(section);
        }
    });
}
