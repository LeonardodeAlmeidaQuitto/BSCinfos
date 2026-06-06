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

let currentStep = 0; let selected = []; let picksVermelhos = []; let picksAzuis = []; let preSelected = null;
let draftOrder = []; 

function limparNome(nome) { return nome ? nome.toLowerCase().replace(/[^a-z0-9]/g, '') : ""; }

function renderizarLista(containerId, contagem) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = "";
    Object.keys(contagem).sort((a, b) => contagem[b] - contagem[a]).forEach(nome => {
        container.innerHTML += `<div class="mini-brawler"><img src="brawlers/${limparNome(nome)}.png" title="${nome}"><span>x${contagem[nome]}</span></div>`;
    });
}

// CIMA: Quem countera o time inimigo
function calcularCounters() {
    let contagem = {};
    picksVermelhos.forEach(b => {
        let key = Object.keys(DADOS_COUNTERS).find(k => limparNome(k) === limparNome(b));
        if (key && DADOS_COUNTERS[key]) DADOS_COUNTERS[key].forEach(c => contagem[c] = (contagem[c] || 0) + 1);
    });
    renderizarLista('counters-list', contagem);
}

// BAIXO: Quem countera o SEU time (Ameaças)
function calcularPodeTomar() {
    let contagem = {};
    let listaAzuis = [...picksAzuis];
    if (preSelected) listaAzuis.push(preSelected.nome);

    Object.keys(DADOS_COUNTERS).forEach(candidato => {
        listaAzuis.forEach(meuBrawler => {
            if (DADOS_COUNTERS[candidato].includes(meuBrawler)) {
                contagem[candidato] = (contagem[candidato] || 0) + 1;
            }
        });
    });
    renderizarLista('podetomar-list', contagem);
}

window.clicarBrawler = function(nome, id) {
    const step = draftOrder[currentStep];
    if (!step) return;
    if (step.team === 'blue') {
        preSelected = { nome, id };
        document.getElementById(step.slot).innerHTML = `SELECIONANDO: ${nome}`;
    } else {
        document.getElementById(step.slot).innerHTML = `<img src="brawlers/${id}.png">`;
        picksVermelhos.push(nome);
        currentStep++;
    }
    calcularCounters();
    calcularPodeTomar();
};

window.confirmarBlueSelection = function() {
    if (!preSelected) return;
    document.getElementById(draftOrder[currentStep].slot).innerHTML = `<img src="brawlers/${preSelected.id}.png">`;
    picksAzuis.push(preSelected.nome);
    currentStep++;
    preSelected = null;
    calcularCounters();
    calcularPodeTomar();
};

function inicializarSistema() {
    draftOrder = [{ slot: 'slot-pA1', team: 'blue', type: 'pick' }, { slot: 'slot-pV1', team: 'red', type: 'pick' }];
}

inicializarSistema();
