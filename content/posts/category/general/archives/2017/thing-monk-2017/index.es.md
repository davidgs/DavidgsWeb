---
Title: "ThingMonk 2017"
Date: 2017-10-20
Category: general
Slug: thing-monk-2017
hero: images/logo-2017-3.png
reading_time: 8 minutes
---

> **Nota:** Esta es una publicación de mis archivos. Lo escribí en 2017 y se publicó en el [Blog de InfluxData](https://www.influxdata.com/blog/thingmonk-iot-insights/).
En septiembre de 2017, asistí a la Conferencia ThingMonk en Londres. Aquí hay una breve descripción de lo que aprendí y algunas de las ideas que obtuve de la conferencia. Los videos de ThingMonk 2017 están comenzando a aparecer si desea obtener la primicia completa.

## Fondo

El <sup>[1]({{</sup><ref "#link-1" > <sup>}})</sup> La conferencia ThingMonk IoT se llevó a cabo en Shoreditch, Londres, del 11 al 13 de septiembre de 2017 con InfluxData patrocinando las grabaciones de video. Esas grabaciones recién están comenzando a salir, ¡así que asegúrese de verlas todas a medida que salen! A continuación se muestra el cronograma de lanzamiento actual para el primer conjunto de videos de ThingMonk 2017:

> Todos los videos se han publicado y están disponibles en el [canal de YouTube de ThingMonk] (https://redmonk.com/?series=thingmonk-2017).

Se publicará otro conjunto del resto de los videos una vez que se termine el primer conjunto.

ThingMonk es en realidad 2 días de ThingMonk, con un Eclipse IoT Day de apertura.

ThingMonk es una conferencia increíblemente diversa e inclusiva con un Código de conducta muy explícito y estrictamente aplicado. ¿Por qué menciono la diversidad y el Código de conducta en una publicación de blog? Porque una de las fortalezas de la conferencia, creo, es el increíble énfasis en la diversidad, tanto en los oradores como en los asistentes, que RedMonk trabaja muy duro para lograr. Y parte del éxito de la diversidad es el Código de Conducta. Otros organizadores de conferencias podrían aprender un par de cosas sobre cómo hacer que una conferencia sea más diversa e inclusiva estudiando lo que hace RedMonk.

En el transcurso de 3 días de ThingMonk y Eclipse IoT Day, asistí a 23 sesiones y 2 talleres de codificación dedicados por completo a IoT. ¡Eso es mucho IoT en 3 días! Puedes ver la agenda completa de los 3 días aquí.

## Día del Eclipse IoT

El primer día de la conferencia de ThingMonk fue en realidad un día de Eclipse IoT patrocinado en su totalidad por la Fundación Eclipse. ¡Busque más noticias sobre la Fundación Eclipse!

La primera charla fue de Ian Craggs sobre MQTT 5.0 y una breve historia de MQTT a lo largo de los años. ¡No tenía idea de cuánto tiempo había existido MQTT! Hay algunas características nuevas que vienen en MQTT 5.0, como metadatos, etc., que espero que InfluxDB pueda admitir lo antes posible en el complemento MQTT Telegraf. Algunas características nuevas en 5.0:

- Mejoras de escalabilidad
- Error al reportar
-Metadatos
- Mejor soporte para clientes restringidos (integrado)
- Todos los paquetes tienen propiedades (incluyendo diagnósticos)

Sebastien Lambour dio una charla sobre el uso de IoT para controlar los trastornos del estado de ánimo. Ganó el premio Eclipse IoT de 2017 por este proyecto. Fue un enfoque realmente interesante para controlar los trastornos del estado de ánimo mediante la recopilación e interpretación de datos ambientales y de otro tipo, y su correlación con los cambios de estado de ánimo para un mejor control de la enfermedad.

## ThingMonk Día 2

Haría un 'puntos destacados' pero, francamente, todas las charlas fueron puntos destacados. De particular interés fue el concepto de 'Digital Twin'. Un gemelo digital es un modelo digital de un sistema del mundo real que se alimenta de datos de la instancia del mundo real. Piense en un motor a reacción modelado en software y alimentado con datos de un motor a reacción real. Este concepto del gemelo digital se demostró durante el Día 2, y describiré esa demostración más adelante. La idea es tomar datos reales para construir mejores modelos, alimentados por un flujo de datos reales para mejorar el modelo y, en última instancia, proporcionar retroalimentación para construir mejores 'objetos' en el mundo real. Todo informado por datos. Esto requiere la recopilación y el análisis de datos en cada paso, desde el dispositivo de borde hasta la plataforma y el gemelo digital. Implica traer datos de muchas otras fuentes: hojas de datos, datos meteorológicos, etc. para dar un contexto adicional al gemelo. Acabo de escribir sobre hacer esto el otro día.

Yodit Stanton, CEO de opensensors.io dio una charla sobre las razones por las que su proyecto IoT fallará. Citó una encuesta inquietante que decía que el 75% de los proyectos de IoT se consideran un fracaso y que solo el 15% proporciona valor. Su experiencia en la implementación de proyectos de IoT del mundo real para clientes reales informó su razonamiento detrás de sus conclusiones. Uno de sus puntos clave fue que los sensores baratos generan datos incorrectos, y los datos incorrectos conducirán al fracaso del proyecto.

> La imagen se ha perdido

Después de su charla, Yodit y yo nos sentamos para una discusión larga y detallada sobre la recopilación de datos en proyectos de IoT. Es una tecnóloga de datos e IoT realmente interesante y brillante con mucha experiencia en el mundo real implementando soluciones de IoT, ¡algo que no mucha gente tiene en realidad!

Gary Barnett dio una charla titulada "La cosa número uno" que fue muy informativa y muy entretenida. Presentó este gráfico sobre cuál es la “cosa número uno” en IoT:

> La imagen se ha perdido

Pero a propósito de InfluxData:

> La imagen se ha perdido

Realmente no tiene sentido recopilar grandes cantidades de datos de IoT a menos que se trate de datos procesables. Tenga en cuenta que cuando sale el video de esta charla, está lleno de F-bombs y otras blasfemias (al igual que varias otras charlas).

Completando el día hubo charlas sobre factores humanos, fabricantes, un sistema de gestión de trenes, blockchain en IoT y una presentación sobre el uso de gemelos digitales en la agricultura y la ganadería. La agricultura y la ganadería serán un sector de crecimiento clave para IoT en los próximos años y la adquisición y el análisis de datos agrícolas serán factores importantes para su éxito.

La conclusión principal de la conversación sobre blockchain: si no tiene un problema distribuido, blockchain no será la respuesta. Esa parece una buena regla considerando cuántas personas responden con "¡Blockchain!" a casi cualquier problema.

## ThingMonk Día 3

El día 3 estuvo a cargo de Sarah Cooper, directora de la plataforma AWS IoT, quien habló sobre la dimensionalidad de los datos en IoT. Presentó algunos conceptos clave en la adquisición y el análisis de datos de IoT. Su charla sobre la Dimensionalidad de los Datos describió lo siguiente:

Sistemas 0-D: dispositivo con datos discretos y pocas relaciones con aplicaciones y otros datos
Sistemas 1-D: 2 o más fuentes o sistemas de datos. La entrada de uno se envía a otro. Los datos suelen ser lineales.
Sistemas 2-D: gestiona de forma centralizada colecciones de datos y dispositivos 0-D.
Sistemas 3D: combine sistemas 1D y 2D y tenga múltiples relaciones de datos superpuestas.
Los enriquecimientos de datos agregan dimensiones a los datos: enriquecimientos como datos meteorológicos, etc. La fusión de sensores puede exponer información oculta.
Mensaje para llevar: cuanto más simples sean sus datos, más complejos serán los análisis que puede ejecutar.

Hubo una demostración increíble del concepto de gemelo digital en la que se usó un escáner 3D digital de $60,000 para escanear la conferencia (los participantes y todo) a una resolución muy alta (hasta el punto en que se podían reconocer las caras en el escaneo). ¡El escaneado registró más de 1 millón de puntos por segundo! Luego, el escaneo se introdujo en el motor de juegos de Unity para crear un modelo virtual 3D de toda la conferencia. Se entregaron algunos sensores a los miembros de la audiencia y luego estos sensores se agregaron al modelo virtual. Luego, las lecturas de los sensores se transmitieron al modelo en tiempo real y mostraron los cambios en el mundo físico reflejados en el modelo virtual. La demostración obtuvo un grito ahogado colectivo de toda la audiencia y fue el tema de conversación de la conferencia a partir de ese momento. Trajo el concepto de Digital Twin a casa de una manera muy profunda.

La Dra. Lucy Rogers, de IBM, brindó una interesante charla sobre su viaje para convertirse en una creadora de IoT, en la que mostró una serie de proyectos que ha realizado a lo largo de los años. Ella es una creadora según mi propio corazón, ya que crea todo tipo de demostraciones extravagantes, divertidas e interesantes. Todavía no ha creado un bot de traducción de semáforos (construimos un bot basado en IoT para traducir mensajes de texto a semáforos en 2006, solo por diversión), ¡pero ha creado algunas cosas realmente geniales!

También había un par de tipos, como yo, que estaban ejecutando un sensor IoT en vivo en la habitación. El mío fue el sensor de demostración de IoT que desarrollé para InfluxData, y el de ellos estaba monitoreando el nivel de CO2 en la habitación, ejecutando un sensor ambiental en vivo en la parte trasera de la habitación. Entre los dos, pudimos hacer algunas observaciones interesantes sobre las fluctuaciones en la temperatura y los niveles de CO2, y cuándo y por qué ocurrieron. ¡Resulta que también estaban usando InfluxDB como su mecanismo de recopilación de datos de back-end!

## Conclusiones

Si está interesado en una conferencia que no esté llena de presentaciones de marketing y ventas, que se centre en los detalles de lo que hace que IoT sea exitoso, o no, y está interesado en escuchar a algunos de los mejores oradores de la industria. , entonces ThingMonk es el lugar para estar. Es pequeño, extremadamente bien administrado, aún más extremadamente bien curado para el contenido y lleno de contenido excelente. Volveré a mencionar el compromiso con la diversidad. Como le dije a uno de los organizadores del evento, la increíble diversidad en ThingMonk contrasta con la mayoría de las otras conferencias técnicas. Destaca que la diversidad está ahí fuera y que la mayoría de las otras conferencias simplemente no intentan tener diversidad de oradores y asistentes. Sigue así [RedMonk](https://redmonk.com): ¡estás haciendo un gran trabajo!

**<a name="link-1"></a> [1]: La Conferencia ThingMonk no ha vuelto a ocurrir desde 2017. Intenté durante años reiniciarla pero sin éxito. Es una gran brecha en el panorama de conferencias de IoT.**
