---
title: "How To Save (back-up of kloon) Uw ARTIK-520"
Date: 2017-03-11
Author: davidgs
Category: IoT
Tags: ARTIK, ARTIK-520, IoT, Samsung
Slug: how-to-save-your-artik-520-backup
hero: images/Samsung-ARTIK-IoT-710x364.jpg
---

laten we zeggen Let's, voor argument's sake, dat u een [Samsung ARTIK-520](https://www.artik.io/modules/artik-520/) (ik neem aan dat dit zal werken op andere ARTIK modules afgezien van de ARTIK- 0 zijn) en je hebt het allemaal geconfigureerd zoals u dat wilt, en niet willen verliezen niets. Of misschien wilt u gewoon om het te repliceren een tiental keer op een dozijn verschillende ARTIK-520s. Zoals het nu staat, blijkbaar, is het antwoord "goed geluk met dat" aangezien er geen mechanisme om daadwerkelijk te dumpen een lopend ARTIK-520 naar een Mini-SD-kaart die vervolgens kan worden gebruikt om het opnieuw te installeren.

Tot nu. Ik heb zo'n ARTIK-520, en ik wil niet om het te vernietigen, maar ik wil in staat zijn om het te kunnen opstarten vanaf een andere versie van het OS om te spelen met een aantal dingen, dan in staat zijn om opnieuw terug naar dit systeem later. Na lang zoeken en prikken over, kon ik op geen enkele manier om dat te doen vinden. Dus ik bedacht een. Hier is hoe het te doen:

Allereerst zal u het originele ARTIK-520 nodig dat je begonnen bent. Mijne was nog steeds op de Mini-SD-kaart I uit geïnstalleerd, zodat het gemakkelijk was. Als je dat niet hebt, gewoon opnieuw downloaden naar uw kaart volgens de [uitstekende instructies hier](https://developer.artik.io/documentation/artik/getting-started/).

Nu, als je gewoon die kaart in de lezer en kijken naar wat je hebt:

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

Je zult zien dat de laatste schijf vermelding voor te zien

```
/dev/mmcblk1
```

dat is verdeeld in 3 delen. De laatste partitie is degene die u geïnteresseerd bent in. Nu, de SDCard ik gebruik is een 8 GB-kaart, maar je zult merken dat als je al die partities optelt, dat doen ze niet overal dicht toe te voegen aan tot 8GB . Dat komt omdat ze niet nodig is. Ze alleen nodig om groot genoeg om de oorspronkelijke OS vast te houden, en in het geval dat je alleen met behulp van een 1GB kaart zou het nog passen. Maar je bent niet met behulp van een 1GB kaart, bent u? Natuurlijk niet. Dus je moet het bestandssysteem om het nieuwe OS u werkelijk aan het draaien te houden groeien.

Hier is hoe je groeit die partitie:

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

En je hebt net gegroeid de partitietabel voor die laatste gedeelte van de beschikbare ruimte op te vullen. Maar je bent nog niet klaar, want je ook om het bestandssysteem te groeien tot match!

Vervolgens moet je het bestandssysteem te controleren op, zet het dan, en dan 'groeien' it:

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

Super goed! Je bent geslaagd! Nu moet je een zeer grote 3e partitie op de SSD Card hebben en kunnen we het proces van dumping uw draaiend systeem als back-up te starten.

Vervolgens, en ik deed dit, zodat je niet hoeft te, ging ik door het bestandssysteem en vond al de mappen die u **niet** wil om af te dalen in tijdens het achteruit rijden, en schreef toen een lange, maar zeer dom script dump alles in een tar-archief, en dan gzip het verkleinen (omdat je niet kunt toevoegen aan een reeds gecomprimeerd archief). En hier is een vreemde zaak. GNU Tar zegt dat naar **niet** recursief toevoegen van een directory, moet je rennen `tar cf foo.tar foo --no-recursion` maar in ieder geval van de versie van Fedora Ik ben actief, die **vorderingen** te hebben GNU tar geïnstalleerd, dat geen enkel effect te hebben. In feite, wat ik eindigde met, zoals u zult zien in het script, is `tar cf foo.tar --no-recursie foo`. Blijkbaar is de --no-recursie heeft voor de map die u niet wilt recursie op om te komen. Wie weet. Run het script, en je zult eindigen met een nieuwe rootfs.tar.gz op je SD-kaart. Dit is wat er zal op een nieuw systeem worden geïnstalleerd, waardoor uw nieuwe systeem een carbon-kopie van de oude.

** Opmerking: als een voorzorgsmaatregel, moet u de bestaande rootfs.tar.gz bestand te wijzigen om het te bewaren. Als er iets misgaat, kun je dan verder weer op zijn plaats en te herstellen - al is het systeem dat u probeert te kloon niet herstellen.​

De [script](https://github.com/davidgs/ARTIK-5-backup) is vrij van mijn [GitHub](https://github.com/davidgs/ARTIK-5-backup)

** UPDATE: Aangezien dit is nu beschikbaar via GitHub, voegde ik een aantal mooie aan het script. Het zal veilig berekenen van de grootte van de 3e partitie, en krijgt het recht. Het zal back-up van de bestaande rootfs.tar.gz bestand voor u, het zal u vragen of er sprake is van extra bestanden of mappen op te nemen (eersten die ook niet-recursief, dan is de recursieve omvat), enz. Het is een stuk mooier nu . Genieten!**

Hier is hoe groot het origineel was:

```
-rw-r--r-- 1 root root  410873697 Apr 15  2016 rootfs.tar.gz
```

mijn niet-gecomprimeerde tar-bestand was Yuge vergelijking:

```
-rw-r--r-- 1 root root 2893404160 Mar 11 14:06 rootfs.tar
```

En dan, zelfs in samengeperste vorm, het was een monster:

```
-rw-r--r-- 1 root root 1521728492 Mar 11 14:06 rootfs.tar.gz
```

Zorg er dus voor dat de SD-kaart die u gebruikt is groot genoeg om de **ongecomprimeerde** tar-bestand te houden, omdat je nodig hebt om het op te slaan als niet-gecomprimeerd tot het klaar is, te comprimeren dan. Ik waarschijnlijk had kunnen maken mine aanzienlijk kleiner had ik haalde er een heleboel dingen die ik was eigenlijk niet gebruiken, maar gezien het feit dat ik wilde dit alles uit te testen, heb ik besloten om het een strenge test te maken.

Zodra u uw volledige roots.tar.gz bestand hebt, kun je gewoon ontkoppelt u de SD-kaart, zet het in een nieuwe ARTIK-520, draait u de boot schakelaars en start uw apparaat. Het zal dan installeert het gekloonde systeem, je het uitschakelen, un-flip de boot switches, trek de kaart en reboot en Voilà! Je hebt een gekloonde systeem!

Laat je echter niet voor de gek houden, zal dit hele proces je het betere deel van de dag in beslag nemen. Tenminste, dat is hoe lang het duurde me. Maar nogmaals, ik had om te komen met het, en test het, als goed.
