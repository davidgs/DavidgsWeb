---
title: "Das Schreiben in InfluxDB 2.0 von Arduino Esp8266"
Date: 2019-03-22
Author: davidgs
Category: IoT
Tags: Arduino, ESP8266, IoT, IoT Data
Slug: writing-to-influxdb-2-0-from-arduino-esp8266
hero: images/3686-10.jpg
reading_time: 3 minutes
---

Wie InfluxData immer näher an der Freigabe v2.0 bewegt, wird es immer wichtiger, die Lage sein, Daten zu erhalten ** in ** InfluxDBv2, natürlich. Das macht Sinn, nicht wahr? Da die überwiegende Mehrheit (wie nicht zu unterscheiden von 100%) meiner Daten von IoT-Geräten kommt, habe ich beschlossen, es Zeit, diese Geräte InfluxDB v2-fähig machen zu starten war.

Ich bin glücklich, zu sagen, dass der erste Schritt in dieser Richtung ist nun abgeschlossen! Einer meiner Lieblings-Sensoren ist ein Partikelsensor, dass die Maßnahmen der Menge an ** sehr klein ** Partikel in der Luft (von 2,5 um bis 100 um im Durchmesser). Dieses Zeug, es stellt sich heraus, ist wirklich * wirklich * schlecht für Sie, so zu wissen, wie viel in der Luft ist eine gute Idee ist. Zu diesem Zweck bestellte ich einen dieser Sensoren von Adafriut:

![3686 10](/posts/category/database/images/3686-10.jpg )

Es ist klein und leicht zu so ziemlich allem bis haken, da sie nur Daten aus über UART speien. Da ich einen riesigen Haufen von ESP8266 Platten herumliegen (ich sie in der Regel von den Dutzenden bestellen, da sie so billig und einfach zu handhaben sind), hakte ich es einen von denen, auf. Der Code war einfach, dank Adafruit es bietet, und es gab einen Griff InfluxDB Bibliothek Schreibdaten mit, aber es nur InfluxDB v1.x. unterstützt Das erste, was ich tat, (weil ich in Eile war) war die 1.x Bibliothek und nur neu zu schreiben es für 2.x. greifen Dauerte etwa 1/2 Stunde oder weniger, und es funktionierte großartig! (Können Sie diese Version verwenden [hier](https://github.com/davidgs/ESP8266_Influx_DB_V2), wenn Sie möchten). Das war wirklich nicht die * richtige * Lösung though. Also heute ging ich zurück und erstellt eine richtige Gabel der), wenn Sie möchten). Das war wirklich nicht die * richtige * Lösung though. Also heute ging ich zurück und erstellt eine richtige Gabel der [Original-Repository](https://github.com/tobiasschuerg/ESP8266_Influx_DB) und aktualisierte es entweder in Version 1.x oder 2.x Version von InfluxDB zu unterstützen. Ich habe natürlich einen richtigen Pull-Request gegen die ursprüngliche Bibliothek und Hoffnung vorgelegt, dass sie angenommen wird / fusionierte bald.

Lassen Sie uns zu Fuß durch das, was es braucht, dann diese neue Bibliothek zu verwenden. Es ist einfach tot, wirklich. Zumindest mit Arduino, alles, was Sie tun müssen, ist die Bibliothek hinzufügen, schließen Sie es dann in Ihrer Skizze:

```cpp
#include <InfluxDb.h>
//#include <InfluxDataV2.h> // if you want to use the other library I built and that’s in my GitHub 
#define INFLUXDB_HOST “myhost.com"
Influxdb influx(INFLUXDB_HOST);
```

Das bringt Sie begonnen haben. Weiter Sie gehen einige spezifische Informationen von Ihrem InfluxDB v2.0 (alpha noch!) Installation benötigen. Bemerkenswert ist, müssen Sie die `Organisation zur` bucket` und `token`, die mit Ihrem Konto verknüpft sind. Sie können diese finden, indem Sie Ihren Web-Browser auf Ihrem InfluxDB Server verweist, Port 9999, Ihren Benutzernamen und Ihr Passwort eingeben, und gehen auf die Konfigurationsseite:

![Screen Shot 2019 03 22 bei 1 26 56 PM](/posts/category/database/images/Screen-Shot-2019-03-22-at-1.26.56-PM.png)

Sie können dann in den Arduino Sketch eingeben:

```cpp
influx.setBucket(“myBucket");
influx.setVersion(2);
influx.setOrg(“myOrg");
influx.setPort(9999);
influx.setToken(“myToken");
```

Sobald Sie das getan haben, in Ihrem `Setup ()` Funktion können Sie das Schreiben von Daten auf Ihren v2.0 Influx-Server starten!

```cpp
void loop() {
  loopCount++;
  InfluxData row("temperature");
  row.addTag("device", "alpha");
  row.addTag("sensor", "one");
  row.addTag("mode", "pwm");
  row.addValue("loopCount", loopCount);
  row.addValue("value", random(10, 40));
  influx.write(row);
  delay(5000);
}
```

Sehen? Ich habe dir gesagt, es ist einfach!
