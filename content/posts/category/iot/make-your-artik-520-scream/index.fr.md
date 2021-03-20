---
title: « Faites votre cri ARTIK-520 »
Date: 2017-03-06
Author: davidgs
Category: IoT
Tags: ARTIK, ARTIK-520, IoT, Java
Slug: make-your-artik-520-scream
hero: images/Zulu-Duke200.png
---

Si vous lisez [post de la semaine dernière](/posts/category/general/making-artik-5-iot-gateway-kura/) de faire un dispositif passerelle IdO ARTIK-520 en utilisant le) de faire un dispositif passerelle IdO ARTIK-520 en utilisant le [projet Eclipse Kura](http://www.eclipse.org/kura/), alors ce sera une amélioration notable pour vous si vous allez essayer vous-même (et pourquoi pas vous? il était un excellent petit Comment la prise en main ARTIK- 520 et IdO!)

Il m'a été suggéré (ces petits birdies continuent de me nourrir des pépites intéressantes pour essayer) que j'essaie de [JVM Zulu Azul embarqué](https://www.azul.com/products/zulu-embedded/) comme une alternative à la JVM OpenJDK qui est installé par défaut. Ok, bien sûr, pourquoi pas. Quel est le pire qui puisse arriver. Ne pas répondre.

Quoi qu'il en soit, cela va être un court message. Je l'ai essayé. J'ai téléchargé la machine virtuelle Java Zulu et installé comme ceci:

```
[root@localhost ~]# tar xvf ezdk-1.8.0_112-8.19.0.31-eval-linux_aarch32hf.tar
[root@localhost ~]# update-alternatives --install /usr/bin/java java ~/ezdk-1.8.0_112-8.19.0.31-eval-linux_aarch32hf/jre/bin/java 100
[root@localhost ~]# update-alternatives --config java
[root@localhost ~]# systemctl restart kura.service 
```

Rechargez la console Web Kura dans votre navigateur.

Au moins pour moi, il y avait une très nette amélioration et marquée dans l'exécution du service Web. Comme dans I ** vraiment ** remarqué. Mais là encore, même si je suis trop poli pour commenter dans mon [post précédent](/posts/category/general/making-artik-5-iot-gateway-kura/), je l'avais remarqué que les performances de Kura avait été peu lent. Je viens attribuai que le fait que nous sommes en cours d'exécution sur certains matériels embarqués et qui est presque toujours plus lent que les plates-formes plus robustes. Mais vous obtenez une machine virtuelle Java de haute performance et obtenir quelques secondes de votre vie chaque fois que vous prenez une action en Kura. Ce sont quelques secondes, une fois perdu, vous n'auriez jamais reçu de réponse. Secondes que vous pouvez maintenant utiliser pour épeler pleinement votre 'dans les messages texte au lieu de simplement taper « ur ». Cela rendra le monde meilleur pour tout le monde.
