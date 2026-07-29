# Sigma

## Why no finished rule is shipped

A production Sigma rule requires knowing the **log source and field names** it will match
against. Those were not part of this investigation, so shipping a "ready" rule here would
be fabricating field mappings. Instead, adapt the skeleton below to a log source you
actually have, then validate it.

## Skeleton to adapt (proxy/web-proxy example)

```yaml
title: Suspicious access to Ledger-lookalike phishing redirector (visit-ledger.at)
id: 00000000-0000-0000-0000-000000000000   # generate a real UUID
status: experimental
description: >
  Detects web-proxy access to the known Ledger-themed phishing domain/URL observed in a
  defensive case study. Adapt field names to your proxy log source and validate before use.
references:
  - https://attack.mitre.org/techniques/T1566/002/
author: (your name)
date: 2026/07/29
logsource:
  category: proxy
detection:
  selection_domain:
    # Map 'c-uri'/'dest_host'/'url' to your proxy schema:
    c-uri|contains:
      - 'visit-ledger.at'
      - 'visit-ledger.at/alchcemser'
  condition: selection_domain
falsepositives:
  - None expected for this specific domain; the domain is the signal.
  - Do NOT substitute the Cloudflare edge IP (172.64.80.1) for the domain match.
level: high
tags:
  - attack.initial-access
  - attack.t1566.002
```

## Email example (adapt to your mail log source)

```yaml
title: Ledger display-name impersonation with non-Ledger link
status: experimental
logsource:
  product: email
detection:
  subject:
    subject: 'Device Update Required'
  ledger_display:
    from_display|contains: 'Ledger'
  bad_link:
    body|contains: 'visit-ledger.at'
  condition: (subject or ledger_display) and bad_link
falsepositives:
  - Subject alone is generic; require the suspicious link.
level: medium
```

Validate with your Sigma toolchain and confirm field names before deploying.
