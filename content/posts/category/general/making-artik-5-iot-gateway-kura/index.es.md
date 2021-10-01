---
title: "Cómo hacer una ARTIK-520 IO Gateway con Kura"
Date: 2017-03-02
Author: davidgs
Category: IoT
Tags: ARTIK, Eclipse, Kura, Samsung
Slug: making-artik-5-iot-gateway-kura
hero: images/kura.jpg
reading_time: 10 minutes
---

Hay alrededor de un millón de maneras de construir o comprar un dispositivo IO Gateway. (En realidad, más como [586,000](https://www.google.com/#newwindow=1&q=iot+gateway+device&*), pero no vamos a objeción). Cada uno tiene sus propios méritos, o trampas. Se podía comprar uno, y el riesgo de quedar atrapados en una solución de un solo proveedor. Se puede construir uno desde cero y luego cargar con tener a la fuente el hardware, el software de la construcción, y luego mantener todo y esperanza de que se tomaron las decisiones correctas y que va a escalar. O bien, puede utilizar una solución de código abierto existentes, al igual que), pero no vamos a objeción). Cada uno tiene sus propios méritos, o trampas. Se podía comprar uno, y el riesgo de quedar atrapados en una solución de un solo proveedor. Se puede construir uno desde cero y luego cargar con tener a la fuente el hardware, el software de la construcción, y luego mantener todo y esperanza de que se tomaron las decisiones correctas y que va a escalar. O bien, puede utilizar una solución de código abierto existentes, al igual que [Kura](http://www.eclipse.org/kura/index.php) de Eclipse Foundation.

He estado jugando con la línea de Samsung ARTIK de hardware de la IO recientemente, como es posible que [recordar](/posts/category/iot/winter-vacation-iot-artik-5/), por lo que decidí ver si pudiera convertir mi), por lo que decidí ver si pudiera convertir mi [ARTIK-520](http://www.digikey.com/product-detail/en/samsung-semiconductor-inc/SIP-KITNXB001/1510-1316-ND/5825102) en una puerta de enlace de la IO de una forma fácil, de manera escalable. Se sugirió a mí que trato el proyecto Eclipse Kura, a pesar de que no se admite en realidad ARTIK. No soy de los que se ha impedido por "no funciona en ese hardware" así que decidí darle una oportunidad. Me tomó un par de días, y una serie de reuniones con algunos de los ingenieros de diversas partes del proyecto de Kura, pero resultó ser relativamente simple y directo. Por lo tanto, aquí están mis experiencias, y una especie de 'cómo' para conseguir que funcione para usted, si usted está interesado. También voy a hablar un poco acerca de algunas de las fortalezas, debilidades y, veo en este enfoque a lo largo del camino.

## El hardware

En primer lugar, sobre el hardware. Tengo un kit de desarrollo ARTIK-520. Aquí está el resumen de que si usted no quiere ir [búsquelo](https://www.artik.io/modules/artik-520/) a sí mismo:

- Bajo consumo de doble Cortex®-A7 con Wi-Fi, Bluetooth, ZigBee, Hilo
- Aprovecha la tecnología de Samsung Epop para ofrecer módulos de tamaño pequeño: 30 mm x 25 mm
- 512 MB de RAM, 4 GB de flash (eMMC)
- la seguridad de clase empresarial con el elemento de seguridad de hardware y sistema operativo seguro
- paquete de Fedora Linux con conectividad, gráficos, gestión de energía y bibliotecas de seguridad

El kit de desarrollo actual tiene un puerto Ethernet por cable (esto será importante, así que recuerda esto), puertos micro-USB, y otras cosas también, pero no va a utilizar la mayor parte de que en este ejemplo. Sólo tienes que seguir el excelente "[Getting Started](https://developer.artik.io/documentation/artik/getting-started/)" Guía para obtener su consejo ARTIK-520 en funcionamiento. He utilizado la imagen de la genérica de Fedora 25 a partir de ese guía para configurar mi tabla. Yo he venido a este desde varias direcciones diferentes, y tenía algunas salidas en falso en el camino mientras lo hacía. Así es como yo tengo instalado el software Kura.

## El software

En primer lugar, no siguen el Kura 'Getting Started' guía. No le ayudará a empezar aquí, por lo que ni siquiera estoy vincular a ella. Nunca arreglé para conseguir a través de ese documento y terminar con algo parecido a un sistema de desarrollo que trabaja para Kura. Estamos tratando de llegar Kura se ejecuta en un ARTIK-520, no construir un sistema de desarrollo. Los documentos no se correspondían con la realidad para mí en un MacBook Pro. A continuación, no siguen la Guía de introducción aquí [cualquiera](http://wiki.eclipse.org/Kura/Getting_Started). Seriamente. O si lo hace, acaba de hacer este pequeño pedazo de él:

```
DSimmons-Pro:~ $ git clone -b develop https://github.com/eclipse/kura.git kura
DSimmons-Pro:~ $ cd kura
DSimmons-Pro:kura $ ./build-all.sh
```

Y que está haciendo esto en su ordenador portátil, ** no ** el Consejo ARTIK-520! Recuérdalo. Usted no quiere construir todo esto en el ARTIK-520 en sí. Usted puede ** ** si quieres, creo, pero va a tomar un * muy * mucho tiempo, y por lo menos cuando yo estaba tratando de ella, tuve que desactivar edificio paralelo porque simplemente no son los recursos para hacerlo . Es por eso que no aconseja hacerlo.

Usted necesita tener Java y Maven, etc ya instalado en su ordenador portátil, pero esas instrucciones de configuración son demasiado enrevesado y confuso. Al menos en mi Mac, 'Brew install maven' era todo lo que tomó. Que la acumulación de toda la escritura tomará un tiempo. Y no sólo una "taza de café" tiempo. Más bien como un "ir al gimnasio", mientras que. Cuando por fin ha hecho, vaya mirada en kura.git / directorio kura / distrib / objetivo y maravillarse con todas las cosas que ha creado para usted.

```
DSimmons-Pro:kura $ cd kura/distrib/target
DSimmons-Pro:target $ ls -l
total 4001616
```

No digas que no te lo advertí! Es mucho. Lo que usted está buscando en este pajar es el archivo 'kura_3.0.0-SNAPSHOT_fedora25_installer.sh' Ese es el archivo que desea mover a la ARTIK-520. Sólo FTP / SFTP / SCP por allí, pero en realidad no van ejecutarlo todavía! Esa es la sección siguiente, y usted querrá leer esa sección antes de hacer la instalación o tendrá que perder un día o dos.

## La salida

Como ya he dicho, no sólo ssh en el tablero ARTIK-520 y ejecutar ese instalador. Que estaba conectado a través del puerto USB de depuración, por lo que nunca pierde la conectividad, pero si se ha configurado la conexión Wi-Fi en el ARTIK-520, y está ssh-ed para que cuando se ejecuta el instalador, usted obtendrá una sorpresa bastante desagradable. Y aquí es donde ese puerto Ethernet con cable he mencionado anteriormente viene en juego - recuerdo, te dije que me gustaría volver a ella. Es absolutamente imprescindible ** ** tiene ese puerto Ethernet con cable conectado a la red. Y aquí es donde tengo que registrar mi única decepción muy serio con, y pelea con el paquete de software Kura. Asi que aqui esta.

Cuando lo instalé, ya había establecido el ARTIK-520 tablero, conseguido la red inalámbrica configurada para que pudiera acceder a ella, etc. Es bastante sencillo de hacer, y me salvó de tener que encontrar un cable CAT-5 y conseguir que la configurar. Pero cuando me encontré con el instalador Kura, de repente todo se volvió loco con mi trabajo en red. Se instala bien, y puso en marcha el servicio bien Kura, pero ya no podía llegar a la caja a través de WiFi. Whisky, tango, foxtrot !? Cuando empecé a cavar, me di cuenta de que la interfaz de repente mi WiFi (wlan0) tenía una IP estática de algunos 172, xxx rango asignado a la misma, no es mi rango WiFi LAN que tenía antes. Cambiado de nuevo, pero tarde o temprano se volverá a esta dirección de nuevo. No se ha podido contactar con la web la interfaz de usuario para configurar la caja. Los perros aprendieron una nueva serie de improperios y malas palabras ese día.

Resulta que el servicio Kura, tras la instalación, decidió que durmieron interfaz WiFi era para ser utilizado como un nuevo punto de acceso, por lo que se le dio una nueva dirección IP, configurado como un punto de acceso, y comenzó la publicidad de un nuevo SSID todo por sí mismo. Sin notificarme. Sin preguntarme. Veo esto como un comportamiento bastante antisocial y estoy tratando de averiguar las palabras exactas para un error-informe. Hasta ahora, el informe de error es NSFW. Adición de un nuevo SSID y, esencialmente, un nuevo router, a mi red no está jugando bien. ** ** decido cuando se permite que un nuevo punto de acceso en mi red. ** ** Me decido cuando se instala un nuevo router. Como ya he dicho, bastante comportamiento antisocial. Y sólo para asegurarse de que yo no estaba haciendo un problema de algo que no era un gran problema, me encontré con este escenario más allá de un montón de otras personas de redes y seguridad que conozco. Para una persona, todos estaban horrorizados por este comportamiento. No está bien.

Ok, despotricar sobre. Voy a subir abajo de mi caja de jabón.

Así que, volviendo a la tarea en cuestión. Es absolutamente imprescindible ** ** tiene que configuración del puerto Ethernet con cable. Entonces la instalación, a continuación, puede conectarse a la Web-IU sobre la dirección de Ethernet con cable. Y entonces, y sólo entonces, se puede ver realmente la potencia y versatilidad de uso de Kura como su software de gestión de puerta de enlace. No da la impresión de mi desagrado por encima con el secuestro de mi red que no me gusta Kura. Muy por el contrario. De hecho, me gusta bastante. Es sólo un poco de travesuras que no soy aficionado.

Pero si se le han acabado el instalador, y reiniciado el ARTIK-520 y tratado de conectar probablemente se dará cuenta rápidamente de que no se puede. Hmmm ... Tendrá que hacer una modificación en el script de inicio en primer lugar. por lo que en el ARTIK-520:

```
[root@localhost ~]# systemctl stop kura.service
[root@localhost ~]# cd /opt/eclipse/kura/bin/
[root@localhost bin]# ls
start_kura_background.sh start_kura_debug.sh start_kura.sh
```

Ahora, edita los start_kura_ * scripts y cambiar todas las líneas que dicen `java -Xms512m -Xmx512m` a` 256m` lugar. El ARTIK-520 solamente tiene 512m de la memoria (ver más arriba) para tratar de dar hasta el último bit de la misma a los resultados Java en un `outOfMemoryException` y un accidente. Por supuesto.

Ahora reinicie Kura:

```
[root@localhost bin]# systemctl start kura.service
```

Así que ahora que tengo Kura funcionando con éxito puedo iniciar sesión en la interfaz de usuario web (nombre de usuario admin, la contraseña de administrador por lo que querrá cambiar eso) en realidad tienen una interfaz de usuario muy buena gestión que puedo usar para configurar él propia caja .

![Safari013](/posts/category/general/images/Safari013.jpg)

No se preocupe, usted no tendrá las cosas "Demo" en el suyo. Eso es otra cosa que estoy trabajando para otro post. Puedo configurar el servidor de seguridad, puedo luchar el control de mi espalda interfaz Wi-Fi, y toda una serie de otras cosas.

Ahora bien, si lo que estás buscando es un muy simple, rápido y eficaz de la construcción de un punto de acceso que va a establecer su propio SSID, etc. entonces, fuera de la caja, Kura es sin duda el camino a seguir, ya que sin duda lo hace.

Todavía estoy trabajando en encontrar la manera de conectarlo a un servicio en la nube, y para comenzar a registrar datos de los sensores a la misma, por lo que tendrá que esperar para otro post. También me gustaría tratar de conseguir todo esto construido como parte de un modelo de implementación Resin.io, pero no estoy bastante todavía tampoco.

¡Manténganse al tanto!
