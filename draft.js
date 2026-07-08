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
 
function limparNome(nome) { return !nome ? "" : nome.toLowerCase().replace(/[^a-z0-9]/g, ''); }
function obterContainerInimigo() { return document.getElementById('counters-list'); }
function obterContainerNosso() { return document.getElementById('podetomar-list'); }
function obterContainerMeta() { return document.getElementById('meta-list'); }
 
function criarConteudoSlot(nome, id) {
    return `<div class="slot-assets"><img src="brawlers/${id}.png" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"><div class="slot-fallback-text">${nome}</div></div>`;
}

const formatarNomeMapa = (m) => `element/maps/${m.toLowerCase().replace(/[^a-z0-9]/g, "")}.png`;

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
        const id = limparNome(nome);
        const div = document.createElement('div');
        div.className = 'brawler-icon'; div.id = `b-${id}`;
        div.innerHTML = `<div class="brawler-img-container"><img src="brawlers/${id}.png" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" title="${nome}"><div class="fallback-initials">${nome.substring(0,2).toUpperCase()}</div></div><span class="brawler-name">${nome}</span>`;
        div.onclick = () => clicarBrawler(nome, id);
        grid.appendChild(div);
    });
}

window.atualizarMapaVisual = function() {
    const select = document.getElementById('map-select');
    const mapImg = document.getElementById('center-map-img');
    const placeholder = document.getElementById('map-placeholder');
    
    if (select && select.value && mapImg) {
        mapImg.style.display = 'block';
        if (placeholder) placeholder.style.display = 'none';
        mapImg.src = `mapas/${select.value}.png`; 
        mapImg.onerror = function() {
            this.style.display = 'none';
            if (placeholder) { placeholder.style.display = 'block'; placeholder.innerHTML = 'IMAGEM<br>NÃO<br>ENCONTRADA'; }
        };
    }
};
 
window.atualizarMeta = function() {
    const select = document.getElementById('map-select');
    const mapaSelecionado = select ? select.value : '';
    const container = obterContainerMeta();
    if (!container) return;
    container.innerHTML = "";
    
    const metaBrawlers = DADOS_META[mapaSelecionado];
    if (metaBrawlers && metaBrawlers.length > 0) {
        metaBrawlers.forEach(nome => {
            const id = limparNome(nome);
            container.innerHTML += `<div class="mini-brawler" title="Top Pick: ${nome}"><img src="brawlers/${id}.png" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"><div class="fallback-initials">${nome.substring(0,2).toUpperCase()}</div></div>`;
        });
    } else {
        container.innerHTML = '<p style="color:#555; font-size:11px; width: 100%; text-align:center;">Selecione um mapa.</p>';
    }
};
 
function contarCounters(listaBrawlers) {
    let contagem = {};
    listaBrawlers.forEach(brawler => {
        let brawlerKey = Object.keys(DADOS_COUNTERS).find(k => limparNome(k) === limparNome(brawler));
        if (brawlerKey && Array.isArray(DADOS_COUNTERS[brawlerKey])) {
            DADOS_COUNTERS[brawlerKey].filter(counter => counter && counter.trim() !== "").forEach(counter => { contagem[counter] = (contagem[counter] || 0) + 1; });
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
        if (preSelected && preSelected.id === id) { window.confirmarBlueSelection(); return; }
        preSelected = { nome, id };
        slot.innerHTML = `<div class="slot-assets pre-selecting" onclick="window.confirmarBlueSelection(event)"><img src="brawlers/${id}.png" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"><div class="slot-fallback-text">${nome}</div><div class="pre-select-badge">✓</div></div>`;
        calcularCounters(); calcularPodeTomar();
    } else {
        slot.innerHTML = criarConteudoSlot(nome, id);
        const icon = document.getElementById(`b-${id}`);
        if(icon) icon.classList.add('disabled');
        selected.push(id);
        if (step.type === 'pick') picksVermelhos.push(nome);
        currentStep++; preSelected = null; atualizarFoco(); calcularCounters(); calcularPodeTomar();
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
    if(icon) icon.classList.add('disabled');
    selected.push(id);
    if (step.type === 'pick') picksAzuis.push(nome);
    preSelected = null; currentStep++; atualizarFoco(); calcularCounters(); calcularPodeTomar();
};
 
function atualizarFoco() {
    document.querySelectorAll('.slot').forEach(s => s.classList.remove('active-blue', 'active-red'));
    if (currentStep < draftOrder.length) {      
        const next = draftOrder[currentStep];
        const nextSlot = document.getElementById(next.slot);
        if(nextSlot) nextSlot.classList.add(next.team === 'blue' ? 'active-blue' : 'active-red');
    }
}
 
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
    buildOrder(); atualizarFoco(); window.atualizarMeta(); calcularCounters(); calcularPodeTomar();
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
window.atualizarMapaVisual = function() {
    const mapSelect = document.getElementById('map-select');
    const mapPreview = document.getElementById('map-preview');
    
    if (mapSelect && mapPreview && mapSelect.value) {
        let nomeDoMapa = mapSelect.value;
        
        // Função para formatar o nome do mapa (remove espaços e aspas, deixa minúsculo)
        // Se você já tiver uma função formatImg global, pode usar ela diretamente: formatImg(nomeDoMapa)
        let nomeFormatado = nomeDoMapa.toLowerCase().replace(/[\s\.]+/g, '_').replace(/[']/g, '');
        
        // Atualiza o src da imagem com o caminho correto
        mapPreview.src = `element/maps/${nomeFormatado}.png`;
    }
};
 
if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', inicializarSistema); } 
else { inicializarSistema(); }
