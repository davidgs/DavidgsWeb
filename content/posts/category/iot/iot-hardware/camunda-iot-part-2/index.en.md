---
title: "Camunda IoT Project, Part II"
Date: 2021-06-02
Author: davidgs
Category: IoT
Tags: connectivity, Internet Anywhere, IoT, Camunda
Slug: camunda-iot-part-2
hero: images/header.jpg
---

This is Part II in the series covering a Proof of Concept (PoC) project I'm working on as part of my job as Principal Developer Advocate at [Camunda](https://camunda.com?ref=davidgsIoT). I'm not sure how many posts will be in the series, but, well, at least two? If you missed [Part I](/posts/category/camunda/iot-project), you might want to catch up on it before continuing.

This part of the project was the first hardware build of the project. I have now built and deployed a complete outdoor weather station to gather data about current weather conditions outside the greenhouse. This will allow me to compare conditions inside the greenhouse with conditions outside the greenhouse, and compensate accordingly.

## Parts List

Here is the complete parts list that I used. This differs slightly from the parts list in [Part I](/posts/category/camunda/iot-project). This is due mostly to my not being aware of a slightly different part that will make things a *lot* easier. It also already incorporates the lightning sensor, the BME280 for temperature, pressure and humidity, and the soil moisture input.

| Sensor | Price |
|--------|-------|
| [Weather Station](https://www.sparkfun.com/products/15901) | $79.95 |
| [MicroMod ESP32](https://www.sparkfun.com/products/16781) | $14.95 |
| [MicroMod Weather Carrier Board](https://www.sparkfun.com/products/16794)| $44.95 |
| [LiPo Battery](https://www.sparkfun.com/products/13856) | $26.95 |
| [Solar Charger](https://www.sparkfun.com/products/12885) | $26.95 |
| [Solar Panel](https://www.sparkfun.com/products/13783) | $59.00 |
| [Soil Moisture](https://www.sparkfun.com/products/13637) | $6.95 |
| [CO<sub>2</sub> Sensor](https://www.sparkfun.com/products/15112) | $59.95 |
| **Total** | **$319.65** |


I also had an Adafruit [PM2.5](https://www.adafruit.com/product/4632) sensor hanging around (it's $44.95) so I added that too.

## Building the Weather Station

Now that I had all the parts, it was time to start assembling them, and designing and printing some enclosures to hold everything. I could have made a single box to hold it all, but that would mean designing a **very** large box, with the requisite long print-time.

Let's start with the power supply. Since this is going to be an outside deployment, I decided to make it solar-powered, with a battery, of course.

### Powering the whole thing

The first problem was that the Solar Buddy board does not have a USB-out. It only has a `load` with `+` and `-` on it. The weather station, of course, has no `vcc` and `G` pins, but *only* works with USB-C. So I had to fix that. Luckily I bought a boat-load of weather-proof connector wires, so I ordered some USB-C ends, and soldered one up!

![2-lead waterproof connector](/posts/category/iot/iot-hardware/camunda-iot-part-2/images/camunda-iot-7.png)

![2-lead waterproof connector with USB-C connector](/posts/category/iot/iot-hardware/camunda-iot-part-2/images/camunda-iot-8.png)

![USB-C connector with shrink-tubing](/posts/category/iot/iot-hardware/camunda-iot-part-2/images/camunda-iot-9.png)

Once that was built, it was time to design a box to hold it all. Since this was going to be an outdoor device, I tried to make it waterproof by making very tight, beveled edges on the lid. The board looks small in the box:

![Custom printed box with solar board in it](/posts/category/iot/iot-hardware/camunda-iot-part-2/images/camunda-iot-1.png)

I had to solder the newly-fashioned USB-C connector on *after* I put the board in. And it looks small in the box, but once the battery is in, it's a pretty full box!

![custom printed box with battery in it](/posts/category/iot/iot-hardware/camunda-iot-part-2/images/camunda-iot-3.png)

You can see the beveled edges on the lid as it is slid in:

![Lid being pushed onto the box](/posts/category/iot/iot-hardware/camunda-iot-part-2/images/camunda-iot-4.png)

The lid is a nice tight fit, which hopefully will keep it dry!

![tightly fitting lid on the box](/posts/category/iot/iot-hardware/camunda-iot-part-2/images/camunda-iot-5.png)

And I even made it water-tight where the cables come out:

![shrink-wrapped cables coming out of the box](/posts/category/iot/iot-hardware/camunda-iot-part-2/images/camunda-iot-6.png)

Hopefully the solar panel will keep the battery topped-off so the weather station will run continuously. I'll need to make adjustments to the time spent sleeping in order to maximize data and minimize battery draining.

### Building the Sensors

