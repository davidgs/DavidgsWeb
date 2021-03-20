---
title: "Abenteuer in Golang"
Date: 2018-08-20
Author: davidgs
Category: General, Golang, IoT, Misc
Tags: golang, IoT
Slug: adventures-in-golang
hero: images/copyPasta.jpg
---

![Kopieren Einfügen](/posts/category/programming/images/copyPasta.jpg)

Ich bin kein Golang Entwickler. Lassen Sie sich nur, dass aus dem Weg nach vorne. Ich habe ein paar Dinge in Go entwickelt, aber ein Go-Entwickler bin ich nicht. Ich Art von Bedürfnis zu sein, aber es ist nicht unbedingt notwendig gewesen. Ich entschied, dass es wirklich an der Zeit war, den Sprung zu wagen und sich ernsthaft mit Go. Im Ernst, es gibt nur so viel Sie durch das Lesen im Internet lernen können.

Zu diesem Zweck habe ich zwei Maßnahmen ergriffen:

1. Ich bin in Denver nächste Woche Gophercon gehen
2. Ich portierte eine Bibliothek von C nach Go

Es ist # 2, dass ich heute über hier schreiben würde und nicht, weil ich denke, dass ich eine außergewöhnlich gute Arbeit den es tat, sondern weil es für andere nützlich sein kann, und nur zu notieren, was ich getan habe, falls ich beziehen möchte es später.

Lesen Sie weiter, wenn Sie interessiert sind!

## Hintergrund

Ich arbeite auf ein kleines IoT-Projekt (duh), die ein Raspberry Pi verwendet. Es verwendet auch einen Bosch BME280 Breakout-Board von Adafruit. Welche wäre super einfach zu behandeln, wenn ich es auf einem Arduino lief. Aber ich bin nicht. Und ja, ich bin mir bewusst, dass es Wege gibt, um nur laufen Arduino Skizzen auf Raspberry Pi, aber ich bin wirklich nicht so ein Fan von Arduino Skizzen, so dass ich beschloss, es eine andere Art und Weise zu tun.

Der Sensor ist I <sup>2</sup> C, natürlich, so dass es das war. Es ist einfach , die I <sup>2</sup> C - Bus zugänglich auf Raspberry Pi (nur laufen Raspi-config und Bobs Ihr Onkel) zu machen, aber mit I <sup>2</sup> C - Geräten zu tun ist ein wenig schwieriger. Ich habe versucht , ein paar C-basierten I <sup>2</sup> C - Bibliotheken , aber die meisten von ihnen gab ... * unerwartete * Ergebnisse. Der, den ich gefunden, die in der Nähe war, war von einem Benutzer GitHub namens „[BitBank2](https://github.com/bitbank2)“ (https://github.com/bitbank2/bme280), so habe ich beschlossen, seine verwenden. Ich war in der Lage, es zu kompilieren und das Beispielprogramm mit zumindest vernünftigen Ergebnissen laufen. Aber dann hatte ich es noch von einem User-Space-Programm aufzurufen, um die Ergebnisse zu erhalten. Ich sollte ein Rattenloch gerochen haben kommen, aber natürlich habe ich nicht.

Ich werde einfach Portierung auf Go! Hörte sich vernünftig zu der Zeit.

## Portieren auf Go

Es war eigentlich ein ** ** viel einfacher, als ich dachte, es wäre. Zunächst gibt es eine große Go I <sup>2</sup> C - Bibliothek von [@rakyll](https://twitter.com/rakyll) , die großen Werken. Ich hatte es für den Zugriff auf ein SenseAir K30 CO <sub>2</sub> -Sensor verwendet, so dass ich dachte , dass ich dort anfangen würde.

Da die Bibliothek, die ich aus bearbeitetem Start war, dachte ich, die einfachste Sache zu tun wäre, um nur halb gerade Übersetzung zu tun. Ich würde in ein paar Zeilen C-Code kopieren und dann mache es gehen. Es gab natürlich, dass einige Dinge einfach nicht gut funktionieren würde. Zum Beispiel will die I <sup>2</sup> C - Bibliothek in Bytes und Byte - Scheiben beschäftigen, so konnte ich nicht sehr gut nur die Ints verwendet , dass die C - Bibliothek verwendet. Außerdem verwendet die C-Bibliothek eine ganze Reihe von statischen globalen Variablen, und das war auch in gehen nicht gut zu arbeiten. Also ich Anpassungen:

```c
static int calT1,calT2,calT3;
static int calP1, calP2, calP3, calP4, calP5, calP6, calP7, calP8, calP9;
static int calH1, calH2, calH3, calH4, calH5, calH6;
```

wurde:

```go
type BME280 struct {
  Dev *i2c.Device
  tConfig []int
  pConfig []int
  hConfig []int
}
```

und

```go
device.tConfig = make([]int, 3)
device.pConfig = make([]int, 9)
device.hConfig = make([]int, 6)
```

So ziemlich der Rest davon war eine einfache Übersetzung einer Sprache C-Konstrukt in einem Golang Konstrukt drehen.

```c
// Prepare temperature calibration data
calT1 = ucCal[0] + (ucCal[1] << 8);
calT2 = ucCal[2] + (ucCal[3] << 8);
if (calT2 > 32767) calT2 -= 65536; // negative value
calT3 = ucCal[4] + (ucCal[5] << 8);
if (calT3 > 32767) calT3 -= 65536;
```

Wurde zu:

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

Und so weiter.

Jetzt kann jedes Go-Programm einfach wie folgt vor:

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

weil ein Aufruf `BME280ReadValues` gibt eine einfache Scheibe` ints` wie Temperatur, Druck und Feuchtigkeit, in dieser Reihenfolge. ** Hinweis **: Die Druckberechnung wird zur Zeit gebrochen, so schlage ich vor, nicht es zu benutzen.

Wie gesagt, war es überraschend einfach alles zum Laufen zu bringen! Ich habe jetzt eine bunte-voll funktionierende Bibliothek für die Adafruit ZBME280 Breakout Board golang!

Als nächstes ist eine ähnliche Bibliothek für den SenseAir K30 Sensor zu schreiben. Ich habe den Sensor funktioniert ganz gut bekam, muss ich nur noch den Code in eine Bibliothek machen.

Wenn Sie bei der Verwendung dieser Bibliothek interessiert sind, es ist frei verfügbar auf [my GitHub](https://github.com/davidgs).
