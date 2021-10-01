---
title: "Programmieren der ARTIK-0 IoT-Geräte"
Date: 2018-07-01
Author: davidgs
Category: Gadgetry, IoT
Tags: ARTIK, ARTIK-053, IoT, Samsung
Slug: programming-the-artik-0-iot-devices
hero: images/bazaar493520_2.jpg
---

Wenn Sie diesen Blog gelesen haben viel überhaupt haben Sie bemerkt, dass ich ein ziemlich großer Fan der ARTIK Linie von IoT-Boards waren (siehe [hier](/posts/category/iot/winter-vacation-iot-artik-5/)) [hier](/posts/category/iot/iot-hardware/making-artik-5-iot-gateway-kura/)) [hier](/posts/category/iot/make-your-artik-520-scream/)) [hier](/posts/category/general/how-to-save-your-artik-520-backup/)) [hier](/posts/category/iot/iot-software/artik-520-droplit-io-edge-device/),), [hier](/posts/category/iot/iot-hardware/openhab-server-artik-520/),), [hier](/posts/category/iot/iot-hardware/running-influxdb-on-an-artik-520/) und) und [hier](/posts/category/iot/iot-hardware/influxdb-on-artik-520-redux/)), aber ich wirklich brauchen, um klarstellen, dass ein jetzt biss. Ich liebe meinen ARTIK-520 Board. Es wird mit dem gesamten InfluxData Stapel schön und ist ein solider und zuverlässiger Ort IoT-Edge-Software zu implementieren. Ich mag es wirklich.

That being said, ich bin immer noch ** wirklich ** unzufrieden mit der ARTIK-0x Linie „Produkte“. Es begann, als ich das ARTIK-020 Entwickler Bord gekauft. Viele Behauptungen über in der Lage, es von Mac OS zu programmieren usw. Die Realität war, dass - 13 Seiten in den Entwicklerführer - eine zu der Erkenntnis kommt, dass a) Sie einen Windows-Rechner und b müssen) nach 30 Tagen Sie Kauf benötigt eine $ 3.000 Lizenz zu IAR Workbench. So viel für seinen Maker freundlich. Ich habe, dass die Platine in einer Schublade und gab auf ihn auf. Teure Lektion gelernt.

Ich beschwere ich bei meinen Freunden bei Samsung - ja, ich habe Freunde bei Samsung - und eine Weile später gaben sie mir ein kostenloses ARTIK-053-Modul. Dieser brauchte die IAR Workbench nicht zu programmieren (yay für gcc !!) und ich dachte, die Dinge besser aussah. Ich wünschte, ich hatte recht gehabt. Ich spielte mit ihm ein wenig, nachdem es immer lief aber so Zeit aus, wie bei den anderen Samsung Bord, es in der Box ging.

Ich beschloss, es in dieser Woche zu überdenken. Ich hatte einen CO2-Sensor mit einem Nordic Semi nRF52DK und SenseAir K30 gebaut, aber die nRF52DK war wirklich irgendwie groß und ich war für einen kleineren Formfaktor suchen (die ich „auf Lager“ hatte) und nicht Arduino erfordern. Ich werde nicht in auf Arduino beginnen hier, aber ich konnte.

So kam die ARTIK-053 Dev Board und ... oh Scheiße, hier wieder gehen wir. Zuerst begann ich mit den ARTIK-IDE für die Entwicklung. Es basiert auf Eclipse (natürlich), aber im Ernst, es war unglaublich langsam, umständlich und tat keine Code-Vervollständigung oder Hinweise. Es dauerte etwa 4 Minuten einen binären auf das Board zu implementieren. Ich iterieren a ** lot ** so 4 Minuten pro Ladung ernst mich verlangsamt. -1 für ARTIK-IDE.

Ich entdeckte serendipitously dass Microsoft VS-Code die ARTIK Entwicklungsumgebung unterstützt und war ** Tonne ** schneller. 10-Sekunden-Kompilierungen (vs. 1 Minute Kompilierungen auf Eclipse / ARTIK-IDE) und 30-Sekunden-entfaltet (im Vergleich zu den 4 Minuten auf ARTIK-IDE). Das Leben hat eine Menge besser danach. (Ich komme zurück kann und einen weiteren Beitrag über VS-Code tun, nur weil ich es singe super vielseitig zu sein, und ein wirklich gutes Werkzeug -., Die mit als virulent anti-microsoft-Antikörpern etwas für jemanden zu sagen, wie ich habe)

Also zog ich alles meine Entwicklung VS-Code und begann, was ich dachte, ein ziemlich einfach Port meinen mbed O I2C CO2-Sensor Code ARTIK des TizenOS wäre. Dort gehe ich wieder zu denken. I2C ist ziemlich einfach. Sie müssen die Adresse des Geräts kennen, die Register Sie auf die Register schreiben möchten Sie lesen möchten, und dass so ziemlich deckt es. Wirklich einfache Sachen.

```cpp
// var 7-bit address of the K30 CO2 Sensor
const int addr = 0xD0;
char cmd[4] = {0x22, 0x00, 0x08, 0x2A};
int ack = i2c.write(addr, cmd, 4);

i2c.read(addr, readBuff, 4, false);
```

Das ist eine 7-Bit-Adresse. Schreiben Sie einen 4-Byte-Befehl an die Adresse, dann lesen Sie ein 4-Byte-Puffer zurück, und ich habe meine Lektüre bekam. Das ist der mbed-O Code oben, durch die Art und Weise. Es funktioniert perfekt, so dass es zu Tizen Portierung sollte einfach peasy.

**Falsch**

Es stellt sich heraus, es ist kleiner als Null-Dokumentation für die ARTIK-0x Linie von Geräten. Es gibt ein paar Beispielprogramme, aber wenn Sie mehr als nur Kompilieren und Ausführen dieser Proben bewegen wollen, sind Sie auf eigene Faust. Samsung scheint zu glauben, dass der Quellcode für i2c.h genug sein sollte, um alles passieren. Sie könnten nicht falscher sein. Wenn Sie die Benutzerforen zu veröffentlichen, erhalten Sie gesagt, „nur den Quellcode zu lesen.“ Das ist kaum eine Antwort, wenn Sie möchten, dass Ihre Entwickler-Plattform nutzen.

Ich bin ziemlich geschickt im Quellcode zu lesen. ** IF ** es ist klar geschrieben und gut dokumentiert. Und das ist das Problem mit dem ARTIK Quellcode. Die Autoren schienen zu glauben, dass nur den Code zu schreiben ausreichen würde. ** Vor allem **, wenn es um die ‚Beispiel‘ Programme. Als Beispiel besteht der websocket Beispiel Code einer einzigen Quelldatei, die 1158 Zeilen lang ist. Hier sind alle Kommentare in der Quelle, Ihnen zu helfen zusammen mit ihm zu verstehen:

```cpp
/// @file app/netutils/websocket/websocket.c
/// @brief websocket file to support client and server.

// if websocket server is initiated from http(s), you just can call this function.
// websocket_server_open function includes:
// 1. allocating socket fd
// 2. accepting client
// 3. authenticating with client
// those 3 are not needed when websocket is initiated from http(s).
```

Das ist richtig, dass die ** ** alle Kommentare von 1158 Zeilen komplizierten websocket Code. Die meiste Code Demo wird in ähnlicher Weise ‚dokumentiert.‘ Dies ist entweder reine Faulheit seitens der Entwickler des Demo-Code oder auch Samsung kümmert sich einfach nicht, wenn ihre Endanwender erfolgreich sind bei Anwendungen, die auf ihrer Plattform zu entwickeln. Ich werde sie den Vorteil des Zweifels und gehen mit Faulheit geben. Als Entwickler selbst, versuche ich so viel in-line Code-Dokumentation zu tun, wie ich vernünftigerweise tun kann, da es nur eine Höflichkeit für den Entwickler ist, die hinter Ihnen kommen. Ich mache es nicht immer mit Code, den ich rein für mich schreiben, aber wenn ich es bin zu veröffentlichen oder verfügbar zu machen, versuche ich wirklich, um es einfach zu folgen. Samsung kümmert sich anscheinend nicht darüber.

Schlussfolgerungen
--------reading_time: 6 minutes
---

Ich bin 9 Tage in und ich habe jetzt *** schließlich *** das I2C-Gerät lesbar auf einer ziemlich konsistente und zuverlässige Basis bekommen. Es war nicht einfach, oder auch nur entfernt angenehm, aber es funktioniert gut genug für mich. Das nächste Bit ist in der Lage sein, die Sensorergebnisse über http zu schreiben - im Idealfall https - zu meinem InfluxDB Server. Deshalb habe ich durch 1158 Zeilen websocket Code an einem Sonntagnachmittag ging. Ihr Sonntag war wahrscheinlich besser, ich gehe davon aus.

Ich bin mir ziemlich sicher, dass das HTTPS POST immer auch über 8 Tage durchgehen wird nehmen, die Samsung selbst die Frage stellen sollen fragen: Wenn jemand dies in einem Tag implementieren kann oder 2 mit mbed, FreeRTOS oder Arduino und es dauert 2 Wochen ARTIK, warum sollte jemand ** ** ARTIK wählen?“ Es ist eine berechtigte Frage, dass ich glaube nicht, dass sie für eine angemessene Antwort.


