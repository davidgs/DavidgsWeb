---
title: « Lettres au Père - Automatiser la joie au monde, à l'échelle »
Date: 2020-12-18
Author: davidgs
Category: BPMN, DevRel
Slug: letters-to-santa-automating-joy-to-the-world-at-scale
hero: images/santa.jpg
---

![Père Noël sur un vélo d'eau](/posts/category/camunda/slack-imgs.com-2-1024x639.jpg)

Il est cette période de l'année. Le moment où la plus grande opération expériences d'exécution des commandes sa charge la plus lourde du monde. Non, pas Amazon - nous parlons du Père Noël, Inc. - la plus grande entreprise de logistique dans le monde, avec une fenêtre de livraison globale de 24 heures à charge de pointe.

Cette année est différente, cependant. Plus tôt cette année, Saint Nick a cliqué sur une annonce sur son flux Facebook, promettant un mode de vie nomade numérique grâce à l'automatisation de son entreprise. Malade du climat arctique et le stress du voyage, la pensée d'être assis sur une plage en Thaïlande - tout en apportant de la joie aux enfants à travers le monde - était alléchante.

Père Noël a payé pour le cours et a appliqué les principes de l'automatisation des processus, la décomposition des tâches et de la distribution, et l'intégration avec des services tiers à son entreprise.

Maintenant, il rallumait sur une plage de Koh Samui, tandis que l'automatisation apporte la joie au monde - à l'échelle.

Donc, ce Noël, les lettres des enfants à Santa Giulia sont acheminés aux associés indépendants (leurs parents), qui remplissent les commandes à l'aide Amazon. transformation commerciale réussie du Père Noël est devenu une étude de cas, que nous allons partager avec vous ici.

Voici comment faire.

## Le Front End

Étant donné que le Père Noël est un type moderne, et dans le cas où il avait besoin pour compléter son revenu de retraite avec un travail de développement contrat front-end, Père Noël a décidé de faire un cours intensif dans l'apprentissage de programme React.js. Il semblait que la chose tous les enfants de frais faisaient, si Père Noël a voulu donner un coup de feu.

Bien qu'il était plus difficile qu'il ne le pensait, grâce à beaucoup de googler hard-core, et beaucoup de copier-coller (rappelez-vous les enfants, bons développeurs copier, grands coller les développeurs!), Il a pu trouver un site au moins semble passable, et les poignées de la fonction simple d'accepter une lettre au Père Noël et de le soumettre au moteur de processus.

Pour le moteur de processus de Santa de cours choisi [Camunda](https://camunda.com)!

Une fois le formulaire a été conçu, tout ce qui restait à faire était de soumettre le formulaire en utilisant un peu de JavaScript:

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
En utilisant une simple alerte pour laisser le savoir utilisateur que le formulaire a été soumis était le chemin de moindre résistance, et le Père Noël était devenir paresseux.

## Le processus

Manipulation d'une lettre par tout le transmettre aux parents est-semblait un peu trop paresseux, même pour le Père Noël, donc il a rapidement conçu un processus métier en utilisant [Cawemo](https://cawemo.com) pour gérer l'acheminement des lettres .

Voici ce que les regards de processus comme:

![Lettre au Père Noël Business Process](/posts/category/camunda/santa-1024x270.jpg)

Et voici le flux:

1) Une lettre arrive, qui commence le processus.
2) La lettre est analysée à l'aide des algorithmes de traitement du langage naturel (PNL) pour extraire certaines parties de la lettre à la figure de l'aide à ce que l'auteur demande pour:
1) Identifier tous les éléments de l'écrivain est demandé.
2) Est-ce une analyse pour essayer sentiment de comprendre l'importance de chaque élément est à l'écrivain.
3) S'il n'y a pas d'éléments identifiés, la lettre est acheminée vers un processus manuel où l'un des elfes peuvent faire plus enquête et mettre à jour la liste.
4) Une fois cela fait, allez trouver des possibles liens Amazon pour les objets identifiés.
5) Envoyer une lettre aux parents une copie de la lettre originale, les éléments qu'ils ont demandé (liés à Amazon, bien sûr) et quelques conseils utiles à ce que l'auteur voulait plus.
6) Conservez les informations produit dans une base de données locale pour une analyse ultérieure.

Maintenant, avant que quelqu'un essaie d'avoir une amende de Santa pour non-respect GDPR, il n'enregistrer des noms, adresses e-mail, ou d'autres données personnelles. Père Noël sait déjà tout sur vous! Il a juste stocke les éléments demandés. Il peut donc faire une analyse de la demande gen plus tard, bien sûr.

Père Noël a écrit une jolie serveur web de base dans `Go` pour traiter les lettres entrantes, et de les soumettre au moteur de traitement Camunda BPM:

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

Il ne devra permettre CORS pour permettre l'affichage croisée origine des données. C'est plutôt un point clé dans tout cela, étant donné que le serveur fonctionne ici sur un autre port que le serveur qui gère l'affichage des lettres.

Après cela, un peu de magie avec le [Camunda Go client](https://github.com/citilinkru/camunda-client-go) et la lettre est soumise au processus Camunda BPM Engine.

## Traitement du langage naturel?

Oui, il est une forme d'intelligence artificielle (IA) qui vous permet de briser le texte écrit et identifier les parties de celui-ci en fonction de certains critères. Fait droit, il peut être très précis.

Prenons donc un exemple de lettre:

&gt; Cher Père Noël,
&gt;
&gt; Mon nom est Leon et je suis 36 ans (oui, je crois toujours à Santa 😇)
&gt;
&gt; Cette année, je suis l'enfant goodest jamais, donc je mérite un peu un grand cadeau ...
&gt;
&gt; Je pensais à une belle boîte de LEGO comme le kit d'horizon ou celui de New York. Si ce n'est pas une option, je me contenterais d'un bon chocolat aussi!
&gt;
&gt; Merci,
&gt; Leon

Maintenant, vous et je peux facilement choisir la `dans cette lettre de points'une qui serait des cadeaux, mais il se avère que le faire est plus difficile qu'il n'y paraît.

Quand nous courons que, grâce à notre processeur de la PNL, nous obtenons:

<pre>Cette année, j'ai été l'enfant goodest jamais, donc je mérite un peu un grand cadeau ...
Sentiment: 0.300000, positif Point: Nom Type: AUTRE
Phrase: Je pensais à une belle boîte de LEGO comme le kit d'horizon ou celui de New York.
Sentiment: 0.200000, positif Article: Boîte LEGO Type: AUTRES
Article: Kit horizon Type: AUTRES
Phrase: Si ce n'est pas une option, je me contenterais d'un bon chocolat aussi!
Sentiment: 0.700000, positif Article: Type d'option: AUTRES
Article: chocolat Type: AUTRES
Phrase: Merci,
Leon
Le sentiment: 0.800000, positif
</pre>
Hmmm ... Pas génial.

Si Leon avait écrit une lettre de Santa plus spécifique, nous aurions pu obtenir de meilleurs résultats pour lui:

&gt; Cher Père Noël,
&gt;
&gt; Mon nom est Leon et je suis 36 ans (oui, je crois toujours à Santa 😇)
&gt;
&gt; Cette année, je suis l'enfant goodest jamais, donc je mérite un peu un grand cadeau ...
&gt;
&gt; Je pensais à un beau kit Lego horizon ou Lego New York City Skyline Kit.
&gt;
&gt; Si ce n'est pas une option, je me contenterais d'un bon chocolat belge aussi!
&gt;
&gt; Merci,
&gt; Leon

Lorsque nous traitons cette lettre, nous obtenons de meilleurs résultats:

<pre>Lettre est de 4 phrases.
Phrase: Cher Père Noël, Mon nom est Léon et je suis 36 ans (oui, je crois encore au Père: innocent :) Cette année, j'ai été l'enfant goodest jamais, donc je mérite un peu un grand cadeau ...
Sentiment: 0.500000, positif Point: Nom Type: AUTRE
Article: Père Noël Type: AUTRES
Phrase: Je pensais à un beau kit Lego horizon ou Lego New York City Skyline Kit.
Sentiment: 0.000000, positif article: Kit horizon Type: AUTRES
Article: Lego Type: ORGANISATION
Article: Skyline Kit Type: CONSUMER_GOOD
Phrase: Si ce n'est pas une option, je me contenterais d'un bon chocolat belge aussi!
Sentiment: 0.400000, positif Article: Type d'option: AUTRES
Article: Type de chocolat belge: CONSUMER_GOOD
Phrase: Merci, Leon
Le sentiment: 0.800000, positif
</pre>
Vous remarquerez que nous avons maintenant identifié certains `CONSUMER_GOODS` dans la lettre, qui sont * beaucoup * plus facile à trouver.

Donc, nous allons voir comment le Père allait trouver des liens.

## Qu'en est-il s'il n'y a pas CONSUMER_GOODS?

C'est là que la magie des processus manuels et formulaires arrive, bien sûr. Nous avons une passerelle exclusive qui vérifie le cas échéant `CONSUMER_GOODS` ont été identifiés. Dans le cas contraire, il serait plus difficile pour le processus de recherche Amazon pour trouver quelque chose de significatif.

Cette partie du processus est l'endroit où les elfes entrent en jeu. Ils ne sont pas tout perdre leur emploi une fois l'opération a été automatisé! Mais ils étaient * * capables de se joindre au « Work From Home » mouvement, maintenant ils font leur travail, peu importe où ils veulent! (Cherchez elfes dans votre quartier!)

Disons que Léon avait écrit une lettre qui vient d'être dit: « Je veux la paix mondiale. Et j'aimerais l'harmonie ». Alors que ce sont des idéaux élevés, ils ne sont pas vraiment des choses qui peuvent être commandés à partir Amazon (du moins pas encore).

Voici la forme des Elfes obtenez lorsque une lettre leur est acheminé vers une intervention:
![Lorsque le formulaire arrive](/posts/category/camunda/form1-1024x257.jpg)

Et puis après les Elfes ont donné une pensée, vérifié la liste vilaine / Nice, ils peuvent mettre à jour les éléments:
![Articles mises à jour forment](/posts/category/camunda/form2-1024x250.jpg)

Le formulaire est ensuite acheminé dans le processus.

Il y a un peu de travail à faire dans la construction de la forme cependant. La première chose est de construire la forme selon les [docs](https://docs.camunda.org/manual/7.5/reference/embedded-forms/javascript/lifecycle/). Depuis Père a mis tout en un objet JSON quand la lettre a été analysée, il avait un peu plus de travail à faire cependant.

Modifier les cadeaux pour les rendre plus faciles à rechercher

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


Père Noël a dû créer tous les éléments de formulaire sur la volée, puis les relire dans la variable d'instance à la fin.

Maintenant, voici le plus délicat: Si vous téléchargez un formulaire avec votre diagramme, vous ne pouvez pas utiliser l'interface facile fournie par le Modeler. Vous devez utiliser un processus manuel. Père Noël, étant une ancienne école type ligne de commande, utilisé `curl`:

<pre>boucle -w « n » - biscuit cookie.txt
-H « Accepter: application / json »
-F "déploiement name = santa"
-F "enable-double-filtrage = false"
-F "Déployez-a changé uniquement = false"
-F "santa.bpmn=@/Users/santa/Downloads/santa.bpmn"
-F "ManualLetter.html=@/Users/santa/github.com/letter-to-santa/src/ManualLetter.html"
http://santa-server.com:8080/engine-rest/deployment/create
</pre>
Qui télécharge le fichier de BPMN et le formulaire au Camunda BPM Server, puis lorsque le processus manuel est appelé, le formulaire se présente!

## Trouver Liens

Être le Père Noël, et ayant une année entière * * au plan pour cela, vous auriez pensé Père Noël aurait pu être mieux préparé, mais, bien, la décision de la retraite était une sorte de dernière minute, et la plage en Thaïlande était tellement gentil, il sorte de oublié quelques détails.

Le principal détail il a oublié était de créer un compte vendeur Amazon, ce qui lui aurait donné accès à l'API de recherche de produits. Avec cela, il aurait pu faire un bien meilleur travail de recherche de produits, en regardant les résultats, etc.

Ce ne fut pas le cas, hélas. Mais heureusement, l'un des plus intelligents lutins du Père Noël a intensifié à la dernière minute et lui a dit d'utiliser simplement une URL de recherche Amazon. L'année prochaine, le Père Noël sera mieux préparé pour cela.

## Envoi de l'e-mail


Depuis Père Noël ne voulait pas vraiment faire, eh bien, quoi que ce soit, même la partie de courriel a été automatisé.

Il a pris toutes les informations recueillies lors des étapes précédentes, et a tiré tous ensemble dans un e-mail agréable aux parents:

&gt; Saisons Salutations!
&gt;
&gt; Devinez quoi? Léon m'a écrit une lettre demandant un certain nombre de choses. Comme je l'ai maintenant à la retraite à une plage en Thaïlande, je pensais que tu aimerais peut-être voudrais savoir ce que Lean a demandé. Voici la lettre:
&gt;
&gt;&gt; « Cher Père Noël,
&gt;&gt;
&gt;&gt; Mon nom est Leon et je suis 36 ans (oui, je crois toujours à Santa 😇)
&gt;&gt;
&gt;&gt; Cette année, j'ai été l'enfant goodest jamais, donc je mérite un peu un grand cadeau ...
&gt;&gt;
&gt;&gt; Je pensais à un beau kit Lego horizon ou Lego New York City Skyline Kit.
&gt;&gt;
&gt;&gt; Si ce n'est pas une option, je me contenterais d'un bon chocolat belge aussi!
&gt;&gt;
&gt;&gt; Merci,
&gt;&gt; Leon »
&gt;
&gt; Je me suis permis de déterminer quelles choses qu'ils veulent plus, et vous a fourni une liste de sorte que vous pouvez simplement acheter ces articles directement. Ne vous inquiétez pas, les Elfes ne sont pas de travail! Ils travaillent à la maison pour surveiller tous les processus. Et non, ils ne sont pas disponibles à l'achat.
&gt;
&gt; Alors, cette liste:
&gt;
&gt; - Kit d'horizon ⁉️
&gt; - Lego Skyline Kit ⁉️
&gt; - Chocolat belge ❗️
&gt;
&gt; Si vous vous demandez, depuis que je suis à la retraite, je suis aussi paresseux. J'ai donc utilisé une intelligence artificielle (ce qui est vraiment pas tout ce que intelligent) pour trier des « taux » ce qu'ils ont demandé. Je pouvais * * avoir commandé la liste, mais comme je viens de vous dire, je suis à la retraite, et paresseux. Voici le système de notation:
&gt;
&gt; - ⚠️: mois.
&gt; - ⁉️: Ok, je suppose.
&gt; - ❗: Maintenant, nous sommes talkin!
&gt; - ️: Oh s'il vous plaît! Oh s'il te plait! Oh s'il te plait!
&gt;
&gt; Tout le meilleur de moi et Mme Claus
&gt;
&gt; -
&gt; PS: S'il vous plaît ne pas écrire de nouveau à cette adresse e-mail. Je suis à la retraite!
&gt;
&gt; [Écrivez votre propre lettre!](https://write-a-letter-to-santa.org)

Père Noël était maintenant chose faite. Et il n'a pas eu à lever le petit doigt!

## Comment at-il tout cela?

Il a fallu écrire du code, mais le Père Noël était en mesure d'utiliser la bibliothèque cliente Camunda golang à tout manche.

Comme nous l'avons vu, une fois que la lettre a été présentée, le serveur web créé une nouvelle tâche dans Camunda et l'a soumis, ainsi que toutes les variables de processus dont il avait besoin de garder une trace de (pour commencer, juste `name`,` email 'Adresse et la même lettre générale `). Nous avons déjà vu comment cela a été fait.

Mais une fois qui a été présenté comme une tâche, comment cette tâche gérée?

## Manipulation une tâche

Ceci est le bit technique. Dans ce même processus Go qui gère les lettres entrantes (bien que cela aurait pu être dans un processus complètement séparé), nous écoutons les nouvelles tâches sur la `santa` file d'attente. Plus précisément, nous écoutons d'abord pour `tâches TAL-extraction`.

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
Une fois que nous avons le client, nous pouvons commencer à créer des processus qui surveillent les différentes files d'attente de tâches. Donc, pour la file d'attente de la PNL:

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
Ce processus de création de processus est également fourni par le (https://github.com/citilinkru/camunda-client-go/processor) [Go client].

Le processus est créé, en utilisant la `Client` créé précédemment, et dire le processus des tâches à écouter, combien de temps pour verrouiller la tâche (donc pas d'autre essaie la revendication et le traiter) puis quoi docs une fois que la tâche est revendiqué. Un client Camunda objet `Variable` est créé, puis la fonction` analyser () `est appelée.

La fonction d'analyse renvoie le `Variable` qui a été rempli avec toutes les parties identifiées. Ceux-ci sont tous stockés dans un objet JSON (représenté par un `struct` dans Go)

```go
type Gift []struct {
Gifts []string `json:"gift"`
Types []string `json:"type"`
Sentiments []int `json:"sentiment"`
Amazon []string `json:"amazon"`
}
```
Une fois la fonction `analyze` est terminée, la` Gifts`, `` Types` et Sentiments` sont tous remplis, mais la partie `Amazon` est vide parce que nous n'avons pas encore fait.

Depuis que nous avons terminé l'analyse de la lettre, nous prenons tous les résultats, les empaqueter dans des nouvelles variables, et tout remettre dans le moteur Camunda BPM.

Bien sûr, l'étape suivante consiste à créer un processus similaire à surveiller les tâches sur le `amazon-search` file d'attente. Le processus est vraiment identique à la précédente, sauf qu'il écoute les identificateurs de tâches différentes, et appelle une autre méthode pour exécuter les variables d'instance.

Une fois la tâche `amazon-search` est terminée (et la partie` Amazon` de la structure de données est rempli pour chaque idée DON'avec), le tout est retourné à Camunda BPM et la tâche est marquée comme terminée.

Qui se déplace sur la partie `email`.

Encore une fois, un `processor` est défini pour écouter les tâches` email`, les revendications, puis composer et envoyer l'e-mail au destinataire. Une fois cela fait, la tâche est marquée comme terminée, et retourné.

Enfin, nous avons une tâche qui stocke toutes les `Gifts` dans une base de données afin que le Père Noël peut voir quelles sortes de cadeaux personnes ont demandé pour cette année. Il peut être à la retraite, mais il faut toujours garder un doigt sur le pouls de ce que les enfants veulent!

## Flux de travail Achèvement

Ce flux de travail est extrêmement efficace. Il termine généralement en quelques secondes au plus. Il est si rapide, en fait, que le Père Noël ne peut même pas voir tous les processus assis autour dans l'habitacle! À moins qu'il ya un problème. Ce qui il n'y aura pas, car le Père Noël ne veut pas être dérangé.

## Zones d'amélioration

Bien sûr, la partie de la PNL pourrait être considérablement améliorée. Santa simplement utilisé le libre niveau du moteur traitement du langage naturel de Google, avec zéro ajustements, et a pris les résultats sans analyse plus poussée. (Dois-je rappeler de la paresse du Père Noël à ce point?).

En outre, la partie de recherche Amazon pourrait être * beaucoup * mieux avec un compte Amazon revendeur réel. Peut être l'année prochaine.

Si vous pouvez penser à d'autres domaines d'amélioration - et il doit y avoir beaucoup! - S'il vous plaît ne hésitez pas à aller vers [David G. Simmons](mailto:david.simmons@camunda.com), principal développeur avocat à Camunda qui était chargé d'aider Père Noël obtenir tout ce processus mis en place.

[Écrivez votre propre lettre!](https://write-a-letter-to-santa.org)

![Écrivez votre propre lettre](/posts/category/camunda/santa.jpg)
