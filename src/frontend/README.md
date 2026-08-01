# Frontend

## Requisitos
- Node.js 20+
- npm 10+

## Comandos
- `npm install`
- `npm run dev`
- `npm run test`
- `npm run test:e2e`

## Alcance MVP actual
- Crear tarea (Enter o boton)
- Marcar/desmarcar completada
- Editar tarea (doble click o boton)
- Eliminar tarea
- Filtrar por todas, pendientes o completadas
- Persistencia local en `localStorage`

## Notas
- El frontend se renderiza desde `src/pages/index.astro` con hidratacion `client:load`.
- La logica de estado vive en `src/frontend/composables/useTodos.ts`.
