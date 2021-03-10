---
title: "Using Raspberry Pi for a Dedicated Pandora Player"
Date: 2016-05-23
Author: davidgs
Category: Gadgetry, IoT, Misc
Tags: IoT, Raspberry Pi
Slug: using-raspberry-pi-for-a-dedicated-pandora-player
hero: images/raspberry-pi-logo.png
---

Let’s call it a Pandora Pi, shall we? 

Anyway, I have a (non-technical) friend that was always envious of the music setup I have in my house. I have a bunch of Bose Series III speakers set up around the house, connected to Airport Express Basestations so that I can broadcast music throughout the house. There’s always music playing around here, usually throughout the whole house — kitchen, living room, office, etc. Works great for me!

Anyway, she wanted a similar setup in her house, but only in one room, and for Pandora. At first I set her up with Pandora, a set of Bose Speakers, an Airport Express, and Airfoil on her PC (she’s not a Mac shop, like I am) and that worked reasonably well. Mostly. 

But her PC was always crashing, or Airfoil would just quit, or her PC would lose network connectivity, or some other shenanigans would cause the music to stop. It was driving her crazy. 

So I decided to build her a dedicated Pandora Player that she could keep in the kitchen and use to play music without all the headaches she was having. It was actually easier than I thought it would be!

Here’s the basic list of components:

- Raspberry Pi 2 B+
- [SYBA external USB Stereo Sound Adapter](http://www.amazon.com/external-Adapter-Windows-Microphone-SD-CM-UAUD/dp/B001MSS6CS?ie=UTF8&psc=1&redirect=true&ref_=oh_aui_detailpage_o07_s00) (because Raspberry Pi on-board audio sucks)
- [Tonic 3.5 inch display + case](http://www.amazon.com/Tontec®-Raspberry-Display-Touchscreen-Transparent/dp/B00NANNJLQ?ie=UTF8&psc=1&redirect=true&ref_=oh_aui_detailpage_o00_s00)

That’s it for hardware! Only about $100USD for the whole setup.

Software was just as easy. I used [Raspian Jessie](https://www.raspberrypi.org/downloads/raspbian/), and added [Pithos](http://pithos.github.io) for Pandora playback. Easy. 

Setting up Pithos on the 3.5 inch screen wasn’t possible, of course (I guess it was possible, had I attached a keyboard) but instead I just started a VNC server on the Pi and remotely displayed it to do the setup.) Once that was all set, I added a default application setup to auto-start Pithos on login, and it all started to play as soon as you turn the thing on. 
