---
title: "Maak je ARTIK-520 Scream"
Date: 2017-03-06
Author: davidgs
Category: IoT
Tags: ARTIK, ARTIK-520, IoT, Java
Slug: make-your-artik-520-scream
hero: images/Zulu-Duke200.png
reading_time: 2 minutes
---

Als je leest [vorige week post] (/ berichten / category / algemeen / making-artik-5-iot-gateway-kura /) over het maken van een ARTIK-520 een IoT gateway-apparaat met behulp van de [Eclipse Kura project] (http: / /www.eclipse.org/kura/), dan zal dit een merkbare verbetering voor je zijn als je gaat om het zelf te (proberen en waarom zou je niet? Het was een uitstekende kleine How To aan de slag met ARTIK- 520 en ivd!)

Er werd voorgesteld om me (deze kleine vogeltjes blijven voeden me interessante nuggets te proberen) dat ik probeer de [Azul Zulu Embedded JVM](https://www.azul.com/products/zulu-embedded/) als alternatief voor de OpenJDK JVM die standaard wordt geïnstalleerd. Ok, zeker, waarom niet. Wat is het ergste dat kan gebeuren. Geen antwoord geven.

Hoe dan ook, dit gaat om een kort bericht zijn. Ik heb het geprobeerd. Ik downloadde de Zulu JVM en geïnstalleerd als volgt:

```
[root@localhost ~]# tar xvf ezdk-1.8.0_112-8.19.0.31-eval-linux_aarch32hf.tar
[root@localhost ~]# update-alternatives --install /usr/bin/java java ~/ezdk-1.8.0_112-8.19.0.31-eval-linux_aarch32hf/jre/bin/java 100
[root@localhost ~]# update-alternatives --config java
[root@localhost ~]# systemctl restart kura.service 
```

Nu opnieuw de Kura webconsole in uw browser.

Tenminste voor mij, was er een opvallend en duidelijke verbetering in de prestaties van de web service. Net als in I **echt** opgemerkt. Maar nogmaals, hoewel ik te beleefd om commentaar op het in mijn [vorige post] was (/ berichten / category / algemeen / making-artik-5-iot-gateway-kura /), ik had gemerkt dat de prestaties van Kura gehad beetje traag geweest. Ik toegeschreven dat aan het feit dat we draaien op een aantal embedded hardware en dat is bijna altijd trager dan robuuster platforms. Maar krijg je een high-performance JVM en krijg een paar seconden van je leven weer elke keer dat u een actie in Kura nemen. Dat zijn seconden dat, een keer verloren, je nooit hebben gekregen terug. Seconden die u kunt nu gebruiken voor het volledig beschrijven 'uw' in sms-berichten in plaats van alleen te typen 'ur'. Dit zal de wereld een betere plek te maken voor iedereen.
