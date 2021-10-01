---
title: "Proyecto Camunda IoT, Parte II"
Date: 2021-06-08
Author: davidgs
Category: IoT
Tags: connectivity, Internet Anywhere, IoT, Camunda
Slug: camunda-iot-part-2
hero: images/header.jpg
---

Esta es la Parte II de la serie que cubre un proyecto de Prueba de concepto (PoC) en el que estoy trabajando como parte de mi trabajo como Promotor principal de desarrollo en [Camunda] (https://camunda.com?ref=davidgsIoT). No estoy seguro de cuántas publicaciones habrá en la serie, pero bueno, ¿al menos dos? Si te perdiste la [Parte I](/posts/category/camunda/iot-project), es posible que desees ponerte al día antes de continuar.

Esta parte del proyecto fue la primera construcción de hardware del proyecto. Ahora he construido y desplegado una estación meteorológica al aire libre completa para recopilar datos sobre las condiciones climáticas actuales fuera del invernadero. Esto me permitirá comparar las condiciones dentro del invernadero con las condiciones fuera del invernadero y compensar en consecuencia.

## Lista de partes

Aquí está la lista completa de piezas que utilicé. Esto difiere ligeramente de la lista de piezas en la [Parte I](/posts/category/camunda/iot-project). Esto se debe principalmente a que no soy consciente de una parte ligeramente diferente que hará las cosas*mucho* más fáciles. También incorpora ya el sensor de rayos, el BME280 para temperatura, presión y humedad, y la entrada de humedad del suelo.

| Sensor | Precio |
| -------- | ------- |
| [Estación meteorológica](https://www.sparkfun.com/products/15901) | $ 79.95 |
| [MicroMod ESP32](https://www.sparkfun.com/products/16781) | $ 14.95 |
| [Tablero portador del clima MicroMod](https://www.sparkfun.com/products/16794) | $ 44.95 |
| [Batería LiPo](https://www.sparkfun.com/products/13856) | $ 26.95 |
| [Cargador solar](https://www.sparkfun.com/products/12885) | $ 26.95 |
| [Panel solar](https://www.sparkfun.com/products/13783) | $ 59.00 |
| [Humedad del suelo](https://www.sparkfun.com/products/13637) | $ 6.95 |
| [ <sub>Sensor de CO 2</sub> ](https://www.sparkfun.com/products/15112) | $ 59.95 |
| **Total** | ** $ 319.65 ** |


También tenía un sensor Adafruit [PM2.5](https://www.adafruit.com/product/4632) colgando (cuesta $ 44.95), así que lo agregué también.

## Construyendo la estación meteorológica

Ahora que tenía todas las piezas, era hora de comenzar a ensamblarlas y diseñar e imprimir algunos gabinetes para contener todo. Podría haber hecho una sola caja para guardarlo todo, pero eso significaría diseñar una caja **muy** grande, con el tiempo de impresión requerido.

Empecemos por la fuente de alimentación. Dado que esta será una implementación externa, decidí hacerla con energía solar, con una batería, por supuesto.

### Impulsando todo

El primer problema fue que la placa Solar Buddy no tiene salida USB. Solo tiene una `carga` con` + `y` -`. La estación meteorológica, por supuesto, no tiene pines `vcc` y` G`, pero*solo* funciona con USB-C. Así que tuve que arreglar eso. Afortunadamente, compré una gran cantidad de cables conectores resistentes a la intemperie, así que pedí algunos extremos USB-C y soldé uno.

![Conector impermeable de 2 cables](/posts/category/iot/iot-hardware/camunda-iot-part-2/images/camunda-iot-7.png)

![Conector impermeable de 2 cables con conector USB-C](/posts/category/iot/iot-hardware/camunda-iot-part-2/images/camunda-iot-8.png)

![Conector USB-C con tubo retráctil](/posts/category/iot/iot-hardware/camunda-iot-part-2/images/camunda-iot-9.png)

Una vez que se construyó, llegó el momento de diseñar una caja para contenerlo todo. Como iba a ser un dispositivo para exteriores, traté de hacerlo resistente al agua haciendo bordes muy ajustados y biselados en la tapa. El tablero parece pequeño en la caja:

![Caja impresa personalizada con placa solar en ella](/posts/category/iot/iot-hardware/camunda-iot-part-2/images/camunda-iot-1.png)

Tuve que soldar el nuevo conector USB-C * después * de colocar la placa. Y parece pequeño en la caja, pero una vez que la batería está puesta, ¡es una caja bastante llena!

![caja impresa personalizada con batería](/posts/category/iot/iot-hardware/camunda-iot-part-2/images/camunda-iot-3.png)

Puede ver los bordes biselados de la tapa a medida que se desliza:

![La tapa se empuja hacia la caja.](/posts/category/iot/iot-hardware/camunda-iot-part-2/images/camunda-iot-4.png)

La tapa queda bien ajustada y, con suerte, la mantendrá seca.

![tapa bien ajustada en la caja](/posts/category/iot/iot-hardware/camunda-iot-part-2/images/camunda-iot-5.png)

E incluso lo hice hermético por donde salen los cables:

![cables con envoltura retráctil que salen de la caja](/posts/category/iot/iot-hardware/camunda-iot-part-2/images/camunda-iot-6.png)

Con suerte, el panel solar mantendrá la batería cargada para que la estación meteorológica funcione continuamente. Necesitaré hacer ajustes en el tiempo que pasé durmiendo para maximizar los datos y minimizar el consumo de batería.

### Construyendo los sensores

Una de las ventajas de usar esta placa Weather Carrier sobre mi enfoque anterior es que muchos de los sensores que quería incorporar están incluidos en la placa portadora, por lo que tenía muy poco que construir.

Agregar Adafruit [PM2.5](https://www.adafruit.com/product/4632) fue una cuestión de conectar un cable QWIIC entre la placa portadora y el sensor. Sí, realmente fue así de fácil.

Dado que el sistema QWIIC permite el paso a través y la placa PM2.5 tiene dicho paso, decidí hacerme un cable para el [ <sub>Sensor de CO 2</sub> ](https://www.sparkfun.com/products/15112). Implicó cortar un cable conector QWIIC por la mitad y soldar los cables en los orificios correctos (I2C solo requiere 4 cables) en el sensor. Luego podría conectar el <sub>sensor de CO 2 al</sub> sensor PM2.5, con una soldadura mínima.

> Para aquellos que son curiosos, el [SparkFun QWIIC Connect System](https://www.sparkfun.com/qwiic) utiliza conectores JST de 4 pines para conectar `VCC`,` GND`, `SDA` y` SDC` en dispositivos con el conector adecuado. Es muy útil y facilita la conexión de sensores.

Ahora tenía un sistema de sensores completo que recopilaría*todos* los datos ambientales al aire libre que quería en una placa, con solo 2 sensores conectados externamente. Y todo*eso* con solo tener que soldar 4 cables.

## La caja del sensor

Esta caja iba a ser un poco más complicada. Tenía que ser hermético, como la caja de la batería, pero tenía que permitir un flujo de aire libre constante a través del dispositivo para obtener lecturas precisas. Este sensor no estaba siendo implementado afuera, pero básicamente tiene que estar afuera y * sin protección * para que pueda obtener las mejores lecturas.

Afortunadamente, ya había ideado un diseño para este tipo de implementaciones. Es una caja con persianas orientadas hacia arriba para que el aire pueda fluir, pero la lluvia y el agua no pueden entrar porque generalmente no llueve * a cántaros *.

Así es como se ven en la representación del modelo 3D:

{{< video "Box detail" "/posts/category/iot/iot-hardware/camunda-iot-part-2/images/model.mp4" >}}

Si miras de cerca la parte superior abierta en ese modelo, puedes ver que diseñé la parte superior como un deslizamiento con ranuras biseladas hacia atrás con la esperanza de mantener la cosa libre de fugas. Donde la parte superior de la tapa se encuentra con la parte superior de la caja, también la biselé hacia atrás por la misma razón.

![Detalle de la caja que muestra las ranuras biseladas hacia atrás para la parte superior](/posts/category/iot/iot-hardware/camunda-iot-part-2/images/lids.jpg)

Puse alfileres para que la placa se pueda asegurar a la caja (simplemente derrita los alfileres con el soldador) para que no haya ruido y la caja esté completa.

![la impresión 3D completa de la caja](/posts/category/iot/iot-hardware/camunda-iot-part-2/images/camunda-iot-13.png)

Entonces, todo encaja perfectamente dentro de la caja sin demasiado apiñamiento (¡nuevamente, necesitamos flujo de aire!), Pero en un espacio mínimo.

![La caja con todos los sensores dentro y lista para desplegar](/posts/category/iot/iot-hardware/camunda-iot-part-2/images/camunda-iot-16.png)

Luego podría deslizar la tapa y enchufar los conectores de la estación meteorológica y ¡todo estará listo para salir!

![La caja se cerró con todos los cables saliendo](/posts/category/iot/iot-hardware/camunda-iot-part-2/images/camunda-iot-18.png)


Así que esa es la parte del hardware, pero ¿qué pasa con el software para que todo funcione? Bueno, ¡sigue leyendo para saberlo!

## Software de la estación meteorológica

Tener todo ese hardware en una bonita caja compacta (y con suerte resistente al agua) es genial y todo, pero sin una buena cantidad de software, todo sería una pérdida de tiempo. ¡Así que vamos a sumergirnos en un código!

### Accediendo a los sensores

Por suerte, SparkFun proporciona un pequeño y agradable programa de "prueba" para el Weather Carrier Board, que fue un fantástico punto de partida para hacer que todo funcione.

```cpp
\*
 * This code is Lemonadeware; if you see me (or any other SparkFun employee) at the
 * local, and you've found our code helpful, please buy us a round!
 *
 * Hardware Connections:
 * Insert MicroMod processor board of your choice into the M.2 connector of the SparkFun Weather carrier
 *  Screw into place
 * Connect Weather carrier board to power useing USB-C cable
 * Connect SparkFun Soil Moisture Sensor to Weather carrier using latching terminals
 * Connect both wind and rain meters to Weather carrier using the RJ11 connectors
 */
 ```

 I love the idea of "Lemonadeware", by the way.

 This example program will give me access to all the sensors except the two I added. I'll need to add some code to join a WiFi network, so I can store the data, and I'll need to add some code to store the data in a database, but that should be all I need to do!

 First, I'll need to import a bunch of libraries:

 ```cpp
 #include <Wire.h>
#include <SPI.h>
#include "SparkFunBME280.h"
#include <SparkFun_VEML6075_Arduino_Library.h>
#include "SparkFun_AS3935.h"
#include "SparkFun_SCD30_Arduino_Library.h"
#include <Adafruit_PM25AQI.h>
#include <InfluxDbClient.h>
#include <DNSServer.h>
#include <ESPmDNS.h>
#include <WiFiUdp.h>
#include <WiFiClientSecure.h>
#include <WiFiMulti.h>
```

Eso me da acceso a todos los sensores, wifi e InfluxDB, donde almacenaré los datos por ahora.

Necesitaré definir algunas cosas también:

```cpp
#define INDOOR 0x12
#define OUTDOOR 0xE
#define LIGHTNING_INT 0x08
#define DISTURBER_INT 0x04
#define NOISE_INT 0x01
#define INFLUXDB_URL "https://my.influx.server" // define your own!
// InfluxDB v2 server or cloud API authentication token (Use: InfluxDB UI -> Data -> Tokens -> <select token>)
#define INFLUXDB_TOKEN "YOUR_TOKEN_GOES_HERE"
// InfluxDB v2 organization id (Use: InfluxDB UI -> User -> About -> Common Ids )
#define INFLUXDB_ORG "influxdata"
#define INFLUXDB_BUCKET "telegraf"
#define TZ_INFO "EST5EDT"
#define SENSOR_ID "WEA-001"
```
Yo uso el `SENSOR_ID` como una etiqueta en InfluxDB, y dado que esa etiqueta nunca cambia, uso un` # define` para ello.

Algunas variables:

```cpp
WiFiMulti wifiMulti;
SCD30 airSensor;
BME280 tempSensor;
VEML6075 uv;
SparkFun_AS3935 lightning;
Adafruit_PM25AQI aqi = Adafruit_PM25AQI();
int soilPin = A0;            //Pin number that measures analog moisture signal
int soilPower = G0;          //Pin number that will power the soil moisture sensor
int WSPEED = D0;             //Digital I/O pin for wind speed
int WDIR = A1;               //Analog pin for wind direction
int RAIN = D1;               //Digital I/O pin for rain fall
const int lightningInt = G3; // Interrupt pin for lightning detection
int spiCS = G1;              //SPI chip select pin

volatile bool rainFlag = false;
volatile bool windFlag = false;

WiFiClientSecure client;
const char *ssid = "YOUR_SSID";
const char *password = "SSID_PASSWORD";
// This variable holds the number representing the lightning or non-lightning
// event issued by the lightning detector.
int intVal = 0;
int noise = 2;     // Value between 1-7
int disturber = 2; // Value between 1-10

InfluxDBClient influx(INFLUXDB_URL, INFLUXDB_ORG, INFLUXDB_BUCKET, INFLUXDB_TOKEN);
Point myPoint("weather_out");
Point aqiPoint("weather_aqi");

```

Dado que mi instancia de InfluxDBv2 se ejecuta a través de TLS, también necesitaré incluir un certificado de la cadena de certificados:

```cpp
const char AlphaSSLCA[] PROGMEM =  R"EOF(
-----BEGIN CERTIFICATE-----
MIIETTCCAzWgAwIBAgILBAAAAAABRE7wNjEwDQYJKoZIhvcNAQELBQAwVzELMAkG
A1UEBhMCQkUxGTAXBgNVBAoTEEdsb2JhbFNpZ24gbnYtc2ExEDAOBgNVBAsTB1Jv
b3QgQ0ExGzAZBgNVBAMTEkdsb2JhbFNpZ24gUm9vdCBDQTAeFw0xNDAyMjAxMDAw
MDBaFw0yNDAyMjAxMDAwMDBaMEwxCzAJBgNVBAYTAkJFMRkwFwYDVQQKExBHbG9i
YWxTaWduIG52LXNhMSIwIAYDVQQDExlBbHBoYVNTTCBDQSAtIFNIQTI1NiAtIEcy
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA2gHs5OxzYPt+j2q3xhfj
kmQy1KwA2aIPue3ua4qGypJn2XTXXUcCPI9A1p5tFM3D2ik5pw8FCmiiZhoexLKL
dljlq10dj0CzOYvvHoN9ItDjqQAu7FPPYhmFRChMwCfLew7sEGQAEKQFzKByvkFs
MVtI5LHsuSPrVU3QfWJKpbSlpFmFxSWRpv6mCZ8GEG2PgQxkQF5zAJrgLmWYVBAA
cJjI4e00X9icxw3A1iNZRfz+VXqG7pRgIvGu0eZVRvaZxRsIdF+ssGSEj4k4HKGn
kCFPAm694GFn1PhChw8K98kEbSqpL+9Cpd/do1PbmB6B+Zpye1reTz5/olig4het
ZwIDAQABo4IBIzCCAR8wDgYDVR0PAQH/BAQDAgEGMBIGA1UdEwEB/wQIMAYBAf8C
AQAwHQYDVR0OBBYEFPXN1TwIUPlqTzq3l9pWg+Zp0mj3MEUGA1UdIAQ+MDwwOgYE
VR0gADAyMDAGCCsGAQUFBwIBFiRodHRwczovL3d3dy5hbHBoYXNzbC5jb20vcmVw
b3NpdG9yeS8wMwYDVR0fBCwwKjAooCagJIYiaHR0cDovL2NybC5nbG9iYWxzaWdu
Lm5ldC9yb290LmNybDA9BggrBgEFBQcBAQQxMC8wLQYIKwYBBQUHMAGGIWh0dHA6
Ly9vY3NwLmdsb2JhbHNpZ24uY29tL3Jvb3RyMTAfBgNVHSMEGDAWgBRge2YaRQ2X
yolQL30EzTSo//z9SzANBgkqhkiG9w0BAQsFAAOCAQEAYEBoFkfnFo3bXKFWKsv0
XJuwHqJL9csCP/gLofKnQtS3TOvjZoDzJUN4LhsXVgdSGMvRqOzm+3M+pGKMgLTS
xRJzo9P6Aji+Yz2EuJnB8br3n8NA0VgYU8Fi3a8YQn80TsVD1XGwMADH45CuP1eG
l87qDBKOInDjZqdUfy4oy9RU0LMeYmcI+Sfhy+NmuCQbiWqJRGXy2UzSWByMTsCV
odTvZy84IOgu/5ZR8LrYPZJwR2UcnnNytGAMXOLRc3bgr07i5TelRS+KIz6HxzDm
MTh89N1SyvNTBCVXVmaU6Avu5gMUTu79bZRknl7OedSyps9AsUSoPocZXun4IRZZ
Uw==
-----END CERTIFICATE--reading_time: 16 minutes
---
)EOF";
```

Entonces puedo configurar todo en mi función `setup ()`:

```cpp
void setup() {
  Serial.begin(115200);
  while (!Serial)
    ;
  delay(2500);
  Wire.begin(); // start I2C
  SPI.begin();  // Start SPI

  if (tempSensor.beginI2C() == false) { //Begin communication over I2C
    Serial.println("BME280 did not respond.");
    while (1)
      ; // Freeze
  }
  Serial.println("BME 280 found ...");
  if (uv.begin() == false) {
    Serial.println("VEML6075 did not respond.");
    while (1)
      ; // Freeze
  }
  Serial.println("VEML 6075 found ...");
  if (airSensor.begin() == false) {
    Serial.println("Air sensor not detected. Please check wiring. Freezing...");
    while (1)
      ; // Freeze
  }
  if (!aqi.begin_I2C()) { // connect to the sensor over I2C
    Serial.println("Could not find PM 2.5 sensor!");
    while (1)
      ; // Freeze
  }
  Serial.println("PM 2.5 found!");
  pinMode(LED_BUILTIN, OUTPUT);
  pinMode(soilPower, OUTPUT);
  digitalWrite(soilPower, LOW);
  // When lightning is detected the interrupt pin goes HIGH.
  pinMode(lightningInt, INPUT);
  //Initialization for weather meter
  pinMode(WSPEED, INPUT_PULLUP); //Input from wind meters windspeed sensor
  pinMode(RAIN, INPUT_PULLUP);   //Input from wind meters rain gauge sensor
  //attach external interrupt pins to IRQ functions
  attachInterrupt(digitalPinToInterrupt(RAIN), rainIRQ, FALLING);
  attachInterrupt(digitalPinToInterrupt(WSPEED), wspeedIRQ, FALLING);
  //turn on interrupts
  interrupts();

//TODO: this should go away once variant file is written
#if defined(ESP_PLATFORM)
  SPI.begin(14, 2, 15);
#endif

  if (lightning.beginSPI(spiCS, 2000000) == false) {
    Serial.println("Lightning Detector did not start up, freezing!");
    while (1)
      ; // Freeze
  }
  Serial.println("Schmow-ZoW, Lightning Detector Ready!");
  // The lightning detector defaults to an indoor setting at
  // the cost of less sensitivity, if you plan on using this outdoors
  // uncomment the following line:
  lightning.setIndoorOutdoor(OUTDOOR);
  // All the sensors are now properly configured.
  // Start WiFi
  WiFi.mode(WIFI_STA);
  Serial.printf("Wi-Fi mode set to WIFI_STA %s\n", WiFi.mode(WIFI_STA) ? "" : "Failed!");
  WiFi.begin(ssid, password);
  Serial.print("Waiting for WiFi to connect...");
  int i=0;
  while (WiFi.status() != WL_CONNECTED && i<30) {
    Serial.print(".");
    delay(500);
    i++;
  }
  Serial.println();
  if(WiFi.status() != WL_CONNECTED) {
    Serial.println("WiFi failed");
    ESP.restart();
  }
  WiFi.printDiag(Serial);
  Serial.println(WiFi.psk().c_str());
  influx.setWriteOptions(WriteOptions().writePrecision(WritePrecision::MS));
  influx.setWriteOptions(WriteOptions().batchSize(10).bufferSize(50));
  WiFiClientSecure *client = new WiFiClientSecure;
  if(client) {
    // set the cert for TLS
    client -> setCACert(AlphaSSLCA);
  // Check server connection
    if (influx.validateConnection()) {
      Serial.print("Connected to InfluxDB: ");
      Serial.println(influx.getServerUrl());
    } else {
      Serial.print("InfluxDB connection failed: ");
      Serial.println(influx.getLastErrorMessage());
      waitForInflux();
    }
  }
  // Set up global tags, etc. for the 2 Points weather and Air Quality Index
  myPoint.addTag("sensor", "weather_01");
  myPoint.addTag("location", "Apex");
  myPoint.addTag("Sensor_id", SENSOR_ID);
  aqiPoint.addTag("sensor", "weather_01");
  aqiPoint.addTag("location", "Apex");
  aqiPoint.addTag("Sensor_id", SENSOR_ID);
  Serial.println("Ready!");
}
```

En este punto, todo el sistema ahora está configurado, conectado a todos los sensores, conectado a WiFi y conectado a InfluxDB. De ahora en adelante, se trata de manejar las interrupciones, leer los sensores y escribir los datos.

Para manejar las interrupciones, tenemos que tener funciones para lidiar con ellas:

```cpp
//Function is called every time the rain bucket tips
void rainIRQ() {
  rainFlag = true;
}

//Function is called when the magnet in the anemometer is activated
void wspeedIRQ() {
  windFlag = true;
}
```

Ahora podemos escribir nuestro `loop ()` principal para recopilar y enviar datos.

```cpp
void loop() {
  myPoint.clearFields(); // clear out the previous data
  if (influx.isBufferFull()) {
    influx.setInsecure(false);
    influx.flushBuffer();
  }
  digitalWrite(LED_BUILTIN, HIGH); // turn the LED on (HIGH is the voltage level)
  int rssi = WiFi.RSSI();
  myPoint.addField("RSSI", rssi);
  myPoint.addField("temp", tempSensor.readTempC());
  myPoint.addField("humidity", tempSensor.readFloatHumidity());
  myPoint.addField("pressure", tempSensor.readFloatPressure());
  myPoint.addField("altitude", tempSensor.readFloatAltitudeFeet());
  myPoint.addField("uva", uv.uva());
  myPoint.addField("uvb", uv.uvb());
  myPoint.addField("uv_index", uv.index());
  myPoint.addField("soil_moisture", readSoil());
  myPoint.addField("wind_degrees", getWindDirection());
  //Check interrupt flags
  if (rainFlag == true) {
    rainFlag = false;
    myPoint.addField("rain", 0.2794); // each bucket-tip is 0.2794" of rain
  }
  // if the anemometer is moving, we will take 30 readings and use that for our wind-speed
  if (windFlag == true) {
    windFlag = false;
    int speed = 0;
    for (int x = 0; x < 30; x++) {
      if (WSPEED) {
        speed++;
      }
      delay(100);
    }
    double w_speed = (speed * 3.33) * 2.4;
    myPoint.addField("wind_speed", speed);
  }
  // get data from the CO2 sensor. We can use its temp/humidity to validate the BME280
  if (airSensor.dataAvailable()) {
    int co2 = airSensor.getCO2();
    float temp_c = airSensor.getTemperature();
    float hum = airSensor.getHumidity();
    myPoint.addField("co2", co2);
    myPoint.addField("c_temp_c", temp_c);
    myPoint.addField("c_humidity", hum);
  }
  read_aqi();
  // Hardware has alerted us to an event, now we read the interrupt register
  if (digitalRead(lightningInt) == HIGH) {
    intVal = lightning.readInterruptReg();
    if (intVal == NOISE_INT) {
      // Too much noise? Uncomment the code below, a higher number means better
      // noise rejection.
      //lightning.setNoiseLevel(noise);
    }
    else if (intVal == DISTURBER_INT) {
      // Too many disturbers? Uncomment the code below, a higher number means better
      // disturber rejection.
      //lightning.watchdogThreshold(disturber);
    } else if (intVal == LIGHTNING_INT) {
      // Lightning! Now how far away is it? Distance estimation takes into
      // account any previously seen events in the last 15 seconds.
      byte distance = lightning.distanceToStorm();
      myPoint.addField("lightning_event", true);
      myPoint.addField("ligthning_km", distance);
    }
  }
  influx.writePoint(myPoint);
  digitalWrite(LED_BUILTIN, LOW); // turn the LED off by making the voltage LOW
  // may have to adjust this for battery life
  delay(3000);
}
```

Lo único que no está cubierto es la lectura del sensor PM2.5, que moví a la función `read_aqi ()`, la lectura de la humedad del suelo, que está en la función `readSoil ()`, y obteniendo la dirección del viento que está en la función `getWindDirection ()`:

```cpp
void read_aqi() {
  aqiPoint.clearFields();
  PM25_AQI_Data data;
  if (!aqi.read(&data)) {
    Serial.println("Could not read from AQI");
    return;
  }
  aqiPoint.addField("pm_10_stand", data.pm10_standard);
  aqiPoint.addField("pm_25_stand", data.pm25_standard);
  aqiPoint.addField("pm_100_stand", data.pm100_standard);
  aqiPoint.addField("pm_10_env", data.pm10_env);
  aqiPoint.addField("pm_25_env", data.pm25_env);
  aqiPoint.addField("pm_100_env", data.pm100_env);
  aqiPoint.addField("part_03um", data.particles_03um);
  aqiPoint.addField("part_05um", data.particles_05um);
  aqiPoint.addField("part_10um", data.particles_10um);
  aqiPoint.addField("part_25um", data.particles_25um);
  aqiPoint.addField("part_50um", data.particles_50um);
  aqiPoint.addField("part_100um", data.particles_100um);
  influx.writePoint(aqiPoint);
}

int readSoil() {
  int moistVal = 0; //Variable for storing moisture value
  //Power Sensor
  digitalWrite(soilPower, HIGH);
  delay(10);
  moistVal = analogRead(soilPin); //Read the SIG value from sensor
  digitalWrite(soilPower, LOW);   //Turn the sensor off
  return moistVal;                //Return current moisture value
}

int getWindDirection() {
  unsigned int adc;
  adc = analogRead(WDIR); //get the current readings from the sensor
  if (adc < 380)
    return (113);
  if (adc < 393)
    return (68);
  if (adc < 414)
    return (90);
  if (adc < 456)
    return (158);
  if (adc < 508)
    return (135);
  if (adc < 551)
    return (203);
  if (adc < 615)
    return (180);
  if (adc < 680)
    return (23);
  if (adc < 746)
    return (45);
  if (adc < 801)
    return (248);
  if (adc < 833)
    return (225);
  if (adc < 878)
    return (338);
  if (adc < 913)
    return (0);
  if (adc < 940)
    return (293);
  if (adc < 967)
    return (315);
  if (adc < 990)
    return (270);
  return (-1);
}
```

Y eso me da todo lo que necesito. Todos los datos del sensor se recopilan y se escriben en InfluxDB.

¡Todo lo que tengo que hacer es sacarlo todo afuera y dejar que se rompa! Luego inicie sesión en mi instancia de InfluxDB y vea si ingresan datos:

![Gráfico de datos de temperatura entrantes](/posts/category/iot/iot-hardware/camunda-iot-part-2/images/dashboard.jpg)

Sí, ¡esos son los datos de temperatura que están llegando bien!

## Conclusión

Ahora tengo una estación meteorológica en pleno funcionamiento que recopila datos de temperatura, presión y humedad, datos de rayos, datos de CO <sub>2</sub> y datos de partículas de aire y los almacena todo en una base de datos.

El siguiente paso es construir e implementar todos los sensores para el invernadero (los sensores interiores). Una vez que tenga todos esos implementados, puedo comenzar a activar eventos desde la base de datos.

Después de que la base de datos active los eventos correctamente, será el momento (¡finalmente!) De definir algunos procesos BPMN en torno a esos eventos para que pueda controlar adecuadamente el entorno dentro de mi invernadero en función de las condiciones tanto dentro como fuera del invernadero. Estoy muy emocionado con la última parte.

Me encantaría [saber de ti](mailto:davidgs@davidgs.com) sobre cómo crees que puedo usar [Camunda] (https://camunda.com?ref=davidgsIoT) para controlar las condiciones del invernadero. Tengo mis propias ideas, ¡pero me encantaría escuchar las tuyas!
