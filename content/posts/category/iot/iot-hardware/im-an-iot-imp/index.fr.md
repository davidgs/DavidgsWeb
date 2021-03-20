---
title: « Je suis un IdO Imp! »
Date: 2014-11-24
Author: davidgs
Category: IoT
Tags: development, electric imp, hacking, IoT
Slug: im-an-iot-imp
hero: images/IMG_1554.jpg
---

Je suis mon [diablotin électrique](http://electricimp.com/) et diablotin SFE de) et diablotin SFE de [SparkFun](http://www.sparkfun.com) la semaine dernière, et j'ai décidé de le vérifier aujourd'hui et voir ce que Je pouvais le faire avec elle dans une heure. Je re-bas de mon internet des objets (IdO) sac de trucs, et c'est le premier appareil que j'ai eu dans un certain temps, donc voici comment ** ** qui est allé.

Bien sûr, j'ai le porno décompactage nécessaire.

![IMG 1536](/posts/category/iot/iot-hardware/images/IMG_1536.jpg)
![IMG 1537](/posts/category/iot/iot-hardware/images/IMG_1537.jpg)
![IMG 1543](/posts/category/iot/iot-hardware/images/IMG_1543.jpg)

Il est en fait un peu assez agréable de kit, avec un [Cortex M3](http://www.arm.com/products/processors/cortex-m/cortex-m3.php) entassé dans un facteur de forme de carte mémoire SSD. WiFi inclus. C'est énormément fourré dans un très petit paquet! Je suis arrivé à buste mon fer à souder et à travers mes différentes percez boîtes de pièces et de mettre des choses ensemble pour obtenir mon sale mains avec le diablotin.

Je dirai que le mécanisme pour obtenir la configuration Wi-Fi sur cet appareil est ... eh bien, non traditionnel. Il dispose d'un petit capteur de lumière sur le bord avant, et que vous utilisez votre téléphone iPhone (ou Android) pour « flash » la configuration. Et par le flash, je ** ne signifie ** flash * *. Comme en vous entrez dans la configuration de votre connexion Wi-Fi dans votre téléphone, puis il clignote littéralement l'écran pendant que vous tenez l'Imp jusqu'à lui. Inutile de dire que ce mécanisme est un peu imprécis. Il m'a fallu un bon 20 minutes et un certain nombre d'essais avant que je réussi à obtenir configuré.

Une fois configuré, j'ai utilisé le système de développement basé sur le Web (qui est assez agréable) pour étendre l'un des exemples de programmes. Une chose intéressante sur le diablotin est que vous pouvez programmer sur l'appareil du code ainsi que l'exécution de code dans leur nuage auquel vous pouvez accéder, et qui sera ensuite interagir avec votre appareil. Donc, comme un premier coup, j'ai sorti quelques résistances 300Ω un couple de diodes électroluminescentes (un rouge et un blanc) et un pain à bord. Voici ce que j'ai fini avec:

![IMG 1554](/posts/category/iot/iot-hardware/images/IMG_1554.jpg)

Oui, je devais utiliser un fil comme un cavalier. Je ne trouve pas l'un de mes cavaliers réels. Permettez-moi de poursuivre.

Je modifié le programme exemple simple - et l'exemple de matériel - pour le plaisir. Une caractéristique intéressante de la plate-forme électrique diablotin est que vous pouvez écrire du code à exécuter sur le périphérique, ainsi que code distinct pour exécuter dans le nuage électrique diablotin.

 
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

Il est assez simple avant d'écrire du code pour cet appareil. J'ai aussi modifié l'un des exemples de programmes à exécuter dans le nuage électrique diablotin:

`` `Cpp
// Connexion les URL dont nous avons besoin
server.log ( "Turn LED blanche:" "? whiteLed = 1" + http.agenturl () +);
server.log ( "Turn Off LED blanc:" "? whiteLed = 0" + http.agenturl () +);
server.log ( "Turn LED rouge:" "? redLed = 1" + http.agenturl () +);
server.log ( "Turn Off LED rouge:" + http.agenturl () + "redLed = 0");

fonction RequestHandler (requête, réponse) {
essayer {
// vérifier si l'utilisateur a envoyé whiteLed comme paramètre de requête
if ( "whiteLed" dans request.query) {

// si elles l'ont fait, et conduit = 1 .. définir la variable à 1
if (request.query.whiteLed == "1" || request.query.whiteLed == "0") {
// convertir le paramètre de requête conduit à un nombre entier
whiteState = request.query.whiteLed.tointeger local ();
// envoi « whiteLed » message à l'appareil, et envoyer ledState que les données
device.send ( "whiteLed", whiteState);
}
}
// faire la même chose pour la LED rouge
if ( "redLed" dans request.query) {
if (request.query.redLed == "1" || request.query.redLed == "0") {
RedState locale = request.query.redLed.tointeger ();
device.send ( "redLed", RedState);
}
}
// envoyer un tout en disant retour de réponse était OK.
response.send (200, "OK");
} Catch (ex) {
response.send (500, "Internal Server Error:" + ex);
}
}

// enregistrer le gestionnaire HTTP
http.onrequest (RequestHandler);
```

Those `server.log()` calls at the front are actually fairly important as they print out to the console of the web IDE the actual secure URLs for accessing the service in the electric imp cloud. And the reaction from the device is near-instantaneous. Very impressive response time!

Now, all I have to do next is find some more interesting sensors -- I have boxes and boxes of them lying around here -- and then get to doing something interesting. As I said, this was a quick hour or so of playing around just to see how easy it would be to actually **do** something interesting with this device. Now that I know that it is, indeed, fairly easy to do, I think I'll give some thought to it and set about actually doing something more interesting than simply turning on and off some LEDs.

I'll get back to you on how that works. Feel free to send suggestions of what I might do that would be at least mildly interesting.
