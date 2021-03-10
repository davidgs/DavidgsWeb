---
title: "What is, and isn't, IoT"
Date: 2014-12-02
Author: davidgs
Category: Gadgetry, IoT
Tags: gadgets, IoT
Slug: what-is-and-isnt-iot
hero: images/IheartIOT600.jpg
---

So what, exactly, **is** the Internet of Things (IoT)? And what isn’t it? That depends on whom you ask, and what you mean. There are tons and tons of ‘connected’ gadgets that people call IoT devices.But are they really IoT devices? 

The Internet of Things is, loosely, the world of connected, internet-enabled devices. But let’s turn to [Wikipedia](http://en.wikipedia.org/wiki/Internet_of_Things), just for fun:

> The **Internet of Things** (**IoT**) is the interconnection of uniquely identifiable [embedded computing devices](http://en.wikipedia.org/wiki/Embedded_system "Embedded system") [Internet](http://en.wikipedia.org/wiki/Internet "Internet") infrastructure. Typically, IoT is expected to offer advanced connectivity of devices, systems, and services that goes beyond [machine-to-machine communications (M2M)](http://en.wikipedia.org/wiki/Machine_to_machine "Machine to machine") and covers a variety of protocols, domains, and applications.<sup>[[1]](http://en.wikipedia.org/wiki/Internet_of_Things#cite_note-M2M-IoT-1)</sup> The interconnection of these embedded devices (including [smart objects](http://en.wikipedia.org/wiki/Smart_objects "Smart objects"), is expected to usher in automation in nearly all fields, while also enabling advanced applications like a [Smart Grid](http://en.wikipedia.org/wiki/Smart_grid "Smart grid").<sup>[[2]](http://en.wikipedia.org/wiki/Internet_of_Things#cite_note-Smart-IoT-2)</sup>

So it’s connected embedded computing devices. Sensors, actuators, and monitoring devices. They are connected devices that are accessible via the network — generally the internet — and interact with network resources in some way. They upload data to the internet, allow interaction with the device via the internet, etc. I would argue that using the internet is not actually a requirement. Many true IoT devices may only be connected to a LAN, or may only connect to each other via 802.15.4 short-range radio communications, with a gateway to a server, or network. Machine-toMachine devices (M2M) can be classified as IoT devices. But just because something has a ‘connection’ does not make it an IoT device.

For instance, I don’t believe that the [Tile](https://www.thetileapp.com) is really an IoT device. It’s a bluetooth-enabled locator beacon for objects. Don’t get me wrong, I have a bunch of them, and I use them all the time, but they’re not IoT devices. Why? Because, well, they don’t meet any of the criteria set out above. But more than that, they are not actually internet-connected devices. They do no real sensing of their own. They are, in large part, glorified RFID tags. They connect via BTLE to your smartphone and use the phone’s GPS to ‘locate’ the devices. The devices themselves really do nothing more than provide a Bluetooth beacon.

In fact, in going through the list of “IoT Devices” on [iotlist](http://iotlist.co), I’d argue that most of them are not true IoT devices. IoT is about more than simply having a device with some connectivity to **something**, anything. The true Internet of Things is about those things being connected to and communicating and participating in the wider world of the internet — or at least a network. IoT devices need an identity of some sort whether that’s simply an IPv6 address or a more sophisticated identity provided by an identity broker. 

While I’m a huge fan of all the cool devices that connect to my smartphone, etc. — and I own far too many of them! — I am more keenly interested in the **actual** internet of things. Smart devices are a huge market, to be sure. People are buying such connected devices in huge numbers. As I said [earlier](/posts/category/iot/whos-going-to-drive-iot-innovation/), even if every person on the planet had a few of these connected devices, that’s still a limited market. When you’re talking about the *true* Internet of Things, there really is almost no upper limit to the size of the market.
