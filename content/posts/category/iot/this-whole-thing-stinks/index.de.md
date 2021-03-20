---
title: „Die ganze Sache stinkt!“
Date: 2020-03-11
Author: davidgs
Category: Gadgetry, IoT
Tags: InfluxData, InfluxDB, IoT, Poop Detector
Slug: this-whole-thing-stinks
hero: images/singing-poop-emoji-sm.png
---

## Zunächst einmal nicht fragen

Ich habe keine Ahnung, wo diese Idee kam, es ist einfach passiert. Ich sage immer: „Ich bin nicht besonders stolz auf diese“, aber in Wirklichkeit? Ich Art von Uhr, weil es ist schon komisch, wie Scheiße (Wortspiel beabsichtigt). Einige Projekte kamen über meinen Twitter-Feed, dass inbegriffen (Ich scheiß dich nicht) ein 3-D druckbare Modell des 💩 Emojis. Ich erinnere mich an nichts anderes zu diesem Projekt, aber Sie würden besser glauben, dass ich gerade für die STL-Datei ging!

![Singen Poop emoji](/posts/category/iot/images/singing-poop-emoji.jpg "singing-poop-emoji.jpg")

Es setzte sich dann für ein paar Wochen eiternde (wenn Sie mit viel beschissener Witze nicht vertraut sind, aus der Patsche helfen jetzt. Eine Warnung.). Ich wusste, ich würde * * tun etwas mit ihm, ich wusste einfach nicht, * was * ich tun würde. Und dann traf es mich. Ich hatte eine Reihe von Gassensoren rumliegen (wenn dies Sie überrascht, die Sie wirklich kennen mich gar nicht). Und dann traf es mich! Ein Badezimmer stinkt Sensor und Warnsystems !! Aber meine Scheiße stinkt nicht (halt die Klappe!) So, wo es zu implementieren? Eureka Moment Nummer 2! Unsere besten Freunde Haus, in dem alle Ereignisse immer gehalten werden, hat das, was wir alle Call ‚The Hardest Working Badezimmer in Holly Springs‘. Es gibt regelmäßig 20 Leute dort zum Abendessen, oder ein anderes Ereignis, und dass wenig Pulver Raum nimmt die Wucht des Ganzen.

## der Stink Detector eingeben

Das erste, was war zu 3-D die kleine Scheiße drucken. Um sicherzustellen, konnte ich die richtigen LEDs in ihm passen, um es den Weg zu machen leuchten ich es will. Und nein, man kann nichts leuchten braun machen. * Wenn Sie wirklich sind * interessiert, warum können Sie nicht braun Licht machen, können Sie gehen Uhr [das Video](https://youtu.be/wh4aWZRtTwU), aber der Typ ist viel seltsamer als ich. Wieder faire Warnung. Wie auch immer, ich gedruckt es, Und siehe da, die LED-Controller Ich wollte fit verwenden (fast) perfekt! Ich hatte ein paar Ecken von der PCB zu befestigen, aber es wurde kein Schaden getan, und ich habe ein Licht-up Poop Emoji!

![Ein Poop Emoji leuchtet orange](/posts/category/iot/images/IMG_0087.jpeg)

Ich habe es auch zu 150% skaliert und ich überlege es den Druck, dass die Art und Weise, nur weil, na ja, Sie wissen, größere Scheiße besser Scheiße ist! Also, wie ich Licht dieser Scheiße? Eigentlich ganz einfach. Ich kaufe diese Wemos D1 Mini-Boards in der Masse (wie 20 zu einem Zeitpunkt, da sie nur $ 2,00 sind jeweils - teurer, wenn man sie von Amazon kaufen, aber wenn man sich von Ali Express in China kaufen, können sie so billig als $ 1.50 pro Stück) und ich kaufen passende dreifarbige LED-Schilder mit ihnen zu gehen. Meine Freunde [Andy Stanford-Clark](https://twitter.com/andysc) hat mich auf diese Dinge mit seiner ‚Glow Orbs“ gestartet Wenn Sie mehr über die Besonderheiten von Glow Orbs,) hat mich auf diese Dinge mit seiner ‚Glow Orbs“ gestartet Wenn Sie mehr über die Besonderheiten von Glow Orbs, [Dr. Lucy Rogers] lesen wollen (https://twitter.com/DrLucyRogers) schrieb eine ganze Sache über sie [hier](https://twitter.com/DrLucyRogers). Turns heraus, dass sie einen Furz-O-Meter und verwendet, um eine GlowOrb als gut gebaut. ich hatte keine Ahnung, bis Andy mir gesagt.

Für ein Tutorial auf der Wemos D1 Getting Started finden Sie unter [dieser Artikel](https://www.hackster.io/innovativetom/wemos-d1-mini-esp8266-getting-started-guide-with-arduino-727098). Ich kenne eine Menge Leute voll, detailliert Tutorials aufzuschreiben, etc. für diese Sachen, aber, ehrlich gesagt, ich bin zu faul, damit ich meistens nur sagen, was ich getan habe. Ich werde die blutigen Details geben, wo es darauf ankommt.

Wie auch immer, da ich tun dies die ganze Zeit Scheiße, ich habe meine Poop-Licht hören zu einem MQTT Broker für Nachrichten über, welche Farbe angezeigt werden soll. Ich arbeite immer noch die detaillierten Farbstufen, wie ich die Dinge zu kalibrieren. Ich werde deckt die Besonderheiten, wie Meldungen in einem Bit gesendet und empfangen werden.

Der Gestank Detektor selbst ist auch auf einem Wemos D1 Mini ist Flucht mit einem MQ-4 Methan-Sensor, dass auch vermeintlich misst H2 und einen SGP-30 Luftqualitätssensor, dass Maßnahmen Volatile Organic Chemicals (VOCs) und eine wirklich beschissene Version von CO2, das sollte niemals trauen. Ich habe eine Menge Arbeit mit CO2-Sensoren durchgeführt, und diese eCO2 Sensoren sind kein Scheiß wert. Im Ernst, vertrauen sie nie. Ich bin vor der Auslieferung auf einige mehr, bessere Gassensoren wie ein MQ-136 Schwefeldioxid Sensor und andere. Ich werde entfalten sie wahrscheinlich alles und dann etwas kompliziert erfinden, aber völlig willkürlich Algorithmus für die Entscheidung, was ‚muffig‘. Bleiben Sie dafür gestimmt.

## Aufbau der Stink Sensor

Wie ich schon sagte, bin mit einem Wemos D1 Mini mit einem [MQ-4 Methan Sensor](https://www.sparkfun.com/products/9404) und ein) und ein [SGP-30](https://www.adafruit.com/product/3709) Luftqualitätssensor. Sie können sie sich selbst kaufen, wenn Sie planen, diese Sache zu bauen. Ich werde aktualisieren, dies mit anderen Sensoren, wie ich sie hinzufügen, vielleicht. Hier ist, wie Draht alles auf:

![Schaltschema des Wemos D1 und Gassensor](/posts/category/iot/images/Stinker.png)

Es ist wichtig zu beachten, dass die MQ-4 5v erfordert während der SGP-30 nur 3,3 V benötigt. Die MQ-4 ist ein gerades Analogsensor, so dass die Verdrahtung, es zu einem der analogen Eingänge funktioniert gut. Die SGP-30 ist ein I2C-Sensor, so dass es per Kabel SDA ist >-> D1 und SCL >-> D2, die der Standard-I2C Pins auf der Wemos sind (was ich habe jedes Mal sehen). die MQ-4 wird gerade 5 V und die SGP-30 bekommt 3,3 V über die integrierten Spannungsregler Wenn Sie 5v über die USB-Anwendung. Nun, wie bekommt man tatsächlich Daten aus diesen Sensoren? Nun, das ist neben, natürlich!

## Lese Stink

Die SGP-30 verfügt über eine Bibliothek für sie von Adafruit (natürlich) zur Verfügung gestellt, so dass Sie werden feststellen, dass Bibliothek zu Ihrem Arduino IDE hinzufügen müssen und dann sind es in Ihrem Projekt.

```cpp
#include <Adafruit_SGP30.h>
#include<Wire.h>
```

Sie werden dann erstellen und SGP30 Objekt und initialisieren Sie es in Ihrem Setup-Routine:

```cpp
Adafruit_SGP30 sgp;
```

Erstellt das Objekt und dann:

```cpp
if(! sgp.begin()){
  Serial.println("Sensor not found :(");
    while(1);
}
```

initialisiert den Sensor. Wenn Sie nicht der Sensor richtig angeschlossen haben, wird das Ganze hängen, so stellen Sie sicher, haben Sie es verdrahtet richtig!

die VOC zu lesen, ist ziemlich einfach danach:

```cpp
if(! sgp.IAQmeasure()) {
  Serial.println("Measurement failed")
  return;
}
Serial.print("TVOC ");
Serial.print(sgp.TVOC);
Serial.print(" 	");
Serial.print("Raw H2 ");
Serial.print(sgp.rawH2);
Serial.print(" 	");
Serial.print("Raw Ethanol ");
Serial.print(sgp.rawEthanol);
Serial.println("")
```

Das SGP Objekt ist mit allen Lesungen in ihm zurückkehrt, so ist es ziemlich einfach. Der MQ-4-Sensor ist ein wenig komplizierter. Es ist ein analoger Sensor, was bedeutet, dass es wirklich nur einen rohen Spannungswert zurückgibt, die Skalen (etwas) mit der Gaskonzentration. Zum Glück für mich, jemand bot eine nette Funktion, die Rohspannung in einen ppm (Teile pro Million) das Lesen für die Methan zu drehen, so dass die erforderlichen auch:

```cpp
int NG_ppm(double rawValue)
double ppm = 10.938*exp(1.7742*(rawValue*3.3/4095));
return ppm;
```

Ja, Mathematik. Ich habe keine Ahnung, wie es funktioniert, aber es scheint, so dass ich mit ihm gehe, weil ich beschissen bin in Mathe und haben klüger Vertrauen jemand als ich (was die meisten Menschen ist, ehrlich gesagt). So, jetzt kann ich die Rohspannung auf dem analogen Stift gelesen, und dann, dass von ppm zu einer Lesung konvertieren, das ist das, was wir wirklich wollen.

```cpp
int sensorValue = analogRead(A0); // read analog input pin 0]{style="color: #8e8e8e;"}
int ppm = NG_ppm(sensorValue);
```

Cool! So, jetzt, wo wir können die Gaswerte lesen, wie wir alle diese zusammen binden?

## Verwenden Sie keine A Shitty-Datenbank!

Natürlich habe ich Arbeit für eine Datenbank Unternehmen, so werden wir, dass man verwenden. Eigentlich, auch wenn ich keine Arbeit für diese spezielle Datenbank Firma tat, würde ich es immer noch da, für IoT Daten wie diese, es ist nur wirklich die beste Lösung. Wir werden alle unsere Daten InfluxDB senden und dann können wir sehen, wie die glühende Poop Farben zu ändern aufmerksam zu machen. So, wie wir Daten an InfluxDB schicken? Es ist super einfach. Wir verwenden die InfluxDB Bibliothek für Arduino, natürlich!

```cpp
#include <InfluxDb.h>
#define INFLUXDB_HOST "yourhost.com"
#define INFLUX_TOKEN "yourLongTokenStringForInfluxDB2"
#define BATCH_SIZE] 10
Influxdb influx(INFLUXDB_HOST);
```

Ein paar Dinge beachten hier. Ich verwende InfluxDB 2.0, weshalb ich das Token benötigen. Ich habe eine batch_size definiert, weil das Schreiben von Daten wesentlich effizienter ist, wenn wir es in den Reihen zu tun, anstatt einzeln. Warum? Nun, ich bin froh, dass du gefragt! Jeder Schreibvorgang in die Datenbank geschieht über das HTTP-Protokoll. Also, wenn Sie das tun wollen, müssen Sie die Verbindung einrichten, um die Daten schreiben, und dann die Verbindung abreißen. jede Sekunde dies tun oder so teuer ist, von einer Kraft und Prozessor Perspektive. So ist es besser, eine Reihe von Datenpunkten zu sparen, dann tun Sie den Setup-send-Teardown-Zyklus einmal von allem.

So, jetzt haben wir ein Influxdb Objekt mit dem richtigen Serveradresse initialisiert. Im Setup () Funktion müssen wir die Konfiguration abgeschlossen haben:

```cpp
influx.setBucket("myBucket"]);
influx.setVersion(2);
influx.setOrg("MyOrg");
influx.setPort(9999);
influx.setToken(INFLUX_TOKEN);
```

Das ist buchstäblich. Ich bin ganz eingestellt, bis zu beginnen Daten zu InfluxDB schreiben, so wollen wir mal sehen, wie ich das tun:

```cpp
if(batchCount >= BATCH_SIZE) {
  influx.write();
  Serial.println("Wrote to InfluxDB");
  batchCount = 0;
}
InfluxData row("bathroom");
row.addTag("location ", "hsbath");
row.addTag("sensor1", "sgp30");
row.addTag("sensor2", "mq-4");
row.addValue("tvoc", sgp.TVOC);
row.addValue("raw_h2", sgp.rawH2);
row.addValue(["ethanol", sgp.rawEthanol);
row.addValue("methane", ppm);
influx.prepare(row);
batchCount +=1;
delay(500);
```

Im ersten Teil, überprüfe ich, ob ich mein Batch Limit bin und wenn ich bin, schreibe ich den ganzen Schlamassel heraus auf die Datenbank, und meine Zählung zurückgesetzt. Danach habe ich eine neue Zeile für die Datenbank erstellen und die Tags und Werte hinzufügen. Dann habe ich ‚vorbereiten‘ die Zeile, die wirklich nur um es in die Warteschlange fügt mit der nächsten Charge geschrieben werden. Erhöhen Sie die Chargenanzahl und ruhig sitzen für 500ms (½ Sekunde). Dann machen wir das Ganze noch einmal.

Gehen wir auf die Datenbank und sehen, ob ich sie alle Arbeits haben:

![Screen Shot eines Zustroms Chronograf-Dashboard](/posts/category/iot/images/Screen-Shot-2020-03-11-at-2.55.28-PM.png )

Ich würde sagen, das ist ein Ja! Jetzt, wo es ist alles da, es ist an der Zeit Updates zum glühenden Poop zu senden!

Dafür werden wir eine Aufgabe in InfluxDB 2.0 erstellen. Und ich werde es nennen ‚kacke‘, weil auch ich eine Aufgabe nicht ‚Scheiße‘ in meinem UI genannt werden soll.

![Chronograf Armaturenbrett Element](/posts/category/iot/images/Screen-Shot-2020-03-11-at-2.57.12-PM.png)

Und hier ist die Aufgabe, die ich erstellt:

```js
import "experimental/mqtt"

option task = {name: "poop", every: 30s}

from( bucket:  "telegraf" )
  |> range(start: task.every)
  |> filter(fn: (r()=> (r._measurement == "bathroom")))
  |> filter(fn: (r()=>(r._field == "tvoc")))
  |> last()
  |> mqttto(broker: "tcp://yourmqttbroker.com:8883", topic: "poop", clientid: "poop-flux", valueColumns: ["_value"])
```

Da es dort passiert viel ist, werde ich durch sie gehen alle. Zunächst einmal, verpacken die MQTT schrieb ich noch in der „experimentellen“ -Paket, so dass Sie importieren müssen, dass, um es zu benutzen. Wenn Sie im Bild oben der Daten sehen Explorer kann man sehen, dass ich alles in meinem „telegraf“ bucket bin zu speichern, und die „Bad“ Messung. Gerade jetzt, ich bin Keying nur der „TVOC“ Lesung ab. Sobald ich das ändern, werde ich diese Aufgabe mit der Formel aktualisieren, die ich benutze. Ich packe gerade die letzte Lesung in den letzten 30 Sekunden. Ich dann füllen Sie die Details für den MQTT Broker Ich verwende, und das Thema zu unterbreiten, und los geht! Das ist es für die Aufgabe!

## Lighting Scheiße Up!

So wie Sie sich erinnern, haben wir eine WEMOS D1 mini mit einer dreifarbigen LED auf ihn in der gedruckten kacken. Jetzt ist es Zeit, um Licht, das Scheiße! Da wir das Schreiben von Werten, um einen MQTT Broker, alle wirklich tun müssen, wir sind connect dass WEMOS zum MQTT Broker, die, zum Glück, wirklich einfach ist.

Sie müssen eine Reihe von WiFi stuff (Sie müssen dies auch in dem Sensorcode, übrigens):

```cpp
#include <ESP8266WiFi.h>
#include <DNSServer.h>
#include <ESP8266WebServer.h>
#include <WiFiManager.h>
#include <PubSubClient.h>
#include <Adafruit_NeoPixel.h>
#include <ESP8266mDNS.h>
#include <WiFiUdp.h>

#define LED_PIN D2  //D2
#define LED_COUNT 1
// update this with the Broker address ]{style="color: #8e8e8e;"}
#define BROKER "mybroker.com"
// update this with the Client ID in the format d:{org_id}:{device_type}:{device_id}]{style="color: #8e8e8e;"}
#define CLIENTID "poop-orb"
#define COMMAND_TOPIC "poop"

int status = WL_IDLE_STATUS; // the Wifi radio's status
WiFiClient espClient;
PubSubClient client(espClient);
```

Einige davon sind Dinge, die auch Dinge in Ihrer InfluxDB Aufgabe entsprechen, wie die COMMAND_TOPIC und den BROKER. so stellen Sie sicher, diejenigen richtig zwischen den beiden erhalten. Das ist alles, die Dinge, die Sie definiert haben müssen (ich durchmache nicht, wie die WiFi-Setup zu bekommen und so konfiguriert ist, wie es Hunderte von Tutorials zu tun, dass für Arduino und Esp8266 Geräte sind.).

In Ihrem Setup () Funktion müssen Sie Ihre MQTT Client (PubSubClient) Objekt konfigurieren und zu Ihrem Thema abonnieren sowie Ihre LED eingerichtet. Ich benutze die Adafruit NeoPixel Bibliothek, weil es super einfach zu bedienen.

```cpp
client.setServer(BROKER, 8883);
client.setCallback(callback);
client.subscribe(COMMAND_TOPIC);

Adafruit_NeoPixel] pixel = Adafruit_NeoPixel(1, 4); // one pixels, on pin 4
//pin 4 is "D2" on the WeMoS D1 mini]{style="color: #8e8e8e;"}
```

Ihre Hauptschleife ist ziemlich kurz für diesen, da das PubSubClient viel das Timing für Sie behandelt:

```cpp
void loop() {
  if(!client.connected()) {
    reconnect();
  }
  // service the MQTT client]{style="color: #8e8e8e;"}
  client.loop();
}
```

Sie werden, natürlich müssen die Callback-Routine, und das ist, wo die Magie passiert, so an, dass der Blick lassen sich jetzt.

```cpp
void callback(char* topic, byte* payload, unsigned int length) {
  char content[10];
  String s = String((char *)payload);
  s.trim();
  Serial.print("Message arrived on ");
  Serial.print(COMMAND_TOPIC);
  Serial.print(": ");

  unsigned char buff[256] ;
  s.getBytes(buff, 256);
  buff[255 = '\0';
  s = s.substring(s.indexOf("=") + 1, s.lastIndexOf(" "));
  s.trim();
  int c = s.toInt();
  String col ="";
  if(c > 100.0) {
    col ="ff0000";
  } else if(c > 90.0) {
    col = "ff4000";]
  } else if(c > 80.0]){
    col = "ffbf00";
  } else if(c >70.0) {
    col = "bfff00";
  } else if(c > 60.0) {
    col = "40ff00";
  else if(c > 50.0) {
    col ="00ff40";
  } else if(c > 40.0) {
    col ="00ffbf";
  } else if(c > 10.0) {
    col = "00bfff";
  } else {
    col ="bf00ff";
  }

  long long number = strtoll(&col 0, NULL, 16);
  int r = number >> 16;
  int g = number >>8 & 0xFF;
  int b = number & 0xFF;
  uint32_t pCol = pixel.Color(r, g, b);
  colorWipe(pCol, 100);
}
```

Ja, es ist nussig. Vor allem, weil ich diesen gleichen Code in einer Reihe von verschiedenen Orten. Manchmal möchte ich die Hex-Farbe, manchmal möchte ich die RGB-Farbe, so dass ich so oder so hier gehen kann. Es sieht beschissen, aber es funktioniert für mich. tut dies alles ist die Nachricht aus dem MQTT Broker erhalten, und ziehen Sie den numerischen Wert aus (durch Erfahrung weiß ich, dass die MQTT Nachricht in folgendem Format kommt:

```
bathroom _value=566 1583959496007304541
```

Also ich weiß, ich kann Index in sie die `=` Zeichen und das `` (Leerzeichen) und mit dem numerischen Wert zurückkommen. Von dort ist die Skalierung es nur um den Wert der Farbe und dem Einschalten der LED! Danach leuchtet die Poop, wenn Sie Scheiße! Und die Farbe ändert sich je nachdem, wie stinkende es ist. Der VOC-Wert ist nicht wirklich ein sehr guter Wert (vor allem, wenn Sie irgendeine Art von zu verwenden, neigen dazu, Poop-Spray Ihre mis-Tat zu verbergen. Die meisten von ihnen sind nichts anderes als VOCs und das wird die Zahlen Spike, weshalb ich‘ m wartet auf die neuen Sensoren so dass ich viele Gaswerte bekommen und sehen, welche ist am anzeigt Gestank. Oder was diejenigen, genauer gesagt. Danach habe ich mit einigem Algorithmus kommen würde, um richtig den Gestank stufige Skala auf der Grundlage der verschiedenen Gaswerte. verteilen Sie dann zum fleißigste Badezimmer in Holly Springs.

Und ja, sie sind Spiel des Gestank-o-meter dort im Einsatz über haben.

## Ihre eigene Scheiße

Also, wenn Sie ein selbst bauen wollen ... zuerst müssen Sie Ihre eigene Scheiße drucken. Sie können die STL-Datei herunterladen [hier](https://davidgs.com/poop.stl). Ich werde sehen, ob ich das alles Code aufzuräumen und steckte es in meinem). Ich werde sehen, ob ich das alles Code aufzuräumen und steckte es in meinem [GitHub](https://github.com/davidgs). Fühlen Sie sich frei zu). Fühlen Sie sich frei zu [Follow-me](https://twitter.com/intent/follow?screen_name=davidgsIoT) auf Twitter und erreichen mit Fragen oder Kommentaren!

Als letztes Wort, bitte, für die Liebe von allem, was heilig ist, waschen Sie Ihre Hände verdammt. 60% der Männer und 40% der Frauen waschen ihre Hände nicht, nach dem Toilettengang und das ist ekelhaft. Und jetzt macht es Ihnen eine Krankheit Vektor. So ** Wash. Ihre. Hände!**
