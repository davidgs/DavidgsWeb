---
title: "Intel Edison Big Hat, pas de bétail"
Date: 2015-12-11
Author: davidgs
Category: IoT
Slug: intel-edison-big-hat-no-cattle
hero: images/NewImage.png
---

Il était presque exactement il y a un an que je l'ai acheté mon premier kit de développement Intel Edison. Je suis tout excité par les perspectives de celui-ci, comme vous pouvez le voir [ici](/posts/category/iot/iot-hardware/intel-edison-iot-board/). Il est un beau, petit, puissant (si avide de pouvoir) du conseil IdO qui a tenu beaucoup de promesses pour le développement et le prototypage.

Je voudrais être toujours aussi excité à ce sujet.

J'ai essayé, plusieurs fois, de l'utiliser pour un projet de développement ou d'une autre. Je suis même d'essayer à nouveau maintenant. Mon expérience a été moins positif. En fait, il a été carrément décevant. Maintenant, un de mes [saisines initiales](/posts/category/iot/iot-hardware/intel-edison-iot-board/) à propos de la plate-forme a été la facilité d'utilisation et le processus non-intuitif pour flasher / mise à jour / etc . le tableau. Pour être juste, Intel a travaillé sur ce point, et il y a maintenant des outils assez décents pour la gestion du conseil d'administration.

Cela étant dit, il est beaucoup plus que ** ne fonctionne pas ** sur ce tableau que fait. Par exemple, SPI. C'est ensemble d'un grand, pour moi. J'ai passé environ un mois de travail sur l'obtention d'un dispositif de SPI à travailler avec le conseil d'administration et rien rencontré, mais les problèmes. messages répétés à l'Intel Developer Forums a provoqué une série de réponses énigmatiques indiquant que j'accrochage les choses correctement, le dispositif de SPI ne fonctionnait pas correctement, etc. * est * un dispositif expérimental, de sorte que ces choses étaient plausibles. Jusqu'à ce que je suis un analyseur logique et les signaux débogué effectivement sortant de l'Edison. Il est alors devenu très clair que SPI sur la Mini SFE était irrémédiablement brisé. À ce moment-là, Intel a reconnu que SPI était cassé. Ils auraient pu me sauver un tas de temps ils avaient écopé de plus tôt. Donc, SPI est sorti.

Ok, SPI est irrémédiablement brisé. La I2C try Let. Jusqu'à présent, l'expérience avec I2C a été à peu près similaire. Je dirai que d'avoir des résistances de rappel interne sur les broches que je peux définir des valeurs pré-définies est très utile. Documentation sur I2C - et les résistances de pull-up - comme toute la documentation Edison, est assez mince, mais si vous êtes persistant dans la recherche sur le web, vous trouverez les réponses dont vous avez besoin (Astuce: `cd / sys / kernel / debug / gpio_debug /<pin number> `Et puis regardez dans` available_pullmode`, `available_pullstrength` des valeurs acceptables, puis mettre la valeur que vous voulez dans` `current_pullmode` et current_pullstrength`. Ne jamais dire que je n'étais pas utile.)

Je suis le SDA / SCL pull-up résistances correctement définies, et la direction correctement ensemble, et l'appareil que je travaille avec est maintenant au moins ** vu ** sur le bus I2C. Mais c'est à peu près aussi loin que je peux obtenir. En théorie, le Buss I2C a plusieurs vitesses, mais en réalité il est assez bien collé à 300kHz. Mon appareil est 100kHz. Encore une fois, en théorie, vous pouvez changer la vitesse, mais en réalité, au moins selon tous les postes et les réponses, la seule façon de le faire efficacement c'est de reconstruire l'ensemble du noyau Linux, et même alors, YMMV.

Inutile de dire que mon kilométrage ne varie. Je l'ai essayé d'utiliser Javascript (Node.js), Python, C et croquis Arduino pour accéder au bus I2C et ce dispositif et chacun échoue - de manière totalement différente. Ce n'est pas une bonne chose.

Le dispositif que je utilise, un [Melexis MLX90614](https://www.sparkfun.com/datasheets/Sensors/Temperature/MLX90614_rev001.pdf) (PDF) Thermomètre IR, dispose également d'un mode PWM. Ok, dernière chance Edison. Jeu sur!

Devinez quoi? Intel Edison ne fait que sur PWM. Non PWM. Je ne peux pas lire le périphérique. Si elle était un servo, je serais prêt. Mais ce n'est pas. Donc, encore une fois, je trouve le Intel Edison être plein de promesses, sans capacité à fournir.

Je garderai tapait dessus et voir si je peux éventuellement obtenir Edison pour faire quoi que ce soit utile, mais jusqu'à présent, il est un petit appareil mignon qui est pas le moins utile. Puissant, mais inutile.
