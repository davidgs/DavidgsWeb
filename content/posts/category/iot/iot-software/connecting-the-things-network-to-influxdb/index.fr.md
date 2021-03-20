---
Title: "Connecting The Things Network to InfluxDB"
Date: 2019-03-10
Category: IoT, TTN, The Things Network
Slug: connecting-the-things-network-to-influxdb
hero: images/Screen-Shot-2019-10-09-at-12.08.22-PM.png
---

Il y a plusieurs façons de connecter vos capteurs au réseau dans l'IdO. Pour les connexions à courte portée, il est Bluetooth LE, ou Zigbee, ou 802.15.4, ou ZWave. Pour des distances plus longues (bien que toujours assez court), il y a toujours WiFi. Mais quand vous avez besoin de plus longues distances, parfois très longues distances, il y a lorawan. Il est un sous-ensemble gigahertz des fréquences qui sont disponibles pour les petits bits de données. Ceux-ci sont généralement que quelques octets de données, mais peuvent être envoyées sur des distances plus longues - jusqu'à 2 km ou plus dans certains cas! Ils sont très faible puissance, donc ils sont parfaits pour les applications de télédétection.

Afin de tester une transmission de données lorawan, et voir à quel point il pourrait être d'obtenir ces données dans InfluxDB, j'ai décidé de déplacer l'un de mes capteurs, un capteur de température / humidité / pression, aux choses du réseau (TTN), un communautaire basé sur le fournisseur lorawan. Je ne savais pas à quel point, ou facile, cette transition peut-être, mais je suis en mesure de terminer en moins d'une journée! Voici donc comment vous pouvez le faire aussi.

## Le matériel

Tout d'abord, vous devez vous assurer que vous avez soit une passerelle TTN vous, ou qu'il y a un dans votre région. Comme vous pouvez le voir, il y a beaucoup de passerelles disponibles.

![Carte de toutes les passerelles TTN](/posts/category/iot/iot-software/images/Screen-Shot-2019-10-09-at-12.08.22-PM.png)

Il n'y avait pas un assez proche, donc je mets mon propre (Astuce: Ce sont ** pas ** pour acheter pas cher - le mien m'a coûté> 200 $) afin que vous puissiez me voir sur la carte maintenant:

![Carte des passerelles TTN près de Raleigh, Caroline du Nord](/posts/category/iot/iot-software/images/Screen-Shot-2019-10-09-at-12.09.32-PM-1.png)

Il y a beaucoup de tutoriels sur la façon de mettre en place une passerelle, donc je ne vais pas couvrir ici.

Ensuite, vous aurez besoin d'une radio Lora votre capteur. Je est arrivé d'avoir un [Adafruit plumes M0](https://www.adafruit.com/product/2772) carte se trouvant autour (j'ai beaucoup de pièces au hasard de matériel juste « traîner »), donc je suis un) carte se trouvant autour (j'ai beaucoup de pièces au hasard de matériel juste « traîner »), donc je suis un [ Adafruit Lorra Featherwing](https://www.adafruit.com/product/3231) pour elle et le mettre. Enfin, j'ai utilisé une) pour elle et le mettre. Enfin, j'ai utilisé une [carte de petits groupes BME280](https://www.adafruit.com/product/2652) (encore une fois de Adafruit. Ils devraient vraiment me parrainer!) Pour recueillir les données et je suis prêt à aller.

Câblage tout en prend une minute, donc je vais vous donner les détails sur la façon dont je le mien câblé. La première chose à noter est que le lorawan Featherwing, vous ** ** doit faire la soudure supplémentaire. Vous pouvez voir ci-dessous comment je devais cavaliers à souder de `IRQ`,` CS`, `RST`,` `DIO1` et DIO2`. Ces carte puis les broches sur la plume M0, que nous verrons dans la section logicielle. Si vous câbler ces cavaliers différemment, vous devrez régler les paramètres de broches dans votre logiciel en conséquence.

![Un lorawan Conseil IdO](/posts/category/iot/iot-software/images/IMG_6122.png)

Vous pouvez également voir quelques petits fils rouges venant de hors-écran (j'aime ce fil revêtu de céramique, même si elle est une douleur à la soudure). Ceux proviennent de la carte Breakout BME280 et aller aux broches I2C et le 3v / masse sur la carte pour alimenter le capteur. Une fois que tout ce qui est câblé, il est bas au logiciel!

## Les logiciels

Logiciels pour cela m'a pris une minute pour travailler, mais la plupart qui ont dû faire la différence dans la façon dont vous envoyez des données sur lorawan. Je suis habitué à utiliser BLE ou WiFi, de sorte que la taille des paquets de données n'a pas d'importance tant que ça. Avec lorawan, la taille des paquets de données règne.

La première chose que vous voulez faire est d'installer la bibliothèque pour votre Arduino. Je le [MCCI lorawan PFR Library](https://github.com/mcci-catena/arduino-lmic). Il semblait le plus facile pour l'intégration avec TTN. Une partie de la documentation sur cette bibliothèque était un peu moins clair (au moins pour moi), donc je vais vous donner les détails de ce que je faisais pour obtenir cette course sur une plume M0. A partir de là, j'ai commencé avec le programme `TTN-otaa-plumes us915` échantillon. Maintenant, pour remplir les morceaux. Vous aurez besoin d'aller à votre TTN Console et créer une nouvelle application.

![Le nouvel écran d'application](/posts/category/iot/iot-software/images/Screen-Shot-2019-10-09-at-1.19.29-PM.png)

Une fois que vous avez enregistré cette application, vous devrez obtenir l'application EUIS (ID) pour coller dans votre Arduino Sketch. Il est important de noter que, par défaut, la console TTN vous donne votre EUIS avec bit le plus significatif en premier (grand-boutiste) alors qu'attend Arduino esquisser à petit-boutiste. Heureusement, la console TTN rend tout cela facile:

![L'écran demande EUI](/posts/category/iot/iot-software/images/AppEUI.gif)

Comme vous pouvez le voir, il fait même le copier dans un simple tableau d'octets.

```cpp
static const u1_t PROGMEM APPEUI[8] = { 0xB2, 0x38, 0x02, 0xD0, 0x7E, 0xD5, 0xB3, 0x70 };
void os_getArtEui (u1_t* buf) {
  memcpy_P(buf, APPEUI, 8);
}
```

Donc, c'est l'ID APP. Ensuite, vous allez faire la même chose pour votre ID de périphérique et votre application clé. Cliquez pour enregistrer un nouvel appareil, et vous pouvez avoir accès à toutes les informations nécessaires à partir de là:

![L'écran Device ID](/posts/category/iot/iot-software/images/Screen-Shot-2019-10-09-at-1.33.14-PM.png)

```cpp
// This should also be in little endian format, see above.
static const u1_t PROGMEM DEVEUI[8] = { <insert Dev Key };
void os_getDevEui (u1_t* buf) {
  memcpy_P(buf, DEVEUI, 8);
}

// This key should be in big endian format (or, since it is not really a
// number but a block of memory, endianness does not really apply). In
// practice, a key taken from the TTN console can be copied as-is.
static const u1_t PROGMEM APPKEY[16] = { <insert Program Key };
void os_getDevKey (u1_t* buf) {
  memcpy_P(buf, APPKEY, 16);
}
```

Et ne vous inquiétez pas pour moi publier ces ID. J'ai créé cette application factice et le dispositif juste pour ce billet de blog, et ils sont disparus depuis longtemps maintenant. Mais comme un rappel, ne jamais publier vos identifiants ou clés comme celui-ci.

Vous devrez ajuster cette mémoire tampon de données pour vos données, mais voici ce que je: `unsigned char mydata [11];` Rappelez-vous, je l'ai dit que les données transmises ont été volontairement maintenus très bas, donc je suis d'emballage beaucoup de données dans ce 11 octets! Nous verrons comment je fais ça un peu.

Vient ensuite les broches. Rappelez-vous de la section de matériel? Si vous avez câblé votre plume lorawan exactement comme le mien, cela devrait fonctionner pour vous.

```cpp
#if defined(ARDUINO_SAMD_FEATHER_M0) || defined(ADAFRUIT_FEATHER_M0)
// Pin mapping for Adafruit Feather M0 LoRa, etc.
const lmic_pinmap lmic_pins = {
  .nss = 5,
  .rxtx = LMIC_UNUSED_PIN,
  .rst = 6,
  .dio = {9, 10, 11},
  .rxtx_rx_active = 0,
  .rssi_cal = 8,              // LBT cal for the Adafruit Feather M0 LoRa, in dB
  .spi_freq = 8000000,
};
```

Ceux-ci étaient un peu difficile à comprendre, et dans l'exemple de code, il laisse deux ou trois de ces `` broches dio` comme LMIC_UNUSED_PIN` mais le mien ne marcherait pas jusqu'à ce que je les définit tous.

Pour le reste de mon code, j'ai utilisé la plaque de la chaudière je le BME280:

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
    Serial.print("Temp:     "); Serial.println(temperature);
    Serial.print("Humidity: "); Serial.println(humidity);
    Serial.print("Pressure: "); Serial.println(pressure);
    Serial.print("Altitude: "); Serial.println(altitude);
  }
}
```

Maintenant, pour obtenir les données fourra dans 11 octets! Vous remarquerez que dans mon boilerplate Code BME280 je définissais toutes les mesures que `double` qui était très bien pour les applications à haut débit, mais il ne pourrez pas faire pour lorawan. Donc, je vais les Whittle jusqu'à 2 octets chacun (à l'exception de la mesure de la pression, qui restera à 4 octets).

```cpp
getReadings();
    uint16_t ft = (uint16_t)(temperature * 100);
    uint16_t fh = (uint16_t)(humidity * 100);
    uint32_t fp = (uint32_t)(pressure * 100);
    uint16_t fa = (uint16_t)(altitude * 100);
```

Si j'ai des lectures comme:

> Temp: 25,04
>
> Humidité: 54,60
>
> Pression: 1006,38
>
> Altitude: 57,34

Alors, je vais terminer par:

> Temp: 2502
>
> Humidité: 5460
>
> Pression 100638
>
> Altitude: 5734

Tous les 16- et entiers 32 bits. Maintenant, pour les fourrer tous dans mon tableau de données:

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

Si vous n'êtes pas familier avec la manipulation des données peu sage, au fond, je suis juste le déplacement de chaque octet de chaque numéro dans un endroit dans mon octet tableau. Étant donné que le nombre de pression est une valeur de 4 octets, je dois faire le déplacement supplémentaire. Je peux alors envoyer ce large à TTN via lorawan et ma transmission de données est terminée.

Malheureusement, cependant, nous ne sommes pas encore fini !. TTN sera poliment envoyer toutes les données que j'envoie dehors à un courtier MQTT pour moi afin que je puisse souscrire et faire ce que je s'il vous plaît. (** alerte Spoiler: ** Je vais le mettre en InfluxDB!)

## Obtenir les données

Mes données sont maintenant à venir dans TTN par lorawan et est en cours d'écriture sur un courtier MQTT pour moi, mais comment puis-je obtenir à elle? Eh bien, la première chose à faire est de souscrire! J'utilise une application appelée MQTT Box sur mon Mac pour vous abonner à différents courtiers MQTT pour voir les données de différentes entrées. Il me permet de définir plusieurs courtiers, et de souscrire à un certain nombre de sujets de ces courtiers pour voir mes données. Pour vous abonner au courtier que vous avez besoin de 3 pièces d'information: Le nom / adresse du courtier, le nom d'utilisateur et le mot de passe pour se connecter. Pour ceux d'entre nous aux États-Unis, l'adresse du courtier est `nous-west.thethings.network`. Pour votre nom d'utilisateur, vous utiliserez le nom de votre application. Dans l'exemple ci-dessus, nous utiliserions `my-temp-app` comme nom d'utilisateur. Pour le mot de passe, vous allez à votre application sur la console TTN et recherchez l'application * clé * en bas de la page. Copier / coller que, dans le champ de mot de passe pour le courtier et vous devez vous connecter.

Si je regarde mes données à venir à mon courtier MQTT, je remarque immédiatement un problème: Il est juste une chaîne aléatoire à la recherche de caractères. Il est en fait pas au hasard du tout - ce sont vos données tampon, Codé à base 64.

```json
{ "app_id":"my-temp-app",
  "dev_id":"my-device",
  "hardware_serial":"009E9BA30C869232",
  "port":1,
  "counter":17,
  "payload_raw":"CdgVLRGJAQAWzg==",
}
```

Pas super utile. J'ai trouvé super ** ** site web utile qui me aider à traduire cela en quelque chose de plus significatif. Aller à [Crypti.com](https://Crypti.com) et coller dans vos données brutes, codées en base 64, et il ... traduire en hexadécimaux. Hmm ... pas encore ce que je veux voir. Il se trouve, afin d'obtenir les données sous une forme utilisable, il faut revenir à votre console TTN et cliquez sur le * Formats Payload onglet *. A partir de là, nous allons décoder le Hex en quelque chose que nous pouvons réellement utiliser.

Rappelez-vous, nous envoyons un tableau d'octets. Je collais le message de base-64-encodée dans ce site Web ci-dessus, et a obtenu les points suivants:

![tableau d'octets déchiffré via le site web](/posts/category/iot/iot-software/images/Screen-Shot-2019-10-09-at-2.34.09-PM.png)

Il décodé en une série d'octets. Frais! Maintenant, pour décoder les octets! (Nous y sommes presque, je vous le promets!)

Sur votre TTN onglet Consoles Formats Payload, nous allons entrer dans la fonction suivante (il est javascript!)

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

Je vais un pas par ce que nous faisons ici. Si nous regardons en arrière au tampon, nous avons envoyé des données, vous rappelez-vous que les 2 premiers octets sont la température. Nous avons donc Désape ces 2 octets et stocker ces données dans une variable de température. Nous Désape le 2 suivant et c'est notre humidité. Il nous faut donc saisir les 4 octets de la pression, et enfin les 2 derniers octets pour l'altitude. Enfin, on décode ceux qui reviennent dans leur état d'origine à virgule flottante, et nous avons fini! Maintenant, si nous regardons ce qui sort de notre courtier MQTT, nous verrons:

```json
{ "app_id":"my-temp-app",
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

Ce qui est un bon objet JSON, avec nos données sous une forme utilisable! Maintenant, pour le bit final: obtenir tout en InfluxDB!

## Obtenir dans InfluxDB

Heureusement, c'est la partie la plus facile de la chose entière grâce à Telegraf! Sur votre hôte Telegraf, modifier votre fichier `telegraf.conf`. Recherchez la section intitulée métriques Lire le sujet de MQTT (s) et ajouter ce qui suit:

```
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

Ensuite telegraf restart, et, comme par magie, vous devriez obtenir des données dans InfluxDB! Si je vais regarder dans l'explorateur de données dans Chronograf, je devrais voir une nouvelle mesure appelée `mqtt_consumer` et là-dedans ... Waouh !! Beaucoup de champs de données! Il se avère que TTN fournit un tas de données supplémentaires sur la façon dont l'appareil connecté et envoyé ses données, et est tout conservé par le plug-in Telegraf.

![flux en direct dashobard des données](/posts/category/iot/iot-software/images/data1.gif)

Vos données de capteur auront `payload_fields_` pré-ajouté aux. Tout le reste est des données ** ** A propos de vos données.

Comme d'habitude, la partie la plus facile de presque tout déploiement que je fais est la partie InfluxDB. Une fois que j'avais les données sortant du courtier MQTT dans le format approprié, l'avoir stocké dans InfluxDB a seulement quelques lignes de configuration. Je peux maintenant construire un tableau de bord de ma température, l'humidité, la pression et les données d'altitude dans Chronograf.

