---
title: "All That Corona Virus Data"
Date: 2020-03-18
Author: davidgs
Category: corona, General
Slug: all-that-corona-virus-data
hero: images/Covid-hero.png
---

Beaucoup de gens ont vu le tableau de bord que l'Université Hopkins nifty de John mis où vous pouvez voir le nombre de cas Covid-19, etc. dans le monde entier. Il est vraiment agréable et tout, mais si vous vouliez Débiter les données vous-même? Eh bien, il se trouve, ils publient également toutes les données sous-jacentes dans un [dépôt GitHub](https://github.com/CSSEGISandData/COVID-19)! Il est publié tous au format CSV par jour (valeurs séparées par des virgules). Rend super facile à importer dans Excel des feuilles de calcul, mais les feuilles de calcul sont tellement plus. Tous les enfants de frais visualisent leurs données dans InfluxDB.

## Lecture dans les données

Puisque le travail I à InfluxData, je me suis dit que je devrais le rendre facile à lire les données pour InfluxDB 2.0. Pour ce faire, je devais traiter chacun des fichiers CSV dans l'ensemble de données, transformer les données en un format qui pourrait InfluxDB ingèrent efficacement, puis l'envoyer à une base de données. La meilleure façon, au moins pour moi, était d'utiliser l'une des bibliothèques clientes fournies InfluxData, j'ai donc choisi celui golang.

Je ne vais pas entrer dans les détails de whaat le programme fait, comme il est simple super, mais je vais vous indiquer le dépôt Github où réside le code:<https://github.com/davidgs/covid-data>

## Utilisation

```bash
-dir: Path to where the .csv data files live. Default is . (current Directory)
-url: URL of your InfluxDB server, including port. (default: http://localhos:9999)
-bucket: Bucket name -- no default, REQUIRED
-organization: Organization name -- no default, REQUIRED
-measurement: Measurement name -- no default, REQUIRED
-token: InfluxDB Token -- no default, REQUIRED
```

Donc, tout ce que vous devez faire est de construire, puis l'exécuter:

```bash
$ ./covid -dir path/to/data -bucket bucket_name -organization org_name -measurement measure_name -url http://your.server.com:9999 -token yourToken
```

Vous verrez la sortie car il fonctionne:

```bash
Scanning Data Directory: ../../COVID-19/csse_covid_19_data/csse_covid_19_daily_reports
Processing File: ../../COVID-19/csse_covid_19_data/csse_covid_19_daily_reports/01-22-2020.csv
Processing File: ../../COVID-19/csse_covid_19_data/csse_covid_19_daily_reports/01-23-2020.csv
Processing File: ../../COVID-19/csse_covid_19_data/csse_covid_19_daily_reports/01-24-2020.csv
Processing File: ../../COVID-19/csse_covid_19_data/csse_covid_19_daily_reports/01-25-2020.csv
Processing File: ../../COVID-19/csse_covid_19_data/csse_covid_19_daily_reports/01-26-2020.csv
```

Et vous devriez voir les données qui coule dans votre exemple InfluxDB ainsi.
<p>{{&lt;video "/ messages / catégorie / base de données / images / Covid-19-graph" "Covid données Graphing"&gt;}}</p>
<p>&nbsp;</p>

Et voici vient dans un diagramme de dispersion:
<p>&nbsp;</p>

<p>{{&lt;/ Vidéo "messages / catégorie / base de données / images / Covid-19-2" "Covid données diagramme de dispersion"&gt;}}</p>
<p>&nbsp;</p>

Ne hésitez pas à jouer avec elle et laissez-moi savoir ce que vous pensez!
