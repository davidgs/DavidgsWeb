---
title: "Just How Fast Is Faster?"
Date: 2017-03-06
Author: davidgs
Category: General, IoT
Tags: ARTIK, ARTIK-520, Benchmark, Embedded Systems, IoT, Java
Slug: just-how-fast-is-faster
hero: images/Azul.jpg
---

After I installed and tried the [Zulu Embedded JVM](https://www.azul.com/products/zulu-embedded/) on my ARTIK-520 [this morning](posts/category/general/making-artik-5-iot-gateway-kura) I noticed that it **felt** faster. It **seemed** faster. But was it really faster? And if so, how much faster? So I went looking for some Java Benchmark tests to run. 

I chose the [DaCapo Benchmark](http://www.dacapobench.org) for this. Why? Because google, that's why. Here's what the DaCapo Benchmark says about itself*:

> This benchmark suite is intended as a tool for Java benchmarking by the programming language, memory management and computer architecture communities. It consists of a set of *open source*, real world applications with non-trivial memory loads. The initial release of the suite was the culmination of over five years work at eight institutions, as part of the  DaCapo research project(http://www.dacapo-group.org/), which was funded by a National Science Foundation ITR Grant, CCR-0085792. Three years of development have gone into the 2009 release. This work has been funded by the ANU, the Australian Research Council and a generous donation from Intel.

Works for me. My mom was a world-famous Benchmark expert for decades. I'm not. So this is what I chose. Are there better benchmark suites out there? Probably. Do I care? Not so much.

Here are the specific benchmark tests included in this suite. You'll notice that not all of them are represented below. While they all completed successfully on the Mac, I have only included the ones that succeeded successfully on at least one of the embedded JVMs. 

The DaCapo-9.12-bach benchmark suite, released in 2009, consists of the following benchmarks:

- avrora
- batik
- eclipse
- fop
- h2
- jython
- luindex
- lusearch
- pmd
- sunflow
- tomcat
- tradebeans
- tradesoap
- xalan

|    |    |
|---|---|
| avrora | simulates a number of programs run on a grid of AVR microcontrollers |
| batik | produces a number of Scalable Vector Graphics (SVG) images based on the unit tests in Apache Batik |
| eclipse | executes some of the (non-gui) jdt performance tests for the Eclipse IDE |
| fop | takes an XSL-FO file, parses it and formats it, generating a PDF file. |
| h2 | executes a JDBCbench-like in-memory benchmark, executing a number of transactions against a model of a banking application, replacing the hsqldb benchmark |
| jython | inteprets a the pybench Python benchmark |
| luindex | Uses lucene to indexes a set of documents; the works of Shakespeare and the King James Bible |
| lusearch | Uses lucene to do a text search of keywords over a corpus of data comprising the works of Shakespeare and the King James Bible |
| pmd | analyzes a set of Java classes for a range of source code problems |
| sunflow | renders a set of images using ray tracing|
| tomcat | runs a set of queries against a Tomcat server retrieving and verifying the resulting webpages |
| tradebeans | runs the daytrader benchmark via a Jave Beans to a GERONIMO backend with an in memory h2 as the underlying database |
| tradesoap | runs the daytrader benchmark via a SOAP to a GERONIMO backend with in memory h2 as the underlying database |
| xalan | transforms XML documents into HTML |


So here's what I found.

Yeah, the Zulu JVM is faster. And it's not just a little bit faster. It's a **LOT** faster. I mean a whole lot. So much so that I decided to run the same Benchmark suite on my MacBook Pro just for grins. Guess what? In one of the tests, Zulu beat the JVM on my Mac. Whiskey. Tango. Foxtrot. But yes, the numbers don't lie.

| **Test** | **OpenJDK** | **Zulu** | **Mac OS X** |
| -------- | ----------- | -------- | ------------ |
| **avrora** | 588264 | 44963 | 6137 |
| **xalan** | 438577 | 41963 | 50066 |
| **tradesoap** | FAIL | 247835 | 51650 |
| **tradebeans** | FAIL | 85343 | 13105 |
| **sunflow** | 218045 | 69992 | 5405 |
| **pmd** | 135382 | 24268 | 4333 |
| **lusearch** | 459989 | 39134 | 5035 |
| **luindex** | 230904 | 11399 | 2305 |
| **fop** | [103144 | 15233 | 3852 |
| **jython** | 1204207 | 59300 | 4150 |



So Zulu beats Mac on the xalan benchmark. Astonishing. And the OpenJDK for ARMv7 is really sort of crap. On the tests it was able to complete it lagged far, **far** behind the Zulu JVM. The failures in the tradesoap and tradebeans tests were outOfMemeoryException failures, so the Zulu JVM is not just faster, but it's a lot more memory efficient. And on an embedded system, a memory-efficient JVM is what you really want, right?

Here's what those results look like in pretty chart form:

![Numbers002](/posts/category/general/images/Numbers002.jpg "Numbers002.jpg")

Ridiculous, right? Yes, the Mac numbers are so small they barely register almost everywhere at this scale, but the Zulu numbers are quite impressive when compared to the OpenJDK numbers. 

So not only does the Zulu JVM **feel** faster, it actually **is** faster. And by a **LOT**. I'd say if you're planning to deploy something on the ARTIK-520, and it's written in Java, and you want it to perform well, you'd be well-served to shell out the money for the Zulu JVM. You'll be a lot happier. 


* Blackburn, S. M., Garner, R., Hoffman, C., Khan, A. M., McKinley, K. S., Bentzur, R., Diwan, A., Feinberg, D., Frampton, D., Guyer, S. Z., Hirzel, M., Hosking, A., Jump, M., Lee, H., Moss, J. E. B., Phansalkar, A., Stefanovic, D., VanDrunen, T., von Dincklage, D., and Wiedermann, B. **The DaCapo Benchmarks: Java Benchmarking Development and Analysis**, *OOPSLA '06: Proceedings of the 21st annual ACM SIGPLAN conference on Object-Oriented Programing, Systems, Languages, and Applications*, (Portland, OR, USA, October 22-26, 2006) ([pdf](http://portal.acm.org/citation.cfm?doid=1167473.1167488), [BibTeX](http://www.dacapobench.org/cite.html)).

