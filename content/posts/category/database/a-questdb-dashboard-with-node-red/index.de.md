---
title: "Ein QuestDB-Dashboard mit Node-Red"
Date: 2020-06-09
Author: davidgs
Category: database, Gadgetry, IoT
Tags: Dashboard, Database, IoT, Node-Red, QuestDB
Slug: a-questdb-dashboard-with-node-red
hero: images/Screen-Shot-2020-06-09-at-7.39.13-AM.png
---

Dies ist wirklich eine Fortsetzung meines [Beitrags](/posts/category/database/iot-on-questdb/) aus der letzten Woche, in dem ich einen Arduino mit einem Temperatur- und Feuchtigkeitssensor an QuestDB angeschlossen habe.

Es ist eine Sache, Daten an Ihre Datenbank zu senden, aber die Möglichkeit, diese Daten zu visualisieren, ist der nächste logische Schritt. Lassen Sie uns gleich darauf eingehen.

QuestDB ist ziemlich neu und daher haben wir unser Grafana-Datenquellen-Plugin noch nicht fertiggestellt. Daher wollte ich ein schnelles Dashboard erstellen, um die eingehenden Temperatur- / Feuchtigkeitsdaten anzuzeigen (und Sie werden sehen, wie schrecklich der Sensor wirklich ist). Um dies zu tun, habe ich mich für Node-Red entschieden, weil es die naheliegende Wahl zu sein scheint!

## Aufbau der Knoten:

![Screenshot von NodeRed Process](/posts/category/database/images/Screen-Shot-2020-06-09-at-7.38.57-AM.png)

Wie Sie sehen können, werden nur wenige Knoten verwendet, sodass ich sie einzeln durchgehen werde.

Der Anfangsknoten ist ein Injektorknoten, der in regelmäßigen, konfigurierbaren Intervallen ausgelöst wird. Meins feuert alle 10 Sekunden, um nicht zu laut zu werden. Es löst den SetQuery-Knoten aus, der die Abfrage erstellt:

```js
  var q = {}
  q["query"] = "select temp_c, humidity, timestamp from iot where timestamp > (systimestamp() - 5000000)"
  msg.payload = q
  return msg;
```

Ich habe die Nutzlast auf eine Abfrage gesetzt. In diesem Fall erhalte ich die Temperatur und die Luftfeuchtigkeit für die letzten 5 Sekunden (denken Sie daran, wir haben es mit Mikrosekunden-Zeitstempeln zu tun, also sind 5 Sekunden 5 Millionen Mikrosekunden). Ich sende diese Abfrage dann als Nutzlast an einen http-Anforderungsknoten, den ich Query QuestDB genannt habe. Ich habe den Host als meinen lokalen Computer festgelegt, die URL zum Abfrage-API-Endpunkt, und ich hänge die eingehende msg.payload an die URL an.

![Bearbeiten der HTTP-Parameter von Node Red](/posts/category/database/images/Screen-Shot-2020-06-09-at-7.51.26-AM.png "Screen Shot 2020-06-09 at 7.51.26 AM.png")

Die Abfrage gibt eine JSON-Zeichenfolge zurück, daher muss sie über einen JSON-Knoten ausgeführt werden, um sie in ein JSON-Objekt umzuwandeln. Ich sende dann das Ergebnis dieser JSON-Analyse an zwei zusätzliche Knoten, einen für die Temperatur und einen für die Luftfeuchtigkeit. Nach dem JSON-Parsing erhalte ich ein Objekt zurück, das mehrere Dinge enthält, die ich durchlaufen möchte.

![Screenshot des zurückgegebenen JSON-Objekts](/posts/category/database/images/Screen-Shot-2020-06-09-at-7.57.42-AM.png)

Das erste, was zu beachten ist, ist, dass die Nutzdaten ein "Abfrage" -Feld enthalten, das die von mir ausgeführte Abfrage anzeigt. Cool! Als nächstes erhalte ich ein "Spalten" -Feld, das ein Array mit einem Eintrag für jede Spalte ist, wenn Daten zurückkommen. Da ich nach "temp_c", "Luftfeuchtigkeit" und "Zeitstempel" gefragt habe, würde ich erwarten, dass dieses Array 3 Elemente enthält, und das tut es auch. Außerdem werden in jedem Element der Name und die Art des zurückgegebenen Werts angegeben, was hilfreiche Informationen sind.

Schließlich gibt es ein "Datensatz" -Feld, das ein Array von Arrays mit meinen von mir angeforderten Daten enthält. Da ich Daten im Wert von 5 Sekunden angefordert habe und, wenn Sie sich an den [vorherigen Beitrag](/posts/category/database/iot-on-questdb/) erinnern, Daten einmal pro Sekunde gesendet habe, erhalte ich ein Array mit zurück 5 Arrays, eines für jede Sekunde. Durch das Erweitern dieser Arrays sehe ich, dass ich 2 Doppel und einen Zeitstempel in jedem erhalten habe, der dem entspricht, was das Feld "Spalten" mir sagte, dass ich bekommen würde. Nett! Sie müssen diese Daten also nur noch an einige Dashboard-Elemente senden. Naja fast.

```js
  var f = {}
  f.topic = "Temperature ºC"
  f.payload = msg.payload.dataset[msg.payload.dataset.length-1][0]
  f.timestamp = msg.payload.dataset[msg.payload.dataset.length-1][2]
  return f
```

Für den Knoten "Set Temp" ziehe ich das letzte Element aus dem Datensatz und nehme den Temperaturwert und den Zeitstempelwert. Ich sende diese dann als Nutzlast an die eigentlichen Dashboard-Elemente weiter. Ich mache genau das Gleiche für den "Set Humidity" -Knoten. Durch Ziehen der Dashboard-Knoten richtet Node-Red automatisch ein Web-Dashboard mit diesen Elementen ein, und ich kann es aufrufen und mein neues Dashboard anzeigen:

![Screenshot des Node Red Dashboards](/posts/category/database/images/Screen-Shot-2020-06-09-at-7.39.13-AM.png)


Jetzt, da Sie die Daten tatsächlich visualisieren können, können Sie sehen, wie schrecklich die Daten wirklich sind! In meinem Büro ist es momentan auf keinen Fall 2,3 ° C! Ich denke, meine nächste Aufgabe ist es, einen **echten** Temperatur- und Feuchtigkeitssensor einzurichten, um genauere Daten zu senden! Zum Glück habe ich ein paar von denen herumliegen, also muss das wohl mein nächstes Projekt sein.

## Wir sind hier fertig

Wie immer besuchen Sie bitte unseren [GitHub](https://github.com/questdb/questdb) und geben Sie uns einen Stern, wenn Sie dies für nützlich halten! Sie können [folgen Sie mir] (https://twitter.com/intent/follow?screen_name=davidgsIoT) auf Twitter, aber auch [QuestDB] (https://twitter.com/intent/follow?screen_name=questdb) folgen!
