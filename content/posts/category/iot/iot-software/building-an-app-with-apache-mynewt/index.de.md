---
title: „Der Aufbau einer App mit Apache MyNewt“
Date: 2017-02-09
Author: davidgs
Category: Gadgetry, IoT
Tags: Apache, IoT, mynewt
Slug: building-an-app-with-apache-mynewt
hero: images/logo.png
reading_time: 20 minutes
---

Ich habe viel Zeit in den letzten paar Monaten verbracht Arbeit am [Apache MyNewt IoT OS](http://mynewt.apache.org). Wenn Sie nicht wissen, was das ist, dann sollten Sie wirklich! Es ist ein ziemlich neues Apache-Projekt, noch in der ‚Inkubation‘ Phase, aber sie sind über ihre zweite Beta der Version 1.0 veröffentlichen (Ich denke, alle die Stimmen sind in den Bericht zu genehmigen). Ja, es gibt einige Dinge noch fehlen, und einige Ecken und Kanten, aber es kommt gut zusammen, und wenn Sie sich für ein Open Source IoT OS für Ihr Gerät suchen, MyNewt kann genau das, was Sie suchen. Es ist extrem klein (der Bootloader I ist es, alle 9Kb gebaut!), Schnell und sehr flexibel. Ich habe ein paar Apps für sie geschrieben - ein UART basierende Umgebungssensor App und einen Analog-Sensor app -, dass ich hier separat aufzuschreiben werden. Für heute, werde ich mit dem Analog-Sensor mit den Analog-zu-Digital (ADC) Converter starten. Also lasst uns anfangen!

Ich basierte diese Demo auf dem Nordic Semi [NRF52DK](https://www.nordicsemi.com/eng/Products/Bluetooth-low-energy/nRF52-DK) Developer Board, das ein Cortex M4F basierte Entwicklung Bluetooth SoC Bord ist. Es ist für sie eine Menge los bekommt, und die Nordic NRF52 Chip ist ein extrem häufiger IoT-Chip, so ist es ideal für die Entwicklung (in der Tat der nächste App I ist für einen Arduino Primo Board schrieb, die auch die NRF52 SoC verwendet). Für meinen Analogsensor Ich wählte Sensor eines étape Füllstands, dass ich von) Developer Board, das ein Cortex M4F basierte Entwicklung Bluetooth SoC Bord ist. Es ist für sie eine Menge los bekommt, und die Nordic NRF52 Chip ist ein extrem häufiger IoT-Chip, so ist es ideal für die Entwicklung (in der Tat der nächste App I ist für einen Arduino Primo Board schrieb, die auch die NRF52 SoC verwendet). Für meinen Analogsensor Ich wählte Sensor eines étape Füllstands, dass ich von [Adafruit](https://www.adafruit.com/products/1786) abgeholt. Warum habe ich diesen Sensor? Vor allem, weil ich es für einigen großen Grund vor einer Weile gekauft, dass ich mich nicht erinnern kann, so dass es auf meinem Schreibtisch saß! Es ist ein einfacher Widerstandsspannungsanalogsensor, und ich habe es bereits hatte, so ist es ideal war. Ich kaufte auch ein 1000-ml-Zylinder auf eBay absolvierte sie montieren in, um nur einfache Dinge zu machen. Nun, da alles, was Hintergrund ist aus dem Weg, lassen Sie uns beginnen auf den Aufbau der Anwendung selbst!

Beginnen wir am Anfang ... Es ist in der Regel ein guter Startpunkt. Ich werde gehen nicht durch den gesamten Aufbau der MyNewt Entwicklungsumgebung, aber es gibt eine hervorragende Anleitung auf dem Erhalten einrichten [hier](http://mynewt.apache.org/latest/os/get_started/get_started/). Ich mache meine Entwicklung auf Mac OS Sierra, und ich ** do ** nicht empfehlen, die Docker Weg zu gehen, aber anders als das, holen Sie sich Setup und läuft mit MyNewt und kommen dann zurück.

** Hinweis: ** Dieses Tutorial wird schließlich ein Teil der docs / Tutorials in der offiziellen MyNewt Release sein.

Jeder zurück? Alle setzen und bereit? Ausgezeichnet!

## Einstieg

Zunächst werden Sie von möchten natürlich ein Projekt für diese erstellen:

```
$ mkdir ~/dev
$ cd ~/dev
$ newt new myadc
Downloading project skeleton from apache/incubator-mynewt-blinky...
Installing skeleton in myadc...
Project myadc successfully created.
$ cd myadc
```

Einfach! Nordic entließen nicht die ADC-Treiber und so für die NRF52 als Open-Source, zumindest nicht unter einer Apache-Lizenz freundlich, so dass sie zu einem externen Repository, um verschoben wurden, um nicht in Konflikt geraten Lizenz- und Copyright-Probleme zu laufen. Eine Sache, die MyNewt tut, ist keep viele Informationen in YAML-Dateien. Und für jedes Projekt, das Sie erstellen, erstellt Molch ein Verzeichnis im Zielverzeichnis einige dieser Konfigurationsdateien zu halten. Es hält auch in Ihrem Hauptentwicklungs Verzeichnis, das das Molch-Tool, welche Repositories etc. umfassen Mine Also hier erzählt:

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

Sie müssen nicht alle diese Repositories müssen! Die beiden einzigen Sie für diese Übung brauchen, sind die `Apache-mynewt-core` und die` mynewt.nordic` Repositories. Für das nächste Beispiel würde schreiben, bis ich dir es das mynewt_arduino_primo Repository als auch benötigen.

Nachdem Sie nun die benötigten Repositories definiert haben, ist es Zeit, um alles zu installieren, damit Sie loslegen können.

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

Ihre Version-Strings wird wahrscheinlich anders sein, aber Sie sollten eine ähnliche Ausgabe erhalten.

Für die App selbst werden wir die eine der mitgelieferten Anwendungen für Bluetooth-Peripheriegerät so erweitern, dass wir die Bluetooth-Kommunikation in, gebaut werden, so das erste, was wir tun müssen, heißt, dass die App in die eigene App-Verzeichnis kopieren :

```
$ mkdir -p apps/nrf52_adc
$ cp -Rp repos/apache-mynewt-core/apps/bleprph/* apps/nrf52_adc
```

Als Nächstes werden Sie die `pkg.yml` Datei für Ihre Anwendung ändern. Wenn Sie fertig sind, sollte es so aussehen:

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

„Aber warten Sie, ist mein nur verschieden von dem‚@ Apache-mynewt-core‘Teil, warum muss ich hinzufügen, dass?“ du fragst? Denn wenn die App lebte * innen * die mynewt-Core-Repository, es einen relativen Pfad verwenden könnte. Nun, da wir es entfernt haben, braucht es einen expliziten Pfad, einschließlich des Repository. (Sie werden dies noch deutlicher in einer Minute abgegeben wird.) So, jetzt wir eine App haben, in ihrem eigenen Paket ist, genannt nr52_adc und es hängt von einer Reihe von Paketen innerhalb mynewt-Kerns.

Erstellen Sie zwei Ziele - ein für den Bootloader und einen für das nrf52 Bord.

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

Also haben wir ein Ziel für unsere App erstellt haben, und sagte Molch, wo diese App zu finden. Wir haben gesagt, Molche, was Board Support Package (BSP) für die App zu nutzen, und wir werden dies bauen für das Debuggen. Später können wir das ‚optimiert‘ ändern, wie der Bootloader es kleiner zu machen.

Nun, wenn Sie einen mynewt Bootloader auf dem Board noch nicht installiert haben, müssen Sie das zuerst tun. So Wir bauen sowohl die Ziele, und sie installieren.

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

Sie haben also den Bootloader und die App gebaut und geladen. Wenn Sie das Verzeichnis bin schauen in (waaaay unten drin) Sie werden die Bilder für diese beiden finden, und der Bootloader ist ziemlich gestopft klein.

```
$ ls -l bin/targets/nrf_boot/app/apps/boot/
12 -rwxr-xr-x 1 dsimmons staff 8956 Feb 7 15:59 boot.elf.bin
```

So etwa 9Kb für den Bootloader. Ich habe dir gesagt, es ist klein! Sie können für die App das gleiche tun, wenn Sie neugierig sind.

Jetzt haben Sie eine BLE-App, aber wirklich alles haben Sie getan ist, den Namen des eingebauten in verändern bleprph App nrf52_adc und Last, die. Gar nicht so beeindruckend, und es wird sicherlich nicht einen analogen Sensor jetzt lesen. Wenn Sie [Lightblue](https://itunes.apple.com/us/app/lightblue-explorer-bluetooth/id557428110?mt=8) für iOS oder Mac OS können Sie das Öffnen und Sie werden Ihre ‚flink sehen 'BLE-Gerät angezeigt. Aber wir sind hier, um tatsächlich eine BLE App zu machen, dass die tatsächlichen Messwerte von einem Sensor sendet, also lassen Sie uns tun, das nächste. Um einen ADC-Sensor, und da das ADC-Paket ist in einer externen, lizenziert, Repository zu lesen, werden wir einen Treiber für sie hier in unserer App erstellen, die die vorhandenen Treiber im externen Repository werden wirksam einzusetzen. Es fügt eine weitere Schicht von Dereferenzierung, aber es wird uns auch einen Blick gibt auf eigene Treiber bauen, so dass wir es auf diese Weise tun würden. Es ist auch möglich, nur die meisten dieser im Hauptprogramm zu setzen, aber wo ist der Spaß?

## Der Aufbau eines Treibers

Das erste, was zu tun ist, um die Verzeichnisstruktur für den Treiber zu erstellen:

```
$ mkdir -p libs/my_drivers/myadc/include/myadc
$ mkdir -p libs/my_drivers/myadc/src
```

Jetzt können Sie die Dateien hinzufügen, die Sie benötigen. Sie erhalten eine pkg.yml brauchen die Treiber zu beschreiben, und dann Header-Stub von Quelle Stummeln gefolgt. Hier ist, was die pkg.yml Datei aussehen soll, wenn Sie mit ihm fertig sind:

```
$ cat libs/my_drivers/myadc/pkg.ym
pkg.name: libs/my_drivers/myadc
pkg.deps:
- "@apache-mynewt-core/hw/hal"
- "@mynewt-nordic/hw/drivers/adc/adc_nrf52"
```

Auch hier sind wir auf den ADC-Treiber von Nordic abhängig, so dass wir diese Abhängigkeiten buchstabieren müssen.

Lassen Sie uns nun die erforderlichen Header-Datei `myadc.h` in das Verzeichnis enthält erstellen. Es ist eine ziemlich einfache Header-Datei, da wir nur zwei Dinge tun müssen, um:

- Initialisieren Sie die ADC-Vorrichtung
- Lesen Sie ADC-Werte

```cpp
#ifndef _NRF52_ADC_H_
#define _NRF52_ADC_H_
void adc_init(void);
int adc_read(void *buffer, int buffer_len);
#endif
```

Als nächstes werden wir eine entsprechende Quelldatei `myadc.c` im Verzeichnis src benötigen. Das ist wo
wir werden die Besonderheiten des Fahrers umzusetzen.

Erstens sind die erforderlichen ** # ** s:

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

Und ein paar Variablen, die wir brauchen.

```cpp
nrf_drv_saadc_config_t adc_config = NRF_DRV_SAADC_DEFAULT_CONFIG;
struct adc_dev *adc;
uint8_t *sample_buffer1;
uint8_t *sample_buffer2;
```

Und das eigentliche ADC-Gerät:

```cpp
static struct adc_dev os_bsp_adc0;
static nrf_drv_saadc_config_t os_bsp_adc0_config = {
  .resolution = MYNEWT_VAL(ADC_0_RESOLUTION),
  .oversample = MYNEWT_VAL(ADC_0_OVERSAMPLE),
  .interrupt_priority = MYNEWT_VAL(ADC_0_INTERRUPT_PRIORITY),
};
```

Wenn Sie in den nordischen-Treiberdateien herumzustochern möchten, können Sie herausfinden, was das alles sind, und was sie bedeuten, aber sie sind im Grunde die Standardeinstellungen für den ADC, so dass wir mit ihnen fahren. Sie werden bemerken, dass diese Werte über einen `MYNEWT_VAL` Makro eingestellt sind. Dieses Makro wird in dem Molche Werkzeug definiert und es liest Konfigurationsdetails für die App von einer anderen YAML-Datei, so dass wir sie in Kürze in einer `syscfg.yml` Datei definieren werden an die Compiler bei der Erstellung übergeben werden.

Nun initialisieren tatsächlich den Fahrer:

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

Ein paar Dinge müssen diesen Teil zu sagen, wie es die meisten verwirrend ist. Erstens verwenden wir einen ** Standard ** Konfiguration für den ADC-Kanal über das `NRF_DRV_SAADC_DEFAULT_CHANNEL_CONFIG_SE` Makro. Das wichtige Bit hier ist, dass wir tatsächlich mit `AIN1`. Ich weiß, was Sie jetzt denken: „Aber wir wollen ADC-0!“ und das ist wahr. Das Board ist eigentlich die Bezeichnung ‚A0, A1, A2‘ usw., und die tatsächlichen Pin-Nummern werden auch auf dem Brett aufgelistet, was praktisch zu sein scheint. Zunaechst. Aber es wird sehr schnell chaotisch.

Wenn Sie zu verwenden versuchen `AIN0`, und dann in den Registern gehen herumzustochern, während diese ausgeführt wird,

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

Sie werden sehen, dass der Stift für Kanal 0 auf 1 gesetzt ist, das entspricht `AIN0`, aber das ist ** NICHT ** die gleiche wie` A0` - pin `P0.03`, die, die wir verwenden . Dafür verwenden Sie `AIN1`, die den Stift Wert auf 2 Messy gesetzt würde. Jemand, dachte irgendwo, diese sinnvoll. Ich möchte nicht, dass die Person treffen.

Die einzige andere Sache, hier zu beachten ist, dass wir die interne Referenzspannung verwenden, anstatt unsere eigene Einstellung. Es ist nichts falsch mit dem, aber da wir sind, werden wir den Gewinn ein wenig aufdrehen müssen von `NRF_SAADC_GAIN1_6` verwenden. Ich kam zu diesem Schluss über Versuch und Irrtum. Fühlen Sie sich frei, Ihre eigenen Studien auf sie zu leiten.

Nun, wie wir ** eigentlich ** Werte lesen? Nun, wir werden verwenden * ADC_Read () * dafür.

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

Dies ist ziemlich geradlinig. Wir nehmen einfach eine Reihe von Proben aus dem ADC, wandeln das Ergebnis zu einer Lesung in Millivolt, und das Ergebnis zurück.

Wie ich bereits erwähnt, sind einige der Werte von den Einstellungen zur Compile-Zeit entdeckt abgeleitet, so dass wir einige Einstellungen benötigen für unsere Fahrer. Im `myadc` Verzeichnis
Sie erhalten eine `syscfg.yml` Datei hinzufügen müssen:

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

Sobald dies alles erledigt ist, sollten Sie einen Arbeits ADC-Treiber für Ihre NRF52DK Bord haben. Aber was wollen Sie die Daten aus über Bluetooth zu erhalten, zu tun? Nun, wir werden dorthin kommen! Zuerst müssen wir eine Aufgabe in der Haupt-App erstellen, um diese Sensorwerte zu gehen zu bekommen, dann werden wir über Sorgen sie versendete.

## alles über Bluetooth veröffentlichen

Nun, da der Fahrer durchgeführt wird, müssen wir Anrufe an die wichtigsten App `main.c` Datei, sowie ein paar andere Dinge hinzuzufügen. Erstens, wir müssen aktualisieren die beinhaltet, und eine Aufgabe für unsere ADC Sampling hinzuzufügen.

```cpp
#include "myadc/myadc.h"
...
#define ADC_TASK_PRIO 5
#define ADC_STACK_SIZE (OS_STACK_ALIGN(336))
struct os_eventq adc_evq;
struct os_task adc_task;
bssnz_t os_stack_t adc_stack[ADC_STACK_SIZE];
```
Als nächstes werden wir brauchen, um die Aufgabe `event_q` zu initialisieren, so dass wir die folgenden` main () `will hinzufügen:

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

Wir brauchen, dass `adc_task_handler ()` Funktion zu existieren, und das ist, wo wir das ADC Gerät initialisieren werden - da wir nun einen Fahrer haben, der das tun kann - und stellen Sie die Event-Handler. In der während der Aufgabe () Schleife, werden wir nur einen Anruf zu `adc_sample machen ()` die ADC-Treiber zu veranlassen, das adc Gerät zu probieren.

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

Schließlich müssen wir diese `adc_read_event ()` Anrufe zu handhaben, da es unser Event-Handler ist:

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

Dies ist, wo wir tatsächlich den ADC-Wert lesen und dann für diesen Wert das BLE Merkmal aktualisieren.

Aber warten Sie, wir haben nicht diese BLE Leistungen und Eigenschaften noch nicht definiert! Richtig, so versuchen Sie nicht, zu bauen und diese App laufen nur noch, oder es wird mit Sicherheit scheitern. Ich weiß, Sie sind ungeduldig und wollen sehen, ob Ihre Treiber funktioniert, usw. und ich dies so getan haben, dass Sie noch kippe! Es tut uns leid.

Lassen Sie uns auf den Aufbau dieser BLE Dienste und Eigenschaften dann! Glücklicherweise ist es sehr einfach, da wir bereits eine App haben, die für uns von 90% der Arbeit tut! Wir müssen nur ein paar Dinge hinzufügen. Nämlich ein Bluetooth-Dienst für die Lesungen und dann Eigenschaften einig Service, um die Messwerte zu liefern.

Wie bei der BLE Peripheral App mit uns angefangen hat, werden wir ein paar Werte aus unserer App werben. Das ist zunächst nicht unbedingt notwendig, aber es wird uns mit einem iOS / Mac OS App verbinden hilft später. I definiert einen Dienst und die Eigenschaften in diesem Dienst in `bleadc.h` wie folgt:

```cpp
static const ble_uuid128_t gatt_svr_svc_adc_uuid =
BLE_UUID128_INIT(0x40, 0xb3, 0x20, 0x90, 0x72, 0xb5, 0x80, 0xaf,
0xa7, 0x4f, 0x15, 0x1c, 0xaf, 0xd2, 0x61, 0xe7);
#define ADC_SNS_TYPE 0xDEAD
#define ADC_SNS_STRING "eTape Liquid Level Sensor"
#define ADC_SNS_VAL 0xBEAD
uint16_t gatt_adc_val;
```

Die erste ist die UUID des Dienstes - ich dies bekam durch Zufall eine UUID zu erzeugen - gefolgt von den zwei Eigenschaften, die wir zu bieten wollen. Die erste Eigenschaft wird den * Typ * von Sensor werben wir Werbung sind, und es wird eine schreibgeschützte Merkmal sein. Das zweite Merkmal ist der Sensor * Wert * selbst, und wir werden angeschlossene Geräte zu ‚abonnieren‘, um es ermöglichen, um ständig aktualisierte Werte zu erhalten. Ich wollte 0xDEAD und 0xBEEF verwenden, aber das ist nicht, wie die Dinge ausgearbeitet.

** Hinweis **: Sie können alle gültigen Kenn UUIDs wählen hier zu gehen. Ich verwende diese Werte, weil ich ein Bluetooth-Werkzeug gebaut, die sie verwendet.

Der Wert, den ich Aktualisierung sein wird auch hier als `gatt_adc_val` definiert.

Wenn wir dann zu sehen gehen `gatt_srv.c` wir die Struktur des Dienstes und charakteristische Angebot sehen können, dass wir ein:

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

Wir fügen gerade einen weiteren Service, mit 2 neuen Merkmalen, an die bestehenden Anwendung. Wir müssen in der Funktion zu füllen, die nächste so für diesen Dienst, `gatt_srv_sns_access` genannt werden, dass der Dienst weiß, was zu tun ist.

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

Sie können sehen, dass, wenn Antrag auf `ADC_SNS_TYPE` ist, dass wir den Sensortyp kehren wir früher definiert. Wenn die Anforderung, wenn für `ADC_SNS_VAL` werden wir den` gatt_adc_val` Wert zurück.

Wenn Sie, Last bauen und diese Anwendung ausführen jetzt, werden Sie alle diese Leistungen und Eigenschaften siehe geworben wird, und Sie werden auch die „Sensortyp“ String über das ADC_SNS_TYPE Merkmal lesen können. Aber Sie ** ** noch werden keine Messwerte erhalten. Weil Sie nicht den Sensor noch verkabelt!

## Hinzufügen des Ist-Sensor!

Ok, das ist das letzte Bit vor allem zusammen! Jetzt, da wir ein voll funktionsfähiges BLE App haben, dass wir auf Sensorwerte aus, ist es Zeit, um tatsächlich verdrahten den Sensor abonnieren!

Wie bereits erwähnt, werden wir einen étape Wasserspiegel-Sensor zu verwenden. Sie können einen bekommen von [Adafruit](https://www.adafruit.com/products/1786).

Wir werden den Sensor als Widerstandssensor verwenden, und die Einrichtung ist sehr einfach. Ich werde ein ‚breadboard` sein mit diesem zu illustrativen Zwecken alle zusammen zu stellen.

- Erstens einen Jumper-Draht von Vdd auf dem Brett zu dem Steckbrett befestigen.
- Als nächstes wird einen Überbrückungsdraht von Pin P0.03 auf der Platine mit dem Schaltbrett befestigen. Dies wird unsere ADC-in sein.
- Der Sensor sollte so Stecker mit einem 560 Ohm-Widerstand, hat sie, dass in die Platine zwischen Vdd und ADC-in Löchern.
- Schließlich eine Brücke von GND auf dem Brett zu Ihrem Steckbrett befestigen.

An diesem Punkt sollten Sie Ihre Steckbrett etwas wie folgt aussehen:

![Brettchen](/posts/category/iot-iot-software/images/breadboard.png)

Befestigen Sie nun eine der mittleren 2 führen vom Sensor zum Boden, auf dem Steckbrett und die anderen Mitte führen zu dem ADC-in auf dem Steckbrett. Ihre Steckbrett sollte nun wie folgt aussehen:

![Adc Demo 1](/posts/category/iot-iot-software/images/adc-demo-1.png)

Und Ihr étape Sensor sollte wie folgt aussehen (zumindest wenn man es in einem Messzylinder montiert hat wie ich).

![Adc Demo 2](/posts/category/iot-iot-software/images/adc-demo-2.png)

Das schließt den Hardwareteil. Einfach!

Erraten Sie, was? Ja! An diesem Punkt sollten Sie in der Lage zu bauen, erstellen Bild und Ihre Anwendung laden und sehen Sie es richtig Senden Lesungen! Über blutige Zeit !!

Herzlichen Glückwunsch, Sie haben jetzt beide ein Hardware-Projekt und ein Software-Projekt abgeschlossen durch einen Sensor an das Gerät anschließen und Mynewt unter Verwendung von Daten von diesem Sensor zu lesen und via Bluetooth mit einem angeschlossenen Gerät senden. Das ist keine geringe Leistung!

## Sehen Sie Ihre Ergebnisse

Wenn Sie sich fragen, wie man tatsächlich diese Sensorwerte via Bluetooth sehen, haben Sie ein paar Optionen. Unter Mac OS oder iOS können Sie die [Lightblue App] herunterladen (https://itunes.apple.com/us/app/lightblue-explorer-bluetooth/id557428110?mt=8)
Diese App können Sie eine Verbindung herstellen, und verhören, BLE-Geräte wie die, die Sie gerade gebaut, aber es ist nicht wirklich visuell so toll.

Wenn Sie die BLE-Service und Charakteristika UUIDs in diesem Tutorial verwendet, können Sie auch ein [Mac OS MyNewt Sensor Reader App](https://dragonflyiot.com/MyNewtSensorReader.zip) herunterladen und verwenden, die ich gebaut. (Zip-Archiv), dass Sie Ihre Daten grafisch darstellen kann, usw. Ein iOS-Version im Beta-Test und soll in Kürze verfügbar sein.

![MyNewtSensorReader006](/posts/category/iot-iot-software/images/MyNewtSensorReader006.jpg)

Nun, ich sagte, wie klein und schnell dieses Betriebssystem ist, und die Anwendungen sind. Also hier ist ein wenig Beweis mit, dass zu gehen:

Hier ist die ‚Debug‘ gebaut Version der App:

```
136 -rwxr-xr-x  1 dsimmons  staff   135188 Feb  8 10:55 nrf52_adc.img
```

Es ist alles von 135KB. Und hier ist es ‚optimiert‘

```
120 -rwxr-xr-x  1 dsimmons  staff   118788 Feb  9 11:06 nrf52_adc.img
```

Eine satte 119KB. Zusammen mit dem 9Kb Bootloader haben wir ein ganzes IoT OS und App in 128Kb bekommen. Warten Sie, das paßt auf einem Original-Macintosh! Das ist sehr schön!

Ok, ich hoffe, dass Sie dieses kleine Beispiel genossen. Als nächstes werde ich eine andere App aufzuschreiben Ich habe, dass ein Umwelt-Luftqualität (CO ~ 2 ~) Sensor ist. Es ist auf einem Arduino Primo, aber vielleicht sollte ich sie beide auf der gleichen Platine setzen ... Hmmmm
