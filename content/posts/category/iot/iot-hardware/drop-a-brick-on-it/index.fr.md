---
title: « Laissez tomber une brique sur le sujet »
Date: 2014-11-19
Author: davidgs
Category: IoT
Tags: connectivity, Internet Anywhere, IoT
Slug: drop-a-brick-on-it
hero: images/render-2.jpg
---


Je suis tout à propos de la connectivité. Oui, il y a des moments à se déconnecter du monde, mais c'est une déconnexion personnelle. Les applications et les appareils doivent, pour la plupart, être connecté ** ** tout le temps. Mais la connectivité est coûteuse et difficile à maintenir dans des endroits éloignés. Si vous connectez un serveur ou votre maison, il y a beaucoup d'options disponibles - allons-y juste avec que pour l'instant, allons-nous? Toute la question du monopole FAI me énerver. En général, ces types de connexions sont rapides, fiables et stables. La plupart du temps ils sont pas cher et largement disponibles.

Mais quand on regarde l'Internet des objets (IdO) les choses peuvent obtenir un peu plus squirrelly. Oui, si vos appareils IdO sont des choses dans votre maison, vous pouvez aller avec la connexion que vous avez déjà. Si elles sont des actifs IdO en entreprise, vous avez votre connectivité de classe entreprise à compter. Qu'en est-il des dispositifs IdO qui sont soit le terrain ou à base mobile? Que faire si votre déploiement IdO dans une jungle au Panama? Ou le dessert en Afrique?

J'ai trouvé l'autre jour, et il semble que la solution parfaite. Déposez un (http://www.brck.com) [Brck] là-dessus! Cela ressemble à un excellent appareil pour la connectivité à distance, en particulier pour des applications IdO ou à faible bande passante. Il y a quelques ici des caractéristiques vraiment cool à la recherche - et quelques que je voudrais étudier plus, si j'avais le temps et l'appareil. 8 heures intégré batterie de secours pour cet appareil est une grande victoire dans de nombreux scénarios de déploiement à distance, pour être sûr. Le fait que ce dispositif a été développé en Afrique ** ** ** spécifiquement pour les déploiements à distance ** est un énorme plus. Encore une fois cependant, il y a quelques choses que je pense besoin une enquête plus approfondie.

La première est la possibilité d'ajouter des capteurs à base Arduino et appareils directement à la boîte. Donc, si vous utilisez [Zigbee](http://zigbee.org) ou des dispositifs) ou des dispositifs [IEEE 802.15.4](http://en.wikipedia.org/wiki/IEEE_802.15.4) comme nœuds d'extrémité, vous pourrait ajouter une passerelle vers ces périphériques aux dispositifs Brck directement. Si vous utilisez) comme nœuds d'extrémité, vous pourrait ajouter une passerelle vers ces périphériques aux dispositifs Brck directement. Si vous utilisez [EBT](http://www.bluetooth.com/Pages/low-energy-tech-info.aspx) périphériques, vous pouvez ajouter un BTLE-passerelle pour l'accès à ces appareils aussi bien. Ce fut - retour dans la journée - l'un des grands points d'achoppement pour beaucoup d'applications de capteurs. Faible puissance, les connexions réseau à faible énergie aux appareils étaient difficiles à combler à l'Internet pour backhauling les données. Dans de nombreux déploiements, il est encore. En particulier pour les applications de télédétection. Être en mesure de construire dans votre appareil de passerelle Internet à capteur serait un énorme plus.

Ce que j'aimerais étudier plus - compte tenu du temps et de l'appareil, bien sûr, puisque l'IdO est mon passe-temps, pas mon travail - est de savoir si je pouvais déployer des services réels au dispositif Brck. Comme l'authentification, l'autorisation, l'intégrité des données et la gestion des périphériques IdO. Je sais que, de leur site Web, qu'ils ont des outils en nuage - qui ne fonctionne pas, amirite? - pour gérer vos périphériques Brck, et ils disent que vous pouvez pousser arduino croquis jusqu'à la boîte à distribuer aux périphériques connectés, mais que sur ces autres services? Que faire si je voulais utiliser, par exemple, [OpenAM](https://forgerock.org/openam/) et) et [OpenIDM](https://forgerock.org/openidm/) services? Pourrais-je déployer ces services directement au nœud? Ou pourrais-je construire les appels de service dans le dispositif de proxy pour les nœuds d'extrémité?

Je suppose que je vais l'ajouter à la liste des appareils et technologies, j'adorerait ** ** pour pouvoir passer du temps avec, mais ne sera probablement pas le temps ni l'argent pour traiter.<sigh>
