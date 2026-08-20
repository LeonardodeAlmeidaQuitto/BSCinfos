// ════════════════════════════════════════════════════════════════
//  DADOS
// ════════════════════════════════════════════════════════════════
var BRAWLERS = ["8bit","alli","amber","angelo","ash","barley","bea","belle","berry","bibi","bo","bolt","bonnie","brock","bull","buster","buzz","byron","carl","charlie","chester","chuck","clancy","colette","colt","cordelius","crow","damian","darryl","doug","draco","dynamike","edgar","elprimo","emz","eve","fang","finx","frank","gale","gene","gigi","glowy","gray","griff","grom","gus","hank","jacky","jaeyong","janet","jessie","juju","kaze","kenji","kit","larrylawrie","leon","lily","lola","lou","lumi","maisie","mandy","max","meeple","meg","melodie","mico","mina","moe","mortis","mrp","najia","nani","nita","nori","ollie","otis","pam","pearl","penny","pierce","piper","poco","rico","rosa","rt","ruffs","sam","sandy","shade","shelly","sirius","spike","sprout","squeak","starrnova","stu","surge","tara","tick","trunk","wendy","willow","ziggy"];

function nomeBonito(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
function limparId(id) { return id.replace(/[^0-9a-zA-Z#]/g, '').toUpperCase(); }

// ────────────────────────────────────────────────────────────────
//  API DO BRAWL STARS (via proxy do servidor)
//  A key NÃO pode chamar a API direto do navegador (CORS). Ela vai
//  para o proxy /api/brawl que roda no backend (Cloudflare Workers).
//  Aqui guardamos a key no navegador e consultamos perfil/battlelog.
// ────────────────────────────────────────────────────────────────
var CHAVE_KEY = 'bsc_vivo_key';

function keySalva() { try { return localStorage.getItem(CHAVE_KEY) || ''; } catch (e) { return ''; } }
function keyAtual() {
    var el = document.getElementById('brawl-api-key');
    var v = el ? el.value.trim() : '';
    if (v) { try { localStorage.setItem(CHAVE_KEY, v); } catch (e) {} }
    return v || keySalva();
}
// Endereço do backend que hospeda o proxy. Troque para o seu domínio
// quando fizer deploy (ex: "https://seusite.workers.dev"). Em site
// estático (GitHub Pages) sem backend, deixe como está: o teste retornará erro.
var BASE_PROXY = '';

function testeUnicoId(id, key) {
    return fetch(BASE_PROXY + '/api/brawl?type=profile&id=' + encodeURIComponent(id), {
        headers: { 'Authorization': 'Bearer ' + key }
    }).then(function (r) { return r.json(); }).then(function (j) {
        if (j.success && j.data && j.data.name) {
            return { ok: true, id: id, nome: j.data.name, tropa: (j.data.club && j.data.club.name) || '—', nivel: j.data.trophies };
        }
        return { ok: false, id: id, erro: (j.error || 'sem perfil (ID inexistente?)') };
    }).catch(function () {
        return { ok: false, id: id, erro: 'proxy offline (backend não está no ar)' };
    });
}

function testarAPI() {
    var status = document.getElementById('api-status');
    var key = keyAtual();
    if (!status) return;
    if (!key) {
        status.innerHTML = '<span style="color:#fbbf24">⚠️ Cole sua API key acima primeiro.</span>';
        return;
    }
    var ids = [];
    ['azul-1', 'azul-2', 'azul-3', 'vermelho-1', 'vermelho-2', 'vermelho-3'].forEach(function (idCampo) {
        var v = document.getElementById(idCampo);
        if (v && v.value.trim()) ids.push(v.value.trim());
    });
    if (!ids.length) {
        status.innerHTML = '<span style="color:#fbbf24">⚠️ Preencha ao menos 1 ID de jogador (coluna azul/vermelha).</span>';
        return;
    }
    status.innerHTML = '<span style="color:#94a3b8">Consultando API oficial via proxy...</span>';
    Promise.all(ids.map(function (id) { return testeUnicoId(id, key); })).then(function (res) {
        var linhas = res.map(function (r) {
            if (r.ok) return '<span style="color:#4ade80">✅ ' + r.id + ' — ' + r.nome + ' · ' + r.nivel + ' troféus · ' + r.tropa + '</span>';
            return '<span style="color:#f87171">❌ ' + r.id + ' — ' + r.erro + '</span>';
        });
        status.innerHTML = linhas.join('<br>');
    });
}

// Carrega a key já salva ao abrir a página
document.addEventListener('DOMContentLoaded', function () {
    var el = document.getElementById('brawl-api-key');
    var k = keySalva();
    if (el && k) el.value = k;
});


var MAPAS = {
    "GEM GRAB": ["Crystal Arcade", "Double Swoosh", "Hard Rock Mine", "Undermine"],
    "BOUNTY": ["Canal Grande", "Goldarm Gulch", "Out in the Open", "Shooting Star"],
    "BRAWL BALL": ["Backyard Bowl", "Beach Ball", "Field Goal", "Pinhole Punt"],
    "HEIST": ["Belles Rock", "Kaboom Canyon", "Safe Zone", "Snake Prairie"],
    "KNOCKOUT": ["Belle's Rock", "Flaring Phoenix", "Goldarm Gulch", "New Horizon"],
    "HOT ZONE": ["Dueling Beetles", "Open Zone", "Parallel Plays", "Ring of Fire"]
};

// ════════════════════════════════════════════════════════════════
//  ESTADO
// ════════════════════════════════════════════════════════════════
var sessao = null;
var estadoDraft = null;
var slotAtivo = null; // {tipo, time, idx}
var slotStart = 0;    // timestamp do início do pick atual (cronômetro 35s)
var modoSel = '', mapaSel = '';
var TEMPO_PICK = 35;  // segundos

// ════════════════════════════════════════════════════════════════
//  TRANSMISSÃO (janela separada / OBS)
//  Usa localStorage + BroadcastChannel p/ sincronizar abas do mesmo navegador
// ════════════════════════════════════════════════════════════════
var CHAVE_TX = 'bsc_vivo_tx';
var canal = ('BroadcastChannel' in window) ? new BroadcastChannel('bsc_vivo') : null;
var isTx = new URLSearchParams(location.search).get('tx') === '1';

function estadoTx() {
    return {
        sessao: sessao,
        estadoDraft: estadoDraft,
        slotAtivo: slotAtivo,
        slotStart: slotStart,
        modo: modoSel,
        mapa: mapaSel,
        tipoTransmissao: sessao ? sessao.tipoTransmissao : null
    };
}
function publicarTx() {
    if (!sessao) return;
    var data = estadoTx();
    try { localStorage.setItem(CHAVE_TX, JSON.stringify(data)); } catch (e) {}
    if (canal) { try { canal.postMessage(data); } catch (e) {} }
}
function iniciarModoTransmissao() {
    document.querySelector('.navbar').style.display = 'none';
    document.querySelector('.wrapper').style.display = 'none';
    document.body.classList.add('tx-body');
    var root = document.getElementById('tx-root');
    root.style.display = 'flex';
    carregarTx();
    if (canal) canal.addEventListener('message', function(e) { aplicarTx(e.data); });
    window.addEventListener('storage', function(e) { if (e.key === CHAVE_TX) carregarTx(); });
    setInterval(renderCronometroObs, 200);
}
function carregarTx() {
    try { aplicarTx(JSON.parse(localStorage.getItem(CHAVE_TX))); } catch (e) {}
}
function aplicarTx(d) {
    if (!d || !d.sessao) {
        document.getElementById('tx-frame').innerHTML = '<div style="margin:auto;color:var(--mut);font-size:18px;">Aguardando partida...<br><span style="font-size:13px;">Inicie a partida na página AO VIVO principal.</span></div>';
        return;
    }
    sessao = d.sessao;
    estadoDraft = d.estadoDraft;
    slotAtivo = d.slotAtivo;
    slotStart = d.slotStart;
    modoSel = d.modo || '';
    mapaSel = d.mapa || '';
    renderTxFrame();
}
function abrirTransmissao() {
    window.open('vivo.html?tx=1', '_blank', 'width=1280,height=720');
    publicarTx();
}

// ════════════════════════════════════════════════════════════════
//  RENDERIZAÇÃO DA JANELA DE TRANSMISSÃO
// ════════════════════════════════════════════════════════════════
function renderTxFrame() {
    var frame = document.getElementById('tx-frame');
    frame.innerHTML = (sessao && sessao.tipoTransmissao === 'obs') ? overlayObs() : overlayDraft();
}

// Slug para gerar o nome do arquivo da imagem do mapa em element/maps/
function slugMapa(nome) {
    if (!nome) return '';
    return String(nome).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/'/g, '').replace(/[^a-z0-9]+/g, '');
}
// Imagem do mapa: element/maps/nomedomapa.png (com fallback se a imagem não existir)
function imgMapa() {
    var nome = mapaSel || '';
    var slug = slugMapa(nome);
    if (!slug) return '';
    return '<img loading="lazy" decoding="async" class="tx-map-img" src="element/maps/' + slug + '.png" alt="" onerror="this.style.display=\'none\'">';
}

function overlayDraft() {
    var a = sessao.azul, r = sessao.vermelho;
    var mapaDisplay = mapaSel ? (modoSel ? modoSel + ' · ' : '') + mapaSel : (modoSel || '—');
    return `
        <div class="tx-draft">
            <div class="tx-map-banner"><span class="gem">💎</span><span>${esc(mapaDisplay)}</span></div>
            <div class="tx-draft-mid">
                <div class="tx-team-col">
                    <div class="tx-team-head"><img src="${esc(a.logo)}" alt=""><span class="tx-name">${esc(a.nome)}</span></div>
                    <div class="tx-picks">${a.ids.map((id,i) => `
                        <div class="tx-pick">
                            <img src="brawlers/${estadoDraft.picks.azul[i]||'unknow'}.png" onerror="this.style.visibility='hidden'">
                            <div><div class="tx-pick-name">${id?'Jogador '+(i+1):'Jogador '+(i+1)}</div><div class="tx-pick-id">${esc(id||'ID não informado')}</div></div>
                        </div>`).join('')}</div>
                </div>
                <div class="tx-map-center">
                    <div>${imgMapa()}<div class="map-name">${esc(mapaSel||modoSel||'AGUARDANDO')}</div><div class="map-mode">${esc(modoSel||'')}</div></div>
                </div>
                <div class="tx-team-col">
                    <div class="tx-team-head"><img src="${esc(r.logo)}" alt=""><span class="tx-name">${esc(r.nome)}</span></div>
                    <div class="tx-picks">${r.ids.map((id,i) => `
                        <div class="tx-pick">
                            <img src="brawlers/${estadoDraft.picks.vermelho[i]||'unknow'}.png" onerror="this.style.visibility='hidden'">
                            <div><div class="tx-pick-name">${'Jogador '+(i+1)}</div><div class="tx-pick-id">${esc(id||'ID não informado')}</div></div>
                        </div>`).join('')}</div>
                </div>
            </div>
            <div class="tx-scorebar">
                <div class="sb-team"><img src="${esc(a.logo)}" alt=""><div><div class="sb-name">${esc(a.nome)}</div><div class="sb-score az">${sessao.pontos.azul}</div></div></div>
                <div class="sb-vs">VS</div>
                <div class="sb-team right"><div><div class="sb-name">${esc(r.nome)}</div><div class="sb-score vm">${sessao.pontos.vermelho}</div></div><img src="${esc(r.logo)}" alt=""></div>
            </div>
        </div>`;
}

function overlayObs() {
    var a = sessao.azul, r = sessao.vermelho;
    return `
        <div class="tx-obs">
            <div class="tx-obs-mapbar">${esc(mapaSel ? (modoSel?modoSel+' · ':'')+mapaSel : (modoSel||'Partida Ao Vivo'))}</div>
            <div class="tx-obs-halves">
                <div class="tx-obs-half blue">
                    <div class="tx-obs-team"><img src="${esc(a.logo)}" alt=""><span class="tx-name">${esc(a.nome)}</span></div>
                    <div class="tx-obs-slots">${[0,1,2].map(i => obsSlot('azul', i)).join('')}</div>
                </div>
                <div class="tx-obs-center">
                    <div class="tx-obs-score"><span class="num az">${sessao.pontos.azul}</span><span class="sep">-</span><span class="num vm">${sessao.pontos.vermelho}</span></div>
                    <div class="tx-obs-round">Partida ${sessao.partidaAtual} · ${sessao.formato}</div>
                    <div class="tx-obs-map-img">${imgMapa()}</div>
                    <div class="tx-obs-map">${esc(mapaSel||'—')}</div>
                    <div class="tx-obs-mode">${esc(modoSel||'')}</div>
                </div>
                <div class="tx-obs-half red">
                    <div class="tx-obs-team"><img src="${esc(r.logo)}" alt=""><span class="tx-name">${esc(r.nome)}</span></div>
                    <div class="tx-obs-slots">${[0,1,2].map(i => obsSlot('vermelho', i)).join('')}</div>
                </div>
            </div>
        </div>`;
}

function obsSlot(time, i) {
    var val = estadoDraft.picks[time][i];
    var ativo = slotAtivo && slotAtivo.tipo === 'pick' && slotAtivo.time === time && slotAtivo.idx === i;
    if (val) {
        return `<div class="tx-obs-slot picked"><img loading="lazy" decoding="async" src="brawlers/${val}.png" onerror="this.style.visibility='hidden'"></div>`;
    }
    if (ativo) {
        return `<div class="tx-obs-slot picking"><div class="timer" id="tx-timer"></div></div>`;
    }
    return `<div class="tx-obs-slot"><span class="qmark">?</span></div>`;
}

function esc(s) { return String(s == null ? '' : s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

// Cronômetro de 35s mostrado na janela de transmissão (modo OBS)
function renderCronometroObs() {
    var el = document.getElementById('tx-timer');
    if (!el || !slotAtivo) return;
    var rest = Math.max(0, TEMPO_PICK - Math.floor((Date.now() - slotStart) / 1000));
    el.textContent = rest + 's';
}

// ════════════════════════════════════════════════════════════════
//  FUNÇÕES GERAIS
// ════════════════════════════════════════════════════════════════
function mostrarStep(nome) {
    document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
    document.getElementById('step-' + nome).classList.add('active');
}
function vitoriasNecessarias(formato) {
    return ({ "MD3": 2, "MD5": 3, "MD7": 4, "MD10": 6 })[formato] || 2;
}
function voltarSetup() { mostrarStep('setup'); fecharPicker(); }
function novaSessao() { sessao = null; estadoDraft = null; slotAtivo = null; voltarSetup(); }

// ════════════════════════════════════════════════════════════════
//  SETUP
// ════════════════════════════════════════════════════════════════
document.getElementById('logo-azul-url').addEventListener('input', function() {
    document.getElementById('logo-azul-preview').src = this.value.trim() || 'element/teams/unknow.png';
});
document.getElementById('logo-vermelho-url').addEventListener('input', function() {
    document.getElementById('logo-vermelho-preview').src = this.value.trim() || 'element/teams/unknow.png';
});

function iniciarSessao() {
    var formato = document.getElementById('formato').value;
    var tipoTrans = document.getElementById('tipo-trans').value;
    sessao = {
        azul: {
            nome: document.getElementById('nome-azul').value.trim() || 'Time Azul',
            logo: document.getElementById('logo-azul-url').value.trim() || 'element/teams/unknow.png',
            ids: [1,2,3].map(i => limparId(document.getElementById('azul-' + i).value))
        },
        vermelho: {
            nome: document.getElementById('nome-vermelho').value.trim() || 'Time Vermelho',
            logo: document.getElementById('logo-vermelho-url').value.trim() || 'element/teams/unknow.png',
            ids: [1,2,3].map(i => limparId(document.getElementById('vermelho-' + i).value))
        },
        formato: formato,
        tipoTransmissao: tipoTrans,
        pontos: { azul: 0, vermelho: 0 },
        partidaAtual: 1
    };
    estadoDraft = criarDraftVazio();
    iniciarPartida();
}

function iniciarPartida() {
    atualizarPlacar();
    document.getElementById('s-formato').textContent = sessao.formato;
    document.getElementById('s-vitorias-necessarias').textContent = '1º a ' + vitoriasNecessarias(sessao.formato) + ' vitórias';
    document.getElementById('s-num-partida').textContent = sessao.partidaAtual;
    estadoDraft = criarDraftVazio();
    modoSel = ''; mapaSel = '';
    document.getElementById('modo-partida').value = '';
    document.getElementById('mapa-partida').innerHTML = '<option value="">— Escolha o MAPA —</option>';
    renderDraftBoard();
    mostrarStep('vivo');
    publicarTx();
}

function criarDraftVazio() {
    return {
        bans: { azul: [null,null], vermelho: [null,null] },
        picks: { azul: [null,null,null], vermelho: [null,null,null] }
    };
}

// ════════════════════════════════════════════════════════════════
//  PLACAR
// ════════════════════════════════════════════════════════════════
function atualizarPlacar() {
    document.getElementById('s-logo-azul').src = sessao.azul.logo;
    document.getElementById('s-nome-azul').textContent = sessao.azul.nome;
    document.getElementById('s-pontos-azul').textContent = sessao.pontos.azul;
    document.getElementById('s-logo-vermelho').src = sessao.vermelho.logo;
    document.getElementById('s-nome-vermelho').textContent = sessao.vermelho.nome;
    document.getElementById('s-pontos-vermelho').textContent = sessao.pontos.vermelho;
}

// ════════════════════════════════════════════════════════════════
//  MODO / MAPA
// ════════════════════════════════════════════════════════════════
(function preencherModos() {
    var sel = document.getElementById('modo-partida');
    Object.keys(MAPAS).forEach(m => {
        var o = document.createElement('option');
        o.value = m; o.textContent = m;
        sel.appendChild(o);
    });
})();
document.getElementById('modo-partida').addEventListener('change', function() {
    modoSel = this.value;
    var sel = document.getElementById('mapa-partida');
    sel.innerHTML = '<option value="">— Escolha o MAPA —</option>';
    (MAPAS[this.value] || []).forEach(m => {
        var o = document.createElement('option');
        o.value = m; o.textContent = m;
        sel.appendChild(o);
    });
    publicarTx();
});
document.getElementById('mapa-partida').addEventListener('change', function() {
    mapaSel = this.value;
    publicarTx();
});

// ════════════════════════════════════════════════════════════════
//  DRAFT BOARD (controle na página principal)
// ════════════════════════════════════════════════════════════════
function renderDraftBoard() {
    var board = document.getElementById('draft-board');
    var html = '';

    html += '<div class="phase-title">🚫 BANS</div>';
    html += '<div style="display:flex;gap:20px;">';
    html += renderColuna('ban', 'azul');
    html += renderColuna('ban', 'vermelho');
    html += '</div>';

    html += '<div class="phase-title">🎯 PICKS</div>';
    html += '<div style="display:flex;gap:20px;">';
    html += renderColuna('pick', 'azul');
    html += renderColuna('pick', 'vermelho');
    html += '</div>';

    board.innerHTML = html;
}

function renderColuna(tipo, time) {
    var arr = estadoDraft[tipo === 'ban' ? 'bans' : 'picks'][time];
    var label = (time === 'azul' ? sessao.azul.nome : sessao.vermelho.nome) + ' — ' + (tipo === 'ban' ? 'BAN' : 'PICK');
    var cls = time === 'azul' ? 'blue' : 'red';
    var sizeCls = tipo === 'ban' ? 'ban' : '';
    var html = '<div style="flex:1;">';
    html += '<div class="team-col-label ' + cls + '">' + label + '</div>';
    html += '<div class="picks-row">';
    for (var i = 0; i < arr.length; i++) {
        var val = arr[i];
        var isSlotAtivo = slotAtivo && slotAtivo.tipo === tipo && slotAtivo.time === time && slotAtivo.idx === i;
        if (val) {
            html += '<div class="slot ' + sizeCls + '" title="' + nomeBonito(val) + '" onclick="abrirSlot(\'' + tipo + '\',\'' + time + '\',' + i + ')">';
            html += '<img loading="lazy" decoding="async" src="brawlers/' + val + '.png" onerror="this.style.display=\'none\'">';
            html += '<div class="slot-label">' + nomeBonito(val) + '</div>';
            html += '</div>';
        } else {
            html += '<div class="slot ' + sizeCls + ' empty ' + (isSlotAtivo ? 'active' : '') + '" onclick="abrirSlot(\'' + tipo + '\',\'' + time + '\',' + i + ')"></div>';
        }
    }
    html += '</div></div>';
    return html;
}

function abrirSlot(tipo, time, idx) {
    slotAtivo = { tipo: tipo, time: time, idx: idx };
    slotStart = Date.now(); // inicia cronômetro de 35s
    abrirPicker();
    publicarTx();
}

// ════════════════════════════════════════════════════════════════
//  SELECTOR DE BRAWLERS
// ════════════════════════════════════════════════════════════════
function abrirPicker() {
    document.getElementById('picker-overlay').style.display = 'flex';
    document.getElementById('picker-search').value = '';
    renderPickerGrid(BRAWLERS);
    document.getElementById('picker-search').focus();
}
function fecharPicker() {
    document.getElementById('picker-overlay').style.display = 'none';
    slotAtivo = null;
    publicarTx();
}
function filtrarPicker() {
    var t = document.getElementById('picker-search').value.toLowerCase();
    renderPickerGrid(BRAWLERS.filter(b => b.toLowerCase().includes(t)));
}
function renderPickerGrid(list) {
    var grid = document.getElementById('picker-grid');
    grid.innerHTML = '';
    list.forEach(b => {
        var cell = document.createElement('div');
        cell.className = 'pick-cell';
        cell.innerHTML = '<img loading="lazy" decoding="async" src="brawlers/' + b + '.png" onerror="this.style.display=\'none\'"><span>' + nomeBonito(b) + '</span>';
        cell.onclick = function() { escolherBrawler(b); };
        grid.appendChild(cell);
    });
}
function escolherBrawler(b) {
    if (!slotAtivo) { fecharPicker(); return; }
    var tipo = slotAtivo.tipo, time = slotAtivo.time, idx = slotAtivo.idx;
    if (tipo === 'ban') estadoDraft.bans[time][idx] = b;
    else estadoDraft.picks[time][idx] = b;
    slotAtivo = null;
    fecharPicker();
    renderDraftBoard();
    publicarTx();
}
document.getElementById('picker-overlay').addEventListener('click', function(e) {
    if (e.target === this) fecharPicker();
});

// ════════════════════════════════════════════════════════════════
//  FINALIZAR PARTIDA
// ════════════════════════════════════════════════════════════════
function validarPartida() {
    var modo = document.getElementById('modo-partida').value;
    var mapa = document.getElementById('mapa-partida').value;
    if (!modo) { alert('Escolha o MODO da partida.'); return null; }
    if (!mapa) { alert('Escolha o MAPA da partida.'); return null; }
    var picksOk = ['azul','vermelho'].every(t => estadoDraft.picks[t].every(p => p));
    if (!picksOk) { alert('Preencha os 6 picks (3 de cada time) antes de finalizar.'); return null; }
    return { modo: modo, mapa: mapa };
}

function finalizarPartida(time) {
    var meta = validarPartida();
    if (!meta) return;

    var registro = {
        ts: Date.now(),
        formato: sessao.formato,
        partida: sessao.partidaAtual,
        modo: meta.modo,
        mapa: meta.mapa,
        azul: { nome: sessao.azul.nome, logo: sessao.azul.logo, ids: sessao.azul.ids, bans: estadoDraft.bans.azul.slice(), picks: estadoDraft.picks.azul.slice() },
        vermelho: { nome: sessao.vermelho.nome, logo: sessao.vermelho.logo, ids: sessao.vermelho.ids, bans: estadoDraft.bans.vermelho.slice(), picks: estadoDraft.picks.vermelho.slice() },
        vencedor: time,
        placarApos: null
    };

    sessao.pontos[time]++;
    registro.placarApos = { azul: sessao.pontos.azul, vermelho: sessao.pontos.vermelho };
    salvarRegistro(registro);
    publicarTx();

    if (sessao.pontos[time] >= vitoriasNecessarias(sessao.formato)) {
        mostrarFim(time);
    } else {
        sessao.partidaAtual++;
        iniciarPartida();
    }
}

function mostrarFim(time) {
    var campeao = time === 'azul' ? sessao.azul : sessao.vermelho;
    document.getElementById('fim-campeao').textContent = '🏆 ' + campeao.nome;
    document.getElementById('fim-placar').textContent = sessao.pontos.azul + ' x ' + sessao.pontos.vermelho;
    document.getElementById('fim-resumo').textContent = 'Campeão em ' + sessao.partidaAtual + ' partidas (' + sessao.formato + ')';
    mostrarStep('fim');
    publicarTx();
}

function reiniciarPartida() {
    estadoDraft = criarDraftVazio();
    slotAtivo = null;
    renderDraftBoard();
    publicarTx();
}

// ════════════════════════════════════════════════════════════════
//  HISTÓRICO (localStorage)
// ════════════════════════════════════════════════════════════════
var CHAVE_HIST = 'bsc_hist_vivo';

function salvarRegistro(reg) {
    var hist = getHistorico();
    hist.push(reg);
    localStorage.setItem(CHAVE_HIST, JSON.stringify(hist));
}
function getHistorico() {
    try { return JSON.parse(localStorage.getItem(CHAVE_HIST)) || []; }
    catch (e) { return []; }
}
function limparHistorico() {
    if (confirm('Apagar TODO o histórico de partidas?')) {
        localStorage.removeItem(CHAVE_HIST);
        verHistorico();
    }
}

function verHistorico() {
    mostrarStep('historico');
    var container = document.getElementById('historico-lista');
    var hist = getHistorico();
    if (hist.length === 0) {
        container.innerHTML = '<div class="empty-msg">Nenhuma partida registrada ainda.</div>';
        return;
    }
    container.innerHTML = '';
    for (var i = hist.length - 1; i >= 0; i--) {
        container.appendChild(renderHistItem(hist[i]));
    }
    var clear = document.createElement('div');
    clear.style.marginTop = '10px';
    clear.innerHTML = '<button class="btn red" onclick="limparHistorico()" style="font-size:12px;padding:8px 14px;">🗑️ Limpar histórico</button>';
    container.appendChild(clear);
}

function renderHistItem(r) {
    var div = document.createElement('div');
    div.className = 'hist-item';
    var vencedorNome = r.vencedor === 'azul' ? r.azul.nome : r.vermelho.nome;
    var d = new Date(r.ts);
    var dataStr = d.toLocaleDateString('pt-BR') + ' ' + d.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    var emoji = r.vencedor === 'azul' ? '🔵' : '🔴';
    div.innerHTML = `
        <div class="hist-head">
            <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;">
                <span class="mini-tag">${r.formato} · Partida ${r.partida}</span>
                <span class="mini-tag">🗺️ ${r.modo} / ${r.mapa}</span>
                <span class="team-tag tag-win">${emoji} ${vencedorNome} venceu</span>
            </div>
            <span class="when">${dataStr}</span>
        </div>
        <div class="hist-picks">
            <div>
                <div class="mini-tag" style="margin-bottom:4px;">🔵 ${r.azul.nome} (${r.placarApos.azul})</div>
                <div class="picks">
                    ${r.azul.bans.map(p => p ? '<img src="brawlers/'+p+'.png" title="BAN: '+nomeBonito(p)+'" style="opacity:.5">' : '').join('')}
                    ${r.azul.picks.map(p => p ? '<img src="brawlers/'+p+'.png" title="PICK: '+nomeBonito(p)+'">' : '').join('')}
                </div>
            </div>
            <div>
                <div class="mini-tag" style="margin-bottom:4px;">🔴 ${r.vermelho.nome} (${r.placarApos.vermelho})</div>
                <div class="picks">
                    ${r.vermelho.bans.map(p => p ? '<img src="brawlers/'+p+'.png" title="BAN: '+nomeBonito(p)+'" style="opacity:.5">' : '').join('')}
                    ${r.vermelho.picks.map(p => p ? '<img src="brawlers/'+p+'.png" title="PICK: '+nomeBonito(p)+'">' : '').join('')}
                </div>
            </div>
        </div>`;
    return div;
}

// ════════════════════════════════════════════════════════════════
//  INICIALIZAÇÃO
// ════════════════════════════════════════════════════════════════
if (isTx) {
    iniciarModoTransmissao();
} else {
    // Pré-carrega as imagens dos brawlers em segundo plano
    if ('requestIdleCallback' in window) {
        requestIdleCallback(preloadBrawlerImgs, { timeout: 2000 });
    } else {
        setTimeout(preloadBrawlerImgs, 800);
    }
}
function preloadBrawlerImgs() {
    for (var i = 0; i < BRAWLERS.length; i++) {
        var im = new Image();
        im.decoding = 'async';
        im.src = 'brawlers/' + BRAWLERS[i] + '.png';
    }
}