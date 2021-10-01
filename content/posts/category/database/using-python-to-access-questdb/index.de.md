---
title: „Verwenden von Python für den Zugriff auf QuestDB“
Date: 2020-06-12
Author: davidgs
Category: Databases, DevRel
Tags: Database, Python, QuestDB
Slug: using-python-to-access-questdb
hero: images/Jupyter-notebook-Definitive-Guide_ul01sa.png.jpg
reading_time: 2 minutes
---

## Verwenden von Python für den Zugriff auf QuestDB

Ich werde diesen Beitrag halten wirklich kurz, weil fast alle * real * Inhalt im Tutorial sein wird selbst. Und das ist es nicht!

## Was ist das

Was ich is.n interaktives Tutorial aufgebaut haben Sie mit QuestDB mit Python zu beginnen. Es ist sehr einfach, und so lange, wie Sie Python installiert 3.x, sollten Sie fast bereit zu gehen.

Ich sage „fast“, weil Sie benötigen QuestDB lokal installieren, um das Tutorial zu vervollständigen. Wahrscheinlich ist die einfachste, schnellste Weg, dies zu tun ist, um nur Spin-up der Docker Instanz QuestDB:

```bash
docker pull questdb/questdb
```
Und dann:

```bash
docker create --name questdb -p 9000:9000 questdb/questdb
```

und schlussendlich:

```bash
docker start questdb
```

Alles das von den „Getting Started“ Leitfaden für unsere Docker Instanz gezogen wird, die Sie [hier] lesen können (https://questdb.io/docs/guideDocker).

Sobald Sie, dass Laufen, Kopf auf mehr als auf GitHub und Klon des [Tutorial](https://github.com/davidgs/QuestNotebook), die führt Sie durch Jupyter Notebook Einrichtung und das Tutorial zu starten.

Ich hoffe wirklich, es ist so einfach für Sie!

## Dank sagen

Wenn Sie diese Anleitung nützlich gefunden, stellen Sie sicher, QuestDB einen Stern auf GitHub als auch zu geben, und [folgen ihnen](https://twitter.com/intent/follow?screen_name=questdb) auf Twitter. Wenn Sie nicht bereits sind, auch) auf Twitter. Wenn Sie nicht bereits sind, auch [Follow-me](https://twitter.com/intent/follow?screen_name=davidgsIoT)!
