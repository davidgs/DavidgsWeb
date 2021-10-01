---
title: "Construyendo el servidor InfluxDB más pequeño del mundo"
Date: 2020-02-13
Author: davidgs
Category: Gadgetry, IoT, Work
Slug: building-the-worlds-smallest-influxdb-server
hero: images/giant-board-pin-out-1024x690.png
reading_time: 4 minutes
---

He construido muchos servidores [InfluxDB](https://www.influxdata.com/products/influxdb-overview/) en mi tiempo aquí, y he construido algunos bastante esotéricos, pero creo que ¡Finalmente hemos logrado lo que solo se puede describir como el servidor InfluxDB más pequeño del mundo! En el verano de 2019, vi un proyecto en [CrowdSupply.com](https://www.crowdsupply.com/groboards/giant-board) para algo llamado 'Giant Board'. ¡Se veía realmente genial! Una computadora de placa única (SBC) completa que corría Linux, todo en un factor de forma Feather. ¡Lo respaldé de inmediato! Luego, pensándolo por un segundo, ¡lo respaldé * de nuevo *! Entonces obtuve 2 de estas cosas. Accidente total, lo juro.

Algunas especificaciones. Esto es lo que realmente es el tablero gigante:

** Especificaciones de la placa gigante **:

- **Procesador**: Microchip SAMA5D2 ARM® Cortex®-A5 Procesador 500 MHz
- **Memoria**: 128 MB de RAM DDR2
- **Almacenamiento**: tarjeta microSD
- ** Detección **: ADC de 6 x 12 bits con referencia de 3.3 V y disparador externo
- ** Actuación **: 4 x PWM de 16 bits con disparador externo
- **Conectividad**: 1 x I²C, 1 x SPI, 1 x UART, más con Flexcom
- ** Energía **: a través de USB, con soporte para baterías LiPo
- ** Sistema operativo **: kernel de Linux de línea principal

¡Todo en este pequeño factor de forma que suelo usar para microcontroladores!

Bueno, hace unas semanas, ¡llegaron! Entonces, algunas fotos de unboxing:

![GiantBoard en paquete](/posts/category/database/images/IMG_6750-768x1024.png)

Espera, ¿cabe todo en esa bolsita? Si. No solo eso, ¡hay varias partes en esa bolsa! Y me doy cuenta (ahora) de que no hay escala para esa bolsa en la imagen, pero hay un Mac Mouse al lado. Retomaría la foto, ¡pero ya tiré las bolsas!

![Piezas de tablero gigante](/posts/category/database/images/IMG_6752-1-768x1024.png)

Así es: pedí el complemento WiFi Feather Wing porque, después de todo, ¿qué es una placa IoT, y especialmente qué es un servidor InfluxDB, sin redes?

![Tablero gigante con ala de plumas](/posts/category/database/images/IMG_6754-1-768x1024.png)

Y solo por escala, eso es un trimestre de EE. UU. Entre ellos. ¡Así que ese será mi servidor*y* mi interfaz de red! Para algo llamado 'Tablero gigante', ¡seguro que es pequeño!

Después de soldar un poco, lo armé todo y, con la adición de una tarjeta MicroSD, ¡arrancó!

![Línea de comando con inicio de sesión en el tablero gigante](/posts/category/database/images/Screen-Shot-2020-02-11-at-9.04.12-AM.png)

¡Woah! ¿Esta pequeña cosa ejecuta Debian Linux? ¡Por qué sí, sí lo hace! Eso hace que [instalar InfluxDB](https://docs.influxdata.com/influxdb/v1.7/introduction/installation/) sea súper simple, ya que ya enviamos archivos binarios ARMv7 para InfluxDB y todo el resto de la [TICK Stack](https://www.influxdata.com/time-series-platform/)!

![Terminal que muestra influxd funcionando](/posts/category/database/images/Screen-Shot-2020-02-11-at-9.07.54-AM.png)

Ok, seguro, actualmente está martillando esta pequeña CPU, ¡pero también se está ejecutando!

![toma en vivo de un tablero en el tablero gigante](/posts/category/database/images/Kapture-2020-01-21-at-12.22.19-1024x372.gif)

Y como puede ver, el tablero se ejecuta en [Chronograf](https://www.influxdata.com/time-series-platform/chronograf/) para darme una vista de cómo se está ejecutando todo.

Ahora, ¿ejecutaría esto como un sistema de producción? ¡Absolutamente no! Como puede ver, está usando demasiados recursos del sistema en un dispositivo tan pequeño. ¿Lo ejecutaría como un dispositivo de reenvío y recopilación perimetral? Muy posiblemente. ¿Lo ejecutaría como un dispositivo de agente [Telegraf](https://www.influxdata.com/time-series-platform/telegraf/) integrado? 100% absolutamente. Especialmente porque también puedo hacer esto con él:

![Tablero gigante funcionando con batería](/posts/category/database/images/IMG_6779-768x1024.png)

Así es, ¡puedo ejecutarlo con batería! Una batería LiPo recargable (¡y el circuito de recarga está integrado en la placa!). Y para completar, proporcionaré un pin-out aquí para que pueda ver qué * más * puedo agregar a esto (sensores, actuadores, etc.) para convertirlo en un nodo de datos y un nodo de sensor:

![Mapa de pines de tablero gigante](/posts/category/database/images/giant-board-pin-out-1024x690.png)

A continuación, construiré una versión de InfluxDB 2.0 para ARMv7 y veré si funciona mejor o peor en este dispositivo, ¡así que mire este espacio para ver qué sucede!
