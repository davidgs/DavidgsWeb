---
title: "Drop a Brick On It"
Date: 2014-11-19
Author: davidgs
Category: IoT
Tags: connectivity, Internet Anywhere, IoT
Slug: drop-a-brick-on-it
hero: images/render-2.jpg
---


I’m all about connectivity. Yes, there are times to disconnect from the world, but that’s a personal disconnect. Applications and devices should, for the most part, be connected **all** the time. But connectivity is expensive and hard to maintain in remote places. If you’re connecting a server, or your house, there are many options available — let’s just go with that for now, shall we? The whole ISP monopoly issue will just get me wound up. Typically these kinds of connections are fast, reliable, and stable. Mostly they’re cheap and widely available as well. 

But when we look at the Internet of Things (ioT) things can get a bit more squirrelly. Yes, if your IoT devices are things in your home, you can go with the connection you already have. If they are enterprise-based IoT assets, you have your enterprise-class connectivity to rely on. What about IoT devices that are either field-based or mobile? What if your IoT deployment is in a jungle in Panama? Or the dessert in Africa?

I found this the other day, and it seems like the perfect solution. Drop a [Brck](http://www.brck.com) on it! This looks like a great device for remote connectivity, especially for IoT or low-bandwidth applications.  There are a couple of really cool looking features here — and a few that I’d like to investigate further, if I had the time and the device. The 8-hour built-in battery backup for this device is a huge win in many remote deployment scenarios, to be sure. The fact that this device was developed **in** Africa specifically **for** remote deployments is also a huge plus. Again though, there are a few things I think need further investigation.

First is the ability to add Arduino-Based sensors and devices directly to the box. So if you’re using [Zigbee](http://zigbee.org) or[IEEE 802.15.4](http://en.wikipedia.org/wiki/IEEE_802.15.4) devices as your end-nodes, you could add a gateway to those devices to the Brck devices directly. If you’re using [BTLE](http://www.bluetooth.com/Pages/low-energy-tech-info.aspx) devices, you could add a BTLE-gateway for access to those devices as well.  This was — back in the day — one of the big sticking points for lots of sensor applications. Low-power, low-energy network connections to the devices were hard to bridge to the internet for backhauling the data. In many deployments, it still is. Especially for remote-sensing applications. Being able to build-in your internet-to-sensor gateway device would be a huge plus. 

What I would love to investigate further — given the time and the device, of course, since IoT is my hobby, not my job — is whether or not I could deploy actual services to the Brck device. Like authentication, authorization, data integrity and IoT device management. I know, from their website, that they have cloud-based tools — who doesn’t, amirite? — to manage your Brck devices, and they say you can push arduino sketches down to the box to distribute to connected devices, but what about these other services? What if I wanted to use, say, [OpenAM](https://forgerock.org/openam/) and [OpenIDM](https://forgerock.org/openidm/) services? Could I deploy these services directly to the node? Or could I build the service calls into the device to proxy for the end-nodes? 

I guess I’ll just add this to the list of devices and technologies I’d **love** to be able to spend some time with, but probably won’t have the time or the money to deal with. <sigh> 
