---
title: "Haga su ARTIK-520 Scream"
Date: 2017-03-06
Author: davidgs
Category: IoT
Tags: ARTIK, ARTIK-520, IoT, Java
Slug: make-your-artik-520-scream
hero: images/Zulu-Duke200.png
---

Si se lee [el post de la semana pasada](/posts/category/general/making-artik-5-iot-gateway-kura/) sobre cómo presentar una ARTIK-520 un dispositivo IO puerta de enlace mediante el) sobre cómo presentar una ARTIK-520 un dispositivo IO puerta de enlace mediante el [proyecto Eclipse Kura](http://www.eclipse.org/kura/), entonces esto va a ser una mejora notable para usted si usted va a hacerlo por uno mismo (y por qué no? fue una excelente poca Cómo sobre cómo empezar a ARTIK- 520 y la IO!)

Se sugirió a mí (estos pequeños chirridos me siguen alimentando pepitas interesantes para probar) que trato la [JVM Azul Zulu Embedded](https://www.azul.com/products/zulu-embedded/) como una alternativa a la OpenJDK JVM que se instala de forma predeterminada. Ok, claro, por qué no. Que es lo peor que puede pasar. No responder a eso.

De todos modos, esto va a ser un post corto. Lo intenté. He descargado el Zulu JVM e instalado de esta manera:

```
[root@localhost ~]# tar xvf ezdk-1.8.0_112-8.19.0.31-eval-linux_aarch32hf.tar
[root@localhost ~]# update-alternatives --install /usr/bin/java java ~/ezdk-1.8.0_112-8.19.0.31-eval-linux_aarch32hf/jre/bin/java 100
[root@localhost ~]# update-alternatives --config java
[root@localhost ~]# systemctl restart kura.service 
```

Ahora recargar la consola Web Kura en su navegador.

Al menos para mí, hubo una mejora muy notable y marcada en el rendimiento del servicio web. Al igual que en I ** ** realmente notado. Pero, de nuevo, a pesar de que era demasiado educado para comentarios al respecto en mi [post anterior](/posts/category/general/making-artik-5-iot-gateway-kura/), me había dado cuenta de que el rendimiento de Kura tenía sido poco lento. Yo sólo lo atribuyó al hecho de que nos estamos quedando en algún hardware embebido y eso es casi siempre más lento que las plataformas más robustas. Pero se consigue un alto rendimiento JVM y obtener unos pocos segundos de su vida de nuevo cada vez que tome una acción en Kura. Esos son segundos que, una vez perdida, usted nunca ha llegado de nuevo. Segundos que ahora se puede utilizar para explicar plenamente 'su' en los mensajes de texto en lugar de simplemente escribiendo 'ur'. Esto hará que el mundo sea un lugar mejor para todos.
