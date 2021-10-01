---
title: "Écrire à InfluxDB 2.0 à partir Arduino ESP8266"
Date: 2019-03-22
Author: davidgs
Category: IoT
Tags: Arduino, ESP8266, IoT, IoT Data
Slug: writing-to-influxdb-2-0-from-arduino-esp8266
hero: images/3686-10.jpg
reading_time: 3 minutes
---

Comme InfluxData se rapproche toujours plus de libérer v2.0, il devient de plus en plus important d'être en mesure d'obtenir des données ** dans ** InfluxDBv2, bien sûr. Fait sens, non? Étant donné que la grande majorité (comme, impossibles à distinguer de 100%) de mes données provient des appareils IdO, j'ai décidé qu'il était temps de commencer à faire de ces appareils v2 capable.

Je suis heureux de dire que la première étape dans cette direction est maintenant terminée! Un de mes préférés capteurs est un capteur de matières particulaires qui mesure la quantité de particules ** très faible ** dans l'air (de 2,5 pM à 100 microns de diamètre). Ce genre de choses, il se trouve, est vraiment * vraiment * mauvais pour vous, en sachant combien est dans l'air est une bonne idée. À cette fin, j'ai commandé un de ces capteurs de Adafriut:

![3686 10](/posts/category/database/images/3686-10.jpg )

Il est petit et facile à accrocher à quoi que ce soit à peu près, car il vomit juste des données via UART. Depuis que je suis une énorme pile de ESP8266 planches qui traînent (je commander généralement les par dizaines, car ils sont si pas cher et facile à traiter), j'accroché il à l'un de ceux-ci. Le code est simple, grâce à Adafruit fournir, et il y avait une poignée bibliothèque InfluxDB aux données d'écriture avec, mais il ne soutenu InfluxDB v1.x. La première chose que je l'ai fait (parce que j'étais pressé) était de saisir la bibliothèque 1.x et juste récrire pour 2.x. Ça m'a pris environ 1/2 heure ou moins, et il a très bien fonctionné! (Vous pouvez utiliser cette version [ici](https://github.com/davidgs/ESP8266_Influx_DB_V2) si vous le souhaitez). C'était vraiment pas le * droit * solution bien. Revenons donc aujourd'hui, je suis allé et créé une fourchette appropriée du) si vous le souhaitez). C'était vraiment pas le * droit * solution bien. Revenons donc aujourd'hui, je suis allé et créé une fourchette appropriée du [référentiel d'origine](https://github.com/tobiasschuerg/ESP8266_Influx_DB), et sa mise à jour pour prendre en charge 2.x version 1.x ou version de InfluxDB. Je suis bien sûr présenté un bon Pull Demande à la bibliothèque d'origine et l'espoir qu'il sera accepté / fusionné bientôt.

Parcourons ce qu'il faut pour utiliser cette nouvelle bibliothèque alors. Il est mort simple, vraiment. Au moins avec Arduino, tout ce que vous devez faire est d'ajouter la bibliothèque, puis l'inclure dans votre croquis:

```cpp
#include <InfluxDb.h>
//#include <InfluxDataV2.h> // if you want to use the other library I built and that’s in my GitHub 
#define INFLUXDB_HOST “myhost.com"
Influxdb influx(INFLUXDB_HOST);
```

Cela vous permet de démarrer. Ensuite, vous allez avoir besoin de quelques informations spécifiques de votre v2.0 InfluxDB (alpha encore!) D'installation. En particulier, vous aurez besoin du `organisme`,` bucket` et `token` qui sont associés à votre compte. Vous pouvez trouver en pointant votre navigateur Web sur votre serveur InfluxDB, le port 9999, en entrant votre nom d'utilisateur et mot de passe, et aller à la page de configuration:

![Screen Shot 2019 03 22 à 1 26 56 PM](/posts/category/database/images/Screen-Shot-2019-03-22-at-1.26.56-PM.png)

Vous pouvez ensuite les entrer dans le croquis Arduino:

```cpp
influx.setBucket(“myBucket");
influx.setVersion(2);
influx.setOrg(“myOrg");
influx.setPort(9999);
influx.setToken(“myToken");
```

Une fois que vous avez fait cela, dans votre fonction `setup ()`, vous pouvez commencer à écrire des données à votre v2.0 serveur Afflux!

```cpp
void loop() {
  loopCount++;
  InfluxData row("temperature");
  row.addTag("device", "alpha");
  row.addTag("sensor", "one");
  row.addTag("mode", "pwm");
  row.addValue("loopCount", loopCount);
  row.addValue("value", random(10, 40));
  influx.write(row);
  delay(5000);
}
```

Voir? Je vous ai dit qu'il était facile!
