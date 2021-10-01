---
title: „Dieses Zeug ist schnell!“
Date: 2020-04-16
Author: davidgs
Category: databse, DevRel, Jobs
Tags: Big Data, coronavirus, COViD-19, Database, IoT
Slug: this-stuff-is-fast
hero: images/NewMap-1.gif
reading_time: 3 minutes
---

Ich habe eine Menge von Projekten getan InfluxDB in den letzten Jahren mit (na ja, habe ich dort Arbeit, nachdem alle) so vielleicht ich ein bisschen eine Vorspannung entwickelt, oder einen blinden Fleck. Wenn Sie [Follow-me](https://twitter.com/intent/follow?screen_name=davidgsIoT) auf Twitter, dann können Sie mich gesehen einige schnelle Videos eines Projekts poste ich arbeitete für die Visualisierung COVID-19-Daten auf eine Karte.

![kolorierte Karte des US-Laden](/posts/category/database/images/slowMap.gif) It worked, but it was pretty slow. So much so that I had to put a 'loading' overlay on it so you knew it was still actually doing something while it was querying the data from the database. I actually sort of thought it was pretty fast, until I started trying to load data from all of Asia, or all of Europe, where that was a *lot* of data and the query got complicated.

Aber, da ich nicht mehr arbeiten bei InfluxData entschied ich mich ein bisschen, verzweigen sich und versuchen, einige andere Lösungen. Ich meine, was ist der Schaden, nicht wahr? Ich dieses kleine Startup fand eine SQL-basierte Zeitreihen-Datenbank namens [QuestDB](https://questdb.io/?ref=davidgsiot) tun, damit ich dachte, dass ich es mal geben würde. Wirklich klein (im Grunde integrierbare) und alle in Java geschrieben (hey, ich verwenden Java zu tun! 1995 begann in der Tat!) So was zum Teufel.

Ehrlich gesagt, ich bin fassungslos. Die Leistung dieser Sache ist umwerfend. Schauen Sie sich nur diese:

![Eingefärbte Karte GIF Laden schneller](/posts/category/database/images/NewMap-1.gif)

Das ‚Laden‘ Overlay ist immer noch da, es ist nur grundsätzlich nicht die Zeit, mehr zu zeigen hat.

Darüber hinaus ist die Abfragesprache SQL .... Hölle, sogar *** I *** wissen SQL! Ich muss es abzustauben ein wenig, da es Jahre her, seit ich geschrieben habe überhaupt, aber es ist wie Fahrrad fahren, meistens.

Du bist wahrscheinlich um mich zu fragen, da ich so eine große Sache daraus vor, hergestellt aus: „Ja, aber wie lange hat es gedauert, um es einzurichten?“ Ich werde Ihnen sagen: 30 Sekunden. Ich heruntergeladen habe und lief die `questdb.sh Starten` Skript und ... es wurde eingerichtet. Natürlich hatte es keine Daten, so dass ich alles in hatte zu laden. Ok, so, wie lange das dauern getan hat? Und wie schwer war es? Nun, ähm ...

Ich änderte mein Go-Programm, das zuvor alle den Hopkins COVID-19 Daten John modelt hatte von ihren CSV-Dateien zu Influx Linie Protokoll-Dateien, so dass ich **, dass Veränderung ein paar Minuten verbrachte **, so dass es alles ausgeben, in einem einzigen, einheitlichen Datei, normalisierte .csv (JHU ändert das Format ihrer cSV-Dateien recht häufig, so dass ich die Anpassung zu halten haben). Sobald ich das musste ich einfach per Drag-and-fiel es in die QuestDB Schnittstelle:

![Super schneller Import von CSV-Daten](/posts/category/database/images/import.gif)

Im Fall verpassen Sie, dass es 77.000 Zeilen in 0,2 Sekunden importiert.

![Standbild von Importgeschwindigkeit](/posts/category/database/images/import-1024x49.png)

Ach ja, und dann klickte ich das ‚view‘ Symbol und ... 77.000 Zeilen lesen in 0,016 Sekunden. Und diese Zahl ist ** nicht ** ein Tippfehler. Nullpunkt-Null-1 bis 6 Sekunden. Zugegeben, sind die Zeilen nicht so breit, aber immer noch, die unheiligen schnell ist.

So, jetzt habe ich ein neues Spielzeug zu spielen, und ich werde sehen, was sonst kann ich damit tun, was Spaß macht, und wahrscheinlich mehr IoT verwendet.

Bleiben Sie dran.
