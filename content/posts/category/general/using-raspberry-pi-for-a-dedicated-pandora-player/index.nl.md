---
title: "Het gebruik van Raspberry Pi voor een Dedicated Pandora Player"
Date: 2016-05-23
Author: davidgs
Category: Gadgetry, IoT, Misc
Tags: IoT, Raspberry Pi
Slug: using-raspberry-pi-for-a-dedicated-pandora-player
hero: images/raspberry-pi-logo.png
reading_time: 2 minutes
---

Laten we noemen het een Pandora Pi, zullen we?

Anyway, ik heb een (niet-technische) vriend die altijd was jaloers op de muziek setup heb ik in mijn huis. Ik heb een bos van Bose Series III-luidsprekers opgezet rond het huis, verbonden met de luchthaven Express Basestations zodat ik muziek kan uitzenden door het hele huis. Er is altijd muziek hier in de buurt, meestal door het hele huis - keuken, woonkamer, kantoor, etc. Werkt prima voor mij!

Hoe dan ook, wilde ze een gelijkaardige opstelling in haar huis, maar alleen in een kamer, en voor Pandora. In het begin zette ik haar met Pandora, een set van Bose luidsprekers, een Airport Express en Airfoil op haar PC (ze is niet een Mac winkel, net als ik) en dat redelijk goed gewerkt. Meestal.

Maar haar PC was altijd crashen, of Airfoil zou gewoon stoppen, of haar PC zou netwerkverbinding verliezen, of een andere capriolen zou zorgen dat de muziek te stoppen. Het reed haar gek.

Dus besloot ik om haar te bouwen een speciale Pandora Player die ze in de keuken en gebruiken voor het afspelen van muziek zonder al kon houden de hoofdpijn ze had. Het was eigenlijk makkelijker dan ik dacht dat het zou zijn!

Hier is de basislijst van componenten:

- framboos Pi 2 B +
- [SYBA externe USB Stereo Sound Adapter] (http://www.amazon.com/external-Adapter-Windows-Microphone-SD-CM-UAUD/dp/B001MSS6CS?ie=UTF8&amp;psc=1&amp;redirect=true&amp;ref_=oh_aui_detailpage_o07_s00) (omdat raspberry Pi on-board audio zuigt)
- [Tonic 3,5 inch display case +] (http://www.amazon.com/Tontec®-Raspberry-Display-Touchscreen-Transparent/dp/B00NANNJLQ?ie=UTF8&amp;psc=1&amp;redirect=true&amp;ref_=oh_aui_detailpage_o00_s00)

Dat is het voor de hardware! Slechts ongeveer $ 100 USD voor de hele setup.

Software was net zo makkelijk. Ik gebruikte [Raspian Jessie](https://www.raspberrypi.org/downloads/raspbian/) en heeft [Pithos](http://pithos.github.io) voor Pandora weergave. Gemakkelijk.

Het opzetten van Pithos op het 3,5 inch scherm was niet mogelijk, natuurlijk (ik denk dat het mogelijk was, moest ik hierbij een toetsenbord), maar in plaats daarvan ik net begonnen met een VNC-server op de Pi en op afstand weergegeven aan de setup te doen.) Zodra dat helemaal klaar was, voegde ik een standaard applicatie setup om automatisch te starten Pithos bij het inloggen, en begon het allemaal zo snel als je het ding te zetten op te spelen.
