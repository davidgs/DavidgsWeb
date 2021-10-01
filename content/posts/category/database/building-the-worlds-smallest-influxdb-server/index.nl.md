---
title: "Het bouwen van 's werelds kleinste InfluxDB Server"
Date: 2020-02-13
Author: davidgs
Category: Gadgetry, IoT, Work
Slug: building-the-worlds-smallest-influxdb-server
hero: images/giant-board-pin-out-1024x690.png
reading_time: 4 minutes
---

Ik heb veel van [InfluxDB](https://www.influxdata.com/products/influxdb-overview/) servers gebouwd in mijn tijd hier, en ik heb een aantal mooie esoterische degenen op die gebouwd, maar ik denk dat ik 've eindelijk trok wat alleen kan worden omschreven als' s werelds kleinste InfluxDB Server! Terug in de zomer van 2019 zag ik een project op [CrowdSupply.com](https://www.crowdsupply.com/groboards/giant-board) voor zoiets als de 'Reus van Commissarissen'. Het zag er echt, echt cool! Een complete Single Board Computer (SBC) dat Linux, al liep in een Feather form factor. Ik backed het meteen! Dan, na te denken over het voor een tweede, ik steunde nogmaals * *! Dus ik heb 2 van deze dingen. Total ongeluk, ik zweer het.

Enkele specs. Hier is wat de Giant Board eigenlijk is:

**Giant Board Specs**:

- **Processor**: Microchip SAMA5D2 ARM® Cortex®-A5 Processor 500 MHz
- **Memory**: 128 MB DDR2 RAM
- **Storage**: microSD-kaart
- **Sensing**: 6 x 12-bits ADC 3,3 V referentie en externe trigger
- **Aansturing**: 4 x 16-bit PWM met externe trigger
- **Connectiviteit**: 1 x I²C, 1 x SPI, 1 x UART, meer met Flexcom
- **Vermogen**: via USB, met ondersteuning voor LiPo batterijen
- **Operating System**: mainline Linux kernel

Alle in dit kleine form-factor die ik gebruik meestal voor microcontrollers!

Nou ja, een paar weken geleden, ze zijn aangekomen! Dus, wat unboxing foto's:

![GiantBoard in pakket](/posts/category/database/images/IMG_6750-768x1024.png)

Wacht, de hele zaak past in dat ene tas? Ja. Niet alleen dat - er zijn meerdere delen in die tas! En ik realiseer me (nu) dat er geen schaal om die tas in de foto, maar dat is een Mac muis ernaast. Ik zou het beeld opnieuw maken, maar ik heb al gooide de zakken uit de buurt!

![Giant Parts Board](/posts/category/database/images/IMG_6752-1-768x1024.png)

Dat klopt: Ik bestelde de WiFi Feather Wing add-on, want immers, wat is een ivd board - en vooral wat is een InfluxDB server - zonder netwerk!

![Giant Board met Feather vleugel](/posts/category/database/images/IMG_6754-1-768x1024.png)

En net voor de schaal, dat is een Amerikaanse wijk in tussen hen. Dus dat gaat mijn server*en* mijn netwerk interface! Voor iets genaamd de 'Giant Board' het is zeker klein!

Na een beetje solderen, ik had het allemaal samen te stellen en, met de toevoeging van een MicroSD-kaart, is opgestart!

![Command line met login aan de Giant Board](/posts/category/database/images/Screen-Shot-2020-02-11-at-9.04.12-AM.png)

Woah! Deze kleine kleine ding loopt Debian Linux? Waarom ja, ja het doet! Dus dat maakt [installeren InfluxDB](https://docs.influxdata.com/influxdb/v1.7/introduction/installation/) super eenvoudig, omdat we al het schip ARMv7 binaries voor InfluxDB en al de rest van de [TIK Stack] ( https://www.influxdata.com/time-series-platform/)!

![Terminal tonen influxd running](/posts/category/database/images/Screen-Shot-2020-02-11-at-9.07.54-AM.png)

Ok, zeker, het is momenteel hameren dit kleine CPU, maar het is ook actief is!

![live-opname van een dashboard op de Giant Board](/posts/category/database/images/Kapture-2020-01-21-at-12.22.19-1024x372.gif)

En zoals je kunt zien, het dashboard loopt in [Chronograf](https://www.influxdata.com/time-series-platform/chronograf/) om mij een blik in de manier waarop de hele zaak draait!

Nu zou ik dit uitgevoerd als een productie-systeem? Absoluut niet! Zoals je kunt zien, is het gebruik van veel te veel systeembronnen op zo'n klein apparaat. Zou ik het in werking als een rand verzamelen en doorsturen apparaat? Heel waarschijnlijk. Zou ik het in werking als een ingesloten [Telegraf](https://www.influxdata.com/time-series-platform/telegraf/) middel apparaat? 100% absoluut. Vooral omdat ik kan dit ook doen met het:

![Giant Board op de accu](/posts/category/database/images/IMG_6779-768x1024.png)

Dat klopt, kan ik het uit te voeren op een batterij! Een oplaadbare LiPo batterij op dat (en het opladen circuits is ingebouwd in de raad!). En voor de volledigheid, zal ik een pin-out hier bieden, zodat u kunt zien wat*anders* ik kan toevoegen aan dit ding - sensoren, actuatoren, enz., - om het te maken zowel een data-knooppunt en een sensor knooppunt:

![Giant Board pinout kaart](/posts/category/database/images/giant-board-pin-out-1024x690.png)

Vervolgens zal ik een versie van InfluxDB 2.0 te bouwen voor ARMv7 te zien of dat loopt ofwel beter of slechter op dit apparaat, dus let op deze ruimte om te zien wat er gebeurt!
