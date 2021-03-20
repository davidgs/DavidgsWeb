---
title: "Algunos cálculos Menor IO"
Date: 2015-01-30
Author: davidgs
Category: IoT
Tags: Batteries, IoT, power
Slug: minor-iot-calculations
hero: images/Critical-Battery-Icon-old-laptop.jpg
---

## Las baterías serán un factor limitante en los despliegues de la IO

Hay una gran cantidad de publicidad sobre la Internet de los objetos (IO) como he [dicho](/posts/category/general/here-comes-iot-ready-or-not/)) [en repetidas ocasiones](/posts/category/iot/is-iot-happening-or-not-in-2015/) - y como cualquiera que leer nada acerca de la tecnología de hoy en día ya se sabe. Hay tecnología portátil, no hay cuidado de la salud de la IO, hay M2M IO y una serie de otras áreas de la IO que se proyectan a explotar todo lo largo de los próximos 10 años. Los mil millones y mil millones de dispositivos son de pronóstico. Tal vez billones. Esos son números enormes y son emocionante para cualquier persona que trabaje en el campo, o incluso la observación de la misma. Pero hay un problema. Poder.

Un gran problema. Poder. ¿Cómo vamos a alimentar estos mil millones de dispositivos? Algunos de ellos, por supuesto, serán propulsados con sólo conectar en una fuente de alimentación constante. Vamos a ignorar esos. Un buen número de ellos - posiblemente la mayoría de ellos - será pequeños dispositivos embebidos - llevar encima, una gran cantidad de dispositivos médicos, sensores ambientales, sensores remotos, etc. - que tendrá que ser alimentado por baterías. Y no es su problema. Baterías. Las porciones de las baterías. Barco de carga de las baterías.

Pasé un montón de tiempo, de vuelta en el día, la investigación de baterías para que la plataforma Sun SPOT para lograr un equilibrio entre el tamaño y el peso, y la capacidad. Ah, y el precio. Las baterías pueden ser costosos. Muy caro. Sin embargo, el tamaño y el peso y la capacidad de las baterías no es ni siquiera va a ser el mayor problema con el Internet de las cosas. Hay un montón de investigación en curso en todo el mundo para hacer baterías más pequeñas, más potente y más eficiente. No, sólo el número ** ** pura de las baterías va a ser el problema. Y es un problema que no hay suficientes personas están pensando, y casi nadie está hablando.

Esto es lo que quiero decir. Tomemos el número común de 20 - 30 mil millones de dispositivos IO en línea para el año 2020. [Gartner](http://www.gartner.com/newsroom/id/2636073),), [Forrester](https://www.forrester.com/There+Is+No+Internet+Of+Things+8212+Yet/fulltext/-/E-RES101421) (de pago) de pared,) (de pago) de pared, [IDC](http://www.idc.com/getdoc.jsp?containerId=248451),), [óvulo](http://www.computerweekly.com/news/2240238915/Lot-of-nonsense-touted-about-IoT-says-analyst), y casi todos los demás están usando este número y yo no quiero discutir, por lo que sólo tendremos que tomar esto como un hecho y vamos con 20 mil millones de dispositivos. Ahora digamos que aproximadamente la mitad de estos dispositivos será alimentado por la red, y no necesita una batería. Así que estamos ahora quedamos con 10 mil millones de dispositivos con baterías. Algunos dispositivos pueden ir un año o más en una sola batería. Algunas sólo pueden ir un par de semanas. Así que vamos a, pongamos por caso, decir que la media es que aproximadamente un tercio de los dispositivos tendrá que tener su batería cambió en el transcurso de un año. Eso parece razonable.

Sí, parece razonable, hasta que lo haga el siguiente cálculo:

> 20B ÷ 2 = 10B - el número de dispositivos de la batería-dependiente.

> 10B ÷ 3 = 3.4B - el número de baterías que tendrán que ser cambiado en un año.

> 3.4B ÷ 365 = 9,1 M - el número de baterías que tendrán que ser cambiado cada día.

¿Ves el problema ahora? Pero se pone peor. Mucho peor.

Ahora vamos a escala que a un billón de dispositivos - un número que se utiliza a menudo cuando se habla de la IO. Infierno, * I * He estado usando ese número a mí mismo desde el año 2004!

> 1T ÷ 3 = 333B - digamos Vamos a sólo un tercio de estos dispositivos ahora las baterías necesitan.

> 333B ÷ 3 = 111B - El número de baterías que tendrá que ser cambiado en un año.

> 111B ÷ 365 = 304M - el número de baterías que tendrá que ser cambiado cada. único. día. Eso es 34K baterías por hora.

Teniendo en cuenta estas cifras, la IO se colapsará bajo su propio peso. Ahora, si usted es una empresa de la batería, estoy seguro de que esos números son bastante tranquilizadores, pero para aquellos que buscan la forma en que la IO en realidad la función, es evidente que esos números no son sólo insostenible, pero son completamente inviable. Vamos a necesitar un ejército de personas que no hacen más que ir de un dispositivo a cambiar las pilas, las 24 horas del día, 7 días a la semana, con el fin de mantener el ritmo. (Para aquellos que juegan el juego en casa, eso es 34,000+ baterías por hora, cada hora).

Es evidente que necesitamos otra solución. La gran pregunta es ¿por qué ** ** está nadie en el campo de la IO hablando de esto? ¿Por qué hay silencio de radio en este avecina, agobiante problema de la IO? Hay sólo unas pocas personas selectas que trabajan en algunas soluciones a este problema de la batería. Si estás en la IO, y usted no está pensando ya en cómo manejar el problema de la batería en su ecosistema, ahora podría ser el momento para empezar.
