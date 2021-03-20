---
title: "La construcción más pequeño servidor InfluxDB del mundo"
Date: 2020-02-13
Author: davidgs
Category: Gadgetry, IoT, Work
Slug: building-the-worlds-smallest-influxdb-server
hero: images/giant-board-pin-out-1024x690.png
---

He construido una gran cantidad de servidores [InfluxDB](https://www.influxdata.com/products/influxdb-overview/) en mi tiempo aquí, y he construido algunas bastante esotéricos en eso, pero creo que Por fin has arrancado lo que sólo puede ser descrito como más pequeño InfluxDB servidor del mundo! En el verano de 2019, vi un proyecto sobre) en mi tiempo aquí, y he construido algunas bastante esotéricos en eso, pero creo que Por fin has arrancado lo que sólo puede ser descrito como más pequeño InfluxDB servidor del mundo! En el verano de 2019, vi un proyecto sobre [CrowdSupply.com](https://www.crowdsupply.com/groboards/giant-board) para algo que se llama la 'Junta Gigante'. Se veía muy, muy cool! Una completa Junta único equipo (SBC) que corría Linux, todo ello en un factor de forma de pluma. De inmediato lo respaldó! Entonces, pensando en ello por un segundo, hice una copia de él * * nuevo! Así que me dieron 2 de estas cosas. accidente total, lo juro.

Algunas de las especificaciones. Esto es lo que la Junta gigante en realidad es:

** ** Junta gigante Especificaciones:

- ** ** Procesador: ARM ® Microchip SAMA5D2 Cortex®-A5 procesador de 500 MHz
- ** ** Memoria: 128 MB de memoria RAM DDR2
- ** ** almacenamiento: tarjeta microSD
- ** Sensing **: 6 x 12-bit ADC con 3,3 V de referencia y de disparo externo
- ** El accionamiento **: PWM 4 x 16 bits con disparador externo
- ** Conectividad **: 1 x I²C, 1 x SPI, 1 x UART, más con Flexcom
- Potencia ** **: a través de USB, con soporte para baterías LiPo
- ** ** Sistema Operativo: principal de Linux kernel

Todo en este pequeño factor de forma que suelo usar para microcontroladores!

Bueno, hace unas semanas, llegaron! fotos así, algunos unboxing:

![GiantBoard en el paquete](/posts/category/database/images/IMG_6750-768x1024.png)

Espere, todo encaja en esa pequeña bolsa? Si. No sólo eso - hay varias partes en la bolsa! Y me doy cuenta (ahora) que no hay escala para esa bolsa en la imagen, pero eso es un ratón Mac junto a él. Me volver a tomar la foto, pero yo ya tiré las bolsas de distancia!

![Junta gigante de piezas](/posts/category/database/images/IMG_6752-1-768x1024.png)

Así es: Pedí el WiFi ala de la pluma complemento, ya que, después de todo, ¿qué es un tablero de la IO - y sobre todo lo que es un servidor InfluxDB - sin red!

![Junta gigante con alas de plumas](/posts/category/database/images/IMG_6754-1-768x1024.png)

Y sólo por la escala, que es un cuarto de Estados Unidos en medio de ellos. Así que va a ser mi servidor * * y mi interfaz de red! Para algo que se llama la 'Junta gigante' seguro que es pequeña!

Después de un poco de soldadura, lo tenía todo junto put y, con la adición de una tarjeta MicroSD, que arranca!

![línea de comandos de inicio de sesión con la Junta gigante](/posts/category/database/images/Screen-Shot-2020-02-11-at-9.04.12-AM.png)

Woah! Esta pequeña cosa pequeña corre Debian Linux? ¿Por qué sí, sí lo hace! Por lo que hace que la instalación de [InfluxDB](https://docs.influxdata.com/influxdb/v1.7/introduction/installation/) super sencillo, puesto que ya enviamos binarios ARMv7 para InfluxDB y todo el resto de la) super sencillo, puesto que ya enviamos binarios ARMv7 para InfluxDB y todo el resto de la [TICK Pila](https://www.influxdata.com/time-series-platform/)!

![mostrando Terminal influxd consecutivo](/posts/category/database/images/Screen-Shot-2020-02-11-at-9.07.54-AM.png)

Ok, seguro, es actualmente el martilleo esta pequeña CPU, sino que también está en marcha!

![tiro directo de un panel de control en la Junta gigante](/posts/category/database/images/Kapture-2020-01-21-at-12.22.19-1024x372.gif)

Y como se puede ver, se ejecuta el tablero de instrumentos en [Chronograf](https://www.influxdata.com/time-series-platform/chronograf/) me dan una visión de cómo está funcionando todo el asunto!

Ahora, voy a ejecutar este como un sistema de producción? ¡Absolutamente no! Como se puede ver, se está utilizando demasiados recursos del sistema en un dispositivo tan pequeño. Iba a funcionar como una colección de borde y dispositivo de reenvío? Muy posiblemente. Iba a funcionar como una [Telegraf](https://www.influxdata.com/time-series-platform/telegraf/) Dispositivo agente incorporado? 100% absolutamente. Sobre todo porque también puedo hacer esto con él:

![Junta gigante que se ejecuta en la batería](/posts/category/database/images/IMG_6779-768x1024.png)

Así es, que puedo ejecutarlo en una batería! Una batería recargable de Li-Po en ese (y los circuitos de recarga está integrado en el tablero!). Y para completar, voy a proporcionar un pin de salida aquí para que pueda ver lo que el mundo * que puedo añadir a esto - sensores, actuadores, etc., - para que sea tanto un nodo de datos y un nodo sensor:

![Junta gigante mapa pinout](/posts/category/database/images/giant-board-pin-out-1024x690.png)

A continuación voy a construir una versión de InfluxDB 2.0 para ARMv7 y ver si se ejecuta ya sea mejor o peor en este dispositivo, así que cuidado con este espacio para ver qué pasa!
