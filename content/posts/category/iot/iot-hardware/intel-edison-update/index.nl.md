---
title: "Intel Edison Update"
Date: 2016-01-06
Author: davidgs
Category: Gadgetry, IoT
Tags: Edison, IoT
Slug: intel-edison-update
hero: images/SparkFun_Edison_Boards-16.jpg
---

Ik moet mijn [vorige post] (/ berichten / category / iot / iot-hardwareintel-edison-big-hat-no-vee /) over de Intel Edison wijzigen. Het blijkt dat het misschien niet de Edison module zelf, maar de Intel Mini-Breakout Board dat de schuldige is als t gaat om ten minste de I2C mislukking. Ik heb nog steeds te zien over de SPI mislukkingen. Hier is waarom ik die conclusie zijn gekomen:

Ik bestelde een aantal van de [Sparkfun Blocks](https://www.sparkfun.com/products/13034) voor Intel Edison © en ging terug naar gek met hen. (Really was ik niet 'gek' met hen zo veel als het werken aan een project voor een klant, waar Intel Edison was een goede pasvorm.) Ik downloadde een aantal aardige code van [GitHub] (https://github.com/jku/ LSM9DS0) dat de I2C-bus bruikbaar gemaakt met de Sparkfun Blocks en voila! Ik had het werkt! Ik maakte een aantal vrij grote wijzigingen in de originele code van de originele GitHub repository, dus ik gevorkte het en hebben opnieuw gepubliceerd op mijn eigen [GitHub](https://github.com/jku/LSM9DS0), natuurlijk. Meestal wat ik toegevoegd waren meer opstarten en output opties.

Ik ben nu in staat om I2C sensor gegevens te lezen (ik gebruik de [9DOF Sparkfun block](https://www.sparkfun.com/products/13033)) en ben nu de publicatie van de sensor data naar ... nou ja, dat kan ik kiezen waar ik het stuur! Ik kan het verzenden van de ingebouwde [Mosquito MQTT](http://mosquitto.org) server, of een ingesloten [MongoDB](https://www.mongodb.org) NoSQL-database, of naar een externe [Couchbase ](http://www.couchbase.com) NoSQL-database, of ik kan mijn eigen ruwe JSON gegevens te publiceren van. Ik kan zelfs het mogelijk maken om te publiceren naar alle bronnen in een keer, maar ik ben niet zeker dat is alles wat nuttig is, echt.

Ja, ik ben over het algemeen een Java-guy - vandaar de [koffiebonen] (/ berichten / bonen / bonen) - maar ik teruggekeerd naar C voor deze. Het is alweer 30 jaar geleden dat ik elke serieuze C-code heb geschreven, maar blijkbaar is het net als fietsen, omdat het terug komt!

Stay tuned voor de rest van het verhaal over dit project, omdat het gaat beter en beter!
