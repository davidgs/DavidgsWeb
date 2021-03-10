---
title: "Programming the ARTIK-0 IoT Devices"
Date: 2018-07-01
Author: davidgs
Category: Gadgetry, IoT
Tags: ARTIK, ARTIK-053, IoT, Samsung
Slug: programming-the-artik-0-iot-devices
hero: images/bazaar493520_2.jpg
---

If you’ve read this blog much at all you’ll have noticed that I’ve been a fairly big fan of the ARTIK line of IoT boards (see [here](/posts/category/iot/winter-vacation-iot-artik-5/), [here](/posts/category/iot/iot-hardware/making-artik-5-iot-gateway-kura/), [here](/posts/category/iot/make-your-artik-520-scream/), [here](/posts/category/general/how-to-save-your-artik-520-backup/), [here](/posts/category/iot/iot-software/artik-520-droplit-io-edge-device/), [here](/posts/category/iot/iot-hardware/openhab-server-artik-520/) , [here](/posts/category/iot/iot-hardware/running-influxdb-on-an-artik-520/) and [here](/posts/category/iot/iot-hardware/influxdb-on-artik-520-redux/)) but I really need to clarify that a bit now. I love my ARTIK-520 board. It runs the entire InfluxData stack nicely and is a solid, reliable place to deploy IoT-Edge software. I really like it.

That being said, I am still **really** unhappy with the ARTIK-0x line of “products”. It started when I purchased the ARTIK-020 developer board. Lots of claims about being able to program it from Mac OS, etc. The reality was that — 13 pages into the developer guide — one comes to the realization that a) you need a Windows machine and b) after 30 days you needed to purchase a $3,000 license to IAR Workbench. So much for being Maker-friendly. I put that board in a drawer and gave up on it. Expensive lesson learned.

I complained to my friends at Samsung — yes, I have friends at Samsung — and a while later they gave me a free ARTIK-053 module. This one didn’t need the IAR Workbench to program it (yay for gcc!!) and I thought things looked better. I wish I had been right. I played with it for a bit after getting it but ran out of time so, as with the other Samsung board, it went in the box.

I decided to revisit it this week. I had built a CO2 sensor using a Nordic Semi nRF52DK and a Senseair K30 but the nRF52DK was really sort of big and I was looking for a smaller form-factor (that I had “in stock”) and didn’t require Arduino. I won’t start in on Arduino here, but I could.

So out came the ARTIK-053 Dev Board, and … oh shit, here we go again. First, I started with the ARTIK-IDE for development. It’s based on Eclipse (of course) but seriously, it was unbelievably slow, cumbersome and didn’t do any code-completion or hints. It took about 4 minutes to deploy a binary to the board. I iterate a **lot** so 4 minutes per load was seriously slowing me down. -1 for ARTIK-IDE.

I discovered serendipitously that Microsoft VS Code supports the ARTIK development environment and was a **ton** faster. 10-second compiles (vs. 1-minute compiles on Eclipse/ARTIK-IDE) and 30-second deploys (vs. the 4 minutes on ARTIK-IDE). Life got a lot better after that. (I may come back and do another post about VS Code just because I’m singing it to be super versatile and a really good tool — which is saying something for someone with as virulent anti-microsoft antibodies as I have.)

So I moved all my development to VS Code and began what I thought would be a fairly straightforward port of my mBed OS I2C CO2 sensor code to ARTIK’s TizenOS. There I go thinking again. I2C is pretty straightforward. You need to know the address of the device, the registers you want to write to, the registers you want to read from, and that pretty much covers it. Really simple stuff.

```cpp
// var 7-bit address of the K30 CO2 Sensor
const int addr = 0xD0;
char cmd[4] = {0x22, 0x00, 0x08, 0x2A};
int ack = i2c.write(addr, cmd, 4);

i2c.read(addr, readBuff, 4, false);
```

That’s a 7-bit address. Write a 4-byte command to the address, then read a 4-byte buffer back and I’ve got my reading. That’s the mBED OS code above, by the way. It works perfectly, so porting it to Tizen should be easy-peasy.

**Wrong**

It turns out there is less than zero documentation for the ARTIK-0x line of devices. There are a couple of sample programs, but if you want to move beyond just compiling and running those samples, you’re on your own. Samsung seems to think that the source code for i2c.h should be enough to make everything happen. They couldn’t be more wrong. If you post to the user forums, you get told to “just read the source code.” That’s hardly a response if you want developers to use your platform.

I’m fairly adept at reading source code. **IF** it’s written clearly and well documented. And that’s the problem with the ARTIK source code. The authors seemed to think that just writing the code would be enough. **Especially** when it came to the ‘example’ programs. As an example, the websocket example code consists of a single source file that is 1158 lines long. Here are all the comments in the source to help you along with understanding it:

```cpp
/// @file app/netutils/websocket/websocket.c
/// @brief websocket file to support client and server.

// if websocket server is initiated from http(s), you just can call this function.
// websocket_server_open function includes:
// 1. allocating socket fd
// 2. accepting client
// 3. authenticating with client
// those 3 are not needed when websocket is initiated from http(s).
```

That’s right, that’s **all** the comments from 1158 lines of complicated websocket code. Most of the Demo code is similarly ‘documented.’ This is either pure laziness on the part of the developers of the demo code, or else Samsung just doesn’t care whenever their end users are successful at developing applications on their platform. I’m going to give them the benefit of the doubt and go with laziness. As a developer myself, I try to do as much in-line code documentation as I can reasonably do as it’s just a common courtesy for the developer that comes along behind you. I don’t always do it with code I write purely for myself, but if I’m publishing it, or making it available, I really try to make it easy to follow. Samsung apparently doesn’t care about that.

Conclusions
-----------

I’m 9 days in and I’ve now ***finally*** gotten the I2C device to be readable on a fairly consistent and reliable basis. It wasn’t easy, or even remotely pleasurable, but it’s working well enough for me. The next bit is to be able to post the sensor results via http — ideally https — to my InfluxDB server. That’s why I went through 1158 lines of websocket code on a Sunday afternoon. Your Sunday was probably better, I’m assuming.

I’m pretty sure that getting the https POST to go through is going to take about 8 days as well, which should make Samsung ask themselves the question: When someone can implement this in a day or 2 using mBED, FreeRTOS, or Arduino and it takes 2 weeks on ARTIK, why would **anyone** choose ARTIK?” It’s a valid question that I don’t think they have an adequate answer for.


