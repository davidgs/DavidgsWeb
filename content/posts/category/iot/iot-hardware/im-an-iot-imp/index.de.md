---
title: „Ich bin ein IoT Imp!“
Date: 2014-11-24
Author: davidgs
Category: IoT
Tags: development, electric imp, hacking, IoT
Slug: im-an-iot-imp
hero: images/IMG_1554.jpg
reading_time: 5 minutes
---

Ich habe meine [elektrische imp](http://electricimp.com/) und imp Breakout-Board von) und imp Breakout-Board von [SparkFun](http://www.sparkfun.com) letzte Woche, und ich beschlossen, es heute zu überprüfen und sehen, was ich könnte in einer Stunde mit ihm zu tun. Ich mein Internet der Dinge (IoT) Tasche von Tricks wieder glatt, und dies ist das erste Gerät, das ich in einer Weile bekommen habe, so ist hier, wie ** dass ** ging.

Natürlich habe ich die erforderlichen auspacken Pornos.

![IMG 1536](/posts/category/iot/iot-hardware/images/IMG_1536.jpg)
![IMG 1537](/posts/category/iot/iot-hardware/images/IMG_1537.jpg)
![IMG 1543](/posts/category/iot/iot-hardware/images/IMG_1543.jpg)

Es ist eigentlich ein ziemlich schönes Stück Kit, mit einem [Cortex M3](http://www.arm.com/products/processors/cortex-m/cortex-m3.php) gefüllt in einen SSD-Speicherkarte Formfaktor. Mit WiFi enthalten. Das ist eine ganze Menge in ein sehr kleines Paket gestopft! Ich habe meine Lötkolben Büste und stoßen durch meine verschiedenen Kisten von Teilen und einige Dinge zusammen, um mir die Hände schmutzig mit dem Kobold zu erhalten.

Ich werde sagen, dass der Mechanismus, um die WiFi-Konfiguration auf dieses Gerät für immer ist ... na ja, nicht-traditioneller. Es hat einen kleinen Lichtsensor an der Vorderkante, und Sie Ihr iPhone (oder Android) Telefon ‚Flash‘ die Konfiguration. Und durch Blitz, I ** tun ** Mittelwert * Flash *. Wie in Sie geben Sie Ihre WLAN-Konfiguration in Ihr Telefon, und dann blitzt es buchstäblich um die Anzeige, während Sie den Imp, um es zu halten. Unnötig zu sagen, ist dieser Mechanismus ein wenig ungenau. Es dauerte gut 20 Minuten, und eine Reihe von Versuchen, bevor ich es konfiguriert bekommen verwaltet.

Einmal konfiguriert, benutzte ich die Web-basierte Entwicklungssystem (das ist ziemlich nett) eines der Beispielprogramme zu erweitern. Eine interessante Sache über die imp ist, dass Sie als Code als auch in ihrer Cloud läuft auf dem Gerät Code programmieren können, die Sie zugreifen können, und die dann interact mit Ihrem Gerät. Also, als erstes gehen, zog ich aus ein paar 300Ω Widerstände ein paar LEDs (eine rote und eine weiße) und ein Brotbrett. Hier ist, was ich am Ende mit:

![IMG 1554](/posts/category/iot/iot-hardware/images/IMG_1554.jpg)

Ja, ich hatte einen Draht als eine Brücke zu verwenden. Ich kann nicht von meinem wirklichen Jumper finden. So verklage mich.

Ich änderte das einfache Beispiel Programm - und das Hardware-Beispiel - zum Spaß. Ein interessantes Merkmal der elektrischen imp-Plattform ist, dass Sie Code schreiben können auf dem Gerät auszuführen sowie separaten Code in der elektrischen imp Wolke zu laufen.

 
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

Es ist ziemlich geradlinig Code für dieses Gerät zu schreiben. Ich eines der Beispielprogramme auch in der elektrischen imp Wolke laufen geändert:

`` `Cpp
// Log die URLs wir brauchen
server.log ( "Turn On White LED:" "? whiteLED = 1" + http.agenturl () +);
server.log ( "Turn Off White LED:" "? whiteLED = 0" + http.agenturl () +);
server.log ( "Turn rote LED an:" "? redLed = 1" + http.agenturl () +);
server.log ( "Turn Red LED Aus:" + http.agenturl () + "redLed = 0");

Funktion Request (request, response) {
Versuchen {
// überprüfen, ob der Benutzer gesendet whiteLED als Abfrageparameter
if ( "whiteLED" in request.query) {

// wenn sie es taten, und führte = 1 .. setzen unsere Variable auf 1
if (request.query.whiteLed == "1" || request.query.whiteLed == "0") {
// den LED-Abfrageparameter in einer ganzen Zahl konvertieren
lokale whiteState = request.query.whiteLed.tointeger ();
// send „whiteLED“ Nachricht an Gerät und senden LED-Status wie die Daten
device.send ( "whiteLED", whiteState);
}
}
// für die rote LED das gleiche tun
if ( "redLed" in request.query) {
if (request.query.redLed == "1" || request.query.redLed == "0") {
lokale redstate = request.query.redLed.tointeger ();
device.send ( "redLed", redstate);
}
}
// eine Antwort zurück und sagte alles in Ordnung war senden.
response.send (200, "OK");
} Catch (ex) {
response.send (500, "Internal Server Error:" + ex);
}
}

// registrieren die HTTP-Handler
http.onrequest (Request);
```

Those `server.log()` calls at the front are actually fairly important as they print out to the console of the web IDE the actual secure URLs for accessing the service in the electric imp cloud. And the reaction from the device is near-instantaneous. Very impressive response time!

Now, all I have to do next is find some more interesting sensors -- I have boxes and boxes of them lying around here -- and then get to doing something interesting. As I said, this was a quick hour or so of playing around just to see how easy it would be to actually **do** something interesting with this device. Now that I know that it is, indeed, fairly easy to do, I think I'll give some thought to it and set about actually doing something more interesting than simply turning on and off some LEDs.

I'll get back to you on how that works. Feel free to send suggestions of what I might do that would be at least mildly interesting.
