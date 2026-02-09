---
Title: "A Fresh UI for docling"
Date: 2026-01-15
Category:
Slug: a-fresh-ui-for-docling
hero: images/OCR.png
reading_time: 12 minutes
---

# Waarom zou ik dit doen? (En hoe?)

Is "omdat ik het kan" een goed genoeg antwoord? Nee, waarschijnlijk niet. "Omdat ik het wilde"? Nog steeds geen goed antwoord? Nou, daar moet ik het mee doen. De echte reden is dat ik [docling](https://docling-project.github.io/docling/) moest gebruiken om een aantal documenten van het ene formaat naar het andere te converteren. Ik gebruikte altijd [pandoc](https://pandoc.org), maar aangezien ik bij [Red Hat](https://redhat.com) werk en we daar veel met docling bezig zijn, dacht ik dat ik dat eens zou proberen.

Net als pandoc wordt docling via de commandoregel aangestuurd. Hoewel dit prima is voor veel dingen, vooral als je processen automatiseert, is het lastig om alle commandoregelopties te onthouden als je het niet vaak gebruikt. Elke keer dat ik een Markdown-bestand naar een .docx-bestand moet converteren, moet ik de juiste opties voor `pandoc` opzoeken en dat begint me te irriteren.

Dit wordt een lang verhaal, maar als je niet geïnteresseerd bent in de details, kun je een groot deel ervan overslaan. Vooral als je alleen wilt zien hoe deze [mooie nieuwe UI](#fancy-ui) eruitziet en hoe hij werkt.

Omdat ik een codeerassistent heb gebruikt om dit te bouwen, zal ik ook het proces beschrijven dat ik voor codeerassistenten gebruik. Ik gebruik Claude Code, dus daar zal ik in een [kort gedeelte](#claude-code) over schrijven.

## Al die leuke dingen voor de dok?

Ik heb alle opdrachtregelargumenten voor de documentatie ingeklapt, omdat het anders een enorme lap tekst zou zijn, maar je kunt ze gerust bekijken.

{{< details title="**Docling has a lot of options**">}}
  Laten we eerst eens kijken naar alle commandoregelopties voor docling:

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














