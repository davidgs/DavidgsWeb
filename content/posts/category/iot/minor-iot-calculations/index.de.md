---
title: „Einige Minor IoT Berechnungen“
Date: 2015-01-30
Author: davidgs
Category: IoT
Tags: Batteries, IoT, power
Slug: minor-iot-calculations
hero: images/Critical-Battery-Icon-old-laptop.jpg
---

## Batterien werden ein limitierender Faktor bei IoT-Implementierungen sein

Es gibt eine Menge Hype um das Internet der Dinge (IoT), wie ich habe [die](/posts/category/general/here-comes-iot-ready-or-not/)) [wiederholt](/posts/category/iot/is-iot-happening-or-not-in-2015/) - und als jemand, der weiß, in diesen Tagen schon etwas über die Technik liest. Es gibt tragbare Tech, gibt es im Gesundheitswesen IoT, gibt es M2M IoT und eine Vielzahl von anderen Bereichen des IoT, die alle projiziert werden, die nächsten 10 Jahre explodieren über. Milliarden und Milliarden von Geräten sind Prognose. Vielleicht Billionen. Das sind große Zahlen und sie sind spannend für jeden in diesem Bereich arbeiten, oder sogar zu beobachten. Aber es gibt ein Problem. Leistung.

Ein großes Problem. Leistung. Wie werden wir diese Milliarden von Geräten versorgen? Einige von ihnen, natürlich, werden einfach mit Strom versorgt werden, um sie in eine konstanten Stromversorgung anschließen. Lassen Sie uns diejenigen ignorieren. Eine ganze Reihe von ihnen - vielleicht die meisten von ihnen - Wearables, viele medizinische Geräte, Umgebungssensoren, Fernsensoren etc. - - werden kleine, eingebettete Geräte, die mit Batterien betrieben werden müssen. Und es ist dein Problem. Batterien. Viele Batterien. Boot lädt Batterien.

Ich verbrachte viel Zeit, wieder in dem Tag, Batterien, damit die Sun SPOT-Plattform untersucht, ein ausgewogenes Verhältnis zwischen Größe und Gewicht und Kapazität zu erreichen. Oh, und Preis. Batterien können teuer werden. Sehr teuer. Aber die Größe und das Gewicht und die Kapazität der Batterien sind nicht einmal gehen das größte Problem mit dem Internet der Dinge zu sein. Es gibt viel Forschung auf der ganzen Welt gehen Batterien kleiner, leistungsfähiger und effizienter zu machen. Nein, nur die schiere ** ** Anzahl von Batterien wird das Problem sein. Und es ist ein Problem, dass nicht genug Leute zu denken, und fast niemand spricht.

Hier ist, was ich meine. Nehmen wir die gemeinsame Anzahl von 20-30000000000 IoT-Geräte on-line bis 2020 [Gartner](http://www.gartner.com/newsroom/id/2636073)) [Forrester](https://www.forrester.com/There+Is+No+Internet+Of+Things+8212+Yet/fulltext/-/E-RES101421) (Pay-Wand),) (Pay-Wand), [IDC](http://www.idc.com/getdoc.jsp?containerId=248451),), [Ovum](http://www.computerweekly.com/news/2240238915/Lot-of-nonsense-touted-about-IoT-says-analyst), und so ziemlich alle anderen mit dieser Nummer , und ich will es nicht argumentieren, so dass wir nur das nehmen würden als ein mit 20 Milliarden Geräten gegeben und gehen. Nun lassen Sie uns sagen, dass etwa die Hälfte dieser Geräte vom Netz mit Strom versorgt werden, und wird keine Batterie benötigen. So sind wir nun mit 10 Milliarden Geräte mit Batterien links. Einige Geräte können ein Jahr oder mehr auf einer einzigen Batterie gehen. Einige können nur ein paar Wochen gehen. Also lassen Sie sich zum Argumente willen, sagt, dass der Durchschnitt ist, dass etwa ein Drittel der Geräte ihre Batterie im Laufe eines Jahres geändert haben muß. Das scheint vernünftig.

Ja, es scheint vernünftig, bis Sie die folgenden Berechnungen durchführen:

> 20B ÷ 2 = 10B - die Anzahl der Batterieabhängigen Geräte.

> 10B ÷ 3 = 3.4b - die Anzahl der Batterien, die in einem Jahr geändert werden müssen.

> 3.4b ÷ 365 = 9.1M - die Anzahl der Batterien, die täglich gewechselt werden müssen.

Jetzt müssen Sie das Problem? Aber es kommt noch schlimmer. Viel schlimmer.

Lassen Sie uns jetzt Skala, die auf eine Billion Geräte - eine Zahl, die oft verwendet wird, wenn es um die IoT sprechen. Hölle, * Ich habe * wurde mit dieser Nummer selbst seit 2004!

> 1T ÷ 3 = 333B - sagen wir Lassen Sie uns nur ein Drittel dieser Geräte jetzt Batterien benötigen.

> 333B ÷ 3 = 111B - Die Anzahl der Batterien, die in einem Jahr geändert werden müssen.

> 111B ÷ 365 = 304M - die Anzahl der Batterien, die alle geändert werden müssen. Single. Tag. Das ist 34k Batterien eine Stunde.

diese Zahlen gegeben, wird die IoT unter Eigengewicht der es zusammenbrechen. Nun, wenn Sie eine Batterie Unternehmen sind, ich bin sicher, dass diese Zahlen sind sehr beruhigend, aber für alle, die, wie sich die IoT tatsächlich Funktion, es ist klar, dass diese Zahlen sind nicht nur nicht nachhaltig, aber sie sind völlig undurchführbar. Wir werden eine Armee von Menschen brauchen, die nichts tun, aber von Gerät zu Gerät gehen Batterien, 24 Stunden am Tag, 7 Tage die Woche, um Veränderung zu halten. (Für diejenigen, die zu Hause Spiel spielen, das ist 34,000+ Batterien pro Stunde, jede Stunde.)

Wir brauchen eindeutig eine andere Lösung. Die große Frage ist, warum ** ** ist niemand im IoT Feld spricht darüber? Warum gibt es Radio-Stille auf dieser sich abzeichnenden, lähmende Problem in IoT? Es gibt nur ein paar ausgewählt Leute auf einigen Lösungen für dieses Problem Batterie arbeiten. Wenn Sie in das Internet der Dinge sind, und Sie nicht bereits darüber nachzudenken, wie die Batterie Problem in Ihrem Ökosystem zu verwalten, jetzt könnte die Zeit, um zu starten.
