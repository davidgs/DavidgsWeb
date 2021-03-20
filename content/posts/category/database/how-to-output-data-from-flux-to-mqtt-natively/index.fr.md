---
title: « Comment les données de sortie de flux à MQTT Natively »
Date: 2019-08-23
Author: davidgs
Category: Database
Slug: how-to-output-data-from-flux-to-mqtt-natively
hero: images/mqtt.png
---

## L'écriture des données de InfluxDB à l'aide MQTT Flux

Je commencé à utiliser la version Open Source (OSS) v2.0 InfluxDB très tôt dans les versions Alpha. Même dans les premières versions, j'étais très amoureux de la façon dont les choses ont été profilent. Mais comme vous le savez, je fais beaucoup de ** ** construit IdO et utilise InfluxDB pour tous, donc il y avait quelques choses que je avais besoin de le faire, il n'a tout simplement pas, encore.

L'une des choses que j'ai tout mon IdO Demos faire est d'écrire des alertes à un courtier MQTT. J'ai d'autres IdO périphériques qui lisent ce courtier, et de prendre des actions basées sur les messages qu'ils reçoivent. Mais InfluxDB 2.0 Alpha avait aucune capacité de production réelle.

** Note: ** Il existe un cadre d'alerte qui vient à InfluxDB 2.0 très bientôt, mais a) il n'a pas été disponible, et b) je besoin maintenant.

Que faire? Eh bien, Flux est un langage extensible, alors j'ai décidé d'étendre la langue d'écriture à MQTT. Tout d'abord, il est important de noter que Flux a 2 constructions de langage pour lire et écrire des données: `de ()` et `à ()`. Si vous avez écrit tout flux du tout, vous reconnaîtrez la `de ()` syntaxe comme la façon dont vous récupérer des données à partir InfluxDB. L'entreprise `` à () est un peu plus difficile. Construit dans la langue est la capacité de retour d'écriture à InfluxDB, en utilisant `à ()` syntaxe. J'ai aussi trouvé une extension `à ()` pour http qui vous permet d'écrire les résultats de votre requête Flux vers un point final http. Au moins, j'avais maintenant un point de départ!

## Ajout MQTT au flux

J'ai commencé farfouillé dans le code Flux pour voir comment le http `à ()` méthode a été mise en œuvre et rapidement vu qu'il serait presque trivial d'utiliser ce même cadre pour MQTT, donc je copiais tout le code vient http `à ( ) `sortie et a commencé à travailler pour le déplacer vers MQTT. Comme avec toutes ces choses, il était un peu moins « trivial » que moi à première vue, mais après quelques semaines de travail de nouveau à nouveau hors, j'ai eu une sortie de travail à MQTT de flux!

Tout d'abord, je devais définir les options de la sortie MQTT aurait besoin, et je me suis installé sur une sorte de jeu minimum par défaut des options:

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

Bien sûr, tous ceux-ci sont nécessaires ** **, mais je vais passer par ceux qui sont.

Tout d'abord, bien sûr, vous devez définir un courtier. Ceci est l'URL du courtier MQTT que vous souhaitez utiliser. Dans votre URL de votre courtier doit être identifié comme étant soit `tcp`,` `ws` ou tls`` tcp: //mqtt.mybroker.com: 1883` serait ce qu'il cherche. La plupart des autres sont, grosso modo, en option dans une certaine mesure. ** Si vous fournissez un ** `Username` vous ** ** doit également fournir un mot de passe. Vous ne pouvez pas avoir l'un sans l'autre! En outre, si vous ne donnez pas de `Topic` alors on sera créé pour vous en enchaînant toutes les balises de retour de votre recherche. Je vous conseille de donner un sujet, comme sujet de `/ balise1 / TAG_2 / TAG_3 / ...` serait moins qu'idéal dans beaucoup de situations.

## Comment utiliser cette nouvelle chose?

Je suis heureux que vous ayez demandé! Tout d'abord, il est ne fait pas partie du flux pour l'instant. Je l'ai présenté un PR, il a été accepté, mais (de cette écriture) n'a pas été fusionnés. Si vous voulez construire votre propre version de flux afin de mettre la main sur ce * maintenant * alors vous aurez besoin de tirer la branche et à partir du source. Voir la (https://github.com/influxdata/flux/pull/1653) [MQTT PR] et aller de là.

Une fois que vous avez fait cela, le code de flux pour commencer à écrire à un courtier MQTT est en fait trivial! Vous souhaitez créer une tâche dans l'InfluxDB 2.0 UI, et vous pouvez coller dans le code suivant:

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

Cela va écrire la dernière CPU `valeur usage_system` à votre courtier MQTT. Utilisation de l'interface utilisateur, vous pouvez décider de la fréquence à laquelle vous voulez ces données écrites.

## Quelques choses à noter

Il est important de se rendre compte que [Flux retourne toutes ses données à partir de requêtes sous forme de tableaux](https://www.influxdata.com/blog/use-flux-to-group-shape-and-analyze-your-time-series-data/). La raison de ce qui précède tâche utilise la dernière `()` fonction est de limiter la valeur renvoyée à une table avec exactement une rangée. Le MQTT `de ()` fonction va écrire la table entière au courtier, en tant que ligne de protocole. Si votre requête renvoie une très grande table, préparez-vous pour votre courtier MQTT pour obtenir une très grande table comme la charge utile du message.

En outre, si votre requête renvoie plusieurs tables, la fonction `` MQTT à () va écrire un seul message ** par table ** avec chaque message contenant une table entière. Si ce n'est pas le comportement que vous voulez, vous devriez penser à la façon de concevoir votre requête telle qu'elle retourne une seule table (de préférence faible) que les résultats.

Vous pouvez également avoir remarqué un champ en option `message` ci-dessus. Si ce que vous voulez est d'envoyer un message prédéfini au lieu d'un tableau des résultats, vous pouvez définir le paramètre `message` dans votre appel à` à () `et ce message sera envoyé.
Jusqu'à présent, je me sers de cela pour environ 2 mois avec des résultats fantastiques! Je suis en mesure de contrôler certains appareils IdO en fonction des lectures d'autres appareils IdO et il fonctionne très bien!

** Mise à jour: ** Le PR pour cela a été fusionné dans la branche maîtresse alors qu'il devrait faire preuve dans un communiqué de flux bientôt!
