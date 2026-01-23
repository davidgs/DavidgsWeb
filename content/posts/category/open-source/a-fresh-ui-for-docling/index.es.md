---
Title: "A Fresh UI for docling"
Date: 2026-01-15
Category:
Slug: a-fresh-ui-for-docling
hero: images/OCR.png
reading_time: 12 minutes
---

# ¿Por qué haría esto? (Y cómo)

¿Es "porque puedo" una respuesta suficiente? No, probablemente no. ¿"Porque quería"? ¿Sigue siendo un no? Bueno, eso va a tener que bastar. La verdadera razón es que necesitaba usar [docling](https://docling-project.github.io/docling/) para transformar algunos documentos de un formato a otro. Siempre había usado [pandoc](https://pandoc.org), pero como no estoy en [Red Hat](https://redhat.com) y estamos muy involucrados con docling, pensé en intentarlo.

Al igual que pandoc, docling se ejecuta principalmente (bueno, completamente) mediante la línea de comandos. Si bien esto funciona bien para muchas cosas, especialmente si se automatizan, es difícil recordar todas las opciones de la línea de comandos si no se usa con frecuencia.

Esto va a ser largo, pero si no te interesan los detalles, puedes pasar por alto gran parte. Sobre todo si solo quieres ver cómo se ve y funciona esta nueva y elegante interfaz de usuario.

Dado que utilicé un asistente de codificación para ayudarme a construir esto, también repasaré el proceso que uso para los asistentes de codificación.

## Veamos Pandoc

Mi herramienta predilecta para convertir archivos Markdown a archivos .docx siempre ha sido pandoc. Pero cada vez tengo que recordar cómo usarlo. Aquí están las opciones de la línea de comandos para usar pandoc:

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

¡Buena suerte recordando todo (o algo) de eso! ¡Uf!

Funciona de maravilla, y supongo que si lo usara a diario podría recordar al menos lo suficiente para hacer conversiones estándar rápidamente. Pero no lo hago, y no puedo.

## ¿Qué pasa con el doclinaje?



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






























{{ <img src="images/claude-models.png align="center" > }}

{{< alert type="warning" >}}

{{< /alert >}}







{{< alert type="danger" >}}

{{< /alert >}}



