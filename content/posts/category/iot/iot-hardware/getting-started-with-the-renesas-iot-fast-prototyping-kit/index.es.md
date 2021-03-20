---
title: "Introducción a la Renesas IO Prototipos Kit Rápido"
Date: 2017-07-25
Author: davidgs
Category: Evangelism, Gadgetry, IoT
Tags: IoT, Prototyping, Renesas
Slug: getting-started-with-the-renesas-iot-fast-prototyping-kit
hero: images/Safari041.jpg
---

He tenido la intención de llegar a esto por un par de semanas, y he sido abordado por un montón de otras cosas que seguía apareciendo, pero he estado trabajando lejos con estos, y pensé que había puesto al menos una inicial publicar sobre estos kits. [Renesas](https://www.renesas.com/en-us/) era lo suficientemente amable para darme tanto el) era lo suficientemente amable para darme tanto el [S3 IO rápida de prototipos Kit](https://www.renesas.com/en-us/products/software-tools/boards-and-kits/renesas-synergy-kits/renesas-synergy-s3a7-prototyping-kit.html) y la) y la [S7 Starter Kit](https://www.renesas.com/en-us/products/software-tools/boards-and-kits/renesas-synergy-kits/renesas-synergy-sk-s7g2.html), ambos de los cuales son muy agradables juntas ** ** realmente para hacer la IO prototipos. Voy a empezar con el S3 IO FPT (Fast Prototyping Kit). En primer lugar, por supuesto, es el unboxing!

![IMG 3095](/posts/category/iot/iot-hardware/images/IMG_3095.png)

Y lo que hay en la caja:

![IMG 3098](/posts/category/iot/iot-hardware/images/IMG_3098.png)

Y lo que es en las bolsas:

![IMG 3099](/posts/category/iot/iot-hardware/images/IMG_3099.png)

![IMG 3100](/posts/category/iot/iot-hardware/images/IMG_3100.png)

![IMG 3101](/posts/category/iot/iot-hardware/images/IMG_3101.png)

A continuación, un resumen rápido de lo que hay en el tablero / en el cuadro:

- tablero de Renesas MCU S3A7
- New Haven 2.4" Pantalla táctil
- Módulo Sensor AMS Ambiental
- La temperatura
- Humedad
- Calidad del aire
- proximidad
- Encendiendo
- Módulo de sensor de movimiento Bosch
- Acelerómetro
- eCompass
- magnetómetro

Además de un montón de otras cosas de a bordo, como SPI, rápido para imágenes gráficas, etc., y una aplicación de iOS aseado para demostraciones. Realmente aprecio que tablita Segger J-Link también. No es que yo no tengo una pequeña y creciente colección de programadores JTAG, pero siempre es bueno tener otra opción!

## Ejecución de la demostración

La tarjeta viene con una demostración instalada, por lo que decidí para ejecutarlo. Se llama la [Chef Demo](http://renesas-blog.mediumone.com/renesas-s3a7-fast-iot-prototyping-kit-with-smart-chef-demo-quick-start-guide/) y desde ese tutorial es bastante completo y fácil de seguir, no voy a volver a crearlo aquí. Sólo tienes que ir a través de las sencillas instrucciones de instalación en la pantalla táctil de la demostración y:

![IMG 3103](/posts/category/iot/iot-hardware/images/IMG_3103.png)

y se le multa. Una vez que tenga la junta configurado, puede iniciar sesión en el tablero de instrumentos en el sitio Renesas (en realidad, es alimentado por mis viejos amigos en [Bug Laboratorios](https://buglabs.net)! Hola chicos !!) Una vez que la configuración y funcionamiento , que tenía un buen cuadro de mandos se ejecuta con la salida de los datos de los sensores:

![Safari040](/posts/category/iot/iot-hardware/images/Safari040.jpg)

¡Eso es muy agradable! El siguiente en ese frente es redirigir la salida de las lecturas de los sensores a mi [InfluxDB tablero de instrumentos](/posts/category/iot/iot-hardware/running-influxdb-on-an-artik-520/).

También hay un editor de buen flujo de trabajo como parte del salpicadero que parece un montón, como [node-RED](https://nodered.org) a mí.

![Safari041](/posts/category/iot/iot-hardware/images/Safari041.jpg)

Estoy deseando a excavar en que un poco más profundo y re0directing la salida.

## El desarrollo de la Junta

Una palabra de advertencia para aquellos de ustedes por ahí (como yo) que son cabezas de Mac: Es imprescindible ** ** tiene una máquina virtual de Windows en el que ejecutar estas cosas. El Estudio de Renesas (que es una variante del Eclipse) ** ** sólo se ejecuta en Windows. Esto hizo qué complicar las cosas para mí un poco desde mi máquina virtual de Windows es un poco de un desastre en este momento, pero es todavía vale la pena.

Una de las cosas más bonitas que me di cuenta de inmediato fue la capacidad de hacer algunos realmente agradable personalizaciones a nivel de placa derecho en la herramienta. Hay una herramienta de configuración del paquete que le da una vista de todos los bolos que sale del paquete MCU, y se puede convertir pines de encendido / apagado, etc., dependiendo de sus necesidades. Si estás de prototipos para una aplicación específica, y un plan para fabricar las placas en la línea, esta es una característica muy útil. Me refiero ** ** realmente útil! Estoy en medio de un diseño de PCB en este momento con otro módulo MCU que no tiene una herramienta de este tipo, y vamos por muchas cosas tratando de averiguar lo que necesita ser llevado a cabo a dónde, qué tiene que ser bajo atado, de alta atado, etc. a fin de no causar un fallo. Es bueno ser capaz de convertir un solo pasador fuera y olvidarse de él!

![E2studio002](/posts/category/iot/iot-hardware/images/e2studio002.jpg)

El IDE también tiene algunas otras características agradables que le permite ver lo que se incluyen paquetes, etc., así como algunas características de configuración agradables.

![E2studio001](/posts/category/iot/iot-hardware/images/e2studio001.jpg)

Como se habrán dado cuenta de que se está ejecutando el [ThreadX](http://rtos.com/products/threadx/) RTOS para que pueda obtener la ejecución de subprocesos múltiples con poca dificultad o sobre la cabeza - bueno, que no sea el material estándar cuando usted está escribiendo aplicaciones de subprocesos múltiples.

Una de las otras cosas que noté, y sólo porque lo estaba haciendo durante tanto tiempo con el [Proyecto MyNewt Apache](https://mynewt.apache.org/), fue la inclusión de los paquetes de soporte de planchar - BSP. h, bsp.c, etc - que parece que se podría utilizar para tener un buen comienzo en la fabricación de una de estas tarjetas funcionan MyNewt OS. Si usted está en ese tipo de cosas.

La adición de la junta a mi WiFi y configurar también se simplifica gracias a la pantalla táctil que tiene a bordo.

Puede ser un poco difícil de leer, pero es una interfaz sencilla para configurar la conexión Wi-Fi a bordo para conectar a mi SSID. a través de un servidor web a bordo:

![Safari038](/posts/category/iot/iot-hardware/images/Safari038.jpg)

Y lejos que vaya!

## Conclusión

Hay mucho más que ir aquí, y voy a llegar a la escritura real y el despliegue de código en este tablero en breve. Teniendo en cuenta que se trata con todos estos sensores fresco, y como tengo esta [agradable de series de tiempo manejador de base de datos](/posts/category/iot/iot-hardware/running-influxdb-on-an-artik-520/), I 'll estar haciendo algo para recoger un montón de datos ambientales y transmitir de nuevo a mi servidor. Una vez más, el primer paso será volver a dirigir la producción de demostración a mi propia base de datos de series de tiempo, a continuación, escribir una aplicación que lo hace directamente.
