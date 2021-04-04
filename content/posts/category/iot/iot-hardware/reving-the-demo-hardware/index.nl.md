---
title: "Rev'ing de Demo Hardware"
Date: 2019-06-05
Author: davidgs
Category: Evangelism, Gadgetry, IoT
Tags: IoT
Slug: reving-the-demo-hardware
hero: images/IMG_5478.jpeg
---

Als je hebt me het lezen voor langere tijd bij allen, zult u weten dat ik bouwen **veel** kleine hardware projecten. Er is geen betere manier om het Internet of Things mogelijkheden van InfluxDB benadrukken dan te bouwen hardware die gegevens voortdurend schrijft aan het! Maar sommige van mijn hardware demo's zijn oud, en sommige van hen zijn steeds misbruikt, dus besloot ik dat het tijd was om ze te vernieuwen met een aantal nieuwe hardware was, ben ik zelfs van plan om ze volledig draadloos te maken door het toevoegen van LiPo batterijen, zodat ze kunnen mobiele gaan tijdens presentaties en demo's!

Veel van mijn demo's hebben vertrouwd op de vertrouwde (en vuil goedkoop) Wemos D1, gebouwd rond de ESP-8266. Als ik zeg spotgoedkoop, bedoel ik minder dan $ 3,00 US per stuk, dus ik meestal koop ze bij bosjes. Maar er zijn problemen met hen. Ten eerste zijn ze niet 100% betrouwbaar, en ze zijn verteerd door relatieve regelmaat. Dat is waarom ik van de kwantiteit! Ook zijn ze van nature onzeker. Dus ik ga verhuizen naar de ESP32-gebaseerde systemen. Ze zijn iets krachtiger, en net zo gemakkelijk op te bouwen off van. Ik bestelde een paar van de ESP-32 Veren van Adafruit vooral omdat ze worden geleverd met een ingebouwde laadcircuit voor LiPo batterijen. Gelukkig heeft de code die draait op de ESP8266 draait ongewijzigd op het ESP32, dus tenminste ik niet hoefde te poort niets.

Als je me volgen op Twitter (en zo niet, waarom niet ?!) dan kunt u hebt gezien mijn recente 7-segment display, dat gegevens leest van een MQTT broker (gevoed door InfluxDB. Meer daarover in een andere post!) En geeft dit weer . ! [IMG 5243] (/ berichten / category / iot / iot-hardware / images / IMG_5243.jpeg)

Vrij koel, maar het ontbrak een paar dingen. Eén ding was de mogelijkheid om te vertellen*wat* werd getoond! Ik bedoel, data is groot en al, maar zonder context is het gewoon nummers. Maar hoe om te gaan met dat? Voer de 14-segment-display dat vrijwel alle alfanumerieke tekens kan weergeven, en heeft dezelfde look en feel als de 7-segment displays.

![IMG 5478](/posts/category/iot/iot-hardware/images/IMG_5478.jpeg)

Maar als je mijn dashboard hebt gezien, zult u merken dat er een heleboel andere gegevens er zijn, en het zou leuk zijn om te kunnen veranderen wat wordt weergegeven zou zijn.

![Screen Shot 2019 06 04 3 14 53 PM](/posts/category/iot/iot-hardware/images/Screen-Shot-2019-06-04-at-3.14.53-PM.png)

Ik had al het apparaat in staat om gegevens op basis van een andere MQTT bericht te wijzigen gemaakt, maar ik wilde iets dat gemakkelijker te behandelen was. Voer de tactiele knop. Ik kocht een hele hoop van hen in een hele hoop van kleuren en ...

![IMG 5477](/posts/category/iot/iot-hardware/images/IMG_5477.jpeg)

Nu hebben we knoppen om te veranderen welke gegevens we krijgen!

Uiteraard betekent dit dat ik zal moeten re-design en opnieuw afdrukken van de doos, maar dat is slechts een<checks notes> 9,5 uur afdruktaak. Het uiteindelijke resultaat is een draagbare, draadloze data-display, met een bijpassende legende van wat er wordt weergegeven, compleet met een 2500mAh LiPo batterij, zodat het kan worden doorgegeven rond. Nu om mensen te houden van te laten vallen en mishandelen het. 3D Printed gevallen zijn niet zo stevig als mensen schijnen te denken dat ze zijn!

Ik zal het plaatsen van foto's van het laatste apparaat op mijn twitter-feed, zodat je beter zou gaan [volg mij] (https://twitter.com/intent/follow?screen_name=davidgsIoT)!
