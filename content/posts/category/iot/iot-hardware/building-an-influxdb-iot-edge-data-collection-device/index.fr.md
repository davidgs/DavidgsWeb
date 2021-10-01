---
title: « Construire un dispositif de collecte de données Bord InfluxDB IdO »
Date: 2018-07-20
Author: davidgs
Category: Gadgetry, IoT
Tags: InfluxData, InfluxDB, IoT, IoT Data, IoT Gateway
Slug: building-an-influxdb-iot-edge-data-collection-device
hero: images/IMG_4086.png
---

J'ai dit que je vais écrire tout ce projet pendant un certain temps maintenant, mais il a été une tâche ardue de que j'ai le mettre hors tension, le démarrage et l'arrêt, et généralement pas obtenir fait pendant quelques mois. Enfin, je l'ai! C'est à la fois une construction matérielle et une version du logiciel, et il y a beaucoup ** ** des pièces mobiles, alors soyez prêt!

## Aperçu

Je voulais construire un système de démonstration qui mettrait en valeur les capacités d'utilisation InfluxData - l'ensemble TICK Stack - sur le bord extrême d'une architecture IdO. Alors que beaucoup d'entreprises parient sur le nuage pour la collecte de données IdO, je comprends que pour certains - en particulier dans l'espace industriel IdO - une stratégie premier nuage est tout simplement un non-starter. En outre, avec une grande variété de modalités de connectivité réseau - WiFi, BLE, lorawan, etc. - en cours de déploiement, à un moment donné il vous suffit d'avoir un dispositif de bord pour vous connecter à vos terminaux capteurs. Essentiellement, je voulais tirer ce schéma d'architecture ainsi que dans la vie réelle.

![Architecture](/posts/category/iot/iot-hardware/images/architecture.gif)

Donc, je devais construire un tas de capteurs, puis construire une boîte de collecte de données de bord, puis le brancher à Internet et avoir des données back-courriers vers le nuage. Soit Commençons avec le capteur construit.

## Le matériel

Comme indiqué plus haut, je voulais intégrer autant de capteurs, et des protocoles de communication, que je pouvais afin de couvrir le plus large possible scénario de déploiement. Je fini par la construction d'un capteur de CO2 connecté par Bluetooth Low Energy (BLE), une température, l'humidité, la pression, la lumière visible et un capteur infrarouge connecté par WiFi, un capteur de rayonnement connecté par lorawan et un capteur de température sans contact également connecté sur lorawan. Cela fait beaucoup de capteurs à construire, et beaucoup de protocoles RF à intégrer.

### Le capteur WiFi

Abordons celui-ci d'abord, allons-nous? Voici les pièces dont vous avez besoin pour construire la liste ci:

- [Particle Photon](https://store.particle.io)
- Bosch BME280 (I got mine de [Adafruit](https://www.adafruit.com/product/2652))
- [Adafruit TLS2561](https://www.adafruit.com/product/2652) Capteur de lumière

Je I2C pour les brancher, puisqu'il utilise le plus petit nombre broches, et je pouvais partager les broches. Voici le schéma de câblage:

![câblage](/posts/category/iot/iot-hardware/images/Wiring.png)

Je les ai câblé à ma particule Photon et écrit un peu de logiciel. Nous y reviendrons dans la section Software, mais il était assez trivial à faire étant donné que les dispositifs de particules sont programmées dans un langage Arduino semblable et sont assez simples à manipuler.

I 3-D a imprimé une zone agréable pour elle, et utilisé super-mince fil métallique revêtu de céramique à souder ensemble de sorte qu'il est sorti dans un bon paquet:

![IMG 4090](/posts/category/iot/iot-hardware/images/IMG_4090.png)

![IMG 4089](/posts/category/iot/iot-hardware/images/IMG_4089.png)

![IMG 4092](/posts/category/iot/iot-hardware/images/IMG_4092.png)

Les cartes de capteurs sont suspendus à l'intérieur, en face des trous de ventilation, afin qu'ils puissent obtenir des lectures précises (en quelque sorte).

### Le BLE CO <sub>2</sub> Capteur

Celui-ci était un peu plus d'un défi pour quelques raisons. Mais d'abord les parties liste:

- développeur nRF52DK Nordic Kit (I got mine de [Digi-Key](https://www.digikey.com/product-detail/en/nordic-semiconductor-asa/NRF52-DK/1490-1053-ND/5773879?utm_adgroup=Semiconductor%20Modules&slid=&gclid=EAIaIQobChMIvJTLptKr3AIVSsDICh0z8QCnEAAYASAAEgJg-PD_BwE))
- [SenseAir K30](https://senseair.com/products/flexibility-counts/k30/) CO <sub>2</sub> Capteur
- 4700μF condensateur ([Adafruit](https://www.adafruit.com/product/1589) à la rescousse à nouveau!)
- Convertisseur Boost 9v (I got mine de [Pololu](https://www.pololu.com/product/2116))

Pour rendre les choses un peu moins compliqué, je câblé le coup de fouet au nRF52, puis mettre le condensateur sur la Vout du coup de pouce comme celui-ci:

![IMG 4100](/posts/category/iot/iot-hardware/images/IMG_4100.png)

Je ne suis pas certain qu'il a rendu les choses plus facile * * en tant que tel, mais il était comme je l'ai fait de toute façon. Si vous êtes un ingénieur électricien, et riez en ce moment, ne hésitez pas à entrer en contact et signaler l'erreur de mes moyens.

Je vais pour plus dans les sections du logiciel, mais celui-ci était un peu bête à contrôler. Tout d'abord, ** NE ** utiliser ce capteur filaire directement à un Arduino! Absolument ** ** sera manger votre régulateur de tension. Elle exige 5v-12v et 500mA et selon le fabricant, il n'y a pas un Arduino là-bas avec un régulateur qui peut le manipuler. Les demandes du conseil nRF52DK qu'ils peuvent, mais je suis sceptique de cette prétention à un certain degré.

Encore une fois, I 3-D a imprimé une zone agréable, avec des trous d'aération dans la partie supérieure pour permettre la circulation de l'air.

![IMG 4087](/posts/category/iot/iot-hardware/images/IMG_4087.png)

![IMG 4096](/posts/category/iot/iot-hardware/images/IMG_4096.png)

Je continue à la recherche d'une planche plus petite base BLE à conduire cette chose - qui ne fonctionne pas Arduino - mais je n'ai pas encore trouver la bonne.

### Le capteur de rayonnement LoRa

Celui-ci était super fun à construire. J'ai grandi à Los Alamos, Nouveau-Mexique (La Ville atomique!), Donc il y a cela. Mais j'avais été invité à assister à un atelier organisé en Italie par l'Agence internationale de l'énergie atomique des Nations Unies sur « surveillance des rayonnements sur lorawan » donc je viens ** ** avait pour construire un capteur de rayonnement! (Il était vraiment bien, et je blogué à ce sujet [ici](https://www.influxdata.com/blog/influxdb-the-united-nations-and-radiation/))

Voici ce que je:

- Pocket Geiger rayonnement du capteur (de (https://www.sparkfun.com/products/14209) [SparkFun Electronics])
- [Wemos D1 Mini](https://www.aliexpress.com/store/product/D1-mini-Mini-NodeMcu-4M-bytes-Lua-WIFI-Internet-of-Things-development-board-based-ESP8266/1331105_32529101036.html?spm=2114.12010612.8148356.13.38593ca0eqsbug) (je ne ** pas ** recommander la D1 Mini Pro comme tous ceux que j'avais WiFi défectueux acheté d'et étaient inutilisables, mais je n'ai pas utilisé la connexion Wi-Fi pour ces pièces)
- Conseil de la radio LoRa (de (https://www.adafruit.com/product/3072) [Adafruit], bien sûr)
- Une LED blanche

Vous vous demandez probablement pourquoi j'ai utilisé un Wemos D1 (qui a WiFi) dans cette chose qui utilise une radio LoRa, et je vais vous dire pourquoi: je ne pouvais pas trouver un conseil moins cher pour contrôler le Conseil de la radio LoRa * * et ** la carte du capteur. À 3,00 $, il était juste la bonne chose. Je viens d'avoir la connexion Wi-Fi au large et je suis allé avec elle.

Pour la LED je viens d'utiliser celui que j'avais traîner. Aucune idée d'où il vient.

Celui-ci est sorti vraiment bien!

![IMG 4084](/posts/category/iot/iot-hardware/images/IMG_4084.png)

Comme vous pouvez le voir, il a fallu un montant juste de travail pour que tout rentre dans la boîte, ce avec tous les fils, etc., mais tout a réussi à être bien ajusté.

![IMG 4101](/posts/category/iot/iot-hardware/images/IMG_4101.png)

### La température du capteur Contactless

Encore une fois, simple super.

- Wemos D1 Mini (voir ci-dessus)
- Conseil de la radio LoRad (voir ci-dessus)
- Melexis MLX90614 capteur (Vous pouvez en obtenir un de [Adafruit](https://www.adafruit.com/product/1748))
- Une LED verte

Je dois admettre que vous ne pouvez pas obtenir le même capteur Melexis que je mais c'est parce que le chemin du retour dans la journée, de retour dans le [Projet Sun SPOT](http://sunspotdev.org/) jours, nous avons construit un peu capteur bord pour le MLX90614 qui a rendu facile à utiliser sur I2C. J'arrive d'avoir quelques-unes de ceux qui traînent (comme de 2006!), Donc je un. Encore une fois, j'ai utilisé le Wemos D1 Mini, avec la radio WiFi éteint, contrôler à la fois le capteur et le Conseil LoRa simplement parce qu'il était pas cher (et j'ai eu un tas de Wemos D1 Mini Plus traîner avec Wifi qui n'a pas fonctionné de toute façon. Rappelez-vous, ne pas acheter ceux-ci.)

Même chose avec la LED verte. Je viens juste un traîner.

Voici la carte du capteur de température vous ne pouvez pas:
![IMG 3699](/posts/category/iot/iot-hardware/images/IMG_3699.png)

Et voici le paquet final:

![IMG 4094 1](/posts/category/iot/iot-hardware/images/IMG_4094-1.png)

Encore une fois, obtenir tous les fils en a pris un certain soudure et l'emballage astucieux, mais tout a réussi à adapter à la fin:

![IMG 3714](/posts/category/iot/iot-hardware/images/IMG_3714.png)

Alors que conclut le matériel du capteur. Maintenant, à la collecte de données bord matériel Node!

## La construction du collecteur bord

Je reconnais que je aurais pu utiliser un Raspberry Pi. Mais honnêtement, j'avais misé sur le pin-64 sur Kickstarter et je ne l'avais pas utilisé la carte pour quoi que ce soit, alors j'ai décidé de l'utiliser. En outre, trouver des écrans et étuis pour est facile Raspberry Pi, je suppose, mais il y a beaucoup d'entre eux qu'il était difficile de choisir, et Pine64 a tout en un seul endroit.

Voici ce que je avais besoin pour la construction:

- [Pin-64 LTS](https://www.pine64.org/?product=pine-a64-lts) Principale (32,00 $)
- [WiFi / carte BLE](https://www.pine64.org/?product=wifi-802-11bgn-bluetooth-4-0-module) (9,99 $)
- [7” TFT écran tactile](https://www.pine64.org/?product=7-lcd-touch-screen-panel) (35,99 $)
- [Pine64 Playbox boîtier](https://www.pine64.org/?product=pine64-playbox-enclosure) (9,99 $)
- [batterie LiPo](https://www.pine64.org/?product=lithium-polymer-battery-us-only) (21,99 $)
- Conseil LoRa (voir ci-dessus)
- Wemos D1 Mini (voir ci-dessus)

Facultatif mais recommandé

- 64Go CMEM Module (34,95 $)

J'ai utilisé une carte MicroSSD 64Go dans le mien, mais l'emplacement de la fente de la carte est si terrible que je fini par casser un et avoir à le remplacer. Si je devais construire un autre, j'utiliser le module CMEM sûr.

Je suis sûr que vous vous grattez la tête et de la pensée « Pourquoi est-il un Wemos D1 dans ce morceau de kit ?? » Et je vais vous le dire! Encore une fois, il est juste de contrôler la carte LoRa. Oui, je ne pouvais absolument avoir contrôlé depuis le Pine64, mais j'avais déjà tout le code de travail pour contrôler la carte LoRa d'un Wemos, et il est petit et prend très peu d'espace, donc je viens d'alimentation choisi de la broche 5v sur la tête et était RPi bon d'aller. J'ai télégraphié il UART de broche Tx à la broche d'en-tête de l'IPD Rx et simplement écrit des données provenant de la radio LoRa au port série d'entrée du Pin-64 où je pourrais alors le ramasser et de le stocker.

Je pense qu'il est sorti assez agréable!

![IMG 4086](/posts/category/iot/iot-hardware/images/IMG_4086.png)

Encore une fois, tous les fils étaient un peu beaucoup, et je devais percer un trou supplémentaire dans le cas de monter l'antenne LoRa, mais même à l'intérieur avait l'air bien:

![IMG 3705 1](/posts/category/iot/iot-hardware/images/IMG_3705-1.png)

Il y a en fait un module ZWave là aussi, mais seulement parce qu'il est venu avec mon Kickstarter Bundle. Je ne suis pas vraiment en utilisant encore.

Maintenant, comment ai-je que le tableau de bord à la recherche de marée noire de toutes mes données de capteur là-bas? Eh bien, c'est en fait la partie la plus facile de la version du logiciel, alors faisons le logiciel!

## Les logiciels

Je vais passer par le logiciel I construit dans le même ordre que le matériel, juste pour souci de cohérence. Je suis tombée libre de sauter aux parties qui vous intéressent le plus.

### Le capteur WiFi

Programmation de la particule Photons est super facile à l'aide de leur environnement de développement basé sur le Web. Ils ont une version de bureau aussi, basé sur Atom, mais j'ai eu régulièrement des problèmes avec lui donc je collé à celui en ligne. L'un des rares inconvénients à particules est qu'ils attendent que tout se passe dans leur nuage, mais leur nuage n'a aucun moyen de stockage et d'analyse des données. Une faiblesse assez grand, si vous me demandez. Mais même si elle ne l'a pas, je l'aurais dû faire les choses de cette façon parce que, comme il est dit plus haut, je ne voulais pas faire une architecture premier nuage. Je voulais que le dispositif de bord pour recueillir les données. Je voulais vous connecter à un réseau WiFi privé (servi par le dispositif de bord lui-même) et envoyer toutes mes données là-bas.

Il se trouve que la première chose une particule Photon essaie toujours de faire est de contacter la particule Cloud. Si elle ne peut pas, alors les choses deviennent étranges. Donc, la première chose que je devais faire était dire pour faire plaisir à arrêter de faire ça!

```cpp
Particle.disconnect();
WiFi.connect();
```

Cela arrête ça! Et me connecte alors à mon WiFi privé. (Vous devez configurer ce via une connexion USB à votre Photon!).

Voici tout le code, et je peux ensuite passer par plus en détail:

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
        Serial.println("---------------------------------reading_time: 39 minutes
---");
        Serial.println("");
        delay(500);
    }
}

```

Assez simple. Initialiser les capteurs (et essayer quelques fois). Si l'initialisation échoue, assurez-vous de poignée aussi bien. Je les booléens bee_config et tsl_config pour cela. Ensuite, lisez les données du capteur chaque seconde, et l'afficher sur le serveur InfluxDB dans un objet JSON. Je suis en fait réutilisant le plug-in particules pour Telegraf que je l'ai écrit, parce que je pouvais. Je l'ai écrit en fait les [docs](https://docs.particle.io/tutorials/integrations/influxdata/core/#using-influxcloud) sur au Particle.io pour) sur au Particle.io pour [InfluxDB / intégration de particules](https://docs.particle.io/tutorials/integrations/influxdata/core/#using-influxcloud) (parce que je l'ai écrit aussi l'intégration, bien sûr) ne hésitez pas à jeter un oeil à ce que si vous le souhaitez.

J'ai maintenant une température de détachement de particules de photons (° C et ° F), la pression atmosphérique, l'humidité, la lumière infrarouge, la lumière visible, et lux à mon dispositif de bord à chaque seconde. Eh bien, je le ferais si j'avais un dispositif de bord intégré. C'est à venir.

### Le BLE CO <sub>2</sub> Capteur

Comme je l'ai dit plus tôt, celui-ci était un peu plus compliqué. Je aurais pu programmer cela avec Arduino, et au début, je ne. Mais Arduino est tout simplement pas à la tâche avec ce capteur. En effet, le I2C du capteur se bloque de temps en temps, et quand cela se produit dans Arduino-terre, vous êtes un peu coincé. Vous devez redémarrer le conseil d'administration. Très bien, je suppose, mais quand il arrive toutes les 30 secondes, il fait la collecte des données peu fiables. Donc, j'ai utilisé EMBEDDED C sur Mbed à la place. Il y a aussi des deux côtés à ce capteur. L'un était le code du capteur réel qui fonctionne sur la carte nRF52DK. L'autre était le code à exécuter sur le périphérique Edge pour se connecter via Bluetooth et obtenir les données. Commençons donc avec le dispositif code. Tout d'abord, je devais définir une caractéristique BLE du GATT pour la valeur de CO2, donc je l'ai fait:

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

C'est notre service GATT afin que chaque fois que nous l'appelons, nous obtenons la valeur de CO2 mis à jour à partir du capteur. Maintenant, le code pour obtenir les données du capteur. Rappelez-vous, ce code est I2C en C. Je vais passer par là dans les sections pour le rendre plus clair ce que je fais.

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

Le `k30.h` est le code ci-dessus la définition du service du GATT. Ensuite, nous allons obtenir toutes les variables, etc. définie.

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

Le nRF52DK dispose de 4 LED de service à bord. Je voulais faire le tour et autour dans l'ordre parce que je pouvais. Oh, et ils devraient aussi pouvoir revenir en arrière. Ne demandez pas combien de temps je passé obtenir le bon moment il avait l'air agréable.

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

Maintenant, nous arrivons à la partie intéressante: la lecture en fait le capteur! C'est I2C assez simple. Les SenseAir Docs ont tous les détails comme l'adresse I2C, les commandes, etc. afin que a déjà été fait pour moi. Si vous utilisez Arduino, il y a en fait un croquis Arduino complet qui a aussi.

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

Vous remarquerez quelques choses là-dedans. Tout d'abord, le capteur a un octet de contrôle, et le capteur ne, en effet, ne parviennent pas toujours ce test. Je garde une trace du nombre de défaillances. Consécutives. Si je reçois plus de 5 échecs de suite, je conclus que le capteur est de la difficulté, donc je redémarre le conseil et recommencer. Après un peu long ** ** d'essais et d'erreurs, je trouve que cela est une solution adaptée.

Le reste de ce code est assez standard pour les connexions boilerplate BLE, etc., et en effet la plupart du temps est sorti des exemples de programmes Mbed.

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

Alors, qui lit la valeur de CO2 du capteur tous (ce qui ressemble à) secondes - au moins le rappel est appelé à chaque seconde. Mais dans ce rappel, je lance les lumières autour, qui prend un montant supplémentaire de 3,25 secondes ~. Et il y a une raison pour cela. Si je devais lire simplement le capteur chaque seconde, j'obtenir des résultats en double, et beaucoup plus d'échecs. En effet, le capteur lui-même ne met à jour ses registres toutes les 2 secondes. Et si vous essayez de lire alors qu'il est de les mettre à jour, il se bloque. Donc, ce fut mon compromis pour la fiabilité du capteur. Il semble avoir réussi.

Maintenant, comme je le disais, je devais encore lire ** ** les données via Bluetooth depuis le périphérique Edge, donc je devais écrire quelque chose pour gérer cela. La façon la plus efficace pour accéder à votre appareil Bluetooth de Linux en utilisant gatttool, mais qui est essentiellement un outil de ligne de commande. Je suis assez sûr que je aurais pu écrire un peu plus du code C pour accéder au dispositif BLE directement, mais j'ai décidé d'écrire un petit programme Aller simplement utiliser gatttool pour le faire. Encore une fois, je vais passer par cela dans les sections pour vous.

Nous commençons par des importations standards Go et définitions:

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

Les seuls morceaux vraiment intéressant il y a la conversion d'un groupe d'octets à un Float32. Il se trouve que lorsque vous lisez gatttool ce que vous obtenez en retour est un tableau d'octets premières. Depuis que je rédigeais un flotteur à BLE de l'appareil, je dois convertir ces 4 octets retour à un flotteur. Merci à Google, j'ai trouvé une façon de le faire.

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

Ok, je sais, vous dites WTF ?? Mais oui, je curl pour publier les données sur la base de données. Cela semblait être une bonne idée à l'époque. Je vais récrire en utilisant la InfluxDB Go Bibliothèque un jour, mais je suis pressé.

Ce bit suivant était amusant.

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

Maintenant que ressemble beaucoup, et regards confus, mais voici ce qu'il fait essentiellement. Vous voyez, il peut ouvrir GATTTOOL, mais si l'appareil à l'autre extrémité est soit pas là, ou est déconnecté, alors les choses se briser. Je dois donc délai d'attente sur la commande gatttool et nouvelle tentative si cela se produit (qui, si vous vous souvenez du code du capteur, il est pour sûr va si le capteur se bloque). Donc, il y a un tas de contrôles pour vous assurer que nous sommes connectés, que nous obtenons un résultat, et que le résultat est au moins théoriquement rationnel avant d'aller et d'essayer de le publier à la base de données. Il suffit de me croire quand je dis que beaucoup d'essais et d'erreurs et les échecs nécessaire à cette nouvelle robuste. Et il est robuste. Il a un fonctionnement sans faille depuis plus d'un mois maintenant, 24/7, sans problèmes.

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

Encore une fois, assez simple. Il suffit de configurer certaines fonctionnalités de journalisation, puis exécutez toujours. Il est évident que vous devez passer le programme l'adresse MAC du périphérique BLE que vous souhaitez vous connecter, mais c'est la seule chose dont vous avez besoin.

Donc, c'est le capteur de CO2, aussi bien du côté du capteur et du côté du périphérique Edge. ***ouf***

### Lora Capteurs

Ce sont en fait deux capteurs séparés, comme vous le savez, mais je vais nous sauver un peu de temps en les combinant, car ils partagent une tonne de code. Encore une fois, je vais passer par le code en morceaux pour le rendre plus facile. Le capteur de rayonnement est venu avec une jolie petite bibliothèque Arduino, donc juste utilisé que.

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

C'est le définit pour la sonde de rayonnement. Maintenant, voici les choses pour le capteur de température Melexis (encore une fois, il y a une bibliothèque Arduino là-bas ce qui facilite).

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

Ensuite, ils ont tous deux la même fonction de configuration:

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

Le capteur de rayonnement doit enregistrer des callbacks, et définir les callbacks:

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

Je définis mon propre format de message parce que je devais faire la différence entre les deux capteurs, et je devais toujours garder la taille des messages très petit pour garder la carte radio de le découper en paquets séparés.

Initialisation le capteur Melexis était un appel à

```cpp
mlx.begin()
```

Il a alors simplement des boucles de lecture pour toujours et à envoyer des données:

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

Les deux capteurs ont le même message envoi / fonctions de réponse:

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

Techniquement, je ne dois pas attendre une réponse, mais je fais, juste pour des fins de débogage. Maintenant, comme on pouvait s'y attendre, il y a un code similaire exécuté sur le Wemos replié à l'intérieur du collecteur Edge, et il est très simple et très similaire. Il se contente de lire les messages de la radio, les formats un peu, et les écrit sur le port série.

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

La boucle attend simplement un message et formats puis:

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

Vous êtes probablement dire « Mais est-ce pas tout ce bavardage de la ligne série va jouer avec la base de données? » et vous auriez raison, sauf que j'écrit un code Aller sur le périphérique Edge pour lire les données du port série et faire face.

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

Et oui, il y a probablement une meilleure façon, mais je l'ai déjà eu le code de l'autre * capteur * et j'étais à nouveau pressé. Donc là vous l'avez.

Et c'est tout le code du capteur! Vous devriez maintenant être en mesure de construire tous les capteurs que je construit et les exécuter les mêmes. Mais ce que vous *** *** vraiment venu ici pour était l'appareil Collection Edge! Je sais, c'est pourquoi je sauvé jusqu'à la dernière. Donc, nous allons arriver à cela!

### Collection bord périphérique

Donc, vous avez dépensé 100 $ ou pour toutes les parties de l'appareil Collection Edge, et maintenant vous vous demandez comment réellement ** construire ** elle. Bienvenue au club! Moi aussi Comme il se trouve - et pin-64 ne vous dit pas ce front up - mais il est en fait assez limité support pour l'affichage tactile. Celui qui qu'ils vendent. Droit. Apparemment, cela fonctionne très bien avec Android, mais vraiment ne m'a pas aidé beaucoup. La version de Linux que vous avez à peu près * * à utiliser est appelé [Armbian](https://www.armbian.com). Bon, j'avais jamais entendu parler non plus. Avant que la plongée et l'installer, je ** fortement ** vous suggère de lire et de comprendre tout ce que). Bon, j'avais jamais entendu parler non plus. Avant que la plongée et l'installer, je ** fortement ** vous suggère de lire et de comprendre tout ce que [ici](https://www.armbian.com/pine64/). Vraiment. Je ne l'ai pas, et ce fut une expérience assez douloureuse. C'est aussi parce que des choses comme le pilote tactile n'a pas été dans la ligne principale alors qu'il est maintenant.

La prochaine chose était, bien sûr, pour obtenir [InfluxDB](https://www.influxdata.com) et le reste de la) et le reste de la [pile TICK](https://www.influxdata.com/time-series-platform/) installée. Heureusement, c'est super facile - bien sûr. Voici le moyen le plus rapide et plus facile de le faire:

```
curl -sL https://repos.influxdata.com/influxdb.key | sudo apt-key add -
source /etc/lsb-release
echo "deb https://repos.influxdata.com/${DISTRIB_ID,,} ${DISTRIB_CODENAME} stable" | sudo tee /etc/apt/sources.list.d/influxdb.list
```

Cela va ajouter la ligne suivante à votre sources.list.d / fichier influxdb.list:

```
deb https://repos.influxdata.com/ubuntu xenial stable
```

Ce qui est ce que vous voulez. Ensuite, exécutez:

```
$ sudo apt-get update
$ sudo apt-get install influxdb chronograf telegraf kapacitor
```

et vous êtes tous ensemble! Maintenant, tout ce que vous avez à faire est de vous assurer que le code pour chacun des capteurs ci-dessus est correctement installé, et ... vous y êtes presque.

Vous voulez installer le courtier Mosquito MQTT d'Eclipse IdO, mais heureusement, qui est aussi simple que apt-get install moustiques et vous êtes bon pour aller.

Rappelez-vous que je l'ai dit, vous devriez lire ** tout ** des Armbian docs? Bon, si vous avez fait, alors vous saurez que la fonction Bluetooth ne fonctionne pas vraiment hors de la boîte. Alors, voici comment je l'ai résolu cela. J'ai créé un script, appelé « ble.sh »:

```sh
#! /bin/sh

/usr/sbin/rfkill list
/usr/local/bin/rtk_hciattach -n -s 115200 /dev/ttyS1 rtk_h5
/bin/hciconfig hci0 up
```

Cela fera la configuration de l'appareil fait ble. Mais il doit être exécuté à chaque fois que votre appareil redémarre, donc je créé un contrôle de service SystemV pour elle

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

Maintenant, il se lancer à chaque fois que l'appareil redémarre et seulement après que le réseau est en place.

Je voulais en fait toute la boîte pour être essentiellement automatique, donc je l'ai fait beaucoup d'autres choses que les services du système, comme le script lecteur Bluetooth Go, le script port série Go, etc. Les tout recommencer automatiquement au démarrage et, juste pour qu'il est pratiquement nul intervention de l'utilisateur nécessaire. J'ai construit cela comme un appareil de données, donc était un objectif et une fonction de configuration zéro.

Si vous avez acheté l'adaptateur WiFi / BLE - que vous devriez vraiment avoir - alors vous obtenez 2 interfaces WiFi. Je mis un d'entre eux comme un point d'accès privé pour les capteurs WiFi locaux et l'autre je suis parti pour rejoindre un autre réseau WiFi pour le téléchargement de données. Armbian est livré avec son propre hostapd installé, vous pouvez simplement utiliser pour configurer le point d'accès. Utilisez l'interface wlan1 pour l'AP.

Alors maintenant, vous avez une boîte qui a toutes les parties droite et ** ** devrait être en mesure d'avoir une et tous les capteurs décrits ci-dessus des données de connexion et journal. Voici ce que le tableau de bord sur le mien ressemble à:

![SafariScreenSnapz037](/posts/category/iot/iot-hardware/images/SafariScreenSnapz037.png)

Assez accrocheurs! Maintenant, il y a quelques éléments de tableau de bord là-bas que vous ne serez pas en mesure d'obtenir - au moins hors de la boîte. Ce sont les moniteurs et le moniteur RSSI de la batterie. En effet, ceux qui ne font pas partie de Telegraf (encore). J'ai écrit ces collectionneurs moi-même. Vous pouvez obtenir ceux de ma fourchette GitHub de Telegraf [ici](https://github.com/davidgs/telegraf/tree/iotEdge). Il est dans la branche « IoTEdge ». Il suffit de construire que, et mettre à jour votre fichier telegraf.conf avec ce qui suit:

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

et

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

Cela vous obtenir les statistiques sur la batterie / puissance et sur tout et toutes les interfaces sans fil installées. Si vous voulez vous épargner une tonne de travail, et que vous voulez un tableau de bord ressemble exactement ** ** comme le mien, vous êtes dans un vrai régal. Avec la nouvelle Chronograf (v1.6) vous pouvez simplement sauvegarder [ce](https://davidgs.com/IoTEdge-3.json), puis l'importer et d'avoir une copie exacte!

Ok, nous y sommes presque! La dernière chose était que je voulais, comme je le disais, être « automatique » donc je ne voulais pas que quelqu'un d'avoir à connecter, ou lancer le tableau de bord, etc. Alors d'abord, je devais me débarrasser du bit de connexion.

J'ai installé « nodm » en tant que gestionnaire par défaut, qui contourne l'écran de connexion au démarrage. C'est assez simple. Mais maintenant, pour vous assurer que le tableau de bord est toujours par défaut, à plein-écran donc il y a très peu de place pour l'utilisateur final shenanigan. Vous devez créer un élément de démarrage pour Chrome Browser:

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

J'ai créé une « démo » de l'utilisateur qui a des autorisations ** très ** limité, et de mettre ce fichier dans leur répertoire .config / autostart. Qui démarre le navigateur Chrome, pointe directement sur le tableau de bord, sans décorations de fenêtre, de sorte que l'utilisateur ne peut pas quitter le navigateur et avoir accès au bureau de l'utilisateur. Le seul inconvénient est que vous devez avoir une méthode alternative de l'exploitation forestière et le contrôle / configuration des choses. Pour cela, j'ai installé TightVNC - et lui a permis sous un utilisateur différent ** ** J'ai créé. Donc, il y a un utilisateur « setup » qui peut se connecter avec TightVNC pour faire des choses comme le changement de la configuration de WiFi, etc., mais l'utilisateur « démo » obtient toujours le tableau de bord prédéfini.

## Conclusion

Cela devrait être un bon début sur la construction de cette installation entière. Je dois admettre que Armbian peut être un peu Checklist et prend une bonne quantité de TLC pour obtenir la configuration correctement. Obtenir le travail WiFi AP et connecter l'autre interface ** ** WiFi pour une connexion Internet en amont est difficile. La connexion Wi-Fi en amont a une mauvaise habitude de simplement déposer, ou de perdre sa route par défaut, etc.

Je l'ai probablement oublié un tas de petits coups secs que j'ai fait ici et là pour faire fonctionner les choses en douceur, et où j'ai omis des choses, je me excuse. J'ai entrepris ce projet au cours de plusieurs mois et je fais constamment de petites améliorations. Il a été difficile de garder une trace de toutes les petites modifications apportées. Si vous trouvez tout ce qui est inexact ou a besoin d'une mise à jour, s'il vous plaît contactez-moi et laissez-moi savoir!

Et enfin, si vous construisez un d'eux, j'aimerais entendre parler! Laissez-moi savoir ce que vous avez construit, et comment vous l'utilisez!
