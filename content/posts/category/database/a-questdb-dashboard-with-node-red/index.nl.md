---
title: "Een QuestDB-dashboard met Node-Red"
Date: 2020-06-09
Author: davidgs
Category: database, Gadgetry, IoT
Tags: Dashboard, Database, IoT, Node-Red, QuestDB
Slug: a-questdb-dashboard-with-node-red
hero: images/Screen-Shot-2020-06-09-at-7.39.13-AM.png
---

Dit is echt een vervolg op mijn [post](/posts/category/database/iot-on-questdb/) van vorige week waar ik een Arduino met een temperatuur- en vochtigheidssensor op QuestDB heb aangesloten.

Het is één ding om gegevens naar uw database te sturen, maar het kunnen visualiseren van die gegevens is de volgende logische stap. Dus laten we er meteen op ingaan.

QuestDB is vrij nieuw en daarom hebben we onze Grafana Data Source Plugin nog niet voltooid, dus ik wilde een snel dashboard maken om de binnenkomende temperatuur / vochtigheidsgegevens te laten zien (en je zult zien hoe vreselijk de sensor echt is). Om dit te doen, koos ik voor Node-Red omdat het de voor de hand liggende keuze lijkt!

## De knooppunten bouwen:

![Schermafbeelding van NodeRed-proces](/posts/category/database/images/Screen-Shot-2020-06-09-at-7.38.57-AM.png)

Zoals je kunt zien, gebruikt het maar een paar knooppunten, dus ik zal ze een voor een doorlopen.

Het eerste knooppunt is een injectorknooppunt dat wordt geactiveerd met een regelmatig, configureerbaar interval. De mijne vuurt elke 10 seconden om te voorkomen dat hij te luidruchtig wordt. Het activeert het `SetQuery` -knooppunt dat de query opbouwt:

```js
  var q = {}
  q["query"] = "select temp_c, humidity, timestamp from iot where timestamp > (systimestamp() - 5000000)"
  msg.payload = q
  return msg;
```

Ik heb de payload ingesteld op een query, in dit geval krijg ik de temperatuur en de vochtigheid van de afgelopen 5 seconden (onthoud dat we te maken hebben met tijdstempels van microseconden, dus 5 seconden is 5M microseconden). Vervolgens stuur ik die vraag, als de payload, naar een http-verzoekknooppunt dat ik Query QuestDB heb genoemd. Ik heb de host ingesteld als mijn lokale machine, de URL naar het query-API-eindpunt, en ik voeg de inkomende msg.payload toe aan de URL.

![HTTP-parameters van Node Red bewerken](/posts/category/database/images/Screen-Shot-2020-06-09-at-7.51.26-AM.png "Screen Shot 2020-06-09 at 7.51.26 AM.png")

De query retourneert een JSON-tekenreeks, dus ik moet het door een JSON-knooppunt leiden om er een JSON-object van te maken. Vervolgens stuur ik het resultaat van die JSON-parsing naar 2 extra nodes, één voor temperatuur en één voor Vochtigheid. Na de JSON-parsing krijg ik een object terug met verschillende dingen die ik wil doorlopen.

![Screenshot van geretourneerd JSON-object](/posts/category/database/images/Screen-Shot-2020-06-09-at-7.57.42-AM.png)

Het eerste dat moet worden opgemerkt, is dat de payload een 'query'-veld bevat dat de query toont die ik heb uitgevoerd. Stoer! Vervolgens krijg ik een veld 'kolommen' dat een array is met een invoer voor elke kolom als gegevens die ik terugkrijg. Omdat ik vroeg naar `temp_c`,` vochtigheid` en `timestamp`, zou ik verwachten dat deze array 3 elementen bevat, en dat doet het inderdaad. Het vertelt me ook, in elk element, de naam en het type waarde dat het heeft geretourneerd, wat nuttige informatie is.

Ten slotte is er een 'dataset'-veld dat een reeks arrays bevat met mijn gegevens die ik heb aangevraagd. Omdat ik 5 seconden aan gegevens heb aangevraagd, en, als je je herinnert uit de [vorige post](/posts/category/database/iot-on-questdb/), ik gegevens eenmaal per seconde stuurde, krijg ik een array terug met 5 arrays erin, één voor elke seconde. Door deze arrays uit te breiden, zie ik dat ik 2 dubbels heb gekregen en een tijdstempel in elk die overeenkomt met wat het veld 'kolommen' me vertelde dat ik zou krijgen. Leuk! Het enige dat u hoeft te doen, is die gegevens naar enkele dashboardelementen te sturen. Nou bijna.

```js
  var f = {}
  f.topic = "Temperature ºC"
  f.payload = msg.payload.dataset[msg.payload.dataset.length-1][0]
  f.timestamp = msg.payload.dataset[msg.payload.dataset.length-1][2]
  return f
```

Voor het `Set Temp` -knooppunt trek ik het laatste element uit de dataset en pak ik de temperatuurwaarde en de tijdstempelwaarde. Ik stuur die vervolgens als payload naar de daadwerkelijke Dashboard-elementen. Ik doe precies hetzelfde voor de `Set Humidity` Node. Door de dashboardknooppunten naar binnen te slepen, stelt Node-Red automatisch een webdashboard in met deze elementen, en ik kan er naartoe gaan en mijn nieuwe dashboard bekijken:

![Screenshot van Node Red Dashboard](/posts/category/database/images/Screen-Shot-2020-06-09-at-7.39.13-AM.png)


Nu u de gegevens daadwerkelijk kunt visualiseren, kunt u zien hoe vreselijk de gegevens werkelijk zijn! Het is op dit moment absoluut niet 2,3 º C in mijn kantoor! Ik denk dat het mijn volgende taak is om een **echte** temperatuur- en vochtigheidssensor in te stellen om nauwkeurigere gegevens te verzenden! Gelukkig voor mij, ik heb er een paar rondslingeren, dus dat zal mijn volgende project moeten zijn, denk ik.

## We zijn hier klaar

Bezoek zoals altijd onze [GitHub](https://github.com/questdb/questdb) en geef ons een ster als je denkt dat dit nuttig was! Je kunt [volg mij] (https://twitter.com/intent/follow?screen_name=davidgsIoT) op twitter, maar volg ook [QuestDB] (https://twitter.com/intent/follow?screen_name=questdb)!
