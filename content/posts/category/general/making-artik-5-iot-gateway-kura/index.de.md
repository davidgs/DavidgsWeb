---
title: "Erstellen einen ARTIK-520 IoT-Gateway mit Kura"
Date: 2017-03-02
Author: davidgs
Category: IoT
Tags: ARTIK, Eclipse, Kura, Samsung
Slug: making-artik-5-iot-gateway-kura
hero: images/kura.jpg
reading_time: 9 minutes
---

Es gibt etwa eine Million Möglichkeiten, um ein IoT-Gateway Gerät zu bauen oder zu kaufen. (Eigentlich eher wie [586,000](https://www.google.com/#newwindow=1&q=iot+gateway+device&*), aber lasst uns nicht kleinlich). Jeder hat seine eigenen Vorzüge oder Fallen. Sie könnten einen kaufen, und das Risiko in eine Lösung einzige Anbieter gesperrt werden. Sie könnten einer von Grund auf neu zu bauen und dann mit mit gesattelt werden, um die Hardware zu beziehen, um die Software zu bauen, und pflegen sie dann alle und hoffen, dass Sie die richtigen Entscheidungen getroffen und dass es skaliert werden. Oder könnten Sie eine bestehende Open-Source-Lösung, wie

Ich habe vor kurzem mit der Samsung ARTIK Linie von IoT Hardware herum spielen, wie Sie vielleicht [erinnern](/posts/category/iot/winter-vacation-iot-artik-5/), so entschied ich mich, um zu sehen, wenn ich könnte drehe den), so entschied ich mich, um zu sehen, wenn ich könnte drehe den [ARTIK-520](http://www.digikey.com/product-detail/en/samsung-semiconductor-inc/SIP-KITNXB001/1510-1316-ND/5825102) in ein IoT-Gateway in einem leichten, skalierbare Art und Weise. Es wurde mir vorgeschlagen, dass ich das Eclipse-Kura-Projekt versuchen, auch wenn es nicht wirklich auf ARTIK unterstützt wurde. Ich bin eine nicht abschrecken zu lassen: „Es funktioniert nicht auf dieser Hardware“, damit ich ihm gehen geben beschlossen. Es dauerte ein paar Tage, und ein paar Treffen mit einigen der Ingenieure aus verschiedenen Teilen des Kura-Projekt, aber es stellte sich heraus, relativ einfach und unkompliziert zu sein. So, hier sind meine Erfahrungen, und eine Art ‚How To‘ es für Sie arbeiten zu bekommen, wenn Sie interessiert sind. Ich werde auch ein wenig über einige der Stärken sprechen und Schwächen sehe ich in diesem Ansatz auf dem Weg.

## Die Hardware

Zuerst über die Hardware. Ich habe einen ARTIK-520-Entwickler-Kit. Hier ist die Verminderung auf, dass, wenn Sie nicht gehen wollen [es nachschlagen](https://www.artik.io/modules/artik-520/) selbst:

- Stromeffiziente Dual Cortex®-A7 mit Wi-Fi, Bluetooth, ZigBee, Faden
- Nutzt Samsung epop Technologie zu bieten kleine Stellfläche Module: 30 mm x 25 mm
- 512 MB RAM, 4 GB Flash (eMMC)
- Enterprise-Klasse Sicherheit mit Hardware-Secure Elemente und sicheren OS
- Fedora Linux-Paket mit Konnektivität, Grafiken, Power-Management und Sicherheitsbibliotheken

Der eigentliche Entwickler-Kit verfügt über eine verdrahteten Ethernet-Port (dies wird wichtig sein, so dass diese erinnern), Mikro-USB-Anschlüsse und andere Sachen auch, aber ich werde nicht die meisten, dass in diesem Beispiel verwenden. Gerade die hervorragende folgen „[Erste Schritte](https://developer.artik.io/documentation/artik/getting-started/)“ Guide Ihr ARTIK-520 Board zum Laufen. Ich benutzen das generische Fedora 25 Bild von dieser Führung meines Board einzurichten. Ich kam auf diesem aus verschiedenen Richtungen, und hatte ein paar Fehlstarts auf dem Weg, wie ich es tat. Hier ist, wie ich die Kura-Software installiert.

## Die Software

Zunächst einmal folgt nicht dem Kura ‚Getting Started‘ Leitfaden. Es wird Sie nicht hier zu beginnen, weshalb ich nicht einmal bin es verbindet. Ich habe nie verwalten durch dieses Dokument zu erhalten und mit so etwas wie einem funktionierende Entwicklungssystem für Kura enden. Wir versuchen Kura auf einer ARTIK-520 zum Laufen zu bekommen, nicht ein Entwicklungssystem aufzubauen. Die docs passten einfach nicht der Realität für mich auf einem MacBook Pro. Als nächstes folgen nicht dem hier Erste Schritte [entweder](http://wiki.eclipse.org/Kura/Getting_Started). Ernsthaft. Oder wenn Sie tun, tun Sie nur dieses kleine Stück davon:

```
DSimmons-Pro:~ $ git clone -b develop https://github.com/eclipse/kura.git kura
DSimmons-Pro:~ $ cd kura
DSimmons-Pro:kura $ ./build-all.sh
```

Und Sie tun dies auf Ihrem Laptop, ** nicht ** die ARTIK-520 Board! Erinnere dich daran. Sie wollen nicht alles auf dem ARTIK-520 selbst zu bauen. Sie ** können **, wenn Sie wollen, glaube ich, aber es wird ein dauern * sehr * lange Zeit, und zumindest wenn ich es versuchte, hatte ich zu deaktivieren parallel Gebäude, weil es einfach nicht die Ressourcen, es zu tun . Welches ist, warum ich nicht raten, es zu tun.

Sie benötigen Java haben, und Maven etc. installiert bereits auf Ihrem Laptop, aber die Setup-Anweisungen sind einfach zu verworren und verwirrend. Zumindest auf meinem Mac ‚Gebräu Maven installieren‘ war alles, es dauerte. Die Build-all-Skript wird eine Weile dauern. Und das nicht nur eine „Tasse Kaffee“, während. Mehr wie ein „in die Turnhalle gehen“, während. Wenn ist es endlich getan, gehen Blick in kura.git / Kura / distrib / Zielverzeichnis und staunen über all die Dinge, die für Sie erstellt.

```
DSimmons-Pro:kura $ cd kura/distrib/target
DSimmons-Pro:target $ ls -l
total 4001616
```

Sagen Sie nicht, ich habe nicht Sie gewarnt! Das ist viel. Was Sie suchen in diesem Heuhaufen ist die Datei ‚kura_3.0.0-SNAPSHOT_fedora25_installer.sh‘ Das ist die Datei, die Sie auf die ARTIK-520 bewegen, über wollen. Nur FTP / SFTP / scp es da drüben, aber eigentlich nicht gehen, um es noch laufen! Das ist der nächste Abschnitt, und Sie werden diesen Abschnitt lesen wollen, bevor Sie die Installation oder Sie werden einen Tag verschwenden oder so.

## Das Tor

Wie gesagt, ich ssh nicht nur in den ARTIK-520 Board und dass Installationsprogramm ausführen. Ich war über den USB-Debug-Port angeschlossen, so dass ich nie Konnektivität verloren, aber wenn Sie die WiFi-Verbindung auf dem ARTIK-520 eingerichtet haben, und sind ssh-ed um, wenn Sie das Installationsprogramm ausführen, werden Sie eine bekommen ziemlich unangenehme Überraschung. Und hier ist, wo der verdrahtete Ethernet-Anschluss bereits erwähnt wieder ins Spiel kommt - denken Sie daran, ich dir gesagt, ich würde darauf zurückkommen. Sie absolut ** ** Muss haben, dass verdrahtet Ethernet-Port mit dem Netzwerk verbunden. Und hier ist, wo ich mit meiner nur wirklich ernst Enttäuschung registrieren, und streite mit, das Kura-Software-Paket. Hier ist es also.

Als ich es installiert ist, hatte ich bereits eingerichtet, den ARTIK-520 Board, eingerichtet das drahtlose Netzwerk bekommen, damit ich es zugreifen konnte, etc. Es ziemlich einfach ist, zu tun und gerettet habe ich ein CAT-5-Kabel zu finden und zu erhalten, dass installieren. Aber wenn ich die Kura-Installer lief, plötzlich ging alles drunter und drüber mit meiner Vernetzung. Es installiert in Ordnung, und die Kura Service fein in Betrieb genommen, aber ich konnte nicht mehr an die Box via WiFi bekommen. Whiskey, Tango, Foxtrott !? Als ich zu graben begann, bemerkte ich, dass plötzlich meine WiFi (wlan0) Schnittstelle eine statische IP von rund 172 hatte, xxx ihm zugewiesenen Bereich, nicht mein WiFi-LAN Bereich, dass es vorher hatte. Änderte es zurück, aber früher oder später würde es wieder an diese Adresse zurück. Kann den Web-UI kontaktieren Sie die Box zu konfigurieren. Die Hunde lernten eine ganze Reihe neuer Flüche und Schimpfwörter an diesem Tag.

Es stellt sich heraus, dass der Kura-Service, bei der Installation, entschieden, dass thew WiFi-Schnittstelle als neue Access Point verwendet werden sollte, so ist es eine neue IP-Adresse, eingerichtet als Access Point, und begann Werbung eine neue SSID alle gegeben wurde selbst. Ohne mich zu benachrichtigen. Ohne mich zu fragen. Ich sehe dies als ein ziemlich anti-soziales Verhalten und ich versuche, den genauen Wortlaut für einen Bug-Bericht, um herauszufinden. Bisher ist der Bugreport NSFW. Hinzufügen eine neue SSID und im Wesentlichen einen neuen Router, mein Netzwerk ist nicht schön spielen. ** I ** entscheiden, wenn ein neuer Zugangspunkt im Netzwerk erlaubt. ** I ** entscheiden, wann ein neuer Router installiert ist. Wie gesagt, ziemlich anti-soziales Verhalten. Und nur, um sicherzustellen, war ich nicht ein Problem aus etwas zu machen, das keine große Sache war, lief ich dieses Szenario an einer Reihe von anderen Netzwerken und Sicherheit Menschen, die ich kenne. Für eine Person, wurden sie alle von diesem Verhalten entsetzt. Es ist nicht okay.

Ok, schimpfen über. Ich werde von meinem Soapbox hinunterklettern.

Also, zurück zu der Aufgabe zur Hand. Sie absolut ** ** Muss haben, dass verkabelte Ethernet-Port-Setup. Dann installiere das, dann können Sie auf das Web-Benutzeroberfläche über die verdrahtete Ethernet-Adresse verbinden. Und dann, und nur dann können Sie sehen tatsächlich die Leistung und Vielseitigkeit der Verwendung von Kura als Gateway Management-Software. Nicht den Eindruck von meinem oben Unmut über die Entführung von meinem Netzwerk bekommen, dass ich Kura nicht mögen. Ganz im Gegenteil. Ich mag es eigentlich ziemlich viel. Es ist nur so wenig Spielereien, dass ich nicht gern bin.

Aber wenn Sie das Installationsprogramm ausgeführt haben, und neu gestartet Ihre ARTIK-520 und versucht, eine Verbindung hergestellt wird wahrscheinlich schnell erkennen, dass Sie nicht können. Hmmm ... Sie müssen zuerst eine Änderung der Startskript machen. so auf der ARTIK-520:

```
[root@localhost ~]# systemctl stop kura.service
[root@localhost ~]# cd /opt/eclipse/kura/bin/
[root@localhost bin]# ls
start_kura_background.sh start_kura_debug.sh start_kura.sh
```

Nun bearbeiten die start_kura_ * Skripte und alle die Zeilen, die `java sagen ändern -Xms512m -Xmx512m` zu` 256m` statt. Die ARTIK-520 hat nur 512m von Speicher (siehe oben), so versuchen, jedes letztes Stück davon zu Java zu einem `outOfMemoryException` und einem Absturz zu geben. Na sicher.

Jetzt neu starten Kura:

```
[root@localhost bin]# systemctl start kura.service
```

Also jetzt, dass ich habe, läuft Kura erfolgreich ich auf den Web-UI anmelden kann (Benutzername admin, Admin-Passwort, so dass Sie das ändern wollen, werden) ich eigentlich ein nettes Management UI habe, dass ich verwenden kann, um so zu konfigurieren, ihn selbst Box .

![Safari013](/posts/category/general/images/Safari013.jpg)

Keine Sorge, Sie werden nicht haben die „Demo“ Sachen auf Sie. Das ist etwas, was ich bin auf einer anderen Blog-Post. Ich kann die Firewall so konfigurieren, kann ich die Kontrolle über mein WiFi-Schnittstelle zurück, und eine ganze Menge anderer Dinge ringen.

Nun, wenn das, was Sie suchen eine sehr einfach, schnell und effektiv einen Access Point zu bauen, der seine eigene SSID eingerichtet wird usw. dann, aus dem Kasten heraus, Kura ist sicherlich die Art und Weise, wie es zu gehen sicherlich das tut.

Ich arbeite immer noch auf, herauszufinden, wie es zu einem Cloud-Dienst zu verbinden, und es Protokollierung von Sensordaten zu beginnen, so dass für einen anderen Posten warten müssen. Ich möchte auch versuchen, das alles als Teil eines Resin.io Deployment-Modell gebaut, aber ich bin noch nicht so weit nicht.

Bleiben Sie dran!
