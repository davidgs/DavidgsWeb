---
Title: "Go From Zero to Awesome in 5 Minutes or Less"
Date: 2017-10-20
Category: general
Slug: archives
hero: images/header.png
reading_time: 3 minutes
---

> Cet article a été initialement publié sur [le blog d'InfluxData](https://www.influxdata.com/blog/zero-awesome-in-5-minutes/) le 2017-10-20.

Chez InfluxData, nous avons un faible pour Time to Awesome™. À tel point que nous l'avons déposé. Non, sérieusement, nous l'avons fait. Et nous le pensons. Alors passons de Zéro à Génial !

> Nous nous concentrons particulièrement sur la réduction du Time to Awesome, nous nous soucions vraiment d'aider les développeurs et les entreprises à obtenir des résultats plus rapidement avec moins de complexité et moins de code.

Cela vient directement de la section À propos de notre site Web et nous le pensons vraiment ! Mais juste au cas où, j'ai décidé de le tester (encore). En fait, j'ai écrit tout un article de blog sur la facilité de configuration d'InfluxDB il y a quelque temps, mais j'ai pensé que je le referais, juste pour le plaisir. Cette fois, j'ai pensé que j'allais prouver à quel point c'est facile et rapide !

## La mise en place

J'ai mon fidèle MacBook Pro sur lequel je fais à peu près tout, c'est donc sur cela que je vais l'installer. Voici avec quoi je travaille :

![capture d'écran](images/MarsEditScreenSnapz001.png)

J'ai installé et configuré InfluxDB, Chronograf, Telegraf et Kapacitor, et mis en place un tableau de bord de surveillance rapide du système pour suivre certaines statistiques du système, le tout en moins de 5 minutes.

## Voici la preuve

https://youtu.be/DsVRTI2IgMo

## Voici comment j'ai procédé

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

C'est ça! Un total de 7 commandes. 3 pour installer l'intégralité de la pile TICK - car Chronograf dépend de Kapacitor, il s'installe donc automatiquement - et 4 pour démarrer tous les services et s'assurer qu'ils démarrent après les redémarrages.

Il n'y a rien de plus simple que ça ! Ajoutez le petit nombre de clics pour créer le tableau de bord et vous obtenez un Time to Awesome™ incroyablement court !
