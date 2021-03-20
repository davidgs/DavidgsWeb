---
title: „Wie ist schnell schneller?“
Date: 2017-03-06
Author: davidgs
Category: General, IoT
Tags: ARTIK, ARTIK-520, Benchmark, Embedded Systems, IoT, Java
Slug: just-how-fast-is-faster
hero: images/Azul.jpg
---

Nachdem ich installiert und versucht, die [Zulu JVM Embedded](https://www.azul.com/products/zulu-embedded/) auf meinem ARTIK-520) auf meinem ARTIK-520 [heute Morgen](posts/category/general/making-artik-5-iot-gateway-kura) bemerkte ich, dass es ** Filz ** schneller. Es ** ** schien schneller. Aber war es wirklich schneller? Und wenn ja, wie viel schneller? Also ging ich für einige Java-Benchmark-Tests der Suche auszuführen.

Ich wählte die [DaCapo Benchmark](http://www.dacapobench.org) für diese. Warum? Da Google, das ist der Grund. Hier ist, was die DaCapo Benchmark über sich selbst sagt *:

> Diese Benchmark-Suite ist als Werkzeug gedacht für Java durch die Programmiersprache Benchmarking, Speicherverwaltung und Computerarchitektur Gemeinden. Es besteht aus einem Satz von * Open Source *, realen Anwendungen mit nicht-trivialen Speichern geladen wird. Die erste Version der Suite war der Höhepunkt von über fünf Jahren Arbeit an acht Institutionen im Rahmen des DaCapo Forschungsprojektes (http://www.dacapo-group.org/), die von einer National Science Foundation Grant-ITR finanziert wurden CCR-0.085.792. Drei Jahre Entwicklung sind in die 2009-Version gegangen. Diese Arbeit wurde von der ANU, der Australian Research Council und eine großzügige Spende von Intel gefördert.

Funktioniert bei mir. Meine Mutter war ein weltberühmter Benchmark Experte für Jahrzehnte. Ich bin nicht. So ist es das, was ich gewählt habe. Gibt es bessere Benchmark-Suiten da draußen? Wahrscheinlich. Kümmert es mich? Nicht so viel.

Hier sind die spezifischen Benchmark-Tests in dieser Suite enthalten. Sie werden feststellen, dass nicht alle von ihnen sind unten dargestellt. Während sie alle erfolgreich auf dem Mac abgeschlossen ist, habe ich nur diejenigen enthalten, die erfolgreich auf mindestens einer der eingebetteten JVMs gelungen.

Die DaCapo-9.12-bach-Benchmark-Suite, im Jahr 2009 veröffentlicht, besteht aus der folgenden Benchmarks:

- avrora
- Batik
- eclipse
- Geck
- h2
- jython
- luindex
- lusearch
- pmd
- sunflow
- tomcat
- tradebeans
- tradesoap
- Punkte

| | |
| --- | --- |
| avrora | Simuliert eine Reihe von Programmen auf einem Raster von AVR-Mikrocontroller laufen |
| Batik | eine Reihe von Scalable Vector Graphics (SVG) Bilder produziert in Apache Batik auf den Unit-Tests auf Basis |
| eclipse | führt einen Teil des (nicht-gui) jdt Performance-Tests für die Eclipse IDE |
| Geck | nimmt eine XSL-FO-Datei, analysiert sie und formatiert es, eine PDF-Datei zu erzeugen. |
| h2 | führt einen JDBCbench ähnliche In-Memory-Benchmark, eine Anzahl von Transaktionen gegen ein Modell einer Bankanwendung ausführt, die hsqldb Benchmark ersetzt |
| jython | inteprets eine der pybench Python Benchmark |
| luindex | Verwendet Lucene-Indizes eine Reihe von Dokumenten; die Werke von Shakespeare und der King James Bibel |
| lusearch | Uses Lucene eine Textsuche von Keywords über einen Korpus von Daten zu tun, das die Werke von Shakespeare und der King James Bibel |
| pmd | analysiert eine Reihe von Java-Klassen für eine Reihe von Quellcode Problemen |
| sunflow | macht eine Reihe von Bildern Tracing ray mit |
| Kater | betreibt eine Reihe von Abfragen gegen einen Tomcat-Server abrufen und die resultierenden Webseiten Überprüfung |
| tradebeans | läuft den Daytrader Benchmark über eine Jave Beans zu einem GERONIMO Backend mit einem im Speicher h2 als die zugrunde liegende Datenbank |
| tradesoap | über eine SOAP läuft die Daytrader Benchmark zu einem GERONIMO Backend im Speicher h2 als die zugrunde liegende Datenbank |
| xalan | Transformationen von XML-Dokumenten in HTML |


Also hier ist was ich gefunden habe.

Ja, die Zulu JVM ist schneller. Und es ist nicht nur ein bisschen schneller. Es ist ein ** LOT ** schneller. Ich meine, eine ganze Menge. So sehr, dass ich die gleiche Benchmark-Suite auf meinem MacBook Pro nur für grinst laufen entschieden. Erraten Sie, was? In einem der Tests schlagen Zulu die JVM auf meinem Mac. Whiskey. Tango. Foxtrot. Aber ja, die Zahlen lügen nicht.

| ** Test-** | ** OpenJDK ** | ** Zulu ** | ** Mac OS X ** |
| -------- | ----------- | -------- | ------------ |
| ** avrora ** | 588 264 | 44963 | 6137 |
| ** ** Punkte | 438.577 | 41963 | 50066 |
| ** tradesoap ** | FAIL | 247.835 | 51650 |
| ** tradebeans ** | FAIL | 85343 | 13105 |
| ** sunflow ** | 218.045 | 69992 | 5405 |
| ** pmd ** | 135.382 | 24268 | 4333 |
| ** lusearch ** | 459.989 | 39134 | 5035 |
| ** luindex ** | 230.904 | 11399 | 2305 |
| ** Geck ** | [103.144 | 15233 | 3852 |
| ** jython ** | 1204207 | 59300 | 4150 |



So Zulu schlägt Mac auf dem xalan Benchmark. Erstaunlich. Und das OpenJDK für ARMv7 ist wirklich Art von Mist. Auf den Tests war es in der Lage es weit, weit ** ** hinter der Zulu JVM abzuschließen zurückgeblieben. Die Fehler in der tradesoap und tradebeans Tests waren outOfMemeoryException Ausfälle, so dass die Zulu JVM nicht nur schneller ist, aber es ist viel mehr Speicher effizienter zu gestalten. Und auf einem Embedded-System, eine speichereffiziente JVM ist das, was Sie wirklich wollen, nicht wahr?

Hier ist, was diese Ergebnisse aussehen wie in ziemlich Diagrammform:

![Numbers002](/posts/category/general/images/Numbers002.jpg "Numbers002.jpg")

Lächerlich, nicht wahr? Ja, die Mac Zahlen so klein, dass sie kaum in diesem Ausmaß fast überall registrieren, aber die Zulu Zahlen sind sehr beeindruckend, wenn im Vergleich zu den OpenJDK Zahlen.

Also nicht nur die Zulu JVM ** ** Gefühl schneller, es tatsächlich ** ** ist schneller. Und durch einen ** LOT **. Ich würde sagen, wenn Sie planen, etwas auf der ARTIK-520 zu implementieren, und es ist in Java geschrieben, und Sie wollen es eine gute Leistung, dann würden Sie gut bedient sein, das Geld für die Zulu JVM zu berappen. Sie werden viel glücklicher sein.


* Blackburn, SM, Garner, R., Hoffman, C., Khan, AM, McKinley, KS, Bentzur, R., Diwan, A., Feinberg, D., Frampton, D., Guyer, SZ, Hirzel, M ., Hosking, A., Sprung, M., Lee, H., Moos, JEB, Phansalkar, A., Stefanovic, D., VanDrunen, T., von Dincklage, D., und Wiedermann, B. ** Die DaCapo Benchmarks: Java Benchmarking Entwicklung und Analyse **, * OOPSLA '06: Proceedings des 21. jährlichen ACM SIGPLAN Konferenz über objektorientierte Programmierung, Systeme, Sprachen und Anwendungen *, (Portland, OR, USA, Oktober 22-26, 2006) ([pdf](http://portal.acm.org/citation.cfm?doid=1167473.1167488),), [BibTeX](http://www.dacapobench.org/cite.html)).

