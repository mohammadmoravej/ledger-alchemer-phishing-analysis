# Lessons Learned

## 1. Authentication validates the sender service, not the brand

SPF, DKIM, and DMARC **passed**. That did not mean Ledger sent the message — it meant the
message was authentic for the third-party (Alchemer-related) infrastructure that signed
and sent it. Authentication answers "did this domain really send it?", not "is the brand
in the body who they claim to be?"

## 2. The envelope is not the display header

The visible `To: restore@ledger.live` differed from the actual recipient recorded in
`X-Apparently-To`. Delivery is controlled by the SMTP envelope (`MAIL FROM` / `RCPT TO`),
while `From:`/`To:` are cosmetic message headers that can be set freely.

## 3. HTTPS is not trust

A valid, publicly trusted Let's Encrypt certificate is trivial to obtain for any domain,
including lookalikes. TLS proves encryption and domain-certificate matching — not brand
legitimacy.

## 4. Cloudflare in front means the visible IP is not the origin

The A record and TLS endpoint pointed to Cloudflare. Treating a shared Cloudflare IP as an
attacker origin — or blocking it outright — is a mistake that causes collateral damage.

## 5. Modern phishing behavior is client-side

`curl` saw only an HTTP 200 shell with no redirect. The real behavior — visitor
registration, a trust/cloaking decision, and a dynamically chosen destination — happened
**after JavaScript executed**, via Next.js Server Actions. Static fetches alone would have
missed it; the browser Network Monitor was essential.

## 6. Dynamic redirectors separate "delivery" from "payload"

Because the destination is chosen server-side at click time, the same URL can serve
different destinations to different visitors or at different times. The benign Wikipedia
result seen here does **not** prove the campaign was ever benign — nor that a malicious
page was definitely served earlier. It is a snapshot.

## 7. Discipline: label everything

Separating **FACT / OBSERVATION / INFERENCE / HYPOTHESIS / UNKNOWN** and attaching
confidence prevents the most common analytical failure: quietly promoting a plausible
story into a stated fact. "Probable cloaking" is defensible; "confirmed credential theft"
would not have been.

## 8. Publish responsibly

Recipient address, full Message-ID, full visitor ID, and personal desktop context were
kept out of the public material. Good findings do not require exposing the victim.
