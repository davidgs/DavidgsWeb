---
title: "Mynewt iOS et Mac Apps"
Date: 2016-12-16
Author: davidgs
Category: IoT, Misc, Work
Tags: IoT, mynewt
Slug: mynewt-ios-mac-apps
hero: images/logo.png
---

J'ai fait beaucoup de travail sur le [Mynewt OS](https://mynewt.apache.org) Projet sur le) Projet sur le [Apache](http://apache.org) Software Foundation. Il est encore « l'incubation » il est donc pas un projet Apache à part entière, mais nous faisons des progrès énormes et il vient bien le long. En fait, nous sommes en train de libérer nos premières versions bêta de la version 1.0! Si vous êtes un hacker IdO, et êtes à la recherche d'un petit, rapide, hautement configurable (et open source!) RTOS, MyNewt ce billet!

Tout cela étant dit, l'une des choses que je travaille sur - autres que la documentation - sont des démos. Les API Sensor sont un travail en cours, mais les progrès ont été assez importantes. Tant et si bien que je suis en mesure de construire une démo attacher un capteur analogique à un dispositif Mynewt alimenté et commencer à envoyer les valeurs du capteur via Bluetooth!

La configuration de base est un conseil Kit Nordic Developer Semi NRF52dk, un niveau de liquide capteur éTAPE, et un cylindre rempli d'eau. Le capteur va dans l'eau, la carte nrf52 lit le capteur et envoie les valeurs du capteur out. Je vais écrire un message séparé sur la configuration de nrf52 réelle, etc. peu de temps, mais je voulais écrire un peu sur la façon dont je dois être capable de lire les valeurs. TL; DR: J'ai écrit un Mac OS X et une application iOS pour le faire!

L'un des problèmes avec l'envoi de données via Bluetooth est que, lors de l'envoi des données est facile, laissant le périphérique savoir ce ** type ** du capteur, il est a tendance à être un peu plus problématique. J'ai résolu ce problème en définissant ** deux ** Bluetooth UUID caractéristique pour chaque capteur. La première, que j'appelle la « Configuration UUID » est un UUID 16 bits (Je sais que oui, je devrais utiliser UUID 128 bits, mais c'est une douleur) qui porte simplement une chaîne ASCII décrivant le capteur. Le second est un UUID apparié que j'appelle les « données UUID » et qui est une caractéristique NOTIFY qui transportera les données réelles. Je les appelle les « UUID paires » et je les ai définis en donnant la configuration UUID un préfixe de « 0xDE » et les données UUID un préfixe de « 0xBE » Je les appairer en leur donnant à la fois le même « suffixe » si 0xDEAD et 0xBEAD sont jumelés par le suffixe « AD » de commun.

Voici ce qui ressemble à l'application réelle:

{{>Youtube vq3FEoaIc9I>}}

Vous pouvez modifier le Prefixes dans l'App, ou tout simplement souscrire à toutes les caractéristiques NOTIFY trouvés dans la caractéristique de service défini. Vous pouvez cliquer sur le graphique du signal RSSI pour ajouter la valeur RSSI brute à la table, ou cliquez à nouveau pour le supprimer.

Et la même application - bien, la plupart du temps même, il partage beaucoup de code! - fonctionne aussi sur iOS

{{>Youtube tWS7u7ColX4>}}

Je pense qu'ils sont assez cool!
