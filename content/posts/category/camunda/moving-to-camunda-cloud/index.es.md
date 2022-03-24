---
title: "Mudanza a Camunda Cloud"
date: 2022-03-24T12:45:00-04:00
Author: davidgs
Description: "Trying out Camunda Cloud and loving it!"
Category: Camunda
Slug: moving-to-camunda-cloud
hero: images/hero.png
reading_time:
---

## Algunos antecedentes

He escrito un poco sobre el uso de [Camunda](https://camunda.com?ref=davidgsiot) para hacer todo tipo de cosas desde [automatizar procesos de IoT](https://davidgs.com/posts/category/camunda /automating-iot-camunda/) para ayudar con la gestión de una comunidad de Slack. Ok, entonces no he escrito sobre todas esas cosas, pero ciertamente las he hecho.

En todos esos proyectos, he usado [Camunda](https://camunda.com?ref=davidgsiot) Platform 7 para implementar y ejecutar mis procesos, pero la mayor parte del trabajo real fue realizado por tareas externas que escribí en Golang. . Decididamente, esta no es la forma en que se suponía que debía hacer las cosas. La mayoría de los usuarios de la Plataforma Camunda escriben todo en Java. He estado usando Java desde antes de que Sun Microsystems lo lanzara en 1995 (un momento de silencio por una compañía fantástica que cambió la industria, por favor).

Yo era un "Tecnólogo de Java" en 1996, un trabajo que ahora llamaríamos evangelista o Defensor del desarrollador. Pero ese no es el punto. El punto es que incluso con esa historia con Java, en realidad no he escrito ningún código Java significativo en más de 10 años. Pero ahora escribo mucho código Go, así que aquí es donde estamos.

Últimos antecedentes: he estado tratando de enseñarme a mí mismo React.js últimamente con cierto éxito (en su mayoría limitado). Así que cuando otro miembro del equipo pidió ayuda para automatizar el movimiento de datos de [Orbit](https://orbit.love) a [Airtable](https://airtable.com) pensé en ver si podía escribir un escritorio React Aplicación para hacerlo.

## Escribir la aplicación React

Realmente no fue una aplicación complicada de escribir. Llame a la API de Orbit para obtener los datos solicitados, vuelva a formatearlos un poco y luego llame a la API de Airtable para guardarlos. Muy claro.

Así es como se ve la aplicación:

![La interfaz de la aplicación](/images/app-interface.png)

Bonito y sencillo. Y hay un pequeño control deslizante que le mostrará la configuración de la aplicación para cosas como los tokens de autenticación, etc.

![La configuración de la aplicación](/images/app-config.png)

Como nota al margen, un día elegí la violencia e hice de esta la interfaz de usuario:

![La interfaz de usuario en un mal día](/images/orbit.gif)

No estoy orgulloso de las decisiones que tomé ese día.

## Dándole un giro a Camunda Cloud

El día después de que le entregué la aplicación a mi compañera de trabajo, ella regresó y dijo: "[Mary](https://twitter.com/mary_grace) preguntó si esto usa Camunda Cloud".

Originalmente, había creado la aplicación usando Camunda Platform 7, pero lograr que la aplicación React publicara directamente en Camunda Platform estaba resultando problemático, así que pasé por alto a Camunda por completo.

Pero como me preguntaron _si_ estaba usando Camunda Cloud, ¡decidí ver si _podría_ usar Camunda Cloud! Entonces, primero se me ocurrió este diagrama BPMN súper complicado:

![El diagrama](/images/new-bpmn-diagram.png)

No hay nada más simple que eso, ¿verdad?

Implementé ese proceso simple en Camunda Cloud y luego comencé a escribir los controladores para él.

## Manejo de la nube de Camunda

¡Estaba muy feliz de ver que una de las bibliotecas disponibles para Camunda Cloud era una biblioteca de Golang! ¡¡Oh dia feliz!!

```go
import (
	"github.com/camunda-cloud/zeebe/clients/go/pkg/entities"
	"github.com/camunda-cloud/zeebe/clients/go/pkg/worker"
	"github.com/camunda-cloud/zeebe/clients/go/pkg/zbc"
)
```

Me dio toda la bondad de Go que necesitaría para conectarme a Camunda Cloud. Una cosa que encontré fue que la biblioteca Go asume que todas las variables para conectarse a la nube se guardan en variables de entorno. No me di cuenta de esto al principio, así que guardé todas mis credenciales en un archivo `config.yaml` y... todavía no funcionó. Oh sí, variables de entorno.

```go
type ENV struct {
	ZeebeAddress      string `yaml:"zeebeAddress"`
	ZeebeeClientID    string `yaml:"zeebeeClientID"`
	ZeebeClientSecret string `yaml:"zeebeeClientSecret"`
	ZeebeAuthServer   string `yaml:"zeebeAuthServer"`
}

var config = ENV{}

func init(){
  dat, err := ioutil.ReadFile("path/to/config/zeebe.yaml")
	if err != nil {
		log.Fatal("No startup file: ", err)
	}
	err = yaml.Unmarshal(dat, &config)
	if err != nil {
		log.Fatal(err)
	}
  config.ZeebeAddress = os.Getenv("ZEEBE_ADDRESS")
	if config.ZeebeAddress == "" {
		a.init_proc()
		os.Setenv("ZEEBE_ADDRESS", config.ZeebeAddress)
		os.Setenv("ZEEBE_CLIENT_ID", config.ZeebeeClientID)
		os.Setenv("ZEEBE_CLIENT_SECRET", config.ZeebeClientSecret)
		os.Setenv("ZEEBE_AUTH_SERVER", config.ZeebeAuthServer)
	}
  client, err := zbc.NewClient(&zbc.ClientConfig{
		GatewayAddress: config.ZeebeAddress,
	})
	if err != nil {
		panic(err)
	}
	jobWorker := client.NewJobWorker().JobType("fetch_data").Handler(a.handleJob).Open()
	go func() {
    <- readyClose
	  jobWorker.Close()
	  jobWorker.AwaitClose()
  }()
}
```

Decidí simplemente mantener ese pequeño bit de configuración ya que estaría ejecutando este proceso como un servicio del sistema, y no quería perder el tiempo con las variables de entorno para un servicio del sistema.

Una vez que tuve el cliente inicializado, tuve que configurar un controlador para cuando se iniciara un proceso (hablaré de cómo inicié el proceso en un minuto). El manejador de procesos `jobWorker` escucha las tareas llamadas `fetch_data` y cuando obtiene una, llama a `handleJob` para encargarse de ello. Utiliza un canal dentro de una función para que pueda manejar varias solicitudes simultáneamente, si es necesario.

## Iniciando un proceso

Como tenía problemas con la plataforma Camunda y los encabezados CORS, necesitaba escribir un proceso de servidor que pudiera manejar las solicitudes entrantes de la aplicación.

```go
// The URLs I will accept, handle OPTIONS for CORS
func (a *App) InitializeRoutes() {
	a.Router.HandleFunc("/myEndPoint", a.handleOrgs).Methods("OPTIONS", "POST")
}

// Run it!
func (a *App) Run(addr string) {
	credentials := handlers.AllowCredentials()
	handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization", "Referer", "Origin"})
	methods := handlers.AllowedMethods([]string{"POST", "GET", "OPTIONS"})
	origins := handlers.AllowedOriginValidator(originValidator)
	log.Fatal(http.ListenAndServeTLS(addr, cert, key, handlers.CORS(credentials, methods, origins, handlers.IgnoreOptions())(a.Router)))
}

// handle the CORS preflight request
func (a *App) handleCORS(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
}

// handle the incoming request
func (a *App) handleOrgs(w http.ResponseWriter, r *http.Request) {
	if r.Method == "OPTIONS" {
		a.handleCORS(w, r) // preflight
		return
	}
	if r.Header.Get("Content-Type") != "" {
		value, _ := header.ParseValueAndParams(r.Header, "Content-Type")
		if value != "application/json" {
			msg := "Content-Type header is not application/json"
			http.Error(w, msg, http.StatusUnsupportedMediaType)
			return
		}
	}
	body, err := ioutil.ReadAll(r.Body)
	if err != nil {
		fmt.Println(err)
	}
  // limit to 1MB
	r.Body = http.MaxBytesReader(w, r.Body, 1048576)
	pdat := ProcessData{}
	err = json.Unmarshal(body, &pdat)
	dec := json.NewDecoder(r.Body)
	if err != nil {
		var syntaxError *json.SyntaxError
		var unmarshalTypeError *json.UnmarshalTypeError
		switch {
		// Catch any syntax errors in the JSON
		case errors.As(err, &syntaxError):
			msg := fmt.Sprintf("Request body contains badly-formed JSON (at position %d)", syntaxError.Offset)
			http.Error(w, msg, http.StatusBadRequest)
		// In some circumstances Decode() may also return an
		// io.ErrUnexpectedEOF error for syntax errors in the JSON.
		case errors.Is(err, io.ErrUnexpectedEOF):
			msg := "Request body contains badly-formed JSON"
			http.Error(w, msg, http.StatusBadRequest)
		// Catch any type errors We can interpolate the relevant
    // field name and position into the error
		// message to make it easier for the client to fix.
		case errors.As(err, &unmarshalTypeError):
			msg := fmt.Sprintf("Request body contains an invalid value for the %q field (at position %d)", unmarshalTypeError.Field, unmarshalTypeError.Offset)
			http.Error(w, msg, http.StatusBadRequest)
		// Catch the error caused by extra unexpected fields in the request body
		case strings.HasPrefix(err.Error(), "json: unknown field "):
			fieldName := strings.TrimPrefix(err.Error(), "json: unknown field ")
			msg := fmt.Sprintf("Request body contains unknown field %s", fieldName)
			http.Error(w, msg, http.StatusBadRequest)
		// An io.EOF error is returned by Decode() if the request body is
		// empty.
		case errors.Is(err, io.EOF):
			msg := "Request body must not be empty"
			http.Error(w, msg, http.StatusBadRequest)
		// Catch the error caused by the request body being too large.
		case err.Error() == "http: request body too large":
			msg := "Request body must not be larger than 1MB"
			http.Error(w, msg, http.StatusRequestEntityTooLarge)
		// Otherwise default to logging the error and sending a 500 Internal
		// Server Error response.
		default:
			log.Println(err.Error())
			http.Error(w, http.StatusText(http.StatusInternalServerError), http.StatusInternalServerError)
		}
		return
	}
	// Call decode again, using a pointer to an empty anonymous struct as
	// the destination. If the request body only contained a single JSON
	// object this will return an io.EOF error. So if we get anything else,
	// we know that there is additional data in the request body.
	err = dec.Decode(&struct{}{})
	if err != io.EOF {
		msg := "Request body must only contain a single JSON object"
		http.Error(w, msg, http.StatusBadRequest)
		return
	}
  // error free, we can start the process
	err = startProcess(pdat)
	if err != nil {
		fmt.Println(err)
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

func startProcess(pdat ProcessData) error {
	client, err := zbc.NewClient(&zbc.ClientConfig{
		GatewayAddress: config.ZeebeAddress,
	})
	if err != nil {
		return err
	}
  // turn the data structure into a map, which is what the Zeebe API expects
	var b map[string]interface{}
	inter, err := json.Marshal(pdat)
	if err != nil {
		return err
	}
	json.Unmarshal([]byte(inter), &b)
  // create the process
	ctx := context.Background()
	request, err := client.NewCreateInstanceCommand().BPMNProcessId("orbit-data").LatestVersion().VariablesFromMap(b)
	if err != nil {
		return err
	}
	msg, err := request.Send(ctx)
	if err != nil {
		return err
	}
	return nil
}
```

Eso es todo lo que se necesitó para aceptar las solicitudes entrantes de la Aplicación y luego iniciar un proceso en Camunda Cloud.

## Manejo de la finalización de la tarea

Ahora que tengo una manera de iniciar el proceso, necesito manejar las tareas a medida que ocurren.

Si recuerdas de antes, había configurado un controlador de tareas para el proceso:

```go
jobWorker := client.NewJobWorker().JobType("fetch_data").Handler(a.handleJob).Open()
	go func() {
    <- readyClose
	  jobWorker.Close()
	  jobWorker.AwaitClose()
  }()
```

Así que ahora es el momento de escribir todo eso de `handleJob`.

```go
func (a *App) handleJob(client worker.JobClient, job entities.Job){
	jobKey := job.GetKey()
    _, err := job.GetCustomHeadersAsMap()
    if err != nil {
        a.failJob(client, job)
        return
    }
    // get all the submitted variables
    variables, err := job.GetVariablesAsMap()
    if err != nil {
        a.failJob(client, job)
        return
    }
    request, err := client.NewCompleteJobCommand().JobKey(jobKey).VariablesFromMap(variables)
    if err != nil {
        a.failJob(client, job)
        return
    }
		incomingData := ProcessData{}
		jsonStr, err := json.Marshal(variables)
		if err != nil {
			fmt.Println(err)
		}
		err = json.Unmarshal(jsonStr, &incomingData)
		if err != nil {
			fmt.Println("Json unmarshall: ", err)
		}
    // this is where I get the data from Orbit, and send it to Airtable.
		err =	handleProcess(incomingData)
		if err != nil {
			a.failJob(client, job)
			return
		}
    // If all of that works, complete the job
    ctx := context.Background()
    _, err = request.Send(ctx)
    if err != nil {
        panic(err)
    }
    log.Println("Successfully completed job")
    //close(readyClose)
}

// Handle failing a job
func (a *App) failJob(client worker.JobClient, job entities.Job) {
    log.Println("Failed to complete job", job.GetKey())
    ctx := context.Background()
    _, err := client.NewFailJobCommand().JobKey(job.GetKey()).Retries(job.Retries - 1).Send(ctx)
    if err != nil {
        panic(err)
    }
}
```

¡Eso es básicamente todo! No los aburriré con todas las travesuras por las que tuve que pasar para sacar los datos de Orbit y ponerlos en Airtable, ya que eso no es del todo relevante para el proceso de Camunda Cloud.

## Una denuncia contra Airtable

Presentaré una gran queja contra la API de Airtable por eliminar registros de una tabla. Bien, tal vez 2.

1) No hay forma de borrar todos los datos de una tabla. Solo puede eliminar 10 registros a la vez, y primero debe obtener todos los datos de la tabla para obtener las ID de registro. Luego ve a eliminarlos 10 a la vez. Esto es una pérdida de tiempo y recursos.
2) La API de Airtable para eliminar registros es basura.

Los documentos dicen:
> Para eliminar registros de la tabla, emita una solicitud DELETE al extremo de la tabla. Tenga en cuenta que los nombres de las tablas y los identificadores de las tablas se pueden usar indistintamente. El uso de identificadores de tabla significa que los cambios de nombre de tabla no requieren modificaciones en su solicitud de API.
>
> Su solicitud debe incluir una matriz codificada en URL de hasta 10 ID de registro para eliminar.

Y el código de muestra proporcionado por Airtable es:

```shell
curl -v -X DELETE https://api.airtable.com/v0/BASE_ID/TABLE_NAME \
 -H "Authorization: Bearer YOUR_API_KEY" \
 -G \
 --data-urlencode 'records[]=rec9mP3czPxkvf9IR' \
 --data-urlencode 'records[]=recMxJ0texTTI5BPq'
```
Supongo que puedes ver el problema aquí. ** ¡Eso no es una matriz de ID de registro! ** Debe colocar cada ID de registro en una línea separada y luego enviarlo todo como datos `application/x-www-form-urlencoded`. Y por alguna tonta razón, el parámetro URL **debe** llamarse `records[]`. Supongo que decidieron agregar el `[]` para poder llamarlo matriz. Todavía no es una matriz. Simplemente no lo es. Esta es una colina en la que moriré.

![Colina extraña para morir, pero al menos estás muerto](/images/weird-hill.png)

Perdí una hora de mi vida en esto.

```go
func deleteNow(delData AirtableData) error {
  recordCounter := 0
	records := make([]string, 10)
  // delData is a struct{} that holds all the records to delete
  // All of this is because the API doesn't actually take an array
	for _, record := range delData.Records {
		records[recordCounter] = "records[]=" + record.ID
		recordCounter++
		if recordCounter == 10 {
			urlParm := strings.Join(records, "&")
			err = deleteNow(urlParm, incoming)
			if err != nil {
				return err
			}
		recordCounter = 0
		records = make([]string, 10)
		}
	}
	if recordCounter > 0 {
		urlParm := strings.Join(records, "&")
		err = deleteNow(urlParm, incoming)
		if err != nil {
			return err
		}
	}
  return nil
}

func deleteNow(urlParm string, incoming AirtableData) error {
	client := &http.Client{}
	delReq, err := http.NewRequest("DELETE", "https://api.airtable.com/v0/" + incoming.BaseID + "/" + incoming.TableName + "?" + urlParm, nil)
		if err != nil {
			return err
		}
		parseFormErr := delReq.ParseForm()
		if parseFormErr != nil {
	  	fmt.Println(parseFormErr)
		}
		delReq.Header.Add("Authorization", "Bearer " + incoming.AirtableToken)
		delReq.Header.Add("Content-Type", "application/x-www-form-urlencoded; charset=utf-8")
		_, err = client.Do(delReq)
		if err != nil {
			fmt.Println("Failure : ", err)
		}
		return nil
}
```

Entonces, si también está tratando de eliminar registros de una tabla de Airtable, lo resolví por usted. Ignora sus documentos API.

## Conclusiones

Camunda Cloud básicamente ejecuta casi todo como una tarea externa, que se puede escribir en Golang. Ya que así es como estaba haciendo todo antes de todos modos, ¡Camunda Cloud será mi opción predeterminada a partir de ahora! Incluso puedo volver a escribir un montón de mis procesos de la Plataforma Camunda para que sean procesos de la Nube Camunda, ya que todo el manejo de tareas ya está hecho en Go.

Al menos para mí, esta nueva forma de implementar las cosas es muy natural y tiene mucho sentido. Se adapta perfectamente a mi forma de trabajar, ¡así que es pan comido para mí seguir haciéndolo!

Me encantaría saber lo que piensas sobre esta nueva forma de hacer las cosas, ¡así que siéntete libre de dejar comentarios, etc.!
