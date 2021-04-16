---
title: "IoTProject"
date: 2021-04-16T11:46:12-04:00
Author: davidgs
Description: "An integration of Camunda Platform and IoT for Greenhouse Automation"
Category: Camunda, IoT
Slug: iot-project
hero: images/growhouse.jpg
---

# A Proof of Concept for Camunda Platform BPMN with IoT

## Abstract
Looking to bring [Camunda](https://camunda.com?ref=davidgsiot) to the attention of the IoT Community by completing a larger IoT/Camunda Proof of Concept Project. This would entail an IoT Build, using Camunda Platform, documentation, a blog post, and promotion to the wider IoT Community.

## Why pursue this project
In many of my initial discussions when joining the company, IoT was mentioned quite frequently as an important, but as-yet untapped market for Camunda Platform. In order to get Camunda 'noticed' in this market, which is vast, we need to start doing things that the community would possibly notice, and then track the engagements from those things.

This can give us important insights into whether or not the IoT market is interested in using BPMN to orchestrate tasks based on IoT data as well as be an introduction of Camunda to the IoT community.

It hits on many important aspects of what we do including community/customer feedback, increasing awareness, and engagement.
In general, the overall IoT Market is doubling in size roughly every 2 years. This rapid and sustained growth makes it an attractive target for Camunda as we look for areas of expansion.

![Graph of increasing IoT Adoption](/posts/category/camunda/iot-project/images/iotGrowthChart.png)

[[1] Forecast end-user spending on IoT solutions worldwide from 2017 to 2025](https://www.statista.com/statistics/976313/global-iot-market-size/)

## What does success look like?
Success, in this instance, doesn't mean just completing the project. Actually completing this project is not the hurdle. The real measure of success will be how much 'attention' and traction in the wider IoT community we can garner through this project.

Some of the metrics to collect and measure would be:
- Number of people who read the blog post(s) about this project
- How many of those readers do we 'convert' to click-through to the Camunda website?
- Number of tweets/retweets of the project and its parts
- Questions asked about the project

The OKRs around metrics I plan to use are:
- 20,000 post-reads on the blog(s) posted about the project
- 1% conversion to Camunda.com click-through

### How we will collect those Metrics
- When publishing blog posts to DZone, use `?ref=davidgsiot` to distinguish traffic referrals direct to Camunda from David's articles
- Produce "deliverables" to report internally on a fairly regular basis (could be reports, lunch & learns, hackathon projects, blog posts, etc.)

It’s important to note that, while we generally don’t track such `vanity metrics` as hit-counts, etc. this is really a test-balloon project to see if, and how much, relative interest there is around an integration between Camunda Platform BPMN and the IoT community. Since we are just gauging initial interest, simple, easy to track metrics make the most sense.

## Project Idea

As mentioned, building automation is a potential target market for Camunda and IoT due to the high level of adoption, the requirement for complex orchestration, and the current push to move more systems into this area.

> In their early days, building management systems (BMS), also called building automation systems (BAS), proved to be a game-changer. The availability of a computer-based control system that could automatically monitor and manage a building’s largest and costliest operational components helped facilities managers do their jobs better. Building automation systems saved time and money, reduced energy waste, and gave facilities managers a way to better monitor their operations.
>
> Fast-forward to today, and you have another game-changer: the Internet of Things (IoT) for buildings. At their core, these technologies intersect in some important ways, but it’s where the IoT veers off from BMS that makes it more valuable to facilities personnel as a management tool. This article examines how an IoT analytics reporting platform can enhance the performance of the BMS by offering feedback on energy efficiency—and how that change might impact the role of facilities managers.<sup>[1]</sup>

[1] [IoT Meets Building Automation](https://www.iotforall.com/iot-meets-building-automation)

In a previous DevRel position I did a small project about calculating some environmental data like Vapor Pressure Differential, etc. which ended up being *hugely* popular. Apparently these sorts of calculations and data are extremely important in greenhouse operations. Maintinaing proper temperature, humidity, etc. is key to the success of a greenhouse operation and the ability to automate and monitor these things are a key need in the industry.

![Greenhouse automation](/posts/category/camunda/iot-project/images/smart-greenhouse-overview-01.png)

Greenhouse management is a subset of the larger building automation market segment but one that is growing faster than the overall BMS market.

> According to Verified Market Research, The Global Smart Greenhouse Market was valued at USD 0.98 Billion in 2018 and is projected to reach USD 2.46 Billion by 2026, growing at a CAGR of 12.11% from 2018 to 2026.<sup>[2]</sup>

[2] [Smart Greenhouse Market Size And Forecast](https://www.verifiedmarketresearch.com/product/global-smart-greenhouse-market-size-and-forecast-to-2025/)

This makes this an attractive target for a PoC.

## Budget proposal for hardware

This is an IoT Project, so it will obviously require some IoT Hardware. This is also a Greenhouse-automation project, so it will also require at least _some_ sort of 'greenhouse' to automate.

**Sensors for outdoors:**

| Sensor | Price | quantity | total |
|--------|-------|----------|-------|
| [Weather Station](https://www.sparkfun.com/products/15901) | $64.95 | 1 | $64.95 |
| [Lightning Detector](https://www.sparkfun.com/products/15441) | $26.50 | 1 | $26.50 |
| [ESP32](https://www.sparkfun.com/products/17381) | $20.95 | 1 | $20.95 |
| [RJ11 Breakout](https://www.sparkfun.com/products/14021)  | $1.95 | 2 | $3.90 |
| [RJ11 Jacks](https://www.sparkfun.com/products/132) | $1.25 | 4 | $5.00 |
| [LiPo Battery](https://www.sparkfun.com/products/13856) | $26.95 | 1 | $26.95 |
| [Solar Charger](https://www.sparkfun.com/products/12885) | $26.95 | 1 | $26.95 |
| [Solar Panel](https://www.sparkfun.com/products/13783) | $59.00 | 1 | $59.00 |
| [Soil Moisture](https://www.sparkfun.com/products/13637) | $6.95 | 1 | $6.95 |
| [CO<sub>2</sub> Sensor](https://www.sparkfun.com/products/15112) | $59.95 | 1 | $59.95 |
| **Sub Total** | | | **$301.10** |



**Greenhouse Sensors:**

| Sensor | Price | quantity | total |
|--------|-------|----------|-------|
| [Soil Moisture](https://www.sparkfun.com/products/13637) | $6.95 | 2 | $6.95 | $13.90 |
| [Stepper Motor](https://www.sparkfun.com/products/13656) | $30.95 | 1 | $30.95 |
| [Stepper Driver](https://www.sparkfun.com/products/16836) | $19.95 | 1 | $19.95 |
| [ESP32](https://www.sparkfun.com/products/17381) | $20.95 | 4 | $20.95 | $83.81 |
| [CO<sub>2</sub> Sensor](https://www.sparkfun.com/products/15112) | $59.95 | 1 | $59.95 |
| [Fan](https://www.sparkfun.com/products/15708) | $11.95 | 1 | $11.95 |
| **Sub Total** | | | **$220.50** |

**Sensor Totals**
| Project area | Total |
|--------------|-------|
| Outdoor Sensors | $301.10 |
| Indoor Sensors | $220.50 |
| **Grand Total:** | **$521.60** |


**Greenhouse**

This one is a bit of a wild-card. I started looking at what might work. I want the greenhouse to be able to have sensors in it (they are small), and at least one 'actuator' to open a window or something, and probably a fan too. We're talking realistic here.

| Greenhouse Type | Cost |
|-----------------|------|
| [Outdoor](https://www.worldofgreenhouses.com/products/hybrid-greenhouse-series) | $650 |
| [Indoor](https://www.hpotter.com/buy-terrariums/h-potter-terrarium-classic-wardian-case-for-plants) | $140 |
| [Indoor - small](https://www.amazon.com/Purzest-Terrarium-Geometric-Tabletop-Succulent) | $36.00 |


Of course, for a truly realistic/accurate PoC, the outdoor greenhouse is the best choice. I'm not sure what I'd _do_ with an outdoor greenhouse after this is all done, but ¯\\\_(ツ)\_/¯.

The larger desktop version at least has an opening that I could motorize to give some realism.

**Note:** [@mary_grace](https://twitter.com/mary_grace) and I have decided to start with the smaller, more portable one (given upcoming travel, etc.) and see how things go. We can move to a larger greenhouse if the smaller one proves an unworkable option.

## Documentation
A series of Blog posts (at least 2 - 3) covering the various stages of the development of the PoC
