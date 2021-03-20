---
title: "Time to impressionnant avec InfluxDB"
Date: 2017-12-01
Author: davidgs
Category: Evangelism, General, Work
Slug: time-to-awesome-influxdb
hero: images/A-platform-for-Builders.png
---

[InfluxData](https://influxdata.com/) a une chose à propos de Time to ™ impressionnant. Tant et si bien qu'ils Trademarked il. Non, sérieusement, ils l'ont fait. Et ils veulent dire ce. Donc, nous allons aller de zéro à Awesome!

> Nous sommes singulièrement concentrés sur la réduction du temps Awesome ™, nous nous soucions vraiment d'aider les développeurs et les entreprises à obtenir des résultats plus rapidement avec moins de complexité et moins de code.

C'est directement à partir du [**A propos de**](https://www.influxdata.com/about/) section de leur site Web et ils ne signifie vraiment le! Mais juste au cas où, j'ai décidé de le tester (encore une fois). Je l'ai écrit en fait un) section de leur site Web et ils ne signifie vraiment le! Mais juste au cas où, j'ai décidé de le tester (encore une fois). Je l'ai écrit en fait un [après tout blog](/posts/category/iot/iot-hardware/running-influxdb-on-an-artik-520/) sur la façon dont il était facile de mettre en place InfluxDB un certain temps, mais je pensais Je le ferais à nouveau, juste pour le plaisir. Cette fois, je pensais que je fournir une preuve de la façon dont il est facile, et à quelle vitesse!

## La mise en place

J'ai mon MacBook Pro sur lequel fidèle que je fais à peu près tout, de sorte que ce que je vais l'installer sur. Voici ce que je travaille avec:

![MarsEditScreenSnapz001](/posts/category/database/images/MarsEditScreenSnapz001.png )

Je l'ai installé et configuré InfluxDB, Chronograf, Telegraf et Kapacitor, et mettre en place un tableau de bord du système de surveillance rapide de garder une trace de quelques statistiques du système, tout en moins de 5 minutes.

## Voici la preuve

{{< youtube DsVRTI2IgMo >}}

## Voici comment je l'ai fait

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

C'est tout! Un total de 7 commandes. 3 pour installer l'ensemble de la pile TICK - parce que Chronograf a une dépendance à l'égard Kapacitor, il est installé automatiquement - et 4 pour démarrer tous les services et assurez-vous qu'ils commencent à travers les redémarrages.

Il ne comprend tout simplement pas plus simple que ça! Ajouter le petit nombre de clics pour construire le tableau de bord et vous avez un temps étonnamment court Awesome ™!
