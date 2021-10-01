---
title: "Toegang tot uw Raspberry Pi Zero W"
Date: 2017-04-12
Author: davidgs
Category: IoT
Tags: IoT, Raspberry Pi
Slug: accessing-your-raspberry-pi-zero-w
hero: images/pi_zero_w_board.jpg
reading_time: 3 minutes
---

Als je het geluk hebt om je handen te krijgen op een Raspberry Pi Zero W bent geweest, dan kun je genieten van deze. Als u nog steeds voor één zit te wachten, bookmark dit. Tenzij je toevallig extra HDMI beeldschermen, toetsenborden en muizen liggen rond te hebben. Ik niet, dus de configuratie van de mijne was een pain in the ass. Ik heb die pijn voor u opgelost, dus lees verder.

Ten eerste, natuurlijk, moet u downloaden en installeren van de nieuwste [Raspian-OS](https://www.raspberrypi.org/downloads/raspbian/). Ik weet niet of Noobs werkt of niet, zo YMMV daar. Vervolgens, het branden van de SD-kaart met de kaart schrijven van software van uw keuze. Lees over dat [hier](https://www.raspberrypi.org/documentation/installation/installing-images/README.md). Nu, zodra je SD-kaart is voltooid, hier is hoe gemakkelijk je Raspberry Pi Zero W weergegeven op uw draadloze netwerk en laat u zich aanmeldt om het te **zonder** met een monitor, toetsenbord, enz.

Ten eerste, zet de SD-kaart, dan wil je 2 bestanden te maken in de / boot partitie. De eerste zal je Pi Zero W te krijgen op uw draadloze netwerk.

```
$ cat spa_supplicant.conf
network={
    ssid=<Your SSID Name>
    psk=<Your WiFi Password>
}
```
Nogmaals, dat bestand in de map / boot partitie van de Raspian SD-kaart worden geplaatst. Vervolgens zult u wilt in staat zijn om in te loggen op het ding, dus

```
$ touch /boot/ssh
```

Je hebt eigenlijk zet alles wat je wilt in dat bestand, of helemaal niets. Zolang het bestaat, kunt u prima.

Nu kunt u ontkoppelen en uitwerpen je SD-kaart, en pop in uw Pi Zero W, plug dat kleine ding, en het moet opstarten en deelnemen aan uw WiFi-netwerk. Zodra het is, kunt u ssh in deze (gebruikersnaam 'pi', wachtwoord 'framboos' natuurlijk) en je bent klaar om te gaan!

Ik wil dingen makkelijk te maken en ga je gang en installeer een VNC-server op de Pi Zero W zodat ik een volledige desktop op het kunt krijgen van mijn laptop, maar het belangrijkste voor mij is om te kunnen om het ding te brengen zonder monitor, toetsenbord en muis! Misschien op een dag de Raspberry Pi mensen zullen slechts in staat één van de USB-poorten als een terminal uit de doos, zodat we niet hoeven te doen. Een man kan dromen.
