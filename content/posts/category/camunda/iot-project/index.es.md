---
title: "IoTProject"
date: 2021-04-16T11:46:12-04:00
Author: davidgs
Category: Camunda, IoT
Slug: iot-project
hero: images/growhouse.jpg
---

# Una prueba de concepto para Camunda Platform BPMN con IoT

## Resumen
Buscando llevar [Camunda](https://camunda.com?ref=davidgsiot) a la atención de la comunidad de IoT completando un proyecto de prueba de concepto de IoT/Camunda más grande. Esto implicaría una compilación de IoT, utilizando la plataforma Camunda, documentación, una publicación de blog y promoción a la comunidad de IoT más amplia.

## ¿Por qué perseguir este proyecto?
En muchas de mis discusiones iniciales cuando me uní a la empresa, el IoT se mencionó con bastante frecuencia como un mercado importante, pero aún sin explotar, para Camunda Platform. Para que Camunda "se dé cuenta" en este mercado, que es vasto, debemos comenzar a hacer cosas que la comunidad posiblemente notaría, y luego rastrear los compromisos de esas cosas.

Esto puede brindarnos información importante sobre si el mercado de IoT está interesado o no en utilizar BPMN para orquestar tareas basadas en datos de IoT, además de ser una introducción de Camunda a la comunidad de IoT.

Afecta a muchos aspectos importantes de lo que hacemos, incluidos los comentarios de la comunidad / clientes, el aumento de la conciencia y el compromiso.

En general, el mercado de IoT en general duplica su tamaño aproximadamente cada 2 años. Este crecimiento rápido y sostenido lo convierte en un objetivo atractivo para Camunda mientras buscamos áreas de expansión.

![Gráfico de adopción creciente de IoT](/posts/category/camunda/iot-project/images/iotGrowthChart.png)

[[1] Pronóstico del gasto del usuario final en soluciones de IoT en todo el mundo de 2017 a 2025](https://www.statista.com/statistics/976313/global-iot-market-size/)

## ¿Cómo se ve el éxito?
El éxito, en este caso, no significa simplemente completar el proyecto. En realidad, completar este proyecto no es el obstáculo. La verdadera medida del éxito será cuánta 'atención' y tracción en la comunidad de IoT en general podamos obtener a través de este proyecto.

Algunas de las métricas para recopilar y medir serían:
- Número de personas que leyeron las publicaciones del blog sobre este proyecto.
- ¿Cuántos de esos lectores 'convertimos' para hacer clic en el sitio web de Camunda?
- Número de tweets/retweets del proyecto y sus partes
- Preguntas formuladas sobre el proyecto

Los OKR en torno a las métricas que planeo usar son:
- 20.000 lecturas posteriores en los blogs publicados sobre el proyecto
- Conversión del 1% al clic de Camunda.com

### Cómo recopilaremos esas métricas
- Cuando publique entradas de blog en DZone, use `?ref=davidgsiot` para distinguir las referencias de tráfico directas a Camunda de los artículos de David
- Producir "entregables" para informar internamente de manera bastante regular (podrían ser informes, almuerzos y aprendizajes, proyectos de hackathon, publicaciones de blogs, etc.)

Es importante tener en cuenta que, si bien generalmente no hacemos un seguimiento de las "métricas de vanidad" como los recuentos de visitas, etc., este es realmente un proyecto de globo de prueba para ver si, y cuánto, hay un interés relativo en torno a una integración entre Camunda. Plataforma BPMN y la comunidad IoT. Dado que solo estamos midiendo el interés inicial, las métricas simples y fáciles de rastrear tienen más sentido.

## Idea de proyecto

Como se mencionó, la automatización de edificios es un mercado objetivo potencial para Camunda e IoT debido al alto nivel de adopción, el requisito de una orquestación compleja y el impulso actual para mover más sistemas a esta área.

> En sus inicios, los sistemas de gestión de edificios (BMS), también llamados sistemas de automatización de edificios (BAS), demostraron ser un cambio de juego. La disponibilidad de un sistema de control basado en computadora que podría monitorear y administrar automáticamente los componentes operativos más grandes y costosos de un edificio ayudó a los gerentes de las instalaciones a hacer mejor su trabajo. Los sistemas de automatización de edificios ahorraron tiempo y dinero, redujeron el desperdicio de energía y brindaron a los gerentes de instalaciones una forma de monitorear mejor sus operaciones.
>
> Avance rápido hasta el día de hoy y tendrá otro cambio de juego: el Internet de las cosas (IoT) para edificios. En esencia, estas tecnologías se cruzan de algunas formas importantes, pero es donde IoT se desvía de BMS lo que lo hace más valioso para el personal de las instalaciones como herramienta de gestión. Este artículo examina cómo una plataforma de informes de análisis de IoT puede mejorar el rendimiento del BMS al ofrecer comentarios sobre la eficiencia energética y cómo ese cambio podría afectar el papel de los administradores de instalaciones. <sup>[1]</sup>

[1] [IoT se encuentra con la automatización de edificios](https://www.iotforall.com/iot-meets-building-automation)

En un puesto anterior de DevRel, hice un pequeño proyecto sobre el cálculo de algunos datos ambientales como el diferencial de presión de vapor, etc., que terminó siendo*enormemente* popular. Aparentemente, este tipo de cálculos y datos son extremadamente importantes en las operaciones de invernadero. Mantener la temperatura, la humedad, etc. adecuadas es clave para el éxito de la operación de un invernadero y la capacidad de automatizar y monitorear estas cosas es una necesidad clave en la industria.

![Automatización de invernadero](/posts/category/camunda/iot-project/images/smart-greenhouse-overview-01.png)

La gestión de invernaderos es un subconjunto del segmento de mercado de automatización de edificios más grande, pero que está creciendo más rápido que el mercado general de BMS.

> Según una investigación de mercado verificada, el mercado global de invernaderos inteligentes se valoró en USD 0,98 mil millones en 2018 y se prevé que alcance los USD 2,46 mil millones en 2026, creciendo a una tasa compuesta anual de 12,11% de 2018 a 2026. <sup>[2]</sup>

[2] [Tamaño y pronóstico del mercado de invernaderos inteligentes](https://www.verifiedmarketresearch.com/product/global-smart-greenhouse-market-size-and-forecast-to-2025/)

Esto lo convierte en un objetivo atractivo para un PoC.

## Propuesta de presupuesto para hardware

Este es un proyecto de IoT, por lo que obviamente requerirá algo de hardware de IoT. Este también es un proyecto de automatización de invernaderos, por lo que también requerirá al menos una especie de 'invernadero' para automatizar.

**Sensores para exteriores:**

| Sensor | Precio | cantidad | total |
| -------- | ------- | ---------- | ------- |
| [Estación meteorológica](https://www.sparkfun.com/products/15901) | $ 64.95 | 1 | $ 64.95 |
| [Detector de rayos](https://www.sparkfun.com/products/15441) | $ 26.50 | 1 | $ 26.50 |
| [ESP32](https://www.sparkfun.com/products/17381) | $ 20.95 | 1 | $ 20.95 |
| [Ruptura de RJ11](https://www.sparkfun.com/products/14021) | $ 1.95 | 2 | $ 3.90 |
| [Tomas RJ11](https://www.sparkfun.com/products/132) | $ 1.25 | 4 | $ 5,00 |
| [Batería LiPo](https://www.sparkfun.com/products/13856) | $ 26.95 | 1 | $ 26.95 |
| [Cargador solar](https://www.sparkfun.com/products/12885) | $ 26.95 | 1 | $ 26.95 |
| [Panel solar](https://www.sparkfun.com/products/13783) | $ 59.00 | 1 | $ 59.00 |
| [Humedad del suelo](https://www.sparkfun.com/products/13637) | $ 6.95 | 1 | $ 6.95 |
| [ <sub>Sensor de CO 2</sub> ](https://www.sparkfun.com/products/15112) | $ 59.95 | 1 | $ 59.95 |
| **Subtotal** | | | **$ 301.10** |



**Sensores de invernadero:**

| Sensor | Precio | cantidad | total |
| -------- | ------- | ---------- | ------- |
| [Humedad del suelo](https://www.sparkfun.com/products/13637) | $ 6.95 | 2 | $ 6.95 | $ 13.90 |
| [Motor paso a paso](https://www.sparkfun.com/products/13656) | $ 30.95 | 1 | $ 30.95 |
| [Controlador paso a paso](https://www.sparkfun.com/products/16836) | $ 19.95 | 1 | $ 19.95 |
| [ESP32](https://www.sparkfun.com/products/17381) | $ 20.95 | 4 | $ 20.95 | $ 83.81 |
| [ <sub>Sensor de CO 2</sub> ](https://www.sparkfun.com/products/15112) | $ 59.95 | 1 | $ 59.95 |
| [Ventilador](https://www.sparkfun.com/products/15708) | $ 11.95 | 1 | $ 11.95 |
| **Subtotal** | | | **$ 220.50** |

**Totales del sensor**
| Área del proyecto | Total |
| -------------- | ------- |
| Sensores para exteriores | $ 301.10 |
| Sensores de interior | $ 220.50 |
| **Gran total:** | **$ 521.60** |


**Invernadero**

Este es un poco comodín. Empecé a ver qué podría funcionar. Quiero que el invernadero pueda tener sensores (son pequeños) y al menos un 'actuador' para abrir una ventana o algo, y probablemente también un ventilador. Estamos hablando de realismo aquí.

| Tipo de invernadero | Costo |
| ----------------- | ---reading_time: 8 minutes
--- |
| [Exterior](https://www.worldofgreenhouses.com/products/hybrid-greenhouse-series) | $ 650 |
| [Interior](https://www.hpotter.com/buy-terrariums/h-potter-terrarium-classic-wardian-case-for-plants) | $ 140 |
| [Interior - pequeño](https://www.amazon.com/Purzest-Terrarium-Geometric-Tabletop-Succulent) | $ 36.00 |


Por supuesto, para una PoC verdaderamente realista / precisa, el invernadero al aire libre es la mejor opción. No estoy seguro de qué haría con un invernadero al aire libre después de que todo esto esté hecho, pero ¯\\\_(ツ)\_/¯.

La versión de escritorio más grande al menos tiene una abertura que podría motorizar para darle algo de realismo.

**Nota:** [@mary_grace](https://twitter.com/mary_grace) y he decidido comenzar con el más pequeño y portátil (dado el próximo viaje, etc.) y ver cómo van las cosas. Podemos mudarnos a un invernadero más grande si el más pequeño resulta ser una opción inviable.

## Documentación
Una serie de publicaciones de blog (al menos 2 o 3) que cubren las distintas etapas del desarrollo del PoC.
