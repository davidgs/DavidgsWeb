---
title: „Der Aufbau der weltweit kleinster InfluxDB Server“
Date: 2020-02-13
Author: davidgs
Category: Gadgetry, IoT, Work
Slug: building-the-worlds-smallest-influxdb-server
hero: images/giant-board-pin-out-1024x690.png
---

Ich habe eine Menge von [InfluxDB](https://www.influxdata.com/products/influxdb-overview/) Server in meiner Zeit hier gebaut, und ich habe ein paar ziemlich esoterisch noch dazu gebaut, aber ich glaube, ich ‚ve schließlich abgezogen, was man nur als die kleinste InfluxDB Server der Welt beschrieben werden! Zurück im Sommer 2019 sah ich ein Projekt auf) Server in meiner Zeit hier gebaut, und ich habe ein paar ziemlich esoterisch noch dazu gebaut, aber ich glaube, ich ‚ve schließlich abgezogen, was man nur als die kleinste InfluxDB Server der Welt beschrieben werden! Zurück im Sommer 2019 sah ich ein Projekt auf [CrowdSupply.com](https://www.crowdsupply.com/groboards/giant-board) für etwas, um den "Riesen Board genannt. Es sah wirklich, wirklich cool! Eine komplette Single Board Computer (SBC), die Linux, die alle in einem Feder-Formfaktor lief. Ich wich es sofort! Dann über sie für einen zweiten zu denken, backed ich es * wieder *! Also habe ich zwei dieser Dinge. Insgesamt Unfall, ich schwöre.

Einige Spezifikationen. Hier ist, was der Riese Vorstand tatsächlich ist:

** Riesen Vorstand Specs **:

- ** Prozessor **: Microchip SAMA5D2 ARM® Cortex®-A5-Prozessor 500 MHz
- ** ** Speicher: 128 MB DDR2 RAM
- ** Lagerung **: microSD-Karte
- ** Sensing **: 6 x 12-Bit-ADC mit 3,3 V Referenz und externen Trigger
- ** Actuation **: 4 x 16-Bit-PWM mit externen Trigger
- ** Connectivity **: 1 x I²C, 1 x SPI, 1 x UART, mehr mit Flexcom
- ** Leistung **: via USB mit Unterstützung für LiPo-Akku
- ** Betriebssystem **: Fern Linux-Kernel

in diesem kleinen Formfaktor Alles, was ich in der Regel für Mikrocontroller verwenden!

Nun, vor ein paar Wochen, sie angekommen! Also, einige Unboxing Bilder:

![in Paket GiantBoard](/posts/category/database/images/IMG_6750-768x1024.png)

Warten Sie, das Ganze passt in diesem einen kleinen Beutel? Ja. Nicht nur das - es gibt mehrere Teile in der Tasche! Und ich erkennen (jetzt), dass es kein Maßstab zu dieser Tasche im Bild, aber das ist eine Mac-Maus daneben. Ich würde das Bild wieder zurückzunehmen, aber ich warf schon die Taschen weg!

![Riesen-Karten-Parts](/posts/category/database/images/IMG_6752-1-768x1024.png)

Das ist richtig: Ich bestellte die WiFi-Feder-Flügel-Add-on, denn schließlich, was ist ein IoT Board - und vor allem, was ein InfluxDB Server - ohne Vernetzung!

![Riesen-Board mit Feder Flügel](/posts/category/database/images/IMG_6754-1-768x1024.png)

Und nur für Skala, das ist ein Viertel US dazwischen. Also das wird mein Server * und * mein Netzwerk-Interface sein! Für etwas den "Riesen Board genannt ist es sicher, klein!

Nach einem kleinen Löten, hatte ich alles zusammengestellt und mit der Zugabe einer MicroSD-Karte, es gebootet!

![Befehlszeile mit Login zum Riesen Vorstand](/posts/category/database/images/Screen-Shot-2020-02-11-at-9.04.12-AM.png)

Woah! Diese winzige Kleinigkeit läuft Debian Linux? Warum ja, ja es tut! Also das macht [Installation InfluxDB](https://docs.influxdata.com/influxdb/v1.7/introduction/installation/) super einfach, da wir bereits ARMv7 Binärdateien für InfluxDB versenden und den ganzen Rest des) super einfach, da wir bereits ARMv7 Binärdateien für InfluxDB versenden und den ganzen Rest des [TICK Stapel](https://www.influxdata.com/time-series-platform/)!

![Terminal zeigt influxd Lauf](/posts/category/database/images/Screen-Shot-2020-02-11-at-9.07.54-AM.png)

Ok, sicher, es wird zur Zeit diese kleine CPU Hämmern, aber es ist auch läuft!

![Live-Aufnahme eines Armaturenbretts auf dem Riesen-Vorstand](/posts/category/database/images/Kapture-2020-01-21-at-12.22.19-1024x372.gif)

Und wie Sie sehen können, die Armaturenbrett läuft in [Chronograf](https://www.influxdata.com/time-series-platform/chronograf/) geben Sie mir einen Einblick in, wie das Ganze läuft!

Nun, ich würde das als Produktionssystem laufen? Absolut nicht! Wie Sie sehen können, ist es auf einem so kleinen Gerät viel zu viele Systemressourcen. Würde ich führen Sie es als Rand Sammlung und Weiterleitung Gerät? Gut möglich. Würde ich führen Sie es als eingebettetes [Telegraf](https://www.influxdata.com/time-series-platform/telegraf/) Agent-Gerät? 100% absolut. Vor allem, da ich kann auch dies tun mit ihm:

![Riesen Vorstand mit Akku](/posts/category/database/images/IMG_6779-768x1024.png)

Das ist richtig, ich kann es auf einer Batterie laufen! Eine wiederaufladbare Batterie Lipo an, dass (und die Ladeschaltung ist in an die Platine eingebaut!). Und der Vollständigkeit halber, werde ich bieten einen Pin-out hier, so dass Sie sehen können, was sonst * * I dieser Sache hinzufügen können - Sensoren, Aktoren etc. -, um es sowohl Knoten einen Daten zu machen und einen Sensorknoten:

![Riesen Vorstand Pinout Karte](/posts/category/database/images/giant-board-pin-out-1024x690.png)

Als nächstes werde ich eine Version von InfluxDB 2.0 für ARMv7 bauen und sehen, ob das läuft entweder besser oder schlechter auf diesem Gerät, diesen Raum so beobachten, um zu sehen, was passiert!
