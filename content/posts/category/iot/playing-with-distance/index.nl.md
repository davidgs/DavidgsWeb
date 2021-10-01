---
title: "Het spelen met de afstand"
Date: 2017-06-01
Author: davidgs
Category: Gadgetry, IoT
Slug: playing-with-distance
hero: images/3317-03.jpg
reading_time: 5 minutes
---

Ik heb gespeeld met een bos van verschillende sensoren de laatste tijd (zie [hier] (/ berichten / category / iot / iot-software / het bouwen van een-app-met-apache-mynewt /)) dus ik dacht dat ik zou doen een andere kleine write-up ervan. Ik mijn [Particle](/posts/category/iot/iot-software/building-an-app-with-apache-mynewt/) Photon gegraven om het afspelen mee na te zijn geïnspireerd op een [NC Riot] (https://www.meetup.com/NC-RIoT-Regional-Internet-of -Things /) evenement een paar weken geleden en het was een [lange tijd] (/ berichten / category / iot / iot-hardware / new-hardware /) sinds ik het had gehad uit. Ik ben niet van plan om het exacte probleem dat ik probeerde op te lossen met deze kleine applicatie te delen, want het is nog steeds een work in progress en kan heel goed uiteindelijk een product snel, maar ik zal je vertellen hoe ik het doe .

## Ultrasonics

Ik begon met behulp van een [MaxBotics](http://www.maxbotix.com) ultrasone sensor, maar het was zeer onbevredigend was in een doos, en ultrasone sensoren in besloten ruimten erg problematisch. Geluidsgolven stuiteren rond veel en veroorzaken allerlei neveneffecten die moeilijk te compenseren zijn. Plus ze zijn gewoon niet **dat** nauwkeurig. Ultrasonics gewoon niet zou werken voor mijn toepassing.

![Beam Pattern MB1034](/posts/category/iot-iot-software/images/Beam-Pattern-MB1034.gif)

U zult merken dat de 'cone' uitbreidt in principe als een vierkant. 6" afstand is 6" breed. Als uw box is minder dan 6" breed, je al het krijgen van een reflectie, en een lezing van een afstandsmeting, dat is niet wat je wilt.

## Let There Be (Invisble) Licht!

Toen vond ik dit kleine sensor. De [Adafruit VL530L0X](https://www.adafruit.com/product/3317) Time of Flight Sensor. Het bord zelf is minder dan 1 vierkante inch, dat is erg leuk. Het is ook perfect flat, die, voor een toepassing die wil het gehele volume van de doos onbezet verlaten, is ook erg aardig. Maar het beste deel is dat het heeft zijn eigen self-contained laser en maatregelen time-of-flight van het licht naar het doel. De chip, die ongeveer de grootte van een rijstkorrel vuurt een onzichtbare laser en meet de terugkeer tijd om afstand te bepalen. Het feit dat het deze keer over een 50 mm afstand kan bepalen is echt opmerkelijk. Omdat het licht en niet klinken ook betekent dat het een zeer gericht meting zonder een steeds groter kegel van reflectie. Uiteraard betekent dit plaatsing van de sensor is vrij belangrijk.

![Bounce3](/posts/category/iot-iot-software/images/Bounce3.png)

Dit zal uiteraard niet werken. De sensor moet worden aangebracht direct boven het meetoppervlak en zo vlak mogelijk.

![Bounce2](/posts/category/iot-iot-software/images/Bounce2.png)

Interessant genoeg met deze sensor het meetoppervlak niet hebben witte, of zelfs alles reflectief zijn. Ik heb getest resultaten met allerlei verschillende materialen en kleuren (zwart, rood, wit, papier, karton, doorzichtige plastic, etc.) en de resultaten zijn verbazingwekkend goed. Mijn tests van de gemiddelde afstand en de variantie lijken niet maakt niet uit welk materiaal ik het meten tegen veranderen. Dat is een goed ding!

## Kalibratie en Reading

Er is een zekere mate van jitter in de lezingen, dus om de resultaten glad, ik eerst een lege gemiddelde metingen, en de gemiddelde variatie in metingen kalibreren:

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

Ik vond dat een gemiddelde van meer dan ongeveer 100 monsters geeft me een goede nulmeting, met ongeveer 2mm 'jitter' variantie. In een 200mm doos, dat is een 2% variantie, dat is echt heel goed en volledig aanvaardbaar. Als ik eigenlijk aan het doen de realtime metingen, moet ik een bos van metingen te verrichten en het gemiddelde van ze net zo goed als gevolg van deze jitter. Niet zo veel, natuurlijk.

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

Ik heb niet nodig is om de variantie te berekenen in deze kortere monsters als de variantie lijkt tot gemiddeld uit hetzelfde als de totale variantie berekend tijdens de kalibratie routine.

Ik vond dat ik een eerlijk bedrag van vals-positieve resultaten als ik een lezing aan het 'lege' waarde ± de berekende variantie vergeleken, dus voor de stabiliteit ik gewoon toegevoegd 2 aan de gemiddelde variantie - Ik kwam op dat nummer door trial and error, dus het is geen wetenschappelijke of wat dan ook - en elke afwijking van variantie ± 2 behandel ik als een 'event'. Tot nu toe, dat de zeer nauwkeurige over een breed scala van tests met een groot aantal metingen geweest.

## Getting Thinner

Ik wilde in staat zijn om de plaatsing van zelfs een enkel visitekaartje te meten in dit vak. Een visitekaartje is natuurlijk minder dan 1mm dik, maar het is nog steeds mogelijk. Ik alleen maakte de vloer van de box enigszins gegolfd, en 'schieten' onderaan een van de golvingen.

![Bounce5](/posts/category/iot-iot-software/images/Bounce5.png)

Ze zijn ongeveer 3 mm diep, zodat een enkele visitekaartje op het oppervlak registers geplaatst heel goed. Probleem opgelost!

Dus dat is mijn afstandsmeting oefening voor de dag. Ik hoop dat je vond het nuttig!
