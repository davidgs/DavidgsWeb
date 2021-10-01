---
title: "Cómo ahorrar (copia de seguridad o clon) Su ARTIK-520"
Date: 2017-03-11
Author: davidgs
Category: IoT
Tags: ARTIK, ARTIK-520, IoT, Samsung
Slug: how-to-save-your-artik-520-backup
hero: images/Samsung-ARTIK-IoT-710x364.jpg
reading_time: 8 minutes
---

digamos Vamos, pongamos por caso, que tiene una [Samsung ARTIK-520](https://www.artik.io/modules/artik-520/) (supongo que esto va a funcionar en otros módulos ARTIK aparte de la ARTIK- 0) y los que lo tienes todo configurado de la manera deseada, y no quiere nada a perder. O tal vez sólo desea replicar una docena de veces en una docena de diferentes ARTIK-520s. Tal como está ahora, al parecer, la respuesta es "buena suerte con eso" ya que no hay ningún mecanismo para volcar en realidad un funcionamiento ARTIK-520 a una tarjeta Mini-SD que puede ser utilizado para instalarlo de nuevo.

Hasta ahora. Tengo una ARTIK-520 tal, y no quiero destruirlo, pero yo quiero ser capaz de arrancar a una versión diferente del sistema operativo para jugar con algunas cosas, entonces será capaz de restaurar fácilmente de nuevo a este sistema después. Después de una extensa búsqueda y hurgando, no pude encontrar ninguna manera de hacerlo. Así que he inventado uno. He aquí cómo hacerlo:

En primer lugar, necesitará la imagen original ARTIK-520 con el que comenzó. La mía estaba todavía en el Mini-SD Card he instalado desde, así que fue fácil. Si usted no tiene que, simplemente volver a descargar a la tarjeta siguiendo las instrucciones excelentes [aquí](https://developer.artik.io/documentation/artik/getting-started/).

Ahora, si usted acaba de poner esa tarjeta en el lector y la mirada a lo que tienes:

```
[root@localhost mnt]# fdisk -l
Disk /dev/mmcblk0: 3.7 GiB, 3909091328 bytes, 7634944 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: gpt
Disk identifier: 00042021-0408-4601-9DCC-A8C51255994F

Device          Start     End Sectors  Size Type
/dev/mmcblk0p1   2048   67583   65536   32M Microsoft basic data
/dev/mmcblk0p2  67584  133119   65536   32M Microsoft basic data
/dev/mmcblk0p3 133120 7634910 7501791  3.6G Microsoft basic data

Disk /dev/mmcblk0boot1: 4 MiB, 4194304 bytes, 8192 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes

Disk /dev/mmcblk0boot0: 4 MiB, 4194304 bytes, 8192 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes

Disk /dev/mmcblk1: 7.4 GiB, 7892631552 bytes, 15415296 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: dos
Disk identifier: 0xfd34147e

Device         Boot  Start     End Sectors  Size Id Type
/dev/mmcblk1p1        2048   67583   65536   32M 83 Linux
/dev/mmcblk1p2       67584  133119   65536   32M 83 Linux
/dev/mmcblk1p3      133120 1140735 1007616  492M 83 Linux
```

Verá que la última entrada de disco para

```
/dev/mmcblk1
```

que se divide en 3 partes. La última partición es el que usted está interesado en. Ahora, la tarjeta SD que estoy usando es una tarjeta de 8 GB, pero se dará cuenta de que si se suman todas esas particiones, no se suman a cualquier lugar cerca de 8 GB . Eso es debido a que no necesitan. Sólo necesitaban ser lo suficientemente grande como para contener el SO original, y en caso de que sólo estaban usando una tarjeta de 1 GB todavía encajaría. Pero usted no está utilizando una tarjeta de 1 GB, ¿verdad? Por supuesto no. Por lo que necesita para hacer crecer el sistema de archivos para sostener el nuevo sistema operativo en realidad se está ejecutando.

He aquí cómo hacer crecer esa partición:

```
[root@localhost mnt]# fdisk /dev/mmcblk1
Welcome to fdisk (util-linux 2.26.2).
Changes will remain in memory only, until you decide to write them.
Be careful before using the write command.

Command (m for help): p
Disk /dev/mmcblk1: 7.4 GiB, 7892631552 bytes, 15415296 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: dos
Disk identifier: 0xfd34147e
Device         Boot  Start     End Sectors  Size Id Type
/dev/mmcblk1p1        2048   67583   65536   32M 83 Linux
/dev/mmcblk1p2       67584  133119   65536   32M 83 Linux
/dev/mmcblk1p3      133120 1140735 1007616  492M 83 Linux

Command (m for help): dPartition number (1-3, default 3): 3
Partition 3 has been deleted.

Command (m for help): n
Partition type   p   primary (2 primary, 0 extended, 2 free)   e   extended (container for logical partitions)
Select (default p):
Using default response p.
Partition number (3,4, default 3):
First sector (133120-15415295, default 133120):
Last sector, +sectors or +size{K,M,G,T,P} (133120-15415295, default 15415295):
Created a new partition 3 of type 'Linux' and of size 7.3 GiB.
Command (m for help): p
Disk /dev/mmcblk1: 7.4 GiB, 7892631552 bytes, 15415296 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: dosDisk identifier: 0xfd34147e
Device         Boot  Start      End  Sectors  Size Id Type
/dev/mmcblk1p1        2048    67583    65536   32M 83 Linux
/dev/mmcblk1p2       67584   133119    65536   32M 83 Linux
/dev/mmcblk1p3      133120 15415295 15282176  7.3G 83 Linux

Command (m for help): w
The partition table has been altered.Calling ioctl() to re-read partition table.
```

Y que ha crecido solo la tabla de particiones para que la última sección para llenar el espacio disponible. Pero usted no está hecho, porque también hay que hacer crecer el sistema de archivos de partido!

Lo siguiente que debe comprobar el sistema de archivos, a continuación, montarlo, y luego 'crecer' es:

```
[root@localhost mnt]# e2fsck -f /dev/mmcblk1p3
e2fsck 1.42.12 (29-Aug-2014)
Pass 1: Checking inodes, blocks, and sizes
Pass 2: Checking directory structure
Pass 3: Checking directory connectivity
Pass 4: Checking reference counts
Pass 5: Checking group summary information
rootfs: 20/125952 files (10.0% non-contiguous), 119676/125952 blocks
[root@localhost mnt]# mkdir /mnt/SD3
[root@localhost mnt]# mount /dev/mmcblk1p3 /mnt/SD3
[root@localhost mnt]# resize2fs /dev/mmcblk1p3
```

¡Genial! ¡Pasaste! Ahora usted debería tener una gran tercera partición en su tarjeta SSD y que puede iniciar el proceso de dumping su sistema funcionando como una copia de seguridad.

A continuación, y lo hice esto por lo que no tiene que fui a través del sistema de archivos y encontré todos los directorios que no ** ** necesidad de descender a dar marcha atrás, y luego escribió un guión largo, pero muy tonto para volcado todo en un archivo tar, gzip y luego compresa que (ya que no se puede anexar a un archivo ya comprimida). Y aquí es una cosa extraña. GNU Tar dice que a ** ** no añadir un directorio de forma recursiva, se debe ejecutar `tar cf foo.tar foo --no-recursion` pero al menos en la versión de Fedora estoy corriendo, que afirma ** ** tener instalado GNU tar, que no tuvo ningún efecto. De hecho, lo que terminó con, como se verá en el guión, es `tar cf foo.tar --no-recursividad foo`. Al parecer, el --no-recursividad tiene que venir antes que el directorio no desea recursividad en. Quien sabe. Ejecutar ese guión, y que va a terminar con un nuevo rootfs.tar.gz en su tarjeta SD. Esto es lo que se va a instalar en un nuevo sistema, con lo que su nuevo sistema de un enlace carbono-copia de la anterior.

** Nota: como medida de precaución, se debe cambiar el nombre del archivo existente rootfs.tar.gz para preservarla. Si algo va mal, a continuación, puede mover de nuevo en su lugar y recuperar - aunque no recuperar el sistema que está tratando de clon. **

El [script](https://github.com/davidgs/ARTIK-5-backup) está disponible en mi) está disponible en mi [GitHub](https://github.com/davidgs/ARTIK-5-backup)

** ACTUALIZACIÓN: Ya que este ya está disponible a través de GitHub, añadí un poco de lujo para el guión. Se calculará con seguridad el tamaño de la tercera partición, y hacerlo bien. Será copia de seguridad del archivo existente rootfs.tar.gz para usted, le preguntará si hay archivos o directorios adicionales para incluir (primeros en incluir de forma no recursiva, entonces el recursiva incluye), etc. Es un bonito mucho ahora . ¡Disfrutar!**

Aquí está lo grande que era el original:

```
-rw-r--r-- 1 root root  410873697 Apr 15  2016 rootfs.tar.gz
```

mi archivo tar comprimido era yuge en comparación:

```
-rw-r--r-- 1 root root 2893404160 Mar 11 14:06 rootfs.tar
```

Y entonces, incluso comprimido, que era un monstruo:

```
-rw-r--r-- 1 root root 1521728492 Mar 11 14:06 rootfs.tar.gz
```

Así que asegúrese de que la tarjeta SD que está utilizando es lo suficientemente grande como para contener el archivo tar comprimido ** **, ya que necesitará para almacenarla como sin comprimir hasta que se hace, luego comprimirlo. Yo probablemente podría haber hecho la mina considerablemente más pequeños tenían He quitado un montón de cosas que no estaba utilizando realmente, pero teniendo en cuenta que quería probar todo esto a cabo, decidí hacer una prueba rigurosa.

Una vez que tenga su archivo roots.tar.gz completa, sólo tiene que desmontar la tarjeta SD, lo puso en un nuevo ARTIK-520, voltear los interruptores de arranque y arrancar el dispositivo. A continuación, instalar el sistema clonado, lo apague, un-voltear los interruptores de arranque, saque la tarjeta y reiniciar el sistema y listo! Tiene un sistema de clonado!

No se deje engañar, sin embargo, todo este proceso le llevará la mejor parte de un día para completarse. Al menos, ese es el tiempo que me llevó. Pero, de nuevo, tenía que llegar a ella, y prueba de ello, también.
