---
title:  „So vermeiden Sie, dass Ihr Raspberry Pi bei Updates blockiert wird“
date: 2024-10-16T08:06:25+06:00
description:  Vermeiden Sie das Bricking Ihres Pi
hero: images/pile-of-bricks.jpg
reading_time: 3 minutes
relcanonical: https://dev.to/davidgs/how-to-avoid-bricking-your-device-during-update-rollouts-2hm1
---

Dass Ihr Gerät durch ein Update nicht mehr funktioniert, ist ein echtes Risiko, und selbst bei den größten Unternehmen ist das schon vorgekommen. Das ist gerade Apple passiert ([Apple pausiert Rollout von iPadOS 18 für M4 iPad Pro nach Bricking-Beschwerden](https://arstechnica.com/gadgets/2024/09/apple-pauses-ipados-18-rollout-for-m4-ipad-pro-after-bricking-complaints/)) und ich denke, wir sind uns alle des [Crowdstrike-Vorfalls](https://en.wikipedia.org/wiki/2024_CrowdStrike_incident) mittlerweile bewusst.

Es handelt sich um ein so großes Problem, dass es angesichts der jüngsten Desaster bei der Bereitstellung von Updates (über die ich [hier](https://dzone.com/articles/how-you-can-avoid-a-crowdstrike-fiasco) kurz geschrieben habe) ein guter Zeitpunkt schien, sich eingehender mit diesem Thema zu befassen.

Ich war schon immer der Meinung, dass man einem Problem wahrscheinlich nicht weiterhilft, wenn man ihm keine Lösung bieten kann. Daher habe ich nach Möglichkeiten gesucht, das Problem der „schlecht funktionierenden“ Updates tatsächlich zu lösen und bessere Strategien für deren Bereitstellung zu implementieren.

Das meiste von dem, was ich gesagt habe, ist natürlich weder neu noch weltbewegend, aber es lohnt sich, es sich genau anzuschauen, wenn Sie eine große Anzahl von Geräten einsetzen, die jederzeit vor Ort verwaltet und aktualisiert werden müssen. Seien wir ehrlich, irgendwann _wird_ etwas schiefgehen. Das passiert immer. Es ist also klug, _bevor_ es passiert, zu planen, wie man sich davon erholt, und es zeigt Ihren Kunden, dass Sie sich um sie und ihre Interessen kümmern. Sie stellen Ihre Kunden wirklich an die erste Stelle, indem Sie sicherstellen, dass sie Sie auf lange Sicht als vertrauenswürdigen Partner sehen können.

Ich behandle einige wichtige Themen wie A/B-Partitionierung, Rollbacks nach fehlgeschlagenen Updates und andere, aber ich werde hier nicht auf alle Details eingehen. Ich empfehle Ihnen, sich das Video anzusehen {% embed https://youtu.be/XELyHZp_exM?si=nNUaPIZcgr0Vlh-o %}
und lass mich wissen, was du denkst.

Ich würde gerne in Updates eine breitere Diskussion zum Thema Resilienz anstoßen, da ich der festen Überzeugung bin, dass dies neben der Sicherheit ein entscheidender Bereich ist, auf den sich das IoT konzentrieren muss, um die Versprechen der Technologie erfüllen zu können.

Dieser Vortrag stützt sich stark auf Produkte von [Zymbit](https://zymbit.com/?utm_source=dev-to&amp;utm_medium=blog&amp;utm_term=dev-to), einschließlich [Zymkey](https://zymbit.com/zymkey/?utm_source=dev-to&amp;utm_medium=blog&amp;utm_term=dev-to) und [Bootware](https://zymbit.com/bootware/?utm_source=dev-to&amp;utm_medium=blog&amp;utm_term=dev-to), aber die allgemeinen Konzepte sind auf eine Vielzahl von Anbietern anwendbar.

**Hinweis:** Wenn Sie in North Carolina, Northern Virginia oder Colorado im Bereich IoT tätig sind und [R!OT](https://riot.org) nicht kennen, entgeht Ihnen eine der besten Ressourcen für IoT-Experten. Sie veranstalten regelmäßig Events, Workshops, Lunch and Learns usw. für ihre Mitglieder. Dieser Vortrag wurde ursprünglich als Lunch and Learn für R!OT präsentiert. Ich ermutige Sie, mitzumachen und an ihren Events teilzunehmen, wenn Sie sich für diesen Bereich interessieren.
