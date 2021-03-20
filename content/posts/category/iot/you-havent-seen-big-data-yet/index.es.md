---
title: "Usted no ha visto grandes datos embargo"
Date: 2017-06-23
Author: davidgs
Category: Evangelism, IoT, Misc
Tags: Big Data, IoT
Slug: you-havent-seen-big-data-yet
hero: images/JuvenileGraySquirrel_ChristineHaines.jpg
---

Sí, lo sé, "Big Data" como una palabra de moda es tan hace 5 minutos. El mundo de la tecnología se AÑADIR crónicos y con tendencia a la distracción por el siguiente objeto brillante (Oh! Mira, la IO !, Espere, AI! ARDILLA !!) Pero estancia conmigo en esto. Todo está conectado. He estado diciendo desde al menos 2005 (espalda cuando grandes volúmenes de datos fue la moda) que usted no ha visto datos realmente grandes hasta la IO realmente se pone en marcha con toda su fuerza. Los medios sociales es bastante prolífica - una media de 6.000 tweets por segundo, o la mitad de mil millones de tweets por día. Eso es una gran cantidad de datos. Pero es cacahuetes. Digamos que tiene una implementación IO industrial seguimiento de 1.000 máquinas. Cada máquina está proporcionando telemetría en 7 u 8 parámetros. Es el registro que telemetría 2 - 3 veces por segundo. Eso es de 16.000 por segundo. De ** ** Una fábrica. Ahora digamos que usted tiene 10 fábricas en todo el mundo. 160.000 por segundo. Trata de estar al corriente. No, en serio, sólo tratar.

Aquí está mi regla de la IO, de nuevo: Cualquier cosa que se basa en el número de personas en el planeta es superior límites limitados. Cuando por primera vez dicho esto en el año 2004 Sol (un momento de silencio, por favor) había licencia de Java en 1 mil millones de teléfonos móviles. Incluso si todos los seres humanos llevada a 4 teléfonos celulares, que habría sido sólo 24 mil millones de dispositivos (población en ese momento era uno; y 6 mil millones). Un mercado limitado.

IO no se basa en el número de personas en el planeta, sino en la cantidad de cosas * * y por lo tanto no es necesariamente acotada superior. Piense en eso - no hay límites superior - que se aplica a los dispositivos y por lo tanto el flujo de datos. Ahora la promesa de sistemas de IO es proporcionar en tiempo real, los datos procesables. Y realmente, ¿por qué ir a la hora y el costo de la implementación de un sistema IO si no se va a hacer algo con el torrente de datos que proporcionará. Incluso mejor que limitarse a proporcionar datos procesables está proporcionando en tiempo real ** ** inteligencia procesable.

El problema es, claramente, ¿cómo se hace realmente cualquier tipo de análisis de datos razonable en 160.000 puntos de datos por segundo? Eso es de 9,6 millones por minuto. Eso es la mitad de mil millones por hora. Así que eso es todo el feed de Twitter por día a cada hora. Cada. Hora.

En este momento, esto no es algo que la mayoría de personas en el mundo están abordando la IO, o incluso hablando. ¿Por qué? Porque, obviamente, no tienen una solución para ello. ¡Mirar! ¡ARDILLA! Simplemente no hablaremos de eso.

Pero me topé con algo. Algo realmente bastante asombroso. Algo que realmente resuelve este problema de la manera más elegante. ¿Y si pudiera esfuerzo de consulta y visualizar un conjunto de datos de mil millones de filas de datos? En tiempo real. Se llama [MAPD](http://mapd.com). Es una base de datos que se ejecuta en las GPU, CPU no (aunque se puede ejecutar en las CPU si quieres un rendimiento más lento). GPU hacen realmente ** ** muy bien en la paralelización de procesamiento de datos y de gráficos del curso.

Así que veamos justo en uno de sus demos [](https://www.mapd.com/demos/). Son los movimientos de los barcos en los EE.UU. entre 2009 y 2015. Todos ellos. Every.Single.One. Más de 11 mil millones de registros de datos geoespaciales.

![Gráfico de todos los movimientos de los barcos](/posts/category/iot/images/Safari029.jpg)

Eso es una fotografía tomada, pero si vas a jugar con la demo usted encontrará que se puede profundizar a través de los datos. ** ** Camino hacia abajo en los datos. Mi mejor amigo es un capitán del remolcador. Él ha estado trabajando en el nuevo puente Tapanzee durante los últimos 5 años. Así que decidí ver lo que pude ver lo que estaba pasando allí.

![identificación del buque individual](/posts/category/iot/images/Safari028.jpg)

He encontrado su remolcador. También encontré su remolcador, y los barcos de orden público, de la noche a alguien saltó desde el puente y todos ellos corriendo a encontrarlos. Y es una perfecta, experiencia fluida, envolvente.

¡Absolutamente increíble! Ahora, si pueden hacer eso con 11 mil millones de registros geoespaciales de barcos, bueno, entonces eso no es demasiado lejos de una días de datos en mis ejemplos anteriores. Eso le permite visualizar realmente sus datos de entrada en tiempo real, y que sea procesable. Eso hace que la IO realidad práctica y útil. ¡Finalmente!
