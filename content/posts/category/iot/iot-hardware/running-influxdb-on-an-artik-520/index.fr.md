---
title: "Courir sur un InfluxDB ARTIK-520"
Date: 2017-07-14
Author: davidgs
Category: Evangelism, IoT
Tags: Database, IoT
Slug: running-influxdb-on-an-artik-520
hero: images/open-data-1_0.png
reading_time: 9 minutes
---


Avouons-le, l'IdO est sur les données. Je [dit qu'il](/posts/category/iot/you-havent-seen-big-data-yet/) il y a quelques semaines. Il est au sujet de la collecte des données. ** Beaucoup de données **. Mais il est en fait de beaucoup plus que la simple collecte de données. Il suffit de la collecte des données ne pas vraiment vous obtenez nulle part si tout ce que vous faites est le récupérer. Pour être utiles, les données IdO doit être pertinente, précise et action. Cette dernière partie est la clé, vraiment. des données exploitables. Afin de rendre votre action de données, vous devez être en mesure d'analyser, de préférence en temps réel. Maintenant, vos problèmes de données sont de plus en plus. Vous avez un tsunami littéral des données de séries chronologiques affluer et vos dépenses toutes vos ressources juste ingérant. Maintenant, je vous dis que vous devez analyser aussi, et prendre des mesures sur la base de cette analyse * en temps réel * ?! Sortir.

Ne pas tirer sur le messager. Vous êtes celui qui voulait déployer une solution IdO pour surveiller tous les 10 000 de vos whosiwhatsits, pas moi. Mais je vais vous dire comment le résoudre.

## Pas le ARTIK-520 Encore une fois!

Oui, l'ARTIK-520 à nouveau. J'ai eu un serveur Linux ici dans le bureau qui aurait probablement été un lieu de bien à faire, mais il est allé à sa maison maintenant (je ne l'encourager et de le rendre utile avant de l'expédier hors de vivre une vie longue et productive un serveur active Directory. ne demandez pas. Nous ne reparlerons). Je aurais pu utiliser un Raspberry Pi, ou même le [Raspberry Pi Zéro W](/posts/category/iot/iot-hardware/accessing-your-raspberry-pi-zero-w/) que je suis assis ici. Comme vous le savez, j'ai) que je suis assis ici. Comme vous le savez, j'ai [pléthore](/posts/category/iot/the-updated-big-board-of-iot/) de IdO périphériques à partir desquels choisir. Je voulais quelque chose avec un peu plus de puissance qu'une norme IdO * appareil * et je ne me sentais pas comme futzing avec le pis. Donc, vous entendez coincé sur le 520 à nouveau.

## Mise en place pour les données et l'analyse Ingestion

Attendez, nous allons faire l'ingestion et l'analyse des données sur un ARTIK-520? Ne devrions-nous emploierons un serveur? Voir au dessus. De plus, ne serait-il être un peu intéressant de faire un peu de l'ingestion et l'analyse des données au centre, avant que les données sont envoyées à l'arrière-plan? Peut-être. Alors que ce que nous allons faire.

Comme le titre de ce post l'indique, nous allons utiliser InfluxDB de [Data Afflux](https://www.influxdata.com/). Il est open source et gratuit si vous voulez l'essayer aussi. Ne hésitez pas à suivre. Pourquoi InfluxDB? Eh bien, je voulais l'essayer, et il prétend être la base de données de séries chronologiques de plus en plus rapide autour, plus je l'ai entendu était assez facile de se lever et courir donc je pensais que je lui donnerais un coup.

Tout d'abord, je vais dire que l'obtenir tout et le fonctionnement était simple absolument mort. Comme votre vice-président du marketing peut le faire (** blague Alert:. ** De retour à mes jours de soleil, la construction des démos qui étaient installable et runnable par mon vice-président marketing a toujours été ma mesure qu'il aimait parce qu'il pouvait les exécuter!) Je téléchargé tous les composants et les démarré. Il y a un tas de pièces mobiles ici, donc vous devez vous assurer de les obtenir tous. Il y a ** InfluxDB **, qui est (évidemment) la partie de base de données. Une sorte de clé pour la chose. Il y a aussi ** Telegraf **, qui est un moteur d'ingestion de données. Ensuite, il y a ** Chronograf **, qui est un outil de visualisation et d'analyse très sympa. Enfin il y a ** Kapacitor ** qui gère l'ensemble « Action » partie pour vous.

Je suis en mesure de télécharger et d'installer toutes les pièces en 5 minutes environ - peut-être moins - et obtenir la chose et en cours d'exécution. J'ai même construit mon premier tableau de bord pour surveiller l'utilisation du processeur et la mémoire du ARTIK-520 à environ une minute et demie.

![Afflux Dashboard image](/posts/category/database/images/Safari031.jpg)

Ce qui semble en fait vraiment bon. En particulier, le graphique d'utilisation de la mémoire. Je vais donc probablement pas submerger la mémoire à ce sujet - et nous allons garder à l'esprit que je suis toujours en cours d'exécution ce ARTIK-520 comme un [serveur OpenHAB](/posts/category/iot/iot-hardware/openhab-server-artik-520/) contrôler ma maison.

Mais je veux vraiment utiliser pour la surveillance des données de capteurs réels, non seulement la machine elle-même. Il se trouve que j'ai un projet de capteur ici sur mon bureau, et il collecte activement des données et l'exploitation forestière il. L'exploitation du bois ailleurs, mais qui est sur le point de changement.

## Enregistrement des données en direct

Le capteur je l'ai déjà mis en place et en cours d'exécution est un j'ai écrit sur [récemment](/posts/category/iot/playing-with-distance/). Il est accroché à un). Il est accroché à un [Particle.io](http://particle.io/) Photon et mesure la quantité de « choses » dans une boîte à peu près en permanence (1 lecture chaque seconde). J'ai créé une base de données pour cette - « iotdata » ne sont pas d'origine je? - et l'affichage testé à partir de la ligne de commande selon le (excellent)) Photon et mesure la quantité de « choses » dans une boîte à peu près en permanence (1 lecture chaque seconde). J'ai créé une base de données pour cette - « iotdata » ne sont pas d'origine je? - et l'affichage testé à partir de la ligne de commande selon le (excellent) [Documentation](https://docs.influxdata.com/influxdb/v1.2/guides/writing_data/). Tout semblait aller comme prévu. Maintenant, pour obtenir des données en direct streaming en!

D'abord, je devais percer un trou dans mon pare-feu pour pouvoir arriver à ma boîte ARTIK-520 du monde extérieur. Il semble fou que la particule est d'un côté de mon bureau et l'ARTIK-520 est sur l'autre et mes données doit faire un voyage autour de la planète pour y arriver, mais que comment fonctionne le monde parfois.

Particule a « » Webhooks que vous pouvez configurer pour poster à d'autres services. Ils ont des ones prédéfinis pour Google Apps, etc., mais pas pour InfluxDB. Ils ont besoin de résoudre ce problème, mais c'est un autre poste. J'ai essayé de définir ma propre webhook, mais leurs crochets web insiste sur tout ce que l'affichage

```js
content-type: application/x-www-form-urlencoded
```

Et ce n'est pas ce qu'on attend, et il se révèle pas au travail. Pour ne pas être dissuadé, je suis parvenu à trouver une autre solution. Le dispositif de particules affichera ses données directement à InlfuxDB. Qui a besoin d'un intermédiaire! Il faut un code un peu plus, mais il est pas mal. Voici ce que je devais ajouter à mon code de particules:

```cpp
#include <HttpClient.h>
...
HttpClient http;
http_header_t headers[] = {
  { "Accept" , "*/*"},
  { "User-agent", "Particle HttpClient"},
  { NULL, NULL } // NOTE: Always terminate headers will NULL
};
http_request_t request;
http_response_t response;
...
void loop(){
...
  request.body = String::format("volume_reading value=%d", getRangeReading());
  http.post(request, response, headers);
...
} 
```

C'est tout ce qu'il fallait! Vous remarquerez que je ne suis pas en utilisant toute sécurité sur cette configuration. ** Je ne recommande pas faire de cette façon **. Au moins, vous devez utiliser un nom d'utilisateur / mot de passe pour l'authentification à la base de données, et vous devriez probablement être en utilisant SSL. Mais je n'ai pas cert SSL pour mon ARTIK-520, ce qui était juste un exercice de ma part et non un véritable déploiement. De plus, je poked trous non standard dans mon pare-feu, et ne pense vraiment que tout le monde va venir frapper (et s'ils le font, je vais voir instantanément et peut les fermer, donc ne soyez pas des idées).

Et voici ce que mon tableau de bord ressemble maintenant à:

![Agrandir Dashboard Afflux](/posts/category/database/images/Safari033.jpg )

Un beau temps réel ** ** graphique des données entrantes de mon capteur. Rapide et facile à mettre en place!

## Make It Actionable

Nous avons jusqu'à présent mis en place Telegraf pour l'ingestion de données, InfluxDB, la base de données réelle, et Chronograf qui nous donne les tableaux de bord de frais de données en temps réel de notre capteur (s). Mais encore une fois, les données sont tout mignon et amusant, mais il est la rendant * * une action qui est la clé. Et c'est là Kapacitor entre en jeu. Je vais mettre cela à côté afin que je puisse recevoir des alertes et des notifications lorsque le volume des « choses » dans ma boîte est trop élevée ou trop faible.

Kapacitor, malheureusement, ne dispose pas d'une extrémité avant de l'interface utilisateur slick qui se prête facilement à voir vos résultats de façon satisfaisante visuellement. Mais il est pas moins puissant. Il vous suffit d'écrire vos « actions » dans TICKScript puis les déployer. Alors, plongez dans la documentation et allez-y déjà!

La syntaxe des scripts TICK est un peu Checklist, donc vraiment n'assurez-vous que vous avez lu la documentation sur celui-ci. Sérieusement. J'ai pu, en 10 minutes environ, pour écrire 2 Scripts TICK pour alerte lorsque la mesure du volume obtenu en dessous de 50 (ce qui est assez reprisés plein!) Ou quand il a au-dessus de 210 (qui est vide essentiellement). Pour l'instant, ces alertes sont simplement enregistrées dans un fichier, mais je ne pouvais tout aussi facilement les fait demi-tour comme POST à mon serveur pour faire une alerte de navigateur ou autre chose.

J'aimerais voir une fantaisie frontal sur Kapacitor qui rend l'écriture et le déploiement de scripts TICK rapide et facile, et que vous faites permet aux alertes et des choses sur votre Chronograf Dashboards, mais pour l'instant je suis assez content des alertes juste envoi vers d'autres choses.

Si je voulais, je pouvais envoyer ces alertes ** ** retour à mon Photon - via un POST à l'API de particules Cloud - avoir le Photon prendre une action de son propre bien. Peut-être que si j'avais que pneumatique « poussoir » plongerais tout hors de la boîte que je ferais cela.

## À ton tour

Espérons que je vous ai eu assez loin sur la route que vous pouvez démarrer votre propre projet basé sur InfluxDB pour vos données IdO. Si vous le faites, j'aimerais entendre parler!
