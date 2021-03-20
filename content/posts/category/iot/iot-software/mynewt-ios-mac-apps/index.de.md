---
title: "Mynewt iOS und Mac Apps"
Date: 2016-12-16
Author: davidgs
Category: IoT, Misc, Work
Tags: IoT, mynewt
Slug: mynewt-ios-mac-apps
hero: images/logo.png
---

Ich habe eine Menge Arbeit getan auf den [Mynewt OS](https://mynewt.apache.org) Projekt über am) Projekt über am [Apache](http://apache.org) Software Foundation. Es ist immer noch ‚Inkubation‘ so ist es nicht ein vollwertiger Apache-Projekt noch nicht, aber wir machen große Fortschritte und es kommt gut voran. In der Tat sind die Freigabe wir gerade unsere ersten Beta-Versionen der Version 1.0! Wenn Sie ein IoT Hacker sind, und suchen nach einem kleinen, schnellen, hoch konfigurierbar (und Open Source!) RTOS, MyNewt es das Ticket!

All das wird gesagt, eines der Dinge, die ich an gearbeitet habe - anders als Dokumentation - sind Demos. Die Sensor-APIs sind ein work in progress, aber der Fortschritt war ziemlich bedeutend. So sehr, dass ich in der Lage war, eine Demo Anbringen einen Analog-Sensors mit einem Mynewt betriebenen Gerät zu bauen und starten, um die Sensorwerte aus über Bluetooth zu senden!

Die Grundeinstellung ist ein Nordic Semi NRF52dk Developer Kit Board ein étape Füllstandssensor und ein Zylinder mit Wasser gefüllt. Der Sensor geht in das Wasser, die nrf52 Board liest den Sensor und sendet die Sensorwerte aus. Ich werde einen separaten Beitrag über die tatsächlichen nrf52 Setup schreiben usw. kurz, aber ich wollte ein wenig darüber schreiben, wie ich die Werte lesen zu können. TL; DR: Ich habe eine Mac OS X geschrieben und ein iOS-App, es zu tun!

Eines der Probleme, mit Daten über Bluetooth zu senden, ist, dass, während die Daten sendet einfach ist, das Peripheriegerät wissen zu lassen, was ** Art ** von Sensor ist es neigt dazu, ein bisschen mehr als problematisch. Ich löste dieses Problem durch Einstellung ** ** zwei Bluetooth-Charakteristik UUIDs für jeden Sensor. Die erste, die ich die „Konfiguration UUID“ nennen, ist ein 16-Bit-UUID (ja, ich weiß, ich 128-Bit-UUIDs verwenden sollte, aber das ist ein Schmerz), die einfach trägt eine ASCII-Zeichenfolge beschreibt den Sensor. Der zweite ist ein gepaart UUID, dass ich die „Data UUID“ nennen, und das ist ein Merkmal in Kenntnis, dass die tatsächlichen Daten tragen. Ich nenne diese „gepaart UUID“ und definiere ich sie durch die Konfiguration UUID das Präfix „0xDE“ geben und die Daten UUID das Präfix „0xBE“ Ich habe sie paaren, indem sie beide das gleiche ‚Suffix‘ so 0xDEAD und 0xBEAD geben gepaart durch den gemeinsamen ‚AD‘ Suffix.

Hier ist, was das Aussehen in der eigentlichen App gefällt:

{{>Youtube vq3FEoaIc9I>}}

Sie können die Präfixe in der App ändern, oder abonnieren Sie alle Merkmale unter dem definierten Service Merkmal gefunden NOTIFY. Sie können auf der RSSI Signal Graph klicken Sie auf den rohen RSSI-Wert in der Tabelle hinzuzufügen, oder klicken Sie erneut, um es zu entfernen.

Und die gleiche App - na ja, meistens das gleiche, es teilt eine Menge Code! - läuft auch auf iOS

{{>Youtube tWS7u7ColX4>}}

Ich denke, sie sind ziemlich cool!
