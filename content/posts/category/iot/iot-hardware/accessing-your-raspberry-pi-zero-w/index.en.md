---
title: "Accessing your Raspberry Pi Zero W"
Date: 2017-04-12
Author: davidgs
Category: IoT
Tags: IoT, Raspberry Pi
Slug: accessing-your-raspberry-pi-zero-w
hero: images/pi_zero_w_board.jpg
---

If you've been lucky enough to get your hands on a Raspberry Pi Zero W, then you might enjoy this. If you're still waiting for one, bookmark this. Unless you happen to have extra HDMI monitors, keyboards and mice lying around. I don't, so configuring mine was a pain in the ass. I've solved that pain for you, so read on.

First, of course, you'll need to download and install the latest [Raspian-OS](https://www.raspberrypi.org/downloads/raspbian/). I don't know if Noobs works or not, so YMMV there. Next, burn the SD Card with the card-writing software of your choice. Read up on that [here](https://www.raspberrypi.org/documentation/installation/installing-images/README.md). Now, once your SD Card is complete, here's how to easily make your Raspberry Pi Zero W show up on your wireless network and let you login to it **without** having a monitor, keyboard, etc. 

First, mount the SD Card, then, you'll want to create 2 files in the /boot partition. The first one will get your Pi Zero W on your wireless network. 

```
$ cat spa_supplicant.conf
network={
    ssid=<Your SSID Name>
    psk=<Your WiFi Password>
}
```
Again, that file should be placed in the /boot partition of the Raspian SD Card. Next, you'll want to be able to login to the thing, so 

```
$ touch /boot/ssh
```

You actually put anything you want in that file, or nothing at all. As long as it exists, you'll be fine. 

Now you can unmount and eject your SD Card, and pop it into your Pi Zero W, plug that little thing in, and it should boot up and join your WiFi network. Once it's up, you can ssh into it (username 'pi', password 'raspberry' of course) and you're ready to go!

I like to make things easy and go ahead and install a VNC Server on the Pi Zero W so that I can get a full desktop on it from my Laptop, but the main thing, for me, is to be able to bring the thing up without a monitor, keyboard and mouse! Maybe someday the Raspberry Pi folks will just enable one of the USB Ports as a terminal out of the box so we won't have to do this. A guy can dream. 
