---
title: "How to Output Data from Flux to MQTT Natively"
Date: 2019-08-23
Author: davidgs
Category: Database
Slug: how-to-output-data-from-flux-to-mqtt-natively
hero: images/mqtt.png
---

## Writing data from InfluxDB to MQTT using Flux

I started using the Open Source (OSS) version of InfluxDB v2.0 very early on in the Alpha releases. Even in the early releases, I was very enamored with the way things were shaping up. But as you know, I do a **lot** of IoT builds, and use InfluxDB for all of it, so there were a few things I needed it to do that it just didn't, yet.

One of the things I have all my IoT Demos do is to write out alerts to an MQTT broker. I have other IoT Devices that read from that broker, and take actions based on what messages they receive. But InfluxDB 2.0 Alpha had no real output capabilities.

**Note:** There is an alerting framework that is coming to InfluxDB 2.0 very soon, but a) it wasn't available then and b) I needed it now.

What to do? Well, Flux is an extensible language, so I decided to extend the language to write to MQTT. First, it's important to note that Flux has 2 language constructs for reading and writing data: `from()` and `to()`. If you've written any Flux at all, you'll recognize the `from()` syntax as being how you get data back from InfluxDB. The `to()` business is a bit harder. Built into the language is the ability to write back to InfluxDB, using the `to()` syntax. I also found a `to()` extension for http that allows you to write the results of your Flux query out to an http end-point. At least I now had a starting place!

## Adding MQTT to Flux

I began poking around in the Flux code to see how the http `to()` method was implemented and quickly saw that it would be almost trivial to use this same framework for MQTT, so I copied all the code fro the http `to()` output and began working to move it over to MQTT. As with all of these things, it was a little less 'trivial' than I at first thought, but after a few weeks of on-again off-again work, I had a working output to MQTT from Flux!

First, I had to define what options the MQTT output would need, and I settled on a sort of default minimum set of options:

```go
type ToMQTTOpSpec struct {
    Broker string `json:"broker"`
    Name string `json:"name"`
    Topic string `json:"topic"`
    Message string `json:"message"`
    ClientID string `json:"clientid"`
    Username string `json:"username"`
    Password string `json:"password"`
    QoS int `json:"qos"`
    NameColumn string `json:"nameColumn"` // either name or name_column must be set, if none is set try to use the "_measurement" column.
    Timeout time.Duration `json:"timeout"` // default to something reasonable if zero
    NoKeepAlive bool `json:"noKeepAlive"`
    TimeColumn string `json:"timeColumn"`
    TagColumns []string `json:"tagColumns"`
    ValueColumns []string `json:"valueColumns"`
}
```

Of course, not all of those are **required**, but I'll go through the ones that are.

First, of course, you need to define a Broker. This is the URL of the MQTT broker that you want to use. In your URL your broker should be identified as either `tcp`, `ws` or `tls` so `tcp://mqtt.mybroker.com:1883` would be what it's looking for. Most of the rest are, by and large, optional to a degree. **If** you supply a `Username` then you **must also** supply a password. You can't have one without the other! Also, if you don't supply a `Topic` then one will be created for you by stringing together all of the tags returned from your query. I'd advise giving a topic, as a topic of `/tag1/tag_2/tag_3/...` would be less than ideal in a lot of situations.

## How to use this new thing?

I'm glad you asked! First, it's not actually part of Flux just yet. I have submitted a PR, it has been accepted, but (as of this writing) has not been merged. If you want to build your own version of Flux in order to get your hands on this *now* then you'll need to pull the branch and build from source. See the [MQTT PR](https://github.com/influxdata/flux/pull/1653) and go from there.

Once you've done that, the Flux code to start writing to an MQTT broker is actually trivial! You'll want to create a Task in the InfluxDB 2.0 UI, and then you can paste in the following code:

```js
import "mqtt"
from(bucket: "telegraf")
    |> range(start: -task.every)
    |> filter(fn: (r) =>
        (r._measurement == "cpu"))
    |> filter(fn: (r) =>
        (r._field == "usage_system"))
    |> filter(fn: (r) =>
        (r.cpu == "cpu-total"))
    |> last()
    |> mqtt.to(
        broker: "tcp://davidgs.com:8883",
        topic: "cpu",
        clientid: "cpu-flux",
        valueColumns: ["_value"],
        tagColumns: ["cpu", "host"],
    )
```

This will write the last CPU `usage_system` value to your MQTT broker. Using the UI, you can decide how frequently you want this data written.

## A few things to note

It's important to realize that [Flux returns all of its data from queries as tables](https://www.influxdata.com/blog/use-flux-to-group-shape-and-analyze-your-time-series-data/). The reason the above Task uses the `last()` function is to limit the returned value to a table with exactly one row. The MQTT `to()` function will write the whole table to the broker, as line-protocol. If your query returns a very large table, be prepared for your MQTT broker to get a very large table as the message payload.

In addition, if your query returns multiple tables, the MQTT `to()` function will write one message **per table** with each message containing an entire table. If this is not the behavior you want, you should think about how to craft your query such that it returns a single (preferably small) table as the results.

You may also have noticed an optional field `Message` above. If what you'd like is to send a pre-defined message instead of a table of results, you can define the `message` parameter in your call to `to()` and that message will be sent.
So far, I've been using this for about 2 months with fantastic results! I'm able to control some IoT devices based on the readings from other IoT devices and it works great!

**Update:** The PR for this has now been merged into the master branch so it should be showing up in a release of Flux soon!
