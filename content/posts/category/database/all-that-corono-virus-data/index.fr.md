---
title: "Toutes ces données de virus Corona"
Date: 2020-03-18
Author: davidgs
Category: corona, General
Slug: all-that-corona-virus-data
hero: images/Covid-hero.png
---

Beaucoup de gens ont vu le tableau de bord astucieux que l'Université John's Hopkins a publié sur lequel vous pouvez voir le nombre de cas de COVID-19, etc. dans le monde. C'est vraiment sympa et tout, mais que faire si vous vouliez découper vous-même les données? Eh bien, il s'avère qu'ils publient également toutes les données sous-jacentes dans un [référentiel GitHub](https://github.com/CSSEGISandData/COVID-19)! Tout est publié sous forme de fichiers CSV quotidiens (valeurs séparées par des virgules). Rend très facile l'importation dans des feuilles de calcul Excel, mais les feuilles de calcul sont tellement terminées. Tous les enfants sympas visualisent leurs données dans InfluxDB.

## Lecture des données

Depuis que je travaille chez InfluxData, je me suis dit que je devrais faciliter la lecture des données dans InfluxDB 2.0. Pour ce faire, j'ai dû traiter chacun des fichiers CSV de l'ensemble de données, transformer les données dans un format qu'InfluxDB pourrait ingérer efficacement, puis les envoyer à une base de données. Le moyen le plus simple, du moins pour moi, était d'utiliser l'une des bibliothèques clientes InfluxData fournies, j'ai donc choisi celle de Golang.

Je n'entrerai pas dans les détails de ce que fait le programme, car c'est super simple, mais je vais vous diriger vers le référentiel Github où réside le code:<https://github.com/davidgs/covid-data>

## Utilisation

```bash
-dir: Path to where the .csv data files live. Default is . (current Directory)
-url: URL of your InfluxDB server, including port. (default: http://localhos:9999)
-bucket: Bucket name -- no default, REQUIRED
-organization: Organization name -- no default, REQUIRED
-measurement: Measurement name -- no default, REQUIRED
-token: InfluxDB Token -- no default, REQUIRED
```

Donc, tout ce que vous avez à faire est de le construire, puis de l'exécuter:

```bash
$ ./covid -dir path/to/data -bucket bucket_name -organization org_name -measurement measure_name -url http://your.server.com:9999 -token yourToken
```

Vous verrez la sortie pendant qu'elle s'exécute:

```bash
Scanning Data Directory: ../../COVID-19/csse_covid_19_data/csse_covid_19_daily_reports
Processing File: ../../COVID-19/csse_covid_19_data/csse_covid_19_daily_reports/01-22-2020.csv
Processing File: ../../COVID-19/csse_covid_19_data/csse_covid_19_daily_reports/01-23-2020.csv
Processing File: ../../COVID-19/csse_covid_19_data/csse_covid_19_daily_reports/01-24-2020.csv
Processing File: ../../COVID-19/csse_covid_19_data/csse_covid_19_daily_reports/01-25-2020.csv
Processing File: ../../COVID-19/csse_covid_19_data/csse_covid_19_daily_reports/01-26-2020.csv
```

Et vous devriez également voir des données circuler dans votre instance InfluxDB.
{{< video "/posts/category/database/images/COVID-19-graph" "COVID Data Graphing" >}}

Et voici venir un nuage de points:

{{< video "/posts/category/database/images/Covid-19-2" "COVID Data Scatter-plot" >}}

N'hésitez pas à jouer avec et dites-moi ce que vous en pensez!
