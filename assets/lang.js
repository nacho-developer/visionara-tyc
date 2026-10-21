// Redirige a la versión del idioma del navegador (es o en) antes de pintar la página.
// La elección manual en el selector (?lang=xx) tiene prioridad y se recuerda.
(function () {
    const KEY = 'visionara-lang';
    const pageLang = document.documentElement.lang;
    const root = new URL('../', document.currentScript.src);

    // No redirigir a buscadores, para que indexen las dos versiones
    if (/bot|crawl|spider|slurp|lighthouse/i.test(navigator.userAgent)) return;

    const params = new URLSearchParams(location.search);
    const chosen = params.get('lang');
    if (chosen === 'es' || chosen === 'en') {
        try { localStorage.setItem(KEY, chosen); } catch (e) {}
        params.delete('lang');
        const query = params.toString();
        history.replaceState(null, '', location.pathname + (query ? '?' + query : '') + location.hash);
        return;
    }

    let wanted = null;
    try { wanted = localStorage.getItem(KEY); } catch (e) {}
    if (wanted !== 'es' && wanted !== 'en') {
        const browser = (navigator.languages && navigator.languages[0]) || navigator.language || '';
        wanted = /^es\b/i.test(browser) ? 'es' : 'en';
    }

    if (wanted !== pageLang) {
        location.replace(new URL(wanted === 'en' ? 'en/' : './', root).href + location.hash);
    }
})();
