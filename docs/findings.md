# Findings

## Confirmed findings

1. A Ledger-themed message used a non-Ledger destination domain (`visit-ledger.at`).
2. The message was delivered through authenticated Alchemer-related infrastructure.
3. SPF, DKIM, and DMARC passing did **not** authenticate Ledger as the sender.
4. The email contained Alchemer template remnants and internal identifiers.
5. The URL led to a Cloudflare-fronted Next.js application.
6. The initial response was HTTP 200.
7. The application used a dynamic route parameter named `email`.
8. The application created a visitor ID.
9. The client code contained `checkCloakitAction` and `setCloakitTrustAction`.
10. The final redirect URL was obtained dynamically.
11. The browser ultimately navigated to Wikipedia.
12. The redirect was **not** an initial HTTP 301/302.
13. No credential or recovery-phrase form was directly observed.
14. No malware download was observed.
15. No unauthorized access was attempted.

## High-confidence assessment

> The evidence is highly consistent with a phishing-related dynamic redirector that used
> visitor tracking and probable cloaking logic.

## Important qualification

> The original downstream phishing destination, if one existed, was not directly observed
> during this investigation.

---

## Evidence matrix

| Finding | Evidence | Classification | Confidence | Alternative explanation |
|---|---|---|---|---|
| Email impersonated Ledger | Branding and non-Ledger URL | Fact + inference | High | None significant |
| Message used authenticated Alchemer-related delivery | Visible `From: noreply@alchemer.com` (email screenshot) + SPF/DKIM/DMARC + template artifacts | Fact | Confirmed (delivery domain) / High (overall) | Exact account status unknown |
| Visible `To:` differed from actual Yahoo recipient | `To:` and `X-Apparently-To` | Fact | Confirmed | Normal mailing-list behavior is possible |
| Domain used Cloudflare | DNS, headers, WAFW00F | Fact | Confirmed | Cloudflare is also used legitimately |
| Application used Next.js | `x-powered-by`, `/_next/` assets | Fact | Confirmed | None |
| Visitor ID was created | Server Action response | Fact | Confirmed | Exact purpose beyond tracking unknown |
| Application contained cloaking-related logic | Function names and branch logic | Observation + inference | High | Names may not perfectly describe implementation |
| Redirect was dynamic | `getRedirectAction` and `window.location.href` | Fact + inference | High | Destination-selection backend not observed |
| Browser reached Wikipedia | Network capture and visible page | Fact | Confirmed | Reason for selection unknown |
| Original malicious page was removed | Not directly established | Hypothesis | Low to moderate | Cloaking, expiration, default redirect |
| Infrastructure was shut down | Contradicted by live responses | Rejected claim | High | Redirect target only may have changed |

See the [Confidence Matrix](confidence-matrix.md) for the finding-by-finding confidence
breakdown, and [Campaign-Lifecycle Hypotheses](threat-assessment.md#campaign-lifecycle-hypotheses).
