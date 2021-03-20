---
title: "¿Cómo salida de datos del flujo de MQTT nativa"
Date: 2019-08-23
Author: davidgs
Category: Database
Slug: how-to-output-data-from-flux-to-mqtt-natively
hero: images/mqtt.png
---

## La escritura de datos desde InfluxDB a MQTT usando Flux

Empecé a usar la versión de código abierto (OSS) de InfluxDB v2.0 muy temprano en las versiones alfa. Incluso en los primeros lanzamientos, yo estaba muy enamorado de la forma en que las cosas se perfilan. Pero como usted sabe, hago un montón ** ** de la IO se basa, y el uso de InfluxDB para todos, así que había algunas cosas que tenía que hacer que simplemente no lo hizo, sin embargo.

Una de las cosas que tengo toda mi IO Demos hacer es escribir alertas a un corredor de MQTT. Tengo otros dispositivos IO que leen de ese corredor, y tomar acciones en base a lo que los mensajes que reciben. Pero InfluxDB 2.0 Alpha no tenía capacidades de salida real.

** Nota: ** Hay un marco alertar que está llegando a InfluxDB 2.0 muy pronto, pero a) no estaba disponible entonces y b) lo necesitaba ahora.

¿Qué hacer? Bueno, Flux es un lenguaje extensible, por lo que decidí extender el lenguaje de escritura a MQTT. En primer lugar, es importante tener en cuenta que el flujo tiene 2 construcciones de lenguaje para la lectura y escritura de datos: `a partir de ()` y `a ()`. Si usted ha escrito ninguna Flux en absoluto, reconocerá la de () `` sintaxis como la forma en que vuelvas datos de InfluxDB. El `para ()` negocio es un poco más difícil. Integrado en el lenguaje es la capacidad de volver a escribir InfluxDB, mediante el que () `` sintaxis. También encontré un `para ()` extensión para HTTP que permite escribir los resultados de la consulta de flujo a un punto final HTTP. Al menos ahora tenía un punto de partida!

## Adición de MQTT a Flux

Empecé a hurgar en el código Flux para ver cómo el http `para ()` método fue implementado y rápidamente vio que sería casi trivial utilizar este mismo marco para MQTT, por lo que he copiado todo el código de aquí para allá http `para ( ) `de salida y comenzó a trabajar para moverlo hacia MQTT. Al igual que con todas estas cosas, era un poco menos 'trivial' de lo que a primera vista, pero después de unas semanas de trabajo en-otra vez fuera de nuevo, tuve una salida de trabajo a partir de MQTT Flux!

En primer lugar, tuviera que definir qué opciones tendría la salida MQTT, y que se establecieron en una especie de conjunto mínimo predeterminado de opciones:

```go
type ToMQTTOpSpec struct {
    Broker string `json:"broker"`
    Name string `json:"name"`
    Topic string `json:"topic"`
    Message string `json:"message"`
    ClientID string `json:"clientid"`
    Username string `json:"username"`
    Password string `json:"password"`
    QoS int `json:"qos"`
    NameColumn string `json:"nameColumn"` // either name or name_column must be set, if none is set try to use the "_measurement" column.
    Timeout time.Duration `json:"timeout"` // default to something reasonable if zero
    NoKeepAlive bool `json:"noKeepAlive"`
    TimeColumn string `json:"timeColumn"`
    TagColumns []string `json:"tagColumns"`
    ValueColumns []string `json:"valueColumns"`
}
```

Por supuesto, no todos los que son requeridos ** **, pero voy a ir a través de los que son.

En primer lugar, por supuesto, es necesario definir un corredor. Esta es la URL del corredor de MQTT que desea utilizar. En su URL de su corredor debe ser identificado, ya sea como `tcp`,` `ws` o tls` modo` tcp: //mqtt.mybroker.com: 1883` sería lo que está buscando. La mayor parte del resto son, en general, a un grado opcional. ** ** Si usted proporciona un `Username` entonces ** ** También debe proporcionar una contraseña. No se puede tener uno sin el otro! Además, si no se proporciona un `Topic` continuación, se creará para usted por encadenar todas las marcas recuperadas de la consulta. Te aconsejo dar un tema, como un tema de `/ tag1 / TAG_2 / TAG_3 / ...` sería menos que ideal en muchas situaciones.

## Cómo utilizar esta nueva cosa?

Me alegro de que lo preguntes! En primer lugar, no es en realidad parte de Flujo por el momento. He enviado un PR, se ha aceptado, pero (a partir de este escrito) no ha sido fusionado. Si usted quiere construir su propia versión de flujo con el fin de conseguir sus manos en este momento * * entonces tendrá que tirar de la rama y la acumulación de la fuente. Ver el [MQTT PR](https://github.com/influxdata/flux/pull/1653) e ir de allí.

Una vez que hayas hecho esto, el código Flux para empezar a escribir a un corredor de MQTT es realmente trivial! Usted desea crear una tarea en la InfluxDB 2.0 interfaz de usuario, y luego se puede pegar en el código siguiente:

```js
import "mqtt"
from(bucket: "telegraf")
    |> range(start: -task.every)
    |> filter(fn: (r) =>
        (r._measurement == "cpu"))
    |> filter(fn: (r) =>
        (r._field == "usage_system"))
    |> filter(fn: (r) =>
        (r.cpu == "cpu-total"))
    |> last()
    |> mqtt.to(
        broker: "tcp://davidgs.com:8883",
        topic: "cpu",
        clientid: "cpu-flux",
        valueColumns: ["_value"],
        tagColumns: ["cpu", "host"],
    )
```

Esto escribirá el último CPU `valor usage_system` a su corredor MQTT. El uso de la interfaz de usuario, puede decidir con qué frecuencia desea que esta información por escrito.

## Un par de cosas a la nota

Es importante darse cuenta de que [Flux se recuperan todos sus datos de consultas como tablas](https://www.influxdata.com/blog/use-flux-to-group-shape-and-analyze-your-time-series-data/). La razón de lo anterior tarea utiliza la última `()` función es limitar el valor devuelto a una mesa con exactamente una fila. El MQTT `a)` función (escribirá toda la mesa para el corredor, como la línea de protocolo. Si la consulta devuelve una tabla muy grande, estar preparados para su corredor MQTT para conseguir una mesa muy grande como la carga útil del mensaje.

Además, si la consulta devuelve varias tablas, el MQTT `para () función` escribirá un mensaje ** ** por mesa con cada mensaje que contiene una tabla entera. Si este no es el comportamiento que desea, usted debe pensar acerca de cómo crear su consulta de manera que vuelvan una sola tabla (preferiblemente pequeño) como los resultados.

También puede haber notado un campo opcional `message` anteriormente. Si lo que desea es enviar un mensaje predefinido en lugar de una tabla de resultados, se puede definir el parámetro `message` en su llamada a` a () `y será enviado ese mensaje.
Hasta ahora, he estado usando esto por cerca de 2 meses con resultados fantásticos! Soy capaz de controlar algunos dispositivos IO en base a las lecturas de otros dispositivos de la IO y funciona muy bien!

** Actualización: ** El PR para esto ahora se ha fusionado en la rama principal por lo que se debe mostrar en una liberación de Flujo pronto!
