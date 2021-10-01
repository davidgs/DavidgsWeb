---
title: "Swagger API-Zugriff mit Camunda Platform"
Date: 2021-03-10
Author: davidgs
Category: Camunda, BPMN, DevRel
Slug: swagger-api-access-with-camunda-platform
hero: images/mimi-thian-VEKWzpQu-5M-unsplash-2.jpg
reading_time: 5 minutes
---

Haben Sie jemals die Camunda Platform Docker-Instanz gestartet und sich gewünscht, Sie könnten Live-Aufrufe der API über einen [Swagger-Server](https://swagger.io) durchführen? Wir haben! Und wie die meisten Dinge, die wir uns wünschen, gehen wir raus und machen es möglich.

## Kommt bald

Diese Integration wird mit Release 7.15 in den offiziellen Camunda Platform Docker-Container aufgenommen. Es ist einfach noch nicht fertig. Dies ist also eher eine Zwischenlösung als eine Komplettlösung, aber es funktioniert und es macht das Senden von API-Aufrufen an eine Live-Instanz von Camunda Platform*viel* einfacher. Folgen Sie uns und wir zeigen Ihnen, wie Sie es selbst ausführen können.

## CORS ist dein Freund und nicht dein Freund

Im Allgemeinen und im regulären Internet schützt Sie Cross Origin Resource Sharing (CORS), indem Sie keine Ressourcen aus zufälligen, nicht vertrauenswürdigen Quellen laden. Dies ist im Allgemeinen eine gute Sache. Bis es nicht ist.

Wann ist es nicht Wenn Sie beispielsweise API-Aufrufe von einem Host zum anderen ausführen möchten, wenn die beiden Hosts keine explizite Vertrauensvereinbarung haben. Wie zwischen 2 Docker-Containern. Oder zwischen Ihrem Laptop und einem Docker-Container.

Ja, Sie können einen Header auf dem HTTP-Server so festlegen, dass "Access-Control-Allow-Origin: *" das Problem löst (während Sie eine Vielzahl anderer Probleme erstellen). Wenn es sich jedoch um einen vorgefertigten Docker-Container handelt, der einen Dienst über Tomcat ausführt, ist dies nie ganz so einfach.

## Wie das funktioniert

Angesichts des oben genannten CORS-Problems haben wir beschlossen, dass der einfachste Weg, das Ganze in Angriff zu nehmen, darin besteht, dem vorhandenen Docker-Container einen Nginx-Proxyserver hinzuzufügen. Auf diese Weise können Sie alles in einem Container ausführen und müssen sich überhaupt nicht um CORS kümmern.

Wir haben keine Änderungen an der zugrunde liegenden Camunda Platform-Instanz vorgenommen, damit dies funktioniert. Auf diese Instanz kann weiterhin über den Port 8080 des Docker-Containers zugegriffen werden.

Wir haben den Swagger-Server an Port 8081 in demselben Docker-Container hinzugefügt.

Und jetzt denken Sie: "Aber das löst das CORS-Problem nicht!" und du hast recht, das tut es nicht. Wenn Sie zur Swagger-Instanz auf Port 8081 wechseln (wenn Sie diesen Port beim Starten des Docker-Containers exportieren), erhalten Sie den Swagger-Server und sehen die APIs. Wenn Sie jedoch versuchen, einen dieser API-Aufrufe auszuführen, werden Sie schnell die Auswirkungen von CORS erkennen. Ihre API-Aufrufe schlagen alle fehl.

![Screenshot mit dem API-Server an Port 8081](images/Screen%20Shot%202021-02-19%20at%2012.19.33%20PM.png)

Geben Sie nginx ein. Nginx ist ein sehr kleiner, superleichter Webserver, der als Proxy konfiguriert werden kann. Ich habe es so eingerichtet, dass es Port 8000 des Docker-Containers abhört und Proxy-Aufrufe basierend auf der URL. Zeigen Sie mit Ihrem Browser auf http: // docker-container: 8000 / docs, und nginx leitet diesen Anruf an Port 8081 weiter, auf dem sich der Swagger-Server befindet. Zeigen Sie mit Ihrem Browser auf http: // docker-container: 8000 / camunda, und Sie werden zum Standard-Task-Manager für die Camunda-Plattform, zum Cockpit usw. weitergeleitet.

Sie müssen den Port im Swagger-Server von Port 8080 auf Port 8000 ändern:

![Screenshot mit Port 8000](images/Screen%20Shot%202021-02-19%20at%2012.21.08%20PM.png)

## API-Aufrufe tätigen

Warum ist das alles überhaupt notwendig? Wenn Sie schon immer API-Aufrufe an einen Live-Server ausprobieren und tatsächliche Ergebnisse erzielen wollten, ist swagger Ihr Freund.

Mit Swagger können Sie Live-API-Aufrufe für eine laufende Serverinstanz ausführen und echte Ergebnisse zurückerhalten!

![Screenshot des Live-API-Aufrufs](images/Screen%20Shot%202021-02-19%20at%2012.21.36%20PM.png)

Sicher, Sie könnten Code schreiben, um jeden API-Aufruf zu testen, aber wenn Sie Ihre Entwicklungszeit verkürzen möchten, ist die Verwendung eines Live-API-Servers wie swagger definitiv der richtige Weg.

Wenn Sie genau sehen möchten, was von einem bestimmten API-Aufruf als Nutzlast zurückgegeben wird, ist swagger auch Ihr Freund:

![Ergebnisse eines Live-API-Aufrufs](images/Screen%20Shot%202021-02-22%20at%2010.46.52%20AM.png)

Wie Sie sehen, erhalten Sie den vollständigen Befehl "curl", den Sie verwenden können, die zurückgegebenen Daten, mit denen Sie sicherstellen können, dass Ihr Programm die zurückgegebene Nachricht ordnungsgemäß verarbeiten kann, sowie die vollständigen Antwortheader.

## Wie kannst du das bekommen?

Wiederum ist dies derzeit*nicht* Teil des offiziellen Camunda Platform Docker-Images. Es wird mit der Veröffentlichung von 7.15 kommen, aber es ist nicht im Moment.

Davon abgesehen können Sie immer noch darauf zugreifen und es verwenden.

Zunächst müssen Sie das richtige Repository klonen, das [hier] ist (https://github.com/camunda-community-hub/docker-camunda-bpm-platform/tree/swagger). Dies ist ein Klon des offiziellen Camunda Platform Docker-Repositorys und ein spezieller "Swagger" -Zweig.

```
% git clone https://github.com/camunda-community-hub/docker-camunda-bpm-platform/tree/swagger
```
sollte es für dich tun.

Jetzt müssen Sie das in ein richtiges Docker-Image einbauen. Dies kann einige Zeit dauern, da alle Komponenten heruntergeladen werden.

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
Also ist es jetzt gebaut. Sie haben das Bild bereit zu gehen. Alles was übrig bleibt ist es auszuführen!

```
% docker run -p 8000:8000 db270d32507f
```

Es sollte ungefähr 30-45 Sekunden dauern, bis alles gestartet ist, aber Sie können Ihren Browser dann auf [http: // localhost: 8000 / docs](http://localhost:8000/docs) für den Swagger-Server oder [ http: // localhost: 8000 / camunda](http://localhost:8000/camunda) für die Camunda-Plattform.

Sie können Camunda Modeler zum Bereitstellen und Ausführen von Modellen verwenden, indem Sie den Bereitstellungsport von "8080" auf "80000" ändern

![Bereitstellung von Camunda Modeler](images/Screen%20Shot%202021-02-22%20at%2011.23.19%20AM.png)

Und du bist fertig!
