---
title: "Es hora de impresionante con InfluxDB"
Date: 2017-12-01
Author: davidgs
Category: Evangelism, General, Work
Slug: time-to-awesome-influxdb
hero: images/A-platform-for-Builders.png
---

[InfluxData](https://influxdata.com/) tiene una cosa sobre la hora de impresionante ™. Tanto es así, que lo registró como marca. No, en serio, lo hicieron. Y lo dicen en serio. Así que vamos a ir de cero a impresionante!

> Estamos enfocados singularmente en la reducción del tiempo de impresionante ™, que realmente se preocupan por ayudar a los desarrolladores y las empresas llegar a resultados más rápido con menos complejidad y menos código.

Eso es directamente desde la sección [** Sobre **](https://www.influxdata.com/about/) de su sitio web y lo que realmente quieren decir es! Pero por si acaso, decidí probarlo hacia fuera (de nuevo). De hecho, me escribió una) de su sitio web y lo que realmente quieren decir es! Pero por si acaso, decidí probarlo hacia fuera (de nuevo). De hecho, me escribió una [toda entrada en el blog](/posts/category/iot/iot-hardware/running-influxdb-on-an-artik-520/) acerca de lo fácil que era para establecer InfluxDB hace un tiempo, pero pensé yo lo haría de nuevo, sólo por diversión. Esta vez, pensé que me gustaría proporcionar una prueba de lo fácil que es, y qué tan rápido!

## La puesta en marcha

Tengo mi fiel MacBook Pro en la que hago casi todo, así que eso es lo que voy a instalarlo en. Esto es lo que estoy trabajando con:

![MarsEditScreenSnapz001](/posts/category/database/images/MarsEditScreenSnapz001.png )

He instalado y configurado InfluxDB, Chronograf, Telegraf y Kapacitor, y establecer una rápida tablero de supervisión del sistema para realizar un seguimiento de las estadísticas de algunos sistemas, todo ello en menos de 5 minutos.

## Aquí está la prueba

{{< youtube DsVRTI2IgMo >}}

## Así es como yo lo hice

```shell
Davids-MacBook-Pro:~ davidgs$ brew install influxdb 
  ==> Downloading https://homebrew.bintray.com/bottles/influxdb-1.3.6.high_sierra.bottle.tar.gz
    Already downloaded: /Users/davidgs/Library/Caches/Homebrew/influxdb-1.3.6.high_sierra.bottle.tar.gz 
  ==> Pouring influxdb-1.3.6.high_sierra.bottle.tar.gz
  ==> Caveats To have launchd start influxdb now and restart at login: brew services start influxdb Or, if you don't want/need a background service you can just run: influxd -config /usr/local/etc/influxdb.conf 
  ==> Summary 🍺 /usr/local/Cellar/influxdb/1.3.6: 9 files, 56.4MB
Davids-MacBook-Pro:~ davidgs$ brew install telegraf 
  ==> Downloading https://homebrew.bintray.com/bottles/telegraf-1.4.2.high_sierra.bottle.tar.gz
    Already downloaded: /Users/davidgs/Library/Caches/Homebrew/telegraf-1.4.2.high_sierra.bottle.tar.gz
  ==> Pouring telegraf-1.4.2.high_sierra.bottle.tar.gz
  ==> Caveats To have launchd start telegraf now and restart at login: brew services start telegraf Or, if you don't want/need a background service you can just run: telegraf -config /usr/local/etc/telegraf.conf
  ==> Summary 🍺 /usr/local/Cellar/telegraf/1.4.2: 8 files, 43.2MB
Davids-MacBook-Pro:~ davidgs$ brew install chronograf
  ==> [Installing dependencies for chronograf:**kapacitor** 
  ==> Installing chronograf dependency: **kapacitor** 
  ==> Downloading https://homebrew.bintray.com/bottles/kapacitor-1.3.3.high_sierra.bottle.1.tar.gz
    Already downloaded: /Users/davidgs/Library/Caches/Homebrew/kapacitor-1.3.3.high_sierra.bottle.1.tar.gz
  ==> Pouring kapacitor-1.3.3.high_sierra.bottle.1.tar.gz
  ==> Caveats To have launchd start kapacitor now and restart at login: brew services start kapacitor Or, if you don't want/need a background service you can just run: kapacitord -config /usr/local/etc/kapacitor.conf
  ==> Summary  🍺 /usr/local/Cellar/kapacitor/1.3.3: 6 files, 79.0MB
  ==> Installing **chronograf** 
  ==> Downloading https://homebrew.bintray.com/bottles/chronograf-1.3.9.0.high_sierra.bottle.tar.gz
    Already downloaded: /Users/davidgs/Library/Caches/Homebrew/chronograf-1.3.9.0.high_sierra.bottle.tar.gz
  ==> Pouring chronograf-1.3.9.0.high_sierra.bottle.tar.gz
  ==> Caveats To have launchd start chronograf now and restart at login: brew services start chronograf Or, if you don't want/need a background service you can just run: chronograf
  ==> Summary 🍺 /usr/local/Cellar/chronograf/1.3.9.0: 4 files, 21

Davids-MacBook-Pro:~ davidgs$ brew services start influxdb 
  ==> Successfully started `influxdb` (label: homebrew.mxcl.influxdb)
Davids-MacBook-Pro:~ davidgs$ brew services start telegraf
  ==> Successfully started `telegraf` (label: homebrew.mxcl.telegraf)
Davids-MacBook-Pro:~ davidgs$ brew services start kapacitor
  ==> Successfully started `kapacitor` (label: homebrew.mxcl.kapacitor
Davids-MacBook-Pro:~ davidgs$ brew services start chronograf
  ==> Successfully started `chronograf` (label: homebrew.mxcl.chronograf)
Davids-MacBook-Pro:~ davidgs$
```

¡Eso es! Un total de 7 comandos. 3 para instalar toda la pila TICK - porque Chronograf tiene una dependencia en Kapacitor, por lo que se instala de forma automática - y 4 para iniciar todos los servicios y asegurarse de que comienzan en los reinicios.

Simplemente no hay nada más sencillo que eso! Con el pequeño número de clics para construir el tablero de instrumentos y que tiene un tiempo sorprendentemente corto de impresionante ™!
