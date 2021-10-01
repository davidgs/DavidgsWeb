---
title: "Drop Ziegelstein On It"
Date: 2014-11-19
Author: davidgs
Category: IoT
Tags: connectivity, Internet Anywhere, IoT
Slug: drop-a-brick-on-it
hero: images/render-2.jpg
reading_time: 3 minutes
---


Ich bin alles über Konnektivität. Ja, es gibt Zeiten, zu trennen von der Welt, aber das ist eine persönliche trennen. Anwendungen und Geräte sollen zum größten Teil, ** ** alle der Zeit verbunden sein. Aber Konnektivität ist teuer und schwer in abgelegenen Orten zu halten. Wenn Sie einen Server sich verbinden, oder Ihr Haus, gibt es viele Möglichkeiten zur Verfügung - lassen Sie uns gerade jetzt mit dem gehen, sollen wir? Das ganze ISP Monopol Problem wird hol mir nur aufgespult. Typischerweise sind diese Arten von Verbindungen schnell, zuverlässig und stabil. Meist sind sie billig und weit verbreitet zur Verfügung.

Aber wenn wir auf das Internet der Dinge aussehen (IOT) Dinge kann ein bisschen mehr squirrelly bekommen. Ja, wenn Ihre IoT-Geräte Dinge in Ihrem Hause sind, können Sie mit der Verbindung gehen Sie bereits haben. Wenn sie unternehmensbasierte sind IoT Vermögenswerte, haben Sie Ihre Enterprise-Konnektivität zu verlassen. Was ist IoT-Geräte, die entweder feldbasierte oder mobil sind? Was passiert, wenn Ihr IoT Einsatz ist in einem Dschungel in Panama? Oder das Dessert in Afrika?

Das fand ich den anderen Tag, und es scheint, wie die perfekte Lösung. Werfen Sie einen [BRCK](http://www.brck.com) auf sie! Das sieht wie ein großartiges Gerät für Remote-Verbindungen, vor allem für das Internet der Dinge oder niedrige Bandbreite von Anwendungen. Es gibt ein paar wirklich cool suchen Eigenschaften hier - und ein paar, die ich weiter untersuchen möchte, wenn ich die Zeit und das Gerät hatte. Die 8-Stunden eingebaute Batterie-Backup für dieses Gerät ein großer Gewinn in vielen entfernten Einsatzszenarien ist, sicher zu sein. Die Tatsache, dass dieses Gerät ** in ** Afrika speziell ** für ** Remote-Installationen ist auch ein großes Plus entwickelt wurde. obwohl auch hier gibt es ein paar Dinge, die ich denke, weitere Untersuchungen erforderlich.

Erstens ist die Fähigkeit, Arduino-basierte Sensoren und Geräte direkt an die Box hinzuzufügen. Also, wenn Sie mit [Zigbee](http://zigbee.org) oder) oder [IEEE 802.15.4](http://en.wikipedia.org/wiki/IEEE_802.15.4) -Geräte als Endknoten, Sie ein Tor zu diesen Geräten zu den BRCK Geräten direkt hinzufügen könnte. Wenn Sie mit) -Geräte als Endknoten, Sie ein Tor zu diesen Geräten zu den BRCK Geräten direkt hinzufügen könnte. Wenn Sie mit [BTLE](http://www.bluetooth.com/Pages/low-energy-tech-info.aspx) Geräte, könnten Sie ein BTLE-Gateway für den Zugriff auf diese Geräte als auch hinzufügen. Das war - wieder in den Tag - einer der großen Knackpunkte für viele Sensoranwendungen. Low-Power-, Low-Energie-Netzwerk-Verbindungen zu den Geräten waren schwer mit dem Internet zu überbrücken, die Daten für Backhauling. In vielen Installationen ist es immer noch. Speziell für Fernerkundung. In der Lage zu bauen-in Ihrem Internet-to-Sensor Gateway-Gerät wäre ein großer Vorteil.

Was ich würde gerne weiter untersuchen - angesichts die Zeit und das Gerät, natürlich, da IoT mein Hobby ist, nicht meine Aufgabe - ist, ob ich tatsächlich Dienstleistungen für das BRCK Gerät bereitstellen könnte. Wie die Authentifizierung, Autorisierung, Datenintegrität und IoT Gerätemanagement. Ich weiß, von ihrer Website, dass sie Cloud-basierte Tools haben - wer nicht, amirite? - Verwaltung Ihrer BRCK Geräte, und sie sagen, Sie Arduino Skizzen bis in die Box schieben kann, um angeschlossene Geräte zu verteilen, aber was ist mit diesen anderen Diensten? Was passiert, wenn ich verwenden wollte, sagen wir, [OpenAM](https://forgerock.org/openam/) und) und [OpenIDM](https://forgerock.org/openidm/) Dienstleistungen? Kann ich diese Dienste direkt an den Knoten bereitstellen? Oder könnte ich die Service-Anrufe in das Gerät Proxy für die Endknoten bauen?

Ich denke, ich werde nur diese von Geräten in die Liste aufnehmen und Technologien I ** Liebe würde ** in der Lage sein, einige Zeit mit verbringen, aber wahrscheinlich nicht die Zeit oder das Geld, zu beschäftigen.<sigh>
