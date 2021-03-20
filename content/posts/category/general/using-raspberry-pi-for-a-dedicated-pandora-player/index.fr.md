---
title: « Utilisation Raspberry Pi pour un lecteur dédié Pandora »
Date: 2016-05-23
Author: davidgs
Category: Gadgetry, IoT, Misc
Tags: IoT, Raspberry Pi
Slug: using-raspberry-pi-for-a-dedicated-pandora-player
hero: images/raspberry-pi-logo.png
---

L'appel Let un Pandora Pi, allons-nous?

Quoi qu'il en soit, j'ai un (non technique) ami qui a toujours été jaloux de la configuration de la musique que j'ai dans ma maison. J'ai un tas de haut-parleurs Bose série III mis en place autour de la maison, relié à Airport Express stations de base pour que je puisse diffuser de la musique dans toute la maison. Il y a toujours de la musique ici, généralement dans toute la maison - cuisine, salon, bureau, etc. Fonctionne très bien pour moi!

Quoi qu'il en soit, elle voulait une configuration similaire dans sa maison, mais seulement dans une seule pièce, et pour Pandora. Au début, je l'ai mis en place avec Pandora, un ensemble de haut-parleurs Bose, un Airport Express et Airfoil sur son PC (elle n'est pas un magasin Mac, comme je suis) et qui a fonctionné assez bien. La plupart.

Mais son PC était toujours s'écraser, ou Airfoil serait tout simplement cesser de fumer, ou son PC perdrait la connectivité réseau, ou d'autres manigances causerait la musique pour arrêter. Il conduisait sa folle.

Alors j'ai décidé de lui construire un lecteur dédié Pandora qu'elle pouvait garder dans la cuisine et l'utilisation de la musique de jeu sans tous les maux de tête qu'elle éprouvait. Il était plus facile que je pensais que ce serait!

Voici la liste des composants de base:

- Raspberry Pi 2 B +
- (http://www.amazon.com/external-Adapter-Windows-Microphone-SD-CM-UAUD/dp/B001MSS6CS?ie=UTF8&amp;psc=1&amp;redirect=true&amp;ref_=oh_aui_detailpage_o07_s00) [SYBA USB externe stéréo adaptateur audio](http://www.amazon.com/external-Adapter-Windows-Microphone-SD-CM-UAUD/dp/B001MSS6CS?ie=UTF8&psc=1&redirect=true&ref_=oh_aui_detailpage_o07_s00)
- [affichage Tonique 3,5 pouces + cas](http://www.amazon.com/Tontec®-Raspberry-Display-Touchscreen-Transparent/dp/B00NANNJLQ?ie=UTF8&psc=1&redirect=true&ref_=oh_aui_detailpage_o00_s00)

Qu'il est pour le matériel! Seulement environ 100USD $ pour l'ensemble de l'installation.

Le logiciel a été tout aussi facile. Je [Raspian Jessie](https://www.raspberrypi.org/downloads/raspbian/), et a ajouté), et a ajouté [Pithos](http://pithos.github.io) pour la lecture Pandora. Facile.

Mise en place Pithos sur l'écran de 3,5 pouces n'a pas été possible, bien sûr (je suppose qu'il était possible, si j'avais attaché un clavier) mais je viens de commencer un serveur VNC sur Pi et affiché à distance pour effectuer la configuration.) Une fois qui était tous ensemble, j'ai ajouté une configuration d'application par défaut pour le démarrage automatique Pithos lors de la connexion, et tout a commencé à jouer dès que vous tournez la chose sur.
