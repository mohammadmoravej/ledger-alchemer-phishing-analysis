# Timeline

## Email delivery (evening before the live investigation)

| Message | Displayed receipt time | Interval from previous |
|---|---:|---|
| Email 1 | 9:23 PM | — |
| Email 2 | 9:38 PM | 15 minutes |
| Email 3 | 9:41 PM | 3 minutes |
| Email 4 | 10:21 PM | 40 minutes |

**Total observed span: 58 minutes.**

**FACT:** Four similar emails were shown in the mailbox screenshots within a 58-minute
period.

**INFERENCE — Moderate confidence:** The clustered timing is consistent with a batched,
staged, repeated, or retried campaign.

!!! note "Dates and timezone (updated from screenshots)"
    The opened message is dated **July 28, 2026 at 10:21 PM** (Email 4), and the terminal
    captures are stamped **Wed Jul 29 2026, EDT**. So the campaign arrived the evening of
    **July 28, 2026** (Eastern time) and the technical investigation ran the following
    morning, **July 29, 2026**. The individual times for Emails 1–3 (9:23/9:38/9:41 PM)
    still rely on the earlier mailbox screenshots, not raw headers — see
    [Known Evidence Gaps](limitations.md#known-evidence-gaps).

---

## Investigation (July 29, 2026, EDT — timestamps from screenshots)

The following morning the infrastructure was still operational. Command captures
(`assets/images/`) give these times:

| Time (EDT) | Step | Evidence |
|---|---|---|
| 10:26:52 | `whois visit-ledger.at` | `...10.26.52 AM.png` |
| 10:27:11 | `dig visit-ledger.at` → A `172.64.80.1` | `...10.27.14 AM.png` |
| 10:27:36 | `dig` MX/TXT → `ANSWER: 0` + SOA | `...10.27.40 AM.png` |
| ~10:28:00 | `openssl s_client` → TLS 1.3, issuer `YE1`, verify OK | `...10.28.00 AM.png` |
| 10:28:18 | `curl -I .../alchcemser` → HTTP/2 200 | `...10.28.21 AM.png` |
| 10:28:36 | `curl ... 8165ba880413402f.js -o app.js` → 2313 bytes | `...10.28.36 AM.png` |
| 10:29:12 | `curl ... /alchcemser -o ledger.html` (UA Mozilla/5.0) → 7294 bytes | `...10.29.12 AM.png` |
| 10:36:09 | mailbox view of the phishing email (From `noreply@alchemer.com`) | `...10.36.09 AM.png` |

!!! warning "Sequence correction"
    Earlier drafts listed `ledger.html` retrieval **before** `app.js`. The captures show the
    opposite **save** order: the `app.js` chunk was downloaded at 10:28:36 and `ledger.html`
    was saved at 10:29:12. (The chunk filename `8165ba880413402f.js` must have been read from
    an earlier view of the page/shell.) DNS/TLS/HTTP details (`NS`, `PTR`, `sslscan`,
    `wafw00f`, `curl -IL`) are consistent with the case record but are not all individually
    represented in this screenshot set.

The Firefox Network capture (initial GET → static assets → POSTs returning a visitor ID →
a `rum` request → final navigation to Wikipedia) is described in
[Browser & Network Analysis](browser-network-analysis.md); **no screenshot of that browser
capture was provided in this set**, so it remains supported by the case record only.

---

## Timing-gap note

A prior review noted an approximate **4-hour 53-minute** difference between an
Alchemer-related timestamp and Yahoo's receipt timestamp. This is **UNKNOWN** in cause
(queueing, throttling, retries, timezone interpretation, delay, or staged release) and is
**not** by itself evidence of malicious activity. Verification requires the original raw
timestamps.
