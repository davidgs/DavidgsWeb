---
title: « Comment faire pour enregistrer (sauvegarde ou clone) Votre ARTIK-520 »
Date: 2017-03-11
Author: davidgs
Category: IoT
Tags: ARTIK, ARTIK-520, IoT, Samsung
Slug: how-to-save-your-artik-520-backup
hero: images/Samsung-ARTIK-IoT-710x364.jpg
reading_time: 8 minutes
---

Regardons les choses en dire, pour l'amour de la discussion, que vous avez un [Samsung ARTIK-520](https://www.artik.io/modules/artik-520/) (Je suppose que cela va fonctionner sur d'autres modules de ARTIK en dehors de la ARTIK- 0) et les vous avez tout configuré comme vous le souhaitez, et ne veulent pas rien perdre. Ou peut-être vous voulez juste reproduire une douzaine de fois sur une douzaine ARTIK-520s. À l'heure actuelle, apparemment, la réponse est « bonne chance avec ça » car il n'y a pas de mécanisme pour vider en fait une course ARTIK-520 à une carte Mini-SD qui peut ensuite être utilisé pour l'installer à nouveau.

Jusqu'à maintenant. J'ai un tel ARTIK-520, et je ne veux pas détruire, mais je veux être en mesure de démarrer à une autre version du système d'exploitation à jouer avec certaines choses, puis être en mesure de restaurer facilement revenir à ce système plus tard. Après de longues recherches et fouiner, je ne pouvais trouver aucun moyen de le faire. Alors je l'ai inventé un. Voici comment faire:

Tout d'abord, vous aurez besoin de l'image ARTIK-520 d'origine que vous avez commencé. Le mien était toujours sur la carte Mini-SD Je l'ai installé à partir, il était donc facile. Si vous ne disposez pas que, juste retélécharger à votre carte en suivant les instructions [excellentes ici](https://developer.artik.io/documentation/artik/getting-started/).

Maintenant, si vous venez de mettre cette carte dans le lecteur et regardez ce que vous avez:

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

Vous verrez que la dernière entrée de disque pour

```
/dev/mmcblk1
```

qui est divisé en 3 parties. La dernière partition est celle que vous intéresse. Maintenant, la SDCard J'utilise est une carte de 8 Go, mais vous remarquerez que si vous additionnez toutes ces partitions, ils ne correspondent pas à n'importe où près de 8 Go . C'est parce qu'ils ne ont pas besoin. Ils ne devaient être assez grand pour contenir le système d'exploitation d'origine, et au cas où vous n'utilisaient une carte de 1 Go il fonctionne toujours. Mais vous ne l'utilisez une carte de 1 Go, êtes-vous? Bien sûr que non. Donc, vous devez développer le système de fichiers pour maintenir le nouveau système d'exploitation que vous êtes en train de courir.

Voici comment vous cultivez cette partition:

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

Et vous venez de la table grandi partition pour cette dernière section pour remplir l'espace disponible. Mais vous n'êtes pas fait, parce que vous devez également développer le système de fichiers match!

Ensuite, vous devez vérifier le système de fichiers, puis le monter, puis « grandir » il:

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

Génial! Tu es passé! Maintenant, vous devriez avoir une très grande 3ème partition sur votre carte SSD et nous pouvons commencer le processus de dumping votre système en cours d'exécution en tant que sauvegarde.

Ensuite, et je fait cela pour que vous n'avez pas, je suis passé par le système de fichiers et trouvé tous les répertoires que vous ** ** ne veux pas descendre dans lors de la sauvegarde, puis écrit un script long mais très stupide pour tout sauvegarde dans une archive tar, puis compresse gzip (puisque vous ne pouvez pas append à une archive déjà compressé). Et voici une chose étrange. GNU Tar dit que pour ** pas ** ajouter un répertoire récursive, vous devez exécuter `tar cf foo.tar foo --no-recursion` mais au moins la version de Fedora je suis en cours d'exécution, qui prétend ** ** d'avoir installé GNU tar, qui n'a eu aucun effet. En fait, ce que j'ai fini avec, comme vous le verrez dans le script, est `tar cf foo.tar foo` --no-récursion. Apparemment, le --no-récursion doit venir avant le répertoire que vous ne voulez pas récursivité. Qui savait. Exécutez ce script, et vous vous retrouverez avec une nouvelle rootfs.tar.gz sur votre carte SD. C'est ce qui sera installé sur un nouveau système, rendant ainsi votre nouveau système une copie carbone de l'ancien.

** Note: par précaution, vous devez renommer le fichier existant rootfs.tar.gz pour la préserver. Si quelque chose va mal, vous pouvez le déplacer en place et récupérer - mais pas récupérer le système que vous essayez de cloner. **

Le [scénario](https://github.com/davidgs/ARTIK-5-backup) est disponible à partir de mon) est disponible à partir de mon [GitHub](https://github.com/davidgs/ARTIK-5-backup)

** Mise à jour: Comme il est maintenant disponible via GitHub, j'ai ajouté de fantaisie au script. Il calcule en toute sécurité la taille de la 3ème partition, et l'obtenir droit. Il sauvegarde le fichier existant rootfs.tar.gz pour vous, il vous demandera s'il y a des fichiers ou des répertoires supplémentaires à inclure (premiers à inclure non récursive, le récursif comprend), etc. Il est une plus belle beaucoup maintenant . Profitez!**

Voici la taille de l'original était:

```
-rw-r--r-- 1 root root  410873697 Apr 15  2016 rootfs.tar.gz
```

mon fichier tar non compressé était Yuge par comparaison:

```
-rw-r--r-- 1 root root 2893404160 Mar 11 14:06 rootfs.tar
```

Et puis, même comprimé, il était un monstre:

```
-rw-r--r-- 1 root root 1521728492 Mar 11 14:06 rootfs.tar.gz
```

Donc, assurez-vous que la carte SD que vous utilisez est assez grand pour contenir le fichier tar non compressé ** **, puisque vous aurez besoin de le stocker sous forme non compressée jusqu'à ce qu'il soit fait, puis le compresser. J'aurais probablement fait la mienne avait beaucoup plus petit j'ai enlevé un tas de choses que je n'étais pas réellement utilisé, mais étant donné que je voulais tester tout cela, je décidé de faire un test rigoureux.

Une fois que vous avez votre fichier roots.tar.gz complet, vous pouvez simplement la carte SD démonter, mettre dans une nouvelle ARTIK-520, les commutateurs de retourner démarrage et démarrer votre appareil. Il sera ensuite installer le système cloné, vous fermez le tout, non les commutateurs retourner démarrage, retirez la carte et redémarrer et voilà! Vous avez un système cloné!

Ne vous laissez pas berner si, tout ce processus vous fera la meilleure partie d'un jour complet. Au moins, c'est combien de temps il m'a fallu. Mais là encore, je devais venir avec elle, et de le tester, aussi bien.
