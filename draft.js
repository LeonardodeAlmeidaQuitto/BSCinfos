// --- DADOS DO SISTEMA ---
const MAPAS_ALVO = {
    "Brawl Ball": ["Super Beach", "Pinhole Punt", "Sneaky Fields", "Triple Dribble", "Pinhole Punt", "Pinball Dreams"],
    "Bounty": ["Shooting Star", "Hideout", "Layer Cake", "Dry Season"],
    "Heist": ["Hot Potato", "Safe Zone", "Bridge Too Far", "Pit Stop", "Kaboom Canyon"],
    "Knockout": ["Goldarm Gulch", "Belle's Rock", "Out in the Open", "New Horizons"],
    "Hot Zone": ["Ring of Fire", "Dueling Beetles", "Open Business"],
    "Gem Grab": ["Hard Rock Mine", "Double Swoosh", "Deathcap Trap", "Gem Fort", "Crystal Arcade"]
};

const DADOS_META = {
    "Super Beach": ["Max", "Sandy", "Cordelius", "Melodie", "Stu", "Buster", "Charlie", "Rico", "Fang", "Colt"],
    "Pinhole Punt": [], "Sneaky Fields": [], "Shooting Star": [], "Hideout": [],
    "Layer Cake": [], "Hot Potato": [], "Safe Zone": [], "Bridge Too Far": [],
    "Goldarm Gulch": [], "Belle's Rock": [], "Out in the Open": [],
    "Hard Rock Mine": [], "Double Swoosh": [], "Deathcap Trap": []
};

// =====================================================================================
// DADOS DE BRAWLERS: counters (bom contra / ruim contra) e sinergias
// Fonte: seção BRAWLERS da planilha ALL (todas as regiões combinadas)
// Formato por brawler: { bomContra: [...], ruimContra: [...], sinergias: [...] }
// Estes dados vêm do app.js (função renderizarDetalhesBrawler) — seção ALL
// =====================================================================================
const DADOS_BRAWLERS = {
    "8-bit":        { bomContra: ["Squeak", "Colette", "Belle", "Crow", "Pierce"],      ruimContra: ["Najia", "Byron", "Penny", "Angelo", "Edgar"],       sinergias: ["Ruffs", "Jessie", "Byron", "Tick", "Penny"] },
    "Alli":         { bomContra: ["Otis", "Kenji", "Ruffs", "Jacky", "Sirius"],         ruimContra: ["Bull", "Trunk", "Mortis", "Emz", "Edgar"],           sinergias: ["Surge", "Cordelius", "Sandy", "Charlie", "Otis"] },
    "Amber":        { bomContra: ["Starr Nova", "Doug", "Ash", "Nani", "Lily"],         ruimContra: ["Bull", "Angelo", "Mortis", "Edgar", "Bea"],           sinergias: ["Sandy", "Emz", "Poco", "Gale", "Gene"] },
    "Angelo":       { bomContra: ["Eve", "Ruffs", "Belle", "Pierce", "Nani"],           ruimContra: ["Charlie", "Kenji", "Byron", "Kaze", "Mina"],          sinergias: ["Sandy", "Emz", "Byron", "Poco", "Melodie"] },
    "Ash":          { bomContra: ["Frank", "Trunk", "Edgar", "Rico", "Sirius"],         ruimContra: ["Shade", "Kenji", "Griff", "Otis", "Colette"],         sinergias: ["Emz", "Poco", "Byron", "Sandy", "Gus"] },
    "Barley":       { bomContra: ["Mortis", "Kenji", "Edgar", "Trunk", "Mico"],         ruimContra: ["Cordelius", "Colt", "Stu", "Mico", "Lily"],            sinergias: ["Emz", "Poco", "Sandy", "Gale", "Dynamike"] },
    "Bea":          { bomContra: ["Charlie", "Ruffs", "Byron", "Belle", "Angelo"],      ruimContra: ["Najia", "Leon", "Piper", "Crow", "Edgar"],             sinergias: ["Sandy", "Emz", "Gale", "Gene", "Mr.P"] },
    "Belle":        { bomContra: ["Piper", "Charlie", "Byron", "Nani", "Crow"],         ruimContra: ["Najia", "Mina", "Mortis", "Kenji", "Edgar"],           sinergias: ["Sandy", "Emz", "Gene", "Gale", "Poco"] },
    "Berry":        { bomContra: ["Kaze", "Crow", "Sirius", "Shade", "Clancy"],         ruimContra: ["Trunk", "Edgar", "Mortis", "Lily", "Alli"],            sinergias: ["Cordelius", "Sandy", "Emz", "Poco", "Gale"] },
    "Bibi":         { bomContra: ["Cordelius", "Otis", "Edgar", "Buzz", "Bull"],        ruimContra: ["Colette", "Pearl", "Mortis", "Shelly", "Frank"],       sinergias: ["Poco", "Sandy", "Gene", "Emz", "Surge"] },
    "Bo":           { bomContra: ["Mina", "Mortis", "Buzz", "Edgar", "Kenji"],          ruimContra: ["Cordelious", "Mortis", "Surge", "Max", "Charlie"],     sinergias: ["Sandy", "Emz", "Gale", "Gene", "Poco"] },
    "Bolt":         { bomContra: ["Grom", "Mortis", "Edgar", "Colt", "Dynamike"],       ruimContra: ["Chester", "Doug", "Lou", "Charlie", "Cordelius"],      sinergias: ["Sandy", "Emz", "Poco", "Gale", "Gene"] },
    "Bonnie":       { bomContra: ["Charlie", "Ruffs", "Leon", "Mina", "Pierce"],        ruimContra: ["Kaze", "Tara", "Mortis", "Edgar", "Stu"],              sinergias: ["Sandy", "Emz", "Gene", "Gale", "Poco"] },
    "Brock":        { bomContra: ["RT", "Byron", "Pierce", "Piper", "Nani"],            ruimContra: ["Najia", "Kaze", "Max", "Bea", "Belle"],                sinergias: ["Sandy", "Emz", "Gene", "Gale", "Poco"] },
    "Bull":         { bomContra: ["Cordelius", "Griff", "Colette", "Otis", "Nita"],     ruimContra: ["Charlie", "Lou", "Frank", "Sam", "Gale"],              sinergias: ["Sandy", "Emz", "Gene", "Poco", "Gale"] },
    "Buster":       { bomContra: ["Leon", "Mina", "Kenji", "Edgar", "Darryl"],          ruimContra: ["Bull", "Mortis", "R-T", "Frank", "Colette"],           sinergias: ["Sandy", "Emz", "Gene", "Poco", "Gale"] },
    "Buzz":         { bomContra: ["Charlie", "Bull", "Griff", "Edgar", "Alli"],         ruimContra: ["Cordelius", "Otis", "Frank", "Gale", "Colette"],       sinergias: ["Sandy", "Emz", "Gene", "Poco", "Gale"] },
    "Byron":        { bomContra: ["Piper", "Nani", "Pierce", "Najia", "Mortis"],        ruimContra: ["Kenji", "Kaze", "Bonnie", "Mina", "Edgar"],            sinergias: ["Sandy", "Emz", "Gene", "Poco", "Gale"] },
    "Carl":         { bomContra: ["Edgar", "Colette", "Otis", "Buzz", "Bull"],          ruimContra: ["Daminan", "Shade", "Frank", "Mortis", "Colette"],      sinergias: ["Sandy", "Emz", "Gene", "Poco", "Gale"] },
    "Charlie":      { bomContra: ["Janet", "Ziggy", "Sirius", "Lumi", "Amber"],         ruimContra: ["Byron", "Carl", "Penny", "Jae Yong", "Amber"],         sinergias: ["Cordelius", "Sandy", "Emz", "Gene", "Poco"] },
    "Chester":      { bomContra: ["Emz", "Meeple", "Pearl", "Mortis", "Frank"],         ruimContra: ["Meeple", "Charlie", "Byron", "Otis", "Ruffs"],         sinergias: ["Sandy", "Emz", "Gene", "Poco", "Gale"] },
    "Chuck":        { bomContra: ["Charlie", "Cordelius", "Otis", "R-T", "Edgar"],      ruimContra: ["Otis", "Charlie", "Cordelius", "R-T", "Frank"],        sinergias: ["Sandy", "Emz", "Gene", "Poco", "Gale"] },
    "Clancy":       { bomContra: ["Charlie", "Tara", "Ruffs", "Otis", "Crow"],          ruimContra: ["Barley", "LarryLawrie", "Juju", "Otis", "Charlie"],    sinergias: ["Sandy", "Emz", "Gene", "Poco", "Gale"] },
    "Colette":      { bomContra: ["Ruffs", "Otis", "Crow", "Charlie", "Bea"],           ruimContra: ["Bea", "Charlie", "Otis", "Ruffs", "Edgar"],            sinergias: ["Sandy", "Emz", "Gene", "Poco", "Gale"] },
    "Colt":         { bomContra: ["Pierce", "Nani", "Ruffs", "Mina", "Leon"],           ruimContra: ["Kenji", "Byron", "Crow", "Edgar", "Belle"],            sinergias: ["Sandy", "Emz", "Gene", "Poco", "Gale"] },
    "Cordelius":    { bomContra: ["Nita", "Surge", "Mina", "Sirius", "Edgar"],          ruimContra: ["Nita", "Surge", "Mina", "Sirius", "Frank"],            sinergias: ["Sandy", "Emz", "Gene", "Poco", "Gale"] },
    "Crow":         { bomContra: ["Gus", "Byron", "Mortis", "Otis", "Pierce"],          ruimContra: ["Mina", "Edgar", "Bea", "Piper", "Nita"],               sinergias: ["Sandy", "Emz", "Gene", "Poco", "Gale"] },
    "Damian":       { bomContra: ["Otis", "Edgar", "Colette", "Chester", "Mortis"],     ruimContra: ["Chester", "Mortis", "Otis", "Frank", "Bull"],          sinergias: ["Sandy", "Emz", "Gene", "Poco", "Gale"] },
    "Darryl":       { bomContra: ["Spike", "Cordelius", "Otis", "Chester", "Clancy"],   ruimContra: ["Gale", "Lou", "Bull", "Nita", "Colette"],              sinergias: ["Sandy", "Emz", "Gene", "Poco", "Gale"] },
    "Doug":         { bomContra: ["Clancy", "Griff", "Mina", "Bolt", "Mico"],           ruimContra: ["Mina", "Griff", "Clancy", "Frank", "Bull"],            sinergias: ["Sandy", "Emz", "Gene", "Poco", "Gale"] },
    "Draco":        { bomContra: ["Lou", "Frank", "Mina", "Chester", "Otis"],           ruimContra: ["Lou", "Frank", "Mina", "Chester", "Bull"],             sinergias: ["Sandy", "Emz", "Gene", "Poco", "Gale"] },
    "Dynamike":     { bomContra: ["Bibi", "Trunk", "Mina", "Edgar", "Shade"],           ruimContra: ["Cordelius", "Stu", "Mortis", "Kenji", "Alli"],         sinergias: ["Sandy", "Emz", "Gene", "Poco", "Gale"] },
    "Edgar":        { bomContra: ["Cordelius", "Otis", "Bull", "Griff", "Gale"],        ruimContra: ["Cordelius", "Otis", "Bull", "Griff", "Gale"],          sinergias: ["Sandy", "Emz", "Gene", "Poco", "Gale"] },
    "El Primo":     { bomContra: ["Colette", "Cordelius", "Otis", "Gale", "Stu"],       ruimContra: ["Cordelious", "Gale", "Colette", "Otis", "Frank"],      sinergias: ["Sandy", "Emz", "Gene", "Poco", "Gale"] },
    "Emz":          { bomContra: ["Otis", "Colette", "Griff", "Mina", "Meeple"],        ruimContra: ["Sirius", "Darryl", "Mortis", "Leon", "Edgar"],         sinergias: ["Sandy", "Gene", "Poco", "Gale", "Brock"] },
    "Eve":          { bomContra: ["Penny", "Janet", "Belle", "Byron", "Carl"],          ruimContra: ["Carl", "Mortis", "Edgar", "Kit", "Frank"],             sinergias: ["Sandy", "Emz", "Gene", "Poco", "Gale"] },
    "Fang":         { bomContra: ["Chester", "Otis", "Edgar", "Mortis", "Crow"],        ruimContra: ["Chester", "Otis", "Cordelius", "Frank", "Bull"],       sinergias: ["Sandy", "Emz", "Gene", "Poco", "Gale"] },
    "Finx":         { bomContra: ["Emz", "Edgar", "Ziggy", "Meg", "Pam"],               ruimContra: ["Emz", "Edgar", "Meg", "Pam", "Frank"],                 sinergias: ["Sandy", "Emz", "Gene", "Poco", "Gale"] },
    "Frank":        { bomContra: ["Colette", "Chester", "Mortis", "Edgar", "Otis"],     ruimContra: ["Colette", "Chester", "Mortis", "Edgar", "Otis"],       sinergias: ["Sandy", "Emz", "Gene", "Poco", "Gale"] },
    "Gale":         { bomContra: ["Ziggy", "Lola", "Amber", "Edgar", "Mortis"],         ruimContra: ["Amber", "Lola", "Frank", "Bull", "Jacky"],             sinergias: ["Sandy", "Emz", "Gene", "Poco", "Brock"] },
    "Gene":         { bomContra: ["Mr.P", "Eve", "Belle", "Ruffs", "Crow"],             ruimContra: ["Ruffs", "Mortis", "Edgar", "Frank", "Bull"],           sinergias: ["Sandy", "Emz", "Poco", "Brock", "Gale"] },
    "Gigi":         { bomContra: ["Jacky", "Doug", "Bull", "Frank", "Ash"],             ruimContra: ["Jacky", "Doug", "Frank", "Bull", "Colette"],           sinergias: ["Sandy", "Emz", "Gene", "Poco", "Gale"] },
    "Glowy":        { bomContra: ["Edgar", "Crow", "Byron", "Mortis", "Shade"],         ruimContra: ["Edgar", "Crow", "Byron", "Mortis", "Frank"],           sinergias: ["Sandy", "Emz", "Gene", "Poco", "Gale"] },
    "Gray":         { bomContra: ["R-T", "Eve", "Charlie", "Ruffs", "Pearl"],           ruimContra: ["Pearl", "Ruffs", "Charlie", "Frank", "Bull"],          sinergias: ["Sandy", "Emz", "Gene", "Poco", "Gale"] },
    "Griff":        { bomContra: ["Moe", "Darryl", "Edgar", "Bull", "Mortis"],          ruimContra: ["Moe", "Frank", "Bull", "Mortis", "Edgar"],             sinergias: ["Sandy", "Emz", "Gene", "Poco", "Gale"] },
    "Grom":         { bomContra: ["Kenji", "Edgar", "Bolt", "Mico", "Mortis"],          ruimContra: ["Kenji", "Edgar", "Mico", "Bolt", "Stu"],               sinergias: ["Sandy", "Emz", "Gene", "Poco", "Gale"] },
    "Gus":          { bomContra: ["Edgar", "Damian", "Byron", "Nani", "Eve"],           ruimContra: ["Nani", "Eve", "Piece", "Leon", "Mortis"],              sinergias: ["Sandy", "Emz", "Gene", "Poco", "Gale"] },
    "Hank":         { bomContra: ["Shade", "Bull", "Edgar", "Mortis", "Frank"],         ruimContra: ["Shade", "Bull", "Edgar", "Frank", "Colette"],          sinergias: ["Sandy", "Emz", "Gene", "Poco", "Gale"] },
    "Jacky":        { bomContra: ["Frank", "Bull", "Ash", "Gigi", "Trunk"],             ruimContra: ["Frank", "Bull", "Mortis", "Colette", "Gale"],          sinergias: ["Sandy", "Emz", "Gene", "Poco", "Gale"] },
    "Jae Yong":     { bomContra: ["Crow", "Byron", "Buzz", "Brock", "Piper"],           ruimContra: ["Crow", "Byron", "Buzz", "Mortis", "Edgar"],            sinergias: ["Sandy", "Emz", "Gene", "Poco", "Gale"] },
    "Janet":        { bomContra: ["Mortis", "Kit", "Darryl", "Edgar", "Frank"],         ruimContra: ["Kit", "Darryl", "Mortis", "Edgar", "Frank"],           sinergias: ["Sandy", "Emz", "Gene", "Poco", "Gale"] },
    "Jessie":       { bomContra: ["Barley", "Pierce", "Belle", "Crow", "Gene"],         ruimContra: ["Belle", "Pierce", "Barley", "Frank", "Bull"],          sinergias: ["Sandy", "Emz", "Gene", "Poco", "Gale"] },
    "Juju":         { bomContra: ["Frank", "Brock", "Shelly", "Surge", "LarryLawrie"],  ruimContra: ["Brock", "Frank", "Bull", "Mortis", "Edgar"],           sinergias: ["Sandy", "Emz", "Gene", "Poco", "Gale"] },
    "Kaze":         { bomContra: ["Draco", "Mina", "Chester", "Otis", "Byron"],         ruimContra: ["Chester", "Otis", "Draco", "Mina", "Frank"],           sinergias: ["Sandy", "Emz", "Gene", "Poco", "Gale"] },
    "Kenji":        { bomContra: ["Shade", "Lou", "Edgar", "Mortis", "Dynamike"],       ruimContra: ["Shade", "Lou", "Frank", "Bull", "Mortis"],             sinergias: ["Sandy", "Emz", "Gene", "Poco", "Gale"] },
    "Kit":          { bomContra: ["Bull", "Frank", "Hank", "Edgar", "Mortis"],          ruimContra: ["Bull", "Frank", "Hank", "Mortis", "Colette"],          sinergias: ["Sandy", "Emz", "Gene", "Poco", "Gale"] },
    "LarryLawrie":  { bomContra: ["Edgar", "Mortis", "Frank", "Bull", "Surge"],         ruimContra: ["Edgar", "Mortis", "Frank", "Bull", "Colette"],         sinergias: ["Sandy", "Emz", "Gene", "Poco", "Gale"] },
    "Leon":         { bomContra: ["Crow", "Emz", "Mortis", "Frank", "Buster"],          ruimContra: ["Crow", "Emz", "Mortis", "Frank", "Bull"],              sinergias: ["Sandy", "Emz", "Gene", "Poco", "Gale"] },
    "Lily":         { bomContra: ["Jacky", "R-T", "Damian", "Edgar", "Mortis"],         ruimContra: ["Jacky", "R-T", "Damian", "Frank", "Bull"],             sinergias: ["Sandy", "Emz", "Gene", "Poco", "Gale"] },
    "Lola":         { bomContra: ["Lumi", "Belle", "Mortis", "Edgar", "Crow"],          ruimContra: ["Lumi", "Belle", "Frank", "Bull", "Mortis"],            sinergias: ["Sandy", "Emz", "Gene", "Poco", "Gale"] },
    "Lou":          { bomContra: ["Poco", "Byron", "Mina", "Chester", "Draco"],         ruimContra: ["Chester", "Mina", "Frank", "Bull", "Mortis"],          sinergias: ["Sandy", "Emz", "Gene", "Poco", "Gale"] },
    "Lumi":         { bomContra: ["Mortis", "Edgar", "Pierce", "Crow", "Leon"],         ruimContra: ["Mortis", "Edgar", "Pierce", "Frank", "Bull"],          sinergias: ["Sandy", "Emz", "Gene", "Poco", "Gale"] },
    "Maisie":       { bomContra: ["Ruffs", "Stu", "Sirius", "Edgar", "Mortis"],         ruimContra: ["Sirius", "Stu", "Ruffs", "Frank", "Bull"],             sinergias: ["Sandy", "Emz", "Gene", "Poco", "Gale"] },
    "Mandy":        { bomContra: ["Nani", "Edgar", "Mortis", "Frank", "Crow"],          ruimContra: ["Nani", "Edgar", "Mortis", "Frank", "Bull"],            sinergias: ["Sandy", "Emz", "Gene", "Poco", "Gale"] },
    "Max":          { bomContra: ["Crow", "Finx", "Lola", "Edgar", "Mortis"],           ruimContra: ["Crow", "Finx", "Lola", "Frank", "Bull"],               sinergias: ["Sandy", "Emz", "Gene", "Poco", "Gale"] },
    "Meeple":       { bomContra: ["Charlie", "Ruffs", "Emz", "Chester", "Mina"],        ruimContra: ["Charlie", "Ruffs", "Frank", "Bull", "Mortis"],         sinergias: ["Sandy", "Emz", "Gene", "Poco", "Gale"] },
    "Meg":          { bomContra: ["Edgar", "Buster", "Mortis", "Frank", "Crow"],        ruimContra: ["Edgar", "Buster", "Frank", "Bull", "Mortis"],          sinergias: ["Sandy", "Emz", "Gene", "Poco", "Gale"] },
    "Melodie":      { bomContra: ["Damian", "Otis", "Cordelius", "Buzz", "Edgar"],      ruimContra: ["Buzz", "Otis", "Damian", "Frank", "Bull"],             sinergias: ["Sandy", "Emz", "Gene", "Poco", "Gale"] },
    "Mico":         { bomContra: ["Bull", "Doug", "Otis", "Cordelius", "Edgar"],        ruimContra: ["Cordelius", "Otis", "Frank", "Bull", "Mortis"],        sinergias: ["Sandy", "Emz", "Gene", "Poco", "Gale"] },
    "Mina":         { bomContra: ["Kenji", "Meeple", "Shade", "Edgar", "Mortis"],       ruimContra: ["Kenji", "Meeple", "Shade", "Frank", "Bull"],           sinergias: ["Sandy", "Emz", "Gene", "Poco", "Gale"] },
    "Moe":          { bomContra: ["Chester", "Damian", "Stu", "Edgar", "Mortis"],       ruimContra: ["Chester", "Damian", "Stu", "Frank", "Griff"],          sinergias: ["Sandy", "Emz", "Gene", "Poco", "Gale"] },
    "Mortis":       { bomContra: ["Otis", "Bull", "Shelly", "Edgar", "Frank"],          ruimContra: ["Otis", "Bull", "Shelly", "Frank", "Gale"],             sinergias: ["Sandy", "Emz", "Gene", "Poco", "Gale"] },
    "Mr.P":         { bomContra: ["Edgar", "Kenji", "Damian", "Mortis", "Crow"],        ruimContra: ["Kenji", "Damian", "Mortis", "Frank", "Bull"],          sinergias: ["Sandy", "Emz", "Gene", "Poco", "Gale"] },
    "Najia":        { bomContra: ["Poco", "Edgar", "Lily", "Mortis", "Frank"],          ruimContra: ["Edgar", "Lily", "Frank", "Bull", "Mortis"],            sinergias: ["Sandy", "Emz", "Gene", "Poco", "Gale"] },
    "Nani":         { bomContra: ["Max", "Gene", "Mortis", "Edgar", "Frank"],           ruimContra: ["Max", "Gene", "Frank", "Bull", "Mortis"],              sinergias: ["Sandy", "Emz", "Gene", "Poco", "Gale"] },
    "Nita":         { bomContra: ["Amber", "Cordelious", "Edgar", "Mortis", "Frank"],   ruimContra: ["Cordelious", "Frank", "Bull", "Mortis", "Gale"],       sinergias: ["Sandy", "Emz", "Gene", "Poco", "Gale"] },
    "Ollie":        { bomContra: ["Poco", "Griff", "Edgar", "Mortis", "Frank"],         ruimContra: ["Griff", "Frank", "Bull", "Mortis", "Gale"],            sinergias: ["Sandy", "Emz", "Gene", "Poco", "Gale"] },
    "Otis":         { bomContra: ["Poco", "Ruffs", "Charlie", "Alli", "Edgar"],         ruimContra: ["Charlie", "Alli", "Frank", "Bull", "Mortis"],          sinergias: ["Sandy", "Emz", "Gene", "Poco", "Gale"] },
    "Pam":          { bomContra: ["Colette", "Lumi", "Crow", "Lou", "Edgar"],           ruimContra: ["Lumi", "Crow", "Lou", "Frank", "Bull"],                sinergias: ["Sandy", "Emz", "Gene", "Poco", "Gale"] },
    "Pearl":        { bomContra: ["Finx", "Pam", "Lola", "Edgar", "Mortis"],            ruimContra: ["Finx", "Pam", "Lola", "Frank", "Bull"],               sinergias: ["Sandy", "Emz", "Gene", "Poco", "Gale"] },
    "Penny":        { bomContra: ["Willow", "Barley", "Edgar", "Mortis", "Frank"],      ruimContra: ["Willow", "Barley", "Frank", "Bull", "Mortis"],         sinergias: ["Sandy", "Emz", "Gene", "Poco", "Gale"] },
    "Pierce":       { bomContra: ["Charlie", "Ruffs", "Nani", "Piper", "Edgar"],        ruimContra: ["Nani", "Piper", "Frank", "Bull", "Mortis"],            sinergias: ["Sandy", "Emz", "Gene", "Poco", "Gale"] },
    "Piper":        { bomContra: ["Nani", "Kaze", "Brock", "Edgar", "Mortis"],          ruimContra: ["Nani", "Kaze", "Brock", "Frank", "Bull"],              sinergias: ["Sandy", "Emz", "Gene", "Poco", "Gale"] },
    "Poco":         { bomContra: ["Crow", "Byron", "Meg", "Kit", "Edgar"],              ruimContra: ["Byron", "Meg", "LawrieLarry", "Kit", "Frank"],         sinergias: ["Sandy", "Emz", "Gene", "Gale", "Brock"] },
    "R-T":          { bomContra: ["Gus", "Leon", "Jae Yong", "Max", "Edgar"],           ruimContra: ["Leon", "Jae Yong", "Max", "Frank", "Bull"],            sinergias: ["Sandy", "Emz", "Gene", "Poco", "Gale"] },
    "Rico":         { bomContra: ["Colt", "Griff", "Brock", "Edgar", "Mortis"],         ruimContra: ["Griff", "Brock", "Frank", "Bull", "Mortis"],           sinergias: ["Sandy", "Emz", "Gene", "Poco", "Gale"] },
    "Rosa":         { bomContra: ["Frank", "Bull", "Shelly", "Amber", "Mortis"],        ruimContra: ["Frank", "Bull", "Shelly", "Gale", "Colette"],          sinergias: ["Sandy", "Emz", "Gene", "Poco", "Gale"] },
    "Ruffs":        { bomContra: ["Ollie", "Carl", "Janet", "Belle", "Jae Yong"],       ruimContra: ["Carl", "Janet", "Belle", "Frank", "Bull"],             sinergias: ["Sandy", "Emz", "Gene", "Poco", "Gale"] },
    "Sam":          { bomContra: ["Frank", "Bull", "Gale", "Edgar", "Mortis"],          ruimContra: ["Frank", "Bull", "Gale", "Mortis", "Colette"],          sinergias: ["Sandy", "Emz", "Gene", "Poco", "Gale"] },
    "Sandy":        { bomContra: ["Nita", "Kenji", "Draco", "Edgar", "Mortis"],         ruimContra: ["Kenji", "Draco", "Frank", "Bull", "Mortis"],           sinergias: ["Emz", "Gene", "Poco", "Gale", "Brock"] },
    "Shade":        { bomContra: ["Lou", "Hank", "Edgar", "Mortis", "Frank"],           ruimContra: ["Lou", "Hank", "Frank", "Bull", "Mortis"],              sinergias: ["Sandy", "Emz", "Gene", "Poco", "Gale"] },
    "Shelly":       { bomContra: ["Nita", "Stu", "Juju", "LawrieLarry", "Surge"],       ruimContra: ["Surge", "Frank", "Bull", "Mortis", "Gale"],            sinergias: ["Sandy", "Emz", "Gene", "Poco", "Gale"] },
    "Sirius":       { bomContra: ["Amber", "Lumi", "Carl", "Nita", "Edgar"],            ruimContra: ["Lumi", "Carl", "Nita", "Frank", "Bull"],               sinergias: ["Sandy", "Emz", "Gene", "Poco", "Gale"] },
    "Spike":        { bomContra: ["Pierce", "Piper", "willow", "Edgar", "Mortis"],      ruimContra: ["Pierce", "Piper", "Frank", "Bull", "Mortis"],          sinergias: ["Sandy", "Emz", "Gene", "Poco", "Gale"] },
    "Sprout":       { bomContra: ["Mico", "Kit", "Mortis", "Edgar", "Frank"],           ruimContra: ["Kit", "Mortis", "Frank", "Bull", "Gale"],              sinergias: ["Sandy", "Emz", "Gene", "Poco", "Gale"] },
    "Squeak":       { bomContra: ["Buzz", "Kenji", "Edgar", "Mortis", "Frank"],         ruimContra: ["Buzz", "Kenji", "Frank", "Bull", "Mortis"],            sinergias: ["Sandy", "Emz", "Gene", "Poco", "Gale"] },
    "Starr Nova":   { bomContra: ["Otis", "Gale", "Edgar", "Mortis", "Frank"],          ruimContra: ["Gale", "Frank", "Bull", "Mortis", "Colette"],          sinergias: ["Sandy", "Emz", "Gene", "Poco", "Gale"] },
    "Stu":          { bomContra: ["Ruffs", "Tara", "Charlie", "Edgar", "Mortis"],       ruimContra: ["Tara", "Charlie", "Frank", "Bull", "Mortis"],          sinergias: ["Sandy", "Emz", "Gene", "Poco", "Gale"] },
    "Surge":        { bomContra: ["Ruffs", "Juju", "Edgar", "Mortis", "Frank"],         ruimContra: ["Juju", "Frank", "Bull", "Mortis", "Cordelius"],        sinergias: ["Sandy", "Emz", "Gene", "Poco", "Gale"] },
    "Tara":         { bomContra: ["Janet", "Sandy", "Juju", "Edgar", "Mortis"],         ruimContra: ["Sandy", "Juju", "Frank", "Bull", "Mortis"],            sinergias: ["Sandy", "Emz", "Gene", "Poco", "Gale"] },
    "Tick":         { bomContra: ["Bull", "Frank", "Edgar", "Mortis", "Colette"],       ruimContra: ["Frank", "Bull", "Mortis", "Gale", "Colette"],          sinergias: ["Sandy", "Emz", "Gene", "Poco", "Gale"] },
    "Trunk":        { bomContra: ["Frank", "Bull", "Mina", "Edgar", "Mortis"],          ruimContra: ["Frank", "Bull", "Mina", "Mortis", "Gale"],             sinergias: ["Sandy", "Emz", "Gene", "Poco", "Gale"] },
    "Willow":       { bomContra: ["Juju", "LarryLawrie", "Najia", "Edgar", "Mortis"],   ruimContra: ["LarryLawrie", "Najia", "Frank", "Bull", "Mortis"],     sinergias: ["Sandy", "Emz", "Gene", "Poco", "Gale"] },
    "Ziggy":        { bomContra: ["Kaze", "Edgar", "Kenji", "Mortis", "Frank"],         ruimContra: ["Kaze", "Edgar", "Kenji", "Frank", "Bull"],             sinergias: ["Sandy", "Emz", "Gene", "Poco", "Gale"] }
};

const BRAWLERS = ["Damian", "8-Bit", "Alli", "Amber", "Angelo", "Ash", "Barley", "Bea", "Belle", "Berry", "Bibi", "Bo", "Bolt", "Bonnie", "Brock", "Bull", "Buster", "Buzz", "Byron", "Carl", "Charlie", "Chester", "Chuck", "Clancy", "Colette", "Colt", "Cordelius", "Crow", "Darryl", "Doug", "Draco", "Dynamike", "Edgar", "El Primo", "Emz", "Eve", "Fang", "Finx", "Frank", "Gale", "Gene", "Gigi", "Glowy", "Gray", "Griff", "Grom", "Gus", "Hank", "Jacky", "Jae Yong", "Janet", "Jessie", "Juju", "Kaze", "Kenji", "Kit", "LarryLawrie", "Leon", "Lily", "Lola", "Lou", "Lumi", "Maisie", "Mandy", "Max", "Meeple", "Meg", "Melodie", "Mico", "Mina", "Moe", "Mortis", "Mr.P", "Najia", "Nani", "Nita", "Nori", "Ollie", "Otis", "Pam", "Pearl", "Penny", "Pierce", "Piper", "Poco", "R-T", "Rico", "Rosa", "Ruffs", "Sam", "Sandy", "Shade", "Shelly", "Sirius", "Spike", "Sprout", "Squeak", "Stu", "Surge", "Starr Nova", "Tara", "Tick", "Trunk", "Willow", "Ziggy"].sort();

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

function limparNome(nome) { return !nome ? "" : nome.toLowerCase().replace(/[^a-z0-9]/g, ''); }

function criarConteudoSlot(nome, id) {
    return `<div class="slot-assets"><img src="brawlers/${id}.png" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"><div class="slot-fallback-text">${nome}</div></div>`;
}

// Busca os dados do brawler no DADOS_BRAWLERS (ignora capitalização)
function obterDadosBrawler(nome) {
    if (!nome) return null;
    const key = Object.keys(DADOS_BRAWLERS).find(k => limparNome(k) === limparNome(nome));
    return key ? DADOS_BRAWLERS[key] : null;
}

// =====================================================================================
// MODAL DE SUGESTÃO (Bom Contra / Ruim Contra / Melhores Sinergias)
// =====================================================================================
function abrirModalSugestao(nomeBrawler, event) {
    if (event) event.stopPropagation();

    // Remove modal anterior se existir
    const existente = document.getElementById('modal-sugestao-draft');
    if (existente) existente.remove();

    const dados = obterDadosBrawler(nomeBrawler);
    const id = limparNome(nomeBrawler);

    const renderLista = (lista, cor) => {
        if (!lista || lista.length === 0) return '<span style="color:#555; font-size:11px;">Sem dados</span>';
        return lista.map(n => {
            const nId = limparNome(n);
            return `<div style="display:flex; align-items:center; gap:6px; padding:4px 0; border-bottom:1px solid rgba(255,255,255,0.05);">
                <img src="brawlers/${nId}.png" onerror="this.style.display='none'" style="width:28px; height:28px; border-radius:6px; object-fit:cover;">
                <span style="font-size:12px; font-weight:700; color:#e2e8f0;">${n}</span>
            </div>`;
        }).join('');
    };

    const bomContra   = dados ? dados.bomContra   : [];
    const ruimContra  = dados ? dados.ruimContra  : [];
    const sinergias   = dados ? dados.sinergias   : [];

    const modal = document.createElement('div');
    modal.id = 'modal-sugestao-draft';
    modal.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0,0,0,0.75); z-index: 9999;
        display: flex; align-items: center; justify-content: center;
    `;
    modal.onclick = (e) => { if (e.target === modal) modal.remove(); };

    modal.innerHTML = `
        <div style="background:#1a1d26; border:1px solid #334155; border-radius:14px; width:360px; max-width:95vw; max-height:90vh; overflow-y:auto; padding:20px; position:relative;">
            <button onclick="document.getElementById('modal-sugestao-draft').remove()" style="position:absolute; top:12px; right:14px; background:transparent; border:none; color:#94a3b8; font-size:18px; cursor:pointer; line-height:1;">✕</button>

            <!-- Cabeçalho -->
            <div style="display:flex; align-items:center; gap:12px; margin-bottom:18px; padding-bottom:12px; border-bottom:1px solid #334155;">
                <img src="brawlers/${id}.png" onerror="this.style.display='none'" style="width:52px; height:52px; border-radius:10px; object-fit:cover; border:2px solid #60a5fa;">
                <div>
                    <div style="font-size:16px; font-weight:900; color:#fff;">${nomeBrawler}</div>
                    <div style="font-size:11px; color:#64748b; margin-top:2px;">Análise de Matchup (ALL Regiões)</div>
                </div>
            </div>

            <!-- Bom Contra -->
            <div style="margin-bottom:16px;">
                <div style="font-size:12px; font-weight:800; color:#4ade80; margin-bottom:8px; display:flex; align-items:center; gap:6px;">
                    <span>✅</span> BOM CONTRA
                </div>
                ${renderLista(bomContra, '#4ade80')}
            </div>

            <!-- Ruim Contra -->
            <div style="margin-bottom:16px; padding-top:12px; border-top:1px solid #1e293b;">
                <div style="font-size:12px; font-weight:800; color:#f87171; margin-bottom:8px; display:flex; align-items:center; gap:6px;">
                    <span>⚠️</span> RUIM CONTRA
                </div>
                ${renderLista(ruimContra, '#f87171')}
            </div>

            <!-- Melhores Sinergias -->
            <div style="padding-top:12px; border-top:1px solid #1e293b;">
                <div style="font-size:12px; font-weight:800; color:#a78bfa; margin-bottom:8px; display:flex; align-items:center; gap:6px;">
                    <span>🤝</span> MELHORES SINERGIAS
                </div>
                ${renderLista(sinergias, '#a78bfa')}
            </div>

            ${!dados ? '<p style="color:#64748b; font-size:11px; text-align:center; margin-top:12px;">Dados ainda não cadastrados para este brawler na base ALL.</p>' : ''}
        </div>
    `;

    document.body.appendChild(modal);
}

// Cria o conteúdo do slot com ícone de sugestão (só para picks, não para bans)
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
        mapImg.onerror = function() { this.style.display = 'none'; if (placeholder) { placeholder.style.display = 'block'; placeholder.innerHTML = 'IMAGEM<br>N\u00c3O<br>ENCONTRADA'; } };
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
// 3. META (painel lateral mantido; painéis de counter removidos)
// =====================================================================================
window.atualizarMeta = function() {
    const container = document.getElementById('meta-list');
    if (!container) return;
    container.innerHTML = "";
    const metaBrawlers = DADOS_META[mapaEscolhido];
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
        // Pré-seleção: já mostra o ícone de sugestão nos picks
        const sugestaoBtn = step.type === 'pick'
            ? `<div class="slot-sugestao-btn" onclick="abrirModalSugestao('${nome}', event)" title="Ver análise"
                style="position:absolute; bottom:3px; right:3px; width:22px; height:22px; cursor:pointer; z-index:10; border-radius:50%; background:rgba(0,0,0,0.55); display:flex; align-items:center; justify-content:center; overflow:hidden;">
                <img src="element/sugestion.png" onerror="this.style.display='none'; this.parentElement.innerHTML='💡';" style="width:16px; height:16px; object-fit:contain;">
               </div>`
            : '';
        slot.innerHTML = `<div class="slot-assets pre-selecting" onclick="window.confirmarBlueSelection(event)" style="position:relative;">
            <img src="brawlers/${id}.png" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';">
            <div class="slot-fallback-text">${nome}</div>
            <div class="pre-select-badge">\u2713</div>
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
        // Picks ganham ícone de sugestão; bans não
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
            const dadosAzul = obterDadosBrawler(azul);
            const dadosVerm = obterDadosBrawler(verm);
            if (dadosAzul && dadosAzul.bomContra && dadosAzul.bomContra.some(c => limparNome(c) === limparNome(verm))) pontosNosso++;
            if (dadosVerm && dadosVerm.bomContra && dadosVerm.bomContra.some(c => limparNome(c) === limparNome(azul))) pontosInimigo++;
        });
    });
    let prob = 50 + (pontosNosso - pontosInimigo) * 5;
    return Math.max(5, Math.min(95, prob));
}

function calcularPontosFracos() {
    return picksAzuis.filter(azul => {
        return picksVermelhos.some(verm => {
            const dadosVerm = obterDadosBrawler(verm);
            return dadosVerm && dadosVerm.bomContra && dadosVerm.bomContra.some(c => limparNome(c) === limparNome(azul));
        });
    });
}

function sugerirMelhorTroca(brawlerAtual) {
    const usados = new Set([...picksAzuis, ...picksVermelhos].map(limparNome));
    let candidatos = BRAWLERS.filter(b => !usados.has(limparNome(b)));
    // Prefere quem tem menos "ruim contra" em relação aos picks vermelhos
    candidatos.sort((a, b) => {
        const dadosA = obterDadosBrawler(a), dadosB = obterDadosBrawler(b);
        const riscoA = dadosA && dadosA.ruimContra ? picksVermelhos.filter(v => dadosA.ruimContra.some(r => limparNome(r) === limparNome(v))).length : 0;
        const riscoB = dadosB && dadosB.ruimContra ? picksVermelhos.filter(v => dadosB.ruimContra.some(r => limparNome(r) === limparNome(v))).length : 0;
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
            const dadosV = obterDadosBrawler(v);
            return dadosV && dadosV.bomContra && dadosV.bomContra.some(c => limparNome(c) === limparNome(p));
        });
    });

    const painel = document.getElementById('analise-final');
    painel.style.display = 'flex';
    painel.innerHTML = `
        <div class="analise-card">
            <h3>PROBABILIDADE DE VIT\u00d3RIA (NOSSO TIME - AZUL)</h3>
            <div class="winrate-bar-wrap"><div class="winrate-bar-fill" style="width:${prob}%;">${prob.toFixed(0)}%</div></div>
        </div>

        <div class="analise-card">
            <h3>PONTOS FRACOS DO TIME</h3>
            <ul class="analise-lista">
                ${fracos.length > 0
                    ? fracos.map(f => `<li>\u26a0\ufe0f <strong>${f}</strong> est\u00e1 em risco — o advers\u00e1rio tem brawlers que s\u00e3o bons contra ele.</li>`).join('')
                    : '<li>\u2705 Nenhum ponto fraco cr\u00edtico identificado nos confrontos diretos.</li>'}
            </ul>
        </div>

        <div class="analise-card">
            <h3>O QUE PODIA SER MELHOR</h3>
            <ul class="analise-lista">
                ${picksEmRisco.length > 0 ? picksEmRisco.map(p => {
                    const sugestao = sugerirMelhorTroca(p);
                    const idAtual = limparNome(p), idSugestao = sugestao ? limparNome(sugestao) : null;
                    return `<li><div class="troca-sugestao"><img src="brawlers/${idAtual}.png" onerror="this.src='brawlers/default.png'"><span class="troca-x">X</span>${sugestao ? `<img src="brawlers/${idSugestao}.png" onerror="this.src='brawlers/default.png'">` : ''}</div><span>Trocar <strong>${p}</strong> ${sugestao ? `por <strong>${sugestao}</strong>` : ''} reduziria a exposi\u00e7\u00e3o aos counters do advers\u00e1rio.</span></li>`;
                }).join('') : '<li>\u2705 Nenhuma troca cr\u00edtica necess\u00e1ria \u2014 draft s\u00f3lido.</li>'}
            </ul>
        </div>

        <div class="analise-card">
            <h3>RESUMO DO DRAFT (MAPA + BANS + PICKS)</h3>
            <div id="print-preview-holder" style="display:flex; justify-content:center;"></div>
            <button class="btn-baixar-print" onclick="window.baixarImagemDraft()">\u2b07\ufe0f BAIXAR IMAGEM DO DRAFT</button>
        </div>

        <button class="btn-novo-draft" onclick="window.location.reload()">COME\u00c7AR NOVO DRAFT</button>
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
    if (!alvo || typeof html2canvas === 'undefined') { alert('N\u00e3o foi poss\u00edvel gerar a imagem (html2canvas n\u00e3o carregado).'); return; }
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
function inicializarSistema() {
    gerarRoster();
    document.getElementById('btn-iniciar-draft').addEventListener('click', iniciarSetup);
    const searchInput = document.getElementById('search');
    if (searchInput) { searchInput.removeAttribute('oninput'); searchInput.addEventListener('input', window.filtrar); }
}

if (document.readyState === 'loading') { document.addEventListener('DOMContentLoaded', inicializarSistema); }
else { inicializarSistema(); }
