import re, os
os.chdir('/home/ubuntu/repos/BSCinfos')
for f in ['sa.html','na.html','emea.html','ea.html','geral.html']:
    s = open(f, encoding='utf-8').read()
    if 'tela-mapas' in s:
        print(f, 'already patched'); continue
    # menu link: insert Mapas between Brawlers and Times
    s = re.sub(r"(<a href=\"#\" onclick=\"mudarTela\('brawlers'\); return false;\">Brawlers</a>\s*\n)(\s*)(<a href=\"#\" onclick=\"mudarTela\('times'\))",
               r"\1\2<a href=\"#\" onclick=\"mudarTela('mapas'); return false;\">Mapas</a>\n\2\3", s)
    # tela-mapas div before tela-times
    tela = '''        <!-- Tela MAPAS -->
        <div id="tela-mapas" class="tela-secao tela-oculta">
            <div class="brawlers-container">
                <div class="sidebar">
                    <div class="sidebar-list" id="lista-mapas-sidebar"></div>
                </div>
                <div class="info-panel" id="painel-info-mapa">
                    <div class="placeholder-text" style="color:var(--texto-secundario); text-align:center;">Selecione um mapa na lateral para ver as estat&iacute;sticas completas.</div>
                </div>
            </div>
        </div>
 
'''
    s = s.replace('        <!-- Tela TIMES -->', tela + '        <!-- Tela TIMES -->')
    # titulos map: add mapas entry
    s = re.sub(r"\{'meta': '([A-Z]+) ▼ \(META\)', 'brawlers': '\1 ▼ \(BRAWLERS\)'",
               r"{'meta': '\1 ▼ (META)', 'brawlers': '\1 ▼ (BRAWLERS)', 'mapas': '\1 ▼ (MAPAS)'", s)
    # guard the menu btn title update against wrong id
    s = s.replace("document.getElementById('sa-menu-btn').textContent = titulos[tela];",
                  "const btnMenu = document.getElementById('sa-menu-btn') || document.getElementById('ea-menu-btn');\n                if (btnMenu && titulos[tela]) btnMenu.textContent = titulos[tela];")
    s = s.replace("document.getElementById('na-menu-btn').textContent = titulos[tela];",
                  "const btnMenu = document.getElementById('na-menu-btn') || document.getElementById('ea-menu-btn');\n                if (btnMenu && titulos[tela]) btnMenu.textContent = titulos[tela];")
    s = s.replace("document.getElementById('emea-menu-btn').textContent = titulos[tela];",
                  "const btnMenu = document.getElementById('emea-menu-btn') || document.getElementById('ea-menu-btn');\n                if (btnMenu && titulos[tela]) btnMenu.textContent = titulos[tela];")
    s = s.replace("document.getElementById('ea-menu-btn').textContent = titulos[tela];",
                  "const btnMenu = document.getElementById('ea-menu-btn');\n                if (btnMenu && titulos[tela]) btnMenu.textContent = titulos[tela];")
    s = s.replace("document.getElementById('geral-menu-btn').textContent = titulos[tela];",
                  "const btnMenu = document.getElementById('geral-menu-btn') || document.getElementById('ea-menu-btn');\n                if (btnMenu && titulos[tela]) btnMenu.textContent = titulos[tela];")
    open(f, 'w', encoding='utf-8').write(s)
    print(f, 'patched:', 'tela-mapas' in s, "menu:", "mudarTela('mapas')" in s, "titulo:", "'mapas':" in s)

Devin Desktop app
Install Desktop
Install CLI
