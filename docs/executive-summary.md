# Executive Summary

## Overview

The author received four visually similar emails impersonating **Ledger** within a
single 58-minute window on the evening of **July 28, 2026**, before the live technical
investigation the next morning (**July 29, 2026**). The messages were delivered through
**authenticated Alchemer infrastructure** — the visible sender was `noreply@alchemer.com`
— and contained a call-to-action pointing to the **lookalike domain `visit-ledger.at`**
rather than a genuine Ledger domain.

The destination, `https://visit-ledger.at/alchcemser`, resolved through **Cloudflare**
and served a **Next.js** application. The application:

- returned **HTTP 200** (no server-side 301/302 redirect on the initial request);
- used a **dynamic route parameter named `email`** whose value was `alchcemser`;
- created a **visitor identifier** through a Next.js **Server Action**
  (`createVisitorAction`);
- contained client functions named `checkCloakitAction` and `setCloakitTrustAction`
  (**probable cloaking logic**);
- obtained its final redirect destination **dynamically** from the server
  (`getRedirectAction`) and then navigated the browser with `window.location.href`.

During the investigation the browser was ultimately navigated to **Wikipedia** after
JavaScript and Server Action execution. **No credential-harvesting or recovery-phrase
form was directly observed.**

## Assessment

> **High-confidence phishing-related infrastructure with dynamic redirection, visitor
> tracking, and probable cloaking.**

The investigation did not directly observe a credential-harvesting or recovery-phrase
form. The assessment is based on the combined email impersonation, lookalike domain,
Alchemer delivery artifacts, dynamic visitor registration, cloaking-related client
logic, and server-selected redirect behavior.

## Important qualification

> The original downstream phishing destination, if one existed, was not directly
> observed during this investigation. The redirector and visitor-tracking application
> remained operational during the investigation, but the observed destination was
> benign (Wikipedia).

## Key correctness guardrails

This report deliberately does **not** claim any of the following, because the evidence
does not support them:

- that a credential-harvesting page was directly observed;
- that a recovery phrase or wallet credential was stolen;
- that authentication, cloaking, or access controls were bypassed;
- that the Cloudflare IP is the attacker's origin server;
- that the WHOIS `changed` date is the domain's registration date;
- that an analysis operating system was definitively detected by anti-analysis logic;
- that the infrastructure was completely shut down;
- that SPF/DKIM/DMARC "failed."

## Why this matters

Email authentication (SPF, DKIM, DMARC) **passed** — not because Ledger sent the
message, but because it was delivered through authenticated third-party infrastructure.
This is the central teaching point: **authentication validates the sending service, not
the brand in the content.**
