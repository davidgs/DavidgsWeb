---
title: "Aufbau des kleinsten InfluxDB-Servers der Welt"
Date: 2020-02-13
Author: davidgs
Category: Gadgetry, IoT, Work
Slug: building-the-worlds-smallest-influxdb-server
hero: images/giant-board-pin-out-1024x690.png
reading_time: 3 minutes
---

Ich habe in meiner Zeit hier viele [InfluxDB] -Server (https://www.influxdata.com/products/influxdb-overview/) gebaut, und ich habe einige ziemlich esoterische Server gebaut, aber ich denke, ich Ich habe endlich das geschafft, was man nur als den kleinsten InfluxDB-Server der Welt bezeichnen kann! Im Sommer 2019 habe ich auf [CrowdSupply.com](https://www.influxdata.com/products/influxdb-overview/) ein Projekt für das sogenannte "Giant Board" gesehen. Es sah wirklich sehr, sehr cool aus! Ein vollständiger Single Board Computer (SBC), auf dem Linux ausgeführt wird, alles in einem Feather-Formfaktor. Ich habe es sofort unterstützt! Dann, als ich eine Sekunde darüber nachdachte, unterstützte ich es*wieder*! Also habe ich 2 dieser Dinge bekommen. Totaler Unfall, ich schwöre.

Einige Spezifikationen. Folgendes ist das Giant Board eigentlich:

** Giant Board Specs **:

- **Prozessor**: Mikrochip SAMA5D2 ARM® Cortex®-A5 Prozessor 500 MHz
- **Speicher**: 128 MB DDR2-RAM
- **Speicher**: microSD-Karte
- **Sensing**: 6 x 12-Bit-ADC mit 3,3-V-Referenz und externem Trigger
- **Aktivierung**: 4 x 16-Bit-PWM mit externem Trigger
- ** Konnektivität **: 1 x I²C, 1 x SPI, 1 x UART, mehr mit Flexcom
- **Stromversorgung**: über USB, mit Unterstützung für LiPo-Akkus
- **Betriebssystem**: Haupt-Linux-Kernel

Alles in diesem winzigen Formfaktor, den ich normalerweise für Mikrocontroller verwende!

Nun, vor ein paar Wochen sind sie angekommen! Also ein paar Unboxing-Bilder:

![GiantBoard im Paket](/posts/category/database/images/IMG_6750-768x1024.png)

Warten Sie, das Ganze passt in diese eine kleine Tasche? Ja. Nicht nur das - es gibt mehrere Teile in dieser Tasche! Und mir ist (jetzt) klar, dass diese Tasche auf dem Bild keine Skala hat, aber das ist eine Mac-Maus daneben. Ich würde das Bild noch einmal aufnehmen, aber ich habe die Taschen schon weggeworfen!

![Teile des Riesenbretts](/posts/category/database/images/IMG_6752-1-768x1024.png)

Das ist richtig: Ich habe das WiFi Feather Wing-Add-On bestellt, denn schließlich handelt es sich um ein IoT-Board - und insbesondere um einen InfluxDB-Server - ohne Netzwerk!

![Riesenbrett mit Federflügel](/posts/category/database/images/IMG_6754-1-768x1024.png)

Und nur für den Maßstab, das ist ein US-Viertel dazwischen. Das wird also mein Server*und* meine Netzwerkschnittstelle sein! Für etwas, das "Riesenbrett" genannt wird, ist es sicher klein!

Nach ein wenig Löten hatte ich alles zusammengestellt und mit der Hinzufügung einer MicroSD-Karte wurde es hochgefahren!

![Befehlszeile mit Login am Giant Board](/posts/category/database/images/Screen-Shot-2020-02-11-at-9.04.12-AM.png)

Woah! Dieses kleine Ding läuft unter Debian Linux? Warum ja, ja, das tut es! Das macht die [Installation von InfluxDB](https://docs.influxdata.com/influxdb/v1.7/introduction/installation/) sehr einfach, da wir bereits ARMv7-Binärdateien für InfluxDB und den gesamten Rest des [TICK Stack](https://www.influxdata.com/time-series-platform/)!

![Terminal zeigt den Zufluss an](/posts/category/database/images/Screen-Shot-2020-02-11-at-9.07.54-AM.png)

Ok, sicher, es hämmert gerade diese winzige CPU, aber es läuft auch!

![Live-Aufnahme eines Dashboards auf dem Giant Board](/posts/category/database/images/Kapture-2020-01-21-at-12.22.19-1024x372.gif)

Und wie Sie sehen können, läuft das Dashboard in [Chronograf](https://www.influxdata.com/time-series-platform/chronograf/), um mir einen Überblick über den Ablauf des Ganzen zu geben!

Würde ich dies nun als Produktionssystem ausführen? Absolut nicht! Wie Sie sehen, werden auf einem so kleinen Gerät viel zu viele Systemressourcen verwendet. Würde ich es als Edge-Collection- und Weiterleitungsgerät ausführen? Gut möglich. Würde ich es als eingebettetes [Telegraf](https://www.influxdata.com/time-series-platform/telegraf/) Agent-Gerät ausführen? 100% absolut. Zumal ich das auch damit machen kann:

![Riesenbrett läuft mit Batterie](/posts/category/database/images/IMG_6779-768x1024.png)

Das stimmt, ich kann es mit einer Batterie betreiben! Dazu ein wiederaufladbarer LiPo-Akku (und die Ladeschaltung ist in die Platine eingebaut!). Der Vollständigkeit halber werde ich hier eine Pinbelegung bereitstellen, damit Sie sehen können, was*noch* ich zu dieser Sache hinzufügen kann - Sensoren, Aktoren usw. -, um sie sowohl zu einem Datenknoten als auch zu einem Sensorknoten zu machen:

![Pinbelegungskarte des Riesenbretts](/posts/category/database/images/giant-board-pin-out-1024x690.png)

Als nächstes werde ich eine Version von InfluxDB 2.0 für ARMv7 erstellen und prüfen, ob dies auf diesem Gerät besser oder schlechter läuft. Sehen Sie sich also diesen Bereich an, um zu sehen, was passiert!
