---
title: "Todo ese virus Corona de datos"
Date: 2020-03-18
Author: davidgs
Category: corona, General
Slug: all-that-corona-virus-data
hero: images/Covid-hero.png
---

Mucha gente ha visto el salpicadero ingenioso que la Universidad de John Hopkins puso a cabo donde se puede ver el número de casos COVID-19, etc en todo el mundo. Es muy agradable y todo, pero lo que si quería rebanada y dados los datos por sí mismo? Pues bien, como resulta, también están publicando todos los datos subyacentes en un [repositorio GitHub](https://github.com/CSSEGISandData/COVID-19)! Todo se publicó como CSV diaria (valores separados por comas) archivos. Hace que sea muy fácil de importación en hojas de cálculo Excel, hojas de cálculo, pero son tan terminado. Todos los niños frescos están visualizando sus datos en InfluxDB.

## La lectura en los Datos

Puesto que el trabajo I en InfluxData, pensé que debería hacer más fácil para leer los datos en InfluxDB a 2,0. Con el fin de hacer eso, tuve que procesar cada uno de los archivos CSV en el conjunto de datos, transformar los datos en un formato que InfluxDB podía ingerir de manera eficiente, y luego enviarlo a una base de datos. La forma más fácil, al menos para mí, era utilizar una de las bibliotecas de cliente InfluxData proporcionados, así que elegí el uno Golang.

No voy a entrar en los detalles de whaat que hace el programa, ya que es super simple, pero te voy a apuntar al repositorio de Github donde reside el código:<https://github.com/davidgs/covid-data>

## Uso

```bash
-dir: Path to where the .csv data files live. Default is . (current Directory)
-url: URL of your InfluxDB server, including port. (default: http://localhos:9999)
-bucket: Bucket name -- no default, REQUIRED
-organization: Organization name -- no default, REQUIRED
-measurement: Measurement name -- no default, REQUIRED
-token: InfluxDB Token -- no default, REQUIRED
```

Así que todo lo que tiene que hacer es construir, y luego ejecutarlo:

```bash
$ ./covid -dir path/to/data -bucket bucket_name -organization org_name -measurement measure_name -url http://your.server.com:9999 -token yourToken
```

Verá una salida ya que se ejecuta:

```bash
Scanning Data Directory: ../../COVID-19/csse_covid_19_data/csse_covid_19_daily_reports
Processing File: ../../COVID-19/csse_covid_19_data/csse_covid_19_daily_reports/01-22-2020.csv
Processing File: ../../COVID-19/csse_covid_19_data/csse_covid_19_daily_reports/01-23-2020.csv
Processing File: ../../COVID-19/csse_covid_19_data/csse_covid_19_daily_reports/01-24-2020.csv
Processing File: ../../COVID-19/csse_covid_19_data/csse_covid_19_daily_reports/01-25-2020.csv
Processing File: ../../COVID-19/csse_covid_19_data/csse_covid_19_daily_reports/01-26-2020.csv
```

Y hay que ver los datos que fluye en su instancia InfluxDB también.
<p>{{&lt;video "/ mensajes / categoría / bases de datos / imágenes / COVID-19-gráfico" "COVID de datos gráfica"&gt;}}</p>
<p>&nbsp;</p>

Y aquí se está llegando a un gráfico de dispersión:
<p>&nbsp;</p>

<p>{{&lt;/ Video "mensajes / categoría / bases de datos / imágenes / Covid-19-2" "COVID datos dispersión de las parcelas"&gt;}}</p>
<p>&nbsp;</p>

Siéntase libre para jugar un rato con él y me dejó saber lo que piensa!
