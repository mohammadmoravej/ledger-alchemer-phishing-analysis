# Limitations

## Analytical limitations

- Only **one** of the four messages was analyzed in depth. Whether the four belonged to
  one campaign, multiple campaigns, retries, A/B tests, or multiple recipient records is
  **UNKNOWN**.
- The **redirect decision criteria** (why Wikipedia was served) were not observed.
- The **original downstream destination**, if one existed, was **not** directly observed.
- The **visitor-tracking fields** recorded server-side are unknown; no claim is made about
  IP, OS, fingerprint, geolocation, wallet, or credential collection.
- The **operator identity** and the **status of the Alchemer account** (attacker-created,
  compromised, purchased, abused) are unknown.
- The `/panel` route's purpose and access controls were **not** tested.
- `sslscan` results reflect the **Cloudflare edge**, not the hidden origin.

## Environment notes (not findings)

- `testssl.sh` was not installed (`command not found`). This is an environment note, not a
  security finding.
- The Firefox F12 shortcut did not work in that session; Developer Tools were opened via
  the menu. This has no bearing on the findings.

## Rejected / withheld claims

The report explicitly does **not** assert:

- that a credential-harvesting page was directly observed;
- that a recovery phrase or wallet credential was stolen;
- that authentication, cloaking, or access controls were bypassed;
- that `172.64.80.1` is the attacker's origin server;
- that the WHOIS `changed` date is the registration date;
- that an analysis OS was definitively detected by anti-analysis logic;
- that the infrastructure was completely shut down;
- that the Alchemer account was definitively compromised.

---

## Known evidence gaps

The following remain incomplete unless separately supplied:

1. Complete raw headers for all four emails.
2. Exact calendar date/time for Emails 1–3. *(Partially resolved: the email screenshot
   confirms Email 4 as **July 28, 2026 at 10:21 PM** and the From address
   `noreply@alchemer.com`; Emails 1–3 times (9:23/9:38/9:41 PM) still rely on the mailbox
   view, not raw headers.)*
3. Comparison of Message-ID across all four messages.
4. Comparison of Alchemer `cid`, `sid`, `rid`, and `qid` values across all four messages.
5. SHA-256 hashes of `ledger.html` and `app.js`.
6. Full sanitized raw email file.
7. Full HAR export.
8. Exact response content of every Server Action.
9. Server-side redirect decision criteria.
10. Original phishing destination, if different from Wikipedia.
11. Identity of the infrastructure operator.
12. Whether an Alchemer account was compromised or attacker-controlled.
13. Whether the route was targeted to a specific recipient.
14. Whether a credential-harvesting page existed earlier.
15. Whether the application stored IP, geolocation, or browser fingerprint data.

These gaps are stated plainly and are **not** filled with assumptions.
