# 0001 — Registrar las decisiones de arquitectura como ADR

## Estado
Aceptada

## Contexto
Necesitamos dejar constancia de por qué se tomó cada decisión técnica
relevante, para que futuros agentes/desarrolladores no repitan discusiones
ya cerradas ni deshagan decisiones sin saber el motivo original.

## Decisión
Cada decisión de arquitectura significativa se documenta en
`docs/decisions/NNNN-titulo-en-kebab-case.md`, numerada de forma
correlativa, siguiendo esta misma plantilla (Estado / Contexto / Decisión /
Consecuencias).

## Consecuencias
- Cualquier rol (especialmente Backend y Frontend) debe consultar esta
  carpeta antes de proponer un cambio que contradiga una decisión previa.
- Si se revierte una decisión, se crea un ADR nuevo que referencia al
  anterior y lo marca como "Reemplazada por NNNN", en vez de borrarlo.
