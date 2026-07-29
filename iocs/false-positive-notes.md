# False-Positive Notes

Read this before operationalizing any indicator from this case.

## 1. Cloudflare IPs are shared — do not block

`172.64.80.1` and the IPv6 endpoint `2606:4700:130:436c:6f75:6466:6c61:7265` are
**Cloudflare edge** addresses used by an enormous number of unrelated, legitimate sites.
Blocking them by IP will cause collateral outages and will **not** reliably block the
campaign (Cloudflare can serve the same site from many IPs). **Block the domain and URL
instead.**

Similarly, the Cloudflare **name servers** (`harlan.ns.cloudflare.com`,
`paris.ns.cloudflare.com`) and the use of **Cloudflare/Next.js/Let's Encrypt** are not
indicators of malice — they are ubiquitous, legitimate technologies.

## 2. Generic subject line

`Device Update Required` is generic. Alerting on the subject alone will match benign mail.
Corroborate with the sender, the lookalike domain, or the URL.

## 3. Benign final destination

The observed navigation ended at **Wikipedia**. A redirect that ends at a reputable site
is **not**, by itself, malicious. Do not build detections that treat "navigated to
Wikipedia" as bad; the signal is the **originating** suspicious domain plus the dynamic
redirect behavior — not the endpoint.

## 4. `X-Apparently-To` differing from `To:`

A visible `To:` differing from the delivered mailbox can also occur with legitimate
mailing lists and BCC delivery. It is supporting evidence, not proof on its own.

## 5. Absent MX / TXT / PTR

Absence of MX, TXT, or PTR records is common for web-only domains and is **not** proof of
phishing.

## 6. Alchemer identifiers and template strings

`cid`/`sid`/`rid`/`qid` and strings like `{{@survey_link}}` legitimately appear in genuine
Alchemer mailings. They are useful for **abuse reporting to Alchemer**, not for
broad-brush blocking.

## 7. Server Action / function names

`createVisitorAction`, `checkCloakitAction`, etc., are specific to this application's
bundle and are strong pivots **for this campaign**, but generic redirect logic exists in
many legitimate apps. Scope such hunts to the domain/bundle.

## Bottom line

Prioritize the **domain** (`visit-ledger.at`) and **URL**
(`https://visit-ledger.at/alchcemser`). Use everything else as corroboration.
