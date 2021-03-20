---
title: "Un QuestDB tablero de instrumentos con el Nodo-Rojo"
Date: 2020-06-09
Author: davidgs
Category: database, Gadgetry, IoT
Tags: Dashboard, Database, IoT, Node-Red, QuestDB
Slug: a-questdb-dashboard-with-node-red
hero: images/Screen-Shot-2020-06-09-at-7.39.13-AM.png
---

Esto es realmente una continuación de mi [mensaje](/posts/category/database/iot-on-questdb/) desde la semana pasada, donde he conectado un Arduino con una temperatura y sensor de humedad a QuestDB.

Es una cosa para enviar datos a su base de datos, pero ser capaz de visualizar esos datos es el siguiente paso lógico. Así que vamos a la derecha de buceo para hacer eso.

QuestDB es bastante nuevo, y por lo tanto no hemos completado nuestra Grafana datos de origen Plugin todavía, por lo que quería hacer un tablero de instrumentos rápida para mostrar los datos de temperatura / humedad entrantes (y verá cuán horrible es realmente el sensor). Para ello, he elegido el Nodo-Rojo porque, bueno, parece que la opción obvia!

## La construcción de los nodos:

![Captura de pantalla del Proceso NodeRed](/posts/category/database/images/Screen-Shot-2020-06-09-at-7.38.57-AM.png)

Como se puede ver, se utiliza sólo unos pocos nodos, por lo que voy a caminar a través de ellos uno por uno.

El nodo inicial es un nodo de inyector que se activa en un intervalo regular, configurable. Mina dispara cada 10 segundos justo para no ser demasiado ruidoso. Se dispara el nodo `SetQuery` que se basa la consulta:

```js
  var q = {}
  q["query"] = "select temp_c, humidity, timestamp from iot where timestamp > (systimestamp() - 5000000)"
  msg.payload = q
  return msg;
```

Me puse la carga útil a una consulta, en este caso, estoy recibiendo la temperatura y la humedad durante los últimos 5 segundos (recordemos, se trata de marcas de tiempo de microsegundos, por lo que es de 5 segundos microsegundos 5M). entonces enviar esa consulta, como la carga útil, a un nodo de petición HTTP que he llamado a consultas QuestDB. He puesto el anfitrión a ser mi máquina local, la dirección URL del punto final API de consulta, y añado el msg.payload entrante a la URL.

![Edición de parámetros HTTP de Nodo de Red](/posts/category/database/images/Screen-Shot-2020-06-09-at-7.51.26-AM.png "Screen Shot 2020-06-09 at 7.51.26 AM.png")

Devuelve la consulta aa cadena JSON, por lo que voy a tener que ejecutar a través de un nodo de JSON para convertirlo en un objeto JSON. entonces enviar el resultado de que JSON-análisis a 2 nodos adicionales, uno para temperatura y uno para la humedad. Después de que el JSON de análisis, consigo un regreso objeto que tiene varias cosas en ella quiero ir a través.

![Captura de pantalla del objeto JSON devuelto](/posts/category/database/images/Screen-Shot-2020-06-09-at-7.57.42-AM.png)

Lo primero a destacar es que la carga útil contiene un campo query` `que muestra la consulta ejecuté. ¡Fresco! A continuación, aparece un campo `columns` que es una matriz con una entrada para cada columna si los datos que estoy recibiendo de vuelta. Desde que consultan para obtener `temp_c`,` `humidity` y timestamp` que se puede esperar para este array 3 elementos en ella, y de hecho lo hace. También me dice que, en cada elemento, el nombre y el tipo de valor que ha vuelto, que es información útil.

Por último, existe una `dataset` campo que contiene una matriz de matrices con mis datos que había solicitado. Desde solicité 5 segundos de datos, y, si se acuerda de la [post anterior](/posts/category/database/iot-on-questdb/), estaba enviando los datos una vez por segundo, que regrese una matriz con 5 arrays en el mismo, uno para cada segundo. Con la ampliación de estas matrices, veo que he conseguido 2 dobles y una marca de tiempo en cada uno correspondiente a lo que el campo `columns` me dijo que iba a conseguir. ¡Lindo! Así que todo lo que queda es enviar esos datos a algunos elementos del tablero de instrumentos. Bueno, casi.

```js
  var f = {}
  f.topic = "Temperature ºC"
  f.payload = msg.payload.dataset[msg.payload.dataset.length-1][0]
  f.timestamp = msg.payload.dataset[msg.payload.dataset.length-1][2]
  return f
```

Para el nodo `set Temp`, saco el último elemento del conjunto de datos, y agarrar el valor de la temperatura y el valor de marca de tiempo. a continuación, le envío las relativas, como la carga útil, a los elementos del tablero de instrumentos reales. Hago exactamente lo mismo para el `set Humidity` Nodo. Arrastrando en los nodos del tablero de instrumentos, el Nodo-Red configura automáticamente un panel de control web con estos elementos, y puedo ir a ella y ver mi nuevo tablero de instrumentos:

![Captura de pantalla del tablero de instrumentos Nodo de Red](/posts/category/database/images/Screen-Shot-2020-06-09-at-7.39.13-AM.png)


Ahora que en realidad se puede visualizar los datos, se puede ver lo mal que los datos que realmente es! No hay manera de que es 2.3º C en mi oficina en este momento! Creo que mi próxima tarea es conseguir un sensor de temperatura y humedad ** ** verdadera configurar para enviar datos más precisos! Por suerte para mí, tengo unos pocos de los que se encuentran alrededor, por lo que tendrá que ser mi próximo proyecto supongo.

## Hemos terminado aqui

Como siempre, por favor visite nuestro [GitHub](https://github.com/questdb/questdb) y darnos una estrella si cree que ésto era útil! Puede) y darnos una estrella si cree que ésto era útil! Puede [sígame](https://twitter.com/intent/follow?screen_name=davidgsIoT) en Twitter, pero también siguen) en Twitter, pero también siguen [QuestDB](https://twitter.com/intent/follow?screen_name=questdb)!
