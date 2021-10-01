---
title: "El uso de Python para acceso QuestDB"
Date: 2020-06-12
Author: davidgs
Category: Databases, DevRel
Tags: Database, Python, QuestDB
Slug: using-python-to-access-questdb
hero: images/Jupyter-notebook-Definitive-Guide_ul01sa.png.jpg
reading_time: 2 minutes
---

## El uso de Python para acceso QuestDB

Voy a mantener este post muy corto, ya que casi toda la * real * contenido va a estar en el mismo tutorial. Y esto no lo es!

## Que es esto

Lo que yo he construido is.n tutorial interactivo para que pueda empezar con QuestDB usando Python. Es muy sencillo, y todo el tiempo que tiene Python 3.x instalado, debe ser casi listo para funcionar.

Digo "casi" porque necesitará para instalar QuestDB a nivel local con el fin de completar el tutorial. Probablemente el más simple, la forma más rápida de hacerlo es giro justo arriba de la instancia del estibador de QuestDB:

```bash
docker pull questdb/questdb
```
Y luego:

```bash
docker create --name questdb -p 9000:9000 questdb/questdb
```

y finalmente:

```bash
docker start questdb
```

Todo eso se tira de la guía "Getting Started" para nuestro ejemplo acoplable que se puede leer [aquí](https://questdb.io/docs/guideDocker).

Una vez que tenga que correr, la cabeza de más de GitHub y clonar el [Tutorial](https://github.com/davidgs/QuestNotebook), que le guiará a través de la creación de Jupyter portátil y el lanzamiento de la guía de aprendizaje.

Realmente espero que sea tan fácil para ti!

## Di gracias

Si has encontrado útil este tutorial, por favor asegúrese de dar QuestDB una estrella en GitHub, así, y [seguirlas](https://twitter.com/intent/follow?screen_name=questdb) en twitter. Si aún no se encuentra, también) en twitter. Si aún no se encuentra, también [sígame](https://twitter.com/intent/follow?screen_name=davidgsIoT)!
