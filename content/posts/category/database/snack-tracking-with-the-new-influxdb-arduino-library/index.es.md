---
title: "Snack-Tracking Con la nueva librería Arduino InfluxDB"
Date: 2020-03-13
Author: davidgs
Category: Gadgetry, IoT
Tags: Arduino, InfluxData, InfluxDB, IoT, IoT Data, Snacks
Slug: snack-tracking-with-the-new-influxdb-arduino-library
hero: images/Screen-Shot-2020-03-13-at-2.26.15-PM.png
reading_time: 7 minutes
---

## Una nueva biblioteca

Muchos de ustedes Arduino entusiastas son probablemente consciente de la biblioteca InfluxDB existente que fue mantenida por [Tobias Schürg](https://github.com/tobiasschuerg) durante muchos años. El sombrero ante él para proporcionar esta biblioteca y mantener durante tanto tiempo.

Con la llegada de InfluxDB 2.0, que era hora de actualizar la biblioteca. Algunos de ustedes recordarán que hice una rápida actualización para apoyar la InfluxDB 2.0 OSS hace unos meses, y que funcionaba bien, pero InfluxData ha estado trabajando hacia un conjunto de coherentes, juego mantenido InfluxData de bibliotecas de cliente. Ellos han estado trabajando con Tobias en el último par de meses para actualizar su biblioteca con nuestros nuevos cambios, y convertirse en un mantenedor de esa biblioteca. Me alegra decir que todo ese trabajo ha dado sus frutos, y el nuevo Arduino Biblioteca InfluxDB es lanzado oficialmente, y es también parte de los documentos [](https://v2.docs.influxdata.com/v2.0/reference/api/client-libraries/).

## Algunos importantes adiciones de

Esta nueva versión de la biblioteca, mientras que al revés-compatible con la versión anterior (en su mayoría) tiene algunos cambios muy significativos para la versión 2.0 de InfluxDB mientras sigue apoyando la línea 1.x.

escrito por lotes aún se puede utilizar, pero es mucho más ** ** más fluida y eficiente. He estado trabajando con él un poco, y ya no hay necesidad de mantener un contador de lotes y escribir el lote de forma manual. Todo se maneja para usted. Posiblemente es la más significativa la capacidad de mantener viva la conexión HTTP, lo que ahorra la sobrecarga de crear instancias de la conexión y romperlo hacia abajo varias veces. Como siempre y cuando tenga Wi-Fi fiable, es decir.

Ahora hay soporte para el manejo de la base de datos de contrapresión. Si sus escrituras no pasan por, la biblioteca se almacena en caché los escribe que no tuvieron éxito y probar otra vez, y el tamaño de la memoria caché de contrapresión es configurable.

Ahora hay una manera fácil de manejar marcas de tiempo y sincronización de tiempo dentro de la propia biblioteca. Es posible ajustar el tiempo de precisión, y la biblioteca se encarga de automatizar el sellado de tiempo para usted.

Hay mucho más, estoy seguro (incluyendo el manejo de las conexiones SSL) que no he vuelto a trabajar con todavía, pero estoy seguro de que obtendrá la oportunidad de pronto!

## Snack-Rastreador A

Dado que esta nueva biblioteca acaba de salir, pensé que volvería a poner a prueba al menos una vez de inmediato. Con el fin de hacerlo, quería escribir mucho * * de los datos a través de él para ver cómo se levantó. Con el fin de hacer eso, me fui a comprar un poco de [Escala digital de bricolaje](https://www.amazon.com/gp/product/B07SX2MYMX/) que utiliza una interfaz para HX711 a la célula de carga. entonces enganchado que a un WEMOS D1 Mini (por supuesto, ya que tengo muchos de ellos alrededor), y yo estaba listo para ir! Telegrafié arriba:

![snacker](/posts/category/database/images/Snacker.png )

La Biblioteca de Arduino para el HX711 vino con un programa de ejemplo para la calibración de la balanza, y en cierto modo me anticipa tener que calibrar ellos, así que compré un juego de pesas de calibración cuando compré la escala. El programa de calibración aun guarda los datos de calibración a la memoria EEPROM para usted por lo que siempre está calibrado. Parece como si fuera una precisión de alrededor de 0,05 gramos, en su mayor parte.

## Código de tiempo

Ahora que el dispositivo fue construido, era la hora de escribir un poco de código para enviar todos estos datos para InfluxDB! Por suerte la biblioteca HX711 también vino con un programa de ejemplo para apenas escupiendo datos en bruto desde el dispositivo, por lo que todo lo que tenía que hacer era modificar que muy ligeramente para enviar mis datos a InfluxDB.

```cpp
// InfluxDB 2 server url, e.g. http://192.168.1.48:9999 (Use: InfluxDB UI -> Load Data -> Client Libraries)
#define INFLUXDB_URL "influxdb-url"
// InfluxDB 2 server or cloud API authentication token (Use: InfluxDB UI -> Load Data -> Tokens -> <select token>)
#define INFLUXDB_TOKEN "token"
// InfluxDB 2 organization name or id (Use: InfluxDB UI -> Settings -> Profile -> <name under tile> )
#define INFLUXDB_ORG "org"
// InfluxDB 2 bucket name (Use: InfluxDB UI -> Load Data -> Buckets)
#define INFLUXDB_BUCKET "bucket"

InfluxDBClient client(INFLUXDB_URL, INFLUXDB_ORG, INFLUXDB_BUCKET, INFLUXDB_TOKEN);

HX711_ADC LoadCell(D1, D2);
```

Usted, por supuesto, tiene que definir su propia URL, Token, etc. poner la célula de carga en D1 y D2, de modo que definen de aquí también.

Luego añade lo siguiente al final de la configuración () de rutina:

```cpp
// Synchronize UTC time with NTP servers
// Accurate time is necessary for certificate validaton and writing in batches
configTime(0, 0, "pool.ntp.org", "time.nis.gov");
// Set timezone
setenv("TZ", "EST5EDT", 1;
influx.setWriteOptions(WritePrecision::MS, 3, 60, true);
```

Que pone en marcha la sincronización de tiempo, y me pone el tiempo de precisión de milisegundos, define el tamaño del lote, el tamaño del búfer (que en mi caso me puse a 3 veces el tamaño de lote), el intervalo de vaciado (Me aseguro de que el a ras ocurre al menos cada 60 segundos) y que establecen el http-keepalive a cierto lo que sólo puede utilizar la misma conexión cada vez.

Esa fue toda la configuración que tenía que hacer!

A continuación, tengo que escribir los datos. Y aquí está la cosa, el programa de ejemplo HX711 lee la escala cada 250 ms

```cpp
float weight = 0.00;
void loop() {
   //update() should be called at least as often as HX711 sample rate; >10Hz@10SPS, >80Hz@80SPS
  //use of delay in sketch will reduce effective sample rate (be carefull with use of delay() in the loop)]{style="color: #999dab;"}
  LoadCell.update();
  //get smoothed value from data set
  if(millis() > t + 250) {
    float i = LoadCell.getData();
    weight = i;
    t = millis();
  }
  writeData(weight);
  ...
}
void writeData(float weight) {
  Point dPoint();
  dPoint.addTag("device", "ESP8266");
  dPoint.addTag("sensor", SENSOR_ID);
  dPoint.addField("weight", weight);
  Serial.print("Weight: ");
  Serial.println(weight);
  if(!influx.writePoint(dPoint)) {
    Serial.print("InfluxDB write failed: ");
    Serial.println(influx.getLastErrorMessage());
  }
```

En el código anterior que estoy escribiendo un nuevo punto de datos, con las etiquetas, etc., cada ~ 250 ms. Se dará cuenta de que yo sigo escribiendo los puntos de datos. Pero en el fondo, la biblioteca está manejando el procesamiento por lotes, el almacenamiento en caché, contrapresión, reintentos, etc. acabo de llegar a puntos de datos de escritura alegremente sin pensar en ellos nunca más.

## Ositos de goma

Si me conoces en absoluto, también sé que tengo una especie de cosa * * de los ositos de goma. Así que decidí probar esta cosa cargándolo con un plato de ositos de goma, y viendo los datos que me comieron. Y he aquí, funciona!

![Gummies2](/posts/category/database/images/Gummies2.gif )

Se puede ver que cuando meto la mano en el plato para conseguir un poco, el peso sube un poco, luego cae. Por supuesto que tenía que hacer un oso gomoso del tablero de instrumentos:

![GummyDash](/posts/category/database/images/GummyDash.gif )

Lo que era realmente una especie de diversión, hasta que me quedé sin gomosa de los osos.

![Captura de pantalla 2020 03 13 a las 2 PM 26 15](/posts/category/database/images/Screen-Shot-2020-03-13-at-2.26.15-PM.png )

Hasta ahora esto ha estado funcionando durante un par de horas y yo todavía no han visto un solo mensaje de error o hipo desde el propio dispositivo, por lo que parece que el procesamiento por lotes, cache, etc es todo funcionando perfectamente.
