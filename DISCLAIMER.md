# Disclaimer

This case study documents the defensive analysis of emails received by the author and
low-impact observation of publicly accessible web resources. No authentication bypass,
exploitation, credential submission, recovery-phrase submission, or unauthorized access
was attempted. Sensitive recipient data, session information, and tracking identifiers
have been redacted.

## Scope of activity

The investigation was limited to:

- reading and analyzing emails received by the author;
- passive DNS, WHOIS, and TLS queries;
- retrieving publicly served HTTP responses, HTML, and JavaScript with standard tools;
- observing browser behavior in a controlled analysis environment.

The following were **explicitly not performed**: exploitation, authentication bypass,
brute force, credential submission, recovery-phrase submission, wallet connection, panel
access, origin-IP discovery attempts, cloaking bypass, vulnerability scanning beyond
low-impact observation, directory brute forcing, port scanning, unauthorized data
access, persistence, malware execution, or destructive actions.

## Evidence discipline

Findings in this repository are labeled with an evidence type
(**FACT / OBSERVATION / INFERENCE / HYPOTHESIS / UNKNOWN**) and a confidence level
(**Confirmed / High / Moderate / Low / Unknown**). Inferences and hypotheses are not
presented as facts. Where evidence is insufficient, the text states that the evidence
does not support a definitive conclusion.

## Trademarks

"Ledger" and "Alchemer" are trademarks of their respective owners and are referenced
solely for accurate, educational documentation. This project is not affiliated with,
endorsed by, or sponsored by Ledger or Alchemer.

## No warranty / no liability

This material is provided for educational purposes only, without warranty of any kind.
The author accepts no liability for any use of the information contained herein. Do not
use it to access, probe, or interact with the infrastructure described.
