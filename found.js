const FOUND_STORAGE_KEY="bcsinfos_found_players_v1";
const FOUND_DATA_URL="api/rosters_auto.json";
let foundDatabase=null;

function normalizarTag(tag){
    let v=String(tag||"").trim().toUpperCase();
    if(!v)return "";
    return v.startsWith("#")?v:"#"+v;
}
function salvar(lista){localStorage.setItem(FOUND_STORAGE_KEY,JSON.stringify(lista));}
function carregarSalvos(){try{const v=JSON.parse(localStorage.getItem(FOUND_STORAGE_KEY));return Array.isArray(v)?v:[]}catch{return[]}}
function status(txt,tipo=""){const e=document.getElementById("found-status");e.textContent=txt;e.className="found-status"+(tipo?" "+tipo:"");}
function meses(db){return Object.keys(db||{}).filter(x=>/^\d{4}-\d{2}$/.test(x)).sort().reverse()}

async function carregarBase(){
    try{
        const r=await fetch(FOUND_DATA_URL+"?v="+Date.now(),{cache:"no-store"});
        if(!r.ok)throw new Error("HTTP "+r.status);
        foundDatabase=await r.json();
        status("Base carregada. Digite uma tag para pesquisar.");
    }catch(e){
        console.error(e);foundDatabase=null;
        status("Não foi possível carregar api/rosters_auto.json.","error");
    }
}

/* Procura primeiro no mês mais recente. Também verifica os companheiros. */
function procurar(tag){
    if(!foundDatabase)return null;
    for(const mes of meses(foundDatabase)){
        for(const regiao of Object.keys(foundDatabase[mes]||{})){
            const lista=Array.isArray(foundDatabase[mes][regiao])?foundDatabase[mes][regiao]:[];
            for(const p of lista){
                if(normalizarTag(p.id_consultado)===tag)
                    return {tag,nick:p.nome_atual||tag,mes,regiao};
                const c=(p.companheiros||[]).find(x=>normalizarTag(x.tag)===tag);
                if(c)return {tag,nick:c.nome||tag,mes,regiao};
            }
        }
    }
    return null;
}

function render(){
    const box=document.getElementById("found-results"), lista=carregarSalvos();
    box.innerHTML="";
    if(!lista.length){box.innerHTML='<div class="found-empty">Nenhum jogador pesquisado ainda.</div>';return}
    lista.forEach(p=>{
        const card=document.createElement("article");card.className="found-card";
        const rm=document.createElement("button");rm.className="found-card-remove";rm.textContent="×";rm.title="Remover";
        rm.onclick=()=>{salvar(carregarSalvos().filter(x=>x.tag!==p.tag));render()};
        const name=document.createElement("div");name.className="found-card-name";name.textContent=p.nick||p.tag;
        const tag=document.createElement("div");tag.className="found-card-tag";tag.textContent=p.tag;
        const src=document.createElement("div");src.className="found-card-source";src.textContent=`Último registro: ${p.mes} • ${p.regiao}`;
        card.append(rm,name,tag,src);box.appendChild(card);
    });
}

async function pesquisar(ev){
    ev.preventDefault();
    const input=document.getElementById("player-tag"),btn=document.getElementById("found-button"),tag=normalizarTag(input.value);
    if(tag.length<3){status("Digite uma tag válida.","error");return}
    btn.disabled=true;status("Procurando jogador...");
    try{
        if(!foundDatabase)await carregarBase();
        const p=procurar(tag);
        if(!p){status(`A tag ${tag} não foi encontrada na base disponível.`,"error");return}
        const lista=carregarSalvos(),i=lista.findIndex(x=>x.tag===tag);
        if(i>=0)lista[i]=p;else lista.unshift(p);
        salvar(lista);render();status(`${p.nick} encontrado com sucesso.`,"success");input.value="";input.focus();
    }finally{btn.disabled=false}
}

document.addEventListener("DOMContentLoaded",()=>{
    document.getElementById("found-form").addEventListener("submit",pesquisar);
    document.getElementById("clear-found").addEventListener("click",()=>{
        if(confirm("Remover todos os jogadores salvos no FOUND?")){localStorage.removeItem(FOUND_STORAGE_KEY);render();status("Lista limpa.")}
    });
    render();carregarBase();
});
