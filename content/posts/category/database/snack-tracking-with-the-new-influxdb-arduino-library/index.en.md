---
title: "Snack Tracking with the new InfluxDB Arduino Library"
Date: 2020-03-13
Author: davidgs
Category: Gadgetry, IoT
Tags: Arduino, InfluxData, InfluxDB, IoT, IoT Data, Snacks
Slug: snack-tracking-with-the-new-influxdb-arduino-library
hero: images/Screen-Shot-2020-03-13-at-2.26.15-PM.png
---

## A New Library

Many of you Arduino enthusiasts are probably aware of the existing InfluxDB library that was maintained by [Tobias Schürg](https://github.com/tobiasschuerg) for many years. Hats are off to him for providing this library and maintaining it for so long.

With the arrival of InfluxDB 2.0, it was time to update the library. Some of you may remember that I did a quick update to support the InfluxDB 2.0 OSS a few months ago, and that was working well, but InfluxData has been working towards a set of consistent, InfluxData-maintained set of client libraries. They have been working with Tobias over the last couple of months to update his library with our newest changes, and become a maintainer of that library. I'm glad to say that all of that work has paid off, and the new InfluxDB Arduino Library is officially released, and is also part of the [docs](https://v2.docs.influxdata.com/v2.0/reference/api/client-libraries/).

## Some Significant Additions

This new version of the library, while backward-compatible with the older version (mostly) has some really significant changes for the 2.0 version of InfluxDB while still supporting the 1.x line.

Batch writing is still supported, but it is **much** more seamless and efficient. I've been working with it a bit, and there is no longer a need to keep a batch counter and write out the batch manually. It's all handled for you. Possibly most significantly is the ability to keep the HTTP connection alive, which saves the overhead of instantiating the connection and tearing it down repeatedly. As long as you have reliable WiFi, that is.

There is now support for handling database back pressure. If your writes don't go through, the library will cache the writes that didn't succeed and try them again, and the size of the back pressure cache is configurable.

There is now an easy way to handle time stamps and time synchronization within the library itself. You can set the time precision, and the library automatically handles the time stamping for you.

There's much more, I'm sure (including handling SSL connections) that I haven't gotten to work with yet, but I'm sure I'll get a chance to soon!

## A Snack Tracker

Given that this new library just came out, I figured I would put it through its paces at least once right away. In order to do so, I wanted to write a *lot* of data through it to see how it held up. In order to do that, I went out and bought a little [DYI Digital Scale](https://www.amazon.com/gp/product/B07SX2MYMX/) that uses an HX711 to interface to the Load Cell. I then hooked that to a WEMOS D1 Mini (of course, since I have so many of them around), and I was ready to go! I wired it up:

![Snacker](/posts/category/database/images/Snacker.png )

The Arduino Library for the HX711 came with a sample program for calibrating the scales, and I sort of anticipated having to calibrate them, so I bought a set of calibration weights when I bought the scale. The Calibration program even saves the calibration data to the EEPROM for you so it is always calibrated. It looks like it's accurate to within about 0.05 grams, for the most part.

## Code Time

Now that the device was built, it was time to write a bit of code to send all this data to InfluxDB! Luckily the HX711 library also came with a sample program for just spewing out raw data from the device, so all I had to do was modify that ever so slightly to send my data to InfluxDB.

```cpp
// InfluxDB 2 server url, e.g. http://192.168.1.48:9999 (Use: InfluxDB UI -> Load Data -> Client Libraries)
#define INFLUXDB_URL "influxdb-url"
// InfluxDB 2 server or cloud API authentication token (Use: InfluxDB UI -> Load Data -> Tokens -> <select token>)
#define INFLUXDB_TOKEN "token"
// InfluxDB 2 organization name or id (Use: InfluxDB UI -> Settings -> Profile -> <name under tile> )
#define INFLUXDB_ORG "org"
// InfluxDB 2 bucket name (Use: InfluxDB UI -> Load Data -> Buckets)
#define INFLUXDB_BUCKET "bucket"

InfluxDBClient client(INFLUXDB_URL, INFLUXDB_ORG, INFLUXDB_BUCKET, INFLUXDB_TOKEN);

HX711_ADC LoadCell(D1, D2);
```

You will, of course, have to define your own URL, TOKEN, etc. I put the load cell on D1 and D2, so that's defined here too.

I then added the following to the end of the setup() routine:

```cpp
// Synchronize UTC time with NTP servers
// Accurate time is necessary for certificate validaton and writing in batches
configTime(0, 0, "pool.ntp.org", "time.nis.gov");
// Set timezone
setenv("TZ", "EST5EDT", 1;
influx.setWriteOptions(WritePrecision::MS, 3, 60, true);
```

That sets up the time synchronization, and sets my time precision to milliseconds, sets the batch size, the buffer size (which in my case I set to 3x the batch size), the flush interval (I make sure the a flush happens at least every 60 seconds) and I set the http-keepalive to true so I can just use the same connection every time.

That was all the setup I had to do!

Next, I need to write the data. And here's the thing, the HX711 example program reads the scale every 250ms

```cpp
float weight = 0.00;
void loop() {
   //update() should be called at least as often as HX711 sample rate; >10Hz@10SPS, >80Hz@80SPS
  //use of delay in sketch will reduce effective sample rate (be carefull with use of delay() in the loop)]{style="color: #999dab;"}
  LoadCell.update();
  //get smoothed value from data set
  if(millis() > t + 250) {
    float i = LoadCell.getData();
    weight = i;
    t = millis();
  }
  writeData(weight);
  ...
}
void writeData(float weight) {
  Point dPoint();
  dPoint.addTag("device", "ESP8266");
  dPoint.addTag("sensor", SENSOR_ID);
  dPoint.addField("weight", weight);
  Serial.print("Weight: ");
  Serial.println(weight);
  if(!influx.writePoint(dPoint)) {
    Serial.print("InfluxDB write failed: ");
    Serial.println(influx.getLastErrorMessage());
  }
```

In the above code I'm writing a new data point, with tags, etc., every ~250ms. You'll notice that I just keep writing the data points. But in the background, the library is handling the batching, caching, back-pressure, retries, etc. I just get to merrily write datapoints without thinking about them anymore.

## Gummy Bears

If you know me at all, you'll also know that I have sort of a *thing* for gummy bears. So I decided to test this thing out by loading it up with a bowl of gummy bears, and watching the data as I ate them. Lo and behold, it works!

![Gummies2](/posts/category/database/images/Gummies2.gif )

You can see that when I stick my hand in the bowl to get some, the weight goes up just a bit, then drops. Of course I had to make a Gummy Bear Dashboard:

![GummyDash](/posts/category/database/images/GummyDash.gif )

Which was really kind of fun, until I ran out of Gummy Bears.

![Screen Shot 2020 03 13 at 2 26 15 PM](/posts/category/database/images/Screen-Shot-2020-03-13-at-2.26.15-PM.png )

So far this thing has been running for a couple of hours and I have yet to see a single error message or hiccup from the device itself, so it looks like the batching, cacheing, etc. is all working perfectly.
