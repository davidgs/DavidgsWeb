---
title: "Acceso a la API Swagger con la plataforma Camunda"
Date: 2021-03-10
Author: davidgs
Category: Camunda, BPMN, DevRel
Slug: swagger-api-access-with-camunda-platform
hero: images/mimi-thian-VEKWzpQu-5M-unsplash-2.jpg
---

¿Alguna vez se dispararon hasta la instancia Camunda Plataforma acoplable y deseado poder hacer vivir-llamadas a la API a través de un [servidor arrogancia](https://swagger.io)? ¡Tenemos! Y como la mayoría de cosas que deseamos que podríamos hacer, salir y hacer que suceda.

## Próximamente

Para que quede claro, esta integración se acerca al contenedor oficial Camunda Plataforma acoplable con la liberación de 7.15. No es sólo listo todavía. Así que esto es realmente más de una solución provisional en lugar de ser el alfa y omega-toda la solución, pero funciona, y hace que el envío de llamadas a la API a una instancia en vivo de la Plataforma Camunda mucho más fácil * *. Así que lo sigue y le mostraremos cómo ejecutar por sí mismo.

## CORS es su amigo, y no su amigo

En general, y en el Internet regular, Cruz Origen Resource Sharing (CORS) mantiene seguro al no cargar los recursos de fuentes aleatorias, que no se confía. Esto es generalmente una buena cosa. Hasta que no lo es.

Cuando no es así? Cuando se quiere hacer algo como hacer llamadas de API de un huésped a otro cuando los 2 anfitriones no tienen un acuerdo de confianza explícita. Al igual que entre 2 recipientes acoplables. O entre su ordenador portátil y un recipiente estibador.

Sí, puede entrar y establecer una cabecera en el servidor HTTP de forma que `Access-Control-Allow-Origen: *` y que va a resolver el problema (mientras que la creación de una serie de otros problemas). Pero cuando usted está tratando con un recipiente acoplable pre-construidos que se ejecuta a través de un servicio de Tomcat, nunca es tan simple.

## ¿Cómo funciona este

Decidimos que, dado el tema CORS anteriormente, la forma más sencilla de hacer frente a todo el asunto era añadir un servidor proxy para nginx el contenedor acoplable existente. De esa manera usted puede tener todo en un solo contenedor de ejecución, y no tener que preocuparse por CORS en absoluto.

Hemos realizado cambios en el subyacente ejemplo Plataforma Camunda para hacer este trabajo. Esa instancia sigue siendo accesible a través del puerto 8080 del contenedor del estibador.

Lo que hicimos fue poner el servidor en el puerto 8081 arrogancia dentro de ese mismo contenedor del estibador.

Y ahora que estás pensando "pero eso no resuelve el problema CORS!" y tienes razón, no lo hace. Si vas a la instancia de arrogancia en el puerto 8081 (si exporta ese puerto cuando se inicia el contenedor del estibador) obtendrá el servidor arrogancia y ver las API. Pero si se intenta ejecutar cualquiera de esas llamadas a la API, verá rápidamente el impacto de CORS. Sus llamadas a la API todo fallarán.

![Captura de pantalla que muestra el servidor de la API en el puerto 8081](images/Screen%20Shot%202021-02-19%20at%2012.19.33%20PM.png)

Introduzca nginx. Nginx es un muy pequeño súper servidor, web ligero que se puede configurar para actuar como un proxy. Lo configuro para escuchar en el puerto 8000 del contenedor del estibador, y para llamadas de proxy basado en la URL. escribir en el navegador en http: // ventana acoplable-contenedor: 8000 / docs y nginx se transmita esa llamada al puerto 8081, donde vive el servidor arrogancia. Dirija su navegador a http: // ventana acoplable-contenedor: 8000 / Camunda y se le redirige a la Plataforma Camunda Administrador de tareas estándar, Cabina de mando, etc.

Tendrá que cambiar el puerto en el servidor de arrogancia al puerto 8000 desde el puerto 8080:

![La imagen muestra a través del puerto 8000](images/Screen%20Shot%202021-02-19%20at%2012.21.08%20PM.png)

## Realización de llamadas de la API

¿Por qué es todo esto incluso necesario? Bueno, si alguna vez has querido probar llamadas a la API, a un servidor activo, y obtener resultados reales, a continuación, arrogancia es su amigo.

Swagger le permite hacer llamadas a la API vivas contra una instancia de servidor en ejecución, y obtener resultados reales de vuelta!

![captura de pantalla de llamada a la API en directo](images/Screen%20Shot%202021-02-19%20at%2012.21.36%20PM.png)

Claro, usted podría escribir algo de código para probar cada llamada a la API, pero si desea reducir el tiempo de desarrollo, el uso de un servidor de la API en vivo como arrogancia es definitivamente el camino a seguir.

Si desea ver exactamente lo que se devuelve como una carga útil de una llamada a la API dado, arrogancia es también su amigo:

![Los resultados de una llamada a la API en directo](images/Screen%20Shot%202021-02-22%20at%2010.46.52%20AM.png)

Como se puede ver, se obtiene el `comando completo curl` podría utilizar, los datos devueltos, que luego se puede utilizar para asegurarse de que su programa puede manejar adecuadamente el mensaje devuelto, así como las cabeceras de respuesta completa.

## ¿Cómo se puede conseguir esto?

Una vez más, a la repetición, esto es actualmente * no * es parte de la imagen oficial Camunda Plataforma estibador. Se va a venir con el lanzamiento de 7,15, pero no lo es en este momento.

Una vez dicho esto, todavía se puede tener acceso a ella, y lo utilizan.

En primer lugar, tendrá que clonar el repositorio adecuado que es [aquí](https://github.com/camunda-community-hub/docker-camunda-bpm-platform/tree/swagger). Esto es un clon del repositorio oficial Camunda Plataforma acoplable, y una rama swagger` especial '.

```
% git clone https://github.com/camunda-community-hub/docker-camunda-bpm-platform/tree/swagger
```
debe hacerlo por usted.

Ahora tendrá que construir esa imagen un estibador adecuada en. Esto puede tomar algún tiempo que se descargan todos los componentes.

```
% cd docker-camunda-bpm-platform
docker-camunda-bpm-platform % git status
On branch swagger
Your branch is up to date with 'camunda-community-hub/swagger'.

nothing to commit, working tree clean
% (base) davidgs@MacBook-Pro docker-camunda-bpm-platform % docker build . --rm -t camunda-bpm-plaform:swagger
Successfully built db270d32507f
Successfully tagged camunda-bpm-platform:swagger
%  docker-camunda-bpm-platform % Docker image list
REPOSITORY                     TAG       IMAGE ID       CREATED         SIZE
camunda-bpm-platform           swagger   db270d32507f   5 seconds ago   333MB
```
Por lo que ahora está construido. Usted tiene la imagen listo para funcionar. Todo lo que queda es para ejecutarlo!

```
% docker run -p 8000:8000 db270d32507f
```

Se debe tomar alrededor de 30-45 segundos para empezar todo, pero a continuación, puede escribir en el navegador [http: // localhost: 8000 / docs](http://localhost:8000/docs) para el servidor de arrogancia, o) para el servidor de arrogancia, o [ http: // localhost: 8000 / Camunda](http://localhost:8000/camunda) para la plataforma de Camunda.

Puede utilizar Camunda Modeler para desplegar y ejecutar modelos cambiando el puerto de despliegue de `` 8080` a 80000`

![implementación Camunda Modeler](images/Screen%20Shot%202021-02-22%20at%2011.23.19%20AM.png)

Y ya está todo hecho!
