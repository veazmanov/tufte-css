Tufte CSS (vjbe fork)
=====================
A fork of [edwardtufte/tufte-css](https://github.com/edwardtufte/tufte-css), shared by
the vjbe.net projects so none of them keeps its own copy. Changes are marked `[vjbe]` in
`tufte.css`.

Demo: https://tufte.vjbe.net/

- **`box-sizing: border-box`** on everything (mobile gutters narrowed to match).
- **A warm paper palette, with dark mode, as variables.** It follows the system setting, and
  `<html data-theme="light|dark">` overrides it. Projects should use these rather than colours of their own:

  | Variable | Light | Dark | For |
  |---|---|---|---|
  | `--tufte-bg` | `#fffff8` | `#1a1814` | the page |
  | `--tufte-paper`, `--tufte-paper-edge` | `#fdfaef`, `#e7dfc9` | `#23201a`, `#3a3428` | a sheet on the page: cards, plaques |
  | `--tufte-panel`, `--tufte-panel-edge`, `--tufte-panel-hover` | `#f3eedf`, `#ddd3b9`, `#e9e2cd` | `#2a261f`, `#463f32`, `#353026` | panels and buttons |
  | `--tufte-ink`, `--tufte-ink-soft` | `#1a1712`, `#4a4438` | `#e8e1d1`, `#c9c0ad` | text |
  | `--tufte-muted`, `--tufte-faint` | `#6b6455`, `#a39a87` | `#a39a87`, `#7a7262` | captions, notes, quiet controls |
  | `--tufte-rule` | `#d8d2c4` | `#3d382f` | hairlines |
  | `--tufte-accent` | `#8a2b1d` | `#d9826f` | sparingly: ornaments, the current page |
  | `--tufte-shadow-rgb` | `60, 45, 10` | `0, 0, 0` | `rgba(var(--tufte-shadow-rgb), 0.1)` |
  | `--tufte-img-dim` | `brightness(1)` | `brightness(0.85)` | a `filter` for photographs (never inverted) |

  Printing always uses the light values, on white.
- **Gemini-style links.** Links don't go inside sentences: each stands on a line of its own, in a
  sidenote or in a `<ul class="links">` at the end of its section (marked ⇒, address printed
  underneath on paper). Internal `#` links may stay in the text; `theme.js` warns in the console
  about any other link inside a paragraph. Links are the colour of the text, underlined; set `--tufte-link` / `--tufte-link-visited` to colour them.
- **A light/dark toggle and a print button**, pinned bottom-left. `theme.js` adds both
  (`data-print-button="false"` leaves the print button out), or uses a `.theme-toggle` /
  `.print-button` already in the page.
- **A page footer**: a `<footer>` straight inside `<body>` is set small and muted under a hairline.
- **Small fixes**: sidenote markers ignore an indented paragraph's first-line indent; an image in
  a margin note sits above its caption and is dimmed in dark mode.
- **Print as a first-class citizen**: always light; the sidenote layout is kept on paper (the
  mobile layout is screen-only); the address of every external link is printed (`.no-url` opts a
  link out); a "Printed from <url> on <date>" line
  (`.print-source`, filled in by `theme.js`, added automatically if missing); page numbers
  (Chrome 131+); wrapped code; iframes replaced by their link; no breaks after headings or
  inside figures/tables; `.no-print` / `.print-only` helper classes.

### Using it in a project

Link the current major version from tufte.vjbe.net:

```html
<link rel="stylesheet" href="https://tufte.vjbe.net/2/tufte.css">
<!-- the toggle, print button and "Printed from" line; data-key, data-cookie-domain,
     data-print-button and data-print-source are optional -->
<script src="https://tufte.vjbe.net/2/theme.js" data-cookie-domain="vjbe.net"></script>
```

`/2/` gets every 2.x release; `/2.3.0/` never changes. Or vendor it as a submodule:

```bash
git submodule add https://github.com/veazmanov/tufte-css.git <web-root>/tufte
```

See the top of `theme.js` for a `<head>` snippet that stops the wrong theme flashing on load.
Put your own styles in a separate stylesheet loaded after `tufte.css`, using the `--tufte-` variables
rather than colours of your own; anything generic belongs in this repo instead.

### Releasing

1. Bump `version` in `package.json` (major for anything that changes how existing pages look).
2. `npm test` (rebuilds `tufte.min.css`), then commit.
3. `npm run release`: builds `dist/`, deploys it with `deploy dist tufte`, tags and pushes `v<version>`.

### Pulling in upstream changes

```bash
git fetch upstream && git merge upstream/gh-pages
```

---

Tufte CSS
=========
Edward Tufte uses a distinctive style in his handouts: simple, with well-set
typography, extensive sidenotes, and tight integration of graphics and
charts. `tufte-css` brings that style to HTML documents.

This project is directly inspired by and
based on [Tufte-LaTeX](https://tufte-latex.github.io/tufte-latex/) and the
[R Markdown Tufte Handout](http://rmarkdown.rstudio.com/examples/tufte-handout.pdf).


Getting Started
-
The file *index.html* is a self-describing demonstration document that walks through
the features of Tufte CSS. The live version at
[https://edwardtufte.github.io/tufte-css/](https://edwardtufte.github.io/tufte-css/)
is the best overview of the project.

To use Tufte CSS, just copy `tufte.css` and the `et-book` font
directory to your project and add the following to your HTML doc's
head block:

```html
<link rel="stylesheet" href="tufte.css"/>
```

All other files in the repository can be ignored, as they are merely
used by the demonstration document.


Project Scope and Status
-
Tufte CSS is specifically a CSS-only solution for styling HTML for the web.

That means that JavaScript solutions, although often superior to pure CSS, are out of scope for this project and will not be used. Also out of scope are handling printed versions of web pages and integration with static site generators or other formats. Thankfully, all these useful applications can be well served by separate work that builds on top of Tufte CSS.

This project is maintained but not under active development. It is considered essentially feature-complete. Refactoring and new functionality are a very low priority. However, contributions are still welcome to fix bugs or add functionality.


Testing
-
Tests use [Playwright](https://playwright.dev/) to assert computed CSS properties. `npm install` to set up, `npm test` to run. Fixtures in `tests/` are plain HTML files — open one directly in a browser to inspect a feature in isolation.


Deploying
-
1. Make changes
2. From shell: `npm run build`
3. Bump version in *package.json*
4. From shell: `npm publish`


Contributing
-
If you notice something wrong or broken, let us know by opening an
issue, or better yet, a pull request with how you think it should be
fixed.

Please document your issues and fixes thoroughly. This means a clear
description of the concern, steps on how to reproduce it, and (if
possible) before and after screenshots and links to prior discussions
or commits. Please keep pull requests to one change at a time.

Fixes and new functionality should be tested against `index.html` on
screens as small as an iPhone 4 and as big as, well, as big as you use
normally. (If you don't have a mobile device handy, fake different
devices with your browser's developer tools.)

See the Issues page, especially [Help
Wanted](https://github.com/edwardtufte/tufte-css/labels/help%20wanted),
for opportunities to contribute.


Contributors
-
 - Dave Liepmann (creator, project maintainer, design)
 - Edward Tufte (editing, direction, design)
 - [Adam Schwartz](https://github.com/adamschwartz) (ET Book font)
 - [Clay Harmon](https://github.com/edwardtufte/tufte-css/commits/master?author=clayh53) (media queries, rem units)
 - [Linjie Ding](https://github.com/edwardtufte/tufte-css/commits/master?author=pyrocat101) (italic typeface)
 - [Stephen A Thomas](https://github.com/edwardtufte/tufte-css/commits/master?author=sathomas) (automagically numbered sidenotes)
 - [Ben Newman](https://github.com/edwardtufte/tufte-css/pull/9) (sidenote numbering style)
 - [Kevin Godby](https://github.com/edwardtufte/tufte-css/commits/master?author=godbyk) (booktabs tables)
 - [James Kolce](https://github.com/edwardtufte/tufte-css/commits/master?author=jameskolce) (sidenote fixes)
 - [Chris MacKay](https://github.com/crmackay) (sidenote toggling on small screens)
 - [Paul Rodriguez](https://github.com/edwardtufte/tufte-css/commits/master?author=ruricolist)
   (sidenote style tweaks)
 - [Claudiu-Vlad Ursache](https://github.com/edwardtufte/tufte-css/commits/master?author=ursachec) (HTML5 conformity)


License
-
Released under the MIT license. See [LICENSE](https://github.com/edwardtufte/tufte-css/blob/gh-pages/LICENSE).
