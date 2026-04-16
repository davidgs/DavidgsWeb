---
Title: "Some Big Duckling Updates"
Date: 2026-04-16
Category:
Slug: some-big-duckling-updates
hero: ./images/hero.png
reading_time: 5 minutes
---

Cela fait quelques mois que je n'ai pas écrit sur Duckling, et depuis, j'ai apporté d'importantes mises à jour au projet. Si vous ne connaissez pas Duckling, il s'agit d'une interface web pour la bibliothèque Docling d'IBM, qui offre de puissantes fonctionnalités de conversion de documents. Avec Duckling, vous pouvez facilement convertir des PDF en texte, des documents Word en Markdown, et même effectuer une reconnaissance optique de caractères (OCR) sur des images numérisées.

## Quoi de neuf ?

### Améliorations en matière d'accessibilité

Tout d'abord, j'ai apporté plusieurs modifications d'accessibilité afin de rendre l'application plus utilisable par tous. Il y avait des problèmes de contraste et certains éléments interactifs n'étaient pas accessibles au clavier. J'ai également ajouté des balises ARIA pour améliorer la compatibilité avec les lecteurs d'écran. J'espère que cela résout certains problèmes d'accessibilité présents dans la version initiale.

### Traitement par lots vs. traitement de fichiers individuels

Ce qui m'a toujours gêné avec cette interface, c'est l'obligation de passer du mode de traitement « fichier unique » au mode « traitement par lots » pour traiter plusieurs fichiers. Pour simplifier la procédure, j'ai supprimé l'option « traitement par lots » dans l'en-tête et j'ai directement intégré la possibilité de glisser-déposer plusieurs fichiers simultanément. J'ai également ajouté la possibilité de glisser-déposer un dossier entier (ou d'en sélectionner un via l'explorateur de fichiers) pour que tous les fichiers qu'il contient soient traités. Enfin, le logiciel ignore simplement les fichiers non pris en charge, au lieu de générer une erreur.

### Indicateurs de performance

J'ai ajouté un nouvel onglet « Performances » à la barre latérale. Il affiche des indicateurs de performance de base pour la dernière conversion, notamment le temps d'exécution de chaque étape et le temps total. Ces informations permettent de mieux comprendre la durée des différents types de conversions et facilitent le dépannage des problèmes de performance.

Nous avons d'abord quelques chiffres de base concernant l'utilisation globale, etc.

![Tableau de bord statistique affichant les indicateurs de conversion : 9 tâches au total, 9 réussies, 0 échec, soit un taux de réussite de 100 %. D'autres indicateurs indiquent un temps de traitement moyen de 0,1 seconde et 0 tâche en attente. L'interface présente un fond bleu marine foncé avec des touches de cyan et de rouge.](images/stats-1.png)



![](images/hardware-stats.png)



![](images/storage-stats.png)



![](images/input-stats.png)









![](images/generate-chunks.png)



![](images/rag-chunks.png)








