---
title:  "Cómo evitar que tu Raspberry Pi se bloquee durante las actualizaciones"
date: 2024-10-16T08:06:25+06:00
description:  Evite bloquear su Pi
hero: images/pile-of-bricks.jpg
reading_time: 3 minutes
relcanonical: https://dev.to/davidgs/how-to-avoid-bricking-your-device-during-update-rollouts-2hm1
---

Que una actualización bloquee (deje de funcionar) tu dispositivo es un riesgo real, e incluso se sabe que esto ha sucedido en las empresas más grandes. Esto le acaba de pasar a Apple ([Apple pausa la implementación de iPadOS 18 para el iPad Pro M4 después de quejas por bloqueos](https://arstechnica.com/gadgets/2024/09/apple-pauses-ipados-18-rollout-for-m4-ipad-pro-after-bricking-complaints/)) y creo que todos estamos al tanto del [incidente de Crowdstrike](https://en.wikipedia.org/wiki/2024_CrowdStrike_incident) a esta altura.

Es un problema tal que, dados los recientes desastres con las implementaciones de actualizaciones (sobre los que escribí brevemente [aquí](https://dzone.com/articles/how-you-can-avoid-a-crowdstrike-fiasco)), parecía un buen tema para profundizar.

Siempre he creído que si no puedes abordar un problema con una solución, probablemente no estás ayudando, así que busqué formas de resolver realmente el problema de las actualizaciones que "salen mal" y cómo implementar mejores estrategias para implementarlas.

Por supuesto, la mayor parte de lo que he dicho no es nuevo ni revolucionario, pero vale la pena analizarlo en profundidad si se están implementando grandes cantidades de dispositivos que en cualquier momento deberán administrarse y actualizarse en el campo. Seamos realistas, en algún momento algo _saldrá_ mal. Siempre sucede. Por lo tanto, planificar cómo recuperarse _antes_ de que suceda es prudente y demuestra a sus clientes que usted está cuidando de ellos y de sus intereses. Es realmente poner a sus clientes en primer lugar al garantizar que puedan verlo como un socio de confianza a largo plazo.

Abordo algunos temas clave como particionamiento A/B, reversiones después de actualizaciones fallidas y otros, pero no voy a entrar en todos los detalles aquí. Te recomiendo que mires el video {% embed https://youtu.be/XELyHZp_exM?si=nNUaPIZcgr0Vlh-o %}
y déjame saber lo que piensas.

Me encantaría iniciar una discusión más amplia sobre este tema de resiliencia en las actualizaciones, ya que creo firmemente que, junto con la seguridad, es un área crítica en la que IoT debe centrarse para comenzar a cumplir la promesa de la tecnología.

Esta charla se basa en gran medida en productos de [Zymbit](https://zymbit.com/?utm_source=dev-to&amp;utm_medium=blog&amp;utm_term=dev-to), incluidos [Zymkey](https://zymbit.com/zymkey/?utm_source=dev-to&amp;utm_medium=blog&amp;utm_term=dev-to) y [Bootware](https://zymbit.com/bootware/?utm_source=dev-to&amp;utm_medium=blog&amp;utm_term=dev-to), pero los conceptos generales son aplicables a una variedad de proveedores.

**Nota:** Si estás involucrado en IoT en Carolina del Norte, el norte de Virginia o Colorado y no conoces [R!OT](https://riot.org), te estás perdiendo uno de los mejores recursos para profesionales de IoT. Organizan eventos, talleres, almuerzos y talleres de aprendizaje, etc. de forma regular para sus miembros. Esta charla se presentó originalmente como un almuerzo y taller de aprendizaje para R!OT. Te animo a que te unas y a que asistas a sus eventos si esta es un área que te interesa.
