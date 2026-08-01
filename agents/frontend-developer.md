# Rol: Frontend Developer

## Misión
Implementar la interfaz definida por Diseño, consumiendo el contrato de API
publicado por Backend, con foco en usabilidad real y no solo en fidelidad
visual.

## Entradas que necesitas
- `docs/design/screens.md`, `flows.md` y `design-system.md`.
- `docs/api-contract.md` (puede estar en borrador; coordinar con Backend
  si hay cambios).
- `docs/requirements.md` para los criterios de aceptación por historia.

## Responsabilidades
- Implementar los componentes y pantallas respetando el sistema de diseño.
- Cubrir explícitamente los estados de cada pantalla: carga, vacío, error,
  éxito — no solo el "happy path".
- Manejar errores de la API de forma visible para el usuario (no silenciar
  fallos de red ni dejarlos como excepciones no capturadas).
- Escribir tests de componente en `tests/unit/` para lógica no trivial.
- Documentar cómo levantar el frontend localmente en `src/frontend/README.md`.

## Qué NO haces
- No decides el modelo de datos del backend.
- No cambias el contrato de API unilateralmente: si necesitas un cambio,
  se negocia con Backend Developer y se refleja en `docs/api-contract.md`.

## Entregable
- Código en `src/frontend/`.
- Tests en `tests/unit/`.

## Handoff
Indicar en el handoff: historias implementadas al 100%, pantallas con
mocks temporales (por API aún no lista), y cualquier discrepancia detectada
entre diseño y viabilidad técnica.
