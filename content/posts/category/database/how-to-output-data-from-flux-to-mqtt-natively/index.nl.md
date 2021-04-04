---
title: "How to Output gegevens van Flux MQTT native"
Date: 2019-08-23
Author: davidgs
Category: Database
Slug: how-to-output-data-from-flux-to-mqtt-natively
hero: images/mqtt.png
---

## Het schrijven van data naar InfluxDB MQTT via Flux

Ik begon met behulp van de Open Source (OSS) versie van InfluxDB v2.0 heel vroeg in de Alpha releases. Zelfs in het begin van de releases, was ik erg verliefd op de manier waarop dingen zijn vormgeving. Maar zoals u weet, ik doe een **lot** van ivd bouwt, en gebruik InfluxDB voor alles, dus er waren een paar dingen die ik nodig had om te doen, dat het niet deed, maar toch.

Een van de dingen die ik heb al mijn ivd Demos doen is om uit te schrijven waarschuwingen om een MQTT makelaar. Ik heb andere ivd Apparaten die gelezen van die makelaar, en acties op basis van wat berichten die ze ontvangen te nemen. Maar InfluxDB 2.0 Alpha had geen echte output mogelijkheden.

** Opmerking: ** Er is een waarschuwingssignaal raamwerk dat komt naar InfluxDB 2,0 zeer binnenkort, maar a) het niet beschikbaar was toen en b) ik moest het nu.

Wat te doen? Nou, Flux is een uitbreidbare taal, dus heb ik besloten om de taal uit te breiden om te schrijven naar MQTT. Ten eerste is het belangrijk te weten dat Flux heeft 2 taalconstructies voor het lezen en schrijven van data: `van ()` en `om ()`. Als u Flux hebt geschreven helemaal niet, dan heb je de `van ()` syntax, erkennen als hoe je data terug van InfluxDB. De `naar ()` business is een beetje moeilijker. Ingebouwd in de taal is het vermogen om te schrijven terug naar InfluxDB, met behulp van de `om ()` syntax. Ik vond ook een `om ()` extensie voor http waarmee u de resultaten van uw Flux-query uit te schrijven om een http eindpunt. Tenminste had ik nu een startplaats!

## Toevoegen MQTT te Flux

Ik begon rondneuzen in de Flux code om te zien hoe de http `om ()` methode werd uitgevoerd en al snel zag dat het zou bijna triviaal om ditzelfde kader voor MQTT te gebruiken, dus ik alle code weer de http `gekopieerd ( ) `output en begon te werken om het te verplaatsen naar MQTT. Zoals met al deze dingen, was het een beetje minder 'triviaal' dan ik in eerste instantie gedacht, maar na een paar weken van de on-weer off-weer werken, had ik een werkende output naar MQTT van Flux!

Eerst moest ik om te bepalen welke opties de MQTT uitgang nodig zou hebben, en ik heb uiteindelijk besloten een soort standaard minimale set opties:

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

Natuurlijk, niet zijn allen met **verplicht**, maar ik ga door middel van degenen die zijn.

Ten eerste, natuurlijk, moet je een makelaar te definiëren. Dit is de URL van de MQTT makelaar die u wilt gebruiken. In je URL moet uw makelaar worden onderkend dat zij `tcp`,` ws` of `tls` zo` tcp: //mqtt.mybroker.com: 1883` zou zijn wat het zoekt. Het grootste deel van de rest zijn, in grote lijnen, eventueel tot op zekere hoogte. **Als** leveren u een `Username` dan heb je ** moet ook ** een wachtwoord. Je kan niet zonder het ander te hebben! Ook als u een `Topic` niet doe dan leveren een zal worden gemaakt voor u door het aaneenrijgen van alle labels terug van uw zoekopdracht. Ik zou adviseren het geven van een onderwerp, als een onderwerp van `/ tag1 / TAG_2 / TAG_3 / ...` zou minder dan ideaal in veel situaties.

## Hoe dit nieuwe ding gebruiken?

Ik ben blij dat je het vraagt! Ten eerste is het niet eigenlijk een deel van Flux gewoon nog niet. Ik heb een PR ingediend, deze is geaccepteerd, maar (met ingang van dit schrijven) is niet samengevoegd. Als u wilt uw eigen versie van Flux bouwen om je handen te krijgen over dit*nu* dan zul je nodig hebt om de tak en build te trekken van de bron. Zie de [MQTT PR](https://github.com/influxdata/flux/pull/1653) en ga vanaf daar.

Zodra je dat hebt gedaan, de Flux code te beginnen met het schrijven aan een MQTT broker is eigenlijk triviaal! U wilt een taak te creëren in de InfluxDB 2.0 UI, en dan kun je plakken in de volgende code:

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

Dit zal de laatste CPU `usage_system` waarde aan uw MQTT makelaar te schrijven. Met behulp van de UI, kunt u bepalen hoe vaak u deze gegevens geschreven maar wilt.

## Een paar dingen om kennis te nemen

Het is belangrijk om te beseffen dat [Flux geeft alle gegevens van queries als tabellen] (https://www.influxdata.com/blog/use-flux-to-group-shape-and-analyze-your-time-series- gegevens/). De reden waarom de bovengenoemde taak wordt de laatste '()' functie is om de geretourneerde waarde beperken tot een tafel met precies één rij. De MQTT `om () 'functie de gehele tabel te schrijven aan de makelaar als line-protocol. Als uw vraag een zeer grote tafel terugkeert, worden voorbereid op je MQTT makelaar om een zeer grote tafel te krijgen als het bericht payload.

Bovendien, als je zoekopdracht meerdere tabellen terug, de MQTT `om ()` functie een bericht te schrijven ** per tafel ** met elk bericht bevat een hele tabel. Als dit niet het gedrag dat u wilt, moet je nadenken over hoe je je zoekopdracht ambachtelijke zodanig dat het een enkele (bij voorkeur kleine) tafel als de resultaten terug.

U kunt ook een optioneel veld `Message` hierboven heb opgemerkt. Als wat je wilt is om een vooraf gedefinieerde bericht te sturen in plaats van een tabel van de resultaten, kunt u de `message` parameter in uw oproep definiëren` om () `en dat bericht wordt verstuurd.
Tot nu toe heb ik deze gebruiken voor ongeveer 2 maanden met een fantastisch resultaat! Ik ben in staat om een aantal ivd-apparaten op basis van de lezingen uit andere ivd-apparaten te bedienen en het werkt geweldig!

** Update: ** De PR voor deze is nu samengevoegd in de master branch, zodat het op moet worden weergegeven in een vrijval van Flux binnenkort!
