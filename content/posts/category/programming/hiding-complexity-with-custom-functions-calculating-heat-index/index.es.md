---
title: "Cómo ocultar la complejidad de las funciones personalizadas Cálculo de Índice de calor"
Date: 2019-08-23
Author: davidgs
Category: Databases, InfluxDB
Slug: hiding-complexity-with-custom-functions-calculating-heat-index
hero: images/HeatIndex.png
---

¿Alguna vez ha visto el clima local - o el canal del tiempo - y oído les anuncian la temperatura, y luego el "índice de calor"? O el calor que se siente fuera ** **? Por lo menos aquí en los Estados Unidos, y especialmente en el sur, que es parte de cada emisión tiempo en el verano. Pero alguna vez se preguntó cómo en realidad * * Calcular el índice de calor? Desde que recopilar datos de temperatura y humedad, decidí un día me gustaría ir y averiguarlo. Después de todo, lo difícil que podría ser realmente? Un consejo: Nunca hágase esta pregunta!

## El cálculo Índice de calor

Tan pronto como fui en busca de lo que estaba seguro era un simple cálculo para convertir una temperatura y una lectura de humedad en un índice de calor (HI) que lo sentía que había dirigí por este camino. He encontrado fácilmente una página donde la Administración Oceánica y Atmosférica Nacional (NOAA) establece la fórmula. Es algo que se llama la ecuación de regresión Rothfusz, y dice así:

** HI = -42,379 + 2,04901523 * T + 10.14333127 * RH - 0,22475541 * T * RH - 0,00683783 * T * T - 0,05481717 * RH * RH + 0,00122874 * T * T * RH + 0,00085282 * T * * RH RH - .00000199 * T * T * * RH RH **

Donde ** T ** es la temperatura y ** RH ** está humedad relativa. Simple, ¿verdad? ¡No tan rapido! Resulta que hay un montón de advertencias a la (simple) ecuación. Por ejemplo, si la humedad relativa es menor que 13% y la temperatura está entre 80 ° F y 112ºF, entonces se tiene que ajustar el índice de calor restando el siguiente ajuste ** ** de ella:

** AJUSTE = [(13-RH) / 4] * SQRT {[17-ABS (T-95.)] / 17} **

Está bien. ¡Pero espera hay mas! Si la humedad relativa es superior al 85%, y la temperatura es de entre 80ºF y 112ºF, entonces es necesario agregar ** ** el siguiente ajuste ** ** a la misma:

** AJUSTE = [(RH-85) / 10] / [(87-T) / 5] **

¡Sobresaliente! Finalmente estamos allí ... espera, no no estamos allí todavía. Si el índice de calor es inferior a 80 ° F, entonces no es necesario utilizar este cálculo para determinar el índice de calor. Puede utilizar una ecuación más sencilla Steadman:

** HI = 0,5 / {T + 61,0 + [(T-68,0) * 1,2] + (RH * 0094)} **

Así que primero se calcula el índice de calor usando esa ecuación 'simple' - y, según la NOAA, se promedia que con la lectura de la temperatura. Si es menor de 80 ° F, que tiene su respuesta. Si no es así, es necesario proceder a la regresión Rothfusz y añadir (o restar) los ajustes, si es necesario.

¿Ver? Sencillo, en realidad.

## Hacerlo en Flux

Aquí es donde algunos complicado flujo entra en juego. Ya ves, mis lecturas de temperatura y humedad están en diferentes medidas, por lo que primero está la tarea de la construcción de las tablas, y uniéndose a ellos (yay por la belleza de las matemáticas cruzada medición de flujo!).

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

Eso me lleva mi 2 tablas de valores. (Nota al pie: I dió la tabla de temperatura de modo que mi gráfico mostrará tanto la temperatura como el índice de calor en el mismo gráfico.)

A continuación, me uno a las 2 tablas:

```js
first_join = join(tables: {temperature: temperature, humidity: humidity}, on: ["_time"])
  |>map(fn: (r) => ({temperature: r._value_temperature, humidity:r._value_humidity, _time: r._time}))
  |> keep(columns: ["_time", "humidity", "temperature"])
```

Así que ahora tengo una sola tabla, alineados en el tiempo, con columnas para `` temperature` y humidity`. Todo lo que queda es hacer el cálculo:

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

Te dije que era complicado Flux!

Pero al final, a continuación, puede tener un gráfico que muestra la temperatura actual y el índice de calor calculado de la misma celda de la tabla:

![Índice de calor](/posts/category/programming/images/HeatIndex.png)And that's a pretty cool thing!

## Próximo paso

Dado que una gran cantidad de flujo complicado. El siguiente paso es que todos tirón en funciones Flux, para que pueda llamar simplemente `|> temperatura de bochorno ()` en su mesa con `` temperature` y columnas humidity` y volver a la mesa adecuada con los índices de calor que resulta de todo calculado para usted. Así que estoy en el proceso de añadir la función `temperatura de bochorno ()` a Flux lo que puede tener bastante Flux al calcular sus índices de calor.

Estoy planeando añadir en el cálculo de la Ley de los gases ideales (nada fácil) y Wind Chill también (otra fea!) A este paquete de futuro, así como convertidores de ºF a ºC, por lo que si usted tiene alguna otra idea para cosas en que se usan para los cálculos del medio ambiente, por favor [alcanzan a cabo](https://twitter.com/intent/follow?screen_name=davidgsIoT) y quiero saber!
