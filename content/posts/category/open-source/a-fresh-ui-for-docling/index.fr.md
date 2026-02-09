---
Title: "A Fresh UI for docling"
Date: 2026-01-15
Category:
Slug: a-fresh-ui-for-docling
hero: images/OCR.png
reading_time: 12 minutes
---

# Pourquoi ferais-je cela ? (Et comment)

« Parce que je peux » est-il une réponse suffisante ? Non, probablement pas. « Parce que je voulais » ? Toujours pas ? Bon, il faudra faire avec. La vraie raison, c'est que j'avais besoin d'utiliser Docling pour convertir des documents d'un format à un autre. J'utilisais toujours Pandoc, mais comme je travaille chez Red Hat et que nous utilisons beaucoup Docling, je me suis dit que j'allais l'essayer.

Tout comme pandoc, docling fonctionne en ligne de commande. Si cela convient parfaitement à de nombreuses situations, notamment pour l'automatisation, il est difficile de mémoriser toutes les options de ligne de commande si on ne l'utilise pas fréquemment. À chaque fois que je dois convertir un fichier Markdown en .docx, je dois rechercher les options appropriées pour `pandoc`, et c'est vite lassant.

Ce texte sera long, mais si les détails techniques ne vous intéressent pas, vous pouvez en sauter une grande partie. Surtout si vous voulez simplement voir à quoi ressemble cette [nouvelle interface utilisateur](#fancy-ui) et comment elle fonctionne.

Comme j'ai utilisé un assistant de programmation pour développer ce projet, je vais également détailler la méthode que j'utilise avec les assistants de programmation. J'utilise Claude Code ; je vais donc aborder ce sujet dans une [brève section](#claude-code).

## Tous les bienfaits du docling ?

J'ai réduit tous les arguments de ligne de commande pour la documentation car il s'agit d'un bloc de texte très long, mais n'hésitez pas à les consulter.

{{< details title="**Docling has a lot of options**">}}
  Commençons par examiner toutes les options de ligne de commande pour la documentation :

  ```sh
  % docling --aide


























































































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














