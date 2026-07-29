# Phishing Case Study Template

Reusable skeleton for future phishing investigations. Keep the evidence discipline:
label every claim **FACT / OBSERVATION / INFERENCE / HYPOTHESIS / UNKNOWN** and assign
**Confirmed / High / Moderate / Low / Unknown** confidence. Where evidence is
insufficient, write: *Evidence does not support a definitive conclusion.*

## 1. Executive summary
- One paragraph: what was received, what it impersonated, what the destination did, and
  the headline assessment with confidence.

## 2. Scope and authorization
- What was analyzed; what was explicitly NOT done (exploitation, bypass, credential
  submission, etc.).

## 3. Evidence sources
- Raw email(s), captures, terminal output, HTML/JS, screenshots, notes. Note the
  evidence-priority order.

## 4. Delivery timeline
- Receipt times, intervals, clustering. Note timezone/date gaps as UNKNOWN if raw headers
  are missing.

## 5. Email header analysis
- Subject decode; envelope vs. display headers; `X-Apparently-To` vs. `To:`.

## 6. SPF / DKIM / DMARC
- Results + the interpretation that authentication validates the sender service, not the
  brand.

## 7. MIME / HTML analysis
- Template artifacts, editing remnants, personalization, tracking-pixel review.

## 8. IOC extraction
- Domain, URL, route, subject, template strings, JS strings, TLS SANs.

## 9. Infrastructure: WHOIS / DNS / TLS / HTTP / WAF
- Distinguish origin vs. shared CDN/edge. Do not treat CDN IPs as origin.

## 10. Web + JavaScript analysis
- App framework, routes, client logic, redirect mechanism.

## 11. Browser / network capture
- Request sequence; server responses; where the redirect actually happens.

## 12. Assessment
- Confirmed findings; high-confidence assessment; explicit qualifications.

## 13. Alternative explanations & campaign-lifecycle hypotheses
- Lettered hypotheses with confidence.

## 14. Evidence matrix + confidence matrix
- Finding | Evidence | Classification | Confidence | Alternative.

## 15. Threat assessment (+ optional MITRE ATT&CK)
- Behavioral approximations only; no forced mappings.

## 16. Defensive recommendations
- Users / SOC / threat hunters. Prefer domain/URL over CDN IP.

## 17. Lessons learned · Limitations · Known evidence gaps

## 18. References
- RFCs, official framework/CDN/vendor docs, MITRE, NIST. No fabricated URLs/dates.

## 19. Appendices
- Commands (verbatim), sanitized raw excerpts, redaction tokens.

## Redaction tokens
```text
[REDACTED-EMAIL] [REDACTED-PHONE] [REDACTED-MESSAGE-ID]
[REDACTED-COOKIE] [REDACTED-SESSION] [REDACTED-TRACKING-ID]
```
