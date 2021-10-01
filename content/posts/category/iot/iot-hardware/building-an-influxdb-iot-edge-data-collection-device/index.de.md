---
title: "Der Aufbau einer InfluxDB IoT Edge-Data Collection Device"
Date: 2018-07-20
Author: davidgs
Category: Gadgetry, IoT
Tags: InfluxData, InfluxDB, IoT, IoT Data, IoT Gateway
Slug: building-an-influxdb-iot-edge-data-collection-device
hero: images/IMG_4086.png
---

Ich habe gesagt ich dieses ganzes Projekt schreiben wollte nun schon seit einiger Zeit, aber es war so eine schwierige Aufgabe, dass ich es ausgeschaltet worden setzen, das Starten und Stoppen, und in der Regel nicht, dass es für ein paar Monate getan. Schließlich habe ich es! Dies ist sowohl eine Hardware-Aufbau und eine Software zu bauen, und es gibt eine ** ** viel von sich bewegenden Teilen, so vorbereitet werden!

## Überblick

Ich wollte ein Demo-System bauen, das die Fähigkeiten der Verwendung InfluxData zeigen würde - der gesamten TICK Stack - am äußersten Rande einer IoT Architektur. Während viele Unternehmen auf der Wolke für IoT Datensammlung wetten, verstehe ich, dass für einige - vor allem im Raum Industrie IoT - eine Cloud-erste Strategie ist einfach ein Rohrkrepierer. Darüber hinaus mit einer Vielzahl von Netzwerkkonnektivität Modalitäten - WiFi, BLE, LoRAWAN usw. - eingesetzt wird, an einem gewissen Punkt, den Sie einfach eine Randeinrichtung haben müssen, um Ihre End-Sensoren zu verbinden. Im Grunde wollte ich diese Architektur-Diagramm zusammen im wirklichen Leben ziehen.

![Die Architektur](/posts/category/iot/iot-hardware/images/architecture.gif)

So hatte ich eine Reihe von Sensoren zu bauen, und dann eine Kantendatum Sammelbox, bauen und sie dann an das Internet anschließen und es muß die Wolken zurück Streckendaten. Beginnen wir mit dem Sensor baut.

## Die Hardware

Wie oben erwähnt, wollte ich so viele Sensoren und Kommunikationsprotokolle zu übernehmen, wie ich konnte, um ein möglichst breites Einsatzszenario zu decken. I schließlich den Aufbau einer CO2-Sensor angeschlossen über BlueTooth Low Energy (BLE), einer Temperatur, Feuchte, Druck, sichtbares Licht und Infrarot-Sensor über WLAN verbunden ist, einen Strahlungssensor verbunden über LoRAWAN und einen berührungslosen Temperatursensor auch über LoRaWan verbunden. Das ist eine Menge von Sensoren zu bauen, und eine Menge von HF-Protokollen zu integrieren.

### Der WiFi-Sensor

Lassen Sie uns angehen diesen einen ersten, sollen wir? Hier ist die Stückliste Sie diese bauen müssen:

- [Particle Photon](https://store.particle.io)
- Bosch BME280 (I got mine von [Adafruit](https://www.adafruit.com/product/2652))
- [Adafruit TLS2561](https://www.adafruit.com/product/2652) Lichtsensor

Ich verwenden I2C sich bis haken, da es die wenigstenen Stifte verwendet, und ich konnte den Pins teilen. Hier ist der Schaltplan:

![Verdrahtung](/posts/category/iot/iot-hardware/images/Wiring.png)

Ich telegraphierte sie an meinem Particle Photon und schrieb ein kleines Stück Software. Wir werden in der Software Abschnitt dazu kommen, aber es war ziemlich trivial zu tun gegeben, dass Particle Geräte in einer Arduino-ähnlichen Sprache programmiert werden und sind relativ einfach zu handhaben.

I 3-D gedruckt eine schöne Box für sie, und superdünnen keramikbeschichteten Draht löten sie alle zusammen verwendet, so ist es in einem netten Paket herauskam:

![IMG 4090](/posts/category/iot/iot-hardware/images/IMG_4090.png)

![IMG 4089](/posts/category/iot/iot-hardware/images/IMG_4089.png)

![IMG 4092](/posts/category/iot/iot-hardware/images/IMG_4092.png)

Die Sensorplatten sind von den Innenseiten, vor den Lüftungslöchern aufgehängt, so dass sie (Art) Ablesungen genaue erhalten.

Die BLE ### CO <sub>2</sub> -Sensor

Dieser war ein bisschen mehr eine Herausforderung für ein paar Gründe. Aber zuerst die Stückliste:

- nRF52DK Entwickler Kit Nordic (I got mine von [DigiKey](https://www.digikey.com/product-detail/en/nordic-semiconductor-asa/NRF52-DK/1490-1053-ND/5773879?utm_adgroup=Semiconductor%20Modules&slid=&gclid=EAIaIQobChMIvJTLptKr3AIVSsDICh0z8QCnEAAYASAAEgJg-PD_BwE))
- [SenseAir K30](https://senseair.com/products/flexibility-counts/k30/) CO <sub>2</sub> -Sensor
- 4700μF Kondensator ([Adafruit](https://www.adafruit.com/product/1589) zur Rettung wieder!)
- 9 V-Boost-Converter (I got mine von [Pololu](https://www.pololu.com/product/2116))

Um die Dinge etwas weniger kompliziert zu machen, verdrahtet ich den Impuls für die nRF52, und setzen Sie dann den Kondensator auf der vout des Boost wie folgt aus:

![IMG 4100](/posts/category/iot/iot-hardware/images/IMG_4100.png)

Ich bin nicht sicher, es machte die Sache * einfacher * per se, aber es war, wie ich es trotzdem tat. Wenn Sie ein Elektroingenieur sind, und jetzt lachen, fühlen sich frei in Verbindung zu setzen und den Fehler meiner Wege hinweisen.

Ich werde in, um es in den Software-Abschnitten, aber dies war ein bisschen ein Tier zu kontrollieren. First off, ** DO ** diesen Sensor nicht direkt mit einem Arduino verdrahtet verwenden! Es ist absolut ** wird ** essen Sie Ihren Spannungsregler. Es erfordert 5 V-12 V und 500 mA und nach dem Hersteller, gibt es nicht ein Arduino da draußen mit einem Regler, der damit umgehen kann. Die nRF52DK Board behauptet, dass sie können, aber ich bin skeptisch diese Behauptung zu einem gewissen Grad.

Wiederum I 3-D gedruckt, um eine schöne Box, mit Entlüftungslöchern in der Oberseite für den Luftstrom zu ermöglichen.

![IMG 4087](/posts/category/iot/iot-hardware/images/IMG_4087.png)

![IMG 4096](/posts/category/iot/iot-hardware/images/IMG_4096.png)

Ich halte für ein kleiners BLE-basiertes Board suchen, um diese Sache zu fahren - eine, die Arduino läuft nicht - aber ich habe noch die richtigen zu finden.

### Lora Strahlungssensor

Dieser war super Spaß zu bauen. Ich wuchs in Los Alamos, NM (The Atomic City!) Nach oben, so dass es das ist. Aber ich hatte heutige eingeladen bei einem Workshop in Italien von der Vereinten Nationen für die Internationalen Atomenergie-Organisation gehostet auf „Radiation Monitoring über LoRaWAN“ so dass ich nur ** ** hatte einen Strahlungssensor zu bauen! (Es war wirklich ordentlich, und ich darüber gebloggt [hier](https://www.influxdata.com/blog/influxdb-the-united-nations-and-radiation/))

Hier ist, was ich verwenden:

- Taschen Geiger Strahlungssensor (von [SparkFun Electronics](https://www.sparkfun.com/products/14209))
- [Wemos D1 Mini](https://www.aliexpress.com/store/product/D1-mini-Mini-NodeMcu-4M-bytes-Lua-WIFI-Internet-of-Things-development-board-based-ESP8266/1331105_32529101036.html?spm=2114.12010612.8148356.13.38593ca0eqsbug) (ich weiß ** nicht ** empfehlen die D1 Mini Pro als alle diejenigen, kaufte ich fehlerhafte WiFi und waren unbrauchbar, obwohl ich nicht die WiFi für diese Teile verwendet haben)
- LoRa Radio-Board (aus [Adafruit](https://www.adafruit.com/product/3072), natürlich)
- Eine weiße LED

Sie fragen sich wahrscheinlich, warum ich eine Wemos D1 verwendet (die hat WiFi) im Inneren dieser Sache, die einen LoRa Radio verwendet, und ich werde Ihnen sagen, warum: Ich kann nicht ein billigeres Board zur Steuerung der LoRa Funkkarte finden konnten * * und ** die Sensorplatine. Bei 3,00 $ war es genau das Richtige. Ich drehte gerade den WiFi und ging mit ihm.

nur verwendet, um eine für die LED I ich hatte herumliegen. Keine Ahnung, woher es kam.

Dieser kam wirklich gut aus!

![IMG 4084](/posts/category/iot/iot-hardware/images/IMG_4084.png)

Wie Sie sehen können, dauerte es eine ganze Menge Arbeit alles in der Box zu bekommen, was mit all den Drähten, etc., aber es ist alles eng passen verwaltet.

![IMG 4101](/posts/category/iot/iot-hardware/images/IMG_4101.png)

### Die Temperatur Contactless Sensor

Auch hier super einfach.

- Wemos D1 Mini (siehe oben)
- LoRad Radio-Board (siehe oben)
- Melexis MLX90614-Sensor (Sie können eine Suche von [Adafruit](https://www.adafruit.com/product/1748))
- Eine grüne LED

Ich gebe zu, dass Sie nicht den gleichen Melexis Sensor bekommen, dass ich verwendet, aber das ist, weil Weg zurück in den Tag, zurück in der [Projekt Sun SPOT](http://sunspotdev.org/) Tagen, bauten wir ein wenig Sensorplatine für den MLX90614, die es einfach gemacht über I2C zu verwenden. Ich bin zufällig ein paar von denen herumliegen haben (aus wie 2006!), So dass ich eine verwendet. Auch hier habe ich die Wemos D1 Mini, mit dem WiFi-Radio, sowohl zur Steuerung des Sensors ausgeschaltet und das LoRa Brettes, nur weil es billig war (und ich hatte mit Wifi ein Bündel von Wemos D1 Mini Pro herumliegen, die nicht funktioniert haben trotzdem. Denken Sie daran, nicht mit denen kaufen.)

Das Gleiche gilt für die grüne LED. Gerade hatte man herumliegen.

Hier ist die Temperatursensorplatine Sie nicht haben können:
![IMG 3699](/posts/category/iot/iot-hardware/images/IMG_3699.png)

Und hier ist das letzte Paket:

![IMG 4094 1](/posts/category/iot/iot-hardware/images/IMG_4094-1.png)

Wieder nahm, einige nette Löten und Verpackung in alle Drähte bekommen aber alles passen am Ende verwaltet:

![IMG 3714](/posts/category/iot/iot-hardware/images/IMG_3714.png)

So dass, schließt die Sensor-Hardware. Nun zu der Edge-Datenerfassung Knoten Hardware!

## Der Aufbau des Edge-Collector

Ich gebe zu, dass ich ein Raspberry Pi verwendet haben könnte. Aber ehrlich gesagt habe ich die Pine-64 auf Kickstarter gesichert, und ich hatte das Board für irgendetwas nicht verwendet, so dass ich es zu benutzen entschieden. Auch Bildschirme und Fälle für Raspberry Pi zu finden, ist einfach, ich denke, aber es gibt so viele von ihnen, dass es schwer war, zu wählen, und Pine64 hat sie alle an einem Ort.

Hier ist, was ich für den Build benötigt:

- [Pine-64 LTS](https://www.pine64.org/?product=pine-a64-lts) Hauptplatine ($ 32.00)
- [WiFi / BLE Karte](https://www.pine64.org/?product=wifi-802-11bgn-bluetooth-4-0-module) ($ 9.99)
- [7” TFT Touchscreen](https://www.pine64.org/?product=7-lcd-touch-screen-panel) ($ 35.99)
- [Pine64 Playbox Anlage](https://www.pine64.org/?product=pine64-playbox-enclosure) ($ 9.99)
- [LiPo Akku](https://www.pine64.org/?product=lithium-polymer-battery-us-only) ($ 21.99)
- LoRa Board (siehe oben)
- Wemos D1 Mini (siehe oben)

Optional aber empfohlen

- 64GB EMMC Module ($ 34.95)

Ich eigentlich eine 64GB MicroSSD Karte in mir, aber die Lage des Kartenschlitzes ist so schrecklich verwendet, dass ich am Ende ein nach oben zu brechen und nachdem er sie zu ersetzen. Wenn ich ein anderes zu bauen hätte, würde ich das EMMC Module sicher verwenden.

Ich bin sicher, ich ist der Kopf und Denken kratzen „Warum gibt es in diesem Stück Kit eine Wemos D1 ist ??“ Und ich werde Ihnen sagen! Wieder ist es nur die LoRa Board zu steuern. Ja, ich habe absolut könnte es von der Pine64 kontrolliert, aber ich hatte schon den ganzen Arbeits Code Lora Board von einem Wemos zu steuern, und es ist klein und sehr wenig Platz in Anspruch nimmt, so dass ich es einfach ausgeschaltet den 5v Pin auf dem RPi Header und war gut zu gehen. Ich verdrahtet seinen UART Tx Pin an die Rx stecknadel RPi Header und einfach alle Daten geschrieben in über den LoRa Funk an die Pine-64 des eingehenden seriellen Port kommen, wo ich sie dann abholen könnte und speichern.

Ich denke, es ist ziemlich nett herauskam!

![IMG 4086](/posts/category/iot/iot-hardware/images/IMG_4086.png)

Lora Antenne zu montieren, sondern auch das Innere sah schön wieder waren alle Drähte ein wenig zu viel, und ich hatte in dem Fall ein zusätzliches Loch bohren:

![IMG 3705 1](/posts/category/iot/iot-hardware/images/IMG_3705-1.png)

Es gibt tatsächlich ein Z-Wave-Modul dort auch, aber nur, weil es kam mit meinem Kickstarter Bundle. Ich bin eigentlich nicht es noch verwendet wird.

Nun, wie kam ich, dass Slick suchen Armaturenbrett aller meiner Sensordaten dort? Nun, das ist eigentlich der einfachste Teil der Software zu bauen, also lassen Sie sich auf die Software zu erhalten!

## Die Software

Ich werde die Software, die ich in der gleichen Reihenfolge wie die Hardware eingebaut gehen, nur um Konsistenz willen. Fiel frei, um die Teile zu springen herum, dass Sie am meisten interessiert.

### Der WiFi-Sensor

Die Partikel Photons Programmierung ist super einfach ihre Web-basierte Entwicklungsumgebung. Sie haben eine zu Desktop-Version, basierend auf Atom, aber ich hatte regelmäßig Probleme mit ihm, damit ich an den on-line einem stecken. Einer der wenigen Nachteile zu Teilchen ist, dass sie alles, um durch ihre Cloud erwarten, aber ihre Cloud hat keine Möglichkeit, Daten zu speichern und zu analysieren. Eine ziemlich große Schwäche, wenn Sie mich fragen. Aber selbst wenn es nicht tat ich hätte hatte die Dinge so zu tun, weil, wie bereits erwähnt, ich nicht eine Wolke-first-Architektur zu tun haben wollte. Ich wollte das Edge-Gerät die Daten zu sammeln. Ich wollte es zu einem privaten WiFi-Netzwerk (serviert von dem Edge-Gerät selbst) und senden Sie alle meine Daten verbinden.

Es stellt sich heraus, dass das erste, was ein Teilchen Photon versucht immer zu tun ist, den Kontakt der Partikelwolke. Wenn es nicht kann, dann werden die Dinge seltsam. Also das erste, was ich zu tun war, hatte zu sagen, es Anschlag zu tun, dass zu gefallen!

```cpp
Particle.disconnect();
WiFi.connect();
```

Das stoppt das! Und verbindet mich dann zu meinem privaten WiFi. (Sie müssen dies Ihr Photon über eine USB-Verbindung konfigurieren!).

Hier ist der gesamte Code, und dann kann ich durch sie in mehr Detail gehen:

```cpp
// This #include statement was automatically added by the Particle IDE.
#include <HttpClient.h>
// This #include statement was automatically added by the Particle IDE.
#include <Adafruit_TSL2561_U.h>
#include "Adafruit_Sensor.h"
#include "Adafruit_BME280.h"
#define SEALEVELPRESSURE_HPA (1013.25)
#define TELEGRAF_HOST "192.168.3.1"
#define TELEGRAF_PORT 1619
#define temp(x) String(x)

//the two sensors
Adafruit_BME280 bme;
Adafruit_TSL2561_Unified tsl = Adafruit_TSL2561_Unified(TSL2561_ADDR_FLOAT, 12345);

// some variables
double temperature = 0.00;
double pressure = 0.00;
double altitude = 0.00;
double humidity = 0.00;
uint16_t broadband = 0;
uint16_t infrared = 0;
int lux = 0;
String myID = System.deviceID();
String myName = "DemoKit3";
bool bme_config = true;
bool tsl_config = true;

// http stuff
http_request_t request;
http_response_t response;
HttpClient http;

SYSTEM_MODE(SEMI_AUTOMATIC);

int led = D7;

void setup() {
    delay(2000);
    Serial.begin(115200);
    Serial.println("No Cloud! Not using Particle.");
    Particle.disconnect();
    delay(2000);
    Serial.print("Connecting to WiFi ... ");
// this is all debug stuff that helped me get the WiFi working properly
    if(WiFi.hasCredentials()){
        Serial.println("Found credentials");
        WiFiAccessPoint ap[5];
        int found = WiFi.getCredentials(ap, 5);
        for (int i = 0; i < found; i++) {
            Serial.print("ssid: ");
            Serial.println(ap[i].ssid);
// security is one of WLAN_SEC_UNSEC, WLAN_SEC_WEP, WLAN_SEC_WPA, WLAN_SEC_WPA2, WLAN_SEC_WPA_ENTERPRISE, WLAN_SEC_WPA2_ENTERPRISE
            Serial.print("security: ");
            Serial.println(ap[i].security);
// cipher is one of WLAN_CIPHER_AES, WLAN_CIPHER_TKIP or WLAN_CIPHER_AES_TKIP
            Serial.print("cipher: ");
            Serial.println(ap[i].cipher);
        }
    }
    delay(2000);
    WiFi.connect();
    Serial.println("Starting up...");
    request.hostname = TELEGRAF_HOST;
    request.port = TELEGRAF_PORT;
    request.path = "/particle";
    int tryInit = 0;
// sometimes the BME sensor takes a while to get figured out.
    while (!bme.begin()) {
        Serial.println("Could not find a valid BME280 sensor, check wiring!");
        delay(3000);
        if(++tryInit > 9){
            bme_config = false;
            break;
        }
    }
    tryInit = 0;
/* Initialise the sensor */
    while(!tsl.begin()){
        Serial.print("Ooops, no TSL2561 detected ... Check your wiring or I2C ADDR!");
        delay(3000);
        if(++tryInit > 9){
            tsl_config = false;
            break;
        }
    }
/* Setup the sensor gain and integration time */
    if(tsl_config){
        configureSensor();
    }
    Serial.print("Device ID: ");
    Serial.println(myID);
// get a couple of readings to make sure …
    getReadings();
    delay(2000);
    getReadings();
/* Display some basic information on this sensor */
    displaySensorDetails();
/* We're ready to go! */
}

void loop() {
    getReadings();
    double fTemp = temperature * 9/5 + 32;
    Serial.print("My IP: ");Serial.println(WiFi.localIP());
    if(myName != "" ){
// begin http post remove for particle cloud publish
        http_header_t headers[] = {
          {"Accept", "*/*"},
          {"User-agent", "Particle HttpClient"},
          {NULL, NULL}
        };
        time_t time = Time.now();
        Time.format(time, TIME_FORMAT_ISO8601_FULL);
        int rssi = WiFi.RSSI();
        String data = String::format("{\"event\": \"iot_sensor\", \"data\": { \"tags\" : {\"id\": \"%s\", \"location\": \"%s\"}, \"values\": {\"RSSI\": %d, \"temp_c\": %f, \"temp_f\": %f, \"humidity\": %f, \"pressure\": %f, \"altitude\": %f, \"broadband\": %d, \"infrared\": %d, \"lux\": %d}}, \"ttl\": 60, \"coreid\": \"%s\", \"name\": \"sensor\", \"measurement\": \"iot_data\"}", myID.c_str(), myName.c_str(), rssi, temperature, fTemp, humidity, pressure, altitude, broadband, infrared, lux, myID.c_str());
        request.body = data;
        http.post(request, response, headers);
        Serial.print("Application>\tResponse status: ");
        Serial.println(response.status);
        Serial.print("Application>\tHTTP Response Body: ");
        Serial.println(response.body);
// end http post.
        delay(1000);
    }
}

/* Read the sensors */
void getReadings(){
    if(bme_config){
        temperature = bme.readTemperature();
        pressure = bme.readPressure() / 100.0F;
        altitude = bme.readAltitude(SEALEVELPRESSURE_HPA);
        humidity = bme.readHumidity();
    }
    if(tsl_config){
        sensors_event_t event;
        tsl.getEvent(&event);
/* Display the results (light is measured in lux) */
        if (event.light){
            lux = event.light;
        } else {
/* If event.light = 0 lux the sensor is probably saturated
and no reliable data could be generated! */
           lux = -1;
        }
/* Populate broadband and infrared with the latest values */
        tsl.getLuminosity (&broadband, &infrared);
    }
}

// Open a serial terminal and see the device name printed out
void handler(const char *topic, const char *data) {
    Serial.println("received " + String(topic) + ": " + String(data));
    myName = String(data);
}

int setLoc(String loc){
    myName = loc;
    return 1;
}

void configureSensor(void) {
/* You can also manually set the gain or enable auto-gain support */
// tsl.setGain(TSL2561_GAIN_1X); /* No gain ... use in bright light to avoid sensor saturation */
// tsl.setGain(TSL2561_GAIN_16X); /* 16x gain ... use in low light to boost sensitivity */
    tsl.enableAutoRange(true); /* Auto-gain ... switches automatically between 1x and 16x */

/* Changing the integration time gives you better sensor resolution (402ms = 16-bit data) */
    tsl.setIntegrationTime(TSL2561_INTEGRATIONTIME_13MS); /* fast but low resolution */
// tsl.setIntegrationTime(TSL2561_INTEGRATIONTIME_101MS); /* medium resolution and speed */
// tsl.setIntegrationTime(TSL2561_INTEGRATIONTIME_402MS); /* 16-bit data but slowest conversions */

/* Update these values depending on what you've set above! */
    Serial.println("------------------------------------");
    Serial.print ("Gain: "); Serial.println("Auto");
    Serial.print ("Timing: "); Serial.println("13 ms");
    Serial.println("------------------------------------");
}

void displaySensorDetails(void) {
    if(tsl_config){
        sensor_t sensor;
        tsl.getSensor(&sensor);
        Serial.println("------------------------------------");
        Serial.print ("Sensor: "); Serial.println(sensor.name);
        Serial.print ("Driver Ver: "); Serial.println(sensor.version);
        Serial.print ("Unique ID: "); Serial.println(sensor.sensor_id);
        Serial.print ("Max Value: "); Serial.print(sensor.max_value); Serial.println(" lux");
        Serial.print ("Min Value: "); Serial.print(sensor.min_value); Serial.println(" lux");
        Serial.print ("Resolution: "); Serial.print(sensor.resolution); Serial.println(" lux");
        Serial.println("---------------------------------reading_time: 37 minutes
---");
        Serial.println("");
        delay(500);
    }
}

```

Ziemlich einfach. Initialisieren Sie die Sensoren (und versuchen, ein paar Mal). Wenn die Initialisierung fehlschlägt, stellen Sie sicher zu handhaben das auch. Ich benutzte die bee_config und tsl_config booleans dafür. Lesen Sie dann jeder zweite Sensordaten und per Post an die InfluxDB Server in einem JSON-Objekt. Ich bin eigentlich das Particle Plugin für Telegrafen wiederverwenden, dass ich geschrieben habe, nur weil ich kann. Ich schrieb tatsächlich die [docs](https://docs.particle.io/tutorials/integrations/influxdata/core/#using-influxcloud) über bei Particle.io für die) über bei Particle.io für die [InfluxDB / Particle Integration](https://docs.particle.io/tutorials/integrations/influxdata/core/#using-influxcloud) (weil ich auch die Integration, natürlich) schrieb, so fühlen sich frei, einen Blick auf das nehmen, wenn Sie möchten.

Ich habe jetzt eine Particle Photon Posting Temperatur (ºC und ° F), Luftdruck, Luftfeuchtigkeit, Infrarotlicht, sichtbares Licht, und Lux jede Sekunde meines Edge-Gerät. Nun, ich würde, wenn ich hatte eine Kanteneinrichtung gebaut. Das kommt.

Die BLE ### CO <sub>2</sub> -Sensor

Wie ich bereits sagte, war dies ein etwas kniffliger. Ich hätte dies mit Arduino programmiert, und auf den ersten habe ich getan. Aber Arduino ist einfach nicht bis zu der Aufgabe mit diesem Sensor. Das ist, weil die I2C des Sensors gelegentlich abstürzt, und wenn das geschieht in Arduino-Land, sie ist so ziemlich fest. Sie haben das Board neu zu starten. Das ist in Ordnung, ich denke, aber wenn es alle 30 Sekunden geschieht, es macht die Datensammlung eher unzuverlässig. So habe ich C eingebettet statt auf mbed. Darüber hinaus gibt es zwei Seiten zu diesem Sensor. Einer war der eigentliche Sensor Code, läuft auf dem nRF52DK Bord. Der andere war der Code auf dem Edge-Gerät ausgeführt werden Bluetooth verbinden über und die Daten zu erhalten. Also lassen Sie sich mit dem Gerät-Code starten. Zuerst hatte ich ein BLE GATT Charakteristisch für den CO2-Wert zu definieren, so dass ich das tat:

```cpp
#ifndef __K30_SERVICE_H__
#define __K30_SERVICE_H__

class K30Service {
public: const static uint16_t K30_SERVICE_UUID = 0xA000;
const static uint16_t K30_VALUE_CHARACTERISTIC_UUID = 0xA001;

K30Service(BLEDevice &_ble, float k30Initial) :
ble(_ble), k30Value(K30_VALUE_CHARACTERISTIC_UUID, &k30Initial, GattCharacteristic::BLE_GATT_CHAR_PROPERTIES_NOTIFY) {
  GattCharacteristic *charTable[] = {&k30Value};
  GattService k30Service(K30Service::K30_SERVICE_UUID, charTable, sizeof(charTable) / sizeof(GattCharacteristic *));
  ble.addService(k30Service);
}

void updateK30Value(float newValue) {
  ble.updateCharacteristicValue(k30Value.getValueHandle(), (uint8_t *)&newValue, sizeof(float));
}
private: BLEDevice &ble; ReadOnlyGattCharacteristic k30Value; };

#endif
```

Das ist unser GATT-Service, so dass, wann immer wir es nennen, wir die aktualisierte CO2-Wert von dem Sensor erhalten. Nun zu dem Code die Sensordaten zu bekommen. Denken Sie daran, dies ist I2C-Code in C. Ich werde durch sie in den Abschnitten gehen, um es klar, was ich tue.

```cpp
/**
  Copyright (c) 2018 David G. Simmons
  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  http://www.apache.org/licenses/LICENSE-2.0
**/
#include <events/mbed_events.h>
#include <mbed.h>
#include "ble/BLE.h"
#include "ble/Gap.h"
#include "k30.h"
#include "nrf_nvic.h"
```

Der `k30.h` ist der Code, den GATT-Service oben zu definieren. Als nächstes wollen wir die ganze Variable erhalten, usw. definiert.

```cpp
DigitalOut led1(LED1);
DigitalOut led2(LED2);
DigitalOut led3(LED3);
DigitalOut led4(LED4);
//I2C i2c(p24 , p25);
// Standard I2C pins on the nRF52. But you can use any pins you want really.
I2C i2c(p26, p27);
const int addr = 0xD0;
static int failures = 0;
const static char DEVICE_NAME[] = "CO2Sensor";
static const uint16_t uuid16_list[] = {K30Service::K30_SERVICE_UUID};
static float co2Level = 50.0;
static K30Service* k30ServicePtr;
static EventQueue eventQueue(EVENTS_EVENT_SIZE);
```

Die nRF52DK verfügt über 4 Service-LEDs an Bord. Ich wollte, dass sie in der Folge um und um zu gehen, weil ich kann. Oh, und sie sollten auch in der Lage sein, rückwärts zu gehen. Fragen Sie nicht, wie lange habe ich das Timing richtig hinzubekommen, so dass es schön aussah.

```cpp
void lightsFwd(){
  led1 = !led1;
  wait(.15);
  led2 = !led2;
  wait(.15);
  led4 = !led4;
  wait(.15);
  led3 = !led3;
  wait(.15);
}

void lightsRev(){
  led1 = !led1;
  wait(.15);
  led3 = !led3;
  wait(.15);
  led4 = !led4;
  wait(.15);
  led2 = !led2;
  wait(.15);
}
```

Nun kommen wir zum interessanten Bit: tatsächlich den Sensor beim Lesen! Das ist ziemlich einfach I2C. Die SenseAir Docs haben alle die Details wie die I2C-Adresse, die Befehle usw., so dass bereits für mich getan wurde. Wenn Sie Arduino verwenden, es ist eigentlich eine komplette Arduino Skizze, die dies auch hat.

```cpp
void readSensor(){
  // register values
  char cmd[4] = {0x22, 0x00, 0x08, 0x2A};
  int ack = i2c.write(addr, cmd, 4);
  wait(0.5);
  char readBuff[4];
  i2c.read(addr, readBuff, 4, false);
  int high = readBuff[1]; //high byte for value is 4th byte in packet in the packet
  int low = readBuff[2]; //low byte for value is 5th byte in the packet
  float CO2 = high*256 + low; //Combine high byte and low byte with this formula to get value
  char sum = readBuff[0] + readBuff[1] + readBuff[2]; //Byte addition utilizes overflow
  if (sum == readBuff[3] & ack == 0){
    //pc.printf("CO2 value = %fn", CO2);
    k30ServicePtr->updateK30Value(CO2);
    if(failures > 0){
      failures--;
    }
  } else {
    //pc.printf("** Sensor Failure **n");
    failures++;
    CO2 = -1;
    k30ServicePtr->updateK30Value(CO2);
    if(failures > 5){ // Keep track of the number of failures. If more than 5, reboot the board.
      i2c.stop();
      for(int x = 0; x < 10; x++){
        lightsRev();
      }
      NVIC_SystemReset();
    }
  }
}

void disconnectionCallback(const Gap::DisconnectionCallbackParams_t *params)
{
  //pc.printf("Disconnected!n");
  BLE::Instance().gap().startAdvertising();
}
```

Sie werden ein paar Dinge in dort bemerken. Erstens hat der Sensor einen Prüfsummen-Byte, und der Sensor ist zwar nicht manchmal diesen Test. Ich halte von der Anzahl der Ausfälle in verfolgen. Folge. Wenn ich mehr als 5 Fehler in einer Reihe bekommen, stellte ich fest, dass der Sensor Schwierigkeiten hat, so dass ich das Board neu starten und von vorne beginnen. Nach einem ** ** lange bisschen von Versuch und Irrtum, fand ich, dass dies eine geeignete Lösung.

Der Rest dieses Codes ist ziemlich Standard Textvorschlag für BLE Verbindungen etc. und in der Tat meistens kam aus dem mbed-Beispielprogramme.

```cpp
void updateSensorValue() {
  lightsFwd();
  readSensor();
  wait(1.5);
  lightsFwd();
  wait(1.5);
}

void connectionCallback(const Gap::ConnectionCallbackParams_t *params) {
  // pc.printf("Connected!n");
  BLE::Instance().gap().stopAdvertising();
  eventQueue.call(updateSensorValue);
}

void sensorCallback(void) {
  BLE &ble = BLE::Instance();
  if (ble.gap().getState().connected) {
    eventQueue.call(updateSensorValue);
  } else {
    lightsFwd();
  }
}

void onBleInitError(BLE &ble, ble_error_t error) {

}

void printMacAddress(){
  Gap::AddressType_t addr_type;
  Gap::Address_t address;
  BLE::Instance().gap().getAddress(&addr_type, address);
  //pc.printf("DEVICE MAC ADDRESS: ");
  for (int i = 5; i >= 1; i--){
    // printf("%02x:", address[i]);
  }
  //pc.printf("%02xrn", address[0]);
}

void bleInitComplete(BLE::InitializationCompleteCallbackContext *params) {
  BLE& ble = params->ble;
  ble_error_t error = params->error;
  if (error != BLE_ERROR_NONE) {
    onBleInitError(ble, error);
    return;
  }
  if(ble.getInstanceID() != BLE::DEFAULT_INSTANCE) {
    return;
  }

  ble.gap().onDisconnection(disconnectionCallback);
  ble.gap().onConnection(connectionCallback);
  k30ServicePtr = new K30Service(ble, co2Level);

  ble.gap().accumulateAdvertisingPayload(GapAdvertisingData::BREDR_NOT_SUPPORTED | GapAdvertisingData::LE_GENERAL_DISCOVERABLE);
  ble.gap().accumulateAdvertisingPayload(GapAdvertisingData::COMPLETE_LIST_16BIT_SERVICE_IDS, (uint8_t *) uuid16_list, sizeof(uuid16_list));
  ble.gap().accumulateAdvertisingPayload(GapAdvertisingData::COMPLETE_LOCAL_NAME, (uint8_t *) DEVICE_NAME, sizeof(DEVICE_NAME));
  ble.gap().setAdvertisingType(GapAdvertisingParams::ADV_CONNECTABLE_UNDIRECTED);
  ble.gap().setAdvertisingInterval(1000);
  ble.gap().startAdvertising();
}

void scheduleBleEventsProcessing(BLE::OnEventsToProcessCallbackContext* context) {
  BLE &ble = BLE::Instance();
  eventQueue.call(Callback<void()>(&ble, &BLE::processEvents));
}

int main() {
  eventQueue.call_every(1000, sensorCallback);
  BLE &ble = BLE::Instance();
  ble.onEventsToProcess(scheduleBleEventsProcessing);
  ble.init(bleInitComplete);
  eventQueue.dispatch_forever();
  return 0;
}
```

So dass der CO2-Wert von dem Sensor liest jeden (was aussieht wie) zweite - zumindest wird der Rückruf jede Sekunde aufgerufen. Aber in diesem Rückruf betreibe ich das Licht um, was eine zusätzliche ~ 3,25 Sekunden dauert. Und es gibt einen Grund dafür. Wenn ich den Sensor in jeder Sekunde einfach zu lesen, würde ich doppelte Ergebnisse erhalten, und vieles mehr Ausfälle. Das ist, weil der Sensor selbst nur aktualisiert seine Register alle 2 Sekunden oder so. Und wenn Sie versuchen, zu lesen, während es ihnen ist aktualisieren, es hängt. Das war also mein Kompromiss für Sensor Zuverlässigkeit. Scheint erfolgreich gewesen.

Nun, wie ich schon sagte, ich ** Lese noch hatte ** die Daten via Bluetooth vom Edge-Gerät, so dass ich etwas schreiben, musste das handhaben. Der effektivste Weg, um Ihr Bluetooth-Gerät von Linux zu bekommen, ist durch gatttool verwenden, aber das ist im Grunde ein Kommandozeilen-Tool. Ich bin mir ziemlich sicher, dass ich etwas mehr C-Code geschrieben haben, könnte die BLE Gerät direkt zugreifen zu können, aber ich beschloss, einfach ein kleines Programm in Gehe zu schreiben gatttool zu verwenden, es zu tun. Auch hier werde ich durch diese in Abschnitte für Sie gehen.

Wir beginnen mit einigen Standard-Go Importen und Definitionen:

```go
package main

import (
  "os/exec"
  "strings"
  "bufio"
  "fmt"
  "encoding/binary"
  "encoding/hex"
  "log"
  "math"
  "os"
  "bytes"
  "time"
  "strconv"
)

var (
  colonByte = []byte(":")
  spaceByte = []byte(" ")
)

var (
  Trace *log.Logger
  Info *log.Logger
  Warning *log.Logger
  Error *log.Logger
)

const timeout = 10 * time.Second

func Float32frombytes(bytes []byte) float32 {
  bits := binary.LittleEndian.Uint32(bytes)
  float := math.Float32frombits(bits)
  return float
}
func Float32bytes(float float32) []byte {
  bits := math.Float32bits(float)
  bytes := make([]byte, 4) binary.LittleEndian.PutUint32(bytes, bits)
  return bytes
}
```

Die einzige wirklich interessante Bits gibt es die Umwandlung einer Reihe von Bytes zu einem Float32. Stellt sich heraus, wenn Sie von gatttool lesen, was Sie wieder eine Reihe von rohen Bytes. Da ich von dem Gerät ein Schwimmer zu BLE schreiben, muss ich diese 4 Bytes wieder in einen Float konvertieren. Dank Google, fand ich einen Weg, das zu tun.

```go
func postResults(result string) {
  var out bytes.Buffer
  var stderr bytes.Buffer
  cmdProc := exec.Command("/usr/bin/curl", "-i", "-XPOST", "http://localhost:8186/write", "--data-binary", result)
  cmdProc.Stdout = &out
  cmdProc.Stderr = &stderr
  err := cmdProc.Run()
  defer cmdProc.Wait()
  if err != nil {
    Error.Println(err)
    return
  }
  Info.Println("Result: " + out.String())
}
```

Ok, ich weiß, Sie sagen WTF ?? Aber ja, habe ich curl die Daten in die Datenbank zu schreiben. Es schien wie eine gute Idee zu der Zeit. Ich werde wieder schreiben sie die InfluxDB Go-Bibliothek eines Tages mit, aber ich war in Eile.

Das nächste Bit hat Spaß gemacht.

```go
func runCommand(macAddr string) {
  input := make(chan []byte, 1)
  argString := string("-b " + macAddr + " -t random --char-write-req --handle=0x000f --value=0100 --listen")
  args := strings.Fields(argString)
  cmdString := "/usr/local/bin/gatttool"
  cmd := exec.Command(cmdString, args...)
  Info.Println("Running: ", cmdString, args)
  cmdOut, _ := cmd.StdoutPipe()
  cmd.Start()
  defer cmd.Wait()
  defer cmdOut.Close()
  reader := bufio.NewReader(cmdOut)
  go func() {
    buff, _ := reader.ReadBytes('n')
    Trace.Println(string(buff))
    input <- buff
  }()
  select {
    case <-time.After(timeout):
      Error.Println(" GATTTOOL timed out. Sensor nbot on?")
      cmd.Process.Kill()
      return
    case i := <-input:
      res := bytes.Split(i, spaceByte);
      //fmt.Println("Length ", len(res))
      if(len(res) < 4 ) {
        Error.Println("Unexpected return from Gatttool")
        cmd.Process.Kill()
        return
      }
  }
  for 1 > 0 {
    go func() {
      buff, _ := reader.ReadBytes('n')
      Trace.Println(string(buff))
      input <- buff
    }()
    select {
      case <-time.After(timeout):
        Warning.Println("timed out")
        cmd.Process.Kill()
        return
      case i := <-input:
        Trace.Println(string(i))
        result := bytes.Split(i, colonByte)
        fd := bytes.Fields(result[1])
        reading := make([]byte, 4)
        for x := 0; x < len(fd); x++ {
          data, err := hex.DecodeString(string(fd[x]))
          if err != nil {
            panic(err)
          }
          reading[x] = data[0]
        }
        float := Float32frombytes(reading)
        if(float < 1){
          Info.Println("Failed Sensor")
          continue;
        } else {
          st := "k30_reader,sensor=k30_co2 co2=" + strconv.Itoa(int(float))
          Trace.Println(st)
          postResults(st)
        }
    }
  }
}
```

Nun, da sieht aus wie eine Menge, und sieht verwirrend, aber hier ist, was es im Grunde tut. Sie sehen, kann es GATTTOOL öffnen, aber wenn das Gerät am anderen Ende entweder nicht vorhanden, oder wird getrennt, dann die Dinge zu brechen. Also habe ich auf dem gatttool Befehl Timeout haben und wiederholt, wenn das passiert (was, wenn Sie den Sensor-Code erinnern, dann ist es sicher zu gehen, wenn der Sensor sperrt). So gibt es eine ganze Reihe von Kontrollen, um sicherzustellen, dass wir verbunden zu werden, dass wir ein Ergebnis bekommen, und das ist das Ergebnis zumindest nominell rational, bevor wir gehen und versuchen, es zu schreiben in die Datenbank. Ich glaube mir, wenn ich sage, dass eine Menge von Versuch und Irrtum und Miss geht in dieser robust. Und es ist robust. Es wird nun über einen Monat lang einwandfrei laufen, 24/7, ohne Probleme.

```cpp
func Init(){
  file, err := os.OpenFile("/var/log/blueCO2.log", os.O_CREATE|os.O_WRONLY|os.O_APPEND, 0666)
  if err != nil {
    fmt.Println("Failed to open log file", err)
  }
  Trace = log.New(file,"TRACE: ", log.Ldate|log.Ltime|log.Lshortfile)
  Info = log.New(file, "INFO: ", log.Ldate|log.Ltime|log.Lshortfile)
  Warning = log.New(file, "WARNING: “, log.Ldate|log.Ltime|log.Lshortfile)
  Error = log.New(file, "ERROR: “, log.Ldate|log.Ltime|log.Lshortfile)
}
func main() {
  Init()
  myArgs := os.Args[1:]
  macAddr := myArgs[0]
  if(len(myArgs) < 1){
    Error.Println("No BLE Device Address Suplied, Exiting.")
    return
  }
  for 1>0 {
    runCommand(macAddr)
  }
}
```

Auch hier recht unkompliziert. einrichten nur einige Logging-Funktionalität, und dann für immer laufen. Offensichtlich müssen Sie das Programm, um die MAC-Adresse des BLE Gerät übergeben Sie die Verbindung herstellen wollen, aber das ist das einzige, was Sie brauchen.

Das ist also der CO2-Sensor, die beide von der Sensorseite und vom Edge-Geräteseite. ***Wütend***

### Die Lora Sensoren

Diese sind eigentlich zwei separate Sensoren, wie Sie wissen, aber ich werde uns alle ein wenig Zeit sparen, indem sie die Kombination, da sie eine Tonne Code teilen. Wieder einmal werde ich den Code in Stücke gehen durch sie leichter zu machen. Der Strahlungssensor kam mit einer netten kleinen Arduino Bibliothek, so dass nur verwendet.

```cpp
#include <ESP8266WiFi.h>
#include "RadiationWatch.h"
#include <SPI.h>
#include <RH_RF95.h>
#include <Wire.h>

// for WEMOs D1 Mini
#define RFM95_CS D0
#define RFM95_INT D8
#define RFM95_RST D3
// Where to send packets to!
#define DEST_ADDRESS 1
// change addresses for each client board, any number :)
#define MY_ADDRESS 2
// Wemos D1 Mini pins
RadiationWatch radiationWatch(D1, D2);

// Change to 434.0 or other frequency, must match RX's freq!
#define RF95_FREQ 434.0

// Blinky on send
#define STATUS_LED D4
// Singleton instance of the radio driver
RH_RF95 rf95(RFM95_CS, RFM95_INT);
int16_t packetnum = 0; // packet counter, we increment per xmission
```

Das ist das definiert für den Strahlungssensor. Hier ist der Stoff für den Melexis Temperatursensor (auch hier gibt es eine Arduino-Bibliothek gibt, die es leicht gemacht).

```cpp
#include <ESP8266WiFi.h>
#include <Adafruit_MLX90614.h>
#include <SPI.h>
#include <RH_RF95.h>
#include <Wire.h>

// for WEMOs D1 Mini
#define RFM95_CS D0
#define RFM95_INT D8
#define RFM95_RST D3

#define GREEN_LED D4

// Change to 434.0 or other frequency, must match RX's freq!
#define RF95_FREQ 434.0

// Blinky on send
#define LED LED_BUILTIN
// Where to send packets to!
#define DEST_ADDRESS 1
// change addresses for each client board, any number :)
#define MY_ADDRESS 3
// Singleton instance of the radio driver
RH_RF95 rf95(RFM95_CS, RFM95_INT);
// for the sensor
Adafruit_MLX90614 mlx = Adafruit_MLX90614();
```

Dann tun sie beide das gleiche Setup-Funktion:

```cpp
void setup() {
  pinMode(STATUS_LED, OUTPUT);
  Serial.begin(115200);
  while (!Serial) {
    delay(1);
  }
  // we're not using the Wemos WiFi.
  WiFi.mode(WIFI_OFF);
  delay(1000);
  pinMode(RFM95_RST, OUTPUT);
  delay(500);
  digitalWrite(RFM95_RST, HIGH);
  delay(500);
  Serial.println("LoRa Radiation TX!");
  // manual reset
  digitalWrite(RFM95_RST, LOW);
  delay(100);
  digitalWrite(RFM95_RST, HIGH);
  delay(100);

  while (!rf95.init()) {
    Serial.println("LoRa radio init failed");
    while (1);
  }
  Serial.println("LoRa radio init OK!"); // Defaults after init are 434.0MHz, modulation GFSK_Rb250Fd250, +13dbM
  if (!rf95.setFrequency(RF95_FREQ)) {
    Serial.println("setFrequency failed");
    while (1);
  }
  Serial.print("Set Freq to: "); Serial.println(RF95_FREQ);
  // Defaults after init are 434.0MHz, 13dBm, Bw = 125 kHz, Cr = 4/5, Sf = 128chips/symbol, CRC on
  // The default transmitter power is 13dBm, using PA_BOOST.
  // If you are using RFM95/96/97/98 modules which uses the PA_BOOST transmitter pin, then
  // you can set transmitter powers from 5 to 23 dBm:
  rf95.setTxPower(23, false);
  Serial.println("Starting sensor ... ");
}
```

Der Strahlungssensor hat zu einigen Rückrufe zu registrieren, und solche, Rückrufe definieren:

```cpp
radiationWatch.setup();
// Register the callbacks.
radiationWatch.registerRadiationCallback(&onRadiation);
radiationWatch.registerNoiseCallback(&onNoise);
Serial.println("Callbacks Registered.");
digitalWrite(STATUS_LED, LOW);

// it’s a sensitive little bugger
void onNoise() {
  Serial.println("Argh, noise, please stop moving");
}

void onRadiation() {
  digitalWrite(STATUS_LED, HIGH);
  Serial.println("Reading Radiation...");
  char buf[RH_RF95_MAX_MESSAGE_LEN];
  uint8_t len = sizeof(buf);
  Serial.println("A wild gamma ray appeared");
  double rad = radiationWatch.uSvh();
  double var = radiationWatch.uSvhError();
  double dose = radiationWatch.cpm();
  double er = radiationWatch.uSvh();
  double coef = radiationWatch.uSvhError();
  Serial.print(" Dose: "); Serial.println(dose);
  Serial.print(rad);
  Serial.print(" uSv/h +/- ");
  Serial.println(var);
  // Message format is "R,gamma_ray_strength,dose" because the receiver is ALSO getting
  // data from a temp sensor. Could also send the variation, error and error coefficient.
  sprintf(buf, "%s,%s,%s", "R", String(rad).c_str(), String(dose).c_str());
  sendMessage(buf, len);
  digitalWrite(STATUS_LED, LOW);
}
```

I definierte mein eigenes Nachrichtenformat, weil ich zwischen den beiden Sensoren hatte zu unterscheiden, und ich immer noch die Nachrichtengröße sehr klein von dem Radio Bord zu halten zu halten hatte es in einzelne Pakete zu brechen.

Initialisieren des Melexis Sensor war ein einziger Aufruf

```cpp
mlx.begin()
```

Es schleift dann nur immer Lesen und Senden von Daten:

```cpp
double ambTempC = mlx.readAmbientTempC();
double objTempC = mlx.readObjectTempC();

// Message format is "T,AmbientTemp,ObjectTemp" because the receiver is ALSO getting
// data from a radiation sensor.
Serial.print("Amb: "); Serial.print(ambTempC);
Serial.print(" Obj: " ); Serial.println(objTempC);
sprintf(buf, "%s,%s,%s", "T", String(ambTempC).c_str(), String(objTempC).c_str());
digitalWrite(LED, HIGH);
digitalWrite(GREEN_LED, HIGH);
```

Beide Sensoren haben genau die gleiche Nachricht zu senden / Antwort-Funktionen:

```cpp
int sendMessage(char* buf, uint8_t len) {
  Serial.println("Transmitting..."); // Send a message to rf95_server
  char radiopacket[20];
  for (int x = 0; x < 20; x++) {
    if (x == len || x > len) {
      radiopacket[x] = '0';
    }
    radiopacket[x] = buf[x];
  }
  itoa(packetnum++, radiopacket + 13, 10);
  Serial.print("Sending "); Serial.println(radiopacket);
  radiopacket[19] = 0;
  Serial.println("Sending...");
  delay(10);
  rf95.send((uint8_t *)radiopacket, 20);
  Serial.println("Waiting for packet to complete...");
  delay(10);
  rf95.waitPacketSent();
  // Now wait for a reply
  waitReply();
}
void waitReply() {
  uint8_t buf[RH_RF95_MAX_MESSAGE_LEN];
  uint8_t len = sizeof(buf);
  Serial.println("Waiting for reply...");
  if (rf95.waitAvailableTimeout(10000)) {
  // Should be a reply message for us now
    if (rf95.recv(buf, &len)) {
      Serial.print("Got reply: ");
      Serial.println((char*)buf);
      Serial.print("RSSI: ");
      Serial.println(rf95.lastRssi(), DEC);
    }
    else {
      Serial.println("Receive failed");
    }
  } else {
    Serial.println("No reply, is there a listener around?");
  }
}
```

Technisch warten Ich muss nicht auf eine Antwort, aber ich weiß, nur für Debugging-Zwecke. Nun, wie man es erwarten würde, gibt es einige ähnlichen Codes, lief auf dem Wemos innerhalb des Edge-Collector versteckt, und es ist wirklich einfach, und sehr ähnlich. Es liest nur Nachrichten aus dem Radio, formatiert sie ein wenig, und schreibt sie an die serielle Schnittstelle aus.

```cpp
#include <SPI.h>
#include <RH_RF95.h>
#include <ESP8266WiFi.h>
// Wemos D1 Mini ...
#define RFM95_CS D1
#define RFM95_IRQ D2
#define RFM95_RST D3
//
// This is the receiver, so it receives from anyone, others send to this address.
#define MY_ADDRESS 1

// Change to 434.0 or other frequency, must match RX's freq!
#define RF95_FREQ 434.0
// Singleton instance of the radio driver
RH_RF95 rf95(RFM95_CS, RFM95_IRQ);
// Blinky on receipt
#define LED LED_BUILTIN

void setup() {
  Serial.begin(115200)
  while (!Serial); {
    delay(1);
  }
  delay(100);
  // we're not using the Wemos WiFi.
  WiFi.mode(WIFI_OFF);
  Serial.println("LoRa RXer!");
  pinMode(LED, OUTPUT);
  pinMode(RFM95_RST, OUTPUT);
  digitalWrite(RFM95_RST, HIGH);
  // manual reset
  digitalWrite(RFM95_RST, LOW);
  delay(100);
  digitalWrite(RFM95_RST, HIGH);
  delay(100);

  while (!rf95.init()) {
    Serial.println("LoRa radio init failed");
    while (1);
  }
  Serial.println("LoRa radio init OK!");

  // Defaults after init are 434.0MHz, modulation GFSK_Rb250Fd250, +13dbM
  if (!rf95.setFrequency(RF95_FREQ)) {
    Serial.println("setFrequency failed");
    while (1);
  }
  Serial.print("Set Freq to: "); Serial.println(RF95_FREQ);
  // The default transmitter power is 13dBm, using PA_BOOST.
  // If you are using RFM95/96/97/98 modules which uses the PA_BOOST transmitter pin, then
  // you can set transmitter powers from 5 to 23 dBm:
  rf95.setTxPower(23, false);
}
```

Die Schleife wartet einfach auf eine Nachricht, und dann formatiert sie:

```cpp
void loop(){
  if (rf95.available()) {
  // Should be a message for us now
  uint8_t buf[RH_RF95_MAX_MESSAGE_LEN];
  uint8_t len = sizeof(buf);
  String msgBuff = "iot_sensor,recv_from=LoRa ";
  if (rf95.recv(buf, &len)) {
    digitalWrite(LED, HIGH);
    char *p = (char *)buf;
    char *str;
    char* strAr[3];
    int x = 0;
    // incoming message format: T|R,reading1,reading2
    while ((str = strtok_r(p, ",", &p)) != NULL) {// delimiter is the comma
      strAr[x++] = str;
    }
    String mType = String(strAr[0]);
    double reading1 = String(strAr[1]).toFloat();
    double reading2 = String(strAr[2]).toFloat();
    if (mType == "T") {
      msgBuff += "AmbTempC=";
      msgBuff += String(reading1);
      msgBuff += ",ObjTempC=";
      msgBuff += String(reading2);
      msgBuff += ",AmbTempF=";
      msgBuff += String((reading1 CONTRIBUTING.rst LICENSE MANIFEST.in README.rst THANKS build dist docs output pelican pelican.egg-info posts_processed posts_to_process process.sh pyproject.toml requirements samples setup.cfg setup.py tasks.py tox.ini 1.8) + 32);
      msgBuff += ",ObjTempF=";
      msgBuff += String((reading2 CONTRIBUTING.rst LICENSE MANIFEST.in README.rst THANKS build dist docs output pelican pelican.egg-info posts_processed posts_to_process process.sh pyproject.toml requirements samples setup.cfg setup.py tasks.py tox.ini 1.8) + 32);
    } else {
      msgBuff += "gamma_ray=";
      msgBuff += String(reading1);
      msgBuff += ",dose=";
      msgBuff += String(reading2);
    }
    msgBuff += ",RSSI=";
    msgBuff += String(rf95.lastRssi());
    msgBuff += ".0";
    Serial.println(msgBuff);
    // Send a simple reply
    uint8_t data[] = "Roger that!";
    rf95.send(data, sizeof(data));
    rf95.waitPacketSent();
    digitalWrite(LED, LOW);
  } else {
     Serial.println("Receive failed");
  }
}

```

Du bist wahrscheinlich sagen „Aber nicht alles, was serielle Leitung Geschwätz mit der Datenbank zu Chaos geht?“ und Sie habe recht, außer ich einig Go-Code auf dem Edge-Gerät geschrieben, die Daten von der seriellen Schnittstelle zu lesen und mit ihr umgehen.

```go
package main
import (
  "os/exec"
  "fmt"
  "bufio"
  "syscall"
  "log"
  "os"
  "bytes"
  "time"
  "strings"
)
var (
  colonByte = []byte(":")
  spaceByte = []byte(" ")
)

var (
  Trace *log.Logger
  Info *log.Logger
  Warning *log.Logger
  Error *log.Logger
)

const timeout = 10 * time.Second
func postResults(result string) {
  var out bytes.Buffer
  var stderr bytes.Buffer
  cmdProc := exec.Command("/usr/bin/curl", "-i", "-XPOST", "http://localhost:8186/write", "--data-binary", result)
  cmdProc.Stdout = &out
  cmdProc.Stderr = &stderr
  err := cmdProc.Run()
  if err != nil {
    Error.Println(err)
    return
  }
  fmt.Println("Result: " + out.String())
}
func runPort() {
  tty, err := os.OpenFile("/dev/ttyS2", os.O_RDWR|syscall.O_NOCTTY, 0)
  if err != nil {
    log.Fatalf("Cannot open tty port: %vn", err)
  }
  defer tty.Close()
  for 1 > 0 {
    scanner := bufio.NewScanner(tty)
    for scanner.Scan() {
      result := scanner.Text()
      startsWith := strings.HasPrefix(result, "iot_sensor")
      if startsWith {
        postResults(result)
        fmt.Println(result)
      }
    }
    if err := scanner.Err(); err != nil {
      log.Fatal(err)
    }
  }
}
func Init(){
  file, err := os.OpenFile("/var/log/wemos.log", os.O_CREATE|os.O_WRONLY|os.O_APPEND, 0666)
  if err != nil {
    fmt.Println("Failed to open log file", err)
  }
  Trace = log.New(file,
    "TRACE: ",
    log.Ldate|log.Ltime|log.Lshortfile)
  Info = log.New(file,
    "INFO: ",
    log.Ldate|log.Ltime|log.Lshortfile)
  Warning = log.New(file,
    "WARNING: ",
    log.Ldate|log.Ltime|log.Lshortfile)
  Error = log.New(file,
    "ERROR: ",
    log.Ldate|log.Ltime|log.Lshortfile)
}

func main() {
  Init()
  for 1>0 {
    runPort()
  }
}
```

Und ja, es ist wahrscheinlich eine bessere Art und Weise, aber ich hatte schon den Code aus dem * anderen * Sensor und ich war wieder in Eile. So dort haben Sie es.

Und das ist alles, der Sensor-Code! Sie sollten nun in der Lage sein, alle die Sensoren zu bauen, dass ich gebaut und haben sie das gleiche laufen. Aber was Sie wirklich *** *** hergekommen war das Edge-Sammlung Gerät! Ich weiß, das ist, warum ich es bis zuletzt gespeichert. Lassen Sie uns also auf das!

### Edge-Sammlung Geräte

So haben Sie die 100 $ ausgegeben oder so für alle Teile für den Edge-Sammlung Gerät, und nun fragen Sie sich, wie man tatsächlich ** ** Build es. Willkommen im Klub! So war I. Wie ich herausstellt - und Pine-64 nicht Ihnen sagt vorne - aber es ist eigentlich ziemlich begrenzte Unterstützung für den Touchscreen-Display. Die eine, die sie verkaufen. Richtig. Anscheinend funktioniert es gut mit Android, aber das wirklich hat mir nicht viel helfen. Die Version von Linux Sie ziemlich viel * haben * Gebrauch genannt wird [Armbian](https://www.armbian.com). Richtig, ich hatte auch nie davon gehört. Vor nur Tauchen in und Installation, ich ** ** stark vorschlagen, dass Sie alles lesen und verstehen). Richtig, ich hatte auch nie davon gehört. Vor nur Tauchen in und Installation, ich ** ** stark vorschlagen, dass Sie alles lesen und verstehen [hier](https://www.armbian.com/pine64/). Ja wirklich. Ich tat es nicht, und es war eine ziemlich schmerzhafte Erfahrung. Das ist auch, weil Dinge wie der Touchscreen-Treiber nicht dann in der Hauptstrecke waren, was es jetzt ist.

Das nächste, was war, natürlich, erhalten [InfluxDB](https://www.influxdata.com) und der Rest des) und der Rest des [TICK stack](https://www.influxdata.com/time-series-platform/) Eingerichtet. Zum Glück ist das super einfach - natürlich. Hier ist die schnellste und einfachste Art und Weise zu tun, dass:

```
curl -sL https://repos.influxdata.com/influxdb.key | sudo apt-key add -
source /etc/lsb-release
echo "deb https://repos.influxdata.com/${DISTRIB_ID,,} ${DISTRIB_CODENAME} stable" | sudo tee /etc/apt/sources.list.d/influxdb.list
```

Das wird die folgende Zeile in Ihrer sources.list.d / influxdb.list Datei hinzufügen:

```
deb https://repos.influxdata.com/ubuntu xenial stable
```

Welches ist, was Sie wollen. Dann renne:

```
$ sudo apt-get update
$ sudo apt-get install influxdb chronograf telegraf kapacitor
```

und du bist fertig! Nun, alles, was Sie tun müssen, ist sicher, dass der Code für jeden der Sensoren oben richtig installiert ist, und ... Sie sind fast da.

Sie wollen die Mosquito MQTT Broker von Eclipse-IoT installieren, aber zum Glück, dass das so einfach wie apt-get Moskito installieren und Sie sind gut zu gehen.

Denken Sie daran, dass ich gesagt, du ** alle ** der Armbian docs lesen sollte? Richtig, wenn Sie getan haben, dann werden Sie wissen, dass Bluetooth tatsächlich nicht von der Box funktioniert. Also hier ist, wie ich das gelöst. Ich habe ein Skript, genannt ‚ble.sh‘:

```sh
#! /bin/sh

/usr/sbin/rfkill list
/usr/local/bin/rtk_hciattach -n -s 115200 /dev/ttyS1 rtk_h5
/bin/hciconfig hci0 up
```

Das wird den ble Geräte-Setup erledigen. Aber hat es jedes Mal, wenn Ihr Gerät einen Neustart ausgeführt werden, so dass ich für sie eine SystemV Dienststeuer erstellt

```
/lib/systemd/system/bluetooth-device.service
[Unit]
Description=Bring the BLE device online, if possible
After=network-online.target

[Service]
ExecStart=/bin/sh /usr/local/bin/ble.sh
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

Jetzt wird es jedes Mal das Gerät einen Neustart laufen und erst nach dem Netzwerk auf.

Ich wollte eigentlich die ganze Box im Grunde automatisch sein, so dass ich eine Menge anderer Sachen als Systemdienst tat, wie der Bluetooth-Reader Go-Skript, das Serial Port Go-Skript usw. all diese ebenfalls automatisch beim Booten gestartet werden, nur so dass es im Grunde Null Eingreifen des Benutzers erforderlich ist. Ich baute diese als Datengerät, so Null-Konfiguration ein Ziel, und ein Merkmal war.

Wenn Sie den WiFi / BLE Adapter gekauft - was Sie wirklich haben sollte - dann bekommen Sie 2 WiFi-Schnittstellen. Ich habe einen von ihnen als privatem Zugangspunkt für die lokalen WiFi-Sensoren und der andere verließ ich ein anderes WiFi-Netzwerk für Daten-Upload zu verbinden. Armbian kommt mit seinem eigenen hostapd installiert, so dass Sie nur, dass der Access Point einzurichten verwenden können. Verwenden Sie die wlan1 Schnittstelle für die AP.

So, jetzt haben Sie eine Box, die alle die richtigen Teile hat, und ** ** sollte der Lage sein, jede und alle Sensoren über Verbindungs- und Protokolldaten beschrieben zu haben. Hier ist, was auf meinen das Armaturenbrett wie folgt aussieht:

![SafariScreenSnapz037](/posts/category/iot/iot-hardware/images/SafariScreenSnapz037.png)

Ziemlich bissig! Nun gibt es ein paar Dashboardelemente dort, dass Sie nicht in der Lage sein zu bekommen - zumindest aus der Box. Das sind die RSSI-Monitore und die Batterieüberwachung. Das ist, weil diejenigen, die nicht Teil des telegraf sind (noch) nicht. Ich schrieb diesen Sammler selbst. Sie können diejenigen, die aus meiner GitHub Gabel von Telegrafen erhalten Sie [hier](https://github.com/davidgs/telegraf/tree/iotEdge). Es ist in der ‚IoTEdge‘ Zweig. bauen nur das, und aktualisieren Sie Ihre telegraf.conf Datei mit folgendem:

```yaml
[[inputs.linux_battery]]
# ## command for reading. If empty default path will be used:
# ## This can also be overridden with env variable, see README.
battstatus = "/sys/class/power_supply/battery/status"
battvoltage = "/sys/class/power_supply/battery/voltage_now"
battcurrent = "/sys/class/power_supply/battery/current_now"
battcapacity = "/sys/class/power_supply/battery/capacity"
batthealth = "/sys/class/power_supply/battery/health"
```

und

```yaml
# # Collect wireless interface link quality metrics
[[inputs.linux_wireless]]
# ## file path for proc file. If empty default path will be used:
## /proc/net/wireless
# ## This can also be overridden with env variable, see README.
proc_net_wireless = "/proc/net/wireless"
# ## dump metrics with 0 values too
# dump_zeros = true
```

Das erhalten Sie die Statistiken auf der Batterie / Leistung und auf beliebige und alle drahtlosen Schnittstellen installiert. Wenn Sie wollen, um dir eine Menge Arbeit zu sparen, und ein Dashboard mag, dass Aussehen ** ** genau wie meinen Sie in einem echten Leckerbissen sind. Mit dem neuen Chronograf (v1.6) Sie können einfach speichern [diese](https://davidgs.com/IoTEdge-3.json), und importieren Sie sie dann und haben eine genaue Kopie!

Ok, wir sind fast da! Das letzte, was war, dass ich das wollte, wie gesagt, zu ‚automatischen‘ so habe ich niemand Login haben will, oder das Armaturenbrett zu starten, usw. So zuerst, ich den Login-Bit bekommen hatte zu befreien.

Ich installierte ‚nodm‘ als Standard-Manager, die auf Booten den Login-Bildschirm umgeht. Das ist ziemlich einfach. Aber jetzt, um sicherzustellen, dass das Dashboard standardmäßig immer aufkommt, auf Vollbild, so gibt es sehr wenig Raum für Endverbraucher shenanigan. Sie benötigen einen Startpunkt für Chromium-Browser zu erstellen:

```
demokit-2:/home/demo/.config# cat autostart/dashboard.desktop
[Desktop Entry]
Encoding=UTF-8
Version=0.9.4
Type=Application
Name=Chronograf Dashboard
Comment=dashboard
Exec=chromium-browser --incognito --kiosk http://localhost:8888/sources/1/dashboards/1#
OnlyShowIn=XFCE;
StartupNotify=false
Terminal=false
Hidden=false
```

Ich habe einen Benutzer ‚Demo‘, die ** sehr hat ** begrenzte Berechtigungen, und legen Sie diese Datei in ihrem .config / Autostart-Verzeichnis. Das Kick off Chrome-Browser, sich direkt auf dem Armaturenbrett, ohne Fensterdekorationen, so dass der Benutzer den Browser nicht verlassen kann und hat Zugriff auf den Benutzer-Desktop. Der einzige Nachteil ist, dass Sie eine alternative Methode zur Protokollierung haben müssen und die Steuerung / Konfiguration Dinge. Dafür habe ich installiert TightVNC - und ermöglichte es unter ** ** verschiedenen Benutzer, den ich erstellt. So gibt es eine ‚Setup‘ Benutzer, die mit TightVNC anmelden können Dinge wie ändern zu tun, die WiFi-Einrichtung, etc., aber die ‚Demo‘ Benutzer erhält immer die vordefinierten Armaturenbrett.

## Fazit

Das sollte ein guter Start für den Aufbau dieser ganze Setup sein. Ich gebe zu, dass Armbian fiddly ein wenig sein kann, und nimmt eine ganze Menge TLC es Setup richtig zu erhalten. die WiFi-AP Arbeits bekommen, und die andere ** ** WiFi-Schnittstelle an einen Upstream-Internet-Anschluss verbindet, ist hart. Der Upstream-WiFi hat die unangenehme Angewohnheit, nur Abwurf oder seine Standard-Route zu verlieren, usw.

Ich habe wahrscheinlich ein paar kleine Kniffe ich hier gemacht vergessen und es um die Dinge reibungslos funktionieren, und wo ich Dinge weggelassen, ich entschuldige mich. Ich übernahm das Projekt im Laufe von mehreren Monaten und bin immer wieder kleine Verbesserungen. Es ist schwierig, aus dem Überblick über all die kleinen Änderungen zu halten. Wenn Sie etwas finden, die falsch sind oder aktualisiert werden muss, bitte kontaktieren Sie mich und lassen Sie mich wissen!

Und schließlich, wenn Sie eine dieser bauen, würde ich gerne davon hören! Lassen Sie mich wissen, was Sie gebaut, und wie Sie es verwenden!
