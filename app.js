const MAPAS_ALVO = {
    "brawlBall": ["Super Beach", "Pinhole Punt", "Sneaky Fields"],
    "bounty": ["Shooting Star", "Hideout", "Layer Cake"],
    "heist": ["Hot Potato", "Safe Zone", "Bridge Too Far"],
    "knockout": ["Goldarm Gulch", "Belle's Rock", "Out in the Open"],
    "gemGrab": ["Hard Rock Mine", "Double Swoosh", "Deathcap Trap"],
    "hotZone": ["Ring of Fire", "Open Business", "Dueling Beetles"]
};

const formatarNomeImagem = (n) => `brawlers/${n.toLowerCase().replace(/[^a-z0-9]/g, "")}.png`;

const obterClasseColorida = (wr) => {
    const v = parseFloat(wr);
    if (v >= 80) return 'wr-80';
    if (v >= 60) return 'wr-60-70';
    if (v >= 50) return 'wr-50';
    return 'wr-30';
};

// Função de abrir/fechar (Toggle)
function toggleElemento(header) {
    const content = header.nextElementSibling;
    if (!content) return;
    const isHidden = content.style.display === "none" || content.style.display === "";
    content.style.display = isHidden ? "block" : "none";
    const seta = header.querySelector('span');
    if (seta) seta.style.transform = isHidden ? "rotate(90deg)" : "rotate(0deg)";
}

async function carregarRegiao(sigla) {
    const container = document.getElementById('grid-modos');
    if (!container) return;
    container.innerHTML = `<h2 style="text-align:center; color:white; margin-top:50px;">CARREGANDO...</h2>`;

    try {
        const res = await fetch(`api/stats/${sigla.toLowerCase()}.json`);
        const dados = await res.json();
        renderizarDinamico(dados, container);
        renderizarTabelaAllMaps(dados); 
    } catch (e) {
        container.innerHTML = `<h2 style="text-align:center; color:white;">ERRO AO CARREGAR DADOS</h2>`;
    }
}

// Renderiza a Tabela Geral (Inferior) com 5 Colunas
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

// Renderiza os 5 Modos Dinamicamente
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
                                <thead><tr><th>IMG</th><th>BRAWLER</th><th>PICKS</th><th>WINS</th><th>WR%</th></tr></thead>
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
