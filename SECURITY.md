# Security and Responsible Use

## Purpose

This repository is an **educational, defensive** case study. It documents the analysis
of phishing emails received by the author and low-impact observation of publicly
accessible web resources. It is intended to help defenders, analysts, and learners
understand phishing delivery, email authentication nuance, and client-side redirect
behavior.

## What this repository is not

- It is **not** an offensive toolkit.
- It does **not** provide instructions to bypass authentication, cloaking, or access
  controls.
- It does **not** contain credential-harvesting code or wallet-draining logic.
- It does **not** encourage visiting the documented domain.

Do **not** attempt to access, probe, or exploit the infrastructure described here.
Accessing the `/panel` route or attempting origin-IP discovery, cloaking bypass, or any
active testing is out of scope and is not endorsed.

## Reporting the campaign

If you encounter this or a similar campaign:

- Report the email through your mailbox provider's phishing-report feature.
- Report the campaign to **Alchemer** abuse channels, including any private Alchemer
  identifiers you hold (`cid`, `sid`, `rid`, `qid`).
- Report the lookalike domain to the relevant **registrar/registry** and to
  **Cloudflare** abuse where appropriate.
- Preserve the **raw email** before deleting it.

If a recovery phrase was entered anywhere online, treat it as compromised and follow
official wallet migration guidance immediately.

## Reporting an issue with this repository

If you believe this repository accidentally exposes personal data, unsanitized evidence,
or contains a security issue, please use GitHub's **Private Vulnerability Reporting**
feature to report it privately.

If the issue is not security-related, you may open a public GitHub Issue. Please do not
republish sensitive information in public reports.

## Data-handling commitment

Sensitive recipient data, session information, and tracking identifiers are redacted in
this public repository. Raw evidence is retained privately and excluded. See
[evidence/PRIVATE_EVIDENCE_NOT_INCLUDED.md](evidence/PRIVATE_EVIDENCE_NOT_INCLUDED.md).
