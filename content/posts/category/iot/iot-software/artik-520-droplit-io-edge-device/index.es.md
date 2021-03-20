---
title: "ARTIK-520 como un dispositivo de Droplit.io Edge"
Date: 2017-03-28
Author: davidgs
Category: IoT
Tags: ARTIK, ARTIK-520, Droplit, droplit-edge, IoT
Slug: artik-520-droplit-io-edge-device
hero: images/Droplit-Logo1.png
---

Haciendo un trabajo más con mi fiel ARTIK-520 (bueno, cuando usted tiene un martillo, todo parece un clavo! Copias de seguridad de encima!), Decidí probar la instalación de otro marco de puerta de enlace IO en él. (He hecho de que [antes](/posts/category/general/making-artik-5-iot-gateway-kura/).) La igualdad de oportunidades y todo eso. Y voy a estar haciendo más de ellos tan pronto como llegue a más mini tarjetas SD de forma interna. Pero yo divago.

Originalmente limitaba a seguir la instalación básica [instrucciones](https://docs.droplit.io/docs/deploy-an-edge-server) para la implementación de un servidor Droplit.io Edge. Pero eso no funcionó. No es culpa del Droplit.io, para estar seguro. Y realmente no es culpa del ARTIK-520. Pero aquí está mi nueva regla:

** No compile / build En ARTIK-520 **

Sólo que no siempre termina bien. Puede ser un dolor para configurar un compilador cruzado en su arquitectura, pero sólo tiene que ver que una vez (y por suerte yo ya tenía instalada la cadena de herramientas del compilador ARM y trabajando de trabajar en [MyNewt](http://mynewt.apache.org/). sin embargo, puede que ni siquiera se necesita un compilador para el borde Droplit.io. es todo JavaScript, así que es bastante fácil.

## Configuración

Una vez que tenga el fajo Droplit.io de punta en su ordenador portátil (o lo que sea) y todos los requisitos previos, justo lo construye de acuerdo a las instrucciones [](https://docs.droplit.io/docs/deploy-an-edge-server). En realidad no ejecutarlo desde su ordenador portátil sin embargo. Una vez que había construido él, me acabo de encontrar:

```
DSimmons-Pro:~ dsimmons$ tar czf droplit.tgz droplit.io-edge
```

Y luego se usa SFTP para copiar el archivo tar comprimido hacia el ARTIK-520, un-compresa / alquitrán y luego:

```
[root@localhost ~]# export DEBUG=droplit:*
[root@localhost ~]# cd droplit.io-edge/
[root@localhost droplit.io-edge]# node droplit-edge
droplit:router using setting host: wss://edge-ws.droplit.io/edge +0ms
droplit:router using setting ecosystem: C58c71404f57350103c9a8dda +19ms
droplit:router using setting edge id: 36:e8:d4:9e:f4:a6 +7ms
droplit:router load plugins +7ms
droplit:router droplit-plugin-philips-hue loaded +2s
droplit:router droplit-plugin-lifx loaded +85ms
droplit:router droplit-plugin-sonos loaded +2s
droplit:router droplit-plugin-wemo loaded +2s
droplit:transport-edge reconnecting... +4ms
droplit:transport-edge connected +805ms
droplit:router info < droplit-plugin-wemo:uuid:Socket-1_0-221631K0100D8A +6s
droplit:router info < droplit-plugin-wemo:uuid:Socket-1_0-221643K0101D76 +200ms
droplit:router id > uuid:Socket-1_0-221631K0100D8A -> 58da675822fea674dc071474 +62ms
droplit:router pc < uuid:Socket-1_0-221631K0100D8ABinarySwitch.switch off +59ms
droplit:router info < droplit-plugin-wemo:uuid:Lightswitch-1_0-221614K1300BE2 +181ms
droplit:router id > uuid:Socket-1_0-221643K0101D76 -> 58da675922fea674dc071475 +26ms
droplit:router pc < uuid:Socket-1_0-221643K0101D76BinarySwitch.switch off +24ms
droplit:router pc < uuid:Lightswitch-1_0-221614K1300BE2BinarySwitch.switch off +30ms
droplit:router id > uuid:Lightswitch-1_0-221614K1300BE2 -> 58da675922fea674dc071476 +130ms
```

He establecido la propiedad de depuración porque quería ver lo que estaba pasando en realidad detrás de las escenas (además de que en realidad estaba depurando un problema con la gente Droplit, que son impresionantes sobre ayudar a cabo y super sensible!).

Verá que ** ** muy rápidamente el servidor del borde Droplit-io encontró el [Wemo](http://www.wemo.com) conmuta he desplegado en mi casa. ¡Dulce! Entonces fui a mi) conmuta he desplegado en mi casa. ¡Dulce! Entonces fui a mi [portal de desarrolladores Droplit.io](https://portal.droplit.io/) y:

![Safari014](/posts/category/iot-iot-software/images/Safari014.jpg)

Y ahí están! Y he comprobado que, efectivamente, puedo encenderlos y fuera de aquí.

Ahora, si alguien quiere enviar un poco de engranaje [Sonos](http://www.sonos.com/en-us/home), o alguna), o alguna [Philips HUE](http://www2.meethue.com/en-us/) de engranajes, que puedo instalar aquí en casa a prueba con esto, yo estaría feliz de probar que fuera.

Puedo ver sobre la creación de algunos conectores de conexión a cosas como mis dispositivos basados en MyNewt al servidor de borde, pero eso no va a suceder hoy.

## Conclusiones

Como de costumbre, he encontrado el ARTIK-520 que es bastante fácil, y muy versátil, centro de la IO. Este es mi segundo proyecto de puerta de enlace con ARTIK-520 y, aunque se han topado con algunas peculiaridades cada vez, es básicamente bastante recta de avance de configurar. Una vez más, ** no trate de construcción / compilación en el ARTIK-520 ** menos que sea absolutamente * tiene * a, y es una parte relativamente pequeña de construcción. De hecho, me he construido Node.js de la fuente en el ARTIK-520 un par de veces y era lento, pero relativamente sin dolor.

[Droplit.io](http://droplit.io) es un destino de despliegue relativamente sencillo para la ARTIK-520. Tan pequeño como el módulo ARTIK real es (aparte de todas las cosas de placa de desarrollo) sería un objetivo muy atractivo para un Droplit.io 'aparato', aunque no estoy seguro de que el punto de precio golpearía un objetivo razonable para ellos .

Como ya he dicho, me gustaría probar mi mano en la construcción de algunos conectores para otros dispositivos de IO para Droplit, y desde luego que estoy viendo algunas otras puertas de acumulación / desplegarse en este tablero ARTIK-520. ¡Manténganse al tanto!
