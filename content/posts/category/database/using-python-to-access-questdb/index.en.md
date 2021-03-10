---
title: "Using Python to Access QuestDB"
Date: 2020-06-12
Author: davidgs
Category: Databases, DevRel
Tags: Database, Python, QuestDB
Slug: using-python-to-access-questdb
hero: images/Jupyter-notebook-Definitive-Guide_ul01sa.png.jpg
---

## Using Python to Access QuestDB

I'm going to keep this post really short, because almost all the *real* content is going to be in the tutorial itself. And this isn't it! 

## What Is This

What I've built is.n interactive tutorial to get you started with QuestDB using Python. It's very straightforward, and as long as you have Python 3.x installed, you should be almost ready to go. 

I say "almost" because you will need to install QuestDB locally in order to complete the tutorial. Probably the simplest, fastest way to do that is to just spin up the Docker instance of QuestDB:

```bash
docker pull questdb/questdb
```
And then:

```bash
docker create --name questdb -p 9000:9000 questdb/questdb
```

and finally:

```bash
docker start questdb
```

All of that is pulled from the "Getting Started" guide for our Docker instance which you can read [here](https://questdb.io/docs/guideDocker).

Once you have that running, head on over to GitHub and clone the [Tutorial](https://github.com/davidgs/QuestNotebook), which will guide you through setting up Jupyter Notebook and launching the Tutorial. 

I really hope it's that easy for you! 

## Say Thanks

If you found this tutorial useful, please be sure to give QuestDB a star on GitHub as well, and [follow them](https://twitter.com/intent/follow?screen_name=questdb) on twitter. If you're not already, also [follow me](https://twitter.com/intent/follow?screen_name=davidgsIoT)! 
