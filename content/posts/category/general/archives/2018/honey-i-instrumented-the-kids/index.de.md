---
Titel: "Liebling, ich habe die Kinder instrumentiert"
Datum: 2018-03-27
Kategorie: IoT
Slug: honey-i-instrumented-the-kids
Held: images/header.jpg
reading_time: 5 minutes
---

> **Dies ist das erste Mal, dass ich ChatGPT für Übersetzungen verwende. Bitte lassen Sie mich wissen, ob sie besser (oder schlechter) sind als die Google Translate-Versionen in anderen Beiträgen.**

> Dieser Beitrag wurde ursprünglich auf dem [InfluxData Blog](https://www.influxdata.com/blog/honey-i-instrumented-the-kids-with-influxdb/) veröffentlicht.

Elternsein ist hart. Es ist noch schwieriger, wenn Ihre Kinder krank sind. Aber Kinder sind Keimfabriken und egal, was Sie tun, sie werden krank. Und dann müssen Sie sie berühren und die Keime auf Sie bekommen. Und dann werden Sie krank und dann geht alles den Bach runter. Aber was, wenn Sie sie nicht berühren müssten, wenn sie krank wurden? Ahh, das wäre etwas!

Ich weiß, Sie fragen sich, warum ich darüber auf dem InfluxData-Blog schreibe, aber bleiben Sie bei mir und folgen Sie mir. Es hängt alles zusammen. Zuerst die Hintergrundgeschichte.

## Hintergrundgeschichte

Unsere besten Freunde wohnen etwa 3 oder 4 Blocks entfernt, und sie haben unter anderem Zwillinge, die ungefähr im selben Alter sind wie mein Mädchen. Zum Glück sind sie auch beste Freunde. Aber dieses Wochenende wurde erst einer, dann der andere Zwilling krank. Die echte Grippe. Sie wurden getestet und alles. Ich hatte die Grippe Anfang des Jahres und es ist wirklich nicht gut.

Einer ist nicht sehr krank, aber der andere hatte eine Temperatur von 103ºF (was für Sie metrische Leute ziemlich verdammt hoch ist!). Ihre Mutter wollte ihre Temperatur genau im Auge behalten, aber ... nun, sie wollte nicht hineingehen und sie, Sie wissen schon, berühren.

## Ich werde die Wissenschaft aus dieser Sache herausprügeln

Wenn Sie in den letzten Monaten aufmerksam mitgelesen haben, siehe [hier](https://w2.influxdata.com/blog/sending-alerts-from-kapacitor-via-mqtt/), und [hier](https://w2.influxdata.com/blog/monitoring-wireless-interfaces/), dann wissen Sie, dass ich ein IoT-Demo mit vielen Sensoren und ein IoT-Gateway zur Datenerfassung aufgebaut habe. Dann wurde ich vor etwa einem Monat eingeladen, einen Vortrag auf der [Gemeinsamen ICTP-IAEA-Schule für LoRa-fähige Strahlungs- und Umweltüberwachungssensoren](http://indico.ictp.it/event/8298/) im Adbus Salam International Centre for Theoretical Physics in Triest, Italien, zu halten. Lange Rede, kurzer Sinn, es geht alles um die Nutzung des LoRA-Netzwerks für die Fernüberwachung, also bin ich rausgegangen und habe ein paar LoRA-Platinen gekauft. Ich habe die [Adafruit RFM96W](https://www.adafruit.com/product/3073) Platinen gekauft, weil sie einfach zu handhaben schienen. Ich hatte ein paar Wemos D1 Mini Pro Platinen rumliegen (ich verlinke sie nicht, weil sie wirklich schlecht sind. Das WiFi auf ihnen funktioniert überhaupt nicht, aber das machte sie perfekt für dieses Experiment).

Diese kleinen

 Platinen haben ein 433MHz Radio, das eine ziemlich erstaunliche Reichweite hat. Ich habe es über mehrere Meilen getestet und immer noch guten Empfang bekommen. Einige von Ihnen sehen sicherlich schon, wohin das führt.

Ich hatte auch noch einige kleine Platinen aus meinen Sun SPOT Tagen herumliegen. Diese basieren auf den Melexis MLX9016 Fernthermometersensoren. Ich glaube, wir haben diese 2006 oder 2007 hergestellt.

![Sun SPOT](images/IMG_3699.jpg)

Sie sind wirklich sehr genau in der berührungslosen Temperaturmessung, also habe ich sie an ein Wemos D1 Mini Pro angeschlossen, und das LoRA-Board an das gleiche Wemos-Gerät, und hatte so einen Fernthermometer mit großer Reichweite!

Ich habe das andere LoRA-Funkgerät an ein weiteres Wemos D1 angeschlossen und das ganze Durcheinander in meine Gateway-Box gestopft:

![Gateway](images/gateway.jpg)

Jetzt habe ich 2 Antennen herausstehen - eine für LoRA und eine für WiFi und BLE - die Box hat auch einen ZWave-Empfänger darin, also ist es eine Mehrprotokoll-IoT-Datensammlungsbox.

Ich habe das interne Wemos-Gerät so eingerichtet, dass es die über das Netzwerk erhaltenen Messwerte einfach an seinen seriellen Port ausgibt, und ich nutze das Telegraf 'exec'-Plugin, um diesen seriellen Port zu lesen und die Daten in InfluxDB zu übertragen.

Ich habe dann einige Kapacitor-Alerts eingerichtet, um die Farbe auf einem GlowOrb zu ändern.

![GlowOrb](images/glowOrb.jpg)

Der GlowOrb ist eine schicke kleine Sache, die einen Wemos D1 mini - NICHT den Mini Pro!! - und ein Dreifarb-LED-Schild nutzt, so dass ich Alarme an einen MQTT-Broker senden und die Farbe ändern kann. Ich habe es einfach auf die Temperaturwerte vom Fernthermometer kalibriert!

## Einsatz der Hands-Off-Erziehungslösung

Meine Freunde sind nicht technikfremd, aber sie sind auch keine Techno-Nerds wie ich, also musste ich die Dinge einfach halten. Ich habe den Fernthermometer und den GlowOrb übernommen. Das ist es. Der GlowOrb verbindet sich mit ihrem heimischen WiFi und der Temperaturmonitor verwendet LoRA, um die Messung an mich zurück zu meinem Haus zu senden, wo InfluxDB die Daten aufzeichnet und Kapacitor die Temperaturalarme verarbeitet.

Ich habe ein einfaches Dashboard mit der Temperatur auf einem Graphen und einer Anzeige für die aktuelle Temperatur erstellt:

![Graph](images/graph.png)

Nein, ich zeige Ihnen keine echten Patientendaten. Das wäre ein Verstoß gegen die HIPPA! Was ich jedoch recht schnell feststellte, war, dass der Fernthermometer, wenn er nicht innerhalb von etwa 6" vom Kind entfernt war, um etwa 10º abwich. Also habe ich die Alarme entsprechend angepasst. Und es funktionierte perfekt.

Jetzt kann meine Freundin die Temperatur des Kindes sofort sehen und den Trend im Laufe der Zeit beobachten. Sie kann auch den GlowOrb auf ihrem Nachttisch

 oder wo auch immer aufstellen und hat so einen ständigen visuellen Hinweis auf die Temperatur des Kindes.

Und bevor ich es vergesse, hier ist, wie das Temperaturüberwachungsgerät aussieht:

![Temperature Monitor](images/temp.png)

## Schlussfolgerungen

Ich bin mir nicht sicher, ob es eine durch und durch praktikable Lösung zur Überwachung Ihrer Kinder ist, die die Grippe haben, es sei denn, Sie sind wie ich ein totaler Geek und haben zufällig die gesamte passende Ausrüstung herumliegen. Ich kenne auch niemanden, der diese Ausrüstung einfach 'herumliegen' hat, aber wenn Sie das tun, melden Sie sich bitte. Wir könnten bei der Geburt getrennt worden sein. Außerdem würde meine Frau gerne wissen, dass ich nicht die einzige Person 'so' auf dem Planeten bin.

Was mir dieses Experiment jedoch gezeigt hat, ist, dass es buchstäblich kein Ende der Dinge gibt, die ich mit InfluxDB überwachen kann. Ich würde gerne hören, was Sie tun, um Ihre Welt mit InfluxDB zu überwachen! Wenn Sie etwas Cooles machen, tweeten Sie mir bitte darüber [@davidgsIoT](https://twitter.com/davidgsIoT) und ~~wir schicken Ihnen einige coole InfluxDB-Socken~~!