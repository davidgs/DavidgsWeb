---
title: « Jouer avec la distance »
Date: 2017-06-01
Author: davidgs
Category: Gadgetry, IoT
Slug: playing-with-distance
hero: images/3317-03.jpg
---

Je joue avec un groupe de capteurs différents ces derniers temps (voir [ici](/posts/category/iot/iot-software/building-an-app-with-apache-mynewt/)) donc je pensais que je ferais une autre petite écriture d'elle. Je creusais mon)) donc je pensais que je ferais une autre petite écriture d'elle. Je creusais mon [particules](https://particle.io/) Photon à jouer avec après avoir été inspiré à un) Photon à jouer avec après avoir été inspiré à un [NC RIOT](https://www.meetup.com/NC-RIoT-Regional-Internet-of-Things/) événement il y a quelques semaines et il avait été) événement il y a quelques semaines et il avait été [longtemps](/posts/category/iot/iot-hardware/new-hardware/) depuis que je l'avais dehors. Je ne vais pas partager exactement le problème que je tente de résoudre avec cette petite application, car il est encore un travail en cours et peut très bien finir par être un produit bientôt, mais je vais vous dire comment je le fais .

## Ultrasons

J'ai commencé à l'aide d'un [MaxBotics](http://www.maxbotix.com) capteur à ultrasons, mais il était très peu satisfaisant car il était dans une boîte, et des capteurs à ultrasons dans des espaces confinés sont vraiment problématiques. Les ondes sonores rebondissent beaucoup et provoquent toutes sortes de effets secondaires qui sont difficiles à compenser. De plus, ils sont tout simplement pas ** ** que précis. Ultrasons ne fonctionnerait tout simplement pas ma demande.

![Motif faisceau MB1034](/posts/category/iot-iot-software/images/Beam-Pattern-MB1034.gif)

Vous remarquerez que le « cône » se développe essentiellement comme un carré. à 6" la distance, il est 6" de large. Si votre boîte est inférieure à 6" de large, vous êtes déjà trouvé une réflexion et une lecture d'une mesure de distance, ce qui est pas ce que vous voulez.

## Let There Be (Invisble) Lumière!

Ensuite, je trouve ce petit capteur. Le temps [Adafruit VL530L0X](https://www.adafruit.com/product/3317) du capteur de vol. Le conseil d'administration lui-même est inférieure à 1 pouce carré, ce qui est vraiment agréable. Il est aussi parfaitement plat qui, pour une application qui veut quitter tout le volume de la boîte inoccupée, est également très agréable. Mais la meilleure partie est qu'il a son propre autonome laser et des mesures de temps de vol de la lumière à la cible. La puce, ce qui est de la taille d'un grain de riz, sans donner un laser invisible et mesure le temps de retour pour déterminer la distance. Le fait qu'il peut déterminer cette fois sur une distance de 50 mm est vraiment remarquable. Être léger et ne pas sembler aussi moyen que ce soit une mesure très concentrée sans cône de plus en plus de réflexion. Bien sûr, ce moyen de placement du capteur est assez importante.

![Bounce3](/posts/category/iot-iot-software/images/Bounce3.png)

Cette évidence ne fonctionnera pas. Le capteur doit être placé directement sur la surface de mesure, et le plus plat possible.

![Bounce2](/posts/category/iot-iot-software/images/Bounce2.png)

Il est intéressant avec ce capteur la surface de mesure ne doit pas être blanc, ou même tout ce réfléchissant. Je l'ai testé des résultats avec toutes sortes de couleurs et matériaux différents (noir, rouge, blanc, papier, carton, plastique transparent, etc.) et les résultats sont étonnamment bons. Mes tests de distance moyenne et la variance ne semblent pas changer, peu importe quel matériel je mesure contre. C'est une bonne chose!

## d'étalonnage et de la lecture

Il y a une certaine quantité de gigue dans les lectures, donc afin de lisser les résultats, je suis calent une moyenne de lecture vide, et la variance moyenne des lectures:

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

Je trouve que la moyenne sur environ 100 échantillons me donne une bonne mesure de référence, avec environ un écart de 2 mm 'de gigue. Dans une boîte de 200mm, qui est un écart de 2%, ce qui est vraiment très bon et tout à fait acceptable. Quand je suis en train de faire les mesures en temps réel, je dois prendre un tas de mesures et les moyenner et à cause de cette instabilité. Pas autant, bien sûr.

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

Je n'ai pas besoin de calculer la variance dans ces échantillons plus courts que la variance semble en moyenne la même que la variance globale calculée au cours de la procédure d'étalonnage.

Je ne trouve que je suis un montant juste des lectures faussement positives si je viens comparais une lecture à la valeur « vide » ± la variance calculée, donc pour la stabilité j'ai simplement ajouté 2 à la variance moyenne - je suis arrivé à ce nombre par essais et erreurs, il est donc pas scientifique ou quoi que ce soit - et tout écart par rapport à la variance ± 2 je traite comme un « événement ». Jusqu'à présent, qui a été très précis sur une grande variété de tests avec un grand nombre de mesures.

## maigris

Je voulais être en mesure de mesurer la mise en place de même une seule carte de visite dans cette case. Une carte de visite est, bien sûr, moins de 1 mm d'épaisseur, mais il est toujours possible. J'ai simplement fait le plancher de la boîte légèrement ondulée, et « tirer » au fond de l'une des ondulations.

![Bounce5](/posts/category/iot-iot-software/images/Bounce5.png)

Ils sont à peu près en profondeur de 3 mm, de sorte qu'une seule carte de visite placée sur les registres de surface assez bien. Problème résolu!

Donc, c'est mon exercice de mesure de distance pour la journée. J'espère que tu as trouvé ça utile!
