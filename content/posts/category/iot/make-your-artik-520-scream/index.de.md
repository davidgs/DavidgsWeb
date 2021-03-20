---
title: „Machen Sie Ihre ARTIK-520 Schrei“
Date: 2017-03-06
Author: davidgs
Category: IoT
Tags: ARTIK, ARTIK-520, IoT, Java
Slug: make-your-artik-520-scream
hero: images/Zulu-Duke200.png
---

Wenn Sie lesen [letzte Woche Beitrag](/posts/category/general/making-artik-5-iot-gateway-kura/) über sie ein ARTIK-520 ein IoT Gateway-Gerät des

Es wurde (diese kleinen Birdies halten mich interessant Nuggets Fütterung zu versuchen) mir vorgeschlagen, dass ich die [Azul Zulu Embedded JVM](https://www.azul.com/products/zulu-embedded/) als Alternative zu der versuchen OpenJDK JVM, die standardmäßig installiert ist. Ok, sicher, warum nicht. Was ist das Schlimmste, was passieren könnte. Antworten Sie nicht, dass.

Wie auch immer, wird dies ein kurzer Beitrag sein. Ich versuchte es. Ich habe die Zulu JVM und installiert es in etwa so:

```
[root@localhost ~]# tar xvf ezdk-1.8.0_112-8.19.0.31-eval-linux_aarch32hf.tar
[root@localhost ~]# update-alternatives --install /usr/bin/java java ~/ezdk-1.8.0_112-8.19.0.31-eval-linux_aarch32hf/jre/bin/java 100
[root@localhost ~]# update-alternatives --config java
[root@localhost ~]# systemctl restart kura.service 
```

Jetzt laden Sie die Kura Web Console in Ihrem Browser.

Zumindest für mich war es eine deutlich spürbar und deutliche Verbesserung der Performance des Web-Service. Wie in I ** wirklich ** es bemerkt. Aber dann wieder, obwohl ich war auch höflich zu kommentieren es in meinem [vorherigen Beitrag](/posts/category/general/making-artik-5-iot-gateway-kura/), hatte ich bemerkt, dass die Leistung der Kura hatte war etwas träge. Ich schreibe nur, dass die Tatsache, dass wir auf einiger Embedded-Hardware laufen und das ist fast immer langsamer als robuste Plattformen. Aber lassen Sie sich eine High-Performance-JVM und einige Sekunden Ihres Lebens wieder jedes Mal, wenn Sie in Kura eine Aktion. Das sind Sekunden, die, einmal verloren, würden Sie nie wieder bekommen haben. Sekunden, dass Sie jetzt voll nutzen ‚Ihre‘ statt einfach mit der Eingabe in Textnachrichten buchstabieren ‚ur‘. Dies wird die Welt zu einem besseren Ort für alle machen.
