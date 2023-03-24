---
Title: "ThingMonk 2017"
Date: 2017-10-20
Category: general
Slug: thing-monk-2017
hero: images/logo-2017-3.png
reading_time: 8 minutes
---

> **Note:** This is a post from my archives. I wrote it in 2017, and it was posted on the [InfluxData Blog](https://www.influxdata.com/blog/thingmonk-iot-insights/).
Back in September 2017, I attended the ThingMonk Conference in London. Here is a brief overview of what I learned and some of the insight I gleaned from the conference. The ThingMonk 2017 videos are starting to drop if you want to get the full scoop.

## Background

The annual<sup>[1]({{<ref "#link-1" >}})</sup> ThingMonk IoT conference was held in Shoreditch, London from September 11 – 13, 2017 with InfluxData sponsoring the video recordings. Those recordings are just now starting to come out, so make sure to go watch them all as they come out! Below is the current release schedule for the first set of ThingMonk 2017 videos is as follows:

> All videos have been released and are available on the [ThingMonk YouTube channel](https://redmonk.com/?series=thingmonk-2017).

Another set of the rest of the videos will be posted once the first set is done.

ThingMonk is actually 2 days of ThingMonk, with an opening Eclipse IoT Day.

ThingMonk is an incredibly diverse and inclusive conference with a very explicit and strongly enforced Code of Conduct. Why am I mentioning the diversity and Code of Conduct in a blog post? Because one of the strengths of the conference, I believe, is the incredible emphasis on diversityboth in speakers and attendees that RedMonk works very hard to achieve. And part of making the diversity successful is the Code of Conduct. Other conference organizers could learn a thing or two about how to make a conference more diverse and inclusive by studying what RedMonk does.

Over the course of 3 days of ThingMonk and Eclipse IoT Day, I attended 23 sessions and 2 coding workshops dedicated entirely to IoT. That’s a lot of IoT in 3 days! You can see the entire agenda for all 3 days here.

## Eclipse IoT Day

Day One of the ThingMonk conference was actually an Eclipse IoT Day sponsored entirely by the Eclipse Foundation. Look for further news on the Eclipse Foundation!

The first talk was by Ian Craggs on MQTT 5.0and a brief history of MQTT over the years. I had no idea how long MQTT had been around! There are some new features coming in MQTT 5.0 such as meta-data, etc. that I’m hoping InfluxDB can support as early as possible in the MQTT Telegraf plugin. Some new features in 5.0:

- Scalability improvements
- Error reporting
- Metadata
- Better support for constrained clients (embedded)
- All packets have properties (including diagnostics)

Sebastien Lambour gave a talk on using IoT to manage mood disorders.He won the Eclipse IoT Award for 2017 based on this project. It was a really interesting approach to managing mood disorders by collecting and interpreting environmental and other data, and correlating it to mood changes for better disease management.

## ThingMonk Day 2

I’d do a ‘highlights’ but, frankly, all of the talks were highlights. Of particular note was the concept of the ‘Digital Twin.’ A digital twin is a digital model of a real-world system that is fed by data from the real-world instance. Think of a jet engine that is modeled in software and fed data from a real jet engine. This concept of the digital twin was demonstrated during Day 2, and I’ll describe that demo later. The idea is to take real data to build better models, fed by a stream of real data to enhance the model and ultimately provide feedback to build better ‘objects’ in the real world. All informed by data. This takes data collection and analysis at every stepfrom edge device to platform and digital twin. It involves bringing data in from many other sourcesdatasheets, weather data, etc. to give additional context to the twin. I just wrote about doing this the other day.

Yodit Stanton, CEO of opensensors.io gave a talk on the reasons your IoT project will fail. She cited a disturbing survey that said that 75% of IoT projects are deemed a failure, and that only 15% provide value. Her experience in deploying real-world IoT projects for actual customers informed her reasoning behind her conclusions. One of her key takeaways was that cheap sensors generate bad data, and bad data will lead to project failure.

> Image has been lost

Following her talk Yodit and I sat down for a long and detailed discussion of data collection on IoT Projects. She’s a really interesting and brilliant IoT and data technologist with a lot of real-world experience deploying IoT solutionssomething not many people actually have!

Gary Barnett gave a talk titled “The Number One Thing” which was both highly informative and highly entertaining. He presented this graphic about what the “number one thing” in IoT is:

> Image has been lost

But apropos for InfluxData:

> Image has been lost

There’s really no point in collecting vast amounts of IoT data unless it is actionable data. Be forewarned that when the video for this talk comes out it is filled with F-bombs and other profanity (as are several other talks).

Rounding out the day were talks on human factors, makers, a train management system, blockchain in IoT, and a presentation of using digital twins in farming and agriculture. Agriculture and farming will be a key growth sector for IoT in the coming years and data acquisition and analysis of agricultural data will be huge factors in its success.

The main takeaway from the blockchain talk: If you don’t have a distributed problem, blockchain will not be the answer. That seems like a good rule considering how many people respond with “Blockchain!” to almost any problem.

## ThingMonk Day 3

Day 3 was led off by Sarah Cooper, head of AWS IoT platform speaking about data dimensionality in IoT. She presented some key concepts in IoT data acquisition and analysis. Her talk on Data Dimensionality described the following:

0-D systems: device with discrete data and few relationships with applications and other data
1-D systems: 2 or more data sources or systems. Input from one is output to another. Data is typically linear.
2-D systems: Centrally manages collections of 0-D data and devices.
3D systems: Combine 1D and 2-D systems and have multiple overlapping data relationships.
Data enrichments adds dimensions to data – enrichments such as weather data, etc. Sensor fusion can expose hidden information.
Takeaway message: The more simple your data, the more complex the analytics you can run.

There was an amazing demo of the Digital Twin concept where a $60k digital 3-D scanner was used to scan the conference participants and allat very high resolution (to the point where you could recognize faces in the scan). The scanned recorded more than 1 millions points per second! The scan was then fed into the Unity gaming engine to create a 3D virtual model of the entire conference. Some sensors were handed out to audience members and these sensors were then added to the virtual model. Sensor readings were then streamed into the model in real-time showing changes in the physical world reflected in the virtual model. The demo got a collective gasp from the entire audience and was the talk of the conference from that point forward. It brought the concept of the Digital Twin home in a very profound way.

Dr. Lucy Rogers, from IBM gave an engaging talk on her journey to being an IoT Maker wherein she showed a number of her projects that she has done over the years. She’s a maker after my own heart as she builds all sorts of quirky, fun, interesting demos. She hasn’t built a Semaphore translation bot yet (we built an IoT- based bot to translate text messages to semaphore back in 2006, just for fun) but she’s built some really cool things!

There were also a couple of guys, like me, who were running a live IoT sensor in the room. Mine was the IoT Demo sensor I developed for InfluxData, and theirs was monitoring the CO2 level in the room, running a live environmental sensor in the back of the room. Between the two of us, we were able to make some interesting observations about fluctuations in temperature and CO2 levels, and when and why they occurred  It turns out they were also using InfluxDB as their backend data collection mechanism!

## Conclusions

If you’re interested in a conference that isn’t filled with marketing and sales presentations, that focusses on the details of what makes IoT successful,or not,and you’re interested in hearing some of the best speakers in the industry, then ThingMonk is the place to be. It’s small, extremely well-run, even more extremely well-curated for content, and filled with superb content. I’ll mention the commitment to diversity again. As I said to one of the organizers at the event, the incredible diversity at ThingMonk stands in stark contrast to most other technical conferences. It highlights that the diversity is out there, and that most other conferences simply don’t try to have diversity of speakers and attendees. Keep it up [RedMonk](https://redmonk.com): you’re doing great work!

**<a name="link-1"></a>[1]: The ThingMonk Conference has not happened again since 2017. I tried for years to get it re-started but without success. It is a huge gap in the IoT conference landscape.**