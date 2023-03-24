---
Title: "Go From Zero to Awesome in 5 Minutes or Less"
Date: 2017-10-20
Category: general
Slug: archives
hero: images/header.png
reading_time: 3 minutes
---

> Dieser Beitrag wurde ursprünglich am 20.10.2017 auf [Blog von InfluxData](https://www.influxdata.com/blog/zero-awesome-in-5-minutes/) veröffentlicht.

Wir hier bei InfluxData haben etwas mit Time to Awesome™ zu tun. So sehr, dass wir es mit einem Markenzeichen versehen haben. Nein, im Ernst, das haben wir. Und wir meinen es ernst. Also lasst uns von Null auf Awesome gehen!

> Wir konzentrieren uns ausschließlich darauf, die Time to Awesome zu verkürzen. Es ist uns wirklich wichtig, Entwicklern und Unternehmen dabei zu helfen, mit weniger Komplexität und weniger Code schneller zu Ergebnissen zu gelangen.

Das ist direkt aus dem About-Bereich unserer Website und wir meinen es wirklich ernst! Aber für alle Fälle habe ich beschlossen, es (noch einmal) zu testen. Ich habe vor einiger Zeit einen ganzen Blogbeitrag darüber geschrieben, wie einfach es war, InfluxDB einzurichten, aber ich dachte, ich würde es einfach wieder tun, nur zum Spaß. Dieses Mal dachte ich, ich würde beweisen, wie einfach es ist und wie schnell!

## Die Einrichtung

Ich habe mein treues MacBook Pro, auf dem ich so ziemlich alles mache, also werde ich es darauf installieren. Hier ist, womit ich arbeite:

![Bildschirmfoto](images/MarsEditScreenSnapz001.png)

Ich habe InfluxDB, Chronograf, Telegraf und Kapacitor installiert und konfiguriert und ein schnelles Systemüberwachungs-Dashboard eingerichtet, um einige Systemstatistiken im Auge zu behalten, alles in weniger als 5 Minuten.

## Hier ist der Beweis

https://youtu.be/DsVRTI2IgMo

## So habe ich es gemacht

```bash
Davids-MacBook-Pro:~ davidgs$ brew install influxdb
 ==> Downloading https://homebrew.bintray.com/bottles/influxdb-1.3.6.high_sierra.bottle.tar.gz Already downloaded: /Users/davidgs/Library/Caches/Homebrew/influxdb-1.3.6.high_sierra.bottle.tar.gz
 ==> Pouring influxdb-1.3.6.high_sierra.bottle.tar.gz
 ==> Caveats To have launchd start influxdb now and restart at login: brew services start influxdb Or, if you don't want/need a background service you can just run: influxd -config /usr/local/etc/influxdb.conf
 ==> Summary ???? /usr/local/Cellar/influxdb/1.3.6: 9 files, 56.4MB
Davids-MacBook-Pro:~ davidgs$ brew install telegraf
 ==> Downloading https://homebrew.bintray.com/bottles/telegraf-1.4.2.high_sierra.bottle.tar.gz Already downloaded: /Users/davidgs/Library/Caches/Homebrew/telegraf-1.4.2.high_sierra.bottle.tar.gz
 ==> Pouring telegraf-1.4.2.high_sierra.bottle.tar.gz
 ==> Caveats To have launchd start telegraf now and restart at login: brew services start telegraf Or, if you don't want/need a background service you can just run: telegraf -config /usr/local/etc/telegraf.conf
 ==> Summary ???? /usr/local/Cellar/telegraf/1.4.2: 8 files, 43.2MB
Davids-MacBook-Pro:~ davidgs$ brew install chronograf
 ==> Installing dependencies for chronograf: kapacitor
 ==> Installing chronograf dependency: kapacitor
 ==> Downloading https://homebrew.bintray.com/bottles/kapacitor-1.3.3.high_sierra.bottle.1.tar.gz Already downloaded: /Users/davidgs/Library/Caches/Homebrew/kapacitor-1.3.3.high_sierra.bottle.1.tar.gz
 ==> Pouring kapacitor-1.3.3.high_sierra.bottle.1.tar.gz
 ==> Caveats To have launchd start kapacitor now and restart at login: brew services start kapacitor Or, if you don't want/need a background service you can just run: kapacitord -config /usr/local/etc/kapacitor.conf
 ==> Summary ???? /usr/local/Cellar/kapacitor/1.3.3: 6 files, 79.0MB
 ==> Installing chronograf
 ==> Downloading https://homebrew.bintray.com/bottles/chronograf-1.3.9.0.high_sierra.bottle.tar.gz Already downloaded: /Users/davidgs/Library/Caches/Homebrew/chronograf-1.3.9.0.high_sierra.bottle.tar.gz
 ==> Pouring chronograf-1.3.9.0.high_sierra.bottle.tar.gz
 ==> Caveats To have launchd start chronograf now and restart at login: brew services start chronograf Or, if you don't want/need a background service you can just run: chronograf
 ==> Summary ???? /usr/local/Cellar/chronograf/1.3.9.0: 4 files, 21.2MB
Davids-MacBook-Pro:~ davidgs$ brew services start influxdb
 ==> Successfully started `influxdb` (label: homebrew.mxcl.influxdb)
Davids-MacBook-Pro:~ davidgs$ brew services start telegraf
 ==> Successfully started `telegraf` (label: homebrew.mxcl.telegraf)
Davids-MacBook-Pro:~ davidgs$ brew services start kapacitor
 ==> Successfully started `kapacitor` (label: homebrew.mxcl.kapacitor)
Davids-MacBook-Pro:~ davidgs$ brew services start chronograf
 ==> Successfully started `chronograf` (label: homebrew.mxcl.chronograf)
Davids-MacBook-Pro:~ davidgs$
```

Das ist es! Insgesamt 7 Befehle. 3, um den gesamten TICK-Stack zu installieren – da Chronograf eine Abhängigkeit von Kapacitor hat, wird es automatisch installiert – und 4, um alle Dienste zu starten und sicherzustellen, dass sie über Neustarts hinweg gestartet werden.

Einfacher geht es nicht! Fügen Sie die kleine Anzahl von Klicks hinzu, um das Dashboard zu erstellen, und Sie haben eine erstaunlich kurze Time to Awesome™!
