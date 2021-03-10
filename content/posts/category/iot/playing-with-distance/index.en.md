---
title: "Playing With Distance"
Date: 2017-06-01
Author: davidgs
Category: Gadgetry, IoT
Slug: playing-with-distance
hero: images/3317-03.jpg
---

I've been playing with a bunch of different sensors lately (see [here](/posts/category/iot/iot-software/building-an-app-with-apache-mynewt/)) so I thought I'd do another little write-up of it. I dug my [Particle](https://particle.io/) Photon out to play with after being inspired at an [NC RIoT](https://www.meetup.com/NC-RIoT-Regional-Internet-of-Things/) event a few weeks ago and it had been a [long time](/posts/category/iot/iot-hardware/new-hardware/) since I'd had it out. I'm not going to share the exact problem I was trying to solve with this little application, as it's still a work in progress and may very well end up being a product soon, but I'll tell you how I'm doing it. 

## Ultrasonics

I started off using a [MaxBotics](http://www.maxbotix.com) Ultrasonic sensor, but it was very unsatisfactory as It was inside a box, and ultrasonic sensors in confined spaces are really problematic. Sound waves bounce around a lot and cause all sorts of side-effects that are difficult to compensate for. Plus they're just not **that** accurate. Ultrasonics just wouldn't work for my application. 

![Beam Pattern MB1034](/posts/category/iot-iot-software/images/Beam-Pattern-MB1034.gif)

You'll notice that the 'cone' expands basically as a square. at 6" distance, it is 6" wide. If your box is less than 6" wide, you're already getting a reflection, and a reading of a distance measurement, which is not what you want. 

## Let There Be (Invisble) Light!

Then I found this little sensor. The [Adafruit VL530L0X](https://www.adafruit.com/product/3317) Time of Flight Sensor. The board itself is less than 1 square inch, which is really nice. It's also perfectly flat which, for an application that wants to leave the entire volume of the box unoccupied, is also extremely nice. But the best part is that it has its own self-contained laser and measures time-of-flight of the light to the target. The chip, which is about the size of a grain of rice, fires an invisible laser and measures the return time to determine distance. The fact that it can determine this time over a 50mm distance is really remarkable. Being light and not sound also means that it is a very focussed measurement without an ever-increasing cone of reflection.  Of course this means placement of the sensor is fairly important. 

![Bounce3](/posts/category/iot-iot-software/images/Bounce3.png)

This obviously won't work. The sensor must be placed directly over the measurement surface, and as flat as possible. 

![Bounce2](/posts/category/iot-iot-software/images/Bounce2.png)

Interestingly enough with this sensor the measurement surface doesn't have to be white, or even all that reflective. I've tested results with all sorts of different materials and colors (black, red, white, paper, cardboard, clear plastic, etc.) and the results are astonishingly good. My tests of average distance and variance don't seem to change no matter what material I'm measuring against. That's a good thing!

## Calibration and Reading

There is a certain amount of jitter in the readings, so in order to smooth the results, I first calibrate an empty reading average, and the average variance in readings:

```cpp
#define SAMPLE_SIZE 100 // sample size for calibration of empty box
#define AV_SAMPLE 10 // sample size for each reading averaging
int variance = 0;
int empty = 0;

int calibrate(void) {
  empty = 0;
  int x = 0;
  int prevVal = 0;
  int val = 0;
  while(x < SAMPLE_SIZE){
    if (measure.RangeStatus != 4) {
      prevVal = val;
      val = measure.RangeMilliMeter;
      variance += abs(val-prevVal);
      empty += val;
    } else {
      mailStat = "Mailbox Sensor Error!";
      return -1;
    }
    x++;
    delay(SAMPLE_SIZE/10);
  }
  empty = empty/SAMPLE_SIZE;
  variance = variance/SAMPLE_SIZE;
  return 0;
}
```

I found that averaging over about 100 samples gives me a good baseline measurement, with about a 2mm 'jitter' variance. In a 200mm box, that's a 2% variance, which is really quite good and completely acceptable. When I'm actually doing the realtime measurements, I need to take a bunch of measurements and average them as well because of this jitter. Not as many, of course.

```cpp
int getRangeReading(void){
  int count = 0;
  int av = 0;
  while(count < AV_SAMPLE){
    lox.rangingTest(&measure, false);
    if (measure.RangeStatus != 4) {
      av += measure.RangeMilliMeter;
    } else {
      mailStat = "Mailbox Sensor Error!";
      return -1;
    }
    count++;
    delay(AV_SAMPLE);
  }
  av = av/AV_SAMPLE;
  return av;
}
```

I haven't needed to calculate the variance in these shorter samples as the variance seems to average out the same as the overall variance calculated during the calibration routine. 

I did find that I got a fair amount of false-positive readings if I just compared a reading to the 'empty' value ± the calculated variance, so for stability I simply added 2 to the average variance -- I arrived at that number by trial and error, so it's not scientific or anything -- and any deviation from variance ± 2 I treat as an 'event'. So far, that's been highly accurate over a wide variety of tests with a large number of measurements. 

## Getting Thinner

I wanted to be able to measure the placement of even a single business card in this box. A business card is, of course, less than 1mm thick, but it's still possible. I simply made the floor of the box slightly corrugated, and 'shoot' to the bottom of one of the corrugations. 

![Bounce5](/posts/category/iot-iot-software/images/Bounce5.png)

They are about 3mm deep, so a single business card placed on the surface registers quite well. Problem solved!

So that's my distance measurement exercise for the day. I hope you found it useful!
