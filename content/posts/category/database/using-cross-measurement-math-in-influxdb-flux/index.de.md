---
title: „Verwenden von Kreuzmess Mathe in InfluxDB Flux“
Date: 2019-03-22
Author: davidgs
Category: IoT
Slug: using-cross-measurement-math-in-influxdb-flux
hero: images/Screen-Shot-2019-03-18-at-3.56.28-PM.png
reading_time: 5 minutes
---

Ich habe Releases viel Zeit verbringe in letzter Zeit mit dem 2.0 Alpha und ich bin hier, um Ihnen zu sagen: einige der neuen Sachen kommen wirklich, wirklich cool! Speziell für das Internet der Dinge. Der, den ich habe in letzter Zeit mit hat die Fähigkeit, mathematische über Messungen zu tun, die für das Internet der Dinge Daten in InfluxDB wirklich ein Spiel-Wechsler ist.

Schauen wir uns, warum hier für eine Minute. Wie Sie wahrscheinlich wissen, ich habe eine Reihe von IoT-Sensoren, die Stream-Daten an verschiedenen Instanzen von InfluxDB Aufbau geführt. Einer der wichtigsten Sensoren ich verwende, ist ein SenseAir K-30 CO2-Sensor. Es ist ein sagenhaft präziser Sensor, obwohl es nicht billig ist. Ich habe es ein Jahr lang mit oder so und es ist extrem zuverlässig und genau, aber ich frage mich, wie die Temperatur und der Druck könnten den CO2-Wert beeinflussen. Was ich fand, war, natürlich, diese Dinge zu tun, in der Tat, egal.

Ich lese bis auf es [hier](https://www.bapihvac.com/application-note/effects-of-temperature-and-barometric-pressure-on-co2-sensors-application-note/), aber im Wesentlichen die Temperatur und Atmosphärendruck wirken sich auf die Menge des Gases in der Messkammer, nicht die Konzentration, so dass ein für kompensieren sollte. Es ist eine ziemlich einfache Berechnung mit einigen Referenzwerten wie die absoluten Nullpunkt und den Druck auf Meereshöhe zu tun.

Wir werden die [allgemeines Gas](https://en.wikipedia.org/wiki/Ideal_gas_law) Formel:

```
ppm CO2 corrected = ppm CO2 measured * ((Temp measured * Pressure Reference ) / (Pressure measured * Temp Reference))
```

Großartig. Einfach! Fast. Ich habe einen Temperatur- / Drucksensor, speichern Werte in einer ‚Umwelt‘ Messung in meiner InfluxDB Instanz. Mein CO2-Sensor speichert seine Messwerte in einer „k30_reader“ Messung. Wenn Sie nicht Flux verwenden, sehen Sie schon das Problem hier: Diese Werte in verschiedenen Messungen leben, also entweder ich nicht diese Berechnung tun kann oder muss ich eine ganze Menge Gymnastik tun, um irgendwie alle diese Werte in einem gemeinsamen umschreiben Messung zuerst. Weder ist eine wirklich tragfähige Antwort, oder?

Geben Sie Flux und Cross-Messung Mathe! Also lassen Sie uns gehen durch, wie ich erreicht dies in Flux (mit * ton * Hilfe von Kollegen devrel Anais, ua). Eine kleine Auffrischung, wie Flux gibt Werte zuerst. Erinnern wir uns daran, dass, wenn ich eine Abfrage in Flux einreichen, ich eine Tabelle mit Werten zurück. Dies wird wichtig, wie wir gehen durch, wie die Flux-Abfrage erstellt wird, so dass im Auge behalten.

```js
Tref = 298.15
Pref = 1013.25

Tmeas = from(bucket: "telegraf")
   |> range(start: v.timeRangeStart)
   |> filter(fn: (r) => r._measurement == "environment" and (r._field == "temp_c"))
   |> fill(column: "_value", usePrevious: true)
   |> aggregateWindow(every: 30s, fn: mean)
   |> keep(columns: ["_value", "_time"])
```

Zuerst habe ich meine Referenztemperatur und Druckwerte definiert. Die Referenztemperatur beträgt in der Regel 25 ° C, zu Kelvin umgewandelt, und der Referenzdruck ist Meeresspiegel. Ich habe dann Abfrage Werte der gemessenen Temperaturwerte und speichert sie in einer Tabelle ‚Tmess‘ genannt. Wenn ich `ergeben ()` auf diesem Tisch, werde ich meine Temperaturwerte sehen:

![Graph showing peaks of actual CO2 and adjusted CO levels](/posts/category/database/images/Screen-Shot-2019-03-19-at-4.21.00-PM.png)

Ich wiederhole dies dann für die CO2- und Druckwerte:

```js
CO2meas = from(bucket: "telegraf")
   |> range(start: v.timeRangeStart)
   |> filter(fn: (r) => r._measurement == "k30_reader" and (r._field == "co2"))
   |> fill(column: "_value", usePrevious: true)
   |> aggregateWindow(every: 30s, fn: mean)
   |> keep(columns: ["_value", "_time"])
```

```js
Pmeas = from(bucket: "telegraf")
   |> range(start: v.timeRangeStart)
   |> filter(fn: (r) => r._measurement == "environment" and (r._field == "pressure"))
   |> fill(column: "_value", usePrevious: true)
   |> aggregateWindow(every: 30s, fn: mean)
   |> keep(columns: ["_value", "_time"])
```

Großartig! Ich habe jetzt drei Tabellen mit allen Werten Ich brauche meine Berechnungen zu tun. Alles, was ich jetzt tun muß, ist, sie alle am gleichen Strang ziehen, und ich werde das durch eine Reihe von `join ()` Aussagen tun:

```js
first_join = join(tables: {CO2meas: CO2meas, Tmeas: Tmeas}, on: ["_time"])
    |> fill(column: "_value_CO2meas", usePrevious: true)
   |>fill(column: "_value_CO2meas", value: 400.00)
    |> fill(column: "_value_Tmeas",usePrevious: true)
   |>fill(column: "_value_Tmeas", value: 20.0)
```

Dieser erste `join ()` wird mir eine Tabelle, die den CO2- und Temperaturwert enthält, so bin ich einen Teil Weg dorthin.

```js
second_join = join(tables: {first_join: first_join, Pmeas: Pmeas}, on: ["_time"])
   |>fill(column: "_value", usePrevious: true)
   |>fill(column: "_value", value: 1013.25)
   |>map(fn: (r) => ({_time: r._time, _Pmeas: r._value, _CO2meas:r._value_CO2meas, _Tmeas:r._value_Tmeas}))
```

Diese zweite `join ()` wird mir eine Tabelle mit allen Messwerten in it! Man könnte meinen, ich getan werden würde, aber um die endgültige Berechnung zu tun, da ich auf `Time` bin bei, ich habe einen Finaltisch zu bauen, wo ich in den Referenzwerten für jede Zeile in der Tabelle zu füllen.

```js
final = second_join
   |>map(fn: (r) => ({Pmeas: r._Pmeas, CO2meas:r._CO2meas, Tmeas:r._Tmeas, Pref: Pref, Tref: Tref, _time: r._time,}))
    |> keep(columns: ["_time", "CO2meas", "Pmeas", "Tmeas", "Pref", "Tref"])
```

So kann ich nun eine endgültige Tabelle erstellen und den kompensierte CO2 Wert berechnen, für jede Zeile (Zeit).

```js
CO2corr = final
    |> map(fn: (r) => ({"_time": r._time, "CO2-Measured": r.CO2meas, "CO2-Adjusted": r.CO2meas * (((r.Tmeas + 273.15) * r.Pref) / (r.Pmeas * r.Tref))}))
   |> yield()
```

Da dies meine letzte Tabelle ist, nenne ich `Ausbeute ()` am Ende so, dass die Werte angezeigt bekommen.

Und jetzt habe ich ein Diagramm, das zeigt die rohe, gemessen CO2-Wert und der kompensierte CO2-Wert! Alle Quer Messung Mathematik mit Flux on-the-fly getan!

![Graph showing peaks of actual CO2 and adjusted CO levels](/posts/category/database/images/Screen-Shot-2019-03-18-at-3.56.28-PM.png)

Ich habe will eigentlich schon seit ** ** langer Zeit, um diese Sensorkompensation tun und ich bin begeistert, dass ich es jetzt schnell tun können und einfach mit Flux! Also, was werden Sie tun, mit Cross-Messung Mathe in Flux? Fühlen Sie sich frei twittern Sie mir Ihre Ideen, Lösungen, usw. [@davidgsIoT](https://twitter.com/davidgsIoT)!
