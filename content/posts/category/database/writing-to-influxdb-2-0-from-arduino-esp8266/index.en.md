---
title: "Writing to InfluxDB 2.0 from Arduino ESP8266"
Date: 2019-03-22
Author: davidgs
Category: IoT
Tags: Arduino, ESP8266, IoT, IoT Data
Slug: writing-to-influxdb-2-0-from-arduino-esp8266
hero: images/3686-10.jpg
---

As InfluxData moves ever closer to releasing v2.0, it’s becoming increasingly important to be able to get data **into** InfluxDBv2, of course. Makes sense, right? Since the vast majority (like, indistinguishable from 100%) of my data comes from IoT devices, I decided it was time to start making those devices InfluxDB v2-capable.

I’m happy to say that the first step in that direction is now complete! One of my favorite sensors is a particulate matter sensor that measures the amount of **very small** particulate in the air (from 2.5µM to 100µM in diameter). This stuff, it turns out, is really *really* bad for you, so knowing how much is in the air is a good idea. To that end, I ordered one of these sensors from Adafriut:

![3686 10](/posts/category/database/images/3686-10.jpg )

It’s small, and easy to hook up to pretty much anything since it just spews data out via UART. Since I have a giant pile of ESP8266 boards lying around (I typically order them by the dozens since they are so cheap and easy to deal with), I hooked it up to one of those. The code was simple, thanks to Adafruit providing it, and there was a handle InfluxDB library to write data with, but it only supported InfluxDB v1.x. The first thing I did (because I was in a hurry) was to grab the 1.x library and just re-write it for 2.x. Took me about 1/2 hour or less, and it worked great! (you can use that version [here](https://github.com/davidgs/ESP8266_Influx_DB_V2) if you’d like). That really wasn’t the *right* solution though. So today I went back and created a proper fork of the [original repository](https://github.com/tobiasschuerg/ESP8266_Influx_DB), and updated it to support either version 1.x or version 2.x of InfluxDB. I’ve of course submitted a proper Pull Request against the original library and hope that it will be accepted/merged soon.

Let’s walk through what it takes to use this new library then. It’s dead simple, really. At least with Arduino, all you have to do is add the Library, then include it in your sketch:

```cpp
#include <InfluxDb.h>
//#include <InfluxDataV2.h> // if you want to use the other library I built and that’s in my GitHub 
#define INFLUXDB_HOST “myhost.com"
Influxdb influx(INFLUXDB_HOST);
```

That gets you started. Next you’re going to need some specific information from your InfluxDB v2.0 (alpha still!) installation. Notably, you will need the `organization`, `bucket`, and `token` that are associated with your account. You can find these by pointing your web browser at your InfluxDB server, port 9999, entering your username and password, and going to the Configuration Page:

![Screen Shot 2019 03 22 at 1 26 56 PM](/posts/category/database/images/Screen-Shot-2019-03-22-at-1.26.56-PM.png)

You can then enter them into the Arduino Sketch:

```cpp
influx.setBucket(“myBucket");
influx.setVersion(2);
influx.setOrg(“myOrg");
influx.setPort(9999);
influx.setToken(“myToken");
```

Once you’ve done that, in your `setup()` function, you can start writing data to your v2.0 Influx server!

```cpp
void loop() {
  loopCount++;
  InfluxData row("temperature");
  row.addTag("device", "alpha");
  row.addTag("sensor", "one");
  row.addTag("mode", "pwm");
  row.addValue("loopCount", loopCount);
  row.addValue("value", random(10, 40));
  influx.write(row);
  delay(5000);
}
```

See? I told you it was easy!
