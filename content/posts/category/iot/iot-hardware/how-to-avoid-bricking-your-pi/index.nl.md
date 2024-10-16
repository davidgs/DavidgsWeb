---
title:  "Hoe voorkom je dat je Raspberry Pi tijdens updates vastloopt"
date: 2024-10-16T08:06:25+06:00
description:  Voorkom dat uw Pi wordt geblokkeerd
hero: images/pile-of-bricks.jpg
reading_time: 3 minutes
relcanonical: https://dev.to/davidgs/how-to-avoid-bricking-your-device-during-update-rollouts-2hm1
---

Het is een reëel risico dat een update je apparaat brickt (onbruikbaar maakt), en zelfs de grootste bedrijven hebben dit wel eens meegemaakt. Dit is Apple onlangs overkomen ([Apple pauzeert iPadOS 18-uitrol voor M4 iPad Pro na brickklachten](https://arstechnica.com/gadgets/2024/09/apple-pauses-ipados-18-rollout-for-m4-ipad-pro-after-bricking-complaints/)) en ik denk dat we allemaal wel op de hoogte zijn van het [Crowdstrike-incident](https://en.wikipedia.org/wiki/2024_CrowdStrike_incident).

Het is zo'n probleem dat het, gezien de recente rampen met update-uitrols (waar ik kort over schreef [hier](https://dzone.com/articles/how-you-can-avoid-a-crowdstrike-fiasco)), een goed onderwerp leek om in te duiken.

Ik heb altijd gedacht dat als je een probleem niet met een oplossing aanpakt, je waarschijnlijk niet helpt. Daarom heb ik gekeken naar manieren om het probleem van updates die 'slecht' worden, daadwerkelijk op te lossen en hoe je betere strategieën kunt implementeren om deze te implementeren.

Het meeste van wat ik zei is natuurlijk niet nieuw of wereldschokkend, maar het is de moeite waard om er eens goed naar te kijken als je grote aantallen apparaten inzet die op elk moment beheerd en bijgewerkt moeten worden in het veld. Laten we eerlijk zijn, op een gegeven moment gaat er iets _mis_. Dat gebeurt altijd. Dus plannen hoe je ervan kunt herstellen _voordat_ het gebeurt is verstandig en laat je klanten zien dat je voor hen en hun belangen zorgt. Het is echt je klanten op de eerste plaats zetten door ervoor te zorgen dat ze je op de lange termijn als een vertrouwde partner kunnen zien.

Ik behandel een aantal belangrijke onderwerpen zoals A/B-partitionering, rollbacks na mislukte updates en andere, maar ik ga hier niet in op alle details. Ik raad je aan om de video te bekijken {% embed https://youtu.be/XELyHZp_exM?si=nNUaPIZcgr0Vlh-o %}
en laat me weten wat je ervan vindt.

Ik zou graag een bredere discussie willen beginnen over het onderwerp veerkracht in updates, omdat ik er stellig van overtuigd ben dat dit, samen met beveiliging, een cruciaal gebied is waarop IoT zich moet richten om de belofte van de technologie waar te maken.

Deze lezing is sterk afhankelijk van producten van [Zymbit](https://zymbit.com/?utm_source=dev-to&amp;utm_medium=blog&amp;utm_term=dev-to), waaronder [Zymkey](https://zymbit.com/zymkey/?utm_source=dev-to&amp;utm_medium=blog&amp;utm_term=dev-to) en [Bootware](https://zymbit.com/bootware/?utm_source=dev-to&amp;utm_medium=blog&amp;utm_term=dev-to), maar de algemene concepten zijn toepasbaar op verschillende leveranciers.

**Opmerking:** Als u betrokken bent bij IoT in North Carolina, Northern Virginia of Colorado, en u weet niets van [R!OT](https://riot.org), dan mist u een van de beste bronnen voor IoT-professionals. Ze organiseren regelmatig evenementen, workshops, Lunch and Learns, etc. voor hun leden. Deze lezing werd oorspronkelijk gepresenteerd als een Lunch and Learn voor R!OT. Ik moedig u aan om lid te worden en hun evenementen bij te wonen als dit een gebied is dat u interesseert.
