// --- DADOS DO SISTEMA ---
const MAPAS_ALVO = {
    "Brawl Ball": ["Super Beach", "Pinhole Punt", "Sneaky Fields"],
    "Bounty": ["Shooting Star", "Hideout", "Layer Cake"],
    "Heist": ["Hot Potato", "Safe Zone", "Bridge Too Far"],
    "Knockout": ["Goldarm Gulch", "Belle's Rock", "Out in the Open"],
    "Gem Grab": ["Hard Rock Mine", "Double Swoosh", "Deathcap Trap"]
};

// SUBSTITUA PELOS SEUS DADOS DA PLANILHA
const DADOS_META = {
// Brawl Ball
    "Super Beach": ["Max", "Sandy", "Cordelius", "Melodie", "Stu", "Buster", "Charlie", "Rico", "Fang", "Colt"],
    "Pinhole Punt": [],
    "Sneak Fields": [],
//Bounty
    "Shooting Star": [],
    "Hideout": [],
    "Layer Cake": [],
//Heist
    "Hot Potato": [],
    "Safe Zone": [],
    "Bridge Too Far": [],
//Knockout
    "Goldarm Gulch": [],
    "Belle's Rock": [],
    "Out in the Open": [],
//Gem Grab
    "Hard Rock Mine": [],
    "Double Swoosh": [],
    "Deathcap Trap": [],

};

const DADOS_COUNTERS = {
    "8-bit": ["Belle", "Najia", "Crow", "Pierce", "Byron", "Penny"], //Alcance-Avanço
    "Alli": ["Otis", "Spike", "Kenji", "Ruffs", "Bull", "Trunk", "Jack", "Sirius", "Mortis", "Spike", "Emz"], //DPS-Alcance
    "Amber": ["Byron", "Angelo", "Nani", "Lily", "Mortis", "Edgar", "Bea", ], //Alcance-Avanço
    "Angelo": ["Eve", "Ruffs", "Charlie", "Belle", "Kenji", "Pierce", "Nani", "Byron", "Brock", "Kaze"], //Pet-Avanço-Alcance + Kaze
    "Ash": ["Frank", "Trunk", "Edgar", "Rico", "Shade", "Sirius", "Kenji", "Trunk", "Griff"], //Avanço-Controle
    "Barley": ["Mortis", "Kenji", "Edgar", "Cordelious", "Trunk"], //Avanço
    "Bea": ["Charlie", "Ruffs", "Byron", "Najia", "Belle", "Angelo", "Leon"], //Pet-Alcance
    "Belle": ["Piper", "Charlie", "Byron", "Nani", "Piper", "Angelo"], //Alcance + Charlie
    "Berry": ["Kaze", "Crow", "Sirius", "Shade", "Trunk", "Clancy", "Edgar"], //Avanço-Controle
    "Bibi": ["Otis", "Edgar", "Colette", "Buzz", "Bull"], //DPS(Curto)-Stun
    "Bo": ["Mina", "Mortis", "Buzz", "Edgar"], //Avanço 
    "Bonnie": ["Charlie", "Ruffs", "Leon"], //Pet
    "Brock": ["RT", "Byron", "Pierce", "Najia", "Piper", "Jae Young", "Kaze"], //Alcance + Kaze
    "Bull": ["Cordelious", "Griff", "Colette", "Otis", "Charlie", "Nita"], //Stun-DPS
    "Buster": ["Bull", "Mina", "Kenji", "Edgar", "Mortis"], //Avanço
    "Buzz": ["Charlie", "Bull", "Griff", "Cordelious", "Edgar"], //Stun-DPS(Longo/Curto)
    "Byron": ["Piper", "Nani", "Pierce", "Najia", "Mortis", "Kenji", "Kaze"], //Alcance-Avanço
    "Carl": ["Edgar", "Colette", "Otis", "Buzz"], //Avanço-Stun(Cortar Ult)
    "Charlie": ["Lumi", "Amber", "Byron", "Carl", "Lily", "Ruffs", "Sandy"], //Atravessa Tiro-
    "Chester": ["Ruffs", "Alli", "Lumi", "Byron", "Najia", "Moe", "Charlie", "Otis", "Cordelious", "Nita", "Edgar"], //Alcance-Avanço
    "Chuck": ["Charlie", "Cordelious", "Otis", "RT"], //Stun-Heist Safer
    "Clancy": ["Charlie", "Ruffs", "Cordelious"], //Pet-Stun
    "Colette": ["Ruffs", "Otis", "Crow", "Charlie"],
    "Colt": ["Pierce", "Charlie", "Nani", "Otis", "Gene", "Ruffs", "Mina", "Leon", "Colette", "Kenji", "Byron", "Crow", "Gus", "Edgar", "Belle", "Clancy", "Lily", "Bull", "Mortis", "Brock", "Angelo", "Nita"], //Alcance-Avanço
    "Cordelious": [""],
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
    "Jae-Young": [""],
    "Janet": [""],
    "Jessie": [""],
    "Juju": [""],
    "Kaze": [""],
    "Kenji": [""],
    "Kit": [""],
    "Larrylawrie": [""],
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
    "Nani: [""],
    "Nita: [""],
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
    "Starr Nova": [""],
    "Sprout": [""],
    "Squeak": [""],
    "Stu": [""],
    "Surge": [""],
    "Tara": [""],
    "Tick": [""],
    "Trunk": [""],
    "Willow": [""],
    "Ziggy": [""]
};

const BRAWLERS = ["Damian", "8-Bit", "Alli", "Amber", "Angelo", "Ash", "Barley", "Bea", "Belle", "Berry", "Bibi", "Bo", "Bonnie", "Brock", "Bull", "Buster", "Buzz", "Byron", "Carl", "Charlie", "Chester", "Clancy", "Colette", "Colt", "Cordelius", "Crow", "Darryl", "Doug", "Draco", "Dynamike", "Edgar", "El Primo", "Emz", "Eve", "Fang", "Finx", "Frank", "Gale", "Gene", "Gigi", "Glowy", "Gray", "Griff", "Grom", "Gus", "Hank", "Jacky", "Jae Yong", "Janet", "Jessie", "Juju", "Kaze", "Kenji", "Kit", "LarryLawrie", "Leon", "Lily", "Lola", "Lou", "Lumi", "Maisie", "Mandy", "Max", "Meeple", "Meg", "Melodie", "Mico", "Mina", "Moe", "Mortis", "Mr.P", "Najia", "Nani", "Nita", "Ollie", "Otis", "Pam", "Pearl", "Penny", "Pierce", "Piper", "Poco", "R-T", "Rico", "Rosa", "Ruffs", "Sam", "Sandy", "Shade", "Shelly", "Sirius", "Spike", "Sprout", "Squeak", "Stu", "Surge", "Tara", "Tick", "Trunk", "Willow", "Ziggy"].sort();

let currentStep = 0;
let selected = [];
let firstPick = 'blue';
let draftOrder = [];
let picksVermelhos = []; // Nova variável para rastrear os brawlers do time vermelho

// --- FUNÇÕES DE INICIALIZAÇÃO ---
function popularMapas() {
    const select = document.getElementById('map-select');
    if (!select) return;
    select.innerHTML = '<option value="" disabled selected>SELECIONE O MAPA</option>';
    Object.entries(MAPAS_ALVO).forEach(([modo, mapas]) => {
        const grupo = document.createElement('optgroup');
        grupo.label = modo.toUpperCase();
        mapas.forEach(mapa => {
            const opt = document.createElement('option');
            opt.value = mapa; opt.textContent = mapa;
            grupo.appendChild(opt);
        });
        select.appendChild(grupo);
    });
}

function gerarRoster() {
    const grid = document.getElementById('roster');
    if (!grid) return;
    grid.innerHTML = "";
    BRAWLERS.forEach(nome => {
        const id = nome.toLowerCase().replace(/[^a-z0-9]/g, '');
        const div = document.createElement('div');
        div.className = 'brawler-icon';
        div.id = `b-${id}`;
        div.innerHTML = `<img src="brawlers/${id}.png" onerror="this.src='brawlers/default.png';" title="${nome}">`;
        div.onclick = () => clicarBrawler(nome, id);
        grid.appendChild(div);
    });
}

// --- LÓGICA DOS PAINÉIS LATERAIS ---
window.atualizarMeta = function() {
    const mapaSelecionado = document.getElementById('map-select').value;
    const container = document.getElementById('meta-list');
    container.innerHTML = ""; // Limpa a lista
    
    const metaBrawlers = DADOS_META[mapaSelecionado];

    if (metaBrawlers && metaBrawlers.length > 0) {
        metaBrawlers.forEach(nome => {
            const id = nome.toLowerCase().replace(/[^a-z0-9]/g, '');
            container.innerHTML += `<div class="mini-brawler" title="Top Pick: ${nome}"><img src="brawlers/${id}.png" onerror="this.src='brawlers/default.png';"></div>`;
        });
    } else {
        container.innerHTML = `<p style="color:#555; font-size:12px; grid-column: span 5; text-align:center;">Dados não encontrados para este mapa.</p>`;
    }
};

function calcularCounters() {

    const container = document.getElementById('counters-list');
    container.innerHTML = "";

    if (picksVermelhos.length === 0) {
        container.innerHTML = `<p style="color:#555; font-size:12px; grid-column: span 5; text-align:center;">Aguardando picks vermelhos</p>`;
        return;
    }

    let countersSugeridos = new Set();

    picksVermelhos.forEach(brawler => {
        if (DADOS_COUNTERS[brawler]) {
            DADOS_COUNTERS[brawler].forEach(counter => countersSugeridos.add(counter));
        }
    });

    if (countersSugeridos.size > 0) {
        countersSugeridos.forEach(nome => {
            const id = nome.toLowerCase().replace(/[^a-z0-9]/g, '');
            // Só mostra como counter se o brawler ainda não foi banido/pickado
            if (!selected.includes(id)) {
                container.innerHTML += `<div class="mini-brawler" title="Countera o time vermelho: ${nome}"><img src="brawlers/${id}.png" onerror="this.src='brawlers/default.png';"></div>`;
            }
        });
    } else {
        container.innerHTML = `<p style="color:#555; font-size:12px; grid-column: span 5; text-align:center;">Nenhum counter mapeado.</p>`;
    }
}


// --- LÓGICA DO DRAFT ---
window.setFirstPick = function(team) {
    firstPick = team;
    document.getElementById('fp-blue').classList.toggle('active', team === 'blue');
    document.getElementById('fp-red').classList.toggle('active', team === 'red')
    resetDraft();
};

function buildOrder() {
    // Nova ordem: 3 bans azuis seguidos por 3 bans vermelhos
    const order = [
        { slot: 'slot-b0', team: 'blue', type: 'ban' }, 
        { slot: 'slot-b2', team: 'blue', type: 'ban' },
        { slot: 'slot-b4', team: 'blue', type: 'ban' }, 
        { slot: 'slot-b1', team: 'red', type: 'ban' },
        { slot: 'slot-b3', team: 'red', type: 'ban' }, 
        { slot: 'slot-b5', team: 'red', type: 'ban' }
    ];

    if (firstPick === 'blue') {
        order.push(
            { slot: 'slot-pA1', team: 'blue', type: 'pick' }, { slot: 'slot-pV1', team: 'red', type: 'pick' },
            { slot: 'slot-pV2', team: 'red', type: 'pick' }, { slot: 'slot-pA2', team: 'blue', type: 'pick' },
            { slot: 'slot-pA3', team: 'blue', type: 'pick' }, { slot: 'slot-pV3', team: 'red', type: 'pick' }
        );
    } else {
        order.push(
            { slot: 'slot-pV1', team: 'red', type: 'pick' }, { slot: 'slot-pA1', team: 'blue', type: 'pick' },
            { slot: 'slot-pA2', team: 'blue', type: 'pick' }, { slot: 'slot-pV2', team: 'red', type: 'pick' },
            { slot: 'slot-pV3', team: 'red', type: 'pick' }, { slot: 'slot-pA3', team: 'blue', type: 'pick' }
        );
    }
    draftOrder = order;
}

window.clicarBrawler = function(nome, id) {
    if (currentStep >= draftOrder.length || selected.includes(id)) return;
    const step = draftOrder[currentStep];
    const slot = document.getElementById(step.slot);
    
    if(slot) {
        slot.innerHTML = `<img src="brawlers/${id}.png" onerror="this.src='brawlers/default.png';">`;
        document.getElementById(`b-${id}`).classList.add('disabled');
        selected.push(id);
    
        // Se for um pick do time vermelho, registra e atualiza painel de counters
        if(step.team === 'red' && step.type === 'pick') {
            picksVermelhos.push(nome);
        }
        
        currentStep++;
        atualizarFoco();
        calcularCounters(); // Recalcula os counters após o pick
    }
};

function atualizarFoco() {
    document.querySelectorAll('.slot').forEach(s => s.classList.remove('active-blue', 'active-red'));
    if (currentStep < draftOrder.length) {      
        const next = draftOrder[currentStep];
        const nextSlot = document.getElementById(next.slot);
    if(nextSlot) nextSlot.classList.add(next.team === 'blue' ? 'active-blue' : 'active-red');
    }
}

window.resetDraft = function() {
    currentStep = 0; 
    selected = [];
    picksVermelhos = []; // Reseta o histórico vermelho
    
    document.querySelectorAll('.slot').forEach(s => s.innerHTML = '');
    document.querySelectorAll('.brawler-icon').forEach(b => b.classList.remove('disabled'));

    buildOrder();
    atualizarFoco();
    calcularCounters(); // Reseta visualmente a caixa de counters
};

window.filtrar = function() {
    const t = document.getElementById('search').value.toLowerCase();
    document.querySelectorAll('.brawler-icon').forEach(div => {
        const n = div.querySelector('img').title.toLowerCase();
        div.style.display = n.includes(t) ? 'block' : 'none';
    });
};

document.addEventListener('DOMContentLoaded', () => {
    popularMapas();
    gerarRoster();
    resetDraft();
});

