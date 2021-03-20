---
title: "IoT auf QuestDB"
Date: 2020-06-05
Author: davidgs
Category: databse, IoT
Tags: Arduino, Database, IoT, QuestDB
Slug: iot-on-questdb
hero: images/WemosCircuit.png
---

Wie Sie sich vorstellen können, ich habe bei QuestDB in meinem hew Job super besetzt gewesen, so das mich getroffen hat, länger als ich hätte mir gewünscht, aber hier sind wir. Wenn du mich überhaupt wissen, wissen Sie, dass eines der ersten Dinge, die ich immer wieder neue Dinge zu tun ist, na ja, connect Dinge zu ihnen! Also ging ich sofort ein IoT Gerät QuestDB zu verbinden, um zu sehen, wie es ging. Es überrascht nicht, ging es ganz gut. Also hier ist, wie es ging, von Anfang bis Ende.

## Die Datenbank Part

Das erste, was ich tun musste, war ein QuestDB zum Laufen zu bekommen. Glücklicherweise ist dies sehr einfach. Ich glaube, ich den Docker Weg gegangen sein könnte, aber wie Sie wahrscheinlich wissen, sind, ich bin kein großer Fan von Docker (in nicht geringen Teil auf die Tatsache zurückzuführen, dass es buchstäblich das Leben aus einem MacOS Laptop saugt). Es gibt auch (für Sie MacOS-Benutzer) `Gebräu installieren questdb` aber seit ich hier arbeite, und ich wollte die neueste und beste Web-Konsole testen, habe ich beschlossen, von der Quelle zu bauen:

![GIF des Build-Prozesses](/posts/category/database/images/Build.gif)

Es baut sehr schnell aufgrund des Fehlens von externen Abhängigkeiten, so dass groß! Dann alles, was ich tun muß, ist es zu starten:

![Gif von Start QuestDB Server](/posts/category/database/images/StartQuest.gif)

Das ist buchstäblich alles, was es zu bekommen QuestDB gebaut und ausgeführt wird. Aber das ist nur der erste Teil. Jetzt ist es Zeit, etwas milde nützlich damit zu tun. Zuerst werde ich brauche eine Tabelle in QuestDB erstellen speichern meine IoT Daten (ein bisschen mehr dazu später speichern, so einen Zeiger auf diesen).

![Screenshot von SQL-Abfrage](/posts/category/database/images/Screen-Shot-2020-06-04-at-9.15.33-AM-1.png)

Denken Sie daran, wir SQL hier tun, so gibt es keine neue Sprache oder Syntax zu erlernen. Dies ist eine wirklich einfache Tabelle, dass ich baue, denn ich werde ein ESP8266 mit einem (wirklich schrecklich) DHT11 Temperatur- und Feuchtigkeitssensor darauf werden.

## der Sensorteil

Dafür werde ich nur eine ESP8266-basierte WEMOS D1 Mini verwenden, weil ich einen riesigen Haufen von ihnen haben passieren herumliegen. Ich kaufe sie in der Masse, weil sie ein Dollar oder 2 jeweils leicht zu bedienen ist und weitgehend Einweg wenn ich einen sprengen (was ich mit alarmierender Regelmäßigkeit tun.). Die Schaltung ist extrem einfach zu tun:

![Wemos D1 Schaltung](/posts/category/database/images/WemosCircuit.png)

Früher habe ich ein tatsächliches WEMOS Schild mit der DHT11 drauf, so dass ich es nicht zu Steckbrett habe, aber dieses Schema gibt Ihnen eine Vorstellung davon, wie einfach die Verdrahtung. Es ist buchstäblich 3 Drähte.

## Der Kodex Teil

Hier ist, wo die Magie passiert. Wie ich tatsächlich die Sensordaten an die Datenbank senden. Es ist ein einfaches Beispiel-Programm mit dem Adafruit DHT Unified-Sensor-Bibliothek enthalten, dass ich mit um empfehle, beginnend dies ein einfacher Bit zu machen. Es hat bereits alle Teile vom Sensor zu lesen, so dass Sie nicht mit denen von Grund auf neu zu schreiben. Denken Sie daran: Gute Entwickler kopieren, aber große Entwickler einfügen!

Da ich die 8266 bin mit, und ich werde Internet-Konnektivität benötigen, müssen ich alle WiFi-Bits:

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

Wirklich alle müssen Sie ist auf die ‚Sketch‘ Menü gehen zu tun, wählen ‚Include-Bibliothek‘ und wählen Sie die ‚ESP8266WiFi‘ Bibliothek und Sie alle diese Dinge für Sie importiert bekommen.

Hier einige Kesselblech Code können Sie immer Ihre ESP8266 auf Ihrem WiFi zu bekommen verwenden, um:

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

Das bringt die Grundlagen aufgebaut. dass Laufen sollten Sie eine WiFi-Verbindung und ein vollständig konfiguriertes DHT11 Sensor erhalten. Wir sind fast bereit, Daten in die Datenbank zu starten sendet.

Wenn Sie die Aufmerksamkeit bezahlten, und den Code lesen, haben Sie die UDP-Sachen, die ich dort schlich bemerkt. Das ist, weil wir werden diese super einfach erstellen und verwenden UDP unsere Daten zu senden. Und es gibt einen ** wirklich ** guten Grund dafür: InfluxDB Zeilenprotokoll. Sie sehen, hat QuestDB eine eingebaute in InfluxDB Linie Protokoll Zuhörer, aber (vorerst) es ist nur auf einem UDP-Port lauscht. So werden wir, dass verwenden.

Nun, einige Daten zu senden:

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

Ja, es gibt eine Menge los dort. Also lassen Sie uns es brechen. Zuerst Ich schaffe einen Puffer, die Daten zu halten, schicke ich werde, und dann werde ich eine Lese des Sensors tun. Ich habe die `temp` und` hum` Variablen auf Werte, dass ich den Sensor weiß nie so zurückkehren, dass ich überprüfen kann, dass ich später gültige Lesungen bekam, das Senden von Kauderwelsch auf die Datenbank zu vermeiden.

Ich habe ein paar Spielereien mit den Temperatur- und Feuchtewerte in dort zu tun, weil einer der Mängel der Arduinos ist, dass sie nicht über `sprintf` Unterstützung für Doppelzimmer. Ich weiß. So wende ich sie einfach in Strings und ziehen weiter. Sobald sie in der Datenbank ankommen, werden sie als verdoppelt interpretiert und das Leben ist gut. Nicht zu kämpfen lohnt zu. Ich kann dann einen Puffer mit geraden Linie Protokoll konstruieren und zu QuestDB über UDP verfrachten.

Vergessen Sie nicht, den Speicher zu befreien!

## Das Pointer

Denken Sie daran, ich Ihnen sagte, ein Zeiger früher auf etwa das Erstellen der Datenbank? Nun, hier ist, wo ich darauf zurückkommen. Sie haben nicht * * tatsächlich die Datenbank vor der Zeit * zu schaffen haben, es sei denn * Sie Dinge wie Set-Indizes tun wollen, etc. Wenn alles, was Sie tun wollen dort gerade Werte haben, dann erraten, was? Schema-on-Write ist eine Sache hier. Sie können nur Daten starten in die Datenbank zu schreiben, und es wird sie gerne für Sie speichern. Ziemlich cool stuff.

## Abfrage der Daten

Mit Hilfe der QuestDB Console können Sie dann die Daten abfragen, um sicherzustellen, dass Sie bekommen, was Sie erwarten:

![GIF der QuestDB Abfragen](/posts/category/database/images/queries.gif)

Das ist genau das, was ich erwartet hatte!

## Was kommt als nächstes

Jetzt ist es Zeit zu beginnen, einige Armaturenbretter Gebäude usw. auf dieses. Im Moment arbeite ich an diesen alle auf mit Knoten Red verbinden, so dass mein nächster Beitrag sein kann. Wir arbeiten auch auf Unterstützung für Grafana, die sehr groß sein wird, so Aufenthalt dafür gestimmt. Wenn Sie mögen, was Sie hier sehen, gefällt uns gehen geben einen Stern auf [GitHub](https://github.com/questdb) und das Projekt folgen, wenn Sie möchten, dass Updates erhalten!

