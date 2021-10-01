---
title: « Toute cette chose empeste! »
Date: 2020-03-11
Author: davidgs
Category: Gadgetry, IoT
Tags: InfluxData, InfluxDB, IoT, Poop Detector
Slug: this-whole-thing-stinks
hero: images/singing-poop-emoji-sm.png
reading_time: 15 minutes
---

## Tout d'abord, ne demandez pas

Je ne sais pas où vient cette idée, il vient de se passer. Je continue à dire: « Je ne suis pas particulièrement fier de ce » mais en réalité? Je sorte de matin parce qu'il est drôle de merde (jeu de mots). Certains projets sont venus sur mon flux Twitter qui inclus (je te chie pas) un modèle imprimable 3-D du 💩 emoji. Je me rappelle rien d'autre à propos de ce projet, mais vous feriez mieux de croire que je suis allé tout droit vers ce fichier STL!

![Chanter emoji merde](/posts/category/iot/images/singing-poop-emoji.jpg "singing-poop-emoji.jpg")

Il est alors assis purulente pendant quelques semaines (si vous n'êtes pas à l'aise avec beaucoup de blagues de merde, bail maintenant. Un avertissement.). Je savais que je * * serait faire quelque chose avec elle, je ne savais pas ce que * * Je ferais. Et ensuite ça m'a frappé. J'ai eu un tas de capteurs de gaz se trouvant autour (si cela vous surprend, vous ne me connaissez vraiment pas du tout). Et ensuite ça m'a frappé! Un capteur puante salle de bain et d'un système d'alerte !! Mais ma merde ne pue pas (tais-toi!) Donc où le déployer? numéro moment Eureka 2! Nos meilleures maison d'amis, où tous les événements sont toujours détenus, a ce que nous tous les appels « Le travail Hardest Salle de bain à Holly Springs ». Il y a régulièrement 20 personnes là-bas pour le dîner, ou un autre événement, et cette petite salle d'eau prend tout le poids de tout cela.

## Entrez le détecteur Stink

La première chose était de 3-D imprimer la petite merde. Pour vous assurer que je pouvais adapter à la bonne LED pour en faire éclairer la façon dont je veux. Et non, vous ne pouvez pas faire quoi que ce soit la lumière en brun. Si vous êtes * vraiment * intéressés à savoir pourquoi vous ne pouvez pas faire brun clair, vous pouvez aller voir [cette vidéo](https://youtu.be/wh4aWZRtTwU), mais le mec est bien plus étrange que je suis. Encore une fois, un avertissement équitable. De toute façon, j'ai imprimé, et voilà, le contrôleur LED je voulais utiliser en forme (presque) parfaitement! Je devais couper quelques coins hors du PCB, mais pas de mal a été fait, et je suis une merde light-up emoji!

![Un illuminé Emoji Merde d'orange](/posts/category/iot/images/IMG_0087.jpeg)

J'ai aussi mis à l'échelle à 150% et je considérant l'impression de cette façon simplement parce que, eh bien, vous savez, plus la merde est meilleure merde! Alors, comment ai-je allumer cette place merde? En fait, tout simplement. J'achète ces Wemos D1 Mini cartes en vrac (comme 20 à la fois, car ils sont seulement 2,00 $ chacun - plus cher si vous les achetez sur Amazon, mais si vous les achetez d'Ali express en Chine, ils peuvent être aussi pas cher comme 1,50 $) et j'acheter des boucliers assortis LED tricolores pour aller avec eux. Mes amis [Andy Stanford-Clark](https://twitter.com/andysc) m'a commencé sur ces choses avec ses Glow Orbes » Si vous voulez en savoir plus sur les spécificités de Glow Orbes,) m'a commencé sur ces choses avec ses Glow Orbes » Si vous voulez en savoir plus sur les spécificités de Glow Orbes, [Dr Lucy Rogers](https://twitter.com/DrLucyRogers) a écrit une chose tout à leur sujet) a écrit une chose tout à leur sujet [ici](https://www.ibm.com/blogs/internet-of-things/creating-home-glow-orb/). Turns à elle construit un je n'avais pas Fart-O-Meter et utilisé un GlowOrb aussi bien. idée que Andy m'a dit.

Pour une mise en route tutoriel sur le Wemos D1, voir [cet article](https://www.hackster.io/innovativetom/wemos-d1-mini-esp8266-getting-started-guide-with-arduino-727098). Je sais que beaucoup de gens rédiger complets, des tutoriels détaillés, etc. pour ce genre de choses, mais, franchement, je suis trop paresseux pour que je plupart du temps juste vous dire ce que je l'ai fait. Je vais vous donner les détails sordides où il importe.

De toute façon, depuis que je fais cette merde tout le temps, j'ai ma merde lumière écouter un courtier MQTT pour les messages sur la couleur à l'affichage. Je travaille toujours sur les niveaux de couleur détaillées que j'étalonne les choses. Je vais couvrir les détails de la façon dont les messages sont envoyés et reçus dans un peu.

Le détecteur de pue lui-même est également exécuté sur un Mini Wemos D1 avec un capteur de méthane MQ-4 qui également des mesures soi-disant H2 et un SGP-30 Capteur qualité de l'air qui mesure volatils des produits chimiques organiques (__gVirt_NP_NNS_NNPS>__ COV) et une version vraiment merdique de CO2 qui devrait jamais confiance. Je l'ai fait beaucoup de travail avec des capteurs de CO2, et ces capteurs eco2 ne valent pas une merde. Sérieusement, ne jamais leur faire confiance. J'attends livraison un peu plus, de meilleurs capteurs de gaz comme un MQ-136 capteur de dioxyde de soufre et d'autres. Je vais les déployer probablement tous, puis invente un algorithme compliqué, mais tout à fait arbitraire pour décider ce qui est « nauséabond ». Restez à l'écoute pour cela.

## Construction du capteur Stink

Comme je l'ai dit, je suis actuellement en utilisant un Wemos D1 Mini avec un [MQ-4 méthane Capteur](https://www.sparkfun.com/products/9404) et un) et un [SGP-30](https://www.adafruit.com/product/3709) du capteur de qualité de l'air. Vous pouvez les acheter vous-même si vous envisagez de construire cette chose. Je mettrai à jour ce avec d'autres capteurs que je les ajoute, peut-être. Voici comment tout câbler:

![Schéma du circuit du capteur Wemos D1 et du gaz](/posts/category/iot/images/Stinker.png)

Il est important de noter que le MQ-4 exige 5v alors que le SGP-30 a besoin que 3.3v. Le MQ-4 est un capteur analogique linéaire, de sorte que le câblage à l'une des entrées analogiques fonctionne très bien. Le SGP-30 est un capteur I2C, il est donc SDA câblé >-> D1 et SCL >-> D2 qui sont les broches I2C par défaut sur le Wemos (que je dois regarder à chaque fois). Lorsque vous appliquez 5v via USB MQ-4 obtient 5v droite et le SGP-30 obtient 3.3V via le régulateur de tension à bord. Maintenant, comment obtenez-vous réellement des données hors de ces capteurs? Eh bien, c'est la prochaine étape, bien sûr!

## Lecture Stink

Le SGP-30 dispose d'une bibliothèque pour elle fournie par Adafruit (bien sûr) vous aurez donc besoin d'ajouter cette bibliothèque à votre IDE Arduino et l'inclure dans votre projet.

```cpp
#include <Adafruit_SGP30.h>
#include<Wire.h>
```

Vous allez ensuite créer et objet SGP30 et l'initialiser dans votre routine d'installation:

```cpp
Adafruit_SGP30 sgp;
```

Crée l'objet puis:

```cpp
if(! sgp.begin()){
  Serial.println("Sensor not found :(");
    while(1);
}
```

initialise le capteur. Si vous n'êtes pas correctement câblé le capteur, le tout se bloque, alors assurez-vous que vous avez correctement la transmettait!

La lecture de la teneur en COV est assez simple après:

```cpp
if(! sgp.IAQmeasure()) {
  Serial.println("Measurement failed")
  return;
}
Serial.print("TVOC ");
Serial.print(sgp.TVOC);
Serial.print(" 	");
Serial.print("Raw H2 ");
Serial.print(sgp.rawH2);
Serial.print(" 	");
Serial.print("Raw Ethanol ");
Serial.print(sgp.rawEthanol);
Serial.println("")
```

L'objet PMF est retourné avec toutes les lectures, donc il est assez facile. Le capteur MQ-4 est un peu plus délicat. Il est un capteur analogique, ce qui signifie qu'il revient vraiment juste une lecture de tension brute, qui échelles (un peu) avec la concentration de gaz. Heureusement pour moi, quelqu'un a fourni une fonction agréable pour transformer la tension brute en ppm (parties par million) pour la lecture du méthane, de sorte que ce qui est requis ainsi:

```cpp
int NG_ppm(double rawValue)
double ppm = 10.938*exp(1.7742*(rawValue*3.3/4095));
return ppm;
```

Ouais, maths. Je ne sais pas comment cela fonctionne, mais il semble, donc je vais avec elle parce que je suis merdique en maths et ont à quelqu'un de confiance plus intelligent que moi (ce qui est la plupart des gens, franchement). Alors maintenant, je peux lire la tension brute sur la broche analogique, puis le convertir en une lecture de ppm, ce qui est ce que nous voulons vraiment.

```cpp
int sensorValue = analogRead(A0); // read analog input pin 0]{style="color: #8e8e8e;"}
int ppm = NG_ppm(sensorValue);
```

Frais! Donc, maintenant que nous pouvons lire les niveaux de gaz comment pouvons-nous lier tout cela?

## Ne pas utiliser une base de données Shitty!

De cours I pour une entreprise de base de données, donc nous allons utiliser celui-là. En fait, même si je ne l'ai pas travailler pour cette entreprise en particulier la base de données, je l'utilise encore parce que, pour les données IdO comme ça, il est vraiment la meilleure solution. Nous vous enverrons toutes nos données à InfluxDB et nous pouvons voir comment alerter la merde éclatante aux couleurs de changement. Alors, comment pouvons-nous envoyer des données à InfluxDB? Il est super simple. Nous utilisons la bibliothèque InfluxDB pour Arduino, bien sûr!

```cpp
#include <InfluxDb.h>
#define INFLUXDB_HOST "yourhost.com"
#define INFLUX_TOKEN "yourLongTokenStringForInfluxDB2"
#define BATCH_SIZE] 10
Influxdb influx(INFLUXDB_HOST);
```

Deux ou trois choses à noter ici. J'utilise InfluxDB 2.0, ce qui est la raison pour laquelle j'ai besoin du jeton. J'ai défini un batch_size parce que l'écriture des données est beaucoup plus efficace si nous le faisons par lots plutôt que individuellement. Pourquoi? Eh bien, je suis heureux que vous ayez demandé! Chaque écriture à la base de données se produit via le protocole HTTP. Alors, quand vous voulez faire, vous devez configurer la connexion, écrire les données, puis relancer la connexion. Faire cela chaque seconde ou est coûteuse, du point de vue de la puissance et du processeur. Il est donc préférable de sauver un tas de points de données, puis faire le cycle configuration d'envoi d'teardown une fois pour tout cela.

Nous avons donc maintenant un objet Influxdb initialisé avec l'adresse du serveur correcte. Dans la fonction setup (), nous devons compléter la configuration:

```cpp
influx.setBucket("myBucket"]);
influx.setVersion(2);
influx.setOrg("MyOrg");
influx.setPort(9999);
influx.setToken(INFLUX_TOKEN);
```

C'est littéralement. Je suis tout mis en place pour commencer à écrire des données à InfluxDB, donc nous allons voir comment je fais ça:

```cpp
if(batchCount >= BATCH_SIZE) {
  influx.write();
  Serial.println("Wrote to InfluxDB");
  batchCount = 0;
}
InfluxData row("bathroom");
row.addTag("location ", "hsbath");
row.addTag("sensor1", "sgp30");
row.addTag("sensor2", "mq-4");
row.addValue("tvoc", sgp.TVOC);
row.addValue("raw_h2", sgp.rawH2);
row.addValue(["ethanol", sgp.rawEthanol);
row.addValue("methane", ppm);
influx.prepare(row);
batchCount +=1;
delay(500);
```

Dans la première partie, je vérifie pour voir si je suis à ma limite de lot et si je suis, j'écris tout le gâchis à la base de données, et réinitialiser mon compteur. Après cela, je crée une nouvelle ligne pour la base de données et ajouter les balises et les valeurs à elle. Ensuite, je « préparer » la ligne où il ajoute vraiment juste à la file d'attente à écrire avec le lot suivant. Augmenter le nombre de lots, et se reposer tranquillement pendant 500 ms (½ seconde). Ensuite, nous faisons à nouveau la chose.

Allons à la base de données et voir si je l'ai tout travail:

![Capture d'écran d'un tableau de bord Afflux Chronograf](/posts/category/iot/images/Screen-Shot-2020-03-11-at-2.55.28-PM.png )

Je dirais que c'est oui! Maintenant que tout est là, il est temps d'envoyer des mises à jour à la merde éclatante!

Pour cela, nous allons créer une tâche dans InfluxDB 2.0. Et je vais l'appeler « caca » parce que même je ne veux pas une tâche appelée « merde » dans mon interface utilisateur.

![Chronograf Dashboard Element](/posts/category/iot/images/Screen-Shot-2020-03-11-at-2.57.12-PM.png)

Et voici la tâche que je créé:

```js
import "experimental/mqtt"

option task = {name: "poop", every: 30s}

from( bucket:  "telegraf" )
  |> range(start: task.every)
  |> filter(fn: (r()=> (r._measurement == "bathroom")))
  |> filter(fn: (r()=>(r._field == "tvoc")))
  |> last()
  |> mqttto(broker: "tcp://yourmqttbroker.com:8883", topic: "poop", clientid: "poop-flux", valueColumns: ["_value"])
```

Comme il y a beaucoup de choses là-bas, je vais passer par tout cela. Tout d'abord, le paquet MQTT je l'ai écrit est encore dans le paquet « expérimental », de sorte que vous devez importer que pour l'utiliser. Si vous regardez ci-dessus dans l'image de l'explorateur de données, vous pouvez voir que je suis stocker tout dans mon seau de « Telegraf », et la mesure « salle de bain ». En ce moment, je suis saisie que hors de la lecture « TVOC ». Une fois que je change, je vais mettre à jour cette tâche avec la formule que je l'utilise. Je suis juste saisir la dernière lecture au cours des 30 dernières secondes. Je puis remplir les détails pour le courtier MQTT J'utilise, et le sujet de se soumettre, et c'est parti! Qu'il est à la tâche!

## Lighting Shit Up!

Donc, comme vous le savez, nous avons mis un WEMOS D1 mini avec une LED tricolore sur elle dans la merde imprimée. Maintenant, il est temps de lumière cette merde! Puisque nous les valeurs d'écriture sur un courtier MQTT, tout ce que nous devons vraiment faire est de connecter que WEMOS au courtier MQTT, qui, heureusement, est vraiment simple.

Vous avez besoin d'un tas de trucs WiFi (vous devez également cela dans le code du capteur, par la voie):

```cpp
#include <ESP8266WiFi.h>
#include <DNSServer.h>
#include <ESP8266WebServer.h>
#include <WiFiManager.h>
#include <PubSubClient.h>
#include <Adafruit_NeoPixel.h>
#include <ESP8266mDNS.h>
#include <WiFiUdp.h>

#define LED_PIN D2  //D2
#define LED_COUNT 1
// update this with the Broker address ]{style="color: #8e8e8e;"}
#define BROKER "mybroker.com"
// update this with the Client ID in the format d:{org_id}:{device_type}:{device_id}]{style="color: #8e8e8e;"}
#define CLIENTID "poop-orb"
#define COMMAND_TOPIC "poop"

int status = WL_IDLE_STATUS; // the Wifi radio's status
WiFiClient espClient;
PubSubClient client(espClient);
```

Certains d'entre eux sont des choses qui correspondent aussi à des choses dans votre InfluxDB tâche, comme le COMMAND_TOPIC et le COURTIER. alors assurez-vous les corriger entre les deux. C'est tout ce que vous devez avoir défini (je ne vais pas à la façon d'obtenir la configuration WiFi et configuré comme il y a des centaines de tutoriels sur le faire pour Arduino et ESP8266 périphériques.).

Dans votre fonction setup (), vous devrez configurer votre objet MQTT client (PubSubClient) et abonnez-vous à votre sujet ainsi que configurer votre LED. J'utilise la bibliothèque Adafruit NeoPixel car il est super facile à utiliser.

```cpp
client.setServer(BROKER, 8883);
client.setCallback(callback);
client.subscribe(COMMAND_TOPIC);

Adafruit_NeoPixel] pixel = Adafruit_NeoPixel(1, 4); // one pixels, on pin 4
//pin 4 is "D2" on the WeMoS D1 mini]{style="color: #8e8e8e;"}
```

Votre boucle principale est assez courte pour cela, comme PubSubClient gère beaucoup de temps pour vous:

```cpp
void loop() {
  if(!client.connected()) {
    reconnect();
  }
  // service the MQTT client]{style="color: #8e8e8e;"}
  client.loop();
}
```

Vous, bien sûr, besoin de la routine de rappel, ce qui est où la magie se produit, alors regardons maintenant.

```cpp
void callback(char* topic, byte* payload, unsigned int length) {
  char content[10];
  String s = String((char *)payload);
  s.trim();
  Serial.print("Message arrived on ");
  Serial.print(COMMAND_TOPIC);
  Serial.print(": ");

  unsigned char buff[256] ;
  s.getBytes(buff, 256);
  buff[255 = '\0';
  s = s.substring(s.indexOf("=") + 1, s.lastIndexOf(" "));
  s.trim();
  int c = s.toInt();
  String col ="";
  if(c > 100.0) {
    col ="ff0000";
  } else if(c > 90.0) {
    col = "ff4000";]
  } else if(c > 80.0]){
    col = "ffbf00";
  } else if(c >70.0) {
    col = "bfff00";
  } else if(c > 60.0) {
    col = "40ff00";
  else if(c > 50.0) {
    col ="00ff40";
  } else if(c > 40.0) {
    col ="00ffbf";
  } else if(c > 10.0) {
    col = "00bfff";
  } else {
    col ="bf00ff";
  }

  long long number = strtoll(&col 0, NULL, 16);
  int r = number >> 16;
  int g = number >>8 & 0xFF;
  int b = number & 0xFF;
  uint32_t pCol = pixel.Color(r, g, b);
  colorWipe(pCol, 100);
}
```

Oui, il est au goût de noisette. La plupart du temps parce que j'utilise ce même code dans un tas d'endroits différents. Parfois, je veux la couleur hexagonale, parfois, je veux la couleur RVB, donc je peux aller de toute façon ici. Il a l'air merdique, mais ça marche pour moi. Tout cela ne fait passer le message du courtier MQTT, et tirez la valeur numérique (par l'expérience, je sais que le message MQTT est dans le format suivant:

```
bathroom _value=566 1583959496007304541
```

Donc, je sais que je peux les indexer le signe `=` et `` (espace) et de revenir à la valeur numérique. De là, il est juste la mise à l'échelle de la valeur à la couleur et allumer la LED! Après cela, la merde s'allume lorsque vous merde! Et les changements de couleur en fonction de la façon dont il est puant. La valeur de COV est pas vraiment une très bonne valeur (surtout si vous avez tendance à utiliser une sorte de merde-pulvérisation pour cacher votre mauvaise action. La plupart de ceux ne sont que des COV et qui spike les chiffres, qui est pourquoi je » m en attendant les nouveaux capteurs pour que je puisse obtenir beaucoup de valeurs de gaz et de voir que l'on est le plus représentatif de pue. Ou ceux qui, avec plus de précision. Après que je viendrai avec un algorithme à l'échelle correctement le niveau puante basé sur les différents les niveaux de gaz. Déployez ensuite à la salle de bain Hardest travail à Holly Springs.

Et oui, ils sont jeu pour avoir la pue-o-mètre déployé là-bas.

## Obtenez votre propre merde

Donc, si vous voulez construire un vous-même ... D'abord, vous aurez besoin d'imprimer votre propre merde. Vous pouvez télécharger le fichier STL [ici](https://davidgs.com/poop.stl). Je vais voir si je peux nettoyer tout ce code et de le mettre dans mon). Je vais voir si je peux nettoyer tout ce code et de le mettre dans mon [GitHub](https://github.com/davidgs). Ne hésitez pas à). Ne hésitez pas à [Suivez-moi](https://twitter.com/intent/follow?screen_name=davidgsIoT) sur Twitter et atteindre avec des questions ou des commentaires!

Un dernier mot, s'il vous plaît, pour l'amour de tout ce qui est saint, lavez-vous les mains damnés. 60% des hommes et 40% des femmes ne se lavent pas les mains après avoir utilisé les toilettes et est dégoûtant. Et maintenant, il vous fait un vecteur de la maladie. Alors ** Wash. Ton. Mains!**
