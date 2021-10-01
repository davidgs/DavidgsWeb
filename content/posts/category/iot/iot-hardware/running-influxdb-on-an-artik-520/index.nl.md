---
title: "Running InfluxDB op ARTIK-520"
Date: 2017-07-14
Author: davidgs
Category: Evangelism, IoT
Tags: Database, IoT
Slug: running-influxdb-on-an-artik-520
hero: images/open-data-1_0.png
reading_time: 9 minutes
---


Laten we eerlijk zijn, het Internet of Things gaat over data. I [gezegd] (/ berichten / category / iot / u--achterom gezien-big data-nog /) op slechts een paar weken geleden. Het gaat over het verzamelen van gegevens. **Veel** van de gegevens. Maar het is eigenlijk over veel meer dan alleen het verzamelen van gegevens. Gewoon het verzamelen van gegevens niet krijg je echt overal als alles wat je doet is het verzamelen. Om nuttig te zijn, ivd data moet relevant, accuraat en beroep kan worden ingesteld. Dat laatste is de sleutel, echt waar. Bruikbare gegevens. Om uw gegevens actiegericht te maken, je moet in staat zijn om het bij voorkeur te analyseren, in real time. Nu is je data problemen groeien. Je hebt een letterlijke tsunami van tijdreeksgegevens gieten in kreeg en je uitgaven al uw middelen gewoon inname van het. Nu ga ik je vertellen dat je nodig hebt om ook te analyseren, en acties op basis van die analyse * in real-time * nemen ?! Eruit.

Schiet niet op de boodschapper. Jij bent degene die wilde een ivd oplossing voor het toezicht op alle 10.000 van uw whosiwhatsits, niet me in te zetten. Maar ik ga u vertellen hoe het op te lossen.

## Niet de ARTIK-520 Again!

Ja, de ARTIK-520 weer. Ik had een Linux-server hier in het kantoor die waarschijnlijk een leuke plek om dit te doen zou zijn geweest, maar het is nu weg naar zijn huis (ik was alleen het bevorderen van het en waardoor het nuttig alvorens deze te verzenden uit om een lang en productief leven te leiden als een Active Directory Server. vraag niet. We zullen nooit spreken van het weer). Ik kon een Raspberry Pi, of zelfs de [Raspberry Pi Zero W] (/ berichten / category / iot / iot-hardware / toegang-your-framboos-pi-zero-w /) die ik heb hier zitten. Zoals u weet, heb ik een [overvloed] (/ berichten / category / iot / de bijgewerkte-big-board-of-iot /) van het ivd apparaten uit te kiezen. Ik wilde iets met een beetje meer pk's dan een standaard ivd*apparaat* en ik gewoon niet het gevoel dat gepruts met de Pis. Dus zit je vast gehoord over de 520 weer.

## instellen voor Data Inslikken en analyse

Wacht, we gaan data inname en analyses te doen op een ARTIK-520? Moeten we niet met behulp van een server? Zie hierboven. Plus, zou het niet iets interessant om sommige gegevens inname en analyse op de hub te doen, voordat de gegevens over wordt verzonden naar de backend? Kan zijn. Dus dat is wat we gaan doen.

Zoals de titel van dit bericht al doet vermoeden, gaan we InfluxDB gebruik van [Influx Data](https://www.influxdata.com/). Het is open source en gratis als je wilt om het uit te proberen. Voel je vrij om mee te volgen. Waarom InfluxDB? Nou, ik wilde het uit te proberen, en het beweert de snelst groeiende Time Series databank rond, plus ik hoorde was het vrij makkelijk om de slag te gaan, dus ik dacht dat ik zou het gaan geven.

Ten eerste, ik zal zeggen dat het krijgen van het allemaal up and running was absoluut doodsimpel. Net als je VP Marketing kan doen (** Binnen Joke Alert:. ** Terug in mijn Zon dagen, het opbouwen van demo's die te installeren en uitvoerbaar door mijn Marketing VP was altijd mijn metrische waren Hij vond het geweldig omdat hij ze kon lopen!) Ik gedownload alle componenten en begon ze op. Er zijn een heleboel bewegende delen hier, dus je moet ervoor zorgen om ze allemaal te krijgen. Er is **InfluxDB**, die (uiteraard) de database gedeelte. Sorteren van de sleutel tot de hele zaak. Er is ook **Telegraf**, dat is een data-inname engine. Dan is er **Chronograf**, dat is echt een handige visualisatie en analyse tool. Tot slot is er **Kapacitor**, die de hele "Actie" onderdeel voor u afhandelt.

Ik was in staat om te downloaden en alle onderdelen te installeren in ongeveer 5 minuten - misschien minder - en krijg de hele zaak up and running. Ik heb zelfs bouwde mijn eerste dashboard om de CPU en het geheugen gebruik van de ARTIK-520 te bewaken in ongeveer een minuut en een half.

![Influx Dashboard Afbeelding](/posts/category/database/images/Safari031.jpg)

Die eigenlijk ziet er echt goed. Vooral het geheugengebruik grafiek. Dus ik zal waarschijnlijk niet het geheugen met deze overweldigen - en laten we in gedachten houden dat ik ben nog steeds het uitvoeren van dit ARTIK-520 als een [OpenHAB server] (/ berichten / category / iot / iot-hardware / openhab-server- artik-520 /) het regelen van mijn huis.

Maar ik wil echt om dit te gebruiken voor het controleren van een aantal feitelijke sensor data, niet alleen de machine zelf. Het is gewoon zo gebeurt het dat ik een sensor project hier op mijn bureau, en het is actief aan het verzamelen van gegevens en afmelden het. Logging het elders, maar dat is aan het veranderen.

## Logging Live Data

De sensor Ik heb al ingesteld up and running is een one schreef ik over [onlangs] (/ berichten / category / iot / spelen-met-afstand /). Het is verslaafd aan een [Particle.io](/posts/category/iot/playing-with-distance/) Photon en meten van de hoeveelheid 'stuff' in een doos vrijwel continu (1 lezing per seconde). Ik heb een gegevensbestand voor deze - 'iotdata' ben ik niet origineel? - en getest posten om het vanaf de opdrachtregel volgens de (uitstekend) [documenten](http://particle.io/). Alles leek te gaan zoals gepland. Nu krijgen live data streaming in!

Eerst moest ik een gat in mijn firewall porren om te kunnen mijn ARTIK-520 box te krijgen van de buitenwereld. Het lijkt gek dat het deeltje is aan de ene kant van mijn bureau en de ARTIK-520 is aan de andere kant en mijn gegevens heeft om een reis rond de planeet om er te komen, maar dat is hoe de wereld werkt soms.

Deeltje 'Webhooks' die je kunt instellen posten naar andere diensten. Ze hebben een aantal-vooraf gedefinieerde waarschuwingssignalen voor Google Apps, etc. maar geen voor InfluxDB. Ze moeten dat op te lossen, maar dat is een andere post. Ik heb geprobeerd om mijn eigen webhook definiëren, maar hun web haken aandringen op posting alles zoals

```js
content-type: application/x-www-form-urlencoded
```

En dat is niet wat wordt verwacht, en het blijkt niet te werken. Niet te worden afgeschrikt, slaagde ik erin om te komen met een andere oplossing. De Particle apparaat zal de gegevens rechtstreeks posten naar InlfuxDB. Wie heeft er een tussenpersoon! Het duurt iets meer code, maar het is niet slecht. Hier is wat ik moest toevoegen aan mijn Particle code:

```cpp
#include <HttpClient.h>
...
HttpClient http;
http_header_t headers[] = {
  { "Accept" , "*/*"},
  { "User-agent", "Particle HttpClient"},
  { NULL, NULL } // NOTE: Always terminate headers will NULL
};
http_request_t request;
http_response_t response;
...
void loop(){
...
  request.body = String::format("volume_reading value=%d", getRangeReading());
  http.post(request, response, headers);
...
} 
```

Dat is alles wat nodig was! U zult merken dat ik niet met behulp van een beveiliging op deze setup. ** Ik denk niet aanraden om het op deze manier **. Op zijn minst moet je met behulp van een gebruikersnaam en / of wachtwoord voor authenticatie met de database, en moet je waarschijnlijk ook dat het gebruik van SSL. Maar ik heb geen SSL cert voor mijn ARTIK-520, en dit was gewoon een oefening van mijn kant en niet een echte implementatie. Plus ik prikte niet-standaard gaten in mijn firewall, en niet echt dat iemand gaat komen kloppen (en als ze dat doen, zal ik het direct zien en kan ze buitengesloten, dus niet alle ideeën te krijgen).

En hier is wat mijn dashboard ziet er nu als volgt uit:

![Grotere Influx Dashboard](/posts/category/database/images/Safari033.jpg )

Een mooie ** real time ** grafiek van de inkomende gegevens van mijn sensor. Snel en eenvoudig in te stellen!

## Make It Actionable

Tot nu toe hebben we opgezet Telegraf voor data-inname, InfluxDB, de eigenlijke database, en Chronograf die ons de koele dashboards van real-time data geeft van onze sensor (s). Maar nogmaals, data is allemaal leuk en leuk, maar het is het waardoor het*bruikbare* dat is de sleutel. En dat is waar Kapacitor komt. Dus ik ga op te zetten dat de volgende zodat ik waarschuwingen en meldingen kunt krijgen als het volume van de 'stuff' in mijn vak te hoog of te laag wordt.

Kapacitor, helaas, niet beschikt over een gladde UI front-end die zich gemakkelijk leent voor het zien van de resultaten in een visueel bevredigende manier. Maar het is niet minder krachtig. Je hoeft alleen je 'acties' in TICKScript schrijven en vervolgens te implementeren hen. Dus duik in de documentatie en krijgen nu al te gaan!

De syntaxis voor TICK Scripts is een beetje onhandig, dus echt zorg ervoor dat je hebt gelezen de documentatie op deze. Ernstig. Ik was in staat, in ongeveer 10 minuten, tot 2 TIK Scripts schrijven aan alert wanneer het volume meting kreeg onder de 50 (die vrij is verdraaid vol!) Of toen het boven 210 (die in wezen te ledigen). Voor nu, zijn deze signaleringen gewoon ingelogd zijn om een bestand, maar ik kan net zo goed draaide ze rond als een post aan mijn server naar een browser waarschuwing of iets anders doen.

Ik zou graag een mooie front-end op Kapacitor dat maakt het schrijven en implementeren van TICK Scripts snel en eenvoudig te zien, en die het mogelijk maakt u doen om waarschuwingen en dingen op je Chronograf Dashboards, maar voor nu ben ik best blij met alleen het verzenden van waarschuwingen off naar andere dingen.

Als ik wilde, kon ik die waarschuwingen verzenden **terug** aan mijn Photon - via een POST naar de Particle Cloud API - om de Photon nemen een actie van zijn eigen ook. Misschien als ik de doos had een pneumatische 'pusher' dat zou duwen alles uit zou ik dat ook te doen.

## Jouw beurt

Hopelijk ik heb gekregen u ver genoeg op de weg dat je je eigen InfluxDB based project kan beginnen voor uw ivd data. Als je dat doet, zou ik graag over horen!
