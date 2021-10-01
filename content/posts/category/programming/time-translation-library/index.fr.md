---
title: "Une bibliothèque de traduction du temps pour le Golang"
Date: 2021-09-29
Author: davidgs
Category: Programming, Golang
Tags: golang
Slug: time-translation-library
hero: images/time.jpg
reading_time: 4 minutes
---

Je peux dire en toute sécurité que je n'ai jamais fait cela auparavant, mais c'était vraiment amusant à faire (et étonnamment rapide, mais j'y reviendrai.)

Qu'est-ce que c'est ça'? J'ai écrit un module Go. Attends quoi? Oui, j'ai écrit un module Go complet qui fait des traductions presque instantanées pour des aspects du temps - comme les mois, les jours de la semaine, etc.

Go n'assure-t-il pas l'internationalisation ? La réponse courte : Non. La réponse un peu plus longue : Non, ce n'est pas le cas. Il s'avère que les jours des semaines, des mois et les abréviations pour les deux sont des chaînes codées en dur dans le package `time`. Alors si vous voulez que votre programme puisse bien dire "Mercredi, 28 septembre 2021", vous ne pouvez pas sans le faire vous-même.

Et maintenant, vous n'avez plus à le faire vous-même !

## Internationalisation des dates

Tout le monde appelle I18N (l'internationalisation est un "I", suivi de 18 lettres, se terminant par "N" et oui, au début, il m'a fallu une éternité pour comprendre cela !), j'ai donc appelé ce package "DatesI18N" car il ajoute internationalisation aux dates.

J'ai passé beaucoup de temps à parcourir Internet à la recherche et à la collecte de toutes les représentations internationales appropriées des mois et des jours de la semaine avant de les compiler dans un tas de fichiers `json`.

L'utilisation de JSON permet de charger très rapidement un fichier de langue, puis d'avoir toutes les traductions instantanément disponibles.

## Comment ça marche?

Plutôt bien, en fait ! Voici un code simple pour traduire la chaîne `Mercredi 28 septembre 2021` en ... eh bien, et le nombre de langues

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

Le résultat est :

```
September 29, 2021
French: Mercredi, Septembre 29, 2021
Russian: среда, сентябрь 29, 2021
```

Maintenant, je ne parle pas russe, donc je suppose que c'est juste, mais le français est certainement correct.

Bien que cela puisse paraître compliqué, c'est *beaucoup* plus simple qu'autre chose. Mais décomposons-le quand même.

`fr: = datesI18N.NewDatesI18N (" fr ")`

Cela crée un nouvel objet `DatesI18N` avec toutes les données locales françaises chargées.

`fr.DayName(int(d.Weekday()))`

Extrait le jour de la semaine (un entier) de l'objet `Date`, puis le recherche dans l'objet `DatesI18N` et renvoie la chaîne traduite. Le nom du mois est extrait de la même manière.

C'est ça!

## Plus court

Pour de nombreuses langues, le package fournit également les traductions `ShortMonth` et `ShortDay`. En anglais, Monday est parfois abrégé en « Mon » et septembre en « Sept ». Inutile de dire que chaque langue a sa propre version. Ces ajouts ne sont pas encore disponibles dans toutes les langues, vous devez donc toujours vérifier que vous obtenez une valeur de `fr.GetShortMonth()`. S'il n'y a pas de valeur, il renvoie une chaîne vide.

Quelques langues ont également une représentation *minimale* des jours de la semaine et des mois. Ceux-ci sont beaucoup moins nombreux.

## Il manque des trucs

Je n'ai pas une couverture complète pour toutes les langues. Je ne gère pas non plus les langues qui se lisent de droite à gauche pour le moment.

Il y a, franchement, beaucoup ** d'omissions flagrantes, mais c'est la version v0.0.1 jusqu'à présent.

## Comment pouvez-vous aider

Si vous parlez une langue autre que l'anglais, veuillez regarder dans le répertoire `lang` et n'hésitez pas à l'enrichir. J'accepte les Pull Requests ! Vous pouvez consulter le [repo GitHub](https://github.com/davidgs/DatesI18N) pour ce module et faire vos ajouts.

Si vous l'aimez, n'hésitez pas à me laisser un :star:
