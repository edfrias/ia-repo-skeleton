# Arquitectura — To-Do App

## Stack tecnológico
- **Framework principal:** [Astro](https://astro.build) (generador de sitios estáticos/SSR)
- **Componentes interactivos:** [Vue.js 3](https://vuejs.org) (integración mediante `@astrojs/vue`)
- **Estilos:** CSS plano o utilidades inline (sin framework de CSS por defecto)
- **Persistencia:** `localStorage` del navegador (sin base de datos)
- **Infraestructura:** ejecución local (`astro dev`); sin despliegue en esta fase
- **Autenticación:** ninguna (aplicación de un solo usuario local)

## Diagrama de alto nivel

```
┌─────────────────────────────────────────────┐
│  Navegador (cliente)                        │
│                                             │
│  Astro page (.astro)                        │
│    └── Vue component (<script setup>)       │
│          └── localStorage  ←→  estado Vue   │
└─────────────────────────────────────────────┘
```

- Las páginas Astro definen la estructura y enrutan las vistas.
- Los componentes Vue gestionan el estado reactivo de las tareas (listas, filtros, CRUD).
- La persistencia es exclusivamente `localStorage`; no hay peticiones a servidor.

## Convenciones de código
- Archivos de página: `src/pages/*.astro`
- Componentes Vue: `src/frontend/components/*.vue`
- Lógica de estado (composables): `src/frontend/composables/`
- Los componentes Vue que necesiten hidratación usan la directiva `client:load` o `client:visible`.

## Restricciones conocidas
- Sin SSR ni endpoints de API: Astro corre en modo estático (`output: 'static'`).
- Sin base de datos ni backend: toda la lógica vive en el cliente.
- Sin registro ni login de usuarios.
- Sin despliegue en esta fase; el entorno objetivo es `localhost`.

## Documentación de referencia (via Context7 MCP)
Antes de generar o modificar código, los agentes deben consultar la documentación
actualizada de los frameworks mediante Context7:

| Librería | ID Context7 sugerido |
|---|---|
| Astro | `/withastro/astro` |
| Vue 3 | `/vuejs/vue` |
| @astrojs/vue | `/withastro/astro` (sección integrations) |

Uso: llamar a `resolve-library-id` con el nombre de la librería y, a continuación,
`query-docs` con el concepto concreto a consultar.

## Decisiones de arquitectura
Ver `docs/decisions/` para el detalle de cada decisión (formato ADR).
