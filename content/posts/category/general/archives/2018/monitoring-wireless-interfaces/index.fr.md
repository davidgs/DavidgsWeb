---
Title: "Monitoring Your Wireless Interfaces"
Date: 2018-01-16
Category: general
Slug: monitoring-wireless-interfaces
hero: images/header.png
reading_time: 6 minutes
---

> Ce message a été initialement publié sur le [Blog InfluxData](https://www.influxdata.com/blog/monitoring-wireless-interfaces/).

Si vous avez suivi mes derniers messages, vous verrez que j'ai été jusqu'à la taille dans les routeurs et les trucs sans fil. Je construis une "architecture de référence" plus grande et plus compliquée pour la surveillance IoT avec InfluxDB, et pour ce faire, j'utilise toutes sortes de boîtes différentes. Je réutilise ma box Pine-64 (voir ici) et je voulais pouvoir surveiller les stats de l'interface Wireless. Il s'avère qu'il n'y avait pas de plugin Telegraf pour ça ! QUOI??!?! Alors j'en ai écrit un.

Si vous avez déjà fait un `cat /proc/net/wireless` vous saurez que, bien que la sortie soit simple et utile, quelqu'un a décidé qu'un en-tête de 2 lignes était une excellente idée. Ce n'était pas le cas.

```bash
ubuntu@pine64:~$ cat /proc/net/wireless
Inter-| sta-| Quality | Discarded packets | Missed | WE
 face | tus | link level noise | nwid crypt frag retry misc | beacon | 22
 wlan0: 0000 0. -256. -256. 0 0 0 0 0 0
 wlan1: 0000 42. -73. -256. 0 0 0 0 0 0
ubuntu@pine64:~$
```

Je veux dire, ça a l'air sympa et tout ça, mais ce n'était vraiment pas censé être facilement analysé en quelque chose de significatif. Quoi qu'il en soit, puisque je me lançais dans l'écriture d'un autre plugin Telegraf, l'analyser était exactement ce que j'allais devoir faire. C'est le spaghetti que j'ai dû écrire pour analyser cet en-tête et le rassembler en quelque chose qui serait significatif à stocker dans InfluxDB:x

```go
func loadWirelessTable(table []byte, dumpZeros bool) (map[string]interface{}, map[string]string, error) {
	metrics := map[string]interface{}{}
	tags := map[string]string{}
	myLines := strings.Split(string(table), "\n")
	for x := 0; x < len(myLines)-1; x++ {
		f := strings.SplitN(myLines[x], ":", 2)
		f[0] = strings.Trim(f[0], " ")
		f[1] = strings.Trim(f[1], " ")
		if f[0] == "BSSID" {
			tags[strings.Replace(strings.Trim(f[0], " "), " ", "_", -1)] = strings.Replace(strings.Trim(string(f[1]), " "), " ", "_", -1)
			continue
		}
		n, err := strconv.ParseInt(strings.Trim(f[1], " "), 10, 64)
		if err != nil {
			tags[strings.Replace(strings.Trim(f[0], " "), " ", "_", -1)] = strings.Replace(strings.Trim(f[1], " "), " ", "_", -1)
			continue
		}
		if n == 0 {
			if dumpZeros {
				continue
			}
		}
		metrics[strings.Trim(f[0], " ")] = n

	}
	tags["interface"] = "airport"
	return metrics, tags, nil

}
```

Tout ça pour qu'on puisse voir ça :

![Données Chronograf](images/Google-ChromeScreenSnapz002.png)

dans Chronograf! Bon! Remarquez comment j'ai transformé l'en-tête multiligne en valeurs distinctes pour 'quality_level' etc. et les ai rendues compatibles avec InfluxDB en remplaçant les espaces par des traits de soulignement, etc. Donc, puisque j'utilise la dernière version de Chronograf :

![Jauge Chronographe](images/Google-ChromeScreenSnapz001.png)
Google ChromeScreenSnapz001

J'ai une jauge bien pratique avec le RSSI de mon interface sans fil active ! Bien sûr, puisque ce nouveau plugin (qui arrivera à un moment donné dans une version de Telegraf !) repose sur /proc/net/wireless, il ne fonctionnera que pour Linux.

Mais attendez, je n'ai pas oublié tous les utilisateurs de Mac. Après une bonne quantité de google-fu, j'ai trouvé un moyen à peu près similaire d'obtenir des informations sans fil à partir de Mac OS. C'est enterré et difficilement accessible mais je l'ai déterré pour vous. Il formate la sortie de manière beaucoup plus raisonnable, ce qui facilite l'accès à InfluxDB :

```bash
$ /System/Library/PrivateFrameworks/Apple80211.framework/Versions/Current/Resources/airport -I
     agrCtlRSSI: -63
     agrExtRSSI: 0
    agrCtlNoise: -95
    agrExtNoise: 0
          state: running
        op mode: station
     lastTxRate: 65
        maxRate: 72
lastAssocStatus: 0
    802.11 auth: open
      link auth: wpa2-psk
          BSSID: 36:c3:d2:e3:ed:8e
           SSID: Influx-IoT2
            MCS: 7
        channel: 3
$
```

qui réduit considérablement le code pour le rendre utile :

```go
func loadWirelessTable(table []byte, dumpZeros bool) (map[string]interface{}, map[string]string, error) {
	metrics := map[string]interface{}{}
	tags := map[string]string{}
	myLines := strings.Split(string(table), "\n")
	for x := 0; x < len(myLines)-1; x++ {
		f := strings.SplitN(myLines[x], ":", 2)
		f[0] = strings.Trim(f[0], " ")
		f[1] = strings.Trim(f[1], " ")
		if f[0] == "BSSID" {
			tags[strings.Replace(strings.Trim(f[0], " "), " ", "_", -1)] = strings.Replace(strings.Trim(string(f[1]), " "), " ", "_", -1)
			continue
		}
		n, err := strconv.ParseInt(strings.Trim(f[1], " "), 10, 64)
		if err != nil {
			tags[strings.Replace(strings.Trim(f[0], " "), " ", "_", -1)] = strings.Replace(strings.Trim(f[1], " "), " ", "_", -1)
			continue
		}
		if n == 0 {
			if dumpZeros {
				continue
			}
		}
		metrics[strings.Trim(f[0], " ")] = n

	}
	tags["interface"] = "airport"
	return metrics, tags, nil

}
```

beaucoup plus raisonnable, vous ne trouvez pas ? Il transforme toutes ces lectures en belles balises et champs :

![Données Chronograf](images/Google-ChromeScreenSnapz004.png)

Et me donne une jauge similaire sur mon Mac :

![Jauge Chronographe](images/Google-ChromeScreenSnapz003.png)

Plutôt chouette !

Maintenant, vous vous demandez probablement pourquoi je me suis donné tant de mal juste pour pouvoir surveiller le RSSI d'une interface sans fil. Et c'est une excellente question ! Vous voyez, dans le monde de l'IoT, vous allez avoir des passerelles qui collecteront des données via des interfaces sans fil - vous savez, pour se connecter avec des capteurs sans fil. Il est donc important de pouvoir surveiller la santé et l'activité de ces interfaces sans fil. J'ai ajouté le Mac juste parce que c'était facile et que je le voulais.

Alors restez à l'écoute. J'ajouterai un certain nombre d'articles de blog sur les capteurs que je connecte à ce collecteur de données de passerelle sans fil. Cela fait en fait partie d'un projet plus vaste de construction d'une plate-forme de démonstration IoT plus grande et plus axée sur l'industrie.

> **Remarque :** Pendant que ma demande d'extraction attendait d'être évaluée, quelqu'un a décidé de voler mon code pour le plugin de surveillance sans fil Linux et de le soumettre en tant que PR séparé. Ce PR a été accepté et fusionné avec Telegraf. Donc, si vous utilisez Telegraf 1.3.0 ou une version ultérieure, vous pouvez utiliser le plug-in "sans fil" pour surveiller vos interfaces sans fil, sachez simplement comment il est arrivé là.

> **Remarque 2 :** On m'a posé des questions sur le code du plug-in de surveillance sans fil Mac. Il a langui en tant que PR à Telegraf pendant * 4 ans * sans même être regardé. Au printemps 2022, ils se sont finalement mis à l'évaluer. J'ai travaillé avec les responsables pendant environ 2 mois alors qu'ils demandaient des changements mineurs, puis des changements majeurs, puis changeaient d'avis à plusieurs reprises sur les changements majeurs jusqu'à ce que j'abandonne finalement. Quand ma patience avec eux reviendra, je pourrais réessayer.
