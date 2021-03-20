---
title: « Construire une application avec Apache MyNewt »
Date: 2017-02-09
Author: davidgs
Category: Gadgetry, IoT
Tags: Apache, IoT, mynewt
Slug: building-an-app-with-apache-mynewt
hero: images/logo.png
---

J'ai passé beaucoup de temps au cours des derniers mois de travail sur le [Apache MyNewt IdO OS](http://mynewt.apache.org). Si vous ne savez pas ce qui est, alors vous devriez vraiment! Il est un assez nouveau projet Apache, toujours dans la « incubation » phase, mais ils sont sur le point de libérer leur deuxième version bêta de la version 1.0 (Je pense que tous les votes sont pour l'approuver). Oui, il y a certaines choses encore manquantes, et des bords rugueux, mais il vient bien ensemble et si vous êtes à la recherche d'un Open Source IdO OS pour votre appareil, MyNewt peut tout ce que vous cherchez. Il est extrêmement petit (le bootloader I est construit tout 9Ko!), Rapide et très flexible. J'ai écrit quelques applications pour elle - un UART à base app capteur environnement et une application de capteur analogique - que je vais écrire ici séparément. Pour aujourd'hui, je vais commencer par le capteur analogique en utilisant le convertisseur analogique-numérique (ADC) Converter. Alors, commençons!

Je me suis basé sur la démonstration semi [NRF52DK] Nordic (https://www.nordicsemi.com/eng/Products/Bluetooth-low-energy/nRF52-DK) Développeur Conseil qui est une carte de développement Bluetooth basé sur M4F Cortex SoC. Il a beaucoup pour lui, et la puce NRF52 nordique est une puce IdO très commune, il est donc idéal pour le développement (en fait la prochaine App je l'ai écrit est une carte Arduino Primo, qui utilise également le NRF52 SoC). Pour mon retour, je choisi un liquide éTAPE capteur analogique Capteur de niveau que je pris de [Adafruit](https://www.nordicsemi.com/eng/Products/Bluetooth-low-energy/nRF52-DK). Pourquoi ai-je choisi ce capteur? Surtout parce que je l'ai acheté il y a un moment pour une bonne raison que je ne me souviens pas, il était assis sur mon bureau! Il est un simple capteur analogique tension résistif, et je l'avais déjà, il était donc idéal. J'ai aussi acheté 1000 ml cylindre gradué sur eBay pour monter dans, juste pour rendre les choses faciles. Maintenant que tout ce fond est hors de la voie, nous allons commencer à construire l'application elle-même!

Le début Let au début ... Il est généralement un bon tremplin. Je ne vais pas passer par la configuration complète de l'environnement de développement de MyNewt, mais il y a un excellent tutoriel sur se mettre en place [ici](http://mynewt.apache.org/latest/os/get_started/get_started/). Je fais mon développement sur Mac OS Sierra, et je ne recommande pas ** ** aller la route Docker, mais à part ça, procurez-vous l'installation et en cours d'exécution avec MyNewt puis revenir.

** Note: ** Ce tutoriel sera éventuellement une partie des docs / tutoriels dans la version officielle de MyNewt.

Tout le monde en arrière? Tous ensemble et prêt? Excellent!

## Commencer

Tout d'abord, vous voulez bien sûr de créer un projet pour cela:

```
$ mkdir ~/dev
$ cd ~/dev
$ newt new myadc
Downloading project skeleton from apache/incubator-mynewt-blinky...
Installing skeleton in myadc...
Project myadc successfully created.
$ cd myadc
```

Facile! Nordic n'a pas communiqué les pilotes ADC et comme pour la NRF52 comme open source, du moins pas sous une licence Apache conviviale, ils ont été déplacés vers un référentiel externe afin de ne pas aller à l'encontre des problèmes de licence et le droit d'auteur. Une chose qui ne MyNewt est de garder beaucoup d'informations dans les fichiers YAML. Et pour chaque projet que vous créez, triton crée un répertoire dans le répertoire des cibles de tenir certains de ces fichiers de configuration. Il conserve également un dans votre répertoire principal de développement qui indique à l'outil de triton ce que les dépôts à inclure, etc. Voici le mien:

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

Vous n'avez pas besoin de tous ces dépôts! Les deux seuls dont vous avez besoin pour cet exercice sont les `apache-mynewt-core` et les dépôts` mynewt.nordic`. Pour l'exemple suivant, je vais rédiger vous aurez besoin du dépôt mynewt_arduino_primo ainsi.

Maintenant que vous avez défini les dépôts nécessaires, il est temps d'installer tout pour que vous puissiez commencer.

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

Votre version cordes sera probablement différent, mais vous devriez obtenir une sortie similaire.

Pour l'application elle-même, nous allons étendre l'une des applications incluses pour un périphérique Bluetooth afin que nous obtenions les communications Bluetooth intégrées, de sorte que la première chose que nous devrons faire est de copier cette application dans notre propre répertoire d'applications :

```
$ mkdir -p apps/nrf52_adc
$ cp -Rp repos/apache-mynewt-core/apps/bleprph/* apps/nrf52_adc
```

Ensuite, vous allez modifier le fichier `pkg.yml` pour votre application. Lorsque vous avez terminé, il devrait ressembler à ceci:

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

« Mais attendez, le mien ne diffère par le « @ apache-mynewt-core » partie, pourquoi ai-je besoin d'ajouter que? » tu demandes? Parce que quand l'application a vécu * à l'intérieur du dépôt * mynewt-core, il pourrait utiliser un chemin relatif. Maintenant que nous avons supprimé, il a besoin d'un chemin d'accès explicite, y compris le dépôt. (Vous verrez cela encore plus clair dans une minute). Nous avons donc maintenant une application, dans son propre paquet, appelé nr52_adc et il dépend d'un tas de paquets au sein mynewt-core.

Créer deux cibles - un pour le bootloader et un pour le conseil d'administration de nrf52.

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

Nous avons donc créé une cible pour notre application, et triton dit où trouver cette application. Nous avons dit ce que triton Board Support Package (BSP de) à utiliser pour l'application, et nous allons construire pour le débogage. Par la suite, nous pouvons changer cela « optimisé » comme le bootloader pour le rendre plus petit.

Maintenant, si vous ne l'avez pas installé un bootloader mynewt encore sur votre carte, vous devez faire en premier. Ainsi, la construction de Laissez-les cibles et les installer.

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

Donc, vous avez construit et chargé le bootloader et l'application. Si vous regardez dans le répertoire bin (waaaay vers le bas là-bas), vous trouverez les images pour les deux, et le bootloader est assez sacrément petite.

```
$ ls -l bin/targets/nrf_boot/app/apps/boot/
12 -rwxr-xr-x 1 dsimmons staff 8956 Feb 7 15:59 boot.elf.bin
```

Donc, à propos 9Ko pour le bootloader. Je vous ai dit qu'il était petit! Vous pouvez faire la même chose pour l'application si vous êtes curieux.

Maintenant, vous avez une application BLE, mais vraiment tout ce que vous avez fait est de changer le nom de l'application intégrée de bleprph à nrf52_adc et la charge que. Pas tout ce qui impressionnant, et il ne sera certainement pas lu un droit de capteur analogique maintenant. Si vous avez [LightBlue](https://itunes.apple.com/us/app/lightblue-explorer-bluetooth/id557428110?mt=8) pour iOS ou Mac OS, vous pouvez ouvrir et que vous verrez votre « agile «dispositif BLE montrer. Mais nous sommes là pour réellement faire une application BLE qui envoie des lectures réelles d'un capteur, donc nous allons le faire à côté. Pour lire un capteur ADC, et puisque le paquet ADC est dans un externe, sous licence, dépôt, nous allons créer un pilote pour ici dans notre application qui exploitera le pilote existant dans le référentiel externe. Il ajoute une autre couche d'indirection, mais il va aussi nous donner un coup d'œil à la construction de notre propre chauffeur, donc nous allons le faire de cette façon. Il est également possible de mettre juste plus de cela dans le programme principal, mais où est le plaisir dans tout cela?

## Création d'un pilote

La première chose à faire est de créer la structure de répertoire pour votre pilote:

```
$ mkdir -p libs/my_drivers/myadc/include/myadc
$ mkdir -p libs/my_drivers/myadc/src
```

Maintenant, vous pouvez ajouter les fichiers dont vous avez besoin. Vous aurez besoin d'un pkg.yml pour décrire le conducteur, puis stub-tête suivi d'stub source. Voici ce que le fichier pkg.yml devrait ressembler lorsque vous avez terminé avec elle:

```
$ cat libs/my_drivers/myadc/pkg.ym
pkg.name: libs/my_drivers/myadc
pkg.deps:
- "@apache-mynewt-core/hw/hal"
- "@mynewt-nordic/hw/drivers/adc/adc_nrf52"
```

Encore une fois, nous sommes en fonction du pilote ADC de Nordic, donc nous devons préciser ces dépendances.

Maintenant, nous allons créer le `myadc.h` fichier d'en-tête requis dans le includes. Il est un fichier d'en-tête assez simple, puisque nous ne devons faire 2 choses:

- Initialiser le dispositif ADC
- Lire les valeurs ADC

```cpp
#ifndef _NRF52_ADC_H_
#define _NRF52_ADC_H_
void adc_init(void);
int adc_read(void *buffer, int buffer_len);
#endif
```

Ensuite, nous aurons besoin d'un `myadc.c` fichier source correspondant dans le répertoire src. C'est ici que
nous allons mettre en œuvre les détails du pilote.

Tout d'abord, les ** # ** s requis comprennent:

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

Et quelques variables dont nous aurons besoin.

```cpp
nrf_drv_saadc_config_t adc_config = NRF_DRV_SAADC_DEFAULT_CONFIG;
struct adc_dev *adc;
uint8_t *sample_buffer1;
uint8_t *sample_buffer2;
```

Et le dispositif ADC réel:

```cpp
static struct adc_dev os_bsp_adc0;
static nrf_drv_saadc_config_t os_bsp_adc0_config = {
  .resolution = MYNEWT_VAL(ADC_0_RESOLUTION),
  .oversample = MYNEWT_VAL(ADC_0_OVERSAMPLE),
  .interrupt_priority = MYNEWT_VAL(ADC_0_INTERRUPT_PRIORITY),
};
```

Si vous voulez fouiner dans les fichiers du pilote nordique fourni, vous pouvez comprendre ce que tous ces sont, et ce qu'ils veulent dire, mais ils sont essentiellement les paramètres par défaut de l'ADC, donc nous allons avec eux. Vous remarquerez que ces valeurs sont définies par une macro `MYNEWT_VAL`. Cette macro est définie dans l'outil de triton et il lit les détails de configuration pour l'application d'un autre fichier YAML, donc nous allons les définir peu dans un fichier `syscfg.yml` à transmettre au compilateur au moment de la construction.

Maintenant, pour initialiser réellement le pilote:

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

Quelques choses doivent dire sur cette partie, car il est le plus déroutant. Tout d'abord, nous utilisons une configuration par défaut ** ** pour l'ADC canal via la macro `NRF_DRV_SAADC_DEFAULT_CHANNEL_CONFIG_SE`. Le bit important ici est que nous utilisons en fait `AIN1`. Je sais ce que vous pensez, « Mais nous voulons ADC-0! » et c'est vrai. Le conseil d'administration est en fait étiqueté « A0, A1, A2 », etc., et les numéros de broches réels sont également répertoriés sur la carte, ce qui semble à portée de main. D'abord. Mais il devient malpropre très rapidement.

Si vous essayez d'utiliser `AIN0`, puis aller fouiner dans les registres alors que cela est en cours d'exécution,

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

Vous verrez que la broche pour le canal 0 est réglé sur 1, ce qui correspond à `AIN0`, mais c'est ** pas ** la même chose que` A0` - pin `P0.03`, celui que nous utilisons . Pour cela, vous utilisez `AIN1`, qui fixerait la valeur de la broche à 2. salissante. Quelqu'un, quelque part, pensé que ce fait sens. Je ne veux pas répondre à cette personne.

La seule autre chose à noter ici est que nous utilisons la tension de référence interne, plutôt que de créer notre propre. Il ne va pas rien avec ça, mais puisque nous sommes, nous allons devoir tourner la manivelle le gain un peu en utilisant `NRF_SAADC_GAIN1_6`. Je suis arrivé à cette conclusion par essais et erreurs. Sentez-vous libre de mener vos propres essais sur elle.

Maintenant, comment pouvons-nous lire réellement ** valeurs **? Eh bien, nous allons utiliser * adc_read () * pour cela.

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

Celui-ci est assez simple. Nous prenons simplement un certain nombre d'échantillons de l'ADC, convertir le résultat à une lecture en millivolts, et renvoie le résultat.

Comme je l'ai mentionné plus tôt, certaines valeurs sont dérivées des paramètres découverts lors de la compilation, donc nous aurons besoin de quelques réglages pour notre pilote. Dans le répertoire `myadc`
vous aurez besoin d'ajouter un fichier `syscfg.yml`:

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

Une fois que tout est fait, vous devriez avoir un pilote ADC travaillant pour votre conseil NRF52DK. Mais qu'est-ce que vous allez faire pour obtenir les données au-dessus Bluetooth? Eh bien, nous allons y arriver! Tout d'abord, nous devons créer une tâche dans l'application principale pour aller chercher les lectures du capteur, nous nous occuperons de les envoyer.

## Publier tout via Bluetooth

Maintenant que le conducteur est fait, nous devons ajouter des appels au fichier `main.c` de l'application principale, ainsi que quelques autres choses. Tout d'abord, nous aurons besoin de mettre à jour le comprend, et ajouter une tâche pour notre échantillonnage ADC.

```cpp
#include "myadc/myadc.h"
...
#define ADC_TASK_PRIO 5
#define ADC_STACK_SIZE (OS_STACK_ALIGN(336))
struct os_eventq adc_evq;
struct os_task adc_task;
bssnz_t os_stack_t adc_stack[ADC_STACK_SIZE];
```
Ensuite, nous aurons besoin d'initialiser la tâche `event_q` donc nous allons ajouter ce qui suit à` main () `:

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

Nous aurons besoin de cette fonction `adc_task_handler ()` exister, et c'est où nous allons initialiser le périphérique ADC - puisque nous avons maintenant un pilote qui peut le faire - et définir le gestionnaire d'événements. Dans la boucle while () de la tâche, nous allons simplement faire un appel à `adc_sample ()` pour que le pilote ADC pour échantillonner le dispositif adc.

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

Enfin, nous devons gérer les appels `adc_read_event ()`, car il est notre gestionnaire d'événements:

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

C'est là que nous lisons en fait la valeur ADC et puis mettre à jour la caractéristique BLE pour cette valeur.

Mais attendez, nous n'avons pas défini ces services BLE et caractéristiques encore! Bon, alors ne pas essayer de construire et exécuter cette application pour l'instant ou il échouera sûrement. Je sais, vous êtes impatient et que vous voulez voir si vos travaux pilotes, etc., et je l'ai fait ceci de telle manière que vous ne pouvez pas encore! Pardon.

Il faut que ça à la construction de ces services et caractéristiques BLE alors! Heureusement, il est très facile puisque nous avons déjà une application qui ne environ 90% du travail pour nous! Nous devons juste ajouter quelques petites choses. A savoir un service Bluetooth pour les lectures, et puis certaines caractéristiques de service pour fournir les lectures.

Comme avec l'application BLE périphériques nous avons commencé avec, nous publierons quelques valeurs de notre application. Le premier est pas strictement nécessaire, mais il nous aider à communiquer avec une application iOS / Mac OS plus tard. Je définissais un service et les caractéristiques de ce service dans `bleadc.h` comme suit:

```cpp
static const ble_uuid128_t gatt_svr_svc_adc_uuid =
BLE_UUID128_INIT(0x40, 0xb3, 0x20, 0x90, 0x72, 0xb5, 0x80, 0xaf,
0xa7, 0x4f, 0x15, 0x1c, 0xaf, 0xd2, 0x61, 0xe7);
#define ADC_SNS_TYPE 0xDEAD
#define ADC_SNS_STRING "eTape Liquid Level Sensor"
#define ADC_SNS_VAL 0xBEAD
uint16_t gatt_adc_val;
```

Le premier est le UUID du service - je suis arrivé en générant au hasard un UUID - suivi par les 2 caractéristiques que nous allons offrir. La première caractéristique va annoncer le type * du capteur, nous sommes la publicité, et ce sera une lecture seule caractéristique. La deuxième caractéristique sera le capteur * valeur * lui-même, et nous permettra périphériques connectés à « subscribe » à elle afin d'obtenir des valeurs constamment mis à jour. Je voulais utiliser 0xDEAD et 0xBEEF mais ce n'est pas comment les choses élaborées.

** Note **: Vous pouvez choisir UUID caractéristiques valables pour aller ici. J'utilise ces valeurs parce que je construit un outil Bluetooth qui les utilise.

La valeur que je serai mise à jour est également définie ici comme `gatt_adc_val`.

Si nous allons ensuite regarder `gatt_srv.c` on peut voir la structure du service et offre caractéristique que nous avons mis en place:

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

Nous sommes en train d'ajouter un autre service, avec 2 nouvelles caractéristiques, à l'application existante. Nous aurons besoin de remplir la fonction qui sera appelé à ce service, `gatt_srv_sns_access` prochaine afin que le service sait ce qu'il faut faire.

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

Vous pouvez voir que lorsque la demande est la `ADC_SNS_TYPE`, nous retournons le type de capteur, nous avons défini plus tôt. Si la demande si, pour `ADC_SNS_VAL` nous allons retourner la valeur` de gatt_adc_val`.

Si vous construisez, charger et exécuter cette application maintenant, vous verrez tous ces services et caractéristiques annoncés, et vous pourrez même lire la chaîne « Type de capteur » via la caractéristique de ADC_SNS_TYPE. Mais vous ** toujours ** n'obtiendrez des lectures. Parce que vous ne l'avez pas câblé encore le capteur!

## Ajout du capteur réel!

Ok, c'est le dernier peu avant tout est réuni! Maintenant que nous avons une application BLE pleinement opérationnel que nous pouvons souscrire à des valeurs de capteur de, il est temps de câbler en fait le capteur!

Comme mentionné précédemment, nous allons utiliser un capteur de niveau d'eau éTAPE. Vous pouvez en obtenir un de [Adafruit](https://www.adafruit.com/products/1786).

Nous allons utiliser le capteur comme un capteur résistif, et la configuration est très simple. Je vais utiliser un « breadboard` pour mettre tout cela ensemble pour des fins d'illustration.

- Tout d'abord, attacher un fil de cavalier de Vdd sur la carte à la carte de test.
- Ensuite, fixez un fil de cavalier de la broche P0.03 sur la carte à la carte de test. Ce sera notre ADC-in.
- Le capteur doit être venu d'une résistance 560 ohms, de sorte que la fiche dans la carte entre Vdd et les trous ADC-in.
- Enfin, fixez un cavalier de GND sur la carte à votre carte de test.

A ce stade, votre carte de test devrait ressembler à ceci:

![breadboard](/posts/category/iot-iot-software/images/breadboard.png)

Maintenant joindre l'un des 2 fils moyen du capteur au sol sur la planche à pain et l'autre chef de file du milieu à l'ADC-in sur la carte de test. Votre carte de test devrait ressembler à ceci:

![Adc Démo 1](/posts/category/iot-iot-software/images/adc-demo-1.png)

Et votre capteur éTAPE devrait ressembler à ceci (au moins si vous l'avez monté dans un cylindre gradué comme je le fais).

![Adc démo 2](/posts/category/iot-iot-software/images/adc-demo-2.png)

Voilà qui conclut la partie matérielle. Facile!

Devinez quoi? Ouais! À ce stade, vous devriez être en mesure de construire, créer l'image et chargez votre application et voir envoyer correctement les lectures! A propos du temps !! sanglant

Félicitations, vous avez maintenant terminé à la fois un projet matériel et un projet de logiciel en connectant un capteur à votre appareil et en utilisant Mynewt pour lire les données de ce capteur et l'envoyer par Bluetooth à un appareil connecté. Ce n'est pas un mince exploit!

## Voir vos résultats

Si vous vous demandez comment afficher réellement ces lectures du capteur via Bluetooth, vous avez deux options. Sous Mac OS ou iOS, vous pouvez télécharger le (https://itunes.apple.com/us/app/lightblue-explorer-bluetooth/id557428110?mt=8) [app LightBlue]
Cette application vous permet de connecter et d'interroger, les appareils BLE comme celui que vous venez de construire, mais ce n'est pas vraiment visuellement tout ce grand.

Si vous avez utilisé le service BLE et UUID caractéristiques utilisés dans ce tutoriel, vous pouvez télécharger et utiliser un (https://dragonflyiot.com/MyNewtSensorReader.zip) [Mac OS MyNewt App Sensor Reader] que je construit. (Archive Zip) qui vous permet de trier vos données graphiques, etc. Une version iOS est en Beta test et devrait être bientôt disponible.

![MyNewtSensorReader006](/posts/category/iot-iot-software/images/MyNewtSensorReader006.jpg)

Maintenant, je le disais comment petit et rapide ce système d'exploitation est, et les applications sont. Voici donc une petite preuve pour aller avec ce qui suit:

Voici la version construite « debug » de l'application:

```
136 -rwxr-xr-x  1 dsimmons  staff   135188 Feb  8 10:55 nrf52_adc.img
```

Il est tout de 135Kb. Et là, il est « optimisé »

```
120 -rwxr-xr-x  1 dsimmons  staff   118788 Feb  9 11:06 nrf52_adc.img
```

Une somme exorbitante 119Kb. En collaboration avec le bootloader 9Ko, nous avons un ensemble IdO OS et App dans 128Ko. Attendez, qui correspond à un original sur Macintosh! C'est assez agréable!

Ok, je l'espère que vous avez apprécié ce petit exemple. La prochaine étape, je vais écrire une autre application que je l'ai fait est un capteur environnemental qualité de l'air (CO ~ 2 ~). Il est sur un Primo Arduino, mais peut-être que je devrais les mettre à la fois sur la même carte ... Hmmmm
