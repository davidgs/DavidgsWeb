---
title: "Uso de la Cruz-Medición de matemáticas en InfluxDB Flux"
Date: 2019-03-22
Author: davidgs
Category: IoT
Slug: using-cross-measurement-math-in-influxdb-flux
hero: images/Screen-Shot-2019-03-18-at-3.56.28-PM.png
---

He pasado mucho tiempo últimamente con las 2.0 versiones alfa y estoy aquí para decirle: algunas de las cosas nuevas que viene son muy, muy cool! Especialmente para la IO. El que he estado usando últimamente ha sido la capacidad de hacer operaciones matemáticas a través de mediciones, que es realmente un cambio de juego para los datos de la IO en InfluxDB.

Echemos un vistazo a por qué aquí por un minuto. Como probablemente ya saben, he estado construyendo un montón de sensores IO que los datos de la muestra a diversas instancias de InfluxDB. Uno de los principales sensores que uso es un sensor de CO2 SenseAir K-30. Es un sensor extraordinariamente precisa, aunque no es barato. He estado usando durante un año o así y es extremadamente fiable y precisa, pero me preguntaba acerca de cómo la temperatura y la presión pueden afectar a las lecturas de CO2. Lo que encontré fue, por supuesto, estas cosas, de hecho, son importantes.

He leído en él [aquí](https://www.bapihvac.com/application-note/effects-of-temperature-and-barometric-pressure-on-co2-sensors-application-note/), pero esencialmente la temperatura y presión atmosféricas afectan la cantidad de gas dentro de la cámara de medición, no la concentración, lo que uno debe compensar por ello. Es un cálculo bastante sencillo de hacer uso de algunos valores de referencia como el cero absoluto y la presión a nivel del mar.

Vamos a utilizar la fórmula [Ley de los Gases Ideales](https://en.wikipedia.org/wiki/Ideal_gas_law):

```
ppm CO2 corrected = ppm CO2 measured * ((Temp measured * Pressure Reference ) / (Pressure measured * Temp Reference))
```

Genial. ¡Fácil! Casi. Tengo un sensor de temperatura / presión que almacena valores en una medición 'medio ambiente' en mi ejemplo InfluxDB. Mi sensor de CO2 almacena sus lecturas en una medición “k30_reader”. Si usted no está usando Flux, ya ver el problema aquí: Estos valores viven en diferentes medidas, por lo que o bien no puedo hacer este cálculo o tengo que hacer una buena cantidad de gimnasia de alguna manera volver a escribir todos estos valores en un campo común la medición primero. Tampoco es una respuesta realmente viable, ¿verdad?

Introduzca flujo y cruzada de medición de matemáticas! Así que vamos a caminar a través de la forma en que he logrado esto en Flux (con una tonelada * * de la ayuda de otros DevRel Anais, entre otros). Un pequeño repaso sobre cómo Flux devuelve valores en primer lugar. Recordemos que cuando envío una consulta en Flux, que regrese una tabla de valores. Esto es importante a medida que caminamos a través de cómo se construye la consulta Flux, así que tenlo en cuenta.

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

En primer lugar he definido mis valores de temperatura y presión de referencia. La temperatura de referencia es generalmente de 25ºC, convertido a Kelvin, y la presión de referencia es el nivel del mar. Entonces consulta valores de los valores de temperatura medidos y almacenarlo en una tabla llamada 'Tmeas'. Si `Rendimiento ()` en esta mesa, voy a ver mis valores de temperatura:

![](/posts/category/database/images/Screen-Shot-2019-03-19-at-4.21.00-PM.png)

a continuación, repito esto para los valores de CO2 y de presión:

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

¡Genial! Ahora tengo 3 mesas con todos los valores que tengo que hacer mis cálculos. Todo lo que tengo que hacer ahora es tirar de ellos todos juntos, y voy a hacer que a través de una serie de `join ()` afirmaciones:

```js
first_join = join(tables: {CO2meas: CO2meas, Tmeas: Tmeas}, on: ["_time"])
    |> fill(column: "_value_CO2meas", usePrevious: true)
   |>fill(column: "_value_CO2meas", value: 400.00)
    |> fill(column: "_value_Tmeas",usePrevious: true)
   |>fill(column: "_value_Tmeas", value: 20.0)
```

Este primer `join ()` me pone una tabla que contiene los valores de CO2 y temperatura, por lo que soy parte del camino.

```js
second_join = join(tables: {first_join: first_join, Pmeas: Pmeas}, on: ["_time"])
   |>fill(column: "_value", usePrevious: true)
   |>fill(column: "_value", value: 1013.25)
   |>map(fn: (r) => ({_time: r._time, _Pmeas: r._value, _CO2meas:r._value_CO2meas, _Tmeas:r._value_Tmeas}))
```

Este segundo `join ()` me pone una tabla con todos los valores medidos en él! Uno pensaría que estaría hecho, pero con el fin de hacer el cálculo final, ya que me estoy uniendo el `tiempo`, tengo que construir una mesa final en la que rellenar los valores de referencia para cada fila de la tabla.

```js
final = second_join
   |>map(fn: (r) => ({Pmeas: r._Pmeas, CO2meas:r._CO2meas, Tmeas:r._Tmeas, Pref: Pref, Tref: Tref, _time: r._time,}))
    |> keep(columns: ["_time", "CO2meas", "Pmeas", "Tmeas", "Pref", "Tref"])
```

Así que ahora puedo crear una tabla final y calcular el valor de CO2 compensada, para cada fila (tiempo).

```js
CO2corr = final
    |> map(fn: (r) => ({"_time": r._time, "CO2-Measured": r.CO2meas, "CO2-Adjusted": r.CO2meas * (((r.Tmeas + 273.15) * r.Pref) / (r.Pmeas * r.Tref))}))
   |> yield()
```

Dado que este es mi mesa final, llamo `rendimiento ()` al final por lo que hará que se muestra los valores.

Y ahora tengo un gráfico que muestra el valor de CO2 medida en bruto y el valor de CO2 compensado! Todo hecho en la marcha usando matemáticas cruzada de medición de flujo!

![](/posts/category/database/images/Screen-Shot-2019-03-18-at-3.56.28-PM.png)

De hecho, he estado queriendo hacer esta compensación del sensor por un tiempo largo ** ** y estoy muy contento de que ahora puedo hacerlo rápida y fácilmente usando Flux! Entonces, ¿qué vas a hacer con las matemáticas cruzada de medición de flujo? No dude en pia sus ideas, soluciones, etc. [@davidgsIoT](https://twitter.com/davidgsIoT)!
