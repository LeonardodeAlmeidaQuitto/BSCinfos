// --- DADOS DO SISTEMA ---
const MAPAS_ALVO = {
    "Brawl Ball": ["Super Beach", "Pinhole Punt", "Sneaky Fields"],
    "Bounty": ["Shooting Star", "Hideout", "Layer Cake"],
    "Heist": ["Hot Potato", "Safe Zone", "Bridge Too Far"],
    "Knockout": ["Goldarm Gulch", "Belle's Rock", "Out in the Open"],
    "Gem Grab": ["Hard Rock Mine", "Double Swoosh", "Deathcap Trap"]
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
    "Brock": ["RT", "Byron", "Pierce", "Najia", "Piper", "Jae Young", "Kaze"],
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
    "Cordelius": [], "Crow": [], "Damian": [], "Darryl": [], "Doug": [], "Draco": [], "Dynamike": [],
    "Edgar": [], "El Primo": [], "Emz": [], "Eve": [], "Fang": [], "Finx": [], "Frank": [], "Gale": [],
    "Gene": [], "Gigi": [], "Glowy": [], "Gray": [], "Griff": [], "Grom": [], "Gus": [], "Hank": [],
    "Jacky": [], "Jae Yong": [], "Janet": [], "Jessie": [], "Juju": [], "Kaze": [], "Kenji": [], "Kit": [],
    "LarryLawrie": [], "Leon": [], "Lily": [], "Lola": [], "Lou": [], "Lumi": [], "Maisie": [], "Mandy": [],
    "Max": [], "Meeple": [], "Meg": [], "Melodie": [], "Mico": [], "Mina": [], "Moe": [], "Mortis": [],
    "Mr.P": [], "Najia": [], "Nani": [], "Nita": [], "Ollie": [], "Otis": [], "Pam": [], "Pearl": [],
    "Penny": [], "Pierce": [], "Piper": [], "Poco": [], "R-T": [], "Rico": [], "Rosa": [], "Ruffs": [],
    "Sam": [], "Sandy": [], "Shade": [], "Shelly": [], "Sirius": [], "Spike": [], "Starr Nova": [],
    "Sprout": [], "Squeak": [], "Stu": [], "Surge": [], "Tara": [], "Tick": [], "Trunk": [], "Willow": [], "Ziggy": []
};

const BRAWLERS = ["Damian", "8-Bit", "Alli", "Amber", "Angelo", "Ash", "Barley", "Bea", "Belle", "Berry", "Bibi", "Bo", "Bonnie", "Brock", "Bull", "Buster", "Buzz", "Byron", "Carl", "Charlie", "Chester", "Clancy", "Colette", "Colt", "Cordelius", "Crow", "Darryl", "Doug", "Draco", "Dynamike", "Edgar", "El Primo", "Emz", "Eve", "Fang", "Finx", "Frank", "Gale", "Gene", "Gigi", "Glowy", "Gray", "Griff", "Grom", "Gus", "Hank", "Jacky", "Jae Yong", "Janet", "Jessie", "Juju", "Kaze", "Kenji", "Kit", "LarryLawrie", "Leon", "Lily", "Lola", "Lou", "Lumi", "Maisie", "Mandy", "Max", "Meeple", "Meg", "Melodie", "Mico", "Mina", "Moe", "Mortis", "Mr.P", "Najia", "Nani", "Nita", "Ollie", "Otis", "Pam", "Pearl", "Penny", "Pierce", "Piper", "Poco", "R-T", "Rico", "Rosa", "Ruffs", "Sam", "Sandy", "Shade", "Shelly", "Sirius", "Spike", "Sprout", "Squeak", "Stu", "Surge", "Tara", "Tick", "Trunk", "Willow", "Ziggy"].sort();

let currentStep = 0;
let selected = [];
let firstPick = 'blue';
let draftOrder = [];
let picksVermelhos = [];
let picksAzuis = [];      // Histórico de picks confirmados do time azul
let preSelected = null;   // Guarda o brawler temporário que aguarda confirmação azul

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
    if (!container) return;
    container.innerHTML = "";
    
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
    if (!container) return;
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
            if (!selected.includes(id)) {
                container.innerHTML += `<div class="mini-brawler" title="Countera o time vermelho: ${nome}"><img src="brawlers/${id}.png" onerror="this.src='brawlers/default.png';"></div>`;
            }
        });
    } else {
        container.innerHTML = `<p style="color:#555; font-size:12px; grid-column: span 5; text-align:center;">Nenhum counter mapeado.</p>`;
    }
}

// AJUSTADO: "Pode Tomar" lê o que countera os picks do AZUL (exibe no 1º clique)
function calcularPodeTomar() {
    const container = document.getElementById('podetomar-list');
    if (!container) return;
    container.innerHTML = "";

    // Junta as escolhas azuis confirmadas + escolha pré-selecionada atual (se for um pick azul)
    let tempPicksAzuis = [...picksAzuis];
    if (currentStep < draftOrder.length) {
        const step = draftOrder[currentStep];
        if (preSelected && step.team === 'blue' && step.type === 'pick') {
            tempPicksAzuis.push(preSelected.nome);
        }
    }

    if (tempPicksAzuis.length === 0) {
        container.innerHTML = `<p style="color:#555; font-size:12px; grid-column: span 5; text-align:center;">Aguardando picks azuis</p>`;
        return;
    }

    let ameacasSugeridas = new Set();
    tempPicksAzuis.forEach(brawler => {
        if (DADOS_COUNTERS[brawler]) {
            DADOS_COUNTERS[brawler].forEach(counter => ameacasSugeridas.add(counter));
        }
    });

    if (ameacasSugeridas.size > 0) {
        ameacasSugeridas.forEach(nome => {
            const id = nome.toLowerCase().replace(/[^a-z0-9]/g, '');
            if (!selected.includes(id)) {
                container.innerHTML += `<div class="mini-brawler" title="Perigo! Podem counterar o Azul: ${nome}"><img src="brawlers/${id}.png" onerror="this.src='brawlers/default.png';"></div>`;
            }
        });
    } else {
        container.innerHTML = `<p style="color:#555; font-size:12px; grid-column: span 5; text-align:center;">Nenhuma ameaça mapeada.</p>`;
    }
}

// --- LÓGICA DO DRAFT ---
window.setFirstPick = function(team) {
    firstPick = team;
    document.getElementById('fp-blue').classList.toggle('active', team === 'blue');
    document.getElementById('fp-red').classList.toggle('active', team === 'red');
    resetDraft();
};

function buildOrder() {
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
    if (!slot) return;

    // SISTEMA DE CONFIRMAÇÃO DO TIME AZUL (Picks e Bans)
    if (step.team === 'blue') {
        if (preSelected) {
            // Se clicar no mesmo brawler novamente, confirma a seleção
            if (preSelected.id === id) {
                window.confirmarBlueSelection();
                return;
            } else {
                // Se clicar num brawler diferente, troca a pré-seleção
                preSelected = { nome, id };
            }
        } else {
            // Primeiro clique no brawler
            preSelected = { nome, id };
        }

        // Renderiza no slot com o overlay de CONFIRMAR por cima
        slot.innerHTML = `
            <div style="position: relative; width: 100%; height: 100%;">
                <img src="brawlers/${id}.png" onerror="this.src='brawlers/default.png';" style="width:100%; height:100%; object-fit:cover;">
                <div class="confirm-overlay" onclick="window.confirmarBlueSelection(event)">CONFIRMAR</div>
            </div>
        `;

        // Calcula e exibe instantaneamente os counters no primeiro clique
        calcularCounters();
        calcularPodeTomar();

    } else {
        // TIME VERMELHO - Clique único direto original
        slot.innerHTML = `<img src="brawlers/${id}.png" onerror="this.src='brawlers/default.png';">`;
        document.getElementById(`b-${id}`).classList.add('disabled');
        selected.push(id);

        if (step.type === 'pick') {
            picksVermelhos.push(nome);
        }

        currentStep++;
        atualizarFoco();
        calcularCounters();
        calcularPodeTomar();
    }
};

// FUNÇÃO PARA CONFIRMAR DEFINITIVAMENTE A SELEÇÃO AZUL
window.confirmarBlueSelection = function(event) {
    if (event) event.stopPropagation(); // Impede bugs de bolhas de clique
    if (!preSelected) return;

    const { nome, id } = preSelected;
    const step = draftOrder[currentStep];
    const slot = document.getElementById(step.slot);

    if (slot) {
        // Remove o overlay e fixa apenas a imagem limpa
        slot.innerHTML = `<img src="brawlers/${id}.png" onerror="this.src='brawlers/default.png';">`;
    }

    document.getElementById(`b-${id}`).classList.add('disabled');
    selected.push(id);

    if (step.type === 'pick') {
        picksAzuis.push(nome);
    }

    preSelected = null; // Reseta o estado temporário
    currentStep++;
    atualizarFoco();
    calcularCounters();
    calcularPodeTomar();
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
    picksVermelhos = [];
    picksAzuis = [];
    preSelected = null;
    
    document.querySelectorAll('.slot').forEach(s => s.innerHTML = '');
    document.querySelectorAll('.brawler-icon').forEach(b => b.classList.remove('disabled'));

    buildOrder();
    atualizarFoco();
    calcularCounters();
    calcularPodeTomar();
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
