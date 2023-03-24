---
Title: "ThingMonk 2017"
Date: 2017-10-20
Category: general
Slug: thing-monk-2017
hero: images/logo-2017-3.png
reading_time: 8 minutes
---

> **Hinweis:** Dies ist ein Beitrag aus meinem Archiv. Ich habe es 2017 geschrieben und es wurde im [InfluxData Blog](https://www.influxdata.com/blog/thingmonk-iot-insights/) veröffentlicht.
Bereits im September 2017 nahm ich an der ThingMonk-Konferenz in London teil. Hier ist ein kurzer Überblick über das, was ich gelernt habe und einige der Erkenntnisse, die ich von der Konferenz gewonnen habe. Die ThingMonk 2017-Videos beginnen zu fallen, wenn Sie den vollen Überblick erhalten möchten.

## Hintergrund

Die jährliche <sup>[1]({{</sup><ref "#link-1" > <sup>}})</sup> Die ThingMonk IoT-Konferenz fand vom 11. bis 13. September 2017 in Shoreditch, London, statt, wobei InfluxData die Videoaufzeichnungen sponserte. Diese Aufnahmen beginnen gerade erst herauszukommen, also schaut sie euch alle an, sobald sie herauskommen! Unten ist der aktuelle Veröffentlichungszeitplan für den ersten Satz von ThingMonk 2017-Videos wie folgt:

> Alle Videos wurden veröffentlicht und sind auf dem [YouTube-Kanal von ThingMonk](https://redmonk.com/?series=thingmonk-2017) verfügbar.

Ein weiterer Satz der restlichen Videos wird gepostet, sobald der erste Satz fertig ist.

ThingMonk ist eigentlich 2 Tage ThingMonk, mit einem eröffnenden Eclipse IoT Day.

ThingMonk ist eine unglaublich vielfältige und integrative Konferenz mit einem sehr expliziten und streng durchgesetzten Verhaltenskodex. Warum erwähne ich die Vielfalt und den Verhaltenskodex in einem Blogbeitrag? Denn eine der Stärken der Konferenz ist meines Erachtens die unglaubliche Betonung der Vielfalt – sowohl bei den Referenten als auch bei den Teilnehmern –, an deren Erreichung RedMonk sehr hart arbeitet. Und Teil des Gelingens der Vielfalt ist der Verhaltenskodex. Andere Konferenzorganisatoren könnten ein oder zwei Dinge darüber lernen, wie man eine Konferenz vielfältiger und integrativer gestaltet, indem sie studieren, was RedMonk tut.

Im Laufe der drei Tage ThingMonk und Eclipse IoT Day nahm ich an 23 Sitzungen und 2 Programmierworkshops teil, die ausschließlich dem IoT gewidmet waren. Das ist eine Menge IoT in 3 Tagen! Das gesamte Programm für alle 3 Tage können Sie hier einsehen.

## Eclipse-IoT-Tag

Der erste Tag der ThingMonk-Konferenz war eigentlich ein Eclipse IoT Day, der vollständig von der Eclipse Foundation gesponsert wurde. Achten Sie auf weitere Neuigkeiten zur Eclipse Foundation!

Der erste Vortrag war von Ian Craggs über MQTT 5.0 – und eine kurze Geschichte von MQTT im Laufe der Jahre. Ich hatte keine Ahnung, wie lange es MQTT schon gibt! In MQTT 5.0 kommen einige neue Funktionen wie Metadaten usw. hinzu, von denen ich hoffe, dass InfluxDB sie so früh wie möglich im MQTT Telegraf-Plugin unterstützen kann. Einige neue Funktionen in 5.0:

- Skalierbarkeitsverbesserungen
- Fehler melden
-Metadaten
- Bessere Unterstützung für eingeschränkte Clients (eingebettet)
- Alle Pakete haben Eigenschaften (einschließlich Diagnose)

Sebastien Lambour hielt einen Vortrag über die Verwendung von IoT zur Behandlung von Stimmungsstörungen. – Aufgrund dieses Projekts gewann er den Eclipse IoT Award 2017. Es war ein wirklich interessanter Ansatz zur Behandlung von Stimmungsstörungen durch das Sammeln und Interpretieren von Umwelt- und anderen Daten und das Korrelieren mit Stimmungsänderungen für ein besseres Krankheitsmanagement.

## ThingMonk Tag 2

Ich würde „Highlights“ machen, aber ehrlich gesagt waren alle Vorträge Highlights. Besonders hervorzuheben ist das Konzept des „Digitalen Zwillings“. Ein digitaler Zwilling ist ein digitales Modell eines realen Systems, das mit Daten aus der realen Instanz gespeist wird. Denken Sie an ein Strahltriebwerk, das in Software modelliert und mit Daten eines echten Strahltriebwerks gespeist wird. Dieses Konzept des digitalen Zwillings wurde an Tag 2 demonstriert, und ich werde diese Demo später beschreiben. Die Idee ist, echte Daten zu verwenden, um bessere Modelle zu bauen, die von einem Strom echter Daten gespeist werden, um das Modell zu verbessern und letztendlich Feedback zu geben, um bessere „Objekte“ in der realen Welt zu bauen. Alles durch Daten informiert. Dies erfordert die Datenerfassung und -analyse bei jedem Schritt – vom Edge-Gerät über die Plattform bis hin zum digitalen Zwilling. Es beinhaltet das Einbringen von Daten aus vielen anderen Quellen – Datenblätter, Wetterdaten usw., um dem Zwilling zusätzlichen Kontext zu geben. Ich habe erst neulich darüber geschrieben.

Yodit Stanton, CEO von opensensors.io, hielt einen Vortrag über die Gründe, warum Ihr IoT-Projekt scheitern wird. Sie zitierte eine beunruhigende Umfrage, die besagt, dass 75 % der IoT-Projekte als gescheitert gelten und nur 15 % einen Mehrwert bieten. Ihre Erfahrung bei der Bereitstellung realer IoT-Projekte für tatsächliche Kunden informierte sie über die Gründe für ihre Schlussfolgerungen. Eine ihrer wichtigsten Erkenntnisse war, dass billige Sensoren schlechte Daten erzeugen und schlechte Daten zum Scheitern des Projekts führen.

> Bild ist verloren gegangen

Im Anschluss an ihren Vortrag setzten sich Yodit und ich zu einer langen und ausführlichen Diskussion über die Datenerfassung bei IoT-Projekten zusammen. Sie ist eine wirklich interessante und brillante IoT- und Datentechnologin mit viel praktischer Erfahrung bei der Bereitstellung von IoT-Lösungen – etwas, das nicht viele Leute tatsächlich haben!

Gary Barnett hielt einen Vortrag mit dem Titel „The Number One Thing“, der sowohl äußerst informativ als auch äußerst unterhaltsam war. Er präsentierte diese Grafik darüber, was die „Nummer eins“ im IoT ist:

> Bild ist verloren gegangen

Aber apropos für InfluxData:

> Bild ist verloren gegangen

Es macht wirklich keinen Sinn, große Mengen an IoT-Daten zu sammeln, es sei denn, es handelt sich um verwertbare Daten. Seien Sie gewarnt, dass das Video für diesen Vortrag, wenn es herauskommt, mit F-Bomben und anderen Obszönitäten gefüllt ist (wie auch bei mehreren anderen Vorträgen).

Abgerundet wurde der Tag durch Vorträge über menschliche Faktoren, Hersteller, ein Zugmanagementsystem, Blockchain im IoT und eine Präsentation über die Verwendung digitaler Zwillinge in der Landwirtschaft und Landwirtschaft. Landwirtschaft und Landwirtschaft werden in den kommenden Jahren ein wichtiger Wachstumssektor für das IoT sein, und die Datenerfassung und Analyse landwirtschaftlicher Daten wird ein großer Faktor für seinen Erfolg sein.

Die wichtigste Erkenntnis aus dem Blockchain-Gespräch: Wenn Sie kein verteiltes Problem haben, wird Blockchain nicht die Antwort sein. Das scheint eine gute Regel zu sein, wenn man bedenkt, wie viele Leute mit „Blockchain!“ antworten. zu fast jedem Problem.

## ThingMonk Tag 3

Tag 3 wurde von Sarah Cooper, Leiterin der AWS IoT-Plattform, eingeleitet, die über Datendimensionalität im IoT sprach. Sie stellte einige Schlüsselkonzepte der IoT-Datenerfassung und -analyse vor. Ihr Vortrag über Datendimensionalität beschrieb Folgendes:

0-D-Systeme: Gerät mit diskreten Daten und wenigen Beziehungen zu Anwendungen und anderen Daten
1-D-Systeme: 2 oder mehr Datenquellen oder Systeme. Die Eingabe von einem wird an einen anderen ausgegeben. Daten sind typischerweise linear.
2-D-Systeme: Verwaltet zentral Sammlungen von 0-D-Daten und -Geräten.
3D-Systeme: Kombinieren Sie 1D- und 2D-Systeme und haben Sie mehrere überlappende Datenbeziehungen.
Datenanreicherung fügt Daten Dimensionen hinzu – Anreicherungen wie Wetterdaten usw. Sensorfusion kann verborgene Informationen aufdecken.
Fazit: Je einfacher Ihre Daten, desto komplexer die Analysen, die Sie ausführen können.

Es gab eine erstaunliche Demo des Digital Twin-Konzepts, bei der ein digitaler 3-D-Scanner im Wert von 60.000 US-Dollar verwendet wurde, um die Konferenz – die Teilnehmer und alle – mit sehr hoher Auflösung zu scannen (bis zu dem Punkt, an dem man Gesichter im Scan erkennen konnte). Der gescannte aufgezeichnet mehr als 1 Million Punkte pro Sekunde! Der Scan wurde dann in die Unity-Gaming-Engine eingespeist, um ein virtuelles 3D-Modell der gesamten Konferenz zu erstellen. Einige Sensoren wurden an die Zuschauer verteilt und diese Sensoren wurden dann dem virtuellen Modell hinzugefügt. Sensormesswerte wurden dann in Echtzeit in das Modell gestreamt und zeigten Änderungen in der physischen Welt, die sich im virtuellen Modell widerspiegelten. Die Demo löste ein kollektives Keuchen des gesamten Publikums aus und war von diesem Zeitpunkt an das Gesprächsthema der Konferenz. Es brachte das Konzept des digitalen Zwillings auf sehr tiefgreifende Weise nach Hause.

Dr. Lucy Rogers von IBM hielt einen spannenden Vortrag über ihren Weg zum IoT-Hersteller, in dem sie eine Reihe ihrer Projekte zeigte, die sie im Laufe der Jahre durchgeführt hat. Sie ist eine Macherin nach meinem Herzen, da sie alle möglichen skurrilen, lustigen und interessanten Demos erstellt. Sie hat noch keinen Semaphore-Übersetzungsbot gebaut (wir haben 2006 einen IoT-basierten Bot gebaut, um Textnachrichten in Semaphore zu übersetzen, nur zum Spaß), aber sie hat einige wirklich coole Dinge gebaut!

Es gab auch ein paar Leute wie mich, die einen Live-IoT-Sensor im Raum betrieben. Meiner war der IoT-Demo-Sensor, den ich für InfluxData entwickelt hatte, und der andere überwachte den CO2-Gehalt im Raum und betrieb einen Live-Umgebungssensor im hinteren Teil des Raums. Wir beide konnten einige interessante Beobachtungen über Schwankungen der Temperatur und des CO2-Gehalts machen und wann und warum sie auftraten. Es stellte sich heraus, dass sie auch InfluxDB als ihren Backend-Datenerfassungsmechanismus verwendeten!

## Schlussfolgerungen

Wenn Sie an einer Konferenz interessiert sind, die nicht mit Marketing- und Verkaufspräsentationen gefüllt ist, die sich auf die Details dessen konzentriert, was IoT erfolgreich macht – oder nicht –, und Sie daran interessiert sind, einige der besten Redner der Branche zu hören , dann ist ThingMonk genau das Richtige für Sie. Es ist klein, extrem gut geführt, inhaltlich noch extrem gut kuratiert und mit hervorragenden Inhalten gefüllt. Ich erwähne noch einmal das Engagement für Vielfalt. Wie ich einem der Organisatoren der Veranstaltung sagte, steht die unglaubliche Vielfalt bei ThingMonk in krassem Gegensatz zu den meisten anderen technischen Konferenzen. Es hebt hervor, dass die Vielfalt da draußen ist und dass die meisten anderen Konferenzen einfach nicht versuchen, eine Vielfalt von Rednern und Teilnehmern zu haben. Weiter so [RedMonk](https://redmonk.com): Du machst großartige Arbeit!

**<a name="link-1"></a> [1]: Die ThingMonk-Konferenz hat seit 2017 nicht mehr stattgefunden. Ich habe jahrelang versucht, sie neu zu starten, aber ohne Erfolg. Es ist eine riesige Lücke in der IoT-Konferenzlandschaft.**
