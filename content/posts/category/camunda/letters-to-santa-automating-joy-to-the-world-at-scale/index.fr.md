---
title: "Lettres au Père Noël - Automatiser la joie dans le monde, à grande échelle"
Date: 2020-12-18
Author: davidgs
Category: BPMN, DevRel
Slug: letters-to-santa-automating-joy-to-the-world-at-scale
hero: images/santa.jpg
reading_time: 18 minutes
---

![Père Noël sur un vélo aquatique](/posts/category/camunda/slack-imgs.com-2-1024x639.jpg)

C'est à nouveau cette période de l'année. Le moment où la plus grande opération de traitement des commandes au monde subit sa charge la plus lourde. Non, pas Amazon - nous parlons de Santa Claus, Inc. - la plus grande entreprise de logistique au monde, avec une fenêtre de livraison mondiale de 24 heures à la charge de pointe.

Cette année est cependant différente. Plus tôt cette année, Saint Nick a cliqué sur une publicité sur son fil Facebook, promettant un style de vie numérique nomade en automatisant son entreprise. Marre du temps arctique et du stress des voyages, l'idée de s'asseoir sur une plage en Thaïlande - tout en apportant toujours de la joie aux enfants du monde entier - était séduisante.

Le Père Noël a payé le cours et a appliqué les principes de l'automatisation des processus, de la décomposition et de la distribution des tâches et de l'intégration avec des services tiers à son entreprise.

Maintenant, il se détend sur une plage de Koh Samui, tandis que l'automatisation apporte de la joie au monde - à grande échelle.

Ainsi, ce Noël, les lettres des enfants au Père Noël sont acheminées vers des associés indépendants (leurs parents), qui exécutent les commandes via Amazon. La transformation réussie de l'entreprise du Père Noël est devenue une étude de cas, que nous allons partager avec vous ici.

Voici comment procéder.

## Le Front End

Étant donné que le Père Noël est un gars moderne, et au cas où il aurait besoin de compléter son revenu de retraite par un travail de développement contractuel, le Père Noël a décidé de suivre un cours intensif pour apprendre à programmer dans React.js. Cela ressemblait à ce que faisaient tous les enfants cool, alors le Père Noël voulait essayer.

Bien que c'était plus difficile qu'il ne le pensait, grâce à beaucoup de recherches approfondies sur Google et à beaucoup de copier-coller (rappelez-vous les enfants, les bons développeurs copient, les grands développeurs collent!), Il a pu créer un site qui au moins semble passable et gère la fonction simple d'accepter une lettre au Père Noël et de la soumettre au moteur de processus.

Pour le moteur de processus, le Père Noël a bien sûr choisi [Camunda](https://camunda.com)!

Une fois le formulaire conçu, il ne restait plus qu'à soumettre le formulaire en utilisant du JavaScript:

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
Utiliser une simple alerte pour faire savoir à l'utilisateur que le formulaire a été soumis était le chemin de moindre résistance, et le Père Noël devenait paresseux.

## Le processus

Traiter une lettre en la transmettant aux parents telle quelle semblait un peu trop paresseux, même pour le Père Noël, alors il a rapidement conçu un processus commercial utilisant [Cawemo](https://cawemo.com) pour gérer le routage des lettres .

Voici à quoi ressemble ce processus:

![Lettre au processus d'affaires du père Noël](/posts/category/camunda/santa-1024x270.jpg)

Et voici le flux:

1) Une lettre entre, qui lance le processus.
2) La lettre est analysée à l'aide de certains algorithmes de traitement du langage naturel (PNL) pour extraire certaines parties de la lettre pour aider à comprendre ce que l'auteur demande:
1) Identifiez tous les éléments que l'auteur demande.
2) Faites une analyse des sentiments pour essayer de déterminer à quel point chaque élément est important pour l'écrivain.
3) S'il n'y a aucun élément identifié, alors la lettre est acheminée vers un processus manuel où l'un des Elfes peut faire une enquête plus approfondie et mettre à jour la liste.
4) Une fois que cela est fait, allez trouver quelques liens Amazon possibles pour les choses identifiées.
5) Envoyez une lettre aux parents avec une copie de la lettre originale, les articles qu'ils ont demandés (liés à Amazon bien sûr) et quelques conseils utiles sur ce que l'écrivain voulait le plus.
6) Stockez les informations sur le produit dans une base de données locale pour une analyse ultérieure.

Maintenant, avant que quiconque tente de faire condamner le Père Noël à une amende pour non-respect du RGPD, il ne stocke aucun nom, adresse e-mail ou toute autre donnée personnelle. Le Père Noël sait déjà tout de vous! Il ne fait que stocker les articles demandés. Il peut donc faire une analyse de la génération de la demande plus tard, bien sûr.

Le Père Noël a écrit un serveur Web assez basique dans `Go` pour gérer les lettres entrantes et les soumettre au moteur de traitement Camunda BPM:

```go
http.HandleFunc("/santa", santa)
err := http.ListenAndServe(":9091", nil) // set listen port
if err != nil {
  log.Fatal("ListenAndServe: ", err)
}
```

Et puis une fonction de gestionnaire:

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

Il a dû autoriser CORS à autoriser la publication de données d'origine croisée. C'est plutôt un point clé dans tout cela, car le serveur fonctionne ici sur un port différent de celui du serveur qui gère l'envoi des lettres.

Après cela, un peu de magie avec le [Camunda Go Client](https://github.com/citilinkru/camunda-client-go) et la lettre est envoyée au Camunda BPM Process Engine.

## Traitement du langage naturel?

Oui, c'est une forme d'intelligence artificielle (IA) qui vous permet de décomposer un texte écrit et d'en identifier des parties en fonction de certains critères. Bien fait, cela peut être très précis.

Alors prenons un exemple de lettre:

> Cher Père Noël,
>
> Je m'appelle Leon et j'ai 36 ans (ouais, je crois toujours au Père Noël 😇)
>
> Cette année, j'ai été le meilleur enfant de tous les temps, donc je mérite un gros cadeau ...
>
> Je pensais à une jolie boîte LEGO comme le kit skyline ou celui de New York. Si ce n'est pas une option, je me contenterais aussi d'un bon chocolat!
>
> Merci,
> Léon

Maintenant, vous et moi pouvons facilement choisir les «objets» dans cette lettre qui seraient des cadeaux, mais il s'avère que faire cela est plus difficile qu'il n'y paraît.

Lorsque nous exécutons cela via notre processeur NLP, nous obtenons:

<pre>Cette année, j'ai été le meilleur enfant de tous les temps, alors je mérite un gros cadeau ...
Sentiment: 0,300000, élément positif: nom Type: AUTRE
Phrase: Je pensais à une jolie boîte LEGO comme le kit Skyline ou celui de New York.
Sentiment: 0,200000, positif Article: boîte LEGO Type: AUTRE
Article: kit skyline Type: AUTRE
Phrase: Si ce n'est pas une option, je me contenterais aussi d'un bon chocolat!
Sentiment: 0,700000, élément positif: option Type: AUTRE
Article: chocolat Type: AUTRE
Phrase: Merci,
Léon
Sentiment: 0.800000, positif
</pre>
Hmmm ... Pas génial.

Si Léon avait écrit au Père Noël une lettre plus spécifique, nous aurions pu obtenir de meilleurs résultats pour lui:

> Cher Père Noël,
>
> Je m'appelle Leon et j'ai 36 ans (ouais, je crois toujours au Père Noël 😇)
>
> Cette année, j'ai été le meilleur enfant de tous les temps, donc je mérite un gros cadeau ...
>
> Je pensais à un joli kit skyline Lego ou au kit Lego New York City Skyline.
>
> Si ce n'est pas une option, je me contenterais aussi d'un bon chocolat belge!
>
> Merci,
> Léon

Lorsque nous traitons cette lettre, nous obtenons de meilleurs résultats:

<pre>La lettre comprend 4 phrases.
Phrase: Cher Père Noël, Je m'appelle Leon et j'ai 36 ans (ouais, je crois toujours au Père Noël: innocent :) Cette année, j'ai été le plus bon enfant de tous les temps, donc je mérite un gros cadeau ...
Sentiment: 0,500000, élément positif: nom Type: AUTRE
Article: Père Noël Type: AUTRE
Phrase: Je pensais à un joli kit skyline Lego ou au kit Lego New York City Skyline.
Sentiment: 0.000000, positif Article: kit skyline Type: AUTRE
Article: Lego Type: ORGANISATION
Article: Skyline Type de kit: CONSUMER_GOOD
Phrase: Si ce n'est pas une option, je me contenterais aussi d'un bon chocolat belge!
Sentiment: 0,400000, élément positif: option Type: AUTRE
Article: Chocolat belge Type: CONSUMER_GOOD
Phrase: Merci, Léon
Sentiment: 0.800000, positif
</pre>
Vous remarquerez que nous avons maintenant identifié certains `CONSUMER_GOODS` dans la lettre, qui sont*beaucoup* plus faciles à trouver.

Voyons donc comment le Père Noël a trouvé des liens.

## Et s'il n'y a pas de CONSUMER_GOODS?

C'est là qu'intervient la magie des processus et des formulaires manuels, bien sûr. Nous avons une passerelle exclusive qui vérifie si des `CONSUMER_GOODS` ont été identifiés. Sinon, il serait plus difficile pour le processus de recherche Amazon de trouver quelque chose de significatif.

C'est dans cette partie du processus que les Elfes entrent en jeu. Ils n'ont pas tous perdu leur emploi une fois que toute l'opération a été automatisée! Mais ils*ont* pu * rejoindre le mouvement "Work From Home", alors maintenant ils font leur travail où qu'ils veulent! (Cherchez des elfes dans votre quartier!)

Disons que Léon avait écrit une lettre qui disait juste "Je veux la paix dans le monde. Et j'aimerais l'harmonie". Bien que ce soient de nobles idéaux, ce ne sont pas vraiment des choses qui peuvent être commandées sur Amazon (du moins pas encore).

Voici la forme que reçoivent les Elfes lorsqu'une lettre leur est acheminée pour intervention:
![Quand le formulaire arrive](/posts/category/camunda/form1-1024x257.jpg)

Et puis après que les Elfes y ont réfléchi, vérifié la liste Naughty / Nice, ils peuvent mettre à jour les éléments:
![Formulaire Articles mis à jour](/posts/category/camunda/form2-1024x250.jpg)

Le formulaire est ensuite renvoyé dans le processus.

Il y a cependant un peu de travail à faire pour créer le formulaire. La première chose à faire est de construire le formulaire selon la [docs](https://docs.camunda.org/manual/7.5/reference/embedded-forms/javascript/lifecycle/). Puisque le Père Noël a tout mis dans un objet JSON lorsque la lettre a été analysée, il avait un peu plus de travail à faire.

Modifiez les cadeaux pour les rechercher plus facilement

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


Le Père Noël devait créer tous les éléments du formulaire à la volée, puis les relire dans la variable d'instance à la fin.

Maintenant, voici le point délicat: si vous téléchargez un formulaire avec votre diagramme, vous ne pouvez pas utiliser l'interface simple fournie par le modélisateur. Vous devez utiliser un processus manuel. Père Noël, étant un gars de la ligne de commande de la vieille école, a utilisé `curl`:

<pre>curl -w «n» - cookie cookie.txt
-H "Accepter: application / json"
-F "nom-de-déploiement = père Noël"
-F "enable-duplicate-filtering = false"
-F "deploy-changed-only = false"
-F "santa.bpmn=@/Users/santa/Downloads/santa.bpmn"
-F "ManualLetter.html=@/Users/santa/github.com/letter-to-santa/src/ManualLetter.html"
http://santa-server.com:8080/engine-rest/deployment/create
</pre>
Cela télécharge le fichier BPMN et le formulaire sur le serveur Camunda BPM, puis lorsque le processus manuel est appelé, le formulaire apparaît!

## Recherche de liens

Être père Noël et avoir toute une * année * pour planifier cela, vous auriez pensé que le père Noël aurait pu être mieux préparé, mais, eh bien, la décision de prendre sa retraite était en quelque sorte de dernière minute, et la plage en Thaïlande était tellement belle en quelque sorte oublié quelques détails.

Le principal détail qu'il a oublié était de créer un compte vendeur Amazon, qui lui aurait donné accès à l'API de recherche de produits. Avec cela, il aurait pu faire un bien meilleur travail en recherchant des produits, en regardant les résultats, etc.

Ce n'était pas le cas, hélas. Mais heureusement, l'un des elfes les plus intelligents du Père Noël est intervenu à la dernière minute et lui a dit de simplement utiliser une URL de recherche Amazon. L'année prochaine, le Père Noël y sera mieux préparé.

## Envoi de l'e-mail


Puisque le Père Noël ne voulait pas vraiment faire, eh bien, beaucoup de choses, même la partie e-mail était automatisée.

Il a pris toutes les informations recueillies lors des étapes précédentes et les a rassemblées dans un joli courrier électronique adressé aux parents:

> Salutations de saisons!
>
> Devinez quoi? Léon m'a écrit une lettre demandant quelques petites choses. Comme je me suis maintenant retiré sur une plage de Thaïlande, j'ai pensé que vous aimeriez peut-être savoir ce que Lean demandait. Voici la lettre:
>
>> "Cher Père Noël,
>>
>> Je m'appelle Leon et j'ai 36 ans (ouais, je crois toujours au Père Noël 😇)
>>
>> Cette année, j'ai été le meilleur enfant de tous les temps, donc je mérite un gros cadeau ...
>>
>> Je pensais à un joli kit skyline Lego ou au kit Lego New York City Skyline.
>>
>> Si ce n'est pas une option, je me contenterais aussi d'un bon chocolat belge!
>>
>> Merci,
>> Léon "
>
> J'ai pris la liberté de savoir quelles choses ils voulaient le plus et je vous ai fourni une liste afin que vous puissiez simplement acheter ces articles directement. Ne vous inquiétez pas, les Elfes ne sont pas au chômage! Ils travaillent de chez eux pour surveiller tous les processus. Et non, ils ne sont pas disponibles à l'achat.
>
> Donc, cette liste:
>
> - kit skyline ⁉️
> - Kit Lego Skyline ⁉️
> - Chocolat Belge ❗️
>
> Au cas où vous vous poseriez la question, depuis que je suis à la retraite, je suis aussi paresseux. J'ai donc utilisé une certaine intelligence artificielle (qui n'est vraiment pas si intelligente) pour en quelque sorte `` noter '' ce qu'ils ont demandé. J'aurais pu commander la liste, mais comme je viens de vous le dire, je suis à la retraite et paresseux. Voici le système de notation:
>
> - ⚠️: meh.
> - ⁉️: Ok, je suppose.
> - ❗: Maintenant, nous parlons!
> -‼ ️: Oh s'il te plait! Oh s'il vous plait! Oh s'il vous plait!
>
> Tout le meilleur de moi et Mme Claus
>
> -
> PS: veuillez ne pas écrire à cette adresse e-mail. Je suis à la retraite!
>
> [Écrivez votre propre lettre!](https://write-a-letter-to-santa.org)

Le Père Noël était maintenant terminé. Et il n'avait pas besoin de lever le petit doigt!

## Comment a-t-il tout fait?

Il a fallu écrire du code, mais le Père Noël a pu utiliser la bibliothèque cliente de Camunda Golang pour tout gérer.

Comme nous l'avons vu, une fois la lettre envoyée, le serveur Web a créé une nouvelle tâche dans Camunda et l'a soumise, ainsi que toutes les variables de processus dont il avait besoin pour suivre (pour commencer, juste le `nom`,` l'adresse e-mail` et la «lettre» elle-même). Nous avons déjà vu comment cela a été fait.

Mais une fois que cela a été soumis comme une tâche, comment cette tâche a-t-elle été gérée?

## Gérer une tâche

C'est la partie technique. Dans ce même processus Go qui gère les lettres entrantes (même si cela aurait pu être dans un processus complètement séparé), nous écoutons les nouvelles tâches sur la file d'attente `santa`. Plus précisément, nous écoutons d'abord les tâches d'extraction nlp.

Tout d'abord, nous devons créer un client pour le moteur Camunda BPM:
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
Une fois que nous avons le client, nous pouvons commencer à créer des processus qui surveillent les différentes files d'attente de tâches. Donc pour la file d'attente NLP:

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
Ce processus de création de processus est également fourni par le [Go Client](https://github.com/citilinkru/camunda-client-go/processor).

Le processus est créé, en utilisant le `client` créé précédemment, et en indiquant au processus quelles tâches écouter, combien de temps pour verrouiller la tâche (afin que personne d'autre n'essaie de la réclamer et de la traiter) et ensuite ce qu'il faut documenter une fois que la tâche est revendiqué. Un objet `Variable` du client Camunda est créé, puis la fonction` analyser () `est appelée.

La fonction d'analyse renvoie la «Variable» qui a été remplie avec toutes les pièces identifiées. Ceux-ci sont tous stockés dans un objet JSON (représenté par un `struct` dans Go)

```go
type Gift []struct {
Gifts []string `json:"gift"`
Types []string `json:"type"`
Sentiments []int `json:"sentiment"`
Amazon []string `json:"amazon"`
}
```
Une fois la fonction `analyser` terminée, les` cadeaux`, `types` et` sentiments` sont tous remplis, mais la partie `Amazon` est vide car nous ne l'avons pas encore fait.

Depuis que nous avons terminé l'analyse de la lettre, nous prenons tous les résultats, les regroupons dans de nouvelles variables et remettons le tout dans le moteur Camunda BPM.

Bien sûr, l'étape suivante consiste à créer un processus similaire pour surveiller les tâches de la file d'attente `amazon-search`. Le processus est vraiment identique au précédent, sauf qu'il écoute différents identificateurs de tâche et appelle une méthode différente à exécuter sur les variables d'instance.

Une fois la tâche `amazon-search` terminée (et la partie` Amazon` de la structure de données est remplie pour chaque idée `Gift`), le tout est renvoyé à Camunda BPM et la tâche est marquée comme terminée.

Ce qui le déplace vers la partie «e-mail».

Encore une fois, un `processeur` est défini pour écouter les tâches` e-mail`, les réclamer, puis composer et envoyer l'e-mail au destinataire. Une fois cette opération effectuée, la tâche est marquée comme terminée et renvoyée.

Enfin, nous avons une tâche qui stocke tous les «cadeaux» dans une base de données afin que le Père Noël puisse voir quels types de cadeaux les gens ont demandé cette année. Il est peut-être à la retraite, mais il doit tout de même savoir ce que les enfants veulent!

## Achèvement du flux de travail

L'ensemble de ce flux de travail est extrêmement efficace. Il se termine généralement en quelques secondes au maximum. C'est tellement rapide, en fait, que le Père Noël ne peut même pas voir de processus dans Cockpit! Sauf s'il y a un problème. Ce qu'il n'y en aura pas, car le Père Noël ne veut pas être dérangé.

## Zones d'amélioration

Bien entendu, la partie PNL pourrait être considérablement améliorée. Le Père Noël a simplement utilisé le niveau gratuit du moteur de traitement du langage naturel de Google, sans aucun ajustement, et a pris les résultats sans aucune analyse supplémentaire. (Dois-je vous rappeler la paresse du Père Noël à ce stade?).

En outre, la partie de recherche Amazon pourrait être*bien* meilleure avec un compte revendeur Amazon réel. Peut être l'année prochaine.

Si vous pouvez penser à d'autres domaines à améliorer - et il doit y en avoir beaucoup! - N'hésitez pas à contacter [David G. Simmons](mailto:david.simmons@camunda.com), Principal Developer Advocate chez Camunda qui était chargé d'aider le Père Noël à mettre en place tout ce processus.

[Écrivez votre propre lettre!](https://write-a-letter-to-santa.org)

![Écrivez votre propre lettre](/posts/category/camunda/santa.jpg)
