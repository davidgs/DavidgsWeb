---
title: « Construire le plus petit serveur InfluxDB du monde »
Date: 2020-02-13
Author: davidgs
Category: Gadgetry, IoT, Work
Slug: building-the-worlds-smallest-influxdb-server
hero: images/giant-board-pin-out-1024x690.png
---

Je l'ai construit beaucoup de serveurs [InfluxDB](https://www.influxdata.com/products/influxdb-overview/) dans mon temps ici, et je l'ai construit quelques jolis ésotériques à cela, mais je pense que je « ai finalement retiré ce qui ne peut être décrit comme le plus petit serveur InfluxDB du monde! De retour à l'été 2019, j'ai vu un projet sur) dans mon temps ici, et je l'ai construit quelques jolis ésotériques à cela, mais je pense que je « ai finalement retiré ce qui ne peut être décrit comme le plus petit serveur InfluxDB du monde! De retour à l'été 2019, j'ai vu un projet sur [CrowdSupply.com](https://www.crowdsupply.com/groboards/giant-board) pour ce qu'on appelle le « Conseil géant ». Il avait l'air vraiment, vraiment cool! Une carte unique complète Computer (SBC) qui a couru Linux, le tout dans un facteur de forme de plumes. Je me suis immédiatement l'a soutenu! Puis, en pensant à ce sujet pour une seconde, je l'a soutenu * nouveau *! Donc, je suis arrivé 2 de ces choses. accident total, je le jure.

Quelques spécifications. Voici ce que le Conseil géant est en fait:

** Conseil géant Spécifications **:

- ** Processeur **: Microchip SAMA5D2 ARM® Cortex®-A5 Processeur 500 MHz
- ** ** Mémoire: 128 Mo DDR2 RAM
- ** ** Stockage: Carte microSD
- ** ** Détection: 6 x 12 bits ADC avec 3,3 référence V et déclenchement externe
- ** ** Actuation: 4 x 16 bits PWM avec déclenchement externe
- ** Connectivité **: 1 x I²C, 1 x SPI, 1 x UART, plus avec Flexcom
- ** Puissance **: via USB, avec prise en charge pour les batteries LiPo
- ** Système d'exploitation **: ligne principale du noyau Linux

Dans ce petit facteur de forme que je l'habitude d'utiliser pour Microcontrôleurs!

Eh bien, il y a quelques semaines, ils sont arrivés! Alors, quelques photos unboxing:

![GiantBoard dans le paquet](/posts/category/database/images/IMG_6750-768x1024.png)

Attendez, l'ensemble unique chose dans ce un petit sac? Oui. Non seulement cela - il y a plusieurs parties dans ce sac! Et je me rends compte (maintenant) qu'il n'y a pas d'échelle à ce sac dans l'image, mais c'est un Mac souris à côté. Je reprends l'image, mais je l'ai déjà jeté les sacs hors de portée!

![Pièces Conseil géant](/posts/category/database/images/IMG_6752-1-768x1024.png)

C'est vrai: j'ai commandé add-on de la Plume d'aile WiFi parce que, après tout, ce qui est un conseil IdO - et surtout ce qui est un serveur InfluxDB - sans réseau!

![Conseil géant avec aile de plumes](/posts/category/database/images/IMG_6754-1-768x1024.png)

Et pour l'échelle, qui est un quart des États-Unis entre eux. Alors que ça va être mon serveur * et * mon interface réseau! Pour ce qu'on appelle le « Conseil Giant » il est sûr petit!

Après un peu de soudure, je l'avais tous ensemble et de vente, avec l'ajout d'une carte MicroSD, il démarra!

![ligne de commande avec connexion au Conseil géant](/posts/category/database/images/Screen-Shot-2020-02-11-at-9.04.12-AM.png)

Woah! Cette chose minuscule peu court Debian Linux? Pourquoi oui, oui il le fait! Alors qui fait [installation InfluxDB](https://docs.influxdata.com/influxdb/v1.7/introduction/installation/) super simple, puisque nous livrons déjà binaires ARMv7 pour InfluxDB et tout le reste de la) super simple, puisque nous livrons déjà binaires ARMv7 pour InfluxDB et tout le reste de la [TICK Stack](https://www.influxdata.com/time-series-platform/)!

![Terminal montrant influxd fonctionnement](/posts/category/database/images/Screen-Shot-2020-02-11-at-9.07.54-AM.png)

Ok, bien sûr, il est actuellement marteler ce petit processeur, mais il est également en cours d'exécution!

![tir direct d'un tableau de bord sur le plateau géant](/posts/category/database/images/Kapture-2020-01-21-at-12.22.19-1024x372.gif)

Et comme vous pouvez le voir, les pistes de tableau de bord [Chronograf](https://www.influxdata.com/time-series-platform/chronograf/) pour me donner une vue sur la façon dont l'ensemble est en cours d'exécution!

Maintenant, ce que j'exécuter ce en tant que système de production? Absolument pas! Comme vous pouvez le voir, il utilise beaucoup trop de ressources système sur un si petit appareil. Est-ce que je l'exécuter comme une collection de bord et le dispositif de transfert? Très probablement. Est-ce que je l'exécuter comme un dispositif d'agent embarqué [Telegraf](https://www.influxdata.com/time-series-platform/telegraf/)? 100% tout à fait. D'autant plus que je peux aussi le faire avec elle:

![Géant Conseil fonctionne sur batterie](/posts/category/database/images/IMG_6779-768x1024.png)

Ce qui est juste, je peux courir sur une batterie! Une batterie rechargeable LiPo à ce (et le circuit de recharge est intégré à la carte!). Et pour être complet, je vais vous donner une épingle ici afin que vous puissiez voir ce que * autre * que je peux ajouter à cette chose - capteurs, actionneurs, etc., - pour le rendre à la fois un nœud de données et un noeud de capteur:

![Conseil géant carte Brochage](/posts/category/database/images/giant-board-pin-out-1024x690.png)

Ensuite, je vais construire une version de InfluxDB 2.0 pour ARMv7 et voir si cela fonctionne mieux ou pire sur cet appareil, suivre donc pour voir ce qui se passe!
