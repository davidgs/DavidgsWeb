---
title: "Time to Ehrfürchtig mit InfluxDB"
Date: 2017-12-01
Author: davidgs
Category: Evangelism, General, Work
Slug: time-to-awesome-influxdb
hero: images/A-platform-for-Builders.png
reading_time: 3 minutes
---

[InfluxData](https://influxdata.com/) eine Sache, über Zeit zu Super ™. So sehr, dass sie es Trademarked. Nein, im Ernst, sie taten. Und sie meint es ernst. Lassen Sie sich also von Null auf Ehrfürchtig gehen!

> Wir einzeln fokussiert werden, um die Zeit zu ehrfürchtig auf die Reduzierung ™, wir kümmern uns wirklich um Entwicklern zu helfen und Unternehmen mit weniger Komplexität und weniger Code Ergebnisse schneller.

Das ist direkt aus dem [**über**](https://www.influxdata.com/about/) Abschnitt ihrer Website und sie es wirklich bedeuten! Aber nur für den Fall, habe ich beschlossen, es zu testen (wieder). Ich schrieb tatsächlich eine) Abschnitt ihrer Website und sie es wirklich bedeuten! Aber nur für den Fall, habe ich beschlossen, es zu testen (wieder). Ich schrieb tatsächlich eine [ganz Blog-Post](/posts/category/iot/iot-hardware/running-influxdb-on-an-artik-520/) darüber, wie einfach war es InfluxDB eine Weile zurück zu gründen, aber ich dachte, ich würde es wieder tun, nur so zum Spaß. Dieses Mal dachte ich, ich Beweis dafür, wie schaffen würde einfach es ist, und wie schnell!

## Die Einrichtung

Ich habe meine treuen MacBook Pro, auf dem ich gerade über alles, so dass das, was ich es installieren auf. Hier ist, was ich arbeite mit:

![MarsEditScreenSnapz001](/posts/category/database/images/MarsEditScreenSnapz001.png )

Ich installiert und InfluxDB, Chronograf, Telegraf und Kapacitor konfiguriert, und legen Sie einen schnellen Systemüberwachung Armaturenbrett bis Spur einiger Systemstatistiken zu halten, die alle in weniger als 5 Minuten.

## Hier ist der Beweis

{{< youtube DsVRTI2IgMo >}}

## Hier ist, wie ich es tat

```shell
Davids-MacBook-Pro:~ davidgs$ brew install influxdb 
  ==> Downloading https://homebrew.bintray.com/bottles/influxdb-1.3.6.high_sierra.bottle.tar.gz
    Already downloaded: /Users/davidgs/Library/Caches/Homebrew/influxdb-1.3.6.high_sierra.bottle.tar.gz 
  ==> Pouring influxdb-1.3.6.high_sierra.bottle.tar.gz
  ==> Caveats To have launchd start influxdb now and restart at login: brew services start influxdb Or, if you don't want/need a background service you can just run: influxd -config /usr/local/etc/influxdb.conf 
  ==> Summary 🍺 /usr/local/Cellar/influxdb/1.3.6: 9 files, 56.4MB
Davids-MacBook-Pro:~ davidgs$ brew install telegraf 
  ==> Downloading https://homebrew.bintray.com/bottles/telegraf-1.4.2.high_sierra.bottle.tar.gz
    Already downloaded: /Users/davidgs/Library/Caches/Homebrew/telegraf-1.4.2.high_sierra.bottle.tar.gz
  ==> Pouring telegraf-1.4.2.high_sierra.bottle.tar.gz
  ==> Caveats To have launchd start telegraf now and restart at login: brew services start telegraf Or, if you don't want/need a background service you can just run: telegraf -config /usr/local/etc/telegraf.conf
  ==> Summary 🍺 /usr/local/Cellar/telegraf/1.4.2: 8 files, 43.2MB
Davids-MacBook-Pro:~ davidgs$ brew install chronograf
  ==> [Installing dependencies for chronograf:**kapacitor** 
  ==> Installing chronograf dependency: **kapacitor** 
  ==> Downloading https://homebrew.bintray.com/bottles/kapacitor-1.3.3.high_sierra.bottle.1.tar.gz
    Already downloaded: /Users/davidgs/Library/Caches/Homebrew/kapacitor-1.3.3.high_sierra.bottle.1.tar.gz
  ==> Pouring kapacitor-1.3.3.high_sierra.bottle.1.tar.gz
  ==> Caveats To have launchd start kapacitor now and restart at login: brew services start kapacitor Or, if you don't want/need a background service you can just run: kapacitord -config /usr/local/etc/kapacitor.conf
  ==> Summary  🍺 /usr/local/Cellar/kapacitor/1.3.3: 6 files, 79.0MB
  ==> Installing **chronograf** 
  ==> Downloading https://homebrew.bintray.com/bottles/chronograf-1.3.9.0.high_sierra.bottle.tar.gz
    Already downloaded: /Users/davidgs/Library/Caches/Homebrew/chronograf-1.3.9.0.high_sierra.bottle.tar.gz
  ==> Pouring chronograf-1.3.9.0.high_sierra.bottle.tar.gz
  ==> Caveats To have launchd start chronograf now and restart at login: brew services start chronograf Or, if you don't want/need a background service you can just run: chronograf
  ==> Summary 🍺 /usr/local/Cellar/chronograf/1.3.9.0: 4 files, 21

Davids-MacBook-Pro:~ davidgs$ brew services start influxdb 
  ==> Successfully started `influxdb` (label: homebrew.mxcl.influxdb)
Davids-MacBook-Pro:~ davidgs$ brew services start telegraf
  ==> Successfully started `telegraf` (label: homebrew.mxcl.telegraf)
Davids-MacBook-Pro:~ davidgs$ brew services start kapacitor
  ==> Successfully started `kapacitor` (label: homebrew.mxcl.kapacitor
Davids-MacBook-Pro:~ davidgs$ brew services start chronograf
  ==> Successfully started `chronograf` (label: homebrew.mxcl.chronograf)
Davids-MacBook-Pro:~ davidgs$
```

Das ist es! Insgesamt 7 Befehle. 3 den gesamten TICK Stack zu installieren - da Chronograf eine Abhängigkeit von Kapacitor hat, so dass es automatisch installiert wird - und 4, um alle Dienste zu starten und sicherstellen, dass sie über mehrere Neustarts starten.

Es funktioniert einfach nicht mehr einfach als das! Fügen Sie die kleine Anzahl von Klicks das Dashboard zu bauen, und Sie haben erstaunlich kurze Zeit zu Super ™!
