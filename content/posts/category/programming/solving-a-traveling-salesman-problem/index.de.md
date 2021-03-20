---
title: "Solving a Reisen Salesman Problem"
Date: 2016-06-16
Author: davidgs
Category: General, Misc, Work
Slug: solving-a-traveling-salesman-problem
hero: images/Safari039.jpg
---

Es ist nicht das Internet der Dinge, aber immer noch ... Hier ist der Hintergrund für dieses Projekt, und warum ich übernahm es.

In den letzten 3 Jahre oder so meine Frau und ich habe Volunteering gewesen mit den blinden in unserer Gemeinschaft. Jeden Monat unsere Kirche organisiert ein Abendessen für Blinde in der Gegend und wir umfahren und Teilnehmer abholen, nehmen sie in der Kirche, wo wir alle Abendessen servieren, und der Antrieb sie alle nach Hause. Es ist ein großer Spaß, und etwas wir und die Menschen, die wir fahren, in vollen Zügen genießen. Es gibt ihnen die Möglichkeit, mit Freunden zusammen zu bekommen und eine Mahlzeit zu teilen, etwas Musik und einen tollen Abend.

Logistisch, aber es ist ein bisschen wie ein Alptraum. Jeden Monat gibt es einen Aufruf für Freiwillige Antrieb, um die Liste der Leute anzuhäufen, die kommen wollen, und dann die schwierige Aufgabe der Routen für jeden Geschmack herauszufinden, dass minimiert Zeit und maximiert die Effizienz reisen. In den ersten Jahren war dieser Prozess ziemlich undurchsichtig. Jeden Monat würden wir fahren freiwillig, und dann eine Woche vor der Veranstaltung würden wir eine E-Mail mit, die wir würden abholen und ihre Adressen usw. Hinter den Kulissen aber war ein Freiwilliger Stunden verbringen die Routen Kartierung und Zuweisen Passagiere Fahrer in dem, was erhofft wäre eine effiziente Art und Weise sein. Es war nicht immer.

Dies ist genau die Art von Problem-Computer wurden entwickelt, um zu lösen! So bot ich es ein für allemal zu lösen. Ok, so kann Computer das Problem nicht lösen, sondern ein gut konzipiertes Computerprogramm kann. Ich musste es einfach schreiben.

Die grundlegenden Parameter sind:

- Über 30 freiwillige Fahrer, jede mit ihren eigenen ‚Beschränkungen‘ auf, wie weit sie bereit sind, zu fahren, wie viele Passagiere können sie nehmen usw.
- Über 75 Teilnehmer. Einige mit Hunden, einige in Rollstühlen, einige mit körperlichen Behinderungen verschiedener Art usw.
- Die Fahrer und Teilnehmer wechseln jeden Monat - es sind Stammgäste, wie wir, aber nicht jeder kann kommen / fahren jeden Monat

## Der Aufbau einer Lösung

Offensichtlich [Google Maps](http://maps.google.com/) würde ein Teil der Lösung sein. Auch würde eine Back-End-Datenbank von einer Art erforderlich, um die Informationen über die Fahrer und die Teilnehmer zu speichern, so würden wir nicht haben, um es erneut eingeben jeden Monat. Ich hatte gerade ein Beratungsprojekt für

- Web-basierte Anwendung, die in jedem Browser laufen würde
Sichern Datenspeicher für Fahrer und Teilnehmerinformationen -
- Einfach und intuitiv zu bedienen, da nicht jede Technologie-versierte
- Automate so viel des Prozesses wie möglich
- Optimieren Sie die Routen für die Fahrer
Geben Sie die Treiber mit einer Google-Karte mit ihrer optimierten Route und Turn-by-Turn-Anweisungen -

Schien einfach genug. Ich wusste schon, wie sich die Dinge auf einer Google-Karte geolocate über die [Google-API zuordnet.](https://www.google.com/work/mapsearth/products/mapsapi.html) Ich hatte (neu erworbenen) Kenntnisse der Verwendung von JavaScript und) Ich hatte (neu erworbenen) Kenntnisse der Verwendung von JavaScript und [Node.js](https://nodejs.org/en/) und) und [Loopback](https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&cad=rja&uact=8&ved=0ahUKEwiJrcHf_azNAhVGKiYKHbONBioQFggcMAA&url=https%3A%2F%2Floopback.io%2F&usg=AFQjCNHtpfzxltGflU6-IJMVn0fp4eVBKA&sig2=o_NtCq7mb2Uf4RyYMpys7w&bvm=bv.124272578,d.eWE) und) und [MongoDB](https://www.mongodb.com/lp/download/) - und sie alle miteinander zu verbinden - die Daten und die APIs zu verwalten. Aber wie kann man es eigentlich bauen? Ich meine, wie die Daten und die Schnittstelle in einer einfachen Benutzeroberfläche zu präsentieren, dass jemand herausfinden konnte.

Hier ist, wo ich am Ende. Danach werde ich durchmachen kurz, wie ich es tat. Ich werde zu Fuß durch die Arbeits fließen auch ein wenig. Wir beginnen hier mit einer leeren Seite, Google Maps und einigen leeren Tischen.

## Die Ergebnisse

![Screenshot von der Startseite mit einer eingebetteten Google Map](/posts/category/programming/images/Safari034.jpg)

Sie können auf „Treiber hinzufügen“ klicken und einen neuen Treiber in die Datenbank hinzu. Sie erhalten die gleiche Form, wenn Sie auf „Hinzufügen Attendee“. Alle Treiber und Teilnehmer werden in einer Datenbank MongoDB anhielt.

![Screenshot eines „add-Treiber“ im Dialogfeld](/posts/category/programming/images/Safari035.jpg)

Es gibt eine Dropdown-Liste aller Treiber in der Datenbank, so dass Sie nur diejenigen auswählen müssen, die in diesem Monat sind die treibende Kraft:

![Screenshot der Drop-Down-Liste der Treiber zeigt](/posts/category/programming/images/Safari036.png)

Sobald Sie einen Treiber auswählen, landen sie in der Treiber-Tabelle, mit ihrer eigenen ‚Mini-Karte‘ auf. Ein blauer Stift ist auch auf die Hauptkarte hinzugefügt. Wie Sie mehr Treiber hinzufügen, werden Sie mehr und mehr Blau Pins für die Fahrer auf der Hauptkarte sehen.

![Screenshot den ersten Treiber zeigt in die Liste aufgenommen](/posts/category/programming/images/Safari037.jpg)

Als nächstes wählen Sie Teilnehmer aus den Teilnehmern Drop Down Liste.

![Screenshot der ‚Teilnehmer‘ Drop-Down-Liste](/posts/category/programming/images/Safari038.jpg)

Wie Sie Teilnehmer hinzufügen, werden sie an die Teilnehmer der Tabelle hinzugefügt, und einen roten Stift auf der Hauptkarte hinzugefügt. Wie Sie mehr und mehr Teilnehmer auswählen, werden Sie mehr und mehr Red Pins auf der Hauptkarte sehen.

![Screenshot der Teilnehmer Stift weg zeigt und sie in die Liste](/posts/category/programming/images/Safari039.jpg)

Wenn Sie auf ein Stecknadel Teilnehmer klicken, erhalten Sie ein Pop-up mit ihren Daten (Name, Adresse, Telefonnummer) und eine weitere Pull-Down-Liste, die alle verfügbaren Treiber enthält. Wählen Sie einfach einen Treiber für die Teilnehmer. Sie können ein potenzielles Problem hier bemerken. Was passiert, wenn ich später mehr Treiber der Karte hinzufügen? Werden sie in den Pull-Downs der Teilnehmer angezeigt? Natürlich werden sie! Ich habe einfach einen JavaScript onmousedown () Handler die hinzugefügt \<select\> für die Liste der Fahrer, und da gehe ich die Tabelle der Treiber die Auswahlliste zu erstellen:

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

Es ist ein wenig komplizierter, als Sie vielleicht denken notwendig ist, weil ich Bezug alles durch die ID aus der Datenbank MongoDB, so dass ich es später leichtes nachschauen. Ich halte nicht den Überblick über die Adresse des Treibers, Telefonnummer usw. aus den Tabellen, weil eine Suche nach ID ** sehr ** schnell, so lange, wie ich die ID zur Hand habe, habe ich schnell andere Informationen bekommen kann.

![Tooltip, wenn Sie schweben über einen Stift auf der Karte](/posts/category/programming/images/Safari040.jpg)

Sobald Sie einen Treiber zu einem Teilnehmer zuordnen, ihr Red Pin wird von der Hauptkarte auf die Mini-Karte Fahrer bewegt auf den Sie die aktuelle Fahrtroute Show / Hide. Ja, es ist klein und schwer, die tatsächliche Strecke zu sehen. Außerdem wird die Teilnehmer des Eintrag in der Teilnehmertabelle wird grün und ein Treibername wird in für sie gefüllt. Dies ist so, dass es einfach zu sagen, wenn jeder einen Fahrer hat und fertig) nicht mehr rot Pins auf der Hauptkarte und alle Teilnehmer sind grün.

![Shwoing die oben beschriebenen Änderungen](/posts/category/programming/images/Safari041.jpg)

## Also, was fehlt?

Nun, sehen Sie den ‚Senden‘ Button, der, in einer idealen Welt würde alle Informationen über die einzelnen Teilnehmer sammeln und eine E-Mail an die Fahrer mit allen, die Informationen zu senden, etc. Aber das ist keine heile Welt, und mit JavaScript in einem Browser können Sie nicht wirklich alles, was zu tun. Stattdessen erhalten Sie ein Pop-up-Fenster mit einer schön formatierte E-Mail-Nachricht, komplett mit der Liste der Teilnehmer und alle ihre Informationen sowie einen Link zu einer Google-Karte mit Turn-by-Turn-Anweisungen. Alles, was Sie tun müssen, um es den ganzen Text, schließen Sie das Dialogfeld kopieren, klicken Sie auf die E-Mail-Link des Fahrers, im Text und senden einfügen. Ich wünsche es ein besserer Weg war, aber a) Ich will keinen serverseitigen Code tun, um die E-Mail und b senden) es nicht möglich ist, ein vollständig formatierte (HTML oder RTF) von einem ‚mailto‘ -Link zu schicken ich bin, so steckt mit diesem.

Also, wie ist diese umgesetzt? Es ist alles in JavaScript! Ich benutzte StrongLoop, wie gesagt, die Node.js / Loopback Rahmen zu bauen, die mir alles andere APIs Ich musste in die MongoDB-Backend hat, plus die Node.js-Server alles bis zu dienen. Dieser Teil ist unglaublich mächtig, eigentlich. Wenn Sie versuchen, REST-APIs auf Ihre Datenbank zu setzen empfehle ich StrongLoop einen Wirbel geben. Vor allem der ARC, wo Sie einen Browser verwenden können, um Ihre Datenmodelle entwerfen, usw. Wie gesagt, ich habe wirklich nur die Datenbank-ID hält im Browser. Also alles - und ich meine alles - von dieser ID verwiesen wird. Wie funktioniert das? Nun, nehmen wir das Beispiel des Hinzufügens eines Teilnehmers zu einer Treiber-Liste der Passagiere. Ich habe eine Funktion, die aufgerufen wird, wenn Sie einen Treiber aus der Dropdown-Liste auswählen (erinnern wir uns über den Aufbau dieser Liste on the fly vorhin gesprochen haben). Sobald ein Fahrer ausgewählt ist, müssen wir auf diesen Treiber Liste dieser Teilnehmer hinzufügen. So ein Fahrer die Auswahl ruft die driverSelected () Funktion mit einem Tupel der ID des Fahrers und die ID des Teilnehmers. Hier ist, wie das funktioniert:

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

Wie Sie sehen können, ich ** ** tun Verwendung der ID für alles wirklich. Ich Einsatzelemente in das DOM der ID. Jeder Fahrer bekommt einen Tisch, und in dieser Tabelle ist eine weitere Tabelle der Teilnehmer für diesen Treiber, und es ist benannt pList-ID-Tabelle so ist es leicht zu finden. Und ändern. Ich halte eine Liste der Karten für jeden Fahrer, wieder von der Fahrer ID Bezug genommen wird, so dass ich Stifte ihm hinzufügen (oder entfernen Stifte von ihm). Die gesamte Anwendung ist etwa 1.000 Zeilen JavaScript im Browser alle Daten aus dem Backend, um richtig zu holen und Anzeige und manipulieren. Aber dank Loopback, konnte ich auf die Datenbank sehr schnelle Abfragen machen und einfach wieder manipuliert JSON-Objekte zur Arbeit mit. Um diese Anwendung zu leicht zu machen, von Server zu Server zu bewegen, habe ich einfach eine Initialisierungsvariable im Browser-Code, um den Server hinzugefügt:

```js
var dbServerURL= "http://" + location.host + "/api/";
```

Um Teilnehmerdaten zu sehen, ich habe gerade append die Teilnehmer Datenbanknamen zu Ende, und Treiber Daten zu sehen, hänge ich die Treiber Datenbanknamen zu Ende. Um einen bestimmten Fahrer nachschauen, ich hängen Sie einfach die ID des Fahrers an das Ende davon.

```js
var url = dbServerURL + "Drivers/" + id
jQuery.getJSON(url, function(data){ ... }
```

Und ich bekomme ein schönes JSON-Objekt zurück mit allen Informationen, die der Fahrer ihm. Informationen von JSON Extrahierung ist tot-einfach, natürlich, etwas entlang der Linien der Verwendung:

```js
var id = data.id;
var driverName = data.Name;
```

etc. Es ist wirklich so einfach.

Es stellt sich heraus, dass Node.js apps Hosting ist härter als man denkt. Ich tagelang versucht, es zu bekommen auf Openshift läuft, aber ohne Erfolg. Die Dokumentation von StrongLoop auf, wie das zu tun ist, sowohl alte als auch unvollständig, und ich habe bisher nicht herausgefunden, wie es funktioniert. Die Dokumente aus Openshift einfach nicht funktionieren. Was war ich endlich gefunden eine einfache, dies auf AWS frei Art und Weise einzusetzen. Ziemlich geradlinig, und wenn ich Zeit habe, kann ich aufschreiben, wie das auch zu tun.

Ich habe die grundlegenden Anweisungen und Anschrift an den Koordinator gesendet, die die Routing-Griffe und sie hat jetzt erfolgreich das Routing für ein paar Abendessen getan. Ihr Kommentar war für mich „dass sicher ein ** viel ist ** einfacher und schneller als die Art und Weise habe ich es zu tun!“ Das Ganze wird in Bootstrap-Code, so in der Theorie wickelt es auch von einem mobilen Gerät verwendbar sein sollte, aber in meinen Tests auf einem iPhone, neigt es nicht so gut mit den Karten zu tun, ist es nicht sehr sinnvoll zu machen.
