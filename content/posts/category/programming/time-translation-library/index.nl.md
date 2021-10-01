---
title: "A Time Translation Library voor Golang"
Date: 2021-09-29
Author: davidgs
Category: Programming, Golang
Tags: golang
Slug: time-translation-library
hero: images/time.jpg
reading_time: 4 minutes
---

Ik kan gerust zeggen dat ik dit nog nooit eerder heb gedaan, maar het was erg leuk om te doen (en verrassend snel, maar daar kom ik op terug.)

Wat is dit'? Ik heb een Go-module geschreven. Wacht wat? Ja, ik heb een complete Go-module geschreven die bijna onmiddellijke vertalingen maakt voor aspecten van tijd -- zoals maanden, dagen van de week, enz.

Zorgt Go niet voor internationalisering? Het korte antwoord: Nee. Het iets langere antwoord: Nee, dat doet het niet. Het blijkt dat de dagen van de weken, maanden en afkortingen voor beide hardgecodeerde strings zijn in het `time`-pakket. Dus als je wilt dat je programma "Mercredi, 28 september 2021" goed kan zeggen, kun je niet zonder het zelf te doen.

En nu hoef je het niet meer zelf te doen!

## Data Internationalisering

Iedereen verwijst naar I18N (internationalisering is een 'I', gevolgd door 18 letters, eindigend op 'N' en ja, in het begin kostte het me een eeuwigheid om dit uit te zoeken!) dus ik noemde dit pakket 'DatesI18N' omdat het toevoegt internationalisering tot nu toe.

Ik heb veel tijd besteed aan het doorzoeken van het internet, op zoek naar en het verzamelen van alle juiste internationale weergaven van de maanden en dagen van de week voordat ik ze in een stel `json'-bestanden samenstelde.

Het gebruik van JSON maakt het erg snel om een taalbestand te laden en alle vertalingen direct beschikbaar te hebben.

## Hoe werkt het?

Best goed eigenlijk! Hier is een simpele code om de string `woensdag 28 september 2021` te vertalen naar ... nou ja, en aantal talen

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

De output daarvan is:

```
September 29, 2021
French: Mercredi, Septembre 29, 2021
Russian: среда, сентябрь 29, 2021
```

Nu spreek ik geen Russisch, dus ik ga ervan uit dat dat klopt, maar het Frans heeft zeker gelijk.

Hoewel dat er misschien ingewikkeld uitziet, is het *veel* eenvoudiger dan wat dan ook. Maar laten we het hoe dan ook afbreken.

`fr: = datesI18N.NewDatesI18N (" fr ")`

Dat creëert een nieuw `DatesI18N`-object met alle Franse locale-gegevens geladen.

`fr.DagNaam(int(d.Weekdag()))`

Extraheert de dag van de week (een geheel getal) uit het `Date`-object en zoekt het vervolgens op in het `DatesI18N`-object en retourneert de vertaalde tekenreeks. De naam van de maand wordt op dezelfde manier geëxtraheerd.

Dat is het!

## Korter

Voor veel van de talen biedt het pakket ook de vertalingen `ShortMonth` en `ShortDay`. In het Engels wordt maandag soms afgekort tot 'Mon' en september tot 'Sept'. Onnodig te zeggen dat elke taal zijn eigen versie heeft. Deze toevoegingen zijn nog niet in alle talen beschikbaar, dus je moet altijd controleren of je een waarde terugkrijgt van `fr.GetShortMonth()`. Als er geen waarde is, wordt een lege tekenreeks geretourneerd.

Enkele talen hebben ook een *minimale* weergave van Dagen van de week en Maanden. Deze zijn veel minder in aantal.

## Ontbrekende spullen

Ik heb niet voor alle talen volledige dekking. Ik werk ook niet met talen die nu van rechts naar links worden gelezen.

Er zijn, eerlijk gezegd, heel wat flagrante omissies, maar dit is release v0.0.1 tot nu toe.

## Hoe je kan helpen

Als je een niet-Engelse taal spreekt, kijk dan in de `lang` directory en voel je vrij om er iets aan toe te voegen. Ik accepteer Pull Requests! U kunt de [GitHub-repo](https://github.com/davidgs/DatesI18N) voor deze module bekijken en uw toevoegingen doen.

Als je het leuk vindt, stuur me dan gerust een :star:
