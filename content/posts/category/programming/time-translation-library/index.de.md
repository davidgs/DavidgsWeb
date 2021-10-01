---
title: "Eine Zeitübersetzungsbibliothek für Golang"
Date: 2021-09-29
Author: davidgs
Category: Programming, Golang
Tags: golang
Slug: time-translation-library
hero: images/time.jpg
reading_time: 4 minutes
---

Ich kann mit Sicherheit sagen, dass ich das noch nie gemacht habe, aber es hat wirklich Spaß gemacht (und überraschend schnell, aber ich komme dazu.)

Was ist das'? Ich habe ein Go-Modul geschrieben. Warte was? Ja, ich habe ein komplettes Go-Modul geschrieben, das fast augenblicklich Übersetzungen für Zeitaspekte durchführt – wie Monate, Wochentage usw.

Bietet Go keine Internationalisierung? Die kurze Antwort: Nein. Die etwas längere Antwort: Nein, tut es nicht. Es stellt sich heraus, dass die Tage der Wochen, Monate und Abkürzungen für beide hartcodierte Zeichenfolgen im `time`-Paket sind. Wenn Sie also möchten, dass Ihr Programm "Mercredi, 28. September 2021" gut sagen kann, können Sie nicht, ohne es selbst zu tun.

Und jetzt müssen Sie es nicht selbst tun!

##Termine Internationalisierung

Jeder bezeichnet das als I18N (Internationalisierung ist ein 'I', gefolgt von 18 Buchstaben, die auf 'N' enden und ja, ich habe am Anfang ewig gebraucht, um das herauszufinden!) Internationalisierung auf Termine.

Ich habe viel Zeit damit verbracht, das Internet zu durchforsten und alle richtigen internationalen Darstellungen der Monate und Wochentage zu sammeln, bevor ich sie in eine Reihe von `json`-Dateien kompilierte.

Die Verwendung von JSON macht es sehr schnell, eine Sprachdatei zu laden und dann alle Übersetzungen sofort verfügbar zu haben.

## Wie funktioniert es?

Eigentlich ganz gut! Hier ist ein einfacher Code, um die Zeichenfolge `Mittwoch, 28. September 2021` in ... und Anzahl der Sprachen zu übersetzen

```golang
package main

import (
  "fmt"
	"time"

  datesI18N "github.com/davidgs/datesi18n"
)

func main() {
	d := time.Now()
	d.Month()
	fmt.Println(d.Format("January 2, 2006"))
	year, month, day := d.Date()
  fr := datesI18N.NewDatesI18N("fr") // french
	fmt.Printf("French: %s, %s %d, %d\n", fr.DayName(int(d.Weekday())), fr.MonthName(int(month)), day, year)
	ru := datesI18N.NewDatesI18N("ru") // russian
	fmt.Printf("Russian: %s, %s %d, %d\n", ru.DayName(int(d.Weekday())), ru.MonthName(int(month)), day, year)
}
```

Die Ausgabe daraus ist:

```
September 29, 2021
French: Mercredi, Septembre 29, 2021
Russian: среда, сентябрь 29, 2021
```

Jetzt spreche ich kein Russisch, also gehe ich nur davon aus, dass es richtig ist, aber das Französisch hat sicherlich Recht.

Das mag zwar kompliziert aussehen, ist aber *viel* einfacher als alles andere. Aber brechen wir es trotzdem auf.

`fr: = dateI18N.NewDatesI18N (" fr ")`

Dadurch wird ein neues `DatesI18N`-Objekt erstellt, in dem alle französischen Gebietsschemadaten geladen sind.

`fr.DayName(int(d.Weekday()))`

Extrahiert den Wochentag (eine ganze Zahl) aus dem `Date`-Objekt, schlägt ihn dann im `DatesI18N`-Objekt nach und gibt den übersetzten String zurück. Der Monatsname wird auf die gleiche Weise extrahiert.

Das ist es!

## Kürzer

Für viele der Sprachen bietet das Paket auch die Übersetzungen `ShortMonth` und `ShortDay`. Im Englischen wird Montag manchmal zu "Mon" und September zu "Sept" verkürzt. Unnötig zu erwähnen, dass jede Sprache ihre eigene Version hat. Diese Zusätze sind noch nicht in allen Sprachen verfügbar, daher sollten Sie immer überprüfen, ob Sie einen Wert von `fr.GetShortMonth()` zurückbekommen. Wenn kein Wert vorhanden ist, wird eine leere Zeichenfolge zurückgegeben.

Einige der Sprachen haben auch eine *minimale* Darstellung von Wochentagen und Monaten. Das sind deutlich weniger.

## Fehlende Sachen

Ich habe nicht alle Sprachen vollständig abgedeckt. Ich behandle derzeit auch keine Sprachen, die von rechts nach links gelesen werden.

Es gibt, ehrlich gesagt, **viele** eklatante Auslassungen, aber dies ist bisher Version v0.0.1.

## Wie kannst du helfen

Wenn Sie eine andere Sprache als Englisch sprechen, schauen Sie bitte im `lang`-Verzeichnis nach und fügen Sie es gerne hinzu. Ich akzeptiere Pull-Requests! Sie können das [GitHub-Repository](https://github.com/davidgs/DatesI18N) für dieses Modul überprüfen und Ihre Ergänzungen vornehmen.

Wenn es dir gefällt, schreib mir gerne einen :star:
