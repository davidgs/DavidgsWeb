---
title: « Un tableau de bord QuestDB avec nœud rouge »
Date: 2020-06-09
Author: davidgs
Category: database, Gadgetry, IoT
Tags: Dashboard, Database, IoT, Node-Red, QuestDB
Slug: a-questdb-dashboard-with-node-red
hero: images/Screen-Shot-2020-06-09-at-7.39.13-AM.png
---

Ceci est vraiment une suite à mon [post](/posts/category/database/iot-on-questdb/) de la semaine dernière où je connecté un Arduino avec une température et capteur d'humidité à QuestDB.

Il est une chose pour envoyer des données à votre base de données, mais être capable de visualiser ces données est la prochaine étape logique. Alors nous allons droit de plongée pour le faire.

QuestDB est assez nouveau, et donc nous n'avons pas terminé notre Grafana Source de données Plugin, donc je voulais faire un tableau de bord rapide pour afficher les données entrantes température / humidité (et vous verrez à quel point terrible le capteur est vraiment). Pour ce faire, j'ai choisi nœud rouge parce que, eh bien, il semble que le choix évident!

## Construire les nœuds:

![Capture d'écran du processus NodeRed](/posts/category/database/images/Screen-Shot-2020-06-09-at-7.38.57-AM.png)

Comme vous pouvez le voir, il utilise seulement quelques nœuds, donc je vais marcher à travers eux un par un.

Le nœud est un nœud initial d'injecteur qui se déclenche à un intervalle régulier, configurable. Mine les incendies toutes les 10 secondes juste pour éviter d'être trop bruyant. Il déclenche le nœud `de SetQuery` qui construit la requête:

```js
  var q = {}
  q["query"] = "select temp_c, humidity, timestamp from iot where timestamp > (systimestamp() - 5000000)"
  msg.payload = q
  return msg;
```

Je mis la charge utile à une requête, dans ce cas, je reçois la température et l'humidité pendant les 5 dernières secondes (rappelez-vous, nous avons affaire à microsecondes horodatages, donc 5 secondes est de 5 m microsecondes). J'envoie ensuite cette requête, comme la charge utile, à un nœud de requête HTTP que j'ai appelé la requête QuestDB. Je me suis fixé l'hôte d'être ma machine locale, l'URL du point de terminaison API de requête, et je joins le msg.payload entrant à l'URL.

![Modification des paramètres HTTP du noeud rouge](/posts/category/database/images/Screen-Shot-2020-06-09-at-7.51.26-AM.png "Screen Shot 2020-06-09 at 7.51.26 AM.png")

Les rendements de la requête aa chaîne JSON, donc je vais avoir besoin de l'exécuter par un nœud JSON pour la transformer en un objet JSON. J'envoie ensuite le résultat de cette JSON-analyse syntaxique 2 noeuds supplémentaires, une pour la température et un pour l'humidité. Après la JSON Parsing, je reçois un retour d'objet qui a plusieurs choses dans ce que je veux aller jusqu'au bout.

![Capture d'écran de l'objet JSON retourné](/posts/category/database/images/Screen-Shot-2020-06-09-at-7.57.42-AM.png)

La première chose à noter est que la charge utile contient un champ `query` qui montre la I requête exécutée. Frais! Ensuite, je reçois un champ `columns` qui est un tableau avec une entrée pour chaque colonne si les données je reviens. Depuis que j'interrogé pour `temp_c`,` `humidity` et timestamp` je me attends à ce tableau d'avoir 3 éléments, et cela se fait. Il dit aussi moi, dans chaque élément, le nom et le type de valeur, il est de retour qui est des informations utiles.

Enfin, il y a un champ `dataset` qui contient un tableau de tableaux avec mes données que j'ai demandé. Depuis j'ai demandé 5 secondes de données, et, si vous vous souvenez de la [post précédent](/posts/category/database/iot-on-questdb/), j'envoyais des données une fois par seconde, je reviens un tableau avec 5 tableaux en elle, une pour chaque seconde. En élargissant ces tableaux, je vois que j'ai eu 2 doubles et un horodatage dans chacun correspondant à ce que le champ `columns` m'a dit que je recevrais. Joli! Donc, tout ce qui reste est d'envoyer ces données à certains éléments du tableau de bord. Eh bien, presque.

```js
  var f = {}
  f.topic = "Temperature ºC"
  f.payload = msg.payload.dataset[msg.payload.dataset.length-1][0]
  f.timestamp = msg.payload.dataset[msg.payload.dataset.length-1][2]
  return f
```

Pour le nœud `Set Temp`, je tire le dernier élément de l'ensemble de données, et de saisir la valeur de la température et la valeur d'horodatage. J'envoie alors ceux, comme la charge utile, aux éléments du tableau de bord réels. Je fais exactement la même chose pour le `Set Humidity` nœud. En faisant glisser dans les nœuds du tableau de bord, nœud rouge définit automatiquement un tableau de bord Web avec ces éléments, et je peux aller et voir mon nouveau tableau de bord:

![Capture d'écran du tableau de bord nœud rouge](/posts/category/database/images/Screen-Shot-2020-06-09-at-7.39.13-AM.png)


Maintenant que vous pouvez réellement visualiser les données, vous pouvez voir comment les données est vraiment terrible! Il n'y a aucun moyen il est 2.3º C dans mon bureau en ce moment! Je suppose que ma prochaine tâche est d'obtenir une température réelle ** ** et capteur d'humidité mis en place pour envoyer des données plus précises! Heureusement pour moi, j'ai un peu de ceux qui traînent, de sorte que devront être mon prochain projet, je suppose.

## Nous sommes ici fait

Comme toujours, s'il vous plaît visitez notre [GitHub](https://github.com/questdb/questdb) et nous donner une étoile si vous pensez que cela a été utile! Vous pouvez) et nous donner une étoile si vous pensez que cela a été utile! Vous pouvez [me suivre](https://twitter.com/intent/follow?screen_name=davidgsIoT) sur Twitter, mais aussi suivre) sur Twitter, mais aussi suivre [QuestDB](https://twitter.com/intent/follow?screen_name=questdb)!
