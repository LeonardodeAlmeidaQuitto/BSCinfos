/ --- DADOS DO SISTEMA ---
const MAPAS_ALVO = {
    "Brawl Ball": ["Super Beach", "Pinhole Punt", "Sneaky Fields", "Triple Dribble", "Pinhole Punt", "Pinball Dreams"],
    "Bounty": ["Shooting Star", "Hideout", "Layer Cake", "Dry Season"],
    "Heist": ["Hot Potato", "Safe Zone", "Bridge Too Far", "Pit Stop", "Kaboom Canyon"],
    "Knockout": ["Goldarm Gulch", "Belle's Rock", "Out in the Open", "New Horizons"],
    "Gem Grab": ["Hard Rock Mine", "Double Swoosh", "Deathcap Trap", "Ring of Fire", "Dueling Beetles", "Open Business"]
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
    "8-bit": ["Belle", "Najia", "Crow", "Pierce", "Byron", "Penny"],
    "Alli": ["Otis", "Spike", "Kenji", "Ruffs", "Bull", "Trunk", "Jack", "Sirius", "Mortis", "Emz"],
    "Amber": ["Byron", "Angelo", "Nani", "Lily", "Mortis", "Edgar", "Bea"],
    "Angelo": ["Eve", "Ruffs", "Charlie", "Belle", "Kenji", "Pierce", "Nani", "Byron", "Brock", "Kaze"],
    "Ash": ["Frank", "Trunk", "Edgar", "Rico", "Shade", "Sirius", "Kenji", "Griff"],
    "Barley": ["Mortis", "Kenji", "Edgar", "Cordelius", "Trunk"],
    "Bea": ["Charlie", "Ruffs", "Byron", "Najia", "Belle", "Angelo", "Leon"],
    "Belle": ["Piper", "Charlie", "Byron", "Nani", "Angelo"],
    "Berry": ["Kaze", "Crow", "Sirius", "Shade", "Trunk", "Clancy", "Edgar"],
    "Bibi": ["Otis", "Edgar", "Colette", "Buzz", "Bull"],
    "Bo": ["Mina", "Mortis", "Buzz", "Edgar"],
    "Bonnie": ["Charlie", "Ruffs", "Leon"],
    "Brock": ["RT", "Byron", "Pierce", "Najia", "Piper", "Jae Yong", "Kaze"],
    "Bull": ["Cordelius", "Griff", "Colette", "Otis", "Charlie", "Nita"],
    "Buster": ["Bull", "Mina", "Kenji", "Edgar", "Mortis"],
    "Buzz": ["Charlie", "Bull", "Griff", "Cordelius", "Edgar"],
    "Byron": ["Piper", "Nani", "Pierce", "Najia", "Mortis", "Kenji", "Kaze"],
    "Carl": ["Edgar", "Colette", "Otis", "Buzz"],
    "Charlie": ["Lumi", "Amber", "Byron", "Carl", "Lily", "Ruffs", "Sandy"],
    "Chester": ["Ruffs", "Alli", "Lumi", "Byron", "Najia", "Moe", "Charlie", "Otis", "Cordelius", "Nita", "Edgar"],
    "Chuck": ["Charlie", "Cordelius", "Otis", "R-T"],
    "Clancy": ["Charlie", "Ruffs", "Cordelius"],
    "Colette": ["Ruffs", "Otis", "Crow", "Charlie"],
    "Colt": ["Pierce", "Charlie", "Nani", "Otis", "Gene", "Ruffs", "Mina", "Leon", "Colette", "Kenji", "Byron", "Crow", "Gus", "Edgar", "Belle", "Clancy", "Lily", "Bull", "Mortis", "Brock", "Angelo", "Nita"],
   "Cordelius": [""],
    "Crow": [""],
    "Damian": [""],
    "Darryl": [""],
    "Doug": [""],
    "Draco": [""],
    "Dynamike": [""],
    "Edgar": [""],
    "El Primo": [""],
    "Emz": [""],
    "Eve": [""],
    "Fang": [""],
    "Finx": [""],
    "Frank": [""],
    "Gale": [""],
    "Gene": [""],
    "Gigi": [""],
    "Glowy": [""],
    "Gray": [""],
    "Griff": [""],
    "Grom": [""],
    "Gus": [""],
    "Hank": [""],
    "Jacky": [""],
    "Jae Yong": [""],
    "Janet": [""],
    "Jessie": [""],
    "Juju": [""],
    "Kaze": [""],
    "Kenji": [""],
    "Kit": [""],
    "LarryLawrie": [""],
    "Leon": [""],
    "Lily": [""],
    "Lola": [""],
    "Lou": [""],
    "Lumi": [""],
    "Maisie": [""],
    "Mandy": [""],
    "Max": [""],
    "Meeple": [""],
    "Meg": [""],
    "Melodie": [""],
    "Mico": [""],
    "Mina": [""],
    "Moe": [""],
    "Mortis": [""],
    "Mr.P": [""],
    "Najia": [""],
    "Nani": [""],
    "Nita": [""],
    "Ollie": [""],
    "Otis": [""],
    "Pam": [""],
    "Pearl": [""],
    "Penny": [""],
    "Pierce": [""],
    "Piper": [""],
    "Poco": [""],
    "R-T": [""],
    "Rico": [""],
    "Rosa": [""],
    "Ruffs": [""],
    "Sam": [""],
    "Sandy": [""],
    "Shade": [""],
    "Shelly": [""],
    "Sirius": [""],
    "Spike": [""],
    "Sprout": [""],
    "Squeak": [""],
    "Starr Nova": [""],
    "Stu": [""],
    "Surge": [""],
    "Tara": [""],
    "Tick": [""],
    "Trunk": [""],
    "Willow": [""],
    "Ziggy": [""]
};

const BRAWLERS = ["Damian", "8-Bit", "Alli", "Amber", "Angelo", "Ash", "Barley", "Bea", "Belle", "Berry", "Bibi", "Bo", "Bonnie", "Brock", "Bull", "Buster", "Buzz", "Byron", "Carl", "Charlie", "Chester", "Clancy", "Colette", "Colt", "Cordelius", "Crow", "Darryl", "Doug", "Draco", "Dynamike", "Edgar", "El Primo", "Emz", "Eve", "Fang", "Finx", "Frank", "Gale", "Gene", "Gigi", "Glowy", "Gray", "Griff", "Grom", "Gus", "Hank", "Jacky", "Jae Yong", "Janet", "Jessie", "Juju", "Kaze", "Kenji", "Kit", "LarryLawrie", "Leon", "Lily", "Lola", "Lou", "Lumi", "Maisie", "Mandy", "Max", "Meeple", "Meg", "Melodie", "Mico", "Mina", "Moe", "Mortis", "Mr.P", "Najia", "Nani", "Nita", "Ollie", "Otis", "Pam", "Pearl", "Penny", "Pierce", "Piper", "Poco", "R-T", "Rico", "Rosa", "Ruffs", "Sam", "Sandy", "Shade", "Shelly", "Sirius", "Spike", "Sprout", "Squeak", "Stu", "Surge", "Starr Nova", "Tara", "Tick", "Trunk", "Willow", "Ziggy"].sort();

let currentStep = 0, selected = [], firstPick = 'blue', draftOrder = [], picksVermelhos = [], picksAzuis = [], preSelected = null;

function limparNome(nome) { return !nome ? "" : nome.toLowerCase().replace(/[^a-z0-9]/g, ''); }
function obterContainerInimigo() { return document.getElementById('counters-list'); }
function obterContainerNosso() { return document.getElementById('podetomar-list'); }

function contarCounters(lista) {
    let contagem = {};
    lista.forEach(b => {
        let key = Object.keys(DADOS_COUNTERS).find(k => limparNome(k) === limparNome(b));
        if (key && Array.isArray(DADOS_COUNTERS[key])) DADOS_COUNTERS[key].filter(c => c && c.trim()).forEach(c => contagem[c] = (contagem[c] || 0) + 1);
    });
    return contagem;
}

function calcularCounters() {
    let container = obterContainerInimigo();
    if (!container) return;
    container.innerHTML = picksVermelhos.length === 0 ? '<p style="color:#555; font-size:11px; grid-column: span 5; text-align:center;">Aguardando adversário</p>' : "";
    if (picksVermelhos.length === 0) return;
    let contagem = contarCounters(picksVermelhos);
    Object.keys(contagem).filter(n => !selected.includes(limparNome(n))).sort((a,b) => contagem[b] - contagem[a]).forEach(nome => {
        let qtd = contagem[nome], destaque = qtd >= 2 ? 'highlight-good' : '', badge = qtd >= 2 ? `<div class="badge-multi">x${qtd}</div>` : '';
        let icon = qtd >= 2 ? `<img src="element/dragon_they_full.png" class="dragon-badge">` : '';
        container.innerHTML += `<div class="mini-brawler ${destaque}">${icon}<img src="brawlers/${limparNome(nome)}.png" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"><div class="fallback-initials">${nome.substring(0,2).toUpperCase()}</div>${badge}</div>`;
    });
}

function calcularPodeTomar() {
    let container = obterContainerNosso();
    if (!container) return;
    container.innerHTML = picksAzuis.length === 0 ? '<p style="color:#555; font-size:11px; grid-column: span 5; text-align:center;">Aguardando nosso time</p>' : "";
    if (picksAzuis.length === 0) return;
    let contagem = contarCounters(picksAzuis);
    Object.keys(contagem).filter(n => !selected.includes(limparNome(n))).sort((a,b) => contagem[b] - contagem[a]).forEach(nome => {
        let qtd = contagem[nome], destaque = qtd >= 2 ? 'highlight-good' : '', badge = qtd >= 2 ? `<div class="badge-multi">x${qtd}</div>` : '';
        let icon = qtd >= 2 ? `<img src="element/dragon_us_full.png" class="dragon-badge">` : '';
        container.innerHTML += `<div class="mini-brawler ${destaque}">${icon}<img src="brawlers/${limparNome(nome)}.png" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"><div class="fallback-initials">${nome.substring(0,2).toUpperCase()}</div>${badge}</div>`;
    });
}

function buildOrder() {
    draftOrder = [
        {slot: 'slot-b0', team: 'blue', type: 'ban'}, {slot: 'slot-b2', team: 'blue', type: 'ban'}, {slot: 'slot-b4', team: 'blue', type: 'ban'},
        {slot: 'slot-b1', team: 'red', type: 'ban'}, {slot: 'slot-b3', team: 'red', type: 'ban'}, {slot: 'slot-b5', team: 'red', type: 'ban'}
    ];
    let picks = firstPick === 'blue' ? 
        [{slot: 'slot-pA1', team: 'blue', type: 'pick'}, {slot: 'slot-pV1', team: 'red', type: 'pick'}, {slot: 'slot-pV2', team: 'red', type: 'pick'}, {slot: 'slot-pA2', team: 'blue', type: 'pick'}, {slot: 'slot-pA3', team: 'blue', type: 'pick'}, {slot: 'slot-pV3', team: 'red', type: 'pick'}] :
        [{slot: 'slot-pV1', team: 'red', type: 'pick'}, {slot: 'slot-pA1', team: 'blue', type: 'pick'}, {slot: 'slot-pA2', team: 'blue', type: 'pick'}, {slot: 'slot-pV2', team: 'red', type: 'pick'}, {slot: 'slot-pV3', team: 'red', type: 'pick'}, {slot: 'slot-pA3', team: 'blue', type: 'pick'}];
    draftOrder = draftOrder.concat(picks);
}

// Funções de Interface
window.setFirstPick = function(team) {
    firstPick = team;
    document.getElementById('fp-blue').className = 'fp-btn ' + (team === 'blue' ? 'active' : '');
    document.getElementById('fp-red').className = 'fp-btn ' + (team === 'red' ? 'active' : '');
    window.resetDraft();
};

window.popularMapas = function() {
    const select = document.getElementById('map-select');
    if (!select) return;
    select.innerHTML = '';
    Object.keys(MAPAS_ALVO).forEach(cat => {
        let optgroup = document.createElement('optgroup');
        optgroup.label = cat;
        MAPAS_ALVO[cat].forEach(mapa => {
            let opt = document.createElement('option');
            opt.value = mapa; opt.textContent = mapa;
            optgroup.appendChild(opt);
        });
        select.appendChild(optgroup);
    });
};

window.atualizarMeta = function() {
    const mapName = document.getElementById('map-select')?.value;
    if (!mapName) return;
    const metaList = DADOS_META[mapName] || [];
    document.querySelectorAll('.brawler-icon').forEach(div => {
        const nome = div.querySelector('.brawler-name')?.textContent;
        div.classList.toggle('brawler-meta', metaList.includes(nome));
    });
};

window.gerarRoster = function() {
    const container = document.getElementById('roster');
    if (!container) return;
    container.innerHTML = '';
    BRAWLERS.forEach(nome => {
        let id = limparNome(nome);
        container.innerHTML += `<div class="brawler-icon" id="b-${id}" onclick="window.clicarBrawler('${nome}', '${id}')">
            <img src="brawlers/${id}.png" onerror="this.src='brawlers/default.png'">
            <div class="brawler-name">${nome}</div>
        </div>`;
    });
};

window.clicarBrawler = function(nome, id) {
    if (currentStep >= draftOrder.length || selected.includes(id)) return;
    const step = draftOrder[currentStep];
    if (step.team === 'blue') {
        if (preSelected && preSelected.id === id) { window.confirmarBlueSelection(); return; }
        preSelected = { nome, id };
        document.getElementById(step.slot).innerHTML = `<div class="slot-assets pre-selecting" onclick="window.confirmarBlueSelection(event)"><img src="brawlers/${id}.png"><div class="slot-fallback-text">${nome}</div><div class="pre-select-badge">✓</div></div>`;
        calcularCounters(); calcularPodeTomar();
    } else {
        document.getElementById(step.slot).innerHTML = `<div class="slot-assets"><img src="brawlers/${id}.png"><div class="slot-fallback-text">${nome}</div></div>`;
        if(document.getElementById(`b-${id}`)) document.getElementById(`b-${id}`).classList.add('disabled');
        selected.push(id); if (step.type === 'pick') picksVermelhos.push(nome);
        currentStep++; preSelected = null; atualizarFoco(); calcularCounters(); calcularPodeTomar();
    }
};

window.confirmarBlueSelection = function(event) {
    if (event) event.stopPropagation(); if (!preSelected) return;
    document.getElementById(draftOrder[currentStep].slot).innerHTML = `<div class="slot-assets"><img src="brawlers/${preSelected.id}.png"><div class="slot-fallback-text">${preSelected.nome}</div></div>`;
    if(document.getElementById(`b-${preSelected.id}`)) document.getElementById(`b-${preSelected.id}`).classList.add('disabled');
    selected.push(preSelected.id); picksAzuis.push(preSelected.nome);
    preSelected = null; currentStep++; atualizarFoco(); calcularCounters(); calcularPodeTomar();
};

function atualizarFoco() {
    document.querySelectorAll('.slot').forEach(s => s.classList.remove('active-blue', 'active-red'));
    if (currentStep < draftOrder.length) {
        const next = document.getElementById(draftOrder[currentStep].slot);
        if(next) next.classList.add(draftOrder[currentStep].team === 'blue' ? 'active-blue' : 'active-red');
    }
}

window.resetDraft = function() {
    currentStep = 0; selected = []; picksVermelhos = []; picksAzuis = []; preSelected = null;
    document.querySelectorAll('.slot').forEach(s => s.innerHTML = '');
    document.querySelectorAll('.brawler-icon').forEach(b => b.classList.remove('disabled'));
    buildOrder(); atualizarFoco(); window.atualizarMeta(); calcularCounters(); calcularPodeTomar();
};

window.filtrar = function() {
    const t = document.getElementById('search')?.value.toLowerCase();
    document.querySelectorAll('.brawler-icon').forEach(div => {
        const n = div.querySelector('.brawler-name').textContent.toLowerCase();
        div.style.display = n.includes(t) ? 'flex' : 'none';
    });
};

function inicializarSistema() {
    popularMapas();
    gerarRoster();
    resetDraft();
    document.getElementById('map-select')?.addEventListener('change', window.atualizarMeta);
}

window.onload = inicializarSistema;
