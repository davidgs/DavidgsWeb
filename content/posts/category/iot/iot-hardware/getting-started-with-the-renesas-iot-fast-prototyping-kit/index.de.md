---
title: "Erste Schritte mit dem Renesas IoT Fast Prototyping Kit"
Date: 2017-07-25
Author: davidgs
Category: Evangelism, Gadgetry, IoT
Tags: IoT, Prototyping, Renesas
Slug: getting-started-with-the-renesas-iot-fast-prototyping-kit
hero: images/Safari041.jpg
reading_time: 5 minutes
---

Ich habe Sinn zu dieser für ein paar Wochen zu erhalten, und werde von einem Haufen anderer Dinge waylaid gewesen, die nach oben gehalten popping, aber ich habe mit ihnen gearbeitet weg, und dachte, ich poste würde zumindest einen Anfang Post über diese Kits. [Renesas](https://www.renesas.com/en-us/) war so freundlich, mir zu geben, sowohl die) war so freundlich, mir zu geben, sowohl die [S3 IoT Fast Prototyping Kit](https://www.renesas.com/en-us/products/software-tools/boards-and-kits/renesas-synergy-kits/renesas-synergy-s3a7-prototyping-kit.html) und die) und die [S7 Starter Kit](https://www.renesas.com/en-us/products/software-tools/boards-and-kits/renesas-synergy-kits/renesas-synergy-sk-s7g2.html), von denen beide wirklich sind ** wirklich ** schöne Bretter für IoT-Prototyping zu tun. Ich werde mit dem S3 IoT FPT (Fast Prototyping Kit) starten. Erstens ist natürlich das Unboxing!

![IMG 3095](/posts/category/iot/iot-hardware/images/IMG_3095.png)

Und was ist in der Box:

![IMG 3098](/posts/category/iot/iot-hardware/images/IMG_3098.png)

Und was ist in den Taschen:

![IMG 3099](/posts/category/iot/iot-hardware/images/IMG_3099.png)

![IMG 3100](/posts/category/iot/iot-hardware/images/IMG_3100.png)

![IMG 3101](/posts/category/iot/iot-hardware/images/IMG_3101.png)

Als nächstes wird ein kurzer Überblick von dem, was auf dem Brett / in der Box:

- Renesas S3A7 MCU Bord
- New Haven 2,4" Touch-Screen-Display
- AMS Umweltsensormodul
- Temperatur
- Feuchtigkeit
- Luftqualität
- Nähe
- Beleuchtung
- Bosch-Bewegungs-Sensor-Modul
- Accelerometer
- eCompass
- Magnetometer

Plus ein paar anderer Sachen an Bord wie SPI, Fast für Grafiken Bilder usw. und ein sauberer iOS-App für Demos. Ich schätze, dass kleine Segger J-Link-Board auch wirklich. Nicht, dass ich nicht über eine kleine und wachsende Sammlung von JTAG-Programmierer, aber es ist immer schön, eine andere Option zu haben!

## Ausführen des Demo

Das Board kommt mit einer installierten Demo, so dass ich es laufen entschieden. Es ist die [Chef Demo] genannt (http://renesas-blog.mediumone.com/renesas-s3a7-fast-iot-prototyping-kit-with-smart-chef-demo-quick-start-guide/) und seit dieser Tutorial ist ziemlich vollständig und leicht zu folgen, werde ich es hier nicht neu erstellen. Gehen Sie einfach durch die einfachen Installationsanweisungen auf der Demo und den Touch-Screen:

![IMG 3103](/posts/category/iot/iot-hardware/images/IMG_3103.png)

und Sie werden in Ordnung sein. Sobald Sie das Board konfiguriert haben, können Sie auf der Renesas-Website zum Dashboard anmelden (eigentlich ist es von meinen alten Freunden an [Bug Labs](https://buglabs.net)! Hallo Leute !! angetrieben wird) Einmal eingerichtet und läuft ich hatte ein schönes Armaturenbrett mit dem Ausgang der Sensordaten ausgeführt wird:

![Safari040](/posts/category/iot/iot-hardware/images/Safari040.jpg)

Das ist wirklich schön! Weiter an dieser Front nach oben ist die Ausgabe der Sensormesswerte zu meiner [InfluxDB Armaturenbrett](/posts/category/iot/iot-hardware/running-influxdb-on-an-artik-520/) umzuleiten.

Es gibt auch einen schönen Workflow-Editor als Teil des Armaturenbretts, die eine ganze Menge, wie [NODE-RED](https://nodered.org) sieht für mich.

![Safari041](/posts/category/iot/iot-hardware/images/Safari041.jpg)

Ich freue mich auf das Graben in das ein bisschen tiefer und re0directing die Ausgabe.

## Die Entwicklung im Vorstand

Ein Wort der Warnung für diejenigen von euch da draußen (wie mich), die Mac-Köpfe sind: Sie ** ** Muss eine Windows-VM unter denen dieses Zeug laufen. Das Renesas Studio (die eine Variante von Eclipse ist) ** nur ** läuft unter Windows. Dies tat komplizieren Dinge für mich ein wenig, da meine Windows-VM ein bisschen ein Durcheinander im Moment ist, aber es ist immer noch lohnt.

Eines der schönsten Dinge, die ich sofort auffiel, war die Fähigkeit, ein paar wirklich schöne Board-Level-Anpassungen direkt im Werkzeug zu tun. Es gibt ein Paket-Konfigurationstool, das Ihnen einen Blick auf alle Stifte kommen aus dem MCU-Paket gibt, und Sie können drehen Pins on / off, usw. je nach Bedarf. Wenn Sie für eine bestimmte Anwendung sind Prototyping und Plan auf Ihre eigene PCB auf der ganzen Linie zu bauen, ist dies eine wirklich praktische Funktion. Ich meine ** wirklich ** praktisch! Ich bin in der Mitte eines PCB-Design jetzt mit einem anderen MCU-Modul, das nicht ein solches Instrument hat, und wir gehen durch eine Menge versucht, herauszufinden, was werden muss, gebracht, wo, was sein muss gebunden niedrig, gebunden hoch, usw., um keinen Fehler zu verursachen. Nizza in der Lage sein, nur einen Stift ausschalten und vergessen Sie es!

![E2studio002](/posts/category/iot/iot-hardware/images/e2studio002.jpg)

Die IDE hat auch einige andere nette Features so dass Sie sehen, welche Pakete enthalten sind, etc. sowie einige nette Konfigurationsfunktionen.

![E2studio001](/posts/category/iot/iot-hardware/images/e2studio001.jpg)

Wie Sie vielleicht bemerkt haben, dass es die [ThreadX](http://rtos.com/products/threadx/) RTOS läuft, so dass Sie mit mehreren Threads Ausführung mit wenig Schwierigkeiten oder über Kopf zu bekommen - na ja, anders als die Standard-Sachen, wenn Sie schreiben Multi-threaded-Anwendungen.

Einer der anderen Dinge, die ich bemerkte, und nur, weil ich es mit dem [Apache MyNewt Projekt] so lange tat (https://mynewt.apache.org/), war die Einbeziehung des Board Support Packages - bsp. h, bsp.c usw. - dass es aussieht wie ein zu einem guten Start haben, macht eine dieser Platten läuft MyNewt OS nutzen könnte. Wenn Sie in diese Art von Dingen.

Hinzufügen des Board zu meinem WiFi und Konfiguration war es auch einfach gemacht durch den Touchscreen an Bord haben.

Es kann ein bisschen schwer zu lesen, aber es ist eine einfache Schnittstelle der Onboard-WiFi zu konfigurieren, um meine SSID zu verbinden. über einen Onboard-Web-Server:

![Safari038](/posts/category/iot/iot-hardware/images/Safari038.jpg)

Und weg gehe ich!

## Fazit

Es gibt viel mehr zu gehen hier, und ich werde in Kürze auf diesem Board auf das tatsächliche Schreiben und Bereitstellung von Code. Da es bei allen diesen kühlen Sensoren kommt, und da ich diese [schöne Zeit-Serie Datenbank-Handler](/posts/category/iot/iot-hardware/running-influxdb-on-an-artik-520/), I ‚ll etwas tut eine Reihe von Umweltdaten zu sammeln und zurück zu meinem Server streamen. Auch hier wird erster Schritt sein, um die Demo-Ausgabe zu meiner eigenen Zeitreihen-Datenbank umgeleitet werden, dann eine Anwendung schreiben, die sie direkt der Fall ist.
