---
title: "Camunda IoT-Projekt, Teil II"
Date: 2021-06-02
Author: davidgs
Category: IoT
Tags: connectivity, Internet Anywhere, IoT, Camunda
Slug: camunda-iot-part-2
hero: images/header.jpg
---

Dies ist Teil II der Serie über ein Proof of Concept (PoC)-Projekt, an dem ich im Rahmen meiner Tätigkeit als Principal Developer Advocate bei [Camunda] (https://camunda.com?ref=davidgsIoT) arbeite. Ich bin mir nicht sicher, wie viele Posts in der Serie enthalten sein werden, aber, na ja, mindestens zwei? Wenn Sie [Teil I](/posts/category/camunda/iot-project) verpasst haben, möchten Sie es vielleicht nachholen, bevor Sie fortfahren.

Dieser Teil des Projekts war der erste Hardware-Build des Projekts. Ich habe jetzt eine komplette Outdoor-Wetterstation gebaut und eingesetzt, um Daten über die aktuellen Wetterbedingungen außerhalb des Gewächshauses zu sammeln. Dadurch kann ich die Bedingungen im Gewächshaus mit den Bedingungen außerhalb des Gewächshauses vergleichen und entsprechend kompensieren.

## Liste der Einzelteile

Hier ist die komplette Teileliste, die ich verwendet habe. Dies unterscheidet sich geringfügig von der Stückliste in [Teil I](/posts/category/camunda/iot-project). Dies liegt hauptsächlich daran, dass ich mir eines etwas anderen Teils nicht bewusst bin, der die Dinge *viel* einfacher machen wird. Auch der Blitzsensor BME280 für Temperatur, Druck und Feuchte sowie der Bodenfeuchteeingang sind bereits integriert.

| Sensor | Preis |
|--------|-------|
| [Wetterstation](https://www.sparkfun.com/products/15901) | $79,95 |
| [MicroMod ESP32](https://www.sparkfun.com/products/16781) | 14,95 $ |
| [MicroMod Weather Carrier Board](https://www.sparkfun.com/products/16794)| 44,95 $ |
| [LiPo-Akku](https://www.sparkfun.com/products/13856) | $26,95 |
| [Solarladegerät](https://www.sparkfun.com/products/12885) | $26,95 |
| [Solarpanel](https://www.sparkfun.com/products/13783) | $59.00 |
| [Bodenfeuchtigkeit](https://www.sparkfun.com/products/13637) | $6.95 |
| [CO <sub>2</sub> Sensor](https://www.sparkfun.com/products/15112) | $59.95 |
| **Gesamt** | **319,65 $** |


Ich hatte auch einen Adafruit [PM2.5](https://www.adafruit.com/product/4632) Sensor herumhängen (es kostet $44,95), also habe ich auch den hinzugefügt.

##Die Wetterstation bauen

Nachdem ich alle Teile hatte, war es an der Zeit, sie zusammenzubauen und einige Gehäuse zu entwerfen und zu drucken, die alles aufnehmen. Ich hätte eine einzelne Schachtel herstellen können, um alles aufzunehmen, aber das würde bedeuten, eine **sehr** große Schachtel mit der erforderlichen langen Druckzeit zu entwerfen.

Beginnen wir mit der Stromversorgung. Da dies eine Außenanwendung sein wird, habe ich mich entschieden, es solarbetrieben zu machen, natürlich mit einer Batterie.

### Das Ganze mit Strom versorgen

Das erste Problem war, dass das Solar Buddy Board keinen USB-Ausgang hat. Es hat nur ein `load` mit `+` und `-` drauf. Die Wetterstation hat natürlich keine `vcc` und `G` Pins, sondern funktioniert *nur* mit USB-C. Also musste ich das beheben. Zum Glück habe ich eine Bootsladung wetterfester Anschlussdrähte gekauft, also einige USB-C-Enden bestellt und einen verlötet!

![2-adriger wasserdichter Stecker](/posts/category/iot/iot-hardware/camunda-iot-part-2/images/camunda-iot-7.png)

![Wasserdichter 2-adriger Anschluss mit USB-C-Anschluss](/posts/category/iot/iot-hardware/camunda-iot-part-2/images/camunda-iot-8.png)

![USB-C-Stecker mit Schrumpfschlauch](/posts/category/iot/iot-hardware/camunda-iot-part-2/images/camunda-iot-9.png)

Sobald das gebaut war, war es an der Zeit, eine Box zu entwerfen, die alles aufnehmen konnte. Da es sich um ein Outdoor-Gerät handeln sollte, versuchte ich, es wasserdicht zu machen, indem ich sehr enge, abgeschrägte Kanten am Deckel machte. Im Karton sieht das Board klein aus:

![Individuell bedruckte Box mit Solarplatine darin](/posts/category/iot/iot-hardware/camunda-iot-part-2/images/camunda-iot-1.png)

Ich musste den neumodischen USB-C-Anschluss anlöten, *nachdem* ich das Board eingesteckt hatte. Und es sieht klein aus in der Box, aber wenn der Akku einmal drin ist, ist es eine ziemlich volle Box!

![individuell bedruckte Box mit Batterie drin](/posts/category/iot/iot-hardware/camunda-iot-part-2/images/camunda-iot-3.png)

Sie sehen die abgeschrägten Kanten am Deckel beim Einschieben:

![Deckel wird auf die Box geschoben](/posts/category/iot/iot-hardware/camunda-iot-part-2/images/camunda-iot-4.png)

Der Deckel sitzt schön fest, was ihn hoffentlich trocken hält!

![dicht schließender Deckel auf der Box](/posts/category/iot/iot-hardware/camunda-iot-part-2/images/camunda-iot-5.png)

Und ich habe es sogar wasserdicht gemacht, wo die Kabel herauskommen:

![eingeschweißte Kabel, die aus der Box kommen](/posts/category/iot/iot-hardware/camunda-iot-part-2/images/camunda-iot-6.png)

Hoffentlich hält das Solarpanel die Batterie auf, damit die Wetterstation kontinuierlich läuft. Ich muss die Schlafzeit anpassen, um die Daten zu maximieren und die Batterieentladung zu minimieren.

###Die Sensoren bauen

Einer der Vorteile der Verwendung dieser Wetterträgerplatine gegenüber meinem vorherigen Ansatz besteht darin, dass viele der Sensoren, die ich integrieren wollte, auf der Trägerplatine enthalten sind, sodass ich nur sehr wenig bauen musste.

Beim Hinzufügen des Adafruit [PM2.5](https://www.adafruit.com/product/4632) musste ein QWIIC-Kabel zwischen der Trägerplatine und dem Sensor angeschlossen werden. Ja, es war wirklich so einfach.

Da das QWIIC-System Pass-Through zulässt und das PM2.5-Board über einen solchen Pass-Through verfügt, habe ich beschlossen, mir ein Kabel für den [CO <sub>2</sub> -Sensor] zu machen (https://www.sparkfun.com/products/15112 ). Dabei wurde ein QWIIC-Anschlussdraht in zwei Hälften geschnitten und die Drähte in die richtigen Löcher (I2C erfordert nur 4 Drähte) am Sensor gelötet. Ich konnte dann den CO <sub>2</sub> -Sensor mit minimalem Löten in den PM2.5-Sensor stecken.

> Für Neugierige, das [SparkFun QWIIC Connect System](https://www.sparkfun.com/qwiic) verwendet 4-polige JST-Anschlüsse, um `VCC`, `GND`, `SDA` und `SDC` . zu verbinden auf Geräten mit dem richtigen Anschluss. Es ist sehr nützlich und macht das Anschließen von Sensoren zum Kinderspiel.

Ich hatte jetzt ein komplettes Sensorsystem, das *alle* der Außenumgebungsdaten, die ich wollte, auf einer Platine mit nur 2 extern angeschlossenen Sensoren sammeln würde. Und das alles * mit nur 4 Drähten zu löten.

## Das Sensorgehäuse

Diese Box würde etwas kniffliger werden. Es musste wasserdicht sein, wie der Batteriekasten, aber es musste einen konstanten freien Luftstrom durch das Gerät ermöglichen, um genaue Messwerte zu erhalten. Dieser Sensor wurde nicht nur draußen eingesetzt, aber im Grunde muss er draußen und *ungeschützt* sein, damit er die besten Messwerte erhält.

Zum Glück hatte ich zuvor ein Design für solche Einsätze entwickelt. Es ist eine Box mit nach oben gerichteten Luftschlitzen, durch die Luft strömen kann, aber Regen und Wasser können nicht eindringen, da es im Allgemeinen nicht regnet *nach oben*.

So sehen sie im 3D-Modell-Rendering aus:

{{< video "/posts/category/iot/iot-hardware/camunda-iot-part-2/images/model.mp4" >}}

Wenn Sie sich das offene Oberteil dieses Modells genau ansehen, können Sie feststellen, dass ich das Oberteil als Einschub mit nach hinten abgeschrägten Rillen entworfen habe, in der Hoffnung, das Ding frei von Lecks zu halten. Wo die Oberseite des Deckels auf die Oberseite der Schachtel trifft, habe ich sie aus dem gleichen Grund auch nach hinten abgeschrägt.

![Detail der Box mit den rückseitig abgeschrägten Rillen für die Oberseite](/posts/category/iot/iot-hardware/camunda-iot-part-2/images/lids.jpg)

Ich stecke Stifte hinein, damit die Platine an der Box befestigt werden kann (einfach die Stifte mit dem Lötkolben schmelzen), damit es nicht klappert und die Box komplett ist.

![der fertige 3D-Druck der Box](/posts/category/iot/iot-hardware/camunda-iot-part-2/images/camunda-iot-13.png)

Alles passt dann ordentlich in die Box ohne zu viel Gedränge (wieder brauchen wir Luftstrom!), aber auf minimalem Platz.

![Die Box mit allen Sensoren drin und einsatzbereit](/posts/category/iot/iot-hardware/camunda-iot-part-2/images/camunda-iot-16.png)

Ich könnte dann den Deckel aufschieben und die Anschlüsse der Wetterstation einstecken und schon kann es nach draußen gehen!

![Die Box ist ganz geschlossen und alle Drähte kommen heraus](/posts/category/iot/iot-hardware/camunda-iot-part-2/images/camunda-iot-18.png)


Das ist also der Hardware-Teil, aber was ist mit der Software, damit alles funktioniert? Nun, lesen Sie dazu weiter!

## Wetterstationssoftware

All diese Hardware in einer schönen kompakten (und hoffentlich wasserdichten) Box zu haben, ist großartig und alles, aber ohne eine angemessene Menge an Software wäre das alles Zeitverschwendung. Tauchen wir also in Code ein!

### Auf die Sensoren zugreifen

Wie es der Zufall wollte, bietet SparkFun ein nettes kleines Testprogramm für das Weather Carrier Board, das ein fantastischer Ausgangspunkt war, um alles zum Laufen zu bringen.

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

Dadurch habe ich Zugriff auf alle Sensoren, das WLAN und InfluxDB, wo ich die Daten vorerst speichere.

Ich muss noch ein paar Dinge definieren:

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
Ich verwende die `SENSOR_ID` als Tag in InfluxDB, und da sich dieses Tag nie ändert, verwende ich ein `#define` dafür.

Einige Variablen:

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

Da meine InfluxDBv2-Instanz über TLS läuft, muss ich auch ein Zertifikat aus der cert-chain einbinden:

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
-----END CERTIFICATE-----
)EOF";
```

Dann kann ich alles in meiner `setup()`-Funktion einrichten:

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

An diesem Punkt ist nun das gesamte System eingerichtet, mit allen Sensoren verbunden, mit WiFi verbunden und mit InfluxDB verbunden. Von nun an geht es darum, die Interrupts zu handhaben, die Sensoren auszulesen und die Daten zu schreiben.

Um mit den Interrupts umzugehen, müssen wir Funktionen haben, um mit ihnen umzugehen:

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

Jetzt können wir unseren Haupt-`loop()` schreiben, um Daten zu sammeln und zu senden.

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

Das einzige, was dort nicht behandelt wird, ist das Lesen des PM2.5-Sensors, den ich in die Funktion `read_aqi()` verschoben habe, das Lesen der Bodenfeuchtigkeit, die in der Funktion `readSoil()` enthalten ist. und Abrufen der Windrichtung, die in der Funktion `getWindDirection()` enthalten ist:

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

Und das gibt mir alles, was ich brauche. Alle Sensordaten werden gesammelt und in InfluxDB geschrieben.

Alles, was ich tun muss, ist, alles nach draußen zu bringen und es krachen zu lassen! Melden Sie sich dann bei meiner InfluxDB-Instanz an und prüfen Sie, ob Daten eingehen:

![Diagramm der eingehenden Temperaturdaten](/posts/category/iot/iot-hardware/camunda-iot-part-2/images/dashboard.jpg)

Ja, das sind die Temperaturdaten, die in Ordnung kommen!

## Fazit

Ich habe jetzt eine voll funktionsfähige Wetterstation, die Temperatur-, Druck- und Feuchtigkeitsdaten, Blitzschlagdaten, CO <sub>2</sub> -Daten und Luftpartikeldaten sammelt und in einer Datenbank speichert.

Der nächste Schritt besteht darin, alle Sensoren für das Gewächshaus (die Innensensoren) zu bauen und einzusetzen. Sobald ich alle diese bereitgestellt habe, kann ich mit dem Auslösen von Ereignissen aus der Datenbank beginnen.

Nachdem die Datenbank Ereignisse ordnungsgemäß ausgelöst hat, ist es (endlich!) an der Zeit, einige BPMN-Prozesse um diese Ereignisse herum zu definieren, damit ich die Umgebung in meinem Gewächshaus basierend auf den Bedingungen sowohl innerhalb als auch außerhalb des Gewächshauses richtig steuern kann. Auf den letzten Teil freue ich mich sehr

Ich würde gerne [von Ihnen hören](mailto:davidgs@davidgs.com) darüber, wie ich Ihrer Meinung nach [Camunda](https://camunda.com?ref=davidgsIoT) verwenden kann, um die Gewächshausbedingungen zu kontrollieren. Ich habe meine eigenen Ideen, aber ich würde gerne Ihre hören!
