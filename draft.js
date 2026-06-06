// --- DADOS DO SISTEMA ---
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

let currentStep = 0; let selected = []; let firstPick = 'blue';
let draftOrder = []; let picksVermelhos = []; let picksAzuis = []; let preSelected = null;

function limparNome(nome) { return nome ? nome.toLowerCase().replace(/[^a-z0-9]/g, '') : ""; }

function obterContainer(id) { return document.getElementById(id); }

function criarConteudoSlot(nome, id) {
    return `<div class="slot-assets"><img src="brawlers/${id}.png" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"><div class="slot-fallback-text">${nome}</div></div>`;
}

function popularMapas() {
    const select = document.querySelector('select');
    if (!select) return;
    select.innerHTML = '<option value="" disabled selected>SELECIONE O MAPA</option>';
    Object.entries(MAPAS_ALVO).forEach(([modo, mapas]) => {
        const grupo = document.createElement('optgroup'); grupo.label = modo.toUpperCase();
        mapas.forEach(mapa => { const opt = document.createElement('option'); opt.value = mapa; opt.textContent = mapa; grupo.appendChild(opt); });
        select.appendChild(grupo);
    });
}

function gerarRoster() {
    const grid = document.getElementById('roster');
    if (!grid) return;
    grid.innerHTML = "";
    BRAWLERS.forEach(nome => {
        const id = limparNome(nome);
        const div = document.createElement('div');
        div.className = 'brawler-icon'; div.id = `b-${id}`;
        div.innerHTML = `<img src="brawlers/${id}.png"><span class="brawler-name">${nome}</span>`;
        div.onclick = () => clicarBrawler(nome, id);
        grid.appendChild(div);
    });
}

window.atualizarMeta = function() {
    const select = document.querySelector('select');
    const container = obterContainer('meta-list');
    if (!container || !select) return;
    container.innerHTML = "";
    (DADOS_META[select.value] || []).forEach(nome => {
        container.innerHTML += `<div class="mini-brawler"><img src="brawlers/${limparNome(nome)}.png"></div>`;
    });
};

function calcularCounters() {
    const container = obterContainer('counters-list');
    if (!container) return;
    container.innerHTML = "";
    if (picksVermelhos.length === 0) { container.innerHTML = '<p>Aguardando adversário</p>'; return; }

    let contagem = {};
    picksVermelhos.forEach(brawler => {
        let brawlerKey = Object.keys(DADOS_COUNTERS).find(k => limparNome(k) === limparNome(brawler));
        if (brawlerKey && DADOS_COUNTERS[brawlerKey]) {
            DADOS_COUNTERS[brawlerKey].forEach(c => contagem[c] = (contagem[c] || 0) + 1);
        }
    });

    Object.keys(contagem).sort((a, b) => contagem[b] - contagem[a]).forEach(nome => {
        container.innerHTML += `<div class="mini-brawler" title="${nome}">x${contagem[nome]}<img src="brawlers/${limparNome(nome)}.png"></div>`;
    });
}

function calcularPodeTomar() {
    const container = obterContainer('podetomar-list');
    if (!container) return;
    container.innerHTML = "";
    
    let listaAzuis = [...picksAzuis];
    if (preSelected) listaAzuis.push(preSelected.nome);

    let contagem = {};
    listaAzuis.forEach(brawler => {
        let brawlerKey = Object.keys(DADOS_COUNTERS).find(k => limparNome(k) === limparNome(brawler));
        if (brawlerKey && DADOS_COUNTERS[brawlerKey]) {
            DADOS_COUNTERS[brawlerKey].forEach(c => contagem[c] = (contagem[c] || 0) + 1);
        }
    });

    Object.keys(contagem).sort((a, b) => contagem[b] - contagem[a]).forEach(nome => {
        container.innerHTML += `<div class="mini-brawler" title="${nome}">x${contagem[nome]}<img src="brawlers/${limparNome(nome)}.png"></div>`;
    });
}

function buildOrder() {
    draftOrder = [{ slot: 'slot-pA1', team: 'blue', type: 'pick' }, { slot: 'slot-pV1', team: 'red', type: 'pick' }];
}

window.clicarBrawler = function(nome, id) {
    const step = draftOrder[currentStep];
    if (!step) return;
    if (step.team === 'blue') {
        preSelected = { nome, id };
        document.getElementById(step.slot).innerHTML = `PRE-SELECIONADO: ${nome}`;
        calcularCounters(); calcularPodeTomar();
    } else {
        document.getElementById(step.slot).innerHTML = criarConteudoSlot(nome, id);
        picksVermelhos.push(nome);
        currentStep++;
        calcularCounters(); calcularPodeTomar();
    }
};

window.confirmarBlueSelection = function() {
    if (!preSelected) return;
    document.getElementById(draftOrder[currentStep].slot).innerHTML = criarConteudoSlot(preSelected.nome, preSelected.id);
    picksAzuis.push(preSelected.nome);
    currentStep++;
    preSelected = null;
    calcularCounters(); calcularPodeTomar();
};

function inicializarSistema() {
    popularMapas(); gerarRoster(); buildOrder();
}

inicializarSistema();
