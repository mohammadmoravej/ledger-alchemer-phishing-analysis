# IOC Inventory

Educational, defensive inventory. Values are transcribed from sanitized case evidence. See
also machine-readable [`iocs.csv`](iocs.csv) and [`iocs.json`](iocs.json), and the
[false-positive notes](false-positive-notes.md).

## High-value IOCs

| Type | Value | Confidence |
|---|---|---|
| Domain | `visit-ledger.at` | High |
| URL | `https://visit-ledger.at/alchcemser` | High |
| Route value | `/alchcemser` | High |

## Email indicators

| Type | Value | Confidence |
|---|---|---|
| Subject | `Device Update Required` | Medium (generic phrasing) |
| `From:` | `noreply@alchemer.com` (sender name "Ledger") | Context — **legitimate Alchemer address; report to Alchemer, do NOT block** |
| Display `To:` | `restore@ledger.live` | Medium (cosmetic header) |
| Template string | `[invite(survey_link)]` | Medium |
| Template string | `{{@survey_link}}` | Medium |

## Alchemer identifiers (semantics unverified; report privately to Alchemer)

| Type | Value |
|---|---|
| `cid` | `cid495163` |
| `sid` | `sid8936268` |
| `rid` | `rid1785…9924` (masked) |
| `qid` | `qid99` |

## Web / JavaScript strings

| Value | Note |
|---|---|
| `createVisitorAction` | Server Action; visitor tracking |
| `checkCloakitAction` | Server Action; probable cloaking |
| `setCloakitTrustAction` | Server Action; probable cloaking |
| `getRedirectAction` | Server Action; dynamic redirect |
| `No redirect URL configured. Set one in the panel.` | User-facing string |

## TLS

| Item | Value |
|---|---|
| SANs | `*.visit-ledger.at`, `visit-ledger.at` |
| Issuer | `Let's Encrypt YE1` (legitimate CA — contextual only) |
| Validity | 2026-06-07 → 2026-09-05 |

---

## Shared infrastructure — context, **not** standalone IOCs

!!! danger "Do not block by IP"
    The following are **shared Cloudflare** assets. Blocking them risks collateral damage
    to unrelated sites. Prefer **domain** and **URL** controls.

| Type | Value |
|---|---|
| Cloudflare edge IPv4 | `172.64.80.1` |
| Cloudflare edge IPv6 | `2606:4700:130:436c:6f75:6466:6c61:7265` |
| Name server | `harlan.ns.cloudflare.com` |
| Name server | `paris.ns.cloudflare.com` |
| Technologies | Next.js, Cloudflare, React Server Components, HTTP/2, HTTP/3, TLS 1.3 |

## Retained privately (excluded)

Full recipient address · complete Message-ID · full visitor ID (`6a69f7d7…cb113`) ·
complete `rid` value. See
[../evidence/PRIVATE_EVIDENCE_NOT_INCLUDED.md](../evidence/PRIVATE_EVIDENCE_NOT_INCLUDED.md).
