---
title: "Cartas a Santa - Automatización de alegría al mundo, a escala"
Date: 2020-12-18
Author: davidgs
Category: BPMN, DevRel
Slug: letters-to-santa-automating-joy-to-the-world-at-scale
hero: images/santa.jpg
---

![Santa en una moto de agua](/posts/category/camunda/slack-imgs.com-2-1024x639.jpg)

Es esa época del año otra vez. El momento en el que la mayor operación de cumplimiento de la orden del mundo experimenta su carga más pesada. No, no es Amazon - estamos hablando de Santa Claus, Inc. - la empresa de logística más grande en el mundo, con una ventana de entrega global de 24 horas a carga máxima.

Este año es diferente, sin embargo. A principios de este año, San Nicolás clic en un anuncio en su feed de Facebook, una prometedora un estilo de vida nómada digital a través de la automatización de su negocio. Harto de que el clima del Ártico y el estrés de viajar, la idea de sentarse en una playa en Tailandia - mientras sigue llevando alegría a los niños de todo el mundo - era tentadora.

Papá pagó por el curso y aplicar los principios de la automatización de procesos, la descomposición de tareas y la distribución, y la integración con los servicios de terceros para su negocio.

Ahora está relajarse en una playa, en Koh Samui, mientras que la automatización trae alegría al mundo - a escala.

Así que esta Navidad, cartas de los niños a Santa se enrutan a los asociados independientes (sus padres), que cumplan con las órdenes que utilizan Amazon. exitosa transformación del negocio de Santa se convirtió en un estudio de caso, que vamos a compartir con ustedes aquí.

Así es como se hace.

## El extremo delantero

Teniendo en cuenta que Santa es un hombre moderno, y en caso de que necesitaba para complementar sus ingresos de jubilación con un poco de trabajo de desarrollo contrato de front-end, Santa decidió hacer un curso intensivo de aprender a programar en React.js. Parecía que la cosa todos los niños frescos estaban haciendo, por lo que Papá quería darle un tiro.

A pesar de que era más difícil de lo que pensaba, gracias a una gran cantidad de googlear núcleo duro, y un montón de copiar y pegar (Recuerde que los niños, buenos desarrolladores copian, los grandes desarrolladores de pasta!) Fue capaz de llegar a un sitio que al menos parece aceptable, y se encarga de la función simple de aceptar una carta a Santa y su presentación al motor de proceso.

Para el motor de procesos de Santa de escogió supuesto [Camunda](https://camunda.com)!

Una vez que se diseñó la forma, todo lo que quedaba hacer era enviar el formulario usando algo de JavaScript:

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
Usando una simple alerta a dejar que el conocimiento del usuario que la forma se presentó fue el camino de menor resistencia, y Santa estaba perezoso.

## El proceso

Manejo de una carta con sólo reenviarlo a los padres-se parecía un poco demasiado lento, incluso para Santa, por lo que rápidamente ha diseñado un proceso de negocio utilizando [Cawemo](https://cawemo.com) para manejar el enrutamiento de las letras .

Esto es lo que se ve que el proceso como:

![Carta a los Reyes de Procesos de Negocio](/posts/category/camunda/santa-1024x270.jpg)

Y aquí está el flujo:

1) Una carta entra en juego, que se inicia el proceso.
2) La carta se analiza el uso de algunos algoritmos de PNL) Procesamiento del Lenguaje Natural (para extraer algunas partes de la carta para ayudar a determinar lo que el escritor está pidiendo:
1) Identificar los elementos que el escritor está pidiendo.
2) Haga un poco de sentimiento de análisis para tratar de averiguar la importancia de cada elemento sirve para el escritor.
3) Si no hay elementos identificados, a continuación, la carta se dirige a un proceso manual donde uno de los Elfos puede hacer más investigación, y actualizar la lista.
4) Una vez hecho esto, ir a buscar algunos de los posibles enlaces de Amazon para las cosas identificadas.
5) Enviar una carta a los padres una copia de la carta original, los artículos que pidieron (en relación a Amazon por supuesto) y algunos consejos útiles sobre lo que el escritor quería más.
6) Se almacena la información del producto en una base de datos local para su posterior análisis.

Ahora, antes de que nadie tenga intentos de Santa multado por incumplimiento de GDPR, él no almacenar los nombres, direcciones de correo electrónico u otros datos personales. Papá ya lo sabe todo de ti! Él sólo almacena los artículos solicitado. Así que se puede hacer un análisis de la demanda generación más tarde, por supuesto.

Papá escribió un servidor web bastante básico en `Go` para manejar las cartas recibidas, y someterlos al motor de procesamiento Camunda BPM:

```go
http.HandleFunc("/santa", santa)
err := http.ListenAndServe(":9091", nil) // set listen port
if err != nil {
  log.Fatal("ListenAndServe: ", err)
}
```

Y entonces una función de controlador:

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

Él tenía que permitir CORS para permitir la publicación de origen cruzado de los datos. Eso es más bien un punto clave en todo esto, ya que el servidor que aquí se ejecuta en un puerto diferente que el servidor que gestiona la publicación de las cartas.

Después de eso, un poco de magia con el [Ir Camunda cliente](https://github.com/citilinkru/camunda-client-go) y la letra se presenta al motor de procesos BPM Camunda.

## ¿Procesamiento natural del lenguaje?

Sí, es una forma de inteligencia artificial (AI) que le permite dividir el texto escrito e identificar las partes del mismo en base a ciertos criterios. Si se hace bien, puede ser muy precisa.

Así que tomemos un ejemplo de carta:

&gt; Santa querido,
&gt;
&gt; Mi nombre es Leon y yo soy 36 años (sí, todavía creo en Santa 😇)
&gt;
&gt; Este año he sido el chico goodest nunca, por lo que merezco un poco de un gran regalo ...
&gt;
&gt; Estaba pensando en una bonita caja de LEGO como el kit de horizonte o la ciudad de Nueva York. Si eso no es una opción, me conformaría con un buen chocolate también!
&gt;
&gt; Gracias,
&gt; León

Ahora usted y yo puede recoger fácilmente el `` de los artículos en esa carta que sería dones, pero resulta que haciendo eso es más difícil de lo que parece.

Cuando nos encontramos que a través de nuestro procesador PNL obtenemos:

<pre>Este año he sido el chico goodest nunca, por lo que merezco un poco de un gran regalo ...
Sentimiento: 0.300000, positiva artículo: Tipo: otro
Sentencia: Estaba pensando en una bonita caja de LEGO como el kit de horizonte o la ciudad de Nueva York.
Sentimiento: 0.200000, Punto positivo: LEGO Tipo de caja: OTRAS
Tema: Horizonte Tipo kit: OTRAS
Sentencia: Si eso no es una opción, me conformaría con un buen chocolate también!
Sentimiento: 0.700000, positiva artículo: Tipo de opción: OTRAS
Artículo: Tipo de chocolate: OTRAS
Sentencia: Gracias,
León
Sentimiento: 0.800000, positivo
</pre>
Hmmm ... No es muy bueno.

Si León había escrito una carta de Santa más específica, que podría haber conseguido unos mejores resultados para él:

&gt; Santa querido,
&gt;
&gt; Mi nombre es Leon y yo soy 36 años (sí, todavía creo en Santa 😇)
&gt;
&gt; Este año he sido el chico goodest nunca, por lo que merezco un poco de un gran regalo ...
&gt;
&gt; Estaba pensando en un buen kit de Lego horizonte o al perfil de kit de Lego City de Nueva York.
&gt;
&gt; Si eso no es una opción, me conformaría con un buen chocolate belga también!
&gt;
&gt; Gracias,
&gt; León

Cuando se procesa esa carta, obtenemos mejores resultados:

<pre>Carta es de 4 frases largas.
Sentencia: Santa querido, Mi nombre es Leon y yo soy 36 años (sí, todavía creo en Santa: inocente :) Este año he sido el chico goodest nunca, por lo que merezco un poco de un gran regalo ...
Sentimiento: 0.500000, positiva artículo: Tipo: otro
Tema: Papá Tipo: Otro
Sentencia: Estaba pensando en un buen kit de Lego horizonte o al perfil de kit de Lego City de Nueva York.
Sentimiento: 0.000000, Punto positivo: Horizonte Tipo kit: OTRAS
Tema: Lego Tipo: ORGANIZACIÓN
Tema: Horizonte Kit Tipo: CONSUMER_GOOD
Sentencia: Si eso no es una opción, me conformaría con un buen chocolate belga también!
Sentimiento: 0.400000, positiva artículo: Tipo de opción: OTRAS
Artículo: Tipo de chocolate belga: CONSUMER_GOOD
Sentencia: Gracias, Leon
Sentimiento: 0.800000, positivo
</pre>
Se dará cuenta de que ahora hemos identificado algunos `CONSUMER_GOODS` en la carta, que son mucho más * * más fáciles de encontrar.

Así que vamos a ver cómo Papá se fue sobre la búsqueda de enlaces.

## ¿Qué pasa si no hay CONSUMER_GOODS?

Ahí es donde la magia de los procesos manuales y formas entra, por supuesto. Tenemos una puerta de enlace exclusivo que comprueba si se ha identificado ningún `CONSUMER_GOODS`. Si no es así, entonces sería más difícil para el proceso de Amazon-búsqueda para encontrar algo significativo.

Esta parte del proceso es donde los Elfos entran en juego. Que no todos pierden sus trabajos, una vez se automatizó toda la operación! Pero ellos eran * * capaz de unirse al movimiento de "trabajo desde casa", por lo que ahora hacen su trabajo desde donde quieran! (Busque elfos en su vecindario!)

Digamos que León había escrito una carta que acaba de decir "yo quiero la paz mundial. Y me encantaría armonía". Mientras que los que son elevados ideales, en realidad no son cosas que se pueden pedir de Amazon (al menos por ahora).

Aquí está la forma de los Elfos obtiene cuando una carta se dirige a ellos para la intervención:
![Cuando llega el formulario](/posts/category/camunda/form1-1024x257.jpg)

Y luego, después de los Elfos han dado un poco de pensamiento, verificado la lista traviesa / Niza, que puedan actualizar los artículos:
![Los productos que forman actualizados](/posts/category/camunda/form2-1024x250.jpg)

El formulario se encamina entonces de nuevo en el proceso.

Hay un poco de trabajo que hacer en la construcción de la forma embargo. Lo primero es la construcción de la forma de acuerdo con los documentos [](https://docs.camunda.org/manual/7.5/reference/embedded-forms/javascript/lifecycle/). Desde Papá puso todo en un objeto JSON cuando la carta se ha analizado, que tenía un poco más de trabajo que hacer sin embargo.

Editar ningún regalo para que sean más fáciles de buscar

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


Papá tuvo que crear todos los elementos del formulario sobre la marcha, y luego leerlos de nuevo en la variable de instancia al final.

Ahora, aquí está el truco: Si estás subiendo un formulario junto con su diagrama, no se puede utilizar la interfaz de fácil proporcionada por el modelador. Usted tiene que utilizar un proceso manual. Santa, siendo un tipo de línea de comandos de la vieja escuela, que se utiliza `curl`:

<pre>rizo -w “n” - cookie.txt galletas
-H “Accept: application / json”
-F "despliegue de santa-name ="
-F "enable-duplicado de filtrado = false"
-F "deploy-cambió de sólo = false"
-F "santa.bpmn=@/Users/santa/Downloads/santa.bpmn"
-F "ManualLetter.html=@/Users/santa/github.com/letter-to-santa/src/ManualLetter.html"
http://santa-server.com:8080/engine-rest/deployment/create
</pre>
Que carga el archivo BPMN y la forma de la Camunda BPM Server, y luego, cuando el proceso manual se llama, la forma aparece!

## Encontrando Enlaces

Ser Papá, y tener un año entero * * al plan para esto, uno habría pensado de Santa podría haber estado mejor preparados, pero, bueno, la decisión de retiro era una especie de último minuto, y la playa en Tailandia era tan agradable, que tipo de olvidó algunos detalles.

El principal detalle que olvidó fue crear una cuenta de vendedor de Amazon, lo que habría dado a tener acceso a la API de búsqueda de productos. Con eso, se podría haber hecho un trabajo mucho mejor de la búsqueda de productos, mirando los resultados, etc.

Este no fue el caso, por desgracia. Pero, por suerte uno de los duendes de Santa inteligentes intensificaron en el último minuto y le dijo que sólo tiene que utilizar una URL de búsqueda del Amazonas. El año que viene, Santa estará más preparado para esto.

## enviar el correo electrónico


Desde Papá no quería hacer, así, mucho de nada, ni siquiera se automatizó la porción de correo electrónico.

Tomó toda la información recopilada en los pasos anteriores, y sacó todo junto en un agradable de correo electrónico a los padres:

&gt; Saludos de las estaciones!
&gt;
&gt; Adivina qué? León me ha escrito una carta pidiendo un par de cosas. Como ya me he retirado a una playa de Tailandia, pensé que tal vez me gustaría saber lo que pidió magro. Aquí está la letra:
&gt;
&gt;&gt; "Santa querido,
&gt;&gt;
&gt;&gt; Mi nombre es Leon y yo soy 36 años (sí, todavía creo en Santa 😇)
&gt;&gt;
&gt;&gt; Este año he sido el chico goodest nunca, por lo que merezco un poco de un gran regalo ...
&gt;&gt;
&gt;&gt; Estaba pensando en un buen kit de Lego horizonte o al perfil de kit de Lego City de Nueva York.
&gt;&gt;
&gt;&gt; Si eso no es una opción, me conformaría con un buen chocolate belga también!
&gt;&gt;
&gt;&gt; Gracias,
&gt;&gt; León"
&gt;
&gt; Me he tomado la libertad de averiguar qué cosas quieren más, y le ha proporcionado una lista para que sólo se puede comprar estos artículos directamente. No se preocupe, los Elfos no están sin trabajo! Están trabajando desde casa para supervisar todos los procesos. Y no, no están disponibles para su compra.
&gt;
&gt; Por lo tanto, esa lista:
&gt;
&gt; - kit horizonte ⁉️
&gt; - Lego horizonte Kit ⁉️
&gt; - Chocolate Belga ❗️
&gt;
&gt; En caso de que se esté preguntando, ya estoy retirado, yo también soy un vago. Así que he utilizado algunas Inteligencia Artificial (que realmente no es tan inteligente) para ordenar de 'tasa' lo que pidieron. I * * podría haber ordenado la lista, pero a medida que te acabo de decir, estoy retirado, y perezoso. Aquí está el sistema de clasificación:
&gt;
&gt; - ⚠️: meses.
&gt; - ⁉️: Ok, supongo.
&gt; - ❗: Ahora estamos hablando!
&gt; - ️:! Oh, por favor! ¡Oh por favor! ¡Oh por favor!
&gt;
&gt; Todo lo mejor de mí y la señora Claus
&gt;
&gt; -
&gt; PD: Por favor, no escriba de nuevo a esta dirección de correo electrónico. ¡Estoy retirado!
&gt;
&gt; [Escribir su propia carta!](https://write-a-letter-to-santa.org)

Papá ya estaba hecho. Y él no tiene que mover un dedo!

## ¿Cómo lo hizo todo?

Se tomó escribir algo de código, pero Santa fue capaz de utilizar la biblioteca cliente Camunda Golang de manejar todo.

Como hemos visto, una vez que se haya presentado la carta, el servidor web crea una nueva tarea en Camunda y lo presentó, junto con todas las variables de proceso que necesitaba para no perder de vista (para empezar, sólo la `name`,` address` correo electrónico y la `letter` sí mismo). Ya hemos visto cómo se hizo.

Pero una vez que se presentó como una tarea, cómo se manejó esa tarea?

## Manejo de una tarea

Esta es la parte técnica. En ese mismo proceso Go que se encarga de las letras entrantes (aunque podría haber estado en un proceso completamente separado), escuchamos para las nuevas tareas en el `santa` cola. Específicamente, la primera escucha para las tareas de `PNL-extraction`.

En primer lugar, tenemos que crear un cliente para el motor de BPM Camunda:
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
Una vez que tenemos el cliente, podemos empezar a crear algunos procesos que vigilan las diversas colas de tareas. Así que para la cola de la PNL:

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
Este proceso de creación de proceso también es proporcionada por el [Go Client](https://github.com/citilinkru/camunda-client-go/processor).

Se crea el proceso, utilizando el `Client` creado previamente, e indicando al proceso de las tareas para escuchar, el tiempo para bloquear la tarea (por lo que no se intenta otro lugar a reclamo y procesarla) y luego qué documentos una vez que la tarea es reivindica. Se crea un Camunda Client objeto `Variable`, y luego el` analizar () `función se llama.

La función de análisis devuelve el `Variable` que ha sido rellenado con todas las piezas identificadas. Esos son todos almacenados en un objeto JSON (representado por una `struct` en Go)

```go
type Gift []struct {
Gifts []string `json:"gift"`
Types []string `json:"type"`
Sentiments []int `json:"sentiment"`
Amazon []string `json:"amazon"`
}
```
Después de que los `analyze` ultima función, el` Gifts`, `` Types` y Sentiments` están todos llenos, pero la `parte Amazon` está vacío porque no hemos hecho todavía.

Puesto que hemos completado el análisis de la carta, tomamos todos los resultados, empaquetarlos para arriba en algunas nuevas variables, y volver a poner todo en el motor Camunda BPM.

Por supuesto, el siguiente paso es crear un proceso similar para observar las tareas en el `search` Amazonas-cola. El proceso es realmente idéntica a la anterior, excepto que escucha los diferentes identificadores de tareas, y llama a un método diferente para ejecutar en las variables de instancia.

Una vez finalizada la tarea `Amazonas-search` (y la` parte Amazon` de la estructura de datos se rellena para cada `idea REGALO), todo el asunto se devuelve a Camunda BPM y la tarea está marcada como completada.

Que se mueve en la `parte email`.

Una vez más, un `processor` se define para escuchar` tareas email`, ellos afirman, y luego escribir y enviar el correo electrónico al destinatario. Una vez hecho esto, la tarea está marcada como completada, y regresó.

Por último, tenemos una tarea que almacena todas las `Gifts` en una base de datos para que Santa puede ver qué tipo de regalos personas solicitaron este año. Él puede ser retirado, pero todavía tiene que mantener un dedo en el pulso de lo que los niños quieren!

## Finalización del flujo de trabajo

Todo este flujo de trabajo es extremadamente eficiente. Se completa generalmente en unos pocos segundos como máximo. Es tan rápido, de hecho, que Santa no puede ni siquiera ver cualquier proceso sentados alrededor en carlinga! A menos que haya un problema. Lo cual no habrá, porque Santa no quiere ser molestado.

## Áreas para mejorar

Por supuesto, la parte PNL podría mejorarse sustancialmente. Papá simplemente utiliza el libre grada de motor de procesamiento de lenguaje natural de Google, con los ajustes de cero, y tomó los resultados sin ningún análisis adicional. (Necesito recordarles de la pereza de Santa en este punto?).

Además, la parte de búsqueda Amazon podría ser * mucho * mejor con una cuenta real de Amazon distribuidor. Talves el próximo año.

Si usted puede pensar en otras áreas de mejora - y debe haber un montón! - no dude en acercarse a [David G. Simmons](mailto:david.simmons@camunda.com), principal abogado Developer en Camunda que era responsable de ayudar a Santa meter todo este proceso de configuración.

[Escriba su propia carta!](https://write-a-letter-to-santa.org)

![Escribir su propia carta](/posts/category/camunda/santa.jpg)
