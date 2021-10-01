---
title: "Hier is waarom ik het geven van op MyNewt (voor nu)"
Date: 2018-04-04
Author: davidgs
Category: IoT
Tags: Developer, IoT, mynewt
Slug: heres-why-im-giving-up-on-mynewt-for-now
hero: images/logo.png
reading_time: 5 minutes
---

![Grote verzameling van microcontrollers en sensoren](/posts/category/iot/iot-software/images/IMG_3724-300x293.jpg)

Met al deze sensoren en platforms liggen, wilde ik kies gewoon een en het bouwen van een snelle sensor demo. Het zou gemakkelijk zijn, toch?

## Het basisidee

Zoals je kan (of niet) weten, bracht ik veel tijd door met de [Apache MyNewt project](https://mynewt.apache.org/) een jaar of zo geleden. Het heeft een enorm potentieel. Het is klein, snel, en zeer licht van gewicht. Ik schreef zelfs een [Tutorial] (/ berichten / category / iot / iot-software / het bouwen van een-app-met-apache-mynewt /) op het ontwikkelen van een app met MyNewt. Ik weet zeker dat dit bericht gaat naar de goede mensen werken aan dat project ergeren, maar dat is zeker niet mijn bedoeling.

Bij de ontwikkeling van een nieuwe demo voor mijn nieuwe-ish baan, heb ik problemen met de stabiliteit van de Arduino Bluetooth-stack. Ik besloot dat misschien MyNewt was een betere route voor dit specifieke apparaat, dus ik begon te proberen om de app voor MyNewt ontwikkelen. Hier is waarom ik ben geven.

Dit is een dood-eenvoudige app. Het doet 3 dingen:

1. Wacht tot er een verbinding via Bluetooth krijgt
2. Indien verbonden, leest een I2C sensor
3. Stuurt de waarde van de sensor op de verbonden inrichting

Gemakkelijk. In Arduino, is er een I2C bibliotheek, “Wire” bibliotheek, en ik kan gewoon doen een Wire.begintransmission (0x68) - de I2C-adres van het apparaat - dan Wire.write () zoveel bytes als ik wil, dan Wire. endtransmission () en het schrijven naar de I2C-apparaat wordt gedaan. Evenzo kan ik lezen uit registers een I2C-apparaat met een Wire.requestFrom (I2CAddr, len) en terug te krijgen van het aantal bytes ik gevraagd van de I2C-Device-adres aangevraagd. Gemakkelijk. Schoon.

## De MyNewt Approach

Helaas, in MyNewt, ik heb vrij veel vanaf nul te beginnen en het opbouwen van complexe datastructuren, dan erachter te komen hoe ze correct te initialiseren, Hier is het “voorbeeld” van een andere I2C sensor:

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

Merk op dat de “data_struct” neemt het adres van de “sensor-interface” -structuur, maar dan moet ik hen **zowel** aan de `i2c_master_write ()` call passeren. Ik fooled rond met dit voor een paar dagen proberen aan te passen aan de sensor heb ik - en mijn sensor **veel** eenvoudiger - ik schrijf gewoon 4 bytes om de juiste I2C adres, lees dan weer 4 bytes.

Hier is het geheel van de code vereist in Arduino:

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

Ik bespaar u de 3+ pagina's van C-code in MyNewt er nodig is om overal dicht bij dit te doen krijg. En dan is er de Bluetooth stack en implementeren van een reeks gebeurtenisafhandelaars, etc. te behandelen gebeurtenissen, etc. Het is letterlijk bijna 1000 regels code (main.c het bestand dan 500 lijnen).

## Het probleem

En dit, denk ik, is het probleem met MyNewt. In het jaar + omdat ik betrokken was heeft het niet ontwikkeld om nog meer gebruiksvriendelijk. Het blijft diep steken in het onkruid. Als wat je wilt doen is het schrijven zeer board-specifieke code dat is niet echt opnieuw te gebruiken, en vereist een zeer grondige kennis van de onderliggende hardware, RTOS, bibliotheken, enz. Dan MyNewt is voor jou. Als, aan de andere kant, je een ontwikkelaar die gewoon wil om dingen gedaan te krijgen zijn, het is gewoon niet. Ik zou graag in staat zijn om MyNewt gebruiken voor deze demo. Ik echt zou doen. Ik denk dat het heeft een groot potentieel, en het is een lange weg afgelegd in zijn korte leven. Maar om ervoor te grip te krijgen met een breder ontwikkelaar publiek - zoals bijvoorbeeld de Arduino menigte - het gaat te hebben om te beginnen met het maken van dingen een **lot** makkelijker voor aspirant-ontwikkelaars.

Abstractie bibliotheken - zoals Arduino's Wire bibliotheek - en wrapper bibliotheken over de Bluetooth Nimble bibliotheken, enz. Zijn een noodzaak Ik hoop echt dat doe ik kan terug naar MyNewt te komen en deze demo app snel te ontwikkelen. Ik heb gewoon niet de tijd nu om rond te graven en te schrijven zeer laag niveau, board-specifieke code om deze demo te laten werken. Ik moet gewoon doorgaan met de bugs in Arduino omzeilen.
