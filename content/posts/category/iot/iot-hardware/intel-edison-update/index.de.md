---
title: "Intel Edison Update"
Date: 2016-01-06
Author: davidgs
Category: Gadgetry, IoT
Tags: Edison, IoT
Slug: intel-edison-update
hero: images/SparkFun_Edison_Boards-16.jpg
reading_time: 3 minutes
---

Ich brauche meinen [vorherigen Beitrag](/posts/category/iot/iot-hardwareintel-edison-big-hat-no-cattle/) über den Intel Edison zu ändern. Es stellt sich heraus, dass es nicht das Edison-Modul selbst sein kann, sondern die Intel Mini-Breakout Board, das fehlerhaft ist, wenn t zumindest der I2C Ausfall kommt. Ich habe immer noch über die SPI-Ausfälle zu sehen. Hier ist, warum ich zu diesem Ergebnis erreicht haben:

Ich bestellte einen Teil der [Sparkfun Blocks](https://www.sparkfun.com/products/13034) für Intel Edison © und ging mit ihnen zu fooling zurück. (Really ich war nicht ‚Täuschen‘ mit ihnen so viel wie für einen Kunden an einem Projekt arbeiten, wo Intel Edison eine gute Passform war.) Ich einige schöne Code aus) für Intel Edison © und ging mit ihnen zu fooling zurück. (Really ich war nicht ‚Täuschen‘ mit ihnen so viel wie für einen Kunden an einem Projekt arbeiten, wo Intel Edison eine gute Passform war.) Ich einige schöne Code aus [GitHub] heruntergeladen (https://github.com/jku/ LSM9DS0), die den I2C-Bus verwendbar mit den Sparkfun Blocks und voila gemacht! Ich hatte es funktioniert! Ich habe einige ziemlich große Änderungen an den ursprünglichen Code aus dem Original-Repository GitHub, so dass ich es gegabelt und haben wieder veröffentlicht es auf meinem eigenen [GitHub](https://github.com/jku/LSM9DS0), natürlich. Meistens, was hinzugefügt waren ich mehr Anlauf- und Ausgabeoptionen.

Ich bin jetzt in der Lage I2C Sensordaten zu lesen (ich bin mit dem [9DOF Sparkfun block](https://www.sparkfun.com/products/13033)) und bin jetzt die Veröffentlichung der Sensordaten an ... na ja, ich kann wählen, wo ich es senden! Ich kann es auf die Build-in)) und bin jetzt die Veröffentlichung der Sensordaten an ... na ja, ich kann wählen, wo ich es senden! Ich kann es auf die Build-in [Mosquito MQTT](http://mosquitto.org) Server oder an einem eingebetteten) Server oder an einem eingebetteten [MongoDB](https://www.mongodb.org) NoSQL-Datenbank oder an eine externe) NoSQL-Datenbank oder an eine externe [Couchbase senden ](http://www.couchbase.com) NoSQL-Datenbank, oder ich kann meine eigenen JSON Daten von ihm veröffentlichen. Ich kann sogar machen es möglich, sofort zu allen Quellen zu veröffentlichen, aber ich bin nicht sicher, dass alles, was nützlich, wirklich ist.

Ja, ich bin im Allgemeinen ein Java-Typ - daher die [Kaffeebohnen](/posts/beans/beans) - aber ich kehrte für diesen einen zu C. Es ist 30 Jahre her, dass ich keine ernsthaften C-Code geschrieben haben, aber es ist offensichtlich wie Fahrrad fahren, weil es gleich wieder kommt!

Bleiben Sie für den Rest der Geschichte zu diesem Projekt gestimmt, weil es besser und besser werden geht!
