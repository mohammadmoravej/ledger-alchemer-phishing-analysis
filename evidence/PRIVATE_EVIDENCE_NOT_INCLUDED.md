# Private Evidence — Not Included

To protect the recipient and to avoid republishing tracking identifiers, the following
raw evidence is **retained privately and excluded** from this public repository.

## Retained privately (not published)

- Full raw email (all headers and body).
- Complete Message-ID.
- Complete recipient address (the author's real Yahoo mailbox).
- Full visitor ID.
- Complete recipient-associated Alchemer identifier (`rid`).
- Raw, unredacted screenshots (including desktop/browser context).
- Raw `ledger.html` and `app.js` files.
- Complete HTTP headers with any cookies/session data.
- Original timestamps and any full tracking identifiers.
- Full HAR export (if captured).

## Why

This material contains personally identifying information and recipient-specific tokens.
Publishing it would harm the victim and could aid abuse. The public repository contains
only sanitized excerpts sufficient for the educational and defensive purpose.

## For legitimate follow-up

The private evidence may be shared, on a need-to-know basis, with:

- the mailbox provider's abuse/phishing team;
- Alchemer's abuse team (with the private `cid`/`sid`/`rid`/`qid` values);
- the domain registrar/registry and Cloudflare abuse process;
- relevant law-enforcement or CERT contacts, where appropriate.

## Storage guidance

Keep private evidence outside any git working tree, or in a path matched by
`.gitignore` (e.g., `private/`, `raw/`, `*.eml`, `*.har`). Never commit it.
