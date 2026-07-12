// --- DADOS DO SISTEMA ---
const { normalizeKey } = window.BSCUtils;

const MAPAS_ALVO = {
    "Brawl Ball": ["Super Beach", "Pinhole Punt", "Sneaky Fields", "Triple Dribble", "Pinhole Punt", "Pinball Dreams"],
    "Bounty": ["Shooting Star", "Hideout", "Layer Cake", "Dry Season"],
    "Heist": ["Hot Potato", "Safe Zone", "Bridge Too Far", "Pit Stop", "Kaboom Canyon"],
    "Knockout": ["Goldarm Gulch", "Belle's Rock", "Out in the Open", "New Horizons"],
    "Hot Zone": ["Ring of Fire", "Dueling Beetles", "Open Business"],
    "Gem Grab": ["Hard Rock Mine", "Double Swoosh", "Deathcap Trap", "Gem Fort"]
};

// SUBSTITUA PELOS SEUS DADOS DA PLANILHA (META)
const DADOS_META = {
    "Super Beach": ["Max", "Sandy", "Cordelius", "Melodie", "Stu", "Buster", "Charlie", "Rico", "Fang", "Colt"],
    "Pinhole Punt": [],
    "Sneaky Fields": [],
    "Shooting Star": [],
    "Hideout": [],
    "Layer Cake": [],
    "Hot Potato": [],
    "Safe Zone": [],
    "Bridge Too Far": [],
    "Goldarm Gulch": [],
    "Belle's Rock": [],
    "Out in the Open": [],
    "Hard Rock Mine": [],
    "Double Swoosh": [],
    "Deathcap Trap": []
};

// QUEM COUNTERA O BRAWLER SELECIONADO
const DADOS_COUNTERS = {
    "8-bit": ["Squeak", "Colette", "Belle", "Najia", "Crow", "Pierce", "Byron", "Penny", "Angelo", "Edgar"],
    "Alli": ["Otis", "Kenji", "Ruffs", "Bull", "Trunk", "Jacky", "Sirius", "Mortis", "Emz"],
    "Amber": ["Starr Nova", "Doug", "Bull", "Ash", "Angelo", "Nani", "Lily", "Mortis", "Edgar", "Bea", "Piper"],
    "Angelo": ["Eve", "Ruffs", "Charlie", "Belle", "Kenji", "Pierce", "Nani", "Byron", "Kaze", "Mina", "Leon", "Jae Yong"],
    "Ash": ["Frank", "Trunk", "Edgar", "Rico", "Shade", "Sirius", "Kenji", "Griff"],
    "Barley": ["Mortis", "Kenji", "Edgar", "Cordelius", "Trunk", "Mico", "Colt"],
    "Bea": ["Charlie", "Ruffs", "Byron", "Najia", "Belle", "Angelo", "Leon", "Piper", "Crow", "Edgar", "Najia", "Mina", "Mr.P"],
    "Belle": ["Piper", "Charlie", "Byron", "Nani", "Najia", "Crow", "Mina"],
    "Berry": ["Kaze", "Crow", "Sirius", "Shade", "Trunk", "Clancy", "Edgar", "Mortis","Lily", "Alli", "Griff"],
    "Bibi": ["Cordelius", "Otis", "Edgar", "Colette", "Buzz", "Bull", "Pearl"],
    "Bo": ["Mina", "Mortis", "Buzz", "Edgar", "Cordelious", "Kenji"],
    "Bonnie": ["Charlie", "Ruffs", "Leon", "Kaze", "Mina", "Pierce", "Tara"],
    "Brock": ["RT", "Byron", "Pierce", "Najia", "Piper", "Jae Yong", "Kaze", "Max", "Bea", "Nani", "Belle", "Angelo"],
    "Bull": ["Cordelius", "Griff", "Colette", "Otis", "Charlie", "Nita", "Lou"],
    "Buster": ["Leon", "Bull", "Mina", "Kenji", "Edgar", "Mortis", "Darryl", "R-T"],
    "Buzz": ["Charlie", "Bull", "Griff", "Cordelius", "Edgar", "Alli", "Bull"],
    "Byron": ["Piper", "Nani", "Pierce", "Najia", "Mortis", "Kenji", "Kaze", "Bonnie"],
    "Bolt": ["Chester", "Doug", "Lou"],
    "Carl": ["Edgar", "Colette", "Otis", "Buzz", "Bull", "Daminan"],
    "Charlie": ["Janet", "Ziggy", "Sirius", "Lumi", "Amber", "Byron", "Carl", "Penny", "Jae Yong"],
    "Chester": ["Emz", "Meeple", "Pearl"],
    "Chuck": ["Charlie", "Cordelius", "Otis", "R-T"],
    "Clancy": ["Charlie", "Tara", "Ruffs", "Otis", "Crow", "Barley", "LarryLawrie", "Juju"],
    "Colette": ["Ruffs", "Otis", "Crow", "Charlie", "Bea"],
    "Colt": ["Pierce", "Nani", "Ruffs", "Mina", "Leon", "Kenji", "Byron", "Crow", "Gus", "Edgar", "Belle", "Clancy", "Lily", "Mortis", "Angelo", "Stu", "Piper"],
    "Cordelius": ["Nita", "Surge", "Mina", "Sirius"],
    "Crow": ["Gus", "Byron", "Mortis", "Otis", "Pierce", "Mina", "Edgar", "Bea", "Piper", "Nita", "Ruffs", "Sirius", "Belle", "Charlie"],
    "Damian": ["Otis", "Edgar", "Colette", "Chester"],
    "Darryl": ["Spike", "Cordelius", "Otis", "Chester", "Colette", "Clancy", "Gale", "Lou", "Bull", "Nita"],
    "Doug": ["Clancy", "Griff", "Mina"],
    "Draco": ["Lou", "Frank", "Mina", "Chester"],
    "Dynamike": ["Bibi", "Trunk", "Mina", "Edgar", "Cordelius", "Stu", "Shade", "Mortis", "Kenji", "Alli", "Lily", "Leon", "Ollie"],
    "Edgar": ["Cordelius", "Otis", "Bull", "Griff", "Gale"],
    "El Primo": ["Colette", "Cordelius", "Otis", "Gale", "Stu", "Cordelious"],
    "Emz": ["Otis", "Colette", "Griff", "Mina", "Sirius", "Meeple", "Darryl"],
    "Eve": ["Penny", "Janet", "Belle", "Byron", "Carl"],
    "Fang": ["Chester", "Otis"],
    "Finx": ["Emz", "Edgar", "Ziggy", "Meg", "Pam"],
    "Frank": ["Colette", "Chester",],
    "Gale": ["Ziggy", "Lola", "Amber"],
    "Gene": ["Mr.P", "Eve", "Belle", "Ruffs"],
    "Gigi": ["Jacky", "Doug"],
    "Glowy": ["Edgar", "Crow", "Byron"],
    "Gray": ["R-T", "Eve", "Charlie", "Ruffs", "Pearl"],
    "Griff": ["Moe"],
    "Grom": ["Kenji", "Edgar", "Bolt", "Mico"],
    "Gus": ["Edgar", "Damian", "Byron", "Piece", "Nani", "Eve", "Leon"],
    "Hank": [""],
    "Jacky": ["Frank"],
    "Jae Yong": ["Crow", "Byron", "Buzz"],
    "Janet": ["Mortis", "Kit", "Darryl"],
    "Jessie": ["Barley", "Pierce", "Belle"],
    "Juju": ["Frank", "Brock"],
    "Kaze": ["Draco", "Mina", "Chester", "Otis"],
    "Kenji": ["Shade", "Lou"],
    "Kit": ["Bull", "Frank", "Hank"],
    "LarryLawrie": ["Edgar", "Mortis"],
    "Leon": ["Crow", "Emz"],
    "Lily": ["Jacky", "R-T", "Damian"],
    "Lola": ["Lumi", "Belle"],
    "Lou": ["Poco", "Byron", "Mina", "Chester"],
    "Lumi": ["Mortis", "Edgar", "Pierce"],
    "Maisie": ["Ruffs", "Stu", "Sirius"],
    "Mandy": ["Nani", "Edgar"],
    "Max": ["Crow", "Finx", "Lola"],
    "Meeple": ["Charlie", "Ruffs"],
    "Meg": ["Edgar", "Buster"],
    "Melodie": ["Damian", "Otis", "Cordelius", "Buzz"],
    "Mico": ["Bull", "Doug", "Otis", "Cordelius"],
    "Mina": ["Kenji", "Meeple", "Shade"],
    "Moe": ["Chester", "Damian", "Stu"],
    "Mortis": ["Otis", "Bull", "Shelly"],
    "Mr.P": ["Edgar", "Kenji", "Damian", "Mortis"],
    "Najia": ["Poco", "Edgar", "Lily"],
    "Nani": ["Max", "Gene"],
    "Nita": ["Amber", "Cordelious"],
    "Ollie": ["Poco", "Griff"],
    "Otis": ["Poco", "Ruffs", "Charlie", "Alli"],
    "Pam": ["Colette", "Lumi", "Crow", "Lou"],
    "Pearl": ["Finx", "Pam", "Lola"],
    "Penny": ["Willow", "Barley"],
    "Pierce": ["Charlie", "Ruffs", "Nani", "Piper"],
    "Piper": ["Nani", "Kaze", "Brock"],
    "Poco": ["Crow", "Byron", "Meg", "LawrieLarry", "Kit"],
    "R-T": ["Gus", "Leon", "Jae Yong", "Max"],
    "Rico": ["Colt", "Griff", "Brock"],
    "Rosa": ["Frank", "Bull", "Shelly", "Amber"],
    "Ruffs": ["Ollie", "Carl", "Janet", "Belle", "Jae Yong"],
    "Sam": ["Frank", "Bull", "Gale"],
    "Sandy": ["Nita", "Kenji", "Draco"],
    "Shade": ["Lou", "Hank"],
    "Shelly": ["Nita", "Stu", "Juju", "LawrieLarry", "Surge"],
    "Sirius": ["Amber", "Lumi", "Carl", "Nita"],
    "Spike": ["Pierce", "Piper", "willow"],
    "Sprout": ["Mico", "Kit", "Mortis"],
    "Squeak": ["Buzz", "Kenji"],
    "Starr Nova": ["Otis", "Gale"],
    "Stu": ["Ruffs", "Tara", "Charlie"],
    "Surge": ["Ruffs", "Juju"],
    "Tara": ["Janet", "Sandy", "Juju"],
    "Tick": [""],
    "Trunk": ["Frank", "Bull", "Mina"],
    "Willow": ["Juju", "LarryLawrie", "Najia"],
    "Ziggy": ["Kaze", "Edgar", "Kenji", "Mortis"]
};

const BRAWLERS = ["Damian", "8-Bit", "Alli", "Amber", "Angelo", "Ash", "Barley", "Bea", "Belle", "Berry", "Bibi", "Bo", "Bolt", "Bonnie", "Brock", "Bull", "Buster", "Buzz", "Byron", "Carl", "Charlie", "Chester", "Chuck", "Clancy", "Colette", "Colt", "Cordelius", "Crow", "Darryl", "Doug", "Draco", "Dynamike", "Edgar", "El Primo", "Emz", "Eve", "Fang", "Finx", "Frank", "Gale", "Gene", "Gigi", "Glowy", "Gray", "Griff", "Grom", "Gus", "Hank", "Jacky", "Jae Yong", "Janet", "Jessie", "Juju", "Kaze", "Kenji", "Kit", "LarryLawrie", "Leon", "Lily", "Lola", "Lou", "Lumi", "Maisie", "Mandy", "Max", "Meeple", "Meg", "Melodie", "Mico", "Mina", "Moe", "Mortis", "Mr.P", "Najia", "Nani", "Nita", "Ollie", "Otis", "Pam", "Pearl", "Penny", "Pierce", "Piper", "Poco", "R-T", "Rico", "Rosa", "Ruffs", "Sam", "Sandy", "Shade", "Shelly", "Sirius", "Spike", "Sprout", "Squeak", "Stu", "Surge", "Starr Nova", "Tara", "Tick", "Trunk", "Willow", "Ziggy"].sort();

let currentStep = 0, selected = [], firstPick = 'blue', draftOrder = [], picksVermelhos = [], picksAzuis = [], preSelected = null;
let modoEscolhido = null, mapaEscolhido = null;
let draftIniciado = false, draftFinalizado = false;

// --- ESTADO DO TIMER ---
let fases = [];          // lista de { team, type, dur, label, slotAlvo (so pra picks) }
let faseAtualIdx = 0;
let tempoRestante = 30;
let timerInterval = null;

const limparNome = normalizeKey;
function obterContainerInimigo() { return document.getElementById('counters-list'); }
function obterContainerNosso() { return document.getElementById('podetomar-list'); }
function obterContainerMeta() { return document.getElementById('meta-list'); }

function criarConteudoSlot(nome, id) {
    return `<div class="slot-assets"><img src="brawlers/${id}.png" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"><div class="slot-fallback-text">${nome}</div></div>`;
}

// =====================================================================================
// 1. TELA DE SETUP: INICIAR -> MODO -> MAPA -> MOEDA (LADO)
// =====================================================================================
function iniciarSetup() {
    document.getElementById('tc-iniciar').style.display = 'none';
    document.getElementById('setup-overlay').style.display = 'flex';
    document.getElementById('setup-modo').style.display = 'block';
    document.getElementById('setup-mapa').style.display = 'none';
    document.getElementById('setup-lado').style.display = 'none';
    popularGridModos();
}

function popularGridModos() {
    const grid = document.getElementById('grid-modos');
    if (!grid) return;
    grid.innerHTML = '';
    Object.keys(MAPAS_ALVO).forEach(modo => {
        const key = limparNome(modo);
        const div = document.createElement('div');
        div.className = 'modo-card';
        div.title = modo;
        div.innerHTML = `<img src="element/modes/${key}.png" onerror="this.src='element/modes/default.png'">`;
        div.onclick = () => window.escolherModo(modo);
        grid.appendChild(div);
    });
}

window.escolherModo = function(modo) {
    modoEscolhido = modo;
    document.getElementById('setup-modo').style.display = 'none';
    document.getElementById('setup-mapa').style.display = 'block';
    popularGridMapas(modo);
};

function popularGridMapas(modo) {
    const grid = document.getElementById('grid-mapas');
    if (!grid) return;
    grid.innerHTML = '';
    (MAPAS_ALVO[modo] || []).forEach(mapa => {
        const key = limparNome(mapa);
        const div = document.createElement('div');
        div.className = 'mapa-card';
        div.innerHTML = `<img src="element/maps/${key}.png" onerror="this.src='element/maps/default.png'"><span>${mapa}</span>`;
        div.onclick = () => window.escolherMapa(mapa);
        grid.appendChild(div);
    });
}

window.escolherMapa = function(mapa) {
    mapaEscolhido = mapa;

    // Popula a regiao "SELECIONE O MAPA" do tabuleiro real com a foto do mapa
    // + a logo do modo pequena no canto superior esquerdo.
    const mapImg = document.getElementById('map-img');
    const modoIcon = document.getElementById('map-modo-icon');
    const placeholder = document.getElementById('map-placeholder');
    const nomeLabel = document.getElementById('map-nome-label');

    const chaveMapa = limparNome(mapa), chaveModo = limparNome(modoEscolhido);
    if (mapImg) {
        mapImg.src = `element/maps/${chaveMapa}.png`;
        mapImg.style.display = 'block';
        mapImg.onerror = function() { this.style.display = 'none'; if (placeholder) { placeholder.style.display = 'block'; placeholder.innerHTML = 'IMAGEM<br>N\u00c3O<br>ENCONTRADA'; } };
    }
    if (placeholder) placeholder.style.display = 'none';
    if (modoIcon) { modoIcon.src = `element/modes/${chaveModo}.png`; modoIcon.style.display = 'block'; modoIcon.onerror = function() { this.style.display = 'none'; }; }
    if (nomeLabel) { nomeLabel.innerText = mapa; nomeLabel.style.display = 'block'; }

    // Revela o tabuleiro (com slots vazios) por tras do overlay de escolha de lado
    document.getElementById('vertical-layout').style.display = 'flex';

    // Avanca para a escolha do lado (moeda)
    document.getElementById('setup-mapa').style.display = 'none';
    document.getElementById('setup-lado').style.display = 'block';

    window.atualizarMeta();
};

window.escolherLado = function(lado) {
    firstPick = lado;
    document.getElementById('setup-overlay').style.display = 'none';

    // Mostra a moeda do lado que comecou no topo do retangulo do tabuleiro (fica na imagem final tambem)
    const coinTopo = document.getElementById('coin-topo');
    const coinTopoImg = document.getElementById('coin-topo-img');
    if (coinTopo && coinTopoImg) {
        coinTopoImg.src = lado === 'blue' ? 'element/blueside.png' : 'element/redside.png';
        coinTopo.style.display = 'flex';
    }

    draftIniciado = true;
    resetDraft();
    iniciarBarraDeTempo();
};

// =====================================================================================
// 2. ROSTER
// =====================================================================================
function gerarRoster() {
    const grid = document.getElementById('roster');
    if (!grid) return;
    grid.innerHTML = "";
    BRAWLERS.forEach(nome => {
        const id = limparNome(nome);
        const div = document.createElement('div');
        div.className = 'brawler-icon'; div.id = `b-${id}`;
        div.innerHTML = `<div class="brawler-img-container"><img src="brawlers/${id}.png" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" title="${nome}"><div class="fallback-initials">${nome.substring(0,2).toUpperCase()}</div></div><span class="brawler-name">${nome}</span>`;
        div.onclick = () => clicarBrawler(nome, id);
        grid.appendChild(div);
    });
}

window.filtrar = function() {
    const searchInput = document.getElementById('search');
    if (!searchInput) return;
    const t = searchInput.value.toLowerCase();
    document.querySelectorAll('.brawler-icon').forEach(div => {
        const n = div.querySelector('.brawler-name').textContent.toLowerCase();
        div.style.display = n.includes(t) ? 'flex' : 'none';
    });
};

// =====================================================================================
// 3. META / COUNTERS (paineis laterais) - FASE 2 pluga dados reais aqui
// =====================================================================================
window.atualizarMeta = function() {
    const container = obterContainerMeta();
    if (!container) return;
    container.innerHTML = "";
    const metaBrawlers = DADOS_META[mapaEscolhido];
    if (metaBrawlers && metaBrawlers.length > 0) {
        metaBrawlers.forEach(nome => {
            const id = limparNome(nome);
            container.innerHTML += `<div class="mini-brawler" title="Top Pick: ${nome}"><img src="brawlers/${id}.png" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"><div class="fallback-initials">${nome.substring(0,2).toUpperCase()}</div></div>`;
        });
    } else {
        container.innerHTML = '<p style="color:#555; font-size:11px; width: 100%; text-align:center;">Sem dados de meta para este mapa ainda.</p>';
    }
};

function contarCounters(listaBrawlers) {
    let contagem = {};
    listaBrawlers.forEach(brawler => {
        let brawlerKey = Object.keys(DADOS_COUNTERS).find(k => limparNome(k) === limparNome(brawler));
        if (brawlerKey && Array.isArray(DADOS_COUNTERS[brawlerKey])) {
            DADOS_COUNTERS[brawlerKey].filter(c => c && c.trim() !== "").forEach(c => { contagem[c] = (contagem[c] || 0) + 1; });
        }
    });
    return contagem;
}

function calcularCounters() {
    let container = obterContainerInimigo();
    if (!container) return;
    container.innerHTML = "";
    if (picksVermelhos.length === 0) { container.innerHTML = '<p style="color:#555; font-size:11px; width: 100%; text-align:center;">Aguardando advers\u00e1rio</p>'; return; }
    let contagemCounters = contarCounters(picksVermelhos);
    let brawlersValidos = Object.keys(contagemCounters).filter(nome => {
        const idNome = limparNome(nome);
        if (selected.includes(idNome)) return false;
        if (preSelected && limparNome(preSelected.nome) === idNome) return false;
        return true;
    });
    if (brawlersValidos.length > 0) {
        brawlersValidos.sort((a, b) => contagemCounters[b] - contagemCounters[a]);
        brawlersValidos.forEach(nome => {
            const id = limparNome(nome); let qtd = contagemCounters[nome];
            let destaqueClass = qtd >= 2 ? 'highlight-good' : '';
            let badge = qtd >= 2 ? `<div class="badge-multi">x${qtd}</div>` : '';
            container.innerHTML += `<div class="mini-brawler ${destaqueClass}" title="${nome} (Counter x${qtd})"><img src="brawlers/${id}.png" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"><div class="fallback-initials">${nome.substring(0,2).toUpperCase()}</div>${badge}</div>`;
        });
    } else {
        container.innerHTML = '<p style="color:#555; font-size:11px; width: 100%; text-align:center;">Sem recomenda\u00e7\u00f5es.</p>';
    }
}

function calcularPodeTomar() {
    let container = obterContainerNosso();
    if (!container) return;
    container.innerHTML = "";
    let listaAzuisParaCalcular = [...picksAzuis];
    const step = draftOrder[currentStep];
    if (preSelected && step && step.team === 'blue' && step.type === 'pick') {
        if (!listaAzuisParaCalcular.includes(preSelected.nome)) listaAzuisParaCalcular.push(preSelected.nome);
    }
    if (listaAzuisParaCalcular.length === 0) { container.innerHTML = '<p style="color:#555; font-size:11px; width: 100%; text-align:center;">Aguardando nosso time</p>'; return; }

    let contagemAmeacas = contarCounters(listaAzuisParaCalcular);
    let brawlersValidos = Object.keys(contagemAmeacas).filter(nome => {
        const idNome = limparNome(nome);
        if (selected.includes(idNome)) return false;
        if (preSelected && limparNome(preSelected.nome) === idNome) return false;
        return true;
    });
    if (brawlersValidos.length > 0) {
        brawlersValidos.sort((a, b) => contagemAmeacas[b] - contagemAmeacas[a]);
        brawlersValidos.forEach(nome => {
            const id = limparNome(nome); let qtd = contagemAmeacas[nome];
            let destaqueClass = qtd >= 2 ? 'highlight-bad' : '';
            let badge = qtd >= 2 ? `<div class="badge-multi-danger">x${qtd}</div>` : '';
            container.innerHTML += `<div class="mini-brawler ${destaqueClass}" title="${nome} (Counter x${qtd})"><img src="brawlers/${id}.png" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"><div class="fallback-initials">${nome.substring(0,2).toUpperCase()}</div>${badge}</div>`;
        });
    } else {
        container.innerHTML = '<p style="color:#555; font-size:11px; width: 100%; text-align:center;">Sem amea\u00e7as.</p>';
    }
}

// Botoes de seta/filtro (regiao + mes) dos paineis laterais - placeholder de UI (FASE 2 liga aos dados reais)
window.toggleFiltroPainel = function(id) {
    document.querySelectorAll('.panel-filter-box').forEach(box => { if (box.id !== id) box.classList.remove('aberto'); });
    const box = document.getElementById(id);
    if (box) box.classList.toggle('aberto');
};
document.addEventListener('click', (e) => {
    if (!e.target.closest('.panel-filter-btn') && !e.target.closest('.panel-filter-box')) {
        document.querySelectorAll('.panel-filter-box').forEach(box => box.classList.remove('aberto'));
    }
});

// =====================================================================================
// 4. MONTAGEM DA ORDEM DO DRAFT (bans + picks 1-3-4 / 2-5-6)
// =====================================================================================
function buildOrder() {
    const order = [
        { slot: 'slot-b0', team: 'blue', type: 'ban' }, { slot: 'slot-b2', team: 'blue', type: 'ban' }, { slot: 'slot-b4', team: 'blue', type: 'ban' },
        { slot: 'slot-b1', team: 'red',  type: 'ban' }, { slot: 'slot-b3', team: 'red',  type: 'ban' }, { slot: 'slot-b5', team: 'red',  type: 'ban' }
    ];

    // O time que comeca (firstPick) picka nas posicoes GLOBAIS 1, 4 e 5 da sequencia de picks;
    // o outro time picka nas posicoes 2, 3 e 6 -- padrao 1-2-2-1 (snake draft), exatamente como pedido:
    // Ex.: firstPick azul -> Azul, Vermelho, Vermelho, Azul, Azul, Vermelho
    //      firstPick vermelho -> Vermelho, Azul, Azul, Vermelho, Vermelho, Azul
    const timeOutro = firstPick === 'blue' ? 'red' : 'blue';
    const sequenciaTimes = [firstPick, timeOutro, timeOutro, firstPick, firstPick, timeOutro];

    let idxAzul = 0, idxVermelho = 0;
    sequenciaTimes.forEach(time => {
        if (time === 'blue') { idxAzul++; order.push({ slot: `slot-pA${idxAzul}`, team: 'blue', type: 'pick' }); }
        else { idxVermelho++; order.push({ slot: `slot-pV${idxVermelho}`, team: 'red', type: 'pick' }); }
    });

    draftOrder = order;
}

// =====================================================================================
// 5. TIMER (bans 30s / picks azul 30s / picks vermelho 35s)
// =====================================================================================
function montarFases() {
    fases = [{ label: 'BANS', team: null, dur: 30 }];
    draftOrder.forEach(step => {
        if (step.type !== 'pick') return;
        fases.push({ label: `PICK - ${step.team === 'blue' ? 'AZUL' : 'VERMELHO'}`, team: step.team, dur: step.team === 'blue' ? 30 : 35 });
    });
}

function popularSegmentosVisuais() {
    const wrap = document.getElementById('timer-segments');
    if (!wrap) return;
    wrap.innerHTML = '';
    fases.forEach((f, i) => {
        const seg = document.createElement('div');
        seg.className = 'timer-segment' + (f.team === 'red' ? ' team-red' : '');
        seg.id = `seg-${i}`;
        seg.innerHTML = '<div class="fill"></div>';
        wrap.appendChild(seg);
    });
}

function iniciarBarraDeTempo() {
    document.getElementById('tc-timer').style.display = 'flex';
    montarFases();
    popularSegmentosVisuais();
    faseAtualIdx = 0;
    iniciarFase(0);
}

function iniciarFase(idx) {
    if (timerInterval) clearInterval(timerInterval);
    faseAtualIdx = idx;
    if (idx >= fases.length) return; // draft ja terminou (analise final assume o resto)

    // Marca segmentos anteriores como concluidos
    for (let i = 0; i < idx; i++) { const s = document.getElementById(`seg-${i}`); if (s) s.classList.add('done'); }

    const fase = fases[idx];
    tempoRestante = fase.dur;
    atualizarLabelFase(fase);
    atualizarVisualTimer();
    marcarMiniTimerSlotAtivo();

    timerInterval = setInterval(() => {
        tempoRestante--;
        atualizarVisualTimer();
        marcarMiniTimerSlotAtivo();
        if (tempoRestante <= 0) { clearInterval(timerInterval); } // fica parado em 0 ate o operador clicar (nao trava/nao corrompe o draft)
    }, 1000);
}

function atualizarLabelFase(fase) {
    const label = document.getElementById('timer-fase-label');
    if (label) label.innerText = fase.label;
}

function atualizarVisualTimer() {
    const numEl = document.getElementById('timer-numero');
    if (numEl) { numEl.innerText = Math.max(0, tempoRestante); numEl.classList.toggle('urgente', tempoRestante <= 10 && tempoRestante > 0); }
    const seg = document.getElementById(`seg-${faseAtualIdx}`);
    const fase = fases[faseAtualIdx];
    if (seg && fase) {
        const fill = seg.querySelector('.fill');
        if (fill) fill.style.width = Math.max(0, (tempoRestante / fase.dur) * 100) + '%';
    }
}

// Mostra um pequeno timer (numero) dentro da moldura do slot que esta prestes a ser preenchido
function marcarMiniTimerSlotAtivo() {
    document.querySelectorAll('.slot-mini-timer').forEach(el => el.remove());
    if (currentStep >= draftOrder.length) return;
    const step = draftOrder[currentStep];
    const slotEl = document.getElementById(step.slot);
    if (!slotEl || slotEl.querySelector('.slot-assets')) return; // ja preenchido
    const mini = document.createElement('div');
    mini.className = 'slot-mini-timer' + (tempoRestante <= 10 ? ' urgente' : '');
    mini.innerText = Math.max(0, tempoRestante);
    slotEl.appendChild(mini);
}

// Ao preencher um slot (ban ou pick confirmado), reseta o timer e avanca de setor
function avancarFaseAposPreenchimento() {
    const proximoStepEhPick = currentStep < draftOrder.length && draftOrder[currentStep].type === 'pick';
    const faseAtualEhBan = fases[faseAtualIdx] && fases[faseAtualIdx].team === null;

    if (faseAtualEhBan && proximoStepEhPick) { iniciarFase(faseAtualIdx + 1); return; }
    if (!faseAtualEhBan) {
        // cada pick confirmado avanca uma fase (pois cada fase = 1 pick)
        if (faseAtualIdx + 1 < fases.length) iniciarFase(faseAtualIdx + 1);
        else { if (timerInterval) clearInterval(timerInterval); document.getElementById('tc-timer').style.display = 'none'; }
    }
    marcarMiniTimerSlotAtivo();
}

// =====================================================================================
// 6. INTERACAO DE CLIQUE NOS BRAWLERS
// =====================================================================================
window.clicarBrawler = function(nome, id) {
    if (!draftIniciado || draftFinalizado) return;
    if (currentStep >= draftOrder.length || selected.includes(id)) return;
    const step = draftOrder[currentStep];
    const slot = document.getElementById(step.slot);
    if (!slot) return;

    if (step.team === 'blue') {
        if (preSelected && preSelected.id === id) { window.confirmarBlueSelection(); return; }
        preSelected = { nome, id };
        slot.innerHTML = `<div class="slot-assets pre-selecting" onclick="window.confirmarBlueSelection(event)"><img src="brawlers/${id}.png" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"><div class="slot-fallback-text">${nome}</div><div class="pre-select-badge">\u2713</div></div>`;
        calcularCounters(); calcularPodeTomar();
    } else {
        slot.innerHTML = criarConteudoSlot(nome, id);
        const icon = document.getElementById(`b-${id}`);
        if (icon) icon.classList.add('disabled');
        selected.push(id);
        if (step.type === 'pick') picksVermelhos.push(nome);
        currentStep++; preSelected = null;
        atualizarFoco(); calcularCounters(); calcularPodeTomar();
        avancarFaseAposPreenchimento();
        verificarFimDraft();
    }
};

window.confirmarBlueSelection = function(event) {
    if (event) event.stopPropagation();
    if (!preSelected) return;
    const { nome, id } = preSelected;
    const step = draftOrder[currentStep];
    const slot = document.getElementById(step.slot);
    if (slot) slot.innerHTML = criarConteudoSlot(nome, id);
    const icon = document.getElementById(`b-${id}`);
    if (icon) icon.classList.add('disabled');
    selected.push(id);
    if (step.type === 'pick') picksAzuis.push(nome);
    preSelected = null; currentStep++;
    atualizarFoco(); calcularCounters(); calcularPodeTomar();
    avancarFaseAposPreenchimento();
    verificarFimDraft();
};

function atualizarFoco() {
    document.querySelectorAll('.slot').forEach(s => s.classList.remove('active-blue', 'active-red'));
    if (currentStep < draftOrder.length) {
        const next = draftOrder[currentStep];
        const nextSlot = document.getElementById(next.slot);
        if (nextSlot) nextSlot.classList.add(next.team === 'blue' ? 'active-blue' : 'active-red');
    }
}

window.resetDraft = function() {
    currentStep = 0; selected = []; picksVermelhos = []; picksAzuis = []; preSelected = null; draftFinalizado = false;
    document.querySelectorAll('.slot').forEach(s => s.innerHTML = '');
    document.querySelectorAll('.brawler-icon').forEach(b => b.classList.remove('disabled'));
    document.getElementById('analise-final').style.display = 'none';
    document.getElementById('vertical-layout').style.display = 'flex';
    document.getElementById('info-panels').style.display = 'flex';
    document.getElementById('roster-area').style.display = 'flex';
    buildOrder(); atualizarFoco(); window.atualizarMeta(); calcularCounters(); calcularPodeTomar();
};

// =====================================================================================
// 7. FIM DO DRAFT: ANALISE CRITICA + PRINT
// =====================================================================================
function verificarFimDraft() {
    if (currentStep < draftOrder.length) return;
    draftFinalizado = true;
    if (timerInterval) clearInterval(timerInterval);
    setTimeout(mostrarAnaliseFinal, 500);
}

function calcularProbabilidadeVitoria() {
    let pontosNosso = 0, pontosInimigo = 0;
    picksAzuis.forEach(azul => {
        picksVermelhos.forEach(verm => {
            const keyAzul = Object.keys(DADOS_COUNTERS).find(k => limparNome(k) === limparNome(azul));
            const keyVerm = Object.keys(DADOS_COUNTERS).find(k => limparNome(k) === limparNome(verm));
            if (keyAzul && (DADOS_COUNTERS[keyAzul] || []).some(c => limparNome(c) === limparNome(verm))) pontosNosso++;
            if (keyVerm && (DADOS_COUNTERS[keyVerm] || []).some(c => limparNome(c) === limparNome(azul))) pontosInimigo++;
        });
    });
    let prob = 50 + (pontosNosso - pontosInimigo) * 5;
    return Math.max(5, Math.min(95, prob));
}

function calcularPontosFracos() {
    let contagemAmeacas = contarCounters(picksAzuis);
    return Object.entries(contagemAmeacas).filter(([, qtd]) => qtd >= 2 && picksVermelhos.some(v => limparNome(v) === limparNome(Object.keys(contagemAmeacas).find(() => true) || ''))).map(([nome]) => nome)
        // fallback simples: ameacas fortes que o time vermelho de fato pickou
        .filter(nome => picksVermelhos.some(v => limparNome(v) === limparNome(nome)));
}

function sugerirMelhorTroca(brawlerAtual) {
    // Sugere, entre os brawlers ainda nao usados no draft inteiro, aquele que menos e counterado pelos picks vermelhos
    const usados = new Set([...picksAzuis, ...picksVermelhos].map(limparNome));
    let candidatos = BRAWLERS.filter(b => !usados.has(limparNome(b)));
    let contagemAmeacas = contarCounters(picksAzuis.filter(b => limparNome(b) !== limparNome(brawlerAtual)));
    candidatos.sort((a, b) => (contagemAmeacas[a] || 0) - (contagemAmeacas[b] || 0));
    return candidatos[0] || null;
}

function mostrarAnaliseFinal() {
    document.getElementById('info-panels').style.display = 'none';
    document.getElementById('roster-area').style.display = 'none';

    const prob = calcularProbabilidadeVitoria();
    const fracos = calcularPontosFracos();

    const contagemAmeacasFinal = contarCounters(picksAzuis);
    const picksEmRisco = picksAzuis.filter(p => {
        return picksVermelhos.some(v => {
            const key = Object.keys(DADOS_COUNTERS).find(k => limparNome(k) === limparNome(v));
            return key && (DADOS_COUNTERS[key] || []).some(c => limparNome(c) === limparNome(p));
        });
    });

    const painel = document.getElementById('analise-final');
    painel.style.display = 'flex';
    painel.innerHTML = `
        <div class="analise-card">
            <h3>PROBABILIDADE DE VIT\u00d3RIA (NOSSO TIME - AZUL)</h3>
            <div class="winrate-bar-wrap"><div class="winrate-bar-fill" style="width:${prob}%;">${prob.toFixed(0)}%</div></div>
        </div>

        <div class="analise-card">
            <h3>PONTOS FRACOS DO TIME</h3>
            <ul class="analise-lista">
                ${fracos.length > 0 ? fracos.map(f => `<li>\u26a0\ufe0f O advers\u00e1rio pickou <strong>${f}</strong>, que \u00e9 uma amea\u00e7a forte contra mais de um dos nossos picks.</li>`).join('')
                : '<li>\u2705 Nenhum ponto fraco cr\u00edtico identificado nos confrontos diretos.</li>'}
            </ul>
        </div>

        <div class="analise-card">
            <h3>O QUE PODIA SER MELHOR</h3>
            <ul class="analise-lista">
                ${picksEmRisco.length > 0 ? picksEmRisco.map(p => {
                    const sugestao = sugerirMelhorTroca(p);
                    const idAtual = limparNome(p), idSugestao = sugestao ? limparNome(sugestao) : null;
                    return `<li><div class="troca-sugestao"><img src="brawlers/${idAtual}.png" onerror="this.src='brawlers/default.png'"><span class="troca-x">X</span>${sugestao ? `<img src="brawlers/${idSugestao}.png" onerror="this.src='brawlers/default.png'">` : ''}</div><span>Trocar <strong>${p}</strong> ${sugestao ? `por <strong>${sugestao}</strong>` : ''} reduziria a exposi\u00e7\u00e3o aos counters do advers\u00e1rio.</span></li>`;
                }).join('') : '<li>\u2705 Nenhuma troca cr\u00edtica necess\u00e1ria \u2014 draft s\u00f3lido.</li>'}
            </ul>
        </div>

        <div class="analise-card">
            <h3>RESUMO DO DRAFT (MAPA + BANS + PICKS)</h3>
            <div id="print-preview-holder" style="display:flex; justify-content:center;"></div>
            <button class="btn-baixar-print" onclick="window.baixarImagemDraft()">\u2b07\ufe0f BAIXAR IMAGEM DO DRAFT</button>
        </div>

        <button class="btn-novo-draft" onclick="window.location.reload()">COME\u00c7AR NOVO DRAFT</button>
    `;

    // Clona visualmente o tabuleiro (mapa + bans + picks + moeda do topo) dentro da area de analise,
    // mantendo o elemento original intacto (que continua sendo o alvo real do html2canvas).
    const original = document.getElementById('draft-board-capture');
    const holder = document.getElementById('print-preview-holder');
    if (original && holder) {
        const clone = original.cloneNode(true);
        clone.removeAttribute('id');
        clone.style.transform = 'scale(0.85)';
        clone.style.transformOrigin = 'top center';
        holder.appendChild(clone);
    }
}

window.baixarImagemDraft = function() {
    const alvo = document.getElementById('draft-board-capture');
    if (!alvo || typeof html2canvas === 'undefined') { alert('N\u00e3o foi poss\u00edvel gerar a imagem (html2canvas n\u00e3o carregado).'); return; }
    html2canvas(alvo, { backgroundColor: '#111217', scale: 2 }).then(canvas => {
        const link = document.createElement('a');
        link.download = `draft_${limparNome(mapaEscolhido) || 'mapa'}_${Date.now()}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    });
};

// =====================================================================================
// 8. INICIALIZACAO
// =====================================================================================
function inicializarSistema() {
    gerarRoster();
    document.getElementById('btn-iniciar-draft').addEventListener('click', iniciarSetup);
    const searchInput = document.getElementById('search');
    if (searchInput) { searchInput.removeAttribute('oninput'); searchInput.addEventListener('input', window.filtrar); }
}

if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', inicializarSistema); }
else { inicializarSistema(); }
