---
title: "Cartas a Papá Noel: Automatización de la alegría para el mundo, a gran escala"
Date: 2020-12-18
Author: davidgs
Category: BPMN, DevRel
Slug: letters-to-santa-automating-joy-to-the-world-at-scale
hero: images/santa.jpg
---

![Santa en una bicicleta de agua](/posts/category/camunda/slack-imgs.com-2-1024x639.jpg)

Es esa época del año otra vez. El momento en que la operación de cumplimiento de pedidos más grande del mundo experimenta su carga más pesada. No, no Amazon, estamos hablando de Santa Claus, Inc., la empresa de logística más grande del mundo, con una ventana de entrega global de 24 horas en carga máxima.

Sin embargo, este año es diferente. A principios de este año, Saint Nick hizo clic en un anuncio en su cuenta de Facebook, uno que prometía un estilo de vida nómada digital mediante la automatización de su negocio. Harto del clima ártico y el estrés de viajar, la idea de sentarse en una playa en Tailandia, sin dejar de traer alegría a los niños de todo el mundo, era tentadora.

Santa pagó el curso y aplicó los principios de automatización de procesos, descomposición y distribución de tareas e integración con servicios de terceros a su negocio.

Ahora está descansando en una playa en Koh Samui, mientras la automatización trae alegría al mundo, a gran escala.

Entonces, esta Navidad, las cartas de los niños a Santa se envían a asociados independientes (sus padres), que cumplen con los pedidos a través de Amazon. La exitosa transformación empresarial de Santa se convirtió en un caso de estudio, que vamos a compartir con ustedes aquí.

Así es como se hace.

## La interfaz

Dado que Santa es un tipo moderno, y en caso de que necesitara complementar sus ingresos de jubilación con algún trabajo de desarrollo inicial por contrato, Santa decidió hacer un curso intensivo para aprender a programar en React.js. Parecía lo que estaban haciendo todos los niños geniales, así que Santa quería intentarlo.

Si bien fue más difícil de lo que pensaba, gracias a una gran cantidad de búsquedas en Google y mucho copiar y pegar (recuerden que los niños, los buenos desarrolladores copian, los grandes desarrolladores pegan!), Pudo crear un sitio que al menos parece aceptable y maneja la simple función de aceptar una carta para Santa y enviarla al motor de procesos.

¡Para el motor de procesos, Santa, por supuesto, eligió [Camunda](https://camunda.com)!

Una vez que se diseñó el formulario, todo lo que quedaba por hacer era enviar el formulario usando algo de JavaScript:

```js
const handleSubmit = event => {
event.preventDefault();
setSubmitting(true);
if (!event.target.checkValidity()) {
  // form is invalid! so we do nothing
  return;
}
const requestOptions = {
method: 'POST',
headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
body: JSON.stringify(formData)
};
fetch('https://write-a-letter-to-santa.org:9091/santa', requestOptions);

alert('Santa has been notified! You can reload the page to send another letter.');
}
```
Usar una simple alerta para hacerle saber al usuario que el formulario fue enviado era el camino de menor resistencia, y Santa se estaba volviendo perezoso.

## El proceso

Manipular una carta con solo reenviarla a los padres como estaba parecía un poco demasiado perezoso, incluso para Santa, por lo que rápidamente diseñó un proceso comercial usando [Cawemo](https://cawemo.com) para manejar el enrutamiento de las cartas. .

Así es como se ve ese proceso:

![Proceso empresarial de carta a Santa](/posts/category/camunda/santa-1024x270.jpg)

Y aquí está el flujo:

1) Entra una carta que inicia el proceso.
2) La carta se analiza utilizando algunos algoritmos de procesamiento del lenguaje natural (NLP) para extraer algunas partes de la carta para ayudar a averiguar qué está pidiendo el escritor:
1) Identifique los elementos que solicita el escritor.
2) Haga un análisis de sentimiento para tratar de averiguar qué tan importante es cada elemento para el escritor.
3) Si no hay elementos identificados, la carta se envía a un proceso manual donde uno de los Elfos puede investigar un poco más y actualizar la lista.
4) Una vez hecho esto, busque algunos enlaces de Amazon posibles para las cosas identificadas.
5) Envíe una carta a los padres con una copia de la carta original, los artículos que pidieron (vinculados a Amazon, por supuesto) y algunos consejos útiles sobre lo que más quería el escritor.
6) Almacene la información del producto en una base de datos local para analizarla posteriormente.

Ahora, antes de que alguien intente que Papá Noel sea multado por incumplimiento del RGPD, no almacena ningún nombre, dirección de correo electrónico ni ningún otro dato personal. ¡Santa ya lo sabe todo sobre ti! Solo almacena los artículos solicitados. Entonces, por supuesto, puede hacer un análisis de generación de demanda más tarde.

Santa escribió un servidor web bastante básico en "Go" para manejar las cartas entrantes y enviarlas al motor de procesamiento Camunda BPM:

```go
http.HandleFunc("/santa", santa)
err := http.ListenAndServe(":9091", nil) // set listen port
if err != nil {
  log.Fatal("ListenAndServe: ", err)
}
```

Y luego una función de controlador:

```go
func santa(w http.ResponseWriter, r *http.Request) {
  enableCors(&w)
  if r.Method == "GET" {
    log.Println("GET Method Not Supported")
    http.Error(w, "GET Method not supported", 400)
  } else {
    body, err := ioutil.ReadAll(r.Body)
    if err != nil {
      panic(err)
    }
    log.Println(string(body))
    var t SantaData
    err = json.Unmarshal(body, &t)
    if err != nil {
      panic(err)
    }
    log.Println(t.Letter)
    w.WriteHeader(200)
    client := camundaclientgo.NewClient(camundaclientgo.ClientOptions{
      EndpointUrl: "http://localhost:8000/engine-rest",
      ApiUser: "demo",
      ApiPassword: "demo",
      Timeout: time.Second ,
    })

    processKey := "santa"
    variables := map[string]camundaclientgo.Variable{
      "name": {Value: t.Name, Type: "string"},
      "email": {Value: t.ParentEmailAddress, Type: "string"},
      "letter": {Value: t.Letter, Type: "string"},
    }
    _, err = client.ProcessDefinition.StartInstance(
      camundaclientgo.QueryProcessDefinitionBy{Key: &processKey},
      camundaclientgo.ReqStartInstance{Variables: &variables},
    )
    if err != nil {
      log.Printf("Error starting process: %sn", err)
      return
    }
  }
}
```

Tenía que habilitar CORS para permitir la publicación de datos de origen cruzado. Ese es un punto clave en todo esto, ya que el servidor aquí se ejecuta en un puerto diferente al servidor que se encarga de publicar las cartas.

Después de eso, un poco de magia con el [Camunda Go Client](https://github.com/citilinkru/camunda-client-go) y la carta se envía al Camunda BPM Process Engine.

## ¿Procesamiento natural del lenguaje?

Sí, es una forma de Inteligencia Artificial (IA) que le permite dividir el texto escrito e identificar partes de él según ciertos criterios. Bien hecho, puede ser muy preciso.

Así que tomemos una carta de muestra:

> Querido Santa,
>
> Mi nombre es Leon y tengo 36 años (sí, todavía creo en Santa 😇)
>
> Este año he sido el niño más bueno de todos, así que merezco un gran regalo ...
>
> Estaba pensando en una bonita caja de LEGO como el kit del horizonte o el de la ciudad de Nueva York. Si esa no es una opción, ¡me conformaría con un buen chocolate también!
>
> Gracias,
> León

Ahora usted y yo podemos elegir fácilmente los "artículos" en esa carta que serían regalos, pero resulta que hacerlo es más difícil de lo que parece.

Cuando ejecutamos eso a través de nuestro procesador NLP obtenemos:

<pre>Este año he sido el niño más bueno de todos, así que merezco un gran regalo ...
Sentimiento: 0.300000, artículo positivo: nombre Tipo: OTRO
Oración: Estaba pensando en una bonita caja de LEGO como el kit del horizonte o el de la ciudad de Nueva York.
Sentimiento: 0.200000, artículo positivo: tipo de caja LEGO: OTRO
Artículo: kit de horizonte Tipo: OTRO
Oración: Si esa no es una opción, ¡me conformaría con un buen chocolate también!
Sentimiento: 0.700000, artículo positivo: tipo de opción: OTRO
Artículo: chocolate Tipo: OTRO
Oración: Gracias,
León
Sentimiento: 0.800000, positivo
</pre>
Hmmm ... No es genial.

Si Leon le hubiera escrito a Santa una carta más específica, podríamos haber obtenido mejores resultados para él:

> Querido Santa,
>
> Mi nombre es Leon y tengo 36 años (sí, todavía creo en Santa 😇)
>
> Este año he sido el niño más bueno de todos, así que merezco un gran regalo ...
>
> Estaba pensando en un bonito kit de horizonte de Lego o el kit de horizonte de Lego de la ciudad de Nueva York.
>
> Si esa no es una opción, ¡me conformaría con un buen chocolate belga también!
>
> Gracias,
> León

Cuando procesamos esa carta, obtenemos mejores resultados:

<pre>La letra tiene 4 oraciones.
Oración: Querido Santa, Mi nombre es León y tengo 36 años (sí, todavía creo en Santa: inocente :) Este año he sido el niño más bueno de todos los tiempos, así que merezco un gran regalo ...
Sentimiento: 0.500000, artículo positivo: nombre Tipo: OTRO
Artículo: Santa Tipo: OTRO
Oración: Estaba pensando en un bonito kit de horizonte de Lego o el kit de horizonte de Lego de la ciudad de Nueva York.
Sentimiento: 0.000000, artículo positivo: kit de horizonte Tipo: OTRO
Elemento: Lego Tipo: ORGANIZACIÓN
Artículo: Skyline Tipo de kit: CONSUMER_GOOD
Oración: Si esa no es una opción, ¡me conformaría con un buen chocolate belga también!
Sentimiento: 0.400000, artículo positivo: tipo de opción: OTRO
Artículo: chocolate belga Tipo: CONSUMER_GOOD
Oración: Gracias, Leon.
Sentimiento: 0.800000, positivo
</pre>
Notarás que ahora hemos identificado algunos `CONSUMER_GOODS` en la carta, que son*mucho* más fáciles de encontrar.

Así que veamos cómo se las arregló Santa para encontrar enlaces.

## ¿Qué pasa si no hay CONSUMER_GOODS?

Ahí es donde entra en juego la magia de los procesos y formas manuales, por supuesto. Tenemos una puerta de enlace exclusiva que verifica si se ha identificado algún "CONSUMER_GOODS". De lo contrario, sería más difícil para el proceso de búsqueda de Amazon encontrar algo significativo.

Esta parte del proceso es donde entran en juego los Elfos. ¡No todos perdieron sus trabajos una vez que se automatizó toda la operación! Pero ellos*pudieron* unirse al movimiento "Trabajar desde casa", ¡así que ahora hacen su trabajo desde donde quieran! (¡Busque elfos en su vecindario!)

Digamos que Leon había escrito una carta que decía "Quiero la paz mundial. Y me encantaría la armonía". Si bien esos son ideales elevados, en realidad no son cosas que se puedan pedir a Amazon (al menos no todavía).

Esta es la forma que obtienen los Elfos cuando se les envía una carta para que intervengan:
![Cuando llega el formulario](/posts/category/camunda/form1-1024x257.jpg)

Y luego, después de que los Elfos lo hayan pensado un poco, revisaron la lista Travieso / Agradable, pueden actualizar los elementos:
![Formulario de artículos actualizado](/posts/category/camunda/form2-1024x250.jpg)

Luego, el formulario se reenvía al proceso.

Sin embargo, hay un poco de trabajo por hacer en la construcción del formulario. Lo primero es construir el formulario de acuerdo con los [docs](https://docs.camunda.org/manual/7.5/reference/embedded-forms/javascript/lifecycle/). Como Santa puso todo en un objeto JSON cuando se analizó la carta, tenía un poco más de trabajo por hacer.

Edite los regalos para que sea más fácil buscarlos

```js
  var variableManager = camForm.variableManager;

  camForm.on('form-loaded', function() {
  // fetch the variable 'gifts'
    variableManager.fetchVariable('gifts');
    console.log(variableManager.variableValue('gifts'))
  });

  camForm.on('variables-fetched', function() {
    // value has been fetched from the backend
    var value = variableManager.variableValue('gifts');
    var frm = document.getElementById('santa-form')
    var g = 0;// will be the number of gifts.
    // it's an array of Json so we have to parse it.
    var m = JSON.parse(variableManager.variables.gifts.originalValue);
    for(var x = 0; x < m.length;x++){
      for(var y = 0; y < m[x].gift.length; y++){
        var textfield = document.createElement("INPUT");
        textfield.type = "text";
        // set the ID so we know where the gift goes back in the JSON array
        textfield.id = "gift-" + x + "-" + y
        textfield.value = m[x].gift[y];
        textfield.classList.add("form-control");
        var label = document.createElement("Label");
        label.htmlFor = textfield.id;
        g++
      }
    }
  });

  camForm.on('submit', function(evt) {
    // get the form
    var frm = document.getElementById('santa-form')
    // parse the original JSON
    var m = JSON.parse(variableManager.variables.gifts.originalValue);
    // get all the inputs
    var inputs = document.forms["form"].getElementsByTagName("input");
    for(var x = 0; x < inputs.length;x++){
      var e = inputs[x].id.split("-");
      if(e.length > 0){
        m[parseInt(e[1])].gift[parseInt(e[2])] = inputs[x].value
      }
    }
  // re-stringify the updated JSON
  var final = JSON.stringify(m)
  var backendValue = variableManager.variable('gifts').value;
  if(final === backendValue) {
    // prevent submit if value of form field was not changed
    evt.submitPrevented = true;
  } else {
    // set value in variable manager so that it can be sent to backend
    variableManager.variableValue('gifts', final);
  }
```


Santa tuvo que crear todos los elementos del formulario sobre la marcha y luego volver a leerlos en la variable de instancia al final.

Ahora, aquí está el truco: si está cargando un formulario junto con su diagrama, no puede usar la interfaz fácil proporcionada por Modeler. Tienes que utilizar un proceso manual. Santa, siendo un tipo de línea de comandos de la vieja escuela, usó `curl`:

<pre>curl -w "n" - cookie cookie.txt
-H "Aceptar: aplicación / json"
-F "nombre-despliegue = santa"
-F "habilitar-filtrado-duplicado = falso"
-F "implementar-solo-cambiado = falso"
-F "santa.bpmn=@/Users/santa/Downloads/santa.bpmn"
-F "ManualLetter.html=@/Users/santa/github.com/letter-to-santa/src/ManualLetter.html"
http://santa-server.com:8080/engine-rest/deployment/create
</pre>
Eso carga el archivo BPMN y el formulario al servidor BPM de Camunda, y luego, cuando se llama al proceso manual, ¡aparece el formulario!

## Encontrar enlaces

Siendo Santa y teniendo un * año * completo para planificar esto, habrías pensado que Santa podría haber estado mejor preparado, pero bueno, la decisión de jubilación fue de última hora, y la playa en Tailandia era tan bonita, dijo. como que olvidé algunos detalles.

El principal detalle que olvidó fue crear una cuenta de vendedor de Amazon, que le habría dado acceso a la API de búsqueda de productos. Con eso, podría haber hecho un trabajo mucho mejor buscando productos, mirando los resultados, etc.

Este no fue el caso, por desgracia. Pero afortunadamente uno de los elfos más inteligentes de Santa se interpuso en el último minuto y le dijo que solo usara una URL de búsqueda de Amazon. El año que viene, Santa estará más preparado para esto.

## Envío del correo electrónico


Como Santa realmente no quería hacer, bueno, casi nada, incluso la parte del correo electrónico estaba automatizada.

Tomó toda la información recopilada en los pasos anteriores y la reunió en un bonito correo electrónico para los padres:

> ¡Saludos de las estaciones!
>
> ¿Adivina qué? Leon me ha escrito una carta pidiéndome algunas cosas. Como ahora me he retirado a una playa en Tailandia, pensé que tal vez le gustaría saber qué pidió Lean. Aquí está la carta:
>
>> "Querido Santa:
>>
>> Mi nombre es Leon y tengo 36 años (sí, todavía creo en Santa 😇)
>>
>> Este año he sido el niño más bueno de todos, así que merezco un gran regalo ...
>>
>> Estaba pensando en un bonito kit del horizonte de Lego o el kit del horizonte de la ciudad de Nueva York de Lego.
>>
>> ¡Si esa no es una opción, me conformaría con un buen chocolate belga también!
>>
>> Gracias,
>> León "
>
> Me tomé la libertad de averiguar qué cosas quieren más y le proporcioné una lista para que pueda comprar estos artículos directamente. ¡No te preocupes, los Elfos no están sin trabajo! Están trabajando desde casa para monitorear todos los procesos. Y no, no están disponibles para su compra.
>
> Entonces, esa lista:
>
> - kit de horizonte ⁉️
> - Kit Lego Skyline ⁉️
> - Chocolate belga ❗️
>
> En caso de que se lo pregunte, ya que estoy jubilado, también soy vago. Así que utilicé algo de inteligencia artificial (que en realidad no es tan inteligente) para "calificar" lo que pedían. Yo * podría * haber ordenado la lista, pero como les acabo de decir, estoy jubilado y vago. Aquí está el sistema de clasificación:
>
> - ⚠️: meh.
> - ⁉️: Ok, supongo.
> - ❗: ¡Ahora estamos hablando!
> -‼ ️: ¡Oh, por favor! ¡Oh por favor! ¡Oh por favor!
>
> Todo lo mejor de mi parte y de la Sra. Claus
>
> -
> PD: No escriba a esta dirección de correo electrónico. ¡Estoy retirado!
>
> [¡Escriba su propia carta!](https://write-a-letter-to-santa.org)

Santa ya había terminado. ¡Y no tuvo que mover un dedo!

## ¿Cómo lo hizo todo?

Fue necesario escribir algo de código, pero Santa pudo usar la biblioteca cliente de Camunda Golang para manejar todo.

Como vimos, una vez que se envió la carta, el servidor web creó una nueva tarea en Camunda y la envió, junto con todas las variables de proceso que necesitaba para realizar un seguimiento (para empezar, solo el `nombre`, la` dirección de correo electrónico` y la propia "letra"). Ya hemos visto cómo se hizo eso.

Pero una vez que se presentó como una tarea, ¿cómo se manejó esa tarea?

## Manejo de una tarea

Esta es la parte técnica. En ese mismo proceso Go que maneja las cartas entrantes (aunque podría haber sido en un proceso completamente separado), escuchamos nuevas tareas en la cola `santa`. Específicamente, primero escuchamos las tareas de `nlp-extract`.

Primero, tenemos que crear un cliente para el motor Camunda BPM:
```go
  client := camundaclientgo.NewClient(camundaclientgo.ClientOptions{
    EndpointUrl: "http://hostname:8080/engine-rest",
    // ApiUser: "demo",
    // ApiPassword: "demo",
    Timeout: time.Second * 10,
  })
  logger := func(err error) {
  fmt.Println(err.Error())
}
```
Una vez que tenemos el cliente, podemos comenzar a crear algunos procesos que vigilan las distintas colas de tareas. Entonces, para la cola de PNL:

```go
  proc := processor.NewProcessor(client, &processor.ProcessorOptions{
    WorkerId: "nlpProcessor",
    LockDuration: time.Second * 10,
    MaxTasks: 10,
    MaxParallelTaskPerHandler: 100,
    LongPollingTimeout: 10 * time.Second,
  }, logger)
  // NLP Handler
  proc.AddHandler(
    &[]camundaclientgo.QueryFetchAndLockTopic{
    {TopicName: "nlp-extraction"},
  },
  func(ctx *processor.Context) error {
    fmt.Printf("Running task %s. WorkerId: %s. TopicName: %sn", ctx.Task.Id, ctx.Task.WorkerId, ctx.Task.TopicName)
    var sentRes camundaclientgo.Variable
    var err error
    varb := ctx.Task.Variables
    text := fmt.Sprintf("%v", varb["letter"].Value)
    fmt.Println(text)
    sentRes, err = analyze(text) // <-- **this is the important bit
    if err != nil {
      log.Fatal(err)
    }
    vars := make(map[string]camundaclientgo.Variable)
    vars["status"] = camundaclientgo.Variable{Value: "true", Type: "boolean"}
    vars["gifts"] = sentRes
    err = ctx.Complete(processor.QueryComplete{
      Variables: &vars,
    })
    if err != nil {
      fmt.Printf("Error set complete task %s: %sn", ctx.Task.Id, err)
    }
    fmt.Printf("Task %s completedn", ctx.Task.Id)
    return nil
  },
  )
```
Este proceso de creación de procesos también lo proporciona el [Cliente Go](https://github.com/citilinkru/camunda-client-go/processor).

El proceso se crea, utilizando el `cliente` creado previamente, y diciéndole al proceso qué tareas debe escuchar, cuánto tiempo debe bloquear la tarea (para que nadie más intente reclamarla y procesarla) y luego qué hacer una vez que la tarea está lista. reclamado. Se crea un objeto "Variable" de Camunda Client, y luego se llama a la función "analizar ()".

La función de análisis devuelve la "Variable" que se ha completado con todas las partes identificadas. Todos se almacenan en un objeto JSON (representado por una `estructura` en Go)

```go
type Gift []struct {
Gifts []string `json:"gift"`
Types []string `json:"type"`
Sentiments []int `json:"sentiment"`
Amazon []string `json:"amazon"`
}
```
Una vez que se completa la función `analizar`, los` Regalos`, `Tipos` y` Sentimientos` se completan, pero la parte de `Amazon` está vacía porque aún no lo hemos hecho.

Desde que completamos el análisis de la carta, tomamos todos los resultados, los empaquetamos en algunas variables nuevas y volvemos a poner todo en el motor Camunda BPM.

Por supuesto, el siguiente paso es crear un proceso similar para observar las tareas en la cola de `búsqueda de amazon`. El proceso es realmente idéntico al anterior, excepto que escucha diferentes identificadores de tareas y llama a un método diferente para ejecutar en las variables de instancia.

Una vez que se completa la tarea `amazon-search` (y se completa la parte` Amazon` de la estructura de datos para cada idea de `Gift`), todo se devuelve a Camunda BPM y la tarea se marca como completada.

Lo que lo mueve a la parte de "correo electrónico".

Una vez más, un "procesador" se define para escuchar las tareas de "correo electrónico", reclamarlas y luego redactar y enviar el correo electrónico al destinatario. Una vez hecho esto, la tarea se marca como completada y se devuelve.

Finalmente, tenemos una tarea que almacena todos los "Regalos" en una base de datos para que Santa pueda ver qué tipo de regalos pidió la gente este año. Puede que esté jubilado, ¡pero aún necesita estar al tanto de lo que quieren los niños!

## Finalización del flujo de trabajo

Todo este flujo de trabajo es extremadamente eficiente. Por lo general, se completa en unos pocos segundos como máximo. De hecho, ¡es tan rápido que Santa ni siquiera puede ver ningún proceso en Cockpit! A menos que haya un problema. Lo cual no habrá, porque Santa no quiere que lo molesten.

## Áreas para mejorar

Por supuesto, la parte de PNL podría mejorarse sustancialmente. Santa simplemente usó el motor de procesamiento de lenguaje natural de Google de nivel gratuito, sin ajustes, y tomó los resultados sin ningún otro análisis. (¿Necesito recordarte la pereza de Santa en este momento?).

Además, la parte de búsqueda de Amazon podría ser*mucho* mejor con una cuenta de distribuidor de Amazon real. Talves el próximo año.

Si puede pensar en otras áreas de mejora, ¡debe haber muchas! - No dude en comunicarse con [David G. Simmons](mailto:david.simmons@camunda.com), promotor principal de desarrollo en Camunda, quien fue responsable de ayudar a Santa a configurar todo este proceso.

[¡Escriba su propia carta!](https://write-a-letter-to-santa.org)

![Escribe tu propia carta](/posts/category/camunda/santa.jpg)
