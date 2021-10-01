---
title: "La construcción de una aplicación con Apache MyNewt"
Date: 2017-02-09
Author: davidgs
Category: Gadgetry, IoT
Tags: Apache, IoT, mynewt
Slug: building-an-app-with-apache-mynewt
hero: images/logo.png
reading_time: 22 minutes
---

He pasado mucho tiempo en los últimos meses trabajando en la [Apache MyNewt IO OS](http://mynewt.apache.org). Si usted no sabe lo que es eso, entonces usted realmente debería! Es un proyecto bastante nuevo Apache, todavía en la fase de 'incubar', pero están a punto de lanzar su segunda beta de la versión 1.0 (creo que todos los votos están en lo apruebe). Sí, hay algunas cosas que todavía faltan, y algunas asperezas, pero que viene muy bien juntos y si usted está buscando un IO SO de código abierto para el dispositivo, pueden MyNewt justo lo que están buscando. Es extremadamente pequeño (el gestor de arranque es construí todos 9Kb!), Rápido y muy flexible. He escrito un par de aplicaciones para él - una UART basados en aplicación del sensor ambiental y una aplicación analógica del sensor - que voy a escribir aquí por separado. Para hoy, voy a empezar con el sensor analógico utilizando la (ADC) del convertidor analógico a digital. ¡Entonces empecemos!

Basé esta demostración en el Consejo Nórdico semi [NRF52DK](https://www.nordicsemi.com/eng/Products/Bluetooth-low-energy/nRF52-DK) desarrollador que es una placa de desarrollo Bluetooth SoC basado en M4F corteza. Se tiene mucho a su favor, y el chip nórdica NRF52 es un chip muy común la IO, por lo que es ideal para el desarrollo (de hecho, la próxima aplicación que escribí es para una placa Arduino Primo, que también utiliza el NRF52 SoC). Por mi analógica del sensor yo elegimos un sensor de nivel de líquido Etape que he recogido de) desarrollador que es una placa de desarrollo Bluetooth SoC basado en M4F corteza. Se tiene mucho a su favor, y el chip nórdica NRF52 es un chip muy común la IO, por lo que es ideal para el desarrollo (de hecho, la próxima aplicación que escribí es para una placa Arduino Primo, que también utiliza el NRF52 SoC). Por mi analógica del sensor yo elegimos un sensor de nivel de líquido Etape que he recogido de [Adafruit](https://www.adafruit.com/products/1786). ¿Por qué elegí este sensor? Sobre todo porque la compré hace un tiempo por alguna gran razón por la que no puedo recordar, por lo que estaba sentado en mi escritorio! Es un simple resistente al voltaje analógico del sensor, y ya tenía, por lo que era ideal. También compré un 1000 ml cilindro graduado en eBay para montarlo en, sólo para hacer las cosas fáciles. Ahora que todo lo que el fondo está fuera del camino, vamos a empezar a trabajar en la construcción de la propia aplicación!

Empecemos por el principio ... Por lo general es un buen punto de partida. No voy a ir a través de toda la configuración del entorno de desarrollo MyNewt, pero hay un excelente tutorial sobre conseguir crear [aquí](http://mynewt.apache.org/latest/os/get_started/get_started/). Hago mi desarrollo en Mac OS Sierra, y yo no ** ** recomiendo ir la ruta del estibador, pero aparte de eso, se consigue la configuración y funcionamiento con MyNewt y luego volver.

** Nota: ** Este tutorial con el tiempo será una parte de los docs / tutoriales en el lanzamiento oficial MyNewt.

volver todo el mundo? Todo preparado y listo? ¡Excelente!

## Empezando

En primer lugar, usted, por supuesto, desea crear un proyecto para esto:

```
$ mkdir ~/dev
$ cd ~/dev
$ newt new myadc
Downloading project skeleton from apache/incubator-mynewt-blinky...
Installing skeleton in myadc...
Project myadc successfully created.
$ cd myadc
```

¡Fácil! Nórdica no dio a conocer los controladores de ADC y tal para la NRF52 como de código abierto, por lo menos no bajo una licencia Apache-amigable, por lo que han sido trasladados a un depósito externo con el fin de no chocar con problemas de licencia y derechos de autor. Una cosa que hace es MyNewt mucha torreón de la información en los archivos YAML. Y para cada proyecto se crea, tritón crea un directorio en el directorio de los objetivos de mantener algunos de estos archivos de configuración. También mantiene una en su directorio principal de desarrollo que le dice a la herramienta tritón lo repositorios para incluir, etc. Así que aquí está la mía:

```
$ cat project.yml
#
# Licensed to the Apache Software Foundation (ASF) under one
# or more contributor license agreements. See the NOTICE file
# distributed with this work for additional information
# regarding copyright ownership. The ASF licenses this file
# to you under the Apache License, Version 2.0 (the
# "License"); you may not use this file except in compliance
# with the License. You may obtain a copy of the License at
#
# http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing,
# software distributed under the License is distributed on an
# "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
# KIND, either express or implied. See the License for the
# specific language governing permissions and limitations
# under the License.
#
project.name: "my_project"
project.repositories:
- apache-mynewt-core
- mynewt_stm32f3
- mynewt_arduino_zero
- mynewt_nordic
# Use github's distribution mechanism for core ASF libraries.
# This provides mirroring automatically for us.
#
repository.apache-mynewt-core:
type: github
vers: 0-dev
user: apache
repo: incubator-mynewt-core
repository.mynewt_arduino_zero:
type: github
vers: 0-latest
user: runtimeinc
repo: mynewt_arduino_zero
repository.mynewt_stm32f3:
type: github
vers: 0-latest
user: runtimeinc
repo: mynewt_stm32f3
repository.mynewt_nordic:
type: github
vers: 0-latest
user: runtimeinc
repo: mynewt_nordic
```

Usted no necesita todos esos repositorios! Los únicos dos que necesita para este ejercicio son el `Apache-mynewt-core` y los repositorios` mynewt.nordic`. Para el siguiente ejemplo que voy a escribir hasta que necesitará el repositorio mynewt_arduino_primo también.

Ahora que se han definido los repositorios necesarios, es el momento de instalar todo para que usted pueda empezar.

```
$ newt install -v
apache-mynewt-core
Downloading repository description for apache-mynewt-core... success!
...
apache-mynewt-core successfully installed version 0.9.0-none
...
mynewt_nordic
Downloading repository description for mynewt_nordic... success!
...
mynewt_nordic successfully installed version 0.9.9-none
$
```

Su versión de cuerdas probablemente serán diferentes, pero se debe conseguir un resultado similar.

Para la aplicación en sí vamos a extender la una de las aplicaciones incluidas para un dispositivo periférico Bluetooth para que podamos obtener las comunicaciones Bluetooth incorporados, por lo que lo primero que tendremos que hacer es copiar esa aplicación en nuestro propio directorio de aplicación :

```
$ mkdir -p apps/nrf52_adc
$ cp -Rp repos/apache-mynewt-core/apps/bleprph/* apps/nrf52_adc
```

A continuación, se va a modificar el archivo `pkg.yml` para su aplicación. Cuando haya terminado, debería tener este aspecto:

```yml
$ cat app/nrf52_adc/pkg.yml
...
pkg.name: apps/nrf52_adc
pkg.type: app
pkg.description: Simple BLE peripheral application for ADC Sensors.
pkg.author: "Apache Mynewt <dev@mynewt.incubator.apache.org>"
pkg.homepage: "http://mynewt.apache.org/"
pkg.keywords:
pkg.deps:
- "@apache-mynewt-core/boot/split"
- "@apache-mynewt-core/kernel/os"
- "@apache-mynewt-core/mgmt/newtmgr"
- "@apache-mynewt-core/mgmt/newtmgr/transport/ble"
- "@apache-mynewt-core/net/nimble/controller"
- "@apache-mynewt-core/net/nimble/host"
- "@apache-mynewt-core/net/nimble/host/services/ans"
- "@apache-mynewt-core/net/nimble/host/services/gap"
- "@apache-mynewt-core/net/nimble/host/services/gatt"
- "@apache-mynewt-core/net/nimble/host/store/ram"
- "@apache-mynewt-core/net/nimble/transport/ram"
- "@apache-mynewt-core/sys/console/full"
- "@apache-mynewt-core/sys/log/full"
- "@apache-mynewt-core/sys/stats/full"
- "@apache-mynewt-core/sys/sysinit"
- "@apache-mynewt-core/sys/id"
$
```

"Pero espera, la mía sólo se diferencia por el '@ Apache-mynewt-core' parte, ¿por qué tengo que añadir que?" ¿usted pregunta? Porque cuando la aplicación vivía dentro * * el repositorio mynewt núcleos, podría utilizar una ruta relativa. Ahora que hemos eliminado ello, se necesita una ruta explícita, incluyendo el repositorio. (Verá esto hizo aún más clara en un minuto.) Así que ahora tenemos una aplicación, en su propio paquete, llamado nr52_adc y depende de un montón de paquetes dentro de mynewt núcleos.

Crear dos blancos - uno para el gestor de arranque y otro para la junta nrf52.

```
$ newt target create nrf52_adc
$ newt target set nrf52_adc app=apps/nrf52_adc
Target targets/nrf52_adc successfully set target.app to apps/nrf52_adc
$ newt target set nrf52_adc bsp=@apache-mynewt-core/hw/bsp/nrf52dk
$ newt target set nrf52_adc build_profile=debug
$ newt target create nrf52_boot
$ newt target set nrf52_boot app=@apache-mynewt-core/apps/boot
$ newt target set nrf52_boot bsp=@apache-mynewt-core/hw/bsp/nrf52dk
$ newt target set nrf52_boot build_profile=optimized
$ newt target show
targets/nrf52_adc
app=apps/nrf52_adc
bsp=@apache-mynewt-core/hw/bsp/nrf52dk
build_profile=debug
targets/nrf52_boot
app=@apache-mynewt-core/apps/boot
bsp=@apache-mynewt-core/hw/bsp/nrf52dk
build_profile=optimized
$
```

Para ello hemos creado un objetivo para nuestra aplicación, y nos dijeron tritón dónde encontrar esa aplicación. Le hemos dicho a lo tritón Board Support Package (BSP) que se utilizará para la aplicación, y vamos a construir este de depuración. Más tarde, podemos cambiar esto a 'optimizado' como el gestor de arranque para hacerlo más pequeño.

Ahora, si no se ha instalado un cargador de arranque mynewt en su tablero, sin embargo, tendrá que hacer eso en primer lugar. Así acumulación de Let tanto los objetivos, e instalarlos.

```
$ newt build nrf52_boot
...
Compiling boot.c
Archiving boot.a
Linking boot.elf
App successfully built: ~/dev/myadc/bin/nrf52_boot/apps/boot/boot.elf
$ newt build nrf52_adc
...
Compiling main.c
Archiving nrf52_adc.a
Linking nrf52_adc.elf
App successfully built: ~/dev/myadc/bin/nrf52_adc/apps/nrf52_adc/nrf52_adc.elf
$ newt create-image nrf52_adc 1.0.0
App image successfully generated: ~/dev/myadc/bin/nrf52_adc/apps/nrf52_adc/nrf52_adc.img
Build manifest: ~/dev/myadc/bin/nrf52_adc/apps/nrf52_adc/manifest.json
$ newt load nrf52_boot
$ newt load nrf52_adc
```

Por lo que se ha construido y se carga el cargador de arranque, y la aplicación. Si nos fijamos en el directorio bin (waaaay en allí) encontrará las imágenes de los dos, y el cargador de arranque es bastante darned pequeña.

```
$ ls -l bin/targets/nrf_boot/app/apps/boot/
12 -rwxr-xr-x 1 dsimmons staff 8956 Feb 7 15:59 boot.elf.bin
```

Por lo que alrededor 9Kb para el cargador de arranque. Te dije que era pequeña! Puede hacer lo mismo para la aplicación, si usted es curioso.

Ahora usted tiene una aplicación BLE, pero en realidad todo lo que hemos hecho es cambiar el nombre de la aplicación integrada bleprph a nrf52_adc y la carga que. No es tan impresionante, y desde luego no va a leer un sensor analógico en este momento. Si usted tiene [LightBlue](https://itunes.apple.com/us/app/lightblue-explorer-bluetooth/id557428110?mt=8) para iOS o Mac OS que se puede abrir y podrás ver tu 'ágil 'BLE dispositivo muestran arriba. Pero estamos aquí para hacer realidad una aplicación que envía BLE lecturas reales de un sensor, por lo que vamos a hacer que la próxima. Para leer un sensor de ADC, y dado que el paquete está en un ADC externo, con licencia, repositorio, vamos a crear un controlador para ello aquí en nuestra aplicación que aprovechará el controlador existente en el repositorio externo. Se añade otra capa de direccionamiento indirecto, pero también nos dará un vistazo a la construcción de nuestro propio conductor, por lo que vamos a hacer de esta manera. También es posible que sólo hay que poner la mayor parte en el programa principal, pero ¿dónde está la diversión en eso?

## La construcción de un controlador

Lo primero que debe hacer es crear la estructura de directorios para su conductor:

```
$ mkdir -p libs/my_drivers/myadc/include/myadc
$ mkdir -p libs/my_drivers/myadc/src
```

Ahora puede agregar los archivos que necesita. Usted necesitará un pkg.yml para describir el conductor, y luego talón de cabecera seguida de talón de origen. Esto es lo que el archivo pkg.yml debe ser similar a cuando haya terminado con él:

```
$ cat libs/my_drivers/myadc/pkg.ym
pkg.name: libs/my_drivers/myadc
pkg.deps:
- "@apache-mynewt-core/hw/hal"
- "@mynewt-nordic/hw/drivers/adc/adc_nrf52"
```

Una vez más, estamos en función del controlador ADC de los países nórdicos, por lo que tenemos que explicar esas dependencias.

Ahora vamos a crear el archivo de cabecera requerido `myadc.h` incluye en el directorio. Es un archivo de cabecera bastante sencillo, ya que sólo tenemos que hacer 2 cosas:

- Inicializar el dispositivo ADC
- Leer los valores de ADC

```cpp
#ifndef _NRF52_ADC_H_
#define _NRF52_ADC_H_
void adc_init(void);
int adc_read(void *buffer, int buffer_len);
#endif
```

A continuación hay un archivo de origen correspondiente `myadc.c` en el directorio src. Aquí es donde
vamos a implementar las características específicas del conductor.

En primer lugar, los requeridos ** ** # include s:

```cpp
#include <assert.h>
#include <os/os.h>
#include "myadc/myadc.h"
#include "nrf.h"
#include "app_util_platform.h"
#include "app_error.h"
#include <adc/adc.h>
#include <adc_nrf52/adc_nrf52.h>
#include "nrf_drv_saadc.h"
#define ADC_NUMBER_SAMPLES (2)
#define ADC_NUMBER_CHANNELS (1)
```

Y un par de variables que vamos a necesitar.

```cpp
nrf_drv_saadc_config_t adc_config = NRF_DRV_SAADC_DEFAULT_CONFIG;
struct adc_dev *adc;
uint8_t *sample_buffer1;
uint8_t *sample_buffer2;
```

Y el dispositivo ADC real:

```cpp
static struct adc_dev os_bsp_adc0;
static nrf_drv_saadc_config_t os_bsp_adc0_config = {
  .resolution = MYNEWT_VAL(ADC_0_RESOLUTION),
  .oversample = MYNEWT_VAL(ADC_0_OVERSAMPLE),
  .interrupt_priority = MYNEWT_VAL(ADC_0_INTERRUPT_PRIORITY),
};
```

Si quiere hurgar en los archivos del controlador de los países nórdicos y suministrado, puede averiguar lo que todos estos son, y lo que significan, pero son básicamente la configuración predeterminada para el ADC, así que vamos con ellos. Se dará cuenta de que estos valores se establecen a través de una macro `MYNEWT_VAL`. Esta macro se define en la herramienta de tritón y lee los detalles de configuración de la aplicación desde otro archivo YAML, por lo que vamos a definir ellos poco en un archivo `syscfg.yml` que pasar al compilador en tiempo de compilación.

Ahora, para inicializar realidad el conductor:

```cpp
void adc_init(void) {
  int rc = 0;
  rc = os_dev_create((struct os_dev *) &os_bsp_adc0, "adc0",
  OS_DEV_INIT_KERNEL, OS_DEV_INIT_PRIO_DEFAULT,
  nrf52_adc_dev_init, &os_bsp_adc0_config);
  assert(rc == 0);
  nrf_saadc_channel_config_t cc = NRF_DRV_SAADC_DEFAULT_CHANNEL_CONFIG_SE(NRF_SAADC_INPUT_AIN1);
  cc.gain = NRF_SAADC_GAIN1_6;
  cc.reference = NRF_SAADC_REFERENCE_INTERNAL;
  adc = (struct adc_dev *) os_dev_open("adc0", 0, &adc_config);
  assert(adc != NULL);
  adc_chan_config(adc, 0, &cc);
  sample_buffer1 = malloc(adc_buf_size(adc, ADC_NUMBER_CHANNELS, ADC_NUMBER_SAMPLES));
  sample_buffer2 = malloc(adc_buf_size(adc, ADC_NUMBER_CHANNELS, ADC_NUMBER_SAMPLES));
  memset(sample_buffer1, 0, adc_buf_size(adc, ADC_NUMBER_CHANNELS, ADC_NUMBER_SAMPLES));
  memset(sample_buffer2, 0, adc_buf_size(adc, ADC_NUMBER_CHANNELS, ADC_NUMBER_SAMPLES));
  adc_buf_set(adc, sample_buffer1, sample_buffer2,
  adc_buf_size(adc, ADC_NUMBER_CHANNELS, ADC_NUMBER_SAMPLES));
  return adc;
}
```

Algunas cosas tienen que decir acerca de esta parte, ya que es el más confuso. En primer lugar, estamos usando un defecto ** ** configuración para el canal ADC a través de la macro `NRF_DRV_SAADC_DEFAULT_CHANNEL_CONFIG_SE`. La cosa importante aquí es que en realidad estamos usando `AIN1`. Sé lo que estás pensando, "pero queremos ADC-0!" y eso es cierto. El tablero está hecho etiquetada 'A0, A1, A2', etc., y los números reales pin también se enumeran en la tabla, que parece práctico. En primer lugar. Pero se complica muy rápidamente.

Si intenta usar `AIN0`, y luego ir a hurgar en los registros, mientras que este está en marcha,

```
(gdb) p/x {NRF_SAADC_Type}0x40007000
...
CH = {{
PSELP = 0x1,
PSELN = 0x0,
CONFIG = 0x20000,
LIMIT = 0x7fff8000
}, 
```

Verá que el pasador para el canal 0 se establece en 1, lo que corresponde a `AIN0`, pero eso es ** ** NO lo mismo que` A0` - pin `P0.03`, el que está utilizando . Para ello, se utiliza `AIN1`, que fijaría el valor pin a 2. sucia. Alguien, en algún lugar, pensó este sentido. No quiero conocer a esa persona.

La única otra cosa a tener en cuenta es que estamos usando la tensión de referencia interna, en lugar de establecer nuestra propia. No hay nada malo en ello, pero ya que estamos, vamos a tener que poner encima de la ganancia un poco por el uso de `NRF_SAADC_GAIN1_6`. Llegué a esta conclusión a través de ensayo y error. Siéntase libre para llevar a cabo sus propias pruebas en él.

Ahora bien, ¿cómo podemos ** ** leer valores? Bueno, vamos a utilizar adc_read * () * para eso.

```cpp
  int adc_read(void *buffer, int buffer_len) {
  int i;
  int adc_result;
  int my_result_mv = 0;
  int rc;
  for (i = 0; i < ADC_NUMBER_SAMPLES; i++) {
    rc = adc_buf_read(adc, buffer, buffer_len, i, &adc_result);
    if (rc != 0) {
      goto err;
    }
    my_result_mv = adc_result_mv(adc, 0, adc_result);
  }
  adc_buf_release(adc, buffer, buffer_len);
  return my_result_mv;
  err:
  return (rc);
}
```

Éste es bastante sencillo. Simplemente tomamos una serie de muestras de la ADC, convertir el resultado en una lectura en milivoltios, y devolver el resultado.

Como he mencionado anteriormente, algunos de los valores se derivan de la configuración descubiertos en tiempo de compilación, por lo que vamos a necesitar algunos ajustes para nuestro conductor. En el directorio `myadc`
tendrá que añadir un archivo `syscfg.yml`:

```yml
# Package: libs/my_driver/myadc
syscfg.defs:
ADC_0:
description: 'TBD'
value: 1
ADC_0_RESOLUTION:
description: 'TBD'
value: 'SAADC_CONFIG_RESOLUTION'
ADC_0_OVERSAMPLE:
description: 'TBD'
value: 'SAADC_CONFIG_OVERSAMPLE'
ADC_0_INTERRUPT_PRIORITY:
description: 'TBD'
value: 'SAADC_CONFIG_IRQ_PRIORITY'
```

Una vez que todo esté hecho, usted debe tener un controlador de ADC de trabajo para su tablero NRF52DK. Pero, ¿qué vas a hacer para obtener los datos a través de Bluetooth? Bueno, vamos a llegar! En primer lugar, tenemos que crear una tarea en la aplicación principal para ir a buscar las lecturas de los sensores, y luego nos preocuparemos de enviarlos.

## Publicar todo a través de Bluetooth

Ahora que el conductor se hace, tendremos que añadir las llamadas al archivo `main.c` de la aplicación principal, así como algunas otras cosas. En primer lugar, tendremos que actualizar la incluye, y añadir una tarea para nuestro muestreo del ADC.

```cpp
#include "myadc/myadc.h"
...
#define ADC_TASK_PRIO 5
#define ADC_STACK_SIZE (OS_STACK_ALIGN(336))
struct os_eventq adc_evq;
struct os_task adc_task;
bssnz_t os_stack_t adc_stack[ADC_STACK_SIZE];
```
A continuación hay que inicializar la tarea `event_q` por lo añadiremos a la siguiente` main () `:

```cpp
rc = ble_svc_gap_device_name_set("nimble-adc");
assert(rc == 0);
conf_load();
os_eventq_init(&adc_evq);
// All sensor operations are performed in this task.
os_task_init(&adc_task, "sensor", adc_task_handler,
NULL, ADC_TASK_PRIO, OS_WAIT_FOREVER,
adc_stack, ADC_STACK_SIZE);
```

Vamos a necesitar que `adc_task_handler)` función (de existir, y es ahí donde vamos a inicializar el dispositivo ADC - ya que ahora tenemos un conductor que puede hacer eso - y establecer el controlador de eventos. En lazo de la tarea, mientras que (), sólo tendremos que hacer una llamada a `adc_sample ()` para hacer que el controlador ADC para muestrear el dispositivo ADC.

```cpp
// Event loop for the sensor task.

static void adc_task_handler(void *unused) {
  struct adc_dev *adc;
  int rc;
  adc = adc_init();
  rc = adc_event_handler_set(adc, adc_read_event, (void *) NULL);
  assert(rc == 0);
  while (1) {
    adc_sample(adc);
    os_time_delay(OS_TICKS_PER_SEC * 2);
  }
}
```

Por último, tendremos que manejar los `adc_read_event ()` llamadas, ya que es nuestro gestor de eventos:

```cpp
int adc_read_event(struct adc_dev *dev, void *arg, uint8_t etype, void *buffer, int buffer_len) {
  int value;
  uint16_t chr_val_handle;
  int rc;
  value = adc_read(buffer, buffer_len);
  if (value >= 0) {
    console_printf("Got %dn", value);
  } else {
    console_printf("Error while reading: %dn", value);
    goto err;
  }
  gatt_adc_val = value;
  rc = ble_gatts_find_chr(&gatt_svr_svc_adc_uuid.u, BLE_UUID16_DECLARE(ADC_SNS_VAL), NULL, &chr_val_handle);
  assert(rc == 0);
  ble_gatts_chr_updated(chr_val_handle);
  return (0);
  err:
  return (rc);
}
```

Aquí es donde leemos realmente el valor ADC y luego actualizar la característica BLE para ese valor.

Pero espera, no hemos definido los servicios de BLE y características todavía! Derecha, así que no trate de construir y ejecutar esta aplicación por el momento o seguramente fracasará. Lo sé, eres impaciente y quiero ver si sus obras conductor, etc. y me han hecho esto de tal manera que aún no puedes! Perdón.

Vamos a seguir adelante con la construcción de esos servicios y características BLE entonces! Afortunadamente, es muy fácil puesto que ya tenemos una aplicación que hace cerca de 90% del trabajo para nosotros! Sólo tenemos que añadir algunas cosas. Es decir, un servicio de Bluetooth para las lecturas, y luego algunas características de servicio para el suministro de las lecturas.

Al igual que con la aplicación BLE periférica empezamos con, vamos a anunciar un par de valores de nuestra aplicación. El primero no es estrictamente necesario, pero nos ayudará a conectar con una aplicación para iOS / Mac OS más adelante. He definido un servicio y las características de ese servicio en `bleadc.h` de la siguiente manera:

```cpp
static const ble_uuid128_t gatt_svr_svc_adc_uuid =
BLE_UUID128_INIT(0x40, 0xb3, 0x20, 0x90, 0x72, 0xb5, 0x80, 0xaf,
0xa7, 0x4f, 0x15, 0x1c, 0xaf, 0xd2, 0x61, 0xe7);
#define ADC_SNS_TYPE 0xDEAD
#define ADC_SNS_STRING "eTape Liquid Level Sensor"
#define ADC_SNS_VAL 0xBEAD
uint16_t gatt_adc_val;
```

El primero es el UUID del servicio - Tengo esta generando aleatoriamente un UUID - seguido de los 2 características que van a ofrecer. La primera característica va a anunciar el tipo de sensor * * somos publicidad, y que será una característica de sólo lectura. La segunda característica será el sensor de * Valor * sí mismo, y que permitirá a los dispositivos conectados a 'suscribir' a ella con el fin de obtener valores actualizados constantemente. Quería utilizar 0xDEAD y 0xBEEF pero eso no es cómo funcionaban las cosas.

** Nota **: Usted puede elegir cualquier UUID característicos válidos para ir aquí. Estoy usando estos valores porque he construido una herramienta Bluetooth que los utiliza.

El valor que voy a ser la actualización también se define aquí como `gatt_adc_val`.

Si luego nos vamos vistazo a `gatt_srv.c` podemos ver la estructura de la oferta de servicios y características que hemos creado:

```cpp
static const struct ble_gatt_svc_def gatt_svr_svcs[] = {
  {
    .type = BLE_GATT_SVC_TYPE_PRIMARY,
    .uuid = &gatt_svr_svc_sec_test_uuid.u,
    .characteristics = (struct ble_gatt_chr_def[]) {
      {
        Characteristic: Random number generator
        .uuid = &gatt_svr_chr_sec_test_rand_uuid.u,
        .access_cb = gatt_svr_chr_access_sec_test,
        .flags = BLE_GATT_CHR_F_READ | BLE_GATT_CHR_F_READ_ENC,
      }, {
      .uuid = &gatt_svr_chr_sec_test_static_uuid.u,
      .access_cb = gatt_svr_chr_access_sec_test,
      .flags = BLE_GATT_CHR_F_READ | BLE_GATT_CHR_F_WRITE | BLE_GATT_CHR_F_WRITE_ENC,
      }, {
      0,
      } },
      }, {
        .type = BLE_GATT_SVC_TYPE_PRIMARY,
        .uuid = &gatt_svr_svc_adc_uuid.u,
        .characteristics = (struct ble_gatt_chr_def[]) { {
        .uuid = BLE_UUID16_DECLARE(ADC_SNS_TYPE),
        .access_cb = gatt_svr_sns_access,
        .flags = BLE_GATT_CHR_F_READ,
      }, {
        .uuid = BLE_UUID16_DECLARE(ADC_SNS_VAL),
        .access_cb = gatt_svr_sns_access,
        .flags = BLE_GATT_CHR_F_NOTIFY,
      }, {
        0, } },
    }, {
      0,
  },
};
```

Estamos agregando otro servicio, con 2 nuevas características, a la aplicación existente. Vamos a tener que llenar en la función que será llamada por este servicio, `gatt_srv_sns_access` siguiente, así que el servicio sabe qué hacer.

```cpp
static int
gatt_svr_sns_access(uint16_t conn_handle, uint16_t attr_handle, struct ble_gatt_access_ctxt *ctxt, void *arg) {
  uint16_t uuid16;
  int rc;
  uuid16 = ble_uuid_u16(ctxt->chr->uuid);
  switch (uuid16) {
    case ADC_SNS_TYPE:
      assert(ctxt->op == BLE_GATT_ACCESS_OP_READ_CHR);
      rc = os_mbuf_append(ctxt->om, ADC_SNS_STRING, sizeof ADC_SNS_STRING);
      BLEPRPH_LOG(INFO, "ADC SENSOR TYPE READ: %sn", ADC_SNS_STRING);
      return rc == 0 ? 0 : BLE_ATT_ERR_INSUFFICIENT_RES;
    case ADC_SNS_VAL:
      if (ctxt->op == BLE_GATT_ACCESS_OP_WRITE_CHR) {
        rc = gatt_svr_chr_write(ctxt->om, 0,
        sizeof gatt_adc_val,
        &gatt_adc_val,
        &gatt_adc_val_len);
        return rc;
      } else if (ctxt->op == BLE_GATT_ACCESS_OP_READ_CHR) {
        rc = os_mbuf_append(ctxt->om, &gatt_adc_val,
        sizeof gatt_adc_val);
        return rc == 0 ? 0 : BLE_ATT_ERR_INSUFFICIENT_RES;
      }
    default:
    assert(0);
    return BLE_ATT_ERR_UNLIKELY;
  }
}
```

Se puede ver que cuando la petición es para `ADC_SNS_TYPE`, volvemos el tipo de sensor que definimos anteriormente. Si la petición si por `ADC_SNS_VAL` que volveremos el valor` gatt_adc_val`.

Si se construye, carga y ejecuta esta aplicación ahora, verá todos los servicios y características de lo anunciado, y que incluso será capaz de leer el "Tipo de sensor" String a través de la característica ADC_SNS_TYPE. Pero usted ** ** Todavía no obtendrá ninguna lectura. Porque no se ha cableado hasta el sensor todavía!

## Adición del sensor real!

Ok, este es el último bit antes de que todo se junta! Ahora que tenemos un BLE aplicación totalmente funcional que se puede suscribir a partir de los valores del sensor, es el momento para realmente cablear el sensor!

Como se mencionó anteriormente, vamos a utilizar un sensor de nivel de agua Etape. Usted puede conseguir uno de [Adafruit](https://www.adafruit.com/products/1786).

Vamos a utilizar el sensor como un sensor resistivo, y la configuración es muy sencilla. Voy a estar usando un 'breadboard` para poner todo esto junto con fines ilustrativos.

- En primer lugar, coloque un puente hilos de Vdd en el tablero de la placa.
- A continuación, conecte un cable de puente entre P0.03 patas de la placa a la placa. Esta será nuestra ADC-in.
- El sensor debería haber venido con una resistencia de 560 ohm, de modo que el enchufe en la placa entre Vdd y ADC-en agujeros.
- Por último, conecte un puente desde GND en el tablero para su tablero.

En este punto, el tablero debe ser algo como esto:

![Tablero de circuitos](/posts/category/iot-iot-software/images/breadboard.png)

Ahora, coloque una de las medias 2 cables del sensor a tierra en el tablero y el otro conductor central al ADC-in en el tablero. Su tablero ahora debería tener este aspecto:

![Adc Demo 1](/posts/category/iot-iot-software/images/adc-demo-1.png)

Y el sensor Etape debería tener este aspecto (al menos si lo tiene montado en un cilindro graduado como yo).

![Adc Demo 2](/posts/category/iot-iot-software/images/adc-demo-2.png)

Con esto concluye la parte de hardware. ¡Fácil!

¿Adivina qué? ¡Sí! En este punto, usted debe ser capaz de construir, crear imagen y cargar su aplicación y ver que el envío de las lecturas correctamente! Ya era hora sangrienta !!

Enhorabuena, has completado ahora tanto un proyecto de hardware y un proyecto de software mediante la conexión de un sensor en el dispositivo y utilizando Mynewt para leer los datos de ese sensor y enviarlo a través de Bluetooth a un dispositivo conectado. Eso no es poca cosa!

## Al ver sus resultados

Si usted se está preguntando cómo ver realmente estas lecturas de los sensores a través de Bluetooth, usted tiene un par de opciones. En Mac OS o iOS se puede descargar el [LightBlue aplicación](https://itunes.apple.com/us/app/lightblue-explorer-bluetooth/id557428110?mt=8)
Esta aplicación le permite conectarse a, e interrogar, dispositivos BLE como el que usted acaba de construir, pero en realidad no es visualmente tan grande.

Si ha utilizado el servicio BLE y UUID característicos utilizados en este tutorial, también se puede descargar y utilizar una [Mac OS MyNewt sensor lector de Aplicación](https://dragonflyiot.com/MyNewtSensorReader.zip) que he construido. (Zip) que le permite representar gráficamente los datos, etc. Una versión de iOS se encuentra en pruebas beta y debería estar disponible pronto.

![MyNewtSensorReader006](/posts/category/iot-iot-software/images/MyNewtSensorReader006.jpg)

Ahora, yo estaba diciendo lo pequeño y rápido este sistema operativo es, y las aplicaciones son. Así que aquí hay un poco de prueba a ir con eso:

Aquí está la versión 'depuración' construida de la aplicación:

```
136 -rwxr-xr-x  1 dsimmons  staff   135188 Feb  8 10:55 nrf52_adc.img
```

Todo es de 135KB. Y aquí está 'optimizado'

```
120 -rwxr-xr-x  1 dsimmons  staff   118788 Feb  9 11:06 nrf52_adc.img
```

Una friolera de 119KB. Junto con el gestor de arranque 9Kb, tenemos todo un sistema operativo y la IO App en 128Kb. Espera, que cabe en un Macintosh original! Eso es bastante agradable!

Ok, espero que hayan disfrutado de este pequeño ejemplo. Lo siguiente que voy a escribir otra aplicación que lo hice es un sensor ambiental Calidad del Aire (CO ~ 2 ~). Está en un Arduino Primo, pero tal vez debería poner a ambos en el mismo tablero ... Hmmmm
