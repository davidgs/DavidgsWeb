---
title: « L'accès à votre Raspberry Pi zéro W »
Date: 2017-04-12
Author: davidgs
Category: IoT
Tags: IoT, Raspberry Pi
Slug: accessing-your-raspberry-pi-zero-w
hero: images/pi_zero_w_board.jpg
reading_time: 3 minutes
---

Si vous avez eu la chance de mettre la main sur un Raspberry Pi zéro W, alors vous pourriez profiter de cela. Si vous attendez encore un, ce signet. À moins que vous arrive d'avoir des moniteurs HDMI supplémentaires, des claviers et des souris qui traînent. Je ne suis pas, si le mien était un train de configurer la douleur dans le cul. Je l'ai résolu que la douleur pour vous, alors lisez la suite.

Tout d'abord, bien sûr, vous aurez besoin de télécharger et installer la dernière [Raspian-OS](https://www.raspberrypi.org/downloads/raspbian/). Je ne sais pas si Noobs fonctionne ou non, donc il YMMV. Ensuite, brûler la carte SD avec le logiciel de carte-écriture de votre choix. Lire ce). Je ne sais pas si Noobs fonctionne ou non, donc il YMMV. Ensuite, brûler la carte SD avec le logiciel de carte-écriture de votre choix. Lire ce [ici](https://www.raspberrypi.org/documentation/installation/installing-images/README.md). Maintenant, une fois que votre carte SD est terminée, voici comment faire facilement votre Raspberry Pi Zéro W apparaissent sur votre réseau sans fil et laissez-vous connecter à ce ** sans ** avec un moniteur, clavier, etc.

Tout d'abord, installez la carte SD, puis, vous voulez créer 2 fichiers dans la partition / boot. Le premier sera obtenir votre Pi Zéro W sur votre réseau sans fil.

```
$ cat spa_supplicant.conf
network={
    ssid=<Your SSID Name>
    psk=<Your WiFi Password>
}
```
Encore une fois, ce fichier doit être placé dans la partition / boot de la carte SD Raspian. Ensuite, vous aurez envie d'être capable de se connecter à la chose, donc

```
$ touch /boot/ssh
```

Vous mettez en fait tout ce que vous voulez dans ce fichier, ou rien du tout. Tant qu'il existe, vous serez très bien.

Maintenant, vous pouvez démonter et éjecter votre carte SD, et de la pop dans votre Pi zéro W, prise cette petite chose, et il devrait démarrer et rejoindre votre réseau WiFi. Une fois qu'il est, vous pouvez le client ssh (nom d'utilisateur « pi », mot de passe « framboise » bien sûr) et vous êtes prêt à partir!

Je tiens à rendre les choses faciles et aller de l'avant et d'installer un serveur VNC sur le Pi zéro W pour que je puisse obtenir un ordinateur de bureau version complète de mon ordinateur portable, mais la chose principale, pour moi, est d'être en mesure d'apporter la chose en sans moniteur, clavier et souris! Peut-être un jour les gens Raspberry Pi vont juste permettre à l'un des ports USB comme sur la borne de la boîte de sorte que nous ne devrons pas faire. Un gars peut rêver.
