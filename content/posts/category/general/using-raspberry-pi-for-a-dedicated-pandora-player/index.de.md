---
title: "Verwenden von Raspberry Pi für einen Dedicated Pandora Player"
Date: 2016-05-23
Author: davidgs
Category: Gadgetry, IoT, Misc
Tags: IoT, Raspberry Pi
Slug: using-raspberry-pi-for-a-dedicated-pandora-player
hero: images/raspberry-pi-logo.png
---

Nennen wir es ein Pandora Pi, sollen wir?

Wie dem auch sei, ich habe eine (nicht-technische) Freund, der immer neidisch auf die Musik-Setup war ich in meinem Haus haben. Ich habe eine Reihe von Bose Serie III-Lautsprecher rund um das Haus, mit Airport Express Basisstationen eingerichtet, so dass ich Musik im ganzen Haus übertragen können. Es gibt immer hier Musik zu spielen, in der Regel im ganzen Haus - Küche, Wohnzimmer, Büro, etc. Funktioniert gut für mich!

Wie auch immer, sie wollte in ihrem Hause ein ähnliches Setup, aber nur in einem Raum, und für Pandora. Zuerst stelle ich sie mit Pandora auf, eine Reihe von Bose-Lautsprecher, ein Airport Express und Airfoil auf ihrem PC (sie ist kein Mac-Shop, wie ich bin), und dass ganz gut funktioniert. Meist.

Aber ihr PC war immer abstürzt, oder Airfoil würde einfach aufhören oder ihr PC würde die Netzwerkverbindung verlieren, oder einige andere Spielereien würden dazu führen, die Musik zu stoppen. Es wurde sie verrückt.

Also habe ich beschlossen, ihr einen eigenen Pandora Spieler zu bauen, dass sie die Kopfschmerzen in der Küche und die Verwendung zu spielen Musik ohne alle halten konnte sie hatte. Es war eigentlich einfacher, als ich dachte, es wäre!

Hier ist die grundlegende Liste der Komponenten:

- Himbeere Pi 2 + B
- [SYBA externen USB-Stereo-Sound-Adapter](http://www.amazon.com/external-Adapter-Windows-Microphone-SD-CM-UAUD/dp/B001MSS6CS?ie=UTF8&psc=1&redirect=true&ref_=oh_aui_detailpage_o07_s00) (da Raspberry Pi on-Board-Audio-saugt)
- [Tonic 3,5-Zoll-Display + case](http://www.amazon.com/Tontec®-Raspberry-Display-Touchscreen-Transparent/dp/B00NANNJLQ?ie=UTF8&psc=1&redirect=true&ref_=oh_aui_detailpage_o00_s00)

Das ist es für Hardware! Nur etwa $ 100USD für die gesamte Einrichtung.

Software war genauso einfach. Früher habe ich [Raspian Jessie](https://www.raspberrypi.org/downloads/raspbian/) und fügte hinzu:) und fügte hinzu: [Pithos](http://pithos.github.io) für Pandora-Wiedergabe. Einfach.

Einrichten Pithos auf dem 3,5-Zoll-Bildschirm war nicht möglich, natürlich (ich denke, es ist möglich ist, hatte ich eine Tastatur angeschlossen ist), sondern ich habe gerade angefangen einen VNC-Server auf dem Pi und angezeigt sie aus der Ferne das Setup zu tun.) Wenn dass alle gesetzt war, habe ich eine Standard-Anwendung Setup hinzugefügt auto-Start Pithos bei der Anmeldung, und es begann alles so schnell zu spielen, wie Sie die Sache einzuschalten.
