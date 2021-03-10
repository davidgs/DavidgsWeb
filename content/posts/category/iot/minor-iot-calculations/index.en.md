---
title: "Some Minor IoT Calculations"
Date: 2015-01-30
Author: davidgs
Category: IoT
Tags: Batteries, IoT, power
Slug: minor-iot-calculations
hero: images/Critical-Battery-Icon-old-laptop.jpg
---

## Batteries will be a limiting factor in IoT deployments

There’s a lot of hype about the Internet of Things (IoT) as I’ve [said](/posts/category/general/here-comes-iot-ready-or-not/) [repeatedly](/posts/category/iot/is-iot-happening-or-not-in-2015/) — and as anyone who’s reading anything about technology these days already knows. There’s wearable tech, there’s healthcare IoT, there’s M2M IoT and a host of other areas of the IoT that are all projected to explode over the next 10 years. Billions and billions of devices are forecast. Maybe trillions. Those are huge numbers and they are exciting to anyone working in the field, or even observing it. But there’s a problem. Power.

A big problem. Power. How will we power these billions of devices? Some of them, of course, will be powered by simply plugging them in to a constant power supply. Let’s ignore those. A fair number of them — possibly most of them — will be small, embedded devices — wearables, lots of medical devices, environmental sensors, remote sensors, etc. —  that will need to be powered by batteries. And there’s your problem. Batteries. Lots of batteries. Boat loads of batteries.

I spent a lot of time, back in the day, researching batteries in order for the Sun SPOT platform to achieve a balance between size and weight, and capacity. Oh, and price. Batteries can be expensive. Very expensive. But the size and weight and capacity of batteries isn’t even going to be the biggest problem with the Internet of Things. There’s plenty of research going on all over the world to make batteries smaller, more powerful, and more efficient. No, just the sheer **number** of batteries is going to be the problem. And it’s a problem that not enough people are thinking about, and almost no one is talking about.

Here’s what I mean. Let’s take the common number of 20 - 30 billion IoT devices on-line by 2020. [Gartner](http://www.gartner.com/newsroom/id/2636073), [Forrester](https://www.forrester.com/There+Is+No+Internet+Of+Things+8212+Yet/fulltext/-/E-RES101421) (pay-wall), [IDC](http://www.idc.com/getdoc.jsp?containerId=248451),  [Ovum](http://www.computerweekly.com/news/2240238915/Lot-of-nonsense-touted-about-IoT-says-analyst), and pretty much everyone else is using this number, and I don’t want to argue it, so we’ll just take that as a given and go with 20 billion devices. Now let’s say that roughly half of those devices will be powered by mains, and won’t need a battery. So we’re now left with 10 billion devices with batteries. Some devices can go a year or more on a single battery. Some can only go a few weeks. So let’s, for argument’s sake, say that the average is that about a third of the devices will have to have their battery changed over the course of a year. That seems reasonable.

Yes, it seems reasonable, until you do the following calculations:

> 20B ÷ 2 = 10B — the number of battery-dependent devices.

> 10B ÷ 3 = 3.4B — the number of batteries that will have to be changed in a year.

> 3.4B ÷ 365 = 9.1M — the number of batteries that will have to be changed every day.

Do you see the problem now? But it gets worse. Much worse.

Now let’s scale that to a trillion devices — a number that is often used when talking about the IoT. Hell, *I’ve* been using that number myself since 2004!

> 1T ÷ 3 = 333B — Let’s say only a third of those devices now need batteries.

> 333B ÷ 3 = 111B — The number of batteries that will need to be changed in a year.

> 111B ÷ 365 = 304M — the number of batteries that will need to be changed every. single. day. That’s 34k batteries an hour.

Given those numbers, the IoT will collapse under it’s own weight. Now, if you’re a battery company, I ‘m sure those numbers are quite reassuring, but for anyone looking at how the IoT will actually function, it is clear that those numbers are not just unsustainable, but they are completely unworkable. We’ll need an army of people who do nothing but go from device to device changing batteries, 24 hours a day, 7 days a week, in order to keep up. (For those playing the home game, that’s 34,000+ batteries per hour, every hour.)

We clearly need another solution. The big question is **why** is no one in the IoT field talking about this? Why is there radio-silence on this looming, crippling problem in IoT? There are only a few select people working on some solutions to this battery problem. If you’re in IoT, and you’re not already thinking about how to manage the battery problem in your ecosystem, now might be the time to start.
