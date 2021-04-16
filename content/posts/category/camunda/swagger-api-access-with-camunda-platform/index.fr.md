---
title: "Accès à l'API Swagger avec la plate-forme Camunda"
Date: 2021-03-10
Author: davidgs
Category: Camunda, BPMN, DevRel
Slug: swagger-api-access-with-camunda-platform
hero: images/mimi-thian-VEKWzpQu-5M-unsplash-2.jpg
---

Avez-vous déjà lancé l'instance Camunda Platform Docker et souhaité pouvoir effectuer des appels en direct vers l'API via un [serveur swagger](https://swagger.io)? On a! Et comme la plupart des choses que nous souhaitons pouvoir faire, nous allons y arriver.

## Bientôt disponible

Pour être clair, cette intégration arrive dans le conteneur officiel Camunda Platform Docker avec la version 7.15. Ce n'est tout simplement pas encore prêt. Il s'agit donc davantage d'une solution provisoire que de la solution ultime, mais cela fonctionne, et cela facilite*beaucoup* l'envoi d'appels d'API à une instance en direct de Camunda Platform. Alors suivez-le et nous vous montrerons comment l'exécuter vous-même.

## CORS est votre ami, pas votre ami

En général, et sur Internet régulier, le partage de ressources croisées (CORS) vous protège en ne chargeant pas de ressources provenant de sources aléatoires et non fiables. C'est généralement une bonne chose. Jusqu'à ce que ce ne soit pas le cas.

Quand n'est-ce pas? Lorsque vous voulez faire quelque chose comme faire des appels API d'un hôte à un autre lorsque les 2 hôtes n'ont pas d'accord de confiance explicite. Comme entre 2 conteneurs Docker. Ou entre votre ordinateur portable et un conteneur Docker.

Oui, vous pouvez entrer et définir un en-tête dans le serveur HTTP tel que `Access-Control-Allow-Origin: *` et cela résoudra le problème (tout en créant une foule d'autres problèmes). Mais lorsque vous avez affaire à un conteneur Docker pré-construit qui exécute un service via tomcat, ce n'est jamais aussi simple.

## Comment cela fonctionne

Nous avons décidé que, compte tenu du problème CORS ci-dessus, le moyen le plus simple de résoudre le problème était d'ajouter un serveur proxy nginx au conteneur Docker existant. De cette façon, vous pouvez tout faire fonctionner dans un seul conteneur et ne pas avoir à vous soucier du tout de CORS.

Nous n'avons apporté aucune modification à l'instance sous-jacente de la plate-forme Camunda pour que cela fonctionne. Cette instance est toujours accessible via le port 8080 du conteneur Docker.

Ce que nous avons fait, c'est d'ajouter le serveur swagger sur le port 8081 dans ce même conteneur Docker.

Et maintenant vous pensez "mais cela ne résout pas le problème CORS!" et vous avez raison, ce n'est pas le cas. Si vous accédez à l'instance swagger sur le port 8081 (si vous exportez ce port lorsque vous démarrez le conteneur Docker), vous obtiendrez le serveur swagger et verrez les API. Mais si vous essayez d'exécuter l'un de ces appels d'API, vous verrez rapidement l'impact de CORS. Vos appels API échoueront tous.

![Capture d'écran montrant le serveur API sur le port 8081](images/Screen%20Shot%202021-02-19%20at%2012.19.33%20PM.png)

Entrez nginx. Nginx est un très petit serveur Web super léger qui peut être configuré pour agir en tant que proxy. Je l'ai configuré pour écouter sur le port 8000 du conteneur Docker et pour les appels proxy basés sur l'URL. pointez votre navigateur sur http: // docker-container: 8000 / docs et nginx transférera cet appel vers le port 8081, où réside le serveur swagger. Pointez votre navigateur sur http: // docker-container: 8000 / camunda et vous serez redirigé vers le gestionnaire de tâches standard de la plate-forme Camunda, Cockpit, etc.

Vous devrez changer le port du serveur swagger au port 8000 à partir du port 8080:

![Capture d'écran montrant l'utilisation du port 8000](images/Screen%20Shot%202021-02-19%20at%2012.21.08%20PM.png)

## Appels d'API

Pourquoi tout cela est-il même nécessaire? Eh bien, si vous avez toujours voulu essayer des appels d'API sur un serveur en direct et obtenir des résultats réels, alors swagger est votre ami.

Swagger vous permet d'effectuer des appels d'API en direct sur une instance de serveur en cours d'exécution et d'obtenir de vrais résultats!

![capture d'écran de l'appel d'API en direct](images/Screen%20Shot%202021-02-19%20at%2012.21.36%20PM.png)

Bien sûr, vous pouvez écrire du code pour tester chaque appel d'API, mais si vous souhaitez réduire votre temps de développement, l'utilisation d'un serveur d'API en direct comme Swagger est certainement la voie à suivre.

Si vous voulez voir exactement ce qui est renvoyé en tant que charge utile d'un appel d'API donné, swagger est également votre ami:

![Résultats d'un appel d'API en direct](images/Screen%20Shot%202021-02-22%20at%2010.46.52%20AM.png)

Comme vous pouvez le voir, vous obtenez la commande `curl` complète que vous pouvez utiliser, les données renvoyées, que vous pouvez ensuite utiliser pour vous assurer que votre programme peut gérer correctement le message retourné, ainsi que les en-têtes de réponse complets.

## Comment pouvez-vous l'obtenir?

Encore une fois, pour répéter, cela ne fait actuellement*pas* partie de l'image officielle de Camunda Platform Docker. Cela arrivera avec la version 7.15, mais ce n'est pas le cas pour le moment.

Cela étant dit, vous pouvez toujours y accéder et l'utiliser.

Tout d'abord, vous devrez cloner le référentiel approprié qui est [ici](https://github.com/camunda-community-hub/docker-camunda-bpm-platform/tree/swagger). C'est un clone du dépôt officiel de Camunda Platform Docker, et une branche spéciale `swagger`.

```
% git clone https://github.com/camunda-community-hub/docker-camunda-bpm-platform/tree/swagger
```
devrait le faire pour vous.

Vous devrez maintenant intégrer cela dans une image Docker appropriée. Cela peut prendre un certain temps car tous les composants sont téléchargés.

```
% cd docker-camunda-bpm-platform
docker-camunda-bpm-platform % git status
On branch swagger
Your branch is up to date with 'camunda-community-hub/swagger'.

nothing to commit, working tree clean
% (base) davidgs@MacBook-Pro docker-camunda-bpm-platform % docker build . --rm -t camunda-bpm-plaform:swagger
Successfully built db270d32507f
Successfully tagged camunda-bpm-platform:swagger
%  docker-camunda-bpm-platform % Docker image list
REPOSITORY                     TAG       IMAGE ID       CREATED         SIZE
camunda-bpm-platform           swagger   db270d32507f   5 seconds ago   333MB
```
Donc c'est maintenant construit. Vous avez l'image prête à l'emploi. Il ne reste plus qu'à l'exécuter!

```
% docker run -p 8000:8000 db270d32507f
```

Cela devrait prendre environ 30 à 45 secondes pour tout démarrer, mais vous pouvez ensuite pointer votre navigateur vers [http: // localhost: 8000 / docs](http://localhost:8000/docs) pour le serveur swagger, ou [ http: // localhost: 8000 / camunda](http://localhost:8000/camunda) pour la plate-forme Camunda.

Vous pouvez utiliser Camunda Modeler pour déployer et exécuter des modèles en modifiant le port de déploiement de «8080» à «80000»

![Déploiement de Camunda Modeler](images/Screen%20Shot%202021-02-22%20at%2011.23.19%20AM.png)

Et vous avez terminé!
