---
title: "Ok, donc le développement piloté par les tests est une chose"
Date: 2021-04-06
Author: davidgs
Category: Programming
Slug: ok-so-test-driven-development-is-a-thing
hero: images/test-driven-development-TDD.jpg
reading_time: 6 minutes
---

Je comprends, je suis en retard à la fête sur celui-ci. Je suis vieux, je suis figé dans mes habitudes et je n'aime pas le changement. Passer à autre chose.

## Chasser un bug
Je développais un Slack-bot pour le [DevRelCollective](https://deverelcollective.fun) et je l'ai fait fonctionner _ presque_.

Eh bien, pour être honnête, je l'ai fait fonctionner pendant un moment, puis j'ai cassé quelque chose.

![Gif animé de Letterkenny To Be Fair](images/fair.gif)

Et puis j'essayais de réparer ce que j'avais brisé, et tout l'enfer s'est déchaîné.

## Off-by-One
Le dicton que j'ai eu de ma [maman](https://www.researchgate.net/scientific-contributions/Margaret-L-Simmons-34878680) est:
> Il n'y a que 2 problèmes difficiles en informatique: l'invalidation du cache, la dénomination des choses et les erreurs off-by-one.
Et j'étais en enfer un par un. Certes, un enfer de ma propre fabrication, mais l'enfer quand même.

Chaque fois que je pensais l'avoir trouvée, elle apparaissait ailleurs. Et c'était quelque part dans les ~ 750 lignes de code Golang que j'avais réussi à écrire. Je ne pouvais pas le trouver et je perdais (ce qui reste de) mon esprit!

## OK, essayons un test simple
En désespoir de cause, j'ai décidé que je devrais juste écrire quelques tests pour voir si je pouvais le trouver. J'étais désespéré et disposé à tout essayer!

Heureusement, Golang a une interface de test entièrement développée et relativement simple, j'ai donc décidé de l'essayer. J'ai commencé avec une fonction relativement simple pour laquelle j'étais à peu près sûr de pouvoir écrire un test:

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
Tous les messages Slack sont `signés` avec une chaîne hexadécimale d'un hachage sha-256. Calculez cela, comparez-le à ce que Slack a envoyé et vous saurez si votre message est authentique. Un moyen simple et efficace de garder les messages hostiles, tant que vous gardez votre `secret` réellement secret.

Alors testons cette chose. La première chose à faire est de créer un nouveau fichier Go. Si votre programme s'appelle `SlackBot.go`, vous créez alors`SlackBot_test.go`. Et `importez 'le cadre de test avec toutes les autres bibliothèques sur lesquelles vous comptez.

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
Vous créez ensuite une fonction appelée `Testxxxx` où `xxxx` est le nom de la fonction que vous allez tester.

Dans l'exemple ci-dessus, mon Slack Secret est stocké, avec un tas d'autres éléments de configuration, dans un fichier `config.yaml`, donc j'avais besoin d'une fonction courte (`init_config()`) pour lire ces données de configuration et obtenir tout est mis en place.

Je calcule ensuite la somme de contrôle de l'en-tête, puis j'obtiens la fonction `checkHeader()` pour la calculer. Ils doivent correspondre, ou le test échoue.

## Essayons encore
Ce test initial a été un succès et j'ai commencé à voir comment m'assurer que chaque fonction fonctionnait comme prévu. Alors j'ai commencé à écrire davantage.

Disons simplement que j'ai trouvé beaucoup plus de bogues que le bogue un par un que je chassais. Chaque fois que j'écrivais un test et que je l'exécutais, je trouvais quelque chose que la fonction que je testais faisait un peu mal, donc j'allais le réparer jusqu'à ce que le test soit réussi.

Il a fallu quelques heures pour écrire des tests pour chaque fonction, et quelques autres pour corriger les erreurs que je trouvais, mais ensuite ...

![Un moment Aha avec une ampoule qui s'éteint](images/Aha.jpg)

Si j'avais commencé de cette façon, je me serais épargné beaucoup de temps et de frustration!

## Cette erreur hors-un-par-un
En fin de compte, il y a eu plusieurs erreurs ponctuelles dues en grande partie à mon schéma de numérotation. Dans le fichier de configuration, j'ai répertorié:

```yaml
Authorized Users:
  - name: David Simmons
  - username: davidgs
  - order: 1
```
Pour la première personne de la rotation. Mais alors, comme nous le savons, la numérotation des tableaux / tranches commence à zéro. Donc, je compensais cela dans la plupart des endroits, mais pas dans tous, et cela se manifestait de manière très étrange et difficile à trouver.

Dès que j'ai commencé à tester chaque fonction à la fois, je pouvais voir où certains renvoyaient `1` pour la première personne, et d'autres retournaient `0`. Plus important encore, il s'avère que j'utilisais `len(slice)` pour déterminer la longueur et obtenir le dernier élément de la tranche.

J'avais 4 personnes dans la tranche. Numéroté 1-4. Mais je ne suis jamais allé chercher `slice[4]` parce que ce n'est pas le dernier élément. C'est la fin par un, et vous obtenez une `panique()` quand vous faites cela. Donc je ne faisais pas ça. Mais ... eh bien, vous pouvez peut-être voir l'erreur de mes manières. Je n'étais jamais arrivé à `slice[3]` (la fin de la tranche), et parfois je n'étais même pas arrivé à `slice[0]`.

Les tests ont trouvé tout cela rapidement et m'ont permis de tout réparer.

## Tester toutes les choses!
Cela m'a bien sûr conduit à la conclusion que je me suis trompé pendant toutes ces années. Et que je devrais revenir en arrière et écrire des tests unitaires pour tout ce que j'ai écrit dans toute l'histoire.

Je ne vais pas faire ça.

Ce que je **vais** faire, bien sûr, c'est écrire et utiliser des tests pour tout ce sur quoi je travaille *actuellement*, et j'écrirai des tests pour absolument tout ce que j'écrirai à l'avenir.

Je suppose que cela me fera gagner beaucoup de temps et de frustration et, si jamais mes cheveux repoussaient, des cheveux gris.

Je suis converti.
