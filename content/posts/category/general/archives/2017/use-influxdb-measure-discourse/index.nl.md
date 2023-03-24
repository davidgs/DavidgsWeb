---
Title: "Measuring and Monitoring Community Engagement on Discourse with InfluxDB"
Date: 2022-11-03
Category: general
Slug: use-influxdb-measure-discourse
hero: images/SafariScreenSnapz005.png
reading_time: 6 minutes
---

> Dit bericht is oorspronkelijk gepubliceerd op [Blog van InfluxData](https://www.influxdata.com/blog/use-influxdb-measure-community/)

## Toezicht houden op discours

Wij hier bij InfluxData gebruiken Discourse voor onze Community (je bent lid van onze Community, toch? Nee? Nou, schrijf je in!!) Een deel van mijn werk hier bij InfluxData is om de community in de gaten te houden, vragen te beantwoorden, en werk om de gemeenschap te laten groeien. En een deel daarvan zijn natuurlijk statistieken. Het komt altijd neer op wat je kunt meten, nietwaar? Dus mijn uitdaging was om een manier te vinden om de gemeenschap te meten.

Er is natuurlijk een beheerinterface die het aantal nieuwe gebruikers, het aantal aangemaakte posts, enz. over de afgelopen dag, week en maand laat zien, dus de statistieken zijn er. Maar het idee om daar elke dag heen te gaan en die cijfers te noteren was niet bepaald aantrekkelijk.

Discourse biedt wat rudimentaire monitoring, maar de kracht zit echt in het gebruik van hun API's om de gegevens op een geheel nieuwe manier te bekijken. Het automatiseren van dergelijke taken is tenslotte waar computers voor zijn uitgevonden, toch? Dus ik zal je laten zien hoe ik al die managementstatistieken uit Discourse heb gehaald en vervolgens (natuurlijk) in InfluxDB heb ingevoegd, zodat ik ze altijd binnen handbereik had en klaar was om te laten zien.

## De statistieken ophalen

De eerste uitdaging was het vinden van een manier om alle statistieken te krijgen waarnaar ik op zoek was. Het eerste dat ik deed, was natuurlijk regelrecht naar de Discourse API Docs gaan in de hoop dat er een simpele API-aanroep zou zijn die me zou brengen wat ik wilde. Of misschien, in het ergste geval, een reeks API-aanroepen om de individuele statistieken te krijgen die ik wilde. Helaas, dingen zijn nooit zo eenvoudig, toch? Er zijn een aantal echt handige API's om veel dingen te doen, maar het verkrijgen van gebruikers- en activiteitsstatistieken hoort daar niet bij. Tijd om het te reverse-engineeren.

Het is vrij eenvoudig om een heleboel informatie te krijgen via de hulpprogramma's voor ontwikkelaars van Google Chrome. Vervolgens heb ik de beheerdersinterface in Discourse geladen om te zien wat er gebeurde:

![Google DevTools](images/dashboard-Getting-the-Stats.jpg)

Zoals je kunt zien, vond ik een 'dashboard.json' die werd geladen, dus ik ging daar rondneuzen en Bingo! Schat aan gegevens! In feite bevat het alle gegevens die het Beheerdashboard heeft. Ik was bijna thuis! Bijna. Dat levert me een JSON-object van 3200 regels op waar ik doorheen moet waden om te vinden wat ik nodig heb. Een deel van de gegevens is via andere wegen beschikbaar. De http_2xx_reqs-statistieken zijn bijvoorbeeld beschikbaar in de nginx-logboeken, maar zaken als het aantal onderwerpen waarop dagelijks niet wordt gereageerd, zijn dat niet. En dat zijn de dingen waar ik echt in geïnteresseerd ben. Dus ik ben terug bij het ontleden van JSON-objecten en het invoegen van de resultaten in InfluxDB. En jij dacht dat ik een glamoureus leven had!

## De code schrijven

Ik doe dit deze keer echter niet in Node-red. Ik besloot, aangezien ik een aantal andere Node.js-processen verschillende dingen op mijn server had laten doen, dat ik er gewoon nog een zou toevoegen. Node.js is redelijk goed in http get en het ontleden van JSON, dus het lijkt een goed idee. Het eerste dat u nodig heeft, is een API-sleutel voor uw Discourse-installatie, dus ga naar de Discourse API Docs en koop er een voor uw Discourse-installatie. Definieer vervolgens uw URL (die natuurlijk anders zal zijn dan de mijne omdat u uw eigen Discourse-configuratie hebt en geen beheerderstoegang tot de mijne).

```javascript
const url = "https://community.influxdata.com/admin/dashboard.json?api_username=foo&api_key=bar";
```

Nogmaals, kijkend naar het JSON-bestand, heb ik een aantal 'globale rapporten' gekozen waarin ik geïnteresseerd was:

```json
{
  "global_reports": [
    { "type": "visits",
      "title": "User Visits",
      "xaxis": "Day",
      "yaxis": "Number of visits",
      "data": [
        { "x": "2017-09-26",
          "y": 68         },
          ...
      ],
      "total": 8404,
      "start_date": "2017-09-26T00:00:00.000Z",
      "end_date": "2017-10-26T23:59:59.999Z",
      "category_id": null,
      "group_id": null,
      "prev30Days": 1077
    },
    ...
```

Nog beter! Ik kan de totalen en de totalen van de afgelopen 30 dagen krijgen! Dus nu ik de URL heb en weet wat de JSON-structuur is, kan ik hem gaan halen en ontleden:

```javascript
  https.get(url, res => {
    res.setEncoding("utf8");
    let body = "";
    res.on("data", data => {
      body += data;    });
    res.on("end", () => {
      console.log("Influx setup");
      body = JSON.parse(body);
      var reports = body.global_reports;
      for (var x = 0; x < reports.length; x++) {
        const ty = reports[x].type;
        for (var y = 0; y < reports[x].data.length; y++) {
          var buffer = "stats,report=".concat(reports[x].type);
          buffer = buffer.concat(" ");
          buffer = buffer.concat("value=");
          buffer = buffer.concat(reports[x].data[y].y).concat(" ");
          buffer = buffer.concat(new Date(reports[x].data[y].x).getTime());
          writeData(buffer);
        }
        var buffer = "stats,cumulative=".concat(reports[x].type);
        buffer = buffer.concat(" ");
        buffer = buffer.concat("total=").concat(reports[x].total).concat(",");
        buffer = buffer.concat("prev30Days=").concat(reports[x].prev30Days).concat(" ");
        buffer = buffer.concat(new Date(reports[x].end_date).getTime());
        writeData(buffer);
      }
    });
  });
```

En dat levert me alle individuele datapunten op waar ik naar op zoek ben, en dan alle cumulatieve datapunten - onthoud, het totaal en de totalen van de vorige 30 dagen - die ik wil. En ik schrijf die gegevens gewoon naar mijn InfluxDB-instantie:

```javascript
function writeData(buffer){
  var post_options = {
    host: 'my_instance.influxcloud.net',
    path: '/write?db=discourse&precision=ms&u=my_username&p=myPassword',
    method: 'POST',
    headers: {
      'Content-Length': Buffer.byteLength(buffer)
    }
  };
  req = https.request(post_options, function(result) {
    if(result.statusCode > 205){
      console.log('Status: ' + result.statusCode);
      console.log('Headers: ' + JSON.stringify(result.headers));
    }
    result.setEncoding('utf8');
    result.on('data', function(body) {
      console.log('Body: ' + body);
    });
  });
  req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
  });
  req.write(buffer);
  req.end();
}
```

Het is niet nodig om het resultaat duidelijk in de console te loggen, maar ik vind het leuk om te zien wat er aan de hand is. En dat is alle code die ik heb geschreven!

## De resultaten zien

Natuurlijk zou geen InfluxDB-project compleet zijn zonder een dashboard te bouwen, zodat ik de resultaten kan visualiseren - en zodat het management in één oogopslag de gezondheid en activiteit van de gemeenschap kan zien.

![Google DevTools](images/SafariScreenSnapz005.png)

Echt cool om te zien dat we nu nul onderwerpen hebben waarop geen reactie komt! Het beste deel van dit hele ding is dat het een heleboel statistieken heeft geautomatiseerd die ik vroeger met de hand moest doen, waardoor ik meer tijd heb om andere coole dingen te doen!

## Wat is het volgende?

Nou, ik denk niet dat er iets aan de hand is met dit project, maar ik heb vorige week op EclipseCon Europe doorgebracht en ik zal een aantal echt coole dingen schrijven die daar zijn gebeurd, dus houd het in de gaten! En vergeet niet dat als je een idee hebt voor een project dat ik moet aanpakken of vragen hebt, laat het me weten!
