---
title: "Just Hoe is snel Sneller?"
Date: 2017-03-06
Author: davidgs
Category: General, IoT
Tags: ARTIK, ARTIK-520, Benchmark, Embedded Systems, IoT, Java
Slug: just-how-fast-is-faster
hero: images/Azul.jpg
reading_time: 6 minutes
---

Nadat ik geïnstalleerd en probeerde de [Zulu Embedded JVM](https://www.azul.com/products/zulu-embedded/) op mijn ARTIK-520 [vanochtend] (berichten / category / algemeen / making-artik-5 -iot-gateway-kura) merkte ik dat het **voelde** sneller. Het **leek** sneller. Maar was het echt sneller? En zo ja, hoeveel sneller? Dus ging ik op zoek naar een aantal Java-Benchmark testen uit te voeren.

Ik koos voor de [DaCapo Benchmark](http://www.dacapobench.org) voor. Waarom? Omdat Google, dat is waarom. Hier is wat de DaCapo Benchmark over zichzelf zegt *:

> Deze benchmark suite is bedoeld als een instrument voor Java benchmarking door de programmeertaal, geheugenbeheer en computerarchitectuur gemeenschappen. Het bestaat uit een set van * open source *, echte wereld toepassingen met niet-triviale geheugen belastingen. De eerste release van de suite was het hoogtepunt van meer dan vijf jaar werk om acht instellingen, als onderdeel van het DaCapo onderzoeksproject (http://www.dacapo-group.org/), dat werd gefinancierd door een National Science Foundation ITR Grant , CCR-0.085.792. Drie jaren van ontwikkeling zijn gegaan in de uitgave 2009. Dit werk werd gefinancierd door de ANU, de Australian Research Council en een gulle donatie van Intel.

Werkt voor mij. Mijn moeder was een wereldberoemde Benchmark expert voor decennia. Ik ben niet. Dus dit is wat ik koos. Zijn er betere maatstaf suites die er zijn? Waarschijnlijk. Geef ik er om? Niet zo veel.

Hier zijn de specifieke benchmark-tests opgenomen in deze suite. U zult merken dat ze niet allemaal hieronder zijn vertegenwoordigd. Terwijl ze allemaal succesvol afgerond op de Mac, heb ik alleen opgenomen degenen die met succes op ten minste één van de embedded JVM geslaagd.

De DaCapo-9.12-bach benchmark-suite, uitgebracht in 2009, bestaat uit de volgende criteria:

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
- kater
- tradebeans
- tradesoap
- punten

​
​
​avrora | simuleert een aantal programma's draaien op een raster van AVR microcontrollers |
​batik | produceert een aantal van Scalable Vector Graphics (SVG) beelden op basis van de unit tests in Apache Batik |
​eclipse | voert een aantal van de (niet-gui) jdt prestatietests voor de Eclipse IDE |
​fop | neemt een XSL-FO-bestand, ontleedt het en formatteert het, het genereren van een PDF-bestand.​
​h2 | voert een JDBCbench-achtige in-memory benchmark het uitvoeren van een aantal transacties tegen een model van een bancaire applicatie, ter vervanging van de HSQLDB maatstaf |
​jython | inteprets een de pybench Python maatstaf |
​luindex | Maakt gebruik van Lucene indexen een set documenten; de werken van Shakespeare en de King James Bible |
​lusearch | Toepassingen Lucene om een zoekopdracht tekst van zoekwoorden te doen over een corpus van data bestaat uit de werken van Shakespeare en de King James Bible |
​pmd | analyseert een set van Java-klassen voor een reeks van de broncode problemen |
​sunflow | maakt een reeks van beelden met behulp van ray tracing |
​kater | loopt een set van queries tegen een Tomcat-server ophalen en verifiëren van de resulterende webpagina's |
​tradebeans | loopt de daytrader maatstaf via een Jave bonen een GERONIMO backend met een geheugen h2 de onderliggende database |
​tradesoap | loopt de daytrader maatstaf via een SOAP een GERONIMO backend met geheugen h2 de onderliggende database |
​xalan | transformaties XML-documenten in HTML |


Dus hier is wat ik gevonden heb.

Ja, de Zulu JVM is sneller. En het is niet alleen een beetje sneller. Het is een **LOT** sneller. Ik bedoel een heleboel. Zozeer zelfs, dat ik besloot om dezelfde benchmark suite draaien op mijn MacBook Pro alleen voor grijnst. Raad eens? In één van de tests, Zulu versloeg de JVM op mijn Mac. Whisky. Tango. Foxtrot. Maar ja, de cijfers liegen niet.

​** Test ** | **OpenJDK** | **Zulu** | ** Mac OS X ** |
​
​** avrora ** | 588 264 | 44963 | 6137 |
​** ** punten | 438.577 | 41963 | 50066 |
​** tradesoap ** | FAIL | 247.835 | 51650 |
​** tradebeans ** | FAIL | 85343 | 13105 |
​** sunflow ** | 218.045 | 69992 | 5405 |
​** pmd ** | 135.382 | 24268 | 4333 |
​** lusearch ** | 459.989 | 39134 | 5035 |
​** luindex ** | 230.904 | 11399 | 2305 |
​** fop ** | [103144 | 15233 | 3852 |
​** jython ** | 1204207 | 59300 | 4150 |



Dus Zulu slaat Mac op de xalan benchmark. Verbazingwekkend. En de OpenJDK voor ARMv7 is echt soort onzin. Op de tests was het in staat om te voltooien ver bleef, **ver** achter de Zulu JVM. De storingen in de tradesoap en tradebeans testen waren outOfMemeoryException mislukkingen, zodat de Zulu JVM is niet alleen sneller, maar het is veel meer geheugen efficiënter. En op een embedded systeem, een geheugen-efficiënte JVM is wat je echt wilt, toch?

Hier is wat deze resultaten eruit in mooie tabelvorm:

![Numbers002](/posts/category/general/images/Numbers002.jpg "Numbers002.jpg")

Belachelijk, nietwaar? Ja, de Mac aantallen zijn zo klein dat ze nauwelijks bijna overal te registreren op deze schaal, maar de Zulu-nummers zijn zeer indrukwekkend in vergelijking met de OpenJDK nummers.

Dus niet alleen de Zulu JVM **feel** sneller, het eigenlijk **is** sneller. En door een **LOT**. Ik zou zeggen dat als je van plan om iets op de ARTIK-520 in te zetten, en het is geschreven in Java, en je wilt dat het goed presteren, zou u goed bediend om de dop van het geld voor de Zulu JVM zijn. Je zult veel gelukkiger zijn.


* Blackburn, SM, Garner, R., Hoffman, C., Khan, AM, McKinley, KS, Bentzur, R., Diwan, A., Feinberg, D., Frampton, D., Guyer, SZ, Hirzel, M ., Hosking, A., springen, M., Lee, H., Moss, CS, Phansalkar, A., Stefanovic, D., VanDrunen, T., von Dincklage, D. en Wiedermann, B. ** The DaCapo Benchmarks: Java Benchmarking Development and Analysis **, * OOPSLA '06: Proceedings van de 21e jaarlijkse ACM SIGPLAN conferentie over Object-Oriented Programming, systemen, talen en toepassingen *, (Portland, OR, USA, 22-26 oktober, 2006) ([pdf] (http://portal.acm.org/citation.cfm?doid=1167473.1167488), [BibTeX](http://www.dacapobench.org/cite.html)).

