---
title: « Utilisation de Python pour accéder QuestDB »
Date: 2020-06-12
Author: davidgs
Category: Databases, DevRel
Tags: Database, Python, QuestDB
Slug: using-python-to-access-questdb
hero: images/Jupyter-notebook-Definitive-Guide_ul01sa.png.jpg
reading_time: 2 minutes
---

## En utilisant Python pour accéder QuestDB

Je vais garder ce poste très court, parce que presque tout le * réel * contenu va être dans le tutoriel lui-même. Et ce ne l'est pas!

## Qu'est-ce que c'est

Ce que j'ai construit is.n tutoriel interactif pour vous familiariser avec QuestDB en utilisant Python. Il est très simple, et aussi longtemps que vous avez Python 3.x installé, vous devriez être presque prêt à aller.

Je dis « presque » parce que vous aurez besoin d'installer QuestDB localement afin de compléter le tutoriel. Probablement la plus simple, la plus rapide façon de le faire est de faire tourner juste l'exemple de Docker QuestDB:

```bash
docker pull questdb/questdb
```
Puis:

```bash
docker create --name questdb -p 9000:9000 questdb/questdb
```

et enfin:

```bash
docker start questdb
```

Tout cela est tiré de la « Mise en route » guide pour notre exemple Docker que vous pouvez lire [ici](https://questdb.io/docs/guideDocker).

Une fois que vous avez cette course, tête vers GitHub et clone le [Tutorial](https://github.com/davidgs/QuestNotebook), qui vous guidera à travers la mise en place et le lancement Notebook Jupyter le didacticiel.

Je l'espère vraiment que c'est facile pour vous!

## Dis merci

Si vous avez trouvé ce tutoriel utile, s'il vous plaît assurez-vous de donner QuestDB une étoile sur GitHub aussi bien, et [les suivre](https://twitter.com/intent/follow?screen_name=questdb) sur Twitter. Si vous n'êtes pas déjà, aussi) sur Twitter. Si vous n'êtes pas déjà, aussi [me suivre](https://twitter.com/intent/follow?screen_name=davidgsIoT)!
