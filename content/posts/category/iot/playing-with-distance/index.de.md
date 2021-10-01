---
title: „Spiel mit dem Abstand“
Date: 2017-06-01
Author: davidgs
Category: Gadgetry, IoT
Slug: playing-with-distance
hero: images/3317-03.jpg
reading_time: 5 minutes
---

Ich habe mit einer Reihe von verschiedenen Sensoren spielt in letzter Zeit (siehe [hier](/posts/category/iot/iot-software/building-an-app-with-apache-mynewt/)), so dachte ich, ich tun würde weitere kleine Zuschreibung von ihm. Ich grub meine)), so dachte ich, ich tun würde weitere kleine Zuschreibung von ihm. Ich grub meine [Particle](https://particle.io/) Photon zum Spielen mit nach an einem) Photon zum Spielen mit nach an einem [NC RIOT] inspiriert (https://www.meetup.com/NC-RIoT-Regional-Internet-of -Things /) Veranstaltung vor ein paar Wochen und es war eine [lange Zeit](https://www.meetup.com/NC-RIoT-Regional-Internet-of-Things/), da ich es heraus gehabt hatte. Ich werde nicht das genaue Problem teilen, die ich mit dieser kleinen Anwendung zu lösen versuche, wie es läuft immer noch ein Werk ist und sehr gut am Ende möglicherweise bald ein Produkt sein, aber ich werde Ihnen sagen, wie ich es tue, .

## Ultrasonics

Ich begann mit einem [MaxBotics](http://www.maxbotix.com) Ultraschall-Sensor, aber es war sehr unbefriedigend, da es in einer Kiste war, und Ultraschallsensoren in geschlossenen Räumen sind wirklich problematisch. Die Schallwellen prallen viel herum und verursachen alle möglichen Nebenwirkungen, die schwer zu kompensieren. Und sie sind nur nicht ** **, dass genau. Ultrasonics wäre einfach nicht für meine Anwendung arbeiten.

![Strahlmuster MB1034](/posts/category/iot-iot-software/images/Beam-Pattern-MB1034.gif)

Sie werden feststellen, dass die ‚Kegel‘ im Wesentlichen als Quadrat erweitert. bei 6" Entfernung ist, ist es 6" breit. Wenn Ihr Feld weniger als 6" breit, sind Sie bereits eine Reflexion bekommen, und ein Lesen einer Entfernungsmessung, das ist nicht das, was Sie wollen.

## Let There Be (Invisble) Licht!

Dann fand ich diesen kleinen Sensor. Die [Adafruit VL530L0X](https://www.adafruit.com/product/3317) Flugzeit-Sensor. Die Platine selbst ist weniger als 1 Quadratzoll, was wirklich schön ist. Es ist auch vollkommen flach, die für eine Anwendung, die das gesamte Volumen der Box nicht besetzten verlassen will, auch sehr nett ist. Aber der beste Teil ist, dass es seine eigene in sich geschlossene hat Laser und misst die Zeit-of-Flight des Lichts auf das Ziel. Der Chip, der etwa die Größe eines Reiskorns ist, feuert einen unsichtbaren Laser und misst die Rendite Zeitabstand zu bestimmen. Die Tatsache, dass es dieses Mal über einen 50mm Abstand bestimmen kann, ist wirklich bemerkenswert. Leicht und nicht auch Mittel klingen, dass es ohne einen ständig wachsenden Kegel Reflexion eine sehr konzentrierte Messung ist. Natürlich ist das Mittel Platzierung des Sensors ziemlich wichtig.

![Bounce3](/posts/category/iot-iot-software/images/Bounce3.png)

Dies wird sich natürlich nicht funktionieren. Der Sensor muss direkt über die Messoberfläche platziert wird, und so flach wie möglich.

![Bounce2](/posts/category/iot-iot-software/images/Bounce2.png)

Interessanterweise mit diesem Sensor der Messfläche muss nicht weiß sein, oder sogar alles, was reflektierend. Ich habe getestet Ergebnisse mit allen möglichen verschiedenen Materialien und Farben (schwarz, rot, weiß, Papier, Pappe, durchsichtiger Kunststoff, etc.), und die Ergebnisse sind erstaunlich gut. Meine Tests des durchschnittlichen Abstandes und die Varianz scheinen nicht egal zu ändern, was Material, das ich gegen mich zu messen. Das ist gut!

## Kalibrierung und Reading

Es gibt eine gewisse Menge an Jitter in den Ablesungen, so, um die Ergebnisse zu glätten, ich zuerst eine leere Lese durchschnittliche kalibrieren, und die mittlere Abweichung der Ablesungen:

```cpp
#define SAMPLE_SIZE 100 // sample size for calibration of empty box
#define AV_SAMPLE 10 // sample size for each reading averaging
int variance = 0;
int empty = 0;

int calibrate(void) {
  empty = 0;
  int x = 0;
  int prevVal = 0;
  int val = 0;
  while(x < SAMPLE_SIZE){
    if (measure.RangeStatus != 4) {
      prevVal = val;
      val = measure.RangeMilliMeter;
      variance += abs(val-prevVal);
      empty += val;
    } else {
      mailStat = "Mailbox Sensor Error!";
      return -1;
    }
    x++;
    delay(SAMPLE_SIZE/10);
  }
  empty = empty/SAMPLE_SIZE;
  variance = variance/SAMPLE_SIZE;
  return 0;
}
```

Ich fand, dass ich über 100 Proben von durchschnittlich über gibt eine gute Ausgangsmessung, mit einem etwa 2 mm ‚Jitter‘ Varianz. In einer 200-mm-Box ist, dass eine 2% Abweichung, die wirklich sehr gut ist und völlig akzeptabel. Wenn ich die Echtzeit-Messungen tatsächlich tun, ich brauche eine Reihe von Messungen und mitteln sie auch wegen dieser Jitter. Nicht so viele, natürlich.

```cpp
int getRangeReading(void){
  int count = 0;
  int av = 0;
  while(count < AV_SAMPLE){
    lox.rangingTest(&measure, false);
    if (measure.RangeStatus != 4) {
      av += measure.RangeMilliMeter;
    } else {
      mailStat = "Mailbox Sensor Error!";
      return -1;
    }
    count++;
    delay(AV_SAMPLE);
  }
  av = av/AV_SAMPLE;
  return av;
}
```

Ich habe nicht nötig, um die Varianz in diesen kürzeren Proben zu berechnen, wie die Varianz die gleichen wie die Gesamtvarianz während der Kalibrierungsroutine berechnet zu auszumitteln scheint.

Ich fand, dass ich eine ganze Menge falsch-positiver Lesungen bekam, wenn ich nur eine Lesung mit dem ‚leeren‘ Wert ± die berechnete Varianz verglichen, so für Stabilität ich einfach 2 auf die durchschnittliche Varianz hinzugefügt - ich bei dieser Zahl kam durch Versuch und Irrtum, so dass es keine wissenschaftliche oder irgendetwas ist - und jede Abweichung von Abweichung ± 2 I treat als ‚Ereignis‘. Bisher worden, dass die hochgenaue über eine Vielzahl von Tests mit einer großen Anzahl von Messungen.

## immer dünner

Ich wollte in der Lage sein, die Platzierung auch nur eines einzigen Visitenkarte in diesem Feld zu messen. Eine Visitenkarte ist natürlich, weniger als 1 mm dick, aber es ist immer noch möglich. Ich habe einfach den Boden der Box leicht gewellt, und ‚Shoot‘ auf den Boden einer der Wellen gemacht.

![Bounce5](/posts/category/iot-iot-software/images/Bounce5.png)

Sie sind etwa 3 mm tief, so dass eine einzelne Visitenkarte auf den Registern recht gut Oberfläche gelegt. Problem gelöst!

Also das ist meine Wegmessung Übung für den Tag. Ich hoffe, dass Sie es nützlich gefunden!
