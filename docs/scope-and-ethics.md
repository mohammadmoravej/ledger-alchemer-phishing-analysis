# Scope and Ethics

## Authorization basis

The emails analyzed were **received by the author** in the author's own mailbox. The web
observation was limited to **publicly accessible resources** using standard,
non-intrusive tools. No system owned by another party was accessed beyond retrieving
content that a public web server served in response to ordinary requests.

## Included activity

- Analysis of four closely timed Ledger-themed emails received by the author.
- Complete raw email analysis for at least one message.
- Sender authentication review (SPF, DKIM, DMARC).
- MIME and HTML review.
- Review of Alchemer campaign/template artifacts.
- Analysis of the destination URL.
- WHOIS lookup; DNS queries; TLS certificate inspection; HTTP header inspection.
- WAF detection.
- Download and review of the initial HTML shell and one relevant JavaScript chunk.
- Firefox Developer Tools Network capture.
- Inspection of a Next.js Server Action response.
- Observation of a client-side redirect to Wikipedia.

## Explicitly excluded activity

The following were **not performed**:

- exploitation;
- authentication bypass;
- brute force;
- credential submission;
- recovery-phrase submission;
- wallet connection;
- panel access;
- origin-IP discovery attempts;
- cloaking bypass;
- vulnerability scanning beyond low-impact observation;
- directory brute forcing;
- port scanning of the suspected infrastructure;
- unauthorized data access;
- persistence;
- malware execution;
- destructive actions.

> The investigation remained defensive, educational, and low impact.

## Handling of the `/panel` reference

The client bundle referenced a route labeled "Panel." **Access to `/panel` was not
attempted and is not instructed anywhere in this repository.** Its purpose and access
controls were not tested.

## Data protection

Sensitive recipient data, session information, and tracking identifiers are redacted
throughout the public material. Raw evidence is retained privately and excluded from the
public repository. See the private-evidence notice in the `evidence/` directory.

## Ethical statement

This work is intended to educate defenders and learners. It must not be used to access,
probe, or interact with the infrastructure described. See
[DISCLAIMER](../DISCLAIMER.md) and [SECURITY](../SECURITY.md).
