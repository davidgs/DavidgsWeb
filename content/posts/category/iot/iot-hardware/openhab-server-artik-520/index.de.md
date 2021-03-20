---
title: "Openhab Server auf LÄNGER-520"
Date: 2017-03-28
Author: davidgs
Category: IoT
Tags: ARTIK, ARTIK-520, IoT, openHAB
Slug: openhab-server-artik-520
hero: images/logo-2.png
---

Wie ich bereits sagte, wenn man einen Hammer hat ... beschlossen Also ich noch einen weiteren IoT-Gateway einzurichten. Dieses Mal habe ich einen Blick nahm an [Openhab](http://www.openhab.org) der „Anbieter und Technologie agnostisch Open-Source-Automatisierungssoftware für Ihr Zuhause.“ Warum nicht, nicht wahr? Ich habe bereits einen) der „Anbieter und Technologie agnostisch Open-Source-Automatisierungssoftware für Ihr Zuhause.“ Warum nicht, nicht wahr? Ich habe bereits einen [Droplit.io Edge-Server](/posts/category/iot/iot-software/artik-520-droplit-io-edge-device) und ein) und ein [Eclipse-Kura-Server](/posts/category/general/making-artik-5-iot-gateway-kura/), also warum gibt nicht einen mehr einen Versuch richtig? Richtig. Also lassen Sie uns tauchen.

## Einrichten

Setup war unglaublich einfach. Fast unheimlich einfach. Ernsthaft. Wie immer begann ich mit dem Grund ARTIK Fedora Bild, und natürlich ist es aktualisiert mit den neuesten:

```
[root@localhost ~]# dnf update
```

Das dauert eine Weile.

** Hinweis: ** I mit einem frischen O für jedes dieser Projekte starten. Dank der Lage, [ein laufendes System Dump](/posts/category/general/how-to-save-your-artik-520-backup/) wieder heraus zu Mini-SD-Karte, ich Dump genau das, was ich gerade arbeitete auf eine Karte, eine neue Karte verbrennen, und von vorn beginnen.

Sie gehen zu müssen, dass Zulu JVM Ich sprach über [früher](/posts/gategory/iot/make-your-artik-520-scream/). Die Installation ist schnell und einfach, aber es nicht überspringen! Anscheinend ist die Open-JDK-Version der JVM wird nicht wirklich Ihnen viel Freude mit Openhab geben. Ich habe es nicht ausprobiert, Ich habe gerade die Zulu JVM und ging weiter. Im Fall vergessen haben, sobald Sie). Die Installation ist schnell und einfach, aber es nicht überspringen! Anscheinend ist die Open-JDK-Version der JVM wird nicht wirklich Ihnen viel Freude mit Openhab geben. Ich habe es nicht ausprobiert, Ich habe gerade die Zulu JVM und ging weiter. Im Fall vergessen haben, sobald Sie [die Zulu JVM heruntergeladen](https://www.azul.com/products/zulu/)

```
[root@localhost ~]# tar xvf ezdk-1.8.0_112-8.19.0.31-eval-linux_aarch32hf.tar
[root@localhost ~]# update-alternatives --install /usr/bin/java java ~/ezdk-1.8.0_112-8.19.0.31-eval-linux_aarch32hf/jre/bin/java 100
[root@localhost ~]# update-alternatives --config java
```

Die einzige zusätzliche Paket, das Sie gehen zu müssen, ist unzip, weil jemand dachte, es wäre eine gute Idee, * nicht * enthalten unzip (oder was das betrifft ZIP-Datei) in dem Basisbild. Was auch immer.

```
[root@localhost ~]# dnf install unzip
```

Einfach. Getan. Dann erhalten die Openhab Server. Die Anweisungen für diese installieren sind [hier](http://docs.openhab.org/installation/linux.html#manual-installation), aber Sie wirklich alles, was ich sage Ihnen wissen müssen.

```
[root@localhost ~]# cd /tmp
[root@localhost /tmp]# wget -O openhab-download.zip https://bintray.com/openhab/mvn/download_file?file_path=org%2Fopenhab%2Fdistro%2Fopenhab%2F2.0.0%2Fopenhab-2.0.0.zip
[root@localhost /tmp]# unzip openhab-download.zip -d /opt/openhab2
[root@localhost /tmp]# rm openhab-download.zip
```

Die Anweisungen sagen einen Openhab Benutzer zu erstellen, und dann den Openhab Server als dieser Benutzer ausgeführt werden. Tun Sie das nicht. Ich denke, man herausfinden kann, wie, aber wenn ich es tat, ich wurde immer:

```
/opt/openhab2/runtime/bin/karaf: line 28: cd: /root: Permission denied
: JAVA_HOME is not valid: /root/ezdk-1.8.0_112-8.19.0.31-eval-linux_aarch32hf/jre/
```

So schließlich lief ich es nur als root. Es funktioniert gut als root.

Das ist wirklich alles, was es auch war es! Ihr sagt, es ist ganz einfach!

## Mit Openhab

Dies ist, wo die Dinge bekommen Spaß! Sobald der Openhab Server gestartet wurde, angeschlossen ich zum ARTIK-520 mein Browser (Port 8080, nur FYI) und ** ** Voilà! Ich hatte ein Armaturenbrett Sorten. Aber da war nichts. Hmmm ... okay, so musste ich einige „Bindungen“ gehen zu installieren.

![Safari017](/posts/category/iot/iot-hardware/images/Safari017.jpg)

Da sind viele von denen. Ich entschied mich für die, die für die Sachen, die ich habe. Ein Samsung-TV, einige Nest Stuff und diejenigen Wemo schaltet. Sobald ich diese Bindungen installiert, begann Sachen in meinem „Posteingang“ zeigt nach oben. Wie, sofort! Was auftauchten waren sofort die Wemo schaltet. Sobald ich die Netzwerkverbindung auf meinem Samsung TV befestigt ist, es auch sofort auftauchte. Das Nest Material wird ein wenig mehr Arbeit zu nehmen, da ich als Nest Entwickler registrieren hatte, und ich habe nicht fertig Springen durch alle ihre Reifen nur noch. Aber die Bindungen sind installiert:

![Safari016](/posts/category/iot/iot-hardware/images/Safari016.jpg) "Safari016.jpg")

Ich installierte die Z-Wave binging aus Gründen, die mir jetzt entkommen. Komm damit klar.

![Safari015](/posts/category/iot/iot-hardware/images/Safari015.jpg)

Und die sind alle Geräte, die erschienen. Und jetzt kann ich sie kontrollieren!

## Schlussfolgerungen

Die Kura Server dauerte eine Woche oder zwei zum Laufen zu bringen, mit einer angemessenen Menge Unterstützung von den Eclipse-Ingenieure verantwortlich. Es war wirklich nicht auf einer Embedded-Plattform wie die ARTIK-520 zu laufen entworfen und war dort nie getestet worden, so dass es nicht wirklich überraschend ist.

Der Droplit.io Edge Server hat mich etwa eine Woche. Eigentlich installiert das war ziemlich einfach, wenn ich aufgegeben zu versuchen, das System auf der ARTIK-520 zu bauen. Denken Sie daran, meine Regel: Do not build / Kompilierung auf ARTIK-520, wenn es unbedingt notwendig ist. Dann dauerte es ein paar Tage, um einen Fehler zu bekommen ausgearbeitet, so könnte es meine Wemo-Schalter finden, aber das ist alles, es würde zu finden.

Der Openhab Server war bei weitem die einfachste. Es dauerte etwa 2 Stunden, von Anfang bis Ende, einschließlich Gebäuden / Blink- / das Betriebssystem zu aktualisieren. Und es fand fast sofort viel mehr Geräte (sobald ich die Bindungen installieren herausgefunden. Ich nicht immer lesen ** alle ** die Anweisungen.). Es ist ** sehr ** reaktionsschnell und leicht zu behandeln.

Ich habe ein paar mehr Sachen hierher gelangt sind, zu untersuchen, wie die ‚experimentelle‘ Regel-Engine, und ich kann den Text-to-Speech Integration ausprobieren, wenn ich Zeit habe.

In aller Ehrlichkeit, kann dies mein letzter ARTIK-520 Integrationstest für eine Weile sein. Sie sind nicht wirklich bezahlen mich, sie zu tun. In der Tat, zahlt mir niemand etwas jetzt zu tun, so, bis ich ** ** dass bekommen fixiert, ich werde wahrscheinlich die meiste Zeit der Arbeitssuche verbringen. Und vielleicht etwas mehr Zeit auf dem resistbot Projekt. Das ist alles leicht reparierbar, wenn mich jemand mieten entscheiden würde. :-)
