---
title: "ARTIK-520 als Droplit.io edge apparaat-"
Date: 2017-03-28
Author: davidgs
Category: IoT
Tags: ARTIK, ARTIK-520, Droplit, droplit-edge, IoT
Slug: artik-520-droplit-io-edge-device
hero: images/Droplit-Logo1.png
reading_time: 4 minutes
---

Het doen van wat de verdere werkzaamheden met mijn trouwe ARTIK-520 (hey, als je een hamer, alles ziet eruit als een spijker! Een back-up van me af!) Heb ik besloten om te proberen het installeren van een andere ivd Gateway kader op. Gelijke kansen en alles wat (ik heb dat [voor] (/ berichten / category / algemeen / making-artik-5-iot-gateway-Kura /). Gedaan). En ik zal meer van hen moeten doen zodra ik meer mini-SD-kaarten in-house. Maar ik dwaal af.

Ik oorspronkelijk volgde gewoon de basisinstallatie [instructies](https://docs.droplit.io/docs/deploy-an-edge-server) voor het inzetten van een Droplit.io Edge server. Maar dat werkte niet. Niet de schuld van Droplit.io, om zeker te zijn. En echt niet de schuld van de ARTIK-520. Maar hier is mijn nieuwe regel:

** Do Not Compile / build On ARTIK-520 **

Het werkt gewoon niet altijd goed af. Het kan een pijn om het opzetten van een cross-compiler van uw architectuur, maar je hoeft alleen maar te doen die ooit (en lucky me dat ik al had de ARM compiler toolchain geïnstalleerd en werken vanuit het werken aan [MyNewt] (http: // mynewt .apache.org /). Maar je zult niet eens een compiler voor Droplit.io rand nodig hebben. Het is allemaal JavaScript, dus het is vrij eenvoudig.

## Opstelling

Zodra je hebt de Droplit.io-edge wad op uw laptop (of wat dan ook) en alle voorwaarden, gewoon bouwen volgens de [instructies] (https://docs.droplit.io/docs/deploy-an- edge-server). Eigenlijk niet uitvoeren vanaf uw laptop wel. Zodra ik had gebouwd, liep ik gewoon:

```
DSimmons-Pro:~ dsimmons$ tar czf droplit.tgz droplit.io-edge
```

En vervolgens gebruikt sftp het gecomprimeerde tar-bestand te kopiëren naar de ARTIK-520, niet-comprimeren / tar en dan:

```
[root@localhost ~]# export DEBUG=droplit:*
[root@localhost ~]# cd droplit.io-edge/
[root@localhost droplit.io-edge]# node droplit-edge
droplit:router using setting host: wss://edge-ws.droplit.io/edge +0ms
droplit:router using setting ecosystem: C58c71404f57350103c9a8dda +19ms
droplit:router using setting edge id: 36:e8:d4:9e:f4:a6 +7ms
droplit:router load plugins +7ms
droplit:router droplit-plugin-philips-hue loaded +2s
droplit:router droplit-plugin-lifx loaded +85ms
droplit:router droplit-plugin-sonos loaded +2s
droplit:router droplit-plugin-wemo loaded +2s
droplit:transport-edge reconnecting... +4ms
droplit:transport-edge connected +805ms
droplit:router info < droplit-plugin-wemo:uuid:Socket-1_0-221631K0100D8A +6s
droplit:router info < droplit-plugin-wemo:uuid:Socket-1_0-221643K0101D76 +200ms
droplit:router id > uuid:Socket-1_0-221631K0100D8A -> 58da675822fea674dc071474 +62ms
droplit:router pc < uuid:Socket-1_0-221631K0100D8ABinarySwitch.switch off +59ms
droplit:router info < droplit-plugin-wemo:uuid:Lightswitch-1_0-221614K1300BE2 +181ms
droplit:router id > uuid:Socket-1_0-221643K0101D76 -> 58da675922fea674dc071475 +26ms
droplit:router pc < uuid:Socket-1_0-221643K0101D76BinarySwitch.switch off +24ms
droplit:router pc < uuid:Lightswitch-1_0-221614K1300BE2BinarySwitch.switch off +30ms
droplit:router id > uuid:Lightswitch-1_0-221614K1300BE2 -> 58da675922fea674dc071476 +130ms
```

Ik stel de eigenschap DEBUG omdat ik wilde zien wat er werkelijk gaande is achter de schermen (plus Ik was eigenlijk debuggen van een probleem met de Droplit mensen, die zijn geweldig om mee te helpen en super responsief!).

U zult zien dat **zeer** snel de Droplit-io edge server vond de [Wemo](http://www.wemo.com) schakelt Ik heb in mijn huis ingezet. Zoet! Vervolgens ging ik naar mijn [Droplit.io ontwikkelaar portal](https://portal.droplit.io/) en:

![Safari014](/posts/category/iot-iot-software/images/Safari014.jpg)

En daar zijn ze! En ik heb gecontroleerd dat ik inderdaad kan draaien ze aan en uit vanaf hier.

Nu, als iemand wil me wat [Sonos](http://www.sonos.com/en-us/home) versnelling, of een [Philips HUE] (http://www2.meethue.com/en- sturen ons /) gear, dat ik hier kan installeren thuis om te testen met deze, zou ik blij zijn om uit te testen die.

Ik kan zien over het creëren van een aantal connectors aan connect dingen zoals mijn-MyNewt gebaseerde apparaten naar de rand server, maar dat gaat niet gebeuren vandaag.

## Conclusies

Zoals gebruikelijk, heb ik gevonden de ARTIK-520 een vrij eenvoudige en zeer veelzijdig ivd hub. Dit is mijn tweede gateway project met ARTIK-520 en, hoewel ik in een aantal eigenaardigheden hebt uitgevoerd elke keer, het is eigenlijk vrij straight-forward in te stellen. Nogmaals, ** niet proberen te bouwen / compileren op de ARTIK-520 **, tenzij je absoluut*moet* te, en het is een relatief kleine gestalte. Ik heb eigenlijk gebouwd Node.js van de bron op de ARTIK-520 een paar keer en het was traag, maar relatief pijnloos.

[Droplit.io](http://droplit.io) is een vrij eenvoudig distributiedoel voor ARTIK-520. Zo klein als de eigenlijke ARTIK module is (afgezien van de ontwikkeling boord spul) zou het een heel aantrekkelijk doelwit voor een Droplit.io 'apparaat' te zijn, maar ik ben niet zeker dat de prijs-point een redelijke doel te raken voor hen .

Zoals ik al zei, zou ik graag mijn hand te proberen op het bouwen van een aantal aansluitingen voor andere ivd-apparaten voor Droplit, en ik ben zeker kijken naar een aantal andere gateways te bouwen / implementeren op deze ARTIK-520 board. Blijf kijken!
