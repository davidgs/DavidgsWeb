---
title: "Time to Awesome with InfluxDB"
Date: 2017-12-01
Author: davidgs
Category: Evangelism, General, Work
Slug: timetoawesomeinfluxdb
hero: images/A-platform-for-Builders.png
---

[InfluxData](https://influxdata.com/) has a thing about Time to Awesome™. So much so that they Trademarked it. No, seriously, they did. And they mean it. So let's go from Zero to Awesome!

> We are singularly focused on reducing the Time to Awesome™, we truly care about helping developers and businesses get to results faster with less complexity and less code.

That’s directly from the [**About**](https://www.influxdata.com/about/) section of their website and they really do mean it! But just in case, I decided to test it out (again). I actually wrote a [whole blog post](/posts/category/iot/iot-hardware/running-influxdb-on-an-artik-520/) about how easy it was to set up InfluxDB a while back, but I thought I’d do it again, just for fun. This time, I thought I’d provide proof of how easy it is, and how fast!

## The Set Up

I have my trusty MacBook Pro on which I do just about everything, so that’s what I’m going to install it on. Here’s what I’m working with:

![MarsEditScreenSnapz001](/posts/category/database/images/MarsEditScreenSnapz001.png )

I installed and configured InfluxDB, Chronograf, Telegraf and Kapacitor, and set up a quick system-monitoring dashboard to keep track of some system stats, all in under 5 minutes.

## Here's the proof

{{< youtube DsVRTI2IgMo >}}

## Here's how I did it

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

That's it! A total of 7 commands. 3 to install the entire TICK stack -- because Chronograf has a dependency on Kapacitor, so it gets installed automatically -- and 4 to start all the services and make sure they start across reboots.

It just doesn't get any more simple than that! Add the small number of clicks to build the dashboard and you have an amazingly short Time to Awesome™!
