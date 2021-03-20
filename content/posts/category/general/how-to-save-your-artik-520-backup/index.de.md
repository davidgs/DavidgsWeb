---
title: "How To Save (Sichern oder Klon) Ihre ARTIK-520"
Date: 2017-03-11
Author: davidgs
Category: IoT
Tags: ARTIK, ARTIK-520, IoT, Samsung
Slug: how-to-save-your-artik-520-backup
hero: images/Samsung-ARTIK-IoT-710x364.jpg
---

Lassen Sie uns sagen, um ihrer selbst willen Argument, dass Sie eine [Samsung ARTIK-520](https://www.artik.io/modules/artik-520/) (ich nehme an, das beiseite auf andere ARTIK Module arbeiten werden aus der ARTIK- 0 sind), und Sie haben es den ganzen Weg konfiguriert Sie wollen, und wollen nicht verlieren alles. Oder vielleicht möchten Sie es einfach mal anders ARTIK-520s auf ein Dutzend ein Dutzend replizieren. Wie steht es jetzt offenbar die Antwort „viel Glück damit“, wie es keinen Mechanismus gibt, um tatsächlich Dump ein Lauf ARTIK-520 zu einer Mini-SD-Karte, die dann verwendet werden kann, um es wieder zu installieren.

Bis jetzt. Ich habe eine solche ARTIK-520, und ich will nicht, es zu zerstören, aber ich will es noch dazu auf eine andere Version des OS in der Lage sein mit einigen Dingen zu spielen, um, dann in der Lage sein, leicht wiederherstellen zurück zu dieses System später. Nach umfangreicher Such- und Stocher über, konnte ich keine Möglichkeit, das zu tun finden. So erfand ich ein. Hier ist, wie es zu tun:

Zuerst müssen Sie die ursprüngliche ARTIK-520 Bild, das Sie begann mit. Meins war noch auf der Mini-SD-Karte I von installiert, so dass es einfach war. Wenn Sie das nicht haben, einfach erneut herunterladen, um Ihre Karte im Anschluss an die [hervorragende Anleitung hier](https://developer.artik.io/documentation/artik/getting-started/).

Nun, wenn Sie gerade auf diese Karte in den Leser und sehen, was du hast:

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

Sie werden feststellen, dass letzte Scheibe Eintrag sehen für

```
/dev/mmcblk1
```

Das ist in 3 Teile aufgeteilt. Die letzte Partition ist, die Sie daran interessiert sind. Nun wird die SD-Karte verwende ich eine 8-GB-Karte, aber Sie werden feststellen, dass, wenn Sie alle diese Partitionen addieren, sie summieren sich nicht zu irgendwo in der Nähe zu 8GB . Das ist, weil sie nicht brauchen. Sie brauchten nur groß genug sein, um das Original-Betriebssystem zu halten, und für den Fall, waren Sie nur eine 1 GB-Karte noch passen würde. Aber du bist nicht eine 1 GB-Karte, sind Sie? Natürlich nicht. So müssen Sie das Dateisystem wachsen, um das neue Betriebssystem zu halten, sind Sie tatsächlich ausgeführt wird.

Hier ist, wie Sie diese Partition wachsen:

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

Und Sie haben nur die Partitionstabelle für den letzten Abschnitt gezüchtet, um den verfügbaren Platz auszufüllen. Aber du bist nicht getan, weil Sie auch das Dateisystem zu Spiel wachsen!

Als nächstes müssen Sie das Dateisystem überprüfen müssen, dann montieren, und dann ‚wachsen‘ es:

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

Großartig! Sie bestanden! Jetzt sollten Sie eine sehr große dritte Partition auf dem SSD-Karte haben, und wir können den Prozess des Dumpings Ihre laufenden System als Backup starten.

Als nächstes und ich dies tat, so dass Sie nicht haben, ging ich das Dateisystem durch und alle gefundenen Verzeichnisse Sie ** nicht ** Mangel abzusteigen in beim Sichern und dann eine lange, aber sehr dumm Skript schrieb Dump alles in ein tar-Archiv und dann gzip komprimieren es (da kann man nicht anfügen an ein bereits komprimiertes Archiv). Und hier ist eine seltsame Sache. GNU Tar sagt, dass zu ** nicht ** ein Verzeichnis rekursiv hinzufügen, sollten Sie `tar cf foo.tar foo --no-recursion` laufen, aber zumindest auf der Version von Fedora Ich renne, die ** ** Ansprüche GNU tar installiert haben, dass eine Wirkung haben versagt. In der Tat, was ich mit endete, wie Sie im Skript sehen werden, ist `tar cf foo.tar --no-Rekursion foo`. Anscheinend ist die --no-Rekursion hat vor dem Verzeichnis kommen Sie nicht auf Rekursion wollen. Wer wusste. Führen Sie das Skript, und Sie werden mit einem neuen rootfs.tar.gz auf der SD-Karte am Ende. Dies ist, was auf ein neues System installiert werden, damit Ihr neues System mit einer Kohlenstoff-Kopie der alten machen.

** Hinweis: Als Vorsichtsmaßnahme sollten Sie die vorhandene rootfs.tar.gz Datei umbenennen, sie zu bewahren. Wenn etwas schief geht, können Sie es an den richtigen Platz zurück und erholen sich - wenn auch nicht das System wiederherstellen Sie Klon versuchen. **

Das [script](https://github.com/davidgs/ARTIK-5-backup) ist von meinem) ist von meinem [GitHub](https://github.com/davidgs/ARTIK-5-backup)

** UPDATE: Da dies nun über GitHub ist, ich etwas Phantasie in das Skript eingefügt. Es wird sicher die Größe der dritten Partition berechnen, und es richtig machen. Es wird ein Backup der vorhandenen rootfs.tar.gz-Datei für Sie, werden Sie gefragt, ob es irgendwelche zusätzlichen Dateien oder Verzeichnisse enthalten (ersten, nicht-rekursiv zu schließen, dann enthält die rekursive) usw. Es ist viel schöner jetzt . Genießen!**

Hier ist, wie groß das Original war:

```
-rw-r--r-- 1 root root  410873697 Apr 15  2016 rootfs.tar.gz
```

meine unkomprimierte tar-Datei war Yuge im Vergleich:

```
-rw-r--r-- 1 root root 2893404160 Mar 11 14:06 rootfs.tar
```

Und dann, auch komprimiert, es war ein Monster:

```
-rw-r--r-- 1 root root 1521728492 Mar 11 14:06 rootfs.tar.gz
```

So stellen Sie sicher, dass die SD-Karte Sie verwenden groß genug ist, um die ** ** unkomprimierte tar-Datei zu halten, da Sie sie als unkomprimierte müssen speichern, bis es fertig ist, dann ist es komprimieren. Ich habe wahrscheinlich gemacht könnte Mine deutlich kleiner hatte ich ein paar Sachen entfernt war ich eigentlich nicht verwenden, aber wenn man bedenkt, dass ich das alles aus, testen wollte habe ich beschlossen, es eine strenge Prüfung zu machen.

Sobald Sie Ihre vollständige roots.tar.gz Datei haben, können Sie aushängen einfach die SD-Karte, steckte es in eine neue ARTIK-520, Flip die Boot-Schalter, und das Gerät starten. Es wird dann das geklonte System installieren, können Sie es abgeschaltet, un-Flip das Boot-Switches, die Karte und Neustart und Voilà herausziehen! Sie haben ein geklontes System!

Nicht obwohl täuschen, dieser ganze Prozess werden Sie den besseren Teil eines Tages abgeschlossen. Zumindest ist das, wie lange es dauerte. Aber dann wieder, ich hatte mit ihm zu kommen, und zu testen, wie gut.
