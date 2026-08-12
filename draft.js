// =====================================================================================
// DRAFT.JS — Brawl Stars Draft Tool
// Dados calculados com lógica IDÊNTICA ao geral.html:
//   1. CSV carregado do GitHub (sempre atualizado)
//   2. processarTimesDesconhecidos — cria times UNK para adversários de times conhecidos
//   3. estruturarMD3 — agrupa sets em MD3, recalcula win pelo vencedor do round
//   4. dadosFiltrados (condensados MD3) usados em TODOS os cálculos
// =====================================================================================

// =====================================================================================
// ROSTERS POR DATA — cópia exata do app.js
// =====================================================================================
const _DRAFT_ROSTERS_POR_DATA = {
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
            { id_time: "TRB", nome_time: "TRIBE GAMING", jogadores: [ { nick: "Lxffy", tag: "#82RCQCVG" }, { nick: "RBM", tag: "#U9GC8G02" }, { nick: "Diegogamer", tag: "#QLCJGQUP" } ] }
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
            { id_time: "HMBLE", nome_time: "HMBLE", jogadores: [ { nick: "Symantec", tag: "#YQUCCJ2" }, { nick: "BosS", tag: "#V89Y2GP0" }, { nick: "Lukii", tag: "#8V92UYCJ" } ] }
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
        },
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
            { id_time: "TRB", nome_time: "TRIBE GAMING", jogadores: [ { nick: "Lxffy", tag: "#82RCQCVG" }, { nick: "RBM", tag: "#U9GC8G02" }, { nick: "Diegogamer", tag: "#QLCJGQUP" } ] }
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
            { id_time: "HMBLE", nome_time: "HMBLE", jogadores: [ { nick: "Symantec", tag: "#YQUCCJ2" }, { nick: "BosS", tag: "#V89Y2GP0" }, { nick: "Lukii", tag: "#8V92UYCJ" } ] }
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
            { id_time: "TRB", nome_time: "TRIBE GAMING", jogadores: [ { nick: "Lxffy", tag: "#82RCQCVG" }, { nick: "RBM", tag: "#U9GC8G02" }, { nick: "Diegogamer", tag: "#QLCJGQUP" } ] }
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
            { id_time: "HMBLE", nome_time: "HMBLE", jogadores: [ { nick: "Symantec", tag: "#YQUCCJ2" }, { nick: "BosS", tag: "#V89Y2GP0" }, { nick: "Lukii", tag: "#8V92UYCJ" } ] }
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
};

// =====================================================================================
// HELPERS DE ROSTERS / MD3 — cópia exata do app.js
// =====================================================================================
// Mesma lógica do app.js: usa window.REGIAO_ATUAL se definido.
// O geral.html define window.REGIAO_ATUAL = "ALL" — usamos "ALL" como padrão
// para que os dados do draft batam com os do geral.html sem filtro de região.
const _DRAFT_REGIAO = (typeof window !== 'undefined' && window.REGIAO_ATUAL)
    ? window.REGIAO_ATUAL.toUpperCase() : "ALL";

let _draftConfiguracaoTimes = JSON.parse(JSON.stringify(_DRAFT_ROSTERS_POR_DATA["PADRAO"]));

// Réplica exata de isTimeDaRegiaoAtual do app.js
function _draftIsTimeDaRegiao(id) {
    if (_DRAFT_REGIAO === "ALL") {
        for (let reg in _draftConfiguracaoTimes) {
            for (let tier in _draftConfiguracaoTimes[reg]) {
                if (_draftConfiguracaoTimes[reg][tier].find(t => t.id_time === id)) return true;
            }
        }
        return false;
    }
    let reg = _draftConfiguracaoTimes[_DRAFT_REGIAO];
    if (!reg) return false;
    for (let tier in reg) {
        if (reg[tier].find(t => t.id_time === id)) return true;
    }
    return false;
}

function _draftParseDateBR(dataStr) {
    if (!dataStr) return 0;
    try {
        let p = dataStr.split(' '), dp = p[0].split('/');
        let t = p[1] ? p[1].split(':') : [0,0,0];
        return new Date(dp[2], dp[1]-1, dp[0], t[0], t[1], t[2]).getTime();
    } catch(e) { return 0; }
}

function _draftEncontrarTimePorRoster(tagsArray) {
    for (let reg in _draftConfiguracaoTimes) {
        for (let tier in _draftConfiguracaoTimes[reg]) {
            if (tier === "TIER ?") continue;
            for (let team of _draftConfiguracaoTimes[reg][tier]) {
                let matchCount = 0;
                team.jogadores.forEach(j => { if (tagsArray.includes(j.tag)) matchCount++; });
                if (matchCount >= 2) return { id: team.id_time, nome: team.nome_time, regiao: reg };
            }
        }
    }
    return null;
}

function _draftIsTimeCadastrado(id) {
    // Verifica em TODAS as regiões (usado apenas internamente para UNK)
    for (let reg in _draftConfiguracaoTimes) {
        for (let tier in _draftConfiguracaoTimes[reg]) {
            if (_draftConfiguracaoTimes[reg][tier].find(t => t.id_time === id)) return true;
        }
    }
    return false;
}

function _draftTimeRosterCompleto(tagsDaPartida, idTime) {
    if (!idTime) return false;
    if (idTime.toUpperCase().startsWith('UNK')) return true;
    for (let reg in _draftConfiguracaoTimes) {
        for (let tier in _draftConfiguracaoTimes[reg]) {
            if (tier === "TIER ?") continue;
            let time = _draftConfiguracaoTimes[reg][tier].find(t => t.id_time === idTime);
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

function _draftProcessarTimesDesconhecidos(dados) {
    if (!_draftConfiguracaoTimes["ALL"]) _draftConfiguracaoTimes["ALL"] = {};
    _draftConfiguracaoTimes["ALL"]["TIER ?"] = [];
    // Para cada região
    for (let reg in _draftConfiguracaoTimes) {
        if (!_draftConfiguracaoTimes[reg]["TIER ?"]) _draftConfiguracaoTimes[reg]["TIER ?"] = [];
    }

    const mapUNK = new Map();
    let counter = 1;
    let pMap = {};

    dados.forEach(r => {
        if (!pMap[r.id_partida]) pMap[r.id_partida] = { tagsA: [], tagsB: [], tA: null, tB: null };
        if (pMap[r.id_partida].tagsA.length < 3 && (pMap[r.id_partida].tA === null || pMap[r.id_partida].tA === r.id_time)) {
            pMap[r.id_partida].tagsA.push(r.player_tag); pMap[r.id_partida].tA = r.id_time;
        } else {
            pMap[r.id_partida].tagsB.push(r.player_tag); pMap[r.id_partida].tB = r.id_time;
        }
    });

    dados.forEach(linha => {
        let isKnown = _draftEncontrarTimePorRoster([linha.player_tag]);
        if (!isKnown && linha.id_players && linha.name_players && linha.player_tag) {
            const ids = linha.id_players.split(';'), names = linha.name_players.split(';');
            const pIdx = ids.indexOf(linha.player_tag);
            if (pIdx !== -1) {
                const sIdx = pIdx < 3 ? 0 : 3;
                const tTags = ids.slice(sIdx, sIdx + 3), tNames = names.slice(sIdx, sIdx + 3);
                if (tTags.length === 3 && !tTags.includes("None") && !tTags.includes("")) {
                    let teamReg = _draftEncontrarTimePorRoster(tTags);
                    if (teamReg) {
                        linha.id_time = teamReg.id; linha.nome_time = teamReg.nome;
                    } else {
                        let opTags = (sIdx < 3) ? pMap[linha.id_partida].tagsB : pMap[linha.id_partida].tagsA;
                        let opTeam = _draftEncontrarTimePorRoster(opTags);
                        if (opTeam) {
                            const sig = tTags.slice().sort().join('_');
                            if (!mapUNK.has(sig)) {
                                const nId = `UNK${counter}`, nName = `Unknow ${counter}`;
                                mapUNK.set(sig, { id: nId, nome: nName });
                                // Adiciona em ALL para isTimeCadastrado funcionar
                                if (!_draftConfiguracaoTimes["ALL"]) _draftConfiguracaoTimes["ALL"] = {};
                                if (!_draftConfiguracaoTimes["ALL"]["TIER ?"]) _draftConfiguracaoTimes["ALL"]["TIER ?"] = [];
                                _draftConfiguracaoTimes["ALL"]["TIER ?"].push({
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

function _draftEstruturarMD3(dadosPeriodo) {
    let rawMatches = {};
    dadosPeriodo.forEach(r => {
        if (!rawMatches[r.id_partida]) rawMatches[r.id_partida] = [];
        rawMatches[r.id_partida].push(r);
    });

    let partidasEstruturadas = [];
    Object.values(rawMatches).forEach(linhas => {
        if (linhas.length < 6) return;
        let t0 = linhas.slice(0,3), t1 = linhas.slice(3,6);
        let t0Id = t0[0].id_time, t1Id = t1[0].id_time;
        // Réplica exata do app.js: filtra pela região atual (SA por padrão)
        if (_DRAFT_REGIAO !== "ALL" && !_draftIsTimeDaRegiao(t0Id) && !_draftIsTimeDaRegiao(t1Id)) return;
        partidasEstruturadas.push({
            id: linhas[0].id_partida, modo: linhas[0].modo, mapa: linhas[0].mapa,
            tAId: t0Id, tBId: t1Id, tANome: t0[0].nome_time, tBNome: t1[0].nome_time,
            tagsA: t0.map(p => p.player_tag), tagsB: t1.map(p => p.player_tag),
            vencedor: parseInt(t0[0].win) === 1 ? t0Id : t1Id,
            timestamp: _draftParseDateBR(linhas[0].data_adicao),
            dataFormatada: linhas[0].data_adicao,
            tipo: linhas[0].tipo || 'scrim',
            linhasOriginais: linhas
        });
    });

    let scrims = [];
    partidasEstruturadas.sort((a,b) => a.timestamp - b.timestamp).forEach(partida => {
        if (!_draftTimeRosterCompleto(partida.tagsA, partida.tAId) || !_draftTimeRosterCompleto(partida.tagsB, partida.tBId)) return;
        let chaveTimes = [partida.tAId, partida.tBId].sort().join(' VS ');
        let scrimExistente = scrims.find(s => s.chave === chaveTimes && (partida.timestamp - s.ultimoUpdate) <= (2 * 60 * 60 * 1000));
        if (scrimExistente) {
            scrimExistente.sets.push(partida); scrimExistente.ultimoUpdate = partida.timestamp;
        } else {
            scrims.push({ chave: chaveTimes, tAId: partida.tAId, tBId: partida.tBId, inicio: partida.timestamp, ultimoUpdate: partida.timestamp, sets: [partida] });
        }
    });

    let dadosMD3Condensados = [];
    scrims.forEach(scrim => {
        let currentSets = [], winsA = 0, winsB = 0;
        const fecharRound = (setsDoRound) => {
            if (setsDoRound.length === 0) return;
            let vencedorRound = winsA > winsB ? scrim.tAId : scrim.tBId;
            setsDoRound[0].linhasOriginais.forEach(linha => {
                let novaLinha = Object.assign({}, linha);
                novaLinha.win = (novaLinha.id_time === vencedorRound) ? "1" : "0";
                dadosMD3Condensados.push(novaLinha);
            });
        };
        scrim.sets.forEach(set => {
            if (currentSets.length > 0 && currentSets[0].mapa !== set.mapa) {
                fecharRound(currentSets); currentSets = []; winsA = 0; winsB = 0;
            }
            currentSets.push(set);
            if (set.vencedor === scrim.tAId) winsA++; else if (set.vencedor === scrim.tBId) winsB++;
            if (winsA === 2 || winsB === 2) {
                fecharRound(currentSets); currentSets = []; winsA = 0; winsB = 0;
            }
        });
        if (currentSets.length > 0) fecharRound(currentSets);
    });

    return dadosMD3Condensados;
}

// =====================================================================================
// CARREGAMENTO AUTÔNOMO DO CSV + CONDENSAÇÃO MD3
// =====================================================================================
let _draftDadosBrutos = [];
let _draftDadosCondensados = [];   // ← dados processados como no geral.html
let _csvCarregado = false;
let _csvCarregando = false;
let _cbsAposCSV = [];
let _cacheDadosBrawlers = {};
let _cacheDataRef = null;

const _CSV_PATHS = [
    'https://raw.githubusercontent.com/LeonardodeAlmeidaQuitto/BSCinfos/main/historico_bruto.csv',
    'historico_bruto.csv',
    './historico_bruto.csv'
];

// Prioriza window.dadosFiltrados (publicado pelo app.js na mesma página).
// Quando o draft.html roda sem o app.js, usa os dados processados localmente.
function _getDadosBrutos() {
    if (window.dadosFiltrados && window.dadosFiltrados.length > 0) return window.dadosFiltrados;
    if (_draftDadosCondensados.length > 0) return _draftDadosCondensados;
    return [];
}

function _processarECondensarCSV(rawData) {
    _draftDadosBrutos = rawData;
    // Inicializa rosters com PADRAO (equivalente a "Todos" no filtro do geral.html)
    _draftConfiguracaoTimes = JSON.parse(JSON.stringify(_DRAFT_ROSTERS_POR_DATA["PADRAO"]));
    // Processa times desconhecidos (cria UNK para adversários de times cadastrados)
    _draftProcessarTimesDesconhecidos(_draftDadosBrutos);
    // Réplica do filterFn do app.js com todos os filtros em "Todos":
    // só passa rows onde id_time pertence à região atual
    const dadosFiltradosPorRegiao = _draftDadosBrutos.filter(r => _draftIsTimeDaRegiao(r.id_time));
    // Condensa em MD3
    _draftDadosCondensados = _draftEstruturarMD3(dadosFiltradosPorRegiao);
    // Invalida cache
    _cacheDadosBrawlers = {}; _cacheDataRef = null;
}

function _dispararCarregamentoCSV(idx) {
    idx = idx || 0;
    if (_csvCarregado || _csvCarregando) return;
    if (typeof Papa === 'undefined') {
        if (!document.getElementById('_papaparse_draft')) {
            const s = document.createElement('script');
            s.id = '_papaparse_draft';
            s.src = 'https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.4.1/papaparse.min.js';
            s.onload = () => _dispararCarregamentoCSV(idx);
            (document.head || document.documentElement).appendChild(s);
        } else {
            setTimeout(() => _dispararCarregamentoCSV(idx), 100);
        }
        return;
    }
    _csvCarregando = true;
    Papa.parse(_CSV_PATHS[idx] || _CSV_PATHS[0], {
        download: true, header: true, skipEmptyLines: true,
        complete: function(results) {
            if (results.data && results.data.length > 0 && results.data[0].pick !== undefined) {
                _processarECondensarCSV(results.data);
                _csvCarregado = true; _csvCarregando = false;
                _cbsAposCSV.forEach(fn => { try { fn(); } catch(e) {} });
                _cbsAposCSV = [];
            } else if (idx + 1 < _CSV_PATHS.length) {
                _csvCarregando = false;
                _dispararCarregamentoCSV(idx + 1);
            } else {
                _csvCarregado = true; _csvCarregando = false;
                _cbsAposCSV.forEach(fn => { try { fn(); } catch(e) {} });
                _cbsAposCSV = [];
            }
        },
        error: function() {
            if (idx + 1 < _CSV_PATHS.length) {
                _csvCarregando = false;
                _dispararCarregamentoCSV(idx + 1);
            } else {
                _csvCarregado = true; _csvCarregando = false;
                _cbsAposCSV.forEach(fn => { try { fn(); } catch(e) {} });
                _cbsAposCSV = [];
            }
        }
    });
}

function carregarCSVDraft(callback) {
    if (_csvCarregado || _getDadosBrutos().length > 0) { if (callback) callback(); return; }
    if (callback) _cbsAposCSV.push(callback);
    _dispararCarregamentoCSV(0);
}

// Dispara imediatamente — não espera DOMContentLoaded
_dispararCarregamentoCSV(0);

// --- CONFIGURAÇÃO DE MAPAS ---
const MAPAS_ALVO = {
    "Brawl Ball": ["Super Beach", "Pinhole Punt", "Sneaky Fields", "Triple Dribble", "Pinball Dreams"],
    "Bounty": ["Shooting Star", "Hideout", "Layer Cake", "Dry Season"],
    "Heist": ["Hot Potato", "Safe Zone", "Bridge Too Far", "Pit Stop", "Kaboom Canyon"],
    "Knockout": ["Goldarm Gulch", "Belle's Rock", "Out in the Open", "New Horizons"],
    "Hot Zone": ["Ring of Fire", "Dueling Beetles", "Open Business"],
    "Gem Grab": ["Hard Rock Mine", "Double Swoosh", "Deathcap Trap", "Gem Fort", "Crystal Arcade"]
};

// =====================================================================================
// CÁLCULO DINÂMICO — lê window.dadosBrutos (preenchido pelo app.js via PapaParse)
// =====================================================================================

/**
 * Retorna brawlers do mapa ordenados por WR% (mínimo MIN_PICKS picks).
 * Usa window.dadosBrutos que o app.js já carregou do CSV.
 */
function calcularMetaMapa(nomeMapa, minPicks = 2) {
    const dados = _getDadosBrutos();
    if (!dados || dados.length === 0) return [];

    const stats = {};
    dados.forEach(row => {
        const mapa = (row.mapa || '').trim();
        const pick = (row.pick || '').trim().toUpperCase();
        if (!pick || normalizarChaveDraft(mapa) !== normalizarChaveDraft(nomeMapa)) return;
        if (!stats[pick]) stats[pick] = { picks: 0, wins: 0 };
        stats[pick].picks++;
        if (parseInt(row.win) === 1) stats[pick].wins++;
    });

    return Object.entries(stats)
        .filter(([, s]) => s.picks >= minPicks)
        .sort((a, b) => {
            const wrA = a[1].wins / a[1].picks;
            const wrB = b[1].wins / b[1].picks;
            return wrB - wrA;
        })
        .map(([nome]) => nome);
}

/**
 * Calcula dados completos de um brawler igual ao renderizarDetalhesBrawler() do app.js.
 * Retorna { totalPicks, wins, wrGeral, topMapas, countersTop, counteradosTop, sinergiasTop }
 */
function calcularDadosBrawler(brawlerNome) {
    const dados = _getDadosBrutos();
    if (!dados || dados.length === 0) return null;

    const brawlerUpper = brawlerNome.toUpperCase();
    const partidasDeste = dados.filter(r => (r.pick || '').trim().toUpperCase() === brawlerUpper);
    const totalPicks = partidasDeste.length;
    if (totalPicks === 0) return null;

    const wins = partidasDeste.filter(r => parseInt(r.win) === 1).length;
    const wrGeral = ((wins / totalPicks) * 100).toFixed(1);

    // Top 3 mapas
    const mapasStats = {};
    partidasDeste.forEach(r => {
        const m = (r.mapa || '').trim();
        if (!m) return;
        if (!mapasStats[m]) mapasStats[m] = { picks: 0, wins: 0 };
        mapasStats[m].picks++;
        if (parseInt(r.win) === 1) mapasStats[m].wins++;
    });
    const topMapas = Object.entries(mapasStats)
        .sort((a, b) => b[1].picks - a[1].picks)
        .slice(0, 3);

    // Counters e Sinergias (lógica idêntica ao app.js)
    const statsContra = {}, statsSinergia = {};
    const idsPartidas = [...new Set(partidasDeste.map(r => r.id_partida))];

    idsPartidas.forEach(id => {
        const todosNaPartida = dados.filter(r => r.id_partida === id);
        const brawlerRows = todosNaPartida.filter(r => (r.pick || '').trim().toUpperCase() === brawlerUpper);
        brawlerRows.forEach(meRow => {
            const timeDoBrawler = meRow.id_time;
            const ganhou = parseInt(meRow.win) === 1;
            todosNaPartida.forEach(p => {
                const pName = (p.pick || '').trim().toUpperCase();
                if (!pName) return;
                if (p.id_time !== timeDoBrawler) {
                    if (!statsContra[pName]) statsContra[pName] = { matches: 0, bwWins: 0, bwLosses: 0 };
                    statsContra[pName].matches++;
                    if (ganhou) statsContra[pName].bwWins++; else statsContra[pName].bwLosses++;
                } else if (pName !== brawlerUpper) {
                    if (!statsSinergia[pName]) statsSinergia[pName] = { matches: 0, bwWins: 0 };
                    statsSinergia[pName].matches++;
                    if (ganhou) statsSinergia[pName].bwWins++;
                }
            });
        });
    });

    const matchups = Object.entries(statsContra)
        .map(([nome, s]) => ({
            nome,
            matches: s.matches,
            wins: s.bwWins,
            losses: s.bwLosses,
            wr: (s.bwWins / s.matches) * 100,
            pr: (s.matches / totalPicks) * 100
        }))
        .filter(m => m.matches >= 1);

    const countersTop    = [...matchups].filter(m => m.wr >= 50).sort((a, b) => b.matches - a.matches).slice(0, 5);
    const counteradosTop = [...matchups].filter(m => m.wr  < 50).sort((a, b) => b.matches - a.matches).slice(0, 5);
    const sinergiasTop   = Object.entries(statsSinergia)
        .map(([nome, s]) => ({ nome, matches: s.matches, wins: s.bwWins, wr: (s.bwWins / s.matches) * 100, pr: (s.matches / totalPicks) * 100 }))
        .filter(m => m.matches >= 1)
        .sort((a, b) => b.matches - a.matches)
        .slice(0, 5);

    // Também expõe bomContra/ruimContra/sinergias como arrays simples para a análise final
    return {
        totalPicks, wins, wrGeral,
        topMapas,
        countersTop, counteradosTop, sinergiasTop,
        bomContra:  countersTop.map(c => c.nome),
        ruimContra: counteradosTop.map(c => c.nome),
        sinergias:  sinergiasTop.map(c => c.nome)
    };
}

// obterDadosBrawlerDinamico — usa cache declarado no topo
function obterDadosBrawlerDinamico(nome) {
    if (!nome) return null;
    const key = nome.toUpperCase();
    const dadosAtual = _getDadosBrutos();

    // Invalida cache quando o array de dados mudar de referência
    if (dadosAtual !== _cacheDataRef) {
        _cacheDadosBrawlers = {};
        _cacheDataRef = dadosAtual;
    }

    if (!(key in _cacheDadosBrawlers)) {
        _cacheDadosBrawlers[key] = calcularDadosBrawler(nome);
    }
    return _cacheDadosBrawlers[key];
}

// Helper de normalização de chave (igual ao do app.js)
function normalizarChaveDraft(str) {
    if (!str) return '';
    return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]/g, '');
}

// =====================================================================================
// LISTA DE BRAWLERS
// =====================================================================================
const BRAWLERS = ["Damian", "8-Bit", "Alli", "Amber", "Angelo", "Ash", "Barley", "Bea", "Belle", "Berry", "Bibi", "Bo", "Bolt", "Bonnie", "Brock", "Bull", "Buster", "Buzz", "Byron", "Carl", "Charlie", "Chester", "Chuck", "Clancy", "Colette", "Colt", "Cordelius", "Crow", "Darryl", "Doug", "Draco", "Dynamike", "Edgar", "El Primo", "Emz", "Eve", "Fang", "Finx", "Frank", "Gale", "Gene", "Gigi", "Glowy", "Gray", "Griff", "Grom", "Gus", "Hank", "Jacky", "Jae Yong", "Janet", "Jessie", "Juju", "Kaze", "Kenji", "Kit", "Larry & Lawrie", "Leon", "Lily", "Lola", "Lou", "Lumi", "Maisie", "Mandy", "Max", "Meeple", "Meg", "Melodie", "Mico", "Mina", "Moe", "Mortis", "Mr.P", "Najia", "Nani", "Nita", "Nori", "Ollie", "Otis", "Pam", "Pearl", "Penny", "Pierce", "Piper", "Poco", "R-T", "Rico", "Rosa", "Ruffs", "Sam", "Sandy", "Shade", "Shelly", "Sirius", "Spike", "Sprout", "Squeak", "Stu", "Surge", "Starr Nova", "Tara", "Tick", "Trunk", "Willow", "Ziggy"].sort();

// =====================================================================================
// ESTADO DO DRAFT
// =====================================================================================
let currentStep = 0, firstPick = 'blue', draftOrder = [], picksVermelhos = [], picksAzuis = [], preSelected = null;
let modoEscolhido = null, mapaEscolhido = null;
let draftIniciado = false, draftFinalizado = false;

// selected: apenas PICKS confirmados
// bansBlueSel / bansRedSel: bans de cada time — o mesmo brawler PODE aparecer nos dois
let selected = [];
let bansBlueSel = [];
let bansRedSel  = [];

// --- ESTADO DO TIMER ---
let fases = [];
let faseAtualIdx = 0;
let tempoRestante = 30;
let timerInterval = null;

// =====================================================================================
// HELPERS
// =====================================================================================
function limparNome(nome) { return !nome ? "" : nome.toLowerCase().replace(/[^a-z0-9]/g, ''); }

function criarConteudoSlot(nome, id) {
    return `<div class="slot-assets"><img src="brawlers/${id}.png" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"><div class="slot-fallback-text">${nome}</div></div>`;
}

// Busca os dados do brawler: primeiro tenta dinâmico (dadosBrutos), depois cai no vazio
function obterDadosBrawler(nome) {
    if (!nome) return null;
    const dados = obterDadosBrawlerDinamico(nome);
    // Retorna null se vazio (para compatibilidade com código que verifica "if(dados)")
    if (!dados.bomContra.length && !dados.ruimContra.length && !dados.sinergias.length) return null;
    return dados;
}

// =====================================================================================
// MODAL DE SUGESTÃO — formato idêntico ao geral.html (P, PR%, W/L, WR%, Top Mapas)
// =====================================================================================
function abrirModalSugestao(nomeBrawler, event) {
    if (event) event.stopPropagation();

    const existente = document.getElementById('modal-sugestao-draft');
    if (existente) existente.remove();

    const id = limparNome(nomeBrawler);
    const nRegistros = _getDadosBrutos().length;

    // Se CSV ainda não carregou, mostra loading e reabre quando terminar
    if (nRegistros === 0) {
        _mostrarModalLoading(nomeBrawler, id);
        carregarCSVDraft(() => abrirModalSugestao(nomeBrawler, null));
        return;
    }

    const dados = calcularDadosBrawler(nomeBrawler);

    // Stats deste brawler no mapa atual
    let statsMapaHTML = '';
    if (mapaEscolhido) {
        const raw = _getDadosBrutos();
        const brawlerUpper = nomeBrawler.toUpperCase();
        const noMapa = raw.filter(r =>
            (r.pick || '').trim().toUpperCase() === brawlerUpper &&
            normalizarChaveDraft((r.mapa || '')) === normalizarChaveDraft(mapaEscolhido)
        );
        if (noMapa.length > 0) {
            const mp = noMapa.length;
            const mw = noMapa.filter(r => parseInt(r.win) === 1).length;
            const mwr = ((mw / mp) * 100).toFixed(1);
            const corWR = parseFloat(mwr) >= 50 ? '#4ade80' : '#f87171';
            statsMapaHTML = `
            <div style="background:#0f172a; border-radius:8px; padding:8px 14px; margin-bottom:14px; font-size:12px; font-weight:700; display:flex; gap:18px; align-items:center; flex-wrap:wrap;">
                <span style="color:#94a3b8;">📍 <strong style="color:#fff">${mapaEscolhido}</strong></span>
                <span style="color:#94a3b8;">P: <strong style="color:#fff">${mp}</strong></span>
                <span style="color:#94a3b8;">W: <strong style="color:#fff">${mw}</strong></span>
                <span style="color:#94a3b8;">WR: <strong style="color:${corWR}">${mwr}%</strong></span>
            </div>`;
        }
    }

    // Helper: linha de matchup (estilo synergy-item do geral.html)
    const renderMatchupRow = (c, isWin) => {
        const cId = limparNome(c.nome);
        const cor = isWin ? '#4ade80' : '#f87171';
        const label = isWin ? 'W' : 'L';
        const val   = isWin ? c.wins : c.losses;
        return `
        <div style="display:flex; align-items:center; justify-content:space-between; padding:6px 4px; border-bottom:1px solid rgba(255,255,255,0.05);">
            <div style="display:flex; align-items:center; gap:8px;">
                <img src="brawlers/${cId}.png" onerror="this.style.display='none'" style="width:32px; height:32px; border-radius:7px; object-fit:cover;">
                <span style="font-weight:800; font-size:13px; color:#e2e8f0;">${c.nome}</span>
            </div>
            <div style="display:flex; gap:10px; font-size:11px; font-weight:700; text-align:right;">
                <div style="display:flex; flex-direction:column; color:#64748b;">
                    <span>P: ${c.matches}</span>
                    <span>PR: ${c.pr.toFixed(1)}%</span>
                </div>
                <div style="display:flex; flex-direction:column;">
                    <span>${label}: <span style="color:#fff">${val}</span></span>
                    <span style="color:${cor}">WR: ${c.wr.toFixed(1)}%</span>
                </div>
            </div>
        </div>`;
    };

    // Helper: card de sinergia
    const renderSinergiaCard = (c) => {
        const cId = limparNome(c.nome);
        return `
        <div style="background:#0f172a; padding:12px 8px; border-radius:8px; text-align:center; border:1px solid #1e293b;">
            <img src="brawlers/${cId}.png" onerror="this.style.display='none'" style="width:40px; height:40px; border-radius:7px; margin-bottom:6px; object-fit:cover;">
            <div style="font-weight:900; font-size:12px; margin-bottom:4px; color:#e2e8f0;">${c.nome}</div>
            <div style="font-size:11px; color:#64748b; font-weight:700;">P: ${c.matches} | PR: ${c.pr.toFixed(1)}%</div>
            <div style="font-size:11px; font-weight:700; margin-top:2px;">W: <span style="color:#fff">${c.wins}</span> | <span style="color:#4ade80">WR: ${c.wr.toFixed(1)}%</span></div>
        </div>`;
    };

    // Helper: card de mapa
    const renderMapaCard = ([m, s]) => {
        const mId = limparNome(m);
        const mwr = ((s.wins / s.picks) * 100).toFixed(1);
        const corWR = parseFloat(mwr) >= 50 ? '#4ade80' : '#f87171';
        return `
        <div style="background:#0f172a; padding:10px; border-radius:8px; border:1px solid #1e293b; text-align:center;">
            <img src="element/maps/${mId}.png" onerror="this.style.display='none'" style="width:100%; height:56px; object-fit:cover; border-radius:5px; margin-bottom:6px;">
            <div style="font-weight:900; font-size:11px; margin-bottom:5px; color:#e2e8f0;">${m}</div>
            <div style="font-size:10px; color:#64748b; font-weight:700;">P: ${s.picks} | PR: ${((s.picks / dados.totalPicks) * 100).toFixed(1)}%</div>
            <div style="font-size:10px; font-weight:700; margin-top:2px;">W: <span style="color:#fff">${s.wins}</span> | <span style="color:${corWR}">WR: ${mwr}%</span></div>
        </div>`;
    };

    const semDados = !dados;

    const modal = document.createElement('div');
    modal.id = 'modal-sugestao-draft';
    modal.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.8);z-index:9999;display:flex;align-items:center;justify-content:center;';
    modal.onclick = (e) => { if (e.target === modal) modal.remove(); };

    const wrCorGeral = dados ? (parseFloat(dados.wrGeral) >= 50 ? '#4ade80' : '#f87171') : '#94a3b8';

    modal.innerHTML = `
    <div style="background:#1a1d26; border:1px solid #334155; border-radius:14px; width:480px; max-width:96vw; max-height:92vh; overflow-y:auto; padding:20px; position:relative;">
        <button onclick="document.getElementById('modal-sugestao-draft').remove()" style="position:absolute;top:12px;right:14px;background:transparent;border:none;color:#64748b;font-size:20px;cursor:pointer;line-height:1;">✕</button>

        <!-- HEADER -->
        <div style="display:flex; align-items:center; gap:14px; margin-bottom:14px; padding-bottom:14px; border-bottom:1px solid #334155;">
            <img src="brawlers/${id}.png" onerror="this.style.display='none'" style="width:60px; height:60px; border-radius:12px; object-fit:cover; border:2px solid #60a5fa;">
            <div>
                <div style="font-size:20px; font-weight:900; color:#fff;">${nomeBrawler}</div>
                ${dados ? `<div style="font-size:12px; color:#64748b; margin-top:4px; font-weight:700;">
                    PICKS: <span style="color:#fff">${dados.totalPicks}</span> &nbsp;|&nbsp;
                    W: <span style="color:#fff">${dados.wins}</span> &nbsp;|&nbsp;
                    WR%: <span style="color:${wrCorGeral}">${dados.wrGeral}%</span>
                </div>` : `<div style="font-size:11px; color:#475569; margin-top:4px;">${nRegistros} registros carregados</div>`}
            </div>
        </div>

        ${statsMapaHTML}

        <!-- TOP 15 META DO MAPA -->
        ${mapaEscolhido ? (() => {
            const top15 = calcularMetaMapa(mapaEscolhido, 1).slice(0, 15);
            if (top15.length === 0) return '';
            const destacado = top15.includes(nomeBrawler.toUpperCase());
            return `
        <div style="margin-bottom:18px;">
            <div style="font-size:13px; font-weight:800; color:#f59e0b; margin-bottom:10px;">
                🏆 TOP 15 META — <span style="font-weight:600; color:#94a3b8;">${mapaEscolhido}</span>
                ${destacado ? `<span style="margin-left:8px; background:#f59e0b22; color:#f59e0b; font-size:10px; padding:2px 7px; border-radius:10px; font-weight:800;">✦ ESTÁ AQUI</span>` : ''}
            </div>
            <div style="display:flex; flex-wrap:wrap; gap:6px;">
                ${top15.map((nome, i) => {
                    const tid = limparNome(nome);
                    const isThis = nome === nomeBrawler.toUpperCase();
                    const border = isThis ? '2px solid #f59e0b' : '1px solid #1e293b';
                    const bg = isThis ? '#1c1600' : '#0f172a';
                    return `<div style="display:flex; flex-direction:column; align-items:center; gap:3px; width:52px; cursor:pointer; background:${bg}; border:${border}; border-radius:8px; padding:5px 3px;" onclick="abrirModalSugestao('${nome}', event)">
                        <span style="font-size:9px; font-weight:900; color:${isThis ? '#f59e0b' : '#64748b'};">#${i+1}</span>
                        <img src="brawlers/${tid}.png" onerror="this.style.display='none'" style="width:36px; height:36px; border-radius:6px; object-fit:cover;">
                        <span style="font-size:8px; font-weight:800; color:${isThis ? '#fbbf24' : '#e2e8f0'}; text-align:center; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; max-width:48px;">${nome}</span>
                    </div>`;
                }).join('')}
            </div>
        </div>`;
        })() : ''}

        ${semDados ? `<p style="color:#64748b; font-size:12px; text-align:center; padding:20px 0;">Sem partidas registradas para este brawler.</p>` : `

        <!-- TOP 3 MAPAS -->
        <div style="font-size:13px; font-weight:800; color:#a78bfa; margin-bottom:10px;">🗺️ TOP 3 MAPAS</div>
        <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:8px; margin-bottom:18px;">
            ${dados.topMapas.map(renderMapaCard).join('') || '<p style="color:#475569; font-size:11px;">Sem dados</p>'}
        </div>

        <!-- BOM CONTRA -->
        <div style="font-size:13px; font-weight:800; color:#4ade80; margin-bottom:8px;">✅ BOM CONTRA <span style="font-size:10px; color:#475569; font-weight:400;">(WR ≥ 50%)</span></div>
        <div style="margin-bottom:16px;">
            ${dados.countersTop.length > 0 ? dados.countersTop.map(c => renderMatchupRow(c, true)).join('') : '<p style="color:#475569; font-size:11px; padding:4px 0;">Sem dados suficientes</p>'}
        </div>

        <!-- RUIM CONTRA -->
        <div style="font-size:13px; font-weight:800; color:#f87171; margin-bottom:8px; padding-top:12px; border-top:1px solid #1e293b;">⚠️ RUIM CONTRA <span style="font-size:10px; color:#475569; font-weight:400;">(WR < 50%)</span></div>
        <div style="margin-bottom:16px;">
            ${dados.counteradosTop.length > 0 ? dados.counteradosTop.map(c => renderMatchupRow(c, false)).join('') : '<p style="color:#475569; font-size:11px; padding:4px 0;">Sem dados suficientes</p>'}
        </div>

        <!-- SINERGIAS -->
        <div style="font-size:13px; font-weight:800; color:#c084fc; margin-bottom:10px; padding-top:12px; border-top:1px solid #1e293b;">🤝 TOP 5 SINERGIAS</div>
        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(80px, 1fr)); gap:8px;">
            ${dados.sinergiasTop.length > 0 ? dados.sinergiasTop.map(renderSinergiaCard).join('') : '<p style="color:#475569; font-size:11px;">Sem dados suficientes</p>'}
        </div>
        `}
    </div>`;

    document.body.appendChild(modal);
}

function _mostrarModalLoading(nomeBrawler, id) {
    const modal = document.createElement('div');
    modal.id = 'modal-sugestao-draft';
    modal.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.8);z-index:9999;display:flex;align-items:center;justify-content:center;';
    modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
    modal.innerHTML = `
    <div style="background:#1a1d26; border:1px solid #334155; border-radius:14px; width:320px; max-width:96vw; padding:30px 20px; position:relative; text-align:center;">
        <button onclick="document.getElementById('modal-sugestao-draft').remove()" style="position:absolute;top:12px;right:14px;background:transparent;border:none;color:#64748b;font-size:20px;cursor:pointer;">✕</button>
        <img src="brawlers/${id}.png" onerror="this.style.display='none'" style="width:56px; height:56px; border-radius:12px; object-fit:cover; border:2px solid #60a5fa; margin-bottom:12px;">
        <div style="font-size:17px; font-weight:900; color:#fff; margin-bottom:8px;">${nomeBrawler}</div>
        <div style="font-size:13px; color:#64748b;">⏳ Carregando dados do CSV...</div>
    </div>`;
    document.body.appendChild(modal);
}// Cria o conteúdo do slot com ícone de sugestão (só para picks, não para bans)
function criarConteudoSlotComSugestao(nome, id) {
    return `
        <div class="slot-assets" style="position:relative;">
            <img src="brawlers/${id}.png" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
            <div class="slot-fallback-text">${nome}</div>
            <div class="slot-sugestao-btn" onclick="abrirModalSugestao('${nome}', event)" title="Ver Bom Contra / Ruim Contra / Sinergias"
                style="position:absolute; bottom:3px; right:3px; width:22px; height:22px; cursor:pointer; z-index:10; border-radius:50%; background:rgba(0,0,0,0.55); display:flex; align-items:center; justify-content:center; overflow:hidden;">
                <img src="element/sugestion.png" onerror="this.style.display='none'; this.parentElement.innerHTML='💡';" style="width:16px; height:16px; object-fit:contain;">
            </div>
        </div>`;
}

// =====================================================================================
// 1. TELA DE SETUP
// =====================================================================================
function iniciarSetup() {
    document.getElementById('tc-iniciar').style.display = 'none';
    document.getElementById('setup-overlay').style.display = 'flex';
    document.getElementById('setup-modo').style.display = 'block';
    document.getElementById('setup-mapa').style.display = 'none';
    document.getElementById('setup-lado').style.display = 'none';
    popularGridModos();
}

function popularGridModos() {
    const grid = document.getElementById('grid-modos');
    if (!grid) return;
    grid.innerHTML = '';
    Object.keys(MAPAS_ALVO).forEach(modo => {
        const key = limparNome(modo);
        const div = document.createElement('div');
        div.className = 'modo-card';
        div.title = modo;
        div.innerHTML = `<img src="element/modes/${key}.png" onerror="this.src='element/modes/default.png'">`;
        div.onclick = () => window.escolherModo(modo);
        grid.appendChild(div);
    });
}

window.escolherModo = function(modo) {
    modoEscolhido = modo;
    document.getElementById('setup-modo').style.display = 'none';
    document.getElementById('setup-mapa').style.display = 'block';
    popularGridMapas(modo);
};

function popularGridMapas(modo) {
    const grid = document.getElementById('grid-mapas');
    if (!grid) return;
    grid.innerHTML = '';
    (MAPAS_ALVO[modo] || []).forEach(mapa => {
        const key = limparNome(mapa);
        const div = document.createElement('div');
        div.className = 'mapa-card';
        div.innerHTML = `<img src="element/maps/${key}.png" onerror="this.src='element/maps/default.png'"><span>${mapa}</span>`;
        div.onclick = () => window.escolherMapa(mapa);
        grid.appendChild(div);
    });
}

window.escolherMapa = function(mapa) {
    mapaEscolhido = mapa;
    const mapImg = document.getElementById('map-img');
    const modoIcon = document.getElementById('map-modo-icon');
    const placeholder = document.getElementById('map-placeholder');
    const nomeLabel = document.getElementById('map-nome-label');
    const chaveMapa = limparNome(mapa), chaveModo = limparNome(modoEscolhido);
    if (mapImg) {
        mapImg.src = `element/maps/${chaveMapa}.png`;
        mapImg.style.display = 'block';
        mapImg.onerror = function() { this.style.display = 'none'; if (placeholder) { placeholder.style.display = 'block'; placeholder.innerHTML = 'IMAGEM<br>NÃO<br>ENCONTRADA'; } };
    }
    if (placeholder) placeholder.style.display = 'none';
    if (modoIcon) { modoIcon.src = `element/modes/${chaveModo}.png`; modoIcon.style.display = 'block'; modoIcon.onerror = function() { this.style.display = 'none'; }; }
    if (nomeLabel) { nomeLabel.innerText = mapa; nomeLabel.style.display = 'block'; }
    document.getElementById('vertical-layout').style.display = 'flex';
    document.getElementById('setup-mapa').style.display = 'none';
    document.getElementById('setup-lado').style.display = 'block';
    window.atualizarMeta();
};

window.escolherLado = function(lado) {
    firstPick = lado;
    document.getElementById('setup-overlay').style.display = 'none';
    const coinTopo = document.getElementById('coin-topo');
    const coinTopoImg = document.getElementById('coin-topo-img');
    if (coinTopo && coinTopoImg) {
        coinTopoImg.src = lado === 'blue' ? 'element/blueside.png' : 'element/redside.png';
        coinTopo.style.display = 'flex';
    }
    draftIniciado = true;
    resetDraft();
    iniciarBarraDeTempo();
};

// =====================================================================================
// 2. ROSTER
// =====================================================================================
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

window.filtrar = function() {
    const searchInput = document.getElementById('search');
    if (!searchInput) return;
    const t = searchInput.value.toLowerCase();
    document.querySelectorAll('.brawler-icon').forEach(div => {
        const n = div.querySelector('.brawler-name').textContent.toLowerCase();
        div.style.display = n.includes(t) ? 'flex' : 'none';
    });
};

// =====================================================================================
// 3. META (calculada dinamicamente do CSV por WR% no mapa)
// =====================================================================================
window.atualizarMeta = function() {
    const container = document.getElementById('meta-list');
    if (!container) return;
    container.innerHTML = "";

    const dados = _getDadosBrutos();

    // CSV ainda não carregou — mostra loading e agenda retry via callback
    if (dados.length === 0) {
        container.innerHTML = '<p style="color:#555; font-size:11px; width:100%; text-align:center;">Carregando dados...</p>';
        carregarCSVDraft(window.atualizarMeta);
        return;
    }

    const metaBrawlers = calcularMetaMapa(mapaEscolhido);
    if (metaBrawlers && metaBrawlers.length > 0) {
        metaBrawlers.forEach(nome => {
            const id = limparNome(nome);
            container.innerHTML += `<div class="mini-brawler" title="Top Pick: ${nome}"><img src="brawlers/${id}.png" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"><div class="fallback-initials">${nome.substring(0,2).toUpperCase()}</div></div>`;
        });
    } else {
        container.innerHTML = '<p style="color:#555; font-size:11px; width: 100%; text-align:center;">Sem dados de meta para este mapa ainda.</p>';
    }
};

window.toggleFiltroPainel = function(id) {
    document.querySelectorAll('.panel-filter-box').forEach(box => { if (box.id !== id) box.classList.remove('aberto'); });
    const box = document.getElementById(id);
    if (box) box.classList.toggle('aberto');
};
document.addEventListener('click', (e) => {
    if (!e.target.closest('.panel-filter-btn') && !e.target.closest('.panel-filter-box')) {
        document.querySelectorAll('.panel-filter-box').forEach(box => box.classList.remove('aberto'));
    }
});

// =====================================================================================
// 4. MONTAGEM DA ORDEM DO DRAFT
// =====================================================================================
function buildOrder() {
    const order = [
        { slot: 'slot-b0', team: 'blue', type: 'ban' }, { slot: 'slot-b2', team: 'blue', type: 'ban' }, { slot: 'slot-b4', team: 'blue', type: 'ban' },
        { slot: 'slot-b1', team: 'red',  type: 'ban' }, { slot: 'slot-b3', team: 'red',  type: 'ban' }, { slot: 'slot-b5', team: 'red',  type: 'ban' }
    ];
    const timeOutro = firstPick === 'blue' ? 'red' : 'blue';
    const sequenciaTimes = [firstPick, timeOutro, timeOutro, firstPick, firstPick, timeOutro];
    let idxAzul = 0, idxVermelho = 0;
    sequenciaTimes.forEach(time => {
        if (time === 'blue') { idxAzul++; order.push({ slot: `slot-pA${idxAzul}`, team: 'blue', type: 'pick' }); }
        else { idxVermelho++; order.push({ slot: `slot-pV${idxVermelho}`, team: 'red', type: 'pick' }); }
    });
    draftOrder = order;
}

// =====================================================================================
// 5. TIMER
// =====================================================================================
function montarFases() {
    fases = [{ label: 'BANS', team: null, dur: 30 }];
    draftOrder.forEach(step => {
        if (step.type !== 'pick') return;
        fases.push({ label: `PICK - ${step.team === 'blue' ? 'AZUL' : 'VERMELHO'}`, team: step.team, dur: step.team === 'blue' ? 30 : 35 });
    });
}

function popularSegmentosVisuais() {
    const wrap = document.getElementById('timer-segments');
    if (!wrap) return;
    wrap.innerHTML = '';
    fases.forEach((f, i) => {
        const seg = document.createElement('div');
        seg.className = 'timer-segment' + (f.team === 'red' ? ' team-red' : '');
        seg.id = `seg-${i}`;
        seg.innerHTML = '<div class="fill"></div>';
        wrap.appendChild(seg);
    });
}

function iniciarBarraDeTempo() {
    document.getElementById('tc-timer').style.display = 'flex';
    montarFases();
    popularSegmentosVisuais();
    faseAtualIdx = 0;
    iniciarFase(0);
}

function iniciarFase(idx) {
    if (timerInterval) clearInterval(timerInterval);
    faseAtualIdx = idx;
    if (idx >= fases.length) return;
    for (let i = 0; i < idx; i++) { const s = document.getElementById(`seg-${i}`); if (s) s.classList.add('done'); }
    const fase = fases[idx];
    tempoRestante = fase.dur;
    atualizarLabelFase(fase);
    atualizarVisualTimer();
    marcarMiniTimerSlotAtivo();
    timerInterval = setInterval(() => {
        tempoRestante--;
        atualizarVisualTimer();
        marcarMiniTimerSlotAtivo();
        if (tempoRestante <= 0) { clearInterval(timerInterval); }
    }, 1000);
}

function atualizarLabelFase(fase) {
    const label = document.getElementById('timer-fase-label');
    if (label) label.innerText = fase.label;
}

function atualizarVisualTimer() {
    const numEl = document.getElementById('timer-numero');
    if (numEl) { numEl.innerText = Math.max(0, tempoRestante); numEl.classList.toggle('urgente', tempoRestante <= 10 && tempoRestante > 0); }
    const seg = document.getElementById(`seg-${faseAtualIdx}`);
    const fase = fases[faseAtualIdx];
    if (seg && fase) {
        const fill = seg.querySelector('.fill');
        if (fill) fill.style.width = Math.max(0, (tempoRestante / fase.dur) * 100) + '%';
    }
}

function marcarMiniTimerSlotAtivo() {
    document.querySelectorAll('.slot-mini-timer').forEach(el => el.remove());
    if (currentStep >= draftOrder.length) return;
    const step = draftOrder[currentStep];
    const slotEl = document.getElementById(step.slot);
    if (!slotEl || slotEl.querySelector('.slot-assets')) return;
    const mini = document.createElement('div');
    mini.className = 'slot-mini-timer' + (tempoRestante <= 10 ? ' urgente' : '');
    mini.innerText = Math.max(0, tempoRestante);
    slotEl.appendChild(mini);
}

function avancarFaseAposPreenchimento() {
    const proximoStepEhPick = currentStep < draftOrder.length && draftOrder[currentStep].type === 'pick';
    const faseAtualEhBan = fases[faseAtualIdx] && fases[faseAtualIdx].team === null;
    if (faseAtualEhBan && proximoStepEhPick) { iniciarFase(faseAtualIdx + 1); return; }
    if (!faseAtualEhBan) {
        if (faseAtualIdx + 1 < fases.length) iniciarFase(faseAtualIdx + 1);
        else { if (timerInterval) clearInterval(timerInterval); document.getElementById('tc-timer').style.display = 'none'; }
    }
    marcarMiniTimerSlotAtivo();
}

// =====================================================================================
// 6. INTERAÇÃO DE CLIQUE NOS BRAWLERS
// =====================================================================================
function isBrawlerDisponivel(id, step) {
    if (selected.includes(id)) return false;
    if (step.type === 'ban') {
        if (step.team === 'blue' && bansBlueSel.includes(id)) return false;
        if (step.team === 'red'  && bansRedSel.includes(id))  return false;
        return true;
    }
    // Picks: bloqueado se banido por qualquer time
    if (bansBlueSel.includes(id) || bansRedSel.includes(id)) return false;
    return true;
}

function atualizarEstadoRoster() {
    const step = currentStep < draftOrder.length ? draftOrder[currentStep] : null;
    document.querySelectorAll('.brawler-icon').forEach(div => {
        const id = div.id.replace('b-', '');
        div.classList.remove('disabled', 'banned-blue', 'banned-red');
        const pickado    = selected.includes(id);
        const baniuAzul  = bansBlueSel.includes(id);
        const baniuVerm  = bansRedSel.includes(id);
        if (baniuAzul) div.classList.add('banned-blue');
        if (baniuVerm) div.classList.add('banned-red');
        if (pickado) { div.classList.add('disabled'); return; }
        if (!step) return;
        if (step.type === 'ban') {
            if (step.team === 'blue' && baniuAzul) div.classList.add('disabled');
            if (step.team === 'red'  && baniuVerm)  div.classList.add('disabled');
        } else {
            if (baniuAzul || baniuVerm) div.classList.add('disabled');
        }
    });
}

window.clicarBrawler = function(nome, id) {
    if (!draftIniciado || draftFinalizado) return;
    if (currentStep >= draftOrder.length) return;
    const step = draftOrder[currentStep];
    if (!isBrawlerDisponivel(id, step)) return;
    const slot = document.getElementById(step.slot);
    if (!slot) return;

    if (step.team === 'blue') {
        if (preSelected && preSelected.id === id) { window.confirmarBlueSelection(); return; }
        preSelected = { nome, id };
        const sugestaoBtn = step.type === 'pick'
            ? `<div class="slot-sugestao-btn" onclick="abrirModalSugestao('${nome}', event)" title="Ver análise"
                style="position:absolute; bottom:3px; right:3px; width:22px; height:22px; cursor:pointer; z-index:10; border-radius:50%; background:rgba(0,0,0,0.55); display:flex; align-items:center; justify-content:center; overflow:hidden;">
                <img src="element/sugestion.png" onerror="this.style.display='none'; this.parentElement.innerHTML='💡';" style="width:16px; height:16px; object-fit:contain;">
               </div>`
            : '';
        slot.innerHTML = `<div class="slot-assets pre-selecting" onclick="window.confirmarBlueSelection(event)" style="position:relative;">
            <img src="brawlers/${id}.png" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
            <div class="slot-fallback-text">${nome}</div>
            <div class="pre-select-badge">✓</div>
            ${sugestaoBtn}
        </div>`;
    } else {
        confirmarSelecao(nome, id, step);
    }
};

window.confirmarBlueSelection = function(event) {
    if (event) event.stopPropagation();
    if (!preSelected) return;
    const { nome, id } = preSelected;
    const step = draftOrder[currentStep];
    confirmarSelecao(nome, id, step);
};

function confirmarSelecao(nome, id, step) {
    const slot = document.getElementById(step.slot);
    if (slot) {
        if (step.type === 'pick') {
            slot.innerHTML = criarConteudoSlotComSugestao(nome, id);
        } else {
            slot.innerHTML = criarConteudoSlot(nome, id);
        }
    }

    if (step.type === 'ban') {
        if (step.team === 'blue') bansBlueSel.push(id);
        else                      bansRedSel.push(id);
    } else {
        selected.push(id);
        if (step.team === 'blue') picksAzuis.push(nome);
        else                      picksVermelhos.push(nome);
    }

    preSelected = null;
    currentStep++;
    atualizarEstadoRoster();
    atualizarFoco();
    avancarFaseAposPreenchimento();
    verificarFimDraft();
}

function atualizarFoco() {
    document.querySelectorAll('.slot').forEach(s => s.classList.remove('active-blue', 'active-red'));
    if (currentStep < draftOrder.length) {
        const next = draftOrder[currentStep];
        const nextSlot = document.getElementById(next.slot);
        if (nextSlot) nextSlot.classList.add(next.team === 'blue' ? 'active-blue' : 'active-red');
    }
}

window.resetDraft = function() {
    currentStep = 0; selected = []; bansBlueSel = []; bansRedSel = [];
    picksVermelhos = []; picksAzuis = []; preSelected = null; draftFinalizado = false;
    document.querySelectorAll('.slot').forEach(s => s.innerHTML = '');
    document.querySelectorAll('.brawler-icon').forEach(b => b.classList.remove('disabled', 'banned-blue', 'banned-red'));
    const af = document.getElementById('analise-final');
    if (af) af.style.display = 'none';
    const vl = document.getElementById('vertical-layout');
    if (vl) vl.style.display = 'flex';
    const ip = document.getElementById('info-panels');
    if (ip) ip.style.display = 'flex';
    const ra = document.getElementById('roster-area');
    if (ra) ra.style.display = 'flex';
    buildOrder(); atualizarFoco(); window.atualizarMeta();
};

// =====================================================================================
// 7. FIM DO DRAFT: ANÁLISE FINAL + PRINT
// =====================================================================================
function verificarFimDraft() {
    if (currentStep < draftOrder.length) return;
    draftFinalizado = true;
    if (timerInterval) clearInterval(timerInterval);
    setTimeout(mostrarAnaliseFinal, 500);
}

function calcularProbabilidadeVitoria() {
    let pontosNosso = 0, pontosInimigo = 0;
    picksAzuis.forEach(azul => {
        picksVermelhos.forEach(verm => {
            const dadosAzul = obterDadosBrawlerDinamico(azul);
            const dadosVerm = obterDadosBrawlerDinamico(verm);
            if (dadosAzul && dadosAzul.bomContra && dadosAzul.bomContra.some(c => c.toUpperCase() === verm.toUpperCase())) pontosNosso++;
            if (dadosVerm && dadosVerm.bomContra && dadosVerm.bomContra.some(c => c.toUpperCase() === azul.toUpperCase())) pontosInimigo++;
        });
    });
    let prob = 50 + (pontosNosso - pontosInimigo) * 5;
    return Math.max(5, Math.min(95, prob));
}

function calcularPontosFracos() {
    return picksAzuis.filter(azul => {
        return picksVermelhos.some(verm => {
            const dadosVerm = obterDadosBrawlerDinamico(verm);
            return dadosVerm && dadosVerm.bomContra && dadosVerm.bomContra.some(c => c.toUpperCase() === azul.toUpperCase());
        });
    });
}

function sugerirMelhorTroca(brawlerAtual) {
    const usados = new Set([...picksAzuis, ...picksVermelhos].map(b => b.toUpperCase()));
    let candidatos = BRAWLERS.filter(b => !usados.has(b.toUpperCase()));
    candidatos.sort((a, b) => {
        const dadosA = obterDadosBrawlerDinamico(a);
        const dadosB = obterDadosBrawlerDinamico(b);
        const riscoA = dadosA && dadosA.ruimContra ? picksVermelhos.filter(v => dadosA.ruimContra.some(r => r.toUpperCase() === v.toUpperCase())).length : 0;
        const riscoB = dadosB && dadosB.ruimContra ? picksVermelhos.filter(v => dadosB.ruimContra.some(r => r.toUpperCase() === v.toUpperCase())).length : 0;
        return riscoA - riscoB;
    });
    return candidatos[0] || null;
}

function mostrarAnaliseFinal() {
    const ip = document.getElementById('info-panels');
    if (ip) ip.style.display = 'none';
    const ra = document.getElementById('roster-area');
    if (ra) ra.style.display = 'none';

    const prob = calcularProbabilidadeVitoria();
    const fracos = calcularPontosFracos();

    const picksEmRisco = picksAzuis.filter(p => {
        return picksVermelhos.some(v => {
            const dadosV = obterDadosBrawlerDinamico(v);
            return dadosV && dadosV.bomContra && dadosV.bomContra.some(c => c.toUpperCase() === p.toUpperCase());
        });
    });

    const painel = document.getElementById('analise-final');
    painel.style.display = 'flex';
    painel.innerHTML = `
        <div class="analise-card">
            <h3>PROBABILIDADE DE VITÓRIA (NOSSO TIME - AZUL)</h3>
            <div class="winrate-bar-wrap"><div class="winrate-bar-fill" style="width:${prob}%;">${prob.toFixed(0)}%</div></div>
        </div>

        <div class="analise-card">
            <h3>PONTOS FRACOS DO TIME</h3>
            <ul class="analise-lista">
                ${fracos.length > 0
                    ? fracos.map(f => `<li>⚠️ <strong>${f}</strong> está em risco — o adversário tem brawlers que são bons contra ele.</li>`).join('')
                    : '<li>✅ Nenhum ponto fraco crítico identificado nos confrontos diretos.</li>'}
            </ul>
        </div>

        <div class="analise-card">
            <h3>O QUE PODIA SER MELHOR</h3>
            <ul class="analise-lista">
                ${picksEmRisco.length > 0 ? picksEmRisco.map(p => {
                    const sugestao = sugerirMelhorTroca(p);
                    const idAtual = limparNome(p), idSugestao = sugestao ? limparNome(sugestao) : null;
                    return `<li><div class="troca-sugestao"><img src="brawlers/${idAtual}.png" onerror="this.src='brawlers/default.png'"><span class="troca-x">X</span>${sugestao ? `<img src="brawlers/${idSugestao}.png" onerror="this.src='brawlers/default.png'">` : ''}</div><span>Trocar <strong>${p}</strong> ${sugestao ? `por <strong>${sugestao}</strong>` : ''} reduziria a exposição aos counters do adversário.</span></li>`;
                }).join('') : '<li>✅ Nenhuma troca crítica necessária — draft sólido.</li>'}
            </ul>
        </div>

        <div class="analise-card">
            <h3>RESUMO DO DRAFT (MAPA + BANS + PICKS)</h3>
            <div id="print-preview-holder" style="display:flex; justify-content:center;"></div>
            <button class="btn-baixar-print" onclick="window.baixarImagemDraft()">⬇️ BAIXAR IMAGEM DO DRAFT</button>
        </div>

        <button class="btn-novo-draft" onclick="window.location.reload()">COMEÇAR NOVO DRAFT</button>
    `;

    const original = document.getElementById('draft-board-capture');
    const holder = document.getElementById('print-preview-holder');
    if (original && holder) {
        const clone = original.cloneNode(true);
        clone.removeAttribute('id');
        clone.style.transform = 'scale(0.85)';
        clone.style.transformOrigin = 'top center';
        holder.appendChild(clone);
    }
}

window.baixarImagemDraft = function() {
    const alvo = document.getElementById('draft-board-capture');
    if (!alvo || typeof html2canvas === 'undefined') { alert('Não foi possível gerar a imagem (html2canvas não carregado).'); return; }
    html2canvas(alvo, { backgroundColor: '#111217', scale: 2 }).then(canvas => {
        const link = document.createElement('a');
        link.download = `draft_${limparNome(mapaEscolhido) || 'mapa'}_${Date.now()}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    });
};

// =====================================================================================
// 8. INICIALIZAÇÃO
// =====================================================================================

// ── Injeção de CSS: oculta info-panels (META TOP / COUNTERS) e aumenta o draft ──────
(function _injetarEstilosDraft() {
    const style = document.createElement('style');
    style.textContent = `
        /* Oculta o painel META TOP 10 e COUNTERS */
        #info-panels { display: none !important; }

        /* Aumenta variáveis de tamanho do draft */
        :root {
            --ban-slot-size:  88px  !important;   /* era 66px  → +33% */
            --pick-slot-size: 178px !important;   /* era 138px → +29% */
            --map-w: 480px          !important;   /* era 390px */
            --map-h: 700px          !important;   /* era 570px */
        }

        /* Fonte dos labels do mapa */
        #map-nome-label { font-size: 22px !important; }
        #map-modo-icon  { width: 52px !important; height: 52px !important; }

        /* Ampliar área do draft para preencher o espaço extra */
        #draft-area { flex: 1 !important; }
        .draft-board-capture { padding: 28px 22px 22px !important; gap: 16px !important; }

        /* Nomes nos brawlers da seleção */
        .brawler-name { font-size: 13px !important; margin-top: 8px !important; }

        /* Barra de busca */
        .search-bar { font-size: 15px !important; padding: 12px 14px !important; }

        /* Grid de brawlers — cards maiores */
        .roster-grid .brawler-icon { border-radius: 10px !important; }
    `;
    (document.head || document.documentElement).appendChild(style);
})();
function inicializarSistema() {
    gerarRoster();
    document.getElementById('btn-iniciar-draft').addEventListener('click', iniciarSetup);
    const searchInput = document.getElementById('search');
    if (searchInput) { searchInput.removeAttribute('oninput'); searchInput.addEventListener('input', window.filtrar); }
    // CSV já foi disparado no início do script; aqui só registra callback extra se ainda não carregou
    if (_getDadosBrutos().length === 0) {
        carregarCSVDraft(null);
    }
}

if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', inicializarSistema); }
else { inicializarSistema(); }
