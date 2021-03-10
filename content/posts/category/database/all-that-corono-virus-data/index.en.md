---
title: "All That Corona Virus Data"
Date: 2020-03-18
Author: davidgs
Category: corona, General
Slug: all-that-corona-virus-data
hero: images/Covid-hero.png
---

Many people have seen the nifty dashboard that John's Hopkins University put out where you can see the number of COVID-19 cases, etc. throughout the world. It's really nice and all, but what if you wanted to slice and dice the data yourself? Well, as it turns out, they are also publishing all the underlying data in a [GitHub repository](https://github.com/CSSEGISandData/COVID-19)! It's all published as daily CSV (comma separated values) files. Makes it super easy to import into Excel spreadsheets, but spreadsheets are so over. All the cool kids are visualizing their data in InfluxDB.

## Reading in the Data

Since I work at InfluxData, I figured I should make it easy to read the data in to InfluxDB 2.0. In order to do that, I had to process each of the CSV files in the dataset, transform the data into a format that InfluxDB could ingest efficiently, and then send it to a database. The easiest way, at least for me, was to use one of the provided InfluxData client libraries, so I chose the Golang one.

I won't go into the specifics of whaat the program does, as it's super simple, but I'll point you to the Github Repository where the code resides: <https://github.com/davidgs/covid-data>

## Usage

```bash
-dir: Path to where the .csv data files live. Default is . (current Directory)
-url: URL of your InfluxDB server, including port. (default: http://localhos:9999)
-bucket: Bucket name -- no default, REQUIRED
-organization: Organization name -- no default, REQUIRED
-measurement: Measurement name -- no default, REQUIRED
-token: InfluxDB Token -- no default, REQUIRED
```

So all you have to do is build it, and then run it:

```bash
$ ./covid -dir path/to/data -bucket bucket_name -organization org_name -measurement measure_name -url http://your.server.com:9999 -token yourToken
```

You will see output as it runs:

```bash
Scanning Data Directory: ../../COVID-19/csse_covid_19_data/csse_covid_19_daily_reports
Processing File: ../../COVID-19/csse_covid_19_data/csse_covid_19_daily_reports/01-22-2020.csv
Processing File: ../../COVID-19/csse_covid_19_data/csse_covid_19_daily_reports/01-23-2020.csv
Processing File: ../../COVID-19/csse_covid_19_data/csse_covid_19_daily_reports/01-24-2020.csv
Processing File: ../../COVID-19/csse_covid_19_data/csse_covid_19_daily_reports/01-25-2020.csv
Processing File: ../../COVID-19/csse_covid_19_data/csse_covid_19_daily_reports/01-26-2020.csv
```

And you should see data flowing into your InfluxDB instance as well.
<p>{{< video "/posts/category/database/images/COVID-19-graph" "COVID Data Graphing" >}}</p>
<p>&nbsp;</p>

And here is is coming in to a scatter plot:
<p>&nbsp;</p>

<p>{{< video "/posts/category/database/images/Covid-19-2" "COVID Data Scatter-plot" >}}</p>
<p>&nbsp;</p>

Feel free to play around with it and let me know what you think!
