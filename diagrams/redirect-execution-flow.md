# Diagram — Application Execution Flow

```mermaid
sequenceDiagram
    participant V as Visitor Browser
    participant N as Next.js Application
    participant S as Server Actions
    participant W as Wikipedia

    V->>N: GET /alchcemser
    N-->>V: HTTP 200 + HTML shell + JavaScript
    V->>S: createVisitorAction(routeValue)
    S-->>V: visitorId
    V->>S: checkCloakitAction()
    S-->>V: allow/deny/trust result
    alt denied with safe redirect
        V->>W: window.location.href = redirectUrl
    else allowed
        opt setTrusted
            V->>S: setCloakitTrustAction()
        end
        V->>S: getRedirectAction(visitorId, routeValue)
        S-->>V: redirectUrl
        V->>W: window.location.href = redirectUrl
    end
```

The final redirect URL was obtained dynamically from the server. The observed destination
was Wikipedia; the original downstream destination, if any, was not observed.
