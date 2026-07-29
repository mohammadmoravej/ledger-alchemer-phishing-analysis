# Email Analysis

This page covers the email delivery timeline, header analysis, SMTP envelope vs. display
headers, SPF/DKIM/DMARC interpretation, MIME/HTML review, and Alchemer template
artifacts.

---

## 1. Delivery timeline

The author received four visually similar Ledger-themed emails the evening before the
live technical investigation. Observed receipt times from the email-client screenshots:

| Message | Displayed receipt time |
|---|---:|
| Email 1 | 9:23 PM |
| Email 2 | 9:38 PM |
| Email 3 | 9:41 PM |
| Email 4 | 10:21 PM |

Calculated intervals:

- 9:23 PM → 9:38 PM: 15 minutes
- 9:38 PM → 9:41 PM: 3 minutes
- 9:41 PM → 10:21 PM: 40 minutes
- **Total observed span: 58 minutes**

**FACT:** Four similar emails were shown in the mailbox screenshots within a 58-minute
period.

> **Figure** — `assets/images/fig-h-phishing-email.png`: the mailbox
> shows four clustered "Ledger — Device Update Required" messages, and the opened message
> is dated **July 28, 2026 at 10:21 PM** (Email 4).

**FACT (from the email screenshot):** The opened message's displayed date is **July 28,
2026 at 10:21 PM**, which matches the 10:21 PM receipt time in the table. The investigation
was performed the following morning, **July 29, 2026** (the terminal captures show
`WHEN: Wed Jul 29 ... EDT 2026`). This anchors the campaign to the evening of July 28, 2026
(Eastern time). The individual displayed times for Emails 1–3 (9:23/9:38/9:41 PM) come
from the earlier mailbox screenshots and were not re-confirmed with raw headers.

**INFERENCE — Moderate confidence:** The clustered timing is consistent with a batched,
staged, repeated, or retried campaign rather than an isolated accidental message.

**UNKNOWN:** The screenshots alone do not establish whether the four messages belonged to
one Alchemer campaign, multiple campaigns, retries, A/B tests, or multiple recipient
records. Confirming this would require comparing all four raw headers
(Message-ID, Alchemer campaign/survey/recipient IDs, DKIM signatures, sending hosts,
URLs, and route values).

---

## 2. Subject

The MIME-encoded subject:

```text
=?UTF-8?B?RGV2aWNlIFVwZGF0ZSBSZXF1aXJlZA==?=
```

decodes to:

```text
Device Update Required
```

**FACT:** The subject encoding is normal MIME Base64 encoding.

!!! note
    This is standard encoding, **not** obfuscation. It should not be described as
    obfuscation without additional evidence.

---

## 3. Visible recipient vs. actual delivery recipient

The visible header:

```text
To: restore@ledger.live
```

Yahoo added an internal delivery header indicating the actual mailbox that received the
message:

```text
X-Apparently-To: [REDACTED-YAHOO-ADDRESS]
```

**FACT:** The visible `To:` value differed from the actual Yahoo mailbox that received
the message.

### Why this matters (SMTP envelope vs. message headers)

- **SMTP envelope addresses control delivery.** `MAIL FROM` and `RCPT TO` belong to the
  SMTP transaction and determine where a message actually goes.
- `From:` and `To:` are **message headers** and may differ from the envelope values.
- `X-Apparently-To` was added by Yahoo **after receipt** and is stronger evidence of the
  local delivery target than the user-visible `To:` field.

A `To:` of `restore@ledger.live` with delivery to a different, unrelated mailbox is a
classic sign that the display header was set for appearance, not delivery.

!!! danger "Redaction"
    The author's real Yahoo address contained personally identifying data and is **not**
    published. It appears only as `[REDACTED-YAHOO-ADDRESS]`.

---

## 4. Sender authentication (SPF, DKIM, DMARC)

The analyzed message produced:

- **SPF: Pass**
- **DKIM: Pass**
- **DMARC: Pass**

**FACT:** Sender authentication passed for the sending infrastructure/domain represented
in the authentication results.

### Critical interpretation

Passing SPF, DKIM, and DMARC does **not** prove that Ledger sent the message. It proves
that the message was accepted as authentic **for the domain or infrastructure that
actually signed and sent it**, which was associated with Alchemer infrastructure.

> Email authentication can validate the sending service while the content still
> impersonates an unrelated brand.

!!! warning "Do not write 'SPF, DKIM, and DMARC failed to stop the attack'"
    Prefer:
    > SPF, DKIM, and DMARC were functioning as designed for the authenticated sending
    > domain; they did not establish authorization to represent Ledger.

---

## 5. Alchemer template artifacts

The raw MIME/HTML included template remnants such as:

```text
[invite(survey_link)]
{{@survey_link}}
```

**FACT:** These strings were preserved in the supplied email source.

**FACT (from the email screenshot):** The message's displayed **From** address was
`noreply@alchemer.com` (sender name "Ledger"). See
`assets/images/fig-h-phishing-email.png`. This is direct evidence — not
just an inference from template remnants — that the message was sent from an Alchemer
domain. It also explains the passing SPF/DKIM/DMARC results (§4): authentication aligned to
`alchemer.com`, the true sending domain, **not** to Ledger.

**INFERENCE — High confidence:** The email was assembled and delivered using Alchemer's
campaign or survey template system (From domain `alchemer.com` + template remnants +
`cid`/`sid`/`rid`/`qid` identifiers).

!!! note "What is *not* claimed"
    The evidence does not distinguish whether the Alchemer account was attacker-created,
    compromised, purchased, stolen, or abused by an insider.

### Alchemer-style identifiers

```text
cid495163
sid8936268
rid1785…9924
qid99
```

The recipient-associated `rid` is masked in this public document; the complete value is
retained only in private evidence.

Plausible (but not independently verified) interpretations:

| Identifier | Possible meaning |
|---|---|
| `cid` | campaign identifier |
| `sid` | survey identifier |
| `rid` | recipient or response identifier |
| `qid` | question identifier |

> The message contained Alchemer-style internal identifiers, including `cid`, `sid`,
> `rid`, and `qid` values. These may be useful to Alchemer during an abuse
> investigation.

For public publication, the recipient-associated identifier is masked as
`rid1785…9924`. The complete value is retained only in private evidence.

---

## 6. Suspicious HTML comments / editing remnants

The HTML contained comments or editing remnants including:

```text
NEW ADDITION
as requested
with the required link
with the exact text inside quotes
```

**FACT:** These comments were observed in the supplied HTML.

**INFERENCE — Moderate confidence:** The message template was manually or
semi-automatically customized and was not fully cleaned before delivery.

**UNKNOWN:** The comments do not prove that a generative AI system produced the message.

> The comments are consistent with manually guided or assisted template editing, but
> their origin cannot be established from the email alone.

---

## 7. MIME quality

The plain-text MIME section was not a clean text-only rendering; it contained CSS or
layout-related content.

**OBSERVATION:** The multipart alternative was poorly generated.

**INFERENCE — Moderate confidence:** The sender used a low-quality or incorrectly
configured email template.

!!! note
    Malformed plain text does not, by itself, prove malicious intent.

---

## 8. URLs present in the email

Meaningful URLs observed:

```text
https://visit-ledger.at/alchcemser
```

and a Wikimedia-hosted Ledger logo asset. Footer links used placeholders such as
`href="#"`.

**FACT:** The primary call-to-action URL used the independent domain `visit-ledger.at`.

**FACT:** `visit-ledger.at` is **not** a subdomain of `ledger.com`.

**INFERENCE — High confidence:** The URL used brand impersonation through a lookalike
domain.

The path `/alchcemser` resembles a misspelling of "Alchemer," but this is only a
linguistic observation.

!!! note
    The report does not claim the route was intentionally named after Alchemer; no
    additional evidence supports that.

---

## 9. Personalization

The email contained no observed customer name, Ledger device model, firmware version,
account detail, transaction detail, or support ticket reference.

**OBSERVATION:** The message lacked recipient-specific Ledger context.

**INFERENCE — Moderate confidence:** The message was consistent with bulk phishing rather
than a legitimate device-specific notification.

---

## 9a. Message body and urgency cues (from the email screenshot)

`assets/images/fig-h-phishing-email.png` shows the rendered body.

**OBSERVATION (directly visible):**

- Headline: "Update ready for your Ledger device."
- Body: "A new update is now available for your device, and we recommend installing it to
  keep everything running smoothly. Your hardware wallet remains secure, but completing
  this update is important to maintain reliable access ..."
- A red highlighted box: "⚠️ **Deadline: August 15, 2026** — Failure to update your device
  by this date may result in restricted access to your portfolio and increased
  vulnerability to security risks."
- A reassurance box referencing "Ledger security architecture: your private keys never
  leave the device ..." (partially visible).
- A "Visit site" button (the call-to-action).

**INFERENCE — Moderate confidence:** The deadline and "restricted access" language are
classic urgency/pressure cues. The reassurance about private keys is consistent with
social-engineering that lowers the reader's guard.

!!! note
    The body does not itself request a recovery phrase, and no credential form was observed
    at the destination during this investigation. The urgency framing is a behavioral
    indicator, not proof of the downstream page's content.

---

## 10. Tracking pixel review

> No obvious standalone tracking pixel was identified in the provided HTML. This does not
> rule out tracking through redirect URLs, external assets, or the sending platform.

---

## 11. Email timing gap

A prior review identified an approximate **4-hour 53-minute** difference between an
Alchemer-related timestamp and Yahoo's receipt timestamp.

Possible explanations: campaign queueing, sending throttles, retry behavior,
timestamp-zone interpretation, infrastructure delay, or staged release.

**UNKNOWN:** The delay is not, by itself, evidence of malicious activity.

!!! note "Preserve raw headers"
    The exact calculation should only be published from the original raw timestamps. As
    those raw headers are not included here, this is recorded as a previously observed
    timing discrepancy that requires preservation of the raw headers to verify.
