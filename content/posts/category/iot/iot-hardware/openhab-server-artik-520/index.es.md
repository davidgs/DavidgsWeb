---
title: "Openhab Server en YA-520"
Date: 2017-03-28
Author: davidgs
Category: IoT
Tags: ARTIK, ARTIK-520, IoT, openHAB
Slug: openhab-server-artik-520
hero: images/logo-2.png
---

Como he dicho antes, cuando se tiene un martillo ... Así que decidió crear la IO Sin embargo, otro Gateway. Esta vez me tomó un vistazo a [OpenHAB](http://www.openhab.org) el "proveedor y la tecnología agnóstica software de automatización de código abierto para su hogar." ¿Por qué no, ¿verdad? Ya he creado un) el "proveedor y la tecnología agnóstica software de automatización de código abierto para su hogar." ¿Por qué no, ¿verdad? Ya he creado un [servidor del borde Droplit.io](/posts/category/iot/iot-software/artik-520-droplit-io-edge-device), y un), y un [servidor Eclipse Kura](/posts/category/general/making-artik-5-iot-gateway-kura/), ¿por qué no dar una más a la derecha intentarlo? Correcto. Así que vamos a bucear en.

## Configuración

El programa de instalación muy fácil. Casi miedo fácil. Seriamente. Como siempre, empecé imagen ARTIK Fedora básico con el, y por supuesto ser informado con las últimas:

```
[root@localhost ~]# dnf update
```

Para eso se necesita un tiempo.

** Nota: ** comienzo con un sistema operativo fresco para cada uno de estos proyectos. Gracias al poder [volcar un sistema que ejecuta](/posts/category/general/how-to-save-your-artik-520-backup/) de vuelta al mini-SD Card, acabo de volcar lo que estaba trabajando a una tarjeta, quemar una carta fresca, y empezar de nuevo.

Vas a la necesidad de que Zulu JVM hablé de [anterior](/posts/gategory/iot/make-your-artik-520-scream/). La instalación es rápida y fácil, pero no se salte él! Al parecer, la versión de JDK abierto de la JVM no realmente le dará mucha alegría con OpenHAB. Yo no lo probamos, acabo de instalar el Zulu JVM y continué. En caso de haber perdido, una vez que haya). La instalación es rápida y fácil, pero no se salte él! Al parecer, la versión de JDK abierto de la JVM no realmente le dará mucha alegría con OpenHAB. Yo no lo probamos, acabo de instalar el Zulu JVM y continué. En caso de haber perdido, una vez que haya [descargó el Zulu JVM](https://www.azul.com/products/zulu/)

```
[root@localhost ~]# tar xvf ezdk-1.8.0_112-8.19.0.31-eval-linux_aarch32hf.tar
[root@localhost ~]# update-alternatives --install /usr/bin/java java ~/ezdk-1.8.0_112-8.19.0.31-eval-linux_aarch32hf/jre/bin/java 100
[root@localhost ~]# update-alternatives --config java
```

El paquete sólo adicional que se va a descomprimir necesidad es porque alguien pensó que era una buena idea * * no incluir descomprimir (o zip para el caso) en la imagen base. Lo que.

```
[root@localhost ~]# dnf install unzip
```

Fácil. Hecho. A continuación, obtener el servidor openHAB. Las instrucciones para esta instalación son [aquí](http://docs.openhab.org/installation/linux.html#manual-installation), pero realmente te diré todo lo que necesita saber.

```
[root@localhost ~]# cd /tmp
[root@localhost /tmp]# wget -O openhab-download.zip https://bintray.com/openhab/mvn/download_file?file_path=org%2Fopenhab%2Fdistro%2Fopenhab%2F2.0.0%2Fopenhab-2.0.0.zip
[root@localhost /tmp]# unzip openhab-download.zip -d /opt/openhab2
[root@localhost /tmp]# rm openhab-download.zip
```

Las instrucciones dicen para crear un usuario openhab y, a continuación, ejecutar el servidor openhab como ese usuario. No hagas eso. Creo que se puede encontrar la manera, pero cuando lo hice, seguí recibiendo:

```
/opt/openhab2/runtime/bin/karaf: line 28: cd: /root: Permission denied
: JAVA_HOME is not valid: /root/ezdk-1.8.0_112-8.19.0.31-eval-linux_aarch32hf/jre/
```

Por lo que finalmente acaba de ejecutar como root. Funciona muy bien como root.

Eso es realmente todo allí también fue todo! ¡Te dije que era fácil!

## Usando OpenHAB

Aquí es donde las cosas se pusieron muy divertido! Una vez que se inició el servidor OpenHAB, he conectado a la ARTIK-520 usando mi navegador (puerto 8080, lo digo) y ** ** Voilà! Tenía un tablero de instrumentos de todo tipo. Pero no había nada. Hmmm ... bien, así que tuve que ir a instalar algunos "Enlaces".

![Safari017](/posts/category/iot/iot-hardware/images/Safari017.jpg)

Hay muchos de ellos. Elegí los que está para las cosas que tengo. Un televisor Samsung, algunos Nido Cosas y los interruptores Wemo. Tan pronto como he instalado esos atascamientos, las cosas comenzó a aparecer en mi "Bandeja de entrada". Al igual que, al instante! Lo que se presentó de inmediato fueron los Wemo cambia. Tan pronto como me fijo la conexión de red en mi televisor Samsung, que también se presentó de inmediato. El material Nest se va a tomar un poco más de trabajo ya que tenía que registrarse como desarrollador Nido, y tengo que salta no terminado a través de todas sus aros por el momento. Sin embargo, los enlaces están instalados:

![Safari016](/posts/category/iot/iot-hardware/images/Safari016.jpg) "Safari016.jpg")

He instalado el atracones Z-Wave por razones que ahora se me escapan. Tratar con él.

![Safari015](/posts/category/iot/iot-hardware/images/Safari015.jpg)

Y esos son todos los dispositivos que aparecían. Y ahora puedo controlarlos!

## Conclusiones

La Kura servidor me llevó una semana o dos para conseguir trabajo, con una buena cantidad de apoyo de los ingenieros responsables de Eclipse. Realmente no fue diseñado para ejecutarse en una plataforma embebida como el ARTIK-520, y nunca había sido probado allí, así que no es realmente sorprendente.

El Droplit.io servidor perimetral me tomó alrededor de una semana. En realidad, la instalación fue bastante fácil una vez que me di por vencido en tratar de construir el sistema en el ARTIK-520. Recordar mi regla: no construyen / compilación de ARTIK-520, a menos que sea absolutamente necesario. Luego se llevó un par de días para obtener un error funcionó por lo que podría encontrar mi Wemo cambia, pero eso es todo lo que iba a encontrar.

El servidor openHAB era, con mucho, la más fácil. Tomó cerca de 2 horas de principio a fin, incluyendo la construcción / intermitente / actualizar el sistema operativo. Y se encontró una gran cantidad más dispositivos de forma casi instantánea (una vez me di cuenta de que instalar las fijaciones. No siempre leo ** ** todos los sentidos.). Es muy ** ** sensible y fácil de tratar.

Tengo un montón más cosas para investigar aquí, al igual que el motor de reglas 'experimental', y que puede probar a cabo la integración de texto a voz si tengo tiempo.

En honor a la verdad, esto puede ser mi último ARTIK-520 prueba de integración durante un tiempo. No son en realidad me pagan para hacerlas. De hecho, nadie está pagando que haga nada en este momento, por lo que hasta que llegue ** ** fijo que, probablemente voy a paso la mayor parte de mi tiempo de búsqueda de empleo. Y tal vez algún tiempo más en el proyecto resistbot. Todo esto es fácil solución si alguien se decidiera a contratarme. :-)
