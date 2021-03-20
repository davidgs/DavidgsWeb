---
title: "InfluxDB sur-NOW-520 Redux"
Date: 2017-07-20
Author: davidgs
Category: Evangelism, General, IoT
Tags: ARTIK, ARTIK-520, Influx, InfluxDB, IoT
Slug: influxdb-on-artik-520-redux
hero: images/influxdata-social-share-image-square-1.jpg
---

La semaine dernière, je [écrit un morceau](/posts/category/iot/iot-hardware/running-influxdb-on-an-artik-520/) sur l'installation et l'exécution du) sur l'installation et l'exécution du [InfluxDB](http://influxdata.com) base de données de séries chronologiques, l'ingestion, le tableau de bord et des paquets d'action sur votre ARTIK-520, mais je dois mettre à jour ce poste, et il est un peu plus que quelques modifications. Afflux de données fournit les binaires Linux sous forme de paquets pour la plupart des grandes distributions, mais la distribution ARM est comme un binaire, sans scripts d'installation de paquets, etc. Je pensais vous montrer comment (et pourquoi) je fixe mon ARTIK-520.

Je suis sûr que vous pouvez intégrer le tout dans une construction [Resin.io](http://resin.io/) pour votre ARTIK-520 - et peut-être ce sera un autre projet pour moi peu de temps - mais pour l'instant Je voulais juste vous assurer que tous les processus ont été correctement lancé, et je suis resté en place.

Cela me devient important quand je voulais montrer quelqu'un mes tableaux de bord astucieuses en direct, mais le ARTIK-520 avait redémarré, et rien ne courrais plus. Je voulais faire en sorte que ne se reproduise plus.

Le ARTIK-520 (au moins le mien) Fedora Linux fonctionne. Maintenant, techniquement, vous devriez être en mesure d'utiliser le gestionnaire de paquets à installer InfluxDB, mais dans ce cas, il n'y a pas un paquet pour ARM, donc vous devez le faire vous-même. Tous les téléchargements de InfluxDB, Chronograf, Telegraf et Kapacitor contiennent une structure de répertoire avec / usr, / var et / etc répertoires, alors voici ce que je l'ai fait après avoir untar'ed tous les téléchargements:

```sh
[root@localhost ~]# cd influxdb-1.2.4-1 ; cp -rp usr/* /usr ; cp -rp etc/* /etc ; cp -rp var/* /var
```

Cela devient tout dans les bons endroits pour afflux. Maintenant, juste la même chose pour les kapacitor, Telegraf et répertoires chronograf. Tout peut être au bon endroit, mais ils ne démarre pas automatiquement au démarrage parce que Fedora est un système d'exploitation à base de systemd, il est donc important d'obtenir chacun de ceux mis en place en tant que service systemd. Heureusement, ce n'est pas difficile. Il vous suffit de créer les fichiers dans le répertoire / etc / systemd / répertoire système, et je vais le rendre encore plus facile pour vous en vous donnant ces fichiers.

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

Je me suis alors créé un pour chacun des autres services ainsi:

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

Enfin, je devais juste faire en sorte que systemd était au courant de ces nouveaux services, et les démarrer:

```sh
[root@localhost system]# systemctl enable influxes.service; systemctl start influxes.service

[root@localhost system]# systemctl enable telegraf.service ; systemctl start telegraf.service

[root@localhost system]# systemctl enable chronograf.service ; systemctl start chronograf.service
```

Ensuite, une vérification rapide avec:

```sh
[root@localhost system]# systemctl

...

influxdb.service                   loaded active running   InlfuxDB service

...

telegraf.service                   loaded active running   Telegraf service

...

chronograf.service                 loaded active running   Chronograf service
```

Et je peux voir qu'ils sont tous et en cours d'exécution, et que systemd ferai ** ** sûr qu'ils restent de cette façon, même à travers les redémarrages.

J'espère que cela vous aide si vous déployez également votre Afflux DB sur un ARTIK-520, ou même un autre système embarqué à base d'ARM qui dépend systemd.
