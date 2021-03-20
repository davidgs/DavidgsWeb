---
title: "La construcción de un dispositivo IO InfluxDB Colección Borde de datos"
Date: 2018-07-20
Author: davidgs
Category: Gadgetry, IoT
Tags: InfluxData, InfluxDB, IoT, IoT Data, IoT Gateway
Slug: building-an-influxdb-iot-edge-data-collection-device
hero: images/IMG_4086.png
---

He estado diciendo que iba a escribir todo este proyecto hasta hace algún tiempo, pero ha sido una tarea de enormes proporciones que he estado posponiendo, arranque y parada, y generalmente no conseguir que se haga durante unos meses. Por último, lo tengo! Esto es tanto una acumulación de hardware y una compilación de software, y hay un montón ** ** de las partes móviles, así que prepárate!

## Visión general

Quería construir un sistema de demostración que mostrar las capacidades de la utilización de InfluxData - toda la garrapata Pila - en el borde extremo de una arquitectura de la IO. Mientras que muchas compañías están apostando en la nube para la recolección de datos de la IO, entiendo que para algunos - sobre todo en el espacio de la IO Industrial - una estrategia en la nube primera es simplemente un no-arrancador. Por otra parte, con una amplia variedad de modalidades de conectividad de red - Wi-Fi, BLE, LoRAWAN, etc. - de ser desplegado, en algún momento usted simplemente tiene que tener un dispositivo de borde de conectarse a las finales sensores. En esencia, quería sacar esto diagrama de la arquitectura juntos en la vida real.

![Arquitectura](/posts/category/iot/iot-hardware/images/architecture.gif)

Así que tuve que construir un montón de sensores, y luego construir una caja de recogida de datos del borde, y luego conectarlo a internet y tienen que volver los datos de larga a la nube. Empecemos con el sensor construye.

## El hardware

Como se indicó anteriormente, quería incorporar tantos sensores, y los protocolos de comunicación, como pude con el fin de cubrir el escenario de implementación más amplia posible. Terminé la construcción de un sensor de CO2 conectado a través de Bluetooth Low Energy (BLE), un sensor de temperatura, humedad, presión, luz visible e infrarrojo conectado a través de Wi-Fi, un sensor de radiación conectado a través de LoRAWAN y un sensor de temperatura sin contacto también conectado a través de LoRaWan. Eso es un montón de sensores para construir, y una gran cantidad de protocolos de RF para incorporar.

### El sensor Wi-Fi

Vamos a abordar este primero, ¿de acuerdo? Aquí está la lista de piezas que necesita para construir éste:

- [de partículas de fotones](https://store.particle.io)
- Bosch BME280 (I consiguió mío de [Adafruit](https://www.adafruit.com/product/2652))
- [Adafruit TLS2561](https://www.adafruit.com/product/2652) Sensor de luz

Solía I2C a conectarlos, ya que utiliza los pasadores menor cantidad, y pude compartir los pasadores. Aquí está el diagrama de cableado:

![Alambrado](/posts/category/iot/iot-hardware/images/Wiring.png)

Yo los cableados a mi partículas de fotones y escribí un poco de software. Vamos a llegar a eso en la Sección de software, pero era bastante trivial hacer dado que los dispositivos de partículas se programan en un Arduino-como el lenguaje y son bastante sencillos de manejar.

I 3-D imprimió una caja agradable para él, y se utiliza alambre de cerámica recubierto super-delgada para soldar todos juntos por lo que salió en un paquete agradable:

![IMG 4090](/posts/category/iot/iot-hardware/images/IMG_4090.png)

![IMG 4089](/posts/category/iot/iot-hardware/images/IMG_4089.png)

![IMG 4092](/posts/category/iot/iot-hardware/images/IMG_4092.png)

Las placas de sensores se cuelgan de la parte interior, delante de los orificios de ventilación, de modo que puedan recibir información precisa (tipo de) las lecturas.

### El Sensor <sub>2</sub> CO BLE

Éste era un poco más que un reto por varias razones. Pero lista en primer lugar las partes:

- kit de desarrollo de los países nórdicos nRF52DK (yo tengo la mía desde [DigiKey](https://www.digikey.com/product-detail/en/nordic-semiconductor-asa/NRF52-DK/1490-1053-ND/5773879?utm_adgroup=Semiconductor%20Modules&slid=&gclid=EAIaIQobChMIvJTLptKr3AIVSsDICh0z8QCnEAAYASAAEgJg-PD_BwE))
- [SenseAir K30](https://senseair.com/products/flexibility-counts/k30/) CO <sub>2</sub> sensor
- 4700μF condensador ([Adafruit](https://www.adafruit.com/product/1589) al rescate de nuevo!)
- 9v Boost Converter (yo tengo la mía desde [Pololu](https://www.pololu.com/product/2116))

Para hacer las cosas un poco menos complicado, Telegrafié el impulso a la nRF52, y luego poner el condensador en el Vout del impulso de esta manera:

![IMG 4100](/posts/category/iot/iot-hardware/images/IMG_4100.png)

No estoy seguro de que hizo las cosas más fáciles * * per se, pero era la forma en que lo hice de todos modos. Si usted es un ingeniero eléctrico, y se ríe ahora, no dude en ponerse en contacto y señalar el error de mis maneras.

Voy a entrar a más en las secciones de software, pero éste era un poco de un animal para el control. En primer lugar, ** ** NO utilizar este sensor conectado directamente a un Arduino! Es absolutamente ** ** se coma su regulador de voltaje. Se requiere 5V-12V y 500 mA y de acuerdo con el fabricante, no hay un Arduino a cabo con un regulador que puede manejarlo. Las reclamaciones de mesa nRF52DK que pueden, pero soy escéptico de que la reclamación en algún grado.

Una vez más, I 3-D imprimí una bonita caja, con orificios de ventilación en la parte superior para permitir el flujo de aire.

![IMG 4087](/posts/category/iot/iot-hardware/images/IMG_4087.png)

![IMG 4096](/posts/category/iot/iot-hardware/images/IMG_4096.png)

Sigo buscando una tabla basada en el BLE más pequeño para conducir esta cosa - uno que no se ejecuta Arduino - pero todavía tengo que encontrar el adecuado.

### El sensor de radiación LoRa

Éste fue super divertido para construir. Crecí en Los Alamos, Nuevo México (La ciudad atómica!), Por lo que hay que. Pero había sido invitado a asistir a un taller en Italia organizada por la Agencia Internacional de Energía Atómica de las Naciones Unidas sobre el “control de la radiación sobre LoRaWAN” así que sólo tenía ** ** para construir un sensor de radiación! (Estaba muy bien, y me escribió en su blog sobre él [aquí](https://www.influxdata.com/blog/influxdb-the-united-nations-and-radiation/))

Esto es lo que solía:

- Sensor de bolsillo Geiger radiación (de [SparkFun Electronics](https://www.sparkfun.com/products/14209))
- [Wemos D1 Mini](https://www.aliexpress.com/store/product/D1-mini-Mini-NodeMcu-4M-bytes-Lua-WIFI-Internet-of-Things-development-board-based-ESP8266/1331105_32529101036.html?spm=2114.12010612.8148356.13.38593ca0eqsbug) (I hacer ** ** no recomendar el D1 Mini Pro como todos los que yo compré tenía WiFi defectuoso y no eran utilizables, aunque yo no usar el WiFi para estas partes)
- Lora Junta de radio (de [Adafruit](https://www.adafruit.com/product/3072), por supuesto)
- un LED blanco

Probablemente se está preguntando por qué he usado un Wemos D1 (que tiene WiFi) en el interior de esta cosa que está utilizando una radio Lora, y voy a decir por qué: no pude encontrar un tablero más barato para el control de la placa de radio LoRa * * y ** la placa del sensor. A $ 3.00 sólo era lo correcto. Acabo de cumplir el WiFi y me fui con él.

Para el LED que se acaba de utilizar que tenía por ahí. Ni idea de donde vino.

Este salió muy bien!

![IMG 4084](/posts/category/iot/iot-hardware/images/IMG_4084.png)

Como se puede ver, se tomó una buena cantidad de trabajo para conseguir todo en la caja, con todos los cables, etc., pero todo logró encajar cómodamente.

![IMG 4101](/posts/category/iot/iot-hardware/images/IMG_4101.png)

### La temperatura sin contacto Sensor

Una vez más, super simple.

- Wemos D1 Mini (ver más arriba)
- LoRad Junta de radio (véase más arriba)
- Melexis MLX90614 sensor (Usted puede conseguir uno de [Adafruit](https://www.adafruit.com/product/1748))
- Un LED verde

Voy a admitir que no se puede conseguir el mismo sensor Melexis que he usado, pero que en ese camino es porque en el día, de vuelta en el [Proyecto Sun SPOT](http://sunspotdev.org/) días, se construyó un poco sensor de junta para el MLX90614 que hizo que fuera fácil de usar más de I2C. Resulta que tengo unos pocos de los que se encuentran alrededor (de 2006 como!), Por lo que utiliza una. Una vez más, he utilizado el Wemos D1 Mini, con la radio Wi-Fi apagado, para controlar tanto el sensor y la Junta LoRa simplemente porque era barato (y tenía un montón de Wemos D1 Mini Pros por ahí con Wifi que no trabajó de todos modos. Recuerde, no comprar esos.)

Lo mismo con el LED verde. Sólo tenía uno por ahí.

Aquí está la placa del sensor de temperatura no se puede tener:
![IMG 3699](/posts/category/iot/iot-hardware/images/IMG_3699.png)

Y aquí está el paquete final:

![IMG 4094 1](/posts/category/iot/iot-hardware/images/IMG_4094-1.png)

Una vez más, lograr que todos los cables de soldadura tomó algo ingenioso y envasado, pero todo se arregló para encajar en el final:

![IMG 3714](/posts/category/iot/iot-hardware/images/IMG_3714.png)

Por lo que concluye el hardware del sensor. Ahora, en la Colección de hardware Borde de datos Nodo!

## Construcción del Colector Edge

Admito que podría haber utilizado un Frambuesa Pi. Pero la verdad es que había apostado por el pino-64 en Kickstarter y yo no había utilizado el tablero para nada, así que decidí usarlo. Además, la búsqueda de las pantallas y los casos de Raspberry Pi es fácil, supongo, pero hay muchos de ellos que era difícil elegir, y Pine64 lo tiene todo en un solo lugar.

Esto es lo que necesitaba para la creación:

- [Pino-64 LTS](https://www.pine64.org/?product=pine-a64-lts) placa principal ($ 32.00)
- [WiFi / tarjeta de BLE](https://www.pine64.org/?product=wifi-802-11bgn-bluetooth-4-0-module) ($ 9,99)
- [7” TFT pantalla táctil](https://www.pine64.org/?product=7-lcd-touch-screen-panel) ($ 35.99)
- [Pine64 Playbox recinto](https://www.pine64.org/?product=pine64-playbox-enclosure) ($ 9,99)
- [Li-Po batería](https://www.pine64.org/?product=lithium-polymer-battery-us-only) ($, 21,99)
- Junta Lora (véase más arriba)
- Wemos D1 Mini (ver más arriba)

Opcional pero recomendado

- Módulo EMMC 64GB ($ 34.95)

De hecho, me utilizado una tarjeta de 64 GB MicroSSD en la mía, pero la ubicación de la ranura de la tarjeta es tan horrible que terminé rompiendo uno y tener que reemplazarlo. Si tuviera que construir otro, me gustaría utilizar el Módulo EMMC seguro.

Estoy seguro de que estás rascando la cabeza y pensando “¿Por qué hay un Wemos D1 en este poco de juego ??” Y te voy a decir! Una vez más, es sólo para controlar la tarjeta LoRa. Sí, estoy totalmente podría haber controlado desde el Pine64, pero yo ya tenía todo el código de trabajo para controlar la tarjeta LoRa de un Wemos, y es pequeño y ocupa muy poco espacio, por lo que apenas accionado fuera del pasador de 5v en el RP _ cabecera y era bueno para ir. Telegrafié que de pines UART Tx Rx al pin de la cabecera RP _ y simplemente escribí los datos que entran en el radio LoRa al puerto serie de entrada del Pino-64, donde podría entonces recogerlo y guardarlo.

Creo que salió bastante bien!

![IMG 4086](/posts/category/iot/iot-hardware/images/IMG_4086.png)

Una vez más, todos los cables eran un poco mucho, y tuve que perforar un agujero extra en el caso de montar la antena Lora, pero incluso el interior parecía agradable:

![IMG 3705 1](/posts/category/iot/iot-hardware/images/IMG_3705-1.png)

De hecho, hay un módulo Z-Wave en allí también, pero sólo porque venía con mi pedal de arranque Bundle. No estoy realmente usarlo todavía.

Ahora, ¿cómo he llegado que mancha en busca salpicadero de todos mis datos de los sensores de la existencia? Bueno, eso es en realidad la parte más fácil de la compilación de software, así que vamos a llegar al software!

## El software

Voy a pasar por el software que construida en el mismo orden que el hardware, sólo para mantener la coherencia. No dudes en saltar a las partes que más le interesen.

### El sensor Wi-Fi

Programación de la partícula de fotones es muy fácil usando su entorno de desarrollo basado en la web. Ellos tienen una versión de escritorio también, basado en Atom, pero tuve problemas regulares con él, así que pegado a la que en línea. Uno de los pocos inconvenientes a la partícula es que esperan que todo salga a través de su nube, pero su nube no tiene manera de almacenar y analizar datos. Una bastante grande debilidad, si me preguntas. Pero incluso si no lo hiciera, habría tenido que hacer las cosas de esta manera porque, como se dijo anteriormente, no quería hacer una arquitectura en la nube en primer lugar. Yo quería que el dispositivo de borde para recoger los datos. Quería conectarse a una red WiFi privada (servido por el dispositivo de borde de sí mismo) y enviar todos mis datos allí.

Resulta que la primera cosa que un fotón de partículas siempre trata de hacer es contactar con la nube de partículas. Si no puede, entonces las cosas se ponen raras. Así que lo primero que tenía que hacer era decir que para complacer a dejar de hacer eso!

```cpp
Particle.disconnect();
WiFi.connect();
```

Que para eso! Y entonces me conecta con mi WiFi privada. (Tiene que configurar esto a través de una conexión USB a su fotones!).

Esto es todo el código, y luego me puedo pasar por ella con más detalle:

```cpp
// This #include statement was automatically added by the Particle IDE.
#include <HttpClient.h>
// This #include statement was automatically added by the Particle IDE.
#include <Adafruit_TSL2561_U.h>
#include "Adafruit_Sensor.h"
#include "Adafruit_BME280.h"
#define SEALEVELPRESSURE_HPA (1013.25)
#define TELEGRAF_HOST "192.168.3.1"
#define TELEGRAF_PORT 1619
#define temp(x) String(x)

//the two sensors
Adafruit_BME280 bme;
Adafruit_TSL2561_Unified tsl = Adafruit_TSL2561_Unified(TSL2561_ADDR_FLOAT, 12345);

// some variables
double temperature = 0.00;
double pressure = 0.00;
double altitude = 0.00;
double humidity = 0.00;
uint16_t broadband = 0;
uint16_t infrared = 0;
int lux = 0;
String myID = System.deviceID();
String myName = "DemoKit3";
bool bme_config = true;
bool tsl_config = true;

// http stuff
http_request_t request;
http_response_t response;
HttpClient http;

SYSTEM_MODE(SEMI_AUTOMATIC);

int led = D7;

void setup() {
    delay(2000);
    Serial.begin(115200);
    Serial.println("No Cloud! Not using Particle.");
    Particle.disconnect();
    delay(2000);
    Serial.print("Connecting to WiFi ... ");
// this is all debug stuff that helped me get the WiFi working properly
    if(WiFi.hasCredentials()){
        Serial.println("Found credentials");
        WiFiAccessPoint ap[5];
        int found = WiFi.getCredentials(ap, 5);
        for (int i = 0; i < found; i++) {
            Serial.print("ssid: ");
            Serial.println(ap[i].ssid);
// security is one of WLAN_SEC_UNSEC, WLAN_SEC_WEP, WLAN_SEC_WPA, WLAN_SEC_WPA2, WLAN_SEC_WPA_ENTERPRISE, WLAN_SEC_WPA2_ENTERPRISE
            Serial.print("security: ");
            Serial.println(ap[i].security);
// cipher is one of WLAN_CIPHER_AES, WLAN_CIPHER_TKIP or WLAN_CIPHER_AES_TKIP
            Serial.print("cipher: ");
            Serial.println(ap[i].cipher);
        }
    }
    delay(2000);
    WiFi.connect();
    Serial.println("Starting up...");
    request.hostname = TELEGRAF_HOST;
    request.port = TELEGRAF_PORT;
    request.path = "/particle";
    int tryInit = 0;
// sometimes the BME sensor takes a while to get figured out.
    while (!bme.begin()) {
        Serial.println("Could not find a valid BME280 sensor, check wiring!");
        delay(3000);
        if(++tryInit > 9){
            bme_config = false;
            break;
        }
    }
    tryInit = 0;
/* Initialise the sensor */
    while(!tsl.begin()){
        Serial.print("Ooops, no TSL2561 detected ... Check your wiring or I2C ADDR!");
        delay(3000);
        if(++tryInit > 9){
            tsl_config = false;
            break;
        }
    }
/* Setup the sensor gain and integration time */
    if(tsl_config){
        configureSensor();
    }
    Serial.print("Device ID: ");
    Serial.println(myID);
// get a couple of readings to make sure …
    getReadings();
    delay(2000);
    getReadings();
/* Display some basic information on this sensor */
    displaySensorDetails();
/* We're ready to go! */
}

void loop() {
    getReadings();
    double fTemp = temperature * 9/5 + 32;
    Serial.print("My IP: ");Serial.println(WiFi.localIP());
    if(myName != "" ){
// begin http post remove for particle cloud publish
        http_header_t headers[] = {
          {"Accept", "*/*"},
          {"User-agent", "Particle HttpClient"},
          {NULL, NULL}
        };
        time_t time = Time.now();
        Time.format(time, TIME_FORMAT_ISO8601_FULL);
        int rssi = WiFi.RSSI();
        String data = String::format("{\"event\": \"iot_sensor\", \"data\": { \"tags\" : {\"id\": \"%s\", \"location\": \"%s\"}, \"values\": {\"RSSI\": %d, \"temp_c\": %f, \"temp_f\": %f, \"humidity\": %f, \"pressure\": %f, \"altitude\": %f, \"broadband\": %d, \"infrared\": %d, \"lux\": %d}}, \"ttl\": 60, \"coreid\": \"%s\", \"name\": \"sensor\", \"measurement\": \"iot_data\"}", myID.c_str(), myName.c_str(), rssi, temperature, fTemp, humidity, pressure, altitude, broadband, infrared, lux, myID.c_str());
        request.body = data;
        http.post(request, response, headers);
        Serial.print("Application>\tResponse status: ");
        Serial.println(response.status);
        Serial.print("Application>\tHTTP Response Body: ");
        Serial.println(response.body);
// end http post.
        delay(1000);
    }
}

/* Read the sensors */
void getReadings(){
    if(bme_config){
        temperature = bme.readTemperature();
        pressure = bme.readPressure() / 100.0F;
        altitude = bme.readAltitude(SEALEVELPRESSURE_HPA);
        humidity = bme.readHumidity();
    }
    if(tsl_config){
        sensors_event_t event;
        tsl.getEvent(&event);
/* Display the results (light is measured in lux) */
        if (event.light){
            lux = event.light;
        } else {
/* If event.light = 0 lux the sensor is probably saturated
and no reliable data could be generated! */
           lux = -1;
        }
/* Populate broadband and infrared with the latest values */
        tsl.getLuminosity (&broadband, &infrared);
    }
}

// Open a serial terminal and see the device name printed out
void handler(const char *topic, const char *data) {
    Serial.println("received " + String(topic) + ": " + String(data));
    myName = String(data);
}

int setLoc(String loc){
    myName = loc;
    return 1;
}

void configureSensor(void) {
/* You can also manually set the gain or enable auto-gain support */
// tsl.setGain(TSL2561_GAIN_1X); /* No gain ... use in bright light to avoid sensor saturation */
// tsl.setGain(TSL2561_GAIN_16X); /* 16x gain ... use in low light to boost sensitivity */
    tsl.enableAutoRange(true); /* Auto-gain ... switches automatically between 1x and 16x */

/* Changing the integration time gives you better sensor resolution (402ms = 16-bit data) */
    tsl.setIntegrationTime(TSL2561_INTEGRATIONTIME_13MS); /* fast but low resolution */
// tsl.setIntegrationTime(TSL2561_INTEGRATIONTIME_101MS); /* medium resolution and speed */
// tsl.setIntegrationTime(TSL2561_INTEGRATIONTIME_402MS); /* 16-bit data but slowest conversions */

/* Update these values depending on what you've set above! */
    Serial.println("------------------------------------");
    Serial.print ("Gain: "); Serial.println("Auto");
    Serial.print ("Timing: "); Serial.println("13 ms");
    Serial.println("------------------------------------");
}

void displaySensorDetails(void) {
    if(tsl_config){
        sensor_t sensor;
        tsl.getSensor(&sensor);
        Serial.println("------------------------------------");
        Serial.print ("Sensor: "); Serial.println(sensor.name);
        Serial.print ("Driver Ver: "); Serial.println(sensor.version);
        Serial.print ("Unique ID: "); Serial.println(sensor.sensor_id);
        Serial.print ("Max Value: "); Serial.print(sensor.max_value); Serial.println(" lux");
        Serial.print ("Min Value: "); Serial.print(sensor.min_value); Serial.println(" lux");
        Serial.print ("Resolution: "); Serial.print(sensor.resolution); Serial.println(" lux");
        Serial.println("------------------------------------");
        Serial.println("");
        delay(500);
    }
}

```

Muy claro. Inicializar los sensores (y probar un par de veces). Si la inicialización falla, asegúrese de que la manija también. Solía los booleanos bee_config y tsl_config para eso. A continuación, lea los datos del sensor cada segundo, y que lo ponga al servidor InfluxDB en un objeto JSON. De hecho, me estoy re-uso de la partícula Plugin para Telegraf que escribí, sólo porque pude. En realidad escribí los docs [](https://docs.particle.io/tutorials/integrations/influxdata/core/#using-influxcloud) sobre al Particle.io para el) sobre al Particle.io para el [integración InfluxDB / Partícula](https://docs.particle.io/tutorials/integrations/influxdata/core/#using-influxcloud) (porque también escribí la integración, por supuesto) por lo que no dude en echar un vistazo a que si lo desea.

Ahora tengo una temperatura de partículas de fotones de contabilización (ºC y ºF), presión atmosférica, humedad, luz infrarroja, luz visible, y lux a mi dispositivo de borde de cada segundo. Bueno, yo si tuviera un dispositivo filo. Eso viene.

### El Sensor <sub>2</sub> CO BLE

Como he dicho antes, éste era un poco más complicado. Podría haber programado esto con Arduino, y al principio lo hice. Pero Arduino no es hasta la tarea con este sensor. Esto se debe a I2C del sensor de vez en cuando se bloquea, y cuando eso sucede en Arduino-tierra, que está bastante atascado. Tendrá que reiniciar el tablero. Eso está bien, supongo, pero cuando ocurre cada 30 segundos, se hace la recolección de datos poco fiables. Así que he usado incorporado C en mbed lugar. También hay dos lados a este sensor. Uno de ellos era el código del sensor real que se ejecuta en el tablero nRF52DK. El otro era el código para ejecutar en el dispositivo Edge para conectarse a través de Bluetooth y obtener los datos. Así que vamos a empezar con el dispositivo de código. En primer lugar, tenía que definir una característica BLE GATT para el valor de CO2, por lo que lo hice:

```cpp
#ifndef __K30_SERVICE_H__
#define __K30_SERVICE_H__

class K30Service {
public: const static uint16_t K30_SERVICE_UUID = 0xA000;
const static uint16_t K30_VALUE_CHARACTERISTIC_UUID = 0xA001;

K30Service(BLEDevice &_ble, float k30Initial) :
ble(_ble), k30Value(K30_VALUE_CHARACTERISTIC_UUID, &k30Initial, GattCharacteristic::BLE_GATT_CHAR_PROPERTIES_NOTIFY) {
  GattCharacteristic *charTable[] = {&k30Value};
  GattService k30Service(K30Service::K30_SERVICE_UUID, charTable, sizeof(charTable) / sizeof(GattCharacteristic *));
  ble.addService(k30Service);
}

void updateK30Value(float newValue) {
  ble.updateCharacteristicValue(k30Value.getValueHandle(), (uint8_t *)&newValue, sizeof(float));
}
private: BLEDevice &ble; ReadOnlyGattCharacteristic k30Value; };

#endif
```

Ese es nuestro servicio GATT de modo que cada vez que lo llamamos, obtenemos el valor de CO2 actualizada desde el sensor. Ahora el código para obtener los datos del sensor. Recuerde que este es el código de I2C en C. Voy a pasar por ella en secciones para que sea más claro lo que estoy haciendo.

```cpp
/**
  Copyright (c) 2018 David G. Simmons
  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  http://www.apache.org/licenses/LICENSE-2.0
**/
#include <events/mbed_events.h>
#include <mbed.h>
#include "ble/BLE.h"
#include "ble/Gap.h"
#include "k30.h"
#include "nrf_nvic.h"
```

El `k30.h` es el código que define el servicio GATT. A continuación, vamos a todas las variables, etc. definido.

```cpp
DigitalOut led1(LED1);
DigitalOut led2(LED2);
DigitalOut led3(LED3);
DigitalOut led4(LED4);
//I2C i2c(p24 , p25);
// Standard I2C pins on the nRF52. But you can use any pins you want really.
I2C i2c(p26, p27);
const int addr = 0xD0;
static int failures = 0;
const static char DEVICE_NAME[] = "CO2Sensor";
static const uint16_t uuid16_list[] = {K30Service::K30_SERVICE_UUID};
static float co2Level = 50.0;
static K30Service* k30ServicePtr;
static EventQueue eventQueue(EVENTS_EVENT_SIZE);
```

El nRF52DK tiene 4 LED de servicio a bordo. Yo quería que van dando vueltas y vueltas en la secuencia, ya que pude. Ah, y también deben ser capaces de ir hacia atrás. No pregunto cuánto tiempo pasé conseguir el derecho de distribución de tal forma que se veían bien.

```cpp
void lightsFwd(){
  led1 = !led1;
  wait(.15);
  led2 = !led2;
  wait(.15);
  led4 = !led4;
  wait(.15);
  led3 = !led3;
  wait(.15);
}

void lightsRev(){
  led1 = !led1;
  wait(.15);
  led3 = !led3;
  wait(.15);
  led4 = !led4;
  wait(.15);
  led2 = !led2;
  wait(.15);
}
```

Ahora llegamos a la parte interesante: en realidad la lectura del sensor! Esto es bastante sencillo I2C. Los Documentos SenseAir tienen todos los detalles como la dirección I2C, los comandos, etc, para que ya estaba hecho para mí. Si está utilizando Arduino, de hecho hay un boceto Arduino completo que tiene esta también.

```cpp
void readSensor(){
  // register values
  char cmd[4] = {0x22, 0x00, 0x08, 0x2A};
  int ack = i2c.write(addr, cmd, 4);
  wait(0.5);
  char readBuff[4];
  i2c.read(addr, readBuff, 4, false);
  int high = readBuff[1]; //high byte for value is 4th byte in packet in the packet
  int low = readBuff[2]; //low byte for value is 5th byte in the packet
  float CO2 = high*256 + low; //Combine high byte and low byte with this formula to get value
  char sum = readBuff[0] + readBuff[1] + readBuff[2]; //Byte addition utilizes overflow
  if (sum == readBuff[3] & ack == 0){
    //pc.printf("CO2 value = %fn", CO2);
    k30ServicePtr->updateK30Value(CO2);
    if(failures > 0){
      failures--;
    }
  } else {
    //pc.printf("** Sensor Failure **n");
    failures++;
    CO2 = -1;
    k30ServicePtr->updateK30Value(CO2);
    if(failures > 5){ // Keep track of the number of failures. If more than 5, reboot the board.
      i2c.stop();
      for(int x = 0; x < 10; x++){
        lightsRev();
      }
      NVIC_SystemReset();
    }
  }
}

void disconnectionCallback(const Gap::DisconnectionCallbackParams_t *params)
{
  //pc.printf("Disconnected!n");
  BLE::Instance().gap().startAdvertising();
}
```

Se dará cuenta de algunas cosas allí. En primer lugar, el sensor tiene un byte de suma de comprobación, y el sensor, de hecho, a veces fallan esta prueba. Yo no perder de vista el número de fallos en. Una fila. Si consigo más de 5 fallos en una fila, llegué a la conclusión de que el sensor está teniendo problemas, por lo que reanudo la pizarra y empezar de nuevo. Después de un poco largo ** ** de ensayo y error, he encontrado que esto es una solución adecuada.

El resto de este código es repetitivo bastante estándar para las conexiones BLE, etc., y de hecho la mayoría salió de los programas de ejemplo mbed.

```cpp
void updateSensorValue() {
  lightsFwd();
  readSensor();
  wait(1.5);
  lightsFwd();
  wait(1.5);
}

void connectionCallback(const Gap::ConnectionCallbackParams_t *params) {
  // pc.printf("Connected!n");
  BLE::Instance().gap().stopAdvertising();
  eventQueue.call(updateSensorValue);
}

void sensorCallback(void) {
  BLE &ble = BLE::Instance();
  if (ble.gap().getState().connected) {
    eventQueue.call(updateSensorValue);
  } else {
    lightsFwd();
  }
}

void onBleInitError(BLE &ble, ble_error_t error) {

}

void printMacAddress(){
  Gap::AddressType_t addr_type;
  Gap::Address_t address;
  BLE::Instance().gap().getAddress(&addr_type, address);
  //pc.printf("DEVICE MAC ADDRESS: ");
  for (int i = 5; i >= 1; i--){
    // printf("%02x:", address[i]);
  }
  //pc.printf("%02xrn", address[0]);
}

void bleInitComplete(BLE::InitializationCompleteCallbackContext *params) {
  BLE& ble = params->ble;
  ble_error_t error = params->error;
  if (error != BLE_ERROR_NONE) {
    onBleInitError(ble, error);
    return;
  }
  if(ble.getInstanceID() != BLE::DEFAULT_INSTANCE) {
    return;
  }

  ble.gap().onDisconnection(disconnectionCallback);
  ble.gap().onConnection(connectionCallback);
  k30ServicePtr = new K30Service(ble, co2Level);

  ble.gap().accumulateAdvertisingPayload(GapAdvertisingData::BREDR_NOT_SUPPORTED | GapAdvertisingData::LE_GENERAL_DISCOVERABLE);
  ble.gap().accumulateAdvertisingPayload(GapAdvertisingData::COMPLETE_LIST_16BIT_SERVICE_IDS, (uint8_t *) uuid16_list, sizeof(uuid16_list));
  ble.gap().accumulateAdvertisingPayload(GapAdvertisingData::COMPLETE_LOCAL_NAME, (uint8_t *) DEVICE_NAME, sizeof(DEVICE_NAME));
  ble.gap().setAdvertisingType(GapAdvertisingParams::ADV_CONNECTABLE_UNDIRECTED);
  ble.gap().setAdvertisingInterval(1000);
  ble.gap().startAdvertising();
}

void scheduleBleEventsProcessing(BLE::OnEventsToProcessCallbackContext* context) {
  BLE &ble = BLE::Instance();
  eventQueue.call(Callback<void()>(&ble, &BLE::processEvents));
}

int main() {
  eventQueue.call_every(1000, sensorCallback);
  BLE &ble = BLE::Instance();
  ble.onEventsToProcess(scheduleBleEventsProcessing);
  ble.init(bleInitComplete);
  eventQueue.dispatch_forever();
  return 0;
}
```

De manera que se lee el valor de CO2 desde el sensor de cada (lo que parece) segundos - al menos la devolución de llamada se llama a cada segundo. Pero en ese devolución de llamada corro alrededor de las luces, que tiene un adicional de ~ 3,25 segundos. Y hay una razón para ello. Si tuviera que simplemente leer el sensor de cada segundo, que obtendría resultados duplicados, y mucho más fracasos. Eso es debido a que el propio sensor sólo actualiza sus registros cada 2 segundos o menos. Y si se intenta leer mientras los está actualizando, se cuelga. Por lo que este fue mi compromiso para la fiabilidad del sensor. Parece haber tenido éxito.

Ahora, como ya he dicho, yo todavía tenía que leer ** ** los datos a través de Bluetooth desde el dispositivo de borde, por lo que necesitaba escribir algo para manejar eso. La manera más eficaz para llegar a su dispositivo Bluetooth de Linux es mediante el uso de gatttool, pero eso es básicamente una herramienta de línea de comandos. Estoy bastante seguro de que podría haber escrito algo más de código C para acceder al dispositivo BLE directamente, pero me decidí a escribir un pequeño programa en Ir a usar simplemente gatttool para hacerlo. Una vez más, voy a pasar por esto en secciones para ti.

Comenzamos con algunas importaciones y definiciones estándar Go:

```go
package main

import (
  "os/exec"
  "strings"
  "bufio"
  "fmt"
  "encoding/binary"
  "encoding/hex"
  "log"
  "math"
  "os"
  "bytes"
  "time"
  "strconv"
)

var (
  colonByte = []byte(":")
  spaceByte = []byte(" ")
)

var (
  Trace *log.Logger
  Info *log.Logger
  Warning *log.Logger
  Error *log.Logger
)

const timeout = 10 * time.Second

func Float32frombytes(bytes []byte) float32 {
  bits := binary.LittleEndian.Uint32(bytes)
  float := math.Float32frombits(bits)
  return float
}
func Float32bytes(float float32) []byte {
  bits := math.Float32bits(float)
  bytes := make([]byte, 4) binary.LittleEndian.PutUint32(bytes, bits)
  return bytes
}
```

Los bits única realmente interesante, hay la conversión de un grupo de bytes a un Float32. Resulta que cuando se lee a partir gatttool lo que recibe es una matriz de bytes sin formato. Como yo estaba escribiendo un flotador a BLE desde el dispositivo, tengo que convertir esos 4 bytes de nuevo a un flotador. Gracias a Google, he encontrado una manera de hacer eso.

```go
func postResults(result string) {
  var out bytes.Buffer
  var stderr bytes.Buffer
  cmdProc := exec.Command("/usr/bin/curl", "-i", "-XPOST", "http://localhost:8186/write", "--data-binary", result)
  cmdProc.Stdout = &out
  cmdProc.Stderr = &stderr
  err := cmdProc.Run()
  defer cmdProc.Wait()
  if err != nil {
    Error.Println(err)
    return
  }
  Info.Println("Result: " + out.String())
}
```

Ok, ya sé, usted está diciendo WTF ?? Pero sí, he usado rizo para publicar los datos a la base de datos. Parecía una buena idea en ese momento. Voy a volver a escribir utilizando el InfluxDB algún día Ir a la biblioteca, pero yo estaba en un apuro.

Este bit siguiente fue muy divertido.

```go
func runCommand(macAddr string) {
  input := make(chan []byte, 1)
  argString := string("-b " + macAddr + " -t random --char-write-req --handle=0x000f --value=0100 --listen")
  args := strings.Fields(argString)
  cmdString := "/usr/local/bin/gatttool"
  cmd := exec.Command(cmdString, args...)
  Info.Println("Running: ", cmdString, args)
  cmdOut, _ := cmd.StdoutPipe()
  cmd.Start()
  defer cmd.Wait()
  defer cmdOut.Close()
  reader := bufio.NewReader(cmdOut)
  go func() {
    buff, _ := reader.ReadBytes('n')
    Trace.Println(string(buff))
    input <- buff
  }()
  select {
    case <-time.After(timeout):
      Error.Println(" GATTTOOL timed out. Sensor nbot on?")
      cmd.Process.Kill()
      return
    case i := <-input:
      res := bytes.Split(i, spaceByte);
      //fmt.Println("Length ", len(res))
      if(len(res) < 4 ) {
        Error.Println("Unexpected return from Gatttool")
        cmd.Process.Kill()
        return
      }
  }
  for 1 > 0 {
    go func() {
      buff, _ := reader.ReadBytes('n')
      Trace.Println(string(buff))
      input <- buff
    }()
    select {
      case <-time.After(timeout):
        Warning.Println("timed out")
        cmd.Process.Kill()
        return
      case i := <-input:
        Trace.Println(string(i))
        result := bytes.Split(i, colonByte)
        fd := bytes.Fields(result[1])
        reading := make([]byte, 4)
        for x := 0; x < len(fd); x++ {
          data, err := hex.DecodeString(string(fd[x]))
          if err != nil {
            panic(err)
          }
          reading[x] = data[0]
        }
        float := Float32frombytes(reading)
        if(float < 1){
          Info.Println("Failed Sensor")
          continue;
        } else {
          st := "k30_reader,sensor=k30_co2 co2=" + strconv.Itoa(int(float))
          Trace.Println(st)
          postResults(st)
        }
    }
  }
}
```

Ahora que se parece a un montón, y se ve confuso, pero esto es lo que básicamente hace. Usted ve, se puede abrir GATTTOOL, pero si el dispositivo en el otro extremo, o bien no existe o se ha desconectado, luego romper cosas. Así que tengo que tiempo de espera en el comando de reintento gatttool y si eso ocurre (que, si recuerda el código del sensor, es seguro que va a si el sensor se bloquea). Así que hay un montón de comprobaciones para asegurarse de que nos conectamos, que obtenemos un resultado, y que el resultado es al menos nominalmente racional antes de ir y tratar de publicarla en la base de datos. Sólo créanme cuando digo que una gran cantidad de ensayo y error y fallas fuimos a hacer esta sólida. Y es robusto. Se ha quedado perfectamente durante más de un mes, 24/7, sin problemas.

```cpp
func Init(){
  file, err := os.OpenFile("/var/log/blueCO2.log", os.O_CREATE|os.O_WRONLY|os.O_APPEND, 0666)
  if err != nil {
    fmt.Println("Failed to open log file", err)
  }
  Trace = log.New(file,"TRACE: ", log.Ldate|log.Ltime|log.Lshortfile)
  Info = log.New(file, "INFO: ", log.Ldate|log.Ltime|log.Lshortfile)
  Warning = log.New(file, "WARNING: “, log.Ldate|log.Ltime|log.Lshortfile)
  Error = log.New(file, "ERROR: “, log.Ldate|log.Ltime|log.Lshortfile)
}
func main() {
  Init()
  myArgs := os.Args[1:]
  macAddr := myArgs[0]
  if(len(myArgs) < 1){
    Error.Println("No BLE Device Address Suplied, Exiting.")
    return
  }
  for 1>0 {
    runCommand(macAddr)
  }
}
```

Una vez más, bastante sencillo. Sólo hay que establecer algunas funciones de registro, y luego correr para siempre. Obviamente, usted tiene que pasar el programa de la dirección MAC del dispositivo BLE desea conectarse a, pero eso es lo único que se necesita.

Así que por el sensor de CO2, tanto desde el lado del sensor y desde el lado dispositivo de borde. ***Uf***

### Los sensores de Lora

Estas son en realidad dos sensores separados, como saben, pero voy a salvarnos de todo un poco de tiempo mediante la combinación de ellos, ya que comparten una tonelada de código. Una vez más, voy a ir a través del código en pedazos para que sea más fácil. El sensor de radiación venía con una pequeña biblioteca de Arduino, por lo que la utilizamos.

```cpp
#include <ESP8266WiFi.h>
#include "RadiationWatch.h"
#include <SPI.h>
#include <RH_RF95.h>
#include <Wire.h>

// for WEMOs D1 Mini
#define RFM95_CS D0
#define RFM95_INT D8
#define RFM95_RST D3
// Where to send packets to!
#define DEST_ADDRESS 1
// change addresses for each client board, any number :)
#define MY_ADDRESS 2
// Wemos D1 Mini pins
RadiationWatch radiationWatch(D1, D2);

// Change to 434.0 or other frequency, must match RX's freq!
#define RF95_FREQ 434.0

// Blinky on send
#define STATUS_LED D4
// Singleton instance of the radio driver
RH_RF95 rf95(RFM95_CS, RFM95_INT);
int16_t packetnum = 0; // packet counter, we increment per xmission
```

Esos son los define para el sensor de radiación. Ahora aquí está la materia para el sensor de temperatura Melexis (de nuevo, hay una biblioteca Arduino por ahí que hizo fácil).

```cpp
#include <ESP8266WiFi.h>
#include <Adafruit_MLX90614.h>
#include <SPI.h>
#include <RH_RF95.h>
#include <Wire.h>

// for WEMOs D1 Mini
#define RFM95_CS D0
#define RFM95_INT D8
#define RFM95_RST D3

#define GREEN_LED D4

// Change to 434.0 or other frequency, must match RX's freq!
#define RF95_FREQ 434.0

// Blinky on send
#define LED LED_BUILTIN
// Where to send packets to!
#define DEST_ADDRESS 1
// change addresses for each client board, any number :)
#define MY_ADDRESS 3
// Singleton instance of the radio driver
RH_RF95 rf95(RFM95_CS, RFM95_INT);
// for the sensor
Adafruit_MLX90614 mlx = Adafruit_MLX90614();
```

A continuación, ambos hacen la misma función de configuración:

```cpp
void setup() {
  pinMode(STATUS_LED, OUTPUT);
  Serial.begin(115200);
  while (!Serial) {
    delay(1);
  }
  // we're not using the Wemos WiFi.
  WiFi.mode(WIFI_OFF);
  delay(1000);
  pinMode(RFM95_RST, OUTPUT);
  delay(500);
  digitalWrite(RFM95_RST, HIGH);
  delay(500);
  Serial.println("LoRa Radiation TX!");
  // manual reset
  digitalWrite(RFM95_RST, LOW);
  delay(100);
  digitalWrite(RFM95_RST, HIGH);
  delay(100);

  while (!rf95.init()) {
    Serial.println("LoRa radio init failed");
    while (1);
  }
  Serial.println("LoRa radio init OK!"); // Defaults after init are 434.0MHz, modulation GFSK_Rb250Fd250, +13dbM
  if (!rf95.setFrequency(RF95_FREQ)) {
    Serial.println("setFrequency failed");
    while (1);
  }
  Serial.print("Set Freq to: "); Serial.println(RF95_FREQ);
  // Defaults after init are 434.0MHz, 13dBm, Bw = 125 kHz, Cr = 4/5, Sf = 128chips/symbol, CRC on
  // The default transmitter power is 13dBm, using PA_BOOST.
  // If you are using RFM95/96/97/98 modules which uses the PA_BOOST transmitter pin, then
  // you can set transmitter powers from 5 to 23 dBm:
  rf95.setTxPower(23, false);
  Serial.println("Starting sensor ... ");
}
```

El sensor de radiación tiene que registrarse algunas devoluciones de llamada, y definir las devoluciones de llamada:

```cpp
radiationWatch.setup();
// Register the callbacks.
radiationWatch.registerRadiationCallback(&onRadiation);
radiationWatch.registerNoiseCallback(&onNoise);
Serial.println("Callbacks Registered.");
digitalWrite(STATUS_LED, LOW);

// it’s a sensitive little bugger
void onNoise() {
  Serial.println("Argh, noise, please stop moving");
}

void onRadiation() {
  digitalWrite(STATUS_LED, HIGH);
  Serial.println("Reading Radiation...");
  char buf[RH_RF95_MAX_MESSAGE_LEN];
  uint8_t len = sizeof(buf);
  Serial.println("A wild gamma ray appeared");
  double rad = radiationWatch.uSvh();
  double var = radiationWatch.uSvhError();
  double dose = radiationWatch.cpm();
  double er = radiationWatch.uSvh();
  double coef = radiationWatch.uSvhError();
  Serial.print(" Dose: "); Serial.println(dose);
  Serial.print(rad);
  Serial.print(" uSv/h +/- ");
  Serial.println(var);
  // Message format is "R,gamma_ray_strength,dose" because the receiver is ALSO getting
  // data from a temp sensor. Could also send the variation, error and error coefficient.
  sprintf(buf, "%s,%s,%s", "R", String(rad).c_str(), String(dose).c_str());
  sendMessage(buf, len);
  digitalWrite(STATUS_LED, LOW);
}
```

Yo definido mi propio formato de mensaje, porque tenía que diferenciar entre los dos sensores, y todavía tenía que mantener el tamaño del mensaje muy pequeño como para mantener la placa de radio de dividirlo en paquetes separados.

Inicializar el sensor Melexis fue una sola llamada a

```cpp
mlx.begin()
```

A continuación, simplemente bucles para siempre leer y enviar los datos:

```cpp
double ambTempC = mlx.readAmbientTempC();
double objTempC = mlx.readObjectTempC();

// Message format is "T,AmbientTemp,ObjectTemp" because the receiver is ALSO getting
// data from a radiation sensor.
Serial.print("Amb: "); Serial.print(ambTempC);
Serial.print(" Obj: " ); Serial.println(objTempC);
sprintf(buf, "%s,%s,%s", "T", String(ambTempC).c_str(), String(objTempC).c_str());
digitalWrite(LED, HIGH);
digitalWrite(GREEN_LED, HIGH);
```

Ambos sensores tienen exactamente el mismo mensaje funciones de envío / respuesta:

```cpp
int sendMessage(char* buf, uint8_t len) {
  Serial.println("Transmitting..."); // Send a message to rf95_server
  char radiopacket[20];
  for (int x = 0; x < 20; x++) {
    if (x == len || x > len) {
      radiopacket[x] = '0';
    }
    radiopacket[x] = buf[x];
  }
  itoa(packetnum++, radiopacket + 13, 10);
  Serial.print("Sending "); Serial.println(radiopacket);
  radiopacket[19] = 0;
  Serial.println("Sending...");
  delay(10);
  rf95.send((uint8_t *)radiopacket, 20);
  Serial.println("Waiting for packet to complete...");
  delay(10);
  rf95.waitPacketSent();
  // Now wait for a reply
  waitReply();
}
void waitReply() {
  uint8_t buf[RH_RF95_MAX_MESSAGE_LEN];
  uint8_t len = sizeof(buf);
  Serial.println("Waiting for reply...");
  if (rf95.waitAvailableTimeout(10000)) {
  // Should be a reply message for us now
    if (rf95.recv(buf, &len)) {
      Serial.print("Got reply: ");
      Serial.println((char*)buf);
      Serial.print("RSSI: ");
      Serial.println(rf95.lastRssi(), DEC);
    }
    else {
      Serial.println("Receive failed");
    }
  } else {
    Serial.println("No reply, is there a listener around?");
  }
}
```

Técnicamente no tengo que esperar una respuesta, pero sí, sólo para propósitos de depuración. Ahora bien, como era de esperar, hay algo de código similar que se ejecutan en el Wemos escondido dentro del borde del colector, y es muy simple, y muy similar. Sólo lee los mensajes de la radio, les da formato un poco, y las escribe en el puerto serie.

```cpp
#include <SPI.h>
#include <RH_RF95.h>
#include <ESP8266WiFi.h>
// Wemos D1 Mini ...
#define RFM95_CS D1
#define RFM95_IRQ D2
#define RFM95_RST D3
//
// This is the receiver, so it receives from anyone, others send to this address.
#define MY_ADDRESS 1

// Change to 434.0 or other frequency, must match RX's freq!
#define RF95_FREQ 434.0
// Singleton instance of the radio driver
RH_RF95 rf95(RFM95_CS, RFM95_IRQ);
// Blinky on receipt
#define LED LED_BUILTIN

void setup() {
  Serial.begin(115200)
  while (!Serial); {
    delay(1);
  }
  delay(100);
  // we're not using the Wemos WiFi.
  WiFi.mode(WIFI_OFF);
  Serial.println("LoRa RXer!");
  pinMode(LED, OUTPUT);
  pinMode(RFM95_RST, OUTPUT);
  digitalWrite(RFM95_RST, HIGH);
  // manual reset
  digitalWrite(RFM95_RST, LOW);
  delay(100);
  digitalWrite(RFM95_RST, HIGH);
  delay(100);

  while (!rf95.init()) {
    Serial.println("LoRa radio init failed");
    while (1);
  }
  Serial.println("LoRa radio init OK!");

  // Defaults after init are 434.0MHz, modulation GFSK_Rb250Fd250, +13dbM
  if (!rf95.setFrequency(RF95_FREQ)) {
    Serial.println("setFrequency failed");
    while (1);
  }
  Serial.print("Set Freq to: "); Serial.println(RF95_FREQ);
  // The default transmitter power is 13dBm, using PA_BOOST.
  // If you are using RFM95/96/97/98 modules which uses the PA_BOOST transmitter pin, then
  // you can set transmitter powers from 5 to 23 dBm:
  rf95.setTxPower(23, false);
}
```

El bucle simplemente espera a que un mensaje, y luego formatea:

```cpp
void loop(){
  if (rf95.available()) {
  // Should be a message for us now
  uint8_t buf[RH_RF95_MAX_MESSAGE_LEN];
  uint8_t len = sizeof(buf);
  String msgBuff = "iot_sensor,recv_from=LoRa ";
  if (rf95.recv(buf, &len)) {
    digitalWrite(LED, HIGH);
    char *p = (char *)buf;
    char *str;
    char* strAr[3];
    int x = 0;
    // incoming message format: T|R,reading1,reading2
    while ((str = strtok_r(p, ",", &p)) != NULL) {// delimiter is the comma
      strAr[x++] = str;
    }
    String mType = String(strAr[0]);
    double reading1 = String(strAr[1]).toFloat();
    double reading2 = String(strAr[2]).toFloat();
    if (mType == "T") {
      msgBuff += "AmbTempC=";
      msgBuff += String(reading1);
      msgBuff += ",ObjTempC=";
      msgBuff += String(reading2);
      msgBuff += ",AmbTempF=";
      msgBuff += String((reading1 CONTRIBUTING.rst LICENSE MANIFEST.in README.rst THANKS build dist docs output pelican pelican.egg-info posts_processed posts_to_process process.sh pyproject.toml requirements samples setup.cfg setup.py tasks.py tox.ini 1.8) + 32);
      msgBuff += ",ObjTempF=";
      msgBuff += String((reading2 CONTRIBUTING.rst LICENSE MANIFEST.in README.rst THANKS build dist docs output pelican pelican.egg-info posts_processed posts_to_process process.sh pyproject.toml requirements samples setup.cfg setup.py tasks.py tox.ini 1.8) + 32);
    } else {
      msgBuff += "gamma_ray=";
      msgBuff += String(reading1);
      msgBuff += ",dose=";
      msgBuff += String(reading2);
    }
    msgBuff += ",RSSI=";
    msgBuff += String(rf95.lastRssi());
    msgBuff += ".0";
    Serial.println(msgBuff);
    // Send a simple reply
    uint8_t data[] = "Roger that!";
    rf95.send(data, sizeof(data));
    rf95.waitPacketSent();
    digitalWrite(LED, LOW);
  } else {
     Serial.println("Receive failed");
  }
}

```

Probablemente usted está diciendo “Pero no es todo lo que la charla en línea serie va a meterse con la base de datos?” y estaríamos en lo cierto, excepto que escribí algo de código Go en el dispositivo de borde para leer los datos desde el puerto serie y tratar con él.

```go
package main
import (
  "os/exec"
  "fmt"
  "bufio"
  "syscall"
  "log"
  "os"
  "bytes"
  "time"
  "strings"
)
var (
  colonByte = []byte(":")
  spaceByte = []byte(" ")
)

var (
  Trace *log.Logger
  Info *log.Logger
  Warning *log.Logger
  Error *log.Logger
)

const timeout = 10 * time.Second
func postResults(result string) {
  var out bytes.Buffer
  var stderr bytes.Buffer
  cmdProc := exec.Command("/usr/bin/curl", "-i", "-XPOST", "http://localhost:8186/write", "--data-binary", result)
  cmdProc.Stdout = &out
  cmdProc.Stderr = &stderr
  err := cmdProc.Run()
  if err != nil {
    Error.Println(err)
    return
  }
  fmt.Println("Result: " + out.String())
}
func runPort() {
  tty, err := os.OpenFile("/dev/ttyS2", os.O_RDWR|syscall.O_NOCTTY, 0)
  if err != nil {
    log.Fatalf("Cannot open tty port: %vn", err)
  }
  defer tty.Close()
  for 1 > 0 {
    scanner := bufio.NewScanner(tty)
    for scanner.Scan() {
      result := scanner.Text()
      startsWith := strings.HasPrefix(result, "iot_sensor")
      if startsWith {
        postResults(result)
        fmt.Println(result)
      }
    }
    if err := scanner.Err(); err != nil {
      log.Fatal(err)
    }
  }
}
func Init(){
  file, err := os.OpenFile("/var/log/wemos.log", os.O_CREATE|os.O_WRONLY|os.O_APPEND, 0666)
  if err != nil {
    fmt.Println("Failed to open log file", err)
  }
  Trace = log.New(file,
    "TRACE: ",
    log.Ldate|log.Ltime|log.Lshortfile)
  Info = log.New(file,
    "INFO: ",
    log.Ldate|log.Ltime|log.Lshortfile)
  Warning = log.New(file,
    "WARNING: ",
    log.Ldate|log.Ltime|log.Lshortfile)
  Error = log.New(file,
    "ERROR: ",
    log.Ldate|log.Ltime|log.Lshortfile)
}

func main() {
  Init()
  for 1>0 {
    runPort()
  }
}
```

Y sí, es probable que haya una mejor manera, pero yo ya tenía el código de la * * otro sensor y estaba de nuevo en un apuro. Así que ahí lo tienen.

Y eso es todo el código del sensor! Ahora debería ser capaz de construir todos los sensores que he construido y que se ejecuten al mismo. Pero lo que realmente *** *** Vine aquí para el dispositivo fue Edge Colección! Yo sé, por eso he guardado para el final. Así que vamos a llegar a eso!

Dispositivo Edge ### Colección

Por lo tanto, usted ha pasado los $ 100 o menos para todas las partes para el dispositivo de borde Colección, y ahora se está preguntando cómo en realidad ** ** acumulación ella. ¡Bienvenido al club! Así que era I. Como resultado - y pino-64 no le dice este frente - pero hay un apoyo en realidad bastante limitado para la visualización de la pantalla táctil. El que venden. Correcto. Al parecer funciona muy bien con Android, pero que realmente no me ayuda mucho. La versión de Linux que tiene más o menos * * para el uso se llama [Armbian](https://www.armbian.com). Derecho, nunca había oído hablar de él tampoco. Antes simplemente buceo en e instalarlo, I ** ** fuertemente sugiero que lea y entienda todo). Derecho, nunca había oído hablar de él tampoco. Antes simplemente buceo en e instalarlo, I ** ** fuertemente sugiero que lea y entienda todo [aquí](https://www.armbian.com/pine64/). En realidad. No lo hice, y fue una experiencia bastante dolorosa. Eso es también porque cosas como el controlador de pantalla táctil no estaba en la línea principal a continuación, lo que es ahora.

Lo siguiente fue, por supuesto, para conseguir [InfluxDB](https://www.influxdata.com) y el resto de la) y el resto de la [pila TICK](https://www.influxdata.com/time-series-platform/) instalada. Por suerte que es super fácil - por supuesto. Esta es la forma más rápida y más fácil de hacerlo:

```
curl -sL https://repos.influxdata.com/influxdb.key | sudo apt-key add -
source /etc/lsb-release
echo "deb https://repos.influxdata.com/${DISTRIB_ID,,} ${DISTRIB_CODENAME} stable" | sudo tee /etc/apt/sources.list.d/influxdb.list
```

Que añadirá la siguiente línea a su archivo sources.list.d / influxdb.list:

```
deb https://repos.influxdata.com/ubuntu xenial stable
```

Que es lo que desea. Entonces corre:

```
$ sudo apt-get update
$ sudo apt-get install influxdb chronograf telegraf kapacitor
```

y eso es todo! Ahora, todo lo que tiene que hacer es asegurarse de que el código para cada uno de los sensores anteriormente se ha instalado correctamente, y ... ya está casi allí.

Usted querrá instalar el agente Mosquito MQTT desde Eclipse IO, pero por suerte que es tan simple como apt-get install mosquitos y ya está bueno para ir.

Recuerde que dije que debe leer todo ** ** de los documentos Armbian? Está bien, si es así, entonces sabrá que Bluetooth no funciona realmente fuera de la caja. Así que aquí es cómo resolví eso. He creado un script, llamado 'ble.sh':

```sh
#! /bin/sh

/usr/sbin/rfkill list
/usr/local/bin/rtk_hciattach -n -s 115200 /dev/ttyS1 rtk_h5
/bin/hciconfig hci0 up
```

Eso hará que la configuración del dispositivo ble hecho. Pero tiene que ser ejecutado cada vez que su dispositivo se reinicia, así que creé un control del servicio SystemV por ella

```
/lib/systemd/system/bluetooth-device.service
[Unit]
Description=Bring the BLE device online, if possible
After=network-online.target

[Service]
ExecStart=/bin/sh /usr/local/bin/ble.sh
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

Ahora se pone ejecutar cada vez que el dispositivo se reinicia y sólo después de que la red está activa.

En realidad quería toda la caja es básicamente automático, por lo que hice un montón de otras cosas como los servicios del sistema, como el guión lector Bluetooth Go, el puerto serie Ir escritura, etc. todos aquellos que se inicie automáticamente durante el arranque, así, tan que no es básicamente cero fácil de intervención necesaria. He construido esto como un aparato de datos, de modo configuración cero era un objetivo, y una característica.

Si compró el WiFi / adaptador BLE - lo que realmente debería tener - a continuación, se obtiene 2 interfaces WiFi. Me puse uno de ellos como un punto de acceso WiFi privada para sensores locales y el otro me dejó para unirse a otra red Wi-Fi para la carga de datos. Armbian viene con su propio instalado hostapd, por lo que sólo puede usarlo para configurar el punto de acceso. Utilice la interfaz wlan1 para la AP.

Así que ahora usted tiene una caja que tiene todas las piezas adecuadas, y ** ** debe ser capaz de tener todos y cada uno de los sensores descritos anteriormente datos de conectarse e iniciar sesión. Esto es lo que el tablero de instrumentos en la mía se parece a:

![SafariScreenSnapz037](/posts/category/iot/iot-hardware/images/SafariScreenSnapz037.png)

ágil bastante! Ahora, hay un par de elementos de panel de allí que usted no será capaz de obtener - al menos fuera de la caja. Esos son los monitores de RSSI y el monitor de la batería. Esto se debe a los (todavía) no son parte de telegraf. Escribí esos colectores de mí mismo. Usted puede obtener los de mi tenedor de GitHub Telegraf [aquí](https://github.com/davidgs/telegraf/tree/iotEdge). Está en la rama 'IoTEdge'. Sólo construir eso, y actualizar el archivo telegraf.conf con lo siguiente:

```yaml
[[inputs.linux_battery]]
# ## command for reading. If empty default path will be used:
# ## This can also be overridden with env variable, see README.
battstatus = "/sys/class/power_supply/battery/status"
battvoltage = "/sys/class/power_supply/battery/voltage_now"
battcurrent = "/sys/class/power_supply/battery/current_now"
battcapacity = "/sys/class/power_supply/battery/capacity"
batthealth = "/sys/class/power_supply/battery/health"
```

y

```yaml
# # Collect wireless interface link quality metrics
[[inputs.linux_wireless]]
# ## file path for proc file. If empty default path will be used:
## /proc/net/wireless
# ## This can also be overridden with env variable, see README.
proc_net_wireless = "/proc/net/wireless"
# ## dump metrics with 0 values too
# dump_zeros = true
```

Que les permite conocer las estadísticas de la batería / potencia y en cualquier y todas las interfaces inalámbricos instalados. Si quiere ahorrarse un montón de trabajo, y quieren un panel que se ve exactamente ** ** como el mío que estás en un verdadero placer. Con el nuevo Chronograf (v1.6) puede simplemente guardar [esto](https://davidgs.com/IoTEdge-3.json), y luego importarlo y tienen una copia exacta!

Ok, ya casi hemos llegado! Lo último que quería era que esto, como ya he dicho, para ser 'automático', así que no quiero que nadie tenga al inicio de sesión, o lanzar el tablero de instrumentos, etc. Así que, primero, tenía que deshacerse del bit de inicio de sesión.

He instalado 'NODM' como el gestor por defecto, que no pasa por la pantalla de inicio de sesión en el arranque. Eso es bastante simple. Pero ahora para asegurarse de que el salpicadero siempre viene por defecto, en pantalla completa por lo que hay muy poco espacio para la artimaña del usuario final. Es necesario crear un elemento de inicio para Chromium Browser:

```
demokit-2:/home/demo/.config# cat autostart/dashboard.desktop
[Desktop Entry]
Encoding=UTF-8
Version=0.9.4
Type=Application
Name=Chronograf Dashboard
Comment=dashboard
Exec=chromium-browser --incognito --kiosk http://localhost:8888/sources/1/dashboards/1#
OnlyShowIn=XFCE;
StartupNotify=false
Terminal=false
Hidden=false
```

He creado un usuario 'demo' que tiene permisos ** ** muy limitados, y poner este archivo en su directorio .config / autostart. Que se inicia el navegador Chrome, apuntando directamente al tablero de instrumentos, sin decoración de las ventanas, por lo que el usuario no puede salir del navegador y tener acceso al escritorio del usuario. El único inconveniente de esto es que usted tiene que tener un método alternativo de registro y controlar / configurar cosas. Por eso, he instalado TightVNC - y permitido bajo un usuario diferente ** ** creé. Así que hay un usuario 'configuración' que puede iniciar sesión con TightVNC para hacer cosas como cambiar la configuración de Wi-Fi, etc., pero el usuario 'demo' siempre recupera el salpicadero predefinido.

## Conclusión

Eso debería ser un gran comienzo en la construcción de todo este sistema. Tengo que admitir que Armbian puede ser un poco incómoda y toma una buena cantidad de TLC conseguirlo configurado correctamente. Conseguir el trabajo AP WiFi, y la conexión de la otra interfaz WiFi ** ** a una conexión a Internet aguas arriba es dura. El WiFi aguas arriba tiene la mala costumbre de dejar a solo, o perder su ruta por defecto, etc.

Probablemente he olvidado un montón de pequeños ajustes que hice aquí y allá para que todo funcione sin problemas, y donde he omitido cosas, me disculpo. Emprendí este proyecto a lo largo de varios meses y estoy constantemente haciendo pequeñas mejoras. Ha sido difícil hacer un seguimiento de todos los pequeños cambios realizados. Si encuentra algo que no es correcta, o necesita ser actualizado, por favor póngase en contacto conmigo y me dejó saber!

Y, por último, si se construye uno de estos, me encantaría saberlo! Que me haga saber lo que has construido, y cómo se está usando!
