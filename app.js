// --- CONFIGURAÇÃO DOS MAPAS POR MÊS ---
// Aqui você define exatamente os 3 mapas de cada modo para cada ano/mês (Formato: AAAA-MM)
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
    // Você pode ir adicionando os próximos meses aqui seguindo o mesmo padrão...
};

// Lista padrão de todos os modos do jogo para renderização
const MODOS_DO_JOGO = ["brawlBall", "bounty", "heist", "knockout", "gemGrab", "hotZone"];

// Armazenamento global dos dados originais da região ativa
let dadosOriginaisRegiao = [];

// Formatação do link das imagens removendo caracteres especiais e espaços
const formatarNomeImagem = (n) => `brawlers/${n.toLowerCase().replace(/[^a-z0-9]/g, "")}.png`;

// Retorna a classe CSS de cor correspondente à taxa de vitória
const obterClasseColorida = (wr) => {
    const v = parseFloat(wr);
    if (v >= 80) return 'wr-80';
    if (v >= 60) return 'wr-60-70';
    if (v >= 50) return 'wr-50';
    return 'wr-30';
};

/**
 * Auxiliar para ler o tempo do JSON de forma flexível e robusta
 */
function obterAnoEMes(item) {
    // Tratamento direto se o Python já gerou as chaves 'ano' e 'mes' explícitas
    if (item.ano && item.mes) {
        const mesesNomesInvertido = {
            "JANEIRO": "01", "FEVEREIRO": "02", "MARÇO": "03", "ABRIL": "04",
            "MAIO": "05", "JUNHO": "06", "JULHO": "07", "AGOSTO": "08",
            "SETEMBRO": "09", "OUTUBRO": "10", "NOVEMBRO": "11", "DEZEMBRO": "12"
        };
        const anoStr = String(item.ano).toUpperCase();
        if (anoStr === "ANTIGO" || anoStr === "ANTIGA") {
            return { ano: "ANTIGO", mesCodigo: "ANTIGO", mesNome: "ANTIGO" };
        }
        const mesChave = String(item.mes).toUpperCase();
        const mesCod = mesesNomesInvertido[mesChave] || "SEM DATA";
        const mesNomeFormatado = mesChave.charAt(0) + mesChave.slice(1).toLowerCase();
        return { ano: anoStr, mesCodigo: mesCod, mesNome: mesNomeFormatado };
    }

    // Fallback de contingência analisando as propriedades 'data' ou 'data_adicao'
    const campoData = item.data || item.data_adicao;
    if (!campoData) return { ano: "SEM DATA", mesCodigo: "SEM DATA", mesNome: "SEM DATA" };
    
    const dataStr = String(campoData).trim().toUpperCase();
    if (dataStr === "ANTIGO" || dataStr === "ANTIGA") {
        return { ano: "ANTIGO", mesCodigo: "ANTIGO", mesNome: "ANTIGO" };
    }
    
    let ano = "", mesCodigo = "";
    if (dataStr.includes('-')) {
        const partes = dataStr.split('-');
        ano = partes[0];
        mesCodigo = partes[1];
    } else if (dataStr.includes('/')) {
        const partes = dataStr.split(' ')[0].split('/');
        if (partes.length === 3) {
            ano = partes[2];
            mesCodigo = partes[1];
        }
    }

    const mesesNomes = {
        "01": "Janeiro", "02": "Fevereiro", "03": "Março", "04": "Abril",
        "05": "Maio", "06": "Junho", "07": "Julho", "08": "Agosto",
        "09": "Setembro", "10": "Outubro", "11": "Novembro", "12": "Dezembro"
    };

    return {
        ano: ano || "SEM DATA",
        mesCodigo: mesCodigo || "SEM DATA",
        mesNome: mesesNomes[mesCodigo] || "Desconhecido"
    };
}

/**
 * Controla a expansão e colapso de seções (Accordion) com rotação do ícone
 */
function toggleElemento(header) {
    const content = header.nextElementSibling;
    if (!content) return;
    const isHidden = content.style.display === "none" || content.style.display === "";
    content.style.display = isHidden ? "block" : "none";
    const seta = header.querySelector('span');
    if (seta) seta.style.transform = isHidden ? "rotate(90deg)" : "rotate(0deg)";
}

/**
 * Ordenação interativa de tabelas ao clicar no cabeçalho das colunas (.sortable)
 */
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

/**
 * Consome os dados JSON da API e inicializa os filtros da região ativa
 */
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

/**
 * Reconstrói dinamicamente os menus de seleção <select> baseando-se no histórico
 */
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
        if (infoTempo.ano && infoTempo.ano !== "SEM DATA") {
            anosExistentes.add(infoTempo.ano);
        }
        if (infoTempo.mesCodigo && infoTempo.mesCodigo !== "SEM DATA" && infoTempo.mesCodigo !== "ANTIGO") {
            mesesExistentes.add(JSON.stringify({ cod: infoTempo.mesCodigo, nome: infoTempo.mesNome }));
        }
    });

    // Ordena as opções inserindo registros legados ao fim da lista
    Array.from(anosExistentes).sort((a, b) => {
        if (a === "ANTIGO") return 1;
        if (b === "ANTIGO") return -1;
        return b - a;
    }).forEach(ano => {
        selectAno.innerHTML += `<option value="${ano}">${ano === "ANTIGO" ? "DADOS LEGADOS (ANTIGOS)" : ano}</option>`;
    });

    Array.from(mesesExistentes).map(m => JSON.parse(m))
        .sort((a, b) => parseInt(a.cod) - parseInt(b.cod))
        .forEach(m => {
            selectMes.innerHTML += `<option value="${m.cod}">${m.nome.toUpperCase()}</option>`;
        });

    // Registra os ouvintes (listeners) evitando duplicação
    if (!selectAno.dataset.hasListener) {
        selectAno.addEventListener('change', () => {
            if (selectAno.value === "ANTIGO") {
                selectMes.value = "TODOS";
                selectMes.disabled = true;
            } else {
                selectMes.disabled = false;
            }
            filtrarEAplicarDados();
        });
        selectAno.dataset.hasListener = "true";
    }

    if (!selectMes.dataset.hasListener) {
        selectMes.addEventListener('change', filtrarEAplicarDados);
        selectMes.dataset.hasListener = "true";
    }
}

/**
 * Filtra a matriz bruta e comanda a atualização dos blocos visuais na tela
 */
function filtrarEAplicarDados() {
    const container = document.getElementById('grid-modos');
    const selectAno = document.getElementById('select-ano');
    const selectMes = document.getElementById('select-mes');

    let anoAlvo = selectAno ? selectAno.value : "TODOS";
    let mesAlvo = selectMes ? selectMes.value : "TODOS";

    let dadosFiltrados = dadosOriginaisRegiao.filter(item => {
        const infoTempo = obterAnoEMes(item);
        const matchAno = (anoAlvo === "TODOS" || infoTempo.ano === anoAlvo);
        const matchMes = (mesAlvo === "TODOS" || infoTempo.mesCodigo === mesAlvo);
        return matchAno && matchMes;
    });

    let mesChave = (anoAlvo !== "TODOS" && anoAlvo !== "ANTIGO" && mesAlvo !== "TODOS") ? `${anoAlvo}-${mesAlvo}` : "TODOS";

    renderizarDinamico(dadosFiltrados, container, mesChave);
    renderizarTabelaAllMaps(dadosFiltrados);
}

/**
 * Agrupa, consolida e renderiza o painel unificado "ALL MAPS ANALYSIS"
 */
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

/**
 * Renderiza os Modos e Mapas respeitando os agrupamentos e a rotação ativa
 */
function renderizarDinamico(dados, container, mesChave) {
    container.innerHTML = ""; 

    MODOS_DO_JOGO.forEach(modo => {
        const section = document.createElement('div');
        section.className = 'modo-section';
        let mapasHTML = "";

        let mapasAlvo = [];
        
        // Aplicação do Pool de Mapas estrito ou dinâmico por varredura
        if (mesChave !== "TODOS" && MAPAS_POR_MES[mesChave] && MAPAS_POR_MES[mesChave][modo]) {
            mapasAlvo = MAPAS_POR_MES[mesChave][modo];
        } else {
            const encontrados = dados
                .filter(i => i.modo?.toLowerCase() === modo.toLowerCase() && i.mapa)
                .map(i => i.mapa);
            mapasAlvo = Array.from(new Set(encontrados));
        }

        mapasAlvo.forEach(mapa => {
            const filtrados = dados.filter(i => i.modo?.toLowerCase() === modo.toLowerCase() && i.mapa?.toLowerCase() === mapa.toLowerCase());
            
            if (filtrados.length > 0) {
                // 🌟 CORREÇÃO DE ACUMULAÇÃO: Agrupa registros temporais do brawler para evitar duplicados no mesmo mapa
                const statsMapa = {};
                filtrados.forEach(i => {
                    const bName = i.pick || i.brawler;
                    if (!bName) return;
                    if (!statsMapa[bName]) statsMapa[bName] = { p: 0, v: 0 };
                    statsMapa[bName].p += Number(i.picks || 1);
                    statsMapa[bName].v += Number(i.vitorias || i.win || 0);
                });

                // Converte em array calculado e aplica a ordenação pelo maior Win Rate (Padrão dos Mapas)
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
            section.innerHTML = `
                <div class="modo-header" onclick="toggleElemento(this)">${modo.toUpperCase()} <span>▶</span></div>
                <div class="mapa-content" style="display:none">${mapasHTML}</div>`;
            container.appendChild(section);
        }
    });
}
