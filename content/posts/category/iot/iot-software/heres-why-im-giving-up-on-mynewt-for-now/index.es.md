---
title: "He aquí por qué estoy renunciando a MyNewt (por ahora)"
Date: 2018-04-04
Author: davidgs
Category: IoT
Tags: Developer, IoT, mynewt
Slug: heres-why-im-giving-up-on-mynewt-for-now
hero: images/logo.png
reading_time: 5 minutes
---

![Large collection of microcontrollers and sensors](/posts/category/iot/iot-software/images/IMG_3724-300x293.jpg)

Con todos estos sensores y plataformas por ahí, quería simplemente escoger uno y construir un sensor de demostración rápida. Debe ser fácil, ¿verdad?

## La idea básica

Como se puede (o no) saber, pasé mucho tiempo con el [proyecto Apache MyNewt](https://mynewt.apache.org/) o menos un año atrás. Tiene un enorme potencial. Es pequeño, rápido y muy ligero. Incluso escribí un) o menos un año atrás. Tiene un enorme potencial. Es pequeño, rápido y muy ligero. Incluso escribí un [Tutorial](/posts/category/iot/iot-software/building-an-app-with-apache-mynewt/) en el desarrollo de una aplicación con MyNewt. Estoy seguro de que este post va a molestar a las personas buenas que trabajan en ese proyecto, pero que no es seguro que mi intención.

En el desarrollo de una nueva demo de mi trabajo nuevo-ish, he estado teniendo problemas con la estabilidad de la pila Bluetooth Arduino. Decidí que tal vez MyNewt era una ruta mejor para este dispositivo en particular, así que empecé a tratar de desarrollar la aplicación para MyNewt. Aquí es por lo que voy a rendir.

Esta es una aplicación sencilla muerto. Hace 3 cosas:

1. Espera hasta que se obtiene una conexión a través de Bluetooth
2. Cuando se conecta, se lee un sensor I2C
3. envía el valor del sensor al dispositivo conectado

Sencillo. En Arduino, hay una biblioteca I2C, biblioteca “alambre”, y puede simplemente hacer una Wire.begintransmission (0x68) - la dirección I2C del dispositivo - a continuación, Wire.write () tantos bytes como yo quiero, entonces alambre. endtransmission () y la escritura en el dispositivo I2C está hecho. Del mismo modo, puedo leer partir de los registros de un dispositivo I2C con un Wire.requestFrom (I2CAddr, len) y volver el número de bytes que se han solicitado desde la dirección del dispositivo I2C solicitado. Sencillo. Limpio.

## El enfoque MyNewt

Por desgracia, en MyNewt, que bastante tienen que empezar de cero y construir estructuras complejas de datos, a continuación, encontrar la manera de inicializar correctamente, Aquí está el “ejemplo” de otro sensor I2C:

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

Tenga en cuenta que el “data_struct” toma la dirección de la estructura de “interfaz de sensor”, pero luego tengo que pasarlos ** ** tanto a la `i2c_master_write ()` llamada. Engañé alrededor con esto durante unos días tratando de adaptarlo al sensor que tengo - y mi sensor es ** ** mucho más sencilla - Yo simplemente escribo 4 bytes a la dirección I2C adecuada, a continuación, vuelve a leer 4 bytes.

Aquí está la totalidad del código necesario en Arduino:

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

Les ahorraré los 3+ páginas de código C en MyNewt que se necesita para llegar a ninguna parte cerca de hacer esto. Y luego está la pila de Bluetooth, y la implementación de una serie de controladores de eventos, etc., para ocuparse de acontecimientos, etc. Es, literalmente, casi 1.000 líneas de código (el archivo main.c es de más de 500 líneas).

## El problema

Y esto, creo, es el problema con MyNewt. En el año + desde que estaba involucrado no ha evolucionado para ser más fácil de usar. Se sigue profundamente sumida en la maleza. Si lo que quieres hacer es escribir código altamente tablero-específico que no es realmente reutilizable, y requiere un conocimiento muy profundo del hardware subyacente, RTOS, bibliotecas, etc. entonces MyNewt es para usted. Si, por el contrario, eres un desarrollador que quiere simplemente a completar tareas, simplemente no lo es. Me gustaría ser capaz de utilizar MyNewt para esta demostración. Realmente lo haría. Creo que tiene un gran potencial, y es recorrido un largo camino en su corta vida. Pero a fin de que para ganar tracción con una audiencia más amplia de desarrolladores - como, por ejemplo, la multitud Arduino - que va a tener que empezar a hacer las cosas mucho más fáciles ** ** para los aspirantes a desarrolladores.

bibliotecas abstracción - al igual que la biblioteca de Arduino Wire - y bibliotecas envoltura alrededor de las bibliotecas Bluetooth ágil, etc son una necesidad realmente espero que puedo volver a MyNewt de nuevo y desarrollar este programa de demostración de forma rápida. Simplemente no tengo tiempo en este momento para cavar a su alrededor y escribir de muy bajo nivel, tabla específica, el código con el fin de hacer este trabajo de demostración. Voy a tener que seguir trabajando en torno a los errores en Arduino.
