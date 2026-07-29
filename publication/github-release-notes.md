# Release Notes — v1.0.0

## Ledger-Themed Phishing Investigation (defensive case study)

First public release of the sanitized, evidence-based case study.

### Included

- Full technical report (`docs/`) across 20 pages, from email forensics to browser/network
  analysis, with a confidence matrix and threat assessment.
- Sanitized evidence excerpts (`evidence/sanitized/`) and a private-evidence exclusion
  notice.
- IOC inventory in CSV, JSON, and Markdown (`iocs/`), plus false-positive notes.
- Generic detection guidance and example (placeholder) Splunk/Sigma content
  (`detection/`).
- Mermaid diagrams (`diagrams/`) for delivery flow, execution flow, evidence
  classification, campaign-lifecycle hypotheses, and timeline.
- Publication kit (`publication/`): LinkedIn post, Medium article, portfolio summary,
  social preview.
- Reusable templates (`templates/`).

### Highlights

- Demonstrates why SPF/DKIM/DMARC passing does **not** authenticate the impersonated
  brand.
- Documents Next.js Server Actions, visitor-ID creation, probable "Cloakit" cloaking, and
  a dynamic client-side redirect to Wikipedia.

### Explicitly not claimed

Credential theft, wallet draining, a confirmed attacker panel, anti-analysis detection,
Alchemer account compromise, or a Cloudflare "origin" server. The original downstream
destination, if any, was not observed.

### Safety

No credentials entered; no recovery phrase submitted; nothing bypassed; no unauthorized
access. Sensitive data redacted. See `DISCLAIMER.md` and `SECURITY.md`.

### To do before/at publication

- Verify that all sanitized figures are present in `images/` using the documented
  filenames.
- Original `ledger.html` and `app.js` cryptographic hashes are unavailable because they
  were not recorded during evidence collection.
