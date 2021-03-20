---
title: "Intel Edison Big Hut, kein Vieh"
Date: 2015-12-11
Author: davidgs
Category: IoT
Slug: intel-edison-big-hat-no-cattle
hero: images/NewImage.png
---

Es war fast genau ein Jahr her, dass ich meine ersten Intel Edison Development Kit gekauft. Ich war alles über die Aussichten davon begeistert, wie man sehen kann [hier](/posts/category/iot/iot-hardware/intel-edison-iot-board/). Es ist eine schöne, kleine, leistungsfähige (wenn machthungrigen) IoT Board, dass viel versprechend für die Entwicklung und Prototyping statt.

Ich wünschte, ich immer noch darüber, wie aufgeregt war.

Ich habe versucht, ein paar Mal, es für einige Entwicklungsprojekt oder ein anderes zu verwenden. Ich versuche auch jetzt wieder. Meine Erfahrung hat als positives weniger gewesen. In der Tat enttäuschend ist es geradezu. Nun, einer meiner [anfänglichen gripes](/posts/category/iot/iot-hardware/intel-edison-iot-board/) über die Plattform war die einfache Bedienung und die nicht-intuitive Prozess für Blink- / Modernisierung / etc . Die Tafel. Um fair zu sein, hat Intel daran gearbeitet, und es gibt jetzt einige recht ordentlich Tools für das Board zu verwalten.

That being said, es gibt viel mehr, dass ** nicht ** Arbeit auf diesem Board als der Fall ist. Zum Beispiel SPI. Das ist Satz eines großen, für mich. Ich etwa ein Monat Arbeits verbrachte ein SPI-Gerät an der Arbeit mit dem Brett auf immer und traf nichts als Probleme. Wiederholte Beiträge zu den Intel Developer Forum lösten eine Reihe von kryptischen Antworten darauf hinweisen, dass ich die Dinge falsch Einhaken wurde das SPI-Gerät nicht richtig funktioniert, etc. Es * ist * ein experimentelles Gerät, so dass diese Dinge waren plausibel. Bis ich einen Logikanalysator bekam und die Signale kommen aus dem Edison tatsächlich korrigiert. Es wurde dann klar, dass SPI auf dem Mini-Ausbruch-Brett hoffnungslos gebrochen war. An diesem Punkt bestätigte Intel, dass SPI gebrochen war. Sie hätten mir eine Menge Zeit gespart hatte sie zu diesem früheren abgekriegt. So SPI ist aus.

Ok, SPI ist hoffnungslos gebrochen. Lassen Sie uns versuchen I2C. Bisher war die Erfahrung mit I2C war ungefähr ähnlich. Ich werde sagen, dass mit internen Pull-up-Widerständen an den Stiften, dass ich einstellen kann auf vordefinierte Werte sehr hilfreich ist. Dokumentation über I2C - und die Pull-up-Widerstände - wie alle der Dokumentation Edison, ist ziemlich dünn, aber wenn Sie sich hartnäckig in der Suche im Internet, können Sie die Antworten finden Sie brauchen (Hinweis: `cd / sys / kernel / debug / gpio_debug /<pin number> `Und dann schauen Sie in` available_pullmode`, `available_pullstrength` für akzeptable Werte, dann den Wert, den Sie in` current_pullmode` wollen setzen und `current_pullstrength`. Nie sagen, ich war nicht hilfreich.)

Ich habe die SDA / SCL Pull-up-Widerstände richtig eingestellt ist, und die Richtung Satz richtig, und das Gerät, das ich mit gerade arbeite ist jetzt zumindest ** ** gesehen auf dem I2C-Bus. Aber das ist etwa so weit wie ich bekommen kann. In der Theorie hat der I2C-Bus mehrere Geschwindigkeiten, aber in Wirklichkeit ist es ziemlich gut bei 300kHz stecken. Mein Gerät ist 100 kHz. Auch in der Theorie können Sie die Geschwindigkeit ändern, aber zumindest in Wirklichkeit ist dies die Beiträge und Antworten auf alle nach, den einzigen Weg, um effektiv zu tun werden, um den gesamten Linux-Kernel, wieder aufbauen und selbst dann, YMMV.

Unnötig zu sagen, habe meine Laufleistung variieren. Ich habe versucht mit Javascript (Node.js), Python, C und Arduino Skizzen Zugriff auf den I2C-Bus zu gewinnen und dieses Gerät und jeder versagt - in ganz unterschiedlicher Weise. Das ist nicht eine gute Sache.

Das Gerät Ich verwende, a [Melexis MLX90614](https://www.sparkfun.com/datasheets/Sensors/Temperature/MLX90614_rev001.pdf) (PDF) IR-Thermometer, hat auch einen PWM-Modus. Ok, letzte Chance, Edison. Spiel weiter!

Erraten Sie, was? Intel Edison nur, dass PWM aus. Keine PWM in. So kann ich das Gerät nicht lesen. Wenn es ein Servo wäre, würde ich ganz eingestellt werden. Aber es ist nicht. Also noch einmal, finde ich den Intel Edison verheißungsvoll zu sein, ohne die Fähigkeit zu liefern.

Ich halte werde darauf hämmere, und sehen, ob ich schließlich den Edison bekommen kann alles nützlich, aber bisher zu tun, es ist ein nettes kleines Gerät, das nicht im Geringsten nützlich ist. Kraftvoll, aber nutzlos.
