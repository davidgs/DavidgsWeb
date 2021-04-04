---
title: „Hier Warum ich gebe auf MyNewt bis (vorerst)“
Date: 2018-04-04
Author: davidgs
Category: IoT
Tags: Developer, IoT, mynewt
Slug: heres-why-im-giving-up-on-mynewt-for-now
hero: images/logo.png
---

![Large collection of microcontrollers and sensors](/posts/category/iot/iot-software/images/IMG_3724-300x293.jpg)

Mit all diesen Sensoren und Plattformen herumliegen, wollte ich nur eine auswählen und eine schnelle Sensor Demo zu bauen. Es sollte einfach sein, nicht wahr?

## Die Grundidee

Wie Sie vielleicht (oder nicht können) wissen, verbrachte ich viel Zeit mit dem [Apache MyNewt Projekt](https://mynewt.apache.org/) ein Jahr oder so vor. Es hat ein enormes Potenzial. Es ist klein, schnell und sehr leicht. Ich schrieb sogar ein) ein Jahr oder so vor. Es hat ein enormes Potenzial. Es ist klein, schnell und sehr leicht. Ich schrieb sogar ein [Tutorial](/posts/category/iot/iot-software/building-an-app-with-apache-mynewt/) auf eine App mit MyNewt entwickeln. Ich bin sicher, dass dieser Beitrag wird die gut Leute an diesem Projekt arbeiten ärgern, aber das ist sicherlich nicht meine Absicht.

eine neue Demo für meinen neuen-ish Job bei der Entwicklung, habe ich Probleme mit der Stabilität des Stapels Arduino Bluetooth mit. Ich entschied, dass vielleicht MyNewt eine bessere Route für dieses spezielle Gerät war, so dass ich versuche, begann die App für MyNewt zu entwickeln. Hier ist, warum ich aufgeben.

Dies ist eine tote einfache Anwendung. Es tut 3 Dinge:

1. Wartet, bis es eine Verbindung über Bluetooth bekommt
2. Wenn angeschlossen, liest einen I2C-Sensor
3. sendet den Wert von dem Sensor zu dem angeschlossenen Gerät

Einfach. In Arduino gibt es eine I2C-Bibliothek, „Wire“ Bibliothek, und ich kann eine Wire.begintransmission (0x68) einfach tun - die I2C-Adresse des Geräts - dann Wire.write () so viele Bytes, wie ich will, dann Draht. endtransmission () und der Schreibvorgang auf dem I2C-Gerät erfolgt. Ebenso kann ich von einem I2C-Gerät Registern mit einem Wire.requestFrom (I2CAddr, len) lesen und die Anzahl der Bytes zurück I von der I2C-Geräteadresse angefordert angefordert. Einfach. Sauber.

## Der MyNewt Ansatz

Leider in MyNewt, muß ich so ziemlich von vorne anfangen und komplexen Datenstrukturen aufzubauen, dann herauszufinden, wie sie richtig zu initialisieren, hier das „Beispiel“ von einem anderen I2C-Sensor:

```cpp
int bno055_write8(struct sensor_itf *itf, uint8_t reg, uint8_t value) {
  int rc;
  uint8_t payload[2] = { reg, value};
  struct hal_i2c_master_data data_struct = {
    .address = itf->si_addr,
    .len = 2,
    .buffer = payload
  };
  rc = hal_i2c_master_write(itf->si_num, &data_struct, OS_TICKS_PER_SEC, 1);
  if (rc) {
    BNO055_ERR("Failed to write to 0x%02X:0x%02X with value 0x%02Xn",
    data_struct.address, reg, value);
    STATS_INC(g_bno055stats, errors);
  }
  return rc;
}
```

Beachten Sie, dass die „data_struct“ nimmt die Adresse aus dem „Sensor-Interface“ Struktur, aber dann muss ich sie passieren ** ** sowohl an den `i2c_master_write ()` Anruf. Ich täuschen um mit dieser für ein paar Tage versucht, es muss ich den Sensor anzupassen - und mein Sensor ** viel ** einfacher - ich einfach schreiben 4 Bytes auf die richtige I2C-Adresse, dann 4 Bytes zurückgelesen.

Hier ist die Gesamtheit des Codes erforderlich in Arduino:

```cpp
int readVal() {
  int value = 0;
  byte attn[4] = {0x22, 0x00, 0x08, 0x2A};
  Wire.beginTransmission(Addr);
  int x;
  for (x = 0; x < 4; x = x + 1) {
    Wire.write(attn[x]);
  }
  delay(10);
  Wire.endTransmission();
  delay(10);
  Wire.requestFrom(Addr, 4);
  byte i = 0;
  byte buffer[4] = {0, 0, 0, 0};
  while (Wire.available()) {
    buffer[i] = Wire.read();
    i++;
  }
  value |= buffer[1] & 0xFF;
  value = value << 8;
  value |= buffer[2] & 0xFF;
  byte sum = 0; //Checksum Byte
  sum = buffer[0] + buffer[1] + buffer[2];
  if (sum == buffer[3]) {
    return value;
  } else {
    // Failure!
    return 0;
  }
}
```

Ich erspare Ihnen die 3 + Seiten von C-Code in MyNewt es irgendwo in der Nähe zu tun, dies zu bekommen dauert. Und dann gibt es den Bluetooth-Stack und eine Reihe von Event-Handler Umsetzung usw. mit Ereignissen zu befassen, usw. Es ist buchstäblich fast 1.000 Zeilen Code (die main.c Datei ist über 500 Linien).

## Das Problem

Und das, denke ich, ist das Problem mit MyNewt. Im Jahr +, da ich beteiligt war, hat es nicht mehr benutzerfreundlich sein entwickelt. Es bleibt tief in das Unkraut verstrickt. Wenn das, was Sie zu tun ist, schreiben hoch boardspezifischen Code, der nicht wirklich wiederverwendbar ist, und erfordert eine sehr tiefe Kenntnis der zugrunde liegenden Hardware, RTOS, Bibliotheken usw. dann ist MyNewt für Sie. Wenn auf der anderen Seite, können Sie einen Entwickler sind, der will einfach Sachen zu erledigen, ist es einfach nicht. Ich würde gerne in der Lage sein MyNewt für diese Demo zu verwenden. Ich würde wirklich. Ich denke, es hat ein großes Potenzial, und es ist ein langer Weg in seiner kurzen Lebensdauer kommen. Aber damit es Traktion mit einem breiteren Publikum Entwickler zu gewinnen - wie, sagen wir, die Arduino Menge - es ist zu haben, die Dinge ein ** ** viel einfacher zu starten für Entwickler Möchtegern-.

Abstraction Bibliotheken - wie Arduino Draht Bibliothek - und Wrapperbibliotheken um die Bluetooth flinken Bibliotheken etc. sind eine Notwendigkeit, das tue ich wirklich hoffe, dass ich wieder zu MyNewt kommen zurück und entwickeln schnell diese Demo-Anwendung. Ich habe einfach nicht die Zeit jetzt zu graben um und schreibe sehr niedriges Niveau, boardspezifischen, Code, um diese Demo Arbeit zu machen. Ich werde nur die Fehler zu umgehen, in Arduino haben fortzusetzen.
