# Diagram — Campaign-Lifecycle Hypotheses

```mermaid
flowchart TD
    A[Emails delivered in clustered window] --> B[Recipient clicks]
    B --> C[Redirector creates visitor ID]
    C --> D{Server-side decision}
    D -->|Target condition met| E[Unknown downstream destination]
    D -->|Non-target, expired, or default| F[Wikipedia]
    E --> G[Not directly observed]
```

The unknown downstream destination was **not** directly observed. See the
[Threat Assessment](../docs/threat-assessment.md#campaign-lifecycle-hypotheses) for the
lettered hypotheses (A–E) and their confidence levels.
