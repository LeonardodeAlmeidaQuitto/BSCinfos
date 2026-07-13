let dadosBrutos = [];
let dadosFiltrados = [];
let dadosBans = [];
let dadosBansFiltrados = [];
let listaBrawlers = [];
let brawlerSelecionado = null;
let timeSelecionado = null;
let mapaSelecionado = null;
 
const _REGIAO = window.REGIAO_ATUAL ? window.REGIAO_ATUAL.toUpperCase() : "SA";
const REGIOES_TODAS = ["SA", "NA", "EMEA", "EA", "ALL"];

// Funções Auxiliares Adicionais (Garantia contra falhas)
function parseDateBR(dataStr) {
    if (!dataStr) return 0;
    let p = dataStr.split(' ');
    let d = p[0].split('/');
    let t = p[1] ? p[1].split(':') : ['0','0','0'];
    if (d.length === 3) {
        return new Date(d[2], d[1] - 1, d[0], t[0], t[1], t[2]).getTime();
    }
    return new Date(dataStr).getTime() || 0;
}

window.teamLogoUrl = function(id) { return `element/teams/${id.toLowerCase()}.png`; };
window.teamLogoFallback = function(id) { return `element/teams/default.png`; };
window.teamLogoOnError = function(id) { return `this.onerror=null; this.src='element/teams/default.png';`; };
window.isTimeDaRegiaoAtual = function(id) { 
    if (_REGIAO === "ALL") return true;
    for (let tier in CONFIGURACAO_MANUAL_TIMES[_REGIAO]) {
        if (CONFIGURACAO_MANUAL_TIMES[_REGIAO][tier].some(t => t.id_time === id)) return true;
    }
    return true; 
};

// ========================================================
// 1. CONFIGURAÇÃO DE ROTAÇÃO DE MAPAS MENSAL
// ========================================================
const ROTACAO_MAPAS = {
    "2026": {
        "06": { 
            "Brawl Ball": ["Pinhole Punt", "Sneaky Fields", "Triple Dribble"], 
            "Gem Grab": ["Hard Rock Mine", "Crystal Arcade", "Gem Fort"],
            "Hot Zone": ["Dueling Beetles", "Open Business", "Ring of Fire"],
            "Heist": ["Safe Zone", "Kaboom Canyon", "Pit Stop"],
            "Bounty": ["Hideout", "Shooting Star", "Layer Cake"],
            "Knockout": ["Goldarm Gulch", "Out in the Open", "New Horizons"]
        }
    }
};
 
let CONFIGURACAO_MANUAL_TIMES = {};
let ROSTERS_AUTO = {};
 
function chaveMesAtiva() {
    const selectAno = document.getElementById('select-ano');
    const selectMes = document.getElementById('select-mes');
    let ano = selectAno ? selectAno.value : 'todos';
    let mes = selectMes ? selectMes.value : 'todos';
    if (ano === 'todos' || mes === 'todos') {
        const agora = new Date();
        ano = String(agora.getFullYear());
        mes = String(agora.getMonth() + 1).padStart(2, '0');
    }
    return `${ano}-${mes}`;
}

function chaveStorageTimes(regiao, mesChave) { 
    return `customTeams_${regiao}_${mesChave}`; 
}

function carregarTimesDoMes(regiao, mesChave) {
    try { 
        return JSON.parse(localStorage.getItem(chaveStorageTimes(regiao, mesChave))) || []; 
    } catch (e) { 
        return []; 
    }
}
 
function salvarTimesDoMes(regiao, mesChave, times) {
    localStorage.setItem(chaveStorageTimes(regiao, mesChave), JSON.stringify(times));
}

function atualizarRostersAtuais() {
    const mesChave = chaveMesAtiva();
    CONFIGURACAO_MANUAL_TIMES = {};
    
    let selectAno = document.getElementById('select-ano');
    let selectMes = document.getElementById('select-mes');
    const ano = selectAno ? selectAno.value : 'todos';
    const mes = selectMes ? selectMes.value : 'todos';
    
    let baseRosters = {};
    if (typeof ROSTERS_POR_DATA !== 'undefined') {
        if (ano !== 'todos' && mes !== 'todos' && ROSTERS_POR_DATA[ano] && ROSTERS_POR_DATA[ano][mes]) {
            baseRosters = JSON.parse(JSON.stringify(ROSTERS_POR_DATA[ano][mes]));
        } else {
            baseRosters = JSON.parse(JSON.stringify(ROSTERS_POR_DATA["PADRAO"] || {}));
        }
    }

    REGIOES_TODAS.forEach(reg => {
        CONFIGURACAO_MANUAL_TIMES[reg] = baseRosters[reg] || { "TIER ?": [], "TIMES REGISTRADOS": [] };
        
        if (!CONFIGURACAO_MANUAL_TIMES[reg]["TIER ?"]) CONFIGURACAO_MANUAL_TIMES[reg]["TIER ?"] = [];
        if (!CONFIGURACAO_MANUAL_TIMES[reg]["TIMES REGISTRADOS"]) CONFIGURACAO_MANUAL_TIMES[reg]["TIMES REGISTRADOS"] = [];

        carregarTimesDoMes(reg, mesChave).forEach(t => {
            let tierAlvo = t.tier && t.tier.trim() !== '' ? t.tier : 'TIMES REGISTRADOS';
            if (!CONFIGURACAO_MANUAL_TIMES[reg][tierAlvo]) CONFIGURACAO_MANUAL_TIMES[reg][tierAlvo] = [];
            
            if (!CONFIGURACAO_MANUAL_TIMES[reg][tierAlvo].find(e => e.id_time === t.id_time)) {
                CONFIGURACAO_MANUAL_TIMES[reg][tierAlvo].push(t);
            }
        });
    });
}
 
function encontrarTimePorRoster(tagsArray) {
    let tagsValidas = (tagsArray || []).filter(t => t && t !== '#' && t !== 'None');
    if (tagsValidas.length < 3) return null;
    for (let reg in CONFIGURACAO_MANUAL_TIMES) {
        for (let tier in CONFIGURACAO_MANUAL_TIMES[reg]) {
            if (tier === "TIER ?") continue;
            for (let team of CONFIGURACAO_MANUAL_TIMES[reg][tier]) {
                let tagsRoster = team.jogadores.map(j => j.tag).filter(t => t && t !== '#');
                if (tagsRoster.length < 3 || tagsRoster.length > 4) continue;
                
                let matchCount = 0;
                team.jogadores.forEach(j => { if (tagsArray.includes(j.tag)) matchCount++; });
                
                if (matchCount === 3) {
                    return { id: team.id_time, nome: team.nome_time, regiao: reg };
                }
            }
        }
    }
    return null;
}
 
function nickAtualizado(tag, fallback) {
    let melhor = null, ts = -1;
    dadosBrutos.forEach(r => {
        if (r.player_tag === tag && r.player_name) {
            let t = parseDateBR(r.data_adicao);
            if (t > ts) { ts = t; melhor = r.player_name; }
        }
    });
    return melhor || fallback || '';
}

// ==========================================
// 3. CARREGAMENTO E PROCESSAMENTO
// ==========================================
function carregarCSV() {
    fetch('api/rosters_auto.json')
        .then(r => r.ok ? r.json() : {})
        .then(j => { ROSTERS_AUTO = j || {}; })
        .catch(() => { ROSTERS_AUTO = {}; });
 
    // Encadeando os Papa.parse para garantir a leitura do arquivo de bans e histórico
    Papa.parse("bans_matcherino.csv", {
        download: true,
        header: true,
        skipEmptyLines: true,
        complete: function(resBans) {
            dadosBans = resBans.data;
            carregarHistoricoBruto();
        },
        error: function() {
            dadosBans = [];
            carregarHistoricoBruto();
        }
    });

    function carregarHistoricoBruto() {
        Papa.parse("historico_bruto.csv", {
            download: true, 
            header: true, 
            skipEmptyLines: true,
            complete: function(results) {
                dadosBrutos = results.data;
                processarDadosGlobais();
            }
        });
    }
}

function processarTimesDesconhecidos(dados) {
    let mapUNK = new Map();
    let counter = 1;
    let regAlvo = _REGIAO === "ALL" ? "SA" : _REGIAO;

    if (!CONFIGURACAO_MANUAL_TIMES[regAlvo]) CONFIGURACAO_MANUAL_TIMES[regAlvo] = {};
    if (!CONFIGURACAO_MANUAL_TIMES[regAlvo]["TIER ?"]) CONFIGURACAO_MANUAL_TIMES[regAlvo]["TIER ?"] = [];

    dados.forEach(linha => {
        let isKnown = encontrarTimePorRoster([linha.player_tag]);
        if (!isKnown && linha.id_players && linha.name_players && linha.player_tag) {
            if (_REGIAO !== "ALL" && !(linha.regiao || '').split('/').includes(_REGIAO)) return;
            
            const ids = linha.id_players.split(';');
            const names = linha.name_players.split(';');
            const pIdx = ids.indexOf(linha.player_tag);
            
            if (pIdx !== -1) {
                let opTeam = encontrarTimePorRoster(ids);
                if (opTeam && (_REGIAO === "ALL" || opTeam.regiao === _REGIAO)) {
                    linha.id_time = opTeam.id; 
                    linha.nome_time = opTeam.nome;
                } else {
                    const tTags = ids;
                    const tNames = names;
                    const sig = tTags.slice().sort().join('_'); 
                    
                    if (!mapUNK.has(sig)) {
                        const nId = `UNK${counter}`, nName = `Unknow ${counter}`;
                        mapUNK.set(sig, { id: nId, nome: nName });
                        CONFIGURACAO_MANUAL_TIMES[regAlvo]["TIER ?"].push({
                            id_time: nId, nome_time: nName,
                            jogadores: [ 
                                { nick: tNames[0] || '', tag: tTags[0] || '' }, 
                                { nick: tNames[1] || '', tag: tTags[1] || '' }, 
                                { nick: tNames[2] || '', tag: tTags[2] || '' } 
                            ]
                        });
                        counter++;
                    }
                    
                    const gen = mapUNK.get(sig);
                    linha.id_time = gen.id; linha.nome_time = gen.nome;
                }
            }
        }
    });
}
 
function popularFiltrosGlobais() {
    let anos = new Set(), meses = new Set(), dias = new Set();
    dadosBrutos.forEach(row => {
        if(row.data_adicao) {
            let partes = row.data_adicao.split(' ')[0].split('/');
            if(partes.length === 3) { dias.add(partes[0]); meses.add(partes[1]); anos.add(partes[2]); }
        }
    });
    
    const sAno = document.getElementById('select-ano');
    const sMes = document.getElementById('select-mes');
    const sDia = document.getElementById('select-dia');
    
    if (sAno) { sAno.innerHTML = '<option value="todos">Todos os Anos</option>'; Array.from(anos).sort().forEach(a => sAno.innerHTML += `<option value="${a}">${a}</option>`); }
    if (sMes) { sMes.innerHTML = '<option value="todos">Todos os Meses</option>'; Array.from(meses).sort().forEach(m => sMes.innerHTML += `<option value="${m}">${m}</option>`); }
    if (sDia) { sDia.innerHTML = '<option value="todos">Todos os Dias</option>'; Array.from(dias).sort().forEach(d => sDia.innerHTML += `<option value="${d}">${d}</option>`); }
 
    const sTipo = document.getElementById('select-tipo');
    if (sTipo && !document.getElementById('scrims-team-filter')) {
        let fScrim = document.createElement('select');
        fScrim.id = 'scrims-team-filter'; 
        fScrim.className = 'filter-select'; 
        fScrim.style.display = 'none'; 
        fScrim.innerHTML = '<option value="todos">Todos os Times (Scrims)</option>';
        fScrim.onchange = () => { if (window.currentScrims) renderizarListaScrims(window.currentScrims); };
        sTipo.parentNode.insertBefore(fScrim, sTipo.nextSibling);
 
        let customWrap = document.createElement('div');
        customWrap.id = 'scrims-team-filter-custom';
        customWrap.style.cssText = 'position:relative; display:none; min-width:230px; user-select:none;';
        customWrap.innerHTML = `
            <div id="scrims-team-filter-trigger" class="filter-select" style="display:flex; align-items:center; gap:8px; cursor:pointer;">
                <img id="scrims-team-filter-trigger-logo" src="" style="width:20px; height:20px; object-fit:contain; border-radius:4px; display:none;">
                <span id="scrims-team-filter-trigger-label" style="flex:1; text-align:left;">Todos os Times (Scrims)</span>
                <span style="font-size:10px; opacity:0.7;">▼</span>
            </div>
            <div id="scrims-team-filter-options" style="display:none; position:absolute; top:108%; left:0; right:0; min-width:230px; max-height:300px; overflow-y:auto; background:var(--bg-cards, #181820); border:1px solid var(--borda-destaque, #3a3a45); border-radius:8px; z-index:1000; box-shadow:0 8px 24px rgba(0,0,0,0.4);"></div>
        `;
        sTipo.parentNode.insertBefore(customWrap, fScrim.nextSibling);
 
        customWrap.querySelector('#scrims-team-filter-trigger').onclick = (e) => {
            e.stopPropagation();
            let box = document.getElementById('scrims-team-filter-options');
            box.style.display = box.style.display === 'none' ? 'block' : 'none';
        };
        
        document.addEventListener('click', () => {
            let box = document.getElementById('scrims-team-filter-options');
            if (box) box.style.display = 'none';
        });
 
        let iSample = document.createElement('input');
        iSample.type = 'number'; iSample.id = 'sample-picks-meta'; iSample.className = 'filter-select'; iSample.style.display = 'none'; 
        iSample.value = '1'; iSample.min = '1'; iSample.placeholder = 'Sample Picks';
        iSample.onchange = processarDadosGlobais;
        sTipo.parentNode.insertBefore(iSample, customWrap.nextSibling);
 
        document.body.addEventListener('click', () => {
            setTimeout(() => {
                let eS = document.getElementById('tela-scrims'), eM = document.getElementById('tela-meta');
                customWrap.style.display = (eS && !eS.classList.contains('tela-oculta')) ? 'inline-block' : 'none';
                iSample.style.display = (eM && !eM.classList.contains('tela-oculta')) ? 'inline-block' : 'none';
            }, 50);
        });
    }
}
 
function atualizarDropdownTimesScrims(timesNaScrimMap, valorAtual) {
    const selectFiltro = document.getElementById('scrims-team-filter');
    const optionsBox = document.getElementById('scrims-team-filter-options');
    const triggerLabel = document.getElementById('scrims-team-filter-trigger-label');
    const triggerLogo = document.getElementById('scrims-team-filter-trigger-logo');
    if (!selectFiltro || !optionsBox) return;
 
    const aplicarSelecao = (nome, id) => {
        selectFiltro.value = nome;
        if (triggerLabel) triggerLabel.innerText = nome === 'todos' ? 'Todos os Times (Scrims)' : nome;
        if (triggerLogo) {
            if (id) { triggerLogo.src = teamLogoUrl(id); triggerLogo.onerror = () => { triggerLogo.onerror = null; triggerLogo.src = teamLogoFallback(id); }; triggerLogo.style.display = 'inline-block'; }
            else triggerLogo.style.display = 'none';
        }
        optionsBox.style.display = 'none';
        if (window.currentScrims) renderizarListaScrims(window.currentScrims);
    };
 
    optionsBox.innerHTML = '';
    let optTodos = document.createElement('div');
    optTodos.style.cssText = 'display:flex; align-items:center; gap:8px; padding:9px 14px; cursor:pointer; font-weight:bold;';
    optTodos.innerText = 'Todos os Times (Scrims)';
    optTodos.onmouseenter = () => optTodos.style.background = 'rgba(255,255,255,0.06)';
    optTodos.onmouseleave = () => optTodos.style.background = 'transparent';
    optTodos.onclick = (e) => { e.stopPropagation(); aplicarSelecao('todos', null); };
    optionsBox.appendChild(optTodos);
 
    Array.from(timesNaScrimMap.entries()).sort((a, b) => a[0].localeCompare(b[0])).forEach(([nome, id]) => {
        let opt = document.createElement('div');
        opt.style.cssText = 'display:flex; align-items:center; gap:8px; padding:9px 14px; cursor:pointer; font-weight:bold;';
        let img = document.createElement('img');
        img.src = teamLogoUrl(id); img.style.cssText = 'width:20px; height:20px; object-fit:contain; border-radius:4px;';
        img.onerror = () => { img.onerror = null; img.src = teamLogoFallback(id); };
        let span = document.createElement('span'); span.innerText = nome;
        opt.appendChild(img); opt.appendChild(span);
        opt.onmouseenter = () => opt.style.background = 'rgba(255,255,255,0.06)';
        opt.onmouseleave = () => opt.style.background = 'transparent';
        opt.onclick = (e) => { e.stopPropagation(); aplicarSelecao(nome, id); };
        optionsBox.appendChild(opt);
    });
 
    if (valorAtual === 'todos') {
        if (triggerLabel) triggerLabel.innerText = 'Todos os Times (Scrims)';
        if (triggerLogo) triggerLogo.style.display = 'none';
    } else {
        let id = timesNaScrimMap.get(valorAtual);
        if (triggerLabel) triggerLabel.innerText = valorAtual;
        if (triggerLogo) {
            if (id) { triggerLogo.src = teamLogoUrl(id); triggerLogo.onerror = () => { triggerLogo.onerror = null; triggerLogo.src = teamLogoFallback(id); }; triggerLogo.style.display = 'inline-block'; }
            else triggerLogo.style.display = 'none';
        }
    }
}
 
// ==========================================
// 4. NOVA LÓGICA MD3: ESTRUTURAR E PROCESSAR DADOS
// ==========================================
function estruturarMD3(dadosPeriodo) {
    let rawMatches = {};
    let partidasEstruturadas = [];
    let dadosMD3Condensados = [];
    let scrims = [];
    
    dadosPeriodo.forEach(r => { 
        if(!rawMatches[r.id_partida]) rawMatches[r.id_partida] = []; 
        rawMatches[r.id_partida].push(r); 
    });
 
    const validarVencedorPartida = (t0, t1) => {
        const winsT0 = t0.map(p => parseInt(p.win)), winsT1 = t1.map(p => parseInt(p.win));
        const valido = w => w === 0 || w === 1;
        if (!winsT0.every(valido) || !winsT1.every(valido)) return null;
        if (!winsT0.every(w => w === winsT0[0]) || !winsT1.every(w => w === winsT1[0])) return null;
        if (winsT0[0] === winsT1[0]) return null; 
        return winsT0[0] === 1 ? 'A' : 'B';
    };
 
    Object.values(rawMatches).forEach(linhas => {
        if(linhas.length !== 6) return; 
        
        // Agrupa as linhas por time de forma rigorosa
        let timesAgrupados = {};
        linhas.forEach(l => {
            if (!timesAgrupados[l.id_time]) timesAgrupados[l.id_time] = [];
            timesAgrupados[l.id_time].push(l);
        });
        let timesArray = Object.values(timesAgrupados);
        if (timesArray.length !== 2 || timesArray[0].length !== 3 || timesArray[1].length !== 3) return;

        let t0 = timesArray[0], t1 = timesArray[1];
        let t0Id = t0[0].id_time, t1Id = t1[0].id_time;
        
        if (!t0Id || !t1Id || t0Id === t1Id) return;
        if (typeof isTimeDaRegiaoAtual === 'function' && _REGIAO !== "ALL" && !isTimeDaRegiaoAtual(t0Id) && !isTimeDaRegiaoAtual(t1Id)) return;
 
        let resultado = validarVencedorPartida(t0, t1);
 
        partidasEstruturadas.push({
            id: linhas[0].id_partida, modo: linhas[0].modo, mapa: linhas[0].mapa,
            tAId: t0Id, tBId: t1Id, tANome: t0[0].nome_time, tBNome: t1[0].nome_time,
            picksA: t0.map(p => (p.pick||'').toUpperCase()), picksB: t1.map(p => (p.pick||'').toUpperCase()),
            tagsA: t0.map(p => p.player_tag), tagsB: t1.map(p => p.player_tag),
            t0Full: t0, t1Full: t1, 
            vencedor: resultado === 'A' ? t0Id : (resultado === 'B' ? t1Id : null), 
            timestamp: typeof parseDateBR === 'function' ? parseDateBR(linhas[0].data_adicao) : 0,
            dataFormatada: linhas[0].data_adicao, 
            tipo: linhas[0].tipo || 'scrim', 
            isMatcherino: linhas[0].id_partida && linhas[0].id_partida.startsWith('mtcr_'),
            linhasOriginais: linhas
        });
    });

    // Construção das Scrims agrupadas (Este era o trecho faltando e que esvaziava os dados)
    let agrupamentoScrims = {};
    partidasEstruturadas.forEach(p => {
        let dataCurta = p.dataFormatada ? p.dataFormatada.split(' ')[0] : 'Indefinido';
        let idA = p.tAId < p.tBId ? p.tAId : p.tBId;
        let idB = p.tAId < p.tBId ? p.tBId : p.tAId;
        let nomeA = p.tAId < p.tBId ? p.tANome : p.tBNome;
        let nomeB = p.tAId < p.tBId ? p.tBNome : p.tANome;

        let key = `${idA}_${idB}_${dataCurta}`;
        if (p.tipo === 'tournament' || p.isMatcherino) key += '_tournament';

        if (!agrupamentoScrims[key]) {
            agrupamentoScrims[key] = {
                tAId: idA, tBId: idB,
                tANome: nomeA, tBNome: nomeB,
                dataFormatada: dataCurta,
                sets: [],
                timestamp: p.timestamp,
                temMatcherino: false
            };
        }
        if (p.isMatcherino) agrupamentoScrims[key].temMatcherino = true;
        agrupamentoScrims[key].sets.push(p);
    });

    scrims = Object.values(agrupamentoScrims);
    scrims.forEach(s => {
        s.sets.sort((a,b) => a.timestamp - b.timestamp);
    });

    // Simulação do loop de Scrims corrigido da captura de tela
    scrims.forEach(scrim => {
        let roundsMD3 = [];
        let scoreScrimA = 0;
        let scoreScrimB = 0;
        let currentSets = [];
        let winsA = 0;
        let winsB = 0;

        const fecharRound = (setsDoRound) => {
            if (setsDoRound.length === 0) return;
            
            let vencedorRound = null;
            if (winsA > winsB) { vencedorRound = scrim.tAId; scoreScrimA++; }
            else if (winsB > winsA) { vencedorRound = scrim.tBId; scoreScrimB++; }
            
            let firstSet = setsDoRound[0];
            roundsMD3.push({
                firstSet: firstSet,
                vencedor: vencedorRound,
                tAId: scrim.tAId,
                tBId: scrim.tBId,
                tANome: scrim.tANome,
                tBNome: scrim.tBNome,
                modo: firstSet.modo,
                mapa: firstSet.mapa,
                scoreA: winsA,
                scoreB: winsB
            });
 
            if (vencedorRound !== null) {
                firstSet.linhasOriginais.forEach(linha => {
                    let novaLinha = { ...linha };
                    novaLinha.win = (novaLinha.id_time === vencedorRound) ? "1" : "0";
                    dadosMD3Condensados.push(novaLinha);
                });
            }
        };
 
        scrim.sets.forEach(set => {
            if(currentSets.length > 0 && currentSets[0].mapa !== set.mapa) {
                fecharRound(currentSets);
                currentSets = []; winsA = 0; winsB = 0;
            }
            currentSets.push(set);
            if (set.vencedor === scrim.tAId) winsA++;
            else if (set.vencedor === scrim.tBId) winsB++;
 
            if (winsA === 2 || winsB === 2) {
                fecharRound(currentSets);
                currentSets = []; winsA = 0; winsB = 0;
            }
        });
        
        if (currentSets.length > 0) fecharRound(currentSets);
 
        scrim.roundsMD3 = roundsMD3;
        scrim.scoreA = scoreScrimA;
        scrim.scoreB = scoreScrimB;
    });
 
    scrims = scrims.filter(s => s.roundsMD3 && s.roundsMD3.length > 0).reverse();
    return { dadosCondensados: dadosMD3Condensados, scrimsMD3: scrims };
}
 
function processarDadosGlobais() {
    atualizarRostersAtuais();
    processarTimesDesconhecidos(dadosBrutos); 
 
    const ano = document.getElementById('select-ano') ? document.getElementById('select-ano').value : 'todos';
    const mes = document.getElementById('select-mes') ? document.getElementById('select-mes').value : 'todos';
    const dia = document.getElementById('select-dia') ? document.getElementById('select-dia').value : 'todos';
    const tipo = document.getElementById('select-tipo') ? document.getElementById('select-tipo').value : 'todos';
 
    let filterFn = row => {
        let mA = true, mM = true, mD = true, mT = true;
        if(row.data_adicao) {
            let p = row.data_adicao.split(' ')[0].split('/');
            if(ano !== 'todos') mA = p[2] === ano;
            if(mes !== 'todos') mM = p[1] === mes;
            if(dia !== 'todos') mD = p[0] === dia;
        }
        if(tipo !== 'todos') mT = (row.tipo === tipo);
        
        let comp = typeof isTimeDaRegiaoAtual === 'function' ? isTimeDaRegiaoAtual(row.id_time) : true;
        return mA && mM && mD && mT && comp;
    };
 
    let dadosRaw = dadosBrutos.filter(filterFn);
    dadosBansFiltrados = dadosBans.filter(filterFn);
 
    let estruturado = estruturarMD3(dadosRaw);
    dadosFiltrados = estruturado.dadosCondensados; 
 
    renderizarMeta();
    renderizarSidebarMapas();
    if (mapaSelecionado) renderizarDetalhesMapa(mapaSelecionado.modo, mapaSelecionado.mapa);
    renderizarSidebarBrawlers();
    if(brawlerSelecionado) renderizarDetalhesBrawler(brawlerSelecionado);
    renderizarSidebarTimes();
    if(timeSelecionado) renderizarDetalhesTime(timeSelecionado);
    
    processarScrimesMD3(estruturado.scrimsMD3);
}
 
// ==========================================
// 5. TELA META
// ==========================================
window.toggleModoMeta = function(idModo) {
    const c = document.getElementById(`modo-content-${idModo}`);
    if(c) c.style.display = (c.style.display === 'none' || !c.style.display) ? 'block' : 'none';
}
 
function obterRotacaoAtiva(ano, mes) {
    if (ano !== 'todos' && mes !== 'todos' && ROTACAO_MAPAS[ano] && ROTACAO_MAPAS[ano][mes]) {
        return ROTACAO_MAPAS[ano][mes];
    }
    let anos = Object.keys(ROTACAO_MAPAS).sort().reverse();
    for (let a of anos) {
        let meses = Object.keys(ROTACAO_MAPAS[a]).sort().reverse();
        for (let m of meses) return ROTACAO_MAPAS[a][m];
    }
    return null;
}
 
function renderizarMeta() {
    const container = document.getElementById('conteudo-meta');
    let sMap = {}, sAll = {}, bMap = {}, bAll = {}, mSet = new Set(), pMap = {}, tPU = 0, jBMap = {}, jBT = new Set();
    let iS = document.getElementById('sample-picks-meta'), samplePicks = iS ? parseInt(iS.value) || 1 : 1;
    const ano = document.getElementById('select-ano') ? document.getElementById('select-ano').value : 'todos';
    const mes = document.getElementById('select-mes') ? document.getElementById('select-mes').value : 'todos';
    const rotacaoAtiva = obterRotacaoAtiva(ano, mes);
 
    dadosFiltrados.forEach(row => {
        let b = (row.pick || '').toUpperCase(), map = row.mapa || "Desconhecido", mode = row.modo || "Desconhecido";
        if(!b) return;
        
        if(!sAll[b]) sAll[b] = { picks: 0, wins: 0 };
        sAll[b].picks++; if(parseInt(row.win) === 1) sAll[b].wins++;
        
        if(!sMap[mode]) sMap[mode] = {}; 
        if(!sMap[mode][map]) sMap[mode][map] = {}; 
        if(!sMap[mode][map][b]) sMap[mode][map][b] = { picks: 0, wins: 0 };
        
        sMap[mode][map][b].picks++; 
        if(parseInt(row.win) === 1) sMap[mode][map][b].wins++;
 
        if(!mSet.has(row.id_partida)) {
            mSet.add(row.id_partida); tPU++;
            if(!pMap[mode]) pMap[mode] = {}; 
            pMap[mode][map] = (pMap[mode][map] || 0) + 1;
        }
    });
 
    dadosBansFiltrados.forEach(row => {
        let b = (row.brawler_banido || '').toUpperCase(), map = row.mapa || 'Unknown', mode = row.modo || 'Unknown';
        if (!b) return;
        if (!bMap[mode]) bMap[mode] = {}; 
        if (!bMap[mode][map]) bMap[mode][map] = {};
        
        bMap[mode][map][b] = (bMap[mode][map][b] || 0) + 1;
        
        if (!jBMap[mode]) jBMap[mode] = {}; 
        if (!jBMap[mode][map]) jBMap[mode][map] = new Set();
        
        jBMap[mode][map].add(row.id_partida);
        bAll[b] = (bAll[b] || 0) + 1; 
        jBT.add(row.id_partida);
    });
 
    const montarCardMapa = (modeKeyReal, mapaConfig) => {
        let mapaKeyReal = modeKeyReal && sMap[modeKeyReal] ? Object.keys(sMap[modeKeyReal]).find(m => m.toLowerCase() === mapaConfig.toLowerCase()) : null;
        let brawlers = mapaKeyReal ? sMap[modeKeyReal][mapaKeyReal] : null;
        let valid = brawlers ? Object.entries(brawlers).filter(x => x[1].picks >= samplePicks).sort((a,b) => b[1].picks - a[1].picks) : [];
        let bNMap = (modeKeyReal && mapaKeyReal && bMap[modeKeyReal] && bMap[modeKeyReal][mapaKeyReal]) ? bMap[modeKeyReal][mapaKeyReal] : {};
        let tJM = (modeKeyReal && mapaKeyReal && jBMap[modeKeyReal] && jBMap[modeKeyReal][mapaKeyReal]) ? jBMap[modeKeyReal][mapaKeyReal].size : 0, tBM = tJM > 0;
        let totalPicksTabela = brawlers ? Object.values(brawlers).reduce((acc, x) => acc + x.picks, 0) : 0;
 
        return `
            <div style="background:var(--bg-geral); border:1px solid var(--borda-destaque); border-radius:8px; padding:15px; min-width:0;">
                <div style="text-align:center; font-weight:bold; margin-bottom:10px; color:var(--texto-secundario);">${mapaConfig.toUpperCase()}</div>
                ${valid.length > 0 ? `
                <div style="overflow-x:auto;">
                <table class="excel-table" style="width:100%; table-layout:auto; border-collapse:collapse;">
                    <thead><tr>
                        <th style="text-align:left; white-space:nowrap; padding:5px 8px;">BRAWLER</th>
                        <th style="white-space:nowrap; padding:5px 8px;">P</th>
                        <th style="white-space:nowrap; padding:5px 8px;">PR%</th>
                        <th style="white-space:nowrap; padding:5px 8px;">W</th>
                        <th style="white-space:nowrap; padding:5px 8px;">WR%</th>
                        <th style="white-space:nowrap; padding:5px 8px; color:#b06aff;">B</th>
                        <th style="white-space:nowrap; padding:5px 8px; color:#b06aff;">BR%</th>
                    </tr></thead>
                    <tbody>
                        ${valid.map(([b, s]) => {
                            let bc = bNMap[b] || 0, brPct = tBM ? ((bc / tJM) * 100).toFixed(1) : '0.0';
                            return `<tr>
                                <td style="text-align:left; font-weight:bold; color:var(--accent-hover); white-space:nowrap; padding:5px 8px;"><img src="brawlers/${b.toLowerCase().replace(/ /g, '')}.png" style="width:24px; vertical-align:middle; margin-right:5px; border-radius:4px;" onerror="this.src='brawlers/default.png'">${b}</td>
                                <td style="padding:5px 8px;">${s.picks}</td><td style="color:var(--texto-secundario); padding:5px 8px;">${(totalPicksTabela > 0 ? ((s.picks/totalPicksTabela)*100) : 0).toFixed(1)}%</td><td style="padding:5px 8px;">${s.wins}</td><td class="winrate-cell" style="padding:5px 8px;">${((s.wins/s.picks)*100).toFixed(1)}%</td>
                                <td style="color:#b06aff; font-weight:bold; padding:5px 8px;">${bc}</td><td style="color:#b06aff; font-weight:bold; padding:5px 8px;">${brPct}%</td>
                            </tr>`;
                        }).join('')}
                    </tbody>
                </table>
                </div>` : `<p style="text-align:center; color:var(--texto-secundario); font-size:12px; font-weight:bold; padding:25px 0;">Sem dados suficientes no filtro atual.</p>`}
            </div>`;
    };
 
    let html = ``;
 
    if (rotacaoAtiva) {
        Object.entries(rotacaoAtiva).forEach(([modoConfig, mapasConfig]) => {
            let modeKeyReal = Object.keys(sMap).find(m => m.toLowerCase() === modoConfig.toLowerCase()) || null;
            let cleanMode = modoConfig.toLowerCase().replace(/ /g, '');
            let conteudoMapa = mapasConfig.map(mapaConfig => montarCardMapa(modeKeyReal, mapaConfig)).join('');
            html += `<div class="modo-card" onclick="toggleModoMeta('${cleanMode}')"><img src="element/modes/${cleanMode}.png" style="width:40px; margin-right:15px;" onerror="this.src='element/modes/default.png'">${modoConfig}</div><div id="modo-content-${cleanMode}" class="modo-section" style="display:none; padding:15px;"><div class="mapa-content" style="display:grid; grid-template-columns:repeat(3, minmax(300px, 1fr)); gap:15px; align-items:start;">${conteudoMapa}</div></div>`;
        });
    } else {
        Object.entries(sMap).forEach(([mode, mapasDict]) => {
            let cleanMode = mode.toLowerCase().replace(/ /g, '');
            let conteudoMapa = Object.keys(mapasDict).map(mapa => montarCardMapa(mode, mapa)).join('');
            if (conteudoMapa !== '') html += `<div class="modo-card" onclick="toggleModoMeta('${cleanMode}')"><img src="element/modes/${cleanMode}.png" style="width:40px; margin-right:15px;" onerror="this.src='element/modes/default.png'">${mode}</div><div id="modo-content-${cleanMode}" class="modo-section" style="display:none; padding:15px;"><div class="mapa-content" style="display:grid; grid-template-columns:repeat(3, minmax(300px, 1fr)); gap:15px; align-items:start;">${conteudoMapa}</div></div>`;
        });
    }
 
    let bAllVal = Object.entries(sAll).filter(x => x[1].picks >= samplePicks).sort((a,b) => b[1].picks - a[1].picks);
    let totalPicksAllMaps = Object.values(sAll).reduce((acc, x) => acc + x.picks, 0);
    
    if (bAllVal.length > 0) {
        html += `<div class="modo-card" style="margin-top:40px; border-color:var(--winrate-color); color:var(--winrate-color);" onclick="toggleModoMeta('allmaps')">ALL MAPS (GERAL)</div><div id="modo-content-allmaps" class="modo-section" style="display:none; padding:15px;"><div class="mapa-content" style="display:block;">
            <table class="excel-table">
                <thead><tr><th style="text-align:left;">BRAWLER</th><th>P</th><th>PR%</th><th>W</th><th>WR%</th><th style="color:#b06aff;">B</th><th style="color:#b06aff;">BR%</th></tr></thead>
                <tbody>
                    ${bAllVal.map(([b, s]) => {
                        let bc = bAll[b] || 0, brPct = jBT.size > 0 ? ((bc / jBT.size) * 100).toFixed(1) : '0.0';
                        let prPct = totalPicksAllMaps > 0 ? ((s.picks/totalPicksAllMaps)*100).toFixed(1) : '0.0';
                        return `<tr>
                            <td style="text-align:left; font-weight:bold; color:var(--winrate-color)"><img src="brawlers/${b.toLowerCase().replace(/ /g, '')}.png" style="width:28px; vertical-align:middle; margin-right:10px; border-radius:4px;" onerror="this.src='brawlers/default.png'">${b}</td>
                            <td>${s.picks}</td><td style="color:var(--texto-secundario);">${prPct}%</td><td>${s.wins}</td><td class="winrate-cell">${((s.wins/s.picks)*100).toFixed(1)}%</td><td style="color:#b06aff; font-weight:bold;">${bc}</td><td style="color:#b06aff; font-weight:bold;">${brPct}%</td>
                        </tr>`;
                    }).join('')}
                </tbody>
            </table></div></div>`;
    }
    
    if (container) container.innerHTML = html || `<p style="padding:20px; text-align:center;">Nenhum dado encontrado para os filtros atuais na ${_REGIAO}.</p>`;
    tornarTabelasOrdenaveis();
}
 
// ==========================================
// 6. TELA BRAWLERS
// ==========================================
function renderizarSidebarBrawlers() {
    let pickCounts = {};
    dadosFiltrados.forEach(r => { let b = (r.pick||'').toUpperCase(); if(b) pickCounts[b] = (pickCounts[b] || 0) + 1; });
    listaBrawlers = Object.keys(pickCounts).filter(b => pickCounts[b] >= 1).sort();
 
    const sidebar = document.getElementById('lista-brawlers-sidebar');
    if(sidebar) {
        sidebar.innerHTML = '';
        listaBrawlers.forEach(b => {
            let div = document.createElement('div'); div.className = 'sidebar-item';
            div.innerHTML = `<img src="brawlers/${b.toLowerCase().replace(/ /g, '')}.png" style="width:24px; border-radius:4px;" onerror="this.src='brawlers/default.png'"> <span>${b}</span>`;
            div.onclick = () => {
                document.querySelectorAll('#lista-brawlers-sidebar .sidebar-item').forEach(i => i.classList.remove('active'));
                div.classList.add('active'); brawlerSelecionado = b; renderizarDetalhesBrawler(b);
            };
            sidebar.appendChild(div);
        });
    }
}
 
function filtrarBrawlersSidebar() {
    const termo = document.getElementById('search-brawler-sidebar').value.toLowerCase();
    const items = document.getElementById('lista-brawlers-sidebar').children;
    Array.from(items).forEach(item => { item.style.display = item.querySelector('span').innerText.toLowerCase().includes(termo) ? 'flex' : 'none'; });
}
 
function renderizarDetalhesBrawler(brawler) {
    const painel = document.getElementById('painel-info-brawler');
    let partidasDeste = dadosFiltrados.filter(r => (r.pick||'').toUpperCase() === brawler);
    let totalPicks = partidasDeste.length;
    if(totalPicks === 0) return;
 
    let wins = partidasDeste.filter(r => parseInt(r.win) === 1).length;
    let wrGeral = ((wins/totalPicks)*100).toFixed(1) + '%';
    let totalBans = dadosBansFiltrados.filter(r => (r.brawler_banido||'').toUpperCase() === brawler).length;
    let totalJogosComBans = new Set(dadosBansFiltrados.map(r => r.id_partida)).size;
    let brPct = totalJogosComBans > 0 ? ((totalBans / totalJogosComBans) * 100).toFixed(1) : '0.0';
 
    let mapasStats = {};
    partidasDeste.forEach(r => {
        let m = r.mapa;
        if(!mapasStats[m]) mapasStats[m] = { picks: 0, wins: 0 };
        mapasStats[m].picks++; if(parseInt(r.win) === 1) mapasStats[m].wins++;
    });
    let topMapas = Object.entries(mapasStats).sort((a,b) => b[1].picks - a[1].picks).slice(0,3);
    let statsContra = {}, statsSinergia = {};
    let idsPartidas = [...new Set(partidasDeste.map(r => r.id_partida))];
 
    idsPartidas.forEach(id => {
        let todosNaPartida = dadosFiltrados.filter(r => r.id_partida === id);
        let brawlerRows = todosNaPartida.filter(r => (r.pick||'').toUpperCase() === brawler);
        brawlerRows.forEach(meRow => {
            let timeDoBrawler = meRow.id_time, ganhou = parseInt(meRow.win) === 1;
            todosNaPartida.forEach(p => {
                let pName = (p.pick||'').toUpperCase();
                if(!pName) return;
                if(p.id_time !== timeDoBrawler) {
                    if(!statsContra[pName]) statsContra[pName] = { matches: 0, bwWins: 0, bwLosses: 0 };
                    statsContra[pName].matches++;
                    if(ganhou) statsContra[pName].bwWins++; else statsContra[pName].bwLosses++;
                } else if(p.id_time === timeDoBrawler && pName !== brawler) {
                    if(!statsSinergia[pName]) statsSinergia[pName] = { matches: 0, bwWins: 0 };
                    statsSinergia[pName].matches++;
                    if(ganhou) statsSinergia[pName].bwWins++;
                }
            });
        });
    });
 
    let matchups = Object.entries(statsContra).map(([nome, s]) => ({ nome, matches: s.matches, wins: s.bwWins, losses: s.bwLosses, wr: (s.bwWins / s.matches) * 100, pr: (s.matches / totalPicks) * 100 })).filter(m => m.matches >= 1);
    let countersTop    = [...matchups].filter(m => m.wr >= 50).sort((a,b) => b.matches - a.matches).slice(0,5);
    let counteradosTop = [...matchups].filter(m => m.wr < 50).sort((a,b) => b.matches - a.matches).slice(0,5);
    let sinergiasTop   = Object.entries(statsSinergia).map(([nome, s]) => ({ nome, matches: s.matches, wins: s.bwWins, wr: (s.bwWins / s.matches) * 100, pr: (s.matches / totalPicks) * 100 })).filter(m => m.matches >= 1).sort((a,b) => b.matches - a.matches).slice(0,5);
 
    if(painel) painel.innerHTML = `
        <div class="brawler-profile-header"><img src="brawlers/${brawler.toLowerCase().replace(/ /g, '')}.png" class="brawler-large-avatar" onerror="this.src='brawlers/default.png'"><div><h2 style="font-size:28px;">${brawler}</h2><p style="color:var(--texto-secundario); font-size:14px; font-weight:bold; margin-top:5px;">PICKS: <span style="color:#fff">${totalPicks}</span> | W: <span style="color:#fff">${wins}</span> | WR%: <span class="winrate-cell">${wrGeral}</span> ${totalJogosComBans > 0 ? ` | B: <span style="color:#b06aff">${totalBans}</span> | BR%: <span style="color:#b06aff">${brPct}%</span>` : ''}</p></div></div>
        <h3 style="color:var(--accent-purple); font-size:16px; margin-bottom:15px;">TOP 3 MAPAS (DO BRAWLER)</h3>
        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap:15px; margin-bottom:30px;">
            ${topMapas.map(([m, s]) => `<div style="background:var(--bg-cards); padding:15px; border-radius:8px; border:1px solid var(--borda-destaque); text-align:center;"><img src="element/maps/${m.toLowerCase().replace(/ /g, '')}.png" style="width:100%; max-width:220px; height:100px; object-fit:cover; border-radius:6px; margin-bottom:10px; border:1px solid var(--borda-suave);" onerror="this.src='element/maps/default.png'"><div style="font-weight:900; font-size:14px; margin-bottom:8px;">${m}</div><div style="font-size:13px; color:var(--texto-secundario); display:flex; justify-content:center; gap:10px;"><span>P: <strong style="color:#fff">${s.picks}</strong></span><span>PR: <strong style="color:#fff">${((s.picks/totalPicks)*100).toFixed(1)}%</strong></span></div><div style="font-size:13px; color:var(--texto-secundario); display:flex; justify-content:center; gap:10px; margin-top:5px;"><span>W: <strong style="color:#fff">${s.wins}</strong></span><span>WR: <strong class="winrate-cell">${((s.wins/s.picks)*100).toFixed(1)}%</strong></span></div></div>`).join('')}
        </div>
        <div class="synergy-grid">
            <div class="synergy-box"><h3 style="color:var(--winrate-color); margin-bottom:15px; font-size:14px;">BOM CONTRA (Adversários)</h3>${countersTop.map(c => `<div class="synergy-item"><div style="display:flex; align-items:center;"><img src="brawlers/${c.nome.toLowerCase().replace(/ /g, '')}.png" onerror="this.src='brawlers/default.png'"><span style="font-weight:bold; font-size:13px;">${c.nome}</span></div><div style="text-align:right; font-size:12px; display:flex; gap:10px; font-weight:bold;"><div style="display:flex; flex-direction:column; color:var(--texto-secundario);"><span>P: ${c.matches}</span><span>PR%: ${c.pr.toFixed(1)}%</span></div><div style="display:flex; flex-direction:column;"><span>W: <span style="color:#fff">${c.wins}</span></span><span style="color:var(--winrate-color);">WR%: ${c.wr.toFixed(1)}%</span></div></div></div>`).join('') || '<p style="font-size:12px; color:var(--texto-secundario);">Sem dados</p>'}</div>
            <div class="synergy-box"><h3 style="color:var(--loss-color); margin-bottom:15px; font-size:14px;">RUIM CONTRA (Adversários)</h3>${counteradosTop.map(c => `<div class="synergy-item"><div style="display:flex; align-items:center;"><img src="brawlers/${c.nome.toLowerCase().replace(/ /g, '')}.png" onerror="this.src='brawlers/default.png'"><span style="font-weight:bold; font-size:13px;">${c.nome}</span></div><div style="text-align:right; font-size:12px; display:flex; gap:10px; font-weight:bold;"><div style="display:flex; flex-direction:column; color:var(--texto-secundario);"><span>P: ${c.matches}</span><span>PR%: ${c.pr.toFixed(1)}%</span></div><div style="display:flex; flex-direction:column;"><span>L: <span style="color:#fff">${c.losses}</span></span><span style="color:var(--loss-color);">WR%: ${c.wr.toFixed(1)}%</span></div></div></div>`).join('') || '<p style="font-size:12px; color:var(--texto-secundario);">Sem dados</p>'}</div>
            <div class="synergy-box" style="grid-column: 1 / -1;"><h3 style="color:var(--synergy-color); margin-bottom:15px; font-size:14px;">TOP 5 SINERGIAS (Brawlers Juntos)</h3><div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap:15px;">${sinergiasTop.map(c => `<div style="background:var(--bg-paineis); padding:15px; border-radius:8px; text-align:center; border:1px solid var(--borda-suave);"><img src="brawlers/${c.nome.toLowerCase().replace(/ /g, '')}.png" style="width:40px; height:40px; border-radius:6px; margin-bottom:8px; object-fit:cover;" onerror="this.src='brawlers/default.png'"><div style="font-weight:900; font-size:14px; margin-bottom:5px;">${c.nome}</div><div style="font-size:12px; color:var(--texto-secundario); font-weight:bold;">P: ${c.matches} | PR%: ${c.pr.toFixed(1)}%</div><div style="font-size:12px; color:var(--texto-secundario); font-weight:bold; margin-top:2px;">W: <span style="color:#fff">${c.wins}</span> | <span style="color:var(--winrate-color)">WR%: ${c.wr.toFixed(1)}%</span></div></div>`).join('') || '<p style="font-size:12px; color:var(--texto-secundario);">Sem dados</p>'}</div></div>
        </div>`;
}
 
function sugestaoQuartoJogador(time) {
    let tagsRoster = time.jogadores.map(j => j.tag);
    const mesChave = chaveMesAtiva();
    let mesData = ROSTERS_AUTO[mesChave] || {};
    for (let reg in mesData) {
        for (let entry of mesData[reg]) {
            if (tagsRoster.includes(entry.id_consultado)) {
                let cand = (entry.companheiros || []).find(c => !tagsRoster.includes(c.tag));
                if (cand) return { tag: cand.tag, nick: cand.nome };
            }
        }
    }
    
    let contagem = {};
    let porPartida = {};
    dadosBrutos.forEach(r => { if(!porPartida[r.id_partida]) porPartida[r.id_partida] = []; porPartida[r.id_partida].push(r); });
    Object.values(porPartida).forEach(linhas => {
        let timesAgrupados = {};
        linhas.forEach(l => {
            if (!timesAgrupados[l.id_time]) timesAgrupados[l.id_time] = [];
            timesAgrupados[l.id_time].push(l);
        });
        let lados = Object.values(timesAgrupados);
        if(lados.length === 2 && lados[0].length === 3 && lados[1].length === 3) {
            lados.forEach(lado => {
                let tagsLado = lado.map(p => p.player_tag);
                if (tagsRoster.filter(t => tagsLado.includes(t)).length >= 2) {
                    lado.forEach(p => {
                        if (!tagsRoster.includes(p.player_tag) && p.player_tag && p.player_tag !== 'None') {
                            if (!contagem[p.player_tag]) contagem[p.player_tag] = { n: 0, nick: p.player_name };
                            contagem[p.player_tag].n++;
                        }
                    });
                }
            });
        }
    });
    let melhor = Object.entries(contagem).sort((a,b) => b[1].n - a[1].n)[0];
    return melhor ? { tag: melhor[0], nick: melhor[1].nick } : { tag: '', nick: '' };
}
 
// ==========================================
// TELA MAPAS (entre BRAWLERS e TIMES)
// ==========================================
function renderizarSidebarMapas() {
    const sidebar = document.getElementById('lista-mapas-sidebar');
    if (!sidebar) return;
    sidebar.innerHTML = '';
 
    let modos = {};
    dadosFiltrados.forEach(r => {
        let modo = r.modo || 'Desconhecido', mapa = r.mapa || 'Desconhecido';
        if (!modos[modo]) modos[modo] = new Set();
        modos[modo].add(mapa);
    });
 
    Object.keys(modos).sort().forEach(modo => {
        let header = document.createElement('div');
        header.className = 'sidebar-header';
        header.style.cssText = 'display:flex; align-items:center; gap:8px;';
        header.innerHTML = `<img src="element/modes/${modo.toLowerCase().replace(/ /g, '')}.png" style="width:26px; height:26px; object-fit:contain;" onerror="this.src='element/modes/default.png'"> <span>${modo.toUpperCase()}</span>`;
        sidebar.appendChild(header);
        
        Array.from(modos[modo]).sort().forEach(mapa => {
            let div = document.createElement('div');
            div.className = 'sidebar-item';
            div.innerHTML = `<img src="element/maps/${mapa.toLowerCase().replace(/ /g, '')}.png" style="width:24px; height:24px; object-fit:cover; border-radius:4px;" onerror="this.src='element/maps/default.png'"> <span style="font-weight:bold;">${mapa}</span>`;
            div.onclick = () => {
                document.querySelectorAll('#lista-mapas-sidebar .sidebar-item').forEach(i => i.classList.remove('active'));
                div.classList.add('active');
                mapaSelecionado = { modo, mapa };
                renderizarDetalhesMapa(modo, mapa);
            };
            sidebar.appendChild(div);
        });
    });
 
    if (Object.keys(modos).length === 0) {
        sidebar.innerHTML = '<p style="padding:15px; color:var(--texto-secundario); font-size:12px; font-weight:bold;">Nenhum mapa com dados nos filtros atuais.</p>';
    }
}
 
function renderizarDetalhesMapa(modo, mapa) {
    const painel = document.getElementById('painel-info-mapa');
    if (!painel) return;
 
    let linhasMapa = dadosFiltrados.filter(r => (r.modo || 'Desconhecido') === modo && (r.mapa || 'Desconhecido') === mapa);
    if (linhasMapa.length === 0) {
        painel.innerHTML = '<p style="padding:20px; text-align:center; color:var(--texto-secundario); font-weight:bold;">Sem dados para este mapa nos filtros atuais.</p>';
        return;
    }
 
    let lados = {};
    linhasMapa.forEach(r => {
        let k = r.id_partida + '|' + r.id_time;
        if (!lados[k]) lados[k] = { picks: [], win: parseInt(r.win) === 1, id_time: r.id_time, nome_time: r.nome_time, timestamp: typeof parseDateBR === 'function' ? parseDateBR(r.data_adicao) : 0, data: r.data_adicao };
        let b = (r.pick || '').toUpperCase();
        if (b) lados[k].picks.push(b);
    });
    
    let listaLados = Object.values(lados).filter(l => l.picks.length === 3);
    let totalLados = listaLados.length;
 
    let comps = {};
    listaLados.forEach(l => {
        let key = l.picks.slice().sort().join(' + ');
        if (!comps[key]) comps[key] = { picks: 0, wins: 0, brawlers: l.picks.slice().sort() };
        comps[key].picks++; if (l.win) comps[key].wins++;
    });
    let topComps = Object.values(comps).sort((a,b) => b.picks - a.picks).slice(0, 10);
 
    let brawlerStats = {};
    linhasMapa.forEach(r => {
        let b = (r.pick || '').toUpperCase();
        if (!b) return;
        if (!brawlerStats[b]) brawlerStats[b] = { picks: 0, wins: 0 };
        brawlerStats[b].picks++; if (parseInt(r.win) === 1) brawlerStats[b].wins++;
    });
    
    let totalPicksMapa = Object.values(brawlerStats).reduce((a, s) => a + s.picks, 0);
    let brawlersOrdenados = Object.entries(brawlerStats).sort((a,b) => b[1].picks - a[1].picks);
 
    let sinergias = {};
    listaLados.forEach(l => {
        let ps = l.picks.slice().sort();
        for (let i = 0; i < ps.length; i++) for (let j = i+1; j < ps.length; j++) {
            let key = ps[i] + ' + ' + ps[j];
            if (!sinergias[key]) sinergias[key] = { picks: 0, wins: 0, brawlers: [ps[i], ps[j]] };
            sinergias[key].picks++; if (l.win) sinergias[key].wins++;
        }
    });
    let topSinergias = Object.values(sinergias).sort((a,b) => b.picks - a.picks).slice(0, 10);
 
    let timesStats = {};
    listaLados.forEach(l => {
        if (!l.id_time) return;
        if (!timesStats[l.id_time]) timesStats[l.id_time] = { partidas: 0, wins: 0, nome: l.nome_time, id: l.id_time };
        timesStats[l.id_time].partidas++; if (l.win) timesStats[l.id_time].wins++;
    });
    let timesOrdenados = Object.values(timesStats).sort((a,b) => b.partidas - a.partidas);
 
    window._mapaLadosAtuais = listaLados;
 
    const linhaComp = (c) => `<tr>
        <td style="text-align:left;">${c.brawlers.map(b => `<img src="brawlers/${b.toLowerCase().replace(/ /g, '')}.png" style="width:26px; border-radius:4px; margin-right:4px; vertical-align:middle;" onerror="this.src='brawlers/default.png'" title="${b}">`).join('')}<span style="font-size:11px; font-weight:bold; margin-left:6px;">${c.brawlers.join(' + ')}</span></td>
        <td>${c.picks}</td><td style="color:var(--texto-secundario);">${totalLados > 0 ? ((c.picks/totalLados)*100).toFixed(1) : '0.0'}%</td><td>${c.wins}</td><td class="winrate-cell">${((c.wins/c.picks)*100).toFixed(1)}%</td>
    </tr>`;
 
    painel.innerHTML = `
        <div style="text-align:center; margin-bottom:25px;">
            <h2 style="color:var(--accent-purple); font-size:26px; font-weight:900; margin-bottom:5px;"><img src="element/modes/${modo.toLowerCase().replace(/ /g, '')}.png" style="width:34px; vertical-align:middle; margin-right:8px;" onerror="this.src='element/modes/default.png'">${modo.toUpperCase()} — ${mapa.toUpperCase()}</h2>
            <img src="element/maps/${mapa.toLowerCase().replace(/ /g, '')}.png" style="width:100%; max-width:420px; border-radius:12px; border:2px solid var(--borda-destaque); margin-top:10px;" onerror="this.src='element/maps/default.png'">
        </div>
 
        <h3 style="color:var(--accent-purple); font-size:16px; margin:20px 0 10px;">PRINCIPAIS COMPS (3 BRAWLERS JUNTOS)</h3>
        <div style="overflow-x:auto;"><table class="excel-table" style="width:100%;">
            <thead><tr><th style="text-align:left;">COMP</th><th>P</th><th>PR%</th><th>W</th><th>WR%</th></tr></thead>
            <tbody>${topComps.map(linhaComp).join('') || '<tr><td colspan="5" style="color:var(--texto-secundario);">Sem dados</td></tr>'}</tbody>
        </table></div>
 
        <h3 style="color:var(--accent-purple); font-size:16px; margin:25px 0 10px;">MELHORES BRAWLERS NO MAPA</h3>
        <div style="overflow-x:auto;"><table class="excel-table" style="width:100%;">
            <thead><tr><th style="text-align:left;">BRAWLER</th><th>P</th><th>PR%</th><th>W</th><th>WR%</th></tr></thead>
            <tbody>${brawlersOrdenados.map(([b, s]) => `<tr>
                <td style="text-align:left; font-weight:bold; color:var(--accent-hover);"><img src="brawlers/${b.toLowerCase().replace(/ /g, '')}.png" style="width:26px; border-radius:4px; margin-right:6px; vertical-align:middle;" onerror="this.src='brawlers/default.png'">${b}</td>
                <td>${s.picks}</td><td style="color:var(--texto-secundario);">${totalPicksMapa > 0 ? ((s.picks/totalPicksMapa)*100).toFixed(1) : '0.0'}%</td><td>${s.wins}</td><td class="winrate-cell">${((s.wins/s.picks)*100).toFixed(1)}%</td>
            </tr>`).join('')}</tbody>
        </table></div>
 
        <h3 style="color:var(--synergy-color, var(--accent-purple)); font-size:16px; margin:25px 0 10px;">PRINCIPAIS SINERGIAS (2 BRAWLERS JUNTOS)</h3>
        <div style="overflow-x:auto;"><table class="excel-table" style="width:100%;">
            <thead><tr><th style="text-align:left;">SINERGIA</th><th>P</th><th>PR%</th><th>W</th><th>WR%</th></tr></thead>
            <tbody>${topSinergias.map(linhaComp).join('') || '<tr><td colspan="5" style="color:var(--texto-secundario);">Sem dados</td></tr>'}</tbody>
        </table></div>
 
        <h3 style="color:var(--winrate-color, #2ecc71); font-size:16px; margin:25px 0 10px;">MELHORES TIMES NO MAPA <span style="font-size:11px; color:var(--texto-secundario);">(clique no time para ver as últimas 3 comps)</span></h3>
        <div style="overflow-x:auto;"><table class="excel-table" style="width:100%;">
            <thead><tr><th style="text-align:left;">TIME</th><th>PARTIDAS</th><th>W</th><th>WR%</th></tr></thead>
            <tbody>${timesOrdenados.map(t => `<tr style="cursor:pointer;" onclick="mostrarComposTimeMapa('${t.id}')">
                <td style="text-align:left; font-weight:bold;"><img src="${teamLogoUrl ? teamLogoUrl(t.id) : ''}" style="width:26px; height:26px; object-fit:contain; border-radius:4px; margin-right:6px; vertical-align:middle;" onerror="${teamLogoOnError ? teamLogoOnError(t.id) : ''}">${t.nome} <span style="font-size:10px; color:var(--texto-secundario);">(${t.id})</span></td>
                <td>${t.partidas}</td><td>${t.wins}</td><td class="winrate-cell">${((t.wins/t.partidas)*100).toFixed(1)}%</td>
            </tr>`).join('') || '<tr><td colspan="4" style="color:var(--texto-secundario);">Sem dados</td></tr>'}</tbody>
        </table></div>
        <div id="mapa-time-comps" style="margin-top:20px;"></div>
    `;
    tornarTabelasOrdenaveis();
}
 
window.mostrarComposTimeMapa = function(idTime) {
    const box = document.getElementById('mapa-time-comps');
    if (!box || !window._mapaLadosAtuais) return;
    let doTime = window._mapaLadosAtuais.filter(l => l.id_time === idTime).sort((a,b) => b.timestamp - a.timestamp).slice(0, 3);
    if (doTime.length === 0) { box.innerHTML = ''; return; }
    let nome = doTime[0].nome_time || idTime;
    
    let logoUrl = typeof teamLogoUrl === 'function' ? teamLogoUrl(idTime) : '';
    let logoError = typeof teamLogoOnError === 'function' ? teamLogoOnError(idTime) : '';

    box.innerHTML = `
        <div style="background:var(--bg-cards); border:1px solid var(--accent-purple); border-radius:12px; padding:20px;">
            <h3 style="color:var(--accent-purple); font-size:15px; margin-bottom:15px;"><img src="${logoUrl}" style="width:26px; height:26px; object-fit:contain; border-radius:4px; margin-right:6px; vertical-align:middle;" onerror="${logoError}">ÚLTIMAS 3 COMPS DE ${nome.toUpperCase()} NESTE MAPA</h3>
            <div style="display:flex; flex-wrap:wrap; gap:15px;">
                ${doTime.map(l => `<div style="background:var(--bg-paineis); padding:15px; border-radius:8px; border:1px solid ${l.win ? 'var(--winrate-color, #2ecc71)' : 'var(--loss-color, #e74c3c)'};">
                    <div style="font-size:11px; color:var(--texto-secundario); font-weight:bold; margin-bottom:8px;">${(l.data || '').split(' ')[0]} — <span style="color:${l.win ? 'var(--winrate-color, #2ecc71)' : 'var(--loss-color, #e74c3c)'};">${l.win ? 'VITÓRIA' : 'DERROTA'}</span></div>
                    <div style="display:flex; gap:8px;">${l.picks.map(b => `<div style="text-align:center;"><img src="brawlers/${b.toLowerCase().replace(/ /g, '')}.png" style="width:44px; border-radius:6px;" onerror="this.src='brawlers/default.png'"><div style="font-size:10px; font-weight:bold; margin-top:3px;">${b}</div></div>`).join('')}</div>
                </div>`).join('')}
            </div>
        </div>`;
};
 
// ==========================================
// 7. TELA TIMES
// ==========================================
function renderizarSidebarTimes() {
    const sidebar = document.getElementById('lista-times-sidebar');
    if(!sidebar) return;
    sidebar.innerHTML = '';
    let timesRegiao = {};
 
    if (_REGIAO === "ALL") {
        for (let r in CONFIGURACAO_MANUAL_TIMES) {
            for (let tier in CONFIGURACAO_MANUAL_TIMES[r]) {
                if (!timesRegiao[tier]) timesRegiao[tier] = [];
                CONFIGURACAO_MANUAL_TIMES[r][tier].forEach(t => { if (!timesRegiao[tier].find(e => e.id_time === t.id_time)) timesRegiao[tier].push(t); });
            }
        }
    } else { timesRegiao = CONFIGURACAO_MANUAL_TIMES[_REGIAO]; }
 
    if(!timesRegiao) return;
    for(let tier in timesRegiao) {
        if(timesRegiao[tier].length === 0) continue;
        let tierHeader = document.createElement('div'); tierHeader.className = 'sidebar-header'; tierHeader.innerText = tier; sidebar.appendChild(tierHeader);
        timesRegiao[tier].forEach(t => {
            let logoUrl = typeof teamLogoUrl === 'function' ? teamLogoUrl(t.id_time) : '';
            let logoError = typeof teamLogoOnError === 'function' ? teamLogoOnError(t.id_time) : '';
            let div = document.createElement('div'); div.className = 'sidebar-item';
            div.innerHTML = `<img src="${logoUrl}" style="width:24px; height:24px; object-fit:contain; border-radius:4px;" onerror="${logoError}"> <span style="font-weight:bold;">${t.nome_time}</span>`;
            div.onclick = () => { document.querySelectorAll('#lista-times-sidebar .sidebar-item').forEach(i => i.classList.remove('active')); div.classList.add('active'); timeSelecionado = t; renderizarDetalhesTime(t); };
            sidebar.appendChild(div);
        });
    }
}
 
function renderizarDetalhesTime(time) {
    const painel = document.getElementById('painel-info-time');
    let partidasDoTime = dadosFiltrados.filter(r => r.id_time === time.id_time);
    let logoUrl = typeof teamLogoUrl === 'function' ? teamLogoUrl(time.id_time) : '';
    let logoError = typeof teamLogoOnError === 'function' ? teamLogoOnError(time.id_time) : '';
 
    if (time.id_time.startsWith("UNK")) {
        let tiersDisponiveis = typeof obterTiersDisponiveis === 'function' ? obterTiersDisponiveis() : ['TIER S', 'TIER A', 'TIER B', 'TIER C'];
        if(painel) painel.innerHTML = `<div style="background:var(--bg-cards); padding:30px; border-radius:12px; border:2px dashed var(--accent-purple);">
            <div style="display:flex; align-items:center; gap:15px; margin-bottom:20px;">
                <img src="element/teams/unknow.png" style="width:48px; height:48px; object-fit:contain; border-radius:8px; background:var(--bg-paineis); border:1px solid var(--borda-suave);" onerror="this.style.display='none'">
                <h2 style="color:var(--accent-hover); margin:0;">Registrar Equipe Desconhecida</h2>
            </div>
            <p style="font-size:12px; color:var(--texto-secundario); font-weight:bold; margin-bottom:15px;">Cadastro válido apenas para o mês ${chaveMesAtiva()} — a cada novo mês os times voltam a ser Unknow e precisam ser cadastrados novamente.</p>
            <div class="form-group"><label>SIGLA DO TIME (ID)</label><input type="text" id="custom-id" value="${time.id_time}"></div>
            <div class="form-group"><label>NOME COMPLETO</label><input type="text" id="custom-name" value="${time.nome_time}"></div>
            <div class="form-group">
                <label>QUANTIDADE DE JOGADORES DO ROSTER</label>
                <select id="custom-roster-size" style="width:100%; padding:8px; background:var(--bg-paineis); color:#fff; border:1px solid var(--borda-suave); border-radius:6px; font-weight:bold;" onchange="document.getElementById('quarto-jogador-wrap').style.display = this.value === '4' ? 'flex' : 'none';">
                    <option value="3" selected>3 jogadores (padrão)</option>
                    <option value="4">4 jogadores</option>
                </select>
            </div>
            <div class="form-group">
                <label>TIER</label>
                <select id="custom-tier" style="width:100%; padding:8px; background:var(--bg-paineis); color:#fff; border:1px solid var(--borda-suave); border-radius:6px; font-weight:bold;" onchange="document.getElementById('custom-tier-novo-wrap').style.display = this.value === '__NOVO__' ? 'block' : 'none';">
                    ${tiersDisponiveis.map(t => `<option value="${t}">${t}</option>`).join('')}
                    <option value="__NOVO__">+ Criar novo tier...</option>
                </select>
                <div id="custom-tier-novo-wrap" style="display:none; margin-top:8px;">
                    <input type="text" id="custom-tier-novo" placeholder="Nome do novo tier (ex: TIER C)" style="width:100%;">
                </div>
            </div>
            
            <h4 style="margin:20px 0 10px; color:#fff;">Roster Detectado (id + nick atualizado):</h4>
            <div style="display:flex; gap:10px; margin-bottom:15px;">${time.jogadores.map((j, idx) => `<div style="flex:1; background:var(--bg-paineis); padding:10px; border-radius:6px; border:1px solid var(--borda-suave);"><label style="font-size:11px; color:var(--texto-secundario); display:block; margin-bottom:5px;">${j.tag}</label><input type="text" id="nick-${idx}" value="${nickAtualizado(j.tag, j.nick)}" style="width:100%; background:transparent; border:none; border-bottom:1px solid var(--borda-destaque); color:#fff; font-weight:bold; outline:none;"></div>`).join('')}</div>
            <div id="quarto-jogador-wrap" style="display:none; gap:10px; margin-bottom:15px;">
                <div style="flex:1; background:var(--bg-paineis); padding:10px; border-radius:6px; border:1px solid var(--accent-purple);">
                    <label style="font-size:11px; color:var(--texto-secundario); display:block; margin-bottom:5px;">TAG DO 4º JOGADOR</label>
                    <input type="text" id="tag-3" value="${sugestaoQuartoJogador(time).tag}" placeholder="#TAG" style="width:100%; background:transparent; border:none; border-bottom:1px solid var(--borda-destaque); color:#fff; font-weight:bold; outline:none;">
                </div>
                <div style="flex:1; background:var(--bg-paineis); padding:10px; border-radius:6px; border:1px solid var(--accent-purple);">
                    <label style="font-size:11px; color:var(--texto-secundario); display:block; margin-bottom:5px;">NICK DO 4º JOGADOR</label>
                    <input type="text" id="nick-3" value="${sugestaoQuartoJogador(time).nick}" placeholder="Nick" style="width:100%; background:transparent; border:none; border-bottom:1px solid var(--borda-destaque); color:#fff; font-weight:bold; outline:none;">
                </div>
            </div>
            <button class="btn-register" onclick="registrarTimeCustom('${time.id_time}')">SALVAR E REGISTRAR TIME (MÊS ${chaveMesAtiva()})</button>
            <div id="custom-team-export-box" style="display:none; margin-top:20px;"></div>
        </div>`;
        return;
    }
 
    let timestamps = typeof parseDateBR === 'function' ? partidasDoTime.map(r => parseDateBR(r.data_adicao)) : [];
    let ultimoDadoTimestamp = timestamps.length > 0 ? Math.max(...timestamps) : 0;
    let dataFormatadaUltimo = ultimoDadoTimestamp > 0 ? new Date(ultimoDadoTimestamp).toLocaleDateString('pt-BR', {day: '2-digit', month: '2-digit', year: '2-digit'}) : 'N/A';
 
    let timeBrawlers = {};
    partidasDoTime.forEach(r => { let b = (r.pick||'').toUpperCase(); if(b) { timeBrawlers[b] = (timeBrawlers[b] || 0) + 1; } });
    let top10Time = Object.entries(timeBrawlers).sort((a,b) => b[1] - a[1]).slice(0,10);
 
    let html = `
        <div style="display:flex; align-items:center; gap:20px; margin-bottom:30px; border-bottom:1px solid var(--borda-destaque); padding-bottom:20px;">
            <img src="${logoUrl}" style="width:80px; height:80px; object-fit:contain; background:var(--bg-cards); border-radius:12px; border:2px solid var(--borda-destaque);" onerror="${logoError}">
            <div>
                <h2 style="color:var(--accent-purple); font-size:32px; font-weight:900;">${time.nome_time} <span style="font-size:14px; color:var(--texto-secundario)">(${time.id_time})</span></h2>
                <p style="font-size:11px; color:var(--texto-secundario); font-weight:bold; margin-top:5px;">PARTIDAS COLETADAS: <span style="color:#fff">${partidasDoTime.length}</span> | ÚLTIMA ATUALIZAÇÃO: <span style="color:#fff">${dataFormatadaUltimo}</span></p>
                <p style="font-size:12px; color:var(--accent-hover); font-weight:bold; margin-top:5px;">ROSTER: ${time.tamanho_roster || time.jogadores.length} jogadores</p>
            </div>
        </div>
        <div style="background:var(--bg-cards); padding:20px; border-radius:12px; border:1px solid var(--borda-destaque); margin-bottom:30px;"><h3 style="color:var(--texto); margin-bottom:15px; font-size:16px;">TOP 10 BRAWLERS DA EQUIPE</h3><div style="display:flex; flex-wrap:wrap; gap:10px;">${top10Time.length > 0 ? top10Time.map(([b, qtd]) => `<div style="background:var(--bg-paineis); padding:8px 12px; border-radius:6px; border:1px solid var(--borda-suave); display:flex; align-items:center; gap:10px;"><img src="brawlers/${b.toLowerCase().replace(/ /g, '')}.png" style="width:24px; border-radius:4px;" onerror="this.src='brawlers/default.png'"><span style="font-weight:bold; font-size:13px;">${b}</span><span style="color:var(--texto-secundario); font-size:12px; font-weight:bold;">(${qtd})</span></div>`).join('') : '<span style="color:var(--texto-secundario); font-size:13px;">Sem dados suficientes no filtro.</span>'}</div></div>
        <h3 style="color:var(--texto); margin-bottom:15px; font-size:16px;">JOGADORES (ROSTER OFICIAL)</h3><div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap:20px;">
    `;
 
    time.jogadores.forEach(jogadorOrig => {
        let jogador = { tag: jogadorOrig.tag, nick: nickAtualizado(jogadorOrig.tag, jogadorOrig.nick) };
        let pJ = partidasDoTime.filter(r => r.player_tag === jogador.tag), pT = pJ.length, bJ = {};
        pJ.forEach(r => { let b = (r.pick||'').toUpperCase(); if(b) bJ[b] = (bJ[b] || 0) + 1; });
        let top5 = Object.entries(bJ).sort((a,b) => b[1] - a[1]).slice(0,5);
        
        html += `<div style="background:var(--bg-cards); padding:20px; border-radius:12px; border:1px solid var(--borda-destaque);"><div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:5px;"><h4 style="color:var(--accent-purple); font-size:18px;">${jogador.nick}</h4><span style="font-size:10px; background:#000; padding:3px 6px; border-radius:4px; color:var(--texto-secundario);">${jogador.tag}</span></div><p style="color:var(--texto-secundario); font-size:12px; margin-bottom:20px; font-weight:bold;">Total de Picks: ${pT}</p><div style="display:flex; flex-direction:column; gap:8px;">${top5.length > 0 ? top5.map(([b, qtd], idx) => `<div style="display:flex; justify-content:space-between; align-items:center; background:var(--bg-paineis); padding:8px 12px; border-radius:6px; border:1px solid var(--borda-suave);"><div style="display:flex; align-items:center; gap:10px;"><span style="font-weight:900; color:var(--texto-secundario); font-size:11px;">#${idx+1}</span><img src="brawlers/${b.toLowerCase().replace(/ /g, '')}.png" style="width:24px; border-radius:4px;" onerror="this.src='brawlers/default.png'"><span style="font-size:13px; font-weight:bold;">${b}</span></div><span style="font-size:12px; color:var(--texto-secundario); font-weight:bold;">${qtd}</span></div>`).join('') : '<span style="color:var(--texto-secundario); font-size:12px;">Sem picks no filtro.</span>'}</div></div>`;
    });
    
    if(painel) painel.innerHTML = html + `</div>`;
}
 
window.registrarTimeCustom = function(idAntigo) {
    let inputId = document.getElementById('custom-id'), inputName = document.getElementById('custom-name'), selectTier = document.getElementById('custom-tier');
    if (!inputId || !inputName) return;
 
    let novoId = (inputId.value || idAntigo).trim().toUpperCase();
    let novoNome = (inputName.value || '').trim();
    if (!novoNome) { alert('Informe o nome completo do time.'); return; }
 
    let tierEscolhido = selectTier ? selectTier.value : 'TIMES REGISTRADOS';
    if (tierEscolhido === '__NOVO__') {
        let novoTierInput = document.getElementById('custom-tier-novo');
        tierEscolhido = novoTierInput && novoTierInput.value.trim() !== '' ? novoTierInput.value.trim() : 'TIMES REGISTRADOS';
    }
 
    let timeOriginal = timeSelecionado && timeSelecionado.id_time === idAntigo ? timeSelecionado : null;
    let jogadoresFinais = (timeOriginal ? timeOriginal.jogadores : []).map((j, idx) => {
        let inputNick = document.getElementById(`nick-${idx}`);
        return { nick: inputNick ? inputNick.value : j.nick, tag: j.tag };
    });
 
    let selectSize = document.getElementById('custom-roster-size');
    let tamanhoRoster = selectSize && selectSize.value === '4' ? 4 : 3;
    
    if (tamanhoRoster === 4) {
        let tagInput = document.getElementById('tag-3'), nickInput = document.getElementById('nick-3');
        let tag4 = tagInput ? tagInput.value.trim().toUpperCase() : '';
        if (!tag4 || tag4 === '#') { alert('Informe a tag do 4º jogador ou escolha roster de 3.'); return; }
        if (!tag4.startsWith('#')) tag4 = '#' + tag4;
        jogadoresFinais.push({ nick: nickInput && nickInput.value.trim() !== '' ? nickInput.value.trim() : nickAtualizado(tag4, tag4), tag: tag4 });
    }
 
    let novoTime = { id_time: novoId, nome_time: novoNome, jogadores: jogadoresFinais, tier: tierEscolhido, tamanho_roster: tamanhoRoster };
 
    const mesChave = chaveMesAtiva();
    let salvos = carregarTimesDoMes(_REGIAO, mesChave);
    salvos = salvos.filter(t => t.id_time !== novoId && t.id_time !== idAntigo);
    salvos.push(novoTime);
    salvarTimesDoMes(_REGIAO, mesChave, salvos);
 
    let regAlvo = _REGIAO === "ALL" ? "ALL" : _REGIAO;
    if (CONFIGURACAO_MANUAL_TIMES[regAlvo] && CONFIGURACAO_MANUAL_TIMES[regAlvo]["TIER ?"]) {
        CONFIGURACAO_MANUAL_TIMES[regAlvo]["TIER ?"] = CONFIGURACAO_MANUAL_TIMES[regAlvo]["TIER ?"].filter(t => t.id_time !== idAntigo);
    }
    
    if (!CONFIGURACAO_MANUAL_TIMES[regAlvo][tierEscolhido]) CONFIGURACAO_MANUAL_TIMES[regAlvo][tierEscolhido] = [];
    CONFIGURACAO_MANUAL_TIMES[regAlvo][tierEscolhido].push(novoTime);
 
    let exportBox = document.getElementById('custom-team-export-box');
    if (exportBox) {
        let regiaoPy = _REGIAO === "ALL" ? "SA" : _REGIAO;
        let linhasPy = jogadoresFinais.filter(j => j.tag && j.tag !== '#').map(j =>
            `        "${j.tag}": {"nome": "${j.nick}", "id_time": "${novoId}", "nome_time": "${novoNome.toUpperCase()}", "regiao": "${regiaoPy}"},`
        ).join('\n');
        exportBox.style.display = 'block';
        exportBox.innerHTML = `
            <div style="background:rgba(176,0,255,0.07); border:1px dashed var(--accent-purple); border-radius:8px; padding:15px;">
                <p style="font-size:12px; color:var(--texto-secundario); font-weight:bold; margin-bottom:10px;">
                    Time registrado! Para que o GERADOR.PY também reconheça este time nas próximas mineradas,
                    copie as linhas abaixo e cole dentro de <strong>MAPEAMENTO_PLAYERS</strong> em gerador.py:
                </p>
                <textarea readonly style="width:100%; min-height:90px; background:#000; color:#0f0; font-family:monospace; font-size:11px; padding:10px; border-radius:6px; border:1px solid var(--borda-suave);">${linhasPy}</textarea>
                <button type="button" style="margin-top:8px; background:transparent; border:1px solid var(--accent-purple); color:var(--accent-purple); padding:6px 14px; border-radius:6px; cursor:pointer; font-weight:bold;" onclick="this.previousElementSibling.select(); document.execCommand('copy');">COPIAR</button>
            </div>`;
    }
 
    processarDadosGlobais();
    renderizarSidebarTimes();
    let novoSelecionado = (CONFIGURACAO_MANUAL_TIMES[regAlvo][tierEscolhido] || []).find(t => t.id_time === novoId);
    if (novoSelecionado) { timeSelecionado = novoSelecionado; renderizarDetalhesTime(novoSelecionado); }
};
 
// ==========================================
// 8. TELA SCRIMS (MD3)
// ==========================================
 
function processarScrimesMD3(scrims) {
    window.currentScrims = scrims;
    
    let selectFiltro = document.getElementById('scrims-team-filter');
    if (selectFiltro) {
        let timesNaScrim = new Map();
        scrims.forEach(s => { timesNaScrim.set(s.tANome, s.tAId); timesNaScrim.set(s.tBNome, s.tBId); });
        let valorAtual = selectFiltro.value || 'todos';
        selectFiltro.innerHTML = '<option value="todos">Todos os Times (Scrims)</option>';
        Array.from(timesNaScrim.keys()).sort().forEach(t => { selectFiltro.innerHTML += `<option value="${t}" ${t === valorAtual ? 'selected' : ''}>${t}</option>`; });
        atualizarDropdownTimesScrims(timesNaScrim, valorAtual);
    }
    renderizarListaScrims(scrims);
}
 
function renderizarListaScrims(scrimsOriginais) {
    const lista = document.getElementById('scrims-lista'), detalhe = document.getElementById('scrims-detalhe');
    if(!lista || !detalhe) return;
    lista.style.display  = 'grid'; lista.style.gridTemplateColumns = 'repeat(auto-fill, minmax(420px, 1fr))'; lista.style.gap = '18px'; detalhe.style.display = 'none'; lista.innerHTML = '';
 
    let filtroValor = document.getElementById('scrims-team-filter') ? document.getElementById('scrims-team-filter').value : 'todos';
    let scrims = filtroValor !== 'todos' ? scrimsOriginais.filter(s => s.tANome === filtroValor || s.tBNome === filtroValor) : scrimsOriginais;
 
    if(scrims.length === 0) {
        lista.innerHTML = `<p style="padding:20px; color:var(--texto-secundario); font-weight:bold; grid-column:1/-1; text-align:center;">Nenhuma scrim encontrada no filtro atual.</p>`; return;
    }
 
    scrims.forEach((scrim) => {
        let div = document.createElement('div'); div.className = 'scrim-card';
        let isTournament = (scrim.sets || []).some(r => r.tipo === 'tournament') || scrim.temMatcherino;
        let icon = isTournament ? `<img src="element/play/matcherino.png" style="position:absolute; top:10px; right:12px; width:22px; height:22px; object-fit:contain;" onerror="this.style.display='none'" title="Torneio">` : '';
 
        let aGanhou = scrim.scoreA > scrim.scoreB, bGanhou = scrim.scoreB > scrim.scoreA;
        let corA = aGanhou ? 'var(--winrate-color, #2ecc71)' : '#fff';
        let corB = bGanhou ? 'var(--winrate-color, #2ecc71)' : '#fff';
        
        let logoUrlA = typeof teamLogoUrl === 'function' ? teamLogoUrl(scrim.tAId) : '';
        let logoUrlB = typeof teamLogoUrl === 'function' ? teamLogoUrl(scrim.tBId) : '';
        let logoErrorA = typeof teamLogoOnError === 'function' ? teamLogoOnError(scrim.tAId) : '';
        let logoErrorB = typeof teamLogoOnError === 'function' ? teamLogoOnError(scrim.tBId) : '';
 
        div.style.cssText = 'position:relative; display:grid; grid-template-columns:1fr auto 1fr; align-items:center; gap:14px; min-height:120px; padding:22px 20px 34px; cursor:pointer;';
 
        div.innerHTML = `
            ${icon}
            <div class="scrim-team-info" style="display:flex; align-items:center; gap:10px; min-width:0;">
                <img src="${logoUrlA}" class="scrim-team-logo" style="width:42px; height:42px; object-fit:contain; border-radius:6px; flex-shrink:0;" onerror="${logoErrorA}">
                <span style="font-weight:900; font-size:15px; color:${corA}; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;" title="${scrim.tANome}">${scrim.tANome}</span>
            </div>
            <div class="scrim-score" style="font-size:26px; font-weight:900; white-space:nowrap; text-align:center;"><span style="color:${corA};">${scrim.scoreA}</span> <span style="color:var(--texto-secundario);">-</span> <span style="color:${corB};">${scrim.scoreB}</span></div>
            <div class="scrim-team-info" style="display:flex; flex-direction:row-reverse; align-items:center; gap:10px; min-width:0;">
                <img src="${logoUrlB}" class="scrim-team-logo" style="width:42px; height:42px; object-fit:contain; border-radius:6px; flex-shrink:0;" onerror="${logoErrorB}">
                <span style="font-weight:900; font-size:15px; color:${corB}; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;" title="${scrim.tBNome}">${scrim.tBNome}</span>
            </div>
            <div style="position:absolute; bottom:10px; left:18px; font-size:11px; color:var(--texto-secundario); font-weight:bold;">${scrim.dataFormatada}</div><div style="position:absolute; bottom:10px; right:18px; font-size:11px; color:var(--texto-secundario); font-weight:bold;">Rounds: ${(scrim.roundsMD3 || []).length}</div>
        `;
        div.onclick = () => renderizarDetalheScrim(scrim);
        lista.appendChild(div);
    });
}
 
function renderizarDetalheScrim(scrim) {
    const lista = document.getElementById('scrims-lista'), detalhe = document.getElementById('scrims-detalhe');
    lista.style.display = 'none'; detalhe.style.display = 'block';
 
    let playersA = [...new Set((scrim.sets || []).flatMap(r => r.t0Full.map(p => p.player_name)))].slice(0,3);
    let playersB = [...new Set((scrim.sets || []).flatMap(r => r.t1Full.map(p => p.player_name)))].slice(0,3);
 
    let aGanhou = scrim.scoreA > scrim.scoreB, bGanhou = scrim.scoreB > scrim.scoreA;
    let corA = aGanhou ? 'var(--winrate-color, #2ecc71)' : '#fff';
    let corB = bGanhou ? 'var(--winrate-color, #2ecc71)' : '#fff';
    
    let logoUrlA = typeof teamLogoUrl === 'function' ? teamLogoUrl(scrim.tAId) : '';
    let logoUrlB = typeof teamLogoUrl === 'function' ? teamLogoUrl(scrim.tBId) : '';
    let logoErrorA = typeof teamLogoOnError === 'function' ? teamLogoOnError(scrim.tAId) : '';
    let logoErrorB = typeof teamLogoOnError === 'function' ? teamLogoOnError(scrim.tBId) : '';
 
    detalhe.innerHTML = `
        <button onclick="document.getElementById('scrims-lista').style.display='grid'; document.getElementById('scrims-detalhe').style.display='none';" style="background:transparent; border:2px solid var(--accent-purple); color:var(--accent-purple); padding:8px 20px; font-weight:bold; border-radius:6px; cursor:pointer; margin-bottom:30px;">← VOLTAR</button>
        <div class="scrim-detail-header">
            <div style="display:flex; justify-content:center; align-items:flex-start; gap:40px;">
                <div style="text-align:center;">
                    <img src="${logoUrlA}" style="height:120px; object-fit:contain; background:transparent; border:none;" onerror="${logoErrorA}">
                    <div style="font-size:11px; color:var(--texto-secundario); display:flex; gap:8px; justify-content:center; margin-top:8px; font-weight:bold;">${playersA.map(p => `<span>${p}</span>`).join('')}</div>
                </div>
                <div style="font-size:42px; font-weight:900; line-height:120px;">
                    <span style="color:${corA};">${scrim.scoreA}</span> <span style="color:var(--accent-purple)">-</span> <span style="color:${corB};">${scrim.scoreB}</span>
                </div>
                <div style="text-align:center;">
                    <img src="${logoUrlB}" style="height:120px; object-fit:contain; background:transparent; border:none;" onerror="${logoErrorB}">
                    <div style="font-size:11px; color:var(--texto-secundario); display:flex; gap:8px; justify-content:center; margin-top:8px; font-weight:bold;">${playersB.map(p => `<span>${p}</span>`).join('')}</div>
                </div>
            </div>
        </div>
        
        <div class="scrim-rounds-container" id="rounds-scroll" style="display:flex; flex-wrap:wrap; gap:10px; overflow:visible; max-height:none; width:100%; margin-top: 20px;">
        ${(scrim.roundsMD3 || []).map((r, i) => {
            let venceuA = r.vencedor !== null && r.vencedor === r.tAId;
            let venceuB = r.vencedor !== null && r.vencedor === r.tBId;
            let corRound = venceuA || venceuB ? 'var(--winrate-color, #2ecc71)' : 'var(--texto-secundario, #999)';
            let nomeVencedorRound = venceuA ? r.tANome : (venceuB ? r.tBNome : 'Indefinido');
            return `<div class="scrim-round-btn ${i === 0 ? 'active' : ''}" onclick="window.selecionarRoundMD3(${i}, this)" style="flex:0 0 auto; padding: 10px;">
                <div style="display: flex; align-items: baseline; gap: 6px; margin-bottom: 5px;">
                    <span style="font-size:15px; font-weight:900; color:var(--accent-purple);">ROUND ${i+1}</span>
                    <span style="font-size:11px; font-weight:bold; color:var(--texto-secundario);">(Sets: ${r.scoreA}-${r.scoreB})</span>
                </div>
                <img src="element/modes/${r.modo.toLowerCase().replace(/ /g, '')}.png" onerror="this.src='element/modes/default.png'">
                <span style="display:block; margin-top:4px; font-size:11px; font-weight:900; color:${corRound}; max-width:120px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;" title="${nomeVencedorRound}">${nomeVencedorRound}</span>
            </div>`;
        }).join('')}
        </div>
        <div id="round-view-container" style="margin-top: 25px;"></div>
    `;
    window.scrimAtual = scrim; 
    
    if(scrim.roundsMD3 && scrim.roundsMD3.length > 0) {
        window.selecionarRoundMD3(0, detalhe.querySelector('.scrim-round-btn'));
    }
}
 
window.selecionarRoundMD3 = function(index, btnElement) {
    document.querySelectorAll('.scrim-round-btn').forEach(b => b.classList.remove('active'));
    if(btnElement) btnElement.classList.add('active');
 
    let roundMD3 = window.scrimAtual.roundsMD3[index];
    let firstSet = roundMD3.firstSet; 
    const container = document.getElementById('round-view-container');
 
    let venceuA = roundMD3.vencedor !== null && roundMD3.vencedor === window.scrimAtual.tAId;
    let venceuB = roundMD3.vencedor !== null && roundMD3.vencedor === window.scrimAtual.tBId;
    let corSetA = venceuA ? 'var(--winrate-color, #2ecc71)' : '#fff';
    let corSetB = venceuB ? 'var(--winrate-color, #2ecc71)' : '#fff';
 
    let playersA = firstSet.t0Full.map(p => p.player_name), playersB = firstSet.t1Full.map(p => p.player_name);
 
    container.innerHTML = `
        <div class="round-details-view" style="background: var(--bg-cards); padding: 25px; border-radius: 12px; border: 1px solid var(--borda-destaque);">
            <div class="picks-container" style="display:flex; justify-content:center; align-items:center; gap: 40px; margin-top: 15px;">
                <div style="display:flex; flex-direction:column; gap:15px; color:${corSetA};">
                    ${playersA.map((p, index) => {
                        let pickBrawler = firstSet.picksA ? firstSet.picksA[index] : '';
                        return `<div style="display:flex; flex-direction:column; align-items:center; gap:5px; position:relative;">
                            <span style="position:absolute; top:-8px; left:-8px; background:var(--accent-purple); color:#fff; font-size:10px; font-weight:900; padding:2px 6px; border-radius:10px; z-index:1;">PICK ${index+1}</span>
                            <img src="brawlers/${pickBrawler.toLowerCase().replace(/ /g, '')}.png" style="width: 75px; height: 75px; border-radius: 8px; object-fit: cover; border: 2px solid ${venceuA ? 'var(--winrate-color, #2ecc71)' : 'var(--borda-suave, #555)'};" onerror="this.src='brawlers/default.png'">
                            <span style="font-size:12px; font-weight:900;">${p}</span>
                        </div>`;
                    }).join('')}
                </div>
                
                <div style="text-align:center;">
                    <img src="element/maps/${roundMD3.mapa.toLowerCase().replace(/ /g, '')}.png" style="width: 250px; border-radius: 10px; object-fit: cover; border: 2px solid var(--borda-destaque);" onerror="this.src='element/maps/default.png'">
                    <p style="margin-top:10px; font-size:14px; color:var(--texto-secundario); font-weight:bold;">
                        ${roundMD3.mapa.toUpperCase()}
                    </p>
                </div>
    
                <div style="display:flex; flex-direction:column; gap:15px; color:${corSetB};">
                    ${playersB.map((p, index) => {
                        let pickBrawler = firstSet.picksB ? firstSet.picksB[index] : '';
                        return `<div style="display:flex; flex-direction:column; align-items:center; gap:5px; position:relative;">
                            <span style="position:absolute; top:-8px; left:-8px; background:var(--accent-purple); color:#fff; font-size:10px; font-weight:900; padding:2px 6px; border-radius:10px; z-index:1;">PICK ${index+1}</span>
                            <img src="brawlers/${pickBrawler.toLowerCase().replace(/ /g, '')}.png" style="width: 75px; height: 75px; border-radius: 8px; object-fit: cover; border: 2px solid ${venceuB ? 'var(--winrate-color, #2ecc71)' : 'var(--borda-suave, #555)'};" onerror="this.src='brawlers/default.png'">
                            <span style="font-size:12px; font-weight:900;">${p}</span>
                        </div>`;
                    }).join('')}
                </div>
            </div>
        </div>
    `;
};
 
// ==========================================
// 9. FUNÇÃO PARA ORDENAR TABELAS (META)
// ==========================================
function tornarTabelasOrdenaveis() {
    document.querySelectorAll('table.excel-table').forEach(table => {
        const headers = table.querySelectorAll('th');
        headers.forEach((th, index) => {
            th.style.cursor = 'pointer';
            th.title = "Clique para ordenar";
            th.addEventListener('click', () => {
                const tbody = table.querySelector('tbody');
                if (!tbody) return;
                const rows = Array.from(tbody.querySelectorAll('tr'));
                const isAscending = th.classList.contains('asc');
                headers.forEach(h => h.classList.remove('asc', 'desc'));
                th.classList.add(isAscending ? 'desc' : 'asc');
                
                rows.sort((rowA, rowB) => {
                    let cellA = rowA.children[index].innerText.trim();
                    let cellB = rowB.children[index].innerText.trim();
                    const parseCell = (val) => {
                        let num = parseFloat(val.replace('%', '').replace(',', '.'));
                        return isNaN(num) ? val : num;
                    };
                    let valA = parseCell(cellA);
                    let valB = parseCell(cellB);
                    if (typeof valA === 'string' && typeof valB === 'string') {
                        return isAscending ? valB.localeCompare(valA) : valA.localeCompare(valB);
                    } else {
                        return isAscending ? valA - valB : valB - valA;
                    }
                });
                tbody.append(...rows);
            });
        });
    });
}
