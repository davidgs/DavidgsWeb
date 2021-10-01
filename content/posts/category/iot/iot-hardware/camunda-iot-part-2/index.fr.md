---
title: "Projet Camunda IoT, Partie II"
Date: 2021-06-08
Author: davidgs
Category: IoT
Tags: connectivity, Internet Anywhere, IoT, Camunda
Slug: camunda-iot-part-2
hero: images/header.jpg
---

Il s'agit de la deuxième partie de la série couvrant un projet de preuve de concept (PoC) sur lequel je travaille dans le cadre de mon travail en tant qu'avocat principal des développeurs chez [Camunda] (https://camunda.com?ref=davidgsIoT). Je ne sais pas combien de messages seront dans la série, mais bon, au moins deux ? Si vous avez manqué la [Partie I](/posts/category/camunda/iot-project), vous voudrez peut-être la rattraper avant de continuer.

Cette partie du projet était la première version matérielle du projet. J'ai maintenant construit et déployé une station météo extérieure complète pour recueillir des données sur les conditions météorologiques actuelles à l'extérieur de la serre. Cela me permettra de comparer les conditions à l'intérieur de la serre avec les conditions à l'extérieur de la serre et de compenser en conséquence.

## Liste des pieces

Voici la liste complète des pièces que j'ai utilisé. Cela diffère légèrement de la liste des pièces dans [Partie I](/posts/category/camunda/iot-project). Cela est principalement dû au fait que je ne suis pas au courant d'une partie légèrement différente qui rendra les choses *beaucoup* plus faciles. Il intègre également déjà le capteur de foudre, le BME280 pour la température, la pression et l'humidité, et l'entrée d'humidité du sol.

| Capteur | Prix |
|--------|-------|
| [Station météo](https://www.sparkfun.com/products/15901) | 79,95 $ |
| [MicroMod ESP32](https://www.sparkfun.com/products/16781) | 14,95 $ |
| [Carte porteuse météo MicroMod](https://www.sparkfun.com/products/16794)| 44,95 $ |
| [Batterie LiPo](https://www.sparkfun.com/products/13856) | 26,95 $ |
| [Chargeur solaire](https://www.sparkfun.com/products/12885) | 26,95 $ |
| [Panneau solaire](https://www.sparkfun.com/products/13783) | 59,00 $ |
| [Humidité du sol](https://www.sparkfun.com/products/13637) | 6,95 $ |
| [ <sub>Capteur de CO 2</sub> ](https://www.sparkfun.com/products/15112) | 59,95 $ |
| **Total** | **319,65 $** |


J'avais aussi un capteur Adafruit [PM2.5](https://www.adafruit.com/product/4632) qui traînait (c'est 44,95 $), donc je l'ai ajouté aussi.

## Construire la station météo

Maintenant que j'avais toutes les pièces, il était temps de commencer à les assembler, de concevoir et d'imprimer des boîtiers pour tout contenir. J'aurais pu faire une seule boîte pour tout contenir, mais cela signifierait concevoir une **très** grande boîte, avec le long temps d'impression requis.

Commençons par l'alimentation. Comme il s'agira d'un déploiement extérieur, j'ai décidé de le faire fonctionner à l'énergie solaire, avec une batterie, bien sûr.

### Alimenter le tout

Le premier problème était que la carte Solar Buddy n'a pas de sortie USB. Il n'a qu'un `load` avec `+` et `-` dessus. La station météo, bien sûr, n'a pas de broches `vcc` et `G`, mais *seulement* fonctionne avec USB-C. J'ai donc dû réparer ça. Heureusement, j'ai acheté une cargaison de câbles de connexion résistants aux intempéries, j'ai donc commandé des extrémités USB-C et en ai soudé une !

![Connecteur étanche à 2 fils](/posts/category/iot/iot-hardware/camunda-iot-part-2/images/camunda-iot-7.png)

![Connecteur étanche à 2 fils avec connecteur USB-C](/posts/category/iot/iot-hardware/camunda-iot-part-2/images/camunda-iot-8.png)

![Connecteur USB-C avec gaine thermorétractable](/posts/category/iot/iot-hardware/camunda-iot-part-2/images/camunda-iot-9.png)

Une fois que cela a été construit, il était temps de concevoir une boîte pour tout contenir. Comme il s'agissait d'un appareil d'extérieur, j'ai essayé de le rendre étanche en créant des bords biseautés très serrés sur le couvercle. La planche a l'air petite dans la boîte :

![Boîte imprimée personnalisée avec panneau solaire dedans](/posts/category/iot/iot-hardware/camunda-iot-part-2/images/camunda-iot-1.png)

J'ai dû souder le nouveau connecteur USB-C *après* avoir inséré la carte. Et elle a l'air petite dans la boîte, mais une fois la batterie insérée, c'est une boîte assez pleine !

![boîte imprimée personnalisée avec batterie dedans](/posts/category/iot/iot-hardware/camunda-iot-part-2/images/camunda-iot-3.png)

Vous pouvez voir les bords biseautés sur le couvercle lorsqu'il est glissé :

![Couvercle poussé sur la boîte](/posts/category/iot/iot-hardware/camunda-iot-part-2/images/camunda-iot-4.png)

Le couvercle est bien ajusté, ce qui, espérons-le, le gardera au sec!

![couvercle bien ajusté sur la boîte](/posts/category/iot/iot-hardware/camunda-iot-part-2/images/camunda-iot-5.png)

Et j'ai même rendu étanche la sortie des câbles :

![câbles sous film rétractable sortant de la boîte](/posts/category/iot/iot-hardware/camunda-iot-part-2/images/camunda-iot-6.png)

Espérons que le panneau solaire gardera la batterie remplie afin que la station météo fonctionne en continu. Je devrai ajuster le temps passé à dormir afin de maximiser les données et de minimiser l'épuisement de la batterie.

### Construire les capteurs

L'un des avantages de l'utilisation de cette carte Weather Carrier par rapport à mon approche précédente est que la plupart des capteurs que je voulais incorporer sont inclus sur la carte Carrier, donc j'avais très peu de choses à construire.

L'ajout de l'Adafruit [PM2.5](https://www.adafruit.com/product/4632) consistait à brancher un câble QWIIC entre la carte porteuse et le capteur. Oui, c'était vraiment si facile.

Étant donné que le système QWIIC permet le pass-through et que la carte PM2.5 a un tel pass-through, j'ai décidé de me fabriquer un câble pour le [ <sub>capteur CO 2</sub> ](https://www.sparkfun.com/products/15112). Cela impliquait de couper un fil de connecteur QWIIC en deux et de souder les fils dans les bons trous (I2C ne nécessite que 4 fils) sur le capteur. Je pourrais alors brancher le <sub>capteur de CO 2</sub> dans le capteur PM2.5, avec un minimum de soudure.

> Pour ceux qui sont curieux, le [SparkFun QWIIC Connect System](https://www.sparkfun.com/qwiic) utilise des connecteurs JST à 4 broches pour connecter `VCC`, `GND`, `SDA` et `SDC` sur les appareils avec le connecteur approprié. C'est très utile et rend les branchements de capteurs un jeu d'enfant.

J'avais maintenant un système de capteurs complet qui collectait *toutes* les données environnementales extérieures que je voulais sur une seule carte, avec seulement 2 capteurs externes. Et tout cela avec seulement 4 fils à souder.

## Le boîtier du capteur

Cette boîte allait être un peu plus délicate. Il devait être étanche, comme le boîtier de la batterie, mais il devait permettre un flux d'air libre constant à travers l'appareil afin d'obtenir des lectures précises. Ce capteur n'était pas simplement déployé à l'extérieur, mais fondamentalement, il doit être à l'extérieur et * sans abri * afin qu'il puisse obtenir les meilleures lectures.

Heureusement, j'avais déjà proposé une conception pour de tels déploiements. C'est une boîte avec des persiennes orientées vers le haut pour que l'air puisse circuler, mais la pluie et l'eau ne peuvent pas entrer car il ne pleut généralement pas *.

Voici à quoi ils ressemblent dans le rendu du modèle 3D :

{{< video "Box detail" "/posts/category/iot/iot-hardware/camunda-iot-part-2/images/model.mp4" >}}

Si vous regardez de près le dessus ouvert de ce modèle, vous pouvez voir que j'ai conçu le dessus comme une glissière avec des rainures biseautées à l'arrière dans l'espoir de garder la chose exempte de fuites. Là où le haut du couvercle rencontre le haut de la boîte, je l'ai également biseauté en arrière pour la même raison.

![Détail de la boîte montrant les rainures en biseau arrière pour le dessus](/posts/category/iot/iot-hardware/camunda-iot-part-2/images/lids.jpg)

J'ai mis des broches pour que la carte puisse être fixée à la boîte (il suffit de faire fondre les broches avec le fer à souder) pour qu'il n'y ait pas de cliquetis, et la boîte est complète.

![l'impression 3D terminée de la boîte](/posts/category/iot/iot-hardware/camunda-iot-part-2/images/camunda-iot-13.png)

Tout s'intègre alors parfaitement à l'intérieur de la boîte sans trop d'encombrement (encore une fois, nous avons besoin d'un flux d'air !), mais dans un espace minimal.

![La boîte avec tous les capteurs à l'intérieur et prête à déployer](/posts/category/iot/iot-hardware/camunda-iot-part-2/images/camunda-iot-16.png)

Je pourrais alors faire glisser le couvercle, brancher les connecteurs de la station météo et tout est prêt pour sortir dehors !

![La boîte toute fermée avec tous les fils qui sortent](/posts/category/iot/iot-hardware/camunda-iot-part-2/images/camunda-iot-18.png)


C'est donc la partie matérielle, mais qu'en est-il du logiciel pour que tout fonctionne ? Eh bien, lisez la suite pour ça!

## Logiciel de station météo

Avoir tout ce matériel dans une belle boîte compacte (et, espérons-le, étanche) est génial et tout, mais sans une bonne quantité de logiciels, ce serait une perte de temps. Alors plongeons-nous dans un peu de code !

### Accéder aux capteurs

Par chance, SparkFun fournit un joli petit programme de "test" pour le Weather Carrier Board, qui était un point de départ fantastique pour que tout fonctionne.

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

Cela me donne accès à tous les capteurs, au wifi et à InfluxDB où je vais stocker les données pour le moment.

Je vais aussi devoir définir certaines choses :

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
J'utilise le `SENSOR_ID` comme balise dans InfluxDB, et comme cette balise ne change jamais, j'utilise un `#define` pour cela.

Quelques variables :

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

Étant donné que mon instance InfluxDBv2 s'exécute via TLS, je devrai également inclure un certificat de la chaîne de certification :

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

Ensuite, je peux tout configurer dans ma fonction `setup()` :

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

À ce stade, l'ensemble du système est maintenant configuré, connecté à tous les capteurs, connecté au WiFi et connecté à InfluxDB. À partir de maintenant, il s'agit de gérer les interruptions, de lire les capteurs et d'écrire les données.

Afin de gérer les interruptions, nous devons avoir des fonctions pour les gérer :

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

Maintenant, nous pouvons écrire notre `loop()` principale pour collecter et envoyer des données.

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

La seule chose qui n'est pas couverte ici est la lecture du capteur PM2.5, que j'ai déplacé dans la fonction `read_aqi()`, la lecture de l'humidité du sol, qui est dans la fonction `readSoil()`, et obtenir la direction du vent qui est dans la fonction `getWindDirection()` :

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

Et cela me donne tout ce dont j'ai besoin. Toutes les données du capteur sont collectées et écrites dans InfluxDB.

Tout ce que j'ai à faire, c'est de tout sortir dehors et de le laisser déchirer ! Connectez-vous ensuite à mon instance InfluxDB et voyez si des données arrivent :

![Graphique des données de température entrantes](/posts/category/iot/iot-hardware/camunda-iot-part-2/images/dashboard.jpg)

Oui, ce sont bien les données de température qui arrivent !

## Conclusion

J'ai maintenant une station météorologique entièrement fonctionnelle qui collecte des données sur la température, la pression et l'humidité, les données sur les coups de foudre, les données sur le CO <sub>2</sub> et les données sur les particules atmosphériques et stocke le tout dans une base de données.

L'étape suivante consiste à construire et à déployer tous les capteurs de la serre (les capteurs intérieurs). Une fois que tous ces éléments sont déployés, je peux commencer à déclencher des événements à partir de la base de données.

Une fois que la base de données aura correctement déclenché les événements, il sera temps (enfin !) de définir des processus BPMN autour de ces événements afin que je puisse contrôler correctement l'environnement à l'intérieur de ma serre en fonction des conditions à la fois à l'intérieur et à l'extérieur de la serre. Je suis vraiment excité à propos de cette dernière partie.

J'aimerais [avoir de vos nouvelles](mailto:davidgs@davidgs.com) sur la façon dont vous pensez que je peux utiliser [Camunda](https://camunda.com?ref=davidgsIoT) pour contrôler les conditions de la serre. J'ai mes propres idées, mais j'aimerais entendre les vôtres!
