---
title: "Escribir a InfluxDB 2.0 de Arduino ESP8266"
Date: 2019-03-22
Author: davidgs
Category: IoT
Tags: Arduino, ESP8266, IoT, IoT Data
Slug: writing-to-influxdb-2-0-from-arduino-esp8266
hero: images/3686-10.jpg
---

Como InfluxData se mueve cada vez más cerca de la liberación v2.0, se está volviendo cada vez más importante para poder obtener datos ** ** en InfluxDBv2, por supuesto. Tiene sentido, ¿verdad? Dado que la gran mayoría (como, indistinguible del 100%) de mis datos proviene de dispositivos IO, decidí que era hora de empezar a hacer esos dispositivos InfluxDB v2-capaz.

Estoy feliz de decir que el primer paso en esa dirección se ha completado! Una de mis favoritas sensores es un sensor de materia particulada que mide la cantidad de partículas muy pequeñas ** ** en el aire (de 2.5μM a 100? M de diámetro). Esta materia, resulta que es realmente * * realmente malo para usted, por lo que conocer cuánto está en el aire es una buena idea. A tal fin, pedí uno de estos sensores de Adafriut:

![3686 10](/posts/category/database/images/3686-10.jpg )

Es pequeño y fácil de conectar a casi cualquier cosa, ya que solo arroja datos a cabo a través de UART. Ya que tengo una pila gigante de ESP8266 juntas por ahí (Me suelen pedirlos por docenas ya que son tan barato y fácil de tratar), me conecté a uno de ellos. El código era sencillo, gracias a Adafruit dotándolo, y había una biblioteca InfluxDB mango para datos de escritura con, pero sólo se admite InfluxDB v1.x. La primera cosa que hice (porque yo estaba en un apuro) era para agarrar la biblioteca 1.x y simplemente re-escritura para 2.x. Me tomó alrededor de media hora o menos, y funcionó muy bien! (Se puede utilizar esa versión [aquí](https://github.com/davidgs/ESP8266_Influx_DB_V2) si lo desea). Que en realidad no era el derecho * * Solución sin embargo. Por eso, hoy volví y creé un tenedor correcto del) si lo desea). Que en realidad no era el derecho * * Solución sin embargo. Por eso, hoy volví y creé un tenedor correcto del [repositorio el original](https://github.com/tobiasschuerg/ESP8266_Influx_DB), y actualizada para apoyar cualquiera de las versiones 1.x o la versión 2.x de InfluxDB. He supuesto presentado una solicitud de arrastre propiamente dicha con la librería y la esperanza original que será aceptado / fusionado pronto.

Vamos a caminar a través de lo que se necesita para utilizar esta nueva biblioteca a continuación. Es absolutamente simple, en realidad. Por lo menos con Arduino, todo lo que tiene que hacer es añadir la Biblioteca, a continuación, incluirlo en su dibujo:

```cpp
#include <InfluxDb.h>
//#include <InfluxDataV2.h> // if you want to use the other library I built and that’s in my GitHub 
#define INFLUXDB_HOST “myhost.com"
Influxdb influx(INFLUXDB_HOST);
```

Eso le ayudará a comenzar. A continuación vas a necesitar algo de información específica de su versión 2.0 InfluxDB (alfa todavía!) De la instalación. En particular, se necesita el `organization`,` bucket`, y `token` que están asociados con su cuenta. Usted puede encontrar estos apuntando desde su navegador web en su servidor InfluxDB, puerto 9999, introduciendo su nombre de usuario y contraseña, e ir a la página de configuración:

![Captura de pantalla 2019 03 22 a 1 26 56 PM](/posts/category/database/images/Screen-Shot-2019-03-22-at-1.26.56-PM.png)

A continuación, puede introducirlos en el Arduino Boceto:

```cpp
influx.setBucket(“myBucket");
influx.setVersion(2);
influx.setOrg(“myOrg");
influx.setPort(9999);
influx.setToken(“myToken");
```

Una vez que hayas hecho esto, en su `setup ()` función, puede empezar a escribir los datos en el servidor de Afluencia v2.0!

```cpp
void loop() {
  loopCount++;
  InfluxData row("temperature");
  row.addTag("device", "alpha");
  row.addTag("sensor", "one");
  row.addTag("mode", "pwm");
  row.addValue("loopCount", loopCount);
  row.addValue("value", random(10, 40));
  influx.write(row);
  delay(5000);
}
```

¿Ver? ¡Te dije que era fácil!
