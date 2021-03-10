---
title: "ARTIK-520 as a Droplit.io Edge Device"
Date: 2017-03-28
Author: davidgs
Category: IoT
Tags: ARTIK, ARTIK-520, Droplit, droplit-edge, IoT
Slug: artik-520-droplit-io-edge-device
hero: images/Droplit-Logo1.png
---

Doing some further work with my trusty ARTIK-520 (hey, when you have a hammer, everything looks like a nail! Back up off me! ) I decided to try installing another IoT Gateway framework on it. (I've done that [before](/posts/category/general/making-artik-5-iot-gateway-kura/).) Equal opportunity and all that. And I'll be doing more of them as soon as I get more mini-SD Cards in-house. But I digress.

I originally just followed the basic install [instructions](https://docs.droplit.io/docs/deploy-an-edge-server) for deploying a Droplit.io Edge server. But that didn't work. No fault of Droplit.io, to be sure. And really no fault of the ARTIK-520. But here's my new rule:

**Do Not Compile/build On ARTIK-520**

It just doesn't ever end well. It may be a pain to set up a cross-compiler on your architecture, but you only have to do that once (and lucky me I already had the ARM compiler toolchain installed and working from working on [MyNewt](http://mynewt.apache.org/). But you won't even need a compiler for Droplit.io edge. It's all JavaScript, so it's pretty easy.

## Setup

Once you've got the Droplit.io-edge wad on your laptop (or whatever) and all the prerequisites, just build it according to the [instructions](https://docs.droplit.io/docs/deploy-an-edge-server). Don't actually run it from your laptop though. Once I had it built, I just ran:

```
DSimmons-Pro:~ dsimmons$ tar czf droplit.tgz droplit.io-edge
```

And then used sftp to copy the compressed tar file over to the ARTIK-520, un-compress/tar it and then:

```
[root@localhost ~]# export DEBUG=droplit:*
[root@localhost ~]# cd droplit.io-edge/
[root@localhost droplit.io-edge]# node droplit-edge
droplit:router using setting host: wss://edge-ws.droplit.io/edge +0ms
droplit:router using setting ecosystem: C58c71404f57350103c9a8dda +19ms
droplit:router using setting edge id: 36:e8:d4:9e:f4:a6 +7ms
droplit:router load plugins +7ms
droplit:router droplit-plugin-philips-hue loaded +2s
droplit:router droplit-plugin-lifx loaded +85ms
droplit:router droplit-plugin-sonos loaded +2s
droplit:router droplit-plugin-wemo loaded +2s
droplit:transport-edge reconnecting... +4ms
droplit:transport-edge connected +805ms
droplit:router info < droplit-plugin-wemo:uuid:Socket-1_0-221631K0100D8A +6s
droplit:router info < droplit-plugin-wemo:uuid:Socket-1_0-221643K0101D76 +200ms
droplit:router id > uuid:Socket-1_0-221631K0100D8A -> 58da675822fea674dc071474 +62ms
droplit:router pc < uuid:Socket-1_0-221631K0100D8ABinarySwitch.switch off +59ms
droplit:router info < droplit-plugin-wemo:uuid:Lightswitch-1_0-221614K1300BE2 +181ms
droplit:router id > uuid:Socket-1_0-221643K0101D76 -> 58da675922fea674dc071475 +26ms
droplit:router pc < uuid:Socket-1_0-221643K0101D76BinarySwitch.switch off +24ms
droplit:router pc < uuid:Lightswitch-1_0-221614K1300BE2BinarySwitch.switch off +30ms
droplit:router id > uuid:Lightswitch-1_0-221614K1300BE2 -> 58da675922fea674dc071476 +130ms
```

I set the DEBUG property because I wanted to see what was actually going on behind the scenes (plus I was actually debugging a problem with the Droplit folks, who are awesome about helping out and super responsive!).

You'll see that **very** quickly the Droplit-io edge server found the [Wemo](http://www.wemo.com) switches I have deployed in my house. Sweet! I then went to my [Droplit.io developer portal](https://portal.droplit.io/) and:

![Safari014](/posts/category/iot-iot-software/images/Safari014.jpg)

And there they are! And I have verified that I can indeed turn them on and off from here.

Now, if anyone wants to send me some [Sonos](http://www.sonos.com/en-us/home) gear, or some [Philips HUE](http://www2.meethue.com/en-us/) gear, that I can install here at home to test with this, I'd be happy to test that out.

I may see about creating some connectors to connect things like my MyNewt-based devices to the edge server, but that's not going to happen today.

## Conclusions

As usual, I have found the ARTIK-520 to be a fairly easy, and very versatile, IoT hub. This is my second gateway project with ARTIK-520 and, though I have run into some quirks each time, it's basically pretty straight-forward to set up. Again, **don't try to build/compile on the ARTIK-520** unless you absolutely *have* to, and it's a relatively small build. I've actually built Node.js from source on the ARTIK-520 a couple of times and it was slow, but relatively painless.

[Droplit.io](http://droplit.io) is a fairly straightforward deployment target for ARTIK-520. As small as the actual ARTIK module is (aside from all the development board stuff) it would be a pretty attractive target for a Droplit.io 'appliance', though I'm not sure the price-point would hit a reasonable target for them.

As I said, I'd like to try my hand at building some connectors for other IoT devices for Droplit, and I'm certainly looking at some other gateways to build/deploy on this ARTIK-520 board. Stay tuned!
