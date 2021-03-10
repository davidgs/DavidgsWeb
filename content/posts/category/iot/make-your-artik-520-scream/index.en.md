---
title: "Make your ARTIK-520 Scream"
Date: 2017-03-06
Author: davidgs
Category: IoT
Tags: ARTIK, ARTIK-520, IoT, Java
Slug: make-your-artik-520-scream
hero: images/Zulu-Duke200.png
---

If you read [last week's post](/posts/category/general/making-artik-5-iot-gateway-kura/) about making an ARTIK-520 an IoT gateway device using the [Eclipse Kura project](http://www.eclipse.org/kura/), then this will be a noticeable improvement for you if you're going to try it yourself (and why wouldn't you? It was an excellent little How To on getting started with ARTIK-520 and IoT!)

It was suggested to me (these little birdies keep feeding me interesting nuggets to try) that I try the [Azul Zulu Embedded JVM](https://www.azul.com/products/zulu-embedded/) as an alternative to the OpenJDK JVM that is installed by default. Ok, sure, why not. What's the worst that could happen. Don't answer that. 

Anyway, this is going to be a short post. I tried it. I downloaded the Zulu JVM and installed it like so:

```
[root@localhost ~]# tar xvf ezdk-1.8.0_112-8.19.0.31-eval-linux_aarch32hf.tar
[root@localhost ~]# update-alternatives --install /usr/bin/java java ~/ezdk-1.8.0_112-8.19.0.31-eval-linux_aarch32hf/jre/bin/java 100
[root@localhost ~]# update-alternatives --config java
[root@localhost ~]# systemctl restart kura.service 
```

Now reload the Kura Web Console in your browser. 

At least for me, there was a quite noticeable and marked improvement in the performance of the web service. As in I **really** noticed it. But then again, although I was too polite to comment on it in my [previous post](/posts/category/general/making-artik-5-iot-gateway-kura/), I had noticed that the performance of Kura had been bit sluggish. I just attributed that to the fact that we're running on some embedded hardware and that's almost always slower than more robust platforms. But get yourself a high-performance JVM and get a few seconds of your life back every time you take an action in Kura. Those are seconds that, once lost, you'd never have gotten back. Seconds that you can now use to fully spell out 'your' in text messages instead of just typing 'ur'. This will make the world a better place for everyone. 
