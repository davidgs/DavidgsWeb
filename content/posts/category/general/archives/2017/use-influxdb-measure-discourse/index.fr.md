---
Title: "Measuring and Monitoring Community Engagement on Discourse with InfluxDB"
Date: 2022-11-03
Category: general
Slug: use-influxdb-measure-discourse
hero: images/SafariScreenSnapz005.png
reading_time: 6 minutes
---

> Cet article a été initialement publié sur [Blog d'InfluxData](https://www.influxdata.com/blog/use-influxdb-measure-community/)

## Discours de surveillance

Chez InfluxData, nous utilisons Discourse pour notre communauté (vous êtes membre de notre communauté, n'est-ce pas ? Non ? Eh bien, allez vous inscrire !!) Une partie de mon travail ici chez InfluxData consiste à garder un œil sur la communauté, répondre aux questions, et travailler pour faire grandir la communauté. Et une partie de cela, bien sûr, est la métrique. Cela revient toujours à ce que vous pouvez mesurer, n'est-ce pas ? Mon défi était donc de trouver un moyen de mesurer la communauté.

Il y a bien sûr une interface de gestion qui indique le nombre de nouveaux utilisateurs, le nombre de publications créées, etc. au cours de la journée, de la semaine et du mois écoulés, donc les statistiques sont là. Mais l'idée d'y aller tous les jours et d'enregistrer ces chiffres était, eh bien, moins qu'attrayante.

Discourse fournit une surveillance rudimentaire, mais le pouvoir est vraiment d'utiliser leurs API pour voir les données d'une toute nouvelle manière. Après tout, l'automatisation de telles tâches est la raison pour laquelle les ordinateurs ont été inventés, n'est-ce pas ? Je vais donc vous montrer comment j'ai réussi à retirer toutes ces statistiques de gestion de Discourse, puis (bien sûr) à les insérer dans InfluxDB afin que je puisse les avoir toujours à portée de main et prêtes à être affichées.

## Obtenir les statistiques

Le premier défi consistait à trouver un moyen d'obtenir toutes les statistiques que je recherchais. La première chose que j'ai faite, bien sûr, a été de me diriger directement vers la documentation de l'API Discourse dans l'espoir qu'il y aurait un simple appel API qui me permettrait d'obtenir ce que je voulais. Ou peut-être, dans le pire des cas, une série d'appels d'API pour obtenir les statistiques individuelles que je voulais. Hélas, les choses ne sont jamais aussi simples, n'est-ce pas ? Il existe des API très pratiques pour faire beaucoup de choses, mais obtenir des statistiques sur les utilisateurs et les activités n'en fait pas partie. Il est temps de faire de la rétro-ingénierie.

Il est assez facile d'obtenir un tas d'informations via les outils de développement Google Chrome. J'ai ensuite chargé l'interface d'administration de Discourse pour voir ce qui se passait :

![Outils de développement Google](images/dashboard-Getting-the-Stats.jpg)

Comme vous pouvez le voir, j'ai trouvé un "dashboard.json" qui était en train d'être chargé, alors je suis allé fouiner là-dedans et Bingo ! Trésor de données ! En fait, il contient toutes les données dont dispose le tableau de bord d'administration. J'étais presque à la maison ! Presque. Cela me donne un objet JSON de 3200 lignes que je dois parcourir pour trouver ce dont j'ai besoin. Certaines des données sont disponibles par d'autres moyens. Par exemple, les statistiques http_2xx_reqs sont disponibles dans les journaux nginx, mais des choses comme le nombre de sujets sans réponse, sur une base quotidienne, ne le sont pas. Et ce sont les choses qui m'intéressent vraiment. Je reviens donc à l'analyse des objets JSON et à l'insertion des résultats dans InfluxDB. Et tu pensais que j'avais une vie glamour !

## Écrire le code

Cependant, je ne le fais pas dans Node-red cette fois. J'ai décidé, puisque j'avais d'autres processus Node.js faisant diverses choses sur mon serveur, que j'en ajouterais juste un de plus. Node.js est assez bon pour obtenir http et analyser JSON, donc cela semble être une bonne idée. La première chose dont vous avez besoin est une clé API pour votre installation Discourse, alors passez à la documentation de l'API Discourse et obtenez-en une pour votre configuration Discourse. Définissez ensuite votre URL (qui sera, bien sûr, différente de la mienne car vous avez votre propre configuration Discourse et vous n'avez pas d'accès administrateur à la mienne).

```javascript
const url = "https://community.influxdata.com/admin/dashboard.json?api_username=foo&api_key=bar";
```

Encore une fois, en regardant le fichier JSON, j'ai décidé d'un certain nombre de "rapports globaux" qui m'intéressaient :

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

Encore mieux! Je peux obtenir les totaux et les totaux des 30 derniers jours ! Maintenant que j'ai l'URL et que je sais quelle est la structure JSON, je peux aller la chercher et l'analyser :

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

Et cela me permet d'obtenir tous les points de données individuels que je recherche, puis tous les points de données cumulés — rappelez-vous, le total et les totaux des 30 jours précédents — que je veux. Et j'écris simplement ces données dans mon instance InfluxDB :

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

Il n'est clairement pas nécessaire de consigner le résultat dans la console, mais j'aime voir ce qui se passe. Et c'est tout le code que j'ai écrit!

## Voir les résultats

Bien sûr, aucun projet InfluxDB ne serait complet sans la création d'un tableau de bord afin que je puisse visualiser les résultats et que la direction puisse voir la santé et l'activité de la communauté en un coup d'œil.

![Outils de développement Google](images/SafariScreenSnapz005.png)

Vraiment cool de voir que nous n'avons aucun sujet sans réponse pour le moment ! La meilleure partie de tout cela est qu'il a automatisé un tas de statistiques que j'avais l'habitude de faire à la main, me libérant ainsi pour faire d'autres trucs sympas !

## Et après?

Eh bien, je ne pense pas qu'il y ait quoi que ce soit d'autre sur ce projet, mais j'ai passé la semaine dernière à EclipseCon Europe et je vais écrire des trucs vraiment sympas qui s'y sont déroulés, alors restez à l'écoute pour ça ! Et n'oubliez pas que si vous avez une idée de projet que je devrais aborder ou des questions, n'hésitez pas à me le faire savoir !
