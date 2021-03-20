---
title: "Programación del ARTIK-0 IO Devices"
Date: 2018-07-01
Author: davidgs
Category: Gadgetry, IoT
Tags: ARTIK, ARTIK-053, IoT, Samsung
Slug: programming-the-artik-0-iot-devices
hero: images/bazaar493520_2.jpg
---

Si usted ha leído este blog mucho a todos se le han dado cuenta de que he sido un gran fan bastante de la línea ARTIK de tableros de IO (ver [aquí](/posts/category/iot/winter-vacation-iot-artik-5/),), [aquí](/posts/category/iot/iot-hardware/making-artik-5-iot-gateway-kura/),), [aquí](/posts/category/iot/make-your-artik-520-scream/),), [aquí](/posts/category/general/how-to-save-your-artik-520-backup/),), [aquí](/posts/category/iot/iot-software/artik-520-droplit-io-edge-device/),), [aquí](/posts/category/iot/iot-hardware/openhab-server-artik-520/),), [aquí](/posts/category/iot/iot-hardware/running-influxdb-on-an-artik-520/) y) y [aquí](/posts/category/iot/iot-hardware/influxdb-on-artik-520-redux/)), pero realmente necesito aclarar que un poco ahora. Me encanta mi tabla ARTIK-520. Se recorre toda la pila InfluxData muy bien y es un lugar sólido y fiable para implementar software IO-Edge. Me gusta mucho.

Una vez dicho esto, todavía estoy realmente ** ** descontentos con la línea ARTIK-0x de “productos”. Comenzó cuando compré la junta promotora ARTIK-020. Un montón de afirmaciones acerca de ser capaz de programarlo desde Mac OS, etc. La realidad era que - 13 páginas en la guía de desarrollador - uno llega a la conclusión de que a) se necesita una máquina Windows y b) después de 30 días necesario para comprar una licencia de $ 3.000 a IAR Workbench. Tanto por ser de creador de usar. Pongo ese tablero en un cajón y di por vencido en ella. costosa lección aprendida.

Me quejé a mis amigos en Samsung - Sí, tengo amigos en Samsung - y un tiempo después me di un módulo libre ARTIK-053. Éste no necesita el IAR Workbench para programarlo (yay para gcc !!) y pensé que las cosas se veían mejor. Me gustaría que había tenido razón. Jugué con él por un poco después de conseguirlo, pero acabó el tiempo por lo que, al igual que con la otra placa de Samsung, que fue en la caja.

Decidí volver a visitar durante esta semana. Había construido un sensor de CO2 utilizando un nRF52DK semi nórdica y un K30 SenseAir pero el nRF52DK era realmente una especie de grande y que estaba en busca de un factor de forma más pequeño (que tenía “en stock”) y no requirieron Arduino. No voy a empezar en el Arduino aquí, pero yo pude.

Así llegó a cabo la Junta Dev ARTIK-053, y ... oh mierda, aquí vamos de nuevo. En primer lugar, empecé con la ARTIK-IDE para el desarrollo. Está basado en Eclipse (por supuesto), pero en serio, era increíblemente lento, engorroso y no hizo ningún código cumplimentación o indirectas. Tomó alrededor de 4 minutos para desplegar un binario a la junta. Me iterar mucho ** ** SO 4 minutos por carga se está desacelerando en serio yo abajo. -1 para ARTIK-IDE.

Descubrí por casualidad que Microsoft Código VS es compatible con el entorno de desarrollo ARTIK y era una tonelada ** ** más rápido. 10 segundos compila (vs. compila 1 minuto sobre Eclipse / ARTIK-IDE) y de 30 segundos se despliega (frente a los 4 minutos en ARTIK-IDE). La vida tiene mucho mejor después de eso. (Puedo volver y hacer otro post sobre el Código VS sólo porque yo estoy cantando a ser súper versátil y una muy buena herramienta -. Que está diciendo algo para alguien con los anticuerpos anti-Microsoft virulentas como he)

Así que me mudé todo mi desarrollo al Código VS y comenzó lo que pensé que sería un puerto bastante sencillo de mi código de sensor mbed OS I2C CO2 a TizenOS de ARTIK. No voy a pensar de nuevo. I2C es bastante sencillo. Es necesario conocer la dirección del dispositivo, los registros que desea escribir en los registros, que desea leer, y que más o menos lo cubre. cosas realmente simple.

```cpp
// var 7-bit address of the K30 CO2 Sensor
const int addr = 0xD0;
char cmd[4] = {0x22, 0x00, 0x08, 0x2A};
int ack = i2c.write(addr, cmd, 4);

i2c.read(addr, readBuff, 4, false);
```

Esa es una dirección de 7 bits. Escribir un comando de 4 bytes a la dirección, a continuación, leer un búfer posterior de 4 bytes y tengo mi lectura. Ese es el código de mbed sistema operativo anterior, por cierto. Funciona perfectamente, por lo que portarlo a Tizen debe ser fácil peasy.

**Equivocado**

Resulta que existe documentación menor que cero para la línea ARTIK-0x de dispositivos. Hay un par de programas de ejemplo, pero si quieres ir más allá de simplemente compilar y ejecutar esas muestras, que son por su cuenta. Samsung parece pensar que el código fuente de i2c.h debería ser suficiente para hacer que todo suceda. No podían estar más equivocados. Si usted publique en los foros de usuarios, te dicen que “sólo leer el código fuente.” Eso no es una respuesta si desea que los desarrolladores utilizar su plataforma.

Estoy bastante expertos en la lectura del código fuente. ** ** SI está escrito de manera clara y bien documentada. Y ese es el problema con el código fuente ARTIK. Los autores parecían pensar que acaba de escribir el código sería suficiente. ** ** Sobre todo cuando se trataba de los programas de 'ejemplo'. Como un ejemplo, el código de ejemplo WebSocket consiste en un solo archivo de origen que es 1158 líneas de largo. Aquí están todos los comentarios en la fuente para ayudarle a lo largo con la comprensión de que:

```cpp
/// @file app/netutils/websocket/websocket.c
/// @brief websocket file to support client and server.

// if websocket server is initiated from http(s), you just can call this function.
// websocket_server_open function includes:
// 1. allocating socket fd
// 2. accepting client
// 3. authenticating with client
// those 3 are not needed when websocket is initiated from http(s).
```

Así es, que de todos ** ** los comentarios de 1158 líneas de código WebSocket complicado. La mayoría del código de demostración es igualmente 'documentados. Esto es pura pereza ya sea por parte de los desarrolladores del código de demostración, o de lo contrario simplemente Samsung no se preocupa cada vez que sus usuarios finales tienen éxito en el desarrollo de aplicaciones en su plataforma. Voy a darles el beneficio de la duda e ir con la pereza. Como desarrollador mí, trato de hacer lo más documentación de código en línea que puedo hacer razonable ya que es sólo una cortesía común para el desarrollador que viene detrás de usted. No siempre lo hago con el código que escribo puramente para mí, pero si estoy publicando, o su puesta a disposición, de verdad lo intento para que sea fácil de seguir. Samsung al parecer, no se preocupa por eso.

conclusiones
-----------

Estoy 9 días y ahora he conseguido *** *** finalmente el dispositivo I2C permite su lectura en una base bastante consistente y fiable. No fue fácil, ni siquiera remotamente placentero, pero que está funcionando lo suficientemente bien como para mí. El siguiente bit es ser capaz de publicar los resultados del sensor a través de http - idealmente HTTPS - a mi servidor InfluxDB. Por eso me fui a través de 1158 líneas de código WebSocket en una tarde de domingo. Su Domingo fue probablemente mejor, estoy suponiendo.

Estoy bastante seguro de que conseguir el https entrada para ir a través va a tomar alrededor de 8 días, así que debería hacer Samsung hacerse la pregunta: ¿Cuándo alguien puede implementar esto en un día o 2 usando mbed, FreeRTOS o Arduino y se tarda 2 semanas en ARTIK, ¿por qué nadie ** ** elegir ARTIK?” Es una pregunta válida que yo no creo que tengan una respuesta adecuada a.


