---
title: "Schrijven naar InfluxDB 2,0 van Arduino ESP8266"
Date: 2019-03-22
Author: davidgs
Category: IoT
Tags: Arduino, ESP8266, IoT, IoT Data
Slug: writing-to-influxdb-2-0-from-arduino-esp8266
hero: images/3686-10.jpg
---

Zoals InfluxData beweegt steeds dichter bij het vrijgeven van v2.0, is het steeds belangrijker om te kunnen gegevens op te halen **in** InfluxDBv2, natuurlijk. Klinkt logisch, toch? Omdat de overgrote meerderheid (zoals, niet te onderscheiden van 100%) van mijn gegevens zijn afkomstig van ivd-apparaten, heb ik besloten dat het tijd was om te beginnen met het maken van deze apparaten InfluxDB v2-in staat was.

Ik ben blij om te zeggen dat de eerste stap in die richting is nu compleet! Een van mijn favoriete sensoren een deeltjesmateriaal sensor die meet de hoeveelheid ** ** zeer kleine deeltjes in de lucht (van 2,5 urn tot 100 urn in diameter). Dit spul, zo blijkt, is echt*echt* slecht voor je, dus weten hoeveel er in de lucht is een goed idee. Daartoe Ik bestelde een van deze sensoren uit Adafriut:

![3686 10](/posts/category/database/images/3686-10.jpg )

Het is klein, en makkelijk aan te sluiten op vrijwel alles omdat het gewoon spews data uit via UART. Aangezien ik een enorme stapel ESP8266 planken liggen (ik meestal om hen door de tientallen omdat ze zo goedkoop en makkelijk aan te pakken), haakte ik het aan een van die. De code was eenvoudig, dankzij Adafruit verstrekken, en er was een handvat InfluxDB bibliotheek te schrijven gegevens, maar het alleen ondersteund InfluxDB v1.x. Het eerste wat ik deed (want ik was in een haast) was om de 1.x bibliotheek en gewoon herschrijven het voor 2.x. grijpen Kostte me ongeveer 1/2 uur of minder, en het werkte geweldig! (U kunt die versie [hier](https://github.com/davidgs/ESP8266_Influx_DB_V2) te gebruiken als je wilt). Dat was echt niet de*rechts* oplossing wel. Dus vandaag heb ik ging terug en creëerde een goede splitsing van de [oorspronkelijke repository](https://github.com/tobiasschuerg/ESP8266_Influx_DB), en bijgewerkt is om ofwel versie 1.x of versie 2.x van InfluxDB ondersteunen. Ik heb natuurlijk een goede Pull Request ingediend tegen de oorspronkelijke bibliotheek en hoop dat het zal worden geaccepteerd / samengevoegd binnenkort.

Laten we wandeling door wat er nodig is om deze nieuwe bibliotheek te gebruiken dan. Het is doodsimpel, eigenlijk. Tenminste met Arduino, alles wat je hoeft te doen is het toevoegen van de bibliotheek, dan opnemen in uw schets:

```cpp
#include <InfluxDb.h>
//#include <InfluxDataV2.h> // if you want to use the other library I built and that’s in my GitHub 
#define INFLUXDB_HOST “myhost.com"
Influxdb influx(INFLUXDB_HOST);
```

Dat krijgt u begonnen. Vervolgens zul je een aantal specifieke informatie van uw InfluxDB v2.0 (alfa nog steeds!) Installatie nodig. Opmerkelijk, vindt u de `organisatie:` bucket` en `token` die zijn gekoppeld aan uw account nodig. Deze kunt u vinden door te wijzen uw web-browser op uw InfluxDB server, poort 9999, het invoeren van uw gebruikersnaam en wachtwoord, en naar de configuratiepagina:

![Screen Shot 2019 03 22 1 26 56 PM](/posts/category/database/images/Screen-Shot-2019-03-22-at-1.26.56-PM.png)

Vervolgens kunt u ze in de Arduino Sketch:

```cpp
influx.setBucket(“myBucket");
influx.setVersion(2);
influx.setOrg(“myOrg");
influx.setPort(9999);
influx.setToken(“myToken");
```

Zodra u dat in uw `setup () heb gedaan 'functie, kun je beginnen met het schrijven van gegevens naar de v2.0 Influx server!

```cpp
void loop() {
  loopCount++;
  InfluxData row("temperature");
  row.addTag("device", "alpha");
  row.addTag("sensor", "one");
  row.addTag("mode", "pwm");
  row.addValue("loopCount", loopCount);
  row.addValue("value", random(10, 40));
  influx.write(row);
  delay(5000);
}
```

Zien? Ik zei toch dat het gemakkelijk was!
