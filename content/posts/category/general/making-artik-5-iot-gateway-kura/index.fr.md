---
title: « Faire une passerelle IdO ARTIK-520 avec Kura »
Date: 2017-03-02
Author: davidgs
Category: IoT
Tags: ARTIK, Eclipse, Kura, Samsung
Slug: making-artik-5-iot-gateway-kura
hero: images/kura.jpg
---

Il y a environ un million de façons de construire ou d'acheter un dispositif passerelle IdO. (En fait, plus comme [586000](https://www.google.com/#newwindow=1&q=iot+gateway+device&*), mais il ne faut pas chipoter). Chacun a ses propres mérites, ou les pièges. Vous pouvez en acheter un, et le risque d'être enfermé dans une solution unique fournisseur. Vous pouvez construire un à partir de zéro et être sellé d'avoir à la source du matériel, la construction du logiciel, puis le maintenir tout espoir et que vous avez fait les bons choix et qu'il l'échelle. Ou, vous pouvez utiliser une solution existante Open Source, comme), mais il ne faut pas chipoter). Chacun a ses propres mérites, ou les pièges. Vous pouvez en acheter un, et le risque d'être enfermé dans une solution unique fournisseur. Vous pouvez construire un à partir de zéro et être sellé d'avoir à la source du matériel, la construction du logiciel, puis le maintenir tout espoir et que vous avez fait les bons choix et qu'il l'échelle. Ou, vous pouvez utiliser une solution existante Open Source, comme [Kura](http://www.eclipse.org/kura/index.php) de la Fondation Eclipse.

Je joue autour de la ligne Samsung ARTIK du matériel IdO récemment, comme vous [rappelez-vous](/posts/category/iot/winter-vacation-iot-artik-5/), donc je décidé de voir si je pouvais tourner), donc je décidé de voir si je pouvais tourner [ARTIK-520](http://www.digikey.com/product-detail/en/samsung-semiconductor-inc/SIP-KITNXB001/1510-1316-ND/5825102) dans une passerelle IdO dans un format facile, de manière évolutive. Il m'a été suggéré que j'essayer le projet Eclipse Kura, même si elle n'a pas été réellement pris en charge sur ARTIK. Je ne suis pas à être dissuadés par « Il ne fonctionne pas sur ce matériel » alors j'ai décidé de lui donner un coup. Il m'a fallu quelques jours et quelques rencontres avec quelques-uns des ingénieurs de différentes parties du projet Kura, mais il est avéré être relativement simple et directe. Alors, voici mes expériences, et une sorte de « comment » pour le faire fonctionner pour vous, si vous êtes intéressé. Je vais aussi parler un peu plus sur quelques-unes des forces et des faiblesses, je vois dans cette approche le long du chemin.

## Le matériel

Tout d'abord, sur le matériel. J'ai un kit de développement ARTIK-520. Voici la diminution des effectifs sur que si vous ne voulez pas aller [regarder vers le haut](https://www.artik.io/modules/artik-520/) vous-même:

- Puissance efficace double Cortex®-A7 avec Wi-Fi, Bluetooth, ZigBee, Discussion
- Exploite Samsung technologie ePop pour offrir de petits modules d'encombrement: 30 mm X 25 mm
- 512 Mo de RAM, flash de 4 Go (eMMC)
- la sécurité de classe entreprise avec du matériel élément sécurisé et OS sécurisé
- package Fedora Linux® avec connectivité, graphiques, gestion de l'énergie et des bibliothèques de sécurité

Le kit de dev réelle dispose d'un port Ethernet câblé (ce sera important, donc en souvenir), les ports micro-USB, et d'autres choses aussi, mais je ne vais pas utiliser la plupart des que dans cet exemple. Il suffit de suivre l'excellent « [Mise en route](https://developer.artik.io/documentation/artik/getting-started/) » Guide pour obtenir votre carte ARTIK-520 et en cours d'exécution. J'ai utilisé l'image Fedora 25 générique de ce guide pour configurer mon conseil d'administration. Je suis venu à ce de plusieurs directions différentes, et a eu quelques faux départs le long du chemin comme je l'ai fait. Voici comment je suis le logiciel installé Kura.

## Les logiciels

Tout d'abord, ne pas suivre la Koura « Mise en route » guide. Il ne vous commencer ici, ce qui est la raison pour laquelle je ne suis même pas un lien vers elle. Je n'ai jamais réussi à passer à travers ce document et se retrouver avec quelque chose qui ressemble à un système de développement travaillant pour Kura. Nous essayons de Kura en cours d'exécution sur un ARTIK-520, ne pas construire un système de développement. Les docs juste ne correspondent pas réalité pour moi sur un MacBook Pro. Ensuite, ne suivent pas le Guide de mise en route ici [soit](http://wiki.eclipse.org/Kura/Getting_Started). Sérieusement. Ou si vous le faites, il suffit de ce petit morceau de celui-ci:

```
DSimmons-Pro:~ $ git clone -b develop https://github.com/eclipse/kura.git kura
DSimmons-Pro:~ $ cd kura
DSimmons-Pro:kura $ ./build-all.sh
```

Et vous faites cela sur votre ordinateur portable, ** ** pas la carte ARTIK-520! Rappelez-vous que. Vous ne voulez pas construire tout cela sur lui-même ARTIK-520. Vous pouvez ** ** si vous voulez, je pense, mais il faudra une * très * longtemps, et au moins quand je tentais, je devais désactiver la construction parallèle, car il ne sont tout simplement pas les ressources pour le faire . Ce qui est la raison pour laquelle je vous conseille de ne pas le faire.

Vous aurez besoin d'avoir Java et Maven, etc. déjà installé sur votre ordinateur portable, mais les instructions d'installation sont tout simplement trop alambiquée et confus. Au moins sur mon Mac, Brew maven install 'était tout ce qu'il fallait. Cette accumulation tous les scripts prendra un certain temps. Et pas seulement une « tasse de café », tandis que. Plus comme un « aller à la salle de gym » tout. Quand il est enfin terminé, aller chercher dans kura.git / Kura / distrib / répertoire cible et émerveiller tous les trucs qu'il a créé pour vous.

```
DSimmons-Pro:kura $ cd kura/distrib/target
DSimmons-Pro:target $ ls -l
total 4001616
```

Ne dites pas que je ne vous préviens! C'est beaucoup. Qu'est-ce que vous cherchez dans cette botte de foin est le fichier « kura_3.0.0-SNAPSHOT_fedora25_installer.sh » C'est le fichier que vous voulez passer à la ARTIK-520. Juste ftp / sftp / scp il là-bas, mais ne vont pas vraiment courir encore! C'est la section suivante, et vous aurez envie de lire cet article avant de faire l'installation ou vous perdrez un jour ou.

## La passerelle

Comme je l'ai dit, ne pas ssh juste dans le conseil d'administration ARTIK-520 et exécuter ce programme d'installation. Je suis connecté via le port de débogage USB, donc je ne perdais pas la connectivité, mais si vous avez configuré la connexion Wi-Fi sur le ARTIK-520, et sont ssh-ed pour que lorsque vous exécutez le programme d'installation, vous aurez un une surprise assez désagréable. Et voici où ce port Ethernet filaire je l'ai mentionné plus tôt revient en jeu - rappelez-vous, je vous ai dit que je reviendrais à elle. Vous devez absolument ** ** avez ce port Ethernet filaire connecté à votre réseau. Et voici où je dois enregistrer ma seule déception vraiment sérieux avec, et se querellent avec le logiciel Kura. Alors voilà.

Quand je l'ai installé, je l'avais déjà mis en place la carte ARTIK-520, obtenu le réseau sans fil mis en place pour que je puisse y accéder, etc. Il est assez facile à faire, et m'a sauvé d'avoir à trouver un câble CAT-5 et obtenir que installer. Mais quand je courais le programme d'installation Kura, tout à coup tout se détraque avec mon réseau. Il a installé très bien, et a commencé la fin de service Kura, mais je ne pouvais plus accéder à la boîte via WiFi. Whisky, Tango, Foxtrot !? Quand j'ai commencé à creuser, je remarque que tout à coup mon WiFi (wlan0) l'interface a une adresse IP statique de quelque 172, xxx plage affectée à, non pas ma gamme WiFi LAN qu'il avait avant. Changé en arrière, mais tôt ou tard il reviendra à cette adresse à nouveau. Impossible de contacter le web-interface utilisateur pour configurer la boîte. Les chiens ont appris une nouvelle série de jurons et jurons ce jour-là.

Il se trouve que le service Kura, à installer, a décidé que Thew interface WiFi devait être utilisé comme un nouveau point d'accès, il a reçu une nouvelle adresse IP, configuré comme un point d'accès, et a commencé la publicité d'un nouveau SSID tout par lui-même. Sans me avertir. Sans me demander. Je vois cela comme un comportement assez antisocial et essaie de comprendre le libellé exact pour un rapport de bug. Jusqu'à présent, le rapport de bogue est NSFW. Ajout d'un nouveau SSID et, essentiellement un nouveau routeur, à mon réseau ne joue pas bien. ** Je décide ** quand un nouveau point d'accès est autorisé sur mon réseau. ** I ** décide quand un nouveau routeur est installé. Comme je l'ai dit, à peu un comportement antisocial. Et juste pour vous assurer que je ne faisais pas un problème de quelque chose qui n'a pas été un gros problème, j'ai couru ce scénario passé un tas d'autres personnes de réseau et de sécurité que je connais. Pour une personne, ils ont tous été horrifiés par ce comportement. Ce n'est pas ok.

Ok, tempêter sur. Je descends de ma caisse à savon.

Revenons donc à la tâche à accomplir. Vous devez absolument ** ** avez cette configuration du port Ethernet filaire. Ensuite, ne l'installation, vous pouvez vous connecter à la interface utilisateur Web sur l'adresse Ethernet filaire. Et puis, et alors seulement, vous pouvez voir réellement la puissance et la polyvalence d'utilisation Kura comme logiciel de gestion de la passerelle. Ne pas avoir l'impression de mon mécontentement au-dessus avec le détournement d'avion de mon réseau que je n'aime pas Kura. Bien au contraire. J'aime réellement un peu. Il est juste que peu de manigances que je ne suis pas friand.

Mais si vous avez exécuté le programme d'installation et redémarré votre ARTIK-520 et a essayé de vous connecter réalisera probablement rapidement que vous ne pouvez pas. Hmmm ... Vous aurez besoin de faire une modification du script de démarrage en premier. ainsi de suite l'ARTIK-520:

```
[root@localhost ~]# systemctl stop kura.service
[root@localhost ~]# cd /opt/eclipse/kura/bin/
[root@localhost bin]# ls
start_kura_background.sh start_kura_debug.sh start_kura.sh
```

Maintenant, modifier les start_kura_ * scripts et changer toutes les lignes qui disent `java -Xms512m -Xmx512m` à` 256m` place. Le ARTIK-520 a seulement 512 Mo de mémoire (voir ci-dessus) afin d'essayer de donner à chaque dernier bit de celui-ci aux résultats Java dans un `outOfMemoryException` et un accident. Bien sûr.

Maintenant, redémarrez Kura:

```
[root@localhost bin]# systemctl start kura.service
```

Alors maintenant que j'ai Kura en cours d'exécution avec succès, je peux connecter au web interface utilisateur (nom d'utilisateur admin, mot de passe administrateur pour que vous aurez envie de changer cela), j'ai en fait une interface assez agréable de gestion que je peux utiliser pour configurer il se boîte .

![Safari013](/posts/category/general/images/Safari013.jpg)

Ne vous inquiétez pas, vous n'aurez pas les choses « Demo » sur le vôtre. C'est quelque chose d'autre, je travaille sur un autre poste de blog. Je peux configurer le pare-feu, je peux lutter contrôle de mon dos d'interface Wi-Fi, et une foule d'autres choses.

Maintenant, si ce que vous cherchez est très simple, moyen rapide et efficace de la construction d'un point d'accès qui sera mis en place son propre SSID, etc. puis, hors de la boîte, Kura est certainement la voie à suivre comme fait certainement cela.

Je travaille toujours sur de trouver comment le connecter à un service cloud, et pour commencer l'enregistrement des données de capteurs pour, de sorte que devront attendre pour un autre poste. Je voudrais aussi essayer d'obtenir tout cela construit dans le cadre d'un modèle de déploiement Resin.io, mais je ne suis pas encore tout à fait non plus.

Restez à l'écoute!
