---
title: "Ok, testgetriebene Entwicklung ist also eine Sache"
Date: 2021-04-06
Author: davidgs
Category: Programming
Slug: ok-so-test-driven-development-is-a-thing
hero: images/test-driven-development-TDD.jpg
reading_time: 5 minutes
---

Ich verstehe, ich bin zu spät zur Party. Ich bin alt, ich bin auf meine Art eingestellt und ich mag keine Veränderung. Komm darüber hinweg.

## Einen Fehler jagen
Ich habe einen Slack-Bot für das [DevRelCollective](https://deverelcollective.fun) entwickelt und es fast funktioniert.

Um fair zu sein, ich hatte es eine Weile arbeiten lassen, dann habe ich etwas kaputt gemacht.

![Letterkenny To Be Fair animiertes GIF](images/fair.gif)

Und dann habe ich versucht zu reparieren, was ich kaputt gemacht habe, und die Hölle ist los.

## Off-by-One
Das Sprichwort, das ich von meiner [Mutter](https://www.researchgate.net/scientific-contributions/Margaret-L-Simmons-34878680) erhalten habe, lautet:
> In der Informatik gibt es nur zwei schwierige Probleme: Cache-Ungültigmachung, Benennung von Dingen und Fehler nacheinander.
Und ich war in einer Hölle. Zugegeben, eine Hölle, die ich selbst gemacht habe, aber trotzdem die Hölle.

Jedes Mal, wenn ich dachte, ich hätte es gefunden, tauchte es woanders auf. Und es war irgendwo in den ~750 Zeilen des Golang-Codes, die ich geschrieben hatte. Ich konnte es nicht finden und verlor meinen Verstand!

## OK, versuchen wir es mit einem einfachen Test
In völliger Verzweiflung beschloss ich, nur ein paar Tests zu schreiben, um zu sehen, ob ich sie finden konnte. Ich war verzweifelt und bereit, alles zu versuchen!

Glücklicherweise hat Golang eine voll entwickelte und relativ einfache Testoberfläche, daher habe ich beschlossen, es auszuprobieren. Ich begann mit einer relativ einfachen Funktion, für die ich mir ziemlich sicher war, dass ich einen Test schreiben könnte:

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
Alle Slack-Nachrichten sind mit einer Hex-Zeichenfolge eines sha-256-Hashs `signed`. Berechnen Sie das, vergleichen Sie es mit dem, was Slack gesendet hat, und Sie wissen, ob Ihre Nachricht authentisch ist. Einfache und effektive Möglichkeit, feindliche Nachrichten fernzuhalten, solange Sie Ihr `Geheimnis` tatsächlich geheim halten.

Also lasst uns dieses Ding testen. Als erstes erstellen Sie eine neue Go-Datei. Wenn Ihr Programm `SlackBot.go` heißt, würden Sie `SlackBot_test.go` erstellen. Und importieren Sie das Test-Framework zusammen mit allen anderen Bibliotheken, auf die Sie sich verlassen werden.

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
Anschließend erstellen Sie eine Funktion namens `Testxxxx`, wobei `xxxx` der Name der Funktion ist, die Sie testen möchten.

Im obigen Beispiel wird mein Slack Secret zusammen mit einer Reihe anderer Konfigurationsdaten in einer `config.yaml`-Datei gespeichert, sodass ich eine kurze Funktion (`init_config()`) benötigte, um diese Konfigurationsdaten einzulesen und abzurufen alles eingerichtet.

Ich berechne dann die Header-Prüfsumme und erhalte dann die Funktion `checkHeader()`, um sie zu berechnen. Sie sollten übereinstimmen, sonst schlägt der Test fehl.

## Lass uns noch etwas versuchen
Dieser erste Test war ein Erfolg, und ich begann zu sehen, wie ich sicherstellen konnte, dass jede Funktion wie erwartet ausgeführt wurde. Also fing ich an, mehr zu schreiben.

Sagen wir einfach, ich habe weit mehr Fehler gefunden als den Fehler, den ich verfolgt habe. Jedes Mal, wenn ich einen Test schrieb und ausführte, stellte ich fest, dass die von mir getestete Funktion etwas falsch war, und reparierte sie, bis der Test bestanden war.

Es dauerte ein paar Stunden, um Tests für jede Funktion zu schreiben, und ein paar mehr, um die Fehler zu korrigieren, die ich gefunden hatte, aber dann ...

![Ein Aha-Moment mit einer Glühbirne](images/Aha.jpg)

Hätte ich so angefangen, hätte ich mir eine Menge Zeit und Frust gespart!

## Dieser Fehler nacheinander
Wie sich herausstellte, gab es mehrere Fehler, die zum großen Teil auf mein Nummerierungsschema zurückzuführen waren. In der Konfigurationsdatei, die ich aufgelistet habe:

```yaml
Authorized Users:
  - name: David Simmons
  - username: davidgs
  - order: 1
```
Für die erste Person in der Rotation. Aber dann beginnt, wie wir wissen, die Array- / Slice-Nummerierung bei Null. Also habe ich das an den meisten Orten kompensiert, aber nicht an allen, und es manifestierte sich auf sehr seltsame und schwer zu findende Weise.

Sobald ich anfing, jede Funktion gleichzeitig zu testen, konnte ich sehen, wo einige "1" für die erste Person zurückgaben und andere "0" zurückgaben. Es stellte sich heraus, dass ich vor allem len (Slice) verwendet habe, um die Länge zu bestimmen und das letzte Element im Slice zu erhalten.

Ich hatte 4 Leute in der Scheibe. Nummeriert 1-4. Aber ich habe nie `Slice[4]` bekommen, weil das nicht der letzte Gegenstand ist. Das ist um eins vorbei und du bekommst eine `panic()`, wenn du das tust. Also habe ich das nicht gemacht. Aber ... nun, vielleicht können Sie den Fehler meiner Wege sehen. Ich kam nie zu `Slice[3]` (dem Ende des Slice), und manchmal kam ich nicht einmal zu `Slice[0]`.

Die Tests fanden das alles schnell und erlaubten mir, alles zu reparieren.

## Alle Dinge testen!
Dies hat mich natürlich zu dem Schluss geführt, dass ich es all die vielen Jahre falsch gemacht habe. Und dass ich zurückgehen und Unit Tests für alles schreiben sollte, was ich jemals in der gesamten Geschichte geschrieben habe.

Ich werde das nicht tun.

Was ich natürlich tun werde, ist, Tests für all die Dinge zu schreiben und zu verwenden, an denen ich*derzeit* arbeite, und ich werde Tests für absolut alles schreiben, was ich in Zukunft schreibe.

Ich gehe davon aus, dass dies mir viel Zeit und Frust erspart und, falls meine Haare jemals nachwachsen sollten, graue Haare.

Ich bin ein Konvertit.
