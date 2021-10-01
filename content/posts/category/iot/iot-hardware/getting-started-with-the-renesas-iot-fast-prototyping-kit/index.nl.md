---
title: "Aan de slag met de Renesas IoT Fast Prototyping Kit"
Date: 2017-07-25
Author: davidgs
Category: Evangelism, Gadgetry, IoT
Tags: IoT, Prototyping, Renesas
Slug: getting-started-with-the-renesas-iot-fast-prototyping-kit
hero: images/Safari041.jpg
reading_time: 5 minutes
---

Ik heb zin om deze te krijgen voor een paar weken, en belaagd zijn door een heleboel andere dingen die steeds weer opdoken, maar ik ben al weg werken met deze, en dacht dat ik zou kunnen plaatsen op zijn minst een initiële post over deze kits. [Renesas](https://www.renesas.com/en-us/) was zo vriendelijk om me geven zowel de [S3 IoT Fast Prototyping Kit] (https://www.renesas.com/en-us/products /software-tools/boards-and-kits/renesas-synergy-kits/renesas-synergy-s3a7-prototyping-kit.html) en [S7 Starter Kit] (https://www.renesas.com/en-us /products/software-tools/boards-and-kits/renesas-synergy-kits/renesas-synergy-sk-s7g2.html), die beide zijn echt **echt** leuk boards voor het doen van ivd prototyping. Ik zal beginnen met de S3 IoT FPT (Fast Prototyping Kit). In de eerste plaats is natuurlijk de unboxing!

![IMG 3095](/posts/category/iot/iot-hardware/images/IMG_3095.png)

En wat er in de doos:

![IMG 3098](/posts/category/iot/iot-hardware/images/IMG_3098.png)

En wat er in de zakken:

![IMG 3099](/posts/category/iot/iot-hardware/images/IMG_3099.png)

![IMG 3100](/posts/category/iot/iot-hardware/images/IMG_3100.png)

![IMG 3101](/posts/category/iot/iot-hardware/images/IMG_3101.png)

Vervolgens wordt een kort overzicht van wat er op het bord / in de doos:

- Renesas S3A7 MCU board
- New Haven 2.4" Touch-screen display
- AMS Milieu Sensor Module
- Temperatuur
- Vochtigheid
- Luchtkwaliteit
- Nabijheid
- Verlichting
- Bosch Motion Sensor Module
- Accelerometer
- eCompass
- Magnetometer

Plus een heleboel andere dingen aan boord, zoals SPI, Fast voor grafische afbeeldingen, etc. en een nette iOS-app voor demo's. Ik waardeer dat kleine Segger J-Link boord. Niet dat ik niet heb een kleine en groeiende collectie van JTAG programmeurs, maar het is altijd leuk om een andere optie te hebben!

## Het uitvoeren van de Demonstratie

Het bord wordt geleverd met een geïnstalleerde demo, dus heb ik besloten om het uit te voeren. Het heet de [Chef Demo](http://renesas-blog.mediumone.com/renesas-s3a7-fast-iot-prototyping-kit-with-smart-chef-demo-quick-start-guide/) en sinds die tutorial is vrij compleet en makkelijk te volgen, ik zal het hier niet opnieuw. Ga gewoon door de eenvoudige installatie-instructies op de demo en het aanraakscherm:

![IMG 3103](/posts/category/iot/iot-hardware/images/IMG_3103.png)

en je komt wel goed. Zodra u het bord geconfigureerd, kunt u inloggen op het Dashboard op de Renesas website (eigenlijk, het is gevoed door mijn oude vrienden in [Bug Labs](https://buglabs.net)! Hi guys !!) Wanneer de installatie en het uitvoeren van , ik had een mooie dashboard lopen met de uitvoer van de sensor data:

![Safari040](/posts/category/iot/iot-hardware/images/Safari040.jpg)

Dat is heel aardig! Next up op dat vlak is om de uitvoer van de sensor lezingen te leiden naar mijn [InfluxDB Dashboard] (/ berichten / category / iot / iot-hardware / running-influxdb-on-an-artik-520 /).

Er is ook een mooie workflow editor, als onderdeel van het dashboard dat een heleboel, zoals [NODE-RED](https://nodered.org) lijkt me.

![Safari041](/posts/category/iot/iot-hardware/images/Safari041.jpg)

Ik kijk ernaar uit om te graven in dat een beetje dieper en re0directing de output.

## De ontwikkeling van de raad

Een woord van waarschuwing voor degenen onder u die er zijn (zoals ik) dat Mac-heads zijn: U **must** een Windows VM op grond waarvan dit soort dingen uit te voeren. De Renesas Studio (dat is een variant van Eclipse) **alleen** draait op Windows. Dit deed compliceren dingen voor mij een beetje omdat mijn Windows VM is een beetje een puinhoop op dit moment, maar het is nog steeds de moeite waard.

Een van de mooiste dingen die ik merkte meteen was de mogelijkheid om een aantal echt leuke board-level aanpassingen te doen in het tool. Er is een pakket configuratietool dat geeft je een overzicht van alle pinnen uit de MCU Package, en u kunt pinnen aan / uit te schakelen, etc. afhankelijk van uw behoeften. Als u prototyping bent naar een specifieke toepassing, en van plan om uw eigen PCB bouwen langs de lijn, dit is echt een handige functie. Ik bedoel **echt** handig! Ik ben in het midden van een PCB ontwerp op dit moment met een andere MCU module die niet een dergelijk instrument heeft, en we gaan door een veel proberen te achterhalen wat er moet naar buiten waar, wat er moet zijn om te worden gebracht gebonden laag, vastgebonden hoog, enz. zodat er geen storing veroorzaken. Leuk om te kunnen gewoon weer een pin uit en vergeet het!

![E2studio002](/posts/category/iot/iot-hardware/images/e2studio002.jpg)

De IDE heeft ook een aantal andere leuke functies waarmee u kunt zien welke pakketten zijn inbegrepen, etc. evenals een aantal leuke configuratie functies.

![E2studio001](/posts/category/iot/iot-hardware/images/e2studio001.jpg)

Zoals je misschien al gemerkt dat het de [ThreadX](http://rtos.com/products/threadx/) RTOS loopt, zodat u multi-threaded uitvoering met weinig moeite of boven het hoofd krijgen - goed, anders dan de standaard dingen bij je schrijft multi-threaded applicaties.

Een van de andere dingen die ik zag, en alleen omdat ik deed het zo lang met de [Apache MyNewt Project](https://mynewt.apache.org/), was de opname van de board support packages - bsp. h, bsp.c, etc. - dat het lijkt alsof men zou kunnen gebruiken om een goede start te hebben in het maken van een van deze boards lopen MyNewt OS. Als je van dat soort dingen.

de raad van bestuur toe te voegen aan mijn WiFi en configureren het was ook eenvoudig gemaakt door het hebben van het touchscreen aan boord.

Het kan een beetje moeilijk zijn om te lezen, maar het is een eenvoudige interface om de onboard WiFi configureren om verbinding te maken met mijn SSID. via een ingebouwde webserver:

![Safari038](/posts/category/iot/iot-hardware/images/Safari038.jpg)

En weg ik ga!

## Conclusie

Er is veel meer hier te gaan, en ik zal binnenkort aan de eigenlijke schrijven en implementatie van de code te krijgen op dit board. Gezien het feit dat het komt met al deze koele sensoren, en aangezien ik deze [leuke tijd-serie-database handler] (/ berichten / category / iot / iot-hardware / running-influxdb-on-an-artik-520 /), I 'll iets moeten doen om een bos van milieu-gegevens te verzamelen en streamen terug naar mijn server. Nogmaals, eerste stap zijn om de demo uitgang omleiden naar mijn eigen tijd-serie database, schrijf dan een applicatie die het direct doet.
