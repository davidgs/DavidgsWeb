---
title: "Programmation de la IdO Devices ARTIK-0"
Date: 2018-07-01
Author: davidgs
Category: Gadgetry, IoT
Tags: ARTIK, ARTIK-053, IoT, Samsung
Slug: programming-the-artik-0-iot-devices
hero: images/bazaar493520_2.jpg
---

Si vous avez lu ce blog beaucoup à tout ce que vous aurez remarqué que je suis un fan assez grande de la ligne ARTIK des conseils IdO (voir [ici](/posts/category/iot/winter-vacation-iot-artik-5/),), [ici](/posts/category/iot/iot-hardware/making-artik-5-iot-gateway-kura/),), [ici](/posts/category/iot/make-your-artik-520-scream/),), [ici](/posts/category/general/how-to-save-your-artik-520-backup/),), [ici](/posts/category/iot/iot-software/artik-520-droplit-io-edge-device/),), [ici](/posts/category/iot/iot-hardware/openhab-server-artik-520/),), [ici](/posts/category/iot/iot-hardware/running-influxdb-on-an-artik-520/) et) et [ici](/posts/category/iot/iot-hardware/influxdb-on-artik-520-redux/)) mais je dois vraiment préciseraient que peu maintenant. J'aime mon conseil ARTIK-520. Il fonctionne bien la pile entière InfluxData et est un endroit solide, fiable pour déployer le logiciel IdO-Edge. J'aime vraiment ça.

Cela étant dit, je suis encore vraiment ** ** mécontent de la ligne ARTIK-0x de « produits ». Il a commencé quand j'ai acheté la carte développeur ARTIK-020. Beaucoup de réclamations au sujet d'être en mesure de programmer à partir de Mac OS, etc. La réalité est que - 13 pages dans le guide du développeur - vient à la conclusion que: a) vous avez besoin d'une machine Windows et b) après 30 jours nécessaires à l'achat une licence 3 000 $ à IAR Workbench. Tant pour être convivial Maker. Je mets ce conseil dans un tiroir et abandonné sur elle. Cher leçon.

Je me suis plaint à mes amis à Samsung - Oui, j'ai des amis à Samsung - et un peu plus tard on m'a donné un module ARTIK-053 libre. Celui-ci n'a pas besoin de l'IAR Workbench à programmer (yay pour gcc !!) et je pensais que les choses étaient mieux. Je voudrais avoir eu raison. Je jouais avec elle un peu après l'avoir obtenu, mais manqué de temps ainsi, comme avec l'autre conseil d'administration Samsung, il est allé dans la boîte.

J'ai décidé de revenir sur cette semaine. J'avais construit un capteur de CO2 à l'aide d'un semi nRF52DK nordique et un K30 Senseair mais le nRF52DK était vraiment sorte de grand et je cherchais un petit facteur de forme (que j'avais « en stock ») et n'a pas besoin d'Arduino. Je ne vais pas commencer dans le Arduino ici, mais je ne pouvais.

Ainsi, il en est sorti le ARTIK-053 Dev Board, et ... oh merde, on y va à nouveau. Tout d'abord, j'ai commencé avec l'ARTIK-IDE pour le développement. Il est basé sur Eclipse (bien sûr), mais sérieusement, il était incroyablement lent, lourd et n'a fait aucun code achèvement ou des conseils. Il a fallu environ 4 minutes pour déployer un fichier binaire à la carte. J'itérer beaucoup ** ** donc 4 minutes par charge me ralentissait sérieusement vers le bas. -1 pour ARTIK-IDE.

J'ai découvert par hasard que le code Microsoft VS prend en charge l'environnement de développement ARTIK et avait une tonne ** plus rapide **. 10 secondes compile (par rapport à 1 minute compile sur Eclipse / ARTIK-IDE) et 30 secondes (contre déploie les 4 minutes sur ARTIK-IDE). La vie est devenue beaucoup mieux après cela. (Je revenir et faire un autre post sur le code VS juste parce que je chante pour être super polyvalent et un très bon outil -. Ce qui veut dire quelque chose pour quelqu'un avec des anticorps anti-microsoft virulents comme je l'ai)

Donc, je me suis déplacé tout mon développement au code VS et a commencé ce que je pensais être un port assez simple de mon code capteur Mbed OS I2C CO2 TizenOS de ARTIK. Là je vais penser à nouveau. I2C est assez simple. Vous devez connaître l'adresse de l'appareil, les registres que vous voulez écrire, les registres que vous souhaitez lire, et que couvre à peu près tout. Des choses vraiment simples.

```cpp
// var 7-bit address of the K30 CO2 Sensor
const int addr = 0xD0;
char cmd[4] = {0x22, 0x00, 0x08, 0x2A};
int ack = i2c.write(addr, cmd, 4);

i2c.read(addr, readBuff, 4, false);
```

C'est une adresse 7 bits. Ecrire une commande de 4 octets à l'adresse, puis lire un retour tampon de 4 octets et j'ai ma lecture. C'est le code OS Mbed ci-dessus, par le chemin. Il fonctionne parfaitement, si le portage vers Tizen devrait être facile comme bonjour.

**Mal**

Il se trouve qu'il est inférieur à zéro documentation pour la ligne ARTIK-0x d'appareils. Il y a quelques exemples de programmes, mais si vous voulez aller au-delà de compiler et d'exécuter ces échantillons, vous êtes sur votre propre. Samsung semble penser que le code source pour i2c.h devrait être suffisant pour que tout arrive. Ils ne pouvaient pas être plus faux. Si vous publiez sur les forums d'utilisateurs, on se dit à « lire le code source. » C'est à peine une réponse si vous voulez développeurs d'utiliser votre plate-forme.

Je suis assez habile à lire le code source. ** SI ** il est écrit de façon claire et bien documentée. Et c'est le problème avec le code source ARTIK. Les auteurs semblaient penser que simplement écrire le code serait suffisant. ** Surtout ** quand il est venu aux programmes « par exemple ». À titre d'exemple, le code exemple websocket consiste en un seul fichier source qui est 1158 lignes. Voici tous les commentaires de la source pour vous aider ainsi comprendre:

```cpp
/// @file app/netutils/websocket/websocket.c
/// @brief websocket file to support client and server.

// if websocket server is initiated from http(s), you just can call this function.
// websocket_server_open function includes:
// 1. allocating socket fd
// 2. accepting client
// 3. authenticating with client
// those 3 are not needed when websocket is initiated from http(s).
```

C'est vrai, que de tous les ** ** les commentaires de 1158 lignes de code websocket compliqué. La plupart du code de démonstration est tout aussi « documenté ». C'est soit par pure paresse de la part des développeurs du code de démonstration, ou bien Samsung ne se soucie pas chaque fois que leurs utilisateurs finaux réussissent à développer des applications sur leur plate-forme. Je vais leur donner le bénéfice du doute et aller avec paresse. En tant que développeur moi-même, j'essaie de le faire en tant que documentation de code beaucoup plus en ligne que je peux raisonnablement le faire comme il est juste une courtoisie pour le développeur qui vient derrière vous. Je ne fais pas toujours avec le code que j'écris purement pour moi, mais si je publie, ou le rendre disponible, j'essaie vraiment de le rendre facile à suivre. Samsung ne semble se soucie pas de cela.

conclusions
-----------

Je suis 9 jours et je l'ai maintenant *** *** enfin obtenu le dispositif I2C être lisible sur une base assez cohérente et fiable. Il n'a pas été facile, ou même à distance agréable, mais il fonctionne assez bien pour moi. Le bit suivant est d'être en mesure d'afficher les résultats du capteur via http - idéalement https - à mon serveur InfluxDB. Voilà pourquoi je suis passé par 1158 lignes de code websocket dimanche après-midi. Votre dimanche a été sans doute mieux, je suppose.

Je suis assez sûr que l'obtention du https POST pour passer par va prendre environ 8 jours aussi bien, ce qui devrait faire de Samsung se poser la question: Quand quelqu'un peut mettre en œuvre ce dans un jour ou 2 en utilisant Mbed, FreeRTOS ou Arduino et il faut 2 semaines ARTIK, pourquoi ** ** choisir quelqu'un ARTIK? » Il est une question valable que je ne pense pas qu'ils ont une réponse adéquate.


