---
title: "Ik ben een IoT Imp!"
Date: 2014-11-24
Author: davidgs
Category: IoT
Tags: development, electric imp, hacking, IoT
Slug: im-an-iot-imp
hero: images/IMG_1554.jpg
---

Ik heb mijn [elektrische imp](http://electricimp.com/) en imp breakout board van [SparkFun](http://www.sparkfun.com) vorige week, en ik besloot om het te proberen vandaag en zie wat ik kon doen met het in een uur. Ik ben re-stocking mijn Internet of Things (IoT) trukendoos, en dit is het eerste apparaat dat ik heb gekregen in een tijdje, dus hier is hoe **dat** ging.

Natuurlijk heb ik de nodige uitpakken porno.

![IMG 1536](/posts/category/iot/iot-hardware/images/IMG_1536.jpg)
![IMG 1537](/posts/category/iot/iot-hardware/images/IMG_1537.jpg)
![IMG 1543](/posts/category/iot/iot-hardware/images/IMG_1543.jpg)

Het is eigenlijk een aardig stukje kit, met een [Cortex M3](http://www.arm.com/products/processors/cortex-m/cortex-m3.php) gevuld in een SSD-geheugenkaart form factor. Met WiFi inbegrepen. Dat is een heleboel gevuld in een zeer klein pakket! Ik kreeg buste uit mijn soldeerbout en steken door mijn verschillende vakken van de onderdelen en zet een aantal dingen samen om mijn handen vuil te maken met de imp.

Ik zal zeggen dat het mechanisme voor het verkrijgen van de WiFi-configuratie op dit apparaat is ... nou ja, niet-traditionele. Het heeft een kleine lichtsensor aan de voorkant, en je hebt je iPhone (of Android) telefoon gebruiken om 'flash' de configuratie. En door middel van flash, I **doe** gemiddelde*flits*. Net als in die u invoert uw WiFi-configuratie in uw telefoon, en dan knippert letterlijk het scherm terwijl je de Imp houden tot het. Onnodig te zeggen, dit mechanisme is een beetje onnauwkeurig. Het kostte me een goede 20 minuten en een aantal pogingen voordat ik erin geslaagd om het te krijgen geconfigureerd.

Eenmaal geconfigureerd, gebruikte ik de web-based development systeem (dat is erg leuk) naar één van de voorbeeld programma's uit te breiden. Een interessant ding over de imp is dat je on-device code als code te draaien in de cloud die u kunt openen kunt programmeren, en die zal dan communiceren met uw apparaat. Dus, als een eerste gaan, trok ik een aantal 300Ω weerstanden een paar LED's (een rode en een witte) en een brood-board. Hier is wat ik eindigde met:

![IMG 1554](/posts/category/iot/iot-hardware/images/IMG_1554.jpg)

Ja, ik moest een draad te gebruiken als een jumper. Ik kan niet een van mijn echte jumpers vinden. So sue me.

Ik wijzigde het eenvoudige voorbeeld programma - en de hardware voorbeeld - voor de lol. Een interessante eigenschap van de elektrische imp platform is dat je code kunt schrijven om uit te voeren op het apparaat evenals aparte code te draaien in de elektrische imp cloud.

 
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

Het is vrij eenvoudig om code te schrijven voor dit apparaat. Ik heb ook aangepast naar een voorbeeld van programma's te draaien in de elektrische imp cloud:

`` `Cpp
// Log de URL's die we nodig hebben
server.log ( "Turn White LED Aan:" "? whiteLed = 1" + http.agenturl () +);
server.log ( "Turn White LED Uit:" "? whiteLed = 0" + http.agenturl () +);
server.log ( "Turn rode LED aan:" "? redLed = 1" + http.agenturl () +);
server.log ( "Turn Rode LED Off:" + http.agenturl () + "redLed = 0");

functie RequestHandler (verzoek response) {
proberen {
// Controleer of de gebruiker gestuurd whiteLed als een queryparameter
if ( "whiteLed" in request.query) {

// als ze dat deden, en leidde = 1 .. ingesteld onze variabele 1
if (request.query.whiteLed == "1" || request.query.whiteLed == "0") {
// converteer de geleid queryparameter naar een integer
lokale whiteState = request.query.whiteLed.tointeger ();
// send "whiteLed" boodschap aan het apparaat, en send ledState als de gegevens
device.send ( "whiteLed", whiteState);
​
​
// hetzelfde doen voor de rode LED
if ( "redLed" in request.query) {
if (request.query.redLed == "1" || request.query.redLed == "0") {
lokale redstate = request.query.redLed.tointeger ();
device.send ( "redLed", redstate);
​
​
// een antwoord sturen terug te zeggen alles was OK.
response.send (200, "OK");
} Catch (ex) {
response.send (500, "Internal Server Error:" + ex);
​
​

// registreren de HTTP handler
http.onrequest (RequestHandler);
```

Those `server.log()` calls at the front are actually fairly important as they print out to the console of the web IDE the actual secure URLs for accessing the service in the electric imp cloud. And the reaction from the device is near-instantaneous. Very impressive response time!

Now, all I have to do next is find some more interesting sensors -- I have boxes and boxes of them lying around here -- and then get to doing something interesting. As I said, this was a quick hour or so of playing around just to see how easy it would be to actually **do** something interesting with this device. Now that I know that it is, indeed, fairly easy to do, I think I'll give some thought to it and set about actually doing something more interesting than simply turning on and off some LEDs.

I'll get back to you on how that works. Feel free to send suggestions of what I might do that would be at least mildly interesting.
