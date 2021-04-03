---
title: "All That Corona Virus Data"
Date: 2020-03-18
Author: davidgs
Category: corona, General
Slug: all-that-corona-virus-data
hero: images/Covid-hero.png
---

Veel mensen hebben de handige dashboard dat John Hopkins University stak waar u het aantal COVID-19 gevallen, enz. Kunt zien over de hele wereld gezien. Het is echt leuk en al, maar wat als je wilde Kneden en de gegevens zelf? Nou, zo blijkt, ze zijn ook het publiceren van alle onderliggende gegevens in een [GitHub repository](https://github.com/CSSEGISandData/COVID-19)! Het is allemaal gepubliceerd als dagelijkse CSV (comma separated values) bestanden. Maakt het super eenvoudig te importeren in Excel spreadsheets, maar spreadsheets zijn zo voorbij. Alle koel kind het visualiseren van hun gegevens in InfluxDB.

## Het lezen in de Data

Omdat ik werk bij InfluxData, ik dacht dat ik zou het gemakkelijk maken om de gegevens te lezen in te InfluxDB 2.0. Om dat te doen, moest ik aan elk van de CSV-bestanden in de dataset te verwerken, de gegevens om te zetten in een formaat dat InfluxDB efficiënt zou kunnen innemen, en vervolgens naar een database. De gemakkelijkste manier, althans voor mij, was het een van de meegeleverde InfluxData client libraries gebruiken, dus ik het Golang één koos.

Ik zal niet ingaan op de details van whaat het programma doet, want het is super simpel, maar ik zal je wijzen op de Github Repository waar de code zich bevindt:<https://github.com/davidgs/covid-data>

## Gebruik

```bash
-dir: Path to where the .csv data files live. Default is . (current Directory)
-url: URL of your InfluxDB server, including port. (default: http://localhos:9999)
-bucket: Bucket name -- no default, REQUIRED
-organization: Organization name -- no default, REQUIRED
-measurement: Measurement name -- no default, REQUIRED
-token: InfluxDB Token -- no default, REQUIRED
```

Dus alles wat je hoeft te doen is op te bouwen, en dan voer het uit:

```bash
$ ./covid -dir path/to/data -bucket bucket_name -organization org_name -measurement measure_name -url http://your.server.com:9999 -token yourToken
```

Je zult de uitgang te zien zoals het loopt:

```bash
Scanning Data Directory: ../../COVID-19/csse_covid_19_data/csse_covid_19_daily_reports
Processing File: ../../COVID-19/csse_covid_19_data/csse_covid_19_daily_reports/01-22-2020.csv
Processing File: ../../COVID-19/csse_covid_19_data/csse_covid_19_daily_reports/01-23-2020.csv
Processing File: ../../COVID-19/csse_covid_19_data/csse_covid_19_daily_reports/01-24-2020.csv
Processing File: ../../COVID-19/csse_covid_19_data/csse_covid_19_daily_reports/01-25-2020.csv
Processing File: ../../COVID-19/csse_covid_19_data/csse_covid_19_daily_reports/01-26-2020.csv
```

En moet je zien gegevens die in uw InfluxDB bijvoorbeeld ook.
{{< video "/posts/category/database/images/COVID-19-graph" "COVID Data Graphing" >}}

En hier komt in een scatter plot:

{{< video "/posts/category/database/images/Covid-19-2" "COVID Data Scatter-plot" >}}

Voel je vrij om te spelen met het en laat me weten wat je ervan vindt!
