---
Title: "Some Big Duckling Updates"
Date: 2026-04-16
Category:
Slug: some-big-duckling-updates
hero: ./images/hero.png
reading_time: 5 minutes
---

Het is alweer een paar maanden geleden dat ik [voor het laatst over Duckling schreef](https://davidgs.com/posts/category/open-source/a-fresh-ui-for-docling/), en in die tijd heb ik een aantal belangrijke updates aan het project doorgevoerd. Mocht je nog nooit van Duckling hebben gehoord, het is een webinterface voor IBM's [Docling](https://docling.ai/) bibliotheek, die krachtige mogelijkheden biedt voor documentconversie. Met Duckling kun je eenvoudig PDF's naar tekst converteren, Word-documenten naar Markdown en zelfs OCR uitvoeren op gescande afbeeldingen.

Wat is er nieuw?

### Toegankelijkheidsverbeteringen

Nou, allereerst heb ik een aantal toegankelijkheidsaanpassingen gedaan om de app voor iedereen gebruiksvriendelijker te maken. Er waren wat problemen met contrasten en sommige interactieve elementen waren niet toegankelijk via het toetsenbord. Ik heb ook een aantal ARIA-labels toegevoegd om de ondersteuning voor schermlezers te verbeteren. Hopelijk lost dit een aantal van de toegankelijkheidsproblemen op die in de eerste versie aanwezig waren.

### Verwerking van meerdere bestanden versus verwerking van individuele bestanden

Een ding dat me altijd stoorde aan deze interface was de noodzaak om te schakelen tussen de modus "Enkel bestand" en "Batchverwerking" om meerdere bestanden tegelijk te verwerken. Om dit te vereenvoudigen, heb ik de "Batch"-schakelaar in de header verwijderd en het sleepgebied zo aangepast dat je meerdere bestanden tegelijk kunt slepen. Ik heb ook de mogelijkheid toegevoegd om een hele map te slepen (of een map te selecteren als je de bestandsselector gebruikt) en alle bestanden in die map te laten verwerken. Bovendien worden bestanden die niet worden ondersteund automatisch genegeerd in plaats van een foutmelding te geven.

### Prestatiestatistieken

Ik heb een nieuw tabblad 'Prestaties' aan de zijbalk toegevoegd dat enkele basisprestatiegegevens voor de meest recente conversie weergeeft. Dit omvat de tijd die nodig was voor elke stap van het conversieproces, evenals de totale tijd. Dit is handig om te begrijpen hoe lang verschillende soorten conversies duren en kan helpen bij het opsporen van prestatieproblemen.

Allereerst hebben we een aantal basiscijfers over het totale gebruik, enzovoort.

![Statistisch dashboard met conversiegegevens: 9 taken in totaal, waarvan 9 succesvol, 0 mislukt en een succespercentage van 100%. Aanvullende gegevens tonen een gemiddelde verwerkingstijd van 0,1 seconde en 0 taken in de wachtrij. De interface heeft een donkerblauwe achtergrond met accentkleuren in cyaan en rood.](images/stats-1.png)



![](images/hardware-stats.png)



![](images/storage-stats.png)



![](images/input-stats.png)









![](images/generate-chunks.png)



![](images/rag-chunks.png)








