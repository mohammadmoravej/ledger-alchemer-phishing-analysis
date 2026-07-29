# Portfolio Summary

> ~140 words.

**Project:** Ledger-Themed Phishing Investigation — Alchemer Delivery, Dynamic Redirects,
and Probable Cloaking.

**Objective:** Perform a defensive, low-impact analysis of a Ledger-impersonation phishing
campaign received in the author's mailbox, and document it as an evidence-based case study.

**Approach & tools:** Email header/MIME analysis and SPF/DKIM/DMARC interpretation;
`whois`, `dig`, `host`, `openssl`, `sslscan`, `curl`, `wafw00f`; static review of a Next.js
HTML shell and JavaScript chunk; Firefox DevTools Network Monitor to observe Next.js Server
Actions, visitor-ID creation, probable "Cloakit" cloaking logic, and a dynamic client-side
redirect.

**Key finding:** High-confidence phishing-related redirect infrastructure with visitor
tracking and probable cloaking, fronted by Cloudflare; the observed destination was
Wikipedia. No credential-harvesting form was observed, and none is claimed.

**Rigor:** Every claim labeled by evidence type and confidence; no unauthorized access;
sensitive data redacted; responsible-publication workflow.

**Skills:** Email Security, Threat Intelligence, DNS, TLS, HTTP, JavaScript Analysis,
Next.js, Firefox DevTools, IOC Extraction, Incident Reporting.
