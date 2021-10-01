---
title: "Disney En #IoT"
Date: 2015-01-09
Author: davidgs
Category: Gadgetry, IoT
Slug: disney-and-iot
hero: images/disney.jpg
reading_time: 5 minutes
---

Tijdens de feestdagen een vriend van mij nam haar gezin naar Disney World voor een paar dagen. Ze verbleven in een resort in het park, extra betaald voor kortere lijnen op de ritten, en waren er in een groep van 12. Dat is een epische reis waarschijnlijk waardig zijn eigen blog post - ergens anders. Ik kon me niet voorstellen dat de logistiek van een dergelijk bezoek, maar nogmaals, het is al 10 jaar geleden dat ik naar Disney World geweest, en blijkbaar is er veel veranderd in die tijd.

Dat is niet echt wat ik ben eigenlijk schrijven over hier. Ziet u, zij kwamen huis met deze koele kleine plastic / rubberen armbanden. Ze werden gepresenteerd met de armbanden - Disney noemt ze [MagicBands] (http://www.google.com/aclk?sa=l&amp;ai=Cn6YVIyGwVIPdI4jYpgPmt4KIBbCdkLcJsPD6kYECuJ7GvaYBCAAQASC5VGDJ7qeKpKTEEaABxvSz_gPIAQGqBB9P0GZkOBPEgK6Ouy6vIILHWD0Zp9Iw_GHI6nWnsLbCgAWQToAHgNn1RYgHAZAHAqgHpr4b&amp;sig=AOD64_3AYdOTwEhFZiBYvxQJk4hZsV2IfQ&amp;rct=j&amp;q=&amp;ved=0CCAQ0Qw&amp;adurl=http://ad.doubleclick.net/ cLK% 3B252175360% 3B76276805% 3Bl% 3BU% 3Dms% 3Fhttps: //disneyworld.disney.go.com/plan/my-disney-experience/bands-cards/%3FCMP%3DKNC-WDW_FY15_DOM_NGE_BR_MagicBands%7CG%7C4151322.NG.AM .02.01% 26keyword_id% 3DsX37LLiAO_dc% 7Cdisney% 2520magic% 2520band% 7C68978719648% 7Ce% 7C15402cl14044) - wanneer zij ingecheckt bij hun hotel. Elke persoon - tot in de kleinste kinderen - heb er een gepersonaliseerde alleen voor hen.

![21 300x215](/posts/category/iot/iot-hardware/images/21-300x215.jpg )

Deze waren meer dan gewoon simpel armbanden wel. Zij fungeerde als de sleutels van hun hotelkamers, toegang tot de parken, verificatie dat ze konden krijgen in de kortere lijnen, en konden ze verfrissingen en items te kopen in het park. Het enige wat ze moesten doen was de armband naast een Point of Purchase-systeem, een pincode, en gaan. Geen rommelen met een portemonnee. Geen hoeft te wijzigen of contant geld, enz. Echt geen behoefte om ** iets te dragen ** in het park te vinden. Gewoon dragen de Magic Band. Het park is bezaaid met RF-lezers voor hen bij de ingangen van ritten, de ingang van het park, etc.

![DSC03458 XL 800x600](/posts/category/iot/iot-hardware/images/DSC03458-XL-800x600.jpg)

Deze kleine apparaten zijn echt Internet of Things apparaten. Disney is het gebruik van internet van de dingen. Ze maken het park gemakkelijker en eenvoudiger voor hun gasten, ja, maar dat is slechts het uiterlijke manifestatie van wat ze eigenlijk aan het doen zijn. Deze banden zijn meer dan alleen een RFID-systeem. Ze bevatten een aantal nog veel meer geavanceerde [RF-technologie](https://disneyworld.disney.go.com/faq/my-disney-experience/frequency-technology/) en Disney gebruikt deze op te sporen en te verzamelen telemetrie van de gasten tijdens hun verblijven in het resort. Telemetrie? Ja, telemetrie. Ze kunnen controleren hoe lang je in de rij staan, hoe lang de lijnen zijn, wat je koopt en waar (waardoor ze aankoopgeschiedenis en de aankoopprijs patroon data die ze later kunnen gebruiken om de markt voor u). Ik ben hier gissen, maar het zou me niet verbazen als ze ook de MagicBand kunt gebruiken voor het opsporen van uw verloren kind in het resort gewoon door driehoeksmeting van het signaal van haar band.

Ik was zo geïntrigeerd door dit kleine gadget dat mijn vriend gaf me hare en ik bracht het mee naar huis te ontleden. Laat me je vertellen, u, dat is niet zo eenvoudig als het klinkt. Deze zijn ontworpen om te zijn voor eenmalig gebruik. Je gebruikt het tijdens uw verblijf in het park, en neem het met u wanneer u vertrekt. Ik denk dat als je terug naar het park een andere tijd kon je je oude MagicBand presenteren en hebben het opnieuw geactiveerd, maar u zult waarschijnlijk een nieuwe krijgen. Dus hier is hoe het ging.

Ik ben begonnen met een MagicBand:

![IMG 1594](/posts/category/iot/iot-hardware/images/IMG_1594.jpg)

Het is gegoten plastic, zodat je in het was **echt** moeilijk, maar een scherp mes, een paar kleine kniptang en 10 minuten later was ik (meestal) in.

![IMG 1597](/posts/category/iot/iot-hardware/images/IMG_1597.jpg)

Het is een zeer eenvoudig ontwerp lijkt, en het gehele polsband wordt gebruikt als antenne ruimte en, wat betekent dat ze willen kunnen het contacteren van mij afstand, en / of ze hebben een sterk, betrouwbaar signaal. Ik weet dat het niet alleen een eenvoudige RFID-systeem, want het bevat een van de volgende:

![IMG 1598](/posts/category/iot/iot-hardware/images/IMG_1598.jpg)

Dus het is een aangedreven apparaat. Ik groef en groef en groef, en ten slotte kwam over wat ik **denken** is de processor, maar ja, zelfs met mijn vergrootglas, ik kan de chip te identificeren.

![IMG 1601](/posts/category/iot/iot-hardware/images/IMG_1601.jpg)

En het was bevestigd aan een zeer eenvoudige single-layer circuit board:

![IMG 1600](/posts/category/iot/iot-hardware/images/IMG_1600.jpg)

Dit alles was niet alleen ingepakt in plastic, maar was eigenlijk gegoten in het plastic, dus het was **zeer** moeilijk te geraken, en onmogelijk in te komen zonder in het proces te vernietigen.

Dit zijn het soort van ivd producten die u **niet** zien op de CES, of gepleisterd over het hele web. Dit zijn het soort van ivd toestellen die reeds **zijn** verandert de manier waarop bedrijven opereren. Ze zijn het verstrekken van Disney met niet alleen Big Data, maar * Massive gegevens * over wat hun gasten*daadwerkelijk* doen, waarschijnlijk in real-time, terwijl in het park. Dat is de aard van de telemetrie die volkomen een bedrijf kan transformeren. Dat is hoe het ivd een industrie kan transformeren.
