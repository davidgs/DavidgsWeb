---
title: "Rev'ing el hardware de demostración"
Date: 2019-06-05
Author: davidgs
Category: Evangelism, Gadgetry, IoT
Tags: IoT
Slug: reving-the-demo-hardware
hero: images/IMG_5478.jpeg
reading_time: 3 minutes
---

Si me has estado leyendo durante cualquier periodo de tiempo en absoluto, usted sabrá que construyo un montón ** ** de proyectos de hardware pequeños. ¿Qué mejor manera de poner de relieve las capacidades de IO de InfluxDB que al hardware de generación que escribe datos en ello constantemente! Pero algunos de mis demostraciones de hardware han estado recibiendo de edad, y algunos de ellos han sido cada vez abusado, así que decidí que era hora de renovar con un poco de hardware nuevo, estoy incluso ir a hacerlos totalmente inalámbrica mediante la adición de LiPo baterías por lo que puede ir móvil durante las presentaciones y demostraciones!

Muchos de mis demos se han basado en la confianza (y muy barato) Wemos D1, construido alrededor del ESP-8266. Cuando digo muy barato, me refiero a menos de $ 3.00 US cada uno, por lo que suelen comprar por docenas. Sin embargo, hay problemas con ellos. En primer lugar, no son 100% fiables, y ellos fallan con relativa regularidad. Es por eso que comprar en grandes cantidades! Además, son, por naturaleza, inseguro. Así que estoy en movimiento a los sistemas basados en ESP32. Son un poco más potente, y tan fácil de construir fuera de. Pedí algunas de las ESP-32 Plumas de Adafruit principalmente porque vienen con un sistema incorporado en el circuito de carga para las baterías LiPo. Afortunadamente, el código que se ejecuta en el ESP8266 se ejecuta sin cambios en el ESP32, por lo que al menos yo no tenía nada en el puerto.

Si me siguen en twitter (y si no, ¿por qué no ?!), entonces puede haber visto mi reciente pantalla de 7 segmentos, que lee datos de un corredor de MQTT (alimentado por InfluxDB. Más sobre esto en otro post!) Y la muestra . ! [IMG 5243](/posts/category/iot/iot-hardware/images/IMG_5243.jpeg)

Muy bien, pero le faltaba un par de cosas. Una cosa era la capacidad de decir lo que * * se está visualizando! Es decir, los datos es grande y todo, pero sin contexto, de los números sólo. Pero, ¿cómo hacer frente a eso? Entrar en la pantalla de 14 segmentos que puede mostrar casi cualquier carácter alfanumérico, y tiene la misma apariencia que los displays de 7 segmentos.

![IMG 5478](/posts/category/iot/iot-hardware/images/IMG_5478.jpeg)

Pero si has visto mi tablero de instrumentos, se dará cuenta de que hay una gran cantidad de otros datos allí, y sería bueno poder cambiar lo que se muestra.

![Captura de pantalla 2019 06 04 a las 3 pm 14 53](/posts/category/iot/iot-hardware/images/Screen-Shot-2019-06-04-at-3.14.53-PM.png)

Yo ya había hecho el dispositivo capaz de cambiar los datos basados en otro mensaje MQTT, pero quería algo que era más fácil de tratar. Introduzca el botón táctil. Compré un montón de ellos en un montón de colores, y ...

![IMG 5477](/posts/category/iot/iot-hardware/images/IMG_5477.jpeg)

Ahora tenemos botones para cambiar los datos que estamos haciendo!

Por supuesto, esto significa que voy a tener que re-diseño y re-imprimir la caja, pero eso es sólo una<checks notes> trabajo de impresión 9,5 horas. El resultado final será una pantalla de datos portátil, inalámbrico, con una leyenda juego de lo que se muestra, con una batería de 2500 mAh Li-Po para que pueda pasar alrededor. Ahora bien, para evitar que la gente caiga y maltratarla. casos impresas en 3D no son tan resistentes como la gente parece pensar que son!

Voy a publicar imágenes del aparato final de mi feed de Twitter, por lo que es mejor que vayas [sígame](https://twitter.com/intent/follow?screen_name=davidgsIoT)!
