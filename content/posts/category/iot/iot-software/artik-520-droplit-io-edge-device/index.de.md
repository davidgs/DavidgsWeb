---
title: „ARTIK-520 als Droplit.io Kantenvorrichtung“
Date: 2017-03-28
Author: davidgs
Category: IoT
Tags: ARTIK, ARTIK-520, Droplit, droplit-edge, IoT
Slug: artik-520-droplit-io-edge-device
hero: images/Droplit-Logo1.png
---

Doing einige weitere Arbeit mit meinem treuen ARTIK-520 (hey, wenn Sie einen Hammer, alles sieht aus wie ein Nagel! Sichern von mir haben!) Ich beschloss, einen anderen IoT-Gateway Rahmen auf, es zu versuchen zu installieren. (Ich habe das getan [vor](/posts/category/general/making-artik-5-iot-gateway-kura/).) Chancengleichheit und das alles. Und ich werde so bald mehr von ihnen tun, wie ich mehr Mini-SD-Karten im Hause zu bekommen. Aber ich schweife ab.

Ich folgte ursprünglich nur die grundlegenden installieren [Anleitung](https://docs.droplit.io/docs/deploy-an-edge-server) für einen Droplit.io Edge-Server bereitstellen. Aber das hat nicht funktioniert. Kein Fehler von Droplit.io, um sicher zu sein. Und wirklich nicht die Schuld der ARTIK-520. Aber hier ist meine neue Regel:

** Do Not Compile / build Auf ARTIK-520 **

Es funktioniert einfach nicht immer gut enden. Es kann ein Schmerz sein, einen Cross-Compiler auf Ihrer Architektur einzurichten, aber Sie haben nur zu tun haben, dass einmal (und Glück mich, dass ich schon der ARM-Compiler Toolchain installiert hatte und die Arbeit von der Arbeit an [MyNewt](http://mynewt.apache.org/). Aber Sie werden einen Compiler für Droplit.io Rand nicht einmal benötigen. es ist alles JavaScript, so dass es ziemlich einfach ist.

## Einrichten

Sobald Sie den Droplit.io-edge wad auf Ihrem Laptop haben (oder was auch immer) und alle Voraussetzungen, es ist einfach bauen nach der [Anleitung](https://docs.droplit.io/docs/deploy-an-edge-server). Nicht wirklich, obwohl es von Ihrem Laptop läuft. Sobald ich es gebaut hatte, lief ich gerade:

```
DSimmons-Pro:~ dsimmons$ tar czf droplit.tgz droplit.io-edge
```

Und dann SFTP verwendet es die komprimierte tar-Datei über auf die ARTIK-520, un-Kompresse / tar zu kopieren und dann:

```
[root@localhost ~]# export DEBUG=droplit:*
[root@localhost ~]# cd droplit.io-edge/
[root@localhost droplit.io-edge]# node droplit-edge
droplit:router using setting host: wss://edge-ws.droplit.io/edge +0ms
droplit:router using setting ecosystem: C58c71404f57350103c9a8dda +19ms
droplit:router using setting edge id: 36:e8:d4:9e:f4:a6 +7ms
droplit:router load plugins +7ms
droplit:router droplit-plugin-philips-hue loaded +2s
droplit:router droplit-plugin-lifx loaded +85ms
droplit:router droplit-plugin-sonos loaded +2s
droplit:router droplit-plugin-wemo loaded +2s
droplit:transport-edge reconnecting... +4ms
droplit:transport-edge connected +805ms
droplit:router info < droplit-plugin-wemo:uuid:Socket-1_0-221631K0100D8A +6s
droplit:router info < droplit-plugin-wemo:uuid:Socket-1_0-221643K0101D76 +200ms
droplit:router id > uuid:Socket-1_0-221631K0100D8A -> 58da675822fea674dc071474 +62ms
droplit:router pc < uuid:Socket-1_0-221631K0100D8ABinarySwitch.switch off +59ms
droplit:router info < droplit-plugin-wemo:uuid:Lightswitch-1_0-221614K1300BE2 +181ms
droplit:router id > uuid:Socket-1_0-221643K0101D76 -> 58da675922fea674dc071475 +26ms
droplit:router pc < uuid:Socket-1_0-221643K0101D76BinarySwitch.switch off +24ms
droplit:router pc < uuid:Lightswitch-1_0-221614K1300BE2BinarySwitch.switch off +30ms
droplit:router id > uuid:Lightswitch-1_0-221614K1300BE2 -> 58da675922fea674dc071476 +130ms
```

Ich habe die DEBUG Eigenschaft, weil ich sehen wollte, was tatsächlich hinter den Kulissen vorging (plus Ich war das Debuggen tatsächlich ein Problem mit den Droplit Leute, die über aushelfen sind genial und sehr reaktions!).

Sie werden sehen, dass ** sehr ** schnell die Droplit-io Edge-Server gefunden die [Wemo](http://www.wemo.com) schaltet ich in meinem Haus bereitgestellt haben. Süss! Ich ging dann zu meinem) schaltet ich in meinem Haus bereitgestellt haben. Süss! Ich ging dann zu meinem [Droplit.io Entwickler-Portal](https://portal.droplit.io/) und:

![Safari014](/posts/category/iot-iot-software/images/Safari014.jpg)

Und da sind sie! Und ich habe festgestellt, dass ich in der Tat, sie auf und ab von hier drehen kann.

Nun, wenn jemand will, dass ich einige [Sonos](http://www.sonos.com/en-us/home) Gang oder einige

Ich kann sehen, über einige Anschlüsse zu verbinden Dinge wie meine MyNewt-basierte Geräte an den Edge-Server erstellen, aber das ist heute nicht passieren wird.

## Schlussfolgerungen

Wie üblich, ich habe die ARTIK-520 zu sein, eine ziemlich einfache und sehr vielseitig, IoT Nabe gefunden. Dies ist mein zweites Gateway-Projekt mit ARTIK-520 und, obwohl ich in einige Macken jedes Mal ausgeführt habe, es ist im Grunde ziemlich geradlinig einzurichten. Auch hier versucht ** nicht zu build / Kompilierung auf der ARTIK-520 **, wenn Sie absolut * * haben, und es ist ein relativ kleiner zu bauen. Ich habe tatsächlich Node.js von der Quelle auf der ARTIK-520 ein paar Mal gebaut und es war langsam, aber relativ schmerzlos.

[Droplit.io](http://droplit.io) ist ein ziemlich einfaches Implementierungsziel für ARTIK-520. So klein wie der eigentliche ARTIK Modul ist (abgesehen von der ganzen Zeug Entwicklungs-Board), es wäre ein ziemlich attraktives Ziel für eine Droplit.io ‚Gerät‘, obwohl ich würde ein vernünftiges Ziel für sie nicht sicher, ob der Preis-Punkt bin getroffen .

Wie gesagt, würde ich meine Hand ausprobieren auf einige Anschlüsse für andere IoT-Geräte für Droplit bauen, und ich bin sicher bei einigen anderen Gateways build / deploy auf dieser ARTIK-520 Board suchen. Bleiben Sie dran!
