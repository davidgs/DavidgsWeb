---
title: "Una biblioteca de traducción de tiempos para Golang"
Date: 2021-09-29
Author: davidgs
Category: Programming, Golang
Tags: golang
Slug: time-translation-library
hero: images/time.jpg
reading_time: 4 minutes
---

Puedo decir con seguridad que nunca había hecho esto antes, pero ha sido muy divertido de hacer (y sorprendentemente rápido, pero llegaré a eso).

Qué es esto'? Escribí un módulo de Go. ¿Esperar lo? Sí, escribí un módulo Go completo que hace traducciones casi instantáneas de aspectos del tiempo, como meses, días de la semana, etc.

¿Go no proporciona internacionalización? La respuesta corta: No. La respuesta un poco más larga: No, no es así. Resulta que los días de las semanas, los meses y las abreviaturas de ambos son cadenas codificadas en el paquete `time`. Entonces, si desea que su programa pueda decir "Mercredi, 28 de septiembre de 2021", no puede hacerlo sin hacerlo usted mismo.

¡Y ahora no tienes que hacerlo tú mismo!

## Internacionalización de Fechas

Todo el mundo se refiere al como I18N (la internacionalización es un `I`, seguido de 18 letras, que terminan en` N` y sí, ¡al principio me tomó una eternidad entender esto!), Así que llamé a este paquete `DatesI18N` porque agrega internacionalización a las fechas.

Pasé mucho tiempo recorriendo Internet buscando y reuniendo todas las representaciones internacionales adecuadas de los meses y días de la semana antes de compilarlas en un montón de archivos `json`.

El uso de JSON hace que sea muy rápido cargar un archivo de idioma y luego tener todas las traducciones disponibles al instante.

## ¿Como funciona?

¡Bastante bien, en realidad! Aquí hay un código simple para traducir la cadena `miércoles 28 de septiembre de 2021` a ... bueno, y en varios idiomas

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

El resultado de eso es:

```
September 29, 2021
French: Mercredi, Septembre 29, 2021
Russian: среда, сентябрь 29, 2021
```

Ahora no hablo ruso, así que supongo que es correcto, pero el francés ciertamente tiene razón.

Si bien eso puede parecer complicado, es*mucho* más simple que cualquier otra cosa. Pero analicémoslo de todos modos.

`fr: = fechasI18N.NewDatesI18N (" fr ")`

Eso crea un nuevo objeto `DatesI18N` con todos los datos de la configuración regional francesa cargados.

`fr.DayName (int (d.Weekday ()))`

Extrae el día de la semana (un número entero) del objeto `Date`, luego lo busca en el objeto` DatesI18N` y devuelve la cadena traducida. El nombre del mes se extrae de la misma forma.

¡Eso es todo!

## Más corta

Para muchos de los idiomas, el paquete también proporciona las traducciones `ShortMonth` y` ShortDay`. En inglés, el lunes a veces se acorta a "Mon" y septiembre se acorta a "Sept". No hace falta decir que cada idioma tiene su propia versión. Estas adiciones aún no están disponibles en todos los idiomas, por lo que siempre debe verificar que obtiene un valor de `fr.GetShortMonth ()`. Si no hay ningún valor, devuelve una cadena vacía.

Algunos de los idiomas también tienen una representación * mínima * de Días de la semana y Meses. Son mucho menos numerosos.

## Cosas que faltan

No tengo una cobertura completa para todos los idiomas. Tampoco manejo idiomas que se leen de derecha a izquierda en este momento.

Francamente, hay un montón de omisiones evidentes, pero esta es la versión v0.0.1 hasta ahora.

## Cómo puedes ayudar

Si habla un idioma que no sea inglés, busque en el directorio `lang` y siéntase libre de agregarlo. ¡Acepto solicitudes de extracción! Puede consultar el [repositorio de GitHub](https://github.com/davidgs/DatesI18N) para este módulo y hacer sus adiciones.

Si te gusta, no dudes en enviarme una: estrella:
