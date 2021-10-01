---
title: « Mon Vacances d'hiver (ce que je faisais avec IdO et ARTIK-5) »
Date: 2017-01-02
Author: davidgs
Category: Uncategorized
Slug: winter-vacation-iot-artik-5
hero: images/eTapeProject-1-1-225x300.png
reading_time: 6 minutes
---

Je ne sais pas pour vous, ou ce que vous avez fait avec vos vacances d'hiver (ou si vous avez même un, et si vous ne l'avez pas, je suis désolé) mais l'une des choses amusantes que j'ai fait avec le mien était de passer peu de temps avec mon [Samsung ARTIK](http://artik.io) Dev Kit. Si vous lisez le) Dev Kit. Si vous lisez le [matériel Extravaganza Post](/posts/category/iot/iot-hardware/hardware-extravaganza/), vous saurez que je suis un ARTIK-0 et un kit de développement ARTIK-5 il n'y a pas longtemps. J'ai été jusqu'à mes oreilles), vous saurez que je suis un ARTIK-0 et un kit de développement ARTIK-5 il n'y a pas longtemps. J'ai été jusqu'à mes oreilles [MyNewt](http://mynewt.apache.org/) bien et n'ont pas eu le temps de faire beaucoup avec eux, malheureusement. Jusqu'à ce que ma pause d'hiver est venu.

Je ne voulais pas passer tout le temps de jouer dans mon bureau et ma famille importuner, alors j'ai décidé d'essayer juste un projet rapide en utilisant un peu de matériel de capteur existant je traîner. (Note: J'ai une grande quantité de matériel de capteur « juste traîner ») j'ai décidé d'essayer d'utiliser le ([éTAPE liquide Capteur de niveau] https://www.adafruit.com/products/464?gclid=CjwKEAiAkajDBRCRq8Czmdj-yFgSJADikZggOOig7wQivaUivT14Q8aNI3ndBmn2oyGF3EJgiZJ- MxoCWvDw_wcB) que je l'ai déjà joué avec le projet MyNewt. Il est un capteur analogique assez simple pour lire l'eau / niveau de liquide dans un récipient. Ou, dans mon cas, sur ma terrasse arrière qui inonde régulièrement! J'ai aussi décidé de retirer le ARTIK-5 d'abord, car il est extrêmement facile d'y aller.

Nous allons utiliser le capteur comme un capteur résistif *, * et la configuration est très simple. Je vais utiliser une planche à pain pour mettre tout cela ensemble pour des fins d'illustration. Tout d'abord, attacher un fil de cavalier de 5v sur la carte à l'breadboard.Next, fixez un fil de cavalier de ADC0 sur la carte à la carte de test. Ce sera notre ADC-in. Le capteur doit être venu d'une résistance 560 ohms, de sorte que la fiche dans la carte entre Vdd et les trous ADC-in. Enfin, fixez un cavalier de GND sur la carte à votre carte de test. À ce stade, votre ARTIK 5 devrait ressembler à ceci:

[! [ARTIK-5 capteur ADC Câblage](/posts/category/iot/images/eTapeProject-1-1-225x300.png)] (/ messages / catégorie / IOT / images / eTapeProject-1-1.png))](/posts/category/iot/images/eTapeProject-1-1.png)

 

Et votre breadboard devrait ressembler à ceci:

[! [Câblage Breadboard](/posts/category/iot/images/eTapeProject-4-225x300.png)] (/ messages / catégorie / IOT / images / eTapeProject-4.png))](/posts/category/iot/images/eTapeProject-4.png)


Maintenant joindre l'un des 2 fils moyen du capteur au sol sur le breadboad et l'autre chef de file du milieu à l'ADC-in sur la carte de test. Cela devrait compléter le branchement du capteur et votre carte de test terminé devrait ressembler à ce qui précède.

Je l'ai acheté 1000 ML cylindre gradué dans lequel placer le capteur de éTAPE pour tester ce projet, et voici ce que le raccordement final du capteur lui-même ressemble à:

![Etape capteur dans le cylindre](/posts/category/iot/images/eTapeProject-5.png)

Maintenant, tout ce que je dois faire est de remplir avec de l'eau et ... oh, attendez, je sans doute d'écrire un code, hein? En fait, il se trouve que je dois faire étonnamment peu de ça! J'ai décidé de donner le [nœud rouge](https://nodered.org) un spin depuis que j'ai écrit beaucoup de code Node.js cette année de toute façon. Je suis mon ARTIK-5 et en cours d'exécution en utilisant le site) un spin depuis que j'ai écrit beaucoup de code Node.js cette année de toute façon. Je suis mon ARTIK-5 et en cours d'exécution en utilisant le site [Resin.io](https://resin.io) qui était très rapide et facile à utiliser. Une fois cela fait, et j'avais ARTIK pleinement opérationnel 5 (Note: ne pas utiliser le profil ** mince **, assurez-vous d'utiliser le ** dernier profil ** dans votre configuration Docker Vous en aurez besoin pour. installation Node-Rouge), j'ai simplement installé à l'aide Node-Rouge

```
% sudo npm install -g node-red
```
Une fois que terminé, j'ai installé la bibliothèque ARTIK pour le nœud-Rouge

```
% /root/.node-red
% npm install node-red-contrib-artik
```

Alors, juste pour rendre les choses encore plus facile, j'ai installé le module FRED:

```
% npm install node-red-contrib-fred
```

Vous verrez pourquoi FRED était une bonne idée dans une minute. Une fois que tout a été fait sur le ARTIK 5 I noeud rouge tout simplement commencé:

```
% node-red
```

Et puis connecté mon navigateur au serveur Node-Rouge ARTIK-5 et construit une application. Je traînais dans un ARTIK ADC et configurée:

[! [Node-ROUGE ARTIK Capteurs](/posts/category/iot/images/Safari005.jpg)

[! [ARTIK-5 Noeud-Rouge ADC](/posts/category/iot/images/Safari006-300x137.jpg)] (/ messages / catégorie / IOT / images / Safari006.jpg))](/posts/category/iot/images/Safari006.jpg)

une fonction

[! [définition de la fonction de nœud rouge](/posts/category/iot/images/Safari007-300x137.jpg)] (/ messages / catégorie / IOT / images / Safari007.jpg))](/posts/category/iot/images/Safari007.jpg)

et un module de JSON, puis le tout accroché à une FRED-entrée et une sortie FRED-:

[! [ARTIK-5 application Node-Rouge](/posts/category/iot/images/Safari004-300x129.jpg)] (/ messages / catégorie / IOT / images / Safari004.jpg))](/posts/category/iot/images/Safari004.jpg)

Oh, et puis cliqué sur le bouton « Déploiement ». Je vous avais dit qu'il était simple.

Je suis ensuite allé à mon compte de service à FRED [Sensitec](https://fred.sensetecnic.com) et connecté J'ai créé un point final privé ADC.:

[! [Créer fin point FRED](/posts/category/iot/images/Safari009-300x180.jpg)] (/ messages / catégorie / IOT / images / Safari009.jpg))](/posts/category/iot/images/Safari009.jpg)

Et puis ajouté un envoi ** ** événement ADC, déclenchée par un horodatage:

[! [Envoyer un événement à ARTIK-5](/posts/category/iot/images/Safari008-300x127.jpg)] (/ messages / catégorie / IOT / images / Safari008.jpg))](/posts/category/iot/images/Safari008.jpg)

Et d'une réception événement qui a les données renvoyées et l'insère dans un tableau:

[! [ARTIK événement dans FRED](/posts/category/iot/images/Preview001-300x96.jpg)] (/ messages / catégorie / IOT / images / Preview001.jpg))](/posts/category/iot/images/Preview001.jpg)

Une fois que j'ai commencé tout cela, j'avais un astucieux graphique montrant le niveau d'eau dans mon cylindre gradué:

[! [Graphique de niveau d'eau](/posts/category/iot/images/Safari001-300x238.jpg)] (/ messages / catégorie / IOT / images / Safari001.jpg))](/posts/category/iot/images/Safari001.jpg)

Et je l'ai écrit essentiellement du code zéro.

Ensuite, je vais essayer d'installer un back-end MongoDB sur le ARTIK-5 et l'envoi des données à cela, et au service que les données sur un front-end javascript pour tracer tout. Cela exigera écrire du code, donc chercher que dans un avenir proche!

Aussi je vais travailler avec le capteur réel connecté au ARTIK-0 et l'envoi des données de celui du ARTIK-5 exemple MongoDB pour la collecte et l'analyse. Je suis vraiment impatient de creuser dans la ARTIK-0 un peu puisque c'est plus pratique avec le code C - quelque chose que j'ai été cou dans ces derniers temps avec MyNewt de toute façon.
