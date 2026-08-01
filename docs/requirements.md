# Requisitos — TaskFlow (MVP)

> Entregable del rol Product Owner. Ver `agents/product-owner.md`.

## Contexto y problema
Quiero crear una to-do app ligera para navegador, sin backend ni autenticacion, que me permita gestionar mis tareas diarias y mantenerlas entre sesiones.

## Historias de usuario

### HU-1: Gestion diaria de tareas
Como usuario, quiero crear, completar, editar y eliminar tareas, para organizarme mejor cada dia.

**Criterios de aceptacion (MoSCoW + iteracion):**

1. [MUST - Iteracion 1] El usuario puede crear una nueva tarea introduciendo un texto y confirmando con Enter o boton.
2. [MUST - Iteracion 1] El usuario puede marcar una tarea como completada; la tarea se muestra visualmente diferenciada.
3. [MUST - Iteracion 1] El usuario puede desmarcar una tarea completada para devolverla al estado pendiente.
4. [MUST - Iteracion 1] El usuario puede editar el texto de una tarea existente haciendo doble clic o usando un boton de edicion.
5. [MUST - Iteracion 1] El usuario puede eliminar una tarea individualmente mediante un boton o accion explicita.
6. [MUST - Iteracion 1] El sistema persiste las tareas entre sesiones (recarga o cierre/reapertura de la app).
7. [MUST - Iteracion 1] El usuario puede filtrar tareas por estado: todas, pendientes y completadas.
8. [SHOULD - Iteracion 1] Se muestra el numero de tareas pendientes.
9. [SHOULD - Iteracion 1] El usuario puede eliminar todas las tareas completadas con una sola accion.
10. [COULD - Iteracion 2] El usuario puede agrupar tareas en listas o categorias con nombre personalizado.
11. [COULD - Iteracion 2] El usuario puede mover una tarea de una lista/categoria a otra.
12. [COULD - Iteracion 2] El usuario puede reordenar tareas dentro de una lista arrastrando o mediante controles.

**Prioridad de entrega actual:** completar criterios 1 a 9.

## Fuera de alcance
- Autenticación y gestión de usuarios (registro, login, perfiles).
- Sincronización en la nube o entre dispositivos.
- Notificaciones push o recordatorios por fecha/hora.
- Colaboración en tiempo real entre varios usuarios.
- Adjuntos de archivos o imágenes en tareas.
- Integración con calendarios externos (Google Calendar, Outlook, etc.).
- Aplicación móvil nativa (iOS/Android).
- Listas/categorias multiples en esta primera iteracion.

## Supuestos
- El usuario accede a la app desde un navegador web moderno (Chrome, Firefox, Edge o Safari actuales).
- La persistencia de datos se implementa con `localStorage`; no se requiere base de datos externa en esta fase.
- Un único usuario por dispositivo/navegador; no hay contexto multiusuario.
- El texto de una tarea no supera los 500 caracteres.
- El numero de tareas es suficientemente pequeno para no requerir paginacion.
