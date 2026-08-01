# Reporte QA - 2026-08-01 (Iteracion 1 MVP)

> Entregable del rol QA. Ver `agents/qa.md`.

## Resumen
Aprobado

## Cobertura de criterios de aceptación
- [x] HU-1 CA-1 (crear tarea con Enter o boton): cubierto por E2E `crear tarea con Enter y boton`.
- [x] HU-1 CA-2 (marcar completada): cubierto por E2E `completar tarea y filtrar por estado`.
- [x] HU-1 CA-3 (desmarcar completada): cubierto por pruebas unitarias de `toggleTodo`.
- [x] HU-1 CA-4 (editar tarea): cubierto por E2E `editar y eliminar tarea` y unit `updateTodoText`.
- [x] HU-1 CA-5 (eliminar tarea): cubierto por E2E `editar y eliminar tarea` y unit `removeTodo`.
- [x] HU-1 CA-6 (persistencia entre sesiones): cubierto por E2E `persistencia tras recarga y limpiar completadas`.
- [x] HU-1 CA-7 (filtro por estado): cubierto por E2E `completar tarea y filtrar por estado` y unit `getFilteredTodos`.
- [x] HU-1 CA-8 (contador pendientes): cubierto por E2E `crear tarea con Enter y boton` y `completar tarea y filtrar por estado`.
- [x] HU-1 CA-9 (limpiar completadas): cubierto por E2E `persistencia tras recarga y limpiar completadas`.

## Ejecuciones realizadas
- Unit: `npm run test` -> 7/7 tests OK.
- E2E: `npm run test:e2e` -> 4/4 tests OK (Chromium).
- Build: `npm run build` -> OK.

## Bugs encontrados
### [menor] Ambiguedad inicial en selector de filtro "Completadas"
- **Pasos para reproducir:** ejecutar E2E con selector no acotado `getByRole('button', { name: 'Completadas' })`.
- **Resultado esperado:** seleccionar solo el tab de filtro.
- **Resultado real:** colision con boton "Limpiar completadas".
- **Rol responsable:** Frontend.
- **Estado:** Resuelto en la misma iteracion acotando selector al `nav.filters`.

## Riesgos residuales
- No hay cobertura E2E multi-navegador en esta iteracion (solo Chromium).
- No hay cobertura de casos de `localStorage` corrupto en E2E (si esta cubierto a nivel unit en parse seguro).
