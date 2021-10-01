---
title: "Intel Edison IoT Board"
Date: 2014-12-04
Author: davidgs
Category: IoT
Tags: development, gadgets, hardware, IoT
Slug: intel-edison-iot-board
hero: images/Edison-module.jpg
reading_time: 3 minutes
---

Ich habe eine Zeit lang über die Intel Edison Development-Board gelesen. Ich mache mehr IoT Sachen wieder - rein zum Spaß, da niemand der Einzahlung mich, es zu tun - und ich habe vor kurzem den elektrischen imp-Development-Kit und dieses Intel Edison-Kit sowie ein Arduino Kit erworben. Die Intel Edison Board ist mit Abstand der stärksten der Gruppe. Es ist ein IoT SoC-Gerät, das äußerst fähig zu sein schien.

Einige „Geschwindigkeiten und Vorschübe“ Daten:

- Dual-Core, Dual-Thread-500MHz Intel Atom CPU mit einem Mikrocontroller 100MHz32-Bit-Intel-Quark kombiniert
- 1 GB RAM
- 4 GB Flash-Speicher
- 2,4 GHz und 5.0GHz WiFi mit Onboard-Antenne
- Bluetooth 4.0

Das ist ziemlich beeindruckend. Es ist ein bisschen Macht hungrig, mit einer 13 mW im Standby-Spannung (21,5 mW mit Bluetooth, 35mW mit WiFi), aber es ist nach wie vor im Rahmen des Zumutbaren. Die I / O-Funktionen sind auch ziemlich stark:

- 20 Digital I / O, darunter 4 PWM
- 6 analoge Eingänge
- 1 UART (Rx / Tx)
- 1 I ^ 2 ^ C
- 1 6-pin header SPI
- SD-Card-Anschluss

Das gibt Ihnen ein ** ** viel von Optionen für Sensoren und Aktoren! Ich habe mit ihm gespielt einigen, aber nicht viel, so weit. Hier ist der erforderliche Auspacken Porno:

![IMG 1564](/posts/category/iot/iot-hardware/images/IMG_1564.jpg)

![IMG 1566](/posts/category/iot/iot-hardware/images/IMG_1566.jpg)

![IMG 1567](/posts/category/iot/iot-hardware/images/IMG_1567.jpg)

Einige seltsamen Dinge über dieses Gerät: Es erfordert, dass ** ** beiden Mikro-USB-Ports angeschlossen werden, um es zu öffnen und greifen Sie von Ihrem Laptop. Das ist nur seltsam. Und ein Schmerz für mich, da ich nur relativ kurze Mikro-USB-Kabel hat, und eine USB-Port auf jeder Seite meines Laptops.

Ich bin ein bisschen ein Stickler für Einfachheit der Nutzung und eine niedrige Eintrittsbarriere, und an dieser Front, muss Edison eine * Menge * Arbeit. Sie haben nur eine ‚Erste Schritte‘ Tutorial für die Arduino-Erweiterungskarte (Ich kaufte die * andere * Erweiterungskarte, natürlich). Zugreifen, Blinken, usw. Das Board ist nicht intuitiv und die Dokumentation ist verworren und schwierig. Ich landete in den User-Foren, wo normale Benutzer gebucht haben ** viel ** mehr straight-forward Rezepte und Anweisungen. Ja, ich bin voreingenommen, als ich den berühmten Sun SPOT-Manager-Anwendung für die Verwaltung des SDK und Firmware auf Sun SPOT-Geräte geschrieben, und ich kann nicht wirklich jeder eine solche intuitiv erwarten zu haben und leicht zu bedienen Einstiegspunkt für Entwickler, aber ... warum warten, ** nicht ** ich erwarten? Warum erwarten die Entwickler nicht? Ich kann nur einen Tag an diesem Wochenende und schreiben einen ausgeben.

Einer der wirklich schönen Dinge ist, dass ich dieses Gerät mit Node.js in Javascript programmiert werden kann. Es gibt Gerüchte, dass es Java läuft auch, aber ich habe keine Zeit gehabt, um das noch installiert zu bekommen. Ich werde Sie so bald wie ich Figur mitteilen, dass einer aus!

 
