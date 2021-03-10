---
title: "Building an App with Apache MyNewt"
Date: 2017-02-09
Author: davidgs
Category: Gadgetry, IoT
Tags: Apache, IoT, mynewt
Slug: building-an-app-with-apache-mynewt
hero: images/logo.png
---

I've been spending a lot of time over the last few months working on the [Apache MyNewt IoT OS](http://mynewt.apache.org). If you don't know what that is, then you really should! It's a fairly new Apache Project, still in the 'incubating' phase, but they're about to release their second beta of the 1.0 release (I think all the votes are in to approve it). Yes, there are some things still missing, and some rough edges, but it's coming together nicely and if you're looking for an Open Source IoT OS for your device, MyNewt may just what you're looking for. It's extremely small (the bootloader I built is all of 9Kb!), fast, and very flexible. I've written a couple of apps for it -- a UART -based environmental sensor app and an Analog sensor app -- that I'll write up here separately. For today, I'll start with the Analog sensor using the Analog-to-Digital (ADC) Converter. So let's get started!

I based this demo on the Nordic Semi [NRF52DK](https://www.nordicsemi.com/eng/Products/Bluetooth-low-energy/nRF52-DK) Developer Board which is a Cortex M4F-based Bluetooth SoC development board. It's got a lot going for it, and the Nordic NRF52 chip is an extremely common IoT chip, so it's ideal for development (in fact the next App I wrote is for an Arduino Primo board, which also uses the NRF52 SoC). For my Analog sensor I chose an eTape Liquid Level Sensor that I picked up from [Adafruit](https://www.adafruit.com/products/1786). Why did I choose this sensor? Mostly because I bought it a while ago for some great reason that I can't recall, so it was sitting on my desk! It's a simple resistive-voltage analog sensor, and I already had it, so it was ideal. I also bought a 1000 ml graduated cylinder on eBay to mount it in, just to make things easy. Now that all that background is out of the way, let's get started on building the application itself!

Let's start at the beginning ... It's usually a good jumping off point. I'm not going to go through the entire setup of the MyNewt development environment, but there's an excellent tutorial on getting set up [here](http://mynewt.apache.org/latest/os/get_started/get_started/). I do my development on Mac OS Sierra, and I **do not** recommend going the Docker route, but other than that, get yourself setup and running with MyNewt and then come back.

**Note:** This tutorial will eventually be a part of the docs/tutorials in the official MyNewt release.

Everyone back? All set up and ready? Excellent!

## Getting Started

First, you'll of course want to create a project for this:

```
$ mkdir ~/dev
$ cd ~/dev
$ newt new myadc
Downloading project skeleton from apache/incubator-mynewt-blinky...
Installing skeleton in myadc...
Project myadc successfully created.
$ cd myadc
```

Easy! Nordic did not release the ADC drivers and such for the NRF52 as open-source, at least not under an Apache-friendly license, so they have been moved to an external repository in order to not run afoul of license and copyright issues. One thing that MyNewt does is keep lots of information in YAML files. And for each project you create, newt creates a directory in the targets directory to hold some of these configuration files. It also keeps one in your main development directory that tells the newt tool what repositories to include, etc. So here's mine:

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

You don't need all those repositories! The only two you need for this exercise are the `apache-mynewt-core` and the `mynewt.nordic` repositories. For the next example I'll write up you'll need the mynewt_arduino_primo repository as well.

Now that you have defined the needed repositories, it's time to install everything so that you can get started.

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

Your version-strings will likely be different but you should get similar output.

For the app itself we're going to extend the one of the included apps for a Bluetooth Peripheral Device so that we get the Bluetooth communications built in, so the first thing we'll need to do is copy that app into our own app directory:

```
$ mkdir -p apps/nrf52_adc
$ cp -Rp repos/apache-mynewt-core/apps/bleprph/* apps/nrf52_adc
```

Next, you'll modify the `pkg.yml` file for your app. When you're done, it should look like this:

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

"But wait, mine is only different by the "@apache-mynewt-core" part, why do I need to add that?" you ask? Because when the app lived *inside* the mynewt-core repository, it could use a relative path. Now that we've removed it, it needs an explicit path, including the repository. (You'll see this made even more clear in a minute.) So now we have an app, in it's own package, called nr52_adc and it depends on a bunch of packages within mynewt-core.

Create two targets - one for the bootloader and one for the nrf52 board.

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

So we've created a target for our app, and told newt where to find that app. We've told newt what Board Support Package (BSP) to use for the app, and we're going to build this for debugging. Later, we can change this to 'optimized' like the bootloader to make it smaller.

Now, if you haven't installed a mynewt bootloader on your board yet, you'll need to do that first. So let's build both the targets, and install them.

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

So you've built and loaded the bootloader, and the app. If you look in the bin directory (waaaay down in there) you'll find the images for those two, and the bootloader is pretty darned small.

```
$ ls -l bin/targets/nrf_boot/app/apps/boot/
12 -rwxr-xr-x 1 dsimmons staff 8956 Feb 7 15:59 boot.elf.bin
```

So about 9Kb for the bootloader. I told you it was small! You can do the same thing for the app if you're curious.

Now you have a BLE app, but really all you've done is change the name of the built-in bleprph app to nrf52_adc and load that. Not all that impressive, and it certainly won't read an Analog Sensor right now. If you have [LightBlue](https://itunes.apple.com/us/app/lightblue-explorer-bluetooth/id557428110?mt=8) for iOS or Mac OS you can open that and you'll see your 'nimble' BLE device show up. But we're here to actually make a BLE App that sends actual readings from a sensor, so let's do that next. In order to read an ADC sensor, and since the ADC package is in an external, licensed, repository, we'll create a driver for it here in our app that will leverage the existing driver in the external repository. It adds another layer of indirection, but it will also give us a look at building our own driver, so we'll do it this way. It's also possible to just put most of this in the main program, but where's the fun in that?

## Building a Driver

The first thing to do is to create the directory structure for your driver:

```
$ mkdir -p libs/my_drivers/myadc/include/myadc
$ mkdir -p libs/my_drivers/myadc/src
```

Now you can add the files you need. You'll need a pkg.yml to describe the driver, and then header stub followed by source stub. Here's what the pkg.yml file should look like when you're done with it:

```
$ cat libs/my_drivers/myadc/pkg.ym
pkg.name: libs/my_drivers/myadc
pkg.deps:
- "@apache-mynewt-core/hw/hal"
- "@mynewt-nordic/hw/drivers/adc/adc_nrf52"
```

Again, we're depending on the ADC driver from Nordic, so we have to spell out those dependencies.

Now let's create the required header file `myadc.h` in the includes directory. It's a pretty straightforward header file, since we only need to do 2 things:

- Initialize the ADC device
- Read ADC Values

```cpp
#ifndef _NRF52_ADC_H_
#define _NRF52_ADC_H_
void adc_init(void);
int adc_read(void *buffer, int buffer_len);
#endif
```

Next we'll need a corresponding source file `myadc.c` in the src directory. This is where
we'll implement the specifics of the driver.

First, the required **#include**s:

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

And a couple of variables that we'll need.

```cpp
nrf_drv_saadc_config_t adc_config = NRF_DRV_SAADC_DEFAULT_CONFIG;
struct adc_dev *adc;
uint8_t *sample_buffer1;
uint8_t *sample_buffer2;
```

And the actual ADC Device:

```cpp
static struct adc_dev os_bsp_adc0;
static nrf_drv_saadc_config_t os_bsp_adc0_config = {
  .resolution = MYNEWT_VAL(ADC_0_RESOLUTION),
  .oversample = MYNEWT_VAL(ADC_0_OVERSAMPLE),
  .interrupt_priority = MYNEWT_VAL(ADC_0_INTERRUPT_PRIORITY),
};
```

If you want to poke around in the Nordic-supplied driver files, you can figure out what all these are, and what they mean, but they are basically the default settings for the ADC, so we're going with them. You'll notice that these values are set via a `MYNEWT_VAL` macro. This macro is defined in the newt tool and it reads configuration details for the app from another YAML file, so we'll define them shortly in a `syscfg.yml` file to be passed to the compiler at build time.

Now, to actually initialize the driver:

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

A few things need to be said about this part, as it is the most confusing. First, we're using a **default** configuration for the ADC Channel via the `NRF_DRV_SAADC_DEFAULT_CHANNEL_CONFIG_SE` macro. The important bit here is that we're actually using `AIN1`. I know what you're thinking, "But we want ADC-0!" and that's true. The board is actually labelled 'A0, A1, A2' etc., and the actual pin numbers are also listed on the board, which seems handy. At first. But it gets messy very quickly.

If you try to use `AIN0`, and then go poke around in the registers while this is running,

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

You'll see that the pin for channel 0 is set to 1, which corresponds to `AIN0`, but that's **NOT** the same as `A0` -- pin `P0.03`, the one we're using. For that, you use `AIN1`, which would set the pin value to 2. Messy. Someone, somewhere, thought this made sense. I don't want to meet that person.

The only other thing to note here is that we're using the internal reference voltage, rather than setting our own. There's nothing wrong with that, but since we are, we'll have to crank up the gain a bit by using `NRF_SAADC_GAIN1_6`. I arrived at this conclusion via trial and error. Feel free to conduct your own trials on it.

Now, how do we actually **read** values? Well, we'll use *adc_read()* for that.

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

This one's pretty straight forward. We simply take a number of samples from the ADC, convert the result to a reading in millivolts, and return the result.

As i mentioned earlier, some of the values are derived from settings discovered at compile-time, so we'll need some settings for our driver. In the `myadc` directory
you'll need to add a `syscfg.yml` file:

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

Once that's all done, you should have a working ADC Driver for your NRF52DK board. But what are you going to do to get the data out over Bluetooth? Well, we'll get there! First, we need to create a task in the main app to go get those sensor readings, then we'll worry about sending them out.

## Publish it all via Bluetooth

Now that the driver is done, we'll need to add calls to the main app's `main.c` file, as well as a few other things. First, we'll need to update the includes, and add a task for our ADC sampling.

```cpp
#include "myadc/myadc.h"
...
#define ADC_TASK_PRIO 5
#define ADC_STACK_SIZE (OS_STACK_ALIGN(336))
struct os_eventq adc_evq;
struct os_task adc_task;
bssnz_t os_stack_t adc_stack[ADC_STACK_SIZE];
```
Next we'll need to initialize the task `event_q` so we'll add the following to `main()` :

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

We'll need that `adc_task_handler()` function to exist, and that's where we'll initialize the ADC Device -- since we now have a driver that can do that -- and set the event handler. In the task's while() loop, we'll just make a call to `adc_sample()` to cause the ADC driver to sample the adc device.

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

Finally, we'll need to handle those `adc_read_event()` calls, since it's our event handler:

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

This is where we actually read the ADC value and then update the BLE Characteristic for that value.

But wait, we haven't defined those BLE services and characteristics yet! Right, so don't try to build and run this app just yet or it will surely fail. I know, you're impatient and want to see if your driver works, etc. and I've done this in such a way that you cant yet! Sorry.

Let's get on to building those BLE services and characteristics then! Luckily, it's very easy since we already have an app that does about 90% of the work for us! We just have to add a few things. Namely a Bluetooth Service for the readings, and then some Service Characteristics to supply the readings.

As with the BLE Peripheral app we started with, we will advertise a couple of values from our app. The first is not strictly necessary, but it will help us connect with an iOS/Mac OS app later. I defined a service and the characteristics in that service in `bleadc.h` as follows:

```cpp
static const ble_uuid128_t gatt_svr_svc_adc_uuid =
BLE_UUID128_INIT(0x40, 0xb3, 0x20, 0x90, 0x72, 0xb5, 0x80, 0xaf,
0xa7, 0x4f, 0x15, 0x1c, 0xaf, 0xd2, 0x61, 0xe7);
#define ADC_SNS_TYPE 0xDEAD
#define ADC_SNS_STRING "eTape Liquid Level Sensor"
#define ADC_SNS_VAL 0xBEAD
uint16_t gatt_adc_val;
```

The first is the UUID of the service -- I got this by randomly generating a UUID -- followed by the 2 characteristics we are going to offer. The first characteristic is going to advertise the *type* of sensor we are advertising, and it will be a read-only characteristic. The second characteristic will be the sensor *value *itself, and we will allow connected devices to 'subscribe' to it in order to get constantly-updated values. I wanted to use 0xDEAD and 0xBEEF but that's not how things worked out.

**Note**: You can choose any valid Characteristic UUIDs to go here. I'm using these values because I built a Bluetooth tool that uses them.

The value that I'll be updating is also defined here as `gatt_adc_val`.

If we then go look at `gatt_srv.c` we can see the structure of the service and characteristic offering that we set up:

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

We're just adding another Service, with 2 new Characteristics, to the existing application. We'll need to fill in the function that will be called for this service, `gatt_srv_sns_access` next so that the service knows what to do.

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

You can see that when request is for the `ADC_SNS_TYPE`, we return the Sensor Type we defined earlier. If the request if for `ADC_SNS_VAL` we'll return the `gatt_adc_val` value.

If you build, load and run this application now, you will see all those Services and Characteristics advertised, and you will even be able to read the "Sensor Type" String via the ADC_SNS_TYPE Characteristic. But you **still** won't get any readings. Because you haven't wired up the sensor yet!

## Adding the Actual Sensor!

Ok, this is the last bit before everything comes together! Now that we have a fully functioning BLE App that we can subscribe to sensor values from, it's time to actually wire up the sensor!

As previously mentioned, we're going to be using an eTape Water Level Sensor. You can get one from [Adafruit](https://www.adafruit.com/products/1786).

We're going to use the sensor as a resistive sensor, and the setup is very simple. I'll be using a 'breadboard` to put this all together for illustrative purposes.

- First, attach a jumper-wire from Vdd on the board to the breadboard.
- Next, attach a jumper wire from pin P0.03 on the board to the breadboard. This will be our ADC-in.
- The sensor should have come with a 560 ohm resistor, so plug that into the board between Vdd and ADC-in holes.
- Finally, attach a jumper from GND on the board to your breadboard.

At this point your breadboard should look something like this:

![Breadboard](/posts/category/iot-iot-software/images/breadboard.png)

Now attach one of the middle 2 leads from the sensor to ground on the breadboard and the other middle lead to the ADC-in on the breadboard. Your breadboard should now look like this:

![Adc demo 1](/posts/category/iot-iot-software/images/adc-demo-1.png)

And your eTape Sensor should look like this (at least if you have it mounted in a graduated cylinder as I do).

![Adc demo 2](/posts/category/iot-iot-software/images/adc-demo-2.png)

That concludes the hardware portion. Easy!

Guess what? Yep! At this point you should be able to build, create-image and load your application and see it properly sending readings! About bloody time!!

Congratulations, you've now completed both a hardware project and a software project by connecting a sensor to your device and using Mynewt to read data from that sensor and send it via Bluetooth to a connected device. That's no small feat!

## Seeing your Results

If you're wondering how to actually view these sensor readings via Bluetooth, you have a couple of options. On Mac OS or iOS you can download the [LightBlue app](https://itunes.apple.com/us/app/lightblue-explorer-bluetooth/id557428110?mt=8)
This app lets you connect to, and interrogate, BLE devices like the one you just built, but it's not really visually all that great.

If you used the BLE Service and Characteristic UUIDs used in this tutorial, you can also download and use a [Mac OS MyNewt Sensor Reader App](https://dragonflyiot.com/MyNewtSensorReader.zip)  that I built. (Zip Archive) that allows you to graph your data, etc. An iOS version is in Beta testing and should be available soon.

![MyNewtSensorReader006](/posts/category/iot-iot-software/images/MyNewtSensorReader006.jpg)

Now, I was saying how small and fast this OS is, and the apps are. So here's a little proof to go with that:

Here's the 'debug' built version of the app:

```
136 -rwxr-xr-x  1 dsimmons  staff   135188 Feb  8 10:55 nrf52_adc.img
```

It's all of 135Kb. And here it is 'optimized'

```
120 -rwxr-xr-x  1 dsimmons  staff   118788 Feb  9 11:06 nrf52_adc.img
```

A whopping 119Kb. Together with the 9Kb bootloader, we've got an entire IoT OS and App in 128Kb. Wait, that fits on an Original Macintosh! That's pretty nice!

Ok, I hope you enjoyed this little example. Next up I'll write up another app I did that is an environmental Air Quality (CO~2~) sensor. It's on an Arduino Primo, but maybe I should put them both on the same board ... Hmmmm
