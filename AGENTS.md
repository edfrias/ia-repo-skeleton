# AGENTS.md — Orquestación de subagentes

Este fichero es el punto de entrada para cualquier agente de IA (Claude Code,
Cursor, Codex CLI, etc.) que trabaje en este repositorio. Define el **modelo
de orquestación**, los **roles disponibles** y el **protocolo de traspaso**
entre ellos. Este es un esqueleto vacío: sustituye los placeholders `[...]`
cuando arranques un proyecto real.

## 1. Filosofía

Un agente orquestador (el que lee este fichero) descompone cada tarea en
sub-tareas y las delega a subagentes especializados por rol. Cada subagente:

- Tiene **una sola responsabilidad** (single responsibility a nivel de rol).
- Lee su propio fichero de rol en `agents/<rol>.md` antes de empezar.
- Produce un **entregable concreto** en la ruta indicada en su fichero.
- Deja un **resumen de traspaso** (handoff) para el siguiente rol, siguiendo
  la plantilla de la sección 4.
- No asume trabajo de otro rol: si falta un entregable previo, lo pide en
  vez de inventarlo.

## 2. Roles disponibles

| Rol | Fichero | Entrada que necesita | Entregable principal |
|---|---|---|---|
| Product Owner | `agents/product-owner.md` | Idea/objetivo de negocio | `docs/requirements.md` |
| Diseñador (UX/UI) | `agents/designer.md` | `docs/requirements.md` | `docs/design/` (flujos, wireframes, sistema de diseño) |
| Backend Developer | `agents/backend-developer.md` | `docs/requirements.md` + diseño técnico | Código en `src/backend/` |
| Frontend Developer | `agents/frontend-developer.md` | `docs/design/` + contrato de API | Código en `src/frontend/` |
| QA | `agents/qa.md` | Entregables de backend/frontend | `tests/` + `docs/qa-report.md` |

Añade más roles (DevOps, Data, Seguridad...) creando `agents/<rol>.md` y una
fila nueva en esta tabla.

## 3. Flujo de orquestación por defecto

```
Product Owner ──▶ Designer ──▶ ┬─▶ Backend Developer ─┐
                                └─▶ Frontend Developer ─┤
                                                         ▼
                                                        QA ──▶ (loop si hay bugs)
```

1. El orquestador recibe la petición del usuario.
2. Invoca a **Product Owner** para convertirla en requisitos verificables.
3. Invoca a **Designer** con esos requisitos.
4. Lanza **Backend** y **Frontend** en paralelo, ambos leyendo diseño +
   requisitos. Backend publica el contrato de API antes de que Frontend lo
   necesite (ver `docs/api-contract.md`).
5. Invoca a **QA** contra lo entregado por ambos.
6. Si QA reporta bugs bloqueantes, el orquestador reabre el rol responsable
   con el reporte de QA como entrada. Repetir hasta que QA apruebe.
7. El orquestador resume el estado final al usuario.

Este flujo es el por defecto para "feature completa". Para tareas pequeñas
(un fix, un endpoint suelto) el orquestador puede saltarse roles que no
aporten valor, dejándolo explícito en su respuesta.

## 4. Plantilla de traspaso (handoff)

Cada subagente, al terminar, debe dejar esto en su fichero de salida o en el
resumen que devuelve al orquestador:

```markdown
## Handoff — [Rol]
- **Estado**: completo / bloqueado / parcial
- **Entregable(s)**: [rutas de fichero]
- **Decisiones clave tomadas**: [lista breve]
- **Pendiente / fuera de alcance**: [lista breve]
- **Para el siguiente rol**: [qué necesita saber o revisar]
```

## 5. Convenciones del repositorio

- **Idioma de la documentación**: [castellano / inglés — define uno].
- **Gestión de decisiones de arquitectura**: usar `docs/decisions/` con el
  formato ADR (Architecture Decision Record), un fichero por decisión.
- **Definición de "hecho" (Definition of Done)**: código + tests + docs
  actualizados + revisado por QA.
- **Commits**: Conventional Commits (`feat:`, `fix:`, `docs:`, `test:`...).
- **Ramas**: `main` protegida; trabajo en `feature/<rol>-<descripcion-corta>`.

## 6. Cómo arrancar un proyecto nuevo con este esqueleto

1. Renombra/edita este `README.md` con la descripción real del proyecto.
2. Rellena `docs/requirements.md` (puede hacerlo el rol Product Owner).
3. Decide el stack en `docs/architecture.md`.
4. Borra las carpetas de `src/` que no apliquen (p.ej. si es solo backend).
5. Empieza a invocar al orquestador con una petición de alto nivel; él se
   encarga de repartir el trabajo entre roles siguiendo este fichero.
