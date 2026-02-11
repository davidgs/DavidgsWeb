---
Title: "A Fresh UI for docling"
Date: 2026-02-11
Category:
Slug: a-fresh-ui-for-docling
hero: images/OCR.png
reading_time: 12 minutes
---

## Resumen

Creé **Duckling**, una interfaz gráfica de usuario para docling que te ahorra tener que recordar más de 40 indicadores de línea de comandos. Si solo quieres ver la [nueva y brillante interfaz de usuario](#the-front-end), puedes saltarte este paso. De lo contrario, quédate para leer la historia de cómo usé asistentes de programación de IA para crear esto y lo que aprendí en el proceso.

Enlaces rápidos si quieres profundizar: [Repositorio de GitHub](https://github.com/davidgs/duckling) | [Documentación en vivo](https://duckling-ui.org) | [Advertencia de seguridad](#limitations)

---

## Why would I do this? (And how)

Is _"because I can"_ a good enough answer? No, probably not. _"Because I wanted to"_? Still no? Well, those are mostly going to have to do. The real reason is that I needed to use [docling](https://docling-project.github.io/docling/) to transform some documents from one format to another. I'd always used [pandoc](https://pandoc.org) but since I'm at [Red Hat](https://redhat.com) and we're heavily involved with docling, I figured I'd give it a go.

Much like pandoc, docling is command-line driven. While this is fine for a lot of things, especially if you're automating, it's hard to remember all the command-line flags when you don't use it that often. Every time I need to turn a Markdown file into a .docx file I have to look up the correct flags for `pandoc` and it gets old fast.

I grew up on the UNIX command line. I used to read email using the `mail` program. When [Pine](https://en.wikipedia.org/wiki/Pine_(email_client)) came along it was a huge improvement! I guess in my old age I've come to appreciate GUIs more and more.

## What is docling? {#what-is-docling}

Here's the thing though: docling does a _lot_ more than pandoc. It's not just a simple document format converter. Docling is a much more capable application because it wasn't designed to be _only_ a document converter.

From the docling website:

> Docling simplifies document processing, parsing diverse formats — including advanced PDF understanding — and providing seamless integrations with the gen AI ecosystem.

So docling can parse just about any document format you throw at it - PDF, DOCX, PPTX, XLSX, HTML, even audio and video files. It does Optical Character Recognition (OCR) on scanned PDFs and images. It was designed to prepare documents to be fed into AI engines, so it can properly 'chunk' a document (or series of documents) for RAG pipelines. It's got table extraction, formula detection, code block recognition, image classification - the works.

But here's the problem.

## All the docling goodness comes with a price {#why-build-a-gui}

Docling has **40+ command-line flags**. I've collapsed them all below because it's just a wall of text, but feel free to check them out.

{{< details title="**Docling Command-Line Options**">}}
```sh
% docling --help
2026-01-21 13:08:39,870 - INFO - Loading plugin 'docling_defaults'
2026-01-21 13:08:39,874 - INFO - Registered ocr engines: ['auto', 'easyocr', 'ocrmac', 'rapidocr', 'tesserocr', 'tesseract']

Usage: docling [OPTIONS] source

╭─ Arguments ────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╮
│ *    input_sources      source  PDF files to convert. Can be local file / directory paths or URL. [required]                                                                                                       │
╰────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╯
╭─ Options ──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╮
│ --from                                                               [docx|pptx|html|image|pdf|asciidoc|md|csv|xlsx|xml_uspto|xml_jats|met  Specify input formats to convert from. Defaults to all formats.        │
│                                                                      s_gbs|json_docling|audio|vtt]                                                                                                                 │
│ --to                                                                 [md|json|html|html_split_page|text|doctags]                            Specify output formats. Defaults to Markdown.                          │
│ --show-layout                     --no-show-layout                                                                                          If enabled, the page images will show the bounding-boxes of the items. │
│                                                                                                                                             [default: no-show-layout]                                              │
│ --headers                                                            TEXT                                                                   Specify http request headers used when fetching url input sources in   │
│                                                                                                                                             the form of a JSON string                                              │
│ --image-export-mode                                                  [placeholder|embedded|referenced]                                      Image export mode for the document (only in case of JSON, Markdown or  │
│                                                                                                                                             HTML). With `placeholder`, only the position of the image is marked in │
│                                                                                                                                             the output. In `embedded` mode, the image is embedded as base64        │
│                                                                                                                                             encoded string. In `referenced` mode, the image is exported in PNG     │
│                                                                                                                                             format and referenced from the main exported document.                 │
│                                                                                                                                             [default: embedded]                                                    │
│ --pipeline                                                           [legacy|standard|vlm|asr]                                              Choose the pipeline to process PDF or image files. [default: standard] │
│ --vlm-model                                                          [smoldocling|smoldocling_vllm|granite_vision|granite_vision_vllm|gran  Choose the VLM model to use with PDF or image files.                   │
│                                                                      ite_vision_ollama|got_ocr_2|granite_docling|granite_docling_vllm]      [default: granite_docling]                                             │
│ --asr-model                                                          [whisper_tiny|whisper_small|whisper_medium|whisper_base|whisper_large  Choose the ASR model to use with audio/video files.                    │
│                                                                      |whisper_turbo|whisper_tiny_mlx|whisper_small_mlx|whisper_medium_mlx|  [default: whisper_tiny]                                                │
│                                                                      whisper_base_mlx|whisper_large_mlx|whisper_turbo_mlx|whisper_tiny_nat                                                                         │
│                                                                      ive|whisper_small_native|whisper_medium_native|whisper_base_native|wh                                                                         │
│                                                                      isper_large_native|whisper_turbo_native]                                                                                                      │
│ --ocr                             --no-ocr                                                                                                  If enabled, the bitmap content will be processed using OCR.            │
│                                                                                                                                             [default: ocr]                                                         │
│ --force-ocr                       --no-force-ocr                                                                                            Replace any existing text with OCR generated text over the full        │
│                                                                                                                                             content.                                                               │
│                                                                                                                                             [default: no-force-ocr]                                                │
│ --tables                          --no-tables                                                                                               If enabled, the table structure model will be used to extract table    │
│                                                                                                                                             information.                                                           │
│                                                                                                                                             [default: tables]                                                      │
│ --ocr-engine                                                         TEXT                                                                   The OCR engine to use. When --allow-external-plugins is *not* set, the │
│                                                                                                                                             available values are: auto, easyocr, ocrmac, rapidocr, tesserocr,      │
│                                                                                                                                             tesseract. Use the option --show-external-plugins to see the options   │
│                                                                                                                                             allowed with external plugins.                                         │
│                                                                                                                                             [default: auto]                                                        │
│ --ocr-lang                                                           TEXT                                                                   Provide a comma-separated list of languages used by the OCR engine.    │
│                                                                                                                                             Note that each OCR engine has different values for the language names. │
│ --psm                                                                INTEGER                                                                Page Segmentation Mode for the OCR engine (0-13).                      │
│ --pdf-backend                                                        [pypdfium2|dlparse_v1|dlparse_v2|dlparse_v4]                           The PDF backend to use. [default: dlparse_v4]                          │
│ --pdf-password                                                       TEXT                                                                   Password for protected PDF documents                                   │
│ --table-mode                                                         [fast|accurate]                                                        The mode to use in the table structure model. [default: accurate]      │
│ --enrich-code                     --no-enrich-code                                                                                          Enable the code enrichment model in the pipeline.                      │
│                                                                                                                                             [default: no-enrich-code]                                              │
│ --enrich-formula                  --no-enrich-formula                                                                                       Enable the formula enrichment model in the pipeline.                   │
│                                                                                                                                             [default: no-enrich-formula]                                           │
│ --enrich-picture-classes          --no-enrich-picture-classes                                                                               Enable the picture classification enrichment model in the pipeline.    │
│                                                                                                                                             [default: no-enrich-picture-classes]                                   │
│ --enrich-picture-description      --no-enrich-picture-description                                                                           Enable the picture description model in the pipeline.                  │
│                                                                                                                                             [default: no-enrich-picture-description]                               │
│ --artifacts-path                                                     PATH                                                                   If provided, the location of the model artifacts.                      │
│ --enable-remote-services          --no-enable-remote-services                                                                               Must be enabled when using models connecting to remote services.       │
│                                                                                                                                             [default: no-enable-remote-services]                                   │
│ --allow-external-plugins          --no-allow-external-plugins                                                                               Must be enabled for loading modules from third-party plugins.          │
│                                                                                                                                             [default: no-allow-external-plugins]                                   │
│ --show-external-plugins           --no-show-external-plugins                                                                                List the third-party plugins which are available when the option       │
│                                                                                                                                             --allow-external-plugins is set.                                       │
│                                                                                                                                             [default: no-show-external-plugins]                                    │
│ --abort-on-error                  --no-abort-on-error                                                                                       If enabled, the processing will be aborted when the first error is     │
│                                                                                                                                             encountered.                                                           │
│                                                                                                                                             [default: no-abort-on-error]                                           │
│ --output                                                             PATH                                                                   Output directory where results are saved. [default: .]                 │
│ --verbose                     -v                                     INTEGER                                                                Set the verbosity level. -v for info logging, -vv for debug logging.   │
│                                                                                                                                             [default: 0]                                                           │
│ --debug-visualize-cells           --no-debug-visualize-cells                                                                                Enable debug output which visualizes the PDF cells                     │
│                                                                                                                                             [default: no-debug-visualize-cells]                                    │
│ --debug-visualize-ocr             --no-debug-visualize-ocr                                                                                  Enable debug output which visualizes the OCR cells                     │
│                                                                                                                                             [default: no-debug-visualize-ocr]                                      │
│ --debug-visualize-layout          --no-debug-visualize-layout                                                                               Enable debug output which visualizes the layour clusters               │
│                                                                                                                                             [default: no-debug-visualize-layout]                                   │
│ --debug-visualize-tables          --no-debug-visualize-tables                                                                               Enable debug output which visualizes the table cells                   │
│                                                                                                                                             [default: no-debug-visualize-tables]                                   │
│ --version                                                                                                                                   Show version information.                                              │
│ --document-timeout                                                   FLOAT                                                                  The timeout for processing each document, in seconds.                  │
│ --num-threads                                                        INTEGER                                                                Number of threads [default: 4]                                         │
│ --device                                                             [auto|cpu|cuda|mps]                                                    Accelerator device [default: auto]                                     │
│ --logo                                                                                                                                      Docling logo                                                           │
│ --page-batch-size                                                    INTEGER                                                                Number of pages processed in one batch. Default: 4 [default: 4]        │
│ --help                                                                                                                                      Show this message and exit.                                            │
╰────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╯
```
{{< /details >}}

Yeah, I'm never going to remember all of those. And that's where this whole project started.

## Enter Duckling

I've been playing around with Claude Code lately, and I thought this would be a perfect project to test it out on. Could I use an AI coding assistant to build a proper front-end for docling that would expose all those options in a sane, usable way? And could I also build a backend service to serve the docling API to my shiny new frontend?

Could I have written this all myself? Of course! But it seemed like a good opportunity to test out Claude Code some more and see what it could do with a complex, real-world project.

## How I use AI coding assistants {#using-ai-effectively}

If you're unfamiliar, Claude Code is a version of Visual Studio Code integrated with powerful AI coding agents. While VS Code uses GitHub Copilot (mostly), Claude Code lets you choose which agent to use, or even use multiple agents, as well as _how_ you want to use those agents.

{{< img src="images/claude-models.png" align="center" >}}

{{< alert type="warning" >}}
**Note:** This is just one of many AI coding assistants available. You can use whatever you like, or none at all. Using an AI coding assistant to write applications is what people are now calling "Vibe Coding".
{{< /alert >}}

Simply using an AI coding assistant with no thought or structure is a recipe for disaster. But that's a completely different blog post (which I should probably write at some point).

The way _I_ use coding assistants is very intentional and structured. Before I do _any_ coding, I typically write out a complete specification of what I'm attempting to build. This includes the features I want, the technologies I want to use, and any other constraints I have. This is also called a Product Requirements Document, or PRD.

Once I have that, I can start breaking the project down into smaller pieces that I can then ask the coding assistant to help me with.

### The four modes of Claude Code

One of the things I like about Claude Code is that I can set the agent into one of 4 different modes:

**Ask** - This allows me to simply ask questions without having the agent implement anything. I can ask it things like "what would be the best language to implement a backend service for docling?" and get some answers. (It's Python, by the way, which makes sense since docling itself is written in Python).

**Plan** - Once I've gotten some answers to my questions, I can switch to 'plan' mode and ask the agent to come up with a detailed plan for how to implement the project. The agent will then come up with a detailed plan that I can review and modify as needed. I can even ask it to break down some of the steps in its plan into further sub-plans to see how it intends to actually go about implementing various parts of the project.

**Agent** - This is where the agent actually starts writing code. I can give it specific tasks from my plan, and it will write the code for me. I can then review the code, make any changes I want, and then move on to the next task.

**Debug** - When you've got some code that may not be working as you intend, the debug mode can help you figure out why. You can ask the agent to look at your code and help you find bugs, or even suggest improvements. Again, you should be familiar with the language, and know how to write and debug the code yourself in order to make sure that you understand what the agent is suggesting.

{{< alert type="danger" >}}
**Warning:** Always review the code that the agent writes. Just because it wrote it doesn't mean it's correct, secure, or even functional. This means that you should have a detailed understanding about what the code is supposed to do before you ask the agent to write it. You should know the language that the agent is using, and you should feel comfortable in writing and debugging the code the agent provides. Never just accept code blindly.
{{< /alert >}}

### Automated rules and best practices

Claude Code also now provides a mechanism for ensuring that certain tasks are _always_ performed. For example, I always want to make sure that any code that is written is also properly unit tested. So I can set up a rule that says "whenever you write code, you must also write unit tests for it".

This helps ensure that the code is functional and maintainable. I also have a rule to make sure that the documentation is updated, and that a proper `CHANGELOG.md` file is maintained. By doing these things as I go, I don't have to remember to go back and do these fundamental tasks later. Tests, documentation, and the change log are always current.

These rules are stored in `.cursor/rules/rule-name.mdc` and (at least in theory) they are always implemented.

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

I have similar rules for various languages, and for making sure things like unit tests, etc. are always updated.

## Building Duckling {#duckling-architecture}

Wait, not so fast! Before we can have a nice fancy UI in front of docling, we need a way to _serve_ docling!

### The backend server

As I said previously, I used Claude Code as an assistant on this. For a Product Requirements Document (PRD) I basically used the entire API documentation from the docling project. After all, I wanted to enable _all_ of the features of docling from this UI.

In order for this to work properly, I would need a backend server to expose the entire docling API to the new UI. Since docling is written in Python, I decided it was easiest to have the backend also written in Python which would enable me to simply incorporate docling into the server process.

Here's what I wanted to be able to do:

Have the docling and duckling docs available in the UI itself. Make the various OCR engines available (and installable if they weren't installed at startup). Keep a history of documents we've loaded previously. Be able to quickly load previously-parsed documents from history. Be able to see the output of the docling process in various formats (Markdown, HTML, JSON, etc.). Have the full set of docling options available in the UI. Be able to save the output of docling in various formats.

Easy, right? Not really.

I used Flask to build the backend server. I won't go into the details of how I built it, but it basically exposes a REST API that the frontend can call to perform various actions. The entire API is documented in the documentation, which is available at both [duckling-ui.org](https://duckling-ui.org) and internally in the application.

{{< alert type="info" >}}
The docs for docling are pulled directly from the [docling project](https://docling-project.github.io/docling/) but only a subset of those documents are included. Links to the full docling docs are included though.
{{< /alert >}}

{{< alert type="warning" >}}
Including those documents is for convenience only and while the duckling application will always try to pull the latest documentation from docling, you should always reference the project documentation just in case.
{{< /alert >}}

The backend server also starts the complete docling process, and is able to install (or pre-install) various OCR and other plugins for more advanced uses. I wanted to make this possible so that users didn't have to re-start the server process every time they wanted to enable a new feature.

Additionally, since the backend server process can run anywhere, the end user doesn't need to have direct access to the server hardware in order to use the more advanced features of docling from just about anywhere.

Even more useful for remote deployments, you can adjust -- from the GUI -- the amount of memory and the number of threads to run docling on.

{{< img src="images/performance.png" align="center" >}}

You can even select the kind of hardware you want to run on.

{{< img src="images/performance-cpu.png" align="center" >}}

There are still some things to be aware of if you're going to run on remote hardware. Ignore them at your peril.

{{< alert type="danger" >}}
There is currently no system for user authentication built into the duckling server process, nor is there a mechanism for loading SSL certificates. I **strongly** discourage anyone from simply starting this application on an unprotected server. At this time, if you want to deploy it on a remote server, I recommend putting it behind a protected proxy.
{{< /alert >}}

There are some other settings for docling available in the **Settings** panel which we'll get to in a minute.

## The front end {#the-front-end}

_Finally_ we get to the actual GUI! When you load it in your web browser, you'll see the main interface.

{{< img src="images/duckling.png" align="center" width="75%" >}}

Clean, simple, and easy to understand. Simply drag a document into the drop zone to process it. Or you can use a file browser to select documents.

I'm only providing screenshots of the drag-and-drop, single-file interface, but all of the same functionality works just as well for batch-processing of a large number of documents.

{{< img src="images/drop-english.png" align="center" width="75%" >}}

{{< alert type="info" >}}
I have provided auto-translated versions of the entire UI for English, French, Spanish, and German.

If you'd like to provide translations to other languages I am accepting [Pull Requests](https://github.com/davidgs/duckling/pulls).
{{< /alert >}}

{{< img src="images/drop-german.png" align="center" width="55%" >}}

### Document conversion

Once you drop a document in any of the supported formats, it is processed and the results displayed.

{{< img src="images/processing.png" align="center" >}}

The result is then displayed, along with some statistics about the conversion.

{{< img src="images/md-rendered.png" align="center" width="75%" >}}

Since I set my default output format to be Markdown, that's what is selected in the output. You can see either the rendered Markdown, or the raw Markdown.

{{< img src="images/md-raw.png" align="center" width="75%" >}}

The same is true for the other formats like HTML, JSON, etc.

{{< img src="images/html-rendered.png" align="center" width="75%" >}}

{{< img src="images/export-json.png" align="center" width="75%" >}}

You can then download any of the rendered formats for use.

Since docling is used quite a bit in AI Pipelines, it's also possible to have docling produce RAG Chunks.

{{< img src="images/rag-chunks.png" align="center" width="75%" >}}

### Settings and options

One of the things I wanted to do was make all of the various settings and configuration options for docling (remember those 40+ options above?) easier to manage.

Want to enable OCR? Simple, it's just a toggle in the settings panel.

{{< img src="images/ocr-setting.png" align="center" >}}

Want to switch OCR engines? Again, simple.

{{< img src="images/ocr-engine-setting.png" align="center" >}}

Is the OCR Engine you want to use not installed? Well, most of them can be installed just by selecting them from the dropdown menu.

{{< img src="images/easy-ocr-install.png" align="center" >}}

Once you select the uninstalled OCR engine it will be installed and become available (with the notable exception of tesseract which must be installed before the docling server is started).

The same is true for extracting tables from processed documents. All of the various table extraction options for docling are easily settable from the Duckling UI.

{{< img src="images/table-setting.png" align="center" >}}

Image extraction and processing can be tricky, and use a lot more processing power than processing plain text. But again, all the image-processing options for docling are easily settable from the settings panel.

{{< img src="images/image-handling-setting.png" align="center" >}}

Performance is, of course, a key concern when doing document conversions. Do you want to process using CPU only? Do you have a GPU available? Do you want to increase the number of threads used for processing documents? All of those options are available.

{{< img src="images/performance-setting.png" align="center" >}}

And yes, you can turn on GPU access (you just have to have a GPU available, I'm not a magician).

{{< img src="images/performance-cpu-setting.png" align="center" >}}

Finally, there are a bunch of advanced settings that are not commonly used (because they tend to suck up a lot of resources), but for completeness I included them.

{{< img src="images/image-handling-setting.png" align="center" >}}

Again, if the libraries for these options are not already pre-installed, the backend will install them when you turn them on here.

### History

Nothing is more annoying than processing a document, saving the output in your desired format, moving on to other documents, and _then_ realizing that you wanted that other document in a different format.

Rather than having to re-process the document and burn CPU (or GPU) cycles again, Duckling keeps a history of the documents it has processed.

From the [docling documentation](https://docling-project.github.io/docling/concepts/docling_document/):

> With Docling v2, we introduced a unified document representation format called DoclingDocument. It is defined as a pydantic datatype, which can express several features common to documents, such as:
>
> - Text, Tables, Pictures, and more
> - Document hierarchy with sections and groups
> - Disambiguation between main body and headers, footers (furniture)
> - Layout information (i.e. bounding boxes) for all items, if available
> - Provenance information
>
> The definition of the Pydantic types is implemented in the module `docling_core.types.doc`, more details in source code definitions.
>
> It also brings a set of document construction APIs to build up a DoclingDocument from scratch.

So why not use that as a way to store the processed documents for easy retrieval?

Each processed document is assigned a UUID and that (plus a little more information) is stored in the database. That UUID is used to point to a storage location on disk where the actual DoclingDocument data is stored. Yes, I would have just dumped it all into the database, but that would very quickly cause the database to balloon out of control. This way the bulk of the data is stored on disk which is, at least compared to memory, relatively cheap.

{{< img src="images/history-panel.png" align="center" >}}

Clicking on any document (that is not a failed document) will instantly load it back in to the viewer panel with all the information it had when it was first processed.

What happens if the database gets wiped out? Where are all those documents? Well, as it turns out, I had that exact problem while testing the application. So now, on startup (and periodically when it's running) the on-disk storage is checked and compared to the database contents. Anything that is stored on disk that is not referenced by the database is then added back to the database.

### Easy access to documentation

As I outlined at the beginning, I wanted to make sure that all of the documentation was available within the application itself. Just click a button and you can see all the configuration and usage documentation both for docling and for Duckling.

I used `mkdocs` to build the documentation, and I could not be sure that all the documentation was properly built at runtime. So I wanted a way to actually _build_ the documentation from within the UI if it hadn't been built previously.

{{< img src="images/build-docs.png" align="center" >}}
&nbsp;

Just click that button and the backend will run `mkdocs` to build the documentation.

{{< img src="images/inline-docs.png" align="center" width="75%" >}}
&nbsp;

On the left side, there is a complete table of contents that even displays a subset of the docling documentation with links to the full docling docs.

{{< img src="images/docs-toc.png" align="center" >}}
&nbsp;

It clearly indicates which docs are from the docling project, and which are for Duckling itself.

## Limitations and warnings {#limitations}

There are some current limitations to the current approach. Not all of them have proposed solutions.

### Database access

While the backend is technically multi-user, there is no separation between users. So if User-A processes a bunch of documents, and User-B comes along and connects to the service, User-B will see the entire history of User-A.

I have plans to fix this and make it truly multi-user, but it's a larger task that I don't have time for right now. I have created a `MULTI_USER_IMPLEMENTATION_PLAN.md` document in the [github repo](https://github.com/davidgs/duckling) to address this if anyone wants to take up that task. It is also currently an [open feature request](https://github.com/davidgs/duckling/issues/17) in the repository. There is no requirement that anyone follow this implementation plan, it's just there for reference.

### Security

There is basically no true security at this point. There are no startup options for implementing SSL on the server process, so about all you can effectively do is put the entire thing behind a proxy with authentication.

{{< alert type="danger" >}}
**CRITICAL:** Do not deploy Duckling on public servers without protection. There's no user authentication, no SSL/TLS support, and no access controls. This is suitable for local/trusted networks only. For anything else, deploy behind an authenticated proxy.
{{< /alert >}}

Likewise, there is no mechanism to create or use separate user accounts. See above. Right now, it's pretty much wide open. Yes, that needs to get fixed.

## Conclusions

This was something that basically started out as an exercise in relieving some personal frustration, avoiding the CLI, and doing a bit of AI-assisted coding. Strictly speaking, it wasn't really pure "vibe-coding", since I didn't just tell Claude Code to build the whole thing without proper adult supervision.

While my Python skills are a bit more limited, my TypeScript skills are pretty good. I was able to provide much more in the way of supervision and code reviews on that portion. I'd welcome any code reviews anyone wants to make. I am accepting PRs.

At some point I'd love to hand this project off as an open source project under the docling project, or really to any Open Source Foundation that might be interested. My time for further development is severely limited and, while I love working on it, I simply don't have the time to devote to it that it deserves.

I hope you enjoy using it as much as I enjoyed building it!
