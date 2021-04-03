---
title: "Drop a Brick On It"
Date: 2014-11-19
Author: davidgs
Category: IoT
Tags: connectivity, Internet Anywhere, IoT
Slug: drop-a-brick-on-it
hero: images/render-2.jpg
---


Ik ben al over connectiviteit. Ja, er zijn momenten om de verbinding met de wereld, maar dat is een persoonlijke verbreken. Applicaties en apparaten moeten, voor het grootste deel, worden aangesloten **alle** de tijd. Maar connectiviteit is duur en moeilijk te handhaven op afgelegen plaatsen. Als u een server of uw huis aansluit, zijn er vele opties die beschikbaar zijn - laten we gewoon gaan met die voor nu, zullen we? De hele ISP monopolie kwestie zal gewoon me geliquideerd. Typisch dergelijke verbindingen zijn snel, betrouwbaar en stabiel. Meestal ze zijn goedkoop en op grote schaal beschikbaar.

Maar als we kijken naar het internet der dingen (IOT) dingen kunnen een beetje meer squirrelly krijgen. Ja, als je internet van de dingen apparaten zijn dingen in uw huis, kunt u met de verbinding die u al hebt. Als ze-onderneming op basis van ivd activa, heb je je enterprise-class connectiviteit te vertrouwen op. Hoe zit het met ivd-apparaten die ofwel field-based of mobiel zijn? Wat als uw ivd implementatie is in een jungle in Panama? Of het dessert in Afrika?

Ik vond dit de andere dag, en het lijkt alsof de perfecte oplossing. Drop a [Brck](http://www.brck.com) op het! Dit ziet eruit als een geweldig apparaat voor remote connectivity, met name voor internet van de dingen of lage bandbreedte toepassingen. Er zijn een paar echt cool zoekt functies die hier - en een paar die ik zou willen verder te onderzoeken, als ik de tijd en het apparaat had. De 8-uurs ingebouwde batterij back-up voor dit apparaat is een enorme overwinning in veel afgelegen deployment scenario's, om er zeker van te zijn. Het feit dat dit apparaat is ontwikkeld **in** Afrika specifiek **voor** remote implementaties is ook een groot pluspunt. Toch nog eens, er zijn een paar dingen die ik denk dat moet verder onderzoek.

Ten eerste is het vermogen om Arduino gebaseerde sensoren en apparaten rechtstreeks aan de box toe. Dus als u [Zigbee](http://zigbee.org) of [IEEE 802.15.4](http://en.wikipedia.org/wiki/IEEE_802.15.4) apparaten als uw end-nodes, u kan een gateway toe te voegen aan deze apparaten aan de Brck apparaten rechtstreeks. Als u gebruik maakt [BTLE](http://www.bluetooth.com/Pages/low-energy-tech-info.aspx) apparaten, kunt u een BTLE-gateway toe te voegen voor de toegang tot deze apparaten ook. Dit was - terug in de dag - een van de grote knelpunten voor tal van sensor toepassingen. Low-power, low-energie netwerkverbindingen om de apparaten waren moeilijk te overbruggen tot het internet voor backhauling de gegevens. In veel implementaties, is het nog steeds. Speciaal voor teledetectietoepassingen. In staat zijn om te bouwen in uw internet-to-sensor gateway apparaat zou een groot pluspunt zijn.

Wat ik zou graag verder te onderzoeken - gezien de tijd en het apparaat, natuurlijk, omdat internet van de dingen is mijn hobby, mijn taak niet - is of ik daadwerkelijk diensten kon inzetten om de Brck apparaat. Net als authenticatie, autorisatie, data-integriteit en ivd device management. Ik weet het, van hun website, dat ze cloud-gebaseerde tools - wie niet, amirite? - om uw Brck apparaten te beheren, en ze zeggen dat je kunt Arduino schetsen naar beneden duwen om de doos te verspreiden naar de aangesloten apparaten, maar hoe zit het met die andere diensten? Wat gebeurt er als ik wilde gebruiken, laten we zeggen, [OpenAM](https://forgerock.org/openam/) en [OpenIDM](https://forgerock.org/openidm/) diensten? Kon ik direct implementatie van deze diensten aan het knooppunt? Of zou ik de service calls in het apparaat te proxy voor de end-nodes te bouwen?

Ik denk dat ik dit alleen maar toe te voegen aan de lijst met apparaten en technologieën die ik zou **liefde** in staat zijn om wat tijd doorbrengen met, maar waarschijnlijk zal niet de tijd of het geld om te gaan met.<sigh>
