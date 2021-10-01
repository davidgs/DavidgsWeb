---
title: "Disney y #IoT"
Date: 2015-01-09
Author: davidgs
Category: Gadgetry, IoT
Slug: disney-and-iot
hero: images/disney.jpg
reading_time: 5 minutes
---

Durante los días de fiesta de un amigo mío se llevó a su familia a Disney World durante unos días. Se alojaron en un complejo en el parque, pagado un suplemento para las líneas más cortas en los paseos, y estaban allí en un grupo de 12. Eso es un viaje épico probablemente digno de su propia entrada en el blog - en otro lugar. No podía imaginar la logística de esa visita, pero por otra parte, han pasado 10 años desde que he estado a Disney World, y al parecer mucho ha cambiado en ese tiempo.

Eso no es realmente lo que estoy realmente escribir aquí. Ver, vinieron a casa con estos pequeños y divertidos pulseras de plástico / goma. Ellos se presentaron con las pulseras - Disney ellos [MagicBands](http://www.google.com/aclk?sa=l&ai=Cn6YVIyGwVIPdI4jYpgPmt4KIBbCdkLcJsPD6kYECuJ7GvaYBCAAQASC5VGDJ7qeKpKTEEaABxvSz_gPIAQGqBB9P0GZkOBPEgK6Ouy6vIILHWD0Zp9Iw_GHI6nWnsLbCgAWQToAHgNn1RYgHAZAHAqgHpr4b&sig=AOD64_3AYdOTwEhFZiBYvxQJk4hZsV2IfQ&rct=j&q=&ved=0CCAQ0Qw&adurl=http://ad.doubleclick.net/clk%3B252175360%3B76276805%3Bl%3Bu%3Dms%3Fhttps://disneyworld.disney.go.com/plan/my-disney-experience/bands-cards/%3FCMP%3DKNC-WDW_FY15_DOM_NGE_BR_MagicBands%7CG%7C4151322.NG.AM.02.01%26keyword_id%3DsX37LLiAO_dc%7Cdisney%2520magic%2520band%7C68978719648%7Ce%7C15402cl14044) - cuando nos registramos en el hotel. Cada persona - hasta los más pequeños - tiene uno personalizado sólo para ellos.

![21 300x215](/posts/category/iot/iot-hardware/images/21-300x215.jpg )

Estos eran algo más que simples pulseras sin embargo. Funcionaban como las llaves de sus habitaciones de hotel, la admisión a los parques, la verificación de que podían entrar en las líneas más cortas, y les permita comprar refrescos y artículos en el parque. Todo lo que tenían que hacer era poner el brazalete al lado de un sistema de punto de venta, introduzca un PIN, y vienen. Sin tener que buscar una billetera. Sin tener que buscar el cambio, o dinero en efectivo, etc. Realmente no hay necesidad de llevar nada ** ** en el parque. Sólo llevar el Magic Band. El parque está lleno de lectores de RF para ellos en las entradas a los paseos, la entrada al parque, etc.

![DSC03458 800x600 XL](/posts/category/iot/iot-hardware/images/DSC03458-XL-800x600.jpg)

Estos pequeños dispositivos son realmente de Internet de los dispositivos de las cosas. Disney está utilizando la IO. Están haciendo el parque más conveniente y más fácil para sus clientes, sí, pero eso es sólo la manifestación externa de lo que están haciendo en realidad. Estas bandas son algo más que un sistema RFID. Contienen algunos mucho más avanzado [tecnología RF](https://disneyworld.disney.go.com/faq/my-disney-experience/frequency-technology/), y Disney lo utiliza para rastrear y reunir telemetría de huéspedes durante su estancia en el complejo. Telemetría? Sí, la telemetría. Ellos pueden controlar el tiempo que esperar en la cola, el tiempo que las líneas son, lo que compra, y donde (dándoles historial de compras y de compra de patrón de datos que pueden utilizar más tarde al mercado para usted). Estoy adivinando aquí, pero no me sorprendería si también pueden utilizar el MagicBand para localizar a su hijo perdido en el complejo simplemente mediante la triangulación de la señal desde su banda.

Yo estaba tan intrigado por este pequeño gadget que mi amigo me dio el suyo y me llevó a casa para diseccionar. Déjame que te diga, usted, que no es tan fácil como parece. Estos están diseñados para ser dispositivos de un solo uso. Que lo utilice durante su estancia en el parque, y llevarla con usted cuando salga. Creo que si regresa al parque otra vez que podría presentar su edad MagicBand y tienen que re-activa, pero probablemente obtendrá una nueva. Así que aquí está cómo ha ido.

Empecé con una MagicBand:

![IMG 1594](/posts/category/iot/iot-hardware/images/IMG_1594.jpg)

Está moldeada de plástico, por lo que entrar en ella era realmente ** ** difícil, pero un cuchillo afilado, algunos pequeños cortadores de alambre y 10 minutos más tarde, era (en su mayoría) en.

![IMG 1597](/posts/category/iot/iot-hardware/images/IMG_1597.jpg)

Es un diseño muy simple, lo que parece, y toda la banda de muñeca se utiliza como antena de espacio, así, lo que significa que quieren ser capaces de comunicarse con ella de mí distancia, y / o que necesitan una señal fuerte y fiable. Yo sé que no es sólo un sistema RFID sencilla, ya que contiene uno de estos:

![IMG 1598](/posts/category/iot/iot-hardware/images/IMG_1598.jpg)

Así que es un dispositivo alimentado. Cavé y cavado y cavado, y finalmente encontré lo que yo creo ** ** es el procesador, pero es así, incluso con mi lupa, no puedo identificar el chip.

![IMG 1601](/posts/category/iot/iot-hardware/images/IMG_1601.jpg)

Y se une a una placa de circuito muy simple de una sola capa:

![IMG 1600](/posts/category/iot/iot-hardware/images/IMG_1600.jpg)

Todo esto no era sólo con revestimiento de plástico, pero en realidad era moldeada en el plástico, por lo que era muy ** ** difícil entrar, e imposible de conseguir en sin destruirla en el proceso.

Estos son el tipo de productos que la IO ** ** no se ve en el CES, o la sopa en la web. Estos son los tipos de dispositivos IO que son ** ** ya que cambian el funcionamiento de las empresas. Ellos están proporcionando Disney no sólo con grandes volúmenes de datos, pero * * masivo de datos en lo que sus clientes son en realidad * * haciendo, probablemente, en tiempo real, mientras que en el parque. Ese es el tipo de telemetría que puede transformar por completo un negocio. Así es como la IO puede transformar una industria.
