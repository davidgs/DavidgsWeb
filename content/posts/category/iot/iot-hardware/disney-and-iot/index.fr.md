---
title: "Disney et #IoT"
Date: 2015-01-09
Author: davidgs
Category: Gadgetry, IoT
Slug: disney-and-iot
hero: images/disney.jpg
---

Pendant les vacances, un de mes amis a pris sa famille pendant quelques jours à Disney World. Ils sont restés dans une station dans le parc, payé un supplément pour des lignes plus courtes dans les manèges, et étaient là dans un groupe de 12. C'est un voyage épique probablement digne de propre blog est tout - un autre endroit. Je ne pouvais pas imaginer la logistique d'une telle visite, mais là encore, il a été 10 ans depuis que je suis à Disney World, et apparemment beaucoup de choses ont changé en ce moment-là.

Ce n'est pas vraiment ce que je suis réellement écrit ici. Vous voyez, ils sont venus à la maison avec ces petits bracelets en plastique de froid / caoutchouc. Ils ont été présentés avec les bracelets - Disney les appelle [MagicBands](http://www.google.com/aclk?sa=l&ai=Cn6YVIyGwVIPdI4jYpgPmt4KIBbCdkLcJsPD6kYECuJ7GvaYBCAAQASC5VGDJ7qeKpKTEEaABxvSz_gPIAQGqBB9P0GZkOBPEgK6Ouy6vIILHWD0Zp9Iw_GHI6nWnsLbCgAWQToAHgNn1RYgHAZAHAqgHpr4b&sig=AOD64_3AYdOTwEhFZiBYvxQJk4hZsV2IfQ&rct=j&q=&ved=0CCAQ0Qw&adurl=http://ad.doubleclick.net/clk%3B252175360%3B76276805%3Bl%3Bu%3Dms%3Fhttps://disneyworld.disney.go.com/plan/my-disney-experience/bands-cards/%3FCMP%3DKNC-WDW_FY15_DOM_NGE_BR_MagicBands%7CG%7C4151322.NG.AM.02.01%26keyword_id%3DsX37LLiAO_dc%7Cdisney%2520magic%2520band%7C68978719648%7Ce%7C15402cl14044) - quand ils ont vérifié dans leur hôtel. Chaque personne - jusqu'aux plus petits enfants - a obtenu un personnalisé pour eux.

![21 300x215](/posts/category/iot/iot-hardware/images/21-300x215.jpg )

Ceux-ci étaient plus que simples bracelets bien. Ils fonctionnent comme les clés de leurs chambres d'hôtel, entrée aux parcs, la vérification qu'ils pourraient entrer dans les lignes plus courtes, et leur a permis d'acheter des rafraîchissements et des articles dans le parc. Tout ce qu'ils avaient à faire était de mettre le bracelet à côté d'un point de système d'achat, entrez un code PIN et aller. Pas besoin de chercher un portefeuille. Pas de devoir trouver le changement, ou en espèces, etc. Vraiment pas besoin de transporter quoi que ce soit ** ** dans le parc. Il suffit de porter le Magic Band. Le parc est jonché de lecteurs RF pour eux à l'entrée des manèges, l'entrée du parc, etc.

![DSC03458 XL 800x600](/posts/category/iot/iot-hardware/images/DSC03458-XL-800x600.jpg)

Ces petits appareils sont vraiment des appareils Internet des choses. Disney utilise IdO. Ils font le parc plus pratique et plus facile pour leurs clients, oui, mais c'est juste la manifestation extérieure de ce qu'ils sont en train de faire. Ces bandes sont plus qu'un simple système RFID. Ils contiennent une [technologie RF] beaucoup plus avancé (https://disneyworld.disney.go.com/faq/my-disney-experience/frequency-technology/), et Disney utilise pour suivre et recueillir la télémétrie des invités tout au long de leur rester à la station. Télémétrie? Oui, télémétrie. Ils peuvent surveiller combien de temps vous vous situez dans la ligne, combien de temps les lignes, ce que vous achetez, et où (en leur donnant l'historique d'achat et les données d'achat motif qu'ils peuvent ensuite utiliser sur le marché pour vous). Je devine ici, mais il ne me surprendrait pas s'ils peuvent aussi utiliser le MagicBand pour traquer votre enfant perdu dans la station simplement en trianguler le signal de son groupe.

J'étais tellement intrigué par ce petit gadget que mon ami m'a donné la sienne et je l'ai apporté la maison à disséquer. Permettez-moi de dire, vous, ce n'est pas aussi facile que cela puisse paraître. Ceux-ci sont conçus pour être des dispositifs à usage unique. Vous pouvez l'utiliser lors de votre séjour dans le parc, et vous prenez lorsque vous quittez. Je suppose que si vous revenez au parc une autre fois que vous pouvez présenter votre ancien MagicBand et avoir activé à nouveau, mais vous aurez probablement obtenir un nouveau. Alors, voici comment ça se passait.

J'ai commencé avec un MagicBand:

![IMG 1594](/posts/category/iot/iot-hardware/images/IMG_1594.jpg)

Il est moulé en plastique, donc entrer dans c'était vraiment ** ** difficile, mais un couteau bien aiguisé, quelques petits coupe-fil et 10 minutes plus tard, je (la plupart du temps) dans.

![IMG 1597](/posts/category/iot/iot-hardware/images/IMG_1597.jpg)

Il est une conception très simple, il apparaît, et l'ensemble de la bande de poignet est utilisé comme antenne espace aussi bien, ce qui signifie qu'ils veulent être en mesure de contacter de moi la distance et / ou ont besoin d'un signal fort et fiable. Je sais que ce n'est pas seulement un simple système de RFID, car il contient un de ces:

![IMG 1598](/posts/category/iot/iot-hardware/images/IMG_1598.jpg)

Il est donc un dispositif alimenté. Je creusais et creusé et creusé, et enfin ce que je suis tombé sur ** pense ** est le processeur, mais donc, même avec ma loupe, je ne peux pas identifier la puce.

![IMG 1601](/posts/category/iot/iot-hardware/images/IMG_1601.jpg)

Et il a été attaché à une carte de circuit simple couche très simple:

![IMG 1600](/posts/category/iot/iot-hardware/images/IMG_1600.jpg)

Tout cela a été non seulement dans du plastique, mais il a été effectivement moulé dans le plastique, il était donc très ** ** difficile d'entrer dans, et impossible d'entrer dans sans le détruire dans le processus.

Ce sont le genre de produits IdO que vous ne voyez pas ** ** au CES, ou plâtré sur tout le web. Ce sont les types de dispositifs IdO sont déjà ** ** changer la façon dont fonctionnent les entreprises. Ils fournissent Disney avec pas seulement Big Data, mais * Massive données * sur ce que leurs clients sont en fait * * faire, probablement en temps réel, alors que dans le parc. C'est le genre de télémétrie qui peut transformer complètement une entreprise. C'est IdO peut transformer une industrie.
