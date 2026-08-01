# Screens and components

> Deliverable from the Designer role.

## Pantalla: Principal (TaskFlow)
- **Estado vacio:** Mensaje "No hay tareas para este filtro" y formulario de alta visible.
- **Estado de carga:** No aplica en MVP (datos locales).
- **Estado de error:** Mensaje en rojo cuando falla validacion o guardado local.
- **Estado de exito:** Lista renderizada con tareas, filtros activos y contador de pendientes.
- **Accesibilidad:**
	- Input con `aria-label` para nueva tarea.
	- Checkboxes con etiqueta de accion.
	- Navegacion por teclado para crear, editar y guardar.

## Componentes base del MVP
- `TodoApp`: contenedor principal.
- `TaskInput`: campo + boton Agregar (implementado dentro de `TodoApp`).
- `FilterTabs`: botones Todas/Pendientes/Completadas (implementado dentro de `TodoApp`).
- `TaskRow`: fila de tarea con checkbox, editar y eliminar (implementado dentro de `TodoApp`).
- `ErrorMessage`: feedback de validacion y persistencia.
