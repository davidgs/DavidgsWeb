---
title: "Mi vacaciones de invierno (lo que hice con la IO y ARTIK-5)"
Date: 2017-01-02
Author: davidgs
Category: Uncategorized
Slug: winter-vacation-iot-artik-5
hero: images/eTapeProject-1-1-225x300.png
reading_time: 6 minutes
---

No sé sobre usted, o lo que hizo con sus vacaciones de invierno (o si incluso tiene uno, y si no lo hizo, lo siento) pero una de las cosas divertidas que hice con el mío era para pasar una poco tiempo con mi [Samsung ARTIK] Dev Kit (http://artik.io). Si usted lee el [Hardware Extravaganza Post](http://artik.io), sabrá que tengo una ARTIK-0 y un kit de desarrollo ARTIK-5 no hace mucho tiempo. He sido hasta las orejas en), sabrá que tengo una ARTIK-0 y un kit de desarrollo ARTIK-5 no hace mucho tiempo. He sido hasta las orejas en [MyNewt](/posts/category/iot/iot-hardware/hardware-extravaganza/) y aunque no han tenido tiempo de hacer mucho con ellos, por desgracia. Es decir, hasta que mi vacaciones de invierno llegó.

No quería pasar todo el tiempo jugando en mi oficina y molestar a mi familia, así que decidí simplemente probar un proyecto rápido usando un poco de hardware del sensor existente He ahí. (Nota: Tengo una gran cantidad de hardware del sensor "justo ahí") decidí probar con el [Sensor de nivel de líquido Etape](https://www.adafruit.com/products/464?gclid=CjwKEAiAkajDBRCRq8Czmdj-yFgSJADikZggOOig7wQivaUivT14Q8aNI3ndBmn2oyGF3EJgiZJ-MxoCWvDw_wcB) que ya he estado jugando con el proyecto MyNewt. Es un sensor bastante simple analógica para leer el nivel de agua / líquido en un recipiente. O, en mi caso, en mi patio trasero que inunda regularmente! También decidí sacar el ARTIK-5 primero, ya que es muy fácil para ponerse en marcha.

Vamos a utilizar el sensor como un sensor resistivo *, * y la configuración es muy sencilla. Voy a estar utilizando un tablero para poner todo esto junto con fines ilustrativos. En primer lugar, conecte un puente hilos de 5v en el tablero para el breadboard.Next, conecte un cable de puente de ADC0 en el tablero de la placa. Esta será nuestra ADC-in. El sensor debería haber venido con una resistencia de 560 ohm, de modo que el enchufe en la placa entre Vdd y ADC-en agujeros. Por último, conecte un puente desde GND en el tablero para su tablero. En este punto, el ARTIK 5 debería tener este aspecto:

[! [ARTIK-5 ADC Cableado del sensor](/posts/category/iot/images/eTapeProject-1-1-225x300.png)] (/ mensajes / categoría / IO / images / eTapeProject-1-1.png))](/posts/category/iot/images/eTapeProject-1-1.png)

 

Y el tablero debe tener este aspecto:

[! [Breadboard cableado](/posts/category/iot/images/eTapeProject-4-225x300.png)] (/ mensajes / categoría / IO / images / eTapeProject-4.png))](/posts/category/iot/images/eTapeProject-4.png)


Ahora, coloque una de las medias 2 cables del sensor a tierra en el breadboad y el otro conductor central al ADC-in en el tablero. Eso debería completar la conexión de sensores y su tablero completado debe ser similar a la anterior.

He comprado un 1000 ML cilindro en el que poner el sensor Etape para probar este proyecto se graduó, y esto es lo que la conexión final del propio sensor se ve así:

![Sensor Etape en el cilindro](/posts/category/iot/images/eTapeProject-5.png)

Ahora todo lo que tiene que hacer es llenarlo con agua y ... oh, espera, que probablemente tendrá que escribir un código, ¿eh? En realidad, resulta que tengo que hacer sorprendentemente poco de eso! Decidí dar el [Nodo de Red](https://nodered.org) un giro desde que he estado escribiendo un montón de código Node.js este año de todos modos. Tengo mi ARTIK-5 en funcionamiento utilizando el sitio) un giro desde que he estado escribiendo un montón de código Node.js este año de todos modos. Tengo mi ARTIK-5 en funcionamiento utilizando el sitio [Resin.io](https://resin.io) que era muy rápido y fácil de usar. Una vez hecho esto, y tuve un pleno funcionamiento ARTIK 5 (Nota: no utilice el perfil delgado ** **, asegúrese de usar la última ** ** perfil en la configuración del estibador Usted lo necesita. la instalación de nodo-rojo), simplemente instala usando nodo-rojo

```
% sudo npm install -g node-red
```
Una vez que se completó, he instalado la biblioteca ARTIK para el nodo-Rojo

```
% /root/.node-red
% npm install node-red-contrib-artik
```

Entonces, sólo para hacer las cosas aún más fácil, he instalado el módulo FRED:

```
% npm install node-red-contrib-fred
```

Verá por qué Fred era una buena idea en un minuto. Una vez que todo se hacía en el ARTIK 5 Simplemente empecé nodo-rojo:

```
% node-red
```

Y luego se conecta el navegador al servidor Nodo-Rojo ARTIK-5 y construido una aplicación. Me arrastré en un ARTIK ADC y configuré:

[! [Nodo-RED ARTIK Sensores](/posts/category/iot/images/Safari005.jpg)

[! [ARTIK-5-Nodo de Red](/posts/category/iot/images/Safari006-300x137.jpg)] (/ mensajes / categoría / IO / images / Safari006.jpg))](/posts/category/iot/images/Safari006.jpg)

Una función

[! [función de definición de nodo-roja](/posts/category/iot/images/Safari007-300x137.jpg)] (/ mensajes / categoría / IO / images / Safari007.jpg))](/posts/category/iot/images/Safari007.jpg)

y un módulo de JSON, y luego enganchado todo hasta un FRED-entrada y una salida de FRED-:

[! [ARTIK-5-Nodo de Red aplicación](/posts/category/iot/images/Safari004-300x129.jpg)] (/ mensajes / categoría / IO / images / Safari004.jpg))](/posts/category/iot/images/Safari004.jpg)

Ah, y, a continuación, hacer clic en el botón 'Despliegue'. Te dije que era simple.

Entonces fui a mi cuenta de servicio en FRED [SENSITEC](https://fred.sensetecnic.com) y se registra en creé un punto final ADC privado.:

[! [Cree punto final en FRED](/posts/category/iot/images/Safari009-300x180.jpg)] (/ mensajes / categoría / IO / images / Safari009.jpg))](/posts/category/iot/images/Safari009.jpg)

Y luego agregó un evento ** ** Enviar ADC, provocada por una marca de tiempo:

[! [Enviar evento a ARTIK-5 en FRED](/posts/category/iot/images/Safari008-300x127.jpg)] (/ mensajes / categoría / IO / images / Safari008.jpg))](/posts/category/iot/images/Safari008.jpg)

Y un evento que se lleva reciben los datos devueltos y lo inserta en un gráfico:

[! [ARTIK Eventos en FRED](/posts/category/iot/images/Preview001-300x96.jpg)] (/ mensajes / categoría / IO / images / Preview001.jpg))](/posts/category/iot/images/Preview001.jpg)

Una vez que empecé todo esto, tuve un gráfico ingenioso que muestra el nivel de agua en mi cilindro graduado:

[! [Gráfico de nivel de agua](/posts/category/iot/images/Safari001-300x238.jpg)] (/ mensajes / categoría / IO / images / Safari001.jpg))](/posts/category/iot/images/Safari001.jpg)

Y escribí código esencialmente cero.

A continuación voy a tratar de instalar un motor de MongoDB en el ARTIK-5 y el envío de todos los datos para que, a continuación, que sirve que los datos fuera de un front-end Javascript para trazar todo. Para ello será necesario escribir algo de código, a fin de buscar que en un futuro próximo!

También voy a trabajar en tener el sensor real conectado a la ARTIK-0 y el envío de los datos de que a la instancia ARTIK-5 MongoDB para la recolección y análisis. Estoy con muchas ganas de excavación en el ARTIK-0 un poco ya que es más práctica con el código C - algo que he estado hasta el cuello en últimamente con MyNewt de todos modos.
