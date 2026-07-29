# Publication Notes

## Building the documentation site (GitHub Pages via MkDocs)

Install dependencies and preview locally:

```bash
pip install -r requirements-docs.txt
mkdocs serve
```

Then open <http://127.0.0.1:8000/> in a browser.

Build a static site into `site/`:

```bash
mkdocs build
```

Deploy to GitHub Pages (only after you have reviewed redactions and are authorized to
publish):

```bash
mkdocs gh-deploy
```

`site/` is git-ignored; do not commit build output.

## Pre-publication redaction checklist

Verify **before** publishing:

- [ ] No personal Yahoo address appears.
- [ ] No phone number appears.
- [ ] No full visitor ID appears (only `6a69f7d7…cb113`).
- [ ] No cookies appear.
- [ ] No session tokens appear.
- [ ] No full recipient-specific tracking identifier appears (mask `rid` as `1785…9924`).
- [ ] No screenshot includes personal browser tabs or bookmarks.
- [ ] No claim says a credential form was observed.
- [ ] No claim says credentials were stolen.
- [ ] No claim says the infrastructure was shut down.
- [ ] No claim treats the Cloudflare IP as the origin.
- [ ] No claim treats WHOIS `changed` as the registration date.
- [ ] No claim says an analysis OS was definitely detected.
- [ ] All hypotheses are labeled; all confidence levels are explained.
- [ ] Commands are preserved accurately.
- [ ] Tool failures (e.g., missing `testssl.sh`) are not reported as findings.
- [ ] All references resolve.
- [ ] Public IOC files distinguish true IOCs from shared infrastructure.

## Figures

The report references **eight real screenshots**, catalogued in `images/README.md`:

- `raw/` holds the originals (git-ignored, kept private).
- `sanitized/` holds the publishable copies (same filenames) that the report cites.

| Capture (EDT) | Content | Report section |
|---|---|---|
| 10.26.52 | `whois` | Infrastructure › WHOIS |
| 10.27.14 | `dig` A record | Infrastructure › DNS A |
| 10.27.40 | `dig` MX/TXT + SOA | Infrastructure › MX/TXT |
| 10.28.00 | `openssl` TLS (issuer YE1, TLS 1.3) | Infrastructure › TLS |
| 10.28.21 | `curl -I` HTTP/2 200 | Infrastructure › HTTP headers |
| 10.28.36 | `curl` app.js (2313 B) | JavaScript › Acquisition |
| 10.29.12 | `curl` ledger.html (7294 B) | Web › Initial HTML |
| 10.36.09 | phishing email (From `noreply@alchemer.com`) | Email Analysis |

**Not provided in this set** (still supported by the case record only): the Firefox
DevTools Network capture, the Next.js Server Action response with the visitor ID, and the
final navigation to Wikipedia. Do not present these as screenshot-backed.

## Evidence hashing

Cryptographic hashes of the original `ledger.html` and `app.js` files were not recorded
at collection time and are unavailable. Do not reconstruct or invent hashes.
