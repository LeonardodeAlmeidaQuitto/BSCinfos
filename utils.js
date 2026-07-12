(function(global) {
    function normalizeKey(value) {
        return value ? String(value).toLowerCase().replace(/[^a-z0-9]/g, '') : '';
    }

    function assetKey(value) {
        return normalizeKey(value) || 'default';
    }

    function winRateClass(winRate) {
        const value = parseFloat(winRate);
        if (value >= 80) return 'wr-80';
        if (value >= 60) return 'wr-60-70';
        if (value >= 50) return 'wr-50';
        return 'wr-30';
    }

    function parseCellValue(value, type) {
        const text = value.trim();
        if (type === 'string') return text;

        const number = parseFloat(text.replace('%', '').replace(',', '.'));
        if (type === 'number' || type === 'percent') return number || 0;
        return Number.isNaN(number) ? text : number;
    }

    function sortTableRows(table, columnIndex, options = {}) {
        const tbody = table.querySelector('tbody');
        if (!tbody) return;

        const ascending = options.ascending !== false;
        const type = options.type || 'auto';
        const direction = ascending ? 1 : -1;
        const rows = Array.from(tbody.querySelectorAll('tr'));

        rows.sort((rowA, rowB) => {
            const valueA = parseCellValue(rowA.cells[columnIndex].innerText, type);
            const valueB = parseCellValue(rowB.cells[columnIndex].innerText, type);
            if (typeof valueA === 'string' && typeof valueB === 'string') {
                return valueA.localeCompare(valueB) * direction;
            }
            return (valueA - valueB) * direction;
        });

        tbody.append(...rows);
    }

    function makeTablesSortable(selector = 'table.excel-table') {
        document.querySelectorAll(selector).forEach(table => {
            const headers = table.querySelectorAll('th');
            headers.forEach((header, columnIndex) => {
                if (header.dataset.sortableInitialized === 'true') return;

                header.dataset.sortableInitialized = 'true';
                header.style.cursor = 'pointer';
                header.title = 'Clique para ordenar';
                header.addEventListener('click', () => {
                    const wasAscending = header.classList.contains('asc');
                    headers.forEach(item => item.classList.remove('asc', 'desc'));
                    header.classList.add(wasAscending ? 'desc' : 'asc');
                    sortTableRows(table, columnIndex, { ascending: !wasAscending });
                });
            });
        });
    }

    function initRegionNavigation() {
        const menuButton = document.getElementById('region-menu-btn');
        if (!menuButton) return;

        const regionLabel = document.body.dataset.regionLabel || global.REGIAO_ATUAL || 'SA';
        global.mudarTela = function(screen) {
            document.querySelectorAll('.tela-secao').forEach(section => {
                section.classList.replace('tela-ativa', 'tela-oculta');
            });

            const target = document.getElementById(`tela-${screen}`);
            if (!target) return;

            target.classList.replace('tela-oculta', 'tela-ativa');
            menuButton.textContent = `${regionLabel} ▼ (${screen.toUpperCase()})`;
            document.querySelectorAll('.dropdown').forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        };
    }

    global.BSCUtils = {
        assetKey,
        makeTablesSortable,
        normalizeKey,
        sortTableRows,
        winRateClass
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initRegionNavigation);
    } else {
        initRegionNavigation();
    }
})(window);
