---
title: "IoTProject"
date: 2021-04-16T11:46:12-04:00
Author: davidgs
Category: Camunda, IoT
Slug: iot-project
hero: images/growhouse.jpg
---

# Une preuve de concept pour la plate-forme Camunda BPMN avec IoT

## Abstrait
Vous cherchez à porter [Camunda](https://camunda.com?ref=davidgsiot) à l'attention de la communauté IoT en complétant un projet de preuve de concept IoT/Camunda plus vaste. Cela impliquerait une construction IoT, utilisant la plateforme Camunda, de la documentation, un article de blog et une promotion auprès de la communauté IoT plus large.

## Pourquoi poursuivre ce projet
Dans bon nombre de mes discussions initiales lors de mon arrivée dans l'entreprise, l'IoT a été mentionné assez fréquemment comme un marché important, mais encore inexploité, pour la plate-forme Camunda. Afin de faire «remarquer» Camunda sur ce marché, qui est vaste, nous devons commencer à faire des choses que la communauté pourrait remarquer, puis suivre les engagements de ces choses.

Cela peut nous donner des informations importantes sur la question de savoir si le marché de l'IoT est intéressé ou non par l'utilisation du BPMN pour orchestrer des tâches basées sur des données IoT, ainsi qu'une introduction de Camunda à la communauté IoT.

Il touche à de nombreux aspects importants de ce que nous faisons, y compris les commentaires de la communauté / des clients, la sensibilisation accrue et l'engagement.

En général, le marché global de l'IoT double de taille environ tous les 2 ans. Cette croissance rapide et soutenue en fait une cible attractive pour Camunda alors que nous recherchons des domaines d'expansion.

![Graphique de l'adoption croissante de l'IoT](/posts/category/camunda/iot-project/images/iotGrowthChart.png)

[[1] Prévisions des dépenses des utilisateurs finaux en solutions IoT dans le monde de 2017 à 2025](https://www.statista.com/statistics/976313/global-iot-market-size/)

## À quoi ressemble le succès?
Le succès, dans ce cas, ne signifie pas simplement terminer le projet. En fait, terminer ce projet n'est pas un obstacle. La véritable mesure du succès sera le degré d '«attention» et de traction dans la communauté IoT au sens large que nous pouvons recueillir grâce à ce projet.

Certaines des mesures à collecter et à mesurer seraient:
- Nombre de personnes ayant lu le (s) article (s) de blog sur ce projet
- Combien de ces lecteurs convertissons-nous en clics vers le site Web de Camunda?
- Nombre de tweets / retweets du projet et de ses parties
- Questions posées sur le projet

Les OKR autour des métriques que je prévois d'utiliser sont:
- 20000 post-lectures sur le (s) blog (s) posté (s) sur le projet
- 1% de conversion en clics sur Camunda.com

### Comment nous collecterons ces métriques
- Lorsque vous publiez des articles de blog sur DZone, utilisez `?ref=davidgsiot` pour distinguer les références de trafic directement vers Camunda des articles de David
- Produire des «livrables» à rapporter en interne sur une base assez régulière (il peut s'agir de rapports, déjeuners et apprentissages, projets de hackathon, articles de blog, etc.)

Il est important de noter que, bien que nous ne suivions généralement pas ces `` métriques de vanité '' comme le nombre de hits, etc., il s'agit en réalité d'un projet de ballon de test pour voir si et dans quelle mesure il y a un intérêt relatif autour d'une intégration entre Camunda. Plateforme BPMN et communauté IoT. Puisque nous ne faisons que mesurer l'intérêt initial, des mesures simples et faciles à suivre sont les plus logiques.

## Idée de projet

Comme mentionné, l'automatisation des bâtiments est un marché cible potentiel pour Camunda et l'IoT en raison du niveau élevé d'adoption, de la nécessité d'une orchestration complexe et de la poussée actuelle pour déplacer davantage de systèmes dans ce domaine.

> À leurs débuts, les systèmes de gestion des bâtiments (BMS), également appelés systèmes d'automatisation des bâtiments (BAS), ont révolutionné la donne. La disponibilité d'un système de contrôle informatisé capable de surveiller et de gérer automatiquement les composants opérationnels les plus importants et les plus coûteux d'un bâtiment a aidé les gestionnaires d'installations à mieux faire leur travail. Les systèmes d'automatisation des bâtiments ont permis d'économiser du temps et de l'argent, réduit le gaspillage d'énergie et ont donné aux gestionnaires d'installations un moyen de mieux surveiller leurs opérations.
>
> Avancez jusqu'à aujourd'hui, et vous avez un autre changement de jeu: l'Internet des objets (IoT) pour les bâtiments. À la base, ces technologies se recoupent de certaines manières importantes, mais c'est là que l'IoT s'éloigne du BMS qui le rend plus précieux pour le personnel des installations en tant qu'outil de gestion. Cet article examine comment une plate-forme de rapports d'analyse IoT peut améliorer les performances du BMS en offrant des commentaires sur l'efficacité énergétique et comment ce changement peut avoir un impact sur le rôle des gestionnaires d'installations. <sup>[1]</sup>

[1] [L'IoT rencontre l'automatisation du bâtiment](https://www.iotforall.com/iot-meets-building-automation)

Dans un poste précédent de DevRel, j'ai fait un petit projet sur le calcul de certaines données environnementales comme le différentiel de pression de vapeur, etc. qui a fini par être * extrêmement * populaire. Apparemment, ces types de calculs et de données sont extrêmement importants dans les opérations de serre. Le maintien de la température, de l'humidité, etc. est la clé du succès d'une opération de serre et la capacité d'automatiser et de surveiller ces éléments est un besoin clé dans l'industrie.

![Automatisation des serres](/posts/category/camunda/iot-project/images/smart-greenhouse-overview-01.png)

La gestion des serres est un sous-ensemble du plus grand segment du marché de l'automatisation des bâtiments, mais qui croît plus rapidement que le marché global du BMS.

> Selon une étude de marché vérifiée, le marché mondial des serres intelligentes était évalué à 0,98 milliard USD en 2018 et devrait atteindre 2,46 milliards USD d'ici 2026, avec un TCAC de 12,11% de 2018 à 2026. <sup>[2]</sup>

[2] [Taille et prévisions du marché des serres intelligentes](https://www.verifiedmarketresearch.com/product/global-smart-greenhouse-market-size-and-forecast-to-2025/)

Cela en fait une cible attrayante pour un PoC.

## Proposition de budget pour le matériel

Il s'agit d'un projet IoT, il nécessitera donc évidemment du matériel IoT. Il s'agit également d'un projet d'automatisation des serres, il faudra donc au moins une sorte de «serre» pour automatiser.

**Capteurs pour l'extérieur:**

| Capteur | Prix | quantité | total |
| -------- | ------- | ---------- | ------- |
| [Station météo](https://www.sparkfun.com/products/15901) | 64,95 $ | 1 | 64,95 $ |
| [Détecteur de foudre](https://www.sparkfun.com/products/15441) | 26,50 $ | 1 | 26,50 $ |
| [ESP32](https://www.sparkfun.com/products/17381) | 20,95 $ | 1 | 20,95 $ |
| [RJ11 Breakout](https://www.sparkfun.com/products/14021) | 1,95 $ | 2 | 3,90 $ |
| [Prises RJ11](https://www.sparkfun.com/products/132) | 1,25 $ | 4 | 5,00 $ |
| [Batterie LiPo](https://www.sparkfun.com/products/13856) | 26,95 $ | 1 | 26,95 $ |
| [Chargeur solaire](https://www.sparkfun.com/products/12885) | 26,95 $ | 1 | 26,95 $ |
| [Panneau solaire](https://www.sparkfun.com/products/13783) | 59,00 $ | 1 | 59,00 $ |
| [Humidité du sol](https://www.sparkfun.com/products/13637) | 6,95 $ | 1 | 6,95 $ |
| [ <sub>Capteur CO 2</sub> ](https://www.sparkfun.com/products/15112) | 59,95 $ | 1 | 59,95 $ |
| **Sous-total** | | | **$301,10** |



**Capteurs de serre:**

| Capteur | Prix | quantité | total |
| -------- | ------- | ---------- | ------- |
| [Humidité du sol](https://www.sparkfun.com/products/13637) | 6,95 $ | 2 | 6,95 $ | 13,90 $ |
| [Moteur pas à pas](https://www.sparkfun.com/products/13656) | 30,95 $ | 1 | 30,95 $ |
| [Pilote pas à pas](https://www.sparkfun.com/products/16836) | 19,95 $ | 1 | 19,95 $ |
| [ESP32](https://www.sparkfun.com/products/17381) | 20,95 $ | 4 | 20,95 $ | 83,81 $ |
| [ <sub>Capteur CO 2</sub> ](https://www.sparkfun.com/products/15112) | 59,95 $ | 1 | 59,95 $ |
| [Fan](https://www.sparkfun.com/products/15708) | 11,95 $ | 1 | 11,95 $ |
| **Sous-total** | | | **220,50 $** |

**Totaux du capteur**
| Zone du projet | Total |
| -------------- | ------- |
| Capteurs extérieurs | 301,10 $ |
| Capteurs intérieurs | 220,50 $ |
| ** Total général: ** | ** 521,60 $ ** |


**Serre**

Celui-ci est un peu un joker. J'ai commencé à regarder ce qui pourrait fonctionner. Je veux que la serre puisse contenir des capteurs (ils sont petits), et au moins un «actionneur» pour ouvrir une fenêtre ou quelque chose, et probablement un ventilateur aussi. Nous parlons de réaliste ici.

| Type de serre | Coût |
| ----------------- | ------ |
| [Extérieur](https://www.worldofgreenhouses.com/products/hybrid-greenhouse-series) | 650 $ |
| [Intérieur](https://www.hpotter.com/buy-terrariums/h-potter-terrarium-classic-wardian-case-for-plants) | 140 $ |
| [Intérieur - petit](https://www.amazon.com/Purzest-Terrarium-Geometric-Tabletop-Succulent) | 36,00 $ |


Bien sûr, pour un PoC vraiment réaliste / précis, la serre extérieure est le meilleur choix. Je ne suis pas sûr de ce que je ferais avec une serre extérieure après que tout soit fait, mais ¯\\\_(ツ)\_/¯.

La version de bureau plus grande a au moins une ouverture que je pourrais motoriser pour donner un peu de réalisme.

**Remarque:** [@mary_grace](https://twitter.com/mary_grace) et j'ai décidé de commencer par le plus petit et le plus portable (compte tenu des voyages à venir, etc.) et de voir comment les choses se passent. Nous pouvons passer à une serre plus grande si la plus petite s'avère une option irréalisable.

## Documentation
Une série d'articles de blog (au moins 2 à 3) couvrant les différentes étapes du développement du PoC
