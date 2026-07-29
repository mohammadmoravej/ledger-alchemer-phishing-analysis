# Images

This directory holds the investigation screenshots.

- `raw/` — **original, unmodified** screenshots. Filenames and chronological order are part
  of the investigation record and must **not** be renamed, reordered, or replaced.
  `raw/` is git-ignored (kept out of the public repository as private evidence).
- `sanitized/` — publishable copies with the **same filenames**. Only privacy redactions
  were applied; all technical evidence is preserved. These are the files referenced by the
  report figures.

The macOS filenames contain a narrow no-break space (U+202F) before `AM` — preserved
exactly in both directories.

## Sanitization applied

| File | Redaction |
|---|---|
| `...10.26.52 AM.png` | none — terminal capture, no sensitive data of the listed categories |
| `...10.27.14 AM.png` | none |
| `...10.27.40 AM.png` | none |
| `...10.28.00 AM.png` | none |
| `...10.28.21 AM.png` | none |
| `...10.28.36 AM.png` | none |
| `...10.29.12 AM.png` | none |
| `...10.36.09 AM.png` | **black box over one personalized ad** (reveals locale/interests). The recipient's own address is **not visible** in the frame; the user's pre-existing black box is preserved. |

Judgment calls left **unredacted** (they are authentic technical evidence, not personal
data of the listed categories): the `win11-lab@kali` shell prompt (documents the analysis
environment) and the LAN resolver `192.168.2.1` in `dig` output. Redact them too if your
publication policy requires it.

## Figure catalog (captions describe only what is visible)

> Figures use the real screenshot filenames. There is **no** renaming to `figure-0N.png`.

### Fig. A — `fig-a-whois.png`
**Section:** [Infrastructure Analysis › WHOIS](../docs/infrastructure-analysis.md#1-whois)
**Visible:** `whois visit-ledger.at` on Kali; NIC.AT usage notice; `registrant`/`tech-c`
`<data not disclosed>`; `nserver harlan.ns.cloudflare.com` / `paris.ns.cloudflare.com`;
`changed: 20260409 13:21:42`; `source: AT-DOM`.

### Fig. B — `fig-b-dns-a-record.png`
**Section:** [Infrastructure Analysis › DNS A](../docs/infrastructure-analysis.md#21-a-record)
**Visible:** `dig visit-ledger.at` (DiG 9.20.24-1+b1-Debian); `ANSWER SECTION:
visit-ledger.at. 282 IN A 172.64.80.1`; query time 31 msec; `WHEN: Wed Jul 29 10:27:11
EDT 2026`; local resolver `192.168.2.1`.

### Fig. C — `fig-c-dns-txt-record.png`
**Section:** [Infrastructure Analysis › MX/TXT](../docs/infrastructure-analysis.md#23-mx)
**Visible:** `dig TXT visit-ledger.at`; `ANSWER: 0`; `AUTHORITY SECTION` SOA
`harlan.ns.cloudflare.com. dns.cloudflare.com. 2406797451 ...`; `WHEN: Wed Jul 29
10:27:36 EDT 2026`.

### Fig. D — `fig-d-tls-session.png`
**Section:** [Infrastructure Analysis › TLS](../docs/infrastructure-analysis.md#3-tls)
**Visible:** `openssl s_client` tail; `subject=CN=visit-ledger.at`;
`issuer=C=US, O=Let's Encrypt, CN=YE1`; `Peer signature type: ecdsa_secp256r1_sha256`;
`Negotiated TLS1.3 group: X25519MLKEM768`; `New, TLSv1.3, Cipher is
TLS_AES_256_GCM_SHA384`; `Server public key is 256 bit`; `Verify return code: 0 (ok)`.

### Fig. E — `fig-e-http-headers.png`
**Section:** [Infrastructure Analysis › HTTP headers](../docs/infrastructure-analysis.md#4-http-headers)
**Visible:** `curl -I https://visit-ledger.at/alchcemser`; `HTTP/2 200`; `date: Wed, 29 Jul
2026 14:28:18 GMT`; `server: cloudflare`; `x-powered-by: Next.js`; `vary: rsc, ...`;
`link:` font preloads; HSTS; `cf-cache-status: DYNAMIC`; `nel`/`report-to`;
`cf-ray: a22ccf2fcccd0026-YUL`; `alt-svc: h3=":443"`.

### Fig. F — `fig-f-javascript-download.png`
**Section:** [JavaScript Analysis › Acquisition](../docs/javascript-analysis.md#1-acquisition)
**Visible:** the header block again, then `curl .../_next/static/chunks/8165ba880413402f.js
-o app.js`; transfer `100 ... 2313 ... 2313` (2313 bytes).

### Fig. G — `fig-g-html-download.png`
**Section:** [Web Analysis › Initial HTML acquisition](../docs/web-analysis.md#1-initial-html-acquisition)
**Visible:** `curl .../_next/static/chunks/8165ba880413402f.js -o app.js` (2313 bytes)
then `curl https://visit-ledger.at/alchcemser -H "User-Agent: Mozilla/5.0" -o ledger.html`;
transfer `100 ... 7294 ... 7294` (7294 bytes).

### Fig. H — `fig-h-phishing-email.png`
**Section:** [Email Analysis](../docs/email-analysis.md)
**Visible:** the phishing email in the recipient's mailbox. Header pane: `From: Ledger
noreply@alchemer.com`, `To: restore@ledger.live`, `Date: July 28, 2026 at 10:21 PM`,
subject `Device Update Required`. Body: Ledger logo; "Update ready for your Ledger
device"; a red box "⚠️ Deadline: August 15, 2026 — Failure to update your device by this
date may result in restricted access to your portfolio ..."; a security-reassurance box.
Inbox list shows four clustered "Ledger — Device Update Required" messages. One
personalized ad is redacted.

## Keeping raw screenshots private

`raw/` is git-ignored. Do not move raw captures into `sanitized/` or any tracked path.
