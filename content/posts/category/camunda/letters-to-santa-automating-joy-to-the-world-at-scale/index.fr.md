---
title: "Lettres au Père Noël - Automatiser la joie dans le monde, à grande échelle"
Date: 2020-12-18
Author: davidgs
Category: BPMN, DevRel
Slug: letters-to-santa-automating-joy-to-the-world-at-scale
hero: images/santa.png
---

![Père Noël sur un vélo aquatique](/posts/category/camunda/slack-imgs.com-2-1024x639.jpeg)

C’est à nouveau cette période de l’année. Le moment où la plus grande opération de traitement des commandes au monde subit sa charge la plus lourde. Non, pas Amazon - nous parlons de Santa Claus, Inc. - la plus grande entreprise de logistique au monde, avec une fenêtre de livraison mondiale de 24 heures en pleine charge.

Cette année est cependant différente. Plus tôt cette année, Saint Nick a cliqué sur une publicité sur son fil Facebook, promettant un style de vie numérique nomade en automatisant son entreprise. Marre du temps arctique et du stress des voyages, l'idée de s'asseoir sur une plage en Thaïlande - tout en apportant toujours de la joie aux enfants du monde entier - était séduisante.

Le Père Noël a payé le cours et a appliqué les principes de l'automatisation des processus, de la décomposition et de la distribution des tâches et de l'intégration avec des services tiers à son entreprise.

Maintenant, il se détend sur une plage de Koh Samui, tandis que l'automatisation apporte de la joie au monde - à grande échelle.

Ainsi, ce Noël, les lettres des enfants au Père Noël sont acheminées vers des associés indépendants (leurs parents), qui exécutent les commandes via Amazon. La transformation réussie de l'entreprise du Père Noël est devenue une étude de cas, que nous allons partager avec vous ici.

Voici comment procéder.

## Le Front End

Étant donné que le Père Noël est un gars moderne, et au cas où il aurait besoin de compléter son revenu de retraite par un travail de développement contractuel, le Père Noël a décidé de suivre un cours intensif pour apprendre à programmer dans React.js. Cela ressemblait à ce que faisaient tous les enfants cool, alors le Père Noël voulait essayer.

Bien que c'était plus difficile qu'il ne le pensait, grâce à beaucoup de recherches approfondies sur Google et à beaucoup de copier-coller (rappelez-vous les enfants, les bons développeurs copient, les grands développeurs collent!), Il a pu créer un site qui au moins semble passable et gère la fonction simple d'accepter une lettre au Père Noël et de la soumettre au moteur de processus.

Pour le moteur de processus, le Père Noël a bien sûr choisi [Camunda] (https://camunda.com)!

Une fois le formulaire conçu, il ne restait plus qu'à soumettre le formulaire en utilisant du JavaScript:

`` `js
const handleSubmit = event => {
event.preventDefault ();
setSubmitting (vrai);
if (! event.target.checkValidity ()) {
// le formulaire est invalide! donc on ne fait rien
revenir;
}
const requestOptions = {
méthode: 'POST',
headers: {'Content-Type': 'application / x-www-form-urlencoded; charset = UTF-8'},
corps: JSON.stringify (formData)
};
fetch ('https://write-a-letter-to-santa.org:9091/santa', requestOptions);

alert ('Le Père Noël a été averti! Vous pouvez recharger la page pour envoyer une autre lettre.');
}
''
Utiliser une simple alerte pour faire savoir à l'utilisateur que le formulaire a été soumis était le chemin de moindre résistance, et le Père Noël devenait paresseux.

## Le processus

Traiter une lettre en la transmettant aux parents telle quelle semblait un peu trop paresseux, même pour le Père Noël, alors il a rapidement conçu un processus commercial utilisant [Cawemo] (https://cawemo.com) pour gérer le routage des lettres .

Voici à quoi ressemble ce processus:

![Lettre au processus d'affaires du père Noël](/posts/category/camunda/santa-1024x270.png)

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

`` allez
http.HandleFunc ("/ santa", père Noël)
err: = http.ListenAndServe (": 9091", nil) // définir le port d'écoute
si err! = nil {
log.Fatal ("ListenAndServe:", err)
}
''

Et puis une fonction de gestionnaire:

`` allez
func santa (w http.ResponseWriter, r * http.Request) {
enableCors (& w)
if r.Method == "GET" {
log.Println ("Méthode GET non prise en charge")
http.Error (w, "Méthode GET non prise en charge", 400)
} autre {
corps, err: = ioutil.ReadAll (r.Body)
si err! = nil {
panique (err)
}
log.Println (chaîne (corps))
var t SantaData
err = json.Unmarshal (corps, & t)
si err! = nil {
panique (err)
}
log.Println (t.Lettre)
avec WriteHeader (200)
client: = camundaclientgo.NewClient (camundaclientgo.ClientOptions {
EndpointUrl: "http: // localhost: 8000 / engine-rest",
ApiUser: "démo",
ApiPassword: "démo",
Timeout: time.Second,
})

processKey: = "père Noël"
variables: = map [chaîne] camundaclientgo.Variable {
"name": {Value: t.Name, Type: "string"},
"email": {Value: t.ParentEmailAddress, Type: "string"},
"letter": {Value: t.Letter, Type: "string"},
}
_, err = client.ProcessDefinition.StartInstance (
camundaclientgo.QueryProcessDefinitionBy {Key: & processKey},
camundaclientgo.ReqStartInstance {Variables: & variables},
)
si err! = nil {
log.Printf ("Erreur lors du démarrage du processus:% sn", err)
revenir
}
}
}
''

Il a dû autoriser CORS à autoriser la publication de données d'origine croisée. C'est plutôt un point clé dans tout cela, car le serveur fonctionne ici sur un port différent de celui du serveur qui gère l'envoi des lettres.

Après cela, un peu de magie avec le [Camunda Go Client] (https://github.com/citilinkru/camunda-client-go) et la lettre est envoyée au Camunda BPM Process Engine.

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

<pre> Cette année, j'ai été le meilleur enfant de tous les temps, donc je mérite un gros cadeau ...
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
