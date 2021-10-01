---
title: "Internet van de dingen op QuestDB"
Date: 2020-06-05
Author: davidgs
Category: databse, IoT
Tags: Arduino, Database, IoT, QuestDB
Slug: iot-on-questdb
hero: images/WemosCircuit.png
---

Zoals u zich kunt voorstellen, ik heb super druk in mijn HEW baan bij QuestDB geweest dus dit me langer dan ik zou hebben gewild heeft genomen, maar hier zijn we. Als je me weten helemaal niet, weet je dat een van de eerste dingen die ik altijd met nieuwe dingen is, nou ja, connect dingen om hen! Dus ging ik meteen naar een ivd apparaat aansluiten op QuestDB om te zien hoe het ging. Zoals te verwachten, het ging heel goed. Dus hier is hoe het ging, van start tot finish.

## De Database Part

Het eerste wat ik moest doen was om QuestDB up and running. Gelukkig, dit is zeer eenvoudig. Ik denk dat ik kon de route Docker zijn gegaan, maar zoals u waarschijnlijk zijn op de hoogte, ik ben niet een grote fan van Docker (in niet geringe mate te wijten aan het feit dat het letterlijk zal zuigen het leven uit van een MacOS laptop). Er is ook (voor u MacOS gebruikers) `Brew installeren questdb` maar sinds ik hier werk, en ik wilde aan het testen van de nieuwste en beste webconsole, heb ik besloten om te bouwen van de bron:

![GIF van het bouwproces](/posts/category/database/images/Build.gif)

Het bouwt heel snel te wijten aan het gebrek aan externe afhankelijkheden, dus dat is geweldig! Dan is alles wat ik moet doen is het starten:

![Gif van het starten van QuestDB Server](/posts/category/database/images/StartQuest.gif)

Dat is letterlijk alles wat er te krijgen QuestDB gebouwd en hardlopen. Maar dat is slechts het eerste deel. Nu is het tijd om iets te mild nuttig mee doen. Ten eerste, ik moet een tabel te maken in QuestDB aan mijn ivd gegevens op te slaan (een beetje meer over dit later, dus op te slaan een verwijzing naar deze).

![Screenshot van SQL-query](/posts/category/database/images/Screen-Shot-2020-06-04-at-9.15.33-AM-1.png)

Vergeet niet, we doen SQL hier, dus er is geen nieuwe taal of syntax te leren. Dit is echt een eenvoudige tabel die ik ben het bouwen, want ik ga worden met behulp van een ESP8266 met een (echt verschrikkelijk) DHT11 temperatuur en vochtigheid sensor op.

## De Sensor Part

Hiervoor ga ik een ESP8266-gebaseerde WEMOS D1 Mini gebruiken alleen omdat ik toevallig een enorme stapel van hen hebt liggen. Ik koop ze in bulk, omdat ze een dollar of 2 per stuk, gemakkelijk te gebruiken, en grotendeels voor eenmalig gebruik als ik er een opblazen (die ik met alarmerende regelmaat.). Het circuit is zeer eenvoudig te doen:

![Wemos D1 Circuit](/posts/category/database/images/WemosCircuit.png)

Ik gebruikte een echte WEMOS Schild met de DHT11 op, dus ik hoefde niet te breadboard, maar dit schema geeft je een idee van hoe eenvoudig de bedrading is. Het is letterlijk 3 draden.

## De Code Part

Hier is waar de magie gebeurt. Hoe ik eigenlijk de sensor gegevens naar de database. Er is een eenvoudig voorbeeld programma meegeleverd met de Adafruit DHT Unified sensorbibliotheek dat ik adviseren om te beginnen met het oog op maken dit een stuk makkelijker. Het heeft reeds alle onderdelen om te lezen van de sensor, zodat je niet hoeft om die van de grond af te schrijven. Denk eraan: Goede ontwikkelaars te kopiëren, maar grote ontwikkelaars plakken!

Aangezien ik met behulp van de 8266, en ik zal internet verbinding noodzakelijk is, zal ik alle WiFi-bits nodig:

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

Echt alles wat je hoeft te doen is ga naar het menu 'Sketch' Kies 'Opnemen bibliotheek' en selecteer de 'ESP8266WiFi' bibliotheek en je krijgt al deze spullen voor u geïmporteerd.

Hier zijn een paar boiler-plate code kunt u altijd gebruiken om uw ESP8266 op uw WiFi:

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
  Serial.println(F("---------------------------------reading_time: 8 minutes
---"));
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

Dat krijgt de set-up basis. Running dat moet je een WiFi-verbinding en een volledig geconfigureerde DHT11 sensor. We zijn bijna klaar om te beginnen met het verzenden van gegevens in de database.

Als je er aandacht aan, en lees de code, dan heb je de UDP dingen die ik sloop daar hebben gemerkt. Dat komt omdat we gaan dit super makkelijk te maken en gebruiken UDP om onze gegevens te verzenden. En er is een **echt** goede reden voor: InfluxDB Line Protocol. U ziet, QuestDB heeft een ingebouwde in InfluxDB Line Protocol luisteraar, maar (voorlopig) het is alleen luisteren op een UDP-poort. Dus we gaan gebruiken.

Nu, om een aantal gegevens te verzenden:

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

Ja, er is veel gaande in daar. Dus laten we breken. Ten eerste, ik ben het creëren van een buffer om de gegevens die ik ga om te sturen te houden, en dan zal ik een te lezen van de sensor te doen. Ik stel de `temp` en` hum` variabelen om waarden die ik weet dat de sensor zal nooit zo terug dat ik kan controleren dat ik geldige metingen later, om te voorkomen dat het verzenden van wartaal aan de database.

Ik moet een aantal misbruiken aan met de temperatuur en vochtigheid waarden daar doen omdat een van de tekortkomingen van Arduinos is dat ze niet hoeven `sprintf` ondersteuning voor tweepersoonskamers. Ik weet. Dus ik zet ze gewoon in strings en verder gaan. Eenmaal aangekomen bij de database, worden ze geïnterpreteerd als doubles en het leven is goed. Niet de moeite waard vechten over. Ik kan stelt vervolgens een buffer met rechte protocol en het schip buiten naar QuestDB over UDP.

Vergeet niet om het geheugen vrij te maken!

## Dat Pointer

Vergeet ik je vertelde een pointer eerder te stellen over het maken van de database? Nou, hier is waar ik terug naar die komen. Je hoeft niet*echt* moet de database van tevoren * creëren, tenzij * je wilt dingen te doen zoals set indexen, enz. Als alles wat je wilt is dat je hebben rechte waarden daar dan wat denk je? Schema-on-write is een ding hier. Je kunt gewoon beginnen met het schrijven van gegevens naar de database, en het zal gelukkig bewaar ze voor u. Pretty cool stuff.

## Het raadplegen van de Data

Met behulp van de QuestDB Console, kunt u opvragen van de gegevens om ervoor te zorgen dat je krijgt wat je verwacht:

![GIF van de QuestDB Queries](/posts/category/database/images/queries.gif)

Dat is precies wat ik had verwacht!

## Wat is het volgende

Nu is het tijd om te beginnen met de bouw van een aantal dashboards, enz. Op de top van dit. Ik ben momenteel bezig met het aansluiten van dit alles met Node Red, zodat mijn volgende post kan zijn. We werken ook aan ondersteuning voor Grafana, die enorm zal zijn, dus stay tuned voor dat. Als je van wat je hier ziet, wil gaan geven ons een ster op [GitHub](https://github.com/questdb), en volg het project als je wilt om updates te krijgen!

