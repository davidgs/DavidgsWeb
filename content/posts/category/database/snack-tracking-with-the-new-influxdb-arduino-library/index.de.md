---
title: "Snack Tracking mit dem neuen InfluxDB Arduino Library"
Date: 2020-03-13
Author: davidgs
Category: Gadgetry, IoT
Tags: Arduino, InfluxData, InfluxDB, IoT, IoT Data, Snacks
Slug: snack-tracking-with-the-new-influxdb-arduino-library
hero: images/Screen-Shot-2020-03-13-at-2.26.15-PM.png
reading_time: 6 minutes
---

## Eine neue Bibliothek

Viele von Ihnen Arduino-Enthusiasten sind wahrscheinlich bewusst die bestehenden InfluxDB Bibliothek, die von [Tobias Schürg](https://github.com/tobiasschuerg) seit vielen Jahren gehalten wurde. Hüte sind diese Bibliothek zu ihm für die Bereitstellung aus und so lange aufrechterhalten wird.

Mit der Ankunft von InfluxDB 2.0, war es Zeit, um die Bibliothek zu aktualisieren. Einige von euch erinnern sich vielleicht, dass ich ein kurzes Update hätte vor dem InfluxDB 2.0 OSS ein paar Monaten zu unterstützen, und das funktioniert gut, aber InfluxData wurde auf eine Reihe konsistenten, InfluxData gepflegt Satz von Client-Bibliotheken arbeiten. Sie wurden mit Tobias in den letzten paar Monaten arbeiten, um seine Bibliothek mit unseren neuesten Änderungen zu aktualisieren, und zu einem Betreuer dieser Bibliothek. Ich bin froh zu sagen, dass alle diese Arbeit hat sich ausgezahlt, und die neue InfluxDB Arduino Bibliothek offiziell freigegeben und ist auch Teil der [docs](https://v2.docs.influxdata.com/v2.0/reference/api/client-libraries/).

## Einige wichtige Ergänzungen

Diese neue Version der Bibliothek, während rückwärtskompatibel mit der älteren Version (meist) hat einige wirklich bedeutende Änderungen für die Version 2.0 von InfluxDB während immer noch die 1.x Linie unterstützen.

Stapelschreib wird weiterhin unterstützt, aber es ist ** viel ** mehr nahtlos und effizient. Ich habe mit ihm ein wenig zu arbeiten, und es ist nicht mehr notwendig, eine Batch-Zähler zu halten und manuell die Charge auszuschreiben. Es ist alles für Sie behandelt. Möglicherweise am wichtigsten ist die Fähigkeit, die HTTP-Verbindung am Leben zu halten, das spart den Aufwand für die Verbindung instanziieren und es nach unten immer wieder zu reißen. Solange Sie zuverlässig WiFi haben, das ist.

Es ist jetzt Unterstützung für den Umgang mit Datenbank Gegendruck. Wenn Ihr Schreiben nicht durchlaufen, wird die Bibliothek, die die Schreibvorgänge zwischenspeichern, die nicht erfolgreich war und versuchen, sie wieder, und die Größe des Cache-Gegendruck ist konfigurierbar.

Es gibt jetzt eine einfache Möglichkeit, Zeitstempel und die Zeitsynchronisation innerhalb der Bibliothek selbst zu behandeln. Sie können die Zeitgenauigkeit eingestellt, und die Bibliothek übernimmt automatisch die Zeit für Sie, Stanzen.

Es gibt viel mehr, ich bin sicher (einschließlich Umgang mit SSL-Verbindungen), dass ich nicht zur Arbeit mit noch bekommen haben, aber ich bin sicher, werde ich bald eine Chance bekommen!

## A Snack Tracker

Da diese neue Bibliothek gerade herauskam, dachte ich, ich es auf Herz und Nieren mindestens einmal sofort setzen würde. Um dies zu tun, ich wollte eine * Menge * von Daten über sie schreiben, um zu sehen, wie es gehalten. Um das zu tun, ging ich los und kaufte ein wenig [DYI Digitalwaage](https://www.amazon.com/gp/product/B07SX2MYMX/), die eine HX711 zu Schnittstelle zur Wägezelle verwendet. Ich habe dann angeschlossen, das zu einem WEMOS D1 Mini (natürlich, da ich so viele von ihnen um sich zu haben), und ich war bereit zu gehen! Ich verdrahtet zusammen:

![snacker](/posts/category/database/images/Snacker.png )

Die Arduino Bibliothek für die HX711 kam mit einem Beispielprogramm für die Waage kalibrieren, und ich Art der zu erwartenden mit ihnen zu kalibrieren, so dass ich einen Satz von Kalibriergewichten gekauft, wenn ich die Waage gekauft. Die Kalibrierung Programm speichert auch die Kalibrierdaten im EEPROM für Sie, so dass es immer kalibriert ist. Es sieht aus wie es innerhalb von etwa 0,05 Gramm, zum größten Teil genau ist.

## Code Zeit

Nun, da das Gerät gebaut wurde, war es Zeit, ein Stück Code zu schreiben, um all diese Daten zu InfluxDB senden! Zum Glück ist die HX711-Bibliothek kam auch mit einem Beispielprogramm für nur Rohdaten aus dem Gerät speist, so alles, was ich zu tun hatte, war, dass ändern immer so leicht, meine Daten zu InfluxDB zu senden.

```cpp
// InfluxDB 2 server url, e.g. http://192.168.1.48:9999 (Use: InfluxDB UI -> Load Data -> Client Libraries)
#define INFLUXDB_URL "influxdb-url"
// InfluxDB 2 server or cloud API authentication token (Use: InfluxDB UI -> Load Data -> Tokens -> <select token>)
#define INFLUXDB_TOKEN "token"
// InfluxDB 2 organization name or id (Use: InfluxDB UI -> Settings -> Profile -> <name under tile> )
#define INFLUXDB_ORG "org"
// InfluxDB 2 bucket name (Use: InfluxDB UI -> Load Data -> Buckets)
#define INFLUXDB_BUCKET "bucket"

InfluxDBClient client(INFLUXDB_URL, INFLUXDB_ORG, INFLUXDB_BUCKET, INFLUXDB_TOKEN);

HX711_ADC LoadCell(D1, D2);
```

Sie werden, natürlich, haben eine eigene URL zu definieren, TOKEN usw. Ich habe die Wägezelle auf D1 und D2, so dass die hier auch definiert.

Ich habe dann die folgenden bis zum Ende des Setup () Routine hinzugefügt:

```cpp
// Synchronize UTC time with NTP servers
// Accurate time is necessary for certificate validaton and writing in batches
configTime(0, 0, "pool.ntp.org", "time.nis.gov");
// Set timezone
setenv("TZ", "EST5EDT", 1;
influx.setWriteOptions(WritePrecision::MS, 3, 60, true);
```

Dass richtet die Zeitsynchronisation und setzt meine Zeit Präzision Millisekunden, setzt die Chargengröße, die Puffergröße (was in meinem Fall ich die Chargengröße 3x), das Spülintervall (ich sicherstellen, dass das ein Flush geschieht zumindest alle 60 Sekunden) und ich die http-Keepalive auf true so dass ich nur die gleiche Verbindung jedes Mal verwenden kann.

Das war alles, das Setup ich zu tun hatte!

Als nächstes muss ich die Daten schreiben. Und hier ist das Ding, das HX711 Beispielprogramm liest die Waage alle 250ms

```cpp
float weight = 0.00;
void loop() {
   //update() should be called at least as often as HX711 sample rate; >10Hz@10SPS, >80Hz@80SPS
  //use of delay in sketch will reduce effective sample rate (be carefull with use of delay() in the loop)]{style="color: #999dab;"}
  LoadCell.update();
  //get smoothed value from data set
  if(millis() > t + 250) {
    float i = LoadCell.getData();
    weight = i;
    t = millis();
  }
  writeData(weight);
  ...
}
void writeData(float weight) {
  Point dPoint();
  dPoint.addTag("device", "ESP8266");
  dPoint.addTag("sensor", SENSOR_ID);
  dPoint.addField("weight", weight);
  Serial.print("Weight: ");
  Serial.println(weight);
  if(!influx.writePoint(dPoint)) {
    Serial.print("InfluxDB write failed: ");
    Serial.println(influx.getLastErrorMessage());
  }
```

In dem obigen Code schreibe ich einen neuen Datenpunkt, mit Tags, etc., alle \ 250ms. Sie werden bemerken, dass ich immer nur die Datenpunkte zu schreiben. Aber im Hintergrund, ist der Umgang mit der Bibliothek der Dosierung, das Caching, Gegendruck, Wiederholungen etc. bekommt mich nur zu fröhlich Schreibdatenpunkten, ohne darüber nachzudenken, sie mehr.

## Gummibärchen

Wenn du mich überhaupt kennen, dann wissen Sie auch, dass ich eine Art von * Ding * für Gummibärchen haben. Also habe ich beschlossen, diese Sache zu testen, es durch das Laden mit einer Schale Gummibärchen auf und beobachtete die Daten, wie ich sie aßen. Und siehe da, es funktioniert!

![Gummies2](/posts/category/database/images/Gummies2.gif )

Sie können sehen, dass, wenn ich meine Hand in die Schüssel halten einige zu bekommen, das Gewicht nur ein bisschen nach oben geht, dann fällt. Natürlich musste ich ein Gummibärchen Armaturenbrett machen:

![GummyDash](/posts/category/database/images/GummyDash.gif )

Welches war wirklich eine Art von Spaß, bis ich von Gummibärchen lief.

![Screen Shot 2020 03 13 bei 2 26 15 Uhr](/posts/category/database/images/Screen-Shot-2020-03-13-at-2.26.15-PM.png )

Bisher in dieser Sache wurde für ein paar Stunden laufen und ich habe noch eine einzige Fehlermeldung oder Schluckauf vom Gerät selbst zu sehen, so ist es, wie die Dosierung aussieht, Cachen usw. ist alles perfekt funktioniert.
