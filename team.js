// --- CONFIGURAÇÃO E IDs ---
const IDS_ESPECIFICOS = ['12345', '67890', '11223']; // Substitua pelos IDs reais

// --- FUNÇÕES UTILITÁRIAS (Do app.js) ---
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

    // Resetar outros headers
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

// --- LÓGICA DE CARREGAMENTO ---
async function carregarTeams() {
    const container = document.getElementById('grid-teams');
    if (!container) return;
    container.innerHTML = `<h2 style="text-align:center; color:white;">CARREGANDO TEAMS...</h2>`;

    try {
        const res = await fetch('teams.csv');
        const csvText = await res.text();
        const dados = parseCSV(csvText);

        // Filtra apenas pelos IDs permitidos
        const dadosFiltrados = dados.filter(i => IDS_ESPECIFICOS.includes(String(i.id)));
        
        renderizarTabelaTeams(dadosFiltrados);
    } catch (e) {
        container.innerHTML = `<h2 style="text-align:center; color:white;">ERRO AO CARREGAR DADOS</h2>`;
    }
}

// Converte CSV para JSON
function parseCSV(text) {
    const lines = text.split('\n').filter(line => line.trim() !== "");
    const headers = lines[0].split(',').map(h => h.trim());
    return lines.slice(1).map(line => {
        const values = line.split(',');
        return headers.reduce((obj, header, index) => {
            obj[header] = values[index] ? values[index].trim() : '';
            return obj;
        }, {});
    });
}

// --- RENDERIZAÇÃO ---
function renderizarTabelaTeams(dados) {
    const container = document.getElementById('grid-teams');
    
    // Calcula WR
    const lista = dados.map(t => {
        const p = Number(t.partidas || 0);
        const v = Number(t.vitorias || 0);
        return { ...t, wr: p > 0 ? (v / p) * 100 : 0 };
    });

    const rows = lista.map(t => `
        <tr>
            <td style="text-align: left !important; padding-left: 15px !important;">${t.nome}</td>
            <td>${t.partidas}</td>
            <td>${t.vitorias}</td>
            <td class="${obterClasseColorida(t.wr)}">${t.wr.toFixed(1)}%</td>
        </tr>
    `).join('');

    container.innerHTML = `
        <table class="excel-table">
            <thead>
                <tr>
                    <th style="text-align:left" onclick="ordenarTabela(this, 'string')" class="sortable">TIME ↕</th>
                    <th onclick="ordenarTabela(this, 'number')" class="sortable">PARTIDAS ↕</th>
                    <th onclick="ordenarTabela(this, 'number')" class="sortable">VITÓRIAS ↕</th>
                    <th onclick="ordenarTabela(this, 'percent')" class="sortable">WR% ↕</th>
                </tr>
            </thead>
            <tbody>${rows}</tbody>
        </table>
    `;
}

// Inicializa
carregarTeams();
