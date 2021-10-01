---
title: "Acceso a su W Frambuesa Pi cero"
Date: 2017-04-12
Author: davidgs
Category: IoT
Tags: IoT, Raspberry Pi
Slug: accessing-your-raspberry-pi-zero-w
hero: images/pi_zero_w_board.jpg
reading_time: 3 minutes
---

Si usted ha sido suficiente para conseguir sus manos en un Frambuesa Pi cero W suerte, entonces es posible que disfruten de este. Si usted todavía está esperando a que uno, Marca esta. A menos que le sucede que tiene adicionales HDMI monitores, teclados y ratones por ahí. Yo no, por lo que configurar el mío era un dolor en el culo. He resuelto que el dolor para ti, así que sigue leyendo.

En primer lugar, por supuesto, tendrá que descargar e instalar la última [Raspian-OS](https://www.raspberrypi.org/downloads/raspbian/). No sé si Noobs funciona o no, por lo que tu caso es distinto allí. A continuación, quemar la tarjeta SD con el software de escritura de tarjetas de su elección. Lea sobre la que). No sé si Noobs funciona o no, por lo que tu caso es distinto allí. A continuación, quemar la tarjeta SD con el software de escritura de tarjetas de su elección. Lea sobre la que [aquí](https://www.raspberrypi.org/documentation/installation/installing-images/README.md). Ahora, una vez que su tarjeta SD está completa, aquí está cómo hacer fácilmente su Frambuesa Pi cero W aparece en su red inalámbrica y dejar que se conecte a ella ** ** sin tener un monitor, teclado, etc.

En primer lugar, montar la tarjeta SD y luego, tendrá que crear 2 archivos en la partición / boot. La primera de ellas tendrá su Pi cero W en su red inalámbrica.

```
$ cat spa_supplicant.conf
network={
    ssid=<Your SSID Name>
    psk=<Your WiFi Password>
}
```
Una vez más, ese archivo se debe colocar en la partición / boot de la tarjeta SD Raspian. A continuación, tendrá que ser capaz de conectarse a la cosa, por lo

```
$ touch /boot/ssh
```

En realidad se pone cualquier cosa que desee en ese archivo, o nada en absoluto. Siempre y cuando existe, se le multa.

Ahora se puede desmontar y expulsar la tarjeta SD, y el pop en su Pi cero W, enchufe de esa pequeña cosa, y se debe arrancar y unirse a su red Wi-Fi. Una vez que le toca, puede ssh en que (nombre de usuario 'pi', contraseña 'frambuesa' por supuesto) y ya está listo para ir!

Me gusta hacer las cosas con calma y seguir adelante e instalar un servidor VNC en el Pi cero W para que pueda obtener un escritorio completo en él desde mi portátil, pero lo más importante, para mí, es ser capaz de llevar la cosa sin monitor, teclado y ratón! Tal vez algún día la gente de Frambuesa Pi se acaba de permitir que uno de los puertos USB como un terminal de salida de la caja por lo que no vamos a tener que hacer esto. Un individuo puede soñar.
