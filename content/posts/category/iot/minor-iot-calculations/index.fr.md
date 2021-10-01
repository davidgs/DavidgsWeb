---
title: « Certains calculs mineurs IdO »
Date: 2015-01-30
Author: davidgs
Category: IoT
Tags: Batteries, IoT, power
Slug: minor-iot-calculations
hero: images/Critical-Battery-Icon-old-laptop.jpg
reading_time: 5 minutes
---

## Les piles seront un facteur limitant dans les déploiements IdO

Il y a beaucoup de battage médiatique sur l'Internet des objets (IdO) comme je l'ai [dit](/posts/category/general/here-comes-iot-ready-or-not/)) [à plusieurs reprises](/posts/category/iot/is-iot-happening-or-not-in-2015/) - et comme quelqu'un qui a quelque chose à lire sur la technologie ces jours-ci connaît déjà. Il y a technologie portable, il y a IdO soins de santé, il y a IdO et M2M une foule d'autres domaines de l'IdO qui sont tous projetés à exploser au cours des 10 prochaines années. Des milliards et des milliards d'appareils sont les prévisions. Peut-être billions de dollars. Ce sont un très grand nombre et ils sont très intéressants pour tous ceux qui travaillent dans le domaine, ou même l'observer. Mais il y a un problème. Puissance.

Un gros problème. Puissance. Comment allons-nous pouvoir ces milliards d'appareils? Certains d'entre eux, bien sûr, sera alimenté en les branchant simplement à une alimentation électrique constante. Ignorons ceux-ci. Un certain nombre d'entre eux de juste - peut-être la plupart d'entre eux - sera de petits appareils embarqués -, beaucoup de wearables dispositifs médicaux, des capteurs environnementaux, des capteurs à distance, etc. - qui devront être alimentés par des batteries. Et il y a votre problème. Batteries. Beaucoup de batteries. Bateau charge des batteries.

J'ai passé beaucoup de temps, retour dans la journée, des recherches sur les batteries pour que la plate-forme Sun SPOT pour atteindre un équilibre entre la taille et le poids, et la capacité. Oh, et le prix. Les piles peuvent être coûteux. Très cher. Mais la taille et le poids et la capacité des batteries est même pas va être le plus gros problème avec l'Internet des objets. Il y a beaucoup de recherches en cours partout dans le monde pour fabriquer des batteries plus petites, plus puissant et plus efficace. Non, juste le nombre pur ** ** des batteries va être le problème. Et c'est un problème que les gens pas assez pensent à, et presque personne ne parle.

Voici ce que je veux dire. Prenons le nombre commun de 20 - 30 milliards d'appareils IdO en ligne d'ici à 2020. [Gartner](http://www.gartner.com/newsroom/id/2636073),), [Forrester](https://www.forrester.com/There+Is+No+Internet+Of+Things+8212+Yet/fulltext/-/E-RES101421) (pay-mur),) (pay-mur), [IDC](http://www.idc.com/getdoc.jsp?containerId=248451),), [Ovum](http://www.computerweekly.com/news/2240238915/Lot-of-nonsense-touted-about-IoT-says-analyst), et tout le monde à peu près le monde utilise ce nombre , et je ne veux pas discuter, alors nous allons prendre cela comme une donnée et aller avec 20 milliards d'appareils. Maintenant, nous allons dire que près de la moitié de ces appareils seront alimentés par le réseau, et ne sera pas besoin d'une batterie. Donc, nous sommes maintenant partis avec 10 milliards d'appareils avec batteries. Certains appareils peuvent aller un an ou plus sur une seule batterie. Certains ne peuvent aller quelques semaines. Donc nous allons, pour l'amour de l'argument, disons que la moyenne est qu'environ un tiers des appareils devront avoir leur batterie a changé au cours d'une année. Cela semble raisonnable.

Oui, il semble raisonnable, jusqu'à ce que vous faites les calculs suivants:

> 20B ÷ 2 = 10B - le nombre de périphériques en fonction de la batterie.

> 10B ÷ 3 = 3.4B - le nombre de batteries qui devront être changé en un an.

> 3.4B ÷ 365 = 9,1M - le nombre de batteries qui devront être changées tous les jours.

Ne voyez-vous le problème maintenant? Mais il y a pire. Bien pire.

Maintenant, l'échelle de laisser cela à un billion de dispositifs - un nombre qui est souvent utilisé quand on parle de l'IdO. Enfer, * Je suis * utilise ce numéro moi-même depuis 2004!

> 1T ÷ 3 = 333B - disons le Let seulement un tiers de ces dispositifs batteries maintenant besoin.

> 333B ÷ 3 = 111B - Le nombre de batteries qui devront être changé en un an.

> 111B ÷ 365 = 304M - le nombre de batteries qui devront être changés tous. Célibataire. journée. C'est 34k batteries à l'heure.

Compte tenu de ces chiffres, l'IdO s'effondrer sous son propre poids. Maintenant, si vous êtes une entreprise de la batterie, je suis sûr que ces chiffres sont rassurants tout à fait, mais pour tous ceux qui cherchent comment l'IdO fait fonction, il est clair que ces chiffres ne sont pas seulement insoutenable, mais ils sont complètement impraticables. Nous aurons besoin d'une armée de gens qui ne font que passer d'un appareil à changer les piles, 24 heures par jour, 7 jours par semaine, afin de maintenir. (Pour ceux qui jouent le jeu de la maison, qui est 34,000+ batteries par heure, toutes les heures.)

Nous avons clairement besoin une autre solution. La grande question est pourquoi ** ** est pas un dans le domaine IdO parle à ce sujet? Pourquoi est-il radio silence sur ce qui se profile, problème rédhibitoire dans IdO? Il n'y a que quelques personnes choisies qui travaillent sur des solutions à ce problème de la batterie. Si vous êtes dans IdO, et vous n'êtes pas déjà penser à la façon de gérer le problème de la batterie dans votre écosystème, pourrait maintenant être le temps de commencer.
