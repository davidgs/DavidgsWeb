---
title: "Het verbergen Complexity met aangepaste functies berekenen Warmte Index"
Date: 2019-08-23
Author: davidgs
Category: Databases, InfluxDB
Slug: hiding-complexity-with-custom-functions-calculating-heat-index
hero: images/HeatIndex.png
reading_time: 6 minutes
---

Heb je ooit keek naar de lokale weer - of The Weather Channel - en hoorde ze de temperatuur aan te kondigen, en dan is de "Heat Index"? Of hoe warm het **voelt** buiten? Tenminste hier in de Verenigde Staten, en vooral in het Zuiden, het is onderdeel van elke weer uitgezonden in de zomer. Maar heb je ooit afgevraagd hoe ze eigenlijk*berekenen* De Warmte Index? Sinds ik temperatuur en vochtigheid gegevens te verzamelen, heb ik besloten ik op een dag zou gaan en figuur is. Immers, hoe moeilijk kan het zijn echt? Tip: nooit jezelf die vraag te stellen!

## De Heat Indexberekening

Zodra ik op zoek gegaan naar wat ik zeker was een eenvoudige berekening tot een temperatuur en vochtigheidsgraad te zetten in een warmte-index (HI) Ik vond het jammer ik had deze weg geleid. Ik gemakkelijk vond een pagina waar de National Oceanic and Atmospheric Administration (NOAA) legt de formule. Het is iets genaamd de Rothfusz Regressievergelijking, en het gaat als volgt:

** HI = -42,379 + 2,04901523 * T + 10,14333127 * RH - 0,22475541*T* RH - 0,00683783*T* T - 0,05481717*RH* RH + 0,00122874*T* T * RH + 0,00085282*T* RH * RH - .00000199*T* T*RH* RH **

Waar **T** is de temperatuur en **RH** is relatieve vochtigheid. Simpel, toch? Niet zo snel! Het blijkt dat er een heleboel waarschuwingen die (eenvoudig) vergelijking. Bijvoorbeeld, als de relatieve vochtigheid minder dan 13% en de temperatuur tussen 80ºF en 112ºF, dan moet je de hitteindex aanpassen door het aftrekken van de volgende ** ** aanpassing ervan:

** AANPASSEN = [(13-RH) / 4] * SQRT {[17-ABS (T-95.)] / 17} **

Ok, prima. Maar wacht, er is meer! Als de relatieve vochtigheid van meer dan 85%, en de temperatuur tussen 80ºF en 112ºF, dan moet je ** ** toevoegen de volgende **Adjustment** aan toe:

** AANPASSEN = [(RH-85) / 10] / [(87-T) / 5] **

Outstanding! We zijn eindelijk daar ... wacht, nee we zijn er nog niet. Als de hitte-index lager dan 80ºF, dan heb je niet nodig hebt om die berekening te gebruiken om de warmte-index te bepalen. U kunt een meer eenvoudige Steadman vergelijking te gebruiken:

** HI = 0,5 / {T + 61,0 + [(T-68,0) * 1,2] + (RH * 0094)} **

Dus eerst moet je de berekening van de hitte-index met behulp van die 'eenvoudig' vergelijking - en, volgens de NOAA, u dat gemiddeld met de temperatuur lezen. Als die kleiner is dan 80ºF, heb je je antwoord. Zo niet, dan moet je om verder te gaan met de Rothfusz regressie en add (of aftrekken) eventuele aanpassingen, indien nodig.

Zien? Eenvoudig, echt.

## Doet het in Flux

Hier is waar een aantal ingewikkelde Flux in het spel komt. Zie je, mijn temperatuur en vochtigheid zijn in verschillende maten, dus eerst is er de taak van de bouw van de tafels en ze verbinden (yay voor de schoonheid van de cross-meting wiskunde in Flux!).

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

Dat wordt me mijn 2 tafels met waarden. (Kanttekening: Ik breng de temperatuur tafel zodat mijn grafiek zowel de temperatuur als de hitte-index in dezelfde grafiek laat zien.)

Vervolgens heb ik lid worden van de 2 tafels:

```js
first_join = join(tables: {temperature: temperature, humidity: humidity}, on: ["_time"])
  |>map(fn: (r) => ({temperature: r._value_temperature, humidity:r._value_humidity, _time: r._time}))
  |> keep(columns: ["_time", "humidity", "temperature"])
```

Dus nu heb ik een enkele tabel, aangepast aan de tijd, met kolommen voor `temperature` en` humidity`. Het enige dat overblijft is om de berekening uit te voeren:

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

Ik zei toch dat het was ingewikkeld Flux!

Maar op het einde, kunt u vervolgens een grafiek die laat zien de werkelijke temperatuur en de berekende Warmte-index in dezelfde tabel cel:

![warmte Index](/posts/category/programming/images/HeatIndex.png)And that's a pretty cool thing!

## Volgende stap

Want dat is een hoop ingewikkelde Flux. De volgende stap is om te trekken dat alle in Flux functies, zodat u kunt gewoon bellen `|> HeatIndex ()` op je tafel met `temperature` en` humidity` kolommen en terug te krijgen van de juiste tafel met de warmte die indexeert alle berekend voor u. Dus ik ben in het proces van het toevoegen van de HeatIndex () `functie` om Flux, zodat je vrij Flux kunt hebben wanneer u uw warmte indexen te berekenen.

Ik ben van plan in de berekening toe te voegen voor de ideale gaswet (een gemakkelijke) en Wind Chill ook (een ander lelijke!) Om deze toekomstige pakket evenals converters van ºF naar ºC, dus als u nog andere ideeën voor dingen die je zou gebruiken voor milieu-berekeningen, dan kunt u [bereiken] (https://twitter.com/intent/follow?screen_name=davidgsIoT) en laat het me weten!
