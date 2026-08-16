// =====================================================================
//  AUTH.JS — Sistema de autenticação BSCinfos
//  Inclua este script em TODAS as páginas protegidas (exceto login.html)
//  ANTES de qualquer outro script da página:
//
//    <script src="users.js"></script>
//    <script src="auth.js"></script>
//
//  Coloque as duas linhas acima como o PRIMEIRO conteúdo do <head>.
// =====================================================================

(function () {
    // Chave usada no sessionStorage
    var SESSION_KEY = 'bsc_auth_user';
    // Tempo de sessão em horas (a sessão expira após esse período)
    var SESSION_HOURS = 8;

    // ── Verifica se existe sessão válida ──────────────────────────────
    function getSessao() {
        try {
            var raw = sessionStorage.getItem(SESSION_KEY);
            if (!raw) return null;
            var obj = JSON.parse(raw);
            if (!obj || !obj.username || !obj.exp) return null;
            if (Date.now() > obj.exp) {
                sessionStorage.removeItem(SESSION_KEY);
                return null;
            }
            return obj;
        } catch (e) {
            return null;
        }
    }

    // ── Cria sessão após login bem-sucedido ───────────────────────────
    window.BSC_LOGIN = function (username, password) {
        var users = window.BSC_USERS || [];
        var found = null;
        for (var i = 0; i < users.length; i++) {
            if (
                users[i].username === username.trim() &&
                users[i].password === password
            ) {
                found = users[i];
                break;
            }
        }
        if (!found) return false;

        var exp = Date.now() + SESSION_HOURS * 60 * 60 * 1000;
        sessionStorage.setItem(SESSION_KEY, JSON.stringify({ username: found.username, exp: exp }));
        return true;
    };

    // ── Encerra sessão ────────────────────────────────────────────────
    window.BSC_LOGOUT = function () {
        sessionStorage.removeItem(SESSION_KEY);
        window.location.href = 'login.html';
    };

    // ── Retorna o usuário logado (ou null) ────────────────────────────
    window.BSC_USER = function () {
        var s = getSessao();
        return s ? s.username : null;
    };

    // ── GUARD: redireciona para login se não estiver autenticado ──────
    // Este bloco roda imediatamente ao carregar o script.
    // Se estamos na login.html, não faz nada.
    var pagina = window.location.pathname.split('/').pop();
    if (pagina !== 'login.html') {
        if (!getSessao()) {
            // Salva a página de destino para redirecionar após login
            try {
                sessionStorage.setItem('bsc_redirect', window.location.href);
            } catch (e) {}
            window.location.replace('login.html');
        }
    }
})();
