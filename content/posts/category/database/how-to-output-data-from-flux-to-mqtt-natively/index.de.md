---
title: „Wie zur Ausgabe von Daten von Flux MQTT Nativ“
Date: 2019-08-23
Author: davidgs
Category: Database
Slug: how-to-output-data-from-flux-to-mqtt-natively
hero: images/mqtt.png
reading_time: 6 minutes
---

## Das Schreiben von Daten von InfluxDB zu MQTT Flux mit

Ich begann die Open Source (OSS) Version von InfluxDB v2.0 mit sehr früh in dem Alpha-Releases. Schon in den frühen Versionen, war ich mit der Art und Weise sehr verliebte Dinge Gestaltung auf. Aber wie Sie wissen, habe ich ein ** ** viel von IoT baut, und verwenden Sie InfluxDB für alles, so gibt es ein paar Dinge, die ich es tun musste, dass es einfach nicht, noch nicht.

Eines der Dinge, die ich habe alle meine IoT Demos tun ist, Warnungen an den MQTT Broker zu schreiben. Ich habe andere IoT-Geräte, die von diesem Broker lesen, und Maßnahmen ergreifen, basierend auf welchen Botschaften, die sie erhalten. Aber InfluxDB 2.0 Alpha hatte keine wirklichen Ausgabefähigkeiten.

** Hinweis: ** Es ist ein Alarmierungs Framework, das 2.0 sehr bald InfluxDB kommt, aber a) es war nicht verfügbar, dann und b) ich brauchte es jetzt.

Was ist zu tun? Nun, Flux ist eine erweiterbare Sprache, so dass ich die Sprache zu schreiben, um MQTT zu verlängern entschieden. Erstens ist es wichtig zu beachten, dass Flux 2 Sprachkonstrukte für das Lesen und Schreiben von Daten hat: `aus ()` und `zu ()`. Wenn Sie irgendeine Flux überhaupt geschrieben haben, werden Sie die `von ()` Syntax als erkennen, wie Sie Daten aus InfluxDB zurück. Das `zu ()` Geschäft ist ein bisschen schwieriger. Eingebaut in die Sprache ist die Fähigkeit zu schreiben zurück zu InfluxDB, mit der `zu ()` Syntax. Ich fand auch eine `zu ()` Erweiterung für http, dass Ihnen die Ergebnisse Ihrer Flux-Abfrage, um einen HTTP-Endpunkt zu schreiben. Wenigstens hatte ich jetzt einen Startplatz!

## Hinzufügen von MQTT zu Flux

Ich begann in der Flux-Code stochern, um zu sehen, wie die http `zu ()` Methode implementiert wurde und schnell, dass Säge wäre es fast trivial sein für MQTT diesem Rahmen zu verwenden, so dass ich auf alle den Code her der http `kopiert ( ) `Ausgang und zu arbeiten begann es über MQTT zu bewegen. Wie bei all diesen Dingen war es ein bisschen weniger ‚trivial‘, als ich zunächst dachte, aber nach ein paar Wochen von On-wieder off-again Arbeit, ich hatte einen Arbeitsausgang MQTT von Flux!

Zuerst musste ich definieren, welche Optionen die MQTT Ausgabe müsste, und ich ließ sich auf eine Art Standard-Mindestsatz von Optionen:

```go
type ToMQTTOpSpec struct {
    Broker string `json:"broker"`
    Name string `json:"name"`
    Topic string `json:"topic"`
    Message string `json:"message"`
    ClientID string `json:"clientid"`
    Username string `json:"username"`
    Password string `json:"password"`
    QoS int `json:"qos"`
    NameColumn string `json:"nameColumn"` // either name or name_column must be set, if none is set try to use the "_measurement" column.
    Timeout time.Duration `json:"timeout"` // default to something reasonable if zero
    NoKeepAlive bool `json:"noKeepAlive"`
    TimeColumn string `json:"timeColumn"`
    TagColumns []string `json:"tagColumns"`
    ValueColumns []string `json:"valueColumns"`
}
```

Natürlich sind nicht alle von denen, ** ** erforderlich, aber ich werde die, die durchlaufen, die sind.

Erstens, natürlich, benötigen Sie einen Broker zu definieren. Dies ist die URL des MQTT Broker, die Sie verwenden möchten. In Ihrer URL sollte Ihr Broker entweder als `tcp` identifiziert werden,` ws` oder `tls` so` tcp: //mqtt.mybroker.com: 1883` wäre, was es sieht. Die meisten anderen sind, im Großen und Ganzen optional zu einem gewissen Grad. ** Wenn ** Sie liefern eine `Username` Sie dann ** auch müssen ** ein Kennwort angeben. Sie können nicht eine ohne das andere! Auch wenn Sie nicht über eine `Topic` liefern, dann wird für Sie erstellt werden durch Aneinanderreihung alle Tags aus der Abfrage zurückgegeben. Ich würde raten, ein Thema zu geben, als ein Thema von `/ tag1 / TAG_2 / TAG_3 / ...` wäre weniger als ideal in vielen Situationen.

## Wie diese neue Sache zu benutzen?

Ich bin froh, dass du gefragt! Erstens ist es nicht wirklich Teil Flux nur noch. Ich habe eine PR vorgelegt hat es akzeptiert worden, aber (als dies geschrieben wurde) hat verschmolzen gewesen. Wenn Sie Ihre eigene Version von Flux zu bauen, um Ihre Hände auf diesem * jetzt zu bekommen * dann müssen Sie den Zweig und Build von der Quelle ziehen. Siehe die [MQTT PR](https://github.com/influxdata/flux/pull/1653) und geht von dort aus.

Sobald Sie das getan haben, um das Flux Code zu schreiben zu beginnen, einen MQTT Broker tatsächlich trivial ist! Sie erhalten eine Aufgabe in der InfluxDB 2.0 UI erstellen möchten, und dann können Sie in den folgenden Code ein:

```js
import "mqtt"
from(bucket: "telegraf")
    |> range(start: -task.every)
    |> filter(fn: (r) =>
        (r._measurement == "cpu"))
    |> filter(fn: (r) =>
        (r._field == "usage_system"))
    |> filter(fn: (r) =>
        (r.cpu == "cpu-total"))
    |> last()
    |> mqtt.to(
        broker: "tcp://davidgs.com:8883",
        topic: "cpu",
        clientid: "cpu-flux",
        valueColumns: ["_value"],
        tagColumns: ["cpu", "host"],
    )
```

Dies wird die letzte CPU `usage_system` Wert Ihrem MQTT Broker schreiben. Mit Hilfe der Benutzeroberfläche können Sie entscheiden, wie oft Sie diese Daten wollen geschrieben.

## Ein paar Dinge zu beachten

Es ist wichtig, dass [Flux gibt alle seine Daten aus Abfragen als Tabellen] zu realisieren (https://www.influxdata.com/blog/use-flux-to-group-shape-and-analyze-your-time-series- Daten/). Der Grund, warum die obige Aufgabe verwendet die `letzte ()` Funktion ist mit genau einer Zeile den Rückgabewert auf eine Tabelle zu begrenzen. Die MQTT `zu ()` Funktion wird die gesamte Tabelle an den Broker, als Line-Protokoll schreiben. Wenn Ihre Abfrage eine sehr große Tabelle zurückgibt, für Ihren MQTT Broker vorbereitet werden, um eine sehr große Tabelle als die Nachrichtennutzlast zu erhalten.

Darüber hinaus, wenn Ihre Abfrage mehrere Tabellen zurückgibt, wird die MQTT `zu ()` Funktion eine Nachricht schreiben ** pro Tisch ** mit jeder Nachricht eine ganze Tabelle enthält. Ist dies nicht das Verhalten Sie wollen, sollten Sie darüber nachdenken, wie Ihre Frage so fertigen, dass sie eine einzige (vorzugsweise kleine) Tabelle als die Ergebnisse.

Sie können auch ein optionales Feld `Message` oben bemerkt. Wenn das, was Sie möchten ist anstelle einer Tabelle der Ergebnisse einer vordefinierten Nachricht zu senden, können Sie die `message` Parameter in Ihrem Aufruf zum` zu () `und die Nachricht gesendet werden soll definieren.
Bisher habe ich mit fantastischen Ergebnissen für ca. 2 Monate dieses wurde mit! Ich bin in der Lage, einige IoT-Geräte auf den Lesungen von anderen IoT-Geräten zu steuern und es funktioniert super!

** Update: ** Die PR für diesen jetzt wurden in den Master-Zweig zusammengeführt, so dass es bald zu einer Freisetzung von Flux zeigt werden soll!
