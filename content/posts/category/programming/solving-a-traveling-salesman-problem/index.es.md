---
title: "Resolver un Problema del viajante"
Date: 2016-06-16
Author: davidgs
Category: General, Misc, Work
Slug: solving-a-traveling-salesman-problem
hero: images/Safari039.jpg
reading_time: 12 minutes
---

No es la IO, pero aún así ... Aquí está el fondo en este proyecto, y por lo que se comprometió él.

Durante los últimos 3 años o así que mi esposa y yo he sido voluntario con los ciegos en nuestra comunidad. Cada mes nuestra iglesia organiza una cena para los ciegos en la zona y la unidad en torno y recoger a los participantes, los llevan a la iglesia donde se sirve la cena cada uno, y la unidad de todo el hogar. Es muy divertido, y algo así nosotros, y la gente que conducimos, disfrutar plenamente. Se les da la oportunidad de reunirse con los amigos y compartir una comida, un poco de música y una gran noche.

Logísticamente, sin embargo, es un poco de una pesadilla. Cada mes hay un llamado a voluntarios para conducir, amasando la lista de las personas que quieren venir, y luego la ardua tarea de averiguar rutas para todos los que minimiza el tiempo de viaje y maximiza la eficiencia. Durante los primeros años de este proceso era bastante opaca. Cada mes se ofrecería voluntario para conducir, y luego una semana antes del evento nos gustaría recibir un email con la que nos recoger y sus direcciones, etc. Detrás de las escenas, sin embargo, uno de los voluntarios era pasar horas trazar las rutas y asignar los pasajeros a los conductores en lo que se esperaba que fuera una manera eficiente. No siempre fue.

Este es exactamente el tipo de problema de los ordenadores fueron diseñados para resolver! Así que me ofrecí para resolverlo de una vez por todas. Ok, por lo que las computadoras no pueden resolver el problema, pero un programa informático bien diseñado pudieron. Sólo tenía que escribirlo.

Los parámetros básicos son los siguientes:

- Alrededor de 30 conductores voluntarios, cada uno con sus propias 'restricciones' en lo lejos que está dispuesto a conducir, el número de pasajeros que pueden tomar, etc.
- Alrededor de 75 asistentes. Algunos con perros, algunos en sillas de ruedas, algunos con discapacidades físicas de varios tipos, etc.
- Los conductores y asistentes cambian todos los meses - no son habituales, como nosotros, pero no todos pueden venir / conducir cada mes

## La construcción de una solución

Es evidente que [Google Maps](http://maps.google.com/) iba a ser parte de la solución. Además, una base de datos back-end de algún tipo sería necesario para almacenar la información sobre los conductores y asistentes, así que no tenga que volver a introducirla cada mes. Acababa de terminar un proyecto de consultoría para) iba a ser parte de la solución. Además, una base de datos back-end de algún tipo sería necesario para almacenar la información sobre los conductores y asistentes, así que no tenga que volver a introducirla cada mes. Acababa de terminar un proyecto de consultoría para [StrongLoop](https://strongloop.com) la aplicación de sus principios activos y de creación marco de gestión de la IO, y parecía una solución perfecta a este problema también. Allí estaban los requisitos finales que me propuse:

- aplicación basada en Web que funcionaría en cualquier navegador
- Copia de seguridad del almacén de datos de información para el conductor y el asistente
- Fácil e intuitivo de usar, ya que no todos son conocedores de la tecnología
- Automatizar tanto del proceso como sea posible
- Optimizar las rutas de los controladores
- Proporcionar a los conductores con un mapa de Google con su ruta optimizada y paso a paso las direcciones

parecía bastante simple. Yo ya sabía cómo geolocalizar las cosas en un mapa de Google mediante el [API de Google Maps.](https://www.google.com/work/mapsearth/products/mapsapi.html) tuve (recién adquirida) conocimiento del uso de JavaScript y) tuve (recién adquirida) conocimiento del uso de JavaScript y [Node.js](https://nodejs.org/en/) y) y [loopback](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&cad=rja&uact=8&ved=0ahUKEwiJrcHf_azNAhVGKiYKHbONBioQFggcMAA&url=https%3A%2F%2Floopback.io%2F&usg=AFQjCNHtpfzxltGflU6-IJMVn0fp4eVBKA&sig2=o_NtCq7mb2Uf4RyYMpys7w&bvm=bv.124272578,d.eWE) y) y [MongoDB](https://www.mongodb.com/lp/download/) - y conectar a todos juntos - para gestionar los datos y las API. Pero en realidad la forma de construirlo? Es decir, la forma de presentar los datos y la interfaz en una interfaz de usuario simple que cualquiera podría imaginar.

Aquí es donde acabé. Después de esto, voy a ir brevemente a través de la forma en que lo hice. Voy a caminar a través del flujo de trabajo un poco demasiado. Empezamos aquí, con una página en blanco, un mapa de Google, y algunas mesas vacías.

## Los resultados

![Captura de pantalla de la página inicial con un mapa de Google insertado](/posts/category/programming/images/Safari034.jpg)

Puede hacer clic en “Agregar controlador” y añadir un nuevo controlador a la base de datos. Se obtiene la misma forma si hace clic en “Agregar asistente”. Todos los conductores y asistentes se conservan en una base de datos MongoDB.

![Captura de pantalla de un "controlador complemento" cuadro de diálogo](/posts/category/programming/images/Safari035.jpg)

Hay una lista desplegable de todos los controladores en la base de datos, por lo que sólo tiene que seleccionar los que están impulsando este mes:

![captura de pantalla que muestra la lista desplegable de los conductores](/posts/category/programming/images/Safari036.png)

Una vez que seleccione un controlador, que terminan en la Tabla conductores, con su propio 'mini-mapa'. Un Pin azul también se agrega al mapa principal. A medida que agrega más conductores, verá más y más azul botones para los conductores en el mapa principal.

![captura de pantalla que muestra el primer controlador añade a la lista](/posts/category/programming/images/Safari037.jpg)

A continuación, seleccione los asistentes de la lista desplegable de asistentes.

![Captura de pantalla de la lista desplegable 'asistentes](/posts/category/programming/images/Safari038.jpg)

A medida que agrega asistentes que se añaden a la tabla asistentes, y se añade un pin rojo en el mapa principal. A medida que selecciona cada vez más asistentes, verá más y más alfileres rojos en el mapa principal.

![Captura de pantalla muestra el pasador de asistentes ha ido y los añadió a la lista](/posts/category/programming/images/Safari039.jpg)

Al hacer clic en el pin de un asistente, se obtiene un pop-up con su información (nombre, dirección, número de teléfono) y otra lista desplegable que contiene todos los controladores disponibles. Sólo elige Driver para ese asistente. Usted puede notar un problema potencial aquí. ¿Y si añado más conductores con el mapa más adelante? Van a aparecer en los menús desplegables de los asistentes? Por supuesto que sí! Simplemente añadí un controlador JavaScript onMouseDown () a la \<select\> para la lista del conductor, y ahí ando la tabla de conductores para construir la lista de selección:

```js
for (var i = 1, row; row = dTable.rows[i]; i++) {
  //iterate through rows
  //rows would be accessed using the "row" variable assigned in the for loop
  for (var j = 0, col; col = row.cells[j]; j++) {
    if(j == 0){
      id = col.childNodes[0].value;
    }
    if(j == 1){
      selContent += "<option value='" + id + ":" + popup.split('-').pop() + "'>" + col.innerHTML + "</option>";
      sel.innerHTML = selContent;
    }
  }
}
```

Es un poco más complicado de lo que parece es necesario porque la referencia que todo por el ID de la base de datos MongoDB para que pueda mirar hacia arriba más adelante con mayor facilidad. No me quedo con un registro de dirección del conductor, número de teléfono, etc., desde las mesas porque una búsqueda por id es ** ** muy rápido, por lo que el tiempo que tengo el ID mano, puedo conseguir cualquier otra información rápidamente.

![Información sobre la herramienta cuando se pasa sobre un alfiler en el mapa](/posts/category/programming/images/Safari040.jpg)

Una vez que se asigna un controlador a un asistente, su pin rojo se mueve desde el mapa principal a mini-mapa del conductor sobre el que se puede mostrar / ocultar la ruta de conducción real. Sí, es pequeña y difícil de ver la ruta real. Además, el ingreso de los asistentes en la tabla de asistentes se volvió verde y un nombre de controlador se rellena para ellos. Esto es por lo que es fácil de decir cuando todo el mundo tiene un conductor y ya está) No más pasadores rojos en el mapa principal y todos los asistentes son de color verde.

![Shwoing los cambios descritos anteriormente](/posts/category/programming/images/Safari041.jpg)

## Entonces, ¿qué falta?

Bueno, verá el botón 'Enviar', que, en un mundo ideal, sería reunir toda la información sobre cada asistente y enviar un correo electrónico al conductor toda esa información, etc, pero esto no es un mundo ideal, y el uso de JavaScript en un navegador, realmente no se puede hacer todo eso. En lugar de ello se obtiene una ventana emergente con un mensaje de correo electrónico con un formato agradable, con la lista de los asistentes y toda su información, así como un enlace a un mapa de Google con instrucciones giro a giro. Todo lo que tiene que hacer es copiar todo el texto, cierre el cuadro de diálogo, haga clic en el enlace de correo electrónico del conductor, pegue en el texto y enviar. Me gustaría que hubiera una mejor manera, pero a) no quiero hacer ningún código del lado del servidor para enviar el correo electrónico y b) no es posible enviar un completamente formateado (HTML o RTF) a partir de un enlace 'mailto' , por lo que estoy atascado con esto.

Entonces, ¿cómo se implementa esto? Todo está en JavaScript! Solía StrongLoop, como ya he dicho, para construir el marco Node.js / bucle invertido, que me dio todo el resto APIs que necesitaba en el back-end MongoDB, además de los servidores Node.js a servir a todo. Esa parte es muy poderosa, en realidad. Si usted está tratando de poner APIs REST en su base de datos le recomiendo dar StrongLoop un torbellino. Especialmente la ARC donde se puede utilizar un navegador para diseñar sus modelos de datos, etc. Como he dicho antes, yo realmente sólo mantener el identificador de base de datos en el navegador. Así que todo - y quiero decir todo - está referenciado por ese ID. ¿Cómo funciona? Bueno, tomemos el ejemplo de cómo agregar un asistente a la lista de un controlador de pasajeros. Tengo una función que se llama cuando se selecciona un controlador de la lista desplegable-(recordemos que hablamos de la construcción de esa lista sobre la marcha anterior). Una vez que se ha seleccionado un controlador, tenemos que añadir que de asistentes para la lista de ese controlador. Así que la selección de un controlador llama a la función driverSelected () con una tupla de identificación del conductor y el ID del asistente. He aquí cómo funciona:

```js
  // everything is referenced by ID!
  var selRow = document.getElementById(ids[1]);
  selRow.style.background=routed; // set Attendees background green
  var driverCell = document.getElementById(ids[1]).cells[3];
  var url = dbServerURL + "Attendees/" + ids[1];
  jQuery.getJSON(url, function(data) { // look up the Attendee's info in the DB
  var tbl = document.getElementById("pList-" + ids[0] + "-Table");
  var row = tbl.insertRow(-1);
  row.id = data.id; // everything referenced by ID
  var cell = row.insertCell(0);
  cell.innerHTML = "• " + data.Name;
  driverCell.innerHTML = driverName;
  cell = row.insertCell(1);
  cell.innerHTML = "<button id="" + data.id + "" onclick="clearCell(this.id, this.value)" value="" + ids[0] + "" name="Remove">Remove</button>"
  for(var x = 0; x < driverList.length; x++){
    if(driverList[x].id == ids[0]){
      addToMap(data.id, "Attendees", driverList[x].map); // add the the Driver's map
      break;
    }
  }
});
```

Como se puede ver, realmente ** ** hago uso de la Identificación por todo. Insertar elementos en el DOM utilizando el ID. Cada conductor tiene una tabla, y en esa mesa es otra tabla de asistentes para dicho controlador, y es nombrado PLIST-ID-Tabla así que es fácil de encontrar. Y alterar. Tengo una lista de los mapas para cada conductor, una vez más los que hace referencia el ID del controlador, por lo que puedo añadir pins él (o eliminar pasadores de ella). Toda la aplicación es de aproximadamente 1.000 líneas de código JavaScript en el navegador para ir a buscar correctamente y mostrar y manipular todos los datos desde el servidor. Pero gracias a bucle de retorno, que podría hacer consultas muy rápidas a la base de datos y volver fácilmente manipulado objetos JSON para trabajar con ellos. Para hacer esta aplicación fácil de mover de un servidor a otro, simplemente agregué una variable de inicialización en el código del navegador para establecer el servidor:

```js
var dbServerURL= "http://" + location.host + "/api/";
```

Para buscar los datos de participante, acabo de añadir el nombre de base de datos de asistentes a la final, y para buscar datos Drivers, añado el nombre de la base de datos de controladores hasta el final. Para buscar un controlador específico, sólo añado Identificación del conductor hasta el final de eso.

```js
var url = dbServerURL + "Drivers/" + id
jQuery.getJSON(url, function(data){ ... }
```

Y regrese un objeto JSON agradable con toda la información del controlador en el mismo. Extraer información de JSON es muerto simple, por supuesto, el uso de algo a lo largo de las líneas de:

```js
var id = data.id;
var driverName = data.Name;
```

etc. Es realmente así de simple.

Resulta que la celebración de aplicaciones Node.js es más difícil de lo que cabría pensar. He intentado durante días para conseguir que se ejecuta en OpenShift, pero fue en vano. La documentación de StrongLoop sobre la forma de hacerlo es tanto antiguos como incompleta y que hasta ahora no han descubierto la manera de hacer que funcione. Los documentos de OpenShift simplemente no funcionan. Lo que finalmente me encontré fue un simple, camino libre para desplegar esta en AWS. Bastante sencillo, y cuando tengo tiempo, puedo escribir hasta cómo hacer eso también.

He enviado las instrucciones básicas y dirección al coordinador que gestiona el encaminamiento y ahora lo ha hecho con éxito el enrutamiento de un par de cenas. Su comentario me estaba "seguro de que es mucho más fácil ** ** y más rápido que el modo en que solía hacerlo!" Todo esto está envuelto en código de arranque, por lo que, en teoría, sino que también debe ser utilizable desde un dispositivo móvil, pero en mis pruebas en un iPhone, tiende a no hacerlo bien con los mapas, lo que no es muy útil.
