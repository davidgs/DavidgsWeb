---
title: "Disney And #IoT"
Date: 2015-01-09
Author: davidgs
Category: Gadgetry, IoT
Slug: disney-and-iot
hero: images/disney.jpg
---

Over the holidays a friend of mine took her family to Disney World for a few days. They stayed at a resort in the park, paid extra for shorter lines at the rides, and were there in a group of 12. That’s a epic trip probably worthy of it’s own blog post — somewhere else. I couldn’t imagine the logistics of such a visit, but then again, it’s been 10 years since I’ve been to Disney World, and apparently a lot has changed in that time.

That’s not really what I’m actually writing about here. See, they came home with these cool little plastic/rubber bracelets. They were presented with the bracelets — Disney calls them [MagicBands](http://www.google.com/aclk?sa=l&ai=Cn6YVIyGwVIPdI4jYpgPmt4KIBbCdkLcJsPD6kYECuJ7GvaYBCAAQASC5VGDJ7qeKpKTEEaABxvSz_gPIAQGqBB9P0GZkOBPEgK6Ouy6vIILHWD0Zp9Iw_GHI6nWnsLbCgAWQToAHgNn1RYgHAZAHAqgHpr4b&sig=AOD64_3AYdOTwEhFZiBYvxQJk4hZsV2IfQ&rct=j&q=&ved=0CCAQ0Qw&adurl=http://ad.doubleclick.net/clk%3B252175360%3B76276805%3Bl%3Bu%3Dms%3Fhttps://disneyworld.disney.go.com/plan/my-disney-experience/bands-cards/%3FCMP%3DKNC-WDW_FY15_DOM_NGE_BR_MagicBands%7CG%7C4151322.NG.AM.02.01%26keyword_id%3DsX37LLiAO_dc%7Cdisney%2520magic%2520band%7C68978719648%7Ce%7C15402cl14044) — when they checked in to their hotel. Each person — right down to the smallest kids — got one personalized just for them.

![21 300x215](/posts/category/iot/iot-hardware/images/21-300x215.jpg )

These were more than just simple bracelets though. They functioned as the keys to their hotel rooms, admission to the parks, verification that they could get into the shorter lines, and allowed them to purchase refreshments and items in the park. All they had to do was put the bracelet next to a Point of Purchase system, enter a PIN, and go. No fumbling for a wallet. No having to find change, or cash, etc. Really no need to carry **anything** in the park. Just wear the Magic Band. The park is littered with RF readers for them at the entrances to rides, the entrance to the park, etc.

![DSC03458 XL 800x600](/posts/category/iot/iot-hardware/images/DSC03458-XL-800x600.jpg)

These little devices are really Internet of Things devices. Disney is using IoT. They are making the park more convenient and easier for their guests, yes, but that’s just the outer manifestation of what they are actually doing. These bands are more than just an RFID system. They contain some much more advanced [RF technology](https://disneyworld.disney.go.com/faq/my-disney-experience/frequency-technology/), and Disney uses this to track and gather telemetry from guests throughout their stay at the resort. Telemetry? Yes, telemetry. They can monitor how long you stand in line, how long the lines are, what you purchase, and where (giving them purchase history and buying-pattern data which they can later use to market to you). I’m guessing here, but it wouldn’t surprise me if they can also use the MagicBand to track down your lost kid in the resort simply by triangulating the signal from her band.

I was so intrigued by this little gadget that my friend gave me hers and I brought it home to dissect. Let me tell, you, that’s not as easy as it sounds. These are designed to be single-use devices. You use it during your stay at the park, and take it with you when you leave. I guess if you return to the park another time you could present your old MagicBand and have it re-activated, but you’ll probably get a new one. So here’s how it went.

I started with a MagicBand:

![IMG 1594](/posts/category/iot/iot-hardware/images/IMG_1594.jpg)

It is molded plastic, so getting into it was **really** difficult, but a sharp knife, some small wire cutters and 10 minutes later, I was (mostly) in.

![IMG 1597](/posts/category/iot/iot-hardware/images/IMG_1597.jpg)

It’s a very simple design, it appears, and the entire wrist-band is used as antenna space as well, which means they want to be able to contact it from me distance, and/or they need a strong, reliable signal. I know it’s not just a simple RFID system because it contains one of these:

![IMG 1598](/posts/category/iot/iot-hardware/images/IMG_1598.jpg)

So it’s a powered device. I dug and dug and dug, and finally came across what I **think** is the processor, but so, even with my magnifying glass, I can’t identify the chip. 

![IMG 1601](/posts/category/iot/iot-hardware/images/IMG_1601.jpg)

And it was attached to a very simple single-layer circuit board:

![IMG 1600](/posts/category/iot/iot-hardware/images/IMG_1600.jpg)

All of this was not just encased in plastic, but was actually molded into the plastic, so it was **very** difficult to get into, and impossible to get into without destroying it in the process. 

These are the kind of IoT products that you **don’t** see at CES, or plastered all over the web. These are the kinds of IoT devices that are **already** changing the way businesses operate. They are providing Disney with not just Big Data, but *Massive Data* on what their guests are *actually* doing, probably in real time, while at the park. That is the kind of telemetry that can utterly transform a business. That is how IoT can transform an industry.
