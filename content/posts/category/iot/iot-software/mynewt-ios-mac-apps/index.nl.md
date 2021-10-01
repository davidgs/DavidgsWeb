---
title: "Mynewt iOS en Mac-apps"
Date: 2016-12-16
Author: davidgs
Category: IoT, Misc, Work
Tags: IoT, mynewt
Slug: mynewt-ios-mac-apps
hero: images/logo.png
reading_time: 3 minutes
---

Ik doe een hoop werk op de [Mynewt OS](https://mynewt.apache.org) Project over bij de [Apache](http://apache.org) Software Foundation. Het is nog steeds 'incubatie' dus het is niet een volwaardige Apache project nog niet, maar we maken een enorme vooruitgang en het komt langs mooi. In feite zijn we gewoon het vrijgeven van onze eerste bèta-versies van de 1.0 release! Als je een ivd hacker, en zijn op zoek naar een klein, snel, zeer configureerbare (en open source!) RTOS, MyNewt dat het ticket!

Dat alles gezegd zijnde, een van de dingen die ik heb gewerkt aan - met uitzondering van documentatie - zijn demo's. De Sensor API's zijn een work in progress, maar de vooruitgang is vrij aanzienlijk. Zozeer zelfs dat ik in staat was om een demo bevestigen van een analoge sensor om een Mynewt-aangedreven apparaat op te bouwen en beginnen met het verzenden van de sensor waarden uit via Bluetooth!

De basis setup is een Nordic Semi NRF52dk Developer Kit Board, een etape Liquid Level Sensor, en een cilinder vol water. De sensor gaat in het water, de nrf52 board leest de sensor, en stuurt de sensor waarden uit. Ik zal een apart bericht over de werkelijke nrf52 setup, etc. binnenkort schrijven, maar ik wilde een beetje over hoe ik in staat zijn om de waarden te lezen schrijven. TL; DR: Ik schreef een Mac OS X en een iOS-app om het te doen!

Een van de problemen met het verzenden van gegevens via Bluetooth is dat het verzenden van de data is eenvoudig, zodat de perifere weten apparaat wat **soort** van de sensor is het de neiging om een beetje meer problematisch zijn. Ik dit probleem opgelost door instelling **twee** bluetooth karakteristieke UUIDs voor elke sensor. Het eerste, wat ik noem de "Configuration UUID" is een 16-bits UUID (ja, ik weet het, ik moet 128-bits UUID's te gebruiken, maar dat is een pijn) die gewoon een ASCII-reeks beschrijven van de sensor draagt. De tweede is een gekoppelde UUID dat ik noem de "Data UUID" en dat is een NOTIFY kenmerk dat de feitelijke gegevens zal uitvoeren. Ik noem deze "gekoppeld UUIDs" en definieer ik hen door het geven van de Configuration UUID een prefix van "0xDE" en de Data UUID een prefix van "0xBE" Ik koppelen ze zowel door dezelfde 'achtervoegsel' waardoor ze zo 0xDEAD en 0xBEAD zijn gekoppeld door de gemeenschappelijke 'AD' achtervoegsel.

Hier is hoe dat eruit ziet in de huidige app:

{{ youtube vq3FEoaIc9I }}

U kunt de Prefixen veranderen in de App, of gewoon abonneren op alle INFORMEREN kenmerken gevonden onder de omschreven dienst Kenmerkend. U kunt klikken op de RSSI Signal Graph om de ruwe RSSI waarde toe te voegen aan de tafel, of klik er nogmaals op om het te verwijderen.

En dezelfde app - nou ja, meestal dezelfde, deelt veel van de code! - loopt ook op iOS

{{ youtube tWS7u7ColX4 }}

Ik denk dat ze zijn vrij cool!
