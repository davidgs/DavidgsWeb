---
title: "Bekendmaking van gegevens als InfluxDB van Swift"
Date: 2019-03-29
Author: davidgs
Category: Uncategorized
Tags: Influx, InfluxDB, IoT, Swift
Slug: publishing-data-to-influxdb-from-swift
hero: images/2.0CO2-300x269.gif
reading_time: 4 minutes
---

Ik heb een zeer drukke man geweest. Het was slechts een paar dagen geleden dat ik schreef over een nieuwe InfluxDB bibliotheek voor het schrijven van gegevens van Arduino apparaten InfluxDB v2 en hier ben ik weer, schrijven over een **nieuw** bibliotheek voor het schrijven van data naar InfluxDB. Deze keer, het is in Swift. Nu is je moedertaal Apple apps kunnen gegevens te schrijven direct naar InfluxDB v2.0 met gemak.

Het is echt een eenvoudige bibliotheek om te gebruiken, en je kunt voor deze downloaden het hele Xcode project uit mijn [GitHub](https://github.com/davidgs/InfluxData-Swift). U kunt het gebruiken om enkele datapunten schrijven naar de DB, of bulk schrijft van elke omvang te doen. Hier is een snelle tutorial over hoe het te gebruiken.

```swift
let influxdb = InfluxData()
```

Dat krijgt u een exemplaar van de `InfluxData` klasse. Zodra je dat hebt, moet u een aantal configuratieparameters in te stellen voor het.

```swift
influxdb.setConfig(server: “serverName", port: 9999, org: “myOrganization", bucket: “myBucket", token: “myToken")
```

Je zal natuurlijk, noodzaak om al die waarden ingesteld op basis van de instellingen van uw InfluxDB v2.0 server. U kunt ook de tijd instellen precisie

```swift
let myPrecision = DataPrecision.ms // for Milliseconds, ‘us' for microseconds, and ’s’ for seconds
influxdb.setPrecision(precision: myPrecision)
```

Op dit punt, ben je klaar om te beginnen met het verzamelen van gegevens en op te sturen naar InfluxDB v2.0! Voor elke data wijzen u verzamelt en wilt opslaan, ziet u een nieuw `Influx` object naar de labels en data te houden creëren.

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

Zoals u kunt zien, accepteert de gehele getallen, floating point waarden, Booleans en strijkers. Als het het type data niet kan bepalen, wordt de Booleaanse 'FALSE terug dus het is altijd een goed idee om de return waarde te controleren.

Voor de beste prestaties raden wij het schrijven van gegevens in batches te InfluxDB, zodat je nodig hebt om de gegevens voor te bereiden in een batch te gaan. Dit is makkelijk te doen met een oproep tot

```swift
influxdb.prepare(point: point)
```

En wanneer het tijd is om de partij te schrijven, gewoon bellen

```swift
if influxdb.writeBatch() {
    print("Batch written successfully!\n")
}
```

Nogmaals, `writeBatch ()` geeft een boolean op succes of falen, dus het is een goed idee om deze waarden te controleren.

Als u elk gegevenspunt schrijven, zoals het komt, neem alleen de gegevens wijzen u hebt gemaakt boven en call

```swift
influxdb.writeSingle(dataPoint: point)
```

U kunt de gegevens naar meerdere metingen gelijktijdig te schrijven, want elk gegevenspunt wordt geïnitialiseerd met de meting daarvan, en u kunt toevoegen als veel tags en velden als u wilt.

Dit is echt de eerste pas op het InfluxDB v2.0 Swift bibliotheek Ik zal het toevoegen van de mogelijkheid om query, maken emmers, en een heleboel andere kenmerken van de [Flux taal] (https://docs.influxdata.com /flux/v0.12/introduction/getting-started/) naar de bibliotheek in de toekomst, maar omdat wat de meeste mensen willen meteen doen is schrijven van gegevens in de database, ik dacht dat ik dit er even uit.

Ik hoop dat dit helpt! Ik weet dat het voor mij! U ziet, ik heb de laatste tijd alleen met behulp van mijn Mac laptop te grijpen gegevens van mijn Bluetooth CO2 sensor die ik heb gebouwd. Om dat te doen, bouwde ik een kleine BLE applicatie die verbinding maakt met de sensor, onderschrijft de gegevens ID, en voortdurend schrijft de gegevens naar InfluxDB. Onnodig te zeggen, gebruikte ik deze bibliotheek en zijn schrapen deze informatie en slaan graag.

![Bekendmaking van gegevens als InfluxDB van Swift](/posts/category/database/images/2.0CO2-300x269.gif)

Ik zou graag horen wat u van plan bent te doen met een Swift Library voor 2.0 dus zorg ervoor dat [volg mij] (http://twitter.com/follow?user=davidgsIoT) op twitter en laat me weten wat je bent aan het doen!
