---
title: « Just Comment est rapide plus rapide? »
Date: 2017-03-06
Author: davidgs
Category: General, IoT
Tags: ARTIK, ARTIK-520, Benchmark, Embedded Systems, IoT, Java
Slug: just-how-fast-is-faster
hero: images/Azul.jpg
---

Après avoir installé et essayé le [zoulou machine virtuelle Java intégrée](https://www.azul.com/products/zulu-embedded/) sur mon ARTIK-520) sur mon ARTIK-520 [ce matin](posts/category/general/making-artik-5-iot-gateway-kura) j'ai remarqué qu'il sentait ** ** plus rapide. Il semblait ** ** plus rapide. Mais était-ce vraiment plus rapide? Et si oui, combien plus vite? Je suis donc allé chercher certains tests de référence Java pour exécuter.

J'ai choisi (http://www.dacapobench.org) [référence DaCapo] pour cela. Pourquoi? Parce que Google, voilà pourquoi. Voici ce que l'indice de référence DaCapo dit sur lui-même *:

> Cette suite de référence est conçu comme un outil pour Java analyse comparative par le langage de programmation, gestion de la mémoire et les communautés d'architecture informatique. Il se compose d'un ensemble de * * open source, applications du monde réel avec des charges de mémoire non triviales. La première version de la suite était le point culminant de plus de cinq années de travail à huit institutions, dans le cadre du projet de recherche DaCapo (http://www.dacapo-group.org/), qui a été financé par la National Science Foundation ITR Grant , CCR-0085792. Trois années de développement ont été consacrés à la version 2009. Ce travail a été financé par l'ANU, le Conseil australien de la recherche et un don généreux d'Intel.

Travaille pour moi. Ma mère était un expert de référence de renommée mondiale depuis des décennies. Je ne suis pas. Voilà donc ce que j'ai choisi. Y at-il de meilleures suites de référence là-bas? Probablement. Est-ce que j'en ai quelque chose à faire? Pas tellement.

Voici les tests de référence de spécifiques inclus dans cette suite. Vous remarquerez que tous d'entre eux sont représentés ci-dessous. Alors que tous achevés avec succès sur le Mac, je n'ai inclus ceux qui ont réussi avec succès sur au moins l'un des JVMs embarqués.

La suite de référence DaCapo-9,12-bach, sorti en 2009, se compose des indices de référence suivants:

- Avrora
- batik
- éclipse
- FOP
- h2
- Jython
- luindex
- lusearch
- PMD
- sunflow
- tomcat
- tradebeans
- tradesoap
- points

| | |
| --- | --- |
| Avrora | Simule un certain nombre de programmes exécutés sur un réseau de micro-contrôleurs AVR |
| batik | produit un certain nombre d'images Scalable Vector Graphics (SVG de) sur la base des tests unitaires dans Apache Batik |
| eclipse | exécute une partie de la (non IUG) des tests de performance JDT pour l'IDE Eclipse |
| FOP | prend un fichier XSL-FO, parse et le formate, la génération d'un fichier PDF. |
| h2 | exécute un JDBCbench comme référence en mémoire, l'exécution d'un certain nombre d'opérations contre un modèle d'une application bancaire, en remplacement de l'indice de référence hsqldb |
| Jython | inteprets a la référence pybench Python |
| luindex | Utilise Lucene index un ensemble de documents; les œuvres de Shakespeare et la Bible King James |
| lusearch | Les utilisations Lucene de faire une recherche de texte de mots-clés sur un corpus de données comprenant les œuvres de Shakespeare et la Bible King James |
| PMD | analyse un ensemble de classes Java pour une série de problèmes de code source |
| sunflow | rend un ensemble d'images à l'aide de ray tracing |
| tomcat | gère un ensemble de requêtes sur un serveur Tomcat récupération et vérification des pages Web résultant |
| tradebeans | exécute la référence DayTrader via un Beans Jave à un back-end GERONIMO avec en mémoire h2 comme la base de données sous-jacente |
| tradesoap | exécute la référence DayTrader via un SOAP à un back-end GERONIMO avec en mémoire h2 comme la base de données sous-jacente |
| xalan | transforme les documents XML en HTML |


Alors, voici ce que j'ai trouvé.

Oui, la machine virtuelle Java Zulu est plus rapide. Et ce n'est pas juste un peu plus vite. Il est un ** LOT ** plus rapide. Je veux dire beaucoup. Tant et si bien que j'ai décidé d'exécuter la même suite de benchmarks sur mon MacBook Pro juste pour des grimaces. Devinez quoi? Dans l'un des essais, Zulu a battu la machine virtuelle Java sur mon Mac. Whisky. Tango. Fox-trot. Mais oui, les chiffres ne mentent pas.

| ** Test ** | ** OpenJDK ** | ** Zulu ** | ** Mac OS X ** |
| -------- | ----------- | -------- | ------------ |
| ** Avrora ** | 588 264 | 44963 | 6137 |
| ** ** points | 438577 | 41963 | 50066 |
| ** tradesoap ** | FAIL | 247835 | 51650 |
| ** tradebeans ** | FAIL | 85343 | 13105 |
| ** sunflow ** | 218045 | 69992 | 5405 |
| ** PMD ** | 135382 | 24268 | 4333 |
| ** lusearch ** | 459989 | 39134 | 5035 |
| ** luindex ** | 230904 | 11399 | 2305 |
| ** FOP ** | [103144 | 15233 | 3852 |
| ** Jython ** | 1204207 | 59300 | 4150 |



Alors bat Zulu Mac sur l'indice de référence xalan. Étonnant. Et OpenJDK pour ARMv7 est vraiment genre de merde. Sur les tests, il a été en mesure de le compléter arrive loin, loin ** ** derrière la machine virtuelle Java Zulu. Les échecs des tests de tradesoap et tradebeans étaient outOfMemeoryException échecs, de sorte que la machine virtuelle Java Zulu est non seulement plus rapide, mais il est beaucoup plus efficace mémoire. Et sur un système embarqué, une machine virtuelle Java efficace mémoire est ce que vous voulez vraiment, non?

Voici ce que ces résultats ressemblent sous forme joli tableau:

![Numbers002](/posts/category/general/images/Numbers002.jpg "Numbers002.jpg")

Ridicule, non? Oui, les numéros Mac sont si petits qu'ils ne sont presque presque partout à cette échelle, mais les chiffres sont assez impressionnants zoulous par rapport aux chiffres de OpenJDK.

Ainsi, non seulement la machine virtuelle Java Zulu ** ** sensation plus rapide, il est en fait ** ** plus rapide. Et par un LOT ** **. Je dirais que si vous avez l'intention de déployer quelque chose sur le ARTIK-520, et il est écrit en Java, et vous voulez qu'il fasse bien, vous seriez bien servi à débourser de l'argent pour la machine virtuelle Java Zulu. Vous serez beaucoup plus heureux.


* Blackburn, SM, Garner, R., Hoffman, C., Khan, AM, McKinley, KS, Bentzur, R., Diwan, A., Feinberg, D., Frampton, D., Guyer, SZ, Hirzel, M ., Hosking, A., Sauter, M., Lee, H., Moss, JEB, Phansalkar, A., Stefanovic, D., VanDrunen, T., von Dincklage, D., et Wiedermann, B. ** Le DaCapo Repères: Java Benchmarking développement et analyse **, * OOPSLA '06: Actes de la 21e conférence annuelle de ACM SIGPLAN sur orienté objet, systèmes, programmation Langues et applications *, (Portland, OR, États-Unis, 22-26 octobre, 2006) ([pdf](http://portal.acm.org/citation.cfm?doid=1167473.1167488),), [BibTeX](http://www.dacapobench.org/cite.html)).

