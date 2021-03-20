---
title: « IdO sur QuestDB »
Date: 2020-06-05
Author: davidgs
Category: databse, IoT
Tags: Arduino, Database, IoT, QuestDB
Slug: iot-on-questdb
hero: images/WemosCircuit.png
---

Comme vous pouvez l'imaginer, je suis super occupé dans mon travail HEW à QuestDB si cela m'a pris plus de temps que je l'aurais aimé, mais ici nous sommes. Si vous me connaissez tout, vous savez que l'une des premières choses que je fais toujours de nouvelles choses est bien, les choses y connecter! Je suis donc allé immédiatement pour connecter un périphérique IdO QuestDB pour voir comment il allait. Sans surprise, il est allé très bien. Alors, voici comment ça se passait, du début à la fin.

## La partie de base de données

La première chose que je devais faire était un pour obtenir QuestDB et en cours d'exécution. Heureusement, cela est très simple. Je suppose que je aurais pu aller la route Docker, mais comme vous le savez probablement, je ne suis pas un grand fan de Docker (en grande partie en raison du fait qu'il va littéralement aspirer la vie d'un ordinateur portable Mac OS). Il y a aussi (pour vous les utilisateurs de MacOS) `Brew installer questdb` mais depuis que je travaille ici, et je voulais tester la dernière et la plus grande console Web, j'ai décidé de construire à partir de la source:

![GIF du processus de construction](/posts/category/database/images/Build.gif)

Il construit très rapidement en raison de l'absence de dépendances externes, de sorte que ce qui est grand! Ensuite, tout ce que je dois faire est de commencer:

![Gif à partir du serveur QuestDB](/posts/category/database/images/StartQuest.gif)

C'est littéralement tout ce qu'il ya à obtenir QuestDB construit et en cours d'exécution. Mais c'est juste la première partie. Maintenant, il est temps de faire quelque chose d'utile avec douceur. Tout d'abord, je vais avoir besoin de créer une table QuestDB pour stocker mes données IdO (Un peu plus sur cela plus tard, afin de stocker un pointeur sur ce sujet).

![Capture d'écran de requête SQL](/posts/category/database/images/Screen-Shot-2020-06-04-at-9.15.33-AM-1.png)

Rappelez-vous, nous faisons SQL ici, donc il n'y a pas de nouvelle langue ou la syntaxe pour apprendre. Ceci est une table très simple que je vais construire parce que je vais être en utilisant un ESP8266 avec un (vraiment terrible) la température DHT11 et capteur d'humidité sur elle.

## Le capteur partie

Pour cela, je vais utiliser un Mini WEMOS D1 à base ESP8266 seulement parce que j'arrive d'avoir un tas géant de les traîner. Je les achète en vrac parce qu'ils sont un dollar ou 2 chacun, facile à utiliser, et largement disponible si je pompent vers le haut (que je fais avec une régularité alarmante.). Le circuit est extrêmement simple:

![Wemos D1 Circuit](/posts/category/database/images/WemosCircuit.png)

J'ai utilisé un bouclier WEMOS réel avec la DHT11 sur elle, donc je ne devais pas la carte de développement, mais ce schéma vous donne une idée de la simplicité du câblage est. Il est littéralement 3 fils.

## Le code partie

Voici où la magie se produit. Comment puis-je envoyer effectivement les données du capteur à la base de données. Il y a un programme d'exemple simple, fourni avec la bibliothèque du capteur Unified Adafruit DHT que je recommande de commencer avec afin d'en faire un peu plus facile. Il a déjà toutes les parties à lire du capteur afin que vous n'avez pas à écrire ceux à partir de zéro. Rappelez-vous: Les bons développeurs copier, mais de grands développeurs coller!

Depuis que je suis en utilisant le 8266, et je besoin d'une connexion Internet, je vais avoir besoin de tous les bits WiFi:

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

Vraiment tout ce que vous avez à faire est d'aller dans le menu « Sketch », sélectionnez « Inclure la bibliothèque » et sélectionnez la bibliothèque « ESP8266WiFi » et vous obtenez tout ce genre de choses importées pour vous.

Voici un code-plaque de la chaudière, vous pouvez toujours utiliser pour obtenir votre ESP8266 sur votre connexion Wi-Fi:

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

Cela obtient les bases mises en place. L'exécution qui devrait vous obtenir une connexion WiFi et un capteur DHT11 entièrement configuré. Nous sommes presque prêts à commencer à envoyer des données à la base de données.

Si vous avez été attentif, et de lire le code, vous aurez remarqué les choses UDP je faufilé là-dedans. C'est parce que nous allons faire de ce super facile et utiliser UDP pour envoyer nos données. Et il y a une bonne vraiment ** ** raison pour cela: InfluxDB Protocole ligne. Vous voyez, QuestDB a intégré auditeur protocole InfluxDB ligne, mais (pour l'instant), il est seulement l'écoute sur un port UDP. Donc, nous allons utiliser.

Maintenant, pour envoyer des données:

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

Oui, il y a beaucoup de choses là-dedans. Donc, nous allons le décomposer. Tout d'abord, je crée un tampon pour contenir les données que je vais envoyer, puis je ferai une lecture du capteur. Je mets le `` temp` et les variables hum` aux valeurs que je sais que le capteur ne reviendra que je puisse vérifier que je suis arrivé des lectures valides plus tard, pour éviter d'envoyer charabia à la base de données.

Je dois faire des manigances avec les valeurs de température et d'humidité là-bas parce que l'une des lacunes de Arduinos est qu'ils n'ont pas `soutien sprintf` en double. Je sais. Je les ai donc simplement tourner en chaînes et passer à autre chose. Une fois qu'ils arrivent à la base de données, elles sont interprétées comme des doubles et la vie est bonne. Pas la peine de combats au sujet. Je peux alors construire un tampon avec le protocole de ligne droite et l'expédier hors de QuestDB sur UDP.

Ne pas oublier de libérer la mémoire!

## Ce pointeur

Se souvenir que je vous ai dit de mettre un pointeur plus tôt sur la création de la base de données? Eh bien, voici où je reviendrai. Vous ne * * réellement devez créer la base de données à l'avance * à moins * que vous voulez faire des choses comme index ensemble, etc. Si tout ce que vous voulez faire est d'avoir des valeurs droites là-dedans, puis devinez quoi? Schéma en écriture est une chose ici. Vous pouvez commencer à écrire des données à la base de données, et il les stocker avec bonheur pour vous. trucs Pretty cool.

## Interrogation des données

Utilisation de la console QuestDB, vous pouvez interroger les données pour vous assurer que vous obtenez ce que vous attendez:

![GIF des requêtes QuestDB](/posts/category/database/images/queries.gif)

C'est exactement ce que je pensais!

## Et après

Maintenant, il est temps de commencer à construire des tableaux de bord, etc. au-dessus de cela. Je travaille actuellement sur la connexion tout cela avec nœud rouge, de sorte que peut-être mon prochain post. Nous travaillons également sur le soutien à Grafana, qui sera énorme, donc restez à l'écoute pour cela. Si vous aimez ce que vous voyez ici, allez nous donner qui plaît une étoile sur (https://github.com/questdb) [GitHub], et suivez le projet si vous souhaitez obtenir des mises à jour!

