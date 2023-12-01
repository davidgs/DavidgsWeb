---
title: "Linkbouwer"
date: 2023-04-09T08:25:45-04:00
Author: davidgs
Category: General
Tags: open source, link building,QR codes
Slug: link-builder
description: QR-codes maken voor uw links
hero: images/link-builder-header.png
draft: true
reading_time:
---

## Wat voor tovenarij is dit?

Ongeveer een jaar geleden begon ik met React.js te spelen als leeroefening - eigenlijk werkte ik met zowel [React.js](https://reactjs.org) als [Electron](https://electronjs. org) om zelfstandige apps te bouwen.

Tegelijkertijd was het bedrijf waar ik voor werkte op zoek naar een manier om eenvoudig utm-gecodeerde links te maken voor iedereen in het bedrijf. Als je niet weet wat "UTM-gecodeerde links" zijn, kun je er [hier](https://funnel.io/resources/google-analytics-utm-tagging) meer over leren, maar het is behoorlijk nerdachtig spul. Laten we zeggen dat als je vragen wilt kunnen beantwoorden als "Klikken meer mensen op mijn links op Twitter of LinkedIn?" dan zijn UTM-links wat je nodig hebt.

Maar ik dwaal af. Terwijl ik nadacht over een manier om zo'n tool te maken, had ik een "*Eureka!*"-moment. Ik dacht: ik kan een kleine app bouwen die dat doet!

Dus ik deed. Ik heb een kleine app gebouwd die een URL nodig heeft en waarmee je vooraf gedefinieerde utm-parameters kunt toevoegen, zodat marketing de effectiviteit van hun links kan volgen. Het was een eenvoudige app, maar het werkte. En het was leuk om te bouwen.

Die baan besloot er geen gebruik van te maken (als je denkt dat het "hier niet uitgevonden"-syndroom dood is, ik heb een aantal verhalen te vertellen!), Maar ik besloot er in mijn eigen tijd aan te blijven werken om mijn React.js-vaardigheden te verbeteren.

Ik gebruik de uitdrukking "Reactvaardigheden" hier heel losjes. Ik ben geen React-ontwikkelaar en zou er nooit mee worden aangezien. Maar ik leer door te doen, dus ik bleef doen.

## Laten we meer functies toevoegen!

Een app die niet veel meer doet dan utm-gecodeerde links maken, is niet echt het allerbelangrijkste. Vervolgens heeft iemand die ik volg op Twitter (en ik kan haar tweets er niet over vinden, dus als je dit herkent, laat het me dan weten zodat ik de eer kan geven!) gepost over het maken van QR-codes in JavaScript en ik dacht: "Hé, dat zou een geweldige functie zijn voor mijn app!"

Laat ik gewoon zeggen dat het hele "Hé, dat kan ik!" en "hoe moeilijk kan het zijn?" houding is wat mij in de problemen brengt. Maar ik dwaal weer af.

Hoe dan ook, de app ontwikkelde zich tot iets dat behoorlijk nuttig was, en mijn huidige baan besloot om hem in het hele bedrijf te adopteren om gecodeerde links en QR-codes te bouwen. Een van de dingen die ik voor hen deed, was een op maat gemaakte QR-code ontwerpen waarin het bedrijfslogo, de bedrijfskleuren en aangepaste 'ogen' in de QR-code waren verwerkt.

![Aangepaste QR-code](images/example.png)

Best een mooie QR-code, toch?

## Laten we aangepaste QR-codes maken!

Toen kwam ik op het idee om een app te bouwen waarmee je je eigen QR-codes kunt ontwerpen en deze naar wens kunt aanpassen. Ik heb geprobeerd daar een geheel aparte app voor te bouwen, en dat was enigszins succesvol, maar het leek me veel moeite om een QR-code te ontwerpen, en deze vervolgens op de een of andere manier aan de *andere* app te moeten toevoegen om te gebruiken wanneer je iets maakt koppelingen.

Wat moeten we doen. Wat moeten we doen?

## En ook ...

Terwijl ik dit allemaal deed, liet ik een paar mensen zien wat ik deed en laten we zeggen dat er enig enthousiasme voor was. Maar ik had nog steeds een probleem. De enige echte, werkende versie die ik had, was sterk aangepast aan mijn werkgever, en zou voor veel andere bedrijven niet erg nuttig zijn.

## Tijd om opnieuw te ontwerpen

Om deze applicatie echt bruikbaar te maken voor een zo breed mogelijk publiek, moest deze echt voor elke gebruiker aanpasbaar zijn. Sommige mensen willen misschien een bepaalde UTM-parameter, terwijl anderen die niet willen. Sommige mensen willen misschien dat een bepaalde UTM-parameter uit een vooraf gedefinieerde lijst komt, terwijl anderen misschien willen dat het een eenvoudig tekstveld is.

Dat gaat een *veel* maatwerk zijn. En het zal een hoop werk zijn om dat voor elkaar te krijgen. Of misschien niet.

## Extreem aanpasbaar

Ik besloot vrijwel elk aspect van de app aanpasbaar te maken. Ik heb een aanpassingspaneel gemaakt waarmee een gebruiker bijna elk aspect van de applicatie kan wijzigen.

Laten we beginnen met hoe de applicatie eruit ziet wanneer u deze opent:

![Linkbouwer](images/main-interface.png)

Als je daarnaar kijkt, is het allereerste dat je waarschijnlijk wilt veranderen dat logo. Wie dacht dat *dat* een goed idee was? Nou, dat deed ik. Maar misschien niet. Dus laten we het veranderen.



