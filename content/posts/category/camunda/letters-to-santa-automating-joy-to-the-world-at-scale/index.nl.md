---
title: "Letters to Santa - Automating Joy to the World, At Scale"
Date: 2020-12-18
Author: davidgs
Category: BPMN, DevRel
Slug: letters-to-santa-automating-joy-to-the-world-at-scale
hero: images/santa.jpg
reading_time: 17 minutes
---

![Kerstman op een waterfiets](/posts/category/camunda/slack-imgs.com-2-1024x639.jpg)

Het is weer die tijd van het jaar. De tijd waarin 's werelds grootste orderafhandelingsoperatie de zwaarste belasting ervaart. Nee, niet Amazon - we hebben het over Santa Claus, Inc. - het grootste logistieke bedrijf ter wereld, met een wereldwijde bezorgperiode van 24 uur bij piekbelasting.

Dit jaar is echter anders. Eerder dit jaar klikte Saint Nick op een advertentie op zijn Facebook-feed, waarin hij een digitale nomadenlevensstijl beloofde door zijn bedrijf te automatiseren. Ziek van het poolweer en de stress van reizen, was de gedachte om op een strand in Thailand te zitten - terwijl het nog steeds kinderen over de hele wereld vreugde bezorgt - aanlokkelijk.

De Kerstman betaalde voor de cursus en paste de principes van procesautomatisering, taakontleding en -distributie en integratie met services van derden toe op zijn bedrijf.

Nu trapt hij terug op een strand op Koh Samui, terwijl de automatisering de wereld vreugde brengt - op grote schaal.

Dus deze kerst worden de brieven van kinderen aan de kerstman doorgestuurd naar onafhankelijke medewerkers (hun ouders), die de bestellingen uitvoeren via Amazon. De succesvolle bedrijfstransformatie van de Kerstman werd een casestudy, die we hier met u zullen delen.

Hier is hoe het moet.

## De voorkant

Gezien het feit dat de Kerstman een moderne man is, en voor het geval hij zijn pensioeninkomen moest aanvullen met wat contractontwikkelingswerk aan de voorkant, besloot de Kerstman een spoedcursus te volgen om te leren programmeren in React.js. Het leek erop dat alle coole kinderen aan het doen waren, dus de kerstman wilde het proberen.

Hoewel het moeilijker was dan hij dacht, kon hij dankzij veel hardcore googlen en veel copy-paste (onthoud kinderen, goede ontwikkelaars kopiëren, geweldige ontwikkelaars plakken!) Een site bedenken die op zijn minst ziet er redelijk uit, en behandelt de eenvoudige functie van het accepteren van een brief aan de kerstman en het indienen ervan bij de procesengine.

Voor de process engine koos Santa natuurlijk [Camunda](https://camunda.com)!

Nadat het formulier was ontworpen, hoefde u het formulier alleen nog maar in te dienen met behulp van JavaScript:

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
Het gebruik van een eenvoudige waarschuwing om de gebruiker te laten weten dat het formulier was ingediend, was de weg van de minste weerstand, en de kerstman werd lui.

## Het proces

Het afhandelen van een brief door deze gewoon door te sturen naar de ouders leek een beetje te lui, zelfs voor de kerstman, dus ontwierp hij snel een bedrijfsproces met [Cawemo](https://cawemo.com) om de routering van de brieven af te handelen .

Hier is hoe dat proces eruit ziet:

![Brief aan het bedrijfsproces van de kerstman](/posts/category/camunda/santa-1024x270.jpg)

En hier is de stroom:

1) Er komt een brief binnen, waarmee het proces wordt gestart.
2) De brief wordt geanalyseerd met behulp van enkele Natural Language Processing (NLP) -algoritmen om enkele delen van de brief te extraheren om erachter te komen waar de schrijver om vraagt:
1) Identificeer alle items waar de schrijver om vraagt.
2) Voer wat sentimentanalyse uit om te proberen erachter te komen hoe belangrijk elk item voor de schrijver is.
3) Als er geen items zijn geïdentificeerd, wordt de brief doorgestuurd naar een handmatig proces waar een van de Elfen wat meer onderzoek kan doen en de lijst kan bijwerken.
4) Zodra dit is gebeurd, ga je op zoek naar enkele mogelijke Amazon-links voor de geïdentificeerde dingen.
5) Stuur een brief naar de ouders met een kopie van de originele brief, de items waar ze om vroegen (uiteraard gekoppeld aan Amazon) en enkele handige tips over wat de schrijver het liefst wilde.
6) Bewaar de productinformatie in een lokale database voor latere analyse.

Voordat iemand probeert om de Kerstman een boete te geven wegens het niet naleven van de AVG, slaat hij geen namen, e-mailadressen of andere persoonlijke gegevens op. De kerstman weet al alles van je! Hij bewaart alleen de items waarom gevraagd wordt. Zodat hij later natuurlijk een vraag-genanalyse kan doen.

Santa schreef een vrij eenvoudige webserver in `Go` om de inkomende brieven af te handelen, en deze in te dienen bij de Camunda BPM-verwerkingsengine:

```go
http.HandleFunc("/santa", santa)
err := http.ListenAndServe(":9091", nil) // set listen port
if err != nil {
  log.Fatal("ListenAndServe: ", err)
}
```

En dan een handlerfunctie:

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

Hij moest CORS wel inschakelen om cross-origin posten van gegevens toe te staan. Dat is nogal een belangrijk punt in dit alles, aangezien de server hier op een andere poort draait dan de server die het posten van de brieven afhandelt.

Daarna een beetje magie met de [Camunda Go Client](https://github.com/citilinkru/camunda-client-go) en de brief wordt verzonden naar de Camunda BPM Process Engine.

## Natuurlijke taalverwerking?

Ja, het is een vorm van kunstmatige intelligentie (AI) waarmee u geschreven tekst kunt opsplitsen en delen ervan kunt identificeren op basis van bepaalde criteria. Goed gedaan, het kan heel nauwkeurig zijn.

Dus laten we een voorbeeldbrief nemen:

> Beste Kerstman,
​
> Mijn naam is Leon en ik ben 36 jaar oud (ja, ik geloof nog steeds in de kerstman 😇)
​
> Dit jaar ben ik de braafste jongen ooit geweest, dus ik verdien een groot cadeau ...
​
> Ik dacht aan een mooie LEGO-doos, zoals de skyline-kit of de New York City-doos. Als dat geen optie is, zou ik ook genoegen nemen met goede chocolade!
​
> Dank je wel,
> Leon

Nu kunnen jij en ik gemakkelijk de 'items' in die brief uitkiezen die cadeaus zouden zijn, maar het blijkt dat dat moeilijker is dan het lijkt.

Als we dat door onze NLP-processor halen, krijgen we:

<pre>Dit jaar ben ik de braafste jongen ooit geweest, dus ik verdien een groot cadeau ...
Sentiment: 0,300000, positief Item: naam Type: OTHER
Zin: ik dacht aan een mooie LEGO-doos zoals de skyline-kit of de New York City-doos.
Sentiment: 0.200000, positief Item: LEGO box Type: OTHER
Artikel: skyline kit Type: OVERIGE
Zin: als dat geen optie is, zou ik ook genoegen nemen met wat goede chocolade!
Sentiment: 0,700000, positief Item: optie Type: OTHER
Item: chocolade Type: ANDERE
Zin: Bedankt,
Leon
Sentiment: 0,800000, positief
</pre>
Hmmm ... Niet geweldig.

Als Leon de Kerstman een specifiekere brief had geschreven, hadden we betere resultaten voor hem kunnen krijgen:

> Beste Kerstman,
​
> Mijn naam is Leon en ik ben 36 jaar oud (ja, ik geloof nog steeds in de kerstman 😇)
​
> Dit jaar ben ik de braafste jongen ooit geweest, dus ik verdien een groot cadeau ...
​
> Ik dacht aan een leuke Lego skyline kit of de Lego New York City Skyline Kit.
​
> Als dat geen optie is, neem ik ook genoegen met lekkere Belgische chocolade!
​
> Dank je wel,
> Leon

Als we die brief verwerken, krijgen we betere resultaten:

<pre>Brief is 4 zinnen lang.
Zin: Beste Kerstman, mijn naam is Leon en ik ben 36 jaar oud (ja, ik geloof nog steeds in de kerstman: onschuldig :) Dit jaar ben ik de braafste jongen ooit geweest, dus ik verdien een groot cadeau ...
Sentiment: 0,500000, positief Item: naam Type: OTHER
Item: Santa Type: OTHER
Zin: ik dacht aan een leuke Lego skyline kit of de Lego New York City Skyline Kit.
Sentiment: 0.000000, positief Artikel: skyline kit Type: OVERIGE
Item: Lego Type: ORGANISATIE
Artikel: Skyline Kit Type: CONSUMER_GOOD
Zin: als dat geen optie is, zou ik ook genoegen nemen met een goede Belgische chocolade!
Sentiment: 0.400000, positief Item: optie Type: OTHER
Artikel: Belgische chocolade Type: CONSUMER_GOOD
Zin: Bedankt, Leon
Sentiment: 0,800000, positief
</pre>
U zult zien dat we nu enkele `CONSUMER_GOODS` in de brief hebben geïdentificeerd, die*veel* gemakkelijker te vinden zijn.

Laten we dus eens kijken hoe de Kerstman omging met het vinden van links.

## En als er geen CONSUMER_GOODS zijn?

Dat is natuurlijk waar de magie van handmatige processen en formulieren om de hoek komt kijken. We hebben een exclusieve gateway die controleert of er 'CONSUMER_GOODS' zijn geïdentificeerd. Zo niet, dan zou het voor het Amazon-zoekproces moeilijker zijn om iets zinvols te vinden.

Dit deel van het proces is waar de Elfen in het spel komen. Ze raakten niet allemaal hun baan kwijt toen de hele operatie eenmaal was geautomatiseerd! Maar ze*waren* in staat om lid te worden van de "Work From Home" -beweging, dus nu doen ze hun werk waar ze maar willen! (Zoek naar elfen in uw buurt!)

Stel dat Leon een brief had geschreven waarin stond: "Ik wil wereldvrede. En ik zou van harmonie houden". Hoewel dat verheven idealen zijn, zijn het niet echt dingen die bij Amazon kunnen worden besteld (althans nog niet).

Dit is het formulier dat de Elfen krijgen als er een brief naar hen wordt gestuurd voor interventie:
![Wanneer het formulier arriveert](/posts/category/camunda/form1-1024x257.jpg)

En nadat de Elfen erover hebben nagedacht, de Naughty / Nice-lijst hebben gecontroleerd, kunnen ze de items bijwerken:
![Bijgewerkte items formulier](/posts/category/camunda/form2-1024x250.jpg)

Het formulier wordt vervolgens teruggestuurd naar het proces.

Er is echter een beetje werk te doen bij het bouwen van het formulier. Het eerste is om het formulier op te bouwen volgens de [docs](https://docs.camunda.org/manual/7.5/reference/embedded-forms/javascript/lifecycle/). Omdat de Kerstman alles in een JSON-object stopte toen de brief werd geparseerd, had hij nog wat meer werk te doen.

Bewerk cadeaus zodat u er gemakkelijker naar kunt zoeken

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


De kerstman moest alle formulierelementen on-the-fly maken en ze vervolgens aan het einde teruglezen in de instantievariabele.

Nu, hier is het lastige deel: als u een formulier samen met uw diagram uploadt, kunt u de eenvoudige interface van de Modeler niet gebruiken. U moet een handmatig proces gebruiken. Santa, die een old-school command-line man was, gebruikte `curl`:

<pre>curl -w "n" - cookie cookie.txt
-H "Accepteren: applicatie / json"
-F "deployment-name = santa"
-F "enable-duplicate-filtering = false"
-F "deploy-change-only = false"
-F "santa.bpmn=@/Users/santa/Downloads/santa.bpmn"
-F "ManualLetter.html=@/Users/santa/github.com/letter-to-santa/src/ManualLetter.html"
http://santa-server.com:8080/engine-rest/deployment/create
</pre>
Dat uploadt het BPMN-bestand en het formulier naar de Camunda BPM-server, en wanneer het handmatige proces wordt aangeroepen, verschijnt het formulier!

## Links vinden

Omdat je Kerstman bent, en je hebt een heel*jaar* om dit te plannen, zou je hebben gedacht dat de Kerstman beter had kunnen voorbereid zijn, maar de beslissing om met pensioen te gaan was een soort last-minute, en het strand in Thailand was zoooo leuk, hij een paar details vergeten.

Het belangrijkste detail dat hij vergat, was het aanmaken van een Amazon-verkopersaccount, waarmee hij toegang zou hebben gekregen tot de productzoek-API. Daarmee had hij veel beter naar producten kunnen zoeken, naar de resultaten kunnen kijken, enz.

Dit was helaas niet het geval. Maar gelukkig stapte een van de slimmere elfjes van de kerstman op het laatste moment op en zei hem dat hij gewoon een Amazon-zoek-URL moest gebruiken. Volgend jaar zal de Kerstman hier beter op voorbereid zijn.

## De e-mail verzenden


Omdat de kerstman eigenlijk niet veel van alles wilde doen, was zelfs het e-mailgedeelte geautomatiseerd.

Hij nam alle informatie die in de vorige stappen was verzameld en bracht het allemaal samen in een leuke e-mail aan de ouders:

> Seizoensgroeten!
​
> Raad eens? Leon heeft me een brief geschreven waarin hij om een paar dingen vraagt. Omdat ik me nu teruggetrokken heb op een strand in Thailand, dacht ik dat je misschien wel zou willen weten waar Lean om vroeg. Hier is de brief:
​
>> "Beste kerstman,
​
>> Mijn naam is Leon en ik ben 36 jaar oud (ja, ik geloof nog steeds in de kerstman 😇)
​
>> Dit jaar ben ik de braafste jongen ooit geweest, dus ik verdien een groot cadeau ...
​
>> Ik dacht aan een leuke Lego skyline kit of de Lego New York City Skyline Kit.
​
>> Als dat geen optie is, neem ik ook genoegen met lekkere Belgische chocolade!
​
>> Bedankt,
>> Leon "
​
> Ik heb de vrijheid genomen om uit te zoeken welke dingen ze het liefst willen, en heb je een lijst gegeven zodat je deze items gewoon rechtstreeks kunt kopen. Maak je geen zorgen, de Elfen zitten niet zonder werk! Ze werken vanuit huis om alle processen te monitoren. En nee, ze zijn niet te koop.
​
> Dus die lijst:
​
> - skyline kit ⁉️
> - Lego Skyline Kit ⁉️
> - Belgische chocolade ❗️
​
> Voor het geval je het je afvraagt, sinds ik met pensioen ben, ben ik ook lui. Dus ik heb wat kunstmatige intelligentie gebruikt (wat echt niet zo intelligent is) om een soort van 'waardering' te geven aan wat ze vroegen. Ik*had* de lijst kunnen bestellen, maar zoals ik je net vertelde, ben ik met pensioen en lui. Hier is het beoordelingssysteem:
​
> - ⚠️: meh.
> - ⁉️: Ok, denk ik.
> - ❗: Nu praten we!
> -‼ ️: Oh alsjeblieft! Kom op! Kom op!
​
> Het allerbeste van mij en mevrouw Claus
​
​
> PS: schrijf niet terug naar dit e-mailadres. Ik ben met pensioen!
​
> [Schrijf je eigen brief!](https://write-a-letter-to-santa.org)

De kerstman was nu klaar. En hij hoefde geen vinger op te steken!

## Hoe heeft hij het allemaal gedaan?

Het kostte wel wat code, maar Santa kon de Camunda Golang-clientbibliotheek gebruiken om alles af te handelen.

Zoals we zagen, heeft de webserver, nadat de brief was verzonden, een nieuwe taak in Camunda gemaakt en deze ingediend, samen met alle procesvariabelen die nodig waren om bij te houden (om te beginnen alleen de 'naam', 'e-mailadres' en de 'letter' zelf). We hebben al gezien hoe dat werd gedaan.

Maar toen dat eenmaal als taak was ingediend, hoe werd die taak dan afgehandeld?

## Een taak afhandelen

Dit is het technische gedeelte. In datzelfde Go-proces dat de inkomende brieven afhandelt (hoewel het in een volledig apart proces had kunnen zijn), luisteren we naar nieuwe taken in de wachtrij 'santa'. Concreet luisteren we eerst naar `nlp-extractie`-taken.

Eerst moeten we een client maken voor de Camunda BPM-engine:
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
Zodra we de klant hebben, kunnen we beginnen met het maken van een aantal processen die de verschillende taakwachtrijen in de gaten houden. Dus voor de NLP-wachtrij:

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
Dit proces voor het maken van een proces wordt ook verzorgd door de [Go Client](https://github.com/citilinkru/camunda-client-go/processor).

Het proces wordt gemaakt met behulp van de eerder gemaakte `client` en vertelt het proces naar welke taken er moet worden geluisterd, hoe lang de taak moet worden vergrendeld (zodat niemand anders het probeert te claimen en te verwerken) en wat er moet worden gedocumenteerd zodra de taak is voltooid beweerde. Er wordt een Camunda Client `Variable` -object gemaakt en vervolgens wordt de functie` analyse () `aangeroepen.

De analysefunctie retourneert de 'Variabele' die is ingevuld met alle geïdentificeerde onderdelen. Die zijn allemaal opgeslagen in een JSON-object (vertegenwoordigd door een `struct` in Go)

```go
type Gift []struct {
Gifts []string `json:"gift"`
Types []string `json:"type"`
Sentiments []int `json:"sentiment"`
Amazon []string `json:"amazon"`
}
```
Nadat de functie `analyseren` is voltooid, worden de` Geschenken`, `Typen` en` Gevoelens` allemaal ingevuld, maar het `Amazon`-gedeelte is leeg omdat we dat nog niet hebben gedaan.

Omdat we de analyse van de brief hebben voltooid, nemen we alle resultaten, verpakken ze in enkele nieuwe variabelen en plaatsen alles weer in de Camunda BPM-engine.

De volgende stap is natuurlijk om een soortgelijk proces te maken om te kijken naar taken in de wachtrij 'amazon-search'. Het proces is eigenlijk identiek aan het vorige, behalve dat het naar verschillende taak-ID's luistert en een andere methode aanroept om uit te voeren op de instantievariabelen.

Zodra de taak 'amazon-zoeken' is voltooid (en het 'Amazon'-gedeelte van de gegevensstructuur is ingevuld voor elk' cadeau'-idee), wordt het geheel teruggestuurd naar Camunda BPM en wordt de taak gemarkeerd als voltooid.

Dat verplaatst het naar het 'e-mail'-gedeelte.

Nogmaals, een 'processor' is gedefinieerd om te luisteren naar 'e-mail'-taken, deze op te eisen en vervolgens de e-mail op te stellen en naar de ontvanger te verzenden. Zodra dit is gebeurd, wordt de taak gemarkeerd als voltooid en geretourneerd.

Ten slotte hebben we een taak die alle `Giften` in een database opslaat, zodat de Kerstman kan zien wat voor soort cadeaus mensen dit jaar hebben gevraagd. Hij is misschien met pensioen, maar moet nog steeds een vinger aan de pols houden van wat kinderen willen!

## Werkstroom voltooien

Deze hele workflow is buitengewoon efficiënt. Het is over het algemeen binnen een paar seconden voltooid. Het is zelfs zo snel dat de kerstman niet eens processen in Cockpit kan zien zitten! Tenzij er een probleem is. Wat er niet zal zijn, want de kerstman wil niet gestoord worden.

## Gebieden voor verbetering

Natuurlijk kan het NLP-gedeelte aanzienlijk worden verbeterd. De kerstman gebruikte gewoon de gratis versie van Google's Natural Language Processing-engine, zonder aanpassingen, en nam de resultaten zonder verdere analyse. (Moet ik je op dit moment herinneren aan de luiheid van de kerstman?).

Verder zou het Amazon-zoekgedeelte*veel* beter kunnen zijn met een echt Amazon Reseller-account. Misschien volgend jaar.

Als u andere verbeterpunten kunt bedenken - en er moet veel zijn! - neem gerust contact op met [David G. Simmons](mailto:david.simmons@camunda.com), Principal Developer Advocate bij Camunda, die verantwoordelijk was voor het helpen van de Kerstman bij het opzetten van dit hele proces.

[Schrijf je eigen brief!](https://write-a-letter-to-santa.org)

![Schrijf je eigen brief](/posts/category/camunda/santa.jpg)
