---
title: « Publication de données à InfluxDB de Swift »
Date: 2019-03-29
Author: davidgs
Category: Uncategorized
Tags: Influx, InfluxDB, IoT, Swift
Slug: publishing-data-to-influxdb-from-swift
hero: images/2.0CO2-300x269.gif
---

Je suis un homme très occupé. Il était il y a seulement quelques jours que j'ai écrit une nouvelle bibliothèque InfluxDB pour écrire des données à partir de périphériques Arduino à InfluxDB v2 et je suis là encore, écrire sur une bibliothèque ** nouveau ** pour écrire des données à InfluxDB. Cette fois-ci, il est à Swift. Maintenant, vos applications d'Apple natives peuvent écrire des données directement à v2.0 InfluxDB avec facilité.

Il est une bibliothèque très simple à utiliser, et vous pouvez télécharger l'ensemble du projet Xcode pour elle de mon [GitHub](https://github.com/davidgs/InfluxData-Swift). Vous pouvez l'utiliser pour écrire des points de données uniques à la DB, ou pour effectuer des écritures en vrac de toute taille. Voici un rapide tutoriel sur la façon de l'utiliser.

```swift
let influxdb = InfluxData()
```

Que vous obtient une instance de la classe `InfluxData`. Une fois que vous avez cela, vous aurez besoin de définir certains paramètres de configuration pour elle.

```swift
influxdb.setConfig(server: “serverName", port: 9999, org: “myOrganization", bucket: “myBucket", token: “myToken")
```

Vous, bien sûr, besoin de mettre toutes les valeurs en fonction des paramètres de votre serveur v2.0 InfluxDB. Vous pouvez également définir la précision de temps avec

```swift
let myPrecision = DataPrecision.ms // for Milliseconds, ‘us' for microseconds, and ’s’ for seconds
influxdb.setPrecision(precision: myPrecision)
```

À ce stade, vous êtes prêt à commencer la collecte de données et l'envoyer à v2.0 InfluxDB! Pour point chacun des données que vous collectez et que vous voulez stocker, vous allez créer un nouvel objet `Influx` pour contenir les balises et les données.

```swift
let point: Influx = Influx(measurement: "myMeasurement")
point.addTag(name: "location", value: "home")
point.addTag(name: "server", value: "home-server")
if !point.addValue(name: "value", value: 100.01) {
    print("Unknown value type!\n")
}
if !point.addValue(name: "value", value: 55) {
    print("Unknown value type!\n")
}
if !point.addValue(name: "value", value: true) {
    print("Unknown value type!\n")
}
if !point.addValue(name: "value", value: "String Value") {
    print("Unknown value type!\n")
}
```

Comme vous pouvez le voir, il accepte Entiers, les valeurs à virgule flottante, les booléens et les chaînes. Si elle ne peut pas déterminer le type de données, il renvoie la Boolean `false` il est donc toujours une bonne idée de vérifier la valeur de retour.

Pour des performances optimales, il est recommandé d'écrire des données par lots à InfluxDB, vous aurez donc besoin de préparer les données pour entrer dans un lot. Ceci est facile à faire avec un appel à

```swift
influxdb.prepare(point: point)
```

Et quand il est temps d'écrire le lot, il suffit d'appeler

```swift
if influxdb.writeBatch() {
    print("Batch written successfully!\n")
}
```

Encore une fois, `writeBatch ()` retourne un booléen sur succès ou l'échec, il est donc une bonne idée de vérifier ces valeurs.

Si vous voulez écrire chaque point de données comme il arrive, il suffit de prendre le point de données créé ci-dessus et appel

```swift
influxdb.writeSingle(dataPoint: point)
```

Vous pouvez écrire des données sur plusieurs mesures en même temps que chaque point de données est initialisé avec sa mesure, et vous pouvez ajouter autant de balises et les champs que vous le souhaitez.

C'est vraiment la première passe à la bibliothèque Swift InfluxDB que j'ajouterons la capacité de recherche, créer des seaux, et beaucoup d'autres caractéristiques de la [langue] Flux (https://docs.influxdata.com /flux/v0.12/introduction/getting-started/) à la bibliothèque à l'avenir, mais étant donné que ce que la plupart des gens veulent faire tout de suite est données d'écriture à la base de données, je pensais que je reçois ce là-bas.

J'espère que ceci est utile! Je sais que cela a été pour moi! Vous voyez, je l'ai récemment été juste en utilisant mon ordinateur portable Mac aux données d'appui hors de mon capteur CO2 Bluetooth que je construit. Pour ce faire, je construit une petite application BLE qui se connecte au capteur, est abonnée à l'ID de données, et écrit en permanence les données à InfluxDB. Inutile de dire que je cette bibliothèque et ont été racler ces données et le stockage joyeusement.

![Publication de données à InfluxDB de Swift](/posts/category/database/images/2.0CO2-300x269.gif)

J'aimerais entendre ce que vous envisagez de faire avec une bibliothèque Swift pour 2.0 alors assurez-vous [me suivre](http://twitter.com/follow?user=davidgsIoT) sur twitter et laissez-moi savoir ce que vous êtes Faire!
