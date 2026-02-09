---
Title: "A Fresh UI for docling"
Date: 2026-01-15
Category:
Slug: a-fresh-ui-for-docling
hero: images/OCR.png
reading_time: 12 minutes
---

Warum sollte ich das tun? (Und wie?)

Ist „weil ich es kann“ eine ausreichende Antwort? Nein, wahrscheinlich nicht. „weil ich es wollte“? Immer noch nicht? Nun gut, das muss wohl reichen. Der eigentliche Grund ist, dass ich [docling](https://docling-project.github.io/docling/) verwenden musste, um einige Dokumente von einem Format in ein anderes zu konvertieren. Ich hatte immer [pandoc](https://pandoc.org) verwendet, aber da ich bei [Red Hat](https://redhat.com) arbeite und wir uns intensiv mit Docling beschäftigen, dachte ich, ich probiere es mal aus.

Ähnlich wie pandoc ist auch docling ein Kommandozeilenprogramm. Das ist zwar für vieles gut geeignet, insbesondere bei der Automatisierung von Prozessen, aber es ist mühsam, sich alle Kommandozeilenparameter zu merken, wenn man es nicht regelmäßig benutzt. Jedes Mal, wenn ich eine Markdown-Datei in eine .docx-Datei umwandeln muss, muss ich die richtigen Parameter für `pandoc` nachschlagen, und das nervt mit der Zeit.

Das wird ein längerer Text, aber wenn Sie sich nicht für die Details interessieren, können Sie vieles überspringen. Vor allem, wenn Sie nur sehen möchten, wie diese [schicke neue Benutzeroberfläche](#fancy-ui) aussieht und wie sie funktioniert.

Da ich für die Entwicklung dieses Projekts einen Programmierassistenten verwendet habe, werde ich auch den von mir verwendeten Prozess erläutern. Ich nutze Claude Code, daher werde ich dieses Tool in einem [kurzen Abschnitt](#claude-code) genauer vorstellen.

## All die Vorzüge der Dokumentation?

Ich habe alle Befehlszeilenargumente für die Dokumentation ausgeblendet, da es sich nur um eine Textwand handelt, aber Sie können sie sich gerne ansehen.

{{< details title="**Docling has a lot of options**">}}
  Schauen wir uns zunächst alle Befehlszeilenoptionen für docling an:

  ```sh
  % docling --help


























































































{{< /details >}}














































{{< img src="images/claude-models.png" align="center" >}}


{{< alert type="warning" >}}

{{< /alert >}}









{{< alert type="danger" >}}

{{< /alert >}}





```markdown
---
name: UpdateDocs
description: Rules for updating the documentation
alwaysApply: true
---

## Rules

### 1. Always update the documentation
Always update the documentation.

### 2. Always update changelog
Always update the changelog.

### 3. Always update README
Always update the README.

### 4. Always update CONTRIBUTING.md
Always update the CONTRIBUTING.md.

### 5. Always update SECURITY.md
Always update the SECURITY.md.

### 6. Always update LICENSE
Always update the LICENSE.
```







{{< img src="images/docling-serve-file.png" alt="an antiquated User interface for docling" align="center" >}}

{{< img src="images/docling-serve-url.png" alt="The same antiquated user interface for docling" >}}














