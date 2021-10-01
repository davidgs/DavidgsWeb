---
title: « Vous avez pas vu Big Data Yet »
Date: 2017-06-23
Author: davidgs
Category: Evangelism, IoT, Misc
Tags: Big Data, IoT
Slug: you-havent-seen-big-data-yet
hero: images/JuvenileGraySquirrel_ChristineHaines.jpg
reading_time: 4 minutes
---

Ouais, je sais, « Big Data » comme un mot à la mode est si il y a 5 minutes. Le monde de la technologie est AJOUT chronique et sujettes à être distrait par le prochain objet brillant (ooh! Regardez, IdO !, Attendez, AI! ECUREUIL !!) Mais restez avec moi à ce sujet. Il est connecté tout. J'ai dit depuis au moins 2005 (retour lorsque Big Data était à la mode) que vous ne l'avez pas vu des données vraiment grands jusqu'à ce que l'IdO se passe vraiment en pleine force. Les médias sociaux est assez prolifique - une moyenne de 6000 tweets par seconde, ou un demi-milliard de tweets par jour. C'est beaucoup de données. Mais il est des arachides. Disons que vous avez un déploiement industriel IdO surveillance 1000 machines. Chaque machine fournit télémétrie sur 7 ou 8 paramètres. Il de l'exploitation forestière que la télémétrie 2 - 3 fois par seconde. C'est 16 000 par seconde. De ** une usine **. Maintenant, supposons que vous avez 10 usines dans le monde entier. 160 000 par seconde. Essaye de continuer. Non, vraiment, juste essayer.

Voici ma règle IdO, encore une fois: Tout ce qui est basé sur le nombre de personnes sur la planète est supérieure bornes limitées. Quand j'ai dit ce en 2004 Sun (un moment de silence, s'il vous plaît) avait accordé une licence Java sur 1 milliard de téléphones cellulaires. Même si chaque être humain porté 4 téléphones cellulaires, qui aurait seulement été de 24 milliards d'appareils (population à l'époque était l'un, y 6 milliards). Un marché limité.

IdO ne repose pas sur le nombre de personnes sur la planète, mais le nombre de choses * * et est donc pas nécessairement surdélimitées supérieure. Pensez à ce que - pas de limite supérieure - car il applique aux dispositifs et par conséquent les données de flux. Maintenant, la promesse de systèmes IdO est de fournir en temps réel, des données exploitables. Et vraiment, pourquoi iriez-vous au temps et aux frais de déploiement d'un système IdO si vous n'allez pas faire quelque chose avec le torrent de données qu'il fournira. Mieux encore que de simplement fournir des données à une action FOURNIT ** temps réel ** de renseignements exploitables.

Le problème est, clairement, comment faites-vous en fait une sorte d'analyse de données raisonnable 160.000 par seconde datapoints? C'est de 9,6 millions par minute. C'est un demi-milliard par heure. Donc, c'est l'ensemble de flux Twitter par jour toutes les heures. Chaque. Heure.

En ce moment, ce n'est pas quelque chose que la plupart des gens dans le monde IdO abordent, ou même parler. Pourquoi? Parce que, de toute évidence, ils ne sont pas une solution pour elle. Voir! ÉCUREUIL! Nous ne parlerons pas seulement de cela.

Mais je suis tombé sur quelque chose. Quelque chose de vraiment assez incroyable. Quelque chose qui résout effectivement ce problème de la manière la plus élégante. Et si vous pouviez facilement requête et visualiser un ensemble de données de milliards de lignes de données? En temps réel. Il est appelé [MAPD](http://mapd.com). Il est une base de données qui fonctionne sur les GPU, pas CPUs (bien que vous pouvez l'exécuter sur les processeurs si vous voulez un ralentissement des performances). Processeurs graphiques font vraiment bien ** vraiment ** à paralléliser le traitement des données et des graphiques de cours.

Alors regardons juste à l'un de leurs [démos](https://www.mapd.com/demos/). Ce sont les mouvements des navires aux États-Unis entre 2009 et 2015. Tous. Every.Single.One. Plus de 11 milliards d'enregistrements de données géospatiales.

![Graphique de tous les mouvements de navires](/posts/category/iot/images/Safari029.jpg)

C'est un coup de toujours, mais si vous allez jouer avec la démo, vous verrez que vous pouvez explorer à travers les données. ** Way ** vers le bas dans les données. Mon meilleur ami est un capitaine de remorqueur. Il travaille sur le nouveau pont Tapanzee pour les 5 dernières années. Je décidai donc de voir ce que je pouvais voir ce qui se passait là-bas.

![identification du navire individuel](/posts/category/iot/images/Safari028.jpg)

J'ai trouvé son bateau remorqueur. J'ai aussi trouvé son remorqueur, et les bateaux de la force publique, la nuit, quelqu'un a sauté du pont et ils ont tous couru pour les trouver. Et c'est transparente, fluide, expérience immersive.

Absolument incroyable! Maintenant, s'ils peuvent le faire avec 11 milliards d'enregistrements géospatiales de navires, bien, alors ce n'est pas trop loin d'un jours de données dans mes exemples ci-dessus. Cela vous permet de visualiser réellement vos données entrantes en temps réel, et en faire une action. Cela rend l'IdO réellement pratique et utile. Pour terminer!
