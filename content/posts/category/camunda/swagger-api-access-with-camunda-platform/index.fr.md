---
title: « Accès API Swagger avec Camunda plate-forme »
Date: 2021-03-10
Author: davidgs
Category: Camunda, BPMN, DevRel
Slug: swagger-api-access-with-camunda-platform
hero: images/mimi-thian-VEKWzpQu-5M-unsplash-2.jpg
---

Avez-vous déjà tiré la plate-forme par exemple Camunda Docker et a souhaité que vous pourriez faire en direct-appels à l'API via un [serveur fanfaronnades](https://swagger.io)? Nous avons! Et comme la plupart des choses que nous souhaitons que nous pourrions faire, nous sortons et pour y arriver.

## Bientôt disponible

Pour être clair, cette intégration vient au conteneur officiel Camunda Platform Docker avec la version 7.15. Il est tout simplement pas encore prêt. Donc, ce qui est vraiment plus d'une solution provisoire plutôt que le tout soit-et en fin de solution, mais cela fonctionne, et il facilite l'envoi des appels API à une instance en direct de la plate-forme Camunda un lot * * plus facile. Alors suivez le long et nous allons vous montrer comment exécuter vous-même.

## CORS est votre ami, et pas votre ami

En général, et sur Internet régulière, Croix origine de partage des ressources (CORS) vous permet de rester en sécurité en ne chargement des ressources provenant de sources aléatoires, non fiables. Ceci est généralement une bonne chose. Jusqu'à ce n'est pas.

Quand est-ce pas? Lorsque vous voulez faire quelque chose comme faire des appels API d'un hôte à un autre lorsque les 2 hôtes ne disposent pas d'un contrat de fiducie explicite. Comme entre 2 conteneurs Docker. Ou entre votre ordinateur portable et un conteneur Docker.

Oui, vous pouvez aller et mettre un en-tête dans le serveur HTTP tels que `Access-Control-Allow-origine: *` et qui va résoudre le problème (tout en créant une foule d'autres problèmes). Mais quand vous avez affaire à un conteneur Docker pré-construit qui exécute un service via tomcat, il est jamais tout à fait aussi simple que cela.

## Comment cela fonctionne

Nous avons décidé que, compte tenu de la question de CORS ci-dessus, la façon la plus simple d'aborder la chose était d'ajouter un serveur proxy nginx au conteneur Docker existant. De cette façon, vous pouvez tout fonctionne dans un conteneur, et ne pas avoir à se soucier CORS du tout.

Nous avons apporté aucune modification à l'instance Camunda plateforme sous-jacente pour faire ce travail. Cette instance est toujours accessible via le port du conteneur Docker 8080.

Ce que nous avons fait était ajouter le serveur fanfaronnades sur le port 8081 dans ce même conteneur Docker.

Et maintenant, vous pensez «mais cela ne résout pas le problème de CORS! » et vous avez raison, il ne fonctionne pas. Si vous allez à l'instance de fanfaronnades sur le port 8081 (si vous exportez ce port lorsque vous démarrez le conteneur Docker) vous obtiendrez le serveur fanfaronnades et voir les API. Mais si vous essayez d'exécuter l'un de ces appels d'API, vous verrez rapidement l'impact de la SCRO. Vos appels API échouent tous.

![Capture d'écran montrant le serveur API sur le port 8081](images/Screen%20Shot%202021-02-19%20at%2012.19.33%20PM.png)

Entrez nginx. Nginx est un serveur web très petit, super léger qui peut être configuré pour agir en tant que proxy. Je l'ai mis à l'écoute sur le port 8000 du conteneur Docker et aux appels proxy basé sur l'URL. pointez votre navigateur à l'adresse http: // docker-conteneur: 8000 / docs et nginx transmettra cet appel au port 8081, où la vie du serveur fanfaronnades. Pointez votre navigateur sur http: // docker-conteneur: 8000 / camunda et vous serez redirigé vers la norme Camunda plate-forme Gestionnaire des tâches, Cockpit, etc.

Vous devrez changer le port du serveur fanfaronnades au port 8000 du port 8080:

![Capture d'écran montrant en utilisant le port 8000](images/Screen%20Shot%202021-02-19%20at%2012.21.08%20PM.png)

## Faire des appels API

Pourquoi tout cela est encore nécessaire? Eh bien, si vous avez toujours voulu essayer des appels API, à un serveur en direct, et obtenir des résultats réels, puis fanfaronnades est votre ami.

Swagger vous permet de faire des appels API en direct sur une instance de serveur en cours d'exécution, et obtenir des résultats réels de retour!

![capture d'écran d'appel API en direct](images/Screen%20Shot%202021-02-19%20at%2012.21.36%20PM.png)

Bien sûr, vous pouvez écrire du code pour tester chaque appel API, mais si vous souhaitez réduire votre temps de développement, en utilisant un serveur API en direct comme fanfaronnades est certainement le chemin à parcourir.

Si vous voulez voir exactement ce qui est retourné comme une charge utile d'un appel API donné, Swagger est aussi votre ami:

![Les résultats d'un appel d'API en direct](images/Screen%20Shot%202021-02-22%20at%2010.46.52%20AM.png)

Comme vous pouvez le voir, vous obtenez la commande `curl` complète, vous pouvez utiliser, les données renvoyées, que vous pouvez ensuite utiliser pour vous assurer que votre programme peut gérer correctement le message de retour, ainsi que les en-têtes de réponse complète.

## Comment pouvez-vous obtenir?

Encore une fois, je le répète, cela est actuellement * pas * partie de l'image officielle Camunda Plate-forme Docker. Il va venir avec la sortie de 7,15, mais pas en ce moment.

Cela étant dit, vous pouvez toujours y avoir accès et l'utiliser.

Tout d'abord, vous devez cloner le dépôt approprié qui est [ici](https://github.com/camunda-community-hub/docker-camunda-bpm-platform/tree/swagger). C'est un clone du dépôt officiel Camunda Platform Docker, et une branche `swagger` de spécial.

```
% git clone https://github.com/camunda-community-hub/docker-camunda-bpm-platform/tree/swagger
```
devrait le faire pour vous.

Maintenant, vous devrez construire que dans une image Docker appropriée. Cela peut prendre un certain temps sont téléchargés tous les composants.

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
Ainsi, il est maintenant construit. Vous avez l'image prête à aller. Tout ce qui reste est de l'exécuter!

```
% docker run -p 8000:8000 db270d32507f
```

Il devrait prendre environ 30-45 secondes pour démarrer tout, mais vous pouvez alors pointer votre navigateur sur [http: // localhost: 8000 / docs](http://localhost:8000/docs) pour le serveur fanfaronnades, ou) pour le serveur fanfaronnades, ou [ http: // localhost: 8000 / camunda](http://localhost:8000/camunda) pour la plate-forme camunda.

Vous pouvez utiliser Camunda Modeler pour déployer et exécuter des modèles en changeant le port de déploiement de `` 8080` à 80000`

![déploiement Camunda Modeler](images/Screen%20Shot%202021-02-22%20at%2011.23.19%20AM.png)

Et vous avez terminé!
