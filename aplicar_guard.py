#!/usr/bin/env python3
"""
aplicar_guard.py
Aplica o guard de autenticação em todos os HTMLs do repositório BSCinfos.

USO:
  1. Copie este script para a raiz do repositório BSCinfos clonado localmente.
  2. Execute:  python3 aplicar_guard.py
  3. Faça commit e push de todos os arquivos modificados + os 3 novos arquivos.
"""

import os
import re

# Páginas que precisam de proteção (todas exceto login.html)
PAGINAS = [
    "index.html",
    "geral.html",
    "draft.html",
    "coach.html",
    "ea.html",
    "emea.html",
    "na.html",
    "sa.html",
    "player.html",
    "regioes.html",
]

# Trecho que será inserido logo após a tag <head>
GUARD = '    <script src="users.js"></script>\n    <script src="auth.js"></script>\n'

def ja_tem_guard(conteudo):
    return 'src="auth.js"' in conteudo or "src='auth.js'" in conteudo

def aplicar(arquivo):
    if not os.path.exists(arquivo):
        print(f"  AVISO: {arquivo} não encontrado, pulando.")
        return False

    with open(arquivo, "r", encoding="utf-8") as f:
        conteudo = f.read()

    if ja_tem_guard(conteudo):
        print(f"  OK (já tem guard): {arquivo}")
        return False

    # Insere logo após <head> (qualquer variação de capitalização/atributos)
    novo = re.sub(
        r'(<head[^>]*>)',
        r'\1\n' + GUARD.rstrip('\n'),
        conteudo,
        count=1,
        flags=re.IGNORECASE,
    )

    if novo == conteudo:
        print(f"  AVISO: não encontrou <head> em {arquivo}, pulando.")
        return False

    with open(arquivo, "w", encoding="utf-8") as f:
        f.write(novo)

    print(f"  Guard adicionado: {arquivo}")
    return True

def main():
    print("=== Aplicando guard de autenticação BSCinfos ===\n")
    modificados = []
    for pag in PAGINAS:
        if aplicar(pag):
            modificados.append(pag)

    print(f"\nConcluído. {len(modificados)} arquivo(s) modificado(s).")
    if modificados:
        print("\nPróximos passos:")
        print("  git add users.js auth.js login.html aplicar_guard.py " + " ".join(modificados))
        print('  git commit -m "feat: sistema de login BSCinfos"')
        print("  git push")

if __name__ == "__main__":
    main()
