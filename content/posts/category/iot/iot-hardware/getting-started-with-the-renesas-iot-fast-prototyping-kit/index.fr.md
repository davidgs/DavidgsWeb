---
title: « Mise en route avec le Prototypage rapide Renesas IdO Kit »
Date: 2017-07-25
Author: davidgs
Category: Evangelism, Gadgetry, IoT
Tags: IoT, Prototyping, Renesas
Slug: getting-started-with-the-renesas-iot-fast-prototyping-kit
hero: images/Safari041.jpg
---

Je voulais pour arriver à ce pendant deux ou trois semaines, et ont été assailli par un tas d'autres choses qui ont gardé d'apparaître, mais je travaille loin avec ces derniers, et je pensais que je poste au moins une première poster sur ces kits. [Renesas](https://www.renesas.com/en-us/) a eu la gentillesse de me donner à la fois le ([S3 IdO rapide Prototypage Kit] https://www.renesas.com/en-us/products /software-tools/boards-and-kits/renesas-synergy-kits/renesas-synergy-s3a7-prototyping-kit.html) et le) a eu la gentillesse de me donner à la fois le ([S3 IdO rapide Prototypage Kit] https://www.renesas.com/en-us/products /software-tools/boards-and-kits/renesas-synergy-kits/renesas-synergy-s3a7-prototyping-kit.html) et le [S7 Kit de démarrage](https://www.renesas.com/en-us/products/software-tools/boards-and-kits/renesas-synergy-kits/renesas-synergy-s3a7-prototyping-kit.html), vraiment ** qui sont tous deux vraiment ** belles planches pour faire le prototypage IdO. Je vais commencer par le peak S3 IdO (Fast Kit Prototyping). Tout d'abord, bien sûr, est le unboxing!

![IMG 3095](/posts/category/iot/iot-hardware/images/IMG_3095.png)

Et ce qui est dans la boîte:

![IMG 3098](/posts/category/iot/iot-hardware/images/IMG_3098.png)

Et ce qui est dans les sacs:

![IMG 3099](/posts/category/iot/iot-hardware/images/IMG_3099.png)

![IMG 3100](/posts/category/iot/iot-hardware/images/IMG_3100.png)

![IMG 3101](/posts/category/iot/iot-hardware/images/IMG_3101.png)

Ensuite, un rapide aperçu de ce qui est sur la carte / dans la boîte:

- Conseil Renesas S3A7 MCU
- New Haven 2.4" affichage à écran tactile
- AMS Module capteur environnemental
- Température
- Humidité
- Qualité de l'air
- proximité
- Eclairage
- Bosch Module détecteur de mouvement
- Accéléromètre
- eCompass
- magnétomètre

De plus un tas d'autres choses à bord comme SPI, rapide pour les images graphiques, etc. et une application iOS pour les démos propre. J'apprécie vraiment ce petit Segger du conseil d'administration J-Link ainsi. Non pas que je n'ai pas une petite collection croissante de programmeurs JTAG, mais il est toujours agréable d'avoir une autre option!

## Exécution de la démo

La carte est livrée avec une démo installée, alors j'ai décidé de l'exécuter. Il est appelé (http://renesas-blog.mediumone.com/renesas-s3a7-fast-iot-prototyping-kit-with-smart-chef-demo-quick-start-guide/) [Chef de démonstration] et depuis tutoriel est assez complet et facile à suivre, je ne le recréer ici. Il suffit de passer par les instructions d'installation simples sur la démonstration et l'écran tactile:

![IMG 3103](/posts/category/iot/iot-hardware/images/IMG_3103.png)

et vous serez bien. Une fois que vous avez configuré la carte, vous pouvez vous connecter au tableau de bord sur le site Renesas (en fait, il est alimenté par mes vieux amis à [Bug Labs](https://buglabs.net)! Salut les gars !!) Une fois que l'installation et l'exécution , j'ai eu un beau tableau de bord en cours d'exécution avec la sortie des données du capteur:

![Safari040](/posts/category/iot/iot-hardware/images/Safari040.jpg)

C'est vraiment sympathique! La prochaine étape sur ce front est de rediriger la sortie des lectures du capteur à mon [Tableau de bord InfluxDB](/posts/category/iot/iot-hardware/running-influxdb-on-an-artik-520/).

Il y a aussi un bon éditeur de flux de travail dans le cadre du tableau de bord qui ressemble beaucoup comme [NODE-RED](https://nodered.org) pour moi.

![Safari041](/posts/category/iot/iot-hardware/images/Safari041.jpg)

Je suis impatient de creuser dans ce un peu plus profond et re0directing la sortie.

## Développement du Conseil

Un mot d'avertissement pour ceux d'entre vous (comme moi) qui sont Mac têtes: Vous ** ** doit avoir une machine virtuelle Windows sous lequel pour exécuter ce genre de choses. Renesas Studio (qui est une variante d'Eclipse) ** uniquement ** fonctionne sous Windows. Cela fait compliquer les choses pour moi un peu depuis mon Windows VM est un peu un gâchis en ce moment, mais il est encore la peine.

L'une des plus belles choses que j'ai remarqué tout de suite était la possibilité de personnalisations carte de niveau vraiment sympa droit dans l'outil. Il y a un outil de configuration de package qui vous donne une vue sur toutes les broches sortant du paquet MCU, et vous pouvez tourner broches / arrêt, etc. en fonction de vos besoins. Si vous prototypage pour une application spécifique, et un plan pour construire votre propre circuit imprimé en bas de la ligne, c'est une fonctionnalité très pratique. Je veux dire ** vraiment ** à portée de main! Je suis au milieu d'une conception de PCB en ce moment avec un autre module MCU qui ne dispose pas d'un tel outil, et nous allons par beaucoup à essayer de comprendre ce qui doit être apporté à l'endroit où, ce qui doit être attaché faible, attaché haut, etc. afin de ne pas provoquer une faute. Ravi de pouvoir tourner juste une épingle au large et oublier!

![E2studio002](/posts/category/iot/iot-hardware/images/e2studio002.jpg)

L'IDE a aussi quelques autres fonctionnalités intéressantes vous permettant de voir quels sont inclus, etc., ainsi que des fonctionnalités de configuration agréables.

![E2studio001](/posts/category/iot/iot-hardware/images/e2studio001.jpg)

Comme vous avez pu le constater en ce qu'elle est en cours d'exécution du [ThreadX](http://rtos.com/products/threadx/) RTOS si vous obtenez l'exécution multithread avec peu de difficulté ou au-dessus - bien, autre que la substance standard lorsque vous écrivez des applications multi-thread.

L'une des autres choses que je remarquai, et seulement parce que je le faisais depuis si longtemps avec le [Projet Apache MyNewt](https://mynewt.apache.org/), a été l'inclusion des programmes de soutien du conseil - bsp. h, bsp.c, etc. - qu'il ressemble on pourrait utiliser pour avoir un bon départ à faire une de ces cartes utilisent MyNewt OS. Si vous êtes dans ce genre de chose.

Ajout de la carte à mon WiFi et sa configuration, il a été également simple en ayant à bord de l'écran tactile.

Il peut être un peu difficile à lire, mais il est une interface simple pour configurer le WiFi à bord pour se connecter à mon SSID. par l'intermédiaire d'un serveur Web à bord:

![Safari038](/posts/category/iot/iot-hardware/images/Safari038.jpg)

Et loin, je vais!

## Conclusion

Il y a beaucoup plus d'aller ici, et je vais arriver à l'écriture proprement dite et le déploiement de code sur cette carte sous peu. Étant donné qu'il est livré avec tous ces capteurs de frais, et depuis que je suis ce [gentil gestionnaire de base de données de séries chronologiques](/posts/category/iot/iot-hardware/running-influxdb-on-an-artik-520/), I « ll faire quelque chose pour recueillir un tas de données sur l'environnement et le diffuser vers mon serveur. Encore une fois, la première étape sera de rediriger la sortie démo à ma propre base de données de séries chronologiques, puis d'écrire une application qui fait directement.
