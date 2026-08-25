let dadosBrutos = [];
let dadosFiltrados = [];
let dadosBans = [];
let dadosBansFiltrados = [];
let listaBrawlers = [];
let brawlerSelecionado = null;
let timeSelecionado = null;

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
let ROSTERS_POR_DATA = {
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
                { id_time: "AG", nome_time: "AG ESPORTS", jogadores: [ { nick: "Lion", tag: "#8OYUV29GR" }, { nick: "Bieel", tag: "#9JVUGR2JG" }, { nick: "Brennox🎩", tag: "#LLCURQVY2" }, { nick: "Puda", tag: "#829QUYGP0" } ] },
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

    // Cada time salvo carrega consigo o tier escolhido no cadastro (campo "tier").
    // Times salvos antes dessa funcionalidade existir caem em "TIMES REGISTRADOS" (comportamento antigo).
    salvos.forEach(t => {
        let tierAlvo = t.tier && t.tier.trim() !== '' ? t.tier : 'TIMES REGISTRADOS';
        if (!CONFIGURACAO_MANUAL_TIMES[regAlvo][tierAlvo]) CONFIGURACAO_MANUAL_TIMES[regAlvo][tierAlvo] = [];
        CONFIGURACAO_MANUAL_TIMES[regAlvo][tierAlvo].push(t);
    });

    // Tenta também mesclar os times salvos dentro de ROSTERS_POR_DATA (PADRAO + mês/ano atual),
    // para que fiquem disponíveis automaticamente em "const ROSTERS_POR_DATA" durante a sessão.
    mesclarTimesSalvosEmRostersPorData();
}

// Mantém os times cadastrados manualmente também dentro de ROSTERS_POR_DATA (em memória),
// assim eles "aparecem" automaticamente na constante sem precisar editar o arquivo na mão.
function mesclarTimesSalvosEmRostersPorData() {
    if (_REGIAO === "ALL") return; // "ALL" é agregador, não existe como chave própria em ROSTERS_POR_DATA
    let salvos = JSON.parse(localStorage.getItem('customTeams_' + _REGIAO)) || [];
    if (salvos.length === 0) return;

    let selectAno = document.getElementById('select-ano');
    let selectMes = document.getElementById('select-mes');
    const ano = selectAno ? selectAno.value : 'todos';
    const mes = selectMes ? selectMes.value : 'todos';

    let alvos = [ROSTERS_POR_DATA["PADRAO"]];
    if (ano !== 'todos' && mes !== 'todos' && ROSTERS_POR_DATA[ano] && ROSTERS_POR_DATA[ano][mes]) {
        alvos.push(ROSTERS_POR_DATA[ano][mes]);
    }

    alvos.forEach(alvo => {
        if (!alvo[_REGIAO]) alvo[_REGIAO] = {};
        salvos.forEach(t => {
            let tierAlvo = t.tier && t.tier.trim() !== '' ? t.tier : 'TIMES REGISTRADOS';
            if (!alvo[_REGIAO][tierAlvo]) alvo[_REGIAO][tierAlvo] = [];
            if (!alvo[_REGIAO][tierAlvo].find(e => e.id_time === t.id_time)) {
                alvo[_REGIAO][tierAlvo].push({ id_time: t.id_time, nome_time: t.nome_time, jogadores: t.jogadores });
            }
        });
    });
}

// Lista os tiers já existentes na região atual (para popular o <select> de cadastro)
function obterTiersDisponiveis() {
    let regAlvo = _REGIAO === "ALL" ? "ALL" : _REGIAO;
    let base = CONFIGURACAO_MANUAL_TIMES[regAlvo] || {};
    let tiers = Object.keys(base).filter(t => t !== 'TIER ?');
    let padrao = ['TIER S', 'TIER A', 'TIER B', 'TIER B-/C+', 'TIER C', 'TIMES REGISTRADOS'];
    padrao.forEach(p => { if (!tiers.includes(p)) tiers.push(p); });
    return tiers;
}

const formatImg = n => { if(!n) return 'default'; return n.toLowerCase().replace(/[^a-z0-9]/g, ''); };
// Normaliza nomes de modo/mapa para comparação, ignorando espaços, maiúsculas/minúsculas
// e diferenças de camelCase (ex: "brawlBall" === "Brawl Ball" === "brawl ball").
const normalizarChave = n => { if(!n) return ''; return n.toLowerCase().replace(/[^a-z0-9]/g, ''); };

// ========================================================
// HELPERS DE LOGO DE TIME (com fallback inteligente p/ Unknow)
// ========================================================
const teamLogoUrl = (id) => `element/teams/${(id || '').toLowerCase()}.png`;
const teamLogoFallback = (id) => (id && id.toUpperCase().startsWith('UNK')) ? 'element/teams/unknow.png' : 'element/teams/default.png';
const teamLogoOnError = (id) => `this.onerror=null; this.src='${teamLogoFallback(id)}';`;

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

async function carregarRostersAutomaticos() {
    // Carrega o roster gerado automaticamente pelo gerador.py.
    // Compatível com:
    // 1) rosters.json contendo JSON puro;
    // 2) rosters.json contendo: window.ROSTERS_POR_DATA = {...};
    // 3) rosters.js contendo: window.ROSTERS_POR_DATA = {...};
    // Se qualquer uma das opções falhar, o roster interno deste app continua funcionando.

    const fontes = [
        `rosters.json?v=${Date.now()}`,
        `rosters.js?v=${Date.now()}`
    ];

    for (const fonte of fontes) {
        try {
            const resposta = await fetch(fonte, {
                cache: 'no-store',
                headers: { 'Cache-Control': 'no-cache' }
            });

            if (!resposta.ok) {
                throw new Error(`HTTP ${resposta.status}`);
            }

            const texto = await resposta.text();
            if (!texto || !texto.trim()) {
                throw new Error('arquivo vazio');
            }

            let dados = null;

            // Primeiro tenta JSON puro.
            try {
                dados = JSON.parse(texto);
            } catch (_) {
                // O gerador pode produzir um arquivo com sintaxe JS mesmo usando
                // a extensão .json, por exemplo:
                // window.ROSTERS_POR_DATA = { ... };
                const inicio = texto.indexOf('{');
                const fim = texto.lastIndexOf('}');

                if (inicio !== -1 && fim > inicio) {
                    const objetoTexto = texto.slice(inicio, fim + 1);
                    try {
                        dados = JSON.parse(objetoTexto);
                    } catch (_) {
                        // Último fallback para arquivos JS confiáveis do próprio
                        // repositório. Isso também aceita const/let/window.
                        try {
                            const sandbox = {};
                            const executor = new Function(
                                'window',
                                `${texto}\n; return window.ROSTERS_POR_DATA || null;`
                            );
                            dados = executor(sandbox);
                        } catch (erroExecucao) {
                            throw new Error(`formato inválido: ${erroExecucao.message}`);
                        }
                    }
                }
            }

            // Alguns geradores salvam o objeto dentro de uma propriedade.
            if (dados && dados.ROSTERS_POR_DATA && typeof dados.ROSTERS_POR_DATA === 'object') {
                dados = dados.ROSTERS_POR_DATA;
            }

            if (!dados || typeof dados !== 'object' || Array.isArray(dados)) {
                throw new Error('ROSTERS_POR_DATA não encontrado');
            }

            // Não substitui o roster interno por um arquivo vazio/incompleto.
            const regioesValidas = ['SA', 'NA', 'EMEA', 'EA', 'ALL'];
            let encontrouRegiao = false;
            Object.keys(dados).forEach(chaveAno => {
                if (chaveAno === 'PADRAO') {
                    const padrao = dados[chaveAno];
                    if (padrao && typeof padrao === 'object') {
                        regioesValidas.forEach(reg => {
                            if (padrao[reg] && typeof padrao[reg] === 'object') encontrouRegiao = true;
                        });
                    }
                    return;
                }
                const porMes = dados[chaveAno];
                if (!porMes || typeof porMes !== 'object') return;
                Object.keys(porMes).forEach(chaveMes => {
                    const periodo = porMes[chaveMes];
                    if (!periodo || typeof periodo !== 'object') return;
                    regioesValidas.forEach(reg => {
                        if (periodo[reg] && typeof periodo[reg] === 'object') encontrouRegiao = true;
                    });
                });
            });

            if (!encontrouRegiao) {
                throw new Error('arquivo não contém regiões/tiers de roster válidos');
            }

            // Mantém a variável usada pelo restante deste app.
            ROSTERS_POR_DATA = dados;
            window.ROSTERS_POR_DATA = dados;

            console.log(`[ROSTERS] Roster automático carregado de ${fonte}.`);
            return true;
        } catch (erro) {
            console.warn(`[ROSTERS] Falha ao carregar ${fonte}:`, erro);
        }
    }

    console.warn('[ROSTERS] Nenhum arquivo automático válido encontrado. Usando o roster interno do app.js.');
    return false;
}

document.addEventListener("DOMContentLoaded", async () => { 
    await carregarRostersAutomaticos();
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

        // Dropdown visual customizado (com a logo do time ao lado esquerdo do nome).
        // O <select> nativo acima continua existindo como "fonte da verdade" (mesmo id/valor),
        // só que escondido — todo o resto do código que lê scrims-team-filter.value continua igual.
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

// Monta o dropdown visual de filtro de times das scrims, com a logo de cada time
// ao lado esquerdo do nome (tanto no botão quanto na lista de opções).
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

    // Estrutura os Games em Sets antes de calcular as estatísticas.
    // As tabelas usam Sets, nunca Games individuais.
    processarScrimes(dadosFiltrados);

    renderizarMeta();
    renderizarSidebarBrawlers();
    if(brawlerSelecionado) renderizarDetalhesBrawler(brawlerSelecionado);
    renderizarSidebarTimes();
    if(timeSelecionado) renderizarDetalhesTime(timeSelecionado);
}

// ==========================================
// 4. TELA META
// ==========================================
// ========================================================
// ESTATISTICAS POR SET - AS TABELAS NAO CONTAM GAMES
// ========================================================
function obterDadosEstatisticasPorSet() {
    const scrims = Array.isArray(window.allScrims) ? window.allScrims : [];
    const linhas = [];
    const bans = [];

    scrims.forEach(scrim => {
        (scrim.rounds || []).forEach(set => {
            const idSet = set.id || `set_${set.inicio}_${set.tAId}_${set.tBId}`;
            const vencedor = set.vencedor;
            const addLado = (idTime, nomeTime, picks, ganhou) => {
                const unicos = new Set();
                (picks || []).forEach(p => {
                    const b = String(p || '').trim().toUpperCase();
                    if (b) unicos.add(b);
                });
                unicos.forEach(b => linhas.push({
                    id_partida: idSet,
                    id_set: idSet,
                    id_time: idTime,
                    nome_time: nomeTime || idTime,
                    pick: b,
                    win: ganhou ? 1 : 0,
                    mapa: set.mapa || 'Desconhecido',
                    modo: set.modo || 'Desconhecido',
                    data_adicao: set.dataFormatada || ''
                }));
            };

            // A composicao do Set ja representa todos os Games.
            addLado(set.tAId, set.tANome, set.picksA, vencedor === set.tAId);
            addLado(set.tBId, set.tBNome, set.picksB, vencedor === set.tBId);

            // Bans tambem contam uma vez por Set.
            const bansUnicos = new Set();
            (set.games || []).forEach(game => {
                (dadosBansFiltrados || []).forEach(row => {
                    if (String(row.id_partida) !== String(game.id)) return;
                    const b = String(row.brawler_banido || '').trim().toUpperCase();
                    if (b) bansUnicos.add(b);
                });
            });
            bansUnicos.forEach(b => bans.push({
                id_partida: idSet,
                id_set: idSet,
                brawler_banido: b,
                mapa: set.mapa || 'Desconhecido',
                modo: set.modo || 'Desconhecido'
            }));
        });
    });

    return { linhas, bans };
}

function obterEstatisticasAtuaisPorSet() {
    return window._estatisticasPorSetCache || { linhas: [], bans: [] };
}

window.toggleModoMeta = function(idModo) {
    const c = document.getElementById(`modo-content-${idModo}`);
    if(c) c.style.display = (c.style.display === 'none' || !c.style.display) ? 'block' : 'none';
}

// Pega a rotação de mapas (Modo -> [3 mapas]) a ser usada na tela META: a configurada para o
// ano/mês filtrado, ou, se "Todos os Anos/Meses" estiver selecionado, a configuração mais recente
// cadastrada em ROTACAO_MAPAS (assim a tela nunca mostra mapas fora da rotação atual).
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

    const estatSet = obterEstatisticasAtuaisPorSet();
    const dadosSet = estatSet.linhas;
    const bansSet = estatSet.bans;

    dadosSet.forEach(row => {
        let b = (row.pick || '').toUpperCase(), map = row.mapa || "Desconhecido", mode = row.modo || "Desconhecido";
        if(!b) return;
        
        if(!sAll[b]) sAll[b] = { picks: 0, wins: 0 };
        sAll[b].picks++; if(parseInt(row.win) === 1) sAll[b].wins++;
        
        if(!sMap[mode]) sMap[mode] = {}; if(!sMap[mode][map]) sMap[mode][map] = {}; if(!sMap[mode][map][b]) sMap[mode][map][b] = { picks: 0, wins: 0 };
        sMap[mode][map][b].picks++; if(parseInt(row.win) === 1) sMap[mode][map][b].wins++;

        if(!mSet.has(row.id_set || row.id_partida)) {
            mSet.add(row.id_set || row.id_partida); tPU++;
            if(!pMap[mode]) pMap[mode] = {}; pMap[mode][map] = (pMap[mode][map] || 0) + 1;
        }
    });

    bansSet.forEach(row => {
        let b = (row.brawler_banido || '').toUpperCase(), map = row.mapa || 'Unknown', mode = row.modo || 'Unknown';
        if (!b) return;
        if (!bMap[mode]) bMap[mode] = {}; if (!bMap[mode][map]) bMap[mode][map] = {};
        bMap[mode][map][b] = (bMap[mode][map][b] || 0) + 1;
        if (!jBMap[mode]) jBMap[mode] = {}; if (!jBMap[mode][map]) jBMap[mode][map] = new Set();
        jBMap[mode][map].add(row.id_partida);
        bAll[b] = (bAll[b] || 0) + 1; jBT.add(row.id_partida);
    });

    const montarCardMapa = (modeKeyReal, mapaConfig) => {
        let mapaKeyReal = modeKeyReal && sMap[modeKeyReal] ? Object.keys(sMap[modeKeyReal]).find(m => normalizarChave(m) === normalizarChave(mapaConfig)) : null;
        let brawlers = mapaKeyReal ? sMap[modeKeyReal][mapaKeyReal] : null;
        let valid = brawlers ? Object.entries(brawlers).filter(x => x[1].picks >= samplePicks).sort((a,b) => b[1].picks - a[1].picks) : [];
        let bNMap = (modeKeyReal && mapaKeyReal && bMap[modeKeyReal] && bMap[modeKeyReal][mapaKeyReal]) ? bMap[modeKeyReal][mapaKeyReal] : {};
        let tJM = (modeKeyReal && mapaKeyReal && jBMap[modeKeyReal] && jBMap[modeKeyReal][mapaKeyReal]) ? jBMap[modeKeyReal][mapaKeyReal].size : 0, tBM = tJM > 0;

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
                                <td style="text-align:left; font-weight:bold; color:var(--accent-hover); white-space:nowrap; padding:5px 8px;"><img src="brawlers/${formatImg(b)}.png" style="width:24px; vertical-align:middle; margin-right:5px; border-radius:4px;" onerror="this.src='brawlers/default.png'">${b}</td>
                                <td style="padding:5px 8px;">${s.picks}</td><td style="color:var(--texto-secundario); padding:5px 8px;">${((s.picks/(dadosSet.length||1))*100).toFixed(1)}%</td><td style="padding:5px 8px;">${s.wins}</td><td class="winrate-cell" style="padding:5px 8px;">${((s.wins/s.picks)*100).toFixed(1)}%</td>
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
        // Mostra SOMENTE os modos/mapas configurados em ROTACAO_MAPAS, com os 3 mapas
        // de cada modo lado a lado (em linha horizontal), nessa ordem.
        Object.entries(rotacaoAtiva).forEach(([modoConfig, mapasConfig]) => {
            let modeKeyReal = Object.keys(sMap).find(m => normalizarChave(m) === normalizarChave(modoConfig)) || null;
            let cleanMode = formatImg(modoConfig);
            let conteudoMapa = mapasConfig.map(mapaConfig => montarCardMapa(modeKeyReal, mapaConfig)).join('');
            html += `<div class="modo-card" onclick="toggleModoMeta('${cleanMode}')"><img src="element/modes/${cleanMode}.png" style="width:40px; margin-right:15px;" onerror="this.src='element/modes/default.png'">${modoConfig}</div><div id="modo-content-${cleanMode}" class="modo-section" style="display:none; padding:15px;"><div class="mapa-content" style="display:grid; grid-template-columns:repeat(3, minmax(300px, 1fr)); gap:15px; align-items:start;">${conteudoMapa}</div></div>`;
        });
    } else {
        // Fallback de segurança: nenhuma rotação cadastrada em ROTACAO_MAPAS para nenhum período.
        Object.entries(sMap).forEach(([mode, mapasDict]) => {
            let cleanMode = formatImg(mode);
            let conteudoMapa = Object.keys(mapasDict).map(mapa => montarCardMapa(mode, mapa)).join('');
            if (conteudoMapa !== '') html += `<div class="modo-card" onclick="toggleModoMeta('${cleanMode}')"><img src="element/modes/${cleanMode}.png" style="width:40px; margin-right:15px;" onerror="this.src='element/modes/default.png'">${mode}</div><div id="modo-content-${cleanMode}" class="modo-section" style="display:none; padding:15px;"><div class="mapa-content" style="display:grid; grid-template-columns:repeat(3, minmax(300px, 1fr)); gap:15px; align-items:start;">${conteudoMapa}</div></div>`;
        });
    }

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

    tornarTabelasOrdenaveis();
}

// ==========================================
// 5. TELA BRAWLERS
// ==========================================
function renderizarSidebarBrawlers() {
    let pickCounts = {};
    const dadosSet = obterEstatisticasAtuaisPorSet().linhas;
    dadosSet.forEach(r => { let b = (r.pick||'').toUpperCase(); if(b) pickCounts[b] = (pickCounts[b] || 0) + 1; });
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
    const estatSet = obterEstatisticasAtuaisPorSet();
    const dadosSet = estatSet.linhas;
    const bansSet = estatSet.bans;
    let partidasDeste = dadosSet.filter(r => (r.pick||'').toUpperCase() === brawler);
    let totalPicks = partidasDeste.length;
    if(totalPicks === 0) return;

    let wins = partidasDeste.filter(r => parseInt(r.win) === 1).length;
    let wrGeral = ((wins/totalPicks)*100).toFixed(1) + '%';
    let totalBans = bansSet.filter(r => (r.brawler_banido||'').toUpperCase() === brawler).length;
    let totalJogosComBans = new Set(bansSet.map(r => r.id_set || r.id_partida)).size;
    let brPct = totalJogosComBans > 0 ? ((totalBans / totalJogosComBans) * 100).toFixed(1) : '0.0';

    let mapasStats = {};
    partidasDeste.forEach(r => {
        let m = r.mapa;
        if(!mapasStats[m]) mapasStats[m] = { picks: 0, wins: 0 };
        mapasStats[m].picks++; if(parseInt(r.win) === 1) mapasStats[m].wins++;
    });
    let topMapas = Object.entries(mapasStats).sort((a,b) => b[1].picks - a[1].picks).slice(0,3);
    let statsContra = {}, statsSinergia = {};
    let idsPartidas = [...new Set(partidasDeste.map(r => r.id_set || r.id_partida))];

    idsPartidas.forEach(id => {
        let todosNaPartida = dadosSet.filter(r => (r.id_set || r.id_partida) === id);
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
            div.innerHTML = `<img src="${teamLogoUrl(t.id_time)}" style="width:24px; height:24px; object-fit:contain; border-radius:4px;" onerror="${teamLogoOnError(t.id_time)}"> <span style="font-weight:bold;">${t.nome_time}</span>`;
            div.onclick = () => { document.querySelectorAll('#lista-times-sidebar .sidebar-item').forEach(i => i.classList.remove('active')); div.classList.add('active'); timeSelecionado = t; renderizarDetalhesTime(t); };
            sidebar.appendChild(div);
        });
    }
}

function renderizarDetalhesTime(time) {
    const painel = document.getElementById('painel-info-time');
    const dadosSet = obterEstatisticasAtuaisPorSet().linhas;
    let partidasDoTime = dadosSet.filter(r => r.id_time === time.id_time);
    let logoUrl = teamLogoUrl(time.id_time);

    if (time.id_time.startsWith("UNK")) {
        let tiersDisponiveis = obterTiersDisponiveis();
        if(painel) painel.innerHTML = `<div style="background:var(--bg-cards); padding:30px; border-radius:12px; border:2px dashed var(--accent-purple);">
            <div style="display:flex; align-items:center; gap:15px; margin-bottom:20px;">
                <img src="element/teams/unknow.png" style="width:48px; height:48px; object-fit:contain; border-radius:8px; background:var(--bg-paineis); border:1px solid var(--borda-suave);" onerror="this.style.display='none'">
                <h2 style="color:var(--accent-hover); margin:0;">Registrar Equipe Desconhecida</h2>
            </div>
            <div class="form-group"><label>SIGLA DO TIME (ID)</label><input type="text" id="custom-id" value="${time.id_time}"></div>
            <div class="form-group"><label>NOME COMPLETO</label><input type="text" id="custom-name" value="${time.nome_time}"></div>
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
            <h4 style="margin:20px 0 10px; color:#fff;">Roster Detectado:</h4>
            <div style="display:flex; gap:10px; margin-bottom:25px;">${time.jogadores.map((j, idx) => `<div style="flex:1; background:var(--bg-paineis); padding:10px; border-radius:6px; border:1px solid var(--borda-suave);"><label style="font-size:11px; color:var(--texto-secundario); display:block; margin-bottom:5px;">${j.tag}</label><input type="text" id="nick-${idx}" value="${j.nick}" style="width:100%; background:transparent; border:none; border-bottom:1px solid var(--borda-destaque); color:#fff; font-weight:bold; outline:none;"></div>`).join('')}</div>
            <button class="btn-register" onclick="registrarTimeCustom('${time.id_time}')">SALVAR E REGISTRAR TIME</button>
            <div id="custom-team-export-box" style="display:none; margin-top:20px;"></div>
        </div>`;
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
            <img src="${logoUrl}" style="width:80px; height:80px; object-fit:contain; background:var(--bg-cards); border-radius:12px; border:2px solid var(--borda-destaque);" onerror="${teamLogoOnError(time.id_time)}">
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

// Registra um time que estava em "TIER ?" (desconhecido) com um nome/sigla/tier definitivos.
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

    // Pega o roster original (tags reais) a partir do time que estava selecionado em "TIER ?"
    let timeOriginal = timeSelecionado && timeSelecionado.id_time === idAntigo ? timeSelecionado : null;
    let jogadoresFinais = (timeOriginal ? timeOriginal.jogadores : []).map((j, idx) => {
        let inputNick = document.getElementById(`nick-${idx}`);
        return { nick: inputNick ? inputNick.value : j.nick, tag: j.tag };
    });

    let novoTime = { id_time: novoId, nome_time: novoNome, jogadores: jogadoresFinais, tier: tierEscolhido };

    // Persiste no localStorage da região atual (sobrevive a reload)
    let salvos = JSON.parse(localStorage.getItem('customTeams_' + _REGIAO)) || [];
    salvos = salvos.filter(t => t.id_time !== novoId && t.id_time !== idAntigo);
    salvos.push(novoTime);
    localStorage.setItem('customTeams_' + _REGIAO, JSON.stringify(salvos));

    // Atualiza a configuração em memória imediatamente (CONFIGURACAO_MANUAL_TIMES + ROSTERS_POR_DATA)
    let regAlvo = _REGIAO === "ALL" ? "ALL" : _REGIAO;
    if (CONFIGURACAO_MANUAL_TIMES[regAlvo] && CONFIGURACAO_MANUAL_TIMES[regAlvo]["TIER ?"]) {
        CONFIGURACAO_MANUAL_TIMES[regAlvo]["TIER ?"] = CONFIGURACAO_MANUAL_TIMES[regAlvo]["TIER ?"].filter(t => t.id_time !== idAntigo);
    }
    if (!CONFIGURACAO_MANUAL_TIMES[regAlvo][tierEscolhido]) CONFIGURACAO_MANUAL_TIMES[regAlvo][tierEscolhido] = [];
    CONFIGURACAO_MANUAL_TIMES[regAlvo][tierEscolhido].push(novoTime);
    mesclarTimesSalvosEmRostersPorData();

    // Mostra um snippet pronto para colar em gerador.py (MAPEAMENTO_PLAYERS), já que o navegador
    // não tem permissão para editar arquivos no servidor/repositório automaticamente.
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
    let novoSelecionado = CONFIGURACAO_MANUAL_TIMES[regAlvo][tierEscolhido].find(t => t.id_time === novoId);
    if (novoSelecionado) { timeSelecionado = novoSelecionado; renderizarDetalhesTime(novoSelecionado); }
};

// ==========================================
// 7. TELA SCRIMS
// ==========================================
function assinaturaComposicao(picks) {
    // A ordem dos brawlers não importa para definir a composição.
    return [...new Set((picks || []).map(p => String(p || '').trim().toUpperCase()).filter(Boolean))]
        .sort()
        .join('|');
}

function mesmaComposicao(a, b) {
    return assinaturaComposicao(a) === assinaturaComposicao(b);
}

function resultadoSet(set) {
    let scoreA = 0;
    let scoreB = 0;

    (set.games || []).forEach(game => {
        if (game.vencedor === set.tAId) scoreA++;
        else if (game.vencedor === set.tBId) scoreB++;
    });

    return {
        scoreA,
        scoreB,
        vencedor: scoreA > scoreB ? set.tAId : (scoreB > scoreA ? set.tBId : null),
        completo: scoreA >= 2 || scoreB >= 2 || (set.games || []).length >= 3
    };
}

function criarSetAPartirDoGame(game) {
    return {
        id: `set_${game.id}`,
        tAId: game.tAId,
        tBId: game.tBId,
        tANome: game.tANome,
        tBNome: game.tBNome,
        modo: game.modo,
        mapa: game.mapa,
        composicaoA: [...game.picksA],
        composicaoB: [...game.picksB],
        assinaturaA: assinaturaComposicao(game.picksA),
        assinaturaB: assinaturaComposicao(game.picksB),
        inicio: game.timestamp,
        ultimoUpdate: game.timestamp,
        dataFormatada: game.dataFormatada,
        games: [game]
    };
}

function podeAdicionarGameAoSet(set, game) {
    if (!set || !game) return false;

    // Um Set é obrigatoriamente uma MD3.
    // Portanto, nunca recebe mais de 3 Games.
    if ((set.games || []).length >= 3) return false;

    // Se alguém já ganhou 2 Games, o Set terminou (2x0).
    const atual = resultadoSet(set);
    if (atual.scoreA >= 2 || atual.scoreB >= 2) return false;

    // Mesmo confronto, mesmo mapa e mesma composição dos dois lados.
    if (set.tAId !== game.tAId || set.tBId !== game.tBId) return false;

    const mesmoMapa = normalizarChave(set.mapa) === normalizarChave(game.mapa);
    const mesmoModo = normalizarChave(set.modo) === normalizarChave(game.modo);

    if (!mesmoMapa || !mesmoModo) return false;

    if (!mesmaComposicao(set.composicaoA, game.picksA)) return false;
    if (!mesmaComposicao(set.composicaoB, game.picksB)) return false;

    // Games de um mesmo Set precisam estar próximos no histórico.
    // Evita juntar jogos iguais de uma série diferente horas depois.
    if (Math.abs(game.timestamp - set.ultimoUpdate) > (30 * 60 * 1000)) return false;

    return true;
}

function finalizarSet(set) {
    const resultado = resultadoSet(set);

    set.scoreA = resultado.scoreA;
    set.scoreB = resultado.scoreB;
    set.vencedor = resultado.vencedor;
    set.completo = resultado.completo;
    set.qtdGames = set.games.length;

    // Mantém aliases para compatibilidade com partes antigas do código.
    set.t0Full = set.games[0]?.t0Full || [];
    set.t1Full = set.games[0]?.t1Full || [];
    set.picksA = set.composicaoA;
    set.picksB = set.composicaoB;

    return set;
}

function processarScrimes(dadosPeriodo) {
    /*
     * HIERARQUIA:
     *
     * SCRIM
     *   └── SET (MD3)
     *         ├── GAME 1
     *         ├── GAME 2
     *         └── GAME 3
     *
     * Um Set somente agrupa Games com:
     * - mesmo confronto;
     * - mesmo mapa;
     * - mesma composição dos dois times;
     * - sequência próxima no histórico;
     * - no máximo 3 Games;
     * - termina imediatamente quando um time chega a 2 vitórias.
     */

    let rawMatches = {};

    dadosPeriodo.forEach(r => {
        if (!r.id_partida) return;
        if (!rawMatches[r.id_partida]) rawMatches[r.id_partida] = [];
        rawMatches[r.id_partida].push(r);
    });

    let gamesEstruturados = [];

    Object.values(rawMatches).forEach(linhas => {
        if (linhas.length < 6) return;

        // O histórico possui 3 jogadores de cada lado.
        let t0 = linhas.slice(0, 3);
        let t1 = linhas.slice(3, 6);

        // Se por algum motivo a partida vier misturada, rejeita.
        if (t0.length < 3 || t1.length < 3) return;

        let t0Id = t0[0].id_time;
        let t1Id = t1[0].id_time;

        if (!t0Id || !t1Id || t0Id === t1Id) return;

        if (_REGIAO !== "ALL" && !isTimeDaRegiaoAtual(t0Id) && !isTimeDaRegiaoAtual(t1Id)) {
            return;
        }

        let timestamp = parseDateBR(linhas[0].data_adicao);

        // Se a data não puder ser convertida, ainda mantém o Game,
        // mas usa 0 somente para ordenação.
        if (!Number.isFinite(timestamp)) timestamp = 0;

        gamesEstruturados.push({
            id: linhas[0].id_partida,
            modo: linhas[0].modo || 'Desconhecido',
            mapa: linhas[0].mapa || 'Desconhecido',

            tAId: t0Id,
            tBId: t1Id,
            tANome: t0[0].nome_time || t0Id,
            tBNome: t1[0].nome_time || t1Id,

            picksA: t0.map(p => String(p.pick || '').toUpperCase()),
            picksB: t1.map(p => String(p.pick || '').toUpperCase()),

            t0Full: t0,
            t1Full: t1,

            vencedor: parseInt(t0[0].win) === 1 ? t0Id : t1Id,

            timestamp,
            dataFormatada: linhas[0].data_adicao || '',
            tipo: linhas[0].tipo || 'scrim',
            isMatcherino: String(linhas[0].id_partida).startsWith('mtcr_')
        });
    });

    // Ordem cronológica é importante para identificar os Games que pertencem
    // ao mesmo Set.
    gamesEstruturados.sort((a, b) => {
        if (a.timestamp !== b.timestamp) return a.timestamp - b.timestamp;
        return String(a.id).localeCompare(String(b.id));
    });

    let scrims = [];

    gamesEstruturados.forEach(game => {
        // Uma Scrim continua sendo identificada pelo confronto entre os times.
        let chaveTimes = [game.tAId, game.tBId].sort().join(' VS ');

        // Procura uma scrim recente do mesmo confronto.
        let scrimExistente = scrims.find(s =>
            s.chave === chaveTimes &&
            (game.timestamp - s.ultimoUpdate) <= (2 * 60 * 60 * 1000)
        );

        if (!scrimExistente) {
            scrimExistente = {
                chave: chaveTimes,
                tAId: game.tAId,
                tBId: game.tBId,
                tANome: game.tANome,
                tBNome: game.tBNome,

                // Pontuação da SCRIM = quantidade de SETS vencidos.
                scoreA: 0,
                scoreB: 0,

                inicio: game.timestamp,
                ultimoUpdate: game.timestamp,
                dataFormatada: String(game.dataFormatada || '').split(' ')[0],

                // Agora rounds representa SETS para manter compatibilidade
                // com o restante da página.
                rounds: [],

                tipo: game.tipo,
                temMatcherino: game.isMatcherino || false
            };

            scrims.push(scrimExistente);
        }

        // O Game só entra no Set mais recente se satisfizer TODAS as regras.
        let ultimoSet = scrimExistente.rounds[scrimExistente.rounds.length - 1];

        if (!podeAdicionarGameAoSet(ultimoSet, game)) {
            // Começa um novo Set.
            let novoSet = criarSetAPartirDoGame(game);
            scrimExistente.rounds.push(novoSet);
        } else {
            // Continua o Set atual.
            ultimoSet.games.push(game);
            ultimoSet.ultimoUpdate = game.timestamp;
            ultimoSet.qtdGames = ultimoSet.games.length;

            // Mantém os aliases atualizados.
            finalizarSet(ultimoSet);
        }

        let setAtual = scrimExistente.rounds[scrimExistente.rounds.length - 1];

        // Finaliza/recalcula o Set.
        finalizarSet(setAtual);

        scrimExistente.ultimoUpdate = game.timestamp;

        if (game.isMatcherino) {
            scrimExistente.temMatcherino = true;
        }

        // A pontuação da Scrim é baseada em SETS, não em Games.
        // Recalculamos para evitar dupla contagem.
        scrimExistente.scoreA = scrimExistente.rounds.filter(s => s.vencedor === scrimExistente.tAId).length;
        scrimExistente.scoreB = scrimExistente.rounds.filter(s => s.vencedor === scrimExistente.tBId).length;
    });

    /*
     * Remove confrontos que possuem apenas 1 Set.
     * A tela de Scrims continua mostrando apenas séries com mais de
     * um Set, como fazia anteriormente.
     *
     * Se quiser mostrar também uma única MD3 no futuro, basta trocar
     * > 1 por > 0 aqui.
     */
    // Mantem TODOS os Sets para as estatisticas. A tela pode esconder scrims
    // de apenas 1 Set, mas as tabelas ainda precisam contar esse Set.
    window.allScrims = scrims.slice();
    window._estatisticasPorSetCache = obterDadosEstatisticasPorSet();

    scrims = scrims.filter(s => s.rounds.length > 1).reverse();

    // Garante que todos os Sets estejam finalizados e com placar correto.
    scrims.forEach(scrim => {
        scrim.rounds.forEach(set => finalizarSet(set));

        scrim.scoreA = scrim.rounds.filter(s => s.vencedor === scrim.tAId).length;
        scrim.scoreB = scrim.rounds.filter(s => s.vencedor === scrim.tBId).length;
    });

    window.currentScrims = scrims;

    let selectFiltro = document.getElementById('scrims-team-filter');

    if (selectFiltro) {
        let timesNaScrim = new Map();

        scrims.forEach(s => {
            timesNaScrim.set(s.tANome, s.tAId);
            timesNaScrim.set(s.tBNome, s.tBId);
        });

        let valorAtual = selectFiltro.value || 'todos';

        selectFiltro.innerHTML =
            '<option value="todos">Todos os Times (Scrims)</option>';

        Array.from(timesNaScrim.keys()).sort().forEach(t => {
            selectFiltro.innerHTML +=
                `<option value="${t}" ${t === valorAtual ? 'selected' : ''}>${t}</option>`;
        });

        atualizarDropdownTimesScrims(timesNaScrim, valorAtual);
    }

    renderizarListaScrims(scrims);
}

function renderizarListaScrims(scrimsOriginais) {
    const lista = document.getElementById('scrims-lista');
    const detalhe = document.getElementById('scrims-detalhe');

    if (!lista || !detalhe) return;

    lista.style.display = 'grid';
    lista.style.gridTemplateColumns = 'repeat(auto-fill, minmax(420px, 1fr))';
    lista.style.gap = '18px';
    detalhe.style.display = 'none';
    lista.innerHTML = '';

    let filtroValor = document.getElementById('scrims-team-filter')
        ? document.getElementById('scrims-team-filter').value
        : 'todos';

    let scrims = filtroValor !== 'todos'
        ? scrimsOriginais.filter(s =>
            s.tANome === filtroValor || s.tBNome === filtroValor
        )
        : scrimsOriginais;

    if (scrims.length === 0) {
        lista.innerHTML =
            `<p style="padding:20px; color:var(--texto-secundario); font-weight:bold; grid-column:1/-1; text-align:center;">Nenhuma scrim encontrada no filtro atual.</p>`;
        return;
    }

    scrims.forEach((scrim) => {
        let div = document.createElement('div');
        div.className = 'scrim-card';

        let isTournament =
            scrim.rounds.some(r => r.games.some(g => g.tipo === 'tournament')) ||
            scrim.temMatcherino;

        let icon = isTournament
            ? `<img src="element/play/matcherino.png" style="position:absolute; top:10px; right:12px; width:22px; height:22px; object-fit:contain;" onerror="this.style.display='none'" title="Torneio">`
            : '';

        let aGanhou = scrim.scoreA > scrim.scoreB;
        let bGanhou = scrim.scoreB > scrim.scoreA;

        let corA = aGanhou
            ? 'var(--winrate-color, #2ecc71)'
            : '#fff';

        let corB = bGanhou
            ? 'var(--winrate-color, #2ecc71)'
            : '#fff';

        div.style.cssText =
            'position:relative; display:grid; grid-template-columns:1fr auto 1fr; align-items:center; gap:14px; min-height:120px; padding:22px 20px 34px; cursor:pointer;';

        div.innerHTML = `
            ${icon}

            <div class="scrim-team-info" style="display:flex; align-items:center; gap:10px; min-width:0;">
                <img src="${teamLogoUrl(scrim.tAId)}"
                     class="scrim-team-logo"
                     style="width:42px; height:42px; object-fit:contain; border-radius:6px; flex-shrink:0;"
                     onerror="${teamLogoOnError(scrim.tAId)}">

                <span style="font-weight:900; font-size:15px; color:${corA}; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;"
                      title="${scrim.tANome}">
                    ${scrim.tANome}
                </span>
            </div>

            <div class="scrim-score"
                 style="font-size:26px; font-weight:900; white-space:nowrap; text-align:center;">
                <span style="color:${corA};">${scrim.scoreA}</span>
                <span style="color:var(--texto-secundario);">-</span>
                <span style="color:${corB};">${scrim.scoreB}</span>
            </div>

            <div class="scrim-team-info"
                 style="display:flex; flex-direction:row-reverse; align-items:center; gap:10px; min-width:0;">

                <img src="${teamLogoUrl(scrim.tBId)}"
                     class="scrim-team-logo"
                     style="width:42px; height:42px; object-fit:contain; border-radius:6px; flex-shrink:0;"
                     onerror="${teamLogoOnError(scrim.tBId)}">

                <span style="font-weight:900; font-size:15px; color:${corB}; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;"
                      title="${scrim.tBNome}">
                    ${scrim.tBNome}
                </span>
            </div>

            <div style="position:absolute; bottom:10px; left:18px; font-size:11px; color:var(--texto-secundario); font-weight:bold;">
                ${scrim.dataFormatada}
            </div>

            <div style="position:absolute; bottom:10px; right:18px; font-size:11px; color:var(--texto-secundario); font-weight:bold;">
                Sets: ${scrim.rounds.length}
            </div>
        `;

        div.onclick = () => renderizarDetalheScrim(scrim);
        lista.appendChild(div);
    });
}

function renderizarDetalheScrim(scrim) {
    const lista = document.getElementById('scrims-lista');
    const detalhe = document.getElementById('scrims-detalhe');

    lista.style.display = 'none';
    detalhe.style.display = 'block';

    let playersA = [
        ...new Set(
            scrim.rounds.flatMap(set =>
                set.games.flatMap(game =>
                    game.t0Full.map(p => p.player_name)
                )
            )
        )
    ].slice(0, 3);

    let playersB = [
        ...new Set(
            scrim.rounds.flatMap(set =>
                set.games.flatMap(game =>
                    game.t1Full.map(p => p.player_name)
                )
            )
        )
    ].slice(0, 3);

    let aGanhou = scrim.scoreA > scrim.scoreB;
    let bGanhou = scrim.scoreB > scrim.scoreA;

    let corA = aGanhou
        ? 'var(--winrate-color, #2ecc71)'
        : '#fff';

    let corB = bGanhou
        ? 'var(--winrate-color, #2ecc71)'
        : '#fff';

    detalhe.innerHTML = `
        <button
            onclick="document.getElementById('scrims-lista').style.display='grid'; document.getElementById('scrims-detalhe').style.display='none';"
            style="background:transparent; border:2px solid var(--accent-purple); color:var(--accent-purple); padding:8px 20px; font-weight:bold; border-radius:6px; cursor:pointer; margin-bottom:30px;">
            ← VOLTAR
        </button>

        <div class="scrim-detail-header">
            <div style="display:flex; justify-content:center; align-items:flex-start; gap:40px;">

                <div style="text-align:center;">
                    <img src="${teamLogoUrl(scrim.tAId)}"
                         style="height:80px; object-fit:contain; background:var(--bg-cards); border-radius:8px; border:2px solid var(--borda-destaque);"
                         onerror="${teamLogoOnError(scrim.tAId)}">

                    <div style="font-size:11px; color:var(--texto-secundario); display:flex; gap:8px; justify-content:center; margin-top:8px; font-weight:bold;">
                        ${playersA.map(p => `<span>${p}</span>`).join('')}
                    </div>
                </div>

                <div style="font-size:42px; font-weight:900; line-height:80px;">
                    <span style="color:${corA};">${scrim.scoreA}</span>
                    <span style="color:var(--accent-purple)">-</span>
                    <span style="color:${corB};">${scrim.scoreB}</span>
                </div>

                <div style="text-align:center;">
                    <img src="${teamLogoUrl(scrim.tBId)}"
                         style="height:80px; object-fit:contain; background:var(--bg-cards); border-radius:8px; border:2px solid var(--borda-destaque);"
                         onerror="${teamLogoOnError(scrim.tBId)}">

                    <div style="font-size:11px; color:var(--texto-secundario); display:flex; gap:8px; justify-content:center; margin-top:8px; font-weight:bold;">
                        ${playersB.map(p => `<span>${p}</span>`).join('')}
                    </div>
                </div>

            </div>
        </div>

        <div class="scrim-rounds-container"
             id="rounds-scroll"
             style="display:flex; flex-wrap:wrap; gap:10px; overflow:visible; max-height:none; width:100%;">

            ${scrim.rounds.map((set, i) => {
                let venceuA = set.vencedor === set.tAId;
                let venceuB = set.vencedor === set.tBId;

                let corSet =
                    venceuA
                        ? 'var(--winrate-color, #2ecc71)'
                        : (venceuB ? 'var(--loss-color, #e74c3c)' : '#fff');

                let nomeVencedorSet =
                    venceuA
                        ? set.tANome
                        : (venceuB ? set.tBNome : 'Em andamento');

                return `
                    <div class="scrim-round-btn ${i === 0 ? 'active' : ''}"
                         onclick="selecionarRound(${i}, this)"
                         style="flex:0 0 auto;">

                        <span style="font-size:11px; font-weight:900; color:var(--accent-purple); display:block; margin-bottom:5px;">
                            SET ${i + 1}
                        </span>

                        <img src="element/modes/${formatImg(set.modo)}.png"
                             onerror="this.src='element/modes/default.png'">

                        <span style="display:block; margin-top:4px; font-size:10px; font-weight:900; color:${corSet}; max-width:120px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">
                            ${set.scoreA} - ${set.scoreB}
                        </span>

                        <span style="display:block; margin-top:2px; font-size:8px; font-weight:900; color:var(--texto-secundario); max-width:120px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;"
                              title="${nomeVencedorSet}">
                            ${nomeVencedorSet}
                        </span>

                        <span style="display:block; margin-top:2px; font-size:8px; color:var(--texto-secundario);">
                            ${set.games.length} GAME${set.games.length === 1 ? '' : 'S'}
                        </span>
                    </div>
                `;
            }).join('')}

        </div>

        <div id="round-view-container"></div>
    `;

    window.scrimAtual = scrim;

    selecionarRound(
        0,
        detalhe.querySelector('.scrim-round-btn')
    );
}

window.selecionarRound = function(index, btnElement) {
    document.querySelectorAll('.scrim-round-btn').forEach(b => b.classList.remove('active'));

    if (btnElement) btnElement.classList.add('active');

    let set = window.scrimAtual.rounds[index];

    if (!set) return;

    const container = document.getElementById('round-view-container');

    let venceuA = set.vencedor === set.tAId;
    let venceuB = set.vencedor === set.tBId;

    let corSetA = venceuA
        ? 'var(--winrate-color, #2ecc71)'
        : '#fff';

    let corSetB = venceuB
        ? 'var(--winrate-color, #2ecc71)'
        : '#fff';

    /*
     * Dentro do SET mostramos cada GAME separadamente.
     * Isso preserva a informação individual dos jogos sem contar
     * cada Game como um Set.
     */
    container.innerHTML = `
        <div style="margin-top:20px; margin-bottom:14px; text-align:center;">
            <div style="font-size:18px; font-weight:900; color:var(--accent-purple);">
                SET ${index + 1}
            </div>

            <div style="font-size:24px; font-weight:900; margin-top:4px;">
                <span style="color:${corSetA};">${set.scoreA}</span>
                <span style="color:var(--texto-secundario);"> - </span>
                <span style="color:${corSetB};">${set.scoreB}</span>
            </div>

            <div style="font-size:11px; color:var(--texto-secundario); margin-top:3px;">
                ${set.modo.toUpperCase()} | ${set.mapa}
                | ${set.games.length} GAME${set.games.length === 1 ? '' : 'S'}
            </div>
        </div>

        <div style="display:flex; flex-direction:column; gap:16px;">
            ${set.games.map((game, gameIndex) => {
                let gameVenceuA = game.vencedor === game.tAId;
                let gameVenceuB = game.vencedor === game.tBId;

                let gameCorA = gameVenceuA
                    ? 'var(--winrate-color, #2ecc71)'
                    : '#fff';

                let gameCorB = gameVenceuB
                    ? 'var(--winrate-color, #2ecc71)'
                    : '#fff';

                let playersA = game.t0Full.map(p => p.player_name);
                let playersB = game.t1Full.map(p => p.player_name);

                let bansDoGame = dadosBans.filter(
                    r => r.id_partida === game.id
                );

                let bansTimeA = bansDoGame.filter(
                    r => r.id_time === game.tAId
                );

                let bansTimeB = bansDoGame.filter(
                    r => r.id_time === game.tBId
                );

                let temBans =
                    bansTimeA.length > 0 ||
                    bansTimeB.length > 0;

                return `
                    <div class="round-details-view"
                         style="border:1px solid var(--borda-suave); border-radius:10px; padding:16px;">

                        <div style="text-align:center;">
                            <p style="font-size:12px; color:var(--texto-secundario); font-weight:bold;">
                                GAME ${gameIndex + 1}
                                ${game.dataFormatada ? ` | ${String(game.dataFormatada).split(' ')[1] || ''}` : ''}
                                | ${game.modo.toUpperCase()}
                            </p>
                        </div>

                        <div class="player-names-scrim"
                             style="justify-content:space-around;">

                            <div style="display:flex; gap:35px; color:${gameCorA}; font-weight:900;">
                                ${playersA.map(p => `<span>${p}</span>`).join('')}
                            </div>

                            <div style="display:flex; gap:35px; color:${gameCorB}; font-weight:900;">
                                ${playersB.map(p => `<span>${p}</span>`).join('')}
                            </div>
                        </div>

                        ${temBans ? `
                            <div style="display:flex; justify-content:space-between; align-items:center; margin:12px 0; padding:10px 20px; background:rgba(176,0,0,0.08); border-radius:8px; border:1px solid rgba(200,50,50,0.35);">

                                <div style="display:flex; align-items:center; gap:8px;">
                                    <span style="font-size:10px; font-weight:900; color:#ff5555; letter-spacing:1px; white-space:nowrap;">
                                        BANS ▶
                                    </span>

                                    ${bansTimeA.map(b => `
                                        <div style="position:relative; display:inline-block;" title="${b.brawler_banido}">
                                            <img src="brawlers/${formatImg(b.brawler_banido)}.png"
                                                 style="width:32px; height:32px; border-radius:4px; filter:grayscale(80%) brightness(0.5);"
                                                 onerror="this.src='brawlers/default.png'">

                                            <span style="position:absolute; inset:0; display:flex; align-items:center; justify-content:center; color:#ff4444; font-size:16px; font-weight:900; text-shadow:0 0 4px #000;">
                                                ✕
                                            </span>
                                        </div>
                                    `).join('')}
                                </div>

                                <div style="display:flex; align-items:center; gap:8px; flex-direction:row-reverse;">
                                    <span style="font-size:10px; font-weight:900; color:#ff5555; letter-spacing:1px; white-space:nowrap;">
                                        ◀ BANS
                                    </span>

                                    ${bansTimeB.map(b => `
                                        <div style="position:relative; display:inline-block;" title="${b.brawler_banido}">
                                            <img src="brawlers/${formatImg(b.brawler_banido)}.png"
                                                 style="width:32px; height:32px; border-radius:4px; filter:grayscale(80%) brightness(0.5);"
                                                 onerror="this.src='brawlers/default.png'">

                                            <span style="position:absolute; inset:0; display:flex; align-items:center; justify-content:center; color:#ff4444; font-size:16px; font-weight:900; text-shadow:0 0 4px #000;">
                                                ✕
                                            </span>
                                        </div>
                                    `).join('')}
                                </div>

                            </div>
                        ` : ''}

                        <div class="scrim-picks-container">

                            <div class="team-picks-scrim"
                                 style="flex-direction:row; justify-content:flex-end;">

                                ${game.picksA.map(pick => `
                                    <div class="pick-row">
                                        <img src="brawlers/${formatImg(pick)}.png"
                                             onerror="this.src='brawlers/default.png'">
                                    </div>
                                `).join('')}

                            </div>

                            <div class="map-middle-scrim">
                                <img src="element/maps/${formatImg(game.mapa)}.png"
                                     onerror="this.src='element/maps/default.png'">

                                <p style="font-size:12px; font-weight:900; margin-top:8px;">
                                    ${game.mapa}
                                </p>
                            </div>

                            <div class="team-picks-scrim"
                                 style="flex-direction:row; justify-content:flex-start;">

                                ${game.picksB.map(pick => `
                                    <div class="pick-row">
                                        <img src="brawlers/${formatImg(pick)}.png"
                                             onerror="this.src='brawlers/default.png'">
                                    </div>
                                `).join('')}

                            </div>

                        </div>

                        <div style="text-align:center; margin-top:10px; font-size:11px; font-weight:900;">
                            <span style="color:${gameCorA};">
                                ${game.tANome}
                            </span>

                            <span style="color:var(--texto-secundario); margin:0 8px;">
                                ${gameVenceuA ? 'VENCEU' : 'PERDEU'}
                            </span>

                            <span style="color:${gameCorB};">
                                ${game.tBNome}
                            </span>
                        </div>

                    </div>
                `;
            }).join('')}
        </div>
    `;
};


// ==========================================
// 8. FUNÇÃO PARA ORDENAR TABELAS (META)

// ==========================================
function tornarTabelasOrdenaveis() {
    // Seleciona todas as tabelas geradas na tela Meta
    document.querySelectorAll('table.excel-table').forEach(table => {
        const headers = table.querySelectorAll('th');
        
        headers.forEach((th, index) => {
            // Estiliza o cabeçalho para parecer clicável
            th.style.cursor = 'pointer';
            th.title = "Clique para ordenar";

            th.addEventListener('click', () => {
                const tbody = table.querySelector('tbody');
                if (!tbody) return;

                const rows = Array.from(tbody.querySelectorAll('tr'));
                const isAscending = th.classList.contains('asc');

                // Reseta a classe de todos os cabeçalhos
                headers.forEach(h => h.classList.remove('asc', 'desc'));

                // Define a nova direção da ordenação
                th.classList.add(isAscending ? 'desc' : 'asc');

                rows.sort((rowA, rowB) => {
                    // Pega o texto da célula (ignorando a tag <img> do Brawler)
                    let cellA = rowA.children[index].innerText.trim();
                    let cellB = rowB.children[index].innerText.trim();

                    // Função auxiliar para converter strings (ex: "50.5%", "15") em números, ou manter texto
                    const parseCell = (val) => {
                        let num = parseFloat(val.replace('%', '').replace(',', '.'));
                        return isNaN(num) ? val : num;
                    };

                    let valA = parseCell(cellA);
                    let valB = parseCell(cellB);

                    // Se for texto (Nome do Brawler), ordena em ordem alfabética
                    if (typeof valA === 'string' && typeof valB === 'string') {
                        return isAscending ? valB.localeCompare(valA) : valA.localeCompare(valB);
                    } 
                    // Se for número (Picks, Wins, Taxas %), ordena numericamente
                    else {
                        return isAscending ? valA - valB : valB - valA;
                    }
                });

                // Reinjeta as linhas reordenadas no corpo da tabela
                tbody.append(...rows);
            });
        });
    });
}
