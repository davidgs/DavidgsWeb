---
title: « Rev'ing du matériel de démonstration »
Date: 2019-06-05
Author: davidgs
Category: Evangelism, Gadgetry, IoT
Tags: IoT
Slug: reving-the-demo-hardware
hero: images/IMG_5478.jpeg
---

Si vous me avez pour ne importe quelle longueur de temps, vous saurez que je construis beaucoup ** ** de petits projets matériels. Quelle meilleure façon de mettre en évidence les capacités IdO de InfluxDB que de construire du matériel qui écrit des données à constamment! Mais certains de mes démos matérielles ont été vieillissait, et certains d'entre eux ont été s'abusé, alors j'ai décidé qu'il était temps de les réorganiser avec un nouveau matériel, je vais même les faire entièrement sans fil en ajoutant des batteries LiPo afin qu'ils peut aller mobile lors des présentations et des démonstrations!

Beaucoup de mes démos se sont appuyés sur le fidèle (et pas cher de terre) Wemos D1, construit autour de l'ESP-8266. Quand je dis pas cher de la saleté, je veux dire sous 3,00 $ US chacun, donc je les achète généralement à la douzaine. Mais il y a des problèmes avec eux. Tout d'abord, ils ne sont pas fiables à 100%, et ils ne parviennent pas avec une régularité relative. Voilà pourquoi j'achète en vrac! Aussi, ils sont, par nature, peu sûr. Donc, je me déplace aux systèmes basés sur ESP32. Ils sont un peu plus puissant, et tout aussi facile de construire au large de. J'ai commandé quelques-unes des ESP-32 plumes de Adafruit principalement parce qu'ils viennent avec un circuit de charge intégré pour les batteries LiPo. Heureusement, le code qui fonctionne sur le ESP8266 fonctionne sans changement sur le ESP32, donc au moins je ne pas à quoi que ce soit du port.

Si vous me suivez sur Twitter (et sinon, pourquoi pas ?!) alors vous avez peut-être vu mon récent affichage à 7 segments qui lit les données d'un courtier MQTT (alimenté par InfluxDB. Plus à ce sujet dans un autre poste!) Et l'affiche . ! [IMG](/posts/category/iot/iot-hardware/images/IMG_5243.jpeg)

Pretty cool, mais il manquait quelques choses. Une chose est la capacité de dire * ce * est affiché! Je veux dire, les données sont super et tout, mais sans contexte c'est un nombre seulement. Mais comment faire face à cela? Entrez l'affichage 14 segments qui peut afficher à peu près tous les caractères alpha-numérique, et a le même aspect et la convivialité que les afficheurs 7 segments.

![IMG 5478](/posts/category/iot/iot-hardware/images/IMG_5478.jpeg)

Mais si vous avez vu mon tableau de bord, vous remarquerez qu'il ya beaucoup d'autres données là-bas, et il serait agréable d'être en mesure de changer ce qui est affiché.

![Screen Shot 2019 06 04 à 3 14 53 PM](/posts/category/iot/iot-hardware/images/Screen-Shot-2019-06-04-at-3.14.53-PM.png)

Je l'avais déjà fait le dispositif capable de modifier les données basées sur un autre message MQTT, mais je voulais quelque chose qui était plus facile à traiter. Entrez le bouton tactile. Je l'ai acheté tout un tas d'entre eux dans un tas de couleurs et ...

![IMG 5477](/posts/category/iot/iot-hardware/images/IMG_5477.jpeg)

Maintenant, nous avons des boutons de changement qui les données que nous recevons!

Bien sûr, cela signifie que je vais devoir re-conception et réimprimez la boîte, mais c'est seulement<checks notes> 9,5 heures travail d'impression. Le résultat final sera un affichage de données portable, sans fil, avec une légende correspondante de ce qui est affiché, avec une batterie 2500mAh LiPo afin qu'il puisse être passé autour. Maintenant, pour empêcher les gens de le laisser tomber et maltraiter. cas imprimés 3D ne sont pas aussi solides que les gens semblent penser qu'ils sont!

Je vais poster des photos du dispositif final sur mon flux Twitter, vous feriez mieux d'aller [me suivre](https://twitter.com/intent/follow?screen_name=davidgsIoT)!
