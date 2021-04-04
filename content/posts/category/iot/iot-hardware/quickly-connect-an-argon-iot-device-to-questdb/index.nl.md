---
title: "Snel Sluit een Argon ivd Device QuestDB"
Date: 2020-09-08
Author: davidgs
Category: database, Gadgetry, IoT
Tags: IoT, Particle, QuestDB, TSDB
Slug: quickly-connect-an-argon-iot-device-to-questdb
hero: images/rawPower.svg
---

Ik ben terug naar [Particle.io](https://particle.io) opnieuw. Ik zag dat ze hadden een 30% korting op de verkoop van de nieuwe Argon en enkele ontwikkelaar kits, dus ik moest springen op het, omdat ik geen nieuwe Particle hardware hebben gekregen in jaren. Wat volgt is een complete gids voor een van deze kits verbinden met [QuestDB](https://questdb.io) om de gegevens op te slaan, en vervolgens bouwen van een dashboard bovenop met Grafana. Zet je schrap!

## De hardware

Eerst zag ik een korting van 30% op de Argon DevKits (vervloek je twitter advertenties!) Dus kocht ik een van de [Argon Air Quality Monitoring Kits] (https://store.particle.io/collections/prototyping-hardware/products / lucht-kwaliteit bewaken-kit-wi-fi). Y'all know Ik ben dol op de monitor van de luchtkwaliteit! Het is een heel eenvoudig kit te monteren omdat er geen draden te solderen of iets dergelijks. Alle sensoren worden aangesloten met een Grove schild, dus het is echt gewoon plug-and-play.

## De opzet

Ik ben niet van plan om te gaan door dit alles stap voor stap, want er is een [uitstekende handleiding](https://docs.particle.io/quickstart/aqmk-project/) beschikbaar al dat krijg je ongeveer 95% van de weg Daar. Dat tutorial zal je kit alle put samen te komen en alle code geschreven om te beginnen met het verzenden van uw gegevens naar de Particle Cloud. Ik heb wel een paar wijzigingen in de code, die ik door zal gaan. In de eerste plaats hun leerprogramma toepassingen **int** s voor alle data komende uit van de BME280 sensor. Die hebben gewerkt met deze kleine dingen voor een zeer lange tijd, ik weet dat ze meer nauwkeurigheid kan leveren, dus ik ze allemaal veranderd in `** praalwagens **`.

```cpp
float temp, pressure, humidity;
```

Dat betekent dat je moet gaan veranderen de handtekeningen voor een bos van de functies die `** vlotter te nemen **` in plaats van `** int **` dus zorg ervoor dat je alles wat gedaan (ik zal de volledige code te posten , met inbegrip van al mijn wijzigingen, aan het eind.

De andere verandering die ik maakte was tot nul-waarden te sturen voor sensormetingen dat niet gebeuren. Het stof sensor specifiek zou gewoon weg uit de waarden als ze niet rationeel, en dus heb ik veranderd in nullen in die gevallen om de database consistent te houden en niet over een bos van null-waarden in daarheen te sturen.

## The Cloud Gedeelte

Als u gegevens naar de Particle Cloud te sturen, niet veel er daarna gebeurt. Het gaat nergens opgeslagen, of waar dan ook verzonden totdat je ergens zo configureren dat het voor de opslag en analyse te sturen. Er zijn een paar-vooraf geconfigureerde plaatsen om uw gegevens te verzenden, maar het makkelijkst te gebruiken is het Wbhook geboden kader. Hiermee kunt u een bericht te bouwen en vervolgens te sturen naar een willekeurig http eindpunt wanneer er een nieuw bericht binnenkomt.

Natuurlijk, schreef ik een complete tutorial over dit, en het is nu onderdeel van de [Particle.io docs](https://docs.particle.io/tutorials/integrations/questdb/). In deze les was ik nog steeds met behulp van de `int` waarden uit de BME280 omdat ik niet wil verwarren mensen en voor de samenhang met de andere Particle docs.

## De database Gedeelte

We gaan een instantie van een QuestDB databank nodig, natuurlijk. Dit kan bijvoorbeeld niet worden uitgevoerd op uw laptop, etc. tenzij je een manier om toegang tot uw laptop van het open internet. (Hint: Dat is meestal niet een geweldig idee.)

U kunt draaien een Digital Ocean Droplet, of een kleine AWS linux bijvoorbeeld, of wat je wilt om jezelf een toegankelijke versie van QuestDB draaiend te krijgen.

Zodra je dat hebt, kunt u gaan naar de QuestDB console bij `http: //<your server address> : 9000 / 'en maak de volgende tabel:

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

Dit zal de juiste tabel structuur maken voor uw toestel. Een paar dingen te opmerking: QuestDB is veel sneller als je de `SYMBOL` datatype gebruiken in plaats van de` STRING` datatype, dat is waarom zie je hierboven. Daarnaast is de `timestamp (ts)` deel bevordert de `ts` veld naar een aangewezen tijdstempel, die u wilt gebruiken voor het doen van Time Series berekeningen op uw gegevens.

U kunt dan vernieuw uw tabellen weergeven in de console, en je moet zien uw tafel gelegd:

![Tafel lay-out van de database](/posts/category/iot/iot-hardware/images/Screen-Shot-2020-09-08-at-2.03.20-PM.png)

Zodra u uw tafel, het is een kwestie van data in. U zult merken dat, terwijl de Particle on-device code gebruikt gebieden zoals "air-kwaliteit" Ik heb de streepjes van die namen verwijderd. De database houdt van dat beter.

Ga naar het tabblad Integratie van uw [Particle Console](https://console.particle.io/) en klik op Nieuwe Integratie, en klik vervolgens op de website van Hook

![De 'New webhook' Panel in de Particle Console](/posts/category/iot/iot-hardware/quickly-connect-an-argon-iot-device-to-questdb/images/particleNewWebhook.png)

Eenmaal daar, zullen we in het formulier in te vullen. Volgens de tutorial, is ons evenement genaamd `env-vals`, dus vul dat in het kader ** Event Name **.

Onder **URL** voer het adres van uw QuestDB Server `http: my.server.com: 9000` of waar de server zich bevindt.

Wijzig vervolgens de ** Request Type ** op `GET`, en de ** Request Format ** om` Query Parameters`

Nu voor het lastigste deel: De werkelijke vraag parameters. Selecteer eerst **Custom** in plaats van **Standaard**, en in het eerste vak, geef je op `Content-Type` in het volgende vak op dezelfde rij, geef je op` text / plain` Klik dan op de ** + Rij toevoegen ** knop.

In de nieuwe rij, geef je op `query` in het eerste vak, en in het volgende vak:

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

Enige uitleg van die SQL. Deeltje bevat een aantal dingen in alle payloads, en die zijn in hoofdletters. Er zijn meer, en als je wilt meer van ze te gebruiken, maar zorg ervoor dat er kolommen in uw database voor wat u wilt opslaan. De lading van het apparaat zelf kan ook worden verzonden als een geheel, of (en dit was een nieuwe truc die ik geleerd) trok met de {{...}} notatie als individuele velden.

Tenslotte wordt de PARTICLE_PUBLISHED_AT tijdstempel wordt verzonden, samen met de opmaak die touwtje, zodat QuestDB zal weten hoe de datum string een tijdstempel bij aankomst goed te ontleden.

Uw integratie scherm ziet er nu als volgt uit:

![webintegratie display tegen Particle](/posts/category/iot/iot-hardware/quickly-connect-an-argon-iot-device-to-questdb/images/particleQuestIntegration1.png)

Vergeet niet om naar de bodem te scrollen en _un_ controleer de ** afdwingen SSL ** doos en sla uw integratie.

Op dit punt, als je Luchtkwaliteit Het apparaat is het verzenden van gegevens naar de Particle Cloud, moet u beginnen te zien lezingen te zien in de QuestDB Console op regelmatige tijdstippen.

Mijn databank ziet er nu als volgt uit:

![Tabel van de resultaten van de query](/posts/category/iot/iot-hardware/images/Screen-Shot-2020-09-08-at-2.10.21-PM-1024x181.png)

Pretty spiffy. Maar het is nog steeds niet het mooie dashboard ik wil.

## Het Dashboard Part

QuestDB is nog steeds wachten op hun Grafana plugin te worden goedgekeurd, maar ik kon niet wachten om een dashboard te bouwen, dus ik ging en (waar te vormen) geprobeerd iets geheel niet ondersteund gewoon om te zien wat er gebeurde. Ik gebruikte de Grafana Postgres plugin.

Raad eens? Het werkte!

Dus, om de Postgres plugin voor QuestDB configureren:

![Grafana aansluitingspaneel tonen Postgres instellingen](/posts/category/iot/iot-hardware/images/Screen-Shot-2020-09-08-at-2.19.59-PM.png)

Vul enkel de standaardwaarden van [QuestDB pgwire](https://questdb.io/docs/guide/postgres-wire) protocolinstellingen.

Zodra je dat hebt gedaan, kun je bouwen uw dashboard:

![Grafana Dashboard met de temperatuur, vochtigheid en druk](/posts/category/iot/iot-hardware/images/Screen-Shot-2020-09-08-at-2.19.33-PM.png)

En daar heb je het!

## All The Code

Zoals beloofd, hier is alle code die ik ingezet om mijn Argon apparaat:

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
