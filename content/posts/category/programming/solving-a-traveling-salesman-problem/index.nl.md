---
title: "Het oplossen van een Traveling Salesman Problem"
Date: 2016-06-16
Author: davidgs
Category: General, Misc, Work
Slug: solving-a-traveling-salesman-problem
hero: images/Safari039.jpg
reading_time: 11 minutes
---

Het is geen internet van de dingen, maar toch ... Hier is de achtergrond aan dit project, en waarom ik het op zich.

In de afgelopen 3 jaar of zo mijn vrouw en heb ik vrijwilligerswerk met de blinde in onze gemeenschap. Elke maand onze kerk organiseert een diner voor blinden in de omgeving en we rijden rond en ophalen deelnemers, breng ze naar de kerk waar we serveren iedereen diner en de drive ze allemaal naar huis. Het is erg leuk, en iets wat wij, als de mensen die we rijden, veel plezier. Het geeft hen een kans om samen te komen met vrienden en delen een maaltijd, wat muziek en een geweldige avond.

Logistiek, hoewel, het is een beetje een nachtmerrie. Elke maand is er een oproep voor vrijwilligers om te rijden, het vergaren van de lijst van mensen die willen komen, en dan is de zware taak van het uitzoeken routes voor iedereen die minimaliseert reistijd en maximaliseert de efficiency. Voor de eerste jaren was dit proces tamelijk ondoorzichtig. Elke maand zouden we als vrijwilliger om te rijden, en dan een week voor het evenement zouden we een e-mail met wie we zouden ophalen en hun adressen, etc. te krijgen achter de schermen, maar een vrijwilliger was urenlang in kaart brengen van de routes en het toewijzen passagiers om bestuurders in wat werd gehoopt zou een efficiënte wijze kan worden. Het was niet altijd.

Dit is precies het soort van het probleem computers werden ontworpen op te lossen! Dus ik vrijwilliger om het op te lossen eens en voor altijd. Ok, dus computers kan het probleem niet oplossen, maar een goed ontworpen computerprogramma kon. Ik had net te schrijven.

De fundamentele parameters zijn:

- Ongeveer 30 vrijwilligers drivers, elk met hun eigen 'beperkingen' van hoe ver ze bereid zijn om te rijden, hoeveel passagiers die zij kunnen nemen, enz.
- Ongeveer 75 deelnemers. Sommige met honden, sommigen in rolstoelen, sommige met een lichamelijke handicap van verschillende soorten, enz.
- De chauffeurs en deelnemers veranderen elke maand - er zijn vaste klanten, net als wij, maar niet iedereen kan komen / rijden elke maand

## Het bouwen van een Solution

Het is duidelijk dat [Google Maps](http://maps.google.com/) was van plan om een deel van de oplossing zijn. Ook zou een backend database van een soort nodig zijn om de informatie over de stuurprogramma's en deelnemers te slaan, zodat we zouden niet opnieuw in te voeren het elke maand. Ik had net een consulting project voor [StrongLoop](https://strongloop.com) de toepassing van hun API creatie en het beheren van de ivd, en het leek een perfecte oplossing voor dit probleem. Hier waren het einde eisen die ik voor mezelf:

- Web gebaseerde applicatie die zou draaien in elke browser
- Een back-datastore voor bestuurder en deelnemersgegevens
- Eenvoudig en intuïtief te gebruiken, aangezien niet iedereen is technologie-savvy
- Automatiseer zoveel mogelijk van het proces mogelijk
- Optimaliseren van de routes voor de chauffeurs
- Zorg voor de bestuurders met een Google Map met hun optimale route en turn-by-turn aanwijzingen

Leek eenvoudig genoeg. Ik al wist hoe ze dingen Geef de locatie op een Google Map via de [Google Maps API.](https://www.google.com/work/mapsearth/products/mapsapi.html) had ik (nieuw verworven) kennis van het gebruik van JavaScript en [Node.js](https://nodejs.org/en/) en [loopback] (https://www.google.com/url?sa=t&amp;rct=j&amp;q=&amp;esrc=s&amp;source=web&amp;cd=1&amp;cad=rja&amp;uact = 8 &amp; ved = 0ahUKEwiJrcHf_azNAhVGKiYKHbONBioQFggcMAA &amp; url = https% 3A% 2F% 2Floopback.io% 2F &amp; USG = AFQjCNHtpfzxltGflU6-IJMVn0fp4eVBKA &amp; sig2 = o_NtCq7mb2Uf4RyYMpys7w &amp; bvm = bv.124272578, d.eWE) en [MongoDB] (https://www.mongodb.com/lp/download/ ) - en ze te verbinden alles bij elkaar - om de gegevens en de API's te beheren. Maar hoe om daadwerkelijk te bouwen? Ik bedoel, hoe de gegevens en de interface op een eenvoudige gebruikersinterface dat iedereen kan achterhalen presenteren.

Hier is waar ik belandde. Hierna zal ik in het kort te gaan door hoe ik het deed. Ook ik zal lopen door de work-flow een beetje. We beginnen hier, met een blanco pagina, een Google Map, en een aantal lege tafels.

## De resultaten

![Screenshot van de eerste pagina met een ingesloten Google-kaart](/posts/category/programming/images/Safari034.jpg)

U kunt klikken op “Add Driver” en voeg een nieuwe bestuurder aan de database. Je krijgt dezelfde vorm als u klikt op “Add genodigde”. Alle bestuurders en deelnemers worden volhardde in een MongoDB database.

![Screenshot van een "add driver" dialoogvenster](/posts/category/programming/images/Safari035.jpg)

Er is een drop-down lijst van alle stuurprogramma's in de database, dus je hoeft alleen aan degenen die het besturen van deze maand te selecteren:

![Screen shot waarin de keuzelijst van de bestuurders](/posts/category/programming/images/Safari036.png)

Zodra u een Driver selecteert, belanden ze in de Drivers tabel, met hun eigen 'mini-map'. Een Blue Pin wordt ook toegevoegd aan de belangrijkste kaart. Naarmate u meer stuurprogramma's toevoegen, zul je meer en meer Blauw see voor bestuurders op de belangrijkste kaart.

![Screen shot waarin de eerste coureur toegevoegd aan de lijst](/posts/category/programming/images/Safari037.jpg)

Vervolgens Deelnemers uit de lijst Genodigden dropdown te selecteren.

![Screenshot van de 'deelnemers' keuzelijst](/posts/category/programming/images/Safari038.jpg)

Als u personen toevoegen ze worden toegevoegd aan de aanwezigen Table, en een rode speld wordt toegevoegd aan de Main Map. Als je meer en meer deelnemers te selecteren, zul je meer en meer Red Pins aan de Main Map te zien.

![Screen shot waarin de deelnemer pin gegaan en ze toegevoegd aan de lijst](/posts/category/programming/images/Safari039.jpg)

Wanneer u klikt op de pin van een deelnemer, krijg je een pop-up met hun gegevens (naam, adres, telefoonnummer) en een andere pull-down lijst die alle drivers beschikbaar bevat. Selecteer gewoon een driver voor die Attendee. U kunt een potentieel probleem hier opmerken. Wat als ik meer drivers toe te voegen aan de kaart later? Zullen ze worden weergegeven in de pull-downs van de aanwezigen? Natuurlijk zullen ze! Ik heb gewoon een JavaScript-onMouseDown () handler toegevoegd aan het \<select\> voor de lijst van de bestuurder, en daar loop ik de Table of Drivers om voort te bouwen op de Select List:

```js
for (var i = 1, row; row = dTable.rows[i]; i++) {
  //iterate through rows
  //rows would be accessed using the "row" variable assigned in the for loop
  for (var j = 0, col; col = row.cells[j]; j++) {
    if(j == 0){
      id = col.childNodes[0].value;
    }
    if(j == 1){
      selContent += "<option value='" + id + ":" + popup.split('-').pop() + "'>" + col.innerHTML + "</option>";
      sel.innerHTML = selContent;
    }
  }
}
```

Het is een beetje ingewikkelder dan je zou denken nodig is omdat ik verwijzing alles door de id van het MongoDB-database, zodat ik het kan opzoeken later makkelijker. Ik denk niet bijhouden van het adres van de Driver's, telefoonnummer, etc. van de tafels, omdat een lookup door id is **zeer** snel, dus zolang ik heb het id handig, ik kan geen andere informatie snel.

![Tooltip wanneer u de muisaanwijzer over een pin op de kaart](/posts/category/programming/images/Safari040.jpg)

Zodra u een Driver toewijst aan een genodigde, wordt hun Red Pin verplaatst van de Grote Kaart van de Driver's mini-map die je kunt zien / verbergen van de werkelijke rijroute. Ja, het is klein en moeilijk om de exacte route te zien. Ook wordt de toegang van de deelnemer in de genodigde tafel groene draaide zich om en een driver naam wordt ingevuld voor hen. Dit is zo dat het gemakkelijk is om te vertellen wanneer iedereen heeft een chauffeur en je bent klaar) Nooit meer rode pennen op de kaart, en alle Deelnemers zijn groen.

![Shwoing de bovenbeschreven veranderingen](/posts/category/programming/images/Safari041.jpg)

## Dus wat er ontbreekt?

Nou, zie je de knop 'Verzenden', die, in een ideale wereld zouden alle informatie te verzamelen over elke deelnemer en stuur een e-mail naar de bestuurder met al die informatie, enz. Maar dit is niet een ideale wereld, en het gebruik van JavaScript in een browser, kun je niet echt alles doen wat. In plaats daarvan krijg je een pop-up venster met een mooi opgemaakte e-mailbericht, compleet met de lijst van de deelnemers en al hun informatie en een link naar een Google Map met turn-by-turn aanwijzingen. Het enige wat je hoeft te doen het te kopiëren de gehele tekst, vlakbij het dialoogvenster, klikt u op e-mail link van de bestuurder, plakken in de tekst en verzenden. Ik wou dat er een betere manier, maar a) ik wil niet aan een server-side code doen om de e-mail en b te sturen) is het niet mogelijk om te sturen een volledig opgemaakte (HTML of RTF) via een koppeling 'mailto' , dus ik ben vast met dit.

Dus hoe wordt dit uitgevoerd? Het is allemaal in JavaScript! Ik gebruikte StrongLoop, zoals ik al zei, de Node.js / Loopback kader dat gaf me de rest API's die ik nodig had in de MongoDB backend te bouwen, plus de Node.js server om het allemaal serveren. Dat deel is ongelooflijk krachtig, eigenlijk. Als je probeert te REST API's op uw database heb ik beveel het geven van StrongLoop een werveling. Vooral de ARC, waar u een browser kunt gebruiken om uw data modellen te ontwerpen, enz. Zoals ik al eerder zei, ik echt alleen houden de database-id in de browser. Dus alles - en ik bedoel alles - wordt verwezen door die ID. Hoe werkt dat? Nou, laten we het voorbeeld nemen van het toevoegen van een deelnemer naar de lijst van de passagiers van een bestuurder. Ik heb een functie die wordt aangeroepen wanneer u een bestuurder van de drop-down lijst te selecteren (herinner hebben we gesproken over het bouwen van die lijst on the fly eerder). Zodra een driver is geselecteerd, moeten we dat Attendee toe te voegen aan de lijst van die Driver. Dus een driver selecteren roept de functie driverSelected () met een tupel van ID van de bestuurder en van de deelnemer ID. Hier is hoe dat werkt:

```js
  // everything is referenced by ID!
  var selRow = document.getElementById(ids[1]);
  selRow.style.background=routed; // set Attendees background green
  var driverCell = document.getElementById(ids[1]).cells[3];
  var url = dbServerURL + "Attendees/" + ids[1];
  jQuery.getJSON(url, function(data) { // look up the Attendee's info in the DB
  var tbl = document.getElementById("pList-" + ids[0] + "-Table");
  var row = tbl.insertRow(-1);
  row.id = data.id; // everything referenced by ID
  var cell = row.insertCell(0);
  cell.innerHTML = "• " + data.Name;
  driverCell.innerHTML = driverName;
  cell = row.insertCell(1);
  cell.innerHTML = "<button id="" + data.id + "" onclick="clearCell(this.id, this.value)" value="" + ids[0] + "" name="Remove">Remove</button>"
  for(var x = 0; x < driverList.length; x++){
    if(driverList[x].id == ids[0]){
      addToMap(data.id, "Attendees", driverList[x].map); // add the the Driver's map
      break;
    }
  }
});
```

Zoals je kunt zien, ik echt **doen** gebruik de ID voor alles. Ik steek elementen in de DOM met de ID. Elke bestuurder krijgt een tafel, en in die tabel is een tabel van de aanwezigen voor dat de bestuurder, en het is de naam plist-ID-tabel dus het is gemakkelijk te vinden. En veranderen. Ik heb een lijst van de kaarten voor iedere bestuurder, opnieuw verwezen door de Driver's ID, zodat ik pinnen kan toevoegen aan het (of pinnen uit te halen). De gehele applicatie is ongeveer 1.000 regels JavaScript in de browser om goed te halen en weer te geven en alle gegevens van de backend manipuleren. Maar dankzij loopback, kon ik heel snel queries te maken aan de database en terug te krijgen gemakkelijk te manipuleren JSON-objecten te werken. Om deze toepassing te gemakkelijk te maken om te verhuizen van server naar server, ik gewoon een initialisatie variabele toegevoegd in de browser code om de server in te stellen:

```js
var dbServerURL= "http://" + location.host + "/api/";
```

Opzoeken genodigde data, ik heb net toevoegquery de aanwezigen databank naam tot het einde, en op te zoeken Drivers data, voeg ik de naam Drivers database naar het einde. Om het opzoeken van een specifieke driver, voeg ik enkel de bestuurder ID aan het eind van dat.

```js
var url = dbServerURL + "Drivers/" + id
jQuery.getJSON(url, function(data){ ... }
```

En ik krijg weer een mooi JSON object met alle informatie van de Driver's erin. Extraheren van informatie uit JSON is dood-eenvoudig, natuurlijk, het gebruik van iets in de trant van:

```js
var id = data.id;
var driverName = data.Name;
```

enz. Het is echt zo simpel.

Het blijkt dat hosting Node.js apps is moeilijker dan men zou denken. Ik probeerde voor dagen om het te krijgen die op OpenShift, maar tevergeefs. De documentatie van StrongLoop over hoe dat te doen, is zowel oude als onvolledig en ik tot dusver heb niet bedacht hoe het te laten werken. De documenten van OpenShift gewoon niet werken. Wat ik eindelijk gevonden was een eenvoudige, gratis manier om dit te implementeren op AWS. Vrij ongecompliceerd, en als ik tijd, ik kan schrijven van hoe dat te doen ook.

Ik heb de basisinstructies en adres naar de coördinator die de routing behandelt gestuurd en ze heeft nu met succes de routing voor een paar diners gedaan. Haar reactie was voor mij "dat is zeker een **lot** gemakkelijker en sneller dan de manier waarop ik gebruikt om het te doen!" Het geheel is verpakt in bootstrap code, dus in theorie het moet ook bruikbaar vanaf een mobiel apparaat, maar in mijn tests op een iPhone, heeft het de neiging zo goed niet te maken met de kaarten, waardoor het niet erg nuttig.
