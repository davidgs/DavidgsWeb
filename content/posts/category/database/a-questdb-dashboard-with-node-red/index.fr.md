---
title: "Un tableau de bord QuestDB avec Node-Red"
Date: 2020-06-09
Author: davidgs
Category: database, Gadgetry, IoT
Tags: Dashboard, Database, IoT, Node-Red, QuestDB
Slug: a-questdb-dashboard-with-node-red
hero: images/Screen-Shot-2020-06-09-at-7.39.13-AM.png
---

C'est vraiment un suivi de mon [post](/posts/category/database/iot-on-questdb/) de la semaine dernière où j'ai connecté un Arduino avec un capteur de température et d'humidité à QuestDB.

C'est une chose d'envoyer des données à votre base de données, mais être capable de visualiser ces données est la prochaine étape logique. Alors, plongeons-nous directement dans ce domaine.

QuestDB est plutôt nouveau et nous n'avons donc pas encore terminé notre plugin Grafana Data Source.Je voulais donc créer un tableau de bord rapide pour afficher les données de température / humidité entrantes (et vous verrez à quel point le capteur est horrible). Pour ce faire, j'ai choisi Node-Red car, eh bien, cela me semble le choix évident!

## Construction des nœuds:

![Capture d'écran du processus NodeRed](/posts/category/database/images/Screen-Shot-2020-06-09-at-7.38.57-AM.png)

Comme vous pouvez le voir, il n'utilise que quelques nœuds, je vais donc les parcourir un par un.

Le nœud initial est un nœud d'injecteur qui se déclenche à un intervalle régulier et configurable. La mine se déclenche toutes les 10 secondes juste pour éviter d'être trop bruyante. Il déclenche le nœud `SetQuery` qui construit la requête:

```js
  var q = {}
  q["query"] = "select temp_c, humidity, timestamp from iot where timestamp > (systimestamp() - 5000000)"
  msg.payload = q
  return msg;
```

J'ai défini la charge utile sur une requête, dans ce cas, j'obtiens la température et l'humidité des 5 dernières secondes (rappelez-vous, nous avons affaire à des horodatages en microsecondes, donc 5 secondes correspondent à 5 millions de microsecondes). J'envoie ensuite cette requête, en tant que charge utile, à un nœud de requête http que j'ai appelé Query QuestDB. J'ai défini l'hôte comme étant ma machine locale, l'URL du point de terminaison de l'API de requête et j'ajoute le msg.payload entrant à l'URL.

![Modification des paramètres HTTP de Node Red](/posts/category/database/images/Screen-Shot-2020-06-09-at-7.51.26-AM.png "Screen Shot 2020-06-09 at 7.51.26 AM.png")

La requête renvoie une chaîne JSON, je vais donc devoir l'exécuter via un nœud JSON pour la transformer en objet JSON. J'envoie ensuite le résultat de cette analyse JSON à 2 nœuds supplémentaires, un pour la température et un pour l'humidité. Après l'analyse JSON, je récupère un objet contenant plusieurs éléments que je veux parcourir.

![Capture d'écran de l'objet JSON renvoyé](/posts/category/database/images/Screen-Shot-2020-06-09-at-7.57.42-AM.png)

La première chose à noter est que la charge utile contient un champ `query` qui montre la requête que j'ai exécutée. Frais! Ensuite, j'obtiens un champ `colonnes` qui est un tableau avec une entrée pour chaque colonne si les données que je récupère. Depuis que j'ai demandé «temp_c», «humidité» et «horodatage», je m'attendrais à ce que ce tableau contienne 3 éléments, et c'est effectivement le cas. Il m'indique également, dans chaque élément, le nom et le type de valeur qu'il a renvoyé, ce qui est une information utile.

Enfin, il y a un champ `dataset` qui contient un tableau de tableaux avec mes données que j'ai demandées. Depuis que j'ai demandé 5 secondes de données et, si vous vous souvenez du [post précédent](/posts/category/database/iot-on-questdb/), j'envoyais des données une fois par seconde, je récupère un tableau avec 5 tableaux dedans, un pour chaque seconde. En développant ces tableaux, je vois que j'ai obtenu 2 doubles et un horodatage dans chacun d'eux correspondant à ce que le champ `colonnes` m'a dit que j'obtiendrais. Agréable! Il ne reste donc plus qu'à envoyer ces données à certains éléments du tableau de bord. Enfin, presque.

```js
  var f = {}
  f.topic = "Temperature ºC"
  f.payload = msg.payload.dataset[msg.payload.dataset.length-1][0]
  f.timestamp = msg.payload.dataset[msg.payload.dataset.length-1][2]
  return f
```

Pour le nœud `Set Temp`, je tire le dernier élément de l'ensemble de données et saisis la valeur de température et la valeur d'horodatage. Je les envoie ensuite, en tant que charge utile, aux éléments réels du tableau de bord. Je fais exactement la même chose pour le nœud «Set Humidity». En faisant glisser les nœuds du tableau de bord, Node-Red configure automatiquement un tableau de bord Web avec ces éléments, et je peux y accéder et voir mon nouveau tableau de bord:

![Capture d'écran du tableau de bord Node Red](/posts/category/database/images/Screen-Shot-2020-06-09-at-7.39.13-AM.png)


Maintenant que vous pouvez réellement visualiser les données, vous pouvez voir à quel point les données sont vraiment horribles! Il n'y a aucun moyen qu'il fasse 2,3 ° C dans mon bureau en ce moment! Je suppose que ma prochaine tâche est de configurer un **vrai** capteur de température et d'humidité pour envoyer des données plus précises! Heureusement pour moi, j'en ai quelques-uns qui traînent, donc ce sera mon prochain projet, je suppose.

## Nous avons terminé ici

Comme toujours, visitez notre [GitHub](https://github.com/questdb/questdb) et donnez-nous une étoile si vous pensez que cela a été utile! Vous pouvez [me suivre] (https://twitter.com/intent/follow?screen_name=davidgsIoT) sur Twitter, mais aussi suivre [QuestDB] (https://twitter.com/intent/follow?screen_name=questdb)!
