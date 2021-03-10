---
title: "Building the World's Smallest InfluxDB Server"
Date: 2020-02-13
Author: davidgs
Category: Gadgetry, IoT, Work
Slug: building-the-worlds-smallest-influxdb-server
hero: images/giant-board-pin-out-1024x690.png
---

I've built a lot of [InfluxDB](https://www.influxdata.com/products/influxdb-overview/) servers in my time here, and I've built some pretty esoteric ones at that, but I think I've finally pulled off what can only be described as the World's Smallest InfluxDB Server! Back in the summer of 2019, I saw a project on [CrowdSupply.com](https://www.crowdsupply.com/groboards/giant-board) for something called the 'Giant Board'. It looked really, really cool! A complete Single Board Computer (SBC) that ran Linux, all in a Feather form factor. I immediately backed it! Then, thinking about it for a second, I backed it *again*! So I got 2 of these things. Total accident, I swear.

Some specs. Here's what the Giant Board actually is:

**Giant Board Specs**:

- **Processor**: Microchip SAMA5D2 ARM® Cortex®-A5 Processor 500 MHz
- **Memory**: 128 MB DDR2 RAM
- **Storage**: microSD card
- **Sensing**: 6 x 12-bit ADC with 3.3 V reference and external trigger
- **Actuation**: 4 x 16-bit PWM with external trigger
- **Connectivity**: 1 x I²C, 1 x SPI, 1 x UART, more with Flexcom
- **Power**: via USB, with support for LiPo batteries
- **Operating System**: mainline Linux kernel

All in this tiny form-factor that I usually use for Microcontrollers!

Well, a few weeks ago, they arrived! So, some unboxing pictures:

![GiantBoard in package](/posts/category/database/images/IMG_6750-768x1024.png)

Wait, the whole thing fits in that one little bag? Yes. Not only that — there are multiple parts in that bag! And I realize (now) that there's no scale to that bag in the picture, but that's a Mac Mouse next to it. I'd retake the picture, but I already threw the bags away!

![Giant Board Parts](/posts/category/database/images/IMG_6752-1-768x1024.png)

That's right: I ordered the WiFi Feather Wing add-on because, after all, what's an IoT board — and especially what's an InfluxDB server — without networking!

![Giant Board with Feather wing](/posts/category/database/images/IMG_6754-1-768x1024.png)

And just for scale, that's a US Quarter in between them. So that's going to be my server *and* my network interface! For something called the 'Giant Board' it sure is small!

After a little soldering, I had it all put together and, with the addition of a MicroSD card, it booted up!

![Command line with login to the Giant Board](/posts/category/database/images/Screen-Shot-2020-02-11-at-9.04.12-AM.png)

Woah! This tiny little thing runs Debian Linux? Why yes, yes it does! So that makes [installing InfluxDB](https://docs.influxdata.com/influxdb/v1.7/introduction/installation/) super simple since we already ship ARMv7 binaries for InfluxDB and all the rest of the [TICK Stack](https://www.influxdata.com/time-series-platform/)!

![Terminal showing influxd running](/posts/category/database/images/Screen-Shot-2020-02-11-at-9.07.54-AM.png)

Ok, sure, it's currently hammering this tiny CPU, but it is also running!

![live shot of a dashboard on the Giant Board](/posts/category/database/images/Kapture-2020-01-21-at-12.22.19-1024x372.gif)

And as you can see, the dashboard runs in [Chronograf](https://www.influxdata.com/time-series-platform/chronograf/) to give me a view into how the whole thing is running!

Now, would I run this as a production system? Absolutely not! As you can see, it is using far too many system resources on such a small device. Would I run it as an edge collection and forwarding device? Quite possibly. Would I run it as an embedded [Telegraf](https://www.influxdata.com/time-series-platform/telegraf/) agent device? 100% absolutely. Especially since I can also do this with it:

![Giant Board running on battery](/posts/category/database/images/IMG_6779-768x1024.png)

That's right, I can run it on a battery! A rechargeable LiPo battery at that (and the recharging circuitry is built in to the board!). And for completeness, I'll provide a pin-out here so you can see what *else* I can add to this thing — sensors, actuators, etc., — to make it both a data node and a sensor node:

![Giant Board pinout map](/posts/category/database/images/giant-board-pin-out-1024x690.png)

Next I will build a version of InfluxDB 2.0 for ARMv7 and see if that runs either better or worse on this device, so watch this space to see what happens!
