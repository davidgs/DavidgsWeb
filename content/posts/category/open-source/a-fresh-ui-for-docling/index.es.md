---
Title: "A Fresh UI for docling"
Date: 2026-01-15
Category:
Slug: a-fresh-ui-for-docling
hero: images/OCR.png
reading_time: 12 minutes
---

# ¿Por qué haría esto? (Y cómo)

¿Es _"porque puedo"_ una respuesta suficiente? No, probablemente no. ¿_"Porque quería"_? ¿Sigue siendo un no? Bueno, eso va a tener que bastar. La verdadera razón es que necesitaba usar [docling](https://docling-project.github.io/docling/) para transformar algunos documentos de un formato a otro. Siempre había usado [pandoc](https://pandoc.org), pero como estoy en [Red Hat](https://redhat.com) y estamos muy involucrados con docling, pensé en intentarlo.

Al igual que pandoc, docling se controla mediante la línea de comandos. Si bien esto funciona bien para muchas cosas, especialmente si se automatizan, es difícil recordar todas las opciones de la línea de comandos si no se usa con frecuencia. Cada vez que tengo que convertir un archivo Markdown a .docx, tengo que buscar las opciones correctas para «pandoc», y se vuelve aburrido.

Esto va a ser largo, pero si no te interesan los detalles, puedes pasar por alto gran parte. Sobre todo si solo quieres ver cómo se ve esta [nueva y elegante interfaz de usuario](#fancy-ui) y cómo funciona.

Como usé un asistente de programación para crear esto, también repasaré el proceso que utilizo para los asistentes de programación. Uso Claude Code, así que lo explicaré en una [sección corta](#claude-code).

## ¿Toda la bondad del dolling?

He colapsado todos los argumentos de la línea de comandos para docling porque es solo un muro de texto, pero siéntete libre de revisarlos.

{{< details title="**Docling has a lot of options**">}}
  Primero veamos todas las opciones de línea de comando para docling:

  ``mierda
  % doclining --ayuda


























































































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














