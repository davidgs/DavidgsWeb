---
title: "Making een ARTIK-520 ivd Gateway met Kura"
Date: 2017-03-02
Author: davidgs
Category: IoT
Tags: ARTIK, Eclipse, Kura, Samsung
Slug: making-artik-5-iot-gateway-kura
hero: images/kura.jpg
---

Er zijn ongeveer een miljoen manieren om te bouwen of kopen een IoT Gateway Device. (Eigenlijk, meer als [586000] (https://www.google.com/#newwindow=1&amp;q=iot+gateway+device&amp;*), maar laten we niet gezeur). Elk heeft zijn eigen verdiensten, of valkuilen. Je kon er een te kopen, en het risico te worden opgesloten in een single-vendor oplossing. U kon één van de grond af op te bouwen en vervolgens te worden opgezadeld met het hebben van de hardware bron, de software te bouwen en te onderhouden het allemaal en hoop dan dat je de juiste keuzes gemaakt en dat het zal schaal. Of u kunt een bestaande Open Source oplossing, zoals [Kura](http://www.eclipse.org/kura/index.php) van de Eclipse Foundation gebruiken.

Ik speel rond met de Samsung ARTIK lijn van ivd hardware onlangs, zoals u wellicht [onthouden] (/ berichten / category / iot / winter-vakantie-iot-artik-5 /), dus heb ik besloten om te zien als ik kon draai mijn [ARTIK-520](/posts/category/iot/winter-vacation-iot-artik-5/) in een ivd Gateway op een eenvoudige, schaalbaar. Er werd voorgesteld om me dat ik probeer de Eclipse Kura project, ook al was het niet echt ondersteund op ARTIK. Ik ben niet iemand die worden afgeschrikt door "het werkt niet op die hardware", dus heb ik besloten om het te proberen. Het kostte me een paar dagen, en een paar gesprekken met een aantal van de ingenieurs uit verschillende delen van het Kura project, maar het bleek relatief eenvoudig en duidelijk te zijn. Dus, hier zijn mijn ervaringen, en een soort van 'How To' te werken voor u, als u geïnteresseerd bent te krijgen. Ik ga ook een beetje praten over een aantal van de sterke en zwakke punten, ik zie in deze benadering langs de weg.

## De hardware

In de eerste plaats over de hardware. Ik heb een ARTIK-520 developer kit. Hier is het overzicht over dat als je niet wilt gaan [opzoeken](https://www.artik.io/modules/artik-520/) jezelf:

- Energiezuinig dual Cortex®-A7 met Wi-Fi, Bluetooth, ZigBee, Draad
- Maakt gebruik van Samsung ePoP technologie op het aanbod van kleine footprint modules: 30 mm x 25 mm
- 512 MB RAM, 4GB flash (eMMC)
- Enterprise class beveiliging met hardware beveiligde element en Secure OS
- Fedora Linux-pakket met connectiviteit, graphics, power management en beveiliging bibliotheken

De werkelijke dev kit heeft een bekabelde Ethernet-poort (deze zal belangrijk zijn, dus dit onthouden), micro-usb-poorten, en andere dingen ook, maar ik zal niet gebruik van de meeste van die in dit voorbeeld. Volg gewoon de uitstekend "[Aan de slag](https://developer.artik.io/documentation/artik/getting-started/)" Gids voor uw ARTIK-520 board up and running te krijgen. Ik gebruikte het de generieke Fedora 25 uit die gids voor het opzetten van mijn board. Ik kwam op deze vanuit verschillende richtingen, en had een paar valse starts langs de weg als ik dat deed. Hier is hoe ik het Kura software geïnstalleerd.

## De software

Allereerst, niet de Kura 'Getting Started' gids niet volgen. Het zal niet krijg je hier beginnen, dat is de reden waarom ik ben niet eens een link te maken. Ik heb nooit te beheren door middel van dat document te krijgen en eindigen met iets dat lijkt op een werkend ontwikkelsysteem voor Kura. We proberen te krijgen Kura draait op een ARTIK-520, niet een ontwikkeling van het systeem te bouwen. De documenten gewoon niet overeen met de werkelijkheid voor mij op een MacBook Pro. Vervolgens niet de Getting Started Guide hier volgen [hetzij](http://wiki.eclipse.org/Kura/Getting_Started). Ernstig. Of als je dat doet, gewoon doen dit kleine stukje ervan:

```
DSimmons-Pro:~ $ git clone -b develop https://github.com/eclipse/kura.git kura
DSimmons-Pro:~ $ cd kura
DSimmons-Pro:kura $ ./build-all.sh
```

En doe je dit op je laptop, **niet** de ARTIK-520 board! Onthoud dat. U wilt niet om dit alles op de ARTIK-520 zelf te bouwen. U **kunt** als je wilt, denk ik, maar het duurt een*erg* lange tijd, en ten minste toen ik het probeerde, ik moest uitschakelen parallel gebouw, want er zijn gewoon niet de middelen om het te doen . Dat is de reden waarom ik het niet adviseren te doen.

Je moet Java, en Maven hebben, enz. Al geïnstalleerd op uw laptop, maar die installatie-instructies zijn gewoon te ingewikkeld en verwarrend. Tenminste op mijn Mac, 'Brew installatie Maven' was alles wat nodig was. Dat build-all script zal een tijdje duren. En niet zomaar een "kopje koffie" tijdje. Meer als een "ga naar de sportschool", terwijl. Toen het eindelijk klaar is, gaan kijken in kura.git / kura / distrib / doelmap en zich vergapen aan al het spul dat voor u gemaakt.

```
DSimmons-Pro:kura $ cd kura/distrib/target
DSimmons-Pro:target $ ls -l
total 4001616
```

Zeg niet dat ik je niet gewaarschuwd heb! Het is veel. Wat je zoekt in deze hooiberg is het bestand 'kura_3.0.0-SNAPSHOT_fedora25_installer.sh' Dat is het bestand dat u wilt over te stappen naar de ARTIK-520. Net ftp / sftp / scp het daar, maar niet eigenlijk nog gaan lopen! Dat is de volgende sectie, en je wilt die sectie te lezen voordat u de installatie of je een dag of zo te verspillen.

## De doorgang

Zoals ik al zei, niet alleen ssh in de ARTIK-520 board en voer dat installateur. Ik was aangesloten via de USB Debug-poort, zodat ik nooit connectiviteit verloren, maar als je hebt het opzetten van de WiFi-verbinding op de ARTIK-520, en zijn ssh-ed om dat wanneer u het installatieprogramma uitvoert, krijg je een tamelijk onwelkome verrassing. En hier is waar dat bekabelde Ethernet-poort die ik eerder noemde terug in het spel komt - vergeet niet, ik zei toch dat ik zou terug te komen. Je absoluut **must** hebben dat bekabelde Ethernet-poort aangesloten op uw netwerk. En hier is waar ik mijn pas echt serieuze teleurstelling met registreren, en ruzie met de Kura softwarepakket. Dus hier is het.

Toen ik het installeerde, had ik al het opzetten van de ARTIK-520 board, gekregen het draadloze netwerk opgezet, zodat ik het kon toegang, enz. Het is vrij eenvoudig om te doen, en redde me dat u een CAT-5-kabel te vinden en dat opgericht. Maar toen ik liep de Kura installer, plotseling ging alles in de war met mijn netwerk. Het geïnstalleerd prima, en startte de Kura service was prima, maar ik kon niet meer naar de box via WiFi. Whiskey, Tango, Foxtrot !? Toen ik begon te graven, merkte ik dat opeens mijn WiFi (wlan0) -interface had een statisch IP-adres van een aantal 172, xxx, niet mijn WiFi LAN reeks die het had voordat bereik toegewezen. Veranderd het terug, maar vroeg of laat zou het opnieuw terug te keren naar dit adres. Kan geen contact met de web-gebruikersinterface om de doos te configureren. De honden leerden een geheel nieuwe reeks van krachttermen en scheldwoorden die dag.

Het blijkt dat de Kura service, tijdens het installeren, besloten dat thew WiFi-interface zou worden gebruikt als een nieuwe Access Point, dus het werd gegeven een nieuw IP-adres, opgezet als een Access Point, en begon reclame een nieuwe SSID helemaal zelf. Zonder kennisgeving aan me. Zonder te vragen mij. Ik zie dit als een aantal tamelijk anti-sociaal gedrag en probeer te achterhalen van de precieze formulering van een bug-report. Tot dusver is de bug report is NSFW. Het toevoegen van een nieuwe SSID en, in wezen een nieuwe router, mijn netwerk niet speelt nice. ** Ik besluit ** wanneer een nieuw access point is toegestaan op mijn netwerk. **I** beslissen wanneer een nieuwe router is geïnstalleerd. Zoals ik al zei, mooie anti-sociaal gedrag. En om ervoor te zorgen dat ik was niet het maken van een kwestie van iets dat niet een groot probleem was, liep ik dit scenario langs een heleboel andere netwerken en security mensen die ik ken. Om een persoon, waren ze allemaal geschokt door dit gedrag. Het is niet oke.

Ok, razen voorbij. Ik zal beneden klimmen van mijn zeepkist.

Dus, terug naar de taak bij de hand. Je absoluut **must** hebben dat bekabelde Ethernet-poort setup. Dan installeer, dan kunt u verbinding maken met de web-UI over de bekabelde Ethernet-adres. En dan, en alleen dan, kun je eigenlijk zien de kracht en veelzijdigheid van het gebruik van Kura als uw gateway management software. Laat niet de indruk krijgen van mijn boven ongenoegen met de kaping van mijn netwerk dat ik een hekel Kura. In tegendeel. Ik heb eigenlijk vind het nogal een beetje. Het is net dat beetje van shenanigans dat ik niet dol op.

Maar als u het installatieprogramma hebt uitgevoerd en opnieuw opgestart ARTIK-520 en probeerde om je te verbinden zal waarschijnlijk snel beseffen dat je niet kunt. Hmmm ... Je moet een wijziging van de startup script eerst te maken. zodat de ARTIK-520:

```
[root@localhost ~]# systemctl stop kura.service
[root@localhost ~]# cd /opt/eclipse/kura/bin/
[root@localhost bin]# ls
start_kura_background.sh start_kura_debug.sh start_kura.sh
```

Nu, bewerk de start_kura_ * scripts en verander alle lijnen die naar `256m` zeggen` java -Xms512m -Xmx512m` plaats. De ARTIK-520 heeft slechts 512M van het geheugen (zie hierboven), zodat proberen om elke laatste beetje aan Java resultaten geven in een `outOfMemoryException` en een crash. Natuurlijk.

Herstart nu Kura:

```
[root@localhost bin]# systemctl start kura.service
```

Dus nu dat ik heb Kura running succes Ik kan inloggen op de web-UI (gebruikersnaam admin, wachtwoord van de beheerder dus je wilt dat veranderen) Ik heb eigenlijk een aardige management UI die ik kan gebruiken om te configureren dat hij zelf het vak .

![Safari013](/posts/category/general/images/Safari013.jpg)

Maak je geen zorgen, zult u niet de "Demo" spullen op de jouwe. Dat is iets anders waar ik aan werk voor een andere blog post. Ik kan de firewall, kan ik de controle over mijn WiFi-interface rug, en een hele reeks andere dingen worstelen.

Nu, als wat je zoekt naar een zeer eenvoudige, snelle en effectieve manier van het bouwen van een Access Point die zal het opzetten van een eigen SSID, enz. Dan, out of the box, Kura is zeker de weg te gaan als het wel doet.

Ik ben nog steeds bezig met het uitzoeken hoe aan te sluiten op een cloud service, en om te beginnen met loggen sensor data aan, dus dat zal moeten wachten tot een andere functie. Ik zou ook graag om te proberen om dit allemaal gebouwd als onderdeel van een Resin.io deployment model, maar ik ben er nog niet helemaal niet.

Blijf kijken!
