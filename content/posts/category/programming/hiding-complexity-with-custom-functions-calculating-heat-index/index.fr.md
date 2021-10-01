---
title: « La complexité avec Hiding fonctions personnalisées Calcul indice de chaleur »
Date: 2019-08-23
Author: davidgs
Category: Databases, InfluxDB
Slug: hiding-complexity-with-custom-functions-calculating-heat-index
hero: images/HeatIndex.png
reading_time: 6 minutes
---

Avez-vous déjà regardé la météo locale - ou The Weather Channel - et entendu les annoncer la température, puis l ' « indice de chaleur »? Ou comment chaud, il se sent ** ** à l'extérieur? Au moins ici, aux États-Unis, et en particulier dans le Sud, il fait partie de chaque émission météo en été. Mais avez-vous déjà demandé comment ils réellement * * calculer l'indice de chaleur? Depuis que je collectionne les données de température et d'humidité, je décidais un jour, j'irais comprendre. Après tout, à quel point pourrait-il vraiment? Astuce: ne posez-vous cette question!

## Le calcul de l'indice de chaleur

Dès que je suis allé chercher ce que je vous ai un calcul simple de convertir une température et une lecture d'humidité dans un indice de chaleur (HI) Je suis désolé, j'avais dirigeais sur cette route. Je trouve facilement une page où l'Administration océanique et atmosphérique nationale (NOAA) établit la formule. Il est ce qu'on appelle l'équation de régression Rothfusz, et il va comme ceci:

** HI = -42,379 + 2,04901523 * T + 10,14333127 * RH - 0,22475541 * T * RH - 0,00683783 * T * T - 0,05481717 * RH * RH + 0,00122874 * T * T * RH + 0,00085282 * T * RH * RH - .00000199 * T * T * RH * RH **

Où ** T ** est la température et d'humidité relative ** ** est l'humidité relative. Simple, non? Pas si vite! Il se trouve qu'il ya un tas de mises en garde à cette équation (de simples). Par exemple, si l'humidité relative est inférieure à 13% et la température est comprise entre 80 ° F et 112ºF, alors vous devez ajuster l'indice de chaleur en soustrayant le réglage ** suivant ** de celui-ci:

** REGLAGE = [(13-D) / 4] * sqrt {[17-ABS (T-95.)] / 17} **

OK bien. Mais attendez, il y a plus! Si l'humidité relative est supérieure à 85%, et la température est comprise entre 80 ° F et 112ºF, alors vous devez ajouter ** ** ** Le réglage suivant ** à elle:

** REGLAGE = [(HR-85) / 10] / [(87-T) / 5] **

Exceptionnel! Nous sommes enfin là ... attendre, ne nous sommes pas encore là. Si l'indice de chaleur est inférieure à 80 ° F, vous n'avez pas besoin d'utiliser ce calcul pour déterminer l'indice de chaleur. Vous pouvez utiliser une équation Steadman plus simple:

** HI = 0,5 / {T + 61,0 + [(T-68,0) * 1,2] + (RH * 0094)} **

Alors d'abord calculer l'indice de chaleur en utilisant cette équation de « simple » - et, selon la NOAA, vous en moyenne que la lecture de la température. Si tel est inférieur à 80 ° F, vous avez votre réponse. Sinon, vous devez procéder à la régression Rothfusz et ajouter (ou soustraire) les ajustements, le cas échéant.

Voir? Simple, vraiment.

## Le faire en flux

Voici où un certain flux compliqué entre en jeu. Vous voyez, mes lectures de température et d'humidité sont des mesures différentes, donc d'abord il y a la tâche de construire les tables, et en les joignant (yay pour la beauté des mathématiques croisées mesure en flux!).

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

Qui me fait mes 2 tables de valeurs. (Note côté: Je cède la table de la température pour que mon graphique indique à la fois la température et l'indice de chaleur sur le même graphique.)

Ensuite, je me joins à 2 tables:

```js
first_join = join(tables: {temperature: temperature, humidity: humidity}, on: ["_time"])
  |>map(fn: (r) => ({temperature: r._value_temperature, humidity:r._value_humidity, _time: r._time}))
  |> keep(columns: ["_time", "humidity", "temperature"])
```

Alors maintenant, j'ai une seule table, aligné sur le temps, avec des colonnes pour `` temperature` et humidity`. Tout ce qui reste est de faire le calcul:

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

Je vous ai dit qu'il était compliqué Flux!

Mais à la fin, vous pouvez avoir un graphique qui montre la température réelle et l'indice de chaleur calculée dans la même cellule de table:

![Indice de chaleur](/posts/category/programming/images/HeatIndex.png)And that's a pretty cool thing!

## L'étape suivante

Puisque c'est beaucoup de flux compliqué. L'étape suivante consiste à tirer que toutes les fonctions dans Flux de sorte que vous pouvez simplement appeler `|> indice de chaleur ()` sur votre table avec `et` temperature` colonnes humidity` et retourner la bonne table avec les indices de chaleur résultant calculé pour tous tu. Donc, je suis en train d'ajouter la fonction `indice de chaleur ()` pour Flux de sorte que vous pouvez avoir assez de flux lorsque vous calculez vos index de chaleur.

Je prévois d'ajouter dans le calcul Idéal loi sur le gaz (un facile) et de refroidissement du vent et (un autre laid!) À ce paquet futur ainsi que des convertisseurs de ºF à ºC, donc si vous avez d'autres idées pour choses que vous utiliserez pour le calcul de l'environnement, s'il vous plaît [tendre la main](https://twitter.com/intent/follow?screen_name=davidgsIoT) et laissez-moi savoir!
