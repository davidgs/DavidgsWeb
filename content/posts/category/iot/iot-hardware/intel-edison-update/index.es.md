---
title: "Edison actualización de Intel"
Date: 2016-01-06
Author: davidgs
Category: Gadgetry, IoT
Tags: Edison, IoT
Slug: intel-edison-update
hero: images/SparkFun_Edison_Boards-16.jpg
reading_time: 3 minutes
---

Necesito modificar mi [post anterior](/posts/category/iot/iot-hardwareintel-edison-big-hat-no-cattle/) sobre el procesador Intel Edison. Resulta que puede que no sea el módulo de Edison en sí, sino más bien la Junta Mini-Breakout Intel que tiene la culpa cuando t viene a por lo menos el fracaso I2C. Todavía tengo que ver sobre las fallas SPI. He aquí por qué he llegado a esa conclusión:

Pedí algunos de los [Sparkfun Bloques](https://www.sparkfun.com/products/13034) para Intel Edison © y volvió a engañar con ellos. (En realidad yo no era 'engañar' con ellos tanto como trabajando en un proyecto para un cliente que Intel Edison era un buen ajuste.) He descargado un código de buen) para Intel Edison © y volvió a engañar con ellos. (En realidad yo no era 'engañar' con ellos tanto como trabajando en un proyecto para un cliente que Intel Edison era un buen ajuste.) He descargado un código de buen [GitHub](https://github.com/jku/LSM9DS0) que hizo que el bus I2C utilizable con los bloques de Sparkfun y listo! Tenía que trabajar! Hice algunos cambios bastante sustanciales al código original desde el repositorio GitHub originales, por lo que en forma de horquilla y tener re-publicada por mi cuenta) que hizo que el bus I2C utilizable con los bloques de Sparkfun y listo! Tenía que trabajar! Hice algunos cambios bastante sustanciales al código original desde el repositorio GitHub originales, por lo que en forma de horquilla y tener re-publicada por mi cuenta [GitHub](https://github.com/davidgs/LSM9DS0), por supuesto. Sobre todo lo añadí eran más opciones de inicio y de salida.

Ahora estoy capaz de leer los datos del sensor I2C (estoy usando el [bloque 9DOF Sparkfun](https://www.sparkfun.com/products/13033)) y ahora estoy publicando los datos del sensor de ... bueno, no puedo elegir dónde lo envío! Puedo enviarlo a la acumulación de)) y ahora estoy publicando los datos del sensor de ... bueno, no puedo elegir dónde lo envío! Puedo enviarlo a la acumulación de [Mosquito MQTT] servidor (http://mosquitto.org), o a una base de datos NoSQL incrustado [MongoDB](http://mosquitto.org), oa una externa), oa una externa [Couchbase ](https://www.mongodb.org) de base de datos NoSQL, o puedo publicar mis propios datos JSON prima de ella. Puedo incluso hacer posible la publicación de todas las fuentes a la vez, pero no estoy seguro de que es del todo útil, la verdad.

Sí, estoy por lo general un tipo de Java - por lo tanto los granos de café [](/posts/beans/beans) - pero vuelto a C para éste. Ha sido 30 años desde que he escrito ningún código C grave, pero al parecer es como andar en bicicleta, porque se trata de volver a la derecha!

Manténgase en sintonía para el resto de la historia en este proyecto, porque va a ser mejor y mejor!
