---
title: "Avonturen in Golang"
Date: 2018-08-20
Author: davidgs
Category: General, Golang, IoT, Misc
Tags: golang, IoT
Slug: adventures-in-golang
hero: images/copyPasta.jpg
---

![Kopiëren plakken](/posts/category/programming/images/copyPasta.jpg)

Ik ben geen Golang ontwikkelaar. Laten we gewoon die uit de weg aan de voorkant. Ik heb een paar dingen ontwikkeld in te gaan, maar een Go ontwikkelaar ben ik niet. Ik soort van nood te zijn, maar het is niet noodzakelijk geweest. Ik besloot dat het echt tijd om de sprong te wagen en ernstig over Go. Serieus, er is maar zo veel dat je kunt leren door het lezen van het internet.

Daartoe heb ik 2 acties ondernomen:

1. Ik ga Gophercon in Denver volgende week
2. Ik geport een bibliotheek van C naar Go

Het is # 2, dat ik hier over zal schrijven vandaag en niet omdat ik denk dat ik een uitzonderlijk goed werk, maar omdat het nuttig kan zijn voor anderen, en net op te nemen wat ik heb gedaan, voor het geval dat wil ik verwijzen naar het later.

Lees verder als je geïnteresseerd bent!

## Achtergrond

Ik heb gewerkt aan een beetje ivd project (duh), die gebruikt een Raspberry Pi. Het gebruikt ook een Bosch BME280 breakout boord van Adafruit. Die super gemakkelijk te behandelen als ik liep op een Arduino zou zijn. Maar ik ben niet. En ja, ik ben me ervan bewust dat er manieren zijn om gewoon lopen Arduino schetsen op Raspberry Pi maar ik ben niet zo'n fan van Arduino schetsen, dus heb ik besloten om het anders te doen.

De sensor <sup>I2C</sup> natuurlijk zodat er dat. Het is gemakkelijk om de I <sup>2</sup> C bus toegankelijk op Raspberry Pi (ren gewoon Raspi-config en klaar is Kees) te maken, maar het omgaan met I <sup>2</sup> C-apparaten is een beetje harder. Ik probeerde een paar C-gebaseerde I <sup>2</sup> C bibliotheken, maar de meeste van hen gaf ...*onverwachte* resultaten. Degene die ik vond dat het dichtst was, was door een GitHub gebruiker genaamd “[BitBank2](https://github.com/bitbank2)” (https://github.com/bitbank2/bme280), dus ik besloot om zijn te gebruiken. Ik was in staat om het te compileren en uitvoeren van het voorbeeld programma met ten minste een redelijke resultaten. Maar toen ik nog moest noemen van een aantal user-space programma, om de resultaten te krijgen. Ik zou een rathole komende geroken, maar natuurlijk heb ik niet.

Ik kom net poort aan Go! Klonk redelijke op het moment.

## porten naar Go

Het was eigenlijk een **lot** makkelijker dan ik dacht dat het zou zijn. Ten eerste is er een grote Go I <sup>2</sup> C-bibliotheek van [@rakyll](https://twitter.com/rakyll) dat werkt geweldig. Ik had het gebruikt om toegang te krijgen tot een SenseAir K30 CO <sub>2</sub> sensor, dus ik dacht dat ik daar beginnen.

Omdat de bibliotheek ik begon uit bewerkte, dacht ik dat het makkelijkste om te doen zou zijn om gewoon een semi-straight vertaling. Ik zou kopiëren in een paar regels van de C-code, en dan het gaan. Er waren natuurlijk een aantal dingen die gewoon niet goed werken. Bijvoorbeeld, de I <sup>2</sup> C-bibliotheek wil handelen in bytes en byte plakken, dus ik kon niet heel goed gewoon gebruik maken van de integers die de C-bibliotheek gebruikt. Ook de C bibliotheek die wordt gebruikt een hoop statische globale variabelen, en dat ook niet zou goed werken in gaan. Dus maakte ik aanpassingen:

```c
static int calT1,calT2,calT3;
static int calP1, calP2, calP3, calP4, calP5, calP6, calP7, calP8, calP9;
static int calH1, calH2, calH3, calH4, calH5, calH6;
```

werd:

```go
type BME280 struct {
  Dev *i2c.Device
  tConfig []int
  pConfig []int
  hConfig []int
}
```

en

```go
device.tConfig = make([]int, 3)
device.pConfig = make([]int, 9)
device.hConfig = make([]int, 6)
```

Vrijwel de rest was een simpele translatie van het omzetten van een C taal construct in een Golang construct.

```c
// Prepare temperature calibration data
calT1 = ucCal[0] + (ucCal[1] << 8);
calT2 = ucCal[2] + (ucCal[3] << 8);
if (calT2 > 32767) calT2 -= 65536; // negative value
calT3 = ucCal[4] + (ucCal[5] << 8);
if (calT3 > 32767) calT3 -= 65536;
```

Veranderd in:

```go
// time to set up the calibration
device.tConfig[0] = int(ucCal[0]) + (int(ucCal[1]) << 8)
device.tConfig[1] = int(ucCal[2]) + (int(ucCal[3]) << 8)
if device.tConfig[1] > 32767 {
  device.tConfig[1] -= 65536
}
device.tConfig[2] = int(ucCal[4]) + (int(ucCal[5]) << 8)
if device.tConfig[2] > 32767 {
  device.tConfig[2] -= 65536
}
```

Enzovoort.

Nu elke Go-programma kan gewoon het volgende doen:

```go
package main
import (
  "fmt"
  "github.com/davidgs/bme280_go"
  "time"
)
func main() {
  dev := "/dev/i2c-1"
  bme := bme280_go.BME280{}
  r := bme.BME280Init(dev)
  if r < 0 {
    fmt.Println("Error")
  }
  rets := bme.BME280ReadValues()
  f := 0.00
  f = float64(rets[0]) / 100.00
  fmt.Println("Temp: ", f)
  f = float64(rets[2]) / 1024.00
  fmt.Println("Humidity: ", f)
  bme.Dev.Close()
}
```

omdat een oproep naar `BME280ReadValues` geeft een eenvoudig stukje van` ints` zoals temperatuur, druk en vochtigheid, in die volgorde. **Opmerking**: De berekening druk wordt momenteel gebroken, dus ik niet suggereren het gebruik ervan.

Zoals ik al zei, het was verrassend gemakkelijk om alles werkend te krijgen! Ik heb nu een bonte-volledig functionerende bibliotheek voor de Adafruit ZBME280 Breakout Board in GoLang!

De volgende activiteit is een soortgelijke bibliotheek voor de SenseAir K30 sensor te schrijven. Ik heb de sensor werkt prima, ik moet gewoon de code om te zetten in een bibliotheek.

Als u geïnteresseerd bent in het gebruik van deze bibliotheek, het is vrij beschikbaar op [mijn GitHub](https://github.com/davidgs).
