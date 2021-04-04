---
title: "Intel Edison ivd Board"
Date: 2014-12-04
Author: davidgs
Category: IoT
Tags: development, gadgets, hardware, IoT
Slug: intel-edison-iot-board
hero: images/Edison-module.jpg
---

Ik heb gelezen over de Intel Edison ontwikkeling boord voor een tijdje. Ik doe meer ivd spullen weer - puur voor de lol, omdat niemand het betalen van me om het te doen - en ik heb onlangs de elektrische imp development kit en dit Intel Edison kit, evenals een Arduino kit verworven. De Intel Edison bestuur is veruit de meest krachtige van het stel. Het is een ivd SoC apparaat dat lijkt zeer geschikt te zijn.

Sommige “snelheden en feeds” data:

- Dual-core, dual-threaded 500MHz Intel Atom processor gecombineerd met een 100MHz32-bits Intel quark microcontroller
- 1 GB RAM
- 4 GB Flash geheugen
- 2.4GHz en 5.0GHz WiFi met antenne aan boord
- Bluetooth 4.0

Dat is behoorlijk indrukwekkend. Het is een beetje macht belust, met een 13mW standby spanning (21,5 mW met Bluetooth, 35mW met WiFi), maar het is nog steeds binnen reden. De I / O-mogelijkheden zijn ook vrij sterk:

- 20 digitale I / O, waaronder 4 PWM
- 6 analoge ingangen
- 1 UART (Rx / Tx)
- 1 I ^ 2 ^ C
- 1 6-pins SPI header
- SD-kaart connector

Dat geeft je een **lot** mogelijkheden voor sensoren en actuatoren! Ik heb met het wat gespeeld, maar niet veel tot nu toe. Hier is de vereiste uitpakken porno:

![IMG 1564](/posts/category/iot/iot-hardware/images/IMG_1564.jpg)

![IMG 1566](/posts/category/iot/iot-hardware/images/IMG_1566.jpg)

![IMG 1567](/posts/category/iot/iot-hardware/images/IMG_1567.jpg)

Sommige rare dingen over dit apparaat: Het vereist dat **zowel** micro-usb-poorten zijn om het te brengen en de toegang vanaf uw laptop worden aangesloten. Dat is gewoon vreemd. En een pijn voor mij, omdat ik maar relatief korte micro-USB-kabels, en één USB-poort aan elke kant van mijn laptop.

Ik ben een beetje een natuurlijk voor het gemak-of-gebruik en een lage toetredingsdrempel, en op dit front, Edison heeft behoefte aan een*lot* werk. Ze hebben slechts een 'aan de slag' handleiding voor de Arduino uitbreidingskaart (Ik kocht de*andere* uitbreidingskaart, natuurlijk). Toegang, knipperen, enz. De raad van bestuur is niet intuïtief en de documentatie is ingewikkeld en moeilijk. Ik belandde in de gebruiker forums waar regelmatige gebruikers hebben geplaatst **veel** meer straight-forward recepten en instructies. Ja, ik ben bevooroordeeld, zoals ik schreef de beroemde zon SPOT Manager Application voor het beheren van de SDK en firmware op zonvlek apparaten, en ik kan niet echt verwachten dat iedereen zo'n een intuïtieve en eenvoudig te gebruiken entry point voor ontwikkelaars, maar ... wacht, waarom ** kan niet ** ik dat verwachten? Waarom hebben de ontwikkelaars niet verwacht? Ik kan gewoon een dagje dit weekend en schrijven één.

Een van de echt leuke dingen is dat ik dit apparaat met behulp van Node.js in Javascript kunt programmeren. Er zijn geruchten dat het draait Java zo goed, maar ik heb geen tijd om dat nog niet geïnstalleerd hadden. Ik zal u laten weten zodra ik figuur dat een op!

 
