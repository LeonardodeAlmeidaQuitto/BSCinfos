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

let currentStep = 0;
let selected = [];
let firstPick = 'blue';
let draftOrder = [];
let picksVermelhos = [];
let picksAzuis = [];      
let preSelected = null;
 
// =========================================================
// INTERRUPTORES RESILIENTES DE SELEÇÃO DOM (ANTI-ERRO)
// =========================================================
 
function limparNome(nome) {
    if (!nome) return "";
    return nome.toLowerCase().replace(/[^a-z0-9]/g, '');
}
 
function obterCaixaPorTexto(textoCabecalho, fallbackIndex) {
    const elementos = document.querySelectorAll('*');
    for (let el of elementos) {
        if (el.textContent.trim().toUpperCase() === textoCabecalho.toUpperCase()) {
            let pai = el.parentElement;
            if (pai) {
                let grid = pai.querySelector('.mini-brawler-grid') || pai.querySelector('div:nth-child(2)') || pai;
                return grid;
            }
        }
    }
    const grids = document.querySelectorAll('.mini-brawler-grid');
    return grids.length > fallbackIndex ? grids[fallbackIndex] : null;
}
 
function obterContainerInimigo() {
    return document.getElementById('counters-list');
}
 
function obterContainerNosso() {
    return document.getElementById('podetomar-list') || document.getElementById('counters-nosso') || obterCaixaPorTexto('COUNTERS (NOSSO)', 2);
}
 
function obterContainerMeta() {
    return document.getElementById('meta-list') || obterCaixaPorTexto('META TOP 10', 0);
}
 
function criarConteudoSlot(nome, id) {
    return `
        <div class="slot-assets">
            <img src="brawlers/${id}.png" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
            <div class="slot-fallback-text">${nome}</div>
        </div>
    `;
}
 
// =========================================================
// RENDERIZAÇÃO DE INTERFACE
// =========================================================
 
function popularMapas() {
    const select = document.getElementById('map-select') || document.querySelector('.map-selector select') || document.querySelector('select');
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
    const grid = document.getElementById('roster') || document.querySelector('.roster-grid');
    if (!grid) return;
    grid.innerHTML = "";
    BRAWLERS.forEach(nome => {
        const id = limparNome(nome);
        const div = document.createElement('div');
        div.className = 'brawler-icon';
        div.id = `b-${id}`;
        div.innerHTML = `
            <div class="brawler-img-container">
                <img src="brawlers/${id}.png" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" title="${nome}">
                <div class="fallback-initials">${nome.substring(0,2).toUpperCase()}</div>
            </div>
            <span class="brawler-name">${nome}</span>
        `;
        div.onclick = () => clicarBrawler(nome, id);
        grid.appendChild(div);
    });
}
 
window.atualizarMeta = function() {
    const select = document.getElementById('map-select') || document.querySelector('.map-selector select') || document.querySelector('select');
    const mapaSelecionado = select ? select.value : '';
    const container = obterContainerMeta();
    if (!container) return;
    container.innerHTML = "";
    
    const metaBrawlers = DADOS_META[mapaSelecionado];
    if (metaBrawlers && metaBrawlers.length > 0) {
        metaBrawlers.forEach(nome => {
            const id = limparNome(nome);
            container.innerHTML += `
                <div class="mini-brawler" title="Top Pick: ${nome}">
                    <img src="brawlers/${id}.png" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                    <div class="fallback-initials">${nome.substring(0,2).toUpperCase()}</div>
                </div>`;
        });
    } else {
        container.innerHTML = '<p style="color:#555; font-size:11px; grid-column: span 5; text-align:center;">Selecione um mapa.</p>';
    }
};
 
// =========================================================
// LÓGICA DE CÁLCULO DE COUNTERS
// =========================================================
 
// FIX AUXILIAR: filtra entradas vazias do array de counters
function contarCounters(listaBrawlers) {
    let contagem = {};
    listaBrawlers.forEach(brawler => {
        let brawlerKey = Object.keys(DADOS_COUNTERS).find(k => limparNome(k) === limparNome(brawler));
        if (brawlerKey && Array.isArray(DADOS_COUNTERS[brawlerKey])) {
            DADOS_COUNTERS[brawlerKey]
                .filter(counter => counter && counter.trim() !== "") // FIX: ignora strings vazias [""]
                .forEach(counter => {
                    contagem[counter] = (contagem[counter] || 0) + 1;
                });
        }
    });
    return contagem;
}
 
// COUNTERS (INIMIGO): quem countera os picks VERMELHOS → recomendações para nós
// Dragon: dragon_they_full.png (vermelho)
function calcularCounters() {
    let container = obterContainerInimigo();
    if (!container) return;
    container.innerHTML = "";
 
    if (picksVermelhos.length === 0) {
        container.innerHTML = '<p style="color:#555; font-size:11px; grid-column: span 5; text-align:center;">Aguardando adversário</p>';
        return;
    }
 
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
            const id = limparNome(nome);
            let qtd = contagemCounters[nome];
 
           let destaqueClass = qtd >= 2 ? 'highlight-good' : '';
           let badge = qtd >= 2 ? `<div class="badge-multi">x${qtd}</div>` : '';
           let dragonIcon = qtd >= 2 ? `<img src="element/dragon_happy.png" style="position: absolute !important; top: -15px !important; right: -15px !important; width: 50px !important; height: 50px !important; min-width: 50px !important; min-height: 50px !important; max-width: 50px !important; max-height: 50px !important; object-fit: contain !important; z-index: 100 !important; pointer-events: none !important; margin: 0 !important; padding: 0 !important; border: none !important;">` : '';
            container.innerHTML += `
                <div class="mini-brawler ${destaqueClass}" title="${nome} (Counter x${qtd})">
                    ${dragonIcon}
                    <img src="brawlers/${id}.png" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                    <div class="fallback-initials">${nome.substring(0,2).toUpperCase()}</div>
                    ${badge}
                </div>`;
        });
    } else {
        container.innerHTML = '<p style="color:#555; font-size:11px; grid-column: span 5; text-align:center;">Sem recomendações.</p>';
    }
}
 
// COUNTERS (NOSSO): quem countera os picks AZUIS → ameaças ao nosso time
// Dragon: dragon_US_full.png (verde)
function calcularPodeTomar() {
    let container = obterContainerNosso();
    if (!container) return;
    container.innerHTML = "";
 
    let listaAzuisParaCalcular = [...picksAzuis];
    const step = draftOrder[currentStep];
    if (preSelected && step && step.team === 'blue' && step.type === 'pick') {
        if (!listaAzuisParaCalcular.includes(preSelected.nome)) {
            listaAzuisParaCalcular.push(preSelected.nome);
        }
    }
 
    if (listaAzuisParaCalcular.length === 0) {
        container.innerHTML = '<p style="color:#555; font-size:11px; grid-column: span 5; text-align:center;">Aguardando nosso time</p>';
        return;
    }
 
    // FIX PRINCIPAL: era "listaVermelhaParaCalcular" (variável inexistente!) → corrigido para "listaAzuisParaCalcular"
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
            const id = limparNome(nome);
            let qtd = contagemAmeacas[nome];
 
            let destaqueClass = qtd >= 2 ? 'highlight-bad' : '';
            let badge = qtd >= 2 ? `<div class="badge-multi">x${qtd}</div>` : '';
            let dragonIcon = qtd >= 2 ? `<img src="element/dragon_cry.png" style="position: absolute !important; top: -4px !important; right: -4px !important; width: 16px !important; height: 16px !important; min-width: 16px !important; min-height: 16px !important; max-width: 16px !important; max-height: 16px !important; object-fit: contain !important; z-index: 100 !important; pointer-events: none !important; margin: 0 !important; padding: 0 !important; border: none !important;">` : '';
            container.innerHTML += `
                <div class="mini-brawler ${destaqueClass}" title="${nome} (Counter x${qtd})">
                    ${dragonIcon}
                    <img src="brawlers/${id}.png" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                    <div class="fallback-initials">${nome.substring(0,2).toUpperCase()}</div>
                    ${badge}
                </div>`;
        });
    } else {
        container.innerHTML = '<p style="color:#555; font-size:11px; grid-column: span 5; text-align:center;">Sem ameaças.</p>';
    }
}
 
// =========================================================
// FLUXO DO DRAFT (ORDEM, CLIQUE E CONFIRMAÇÃO)
// =========================================================
 
function buildOrder() {
    const order = [
        { slot: 'slot-b0', team: 'blue', type: 'ban' }, { slot: 'slot-b2', team: 'blue', type: 'ban' }, { slot: 'slot-b4', team: 'blue', type: 'ban' }, 
        { slot: 'slot-b1', team: 'red', type: 'ban' }, { slot: 'slot-b3', team: 'red', type: 'ban' }, { slot: 'slot-b5', team: 'red', type: 'ban' }
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
 
    if (step.team === 'blue') {
        if (preSelected && preSelected.id === id) {
            window.confirmarBlueSelection();
            return;
        }
        preSelected = { nome, id };
        slot.innerHTML = `
            <div class="slot-assets pre-selecting" onclick="window.confirmarBlueSelection(event)">
                <img src="brawlers/${id}.png" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
                <div class="slot-fallback-text">${nome}</div>
                <div class="pre-select-badge">✓</div>
            </div>
        `;
        
        calcularCounters();
        calcularPodeTomar();
    } else {
        slot.innerHTML = criarConteudoSlot(nome, id);
        const icon = document.getElementById(`b-${id}`);
        if(icon) icon.classList.add('disabled');
        selected.push(id);
 
        if (step.type === 'pick') {
            picksVermelhos.push(nome);
        }
 
        currentStep++;
        preSelected = null;
        atualizarFoco();
        calcularCounters();
        calcularPodeTomar();
    }
};
 
window.confirmarBlueSelection = function(event) {
    if (event) event.stopPropagation(); 
    if (!preSelected) return;
 
    const { nome, id } = preSelected;
    const step = draftOrder[currentStep];
    const slot = document.getElementById(step.slot);
 
    if (slot) {
        slot.innerHTML = criarConteudoSlot(nome, id);
    }
 
    const icon = document.getElementById(`b-${id}`);
    if(icon) icon.classList.add('disabled');
    selected.push(id);
 
    if (step.type === 'pick') {
        picksAzuis.push(nome);
    }
 
    preSelected = null; 
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
 
// =========================================================
// CONTROLES DE SISTEMA (RESET E FILTRO)
// =========================================================
 
window.setFirstPick = function(team) {
    firstPick = team;
    const btnBlue = document.getElementById('fp-blue');
    const btnRed = document.getElementById('fp-red');
    if(btnBlue) btnBlue.classList.toggle('active', team === 'blue');
    if(btnRed) btnRed.classList.toggle('active', team === 'red');
    resetDraft();
};
 
window.resetDraft = function() {
    currentStep = 0; selected = []; picksVermelhos = []; picksAzuis = []; preSelected = null;
    document.querySelectorAll('.slot').forEach(s => s.innerHTML = '');
    document.querySelectorAll('.brawler-icon').forEach(b => b.classList.remove('disabled'));
    buildOrder();
    atualizarFoco();
    window.atualizarMeta();
    calcularCounters();
    calcularPodeTomar();
};
 
window.filtrar = function() {
    const searchInput = document.getElementById('search') || document.querySelector('.search-bar');
    if(!searchInput) return;
    const t = searchInput.value.toLowerCase();
    document.querySelectorAll('.brawler-icon').forEach(div => {
        const n = div.querySelector('.brawler-name').textContent.toLowerCase();
        div.style.display = n.includes(t) ? 'flex' : 'none';
    });
};
 
function inicializarSistema() {
    popularMapas();
    gerarRoster();
    resetDraft();
    
    const mapSelect = document.getElementById('map-select') || document.querySelector('.map-selector select') || document.querySelector('select');
    if (mapSelect) {
        mapSelect.addEventListener('change', window.atualizarMeta);
    }
    
    const searchInput = document.getElementById('search') || document.querySelector('.search-bar');
    if (searchInput) {
        searchInput.removeAttribute('oninput'); 
        searchInput.addEventListener('input', window.filtrar);
    }
}
 
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inicializarSistema);
} else {
    inicializarSistema();
}
