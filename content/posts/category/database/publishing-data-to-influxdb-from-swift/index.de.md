---
title: „Veröffentlichen von Daten zu InfluxDB von Swift“
Date: 2019-03-29
Author: davidgs
Category: Uncategorized
Tags: Influx, InfluxDB, IoT, Swift
Slug: publishing-data-to-influxdb-from-swift
hero: images/2.0CO2-300x269.gif
reading_time: 4 minutes
---

Ich habe ein sehr beschäftigter Mann gewesen. Es war nur ein paar Tage her, dass ich über eine neue InfluxDB Bibliothek geschrieben, um Daten von Arduino Geräten InfluxDB v2 zu schreiben und hier bin ich wieder, um eine neue ** ** Bibliothek Schreiben von Daten an InfluxDB zu schreiben. Dieses Mal ist es in Swift. Jetzt ist Ihre nativen Apple-Anwendungen können Daten direkt an InfluxDB v2.0 mit Leichtigkeit schreiben.

Es ist eine wirklich einfache Bibliothek zu verwenden, und Sie können das gesamte Xcode-Projekt für ihn von meinem [GitHub](https://github.com/davidgs/InfluxData-Swift) herunterladen. Sie können es verwenden, um einzelne Datenpunkte in die DB zu schreiben, oder Bulk schreibt jeder Größe zu tun. Hier ist eine kurze Anleitung, wie man es benutzt.

```swift
let influxdb = InfluxData()
```

Das bekommt man eine Instanz der `InfluxData` Klasse. Sobald Sie das haben, müssen Sie es einige Konfigurationsparameter festlegen.

```swift
influxdb.setConfig(server: “serverName", port: 9999, org: “myOrganization", bucket: “myBucket", token: “myToken")
```

Sie werden natürlich müssen alle diese Werte nach dem jeweiligen InfluxDB v2.0-Server Einstellungen. Sie können auch die Zeitgenauigkeit eingestellt mit

```swift
let myPrecision = DataPrecision.ms // for Milliseconds, ‘us' for microseconds, and ’s’ for seconds
influxdb.setPrecision(precision: myPrecision)
```

An diesem Punkt sind Sie bereit zu beginnen Daten zu sammeln und es zu InfluxDB v2.0 Senden! Für jeden Datenpunkt Sie sammeln und speichern möchten, müssen Sie eine neue `Influx`-Objekt erstellen, die Tags und Daten zu halten.

```swift
let point: Influx = Influx(measurement: "myMeasurement")
point.addTag(name: "location", value: "home")
point.addTag(name: "server", value: "home-server")
if !point.addValue(name: "value", value: 100.01) {
    print("Unknown value type!\n")
}
if !point.addValue(name: "value", value: 55) {
    print("Unknown value type!\n")
}
if !point.addValue(name: "value", value: true) {
    print("Unknown value type!\n")
}
if !point.addValue(name: "value", value: "String Value") {
    print("Unknown value type!\n")
}
```

Wie Sie sehen können, nimmt sie Ganze Zahlen, Gleitkommazahlen, Boolesche Werte und Strings. Wenn es nicht den Datentyp bestimmen kann, wird es die Boolesche `false` zurückkehren, so ist es immer eine gute Idee, den Rückgabewert zu überprüfen.

Für eine optimale Leistung empfehlen wir das Schreiben von Daten in Chargen zu InfluxDB, so dass Sie die Daten vorbereiten müssen in einer Charge zu gehen. Dies ist einfach mit einem Aufruf zu tun, um

```swift
influxdb.prepare(point: point)
```

Und wenn es Zeit, um die Charge zu schreiben, rufen Sie einfach

```swift
if influxdb.writeBatch() {
    print("Batch written successfully!\n")
}
```

Auch hier `writeBatch ()` gibt einen Booleschen auf Erfolg oder Misserfolg, so dass es eine gute Idee ist, diese Werte zu überprüfen.

Wenn Sie jeden Datenpunkt schreiben wollen, wie es kommt, nehmen Sie nur die Daten zeigen Sie oben und Anruf erstellt

```swift
influxdb.writeSingle(dataPoint: point)
```

Sie können gleichzeitig Daten an mehrere Messungen schreiben, da jeder Datenpunkt mit seiner Messung initialisiert wird, und Sie können so viele Tags und Felder hinzufügen, wie Sie möchten.

Das ist wirklich der erste Durchgang an der Swift-Bibliothek v2.0 InfluxDB wie werde ich die Fähigkeit zu Abfrage das Hinzufügen, erstellen Eimer, und viele andere Merkmale der [Flux Sprache](https://docs.influxdata.com/flux/v0.12/introduction/getting-started/) in die Bibliothek in der Zukunft, aber da das, was die meisten Menschen sofort tun mögen, ist Schreibdaten in die Datenbank, ich dachte ich, das da draußen bekommen würde.

Ich hoffe, dass dies hilfreich ist! Ich weiß, dass es für mich gewesen! Sie sehen, habe ich in letzter Zeit mit nur meinem Mac Laptop zu greifen Daten von meinem Bluetooth CO2-Sensor, dass ich gebaut. Um das zu tun, baute ich eine kleine BLE Anwendung, die eine Verbindung mit dem Sensor, an der Daten-ID abonniert hat, und ständig schreibt die Daten in InfluxDB. Unnötig zu sagen, habe ich diese Bibliothek und haben diese Daten wurden Schaben und es glücklich zu speichern.

![Veröffentlichen von Daten zu InfluxDB von Swift](/posts/category/database/images/2.0CO2-300x269.gif)

Ich würde gerne hören, was Sie vorhaben, für 2.0 mit einer Swift-Bibliothek zu tun, so achten Sie darauf, [Follow-me](http://twitter.com/follow?user=davidgsIoT) auf Twitter und lassen Sie mich wissen, was Sie wollen tun!
