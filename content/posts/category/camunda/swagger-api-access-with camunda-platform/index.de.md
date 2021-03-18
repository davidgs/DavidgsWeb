---
title: "Swagger-API-Zugriff mit Camunda-Plattform"
Date: 2021-03-10
Author: davidgs
Category: Camunda, BPMN, DevRel
Slug: swagger-api-access-with-camunda-platform
hero: images/mimi-thian-VEKWzpQu-5M-unsplash-2.jpg
---

Haben Sie jemals die Camunda-Plattform-Docker-Instanz gefeuert und wünscht, Sie könnten Live-Anrufe an die API über einen [Swagger Server] (https://swagger.io) machen? Wir haben! Und wie die meisten Dinge, die wir wünschen, könnten wir tun, wir gehen aus und machen es möglich.

## Kommt bald

Um klar zu sein, kommt diese Integration an den offiziellen Camunda-Plattform-Docker-Container mit Release 7.15. Es ist noch nicht fertig. Dies ist also wirklich eher eine Interim-Lösung und nicht an der All-All- und End-All-Lösung, aber es funktioniert, und es macht das Senden von API-Anrufen an eine live Instanz der Camunda-Plattform *viel* einfacher. Folgen Sie also mit und wir zeigen Ihnen, wie Sie es selbst laufen lassen.

## Cors ist dein Freund und nicht dein Freund

Im Allgemeinen und im regulären Internet hält Sie die Ressourcenteilung (CORS) mit dem Cross-Origin sicher, indem Sie nicht Ressourcen aus zufälligen, nicht vertrauenswürdigen Quellen laden. Dies ist im Allgemeinen eine gute Sache. Bis es nicht.

Wann ist es nicht? Wenn Sie möchten, dass API-Anrufe von einem Host an einen anderen anrufen möchten, wenn die 2 Hosts kein explizites Vertrauensvertrag haben. Wie zwischen 2 Docker-Containern. Oder zwischen Ihrem Laptop und einem Dockerbehälter.

Ja, Sie können ein Header in den HTTP-Server einstellen, so dass `Access-Control-Allow-Origin: *` `und das das Problem lösen wird (während Sie eine Vielzahl anderer Probleme erstellen). Aber wenn Sie sich mit einem vorgebauten Docker-Container befassen, der über Tomcat einen Dienst leitet, ist es nie ganz so einfach.

## Wie funktioniert das?

Wir haben entschieden, dass er angesichts der obigen Cors-Ausgabe die einfachste Möglichkeit, das Ganze anzugehen, den vorhandenen Docker-Container einen Nginx-Proxyserver hinzuzufügen. Auf diese Weise können Sie alles in einem Container laufen lassen, und muss überhaupt keine Sorgen um Kors machen.

Wir haben keine Änderungen an der zugrunde liegenden Camunda-Plattforminstanz vorgenommen, um diese Arbeit zu machen. Diese Instanz ist immer noch über den Port 8080 des Docker Containers erreichbar.

Was wir getan haben, wurde der Swagger-Server auf dem Port 8081 innerhalb desselben Docker-Containers hinzugefügt.

Und jetzt denken Sie dachten ", aber das löst das Problem der Kors nicht!" Und du hast recht, das tut es nicht. Wenn Sie auf dem Port 8081 zur Swagger-Instanz gehen (wenn Sie diesen Port aus exportieren, wenn Sie den Docker-Container starten), erhalten Sie den Swagger-Server und sehen Sie die APIs. Wenn Sie jedoch versuchen, eine dieser API-Anrufe auszuführen, werden Sie schnell die Auswirkungen von CORs sehen. Ihre API-Anrufe fehlschlagen alle.

![Screenshot zeigt den API-Server auf Port 8081](images/Screen%20Shot%202021-02-19%20at%2012.19.33%20PM.png)

Geben Sie nginx ein. Nginx ist ein sehr kleiner, super lightweight-Webserver, der konfigurierbar ist, um als Proxy zu fungieren. Ich habe es eingerichtet, den Port 8000 des Docker-Containers zu hören, und auf Proxy-Anrufe basierend auf der URL. Zeigen Sie Ihren Browser unter http: // docker-container: 8000 / docs und nginx Weiterleiten dieses Anrufs an Port 8081, wo der Swagger-Server lebt. Zeigen Sie Ihren Browser auf http: // docker-container: 8000 / camunda und Sie werden auf den Standard-Camunda-Plattform-Task-Manager, Cockpit usw. umgeleitet.

Sie müssen den Port im Swagger-Server in Port 8000 von Port 8080 ändern:

![Screenshot mit Port 8000 zeigt](images/Screen%20Shot%202021-02-19%20at%2012.21.08%20PM.png)

## API-Anrufe machen

Warum ist das alles noch notwendig? Nun, wenn Sie jemals API-Anrufe ausprobieren wollten, auf einen Live-Server und erhalten Sie aktuelle Ergebnisse, dann ist der Swagger Ihr Freund.

Durch den Swagger können Sie Live-API mit einer laufenden Serverinstanz anrufen und echte Ergebnisse zurückrufen!

![Screenshot des Live-API-Anrufs](images/Screen%20Shot%202021-02-19%20at%2012.21.36%20PM.png)

Sicher, Sie könnten einen Code schreiben, um jeden API-Anruf zu testen, aber wenn Sie Ihre Entwicklungszeit reduzieren möchten, ist es mit einem Live-API-Server wie Swagger definitiv der Weg, um zu gehen.

Wenn Sie genau sehen möchten, was als Nutzlast von einem bestimmten API-Anruf zurückgegeben wird, ist Swagger auch Ihr Freund:

![Ergebnisse eines live-API-Anrufs](images/Screen%20Shot%202021-02-22%20at%2010.46.52%20AM.png)

Wie Sie sehen, erhalten Sie den vollständigen Curl`-Befehl, den Sie verwenden können, die zurückgegebenen Daten, die Sie dann verwenden können, um sicherzustellen, dass Ihr Programm die zurückgegebene Nachricht sowie die vollständigen Antwortheader ordnungsgemäß umgehen kann.

## Wie kannst du das bekommen?

Um wiederholt zu werden, ist dies derzeit *nicht* Teil des offiziellen Camunda-Plattformdocker-Images. Es wird mit der Veröffentlichung von 7.15 Uhr kommen, aber es ist nicht jetzt nicht.

Das heißt, Sie können immer noch Zugriff darauf erhalten, und verwenden Sie es.

Erstens müssen Sie das richtige Repository, das [hier] (https://github.com/camunda-community-hub/docker-camunda-bm-platform/tree/swagger) klonen. Das ist ein Klon des offiziellen Camunda-Plattform-Docker-Repositorys und einen speziellen "Swagger".

```
% git clone https://github.com/camunda-community-hub/docker-camunda-bpm-platform/tree/swagger
```
sollte es für dich tun.

Jetzt müssen Sie das in ein richtiges Docker-Bild bauen. Dies kann einige Zeit dauern, da alle Komponenten heruntergeladen werden.

```
% cd docker-camunda-bpm-platform
docker-camunda-bpm-platform % git status
Auf Zweig-Swagger.
Ihre Niederlassung ist mit "Camunda-Community-Hub / Swagger" auf dem neuesten Stand.

Nichts zu begehen, Arbeitsbaum sauber zu sein
% (base) davidgs@MacBook-Pro docker-camunda-bpm-platform % docker build . --rm -t camunda-bpm-plaform:swagger
Erfolgreich erbaut db270d32507f.
Erfolgreich markiert Camunda-BPM-Plattform: Swagger
%  docker-camunda-bpm-platform % Docker image list
REPOSITORY                     TAG       IMAGE ID       CREATED         SIZE
camunda-bpm-platform           swagger   db270d32507f   5 seconds ago   333MB
```
Es ist also jetzt gebaut. Sie haben das Bild bereit zu gehen. Alles, was übrig bleibt, ist, es auszuführen!
```
% docker run -p 8000:8000 db270d32507f
```

Es sollte ungefähr 30-45 Sekunden dauern, um alles hoch zu starten, aber Sie können Ihren Browser anschließend auf [http://localhost:8000/docs](http://localhost:8000/docs) für den Swagger-Server oder [http://localhost:8000/camunda](http://localhost:8000/camunda) für die camunda-Plattform.

Sie können Catunda Modeler verwenden, um Modelle bereitzustellen und auszuführen, indem Sie den Bereitstellungsanschluss von `8080` auf `80000` ändern.

![Camunda Modelerbereitstellung](images/Screen%20Shot%202021-02-22%20at%2011.23.19%20AM.png)

Und du bist alles fertig!