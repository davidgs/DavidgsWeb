---
title: "Time to Awesome met InfluxDB"
Date: 2017-12-01
Author: davidgs
Category: Evangelism, General, Work
Slug: time-to-awesome-influxdb
hero: images/A-platform-for-Builders.png
reading_time: 3 minutes
---

[InfluxData](https://influxdata.com/) heeft een ding over Time to Awesome ™. Zozeer zelfs dat ze handelsmerk het. Nee, serieus, ze deden. En ze betekenen. Dus laten we gaan van nul tot Awesome!

> We zijn singulier gefocust op het verminderen van de Time to Awesome ™, we echt zorg over het helpen van ontwikkelaars en bedrijven krijgen om sneller resultaten met minder complexiteit en minder code.

Dat is direct uit de sectie [** Over **](https://www.influxdata.com/about/) van hun website en ze doen echt meen het! Maar voor het geval, heb ik besloten om het uit (weer) te testen. Ik schreef zelfs een [hele blog post] (/ berichten / category / iot / iot-hardware / running-influxdb-on-an-artik-520 /) over hoe gemakkelijk het was om het opzetten van InfluxDB een tijdje terug, maar ik dacht ik zou het opnieuw doen, gewoon voor de lol. Deze keer, ik dacht dat ik zou het bewijs van hoe gemakkelijk het is, en hoe snel aan te bieden!

## De opzet

Ik heb mijn trouwe MacBook Pro waarop ik zo ongeveer alles, dus dat is wat ik ga om het te installeren op. Hier is wat ik werk met:

![MarsEditScreenSnapz001](/posts/category/database/images/MarsEditScreenSnapz001.png )

Ik geïnstalleerd en geconfigureerd InfluxDB, Chronograf, Telegraf en Kapacitor, en het opzetten van een snelle dashboard-systeem voor het bewaken van het bijhouden van een aantal systeem statistieken van alle in te houden, minder dan 5 minuten.

## Hier is het bewijs

{{< youtube DsVRTI2IgMo >}}

## Hier is hoe ik het heb gedaan

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

Dat is het! Totaal 7 opdrachten. 3 om het hele TIK stack te installeren - omdat Chronograf heeft een afhankelijkheid van Kapacitor, zodat deze automatisch wordt geïnstalleerd - en 4 om alle diensten te starten en zorg ervoor dat ze beginnen met het opnieuw opstarten.

Het werkt gewoon niet simpeler dan dat! Voeg het kleine aantal klikken op het dashboard te bouwen en je hebt een ongelooflijk korte tijd naar Awesome ™!
