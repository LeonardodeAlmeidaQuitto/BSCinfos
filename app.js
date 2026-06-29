let dadosBrutos = [];
let dadosFiltrados = [];
let dadosBans = [];
let dadosBansFiltrados = [];
let listaBrawlers = [];
let brawlerSelecionado = null;
let timeSelecionado = null;

const _REGIAO = window.REGIAO_ATUAL ? window.REGIAO_ATUAL.toUpperCase() : "SA";

// ========================================================
// 1. CONFIGURAÇÃO DE ROTAÇÃO DE MAPAS (NOVO)
// ========================================================
const ROTACAO_MAPAS = {
    "2026": {
        "06": { // Exemplo de mês 06
            "Brawl Ball": ["Pinhole Punt", "Sneaky Fields", "Triple Dribble"], 
            "Gem Grab": ["Hard Rock Mine", "Crystal Arcade", "Gem Fort"],
            "Hot Zone": ["Dueling Beetles", "Open Business", "Ring of Fire"],
            "Heist": ["Safe Zone", "Kaboom Canyon", "Pit Stop"],
            "Bounty": ["Hideout", "Shooting Star", "Layer Cake"],
            "Knockout": ["Goldarm Gulch", "Out in the Open", "New Horizons"],
        }
    }
};

// ========================================================
// 2. CONFIGURAÇÃO MENSAL DE ROSTERS E TIMES (NOVO)
// ========================================================
const ROSTERS_POR_DATA = {
    "2026": {
        "06": { // Exemplo para JUNHO
           "SA": {
        "TIER S": [
            { id_time: "BH", nome_time: "Bounty Hunters", jogadores: [ { nick: "Wesley", tag: "#PLLRJC2V" }, { nick: "Prozy", tag: "#GYCYCLRJL" }, { nick: "Portox", tag: "#YGQYGCR" } ] },
            { id_time: "PIZZA", nome_time: "Pizza Congelado F/A", jogadores: [ { nick: "Jubileubr", tag: "#GVYLVUGR" }, { nick: "CAUEBR", tag: "#JQ8L0YYL" }, { nick: "Mohtep", tag: "#R2LR2QLG" } ] }
        ],
        "TIER A": [
            { id_time: "LOUD", nome_time: "LOUD", jogadores: [ { nick: "KaioDog", tag: "#GGUQCG0G" }, { nick: "FireCrow", tag: "#JQ8LLLY" }, { nick: "Edinho", tag: "#QJULVGU" } ] },
            { id_time: "OS", nome_time: "Olimpo SQUAD", jogadores: [ { nick: "Golden", tag: "#9QCJPL20" }, { nick: "Brabao", tag: "#L9PQUV0YC" }, { nick: "Pekka", tag: "#JVRCVJ9Q" } ] },
            { id_time: "GLXY", nome_time: "GALAXY", jogadores: [ { nick: "Doritos🐉", tag: "#202GJJR28" }, { nick: "Derpp🐰ᩚ", tag: "#2QG9LQQC8Y" }, { nick: "IceCrow", tag: "#9CPYUCGQC" } ] },
            { id_time: "SKC", nome_time: "SKCalalas SA", jogadores: [ { nick: "Kr ;)", tag: "#PR0P8QVQ" }, { nick: "Rhz", tag: "#89PVJG9R0" }, { nick: "Juan Carlos", tag: "#PR9U2JL" } ] },
            { id_time: "ENO", nome_time: "ENOSIS", jogadores: [ { nick: "Magic🎩", tag: "#2QCCC29QV" }, { nick: "REI DO FUT", tag: "#RVL0RPR9" }, { nick: "Fantas🌖", tag: "#PU20LUCQG" } ] },
            { id_time: "OCX", nome_time: "OCX DIVISION", jogadores: [ { nick: "Tufa", tag: "#CQLR0Y80" }, { nick: "Rdz", tag: "#2JGP0LYV2Q" }, { nick: "Sennin", tag: "#CUGVUYPG" } ] },
            { id_time: "AL", nome_time: "ACRE LOVERS", jogadores: [ { nick: "FireMirillo", tag: "#2GV09VJJP" }, { nick: "Satisfiyer", tag: "#PLJ8VQY2C" }, { nick: "Star Lipi", tag: "#2UQCCG92VG" } ] }
        ],
        "TIER B": [
            { id_time: "CB", nome_time: "CRECHE BRAWL", jogadores: [ { nick: "Tilo", tag: "#80VLPJCCC" }, { nick: "Bielz", tag: "#9Q22C88V8" }, { nick: "Yichy", tag: "#2LVGCJ2UQR" } ] },
            { id_time: "ZRT", nome_time: "ZURITA GANG", jogadores: [ { nick: "Jxcccr", tag: "#820JCJJG" }, { nick: "Exic", tag: "#RCYQUJU0" }, { nick: "", tag: "#" } ] },
            { id_time: "OCXA", nome_time: "OCX DIVISION ACADEMY", jogadores: [ { nick: "Sterixx", tag: "#2P8RVJVUY" }, { nick: "", tag: "#" }, { nick: "", tag: "#" } ] },
            { id_time: "LVL", nome_time: "LEVEL ESPORTS", jogadores: [ { nick: "Deykonn", tag: "#GJPVYUQG" }, { nick: "B4st", tag: "#2CJ0RCJ" }, { nick: "Todd", tag: "#22PGQU98R" } ] }
        ],
        "TIER B-/C+": [
            { id_time: "HAWK", nome_time: "RED HAWK", jogadores: [ { nick: "BeBaxo", tag: "#2YRRL8GG2" }, { nick: "Marcellus", tag: "#9J0R0GQL" }, { nick: "Migz Labubu", tag: "#82P9JCJV8" } ] },
            { id_time: "LVLA", nome_time: "LEVEL ESPORTS ACADEMY", jogadores: [ { nick: "JoeFav", tag: "#VQ8YP9C0" }, { nick: "Levi", tag: "#YQVPY0J9" }, { nick: "xJnn", tag: "#GLQG9CU20" } ] }
        ]
    },
    "NA": {
        "TIER S": [
            { id_time: "BOB", nome_time: "F/A BOBBY", jogadores: [ { nick: "Bobby", tag: "#LVRRYPV" }, { nick: "Patch", tag: "#RLLRJ2" }, { nick: "Sans", tag: "#QUYCVC2" } ] },
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
            { id_time: "UTP", nome_time: "UTOPIA", jogadores: [ { nick: "Winq", tag: "#8UL0U08V" }, { nick: "Nerf", tag: "#9YYUPGJ2V" }, { nick: "Juni", tag: "#PL0GRVJRJ" } ] },
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
            { id_time: "FUTA", nome_time: "FUT ACADEMY", jogadores: [ { nick: "ZeyroX", tag: "#82GG2RLQG" }, { nick: "Ferissa", tag: "#2LLRJGPVV8" }, { nick: "DeMaster", tag: "#2GV90L8YP" } ] },
            { id_time: "REV", nome_time: "REVERSO HIVE", jogadores: [ { nick: "Fayelo", tag: "#LLV82LQPU" }, { nick: "Ethan", tag: "#2Y20JR8CQ" }, { nick: "Natrix", tag: "#CJ9YRGGC" } ] },
            { id_time: "TLB", nome_time: "TALENTS LAB", jogadores: [ { nick: "Yei Yei", tag: "#8RVLRVYYP" }, { nick: "Agachi", tag: "#YYUG20PQV" }, { nick: "Stas", tag: "#9LYQR9QC" } ] }
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
};
    // O "PADRAO" será carregado se você selecionar "Todos os meses" ou se não houver um roster cadastrado para o mês específico.
    "PADRAO": {
           "SA": {
        "TIER S": [
            { id_time: "BH", nome_time: "Bounty Hunters", jogadores: [ { nick: "Wesley", tag: "#PLLRJC2V" }, { nick: "Prozy", tag: "#GYCYCLRJL" }, { nick: "Portox", tag: "#YGQYGCR" } ] },
            { id_time: "PIZZA", nome_time: "Pizza Congelado F/A", jogadores: [ { nick: "Jubileubr", tag: "#GVYLVUGR" }, { nick: "CAUEBR", tag: "#JQ8L0YYL" }, { nick: "Mohtep", tag: "#R2LR2QLG" } ] }
        ],
        "TIER A": [
            { id_time: "LOUD", nome_time: "LOUD", jogadores: [ { nick: "KaioDog", tag: "#GGUQCG0G" }, { nick: "FireCrow", tag: "#JQ8LLLY" }, { nick: "Edinho", tag: "#QJULVGU" } ] },
            { id_time: "OS", nome_time: "Olimpo SQUAD", jogadores: [ { nick: "Golden", tag: "#9QCJPL20" }, { nick: "Brabao", tag: "#L9PQUV0YC" }, { nick: "Pekka", tag: "#JVRCVJ9Q" } ] },
            { id_time: "GLXY", nome_time: "GALAXY", jogadores: [ { nick: "Doritos🐉", tag: "#202GJJR28" }, { nick: "Derpp🐰ᩚ", tag: "#2QG9LQQC8Y" }, { nick: "IceCrow", tag: "#9CPYUCGQC" } ] },
            { id_time: "SKC", nome_time: "SKCalalas SA", jogadores: [ { nick: "Kr ;)", tag: "#PR0P8QVQ" }, { nick: "Rhz", tag: "#89PVJG9R0" }, { nick: "Juan Carlos", tag: "#PR9U2JL" } ] },
            { id_time: "ENO", nome_time: "ENOSIS", jogadores: [ { nick: "Magic🎩", tag: "#2QCCC29QV" }, { nick: "REI DO FUT", tag: "#RVL0RPR9" }, { nick: "Fantas🌖", tag: "#PU20LUCQG" } ] },
            { id_time: "OCX", nome_time: "OCX DIVISION", jogadores: [ { nick: "Tufa", tag: "#CQLR0Y80" }, { nick: "Rdz", tag: "#2JGP0LYV2Q" }, { nick: "Sennin", tag: "#CUGVUYPG" } ] },
            { id_time: "AL", nome_time: "ACRE LOVERS", jogadores: [ { nick: "FireMirillo", tag: "#2GV09VJJP" }, { nick: "Satisfiyer", tag: "#PLJ8VQY2C" }, { nick: "Star Lipi", tag: "#2UQCCG92VG" } ] }
        ],
        "TIER B": [
            { id_time: "CB", nome_time: "CRECHE BRAWL", jogadores: [ { nick: "Tilo", tag: "#80VLPJCCC" }, { nick: "Bielz", tag: "#9Q22C88V8" }, { nick: "Yichy", tag: "#2LVGCJ2UQR" } ] },
            { id_time: "ZRT", nome_time: "ZURITA GANG", jogadores: [ { nick: "Jxcccr", tag: "#820JCJJG" }, { nick: "Exic", tag: "#RCYQUJU0" }, { nick: "", tag: "#" } ] },
            { id_time: "OCXA", nome_time: "OCX DIVISION ACADEMY", jogadores: [ { nick: "Sterixx", tag: "#2P8RVJVUY" }, { nick: "", tag: "#" }, { nick: "", tag: "#" } ] },
            { id_time: "LVL", nome_time: "LEVEL ESPORTS", jogadores: [ { nick: "Deykonn", tag: "#GJPVYUQG" }, { nick: "B4st", tag: "#2CJ0RCJ" }, { nick: "Todd", tag: "#22PGQU98R" } ] }
        ],
        "TIER B-/C+": [
            { id_time: "HAWK", nome_time: "RED HAWK", jogadores: [ { nick: "BeBaxo", tag: "#2YRRL8GG2" }, { nick: "Marcellus", tag: "#9J0R0GQL" }, { nick: "Migz Labubu", tag: "#82P9JCJV8" } ] },
            { id_time: "LVLA", nome_time: "LEVEL ESPORTS ACADEMY", jogadores: [ { nick: "JoeFav", tag: "#VQ8YP9C0" }, { nick: "Levi", tag: "#YQVPY0J9" }, { nick: "xJnn", tag: "#GLQG9CU20" } ] }
        ]
    },
    "NA": {
        "TIER S": [
            { id_time: "BOB", nome_time: "F/A BOBBY", jogadores: [ { nick: "Bobby", tag: "#LVRRYPV" }, { nick: "Patch", tag: "#RLLRJ2" }, { nick: "Sans", tag: "#QUYCVC2" } ] },
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
            { id_time: "UTP", nome_time: "UTOPIA", jogadores: [ { nick: "Winq", tag: "#8UL0U08V" }, { nick: "Nerf", tag: "#9YYUPGJ2V" }, { nick: "Juni", tag: "#PL0GRVJRJ" } ] },
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
            { id_time: "FUTA", nome_time: "FUT ACADEMY", jogadores: [ { nick: "ZeyroX", tag: "#82GG2RLQG" }, { nick: "Ferissa", tag: "#2LLRJGPVV8" }, { nick: "DeMaster", tag: "#2GV90L8YP" } ] },
            { id_time: "REV", nome_time: "REVERSO HIVE", jogadores: [ { nick: "Fayelo", tag: "#LLV82LQPU" }, { nick: "Ethan", tag: "#2Y20JR8CQ" }, { nick: "Natrix", tag: "#CJ9YRGGC" } ] },
            { id_time: "TLB", nome_time: "TALENTS LAB", jogadores: [ { nick: "Yei Yei", tag: "#8RVLRVYYP" }, { nick: "Agachi", tag: "#YYUG20PQV" }, { nick: "Stas", tag: "#9LYQR9QC" } ] }
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
};

let CONFIGURACAO_MANUAL_TIMES = {};

function atualizarRostersAtuais() {
    let selectAno = document.getElementById('select-ano');
    let selectMes = document.getElementById('select-mes');
    const ano = selectAno ? selectAno.value : 'todos';
    const mes = selectMes ? selectMes.value : 'todos';

    if (ano !== 'todos' && mes !== 'todos' && ROSTERS_POR_DATA[ano] && ROSTERS_POR_DATA[ano][mes]) {
        CONFIGURACAO_MANUAL_TIMES = JSON.parse(JSON.stringify(ROSTERS_POR_DATA[ano][mes]));
    } else {
        CONFIGURACAO_MANUAL_TIMES = JSON.parse(JSON.stringify(ROSTERS_POR_DATA["PADRAO"]));
    }
    carregarTimesSalvosLocal();
}

function carregarTimesSalvosLocal() {
    let salvos = JSON.parse(localStorage.getItem('customTeams_' + _REGIAO)) || [];
    if (!CONFIGURACAO_MANUAL_TIMES[_REGIAO] && _REGIAO !== "ALL") CONFIGURACAO_MANUAL_TIMES[_REGIAO] = {};
    if (_REGIAO === "ALL" && !CONFIGURACAO_MANUAL_TIMES["ALL"]) CONFIGURACAO_MANUAL_TIMES["ALL"] = { "TIER ?": [], "TIMES REGISTRADOS": [] };
    
    let regAlvo = _REGIAO === "ALL" ? "ALL" : _REGIAO;
    if (!CONFIGURACAO_MANUAL_TIMES[regAlvo]["TIMES REGISTRADOS"]) CONFIGURACAO_MANUAL_TIMES[regAlvo]["TIMES REGISTRADOS"] = [];
    salvos.forEach(t => CONFIGURACAO_MANUAL_TIMES[regAlvo]["TIMES REGISTRADOS"].push(t));
}

const formatImg = n => { if(!n) return 'default'; return n.toLowerCase().replace(/[^a-z0-9]/g, ''); };

const isTimeDaRegiaoAtual = (id) => {
    if (_REGIAO === "ALL") {
        for (let reg in CONFIGURACAO_MANUAL_TIMES) {
            for (let tier in CONFIGURACAO_MANUAL_TIMES[reg]) {
                if (CONFIGURACAO_MANUAL_TIMES[reg][tier].find(t => t.id_time === id)) return true;
            }
        }
        return false;
    }
    let reg = CONFIGURACAO_MANUAL_TIMES[_REGIAO];
    if(!reg) return false;
    for(let tier in reg) {
        if(reg[tier].find(t => t.id_time === id)) return true;
    }
    return false;
};

function encontrarTimePorRoster(tagsArray) {
    for (let reg in CONFIGURACAO_MANUAL_TIMES) {
        for (let tier in CONFIGURACAO_MANUAL_TIMES[reg]) {
            if (tier === "TIER ?") continue;
            for (let team of CONFIGURACAO_MANUAL_TIMES[reg][tier]) {
                let matchCount = 0;
                team.jogadores.forEach(j => { if (tagsArray.includes(j.tag)) matchCount++; });
                if (matchCount >= 2) return { id: team.id_time, nome: team.nome_time, regiao: reg };
            }
        }
    }
    return null;
}

function parseDateBR(dataStr) {
    if (!dataStr) return 0;
    try {
        let p = dataStr.split(' '); let dp = p[0].split('/');
        let t = p[1] ? p[1].split(':') : [0,0,0];
        return new Date(dp[2], dp[1]-1, dp[0], t[0], t[1], t[2]).getTime();
    } catch (e) { return 0; }
}

document.addEventListener("DOMContentLoaded", () => { 
    atualizarRostersAtuais();
    carregarCSV(); 
});

// ==========================================
// 3. CARREGAMENTO E PROCESSAMENTO
// ==========================================
function carregarCSV() {
    Papa.parse("historico_bruto.csv", {
        download: true, header: true, skipEmptyLines: true,
        complete: function(results) {
            if (results.data && results.data.length > 0 && results.data[0].pick !== undefined) {
                dadosBrutos = results.data;
            } else { dadosBrutos = []; }
            
            Papa.parse("bans_matcherino.csv", {
                download: true, header: true, skipEmptyLines: true,
                complete: function(banRes) {
                    if (banRes.data && banRes.data.length > 0 && banRes.data[0].brawler_banido !== undefined) {
                        dadosBans = banRes.data;
                    } else { dadosBans = []; }
                    
                    popularFiltrosGlobais();
                    processarDadosGlobais();
                },
                error: function() {
                    dadosBans = [];
                    popularFiltrosGlobais();
                    processarDadosGlobais();
                }
            });
        }
    });
}

function processarTimesDesconhecidos(dados) {
    let regAlvo = _REGIAO === "ALL" ? "ALL" : _REGIAO;
    if (!CONFIGURACAO_MANUAL_TIMES[regAlvo]) CONFIGURACAO_MANUAL_TIMES[regAlvo] = {};
    CONFIGURACAO_MANUAL_TIMES[regAlvo]["TIER ?"] = [];

    const mapUNK = new Map();
    let counter = 1;
    let pMap = {};

    dados.forEach(r => {
        if(!pMap[r.id_partida]) pMap[r.id_partida] = { tagsA: [], tagsB: [], tA: null, tB: null };
        if(pMap[r.id_partida].tagsA.length < 3 && (pMap[r.id_partida].tA === null || pMap[r.id_partida].tA === r.id_time)) {
            pMap[r.id_partida].tagsA.push(r.player_tag); pMap[r.id_partida].tA = r.id_time;
        } else {
            pMap[r.id_partida].tagsB.push(r.player_tag); pMap[r.id_partida].tB = r.id_time;
        }
    });

    dados.forEach(linha => {
        let isKnown = encontrarTimePorRoster([linha.player_tag]);
        if (!isKnown && linha.id_players && linha.name_players && linha.player_tag) {
            const ids = linha.id_players.split(';'), names = linha.name_players.split(';');
            const pIdx = ids.indexOf(linha.player_tag);
            if (pIdx !== -1) {
                const sIdx = pIdx < 3 ? 0 : 3;
                const tTags = ids.slice(sIdx, sIdx + 3), tNames = names.slice(sIdx, sIdx + 3);
                if (tTags.length === 3 && !tTags.includes("None") && !tTags.includes("")) {
                    let teamReg = encontrarTimePorRoster(tTags);
                    if (teamReg) {
                        linha.id_time = teamReg.id; linha.nome_time = teamReg.nome;
                    } else {
                        let opTags = (sIdx < 3) ? pMap[linha.id_partida].tagsB : pMap[linha.id_partida].tagsA;
                        let opTeam = encontrarTimePorRoster(opTags);
                        if (opTeam && (_REGIAO === "ALL" || opTeam.regiao === _REGIAO)) {
                            const sig = tTags.slice().sort().join('_');
                            if (!mapUNK.has(sig)) {
                                const nId = `UNK${counter}`, nName = `Unknow ${counter}`;
                                mapUNK.set(sig, { id: nId, nome: nName });
                                CONFIGURACAO_MANUAL_TIMES[regAlvo]["TIER ?"].push({
                                    id_time: nId, nome_time: nName,
                                    jogadores: [ { nick: tNames[0], tag: tTags[0] }, { nick: tNames[1], tag: tTags[1] }, { nick: tNames[2], tag: tTags[2] } ]
                                });
                                counter++;
                            }
                            const gen = mapUNK.get(sig);
                            linha.id_time = gen.id; linha.nome_time = gen.nome;
                        }
                    }
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
    const sAno = document.getElementById('select-ano'), sMes = document.getElementById('select-mes'), sDia = document.getElementById('select-dia');
    if (sAno) { sAno.innerHTML = '<option value="todos">Todos os Anos</option>'; Array.from(anos).sort().forEach(a => sAno.innerHTML += `<option value="${a}">${a}</option>`); }
    if (sMes) { sMes.innerHTML = '<option value="todos">Todos os Meses</option>'; Array.from(meses).sort().forEach(m => sMes.innerHTML += `<option value="${m}">${m}</option>`); }
    if (sDia) { sDia.innerHTML = '<option value="todos">Todos os Dias</option>'; Array.from(dias).sort().forEach(d => sDia.innerHTML += `<option value="${d}">${d}</option>`); }

    const sTipo = document.getElementById('select-tipo');
    if (sTipo && !document.getElementById('scrims-team-filter')) {
        let fScrim = document.createElement('select');
        fScrim.id = 'scrims-team-filter'; fScrim.className = 'filter-select'; fScrim.style.display = 'none'; 
        fScrim.innerHTML = '<option value="todos">Todos os Times (Scrims)</option>';
        fScrim.onchange = () => { if (window.currentScrims) renderizarListaScrims(window.currentScrims); };
        sTipo.parentNode.insertBefore(fScrim, sTipo.nextSibling);

        let iSample = document.createElement('input');
        iSample.type = 'number'; iSample.id = 'sample-picks-meta'; iSample.className = 'filter-select'; iSample.style.display = 'none'; 
        iSample.value = '1'; iSample.min = '1'; iSample.placeholder = 'Sample Picks';
        iSample.onchange = processarDadosGlobais;
        sTipo.parentNode.insertBefore(iSample, sTipo.nextSibling);

        document.body.addEventListener('click', () => {
            setTimeout(() => {
                let eS = document.getElementById('tela-scrims'), eM = document.getElementById('tela-meta');
                fScrim.style.display = (eS && !eS.classList.contains('tela-oculta')) ? 'inline-block' : 'none';
                iSample.style.display = (eM && !eM.classList.contains('tela-oculta')) ? 'inline-block' : 'none';
            }, 50);
        });
    }
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
        return mA && mM && mD && mT && isTimeDaRegiaoAtual(row.id_time);
    };

    dadosFiltrados = dadosBrutos.filter(filterFn);
    dadosBansFiltrados = dadosBans.filter(filterFn);

    renderizarMeta();
    renderizarSidebarBrawlers();
    if(brawlerSelecionado) renderizarDetalhesBrawler(brawlerSelecionado);
    renderizarSidebarTimes();
    if(timeSelecionado) renderizarDetalhesTime(timeSelecionado);
    processarScrimes(dadosBrutos.filter(filterFn));
}

// ==========================================
// 4. TELA META
// ==========================================
window.toggleModoMeta = function(idModo) {
    const c = document.getElementById(`modo-content-${idModo}`);
    if(c) c.style.display = (c.style.display === 'none' || !c.style.display) ? 'block' : 'none';
}

function renderizarMeta() {
    const container = document.getElementById('conteudo-meta');
    let sMap = {}, sAll = {}, bMap = {}, bAll = {}, mSet = new Set(), pMap = {}, tPU = 0, jBMap = {}, jBT = new Set();
    let iS = document.getElementById('sample-picks-meta'), samplePicks = iS ? parseInt(iS.value) || 1 : 1;
    const ano = document.getElementById('select-ano') ? document.getElementById('select-ano').value : 'todos';
    const mes = document.getElementById('select-mes') ? document.getElementById('select-mes').value : 'todos';

    dadosFiltrados.forEach(row => {
        let b = (row.pick || '').toUpperCase(), map = row.mapa || "Desconhecido", mode = row.modo || "Desconhecido";
        if(!b) return;
        
        if(!sAll[b]) sAll[b] = { picks: 0, wins: 0 };
        sAll[b].picks++; if(parseInt(row.win) === 1) sAll[b].wins++;
        
        if(!sMap[mode]) sMap[mode] = {}; if(!sMap[mode][map]) sMap[mode][map] = {}; if(!sMap[mode][map][b]) sMap[mode][map][b] = { picks: 0, wins: 0 };
        sMap[mode][map][b].picks++; if(parseInt(row.win) === 1) sMap[mode][map][b].wins++;

        if(!mSet.has(row.id_partida)) {
            mSet.add(row.id_partida); tPU++;
            if(!pMap[mode]) pMap[mode] = {}; pMap[mode][map] = (pMap[mode][map] || 0) + 1;
        }
    });

    dadosBansFiltrados.forEach(row => {
        let b = (row.brawler_banido || '').toUpperCase(), map = row.mapa || 'Unknown', mode = row.modo || 'Unknown';
        if (!b) return;
        if (!bMap[mode]) bMap[mode] = {}; if (!bMap[mode][map]) bMap[mode][map] = {};
        bMap[mode][map][b] = (bMap[mode][map][b] || 0) + 1;
        if (!jBMap[mode]) jBMap[mode] = {}; if (!jBMap[mode][map]) jBMap[mode][map] = new Set();
        jBMap[mode][map].add(row.id_partida);
        bAll[b] = (bAll[b] || 0) + 1; jBT.add(row.id_partida);
    });

    let html = ``;
    Object.entries(sMap).forEach(([mode, mapasDict]) => {
        let cleanMode = formatImg(mode), conteudoMapa = '';
        Object.entries(mapasDict).forEach(([mapa, brawlers]) => {
            let mapaRotacaoValido = true;
            if (ano !== 'todos' && mes !== 'todos' && ROTACAO_MAPAS[ano] && ROTACAO_MAPAS[ano][mes]) {
                let mDM = Object.keys(ROTACAO_MAPAS[ano][mes]).find(k => k.toLowerCase() === mode.toLowerCase());
                if (mDM) {
                    let lst = ROTACAO_MAPAS[ano][mes][mDM].map(m => m.toUpperCase());
                    if (!lst.includes(mapa.toUpperCase())) mapaRotacaoValido = false;
                }
            }
            if (!mapaRotacaoValido) return;

            let valid = Object.entries(brawlers).filter(x => x[1].picks >= samplePicks).sort((a,b) => b[1].picks - a[1].picks);
            if(valid.length === 0) return;
            let tmMap = pMap[mode][mapa] || 1, bNMap = (bMap[mode] && bMap[mode][mapa]) ? bMap[mode][mapa] : {};
            let tJM = (jBMap[mode] && jBMap[mode][mapa]) ? jBMap[mode][mapa].size : 0, tBM = tJM > 0;

            conteudoMapa += `
                <div style="background:var(--bg-geral); border:1px solid var(--borda-destaque); border-radius:8px; padding:15px;">
                    <div style="text-align:center; font-weight:bold; margin-bottom:10px; color:var(--texto-secundario);">${mapa.toUpperCase()}</div>
                    <table class="excel-table">
                        <thead><tr><th style="text-align:left;">BRAWLER</th><th>P</th><th>PR%</th><th>W</th><th>WR%</th><th style="color:#b06aff;">B</th><th style="color:#b06aff;">BR%</th></tr></thead>
                        <tbody>
                            ${valid.map(([b, s]) => {
                                let bc = bNMap[b] || 0, brPct = tBM ? ((bc / tJM) * 100).toFixed(1) : '0.0';
                                return `<tr>
                                    <td style="text-align:left; font-weight:bold; color:var(--accent-hover)"><img src="brawlers/${formatImg(b)}.png" style="width:24px; vertical-align:middle; margin-right:5px; border-radius:4px;" onerror="this.src='brawlers/default.png'">${b}</td>
                                    <td>${s.picks}</td><td style="color:var(--texto-secundario);">${((s.picks/dadosFiltrados.length)*100).toFixed(1)}%</td><td>${s.wins}</td><td class="winrate-cell">${((s.wins/s.picks)*100).toFixed(1)}%</td>
                                    <td style="color:#b06aff; font-weight:bold;">${bc}</td><td style="color:#b06aff; font-weight:bold;">${brPct}%</td>
                                </tr>`;
                            }).join('')}
                        </tbody>
                    </table>
                </div>`;
        });
        if (conteudoMapa !== '') html += `<div class="modo-card" onclick="toggleModoMeta('${cleanMode}')"><img src="element/modes/${cleanMode}.png" style="width:40px; margin-right:15px;" onerror="this.src='element/modes/default.png'">${mode}</div><div id="modo-content-${cleanMode}" class="modo-section" style="display:none; padding:15px;"><div class="mapa-content">${conteudoMapa}</div></div>`;
    });

    let bAllVal = Object.entries(sAll).filter(x => x[1].picks >= samplePicks).sort((a,b) => b[1].picks - a[1].picks);
    if (bAllVal.length > 0) {
        html += `<div class="modo-card" style="margin-top:40px; border-color:var(--winrate-color); color:var(--winrate-color);" onclick="toggleModoMeta('allmaps')">ALL MAPS (GERAL)</div><div id="modo-content-allmaps" class="modo-section" style="display:none; padding:15px;"><div class="mapa-content" style="display:block;">
            <table class="excel-table">
                <thead><tr><th style="text-align:left;">BRAWLER</th><th>P</th><th>W</th><th>WR%</th><th style="color:#b06aff;">B</th><th style="color:#b06aff;">BR%</th></tr></thead>
                <tbody>
                    ${bAllVal.map(([b, s]) => {
                        let bc = bAll[b] || 0, brPct = jBT.size > 0 ? ((bc / jBT.size) * 100).toFixed(1) : '0.0';
                        return `<tr>
                            <td style="text-align:left; font-weight:bold; color:var(--winrate-color)"><img src="brawlers/${formatImg(b)}.png" style="width:28px; vertical-align:middle; margin-right:10px; border-radius:4px;" onerror="this.src='brawlers/default.png'">${b}</td>
                            <td>${s.picks}</td><td>${s.wins}</td><td class="winrate-cell">${((s.wins/s.picks)*100).toFixed(1)}%</td><td style="color:#b06aff; font-weight:bold;">${bc}</td><td style="color:#b06aff; font-weight:bold;">${brPct}%</td>
                        </tr>`;
                    }).join('')}
                </tbody>
            </table></div></div>`;
    }
    if (container) container.innerHTML = html || `<p style="padding:20px; text-align:center;">Nenhum dado encontrado para os filtros atuais na ${_REGIAO}.</p>`;
}

// ==========================================
// 5. TELA BRAWLERS
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
            div.innerHTML = `<img src="brawlers/${formatImg(b)}.png" style="width:24px; border-radius:4px;" onerror="this.src='brawlers/default.png'"> <span>${b}</span>`;
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
        <div class="brawler-profile-header"><img src="brawlers/${formatImg(brawler)}.png" class="brawler-large-avatar" onerror="this.src='brawlers/default.png'"><div><h2 style="font-size:28px;">${brawler}</h2><p style="color:var(--texto-secundario); font-size:14px; font-weight:bold; margin-top:5px;">PICKS: <span style="color:#fff">${totalPicks}</span> | W: <span style="color:#fff">${wins}</span> | WR%: <span class="winrate-cell">${wrGeral}</span> ${totalJogosComBans > 0 ? ` | B: <span style="color:#b06aff">${totalBans}</span> | BR%: <span style="color:#b06aff">${brPct}%</span>` : ''}</p></div></div>
        <h3 style="color:var(--accent-purple); font-size:16px; margin-bottom:15px;">TOP 3 MAPAS (DO BRAWLER)</h3>
        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap:15px; margin-bottom:30px;">
            ${topMapas.map(([m, s]) => `<div style="background:var(--bg-cards); padding:15px; border-radius:8px; border:1px solid var(--borda-destaque); text-align:center;"><div style="font-weight:900; font-size:14px; margin-bottom:8px;">${m}</div><div style="font-size:13px; color:var(--texto-secundario); display:flex; justify-content:center; gap:10px;"><span>P: <strong style="color:#fff">${s.picks}</strong></span><span>PR: <strong style="color:#fff">${((s.picks/totalPicks)*100).toFixed(1)}%</strong></span></div><div style="font-size:13px; color:var(--texto-secundario); display:flex; justify-content:center; gap:10px; margin-top:5px;"><span>W: <strong style="color:#fff">${s.wins}</strong></span><span>WR: <strong class="winrate-cell">${((s.wins/s.picks)*100).toFixed(1)}%</strong></span></div></div>`).join('')}
        </div>
        <div class="synergy-grid">
            <div class="synergy-box"><h3 style="color:var(--winrate-color); margin-bottom:15px; font-size:14px;">BOM CONTRA (Adversários)</h3>${countersTop.map(c => `<div class="synergy-item"><div style="display:flex; align-items:center;"><img src="brawlers/${formatImg(c.nome)}.png" onerror="this.src='brawlers/default.png'"><span style="font-weight:bold; font-size:13px;">${c.nome}</span></div><div style="text-align:right; font-size:12px; display:flex; gap:10px; font-weight:bold;"><div style="display:flex; flex-direction:column; color:var(--texto-secundario);"><span>P: ${c.matches}</span><span>PR%: ${c.pr.toFixed(1)}%</span></div><div style="display:flex; flex-direction:column;"><span>W: <span style="color:#fff">${c.wins}</span></span><span style="color:var(--winrate-color);">WR%: ${c.wr.toFixed(1)}%</span></div></div></div>`).join('') || '<p style="font-size:12px; color:var(--texto-secundario);">Sem dados</p>'}</div>
            <div class="synergy-box"><h3 style="color:var(--loss-color); margin-bottom:15px; font-size:14px;">RUIM CONTRA (Adversários)</h3>${counteradosTop.map(c => `<div class="synergy-item"><div style="display:flex; align-items:center;"><img src="brawlers/${formatImg(c.nome)}.png" onerror="this.src='brawlers/default.png'"><span style="font-weight:bold; font-size:13px;">${c.nome}</span></div><div style="text-align:right; font-size:12px; display:flex; gap:10px; font-weight:bold;"><div style="display:flex; flex-direction:column; color:var(--texto-secundario);"><span>P: ${c.matches}</span><span>PR%: ${c.pr.toFixed(1)}%</span></div><div style="display:flex; flex-direction:column;"><span>L: <span style="color:#fff">${c.losses}</span></span><span style="color:var(--loss-color);">WR%: ${c.wr.toFixed(1)}%</span></div></div></div>`).join('') || '<p style="font-size:12px; color:var(--texto-secundario);">Sem dados</p>'}</div>
            <div class="synergy-box" style="grid-column: 1 / -1;"><h3 style="color:var(--synergy-color); margin-bottom:15px; font-size:14px;">TOP 5 SINERGIAS (Brawlers Juntos)</h3><div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap:15px;">${sinergiasTop.map(c => `<div style="background:var(--bg-paineis); padding:15px; border-radius:8px; text-align:center; border:1px solid var(--borda-suave);"><img src="brawlers/${formatImg(c.nome)}.png" style="width:40px; height:40px; border-radius:6px; margin-bottom:8px; object-fit:cover;" onerror="this.src='brawlers/default.png'"><div style="font-weight:900; font-size:14px; margin-bottom:5px;">${c.nome}</div><div style="font-size:12px; color:var(--texto-secundario); font-weight:bold;">P: ${c.matches} | PR%: ${c.pr.toFixed(1)}%</div><div style="font-size:12px; color:var(--texto-secundario); font-weight:bold; margin-top:2px;">W: <span style="color:#fff">${c.wins}</span> | <span style="color:var(--winrate-color)">WR%: ${c.wr.toFixed(1)}%</span></div></div>`).join('') || '<p style="font-size:12px; color:var(--texto-secundario);">Sem dados</p>'}</div></div>
        </div>`;
}

// ==========================================
// 6. TELA TIMES
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
            let div = document.createElement('div'); div.className = 'sidebar-item';
            div.innerHTML = `<img src="element/teams/${t.id_time.toLowerCase()}.png" style="width:24px; height:24px; object-fit:contain; border-radius:4px;" onerror="this.src='element/teams/default.png'"> <span style="font-weight:bold;">${t.nome_time}</span>`;
            div.onclick = () => { document.querySelectorAll('#lista-times-sidebar .sidebar-item').forEach(i => i.classList.remove('active')); div.classList.add('active'); timeSelecionado = t; renderizarDetalhesTime(t); };
            sidebar.appendChild(div);
        });
    }
}

function renderizarDetalhesTime(time) {
    const painel = document.getElementById('painel-info-time');
    let partidasDoTime = dadosFiltrados.filter(r => r.id_time === time.id_time);
    let logoUrl = `element/teams/${time.id_time.toLowerCase()}.png`;

    if (time.id_time.startsWith("UNK")) {
        if(painel) painel.innerHTML = `<div style="background:var(--bg-cards); padding:30px; border-radius:12px; border:2px dashed var(--accent-purple);"><h2 style="color:var(--accent-hover); margin-bottom:20px;">Registrar Equipe Desconhecida</h2><div class="form-group"><label>SIGLA DO TIME (ID)</label><input type="text" id="custom-id" value="${time.id_time}"></div><div class="form-group"><label>NOME COMPLETO</label><input type="text" id="custom-name" value="${time.nome_time}"></div><h4 style="margin:20px 0 10px; color:#fff;">Roster Detectado:</h4><div style="display:flex; gap:10px; margin-bottom:25px;">${time.jogadores.map((j, idx) => `<div style="flex:1; background:var(--bg-paineis); padding:10px; border-radius:6px; border:1px solid var(--borda-suave);"><label style="font-size:11px; color:var(--texto-secundario); display:block; margin-bottom:5px;">${j.tag}</label><input type="text" id="nick-${idx}" value="${j.nick}" style="width:100%; background:transparent; border:none; border-bottom:1px solid var(--borda-destaque); color:#fff; font-weight:bold; outline:none;"></div>`).join('')}</div><button class="btn-register" onclick="registrarTimeCustom('${time.id_time}')">SALVAR E REGISTRAR TIME</button></div>`;
        return;
    }

    let timestamps = partidasDoTime.map(r => parseDateBR(r.data_adicao));
    let ultimoDadoTimestamp = timestamps.length > 0 ? Math.max(...timestamps) : 0;
    let dataFormatadaUltimo = ultimoDadoTimestamp > 0 ? new Date(ultimoDadoTimestamp).toLocaleDateString('pt-BR', {day: '2-digit', month: '2-digit', year: '2-digit'}) : 'N/A';

    let timeBrawlers = {};
    partidasDoTime.forEach(r => { let b = (r.pick||'').toUpperCase(); if(b) { timeBrawlers[b] = (timeBrawlers[b] || 0) + 1; } });
    let top10Time = Object.entries(timeBrawlers).sort((a,b) => b[1] - a[1]).slice(0,10);

    let html = `
        <div style="display:flex; align-items:center; gap:20px; margin-bottom:30px; border-bottom:1px solid var(--borda-destaque); padding-bottom:20px;">
            <img src="${logoUrl}" style="width:80px; height:80px; object-fit:contain; background:var(--bg-cards); border-radius:12px; border:2px solid var(--borda-destaque);" onerror="this.src='element/teams/default.png'">
            <div>
                <h2 style="color:var(--accent-purple); font-size:32px; font-weight:900;">${time.nome_time} <span style="font-size:14px; color:var(--texto-secundario)">(${time.id_time})</span></h2>
                <p style="font-size:11px; color:var(--texto-secundario); font-weight:bold; margin-top:5px;">PARTIDAS COLETADAS: <span style="color:#fff">${partidasDoTime.length}</span> | ÚLTIMA ATUALIZAÇÃO: <span style="color:#fff">${dataFormatadaUltimo}</span></p>
            </div>
        </div>
        <div style="background:var(--bg-cards); padding:20px; border-radius:12px; border:1px solid var(--borda-destaque); margin-bottom:30px;"><h3 style="color:var(--texto); margin-bottom:15px; font-size:16px;">TOP 10 BRAWLERS DA EQUIPE</h3><div style="display:flex; flex-wrap:wrap; gap:10px;">${top10Time.length > 0 ? top10Time.map(([b, qtd]) => `<div style="background:var(--bg-paineis); padding:8px 12px; border-radius:6px; border:1px solid var(--borda-suave); display:flex; align-items:center; gap:10px;"><img src="brawlers/${formatImg(b)}.png" style="width:24px; border-radius:4px;" onerror="this.src='brawlers/default.png'"><span style="font-weight:bold; font-size:13px;">${b}</span><span style="color:var(--texto-secundario); font-size:12px; font-weight:bold;">(${qtd})</span></div>`).join('') : '<span style="color:var(--texto-secundario); font-size:13px;">Sem dados suficientes no filtro.</span>'}</div></div>
        <h3 style="color:var(--texto); margin-bottom:15px; font-size:16px;">JOGADORES (ROSTER OFICIAL)</h3><div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap:20px;">
    `;

    time.jogadores.forEach(jogador => {
        let pJ = partidasDoTime.filter(r => r.player_tag === jogador.tag), pT = pJ.length, bJ = {};
        pJ.forEach(r => { let b = (r.pick||'').toUpperCase(); if(b) bJ[b] = (bJ[b] || 0) + 1; });
        let top5 = Object.entries(bJ).sort((a,b) => b[1] - a[1]).slice(0,5);
        html += `<div style="background:var(--bg-cards); padding:20px; border-radius:12px; border:1px solid var(--borda-destaque);"><div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:5px;"><h4 style="color:var(--accent-purple); font-size:18px;">${jogador.nick}</h4><span style="font-size:10px; background:#000; padding:3px 6px; border-radius:4px; color:var(--texto-secundario);">${jogador.tag}</span></div><p style="color:var(--texto-secundario); font-size:12px; margin-bottom:20px; font-weight:bold;">Total de Picks: ${pT}</p><div style="display:flex; flex-direction:column; gap:8px;">${top5.length > 0 ? top5.map(([b, qtd], idx) => `<div style="display:flex; justify-content:space-between; align-items:center; background:var(--bg-paineis); padding:8px 12px; border-radius:6px; border:1px solid var(--borda-suave);"><div style="display:flex; align-items:center; gap:10px;"><span style="font-weight:900; color:var(--texto-secundario); font-size:11px;">#${idx+1}</span><img src="brawlers/${formatImg(b)}.png" style="width:24px; border-radius:4px;" onerror="this.src='brawlers/default.png'"><span style="font-size:13px; font-weight:bold;">${b}</span></div><span style="font-size:12px; color:var(--texto-secundario); font-weight:bold;">${qtd}</span></div>`).join('') : '<span style="color:var(--texto-secundario); font-size:12px;">Sem picks no filtro.</span>'}</div></div>`;
    });
    if(painel) painel.innerHTML = html + `</div>`;
}

// ==========================================
// 7. TELA SCRIMS
// ==========================================
function processarScrimes(dadosPeriodo) {
    let rawMatches = {};
    dadosPeriodo.forEach(r => { if(!rawMatches[r.id_partida]) rawMatches[r.id_partida] = []; rawMatches[r.id_partida].push(r); });

    let partidasEstruturadas = [];
    Object.values(rawMatches).forEach(linhas => {
        if(linhas.length < 6) return;
        let t0 = linhas.slice(0,3), t1 = linhas.slice(3,6);
        let t0Id = t0[0].id_time, t1Id = t1[0].id_time;
        if (_REGIAO !== "ALL" && !isTimeDaRegiaoAtual(t0Id) && !isTimeDaRegiaoAtual(t1Id)) return;

        partidasEstruturadas.push({
            id: linhas[0].id_partida, modo: linhas[0].modo, mapa: linhas[0].mapa,
            tAId: t0Id, tBId: t1Id, tANome: t0[0].nome_time, tBNome: t1[0].nome_time,
            picksA: t0.map(p => (p.pick||'').toUpperCase()), picksB: t1.map(p => (p.pick||'').toUpperCase()),
            t0Full: t0, t1Full: t1, vencedor: parseInt(t0[0].win) === 1 ? t0Id : t1Id, timestamp: parseDateBR(linhas[0].data_adicao),
            dataFormatada: linhas[0].data_adicao, tipo: linhas[0].tipo || 'scrim'
        });
    });

    let scrims = [];
    partidasEstruturadas.sort((a,b) => a.timestamp - b.timestamp).forEach(partida => {
        let chaveTimes = [partida.tAId, partida.tBId].sort().join(' VS ');
        let scrimExistente = scrims.find(s => s.chave === chaveTimes && (partida.timestamp - s.ultimoUpdate) <= (2 * 60 * 60 * 1000));
        if(scrimExistente) {
            scrimExistente.rounds.push(partida); scrimExistente.ultimoUpdate = partida.timestamp;
            if(partida.vencedor === partida.tAId) scrimExistente.scoreA++; if(partida.vencedor === partida.tBId) scrimExistente.scoreB++;
        } else {
            scrims.push({
                chave: chaveTimes, tAId: partida.tAId, tBId: partida.tBId, tANome: partida.tANome, tBNome: partida.tBNome,
                scoreA: partida.vencedor === partida.tAId ? 1 : 0, scoreB: partida.vencedor === partida.tBId ? 1 : 0,
                inicio: partida.timestamp, ultimoUpdate: partida.timestamp, dataFormatada: partida.dataFormatada.split(' ')[0], rounds: [partida], tipo: partida.tipo
            });
        }
    });

    scrims = scrims.filter(s => s.rounds.length > 1).reverse();
    window.currentScrims = scrims;
    
    let selectFiltro = document.getElementById('scrims-team-filter');
    if (selectFiltro) {
        let timesNaScrim = new Set();
        scrims.forEach(s => { timesNaScrim.add(s.tANome); timesNaScrim.add(s.tBNome); });
        let valorAtual = selectFiltro.value || 'todos';
        selectFiltro.innerHTML = '<option value="todos">Todos os Times (Scrims)</option>';
        Array.from(timesNaScrim).sort().forEach(t => { selectFiltro.innerHTML += `<option value="${t}" ${t === valorAtual ? 'selected' : ''}>${t}</option>`; });
    }
    renderizarListaScrims(scrims);
}

function renderizarListaScrims(scrimsOriginais) {
    const lista = document.getElementById('scrims-lista'), detalhe = document.getElementById('scrims-detalhe');
    if(!lista || !detalhe) return;
    lista.style.display  = 'grid'; detalhe.style.display = 'none'; lista.innerHTML = '';

    let filtroValor = document.getElementById('scrims-team-filter') ? document.getElementById('scrims-team-filter').value : 'todos';
    let scrims = filtroValor !== 'todos' ? scrimsOriginais.filter(s => s.tANome === filtroValor || s.tBNome === filtroValor) : scrimsOriginais;

    if(scrims.length === 0) {
        lista.innerHTML = `<p style="padding:20px; color:var(--texto-secundario); font-weight:bold; grid-column:1/-1; text-align:center;">Nenhuma scrim encontrada no filtro atual.</p>`; return;
    }

    scrims.forEach((scrim) => {
        let div = document.createElement('div'); div.className = 'scrim-card';
        let isTournament = scrim.rounds.some(r => r.tipo === 'tournament');
        let icon = isTournament ? `<img src="element/play/matcherino.png" style="position:absolute; top:8px; right:8px; width:22px; height:22px; object-fit:contain;" onerror="this.style.display='none'" title="Torneio">` : '';

        div.innerHTML = `
            ${icon}
            <div class="scrim-team-info"><img src="element/teams/${scrim.tAId.toLowerCase()}.png" class="scrim-team-logo" onerror="this.src='element/teams/default.png'"><span style="font-weight:900; font-size:14px;">${scrim.tANome}</span></div>
            <div class="scrim-score">${scrim.scoreA} - ${scrim.scoreB}</div>
            <div class="scrim-team-info" style="flex-direction:row-reverse;"><img src="element/teams/${scrim.tBId.toLowerCase()}.png" class="scrim-team-logo" onerror="this.src='element/teams/default.png'"><span style="font-weight:900; font-size:14px;">${scrim.tBNome}</span></div>
            <div style="position:absolute; bottom:8px; left:15px; font-size:11px; color:var(--texto-secundario); font-weight:bold;">${scrim.dataFormatada}</div><div style="position:absolute; bottom:8px; right:15px; font-size:11px; color:var(--texto-secundario); font-weight:bold;">Rounds: ${scrim.rounds.length}</div>
        `;
        div.onclick = () => renderizarDetalheScrim(scrim);
        lista.appendChild(div);
    });
}

function renderizarDetalheScrim(scrim) {
    const lista = document.getElementById('scrims-lista'), detalhe = document.getElementById('scrims-detalhe');
    lista.style.display = 'none'; detalhe.style.display = 'block';

    let playersA = [...new Set(scrim.rounds.flatMap(r => r.t0Full.map(p => p.player_name)))].slice(0,3);
    let playersB = [...new Set(scrim.rounds.flatMap(r => r.t1Full.map(p => p.player_name)))].slice(0,3);

    detalhe.innerHTML = `
        <button onclick="document.getElementById('scrims-lista').style.display='grid'; document.getElementById('scrims-detalhe').style.display='none';" style="background:transparent; border:2px solid var(--accent-purple); color:var(--accent-purple); padding:8px 20px; font-weight:bold; border-radius:6px; cursor:pointer; margin-bottom:30px;">← VOLTAR</button>
        <div class="scrim-detail-header"><div style="display:flex; justify-content:center; align-items:flex-start; gap:40px;"><div style="text-align:center;"><img src="element/teams/${scrim.tAId.toLowerCase()}.png" style="height:80px; object-fit:contain; background:var(--bg-cards); border-radius:8px; border:2px solid var(--borda-destaque);" onerror="this.src='element/teams/default.png'"><div style="font-size:11px; color:var(--texto-secundario); display:flex; gap:8px; justify-content:center; margin-top:8px; font-weight:bold;">${playersA.map(p => `<span>${p}</span>`).join('')}</div></div><div style="font-size:42px; font-weight:900; color:#fff; line-height:80px;">${scrim.scoreA} <span style="color:var(--accent-purple)">-</span> ${scrim.scoreB}</div><div style="text-align:center;"><img src="element/teams/${scrim.tBId.toLowerCase()}.png" style="height:80px; object-fit:contain; background:var(--bg-cards); border-radius:8px; border:2px solid var(--borda-destaque);" onerror="this.src='element/teams/default.png'"><div style="font-size:11px; color:var(--texto-secundario); display:flex; gap:8px; justify-content:center; margin-top:8px; font-weight:bold;">${playersB.map(p => `<span>${p}</span>`).join('')}</div></div></div></div>
        <div class="scrim-rounds-container" id="rounds-scroll">${scrim.rounds.map((r, i) => `<div class="scrim-round-btn ${i === 0 ? 'active' : ''}" onclick="selecionarRound(${i}, this)"><span style="font-size:11px; font-weight:900; color:var(--accent-purple); display:block; margin-bottom:5px;">SET ${i+1}</span><img src="element/modes/${formatImg(r.modo)}.png" onerror="this.src='element/modes/default.png'"></div>`).join('')}</div>
        <div id="round-view-container"></div>
    `;
    window.scrimAtual = scrim; selecionarRound(0, detalhe.querySelector('.scrim-round-btn'));
}

window.selecionarRound = function(index, btnElement) {
    document.querySelectorAll('.scrim-round-btn').forEach(b => b.classList.remove('active'));
    if(btnElement) btnElement.classList.add('active');

    let round = window.scrimAtual.rounds[index];
    const container = document.getElementById('round-view-container');

    let playersA = round.t0Full.map(p => p.player_name), playersB = round.t1Full.map(p => p.player_name);
    let bansDoRound = dadosBans.filter(r => r.id_partida === round.id);
    let bansTimeA   = bansDoRound.filter(r => r.id_time === round.tAId), bansTimeB   = bansDoRound.filter(r => r.id_time === round.tBId);
    let temBans     = bansTimeA.length > 0 || bansTimeB.length > 0;

    container.innerHTML = `
        <div class="round-details-view">
            <div style="text-align:center;"><p style="font-size:12px; color:var(--texto-secundario); font-weight:bold;">${round.dataFormatada.split(' ')[1] || ''} | ${round.modo.toUpperCase()}</p></div>
            <div class="player-names-scrim" style="justify-content:space-around;"><div style="display:flex; gap:35px;">${playersA.map(p => `<span>${p}</span>`).join('')}</div><div style="display:flex; gap:35px;">${playersB.map(p => `<span>${p}</span>`).join('')}</div></div>
            ${temBans ? `<div style="display:flex; justify-content:space-between; align-items:center; margin:12px 0; padding:10px 20px; background:rgba(176,0,0,0.08); border-radius:8px; border:1px solid rgba(200,50,50,0.35);"><div style="display:flex; align-items:center; gap:8px;"><span style="font-size:10px; font-weight:900; color:#ff5555; letter-spacing:1px; white-space:nowrap;">BANS ▶</span>${bansTimeA.map(b => `<div style="position:relative; display:inline-block;" title="${b.brawler_banido}"><img src="brawlers/${formatImg(b.brawler_banido)}.png" style="width:32px; height:32px; border-radius:4px; filter:grayscale(80%) brightness(0.5);" onerror="this.src='brawlers/default.png'"><span style="position:absolute; inset:0; display:flex; align-items:center; justify-content:center; color:#ff4444; font-size:16px; font-weight:900; text-shadow:0 0 4px #000;">✕</span></div>`).join('')}</div><div style="display:flex; align-items:center; gap:8px; flex-direction:row-reverse;"><span style="font-size:10px; font-weight:900; color:#ff5555; letter-spacing:1px; white-space:nowrap;">◀ BANS</span>${bansTimeB.map(b => `<div style="position:relative; display:inline-block;" title="${b.brawler_banido}"><img src="brawlers/${formatImg(b.brawler_banido)}.png" style="width:32px; height:32px; border-radius:4px; filter:grayscale(80%) brightness(0.5);" onerror="this.src='brawlers/default.png'"><span style="position:absolute; inset:0; display:flex; align-items:center; justify-content:center; color:#ff4444; font-size:16px; font-weight:900; text-shadow:0 0 4px #000;">✕</span></div>`).join('')}</div></div>` : ''}
            <div class="scrim-picks-container">
                <div class="team-picks-scrim" style="flex-direction:row; justify-content:flex-end;">${round.picksA.map(pick => `<div class="pick-row"><img src="brawlers/${formatImg(pick)}.png" onerror="this.src='brawlers/default.png'"></div>`).join('')}</div>
                <div class="map-middle-scrim"><img src="element/maps/${formatImg(round.mapa)}.png" onerror="this.src='element/maps/default.png'"><p style="font-size:12px; font-weight:900; margin-top:8px;">${round.mapa}</p></div>
                <div class="team-picks-scrim" style="flex-direction:row; justify-content:flex-start;">${round.picksB.map(pick => `<div class="pick-row"><img src="brawlers/${formatImg(pick)}.png" onerror="this.src='brawlers/default.png'"></div>`).join('')}</div>
            </div>
        </div>`;
};
