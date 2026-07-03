let dadosBrutos = [];
let dadosFiltrados = [];
let dadosBans = [];
let dadosBansFiltrados = [];
let listaBrawlers = [];
let brawlerSelecionado = null;
let timeSelecionado = null;

// Configuração Global de Filtro de Ordenação na aba META
window.colunaOrdenacaoMeta = 'pick';
window.direcaoOrdenacaoMeta = 'desc';

const _REGIAO = window.REGIAO_ATUAL ? window.REGIAO_ATUAL.toUpperCase() : "SA";
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

// ========================================================
// 2. CONFIGURAÇÃO DE ROSTERS MENSAIS
// ========================================================
const ROSTERS_POR_DATA = {
    "2026": {
        "06": { 
           "SA": {
        "TIER S": [
            { id_time: "BH", nome_time: "Bounty Hunters", jogadores: [ { nick: "Wesley", tag: "#PLLRJC2V" }, { nick: "Prozy", tag: "#GYCYCLRJL" }, { nick: "Portox", tag: "#YGQYGCR" } ] },
            { id_time: "PIZZA", nome_time: "Pizza Congelado F/A", jogadores: [ { nick: "Jubileubr", tag: "#GVYLVUGR" }, { nick: "CAUEBR", tag: "#JQ8L0YYL" }, { nick: "Mohtep", tag: "#R2LR2QLG" } ] }
        ],
        "TIER A": [
            { id_time: "LOUD", nome_time: "LOUD", jogadores: [ { nick: "KaioDog", tag: "#GGUQCG0G" }, { nick: "FireCrow", tag: "#2GV09VJJP" }, { nick: "Edinho", tag: "#QJULVGU" } ] },
            { id_time: "OS", nome_time: "Olimpo Squad", jogadores: [ { nick: "Golden", tag: "#9QCJPL20" }, { nick: "Brabao", tag: "#L9PQUV0YC" }, { nick: "Pekka", tag: "#QJULVGU" } ] },
            { id_time: "GLXY", nome_time: "GALAXY", jogadores: [ { nick: "Doritos🐉", tag: "#202GJJR28" }, { nick: "Derpp🐰ᩚ", tag: "#2QG9LQQC8Y" }, { nick: "IceCrow", tag: "#9CPYUCGQC" } ] },
            { id_time: "SKC", nome_time: "SKCalalas SA", jogadores: [ { nick: "Kr ;)", tag: "#PR0P8QVQ" }, { nick: "Rhz", tag: "#89PVJG9R0" }, { nick: "Juan Carlos", tag: "#PR9U2JL" } ] },
            { id_time: "ENO", nome_time: "ENOSIS", jogadores: [ { nick: "Magic🎩", tag: "#2QCCC29QV" }, { nick: "REI DO FUT", tag: "#RVL0RPR9" }, { nick: "Fantas🌖", tag: "#PU20LUCQG" } ] },
            { id_time: "OCX", nome_time: "OCX Division", jogadores: [ { nick: "Tufa", tag: "#CQLR0Y80" }, { nick: "Enid", tag: "#2JGP0LYV2Q" }, { nick: "Red Eyes", tag: "#CUGVUYPG" } ] },
            { id_time: "AL", nome_time: "ACRE LOVERS", jogadores: [ { nick: "FireMirillo", tag: "#JQ8LLLY" }, { nick: "Satisfiyer", tag: "#PLJ8VQY2C" }, { nick: "Star Lipi", tag: "#2UQCCG92VG" } ] }
        ],
       "TIER B": [
                { id_time: "CB", nome_time: "CRECHE BRAWL", jogadores: [ { nick: "Tilo", tag: "#80VLPJCCC" }, { nick: "Bielz", tag: "#9Q22C88V8" }, { nick: "Yichy", tag: "#2LVGCJ2UQR" } ] },
                { id_time: "ZRT", nome_time: "ZURITA GANG", jogadores: [ { nick: "Jxcccr", tag: "#820JCJJG" }, { nick: "Exic", tag: "#RCYQUJU0" }, { nick: "", tag: "#" } ] },
                { id_time: "OCXA", nome_time: "OCX DIVISION ACADEMY", jogadores: [ { nick: "Sterixx", tag: "#2P8RVJVUY" }, { nick: "", tag: "#" }, { nick: "", tag: "#" } ] },
                { id_time: "LVL", nome_time: "LEVEL ESPORTS", jogadores: [ { nick: "Deykonn", tag: "#GJPVYUQG" }, { nick: "B4st", tag: "#2CJ0RCJ" }, { nick: "Todd", tag: "#22PGQU98R" } ] }
         ],
            "TIER B-/C+": [
                { id_time: "HAWK", nome_time: "RED HAWK", jogadores: [ { nick: "BeBaxo", tag: "#2YRRL8GG2" }, { nick: "Marcellus", tag: "#9J0R0GQL" }, { nick: "Migz Labubu", tag: "#82P9JCJV8" } ] },
                { id_time: "LVLA", nome_time: "LEVEL ESPORTS ACADEMY", jogadores: [ { nick: "JoeFav", tag: "#VQ8YP9C0" }, { nick: "Levi", tag: "#YQVPY0J9" }, { nick: "xJnn", tag: "#GLQG9CU20" } ] },
                { id_time: "AG", nome_time: "AG ESPORTS", jogadores: [ { nick: "Lion", tag: "#8OYUV29GR" }, { nick: "Bieel", tag: "#9JVUGR2JG" }, { nick: "Brennox🎩", tag: "#LLCURQVY2" }, { nick: "Puda", tag: "#829QUYGPO" } ] },
                { id_time: "JPFC", nome_time: "JAPÃO FC ESPORTS", jogadores: [ { nick: "Azuri", tag: "#YCUGURU89" }, { nick: "Raze", tag: "#2GP98PQOG" }, { nick: "Esoteric", tag: "#8C8988222" } ] }
        ]
    },
    "NA": {
        "TIER S": [
            { id_time: "RLM", nome_time: "ONLY REALM", jogadores: [ { nick: "Bobby", tag: "#LVRRYPV" }, { nick: "Patch", tag: "#RLLRJ2" }, { nick: "Sans", tag: "#QUYCVC2" } ] },
            { id_time: "TRB", nome_time: "TRIBE GAMING", jogadores: [ { nick: "Lxffy", tag: "#82RCQCVG" }, { nick: "RBM", tag: "#U9GC8G02" }, { nick: "Diegogamer", tag: "#QLCJGQUP" } ] },
        ],
        "TIER A": [
            { id_time: "TE", nome_time: "TEAM ELEKTROS", jogadores: [ { nick: "Snoiy", tag: "#YUJ8PJ0LR" }, { nick: "Memxn", tag: "#PJPPY9LRC" }, { nick: "Doin", tag: "#8CRU0PQRQ" } ] },
            { id_time: "HML", nome_time: "F/A Homeless", jogadores: [ { nick: "Tyrant", tag: "#VPVLG2" }, { nick: "Xemp", tag: "#2P9CJVGJ8" }, { nick: "Ducky", tag: "#20P2GP99" } ] },
            { id_time: "NOVA", nome_time: "NOVA", jogadores: [ { nick: "PaiN", tag: "#GVLRUG9Q" }, { nick: "Roledu", tag: "#LPQQLYL2" }, { nick: "Kiritom", tag: "#LU8C9YJU" } ] },
            { id_time: "VTC", nome_time: "VATIC", jogadores: [ { nick: "Ezlivi", tag: "#QURVLPG" }, { nick: "Belal", tag: "#Q2VCLG9Y9" }, { nick: "Duckie", tag: "#22JR2JLYC" } ] },
            { id_time: "LGCY", nome_time: "LEGACY", jogadores: [ { nick: "Rafiki", tag: "#R9CCLP8Q" }, { nick: "Zoulan", tag: "#LYR0Q9C" }, { nick: "Zeus", tag: "#2Q028GQQP" } ] },
            { id_time: "VIC", nome_time: "VIC", jogadores: [ { nick: "OG", tag: "#28LUY98" }, { nick: "Juice", tag: "#RP0UL9QUG" }, { nick: "SecondBest", tag: "#PVQ9QUY" } ] },
            { id_time: "VICD", nome_time: "VIC Day", jogadores: [ { nick: "Vegeta", tag: "#JJ09PC0P" }, { nick: "Tacos", tag: "#GCJCRVQ8" }, { nick: "Chino", tag: "#VJUQ0Y" } ] }
        ],
        "TIER B": [
            { id_time: "RLMA", nome_time: "ONLY REALM Academy", jogadores: [ { nick: "Winq", tag: "#8UL0U08V" }, { nick: "Nerf", tag: "#9YYUPGJ2V" }, { nick: "Juni", tag: "#PL0GRVJRJ" } ] },
            { id_time: "PFZ", nome_time: "PFZ", jogadores: [ { nick: "Squeezy", tag: "#R80QRP0G" }, { nick: "Diegofr", tag: "#8CC2CL8Q" }, { nick: "Alyanys", tag: "#2LQ0RGCRU" } ] },
            { id_time: "ENONA", nome_time: "ENOSIS NA", jogadores: [ { nick: "David", tag: "#88PL8L2JC" }, { nick: "GN", tag: "#9GPQR8CGL" }, { nick: "Razuen", tag: "#8Q2QUV00J" } ] }
        ]
    },
    "EMEA": {
        "TIER S": [
            { id_time: "FUT", nome_time: "FUT ESPORTS", jogadores: [ { nick: "AngelBoy", tag: "#9PCV9L982" }, { nick: "Guesti", tag: "#2R0JLJJ9PP" }, { nick: "Nob", tag: "#P2808PRC" } ] },
            { id_time: "HMB", nome_time: "HMBLE", jogadores: [ { nick: "Symantec", tag: "#YQUCCJ2"}, { nick: "BosS", tag: "#V89Y2GP0" }, { nick: "Lukii", tag: "#8V92UYCJ" } ] }

        ],
    "TIER A": [
            { id_time: "KUMA", nome_time: "KUMA", jogadores: [ { nick: "Dompe", tag: "#2208QGGGL" }, { nick: "Mine", tag: "#V888YPGU" }, { nick: "Nes", tag: "#Q808R2CV" } ] },
            { id_time: "NAVI", nome_time: "NAVI", jogadores: [ { nick: "Enraged", tag: "#80PVPCC29" }, { nick: "GeRo", tag: "#2VJCCCQGP" }, { nick: "Drage", tag: "#J089RQ" } ] },
            { id_time: "MZP", nome_time: "MZP", jogadores: [ { nick: "Decaii", tag: "#2Y822YJYJC" }, { nick: "Ćiro", tag: "#2RR2RU8UL" }, { nick: "LeNain", tag: "#20L88L2J" } ] },     
            { id_time: "SK", nome_time: "SK GAMING", jogadores: [ { nick: "Ope", tag: "#9LVUC2PY" }, { nick: "Yoshi825", tag: "#CJV2PJ0R" }, { nick: "Yoko", tag: "#29VRJU08C" } ] },
            { id_time: "TH", nome_time: "TEAM HERETICS", jogadores: [ { nick: "IKaoss", tag: "#PCPRPJV" }, { nick: "Marco", tag: "#Q22ULY9JY" }, { nick: "Zimon", tag: "#22CL00PG0" } ] },
            { id_time: "TTM", nome_time: "REPLY TOTEM", jogadores: [ { nick: "Maru", tag: "#2Q892QVU" }, { nick: "Joker", tag: "#9JCG0VY8U" }, { nick: "Maury", tag: "#82RGU8PR" } ] },
            { id_time: "NOVO", nome_time: "NOVO ESPORTS", jogadores: [ { nick: "Filippo", tag: "#9PQQ8GQQ" }, { nick: "MeOw", tag: "#90JCYPQU" }, { nick: "Jus", tag: "#JJ92RGPL" } ] },
            { id_time: "BIG", nome_time: "BIG", jogadores: [ { nick: "Salty", tag: "#PLV89CGP" }, { nick: "Arthur🥥", tag: "#9RVPL0Q0P" }, { nick: "Melih🥥", tag: "#GLPJRCLYL" } ] }
        ],
     "TIER B": [
            { id_time: "REV", nome_time: "REVERSO HIVE", jogadores: [ { nick: "Fayelo", tag: "#LLV82LQPU" }, { nick: "Ethan", tag: "#2Y20JR8CQ" }, { nick: "Natrix", tag: "#CJ9YRGGC" } ] },
            { id_time: "TLB", nome_time: "TALENTS LAB", jogadores: [ { nick: "Yei Yei", tag: "#8RVLRVYYP" }, { nick: "Agachi", tag: "#YYUG20PQV" }, { nick: "Stas", tag: "#9LYQR9QC" } ] },
        ],
    },
    "EA": {
        "TIER S": [
            { id_time: "CR", nome_time: "CRAZY RACCOON", jogadores: [ { nick: "Tensai", tag: "#9ULYPV8" }, { nick: "Milkreo", tag: "#20C0LL00" }, { nick: "Moya", tag: "#UR2UL8YR" } ] },
            { id_time: "ZETA", nome_time: "ZETA DIVISION", jogadores: [ { nick: "Battoman", tag: "#P0Y8JGL0U" }, { nick: "Sizuku", tag: "#P90RJQ8C" }, { nick: "Sitetampo", tag: "#8Y98Q8U" } ] }
        ],
    "TIER A": [
            { id_time: "SKCEA", nome_time: "SKC EA", jogadores: [ { nick: "Kuru", tag: "#J99YU9QY" }, { nick: "Ghost T", tag: "#2CJJJGUJ20" }, { nick: "Naipishu", tag: "#2P0V0CQQ2" } ] },
            { id_time: "FG", nome_time: "IGM", jogadores: [ { nick: "Shigemyon", tag: "#2RQQ9PGC" }, { nick: "Drake", tag: "#2CJG2GGCGP" }, { nick: "Nyade", tag: "2UQVY2JL2V#" } ] },
            { id_time: "AXIS", nome_time: "AXIS", jogadores: [ { nick: "Terry", tag: "#LJ0288PRG" }, { nick: "Yume", tag: "#PJ80QPVL2" }, { nick: "Menmi", tag: "#QCLV9CL" } ] },
            { id_time: "RVL", nome_time: "RIVAL", jogadores: [ { nick: "Yutapin", tag: "#82CJYJPG2" }, { nick: "Ryohei", tag: "#82PQUPGU0" }, { nick: "Totoro", tag: "#2ULLCRYJ2Y" } ] },
            { id_time: "RC", nome_time: "REJECT", jogadores: [ { nick: "Melty", tag: "#8J9GUJJVY" }, { nick: "Levi", tag: "#29UGLJV2G" }, { nick: "Shu", tag: "#2G0RRLU2R" } ] },
            { id_time: "FL", nome_time: "FENNEL", jogadores: [ { nick: "Achapi", tag: "#28PU0P9L0" }, { nick: "Ken-G", tag: "#2282LR0YG" }, { nick: "I see", tag: "#8Y2Y0GYYG" } ] },
            { id_time: "INS", nome_time: "INSOMNIA", jogadores: [ { nick: "Koga", tag: "#28VP0G808" }, { nick: "Wahochi", tag: "#80YVJGRY" }, { nick: "Jene", tag: "#8GUPLYY" } ] },
            { id_time: "FZ", nome_time: "FRENZY", jogadores: [ { nick: "Toridesu", tag: "#89UUQLJCC" }, { nick: "Danshari", tag: "#99GGUPY2U" }, { nick: "Ferkel", tag: "#CV9Y9VPP" } ] },
            { id_time: "F0", nome_time: "FAZE ZERO", jogadores: [ { nick: "Rennosuke", tag: "#8R0JY2UJ2" }, { nick: "Telpny", tag: "#9GJ8GYCY2" }, { nick: "Mira", tag: "#88LLQGP0Q" } ] }
                ]
            }
        }
    },
    // PADRÃO DE SEGURANÇA (Se a pessoa filtrar "Todos" ou um mês não cadastrado)
    "PADRAO": {
        "SA": {
        "TIER S": [
            { id_time: "BH", nome_time: "Bounty Hunters", jogadores: [ { nick: "Wesley", tag: "#PLLRJC2V" }, { nick: "Prozy", tag: "#GYCYCLRJL" }, { nick: "Portox", tag: "#YGQYGCR" } ] },
            { id_time: "PIZZA", nome_time: "Pizza Congelado F/A", jogadores: [ { nick: "Jubileubr", tag: "#GVYLVUGR" }, { nick: "CAUEBR", tag: "#JQ8L0YYL" }, { nick: "Mohtep", tag: "#R2LR2QLG" } ] }
        ],
        "TIER A": [
            { id_time: "LOUD", nome_time: "LOUD", jogadores: [ { nick: "KaioDog", tag: "#GGUQCG0G" }, { nick: "FireCrow", tag: "#2GV09VJJP" }, { nick: "Edinho", tag: "#QJULVGU" } ] },
            { id_time: "OS", nome_time: "Olimpo Squad", jogadores: [ { nick: "Golden", tag: "#9QCJPL20" }, { nick: "Brabao", tag: "#L9PQUV0YC" }, { nick: "Pekka", tag: "#QJULVGU" } ] },
            { id_time: "GLXY", nome_time: "GALAXY", jogadores: [ { nick: "Doritos🐉", tag: "#202GJJR28" }, { nick: "Derpp🐰ᩚ", tag: "#2QG9LQQC8Y" }, { nick: "IceCrow", tag: "#9CPYUCGQC" } ] },
            { id_time: "SKC", nome_time: "SKCalalas SA", jogadores: [ { nick: "Kr ;)", tag: "#PR0P8QVQ" }, { nick: "Rhz", tag: "#89PVJG9R0" }, { nick: "Juan Carlos", tag: "#PR9U2JL" } ] },
            { id_time: "ENO", nome_time: "ENOSIS", jogadores: [ { nick: "Magic🎩", tag: "#2QCCC29QV" }, { nick: "REI DO FUT", tag: "#RVL0RPR9" }, { nick: "Fantas🌖", tag: "#PU20LUCQG" } ] },
            { id_time: "OCX", nome_time: "OCX Division", jogadores: [ { nick: "Tufa", tag: "#CQLR0Y80" }, { nick: "Enid", tag: "#2JGP0LYV2Q" }, { nick: "Red Eyes", tag: "#CUGVUYPG" } ] },
            { id_time: "AL", nome_time: "ACRE LOVERS", jogadores: [ { nick: "FireMirillo", tag: "#JQ8LLLY" }, { nick: "Satisfiyer", tag: "#PLJ8VQY2C" }, { nick: "Star Lipi", tag: "#2UQCCG92VG" } ] }
        ],
        "TIER B": [
                { id_time: "CB", nome_time: "CRECHE BRAWL", jogadores: [ { nick: "Tilo", tag: "#80VLPJCCC" }, { nick: "Bielz", tag: "#9Q22C88V8" }, { nick: "Yichy", tag: "#2LVGCJ2UQR" } ] },
                { id_time: "ZRT", nome_time: "ZURITA GANG", jogadores: [ { nick: "Jxcccr", tag: "#820JCJJG" }, { nick: "Exic", tag: "#RCYQUJU0" }, { nick: "", tag: "#" } ] },
                { id_time: "OCXA", nome_time: "OCX DIVISION ACADEMY", jogadores: [ { nick: "Sterixx", tag: "#2P8RVJVUY" }, { nick: "", tag: "#" }, { nick: "", tag: "#" } ] },
                { id_time: "LVL", nome_time: "LEVEL ESPORTS", jogadores: [ { nick: "Deykonn", tag: "#GJPVYUQG" }, { nick: "B4st", tag: "#2CJ0RCJ" }, { nick: "Todd", tag: "#22PGQU98R" } ] }
         ],
            "TIER B-/C+": [
                { id_time: "HAWK", nome_time: "RED HAWK", jogadores: [ { nick: "BeBaxo", tag: "#2YRRL8GG2" }, { nick: "Marcellus", tag: "#9J0R0GQL" }, { nick: "Migz Labubu", tag: "#82P9JCJV8" } ] },
                { id_time: "LVLA", nome_time: "LEVEL ESPORTS ACADEMY", jogadores: [ { nick: "JoeFav", tag: "#VQ8YP9C0" }, { nick: "Levi", tag: "#YQVPY0J9" }, { nick: "xJnn", tag: "#GLQG9CU20" } ] },
                { id_time: "AG", nome_time: "AG ESPORTS", jogadores: [ { nick: "Lion", tag: "#8OYUV29GR" }, { nick: "Bieel", tag: "#9JVUGR2JG" }, { nick: "Brennox🎩", tag: "#LLCURQVY2" }, { nick: "Puda", tag: "#829QUYGPO" } ] },
                { id_time: "JPFC", nome_time: "JAPÃO FC ESPORTS", jogadores: [ { nick: "Azuri", tag: "#YCUGURU89" }, { nick: "Raze", tag: "#2GP98PQOG" }, { nick: "Esoteric", tag: "#8C8988222" } ] }
        ]
    },
    "NA": {
        "TIER S": [
            { id_time: "RLM", nome_time: "ONLY REALM", jogadores: [ { nick: "Bobby", tag: "#LVRRYPV" }, { nick: "Patch", tag: "#RLLRJ2" }, { nick: "Sans", tag: "#QUYCVC2" } ] },
            { id_time: "TRB", nome_time: "TRIBE GAMING", jogadores: [ { nick: "Lxffy", tag: "#82RCQCVG" }, { nick: "RBM", tag: "#U9GC8G02" }, { nick: "Diegogamer", tag: "#QLCJGQUP" } ] },
        ],
        "TIER A": [
            { id_time: "TE", nome_time: "TEAM ELEKTROS", jogadores: [ { nick: "Snoiy", tag: "#YUJ8PJ0LR" }, { nick: "Memxn", tag: "#PJPPY9LRC" }, { nick: "Doin", tag: "#8CRU0PQRQ" } ] },
            { id_time: "HML", nome_time: "F/A Homeless", jogadores: [ { nick: "Tyrant", tag: "#VPVLG2" }, { nick: "Xemp", tag: "#2P9CJVGJ8" }, { nick: "Ducky", tag: "#20P2GP99" } ] },
            { id_time: "NOVA", nome_time: "NOVA", jogadores: [ { nick: "PaiN", tag: "#GVLRUG9Q" }, { nick: "Roledu", tag: "#LPQQLYL2" }, { nick: "Kiritom", tag: "#LU8C9YJU" } ] },
            { id_time: "VTC", nome_time: "VATIC", jogadores: [ { nick: "Ezlivi", tag: "#QURVLPG" }, { nick: "Belal", tag: "#Q2VCLG9Y9" }, { nick: "Duckie", tag: "#22JR2JLYC" } ] },
            { id_time: "LGCY", nome_time: "LEGACY", jogadores: [ { nick: "Rafiki", tag: "#R9CCLP8Q" }, { nick: "Zoulan", tag: "#LYR0Q9C" }, { nick: "Zeus", tag: "#2Q028GQQP" } ] },
            { id_time: "VIC", nome_time: "VIC", jogadores: [ { nick: "OG", tag: "#28LUY98" }, { nick: "Juice", tag: "#RP0UL9QUG" }, { nick: "SecondBest", tag: "#PVQ9QUY" } ] },
            { id_time: "VICD", nome_time: "VIC Day", jogadores: [ { nick: "Vegeta", tag: "#JJ09PC0P" }, { nick: "Tacos", tag: "#GCJCRVQ8" }, { nick: "Chino", tag: "#VJUQ0Y" } ] }
        ],
        "TIER B": [
            { id_time: "RLMA", nome_time: "ONLY REALM Academy", jogadores: [ { nick: "Winq", tag: "#8UL0U08V" }, { nick: "Nerf", tag: "#9YYUPGJ2V" }, { nick: "Juni", tag: "#PL0GRVJRJ" } ] },
            { id_time: "PFZ", nome_time: "PFZ", jogadores: [ { nick: "Squeezy", tag: "#R80QRP0G" }, { nick: "Diegofr", tag: "#8CC2CL8Q" }, { nick: "Alyanys", tag: "#2LQ0RGCRU" } ] },
            { id_time: "ENONA", nome_time: "ENOSIS NA", jogadores: [ { nick: "David", tag: "#88PL8L2JC" }, { nick: "GN", tag: "#9GPQR8CGL" }, { nick: "Razuen", tag: "#8Q2QUV00J" } ] }
        ]
    },
    "EMEA": {
        "TIER S": [
            { id_time: "FUT", nome_time: "FUT ESPORTS", jogadores: [ { nick: "AngelBoy", tag: "#9PCV9L982" }, { nick: "Guesti", tag: "#2R0JLJJ9PP" }, { nick: "Nob", tag: "#P2808PRC" } ] },
            { id_time: "HMB", nome_time: "HMBLE", jogadores: [ { nick: "Symantec", tag: "#YQUCCJ2"}, { nick: "BosS", tag: "#V89Y2GP0" }, { nick: "Lukii", tag: "#8V92UYCJ" } ] }

        ],
    "TIER A": [
            { id_time: "KUMA", nome_time: "KUMA", jogadores: [ { nick: "Dompe", tag: "#2208QGGGL" }, { nick: "Mine", tag: "#V888YPGU" }, { nick: "Nes", tag: "#Q808R2CV" } ] },
            { id_time: "NAVI", nome_time: "NAVI", jogadores: [ { nick: "Enraged", tag: "#80PVPCC29" }, { nick: "GeRo", tag: "#2VJCCCQGP" }, { nick: "Drage", tag: "#J089RQ" } ] },
            { id_time: "MZP", nome_time: "MZP", jogadores: [ { nick: "Decaii", tag: "#2Y822YJYJC" }, { nick: "Ćiro", tag: "#2RR2RU8UL" }, { nick: "LeNain", tag: "#20L88L2J" } ] },     
            { id_time: "SK", nome_time: "SK GAMING", jogadores: [ { nick: "Ope", tag: "#9LVUC2PY" }, { nick: "Yoshi825", tag: "#CJV2PJ0R" }, { nick: "Yoko", tag: "#29VRJU08C" } ] },
            { id_time: "TH", nome_time: "TEAM HERETICS", jogadores: [ { nick: "IKaoss", tag: "#PCPRPJV" }, { nick: "Marco", tag: "#Q22ULY9JY" }, { nick: "Zimon", tag: "#22CL00PG0" } ] },
            { id_time: "TTM", nome_time: "REPLY TOTEM", jogadores: [ { nick: "Maru", tag: "#2Q892QVU" }, { nick: "Joker", tag: "#9JCG0VY8U" }, { nick: "Maury", tag: "#82RGU8PR" } ] },
            { id_time: "NOVO", nome_time: "NOVO ESPORTS", jogadores: [ { nick: "Filippo", tag: "#9PQQ8GQQ" }, { nick: "MeOw", tag: "#90JCYPQU" }, { nick: "Jus", tag: "#JJ92RGPL" } ] },
            { id_time: "BIG", nome_time: "BIG", jogadores: [ { nick: "Salty", tag: "#PLV89CGP" }, { nick: "Arthur🥥", tag: "#9RVPL0Q0P" }, { nick: "Melih🥥", tag: "#GLPJRCLYL" } ] }
        ],
     "TIER B": [
            { id_time: "REV", nome_time: "REVERSO HIVE", jogadores: [ { nick: "Fayelo", tag: "#LLV82LQPU" }, { nick: "Ethan", tag: "#2Y20JR8CQ" }, { nick: "Natrix", tag: "#CJ9YRGGC" } ] },
            { id_time: "TLB", nome_time: "TALENTS LAB", jogadores: [ { nick: "Yei Yei", tag: "#8RVLRVYYP" }, { nick: "Agachi", tag: "#YYUG20PQV" }, { nick: "Stas", tag: "#9LYQR9QC" } ] },
        ],
    },
    "EA": {
        "TIER S": [
            { id_time: "CR", nome_time: "CRAZY RACCOON", jogadores: [ { nick: "Tensai", tag: "#9ULYPV8" }, { nick: "Milkreo", tag: "#20C0LL00" }, { nick: "Moya", tag: "#UR2UL8YR" } ] },
            { id_time: "ZETA", nome_time: "ZETA DIVISION", jogadores: [ { nick: "Battoman", tag: "#P0Y8JGL0U" }, { nick: "Sizuku", tag: "#P90RJQ8C" }, { nick: "Sitetampo", tag: "#8Y98Q8U" } ] }
        ],
    "TIER A": [
            { id_time: "SKCEA", nome_time: "SKC EA", jogadores: [ { nick: "Kuru", tag: "#J99YU9QY" }, { nick: "Ghost T", tag: "#2CJJJGUJ20" }, { nick: "Naipishu", tag: "#2P0V0CQQ2" } ] },
            { id_time: "FG", nome_time: "IGM", jogadores: [ { nick: "Shigemyon", tag: "#2RQQ9PGC" }, { nick: "Drake", tag: "#2CJG2GGCGP" }, { nick: "Nyade", tag: "2UQVY2JL2V#" } ] },
            { id_time: "AXIS", nome_time: "AXIS", jogadores: [ { nick: "Terry", tag: "#LJ0288PRG" }, { nick: "Yume", tag: "#PJ80QPVL2" }, { nick: "Menmi", tag: "#QCLV9CL" } ] },
            { id_time: "RVL", nome_time: "RIVAL", jogadores: [ { nick: "Yutapin", tag: "#82CJYJPG2" }, { nick: "Ryohei", tag: "#82PQUPGU0" }, { nick: "Totoro", tag: "#2ULLCRYJ2Y" } ] },
            { id_time: "RC", nome_time: "REJECT", jogadores: [ { nick: "Melty", tag: "#8J9GUJJVY" }, { nick: "Levi", tag: "#29UGLJV2G" }, { nick: "Shu", tag: "#2G0RRLU2R" } ] },
            { id_time: "FL", nome_time: "FENNEL", jogadores: [ { nick: "Achapi", tag: "#28PU0P9L0" }, { nick: "Ken-G", tag: "#2282LR0YG" }, { nick: "I see", tag: "#8Y2Y0GYYG" } ] },
            { id_time: "INS", nome_time: "INSOMNIA", jogadores: [ { nick: "Koga", tag: "#28VP0G808" }, { nick: "Wahochi", tag: "#80YVJGRY" }, { nick: "Jene", tag: "#8GUPLYY" } ] },
            { id_time: "FZ", nome_time: "FRENZY", jogadores: [ { nick: "Toridesu", tag: "#89UUQLJCC" }, { nick: "Danshari", tag: "#99GGUPY2U" }, { nick: "Ferkel", tag: "#CV9Y9VPP" } ] },
            { id_time: "F0", nome_time: "FAZE ZERO", jogadores: [ { nick: "Rennosuke", tag: "#8R0JY2UJ2" }, { nick: "Telpny", tag: "#9GJ8GYCY2" }, { nick: "Mira", tag: "#88LLQGP0Q" } ] }
            ]
        }
    }
}

let CONFIGURACAO_MANUAL_TIMES = {};

function obterConfigRosterAtual() {
    const ano = document.getElementById('select-ano')?.value || "2026";
    const mes = document.getElementById('select-mes')?.value || "06";
    if(ROSTERS_POR_DATA[ano] && ROSTERS_POR_DATA[ano][mes] && ROSTERS_POR_DATA[ano][mes][_REGIAO]) {
        return ROSTERS_POR_DATA[ano][mes][_REGIAO];
    }
    return ROSTERS_POR_DATA["PADRAO"][_REGIAO] || {};
}

function carregarDicionarioNicks() {
    CONFIGURACAO_MANUAL_TIMES = {};
    const roster = obterConfigRosterAtual();
    Object.values(roster).forEach(lista => {
        lista.forEach(t => {
            t.jogadores.forEach(j => {
                if(j.tag && j.tag !== "#") {
                    CONFIGURACAO_MANUAL_TIMES[j.tag.toUpperCase().trim()] = j.nick;
                }
            });
        });
    });
}

function obterNickPlayer(tag) {
    if(!tag) return "Desconhecido";
    let cleanTag = tag.toUpperCase().trim();
    if(CONFIGURACAO_MANUAL_TIMES[cleanTag]) {
        return CONFIGURACAO_MANUAL_TIMES[cleanTag];
    }
    let pMatches = dadosBrutos.filter(r => r.player_tag && r.player_tag.toUpperCase().trim() === cleanTag);
    if(pMatches.length > 0) {
        let first = pMatches[0];
        if(first.name_players && first.id_players) {
            let ids = first.id_players.split(';');
            let names = first.name_players.split(';');
            let idx = ids.map(x => x.toUpperCase().trim()).indexOf(cleanTag);
            if(idx !== -1 && names[idx]) return names[idx].trim();
        }
    }
    return tag;
}

// ========================================================
// 3. INICIALIZAÃ‡ÃƒO E CARREGAMENTO DE DADOS
// ========================================================
document.addEventListener('DOMContentLoaded', () => {
    configurarEstruturaFiltros();
});

function configurarEstruturaFiltros() {
    const csvUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTshw8w1_uM-EuhgS86gZq-06w8S1wO6k0hUuK8O-b0aXgB0rM8Sg/pub?gid=1506543973&output=csv";
    const bansUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTshw8w1_uM-EuhgS86gZq-06w8S1wO6k0hUuK8O-b0aXgB0rM8Sg/pub?gid=2074360341&output=csv";

    Papa.parse(csvUrl, {
        download: true, header: true, skipEmptyLines: true,
        complete: function(results) {
            dadosBrutos = results.data;
            Papa.parse(bansUrl, {
                download: true, header: true, skipEmptyLines: true,
                complete: function(bansResults) {
                    dadosBans = bansResults.data;
                    inicializarFiltros();
                }
            });
        }
    });
}

function inicializarFiltros() {
    let anos = new Set(), meses = new Set(), dias = new Set();
    dadosBrutos.forEach(r => {
        if(r.data_adicao) {
            let partes = r.data_adicao.split('/');
            if(partes.length === 3) {
                anos.add(partes[2]); meses.add(partes[1]); dias.add(partes[0]);
            }
        }
    });

    preencherSelect('select-ano', anos, "2026");
    preencherSelect('select-mes', meses, "06");
    preencherSelect('select-dia', dias, "todos", true);

    processarDadosGlobais();
}

function preencherSelect(id, conjunto, valorPadrao, incluirTodos = false) {
    const select = document.getElementById(id);
    if(!select) return;
    select.innerHTML = '';
    if(incluirTodos) {
        select.innerHTML += `<option value="todos">Todos (Dia)</option>`;
    }
    Array.from(conjunto).sort().forEach(v => {
        select.innerHTML += `<option value="${v}">${v}</option>`;
    });
    if(valorPadrao && Array.from(conjunto).includes(valorPadrao)) {
        select.value = valorPadrao;
    }
}

function parseDateBR(str) {
    if(!str) return new Date(0);
    let partes = str.split('/');
    if(partes.length !== 3) return new Date(0);
    return new Date(partes[2], partes[1] - 1, partes[0]);
}

function processarDadosGlobais() {
    carregarDicionarioNicks();
    const anoSel = document.getElementById('select-ano').value;
    const mesSel = document.getElementById('select-mes').value;
    const diaSel = document.getElementById('select-dia').value;
    const tipoSel = document.getElementById('select-tipo').value;

    dadosFiltrados = dadosBrutos.filter(r => {
        if(!r.data_adicao) return false;
        let partes = r.data_adicao.split('/');
        if(partes.length !== 3) return false;
        if(partes[2] !== anoSel) return false;
        if(partes[1] !== mesSel) return false;
        if(diaSel !== "todos" && partes[0] !== diaSel) return false;
        if(tipoSel !== "todos" && (!r.tipo || r.tipo.toLowerCase() !== tipoSel.toLowerCase())) return false;
        return true;
    });

    dadosBansFiltrados = dadosBans.filter(r => {
        if(!r.id_partida) return false;
        let pMatch = dadosBrutos.find(db => db.id_partida === r.id_partida);
        if(!pMatch || !pMatch.data_adicao) return false;
        let partes = pMatch.data_adicao.split('/');
        if(partes[2] !== anoSel) return false;
        if(partes[1] !== mesSel) return false;
        if(diaSel !== "todos" && partes[0] !== diaSel) return false;
        if(tipoSel !== "todos" && (!pMatch.tipo || pMatch.tipo.toLowerCase() !== tipoSel.toLowerCase())) return false;
        return true;
    });

    // Mapeamento Ãºnico de brawlers cadastrados
    let bset = new Set();
    dadosBrutos.forEach(r => { if(r.pick) bset.add(r.pick.toUpperCase().trim()); });
    listaBrawlers = Array.from(bset).sort();

    renderizarMeta();
    renderizarSidebarBrawlers();
    renderizarSidebarTimes();
    processarScrims();
    
    if(document.getElementById('tela-modos').classList.contains('tela-ativa')) {
        renderizarModos();
    }
}

function formatImg(str) {
    if(!str) return "default";
    return str.toLowerCase().trim().replace(/[\s\.\-\'\â€™]/g, '_');
}

// ========================================================
// 4. SISTEMA DA TELA META (COM FILTROS DE ORDENAÃ‡ÃƒO)
// ========================================================
window.ordenarMeta = function(coluna) {
    if(window.colunaOrdenacaoMeta === coluna) {
        window.direcaoOrdenacaoMeta = window.direcaoOrdenacaoMeta === 'desc' ? 'asc' : 'desc';
    } else {
        window.colunaOrdenacaoMeta = coluna;
        window.direcaoOrdenacaoMeta = 'desc';
    }
    renderizarMeta();
};

function renderizarMeta() {
    const container = document.getElementById('conteudo-meta');
    if(!container) return;
    container.innerHTML = "";

    // Agrupamento de dados estruturados por Modo -> Mapa -> Brawler
    let estrutura = {};
    dadosFiltrados.forEach(r => {
        let m = r.modo, map = r.mapa, b = r.pick;
        if(!m || !map || !b) return;
        b = b.toUpperCase().trim();
        if(!estrutura[m]) estrutura[m] = {};
        if(!estrutura[m][map]) estrutura[m][map] = {};
        if(!estrutura[m][map][b]) estrutura[m][map][b] = { picks: 0, wins: 0 };
        estrutura[m][map][b].picks++;
        if(parseInt(r.win) === 1) estrutura[m][map][b].wins++;
    });

    // Contagem de Bans por mapa/brawler
    let bansMapa = {};
    dadosBansFiltrados.forEach(r => {
        let map = r.mapa, b = r.brawler_banido;
        if(!map || !b) return;
        b = b.toUpperCase().trim();
        if(!bansMapa[map]) bansMapa[map] = {};
        bansMapa[map][b] = (bansMapa[map][b] || 0) + 1;
    });

    // Quantidade total de jogos e bans por mapa para taxa proporcional
    let totalJogosMapa = {}, totalBansMapa = {};
    dadosFiltrados.forEach(r => {
        if(r.mapa) totalJogosMapa[r.mapa] = (totalJogosMapa[r.mapa] || 0) + 1;
    });
    dadosBansFiltrados.forEach(r => {
        if(r.mapa) totalBansMapa[r.mapa] = (totalBansMapa[r.mapa] || 0) + 1;
    });

    Object.entries(estrutura).forEach(([modo, mapas]) => {
        let mCard = document.createElement('div');
        mCard.className = "modo-card";
        mCard.innerHTML = `<span>${modo}</span>`;
        mCard.onclick = () => {
            let sec = document.getElementById(`sec-${formatImg(modo)}`);
            if(sec) sec.style.display = sec.style.display === "block" ? "none" : "block";
        };
        container.appendChild(mCard);

        let mSection = document.createElement('div');
        mSection.className = "modo-section";
        mSection.id = `sec-${formatImg(modo)}`;
        
        let gridMapas = document.createElement('div');
        gridMapas.className = "mapa-content";

        Object.entries(mapas).forEach(([mapa, brawlers]) => {
            let box = document.createElement('div');
            box.style.background = "var(--bg-cards)";
            box.style.padding = "15px";
            box.style.borderRadius = "8px";
            box.style.border = "1px solid var(--borda-destaque)";

            let tJM = Math.round((totalJogosMapa[mapa] || 0) / 6);
            let tBM = totalBansMapa[mapa] || 0;
            let bNMap = bansMapa[mapa] || {};

            let valid = Object.entries(brawlers);
            
            // AplicaÃ§Ã£o dinÃ¢mica da ordenaÃ§Ã£o com filtros interativos
            valid.sort((xA, xB) => {
                let bA = xA[0], sA = xA[1];
                let bB = xB[0], sB = xB[1];
                let bcA = bNMap[bA] || 0, brPctA = tBM ? (bcA / tJM) : 0;
                let bcB = bNMap[bB] || 0, brPctB = tBM ? (bcB / tJM) : 0;
                let wrA = sA.picks > 0 ? (sA.wins / sA.picks) : 0;
                let wrB = sB.picks > 0 ? (sB.wins / sB.picks) : 0;
                let prA = tJM ? (sA.picks / (tJM * 6)) : 0;
                let prB = tJM ? (sB.picks / (tJM * 6)) : 0;

                let valA, valB;
                switch(window.colunaOrdenacaoMeta) {
                    case 'alfabetica': valA = bA; valB = bB; break;
                    case 'pick': valA = sA.picks; valB = sB.picks; break;
                    case 'pr%': valA = prA; valB = prB; break;
                    case 'win': valA = sA.wins; valB = sB.wins; break;
                    case 'wr%': valA = wrA; valB = wrB; break;
                    case 'b': valA = bcA; valB = bcB; break;
                    case 'br%': valA = brPctA; valB = brPctB; break;
                    default: valA = sA.picks; valB = sB.picks;
                }

                if(window.colunaOrdenacaoMeta === 'alfabetica') {
                    return window.direcaoOrdenacaoMeta === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
                } else {
                    return window.direcaoOrdenacaoMeta === 'asc' ? valA - valB : valB - valA;
                }
            });

            let tHtml = `
                <h3 style="margin-bottom:10px; color:var(--accent-purple); font-size:15px; text-transform:uppercase;">${mapa} <span style="font-size:11px; color:var(--texto-secundario);">(${tJM} jogos)</span></h3>
                <table class="excel-table">
                    <thead>
                        <tr>
                            <th onclick="ordenarMeta('alfabetica')">BRAWLER</th>
                            <th onclick="ordenarMeta('pick')">P</th>
                            <th onclick="ordenarMeta('pr%')">PR%</th>
                            <th onclick="ordenarMeta('win')">W</th>
                            <th onclick="ordenarMeta('wr%')">WR%</th>
                            <th onclick="ordenarMeta('b')">B</th>
                            <th onclick="ordenarMeta('br%')">BR%</th>
                        </tr>
                    </thead>
                    <tbody>
            `;

            valid.forEach(([bname, s]) => {
                let bc = bNMap[bname] || 0;
                let wr = s.picks > 0 ? ((s.wins / s.picks) * 100).toFixed(0) + '%' : '0%';
                let prPct = tJM ? ((s.picks / (tJM * 6)) * 100).toFixed(0) + '%' : '0%';
                let brPct = tJM ? ((bc / tJM) * 100).toFixed(0) + '%' : '0%';

                tHtml += `
                    <tr>
                        <td style="text-align:left; font-weight:bold; display:flex; align-items:center; gap:5px;">
                            <img src="brawlers/${formatImg(bname)}.png" style="width:18px; height:18px; border-radius:3px;" onerror="this.src='brawlers/default.png'">
                            ${bname}
                        </td>
                        <td>${s.picks}</td>
                        <td>${prPct}</td>
                        <td>${s.wins}</td>
                        <td class="winrate-cell">${wr}</td>
                        <td>${bc}</td>
                        <td style="color:var(--loss-color); font-weight:bold;">${brPct}</td>
                    </tr>
                `;
            });

            tHtml += `</tbody></table>`;
            box.innerHTML = tHtml;
            gridMapas.appendChild(box);
        });

        mSection.appendChild(gridMapas);
        container.appendChild(mSection);
    });
}

// ========================================================
// 5. SISTEMA DA TELA BRAWLERS
// ========================================================
function renderizarSidebarBrawlers() {
    const listDiv = document.getElementById('lista-brawlers-sidebar');
    if(!listDiv) return;
    listDiv.innerHTML = "";
    listaBrawlers.forEach(b => {
        let item = document.createElement('div');
        item.className = "sidebar-item";
        if(brawlerSelecionado === b) item.classList.add('active');
        item.innerHTML = `
            <img src="brawlers/${formatImg(b)}.png" style="width:24px; height:24px; border-radius:4px;" onerror="this.src='brawlers/default.png'">
            <span style="font-weight:bold; font-size:13px;">${b}</span>
        `;
        item.onclick = () => {
            brawlerSelecionado = b;
            renderizarSidebarBrawlers();
            renderizarDetalhesBrawler(b);
        };
        listDiv.appendChild(item);
    });
}

function filtrarBrawlersSidebar() {
    let q = document.getElementById('search-brawler-sidebar').value.toUpperCase();
    document.querySelectorAll('#lista-brawlers-sidebar .sidebar-item').forEach(item => {
        let name = item.textContent.toUpperCase();
        item.style.display = name.includes(q) ? "flex" : "none";
    });
}

function renderizarDetalhesBrawler(bname) {
    const panel = document.getElementById('painel-info-brawler');
    if(!panel) return;

    let bData = dadosFiltrados.filter(r => r.pick && r.pick.toUpperCase().trim() === bname);
    let totalPicks = bData.length;
    let wins = bData.filter(r => parseInt(r.win) === 1).length;
    let wr = totalPicks > 0 ? ((wins / totalPicks) * 100).toFixed(1) + '%' : '0%';

    let syng = {}, cntr = {};
    let matchesGrd = {};
    dadosFiltrados.forEach(r => {
        let key = r.id_partida + '_' + r.id_time;
        if(!matchesGrd[key]) matchesGrd[key] = { brawlers: [], win: parseInt(r.win) };
        if(r.pick) matchesGrd[key].brawlers.push(r.pick.toUpperCase().trim());
    });

    Object.values(matchesGrd).forEach(m => {
        if(m.brawlers.includes(bname)) {
            m.brawlers.forEach(partner => {
                if(partner !== bname) {
                    if(!syng[partner]) syng[partner] = { picks: 0, wins: 0 };
                    syng[partner].picks++;
                    if(m.win === 1) syng[partner].wins++;
                }
            });
        }
    });

    let sArr = Object.entries(syng).sort((a,b) => b[1].picks - a[1].picks).slice(0,5);

    panel.innerHTML = `
        <div class="brawler-profile-header">
            <img class="brawler-large-avatar" src="brawlers/${formatImg(bname)}.png" onerror="this.src='brawlers/default.png'">
            <div>
                <h2 style="font-size:24px; font-weight:900;">${bname}</h2>
                <p style="color:var(--texto-secundario); font-weight:bold; font-size:14px; margin-top:4px;">
                    Picks Globais: <span style="color:#fff;">${totalPicks}</span> | Win Rate: <span class="winrate-cell">${wr}</span>
                </p>
            </div>
        </div>
        <div class="synergy-grid">
            <div class="synergy-box">
                <h3 style="color:var(--synergy-color); font-size:14px; text-transform:uppercase; margin-bottom:10px; border-bottom:1px solid var(--borda-suave); padding-bottom:5px;">Principais Sinergias</h3>
                ${sArr.map(([name, s]) => `
                    <div class="synergy-item">
                        <span style="font-weight:bold;"><img src="brawlers/${formatImg(name)}.png" onerror="this.src='brawlers/default.png'">${name}</span>
                        <span style="font-size:12px; color:var(--texto-secundario); font-weight:bold;">${s.picks} jogos (${((s.wins/s.picks)*100).toFixed(0)}% WR)</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// ========================================================
// 6. NOVA TELA DE MODOS (PICKS, SINERGIAS E TRIOS/COMPS)
// ========================================================
function renderizarModos() {
    const container = document.getElementById('conteudo-modos');
    if(!container) return;
    container.innerHTML = `<h2 style="color:var(--accent-purple); margin-bottom:20px; font-size:22px; font-weight:900;">ANÃLISE ESTRUTURAL DE MODOS E MAPAS</h2>`;

    let mapaModoAgrupado = {};
    dadosFiltrados.forEach(r => {
        let m = r.modo, map = r.mapa;
        if(!m || !map) return;
        if(!mapaModoAgrupado[m]) mapaModoAgrupado[m] = {};
        if(!mapaModoAgrupado[m][map]) mapaModoAgrupado[m][map] = [];
        mapaModoAgrupado[m][map].push(r);
    });

    Object.entries(mapaModoAgrupado).forEach(([modo, mapas]) => {
        let modeSec = document.createElement('div');
        modeSec.style.marginBottom = "35px";
        modeSec.innerHTML = `<h3 class="modo-card" style="cursor:default; background:var(--bg-paineis); text-align:left; justify-content:flex-start; padding-left:20px;">${modo}</h3>`;
        
        let grid = document.createElement('div');
        grid.className = "mapa-content";

        Object.entries(mapas).forEach(([mapa, linhas]) => {
            let brawlersCount = {}, winsCount = {};
            let partidasTimes = {};

            linhas.forEach(r => {
                let b = (r.pick || '').toUpperCase().trim();
                if(!b) return;
                brawlersCount[b] = (brawlersCount[b] || 0) + 1;
                if(parseInt(r.win) === 1) winsCount[b] = (winsCount[b] || 0) + 1;

                let pKey = r.id_partida + '_' + r.id_time;
                if(!partidasTimes[pKey]) partidasTimes[pKey] = [];
                partidasTimes[pKey].push(b);
            });

            let picksOrdenados = Object.entries(brawlersCount).sort((a,b) => b[1] - a[1]);
            let principaisPicks = picksOrdenados.slice(0, 4);

            let sinergiasValidas = [];
            picksOrdenados.slice(0, 10).forEach(([bname, pCount]) => {
                let w = winsCount[bname] || 0;
                let wrPct = pCount > 0 ? (w / pCount) : 0;
                if(pCount >= 2) {
                    sinergiasValidas.push({ bname, pCount, wrPct });
                }
            });
            sinergiasValidas.sort((a,b) => b.wrPct - a.wrPct);
            let principaisSinergias = sinergiasValidas.slice(0, 3);

            let compsCount = {};
            Object.values(partidasTimes).forEach(arr => {
                if(arr.length === 3) {
                    let cStr = [...arr].sort().join(' + ');
                    compsCount[cStr] = (compsCount[cStr] || 0) + 1;
                }
            });
            let compMaisEscolhida = Object.entries(compsCount).sort((a,b) => b[1] - a[1])[0];

            let box = document.createElement('div');
            box.style.background = "var(--bg-cards)";
            box.style.border = "1px solid var(--borda-destaque)";
            box.style.borderRadius = "10px";
            box.style.padding = "20px";

            let html = `
                <h4 style="color:#fff; font-size:16px; border-bottom:1px solid var(--borda-destaque); padding-bottom:8px; margin-bottom:15px; text-transform:uppercase; font-weight:800;">${mapa}</h4>
                
                <h5 style="color:var(--accent-purple); font-size:12px; margin-bottom:8px; text-transform:uppercase;">Principais Picks:</h5>
                <div style="display:flex; gap:8px; margin-bottom:15px;">
                    ${principaisPicks.map(([b]) => `
                        <div style="text-align:center; flex:1; background:var(--bg-paineis); padding:5px; border-radius:6px; border:1px solid var(--borda-suave);">
                            <img src="brawlers/${formatImg(b)}.png" style="width:32px; height:32px; border-radius:4px;" onerror="this.src='brawlers/default.png'">
                            <div style="font-size:10px; font-weight:bold; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; color:var(--texto-secundario);">${b}</div>
                        </div>
                    `).join('')}
                </div>

                <h5 style="color:var(--synergy-color); font-size:12px; margin-bottom:8px; text-transform:uppercase;">Melhores Taxas (Sinergias/WR):</h5>
                <div style="display:flex; flex-direction:column; gap:5px; margin-bottom:15px;">
                    ${principaisSinergias.map(s => `
                        <div style="display:flex; justify-content:between; font-size:12px; background:var(--bg-paineis); padding:6px; border-radius:5px;">
                            <span style="font-weight:bold;">${s.bname}</span>
                            <span class="winrate-cell">${(s.wrPct*100).toFixed(0)}% WR</span>
                        </div>
                    `).join('')}
                </div>

                <h5 style="color:var(--winrate-color); font-size:12px; margin-bottom:6px; text-transform:uppercase;">Comp Mais Utilizada (Trio):</h5>
                <div style="background:var(--bg-paineis); padding:10px; border-radius:6px; border:1px solid var(--borda-suave); font-size:11px; font-weight:bold; text-align:center; color:#fff;">
                    ${compMaisEscolhida ? `<span style="color:var(--accent-hover);">${compMaisEscolhida[0]}</span> <br> <span style="font-size:10px; color:var(--texto-secundario);">(${compMaisEscolhida[1]} picks)</span>` : `<span style="color:var(--texto-secundario);">Amostragem insuficiente</span>`}
                </div>
            `;
            box.innerHTML = html;
            grid.appendChild(box);
        });

        modeSec.appendChild(grid);
        container.appendChild(modeSec);
    });
}

// ========================================================
// 7. SISTEMA DA TELA TIMES (COM GRÃFICOS PERSONALIZADOS)
// ========================================================
function renderizarSidebarTimes() {
    const listDiv = document.getElementById('lista-times-sidebar');
    if(!listDiv) return;
    listDiv.innerHTML = "";

    let roster = obterConfigRosterAtual();
    Object.entries(roster).forEach(([tier, times]) => {
        let header = document.createElement('div');
        header.style.padding = "6px 12px";
        header.style.fontSize = "11px";
        header.style.color = "var(--accent-purple)";
        header.style.fontWeight = "900";
        header.style.background = "var(--bg-paineis)";
        listDiv.appendChild(header);

        times.forEach(t => {
            let item = document.createElement('div');
            item.className = "sidebar-item";
            if(timeSelecionado && timeSelecionado.id_time === t.id_time) item.classList.add('active');
            item.innerHTML = `
                <img src="element/teams/${formatImg(t.id_time)}.png" style="width:24px; height:24px; object-fit:contain;" onerror="this.src='element/teams/default.png'">
                <span style="font-weight:bold; font-size:13px;">${t.nome_time}</span>
            `;
            item.onclick = () => {
                timeSelecionado = t;
                renderizarSidebarTimes();
                renderizarDetalhesTime(t);
            };
            listDiv.appendChild(item);
        });
    });
}

function renderizarDetalhesTime(timeObj) {
    const panel = document.getElementById('painel-info-time');
    if(!panel) return;

    let tData = dadosFiltrados.filter(r => r.id_time && r.id_time.toUpperCase().trim() === timeObj.id_time.toUpperCase().trim());
    
    // Agrupamento de partidas Ãºnicas para os grÃ¡ficos e comps do time
    let partidasUnicas = {};
    tData.forEach(r => {
        if(!partidasUnicas[r.id_partida]) {
            partidasUnicas[r.id_partida] = { modo: r.modo, mapa: r.mapa, win: parseInt(r.win), data: r.data_adicao, brawlers: [] };
        }
        if(r.pick) partidasUnicas[r.id_partida].brawlers.push(r.pick.toUpperCase().trim());
    });
    let listPartidas = Object.values(partidasUnicas);

    // 1. CÃ¡lculos do GrÃ¡fico de Linhas (VitÃ³rias x Derrotas acumuladas cronologicamente)
    listPartidas.sort((a,b) => parseDateBR(a.data) - parseDateBR(b.data));

    // 2. CÃ¡lculos do GrÃ¡fico de Barras Sobrepostas por Modo
    let statsModos = {};
    listPartidas.forEach(p => {
        let m = p.modo || "Outros";
        if(!statsModos[m]) statsModos[m] = { wins: 0, losses: 0, total: 0 };
        statsModos[m].total++;
        if(p.win === 1) statsModos[m].wins++;
        else statsModos[m].losses++;
    });
    let maxTotalPartidasModo = Math.max(...Object.values(statsModos).map(x => x.total), 1);

    // 3. CÃ¡lculo das Melhores Comps por Modo do Time
    let compsPorModo = {};
    listPartidas.forEach(p => {
        if(p.brawlers.length === 3) {
            let cStr = [...p.brawlers].sort().join(' + ');
            if(!compsPorModo[p.modo]) compsPorModo[p.modo] = {};
            if(!compsPorModo[p.modo][cStr]) compsPorModo[p.modo][cStr] = { picks: 0, wins: 0 };
            compsPorModo[p.modo][cStr].picks++;
            if(p.win === 1) compsPorModo[p.modo][cStr].wins++;
        }
    });

    let html = `
        <div class="brawler-profile-header">
            <img class="brawler-large-avatar" src="element/teams/${formatImg(timeObj.id_time)}.png" style="object-fit:contain;" onerror="this.src='element/teams/default.png'">
            <div>
                <h2 style="font-size:24px; font-weight:900;">${timeObj.nome_time}</h2>
                <p style="color:var(--texto-secundario); font-size:13px; font-weight:bold; margin-top:4px;">Elenco Registrado no MÃªs</p>
            </div>
        </div>

        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap:15px; margin-bottom:25px;">
            ${timeObj.jogadores.map(j => `
                <div style="background:var(--bg-cards); border:1px solid var(--borda-suave); padding:12px; border-radius:8px; text-align:center;">
                    <div style="font-weight:bold; font-size:15px; color:var(--accent-purple); cursor:pointer; text-decoration:underline;" onclick="abrirModalJogador('${j.tag}')">${j.nick || 'Vago'}</div>
                    <div style="font-size:11px; color:var(--texto-secundario); margin-top:3px;">${j.tag || '#'}</div>
                </div>
            `).join('')}
        </div>

        <div id="graficos-time-container">
            <div>
                <h4 style="font-size:13px; color:var(--texto-secundario); text-transform:uppercase; margin-bottom:10px; font-weight:800;">HistÃ³rico de Desempenho (EvoluÃ§Ã£o de Partidas)</h4>
                <canvas id="canvas-linhas-time" width="600" height="180" style="background:var(--bg-paineis); border-radius:6px; border:1px solid var(--borda-suave);"></canvas>
            </div>

            <div>
                <h4 style="font-size:13px; color:var(--texto-secundario); text-transform:uppercase; margin-bottom:15px; font-weight:800;">VitÃ³rias por Modo (Barras Sobrepostas: <span style="color:#00ff66;">Verde=V</span>, <span style="color:#ff3333;">Vermelho=D</span>, <span style="color:#00ccff;">Azul=Total</span>)</h4>
                <div style="display:flex; flex-direction:column; gap:12px;">
                    ${Object.entries(statsModos).map(([modo, s]) => {
                        let pctTotal = (s.total / maxTotalPartidasModo) * 100;
                        let pctWins = (s.wins / maxTotalPartidasModo) * 100;
                        let pctLosses = (s.losses / maxTotalPartidasModo) * 100;
                        return `
                            <div style="display:flex; align-items:center; gap:15px;">
                                <div style="width:32px; display:flex; justify-content:center;">
                                    <img src="element/modes/${formatImg(modo)}.png" style="width:26px; height:26px; object-fit:contain;" onerror="this.src='element/modes/default.png'">
                                </div>
                                <div style="flex:1; position:relative; height:22px; background:rgba(255,255,255,0.02); border-radius:4px; overflow:hidden; border:1px solid var(--borda-suave);">
                                    <!-- Azul (Quantidade total) - Fundo inferior -->
                                    <div style="position:absolute; left:0; top:0; height:100%; width:${pctTotal}%; background:#00ccff; opacity:0.3; border-radius:3px;"></div>
                                    <!-- Vermelho (Derrotas) - Camada IntermediÃ¡ria -->
                                    <div style="position:absolute; left:0; top:0; height:100%; width:${pctLosses}%; background:#ff3333; opacity:0.6; border-radius:3px;"></div>
                                    <!-- Verde (VitÃ³rias) - Camada Superior PrimÃ¡ria -->
                                    <div style="position:absolute; left:0; top:0; height:100%; width:${pctWins}%; background:#00ff66; border-radius:3px;"></div>
                                    
                                    <span style="position:absolute; right:8px; top:3px; font-size:11px; font-weight:900; color:#fff; text-shadow:1px 1px 2px #000;">
                                        V:${s.wins} D:${s.losses} T:${s.total}
                                    </span>
                                </div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
        </div>

        <div style="margin-top:30px;">
            <h4 style="font-size:14px; color:var(--accent-purple); text-transform:uppercase; margin-bottom:15px; font-weight:800; border-top:1px solid var(--borda-suave); padding-top:20px;">Melhores e Principais Comps por Modo</h4>
            <div style="display:flex; flex-direction:column; gap:15px;">
                ${Object.entries(compsPorModo).map(([modo, comps]) => {
                    let melhorComp = Object.entries(comps).sort((a,b) => b[1].wins - a[1].wins)[0];
                    return `
                        <div style="background:var(--bg-cards); border:1px solid var(--borda-suave); padding:12px; border-radius:8px; display:flex; justify-content:space-between; align-items:center;">
                            <div style="display:flex; align-items:center; gap:10px;">
                                <img src="element/modes/${formatImg(modo)}.png" style="width:20px; height:20px; object-fit:contain;" onerror="this.src='element/modes/default.png'">
                                <span style="font-weight:800; font-size:13px; text-transform:uppercase; color:var(--texto-secundario);">${modo}:</span>
                                <span style="font-weight:bold; font-size:13px; color:var(--accent-hover);">${melhorComp ? melhorComp[0] : 'Nenhuma comp registrada'}</span>
                            </div>
                            <div style="font-size:12px; font-weight:bold;">
                                ${melhorComp ? `<span class="winrate-cell">${melhorComp[1].wins} VitÃ³rias</span> / ${melhorComp[1].picks} Jogos` : ''}
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
    `;

    panel.innerHTML = html;

    // RenderizaÃ§Ã£o nativa do GrÃ¡fico de Linhas do Time via HTML5 Canvas API
    setTimeout(() => {
        let canvas = document.getElementById('canvas-linhas-time');
        if(!canvas) return;
        let ctx = canvas.getContext('2d');
        ctx.clearRect(0,0, canvas.width, canvas.height);

        let vAcumuladas = [], dAcumuladas = [];
        let vCont = 0, dCont = 0;
        listPartidas.forEach(p => {
            if(p.win === 1) vCont++; else dCont++;
            vAcumuladas.push(vCont);
            dAcumuladas.push(dCont);
        });

        let totalPontos = listPartidas.length;
        let maxValor = Math.max(vCont, dCont, 5);
        let pad = 20;

        // Eixos
        ctx.strokeStyle = "var(--borda-destaque)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(pad, pad);
        ctx.lineTo(pad, canvas.height - pad);
        ctx.lineTo(canvas.width - pad, canvas.height - pad);
        ctx.stroke();

        const obterX = (idx) => pad + (idx / (totalPontos - 1 || 1)) * (canvas.width - 2 * pad);
        const obterY = (val) => canvas.height - pad - (val / maxValor) * (canvas.height - 2 * pad);

        // Linha Verde de VitÃ³rias
        if(totalPontos > 0) {
            ctx.strokeStyle = "#00ff66";
            ctx.lineWidth = 3;
            ctx.beginPath();
            vAcumuladas.forEach((val, i) => {
                if(i === 0) ctx.moveTo(obterX(i), obterY(val));
                else ctx.lineTo(obterX(i), obterY(val));
            });
            ctx.stroke();

            // Linha Vermelha de Derrotas
            ctx.strokeStyle = "#ff3333";
            ctx.lineWidth = 3;
            ctx.beginPath();
            dAcumuladas.forEach((val, i) => {
                if(i === 0) ctx.moveTo(obterX(i), obterY(val));
                else ctx.lineTo(obterX(i), obterY(val));
            });
            ctx.stroke();
        }
    }, 50);
}

// ========================================================
// 8. CONTROLE DE VIEW / MODAL INTEGRADO DE PERFIL DO JOGADOR
// ========================================================
window.abrirModalJogador = function(tag) {
    if(!tag || tag === "#") return;
    let cleanTag = tag.toUpperCase().trim();
    let pRows = dadosBrutos.filter(r => r.player_tag && r.player_tag.toUpperCase().trim() === cleanTag);
    
    if(pRows.length === 0) {
        alert("Nenhum dado historiado encontrado para a ID informada.");
        return;
    }

    // IdentificaÃ§Ã£o de equipe baseada na data de inserÃ§Ã£o mais recente
    let ordenadoPorData = [...pRows].sort((a,b) => parseDateBR(b.data_adicao) - parseDateBR(a.data_adicao));
    let registroMaisRecente = ordenadoPorData[0];
    let nick = obterNickPlayer(cleanTag);
    let equipeMaisRecente = `${registroMaisRecente.nome_time} (${registroMaisRecente.id_time})`;

    // Processamento agregado de estatÃ­sticas exclusivas do jogador (MÃ³dulo TIMES)
    let totalPartidas = pRows.length;
    let vCont = pRows.filter(r => parseInt(r.win) === 1).length;
    let wr = totalPartidas > 0 ? ((vCont / totalPartidas) * 100).toFixed(1) + '%' : '0%';

    let contagemBrawlers = {};
    pRows.forEach(r => {
        if(r.pick) {
            let b = r.pick.toUpperCase().trim();
            contagemBrawlers[b] = (contagemBrawlers[b] || 0) + 1;
        }
    });
    let topBrawlers = Object.entries(contagemBrawlers).sort((a,b) => b[1] - a[1]).slice(0, 4);

    const mContent = document.getElementById('conteudo-modal-jogador');
    mContent.innerHTML = `
        <h2 style="color:var(--accent-purple); border-bottom:2px solid var(--borda-destaque); padding-bottom:10px; margin-bottom:20px; font-weight:900; font-size:22px; text-transform:uppercase;">PERFIL DE ATLETA</h2>
        <div style="display:flex; flex-direction:column; gap:10px; margin-bottom:25px; font-size:15px;">
            <div><strong>Nick Cadastrado:</strong> <span style="color:var(--accent-hover); font-weight:800;">${nick}</span></div>
            <div><strong>ID (Player Tag):</strong> <span style="color:var(--texto-secundario); font-family:monospace; font-weight:bold;">${cleanTag}</span></div>
            <div><strong>Equipe Ativa (Mais Recente):</strong> <span style="font-weight:bold; color:#fff;">${equipeMaisRecente}</span></div>
        </div>

        <h3 style="font-size:12px; color:var(--texto-secundario); text-transform:uppercase; margin-bottom:12px; font-weight:800; border-top:1px solid var(--borda-suave); padding-top:15px;">MÃ©tricas Globais Armazenadas (TIMES)</h3>
        <div style="font-size:14px; margin-bottom:20px; font-weight:bold;">
            Total de Partidas Gravadas: <span style="color:#fff;">${totalPartidas}</span> | Taxa de VitÃ³ria Geral: <span class="winrate-cell">${wr}</span>
        </div>

        <h4 style="font-size:11px; color:var(--accent-purple); text-transform:uppercase; margin-bottom:10px; font-weight:800;">Top Brawlers de PreferÃªncia:</h4>
        <div style="display:flex; flex-direction:column; gap:8px;">
            ${topBrawlers.map(([b, count]) => `
                <div style="display:flex; justify-content:between; align-items:center; background:var(--bg-cards); padding:8px 15px; border-radius:6px; border:1px solid var(--borda-suave);">
                    <div style="display:flex; align-items:center; gap:8px; font-weight:bold;">
                        <img src="brawlers/${formatImg(b)}.png" style="width:24px; height:24px; border-radius:4px;" onerror="this.src='brawlers/default.png'">
                        <span>${b}</span>
                    </div>
                    <span style="color:var(--texto-secundario); font-size:12px; font-weight:bold;">${count} picks</span>
                </div>
            `).join('')}
        </div>
    `;

    document.getElementById('modal-jogador').style.display = "block";
};

window.fecharModalJogador = function() {
    document.getElementById('modal-jogador').style.display = "none";
};

// ========================================================
// 9. SISTEMA DA TELA SCRIMS (GRID HORIZONTAL INTEGRADO)
// ========================================================
function processarScrims() {
    let partidasMap = {};
    dadosFiltrados.forEach(r => {
        if(!r.id_partida) return;
        if(!partidasMap[r.id_partida]) {
            partidasMap[r.id_partida] = {
                id_partida: r.id_partida,
                modo: r.modo,
                mapa: r.mapa,
                data_adicao: r.data_adicao,
                times: {}
            };
        }
        let pId = r.id_time || "Desconhecido";
        if(!partidasMap[r.id_partida].times[pId]) {
            partidasMap[r.id_partida].times[pId] = {
                id_time: pId,
                nome_time: r.nome_time || pId,
                win: parseInt(r.win) === 1,
                jogadores: []
            };
        }
        partidasMap[r.id_partida].times[pId].jogadores.push({
            tag: r.player_tag,
            pick: r.pick
        });
    });

    const listGrid = document.getElementById('scrims-lista');
    if(!listGrid) return;
    listGrid.innerHTML = "";

    Object.values(partidasMap).forEach(scrim => {
        let tKeys = Object.keys(scrim.times);
        if(tKeys.length < 2) return; // Filtro de integridade estrutural (mÃ­nimo de 2 elencos contrapostos)

        let t1 = scrim.times[tKeys[0]];
        let t2 = scrim.times[tKeys[1]];

        let card = document.createElement('div');
        card.className = "scrim-card";
        card.innerHTML = `
            <div style="display:flex; justify-content:space-between; font-size:11px; color:var(--texto-secundario); font-weight:bold; border-bottom:1px solid var(--borda-suave); padding-bottom:6px; margin-bottom:10px;">
                <span>${scrim.modo.toUpperCase()} - ${scrim.mapa.toUpperCase()}</span>
                <span>${scrim.data_adicao}</span>
            </div>
            <div class="scrim-picks-container">
                <!-- Time 1 (Lado Esquerdo) -->
                <div class="team-picks-scrim">
                    <div style="display:flex; align-items:center; gap:5px; font-weight:800; font-size:13px; max-width:180px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                        <img src="element/teams/${formatImg(t1.id_time)}.png" style="width:16px; height:16px; object-fit:contain;" onerror="this.src='element/teams/default.png'">
                        <span style="color:${t1.win ? 'var(--winrate-color)' : 'var(--loss-color)'}">${t1.nome_time}</span>
                    </div>
                    <div style="display:flex; gap:10px; margin-top:5px;">
                        ${t1.jogadores.map(j => `
                            <div class="pick-row-vertical">
                                <img src="brawlers/${formatImg(j.pick)}.png" onerror="this.src='brawlers/default.png'">
                                <span class="player-name-link" onclick="abrirModalJogador('${j.tag}')">${obterNickPlayer(j.tag)}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Imagem Ampliada Central do Mapa -->
                <div class="map-middle-scrim">
                    <img src="maps/${formatImg(scrim.mapa)}.png" onerror="this.src='maps/default.png'">
                </div>

                <!-- Time 2 (Lado Direito) -->
                <div class="team-picks-scrim">
                    <div style="display:flex; align-items:center; gap:5px; font-weight:800; font-size:13px; max-width:180px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                        <img src="element/teams/${formatImg(t2.id_time)}.png" style="width:16px; height:16px; object-fit:contain;" onerror="this.src='element/teams/default.png'">
                        <span style="color:${t2.win ? 'var(--winrate-color)' : 'var(--loss-color)'}">${t2.nome_time}</span>
                    </div>
                    <div style="display:flex; gap:10px; margin-top:5px;">
                        ${t2.jogadores.map(j => `
                            <div class="pick-row-vertical">
                                <img src="brawlers/${formatImg(j.pick)}.png" onerror="this.src='brawlers/default.png'">
                                <span class="player-name-link" onclick="abrirModalJogador('${j.tag}')">${obterNickPlayer(j.tag)}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
        listGrid.appendChild(card);
    });
}
