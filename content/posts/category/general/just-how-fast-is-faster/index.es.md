---
title: "La rapidez es más rápido?"
Date: 2017-03-06
Author: davidgs
Category: General, IoT
Tags: ARTIK, ARTIK-520, Benchmark, Embedded Systems, IoT, Java
Slug: just-how-fast-is-faster
hero: images/Azul.jpg
---

Después de haber instalado y probado el [Zulu Embedded JVM](https://www.azul.com/products/zulu-embedded/) en mi ARTIK-520) en mi ARTIK-520 [esta mañana](posts/category/general/making-artik-5-iot-gateway-kura) me di cuenta de que sentía ** ** más rápido. Se parecía ** ** más rápido. Pero era realmente más rápido? Y si es así, cuánto más rápido? Así que fui en busca de algunas pruebas de referencia de Java para funcionar.

Elegí el [Benchmark DaCapo](http://www.dacapobench.org) para esto. ¿Por qué? Debido a que Google, por eso. Esto es lo que el Índice de Referencia DaCapo dice acerca de sí mismo *:

> Este conjunto de pruebas está pensado como una herramienta para la evaluación comparativa de Java por las comunidades de lenguaje de programación, gestión de la memoria y la arquitectura de computadores. Consiste en un conjunto de código abierto * *, aplicaciones del mundo real con cargas de memoria no triviales. La versión inicial de la suite era la culminación de más de cinco años de trabajo en ocho instituciones, como parte del proyecto de investigación DaCapo (http://www.dacapo-group.org/), que fue financiado por una Fundación Nacional de Ciencias de Grant ITR , CCR-0085792. Tres años de desarrollo han entrado en la liberación de 2009. Este trabajo ha sido financiado por la ANU, el Consejo de Investigación de Australia y una generosa donación de Intel.

Funciona para mi. Mi madre era un experto de referencia de fama mundial desde hace décadas. No soy. Así que esto es lo que elegí. ¿Hay mejores conjuntos de herramientas por ahí? Probablemente. ¿Qué me importa? No tanto.

Aquí están las pruebas de referencia específicos que se incluyen en esta suite. Se dará cuenta de que no todos ellos están representados a continuación. Si bien todos ellos completaron con éxito en el Mac, sólo he incluido los que lograron con éxito en al menos una de las máquinas virtuales de Java embebidos.

El conjunto de pruebas DaCapo-9,12-bach, publicado en 2009, consta de los siguientes puntos de referencia:

- Avrora
- batik
- Eclipse
- FOP
- h2
- jython
- luindex
- lusearch
- PMD
- sunflow
- Tomcat
- tradebeans
- tradesoap
- puntos

| | |
| --- | --- |
| Avrora | simula un número de programas se ejecutan en una red de microcontroladores AVR |
| batik | produce una serie de gráficos vectoriales escalables (SVG) imágenes basadas en las pruebas de unidad en Apache Batik |
| eclipsar | ejecuta algunos de los (no GUI) pruebas de rendimiento JDT para el IDE Eclipse |
| FOP | toma un archivo XSL-FO, lo analiza y lo formatea, generando un archivo PDF. |
| h2 | ejecuta un JDBCbench-como punto de referencia en la memoria, la ejecución de una serie de operaciones en contra de un modelo de una aplicación de banca, en sustitución de la referencia hsqldb |
| jython | inteprets a la pybench Python referencia |
| luindex | Utiliza Lucene a los índices de un conjunto de documentos; las obras de Shakespeare y la Biblia King James |
| lusearch | Usos LUCENE hacer una búsqueda de palabras clave de texto sobre un corpus de datos que comprenden las obras de Shakespeare y la Biblia King James |
| PMD | análisis de un conjunto de clases Java para una serie de problemas de código fuente |
| sunflow | Representa un conjunto de imágenes mediante trazado de rayos |
| Tomcat | corre un conjunto de consultas en un servidor Tomcat recuperación y verificación de las páginas web resultantes |
| tradebeans | corre el punto de referencia a través de un DayTrader Jave frijoles a un backend GERONIMO con un h2 en la memoria como la base de datos subyacente |
| tradesoap | corre el punto de referencia a través de un DayTrader SOAP a un backend GERONIMO con h2 en la memoria como la base de datos subyacente |
| xalan | transforma los documentos XML en HTML |


Así que aquí es lo que encontré.

Sí, los zulúes JVM es más rápido. Y no es sólo un poco más rápido. Es mucho más rápido ** **. Me refiero a una porción entera. Tanto es así que me decidí a correr el mismo conjunto de pruebas en mi MacBook Pro solo para las muecas. ¿Adivina qué? En una de las pruebas, Zulu venció la JVM en mi Mac. Whisky. Tango. Fox. Pero sí, los números no mienten.

| ** ** Prueba | ** ** OpenJDK | ** ** Zulu | ** ** Mac OS X |
| -------- | ----------- | -------- | ---------reading_time: 6 minutes
--- |
| ** ** Avrora | 588 264 | 44963 | 6137 |
| ** ** puntos | 438577 | 41963 | 50066 |
| ** ** tradesoap | FALLO | 247835 | 51650 |
| ** ** tradebeans | FALLO | 85343 | 13105 |
| ** ** sunflow | 218045 | 69992 | 5405 |
| ** ** PMD | 135382 | 24268 | 4333 |
| ** ** lusearch | 459989 | 39134 | 5035 |
| ** ** luindex | 230904 | 11399 | 2305 |
| ** ** FOP | [103144 | 15233 | 3852 |
| ** ** jython | 1204207 | 59300 | 4150 |



Así Zulu late Mac en el punto de referencia xalan. Asombroso. Y el OpenJDK para ARMv7 es realmente una especie de basura. En las pruebas de que era capaz de completarlo se retrasó lejos, lejos ** ** detrás de la Zulu JVM. Las fallas en las pruebas tradesoap y tradebeans eran outOfMemeoryException fallos, por lo que la Zulu JVM no es sólo más rápido, pero es mucho más eficiente de la memoria. Y en un sistema embebido, una memoria JVM-eficiente es lo que realmente quiere, ¿verdad?

Esto es lo que los resultados parecen bastante en forma de diagrama:

![Numbers002](/posts/category/general/images/Numbers002.jpg "Numbers002.jpg")

Ridículo, ¿verdad? Sí, los números de Mac son tan pequeñas que apenas se registran en casi todas partes en esta escala, pero los números Zulu son bastante impresionantes en comparación con los números de OpenJDK.

Así que no sólo hace el Zulu JVM ** ** sensación más rápido, lo que realmente es ** ** más rápido. Y por una gran cantidad ** **. Yo diría que si usted está pensando en implementar algo en el ARTIK-520, y está escrito en Java, y desea que funcione bien, estaría bien servido a desembolsar el dinero para la JVM Zulu. Usted será mucho más feliz.


* Blackburn, SM, Garner, R., Hoffman, C., Khan, AM, McKinley, KS, Bentzur, R., Diwan, A., Feinberg, D., Frampton, D., Guyer, SZ, Hirzel, M ., Hosking, A., Jump, M., Lee, H., Moss, JEB, Phansalkar, A., Stefanovic, D., VanDrunen, T., von Dincklage, D., y Wiedermann, B. ** El DaCapo Puntos de Referencia: Java Benchmarking Desarrollo y Análisis **, * OOPSLA '06: Actas de la conferencia anual de ACM SIGPLAN 21 en Object-Oriented programación, sistemas, lenguajes y aplicaciones *, (Portland, OR, USA, 22-26 de octubre, 2006) ([pdf](http://portal.acm.org/citation.cfm?doid=1167473.1167488),), [BibTeX](http://www.dacapobench.org/cite.html)).

