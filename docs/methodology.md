# Methodology

## Approach

The investigation followed a defensive triage-to-analysis workflow, moving from the
received email outward to the destination infrastructure, and finally to controlled
observation of the application's client-side behavior. At each step the analyst
distinguished **fact** from **inference** and recorded confidence.

## Evidence-source priority

When sources conflict, the following priority applies (highest first):

1. Original raw email
2. Original browser/network capture
3. Original terminal output
4. Original HTML and JavaScript files
5. Screenshots
6. Investigation notes
7. This case file
8. External documentation
9. General knowledge

Direct evidence is never overridden by assumption.

## Phases

1. **Email triage** — decode subject, compare envelope vs. display headers, review
   SPF/DKIM/DMARC results, inspect MIME/HTML, extract Alchemer artifacts and the
   destination URL.
2. **Infrastructure characterization** — WHOIS, DNS (A/NS/MX/TXT/PTR), TLS certificate
   inspection, HTTP header inspection, WAF detection.
3. **Web analysis** — retrieve the initial HTML shell; examine the Next.js structure and
   dynamic route.
4. **JavaScript analysis** — retrieve the relevant chunk; identify Server Actions and
   the redirect decision logic.
5. **Browser/network observation** — capture the request sequence in Firefox Developer
   Tools, inspect the Server Action response, and observe the final navigation.
6. **Assessment and reporting** — classify findings, assign confidence, enumerate
   alternatives, state limitations.

## Tooling

Command-line: `whois`, `dig`, `host`, `openssl s_client`, `sslscan`, `curl`, `wafw00f`.
Browser: Firefox Developer Tools (Network Monitor, Persist Logs). See the
[commands appendix](appendix-commands.md) for exact invocations.

## Analysis environment

Evidenced by the terminal captures in `assets/images/`:

- **OS:** Kali Linux (shell prompt `win11-lab@kali`, Kali desktop).
- **Tooling versions (visible):** `dig` = DiG 9.20.24-1+b1-Debian; `openssl`, `curl` as
  packaged on that Kali release.
- **Timezone:** `EDT` (US/Canada Eastern); the `cf-ray ...-YUL` header places the
  Cloudflare edge in Montreal, consistent with EDT.
- **Local resolver:** `192.168.2.1` (LAN).

Web observation used **Firefox** in the same environment. Developer Tools were opened via
**Menu → More tools → Web Developer Tools** (the F12 shortcut did not work in that session;
`Ctrl + Shift + I` was also available).

!!! note "Environment detection is not asserted"
    This report makes **no claim** that the analysis operating system was detected by any
    anti-analysis or cloaking logic. The redirect decision criteria were not observed.

## Reporting conventions

- Evidence labels: **FACT / OBSERVATION / INFERENCE / HYPOTHESIS / UNKNOWN**.
- Confidence levels: **Confirmed / High / Moderate / Low / Unknown**.
- Inferences and hypotheses are never presented as facts.
- Tool failures (e.g., a tool not being installed) are recorded as environment notes,
  **not** as security findings.
