---
title: "Camunda IoT-project, deel II"
Date: 2021-06-02
Author: davidgs
Category: IoT
Tags: connectivity, Internet Anywhere, IoT, Camunda
Slug: camunda-iot-part-2
hero: images/header.jpg
---

Dit is deel II in de serie over een Proof of Concept (PoC)-project waaraan ik werk als onderdeel van mijn baan als Principal Developer Advocate bij [Camunda](https://camunda.com?ref=davidgsIoT). Ik weet niet zeker hoeveel berichten er in de serie zullen zijn, maar, nou ja, ten minste twee? Als je [Deel I](/posts/category/camunda/iot-project) hebt gemist, wil je dit misschien inhalen voordat je verder gaat.

Dit deel van het project was de eerste hardware-build van het project. Ik heb nu een compleet buitenweerstation gebouwd en ingezet om gegevens te verzamelen over de huidige weersomstandigheden buiten de kas. Hierdoor kan ik de omstandigheden in de kas vergelijken met de omstandigheden buiten de kas en dienovereenkomstig compenseren.

## Onderdelen lijst

Hier is de volledige onderdelenlijst die ik heb gebruikt. Dit wijkt iets af van de onderdelenlijst in [Deel I](/posts/category/camunda/iot-project). Dit komt vooral doordat ik me niet bewust ben van een iets ander deel dat de dingen *veel* gemakkelijker zal maken. Het bevat ook al de bliksemsensor, de BME280 voor temperatuur, druk en vochtigheid, en de invoer van bodemvocht.

| Sensor | Prijs |
|--------|-------|
| [Weerstation](https://www.sparkfun.com/products/15901) | $79,95 |
| [MicroMod ESP32](https://www.sparkfun.com/products/16781) | $ 14,95 |
| [MicroMod weerdragerbord](https://www.sparkfun.com/products/16794)| $44,95 |
| [LiPo-batterij](https://www.sparkfun.com/products/13856) | $26,95 |
| [Zonnelader](https://www.sparkfun.com/products/12885) | $26,95 |
| [Zonnepaneel](https://www.sparkfun.com/products/13783) | $ 59,00 |
| [Bodemvocht](https://www.sparkfun.com/products/13637) | $ 6,95 |
| [CO <sub>2</sub> Sensor](https://www.sparkfun.com/products/15112) | $ 59,95 |
| **Totaal** | **$319,65** |


Ik had ook een Adafruit [PM2.5](https://www.adafruit.com/product/4632) sensor hangen (het is $ 44,95), dus die heb ik ook toegevoegd.

## Het weerstation bouwen

Nu ik alle onderdelen had, was het tijd om ze in elkaar te zetten en enkele behuizingen te ontwerpen en te printen om alles in te bewaren. Ik had een enkele doos kunnen maken om alles in te bewaren, maar dat zou betekenen dat ik een **zeer** grote doos moet ontwerpen, met de vereiste lange printtijd.

Laten we beginnen met de voeding. Omdat dit een externe implementatie gaat worden, heb ik besloten om het op zonne-energie te maken, met een batterij natuurlijk.

### Het hele ding van stroom voorzien

Het eerste probleem was dat het Solar Buddy board geen USB-out heeft. Het heeft alleen een `load` met `+` en `-` erop. Het weerstation heeft natuurlijk geen `vcc` en `G` pinnen, maar werkt *alleen* met USB-C. Dus dat moest ik oplossen. Gelukkig kocht ik een bootlading weerbestendige connectordraden, dus bestelde ik wat USB-C-uiteinden en soldeerde er een!

![2-draads waterdichte connector](/posts/category/iot/iot-hardware/camunda-iot-part-2/images/camunda-iot-7.png)

![2-draads waterdichte connector met USB-C-connector](/posts/category/iot/iot-hardware/camunda-iot-part-2/images/camunda-iot-8.png)

![USB-C-connector met krimpkous](/posts/category/iot/iot-hardware/camunda-iot-part-2/images/camunda-iot-9.png)

Toen dat eenmaal was gebouwd, was het tijd om een doos te ontwerpen om alles in te bewaren. Omdat dit een apparaat voor buiten zou worden, heb ik geprobeerd het waterdicht te maken door zeer strakke, afgeschuinde randen op het deksel te maken. Het bord ziet er klein uit in de doos:

![Op maat bedrukte doos met zonnepaneel erin](/posts/category/iot/iot-hardware/camunda-iot-part-2/images/camunda-iot-1.png)

Ik moest de ouderwetse USB-C-connector op *nadat* ik het bord erin had gesoldeerd. En het ziet er klein uit in de doos, maar als de batterij erin zit, is het een behoorlijk volle doos!

![op maat bedrukte doos met batterij erin](/posts/category/iot/iot-hardware/camunda-iot-part-2/images/camunda-iot-3.png)

U kunt de afgeschuinde randen op het deksel zien als het erin wordt geschoven:

![Deksel wordt op de doos geduwd](/posts/category/iot/iot-hardware/camunda-iot-part-2/images/camunda-iot-4.png)

Het deksel zit lekker strak, waardoor het hopelijk droog blijft!

![goed sluitend deksel op de doos](/posts/category/iot/iot-hardware/camunda-iot-part-2/images/camunda-iot-5.png)

En ik heb het zelfs waterdicht gemaakt waar de kabels uitkomen:

![in krimpfolie verpakte kabels die uit de doos komen](/posts/category/iot/iot-hardware/camunda-iot-part-2/images/camunda-iot-6.png)

Hopelijk zorgt het zonnepaneel ervoor dat de batterij vol blijft, zodat het weerstation continu blijft werken. Ik moet de slaaptijd aanpassen om de gegevens te maximaliseren en het leeglopen van de batterij tot een minimum te beperken.

### De sensoren bouwen

Een van de voordelen van het gebruik van dit Weather Carrier-bord ten opzichte van mijn vorige aanpak, is dat veel van de sensoren die ik wilde opnemen op het draagbord zijn opgenomen, dus ik had heel weinig om daadwerkelijk te bouwen.

Het toevoegen van de Adafruit [PM2.5](https://www.adafruit.com/product/4632) was een kwestie van het aansluiten van een QWIIC-kabel tussen het draagbord en de sensor. Ja, het was echt zo makkelijk.

Omdat het QWIIC-systeem pass-through mogelijk maakt en het PM2.5-bord zo'n pass-through heeft, heb ik besloten om voor mezelf een kabel te maken voor de [CO <sub>2</sub> Sensor](https://www.sparkfun.com/products/15112 ). Het betrof het doormidden knippen van een QWIIC-connectordraad en het solderen van de draden in de juiste gaten (I2C vereist slechts 4 draden) op de sensor. Ik kon dan de CO <sub>2</sub> -sensor aansluiten op de PM2.5-sensor, met minimaal solderen.

> Voor degenen die nieuwsgierig zijn, het [SparkFun QWIIC Connect-systeem](https://www.sparkfun.com/qwiic) gebruikt 4-pins JST-connectoren om `VCC`, `GND`, `SDA` en `SDC` aan te sluiten op apparaten met de juiste connector. Het is erg handig en maakt sensoraansluitingen een fluitje van een cent.

Ik had nu een compleet sensorsysteem dat *alle* buitenomgevingsgegevens die ik wilde op één bord zou verzamelen, met slechts 2 extern bevestigde sensoren. En dat alles * met slechts 4 draden te hoeven solderen.

## De sensorbehuizing

Deze doos zou een beetje lastiger zijn. Het moest waterdicht zijn, net als de batterijdoos, maar het moest een constante vrije luchtstroom door het apparaat mogelijk maken om nauwkeurige metingen te krijgen. Deze sensor werd niet net buiten ingezet, maar in principe moet hij buiten en *onbeschut* zijn, zodat hij de beste metingen kan krijgen.

Gelukkig had ik eerder een ontwerp bedacht voor precies zulke implementaties. Het is een doos met naar boven gerichte lamellen zodat lucht er doorheen kan stromen, maar regen en water kunnen er niet in omdat het over het algemeen niet *omhoog* regent.

Zo zien ze eruit in de 3D-modelweergave:

{{< video "/posts/category/iot/iot-hardware/camunda-iot-part-2/images/model.mp4" >}}

Als je goed naar de open bovenkant van dat model kijkt, kun je zien dat ik de bovenkant heb ontworpen als een schuif met afgeschuinde groeven aan de achterkant in de hoop het ding lekvrij te houden. Waar de bovenkant van het deksel de bovenkant van de doos raakt, heb ik het om dezelfde reden ook naar achteren afgeschuind.

![Detail van de doos met de naar achteren afgeschuinde groeven voor de bovenkant](/posts/category/iot/iot-hardware/camunda-iot-part-2/images/lids.jpg)

Ik heb er pinnen in gedaan zodat het bord aan de doos kan worden vastgemaakt (smelt de pinnen gewoon met de soldeerbout) zodat er geen gerammel is en de doos is compleet.

![de voltooide 3D-print van de doos](/posts/category/iot/iot-hardware/camunda-iot-part-2/images/camunda-iot-13.png)

Alles past dan netjes in de doos zonder al te veel drukte (nogmaals, we hebben luchtstroom nodig!), maar in minimale ruimte.

![De doos met alle sensoren erin en klaar voor gebruik](/posts/category/iot/iot-hardware/camunda-iot-part-2/images/camunda-iot-16.png)

Ik zou dan het deksel erop kunnen schuiven en de connectoren van het weerstation kunnen aansluiten en het is allemaal klaar om naar buiten te gaan!

![De doos ging helemaal dicht en alle draden kwamen eruit](/posts/category/iot/iot-hardware/camunda-iot-part-2/images/camunda-iot-18.png)


Dus dat is het hardwaregedeelte, maar hoe zit het met de software om het allemaal te laten werken? Nou, lees daarvoor verder!

## Weerstationsoftware

Het hebben van al die hardware in een mooie compacte (en hopelijk waterdichte) doos is geweldig en zo, maar zonder een behoorlijke hoeveelheid software zou het allemaal tijdverspilling zijn. Dus laten we in een code duiken!

### Toegang tot de sensoren

Gelukkig heeft SparkFun een leuk klein `test`-programma voor het Weather Carrier Board, wat een fantastische startplaats was om alles te laten werken.

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

Dat geeft me toegang tot alle sensoren, de wifi en InfluxDB waar ik de gegevens voorlopig zal opslaan.

Ik zal ook een paar dingen moeten definiëren:

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
Ik gebruik de `SENSOR_ID` als een tag in InfluxDB, en aangezien die tag nooit verandert, gebruik ik er een `#define` voor.

Enkele variabelen:

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

Aangezien mijn InfluxDBv2-instantie via TLS draait, moet ik ook een certificaat van de cert-keten toevoegen:

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

Dan kan ik alles instellen in mijn `setup()`-functie:

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

Op dit punt is het hele systeem nu ingesteld, verbonden met alle sensoren, verbonden met wifi en verbonden met InfluxDB. Vanaf nu is het een kwestie van de interrupts afhandelen, de sensoren lezen en de gegevens schrijven.

Om de interrupts af te handelen, moeten we functies hebben om ermee om te gaan:

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

Nu kunnen we onze belangrijkste `loop()` schrijven om gegevens te verzamelen en te verzenden.

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

Het enige dat daar niet wordt behandeld, is het lezen van de PM2.5-sensor, die ik heb verplaatst naar de functie `read_aqi()`, het uitlezen van het bodemvocht, dat zich in de functie `readSoil()` bevindt, en het verkrijgen van de windrichting die in de functie `getWindDirection()` staat:

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

En dat geeft me alles wat ik nodig heb. Alle sensorgegevens worden verzameld en naar InfluxDB geschreven.

Ik hoef het alleen maar mee naar buiten te nemen en het te laten scheuren! Log vervolgens in op mijn InfluxDB-instantie en kijk of er gegevens binnenkomen:

![Grafiek van inkomende temperatuurgegevens](/posts/category/iot/iot-hardware/camunda-iot-part-2/images/dashboard.jpg)

Ja, dat zijn de temperatuurgegevens die binnenkomen!

## Conclusie

Ik heb nu een volledig functionerend weerstation dat temperatuur-, druk- en vochtigheidsgegevens, blikseminslaggegevens, CO <sub>2</sub> -gegevens en luchtdeeltjesgegevens verzamelt en opslaat in een database.

De volgende stap is het bouwen en inzetten van alle sensoren voor de kas (de interieursensoren). Zodra ik die allemaal heb geïmplementeerd, kan ik gebeurtenissen uit de database activeren.

Nadat de database gebeurtenissen correct heeft geactiveerd, wordt het tijd (eindelijk!) om enkele BPMN-processen rond die gebeurtenissen te definiëren, zodat ik de omgeving in mijn kas goed kan controleren op basis van omstandigheden zowel binnen als buiten de kas. Ik ben erg enthousiast over dat laatste deel.

Ik zou graag [van u horen](mailto:davidgs@davidgs.com) over hoe u denkt dat ik [Camunda](https://camunda.com?ref=davidgsIoT) kan gebruiken om de kasomstandigheden te beheersen. Ik heb mijn eigen ideeën, maar ik hoor graag de jouwe!
