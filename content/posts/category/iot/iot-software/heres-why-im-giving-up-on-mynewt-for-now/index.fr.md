---
title: « Voici pourquoi je donne sur MyNewt (pour l'instant) »
Date: 2018-04-04
Author: davidgs
Category: IoT
Tags: Developer, IoT, mynewt
Slug: heres-why-im-giving-up-on-mynewt-for-now
hero: images/logo.png
---

![Large collection of microcontrollers and sensors](/posts/category/iot/iot-software/images/IMG_3724-300x293.jpg)

Avec tous ces capteurs et plates-formes qui traînent, je voulais simplement choisir un et de construire une démonstration rapide du capteur. Il devrait être facile, non?

## L'idée de base

Comme vous pouvez (ou non) le savoir, j'ai passé beaucoup de temps avec le [projet Apache MyNewt](https://mynewt.apache.org/) un an il y a. Il a un potentiel énorme. Il est petit, rapide et très léger. J'ai même écrit un) un an il y a. Il a un potentiel énorme. Il est petit, rapide et très léger. J'ai même écrit un [tutoriel](/posts/category/iot/iot-software/building-an-app-with-apache-mynewt/) sur le développement d'une application avec MyNewt. Je suis sûr que ce poste va agacer les bonnes gens qui travaillent sur ce projet, mais qui est certainement pas mon intention.

Lors de l'élaboration d'une nouvelle démo pour mon nouveau-ish travail, j'ai eu des problèmes avec la stabilité de la pile Bluetooth Arduino. J'ai décidé que peut-être MyNewt était un meilleur itinéraire pour ce dispositif particulier, alors j'ai commencé à essayer de développer l'application pour MyNewt. Voilà pourquoi je renonce.

Ceci est une application mort simple. Il fait 3 choses:

1. Waits jusqu'à ce qu'il obtienne une connexion via Bluetooth
2. Une fois connecté, il lit un capteur I2C
3. envoie la valeur du capteur de l'appareil connecté

Simple. Dans Arduino, il y a une bibliothèque I2C, une bibliothèque « Wire », et je peux tout simplement faire un Wire.begintransmission (0x68) - l'adresse I2C du dispositif - puis Wire.write () autant d'octets que je veux, puis de fil. endtransmission () et l'écriture sur le dispositif de I2C est fait. De même, je peux lire à partir d'un des registres de périphérique I2C avec un Wire.requestFrom (I2CAddr, len) et récupérer le nombre d'octets j'ai demandé à l'adresse du périphérique I2C demandé. Simple. Faire le ménage.

## L'approche MyNewt

Malheureusement, dans MyNewt, je dois à peu près recommencer à zéro et construire des structures de données complexes, puis comprendre comment les initialiser correctement, voici le « exemple » d'un autre capteur I2C:

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

Notez que le « data_struct » prend l'adresse de la structure « d'interface de capteur », mais je dois les transmettre ** deux ** à l'appel `i2c_master_write ()`. Je dupé autour avec cela pendant quelques jours à essayer de l'adapter au capteur je - et mon capteur est ** ** beaucoup plus simple - j'écris simplement 4 octets à l'adresse I2C correcte, lire puis de nouveau 4 octets.

Voici l'intégralité du code requis dans Arduino:

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

Je vous épargnerai les pages 3+ de code C en MyNewt il faut pour se déplacer près de le faire. Et puis il y a la pile Bluetooth, et mettre en œuvre une série de gestionnaires d'événements, etc. pour faire face à des événements, etc. Il est littéralement près de 1000 lignes de code (le fichier main.c est de plus de 500 lignes).

## Le problème

Et cela, je pense, est le problème avec MyNewt. En l'an + depuis que je suis impliqué, il n'a pas évolué pour être plus convivial. Il reste profondément embourbé dans les mauvaises herbes. Si ce que vous voulez faire est d'écrire un code très spécifique embarqué qui est pas vraiment réutilisable, et nécessite une connaissance très approfondie du matériel sous-jacent, RTOS, bibliothèques, etc., puis MyNewt est pour vous. Si, d'autre part, vous êtes un développeur qui veut simplement pui, il est tout simplement pas. J'aimerais pouvoir utiliser MyNewt pour cette démo. Je voudrais vraiment. Je pense qu'il a un grand potentiel, et il est parcouru un long chemin dans sa courte vie. Mais pour que pour gagner du terrain avec un public de développeurs plus large - comme, par exemple, la foule Arduino - il va devoir commencer à faire les choses beaucoup plus facile ** ** pour les futurs développeurs.

Abstraction bibliothèques - comme la bibliothèque Wire Arduino - et les bibliothèques wrapper autour des bibliothèques Bluetooth Nimble, etc. sont une nécessité, je n'espère vraiment que je peux revenir à nouveau MyNewt et développer cette application de démonstration rapidement. Je n'ai pas le temps en ce moment à fouiller et à écrire très bas niveau, spécifiques à bord, le code pour faire ce travail de démonstration. Je vais juste continuer à travailler autour des bogues dans Arduino.
