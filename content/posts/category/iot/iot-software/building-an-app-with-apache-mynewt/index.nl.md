---
title: "Bouwen aan een App met Apache MyNewt"
Date: 2017-02-09
Author: davidgs
Category: Gadgetry, IoT
Tags: Apache, IoT, mynewt
Slug: building-an-app-with-apache-mynewt
hero: images/logo.png
---

Ik heb de uitgaven veel tijd in de afgelopen maanden gewerkt aan de [Apache MyNewt IoT OS](http://mynewt.apache.org). Als je niet weet wat dat is, dan moet je echt moet! Het is een vrij nieuw Apache Project, nog steeds in de 'incubatie' fase, maar ze staan op het punt om hun tweede beta van de 1.0 release (Ik denk dat alle stemmen zijn in het goed te keuren) vrij te geven. Ja, er zijn een aantal dingen nog steeds vermist, en wat ruwe kantjes, maar het samenkomen mooi en als je op zoek bent naar een Open Source IoT OS voor uw apparaat, MyNewt misschien net wat u zoekt. Het is zeer klein (de bootloader Ik bouwde is al 9 KB!), Snelle en zeer flexibel. Ik heb een paar apps geschreven voor het - een UART gebaseerde milieu-sensor app en een analoge sensor app - die ik afzonderlijk zal schrijven hier. Voor vandaag, zal ik beginnen met de analoge sensor met behulp van de Analog-to-Digital (ADC) Converter. Dus laten we beginnen!

Ik baseerde deze demo op de Nordic Semi [NRF52DK](https://www.nordicsemi.com/eng/Products/Bluetooth-low-energy/nRF52-DK) Developer Board dat is een Cortex M4f-gebaseerde Bluetooth SoC ontwikkeling boord. Het heeft een veel gaande is, en de Scandinavische NRF52 chip is een uiterst gemeenschappelijke ivd chip, dus het is ideaal voor de ontwikkeling (in feite de volgende App schreef ik voor een Arduino Primo boord, die ook gebruik maakt van de NRF52 SoC). Voor mijn Analoge sensor Ik koos voor een etape Liquid Level Sensor die ik opgepikt van [Adafruit](https://www.adafruit.com/products/1786). Waarom heb ik kiezen voor deze sensor? Vooral omdat ik het kocht een tijdje geleden voor een aantal grote reden dat ik niet kan herinneren, dus het zat op mijn bureau! Het is een eenvoudige resistieve-voltage analoge sensor, en ik had het al, dus het was ideaal. Ik kocht ook een 1000 ml maatcilinder op eBay om het in te monteren, gewoon om dingen makkelijk te maken. Nu dat alles wat de achtergrond is uit de weg, laten we beginnen bij de bouw van de applicatie zelf!

Laten we beginnen bij het begin ... Het is meestal een goed startpunt. Ik ben niet van plan om te gaan door de hele opzet van de MyNewt ontwikkelomgeving, maar er is een uitstekende tutorial over het krijgen van het opzetten van [hier](http://mynewt.apache.org/latest/os/get_started/get_started/). Ik doe mijn ontwikkeling op Mac OS Sierra, en ik **niet** aanraden de route Docker, maar anders dan dat, krijg je setup en lopen met MyNewt en kom dan terug.

** Opmerking: ** Deze tutorial zal uiteindelijk een deel van de docs / tutorials in de officiële MyNewt release.

Iedereen terug? Alle set-up en klaar? Uitstekend!

## Aan de slag

Ten eerste, zult u natuurlijk willen een project voor deze te maken:

```
$ mkdir ~/dev
$ cd ~/dev
$ newt new myadc
Downloading project skeleton from apache/incubator-mynewt-blinky...
Installing skeleton in myadc...
Project myadc successfully created.
$ cd myadc
```

Gemakkelijk! Nordic niet de ADC drivers en dergelijke vrij te geven voor de NRF52 als open-source, althans niet onder een Apache-vriendelijke licentie, zodat ze naar een externe repository om zijn verplaatst om niet in conflict zijn gekomen van de licentie en auteursrechtelijke kwesties. Een ding dat MyNewt doet is houden veel informatie in YAML bestanden. En voor elk project die u maakt, newt maakt een map in de targets directory om een aantal van deze configuratiebestanden te houden. Het houdt ook in uw belangrijkste ontwikkeling map die de newt gereedschap wat repositories op te nemen, enz. Dus hier zegt is de mijne:

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

Je hoeft niet al die repositories nodig! De enige twee die u nodig heeft voor deze oefening zijn de `apache-mynewt-core` en de` mynewt.nordic` repositories. Voor het volgende voorbeeld zal ik opschrijven vind je de mynewt_arduino_primo repository ook nodig hebben.

Nu u de benodigde repositories hebt gedefinieerd, is het tijd om alles te installeren, zodat u kunt aan de slag.

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

Uw versie-strings zal waarschijnlijk anders zijn, maar je moet vergelijkbare output.

Voor de app zelf gaan we het een van de meegeleverde apps voor een Bluetooth voor randapparatuur, zodat we krijgen de Bluetooth-communicatie ingebouwd uit te breiden, dus het eerste wat we moeten doen is tegen kopiëren die app in onze eigen app directory :

```
$ mkdir -p apps/nrf52_adc
$ cp -Rp repos/apache-mynewt-core/apps/bleprph/* apps/nrf52_adc
```

Vervolgens vindt u de `pkg.yml` bestand voor uw app te wijzigen. Als je klaar bent, moet het er als volgt uit:

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

"Maar wacht, de mijne is maar dan anders door de '@ apache-mynewt-core' deel, waarom moet ik toevoegen dat?" je vraagt? Omdat bij de toepassing leefden*in* de mynewt-onderbrenging, kan het een relatief pad. Nu we het hebt verwijderd, moet een expliciet pad, met inbegrip van de repository. (Je ziet dit nog duidelijker in een minuut gemaakt.) Dus nu hebben we een app, in zijn eigen pakket, genaamd nr52_adc en het hangt af van een aantal pakketten binnen mynewt-core.

Maak twee doelen - één voor de bootloader en één voor de nrf52 board.

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

Dus hebben we een doel hebben gemaakt voor onze app, en vertelde Newt waar die app te vinden. We hebben newt wat Board Support Package (BSP) te gebruiken voor de app te horen, en we gaan om dit op te bouwen voor het debuggen. Later kunnen we dit veranderen in 'geoptimaliseerd', zoals de bootloader om het kleiner te maken.

Nu, als je een mynewt bootloader op je bord nog niet hebt geïnstalleerd, moet u dat eerst te doen. Dus build laten we zowel de doelstellingen, en installeren.

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

Dus je hebt opgebouwd en geladen de bootloader, en de app. Als je kijkt in de map bin (waaaay naar beneden daar) zul je de afbeeldingen te vinden voor die twee, en de bootloader is verdomd klein.

```
$ ls -l bin/targets/nrf_boot/app/apps/boot/
12 -rwxr-xr-x 1 dsimmons staff 8956 Feb 7 15:59 boot.elf.bin
```

Dus over 9kb voor de bootloader. Ik zei toch dat het was klein! U kunt hetzelfde doen voor de app als je nieuwsgierig bent.

Nu heb je een BLE app, maar echt alles wat je hebt gedaan, is de naam van de ingebouwde bleprph app nrf52_adc en belasting die. Niet zo indrukwekkend, en het zal zeker niet het lezen van een analoge sensor op dit moment. Als u [LightBlue] (https://itunes.apple.com/us/app/lightblue-explorer-bluetooth/id557428110?mt=8) voor iOS of Mac OS u kunt openen dat en je ziet je 'lenig 'BLE apparaat opdagen. Maar we zijn hier om daadwerkelijk een BLE App dat de werkelijke metingen stuurt van een sensor, dus laten we dat doen volgende. Om een ADC sensor lezen, en aangezien de ADC-pakket is in een extern, in licentie, repository, zullen we een bestuurder voor het hier in onze app dat de bestaande driver zal een hefboomeffect in de externe repository. Het voegt een andere laag van indirectheid, maar het geeft ons ook een blik op het opbouwen van onze eigen chauffeur, dus we het op deze manier zal doen. Het is ook mogelijk om gewoon de meeste van deze in het hoofdprogramma, maar waar is het plezier in dat?

## Het bouwen van een Driver

Het eerste wat je moet doen is om de mapstructuur voor uw chauffeur te maken:

```
$ mkdir -p libs/my_drivers/myadc/include/myadc
$ mkdir -p libs/my_drivers/myadc/src
```

Nu kun je de bestanden die je nodig hebt toe te voegen. Je hebt een pkg.yml nodig om de bestuurder te beschrijven, en vervolgens header stomp gevolgd door bron stomp. Hier is wat de pkg.yml bestand zou moeten uitzien als je klaar bent met het:

```
$ cat libs/my_drivers/myadc/pkg.ym
pkg.name: libs/my_drivers/myadc
pkg.deps:
- "@apache-mynewt-core/hw/hal"
- "@mynewt-nordic/hw/drivers/adc/adc_nrf52"
```

Nogmaals, we zijn afhankelijk van de ADC bestuurder van Nordic, dus we moeten beschrijven die afhankelijkheden.

Laten we nu maken de vereiste header bestand `myadc.h` in de includes directory. Het is een vrij eenvoudig header-bestand, omdat we alleen nodig om 2 dingen doen:

- Initialiseer de ADC voorziening
- Lees ADC Waarden

```cpp
#ifndef _NRF52_ADC_H_
#define _NRF52_ADC_H_
void adc_init(void);
int adc_read(void *buffer, int buffer_len);
#endif
```

Vervolgens hebben we een overeenkomstige bronbestand `myadc.c` in de src directory nodig hebt. Dit is waar
wij doen de specifieke kenmerken van de bestuurder uit te voeren.

Ten eerste, de vereiste ** # include ** s:

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

En een paar variabelen die we nodig hebben.

```cpp
nrf_drv_saadc_config_t adc_config = NRF_DRV_SAADC_DEFAULT_CONFIG;
struct adc_dev *adc;
uint8_t *sample_buffer1;
uint8_t *sample_buffer2;
```

En de werkelijke ADC Device:

```cpp
static struct adc_dev os_bsp_adc0;
static nrf_drv_saadc_config_t os_bsp_adc0_config = {
  .resolution = MYNEWT_VAL(ADC_0_RESOLUTION),
  .oversample = MYNEWT_VAL(ADC_0_OVERSAMPLE),
  .interrupt_priority = MYNEWT_VAL(ADC_0_INTERRUPT_PRIORITY),
};
```

Als u wilt rondneuzen in de Nordic-meegeleverde driver-bestanden, kunt u uitzoeken wat al deze zijn, en wat ze betekenen, maar ze zijn in principe de standaardinstellingen voor de ADC, dus we gaan met hen. U zult merken dat deze waarden zijn ingesteld via een `MYNEWT_VAL` macro. Deze macro wordt gedefinieerd in de newt gereedschap en het leest configuratiegegevens voor de app uit een ander YAML bestand, zodat we ze binnenkort in een `syscfg.yml` bestand zal definiëren die moeten worden doorgegeven aan de compiler bij het bouwen.

Nu, om daadwerkelijk initialiseren van de bestuurder:

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

Een paar dingen moeten worden gezegd over dit deel, want het is de meest verwarrend. Ten eerste, we gebruiken een **standaard** configuratie voor de ADC Channel via de `NRF_DRV_SAADC_DEFAULT_CHANNEL_CONFIG_SE` macro. Het belangrijkste bit hier is dat we eigenlijk gebruik maakt van `AIN1`. Ik weet wat je denkt, "Maar we willen ADC-0!" en dat is waar. Het bord is in feite het label 'A0, A1, A2' enz., En de feitelijke pin nummers staan ook vermeld op het bord, wat handig lijkt. Aanvankelijk. Maar het wordt rommelig zeer snel.

Als u probeert te gebruiken `AIN0`, en dan gaan rondneuzen in de registers, terwijl deze wordt uitgevoerd,

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

U zult zien dat de pen voor kanaal 0 is ingesteld op 1, wat overeenkomt met `AIN0`, maar dat is **NIET** hetzelfde als` A0` - pin `P0.03`, degene die we gebruiken . Voor dat, you `AIN1`, waarin de pen waarde zou ingesteld op 2. Messy gebruiken. Iemand, ergens, dacht dat dit was logisch. Ik wil niet naar die persoon te ontmoeten.

Het enige andere ding om te noteren is dat we met behulp van de interne referentie spanning, in plaats van de vaststelling van onze eigen. Er is niets mis mee, maar omdat we zijn, zullen we moeten pogen de winst een beetje met behulp van `NRF_SAADC_GAIN1_6`. Ik kwam tot deze conclusie via trial and error. Voel je vrij om je eigen proeven op.

Nu, hoe doen we eigenlijk **lezen** waarden? Nou, we zullen * adc_read (gebruik) * voor.

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

Deze is vrij rechttoe rechtaan. We nemen gewoon een aantal monsters uit de ADC, zet het resultaat om een meting in millivolt, en terug te keren het resultaat.

Zoals ik al eerder zei, een deel van de waarden zijn afgeleid van instellingen ontdekt tijdens het compileren, zodat we een aantal instellingen voor onze chauffeur nodig hebt. In de `myadc` directory
je nodig hebt om een `syscfg.yml` bestand toe te voegen:

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

Zodra dat is alles gedaan, moet u een werkende ADC Driver voor uw NRF52DK boord. Maar wat gaat u doen om de gegevens eruit te komen via Bluetooth? Nou, we komen er wel! In de eerste plaats moeten we een taak in de belangrijkste app te gaan halen die sensor lezingen, dan zullen we ons zorgen over hen te versturen.

## het allemaal publiceren via Bluetooth

Nu dat de bestuurder klaar is, moeten we om te bellen als een paar andere dingen toe te voegen aan de belangrijkste app `main.c` bestand, als goed. Ten eerste, zullen we nodig hebben om het actualiseren van de omvat, en voeg een taak voor onze ADC bemonstering.

```cpp
#include "myadc/myadc.h"
...
#define ADC_TASK_PRIO 5
#define ADC_STACK_SIZE (OS_STACK_ALIGN(336))
struct os_eventq adc_evq;
struct os_task adc_task;
bssnz_t os_stack_t adc_stack[ADC_STACK_SIZE];
```
Vervolgens zullen we nodig hebben om de taak `event_q` initialiseren zodat we de volgende op` main () `zal toe te voegen:

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

We zullen dat `adc_task_handler ()` functie moeten bestaan, en dat is waar we de ADC Device zal initialiseren - omdat we nu een driver die kan dat doen - en zet de event handler. In de taak while () loop, zullen we alleen maar een oproep om `adc_sample () maken` om de ADC bestuurder de ADC apparaat proeven veroorzaken.

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

Tot slot moeten we met die `adc_read_event hanteren ()` gesprekken, want het is onze event handler:

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

Dit is waar we eigenlijk lees de ADC waarde en werk vervolgens de BLE Kenmerkend voor die waarde.

Maar wacht, we hebben niet de BLE diensten en kenmerken nog gedefinieerd! Juist, dus probeer het niet te bouwen en deze app draaien gewoon nog niet of het zal zeker mislukken. Ik weet het, je bent ongeduldig en wil zien of uw chauffeur werken, enz. En ik heb dit op een zodanige manier dat je nog cant klaar! Sorry.

Laten we aan de aanleg van die BLE diensten en kenmerken dan! Gelukkig, het is heel makkelijk, omdat we al een app die doet ongeveer 90% van het werk voor ons! We moeten gewoon een paar dingen toe te voegen. Namelijk een Bluetooth-service voor de lezingen, en vervolgens een aantal service Kenmerken die de lezingen te leveren.

Net als bij de BLE Peripheral app waarmee we begonnen zijn, zullen we een aantal waarden adverteren van onze app. De eerste is niet strikt noodzakelijk, maar het zal ons helpen om verbinding te maken met een iOS / Mac OS app later. Ik bepaald een dienst en de kenmerken van die dienst in `bleadc.h` als volgt:

```cpp
static const ble_uuid128_t gatt_svr_svc_adc_uuid =
BLE_UUID128_INIT(0x40, 0xb3, 0x20, 0x90, 0x72, 0xb5, 0x80, 0xaf,
0xa7, 0x4f, 0x15, 0x1c, 0xaf, 0xd2, 0x61, 0xe7);
#define ADC_SNS_TYPE 0xDEAD
#define ADC_SNS_STRING "eTape Liquid Level Sensor"
#define ADC_SNS_VAL 0xBEAD
uint16_t gatt_adc_val;
```

De eerste is de UUID van de dienst - Ik heb dit door willekeurig genereren van een UUID - gevolgd door de 2 eigenschappen die we gaan bieden. Het eerste kenmerk is van plan om reclame voor de*type* sensor we zijn reclame, en het zal een read-only-karakteristiek zijn. Het tweede kenmerk is de sensor*waarde* zelf, en we zullen aangesloten apparaten te 'abonneren' toe te staan om voortdurend bijgewerkte waarden te krijgen. Ik wilde 0xDEAD en 0xBEEF gebruiken, maar dat is niet hoe de dingen uitgewerkt.

** Opmerking **: U kunt elke geldige Kenmerkend UUIDs hier te gaan kiezen. Ik gebruik deze waarden omdat ik een Bluetooth-instrument dat ze gebruikt gebouwd.

De waarde die ik actualisering zal zijn is ook hier gedefinieerd als `gatt_adc_val`.

Als we dan gaan kijken naar `gatt_srv.c` kunnen we de structuur van de service en karakteristieke aanbod dat we opgezet zien:

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

We zijn net toevoegen van een andere dienst, met 2 nieuwe eigenschappen, aan de bestaande applicatie. We zullen verder moeten, zodat de dienst weet wat te doen in de functie die wordt opgeroepen worden voor deze dienst in te vullen, `gatt_srv_sns_access`.

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

Je kunt zien dat wanneer verzoek betrekking heeft op de 'ADC_SNS_TYPE`, we de terugkeer van de Sensor Type we eerder gedefinieerd. Indien het verzoek als voor `ADC_SNS_VAL` wij doen de` gatt_adc_val` waarde terug te keren.

Als je bouwen, belasting en uitvoeren van deze applicatie nu, zal je al die Diensten en karakteristieken zien geadverteerd, en u zult zelfs in staat zijn om de "Sensor Type" String uitgelezen via de ADC_SNS_TYPE Kenmerkend. Maar je **nog** ontvangt geen lezingen te krijgen. Omdat je nog niet bedraad de sensor!

## Het toevoegen van de Actual Sensor!

Ok, dit is het laatste stuk voor alles samen komt! Nu dat we een volledig functionerende BLE App die we kunnen zich abonneren op de sensor waarden uit, is het tijd om daadwerkelijk de draad van de sensor!

Zoals eerder vermeld, we gaan worden met behulp van een etape Water Level Sensor. U kunt één van krijgen [Adafruit](https://www.adafruit.com/products/1786).

We gaan naar de sensor te gebruiken als een resistieve sensor, en de installatie is zeer eenvoudig. Ik zal met behulp van een 'breadboard` om dit allemaal samen voor illustratieve doeleinden te zetten.

- Sluit eerst een jumper-draad van Vdd op het bord om de breadboard.
- Maak vervolgens een hulpdraad van pin P0.03 aan het bord om het breadboard. Dit zal onze ADC-in zijn.
- De sensor moet komen met een 560 ohm weerstand, zodat stekker die in de plaat tussen Vdd en ADC in gaten.
- Tot slot, voeg een jumper van GND op het bord om uw breadboard.

Op dit moment moet je broodplank er ongeveer zo uitzien:

![broodplank](/posts/category/iot-iot-software/images/breadboard.png)

U met een van de middelste 2 draden van de sensor grond op de breadboard en andere middelste leiding naar de ADC in de breadboard. Uw broodplank ziet er nu als volgt uit:

![Adc demo 1](/posts/category/iot-iot-software/images/adc-demo-1.png)

En uw etape Sensor moet er zo uitzien (tenminste als je het hebt gemonteerd in een maatcilinder als ik).

![Adc demo 2](/posts/category/iot-iot-software/images/adc-demo-2.png)

Dat concludeert de hardware gedeelte. Gemakkelijk!

Raad eens? Yep! Op dit moment moet je in staat zijn om te bouwen, te creëren-imago en uw toepassing laden en zien het goed verzenden lezingen! Over bloedige time !!

Gefeliciteerd, je hebt nu klaar met zowel een hardware-project en een software project door het aansluiten van een sensor van het apparaat of het gebruik van Mynewt om gegevens te lezen van die sensor en stuur het via Bluetooth naar een aangesloten apparaat. Dat is geen geringe prestatie!

## zien van uw resultaten

Als je je afvraagt hoe je deze sensorwaarden via Bluetooth eigenlijk wil bekijken, moet een paar opties. Op Mac OS of iOS kunt u de [LightBlue app] downloaden (https://itunes.apple.com/us/app/lightblue-explorer-bluetooth/id557428110?mt=8)
Deze app kunt u verbinding maken en ondervragen, BLE apparaten zoals degene die je net gebouwd, maar het is niet echt visueel zo geweldig.

Als u gebruik gemaakt van de BLE Service en Kenmerk UUIDs gebruikt in deze tutorial, kunt u ook downloaden en gebruiken een [Mac OS MyNewt Sensor Reader App](https://dragonflyiot.com/MyNewtSensorReader.zip) die ik heb gebouwd. (Zip Archive) waarmee u uw gegevens, etc. Een iOS-versie is in beta testen en moet binnenkort beschikbaar zijn grafiek.

![MyNewtSensorReader006](/posts/category/iot-iot-software/images/MyNewtSensorReader006.jpg)

Nu, zei ik hoe klein en snel dit OS is, en de apps zijn. Dus hier is een weinig bewijs om te gaan met het volgende:

Hier is het 'debug' gebouwde versie van de app:

```
136 -rwxr-xr-x  1 dsimmons  staff   135188 Feb  8 10:55 nrf52_adc.img
```

Het is allemaal van 135Kb. En hier wordt 'geoptimaliseerd'

```
120 -rwxr-xr-x  1 dsimmons  staff   118788 Feb  9 11:06 nrf52_adc.img
```

Maar liefst 119Kb. Samen met de 9kb bootloader, hebben we een hele ivd OS en App in 128Kb gekregen. Wacht, dat past op het Originele Macintosh! Dat is best leuk!

Ok, ik hoop dat je genoten van deze kleine voorbeeld. Next up Ik schrijf een andere app die ik deed dat is een milieu Luchtkwaliteit (CO ~ 2 ~) sensor. Het is op een Arduino Primo, maar misschien moet ik ze allebei gezet op hetzelfde bord ... Hmmmm
