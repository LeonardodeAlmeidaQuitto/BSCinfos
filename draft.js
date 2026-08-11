// --- DADOS DO SISTEMA ---
const MAPAS_ALVO = {
    "Brawl Ball": ["Super Beach", "Pinhole Punt", "Sneaky Fields", "Triple Dribble", "Pinhole Punt", "Pinball Dreams"],
    "Bounty": ["Shooting Star", "Hideout", "Layer Cake", "Dry Season"],
    "Heist": ["Hot Potato", "Safe Zone", "Bridge Too Far", "Pit Stop", "Kaboom Canyon"],
    "Knockout": ["Goldarm Gulch", "Belle's Rock", "Out in the Open", "New Horizons"],
    "Hot Zone": ["Ring of Fire", "Dueling Beetles", "Open Business"],
    "Gem Grab": ["Hard Rock Mine", "Double Swoosh", "Deathcap Trap", "Gem Fort", "Crystal Arcade"]
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
    "Frank": ["Colette", "Chester"],
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

const BRAWLERS = ["Damian", "8-Bit", "Alli", "Amber", "Angelo", "Ash", "Barley", "Bea", "Belle", "Berry", "Bibi", "Bo", "Bolt", "Bonnie", "Brock", "Bull", "Buster", "Buzz", "Byron", "Carl", "Charlie", "Chester", "Chuck", "Clancy", "Colette", "Colt", "Cordelius", "Crow", "Darryl", "Doug", "Draco", "Dynamike", "Edgar", "El Primo", "Emz", "Eve", "Fang", "Finx", "Frank", "Gale", "Gene", "Gigi", "Glowy", "Gray", "Griff", "Grom", "Gus", "Hank", "Jacky", "Jae Yong", "Janet", "Jessie", "Juju", "Kaze", "Kenji", "Kit", "LarryLawrie", "Leon", "Lily", "Lola", "Lou", "Lumi", "Maisie", "Mandy", "Max", "Meeple", "Meg", "Melodie", "Mico", "Mina", "Moe", "Mortis", "Mr.P", "Najia", "Nani", "Nita", "Nori", "Ollie", "Otis", "Pam", "Pearl", "Penny", "Pierce", "Piper", "Poco", "R-T", "Rico", "Rosa", "Ruffs", "Sam", "Sandy", "Shade", "Shelly", "Sirius", "Spike", "Sprout", "Squeak", "Stu", "Surge", "Starr Nova", "Tara", "Tick", "Trunk", "Willow", "Ziggy"].sort();

let currentStep = 0, firstPick = 'blue', draftOrder = [], picksVermelhos = [], picksAzuis = [], preSelected = null;
let modoEscolhido = null, mapaEscolhido = null;
let draftIniciado = false, draftFinalizado = false;

// selected: apenas PICKS confirmados (para desabilitar no roster e nos calculos de counter)
// bansBlueSel / bansRedSel: bans de cada time — um mesmo brawler PODE aparecer nos dois
let selected = [];
let bansBlueSel = []; // ids dos bans do time azul
let bansRedSel  = []; // ids dos bans do time vermelho

// --- ESTADO DO TIMER ---
let fases = [];
let faseAtualIdx = 0;
let tempoRestante = 30;
let timerInterval = null;

function limparNome(nome) { return !nome ? "" : nome.toLowerCase().replace(/[^a-z0-9]/g, ''); }
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
    const mapImg = document.getElementById('map-img');
    const modoIcon = document.getElementById('map-modo-icon');
    const placeholder = document.getElementById('map-placeholder');
    const nomeLabel = document.getElementById('map-nome-label');
    const chaveMapa = limparNome(mapa), chaveModo = limparNome(modoEscolhido);
    if (mapImg) {
        mapImg.src = `element/maps/${chaveMapa}.png`;
        mapImg.style.display = 'block';
        mapImg.onerror = function() { this.style.display = 'none'; if (placeholder) { placeholder.style.display = 'block'; placeholder.innerHTML = 'IMAGEM<br>NÃO<br>ENCONTRADA'; } };
    }
    if (placeholder) placeholder.style.display = 'none';
    if (modoIcon) { modoIcon.src = `element/modes/${chaveModo}.png`; modoIcon.style.display = 'block'; modoIcon.onerror = function() { this.style.display = 'none'; }; }
    if (nomeLabel) { nomeLabel.innerText = mapa; nomeLabel.style.display = 'block'; }
    document.getElementById('vertical-layout').style.display = 'flex';
    document.getElementById('setup-mapa').style.display = 'none';
    document.getElementById('setup-lado').style.display = 'block';
    window.atualizarMeta();
};

window.escolherLado = function(lado) {
    firstPick = lado;
    document.getElementById('setup-overlay').style.display = 'none';
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
// 3. META / COUNTERS (paineis laterais)
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
    if (picksVermelhos.length === 0) { container.innerHTML = '<p style="color:#555; font-size:11px; width: 100%; text-align:center;">Aguardando adversário</p>'; return; }
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
        container.innerHTML = '<p style="color:#555; font-size:11px; width: 100%; text-align:center;">Sem recomendações.</p>';
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
        container.innerHTML = '<p style="color:#555; font-size:11px; width: 100%; text-align:center;">Sem ameaças.</p>';
    }
}

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
// 4. MONTAGEM DA ORDEM DO DRAFT
// =====================================================================================
function buildOrder() {
    const order = [
        { slot: 'slot-b0', team: 'blue', type: 'ban' }, { slot: 'slot-b2', team: 'blue', type: 'ban' }, { slot: 'slot-b4', team: 'blue', type: 'ban' },
        { slot: 'slot-b1', team: 'red',  type: 'ban' }, { slot: 'slot-b3', team: 'red',  type: 'ban' }, { slot: 'slot-b5', team: 'red',  type: 'ban' }
    ];
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
// 5. TIMER
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
    if (idx >= fases.length) return;
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
        if (tempoRestante <= 0) { clearInterval(timerInterval); }
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

function marcarMiniTimerSlotAtivo() {
    document.querySelectorAll('.slot-mini-timer').forEach(el => el.remove());
    if (currentStep >= draftOrder.length) return;
    const step = draftOrder[currentStep];
    const slotEl = document.getElementById(step.slot);
    if (!slotEl || slotEl.querySelector('.slot-assets')) return;
    const mini = document.createElement('div');
    mini.className = 'slot-mini-timer' + (tempoRestante <= 10 ? ' urgente' : '');
    mini.innerText = Math.max(0, tempoRestante);
    slotEl.appendChild(mini);
}

function avancarFaseAposPreenchimento() {
    const proximoStepEhPick = currentStep < draftOrder.length && draftOrder[currentStep].type === 'pick';
    const faseAtualEhBan = fases[faseAtualIdx] && fases[faseAtualIdx].team === null;
    if (faseAtualEhBan && proximoStepEhPick) { iniciarFase(faseAtualIdx + 1); return; }
    if (!faseAtualEhBan) {
        if (faseAtualIdx + 1 < fases.length) iniciarFase(faseAtualIdx + 1);
        else { if (timerInterval) clearInterval(timerInterval); document.getElementById('tc-timer').style.display = 'none'; }
    }
    marcarMiniTimerSlotAtivo();
}

// =====================================================================================
// 6. INTERACAO DE CLIQUE NOS BRAWLERS
// =====================================================================================
function isBrawlerDisponivel(id, step) {
    if (selected.includes(id)) return false;
    if (step.type === 'ban') {
        if (step.team === 'blue' && bansBlueSel.includes(id)) return false;
        if (step.team === 'red'  && bansRedSel.includes(id))  return false;
        return true;
    }
    if (bansBlueSel.includes(id) || bansRedSel.includes(id)) return false;
    return true;
}

function atualizarEstadoRoster() {
    const step = currentStep < draftOrder.length ? draftOrder[currentStep] : null;
    document.querySelectorAll('.brawler-icon').forEach(div => {
        const id = div.id.replace('b-', '');
        div.classList.remove('disabled', 'banned-blue', 'banned-red');
        const pickado = selected.includes(id);
        const baniuAzul = bansBlueSel.includes(id);
        const baniuVerm = bansRedSel.includes(id);
        if (baniuAzul) div.classList.add('banned-blue');
        if (baniuVerm) div.classList.add('banned-red');
        if (pickado) { div.classList.add('disabled'); return; }
        if (!step) return;
        if (step.type === 'ban') {
            if (step.team === 'blue' && baniuAzul) div.classList.add('disabled');
            if (step.team === 'red'  && baniuVerm)  div.classList.add('disabled');
        } else {
            if (baniuAzul || baniuVerm) div.classList.add('disabled');
        }
    });
}

window.clicarBrawler = function(nome, id) {
    if (!draftIniciado || draftFinalizado) return;
    if (currentStep >= draftOrder.length) return;
    const step = draftOrder[currentStep];
    if (!isBrawlerDisponivel(id, step)) return;
    const slot = document.getElementById(step.slot);
    if (!slot) return;
    if (step.team === 'blue') {
        if (preSelected && preSelected.id === id) { window.confirmarBlueSelection(); return; }
        preSelected = { nome, id };
        slot.innerHTML = `<div class="slot-assets pre-selecting" onclick="window.confirmarBlueSelection(event)"><img src="brawlers/${id}.png" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"><div class="slot-fallback-text">${nome}</div><div class="pre-select-badge">✓</div></div>`;
        calcularCounters(); calcularPodeTomar();
    } else {
        confirmarSelecao(nome, id, step);
    }
};

window.confirmarBlueSelection = function(event) {
    if (event) event.stopPropagation();
    if (!preSelected) return;
    const { nome, id } = preSelected;
    const step = draftOrder[currentStep];
    confirmarSelecao(nome, id, step);
};

function confirmarSelecao(nome, id, step) {
    const slot = document.getElementById(step.slot);
    if (slot) slot.innerHTML = criarConteudoSlot(nome, id);
    if (step.type === 'ban') {
        if (step.team === 'blue') bansBlueSel.push(id);
        else                      bansRedSel.push(id);
    } else {
        selected.push(id);
        if (step.team === 'blue') picksAzuis.push(nome);
        else                      picksVermelhos.push(nome);
    }
    preSelected = null;
    currentStep++;
    atualizarEstadoRoster();
    atualizarFoco();
    calcularCounters();
    calcularPodeTomar();
    avancarFaseAposPreenchimento();
    verificarFimDraft();
}

function atualizarFoco() {
    document.querySelectorAll('.slot').forEach(s => s.classList.remove('active-blue', 'active-red'));
    if (currentStep < draftOrder.length) {
        const next = draftOrder[currentStep];
        const nextSlot = document.getElementById(next.slot);
        if (nextSlot) nextSlot.classList.add(next.team === 'blue' ? 'active-blue' : 'active-red');
    }
}

window.resetDraft = function() {
    currentStep = 0; selected = []; bansBlueSel = []; bansRedSel = [];
    picksVermelhos = []; picksAzuis = []; preSelected = null; draftFinalizado = false;
    document.querySelectorAll('.slot').forEach(s => s.innerHTML = '');
    document.querySelectorAll('.brawler-icon').forEach(b => b.classList.remove('disabled', 'banned-blue', 'banned-red'));
    document.getElementById('analise-final').style.display = 'none';
    document.getElementById('vertical-layout').style.display = 'flex';
    document.getElementById('info-panels').style.display = 'flex';
    document.getElementById('roster-area').style.display = 'flex';
    buildOrder(); atualizarFoco(); window.atualizarMeta(); calcularCounters(); calcularPodeTomar();
};

// =====================================================================================
// 7. FIM DO DRAFT
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
        .filter(nome => picksVermelhos.some(v => limparNome(v) === limparNome(nome)));
}

function sugerirMelhorTroca(brawlerAtual) {
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
            <h3>PROBABILIDADE DE VITÓRIA (NOSSO TIME - AZUL)</h3>
            <div class="winrate-bar-wrap"><div class="winrate-bar-fill" style="width:${prob}%;">${prob.toFixed(0)}%</div></div>
        </div>
        <div class="analise-card">
            <h3>PONTOS FRACOS DO TIME</h3>
            <ul class="analise-lista">
                ${fracos.length > 0 ? fracos.map(f => `<li>⚠️ O adversário pickou <strong>${f}</strong>, que é uma ameaça forte contra mais de um dos nossos picks.</li>`).join('')
                : '<li>✅ Nenhum ponto fraco crítico identificado nos confrontos diretos.</li>'}
            </ul>
        </div>
        <div class="analise-card">
            <h3>O QUE PODIA SER MELHOR</h3>
            <ul class="analise-lista">
                ${picksEmRisco.length > 0 ? picksEmRisco.map(p => {
                    const sugestao = sugerirMelhorTroca(p);
                    const idAtual = limparNome(p), idSugestao = sugestao ? limparNome(sugestao) : null;
                    return `<li><div class="troca-sugestao"><img src="brawlers/${idAtual}.png" onerror="this.src='brawlers/default.png'"><span class="troca-x">X</span>${sugestao ? `<img src="brawlers/${idSugestao}.png" onerror="this.src='brawlers/default.png'">` : ''}</div><span>Trocar <strong>${p}</strong> ${sugestao ? `por <strong>${sugestao}</strong>` : ''} reduziria a exposição aos counters do adversário.</span></li>`;
                }).join('') : '<li>✅ Nenhuma troca crítica necessária — draft sólido.</li>'}
            </ul>
        </div>
        <div class="analise-card">
            <h3>RESUMO DO DRAFT (MAPA + BANS + PICKS)</h3>
            <div id="print-preview-holder" style="display:flex; justify-content:center;"></div>
            <button class="btn-baixar-print" onclick="window.baixarImagemDraft()">⬇️ BAIXAR IMAGEM DO DRAFT</button>
        </div>
        <button class="btn-novo-draft" onclick="window.location.reload()">COMEÇAR NOVO DRAFT</button>
    `;
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
    if (!alvo || typeof html2canvas === 'undefined') { alert('Não foi possível gerar a imagem (html2canvas não carregado).'); return; }
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
