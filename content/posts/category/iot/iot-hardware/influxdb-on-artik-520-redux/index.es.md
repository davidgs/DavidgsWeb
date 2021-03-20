---
title: "InfluxDB on-YA-520 Redux"
Date: 2017-07-20
Author: davidgs
Category: Evangelism, General, IoT
Tags: ARTIK, ARTIK-520, Influx, InfluxDB, IoT
Slug: influxdb-on-artik-520-redux
hero: images/influxdata-social-share-image-square-1.jpg
---

La semana pasada [escribí un artículo](/posts/category/iot/iot-hardware/running-influxdb-on-an-artik-520/) en instalar y ejecutar el) en instalar y ejecutar el [InfluxDB](http://influxdata.com) tiempo de la base de datos serie, ingestión, tablero de instrumentos y paquetes de acción de su ARTIK-520, pero tengo que actualizar ese puesto, y es un poco más que unas pocas modificaciones. La afluencia de datos suministra los paquetes binarios de Linux como para la mayoría de las distribuciones, pero la distribución de ARM es sólo como un binario, sin scripts de instalación de paquetes, etc. pensé que había que muestran cómo (y por qué) Me fijo que para mi ARTIK-520.

Estoy seguro de que podría incorporar todo el asunto en una acumulación [Resin.io](http://resin.io/) para su ARTIK-520 - y tal vez eso será otro proyecto para mí poco - pero por ahora , sólo quería asegurarse de que todos los procesos se pusieron en marcha correctamente, y quedé despierto.

Esto se convirtió en importante para mí cuando quería mostrar a alguien mis cuadros de mando ingeniosas viven, pero el ARTIK-520 había reiniciado, y nada estaba corriendo más. Quería asegurarse de que no vuelva a suceder.

El ARTIK-520 (al menos la mía) se ejecuta Fedora Linux. Ahora técnicamente debería ser capaz de utilizar el gestor de paquetes para instalar InfluxDB, pero en este caso, no es un paquete para ARM, por lo que tiene que hacer usted mismo. Todas las descargas de InfluxDB, Chronograf, Telegraf y Kapacitor contienen una estructura de directorio con / usr, / var y / etc directorios, así que esto es lo que hice después de untar'ed todas las descargas:

```sh
[root@localhost ~]# cd influxdb-1.2.4-1 ; cp -rp usr/* /usr ; cp -rp etc/* /etc ; cp -rp var/* /var
```

Eso hace que todo en los lugares adecuados para la afluencia. Ahora sólo para lo mismo para los directorios kapacitor, Telegraf, y chronograf. Todo puede estar en el lugar correcto, pero no se iniciará automáticamente en el arranque debido a Fedora es un sistema operativo basado en systemd, por lo que es importante para obtener cada uno de los establecidos como un servicio systemd. Afortunadamente, esto no es difícil. Sólo tiene que crear los archivos en el directorio / etc / systemd / sistema, y voy a hacer que sea aún más fácil para usted por que le da esos archivos.

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

Entonces creé una para cada uno de los otros servicios, así:

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

Por último, sólo tenía que asegurarse de que systemd sabía de estos nuevos servicios, y empezar a ellas:

```sh
[root@localhost system]# systemctl enable influxes.service; systemctl start influxes.service

[root@localhost system]# systemctl enable telegraf.service ; systemctl start telegraf.service

[root@localhost system]# systemctl enable chronograf.service ; systemctl start chronograf.service
```

A continuación, una comprobación rápida con:

```sh
[root@localhost system]# systemctl

...

influxdb.service                   loaded active running   InlfuxDB service

...

telegraf.service                   loaded active running   Telegraf service

...

chronograf.service                 loaded active running   Chronograf service
```

Y puedo ver que todos están en funcionamiento, y que systemd haré ** ** seguro de que se mantengan de esa manera, incluso en los reinicios.

Espero que esto le ayuda si también está desplegando su Afluencia DB en una ARTIK-520, o incluso otro sistema basado en ARM implícito que se systemd-dependiente.
