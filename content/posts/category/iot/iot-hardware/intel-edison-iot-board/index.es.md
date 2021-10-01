---
title: "Junta IO Edison Intel"
Date: 2014-12-04
Author: davidgs
Category: IoT
Tags: development, gadgets, hardware, IoT
Slug: intel-edison-iot-board
hero: images/Edison-module.jpg
reading_time: 3 minutes
---

He estado leyendo sobre la placa de desarrollo de Intel Edison por un tiempo. Estoy haciendo más cosas IO nuevo - puramente por diversión, ya que nadie me está pagando para hacerlo - y recientemente he adquirido el kit de desarrollo eléctrica IMP y este kit Intel Edison, así como un kit Arduino. La placa Intel Edison es, con mucho, el más poderoso de todos. Es un dispositivo IO SoC que parecía ser muy capaz.

Algunos “velocidades y avances” datos:

- de doble núcleo, CPU de doble roscado 500 MHz Intel Atom combinado con un 100MHz32 bits microcontrolador Intel Quark
- 1 GB de RAM
- 4 GB de almacenamiento flash
- 2.4GHz y 5.0GHz WiFi con la antena instalada
- Bluetooth 4.0

Eso es bastante impresionante. Es un poder poco de hambre, con una tensión de 13MW de espera (21,5 mW con Bluetooth, WiFi con 35 mW) pero aún dentro de lo razonable. Las capacidades de E / S son también bastante fuerte:

- 20 Digital I / O incluyendo 4 PWM
- 6 entradas analógicas
- 1 UART (Rx / Tx)
- 1 I ^ 2 ^ C
- header SPI 1 6-pin
- Conector de la tarjeta SD

Eso le da mucha ** ** de opciones para sensores y actuadores! He jugado con él algunos, pero no mucho hasta ahora. Aquí está la pornografía desembalaje requerido:

![IMG 1564](/posts/category/iot/iot-hardware/images/IMG_1564.jpg)

![IMG 1566](/posts/category/iot/iot-hardware/images/IMG_1566.jpg)

![IMG 1567](/posts/category/iot/iot-hardware/images/IMG_1567.jpg)

Algunas cosas extrañas acerca de este dispositivo: Se requiere que ambos puertos ** micro-USB ** estar conectados con el fin de sacar el tema y acceder a ella desde su ordenador portátil. Eso es simplemente extraño. Y un dolor para mí, ya que sólo tiene cables micro-USB relativamente cortos, y un puerto USB en cada lado de mi portátil.

Soy un poco de un purista de la facilidad de uso y una baja barrera de entrada, y en este frente, Edison necesita mucho * * de trabajo. Sólo tienen un tutorial 'Introducción' de la tarjeta de expansión de Arduino (compré el otro tablero * * expansión, por supuesto). El acceso, intermitente, etc el tablero no es intuitiva y la documentación es complicado y difícil. Terminé en los foros de usuarios donde los usuarios regulares han publicado ** ** mucho más recetas recta de avance y las instrucciones. Sí, yo soy parcial, mientras escribía la famosa aplicación del punto de Sun Manager para gestionar el SDK y el firmware en los dispositivos Sun SPOT, y no puedo esperar que todos tienen como una interfaz intuitiva y fácil de usar punto de entrada para los desarrolladores, pero ... espere, ¿por qué no puedo ** ** espero que? ¿Por qué los desarrolladores no esperan que esto? Puede que, simplemente, pasar un día este fin de semana y uno de escritura.

Una de las cosas realmente bueno es que puedo programar este dispositivo usando Node.js en Javascript. Hay rumores de que se ejecute Java, así, pero no he tenido tiempo para conseguir que instalado todavía. Te dejaré saber tan pronto como me figura que uno!

 
