---
title: "Adventures in golang"
Date: 2018-08-20
Author: davidgs
Category: General, Golang, IoT, Misc
Tags: golang, IoT
Slug: adventures-in-golang
hero: images/copyPasta.jpg
---

![Copier coller](/posts/category/programming/images/copyPasta.jpg)

Je ne suis pas un développeur golang. Il faut que ça juste que de la route à l'avant. J'ai développé quelques petites choses dans Go, mais un développeur Go Je ne suis pas. Je sorte de besoin d'être, mais il n'a pas été essentiel. J'ai décidé qu'il était vraiment le temps de franchir le pas et prendre au sérieux Go. Sérieusement, il y a seulement tant que vous pouvez apprendre en lisant l'Internet.

À cette fin, j'ai pris 2 actions:

1. Je vais Gophercon à Denver la semaine prochaine
2. Je Ported une bibliothèque de C à Go

Il est # 2 que je vais écrire ici aujourd'hui et non parce que je pense que je l'ai fait un travail exceptionnel de celui-ci, mais parce qu'il peut être utile aux autres, et juste pour enregistrer ce que je l'ai fait, au cas où je veux me référer à plus tard.

Lisez la suite si vous êtes intéressé!

## Fond

Je travaille sur un petit projet IdO (duh) qui utilise un Raspberry Pi. Il utilise également une carte de petits groupes Bosch BME280 de Adafruit. Ce qui serait super facile à traiter si je courais sur un Arduino. Mais je ne suis pas. Et oui, je suis conscient qu'il ya des façons de courir simplement croquis Arduino sur Raspberry Pi mais je ne suis vraiment pas un fan de croquis Arduino, alors j'ai décidé de le faire d'une autre manière.

Le capteur est I <sup>2</sup> C, bien sûr, il n'y avait que. Il est facile de faire I <sup>2</sup> C de accessible sur Raspberry Pi ( il suffit d' exécuter Raspi-config et Bob votre oncle), mais traitant de I <sup>2</sup> appareils C est un peu plus difficile. J'ai essayé deux à base C-I <sup>2</sup> bibliothèques C , mais la plupart d'entre eux a donné ... * résultats inattendus *. Celui que je trouvais qui était le plus proche était par un utilisateur GitHub appelé « [BitBank2](https://github.com/bitbank2) » (https://github.com/bitbank2/bme280) alors j'ai décidé d'utiliser son. J'ai pu compiler et exécuter le programme exemple avec au moins des résultats raisonnables. Mais je devais encore l'appeler depuis un certain programme de l'espace utilisateur afin d'obtenir les résultats. J'aurais senti un rathole venir, mais bien sûr, je n'ai pas.

Je vais juste le port à Go! Sonné raisonnable à l'époque.

## Go à Portage

Il était en fait beaucoup ** ** plus facile que je pensais que ce serait. Tout d' abord, il y a un grand I <sup>2</sup> Go bibliothèque C de [@rakyll](https://twitter.com/rakyll) qui fonctionne très bien. Je l' ai utilisé pour accéder à un capteur K30 SenseAir CO <sub>2,</sub> donc je pensais que je commencerais là.

Depuis la bibliothèque, je commençais de travaillé, je me suis dit la meilleure chose à faire serait de faire juste une traduction semi-droite. Je copie en quelques lignes de code C, puis la faire. Il y avait, bien sûr, certaines choses qui ne serait pas bien. Par exemple, la bibliothèque I <sup>2</sup> C veut traiter en octets et tranches d'octets, donc je ne pouvais pas très bien il suffit d' utiliser les ints que la bibliothèque C utilisée. En outre, la bibliothèque C a utilisé un grand nombre de variables globales statiques, et qui n'a pas non plus d'aller travailler bien aller. Donc, j'ai fait des ajustements:

```c
static int calT1,calT2,calT3;
static int calP1, calP2, calP3, calP4, calP5, calP6, calP7, calP8, calP9;
static int calH1, calH2, calH3, calH4, calH5, calH6;
```

devenu:

```go
type BME280 struct {
  Dev *i2c.Device
  tConfig []int
  pConfig []int
  hConfig []int
}
```

et

```go
device.tConfig = make([]int, 3)
device.pConfig = make([]int, 9)
device.hConfig = make([]int, 6)
```

À peu près le reste était une simple traduction de transformer une construction de langage C dans une construction golang.

```c
// Prepare temperature calibration data
calT1 = ucCal[0] + (ucCal[1] << 8);
calT2 = ucCal[2] + (ucCal[3] << 8);
if (calT2 > 32767) calT2 -= 65536; // negative value
calT3 = ucCal[4] + (ucCal[5] << 8);
if (calT3 > 32767) calT3 -= 65536;
```

Transformé en:

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

Etc.

Maintenant, tout programme Go peut simplement faire ce qui suit:

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

parce qu'un appel à `BME280ReadValues` retourne simple tranche de` ints` comme la température, la pression et l'humidité, dans cet ordre. ** Note **: Le calcul de la pression est actuellement cassé, donc je ne suggère pas l'utiliser.

Comme je l'ai dit, il était étonnamment facile de tout travail! J'ai maintenant une bibliothèque fonctionnelle-entièrement hétéroclite pour la SFE Adafruit ZBME280 en golang!

La prochaine étape est d'écrire une bibliothèque similaire pour le capteur K30 SenseAir. J'ai le capteur de travail très bien, je viens de tourner le code dans une bibliothèque.

Si vous êtes intéressé à utiliser cette bibliothèque, il est disponible gratuitement sur [mon GitHub](https://github.com/davidgs).
