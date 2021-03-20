---
title: "Aventuras en Golang"
Date: 2018-08-20
Author: davidgs
Category: General, Golang, IoT, Misc
Tags: golang, IoT
Slug: adventures-in-golang
hero: images/copyPasta.jpg
---

![Copiar pegar](/posts/category/programming/images/copyPasta.jpg)

No soy un desarrollador Golang. Vamos a conseguir que fuera del camino en la delantera. He desarrollado algunas cosas en ir, pero un desarrollador Go no lo soy. En cierto modo me necesitan ser, pero no ha sido esencial. Decidí que era realmente el momento de dar el paso y tomar en serio acerca de Go. En serio, sólo hay mucho que se puede aprender mediante la lectura de internet.

Con ese fin, he tomado 2 acciones:

1. Voy a Gophercon en Denver la semana próxima
2. porté una biblioteca de C a Go

Es # 2 que voy a escribir sobre hoy aquí y no porque creo que he hecho un trabajo excepcionalmente bueno de ella, pero ya que puede ser útil a los demás, y sólo para grabar lo que he hecho, en caso de que quiera hacer referencia a eso mas tarde.

Sigue leyendo si usted está interesado!

## Fondo

He estado trabajando en un pequeño proyecto de la IO (la) que utiliza un Frambuesa Pi. También utiliza un tablero del desbloqueo Bosch BME280 de Adafruit. ¿Cuál sería muy fácil de tratar si yo estaba corriendo en un Arduino. Pero yo no. Y sí, soy consciente de que hay maneras de bocetos Arduino simplemente correr sobre Raspberry Pi, pero realmente no soy un fan de bocetos Arduino tal, así que decidí hacerlo de otra manera.

El sensor es I <sup>2</sup> C, por supuesto, así que no había que. Es fácil de hacer que el bus <sup>I2C</sup> accesible en Frambuesa Pi (sólo ejecute Raspi-config y Bob es tu tío), pero se trata de dispositivos de E <sup>2</sup> C es un poco más difícil. He intentado un par de I <sup>2</sup> C bibliotecas basadas en C, pero la mayor parte de las di ... * * resultados inesperados. El que más me di cuenta de que era el más cercano era por un usuario GitHub llamado “[BitBank2](https://github.com/bitbank2)” (https://github.com/bitbank2/bme280) así que decidí usar el suyo. Yo era capaz de compilar y ejecutar el programa de ejemplo, con por lo menos resultados razonables. Pero entonces todavía tenía que llamarlo de algún programa de espacio de usuario con el fin de obtener los resultados. Debería haber olido una ratonera que viene, pero por supuesto no lo hice.

Yo sólo portarlo a Go! Sonaba razonable en el momento.

## Trasladar a Go

En realidad, fue mucho más fácil ** ** de lo que pensaba que sería. En primer lugar, hay una gran biblioteca de C <sup>2</sup> Go I a partir de [@rakyll](https://twitter.com/rakyll) que funciona muy bien. Había utilizado para acceder a un sensor de SenseAir K30 CO <sub>2,</sub> por lo que pensé en empezar por ahí.

Dado que la biblioteca estaba empezando a partir trabajado, pensé que la cosa más fácil de hacer sería simplemente hacer una traducción semi-recta. Me copio en unas pocas líneas de código C, y luego hacer que se vaya. Hubo, por supuesto, algunas cosas que simplemente no funcionan bien. Por ejemplo, la biblioteca I <sup>2</sup> C quiere tratar en bytes y rodajas de bytes, así que no podía muy bien sólo tiene que utilizar los enteros que la biblioteca de C utilizado. Además, la biblioteca C utiliza una gran cantidad de variables globales estáticas, y que además no iba a funcionar bien en cualquier lugar. Así que hice ajustes:

```c
static int calT1,calT2,calT3;
static int calP1, calP2, calP3, calP4, calP5, calP6, calP7, calP8, calP9;
static int calH1, calH2, calH3, calH4, calH5, calH6;
```

se convirtió:

```go
type BME280 struct {
  Dev *i2c.Device
  tConfig []int
  pConfig []int
  hConfig []int
}
```

y

```go
device.tConfig = make([]int, 3)
device.pConfig = make([]int, 9)
device.hConfig = make([]int, 6)
```

Más o menos el resto era una simple traducción de convertir una construcción del lenguaje C en una construcción Golang.

```c
// Prepare temperature calibration data
calT1 = ucCal[0] + (ucCal[1] << 8);
calT2 = ucCal[2] + (ucCal[3] << 8);
if (calT2 > 32767) calT2 -= 65536; // negative value
calT3 = ucCal[4] + (ucCal[5] << 8);
if (calT3 > 32767) calT3 -= 65536;
```

Convertido en:

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

Etcétera.

Ahora cualquier programa Go puede simplemente hacer lo siguiente:

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

porque una llamada a `BME280ReadValues` devuelve una rebanada sencillo de` ints` como la temperatura, presión y humedad, en ese orden. ** Nota **: El cálculo de la presión se rompe en la actualidad, por lo que no recomiendo usarlo.

Como ya he dicho, fue sorprendentemente fácil de conseguir que todo trabajo! Ahora tengo una biblioteca abigarrada-en pleno funcionamiento para el tablero del desbloqueo del Adafruit ZBME280 en GoLang!

El siguiente paso es escribir una biblioteca similar para el sensor SenseAir K30. Tengo el sensor funcionando muy bien, sólo tengo que convertir el código en una biblioteca.

Si está interesado en utilizar esta biblioteca, que es libremente disponible en [mi GitHub](https://github.com/davidgs).
