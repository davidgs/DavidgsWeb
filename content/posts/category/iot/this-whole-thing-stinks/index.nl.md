---
title: "Dit hele ding stinkt!"
Date: 2020-03-11
Author: davidgs
Category: Gadgetry, IoT
Tags: InfluxData, InfluxDB, IoT, Poop Detector
Slug: this-whole-thing-stinks
hero: images/singing-poop-emoji-sm.png
---

## In de eerste plaats, niet vragen

Ik heb geen idee waar dit idee vandaan komt, het gebeurde gewoon. Ik blijf zeggen: "Ik ben niet bijzonder trots op", maar in werkelijkheid? Ik soort van am want het is grappig als stront (pun intended). Sommige projecten kwam over mijn twitter-feed die inbegrepen (schijt ik je niet) een 3-D afdrukbare model van de 💩 emoji. Ik herinner me niets anders over dat project, maar je kunt beter geloven dat ik ging meteen voor dat STL file!

![Zingen kak emoji](/posts/category/iot/images/singing-poop-emoji.jpg "singing-poop-emoji.jpg")

Vervolgens zat etterende voor een paar weken (als je niet comfortabel met veel shitty grappen, bail out nu. Fair waarschuwing.). Ik wist dat ik*zou* iets mee te doen, ik wist gewoon niet*wat* ik zou doen. En toen drong het tot me. Ik had een heleboel gas sensoren liggen (als dit verbaast je, je echt kent me niet helemaal). En toen drong het tot me! Een badkamer stank sensor en alert systeem !! Maar mijn shit niet stinken (shut up!), Dus waar het te implementeren? Eureka-moment nummer 2! Onze beste vrienden huis, waar alle gebeurtenissen altijd worden gehouden, heeft wat we allemaal noemen 'The Hardest Working badkamer in Holly Springs'. Er zijn regelmatig 20 mensen daar voor het diner, of een andere gebeurtenis, en dat kleine damestoilet neemt de dupe van dit alles.

## Voer het Stink Detector

Het eerste wat was om 3-D drukken de kleine stront. Om ervoor te zorgen dat ik zou kunnen passen de juiste LED's in het te laten oplichten van de manier waarop ik het wil. En nee, je kunt er niets lichte make-up bruin. Als je*echt* geïnteresseerd in waarom je niet kunt maken bruin licht, kunt u gaan kijken naar [video](https://youtu.be/wh4aWZRtTwU), maar de kerel is veel vreemder dan ik. Nogmaals, eerlijke waarschuwing. Maar goed, ik geprint, en ziedaar, de LED-controller wilde ik fit te gebruiken (bijna) perfect! Ik moest een paar bochten van de PCB clip, maar geen kwaad gedaan, en ik kreeg een licht-up kak emoji!

![Een Kak Emoji verlicht oranje](/posts/category/iot/images/IMG_0087.jpeg)

Ik heb ook geschaald het aan 150% en ik overweeg het afdrukken van het op die manier alleen maar omdat, nou ja, je weet wel, grotere shit is beter stront! Dus, hoe heb ik licht deze shit up? Eigenlijk heel eenvoudig. Ik koop deze Wemos D1 Mini boards in bulk (zoals 20 in een tijd, omdat ze alleen elkaar $ 2,00 - duurder als je ze kopen bij Amazon, maar als je ze kopen bij Ali Express in China, kunnen ze net zo goedkoop als $ 1,50 per stuk) en ik koop bijpassende tri-color LED schermen te gaan met hen. Mijn vrienden [Andy Stanford-Clark](https://twitter.com/andysc) kreeg me begon op deze dingen met zijn 'Glow Orbs" Als je meer wilt lezen over de specifieke kenmerken van Glow Orbs, [Dr. Lucy Rogers](https://twitter.com/DrLucyRogers) schreef een hele ding over hen [hier](https://www.ibm.com/blogs/internet-of-things/creating-home-glow-orb/). Turns erachter dat ze een Fart-O-Meter gebouwd en gebruikt een GlowOrb ook. ik had geen idee totdat Andy me verteld.

Voor een slag tutorial over de Wemos D1, zie [dit artikel](https://www.hackster.io/innovativetom/wemos-d1-mini-esp8266-getting-started-guide-with-arduino-727098). Ik weet dat veel mensen schrijven van volledige, gedetailleerde tutorials, enz. Voor dit soort dingen, maar, eerlijk gezegd, ik ben te lui, dus ik meestal gewoon je vertellen wat ik heb gedaan. Ik zal de bloederige details, waar het er toe doet geven.

Maar goed, want ik doe deze shit de hele tijd, ik heb mijn kak-light luisteren naar een MQTT makelaar voor berichten over wat kleur aan display. Ik ben nog steeds bezig met de gedetailleerde kleur niveaus als ik dingen te kalibreren. Ik zal betrekking hebben op de details van hoe dat berichten verzonden en ontvangen in een beetje.

Het stinkt detector zelf ook wordt uitgevoerd op een Wemos D1 Mini een MQ-4 methaan sensor die ook moet meten H2 en een luchtkwaliteitsensor SGP-30 dat maatregelen vluchtige organische chemicaliën (VOC's) en een echt shitty versie CO2 dat moet nooit te vertrouwen. Ik heb veel van het werk met CO2-sensoren gedaan, en deze Eco2 sensoren zijn geen reet waard. Serieus, nooit vertrouwen hen. Ik ben in afwachting van levering op wat meer, beter gas sensoren zoals een MQ-136 Zwaveldioxide sensor en anderen. Ik zal waarschijnlijk zetten ze allemaal en dan uitvinden wat ingewikkeld, maar volstrekt willekeurig algoritme om te beslissen wat 'stinkt'. Stay tuned voor dat.

## Bouwen aan de Stink Sensor

Zoals ik al zei, ik ben momenteel met behulp van een Wemos D1 Mini met een [MQ-4 Methaan Sensor](https://www.sparkfun.com/products/9404) en een [SGP-30] (https: // www .adafruit.com / product / 3709) luchtkwaliteitssensor. U kunt ze zelf kopen als u van plan bent om dit ding te bouwen. Ik zal dit updaten met andere sensoren zoals ik ze toe te voegen, misschien. Hier ziet u hoe draad alles op:

![Schakelingschema van de Wemos D1 en Gassensor](/posts/category/iot/images/Stinker.png)

Het is belangrijk op te merken dat de MQ-4 vereist 5v terwijl de SGP-30 hoeft slechts 3.3V. MQ-4 is een rechte analoge sensor, zodat de bedrading een van de analoge ingangen prima werken. De SGP-30 is een I2C sensor, dus het is bedraad SDA <-> D1 en SCL <-> D2 die de standaard I2C pinnen op de Wemos (die ik moet opzoeken elke keer) zijn. Wanneer u 5v aanmelden via de USB de MQ-4 krijgt straight 5v en de SGP-30 krijgt 3.3v via de onboard voltage regulator. Nu, hoe krijg je eigenlijk data off van deze sensoren? Nou, dat is de volgende stap, natuurlijk!

## Reading Stink

De SGP-30 heeft een bibliotheek voor het voorzag door Adafruit (natuurlijk), zodat je nodig hebt om die bibliotheek toe te voegen aan uw Arduino IDE en vervolgens opnemen in uw project.

```cpp
#include <Adafruit_SGP30.h>
#include<Wire.h>
```

U krijgt dan te maken en SGP30 object en initialiseren in je setup routine:

```cpp
Adafruit_SGP30 sgp;
```

Maakt het object en:

```cpp
if(! sgp.begin()){
  Serial.println("Sensor not found :(");
    while(1);
}
```

initialiseert de sensor. Als u niet de sensor correct hebt bedraad, zal de hele zaak te hangen, dus zorg ervoor dat je hebt het juiste bedrading up!

Het lezen van de VOC is vrij eenvoudig na dat:

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

De SGP object wordt geretourneerd met alle lezingen in, dus het is vrij eenvoudig. MQ-4 sensor is iets lastiger. Het is een analoge sensor, waardoor het echt alleen een ruwe spanningswaarde, welke schalen (enigszins) met de gasconcentratie terugkeert. Gelukkig voor mij, iemand gaf ons een leuke functie om de ruwe spanning te zetten in een ppm (parts per million) lezen voor het methaan, dus dat is nodig ook:

```cpp
int NG_ppm(double rawValue)
double ppm = 10.938*exp(1.7742*(rawValue*3.3/4095));
return ppm;
```

Ja, wiskunde. Ik heb geen idee hoe het werkt, maar het lijkt te zijn, dus ik ga mee, want ik ben shitty in wiskunde en hebben het vertrouwen van iemand slimmer dan ik (dat is de meeste mensen, eerlijk gezegd). Dus nu kan ik de ruwe spanning op de analoge pin te lezen, en vervolgens om te zetten dat voor een lezing van ppm, dat is wat we echt willen.

```cpp
int sensorValue = analogRead(A0); // read analog input pin 0]{style="color: #8e8e8e;"}
int ppm = NG_ppm(sensorValue);
```

Koel! Zo, nu dat we kunnen het gas niveaus lezen hoe kunnen we dit alles samen te binden?

## geen gebruik maken van A Shitty Database!

Natuurlijk heb ik werk voor een database bedrijf, dus we gaan naar die ene gebruiken. Eigenlijk, zelfs als ik niet werk voor deze specifieke database bedrijf, zou ik nog steeds gebruiken, want voor internet van de dingen gegevens zoals deze, het is gewoon echt de beste oplossing. We zullen al onze gegevens naar InfluxDB en dan kunnen we zien hoe de gloeiende kak te kleuren veranderen waarschuwen. Dus, hoe kunnen we gegevens naar InfluxDB? Het is super eenvoudig. We gebruiken de InfluxDB bibliotheek voor Arduino, natuurlijk!

```cpp
#include <InfluxDb.h>
#define INFLUXDB_HOST "yourhost.com"
#define INFLUX_TOKEN "yourLongTokenStringForInfluxDB2"
#define BATCH_SIZE] 10
Influxdb influx(INFLUXDB_HOST);
```

Een paar dingen op te merken. Ik gebruik InfluxDB 2.0, dat is de reden waarom ik het token nodig. Ik heb een BATCH_SIZE gedefinieerd, omdat het schrijven van data is veel efficiënter als we het doen in batches in plaats van individueel. Waarom? Nou, ik ben blij dat je het vraagt! Elk schrijven naar de database gebeurt via het HTTP-protocol. Dus als je wilt om dat te doen, moet je het opzetten van de verbinding, schrijf de data, en vervolgens afbreken van de verbinding. Door dit te doen elke seconde of zo duur is, van een kracht en processor perspectief. Dus is het beter om te sparen een bos van datapunten, doe dan het setup-send-teardown cyclus eens en voor altijd van het.

Dus nu hebben we een Influxdb object geïnitialiseerd met de juiste server adres. In de functie setup () hebben we om de configuratie te voltooien:

```cpp
influx.setBucket("myBucket"]);
influx.setVersion(2);
influx.setOrg("MyOrg");
influx.setPort(9999);
influx.setToken(INFLUX_TOKEN);
```

Dat is letterlijk het. Ik ben helemaal klaar om direct beginnen met het schrijven van gegevens naar InfluxDB, dus laten we eens kijken hoe ik dat doen:

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

In het eerste deel, controleer ik om te zien of ik tot aan mijn partij te beperken en als ik ben, ik schrijf de hele rotzooi naar de database, en reset mijn tellen. Daarna heb ik een nieuwe rij voor de database en voeg de tags en waarden aan. Dan heb ik 'Prepare' de rij, die eigenlijk alleen maar voegt het toe aan de wachtrij om te worden geschreven met de volgende partij. Verhoging van de batchtelling en stil zitten 500ms (½ seconde). Dan doen we weer de hele zaak.

Laten we naar de database en kijken of ik heb het allemaal werken:

![Screen Shot van een Influx Chronograf Dashboard](/posts/category/iot/images/Screen-Shot-2020-03-11-at-2.55.28-PM.png )

Ik zou zeggen dat is een ja! Nu dat het is er allemaal, het is tijd om updates te sturen naar de gloeiende kak!

Daarvoor gaan we een taak te maken in InfluxDB 2.0. En ik ga het noemen 'poepen', want zelfs ik niet een taak genaamd 'stront' in mijn UI willen.

![Chronograf Dashboard Element](/posts/category/iot/images/Screen-Shot-2020-03-11-at-2.57.12-PM.png)

En hier is de taak die ik heb gemaakt:

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

Aangezien er is veel aan de hand daar, ga ik door dit alles. Ten eerste, de MQTT pakket schreef ik nog steeds in de "experimentele" pakket, dus je moet importeren dat om het te gebruiken. Als je boven kijken naar het beeld van de Data Explorer kunt u zien dat ik het opslaan van alles in mijn "Telegraf" bucket, en de "badkamer" meting. Op dit moment ben ik alleen maar het intoetsen off van de "tvoc" lezen. Zodra ik dat veranderen, zal ik deze taak met de formule die ik gebruik bij te werken. Ik ben gewoon grijpen de laatste meting in de afgelopen 30 seconden. dan vul ik de details van de MQTT makelaar ik gebruik, en het onderwerp zich te onderwerpen, en weg is hij! Dat is het voor de taak!

## Lighting Shit Up!

Dus zoals je weet, zetten we een WEMOS D1 mini met een tri-color LED op het in de gedrukte kak. Nu is het tijd aan het licht die shit up! Aangezien wij aan het schrijven bent waarden naar een MQTT makelaar, alles wat we echt moeten doen is connect dat WEMOS de MQTT makelaar, die, gelukkig, is echt eenvoudig.

Je hebt een heleboel WiFi stuff (u dit ook nodig hebt in de sensor code, door de manier):

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

Sommige van deze zijn dingen die ook overeenstemmen met dingen in je InfluxDB taak, zoals de COMMAND_TOPIC, en de makelaar. dus zorg ervoor dat je die juist tussen de twee. Dat is alles wat de spullen die je moet hebt gedefinieerd (ik ben niet van plan door middel van hoe de WiFi-setup te krijgen en geconfigureerd als er honderden tutorials op om dat te doen voor Arduino en ESP8266 apparaten.).

In je setup () functie die u nodig hebt om uw MQTT Client (PubSubClient) object te configureren en zich abonneren op uw onderwerp, evenals het opzetten van uw LED. Ik gebruik de Adafruit NeoPixel bibliotheek, want het is super eenvoudig te gebruiken.

```cpp
client.setServer(BROKER, 8883);
client.setCallback(callback);
client.subscribe(COMMAND_TOPIC);

Adafruit_NeoPixel] pixel = Adafruit_NeoPixel(1, 4); // one pixels, on pin 4
//pin 4 is "D2" on the WeMoS D1 mini]{style="color: #8e8e8e;"}
```

Je belangrijkste lus is vrij kort voor dit, zoals de PubSubClient een groot deel van de timing voor u handvatten:

```cpp
void loop() {
  if(!client.connected()) {
    reconnect();
  }
  // service the MQTT client]{style="color: #8e8e8e;"}
  client.loop();
}
```

Je zal natuurlijk moeten de callback routine, en dit is waar de magie gebeurt, dus laten we eens naar die nu.

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

Ja, het is nootachtig. Vooral omdat ik deze zelfde code te gebruiken in een heleboel verschillende plaatsen. Soms wil ik de hex-kleur, soms wil ik de RGB-kleurruimte, dus ik hoe dan ook hier kan gaan. Het ziet er shitty, maar het werkt voor mij. Dit alles doet is de boodschap van de MQTT makelaar, en trek de numerieke waarde (door ervaring weet ik dat de MQTT bericht komt in het volgende formaat:

```
bathroom _value=566 1583959496007304541
```

Dus ik weet dat ik kan index in het aan de `=` teken en de `` (spatie) en komen terug met de numerieke waarde. Vanaf daar, het is gewoon het schalen van de waarde om de kleur en het inschakelen van de LED! Daarna is de kak gloeit wanneer je stront! En de kleur verandert afhankelijk van hoe stinkende het is. De VOC-waarde is niet echt een zeer goede prijs (vooral als je de neiging om een soort van gebruik kak-spray je mis-daad te verbergen. De meeste van hen zijn niets anders dan vluchtige organische stoffen en dat zal de nummers spike, Dat is de reden waarom ik' m in afwachting van de nieuwe sensoren, zodat ik veel gas waarden kunnen krijgen en zien welke het meest indicatief stinken. of welke, nauwkeuriger. Daarna heb ik met een aantal algoritme zal komen om de stank niveau goed te schalen op basis van de verschillende gasniveaus. implementeren dan naar de hardst werkende badkamer in Holly Springs.

En ja, ze zijn spel om de stank-o-meter ingezet daar.

## Haal je eigen stront

Dus, als je wilt om er zelf een te bouwen ... eerst je nodig hebt om je eigen stront te drukken. U kunt het STL-bestand te downloaden [hier](https://davidgs.com/poop.stl). Ik zal zien of ik kan opruimen deze code en zet het in mijn [GitHub](https://github.com/davidgs). Voel je vrij om [Follow Me] (https://twitter.com/intent/follow?screen_name=davidgsIoT) op Twitter en uit te reiken met vragen of opmerkingen!

Als een laatste woord, alstublieft, voor de liefde van alles wat heilig is, was je verdomde handen. 60% van de mannen en 40% van de vrouwen niet hun handen te wassen na het gebruik van het toilet en dat is walgelijk. En nu het maakt je een ziekte vector. Dus ** Wash. Jouw. Hands! **
