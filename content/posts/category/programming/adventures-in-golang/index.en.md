---
title: "Adventures in Golang"
Date: 2018-08-20
Author: davidgs
Category: General, Golang, IoT, Misc
Tags: golang, IoT
Slug: adventures-in-golang
hero: images/copyPasta.jpg
---

![Copy/Paste](/posts/category/programming/images/copyPasta.jpg)

I’m not a Golang developer. Let’s just get that out of the way up front. I’ve developed a few things in Go, but a Go developer I’m not. I sort of need to be, but it hasn’t been essential. I decided that it was really time to take the plunge and get serious about Go. Seriously, there’s only so much you can learn by reading the internet.

To that end, I have taken 2 actions:

1. I’m going to Gophercon in Denver next week
2. I ported a library from C to Go

It’s #2 that I’ll write about here today and not because I think I did an exceptionally good job of it but because it may be useful to others, and just to record what I’ve done, in case I want to refer to it later.

Read on if you’re interested!

## Background

I’ve been working on a little IoT project (duh) that is using a Raspberry Pi. It also uses a Bosch BME280 breakout board from Adafruit. Which would be super easy to deal with if I was running it on an Arduino. But I’m not. And yes, I’m aware that there are ways to just run Arduino sketches on Raspberry Pi but I really am not such a fan of Arduino sketches, so I decided to do it another way.

The sensor is I<sup>2</sup>C, of course, so there was that. It’s easy to make the I<sup>2</sup>C buss accessible on Raspberry Pi (just run raspi-config and Bob’s your Uncle), but dealing with I<sup>2</sup>C devices is a little harder. I tried a couple of C-based I<sup>2</sup>C libraries but most of them gave … *unexpected* results. The one I found that was the closest was by a GitHub user called “[BitBank2](https://github.com/bitbank2)”  (https://github.com/bitbank2/bme280) so I decided to use his. I was able to compile it and run the example program with at least reasonable results. But then I still had to call it from some user-space program in order to get the results. I should have smelled a rathole coming, but of course I didn’t.

I’ll just port it to Go! Sounded reasonable at the time.

## Porting to Go

It was actually a **lot** easier than I thought it would be. First, there’s a great Go I<sup>2</sup>C library from [@rakyll](https://twitter.com/rakyll) that works great. I had used it to access a SenseAir K30 CO<sub>2</sub> sensor, so I thought I’d start there.

Since the library I was starting from worked, I figured the easiest thing to do would be to just do a semi-straight translation. I’d copy in a few lines of the C code, and then make it Go. There were, of course, some things that just wouldn’t work well. For instance, the I<sup>2</sup>C library wants to deal in bytes and byte slices, so I couldn’t very well just use the ints that the C library used. Also, the C library used a slew of static global variables, and that was also not going to work well in go. So I made adjustments:

```c
static int calT1,calT2,calT3;
static int calP1, calP2, calP3, calP4, calP5, calP6, calP7, calP8, calP9;
static int calH1, calH2, calH3, calH4, calH5, calH6;
```

became:

```go
type BME280 struct {
  Dev *i2c.Device
  tConfig []int
  pConfig []int
  hConfig []int
}
```

and

```go
device.tConfig = make([]int, 3)
device.pConfig = make([]int, 9)
device.hConfig = make([]int, 6)
```

Pretty much the rest of it was a simple translation of turning a C language construct into a Golang construct.

```c
// Prepare temperature calibration data
calT1 = ucCal[0] + (ucCal[1] << 8);
calT2 = ucCal[2] + (ucCal[3] << 8);
if (calT2 > 32767) calT2 -= 65536; // negative value
calT3 = ucCal[4] + (ucCal[5] << 8);
if (calT3 > 32767) calT3 -= 65536;
```

Turned into:

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

And so on.

Now any Go program can simply do the following:

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

because a call to `BME280ReadValues` returns a simple slice of `ints` as Temperature, Pressure, and Humidity, in that order. **Note**: The pressure calculation is currently broken, so I don’t suggest using it.

As I said, it was surprisingly easy to get it all working! I now have a motley-fully functioning library for the Adafruit ZBME280 Breakout Board in GoLang!

Next up is to write a similar library for the SenseAir K30 sensor. I’ve got the sensor working just fine, I just have to turn the code into a library.

If you're interested in using this library, it's freely available on [my GitHub](https://github.com/davidgs).
