---
title: „Linkbuilder“
date: 2023-04-09T08:25:45-04:00
Author: davidgs
Category: General
Tags: open source, link building,QR codes
Slug: link-builder
description: Erstellen Sie QR-Codes für Ihre Links
hero: images/link-builder-header.png
draft: true
reading_time:
---

## Was ist das für eine Zauberei?

Vor etwa einem Jahr habe ich angefangen, als Lernübung mit React.js zu spielen – eigentlich habe ich sowohl mit [React.js](https://reactjs.org) als auch mit [Electron](https://electronjs) gearbeitet. org), um eigenständige Apps zu erstellen.

Gleichzeitig suchte das Unternehmen, für das ich arbeitete, nach einer Möglichkeit, utm-codierte Links einfach für alle im Unternehmen bereitzustellen. Wenn Sie nicht wissen, was „UTM-codierte Links“ sind, können Sie [hier] mehr darüber erfahren (https://funnel.io/resources/google-analytics-utm-tagging), aber es ist ziemlich geekiges Zeug. Sagen wir es einfach so: Wenn Sie Fragen wie „Klicken mehr Menschen auf meine Links auf Twitter oder LinkedIn?“ beantworten möchten, können Sie Fragen beantworten. Dann sind UTM-Links genau das Richtige für Sie.

Aber ich schweife ab. Als ich darüber nachdachte, wie man ein solches Werkzeug herstellen könnte, hatte ich einen „*Eureka!*“-Moment. Ich dachte, ich könnte eine kleine App bauen, die das macht!

So tat ich. Ich habe eine kleine App erstellt, die eine URL verwendet und es Ihnen ermöglicht, vordefinierte UTM-Parameter hinzuzufügen, damit das Marketing die Wirksamkeit ihrer Links verfolgen kann. Es war eine einfache App, aber sie funktionierte. Und es hat Spaß gemacht, es zu bauen.

Dieser Job hat beschlossen, es nicht zu verwenden (wenn Sie glauben, dass das „Hier nicht erfunden“-Syndrom tot ist, habe ich ein paar Geschichten zu erzählen!), aber ich habe beschlossen, in meiner Freizeit weiter daran zu arbeiten, um meine React.js-Fähigkeiten zu verbessern.

Ich verwende den Ausdruck „Reaktionsfähigkeiten“ hier sehr locker. Ich bin kein React-Entwickler und würde nie mit einem verwechselt werden. Aber ich lerne dadurch, dass ich es tue, also habe ich es weiter gemacht.

## Lassen Sie uns weitere Funktionen hinzufügen!

Eine App, die kaum mehr kann, als utm-kodierte Links zu erstellen, ist nicht wirklich das A und O. Dann hat jemand, dem ich auf Twitter folge (und ich kann beim besten Willen ihre Tweets dazu nicht finden, wenn Sie das also erkennen, lassen Sie es mich bitte wissen, damit ich es angemessen würdigen kann!) und einen Beitrag über das Erstellen von QR-Codes in JavaScript geschrieben dachte: „Hey, das wäre eine tolle Funktion für meine App!“

Lassen Sie mich einfach sagen, dass das ganze „Hey, das kann ich!“ und „Wie schwer kann es sein?“ Diese Einstellung bringt mich in Schwierigkeiten. Aber ich schweife wieder ab.

Wie auch immer, die App hat sich zu etwas sehr Nützlichem entwickelt, und mein aktueller Job beschloss, sie unternehmensweit einzuführen, um verschlüsselte Links und QR-Codes zu erstellen. Für sie habe ich unter anderem einen QR-Code individuell gestaltet, der das Firmenlogo, die Unternehmensfarben und individuelle „Augen“ in den QR-Code integriert.

![Benutzerdefinierter QR-Code](images/example.png)

Ziemlich schöner QR-Code, oder?

## Lassen Sie uns benutzerdefinierte QR-Codes erstellen!

Dann kam mir die Idee, eine App zu entwickeln, mit der Sie Ihre eigenen QR-Codes entwerfen und diese nach Ihren Wünschen anpassen können. Ich habe versucht, dafür eine völlig separate App zu erstellen, und war einigermaßen erfolgreich, aber es schien mir eine Menge Aufwand zu sein, einen QR-Code zu entwerfen und ihn dann irgendwie in die *andere* App einzufügen, um ihn beim Erstellen zu verwenden Links.

Was zu tun. Was zu tun?

## Und auch ...

Während ich das alles tat, zeigte ich ein paar Leuten, was ich tat, und, sagen wir mal, es herrschte eine gewisse Begeisterung dafür. Aber ich hatte immer noch ein Problem. Die einzige echte, funktionierende Version, die ich hatte, war stark an meinen Arbeitgeber angepasst und würde für viele andere Unternehmen nicht sehr nützlich sein.

## Zeit für eine Neugestaltung

Um diese Anwendung für ein möglichst breites Publikum wirklich nützlich zu machen, musste sie wirklich für jeden Benutzer anpassbar sein. Manche Leute möchten vielleicht einen bestimmten UTM-Parameter, während andere diesen nicht wollen. Manche Leute möchten vielleicht, dass ein bestimmter UTM-Parameter aus einer vordefinierten Liste stammt, während andere vielleicht möchten, dass es sich um ein einfaches Textfeld handelt.

Das wird eine *menge* Anpassung sein. Und es wird eine Menge Arbeit erfordern, dies zu erreichen. Oder vielleicht nicht.

## Unerträglich anpassbar

Ich habe beschlossen, so ziemlich jeden Aspekt der App anpassbar zu machen. Ich habe ein Anpassungspanel erstellt, das es einem Benutzer ermöglicht, nahezu jeden Aspekt der Anwendung zu ändern.

Beginnen wir damit, wie die Anwendung aussieht, wenn Sie sie zum ersten Mal öffnen:

![Linkbuilder](images/main-interface.png)

Wenn Sie sich das ansehen, ist das allererste, was Sie wahrscheinlich ändern möchten, das Logo. Wer hätte gedacht, dass *das* eine gute Idee wäre? Nun ja, habe ich. Aber vielleicht nicht. Also lasst es uns ändern.



