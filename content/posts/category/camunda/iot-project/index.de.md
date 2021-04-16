---
title: "IoTProject"
date: 2021-04-16T11:46:12-04:00
Author: davidgs
Category: Camunda, IoT
Slug: iot-project
hero: images/growhouse.jpg
---

# Ein Proof of Concept für die Camunda Platform BPMN mit IoT

## Abstrakt
Sie möchten die IoT-Community auf [Camunda](https://camunda.com?ref=davidgsiot) aufmerksam machen, indem Sie ein größeres IoT / Camunda Proof of Concept-Projekt abschließen. Dies würde einen IoT-Build unter Verwendung der Camunda-Plattform, Dokumentation, eines Blogposts und Werbung für die breitere IoT-Community beinhalten.

## Warum dieses Projekt verfolgen?
In vielen meiner ersten Diskussionen beim Eintritt in das Unternehmen wurde IoT häufig als wichtiger, aber noch nicht erschlossener Markt für die Camunda-Plattform erwähnt. Um Camunda in diesem riesigen Markt „wahrzunehmen“, müssen wir anfangen, Dinge zu tun, die die Community möglicherweise bemerken würde, und dann die Engagements aus diesen Dingen verfolgen.

Dies kann uns wichtige Einblicke geben, ob der IoT-Markt daran interessiert ist, BPMN zur Orchestrierung von Aufgaben auf der Grundlage von IoT-Daten zu verwenden, und eine Einführung von Camunda in die IoT-Community darstellen.

Es trifft auf viele wichtige Aspekte unseres Handelns, einschließlich Community- / Kundenfeedback, Sensibilisierung und Engagement.
Im Allgemeinen verdoppelt sich der IoT-Gesamtmarkt ungefähr alle zwei Jahre. Dieses schnelle und anhaltende Wachstum macht es zu einem attraktiven Ziel für Camunda, da wir nach Expansionsbereichen suchen.

![Grafik der zunehmenden IoT-Akzeptanz](/posts/category/camunda/iot-project/images/iotGrowthChart.png)

[[1] Prognose der Endbenutzerausgaben für IoT-Lösungen weltweit von 2017 bis 2025](https://www.statista.com/statistics/976313/global-iot-market-size/)

## Wie sieht Erfolg aus?
Erfolg bedeutet in diesem Fall nicht nur, das Projekt abzuschließen. Dieses Projekt tatsächlich abzuschließen ist nicht die Hürde. Der wahre Maßstab für den Erfolg wird sein, wie viel Aufmerksamkeit und Zugkraft in der breiteren IoT-Community wir durch dieses Projekt gewinnen können.

Einige der zu erfassenden und zu messenden Metriken wären:
- Anzahl der Personen, die die Blog-Beiträge zu diesem Projekt gelesen haben
- Wie viele dieser Leser "konvertieren" wir, um auf die Camunda-Website zu klicken?
- Anzahl der Tweets / Retweets des Projekts und seiner Teile
- Fragen zum Projekt

Die OKRs für Metriken, die ich verwenden möchte, sind:
- 20.000 Post-Reads in den Blogs, die über das Projekt gepostet wurden
- 1% Conversion auf Camunda.com Click-through

### Wie wir diese Metriken sammeln
- Wenn Sie Blog-Beiträge in DZone veröffentlichen, verwenden Sie "? Ref = davidgsiot", um Verweise auf Camunda direkt von Davids Artikeln zu unterscheiden
- Erstellen Sie "Ergebnisse", um regelmäßig intern Bericht zu erstatten (dies können Berichte, Mittagessen und Lernen, Hackathon-Projekte, Blog-Beiträge usw. sein).

Es ist wichtig anzumerken, dass, obwohl wir solche "Eitelkeitsmetriken" wie Trefferzahlen usw. im Allgemeinen nicht verfolgen, dies wirklich ein Testballonprojekt ist, um zu sehen, ob und wie viel relatives Interesse an einer Integration zwischen Camunda besteht Plattform BPMN und die IoT-Community. Da wir nur das anfängliche Interesse messen, sind einfache, leicht zu verfolgende Metriken am sinnvollsten.

## Projektidee

Wie bereits erwähnt, ist die Gebäudeautomation aufgrund der hohen Akzeptanz, der Notwendigkeit einer komplexen Orchestrierung und des derzeitigen Bestrebens, mehr Systeme in diesen Bereich zu verlagern, ein potenzieller Zielmarkt für Camunda und IoT.

> In ihrer Anfangszeit erwiesen sich Gebäudemanagementsysteme (BMS), auch Gebäudeautomationssysteme (BAS) genannt, als wegweisend. Die Verfügbarkeit eines computergestützten Steuerungssystems, mit dem die größten und teuersten Betriebskomponenten eines Gebäudes automatisch überwacht und verwaltet werden können, half den Facility Managern, ihre Arbeit besser zu erledigen. Gebäudeautomationssysteme sparten Zeit und Geld, reduzierten die Energieverschwendung und gaben den Facility Managern die Möglichkeit, ihren Betrieb besser zu überwachen.
>
> Schneller Vorlauf bis heute, und Sie haben einen weiteren Wegbereiter: das Internet der Dinge (IoT) für Gebäude. Im Kern überschneiden sich diese Technologien in einigen wichtigen Punkten, aber hier weicht das IoT von BMS ab, was es für das Personal der Einrichtungen als Managementinstrument wertvoller macht. In diesem Artikel wird untersucht, wie eine IoT-Analyse-Berichtsplattform die Leistung des BMS verbessern kann, indem sie Feedback zur Energieeffizienz bietet - und wie sich diese Änderung auf die Rolle von Facility Managern auswirken kann. <sup>[1]</sup>

[1] [IoT trifft auf Gebäudeautomation](https://www.iotforall.com/iot-meets-building-automation)

In einer früheren DevRel-Position habe ich ein kleines Projekt zur Berechnung einiger Umgebungsdaten wie Dampfdruckdifferenz usw. durchgeführt, das*sehr* beliebt wurde. Anscheinend sind diese Art von Berechnungen und Daten im Gewächshausbetrieb äußerst wichtig. Die Aufrechterhaltung der richtigen Temperatur, Luftfeuchtigkeit usw. ist der Schlüssel zum Erfolg eines Gewächshausbetriebs, und die Fähigkeit, diese Dinge zu automatisieren und zu überwachen, ist ein zentrales Bedürfnis in der Branche.

![Gewächshausautomatisierung](/posts/category/camunda/iot-project/images/smart-greenhouse-overview-01.png)

Das Gewächshausmanagement ist eine Teilmenge des größeren Marktsegments für Gebäudeautomation, das jedoch schneller wächst als der gesamte BMS-Markt.

> Laut verifizierter Marktforschung wurde der globale Markt für intelligente Gewächshäuser im Jahr 2018 auf 0,98 Mrd. USD geschätzt und soll bis 2026 2,46 Mrd. USD erreichen, was einem CAGR von 12,11% von 2018 bis 2026 entspricht. <sup>[2]</sup>

[2] [Größe und Prognose des Smart Greenhouse-Marktes](https://www.verifiedmarketresearch.com/product/global-smart-greenhouse-market-size-and-forecast-to-2025/)

Dies macht dies zu einem attraktiven Ziel für einen PoC.

## Budgetvorschlag für Hardware

Da es sich um ein IoT-Projekt handelt, ist offensichtlich IoT-Hardware erforderlich. Dies ist auch ein Projekt zur Gewächshausautomatisierung, daher ist für die Automatisierung mindestens eine Art Gewächshaus erforderlich.

**Sensoren für den Außenbereich:**

| Sensor | Preis | Menge | gesamt |
| -------- | ------- | ---------- | ------- |
| [Wetterstation](https://www.sparkfun.com/products/15901) | $ 64.95 | 1 | $ 64.95 |
| [Blitzdetektor](https://www.sparkfun.com/products/15441) | 26,50 $ | 1 | 26,50 $ |
| [ESP32](https://www.sparkfun.com/products/17381) | 20,95 $ | 1 | 20,95 $ |
| [RJ11 Breakout](https://www.sparkfun.com/products/14021) | 1,95 $ | 2 | $ 3,90 |
| [RJ11-Buchsen](https://www.sparkfun.com/products/132) | 1,25 $ | 4 | $ 5,00 |
| [LiPo-Akku](https://www.sparkfun.com/products/13856) | 26,95 $ | 1 | 26,95 $ |
| [Solarladegerät](https://www.sparkfun.com/products/12885) | 26,95 $ | 1 | 26,95 $ |
| [Solarpanel](https://www.sparkfun.com/products/13783) | $ 59.00 | 1 | $ 59.00 |
| [Bodenfeuchte](https://www.sparkfun.com/products/13637) | 6,95 $ | 1 | 6,95 $ |
| [CO <sub>2</sub> -Sensor](https://www.sparkfun.com/products/15112) | 59,95 $ | 1 | 59,95 $ |
| **Zwischensumme** | | | **$ 301.10** |



**Gewächshaussensoren:**

| Sensor | Preis | Menge | gesamt |
| -------- | ------- | ---------- | ------- |
| [Bodenfeuchte](https://www.sparkfun.com/products/13637) | 6,95 $ | 2 | 6,95 $ | $ 13.90 |
| [Schrittmotor](https://www.sparkfun.com/products/13656) | 30,95 $ | 1 | 30,95 $ |
| [Schritttreiber](https://www.sparkfun.com/products/16836) | $ 19,95 | 1 | $ 19,95 |
| [ESP32](https://www.sparkfun.com/products/17381) | 20,95 $ | 4 | 20,95 $ | $ 83.81 |
| [CO <sub>2</sub> -Sensor](https://www.sparkfun.com/products/15112) | 59,95 $ | 1 | 59,95 $ |
| [Fan](https://www.sparkfun.com/products/15708) | 11,95 $ | 1 | 11,95 $ |
| **Zwischensumme** | | | **$ 220.50** |

**Sensorsummen**
| Projektgebiet | Gesamt |
| -------------- | ------- |
| Außensensoren | $ 301.10 |
| Innensensoren | $ 220.50 |
| **Gesamtsumme:** | **$ 521.60** |


**Gewächshaus**

Dieser ist ein bisschen wie ein Joker. Ich begann zu überlegen, was funktionieren könnte. Ich möchte, dass das Gewächshaus Sensoren enthält (sie sind klein) und mindestens einen „Aktuator“ zum Öffnen eines Fensters oder etwas anderem und wahrscheinlich auch einen Ventilator. Wir reden hier realistisch.

| Gewächshaus-Typ | Kosten |
| ----------------- | ------ |
| [Outdoor](https://www.worldofgreenhouses.com/products/hybrid-greenhouse-series) | $ 650 |
| [Indoor](https://www.hpotter.com/buy-terrariums/h-potter-terrarium-classic-wardian-case-for-plants) | $ 140 |
| [Indoor - klein](https://www.amazon.com/Purzest-Terrarium-Geometric-Tabletop-Succulent) | $ 36.00 |


Für einen wirklich realistischen / genauen PoC ist das Gewächshaus im Freien natürlich die beste Wahl. Ich bin mir nicht sicher, was ich mit einem Gewächshaus im Freien machen würde, nachdem dies alles erledigt ist, aber ¯\\\_(ツ)\_/¯.

Die größere Desktop-Version hat zumindest eine Öffnung, die ich motorisieren könnte, um etwas Realismus zu geben.

**Hinweis:** [@mary_grace](https://twitter.com/mary_grace) und ich haben beschlossen, mit dem kleineren, tragbareren zu beginnen (bei bevorstehenden Reisen usw.) und zu sehen, wie die Dinge laufen. Wir können in ein größeres Gewächshaus umziehen, wenn sich das kleinere als nicht praktikable Option herausstellt.

## Dokumentation
Eine Reihe von Blog-Posts (mindestens 2 - 3), die die verschiedenen Phasen der Entwicklung des PoC abdecken
