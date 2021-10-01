---
title: "Openhab Server sur 520-LONGER"
Date: 2017-03-28
Author: davidgs
Category: IoT
Tags: ARTIK, ARTIK-520, IoT, openHAB
Slug: openhab-server-artik-520
hero: images/logo-2.png
reading_time: 6 minutes
---

Comme je l'ai dit plus tôt, lorsque vous avez un marteau ... J'ai donc décidé de mettre en place encore une autre passerelle IdO. Cette fois, je pris un coup d'œil à [OpenHAB](http://www.openhab.org) « vendeur et de la technologie agnostique logiciel d'automatisation open source pour votre maison. » Pourquoi ne pas, non? Je l'ai déjà mis en place un) « vendeur et de la technologie agnostique logiciel d'automatisation open source pour votre maison. » Pourquoi ne pas, non? Je l'ai déjà mis en place un [serveur Edge Droplit.io](/posts/category/iot/iot-software/artik-520-droplit-io-edge-device), et un), et un [serveur Eclipse Kura](/posts/category/general/making-artik-5-iot-gateway-kura/), alors pourquoi ne pas donner un plus un droit d'essayer? Droit. Alors nous allons plonger.

## Installer

Le programme d'installation était incroyablement facile. Presque effrayant facile. Sérieusement. Comme toujours, j'ai commencé avec l'image ARTIK Fedora base, et bien sûr mis à jour avec tous les derniers:

```
[root@localhost ~]# dnf update
```

Cela prend un certain temps.

** Note: ** Je commence par un nouveau système d'exploitation pour chacun de ces projets. Merci à être en mesure de [vider un système en cours d'exécution](/posts/category/general/how-to-save-your-artik-520-backup/) retour vers mini-carte SD, je largue tout ce que je travaillais sur à une carte, graver une nouvelle carte, et recommencer.

Vous allez avoir besoin que JVM Zulu j'ai parlé de [plus tôt](/posts/gategory/iot/make-your-artik-520-scream/). L'installation est rapide et facile, mais ne sautez pas! Apparemment, la version open-jdk de la machine virtuelle Java ne vous donnera pas vraiment beaucoup de joie avec OpenHAB. Je n'y suis pas allé, je viens d'installer la machine virtuelle Java Zulu et a continué. Si vous avez oublié, une fois que vous avez). L'installation est rapide et facile, mais ne sautez pas! Apparemment, la version open-jdk de la machine virtuelle Java ne vous donnera pas vraiment beaucoup de joie avec OpenHAB. Je n'y suis pas allé, je viens d'installer la machine virtuelle Java Zulu et a continué. Si vous avez oublié, une fois que vous avez [téléchargé la machine virtuelle Java Zulu](https://www.azul.com/products/zulu/)

```
[root@localhost ~]# tar xvf ezdk-1.8.0_112-8.19.0.31-eval-linux_aarch32hf.tar
[root@localhost ~]# update-alternatives --install /usr/bin/java java ~/ezdk-1.8.0_112-8.19.0.31-eval-linux_aarch32hf/jre/bin/java 100
[root@localhost ~]# update-alternatives --config java
```

Le forfait ne plus vous allez avoir besoin est Décompressez parce que quelqu'un a pensé qu'il était une bonne idée de * pas * inclure Décompressez (ou zip pour cette matière) dans l'image de base. Peu importe.

```
[root@localhost ~]# dnf install unzip
```

Facile. Fait. Ensuite, obtenir le serveur openHAB. Les instructions pour cette installation sont [ici](http://docs.openhab.org/installation/linux.html#manual-installation), mais vraiment je vais vous dire tout ce que vous devez savoir.

```
[root@localhost ~]# cd /tmp
[root@localhost /tmp]# wget -O openhab-download.zip https://bintray.com/openhab/mvn/download_file?file_path=org%2Fopenhab%2Fdistro%2Fopenhab%2F2.0.0%2Fopenhab-2.0.0.zip
[root@localhost /tmp]# unzip openhab-download.zip -d /opt/openhab2
[root@localhost /tmp]# rm openhab-download.zip
```

Les instructions indiquent pour créer un utilisateur openhab, puis exécutez le serveur openhab de cet utilisateur. Ne pas faire cela. Je suppose que vous pouvez comprendre comment, mais quand je l'ai fait, je continué à obtenir:

```
/opt/openhab2/runtime/bin/karaf: line 28: cd: /root: Permission denied
: JAVA_HOME is not valid: /root/ezdk-1.8.0_112-8.19.0.31-eval-linux_aarch32hf/jre/
```

Donc finalement je l'ai juste couru en tant que root. Il fonctionne très bien en tant que root.

C'est vraiment tout ce qu'il y avait trop elle! Je vous avais dit qu'il était facile!

## En utilisant OpenHAB

C'est là les choses se amuser! Une fois que le serveur OpenHAB a commencé, je me suis connecté à l'ARTIK-520 en utilisant mon navigateur (port 8080, juste FYI) et ** ** Voilà! J'ai eu un tableau de bord de toutes sortes. Mais rien n'était là. Hmmm ... ok, donc je devais installer des « liaisons ».

![Safari017](/posts/category/iot/iot-hardware/images/Safari017.jpg)

Il y en a beaucoup. J'ai choisi ceux pour les trucs que j'ai. Un téléviseur Samsung, certains Nest Stuff et les commutateurs Wemo. Dès que j'ai installé ces liaisons, des choses ont commencé à apparaître dans ma « boîte de réception ». Comme, instantanément! Ce qui a montré tout de suite étaient les commutateurs Wemo. Dès que je fixe la connexion réseau sur mon téléviseur Samsung, il a également montré tout de suite. Le truc Nest va prendre un peu plus de travail que je devais inscrire en tant que développeur Nest, et je n'ai pas terminé sauter à travers tous leurs cerceaux tout de suite. Mais les liaisons sont installés:

![Safari016](/posts/category/iot/iot-hardware/images/Safari016.jpg) "Safari016.jpg")

J'ai installé la gloutonnerie Z-Wave pour des raisons qui me échappent maintenant. Faites avec.

![Safari015](/posts/category/iot/iot-hardware/images/Safari015.jpg)

Et ce sont tous les dispositifs qui sont apparus. Et maintenant, je peux les contrôler!

## Conclusions

Le Kura serveur m'a pris une semaine ou deux pour travailler, avec un montant équitable de soutien des ingénieurs Eclipse responsables. Il a été vraiment pas conçu pour fonctionner sur une plate-forme embarquée comme le ARTIK-520, et n'a jamais été testé là-bas, il est donc pas vraiment surprenant.

Le serveur Edge Droplit.io m'a pris environ une semaine. En fait, l'installation était assez facile une fois que j'ai renoncé à essayer de construire le système sur le ARTIK-520. Rappelez-vous ma règle: Ne pas construire / compiler sur ARTIK-520, sauf nécessité absolue. Ensuite, il a fallu quelques jours pour obtenir un bug élaboré afin qu'il puisse trouver mon Wemo passe, mais c'est tout ce qu'il allait trouver.

Le serveur openHAB était de loin le plus facile. A pris environ 2 heures, début à la fin, y compris la construction / clignotant / mise à jour du système d'exploitation. Et il a trouvé beaucoup plus d'appareils presque instantanément (une fois que j'ai compris pour installer les fixations. Je ne lis pas toujours ** toutes ** les directions.). Il est très ** ** sensible et facile à traiter.

J'ai un tas plus de choses à étudier ici, comme le moteur de règles « expérimentales », et j'essayer l'intégration Text-to-Speech si j'ai le temps.

En toute honnêteté, cela peut être mon dernier test d'intégration ARTIK-520 pendant un certain temps. Ils ne sont pas en train de payer me les faire. En fait, personne ne me paie pour faire quoi que ce soit en ce moment, donc jusqu'à ce que je ** ** qui fixe, je vais probablement passer la majeure partie de mon emploi à temps à la chasse. Et peut-être un peu plus de temps sur le projet resistbot. Tout cela est facilement réparable si quelqu'un déciderait de me embaucher. :-)
