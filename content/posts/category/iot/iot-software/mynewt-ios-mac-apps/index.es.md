---
title: "Mynewt iOS y Mac Apps"
Date: 2016-12-16
Author: davidgs
Category: IoT, Misc, Work
Tags: IoT, mynewt
Slug: mynewt-ios-mac-apps
hero: images/logo.png
reading_time: 3 minutes
---

He estado haciendo un montón de trabajo en la [Mynewt OS](https://mynewt.apache.org) Proyecto sobre la) Proyecto sobre la [Apache](http://apache.org) Software Foundation. Es todavía 'incubar' por lo que aún no es un proyecto de pleno derecho de Apache, pero estamos haciendo un enorme progreso y está saliendo muy bien. De hecho, sólo estamos liberando nuestras primeras versiones beta de la versión 1.0! Si usted es un hacker de la IO, y está buscando un pequeño rápido, altamente configurable (y de código abierto!), RTOS, MyNewt que el billete!

Todo eso se dice, una de las cosas que he estado trabajando en la documentación - que no sea - son demostraciones. Las API de sensores son un trabajo en progreso, pero el progreso ha sido bastante significativo. Tanto es así que yo era capaz de construir una demostración conectar un sensor analógico a un dispositivo Mynewt-powered y empezar a enviar los valores del sensor a cabo a través de Bluetooth!

La configuración básica es un semi NRF52dk desarrollador Junta nórdica Kit, un sensor de nivel de líquido Etape, y un cilindro lleno de agua. El sensor va en el agua, la junta nrf52 lee el sensor y envía el sensor de valores fuera. Voy a escribir un post aparte acerca de la configuración real nrf52, etc. poco, pero que quería escribir un poco acerca de cómo había llegado a ser capaz de leer los valores. TL; DR: Escribí un Mac OS X y una aplicación para iOS que hacerlo!

Uno de los problemas con el envío de datos a través de Bluetooth es que, mientras que el envío de los datos es fácil, lo que el saber qué dispositivo periférico ** ** tipo de sensor es tiende a ser un poco más problemático. He resuelto este problema mediante el establecimiento de dos ** ** bluetooth UUID característicos para cada sensor. La primera, que yo llamo la "Configuración UUID" es una de 16 bits UUID (sí, lo sé, debería usar UUID de 128 bits, pero eso es un dolor) que simplemente lleva una cadena ASCII que describe el sensor. El segundo es un UUID emparejado que llamo los "Datos UUID" y que es una característica NOTIFICAR que llevará a los datos reales. Yo llamo a estos "UUID apareados" y los defino dando el UUID de configuración de un prefijo de "0xDE" y el UUID de datos de un prefijo de "0xBE" Me par de ellos, dándoles tanto el mismo sufijo 'por lo 0xDEAD y 0xBEAD se emparejan por el sufijo común 'AD'.

Esto es lo que que se ve como en la aplicación real:

{{>Youtube vq3FEoaIc9I>}}

Puede cambiar los prefijos en la App, o simplemente suscribirse a todas las características que se encuentran bajo la característica de servicio definido NOTIFICAR. Puede hacer clic en el gráfico de señal RSSI para agregar el valor de RSSI prima a la mesa, o haga clic de nuevo para eliminarlo.

Y la misma aplicación - bueno, casi igual, que comparte una gran cantidad de código! - también se ejecuta en iOS

{{>Youtube tWS7u7ColX4>}}

Creo que están muy bien!
