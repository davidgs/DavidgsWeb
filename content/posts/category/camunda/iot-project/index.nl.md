---
title: "IoTProject"
date: 2021-04-16T11:46:12-04:00
Author: davidgs
Category: Camunda, IoT
Slug: iot-project
hero: images/growhouse.jpg
---

# Een proof of concept voor Camunda Platform BPMN met IoT

## Samenvatting
Ik wil [Camunda](https://camunda.com?ref=davidgsiot) onder de aandacht van de IoT-gemeenschap brengen door een groter IoT/Camunda Proof of Concept-project te voltooien. Dit zou een IoT-build met zich meebrengen, met behulp van het Camunda-platform, documentatie, een blogpost en promotie naar de bredere IoT-gemeenschap.

## Waarom dit project nastreven
In veel van mijn eerste discussies toen ik bij het bedrijf kwam, werd IoT vrij vaak genoemd als een belangrijke, maar nog niet aangeboorde markt voor Camunda Platform. Om Camunda 'opgemerkt' te krijgen in deze markt, die enorm is, moeten we dingen gaan doen die de gemeenschap mogelijk zou opmerken, en dan de engagementen van die dingen volgen.

Dit kan ons belangrijke inzichten geven in de vraag of de IoT-markt al dan niet geïnteresseerd is in het gebruik van BPMN om taken te orkestreren op basis van IoT-gegevens, en kan ook een introductie zijn van Camunda in de IoT-gemeenschap.

Het raakt veel belangrijke aspecten van wat we doen, waaronder feedback van de gemeenschap / klanten, het vergroten van het bewustzijn en de betrokkenheid.
Over het algemeen verdubbelt de algehele IoT-markt ongeveer elke twee jaar in omvang. Deze snelle en aanhoudende groei maakt het een aantrekkelijk doelwit voor Camunda bij het zoeken naar uitbreidingsgebieden.

![Grafiek van toenemende IoT-adoptie](/posts/category/camunda/iot-project/images/iotGrowthChart.png)

[[1] Voorspelling van de uitgaven van eindgebruikers aan IoT-oplossingen wereldwijd van 2017 tot 2025](https://www.statista.com/statistics/976313/global-iot-market-size/)

## Hoe ziet succes eruit?
Succes betekent in dit geval niet alleen het voltooien van het project. Het afronden van dit project is niet de hindernis. De echte maatstaf voor succes zal zijn hoeveel 'aandacht' en tractie in de bredere IoT-gemeenschap we via dit project kunnen vergaren.

Enkele van de statistieken die moeten worden verzameld en gemeten, zijn:
- Aantal mensen dat de blogpost (s) over dit project heeft gelezen
- Hoeveel van die lezers 'converteren' we naar doorklikken naar de Camunda-website?
- Aantal tweets / retweets van het project en zijn onderdelen
- Vragen gesteld over het project

De OKR's rond metrische gegevens die ik van plan ben te gebruiken, zijn:
- 20.000 post-reads op de blog (s) die over het project zijn gepost
- 1% conversie naar doorklik op Camunda.com

### Hoe we die statistieken verzamelen
- Gebruik bij het publiceren van blogposts op DZone `?ref=davidgsiot` om onderscheid te maken tussen verkeersverwijzingen rechtstreeks naar Camunda en Davids artikelen
- Produceer "deliverables" om op een vrij regelmatige basis intern te rapporteren (dit kunnen rapporten zijn, lunch & learns, hackathon-projecten, blogposts, enz.)

Het is belangrijk op te merken dat, hoewel we dergelijke ijdelheidstatistieken zoals het aantal treffers, enz. Over het algemeen niet bijhouden, dit echt een testballonproject is om te zien of en hoeveel relatieve interesse er is rond een integratie tussen Camunda. Platform BPMN en de IoT-gemeenschap. Omdat we slechts de initiële interesse peilen, zijn eenvoudige, gemakkelijk te volgen statistieken het meest logisch.

## Projectidee

Zoals vermeld, is gebouwautomatisering een potentiële doelmarkt voor Camunda en IoT vanwege de hoge mate van acceptatie, de vereiste voor complexe orkestratie en de huidige druk om meer systemen naar dit gebied te verplaatsen.

> In hun begindagen bleken gebouwbeheersystemen (BMS), ook wel gebouwautomatiseringssystemen (BAS) genoemd, een game-changer te zijn. De beschikbaarheid van een computergebaseerd controlesysteem dat automatisch de grootste en duurste operationele componenten van een gebouw kon bewaken en beheren, hielp facilitair managers om hun werk beter te doen. Gebouwautomatiseringssystemen bespaarden tijd en geld, verminderden energieverspilling en boden facilitair managers een manier om hun activiteiten beter te volgen.
>
> Fast-forward naar vandaag, en je hebt nog een game-changer: het Internet of Things (IoT) voor gebouwen. In de kern kruisen deze technologieën elkaar op een aantal belangrijke manieren, maar het is waar het IoT afwijkt van BMS dat het waardevoller maakt voor facilitair personeel als een managementtool. In dit artikel wordt onderzocht hoe een IoT-analyse-rapportageplatform de prestaties van het GBS kan verbeteren door feedback te geven over energie-efficiëntie - en hoe die verandering de rol van facilitaire managers kan beïnvloeden. <sup>[1]</sup>

[1] [IoT Meets Building Automation](https://www.iotforall.com/iot-meets-building-automation)

In een eerdere DevRel-positie deed ik een klein project over het berekenen van enkele milieugegevens zoals dampdrukverschil, enz., Dat uiteindelijk*enorm* populair werd. Blijkbaar zijn dit soort berekeningen en gegevens uitermate belangrijk bij de glastuinbouw. Het handhaven van de juiste temperatuur, vochtigheid, enz. Is de sleutel tot het succes van een kasbedrijf en het vermogen om deze zaken te automatiseren en te bewaken is een belangrijke behoefte in de industrie.

![Kasautomatisering](/posts/category/camunda/iot-project/images/smart-greenhouse-overview-01.png)

Kasbeheer is een onderdeel van het grotere marktsegment voor gebouwautomatisering, maar een dat sneller groeit dan de algemene BMS-markt.

> Volgens geverifieerd marktonderzoek werd de wereldwijde slimme broeikasmarkt in 2018 geschat op 0,98 miljard dollar en zal deze naar verwachting tegen 2026 2,46 miljard dollar bedragen, met een CAGR van 12,11% tussen 2018 en 2026. <sup>[2]</sup>

[2] [Smart Greenhouse Market Size and Forecast](https://www.verifiedmarketresearch.com/product/global-smart-greenhouse-market-size-and-forecast-to-2025/)

Dit maakt dit een aantrekkelijk doelwit voor een PoC.

## Budgetvoorstel voor hardware

Dit is een IoT-project, dus er is uiteraard wat IoT-hardware voor nodig. Dit is ook een Greenhouse-automatiseringsproject, dus het zal ook minstens een soort 'kas' vereisen om te automatiseren.

**Sensoren voor buiten:**
| Sensor | Prijs | hoeveelheid | totaal |
|--------|-------|-------------|--------|
|​ [Weerstation](https://www.sparkfun.com/products/15901) | $64,95 | 1 | $64,95 |
| [Bliksemdetector](https://www.sparkfun.com/products/15441) | $26,50 | 1 | $26,50 |
| [ESP32](https://www.sparkfun.com/products/17381) | $20,95 | 1 | $20,95 |
| [RJ11 Breakout](https://www.sparkfun.com/products/14021) | $1,95 | 2 | $3,90 |
| [RJ11-aansluitingen](https://www.sparkfun.com/products/132) | $1,25 | 4 | $5,00 |
| [LiPo-batterij](https://www.sparkfun.com/products/13856) | $26,95 | 1 | $26,95 |
| [Solar Charger](https://www.sparkfun.com/products/12885) | $26,95 | 1 | $26,95 |
| [Zonnepaneel](https://www.sparkfun.com/products/13783) | $59,00 | 1 | $59,00 |
| [Bodemvocht](https://www.sparkfun.com/products/13637) | $6,95 | 1 | $6,95 |
| [CO<sub>2</sub> -sensor](https://www.sparkfun.com/products/15112) | $59,95 | 1 | $59,95 |
|**Subtotaal** | | | **$301,10** |



**Kas sensoren:**
| Sensor | Prijs | hoeveelheid | totaal |
|--------|-------|-------------|--------|
| [Bodemvocht](https://www.sparkfun.com/products/13637) | $6,95 | 2 | $6,95 | $13,90 |
| [Stappenmotor](https://www.sparkfun.com/products/13656) | $30,95 | 1 | $30,95 |
| [Stepper Driver](https://www.sparkfun.com/products/16836) | $19,95 | 1 | $19,95 |
​[ESP32](https://www.sparkfun.com/products/17381) | $20,95 | 4 | $20,95 | $83,81 |
​[CO <sub>2</sub> -sensor](https://www.sparkfun.com/products/15112) | $59,95 | 1 | $59,95 |
​[Fan](https://www.sparkfun.com/products/15708) | $11,95 | 1 | $11,95|
| **Subtotaal** | | | **$220,50** |


**Sensortotalen**
| Projectgebied | Totaal |
|---------------|--------|
| Buitensensoren | $301,10 |
| Binnensensoren | $220,50 |
| **Eindtotaal:** | **$521,60** |


**Kas**

Deze is een beetje een wildcard. Ik begon te kijken naar wat zou kunnen werken. Ik wil dat de kas sensoren erin kan hebben (ze zijn klein), en minstens één 'actuator' om een raam of zoiets te openen, en waarschijnlijk ook een ventilator. We hebben het hier realistisch.

| Broeikas Type | Kosten |
|---------------|-----reading_time: 7 minutes
---|
| ​[Buiten](https://www.worldofgreenhouses.com/products/hybrid-greenhouse-series) | $650 |
| [Binnen](https://www.hpotter.com/buy-terrariums/h-potter-terrarium-classic-wardian-case-for-plants) | $140 |
| [Binnen - klein](https://www.amazon.com/Purzest-Terrarium-Geometric-Tabletop-Succulent) | $36,00 |


Voor een echt realistische/nauwkeurige PoC is de buitenkas natuurlijk de beste keuze. Ik weet niet zeker wat ik zou _doen_ met een buitenkas nadat dit allemaal klaar is, maar ¯\\\_(ツ)\_/¯.

De grotere desktopversie heeft in ieder geval een opening die ik zou kunnen motoriseren om wat realisme te geven.

**Opmerking:** [@mary_grace](https://twitter.com/mary_grace) en ik heb besloten om te beginnen met de kleinere, meer draagbare (gezien aanstaande reizen, enz.) En te kijken hoe het gaat. We kunnen naar een grotere kas verhuizen als de kleinere een onwerkbare optie blijkt.

## Documentatie
Een reeks blogposts (minimaal 2 - 3) over de verschillende stadia van de ontwikkeling van het PoC
