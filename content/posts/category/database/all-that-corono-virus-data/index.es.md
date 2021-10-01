---
title: "Todos los datos del virus Corona"
Date: 2020-03-18
Author: davidgs
Category: corona, General
Slug: all-that-corona-virus-data
hero: images/Covid-hero.png
reading_time: 2 minutes
---

Mucha gente ha visto el ingenioso tablero que puso la Universidad de Hopkins de John donde se puede ver la cantidad de casos de COVID-19, etc. en todo el mundo. Es realmente agradable y todo, pero ¿y si quisiera cortar y cortar los datos usted mismo? Bueno, resulta que también están publicando todos los datos subyacentes en un [repositorio de GitHub](https://github.com/CSSEGISandData/COVID-19). Todo se publica como archivos CSV (valores separados por comas) diarios. Hace que sea muy fácil de importar en hojas de cálculo de Excel, pero las hojas de cálculo se acabaron. Todos los chicos geniales están visualizando sus datos en InfluxDB.

## Lectura de los datos

Como trabajo en InfluxData, pensé que debería facilitar la lectura de los datos en InfluxDB 2.0. Para hacer eso, tuve que procesar cada uno de los archivos CSV en el conjunto de datos, transformar los datos en un formato que InfluxDB pudiera ingerir de manera eficiente y luego enviarlos a una base de datos. La forma más fácil, al menos para mí, era usar una de las bibliotecas cliente de InfluxData proporcionadas, así que elegí la de Golang.

No entraré en los detalles de lo que hace el programa, ya que es muy simple, pero te señalaré el Repositorio de Github donde reside el código:<https://github.com/davidgs/covid-data>

## Uso

```bash
-dir: Path to where the .csv data files live. Default is . (current Directory)
-url: URL of your InfluxDB server, including port. (default: http://localhos:9999)
-bucket: Bucket name -- no default, REQUIRED
-organization: Organization name -- no default, REQUIRED
-measurement: Measurement name -- no default, REQUIRED
-token: InfluxDB Token -- no default, REQUIRED
```

Así que todo lo que tienes que hacer es construirlo y luego ejecutarlo:

```bash
$ ./covid -dir path/to/data -bucket bucket_name -organization org_name -measurement measure_name -url http://your.server.com:9999 -token yourToken
```

Verá la salida a medida que se ejecuta:

```bash
Scanning Data Directory: ../../COVID-19/csse_covid_19_data/csse_covid_19_daily_reports
Processing File: ../../COVID-19/csse_covid_19_data/csse_covid_19_daily_reports/01-22-2020.csv
Processing File: ../../COVID-19/csse_covid_19_data/csse_covid_19_daily_reports/01-23-2020.csv
Processing File: ../../COVID-19/csse_covid_19_data/csse_covid_19_daily_reports/01-24-2020.csv
Processing File: ../../COVID-19/csse_covid_19_data/csse_covid_19_daily_reports/01-25-2020.csv
Processing File: ../../COVID-19/csse_covid_19_data/csse_covid_19_daily_reports/01-26-2020.csv
```

Y también debería ver que los datos fluyen hacia su instancia de InfluxDB.
{{< video "/posts/category/database/images/COVID-19-graph" "COVID Data Graphing" >}}

Y aquí está entrando en un diagrama de dispersión:

{{< video "/posts/category/database/images/Covid-19-2" "COVID Data Scatter-plot" >}}

¡Siéntete libre de jugar con él y déjame saber lo que piensas!
