---
title: "Ok, entonces el desarrollo basado en pruebas es una cosa"
Date: 2021-04-06
Author: davidgs
Category: Programming
Slug: ok-so-test-driven-development-is-a-thing
hero: images/test-driven-development-TDD.jpg
reading_time: 5 minutes
---

Lo entiendo, llego tarde a la fiesta en este caso. Soy viejo, tengo mis caminos y no me gusta el cambio. Superalo.

## Persiguiendo un error
Estaba desarrollando un Slack-bot para [DevRelCollective](https://deverelcollective.fun) y lo tenía _casi_ funcionando.

Bueno, para ser justos, lo tuve funcionando por un tiempo, luego rompí algo.

![Gif animado de Letterkenny To Be Fair](images/fair.gif)

Y luego estaba tratando de arreglar lo que rompí, y se desató el infierno.

## Uno a uno
El dicho que recibí de mi [mamá](https://www.researchgate.net/scientific-contributions/Margaret-L-Simmons-34878680) es:
> Solo hay 2 problemas difíciles en la informática: invalidación de caché, nombrar cosas y errores de uno por uno.
Y yo estaba en un infierno de uno en uno. Es cierto que un infierno de mi propia creación, pero un infierno de todos modos.

Cada vez que pensaba que lo había encontrado, aparecía en otro lugar. Y estaba en algún lugar de las ~ 750 líneas de código Golang que logré escribir. ¡No pude encontrarlo y estaba perdiendo (lo que quedaba de) mi mente!

## OK, intentemos una prueba simple
En total desesperación, decidí que debería escribir algunas pruebas para ver si podía encontrarlo. ¡Estaba desesperado y dispuesto a intentar cualquier cosa!

Afortunadamente, Golang tiene una interfaz de prueba completamente desarrollada y relativamente fácil, así que decidí intentarlo. Comencé con una función relativamente simple para la que estaba bastante seguro de poder escribir una prueba:

```go
func checkHeader(key string, data string) bool { // Test Written
	// Create a new HMAC by defining the hash type and the key (as byte array)
	h := hmac.New(sha256.New, []byte(config.SlackSecret))
	// Write Data to it
	h.Write([]byte(data))
	// Get result and encode as hexadecimal string
	sha := hex.EncodeToString(h.Sum(nil))
	comp := fmt.Sprintf("v0=%s", sha)
	return comp == key
}
```
Todos los mensajes de Slack están `firmados` con una cadena hexadecimal de un hash sha-256. Calcule eso, compárelo con lo que envió Slack y sabrá si su mensaje es auténtico. Una forma fácil y eficaz de mantener fuera los mensajes hostiles, siempre y cuando mantenga su `secreto` realmente en secreto.

Así que probemos esto. Lo primero que debe hacer es crear un nuevo archivo Go. Si su programa se llama `SlackBot.go`, entonces debería crear`SlackBot_test.go`. E `importe` el marco de prueba junto con cualquier otra biblioteca en la que pueda confiar.

```go
import (
  "testing"
  "fmt"
  "crypto/hmac"
	"crypto/sha256"
	"encoding/hex"
)

func TestCheckHeader(t *testing.T) {
	init_config()
	h := hmac.New(sha256.New, []byte(config.SlackSecret))
	h.Write([]byte(ConfigString))
	sha := hex.EncodeToString(h.Sum(nil))
	input := fmt.Sprintf("v0=%s", sha)
	result := checkHeader(input, ConfigString)
	if !result {
		t.Errorf("checkHeader Failed got %v", result)
	}
}
```
Luego, crea una función llamada `Testxxxx` donde `xxxx` es el nombre de la función que probará.

En el ejemplo anterior, mi Slack Secret se almacena, junto con un montón de otras cosas de configuración, en un archivo `config.yaml`, así que necesitaba una función corta (`init_config()`) para leer esos datos de configuración y obtener todo configurado.

Luego calculo la suma de comprobación del encabezado y luego obtengo la función `checkHeader()` para calcularla. Deben coincidir o la prueba falla.

## Probemos un poco más
Esa prueba inicial fue un éxito y comencé a ver cómo asegurarme de que cada función se desempeñaba como se esperaba. Entonces comencé a escribir más.

Digamos que encontré muchos más errores que el error de uno en uno que estaba persiguiendo. Cada vez que escribía una prueba y la ejecutaba, encontraba algo que la función que estaba probando estaba haciendo un poco mal, así que lo arreglaría hasta que pasara la prueba.

Me tomó algunas horas escribir pruebas para cada función, y algunas más para corregir los errores que estaba encontrando, pero luego ...

![Un momento Aha con una bombilla apagándose](images/Aha.jpg)

¡Si hubiera comenzado de esta manera, me habría ahorrado un montón de tiempo y frustración!

## Ese error de uno por uno
Resulta que hubo varios errores uno por uno debido en gran parte a mi esquema de numeración. En el archivo de configuración que enumeré:

```yaml
Authorized Users:
  - name: David Simmons
  - username: davidgs
  - order: 1
```
Para la primera persona en la rotación. Pero luego, como sabemos, la numeración de matrices/rebanadas comienza en cero. Así que estaba compensando eso en la mayoría de los lugares, pero no en todos, y se manifestaba de formas muy extrañas y difíciles de encontrar.

Tan pronto como comencé a probar cada función a la vez, pude ver dónde algunas devolvían `1` para la primera persona y otras devolvían `0`. Más importante aún, resultó ser que estaba usando `len(slice)` para determinar la longitud y obtener el último elemento de la sección.

Tenía 4 personas en el segmento. Numerados del 1 al 4. Pero nunca fui a obtener `slice[4]` porque ese no es el último elemento. Eso está al final por uno, y te entra un `pánico()` cuando haces eso. Entonces no estaba haciendo eso. Pero ... bueno, tal vez puedas ver el error de mis caminos. En realidad, nunca llegué a `cortar[3]` (el final del segmento), y algunas veces ni siquiera conseguí `cortar[0]`.

Las pruebas encontraron todo eso rápidamente y me permitieron arreglarlo todo.

## ¡Probando todas las cosas!
Esto, por supuesto, me ha llevado a la conclusión de que lo he estado haciendo mal durante todos estos años. Y que debería volver atrás y escribir pruebas unitarias para todo lo que he escrito en toda la historia.

No voy a hacer eso.

Lo que **voy a** hacer, por supuesto, es escribir y usar pruebas para todas las cosas en las que estoy *trabajando actualmente*, y escribiré pruebas para absolutamente todo lo que escriba en el futuro.

Supongo que esto me ahorrará toneladas de tiempo y frustración y, si mi cabello vuelve a crecer, canas.

Soy un converso.
