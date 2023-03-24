---
Title: "Go From Zero to Awesome in 5 Minutes or Less"
Date: 2017-10-20
Category: general
Slug: archives
hero: images/header.png
reading_time: 3 minutes
---

> Dit bericht is oorspronkelijk gepubliceerd op [InfluxData's blog](https://www.influxdata.com/blog/zero-awesome-in-5-minutes/) op 20-10-2017.

Wij hier bij InfluxData hebben iets met Time to Awesome™. Zozeer zelfs dat we er een handelsmerk van hebben gemaakt. Nee, serieus, dat hebben we gedaan. En we menen het. Dus laten we van nul naar geweldig gaan!

> We zijn in het bijzonder gefocust op het verkorten van de Time to Awesome, we willen ontwikkelaars en bedrijven echt helpen om sneller resultaten te bereiken met minder complexiteit en minder code.

Dat komt rechtstreeks uit het Over-gedeelte van onze website en we menen het echt! Maar voor het geval dat, besloot ik het (opnieuw) uit te testen. Ik heb eigenlijk een hele blogpost geschreven over hoe gemakkelijk het was om InfluxDB op te zetten een tijdje geleden, maar ik dacht dat ik het nog een keer zou doen, gewoon voor de lol. Deze keer dacht ik dat ik een bewijs zou leveren van hoe gemakkelijk het is en hoe snel!

## De opzet

Ik heb mijn vertrouwde MacBook Pro waarop ik zo ongeveer alles doe, dus daar ga ik het op installeren. Hier werk ik mee:

![schermafbeelding](images/MarsEditScreenSnapz001.png)

Ik heb InfluxDB, Chronograf, Telegraf en Kapacitor geïnstalleerd en geconfigureerd, en een snel dashboard voor systeembewaking opgezet om enkele systeemstatistieken bij te houden, allemaal in minder dan 5 minuten.

## Hier is het bewijs

https://youtu.be/DsVRTI2IgMo

## Zo heb ik het gedaan

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

Dat is het! In totaal 7 commando's. 3 om de volledige TICK-stack te installeren - omdat Chronograf afhankelijk is van Kapacitor, dus het wordt automatisch geïnstalleerd - en 4 om alle services te starten en ervoor te zorgen dat ze opnieuw opstarten.

Simpeler dan dat wordt het gewoon niet! Voeg het kleine aantal klikken toe om het dashboard te bouwen en je hebt een verbazingwekkend korte Time to Awesome™!
