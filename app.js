let dadosBrutos = [];
let dadosFiltrados = [];
let mapaSelecionadoInfo = null;
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
            },
        "07": { 
            "Brawl Ball": ["Pinhole Punt", "Pinball Dreams", "Triple Dribble"], 
            "Gem Grab": ["Hard Rock Mine", "Crystal Arcade", "Gem Fort"],
            "Hot Zone": ["Dueling Beetles", "Open Business", "Ring of Fire"],
            "Heist": ["Safe Zone", "Kaboom Canyon", "Pit Stop"],
            "Bounty": ["Hideout", "Dry Season", "Layer Cake"],
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
            { id_time: "LOUD", nome_time: "LOUD", jogadores: [ { nick: "KaioDog", tag: "#GGUQCG0G" }, { nick: "FireCrow", tag: "#JQ8LLLY" }, { nick: "Edinho", tag: "#QJULVGU" } ] },
            { id_time: "OS", nome_time: "OLIMPO SQUAD", jogadores: [ { nick: "Golden", tag: "#9QCJPL20" }, { nick: "Brabao", tag: "#L9PQUV0YC" }, { nick: "Pekka", tag: "#JVRCVJ9Q" } ] },
            { id_time: "GLXY", nome_time: "GALAXY", jogadores: [ { nick: "Doritos🐉", tag: "#202GJJR28" }, { nick: "Derpp🐰ᩚ", tag: "#2QG9LQQC8Y" }, { nick: "IceCrow", tag: "#9CPYUCGQC" } ] },
            { id_time: "SKC", nome_time: "SKCalalas SA", jogadores: [ { nick: "Kr ;)", tag: "#PR0P8QVQ" }, { nick: "Rhz", tag: "#89PVJG9R0" }, { nick: "Juan Carlos", tag: "#PR9U2JL" } ] },
            { id_time: "ENO", nome_time: "ENOSIS", jogadores: [ { nick: "Magic🎩", tag: "#2QCCC29QV" }, { nick: "REI DO FUT", tag: "#RVL0RPR9" }, { nick: "Fantas🌖", tag: "#PU20LUCQG" } ] },
            { id_time: "OCX", nome_time: "OCX Division", jogadores: [ { nick: "Tufa", tag: "#CQLR0Y80" }, { nick: "Enid", tag: "#2JGP0LYV2Q" }, { nick: "Red Eyes", tag: "#CUGVUYPG" } ] },
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
            { id_time: "HML", nome_time: "F/A HOMELESS", jogadores: [ { nick: "Tyrant", tag: "#VPVLG2" }, { nick: "Xemp", tag: "#2P9CJVGJ8" }, { nick: "Ducky", tag: "#20P2GP99" } ] },
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
            { id_time: "HMBLE", nome_time: "HMBLE", jogadores: [ { nick: "Symantec", tag: "#YQUCCJ2"}, { nick: "BosS", tag: "#V89Y2GP0" }, { nick: "Lukii", tag: "#8V92UYCJ" } ] }

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
            { id_time: "IGM", nome_time: "IGNUM", jogadores: [ { nick: "Shigemyon", tag: "#2RQQ9PGC" }, { nick: "Drake", tag: "#2CJG2GGCGP" }, { nick: "Nyade", tag: "2UQVY2JL2V#" } ] },
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

    "2026": {
        "07": { 
           "SA": {
        "TIER S": [
            { id_time: "BH", nome_time: "Bounty Hunters", jogadores: [ { nick: "Wesley", tag: "#PLLRJC2V" }, { nick: "Prozy", tag: "#GYCYCLRJL" }, { nick: "Portox", tag: "#YGQYGCR" } ] },
            { id_time: "RED", nome_time: "RED CANIDS", jogadores: [ { nick: "Jubileubr", tag: "#GVYLVUGR" }, { nick: "CAUEBR", tag: "#JQ8L0YYL" }, { nick: "Mohtep", tag: "#R2LR2QLG" } ] }
        ],
        "TIER A": [
            { id_time: "LOUD", nome_time: "LOUD", jogadores: [ { nick: "KaioDog", tag: "#GGUQCG0G" }, { nick: "FireCrow", tag: "#JQ8LLLY" }, { nick: "Edinho", tag: "#QJULVGU" } ] },
            { id_time: "OS", nome_time: "OLIMPO SQUAD", jogadores: [ { nick: "Golden", tag: "#9QCJPL20" }, { nick: "Brabao", tag: "#L9PQUV0YC" }, { nick: "Pekka", tag: "#JVRCVJ9Q" } ] },
            { id_time: "GLXY", nome_time: "GALAXY", jogadores: [ { nick: "Doritos🐉", tag: "#202GJJR28" }, { nick: "Derpp🐰ᩚ", tag: "#2QG9LQQC8Y" }, { nick: "IceCrow", tag: "#9CPYUCGQC" } ] },
            { id_time: "SKC", nome_time: "SKCalalas SA", jogadores: [ { nick: "Kr ;)", tag: "#PR0P8QVQ" }, { nick: "Rhz", tag: "#89PVJG9R0" }, { nick: "Juan Carlos", tag: "#PR9U2JL" } ] },
            { id_time: "ENO", nome_time: "ENOSIS", jogadores: [ { nick: "Magic🎩", tag: "#2QCCC29QV" }, { nick: "REI DO FUT", tag: "#RVL0RPR9" }, { nick: "Fantas🌖", tag: "#PU20LUCQG" } ] },
            { id_time: "NS", nome_time: "NINGUEM SEGURA", jogadores: [ { nick: "Tufa", tag: "#CQLR0Y80" }, { nick: "Enid", tag: "#2JGP0LYV2Q" }, { nick: "Red Eyes", tag: "#CUGVUYPG" } ] },
            { id_time: "OCX", nome_time: "OCX DIVISION", jogadores: [ { nick: "FireMirillo", tag: "#2GV09VJJP" }, { nick: "Satisfiyer", tag: "#PLJ8VQY2C" }, { nick: "Star Lipi", tag: "#2UQCCG92VG" } ] }
        ],
       "TIER B": [
                { id_time: "CB", nome_time: "CRECHE BRAWL", jogadores: [ { nick: "Tilo", tag: "#80VLPJCCC" }, { nick: "Bielz", tag: "#9Q22C88V8" }, { nick: "Yichy", tag: "#2LVGCJ2UQR" } ] },
                { id_time: "ZRT", nome_time: "ZURITA GANG", jogadores: [ { nick: "Jxcccr", tag: "#820JCJJG" }, { nick: "Exic", tag: "#RCYQUJU0" }, { nick: "", tag: "#" } ] },
                { id_time: "OCXA", nome_time: "OCX DIVISION ACADEMY", jogadores: [ { nick: "Sterixx", tag: "#2P8RVJVUY" }, { nick: "", tag: "#" }, { nick: "", tag: "#" } ] },
                { id_time: "QQQ", nome_time: "QUEROQUEQUE", jogadores: [ { nick: "Deykonn", tag: "#GJPVYUQG" }, { nick: "B4st", tag: "#2CJ0RCJ" }, { nick: "Todd", tag: "#22PGQU98R" } ] }
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
            { id_time: "BOB", nome_time: "BOBBY F/A", jogadores: [ { nick: "Bobby", tag: "#LVRRYPV" }, { nick: "Patch", tag: "#RLLRJ2" }, { nick: "Sans", tag: "#QUYCVC2" } ] },
            { id_time: "TRB", nome_time: "TRIBE GAMING", jogadores: [ { nick: "Lxffy", tag: "#82RCQCVG" }, { nick: "RBM", tag: "#U9GC8G02" }, { nick: "Diegogamer", tag: "#QLCJGQUP" } ] },
        ],
        "TIER A": [
            { id_time: "TE", nome_time: "TEAM ELEKTROS", jogadores: [ { nick: "Snoiy", tag: "#YUJ8PJ0LR" }, { nick: "Memxn", tag: "#PJPPY9LRC" }, { nick: "Doin", tag: "#8CRU0PQRQ" } ] },
            { id_time: "HML", nome_time: "F/A HOMELESS", jogadores: [ { nick: "Tyrant", tag: "#VPVLG2" }, { nick: "Xemp", tag: "#2P9CJVGJ8" }, { nick: "Ducky", tag: "#20P2GP99" } ] },
            { id_time: "NOVA", nome_time: "NOVA", jogadores: [ { nick: "PaiN", tag: "#GVLRUG9Q" }, { nick: "Squeezy", tag: "#R80QRP0G" }, { nick: "Kiritom", tag: "#LU8C9YJU" } ] },
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
            { id_time: "HMBLE", nome_time: "HMBLE", jogadores: [ { nick: "Symantec", tag: "#YQUCCJ2"}, { nick: "BosS", tag: "#V89Y2GP0" }, { nick: "Lukii", tag: "#8V92UYCJ" } ] }

        ],
    "TIER A": [
            { id_time: "KUMA", nome_time: "KUMA", jogadores: [ { nick: "Dompe", tag: "#2208QGGGL" }, { nick: "Mine", tag: "#V888YPGU" }, { nick: "Nes", tag: "#Q808R2CV" } ] },
            { id_time: "NAVI", nome_time: "NAVI", jogadores: [ { nick: "Enraged", tag: "#80PVPCC29" }, { nick: "GeRo", tag: "#2VJCCCQGP" }, { nick: "Drage", tag: "#J089RQ" } ] },
            { id_time: "MZP", nome_time: "METIZPORT", jogadores: [ { nick: "Decaii", tag: "#2Y822YJYJC" }, { nick: "Ćiro", tag: "#2RR2RU8UL" }, { nick: "Remica", tag: "#Y8PLP8VY" } ] },     
            { id_time: "SK", nome_time: "SK GAMING", jogadores: [ { nick: "Ope", tag: "#9LVUC2PY" }, { nick: "Yoshi825", tag: "#CJV2PJ0R" }, { nick: "Yoko", tag: "#29VRJU08C" } ] },
            { id_time: "TH", nome_time: "TEAM HERETICS", jogadores: [ { nick: "IKaoss", tag: "#PCPRPJV" }, { nick: "Marco", tag: "#Q22ULY9JY" }, { nick: "Subeme", tag: "#2JQU8JQ2G" } ] },
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
            { id_time: "IGM", nome_time: "IGNUM", jogadores: [ { nick: "Shigemyon", tag: "#2RQQ9PGC" }, { nick: "Drake", tag: "#2CJG2GGCGP" }, { nick: "Nyade", tag: "2UQVY2JL2V#" } ] },
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
            { id_time: "RED", nome_time: "RED CANIDS", jogadores: [ { nick: "Jubileubr", tag: "#GVYLVUGR" }, { nick: "CAUEBR", tag: "#JQ8L0YYL" }, { nick: "Mohtep", tag: "#R2LR2QLG" } ] }
        ],
        "TIER A": [
            { id_time: "LOUD", nome_time: "LOUD", jogadores: [ { nick: "KaioDog", tag: "#GGUQCG0G" }, { nick: "FireCrow", tag: "#JQ8LLLY" }, { nick: "Edinho", tag: "#QJULVGU" } ] },
            { id_time: "OS", nome_time: "OLIMPO SQUAD", jogadores: [ { nick: "Golden", tag: "#9QCJPL20" }, { nick: "Brabao", tag: "#L9PQUV0YC" }, { nick: "Pekka", tag: "#JVRCVJ9Q" } ] },
            { id_time: "GLXY", nome_time: "GALAXY", jogadores: [ { nick: "Doritos🐉", tag: "#202GJJR28" }, { nick: "Derpp🐰ᩚ", tag: "#2QG9LQQC8Y" }, { nick: "IceCrow", tag: "#9CPYUCGQC" } ] },
            { id_time: "SKC", nome_time: "SKCalalas SA", jogadores: [ { nick: "Kr ;)", tag: "#PR0P8QVQ" }, { nick: "Rhz", tag: "#89PVJG9R0" }, { nick: "Juan Carlos", tag: "#PR9U2JL" } ] },
            { id_time: "ENO", nome_time: "ENOSIS", jogadores: [ { nick: "Magic🎩", tag: "#2QCCC29QV" }, { nick: "REI DO FUT", tag: "#RVL0RPR9" }, { nick: "Fantas🌖", tag: "#PU20LUCQG" } ] },
            { id_time: "OCX", nome_time: "OCX DIVISION", jogadores: [ { nick: "FireMirillo", tag: "#2GV09VJJP" }, { nick: "Satisfiyer", tag: "#PLJ8VQY2C" }, { nick: "Star Lipi", tag: "#2UQCCG92VG" } ] }
        ],
        "TIER B": [
                { id_time: "CB", nome_time: "CRECHE BRAWL", jogadores: [ { nick: "Tilo", tag: "#80VLPJCCC" }, { nick: "Bielz", tag: "#9Q22C88V8" }, { nick: "Yichy", tag: "#2LVGCJ2UQR" } ] },
                { id_time: "ZRT", nome_time: "ZURITA GANG", jogadores: [ { nick: "Jxcccr", tag: "#820JCJJG" }, { nick: "Exic", tag: "#RCYQUJU0" }, { nick: "", tag: "#" } ] },
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
            { id_time: "HML", nome_time: "F/A HOMELESS", jogadores: [ { nick: "Tyrant", tag: "#VPVLG2" }, { nick: "Xemp", tag: "#2P9CJVGJ8" }, { nick: "Ducky", tag: "#20P2GP99" } ] },
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
            { id_time: "HMBLE", nome_time: "HMBLE", jogadores: [ { nick: "Symantec", tag: "#YQUCCJ2"}, { nick: "BosS", tag: "#V89Y2GP0" }, { nick: "Lukii", tag: "#8V92UYCJ" } ] }

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
            { id_time: "IGM", nome_time: "IGNUM", jogadores: [ { nick: "Shigemyon", tag: "#2RQQ9PGC" }, { nick: "Drake", tag: "#2CJG2GGCGP" }, { nick: "Nyade", tag: "2UQVY2JL2V#" } ] },
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

    salvos.forEach(t => {
        let tierAlvo = t.tier && t.tier.trim() !== '' ? t.tier : 'TIMES REGISTRADOS';
        if (!CONFIGURACAO_MANUAL_TIMES[regAlvo][tierAlvo]) CONFIGURACAO_MANUAL_TIMES[regAlvo][tierAlvo] = [];
        CONFIGURACAO_MANUAL_TIMES[regAlvo][tierAlvo].push(t);
    });

    mesclarTimesSalvosEmRostersPorData();
}

function mesclarTimesSalvosEmRostersPorData() {
    if (_REGIAO === "ALL") return; 
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

function obterTiersDisponiveis() {
    let regAlvo = _REGIAO === "ALL" ? "ALL" : _REGIAO;
    let base = CONFIGURACAO_MANUAL_TIMES[regAlvo] || {};
    let tiers = Object.keys(base).filter(t => t !== 'TIER ?');
    let padrao = ['TIER S', 'TIER A', 'TIER B', 'TIER B-/C+', 'TIER C', 'TIMES REGISTRADOS'];
    padrao.forEach(p => { if (!tiers.includes(p)) tiers.push(p); });
    return tiers;
}

const formatImg = n => { if(!n) return 'default'; return n.toLowerCase().replace(/[^a-z0-9]/g, ''); };
const normalizarChave = n => { if(!n) return ''; return n.toLowerCase().replace(/[^a-z0-9]/g, ''); };

// ========================================================
// HELPERS DE LOGO DE TIME
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

// ========================================================
// HELPER: valida se os 3 titulares de um time cadastrado
// realmente estao jogando a partida (exige 3/3, nao 2/3).
// Usado para so contar uma partida como "scrim do time"
// quando o roster completo esta em campo.
// Times "UNKxx" gerados automaticamente ja nascem com os
// 3 tags batendo (ver processarTimesDesconhecidos), entao
// sao aceitos diretamente.
// ========================================================
function timeRosterCompleto(tagsDaPartida, idTime) {
    if (!idTime) return false;
    if (idTime.toUpperCase().startsWith('UNK')) return true;
    for (let reg in CONFIGURACAO_MANUAL_TIMES) {
        for (let tier in CONFIGURACAO_MANUAL_TIMES[reg]) {
            if (tier === "TIER ?") continue;
            let time = CONFIGURACAO_MANUAL_TIMES[reg][tier].find(t => t.id_time === idTime);
            if (time) {
                let tagsRoster = time.jogadores.map(j => j.tag).filter(t => t && t !== '#');
                if (tagsRoster.length < 3) return false;
                let matchCount = tagsDaPartida.filter(t => tagsRoster.includes(t)).length;
                return matchCount === 3;
            }
        }
    }
    return false;
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
    dadosPeriodo.forEach(r => { if(!rawMatches[r.id_partida]) rawMatches[r.id_partida] = []; rawMatches[r.id_partida].push(r); });

    let partidasEstruturadas = [];
    Object.values(rawMatches).forEach(linhas => {
        if(linhas.length < 6) return;
        let t0 = linhas.slice(0,3), t1 = linhas.slice(3,6);
        let t0Id = t0[0].id_time, t1Id = t1[0].id_time;
        if (_REGIAO !== "ALL" && !isTimeDaRegiaoAtual(t0Id) && !isTimeDaRegiaoAtual(t1Id)) return;

        // Ordem dos picks preservada EXATAMENTE como veio da biblioteca de dados (CSV),
        // pois t0/t1 sao fatias sequenciais das linhas originais (0-3 e 3-6), sem reordenar.
        partidasEstruturadas.push({
            id: linhas[0].id_partida, modo: linhas[0].modo, mapa: linhas[0].mapa,
            tAId: t0Id, tBId: t1Id, tANome: t0[0].nome_time, tBNome: t1[0].nome_time,
            picksA: t0.map(p => (p.pick||'').toUpperCase()), picksB: t1.map(p => (p.pick||'').toUpperCase()),
            tagsA: t0.map(p => p.player_tag), tagsB: t1.map(p => p.player_tag),
            t0Full: t0, t1Full: t1, vencedor: parseInt(t0[0].win) === 1 ? t0Id : t1Id, timestamp: parseDateBR(linhas[0].data_adicao),
            dataFormatada: linhas[0].data_adicao, tipo: linhas[0].tipo || 'scrim', isMatcherino: linhas[0].id_partida && linhas[0].id_partida.startsWith('mtcr_'),
            linhasOriginais: linhas
        });
    });

    let scrims = [];
    partidasEstruturadas.sort((a,b) => a.timestamp - b.timestamp).forEach(partida => {
        // Só conta como scrim do time quando os 3 titulares cadastrados do roster
        // realmente estiverem jogando dos dois lados (evita agrupar partidas com
        // jogadores substitutos/errados como se fossem do time oficial).
        if (!timeRosterCompleto(partida.tagsA, partida.tAId) || !timeRosterCompleto(partida.tagsB, partida.tBId)) return;

        let chaveTimes = [partida.tAId, partida.tBId].sort().join(' VS ');
        let scrimExistente = scrims.find(s => s.chave === chaveTimes && (partida.timestamp - s.ultimoUpdate) <= (2 * 60 * 60 * 1000));
        if(scrimExistente) {
            scrimExistente.sets.push(partida); scrimExistente.ultimoUpdate = partida.timestamp;
            if(partida.isMatcherino) scrimExistente.temMatcherino = true;
        } else {
            scrims.push({
                chave: chaveTimes, tAId: partida.tAId, tBId: partida.tBId, tANome: partida.tANome, tBNome: partida.tBNome,
                inicio: partida.timestamp, ultimoUpdate: partida.timestamp, dataFormatada: partida.dataFormatada.split(' ')[0], sets: [partida], tipo: partida.tipo, temMatcherino: partida.isMatcherino || false
            });
        }
    });

    let dadosMD3Condensados = [];
    scrims.forEach(scrim => {
        let roundsMD3 = [];
        let currentSets = [];
        let winsA = 0, winsB = 0;
        let scoreScrimA = 0, scoreScrimB = 0;

        const fecharRound = (setsDoRound) => {
            if (setsDoRound.length === 0) return;
            let vencedorRound = winsA > winsB ? scrim.tAId : scrim.tBId;
            if(winsA > winsB) scoreScrimA++; else if(winsB > winsA) scoreScrimB++;
            
            let firstSet = setsDoRound[0];
            roundsMD3.push({
                sets: setsDoRound,
                vencedor: vencedorRound,
                scoreA: winsA,
                scoreB: winsB,
                modo: firstSet.modo,
                mapa: firstSet.mapa,
                dataFormatada: firstSet.dataFormatada,
                tAId: scrim.tAId, tBId: scrim.tBId,
                tANome: scrim.tANome, tBNome: scrim.tBNome,
                firstSet: firstSet 
            });

            firstSet.linhasOriginais.forEach(linha => {
                let novaLinha = { ...linha };
                novaLinha.win = (novaLinha.id_time === vencedorRound) ? "1" : "0";
                dadosMD3Condensados.push(novaLinha);
            });
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

    scrims = scrims.filter(s => s.roundsMD3.length > 0).reverse();
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
        return mA && mM && mD && mT && isTimeDaRegiaoAtual(row.id_time);
    };

    let dadosRaw = dadosBrutos.filter(filterFn);
    dadosBansFiltrados = dadosBans.filter(filterFn);

    let estruturado = estruturarMD3(dadosRaw);
    dadosFiltrados = estruturado.dadosCondensados; 

    renderizarMeta();
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
    let mapasAgregados = {};

    // Função auxiliar para juntar mapas sem duplicá-los
    const adicionarMapas = (rotacao) => {
        for (let modo in rotacao) {
            if (!mapasAgregados[modo]) mapasAgregados[modo] = new Set();
            rotacao[modo].forEach(mapa => mapasAgregados[modo].add(mapa));
        }
    };

    if (ano !== 'todos' && mes !== 'todos') {
        // Filtro específico (Ex: Ano 2026, Mês 07)
        if (ROTACAO_MAPAS[ano] && ROTACAO_MAPAS[ano][mes]) {
            adicionarMapas(ROTACAO_MAPAS[ano][mes]);
        }
    } else if (ano !== 'todos' && mes === 'todos') {
        // Filtro de ano específico, mas pegando todos os meses
        if (ROTACAO_MAPAS[ano]) {
            for (let m in ROTACAO_MAPAS[ano]) {
                adicionarMapas(ROTACAO_MAPAS[ano][m]);
            }
        }
    } else {
        // Filtro "TODOS": Agrega todos os anos e todos os meses cadastrados
        for (let a in ROTACAO_MAPAS) {
            for (let m in ROTACAO_MAPAS[a]) {
                adicionarMapas(ROTACAO_MAPAS[a][m]);
            }
        }
    }

    // Converte os Sets (que evitaram repetição) de volta para Arrays para a renderização
    let resultado = {};
    for (let modo in mapasAgregados) {
        resultado[modo] = Array.from(mapasAgregados[modo]);
    }

    return Object.keys(resultado).length > 0 ? resultado : null;
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

    const montarCardMapa = (modeKeyReal, mapaConfig) => {
        let mapaKeyReal = modeKeyReal && sMap[modeKeyReal] ? Object.keys(sMap[modeKeyReal]).find(m => normalizarChave(m) === normalizarChave(mapaConfig)) : null;
        let brawlers = mapaKeyReal ? sMap[modeKeyReal][mapaKeyReal] : null;
        let valid = brawlers ? Object.entries(brawlers).filter(x => x[1].picks >= samplePicks).sort((a,b) => b[1].picks - a[1].picks) : [];
        let bNMap = (modeKeyReal && mapaKeyReal && bMap[modeKeyReal] && bMap[modeKeyReal][mapaKeyReal]) ? bMap[modeKeyReal][mapaKeyReal] : {};
        let tJM = (modeKeyReal && mapaKeyReal && jBMap[modeKeyReal] && jBMap[modeKeyReal][mapaKeyReal]) ? jBMap[modeKeyReal][mapaKeyReal].size : 0, tBM = tJM > 0;
        // PR% = picks do brawler / soma dos picks de TODOS os brawlers desta mesma tabela (mesmo modo+mapa, respeitando os filtros ativos)
        let totalPicksTabela = brawlers ? Object.values(brawlers).reduce((acc, x) => acc + x.picks, 0) : 0;

        return `
            <div style="background:var(--bg-geral); border:1px solid var(--borda-destaque); border-radius:8px; padding:15px; min-width:0;">
                <div style="text-align:center; font-weight:bold; margin-bottom:10px; color:var(--texto-secundario);">${mapaConfig.toUpperCase()}</div>
                ${valid.length > 0 ? `
                <div style="overflow-x:auto;">
                <table class="excel-table" style="width:100%; table-layout:auto; border-collapse:collapse;">
                    <thead><tr>
                        <th style="text-align:left; white-space:nowrap; padding:5px 8px; color:#898989;">BRAWLER</th>
                        <th style="white-space:nowrap; padding:5px 8px; color:#898989;" >P</th>
                        <th style="white-space:nowrap; padding:5px 8px; color:#00ffff;">PR%</th>
                        <th style="white-space:nowrap; padding:5px 8px; color:#898989;">W</th>
                        <th style="white-space:nowrap; padding:5px 8px; color:#ff00ff;">WR%</th>
                        <th style="white-space:nowrap; padding:5px 8px; color:#ff0000;">B</th>
                        <th style="white-space:nowrap; padding:5px 8px; color:#ff0000;">BR%</th>
                    </tr></thead>
                    <tbody>
                        ${valid.map(([b, s]) => {
                            let bc = bNMap[b] || 0, brPct = tBM ? ((bc / tJM) * 100).toFixed(1) : '0.0';
                            return `<tr>
                                <td style="text-align:left; font-weight:bold; color:var(--accent-hover); white-space:nowrap; padding:5px 8px;"><img src="brawlers/${formatImg(b)}.png" style="width:24px; vertical-align:middle; margin-right:5px; border-radius:4px;" onerror="this.src='brawlers/default.png'">${b}</td>
                                <td style="padding:5px 8px;">${s.picks}</td><td style="color: #00ffff; padding:5px 8px;">${(totalPicksTabela > 0 ? ((s.picks/totalPicksTabela)*100) : 0).toFixed(1)}%</td><td style="padding:5px 8px;">${s.wins}</td><td class="winrate-cell" style="padding:5px 8px;">${((s.wins/s.picks)*100).toFixed(1)}%</td>
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
            let modeKeyReal = Object.keys(sMap).find(m => normalizarChave(m) === normalizarChave(modoConfig)) || null;
            let cleanMode = formatImg(modoConfig);
            let conteudoMapa = mapasConfig.map(mapaConfig => montarCardMapa(modeKeyReal, mapaConfig)).join('');
            html += `<div class="modo-card" onclick="toggleModoMeta('${cleanMode}')"><img src="element/modes/${cleanMode}.png" style="width:40px; margin-right:15px;" onerror="this.src='element/modes/default.png'">${modoConfig}</div><div id="modo-content-${cleanMode}" class="modo-section" style="display:none; padding:15px;"><div class="mapa-content" style="display:grid; grid-template-columns:repeat(3, minmax(300px, 1fr)); gap:15px; align-items:start;">${conteudoMapa}</div></div>`;
        });
    } else {
        Object.entries(sMap).forEach(([mode, mapasDict]) => {
            let cleanMode = formatImg(mode);
            let conteudoMapa = Object.keys(mapasDict).map(mapa => montarCardMapa(mode, mapa)).join('');
            if (conteudoMapa !== '') html += `<div class="modo-card" onclick="toggleModoMeta('${cleanMode}')"><img src="element/modes/${cleanMode}.png" style="width:40px; margin-right:15px;" onerror="this.src='element/modes/default.png'">${mode}</div><div id="modo-content-${cleanMode}" class="modo-section" style="display:none; padding:15px;"><div class="mapa-content" style="display:grid; grid-template-columns:repeat(3, minmax(300px, 1fr)); gap:15px; align-items:start;">${conteudoMapa}</div></div>`;
        });
    }

    let bAllVal = Object.entries(sAll).filter(x => x[1].picks >= samplePicks).sort((a,b) => b[1].picks - a[1].picks);
    // PR% = picks do brawler / soma dos picks de TODOS os brawlers desta mesma tabela (ALL MAPS), respeitando os filtros ativos
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
                            <td style="text-align:left; font-weight:bold; color:var(--winrate-color)"><img src="brawlers/${formatImg(b)}.png" style="width:28px; vertical-align:middle; margin-right:10px; border-radius:4px;" onerror="this.src='brawlers/default.png'">${b}</td>
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
            ${topMapas.map(([m, s]) => `<div style="background:var(--bg-cards); padding:15px; border-radius:8px; border:1px solid var(--borda-destaque); text-align:center;"><img src="element/maps/${formatImg(m)}.png" style="width:100%; max-width:220px; height:100px; object-fit:cover; border-radius:6px; margin-bottom:10px; border:1px solid var(--borda-suave);" onerror="this.src='element/maps/default.png'"><div style="font-weight:900; font-size:14px; margin-bottom:8px;">${m}</div><div style="font-size:13px; color:var(--texto-secundario); display:flex; justify-content:center; gap:10px;"><span>P: <strong style="color:#fff">${s.picks}</strong></span><span>PR: <strong style="color:#fff">${((s.picks/totalPicks)*100).toFixed(1)}%</strong></span></div><div style="font-size:13px; color:var(--texto-secundario); display:flex; justify-content:center; gap:10px; margin-top:5px;"><span>W: <strong style="color:#fff">${s.wins}</strong></span><span>WR: <strong class="winrate-cell">${((s.wins/s.picks)*100).toFixed(1)}%</strong></span></div></div>`).join('')}
        </div>
        <div class="synergy-grid">
            <div class="synergy-box"><h3 style="color:var(--winrate-color); margin-bottom:15px; font-size:14px;">BOM CONTRA (Adversários)</h3>${countersTop.map(c => `<div class="synergy-item"><div style="display:flex; align-items:center;"><img src="brawlers/${formatImg(c.nome)}.png" onerror="this.src='brawlers/default.png'"><span style="font-weight:bold; font-size:13px;">${c.nome}</span></div><div style="text-align:right; font-size:12px; display:flex; gap:10px; font-weight:bold;"><div style="display:flex; flex-direction:column; color:var(--texto-secundario);"><span>P: ${c.matches}</span><span>PR%: ${c.pr.toFixed(1)}%</span></div><div style="display:flex; flex-direction:column;"><span>W: <span style="color:#fff">${c.wins}</span></span><span style="color:var(--winrate-color);">WR%: ${c.wr.toFixed(1)}%</span></div></div></div>`).join('') || '<p style="font-size:12px; color:var(--texto-secundario);">Sem dados</p>'}</div>
            <div class="synergy-box"><h3 style="color:var(--loss-color); margin-bottom:15px; font-size:14px;">RUIM CONTRA (Adversários)</h3>${counteradosTop.map(c => `<div class="synergy-item"><div style="display:flex; align-items:center;"><img src="brawlers/${formatImg(c.nome)}.png" onerror="this.src='brawlers/default.png'"><span style="font-weight:bold; font-size:13px;">${c.nome}</span></div><div style="text-align:right; font-size:12px; display:flex; gap:10px; font-weight:bold;"><div style="display:flex; flex-direction:column; color:var(--texto-secundario);"><span>P: ${c.matches}</span><span>PR%: ${c.pr.toFixed(1)}%</span></div><div style="display:flex; flex-direction:column;"><span>L: <span style="color:#fff">${c.losses}</span></span><span style="color:var(--loss-color);">WR%: ${c.wr.toFixed(1)}%</span></div></div></div>`).join('') || '<p style="font-size:12px; color:var(--texto-secundario);">Sem dados</p>'}</div>
            <div class="synergy-box" style="grid-column: 1 / -1;"><h3 style="color:var(--synergy-color); margin-bottom:15px; font-size:14px;">TOP 5 SINERGIAS (Brawlers Juntos)</h3><div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap:15px;">${sinergiasTop.map(c => `<div style="background:var(--bg-paineis); padding:15px; border-radius:8px; text-align:center; border:1px solid var(--borda-suave);"><img src="brawlers/${formatImg(c.nome)}.png" style="width:40px; height:40px; border-radius:6px; margin-bottom:8px; object-fit:cover;" onerror="this.src='brawlers/default.png'"><div style="font-weight:900; font-size:14px; margin-bottom:5px;">${c.nome}</div><div style="font-size:12px; color:var(--texto-secundario); font-weight:bold;">P: ${c.matches} | PR%: ${c.pr.toFixed(1)}%</div><div style="font-size:12px; color:var(--texto-secundario); font-weight:bold; margin-top:2px;">W: <span style="color:#fff">${c.wins}</span> | <span style="color:var(--winrate-color)">WR%: ${c.wr.toFixed(1)}%</span></div></div>`).join('') || '<p style="font-size:12px; color:var(--texto-secundario);">Sem dados</p>'}</div></div>
        </div>`;
}

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
            let div = document.createElement('div'); div.className = 'sidebar-item';
            div.innerHTML = `<img src="${teamLogoUrl(t.id_time)}" style="width:24px; height:24px; object-fit:contain; border-radius:4px;" onerror="${teamLogoOnError(t.id_time)}"> <span style="font-weight:bold;">${t.nome_time}</span>`;
            div.onclick = () => { document.querySelectorAll('#lista-times-sidebar .sidebar-item').forEach(i => i.classList.remove('active')); div.classList.add('active'); timeSelecionado = t; renderizarDetalhesTime(t); };
            sidebar.appendChild(div);
        });
    }
}

function renderizarDetalhesTime(time) {
    const painel = document.getElementById('painel-info-time');
    let partidasDoTime = dadosFiltrados.filter(r => r.id_time === time.id_time);
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

    let novoTime = { id_time: novoId, nome_time: novoNome, jogadores: jogadoresFinais, tier: tierEscolhido };

    let salvos = JSON.parse(localStorage.getItem('customTeams_' + _REGIAO)) || [];
    salvos = salvos.filter(t => t.id_time !== novoId && t.id_time !== idAntigo);
    salvos.push(novoTime);
    localStorage.setItem('customTeams_' + _REGIAO, JSON.stringify(salvos));

    let regAlvo = _REGIAO === "ALL" ? "ALL" : _REGIAO;
    if (CONFIGURACAO_MANUAL_TIMES[regAlvo] && CONFIGURACAO_MANUAL_TIMES[regAlvo]["TIER ?"]) {
        CONFIGURACAO_MANUAL_TIMES[regAlvo]["TIER ?"] = CONFIGURACAO_MANUAL_TIMES[regAlvo]["TIER ?"].filter(t => t.id_time !== idAntigo);
    }
    if (!CONFIGURACAO_MANUAL_TIMES[regAlvo][tierEscolhido]) CONFIGURACAO_MANUAL_TIMES[regAlvo][tierEscolhido] = [];
    CONFIGURACAO_MANUAL_TIMES[regAlvo][tierEscolhido].push(novoTime);
    mesclarTimesSalvosEmRostersPorData();

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
        let isTournament = scrim.sets.some(r => r.tipo === 'tournament') || scrim.temMatcherino;
        let icon = isTournament ? `<img src="element/play/matcherino.png" style="position:absolute; top:10px; right:12px; width:22px; height:22px; object-fit:contain;" onerror="this.style.display='none'" title="Torneio">` : '';

        let aGanhou = scrim.scoreA > scrim.scoreB, bGanhou = scrim.scoreB > scrim.scoreA;
        let corA = aGanhou ? 'var(--winrate-color, #2ecc71)' : '#fff';
        let corB = bGanhou ? 'var(--winrate-color, #2ecc71)' : '#fff';

        div.style.cssText = 'position:relative; display:grid; grid-template-columns:1fr auto 1fr; align-items:center; gap:14px; min-height:120px; padding:22px 20px 34px; cursor:pointer;';

        div.innerHTML = `
            ${icon}
            <div class="scrim-team-info" style="display:flex; align-items:center; gap:10px; min-width:0;">
                <img src="${teamLogoUrl(scrim.tAId)}" class="scrim-team-logo" style="width:42px; height:42px; object-fit:contain; border-radius:6px; flex-shrink:0;" onerror="${teamLogoOnError(scrim.tAId)}">
                <span style="font-weight:900; font-size:15px; color:${corA}; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;" title="${scrim.tANome}">${scrim.tANome}</span>
            </div>
            <div class="scrim-score" style="font-size:26px; font-weight:900; white-space:nowrap; text-align:center;"><span style="color:${corA};">${scrim.scoreA}</span> <span style="color:var(--texto-secundario);">-</span> <span style="color:${corB};">${scrim.scoreB}</span></div>
            <div class="scrim-team-info" style="display:flex; flex-direction:row-reverse; align-items:center; gap:10px; min-width:0;">
                <img src="${teamLogoUrl(scrim.tBId)}" class="scrim-team-logo" style="width:42px; height:42px; object-fit:contain; border-radius:6px; flex-shrink:0;" onerror="${teamLogoOnError(scrim.tBId)}">
                <span style="font-weight:900; font-size:15px; color:${corB}; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;" title="${scrim.tBNome}">${scrim.tBNome}</span>
            </div>
            <div style="position:absolute; bottom:10px; left:18px; font-size:11px; color:var(--texto-secundario); font-weight:bold;">${scrim.dataFormatada}</div><div style="position:absolute; bottom:10px; right:18px; font-size:11px; color:var(--texto-secundario); font-weight:bold;">Rounds: ${scrim.roundsMD3.length}</div>
        `;
        div.onclick = () => renderizarDetalheScrim(scrim);
        lista.appendChild(div);
    });
}

function renderizarDetalheScrim(scrim) {
    const lista = document.getElementById('scrims-lista'), detalhe = document.getElementById('scrims-detalhe');
    lista.style.display = 'none'; detalhe.style.display = 'block';

    let playersA = [...new Set(scrim.sets.flatMap(r => r.t0Full.map(p => p.player_name)))].slice(0,3);
    let playersB = [...new Set(scrim.sets.flatMap(r => r.t1Full.map(p => p.player_name)))].slice(0,3);

    let aGanhou = scrim.scoreA > scrim.scoreB, bGanhou = scrim.scoreB > scrim.scoreA;
    let corA = aGanhou ? 'var(--winrate-color, #2ecc71)' : '#fff';
    let corB = bGanhou ? 'var(--winrate-color, #2ecc71)' : '#fff';

    detalhe.innerHTML = `
        <button onclick="document.getElementById('scrims-lista').style.display='grid'; document.getElementById('scrims-detalhe').style.display='none';" style="background:transparent; border:2px solid var(--accent-purple); color:var(--accent-purple); padding:8px 20px; font-weight:bold; border-radius:6px; cursor:pointer; margin-bottom:30px;">← VOLTAR</button>
        <div class="scrim-detail-header">
            <div style="display:flex; justify-content:center; align-items:flex-start; gap:40px;">
                <div style="text-align:center;">
                    <!-- Logos maiores e sem moldura no fundo -->
                    <img src="${teamLogoUrl(scrim.tAId)}" style="height:120px; object-fit:contain; background:transparent; border:none;" onerror="${teamLogoOnError(scrim.tAId)}">
                    <div style="font-size:11px; color:var(--texto-secundario); display:flex; gap:8px; justify-content:center; margin-top:8px; font-weight:bold;">${playersA.map(p => `<span>${p}</span>`).join('')}</div>
                </div>
                <div style="font-size:42px; font-weight:900; line-height:120px;">
                    <span style="color:${corA};">${scrim.scoreA}</span> <span style="color:var(--accent-purple)">-</span> <span style="color:${corB};">${scrim.scoreB}</span>
                </div>
                <div style="text-align:center;">
                    <!-- Logos maiores e sem moldura no fundo -->
                    <img src="${teamLogoUrl(scrim.tBId)}" style="height:120px; object-fit:contain; background:transparent; border:none;" onerror="${teamLogoOnError(scrim.tBId)}">
                    <div style="font-size:11px; color:var(--texto-secundario); display:flex; gap:8px; justify-content:center; margin-top:8px; font-weight:bold;">${playersB.map(p => `<span>${p}</span>`).join('')}</div>
                </div>
            </div>
        </div>
        
        <div class="scrim-rounds-container" id="rounds-scroll" style="display:flex; flex-wrap:wrap; gap:10px; overflow:visible; max-height:none; width:100%; margin-top: 20px;">
        ${scrim.roundsMD3.map((r, i) => {
            let venceuA = r.vencedor === r.tAId;
            let corRound = venceuA ? 'var(--winrate-color, #2ecc71)' : 'var(--loss-color, #e74c3c)';
            let nomeVencedorRound = venceuA ? r.tANome : r.tBNome;
            return `<div class="scrim-round-btn ${i === 0 ? 'active' : ''}" onclick="window.selecionarRoundMD3(${i}, this)" style="flex:0 0 auto; padding: 10px;">
                <div style="display: flex; align-items: baseline; gap: 6px; margin-bottom: 5px;">
                    <!-- Número do round maior -->
                    <span style="font-size:15px; font-weight:900; color:var(--accent-purple);">ROUND ${i+1}</span>
                    <!-- Placar de Sets ao lado e menor -->
                    <span style="font-size:11px; font-weight:bold; color:var(--texto-secundario);">(Sets: ${r.scoreA}-${r.scoreB})</span>
                </div>
                <img src="element/modes/${formatImg(r.modo)}.png" onerror="this.src='element/modes/default.png'">
                <span style="display:block; margin-top:4px; font-size:11px; font-weight:900; color:${corRound}; max-width:120px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;" title="${nomeVencedorRound}">${nomeVencedorRound}</span>
            </div>`;
        }).join('')}
        </div>
        <div id="round-view-container" style="margin-top: 25px;"></div>
    `;
    window.scrimAtual = scrim; 
    window.selecionarRoundMD3(0, detalhe.querySelector('.scrim-round-btn'));
}

window.selecionarRoundMD3 = function(index, btnElement) {
    document.querySelectorAll('.scrim-round-btn').forEach(b => b.classList.remove('active'));
    if(btnElement) btnElement.classList.add('active');

    let roundMD3 = window.scrimAtual.roundsMD3[index];
    let firstSet = roundMD3.firstSet; 
    const container = document.getElementById('round-view-container');

    let venceuA = roundMD3.vencedor === window.scrimAtual.tAId;
    let corSetA = venceuA ? 'var(--winrate-color, #2ecc71)' : '#fff';
    let corSetB = !venceuA ? 'var(--winrate-color, #2ecc71)' : '#fff';

    let playersA = firstSet.t0Full.map(p => p.player_name), playersB = firstSet.t1Full.map(p => p.player_name);
    let bansDoRound = dadosBans.filter(r => r.id_partida === firstSet.id);
    let bansTimeA   = bansDoRound.filter(r => r.id_time === window.scrimAtual.tAId), bansTimeB   = bansDoRound.filter(r => r.id_time === window.scrimAtual.tBId);
    let temBans     = bansTimeA.length > 0 || bansTimeB.length > 0;

container.innerHTML = `
    <div class="round-details-view" style="background: var(--bg-cards); padding: 25px; border-radius: 12px; border: 1px solid var(--borda-destaque);">
        
        <div class="picks-container" style="display:flex; justify-content:center; align-items:center; gap: 40px; margin-top: 15px;">
            
            <div style="display:flex; flex-direction:column; gap:15px; color:${corSetA};">
                ${playersA.map((p, index) => {
                    let pickBrawler = firstSet.picksA ? firstSet.picksA[index] : '';
                    return `<div style="display:flex; flex-direction:column; align-items:center; gap:5px; position:relative;">
                        <span style="position:absolute; top:-8px; left:-8px; background:var(--accent-purple); color:#fff; font-size:10px; font-weight:900; padding:2px 6px; border-radius:10px; z-index:1;">PICK ${index+1}</span>
                        <img src="brawlers/${formatImg(pickBrawler)}.png" style="width: 75px; height: 75px; border-radius: 8px; object-fit: cover; border: 2px solid ${venceuA ? 'var(--winrate-color, #2ecc71)' : 'var(--borda-suave, #555)'};" onerror="this.src='brawlers/default.png'">
                        <span style="font-size:12px; font-weight:900;">${p}</span>
                    </div>`;
                }).join('')}
            </div>
            
            <div style="text-align:center;">
                <img src="element/maps/${formatImg(roundMD3.mapa)}.png" style="width: 250px; border-radius: 10px; object-fit: cover; border: 2px solid var(--borda-destaque);" onerror="this.src='element/maps/default.png'">
                <p style="margin-top:10px; font-size:14px; color:var(--texto-secundario); font-weight:bold;">
                    ${roundMD3.mapa.toUpperCase()}
                </p>
            </div>

            <div style="display:flex; flex-direction:column; gap:15px; color:${corSetB};">
                ${playersB.map((p, index) => {
                    let pickBrawler = firstSet.picksB ? firstSet.picksB[index] : '';
                    return `<div style="display:flex; flex-direction:column; align-items:center; gap:5px; position:relative;">
                        <span style="position:absolute; top:-8px; left:-8px; background:var(--accent-purple); color:#fff; font-size:10px; font-weight:900; padding:2px 6px; border-radius:10px; z-index:1;">PICK ${index+1}</span>
                        <img src="brawlers/${formatImg(pickBrawler)}.png" style="width: 75px; height: 75px; border-radius: 8px; object-fit: cover; border: 2px solid ${!venceuA ? 'var(--winrate-color, #2ecc71)' : 'var(--borda-suave, #555)'};" onerror="this.src='brawlers/default.png'">
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
            
            // Remove listener antigo se existir (evita duplicidade caso seja chamado várias vezes)
            const newTh = th.cloneNode(true);
            th.parentNode.replaceChild(newTh, th);
            
            newTh.addEventListener('click', () => {
                const tbody = table.querySelector('tbody');
                if (!tbody) return;
                const rows = Array.from(tbody.querySelectorAll('tr'));
                const isAscending = newTh.classList.contains('asc');
                
                table.querySelectorAll('th').forEach(h => h.classList.remove('asc', 'desc'));
                newTh.classList.add(isAscending ? 'desc' : 'asc');
                
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

// ==========================================
// MÓDULO MAPAS: RENDERIZAÇÃO E ESTATÍSTICAS
// ==========================================

function renderizarSidebarMapas() {
    const sidebar = document.getElementById('sidebar-mapas');
    if (!sidebar) return;
    
    // Identificar todos os modos e mapas disponíveis nos dados filtrados
    let modosMapas = {};
    dadosFiltrados.forEach(r => {
        let modo = r.modo || "Desconhecido";
        let mapa = r.mapa || "Desconhecido";
        if(!modosMapas[modo]) modosMapas[modo] = new Set();
        modosMapas[modo].add(mapa);
    });

    let html = `<h3 style="margin-bottom: 15px; color: var(--accent-hover, #fff);">MODOS E MAPAS</h3>`;
    
    Object.keys(modosMapas).sort().forEach(modo => {
        let cleanMode = formatImg(modo);
        html += `
            <div style="margin-bottom: 15px;">
                <div style="display: flex; align-items: center; gap: 10px; font-weight: bold; font-size: 14px; background: rgba(255,255,255,0.05); padding: 8px; border-radius: 4px;">
                    <img src="element/modes/${cleanMode}.png" style="width: 20px;" onerror="this.src='element/modes/default.png'">
                    ${modo.toUpperCase()}
                </div>
                <div style="padding-left: 10px; margin-top: 5px;">
        `;
        
        Array.from(modosMapas[modo]).sort().forEach(mapa => {
            let cleanMap = formatImg(mapa);
            html += `
                <div class="sidebar-item" onclick="selecionarMapa('${modo}', '${mapa}')" style="display: flex; align-items: center; gap: 8px; padding: 6px; cursor: pointer; font-size: 13px;">
                    <img src="element/maps/${cleanMap}.png" style="width: 30px; height: 30px; object-fit: cover; border-radius: 4px;" onerror="this.src='element/maps/default.png'">
                    <span>${mapa}</span>
                </div>
            `;
        });
        html += `</div></div>`;
    });
    
    sidebar.innerHTML = html;
}

function selecionarMapa(modo, mapa) {
    mapaSelecionadoInfo = { modo, mapa };
    renderizarDetalhesMapa(modo, mapa);
}

function renderizarDetalhesMapa(modo, mapa) {
    const painel = document.getElementById('painel-info-mapa');
    if(!painel) return;

    // 1. Filtrar dados exclusivos deste mapa e modo
    let dadosMapa = dadosFiltrados.filter(r => r.modo === modo && r.mapa === mapa);
    if(dadosMapa.length === 0) {
        painel.innerHTML = `<p>Sem dados para este mapa nos filtros atuais.</p>`;
        return;
    }

    // 2. Agrupar por Partida e por Time para formar as Composições (3 Brawlers)
    let partidasAgrupadas = {}; 
    dadosMapa.forEach(r => {
        if(!partidasAgrupadas[r.id_partida]) partidasAgrupadas[r.id_partida] = {};
        if(!partidasAgrupadas[r.id_partida][r.id_time]) partidasAgrupadas[r.id_partida][r.id_time] = { brawlers: [], win: parseInt(r.win) === 1, timeNome: r.nome_time, data: r.data_adicao };
        partidasAgrupadas[r.id_partida][r.id_time].brawlers.push((r.pick||'').toUpperCase());
    });

    let statsBrawlers = {};
    let statsComps = {};
    let statsSinergias = {};
    let statsTimes = {};
    let historicoTimes = {}; // Para guardar as últimas comps de cada time

    let totalTimesJogaram = 0; // Usado para calcular o PickRate% base de Comps e Times

    Object.values(partidasAgrupadas).forEach(timesNaPartida => {
        Object.entries(timesNaPartida).forEach(([idTime, dadosTime]) => {
            if(dadosTime.brawlers.length !== 3) return; // Só avalia times com 3 picks registrados
            totalTimesJogaram++;

            let win = dadosTime.win;
            let brawlersOrdenados = [...dadosTime.brawlers].sort();
            
            // --- Brawlers Individuais ---
            brawlersOrdenados.forEach(b => {
                if(!statsBrawlers[b]) statsBrawlers[b] = { picks: 0, wins: 0 };
                statsBrawlers[b].picks++;
                if(win) statsBrawlers[b].wins++;
            });

            // --- Composições (3 Juntos) ---
            let compKey = brawlersOrdenados.join(' + ');
            if(!statsComps[compKey]) statsComps[compKey] = { picks: 0, wins: 0, brawlers: brawlersOrdenados };
            statsComps[compKey].picks++;
            if(win) statsComps[compKey].wins++;

            // --- Sinergias (2 Juntos) ---
            let pares = [
                [brawlersOrdenados[0], brawlersOrdenados[1]].join(' + '),
                [brawlersOrdenados[0], brawlersOrdenados[2]].join(' + '),
                [brawlersOrdenados[1], brawlersOrdenados[2]].join(' + ')
            ];
            pares.forEach(par => {
                if(!statsSinergias[par]) statsSinergias[par] = { picks: 0, wins: 0, brawlers: par.split(' + ') };
                statsSinergias[par].picks++;
                if(win) statsSinergias[par].wins++;
            });

            // --- Times ---
            if(!statsTimes[idTime]) statsTimes[idTime] = { nome: dadosTime.timeNome, matches: 0, wins: 0 };
            statsTimes[idTime].matches++;
            if(win) statsTimes[idTime].wins++;

            // --- Histórico de Comps do Time (Para o click) ---
            if(!historicoTimes[idTime]) historicoTimes[idTime] = [];
            historicoTimes[idTime].push({ comp: brawlersOrdenados, win: win, data: parseDateBR(dadosTime.data) || 0 });
        });
    });

    // Ordenar históricos (mais recentes primeiro)
    Object.keys(historicoTimes).forEach(id => {
        historicoTimes[id].sort((a,b) => b.data - a.data);
    });

    // Formatar arrays para renderização
    const formatRow = (obj, totalBase) => {
        let pr = ((obj.picks || obj.matches) / totalBase * 100).toFixed(1);
        let wr = ((obj.wins / (obj.picks || obj.matches)) * 100).toFixed(1);
        return { ...obj, pr, wr };
    };

    let arrBrawlers = Object.entries(statsBrawlers).map(([nome, d]) => formatRow({...d, nome}, totalTimesJogaram)).sort((a,b) => b.picks - a.picks);
    let arrComps = Object.values(statsComps).map(d => formatRow(d, totalTimesJogaram)).sort((a,b) => b.picks - a.picks).slice(0,5);
    let arrSinergias = Object.values(statsSinergias).map(d => formatRow(d, totalTimesJogaram)).sort((a,b) => b.picks - a.picks).slice(0,5);
    let arrTimes = Object.entries(statsTimes).map(([id, d]) => formatRow({...d, id}, totalTimesJogaram)).sort((a,b) => b.matches - a.matches).slice(0, 10);

    let cleanMap = formatImg(mapa);
    let cleanMode = formatImg(modo);

    // Salvar o histórico globalmente para o popup de clique
    window.historicoTimesMapa = historicoTimes;

    let html = `
        <!-- Cabeçalho do Mapa (Foto Média + Título) -->
        <div style="display: flex; gap: 20px; align-items: center; margin-bottom: 25px; background: rgba(0,0,0,0.2); padding: 15px; border-radius: 8px;">
            <img src="element/maps/${cleanMap}.png" style="width: 250px; height: 140px; object-fit: cover; border-radius: 8px; border: 2px solid var(--borda-destaque);" onerror="this.src='element/maps/default.png'">
            <div>
                <div style="display:flex; align-items:center; gap:8px; margin-bottom:5px;">
                    <img src="element/modes/${cleanMode}.png" style="width:24px;" onerror="this.src='element/modes/default.png'">
                    <span style="color:var(--texto-secundario); font-weight:bold;">${modo.toUpperCase()}</span>
                </div>
                <h2 style="font-size: 32px; margin: 0;">${mapa}</h2>
                <div style="margin-top:10px; font-size:12px; color:#888;">Total de Partidas no Filtro: ${totalTimesJogaram / 2}</div>
            </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
            
            <!-- Principais Comps (3 Brawlers) -->
            <div style="background: var(--bg-geral); padding: 15px; border-radius: 8px; border: 1px solid var(--borda-destaque);">
                <h3 style="margin-bottom: 15px; font-size: 14px;">👑 PRINCIPAIS COMPS (3 JUNTOS)</h3>
                <table class="excel-table" style="width: 100%;">
                    <thead><tr><th style="text-align:left;">Composição</th><th>P</th><th>PR%</th><th>W</th><th>WR%</th></tr></thead>
                    <tbody>
                        ${arrComps.map(c => `
                            <tr>
                                <td style="text-align:left; display:flex; gap:5px;">
                                    <img src="brawlers/${formatImg(c.brawlers[0])}.png" style="width:24px; border-radius:4px;" onerror="this.src='brawlers/default.png'">
                                    <img src="brawlers/${formatImg(c.brawlers[1])}.png" style="width:24px; border-radius:4px;" onerror="this.src='brawlers/default.png'">
                                    <img src="brawlers/${formatImg(c.brawlers[2])}.png" style="width:24px; border-radius:4px;" onerror="this.src='brawlers/default.png'">
                                </td>
                                <td>${c.picks}</td><td style="color:gray;">${c.pr}%</td><td>${c.wins}</td><td class="winrate-cell">${c.wr}%</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>

            <!-- Principais Sinergias (2 Brawlers) -->
            <div style="background: var(--bg-geral); padding: 15px; border-radius: 8px; border: 1px solid var(--borda-destaque);">
                <h3 style="margin-bottom: 15px; font-size: 14px;">🤝 PRINCIPAIS SINERGIAS (2 JUNTOS)</h3>
                <table class="excel-table" style="width: 100%;">
                    <thead><tr><th style="text-align:left;">Sinergia</th><th>P</th><th>PR%</th><th>W</th><th>WR%</th></tr></thead>
                    <tbody>
                        ${arrSinergias.map(c => `
                            <tr>
                                <td style="text-align:left; display:flex; gap:5px; align-items:center;">
                                    <img src="brawlers/${formatImg(c.brawlers[0])}.png" style="width:24px; border-radius:4px;" onerror="this.src='brawlers/default.png'">
                                    <span style="font-size:12px; color:gray;">+</span>
                                    <img src="brawlers/${formatImg(c.brawlers[1])}.png" style="width:24px; border-radius:4px;" onerror="this.src='brawlers/default.png'">
                                </td>
                                <td>${c.picks}</td><td style="color:gray;">${c.pr}%</td><td>${c.wins}</td><td class="winrate-cell">${c.wr}%</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
            
            <!-- Melhores Brawlers no Mapa -->
            <div style="background: var(--bg-geral); padding: 15px; border-radius: 8px; border: 1px solid var(--borda-destaque);">
                <h3 style="margin-bottom: 15px; font-size: 14px;">⭐ MELHORES BRAWLERS</h3>
                <div style="max-height: 250px; overflow-y: auto;">
                    <table class="excel-table" style="width: 100%;">
                        <thead><tr><th style="text-align:left;">Brawler</th><th>P</th><th>PR%</th><th>W</th><th>WR%</th></tr></thead>
                        <tbody>
                            ${arrBrawlers.map(b => `
                                <tr>
                                    <td style="text-align:left; font-weight:bold;">
                                        <img src="brawlers/${formatImg(b.nome)}.png" style="width:20px; vertical-align:middle; margin-right:5px; border-radius:4px;" onerror="this.src='brawlers/default.png'">
                                        ${b.nome}
                                    </td>
                                    <td>${b.picks}</td><td style="color:gray;">${b.pr}%</td><td>${b.wins}</td><td class="winrate-cell">${b.wr}%</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Melhores Times no Mapa -->
            <div style="background: var(--bg-geral); padding: 15px; border-radius: 8px; border: 1px solid var(--borda-destaque);">
                <h3 style="margin-bottom: 15px; font-size: 14px;">🛡️ MELHORES TIMES NESTE MAPA</h3>
                <div style="max-height: 250px; overflow-y: auto;">
                    <table class="excel-table" style="width: 100%;">
                        <thead><tr><th style="text-align:left;">Time (Clique)</th><th>Partidas</th><th>W</th><th>WR%</th></tr></thead>
                        <tbody>
                            ${arrTimes.map(t => `
                                <tr style="cursor:pointer;" onclick="mostrarHistoricoTimeMapa('${t.id}', '${t.nome}')" onmouseover="this.style.background='rgba(255,255,255,0.05)'" onmouseout="this.style.background='transparent'">
                                    <td style="text-align:left; font-weight:bold; display:flex; align-items:center; gap:8px;">
                                        <img src="${teamLogoUrl(t.id)}" style="width:20px; border-radius:4px;" onerror="this.onerror=null; this.src='${teamLogoFallback(t.id)}';">
                                        ${t.nome}
                                    </td>
                                    <td>${t.matches}</td><td>${t.wins}</td><td class="winrate-cell">${t.wr}%</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
        
        <!-- Container Modal para Histórico de Time (escondido por padrão) -->
        <div id="modal-historico-time-mapa" style="display:none; margin-top:20px; padding:15px; background:rgba(0,0,0,0.4); border-radius:8px; border:1px solid var(--borda-destaque);">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
                <h3 id="modal-historico-titulo" style="font-size:14px; margin:0;">ÚLTIMAS COMPS DO TIME</h3>
                <button onclick="document.getElementById('modal-historico-time-mapa').style.display='none'" style="background:transparent; border:none; color:white; cursor:pointer;">❌</button>
            </div>
            <div id="modal-historico-conteudo" style="display:flex; gap:15px; overflow-x:auto;"></div>
        </div>
    `;
    
    painel.innerHTML = html;
    
    // ==========================================
    // ALTERAÇÃO: Chamar a função de ordenação aqui
    // ==========================================
    tornarTabelasOrdenaveis();
}

// Função para exibir as últimas 3 comps de um time ao clicar nele na tabela
function mostrarHistoricoTimeMapa(idTime, nomeTime) {
    const modal = document.getElementById('modal-historico-time-mapa');
    const titulo = document.getElementById('modal-historico-titulo');
    const conteudo = document.getElementById('modal-historico-conteudo');
    
    if(!modal || !window.historicoTimesMapa) return;
    
    let historico = window.historicoTimesMapa[idTime] || [];
    let ultimas3 = historico.slice(0, 3); // Pega apenas as 3 mais recentes

    titulo.innerText = `ÚLTIMAS 3 COMPS DE ${nomeTime.toUpperCase()}`;
    
    if(ultimas3.length === 0) {
        conteudo.innerHTML = `<p style="font-size:12px; color:gray;">Nenhum histórico recente encontrado.</p>`;
    } else {
        conteudo.innerHTML = ultimas3.map((h, i) => `
            <div style="background:var(--bg-geral); padding:10px; border-radius:8px; text-align:center; min-width:120px; border: 1px solid ${h.win ? 'rgba(0,255,0,0.2)' : 'rgba(255,0,0,0.2)'};">
                <div style="font-size:10px; color:gray; margin-bottom:5px;">${h.win ? '<span style="color:#4caf50;">VITÓRIA</span>' : '<span style="color:#f44336;">DERROTA</span>'}</div>
                <div style="display:flex; justify-content:center; gap:5px;">
                    ${h.comp.map(b => `<img src="brawlers/${formatImg(b)}.png" style="width:28px; border-radius:4px;" onerror="this.src='brawlers/default.png'" title="${b}">`).join('')}
                </div>
            </div>
        `).join('');
    }
    
    modal.style.display = 'block';
}

function aplicarCoresTabelaMeta() {
    // Nota: Os seletores (.meta-table, .brawler-name, etc.) precisarão corresponder às suas classes reais no HTML
    const linhas = document.querySelectorAll('.meta-table tbody tr'); 

    linhas.forEach(linha => {
        const nomeCell = linha.querySelector('.brawler-name');
        const prCell = linha.querySelector('.pr-cell');
        const banCell = linha.querySelector('.ban-cell');
        const brCell = linha.querySelector('.br-cell');
        const wrCell = linha.querySelector('.wr-cell');

        // Aplicando cores estáticas
        if (nomeCell) nomeCell.style.color = 'white';
        if (prCell) prCell.style.color = 'cyan';
        if (banCell) banCell.style.color = 'red';
        if (brCell) brCell.style.color = 'red';

        // Aplicando cores dinâmicas no Win Rate (WR%)
        if (wrCell) {
            const wrTexto = wrCell.textContent.replace('%', '').trim();
            const wrValor = parseFloat(wrTexto);
            
            if (!isNaN(wrValor)) {
                if (wrValor >= 90 && wrValor <= 100) {
                    wrCell.style.color = 'darkgreen';
                } else if (wrValor >= 51 && wrValor <= 89) {
                    wrCell.style.color = 'green';
                } else if (wrValor >= 40 && wrValor <= 50) {
                    wrCell.style.color = 'yellow';
                } else if (wrValor >= 21 && wrValor <= 39) {
                    wrCell.style.color = 'orange';
                } else if (wrValor >= 10 && wrValor <= 20) {
                    wrCell.style.color = 'red';
                } else if (wrValor >= 0 && wrValor <= 9) {
                    wrCell.style.color = 'darkred';
                }
            }
        }
    });
}
