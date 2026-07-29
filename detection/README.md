# Detection

**Generic, adapt-before-use** detection guidance for this campaign. This directory does
**not** ship production-ready, vendor-specific rules, because the exact log field names in
any given environment are unknown.

- [`generic/hunting-guidance.md`](generic/hunting-guidance.md) — platform-agnostic logic.
- [`splunk/hunting-queries.md`](splunk/hunting-queries.md) — example queries with
  placeholders.
- [`sigma/README.md`](sigma/README.md) — why no finished Sigma rule is shipped, plus a
  skeleton to adapt.

!!! warning
    Always review the [false-positive notes](../iocs/false-positive-notes.md) first.
    Prefer domain/URL matching over Cloudflare IP matching.
