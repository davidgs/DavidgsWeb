---
title: "A Time Translation Library for Golang"
Date: 2021-09-29
Author: davidgs
Category: Programming, Golang
Tags: golang
Slug: time-translation-library
hero: images/time.jpg
reading_time: 4 minutes
---

I can safely say that I've never done this before, but it's been really fun to do (and surprisingly quick, but I'll get to that.)

What's 'this'? I wrote a Go module. Wait, what? Yep, I wrote a complete Go module that does nearly instantaneous translations for aspects of time -- like months, days of the week, etc.

Doesn't Go provide internationalization? The short answer: No. The slightly longer answer: No, it doesn't. It turns out that the Days pof the weeks, months, and abbreviations for both are hard-coded strings in the `time` package. So if you want your program to be able to say "Mercredi, Septembre 28, 2021" well, you can't without doing it yourself.

And now you don't have to do it yourself!

## Dates Internationalization

Everyone refers to the as I18N (internationalization is an `I`, followed by 18 letters, ending in `N` and yes, early on it took me forever to figure this out!) so I called this package `DatesI18N` because it adds internationalization to dates.

I spent a lot of time scouring the internet looking for, and gathering, all the proper international representations of Months and Days of the week before compiling them into a bunch of `json` files.

Using JSON makes it very fast to load a language file, and then have all the translations instantly available.

## How Does It Work?

Pretty well, actually! Here's some simple code to translate the string `Wednesday, September 28, 2021` to ... well, and number of languages

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

The output from that is:

```
September 29, 2021
French: Mercredi, Septembre 29, 2021
Russian: среда, сентябрь 29, 2021
```

Now I don't speak Russian, so I'm just assuming that's right, but the French is certainly correct.

While that may look complicated, it is a *lot* simpler than anything else. But let's break it down anyway.

`fr := datesI18N.NewDatesI18N("fr")`

That creates a new `DatesI18N` object with all the French locale data loaded.

`fr.DayName(int(d.Weekday()))`

Extracts the day of the week (an integer) from the `Date` object, and then looks it up in the `DatesI18N` object and returns the translated string. The month name is extracted in the same way.

That's it!

## Shorter

For many of the languages the package also provides the `ShortMonth` and `ShortDay` translations. In English, Monday is sometimes shortened to `Mon` and September is shortened to `Sept`. Needless to say, each language has it's own version. These additions are not available in all languages yet, so you should always check that you get a value back from `fr.GetShortMonth()`. If there is no value, it returns an empty string.

A few of the languages also have a *minimal* representation of Days of the week and Months. These are much fewer in number.

## Missing stuff

I don't have complete coverage for all languages. I also don't handle languages that read right to left right now.

There are, quite frankly, a **lot** of glaring omissions, but this is release v0.0.1 so far.

## How you can help

If you speak a non-English language, please look in the `lang` directory and feel free to add to it. I accept Pull Requests! You can check out the [GitHub repo](https://github.com/davidgs/DatesI18N) for this module and make your additions.

If you like it, feel free to drop me a :star: