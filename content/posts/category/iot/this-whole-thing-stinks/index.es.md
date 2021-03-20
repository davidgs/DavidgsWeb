---
title: "Esta cosa entera apesta!"
Date: 2020-03-11
Author: davidgs
Category: Gadgetry, IoT
Tags: InfluxData, InfluxDB, IoT, Poop Detector
Slug: this-whole-thing-stinks
hero: images/singing-poop-emoji-sm.png
---

## En primer lugar, no pregunta

No tengo ni idea de donde esta idea viene, que acaba de pasar. Sigo diciendo "No estoy especialmente orgulloso de esta", pero en la realidad? En cierto modo me am porque es curioso como la mierda (nunca mejor dicho). Algunos proyectos llegaron a través de mi feed de Twitter que se incluye (I no cago) para imprimir un modelo 3-D de la 💩 emoji. Recuerdo que nada más sobre ese proyecto, pero será mejor que creo que fui directamente para ese archivo STL!

![Canto emoji caca](/posts/category/iot/images/singing-poop-emoji.jpg "singing-poop-emoji.jpg")

A continuación, se sentó enconada por unas semanas (si no se siente cómodo con un montón de chistes de mierda, rescatar ahora. Feria de advertencia.). Yo sabía que sería * * hacer algo con él, sólo que no sabía lo que * * que lo haría. Y entonces me di cuenta. Tenía un montón de sensores de gas por ahí (si esto te sorprende, realmente no me conoce en absoluto). ¡Y entonces me di cuenta! Un sensor baño hedor y el sistema de alerta !! Pero mi mierda no lo hace mal olor (cállate!) Así que donde desplegarlo? Eureka momento el número 2! la casa de nuestros mejores amigos, donde siempre se llevan a cabo todos los eventos, tiene lo que todos llamamos 'El baño más trabajador en Holly Springs'. Hay regularmente 20 personas de allí para la cena, o algún otro evento, y que poco espacio en polvo se lleva la peor parte de todo esto.

## Introduzca el detector del hedor

Lo primero era 3-D imprimir la pequeña mierda. Para asegurarse de que pudiera adaptarse a los LEDs apropiados en él para hacer que se ilumine el camino que quiero que haga. Y no, no se puede hacer nada hasta la luz de color marrón. Si usted es realmente * * interesado en por qué no se puede hacer de color marrón claro, se puede ir a ver [el vídeo](https://youtu.be/wh4aWZRtTwU), pero el tipo es la forma más rara de lo que soy. Una vez más, una advertencia razonable. Así que de todos modos, lo imprimí, y he aquí, el controlador LED que quería utilizar en forma (casi) perfectamente! Tenía que cortar un par de curvas fuera de la PCB, pero ningún daño estaba hecho, y me dieron un emoji caca de luz-up!

![Un impulso del Emoji se iluminó de color naranja](/posts/category/iot/images/IMG_0087.jpeg)

También he escalado a 150% y estoy considerando la impresión de esa manera sólo porque, bueno, ya sabes, mierda mierda más grande es mejor! Así que, ¿cómo me enciendo esta mierda? En realidad, muy simple. Compro estas placas Wemos D1 Mini a granel (como 20 a la vez, ya que son cada uno de solamente $ 2,00 - más caros si se compran en Amazon, pero si usted los compra de Ali expreso en China, que puede ser tan barato $ 1.50 cada uno) y compro escudos LED de tres colores a juego para ir con ellos. Mis amigos [Andy Stanford-Clark](https://twitter.com/andysc) me inició en estas cosas con sus 'Glow orbes" Si quieres leer más sobre los detalles de Glow orbes,) me inició en estas cosas con sus 'Glow orbes" Si quieres leer más sobre los detalles de Glow orbes, [el Dr. Lucy Rogers](https://twitter.com/DrLucyRogers) escribió toda una cosa acerca de ellos) escribió toda una cosa acerca de ellos [aquí](https://www.ibm.com/blogs/internet-of-things/creating-home-glow-orb/). Giros que ella construyó un Pedo-O-Meter y utilizó una GlowOrb también. no tenía ni idea hasta que Andy me dijo.

Para un tutorial de introducción en el Wemos D1, véase [este artículo](https://www.hackster.io/innovativetom/wemos-d1-mini-esp8266-getting-started-guide-with-arduino-727098). Conozco a un montón de gente redactar completos, detallados tutoriales, etc., para estas cosas, pero, francamente, yo soy demasiado perezoso así que en su mayoría sólo te digo lo que he hecho. Voy a dar los detalles morbosos donde importa.

Así que de todos modos, ya que hacer esta mierda todo el tiempo, tengo mi caca-luz de escuchar a un corredor de MQTT para los mensajes sobre qué color de la pantalla. Todavía estoy trabajando en los niveles detallados de color como calibro cosas. Voy a cubrir los detalles de cómo los mensajes son enviados y recibidos en un poco.

El detector de mal olor en sí también se está ejecutando en un Wemos D1 Mini con un sensor MQ-4 El metano que también supuestamente mide H2 y un sensor de SGP-30 Calidad del Aire que mide los compuestos orgánicos volátiles (COV) y una versión de mierda de CO2, que debe Nunca se puede confiar. He hecho un montón de trabajo con sensores de CO2, y estos sensores eCO2 no valen una mierda. En serio, no confiar en ellos. Estoy en espera de la entrega a un poco más, mejores sensores de gas como un sensor y otros MQ-136 Dióxido de azufre. Yo probablemente Implementaré a todos y luego inventar un algoritmo complicado pero completamente arbitrario para decidir lo que es oler mal. Manténgase en sintonía para eso.

## La construcción del sensor del hedor

Como ya he dicho, actualmente estoy usando un Wemos D1 Mini con un [MQ-4 sensor de metano](https://www.sparkfun.com/products/9404) y un) y un [SGP-30](https://www.adafruit.com/product/3709) sensor de calidad de aire. Usted puede comprar su propia cuenta si va a construir esta cosa. Voy a actualizar esto con otros sensores como los agrego, tal vez. He aquí cómo el alambre todo para arriba:

![Esquema del circuito del sensor Wemos D1 y Gas](/posts/category/iot/images/Stinker.png)

Es importante señalar que el MQ-4 requiere 5V mientras que el PEC-30 necesita solamente 3,3 v. El MQ-4 es un sensor analógico recta, por lo que conectarlos a una de las entradas analógicas bien funciona. El PEC-30 es un sensor I2C, por lo que es SDA cable >-> D1 y SCL >-> D2, que son los pines I2C por defecto en la Wemos (que tengo que mirar hacia arriba cada vez). Cuando se aplica 5v a través del USB el MQ-4 se pone 5v recta y el PEC-30 obtiene 3,3 V a través del regulador de tensión a bordo. Ahora, ¿cómo se consigue realmente datos fuera de estos sensores? Bueno, eso es próxima, por supuesto!

## Lectura del hedor

El PEC-30 tiene una biblioteca para ello proporcionado por Adafruit (por supuesto) por lo que tendrá que añadir a su biblioteca de Arduino IDE y luego incluirlo en su proyecto.

```cpp
#include <Adafruit_SGP30.h>
#include<Wire.h>
```

A continuación, creará y el objeto SGP30 e inicializar en su rutina de instalación:

```cpp
Adafruit_SGP30 sgp;
```

Crea el objeto y, a continuación:

```cpp
if(! sgp.begin()){
  Serial.println("Sensor not found :(");
    while(1);
}
```

inicializa el sensor. Si no ha cableado correctamente el sensor, todo el asunto va a colgar, así que asegúrese de que usted ha atado con alambre para arriba correctamente!

La lectura de la VOC es bastante simple después de que:

```cpp
if(! sgp.IAQmeasure()) {
  Serial.println("Measurement failed")
  return;
}
Serial.print("TVOC ");
Serial.print(sgp.TVOC);
Serial.print(" 	");
Serial.print("Raw H2 ");
Serial.print(sgp.rawH2);
Serial.print(" 	");
Serial.print("Raw Ethanol ");
Serial.print(sgp.rawEthanol);
Serial.println("")
```

El objeto de SGP se devuelve con todas las lecturas en el mismo, así que es bastante fácil. El sensor MQ-4 es un poco más difícil. Es un sensor analógico, lo que significa que en realidad sólo devuelve una lectura de voltaje en bruto, que escala (un poco) con la concentración de gas. Por suerte para mí, alguien proporcionó una buena función para convertir el voltaje bruto en una ppm (partes por millón) de lectura para el metano, por lo que se requiere, así:

```cpp
int NG_ppm(double rawValue)
double ppm = 10.938*exp(1.7742*(rawValue*3.3/4095));
return ppm;
```

Sí, las matemáticas. No tengo idea de cómo funciona, pero parece, así que voy con él porque estoy mierda en matemáticas y tienen que confiar en alguien más inteligente que yo (que es la mayoría de la gente, la verdad). Así que ahora puedo leer el voltaje bruto en el pin analógico, y luego convertir eso a una lectura de ppm, que es lo que realmente queremos.

```cpp
int sensorValue = analogRead(A0); // read analog input pin 0]{style="color: #8e8e8e;"}
int ppm = NG_ppm(sensorValue);
```

¡Fresco! Así que, ahora que podemos leer los niveles de gases de cómo atamos todo esto junto?

## No utilice el Shitty base de datos!

Por supuesto que el trabajo de una empresa de base de datos, por lo que vamos a utilizar esa. En realidad, incluso si no lo hacía el trabajo de esta empresa determinada base de datos, yo todavía uso porque, para los datos de la IO como éste, que es realmente la mejor solución. Vamos a enviar todos nuestros datos para InfluxDB y luego podemos ver la forma de alertar a la popa brillando a cambiar de color. Así que, ¿cómo enviar datos a InfluxDB? Es súper simple. Utilizamos la biblioteca InfluxDB para Arduino, por supuesto!

```cpp
#include <InfluxDb.h>
#define INFLUXDB_HOST "yourhost.com"
#define INFLUX_TOKEN "yourLongTokenStringForInfluxDB2"
#define BATCH_SIZE] 10
Influxdb influx(INFLUXDB_HOST);
```

Un par de cosas a tener en cuenta aquí. Estoy usando InfluxDB 2.0, que es por eso que necesito el token. He definido un BATCH_SIZE porque la escritura de datos es mucho más eficiente si lo hacemos en lotes en lugar de individualmente. ¿Por qué? Bueno, bueno que lo preguntas! Cada escritura en la base de datos pasa a través del protocolo HTTP. Así que cuando se quiere hacer eso, usted tiene que configurar la conexión, escribir los datos, y luego derribar la conexión. Hacer esto cada segundo o así es caro, desde una perspectiva de energía y el procesador. Así que es mejor para ahorrar hasta un montón de puntos de datos, y luego hacer el ciclo de configuración-send-desmontaje una vez por todas de la misma.

Así que ahora tenemos un objeto Influxdb inicializado con la dirección del servidor correcto. En la función de configuración () tenemos que completar la configuración:

```cpp
influx.setBucket("myBucket"]);
influx.setVersion(2);
influx.setOrg("MyOrg");
influx.setPort(9999);
influx.setToken(INFLUX_TOKEN);
```

Eso es literalmente. todo lo que estoy configurar para empezar a escribir los datos a InfluxDB, así que vamos a ver cómo hacer lo siguiente:

```cpp
if(batchCount >= BATCH_SIZE) {
  influx.write();
  Serial.println("Wrote to InfluxDB");
  batchCount = 0;
}
InfluxData row("bathroom");
row.addTag("location ", "hsbath");
row.addTag("sensor1", "sgp30");
row.addTag("sensor2", "mq-4");
row.addValue("tvoc", sgp.TVOC);
row.addValue("raw_h2", sgp.rawH2);
row.addValue(["ethanol", sgp.rawEthanol);
row.addValue("methane", ppm);
influx.prepare(row);
batchCount +=1;
delay(500);
```

En la primera parte, puedo comprobar para ver si yo estoy hasta el límite de lote y si lo soy, escribo todo el lío a la base de datos, y se restablece el recuento. Después de eso, se crea una nueva fila de la base de datos y se añaden las etiquetas y los valores a la misma. Entonces me preparo '' la fila, que en realidad sólo añade a la cola para ser escrita con el siguiente lote. Aumentar el número de lote y sentarse en silencio durante 500 ms (½ segundo). A continuación, hacemos todo de nuevo.

Vamos a ir a la base de datos y ver si lo tengo todo de trabajo:

![Captura de pantalla del tablero de instrumentos una afluencia Chronograf](/posts/category/iot/images/Screen-Shot-2020-03-11-at-2.55.28-PM.png )

Yo diría que eso es un sí! Ahora que todo está ahí, es el momento de enviar actualizaciones a la popa brillando!

Por eso, vamos a crear una tarea en InfluxDB 2.0. Y voy a llamarlo 'caca' porque incluso no quiero una tarea llamada 'mierda' en mi interfaz de usuario.

![Chronograf Elemento del tablero de instrumentos](/posts/category/iot/images/Screen-Shot-2020-03-11-at-2.57.12-PM.png)

Y aquí está la tarea que he creado:

```js
import "experimental/mqtt"

option task = {name: "poop", every: 30s}

from( bucket:  "telegraf" )
  |> range(start: task.every)
  |> filter(fn: (r()=> (r._measurement == "bathroom")))
  |> filter(fn: (r()=>(r._field == "tvoc")))
  |> last()
  |> mqttto(broker: "tcp://yourmqttbroker.com:8883", topic: "poop", clientid: "poop-flux", valueColumns: ["_value"])
```

Ya que no hay mucho que hacer allí, voy a pasar por todo. En primer lugar, la MQTT empaquetar escribí todavía está en el paquete "experimental", por lo que tiene a la importación que a fin de usarlo. Si se mira más arriba en la imagen de los datos de explorador se puede ver que estoy almacenando todo en mi cubo "telegraf", y la medida "baño". En este momento, sólo estoy tecleando fuera de la lectura "TVOC". Una vez que me cambio, voy a actualizar esta tarea con la fórmula que utilizo. Sólo estoy agarrando la última lectura en los últimos 30 segundos. entonces debo llenar los detalles para el corredor MQTT estoy usando, y el tema que presenten a, y fuera de él va! Eso es todo por la tarea!

## Iluminación cagado encima!

Así como se recordará, ponemos un WEMOS D1 Mini con un LED en en la popa impresa tricolor. Ahora es el momento de luz que mierda! Ya que estamos escribir valores fuera a un corredor de MQTT, todo lo que realmente tenemos que hacer es conectar ese WEMOS al corredor MQTT, que, afortunadamente, es muy sencillo.

Se necesita un montón de cosas WiFi (también necesita esto en el código del sensor, por cierto):

```cpp
#include <ESP8266WiFi.h>
#include <DNSServer.h>
#include <ESP8266WebServer.h>
#include <WiFiManager.h>
#include <PubSubClient.h>
#include <Adafruit_NeoPixel.h>
#include <ESP8266mDNS.h>
#include <WiFiUdp.h>

#define LED_PIN D2  //D2
#define LED_COUNT 1
// update this with the Broker address ]{style="color: #8e8e8e;"}
#define BROKER "mybroker.com"
// update this with the Client ID in the format d:{org_id}:{device_type}:{device_id}]{style="color: #8e8e8e;"}
#define CLIENTID "poop-orb"
#define COMMAND_TOPIC "poop"

int status = WL_IDLE_STATUS; // the Wifi radio's status
WiFiClient espClient;
PubSubClient client(espClient);
```

Algunas de estas son cosas que también corresponden a las cosas en su InfluxDB de tareas, como la COMMAND_TOPIC, y el corredor. así que asegúrate de que tienes los correctos entre los dos. Eso es todo lo que tiene que haber definido (no estoy pasando por cómo conseguir la configuración Wi-Fi y configurado, ya que hay cientos de tutoriales en hacer que para Arduino y ESP8266 dispositivos.).

En su función de configuración () tendrá que configurar su objeto MQTT Cliente (PubSubClient) y suscribirse a su tema, así como configurar el LED. Yo uso la biblioteca Adafruit NeoPixel porque es muy fácil de usar.

```cpp
client.setServer(BROKER, 8883);
client.setCallback(callback);
client.subscribe(COMMAND_TOPIC);

Adafruit_NeoPixel] pixel = Adafruit_NeoPixel(1, 4); // one pixels, on pin 4
//pin 4 is "D2" on the WeMoS D1 mini]{style="color: #8e8e8e;"}
```

Su bucle principal es bastante corto para esto, como el PubSubClient maneja una gran cantidad de la oportunidad para usted:

```cpp
void loop() {
  if(!client.connected()) {
    reconnect();
  }
  // service the MQTT client]{style="color: #8e8e8e;"}
  client.loop();
}
```

Usted, por supuesto, necesita la rutina de devolución de llamada, y aquí es donde sucede la magia, por lo que vamos a ver ahora.

```cpp
void callback(char* topic, byte* payload, unsigned int length) {
  char content[10];
  String s = String((char *)payload);
  s.trim();
  Serial.print("Message arrived on ");
  Serial.print(COMMAND_TOPIC);
  Serial.print(": ");

  unsigned char buff[256] ;
  s.getBytes(buff, 256);
  buff[255 = '\0';
  s = s.substring(s.indexOf("=") + 1, s.lastIndexOf(" "));
  s.trim();
  int c = s.toInt();
  String col ="";
  if(c > 100.0) {
    col ="ff0000";
  } else if(c > 90.0) {
    col = "ff4000";]
  } else if(c > 80.0]){
    col = "ffbf00";
  } else if(c >70.0) {
    col = "bfff00";
  } else if(c > 60.0) {
    col = "40ff00";
  else if(c > 50.0) {
    col ="00ff40";
  } else if(c > 40.0) {
    col ="00ffbf";
  } else if(c > 10.0) {
    col = "00bfff";
  } else {
    col ="bf00ff";
  }

  long long number = strtoll(&col 0, NULL, 16);
  int r = number >> 16;
  int g = number >>8 & 0xFF;
  int b = number & 0xFF;
  uint32_t pCol = pixel.Color(r, g, b);
  colorWipe(pCol, 100);
}
```

Sí, es nuez. Sobre todo porque utilizo este mismo código en un montón de diferentes lugares. A veces quiero que el color hexadecimal, a veces quiero el color RGB, por lo que puede pasar cualquier cosa aquí. Parece mierda, pero funciona para mí. Todo esto hace es transmitir el mensaje desde el corredor de MQTT, y tire del valor numérico (por experiencia, sé que el mensaje MQTT se presenta en el siguiente formato:

```
bathroom _value=566 1583959496007304541
```

Así que sé que puede indexar en él para el signo `=` `y el (carácter de espacio)` y volver con el valor numérico. A partir de ahí, es sólo la escala del valor al color y encender el LED! Después de eso, la popa se ilumina cuando te cagas! Y los cambios de color dependiendo de cómo es apestoso. El valor de COV no es realmente una muy buena relación calidad (especialmente si usted tiende a utilizar algún tipo de caca-aerosol para ocultar su mala acción. La mayoría de ellos son nada más que los COV y que se alza los números, por lo que me' m la espera de los nuevos sensores para que pueda obtener una gran cantidad de valores de gas y ver cuál es el más indicativo de mal olor. O cuáles, con mayor precisión. Después de eso me ocurrirá con algún algoritmo para escalar adecuadamente el nivel hedor función de sus distintas los niveles de gas. Entonces se despliegan para los más duros Baño de trabajo en Holly Springs.

Y sí, son juego para que el mal olor-o-meter desplegado por allí.

## Obtenga su propia mierda

Por lo tanto, si usted quiere construir uno usted mismo ... primero que necesita para imprimir su propia mierda. Puede descargar el archivo STL [aquí](https://davidgs.com/poop.stl). Voy a ver si puedo limpiar todo este código y ponerlo en mi). Voy a ver si puedo limpiar todo este código y ponerlo en mi [GitHub](https://github.com/davidgs). No dude en). No dude en [sígame](https://twitter.com/intent/follow?screen_name=davidgsIoT) en Twitter y llegar con preguntas o comentarios!

Como una última palabra, por favor, por el amor de todo lo que es sagrado, lavarse las manos malditas. 60% de los hombres y el 40% de las mujeres no se lavan las manos después de ir al baño y que es repugnante. Y ahora que hace un vector de enfermedades. Así ** Wash. Tu. ¡Las manos!**
