---
title: "Sommige Minor ivd Berekeningen"
Date: 2015-01-30
Author: davidgs
Category: IoT
Tags: Batteries, IoT, power
Slug: minor-iot-calculations
hero: images/Critical-Battery-Icon-old-laptop.jpg
---

## Batterijen zal een beperkende factor in ivd implementaties zijn

Er is veel hype over het Internet of Things (IoT) zoals ik heb [zei] (/ berichten / category / algemeen / hier-komt-iot-ready-of-niet /) [herhaaldelijk] (/ berichten / category / ivd / is-iot-gebeurt-of-niet-in-2015 /) - en zoals iedereen die iets over de technologie tegenwoordig al weet leest. Er is wearable tech, er is gezondheidszorg internet van de dingen, er is M2M ivd en tal van andere gebieden van het internet van de dingen die allemaal naar verwachting exploderen in de komende 10 jaar. Miljarden en miljarden apparaten zijn prognose. Misschien triljoenen. Dat zijn enorme aantallen en ze zijn spannend voor iedereen die werkzaam zijn in het veld, of zelfs het observeren van het. Maar er is een probleem. Vermogen.

Een groot probleem. Vermogen. Hoe zullen we deze miljarden apparaten van stroom? Sommigen van hen, natuurlijk, zal worden aangedreven door ze gewoon de stekker in om een constante voeding. Laten we negeren die. Een behoorlijk aantal van hen - misschien wel de meeste van hen - zal zijn klein, embedded apparaten - wearables, veel medische apparatuur, milieu-sensoren, sensoren op afstand, etc. - die zal moeten worden gevoed door batterijen. En er is uw probleem. Batterijen. Veel van de batterijen. Boot laadt batterijen.

Ik heb veel tijd, terug in de dag, het onderzoeken van de batterijen in orde for the Sun SPOT platform om een evenwicht te vinden tussen grootte en het gewicht, en de capaciteit te bereiken. Oh, en de prijs. Batterijen kunnen duur zijn. Erg duur. Maar de grootte en het gewicht en de capaciteit van de batterijen is niet eens van plan om het grootste probleem met het internet der dingen zijn. Er is veel onderzoek gaande over de hele wereld om de batterijen kleiner, krachtiger en efficiënter te maken. Nee, alleen de pure **aantal** batterijen gaat het probleem te zijn. En het is een probleem dat niet genoeg mensen over denken, en bijna niemand het over heeft.

Hier is wat ik bedoel. Laten we de gemeenschappelijke aantal 20-30000000000 ivd apparaten on-line in 2020. [Gartner](http://www.gartner.com/newsroom/id/2636073), [Forrester] (https: //www.forrester .com / Er + Is + No + Internet + van + Wat + 8212 + Toch / fulltext / - / E-RES101421) (pay-muur), [IDC] (http://www.idc.com/getdoc.jsp ? containerId = 248.451), [Ovum](https://www.forrester.com/There+Is+No+Internet+Of+Things+8212+Yet/fulltext/-/E-RES101421), en vrijwel iedereen is het gebruik van dit nummer en ik wil niet te argumenteren, dus we zullen dat als een gegeven en ga met 20 miljard apparaten. Laten we nu eens zeggen dat ongeveer de helft van deze apparaten zal worden aangedreven door het lichtnet, en zal een batterij niet nodig. Dus we nu vertrokken met 10 miljard apparaten met batterijen. Sommige apparaten kan een jaar of meer gaan op een enkele batterij. Sommigen kunnen alleen naar een paar weken. Dus laten we, voor argument's sake, zeggen dat de gemiddelde is dat ongeveer een derde van de apparaten zal moeten hebben hun batterij veranderd in de loop van een jaar. Dat lijkt me redelijk.

Ja, het lijkt redelijk, totdat u het volgende berekeningen:

> 20B ÷ 2 = 10B - het aantal batterijafhankelijke apparaten.

> 10B ÷ 3 = 3.4b - het aantal batterijen die zullen moeten worden veranderd in een jaar.

> 3.4b ÷ 365 = 9.1M - het aantal batterijen die zal elke dag worden veranderd.

Zie je nu het probleem? Maar het wordt nog erger. Veel slechter.

Laten we nu eens schaal die tot een biljoen apparaten - een getal dat vaak wordt gebruikt wanneer het over het Internet of Things. Hell,*ik* gebruikt dat nummer zelf sinds 2004!

> 1T ÷ 3 = 333B - laten we zeggen dat slechts een derde van die apparaten nu batterijen nodig.

> 333B ÷ 3 = 111 B - Het aantal batterijen die zal moeten worden veranderd in een jaar.

> 111B ÷ 365 = 304m - het aantal batterijen die moeten elke worden veranderd. single. dag. Dat is 34k batterijen per uur.

Gezien deze cijfers, zal het Internet of Things bezwijken onder zijn eigen gewicht. Nu, als je een batterij bedrijf, ik weet zeker dat die nummers zijn heel geruststellend, maar voor iedereen die op zoek naar hoe het Internet of Things ook daadwerkelijk functioneren, is het duidelijk dat die cijfers zijn niet alleen duurzaam, maar ze zijn volledig onwerkbaar. We zullen een leger van mensen die niets doen nodig hebben, maar gaan van apparaat naar apparaat het vervangen van batterijen, 24 uur per dag, 7 dagen per week, om gelijke tred te houden. (Voor degenen die het spelen van de thuiswedstrijd, dat is 34,000+ batterijen per uur, elk uur.)

We hebben duidelijk een andere oplossing nodig. De grote vraag is **waarom** is niemand in het veld ivd over praten? Waarom is er radiostilte over dit dreigende, verlammende probleem in ivd? Er zijn slechts een paar te selecteren mensen die werkzaam zijn op een aantal oplossingen voor deze problemen met de accu. Als je in ivd, en je bent niet al na te denken over hoe u de batterij probleem beheren in uw ecosysteem, kan nu de tijd om te beginnen.
