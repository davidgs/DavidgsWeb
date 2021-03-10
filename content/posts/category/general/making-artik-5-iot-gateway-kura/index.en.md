---
title: "Making an ARTIK-520 IoT Gateway with Kura"
Date: 2017-03-02
Author: davidgs
Category: IoT
Tags: ARTIK, Eclipse, Kura, Samsung
Slug: making-artik-5-iot-gateway-kura
hero: images/kura.jpg
---

There are about a million ways to build or buy an IoT Gateway Device. (Actually, more like [586,000](https://www.google.com/#newwindow=1&q=iot+gateway+device&*), but let's not quibble). Each has it's own merits, or pitfalls. You could buy one, and risk being locked into a single-vendor solution. You could build one from scratch and then be saddled with having to source the hardware, build the software, and then maintain it all and hope that you made the right choices and that it will scale. Or, you could use an existing Open Source solution, like [Kura](http://www.eclipse.org/kura/index.php) from the Eclipse Foundation.

I've been playing around with the Samsung ARTIK line of IoT hardware recently, as you may [remember](/posts/category/iot/winter-vacation-iot-artik-5/), so I decided to see if I could turn my [ARTIK-520](http://www.digikey.com/product-detail/en/samsung-semiconductor-inc/SIP-KITNXB001/1510-1316-ND/5825102) into an IoT Gateway in an easy, scalable manner. It was suggested to me that I try the Eclipse Kura project, even though it was not actually supported on ARTIK. I'm not one to be deterred by "It doesn't work on that hardware" so I decided to give it a go. It took me a few days, and a few meetings with some of the engineers from various parts of the Kura project, but it turned out to be relatively simple and straightforward. So, here are my experiences, and a sort of 'How To' to get it working for you, if you're interested. I'm also going to talk a little bit about some of the strengths, and weaknesses, I see in this approach along the way.

## The Hardware

First, about the hardware. I have an ARTIK-520 developer kit. Here's the rundown on that if you don't want to go [look it up](https://www.artik.io/modules/artik-520/) yourself:

- Power efficient dual Cortex®-A7 with Wi-Fi, Bluetooth, ZigBee, Thread
- Leverages Samsung ePoP technology to offer small footprint modules: 30 mm X 25 mm
- 512MB RAM, 4GB flash (eMMC)
- Enterprise class security with hardware secure element and Secure OS
- Fedora Linux® package with connectivity, graphics, power management and security libraries

The actual dev kit has a wired ethernet port (this will be important, so remember this), micro-usb ports, and other stuff too, but I won't be using most of that in this example. Just follow the excellent "[Getting Started](https://developer.artik.io/documentation/artik/getting-started/)" Guide to get your ARTIK-520 board up and running. I used the generic Fedora 25 image from that guide to set up my board. I came at this from several different directions, and had a few false starts along the way as I did so. Here's how I got the Kura software installed.

## The Software

First of all, don't follow the Kura 'Getting Started' guide. It won't get you started here, which is why I'm not even linking to it. I never did manage to get through that document and end up with anything resembling a working development system for Kura. We're trying to get Kura running on an ARTIK-520, not build a development system. The docs just didn't match reality for me on a MacBook Pro. Next, don't follow the Getting Started Guide here [either](http://wiki.eclipse.org/Kura/Getting_Started). Seriously. Or if you do, just do this little piece of it:

```
DSimmons-Pro:~ $ git clone -b develop https://github.com/eclipse/kura.git kura
DSimmons-Pro:~ $ cd kura
DSimmons-Pro:kura $ ./build-all.sh
```

And you're doing this on your Laptop, **not** the ARTIK-520 board! Remember that. You don't want to build all of this on the ARTIK-520 itself. You **can** if you want, I think, but it will take a *very* long time, and at least when I was trying it, I had to disable parallel building because there just aren't the resources to do it. Which is why I advise not doing it.

You'll need to have Java, and Maven, etc. installed already on your laptop, but those setup instructions are just too convoluted and confusing. At least on my Mac, 'brew install maven' was all it took.  That build-all script will take a while. And not just a "cup of coffee" while. More like a "go to the gym" while. When it's finally done, go look in kura.git/kura/distrib/target directory and marvel at all the stuff it created for you.

```
DSimmons-Pro:kura $ cd kura/distrib/target
DSimmons-Pro:target $ ls -l
total 4001616
```

Don't say I didn't warn you! It's a lot. What you're looking for in this haystack is the file 'kura_3.0.0-SNAPSHOT_fedora25_installer.sh' That's the file you want to move over to the ARTIK-520. Just ftp/sftp/scp it over there, but don't actually go run it yet! That's the next section, and you'll want to read that section before you do the install or you'll waste a day or so.

## The Gateway

As I said, don't just ssh into the ARTIK-520 board and run that installer. I was connected via the USB Debug port, so I never lost connectivity, but if you've set up the WiFi connection on the ARTIK-520, and are ssh-ed in to that when you run the installer, you'll get a fairly unwelcome surprise. And here's where that wired ethernet port I mentioned earlier comes back into play -- remember, I told you I'd come back to it. You absolutely **must** have that wired ethernet port connected to your network. And here is where I have to register my only really serious disappointment with, and quarrel with, the Kura software package. So here it is.

When I installed it, I had already set up the ARTIK-520 board, gotten the wireless network set up so I could access it, etc. It's fairly straightforward to do, and saved me having to find a CAT-5 cable and get that set up. But when I ran the Kura installer, suddenly everything went haywire with my networking. It installed fine, and started up the Kura service fine, but I could no longer get to the box via WiFi. Whiskey, Tango, Foxtrot!? When I began to dig, I noticed that suddenly my WiFi (wlan0) interface had a static IP of some 172,x.x.x range assigned to it, not my WiFi LAN range that it had before. Changed it back, but sooner or later it would revert to this address again. Couldn't contact the web-UI to configure the box. The dogs learned a whole new set of expletives and swear words that day.

It turns out that the Kura service, upon install, decided that thew WiFi interface was to be used as a new Access Point, so it was given a new IP Address, set up as an Access Point, and started advertising a new SSID all by itself. Without notifying me. Without asking me. I see this as some fairly anti-social behavior and am trying to figure out the exact wording for a bug-report. So far the bug report is NSFW. Adding a new SSID and, essentially a new router, to my network is not playing nice. **I decide** when a new access point is allowed on my network. **I** decide when a new router is installed. As I said, pretty anti-social behavior. And just to make sure I wasn't making an issue out of something that wasn't a big deal, I ran this scenario past a bunch of other networking and security people I know. To a person, they were all horrified by this behavior. It's not ok.

Ok, rant over. I'll climb down off my soapbox.

So, back to the task at hand. You absolutely **must** have that wired ethernet port setup. Then do the install, then you can connect to the web-UI over the wired ethernet address. And then, and only then, can you actually see the power and versatility of using Kura as your gateway management software. Don't get the impression from my above displeasure with the hijacking of my network that I dislike Kura. Quite the contrary. I actually like it quite a bit.  It's just that little bit of shenanigans that I'm not fond of.

But if you've run the installer, and rebooted your ARTIK-520 and tried to connect you will probably quickly realize that you can't. Hmmm ... You'll need to make one alteration to the startup script first. so on the ARTIK-520:

```
[root@localhost ~]# systemctl stop kura.service
[root@localhost ~]# cd /opt/eclipse/kura/bin/
[root@localhost bin]# ls
start_kura_background.sh start_kura_debug.sh start_kura.sh
```

Now, edit the start_kura_* scripts and change all the lines that say `java -Xms512m -Xmx512m` to `256m` instead. The ARTIK-520 only has 512m of memory (see above) so trying to give every last bit of it to Java results in an `outOfMemoryException` and a crash. Of course.

Now restart Kura:

```
[root@localhost bin]# systemctl start kura.service
```

So now that I've got Kura running successfully I can login to the web-UI (username admin, password admin so you'll want to change that) I actually have a pretty nice management UI that I can use to configure he box itself.

![Safari013](/posts/category/general/images/Safari013.jpg)

Don't worry, you won't have the "Demo" stuff on yours. That's something else I'm working on for another blog post. I can configure the firewall, I can wrestle control of my WiFi interface back, and a whole host of other things.

Now, if what you're looking for is a very simple, fast, and effective way of building an Access Point that will set up its own SSID, etc. then, out of the box, Kura is certainly the way to go as it certainly does that.

I'm still working on figuring out how to connect it to a cloud service, and to begin logging sensor data to it, so that will have to wait for another post. I'd also like to try to get this all built as part of a Resin.io deployment model, but I'm not quite there yet either.

Stay tuned!
