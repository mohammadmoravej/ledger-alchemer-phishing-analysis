# Appendix — Commands

Exact commands executed during the investigation, preserved verbatim. Output excerpts are
in the section pages and in the [raw-excerpts appendix](appendix-raw-excerpts.md).

!!! warning
    These commands are recorded for transparency and reproducibility of the **defensive**
    method. Do not use them to interact with the live infrastructure described.

## WHOIS

```bash
whois visit-ledger.at
```

## DNS

```bash
dig visit-ledger.at
dig +short visit-ledger.at
dig MX visit-ledger.at
dig NS visit-ledger.at
dig TXT visit-ledger.at
host 172.64.80.1
```

## TLS

```bash
openssl s_client -connect visit-ledger.at:443 -servername visit-ledger.at
sslscan visit-ledger.at
# testssl.sh visit-ledger.at   # not installed in the analysis environment (command not found)
```

## HTTP headers

```bash
curl -I https://visit-ledger.at/alchcemser
curl -IL https://visit-ledger.at/alchcemser
```

## WAF detection

```bash
wafw00f https://visit-ledger.at
```

## Initial HTML acquisition and content search

```bash
curl https://visit-ledger.at/alchcemser \
  -H "User-Agent: Mozilla/5.0" \
  -o ledger.html

grep -i "<form" ledger.html
grep -i "action=" ledger.html
grep -i "seed" ledger.html
grep -i "phrase" ledger.html
grep -i "wallet" ledger.html
grep -i "recover" ledger.html
grep -i "mnemonic" ledger.html
```

## JavaScript acquisition and content search

```bash
curl https://visit-ledger.at/_next/static/chunks/8165ba880413402f.js \
  -o app.js

grep -Ei "ledger|wallet|seed|phrase|recover|api|fetch|post|token|email" app.js
```

## Evidence hashing

Cryptographic hashes of the original `ledger.html` and `app.js` files were not recorded
during evidence collection and are therefore unavailable. No hashes have been
reconstructed or invented.
