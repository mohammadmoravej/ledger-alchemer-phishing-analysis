# Appendix — Raw Excerpts (Sanitized)

Sanitized excerpts preserved for reference. Personal and recipient-specific values are
replaced with redaction tokens. Full raw evidence is retained privately — see the
private-evidence notice in the repository `evidence/` directory.

## Redaction tokens

```text
[REDACTED-YAHOO-ADDRESS]
[REDACTED-PHONE]
[REDACTED-MESSAGE-ID]
[REDACTED-COOKIE]
[REDACTED-SESSION]
[REDACTED-TRACKING-ID]
```

---

## Email subject

```text
Encoded:  =?UTF-8?B?RGV2aWNlIFVwZGF0ZSBSZXF1aXJlZA==?=
Decoded:  Device Update Required
```

## Header excerpts

```text
From: Ledger <noreply@alchemer.com>
To: restore@ledger.live
Date: July 28, 2026 at 10:21 PM
X-Apparently-To: [REDACTED-YAHOO-ADDRESS]
SPF:   Pass
DKIM:  Pass
DMARC: Pass
Message-ID: [REDACTED-MESSAGE-ID]
```

Body cues (from `fig-h-phishing-email.png`): "Update ready for your Ledger
device"; red box "Deadline: August 15, 2026 ... restricted access to your portfolio";
"private keys never leave the device" reassurance; "Visit site" button.

## Alchemer template remnants

```text
[invite(survey_link)]
{{@survey_link}}
```

## Alchemer identifiers (recipient value masked)

```text
cid495163
sid8936268
rid1785…9924
qid99
```

## HTML editing remnants

```text
NEW ADDITION
as requested
with the required link
with the exact text inside quotes
```

## Primary URL

```text
https://visit-ledger.at/alchcemser
```

---

## WHOIS (excerpt)

```text
domain:         visit-ledger.at
registrar:
registrant:     <data not disclosed>
tech-c:         <data not disclosed>
nserver:        harlan.ns.cloudflare.com
nserver:        paris.ns.cloudflare.com
changed:        20260409 13:21:42
source:         AT-DOM
```

## DNS (excerpts)

```text
visit-ledger.at. 282 IN A 172.64.80.1
172.64.80.1
NS: harlan.ns.cloudflare.com. / paris.ns.cloudflare.com.
MX: ANSWER: 0
TXT: ANSWER: 0
PTR (host 172.64.80.1): Host 1.80.64.172.in-addr.arpa. not found: 3(NXDOMAIN)
```

## TLS (excerpt)

```text
Connecting to 2606:4700:130:436c:6f75:6466:6c61:7265
Subject: CN=visit-ledger.at
Issuer: C=US, O=Let's Encrypt, CN=YE1
Not Before: Jun 7 11:52:16 2026 GMT
Not After: Sep 5 11:52:15 2026 GMT
SANs: *.visit-ledger.at, visit-ledger.at
Protocol: TLSv1.3
Cipher: TLS_AES_256_GCM_SHA384
Verify return code: 0 (ok)
```

## HTTP headers (excerpt)

```text
HTTP/2 200
content-type: text/html; charset=utf-8
server: cloudflare
x-powered-by: Next.js
cache-control: private, no-cache, no-store, max-age=0, must-revalidate
x-frame-options: DENY
x-content-type-options: nosniff
referrer-policy: no-referrer-when-downgrade
strict-transport-security: max-age=63072000; includeSubDomains
cf-cache-status: DYNAMIC
alt-svc: h3=":443"; ma=86400
```

The full captured response (including `date`, `vary`, `link`, `nel`, `report-to`, and
`cf-ray: a22ccf2fcccd0026-YUL`) is in
`evidence/sanitized/sanitized-http-headers.txt` and
`assets/images/fig-e-http-headers.png`.

## Initial HTML (excerpts)

```html
<title>Redirect</title>
<meta name="description" content="redirect"/>
<div class="w-10 h-10 border-2 border-zinc-500 border-t-zinc-200 rounded-full animate-spin ..."></div>
```

```text
Page not found
The page you're looking for doesn't exist or has been moved.
Go home
Panel
```

## Next.js route data (excerpts)

```text
"c":["","alchcemser"]
params":{"email":["alchcemser"]}
```

## JavaScript — Server Actions and server reference IDs

```text
createVisitorAction     40a3b322ec0d73d7456813aa62c768fc7caac98afe
checkCloakitAction      00bd192fe02899f452d2867b7dca3c8dcaec9a3649
setCloakitTrustAction   004900739ba6452813caf656c6f827ef26bad75746
getRedirectAction       603789439bb3a7461b6da586b8f7d0aa1ffb1d4bb4
```

## JavaScript — user-facing strings

```text
No redirect URL configured. Set one in the panel.
Something went wrong. Please try again.
```

## Server Action response (visitor ID masked)

```text
0:{"a":"$@1","f":"","b":"SLPCX_WbhLb0KQizny4V5","q":"","i":false}
1:{"visitorId":"6a69f7d7…cb113"}
Content-Type: text/x-component
```

## Final destination

```text
https://www.wikipedia.org/
```
