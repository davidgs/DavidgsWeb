---
title: "Het programmeren van de ARTIK-0 ivd Devices"
Date: 2018-07-01
Author: davidgs
Category: Gadgetry, IoT
Tags: ARTIK, ARTIK-053, IoT, Samsung
Slug: programming-the-artik-0-iot-devices
hero: images/bazaar493520_2.jpg
---

Als je hebt gelezen dit blog veel helemaal zul je hebben gemerkt dat ik een vrij grote fan van de ARTIK lijn van ivd boards (zie [hier] (/ berichten / category / iot / winter-vakantie-IOT- zijn geweest artik-5 /), [hier] (/ berichten / category / iot / iot-hardware / making-artik-5-iot-gateway-kura /), [hier] (/ berichten / category / iot / make-uw- artik-520-schreeuw /), [hier] (/ berichten / category / algemeen / how-to-save-your-artik-520-backup /), [hier] (/ berichten / category / iot / iot-software / artik-520-droplit-io-edge-apparaat /), [hier] (/ berichten / categorie / iot / iot hardware / openhab-server-artik-520 /), [hier] (/ berichten / categorie / iot / iot-hardware / running-influxdb-on-an-artik-520 /) en [hier] (/ berichten / category / iot / iot-hardware / influxdb-on-artik-520-redux /)), maar ik moet echt verduidelijken dat nu een beetje. Ik hou van mijn ARTIK-520 board. Het loopt de hele InfluxData stack mooi en is een solide, betrouwbare plek om te ivd-Edge software implementeren. Ik vind het erg leuk.

Dat gezegd zijnde, ik ben nog steeds **echt** ongelukkig met de ARTIK-0x lijn van “producten”. Het begon toen ik de ARTIK-020 ontwikkelaar board gekocht. Veel van de conclusies over de mogelijkheid om het programma van Mac OS, enz. De realiteit was dat - 13 pagina's in de handleiding voor ontwikkelaars - komt men tot het besef dat a) u een Windows-machine en b) na 30 dagen moest je aankoop nodig een $ 3.000 licentie voor IAR Workbench. Zo veel voor het zijn Maker-vriendelijk. Ik heb die raad in een la en gaf op. Dure les geleerd.

Ik klaagde bij mijn vrienden bij Samsung - ja, ik heb vrienden bij Samsung - en even later gaven ze me een gratis ARTIK-053 module. Deze hoefde niet de IAR Workbench om hem te programmeren (yay voor gcc !!) en ik dacht dat het zag er beter uit. Ik wou dat ik had gelijk gehad. Ik speelde met het voor een beetje na het krijgen van het, maar liep uit de tijd dus, net als bij de andere Samsung raad van bestuur, het ging in de doos.

Ik besloot om het opnieuw deze week. Ik had een CO2-sensor gebouwd met behulp van een Scandinavische Semi nRF52DK en een SenseAir K30 maar de nRF52DK was echt een soort van groot en ik was op zoek naar een kleinere form-factor (die ik had “in voorraad”) en was het niet nodig Arduino. Ik zal niet starten in op Arduino hier, maar ik kon.

Dus kwam de ARTIK-053 Dev Board, en ... oh shit, daar gaan we weer. Ten eerste ben ik begonnen met de ARTIK-IDE voor ontwikkeling. Het is gebaseerd op Eclipse (natuurlijk), maar serieus, het was ongelooflijk traag, omslachtig en geen code-completion of hints niet. Het duurde ongeveer 4 minuten om een binair naar het bord te zetten. Ik herhaal een **lot** dus 4 minuten per lading werd ernstig vertragen me neer. 1 voor ARTIK-IDE.

Ik ontdekte serendipitously dat Microsoft VS Code ondersteunt de ARTIK ontwikkelomgeving en was een **ton** sneller. 10 seconden opstelt (vs. 1 minuut compileert Eclipse / ARTIK-IDE) en 30 seconden ontplooit (vs. 4 minuten ARTIK-IDE). Life kreeg een stuk beter na dat. (Ik kan terugkomen en doen een andere post over VS Code, alleen maar omdat ik het zingen super veelzijdig en een echt goede tool -. Die iets voor iemand zegt met zo virulent anti-microsoft-antilichamen zoals ik)

Dus als ik bewoog al mijn ontwikkeling tot VS Code en begon wat ik dacht zou een vrij eenvoudig haven van mijn mbed- OS I2C CO2 sensor code om ARTIK's TizenOS zijn. Er ik opnieuw gaan denken. I2C is vrij eenvoudig. U moet het adres van het apparaat kennen, de registers u wilt schrijven naar de registers u wilt lezen uit, en dat vrijwel dekt het. Echt eenvoudig materiaal.

```cpp
// var 7-bit address of the K30 CO2 Sensor
const int addr = 0xD0;
char cmd[4] = {0x22, 0x00, 0x08, 0x2A};
int ack = i2c.write(addr, cmd, 4);

i2c.read(addr, readBuff, 4, false);
```

Dat is een 7-bit adres. Schrijf een 4-byte commando om het adres, lees dan een 4-byte buffer terug en ik heb mijn lezing gekregen. Dat is de mbed OS bovenstaande code, door de manier waarop. Het werkt perfect, dus porten naar Tizen makkelijk peasy zou moeten zijn.

**Fout**

Het blijkt dat er minder dan nul documentatie voor de ARTIK-0x lijn van apparaten. Er zijn een paar van de sample-programma's, maar als je wilt gaan dan alleen het opstellen en het uitvoeren van deze monsters, bent u op uw eigen. Samsung lijkt te denken dat de broncode voor i2c.h genoeg om alles gebeuren zou moeten zijn. Ze konden niet meer verkeerd zijn. Als je naar de gebruiker forums, krijg je te horen dat “lees net de source code.” Dat is nauwelijks een antwoord als u wilt dat ontwikkelaars in staat om uw platform te gebruiken.

Ik ben vrij bedreven in het lezen van de broncode. **IF** het is duidelijk geschreven en goed gedocumenteerd. En dat is het probleem met de ARTIK broncode. De auteurs leek te denken dat alleen het schrijven van de code voldoende zou zijn. **Vooral** als het ging om het 'voorbeeld' programma's. Als voorbeeld, de WebSocket voorbeeld code bestaat uit een enkele bron bestand dat 1158 lijnen lang. Hier zijn alle opmerkingen in de bron om u te helpen, samen met begrijpen:

```cpp
/// @file app/netutils/websocket/websocket.c
/// @brief websocket file to support client and server.

// if websocket server is initiated from http(s), you just can call this function.
// websocket_server_open function includes:
// 1. allocating socket fd
// 2. accepting client
// 3. authenticating with client
// those 3 are not needed when websocket is initiated from http(s).
```

Dat klopt, dat de **alle** de opmerkingen van 1158 regels ingewikkeld WebSocket code. Het merendeel van de demo-code wordt op dezelfde wijze 'gedocumenteerd.' Dit is of pure luiheid van de kant van de ontwikkelaars van de demo-code, of anders Samsung gewoon niet schelen wanneer hun eindgebruikers succesvol in het ontwikkelen van toepassingen op hun platform. Ik ga hen het voordeel van de twijfel te geven en te gaan met luiheid. Als ontwikkelaar mezelf, probeer ik te doen zo veel in-line code documentatie zoals ik redelijkerwijs kan doen zoals het is gewoon een gemeenschappelijke hoffelijkheid voor de ontwikkelaar die langs komt achter je. Ik weet niet altijd doen met de code schrijf ik puur voor mezelf, maar als ik het publiceren of ter beschikking stellen, heb ik echt proberen om het gemakkelijk te volgen. Samsung heeft blijkbaar niet schelen.

conclusies
​

Ik ben 9 dagen in en ik heb nu *** eindelijk *** gekregen van de I2C-apparaat leesbaar zijn op een vrij consistente en betrouwbare basis. Het was niet gemakkelijk, of zelfs op afstand plezierig, maar het werkt goed genoeg voor mij. De volgende bit is in staat zijn om de sensor resultaten via HTTP POST - idealiter https - aan mijn InfluxDB server. Dat is de reden waarom ik ging door 1158 regels WebSocket code op een zondagmiddag. Uw zondag was waarschijnlijk beter, ik ga ervan uit.

Ik ben er vrij zeker van dat het verkrijgen van de HTTPS POST om door te gaan gaat duren ongeveer 8 dagen ook, die Samsung zou moeten maken zich de vraag stellen: Wanneer iemand dit kan implementeren in een dag of 2 met behulp van mbed, FreeRTOS of Arduino en het duurt 2 weken op ARTIK, waarom zou **iedereen** kiezen ARTIK?” Het is een terechte vraag die ik denk niet dat ze een adequaat antwoord voor.


