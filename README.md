# Skeleton con Harness Enginiering en mente

> Esqueleto de repositorio para arrancar cualquier proyecto con "harness
> engineering": un agente orquestador que reparte el trabajo entre
> subagentes especializados por rol (Product Owner, Diseño, Backend,
> Frontend, QA).

## Empezar aquí

1. Lee [`AGENTS.md`](./AGENTS.md) — define cómo se orquestan los subagentes
   y el flujo de trabajo por defecto.
2. Cada rol tiene su ficha detallada en [`agents/`](./agents/).
3. Rellena `docs/requirements.md` y `docs/architecture.md` con el contenido
   real de tu proyecto (hay plantillas ya puestas).
4. Borra de `src/` lo que no necesites (por ejemplo, si el proyecto es solo
   backend, elimina `src/frontend/`).

## Estructura

```
.
├── AGENTS.md                  # Orquestación de subagentes (léelo primero)
├── agents/                    # Un fichero por rol con su misión y entregable
│   ├── product-owner.md
│   ├── designer.md
│   ├── backend-developer.md
│   ├── frontend-developer.md
│   └── qa.md
├── docs/
│   ├── requirements.md        # Entregable del Product Owner
│   ├── architecture.md        # Decisiones de stack y arquitectura
│   ├── api-contract.md        # Contrato entre Backend y Frontend
│   ├── qa-report.md           # Entregable de QA
│   ├── design/                # Entregables del Designer
│   └── decisions/             # ADRs (Architecture Decision Records)
├── src/
│   ├── backend/
│   └── frontend/
├── tests/
│   ├── unit/
│   └── e2e/
└── .github/workflows/         # CI mínimo (placeholder)
```

## Filosofía

Este repo no asume ningún lenguaje ni framework: es un esqueleto de
**proceso**, no de código. La idea es que un agente orquestador (o tú
mismo) pueda coger este repo vacío, seguir `AGENTS.md` y montar cualquier
proyecto delegando en los roles definidos, con traspasos de información
explícitos entre ellos en vez de depender de contexto implícito.
