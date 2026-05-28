Compreendido perfeitamente! Investigando a arquitetura do seu projeto, descobri a causa raiz dos dois problemas:

1. **O Filtro só mostrando "TODOS":** O seu script Python backend (`gerador.py`) consolida as estatísticas agrupando os dados apenas por `['modo', 'mapa', 'pick']`. Portanto, os arquivos JSON finais gerados (como `sa.json`) **não possuem propriedades de data dentro de cada linha**. Como o JS tentava ler datas do JSON que não existiam, as listas ficavam vazias e presas no "TODOS". **A Solução:** Agora o script gera as opções de Anos e Meses dinamicamente a partir das chaves do seu dicionário de configurações `MAPAS_POR_MES`.
2. **Exibição excessiva de Modos/Mapas:** O código anterior buscava indiscriminadamente tudo o que existia no arquivo JSON. **A Solução:** Reescrevi a função de renderização para que ela use **estritamente** a árvore estruturada em `MAPAS_POR_MES`. Se você não cadastrou um modo ou um mapa ali para o período selecionado, ele simplesmente não existirá na tela.

Aqui está o código definitivo e corrigido para o seu **`app.js`**:

```javascript
// --- CONFIGURAÇÃO DOS MAPAS POR MÊS ---
// Aqui você define exatamente os mapas de cada modo para cada ano/mês (Formato: AAAA-MM)
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
 * RESOLVIDO: Monta as caixas de seleção baseando-se estritamente no seu MAPAS_POR_MES
 */
function gerarOpcoesDosFiltros() {
    const selectAno = document.getElementById('select-ano');
    const selectMes = document.getElementById('select-mes');
    if (!selectAno || !selectMes) return;

    // Preserva a seleção atual do usuário para não resetar a navegação
    const anoSelecionado = selectAno.value || "TODOS";
    const mesSelecionado = selectMes.value || "TODOS";

    const anosExistentes = new Set();
    const mesesExistentes = new Map(); // Codigo -> Nome em string

    const mesesNomes = {
        "01": "Janeiro", "02": "Fevereiro", "03": "Março", "04": "Abril",
        "05": "Maio", "06": "Junho", "07": "Julho", "08": "Agosto",
        "09": "Setembro", "10": "Outubro", "11": "Novembro", "12": "Dezembro"
    };

    // Varre o MAPAS_POR_MES para descobrir quais datas você configurou manualmente
    Object.keys(MAPAS_POR_MES).forEach(chave => {
        if (chave.includes('-')) {
            const [ano, mesCod] = chave.split('-');
            if (ano) anosExistentes.add(ano);
            if (mesCod && mesesNomes[mesCod]) {
                mesesExistentes.set(mesCod, mesesNomes[mesCod]);
            }
        }
    });

    // Popula o seletor de Anos
    selectAno.innerHTML = '<option value="TODOS">ANO: TODOS</option>';
    Array.from(anosExistentes).sort((a, b) => b - a).forEach(ano => {
        selectAno.innerHTML += `<option value="${ano}">${ano}</option>`;
    });

    // Popula o seletor de Meses
    selectMes.innerHTML = '<option value="TODOS">MÊS: TODOS</option>';
    Array.from(mesesExistentes.keys()).sort((a, b) => parseInt(a) - parseInt(b)).forEach(cod => {
        selectMes.innerHTML += `<option value="${cod}">${mesesExistentes.get(cod).toUpperCase()}</option>`;
    });

    // Restaura o estado anterior se ele ainda fizer sentido na lista
    selectAno.value = anoSelecionado;
    selectMes.value = mesSelecionado;

    // Vincula os manipuladores de eventos evitando escutas duplicadas
    if (!selectAno.dataset.hasListener) {
        selectAno.addEventListener('change', filtrarEAplicarDados);
        selectAno.dataset.hasListener = "true";
    }
    if (!selectMes.dataset.hasListener) {
        selectMes.addEventListener('change', filtrarEAplicarDados);
        selectMes.dataset.hasListener = "true";
    }
}

/**
 * Controla os escopos de pool e gerencia o filtro de atualização
 */
function filtrarEAplicarDados() {
    const container = document.getElementById('grid-modos');
    const selectAno = document.getElementById('select-ano');
    const selectMes = document.getElementById('select-mes');

    let anoAlvo = selectAno ? selectAno.value : "TODOS";
    let mesAlvo = selectMes ? selectMes.value : "TODOS";

    let mesChave = (anoAlvo !== "TODOS" && mesAlvo !== "TODOS") ? `${anoAlvo}-${mesAlvo}` : "TODOS";

    // Atualiza a visualização dos modos e mapas rotativos
    renderizarDinamico(dadosOriginaisRegiao, container, mesChave);
    
    // Filtra inteligentemente a tabela unificada inferior "All Maps Analysis" 
    // para mostrar apenas brawlers baseados no escopo temporal ativo
    let dadosTabelaGeral = dadosOriginaisRegiao;
    const mapasPermitidos = [];

    Object.keys(MAPAS_POR_MES).forEach(chave => {
        const [ano, mesCod] = chave.split('-');
        const matchAno = (anoAlvo === "TODOS" || ano === anoAlvo);
        const matchMes = (mesAlvo === "TODOS" || mesCod === mesAlvo);

        if (matchAno && matchMes) {
            Object.keys(MAPAS_POR_MES[chave]).forEach(modo => {
                MAPAS_POR_MES[chave][modo].forEach(mapa => {
                    mapasPermitidos.push(mapa.toLowerCase());
                });
            });
        }
    });

    if (anoAlvo !== "TODOS" || mesAlvo !== "TODOS") {
        dadosTabelaGeral = dadosOriginaisRegiao.filter(i => i.mapa && mapasPermitidos.includes(i.mapa.toLowerCase()));
    }

    renderizarTabelaAllMaps(dadosTabelaGeral);
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
 * RESOLVIDO: Renderiza APENAS os modos e mapas que você colocou nas configurações
 */
function renderizarDinamico(dados, container, mesChave) {
    container.innerHTML = ""; 

    let estruturaVisual = {};

    // 1. Constrói a estrutura visual de exibição baseada estritamente no seu MAPAS_POR_MES
    if (mesChave !== "TODOS" && MAPAS_POR_MES[mesChave]) {
        // Se um mês específico e exato for selecionado
        Object.keys(MAPAS_POR_MES[mesChave]).forEach(modo => {
            estruturaVisual[modo] = MAPAS_POR_MES[mesChave][modo];
        });
    } else {
        // Se estiver em "TODOS" ou filtrado parcialmente por Ano/Mês
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
                    if (!estruturaVisual[modo]) {
                        estruturaVisual[modo] = [];
                    }
                    MAPAS_POR_MES[chave][modo].forEach(mapa => {
                        if (!estruturaVisual[modo].includes(mapa)) {
                            estruturaVisual[modo].push(mapa);
                        }
                    });
                });
            }
        });
    }

    // 2. Transforma a estrutura visual permitida em tabelas HTML na tela
    Object.keys(estruturaVisual).forEach(modo => {
        const section = document.createElement('div');
        section.className = 'modo-section';
        let mapasHTML = "";

        const mapasAlvo = estruturaVisual[modo];

        mapasAlvo.forEach(mapa => {
            // Varre o arquivo JSON filtrando os dados que pertencem a este modo e mapa específicos
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
            // Formata o nome interno ex: "brawlBall" para exibição amigável "BRAWL BALL"
            const nomeExibicaoModo = modo.replace(/([A-Z])/g, ' $1').trim().toUpperCase();
            section.innerHTML = `
                <div class="modo-header" onclick="toggleElemento(this)">${nomeExibicaoModo} <span>▶</span></div>
                <div class="mapa-content" style="display:none">${mapasHTML}</div>`;
            container.appendChild(section);
        }
    });
}

```
