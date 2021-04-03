---
title: "Openhab Server op MEER-520"
Date: 2017-03-28
Author: davidgs
Category: IoT
Tags: ARTIK, ARTIK-520, IoT, openHAB
Slug: openhab-server-artik-520
hero: images/logo-2.png
---

Zoals ik al eerder zei, als je een hamer ... Dus heb ik besloten om het opzetten van Yet Another ivd Gateway. Deze keer nam ik een kijkje op [OpenHAB](http://www.openhab.org) de "vendor en technologie agnostisch open source automatiseringssoftware voor uw huis." Waarom niet, toch? Ik heb al het opzetten van een [Droplit.io randserver] (/ berichten / category / iot / iot-software / artik-520-droplit-io-edge-apparaat), en een [Eclipse Kura server] (/ berichten / categorie / algemeen / making-artik-5-iot-gateway-kura /), dus waarom niet nog een keer te proberen recht te geven? Rechtsaf. Dus laten we duiken in.

## Opstelling

Setup was ongelofelijk eenvoudig. Bijna eng gemakkelijk. Ernstig. Zoals altijd, ben ik begonnen met het de basis ARTIK Fedora met, en natuurlijk is bijgewerkt met de nieuwste:

```
[root@localhost ~]# dnf update
```

Dat duurt een tijdje.

** Opmerking: ** Ik begin met een verse OS voor elk van deze projecten. Dankzij de mogelijkheid om [dump een draaiend systeem] (/ berichten / category / algemeen / how-to-save-your-artik-520-backup /) terug naar mini-SD-kaart, ik dump precies wat ik mee bezig was om een kaart, branden een frisse kaart, en opnieuw beginnen.

Je gaat naar behoefte die Zulu JVM heb ik gesproken over [eerder] (/ berichten / gategory / iot / make-your-artik-520-schreeuw /). De installatie is snel en eenvoudig, maar niet overslaan! Blijkbaar is de open-jdk versie van de JVM zal niet echt geven u veel vreugde met OpenHAB. Ik heb het niet geprobeerd, ik heb net de installatie van de Zulu JVM en ging verder. In het geval was vergeten dat je, als je eenmaal hebt [gedownload van de Zulu JVM](/posts/gategory/iot/make-your-artik-520-scream/)

```
[root@localhost ~]# tar xvf ezdk-1.8.0_112-8.19.0.31-eval-linux_aarch32hf.tar
[root@localhost ~]# update-alternatives --install /usr/bin/java java ~/ezdk-1.8.0_112-8.19.0.31-eval-linux_aarch32hf/jre/bin/java 100
[root@localhost ~]# update-alternatives --config java
```

De enige extra pakket dat u gaat nodig hebben is unzip omdat iemand dacht dat het een goed idee om*not* behoren Unzip (of zip wat dat betreft) imago van de basis in. Wat dan ook.

```
[root@localhost ~]# dnf install unzip
```

Gemakkelijk. Gedaan. Dan krijgen de openHAB server. De instructies voor deze installatie zijn [hier](http://docs.openhab.org/installation/linux.html#manual-installation), maar echt zal ik u alles wat u moet weten vertellen.

```
[root@localhost ~]# cd /tmp
[root@localhost /tmp]# wget -O openhab-download.zip https://bintray.com/openhab/mvn/download_file?file_path=org%2Fopenhab%2Fdistro%2Fopenhab%2F2.0.0%2Fopenhab-2.0.0.zip
[root@localhost /tmp]# unzip openhab-download.zip -d /opt/openhab2
[root@localhost /tmp]# rm openhab-download.zip
```

De instructies zeggen tegen een openhab gebruiker te maken, en vervolgens de openhab server als die gebruiker. Doe dat niet. Ik denk dat je kunt uitzoeken hoe, maar toen ik dat deed, bleef ik steeds:

```
/opt/openhab2/runtime/bin/karaf: line 28: cd: /root: Permission denied
: JAVA_HOME is not valid: /root/ezdk-1.8.0_112-8.19.0.31-eval-linux_aarch32hf/jre/
```

Dus eindelijk liep ik het gewoon als root. Het werkt prima als root.

Dat is echt alles was er ook! Ik zei toch dat het gemakkelijk was!

## Using OpenHAB

Dit is waar de dingen kregen fun! Zodra de OpenHAB server is gestart, heb ik aangesloten op de ARTIK-520 met behulp van mijn browser (poort 8080, net FYI) en ** Voilà **! Ik had een dashboard van soorten. Maar niets was er. Hmmm ... okay, dus ik moest gaan installeren van enkele "bindings".

![Safari017](/posts/category/iot/iot-hardware/images/Safari017.jpg)

Er zijn een **lot** van hen. Ik koos voor de degenen die voor de dingen die ik heb. Een Samsung TV, een aantal Nest Stuff en die Wemo schakelaars. Zodra ik die bindingen geïnstalleerd, dingen begonnen met het showen in mijn "Inbox". Zoals, direct! Wat kwam meteen waren de Wemo schakelt. Zodra ik vast de netwerkverbinding op mijn Samsung TV, maar ook kwam meteen. De Nest spul gaat om een beetje meer werk te nemen, omdat ik moest registreren als Nest Developer, en ik heb niet klaar springen door al hun hoepels gewoon nog niet. Maar de banden zijn geïnstalleerd:

![Safari016](/posts/category/iot/iot-hardware/images/Safari016.jpg) "Safari016.jpg")

Ik installeerde de Z-Wave binging om redenen die me nu te ontsnappen. Deal with it.

![Safari015](/posts/category/iot/iot-hardware/images/Safari015.jpg)

En dat zijn alle apparaten die verscheen. En nu kan ik ze te bestrijden!

## Conclusies

Het Kura Server kostte me een week of twee aan het werk te krijgen, met een behoorlijke hoeveelheid steun van de Eclipse engineers verantwoordelijk is. Het was echt niet ontworpen om te draaien op een embedded platform, zoals de ARTIK-520, en hadden er nooit getest, dus het is niet echt verrassend.

De Droplit.io Edge Server kostte me ongeveer een week. Eigenlijk is het installeren was redelijk makkelijk zodra ik gaf op proberen om het systeem op de ARTIK-520 te bouwen. Onthoud mijn regel: Do niet bouwen / compileren op ARTIK-520, tenzij het absoluut noodzakelijk is. Toen het duurde een paar dagen om een bug uitgewerkt, zodat het kon vinden mijn Wemo schakelaars, maar dat is alles wat het zou gaan vinden.

De openHAB ober was veruit de makkelijkste. Duurde ongeveer 2 uur, begin tot eind, met inbegrip van de bouw / knipperende / updaten van het besturingssysteem. En het vond een veel meer apparaten vrijwel direct (zodra ik bedacht om de bindingen te installeren. Ik heb niet altijd te lezen **Alle** de aanwijzingen.). Het is **zeer** responsief en gemakkelijk te behandelen.

Ik heb een heleboel meer dingen moet hier te onderzoeken, zoals de 'experimentele' rules engine, en ik kan proberen de Text-to-Speech integratie als ik tijd heb.

In alle eerlijkheid, kan dit mijn laatste ARTIK-520-integratie test voor een tijdje. Ze zijn niet echt te betalen mij om dat te doen. In feite is niemand betaalt me om iets te doen op dit moment, dus tot ik **dat** vastgesteld, zal ik waarschijnlijk het grootste deel van mijn tijd zoeken naar een baan te brengen. En misschien wat meer tijd op het resistbot project. Dit is allemaal gemakkelijk Muur als iemand zou beslissen om me te huren.​
