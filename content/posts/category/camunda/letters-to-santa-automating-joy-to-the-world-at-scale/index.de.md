---
title: "Briefe an den Weihnachtsmann - Automatisierung der Freude an der Welt im Maßstab"
Date: 2020-12-18
Author: davidgs
Category: BPMN, DevRel
Slug: letters-to-santa-automating-joy-to-the-world-at-scale
hero: images/santa.jpg
reading_time: 17 minutes
---

![Weihnachtsmann auf einem Wasserfahrrad](/posts/category/camunda/slack-imgs.com-2-1024x639.jpg)

Wieder ist es diese Zeit des Jahres. Die Zeit, in der der weltweit größte Auftragserfüllungsbetrieb seine schwerste Belastung erfährt. Nein, nicht Amazon - wir sprechen von Santa Claus, Inc. - dem größten Logistikunternehmen der Welt mit einem weltweiten 24-Stunden-Lieferfenster bei Spitzenlast.

Dieses Jahr ist jedoch anders. Anfang dieses Jahres klickte Saint Nick auf eine Anzeige in seinem Facebook-Feed, die durch die Automatisierung seines Geschäfts einen digitalen Nomaden-Lebensstil versprach. Der Gedanke, an einem Strand in Thailand zu sitzen und gleichzeitig Kindern auf der ganzen Welt Freude zu bereiten, war verlockend.

Der Weihnachtsmann bezahlte den Kurs und wandte die Prinzipien der Prozessautomatisierung, Aufgabenzerlegung und -verteilung sowie der Integration in Dienste von Drittanbietern auf sein Unternehmen an.

Jetzt lehnt er sich an einem Strand auf Koh Samui zurück, während die Automatisierung der Welt Freude macht - im Maßstab.

In diesem Weihnachtsfest werden Kinderbriefe an den Weihnachtsmann an unabhängige Mitarbeiter (deren Eltern) weitergeleitet, die die Bestellungen über Amazon ausführen. Die erfolgreiche Geschäftstransformation des Weihnachtsmanns wurde zu einer Fallstudie, die wir hier mit Ihnen teilen werden.

Hier ist, wie es gemacht wird.

## Das Frontend

Angesichts der Tatsache, dass der Weihnachtsmann ein moderner Typ ist und für den Fall, dass er sein Ruhestandseinkommen durch einige Vertrags-Front-End-Entwicklungsarbeiten ergänzen muss, entschied sich der Weihnachtsmann für einen Crashkurs zum Erlernen des Programmierens in React.js. Es schien das zu sein, was all die coolen Kinder taten, also wollte der Weihnachtsmann es versuchen.

Obwohl es schwieriger war als gedacht, konnte er dank viel Hardcore-Googeln und viel Copy-Paste (denken Sie an Kinder, gute Entwicklerkopien, großartige Entwickler-Paste!) Eine Website entwickeln, die zumindest so war sieht passabel aus und übernimmt die einfache Funktion, einen Brief an den Weihnachtsmann anzunehmen und an die Prozess-Engine zu senden.

Für die Prozess-Engine hat Santa natürlich [Camunda] gewählt (https://camunda.com)!

Nach dem Entwurf des Formulars musste das Formular nur noch mit JavaScript gesendet werden:

```js
const handleSubmit = event => {
event.preventDefault();
setSubmitting(true);
if (!event.target.checkValidity()) {
  // form is invalid! so we do nothing
  return;
}
const requestOptions = {
method: 'POST',
headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
body: JSON.stringify(formData)
};
fetch('https://write-a-letter-to-santa.org:9091/santa', requestOptions);

alert('Santa has been notified! You can reload the page to send another letter.');
}
```
Die Verwendung einer einfachen Warnung, um den Benutzer darüber zu informieren, dass das Formular gesendet wurde, war der Weg des geringsten Widerstands, und der Weihnachtsmann wurde faul.

## Der Prozess

Die Bearbeitung eines Briefes durch einfaches Weiterleiten an die Eltern schien selbst für den Weihnachtsmann etwas zu faul zu sein, sodass er schnell einen Geschäftsprozess mit [Cawemo](https://cawemo.com) entwarf, um die Weiterleitung der Briefe zu handhaben .

So sieht dieser Prozess aus:

![Brief an den Geschäftsprozess des Weihnachtsmanns](/posts/category/camunda/santa-1024x270.jpg)

Und hier ist der Fluss:

1) Ein Brief kommt herein, der den Prozess startet.
2) Der Brief wird unter Verwendung einiger NLP-Algorithmen (Natural Language Processing) analysiert, um einige Teile des Briefes zu extrahieren und herauszufinden, wonach der Autor fragt:
1) Identifizieren Sie alle Elemente, nach denen der Autor fragt.
2) Führen Sie eine Stimmungsanalyse durch, um herauszufinden, wie wichtig jedes Element für den Verfasser ist.
3) Wenn keine Gegenstände identifiziert wurden, wird der Brief an einen manuellen Prozess weitergeleitet, bei dem einer der Elfen weitere Nachforschungen anstellen und die Liste aktualisieren kann.
4) Sobald dies erledigt ist, suchen Sie nach möglichen Amazon-Links für die identifizierten Dinge.
5) Senden Sie den Eltern einen Brief mit einer Kopie des Originalbriefs, den gewünschten Artikeln (natürlich in Verbindung mit Amazon) und einigen hilfreichen Hinweisen, was der Autor am meisten wollte.
6) Speichern Sie die Produktinformationen zur späteren Analyse in einer lokalen Datenbank.

Bevor jemand versucht, eine Geldstrafe gegen den Weihnachtsmann wegen Nichteinhaltung der DSGVO zu verhängen, speichert er keine Namen, E-Mail-Adressen oder andere persönliche Daten. Der Weihnachtsmann weiß schon alles über dich! Er speichert nur die gewünschten Artikel. Natürlich kann er später eine Nachfrageanalyse durchführen.

Der Weihnachtsmann hat in "Go" einen ziemlich einfachen Webserver geschrieben, um die eingehenden Briefe zu verarbeiten und sie an die Camunda BPM-Verarbeitungs-Engine zu senden:

```go
http.HandleFunc("/santa", santa)
err := http.ListenAndServe(":9091", nil) // set listen port
if err != nil {
  log.Fatal("ListenAndServe: ", err)
}
```

Und dann eine Handlerfunktion:

```go
func santa(w http.ResponseWriter, r *http.Request) {
  enableCors(&w)
  if r.Method == "GET" {
    log.Println("GET Method Not Supported")
    http.Error(w, "GET Method not supported", 400)
  } else {
    body, err := ioutil.ReadAll(r.Body)
    if err != nil {
      panic(err)
    }
    log.Println(string(body))
    var t SantaData
    err = json.Unmarshal(body, &t)
    if err != nil {
      panic(err)
    }
    log.Println(t.Letter)
    w.WriteHeader(200)
    client := camundaclientgo.NewClient(camundaclientgo.ClientOptions{
      EndpointUrl: "http://localhost:8000/engine-rest",
      ApiUser: "demo",
      ApiPassword: "demo",
      Timeout: time.Second ,
    })

    processKey := "santa"
    variables := map[string]camundaclientgo.Variable{
      "name": {Value: t.Name, Type: "string"},
      "email": {Value: t.ParentEmailAddress, Type: "string"},
      "letter": {Value: t.Letter, Type: "string"},
    }
    _, err = client.ProcessDefinition.StartInstance(
      camundaclientgo.QueryProcessDefinitionBy{Key: &processKey},
      camundaclientgo.ReqStartInstance{Variables: &variables},
    )
    if err != nil {
      log.Printf("Error starting process: %sn", err)
      return
    }
  }
}
```

Er musste CORS aktivieren, um die Veröffentlichung von Daten zwischen den Ursprüngen zu ermöglichen. Dies ist eher ein wichtiger Punkt bei all dem, da der Server hier auf einem anderen Port ausgeführt wird als der Server, der das Versenden der Briefe übernimmt.

Danach wird ein bisschen Magie mit dem [Camunda Go Client](https://github.com/citilinkru/camunda-client-go) und dem Brief an die Camunda BPM Process Engine gesendet.

## Verarbeitung natürlicher Sprache?

Ja, es ist eine Form der künstlichen Intelligenz (KI), mit der Sie geschriebenen Text aufteilen und Teile davon anhand bestimmter Kriterien identifizieren können. Richtig gemacht, kann es sehr genau sein.

Nehmen wir also einen Musterbrief:

> Lieber Weihnachtsmann,
>
> Mein Name ist Leon und ich bin 36 Jahre alt (ja, ich glaube immer noch an Santa 😇)
>
> Dieses Jahr war ich das beste Kind aller Zeiten, also verdiene ich ein großes Geschenk ...
>
> Ich dachte an eine schöne LEGO Box wie das Skyline Kit oder das New York City. Wenn das keine Option ist, würde ich mich auch mit guter Schokolade zufrieden geben!
>
> Danke,
> Leon

Jetzt können Sie und ich leicht die "Gegenstände" in diesem Brief auswählen, die Geschenke wären, aber es stellt sich heraus, dass es schwieriger ist, dies zu tun, als es scheint.

Wenn wir das durch unseren NLP-Prozessor laufen lassen, erhalten wir:

<pre>Dieses Jahr war ich das beste Kind aller Zeiten, also verdiene ich ein großes Geschenk ...
Sentiment: 0.300000, positiv Item: name Typ: OTHER
Satz: Ich dachte an eine schöne LEGO Box wie das Skyline Kit oder das New York City.
Gefühl: 0.200000, positiv Gegenstand: LEGO Box Typ: SONSTIGES
Artikel: Skyline-Kit Typ: SONSTIGES
Satz: Wenn das keine Option ist, würde ich mich auch mit guter Schokolade zufrieden geben!
Stimmung: 0.700000, positiv Gegenstand: Option Typ: SONSTIGES
Artikel: Schokolade Typ: SONSTIGES
Satz: Danke,
Leon
Stimmung: 0,800000, positiv
</pre>
Hmmm ... nicht großartig.

Wenn Leon dem Weihnachtsmann einen genaueren Brief geschrieben hätte, hätten wir bessere Ergebnisse für ihn erzielen können:

> Lieber Weihnachtsmann,
>
> Mein Name ist Leon und ich bin 36 Jahre alt (ja, ich glaube immer noch an Santa 😇)
>
> Dieses Jahr war ich das beste Kind aller Zeiten, also verdiene ich ein großes Geschenk ...
>
> Ich dachte an ein schönes Lego Skyline Kit oder das Lego New York City Skyline Kit.
>
> Wenn das keine Option ist, würde ich mich auch mit einer guten belgischen Schokolade zufrieden geben!
>
> Danke,
> Leon

Wenn wir diesen Brief verarbeiten, erhalten wir bessere Ergebnisse:

<pre>Der Buchstabe ist 4 Sätze lang.
Satz: Lieber Weihnachtsmann, mein Name ist Leon und ich bin 36 Jahre alt (ja, ich glaube immer noch an den Weihnachtsmann: unschuldig :) Dieses Jahr war ich das beste Kind aller Zeiten, also verdiene ich ein großes Geschenk ...
Sentiment: 0.500000, positiv Item: name Typ: OTHER
Einzelteil: Santa Typ: SONSTIGES
Satz: Ich habe über ein schönes Lego Skyline Kit oder das Lego New York City Skyline Kit nachgedacht.
Gefühl: 0,000000, positiv Artikel: Skyline-Kit Typ: SONSTIGES
Gegenstand: Lego Typ: ORGANISATION
Artikel: Skyline Kit Typ: CONSUMER_GOOD
Satz: Wenn das keine Option ist, würde ich mich auch mit einer guten belgischen Schokolade zufrieden geben!
Stimmung: 0,400000, positiv Gegenstand: Option Typ: SONSTIGES
Artikel: Belgische Schokolade Typ: CONSUMER_GOOD
Satz: Danke, Leon
Stimmung: 0,800000, positiv
</pre>
Sie werden feststellen, dass wir jetzt einige "CONSUMER_GOODS" im Brief identifiziert haben, die*viel* leichter zu finden sind.

Mal sehen, wie der Weihnachtsmann Links gefunden hat.

## Was ist, wenn es keine CONSUMER_GOODS gibt?

Hier kommt natürlich die Magie manueller Prozesse und Formen ins Spiel. Wir haben ein exklusives Gateway, das prüft, ob "CONSUMER_GOODS" identifiziert wurden. Wenn nicht, wäre es für den Amazon-Suchprozess schwieriger, etwas Sinnvolles zu finden.

In diesem Teil des Prozesses kommen die Elfen ins Spiel. Sie haben nicht alle ihre Jobs verloren, als der gesamte Vorgang automatisiert war! Aber sie*konnten* sich der "Work From Home" -Bewegung anschließen, und jetzt erledigen sie ihre Arbeit von jedem Ort aus, an dem sie wollen! (Suche nach Elfen in deiner Nachbarschaft!)

Nehmen wir an, Leon hatte einen Brief geschrieben, in dem nur stand: "Ich will Weltfrieden. Und ich würde Harmonie lieben." Während dies hohe Ideale sind, sind sie nicht wirklich Dinge, die bei Amazon bestellt werden können (zumindest noch nicht).

Hier ist das Formular, das die Elfen erhalten, wenn ein Brief zur Intervention an sie weitergeleitet wird:
![Wenn das Formular eintrifft](/posts/category/camunda/form1-1024x257.jpg)

Und nachdem die Elfen darüber nachgedacht und die Naughty / Nice-Liste überprüft haben, können sie die Gegenstände aktualisieren:
![Aktualisiertes Artikelformular](/posts/category/camunda/form2-1024x250.jpg)

Das Formular wird dann zurück in den Prozess geleitet.

Es gibt jedoch ein wenig Arbeit beim Erstellen des Formulars. Als erstes erstellen Sie das Formular gemäß [docs](https://docs.camunda.org/manual/7.5/reference/embedded-forms/javascript/lifecycle/). Da der Weihnachtsmann beim Analysieren des Briefes alles in ein JSON-Objekt steckte, hatte er allerdings etwas mehr Arbeit zu erledigen.

Bearbeiten Sie alle Geschenke, um die Suche zu vereinfachen

```js
  var variableManager = camForm.variableManager;

  camForm.on('form-loaded', function() {
  // fetch the variable 'gifts'
    variableManager.fetchVariable('gifts');
    console.log(variableManager.variableValue('gifts'))
  });

  camForm.on('variables-fetched', function() {
    // value has been fetched from the backend
    var value = variableManager.variableValue('gifts');
    var frm = document.getElementById('santa-form')
    var g = 0;// will be the number of gifts.
    // it's an array of Json so we have to parse it.
    var m = JSON.parse(variableManager.variables.gifts.originalValue);
    for(var x = 0; x < m.length;x++){
      for(var y = 0; y < m[x].gift.length; y++){
        var textfield = document.createElement("INPUT");
        textfield.type = "text";
        // set the ID so we know where the gift goes back in the JSON array
        textfield.id = "gift-" + x + "-" + y
        textfield.value = m[x].gift[y];
        textfield.classList.add("form-control");
        var label = document.createElement("Label");
        label.htmlFor = textfield.id;
        g++
      }
    }
  });

  camForm.on('submit', function(evt) {
    // get the form
    var frm = document.getElementById('santa-form')
    // parse the original JSON
    var m = JSON.parse(variableManager.variables.gifts.originalValue);
    // get all the inputs
    var inputs = document.forms["form"].getElementsByTagName("input");
    for(var x = 0; x < inputs.length;x++){
      var e = inputs[x].id.split("-");
      if(e.length > 0){
        m[parseInt(e[1])].gift[parseInt(e[2])] = inputs[x].value
      }
    }
  // re-stringify the updated JSON
  var final = JSON.stringify(m)
  var backendValue = variableManager.variable('gifts').value;
  if(final === backendValue) {
    // prevent submit if value of form field was not changed
    evt.submitPrevented = true;
  } else {
    // set value in variable manager so that it can be sent to backend
    variableManager.variableValue('gifts', final);
  }
```


Der Weihnachtsmann musste alle Formularelemente im laufenden Betrieb erstellen und sie am Ende wieder in die Instanzvariable einlesen.

Hier ist das Knifflige: Wenn Sie ein Formular zusammen mit Ihrem Diagramm hochladen, können Sie die vom Modeler bereitgestellte einfache Oberfläche nicht verwenden. Sie müssen einen manuellen Prozess verwenden. Der Weihnachtsmann, ein Kommandozeilen-Typ der alten Schule, benutzte "Curl":

<pre>curl -w "n" - cookie cookie.txt
-H "Akzeptieren: Anwendung / json"
-F "Deployment-Name = Santa"
-F "enable-duplicate-filtering = false"
-F "Deploy-Changed-Only = False"
-F "santa.bpmn=@/Users/santa/Downloads/santa.bpmn"
-F "ManualLetter.html=@/Users/santa/github.com/letter-to-santa/src/ManualLetter.html"
http://santa-server.com:8080/engine-rest/deployment/create
</pre>
Dadurch werden die BPMN-Datei und das Formular auf den Camunda BPM-Server hochgeladen. Wenn der manuelle Prozess aufgerufen wird, wird das Formular angezeigt!

## Links finden

Als Weihnachtsmann und mit einem ganzen*Jahr*, um dies zu planen, hätten Sie gedacht, der Weihnachtsmann hätte besser vorbereitet sein können, aber die Entscheidung über den Ruhestand war in letzter Minute und der Strand in Thailand war sooo schön, er irgendwie ein paar Details vergessen.

Das wichtigste Detail, das er vergaß, war die Erstellung eines Amazon-Verkäuferkontos, über das er auf die Produktsuch-API zugreifen konnte. Damit hätte er viel besser nach Produkten suchen, die Ergebnisse betrachten usw.

Dies war leider nicht der Fall. Aber zum Glück trat einer von Santas klügeren Elfen in letzter Minute auf und sagte ihm, er solle einfach eine Amazon-Such-URL verwenden. Nächstes Jahr wird der Weihnachtsmann besser darauf vorbereitet sein.

## E-Mail senden


Da der Weihnachtsmann eigentlich nicht viel tun wollte, wurde sogar der E-Mail-Teil automatisiert.

Er nahm alle Informationen, die in den vorherigen Schritten gesammelt wurden, und fasste sie zu einer netten E-Mail an die Eltern zusammen:

> Weihnachtsgrüße!
>
> Weißt du was? Leon hat mir einen Brief geschrieben, in dem er um ein paar Dinge gebeten hat. Als ich mich jetzt an einen Strand in Thailand zurückgezogen habe, dachte ich, Sie möchten vielleicht wissen, wonach Lean gefragt hat. Hier ist der Brief:
>
>> "Lieber Weihnachtsmann,
>>
>> Mein Name ist Leon und ich bin 36 Jahre alt (ja, ich glaube immer noch an Santa 😇)
>>
>> Dieses Jahr war ich das beste Kind aller Zeiten, also verdiene ich ein großes Geschenk ...
>>
>> Ich dachte an ein schönes Lego Skyline Kit oder das Lego New York City Skyline Kit.
>>
>> Wenn das keine Option ist, würde ich mich auch mit einer guten belgischen Schokolade zufrieden geben!
>>
>> Danke,
>> Leon "
>
> Ich habe mir die Freiheit genommen, herauszufinden, welche Dinge sie am meisten wollen, und Ihnen eine Liste zur Verfügung gestellt, damit Sie diese Artikel einfach direkt kaufen können. Keine Sorge, die Elfen sind nicht arbeitslos! Sie arbeiten von zu Hause aus, um alle Prozesse zu überwachen. Und nein, sie können nicht gekauft werden.
>
> Also diese Liste:
>
> - Skyline-Kit ⁉️
> - Lego Skyline Kit ⁉️
> - Belgische Schokolade ❗️
>
> Falls Sie sich fragen, da ich im Ruhestand bin, bin ich auch faul. Also habe ich künstliche Intelligenz (die wirklich nicht so intelligent ist) verwendet, um zu bewerten, wonach sie gefragt haben. Ich hätte die Liste*bestellen* können, aber wie ich Ihnen gerade sagte, bin ich im Ruhestand und faul. Hier ist das Bewertungssystem:
>
> - ⚠️: meh.
> - ⁉️: Ok, ich denke.
> - ❗: Jetzt reden wir!
> -‼ ️: Oh bitte! Oh bitte! Oh bitte!
>
> Alles Gute von mir und Frau Claus
>
> -
> PS: Bitte schreiben Sie nicht an diese E-Mail-Adresse zurück. Ich bin im Ruhestand!
>
> [Schreiben Sie Ihren eigenen Brief!](https://write-a-letter-to-santa.org)

Der Weihnachtsmann war jetzt fertig. Und er musste keinen Finger rühren!

## Wie hat er das alles gemacht?

Es war zwar erforderlich, Code zu schreiben, aber der Weihnachtsmann konnte die Clientbibliothek von Camunda Golang verwenden, um alles zu erledigen.

Wie wir gesehen haben, hat der Webserver nach dem Absenden des Briefes eine neue Aufgabe in Camunda erstellt und diese zusammen mit allen Prozessvariablen übermittelt, die zum Verfolgen erforderlich sind (zunächst nur der Name, die E-Mail-Adresse) und der "Brief" selbst). Wir haben bereits gesehen, wie das gemacht wurde.

Aber wie wurde diese Aufgabe behandelt, nachdem sie als Aufgabe eingereicht wurde?

## Eine Aufgabe erledigen

Dies ist das technische Bit. In demselben Go-Prozess, der die eingehenden Briefe verarbeitet (obwohl dies ein völlig separater Prozess gewesen sein könnte), warten wir auf neue Aufgaben in der "Santa" -Warteschlange. Insbesondere warten wir zuerst auf "nlp-Extraktion" -Aufgaben.

Zuerst müssen wir einen Client für die Camunda BPM-Engine erstellen:
```go
  client := camundaclientgo.NewClient(camundaclientgo.ClientOptions{
    EndpointUrl: "http://hostname:8080/engine-rest",
    // ApiUser: "demo",
    // ApiPassword: "demo",
    Timeout: time.Second * 10,
  })
  logger := func(err error) {
  fmt.Println(err.Error())
}
```
Sobald wir den Client haben, können wir beginnen, einige Prozesse zu erstellen, die die verschiedenen Aufgabenwarteschlangen überwachen. Also für die NLP-Warteschlange:

```go
  proc := processor.NewProcessor(client, &processor.ProcessorOptions{
    WorkerId: "nlpProcessor",
    LockDuration: time.Second * 10,
    MaxTasks: 10,
    MaxParallelTaskPerHandler: 100,
    LongPollingTimeout: 10 * time.Second,
  }, logger)
  // NLP Handler
  proc.AddHandler(
    &[]camundaclientgo.QueryFetchAndLockTopic{
    {TopicName: "nlp-extraction"},
  },
  func(ctx *processor.Context) error {
    fmt.Printf("Running task %s. WorkerId: %s. TopicName: %sn", ctx.Task.Id, ctx.Task.WorkerId, ctx.Task.TopicName)
    var sentRes camundaclientgo.Variable
    var err error
    varb := ctx.Task.Variables
    text := fmt.Sprintf("%v", varb["letter"].Value)
    fmt.Println(text)
    sentRes, err = analyze(text) // <-- **this is the important bit
    if err != nil {
      log.Fatal(err)
    }
    vars := make(map[string]camundaclientgo.Variable)
    vars["status"] = camundaclientgo.Variable{Value: "true", Type: "boolean"}
    vars["gifts"] = sentRes
    err = ctx.Complete(processor.QueryComplete{
      Variables: &vars,
    })
    if err != nil {
      fmt.Printf("Error set complete task %s: %sn", ctx.Task.Id, err)
    }
    fmt.Printf("Task %s completedn", ctx.Task.Id)
    return nil
  },
  )
```
Dieser Prozesserstellungsprozess wird auch vom [Go Client] bereitgestellt (https://github.com/citilinkru/camunda-client-go/processor).

Der Prozess wird unter Verwendung des zuvor erstellten "Clients" erstellt und teilt dem Prozess mit, auf welche Aufgaben gewartet werden soll, wie lange die Aufgabe gesperrt werden soll (damit niemand anderes versucht, sie zu beanspruchen und zu verarbeiten) und was dann zu dokumentieren ist, sobald die Aufgabe erledigt ist behauptet. Ein Camunda Client-Objekt "Variable" wird erstellt, und dann wird die Funktion "analyse ()" aufgerufen.

Die Analysefunktion gibt die "Variable" zurück, die mit allen identifizierten Teilen ausgefüllt wurde. Diese werden alle in einem JSON-Objekt gespeichert (dargestellt durch eine "Struktur" in Go).

```go
type Gift []struct {
Gifts []string `json:"gift"`
Types []string `json:"type"`
Sentiments []int `json:"sentiment"`
Amazon []string `json:"amazon"`
}
```
Nachdem die Analysefunktion abgeschlossen ist, werden die Geschenke, Typen und Gefühle ausgefüllt, aber der Amazon-Teil ist leer, da wir dies noch nicht getan haben.

Nachdem wir die Analyse des Briefes abgeschlossen haben, nehmen wir alle Ergebnisse, packen sie in einige neue Variablen und setzen alles wieder in die Camunda BPM-Engine ein.

Der nächste Schritt besteht natürlich darin, einen ähnlichen Prozess zu erstellen, um nach Aufgaben in der Warteschlange "amazon-search" zu suchen. Der Prozess ist wirklich identisch mit dem vorherigen, außer dass er auf verschiedene Task-IDs wartet und eine andere Methode zum Ausführen der Instanzvariablen aufruft.

Sobald die Aufgabe "Amazon-Suche" abgeschlossen ist (und der Teil "Amazon" der Datenstruktur für jede "Geschenk" -Idee ausgefüllt ist), wird das Ganze an Camunda BPM zurückgegeben und die Aufgabe als erledigt markiert.

Womit es zum "E-Mail" -Teil weitergeht.

Wiederum ist ein "Prozessor" definiert, der auf "E-Mail" -Aufgaben wartet, diese beansprucht und dann die E-Mail verfasst und an den Empfänger sendet. Sobald dies erledigt ist, wird die Aufgabe als erledigt markiert und zurückgegeben.

Schließlich haben wir eine Aufgabe, die alle "Geschenke" in einer Datenbank speichert, damit der Weihnachtsmann sehen kann, um welche Art von Geschenken es sich in diesem Jahr handelt. Er ist vielleicht im Ruhestand, muss aber immer noch am Puls der Zeit sein, was Kinder wollen!

## Workflow-Abschluss

Dieser gesamte Workflow ist äußerst effizient. Die Fertigstellung dauert in der Regel höchstens einige Sekunden. Tatsächlich ist es so schnell, dass der Weihnachtsmann nicht einmal Prozesse im Cockpit sehen kann! Es sei denn, es gibt ein Problem. Was es nicht geben wird, weil der Weihnachtsmann nicht gestört werden will.

## Verbesserungswürdige Bereiche

Natürlich könnte der NLP-Teil erheblich verbessert werden. Der Weihnachtsmann verwendete einfach die kostenlose Stufe der Google-Engine für die Verarbeitung natürlicher Sprache ohne Anpassungen und nahm die Ergebnisse ohne weitere Analyse auf. (Muss ich Sie an dieser Stelle an die Faulheit des Weihnachtsmanns erinnern?)

Außerdem könnte der Amazon-Suchabschnitt mit einem tatsächlichen Amazon Reseller-Konto*viel* besser sein. Vielleicht nächstes Jahr.

Wenn Sie sich andere Verbesserungsmöglichkeiten vorstellen können - und es muss viel geben! - Bitte wenden Sie sich an [David G. Simmons](mailto:david.simmons@camunda.com), Principal Developer Advocate bei Camunda, der dafür verantwortlich war, dem Weihnachtsmann bei der Einrichtung dieses gesamten Prozesses zu helfen.

[Schreiben Sie Ihren eigenen Brief!](https://write-a-letter-to-santa.org)

![Schreiben Sie Ihren eigenen Brief](/posts/category/camunda/santa.jpg)
