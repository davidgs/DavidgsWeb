---
title: "Publishing Data to InfluxDB from Swift"
Date: 2019-03-29
Author: davidgs
Category: Uncategorized
Tags: Influx, InfluxDB, IoT, Swift
Slug: publishing-data-to-influxdb-from-swift
hero: images/2.0CO2-300x269.gif
---

I’ve been a very busy man. It was only a few days ago that I wrote about a new InfluxDB library for writing data from Arduino devices to InfluxDB v2 and here I am again, writing about a **new** library for writing data to InfluxDB. This time, it’s in Swift. Now your native Apple apps can write data directly to InfluxDB v2.0 with ease.

It’s a really simple library to use, and you can download the entire Xcode project for it from my [GitHub](https://github.com/davidgs/InfluxData-Swift). You can use it to write single data points to the DB, or to do bulk writes of any size. Here’s a quick tutorial on how to use it.

```swift
let influxdb = InfluxData()
```

That gets you an instance of the `InfluxData` class. Once you have that, you’ll need to set some configuration parameters for it.

```swift
influxdb.setConfig(server: “serverName", port: 9999, org: “myOrganization", bucket: “myBucket", token: “myToken")
```

You will, of course, need to set all those values according to your InfluxDB v2.0 server’s settings. You can also set the time precision with

```swift
let myPrecision = DataPrecision.ms // for Milliseconds, ‘us' for microseconds, and ’s’ for seconds
influxdb.setPrecision(precision: myPrecision)
```

At this point, you’re ready to start collecting data and sending it to InfluxDB v2.0! For each data point you collect and want to store, you will create a new `Influx` object to hold the tags and data.

```swift
let point: Influx = Influx(measurement: "myMeasurement")
point.addTag(name: "location", value: "home")
point.addTag(name: "server", value: "home-server")
if !point.addValue(name: "value", value: 100.01) {
    print("Unknown value type!\n")
}
if !point.addValue(name: "value", value: 55) {
    print("Unknown value type!\n")
}
if !point.addValue(name: "value", value: true) {
    print("Unknown value type!\n")
}
if !point.addValue(name: "value", value: "String Value") {
    print("Unknown value type!\n")
}
```

As you can see, it accepts Integers, floating point values, Booleans and strings. If it cannot determine the data type, it will return the Boolean `false` so it’s always a good idea to check the return value.

For best performance, we recommend writing data in batches to InfluxDB, so you’ll need to prepare the data to go into a batch. This is easy to do with a call to

```swift
influxdb.prepare(point: point)
```

And when it’s time to write the batch, just call

```swift
if influxdb.writeBatch() {
    print("Batch written successfully!\n")
}
```

Again, `writeBatch()` returns a Boolean on success or failure, so it’s a good idea to check those values.

If you want to write each data point as it comes in, just take the data point you created above and call

```swift
influxdb.writeSingle(dataPoint: point)
```

You can write data to multiple measurements simultaneously as each data point is initialized with its measurement, and you can add as many tags and fields as you’d like.

This is really the first pass at the InfluxDB v2.0 Swift library as I’ll be adding the ability to query, create buckets, and a lot of other features of the [Flux language](https://docs.influxdata.com/flux/v0.12/introduction/getting-started/) to the library in the future, but since what most people want to do right away is write data to the database, I thought I’d get this out there.

I hope this is helpful! I know it has been for me! You see, I have lately been just using my Mac laptop to grab data off of my Bluetooth CO2 sensor that I built. In order to do that, I built a small BLE application that connects to the sensor, subscribes to the data ID, and constantly writes the data to InfluxDB. Needless to say, I used this library and have been scraping this data and storing it happily.

![Publishing Data to InfluxDB from Swift](/posts/category/database/images/2.0CO2-300x269.gif)

I’d love to hear what you plan to do with a Swift Library for 2.0 so be sure to [follow me](http://twitter.com/follow?user=davidgsIoT) on twitter and let me know what you’re doing!
