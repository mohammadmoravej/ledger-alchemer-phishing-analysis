# Generic Hunting Guidance

Platform-agnostic logic. Map the concepts to your own log sources and field names.

## Primary pivots (highest signal)

1. **Domain** in DNS/proxy/firewall logs: `visit-ledger.at`
2. **URL** in proxy/web logs: `https://visit-ledger.at/alchcemser`
3. **Route value** in URL paths: `/alchcemser`

## Email pivots

- Subject equal/similar to `Device Update Required` **combined with** a link to a
  non-Ledger domain.
- Ledger **display-name impersonation** paired with a non-Ledger destination domain.
- Messages originating from **Alchemer** infrastructure that contain the observed URL.
- Presence of Alchemer template artifacts (`{{@survey_link}}`, `[invite(survey_link)]`).

## Web/behavioral pivots

- Client bundle strings: `createVisitorAction`, `checkCloakitAction`,
  `setCloakitTrustAction`, `getRedirectAction` (scope to the domain/bundle).
- Response `Content-Type: text/x-component` (Next.js Server Action) from a suspicious
  domain — supporting, not standalone.
- Browser navigation **from** a suspicious domain **to** an unrelated benign domain
  shortly after load (dynamic-redirect pattern).

## Certificate pivots

- Certificate Transparency monitoring for SANs matching `*.visit-ledger.at` /
  `visit-ledger.at` and for future Ledger lookalike patterns.

## Correlation ideas

- Correlate email click events with endpoint/browser telemetry to identify who clicked.
- Look for **time-clustered** delivery of similar messages within a short window
  (this case: 4 messages in 58 minutes).

## Do / Don't

- **Do** block/alert on the domain and URL.
- **Do** preserve Message-ID and Alchemer identifiers privately for abuse reporting.
- **Don't** block the Cloudflare edge IPs or name servers.
- **Don't** treat a Wikipedia (or other reputable) endpoint as inherently malicious.

See [false-positive notes](../../iocs/false-positive-notes.md).
