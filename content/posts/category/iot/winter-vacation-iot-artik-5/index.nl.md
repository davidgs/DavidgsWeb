---
title: "My Winter Vacation (wat ik deed met internet van de dingen en ARTIK-5)"
Date: 2017-01-02
Author: davidgs
Category: Uncategorized
Slug: winter-vacation-iot-artik-5
hero: images/eTapeProject-1-1-225x300.png
reading_time: 6 minutes
---

Ik weet niet over u, of wat je deed met uw wintervakantie (of als je zelfs heb er een, en als je dat niet deed, het spijt me), maar was een van de leuke dingen die ik deed met de mijne een besteden weinig tijd met mijn [Samsung ARTIK](http://artik.io) Dev Kit. Als u het lezen van [Hardware Extravaganza Post] (/ berichten / category / iot / iot-hardware / hardware-extravaganza /), dan weet je dat ik een ARTIK-0 en een ARTIK-5 developer kit niet zo lang geleden. Ik heb tot mijn oren geweest in [MyNewt](/posts/category/iot/iot-hardware/hardware-extravaganza/) al en geen tijd te doen veel met hen hebben gehad, helaas. Dat wil zeggen, tot mijn winterstop kwam.

Ik wilde niet de hele tijd te spelen door te brengen in mijn kantoor en ergeren mijn familie, dus heb ik besloten om gewoon proberen snel een project met behulp van een aantal bestaande sensor hardware die ik heb liggen. (Let op: Ik heb een enorme hoeveelheid sensor hardware "gewoon rondslingeren") heb ik besloten om te proberen met behulp van de [Etape Liquid Level Sensor] (https://www.adafruit.com/products/464?gclid=CjwKEAiAkajDBRCRq8Czmdj-yFgSJADikZggOOig7wQivaUivT14Q8aNI3ndBmn2oyGF3EJgiZJ- MxoCWvDw_wcB) die ik heb al spelen voor de MyNewt project. Het is een vrij eenvoudige analoge sensor voor het lezen van de water / vloeistofniveau in de houder. Of, in mijn geval, op mijn rug patio die regelmatig overstroomt! Ik heb ook besloten eerst te trekken uit de ARTIK-5 want het is zeer eenvoudig aan de slag.

We gaan naar de sensor te gebruiken als een * resistieve sensor, * en de installatie is zeer eenvoudig. Ik zal met behulp van een breadboard om dit allemaal samen voor illustratieve doeleinden te zetten. Sluit eerst een jumper-draad van 5v op het bord om de breadboard.Next, bevestigt een jumper draad van ADC0 op het bord om de breadboard. Dit zal onze ADC-in zijn. De sensor moet komen met een 560 ohm weerstand, zodat stekker die in de plaat tussen Vdd en ADC in gaten. Tot slot, voeg een jumper van GND op het bord om uw breadboard. Op dit punt moet je ARTIK 5 er als volgt uitzien:

[! [ARTIK-5 ADC Sensor Wiring] (/ berichten / category / iot / images / eTapeProject-1-1-225x300.png)] (/ berichten / category / iot / images / eTapeProject-1-1.png)

 

En je broodplank moet er zo uitzien:

[! [Breadboard bedrading] (/ berichten / category / iot / images / eTapeProject-4-225x300.png)] (/ berichten / category / iot / images / eTapeProject-4.png)


U met een van de middelste 2 draden van de sensor grond op de breadboad en het andere middelste leiding naar de ADC in de breadboard. Dat moet de sensor aansluiting te voltooien en uw ingevulde broodplank eruit moet zien het bovenstaande.

Ik kocht een 1000 ml maatcilinder waarin de Etape sensor voor het testen van dit project te zetten, en hier is wat het uiteindelijke aansluiting van de sensor zelf ziet eruit als:

![étape Sensor cilinder](/posts/category/iot/images/eTapeProject-5.png)

Nu alles wat ik moet doen is het vullen met water en ... oh, wacht, ik moet waarschijnlijk wat code te schrijven, hè? Eigenlijk, het blijkt dat ik moet verrassend weinig van dat te doen! Ik besloot om de [Node-Red](https://nodered.org) een spin sinds ik het schrijven van een veel Node.js code dit jaar in ieder geval geven. Ik kreeg mijn ARTIK-5 aan de slag met de [Resin.io](https://resin.io) site die was erg snel en makkelijk te gebruiken. Zodra dat klaar was, en ik had een volledig operationeel ARTIK 5 (Let op: raak de **slank** profiel niet gebruiken, zorg ervoor dat je de **nieuwste** profiel gebruiken in uw Docker setup U zult het nodig hebben voor. het installeren van Node-rood), ik gewoon geïnstalleerd Node-Rode met behulp

```
% sudo npm install -g node-red
```
Zodra dat afgerond, installeerde ik de ARTIK bibliotheek voor Node-Rode

```
% /root/.node-red
% npm install node-red-contrib-artik
```

En dan maar om de dingen nog gemakkelijker te maken, installeerde ik de FRED module:

```
% npm install node-red-contrib-fred
```

U zult zien waarom FRED was een goed idee in een minuut. Zodra dat was allemaal op de ARTIK 5 Ik begon gewoon knooppunt-rood:

```
% node-red
```

En vervolgens aangesloten mijn browser om de ARTIK-5 Node-Red server en bouwde een app. Ik sleepte in een ARTIK ADC en geconfigureerd:

[! [Node-RED ARTIK Sensoren] (/ berichten / category / iot / images / Safari005.jpg)

[! [ARTIK-5 Node-Red ADC] (/ berichten / category / iot / images / Safari006-300x137.jpg)] (/ berichten / category / iot / images / Safari006.jpg)

een functie

[! [Node-rood functie-definitie] (/ berichten / category / iot / images / Safari007-300x137.jpg)] (/ berichten / category / iot / images / Safari007.jpg)

en JSON module, en vervolgens verslaafd alles tot FRED-ingang en een uitgang FRED-:

[! [ARTIK-5 Node-Red app] (/ berichten / category / iot / images / Safari004-300x129.jpg)] (/ berichten / category / iot / images / Safari004.jpg)

Oh, en toen klikte op de 'Deploy' te klikken. Ik zei toch dat het was eenvoudig.

Vervolgens ging ik naar mijn FRED dienst rekening bij [sensitec](https://fred.sensetecnic.com) en ingelogd zijn heb ik een privé-ADC eindpunt.:

[! [Maak End-punt in FRED] (/ berichten / category / iot / images / Safari009-300x180.jpg)] (/ berichten / category / iot / images / Safari009.jpg)

En toen voegde een **send** ADC gebeurtenis, veroorzaakt door een timestamp:

[! [Stuur Event naar ARTIK-5 in FRED] (/ berichten / category / iot / images / Safari008-300x127.jpg)] (/ berichten / category / iot / images / Safari008.jpg)

En een ontvangbuffer Indien de geretourneerde gegevens en voegt deze in een diagram wordt:

[! [ARTIK Event in FRED] (/ berichten / category / iot / images / Preview001-300x96.jpg)] (/ berichten / category / iot / images / Preview001.jpg)

Zodra ik de hele zaak begon, had ik een handige grafiek met het waterniveau in mijn maatcilinder:

[! [Water Niveau Tabel] (/ berichten / category / iot / images / Safari001-300x238.jpg)] (/ berichten / category / iot / images / Safari001.jpg)

En ik schreef wezen nul code.

Volgende Ik zal proberen het installeren van een MongoDB backend op de ARTIK-5 en het verzenden van de data aan dat, en vervolgens dienen van die gegevens naar een javascript front-end om alles in kaart te brengen. Dat vereist het schrijven van een stukje code, dus kijk voor dat in de nabije toekomst!

Ook ik werken met de werkelijke sensor verbonden met de ARTIK-0 en verzenden van de gegevens van dat voor het ARTIK-5 MongoDB bijvoorbeeld voor het verzamelen en analyseren. Ik kijk er echt naar uit om te graven in de ARTIK-0 een beetje want dat is meer hands-on met C-code - iets wat ik toch al nek-diep in de laatste tijd met MyNewt.
