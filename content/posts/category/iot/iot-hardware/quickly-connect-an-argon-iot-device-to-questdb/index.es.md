---
title: "Rápidamente conectar un dispositivo de argón a la IO QuestDB"
Date: 2020-09-08
Author: davidgs
Category: database, Gadgetry, IoT
Tags: IoT, Particle, QuestDB, TSDB
Slug: quickly-connect-an-argon-iot-device-to-questdb
hero: images/rawPower.svg
reading_time: 10 minutes
---

Estoy de vuelta a [Particle.io](https://particle.io) de nuevo. Vi que estaban teniendo un 30% de descuento en venta en la nueva argón y algunos kits de desarrollo, así que tuve que saltar sobre ella, ya que no he tenido ningún nuevo hardware de partículas en años. Por lo tanto, lo que sigue es una guía completa para la conexión de uno de estos kits para) de nuevo. Vi que estaban teniendo un 30% de descuento en venta en la nueva argón y algunos kits de desarrollo, así que tuve que saltar sobre ella, ya que no he tenido ningún nuevo hardware de partículas en años. Por lo tanto, lo que sigue es una guía completa para la conexión de uno de estos kits para [QuestDB](https://questdb.io) con el fin de almacenar los datos, y luego la construcción de un panel de control en la parte superior de la misma con Grafana. ¡Cinturón de seguridad!

## El hardware

En primer lugar, vi a un descuento del 30% en los devkits argón (os maldicen gorjeo anuncios!) Así que compré uno de los [Kits de monitoreo atmosférico Argón](https://store.particle.io/collections/prototyping-hardware/products/air-quality-monitoring-kit-wi-fi). Todos saben Me encanta la calidad del aire monitor! Es un kit muy fácil de montar ya que no hay cables a la soldadura o cualquier cosa. Todos los sensores están conectados mediante un escudo Grove así que no deja de ser plug-and-play.

## La puesta en marcha

No voy a pasar por todo esto paso a paso, porque hay una [excelente tutorial](https://docs.particle.io/quickstart/aqmk-project/) disponibles ya que les permite conocer aproximadamente el 95% del camino allí. Ese tutorial obtener su kit de todos juntos y todo el código escrito para empezar a enviar sus datos a la nube de partículas. Hice algunos cambios en el código, que voy a pasar. En primer lugar, sus usos tutorial ** ** int s para todos los datos que vienen fuera del sensor BME280. Después de haber trabajado con estas pequeñas cosas durante mucho tiempo, sé que pueden ofrecer una mayor precisión, por lo que todos ellos cambió a `` ** ** flotadores.

```cpp
float temp, pressure, humidity;
```

Eso significa que usted tiene que ir a cambiar las firmas para un montón de las funciones que toman `` ** ** flotante en lugar de `` int ** ** así que asegúrese de obtener todo lo que hace (voy a publicar el código completo , incluyendo todos mis cambios, al final.

El otro cambio que hice fue enviar a cero los valores de las lecturas del sensor que no lograron pasar. El sensor de polvo específicamente acaba de dejar de lado los valores si no eran racionales, y así que lo cambié para enviar ceros en esos casos a fin de mantener la base de datos consistente y no tienen un montón de valores nulos en ese país.

## La porción de la nube

Al enviar los datos a la nube de partículas, no hay mucho que sucede después de eso. No es almacenada en cualquier lugar, en cualquier lugar o se envía hasta que configure un lugar para enviarlo para su almacenamiento y análisis. Hay unos pocos lugares pre-configurado para enviar sus datos, pero la más fácil de usar es el marco Wbhook proporcionado. Esto le permite construir un mensaje y enviarlo a un punto final HTTP arbitraria siempre que llegue un nuevo mensaje.

Por supuesto, lo hice escribir un tutorial completo sobre este tema, y es ahora parte de los documentos [Particle.io](https://docs.particle.io/tutorials/integrations/questdb/). En ese tutorial que todavía estaba usando los valores de `int` de la BME280 porque no quiero gente confundir y para la coherencia con los demás documentos de partículas.

## La parte de la base de datos

Vamos a necesitar una instancia de una base de datos QuestDB, por supuesto. Esta instancia no puede ejecutarse en su ordenador portátil, etc. a menos que tenga una forma de acceder a su ordenador portátil a través de Internet abierta. (Pista: Eso no es por lo general una gran idea.)

Puede girar un océano de gotas digital, o un pequeño AWS Linux ejemplo, o lo que usted desee con el fin de conseguirse una versión accesible de QuestDB corriendo.

Una vez conseguido eso, se puede ir a la consola QuestDB en `http: //<your server address> : 9000 / `y crear la siguiente tabla:

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

Esto creará la estructura de tabla correcto para su dispositivo. Un par de cosas a la nota: QuestDB es mucho más rápido si se utiliza el tipo de datos `SYMBOL` en lugar del tipo de datos` string`, por lo que se ve que anteriormente. Además, el 'sello de tiempo (ts) `parte promueve el campo` ts` ser una marca de tiempo designado, que tendrá que para hacer cálculos de series temporales de datos.

A continuación, puede actualizar sus tablas de vistas en la consola, y debería ver su mesa expuso:

![Table layout of the database](/posts/category/iot/iot-hardware/images/Screen-Shot-2020-09-08-at-2.03.20-PM.png)

Una vez que tenga su mesa, es una cuestión de conseguir datos en él. Se dará cuenta de que, aunque la partícula en el dispositivo de código utiliza campos como "calidad del aire" He quitado los guiones de esos nombres. La base de datos que le gusta mejor.

Ir a la pestaña Integraciones de su [Consola de partículas](https://console.particle.io/) y haga clic en Nueva Integración y haga clic sobre el Hook Web

![The 'New Webhook' Panel in the Particle Console](/posts/category/iot/iot-hardware/quickly-connect-an-argon-iot-device-to-questdb/images/particleNewWebhook.png)

Una vez allí, vamos a rellenar el formulario. De acuerdo con el tutorial, nuestro evento se llama `env-vals`, por lo que bajo ingresar ** ** Nombre del evento.

Bajo ** ** URL entrar en la dirección de su servidor QuestDB `http: my.server.com: 9000` o dondequiera que su servidor se encuentra.

A continuación, cambiar el tipo de solicitud ** ** a `GET`, y el ** ** Formato de solicitud de consulta a` Parameters`

Ahora viene la parte más difícil: Los parámetros de consulta reales. En primer lugar, seleccionar ** ** personalizado en lugar de ** ** predeterminado, y en el primer cuadro, escriba Content-type` en el siguiente cuadro en la misma fila, introduzca el texto `/ plain` A continuación, haga clic en el ** + Añadir fila botón **.

En la nueva fila, introduzca `query` en el primer cuadro, y en el siguiente cuadro, escriba:

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

Algunos explicación de que SQL. De partículas incluye algunas cosas en todas las cargas útiles, y los que están en todos los casquillos. Hay más, y si desea utilizar más de ellos, simplemente asegúrese de que hay columnas en su base de datos para lo que desee almacenar. La carga útil desde el propio dispositivo o bien se puede enviar como un todo, o (y esto era un nuevo truco que aprendí) sacó usando el {{...}} notación como campos individuales.

Por último, la marca de tiempo PARTICLE_PUBLISHED_AT se envía, junto con el formato de cadenas, de modo que QuestDB sabrá cómo analizar correctamente la cadena de fecha como una marca de tiempo a la llegada.

Su pantalla de integración, debe tener este aspecto:

![web integration screen from Particle](/posts/category/iot/iot-hardware/quickly-connect-an-argon-iot-device-to-questdb/images/particleQuestIntegration1.png)

No se olvide de desplazarse a la parte inferior y _un_ comprobar el SSL ** ** Hacer cumplir caja, y luego guardar su integración.

En este punto, si el dispositivo de Calidad del Aire está enviando datos a la nube de partículas, usted debe comenzar a ver las lecturas se muestran en la consola QuestDB a intervalos regulares.

Mi base de datos ahora se ve así:

![Table of results from the query](/posts/category/iot/iot-hardware/images/Screen-Shot-2020-09-08-at-2.10.21-PM-1024x181.png)

Bastante spiffy. Pero todavía no es el buen tablero que quiero.

## La parte del tablero de instrumentos

QuestDB aún está esperando su Grafana plugin de ser aprobada, pero simplemente no podía esperar para construir un tablero de instrumentos, así que fui y (fiel a su estilo) algo tratado en su totalidad no es compatible sólo para ver qué pasaba. He utilizado el plugin Grafana Postgres.

¿Adivina qué? ¡Funcionó!

Por lo tanto, para configurar los plugins de Postgres QuestDB:

![Grafana connection panel showing Postgres settings](/posts/category/iot/iot-hardware/images/Screen-Shot-2020-09-08-at-2.19.59-PM.png)

Rellene los valores por defecto de los [QuestDB pgwire] configuración del protocolo (https://questdb.io/docs/guide/postgres-wire).

Una vez que hayas hecho esto, usted puede construir su tablero de instrumentos:

![Grafana Dashboard with Temperature, Humidity, and Pressure](/posts/category/iot/iot-hardware/images/Screen-Shot-2020-09-08-at-2.19.33-PM.png)

¡Y ahí lo tienes!

## Todo el código

Según lo prometido, aquí es todo el código que desplegué a mi dispositivo Argón:

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
