---
title: « Résoudre un problème VRP »
Date: 2016-06-16
Author: davidgs
Category: General, Misc, Work
Slug: solving-a-traveling-salesman-problem
hero: images/Safari039.jpg
---

Ce n'est pas IdO, mais quand même ... Voici l'arrière-plan sur ce projet, et pourquoi je me suis engagé il.

Au cours des 3 dernières années ou si ma femme et moi avons fait du bénévolat avec les aveugles dans notre communauté. Chaque mois, notre église organise un dîner pour les aveugles dans la région et nous conduisons autour et ramasser les participants, les emmener à l'église où nous servons tous le dîner, et le lecteur tous à la maison. Il est très amusant, et quelque chose à la fois, nous et les gens que nous conduisons, profiter à fond. Il leur donne une chance de se retrouver entre amis et partager un repas, de la musique et une grande soirée.

Sur le plan logistique, cependant, il est un peu un cauchemar. Chaque mois, il y a un appel à des volontaires pour conduire, amassant la liste des personnes qui veulent venir, et la tâche ardue de déterminer les itinéraires pour tout le monde qui réduit le temps de déplacement et maximisent l'efficacité. Pour les premières années, ce processus a été assez opaque. Chaque mois, nous serait volontaire pour conduire, puis une semaine avant l'événement, nous obtiendrions un e-mail avec qui nous reprendrions et leurs adresses, etc. Dans les coulisses, cependant, un volontaire a passé des heures cartographier les routes et l'affectation passagers aux conducteurs dans ce qui était espéré serait une manière efficace. Ce ne fut pas toujours.

Ceci est exactement le genre d'ordinateurs problèmes ont été conçus pour résoudre! Alors je porté volontaire pour résoudre une fois pour toutes. Ok, donc les ordinateurs ne peuvent pas résoudre le problème, mais un programme informatique bien conçu parviendraient. Je devais écrire.

Les paramètres de base sont les suivants:

- Environ 30 chauffeurs bénévoles, chacun avec leurs propres « restrictions » sur jusqu'où ils sont prêts à conduire, combien de passagers qu'ils peuvent prendre, etc.
- Environ 75 participants. Certains avec des chiens, certains en fauteuil roulant, certains handicapés physiques de diverses sortes, etc.
- Les pilotes et les participants changent tous les mois - il y a des habitués, comme nous, mais pas tout le monde peut venir / conduire chaque mois

## Construire une solution

Il est clair que [Google Maps](http://maps.google.com/) allait faire partie de la solution. En outre, une base de données back-end de quelque sorte serait nécessaire pour stocker les informations sur les pilotes et les participants afin que nous ne pas avoir à entrer de nouveau chaque mois. Je venais de terminer un projet de consultation pour) allait faire partie de la solution. En outre, une base de données back-end de quelque sorte serait nécessaire pour stocker les informations sur les pilotes et les participants afin que nous ne pas avoir à entrer de nouveau chaque mois. Je venais de terminer un projet de consultation pour [StrongLoop](https://strongloop.com) l'application de leur cadre création et la gestion API IdO, et il semblait une solution parfaite à ce problème aussi bien. Voici étaient les exigences de fin, je me suis fixés:

- application basée sur le Web qui fonctionnerait dans tout navigateur
- Sauvegarde des informations datastore du conducteur et participant
- Facile et intuitif à utiliser, car tout le monde est la technologie savvy
- Automatiser autant du processus que possible
- Optimiser les itinéraires pour les pilotes
- Fournir les pilotes avec une carte Google avec leur itinéraire optimisé et tour-par-tour

assez simple Semblait. Je savais déjà comment géolocaliser choses sur une carte Google via [API Google Maps.](https://www.google.com/work/mapsearth/products/mapsapi.html) j'avais (nouvellement acquis) connaissance de l'utilisation de JavaScript et) j'avais (nouvellement acquis) connaissance de l'utilisation de JavaScript et [Node.js](https://nodejs.org/en/) et) et [rebouclage](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&cad=rja&uact=8&ved=0ahUKEwiJrcHf_azNAhVGKiYKHbONBioQFggcMAA&url=https%3A%2F%2Floopback.io%2F&usg=AFQjCNHtpfzxltGflU6-IJMVn0fp4eVBKA&sig2=o_NtCq7mb2Uf4RyYMpys7w&bvm=bv.124272578,d.eWE) et) et [MongoDB](https://www.mongodb.com/lp/download/) - et en les reliant tous ensemble - pour gérer les données et les API. Mais comment construire réellement? Je veux dire, comment présenter les données et l'interface dans une interface utilisateur simple que tout le monde pouvait comprendre.

Voici où je me suis retrouvé. Après cela, je vais brièvement passer par la façon dont je l'ai fait. Je vais marcher à travers le flux de travail un peu trop. Nous commençons ici, avec une page blanche, une carte Google Map, et quelques tables vides.

## Les resultats

![Capture d'écran de la page initiale avec une Google Map intégrée](/posts/category/programming/images/Safari034.jpg)

Vous pouvez cliquer sur « Ajouter un pilote » et ajouter un nouveau pilote à la base de données. Vous obtenez le même formulaire si vous cliquez sur « Ajouter Attendee ». Tous les pilotes et les participants sont conservés dans une base de données MongoDB.

![Capture d'écran d'une boîte de dialogue « Ajouter un pilote »](/posts/category/programming/images/Safari035.jpg)

Il y a une liste déroulante de tous les pilotes de la base de données, il vous suffit de sélectionner celles qui conduisent ce mois-ci:

![Capture d'écran montrant la liste déroulante des pilotes](/posts/category/programming/images/Safari036.png)

Une fois que vous sélectionnez un pilote, ils se retrouvent dans le tableau des pilotes, avec leur propre «mini-carte. Un bleu Pin est également ajouté à la carte principale. Comme vous ajoutez les pilotes, vous verrez de plus en plus bleu Pins pour les conducteurs sur la carte principale.

![Capture d'écran montrant le premier pilote ajouté à la liste](/posts/category/programming/images/Safari037.jpg)

Ensuite, vous sélectionnez Les participants de la liste déroulante participants.

![Capture d'écran de la liste déroulante « participants »](/posts/category/programming/images/Safari038.jpg)

Lorsque vous ajoutez des participants, ils sont ajoutés aux participants Table, et un Pin rouge est ajouté à la carte principale. Lorsque vous sélectionnez de plus en plus de participants, vous verrez de plus en plus Pins rouges sur la carte principale.

![Capture d'écran montrant la broche et les participants parti ajouté à la liste](/posts/category/programming/images/Safari039.jpg)

Lorsque vous cliquez sur une épinglette de Spectateur, vous obtenez un pop-up avec leurs informations (nom, adresse, numéro de téléphone) et une autre liste déroulante contenant tous les pilotes disponibles. Il suffit de sélectionner un pilote pour cette Attendee. Vous remarquerez peut-être un problème potentiel ici. Que faire si j'ajouter des pilotes à la carte plus tard? Vont-ils apparaître dans les démoraliser des participants? Bien sûr, ils! J'ai simplement ajouté un gestionnaire JavaScript onmousedown () dans le répertoire \<select\> pour la liste du conducteur, et là je marche la table des pilotes pour construire la liste de sélection:

```js
for (var i = 1, row; row = dTable.rows[i]; i++) {
  //iterate through rows
  //rows would be accessed using the "row" variable assigned in the for loop
  for (var j = 0, col; col = row.cells[j]; j++) {
    if(j == 0){
      id = col.childNodes[0].value;
    }
    if(j == 1){
      selContent += "<option value='" + id + ":" + popup.split('-').pop() + "'>" + col.innerHTML + "</option>";
      sel.innerHTML = selContent;
    }
  }
}
```

Il est un peu plus compliqué que vous pourriez penser est nécessaire parce que tout de référence I par l'identifiant de la base de données MongoDB pour que je puisse le regarder plus tard plus facilement. Je ne suis pas garder une trace de l'adresse du conducteur, numéro de téléphone, etc. à partir des tables, car une recherche par identifiant est ** très ** rapide, aussi longtemps que je l'id pratique, je peux obtenir toute autre information rapidement.

![Info-bulle lorsque vous passez la souris sur une broche sur la carte](/posts/category/programming/images/Safari040.jpg)

Une fois que vous attribuez un pilote à un participant, leur rouge Pin est déplacé de la carte principale de mini-carte du conducteur sur lequel vous pouvez afficher / masquer la route de conduite réelle. Oui, il est petit et difficile de voir l'itinéraire. En outre, l'entrée dans la table Attendee de Attendee est devenu vert et un nom de pilote est rempli pour eux. Il en est ainsi qu'il est facile de dire quand tout le monde a un chauffeur et vous avez terminé) broches Pas plus rouges sur la carte principale et tous les participants sont verts.

![Shwoing les changements décrits ci-dessus](/posts/category/programming/images/Safari041.jpg)

## Alors qu'est-ce qui manque?

Eh bien, vous voyez le bouton « Envoyer », qui, dans un monde idéal, se rassemblaient toutes les informations sur chaque participant et envoyer un e-mail au conducteur avec toutes ces informations, etc. Mais ce n'est pas un monde idéal, et l'utilisation de JavaScript dans un navigateur, vous ne pouvez pas vraiment faire tout cela. Au lieu de cela, vous obtenez une fenêtre pop-up avec un message bien formaté, avec la liste des participants et toutes leurs informations ainsi qu'un lien vers une carte google avec tour-par-tour. Tout ce que vous devez le faire copier tout le texte, fermez la boîte de dialogue, cliquez sur le lien e-mail du conducteur, coller dans le texte et l'envoyer. Je souhaite qu'il y ait une meilleure façon, mais a) Je ne veux pas faire de code côté serveur pour envoyer l'e-mail et b) il est impossible d'envoyer un entièrement formaté (HTML ou RTF) à partir d'un lien « mailto » , je suis coincé avec cela.

Alors, comment cela est mis en œuvre? Il est tout en JavaScript! Je StrongLoop, comme je l'ai dit, pour construire le Node.js / cadre Bouclage qui m'a donné toutes les API ReST je avais besoin dans le back-end MongoDB, plus le tout serveur Node.js pour servir. Cette partie est incroyablement puissant, en fait. Si vous essayez de mettre API REST sur votre base de données que je vous recommande fortement de donner StrongLoop un tourbillon. En particulier, l'ARC où vous pouvez utiliser un navigateur pour concevoir vos modèles de données, etc. Comme je l'ai dit plus tôt, je garde vraiment que l'ID de base de données dans le navigateur. Donc, tout - et je fais tout moyen - est référencé par cet ID. Comment ça marche? Eh bien, nous allons prendre l'exemple d'ajouter un participant à la liste des passagers d'un conducteur. J'ai une fonction qui est appelée lorsque vous sélectionnez un pilote dans la liste déroulante (rappelez-vous, nous avons parlé de la construction de cette liste à la volée plus tôt). Une fois qu'un pilote est sélectionné, il faut ajouter que la liste des participants à de ce pilote. Ainsi, la sélection d'un pilote appelle la fonction driverSelected () avec un tuple de ID et l'ID du participant du conducteur. Voici comment cela fonctionne:

```js
  // everything is referenced by ID!
  var selRow = document.getElementById(ids[1]);
  selRow.style.background=routed; // set Attendees background green
  var driverCell = document.getElementById(ids[1]).cells[3];
  var url = dbServerURL + "Attendees/" + ids[1];
  jQuery.getJSON(url, function(data) { // look up the Attendee's info in the DB
  var tbl = document.getElementById("pList-" + ids[0] + "-Table");
  var row = tbl.insertRow(-1);
  row.id = data.id; // everything referenced by ID
  var cell = row.insertCell(0);
  cell.innerHTML = "• " + data.Name;
  driverCell.innerHTML = driverName;
  cell = row.insertCell(1);
  cell.innerHTML = "<button id="" + data.id + "" onclick="clearCell(this.id, this.value)" value="" + ids[0] + "" name="Remove">Remove</button>"
  for(var x = 0; x < driverList.length; x++){
    if(driverList[x].id == ids[0]){
      addToMap(data.id, "Attendees", driverList[x].map); // add the the Driver's map
      break;
    }
  }
});
```

Comme vous pouvez le voir, je vraiment ** ne pas utiliser l'ID ** pour tout. Insérer des éléments dans le DOM en utilisant l'ID. Chaque pilote reçoit une table, et dans ce tableau est une autre table de participants pour ce pilote, et il est nommé pList-ID-table il est donc facile à trouver. Et modifier. Je garde une liste des cartes pour chaque pilote, référencé à nouveau par l'ID du conducteur, afin que je puisse ajouter à broches (ou retirer les broches de celui-ci). L'ensemble de l'application est d'environ 1000 lignes de JavaScript dans le navigateur pour aller chercher correctement et afficher et de manipuler toutes les données du back-end. Mais grâce à réalimentation, je pourrais faire des requêtes très rapides à la base de données et récupérer facilement manipuler des objets JSON pour travailler avec. Pour cette application facile à déplacer du serveur vers le serveur, j'ai simplement ajouté une variable d'initialisation dans le code du navigateur pour configurer le serveur:

```js
var dbServerURL= "http://" + location.host + "/api/";
```

Pour rechercher des données Prsence, je viens ajouter le nom de la base de données Les participants à la fin, et pour rechercher des données de pilotes, j'ajouter le nom de la base de données de pilotes à la fin. Pour rechercher un pilote spécifique, je joins simplement l'ID du conducteur à la fin de cela.

```js
var url = dbServerURL + "Drivers/" + id
jQuery.getJSON(url, function(data){ ... }
```

Je reviens d'un bel objet JSON avec toutes les informations du conducteur, en elle. Extraire des informations de JSON est mort simple, bien sûr, en utilisant quelque chose le long des lignes de:

```js
var id = data.id;
var driverName = data.Name;
```

etc. Il est vraiment aussi simple que cela.

Il se trouve que l'hébergement des applications Node.js est plus difficile que l'on pourrait penser. J'ai essayé pendant des jours pour le faire fonctionner sur OpenShift, mais en vain. La documentation de StrongLoop sur la façon de le faire est à la fois ancienne et incomplète et je ne l'ont pas compris comment le faire fonctionner. Les documents de OpenShift ne fonctionnent tout simplement pas. Ce que j'ai finalement trouvé était un moyen simple et gratuit pour déployer ce sur AWS. assez simple, et quand j'ai le temps, je peux rédiger comment faire aussi bien.

J'ai envoyé les instructions de base et l'adresse au coordinateur qui gère le routage et elle a maintenant fait avec succès le routage pour deux dîners. Son commentaire me était « si sûr est beaucoup plus facile ** ** et plus rapide que la façon dont je l'habitude de le faire! » L'ensemble est enveloppé dans le code d'amorçage, donc en théorie, il devrait également être utilisable à partir d'un appareil mobile, mais dans mes tests sur un iPhone, il a tendance à ne pas faire si bien avec les cartes, ce qui rend pas très utile.
