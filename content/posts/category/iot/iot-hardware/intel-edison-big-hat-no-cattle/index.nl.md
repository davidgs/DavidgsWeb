---
title: "Intel Edison Big Hat, No Cattle"
Date: 2015-12-11
Author: davidgs
Category: IoT
Slug: intel-edison-big-hat-no-cattle
hero: images/NewImage.png
---

Het was bijna precies een jaar geleden dat ik kocht mijn eerste Intel Edison development kit. Ik was al enthousiast over de vooruitzichten van het, zoals je kunt zien [hier] (/ berichten / category / iot / iot-hardware / intel-Edison-iot-board /). Het is een leuk, klein, krachtig (als op macht beluste) ivd boord die veel belofte gehouden voor de ontwikkeling en prototyping.

Ik wou dat ik waren nog steeds zo enthousiast over.

Ik heb geprobeerd een paar keer om het te gebruiken voor bepaalde ontwikkelingsproject of een ander. Ik ben zelfs maar te proberen nu opnieuw. Mijn ervaring is minder dan positief. Sterker nog, het is ronduit teleurstellend. Nu, een van mijn [aanvankelijke klachten] (/ berichten / category / iot / iot-hardware / intel-Edison-iot-board /) van het platform was het gebruiksgemak en de niet-intuïtief proces om te kunnen flashen / upgraden / etc . het bord. Om eerlijk te zijn, heeft Intel gewerkt aan dit, en er zijn nu een aantal redelijk fatsoenlijke tools voor het beheer van de raad van bestuur.

Dat gezegd zijnde, er is veel meer dat **niet** werk op dit forum dan doet. Bijvoorbeeld SPI. Dat is set van een grote, voor mij. Ik heb ongeveer een maand bezig om een SPI-apparaat te werken met het bestuur en kwam alleen maar problemen. Herhaalde berichten naar het Intel Developer Forum ontlokte een reeks cryptische antwoorden te geven dat ik de dingen was het aansluiten van ten onrechte werd de SPI-apparaat niet goed werkt, etc. Het*is* een experimenteel apparaat, zodat die dingen waren plausibel. Totdat ik kreeg een logic analyser en eigenlijk debugged de signalen uit de Edison. Vervolgens werd overduidelijk dat SPI op de Mini Breakout Board hopeloos was gebroken. Op dat moment, Intel erkend dat SPI was gebroken. Ze konden me kunnen redden een hoop tijd hadden ze copped aan die eerder. Dus SPI is uit.

Ok, SPI hopeloos gebroken. Laten we proberen I2C. Tot nu toe heeft de ervaring met I2C ongeveer dezelfde geweest. Ik zal zeggen dat het hebben van interne pull-up weerstanden op de pinnen die ik voor een pre-gedefinieerde waarden is heel nuttig kan instellen. Documentatie over I2C - en de pull-up weerstanden - net als alle Edison documentatie, is vrij dun, maar als je persistent in zoeken op het web, vindt u de antwoorden die u nodig heeft (Hint: `cd / sys / kernel / debug / gpio_debug /<pin number> `En dan kijk in` available_pullmode`, `available_pullstrength` voor acceptabele waarden, zet dan de waarde die u wilt gaan in` current_pullmode` en `current_pullstrength`. Nooit zeggen dat ik was niet behulpzaam.)

Ik kreeg de SDA / SCL afstopweerstanden correct in te stellen, en de richting set correct, en het apparaat met wie ik werk is nu ten minste **gezien** op de I2C-bus. Maar dat is ongeveer net zo ver als ik kan krijgen. In theorie is de I2C bus heeft verschillende snelheden, maar in werkelijkheid is vrij goed vast op 300kHz. Mijn toestel is 100kHz. Nogmaals, in theorie, kunt u de snelheid te veranderen, maar in werkelijkheid, althans volgens alle berichten en reacties, de enige manier om dit effectief te doen is om de hele Linux kernel weer op te bouwen, en zelfs dan, YMMV.

Onnodig te zeggen, mijn kilometerstand variëren. Ik heb geprobeerd met behulp van JavaScript (Node.js), Python, C en Arduino schetsen om de toegang tot de I2C-bus en dit apparaat te krijgen en ieder faalt - in totaal verschillende manieren. Dat is geen goede zaak.

Inrichting Ik gebruik een [Melexis MLX90614](https://www.sparkfun.com/datasheets/Sensors/Temperature/MLX90614_rev001.pdf) (PDF) IR thermometer, ook een PWM. Ok, laatste kans Edison. Game on!

Raad eens? Intel Edison doet alleen PWM uit. Geen PWM in. Dus ik kan niet het apparaat te lezen. Als het een servo, zou ik helemaal klaar zijn. Maar dat is het niet. Dus nogmaals, ik vind het Intel Edison vol belofte te zijn, met geen mogelijkheid om te leveren.

Ik blijf bonzen weg op, en zien of ik kan uiteindelijk krijgen de Edison om iets nuttigs, maar tot nu toe doen, het is een schattig klein apparaat dat niet in het minst nuttig. Krachtig, maar nutteloos.
