---
title: "Rev'ing die Demo Hardware"
Date: 2019-06-05
Author: davidgs
Category: Evangelism, Gadgetry, IoT
Tags: IoT
Slug: reving-the-demo-hardware
hero: images/IMG_5478.jpeg
---

Wenn Sie schon mich für längere Zeit überhaupt zu lesen, werden Sie wissen, dass ich ** viel bauen ** kleine Hardware-Projekte. Gibt es einen besseren Weg, um die Fähigkeiten von IoT InfluxDB als zu bauen Hardware hervorzuheben, die Daten, die ihm ständig schreibt! Aber einige meiner Hardware Demos wurden die Jahre gekommen, und einige von ihnen wurden immer missbraucht, so dass ich beschlossen, es war Zeit, sie mit einigen neuen Hardware neu zu gestalten, werde ich auch durch Hinzufügen von LiPo-Akkus sie vollständig drahtlos machen, damit sie gehen mobil bei Präsentationen und Demos können!

Viele meiner Demos haben sich auf die treuen verlassen (und spottbillig) Wemos D1, gebaut um die ESP-8266. Wenn ich spottbillig sage, meine ich unter $ 3,00 US pro, so im Dutzend ich sich normalerweise kaufen. Aber es gibt Probleme mit ihnen. Erstens sind sie nicht 100% zuverlässig, und sie mit relativer Regelmäßigkeit tun scheitern. Deshalb habe ich in der Masse kaufen! Auch sie sind von Natur aus unsicher. So bin ich auf die ESP32-basierten Systemen zu bewegen. Sie sind etwas stärker, und ebenso leicht zu bauen off. Ich bestellte ein paar der ESP-32 Federn von Adafruit vor allem, weil sie mit einem kommen Einbau-Ladeschaltung für LiPo-Akku. Zum Glück der Code, dass läuft auf dem ESP8266 auf dem ESP32 unverändert läuft, so zumindest habe ich nicht in den Hafen nichts.

Wenn Sie folgen mir auf Twitter (und wenn nicht, warum ?! nicht), dann können Sie sehen meine letzten 7-Segment-Anzeige haben, die Daten von einem MQTT Broker liest (gespeist von InfluxDB. Mehr dazu in einem anderen Beitrag!) Und es wird angezeigt . ! [IMG 5243](/posts/category/iot/iot-hardware/images/IMG_5243.jpeg)

Ziemlich cool, aber es war ein paar Dinge fehlen. Eine Sache, war die Fähigkeit, * zu sagen, was * wurde angezeigt wird! Ich meine, Daten sind groß und alle, aber es ist nur Zahlen ohne Kontext. Aber wie er damit umgehen? Geben Sie die 14-Segment-Anzeige, die so ziemlich jedes alphanumerische Zeichen anzeigen kann, und hat den gleichen Look and Feel wie die 7-Segment-Anzeigen.

![IMG 5478](/posts/category/iot/iot-hardware/images/IMG_5478.jpeg)

Aber wenn Sie mein Armaturenbrett gesehen haben, werden Sie feststellen, dass es eine ganze Menge anderer Daten ist da, und es wäre schön, die Lage sein, zu ändern, was angezeigt wird.

![Screen Shot 2019 06 04 bei 3 14 53 Uhr](/posts/category/iot/iot-hardware/images/Screen-Shot-2019-06-04-at-3.14.53-PM.png)

Ich hatte bereits das Gerät in der Lage gemacht, um Daten auf einer anderen MQTT Nachricht basierend zu ändern, aber ich wollte etwas, das einfacher zu handhaben war. Geben Sie die taktile Taste. Ich kaufte eine ganze Reihe von ihnen in einer ganzen Reihe von Farben und ...

![IMG 5477](/posts/category/iot/iot-hardware/images/IMG_5477.jpeg)

Jetzt haben wir Tasten zu ändern, die Daten bekommen wir!

Natürlich bedeutet dies, dass ich zu Re-Design und Re-print the Box haben werden, aber das ist nur ein<checks notes> 9,5 Stunden Druckauftrag. Das Endergebnis wird ein tragbarer, drahtloser Daten-Display, mit einer passenden Legende von dem, was angezeigt wird, komplett mit einem 2500mAh LiPo-Akku, so dass er herumgereicht werden kann. Jetzt sind die Menschen daran zu hindern, es fallen und schlecht zu behandeln es. 3D Printed Fälle sind nicht so robust wie die Menschen sind sie scheinen zu denken!

Ich werde Bilder von der letzten Gerät auf meinem Twitter-Feed sein Posting, so sollten Sie besser gehen [Follow-me](https://twitter.com/intent/follow?screen_name=davidgsIoT)!
