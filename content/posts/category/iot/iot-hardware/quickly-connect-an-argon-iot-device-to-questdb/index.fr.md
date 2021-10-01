---
title: « Rapidement Connecter un appareil Argon IdO QuestDB »
Date: 2020-09-08
Author: davidgs
Category: database, Gadgetry, IoT
Tags: IoT, Particle, QuestDB, TSDB
Slug: quickly-connect-an-argon-iot-device-to-questdb
hero: images/rawPower.svg
reading_time: 10 minutes
---

Je suis de retour à [Particle.io](https://particle.io) à nouveau. J'ai vu qu'ils avaient 30% de vente sur le nouveau Argon et des kits de développement, donc je devais sauter dessus, puisque je ne l'ai pas obtenu tout nouveau matériel de particules dans les années. Donc, ce qui suit est un guide complet pour connecter un de ces kits à) à nouveau. J'ai vu qu'ils avaient 30% de vente sur le nouveau Argon et des kits de développement, donc je devais sauter dessus, puisque je ne l'ai pas obtenu tout nouveau matériel de particules dans les années. Donc, ce qui suit est un guide complet pour connecter un de ces kits à [QuestDB](https://questdb.io) afin de stocker les données, et puis la construction d'un tableau de bord sur le dessus de celui-ci avec Grafana. Attachez vos ceintures!

## Le matériel

Tout d'abord, j'ai vu 30% de réduction sur les Argon devkits (vous maudissent twitter annonces!) Donc j'acheté un des [Argon qualité de l'air Kits de surveillance](https://store.particle.io/collections/prototyping-hardware/products/air-quality-monitoring-kit-wi-fi). Vous savez tous que j'aime surveiller la qualité de l'air! Il est un kit vraiment facile à monter car il n'y a pas de fils à souder ou quoi que ce soit. Tous les capteurs sont reliés au moyen d'un bouclier Grove il est plug-and-play vraiment juste.

## La mise en place

Je ne vais pas passer par tout étape par étape, car il y a un [excellent tutoriel](https://docs.particle.io/quickstart/aqmk-project/) disponible déjà que vous obtiendrez environ 95% de la manière là. Ce tutoriel va obtenir votre kit tous mis ensemble et tout le code écrit pour commencer à envoyer vos données à la particule Cloud. Je l'ai fait faire quelques modifications au code, que je vais passer. Tout d'abord, leurs utilisations tutoriel ** int ** s pour toutes les données provenant du capteur hors BME280. Après avoir travaillé avec ces petites choses depuis très longtemps, je sais qu'ils peuvent fournir plus de précision, alors je les ai changé tout `` flotteurs ** **.

```cpp
float temp, pressure, humidity;
```

Cela signifie que vous devez aller changer les signatures pour un tas de fonctions pour prendre `` flotteur ** ** plutôt que `` int ** ** alors assurez-vous que vous obtenez tout ce que fait (je posterai le code complet , y compris tous mes changements, à la fin.

L'autre changement que je fait était d'envoyer zéro des valeurs pour les lectures de capteurs qui n'a pas eu lieu. Le capteur de poussière serait spécifiquement tout simplement laisser les valeurs si elles ne sont pas rationnels, et donc je l'ai changé d'envoyer des zéros dans les cas afin de maintenir la base de données cohérente et ne pas avoir un tas de valeurs nulles là-dedans.

## La partie Nuage

Lorsque vous envoyez des données vers le Cloud des particules, arrive peu après. Il est pas stocké ou envoyé nulle part tant que vous configurez un endroit pour l'envoyer pour le stockage et l'analyse. Il y a quelques endroits pré-configurés pour envoyer vos données, mais le plus facile à utiliser est le cadre Wbhook fourni. Cela vous permet de construire un message et l'envoyer à un arbitraire point final http chaque fois qu'un nouveau message arrive.

Bien sûr, je l'ai fait écrire un tutoriel complet sur ce point, et il fait maintenant partie des [docs Particle.io](https://docs.particle.io/tutorials/integrations/questdb/). Dans ce tutoriel, j'utilisais encore les valeurs `int` de la BME280 parce que je ne voulais pas les gens de semer la confusion et de la cohérence avec les autres documents de particules.

## La partie de base de données

Nous allons avoir besoin d'une instance d'une base de données QuestDB, bien sûr. Cette instance ne peut pas être en cours d'exécution sur votre ordinateur portable, etc., sauf si vous avez un moyen d'accéder à votre ordinateur portable à partir de l'Internet ouvert. (Indice: Ce n'est généralement pas une bonne idée.)

Vous pouvez faire tourner un océan numérique Droplet, ou un petit AWS linux par exemple, ou tout ce que vous voulez pour vous procurer une version accessible de QuestDB en cours d'exécution.

Une fois que vous avez, vous pouvez aller à la console QuestDB à `http: //<your server address> : 9000 / `et créer le tableau suivant:

```sql
CREATE TABLE ArgonAir (
  deviceID SYMBOL,
  temperature DOUBLE,
  humidity DOUBLE,
  Pressure DOUBLE,
  AirQuality SYMBOL,
  dustLpo DOUBLE,
  dustRatio DOUBLE,
  dustConc DOUBLE,
  ts timestamp
) timestamp(ts);
```

Cela va créer la structure de table appropriée pour votre appareil. Quelques choses à noter: QuestDB est beaucoup plus rapide si vous utilisez le `SYMBOL` type de données à la place du` CHAINE` type de données, ce qui est la raison pour laquelle vous voyez ci-dessus. En outre, les TIMESTAMP (ts) `partie favorise le champ` être un admissible TS timestamp désigné, que vous voulez pour faire des calculs de séries chronologiques sur vos données.

Vous pouvez ensuite rafraîchir vos tableaux voir dans la console, et vous devriez voir votre table aménagé:

![Table layout of the database](/posts/category/iot/iot-hardware/images/Screen-Shot-2020-09-08-at-2.03.20-PM.png)

Une fois que vous avez votre table, il est une question d'obtenir des données en elle. Vous remarquerez que, alors que le code de particules sur l'appareil utilise des champs comme « qualité de l'air » J'ai enlevé les traits d'union de ces noms. La base de données qui aime mieux.

Allez à l'onglet Intégrations de votre [Console de particules](https://console.particle.io/) et cliquez sur Nouvelle intégration, puis cliquez sur le crochet Web

![The 'New Webhook' Panel in the Particle Console](/posts/category/iot/iot-hardware/quickly-connect-an-argon-iot-device-to-questdb/images/particleNewWebhook.png)

Une fois là-bas, nous allons remplir le formulaire. Selon le tutoriel, notre événement est appelé `env-vals`, entrez donc que sous ** Nom de l'événement **.

Sous ** URL ** entrez l'adresse de votre serveur QuestDB `http: my.server.com: 9000` ou partout où votre serveur est situé.

Ensuite, changer le ** Type de demande ** à `GET` et le ** Format de la demande ** à la requête` Parameters`

Maintenant, pour la partie la plus délicate: Les paramètres de requête réels. Tout d'abord, sélectionnez ** personnalisée ** au lieu de défaut ** **, et dans la première zone, entrez `Content-Type` dans la case suivante sur la même ligne, entrez` text / plain` Cliquez ensuite sur le ** + bouton Ajouter ** Row.

Dans la nouvelle ligne, entrez `query` dans la première zone, et dans la zone suivante, entrez:

```sql
INSERT INTO ArgonAir VALUES(
  '{{PARTICLE_DEVICE_ID}}',
  {{temperature}},
  {{humidity}},
  {{pressure}},
  '{{air-quality}}',
  {{dust-lpo}},
  {{dust-ratio}},
  {{dust-concentration}},
  to_timestamp('{{PARTICLE_PUBLISHED_AT}}', 'yyyy-MM-ddTHH:mm:ss.SSSz')
);
```

Quelques explications de ce SQL. Particules comprend certaines choses dans toutes les charges utiles, et ceux qui sont en majuscules. Il y a plus, et si vous voulez utiliser plus d'entre eux, assurez-vous qu'il ya des colonnes dans votre base de données pour tout ce que vous voulez stocker. La charge utile de l'appareil lui-même peut être soit envoyé dans son ensemble, ou (ce qui était une nouvelle astuce que j'ai appris) sorti en utilisant la notation {{...}} comme des champs individuels.

Enfin, l'horodatage de PARTICLE_PUBLISHED_AT est envoyé, ainsi que la chaîne mise en forme, de sorte que QuestDB saura analyser correctement la chaîne de date comme un horodatage à l'arrivée.

Votre écran d'intégration devrait ressembler à ceci:

![web integration screen from Particle](/posts/category/iot/iot-hardware/quickly-connect-an-argon-iot-device-to-questdb/images/particleQuestIntegration1.png)

Ne pas oublier de faire défiler vers le bas et _un_ cocher la case ** ** SSL Appliquer, puis enregistrez votre intégration.

À ce stade, si votre appareil Qualité de l'air envoie des données à la particule Cloud, vous devriez commencer à voir les lectures apparaissent dans la console QuestDB à intervalles réguliers.

Ma base de données ressemble maintenant à ceci:

![Table of results from the query](/posts/category/iot/iot-hardware/images/Screen-Shot-2020-09-08-at-2.10.21-PM-1024x181.png)

Assez épatant. Mais il est toujours pas le beau tableau de bord que je veux.

## Le tableau de bord Partie

QuestDB attend toujours leur plug-in Grafana être approuvé, mais je ne pouvais pas attendre de construire un tableau de bord, donc je suis parti et (vrai pour former) a essayé quelque chose de totalement non supporté juste pour voir ce qui est arrivé. J'ai utilisé le plugin Grafana Postgres.

Devinez quoi? Ça a marché!

Donc, pour configurer le plugin pour Postgres QuestDB:

![Grafana connection panel showing Postgres settings](/posts/category/iot/iot-hardware/images/Screen-Shot-2020-09-08-at-2.19.59-PM.png)

Il suffit de remplir les valeurs par défaut des paramètres de protocole [QuestDB pgwire](https://questdb.io/docs/guide/postgres-wire).

Une fois que vous avez fait cela, vous pouvez construire votre tableau de bord:

![Grafana Dashboard with Temperature, Humidity, and Pressure](/posts/category/iot/iot-hardware/images/Screen-Shot-2020-09-08-at-2.19.33-PM.png)

Et voila!

## Tout le code

Comme promis, voici tout le code que je déployé sur mon appareil Argon:

```cpp
#include "math.h"
#include "Air_Quality_Sensor.h"
#include "Adafruit_BME280.h"
#include "SeeedOLED.h"
#include "JsonParserGeneratorRK.h"

#define DUST_SENSOR_PIN D4
#define SENSOR_READING_INTERVAL 30000
#define AQS_PIN A2

AirQualitySensor aqSensor(AQS_PIN);
Adafruit_BME280 bme;

unsigned long lastInterval;
unsigned long lowpulseoccupancy = 0;
unsigned long last_lpo = 0;
unsigned long duration;

float ratio = 0;
float concentration = 0;

// setup() runs once, when the device is first turned on.
void setup() {
  // Put initialization like pinMode and begin functions here.
  Serial.begin(9600);
  delay(1000);
  Serial.println("Starting ... ");
  pinMode(DUST_SENSOR_PIN, INPUT);
  lastInterval = millis();
  if (aqSensor.init()) {
    Serial.println("Air Quality Sensor ready.");
  } else {
    Serial.println("Air Quality Sensor ERROR!");
  }
  if (bme.begin()) {
    Serial.println("BME280 Sensor ready.");
  }  else {
    Serial.println("BME280 Sensor ERROR!");
  }
  Wire.begin();
  SeeedOled.init();
  SeeedOled.clearDisplay();
  SeeedOled.setNormalDisplay();
  SeeedOled.setPageMode();
  SeeedOled.setTextXY(2, 0);
  SeeedOled.putString("Particle");
  SeeedOled.setTextXY(3, 0);
  SeeedOled.putString("Air Quality");
  SeeedOled.setTextXY(4, 0);
  SeeedOled.putString("Monitor");
}

// loop() runs over and over again, as quickly as it can execute.
void loop() {
  float temp, pressure, humidity;

  // The core of your code will likely live here.
  duration = pulseIn(DUST_SENSOR_PIN, LOW);
  lowpulseoccupancy = lowpulseoccupancy + duration;
  if ((millis() - lastInterval) > SENSOR_READING_INTERVAL) {
    getDustSensorReadings();
    String quality = getAirQuality();
    Serial.printlnf("Air Quality: %s", quality.c_str());
    getBMEValues(temp, pressure, humidity);
    Serial.printlnf("Temp: %d", temp);
    Serial.printlnf("Pressure: %d", pressure);
    Serial.printlnf("Humidity: %d", humidity);
    updateDisplay(temp, humidity, pressure, quality);
    createEventPayload(temp, humidity, pressure, quality);
    lowpulseoccupancy = 0;
    lastInterval = millis();
  }
}

void getDustSensorReadings() {
  if (lowpulseoccupancy == 0) {
    lowpulseoccupancy = last_lpo;
  } else {
    last_lpo = lowpulseoccupancy;
  }
  ratio = lowpulseoccupancy / 10.0);
  concentration = 1.1 * pow(ratio, 3) - 3.8 * pow(ratio, 2) + 520 / ratio + 0.62;
  Serial.printlnf("LPO: %d", lowpulseoccupancy);
  Serial.printlnf("Ratio: %f%%", ratio);
  Serial.printlnf("Concentration: %f pcs/L", concentration);
}

String getAirQuality() {
  int quality = aqSensor.slope();
  String qual = "None";

  if (quality == AirQualitySensor::FORCE_SIGNAL) {
    qual = "Danger";
  } else if (quality == AirQualitySensor::HIGH_POLLUTION) {
    qual = "High Pollution";
  } else if (quality == AirQualitySensor::LOW_POLLUTION) {
    qual = "Low Pollution";
  } else if (quality == AirQualitySensor::FRESH_AIR) {
    qual = "Fresh Air";
  }
  return qual;
}

int getBMEValues(float &temp, float &pressure, float &humidity) {
  temp = bme.readTemperature();
  pressure = (bme.readPressure() / 100.0F);
  humidity = bme.readHumidity();
  return 1;
}

void updateDisplay(float temp, float humidity, float pressure, String airQuality) {
  SeeedOled.clearDisplay();

  SeeedOled.setTextXY(0, 3);
  SeeedOled.putString(airQuality);

  SeeedOled.setTextXY(2, 0);
  SeeedOled.putString("Temp: ");
  SeeedOled.putFloat(temp);
  SeeedOled.putString("C");

  SeeedOled.setTextXY(3, 0);
  SeeedOled.putString("Humidity: ");
  SeeedOled.putFloat(humidity);
  SeeedOled.putString("%");

  SeeedOled.setTextXY(4, 0);
  SeeedOled.putString("Press: ");
  SeeedOled.putFloat(pressure);
  SeeedOled.putString(" hPa");

  if (concentration > 1) {
    SeeedOled.setTextXY(5, 0);
    SeeedOled.putString("Dust: ");
    SeeedOled.putNumber(concentration); // Cast our float to an int to make it more compact
    SeeedOled.putString(" pcs/L");
  }
}

void createEventPayload(float temp, float humidity, float pressure, String airQuality) {
  JsonWriterStatic<256> jw;
  {
    JsonWriterAutoObject obj(&jw);

    jw.insertKeyValue("temp", temp * 1.00);
    jw.insertKeyValue("humidity", humidity * 1.00);
    jw.insertKeyValue("pressure", pressure * 1.00);
    jw.insertKeyValue("air-quality", airQuality);

    if (lowpulseoccupancy > 0) {
      jw.insertKeyValue("dust-lpo", lowpulseoccupancy);
      jw.insertKeyValue("dust-ratio", ratio);
      jw.insertKeyValue("dust-concentration", concentration);
    } else {
      jw.insertKeyValue("dust-lpo", 0.00);
      jw.insertKeyValue("dust-ratio", 0.00);
      jw.insertKeyValue("dust-concentration", 0.00);
    }
  }
  Particle.publish("env-vals", jw.getBuffer(), PRIVATE);
}
```
