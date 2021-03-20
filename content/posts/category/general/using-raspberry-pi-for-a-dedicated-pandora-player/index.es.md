---
title: "Uso de Frambuesa Pi para un jugador dedicado de Pandora"
Date: 2016-05-23
Author: davidgs
Category: Gadgetry, IoT, Misc
Tags: IoT, Raspberry Pi
Slug: using-raspberry-pi-for-a-dedicated-pandora-player
hero: images/raspberry-pi-logo.png
---

la llamada de Hagámosle Pandora Pi, ¿de acuerdo?

De todos modos, tengo un amigo (no técnica) que siempre tenía envidia de la configuración de la música que tengo en mi casa. Tengo un montón de altavoces Bose Serie III creados alrededor de la casa, conectados a estaciones base AirPort Express para que pueda emitir música en toda la casa. Siempre hay música que se reproduce por aquí, por lo general en toda la casa - cocina, sala de estar, oficina, etc. funciona muy bien para mí!

De todos modos, ella quería una configuración similar en su casa, pero sólo en una habitación, y para Pandora. Al principio me la instaló con Pandora, un conjunto de altavoces Bose, un Airport Express, y superficie de sustentación en su PC (que no es una tienda de Mac, como yo) y que funcionaba razonablemente bien. Principalmente.

Pero su PC siempre se bloquea, o superficie de sustentación acaba de dejar de fumar, o su PC perdería conectividad de red, o algunos otros chanchullos haría que la música se detenga. Se estaba volviendo loca.

Así que decidí construir su Pandora jugador dedicado que ella podría tener en la cocina y el uso de la música del juego sin todos los dolores de cabeza que estaba teniendo. En realidad, fue más fácil de lo que pensaba que sería!

Aquí está la lista básica de los componentes:

- Frambuesa Pi 2 B +
- [SYBA externa estéreo USB Adaptador de sonido](http://www.amazon.com/external-Adapter-Windows-Microphone-SD-CM-UAUD/dp/B001MSS6CS?ie=UTF8&psc=1&redirect=true&ref_=oh_aui_detailpage_o07_s00) (porque frambuesa Pi a bordo chupa audio)
- [Tonic vitrina + 3,5 pulgadas](http://www.amazon.com/Tontec®-Raspberry-Display-Touchscreen-Transparent/dp/B00NANNJLQ?ie=UTF8&psc=1&redirect=true&ref_=oh_aui_detailpage_o00_s00)

Eso es todo por el hardware! Sólo alrededor de $ 100USD para toda la instalación.

Software fue tan fácil. Solía [Raspian Jessie](https://www.raspberrypi.org/downloads/raspbian/) y se añadió) y se añadió [Pithos](http://pithos.github.io) para la reproducción de Pandora. Fácil.

La creación de Pithos en la pantalla de 3,5 pulgadas no era posible, por supuesto (que supongo que era posible, si hubiera unido el teclado), sino que acaba de empezar un servidor VNC en el Pi y remota que se muestra a realizar la configuración.) Una vez que estaba listo, he añadido una configuración de aplicación predeterminada para auto-iniciar Pithos de inicio de sesión, y todo empezó a jugar tan pronto como se enciende la cosa en.
