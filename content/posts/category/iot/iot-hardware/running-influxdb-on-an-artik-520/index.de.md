---
title: "Running InfluxDB auf einem ARTIK-520"
Date: 2017-07-14
Author: davidgs
Category: Evangelism, IoT
Tags: Database, IoT
Slug: running-influxdb-on-an-artik-520
hero: images/open-data-1_0.png
---


Seien wir ehrlich, die IoT über Daten. I [sagte er](/posts/category/iot/you-havent-seen-big-data-yet/) nur ein paar Wochen. Es geht um Daten zu sammeln. ** Viele ** von Daten. Aber es ist eigentlich um viel mehr als nur Daten zu sammeln. Einfach ist das Sammeln von Daten wirklich nicht überall bekommen, wenn alles, was Sie es tun Collect. Um nützlich zu sein, haben IoT Daten relevant, präzise und verwertbare sein. Der letzte Teil ist der Schlüssel, wirklich. Verwertbare Daten. Um Ihre Daten umsetzbare zu machen, müssen Sie es analysieren können, vorzugsweise in Echtzeit. Jetzt ist Ihre Daten Probleme wachsen. Sie haben eine wörtliche Tsunami von Zeitreihendaten bekommen Gießen und Ihre Ausgaben all Ihre Ressourcen Einnahme es einfach. Ich bin Ihnen jetzt sagen, dass Sie müssen auch sie analysieren und Maßnahmen ergreifen, auf der Grundlage dieser Analyse * in Echtzeit * ?! Geh raus.

Sie nicht den Boten schießen. Du bist derjenige, der eine IoT Lösung bereitstellen wollten alle 10.000 Ihrer whosiwhatsits zu überwachen, nicht ich. Aber ich werde Ihnen sagen, wie es zu lösen.

## Nicht der ARTIK-520 wieder!

Ja, die ARTIK-520 wieder. Ich hatte einen Linux-Server hier im Büro, die wahrscheinlich ein schöner Ort gewesen wäre, dies zu tun, aber es ist jetzt in seine Heimat gegangen (ich nur war es zu fördern und mache es sinnvoll, vor dem Versand it off lebt ein langes und produktives Leben als ein Active Directory-Server. fragen sie nicht. Wir werden nie wieder davon sprechen). Ich hätte ein Raspberry Pi, oder sogar das [Raspberry Pi Null W](/posts/category/iot/iot-hardware/accessing-your-raspberry-pi-zero-w/), dass ich sitze hier verwendet. Wie Sie wissen, habe ich eine), dass ich sitze hier verwendet. Wie Sie wissen, habe ich eine [Fülle](/posts/category/iot/the-updated-big-board-of-iot/) von IoT-Geräte, von denen zu wählen. Ich wollte etwas mit einem wenig mehr Leistung als ein Standard-IoT * Gerät * und ich habe das Gefühl, einfach nicht mit dem Pi wie futzing. So sind Sie stecken Anhörung über die 520 wieder.

## Einrichten der Datenaufnahme und Analyse

Warten Sie, wir gehen Datenaufnahme und Analyse auf einem ARTIK-520 zu tun? Sollten wir nicht einen Server verwenden? Siehe oben. Außerdem wäre es nicht leicht interessant sein, einige Datenaufnahme und Analyse an der Nabe zu tun, bevor die Daten an das Backend gesendet wird? Kann sein. Also das ist, was wir tun werden.

Wie der Titel dieses Beitrags schon sagt, werden wir InfluxDB von [Influx Data](https://www.influxdata.com/) verwenden. Es ist Open-Source und kostenlos, wenn Sie es heraus zu versuchen. Fühlen Sie sich frei zu folgen. Warum InfluxDB? Nun, wollte ich es ausprobieren, und es behauptet, die am schnellsten wachsende Zeitreihen-Datenbank um zu sein, und ich hörte, es war ziemlich leicht zu bekommen und läuft so ich dachte ich, es würde geben ein zu gehen.

Erstens, ich werde sagen, dass es alles zum Laufen bekommen war absolut tot einfach. Wie Sie Ihre VP of Marketing kann es tun (** Inside Joke Alarm:. ** Zurück in meine Sun Tage, Gebäude Demos, die durch meine Marketing-VP war immer mein metric installierbar und ablauffähig waren liebte er es, weil er sie laufen konnte!) I alle Komponenten heruntergeladen und gestartet sie. Es gibt eine Reihe von beweglichen Teilen hier, so dass Sie sicher brauchen, um sie alle zu bekommen. Es gibt ** InfluxDB **, das ist (natürlich) die Datenbank Teil. Sortieren der Schlüssel zu der ganzen Sache. Es gibt auch ** ** Telegraf, die eine Daten Einnahme Motor ist. Dann gibt es noch ** ** Chronografen, die ein wirklich nette Visualisierung und Analyse-Tool. Endlich gibt es ** ** Kapacitor die für Sie den ganzen „Aktion“ Teil behandelt.

Ich konnte zum Herunterladen und alle Teile in ca. 5 Minuten installieren - vielleicht weniger - und bekommen die ganze Sache und läuft. Ich habe sogar mein erstes Armaturenbrett gebaut, um die CPU- und Speichernutzung der ARTIK-520 in etwa einer Minute und eine Hälfte zu überwachen.

![Influx Bild Armaturenbrett](/posts/category/database/images/Safari031.jpg)

Was sieht eigentlich wirklich gut. Besonders Diagramm der Speichernutzung. Also werde ich wohl den Speicher mit nicht überwältigen - und lassen Sie uns nicht vergessen: Ich laufe noch diese ARTIK-520 als [Openhab Server](/posts/category/iot/iot-hardware/openhab-server-artik-520/) zu steuern mein Haus.

Aber ich möchte wirklich, dies nutzen für einige aktuelle Sensordaten überwacht, nicht nur die Maschine selbst. Es passiert einfach so, dass ich ein Sensor Projekt hier auf meinem Schreibtisch haben, und es ist aktiv Datenerfassung und Protokollierung es. Protokollieren es an anderer Stelle, aber das ist zu ändern.

## Protokollierung Live-Daten

Der Sensor ich bereits eingerichtet haben und ausgeführt wird, ein, den ich schrieb über [kürzlich](/posts/category/iot/playing-with-distance/). Es ist süchtig zu einem). Es ist süchtig zu einem [Particle.io](http://particle.io/) Photon und ist die Menge an ‚Material‘ in einer Box ziemlich kontinuierlich mess (1 jede Sekunde zu lesen). Ich habe eine Datenbank für diese - ‚iotdata‘ nicht ich original? - und getestet Posting, um es von der Kommandozeile nach dem (sehr gut)) Photon und ist die Menge an ‚Material‘ in einer Box ziemlich kontinuierlich mess (1 jede Sekunde zu lesen). Ich habe eine Datenbank für diese - ‚iotdata‘ nicht ich original? - und getestet Posting, um es von der Kommandozeile nach dem (sehr gut) [Dokumentation](https://docs.influxdata.com/influxdb/v1.2/guides/writing_data/). Alles schien wie geplant zu gehen. Jetzt Live-Daten zu erhalten Streaming in!

Zuerst hatte ich ein Loch in meiner Firewall stecken zu können, um zu meiner ARTIK-520-Box bekommen von der Außenwelt. Es scheint verrückt, dass die Partikel auf der einen Seite von meinem Schreibtisch und dem ARTIK-520 ist auf der anderen Seite und meine Daten hat eine Reise rund um den Planeten zu machen, um dorthin zu gelangen, aber das ist, wie die Welt funktioniert manchmal.

Particle hat ‚Webhooks‘, dass Sie auf andere Dienste schreiben einrichten. Sie haben einige vordefinierte diejenigen für Google Apps, etc., aber keine für InfluxDB. Sie müssen das beheben, aber das ist eine andere Stelle. Ich habe versucht, mein eigenes Webhook zu definieren, aber ihr Web-Haken besteht auf Entsendung alles

```js
content-type: application/x-www-form-urlencoded
```

Und das ist nicht das, was zu erwarten ist, und es stellt sich heraus, nicht zur Arbeit. Nicht abschrecken zu lassen, gelang es mir, mit einer anderen Lösung zu kommen. Die Partikel Gerät wird seine Daten direkt an InlfuxDB posten. Wer braucht einen Zwischenhändler! Es dauert etwas mehr Code, aber es ist nicht schlecht. Hier ist, was ich zu meinem Particle Code hinzuzufügen hatte:

```cpp
#include <HttpClient.h>
...
HttpClient http;
http_header_t headers[] = {
  { "Accept" , "*/*"},
  { "User-agent", "Particle HttpClient"},
  { NULL, NULL } // NOTE: Always terminate headers will NULL
};
http_request_t request;
http_response_t response;
...
void loop(){
...
  request.body = String::format("volume_reading value=%d", getRangeReading());
  http.post(request, response, headers);
...
} 
```

Das ist alles, es dauerte! Sie werden bemerken, dass ich keine Sicherheit auf diesem Setup. ** ich nicht empfehlen es auf diese Weise tun **. Zumindest sollten Sie einen Benutzernamen / Passwort für die Authentifizierung bei der Datenbank verwenden, und Sie sollten wahrscheinlich auch mit SSL zu sein. Aber ich habe keine SSL-Zertifikat für meine ARTIK-520, und das war nur eine Übung für meinen Teil und kein echter Einsatz. Plus Ich stieß Nicht-Standard-Löcher in meiner Firewall, und glaube nicht wirklich, dass jemand los Klopfen kommen (und wenn sie es tun, werde ich es sofort sehen und sie heraus schließen kann, so bekommt keine Ideen).

Und hier ist das, was jetzt mein Armaturenbrett aussieht:

![Größere Influx-Dashboard](/posts/category/database/images/Safari033.jpg )

Ein schöner ** Echtzeit ** grafische Darstellung der eingehenden Daten von meinem Sensor. Schnell und einfach einzurichten!

## Make It umsetzbare

Bisher haben wir für die Daten Einnahme einrichten Telegraf, InfluxDB, die eigentliche Datenbank und Chronograf, die uns die kühlen Armaturenbretter von Echtzeitdaten aus unserem Sensor (e) einbringt. Aber auch hier Daten sind alle nett und Spaß, aber es das macht es umsetzbare * * die Schlüssel. Und das ist, wo Kapacitor kommt in. So, dass ich werde einzurichten nächste, so dass ich Warnungen und Benachrichtigungen erhalten, wenn das Volumen des ‚Materials‘ in meiner Box zu hoch, oder zu niedrig.

Kapacitor leider nicht über eine glatte UI Frontend, das sich auf Ihren Besuch Ihre Ergebnisse in einer visuell befriedigend Weise leicht verleiht. Aber es ist nicht weniger mächtig. Sie müssen nur Ihre ‚Aktionen‘ in TICKScript schreiben und sie dann einsetzen. So tauchen Sie ein in die Dokumentation und loslegen schon!

Die Syntax für TICK Scripts ist ein bisschen knifflig, so wirklich sicher machen, dass Sie in der Dokumentation zu diesem gelesen habe. Ernsthaft. Ich war in der Lage, in ca. 10 Minuten, 2 TICK Scripts Alarm zu schreiben, wenn die Volumenmessung unter 50 bekam (das ist ziemlich voll! Gestopft ist), oder wenn es über 210 bekam (das im Wesentlichen leer ist). Vorerst werden diese Warnungen einfach in einer Datei protokolliert, aber ich könnte genauso gut drehte sie sich um, als ein POST zu meinem Server einen Browser Warnung oder etwas anderes zu tun.

Ich würde gerne ein schickes Front-End auf Kapacitor, um zu sehen, die schnell TICK Scripts schreiben und bereitstellen macht und einfach, und das können Sie tun, um Warnungen und Dinge auf dem Chronograf Armaturenbretter, aber jetzt bin ich ziemlich glücklich mit nur Senden von Warnungen aus anderen Dingen zu.

Wenn ich wollte, könnte ich die Warnungen senden ** zurück ** mein Photon - über einen POST an den Partikeln Cloud API - das Photon habe auch eine Wirkung seines Eigen zu nehmen. Vielleicht, wenn ich einen pneumatisches habe ‚Pusher‘ das wäre allen Schub aus dem Kasten heraus würde ich genau das tun.

## Du bist dran

Hoffentlich habe ich dich auf der Straße weit genug bekommen, dass Sie Ihre eigene InfluxDB basierte Projekt für Ihre IoT Daten beginnen kann. Wenn Sie das tun, würde ich gerne davon hören!
