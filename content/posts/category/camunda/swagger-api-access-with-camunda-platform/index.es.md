---
title: "Acceso a la API Swagger con Camunda Platform"
Date: 2021-03-10
Author: davidgs
Category: Camunda, BPMN, DevRel
Slug: swagger-api-access-with-camunda-platform
hero: images/mimi-thian-VEKWzpQu-5M-unsplash-2.jpg
---

¿Alguna vez ha activado la instancia de Camunda Platform Docker y ha deseado poder hacer llamadas en vivo a la API a través de un [servidor swagger](https://swagger.io)? ¡Tenemos! Y como la mayoría de las cosas que nos gustaría poder hacer, salimos y lo hacemos realidad.

## Próximamente, en breve, pronto

Para ser claros, esta integración llegará al contenedor oficial de Camunda Platform Docker con la versión 7.15. Simplemente no está listo todavía. Por lo tanto, esta es más una solución provisional que la solución total y definitiva, pero funciona y hace que el envío de llamadas API a una instancia en vivo de Camunda Platform sea mucho*mucho* más fácil. Así que sígalo y le mostraremos cómo ejecutarlo usted mismo.

## CORS es tu amigo, no tu amigo

En general, y en Internet, el uso compartido de recursos de origen cruzado (CORS) lo mantiene seguro al no cargar recursos de fuentes aleatorias y no confiables. Por lo general, esto es algo bueno. Hasta que no lo sea.

¿Cuándo no es así? Cuando desee hacer algo como realizar llamadas a la API de un host a otro cuando los 2 hosts no tienen un acuerdo de confianza explícito. Como entre 2 contenedores Docker. O entre su computadora portátil y un contenedor Docker.

Sí, puede ingresar y establecer un encabezado en el servidor HTTP como `Access-Control-Allow-Origin: *` y eso resolverá el problema (mientras crea una serie de otros problemas). Pero cuando se trata de un contenedor Docker prediseñado que ejecuta un servicio a través de tomcat, nunca es tan simple.

## Cómo funciona

Decidimos que, dado el problema de CORS anterior, la forma más sencilla de abordar todo el asunto era agregar un servidor proxy nginx al contenedor Docker existente. De esa manera, puede hacer que todo se ejecute en un contenedor y no tener que preocuparse por CORS en absoluto.

No hicimos cambios en la instancia de Camunda Platform subyacente para que esto funcione. Esa instancia todavía es accesible a través del puerto 8080 del contenedor Docker.

Lo que hicimos fue agregar el servidor swagger en el puerto 8081 dentro de ese mismo contenedor Docker.

Y ahora estás pensando "¡pero eso no resuelve el problema de CORS!" y tienes razón, no es así. Si va a la instancia de swagger en el puerto 8081 (si exporta ese puerto cuando inicia el contenedor Docker) obtendrá el servidor swagger y verá las API. Pero si intenta ejecutar cualquiera de esas llamadas a la API, verá rápidamente el impacto de CORS. Todas sus llamadas a la API fallarán.

![Captura de pantalla que muestra el servidor API en el puerto 8081](images/Screen%20Shot%202021-02-19%20at%2012.19.33%20PM.png)

Ingrese nginx. Nginx es un servidor web muy pequeño y superligero que se puede configurar para actuar como proxy. Lo configuré para escuchar en el puerto 8000 del contenedor Docker y para llamadas proxy basadas en la URL. apunte su navegador a http: // docker-container: 8000 / docs y nginx reenviará esa llamada al puerto 8081, donde vive el servidor swagger. Apunte su navegador a http: // docker-container: 8000 / camunda y será redirigido al Administrador de tareas estándar de Camunda Platform, Cockpit, etc.

Deberá cambiar el puerto en el servidor swagger al puerto 8000 desde el puerto 8080:

![Captura de pantalla que muestra el uso del puerto 8000](images/Screen%20Shot%202021-02-19%20at%2012.21.08%20PM.png)

## Realización de llamadas a la API

¿Por qué es necesario todo esto? Bueno, si alguna vez has querido probar las llamadas a la API en un servidor en vivo y obtener resultados reales, entonces Swagger es tu amigo.

Swagger le permite realizar llamadas API en vivo contra una instancia de servidor en ejecución y obtener resultados reales.

![captura de pantalla de la llamada API en vivo](images/Screen%20Shot%202021-02-19%20at%2012.21.36%20PM.png)

Claro, podría escribir algún código para probar cada llamada a la API, pero si desea reducir su tiempo de desarrollo, usar un servidor de API en vivo como swagger es definitivamente el camino a seguir.

Si desea ver exactamente lo que se devuelve como una carga útil de una llamada API determinada, swagger también es su amigo:

![Resultados de una llamada API en vivo](images/Screen%20Shot%202021-02-22%20at%2010.46.52%20AM.png)

Como puede ver, obtiene el comando `curl` completo que podría usar, los datos devueltos, que luego puede usar para asegurarse de que su programa pueda manejar correctamente el mensaje devuelto, así como los encabezados de respuesta completos.

## ¿Cómo puedes conseguir esto?

Nuevamente, para repetir, esto actualmente*no* es parte de la imagen oficial de Camunda Platform Docker. Vendrá con el lanzamiento de 7.15, pero no lo es ahora.

Dicho esto, aún puede acceder a él y usarlo.

Primero, deberá clonar el repositorio adecuado que está [aquí](https://github.com/camunda-community-hub/docker-camunda-bpm-platform/tree/swagger). Ese es un clon del repositorio oficial de Camunda Platform Docker, y una rama especial "swagger".

```
% git clone https://github.com/camunda-community-hub/docker-camunda-bpm-platform/tree/swagger
```
debería hacerlo por ti.

Ahora necesitará construir eso en una imagen de Docker adecuada. Esto puede llevar algún tiempo ya que se descargan todos los componentes.

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
Entonces ahora está construido. Tienes la imagen lista para funcionar. ¡Todo lo que queda es ejecutarlo!

```
% docker run -p 8000:8000 db270d32507f
```

Debería tardar entre 30 y 45 segundos en iniciar todo, pero luego puede apuntar su navegador a [http: // localhost: 8000 / docs](http://localhost:8000/docs) para el servidor swagger, o [ http: // localhost: 8000 / camunda](http://localhost:8000/camunda) para la plataforma Camunda.

Puede usar Camunda Modeler para implementar y ejecutar modelos cambiando el puerto de implementación de `8080` a` 80000`

![Implementación de Camunda Modeler](images/Screen%20Shot%202021-02-22%20at%2011.23.19%20AM.png)

¡Y ya está todo listo!
