---
title: "Swagger API-toegang met Camunda Platform"
Date: 2021-03-10
Author: davidgs
Category: Camunda, BPMN, DevRel
Slug: swagger-api-access-with-camunda-platform
hero: images/mimi-thian-VEKWzpQu-5M-unsplash-2.jpg
reading_time: 5 minutes
---

Heb je ooit de Camunda Platform Docker-instantie opgestart en zou je willen dat je live-oproepen naar de API kon doen via een [swagger-server](https://swagger.io)? We hebben! En zoals de meeste dingen die we zouden willen, gaan we erop uit om het te laten gebeuren.

## Binnenkort beschikbaar

Voor alle duidelijkheid: deze integratie komt met release 7.15 naar de officiële Camunda Platform Docker-container. Het is gewoon nog niet klaar. Dit is dus echt meer een tussenoplossing dan de alles-in-één-oplossing, maar het werkt, en het maakt het verzenden van API-oproepen naar een live exemplaar van Camunda Platform een*stuk* eenvoudiger. Dus volg mee en we zullen u laten zien hoe u het zelf kunt uitvoeren.

## CORS is je vriend, en niet je vriend

Over het algemeen, en op het gewone internet, beschermt Cross Origin Resource Sharing (CORS) u door geen bronnen uit willekeurige, niet-vertrouwde bronnen te laden. Dit is over het algemeen een goede zaak. Totdat het niet is.

Wanneer is het niet? Als u zoiets wilt doen als API-aanroepen van de ene host naar de andere wanneer de 2 hosts geen expliciete vertrouwensovereenkomst hebben. Zoals tussen 2 Docker-containers. Of tussen je laptop en een Docker-container.

Ja, u kunt naar binnen gaan en een header in de HTTP-server instellen zodat `Access-Control-Allow-Origin: *` het probleem zal oplossen (terwijl er tal van andere problemen ontstaan). Maar als je te maken hebt met een vooraf gebouwde Docker-container die een service via tomcat uitvoert, is het nooit zo eenvoudig.

## Hoe dit werkt

We besloten dat, gezien het bovenstaande CORS-probleem, de eenvoudigste manier om het hele ding aan te pakken, was om een nginx-proxyserver toe te voegen aan de bestaande Docker-container. Op die manier kunt u alles in één container laten draaien en hoeft u zich helemaal geen zorgen te maken over CORS.

We hebben geen wijzigingen aangebracht in de onderliggende Camunda Platform-instantie om dit te laten werken. Dat exemplaar is nog steeds toegankelijk via poort 8080 van de Docker-container.

Wat we deden, was de branie-server op poort 8081 binnen diezelfde Docker-container toevoegen.

En nu denk je "maar dat lost het CORS-probleem niet op!" en je hebt gelijk, dat is niet zo. Als je naar de swagger-instantie op poort 8081 gaat (als je die poort exporteert wanneer je de Docker-container start), krijg je de swagger-server en zie je de API's. Maar als u een van die API-aanroepen probeert uit te voeren, zult u snel de impact van CORS zien. Uw API-aanroepen zullen allemaal mislukken.

![Screenshot van de API-server op poort 8081](images/Screen%20Shot%202021-02-19%20at%2012.19.33%20PM.png)

Voer nginx in. Nginx is een zeer kleine, superlichte webserver die kan worden geconfigureerd om als proxy te fungeren. Ik heb het ingesteld om te luisteren op poort 8000 van de Docker-container en om te proxy-oproepen op basis van de URL. wijs je browser aan op http: // docker-container: 8000 / docs en nginx zal die oproep doorsturen naar poort 8081, waar de swagger-server zich bevindt. Verwijs uw browser naar http: // docker-container: 8000 / camunda en u wordt doorgestuurd naar de standaard Camunda Platform Task Manager, Cockpit, etc.

U moet de poort in de swagger-server wijzigen in poort 8000 vanaf poort 8080:

![Schermafbeelding met gebruik van poort 8000](images/Screen%20Shot%202021-02-19%20at%2012.21.08%20PM.png)

## API-oproepen doen

Waarom is dit allemaal nodig? Als je ooit API-aanroepen naar een live server hebt willen uitproberen en echte resultaten wilt krijgen, dan is branie je vriend.

Met Swagger kunt u live API-aanroepen doen tegen een actieve serverinstantie en echte resultaten terugkrijgen!

![screenshot van live API-aanroep](images/Screen%20Shot%202021-02-19%20at%2012.21.36%20PM.png)

Natuurlijk kun je wat code schrijven om elke API-aanroep te testen, maar als je je ontwikkeltijd wilt verkorten, is het gebruik van een live API-server zoals branie zeker de juiste keuze.

Als je precies wilt zien wat er wordt geretourneerd als een payload van een bepaalde API-aanroep, is swagger ook je vriend:

![Resultaten van een live API-aanroep](images/Screen%20Shot%202021-02-22%20at%2010.46.52%20AM.png)

Zoals u kunt zien, krijgt u het volledige `curl` -commando dat u zou kunnen gebruiken, de geretourneerde gegevens, die u vervolgens kunt gebruiken om ervoor te zorgen dat uw programma het geretourneerde bericht correct kan verwerken, evenals de volledige antwoordheaders.

## Hoe kun je dit krijgen?

Nogmaals, om te herhalen, dit is momenteel*geen* onderdeel van de officiële Camunda Platform Docker-afbeelding. Het komt met de release van 7.15, maar dat is het nu niet.

Dat gezegd hebbende, kunt u er nog steeds toegang toe krijgen en deze gebruiken.

Ten eerste moet je de juiste repository klonen die [hier] is (https://github.com/camunda-community-hub/docker-camunda-bpm-platform/tree/swagger). Dat is een kloon van de officiële Camunda Platform Docker-repository en een speciale 'swagger'-branch.

```
% git clone https://github.com/camunda-community-hub/docker-camunda-bpm-platform/tree/swagger
```
zou het voor je moeten doen.

Nu moet je dat in een goede Docker-image inbouwen. Dit kan enige tijd duren omdat alle componenten zijn gedownload.

```
% cd docker-camunda-bpm-platform
docker-camunda-bpm-platform % git status
On branch swagger
Your branch is up to date with 'camunda-community-hub/swagger'.

nothing to commit, working tree clean
% (base) davidgs@MacBook-Pro docker-camunda-bpm-platform % docker build . --rm -t camunda-bpm-plaform:swagger
Successfully built db270d32507f
Successfully tagged camunda-bpm-platform:swagger
%  docker-camunda-bpm-platform % Docker image list
REPOSITORY                     TAG       IMAGE ID       CREATED         SIZE
camunda-bpm-platform           swagger   db270d32507f   5 seconds ago   333MB
```
Dus het is nu gebouwd. Je hebt de afbeelding klaar om te gaan. Het enige dat overblijft is om het uit te voeren!

```
% docker run -p 8000:8000 db270d32507f
```

Het duurt ongeveer 30-45 seconden om alles op te starten, maar je kunt dan je browser naar [http: // localhost: 8000 / docs](http://localhost:8000/docs) voor de swagger-server sturen, of [ http: // localhost: 8000 / camunda](http://localhost:8000/camunda) voor het Camunda-platform.

U kunt Camunda Modeler gebruiken om modellen te implementeren en uit te voeren door de implementatiepoort te wijzigen van '8080' in '80000'

![Camunda Modeler-implementatie](images/Screen%20Shot%202021-02-22%20at%2011.23.19%20AM.png)

En je bent helemaal klaar!
