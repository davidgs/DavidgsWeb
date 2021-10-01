---
Title: "Connecting The Things Network to InfluxDB"
Date: 2019-03-10
Category: IoT, TTN, The Things Network
Slug: connecting-the-things-network-to-influxdb
hero: images/Screen-Shot-2019-10-09-at-12.08.22-PM.png
reading_time: 13 minutes
---

Hay muchas maneras de conectar los sensores a la red en la IO. Para las conexiones de corto alcance, hay Bluetooth LE, o Zigbee, o 802.15.4, o Z-Wave. Para distancias más largas (aunque todavía bastante corto) siempre hay conexión Wi-Fi. Pero cuando es necesario largas distancias, a veces muy largas distancias, hay LoRaWAN. Es un conjunto de sub-gigahertz de las frecuencias que están disponibles para los pequeños bits de datos. Estos son por lo general sólo unos pocos bytes de datos, pero se pueden enviar a través de distancias mucho más largas - hasta 2 km o más en algunos casos! Son muy baja potencia, por lo que son ideales para aplicaciones de teledetección.

Con el fin de poner a prueba algunos de transmisión de datos LoRaWAN, y ver lo difícil que puede ser conseguir esos datos en InfluxDB, decidí mover una de mis sensores, un sensor de temperatura / humedad / presión, a la red Cosas (TTN), una basado en la comunidad proveedor de LoRaWAN. No estaba segura de lo difícil o fácil, esta transición podría ser, pero yo era capaz de terminarla en menos de un día! Así que aquí es cómo usted puede hacerlo también.

## El hardware

En primer lugar, usted tendrá que asegurarse de que, o bien tiene una puerta de enlace TTN a sí mismo, o que hay uno en su área. Como se puede ver, hay una gran cantidad de puertas de enlace disponibles.

![Mapa de todas las puertas de enlace TTN](/posts/category/iot/iot-software/images/Screen-Shot-2019-10-09-at-12.08.22-PM.png)

No había una lo suficientemente cerca, así que puse mi propio (Consejo: Estos son ** no ** baratos para comprar - mío me costó> $ 200) por lo que me puede ver en el mapa ahora:

![Mapa de TTN Gateways cerca de Raleigh, Carolina del Norte](/posts/category/iot/iot-software/images/Screen-Shot-2019-10-09-at-12.09.32-PM-1.png)

Hay un montón de tutoriales sobre cómo configurar una puerta de enlace, así que no voy a cubrir eso aquí.

A continuación, tendrá una radio Lora para su sensor. Resulta que tengo una [Adafruit pluma M0](https://www.adafruit.com/product/2772) tabla de ahí (Tengo un montón de piezas al azar de hardware simplemente 'por ahí'), así que tiene una) tabla de ahí (Tengo un montón de piezas al azar de hardware simplemente 'por ahí'), así que tiene una [ adafruit lorra Featherwing](https://www.adafruit.com/product/3231) para ello y se lo puso. Por último, he utilizado un) para ello y se lo puso. Por último, he utilizado un [tablero del desbloqueo BME280](https://www.adafruit.com/product/2652) (de nuevo desde Adafruit. Ellos realmente debería patrocinar me!) Para recoger los datos y yo estaba listo para ir.

Cableado de todo lo que hasta hace un minuto, por lo que te voy a dar los detalles sobre cómo Telegrafié mía. La primera cosa a destacar es que con la LoRaWAN Featherwing, que ** ** imprescindible hacer la soldadura adicional. Se puede ver a continuación cómo tuve que los puentes de soldadura en IRQ` de `` CS`, `RST`,` `DIO1` y DIO2`. Estos luego se asignan a pines en el M0 pluma, lo que veremos en la sección de software. Si cablea estos puentes de manera diferente, tendrá que ajustar la configuración de pasador en su software en consecuencia.

![Un Consejo de la IO LoRaWAN](/posts/category/iot/iot-software/images/IMG_6122.png)

También puede ver algunos pequeños cables rojo que viene de fuera de la pantalla (Me encanta este hilo cerámico recubierto, incluso si se trata de un dolor de soldadura). Los que vienen de la junta BME280 Breakout y se van a los pines I2C y el 3v / tierra en el tablero para alimentar el sensor. Una vez que todo lo que está conectado arriba, es abajo al software!

## El software

Software para esto me tomó un minuto para conseguir trabajo, pero la mayoría de que tenía que ver con la diferencia en la forma de enviar datos a través de LoRaWAN. Estoy acostumbrado a utilizar BLE o WiFi, por lo que el tamaño de los paquetes de datos en realidad no importa mucho. Con LoRaWAN, el tamaño de los paquetes de datos reina suprema.

La primera cosa que usted querrá hacer es instalar la biblioteca adecuado para su Arduino. He utilizado el [MCCI LoRaWAN LMIC Biblioteca](https://github.com/mcci-catena/arduino-lmic). Parecía el más fácil de integrar con TTN. Parte de la documentación de esta biblioteca fue un poco menos clara (al menos para mí) así que les daré los detalles de lo que hice para conseguir este espectáculo de correr en una pluma M0. A partir de ahí, empecé con el programa de ejemplo `TTN-otaa-pluma-us915`. Ahora, para rellenar las piezas. Tendrá que ir a su consola de TTN y cree una nueva aplicación.

![La nueva pantalla de aplicación](/posts/category/iot/iot-software/images/Screen-Shot-2019-10-09-at-1.19.29-PM.png)

Una vez que se haya registrado dicha aplicación, tendrá que obtener el Euis Aplicación (ID) para pegar en la placa Arduino Boceto. Es importante tener en cuenta que, por defecto, la consola TTN le da su Euis con el bit más significativo primero (big-endian), mientras que las Espera Arduino dibujarlo en ascendente hacia la izquierda. Por suerte, la consola TTN hace que todos así de fácil:

![La pantalla de aplicación EUI](/posts/category/iot/iot-software/images/AppEUI.gif)

Como se puede ver, que incluso hace que copiar en una matriz de bytes sencillo.

```cpp
static const u1_t PROGMEM APPEUI[8] = { 0xB2, 0x38, 0x02, 0xD0, 0x7E, 0xD5, 0xB3, 0x70 };
void os_getArtEui (u1_t* buf) {
  memcpy_P(buf, APPEUI, 8);
}
```

Por lo tanto, ese es el ID de la aplicación. A continuación vamos a hacer lo mismo para su ID de dispositivo y la clave de la aplicación. Clic para registrar un nuevo dispositivo, y se puede obtener acceso a toda la información necesaria a partir de ahí:

![La pantalla de ID de dispositivo](/posts/category/iot/iot-software/images/Screen-Shot-2019-10-09-at-1.33.14-PM.png)

```cpp
// This should also be in little endian format, see above.
static const u1_t PROGMEM DEVEUI[8] = { <insert Dev Key };
void os_getDevEui (u1_t* buf) {
  memcpy_P(buf, DEVEUI, 8);
}

// This key should be in big endian format (or, since it is not really a
// number but a block of memory, endianness does not really apply). In
// practice, a key taken from the TTN console can be copied as-is.
static const u1_t PROGMEM APPKEY[16] = { <insert Program Key };
void os_getDevKey (u1_t* buf) {
  memcpy_P(buf, APPKEY, 16);
}
```

Y no se preocupe por mí la publicación de esos documentos de identidad. Creé que la aplicación ficticia y el dispositivo sólo para esta entrada del blog, y que son: largo ido ahora. Sino como un recordatorio, nunca publicar sus identificadores o claves de este tipo.

Usted tendrá que ajustar este búfer de datos para los datos, pero esto es lo que he usado: `sin firmar misdatos char [11];` Recuerda, dije que los datos transmitidos se mantuvo intencionadamente muy baja, por lo que estoy empacando una gran cantidad de datos en este 11 bytes! Veremos como yo que en un momento.

Luego viene los pasadores. Recuerde de la sección de hardware? Si cableado el pluma LoRaWAN exactamente igual que la mía, esto debería funcionar para usted.

```cpp
#if defined(ARDUINO_SAMD_FEATHER_M0) || defined(ADAFRUIT_FEATHER_M0)
// Pin mapping for Adafruit Feather M0 LoRa, etc.
const lmic_pinmap lmic_pins = {
  .nss = 5,
  .rxtx = LMIC_UNUSED_PIN,
  .rst = 6,
  .dio = {9, 10, 11},
  .rxtx_rx_active = 0,
  .rssi_cal = 8,              // LBT cal for the Adafruit Feather M0 LoRa, in dB
  .spi_freq = 8000000,
};
```

Aquellos eran un poco difícil de entender, y en el código de ejemplo que deja un par de esos `` pasadores dio` como LMIC_UNUSED_PIN` pero la mía no funcionaría hasta que todos ellos definidos.

Para el resto de mi código, he utilizado alguna caldera de la placa que tengo para el BME280:

```cpp
Adafruit_BME280 bme;
double temperature = 0.00;
double pressure = 0.00;
double altitude = 0.00;
double humidity = 0.00;
bool bme_config = true;

// this goes in the setup() function:
int tryInit = 0;
  while (!bme.begin()) {
    Serial.println("Could not find a valid BME280 sensor, check wiring!");
    delay(3000);
    if (++tryInit > 9) {
      bme_config = false;
      break;
    }
  }

// a function to get readings:
void getReadings() {
  if (bme_config) {
    temperature = bme.readTemperature();
    pressure = bme.readPressure() / 100.0F;
    altitude = bme.readAltitude(SEALEVELPRESSURE_HPA);
    humidity = bme.readHumidity();
    Serial.print("Temp:     "); Serial.println(temperature);
    Serial.print("Humidity: "); Serial.println(humidity);
    Serial.print("Pressure: "); Serial.println(pressure);
    Serial.print("Altitude: "); Serial.println(altitude);
  }
}
```

Ahora, para obtener los datos embute en 11 bytes! Se dará cuenta de que en mi código repetitivo BME280 he definido todas las mediciones como `double` que estaba bien para aplicaciones de alto ancho de banda, pero simplemente no va a hacer por LoRaWAN. Así que voy a reducir gradualmente hacia abajo a 2 bytes cada uno (excepto la medición de la presión, que se quedará en 4 bytes).

```cpp
getReadings();
    uint16_t ft = (uint16_t)(temperature * 100);
    uint16_t fh = (uint16_t)(humidity * 100);
    uint32_t fp = (uint32_t)(pressure * 100);
    uint16_t fa = (uint16_t)(altitude * 100);
```

Si tengo lecturas como:

> Temp: 25.04
>
> Humedad: 54.60
>
> Presión: 1006.38
>
> Altitud: 57.34

A continuación, voy a terminar con:

> Temp: 2502
>
> Humedad: 5460
>
> Presión 100638
>
> Altitud: 5734

Todos los números enteros de 16 y 32 bits. Ahora bien, de meter a todos en mi matriz de datos:

```cpp
mydata[0] = ft >> 8;
    mydata[1] = ft & 0xFF;
    mydata[2] = fh >> 8;
    mydata[3] = fh & 0xFF;
    mydata[4] = fp & 0xFF;
    mydata[5] = (fp >> 8) & 0xFF;
    mydata[6] = (fp >> 16) & 0xFF;
    mydata[7] = (fp >> 24) & 0xFF;
    mydata[8] = fa >> 8;
    mydata[9] = fa & 0xFF;
```

Si no está familiarizado con la manipulación de datos bit a bit, básicamente, sólo estoy moviendo cada byte de cada número en un lugar en mi matriz de bytes. Dado que el número de presión es un valor de 4 bytes, que tengo que hacer cambio adicional. A continuación, puedo enviar ese fuera a través de TTN LoRaWAN y se completa mi transmisión de datos.

Lamentablemente, sin embargo, no hemos terminado aún !. TTN será cortésmente enviar todos los datos que envíe a cabo a un corredor de MQTT para mí para que pueda suscribirse a él y hacer con ella lo que quiera. (** Spoiler de alerta: ** voy a ponerlo en InfluxDB!)

## Obtención de los datos

Mis datos ahora está entrando en TTN a través LoRaWAN, y se está escribiendo a un corredor de MQTT para mí, pero como lo consigo en ella? Bueno, lo primero que hay que hacer es suscribirse! Yo uso una aplicación llamada MQTT Box en mi Mac para suscribirse a varios corredores MQTT para ver los datos de diferentes entradas. Me permite definir varios corredores, y para suscribirse a cualquier número de temas, desde los corredores para ver mis datos. Para suscribirse al corredor que necesita 3 piezas de información: El nombre / dirección del agente, el nombre de usuario y la contraseña para conectarse. Para aquellos de nosotros en los EE.UU., la dirección del corredor es `nosotros-west.thethings.network`. Por su nombre de usuario, se utilizará el nombre de la aplicación. En el ejemplo anterior, nos gustaría usar `mi-temp-app` como nombre de usuario. Para la contraseña, se le va a su aplicación en la Consola de TTN, y buscar la llave de aplicaciones * * en la parte inferior de la página. Copiar / pegar de que en el campo de contraseña para el corredor y que debe conectarse.

Si miro a mis datos que salen a mi agente MQTT, inmediatamente me di cuenta de un problema: Es sólo una cadena de apariencia aleatoria de caracteres. En realidad no es al azar en todo - es amortiguar sus datos, base 64 codificado.

```json
{ "app_id":"my-temp-app",
  "dev_id":"my-device",
  "hardware_serial":"009E9BA30C869232",
  "port":1,
  "counter":17,
  "payload_raw":"CdgVLRGJAQAWzg==",
}
```

No es muy útil. Lo que encontrar un super ** ** sitio útil que me ayudaría a traducir eso en algo más significativo. Ir a [Crypti.com](https://Crypti.com) y pegar en sus primas, datos codificados en base 64, y será ... traducirlo a hexadecimal. Hmm ... todavía no lo que yo quiero ver. Resulta que, con el fin de obtener los datos en una forma utilizable, usted tiene que volver a la consola TTN y haga clic en el * * Carga útil Formatos pestaña. A partir de aquí, vamos a decodificar el hexagonal en algo que podemos utilizar realmente.

Recordemos, enviamos una matriz de bytes. Pegué el mensaje de base-64-codificada en ese sitio web anterior, y obtuve el siguiente:

![matriz de bytes descifrado a través de la página web](/posts/category/iot/iot-software/images/Screen-Shot-2019-10-09-at-2.34.09-PM.png)

Se decodifica en una serie de bytes. ¡Fresco! Ahora para decodificar esos bytes! (Ya casi llegamos, lo prometo!)

En su TTN pestaña Consolas Formatos de carga útil, vamos a entrar en la siguiente función (que es Javascript!)

```js
function Decoder(bytes, port) {
  var decoded = {};

  var cInt = (bytes[0] << 8) | bytes[1]; // temperature ºC
  var rem =(bytes[2] << 8) | bytes[3]; // humidity %
  var pre = (bytes[4]) + // pressure is a 4-byte value
  ((bytes[5]) << 8)
      + ((bytes[6]) << 16)
  + ((bytes[7]) << 24) ;
  var alt = (bytes[8] << 8) + bytes[9];

  // Decode integer to float
  decoded.temp_c = cInt / 100;
  decoded.humidity = rem / 100;
  decoded.pressure = pre / 100;
  decoded.altitude = alt / 100;

  return decoded;
}
```

Voy a paso a través de lo que estamos haciendo aquí. Si miramos hacia atrás en el búfer de datos que enviamos, recordará que los 2 primeros bytes son la temperatura. Así que nos tira fuera de esos 2 bytes y almacenamos los de una variable de temperatura. Nos tira de la próxima 2 y eso es nuestra humedad. entonces tenemos que agarrar los 4 bytes de la presión, y finalmente los últimos 2 bytes para la altitud. Por último, desciframos los de vuelta a su estado de coma flotante original, y ya está! Ahora bien, si nos fijamos en lo que está saliendo de nuestro corredor MQTT, vamos a ver:

```json
{ "app_id":"my-temp-app",
  "dev_id":"my-device",
  "hardware_serial":"009E9BA30C869232",
  "port":1,
  "counter":28,
  "payload_raw":"CeEVJg6JAQAW7A==",
  "payload_fields":{
      "altitude":58.68,
      "humidity":54.14,
      "pressure":1006.22,
      "temp_c":25.29
  },
}
```

Que es un objeto JSON adecuada, con nuestros datos en una forma utilizable! Ahora, para el bit final: conseguir todo en InfluxDB!

## Conseguir en InfluxDB

Por suerte, esta es la parte más fácil de todo el asunto gracias a Telegraf! En su anfitrión telegraf, editar el archivo `telegraf.conf`. Busque la sección titulada Leer métricas de MQTT tema (s) y añadir lo siguiente:

```
[[inputs.mqtt_consumer]]
  servers = ["tcp://us-west.thethings.network:1883"]
  qos = 0
  connection_timeout = "30s"
  topics = [ "+/devices/+/up" ]
  client_id = "ttn"
  username = "APP_NAMEr"
  password = "APPKEY"
  data_format = "json"
```

Entonces telegraf reinicio, y, como la magia, que debería estar recibiendo datos en InfluxDB! Si voy mirada en mi explorador de datos en Chronograf, debería ver una nueva medida llamada `mqtt_consumer` y allí ... Whoa !! Una gran cantidad de campos de datos! Resulta que TTN ofrece un montón de datos adicionales sobre cómo conectar el dispositivo y envía sus datos, y que se conserva todo por el plugin Telegraf.

![dashobard alimentación en vivo de los datos](/posts/category/iot/iot-software/images/data1.gif)

Sus datos de los sensores tendrán `payload_fields_` antepone a la misma. Todo el resto son datos acerca ** ** sus datos.

Como de costumbre, la parte más fácil de casi cualquier implementación que hago es la parte InfluxDB. Una vez que tenía los datos que salen del corredor de MQTT en el formato adecuado, tener que almacenar en InfluxDB tomó sólo unas pocas líneas de configuración. Ahora puedo construir un tablero de mi temperatura, humedad, presión y datos de altitud en Chronograf.

