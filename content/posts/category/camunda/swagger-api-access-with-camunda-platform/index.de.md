---
title: "Swagger API-Zugriff mit Camunda Platform"
Date: 2021-03-10
Author: davidgs
Category: Camunda, BPMN, DevRel
Slug: swagger-api-access-with-camunda-platform
hero: images/mimi-thian-VEKWzpQu-5M-unsplash-2.jpg
---

Haben Sie jemals die Camunda Platform Docker Instanz angefeuert und gewünscht, Sie Live-Anrufe an die API über einen [Prahlerei Server] tun könnte (https://swagger.io)? Wir haben! Und wie die meisten Dinge, die wir wollen, wir tun könnten, gehen wir aus und machen es möglich.

## Kommt bald

Um klar zu sein, kommt diese Integration auf die offiziellen Camunda Plattform Docker Behälter mit Release 7.15. Es ist einfach noch nicht fertig. Also das ist wirklich eher eine Zwischenlösung, anstatt die A und O Lösung, aber es funktioniert, und es macht API-Aufrufe zu einer Live-Instanz Camunda Plattform sendet eine * Menge * einfacher. So folgt zusammen und wir zeigen Ihnen, wie Sie es selbst laufen.

## CORS ist dein Freund, und nicht dein Freund

Im Allgemeinen und auf dem regulären Internet, Cross-Origin Resource Sharing (CORS) hält Sie sicher durch keine Ressourcen aus zufälligen, nicht vertrauenswürdigen Quellen zu laden. Dies ist im Allgemeinen eine gute Sache. Bis es nicht ist.

Wann ist es nicht? Wenn Sie so etwas wie Make-API-Aufrufe von einem Host zum anderes tun wollen, wenn die zwei Hosts haben keinen expliziten Treuhandvertrag. Wie zwischen 2 Docker-Container. Oder zwischen Ihrem Laptop und einem Docker-Container.

Ja, können Sie in gehen und einen Header in dem HTTP-Server so eingestellt, dass `Access-Control-Allow-Origin: *` und das wird das Problem lösen (während einer Reihe anderer Probleme zu schaffen). Aber wenn man es zu tun mit einem vorgefertigten Docker Behälter, der einen Dienst über tomcat läuft, es ist nie ganz einfach.

## Wie das funktioniert

Wir haben wir entschieden, dass angesichts der oben CORS Ausgabe, der einfachste Weg, um das Ganze zu bewältigen war einen nginx Proxy-Server an die bestehenden Docker Container hinzuzufügen. Auf diese Weise kann man alles läuft in einem Container hat, und hat keine Sorgen zu machen über CORS überhaupt.

Wir haben keine Änderungen an der zugrunde liegenden Plattform Camunda Instanz diese Arbeit zu machen. Diese Instanz ist noch erreichbar über den Port 8080 des Docker-Container.

Was wir taten, war die Prahlerei-Server auf Port 8081 innerhalb derselben Docker Container hinzufügen.

Und jetzt Sie denken „aber das löst nicht das CORS Problem!“ und du hast recht, ist es nicht. Wenn Sie auf die Prahlerei Instanz auf Port 8081 gehen (wenn Sie diesen Port exportieren, wenn Sie den Docker Container starten) erhalten Sie die Prahlerei Server erhalten und die APIs sehen. Aber wenn Sie versuchen, eine dieser API-Aufrufe ausführen, werden Sie schnell die Auswirkungen von CORS sehen. Ihre API-Aufrufe werden alle scheitern.

![Screenshot zeigt den API-Server auf Port 8081](images/Screen%20Shot%202021-02-19%20at%2012.19.33%20PM.png)

Geben Sie nginx. Nginx ist ein sehr kleiner, superleichten Web-Server, der als Proxy zu fungieren konfigurierbar ist. Ich stelle es bis auf Port 8000 des Docker Container zu hören und zu Proxy fordert die URL basiert. mit Ihrem Browser auf http: // Docker-Container: 8000 / docs und nginx diesen Anruf an Port 8081 weiterleiten, wo die Prahlerei Server lebt. Gehen Sie mit Ihrem Browser zu http: // Docker-Container: 8000 / camunda und Sie werden auf die Standard Camunda Platform Task-Manager, Cockpit, usw. umgeleitet werden

Sie müssen den Anschluss in dem Prahlerei Server auf Port 8000 von Port 8080 ändern:

![Screenshot zeigt Port 8000 mit](images/Screen%20Shot%202021-02-19%20at%2012.21.08%20PM.png)

## API-Aufrufe

Warum ist das alles noch notwendig? Nun, wenn Sie jemals ausprobieren API-Aufrufe haben wollen, zu einem Live-Server, und die tatsächlichen Ergebnisse bekommen, dann Prahlerei ist dein Freund.

Swagger können Sie Live-API-Aufrufe gegen einen laufenden Server-Instanz zu machen, und echte Ergebnisse zurück!

![Screenshot von Live-API-Aufruf](images/Screen%20Shot%202021-02-19%20at%2012.21.36%20PM.png)

Natürlich könnten Sie einige Code schreiben jeden API-Aufruf zu testen, aber wenn Sie Ihre Entwicklungszeit reduzieren möchten, eine Live-API-Server wie Prahlerei verwendet, ist definitiv der Weg zu gehen.

Wenn Sie genau sehen wollen, was als Nutzlast von einem bestimmten API-Aufruf zurückgegeben wird, Prahlerei ist auch dein Freund:

![Ergebnisse eines Live-API-Aufruf](images/Screen%20Shot%202021-02-22%20at%2010.46.52%20AM.png)

Wie Sie sehen können, erhalten Sie die komplette `curl` Befehl Sie die zurückgegebenen Daten verwenden können, die Sie dann sicher, dass das Programm noch machen können, um richtig die zurückgegebene Nachricht verarbeiten, sowie die vollständige Response-Header.

## Wie können Sie diese bekommen?

Auch hier zu wiederholen, ist dies zur Zeit * nicht * Teil des Bildes Docker offiziellen Camunda Plattform. Es wird mit der Veröffentlichung von 7,15 kommen, aber es ist nicht absehbar.

That being said, können Sie immer noch Zugriff darauf bekommen, und es verwenden.

Zuerst müssen Sie die richtige Repository klonen, das ist [hier](https://github.com/camunda-community-hub/docker-camunda-bpm-platform/tree/swagger). Das ist ein Klon der offiziellen Camunda Platform Docker-Repository und ein spezieller `swagger` Zweig.

```
% git clone https://github.com/camunda-community-hub/docker-camunda-bpm-platform/tree/swagger
```
es tun sollten Sie.

Nun müssen Sie das in ein richtiges Docker Bild bauen. Dies kann einige Zeit dauern, da alle Komponenten heruntergeladen.

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
So ist es jetzt gebaut. Sie haben das Bild fertig. Alles, was übrig bleibt, ist es zu laufen!

```
% docker run -p 8000:8000 db270d32507f
```

Es sollte etwa 30 bis 45 Sekunden dauern, alles zu starten, aber Sie können dann in Ihrem Browser zeigen [http: // localhost: 8000 / docs](http://localhost:8000/docs) für den Prahlerei-Server oder) für den Prahlerei-Server oder [ http: // localhost: 8000 / camunda](http://localhost:8000/camunda) für die camunda Plattform.

Sie können Camunda Modeler verwenden, um Modelle zu implementieren und laufen durch den Einsatz Port Wechsel von `8080` zu` 80000`

![Camunda Modeler Deployment](images/Screen%20Shot%202021-02-22%20at%2011.23.19%20AM.png)

Und du bist fertig!
