---
Title: "ThingMonk 2017"
Date: 2017-10-20
Category: general
Slug: thing-monk-2017
hero: images/logo-2017-3.png
reading_time: 8 minutes
---

> **Opmerking:** Dit is een bericht uit mijn archief. Ik schreef het in 2017 en het werd gepost op de [InfluxData Blog](https://www.influxdata.com/blog/thingmonk-iot-insights/).
In september 2017 woonde ik de ThingMonk-conferentie in Londen bij. Hier is een kort overzicht van wat ik heb geleerd en een deel van het inzicht dat ik uit de conferentie heb gehaald. De ThingMonk 2017-video's beginnen te vallen als je de volledige primeur wilt krijgen.

## Achtergrond

De jaarlijkse <sup>[1]({{</sup><ref "#link-1" > <sup>}})</sup> De ThingMonk IoT-conferentie werd van 11 – 13 september 2017 gehouden in Shoreditch, Londen, waarbij InfluxData de video-opnames sponsorde. Die opnames beginnen nu pas uit te komen, dus zorg ervoor dat je ze allemaal gaat bekijken zodra ze uitkomen! Hieronder vindt u het huidige releaseschema voor de eerste reeks ThingMonk 2017-video's:

> Alle video's zijn vrijgegeven en zijn beschikbaar op het [ThingMonk YouTube-kanaal](https://redmonk.com/?series=thingmonk-2017).

Een andere set van de rest van de video's zal worden gepost zodra de eerste set klaar is.

ThingMonk is eigenlijk 2 dagen van ThingMonk, met als opening Eclipse IoT Day.

ThingMonk is een ongelooflijk diverse en inclusieve conferentie met een zeer expliciete en sterk gehandhaafde gedragscode. Waarom vermeld ik de diversiteit en de gedragscode in een blogpost? Omdat een van de sterke punten van de conferentie, denk ik, de ongelooflijke nadruk is op diversiteit - zowel bij sprekers als bij aanwezigen - waar RedMonk heel hard aan werkt. En onderdeel van het succesvol maken van de diversiteit is de Gedragscode. Andere organisatoren van conferenties zouden het een en ander kunnen leren over hoe ze een conferentie diverser en inclusiever kunnen maken door te bestuderen wat RedMonk doet.

In de loop van 3 dagen van ThingMonk en Eclipse IoT Day heb ik 23 sessies en 2 codeerworkshops bijgewoond die volledig aan IoT waren gewijd. Dat is veel IoT in 3 dagen! Je kunt hier de volledige agenda voor alle 3 de dagen bekijken.

## Eclipse IoT-dag

Dag één van de ThingMonk-conferentie was eigenlijk een Eclipse IoT-dag die volledig werd gesponsord door de Eclipse Foundation. Kijk voor meer nieuws over de Eclipse Foundation!

Het eerste gesprek was van Ian Craggs over MQTT 5.0 en een korte geschiedenis van MQTT door de jaren heen. Ik had geen idee hoe lang MQTT al bestond! Er komen enkele nieuwe functies in MQTT 5.0, zoals metadata, enz. Ik hoop dat InfluxDB deze zo vroeg mogelijk kan ondersteunen in de MQTT Telegraf-plug-in. Enkele nieuwe functies in 5.0:

- Schaalbaarheidsverbeteringen
- Foutmelding
-Metagegevens
- Betere ondersteuning voor beperkte clients (embedded)
- Alle pakketten hebben eigenschappen (inclusief diagnostiek)

Sebastien Lambour hield een lezing over het gebruik van IoT om stemmingsstoornissen te beheersen. Hij won de Eclipse IoT Award voor 2017 op basis van dit project. Het was een heel interessante benadering om stemmingsstoornissen te beheersen door omgevings- en andere gegevens te verzamelen en te interpreteren en deze te correleren met stemmingswisselingen voor een beter ziektebeheer.

## ThingMonk Dag 2

Ik zou 'hoogtepunten' doen, maar eerlijk gezegd waren alle gesprekken hoogtepunten. Van bijzonder belang was het concept van de 'Digital Twin'. Een digitale tweeling is een digitaal model van een real-world systeem dat wordt gevoed door gegevens van de real-world instantie. Denk aan een straalmotor die in software is gemodelleerd en gegevens van een echte straalmotor heeft ingevoerd. Dit concept van de digitale tweeling werd tijdens dag 2 gedemonstreerd en ik zal die demo later beschrijven. Het idee is om echte gegevens te gebruiken om betere modellen te bouwen, gevoed door een stroom echte gegevens om het model te verbeteren en uiteindelijk feedback te geven om betere 'objecten' in de echte wereld te bouwen. Allemaal geïnformeerd door gegevens. Dit vereist gegevensverzameling en -analyse bij elke stap, van edge-apparaat tot platform en digitale tweeling. Het omvat het binnenhalen van gegevens uit vele andere bronnen - datasheets, weergegevens, enz. om extra context aan de tweeling te geven. Ik schreef er laatst nog over om dit te doen.

Yodit Stanton, CEO van opensensors.io hield een lezing over de redenen waarom uw IoT-project zal mislukken. Ze haalde een verontrustend onderzoek aan waaruit bleek dat 75% van de IoT-projecten als een mislukking wordt beschouwd en dat slechts 15% waarde oplevert. Haar ervaring met het implementeren van real-world IoT-projecten voor echte klanten vormde de basis voor haar redenering achter haar conclusies. Een van haar belangrijkste conclusies was dat goedkope sensoren slechte gegevens genereren en dat slechte gegevens zullen leiden tot het mislukken van projecten.

> Afbeelding is verloren gegaan

Na haar lezing gingen Yodit en ik zitten voor een lange en gedetailleerde discussie over het verzamelen van gegevens over IoT-projecten. Ze is een heel interessante en briljante IoT- en datatechnoloog met veel praktijkervaring in het implementeren van IoT-oplossingen - iets wat niet veel mensen hebben!

Gary Barnett hield een toespraak met de titel "The Number One Thing", die zowel zeer informatief als zeer vermakelijk was. Hij presenteerde deze afbeelding over wat het "nummer één ding" in IoT is:

> Afbeelding is verloren gegaan

Maar apropos voor InfluxData:

> Afbeelding is verloren gegaan

Het heeft geen zin om enorme hoeveelheden IoT-gegevens te verzamelen, tenzij het bruikbare gegevens zijn. Wees gewaarschuwd dat wanneer de video voor deze talk uitkomt, deze gevuld is met F-bommen en andere godslastering (net als verschillende andere talks).

De dag werd afgesloten met gesprekken over menselijke factoren, makers, een treinbeheersysteem, blockchain in IoT en een presentatie over het gebruik van digitale tweelingen in de landbouw en de landbouw. Landbouw en landbouw zullen de komende jaren een belangrijke groeisector voor het internet der dingen zijn en het verzamelen van gegevens en analyse van landbouwgegevens zullen grote factoren zijn voor het succes ervan.

De belangrijkste conclusie van de blockchain-praat: als je geen gedistribueerd probleem hebt, zal blockchain niet het antwoord zijn. Dat lijkt een goede regel als je bedenkt hoeveel mensen reageren met "Blockchain!" voor bijna elk probleem.

## ThingMonk Dag 3

Dag 3 werd geleid door Sarah Cooper, hoofd van het AWS IoT-platform, die sprak over datadimensionaliteit in IoT. Ze presenteerde enkele sleutelconcepten in het verzamelen en analyseren van IoT-gegevens. Haar lezing over datadimensionaliteit beschreef het volgende:

0-D systemen: apparaat met discrete data en weinig relaties met applicaties en andere data
1-D systemen: 2 of meer gegevensbronnen of systemen. Input van de ene is output naar de andere. Gegevens zijn doorgaans lineair.
2D-systemen: beheert centraal verzamelingen van 0-D-gegevens en apparaten.
3D-systemen: combineer 1D- en 2D-systemen en heb meerdere overlappende gegevensrelaties.
Gegevensverrijking voegt dimensies toe aan gegevens – verrijkingen zoals weergegevens, enz. Sensorfusie kan verborgen informatie blootleggen.
Afhaalbericht: hoe eenvoudiger uw gegevens, hoe complexer de analyses die u kunt uitvoeren.

Er was een geweldige demo van het Digital Twin-concept, waarbij een digitale 3D-scanner van $ 60.000 werd gebruikt om de conferentie - deelnemers en alles - te scannen met een zeer hoge resolutie (zodat je gezichten in de scan kon herkennen). De gescande registreerde meer dan 1 miljoen punten per seconde! De scan werd vervolgens ingevoerd in de Unity-gaming-engine om een virtueel 3D-model van de hele conferentie te maken. Sommige sensoren werden uitgedeeld aan toeschouwers en deze sensoren werden vervolgens toegevoegd aan het virtuele model. Sensormetingen werden vervolgens in realtime in het model gestreamd en toonden veranderingen in de fysieke wereld weerspiegeld in het virtuele model. De demo kreeg een collectieve adem van het hele publiek en was vanaf dat moment het gesprek van de conferentie. Het bracht het concept van de Digital Twin op een zeer diepgaande manier naar huis.

Dr. Lucy Rogers van IBM hield een boeiende lezing over haar reis naar het worden van een IoT-maker, waarin ze een aantal van haar projecten liet zien die ze in de loop der jaren heeft gedaan. Ze is een maker naar mijn hart terwijl ze allerlei eigenzinnige, leuke, interessante demo's bouwt. Ze heeft nog geen Semaphore-vertaalbot gebouwd (we hebben in 2006 een IoT-gebaseerde bot gebouwd om tekstberichten naar semafoor te vertalen, gewoon voor de lol), maar ze heeft een aantal echt coole dingen gebouwd!

Er waren ook een paar jongens, zoals ik, die een live IoT-sensor in de kamer lieten draaien. De mijne was de IoT Demo-sensor die ik voor InfluxData had ontwikkeld, en die van hen bewaakte het CO2-niveau in de kamer en liet een live omgevingssensor achter in de kamer draaien. Met z'n tweeën konden we een aantal interessante observaties doen over schommelingen in temperatuur en CO2-niveaus, en wanneer en waarom ze optraden. Het bleek dat ze InfluxDB ook gebruikten als hun backend-mechanisme voor gegevensverzameling!

## Conclusies

Als u geïnteresseerd bent in een conferentie die niet gevuld is met marketing- en verkooppresentaties, die zich richt op de details van wat IoT succesvol maakt, of niet, en u geïnteresseerd bent in het horen van enkele van de beste sprekers in de branche , dan is ThingMonk the place to be. Het is klein, buitengewoon goed beheerd, zelfs nog buitengewoon goed samengesteld voor inhoud, en gevuld met uitstekende inhoud. Ik noem nogmaals de inzet voor diversiteit. Zoals ik tegen een van de organisatoren van het evenement zei, staat de ongelooflijke diversiteit bij ThingMonk in schril contrast met de meeste andere technische conferenties. Het benadrukt dat de diversiteit er is en dat de meeste andere conferenties gewoon niet proberen om diversiteit aan sprekers en aanwezigen te hebben. Ga zo door [RedMonk](https://redmonk.com): je doet geweldig werk!

**<a name="link-1"></a> [1]: De ThingMonk-conferentie is sinds 2017 niet meer gebeurd. Ik heb jarenlang geprobeerd het opnieuw op gang te krijgen, maar zonder succes. Het is een enorm gat in het IoT-conferentielandschap.**
