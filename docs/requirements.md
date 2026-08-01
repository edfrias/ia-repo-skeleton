# Requisitos — [Nombre de la feature/proyecto]

> Entregable del rol Product Owner. Ver `agents/product-owner.md`.

## Contexto y problema
Quiero crear una to-do app

## Historias de usuario

### HU-1: [título]
Como usuario, quiero poder crear, eliminar y agrupar tareas en una to-do app, para poder organizarme mis tareas.

**Criterios de aceptación:**

1. El usuario puede crear una nueva tarea introduciendo un texto y confirmando con Enter o un botón.
2. El usuario puede marcar una tarea como completada; la tarea se muestra visualmente diferenciada (tachada o con icono).
3. El usuario puede desmarcar una tarea completada para devolverla al estado pendiente.
4. El usuario puede editar el texto de una tarea existente haciendo doble clic sobre ella.
5. El usuario puede eliminar una tarea individualmente mediante un botón o acción explícita.
6. El usuario puede agrupar tareas en listas o categorías con nombre personalizado.
7. El usuario puede mover una tarea de una lista/categoría a otra.
8. El usuario puede reordenar las tareas dentro de una lista arrastrando o mediante controles de orden.
9. El sistema persiste las tareas entre sesiones (recarga de página o cierre y reapertura de la app).
10. El usuario puede filtrar las tareas por estado: todas, pendientes y completadas.
11. El usuario puede eliminar todas las tareas completadas de una lista con una sola acción.
12. Se muestra el número de tareas pendientes en cada lista.

**Prioridad:** Must / Should / Could / Won't

## Fuera de alcance
- Autenticación y gestión de usuarios (registro, login, perfiles).
- Sincronización en la nube o entre dispositivos.
- Notificaciones push o recordatorios por fecha/hora.
- Colaboración en tiempo real entre varios usuarios.
- Adjuntos de archivos o imágenes en tareas.
- Integración con calendarios externos (Google Calendar, Outlook, etc.).
- Aplicación móvil nativa (iOS/Android).

## Supuestos
- El usuario accede a la app desde un navegador web moderno (Chrome, Firefox, Edge o Safari actuales).
- La persistencia de datos se implementa con `localStorage`; no se requiere base de datos externa en esta fase.
- Un único usuario por dispositivo/navegador; no hay contexto multiusuario.
- El texto de una tarea no supera los 500 caracteres.
- El número de listas por usuario y de tareas por lista es suficientemente pequeño para no requerir paginación.
