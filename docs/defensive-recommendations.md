# Defensive Recommendations

## For individual users

- **Never enter a recovery phrase into a website.** Ledger will never ask for it.
- Treat unsolicited "device update" emails as suspicious.
- Verify Ledger notifications through **manually navigated** official channels — not via
  email links.
- Do **not** trust HTTPS alone; a valid certificate does not prove brand ownership.
- Report the email through your mailbox provider's phishing-report feature.
- Report the campaign to **Alchemer** with the relevant private identifiers
  (`cid`, `sid`, `rid`, `qid`).
- Report the lookalike domain to the **registrar/registry** and to **Cloudflare** abuse
  where appropriate.
- **Preserve the raw email** before deleting it.
- If a recovery phrase was entered anywhere online, treat it as **compromised** and
  follow official wallet migration guidance immediately.

## For SOC teams

- Search DNS and proxy logs for:
  ```text
  visit-ledger.at
  ```
- Search email systems for the subject:
  ```text
  Device Update Required
  ```
- Search for Ledger display-name impersonation paired with non-Ledger destination
  domains.
- Search for Alchemer-origin messages containing the observed URL.
- Correlate click events with endpoint/browser telemetry.
- **Prefer domain and URL blocking over Cloudflare IP blocking.** Blocking
  `172.64.80.1` risks collateral impact on unrelated Cloudflare-hosted sites.
- Preserve Message-ID and Alchemer identifiers **privately**.
- Review whether other users received similar messages during the same hour.

## For threat hunters

Potential hunting pivots:

- domain (`visit-ledger.at`)
- exact URL (`https://visit-ledger.at/alchcemser`)
- route value (`alchcemser`)
- subject (`Device Update Required`)
- Alchemer template strings (`[invite(survey_link)]`, `{{@survey_link}}`)
- JavaScript function names (`createVisitorAction`, `checkCloakitAction`,
  `setCloakitTrustAction`, `getRedirectAction`)
- certificate SANs (`*.visit-ledger.at`, `visit-ledger.at`)
- time-clustered message delivery
- browser navigation from a suspicious domain to an unrelated benign domain (e.g.,
  Wikipedia)

!!! warning "False positives"
    Benign redirects can create false positives. A navigation ending at Wikipedia (or any
    reputable site) is not, by itself, malicious. Corroborate with the email, domain, and
    delivery indicators. See the false-positive notes in the repository's
    `iocs/false-positive-notes.md`.

See the detection guidance in the repository's `detection/` directory for generic hunting
logic and example (placeholder) Splunk queries.
