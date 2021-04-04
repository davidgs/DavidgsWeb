---
title: "Schnell Connect ein Argon IoT Device QuestDB"
Date: 2020-09-08
Author: davidgs
Category: database, Gadgetry, IoT
Tags: IoT, Particle, QuestDB, TSDB
Slug: quickly-connect-an-argon-iot-device-to-questdb
hero: images/rawPower.svg
---

Ich bin wieder zu [Particle.io](https://particle.io) wieder. Ich sah, dass sie ein 30% Rabatt auf dem Verkauf auf das neue Argon und einige Entwickler-Kits wurden mit, so dass ich auf sie springen musste, da ich keine neue Particle Hardware in Jahren bekommen habe. Also, was folgt ist eine vollständige Anleitung zum Anschluss eines dieser Kits) wieder. Ich sah, dass sie ein 30% Rabatt auf dem Verkauf auf das neue Argon und einige Entwickler-Kits wurden mit, so dass ich auf sie springen musste, da ich keine neue Particle Hardware in Jahren bekommen habe. Also, was folgt ist eine vollständige Anleitung zum Anschluss eines dieser Kits [QuestDB](https://questdb.io), um die Daten zu speichern, und dann den Aufbau einer Armaturenbrett oben drauf mit Grafana. Anschnallen!

## Die Hardware

Zuerst sah ich einen 30% Rabatt auf die Argon DevKits (Sie twitter Anzeigen verfluchen!), Also kaufte ich einen der [Argon Air Quality Monitoring-Kits](https://store.particle.io/collections/prototyping-hardware/products/air-quality-monitoring-kit-wi-fi). Y'all weiß, dass ich liebe, zu überwachen die Luftqualität! Es ist eine wirklich einfache Kit zu montieren, da es keine Drähte zu löten oder irgendetwas sind. Alle Sensoren sind mit einem Grove Schild mit so ist es wirklich einfach Plug-and-Play.

## Die Einrichtung

Ich werde nicht gehen Schritt für Schritt durch alles Schritt, weil es ein [hervorragende Tutorial] ist (https://docs.particle.io/quickstart/aqmk-project/) zur Verfügung bereits, dass Sie über 95% aus dem Weg Dort. Das Tutorial wird Ihr Kit alle zusammengestellt bekommen und alle der Code geschrieben Ihre Daten an die Partikelwolke zu starten sendet. Ich habe ein paar Änderungen am Code vornehmen, die ich durchmachen wird. Erstens, ihre praktische Einführung verwendet ** int ** s für alle die Daten des BME280 Sensor kommen aus. mit diesen kleinen Dinge für eine sehr lange Zeit gearbeitet hat, weiß ich, dass sie eine höhere Genauigkeit liefern kann, so dass ich sie alle `** Schwimmer geändert **`.

```cpp
float temp, pressure, humidity;
```

Das bedeutet, dass Sie die Signaturen der Funktionen für eine Reihe gehen ändern `** Schwimmer zu nehmen **` statt `** int **` so stellen Sie sicher, dass Sie alle bekommen das getan (Ich werde den vollständigen Code schreiben , alle meine Änderungen am Ende inklusive.

Die andere Änderung, die ich machte, war Null-Werte für Sensormessungen zu senden, die geschehen ist fehlgeschlagen. Der Staubsensor speziell würde nur die Werte weglassen, wenn sie nicht rational waren, und so habe ich es verändert Nullen in den Fällen, um die Datenbank konsistent und nicht haben eine Reihe von Null-Werte in dort zu halten zu senden.

## The Cloud Portion

Wenn Sie Daten in der Partikelwolke senden, geschieht nicht viel danach. Es ist nicht überall gespeichert ist, oder irgendwo gesendet, bis Sie irgendwo so konfigurieren, dass zur Speicherung und Analyse zu senden. Es gibt ein paar vorkonfigurierte Orte, um Ihre Daten zu senden, aber am einfachsten zu bedienen ist der Wbhook Rahmen zur Verfügung gestellt. Auf diese Weise können Sie eine Nachricht erstellen und es dann zu einem beliebigen http Endpunkt senden, wenn eine neue Nachricht eintrifft.

Natürlich, ich habe aufzuschreiben ein komplettes Tutorial über das, und es ist jetzt ein Teil des [Particle.io docs](https://docs.particle.io/tutorials/integrations/questdb/). In diesem Tutorial wurde mit mir immer noch die `int` Werten aus der BME280, weil ich nicht wollte confuse Leute und für die Konsistenz mit den anderen Teilchen docs.

## Die Datenbank-Portion

Wir werden eine Instanz einer QuestDB Datenbank benötigen, natürlich. Diese Instanz kann nicht auf Ihrem Laptop läuft, usw., wenn Sie eine Möglichkeit haben, Ihren Laptop aus dem offenen Internet zuzugreifen. (Hinweis: Das ist nicht in der Regel eine gute Idee.)

Sie können einen Digital-Ozean-Droplet, oder eine kleine AWS Linux-Instanz spinnen, oder was auch immer Sie wollen, um sich in barrierefreier Form QuestDB zum Laufen zu bekommen.

Sobald Sie das haben, können Sie auf die QuestDB Konsole `http: //<your server address> : 9000 / `und die folgende Tabelle erstellen:

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

Dadurch wird die richtige Tabellenstruktur für Ihr Gerät erstellen. Ein paar Dinge zu beachten: QuestDB ist viel schneller, wenn Sie den `SYMBOL` Datentyp anstelle des` STRING` Datentypen verwenden, weshalb Sie das oben zu sehen. Darüber hinaus fördert der `Zeitstempel (ts)` Teil das `ts` Feld eine ausgewiesene Zeitmarke zu sein, was Sie zu tun Zeitreihen Berechnungen auf Ihren Daten wollen.

Anschließend können Sie aktualisieren Sie Ihre Tabellen in der Konsole zu sehen, und Sie sollten Ihre Tabelle sehen gelegt:

![Table layout of the database](/posts/category/iot/iot-hardware/images/Screen-Shot-2020-09-08-at-2.03.20-PM.png)

Sobald Sie Ihren Tisch haben, ist es eine Frage der Daten in diese zu bekommen. Sie werden bemerken, dass, während die Partikel-On-Device-Code verwenden Felder wie „Luftqualität“ habe ich die Bindestriche von diesem Namen entfernt. Die Datenbank mag das besser.

Gehen Sie auf die Register Integrationen Ihrer [Particle Konsole](https://console.particle.io/) und klicken Sie auf New Integration, und klicken Sie dann auf Web-Haken

![The 'New Webhook' Panel in the Particle Console](/posts/category/iot/iot-hardware/quickly-connect-an-argon-iot-device-to-questdb/images/particleNewWebhook.png)

Dort angekommen, werden wir in dem Formular ausfüllen. Nach dem Tutorial wird unsere Veranstaltung `env-vals` genannt, eingeben, so dass unter ** Event Namen **.

Unter ** ** URL die Adresse Ihres QuestDB Server eingeben `http: my.server.com: 9000` oder überall dort, wo der Server befindet.

Ändern Sie dann den ** Request ** auf `GET` und ** Anfrage Format ** zu` Abfrage Parameters`

Jetzt für den schwierigsten Teil: Die eigentlichen Abfrage-Parameter. Wählen Sie zuerst ** Gewohnheit ** statt ** Standard ** und im ersten Feld, geben Sie `Inhalt-Baumuster zur im nächsten Feld in der gleichen Zeile, geben Sie` text / plain` dann auf die Schaltfläche ** + Zeile hinzufügen ** Taste.

In der neuen Zeile, geben Sie `query` im ersten Feld, und im nächsten Feld eingeben:

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

Eine Erklärung dieser SQL. Teilchen enthält einige Dinge in allen von Nutzlasten, und die sind in allen Kappen. Es gibt mehr, und wenn Sie wollen mehr von ihnen verwenden, nur um sicher zu machen gibt es Spalten in der Datenbank für alles, was Sie speichern möchten. Die Nutzlast von dem Gerät selbst kann entweder als Ganze gesendet werden, oder (und dies war ein neuer Trick, den ich gelernt) zog mit der {{...}} Notation als einzelne Felder.

Schließlich wird der PARTICLE_PUBLISHED_AT Zeitstempel gesendet wird, zusammen mit dem Formatierungsstring, so dass QuestDB wissen, wie man richtig das Datum Zeichenfolge als Zeitstempel bei der Ankunft analysieren.

Ihre Integration Bildschirm sollte wie folgt aussehen:

![web integration screen from Particle](/posts/category/iot/iot-hardware/quickly-connect-an-argon-iot-device-to-questdb/images/particleQuestIntegration1.png)

Vergessen Sie nicht, nach unten zu scrollen und _un_ überprüfen ** SSL Erzwingen ** Box, und dann speichern Sie Ihre Integration.

An diesem Punkt werden, wenn Ihre Luftqualität Gerätedaten an die Partikelwolke zu senden, sollten Sie beginnen, Lesungen in der QuestDB Konsole in regelmäßigen Abständen auftauchen zu sehen.

Meine Datenbank sieht nun wie folgt aus:

![Table of results from the query](/posts/category/iot/iot-hardware/images/Screen-Shot-2020-09-08-at-2.10.21-PM-1024x181.png)

Ziemlich spiffy. Aber es ist noch nicht das schöne Armaturenbrett ich will.

## Das Dashboard Teil

QuestDB wartet noch auf ihre Grafana Plugin genehmigt werden, aber ich konnte einfach nicht ein Dashboard zu bauen warten, also ging ich weg und (true) zu bilden versucht, etwas ganz nicht nur unterstützt, um zu sehen, was passiert ist. Ich benutzen die Grafana Postgres-Plugin.

Erraten Sie, was? Es funktionierte!

Also, um das Postgres für QuestDB Plugin zu konfigurieren:

![Grafana connection panel showing Postgres settings](/posts/category/iot/iot-hardware/images/Screen-Shot-2020-09-08-at-2.19.59-PM.png)

Füllen Sie einfach die Standardwerte aus den [QuestDB pgwire](https://questdb.io/docs/guide/postgres-wire) Protokolleinstellungen.

Sobald Sie das getan haben, können Sie Ihr Armaturenbrett bauen aus:

![Grafana Dashboard with Temperature, Humidity, and Pressure](/posts/category/iot/iot-hardware/images/Screen-Shot-2020-09-08-at-2.19.33-PM.png)

Und dort haben Sie es!

## Der gesamte Code

Wie versprochen, hier ist die gesamte Code, dass ich mein Argon Gerät bereitgestellt:

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
