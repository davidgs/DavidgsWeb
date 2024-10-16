---
title: "How to avoid bricking your raspberry pi during updates"
date: 2024-10-16T08:06:25+06:00
description: Avoid Bricking your Pi
hero: images/pile-of-bricks.jpg
reading_time: 3 minutes
relcanonical: https://dev.to/davidgs/how-to-avoid-bricking-your-device-during-update-rollouts-2hm1
---

Having an update brick (render inoperable) your device is a real risk, and even the largest of companies have been known to have it happen. This has just happened to Apple ([Apple pauses iPadOS 18 rollout for M4 iPad Pro after bricking complaints](https://arstechnica.com/gadgets/2024/09/apple-pauses-ipados-18-rollout-for-m4-ipad-pro-after-bricking-complaints/)) and I think we're all well aware of the [Crowdstrike incident](https://en.wikipedia.org/wiki/2024_CrowdStrike_incident) by now.

It's such an issue that, given the recent disasters with update rollouts (which I wrote about briefly [here](https://dzone.com/articles/how-you-can-avoid-a-crowdstrike-fiasco)) it seemed like a good topic to dive into.

I've always believed that if you can't come at a problem with a solution, you're probably not helping, so I looked at ways to actually solve the problem of updates that "go bad" and how to implement better strategies for deploying them.

Most of what I said is, of course, not new, or earth-shattering but it is worth taking a hard look at if you are deploying large numbers of devices that will at any time need to be managed and updated in the field. Let's face it, at some point something _will_ go wrong. It always does. So planning for how to recover from it _before_ it happens is prudent, and shows your customers that you are looking after them and their interests. It's really putting your customers first by ensuring that they can see you as a trusted partner over the long haul.

I cover some key topics like A/B partitioning, roll-backs after failed updates, and others, but I'm not going to go into all the details here. I encourage you to watch the video {% embed https://youtu.be/XELyHZp_exM?si=nNUaPIZcgr0Vlh-o %}
and let me know your thoughts.

I'd love to start a wider discussion about this topic of resilience in updates as I firmly believe that, along with security, it is a critical area where IoT needs to focus in order to begin to fulfill the promise of the technology.

This talk relies heavily on products from [Zymbit](https://zymbit.com/?utm_source=dev-to&utm_medium=blog&utm_term=dev-to) including [Zymkey](https://zymbit.com/zymkey/?utm_source=dev-to&utm_medium=blog&utm_term=dev-to) and [Bootware](https://zymbit.com/bootware/?utm_source=dev-to&utm_medium=blog&utm_term=dev-to) but the general concepts are applicable across a variety of vendors.

**Note:** If you're involved in IoT in North Carolina, Northern Virginia, or Colorado, and you don't know about [R!OT](https://riot.org) then you are missing out on one of the best resources for IoT professionals. They hold regular events, workshops, Lunch and Learns, etc. for their members. This talk was originally presented as a Lunch and Learn for R!OT. I encourage you to join, and to attend their events if this is an area that interests you.