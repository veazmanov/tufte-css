const { test, expect } = require('@playwright/test');
const path = require('path');

const fixture = name => 'file://' + path.resolve(__dirname, name + '.html');

test('sup does not expand the line box', async ({ page }) => {
    await page.goto(fixture('sup-line-height'));
    const lineHeight = await page.$eval('sup', el => getComputedStyle(el).lineHeight);
    expect(lineHeight).toBe('0px');
});

// A printed A4 page is narrower than 760px; the mobile layout must not kick in when printing.
test.describe('print', () => {
    test.use({ viewport: { width: 680, height: 1000 } });

    test.beforeEach(async ({ page }) => {
        await page.emulateMedia({ media: 'print' });
        await page.goto(fixture('print'));
    });

    test('sidenotes stay visible in the margin', async ({ page }) => {
        expect(await page.$eval('#sn', el => getComputedStyle(el).display)).toBe('block');
        expect(await page.$eval('#sn', el => getComputedStyle(el).float)).toBe('right');
    });

    test('external links print their address in the margin', async ({ page }) => {
        const after = el => {
            const s = getComputedStyle(el, '::after');
            return { content: s.content, float: s.float };
        };
        const ext = await page.$eval('#ext', after);
        expect(ext.content).toContain('https://example.org/page');
        expect(ext.float).toBe('right');
        expect((await page.$eval('#internal', after)).content).toBe('none');
        expect((await page.$eval('#nourl', after)).content).toBe('none');
    });

    test('a list of links prints each address on its own line', async ({ page }) => {
        const after = await page.$eval('#listed', el => {
            const s = getComputedStyle(el, '::after');
            return { content: s.content, display: s.display };
        });
        expect(after.content).toContain('https://example.org/listed');
        expect(after.display).toBe('inline-block');
    });

    test('theme.js adds a print source line', async ({ page }) => {
        const text = await page.$eval('.print-source', el => el.textContent);
        expect(text).toMatch(/^Printed from file:.*print\.html on /);
    });
});

test('tufte.min.css is built from tufte.css', async () => {
    const fs = require('fs');
    const CleanCSS = require('clean-css');
    const root = path.resolve(__dirname, '..');
    const built = new CleanCSS().minify(fs.readFileSync(path.join(root, 'tufte.css'), 'utf8')).styles;
    expect(fs.readFileSync(path.join(root, 'tufte.min.css'), 'utf8').trim()).toBe(built.trim());
});

test('the demo page keeps links out of its sentences', async ({ page }) => {
    const warnings = [];
    page.on('console', msg => { if (msg.type() === 'warning') warnings.push(msg.text()); });
    await page.goto('file://' + path.resolve(__dirname, '..', 'index.html'));
    expect(warnings.filter(w => w.startsWith('tufte:'))).toEqual([]);
    const inline = await page.$$eval(
        'section > p a[href]:not([href^="#"]):not(.sidenote a):not(.marginnote a)', els => els.length);
    expect(inline).toBe(0);
});
