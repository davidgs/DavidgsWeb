---
title: "Het gebruik van Python Access QuestDB"
Date: 2020-06-12
Author: davidgs
Category: Databases, DevRel
Tags: Database, Python, QuestDB
Slug: using-python-to-access-questdb
hero: images/Jupyter-notebook-Definitive-Guide_ul01sa.png.jpg
---

## Met behulp van Python Access QuestDB

Ik ga naar dit bericht heel kort houden, want bijna alle*echte* inhoud gaat worden in de tutorial zelf. En dit is het niet!

## Wat is dit

Wat ik heb opgebouwd is.n interactieve handleiding om aan de slag te gaan met QuestDB met behulp van Python. Het is heel eenvoudig, en zolang je Python 3.x is geïnstalleerd, moet je bijna klaar om te gaan.

Ik zeg "bijna", omdat je nodig hebt om QuestDB lokaal te installeren om de tutorial te voltooien. Waarschijnlijk is de eenvoudigste en snelste manier om dat te doen is om gewoon draaien de Docker exemplaar van QuestDB:

```bash
docker pull questdb/questdb
```
En toen:

```bash
docker create --name questdb -p 9000:9000 questdb/questdb
```

en tenslotte:

```bash
docker start questdb
```

Dat alles wordt getrokken uit de "Getting Started" gids voor onze Docker bijvoorbeeld die u [hier] kan lezen (https://questdb.io/docs/guideDocker).

Zodra je dat hebt lopen, hoofd op over aan GitHub en kloon de [Tutorial](https://github.com/davidgs/QuestNotebook), die leidt u door het opzetten van Jupyter Notebook en de lancering van de Tutorial.

Ik hoop echt dat het zo makkelijk voor u!

## Zeg bedankt

Als je vond deze tutorial nuttig is, moet u ervoor zorgen QuestDB een ster te geven op GitHub als goed, en [hen volgen] (https://twitter.com/intent/follow?screen_name=questdb) op twitter. Als u nog niet bent, ook [volg mij] (https://twitter.com/intent/follow?screen_name=davidgsIoT)!
