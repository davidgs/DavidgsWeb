---
title: „Letters to Santa - Automatisieren Freude zur Welt, in großem Maßstab“
Date: 2020-12-18
Author: davidgs
Category: BPMN, DevRel
Slug: letters-to-santa-automating-joy-to-the-world-at-scale
hero: images/santa.png
---

![Sankt auf einem Wasserfahrrad](/posts/category/camunda/slack-imgs.com-2-1024x639.jpeg)

Wieder ist es diese Zeit des Jahres. Die Zeit, in der größten Auftragserfüllung Betrieb der Welt erlebt seine schwerste Last. Nein, nicht Amazon - wir sprechen von Santa Claus, Inc. - der größten Logistikunternehmen der Welt, mit einer 24-Stunden-globalen Lieferfenster bei Spitzenlast.

In diesem Jahr ist jedoch anders. Zu Beginn dieses Jahres angeklickt St. Nick auf eine Anzeige auf seiner Facebook-Feed, ein eine digitale Nomade Lebensstil viel versprechend durch sein Geschäft zu automatisieren. Kranker der Arktis Wetter und den Stress des Reisens, der Gedanke in Thailand sitzt auf einem Strand - während nach wie vor Freude auf der ganzen Welt Kinder zu bringen - war verlockend.

Sankt bezahlte für den Kurs und angewandt, um die Grundsätze der Prozessautomatisierung, Aufgabe Zersetzung und Verteilung und Integration mit Drittanbieter-Diensten, um sein Geschäft.

Jetzt ist er wieder an einem Strand auf Koh Samui treten, während die Automatisierung Freude in der Welt bringt - in großem Maßstab.

Also dieses Weihnachten werden Kinder Briefe an Santa unabhängige Mitarbeiter weitergeleitet (ihre Eltern), der die Aufträge mit Amazon erfüllen. Sankt erfolgreich wurde Business Transformation eine Fallstudie, die wir mit Ihnen teilen hier gehen.

Hier ist, wie es gemacht wird.

## Das Front-End

das Lernen zu Programm in React.js Da Sankt ein modernen Typ, und falls er brauchte, um sein Einkommen im Ruhestand mit einiger Vertrag Front-End-Entwicklungsarbeit zu ergänzen, entschied Sankt einen Crash-Kurs zu tun. Es schien, als ob das, was alle coolen Kinder taten, so Sankt wollte es eine Chance geben.

Während es war schwieriger, als er dachte, dank vielen harten Kern googeln, und eine Menge von Copy-Paste (nicht vergessen, Kinder, gute Entwickler zu kopieren, große Entwickler einfügen!) Er in der Lage war, mit einer Website zu kommen, dass zumindest die einfache Funktion der einen Brief an Santa akzeptieren und an den Prozess-Engine sieht passierbar, und Griffe einreichen.

Für den Prozess-Engine wählt Sankt natürlich [Camunda](https://camunda.com)!

Sobald das Formular entworfen wurde, alles, was übrig blieb, war, das Formular einige JavaScript verwenden:

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
den Benutzer wissen zu lassen, eine einfache Benachrichtigung für, dass die Form der Weg des geringsten Widerstandes war vorgelegt wurde, und Santa war immer faul.

## Der Prozess

die Routing der Buchstaben einen Brief Handhabung von nur sie an die Eltern weiterzuleiten wie sie ist schien ein wenig zu faul, auch für Sankt, so dass er schnell einen Geschäftsprozess mit [Cawemo](https://cawemo.com) entworfen zu handhaben .

Hier ist, was dieser Prozess aussieht:

![Brief an den Weihnachts Business Process](/posts/category/camunda/santa-1024x270.png)

Und hier ist der Fluss:

1) Ein Brief kommt, was den Prozess beginnt.
2) Der Brief analysiert einige Natural Language Processing (NLP) Algorithmen einige Teile des Briefes zu Hilfe Figur zu extrahieren, was der Schreiber fragt nach:
1) Identifizieren Sie alle Elemente der Schreiber bittet um.
2) Sie einige der Sentiment-Analyse, um zu versuchen, herauszufinden, wie wichtig jedes Element an den Schriftsteller ist.
3) Wenn es keine Objekte identifiziert sind, dann wird der Brief an einen manuellen Prozess geleitet, wo eine der Elfen kann einige weitere Untersuchung tun, und die Liste aktualisieren.
4) Sobald dies erledigt ist, gehen zu finden einige mögliche Amazon-Links für die Dinge, identifiziert.
5) Schicken Sie einen Brief an die Eltern mit einer Kopie des Originalbrief, die Gegenstände, die sie für Amazon natürlich gefragt (verknüpft) und einige hilfreiche Hinweise, was der Schriftsteller am meisten wollte.
6) Speichern Sie die Produktinformationen in einer lokalen Datenbank für die Analyse später.

Nun, bevor jemand versucht, für die Nichteinhaltung BIPR Sankt bestraft haben, ist er nicht speichert keine Namen, E-Mail-Adressen oder andere persönliche Daten. Sankt weiß schon alles über Sie! Er speichert nur die Elemente gefragt. So kann er später einige Nachfrage-gen Analyse tun, natürlich.

Sankt hat einen ziemlich grundlegenden Web-Server in `Go` die eingehenden Briefe zu handhaben, und sie an den Motor Camunda BPM Verarbeitung einreichen:

```go
http.HandleFunc("/santa", santa)
err := http.ListenAndServe(":9091", nil) // set listen port
if err != nil {
  log.Fatal("ListenAndServe: ", err)
}
```

Und dann eine Handler-Funktion:

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

Er hat CORS zu ermöglichen, die Quer Herkunft Entsendung von Daten zu ermöglichen. Das ist vielmehr ein wichtiger Punkt in all dies, da der Server hier läuft auf einem anderen Port als der Server, dass Griffe die Briefe zu veröffentlichen.

Danach wird ein bisschen Magie mit der [Camunda Go Client](https://github.com/citilinkru/camunda-client-go) und der Brief an der Camunda BPM Process Engine vorgelegt.

## Verarbeitung natürlicher Sprache?

Ja, es ist eine Form der Künstlichen Intelligenz (KI), die Sie zu brechen geschriebenen Text und identifizieren Teile davon auf der Grundlage bestimmter Kriterien ermöglicht. Richtig gemacht, kann es sehr genau sein.

Werfen wir also einen Musterbrief nehmen:

&gt; Dear Santa,
&gt;
&gt; Mein Name ist Leon und ich bin 36 Jahre alt (yeah, ich in Santa 😇 noch glauben)
&gt;
&gt; In diesem Jahr habe ich immer das goodest Kind gewesen, so irgendwie ich ein großes Geschenk verdienen ...
&gt;
&gt; Ich über eine nette LEGO Box wie die Skyline-Kit oder der New York City ein nachdachte. Wenn das keine Option ist, würde ich auch für ein paar gute Schokolade begleichen!
&gt;
&gt; Vielen Dank,
&gt; Leon

Jetzt können Sie und ich leicht herausgreifen, die `Elemente` in dem Brief, die Geschenke sein würde, aber es stellt sich heraus, dass das zu tun ist schwieriger als es scheint.

Wenn wir, dass durch unseren NLP-Prozessor laufen, erhalten wir:

<pre>In diesem Jahr habe ich immer das goodest Kind gewesen, so dass ich ein bisschen ein großes Geschenk verdienen ...
Sentiment: 0.300000, positiver Artikel: Name Typ: OTHER
Satz: Ich war über eine nette LEGO Box wie die Skyline-Kit oder der New York City ein zu denken.
Sentiment: 0.200000, positive Artikel: LEGO Box Typ: OTHER
Item: Skyline-Kit Typ: OTHER
Satz: Wenn das nicht eine Option, auch ich für ein paar gute Schokolade begleichen würde!
Sentiment: 0.700000, positiver Artikel: Option Typ: OTHER
Item: Schokolade Typ: OTHER
Satz: Vielen Dank,
Leon
Sentiment: 0.800000, positive
</pre>
Hmmm ... Nicht so toll.

Wenn Leon Sankt einen spezifischeren Brief geschrieben hatte, konnten wir einige bessere Ergebnisse für ihn bekommen haben:

&gt; Dear Santa,
&gt;
&gt; Mein Name ist Leon und ich bin 36 Jahre alt (yeah, ich in Santa 😇 noch glauben)
&gt;
&gt; In diesem Jahr habe ich immer das goodest Kind gewesen, so irgendwie ich ein großes Geschenk verdienen ...
&gt;
&gt; Ich über einen netten Lego Skyline-Kit oder das Lego New York City Skyline Kit dachte.
&gt;
&gt; Wenn das nicht eine Option, auch ich für ein paar gute belgische Schokolade begleichen würde!
&gt;
&gt; Vielen Dank,
&gt; Leon

Wenn wir diesen Brief zu verarbeiten, erhalten wir bessere Ergebnisse:

<pre>Brief ist 4 Sätze lang.
Satz: Liebe Sankt, mein Name ist Leon und ich bin 36 Jahre alt (yeah, ich glaube immer noch in Santa: unschuldig :) Dieses Jahr habe ich das goodest Kind je gewesen bin, so dass ich ein bisschen ein großes Geschenk verdienen ...
Sentiment: 0.500000, positiver Artikel: Name Typ: OTHER
Artikel: Sankt-Typ: OTHER
Satz: Ich war über eine nette Lego Skyline Kit denken oder Lego New York City Skyline Kit.
Sentiment: 0.000000, positives Item: Skyline-Kit Typ: OTHER
Item: Lego Art: ORGANISATION
Item: Skyline Kit-Typ: CONSUMER_GOOD
Satz: Wenn das nicht eine Option, auch ich für ein paar gute belgische Schokolade begleichen würde!
Sentiment: 0.400000, positiver Artikel: Option Typ: OTHER
Item: Belgische Schokolade Art: CONSUMER_GOOD
Satz: Vielen Dank, Leon
Sentiment: 0.800000, positive
</pre>
Sie werden feststellen, dass jetzt haben wir einige `CONSUMER_GOODS` in dem Buchstaben, die * viel sind * einfacher zu finden.

Also mal sehen, wie Sankt ging Links zu finden.

## Was ist, wenn es keine CONSUMER_GOODS?

Das ist, wo die Magie der manuellen Prozesse und Formen kommt, natürlich. Wir haben ein exklusives Gateway, dass überprüft, ob irgendwelche `CONSUMER_GOODS` identifiziert worden. Wenn nicht, dann wäre es schwieriger für den Prozess Amazon-Suche etwas zu finden, sinnvoll.

Dieser Teil des Prozesses ist, wo die Elfen ins Spiel kommen. Sie haben nicht alle ihre Jobs verlieren, sobald der gesamte Vorgang automatisiert wurde! Aber sie waren * * Lage, die „Arbeit von zu Hause“ Bewegung anzuschließen, so dass jetzt sie ihre Arbeit aus, wo immer sie wollen! (Suchen Sie nach Elfen in Ihrer Nähe!)

Sagen wir, Leon einen Brief geschrieben hatte, dass gerade gesagt hat: „Ich Weltfrieden wollen. Und ich würde Harmonie lieben“. Während die hohen Idealen sind, sind sie nicht wirklich Dinge, die bei Amazon bestellt werden kann (zumindest noch nicht).

Hier ist die Form der Elfen bekommen, wenn ein Brief an sie für die Intervention geleitet wird:
![Wenn die Form ankommt](/posts/category/camunda/form1-1024x257.png)

Und dann, nachdem die Elfen es einige Gedanken gegeben haben, die Frech / Nizza Liste überprüft, können sie die Artikel aktualisieren:
![Aktualisiert Artikel bilden](/posts/category/camunda/form2-1024x250.png)

Die Form wird dann in den Prozess zurückgeführt.

Es ist ein bisschen Arbeit, obwohl in den Aufbau der Form zu tun. Erste ist die Form nach dem [docs](https://docs.camunda.org/manual/7.5/reference/embedded-forms/javascript/lifecycle/) aufzubauen. Da Sankt alles in ein JSON-Objekt gesetzt, wenn der Brief analysiert wurde, hatte er ein bisschen mehr Arbeit, obwohl zu tun.

Bearbeiten keine Geschenke, um sie leichter zu suchen

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


Sankt hatte alle Formelemente on-the-fly erstellen und sie dann am Ende wieder in die Instanzvariable lesen.

Nun, hier ist der schwierige Bit: Wenn Sie ein Formular zusammen mit Ihrem Diagramm hochladen, Sie nicht die einfache Schnittstelle vom Modeler bereitgestellt nutzen können. Sie haben einen manuellen Prozess zu verwenden. Sankt, einen Old-School-Kommandozeilen-Typ ist, verwendet `curl`:

<pre>curl -w „n“ - Cookie cookie.txt
„Accept: application / json“ -H
-F "deployment-name = santa"
-F "enable-Duplikat-Filterung = false"
-F "deploy-changed-only = false"
-F "santa.bpmn=@/Users/santa/Downloads/santa.bpmn"
-F "ManualLetter.html=@/Users/santa/github.com/letter-to-santa/src/ManualLetter.html"
http://santa-server.com:8080/engine-rest/deployment/create
</pre>
Das Uploads der BPMN-Datei und das Formular an den Camunda BPM Server, und dann, wenn der manuelle Prozess aufgerufen wird, die Form zeigt nach oben!

## Finding Verbindungen

Als Weihnachtsmann, und ein ganzes * Jahr * Plan für diese, würden Sie gedacht haben, Sankt besser vorbereitet hätte, aber, na ja, war die Alters Entscheidung Art in letzter Minute, und der Strand in Thailand war sooo schön, er Art vergessen, ein paar Details.

Das Haupt Detail vergaß er war ein Amazon-Verkäufer-Konto zu erstellen, die ihn auf die Produktsuche API zugreifen gegeben hätte. Damit hätte er eine viel bessere Arbeit der Suche nach Produkten durchgeführt, die Resultate, usw.

Dies war nicht der Fall, leider. Aber zum Glück einer intelligenterer Elfe Santa trat in der letzten Minute und ihm gesagt, nur eine Amazon-Suche URL verwenden. Im nächsten Jahr, Santa wird mehr bereit dafür.

## Senden der E-Mail


Da Sankt tat wollte nicht wirklich, na ja, so gut wie nichts, auch wurde der E-Mail-Teil automatisiert.

Er nahm alle Informationen in den vorherigen Schritten gesammelt, und zog sie alle zusammen in eine schöne E-Mail an die Eltern:

&gt; Jahreszeit-Grüße!
&gt;
Ratet mal,&gt; was? Leon hat mir einen Brief für ein paar Dinge zu fragen geschrieben. Wie ich jetzt zu einem Strand in Thailand zurückgezogen habe, dachte ich, vielleicht würden Sie gerne wissen, was gefragt Lean. Hier ist der Brief:
&gt;
&gt;&gt; „Dear Santa,
&gt;&gt;
&gt;&gt; Mein Name ist Leon und ich bin 36 Jahre alt (yeah, ich in Santa immer noch glauben, 😇)
&gt;&gt;
&gt;&gt; In diesem Jahr habe ich immer das goodest Kind gewesen, so irgendwie ich ein großes Geschenk verdienen ...
&gt;&gt;
&gt;&gt; Ich über einen netten Lego Skyline-Kit oder das Lego New York City Skyline Kit dachte.
&gt;&gt;
Wenn&gt;&gt; das ist keine Option, ich für ein paar gute belgische Schokolade absetzen würde auch!
&gt;&gt;
&gt;&gt; Vielen Dank,
&gt;&gt; Leon“
&gt;
&gt; Ich habe mir die Freiheit genommen, herauszufinden, welche Dinge, die sie am meisten wollen, und vorausgesetzt, Sie mit einer Liste, so dass Sie nur direkt diese Artikel kaufen können. Mach dir keine Sorgen, sind die Elben nicht aus der Arbeit! Sie arbeiten von zu Hause aus alle die Prozesse zu überwachen. Und nein, sie sind nicht zum Kauf angeboten.
&gt;
&gt; So, das Liste:
&gt;
&gt; - Skyline Kit ⁉️
&gt; - Lego Skyline Kit ⁉️
&gt; - Belgian Chocolate ❗️
&gt;
&gt; Falls Sie sich fragen, da ich im Ruhestand bin, bin ich auch faul. Also habe ich einige künstliche Intelligenz verwendet haben (was wirklich nicht so intelligent ist) sortieren von ‚Bewertung‘, was für sie gefragt. I * könnte * die Liste bestellt haben, aber wie ich dir gerade gesagt, ich bin im Ruhestand, und faul. Hier ist das Rating-System:
&gt;
&gt; - ⚠️: Monate.
&gt; - ⁉️: Ok, denke ich.
&gt; - ❗: jetzt sind wir talkin!
&gt; - ️: Oh bitte! Oh bitte! Oh bitte!
&gt;
&gt; Alles Gute von mir und Mrs. Claus
&gt;
&gt; -
&gt; PS: Bitte schreiben Sie nicht auf diese E-Mail-Adresse zurück. Ich bin im Ruhestand!
&gt;
&gt; [Schreiben Sie Ihren eigenen Brief!](https://write-a-letter-to-santa.org)

Sankt wurde jetzt getan. Und er hat nicht einen Finger heben!

## Wie hat er es alle tun?

Es dauerte einige Code schreiben, aber Sankt konnte die Camunda Golang Client-Bibliothek Griff alles verwenden.

Wie wir gesehen haben, sobald der Brief vorgelegt wurde, erstellt der Web-Server eine neue Aufgabe in Camunda und ihm vorgelegten, zusammen mit allen Prozessvariablen es benötigt, um zu verfolgen (mit zu beginnen, nur die `name`,` email address` und die `letter` selbst). Wir haben bereits gesehen, wie das geschehen war.

Aber einmal, als Aufgabe gestellt wurde, wie wurde diese Aufgabe behandelt?

## Umgang mit einer Aufgabe

Dies ist die technische Bit. Im selben Go Prozess, der die eingehenden Briefe behandelt (obwohl es in einem völlig separaten Prozess gewesen sein könnte), hören wir für neue Aufgaben auf der `santa` Warteschlange. Insbesondere hören wir zuerst für `nlp-extraction` Aufgaben.

Erstens haben wir einen Client für die Camunda BPM-Engine zu erstellen:
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
Sobald wir die Kunden haben, können wir beginnen, einige Prozesse zu schaffen, die die verschiedenen Aufgabenwarteschlangen beobachten. Also für die NLP-Warteschlange:

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
Dieser Prozess Erstellungsprozess wird auch durch den [Go Client](https://github.com/citilinkru/camunda-client-go/processor) zur Verfügung gestellt.

Der Prozess wird erstellt, indem die `Klient` zuvor erstellt haben, und erzählt den Prozess, welche Aufgaben zu hören, wie lange die Aufgabe zu sperren (so sonst niemand versucht Anspruch und verarbeiten es) und dann, was zu docs einmal die Aufgabe behauptet. Ein Camunda Kunde `Variable` Objekt erstellt wird, und dann die` analysieren () `Funktion aufgerufen wird.

Die Analyse-Funktion gibt den `Variable`, die mit allen Teilen ausgefüllt identifiziert wurde. Diese sind alle in einem JSON-Objekt gespeichert (dargestellt durch ein `struct` in Go)

```go
type Gift []struct {
Gifts []string `json:"gift"`
Types []string `json:"type"`
Sentiments []int `json:"sentiment"`
Amazon []string `json:"amazon"`
}
```
Nach der `analyze` Funktion abgeschlossen ist, der` Gifts`, `Types` und` Sentiments` sind alle gefüllt, aber der `Amazon` Teil ist leer, weil wir das noch nicht getan haben.

Da wir die Analyse des Briefes abgeschlossen haben, nehmen wir alle Ergebnisse, verpacken sie in einige neue Variablen auf, und alles wieder in den Motor Camunda BPM setzen.

Natürlich ist der nächste Schritt ein ähnliches Verfahren zu schaffen für Aufgaben auf der `amazon-search` Warteschlange zu beobachten. Der Prozess ist wirklich identisch mit dem vorherigen, außer dass es für verschiedene Aufgabenkennungen zuhört, und ruft eine andere Methode auf den Instanzvariablen auszuführen.

Sobald die `amazon-search` Aufgabe (und der` Amazon` Teil der Datenstruktur wird in für jede `GESCHENK` Idee gefüllt) abgeschlossen ist, wird das Ganze zu Camunda BPM und die Aufgabe zurückgegeben wird als erledigt markiert.

Was es auf den `email` Teil bewegt.

Wiederum wird ein `processor` für` email` Aufgaben zu hören definiert, behaupten sie, und dann zusammensetzen und die E-Mail an den Empfänger senden. Sobald dies geschehen ist, wird die Aufgabe als erledigt markiert, und kehrte zurück.

Schließlich haben wir eine Aufgabe, die speichert alle `Gifts` in einer Datenbank, so dass der Weihnachtsmann kann sehen, welche Art von Geschenken Menschen für dieses Jahr gefragt. Er kann eingezogen werden, muss aber noch einen Finger am Puls der Zeit zu halten, was Kinder wollen!

## Work Flow Completion

Dieser gesamte Workflow ist äußerst effizient. Es schließt im Allgemeinen in wenigen Sekunden am meisten. Es ist so schnell, in der Tat, dass der Weihnachtsmann nicht einmal alle Prozesse sieht in Cockpit sitzen! Es sei denn, es gibt ein Problem. Welche wird es nicht sein, denn Sankt will nicht gestört werden.

## Verbesserungswürdige Bereiche

Natürlich könnte der NLP Teil wesentlich verbessert werden. Sankt verwendete einfach das freie-Tier von Googles Natural Language Processing-Engine, mit Null-Anpassungen und nahm die Ergebnisse ohne weitere Analyse. (Muss ich Sie von Sankt Faulheit an dieser Stelle daran erinnern?).

Ferner könnte der Amazon Suchteil * viel sein * besser mit einem Konto tatsächlichen Amazon Reseller. Vielleicht nächstes Jahr.

Wenn Sie denken, andere Bereiche für Verbesserungen können - und es muss eine Menge sein! - Sie fühlen sich frei zu erreichen, um [David G. Simmons](mailto:david.simmons@camunda.com), Haupt Entwickler Anwalt bei Camunda, die für die Unterstützung von Santa verantwortlich war, diesen gesamten Prozess erhalten einrichten.

[Schreiben Sie Ihren eigenen Brief!](https://write-a-letter-to-santa.org)

![Schreiben Sie Ihren eigenen Brief](/posts/category/camunda/santa.png)
