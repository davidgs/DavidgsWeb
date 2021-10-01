---
title: "Un panel de QuestDB con Node-Red"
Date: 2020-06-09
Author: davidgs
Category: database, Gadgetry, IoT
Tags: Dashboard, Database, IoT, Node-Red, QuestDB
Slug: a-questdb-dashboard-with-node-red
hero: images/Screen-Shot-2020-06-09-at-7.39.13-AM.png
reading_time: 4 minutes
---

Esta es realmente una continuación de mi [publicación] (/ publicaciones / categoría / base de datos / iot-on-questdb /) de la semana pasada donde conecté un Arduino con un sensor de temperatura y humedad a QuestDB.

Una cosa es enviar datos a su base de datos, pero poder visualizar esos datos es el siguiente paso lógico. Así que vamos a sumergirnos de lleno en hacer eso.

QuestDB es bastante nuevo y, por lo tanto, aún no hemos completado nuestro complemento de fuente de datos de Grafana, por lo que quería hacer un panel rápido para mostrar los datos de temperatura / humedad entrantes (y verá cuán horrible es realmente el sensor). Para hacer esto, elegí Node-Red porque, bueno, ¡parece la opción obvia!

## Construyendo los nodos:

![Captura de pantalla del proceso NodeRed](/posts/category/database/images/Screen-Shot-2020-06-09-at-7.38.57-AM.png)

Como puede ver, usa solo unos pocos nodos, así que los revisaré uno por uno.

El nodo inicial es un nodo inyector que se dispara a intervalos regulares configurables. El mío se dispara cada 10 segundos solo para evitar ser demasiado ruidoso. Activa el nodo `SetQuery` que construye la consulta:

```js
  var q = {}
  q["query"] = "select temp_c, humidity, timestamp from iot where timestamp > (systimestamp() - 5000000)"
  msg.payload = q
  return msg;
```

Configuré la carga útil para una consulta, en este caso, obtengo la temperatura y la humedad de los últimos 5 segundos (recuerde, estamos tratando con marcas de tiempo de microsegundos, por lo que 5 segundos son 5M microsegundos). Luego envío esa consulta, como carga útil, a un nodo de solicitud http que he llamado Query QuestDB. Configuré el host para que sea mi máquina local, la URL al punto final de la API de consulta y agrego el mensaje entrante msg.payload a la URL.

![Editando parámetros HTTP de Node Red](/posts/category/database/images/Screen-Shot-2020-06-09-at-7.51.26-AM.png "Screen Shot 2020-06-09 at 7.51.26 AM.png")

La consulta devuelve una cadena JSON, por lo que tendré que ejecutarla a través de un nodo JSON para convertirla en un objeto JSON. Luego envío el resultado de ese análisis JSON a 2 nodos adicionales, uno para temperatura y otro para humedad. Después del análisis de JSON, obtengo un objeto que tiene varias cosas por las que quiero pasar.

![Captura de pantalla del objeto JSON devuelto](/posts/category/database/images/Screen-Shot-2020-06-09-at-7.57.42-AM.png)

Lo primero a tener en cuenta es que la carga útil contiene un campo de "consulta" que muestra la consulta que ejecuté. ¡Fresco! A continuación, obtengo un campo de `columnas` que es una matriz con una entrada para cada columna si los datos que estoy recuperando. Dado que solicité `temp_c`,` humedad` y `marca de tiempo`, esperaría que esta matriz tenga 3 elementos, y de hecho los tiene. También me dice, en cada elemento, el nombre y el tipo de valor que ha devuelto, lo cual es información útil.

Finalmente, hay un campo de `conjunto de datos` que contiene una matriz de matrices con mis datos que solicité. Como solicité 5 segundos de datos y, si recuerdas la [publicación anterior](/posts/category/database/iot-on-questdb/), estaba enviando datos una vez por segundo, obtengo una matriz con 5 matrices en él, una por cada segundo. Al expandir estas matrices, veo que obtuve 2 dobles y una marca de tiempo en cada uno correspondiente a lo que el campo `columnas` me dijo que obtendría. ¡Lindo! Entonces, todo lo que queda es enviar esos datos a algunos elementos del tablero. Bueno, casi.

```js
  var f = {}
  f.topic = "Temperature ºC"
  f.payload = msg.payload.dataset[msg.payload.dataset.length-1][0]
  f.timestamp = msg.payload.dataset[msg.payload.dataset.length-1][2]
  return f
```

Para el nodo `Set Temp`, saco el último elemento del conjunto de datos y tomo el valor de temperatura y el valor de la marca de tiempo. Luego los envío, como carga útil, a los elementos reales del Tablero. Hago exactamente lo mismo para el nodo "Establecer humedad". Al arrastrar los nodos del tablero, Node-Red configura automáticamente un tablero web con estos elementos, y puedo ir a él y ver mi nuevo tablero:

![Captura de pantalla del panel de Node Red](/posts/category/database/images/Screen-Shot-2020-06-09-at-7.39.13-AM.png)


Ahora que realmente puede visualizar los datos, ¡puede ver cuán horribles son realmente! ¡No hay forma de que estén 2.3º C en mi oficina ahora mismo! ¡Supongo que mi próxima tarea es configurar un sensor de temperatura y humedad **real** para enviar datos más precisos! Por suerte para mí, tengo algunos de esos por ahí, así que supongo que tendrá que ser mi próximo proyecto.

## Hemos terminado aqui

Como siempre, visita nuestro [GitHub](https://github.com/questdb/questdb) y danos una estrella si crees que esto fue útil. ¡Puedes [seguirme] (https://twitter.com/intent/follow?screen_name=davidgsIoT) en Twitter, pero también seguir a [QuestDB] (https://twitter.com/intent/follow?screen_name=questdb)!
