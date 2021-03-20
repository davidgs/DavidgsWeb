---
title: "InfluxDB on-NOW-520 Redux"
Date: 2017-07-20
Author: davidgs
Category: Evangelism, General, IoT
Tags: ARTIK, ARTIK-520, Influx, InfluxDB, IoT
Slug: influxdb-on-artik-520-redux
hero: images/influxdata-social-share-image-square-1.jpg
---

Letzte Woche habe ich [schrieb ein Stück](/posts/category/iot/iot-hardware/running-influxdb-on-an-artik-520/) über die Installation und den Betrieb der) über die Installation und den Betrieb der [InfluxDB](http://influxdata.com) Zeitreihen-Datenbank, Einnahme, Armaturenbrett und Aktionspakete auf Ihrem ARTIK-520, aber ich brauche diesen Posten zu aktualisieren, und es ist ein bisschen mehr als nur ein paar Änderungen. Influx Daten, die die Linux-Binärdateien als Pakete für die meisten der großen Distributionen liefern, aber die ARM-Verteilung ist nur als binäres, ohne Paket Installationsskripts, etc. Ich dachte, ich würde Sie zeigen, wie (und warum) ich festgelegt, dass für meine ARTIK-520.

Ich bin sicher, könnte man das Ganze in ein [Resin.io](http://resin.io/) Build für Ihre ARTIK-520 übernehmen - und vielleicht wird, dass ein anderes Projekt für mich kurz - aber jetzt ich wollte nur sicherstellen, dass alle die Prozesse richtig ins Leben gerufen wurden, und blieb auf.

Das wurde mir wichtig, wenn ich jemanden meine geschickten Armaturenbretter leben zeigen wollte, aber die ARTIK-520 war neu gestartet, und es wurde nichts mehr läuft. Ich wollte sicherstellen, dass nicht wieder der Fall war.

Die ARTIK-520 (zumindest mir) läuft Fedora Linux. Nun technisch sollten Sie in der Lage sein, den Paket-Manager verwenden InfluxDB zu installieren, aber in diesem Fall gibt es kein Paket für ARM, so dass Sie es selbst zu tun haben. Alle die Downloads für InfluxDB, Chronograf, Telegraf und Kapacitor enthalten eine Verzeichnisstruktur mit / usr, / var und / etc Verzeichnisse, also hier ist was ich getan habe, nachdem ich alle Downloads untar'ed:

```sh
[root@localhost ~]# cd influxdb-1.2.4-1 ; cp -rp usr/* /usr ; cp -rp etc/* /etc ; cp -rp var/* /var
```

Das bringt alles an den richtigen Stellen für Zuflüsse. Jetzt nur noch auf die gleiche Sache für den kapacitor, telegraf, und Chronografen Verzeichnisse. Alles kann an der richtigen Stelle sein, aber sie werden nicht automatisch beim Booten gestartet werden, da Fedora ein systemd-basiertes Betriebssystem, so dass es wichtig ist, jedes dieser Satz aufstehen als systemd Service. Glücklicherweise ist dies nicht schwer. Sie müssen nur die Dateien im Verzeichnis / etc / systemd / Systemverzeichnis erstellen, und ich werde es für Sie noch einfacher machen, indem Sie diese Dateien zu geben.

```bash
[root@localhost system]# cat influxdb.service
[Unit]
Description=InlfuxDB service

[Service]
ExecStart=/usr/bin/influxd
NotifyAccess=main
#WatchdogSec=10
Restart=on-failure
LimitNPROC=1
ProtectHome=true
ProtectSystem=full
```

Ich habe dann eine für jede der anderen Dienste auch:

```sh
[root@localhost system]# cat telegraf.service
[Unit]
Description=Telegraf service

[Service]
ExecStart=/usr/bin/telegraf -config /etc/telegraf/telegraf.conf
NotifyAccess=main
#WatchdogSec=10
Restart=on-failure
ProtectHome=true
ProtectSystem=full

[root@localhost system]# cat chronograf.service
[Unit]
Description=Chronograf service

[Service]
ExecStart=/usr/bin/chronograf -b /var/lib/chronograf/chronograf-v1.db >/dev/null 2>&1
NotifyAccess=main
#WatchdogSec=10
Restart=on-failure
ProtectHome=true
ProtectSystem=full
```

Schließlich musste ich einfach dafür sorgen, dass systemd über diese neuen Dienste wusste, und starten Sie sie:

```sh
[root@localhost system]# systemctl enable influxes.service; systemctl start influxes.service

[root@localhost system]# systemctl enable telegraf.service ; systemctl start telegraf.service

[root@localhost system]# systemctl enable chronograf.service ; systemctl start chronograf.service
```

Dann wird eine schnelle Überprüfung mit:

```sh
[root@localhost system]# systemctl

...

influxdb.service                   loaded active running   InlfuxDB service

...

telegraf.service                   loaded active running   Telegraf service

...

chronograf.service                 loaded active running   Chronograf service
```

Und ich kann sehen, dass sie alle nach oben und läuft, und dass systemd machen ** sicher **, dass sie so bleiben, auch über Neustarts.

Ich hoffe, das hilft Ihnen, wenn Sie auch Ihre Influx DB auf einem ARTIK-520, oder sogar eine andere ARM-basierten Embedded-System bereitstellen, die systemd abhängig ist.
