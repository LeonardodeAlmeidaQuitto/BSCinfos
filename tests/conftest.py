import os
import sys

# Ensure the repository root (where gerador.py / gerador_team.py live) is importable
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if ROOT not in sys.path:
    sys.path.insert(0, ROOT)
