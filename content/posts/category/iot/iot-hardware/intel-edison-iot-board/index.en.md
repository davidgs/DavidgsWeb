---
title: "Intel Edison IoT Board"
Date: 2014-12-04
Author: davidgs
Category: IoT
Tags: development, gadgets, hardware, IoT
Slug: intel-edison-iot-board
hero: images/Edison-module.jpg
---

I’ve been reading about the Intel Edison development board for a while. I’m doing more IoT stuff again — purely for fun, since no one’s paying me to do it — and I’ve recently acquired the electric imp development kit and this Intel Edison kit, as well as an Arduino kit. The Intel Edison board is by far the most powerful of the bunch. It is an IoT SoC device that appeared to be extremely capable.

Some “speeds and feeds” data:

- Dual-core, dual-threaded 500MHz Intel Atom CPU combined with a 100MHz32-bit Intel Quark microcontroller
- 1GB RAM
- 4GB Flash storage
- 2.4GHz and 5.0GHz WiFi with onboard antenna
- Bluetooth 4.0

That’s pretty impressive. It’s a bit power hungry, with a 13mW standby voltage (21.5 mW with Bluetooth, 35mW with WiFi) but it’s still within reason. The I/O capabilities are also pretty strong:

- 20 Digital I/O including 4 PWM
- 6 analog inputs
- 1 UART (Rx/Tx)
- 1 I^2^C
- 1 6-pin SPI header
- SD Card connector

That gives you a **lot** of options for sensors and actuators! I’ve played with it some, but not much so far. Here’s the required unpacking porn:

![IMG 1564](/posts/category/iot/iot-hardware/images/IMG_1564.jpg)

![IMG 1566](/posts/category/iot/iot-hardware/images/IMG_1566.jpg)

![IMG 1567](/posts/category/iot/iot-hardware/images/IMG_1567.jpg)

Some weird things about this device: It requires that **both** micro-usb ports be plugged in in order to bring it up and access it from your laptop. That’s just odd. And a pain for me, since I only have relatively short micro-USB cables, and one USB port on each side of my laptop.

I’m a bit of a stickler for ease-of-use and a low barrier to entry, and on this front, Edison needs a *lot* of work. They only have a ‘getting started’ tutorial for the Arduino expansion board (I bought the *other* expansion board, of course). Accessing, flashing, etc. the board is non-intuitive and the documentation is convoluted and difficult. I ended up in the user forums where regular users have posted **much** more straight-forward recipes and instructions. Yes, I am biased, as I wrote the famous Sun SPOT Manager Application for managing the SDK and firmware on Sun SPOT devices, and I can’t really expect everyone to have such an intuitive and easy to use entry point for developers, but … wait, why **can’t** I expect that? Why do developers not expect this? I may just spend a day this weekend and write one.

One of the really nice things is that I can program this device using Node.js in Javascript. There are rumors that it runs Java as well, but I haven’t had time to get that installed yet. I’ll let you know as soon as I figure that one out!

 
