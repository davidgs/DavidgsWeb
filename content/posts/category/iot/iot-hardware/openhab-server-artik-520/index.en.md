---
title: "OpenHAB Server on ARTIK-520"
Date: 2017-03-28
Author: davidgs
Category: IoT
Tags: ARTIK, ARTIK-520, IoT, openHAB
Slug: openhab-server-artik-520
hero: images/logo-2.png
---

As I said earlier, when you have a hammer ... So I decided to set up Yet Another IoT Gateway. This time I took a look at [OpenHAB](http://www.openhab.org) the "vendor and technology agnostic open source automation software for your home." Why not, right? I've already set up a [Droplit.io edge server](/posts/category/iot/iot-software/artik-520-droplit-io-edge-device), and an [Eclipse Kura server](/posts/category/general/making-artik-5-iot-gateway-kura/), so why not give one more a try right? Right. So let's dive in.

## Setup

Setup was incredibly easy. Almost scary easy. Seriously. As always, I started with the basic ARTIK Fedora image, and of course updated it with all the latest:

```
[root@localhost ~]# dnf update
```

That takes a while.

**Note:** I start with a fresh OS for each of these projects. Thanks to being able to [dump a running system](/posts/category/general/how-to-save-your-artik-520-backup/) back out to mini-SD Card, I just dump what I was working on to a card, burn a fresh card, and start over.

You're going to need that Zulu JVM I talked about [earlier](/posts/gategory/iot/make-your-artik-520-scream/). Installation is quick and easy, but don't skip it! Apparently the open-jdk version of the JVM won't really give you much joy with OpenHAB. I didn't try it, I just installed the Zulu JVM and went on. In case you forgot, once you've [downloaded the Zulu JVM](https://www.azul.com/products/zulu/):

```
[root@localhost ~]# tar xvf ezdk-1.8.0_112-8.19.0.31-eval-linux_aarch32hf.tar
[root@localhost ~]# update-alternatives --install /usr/bin/java java ~/ezdk-1.8.0_112-8.19.0.31-eval-linux_aarch32hf/jre/bin/java 100
[root@localhost ~]# update-alternatives --config java
```

The only additional package you are going to need is unzip because someone thought it was a good idea to *not* include unzip (or zip for that matter) in the base image. Whatever.

```
[root@localhost ~]# dnf install unzip
```

Easy. Done. Then get the openHAB server. The instructions for this install are [here](http://docs.openhab.org/installation/linux.html#manual-installation), but really I'll tell you everything you need to know.

```
[root@localhost ~]# cd /tmp
[root@localhost /tmp]# wget -O openhab-download.zip https://bintray.com/openhab/mvn/download_file?file_path=org%2Fopenhab%2Fdistro%2Fopenhab%2F2.0.0%2Fopenhab-2.0.0.zip
[root@localhost /tmp]# unzip openhab-download.zip -d /opt/openhab2
[root@localhost /tmp]# rm openhab-download.zip
```

The instructions say to create an openhab user, and then run the openhab server as that user. Don't do that. I guess you can figure out how, but when I did, I kept getting:

```
/opt/openhab2/runtime/bin/karaf: line 28: cd: /root: Permission denied
: JAVA_HOME is not valid: /root/ezdk-1.8.0_112-8.19.0.31-eval-linux_aarch32hf/jre/
```

So finally I just ran it as root. It works just fine as root.

That's really all there was too it! Told you it was easy!

## Using OpenHAB

This is where things got fun! Once the OpenHAB server was started, I connected to the ARTIK-520 using my browser (port 8080, just FYI) and **Voilà**! I had a dashboard of sorts. But nothing was there. Hmmm ... okay, so I had to go install some "bindings".

![Safari017](/posts/category/iot/iot-hardware/images/Safari017.jpg)

There are a **lot** of them.  I chose the ones for the stuff I have. A Samsung TV, some Nest Stuff and those Wemo switches. As soon as I installed those bindings, stuff started showing up in my "Inbox". Like, instantly! What showed up right away were the Wemo switches. As soon as I fixed the network connection on my Samsung TV, it also showed up right away. The Nest stuff is going to take a bit more work since I had to register as a Nest Developer, and I haven't finished jumping through all their hoops just yet.  But the bindings are installed:

![Safari016](/posts/category/iot/iot-hardware/images/Safari016.jpg) "Safari016.jpg"){width="598" height="208"}

I installed the Z-Wave binging for reasons that now escape me. Deal with it.

![Safari015](/posts/category/iot/iot-hardware/images/Safari015.jpg)

And those are all the devices that appeared. And now I can control them!

## Conclusions

The Kura Server took me a week or two to get working, with a fair amount of support from the Eclipse engineers responsible. It really wasn't designed to run on an embedded platform like the ARTIK-520, and had never been tested there, so it's not really surprising.

The Droplit.io Edge Server took me about a week. Actually, the install was pretty easy once I gave up on trying to build the system on the ARTIK-520. Remember my rule: Don't build/compile on ARTIK-520 unless absolutely necessary. Then it took a few days to get a bug worked out so it could find my Wemo switches, but that's about all it was going to find.

The openHAB server was by far the easiest. Took about 2 hours, start to finish, including building/flashing/updating the OS. And it found a lot more devices almost instantly (once I figured out to install the bindings. I don't always read **all** the directions.). It's **very** responsive and easy to deal with.

I've got a bunch more stuff to investigate here, like the 'experimental' rules engine, and I may try out the Text-to-Speech integration if I have time.

In all honesty, this may be my last ARTIK-520 integration test for a while. They aren't actually paying me to do them. In fact, no one is paying me to do anything right now, so until I get **that** fixed, I'll probably spend most of my time job-hunting. And maybe some more time on the resistbot project. This is all easily fixable if someone would decide to hire me. :-)
