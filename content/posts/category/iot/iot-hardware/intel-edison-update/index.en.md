---
title: "Intel Edison Update"
Date: 2016-01-06
Author: davidgs
Category: Gadgetry, IoT
Tags: Edison, IoT
Slug: intel-edison-update
hero: images/SparkFun_Edison_Boards-16.jpg
---

I need to amend my [previous post](/posts/category/iot/iot-hardwareintel-edison-big-hat-no-cattle/) about the Intel Edison. It turns out it may not be the Edison module itself but rather the Intel Mini-Breakout Board that is at fault when t comes to at least the I2C failure. I still have to see about the SPI failures. Here’s why I have reached that conclusion:

I ordered some of the [Sparkfun Blocks](https://www.sparkfun.com/products/13034) for Intel Edison© and went back to fooling with them. (Really I wasn’t ‘fooling’ with them as much as working on a project for a customer where Intel Edison was a good fit.) I downloaded some nice code from [GitHub](https://github.com/jku/LSM9DS0) that made the I2C bus usable with the Sparkfun Blocks and Voilá! I had it working! I made some fairly substantial edits to the original code from the original GitHub repository, so I forked it and have re-published it on my own [GitHub](https://github.com/davidgs/LSM9DS0), of course. Mostly what I added were more startup and output options.

I’m now able to read I2C sensor data (I’m using the [9DOF Sparkfun block](https://www.sparkfun.com/products/13033)) and am now publishing the sensor data to … well, I can choose where I send it! I can send it to the build in [Mosquito MQTT](http://mosquitto.org) server, or to an embedded [MongoDB](https://www.mongodb.org) NoSQL database, or to an external [Couchbase](http://www.couchbase.com) NoSQL database, or I can publish my own raw JSON data from it. I may even make it possible to publish to all sources at once, but I'm not sure that's all that useful, really.

Yeah, I’m generally a Java guy — hence the [coffee beans](/posts/beans/beans) — but I reverted to C for this one. It’s been 30 years since I’ve written any serious C code, but apparently it’s like riding a bike because it comes right back!

Stay tuned for the rest of the story on this project, because it’s going to get better and better!
