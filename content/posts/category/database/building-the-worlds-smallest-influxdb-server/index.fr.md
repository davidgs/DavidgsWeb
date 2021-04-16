---
title: "Construire le plus petit serveur InfluxDB au monde"
Date: 2020-02-13
Author: davidgs
Category: Gadgetry, IoT, Work
Slug: building-the-worlds-smallest-influxdb-server
hero: images/giant-board-pin-out-1024x690.png
---

J'ai construit beaucoup de serveurs [InfluxDB](https://www.influxdata.com/products/influxdb-overview/) pendant mon séjour ici, et j'en ai construit quelques-uns assez ésotériques, mais je pense que je 'ai enfin réussi ce qui ne peut être décrit que comme le plus petit serveur InfluxDB du monde! De retour à l'été 2019, j'ai vu un projet sur [CrowdSupply.com](https://www.crowdsupply.com/groboards/giant-board) pour quelque chose appelé le «Giant Board». Ça avait l'air vraiment, vraiment cool! Un ordinateur à carte unique (SBC) complet fonctionnant sous Linux, le tout dans un format Feather. Je l'ai immédiatement soutenu! Puis, en y réfléchissant une seconde, je l'ai soutenu*encore*! Donc j'ai 2 de ces choses. Accident total, je le jure.

Quelques spécifications. Voici ce qu'est réellement le plateau géant:

** Spécifications de la planche géante **:

- **Processeur**: Microchip SAMA5D2 ARM® Cortex®-A5 Processor 500 MHz
- ** Mémoire **: 128 Mo de RAM DDR2
- **Stockage**: carte microSD
- ** Détection **: 6 x ADC 12 bits avec référence 3,3 V et déclenchement externe
- **Actionnement**: 4 x 16 bits PWM avec déclenchement externe
- ** Connectivité **: 1 x I²C, 1 x SPI, 1 x UART, plus avec Flexcom
- **Alimentation**: via USB, avec prise en charge des batteries LiPo
- ** Système d'exploitation **: noyau Linux principal

Le tout dans ce petit format que j'utilise habituellement pour les microcontrôleurs!

Eh bien, il y a quelques semaines, ils sont arrivés! Alors, quelques images de déballage:

![GiantBoard dans le paquet](/posts/category/database/images/IMG_6750-768x1024.png)

Attendez, tout tient dans ce petit sac? Oui. Non seulement cela - il y a plusieurs pièces dans ce sac! Et je me rends compte (maintenant) qu'il n'y a pas d'échelle pour ce sac sur la photo, mais c'est une souris Mac à côté. Je reprendrais la photo, mais j'ai déjà jeté les sacs!

![Pièces de plateau géant](/posts/category/database/images/IMG_6752-1-768x1024.png)

C'est vrai: j'ai commandé le module complémentaire WiFi Feather Wing car, après tout, qu'est-ce qu'une carte IoT - et surtout qu'est-ce qu'un serveur InfluxDB - sans réseau!

![Planche géante avec aile plume](/posts/category/database/images/IMG_6754-1-768x1024.png)

Et juste pour l'échelle, c'est un quartier américain entre eux. Ce sera donc mon serveur*et* mon interface réseau! Pour quelque chose qui s'appelle le «Giant Board», c'est vraiment petit!

Après un peu de soudure, j'ai tout mis en place et, avec l'ajout d'une carte MicroSD, il a démarré!

![Ligne de commande avec connexion au tableau géant](/posts/category/database/images/Screen-Shot-2020-02-11-at-9.04.12-AM.png)

Woah! Cette toute petite chose exécute Debian Linux? Pourquoi oui, oui! Cela rend [l'installation d'InfluxDB](https://docs.influxdata.com/influxdb/v1.7/introduction/installation/) super simple puisque nous livrons déjà des binaires ARMv7 pour InfluxDB et tout le reste de la [TICK Stack](https://www.influxdata.com/time-series-platform/)!

![Terminal montrant influxd en cours d'exécution](/posts/category/database/images/Screen-Shot-2020-02-11-at-9.07.54-AM.png)

Ok, bien sûr, il martèle actuellement ce minuscule processeur, mais il fonctionne également!

![Prise de vue en direct d'un tableau de bord sur le tableau géant](/posts/category/database/images/Kapture-2020-01-21-at-12.22.19-1024x372.gif)

Et comme vous pouvez le voir, le tableau de bord fonctionne dans [Chronograf](https://www.influxdata.com/time-series-platform/chronograf/) pour me donner une vue d'ensemble du fonctionnement!

Maintenant, est-ce que j'exécuterais cela comme un système de production? Absolument pas! Comme vous pouvez le voir, il utilise beaucoup trop de ressources système sur un si petit appareil. Est-ce que je l'exécuterais comme un périphérique de collecte et de transfert Edge? Très probablement. Est-ce que je l'exécuterais en tant qu'agent agent [Telegraf](https://www.influxdata.com/time-series-platform/telegraf/) intégré? 100% absolument. D'autant que je peux aussi faire ça avec:

![Tableau géant fonctionnant sur batterie](/posts/category/database/images/IMG_6779-768x1024.png)

C'est vrai, je peux l'exécuter sur une batterie! Une batterie LiPo rechargeable en plus (et le circuit de recharge est intégré à la carte!). Et pour être complet, je vais fournir un brochage ici afin que vous puissiez voir ce que * d'autre * je peux ajouter à cette chose - capteurs, actionneurs, etc., - pour en faire à la fois un nœud de données et un nœud de capteur:

![Carte de brochage du panneau géant](/posts/category/database/images/giant-board-pin-out-1024x690.png)

Ensuite, je vais créer une version d'InfluxDB 2.0 pour ARMv7 et voir si cela fonctionne mieux ou moins bien sur cet appareil, alors regardez cet espace pour voir ce qui se passe!
