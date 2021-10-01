---
title: "Here's Why I'm giving up on MyNewt (for now)"
Date: 2018-04-04
Author: davidgs
Category: IoT
Tags: Developer, IoT, mynewt
Slug: heres-why-im-giving-up-on-mynewt-for-now
hero: images/logo.png
reading_time: 5 minutes
---

![Large collection of microcontrollers and sensors](/posts/category/iot/iot-software/images/IMG_3724-300x293.jpg)

With all these sensors and platforms lying around, I wanted to just pick one and build a quick sensor demo. It should be easy, right?

## The basic idea

As you may (or may not) know, I spent a lot of time with the [Apache MyNewt project](https://mynewt.apache.org/) a year or so ago. It has enormous potential. It’s small, fast, and very lightweight. I even wrote a [tutorial](/posts/category/iot/iot-software/building-an-app-with-apache-mynewt/) on developing an app with MyNewt. I’m sure this post is going to annoy the good folks working on that project, but that is surely not my intention.

In developing a new demo for my new-ish job, I have been having problems with the stability of the Arduino Bluetooth stack. I decided that maybe MyNewt was a better route for this particular device, so I began trying to develop the app for MyNewt. Here’s why I’m giving up.

This is a dead-simple app. It does 3 things:

1. Waits until it gets a connection over Bluetooth
2. When connected, it reads an I2C sensor
3. Sends the value from the sensor to the connected device

Simple. In Arduino, there is an I2C library, “Wire” library, and I can simply do a Wire.begintransmission(0x68) — the I2C address of the device — then Wire.write() as many bytes as I want, then Wire.endtransmission() and the write to the I2C device is done. Likewise, I can read from an I2C device’s registers with a Wire.requestFrom(I2CAddr, len) and get back the number of bytes I requested from the I2C Device address requested. Simple. Clean.

## The MyNewt Approach

Unfortunately, in MyNewt, I pretty much have to start from scratch and build complex data structures, then figure out how to initialize them correctly, Here’s the “example” from another I2C sensor:

```cpp
int bno055_write8(struct sensor_itf *itf, uint8_t reg, uint8_t value) {
  int rc;
  uint8_t payload[2] = { reg, value};
  struct hal_i2c_master_data data_struct = {
    .address = itf->si_addr,
    .len = 2,
    .buffer = payload
  };
  rc = hal_i2c_master_write(itf->si_num, &data_struct, OS_TICKS_PER_SEC, 1);
  if (rc) {
    BNO055_ERR("Failed to write to 0x%02X:0x%02X with value 0x%02Xn",
    data_struct.address, reg, value);
    STATS_INC(g_bno055stats, errors);
  }
  return rc;
}
```

Notice that the “data_struct” takes the address out of the “sensor interface” structure, but then I have to pass them **both** to the `i2c_master_write()` call. I fooled around with this for a few days trying to adapt it to the sensor I have — and my sensor is **much** more simple — I simply write 4 bytes to the proper I2C address, then read back 4 bytes.

Here’s the entirety of the code required in Arduino:

```cpp
int readVal() {
  int value = 0;
  byte attn[4] = {0x22, 0x00, 0x08, 0x2A};
  Wire.beginTransmission(Addr);
  int x;
  for (x = 0; x < 4; x = x + 1) {
    Wire.write(attn[x]);
  }
  delay(10);
  Wire.endTransmission();
  delay(10);
  Wire.requestFrom(Addr, 4);
  byte i = 0;
  byte buffer[4] = {0, 0, 0, 0};
  while (Wire.available()) {
    buffer[i] = Wire.read();
    i++;
  }
  value |= buffer[1] & 0xFF;
  value = value << 8;
  value |= buffer[2] & 0xFF;
  byte sum = 0; //Checksum Byte
  sum = buffer[0] + buffer[1] + buffer[2];
  if (sum == buffer[3]) {
    return value;
  } else {
    // Failure!
    return 0;
  }
}
```

I’ll spare you the 3+ pages of C code in MyNewt it takes to get anywhere close to doing this. And then there’s the Bluetooth stack, and implementing a series of event handlers, etc. to deal with events, etc. It’s literally almost 1,000 lines of code (the main.c file is over 500 lines).

## The problem

And this, I think, is the problem with MyNewt. In the year+ since I was involved it hasn’t evolved to be any more user-friendly. It remains deeply mired in the weeds. If what you want to do is write highly board-specific code that is not really reusable, and requires a very deep knowledge of the underlying hardware, RTOS, libraries, etc. then MyNewt is for you. If, on the other hand, you’re a developer that simply wants to get stuff done, it just isn’t. I would love to be able to use MyNewt for this demo. I really would. I think it has great potential, and it’s come a long way in its short lifetime. But in order for it to gain traction with a wider developer audience — like, say, the Arduino crowd — it’s going to have to start making things a **lot** easier for would-be developers.

Abstraction libraries — like Arduino’s Wire library — and wrapper libraries around the Bluetooth NimBLE libraries, etc. are a necessity I really do hope I can come back to MyNewt again and develop this demo app quickly. I just don’t have the time right now to dig around and write very low-level, board-specific, code in order to make this demo work. I’ll just have to continue to work around the bugs in Arduino.
