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
                { id_time: "OS", nome_time: "Olimpo SQUAD", jogadores: [ { nick: "Golden", tag: "#9QCJPL20" }, { nick: "Brabao", tag: "#L9PQUV0YC" }, { nick: "Pekka", tag: "#JVRCVJ9Q" } ] },
                { id_time: "GLXY", nome_time: "GALAXY", jogadores: [ { nick: "Doritos", tag: "#202GJJR28" }, { nick: "Derpp", tag: "#2QG9LQQC8Y" }, { nick: "IceCrow", tag: "#9CPYUCGQC" } ] },
                { id_time: "SKC", nome_time: "SKCalalas SA", jogadores: [ { nick: "Kr", tag: "#PR0P8QVQ" }, { nick: "Rhz", tag: "#89PVJG9R0" }, { nick: "Juan Carlos", tag: "#PR9U2JL" } ] },
                { id_time: "ENO", nome_time: "ENOSIS", jogadores: [ { nick: "Magic", tag: "#2QCCC29QV" }, { nick: "REI DO FUT", tag: "#RVL0RPR9" }, { nick: "Fantas", tag: "#PU20LUCQG" } ] },
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
                { id_time: "TRB", nome_time: "TRIBE GAMING", jogadores: [ { nick: "Lxffy", tag: "#82RCQCVG" }, { nick: "RBM", tag: "#U9GC8G02" }, { nick: "Diegogamer", tag: "#QLCJGQUP" } ] }
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
                { id_time: "BIG", nome_time: "BIG", jogadores: [ { nick: "Salty", tag: "#PLV89CGP" }, { nick: "Arthur", tag: "#9RVPL0Q0P" }, { nick: "Melih", tag: "#GLPJRCLYL" } ] }
            ],
            "TIER B": [
                { id_time: "FUTA", nome_time: "FUT ACADEMY", jogadores: [ { nick: "ZeyroX", tag: "#82GG2RLQG" }, { nick: "Ferissa", tag: "#2LLRJGPVV8" }, { nick: "DeMaster", tag: "#2GV90L8YP" } ] },
                { id_time: "REV", nome_time: "REVERSO HIVE", jogadores: [ { nick: "Fayelo", tag: "#LLV82LQPU" }, { nick: "Ethan", tag: "#2Y20JR8CQ" }, { nick: "Natrix", tag: "#CJ9YRGGC" } ] },
                { id_time: "TLB", nome_time: "TALENTS LAB", jogadores: [ { nick: "Yei Yei", tag: "#8RVLRVYYP" }, { nick: "Agachi", tag: "#YYUG20PQV" }, { nick: "Stas", tag: "#9LYQR9QC" } ] }
            ]
        },
        "EA": {
            "TIER S": [
                { id_time: "CR", nome_time: "CRAZY RACCOON", jogadores: [ { nick: "Tensai", tag: "#9ULYPV8" }, { nick: "Milkreo", tag: "#20C0LL00" }, { nick: "Moya", tag: "#UR2UL8YR" } ] },
                { id_time: "ZETA", nome_time: "ZETA DIVISION", jogadores: [ { nick: "Battoman", tag: "#P0Y8JGL0U" }, { nick: "Sizuku", tag: "#P90RJQ8C" }, { nick: "Sitetampo", tag: "#8Y98Q8U" } ] }
            ],
            "TIER A": [
                { id_time: "SKCEA", nome_time: "SKC EA", jogadores: [ { nick: "Kuru", tag: "#J99YU9QY" }, { nick: "Ghost T", tag: "#2CJJJGUJ20" }, { nick: "Naipishu", tag: "#2P0V0CQQ2" } ] },
                { id_time: "IGM", nome_time: "IGNUM", jogadores: [ { nick: "Shigemyon", tag: "#2RQQ9PGC" }, { nick: "Drake", tag: "#2CJG2GGCGP" }, { nick: "Nyade", tag: "#2UQVY2JL2V" } ] },
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
                { id_time: "LOUD", nome_time: "LOUD", jogadores: [ { nick: "KaioDog", tag: "#GGUQCG0G" }, { nick: "FireCrow", tag: "#JQ8LLLY" }, { nick: "Edinho", tag: "#QJULVGU" } ] },
                { id_time: "OS", nome_time: "Olimpo SQUAD", jogadores: [ { nick: "Golden", tag: "#9QCJPL20" }, { nick: "Brabao", tag: "#L9PQUV0YC" }, { nick: "Pekka", tag: "#JVRCVJ9Q" } ] },
                { id_time: "GLXY", nome_time: "GALAXY", jogadores: [ { nick: "Doritos", tag: "#202GJJR28" }, { nick: "Derpp", tag: "#2QG9LQQC8Y" }, { nick: "IceCrow", tag: "#9CPYUCGQC" } ] },
                { id_time: "SKC", nome_time: "SKCalalas SA", jogadores: [ { nick: "Kr", tag: "#PR0P8QVQ" }, { nick: "Rhz", tag: "#89PVJG9R0" }, { nick: "Juan Carlos", tag: "#PR9U2JL" } ] },
                { id_time: "ENO", nome_time: "ENOSIS", jogadores: [ { nick: "Magic", tag: "#2QCCC29QV" }, { nick: "REI DO FUT", tag: "#RVL0RPR9" }, { nick: "Fantas", tag: "#PU20LUCQG" } ] },
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
                { id_time: "TRB", nome_time: "TRIBE GAMING", jogadores: [ { nick: "Lxffy", tag: "#82RCQCVG" }, { nick: "RBM", tag: "#U9GC8G02" }, { nick: "Diegogamer", tag: "#QLCJGQUP" } ] }
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
                { id_time: "BIG", nome_time: "BIG", jogadores: [ { nick: "Salty", tag: "#PLV89CGP" }, { nick: "Arthur", tag: "#9RVPL0Q0P" }, { nick: "Melih", tag: "#GLPJRCLYL" } ] }
            ],
            "TIER B": [
                { id_time: "FUTA", nome_time: "FUT ACADEMY", jogadores: [ { nick: "ZeyroX", tag: "#82GG2RLQG" }, { nick: "Ferissa", tag: "#2LLRJGPVV8" }, { nick: "DeMaster", tag: "#2GV90L8YP" } ] },
                { id_time: "REV", nome_time: "REVERSO HIVE", jogadores: [ { nick: "Fayelo", tag: "#LLV82LQPU" }, { nick: "Ethan", tag: "#2Y20JR8CQ" }, { nick: "Natrix", tag: "#CJ9YRGGC" } ] },
                { id_time: "TLB", nome_time: "TALENTS LAB", jogadores: [ { nick: "Yei Yei", tag: "#8RVLRVYYP" }, { nick: "Agachi", tag: "#YYUG20PQV" }, { nick: "Stas", tag: "#9LYQR9QC" } ] }
            ]
        },
        "EA": {
            "TIER S": [
                { id_time: "CR", nome_time: "CRAZY RACCOON", jogadores: [ { nick: "Tensai", tag: "#9ULYPV8" }, { nick: "Milkreo", tag: "#20C0LL00" }, { nick: "Moya", tag: "#UR2UL8YR" } ] },
                { id_time: "ZETA", nome_time: "ZETA DIVISION", jogadores: [ { nick: "Battoman", tag: "#P0Y8JGL0U" }, { nick: "Sizuku", tag: "#P90RJQ8C" }, { nick: "Sitetampo", tag: "#8Y98Q8U" } ] }
            ],
            "TIER A": [
                { id_time: "SKCEA", nome_time: "SKC EA", jogadores: [ { nick: "Kuru", tag: "#J99YU9QY" }, { nick: "Ghost T", tag: "#2CJJJGUJ20" }, { nick: "Naipishu", tag: "#2P0V0CQQ2" } ] },
                { id_time: "IGM", nome_time: "IGNUM", jogadores: [ { nick: "Shigemyon", tag: "#2RQQ9PGC" }, { nick: "Drake", tag: "#2CJG2GGCGP" }, { nick: "Nyade", tag: "#2UQVY2JL2V" } ] },
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

document.addEventListener("DOMContentLoaded", () => { 
    atualizarRostersAtuais();
    carregarCSV(); 
});

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
}

// Funções de TELA META
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
    if(!container) return;
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
                                <td style="padding:5px 8px;">${s.picks}</td><td style="color:var(--texto-secundario); padding:5px 8px;">${((s.picks/(dadosFiltrados.length||1))*100).toFixed(1)}%</td><td style="padding:5px 8px;">${s.wins}</td><td class="winrate-cell" style="padding:5px 8px;">${((s.wins/s.picks)*100).toFixed(1)}%</td>
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

    container.innerHTML = html || `<p style="padding:20px; text-align:center;">Nenhum dado encontrado para os filtros atuais na ${_REGIAO}.</p>`;
}

// Funções de TELA BRAWLERS
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
    if(!painel) return;
    let partidasDeste = dadosFiltrados.filter(r => (r.pick||'').toUpperCase() === brawler);
    let totalPicks = partidasDeste.length;
    if(totalPicks === 0) return;

    let wins = partidasDeste.filter(r => parseInt(r.win) === 1).length;
    let wrGeral = ((wins/totalPicks)*100).toFixed(1) + '%';
    let totalBans = dadosBansFiltrados.filter(r => (r.brawler_banido||'').toUpperCase() === brawler).length;
    let totalJogosComBans = new Set(dadosBansFiltrados.map(r => r.id_partida)).size;
    let brPct = totalJogosComBans > 0 ? ((totalBans / totalJogosComBans) * 100).toFixed(1) : '0.0';

    painel.innerHTML = `
        <div class="brawler-profile-header">
            <img src="brawlers/${formatImg(brawler)}.png" class="brawler-large-avatar" onerror="this.src='brawlers/default.png'">
            <div>
                <h2 style="font-size:28px;">${brawler}</h2>
                <p style="color:var(--texto-secundario); font-size:14px; font-weight:bold; margin-top:5px;">PICKS: <span style="color:#fff">${totalPicks}</span> | W: <span style="color:#fff">${wins}</span> | WR%: <span class="winrate-cell">${wrGeral}</span></p>
            </div>
        </div>
    `;
}

// Funções de TELA TIMES e A CORREÇÃO PRINCIPAL DO SINTAX ERROR AQUI:
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
    if(!painel) return;
    let partidasDoTime = dadosFiltrados.filter(r => r.id_time === time.id_time);
    let logoUrl = teamLogoUrl(time.id_time);

    if (time.id_time.startsWith("UNK")) {
        let tiersDisponiveis = obterTiersDisponiveis();
        painel.innerHTML = `<div style="background:var(--bg-cards); padding:30px; border-radius:12px; border:2px dashed var(--accent-purple);">
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

    let html = `
        <div style="display:flex; align-items:center; gap:20px; margin-bottom:30px; border-bottom:1px solid var(--borda-destaque); padding-bottom:20px;">
            <img src="${logoUrl}" style="width:80px; height:80px; object-fit:contain; background:var(--bg-cards); border-radius:12px; border:2px solid var(--borda-destaque);" onerror="${teamLogoOnError(time.id_time)}">
            <div>
                <h2 style="color:var(--accent-purple); font-size:32px; font-weight:900;">${time.nome_time} <span style="font-size:14px; color:var(--texto-secundario)">(${time.id_time})</span></h2>
                <p style="font-size:11px; color:var(--texto-secundario); font-weight:bold; margin-top:5px;">PARTIDAS COLETADAS: <span style="color:#fff">${partidasDoTime.length}</span></p>
            </div>
        </div>
        <h3 style="color:var(--texto); margin-bottom:15px; font-size:16px;">JOGADORES (ROSTER OFICIAL)</h3><div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap:20px;">
    `;

    time.jogadores.forEach(jogador => {
        html += `<div style="background:var(--bg-cards); padding:20px; border-radius:12px; border:1px solid var(--borda-destaque);"><div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:5px;"><h4 style="color:var(--accent-purple); font-size:18px;">${jogador.nick}</h4><span style="font-size:10px; background:#000; padding:3px 6px; border-radius:4px; color:var(--texto-secundario);">${jogador.tag}</span></div></div>`;
    });
    painel.innerHTML = html + `</div>`;
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

    // AQUI ESTÁ A CORREÇÃO DA LINHA CORTADA:
    let regAlvo = _REGIAO === "ALL" ? "ALL" : _REGIAO;
    if (CONFIGURACAO_MANUAL_TIMES[regAlvo] && CONFIGURACAO_MANUAL_TIMES[regAlvo]["TIER ?"]) {
        CONFIGURACAO_MANUAL_TIMES[regAlvo]["TIER ?"] = CONFIGURACAO_MANUAL_TIMES[regAlvo]["TIER ?"].filter(t => t.id_time !== idAntigo);
    }
    
    // Recarrega os times no menu lateral
    carregarTimesSalvosLocal();
    renderizarSidebarTimes();
    
    // Troca o painel para mostrar o time recém salvo
    let timeRegistrado = null;
    for(let tier in CONFIGURACAO_MANUAL_TIMES[regAlvo]){
        let achou = CONFIGURACAO_MANUAL_TIMES[regAlvo][tier].find(t => t.id_time === novoId);
        if(achou) timeRegistrado = achou;
    }
    
    if (timeRegistrado) {
        timeSelecionado = timeRegistrado;
        renderizarDetalhesTime(timeRegistrado);
    }
    
    alert('Time registrado com sucesso!');
} 


