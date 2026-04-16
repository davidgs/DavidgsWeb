---
Title: "Some Big Duckling Updates"
Date: 2026-04-16
Category:
Slug: some-big-duckling-updates
hero: ./images/hero.png
reading_time: 5 minutes
---

Han pasado algunos meses desde mi última publicación sobre Duckling (https://davidgs.com/posts/category/open-source/a-fresh-ui-for-docling/), y durante este tiempo he realizado importantes actualizaciones al proyecto. Si no conoces Duckling, se trata de una interfaz web para la biblioteca Docling de IBM (https://docling.ai/), que ofrece potentes funciones de conversión de documentos. Con Duckling, puedes convertir fácilmente archivos PDF a texto, documentos de Word a Markdown e incluso realizar reconocimiento óptico de caracteres (OCR) en imágenes escaneadas.

## ¿Qué hay de nuevo?

### Mejoras de accesibilidad

Bueno, antes que nada, hice varios cambios de accesibilidad para que la aplicación sea más fácil de usar para todos. Había algunos problemas con el contraste y algunos elementos interactivos no eran accesibles mediante el teclado. También agregué etiquetas ARIA para mejorar la compatibilidad con lectores de pantalla. Espero que esto solucione algunos de los problemas de accesibilidad que presentaba la versión inicial.

### Procesamiento de archivos en lote frente a procesamiento de archivos individuales

Una cosa que siempre me molestó de esta interfaz fue la necesidad de cambiar del modo de procesamiento de "archivo único" al de "procesamiento por lotes" para procesar más de un archivo. Para simplificar el proceso, eliminé el interruptor de "Procesamiento por lotes" del encabezado y simplemente hice que el área de arrastrar y soltar permitiera soltar varios archivos a la vez. También agregué la opción de soltar una carpeta completa (o seleccionar una carpeta si se usa el selector de archivos) y que se procesen todos los archivos que contiene. Ah, y simplemente ignora los archivos no compatibles, en lugar de mostrar un error.

### Métricas de rendimiento

He añadido una nueva pestaña de "Rendimiento" a la barra lateral que muestra algunas métricas básicas de rendimiento de la conversión más reciente. Esto incluye el tiempo empleado en cada paso del proceso de conversión, así como el tiempo total. Esta información es útil para comprender cuánto tiempo tardan los distintos tipos de conversiones y puede ayudar a solucionar problemas de rendimiento.

Primero tenemos algunas cifras básicas de uso general, etc.

![Panel de estadísticas que muestra las métricas de conversión de trabajos: 9 trabajos en total con 9 éxitos, 0 fallos y una tasa de éxito del 100 %. Las métricas adicionales muestran un tiempo de procesamiento promedio de 0,1 segundos y 0 trabajos actualmente en cola. La interfaz presenta un fondo azul marino oscuro con detalles en cian y rojo.](images/stats-1.png)



![](images/hardware-stats.png)



![](images/storage-stats.png)



![](images/input-stats.png)









![](images/generate-chunks.png)



![](images/rag-chunks.png)








