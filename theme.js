// theme.js — the light/dark toggle for this fork of Tufte CSS.
//
// The page follows the system setting until the reader picks a theme; the choice is then kept in
// <html data-theme>, in localStorage and (optionally) in a cookie, so sibling subdomains can share it.
//
// Usage, at the end of <body>:
//     <script src="tufte/theme.js" data-key="tufte-theme" data-cookie-domain="example.net"></script>
// Both attributes are optional. If the page has no element with class "theme-toggle", a button is added.
//
// To avoid a flash of the wrong theme, also put this in <head> (same key):
//     <script>try{var t=(document.cookie.match(/(?:^|; )tufte-theme=(light|dark)/)||[])[1]||localStorage.getItem('tufte-theme');if(t==='light'||t==='dark')document.documentElement.dataset.theme=t}catch(e){}</script>
(function () {
    var script = document.currentScript;
    var key = (script && script.dataset.key) || 'tufte-theme';
    var cookieDomain = script && script.dataset.cookieDomain;
    var root = document.documentElement;
    var system = window.matchMedia('(prefers-color-scheme: dark)');

    // Apply a stored choice, in case the <head> snippet isn't there
    try {
        var stored = (document.cookie.match(new RegExp('(?:^|; )' + key + '=(light|dark)')) || [])[1] || localStorage.getItem(key);
        if (!root.dataset.theme && (stored === 'light' || stored === 'dark')) root.dataset.theme = stored;
    } catch (e) {}

    var button = document.querySelector('.theme-toggle');
    if (!button) {
        button = document.createElement('button');
        button.type = 'button';
        button.className = 'theme-toggle';
        button.innerHTML =
            '<svg class="theme-icon-dark" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
            '<path fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/></svg>' +
            '<svg class="theme-icon-light" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' +
            '<circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.6"/>' +
            '<path stroke="currentColor" stroke-width="1.6" stroke-linecap="round" d="M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M5.3 5.3l1.8 1.8M16.9 16.9l1.8 1.8M5.3 18.7l1.8-1.8M16.9 7.1l1.8-1.8"/></svg>';
        document.body.appendChild(button);
    }

    function current() {
        return root.dataset.theme || (system.matches ? 'dark' : 'light');
    }

    function label() {
        var next = current() === 'dark' ? 'light' : 'dark';
        button.setAttribute('aria-label', 'Switch to ' + next + ' mode');
        button.title = 'Switch to ' + next + ' mode';
    }

    function remember(theme) {
        var domain = cookieDomain && (location.hostname === cookieDomain || location.hostname.endsWith('.' + cookieDomain))
            ? '; domain=' + cookieDomain : '';
        document.cookie = key + '=' + theme + '; path=/; max-age=31536000; SameSite=Lax' + domain;
        try {
            localStorage.setItem(key, theme);
        } catch (e) {}
    }

    button.addEventListener('click', function () {
        var next = current() === 'dark' ? 'light' : 'dark';
        root.dataset.theme = next;
        remember(next);
        label();
    });

    system.addEventListener('change', label);
    label();
    button.hidden = false;
})();
