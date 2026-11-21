---
title: "Tufte CSS, in Hugo"
subtitle: "A demonstration of the theme"
date: 2026-11-21
---

{{< newthought >}}This page is written in Markdown{{< /newthought >}} and laid out by the Hugo theme in the vjbe fork of Tufte CSS. Every `h2` opens a new section, so paragraphs keep to the narrow text column and notes have the margin to themselves.

Footnotes are written the usual way,[^usual] and come out as numbered sidenotes beside the sentence they belong to. On a phone they fold away behind their number.

A margin note has no number.{{< marginnote >}}Written with the `marginnote` shortcode. On a phone it opens with ⊕.{{< /marginnote >}} Use it for asides that don't need a pointer in the text.

{{< links >}}
- [The upstream Tufte CSS](https://edwardtufte.github.io/tufte-css/)
- [This fork, with its releases](https://tufte.vjbe.net/)
{{< /links >}}

## Links stand on lines of their own

Links don't go inside sentences. A link goes in a note,{{< sidenote >}}Like this: [Project Gemini](https://geminiprotocol.net/).{{< /sidenote >}} or in a list at the end of its section, which on paper prints the address under each link.

- [A list marked with an attribute](https://gohugo.io/content-management/markdown-attributes/)
- [Instead of the shortcode](https://gohugo.io/)
{.links}

## Epigraphs

{{< epigraph author="Edward Tufte" source="Beautiful Evidence" >}}
The English language does have a fair amount of redundancy.
{{< /epigraph >}}

Write an epigraph with the `epigraph` shortcode; its author and source go in its footer.

## Figures

{{< figure src="/img/napoleons-march.png" alt="Napoleon's March to Moscow" caption="From Edward Tufte, *Beautiful Evidence*, pages 122–124." class="fullwidth" >}}

A figure takes its caption into the margin, or underneath when it is full width.

{{< figure src="/img/rhino.png" alt="Dürer's rhinoceros" caption="F.J. Cole, “The History of Albrecht Dürer’s Rhinoceros in Zoological Literature” (1953)." >}}

## Code

```js
// theme.js warns about links inside sentences
console.warn('tufte: link inside a paragraph');
```

That's all.[^end]

[^usual]: With `[^usual]` in the text and the note at the bottom of the file. A note can have *emphasis*, `code` and [a link](https://daringfireball.net/projects/markdown/).

[^end]: A note of two paragraphs.

    Its paragraphs are joined with a line break.
