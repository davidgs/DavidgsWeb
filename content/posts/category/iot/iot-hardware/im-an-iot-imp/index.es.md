---
title: "Soy un Imp IO!"
Date: 2014-11-24
Author: davidgs
Category: IoT
Tags: development, electric imp, hacking, IoT
Slug: im-an-iot-imp
hero: images/IMG_1554.jpg
reading_time: 5 minutes
---

Tengo mi [imp eléctrica](http://electricimp.com/) e IMP ruptura bordo de) e IMP ruptura bordo de [Sparkfun](http://www.sparkfun.com) la semana pasada, y decidí echarle un vistazo hoy y ver lo lo que podía hacer con ella en una hora. Estoy repoblación mi Internet de los objetos (IO) bolsa de trucos, y este es el primer dispositivo que he recibido en mucho tiempo, así que aquí está cómo ** ** que se fueron.

Por supuesto que tengo la pornografía desembalaje requerida.

![IMG 1536](/posts/category/iot/iot-hardware/images/IMG_1536.jpg)
![IMG 1537](/posts/category/iot/iot-hardware/images/IMG_1537.jpg)
![IMG 1543](/posts/category/iot/iot-hardware/images/IMG_1543.jpg)

En realidad es un muy buen poco de juego, con un [Cortex M3](http://www.arm.com/products/processors/cortex-m/cortex-m3.php) embutido en un factor de forma Tarjeta de memoria SSD. Con Wi-Fi incluido. Eso es un montón de peluche en un paquete muy pequeño! Tengo volver a escuchar mi soldador y empujar a través de mis varias cajas de partes y poner algunas cosas juntos con el fin de tener en mis manos sucias con el imp.

Me gustaría decir que el mecanismo para conseguir la configuración Wi-Fi en este dispositivo es ... bueno, no tradicional. Tiene un pequeño sensor de luz en el borde delantero, y utiliza su teléfono iPhone (o Android) para 'flash' de la configuración. Y por el flash, me hago ** ** * * Flash media. Al igual que en introduce su configuración de Wi-Fi en su teléfono, y luego, literalmente, parpadea la pantalla mientras se mantiene el Imp a la altura. No hace falta decir que este mecanismo es un poco impreciso. Me llevó unos 20 minutos y un número de intentos antes de lograr conseguirlo configurado.

Una vez configurado, he utilizado el sistema de desarrollo basado en la web (que es bastante agradable) para extender uno de los programas de ejemplo. Una cosa interesante acerca de la imp es que se puede programar el código en el dispositivo, así como la ejecución de código en su nube que se puede acceder, y que a su vez interactúan con el dispositivo. Por lo tanto, como un primer intento, saqué algunas resistencias de 300 ohmios de un par de LEDs (una roja y una blanca) y un pan a bordo. Esto es lo que terminé con:

![IMG 1554](/posts/category/iot/iot-hardware/images/IMG_1554.jpg)

Sí, tenía que utilizar un cable como un puente. No puedo encontrar ninguna de mis puentes reales. Entonces demándame.

He modificado el programa simple ejemplo - y el ejemplo de hardware - para la diversión. Una característica interesante de la plataforma imp eléctrica es que se puede escribir código para ejecutar en el dispositivo, así como un código independiente para la instalación en la nube imp eléctrica.

 
```cpp
// create global variables for red and white LEDs on pins 7 and 9
whiteLed <- hardware.pin9;
redLed <- hardware.pin7;

// configure leds to be a digital output
//add some logging stuff too.
whiteLed.configure(DIGITAL_OUT);
redLed.configure(DIGITAL_OUT);
server.log("White LED OFF!");
whiteLed.write(0);
server.log("Red LED OFF!");
redLed.write(0);

// function to turn White LED on or off
function setWhiteLed(ledState) {
  server.log("Set White LED: " + ledState);
  whiteLed.write(ledState);
}

// function to turn Red LED on or off
function setRedLed(ledState) {
  server.log("Set Red LED: " + ledState);
  redLed.write(ledState);
}

// register a handler for white "led" messages from the agent
agent.on("whiteLed", setWhiteLed);

// register handler for red LED messages from agent
agent.on("redLed", setRedLed);
```

Es bastante sencillo de escribir código para este dispositivo. También he modificado uno de los programas de ejemplo para ejecutar en la nube imp eléctrica:

`` `Cpp
// Registro de las direcciones URL que necesitamos
server.log ( "Activar LED blanco En:"? "whiteLED = 1" + http.agenturl () +);
server.log ( "Turn Off LED blanco:"? "whiteLED = 0" + http.agenturl () +);
server.log ( "Activar LED rojo encendido:"? "redLed = 1" + http.agenturl () +);
server.log ( "Activar LED rojo apagado:" + http.agenturl () + "redLed = 0");

función RequestHandler (solicitud, respuesta) {
tratar {
// comprobar si el usuario envía whiteLED como parámetro de consulta
si ( "whiteLED" en request.query) {

// si lo hicieran, y condujeron = 1 .. establecer la variable a 1
si (request.query.whiteLed == "1" || request.query.whiteLed == "0") {
// convertir el parámetro de consulta llevado a un número entero
locales whiteState = request.query.whiteLed.tointeger ();
// Enviar "whiteLED" mensaje al dispositivo, y ledState de envío como los datos
device.send ( "whiteLED", whiteState);
}
}
// hacer lo mismo para el LED rojo
si ( "redLed" en request.query) {
si (request.query.redLed == "1" || request.query.redLed == "0") {
redstate local = request.query.redLed.tointeger ();
device.send ( "redLed", redstate);
}
}
// enviar un todo de nuevo la respuesta diciendo estaba bien.
response.send (200, "OK");
} Catch (ex) {
response.send (500, "interno del servidor de error:" + ex);
}
}

// registrar el manejador HTTP
http.onrequest (RequestHandler);
```

Those `server.log()` calls at the front are actually fairly important as they print out to the console of the web IDE the actual secure URLs for accessing the service in the electric imp cloud. And the reaction from the device is near-instantaneous. Very impressive response time!

Now, all I have to do next is find some more interesting sensors -- I have boxes and boxes of them lying around here -- and then get to doing something interesting. As I said, this was a quick hour or so of playing around just to see how easy it would be to actually **do** something interesting with this device. Now that I know that it is, indeed, fairly easy to do, I think I'll give some thought to it and set about actually doing something more interesting than simply turning on and off some LEDs.

I'll get back to you on how that works. Feel free to send suggestions of what I might do that would be at least mildly interesting.
