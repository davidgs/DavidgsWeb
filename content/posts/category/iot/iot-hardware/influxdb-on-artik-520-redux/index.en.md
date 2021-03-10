---
title: "InfluxDB on ARTIK-520 Redux"
Date: 2017-07-20
Author: davidgs
Category: Evangelism, General, IoT
Tags: ARTIK, ARTIK-520, Influx, InfluxDB, IoT
Slug: influxdb-on-artik-520-redux
hero: images/influxdata-social-share-image-square-1.jpg
---

Last week I [wrote a piece](/posts/category/iot/iot-hardware/running-influxdb-on-an-artik-520/) on installing and running the [InfluxDB](http://influxdata.com) time series database, ingestion, dashboard and action packages on your ARTIK-520, but I need to update that post, and it's a bit more than just a few edits. Influx Data supplies the Linux binaries as packages for most of the major distributions, but the ARM distribution is just as a binary, with no package installation scripts, etc. I thought I'd show you how (and why) I fixed that for my ARTIK-520.

I'm sure you could incorporate the whole thing into a [Resin.io](http://resin.io/) build for your ARTIK-520 -- and maybe that will be another project for me shortly -- but for now, I just wanted to make sure that all the processes were properly launched, and stayed up. 

This became important to me when I wanted to show someone my nifty dashboards live, but the ARTIK-520 had rebooted, and nothing was running anymore. I wanted to make sure that didn't happen again.

The ARTIK-520 (at least mine) runs Fedora Linux. Now technically you should be able to use the package manager to install InfluxDB, but in this case, there isn't a package for ARM, so you have to do it yourself. All the downloads for InfluxDB, Chronograf, Telegraf and Kapacitor contain a directory structure with /usr, /var and /etc directories, so here's what I did after I untar'ed all the downloads:

```sh
[root@localhost ~]# cd influxdb-1.2.4-1 ; cp -rp usr/* /usr ; cp -rp etc/* /etc ; cp -rp var/* /var
```

That gets everything in the right places for influxes. Now just to the same thing for the kapacitor, telegraf, and chronograf directories. Everything may be in the right place, but they won't automatically start at boot time because Fedora is a systemd based OS, so it's important to get each one of those set up as a systemd service. Luckily, this isn't hard. You just need to create the files in the /etc/systemd/system directory, and I'm going to make it even easier for you by giving you those files. 

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

I then created one for each of the other services as well:

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

Finally, I just had to make sure that systemd knew about these new services, and start them:

```sh
[root@localhost system]# systemctl enable influxes.service; systemctl start influxes.service

[root@localhost system]# systemctl enable telegraf.service ; systemctl start telegraf.service

[root@localhost system]# systemctl enable chronograf.service ; systemctl start chronograf.service
```

Then a quick check with:

```sh
[root@localhost system]# systemctl

...

influxdb.service                   loaded active running   InlfuxDB service

...

telegraf.service                   loaded active running   Telegraf service

...

chronograf.service                 loaded active running   Chronograf service
```

And I can see that they are all up and running, and that systemd will make **sure** that they stay that way, even across reboots. 

I hope this helps you if you're also deploying your Influx DB on an ARTIK-520, or even another ARM-based embedded system that is systemd-dependent.
