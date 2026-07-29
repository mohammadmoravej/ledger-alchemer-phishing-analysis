# How I Investigated a Ledger-Themed Phishing Redirector

*From authenticated email delivery to Next.js Server Actions, visitor tracking, and a
client-side redirect to Wikipedia.*

> A defensive case study. No credentials were entered, no recovery phrase was submitted,
> nothing was bypassed, and no unauthorized access was attempted. Sensitive data is
> redacted throughout.

## Why the email looked convincing

Four Ledger-branded emails landed in my mailbox within 58 minutes, subject line "Device
Update Required." The branding looked right. The catch: the call-to-action pointed to
`visit-ledger.at`—not a Ledger domain—and the visible `To:` header
(`restore@ledger.live`) was not the mailbox that actually received the message.

## Why SPF/DKIM/DMARC did not prove Ledger ownership

All three authentication checks **passed**. That surprises people, but it shouldn't:
authentication proves the message was legitimately sent and signed by the infrastructure
that sent it—here, Alchemer-related infrastructure. It says nothing about whether the
*brand in the body* authorized the message. Authentication validates the sender service,
not the brand.

## SMTP envelope vs. visible headers

Delivery is controlled by the SMTP envelope (`MAIL FROM`/`RCPT TO`), while `From:`/`To:`
are cosmetic message headers. Yahoo's `X-Apparently-To` recorded the real recipient—which
differed from the shown `To:`. Classic display-header dressing.

## Inspecting the domain safely

I never "just clicked." I characterized the domain first:

- **WHOIS:** Cloudflare name servers; registrant withheld; a `changed` timestamp of
  2026-04-09 (a change date, *not* proof of the registration date).
- **DNS:** an `A` record of `172.64.80.1`—a Cloudflare **edge** address, not the origin.
- **TLS:** a valid Let's Encrypt certificate for `visit-ledger.at` and `*.visit-ledger.at`.
  Valid HTTPS ≠ trustworthy. Anyone can get a certificate.
- **HTTP:** `HTTP/2 200`, `x-powered-by: Next.js`, behind Cloudflare. No 301/302 redirect
  at the HTTP layer.

## Discovering the Next.js shell

`curl` returned a 7 KB HTML shell titled "Redirect" with a loading spinner and Next.js
chunks. Searching it for `form`, `seed`, `phrase`, `wallet`, `recover`, `mnemonic` found
nothing—because the interesting behavior runs *after* JavaScript executes. The bundle also
referenced a `/panel` route (which I did **not** access).

## Reading the JavaScript

One 2 KB chunk revealed four Next.js Server Actions:

- `createVisitorAction` — creates/returns a visitor ID
- `checkCloakitAction` — a trust / allow-deny check
- `setCloakitTrustAction` — marks a visitor trusted
- `getRedirectAction` — returns the destination URL

The logic: register the visitor, run a "Cloakit" check, and if allowed, fetch a redirect
URL and navigate via `window.location.href`.

## Understanding visitor creation and probable cloaking

The function names strongly suggest **cloaking**—serving different content to different
visitors. I say *probable*, not *proven*: I never observed the decision criteria. And I
make no claim about what fields the visitor record stored (IP, fingerprint, geo)—there was
no evidence of specifics.

## Proving the redirect with Firefox Network Monitor

With Persist Logs on, I captured: initial `GET` (HTTP 200, HTTP/3) → Next.js assets →
several `POST`s to the same path → a `rum` request → final `GET` to `www.wikipedia.org`.
One Server Action response (content type `text/x-component`, a React Server Component
stream) returned a `visitorId`. The redirect was **client-side**, after JS executed—not an
HTTP 301/302.

## What was confirmed

Ledger impersonation via a lookalike domain; authenticated Alchemer delivery; a
Cloudflare-fronted Next.js app; dynamic route param named `email`; visitor-ID creation;
cloaking-related client logic; a dynamically chosen redirect; and a benign Wikipedia
endpoint in my session.

## What remained a hypothesis

Whether a different, malicious destination was served to earlier clickers. The
infrastructure stayed *operational*—so I do **not** claim it was "shut down." The original
downstream destination, if any, was simply **not observed**.

## Lessons for defenders

- Don't trust authentication as brand authorization.
- Don't trust HTTPS as legitimacy.
- Don't block shared Cloudflare IPs—block the **domain** and **URL**.
- Modern phishing behavior is client-side; use the browser's Network Monitor.
- Label facts vs. inferences vs. hypotheses, and never enter a recovery phrase anywhere
  online.

*Sanitized IOCs, diagrams, a confidence matrix, and defensive detections are in the
companion repository.*
