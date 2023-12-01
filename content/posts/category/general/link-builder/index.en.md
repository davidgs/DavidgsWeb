---
title: "Link Builder"
date: 2023-04-09T08:25:45-04:00
Author: davidgs
Category: General
Tags: open source, link building,QR codes
Slug: link-builder
description: Creating QR codes for your links
hero: images/link-builder-header.png
draft: true
reading_time:
---

## What is this Sorcery?

About a year ago I was starting to play with React.js as a learning exercise -- really I was working with both [React.js](https://reactjs.org) and [Electron](https://electronjs.org) to build stand-alone apps.

At the same time, the company I was working for was looking for a way to make utm-encoded links easily for everyone in the company. If you don't know what "UTM-encoded links" are, you can learn more about it [here](https://funnel.io/resources/google-analytics-utm-tagging) but it's pretty geeky stuff. Let's just say that if you want to be able to answer questions like "do more people click on my links on Twitter or LinkedIn?" then UTM-links are what you need.

But I digress. As I was thinking about a way to make such a tool, I had a  "*Eureka!*" moment. I thought, I can build a little app that will do that!

So I did. I built a little app that would take a URL and allow you to add pre-defined utm parameters to it for marketing to be able to track the effectiveness of their links. It was a simple app, but it worked. And it was fun to build.

That job decided not to use it (if you think "not invented here" syndrome is dead, I have some stories to tell!), but I decided to keep working on it on my own time to further my React.js skills.

I use the phrase "React skills" very loosely here. I'm not a React developer, and would never be mistaken for one. But I learn by doing, so I kept doing.

## Let's add more features!

An app that does little more than create utm-encoded links is not really the be-all and end-all. Then someone I follow on twitter (and for the life of me I can't find her tweets about it, so if you recognize this, please let me know so I can give proper credit!) posted about creating QR Codes in JavaScript and I thought, "Hey, that would be a great feature for my app!"

Let me just say that the whole "hey, I can do that!" and "how hard can it be?" attitude is what gets me into trouble. But I digress, again.

Anyway, the app evolved into something that was quite useful, and my current job decided to adopt it company-wide to build encoded links and QR Codes. One of the things I did for them was to custom-design a QR Code that incorporated the company logo, the corporate colors, and customized 'eyes' in the QR Code.

![Custom QR Code](images/example.png)

Pretty nice QR Code, right?

## Let's make custom QR Codes!

Then I had the idea to build an app that would let you design your own QR Codes and customize them however you wanted. I tried to build an entirely separate app for that, and I was mildly successful, but it seemed like a lot of effort to design a QR code, and then have to somehow get it added to the *other* app to use when you create links.

What to do. What to do?

## And also ...

At the same time that I was doing all this, I showed a few people what I was doing and, well, let's just say there was some enthusiasm for it. But I still had a problem. The only real, working version I had was heavily customized for my employer, and it wouldn't be very useful for many other companies.

## Time to re-architect

In order to make this application really useful for the widest possible audience, it really had to be customizable for each user. Some people might want a particular UTM parameter, while others wouldn't want that one. Some people might want a particular UTM parameter to come from a pre-defined list, while others might want it to be a simple text field.

That's going to be a *lot* of customization. And it's going to be a lot of work to make it happen. Or maybe not.

## Excrutiatingly customizable

I decided to make pretty much every aspect of the app customizable. I created a customization panel that would allow a user to change nearly every aspect of the application.

Let's start with what the application looks like when you forst open it:

![Link Builder](images/main-interface.png)

In looking at that, the very first thing you're likely to want to change is that logo. Who thought *that* was a good idea? Well, I did. But you might not. So let's change it.



