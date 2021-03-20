---
title: "Intel Edison mise à jour"
Date: 2016-01-06
Author: davidgs
Category: Gadgetry, IoT
Tags: Edison, IoT
Slug: intel-edison-update
hero: images/SparkFun_Edison_Boards-16.jpg
---

Je dois modifier mon [post précédent](/posts/category/iot/iot-hardwareintel-edison-big-hat-no-cattle/) sur l'Intel Edison. Il se trouve qu'il ne peut pas être le module Edison lui-même, mais plutôt la carte mère Intel Mini-Breakout qui est en faute quand t vient au moins l'échec I2C. Je dois encore voir sur les échecs de SPI. Voici pourquoi je suis arrivé à cette conclusion:

J'ai commandé une partie des [Sparkfun blocs](https://www.sparkfun.com/products/13034) pour Intel Edison © et suis retourné à duper avec eux. (Vraiment, je n'étais pas « duper » avec eux autant que travailler sur un projet pour un client où Intel Edison était un bon ajustement.) J'ai téléchargé un code de Nice) pour Intel Edison © et suis retourné à duper avec eux. (Vraiment, je n'étais pas « duper » avec eux autant que travailler sur un projet pour un client où Intel Edison était un bon ajustement.) J'ai téléchargé un code de Nice [GitHub](https://github.com/jku/LSM9DS0) qui a fait le bus I2C utilisable avec les blocs Sparkfun et Voilá! Je l'ai eu à travailler! J'ai fait quelques modifications assez importantes au code d'origine à partir du référentiel GitHub d'origine, donc je fourchue et ont republié sur mon propre) qui a fait le bus I2C utilisable avec les blocs Sparkfun et Voilá! Je l'ai eu à travailler! J'ai fait quelques modifications assez importantes au code d'origine à partir du référentiel GitHub d'origine, donc je fourchue et ont republié sur mon propre [GitHub](https://github.com/davidgs/LSM9DS0), bien sûr. La plupart du temps ce que j'ai ajouté étaient plus d'options de démarrage et de sortie.

Je suis maintenant capable de lire les données des capteurs I2C (j'utilise le [bloc 9DOF Sparkfun](https://www.sparkfun.com/products/13033)) et je publie désormais les données des capteurs ... eh bien, je peux choisir où je l'envoie! Je peux l'envoyer à la construction dans)) et je publie désormais les données des capteurs ... eh bien, je peux choisir où je l'envoie! Je peux l'envoyer à la construction dans [Mosquito MQTT] serveur (http://mosquitto.org), ou à un embarqué [MongoDB](http://mosquitto.org) base de données NoSQL, ou à un) base de données NoSQL, ou à un [Couchbase externe ](https://www.mongodb.org) base de données NoSQL, ou je peux publier mes propres données JSON brutes de celui-ci. Je peux même permettre de publier à toutes les sources à la fois, mais je ne suis pas sûr que ce soit si utile que ça, vraiment.

Oui, je suis généralement un type Java - d'où les grains de café [](/posts/beans/beans) - mais je revins à C pour celui-ci. Cela fait 30 ans que j'ai écrit tout code sérieux C, mais apparemment il est comme le vélo, car il revient bien!

Restez à l'écoute pour le reste de l'histoire sur ce projet, car il va mieux et mieux!
