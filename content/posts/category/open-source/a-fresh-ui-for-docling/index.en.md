---
Title: "A Fresh UI for docling"
Date: 2026-01-15
Category:
Slug: a-fresh-ui-for-docling
hero: images/OCR.png
---

# Why would I do this? (And how)

Is "because I can" a good enough answer? No, probably not. "Because I wanted to"? Still a not? Well, those are mostly going to have to do. The real reason is that I needed to use [docling](https://docling-project.github.io/docling/) to transform some documents from one format to another. I'd always used [pandoc](https://pandoc.org) but since I'm not at [Red Hat](https://redhat.com) and we are heavily involved with docling, I figured I'd give that a go.

Much like pandoc, docling is mostly (ok, entirely) command-line driven. While this is fine for a lot of things, especially if you're automating things, it's hard to remember all the command-line flags if you don't use it that often.

This is going to be long, but if you're not interested in the nitty-gritty details, you can scroll past a lot of it. Especially if you just want to see what this fancy new UI looks like and how it works.

Since I used a coding assistant to help me build this, I'm also going to go through the process I use for coding assistants as well.

## Let's look at Pandoc

So my old standby for converting Markdown files to `.docx` files has always been pandoc. But every single time I have to remember how to use it. Here are the command-line flags for using pandoc:

```sh
% pandoc --help
pandoc [OPTIONS] [FILES]
  -f FORMAT, -r FORMAT  --from=FORMAT, --read=FORMAT
  -t FORMAT, -w FORMAT  --to=FORMAT, --write=FORMAT
  -o FILE               --output=FILE
                        --data-dir=DIRECTORY
  -M KEY[:VALUE]        --metadata=KEY[:VALUE]
                        --metadata-file=FILE
  -d FILE               --defaults=FILE
                        --file-scope[=true|false]
                        --sandbox[=true|false]
  -s[true|false]        --standalone[=true|false]
                        --template=FILE
  -V KEY[:VALUE]        --variable=KEY[:VALUE]
                        --variable-json=KEY[:JSON]
                        --wrap=auto|none|preserve
                        --ascii[=true|false]
                        --toc[=true|false], --table-of-contents[=true|false]
                        --toc-depth=NUMBER
                        --lof[=true|false], --list-of-figures[=true|false]
                        --lot[=true|false], --list-of-tables[=true|false]
  -N[true|false]        --number-sections[=true|false]
                        --number-offset=NUMBERS
                        --top-level-division=section|chapter|part
                        --extract-media=PATH
                        --resource-path=SEARCHPATH
  -H FILE               --include-in-header=FILE
  -B FILE               --include-before-body=FILE
  -A FILE               --include-after-body=FILE
                        --no-highlight
                        --highlight-style=STYLE|FILE
                        --syntax-definition=FILE
                        --syntax-highlighting=none|default|idiomatic|<stylename>|<themepath>
                        --dpi=NUMBER
                        --eol=crlf|lf|native
                        --columns=NUMBER
  -p[true|false]        --preserve-tabs[=true|false]
                        --tab-stop=NUMBER
                        --pdf-engine=PROGRAM
                        --pdf-engine-opt=STRING
                        --reference-doc=FILE
                        --self-contained[=true|false]
                        --embed-resources[=true|false]
                        --link-images[=true|false]
                        --request-header=NAME:VALUE
                        --no-check-certificate[=true|false]
                        --abbreviations=FILE
                        --indented-code-classes=STRING
                        --default-image-extension=extension
  -F PROGRAM            --filter=PROGRAM
  -L SCRIPTPATH         --lua-filter=SCRIPTPATH
                        --shift-heading-level-by=NUMBER
                        --base-header-level=NUMBER
                        --track-changes=accept|reject|all
                        --strip-comments[=true|false]
                        --reference-links[=true|false]
                        --reference-location=block|section|document
                        --figure-caption-position=above|below
                        --table-caption-position=above|below
                        --markdown-headings=setext|atx
                        --list-tables[=true|false]
                        --listings[=true|false]
  -i[true|false]        --incremental[=true|false]
                        --slide-level=NUMBER
                        --section-divs[=true|false]
                        --html-q-tags[=true|false]
                        --email-obfuscation=none|javascript|references
                        --id-prefix=STRING
  -T STRING             --title-prefix=STRING
  -c URL                --css=URL
                        --epub-subdirectory=DIRNAME
                        --epub-cover-image=FILE
                        --epub-title-page[=true|false]
                        --epub-metadata=FILE
                        --epub-embed-font=FILE
                        --split-level=NUMBER
                        --chunk-template=PATHTEMPLATE
                        --epub-chapter-level=NUMBER
                        --ipynb-output=all|none|best
  -C                    --citeproc
                        --bibliography=FILE
                        --csl=FILE
                        --citation-abbreviations=FILE
                        --natbib
                        --biblatex
                        --mathml
                        --webtex[=URL]
                        --mathjax[=URL]
                        --katex[=URL]
                        --gladtex
                        --trace[=true|false]
                        --dump-args[=true|false]
                        --ignore-args[=true|false]
                        --verbose
                        --quiet
                        --fail-if-warnings[=true|false]
                        --log=FILE
                        --bash-completion
                        --list-input-formats
                        --list-output-formats
                        --list-extensions[=FORMAT]
                        --list-highlight-languages
                        --list-highlight-styles
  -D FORMAT             --print-default-template=FORMAT
                        --print-default-data-file=FILE
                        --print-highlight-style=STYLE|FILE
  -v                    --version
  -h                    --help
```

Good luck remembering all (or any) of that. Yikes!

It works great, and I guess if I used it every day I might be able to remember at least enough to do standard conversions pretty quickly. But I don't, and I can't.

## What about docling?

First let's look at all the command line options for docling:

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

Ok, so I'm never going to remember those either. It is important to note, however, that docling does a _lot_ more than pandoc! It's not just a simple document format converter. Pandoc may support a larger array of document formats, but docling does so much more than just convert from format A to Format B.

## What _else_ can docling do?

Docling is a much more capable application that pandoc because it wasn't designed to be _only_ a document format converter. Docling is also capable of doing Optical Character Recognition (ocr) so if you're asking it to convert, say, a PDF file to a Markdown file, it can do that. docling was also designed to prepare documents to be fed into an AI engine, so it can properly 'chunk' a document (or series of documents), etc.

From the docling documentation:
  🗂️ Parsing of multiple document formats incl. PDF, DOCX, PPTX, XLSX, HTML, WAV, MP3, VTT, images (PNG, TIFF, JPEG, ...), and more
  📑 Advanced PDF understanding incl. page layout, reading order, table structure, code, formulas, image classification, and more
  🧬 Unified, expressive DoclingDocument representation format
  ↪️ Various export formats and options, including Markdown, HTML, DocTags and lossless JSON
  🔒 Local execution capabilities for sensitive data and air-gapped environments
  🤖 Plug-and-play integrations incl. LangChain, LlamaIndex, Crew AI & Haystack for agentic AI
  🔍 Extensive OCR support for scanned PDFs and images
  👓 Support of several Visual Language Models (GraniteDocling)
  🎙️ Support for Audio with Automatic Speech Recognition (ASR) models
  🔌 Connect to any agent using the Docling MCP server
  💻 Simple and convenient CLI

## I WANT A GUI!

As with most things these days, I would prefer to have a noce front-end on things. It just makes things easier most of the time. I've been playing around with Claude Code some, and decided to see if I could use it to create a proper front-end to docling that would work. Given the number of options for docling, it was not going to be easy, and I would _also_ have to implement a backend service that would serve the docling API to my shiny new frontend.

Could I have written this all myself? Of course! But it seemed like a good thing to test our Claude Code some more on. So here we go!

## How I use Claude Code

If you're unfamiliar, Claude Code is a version of Visual Studio Code that is also integrated with a bunch of very powerful AI coding agents. While VSP uses GitHub Copilot (mostly), Claude Code allows you to choose the agent that you want to use, or even use multiple agents.

{{ <img src="images/claude-models.png align="center" > }}

{{< alert type="warning" >}}
**Note:** This is just one of many AI coding assistants available. You can use whatever you like, or none at all. Using an AI coding assistant to write applications is what people are now calling "Vibe Coding".
{{< /alert >}}

Simply using an AI coding assistant with no thought or structure is a recipe for disaster, but that's a completely different blog post (which I should probably write at some point).

The way _I_ use coding assistants is very intentional and structured. Before I do _any_ coding, I typically write out a complete specification of what I'm attempting to build. This includes the features I want, the technologies I want to use, and any other constraints that I have. Once I have that, I can start breaking the project down into smaller pieces that I can then ask the coding assistant to help me with. One of the things I like about Claude Code is that I can set the agent into one of 4 different modes:
- **Ask**: This allows me to simply ask questions without having the agent implement anything. I can ask it things like "what would be the best language to implement a backend service for docling?" and get some answers. (It's python, by the way).
- **Plan**: Once I've gotten some answers to my questions, I can then switch to 'plan' mode and ask the agent to come up with a detailed plan for how to implement the project. The agent will then come up with a detailed plan that I can then review and modify as needed. I can even ask it to break down some of the steps in its plan into further plans to see how it intends to actually go about implementing various parts of the project.
- **Agent**: This is where the agent actually starts writing code. I can give it specific tasks from my plan, and it will write the code for me. I can then review the code, make any changes I want, and then move on to the next task.
{{< alert type="danger" >}}
**Warning:** Always review the code that the agent writes. Just because it wrote it doesn't mean it's correct, secure, or even functional. This means that you should have a detailed understanding about what the code is supposed to do before you ask the agent to write it. You should know the language that the agent is using, and you should feel comfortable in writing and debugging the code the agent provides. Never just accept code blindly.
{{< /alert >}}
- **Debug**: When you've got some code that may not be working as. you intend, the debug mode can help you figure out why. You can ask the agent to look at your code and help you find bugs, or even suggest improvements. Again, you should be familiar with the language, and know how to write and debug the code yourself in order to make sure that you understand what the agent is suggesting.

Claude Code also now provides a mechanism for ensuring that certain tasks are _always_ performed. For example, I always want to make sure that any code that is written is also properly unit tested. So I can set up a rule that says "whenever you write code, you must also write unit tests for it". This helps ensure that the code is functional and maintainable. I also have a rule to make sure that the documentation is updated, and that a proper `CHANGELOG.md` file is maintained.