---
title: "Oké, dus testgestuurde ontwikkeling is een ding"
Date: 2021-04-06
Author: davidgs
Category: Programming
Slug: ok-so-test-driven-development-is-a-thing
hero: images/test-driven-development-TDD.jpg
reading_time: 6 minutes
---

Ik snap het, ik ben hier te laat voor het feest. Ik ben oud, ik ben vastbesloten in mijn wegen en ik hou niet van verandering. Kom er overheen.

## Een bug achterna zitten
Ik was een Slack-bot aan het ontwikkelen voor de [DevRelCollective](https://deverelcollective.fun) en ik had hem _ bijna_ aan het werk.

Nou, om eerlijk te zijn, ik had het een tijdje aan het werk, toen brak ik iets.

![Letterkenny To Be Fair geanimeerde gif](images/fair.gif)

En toen probeerde ik te repareren wat ik kapot had gemaakt, en de hel brak los.

## Off-by-One
Het gezegde dat ik van mijn [moeder](https://www.researchgate.net/scientific-contributions/Margaret-L-Simmons-34878680) is:
> Er zijn slechts 2 moeilijke problemen in de informatica: Cache-ongeldigverklaring, dingen benoemen en enkele fouten.
En ik was in een hel. Toegegeven, een hel die ik zelf heb gemaakt, maar desalniettemin.

Elke keer dat ik dacht dat ik het had gevonden, dook het ergens anders op. En het was ergens in de ~750 regels Golang-code die ik had kunnen schrijven. Ik kon het niet vinden en ik verloor (wat er van over is) mijn verstand!

## OK, laten we een eenvoudige test proberen
In totale wanhoop besloot ik dat ik gewoon wat tests moest schrijven om te zien of ik het kon vinden. Ik was wanhopig en bereid om alles te proberen!

Gelukkig heeft Golang een volledig ontwikkelde en relatief eenvoudige testinterface, dus ik besloot het eens te proberen. Ik begon met een relatief eenvoudige functie waarvan ik vrij zeker was dat ik er een test voor kon schrijven:

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
Alle Slack-berichten zijn `ondertekend` met een hex-string van een sha-256 hash. Bereken dat, vergelijk het met wat Slack heeft verzonden en u weet of uw bericht authentiek is. Gemakkelijke en effectieve manier om vijandige berichten buiten te houden, zolang u uw `geheim` echt geheim houdt.

Laten we dit dus eens testen. Het eerste dat u moet doen, is een nieuw Go-bestand maken. Als je programma `SlackBot.go` heet, dan zou je`SlackBot_test.go` aanmaken. En 'importeer' het testraamwerk samen met alle andere bibliotheken waarop u vertrouwt.

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
Je maakt dan een functie aan met de naam `Testxxxx` waarbij `xxxx` de naam is van de functie die je gaat testen.

In het bovenstaande voorbeeld wordt mijn Slack Secret, samen met een heleboel andere configuratiegegevens, opgeslagen in een `config.yaml`-bestand, dus ik had een korte functie nodig (`init_config()`) om die configuratiegegevens in te lezen en op te halen alles opgezet.

Ik bereken dan de Header Checksum, en dan krijg ik de `checkHeader()` functie om het te berekenen. Ze moeten overeenkomen, anders mislukt de test.

## Laten we nog wat proberen
Die eerste test was een succes en ik begon te zien hoe ik ervoor zorgde dat elke functie presteerde zoals verwacht. Dus ik begon meer te schrijven.

Laten we zeggen dat ik veel meer bugs heb gevonden dan de losse bug die ik achterna zat. Elke keer dat ik een test zou schrijven en uitvoeren, zou ik iets vinden dat de functie die ik aan het testen was een beetje verkeerd deed, dus ik zou het repareren totdat de test geslaagd was.

Het kostte een paar uur om tests voor elke functie te schrijven, en nog een paar om de fouten die ik ontdekte te corrigeren, maar toen ...

![Een Aha-moment met een gloeilamp die uitgaat](images/Aha.jpg)

Als ik op deze manier was begonnen, had ik mezelf een hoop tijd en frustratie bespaard!

## Die eenmalige fout
Het bleek dat er meerdere foutieve fouten waren die grotendeels te wijten waren aan mijn nummeringsschema. In het configuratiebestand heb ik vermeld:

```yaml
Authorized Users:
  - name: David Simmons
  - username: davidgs
  - order: 1
```
Voor de eerste persoon in de rotatie. Maar dan, zoals we weten, begint de nummering van array- / segmenten bij nul. Dus ik compenseerde dat op de meeste plaatsen, maar niet allemaal, en het manifesteerde zich op heel vreemde en moeilijk te vinden manieren.

Zodra ik begon met het testen van elke functie tegelijk, kon ik zien waar sommigen `1` teruggaven voor de eerste persoon en andere waar '0' terugkwamen. Wat nog belangrijker was, was dat ik `len(slice)` gebruikte om de lengte te bepalen en het laatste item in de slice te krijgen.

Ik had 4 mensen in de plak. Genummerd 1-4. Maar ik ben nooit `slice[4]` gaan halen, want dat is niet het laatste item. Dat is een voor een, en je krijgt een `paniek()` als je dat doet. Dus dat deed ik niet. Maar ... nou, misschien zie je de fout van mijn wegen. Ik had eigenlijk nooit aan `slice[3]` (het einde van de slice), en soms kreeg ik zelfs niet aan `slice[0]`.

De tests hebben dat allemaal snel gevonden en hebben me in staat gesteld om het allemaal op te lossen.

## Alle dingen testen!
Dit heeft me natuurlijk tot de conclusie geleid dat ik het al die jaren verkeerd heb gedaan. En dat ik terug moet gaan en Unit Tests moet schrijven voor alles wat ik ooit in de geschiedenis heb geschreven.

Ik ga dat niet doen.

Wat ik **ga doen**, is natuurlijk tests schrijven en gebruiken voor alle dingen waar ik *momenteel* aan werk, en ik zal in de toekomst tests schrijven voor absoluut alles wat ik schrijf.

Ik neem aan dat dit me veel tijd en frustratie zal besparen en, mocht mijn haar ooit teruggroeien, grijze haren.

Ik ben een bekeerling.
