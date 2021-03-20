---
title: „Ausblenden von Komplexität mit benutzerdefinierten Funktionen Berechnung Wärmeindex“
Date: 2019-08-23
Author: davidgs
Category: Databases, InfluxDB
Slug: hiding-complexity-with-custom-functions-calculating-heat-index
hero: images/HeatIndex.png
---

Haben Sie schon einmal das lokale Wetter beobachtet - oder The Weather Channel - und hören, wie sie die Temperatur melden, und dann dem „Heat Index“? Oder, wie heiß es ** ** fühlt sich außerhalb? Zumindest hier in den Vereinigten Staaten, und vor allem im Süden, es ist Teil jeden Wetter Sendung im Sommer. Aber haben Sie sich jemals gefragt, wie sie tatsächlich * berechnen * the Heat Index? Da ich Temperatur- und Feuchtedaten sammeln, beschloss ich einen Tag würde ich es gehen und herauszufinden. Nach allem, wie schwer kann es wirklich sein? Hinweis: nie selbst diese Frage stellen!

## Der Wärmeindex Berechnung

Sobald ich ging auf der Suche nach, was ich sicher, dass eine einfache Berechnung war eine Temperatur und eine Luftfeuchtigkeit Lesen in einen Wärmeindex (HALLO) Ich war traurig, dass ich auf dieser Straße hatte geleitet zu konvertieren. Ich fand einfach eine Seite, wo die National Oceanic and Atmospheric Administration (NOAA) die Formel legt. Es ist etwas, die Rothfusz Regressionsgleichung genannt, und es geht so:

** HALLO = -42,379 + 2,04901523 * T + 10,14333127 * RH - 0,22475541 * T * RH - 0,00683783 * T * T - 0,05481717 * RH * RH + 0,00122874 * T * T * RH + 0,00085282 * T * RH * RH - .00000199 * T * T * RH * RH **

Wo ** T ** ist temperatur- und ** RH ** ist relative Luftfeuchtigkeit. Einfach, nicht wahr? Nicht so schnell! Es stellt sich heraus es eine Reihe von Einschränkungen zu, dass (einfache) Gleichung ist. wenn die relative Luftfeuchtigkeit weniger als 13% Zum Beispiel ist und die Temperatur zwischen 80ºF und 112ºF, dann muss man durch Subtraktion der folgende ** ** Anpassung von dem Hitzeindex anzupassen:

** ADJUSTMENT = [(13-RH) / 4] * SQRT {[17-ABS (T-95.)] / 17} **

Ok, gut. Aber warten Sie, es gibt noch mehr! Wenn die relative Luftfeuchtigkeit über 85% beträgt, und die Temperatur zwischen 80ºF und 112ºF, dann müssen Sie ** ** Add die folgenden ** ** Adjustment es:

** ADJUSTMENT = [(RH-85) / 10] / [(87-T) / 5] **

Hervorragend! Wir sind endlich da ... Wartezeit, nicht wir sind noch nicht da. Wenn die Wärme Index unter 80ºF ist, dann brauchen Sie nicht, dass die Berechnung zu verwenden, um den Wärmeindex zu bestimmen. Sie können eine einfachere Steadman Gleichung verwenden:

** HALLO = 0,5 / {T + 61,0 + [(T-68,0) * 1.2] + (RH * 0094)} **

Also zuerst berechnen Sie die Hitze Index, die ‚einfache‘ Gleichung - und nach NOAA, Sie im Durchschnitt, dass mit der Temperaturmessung. Wenn das weniger als 80ºF ist, haben Sie Ihre Antwort. Wenn nicht, müssen Sie mit dem Rothfusz Regression und add (oder subtrahieren) Anpassungen fortzufahren, falls erforderlich.

Sehen? Einfach, wirklich.

## Doing it in Flux

Hier ist, wo einige komplizierte Flux ins Spiel kommt. Sie sehen, sind meine Temperatur- und Feuchtigkeitsmessungen in verschiedenen Messungen, so zunächst gibt es die Aufgabe, die Tabellen zu bauen, und sie verbindenden (yay für die Schönheit der Quermessung Mathematik in Flux!).

```js
humidity = from(bucket: "telegraf")
  |> range(start: v.timeRangeStart, stop: v.timeRangeStop)
  |> filter(fn: (r) => r._measurement == "environment" and (r._field == "humidity"))
  |> aggregateWindow(every: 30s, fn: mean)
  |> fill(column: "_value", usePrevious: true)
  |> keep(columns: ["_value", "_time"])

temperature = from(bucket: "telegraf")
  |> range(start: v.timeRangeStart)
  |> filter(fn: (r) => r._measurement == "temperature" and (r._field == "temp_f"))
  |> aggregateWindow(every: 30s, fn: mean)
  |> fill(column: "_value", usePrevious: true)
  |> keep(columns: ["_value", "_time"])
  |> yield(name: "Temperature")
```

Das bringt mir meine 2 Wertetabellen. (Randbemerkung: Ich habe die Temperaturtabelle ergeben, so dass mein Diagramm sowohl die Temperatur und den Wärmeindex in der gleichen Grafik zeigen.)

Als nächstes ich kommen Sie mit den zwei Tabellen:

```js
first_join = join(tables: {temperature: temperature, humidity: humidity}, on: ["_time"])
  |>map(fn: (r) => ({temperature: r._value_temperature, humidity:r._value_humidity, _time: r._time}))
  |> keep(columns: ["_time", "humidity", "temperature"])
```

So, jetzt habe ich eine einzelne Tabelle, auf Zeit ausgerichtet ist, mit Spalten für `temperature` und` humidity`. Alles, was übrig bleibt, ist die Berechnung zu tun:

```js
|> map(fn: (r) => ({t: r.temperature, h: r.humidity}))
  |> map(fn: (r) => ({
     r with heatIndex:
       if ((0.5 * (r.t + 61.0 + ((r.t-68.0)*1.2) + (r.h*0.094)))/2.0) < 80.0 then (0.5 * (r.t + 61.0 + ((r.t - 68.0)*1.2) + (r.h*0.094)))
       else if ( r.h < 13.0 and r.t > 80.0) then ((-42.379 + 2.04901523*r.t + 10.14333127*r.h - .22475541*r.t*r.h - .00683783*r.t*r.h - .05481717*r.t*r.h + .00122874*r.t*r.t*r.h + .00085282*r.t*r.h*r.h - .00000199*r.t*r.t*r.h*r.h - (((13.0-r.h)/4.0)*math.sqrt(x: ((17.0-math.abs(x: (r.t-95.0))/17.0))))))
        else if r.h > 85.0 and r.t >= 80.0 and r.t <= 87.0 then ((-42.379 + 2.04901523*r.t + 10.14333127*r.h - .22475541*r.t*r.h - .00683783*r.t*r.h - .05481717*r.t*r.h + .00122874*r.t*r.t*r.h + .00085282*r.t*r.h*r.h - .00000199*r.t*r.t*r.h*r.h) + (( r.h-85.0 )/10.0) *((87.0-r.t)/5.0))
        else (-42.379 + 2.04901523*r.t + 10.14333127*r.h - .22475541*r.t*r.h - .00683783*r.t*r.h - .05481717*r.t*r.h + .00122874*r.t*r.t*r.h + .00085282*r.t*r.h*r.h - .00000199*r.t*r.t*r.h*r.h)
      })
  )
  |> map(fn: (r) => ({_value: r.heatIndex, _time: r._time}))
  |> yield(name: "HeatIndex")
```

Ich habe dir gesagt, es war kompliziert Flux!

Aber am Ende, können Sie dann eine grafische Darstellung, die zeigt die tatsächliche Temperatur und der berechneten Wärmeindex in der gleichen Tabellenzelle:

![Hitzeindex](/posts/category/programming/images/HeatIndex.png)And that's a pretty cool thing!

## Nächster Schritt

Da das ist viel komplizierter Flux. Der nächste Schritt ist zu ziehen, dass alle in Flux-Funktionen, so dass Sie einfach `aufruf |> hitzeindex ()` auf dem Tisch mit `temperature` und` humidity` Spalten und die richtige Tabelle mit der daraus resultierenden Wärme Indizes wieder alle berechnet für Sie. Also ich bin in dem Prozess () `Funktion Flux der` hitzeindex hinzuzufügen, so dass Sie ziemlich Flux haben können, wenn Sie Ihren Wärme-Indizes berechnen.

Ich plane, in der Berechnung für ideales Gasgesetz (leicht gefallen) und Wind Chill als auch (andere hässliche!) Zu diesem Zukunftspaket sowie Wandler von ° F bis ºC hinzuzufügen, also wenn Sie noch andere Ideen für Dinge, die Sie für die Umwelt Berechnungen verwenden würden, bitte [ausstrecken](https://twitter.com/intent/follow?screen_name=davidgsIoT) und lassen Sie es mich wissen!
