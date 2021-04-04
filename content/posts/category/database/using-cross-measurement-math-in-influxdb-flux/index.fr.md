---
title: « Utilisation de mathématiques croisées dans la mesure InfluxDB Flux »
Date: 2019-03-22
Author: davidgs
Category: IoT
Slug: using-cross-measurement-math-in-influxdb-flux
hero: images/Screen-Shot-2019-03-18-at-3.56.28-PM.png
---

J'ai passé beaucoup de temps ces derniers temps avec les 2.0 versions Alpha et je suis ici pour vous dire: quelques-unes des nouvelles choses à venir sont vraiment, vraiment cool! Surtout pour IdO. Celui que je l'ai utilisé ces derniers temps a été la possibilité de faire des mathématiques à travers des mesures, ce qui est vraiment un changeur de jeu pour les données IdO dans InfluxDB.

look Let pourquoi ici à une minute. Comme vous le savez probablement, j'ai construit un tas de capteurs IdO de données de flux à différentes instances de InfluxDB. L'un des principaux capteurs que j'utilise est un capteur de CO2 SenseAir K-30. Il est un capteur précis fabuleusement, bien que ce n'est pas pas cher. Je l'ai utilisé pour un an et il est extrêmement fiable et précis, mais je me demandais comment la température et la pression peuvent affecter les lectures de CO2. Ce que je trouve était, bien sûr, ces choses, en fait, de la matière.

J'ai lu sur le sujet [ici](https://www.bapihvac.com/application-note/effects-of-temperature-and-barometric-pressure-on-co2-sensors-application-note/), mais essentiellement la température et la pression atmosphérique affectent la quantité de gaz à l'intérieur de la chambre de mesure, et non la concentration, donc il faut compenser. Le calcul est assez simple à faire en utilisant des valeurs de référence comme zéro absolu et la pression au niveau de la mer.

Nous allons utiliser le (https://en.wikipedia.org/wiki/Ideal_gas_law) [Loi Idéal gaz] formule:

```
ppm CO2 corrected = ppm CO2 measured * ((Temp measured * Pressure Reference ) / (Pressure measured * Temp Reference))
```

Génial. Facile! Presque. J'ai un capteur de température / pression qui stocke les valeurs dans une mesure « environnement » dans mon exemple InfluxDB. Mon capteur de CO2 stocke ses lectures dans une mesure « k30_reader ». Si vous ne l'utilisez Flux, vous voyez déjà le problème ici: Ces valeurs vivent dans des mesures différentes, donc je ne peux pas non plus faire ce calcul ou je dois faire un montant équitable de la gymnastique à réécrire en quelque sorte toutes ces valeurs en commun première mesure. Ni est une réponse vraiment viable, est-il?

Entrez Flux et mathématiques cross-mesure! Alors Parcourons comment j'accompli cela en flux (avec un * ton * d'aide de son compatriote devrel Anaïs, entre autres). Un peu de recyclage sur la façon dont Flux renvoie des valeurs en premier. Souvenons-nous que lorsque je soumets une requête dans Flux, je reviens d'une table de valeurs. Cela devient important que nous marchons à la façon dont la requête Flux est construit, donc gardez cela à l'esprit.

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

D'abord, je l'ai défini mes valeurs de température de référence et de pression. La température de référence est généralement 25 ° C, converti en Kelvin, et la pression de référence est le niveau de la mer. Ì requête valeurs des valeurs de température mesurées et le stocker dans une table appelée « Tmeas ». Si je `rendement ()` sur ce tableau, je vais voir mes valeurs de température:

![Graph showing peaks of actual CO2 and adjusted CO levels](/posts/category/database/images/Screen-Shot-2019-03-19-at-4.21.00-PM.png)

Je répète donc cela pour le CO2 et les valeurs de pression:

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

Génial! J'ai maintenant 3 tables avec toutes les valeurs que je dois faire mes calculs. Tout ce que je dois faire maintenant est de les tirer tous ensemble, et je vais le faire à travers une série de déclarations `` join ():

```js
first_join = join(tables: {CO2meas: CO2meas, Tmeas: Tmeas}, on: ["_time"])
    |> fill(column: "_value_CO2meas", usePrevious: true)
   |>fill(column: "_value_CO2meas", value: 400.00)
    |> fill(column: "_value_Tmeas",usePrevious: true)
   |>fill(column: "_value_Tmeas", value: 20.0)
```

Ce premier `join ()` me reçoit une table qui contient les valeurs de CO2 et de température, donc je suis en partie là.

```js
second_join = join(tables: {first_join: first_join, Pmeas: Pmeas}, on: ["_time"])
   |>fill(column: "_value", usePrevious: true)
   |>fill(column: "_value", value: 1013.25)
   |>map(fn: (r) => ({_time: r._time, _Pmeas: r._value, _CO2meas:r._value_CO2meas, _Tmeas:r._value_Tmeas}))
```

Cette deuxième `join ()` me reçoit une table avec toutes les valeurs mesurées en elle! Vous penseriez que je serais fait, mais pour faire le calcul final, puisque je rejoins sur `time`, je dois construire une table finale où je remplir les valeurs de référence pour chaque ligne de la table.

```js
final = second_join
   |>map(fn: (r) => ({Pmeas: r._Pmeas, CO2meas:r._CO2meas, Tmeas:r._Tmeas, Pref: Pref, Tref: Tref, _time: r._time,}))
    |> keep(columns: ["_time", "CO2meas", "Pmeas", "Tmeas", "Pref", "Tref"])
```

Alors maintenant, je peux créer une table finale et calculer la valeur de CO2 compensée, pour chaque ligne (temps).

```js
CO2corr = final
    |> map(fn: (r) => ({"_time": r._time, "CO2-Measured": r.CO2meas, "CO2-Adjusted": r.CO2meas * (((r.Tmeas + 273.15) * r.Pref) / (r.Pmeas * r.Tref))}))
   |> yield()
```

Puisque c'est ma table finale, j'appelle `rendement ()` à la fin afin que les valeurs vont s'affiche.

Et maintenant, j'ai un graphique qui montre la valeur de CO2 brute, mesurée et la valeur de CO2 compensée! Tout est fait sur la volée en utilisant les mathématiques cross-mesure de flux!

![Graph showing peaks of actual CO2 and adjusted CO levels](/posts/category/database/images/Screen-Shot-2019-03-18-at-3.56.28-PM.png)

Je suis en fait eu envie de faire cette compensation du capteur pendant un certain temps ** à long ** et je suis ravi que je peux maintenant le faire rapidement et facilement Flux! Alors, que ferez-vous avec les mathématiques cross-mesure dans Flux? Ne hésitez pas à me gazouiller vos idées, solutions, etc. [@davidgsIoT](https://twitter.com/davidgsIoT)!
