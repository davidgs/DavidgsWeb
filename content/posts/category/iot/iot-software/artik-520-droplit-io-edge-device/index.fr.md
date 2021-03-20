---
title: « ARTIK-520 comme un périphérique bord Droplit.io »
Date: 2017-03-28
Author: davidgs
Category: IoT
Tags: ARTIK, ARTIK-520, Droplit, droplit-edge, IoT
Slug: artik-520-droplit-io-edge-device
hero: images/Droplit-Logo1.png
---

Faire un travail plus loin avec mon fidèle ARTIK-520 (hey, quand vous avez un marteau, tout ressemble à un clou! Retour en moi!) J'ai décidé d'essayer d'installer un autre cadre IdO Gateway sur elle. (Je l'ai fait [avant](/posts/category/general/making-artik-5-iot-gateway-kura/).) Égalité des chances et de tout cela. Et je vais faire plus d'entre eux dès que je reçois plus d'un mini-SD Cards en interne. Mais je digresse.

Au départ, je viens de suivre l'installation de base [instructions](https://docs.droplit.io/docs/deploy-an-edge-server) pour déployer un serveur bord Droplit.io. Mais cela ne fonctionne pas. Aucun défaut de Droplit.io, pour être sûr. Et vraiment DÉFAUT de la ARTIK-520. Mais voici ma nouvelle règle:

** Ne pas Compile / build sur ARTIK-520 **

Il ne finir jamais bien. Il peut être une douleur à mettre en place un compilateur croisé sur votre architecture, mais vous ne devez faire qu'une fois (et la chance moi, j'avais déjà le compilateur ARM toolchain installé et fonctionne de travailler sur [MyNewt](http://mynewt.apache.org/). Mais vous ne serez pas même besoin d'un compilateur pour le bord Droplit.io. il est tout JavaScript, il est donc assez facile.

## Installer

Une fois que vous avez la bourre Droplit.io-bord sur votre ordinateur portable (ou autre) et toutes les conditions préalables, tout construis selon les [instructions](https://docs.droplit.io/docs/deploy-an-edge-server). Ne courez pas réellement de votre ordinateur portable bien. Une fois que je l'avais construit, je viens de rencontrer:

```
DSimmons-Pro:~ dsimmons$ tar czf droplit.tgz droplit.io-edge
```

Et puis utilisé sftp pour copier le fichier tar compressé vers le ARTIK-520, non compress / goudron, puis:

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

Je mets la propriété DEBUG parce que je voulais voir ce qui se passe réellement dans les coulisses (plus je débogage en fait un problème avec les gens Droplit, qui sont super d'aider à répondre et super!).

Vous verrez que très ** ** rapidement le serveur Edge Droplit-io a trouvé le (http://www.wemo.com) [Wemo] commutateurs J'ai déployé dans ma maison. Doux! Je suis ensuite allé à mon [portail développeur Droplit.io](http://www.wemo.com) et:

![Safari014](/posts/category/iot-iot-software/images/Safari014.jpg)

Et ils sont là! Et je l'ai vérifié que je peux bien les allumer et éteindre d'ici.

Maintenant, si quelqu'un veut me envoyer [Sonos](http://www.sonos.com/en-us/home) vitesse, ou d'un) vitesse, ou d'un [Philips HUE](http://www2.meethue.com/en-us/) vitesse, que je peux installer ici à la maison pour tester avec cela, je serais heureux de tester cela.

Je peux voir de créer des connecteurs pour les choses de connexion comme mes appareils basés sur MyNewt-au serveur de bord, mais cela ne va pas se passer aujourd'hui.

## Conclusions

Comme d'habitude, j'ai trouvé le ARTIK-520 soit une assez facile, et très polyvalent, centre IdO. Ceci est mon deuxième projet de passerelle avec ARTIK-520 et, bien que j'ai couru dans quelques bizarreries chaque fois, il est fondamentalement assez straight-forward à mettre en place. Encore une fois, ** ne pas essayer de construire / compiler sur la ARTIK-520 **, sauf si vous avez absolument * *, et il est une construction relativement faible. Je suis en fait construit Node.js de source sur le ARTIK-520 deux fois et il était lent, mais relativement indolore.

[Droplit.io](http://droplit.io) est une cible de déploiement assez simple pour ARTIK-520. Aussi petit que le module ARTIK réelle est (en dehors de tous les trucs du conseil de développement), il serait une cible assez intéressante pour un « appareil » Droplit.io, bien que je ne suis pas sûr le prix point frappais un objectif raisonnable pour les .

Comme je l'ai dit, je voudrais essayer ma main à construire des connecteurs pour d'autres appareils IdO pour Droplit, et je suis à la recherche d'autres certainement à quelques passerelles à construire / deploy sur ce forum ARTIK-520. Restez à l'écoute!
