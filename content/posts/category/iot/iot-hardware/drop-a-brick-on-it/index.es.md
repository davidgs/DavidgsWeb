---
title: "Drop un ladrillo en él"
Date: 2014-11-19
Author: davidgs
Category: IoT
Tags: connectivity, Internet Anywhere, IoT
Slug: drop-a-brick-on-it
hero: images/render-2.jpg
---


Estoy todo sobre la conectividad. Sí, hay momentos para desconectar del mundo, pero eso es una falta de conexión personal. Aplicaciones y dispositivos deben, en su mayor parte, ser conectado ** ** todo el tiempo. Sin embargo, la conectividad es caro y difícil de mantener en lugares remotos. Si se conecta un servidor, o su casa, hay muchas opciones disponibles - Vamos a ir con eso por ahora, ¿de acuerdo? Todo el tema ISP monopolio simplemente me terminé. Por lo general este tipo de conexiones son rápidas, fiables y estables. La mayoría de ellos son baratos y ampliamente disponibles.

Pero cuando nos fijamos en el Internet de las Cosas (IOT) cosas pueden ser un poco más ardilla. Sí, si los dispositivos IO son las cosas en su casa, puede ir con la conexión que ya tiene. Si son activos de la IO basados en la empresa, que tiene su conectividad de clase empresarial que confiar. ¿Qué pasa con los dispositivos IO que son o bien a base de campo o móvil? ¿Qué pasa si la implementación de la IO se encuentra en una selva en Panamá? O el postre en África?

He encontrado esto el otro día, y parece que la solución perfecta. Caída de un [Brck](http://www.brck.com) en él! Esto se ve como un gran dispositivo para la conectividad remota, especialmente para la IO o aplicaciones de bajo ancho de banda. Hay un par de características interesantes que buscan aquí - y unos pocos que me gustaría investigar más a fondo, si tuviera el tiempo y el dispositivo. El 8 horas una función de copia de seguridad de la batería de este dispositivo es una gran victoria en muchos escenarios de despliegue remoto, para estar seguro. El hecho de que este dispositivo fue desarrollado en África ** ** ** específicamente para implementaciones remotas ** es también una gran ventaja. Otra vez sin embargo, hay algunas cosas que creo que necesita más investigación.

La primera es la posibilidad de añadir sensores y dispositivos basados en Arduino directamente a la caja. Así que si usted está utilizando [Zigbee](http://zigbee.org) o) o [IEEE 802.15.4](http://en.wikipedia.org/wiki/IEEE_802.15.4) dispositivos como sus nodos finales, se podría añadir una puerta de entrada a los dispositivos a los dispositivos Brck directamente. Si está utilizando dispositivos) dispositivos como sus nodos finales, se podría añadir una puerta de entrada a los dispositivos a los dispositivos Brck directamente. Si está utilizando dispositivos [BTLE](http://www.bluetooth.com/Pages/low-energy-tech-info.aspx), se podría añadir un BTLE-puerta de entrada para el acceso a estos dispositivos también. Este fue - en su día - uno de los grandes puntos de fricción para un montón de aplicaciones de sensores. Bajo consumo de energía, conexiones de red de baja energía a los dispositivos eran difíciles de salvar a Internet para backhaul de los datos. En muchas implementaciones, lo sigue siendo. Especialmente para aplicaciones de teledetección. Ser capaz de construir-en el dispositivo puente entre Internet y al sensor sería una gran ventaja.

Lo que me gustaría investigar más a fondo - dado el tiempo y el dispositivo, por supuesto, ya que la IO es mi hobby, no es mi trabajo - es si o no pude desplegar servicios reales al dispositivo Brck. Al igual que la autenticación, autorización, integridad de datos y gestión de dispositivos IO. Sé que, desde su página web, que tienen las herramientas basadas en la nube - que no lo hace, amirite? - para gestionar los dispositivos Brck, y dicen que se puede empujar Arduino bocetos hasta la caja para distribuir a los dispositivos conectados, pero ¿qué pasa con estos otros servicios? ¿Qué pasa si yo quería usar, por ejemplo, [OpenAM](https://forgerock.org/openam/) y) y [OpenIDM](https://forgerock.org/openidm/) servicios? Pude desplegar estos servicios directamente al nodo? O podría construir las llamadas de servicio en el dispositivo de proxy para los nodos finales?

Supongo que voy a añadir esto a la lista de dispositivos y tecnologías Me encantaría ** ** para poder pasar algún tiempo con, pero probablemente no tienen el tiempo o el dinero para hacer frente a.<sigh>
