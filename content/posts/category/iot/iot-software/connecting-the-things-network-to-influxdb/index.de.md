---
Title: "Connecting The Things Network to InfluxDB"
Date: 2019-03-10
Category: IoT, TTN, The Things Network
Slug: connecting-the-things-network-to-influxdb
hero: images/Screen-Shot-2019-10-09-at-12.08.22-PM.png
---

Es gibt viele Möglichkeiten, um Ihre Sensoren an das Netzwerk im Internet der Dinge zu verbinden. Für Kurzstrecken-Verbindungen gibt es Bluetooth LE oder Zigbee oder 802.15.4 oder Z-Wave. Für längere Strecken (wenn auch noch recht kurz) gibt es immer WiFi. Aber wenn man längere Strecken müssen, manchmal sehr lange Strecken gibt es LoRaWAN. Es ist ein Sub-Gigahertz-Satz von Frequenzen, die für kleine Datenmengen zur Verfügung stehen. Diese sind in der Regel nur wenige Bytes von Daten, sondern können viel größere Entfernungen geschickt werden - bis zu 2 km oder mehr in einigen Fällen! Sie sind sehr niedrige Leistung, so dass sie groß sind für Fernerkundung.

Um zu testen, ein Übertragungs LoRaWAN Daten und sehen, wie schwer es könnte, dass die Daten in InfluxDB zu bekommen sein, habe ich beschlossen, eine meiner Sensoren zu bewegen, eine Temperatur / Feuchte / Drucksensor, um die Dinge zu Network (TTN), ein Community-basierte LoRaWAN Anbieter. Ich war nicht sicher, wie schwer oder leicht, kann dieser Übergang sein, aber ich konnte es in weniger abgeschlossen als einen Tag! Also hier ist, wie Sie es auch tun.

## Die Hardware

Zunächst einmal müssen Sie sicherstellen, dass Sie entweder eine TTN-Gateway haben sich selbst, oder dass es einen in Ihrer Nähe ist. Wie Sie sehen können, gibt es eine Menge von Gateways zur Verfügung.

![Karte aller TTN Gateways](/posts/category/iot/iot-software/images/Screen-Shot-2019-10-09-at-12.08.22-PM.png)

Es war nicht nah genug, so dass ich meinen eigenen setzen (Tipp: Dies ist ** ** nicht billig zu kaufen - Mine kostet mich> $ 200), so dass Sie auf der Karte jetzt sehen:

![Karte von TTN-Gateways in der Nähe von Raleigh, NC](/posts/category/iot/iot-software/images/Screen-Shot-2019-10-09-at-12.09.32-PM-1.png)

Es gibt viele Anleitungen, wie einen Gateway einzurichten, so dass ich das hier nicht gehen zu decken.

Als Nächstes werden Sie ein Lora Radio für Ihren Sensor benötigen. Ich war zufällig eine [Adafruit Feder M0](https://www.adafruit.com/product/2772) Platte herumliegen (Ich habe eine Menge von zufälligen Teilen der Hardware nur ‚herumliegen‘), so dass ich eine bekam) Platte herumliegen (Ich habe eine Menge von zufälligen Teilen der Hardware nur ‚herumliegen‘), so dass ich eine bekam [ Adafruit lorra Featherwing](https://www.adafruit.com/product/3231) für sie und legt sie auf. Schließlich habe ich eine) für sie und legt sie auf. Schließlich habe ich eine [BME280 Breakout-Board](https://www.adafruit.com/product/2652) (wieder von Adafruit. Sie sollten wirklich mich sponsern!), Um die Daten zu sammeln, und ich war bereit zu gehen.

alles bis Verdrahten dauert eine Minute, so dass ich Ihnen die Details geben würde, wie ich meine verdrahtet. Das erste, was zu beachten ist, dass mit dem LoRaWAN Featherwing Sie ** ** Muss zusätzliche Löten tun. Sie können unten sehen, wie ich zu Lötbrücken hatte in von `IRQ`,` CS`, `RST`,` DIO1` und `DIO2`. Diese Karte dann an den Pins auf der M0 Feder, die wir im Software-Bereich sehen. Wenn Sie diese Jumper auf anders verdrahten, müssen Sie die Stifteinstellungen in der Software entsprechend anzupassen.

![Ein LoRaWAN IoT Vorstand](/posts/category/iot/iot-software/images/IMG_6122.png)

Sie können auch einige kleine rote Drähte kommen in sehen von Off-Screen (Ich liebe diese keramikbeschichteten Draht, auch wenn es ein Schmerz zu löten ist). Diejenigen, kommen aus der BME280 Breakout Board und gehen Sie zu dem I2C-Pins und die 3v / Boden auf der Platine an der Macht des Sensor. Nachdem alle, die verdrahtet ist, ist es zu Software-down!

## Die Software

Software für das dauerte eine Minute zum Laufen zu bringen, aber das meiste davon hatte mit dem Unterschied, zu tun, wie Sie Daten über LoRaWAN senden. Ich bin zur Verwendung von BLE oder WiFi verwendet, so dass die Größe der Datenpakete ist wirklich egal, dass viel. Mit LoRaWAN herrscht die Größe der Datenpakete höchsten.

Das erste, was Sie wollen, werden zu tun ist, die richtige Bibliothek für Ihre Arduino installieren. Früher habe ich die [MCCI LoRaWAN LMIC Library](https://github.com/mcci-catena/arduino-lmic). Es schien die einfachste mit TTN zu integrieren. Ein Teil der Dokumentation zu dieser Bibliothek war etwas weniger als klar (zumindest für mich) so gebe ich Ihnen die Einzelheiten dessen, was ich tat dies läuft auf eine M0 Feder zu erhalten. Von dort begann ich mit dem `TTN-otaa-Feder-us915` Beispielprogramm. Nun, in den Stücken zu füllen. Sie benötigen, um Ihre TTN-Konsole gehen und eine neue Anwendung erstellen.

![Der neue Anwendungsbildschirm](/posts/category/iot/iot-software/images/Screen-Shot-2019-10-09-at-1.19.29-PM.png)

Sobald Sie diese Anwendung registriert haben, müssen Sie die Anwendung EUIS (ID), um in Ihre Arduino Sketch einzufügen. Es ist wichtig, dass standardmäßig zu beachten, die TTN-Konsole Sie Ihre EUIS mit höchstwertigen Bits gibt erste (Big-Endian), während die Arduino Skizze erwartet sie in Little-Endian. Glücklicherweise macht die TTN Konsole all das einfach:

![Die Anwendung EUI Bildschirm](/posts/category/iot/iot-software/images/AppEUI.gif)

Wie Sie sehen können, macht es sogar in ein Byte-Array einfach zu kopieren.

```cpp
static const u1_t PROGMEM APPEUI[8] = { 0xB2, 0x38, 0x02, 0xD0, 0x7E, 0xD5, 0xB3, 0x70 };
void os_getArtEui (u1_t* buf) {
  memcpy_P(buf, APPEUI, 8);
}
```

Also, das ist die APP-ID. Als nächstes werden Sie das gleiche für Ihre Geräte-ID und Ihre App Key tun. Klicken Sie auf ein neues Gerät zu registrieren, und Sie können von dort aus Zugriff auf alle benötigten Informationen zu bekommen:

![Die Geräte-ID-Bildschirm](/posts/category/iot/iot-software/images/Screen-Shot-2019-10-09-at-1.33.14-PM.png)

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

Und keine Sorge über mich diese IDs zu veröffentlichen. Ich habe, dass die Dummy-Anwendung und Gerät nur für diese Blog-Post, und sie sind jetzt lang gegangen. Aber als Erinnerung, zu veröffentlichen niemals Ihre IDs oder Tasten wie diese.

Sie müssen diese Datenpuffer für die Daten anzupassen, aber hier ist, was ich verwendet: `unsigned char mydata [11];` Denken Sie daran, ich sagte, dass die übertragenen Daten absichtlich sehr niedrig gehalten wurde, so dass ich eine ganze Menge Verpackung Daten in dieses 11 Bytes! Wir werden sehen, wie ich in etwas tun.

Als nächstes kommt die Stifte. Denken Sie daran, aus dem Hardware-Abschnitt? Wenn Sie Ihre LoRaWAN Feder wie meine verdrahtet genau, sollte dies für Sie arbeiten.

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

Das war ein wenig schwer, herauszufinden, und in dem Beispielcode läßt sie ein paar dieses `dio` Pins als` LMIC_UNUSED_PIN` aber ich würde nicht funktionieren, bis ich sie alle definiert.

Für den Rest von meinem Code, habe ich einige Kessel-Platte I für die BME280 haben:

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

Nun, die Daten zu erhalten, in 11 Bytes gestopft! Sie werden feststellen, dass BME280 Code in meinem Text merke ich, alle Messungen als `double` definiert, die gut für Anwendungen mit hoher Bandbreite, aber es wird nur für LoRaWAN nicht tun. Also habe ich sie einzuengen 2-Bytes jeweils (mit Ausnahme der Druckmessung, die bei 4-Bytes bleiben wird) werde.

```cpp
getReadings();
    uint16_t ft = (uint16_t)(temperature * 100);
    uint16_t fh = (uint16_t)(humidity * 100);
    uint32_t fp = (uint32_t)(pressure * 100);
    uint16_t fa = (uint16_t)(altitude * 100);
```

Wenn ich Lesungen wie:

> Temp: 25.04
>
> Feuchtigkeit: 54.60
>
> Druck: 1.006,38
>
> Höhe: 57.34

Dann werde ich am Ende mit:

> Temp: 2502
>
> Feuchtigkeit: 5460
>
> Druck 100638
>
> Höhe: 5734

Alle 16- und 32-Bit-Integer. Nun, sie alle in meine Daten-Array zu stopfen:

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

Wenn Sie mit bitweise Datenmanipulation nicht vertraut sind, im Grunde bin bewege ich nur jedes Byte jeder Zahl in eine Stelle in meinem Byte-Array. Da die Drucknummer ein 4-Byte-Wert ist, habe ich zusätzliche Verschiebung zu tun. Ich kann dann das aus, um TTN über LoRaWAN senden und meine Datenübertragung abgeschlossen ist.

Leider aber sind wir noch nicht fertig !. TTN wird höflich alle die Daten, die ich an ihn schicken, um einen MQTT Broker für mich schicken, damit ich ihn abonnieren können und mit ihm tun, wie ich bitte. (** Spoiler-Alarm: ** Ich werde es in InfluxDB setzen!)

## Abrufen der Daten

Meine Daten kommen jetzt in TTN über LoRaWAN, und werden für mich zu einem MQTT Broker geschrieben, aber wie ich es bekomme? Nun, das erste, was zu tun ist, abonniert! Ich benutze eine App MQTT Box auf meinem Mac aufgerufen, um verschiedene MQTT Broker zu abonnieren Daten von verschiedenen Eingängen zu sehen. Es erlaubt mir, mehrere Makler zu definieren und zu einer beliebigen Anzahl von Themen aus diesen Makler abonnieren Daten zu sehen. So abonnieren Sie den Broker Sie benötigen 3 Informationen: Der Name / Adresse des Brokers, der Benutzername und das Passwort zu verbinden. Für die von uns in den USA, ist die Adresse des Brokers `us-west.thethings.network`. Für Ihre Benutzername, werden Sie den Namen Ihrer Anwendung verwenden. In dem obigen Beispiel würden wir `my-temp-app` als Benutzername verwenden. Für das Passwort, werden Sie Ihre Anwendung auf dem TTN-Konsole und das Aussehen für die * Anwendungstaste gehen * am unteren Rand der Seite. Kopieren / Einfügen ist, dass in das Kennwortfeld für den Broker und Sie sollen verbinden.

Wenn ich an meine Daten kommen aus schauen, um meine MQTT Broker, merke ich sofort ein Problem: Es ist nur eine zufällige aussehende Zeichenfolge. Es ist eigentlich nicht zufällig überhaupt - es ist Ihre Daten puffern, Base64-kodiert.

```json
{ "app_id":"my-temp-app",
  "dev_id":"my-device",
  "hardware_serial":"009E9BA30C869232",
  "port":1,
  "counter":17,
  "payload_raw":"CdgVLRGJAQAWzg==",
}
```

Nicht super hilfsbereit. Ich habe ein ** Super ** hilfreich Website, die mir, dass in etwas Sinnvolles übersetzen würde helfen. Gehen Sie zu [Crypti.com](https://Crypti.com) und fügen Sie ihn in Ihrem rohen, Base64-codierten Daten, und es wird ... übersetzen es zu Hexadezimal. Hmm ... noch nicht, was ich sehen will. Es stellt sich heraus, um die Daten in eine brauchbare Form zu erhalten, müssen Sie Ihre TTN-Konsole zurück gehen und klicken Sie auf die * Payload-Formate * Tab. Von hier aus werden wir die Hex in etwas entschlüsseln wir tatsächlich nutzen können.

Denken Sie daran, wir senden eine Reihe von Bytes. Ich klebte die Base-64-codierte Nachricht in diese Website oben, und bekam die folgende:

![Entschlüsselten Byte-Array über die Website](/posts/category/iot/iot-software/images/Screen-Shot-2019-10-09-at-2.34.09-PM.png)

Es dekodiert es in eine Reihe von Bytes. Cool! Nun dieses Bytes zu entschlüsseln! (Wir sind fast da, versprochen!)

Auf dem TTN Konsolen Payload Registerkarte Formate, werden wir die folgende Funktion eingeben (es ist Javascript!)

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

Ich werde Schritt durch das, was wir hier machen. Wenn wir die Datenpuffer wir blicken zurück gesendet, werden Sie sich daran erinnern, dass die ersten 2 Bytes die Temperatur waren. So Streifen wir diese 2 Bytes und speichert die in einer Temperaturgröße aus. Wir streifen die nächsten 2 aus und das ist unsere Luftfeuchtigkeit. Wir müssen dann die 4 Bytes des Drucks packen, und schließlich die letzten 2 Bytes für die Höhe. Schließlich entschlüsseln wir diese wieder in ihren ursprünglichen Floating-Point-Zustand, und wir sind fertig! Nun, wenn wir schauen, was unsere MQTT Büros herauskommen, werden wir sehen:

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

Das ist ein richtiges JSON-Objekt, mit unseren Daten in einer nutzbaren Form! Jetzt für das letzte Bit: immer alles in InfluxDB!

## Getting it in InfluxDB

Glücklicherweise ist dies der einfachste Teil der ganzen Sache dank Telegrafen! Auf Ihrem telegraf Host, bearbeiten Sie Ihre `telegraf.conf` Datei. Suchen Sie nach dem Abschnitt mit dem Titel lesen Metriken aus MQTT Thema (en) und fügen Sie den folgenden:

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

Dann Neustart telegraf, und, wie Magie, sollten Sie immer Daten in InfluxDB sein! Wenn ich Blick in meinen Daten-Explorer in Chronografen gehen, soll ich eine neue Messung sehen genannt `mqtt_consumer` und dort ... Whoa !! Viele Datenfelder! Es stellt sich heraus, dass TTN eine Reihe von zusätzlichen Daten über liefert, wie das Gerät angeschlossen und schickte seine Daten, und dass alle von der Telegraf-Plugin erhalten bleibt.

![Live dashobard Zufuhr von Daten](/posts/category/iot/iot-software/images/data1.gif)

Ihre Sensordaten haben `payload_fields_` es vorangestellt. Der ganze Rest ist Daten ** ** über Ihre Daten.

Wie üblich, ich der einfachste Teil von fast jedem Einsatz tun, ist das InfluxDB Teil. Einmal hatte ich die Daten des Brokers MQTT im richtigen Format herauskommen, es gespeichert hat in InfluxDB nur ein paar Zeilen Konfiguration hat. Ich kann jetzt ein Armaturenbrett meine Temperatur, Feuchte, Druck und Höhendaten in Chronograf bauen.

