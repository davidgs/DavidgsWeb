---
title: "All That Corona-Virus Data"
Date: 2020-03-18
Author: davidgs
Category: corona, General
Slug: all-that-corona-virus-data
hero: images/Covid-hero.png
---

Viele Menschen haben das raffinierte Armaturenbrett, dass Johns Hopkins University löschte gesehen, wo Sie die Anzahl der COVID-19 Fälle sehen können, usw. auf der ganzen Welt. Es ist wirklich schön und alles, aber was ist, wenn Sie in Scheiben schneiden und würfeln die Daten selbst wollte? Nun, wie sich herausstellt, sie veröffentlichen auch alle zugrunde liegenden Daten in einem [GitHub-Repository](https://github.com/CSSEGISandData/COVID-19)! Es ist alles wie täglich CSV veröffentlicht (comma separated values) Dateien. Macht es super einfach zu dem Import in Excel-Tabellen, aber Tabellen sind so über. Alle kühlen Kinder visualisieren ihre Daten in InfluxDB.

## Einlesen der Daten

Da ich mit der Arbeit an InfluxData, dachte ich, ich soll es einfach, die Daten in zu InfluxDB 2.0 zu lesen. Um das zu tun, musste ich jede der CSV-Dateien in der Datenmenge verarbeiten, transformiert die Daten in ein Format, dass InfluxDB effizient aufnehmen könnte, und es dann an eine Datenbank senden. Der einfachste Weg, zumindest für mich, war eine der vorgesehenen InfluxData Client-Bibliotheken zu verwenden, so dass ich den Golang ein wähle.

Ich werde nicht in die Besonderheiten von Whaat das Programm macht, da es super einfach ist, aber ich werde Sie auf dem Github-Repository, wo die Code befindet sich zeigen:<https://github.com/davidgs/covid-data>

## Verwendung

```bash
-dir: Path to where the .csv data files live. Default is . (current Directory)
-url: URL of your InfluxDB server, including port. (default: http://localhos:9999)
-bucket: Bucket name -- no default, REQUIRED
-organization: Organization name -- no default, REQUIRED
-measurement: Measurement name -- no default, REQUIRED
-token: InfluxDB Token -- no default, REQUIRED
```

Also alles, was Sie tun müssen, ist es zu bauen, und es dann auszuführen:

```bash
$ ./covid -dir path/to/data -bucket bucket_name -organization org_name -measurement measure_name -url http://your.server.com:9999 -token yourToken
```

Sie werden sehen, wie es läuft Ausgabe:

```bash
Scanning Data Directory: ../../COVID-19/csse_covid_19_data/csse_covid_19_daily_reports
Processing File: ../../COVID-19/csse_covid_19_data/csse_covid_19_daily_reports/01-22-2020.csv
Processing File: ../../COVID-19/csse_covid_19_data/csse_covid_19_daily_reports/01-23-2020.csv
Processing File: ../../COVID-19/csse_covid_19_data/csse_covid_19_daily_reports/01-24-2020.csv
Processing File: ../../COVID-19/csse_covid_19_data/csse_covid_19_daily_reports/01-25-2020.csv
Processing File: ../../COVID-19/csse_covid_19_data/csse_covid_19_daily_reports/01-26-2020.csv
```

Und Sie sollten Daten sehen Ihre InfluxDB Beispiel fließt in ebenso.
<p>{{&lt;Video "/ posts / Kategorie / database / images / COVID-19-Graph" "COVID Daten Grafische Darstellung"&gt;}}</p>
<p>&nbsp;</p>

Und hier kommt in zu einem Streudiagramm:
<p>&nbsp;</p>

<p>{{&lt;Video "/ posts / Kategorie / database / images / Covid-19-2" "COVID Daten Scatter-Plot"&gt;}}</p>
<p>&nbsp;</p>

Fühlen Sie sich frei, mit ihm zu spielen, um und lassen Sie mich wissen, was Sie denken!
