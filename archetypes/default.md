---
title: "{{ replace .File.ContentBaseName "-" " " | title }}"
subtitle: ""
date: {{ .Date }}
draft: true
---

Footnotes[^1] become sidenotes. Keep links out of sentences: put them in a
note, or in a list of links at the end of the section.

[^1]: Like this one.
