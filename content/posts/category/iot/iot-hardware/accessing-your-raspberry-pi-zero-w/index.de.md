---
title: „Zugriff auf Ihre Raspberry Pi Null W“
Date: 2017-04-12
Author: davidgs
Category: IoT
Tags: IoT, Raspberry Pi
Slug: accessing-your-raspberry-pi-zero-w
hero: images/pi_zero_w_board.jpg
reading_time: 2 minutes
---

Wenn Sie Glück haben genug, um Ihre Hände auf einem Raspberry Pi Null W zu bekommen, dann könnten Sie dies genießen. Wenn Sie immer noch für einen warten, setzen Lesezeichen setzen. Es sei denn, Sie zufällig herumliegen zusätzliche HDMI-Monitore, Tastaturen und Mäuse haben. Ich weiß nicht, so zu konfigurieren Mine ein Schmerz im Arsch war. Ich habe diesen Schmerz für Sie gelöst, so lesen Sie weiter.

Erstens, natürlich, werden Sie zum Download benötigen und das neueste [Raspian-O] installieren (https://www.raspberrypi.org/downloads/raspbian/). Ich weiß nicht, ob Noobs funktioniert oder nicht, so YMMV dort. Als nächstes brennt die SD-Karte mit der Karten-Schreib-Software Ihrer Wahl. Informieren Sie sich über diese [hier](https://www.raspberrypi.org/downloads/raspbian/). Nun, wenn die SD-Karte abgeschlossen ist, ist hier, wie leicht machen Ihr Raspberry Pi Null W auf Ihrem Wireless-Netzwerk zeigen, und lassen Sie es anmelden ** ohne ** mit einem Monitor, Tastatur, usw.

Zuerst montieren Sie die SD-Karte, dann werden Sie zwei Dateien im Verzeichnis / boot-Partition erstellen möchten. Die erste wird Ihr Pi Null W auf Ihrem drahtloses Netzwerk.

```
$ cat spa_supplicant.conf
network={
    ssid=<Your SSID Name>
    psk=<Your WiFi Password>
}
```
Auch hier soll die Datei im Verzeichnis / boot-Partition der Raspian SD-Karte platziert werden. Als Nächstes werden Sie in der Lage sein wollen, das Ding anzumelden, so

```
$ touch /boot/ssh
```

Sie stellen eigentlich alles, was Sie in dieser Datei werden sollen, oder gar nichts. Solange sie existiert, werden Sie in Ordnung sein.

Jetzt können Sie aushängen und Auswerfen der SD-Karte, und Pop in Ihre Pi Null W, Stecker, kleines Ding in, und es sollte Ihr WiFi-Netzwerk booten und verbinden. Sobald es ist, können Sie in es ssh (username ‚pi‘, das Passwort ‚Himbeere‘ natürlich), und Sie sind bereit zu gehen!

Ich mag, um die Dinge einfach und gehen Sie vor und installieren Sie einen VNC-Server auf dem Pi Null W so, dass ich eine vollständige Desktop auf es von meinem Laptop zu bekommen, aber die Hauptsache für mich, in der Lage sein, die Sache zu bringen, ohne Monitor, Tastatur und Maus! Vielleicht eines Tages werden die Raspberry Pi Leute ermöglichen nur einen der USB-Ports als Terminal aus der Box, so dass wir dies nicht zu tun haben. Ein Mann kann träumen.
