---
title: "Créateur de liens"
date: 2023-04-09T08:25:45-04:00
Author: davidgs
Category: General
Tags: open source, link building,QR codes
Slug: link-builder
description: Créer des codes QR pour vos liens
hero: images/link-builder-header.png
draft: true
reading_time:
---

## Quelle est cette sorcellerie?

Il y a environ un an, je commençais à jouer avec React.js comme exercice d'apprentissage. En réalité, je travaillais à la fois avec [React.js](https://reactjs.org) et [Electron](https://electronjs. org) pour créer des applications autonomes.

Dans le même temps, l'entreprise pour laquelle je travaillais cherchait un moyen de créer facilement des liens codés en utm pour tous les membres de l'entreprise. Si vous ne savez pas ce que sont les "liens codés UTM", vous pouvez en savoir plus [ici](https://funnel.io/resources/google-analytics-utm-tagging), mais c'est un truc assez geek. Disons simplement que si vous voulez pouvoir répondre à des questions telles que « est-ce que plus de personnes cliquent sur mes liens sur Twitter ou LinkedIn ? alors les liens UTM sont ce dont vous avez besoin.

Mais je m'éloigne du sujet. Alors que je réfléchissais à un moyen de créer un tel outil, j'ai eu un moment "*Eureka!*". Je me suis dit que je pouvais créer une petite application qui ferait ça !

Alors je l'ai fait. J'ai construit une petite application qui prendrait une URL et vous permettrait d'y ajouter des paramètres utm prédéfinis pour que le marketing puisse suivre l'efficacité de leurs liens. C'était une application simple, mais elle fonctionnait. Et c'était amusant à construire.

Ce travail a décidé de ne pas l'utiliser (si vous pensez que le syndrome du "pas inventé ici" est mort, j'ai quelques histoires à raconter !), mais j'ai décidé de continuer à travailler dessus pendant mon temps libre pour approfondir mes compétences en React.js.

J'utilise ici l'expression « compétences de réaction » de manière très vague. Je ne suis pas un développeur React et je ne serais jamais pris pour tel. Mais j’apprends en faisant, alors j’ai continué à le faire.

## Ajoutons plus de fonctionnalités !

Une application qui ne fait guère plus que créer des liens codés en utm n’est pas vraiment la solution ultime. Ensuite, quelqu'un que je suis sur Twitter (et je n'arrive jamais à trouver ses tweets à ce sujet, donc si vous le reconnaissez, faites-le moi savoir afin que je puisse lui donner le crédit approprié !) a posté sur la création de codes QR en JavaScript et j'ai J'ai pensé : "Hé, ce serait une fonctionnalité intéressante pour mon application !"

Permettez-moi juste de dire que le "hé, je peux faire ça!" et "à quel point cela peut-il être difficile ?" C'est mon attitude qui me cause des ennuis. Mais je m'éloigne encore une fois.

Quoi qu'il en soit, l'application est devenue quelque chose de très utile, et mon travail actuel a décidé de l'adopter à l'échelle de l'entreprise pour créer des liens codés et des codes QR. L'une des choses que j'ai faites pour eux a été de concevoir un code QR personnalisé intégrant le logo de l'entreprise, les couleurs de l'entreprise et des « yeux » personnalisés dans le code QR.

![Code QR personnalisé](images/example.png)

Un QR Code plutôt sympa, non ?

## Créons des codes QR personnalisés !

Ensuite, j'ai eu l'idée de créer une application qui vous permettrait de concevoir vos propres codes QR et de les personnaliser comme vous le souhaitez. J'ai essayé de créer une application entièrement distincte pour cela, et j'ai eu un certain succès, mais cela m'a semblé demander beaucoup d'efforts pour concevoir un code QR, puis je dois l'ajouter d'une manière ou d'une autre à *l'autre* application à utiliser lorsque vous créez liens.

Ce qu'il faut faire. Ce qu'il faut faire?

## Et aussi ...

En même temps que je faisais tout ça, je montrais à quelques personnes ce que je faisais et, bon, disons qu'il y avait un certain enthousiasme. Mais j'avais toujours un problème. La seule version réelle et fonctionnelle dont je disposais était fortement personnalisée pour mon employeur, et elle ne serait pas très utile pour de nombreuses autres entreprises.

## Il est temps de repenser l'architecture

Afin de rendre cette application vraiment utile pour le public le plus large possible, il fallait vraiment qu'elle soit personnalisable pour chaque utilisateur. Certaines personnes voudront peut-être un paramètre UTM particulier, tandis que d'autres n'en voudront pas. Certaines personnes peuvent souhaiter qu'un paramètre UTM particulier provienne d'une liste prédéfinie, tandis que d'autres souhaitent qu'il s'agisse d'un simple champ de texte.

Cela va demander *beaucoup* de personnalisation. Et il faudra beaucoup de travail pour y parvenir. Ou peut être pas.

## Extrêmement personnalisable

J'ai décidé de rendre presque tous les aspects de l'application personnalisables. J'ai créé un panneau de personnalisation qui permettrait à un utilisateur de modifier presque tous les aspects de l'application.

Commençons par à quoi ressemble l'application lorsque vous l'ouvrez pour la première fois :

![Générateur de liens](images/main-interface.png)

En regardant cela, la toute première chose que vous souhaiterez probablement changer est ce logo. Qui a pensé que *c'était* une bonne idée ? Eh bien, je l'ai fait. Mais ce n’est peut-être pas le cas. Alors changeons-le.



