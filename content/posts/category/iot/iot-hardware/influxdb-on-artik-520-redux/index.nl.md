---
title: "InfluxDB on-NU-520 Redux"
Date: 2017-07-20
Author: davidgs
Category: Evangelism, General, IoT
Tags: ARTIK, ARTIK-520, Influx, InfluxDB, IoT
Slug: influxdb-on-artik-520-redux
hero: images/influxdata-social-share-image-square-1.jpg
---

Vorige week heb ik [schreef een stuk] (/ berichten / category / iot / iot-hardware / running-influxdb-on-an-artik-520 /) over het installeren en uitvoeren van de [InfluxDB](/posts/category/iot/iot-hardware/running-influxdb-on-an-artik-520/) tijdreeksen database, inname, dashboard en de actie pakketten op uw ARTIK-520, maar ik moet die post bij te werken, en het is een beetje meer dan alleen een paar wijzigingen. Influx gegevens levert de Linux binaries als pakketten voor de meeste van de grote distributies, maar de ARM distributie is net zo een binaire, zonder installatie van het pakket scripts, etc. Ik dacht dat ik je laten zien hoe (en waarom) Ik bevestigde dat voor mijn ARTIK-520.

Ik weet zeker dat je kon de hele zaak op te nemen in een [Resin.io](http://resin.io/) bouwen voor uw ARTIK-520 - en misschien is dat zal een ander project voor mij binnenkort - maar voor nu ik wilde alleen maar om ervoor te zorgen dat alle processen goed werden gelanceerd, en bleven.

Dit werd belangrijk voor mij toen ik wilde iemand mijn handige dashboards leven laten zien, maar de ARTIK-520 had gereboot, en niets meer in werking is. Ik wilde ervoor zorgen dat niet opnieuw gebeuren.

De ARTIK-520 (althans de mijne) loopt Fedora Linux. Nu technisch gezien moet je in staat om het pakket manager gebruiken om InfluxDB installeren, maar in dit geval is er geen pakket voor ARM, dus je moet het zelf doen. Alle downloads voor InfluxDB, Chronograf, Telegraf en Kapacitor bevatten een directory structuur met / usr, / var en / etc directory's, dus hier is wat ik deed nadat ik alle downloads untar'ed:

```sh
[root@localhost ~]# cd influxdb-1.2.4-1 ; cp -rp usr/* /usr ; cp -rp etc/* /etc ; cp -rp var/* /var
```

Dat krijgt alles op de juiste plaatsen voor de instroom. Nu alleen maar om hetzelfde voor de kapacitor, Telegraf en chronograf directories. Alles kan in de juiste plaats, maar ze zullen niet automatisch starten bij het opstarten, omdat Fedora is een systemd gebaseerde OS, dus het is belangrijk om elk van die set op te staan als een systemd service. Gelukkig is dit niet moeilijk. Je hoeft alleen maar de bestanden in de map / etc / systemd / system directory, en ik ga het u nog gemakkelijker te maken door het geven van je die bestanden.

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

Ik creërde toen een voor elk van de andere diensten, alsmede:

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

Tot slot, ik had net om ervoor te zorgen dat systemd wist van deze nieuwe diensten, en beginnen ze:

```sh
[root@localhost system]# systemctl enable influxes.service; systemctl start influxes.service

[root@localhost system]# systemctl enable telegraf.service ; systemctl start telegraf.service

[root@localhost system]# systemctl enable chronograf.service ; systemctl start chronograf.service
```

Dan is een snelle controle met:

```sh
[root@localhost system]# systemctl

...

influxdb.service                   loaded active running   InlfuxDB service

...

telegraf.service                   loaded active running   Telegraf service

...

chronograf.service                 loaded active running   Chronograf service
```

En ik kan zien dat ze allemaal up and running, en dat systemd zal maken **zorgen** dat ze blijven op die manier, zelfs na het opnieuw opstarten.

Ik hoop dat dit helpt u als u ook uw Influx DB bent het inzetten op een ARTIK-520, of zelfs een andere ARM-gebaseerde embedded systeem dat is systemd afhankelijk.
