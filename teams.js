// --- CONFIGURAÇÃO UTILS (Do seu app.js) ---
const obterClasseColorida = (wr) => {
    const v = parseFloat(wr);
    if (v >= 80) return 'wr-80';
    if (v >= 60) return 'wr-60-70';
    if (v >= 50) return 'wr-50';
    return 'wr-30';
};

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

// --- LOGICA DE RENDERIZAÇÃO DA PÁGINA ---
async function carregarDadosPagina() {
    // container onde a tabela vai entrar
    const container = document.getElementById('tabela-stats-team');
    if (!container) return;

    // Detecta qual página está usando o script ('player' ou 'coach')
    const alvo = typeof CATEGORIA_PAGINA !== 'undefined' ? CATEGORIA_PAGINA : 'player';
    const urlAPI = `api/stats_team/${alvo}.json`;

    try {
        const res = await fetch(urlAPI);
        if (!res.ok) throw new Error("Arquivo não encontrado");
        
        const dadosBrutos = await res.json();
        
        // Consolida o JSON agrupando por nome de Brawler
        const dadosAgrupados = consolidarPorBrawler(dadosBrutos);

        if (dadosAgrupados.length > 0) {
            renderizarTabelaFinal(dadosAgrupados, container);
        } else {
            container.innerHTML = `<div class="loading-status">NENHUM DADO GERADO PARA ESTA CATEGORIA.</div>`;
        }
    } catch (e) {
        container.innerHTML = `<div class="loading-status">ERRO AO CARREGAR OS DADOS (${alvo.toUpperCase()}). CERTIFIQUE-SE DE EXECUTAR O PYTHON PRIMEIRO.</div>`;
        console.error(e);
    }
}

function consolidarPorBrawler(dados) {
    const brawlers = {};

    dados.forEach(item => {
        const nomeBrawler = item.pick.toUpperCase();
        if (!brawlers[nomeBrawler]) {
            brawlers[nomeBrawler] = { nome: nomeBrawler, picks: 0, vitorias: 0 };
        }
        brawlers[nomeBrawler].picks += parseInt(item.picks || 0);
        brawlers[nomeBrawler].vitorias += parseInt(item.vitorias || 0);
    });

    return Object.values(brawlers);
}

function renderizarTabelaFinal(listaBrawlers, container) {
    const rowsHTML = listaBrawlers.map(b => {
        const wr = b.picks > 0 ? (b.vitorias / b.picks) * 100 : 0;
        return `
            <tr>
                <td style="text-align: left !important; padding-left: 15px !important; font-weight: bold;">${b.nome}</td>
                <td>${b.picks}</td>
                <td>${b.vitorias}</td>
                <td class="${obterClasseColorida(wr)}">${wr.toFixed(1)}%</td>
            </tr>
        `;
    }).join('');

    container.innerHTML = `
        <table class="excel-table">
            <thead>
                <tr>
                    <th style="text-align:left" onclick="ordenarTabela(this, 'string')" class="sortable">BRAWLER ↕</th>
                    <th onclick="ordenarTabela(this, 'number')" class="sortable">PICKS ↕</th>
                    <th onclick="ordenarTabela(this, 'number')" class="sortable">VITÓRIAS ↕</th>
                    <th onclick="ordenarTabela(this, 'percent')" class="sortable">WIN RATE ↕</th>
                </tr>
            </thead>
            <tbody>
                ${rowsHTML}
            </tbody>
        </table>
    `;
}

// Inicializa a chamada automática baseado na página aberta
carregarDadosPagina();
