# User flows

> Deliverable from the Designer role. One flow per relevant user story.

## Flujo: HU-1 - Gestion diaria de tareas

1. Usuario abre la app y visualiza el contador de pendientes.
2. Escribe una tarea en el input y confirma con Enter o boton.
3. La tarea aparece al inicio de la lista y se guarda en localStorage.
4. Usuario puede marcar/desmarcar una tarea con checkbox.
5. Usuario puede editar una tarea con doble clic o boton Editar.
6. Usuario puede eliminar una tarea con boton Eliminar.
7. Usuario puede cambiar el filtro entre Todas, Pendientes y Completadas.
8. Usuario puede limpiar tareas completadas con una sola accion.
9. Al recargar la pagina, la app restaura el estado desde localStorage.

## Reglas de validacion del flujo

1. El texto no puede ser vacio.
2. El texto no puede superar 500 caracteres.
3. Ante error de guardado, se muestra mensaje visible al usuario.
