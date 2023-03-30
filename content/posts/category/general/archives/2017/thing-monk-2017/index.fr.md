---
Title: "ThingMonk 2017"
Date: 2017-10-20
Category: general
Slug: thing-monk-2017
hero: images/logo-2017-3.png
reading_time: 8 minutes
---

> **Remarque :** Ceci est un article de mes archives. Je l'ai écrit en 2017 et il a été publié sur le [InfluxData Blog](https://www.influxdata.com/blog/thingmonk-iot-insights/).
En septembre 2017, j'ai assisté à la conférence ThingMonk à Londres. Voici un bref aperçu de ce que j'ai appris et des idées que j'ai tirées de la conférence. Les vidéos ThingMonk 2017 commencent à tomber si vous voulez obtenir le scoop complet.

## Arrière-plan

Le rapport annuel <sup>[1]({{<ref "#link-1" >}})</sup> La conférence ThingMonk IoT s'est tenue à Shoreditch, Londres, du 11 au 13 septembre 2017, InfluxData sponsorisant les enregistrements vidéo. Ces enregistrements commencent tout juste à sortir, alors assurez-vous d'aller tous les regarder au fur et à mesure qu'ils sortent ! Vous trouverez ci-dessous le calendrier de diffusion actuel de la première série de vidéos ThingMonk 2017 :

> Toutes les vidéos ont été publiées et sont disponibles sur la [chaîne YouTube ThingMonk](https://redmonk.com/?series=thingmonk-2017).

Une autre série du reste des vidéos sera publiée une fois la première série terminée.

ThingMonk est en fait 2 jours de ThingMonk, avec une journée d'ouverture Eclipse IoT.

ThingMonk est une conférence incroyablement diversifiée et inclusive avec un code de conduite très explicite et fortement appliqué. Pourquoi est-ce que je mentionne la diversité et le Code de conduite dans un article de blog ? Parce que l'une des forces de la conférence, je crois, est l'incroyable accent mis sur la diversité - à la fois chez les conférenciers et les participants - que RedMonk travaille très dur pour atteindre. Et une partie du succès de la diversité est le Code de conduite. D'autres organisateurs de conférence pourraient apprendre une chose ou deux sur la façon de rendre une conférence plus diversifiée et inclusive en étudiant ce que fait RedMonk.

Au cours des 3 jours de ThingMonk et Eclipse IoT Day, j'ai assisté à 23 sessions et 2 ateliers de codage entièrement dédiés à l'IoT. C'est beaucoup d'IoT en 3 jours ! Vous pouvez voir le programme complet des 3 jours ici.

## Journée Eclipse IdO

Le premier jour de la conférence ThingMonk était en fait une journée Eclipse IoT entièrement sponsorisée par la Fondation Eclipse. Recherchez d'autres nouvelles sur la Fondation Eclipse!

Le premier exposé a été présenté par Ian Craggs sur MQTT 5.0 et un bref historique de MQTT au fil des ans. Je n'avais aucune idée de la durée d'existence de MQTT ! Il y a quelques nouvelles fonctionnalités à venir dans MQTT 5.0 telles que les métadonnées, etc. que j'espère qu'InfluxDB pourra prendre en charge le plus tôt possible dans le plugin MQTT Telegraf. Quelques nouveautés en 5.0 :

- Améliorations de l'évolutivité
- Rapport d'erreur
-Métadonnées
- Meilleur accompagnement des clients contraints (embarqué)
- Tous les paquets ont des propriétés (y compris les diagnostics)

Sébastien Lambour a donné une conférence sur l'utilisation de l'IoT pour gérer les troubles de l'humeur.—Il a remporté le prix Eclipse IoT pour 2017 sur la base de ce projet. C'était une approche vraiment intéressante pour gérer les troubles de l'humeur en collectant et en interprétant des données environnementales et autres, et en les corrélant aux changements d'humeur pour une meilleure gestion de la maladie.

## ThingMonk Jour 2

Je ferais bien un 'highlights' mais, franchement, toutes les discussions étaient des moments forts. Le concept du « jumeau numérique » était particulièrement remarquable. Un jumeau numérique est un modèle numérique d'un système du monde réel alimenté par les données de l'instance du monde réel. Pensez à un moteur à réaction modélisé dans un logiciel et alimenté en données par un moteur à réaction réel. Ce concept de jumeau numérique a été démontré au cours de la deuxième journée, et je décrirai cette démonstration plus tard. L'idée est de prendre des données réelles pour construire de meilleurs modèles, alimentées par un flux de données réelles pour améliorer le modèle et, en fin de compte, fournir un retour d'information pour construire de meilleurs « objets » dans le monde réel. Le tout informé par des données. Cela nécessite la collecte et l'analyse de données à chaque étape, de l'appareil périphérique à la plate-forme et au jumeau numérique. Cela implique d'apporter des données provenant de nombreuses autres sources - fiches techniques, données météorologiques, etc. pour donner un contexte supplémentaire au jumeau. Je viens d'écrire à ce sujet l'autre jour.

Yodit Stanton, PDG d'opensensors.io, a donné une conférence sur les raisons pour lesquelles votre projet IoT échouera. Elle a cité une enquête inquiétante selon laquelle 75 % des projets IoT sont considérés comme un échec et que seuls 15 % apportent de la valeur. Son expérience dans le déploiement de projets IoT réels pour des clients réels a éclairé son raisonnement derrière ses conclusions. L'une de ses principales conclusions était que les capteurs bon marché génèrent de mauvaises données, et que de mauvaises données entraîneront l'échec du projet.

> L'image a été perdue

Après sa conférence, Yodit et moi nous sommes assis pour une discussion longue et détaillée sur la collecte de données sur les projets IoT. C'est une technologue en IoT et en données vraiment intéressante et brillante avec une grande expérience du monde réel dans le déploiement de solutions IoT, ce que peu de gens ont en réalité !

Gary Barnett a donné une conférence intitulée "The Number One Thing" qui était à la fois très informative et très divertissante. Il a présenté ce graphique sur ce qu'est la "chose numéro un" dans l'IoT :

> L'image a été perdue

Mais à propos d'InfluxData :

> L'image a été perdue

Il est vraiment inutile de collecter de grandes quantités de données IoT à moins qu'il ne s'agisse de données exploitables. Soyez prévenu que lorsque la vidéo de cette conférence sortira, elle sera remplie de bombes F et d'autres blasphèmes (comme le sont plusieurs autres conférences).

La journée a été complétée par des discussions sur les facteurs humains, les fabricants, un système de gestion des trains, la blockchain dans l'IoT et une présentation sur l'utilisation des jumeaux numériques dans l'agriculture et l'agriculture. L'agriculture et l'élevage seront un secteur de croissance clé pour l'IoT dans les années à venir et l'acquisition de données et l'analyse des données agricoles seront d'énormes facteurs de son succès.

Le principal point à retenir de la discussion sur la blockchain : si vous n'avez pas de problème distribué, la blockchain ne sera pas la solution. Cela semble être une bonne règle compte tenu du nombre de personnes qui répondent avec "Blockchain!" à presque tous les problèmes.

## ThingMonk Jour 3

La troisième journée a été dirigée par Sarah Cooper, responsable de la plateforme AWS IoT, qui a parlé de la dimensionnalité des données dans l'IoT. Elle a présenté quelques concepts clés dans l'acquisition et l'analyse de données IoT. Son exposé sur la dimensionnalité des données décrit ce qui suit :

Systèmes 0-D : appareil avec des données discrètes et peu de relations avec des applications et d'autres données
Systèmes 1-D : 2 sources ou systèmes de données ou plus. L'entrée de l'un est la sortie de l'autre. Les données sont généralement linéaires.
Systèmes 2-D : gère de manière centralisée les collections de données et d'appareils 0-D.
Systèmes 3D : combinez des systèmes 1D et 2D et disposez de plusieurs relations de données qui se chevauchent.
Les enrichissements de données ajoutent des dimensions aux données - des enrichissements tels que des données météorologiques, etc. La fusion de capteurs peut révéler des informations cachées.
Message à emporter : plus vos données sont simples, plus les analyses que vous pouvez exécuter sont complexes.

Il y a eu une démonstration étonnante du concept Digital Twin où un scanner 3D numérique de 60 000 $ a été utilisé pour scanner la conférence - les participants et tous - à très haute résolution (au point où vous pouviez reconnaître les visages dans le scan). Le scan a enregistré plus de 1 millions de points par seconde ! La numérisation a ensuite été introduite dans le moteur de jeu Unity pour créer un modèle virtuel 3D de l'ensemble de la conférence. Certains capteurs ont été distribués aux membres du public et ces capteurs ont ensuite été ajoutés au modèle virtuel. Les lectures des capteurs ont ensuite été diffusées dans le modèle en temps réel, montrant les changements dans le monde physique reflétés dans le modèle virtuel. La démo a suscité un halètement collectif de l'ensemble du public et a été le sujet de discussion de la conférence à partir de ce moment-là. Il a apporté le concept du jumeau numérique à la maison d'une manière très profonde.

Le Dr Lucy Rogers, d'IBM, a donné une conférence captivante sur son parcours pour devenir un fabricant IoT dans laquelle elle a montré un certain nombre de ses projets qu'elle a réalisés au fil des ans. C'est une créatrice selon mon cœur car elle construit toutes sortes de démos originales, amusantes et intéressantes. Elle n'a pas encore construit de bot de traduction de sémaphore (nous avons construit un bot basé sur l'IdO pour traduire des messages texte en sémaphore en 2006, juste pour le plaisir) mais elle a construit des choses vraiment cool !

Il y avait aussi quelques gars, comme moi, qui exécutaient un capteur IoT en direct dans la pièce. Le mien était le capteur IoT Demo que j'ai développé pour InfluxData, et le leur surveillait le niveau de CO2 dans la pièce, exécutant un capteur environnemental en direct au fond de la pièce. Entre nous deux, nous avons pu faire des observations intéressantes sur les fluctuations de température et de niveaux de CO2, et quand et pourquoi elles se sont produites. Il s'avère qu'ils utilisaient également InfluxDB comme mécanisme de collecte de données backend !

##Conclusions

Si vous êtes intéressé par une conférence qui n'est pas remplie de présentations de marketing et de vente, qui se concentre sur les détails de ce qui fait le succès de l'IoT, ou non, et vous souhaitez entendre certains des meilleurs orateurs de l'industrie , alors ThingMonk est l'endroit où il faut être. Il est petit, extrêmement bien géré, encore plus extrêmement bien organisé pour le contenu et rempli d'un contenu superbe. Je mentionnerai à nouveau l'engagement envers la diversité. Comme je l'ai dit à l'un des organisateurs de l'événement, l'incroyable diversité de ThingMonk contraste fortement avec la plupart des autres conférences techniques. Cela souligne que la diversité est là et que la plupart des autres conférences n'essaient tout simplement pas d'avoir une diversité d'orateurs et de participants. Continuez comme ça [RedMonk](https://redmonk.com) : vous faites un excellent travail !

**<a name="link-1"></a> [1] : La conférence ThingMonk ne s'est pas reproduite depuis 2017. J'ai essayé pendant des années de la relancer, mais sans succès. C'est une énorme lacune dans le paysage des conférences IoT.**
