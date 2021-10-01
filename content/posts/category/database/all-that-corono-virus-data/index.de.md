---
title: "All diese Corona-Virusdaten"
Date: 2020-03-18
Author: davidgs
Category: corona, General
Slug: all-that-corona-virus-data
hero: images/Covid-hero.png
reading_time: 2 minutes
---

Viele Leute haben das raffinierte Dashboard der Johns Hopkins University gesehen, in dem Sie die Anzahl der COVID-19-Fälle usw. auf der ganzen Welt sehen können. Es ist wirklich schön und alles, aber was ist, wenn Sie die Daten selbst in Scheiben schneiden und würfeln möchten? Wie sich herausstellt, veröffentlichen sie auch alle zugrunde liegenden Daten in einem [GitHub-Repository](https://github.com/CSSEGISandData/COVID-19)! Es wird alles als tägliche CSV-Datei (Comma Separated Values) veröffentlicht. Das Importieren in Excel-Tabellen ist sehr einfach, aber die Tabellen sind so vorbei. Alle coolen Kids visualisieren ihre Daten in InfluxDB.

## Daten einlesen

Da ich bei InfluxData arbeite, dachte ich mir, ich sollte es einfach machen, die Daten in InfluxDB 2.0 einzulesen. Dazu musste ich jede der CSV-Dateien im Dataset verarbeiten, die Daten in ein Format umwandeln, das InfluxDB effizient aufnehmen konnte, und sie dann an eine Datenbank senden. Zumindest für mich war es am einfachsten, eine der bereitgestellten InfluxData-Client-Bibliotheken zu verwenden, also habe ich mich für die Golang-Bibliothek entschieden.

Ich werde nicht auf die Einzelheiten des Programms eingehen, da es sehr einfach ist, aber ich werde Sie auf das Github-Repository verweisen, in dem sich der Code befindet:<https://github.com/davidgs/covid-data>

## Verwendung

```bash
-dir: Path to where the .csv data files live. Default is . (current Directory)
-url: URL of your InfluxDB server, including port. (default: http://localhos:9999)
-bucket: Bucket name -- no default, REQUIRED
-organization: Organization name -- no default, REQUIRED
-measurement: Measurement name -- no default, REQUIRED
-token: InfluxDB Token -- no default, REQUIRED
```

Sie müssen es also nur erstellen und dann ausführen:

```bash
$ ./covid -dir path/to/data -bucket bucket_name -organization org_name -measurement measure_name -url http://your.server.com:9999 -token yourToken
```

Sie werden die Ausgabe sehen, während sie ausgeführt wird:

```bash
Scanning Data Directory: ../../COVID-19/csse_covid_19_data/csse_covid_19_daily_reports
Processing File: ../../COVID-19/csse_covid_19_data/csse_covid_19_daily_reports/01-22-2020.csv
Processing File: ../../COVID-19/csse_covid_19_data/csse_covid_19_daily_reports/01-23-2020.csv
Processing File: ../../COVID-19/csse_covid_19_data/csse_covid_19_daily_reports/01-24-2020.csv
Processing File: ../../COVID-19/csse_covid_19_data/csse_covid_19_daily_reports/01-25-2020.csv
Processing File: ../../COVID-19/csse_covid_19_data/csse_covid_19_daily_reports/01-26-2020.csv
```

Außerdem sollten Daten in Ihre InfluxDB-Instanz fließen.
{{< video "/posts/category/database/images/COVID-19-graph" "COVID Data Graphing" >}}

Und hier kommt ein Streudiagramm:

{{< video "/posts/category/database/images/Covid-19-2" "COVID Data Scatter-plot" >}}

Fühlen Sie sich frei, damit herumzuspielen und lassen Sie mich wissen, was Sie denken!
