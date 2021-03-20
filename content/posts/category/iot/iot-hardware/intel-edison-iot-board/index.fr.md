---
title: « Intel Edison Conseil IdO »
Date: 2014-12-04
Author: davidgs
Category: IoT
Tags: development, gadgets, hardware, IoT
Slug: intel-edison-iot-board
hero: images/Edison-module.jpg
---

J'ai lu sur le conseil de développement Intel Edison pendant un certain temps. Je fais plus de choses IdO à nouveau - purement pour le plaisir, puisque personne ne me payer pour le faire - et je l'ai récemment acquis le kit électrique de développement de ce kit et diablotin Intel Edison, ainsi qu'un kit Arduino. Le conseil d'administration d'Intel Edison est de loin le plus puissant du groupe. Il est un dispositif SoC IdO qui semblait être extrêmement capable.

Certaines données « vitesses et avances »:

- Dual-core, dual-thread 500MHz Intel Atom combiné avec un 100MHz32 bits microcontrôleur Intel Quark
- 1 Go de RAM
- 4 Go de stockage flash
- 2,4 GHz et 5,0 GHz WiFi avec antenne embarquée
- Bluetooth 4.0

C'est assez impressionnant. Il est un peu gourmand en énergie, avec une tension de veille de 13MW (21,5 mW avec Bluetooth, WiFi 35mW), mais il est toujours dans la raison. Les capacités d'E / S sont également assez forte:

- 20 I / O numérique comprenant 4 PWM
- 6 entrées analogiques
- 1 UART (Rx / Tx)
- 1 I ^ 2 ^ C
- 1 à 6 broches en-tête de SPI
- Connecteur de carte SD

Cela vous donne beaucoup d'options ** ** pour capteurs et actionneurs! Je l'ai joué avec elle un peu, mais pas beaucoup jusqu'à présent. Voici le déballage nécessaire porno:

![IMG 1564](/posts/category/iot/iot-hardware/images/IMG_1564.jpg)

![IMG 1566](/posts/category/iot/iot-hardware/images/IMG_1566.jpg)

![IMG 1567](/posts/category/iot/iot-hardware/images/IMG_1567.jpg)

Certaines choses étranges sur cet appareil: Il faut que les deux ** ports micro-USB ** être branché afin de le mettre en place et d'y accéder à partir de votre ordinateur portable. C'est tout simplement bizarre. Et une douleur pour moi, puisque je n'ai que des câbles micro-USB relativement courtes, et un port USB de chaque côté de mon ordinateur portable.

Je suis un peu pointilleux pour la facilité d'utilisation et une faible barrière à l'entrée, et à cet égard, Edison a besoin d'une * beaucoup * de travail. Ils ont seulement un « commencer » tutoriel pour la carte d'extension Arduino (je l'ai acheté le * autre * carte d'extension, bien sûr). Accès, clignotant, etc. le conseil d'administration est non-intuitive et la documentation est compliquée et difficile. Je me suis retrouvé dans les forums d'utilisateurs où les utilisateurs réguliers ont posté ** beaucoup ** recettes et des instructions plus simple. Oui, je suis partial, comme je l'ai écrit le fameux Sun SPOT Application Manager pour la gestion du SDK et du firmware sur les appareils Sun SPOT, et je ne peux pas attendre vraiment tout le monde d'avoir une telle intuitive et facile à utiliser point d'entrée pour les développeurs, mais ... attendez, pourquoi ** ** ne peux pas attendre à ce que je? Pourquoi les développeurs attendent pas? Je peux juste passer une journée ce week-end et une écriture.

L'une des choses vraiment sympa est que je peux programmer cet appareil en utilisant Node.js en Javascript. Il y a des rumeurs qu'il exécute Java aussi bien, mais je n'ai pas eu le temps d'obtenir ce encore installé. Je vais vous laisser savoir que dès que je figure que celui-ci!

 
