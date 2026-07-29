# Ledger-Themed Phishing Investigation

**Alchemer Delivery, Dynamic Redirects, and Probable Cloaking**

> A defensive case study in email authentication, Next.js Server Actions, visitor
> tracking, and client-side redirect analysis.

## About this case study

This site documents a defensive, low-impact investigation of a Ledger-themed phishing
campaign. Four visually similar emails impersonating Ledger were received in a single
58-minute window, delivered through authenticated Alchemer-related infrastructure, and
pointed to the lookalike domain `visit-ledger.at`. The destination operated as a
Cloudflare-fronted Next.js application that created a visitor identifier, invoked trust
and "Cloakit"-named Server Actions, and obtained its redirect destination dynamically.
The browser was ultimately navigated to Wikipedia after JavaScript and Server Action
execution.

!!! warning "No offensive activity"
    No credentials were entered, no recovery phrase was submitted, no authentication was
    bypassed, and no unauthorized access was attempted. See
    [Scope and Ethics](scope-and-ethics.md).

## How to read this report

Every material finding is tagged with an **evidence label** and a **confidence level**.

| Evidence label | Meaning |
|---|---|
| **FACT** | Directly supported by captured evidence. |
| **OBSERVATION** | Directly seen during the investigation but may require interpretation. |
| **INFERENCE** | A reasoned conclusion supported by multiple observations. |
| **HYPOTHESIS** | A plausible explanation not proven by the available evidence. |
| **UNKNOWN** | Evidence is insufficient. |

| Confidence | Meaning |
|---|---|
| **Confirmed** | Established directly by evidence. |
| **High** | Strongly supported; alternatives unlikely. |
| **Moderate** | Supported but with meaningful alternatives. |
| **Low** | Weakly supported; speculative. |
| **Unknown** | Cannot be assessed from available evidence. |

Where the evidence is insufficient, the report states:

> Evidence does not support a definitive conclusion.

## Navigation

- [Executive Summary](executive-summary.md)
- [Scope and Ethics](scope-and-ethics.md)
- [Methodology](methodology.md)
- [Email Analysis](email-analysis.md)
- [Infrastructure Analysis](infrastructure-analysis.md) (WHOIS, DNS, TLS, HTTP, WAF)
- [Web Analysis](web-analysis.md) (initial HTML, Next.js route)
- [JavaScript Analysis](javascript-analysis.md)
- [Browser & Network Analysis](browser-network-analysis.md)
- [Timeline](timeline.md)
- [Findings](findings.md) and [Confidence Matrix](confidence-matrix.md)
- [Threat Assessment](threat-assessment.md)
- [Defensive Recommendations](defensive-recommendations.md)
- [Lessons Learned](lessons-learned.md) · [Limitations](limitations.md)
- [References](references.md)
- Appendices: [Commands](appendix-commands.md) · [Raw Excerpts](appendix-raw-excerpts.md)
- [Publication Notes](publication-notes.md)

## Primary indicators

| Type | Value |
|---|---|
| Domain | `visit-ledger.at` |
| URL | `https://visit-ledger.at/alchcemser` |
| Route value | `alchcemser` |

!!! danger "Shared infrastructure — do not block by IP"
    The Cloudflare edge address `172.64.80.1` is **shared Cloudflare infrastructure**,
    not an attacker origin. Prefer domain/URL controls. See the false-positive notes in
    the repository's `iocs/false-positive-notes.md`.
