---
Title: "Measuring and Monitoring Community Engagement on Discourse with InfluxDB"
Date: 2022-11-03
Category: general
Slug: use-influxdb-measure-discourse
hero: images/SafariScreenSnapz005.png
reading_time: 6 minutes
---

> Dieser Beitrag wurde ursprünglich auf [Blog von InfluxData](https://www.influxdata.com/blog/use-influxdb-measure-community/) veröffentlicht.

## Monitoring-Diskurs

Wir hier bei InfluxData verwenden Discourse für unsere Community (Sie sind Mitglied unserer Community, richtig? Nein? Nun, melden Sie sich an!!) Ein Teil meiner Arbeit hier bei InfluxData besteht darin, die Community im Auge zu behalten, Fragen zu beantworten, und daran arbeiten, die Community wachsen zu lassen. Und ein Teil davon sind natürlich Metriken. Es kommt immer darauf an, was man messen kann, oder? Meine Herausforderung bestand also darin, einen Weg zu finden, die Gemeinschaft zu messen.

Es gibt natürlich eine Verwaltungsoberfläche, die die Anzahl der neuen Benutzer, die Anzahl der erstellten Beiträge usw. im Laufe des letzten Tages, der vergangenen Woche und des vergangenen Monats anzeigt, sodass die Statistiken vorhanden sind. Aber die Idee, jeden Tag dorthin zu gehen und diese Zahlen aufzuzeichnen, war weniger als attraktiv.

Discourse bietet eine rudimentäre Überwachung, aber die Macht liegt wirklich darin, ihre APIs zu nutzen, um die Daten auf eine ganz neue Art und Weise zu sehen. Schließlich wurden Computer für die Automatisierung solcher Aufgaben erfunden, oder? Ich zeige Ihnen also, wie ich es geschafft habe, all diese Verwaltungsstatistiken aus Discourse herauszuziehen und dann (natürlich) in InfluxDB einzufügen, damit ich sie immer zur Hand und zeigebereit habe.

## Abrufen der Statistiken

Die erste Herausforderung bestand darin, einen Weg zu finden, alle Statistiken zu erhalten, nach denen ich gesucht hatte. Das erste, was ich tat, war natürlich, direkt zu den Discourse API Docs zu gehen, in der Hoffnung, dass es einen einfachen API-Aufruf geben würde, der mir das bringen würde, was ich wollte. Oder vielleicht, im schlimmsten Fall, eine Reihe von API-Aufrufen, um die einzelnen Statistiken zu erhalten, die ich wollte. Leider sind die Dinge nie so einfach, oder? Es gibt einige wirklich praktische APIs für viele Dinge, aber das Abrufen von Benutzer- und Aktivitätsstatistiken gehört nicht dazu. Es ist an der Zeit, es zurückzuentwickeln.

Es ist ziemlich einfach, eine Reihe von Informationen über die Google Chrome-Entwicklertools zu erhalten. Ich habe dann die Admin-Oberfläche in Discourse geladen, um zu sehen, was passiert:

![Google-Entwicklungstools](images/dashboard-Getting-the-Stats.jpg)

Wie Sie sehen können, habe ich eine „dashboard.json“ gefunden, die gerade geladen wurde, also habe ich mich dort umgesehen und Bingo! Datenschatz! Tatsächlich enthält es alle Daten, die das Administrations-Dashboard enthält. Ich war fast zu Hause! Fast. Das bringt mir ein JSON-Objekt mit 3200 Zeilen, das ich durchwühlen muss, um das zu finden, was ich brauche. Einige der Daten sind auf anderem Wege verfügbar. Beispielsweise sind die http_2xx_reqs-Statistiken aus den nginx-Protokollen verfügbar, Dinge wie die Anzahl der Themen ohne Antwort auf täglicher Basis jedoch nicht. Und das sind die Dinge, an denen ich wirklich interessiert bin. Also bin ich wieder dabei, JSON-Objekte zu parsen und die Ergebnisse in InfluxDB einzufügen. Und Sie dachten, ich hätte ein glamouröses Leben!

## Den Code schreiben

Diesmal mache ich das allerdings nicht in Node-red. Ich entschied mich, da einige andere Node.js-Prozesse verschiedene Dinge auf meinem Server erledigten, dass ich einfach einen weiteren hinzufügen würde. Node.js ist ziemlich gut darin, http abzurufen und JSON zu analysieren, also scheint es eine gute Idee zu sein. Das erste, was Sie brauchen, ist ein API-Schlüssel für Ihre Discourse-Installation, also gehen Sie zu den Discourse API Docs und holen Sie sich einen davon für Ihr Discourse-Setup. Definieren Sie dann Ihre URL (die sich natürlich von meiner unterscheidet, da Sie Ihr eigenes Discourse-Setup haben und keinen Administratorzugriff auf meins haben).

```javascript
const url = "https://community.influxdata.com/admin/dashboard.json?api_username=foo&api_key=bar";
```

Als ich mir die JSON-Datei ansah, entschied ich mich erneut für eine Reihe von "globalen Berichten", an denen ich interessiert war:

```json
{
  "global_reports": [
    { "type": "visits",
      "title": "User Visits",
      "xaxis": "Day",
      "yaxis": "Number of visits",
      "data": [
        { "x": "2017-09-26",
          "y": 68         },
          ...
      ],
      "total": 8404,
      "start_date": "2017-09-26T00:00:00.000Z",
      "end_date": "2017-10-26T23:59:59.999Z",
      "category_id": null,
      "group_id": null,
      "prev30Days": 1077
    },
    ...
```

Noch besser! Ich kann die Summen und die Summen der letzten 30 Tage abrufen! Jetzt, da ich die URL habe und weiß, was die JSON-Struktur ist, kann ich sie abrufen und analysieren:

```javascript
  https.get(url, res => {
    res.setEncoding("utf8");
    let body = "";
    res.on("data", data => {
      body += data;    });
    res.on("end", () => {
      console.log("Influx setup");
      body = JSON.parse(body);
      var reports = body.global_reports;
      for (var x = 0; x < reports.length; x++) {
        const ty = reports[x].type;
        for (var y = 0; y < reports[x].data.length; y++) {
          var buffer = "stats,report=".concat(reports[x].type);
          buffer = buffer.concat(" ");
          buffer = buffer.concat("value=");
          buffer = buffer.concat(reports[x].data[y].y).concat(" ");
          buffer = buffer.concat(new Date(reports[x].data[y].x).getTime());
          writeData(buffer);
        }
        var buffer = "stats,cumulative=".concat(reports[x].type);
        buffer = buffer.concat(" ");
        buffer = buffer.concat("total=").concat(reports[x].total).concat(",");
        buffer = buffer.concat("prev30Days=").concat(reports[x].prev30Days).concat(" ");
        buffer = buffer.concat(new Date(reports[x].end_date).getTime());
        writeData(buffer);
      }
    });
  });
```

Und das bringt mir alle individuellen Datenpunkte, die ich suche, und dann alle kumulativen Datenpunkte – denken Sie daran, die Gesamtsumme und die Summen der letzten 30 Tage – die ich haben möchte. Und ich schreibe diese Daten einfach in meine InfluxDB-Instanz:

```javascript
function writeData(buffer){
  var post_options = {
    host: 'my_instance.influxcloud.net',
    path: '/write?db=discourse&precision=ms&u=my_username&p=myPassword',
    method: 'POST',
    headers: {
      'Content-Length': Buffer.byteLength(buffer)
    }
  };
  req = https.request(post_options, function(result) {
    if(result.statusCode > 205){
      console.log('Status: ' + result.statusCode);
      console.log('Headers: ' + JSON.stringify(result.headers));
    }
    result.setEncoding('utf8');
    result.on('data', function(body) {
      console.log('Body: ' + body);
    });
  });
  req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
  });
  req.write(buffer);
  req.end();
}
```

Es ist eindeutig nicht erforderlich, das Ergebnis auf der Konsole zu protokollieren, aber ich möchte sehen, was vor sich geht. Und das ist der ganze Code, den ich geschrieben habe!

## Die Ergebnisse sehen

Natürlich wäre kein InfluxDB-Projekt vollständig, ohne ein Dashboard zu erstellen, damit ich die Ergebnisse visualisieren kann – und damit das Management den Zustand und die Aktivitäten der Community auf einen Blick sehen kann.

![Google-Entwicklungstools](images/SafariScreenSnapz005.png)

Wirklich cool zu sehen, dass wir im Moment null Themen ohne Antwort haben! Das Beste an dieser ganzen Sache ist, dass es eine Reihe von Statistiken zum Sammeln automatisiert hat, die ich früher von Hand machen musste, und mir so die Freiheit gibt, andere coole Sachen zu machen!

## Was kommt als nächstes?

Nun, ich glaube nicht, dass es zu diesem Projekt etwas Neues gibt, aber ich habe letzte Woche auf der EclipseCon Europe verbracht und werde einige wirklich coole Sachen aufschreiben, die dort passiert sind, also bleiben Sie dran! Und vergessen Sie nicht, wenn Sie eine Idee für ein Projekt haben, das ich angehen sollte, oder Fragen haben, lassen Sie es mich bitte wissen!
