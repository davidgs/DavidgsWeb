---
title:  « Comment éviter de bloquer votre Raspberry Pi pendant les mises à jour »
date: 2024-10-16T08:06:25+06:00
description:  Évitez de bricker votre Pi
hero: images/pile-of-bricks.jpg
reading_time: 3 minutes
relcanonical: https://dev.to/davidgs/how-to-avoid-bricking-your-device-during-update-rollouts-2hm1
---

Le fait que votre appareil soit rendu inutilisable par une mise à jour est un risque réel, et même les plus grandes entreprises sont connues pour cela. Cela vient d'arriver à Apple ([Apple suspend le déploiement d'iPadOS 18 pour l'iPad Pro M4 après des plaintes de briquage](https://arstechnica.com/gadgets/2024/09/apple-pauses-ipados-18-rollout-for-m4-ipad-pro-after-bricking-complaints/)) et je pense que nous sommes tous bien au courant de [l'incident Crowdstrike](https://en.wikipedia.org/wiki/2024_CrowdStrike_incident) maintenant.

C'est un tel problème que, compte tenu des récents désastres liés aux déploiements de mises à jour (sur lesquels j'ai brièvement écrit [ici](https://dzone.com/articles/how-you-can-avoid-a-crowdstrike-fiasco)), cela semblait être un bon sujet à aborder.

J'ai toujours pensé que si vous ne pouvez pas résoudre un problème avec une solution, vous n'aidez probablement pas, j'ai donc cherché des moyens de résoudre réellement le problème des mises à jour qui « tournent mal » et comment mettre en œuvre de meilleures stratégies pour les déployer.

Bien entendu, la plupart de ce que j'ai dit n'est pas nouveau ni révolutionnaire, mais cela vaut la peine d'y réfléchir sérieusement si vous déployez un grand nombre d'appareils qui devront à tout moment être gérés et mis à jour sur le terrain. Soyons réalistes, à un moment ou à un autre, quelque chose ne va pas. C'est toujours le cas. Il est donc prudent de prévoir comment s'en remettre avant que cela ne se produise, et cela montre à vos clients que vous vous occupez d'eux et de leurs intérêts. Il s'agit en fait de donner la priorité à vos clients en vous assurant qu'ils peuvent vous considérer comme un partenaire de confiance sur le long terme.

J'aborde certains sujets clés comme le partitionnement A/B, les restaurations après l'échec des mises à jour et d'autres, mais je ne vais pas entrer dans tous les détails ici. Je vous encourage à regarder la vidéo {% embed https://youtu.be/XELyHZp_exM?si=nNUaPIZcgr0Vlh-o %}
et faites-moi part de vos réflexions.

J’aimerais lancer une discussion plus large sur ce sujet de la résilience dans les mises à jour, car je crois fermement qu’avec la sécurité, il s’agit d’un domaine critique sur lequel l’IoT doit se concentrer afin de commencer à tenir la promesse de la technologie.

Cette conférence s'appuie largement sur les produits de [Zymbit](https://zymbit.com/?utm_source=dev-to&amp;utm_medium=blog&amp;utm_term=dev-to), notamment [Zymkey](https://zymbit.com/zymkey/?utm_source=dev-to&amp;utm_medium=blog&amp;utm_term=dev-to) et [Bootware](https://zymbit.com/bootware/?utm_source=dev-to&amp;utm_medium=blog&amp;utm_term=dev-to), mais les concepts généraux sont applicables à une variété de fournisseurs.

**Remarque :** si vous êtes impliqué dans l'IoT en Caroline du Nord, dans le nord de la Virginie ou au Colorado et que vous ne connaissez pas [R!OT](https://riot.org), vous passez à côté de l'une des meilleures ressources pour les professionnels de l'IoT. Ils organisent régulièrement des événements, des ateliers, des déjeuners-conférences, etc. pour leurs membres. Cette conférence a été présentée à l'origine sous la forme d'un déjeuner-conférence pour R!OT. Je vous encourage à vous joindre à eux et à assister à leurs événements si ce domaine vous intéresse.
