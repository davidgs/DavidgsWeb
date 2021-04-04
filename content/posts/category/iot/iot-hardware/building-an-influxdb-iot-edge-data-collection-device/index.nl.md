---
title: "Bouwen aan een InfluxDB IoT Edge Data Collection Device"
Date: 2018-07-20
Author: davidgs
Category: Gadgetry, IoT
Tags: InfluxData, InfluxDB, IoT, IoT Data, IoT Gateway
Slug: building-an-influxdb-iot-edge-data-collection-device
hero: images/IMG_4086.png
---

Ik heb gezegd Ik was van plan om dit hele project nu schrijven voor enige tijd, maar het is zo'n zware taak die ik heb het uitstellen, het starten en stoppen, en in het algemeen niet krijgen van het voor een paar maanden gedaan geweest. Tot slot heb ik het! Dit is zowel een hardware te bouwen en een software te bouwen, en er zijn een **lot** van bewegende delen, dus wees voorbereid!

## Overzicht

Ik wilde een demonstratie systeem dat zou pronken met de mogelijkheden van het gebruik van InfluxData bouwen - het hele TIK Stack - op de uiterste rand van een ivd Architecture. Terwijl veel bedrijven zijn weddenschappen op de wolk voor ivd het verzamelen van gegevens, ik begrijp dat voor sommige - met name in de Industrial ivd ruimte - een cloud-eerste strategie is gewoon een non-starter. Bovendien, met een breed scala aan netwerkconnectiviteit modaliteiten - WiFi, BLE, LoRAWAN, etc. - worden ingezet, op een gegeven moment moet je gewoon een edge-apparaat aan te sluiten op uw end-sensoren hebben. In wezen, ik wilde deze architectuur diagram samen in het echte leven te trekken.

![architectuur](/posts/category/iot/iot-hardware/images/architecture.gif)

Dus ik moest een bos van sensoren back-haul data op te bouwen, en dan bouwen een rand het verzamelen van gegevens in en klik vervolgens sluit deze dan aan het internet en hebben het naar de cloud. Laten we beginnen met de sensor bouwt.

## De hardware

Zoals hierboven vermeld, ik wilde nemen zo veel sensoren en communicatieprotocollen, als ik kon met het oog op een zo breed mogelijke inzet scenario te dekken. Ik uiteindelijk bouwen van een CO2 sensor aangesloten via Bluetooth Low Energy (BLE), temperatuur, vochtigheid, druk, zichtbaar licht en infrarood sensor aangesloten via WiFi, een stralingssensor verbonden via LoRAWAN en een contactloze temperatuursensor eveneens verbonden via LoRaWan. Dat is een hoop van sensoren om te bouwen, en een heleboel RF protocollen op te nemen.

### De WiFi Sensor

Laten we pakken deze eerste, zullen we? Hier is de stuklijst je nodig hebt om deze te bouwen:

- [Particle Photon](https://store.particle.io)
- Bosch BME280 (ik heb de mijne van [Adafruit](https://www.adafruit.com/product/2652))
- [Adafruit TLS2561](https://www.adafruit.com/product/2652) lichtsensor

Ik gebruikte I2C om hen aansluiten, omdat het gebruikt de minste pinnen, en ik kon de pinnen te delen. Hier is het schakelschema:

![bedrading](/posts/category/iot/iot-hardware/images/Wiring.png)

Ik bedraad ze mijn Particle Photon en schreef een beetje van software. We krijgen met die in de afdeling Software, maar het was vrij triviaal te doen gezien het feit dat Particle apparaten zijn geprogrammeerd in een Arduino-achtige taal en zijn vrij eenvoudig te hanteren.

I 3-D afgedrukt een mooie doos daarvoor en gebruikt superdunne keramische gecoate draad te solderen allemaal samen zo kwam in een mooi pakket:

![IMG 4090](/posts/category/iot/iot-hardware/images/IMG_4090.png)

![IMG 4089](/posts/category/iot/iot-hardware/images/IMG_4089.png)

![IMG 4092](/posts/category/iot/iot-hardware/images/IMG_4092.png)

De sensor platen worden opgehangen aan de binnenkant, in de voorkant van de ventilatiegaten, zodat ze (min of meer) metingen nauwkeurig te krijgen.

### De BLE <sub>CO2</sub> Sensor

Dit was een beetje meer van een uitdaging voor een paar redenen. Maar eerst de stuklijst:

- Nordic nRF52DK developer kit (ik heb de mijne van [DigiKey] (https://www.digikey.com/product-detail/en/nordic-semiconductor-asa/NRF52-DK/1490-1053-ND/5773879?utm_adgroup= Semiconductor% 20Modules &amp; geschoven = &amp; gclid = EAIaIQobChMIvJTLptKr3AIVSsDICh0z8QCnEAAYASAAEgJg-PD_BwE))
- [SenseAir K30](https://senseair.com/products/flexibility-counts/k30/) CO <sub>2</sub> -sensor
- 4700μF Capacitor ([Adafruit](https://www.adafruit.com/product/1589) aan de redding weer!)
- 9v Boost Converter (ik heb de mijne van [Pololu](https://www.pololu.com/product/2116))

Om dingen te maken een beetje minder ingewikkeld, ik bedraad de Boost naar de nRF52, en zet dan de condensator op de Vout van de boost als volgt uit:

![IMG 4100](/posts/category/iot/iot-hardware/images/IMG_4100.png)

Ik ben er niet zeker van dat het maakte dingen*makkelijker* per se, maar het was hoe ik deed het toch. Als je een elektrotechnisch ingenieur, en zijn op dit moment lachen, neem dan gerust contact op te nemen en wijzen op de fout van mijn wegen.

Ik zal in om het meer in de software secties, maar dit was een beetje een beest om de controle. Ten eerste, **NIET** Gebruik deze sensor direct aangesloten op een Arduino! Het absoluut **zal** eet je voltage regulator. Het vereist 5v-12V en 500mA en volgens de fabrikant, is er geen Arduino daar met een regelaar die het aankan. De nRF52DK bestuur beweert dat ze kunnen, maar ik ben sceptisch over die vordering tot op zekere hoogte.

Nogmaals, I3-D drukte een mooie doos met luchtgaten in de top te zorgen voor luchtstroom.

![IMG 4087](/posts/category/iot/iot-hardware/images/IMG_4087.png)

![IMG 4096](/posts/category/iot/iot-hardware/images/IMG_4096.png)

Ik blijf op zoek naar een kleinere-BLE gebaseerde boord om dit ding rijden - een die Arduino niet wordt uitgevoerd - maar ik heb nog niet de juiste te vinden.

### Lora Stralingssensor

Deze was super leuk om te bouwen. Ik ben opgegroeid in Los Alamos, NM (The Atomic City!), Dus er is dat. Maar ik had uitgenodigd aanwezig te zijn bij een workshop in Italië door het Internationaal Atoomenergie Agentschap van de Verenigde Naties die gehost wordt op “Radiation Monitoring via LoRaWAN” dus ik **moest** een straling sensor te bouwen! (Het was erg netjes, en ik geblogd over [hier](https://www.influxdata.com/blog/influxdb-the-united-nations-and-radiation/))

Hier is wat ik heb gebruikt:

- Pocket Geiger Stralingssensor (van [SparkFun Electronics](https://www.sparkfun.com/products/14209))
- [Wemos D1 Mini] (https://www.aliexpress.com/store/product/D1-mini-Mini-NodeMcu-4M-bytes-Lua-WIFI-Internet-of-Things-development-board-based-ESP8266 /1331105_32529101036.html?spm=2114.12010612.8148356.13.38593ca0eqsbug) (ik heb **niet** aan de D1 Mini Pro als alle degene die ik kocht defect WiFi en waren onbruikbaar, hoewel ik niet de WiFi voor deze onderdelen niet te gebruiken)
- Lora Radio Board (van [Adafruit](https://www.adafruit.com/product/3072), natuurlijk)
- Een witte LED

Je bent waarschijnlijk afvragen waarom ik gebruik gemaakt van een Wemos D1 (die beschikt over WiFi) in dit ding dat is het gebruik van een Lora radio, en ik zal u vertellen waarom: Ik heb een goedkopere bord aan de lora Radio Board controle niet kon vinden **en** de sensor board. Bij $ 3,00 was het gewoon het juiste ding. Ik draaide net de WiFi uit en ging met het.

Voor de LED Ik gebruikte die ik nog had liggen. Geen idee waar het vandaan kwam.

Deze kwam uit echt mooi!

![IMG 4084](/posts/category/iot/iot-hardware/images/IMG_4084.png)

Zoals u kunt zien, het duurde een behoorlijke hoeveelheid werk om alles in de doos, met al die draden, enz. Maar het allen in geslaagd om goed passen te krijgen.

![IMG 4101](/posts/category/iot/iot-hardware/images/IMG_4101.png)

### De contactloze temperatuursensor

Nogmaals, super eenvoudig.

- Wemos D1 Mini (zie hierboven)
- LoRad Radio Board (zie hierboven)
- Melexis MLX90614 sensor (U kunt één van krijgen [Adafruit](https://www.adafruit.com/product/1748))
- Een groene LED

Ik geef toe dat je dezelfde Melexis sensor die ik heb gebruikt, maar dat komt omdat de weg terug in de dag niet kan krijgen, terug in de [Project zon SPOT](http://sunspotdev.org/) dagen, bouwden we een beetje sensor board voor de MLX90614 dat maakte het gemakkelijk te gebruiken dan I2C. Ik ben toevallig een paar van die rondslingeren (uit zoals 2006!), Dus ik één gebruikt. Nogmaals, ik gebruikte de Wemos D1 Mini, met de WiFi-radio uitgezet, zowel voor de sensor en de lora Board simpelweg omdat het goedkoop te bedienen (en ik had een bos van Wemos D1 Mini Pros liggen rond met Wifi die niet werkte hoe dan ook. Vergeet niet, niet kopen die.)

Hetzelfde met de groene LED. Had net een rondslingeren.

Hier is de temperatuur sensor bord kunt u niet:
![IMG 3699](/posts/category/iot/iot-hardware/images/IMG_3699.png)

En hier is het definitieve pakket:

![IMG 4094 1](/posts/category/iot/iot-hardware/images/IMG_4094-1.png)

Nogmaals, het krijgen van alle draden in nam een aantal handige solderen en verpakking, maar het allen in geslaagd om te passen in het einde:

![IMG 3714](/posts/category/iot/iot-hardware/images/IMG_3714.png)

Zodat concludeert de sensor hardware. Nu, op de Edge Data Collection Node Hardware!

## Bouwen aan de Edge Collector

Ik geef toe dat ik kon een Raspberry Pi. Maar eerlijk gezegd had ik het Pine-64 op Kickstarter gesteund en ik had geen gebruik gemaakt van de raad van bestuur voor om het even wat, dus ik besloot om het te gebruiken. Ook het vinden van schermen en etuis, voor Raspberry Pi is eenvoudig, denk ik, maar er zijn zo veel van hen dat het moeilijk was om te kiezen, en Pine64 heeft het allemaal op één plek.

Hier is wat ik nodig had voor de bouw:

- [Pine-64 LTS] (https://www.pine64.org/?product=pine-a64-lts) Main Board ($ 32.00)
- [WiFi / BLE kaart] (https://www.pine64.org/?product=wifi-802-11bgn-bluetooth-4-0-module) ($ 9.99)
- [7” TFT touchscreen] (https://www.pine64.org/?product=7-lcd-touch-screen-panel) ($ 35.99)
- [Pine64 Playbox Enclosure] (https://www.pine64.org/?product=pine64-playbox-enclosure) ($ 9.99)
- [LiPo Battery] (https://www.pine64.org/?product=lithium-polymer-battery-us-only) ($ 21.99)
- Lora Board (zie hierboven)
- Wemos D1 Mini (zie hierboven)

Optioneel maar aanbevolen

- 64GB EMMC Module ($ 34.95)

Ik heb eigenlijk gebruikte een 64GB MicroSSD kaart in de mijne, maar de locatie van de kaartsleuf is zo verschrikkelijk dat ik uiteindelijk het breken van één en het hebben van om het te vervangen. Als ik naar een ander te bouwen, zou ik de EMMC module te gebruiken voor zeker.

Ik ben er zeker van dat je je hoofd krabben en denken: “Waarom is er een Wemos D1 in dit stukje kit ??” En ik zal je vertellen! Nogmaals, het is alleen maar om de lora de besturingskaart. Ja, ik absoluut zou hebben dat bediend vanaf de Pine64, maar ik heb al de werkende code om de Lora boord van een Wemos controle had al, en het is klein en neemt weinig ruimte in beslag, dus ik gevoed het van de 5v pin op de RPI header en was goed om te gaan. Ik bedraad het is UART Tx pin van de RPI koptekst Rx pin en eenvoudig schreef alle gegevens komen over de Lora Radio inkomende seriële poort van de Pine-64, waar ik toen kon het ophalen en opslaan.

Ik denk dat het kwam vrij aardig!

![IMG 4086](/posts/category/iot/iot-hardware/images/IMG_4086.png)

Nogmaals, alle draden waren een beetje veel, en ik moest een extra gat te boren in de zaak naar de lora antenne te monteren, maar zelfs de binnenkant zag er mooi:

![IMG 3705 1](/posts/category/iot/iot-hardware/images/IMG_3705-1.png)

Er is eigenlijk een Z-Wave module in er ook, maar alleen omdat het kwam met mijn Kickstarter Bundle. Ik ben niet echt met behulp van het nog niet.

Nu, hoe ben ik dat gelikte dashboard van al mijn sensor data op daar? Nou, dat is eigenlijk de gemakkelijkste deel van de software te bouwen, dus laten we aan de software!

## De software

Ik ga door de software die ik gebouwd in dezelfde volgorde als de hardware, net zo consequent zijn als. Viel vrij om rond te springen op de delen die je het belang van de meest.

### De WiFi Sensor

Het programmeren van de Particle Fotonen is super eenvoudig met behulp van hun web-gebaseerde ontwikkelomgeving. Ze hebben een Desktop-versie ook, op basis van Atom, maar ik had regelmatig problemen mee, dus ik vast aan de on-line één. Een van de weinige nadelen aan Particle is dat ze verwachten dat alles om te gaan door middel van hun cloud, maar hun wolk heeft op geen enkele manier van het opslaan en analyseren van gegevens. Een vrij grote zwakte, als je het mij vraagt. Maar zelfs als het niet deed, zou ik hebben gehad om dingen te doen op deze manier, omdat, zoals eerder gezegd, ik heb geen zin om een cloud-first architectuur te doen. Ik wilde de rand apparaat om de gegevens te verzamelen. Ik wilde verbinden met een eigen WiFi-netwerk (geserveerd door de rand apparaat zelf) en al mijn data daarheen te sturen.

Het blijkt dat het eerste wat een deeltje Photon altijd probeert te doen is contact opnemen met de Particle Cloud. Als het niet kan, dan dingen raar. Dus het eerste wat ik moest doen was vertellen dat het om te behagen stop om dat te doen!

```cpp
Particle.disconnect();
WiFi.connect();
```

Die stopt dat! En dan sluit ik mijn prive WiFi. (Je moet dit te configureren via een USB-aansluiting op uw Photon!).

Hier is alle code, en ik kan dan doorheen gaan in meer detail:

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
        Serial.println("------------------------------------");
        Serial.println("");
        delay(500);
    }
}

```

Vrij eenvoudig. Initialiseer de sensoren (en proberen een paar keer). Als de initialisatie mislukt, zorg ervoor dat handvat dat ook. Ik gebruikte de bee_config en tsl_config booleans voor. Lees dan sensorgegevens elke seconde en stuur het naar de server InfluxDB een JSON object. Ik ben eigenlijk opnieuw met behulp van de Particle Plugin voor Telegraf dat ik schreef, alleen maar omdat ik kon. Ik heb eigenlijk schreef de [docs](https://docs.particle.io/tutorials/integrations/influxdata/core/#using-influxcloud) over bij Particle.io voor de [InfluxDB / Particle integratie] (https: // docs .particle.io / tutorials / integraties / influxdata / kern / # met behulp van influxcloud) (omdat ik schreef ook de integratie, natuurlijk) dus voel je vrij om een kijkje op dat nemen als je wilt.

Ik heb nu een deeltje Photon posting temperatuur (° C en F), luchtdruk, vochtigheid, infrarood licht, zichtbaar licht en lux mijn randinrichting per seconde. Nou, ik zou als ik had een rand apparaat gebouwd. Dat komt.

### De BLE <sub>CO2</sub> Sensor

Zoals ik al eerder zei, dit was een beetje lastiger. Ik had dit kunnen geprogrammeerd met Arduino, en in eerste instantie ik deed. Maar Arduino is gewoon niet tot de taak met deze sensor. Dat komt omdat I2C van de sensor af en toe vastloopt, en wanneer dat gebeurt in Arduino-land, je bent vrij veel vast te zitten. Je moet de raad van bestuur opnieuw te starten. Dat is prima, denk ik, maar als het gebeurt elke 30 seconden, maakt het verzamelen van gegevens weinig betrouwbaar. Dus gebruikte ik ingebed C op mbed plaats. Er zijn ook twee kanten aan deze sensor. Een daarvan was de werkelijke sensor code die draait op de nRF52DK boord. De andere was de code kan worden uitgevoerd on the Edge apparaat verbinding via bluetooth en krijgen de gegevens. Dus laten we beginnen met het apparaat-code. Eerst moest ik een BLE GATT Kenmerkend voor de CO2-waarde te definiëren, zodat ik dat deed:

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

Dat is onze GATT-service, zodat wanneer we het noemen, krijgen we de bijgewerkte CO2-waarde van de sensor. Nu is de code om de sensor data te krijgen. Vergeet niet, dit is I2C code in C. Ik ga om te gaan door middel van het in stukjes om het meer duidelijk is wat ik doe.

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

De `k30.h` is de code boven het definiëren van de GATT Dienst. Vervolgens laten we alle variabele, enz. Gedefinieerd.

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

De nRF52DK heeft 4 dienst LED's aan boord. Ik wilde dat ze rond en rond te gaan in de juiste volgorde, want ik kon. Oh, en ze moeten ook in staat zijn om terug te gaan. Vraag niet hoe lang ik heb het verkrijgen van de juiste timing dus het zag er mooi.

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

Nu komen we bij het interessante bit: eigenlijk het lezen van de sensor! Dit is vrij eenvoudig I2C. De SenseAir Docs hebben alle details zoals de I2C-adres, de commando's, enz. Zodat al voor mij gedaan. Als u gebruik maakt Arduino, er is eigenlijk een compleet Arduino sketch dat dit ook.

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

Je hebt een paar dingen het bericht in daar. Ten eerste, de sensor heeft een checksum byte, en de sensor heeft inderdaad soms niet deze test. Ik bijhouden van het aantal storingen in. Een rij. Als ik meer dan 5 fouten op een rij, heb ik geconcludeerd dat de sensor moeite heeft, zodat ik de raad van bestuur opnieuw op te starten en opnieuw beginnen. Na een lange ** ** beetje trial and error, ik vond dat dit een geschikte oplossing.

De rest van deze code is vrij standaard standaardtekst voor BLE-verbindingen, enz. En inderdaad meestal kwam uit de mbed voorbeeld programma's.

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

Dus dat leest de CO2-waarde van de sensor elke (wat lijkt) tweede - in ieder geval de callback wordt aangeroepen per seconde verwerkt. Maar in dat callback ik de lichten rond, die een extra ~ 3.25 seconden duurt. En er is een reden voor. Als ik gewoon lezen van de sensor elke seconde, dan zou ik dubbele resultaten te krijgen, en nog veel meer mislukkingen. Dat komt omdat de sensor zelf alleen werkt de registers om de 2 seconden of zo. En als je probeert te lezen terwijl het hen is het updaten, het hangt. Dus dit was mijn compromis voor betrouwbaarheid sensor. Lijkt te succesvol zijn geweest.

Nu, zoals ik al zei, ik nog moest **gelezen** de gegevens via bluetooth van de Edge Device, dus ik moest iets te hanteren dat schrijven. De meest effectieve manier om uw Bluetooth-apparaat van Linux te krijgen is met behulp van gatttool, maar dat is eigenlijk een command-line tool. Ik ben vrij zeker dat ik wat meer C-code om direct toegang te krijgen tot de BLE apparaat had kunnen schrijven, maar ik besloot om een klein programma in Go schrijven om gewoon gebruik maken gatttool om het te doen. Nogmaals, ik ga door deze in secties voor jou.

We beginnen met een aantal standaard Go invoer en definities:

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

De enige echt interessante dingen zijn er de omzetting van een bos van bytes naar een Float32. Blijkt dat als je leest van gatttool wat je terugkrijgt is een array van ruwe bytes. Aangezien ik schreef een Float BLE van de inrichting, moet ik die 4 bytes naar een Float zetten. Met dank aan Google, vond ik een manier om dat te doen.

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

Ok, ik weet het, je zegt WTF ?? Maar ja, ik gebruikte krul om de gegevens te versturen naar de database. Het leek een goed idee op het moment. Ik zal opnieuw geschreven te worden met behulp van de dag InfluxDB Go Library, maar ik had haast.

Het volgende bit was leuk.

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

Nu dat ziet eruit als een veel, en ziet verwarrend, maar hier is wat het eigenlijk doet. U ziet, het kan GATTTOOL openen, maar als het apparaat aan de andere kant is of niet is, of is losgekoppeld, dan dingen te breken. Dus ik moet time-out op de gatttool commando en retry als dat gebeurt (die, als je nog de sensor code, het is zeker waard als de sensor blokkeert). Dus er is een hele hoop van de controles om ervoor te zorgen dat we krijgen in verband, dat we een resultaat, en dat het resultaat ten minste nominaal rationele voordat we gaan en proberen om het te plaatsen aan de database. Net geloof me als ik zeg dat er veel trial and error en mislukkingen ging in het maken van deze robuuste. En het is robuust. Het is perfect lopen voor meer dan een maand nu, 24/7, zonder problemen.

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

Nogmaals, redelijk simpel. Gewoon het opzetten van een aantal logging functionaliteit, en dan voor altijd uit te voeren. Uiteraard moet u het programma passeren het MAC-adres van de BLE apparaat waarmee u verbinding wilt maken, maar dat is het enige wat je nodig hebt.

Zodat de CO2-sensor, zowel de sensor zijde en vanaf de edge apparaat- zijde. *** whew ***

### Lora Sensors

Dit zijn eigenlijk twee afzonderlijke sensoren, zoals u weet, maar ik ga om ons te redden allemaal een beetje tijd door ze te combineren, omdat ze een ton van de code te delen. Nogmaals, ik ga door de code in stukken om het gemakkelijker te maken. De Stralingssensor kwam met een leuke Arduino Library, dus gewoon gebruikt die.

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

Dat is de definieert voor de Stralingssensor. Nu hier is de spullen voor de Melexis temperatuur sensor (nogmaals, er is een Arduino Library die er het gemakkelijk waardoor).

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

Toen gingen ze allebei hetzelfde doen setup functie:

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

De Stralingssensor moet wat callbacks registreren, en die callbacks definiëren:

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

Ik gedefinieerd mijn eigen bericht formaat, want ik had te maken tussen de twee sensoren, en ik had nog steeds de boodschap grootte zeer klein te houden naar de radio boord van het indelen in afzonderlijke pakketten te houden.

Initialiseren van de Melexis sensor was een oproep aan

```cpp
mlx.begin()
```

Vervolgens gewoon lussen altijd het lezen en verzenden van gegevens:

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

Beide sensoren hebben exact dezelfde boodschap verzenden / antwoord functies:

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

Technisch gezien heb ik niet te wachten op een antwoord, maar ik doe, net voor het debuggen doeleinden. Nu, zoals je zou verwachten, is er een soortgelijke code die draaien op de Wemos in de Edge Collector verscholen, en het is heel eenvoudig, en zeer vergelijkbaar. Het leest alleen berichten van de radio, formatteert ze een beetje, en schrijft ze naar de seriële poort.

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

De lus gewoon wacht op een bericht en formatteert deze:

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

Je bent waarschijnlijk zeggen: “Maar is het niet zo Serial lijn chatter gaan knoeien met de database?” en je zou gelijk hebben, behalve dat ik schreef enkele Go code on the Edge apparaat om de gegevens van de seriële poort en behandelen.

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

En ja, er is waarschijnlijk een betere manier, maar ik heb de code had al vanaf het*andere* sensor en ik was weer in een haast. Dus daar heb je het.

En dat is alles wat de sensor code! Je zou nu in staat zijn om alle sensoren te bouwen, dat ik gebouwd en hebben ze uit te voeren hetzelfde. Maar wat je *** echt *** kwamen hier voor was the Edge Collection apparaat! Ik weet het, dat is waarom ik het voor het laatst bewaard. Dus laten we aan dat!

### Edge verzamelinrichting

Dus, heb je de $ 100 of zo voor alle onderdelen voor de Edge Collection inrichting doorgebracht, en nu je je afvraagt hoe je nu eigenlijk **build** het. Welkom bij de club! Dus was I. Het blijkt dat - en Pine-64 niet vertellen u dit van te voren - maar er is eigenlijk vrij beperkte ondersteuning voor het touchscreen display. Degene die ze verkopen. Rechtsaf. Blijkbaar werkt uitstekend met Android, maar die echt me niet veel helpen. De versie van Linux u vrijwel*moet* gebruik te maken heet [Armbian](https://www.armbian.com). Juist, had ik nog nooit gehoord van het ofwel. Voordat gewoon duiken in en het installeren van het, ik **sterk** stel voor dat u lezen en begrijpen alles [hier](https://www.armbian.com/pine64/). Werkelijk. Ik niet, en het was een tamelijk pijnlijke ervaring. Dat is ook omdat zaken als de Touchscreen bestuurder was niet in de mainline dan, wat het nu is.

Volgende ding was natuurlijk te krijgen [InfluxDB](https://www.influxdata.com) en de rest van de [TIK stack](https://www.influxdata.com/time-series-platform/) geïnstalleerd. Gelukkig, dat is super eenvoudig - natuurlijk. Hier is de snelste en eenvoudigste manier om dat te doen:

```
curl -sL https://repos.influxdata.com/influxdb.key | sudo apt-key add -
source /etc/lsb-release
echo "deb https://repos.influxdata.com/${DISTRIB_ID,,} ${DISTRIB_CODENAME} stable" | sudo tee /etc/apt/sources.list.d/influxdb.list
```

Dat zal de volgende regel toe te voegen aan uw sources.list.d / influxdb.list file:

```
deb https://repos.influxdata.com/ubuntu xenial stable
```

Dat is wat je wilt. Dan draaien:

```
$ sudo apt-get update
$ sudo apt-get install influxdb chronograf telegraf kapacitor
```

en je bent klaar! Nu, alles wat je hoeft te doen is ervoor zorgen dat de code voor elk van de sensoren bovenstaande correct is geïnstalleerd, en ... je bent er bijna.

U wilt de Mosquito MQTT makelaar van Eclipse ivd installeren, maar gelukkig dat het zo simpel als apt-get install mug en je bent goed om te gaan.

Vergeet niet dat ik zei dat je moet lezen **alle** van de Armbian docs? Juist, als je dat deed, dan weet je dat Bluetooth niet echt werken uit de doos. Dus hier is hoe ik dat opgelost. Ik heb een script, genaamd 'ble.sh':

```sh
#! /bin/sh

/usr/sbin/rfkill list
/usr/local/bin/rtk_hciattach -n -s 115200 /dev/ttyS1 rtk_h5
/bin/hciconfig hci0 up
```

Dat zal de ble installatie van het apparaat gedaan te krijgen. Maar het heeft elke keer dat het apparaat opnieuw wordt opgestart om te worden uitgevoerd, dus ik een SystemV service control voor gecreëerd

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

Nu wordt het rijden elke keer dat het apparaat opnieuw opgestart en pas nadat het netwerk is omhoog.

Eigenlijk wilde ik de hele doos in principe automatisch, dus ik heb een heleboel andere dingen als system services, zoals de Bluetooth lezer Go script, de Serial Port Go script, enz. Die allemaal automatisch starten tijdens het booten zo goed, net zo dat er in principe nul tussenkomst van de gebruiker nodig is. Ik bouwde dit als een data-apparaat, zodat configuratieloze een doel, en een eigenschap.

die je echt moet hebben - - Als u het WiFi / BLE adapter gekocht dan krijg je 2 WiFi-interfaces. Ik zette een van hen als een privé-toegangspunt voor lokale WiFi-sensoren en de andere ik vertrok om deel te nemen een ander WiFi-netwerk voor het uploaden van gegevens. Armbian komt met een eigen hostapd geïnstalleerd, dus je kunt gebruiken om het opzetten van de Access Point. Gebruik de WLAN1 interface voor het AP.

Dus nu heb je een doos die alle de juiste onderdelen heeft, en **zou** in staat zijn om alle van de bovenstaande connect en log data beschreven sensoren hebben. Hier is wat het dashboard op de mijne eruit ziet:

![SafariScreenSnapz037](/posts/category/iot/iot-hardware/images/SafariScreenSnapz037.png)

Pretty pittig! Nu zijn er een paar dashboard elementen op daar dat je niet in staat zijn om - in ieder geval uit de doos. Dat zijn de RSSI monitors en de batterij monitor. Dat komt omdat die geen deel uitmaken van Telegraf (nog) niet. Ik schreef die verzamelaars mezelf. U kunt deze uit mijn GitHub fork van Telegraf [hier] te krijgen (https://github.com/davidgs/telegraf/tree/iotEdge). Het is in de 'IoTEdge' tak. Gewoon bouwen dat, en je telegraf.conf bestand met de volgende werken:

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

en

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

Dat geeft je de statistieken op de batterij / power en op enige en alle draadloze interfaces geïnstalleerd te krijgen. Als u wilt om jezelf te redden van een ton van het werk, en willen een dashboard dat looks **precies** zoals de mijne je bent in voor een echte traktatie. Met de nieuwe Chronograf (v1.6) kunt u eenvoudig besparen [deze](https://davidgs.com/IoTEdge-3.json), en vervolgens importeren en hebben een exacte kopie!

Ok, we zijn er bijna! Het laatste wat was dat ik wilde dit, zoals ik al zei, 'automatisch' te zijn, dus ik wilde niet dat iemand te hebben om in te loggen of start het dashboard, enz. Dus eerst, ik moest om zich te ontdoen van de login-bit.

Ik installeerde 'nodm' als de standaard manager, die de login-scherm bij het opstarten omzeilt. Dat is vrij eenvoudig. Maar nu om ervoor te zorgen dat het dashboard komt altijd standaard, in full-screen, dus er is weinig ruimte voor end-user shenanigan. Je moet een startup-item voor Chromium Browser te maken:

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

Ik heb een gebruiker 'demo' dat heeft **zeer** beperkte rechten, en zet dit bestand in hun .config / autostart directory. Dat gaat van start Chrome-browser, wees rechtstreeks op het dashboard, zonder raamdecoratie, zodat de gebruiker de browser niet kan verlaten en hebben toegang tot de gebruiker bureaublad. Het enige nadeel is dat je moet een alternatieve methode van logging hebben in en het beheersen / configureren dingen. Daarvoor installeerde ik TightVNC - en stelde het onder een **andere** gebruiker die ik heb gemaakt. Dus er is een 'setup' gebruiker die kan inloggen met TightVNC om zaken als verandering van de WiFi setup, enz. Maar de 'demo' gebruiker krijgt altijd de vooraf gedefinieerde dashboard doen.

## Conclusie

Dat zou een goede start op het bouwen van deze hele setup. Ik moet toegeven dat Armbian een beetje onhandig kan zijn en neemt een behoorlijke hoeveelheid van TLC om het correct opstelling te krijgen. Het krijgen van de WiFi-AP werken, en het aansluiten van de **andere** WiFi-interface om een upstream internet verbinding is hard. De stroomopwaartse WiFi heeft een nare gewoonte van slechts afhaken, of het verliezen van de standaard route, etc.

Ik heb waarschijnlijk een stel kleine tweaks heb ik hier en daar om dingen soepel te werken, en waar ik dingen zijn weggelaten, ik verontschuldig me vergeten. Ik ondernam dit project in de loop van enkele maanden en ben voortdurend het maken van kleine verbeteringen. Het is moeilijk gebleken om bij te houden van alle kleine veranderingen te houden. Als je iets dat onjuist is, of moet worden bijgewerkt, neem dan contact met mij op en laat me weten!

En tot slot, als u een van deze te bouwen, ik zou graag meer over horen! Laat me weten wat je gebouwd, en hoe je hem gebruikt!
