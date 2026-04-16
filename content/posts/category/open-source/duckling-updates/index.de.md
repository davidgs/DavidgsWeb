---
Title: "Some Big Duckling Updates"
Date: 2026-04-16
Category:
Slug: some-big-duckling-updates
hero: ./images/hero.png
reading_time: 5 minutes
---

Es ist ein paar Monate her, seit ich zuletzt über Duckling geschrieben habe (https://davidgs.com/posts/category/open-source/a-fresh-ui-for-docling/), und in dieser Zeit habe ich das Projekt deutlich verbessert. Falls Sie Duckling noch nicht kennen: Es handelt sich um eine Weboberfläche für IBMs Docling-Bibliothek (https://docling.ai/), die leistungsstarke Funktionen zur Dokumentenkonvertierung bietet. Mit Duckling können Sie PDFs problemlos in Text, Word-Dokumente in Markdown konvertieren und sogar OCR auf gescannten Bildern anwenden.

## Was ist neu?

### Verbesserungen der Barrierefreiheit

Zunächst einmal habe ich einige Änderungen zur Verbesserung der Barrierefreiheit vorgenommen, um die App für alle Nutzer benutzerfreundlicher zu gestalten. Es gab Probleme mit Kontrasten, und einige interaktive Elemente waren nicht per Tastatur bedienbar. Außerdem habe ich ARIA-Labels hinzugefügt, um die Unterstützung für Bildschirmlesegeräte zu verbessern. Ich hoffe, dass damit einige der Barrierefreiheitsprobleme der ursprünglichen Version behoben sind.

### Massenverarbeitung vs. Einzeldateiverarbeitung

Was mich an dieser Benutzeroberfläche immer gestört hat, war die Notwendigkeit, zwischen Einzeldatei- und Stapelverarbeitung umzuschalten, um mehrere Dateien zu verarbeiten. Um das zu vereinfachen, habe ich den Stapelverarbeitungs-Schalter in der Kopfzeile entfernt und den Drag-and-Drop-Bereich so angepasst, dass mehrere Dateien gleichzeitig abgelegt werden können. Außerdem kann man jetzt einen ganzen Ordner ablegen (oder im Dateiauswahldialog einen Ordner auswählen), woraufhin alle Dateien im Ordner verarbeitet werden. Nicht unterstützte Dateien werden einfach ignoriert, anstatt eine Fehlermeldung auszugeben.

### Leistungskennzahlen

Ich habe der Seitenleiste einen neuen Tab „Performance“ hinzugefügt, der grundlegende Leistungskennzahlen für die letzte Conversion anzeigt. Dazu gehören die Dauer jedes einzelnen Conversion-Schritts sowie die Gesamtdauer. Dies ist hilfreich, um die Dauer verschiedener Conversion-Typen zu verstehen und Leistungsprobleme zu beheben.

Zunächst haben wir einige grundlegende Zahlen zur Gesamtnutzung usw.

![Das Statistik-Dashboard zeigt die Kennzahlen der Konvertierungsaufträge: Insgesamt 9 Aufträge, davon 9 erfolgreich abgeschlossen, keine Fehler, Erfolgsquote 100 %. Zusätzlich werden eine durchschnittliche Verarbeitungszeit von 0,1 Sekunden und aktuell 0 Aufträge in der Warteschlange angezeigt. Die Benutzeroberfläche hat einen dunkelblauen Hintergrund mit cyanfarbenen und roten Akzenten.](images/stats-1.png)



![](images/hardware-stats.png)



![](images/storage-stats.png)



![](images/input-stats.png)









![](images/generate-chunks.png)



![](images/rag-chunks.png)








