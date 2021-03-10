---
title: "Intel Edison Big Hat, No Cattle"
Date: 2015-12-11
Author: davidgs
Category: IoT
Slug: intel-edison-big-hat-no-cattle
hero: images/NewImage.png
---

It was almost exactly a year ago that I bought my first Intel Edison development kit. I was all excited about the prospects of it, as you can see [here](/posts/category/iot/iot-hardware/intel-edison-iot-board/). It’s a nice, small, powerful (if power-hungry) IoT board that held a lot of promise for development and prototyping.

I wish I were still as excited about it. 

I’ve tried, a couple of times, to use it for some development project or another. I’m even trying again now. My experience has been less than positive. In fact, it has been downright disappointing. Now, one of my[initial gripes](/posts/category/iot/iot-hardware/intel-edison-iot-board/) about the platform was the ease of use and the non-intuitive process for flashing/upgrading/etc. the board. To be fair, Intel has worked on this, and there are now some fairly decent tools for managing the board. 

That being said, there is way more that **doesn’t** work on this board than does. For instance, SPI. That’s set of a big one, for me. I spent about a month working on getting a SPI device to work with the board and encountered nothing but problems. Repeated posts to the Intel Developer Forums elicited a series of cryptic responses indicating that I was hooking things up incorrectly, the SPI device wasn’t working properly, etc. It *was* an experimental device, so those things were plausible. Until I got a logic analyzer and actually debugged the signals coming out of the Edison. It then became abundantly clear that SPI on the Mini Breakout Board was hopelessly broken. At that point, Intel acknowledged that SPI was broken. They could have saved me a bunch of time had they copped to that earlier. So SPI is out.

Ok, SPI is hopelessly broken. Let’s try I2C. So far, the experience with I2C has been roughly similar. I will say that having internal pull-up resistors on the pins that I can set to pre-defined values is quite helpful. Documentation on I2C — and the pull-up resistors — like all the Edison documentation, is pretty thin but if you’re persistent in searching the web, you’ll find the answers you need (Hint: `cd /sys/kernel/debug/gpio_debug/<pin number>` and then look in `available_pullmode`, `available_pullstrength` for acceptable values, then put the value you want into `current_pullmode` and `current_pullstrength`. Never say I wasn’t helpful.) 

I got the SDA/SCL pull-up resistors set correctly, and the direction set correctly, and the device I’m working with is now at least **seen** on the I2C bus. But that’s about as far as I can get. In theory, the I2C buss has several speeds, but in reality it is pretty well stuck at 300kHz. My device is 100kHz. Again, in theory, you can change the speed, but in reality, at least according to all the posts and responses, the only way to effectively do this is to rebuild the entire Linux kernel, and even then, YMMV. 

Needless to say, my mileage did vary. I’ve tried using Javascript (Node.js), Python, C and Arduino sketches to gain access to the I2C bus and this device and each one fails — in entirely different ways. That’s not a good thing. 

The device I’m using, a [Melexis MLX90614](https://www.sparkfun.com/datasheets/Sensors/Temperature/MLX90614_rev001.pdf) (PDF) IR Thermometer, also has a PWM mode. Ok, last chance Edison. Game on!

Guess what? Intel Edison only does PWM out. No PWM in. So I can’t read the device. If it were a servo, I’d be all set. But it’s not. So once again, I find the Intel Edison to be full of promise, with no ability to deliver. 

I’ll keep banging away on it, and see if I can eventually get the Edison to do anything useful but so far, it’s a cute little device that is not the least bit useful. Powerful, but useless.
