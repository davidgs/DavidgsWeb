---
title: "Intel Edison gran sombrero ningún ganado"
Date: 2015-12-11
Author: davidgs
Category: IoT
Slug: intel-edison-big-hat-no-cattle
hero: images/NewImage.png
---

Fue hace casi exactamente un año que compré mi primer kit de desarrollo de Intel Edison. Estaba todo entusiasmados con las perspectivas de la misma, como se puede ver [aquí](/posts/category/iot/iot-hardware/intel-edison-iot-board/). Es un bonito, pequeño, de gran alcance (si hambriento de poder) tabla de IO que mantenía una gran promesa para el desarrollo y creación de prototipos.

Me gustaría ser todavía tan emocionados por ello.

He tratado, un par de veces, para usarlo durante algún proyecto de desarrollo u otro. Incluso estoy tratando de nuevo ahora. Mi experiencia ha sido menos que positiva. De hecho, se ha francamente decepcionante. Ahora, uno de mis [quejas iniciales](/posts/category/iot/iot-hardware/intel-edison-iot-board/) sobre la plataforma fue la facilidad de uso y el proceso no intuitivo para flashear / actualización / etc . el tablero. Para ser justos, Intel ha trabajado en esto, y ahora hay algunas herramientas bastante decente para la gestión de la junta.

Una vez dicho esto, no es mucho más que ** ** no funciona en este tablero que hace. Por ejemplo, SPI. Que se ha configurado de una grande, para mí. Pasé alrededor de un mes de trabajo en conseguir un dispositivo SPI para el trabajo con la junta y me encontré con nada más que problemas. Repetidos mensajes a los Foros de desarrolladores de Intel provocaron una serie de respuestas crípticas que indican que estaba enganchando las cosas de forma incorrecta, el dispositivo SPI no estaba funcionando correctamente, etc * se * un dispositivo experimental, por lo que esas cosas eran plausibles. Hasta que llegué a un analizador lógico y, de hecho depurado las señales que salen de la Edison. Entonces se hizo muy claro que SPI en el tablero del desbloqueo del Mini se rompió irremediablemente. En ese momento, Intel reconoció que SPI estaba roto. Podrían haberme ahorrado un montón de tiempo que habían copped a la anterior. Así SPI está fuera.

Ok, SPI se rompe sin remedio. I2C try de let. Hasta el momento, la experiencia con I2C ha sido más o menos similar. Me gustaría decir que resistencias pull-up internas que tienen sobre los pasadores que puedo establecer los valores pre-definidos es bastante útil. Documentación sobre I2C - y las resistencias pull-up - como toda la documentación Edison, es bastante delgado, pero si usted es persistente en buscar en la web, encontrará las respuestas que necesita (Pista: `cd / sys / kernel / debug / gpio_debug /<pin number> `Y luego buscar en` available_pullmode`, `available_pullstrength` de valores aceptables, a continuación, poner el valor que desee en` `current_pullmode` y current_pullstrength`. Nunca decir que no estaba atento.)

Me dio la SDA / resistencias pull-up SCL fijados correctamente, y el conjunto de la dirección correcta, y el dispositivo que estoy trabajando ahora es al menos ** ** visto en el bus I2C. Pero eso es lo más lejos que puedo conseguir. En teoría, el bus I2C tiene varias velocidades, pero en realidad está bastante bien pegada a 300 kHz. El dispositivo es de 100 kHz. Una vez más, en teoría, se puede cambiar la velocidad, pero en realidad, al menos de acuerdo a todos los mensajes y las respuestas, la única manera de hacer efectiva esta es la reconstrucción de todo el núcleo de Linux, e incluso entonces, tu caso es distinto.

No hace falta decir que mi kilometraje varió. He intentado usar Javascript (Node.js), Python, C y bocetos de Arduino para acceder al bus I2C y este dispositivo y cada uno falla - en formas completamente diferentes. Eso no es una buena cosa.

El dispositivo que estoy usando, un [Melexis MLX90614](https://www.sparkfun.com/datasheets/Sensors/Temperature/MLX90614_rev001.pdf) (PDF) termómetro IR, también tiene un modo PWM. Ok, la última oportunidad de Edison. El juego!

¿Adivina qué? Intel Edison sólo lo hace PWM a cabo. Sin PWM. Así que no puede leer el dispositivo. Si se tratara de un servo, estaría todo listo. Pero no lo es. Así, una vez más, creo que el Intel Edison estar lleno de promesas, sin capacidad de entrega.

Voy a seguir golpeando lejos en él, y ver si finalmente puedo conseguir el Edison pueda hacer algo útil, pero hasta el momento, es un dispositivo pequeño y lindo, que no es ni un poco útil. Potente, pero inútil.
