---
title: "Sensing met de dingen Network"
Date: 2019-10-10
Author: davidgs
Category: Gadgetry, IoT, Work
Slug: sensing-with-the-things-network
hero: images/TheThings.jpg
---

Er zijn vele manieren om uw sensoren aan te sluiten op het netwerk in het internet der dingen. Voor de korte afstand verbindingen, is er Bluetooth LE, of Zigbee, of 802.15.4, of Z-Wave. Voor langere afstanden (hoewel nog steeds vrij kort) is er altijd WiFi. Maar als je langere afstanden, soms **zeer** lange afstanden nodig, er is LoRaWAN. Het is een sub-gigahertz reeks van frequenties die beschikbaar zijn voor kleine stukjes van gegevens. Deze zijn meestal slechts een paar bytes van gegevens, maar kan worden verzonden over veel langere afstanden - tot 2 km of meer in sommige gevallen! Ze zijn zeer low-power, dus ze zijn zeer geschikt voor remote-sensing-toepassingen.

Om te testen op een aantal LoRaWAN datatransmissie, en zie hoe moeilijk het kan zijn om die gegevens in InfluxDB te krijgen, heb ik besloten om een van mijn sensoren, een temperatuur / luchtvochtigheid / druksensor te verplaatsen, om de dingen Network (TTN), een community-based LoRaWAN provider. Ik was niet zeker hoe moeilijk of makkelijk, kan deze overgang zijn, maar ik was in staat om het te voltooien in minder dan een dag! Dus hier is hoe je het ook doen.

## De hardware

Allereerst moet u ervoor zorgen dat u ofwel zelf een TTN Gateway, of dat er een in uw omgeving. Zoals u kunt zien, zijn er een*lot* van gateways beschikbaar.

![](/posts/category/iot-iot-software/images/Screen-Shot-2019-10-09-at-12.08.22-PM.png)

Er was niet één dicht genoeg, dus zette ik mijn eigen (Tip: Dit zijn **niet** goedkoop te kopen - de mijne kostte me> $ 200), zodat je me op de kaart nu zien:

![](/posts/category/iot-iot-software/images/Screen-Shot-2019-10-09-at-12.09.32-PM-1.png)

Er zijn tal van tutorials over hoe je het opzetten van een gateway, dus ik ben niet van plan om hier te dekken dat.

Vervolgens heb je een Lora radio nodig heeft voor uw sensor. Ik was toevallig een [Adafruit Feather M0](https://www.adafruit.com/product/2772) board liggen (ik heb veel van willekeurige stukken van hardware gewoon 'rondslingeren'), dus ik heb een [ Adafruit Lorra Featherwing](https://www.adafruit.com/product/3231) voor het en zet het op. Tot slot heb ik een [BME280 breakout board](https://www.adafruit.com/product/2652) (opnieuw van Adafruit. Ze moeten echt me te sponsoren!) Om de gegevens te verzamelen en ik was klaar om te gaan.

Bedrading alles up duurt een minuut, dus ik u de details over hoe ik bedraad de mijne zal geven. Het eerste wat opvalt, is dat met de LoRaWAN Featherwing, u **must** doen extra solderen. Hieronder zie je hoe ik moest soldeer jumpers in van `IRQ` {.language-markup}` CS` {.language-markup} `RST` {.language-markup}` DIO1` {.language-markup } en `DIO2` {.language-markup}. Deze kaart vervolgens naar pinnen op de M0 Veer, die we zullen zien in de software sectie. Als u deze jumpers anders bedraden, moet u de pin-instellingen in de software aan te passen.

![](/posts/category/iot-iot-software/images/IMG_6122.png)

U kunt ook een aantal kleine rode draden die vanuit off-screen (Ik hou van deze keramische-gecoate draad, ook al is het een pijn te solderen). Die komen uit de BME280 Breakout board en ga naar de I2C pinnen en De 3V / massa op het bord om de macht van de sensor. Zodra alles wat bedraad, is het neer op software!

## De software

Software voor dit kostte me een minuut om werkend te krijgen, maar de meeste van dat had te maken met het verschil in*hoe* u gegevens via LoRaWAN sturen. Ik ben gewend aan het gebruik van BLE of WiFi, zodat de grootte van de datapakketten echt niet zo veel uit. Met LoRaWAN, de grootte van de datapakketten hoogtij viert.

Het eerste wat je wilt doen is het installeren van de juiste bibliotheek voor uw Arduino. Ik gebruikte de [MCCI LoRaWAN LMIC Library](https://github.com/mcci-catena/arduino-lmic). Het leek het makkelijkst voor de integratie met TTN. Sommige van de documentatie over deze bibliotheek was een beetje minder dan duidelijk (voor mij althans) dus ik u de details van wat ik heb gedaan om deze draaiende te krijgen op een M0 Feather geef. Van daaruit ben ik begonnen met de `TTN-otaa-veer-us915` monster programma. Nu, om de stukken in te vullen. Je moet naar je TTN Console en maak een nieuwe Application.

![](/posts/category/iot-iot-software/images/Screen-Shot-2019-10-09-at-1.19.29-PM.png)

Zodra je die toepassing hebt geregistreerd, moet u de Application EUIS (ID) krijgen te plakken in uw Arduino Sketch. Het is belangrijk op te merken dat, standaard, de TTN console geeft u uw EUIS met de meest significante bit eerst (big-endian), terwijl de Arduino sketch verwacht dat in little-endian. Gelukkig, de TTN console maakt dat alles gemakkelijk:

![](/posts/category/iot-iot-software/images/AppEUI.gif)

Zoals u kunt zien, het maakt zelfs kopiëren naar een byte array eenvoudig.

```cpp
static const u1_t PROGMEM APPEUI[8] = { 0xB2, 0x38, 0x02, 0xD0, 0x7E, 0xD5, 0xB3, 0x70 };
void os_getArtEui (u1_t* buf) {
  memcpy_P(buf, APPEUI, 8);
}
```

Dus, dat is de APP ID. Vervolgens zul je hetzelfde doen voor uw toestel-ID en uw App Key. Klik om een nieuw apparaat te registreren, en u kunt toegang tot alle benodigde informatie van daar te krijgen:

![](/posts/category/iot-iot-software/images/Screen-Shot-2019-10-09-at-1.33.14-PM.png)

```cpp
// This should also be in little endian format, see above.
static const u1_t PROGMEM DEVEUI[8] = { <insert Dev Key> };
void os_getDevEui (u1_t* buf) {
  memcpy_P(buf, DEVEUI, 8);
}

// This key should be in big endian format (or, since it is not really a
// number but a block of memory, endianness does not really apply). In
// practice, a key taken from the TTN console can be copied as-is.
static const u1_t PROGMEM APPKEY[16] = { <insert Program Key> };
void os_getDevKey (u1_t* buf) {
  memcpy_P(buf, APPKEY, 16);
}
```

En maak je geen zorgen over mij die ID's te publiceren. Ik heb gemaakt dat dummy applicatie en het apparaat alleen voor deze blog post, en ze zijn lang voorbij nu. Maar als een herinnering, nooit publiceren van uw ID of sleutels als deze.

U moet deze gegevens buffer aan te passen voor uw gegevens, maar hier is wat ik heb gebruikt: `unsigned char mydata [11];` {.language-markup} Vergeet niet, zei ik dat de ingediende gegevens opzettelijk werd gehouden*erg* laag, zodat ik pak een heleboel gegevens in deze 11 bytes! We zullen zien hoe ik dat doen in een beetje.

Vervolgens komt de pinnen. Vergeet niet van de hardware sectie? Als u uw LoRaWAN veer bedraad precies zoals de mijne, zou dit voor u werken.

```cpp
#if defined(ARDUINO_SAMD_FEATHER_M0) || defined(ADAFRUIT_FEATHER_M0)
// Pin mapping for Adafruit Feather M0 LoRa, etc.
const lmic_pinmap lmic_pins = {
  .nss = 5,
  .rxtx = LMIC_UNUSED_PIN,
  .rst = 6,
  .dio = {9, 10, 11},
  .rxtx_rx_active = 0,
  .rssi_cal = 8, // LBT cal for the Adafruit Feather M0 LoRa, in dB
  .spi_freq = 8000000,
};
```

Dat waren een beetje moeilijk om erachter te komen, en in de steekproef code laat het een paar van die `dio` {.language-markup} pinnen als` LMIC_UNUSED_PIN` {.language-markup} maar de mijne zou niet werken totdat ik gedefinieerd hen alle.

Voor de rest van mijn code gebruikte ik wat ketel-plaat die ik voor de BME280:

```cpp
Adafruit_BME280 bme;
double temperature = 0.00;
double pressure = 0.00;
double altitude = 0.00;
double humidity = 0.00;
bool bme_config = true;

// this goes in the setup() function:
int tryInit = 0;
while (!bme.begin()) {
  Serial.println("Could not find a valid BME280 sensor, check wiring!");
  delay(3000);
  if (++tryInit > 9) {
    bme_config = false;
    break;
  }
}

// a function to get readings:
void getReadings() {
  if (bme_config) {
    temperature = bme.readTemperature();
    pressure = bme.readPressure() / 100.0F;
    altitude = bme.readAltitude(SEALEVELPRESSURE_HPA);
    humidity = bme.readHumidity();
    Serial.print("Temp: "); Serial.println(temperature);
    Serial.print("Humidity: "); Serial.println(humidity);
    Serial.print("Pressure: "); Serial.println(pressure);
    Serial.print("Altitude: "); Serial.println(altitude);
  }
}
```

Nu, om aan de slag de gegevens gevuld in 11 bytes! U zult merken dat ik in mijn standaardtekst BME280 code alle metingen als `double` {.language-markup}, die was prima voor toepassingen met hoge bandbreedte gedefinieerd, maar het zal alleen niet voor LoRaWAN doen. Dus ik ga Whittle ze naar beneden tot en met 2-bytes per stuk (met uitzondering van de drukmeting, die op 4-bytes zal blijven).

```cpp
getReadings();
uint16_t ft = (uint16_t)(temperature * 100);
uint16_t fh = (uint16_t)(humidity * 100);
uint32_t fp = (uint32_t)(pressure * 100);
uint16_t fa = (uint16_t)(altitude * 100);
```

Als ik lezingen, zoals:

> Temp: 25.04
> Vochtigheid: 54.60
> Druk: 1.006,38
> Hoogte: 57.34

Dan zal ik eindigen met

> Temp: 2504
> Vochtigheid: 5460
> Druk 100.638
> Altitude: 5734

Alle 16- en 32-bits gehele getallen. Nu, om ze allemaal spullen in mijn data-array:

```cpp
mydata[0] = ft >> 8;
mydata[1] = ft & 0xFF;
mydata[2] = fh >> 8;
mydata[3] = fh & 0xFF;
mydata[4] = fp & 0xFF;
mydata[5] = (fp >> 8) & 0xFF;
mydata[6] = (fp >> 16) & 0xFF;
mydata[7] = (fp >> 24) & 0xFF;
mydata[8] = fa >> 8;
mydata[9] = fa & 0xFF;
```

Als je niet bekend bent met bit-wise data manipulatie, in principe Ik ben gewoon het verplaatsen van elke byte van elk getal in een plek in mijn byte-array. Aangezien de druk nummer is een 4-byte waarde ik extra verschuiving doen. Ik kan stuur dan dat uit te TTN via LoRaWAN en mijn gegevensoverdracht is voltooid.

Helaas echter, we zijn nog niet klaar !. TTN zal beleefd sturen alle gegevens die ik naar toe te sturen naar een MQTT makelaar voor mij zodat ik kan abonneren en ermee doen wat ik wil. (** Spoiler alert: ** Ik ga het in InfluxDB zetten!)

## Het verkrijgen van de data

Mijn gegevens worden nu in TTN komen via LoRaWAN, en wordt uitgeschreven om een MQTT makelaar voor mij, maar hoe krijg ik bij het? Nou, het eerste wat je moet doen is in te schrijven! Ik gebruik een app genaamd MQTT Box op mijn Mac te abonneren op verschillende MQTT makelaars om gegevens uit verschillende ingangen te zien. Het stelt me in staat om meerdere makelaars te definiëren en te abonneren op een aantal thema's uit die makelaars om mijn gegevens te zien. Om in te schrijven aan de makelaar die u nodig heeft 3 stukjes informatie: De naam / adres van de makelaar, de gebruikersnaam en het wachtwoord in om aan te sluiten. Voor degenen onder ons in de VS, het adres van de makelaar is `wij-west.thethings.network` {.language-markup}. Voor uw gebruikersnaam, zult u de naam van uw toepassing te gebruiken. In het bovenstaande voorbeeld, zouden we `mijn-temp-app` {.language-markup} gebruiken als gebruikersnaam. Voor het wachtwoord, ga je naar uw applicatie op de TTN Console, en op zoek naar de 'Application Key` {.language-markup} aan de onderkant van de pagina. Copy / paste dat in het veld wachtwoord voor de makelaar en u zou moeten verbinden.

Als ik kijk naar mijn data coming out aan mijn MQTT makelaar, merk ik meteen een probleem: Het is gewoon een willekeurige uitziende tekenreeks. Het is eigenlijk niet willekeurig helemaal niet, het is uw data buffer, base-64 gecodeerd.

```cpp
{
  "app_id":"my-temp-app",
  "dev_id":"my-device",
  "hardware_serial":"009E9BA30C869232",
  "port":1,
  "counter":17,
  "payload_raw":"CdgVLRGJAQAWzg==",
}
```

Niet super behulpzaam. Ik vond een **super** nuttig website die zou helpen me dat vertalen in iets meer betekenis. Go [Crypti.com](https://cryptii.com/pipes/base64-to-hex) en plakken in uw ruwe, basis-64-gecodeerde gegevens, en het zal ... vertalen naar hexadecimaal. Hmm ... nog steeds niet wat ik wil zien. Het blijkt, om de gegevens op te halen in een bruikbare vorm, moet je terug naar je TTN console en klik op het tabblad `Payload Formats`. Vanaf hier zullen we de Hex decoderen in iets wat we daadwerkelijk gebruikt.

Vergeet niet, sturen we een array van bytes. Plakte ik de basis-64-gecodeerde boodschap in die website hierboven, en kreeg de volgende:

![](/posts/category/iot-iot-software/images/Screen-Shot-2019-10-09-at-2.34.09-PM.png)

Het gedecodeerd het in een reeks van bytes. Koel! Nu die bytes te decoderen! (We zijn er bijna, dat beloof ik!)

Op uw TTN Consoles `tabblad Payload Formats`, zullen we de volgende functie in te voeren (het is javascript!)

```js
function Decoder(bytes, port) {
  var decoded = {};

  var cInt = (bytes[0] << 8) | bytes[1]; // temperature ºC
  var rem =(bytes[2] << 8) | bytes[3]; // humidity %
  var pre = (bytes[4]) + // pressure is a 4-byte value
  ((bytes[5]) << 8)
    + ((bytes[6]) << 16)
    + ((bytes[7]) << 24) ;
  var alt = (bytes[8] << 8) + bytes[9];
  // Decode integer to float
  decoded.temp_c = cInt / 100;
  decoded.humidity = rem / 100;
  decoded.pressure = pre / 100;
  decoded.altitude = alt / 100;

  return decoded;
}
```

Ik stap door wat we hier doen. Als we terugkijken naar de gegevens te bufferen stuurden we, zult u zich herinneren dat de eerste 2 bytes waren de temperatuur. Zodat strippen wij op deze 2 bytes en opslaan die in een variabele temperatuur. We strip uit de volgende 2 en dat is onze vochtigheid. Vervolgens hebben we nodig om de 4 bytes van de druk, en tenslotte de laatste 2 bytes voor de hoogte te grijpen. Tot slot, decoderen we die terug in hun oorspronkelijke floating-point staat, en we zijn klaar! Nu, als we kijken naar wat er komen uit onze MQTT makelaar, we zullen zien:

```js
{
  "app_id":"my-temp-app",
  "dev_id":"my-device",
  "hardware_serial":"009E9BA30C869232",
  "port":1,
  "counter":28,
  "payload_raw":"CeEVJg6JAQAW7A==",
  "payload_fields":{
  "altitude":58.68,
  "humidity":54.14,
  "pressure":1006.22,
  "temp_c":25.29
},
}
```

Dat is een goede JSON object, met onze gegevens in een bruikbare vorm! Nu voor de laatste bit: om het allemaal in InfluxDB!

## Het krijgen van het in InfluxDB

Gelukkig is dit het gemakkelijkste deel van de hele zaak dankzij Telegraf! Op uw Telegraf gastheer, te bewerken uw `telegraf.conf` {.language-markup} file. Kijk voor het hoofdstuk lezen metrics van MQTT onderwerp (en) en voeg de volgende:

```yml
[[inputs.mqtt_consumer]]
servers = ["tcp://us-west.thethings.network:1883"]
qos = 0
connection_timeout = "30s"
topics = [ "+/devices/+/up" ]
client_id = "ttn"
username = "APP_NAMEr"
password = "APPKEY"
data_format = "json"
```

Dan herstart Telegraf, en, als bij toverslag, moet u in het krijgen van gegevens in InfluxDB! Als ik ga kijken in mijn Data Explorer in Chronograf, moet ik een nieuwe meting genaamd `mqtt_consumer` {.language-markup} en daar ... Whoa te zien !! Veel van de gegevens velden! Het blijkt dat TTN biedt een heleboel extra gegevens over de manier waarop het apparaat is aangesloten en de verzonden gegevens, en dat is alles bewaard door de Telegraf plugin.

![](/posts/category/iot-iot-software/images/data1.gif)

Uw sensor data zal `payload_fields_` {.language-markup} ervoor gezet te hebben. Al de rest zijn gegevens **over** uw gegevens.

Zoals gebruikelijk, het gemakkelijkste deel van bijna elke inzet ik doe is het InfluxDB deel. Zodra ik had de gegevens die uit de MQTT makelaar in het juiste formaat, met het opgeslagen in InfluxDB duurde slechts een paar regels configuratie. Ik kan nu bouwen aan een dashboard van mijn temperatuur, vochtigheid, druk en hoogte data in Chronograf.
