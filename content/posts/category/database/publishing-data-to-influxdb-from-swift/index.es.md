---
title: "Los datos de publicación para InfluxDB de Swift"
Date: 2019-03-29
Author: davidgs
Category: Uncategorized
Tags: Influx, InfluxDB, IoT, Swift
Slug: publishing-data-to-influxdb-from-swift
hero: images/2.0CO2-300x269.gif
---

He sido un hombre muy ocupado. Fue hace sólo unos días que escribí acerca de una nueva biblioteca InfluxDB para la escritura de datos de los dispositivos de Arduino a InfluxDB v2 y aquí estoy de nuevo, escribiendo sobre una nueva biblioteca ** ** para escribir datos a InfluxDB. Esta vez, es en Swift. Ahora sus aplicaciones nativas de Apple pueden escribir datos directamente a la versión 2.0 InfluxDB con facilidad.

Es una biblioteca muy simple de usar, y se puede descargar todo el proyecto Xcode para ello de mi [GitHub](https://github.com/davidgs/InfluxData-Swift). Puede usarlo para escribir puntos de datos individuales a la base de datos, o para hacer las escrituras a granel de cualquier tamaño. He aquí un rápido tutorial sobre cómo usarlo.

```swift
let influxdb = InfluxData()
```

Que se obtiene una instancia de la clase `InfluxData`. Una vez conseguido eso, tendrá que configurar algunos parámetros de configuración para ello.

```swift
influxdb.setConfig(server: “serverName", port: 9999, org: “myOrganization", bucket: “myBucket", token: “myToken")
```

Usted, por supuesto, la necesidad de establecer todos los valores de acuerdo a la configuración del servidor v2.0 InfluxDB. También puede ajustar la precisión con el tiempo

```swift
let myPrecision = DataPrecision.ms // for Milliseconds, ‘us' for microseconds, and ’s’ for seconds
influxdb.setPrecision(precision: myPrecision)
```

En este punto, usted está listo para comenzar a recoger datos y enviándolos a InfluxDB v2.0! Para cada punto de datos recoja y desea almacenar, va a crear un nuevo objeto `Influx` para mantener las etiquetas y los datos.

```swift
let point: Influx = Influx(measurement: "myMeasurement")
point.addTag(name: "location", value: "home")
point.addTag(name: "server", value: "home-server")
if !point.addValue(name: "value", value: 100.01) {
    print("Unknown value type!\n")
}
if !point.addValue(name: "value", value: 55) {
    print("Unknown value type!\n")
}
if !point.addValue(name: "value", value: true) {
    print("Unknown value type!\n")
}
if !point.addValue(name: "value", value: "String Value") {
    print("Unknown value type!\n")
}
```

Como se puede ver, se acepta enteros, booleanos, los valores de punto flotante y cadenas. Si no se puede determinar el tipo de datos, se le devolverá el `false` de Boole por lo que es siempre una buena idea para comprobar el valor de retorno.

Para un mejor rendimiento, se recomienda escribir datos en lotes para InfluxDB, por lo que necesita para preparar los datos para entrar en un lote. Esto es fácil de hacer con una llamada a

```swift
influxdb.prepare(point: point)
```

Y cuando llega el momento de escribir el lote, sólo llame

```swift
if influxdb.writeBatch() {
    print("Batch written successfully!\n")
}
```

Una vez más, `writeBatch ()` devuelve un booleano en caso de éxito o fracaso, así que es una buena idea para comprobar esos valores.

Si desea escribir cada punto de datos a medida que llega, acaba de tomar el parámetro que ha creado anteriormente y llamada

```swift
influxdb.writeSingle(dataPoint: point)
```

Puede escribir datos en múltiples mediciones al mismo tiempo, ya que cada punto de datos se inicializa con su medición, y se puede añadir tantas etiquetas y campos como desee.

Este es realmente el primer paso en la biblioteca Swift el InfluxDB v2.0 como voy a ser la adición de la capacidad de consulta, crear depósitos, y un montón de otras características del [idioma] Flux (https://docs.influxdata.com /flux/v0.12/introduction/getting-started/) a la biblioteca en el futuro, pero ya que lo que la mayoría de la gente quiere hacer de inmediato es escribir datos a la base de datos, pensé que tendría esta ahí fuera.

¡Espero que esto sea útil! Sé que ha sido para mí! Ya ves, yo he estado últimamente solo usando mi portátil Mac a los datos de agarre fuera de mi CO2 Bluetooth sensor que he construido. Con el fin de hacer eso, he construido una pequeña aplicación BLE que se conecta al sensor, se adhiere a la ID de datos, y en constante escribe los datos en InfluxDB. Ni que decir tiene, he utilizado esta biblioteca y se han raspado estos datos y su almacenamiento felizmente.

![Publicar datos a InfluxDB de Swift](/posts/category/database/images/2.0CO2-300x269.gif)

Me gustaría saber lo que piensa hacer con una biblioteca Swift para 2.0 así que asegúrese de [sígame](http://twitter.com/follow?user=davidgsIoT) en twitter y quiero saber lo que está ¡haciendo!
