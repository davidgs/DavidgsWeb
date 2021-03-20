---
title: "My Winter Vacation (was habe ich mit IoT und ARTIK-5)"
Date: 2017-01-02
Author: davidgs
Category: Uncategorized
Slug: winter-vacation-iot-artik-5
hero: images/eTapeProject-1-1-225x300.png
---

Ich weiß nicht, über Sie, oder was Sie mit Ihrem Winterurlaub haben (oder wenn Sie auch nur einen bekam, und wenn Sie nicht, tut mir leid), aber eine der Spaß Dinge, die ich mit meiner tat, war ein verbringen wenig Zeit mit meinem [Samsung ARTIK](http://artik.io) Dev Kit. Wenn Sie die) Dev Kit. Wenn Sie die [Hardware Extravaganza Post] lesen (/ posts / Kategorie / IOT / IOT-Hardware / Hardware-Extravaganza /), werden Sie wissen, dass ich ein ARTIK-0 bekam und einen ARTIK-5 Entwickler-Kit nicht vor langer Zeit. Ich habe in meine Ohren gewesen [MyNewt](/posts/category/iot/iot-hardware/hardware-extravaganza/), obwohl und keine Zeit gehabt hat viel zu tun mit ihnen traurig. Das heißt, bis meine Winterpause kam.

Ich wollte nicht die ganze Zeit spielt in meinem Büro und nerven meine Familie verbringen, so dass ich nur ein schnelles Projekt versuchen beschlossen, einige bestehende Sensorhardware verwendet habe ich herumliegen. (Anmerkung: Ich habe eine große Menge an Sensor-Hardware „nur herumliegen“) ich beschlossen, zu versuchen, den [étape Füllstandssensor] mit (https://www.adafruit.com/products/464?gclid=CjwKEAiAkajDBRCRq8Czmdj-yFgSJADikZggOOig7wQivaUivT14Q8aNI3ndBmn2oyGF3EJgiZJ- MxoCWvDw_wcB), dass ich schon habe mit dem MyNewt Projekt spielen. Es ist ein ziemlich einfacher Analogsensor für den Wasser- / Flüssigkeitsstand in einem Behälter zu lesen. Oder in meinem Fall auf meiner Terrasse zurück, die regelmäßig überschwemmt! Ich habe auch beschlossen, die ARTIK-5 zuerst zu ziehen, da es extrem einfach zu bekommen gehen.

Wir werden den Sensor als * Widerstandssensor verwenden, * und die Einrichtung ist sehr einfach. Ich werde ein Steckbrett verwenden diese zu illustrativen Zwecken alle zusammen zu stellen. Zuerst legt einen Jumper-Draht von 5 V auf dem Brett auf den breadboard.Next Befestigen von ADC0 auf dem Brett auf das Steckbrett ein Überbrückungskabel. Dies wird unsere ADC-in sein. Der Sensor sollte mit einem 560 Ohm-Widerstand gekommen ist, so Stecker, der in die Platine zwischen Vdd und ADC-in Löchern. Schließlich fügen Sie eine Brücke von GND auf dem Brett zu Ihrem Steckbrett. An dieser Stelle Ihre ARTIK 5 sollte wie folgt aussehen:

[! [ARTIK-5 ADC Sensor Verdrahtung](/posts/category/iot/images/eTapeProject-1-1-225x300.png)] (/ posts / Kategorie / IOT / images / eTapeProject-1-1.png))](/posts/category/iot/images/eTapeProject-1-1.png)

 

Und Ihr Steckbrett soll wie folgt aussehen:

[! [Versuchsaufbau Verdrahtung](/posts/category/iot/images/eTapeProject-4-225x300.png)] (/ posts / Kategorie / IOT / images / eTapeProject-4.png))](/posts/category/iot/images/eTapeProject-4.png)


Befestigen Sie nun eine der mittleren 2 führen vom Sensor zum Boden, auf dem breadboad und die anderen Mitte führen zu dem ADC-in auf dem Steckbrett. Das sollte den Sensor hookup vervollständigen und Ihr vollständiges Steckbrett wie die oben aussehen sollte.

Ich kaufte ein 1000 ml Zylinder, in der graduierten zum Testen dieses Projektes des étape Sensor zu setzen, und hier ist es, was die letzte gemeinsame Ausstrahlung des Sensors selbst wie folgt aussieht:

![étape Sensor im Zylinder](/posts/category/iot/images/eTapeProject-5.png)

Nun sind alle muss ich tun, füllen es mit Wasser und ... oh, warte, ich muss wohl einige Code schreiben, nicht wahr? Tatsächlich stellt sich heraus, dass ich überraschend wenig zu tun haben! Ich beschloss, die [Node-Rot](https://nodered.org) einen Spin zu geben, da ich in diesem Jahr ohnehin viel Node.js Code geschrieben. Ich habe meine ARTIK-5 und läuft mit der) einen Spin zu geben, da ich in diesem Jahr ohnehin viel Node.js Code geschrieben. Ich habe meine ARTIK-5 und läuft mit der [Resin.io](https://resin.io) Website, die wirklich schnell und einfach zu bedienen war. Sobald das geschehen war, und ich hatte eine voll funktionsfähige ARTIK 5 (Anmerkung: nicht das ** ** schlank Profil verwenden, stellen Sie sicher, dass Sie das ** ** neueste Profil in Ihrem Docker Setup verwenden Sie benötigen es für. Installation Node-Rot), installierte ich einfach Node-Rot mit

```
% sudo npm install -g node-red
```
Sobald das abgeschlossen ist, installierte ich die ARTIK Bibliothek für Node-Rot

```
% /root/.node-red
% npm install node-red-contrib-artik
```

Dann, nur um die Dinge noch einfacher zu machen, habe ich installierte den FRED-Modul:

```
% npm install node-red-contrib-fred
```

Sie werden sehen, warum FRED eine gute Idee, in einer Minute. Sobald das alle auf der ARTIK 5 fertig war einfach Knoten-Rot Ich begann:

```
% node-red
```

Und dann meinen Browser auf den ARTIK-5 Knoten-Red-Server verbunden und eine App gebaut. Ich schleppte in einem ARTIK ADC und konfiguriert es:

[! [Node-RED ARTIK Sensoren](/posts/category/iot/images/Safari005.jpg)

[! [ARTIK-5 Knoten-Red ADC](/posts/category/iot/images/Safari006-300x137.jpg)] (/ posts / Kategorie / IOT / images / Safari006.jpg))](/posts/category/iot/images/Safari006.jpg)

eine Funktion

[! [Node-rot Funktionsdefinition](/posts/category/iot/images/Safari007-300x137.jpg)] (/ posts / Kategorie / IOT / images / Safari007.jpg))](/posts/category/iot/images/Safari007.jpg)

und ein JSON Modul und dann gehakt es bis zu einem FRED-Eingang und ein FRED-Ausgang:

[! [ARTIK-5 Knoten-Red app](/posts/category/iot/images/Safari004-300x129.jpg)] (/ posts / Kategorie / IOT / images / Safari004.jpg))](/posts/category/iot/images/Safari004.jpg)

Oh, und klickte dann die ‚Bereitstellen‘ klicken. Sie sagte, es war einfach.

Dann ging ich zu meinem FRED-Dienstkonto bei [Sensitec](https://fred.sensetecnic.com) und angemeldet ich einen privaten ADC Endpunkt erstellt.:

[! [Create End-Punkt in FRED](/posts/category/iot/images/Safari009-300x180.jpg)] (/ posts / Kategorie / IOT / images / Safari009.jpg))](/posts/category/iot/images/Safari009.jpg)

Und dann ein ** ** Sende ADC Ereignis, ausgelöst durch einen Zeitstempel hinzugefügt:

[! [Send Event ARTIK-5 in FRED](/posts/category/iot/images/Safari008-300x127.jpg)] (/ posts / Kategorie / IOT / images / Safari008.jpg))](/posts/category/iot/images/Safari008.jpg)

Und ein Empfang Ereignis, das die zurückgegebenen Daten und fügt sie in ein Diagramm nimmt:

[! [ARTIK Ereignis in FRED](/posts/category/iot/images/Preview001-300x96.jpg)] (/ posts / Kategorie / IOT / images / Preview001.jpg))](/posts/category/iot/images/Preview001.jpg)

Sobald ich die ganze Sache begann, hatte ich ein geschicktes Diagramm, das den Wasserstand in meinem Meßzylinder zeigt:

[! [Wasserstandsberechnung](/posts/category/iot/images/Safari001-300x238.jpg)] (/ posts / Kategorie / IOT / images / Safari001.jpg))](/posts/category/iot/images/Safari001.jpg)

Und ich schrieb im Wesentlichen Null-Code.

Als nächstes werde ich ein MongoDB Backend auf dem ARTIK-5 und sendet alle Daten an, die versuchen, die Installation, und dann dienen die Daten an eine Javascript-Front-End alles zu entwerfen. Das erfordert einige Code schreiben, so sucht, dass in naher Zukunft!

Ich werde auch arbeiten, um den eigentlichen Sensor zum ARTIK-0 verbunden ist, auf aufweisen und die Daten aus, die an die ARTIK-5 MongoDB Instanz für die Sammlung und Analyse zu senden. Ich freue mich wirklich in die ARTIK-0 zu graben ein wenig da, dass mehr hands-on mit C-Code ist - etwas, das ich habe zum Hals in letzter Zeit mit MyNewt sowieso.
