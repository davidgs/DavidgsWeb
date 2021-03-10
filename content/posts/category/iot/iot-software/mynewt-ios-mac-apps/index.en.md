---
title: "Mynewt iOS And Mac Apps"
Date: 2016-12-16
Author: davidgs
Category: IoT, Misc, Work
Tags: IoT, mynewt
Slug: mynewt-ios-mac-apps
hero: images/logo.png
---

I've been doing a lot of work on the [Mynewt OS](https://mynewt.apache.org) Project over at the [Apache](http://apache.org) Software Foundation. It's still 'incubating' so it's not a full-fledged Apache project yet, but we're making huge progress and it's coming along nicely. In fact, we're just releasing our first beta versions of the 1.0 release! If you're an IoT hacker, and are looking for a small, fast, highly configurable (and open source!) RTOS, MyNewt it the ticket!

All of that being said, one of the things I've been working on -- other than documentation -- are demos. The Sensor APIs are a work in progress,  but the progress has been fairly significant. So much so that I was able to build a demo attaching an Analog sensor to a Mynewt-powered device and start sending the sensor values out via Bluetooth!

The basic setup is a Nordic Semi NRF52dk Developer Kit Board, an eTape Liquid Level Sensor, and a cylinder full of water. The sensor goes in the water, the nrf52 board reads the sensor, and sends the sensor values out. I'll write a separate post about the actual nrf52 setup, etc. shortly, but I wanted to write a bit about how I got to be able to read the values. TL;DR: I wrote a Mac OS X and an iOS App to do it!

One of the problems with sending data over Bluetooth is that, while sending the data is easy, letting the peripheral device know what **kind** of sensor it is tends to be a bit more problematic. I solved this problem by setting **two** bluetooth characteristic UUIDs for each sensor. The first, which I call the "Configuration UUID" is a 16-bit UUID (yeah, I know, I should use 128-bit UUIDs, but that's a pain) that simply carries an ASCII string describing the sensor. The second is a paired UUID that I call the "Data UUID" and that is a NOTIFY characteristic that will carry the actual data. I call these "paired UUIDs" and I define them by giving the Configuration UUID a prefix of "0xDE" and the Data UUID a prefix of "0xBE" I pair them by giving them both the same 'suffix' so 0xDEAD and 0xBEAD are paired by the common 'AD' suffix.

Here's what that looks like in the actual app:

{{< youtube vq3FEoaIc9I >}}

You can change the Prefixes in the App, or just subscribe to all the NOTIFY characteristics found under the defined service Characteristic. You can click on the RSSI Signal Graph to add the raw RSSI value to the table, or click it again to remove it.

And the same app -- well, mostly the same, it shares a lot of code! -- also runs on iOS

{{< youtube tWS7u7ColX4 >}}

I think they're pretty cool!
