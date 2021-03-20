---
title: „Ein QuestDB Armaturenbrett mit Node-Rot“
Date: 2020-06-09
Author: davidgs
Category: database, Gadgetry, IoT
Tags: Dashboard, Database, IoT, Node-Red, QuestDB
Slug: a-questdb-dashboard-with-node-red
hero: images/Screen-Shot-2020-06-09-at-7.39.13-AM.png
---

Das ist wirklich ein Follow-on zu meinem [Beitrag](/posts/category/database/iot-on-questdb/) aus dem vergangenen Woche, wo ich ein Arduino mit einer Temperatur- und Feuchtigkeitssensor zu QuestDB verbunden.

Es ist eine Sache Daten in Ihrer Datenbank zu senden, sondern dass Daten visualisieren zu können, ist der nächste logische Schritt. Also lassen sie tauchen rechts in das zu tun.

QuestDB ist ziemlich neu, und daher haben wir nicht unsere Grafana Data Source Plugin noch nicht abgeschlossen, so dass ich einen schnellen Armaturenbrett zeigen die eingehenden Temperatur- / Luftfeuchtigkeitsdaten (und Sie werden sehen, wie schrecklich der Sensor wirklich ist) machen wollte. Um dies zu tun, ich Node-Rot gewählt, weil, na ja, es die offensichtliche Wahl scheint!

## Erstellen der Knoten:

![Screen Shot NodeRed Prozess](/posts/category/database/images/Screen-Shot-2020-06-09-at-7.38.57-AM.png)

Wie Sie sehen können, verwendet es nur wenige Knoten, so dass ich durch sie eins nach dem anderen gehen werde.

Der Einstiegsknoten ist ein Knoten, der ausgelöst Injektors in einem regelmäßigen, konfigurierbaren Intervall. Mine feuert alle 10 Sekunden nur, um nicht zu laut zu sein. Es löst den `SetQuery` Knoten, der die Abfrage erstellt:

```js
  var q = {}
  q["query"] = "select temp_c, humidity, timestamp from iot where timestamp > (systimestamp() - 5000000)"
  msg.payload = q
  return msg;
```

Ich habe die Nutzlast auf eine Anfrage, in diesem Fall, erhalte ich die Temperatur und die Feuchtigkeit der letzten 5 Sekunden (denken Sie daran, wir beschäftigen uns mit Mikrosekunde Zeitstempel, so 5 Sekunden 5M Mikrosekunden). Ich schicke dann die Abfrage, wie die Nutzlast auf eine HTTP-Anforderung Knoten, dass ich Abfrage QuestDB genannt habe. Ich habe den Host gesetzt meinen lokalen Rechner, die URL zu dem Abfrage-API-Endpunkt zu sein, und ich hänge Sie die eingehenden msg.payload an die URL.

![Bearbeiten von HTTP-Parameter von Knoten Red](/posts/category/database/images/Screen-Shot-2020-06-09-at-7.51.26-AM.png "Screen Shot 2020-06-09 at 7.51.26 AM.png")

Die Abfrage gibt aa JSON-String, also werde ich brauche es durch einen JSON Knoten laufen in ein JSON-Objekt zu drehen. I senden dann das Ergebnis, dass JSON-Parsing zu 2 weiteren Knoten, eine für die Temperatur und einem für Feuchtigkeit. Nach dem JSON Parsen, ich ein Objekt zurück, das mehrere Dinge in es mich zu durchlaufen wollen hat.

![Screenshot von zurück JSON-Objekt](/posts/category/database/images/Screen-Shot-2020-06-09-at-7.57.42-AM.png)

Das erste, was zu beachten ist, dass die Nutzlast enthält ein `query` Feld, das zeigt die Abfrage I ausgeführt. Cool! Als nächstes habe ich ein `columns` Feld erhalten, die für jede Spalte, wenn Daten ein Array mit einem Eintrag ich zurück bin immer. Da ich für `temp_c`,` humidity` abgefragt und `timestamp` ich dieses Array 3 Elemente erwarten würde, es zu haben, und in der Tat tut es. Es sagt mir auch, in jedem Element, den Namen und die Art des Wert es zurückgegeben hat, die hilfreiche Informationen ist.

Schließlich gibt es ein `dataset` Feld, das ein Array von Arrays mit meinen Daten enthält, dass ich gebeten hat. Da bat ich 5 Sekunden im Wert von Daten und, wenn Sie aus der [früheren Post](/posts/category/database/iot-on-questdb/) erinnern, ich war Daten einmal pro Sekunde zu senden, erhalte ich ein Array zurück mit 5-Arrays darin, eine für jede Sekunde. Durch diese Arrays erweitern, ich sehe, dass ich 2 Doppelzimmer und einen Zeitstempel in jedem bekommen habe entsprechend dem, was das `columns` Feld mir gesagt, ich würde bekommen. Nett! Also alles, was übrig bleibt, ist, dass die Daten an einigen Dashboardelemente zu senden. Naja fast.

```js
  var f = {}
  f.topic = "Temperature ºC"
  f.payload = msg.payload.dataset[msg.payload.dataset.length-1][0]
  f.timestamp = msg.payload.dataset[msg.payload.dataset.length-1][2]
  return f
```

Für die `Set Temp` Knoten, ziehe ich das letzte Element aus der Datenmenge, und den Temperaturwert und den Zeitstempel-Wert greifen. Ich habe dann die auf, wie die Nutzlast, um die tatsächlichen Dashboard-Elemente senden. Ich mache genau die gleiche Sache für den `Set Humidity` Knoten. Durch Ziehen in dem Armaturenbrett Knoten, Knoten-Rot setzt automatisch ein Web-Dashboard mit diesen Elementen, und ich kann mein neues Armaturenbrett gehen und sehen:

![Screenshot von Knoten Red-Dashboard](/posts/category/database/images/Screen-Shot-2020-06-09-at-7.39.13-AM.png)


Nun, da Sie die Daten tatsächlich visualisieren, können Sie sehen, wie schrecklich die Daten wirklich ist! Es gibt keine Möglichkeit, es ist 2.3º C jetzt in meinem Büro! Ich denke, meine nächste Aufgabe ist es, einen ** Echt ** Temperatur- und Feuchtigkeitssensor eingestellt aufsteht genauere Daten zu senden! Zum Glück für mich, habe ich ein paar von denen herumliegen, so dass mein nächstes Projekt, das ich denke, sein muß.

## Wir sind hier fertig

Wie immer finden Sie in unseren [GitHub](https://github.com/questdb/questdb) und geben Sie uns einen Stern besuchen, wenn Sie denken, das war nützlich! Sie können) und geben Sie uns einen Stern besuchen, wenn Sie denken, das war nützlich! Sie können [Follow-me](https://twitter.com/intent/follow?screen_name=davidgsIoT) auf Twitter, sondern auch folgen) auf Twitter, sondern auch folgen [QuestDB](https://twitter.com/intent/follow?screen_name=questdb)!
