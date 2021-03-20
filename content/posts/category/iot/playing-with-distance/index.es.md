---
title: "Jugar con la distancia"
Date: 2017-06-01
Author: davidgs
Category: Gadgetry, IoT
Slug: playing-with-distance
hero: images/3317-03.jpg
---

He estado jugando con un montón de diferentes sensores últimamente (ver [aquí](/posts/category/iot/iot-software/building-an-app-with-apache-mynewt/)), así que pensé que lo haría otro pequeño reportaje de la misma. Cavé mi)), así que pensé que lo haría otro pequeño reportaje de la misma. Cavé mi [partículas](https://particle.io/) de fotones a jugar con después de haber sido inspirado en una) de fotones a jugar con después de haber sido inspirado en una [NC antidisturbios](https://www.meetup.com/NC-RIoT-Regional-Internet-of-Things/) evento de hace unas semanas y que había sido un) evento de hace unas semanas y que había sido un [mucho tiempo](/posts/category/iot/iot-hardware/new-hardware/) desde que había tenido hacia fuera. No voy a compartir el problema exacto que estaba tratando de resolver con esta pequeña aplicación, ya que es todavía un trabajo en progreso y puede muy bien llegar a ser un producto muy pronto, pero voy a decir cómo lo estoy haciendo .

## Ultrasonidos

Empecé usando un [MaxBotics](http://www.maxbotix.com) sensor ultrasónico, pero era muy insatisfactoria, ya que estaba dentro de una caja, y sensores de ultrasonidos en espacios confinados son realmente problemático. Las ondas sonoras rebotan mucho y causan todo tipo de efectos secundarios que son difíciles de compensar. Además de que no son ** ** que precisa. Ultrasonidos simplemente no funcionaría para mi aplicación.

![Patrón de haz MB1034](/posts/category/iot-iot-software/images/Beam-Pattern-MB1034.gif)

Se dará cuenta de que el 'cono' se expande, básicamente, como un cuadrado. a las 6" distancia, es 6" de ancho. Si el cuadro es menos de 6" de ancho, que está ya recibiendo una reflexión, y la lectura de una medición de distancia, que no es lo que desea.

## Que no haya (Invisble) Luz!

Entonces me encontré con este pequeño sensor. El [Adafruit VL530L0X](https://www.adafruit.com/product/3317) Tiempo de Vuelo del sensor. La propia placa es inferior a 1 pulgada cuadrada, que es muy agradable. También es perfectamente plana, que, para una aplicación que quiere dejar todo el volumen de la caja desocupada, es también muy agradable. Pero la mejor parte es que tiene su propio láser autónomo y medidas de tiempo de vuelo de la luz a la meta. El chip, que es aproximadamente del tamaño de un grano de arroz, dispara un láser invisible y mide el tiempo de retorno para determinar la distancia. El hecho de que se puede determinar esta vez sobre una distancia de 50 mm es realmente notable. Ser luz y no sonar también significa que se trata de una medida muy centrado sin una cada vez mayor del cono de reflexión. Por supuesto, esta colocación de medios del sensor es bastante importante.

![Bounce3](/posts/category/iot-iot-software/images/Bounce3.png)

Esto, obviamente, no va a funcionar. El sensor debe ser colocado directamente sobre la superficie de medición, y lo más plana posible.

![Bounce2](/posts/category/iot-iot-software/images/Bounce2.png)

Curiosamente con este sensor de medición de la superficie no tiene que ser de color blanco, o incluso todo lo reflexivo. He probado resultados con todo tipo de diferentes materiales y colores (negro, rojo, blanco, papel, cartón, plástico transparente, etc.), y los resultados son sorprendentemente buenos. no parecen mis pruebas de media distancia y la varianza de cambiar, no importa qué material que estoy midiendo en contra. ¡Eso es bueno!

## Calibración y lectura

Hay una cierta cantidad de fluctuación en las lecturas, por lo que con el fin de suavizar los resultados, primero calibrar un promedio de lectura de vacío, y la varianza media de las lecturas:

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

He descubierto que un promedio de más de aproximadamente 100 muestras me da una medida buena línea de base, con alrededor de una variación de 2 mm 'jitter'. En una caja de 200 mm, que es una variación del 2%, que es bastante buena y completamente aceptable. Cuando en realidad estoy haciendo las mediciones en tiempo real, tengo que tomar un montón de mediciones y los medios como así debido a esta fluctuación. No como muchos, por supuesto.

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

No he necesitado para calcular la variación en estas muestras más cortas como la varianza parece promediar la misma que la varianza global calculada durante la rutina de calibración.

Me pareció que me dieron una buena cantidad de lecturas de falsos positivos si sólo comparaba una lectura con el valor 'vacío' ± la varianza calculada, por lo que para la estabilidad simplemente agregué 2 a la varianza media - llegué a ese número por ensayo y error, así que no es científico ni nada - y cualquier desviación de la varianza ± 2 que tratar como un 'evento'. Hasta ahora, eso ha sido de gran precisión en una amplia variedad de pruebas con un gran número de mediciones.

## Adelgazando

Yo quería ser capaz de medir la colocación de incluso una sola tarjeta de visita en esta caja. Una tarjeta de visita es, por supuesto, a menos de 1 mm de espesor, pero aún así es posible. Simplemente hice el piso de la caja ligeramente ondulado, y 'shoot' a la parte inferior de una de las ondulaciones.

![Bounce5](/posts/category/iot-iot-software/images/Bounce5.png)

Son alrededor de 3 mm de profundidad, por lo que una sola tarjeta de visita colocado en los registros de superficie bastante bien. ¡Problema resuelto!

Así que esa es mi ejercicio medición de distancia durante el día. Espero que hayas encontrado útil!
