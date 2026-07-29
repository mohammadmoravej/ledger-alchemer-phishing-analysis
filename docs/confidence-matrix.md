# Confidence Matrix

Each row states a claim, its evidence label, its confidence level, and the key
alternative explanation. Labels: **FACT / OBSERVATION / INFERENCE / HYPOTHESIS /
UNKNOWN**. Confidence: **Confirmed / High / Moderate / Low / Unknown**.

| # | Claim | Label | Confidence | Alternative / caveat |
|---|---|---|---|---|
| 1 | Subject decodes to "Device Update Required" via MIME Base64 | FACT | Confirmed | Standard encoding, not obfuscation |
| 2 | Visible `To:` differed from actual Yahoo recipient (`X-Apparently-To`) | FACT | Confirmed | Normal mailing-list behavior possible |
| 3 | SPF, DKIM, DMARC passed | FACT | Confirmed | Authenticates sending service, not Ledger |
| 3a | Message From address was `noreply@alchemer.com` | FACT | Confirmed | Directly visible in email screenshot; aligns the auth pass to `alchemer.com` |
| 3b | Email 4 dated July 28, 2026 10:21 PM; investigation July 29, 2026 EDT | FACT | Confirmed | From email + terminal screenshots; Emails 1–3 times still from mailbox view only |
| 4 | Email assembled/delivered via Alchemer template system | FACT + INFERENCE | High | Delivery via `alchemer.com` now direct (FACT); account status (created/compromised/abused) still unknown |
| 5 | Primary CTA used lookalike domain `visit-ledger.at` | FACT | Confirmed | — |
| 6 | URL used brand impersonation via lookalike domain | INFERENCE | High | None significant |
| 7 | Template manually/semi-automatically customized (HTML comments) | INFERENCE | Moderate | AI authorship not established |
| 8 | Message consistent with bulk phishing (no personalization) | INFERENCE | Moderate | Could be a stripped template |
| 9 | WHOIS `changed` = 2026-04-09; registrar blank | FACT | Confirmed | Not the creation/registration date |
| 10 | A record `172.64.80.1` is Cloudflare edge, not origin | INFERENCE | High | Shared infrastructure — not an origin IOC |
| 11 | Domain used Cloudflare NS / DNS | FACT | Confirmed | Cloudflare not itself an IOC |
| 12 | No MX / TXT / PTR returned at query time | FACT | Confirmed | Not inherently malicious |
| 13 | Valid Let's Encrypt cert for domain + wildcard; TLS 1.3 | FACT | Confirmed | Valid certs are obtainable by anyone |
| 14 | `sslscan` reported TLS 1.0–1.3 at Cloudflare edge | OBSERVATION | Moderate | Edge behavior; origin TLS not observed |
| 15 | Initial HTTP response was 200; no 301/302 | FACT | Confirmed | Redirect was later, client-side |
| 16 | Response identified Next.js + Cloudflare | FACT | Confirmed | Contextual, not malicious |
| 17 | Cloudflare WAF present (WAFW00F) | FACT | Confirmed | Infrastructure characterization |
| 18 | Initial HTML lacked form/seed/phrase/wallet terms | FACT | Confirmed | Behavior is produced client-side |
| 19 | Bundle referenced a `/panel` route | FACT | Confirmed | Purpose/access controls not tested |
| 20 | Route value `alchcemser` passed via param named `email` | FACT | Confirmed | Param name ≠ proof of an email value |
| 21 | Server Actions present (create/checkCloakit/setCloakitTrust/getRedirect) | FACT | Confirmed | — |
| 22 | Visitor-tracking record created/retrieved | INFERENCE | High | Exact fields recorded unknown |
| 23 | Trust/allow-deny decision before redirect | INFERENCE | High | Names may not perfectly describe impl |
| 24 | Client logic consistent with cloaking | INFERENCE | Moderate–High | Decision criteria not observed |
| 25 | Redirect destination selected dynamically server-side | INFERENCE | High | Backend not observed |
| 26 | Server Action returned visitor ID in `text/x-component` stream | FACT | Confirmed | — |
| 27 | Browser navigated to Wikipedia after JS/Server Action execution | FACT + INFERENCE | High | Reason for selection unknown |
| 28 | Infrastructure remained operational (not shut down) | FACT | High | Only redirect target may have changed |
| 29 | Original downstream phishing destination existed and was removed | HYPOTHESIS | Low–Moderate | Cloaking / expiration / default redirect |
| 30 | No credential/recovery-phrase form directly observed | FACT | Confirmed | Does not prove none ever existed |
| 31 | Analysis OS detected by anti-analysis logic | UNKNOWN | Unknown | Not asserted; criteria not observed |

Where a claim is **UNKNOWN**:

> Evidence does not support a definitive conclusion.
