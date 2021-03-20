---
title: "IO en QuestDB"
Date: 2020-06-05
Author: davidgs
Category: databse, IoT
Tags: Arduino, Database, IoT, QuestDB
Slug: iot-on-questdb
hero: images/WemosCircuit.png
---

Como se puede imaginar, he estado muy ocupado en mi trabajo Hew en QuestDB así que esto me ha tardado más de lo que me hubiera gustado, pero aquí estamos. Si me conoces en absoluto, usted sabe que una de las primeras cosas que siempre hago con las cosas nuevas es, así, las cosas conectarse a ellos! Así que inmediatamente fui a conectar un dispositivo IO a QuestDB para ver cómo ha ido. Como era de esperar, se ha ido bastante bien. Así que aquí está cómo fue, de principio a fin.

## La parte de base de datos

Lo primero que tenía que hacer era un QuestDB para llegar a funcionar. Por suerte, esto es muy sencillo. Creo que podría haber seguido la ruta del estibador, pero a medida que es probablemente consciente, no soy un gran fan de Docker (en gran parte debido al hecho de que, literalmente, se chupan la vida de un ordenador portátil MacOS). Hay también (para usuarios que MacOS) `Brew instalar questdb` pero desde que trabajo aquí, y quería probar el mejor y más nuevo de la consola web, que decidieron construir desde la fuente:

![GIF del proceso de construcción](/posts/category/database/images/Build.gif)

Se construye muy rápidamente debido a la falta de dependencias externas, por lo que es grande! Entonces todo lo que tengo que hacer es iniciarlo:

![Gif de iniciar QuestDB servidor](/posts/category/database/images/StartQuest.gif)

Es decir, literalmente, todo lo que hay que conseguir QuestDB construida y en funcionamiento. Pero eso es sólo la primera parte. Ahora es el momento de hacer algo medianamente útil con él. En primer lugar, tendrá que crear una tabla en QuestDB para almacenar datos de mi IO (un poco más sobre esto más adelante, por lo que almacenar un puntero a este).

![Captura de pantalla de consulta SQL](/posts/category/database/images/Screen-Shot-2020-06-04-at-9.15.33-AM-1.png)

Recuerda que estamos haciendo aquí SQL, así que no hay nuevo lenguaje o la sintaxis de aprender. Esta es una tabla muy simple que estoy construyendo porque voy a estar usando un ESP8266 con un sensor de temperatura y humedad (realmente horrible) DHT11 en él.

## La parte del sensor

Para ello voy a utilizar un WEMOS D1 Mini basada en ESP8266 sólo porque resulta que tengo una pila gigante de ellos por ahí. Los compro a granel, ya que son un dólar o 2 cada uno, fácil de usar, y en gran medida si desechable que sople un gol arriba (que hago con regularidad alarmante.). El circuito es muy simple de hacer:

![Wemos Circuito D1](/posts/category/database/images/WemosCircuit.png)

Tenía un escudo WEMOS real con el DHT11 en él, así que no tenía que cortar el pan, pero este esquema le da una idea de cómo es simple es el cableado. Es, literalmente, 3 hilos.

## La Parte Código

Aquí es donde sucede la magia. ¿Cómo que en realidad le envían los datos del sensor a la base de datos. Hay un programa simple ejemplo que se incluye con la Biblioteca del sensor Unificado Adafruit DHT que yo recomiendo empezar con el fin de hacer esto un poco más fácil. Ya cuenta con todas las partes para leer desde el sensor por lo que no tiene que escribir los de cero. Recuerde: Los buenos desarrolladores copiar, pegar, pero grandes desarrolladores!

Desde que estoy usando el 8266, y voy a necesitar la conectividad a Internet, necesitaré todos los bits de WiFi:

```cpp
#include <WiFiServerSecure.h>
#include <WiFiClientSecure.h>
#include <WiFiClientSecureBearSSL.h>
#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>
#include <WiFiUdp.h>
#include <ESP8266WiFiType.h>
#include <CertStoreBearSSL.h>
#include <ESP8266WiFiAP.h>
#include <WiFiClient.h>
#include <BearSSLHelpers.h>
#include <WiFiServer.h>
#include <ESP8266WiFiScan.h>
#include <WiFiServerSecureBearSSL.h>
#include <ESP8266WiFiGeneric.h>
#include <ESP8266WiFiSTA.h>
#include <WiFiClientSecureAxTLS.h>
#include <WiFiServerSecureAxTLS.h>
```

Realmente todo lo que tiene que hacer es ir al menú 'Croquis', elija 'Incluir Biblioteca' y seleccionar la biblioteca 'ESP8266WiFi' y se obtiene todo este material importado para usted.

Aquí hay un código caldera de la placa siempre se puede utilizar para obtener su ESP8266 en su Wi-Fi:

```cpp
#include <Adafruit_Sensor.h>
#include <DHT.h>
#include <DHT_U.h>

#define DHTPIN D4 // Digital pin connected to the DHT sensor
#define DHTTYPE DHT11 // DHT 11
#define QUEST_SERVER "10.10.10.10" // use your server's IP address!
#define QUEST_PORT 9009

#define SENSOR_ID 4343 // I made this up
#define SENSOR_NAME "DHT11-WEMOS"

const char* ssid = "your-ssid";
const char* password = "your-password";

DHT_Unified dht(DHTPIN, DHTTYPE);
uint32_t delayMS;
WiFiUDP Udp;

void setup(){
  Serial.begin(115200);
  delay(10);
  // We start by connecting to a WiFi network
  Serial.print("Connecting to ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());

  dht.begin();
  Udp.begin(QUEST_PORT);
  Serial.println(F("DHTxx Unified Sensor Example"));
  // Print temperature sensor details.
  sensor_t sensor;
  dht.temperature().getSensor(&sensor);
  Serial.println(F("------------------------------------"));
  Serial.println(F("Temperature Sensor"));
  Serial.print (F("Sensor Type: ")); Serial.println(sensor.name);
  Serial.print (F("Driver Ver: ")); Serial.println(sensor.version);
  Serial.print (F("Unique ID: ")); Serial.println(sensor.sensor_id);
  Serial.print (F("Max Value: ")); Serial.print(sensor.max_value);
  Serial.println(F("°C"));
  Serial.print (F("Min Value: ")); Serial.print(sensor.min_value);
  Serial.println(F("°C"));
  Serial.print (F("Resolution: "));
}
```

Eso hace que los conceptos básicos establecidos. En ejecución que debe obtener una conexión WiFi y un sensor DHT11 totalmente configurado. Estamos casi listos para comenzar a enviar datos a la base de datos.

Si estaban prestando atención, y leer el código, se le han dado cuenta de las cosas UDP que se acercaron allí. Esto se debe a que vamos a hacer de este super fácil y utilizar UDP para enviar nuestros datos. Y hay una buena razón ** ** realmente para eso: Protocolo de línea InfluxDB. Usted ve, QuestDB tiene incorporado un Protocolo de línea InfluxDB oyente, pero (por ahora) sólo está escuchando en un puerto UDP. Así que vamos a usar eso.

Ahora, para enviar algunos datos:

```cpp
void loop() {
// Delay between measurements.
  delay(delayMS);
  char *buffer;
  buffer = (char *)malloc(256);
  // Get temperature event and print its value.
  double temp = -212;
  double hum = -1;
  sensors_event_t event;
  dht.temperature().getEvent(&event);
  if (isnan(event.temperature)) {
    Serial.println(F("Error reading temperature!"));
  } else {
    Serial.print(F("Temperature: "));
    Serial.print(event.temperature);
    temp = event.temperature;
    Serial.println(F("°C"));
  }
  // Get humidity event and print its value.
  dht.humidity().getEvent(&event);
  if (isnan(event.relative_humidity)) {
    Serial.println(F("Error reading humidity!"));
  } else {
    Serial.print(F("Humidity: "));
    Serial.print(event.relative_humidity);
    hum = event.relative_humidity;
    Serial.println(F("%"));
  }
  if(temp != -212 && hum != -1){
    char tTemp[10];
    char hTemp[10];
    dtostrf(temp, 4, 2, tTemp);
    dtostrf(hum, 4, 2, hTemp);
    sprintf(buffer, "iot,dev_id=%d,dev_name=%s temp_c=%s,humidity=%s", SENSOR_ID, SENSOR_NAME, tTemp, hTemp);
    Serial.println(buffer);
    Udp.beginPacket(QUEST_SERVER, QUEST_PORT);
    Udp.write(buffer);
    Udp.endPacket();
  }
  free(buffer);
}
```

Sí, hay mucho que hacer allí. Así que vamos a romper hacia abajo. En primer lugar, estoy creando un buffer para almacenar los datos que voy a enviar, y luego voy a hacer una lectura del sensor. He establecido la `` temp` y las variables hum` a los valores que sé que el sensor no volverá para que pueda comprobar que llegué lecturas válidas después, para evitar el envío galimatías a la base de datos.

Tengo que hacer algunas travesuras con los valores de temperatura y humedad en allí porque uno de los defectos de Arduino es que no tienen el apoyo `sprintf` en dobles. Sé. Por lo que simplemente convertirlos en cadenas y seguir adelante. Una vez que llegan a la base de datos, se interpretan como dobles y la vida es buena. No vale la pena luchar acerca. Entonces puede construir un tampón con protocolo de línea recta y enviarlo fuera a QuestDB sobre UDP.

No se olvide de liberar la memoria!

## Que puntero

Recuerdas que te dije para establecer un puntero antes acerca de la creación de la base de datos? Bueno, aquí es donde vuelvo a eso. No es en realidad * * tiene que crear la base de datos antes de tiempo * * a menos que usted quiere hacer cosas como índices de ajuste, etc. Si todo lo que quiere hacer es tener los valores consecutivos de allí, y luego adivinen qué? Esquema en escritura es una cosa aquí. Usted puede simplemente comenzar a escribir los datos a la base de datos, y también irá almacenarlos para usted. cosas interesantes bonita.

## consultar los datos

Uso de la consola QuestDB, a continuación, puede consultar los datos para asegurarse de que está recibiendo lo que se espera:

![GIF de las consultas QuestDB](/posts/category/database/images/queries.gif)

Eso es exactamente lo que esperaba!

## Que sigue

Ahora es el momento de empezar a construir algunos cuadros de mando, etc. en la parte superior de esta. Actualmente estoy trabajando en conectar todo esto con el Nodo de Red, así que puede ser mi próximo post. También estamos trabajando en el apoyo a Grafana, que será enorme, así que estad atentos para eso. Si te gusta lo que ves aquí, agrada ir nos dan una estrella en [GitHub](https://github.com/questdb), y siga el proyecto si desea obtener actualizaciones!

