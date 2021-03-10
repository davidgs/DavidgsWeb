---
title: "Rev'ing the Demo Hardware"
Date: 2019-06-05
Author: davidgs
Category: Evangelism, Gadgetry, IoT
Tags: IoT
Slug: reving-the-demo-hardware
hero: images/IMG_5478.jpeg
---

If you’ve been reading me for any length of time at all, you’ll know that I build **lots** of little hardware projects. What better way to highlight the IoT capabilities of InfluxDB than to build hardware that writes data to it constantly! But some of my hardware demos have been getting old, and some of them have been getting abused, so I decided it was time to revamp them with some new hardware, I’m even going to make them fully wireless by adding LiPo batteries so they can go mobile during presentations and demos! 

Many of my demos have relied on the trusty (and dirt cheap) Wemos D1, built around the ESP-8266. When I say dirt cheap, I mean under $3.00 US each, so I typically buy them by the dozen. But there are problems with them. First, they are not 100% reliable, and they do fail with relative regularity. That’s why I buy in bulk! Also, they are, by nature, insecure. So I’m moving to the ESP32-based systems. They are slightly more powerful, and just as easy to build off of. I ordered a few of the ESP-32 Feathers from Adafruit mainly because they come with a built-in charging circuit for LiPo batteries. Thankfully the code that runs on the ESP8266 runs unchanged on the ESP32, so at least I didn’t have to port anything. 

If you follow me on twitter (and if not, why not?!) then you may have seen my recent 7-segment display which reads data from an MQTT broker (fed by InfluxDB. More on that in another post!) and displays it. ![IMG 5243](/posts/category/iot/iot-hardware/images/IMG_5243.jpeg)

Pretty cool, but it was missing a few things. One thing was the ability to tell *what* was being displayed! I mean, data is great and all, but without context it’s just numbers. But how to deal with that? Enter the 14-segment display that can display pretty much any alpha-numeric character, and has the same look and feel as the 7-segment displays. 

![IMG 5478](/posts/category/iot/iot-hardware/images/IMG_5478.jpeg)

But if you’ve seen my dashboard, you’ll notice that there is a whole lot of other data there, and it would be nice to be able to change what is being displayed. 

![Screen Shot 2019 06 04 at 3 14 53 PM](/posts/category/iot/iot-hardware/images/Screen-Shot-2019-06-04-at-3.14.53-PM.png)

I had already made the device able to change data based on another MQTT message, but I wanted something that was easier to deal with. Enter the tactile button. I bought a whole bunch of them in a whole bunch of colors, and … 

![IMG 5477](/posts/category/iot/iot-hardware/images/IMG_5477.jpeg)

Now we have buttons to change which data we’re getting! 

Of course this means that I’ll have to re-design and re-print the box, but that’s only a <checks notes> 9.5 hour print job. The final result will be a portable, wireless data display, with a matching legend of what is being displayed, complete with a 2500mAh LiPo battery so that it can be passed around. Now to keep people from dropping it and mistreating it. 3D Printed cases are not as sturdy as people seem to think they are! 

I’ll be posting pictures of the final device on my twitter feed, so you’d better go [follow me](https://twitter.com/intent/follow?screen_name=davidgsIoT)! 
