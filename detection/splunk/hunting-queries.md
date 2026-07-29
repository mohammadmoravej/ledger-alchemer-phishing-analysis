# Splunk — Example Hunting Queries (Placeholders)

!!! warning "Adapt before use"
    These are **examples**. Field names (`index`, `url`, `query`, `sender`, `subject`,
    `dest_host`, …) must be mapped to your environment's actual sourcetypes and CIM/data
    models. No vendor-specific fields are asserted as ground truth.

## 1. Domain / URL in proxy or DNS logs

```text
index=proxy OR index=dns
("visit-ledger.at" OR "https://visit-ledger.at/alchcemser")
| stats count min(_time) as first_seen max(_time) as last_seen by src, dest_host, url
```

## 2. Email subject + non-Ledger link

```text
index=email
subject="Device Update Required"
| search NOT url="*ledger.com*"
| table _time, sender, subject, url, message_id
```

> Tune: the subject is generic; require the suspicious URL/domain to reduce false
> positives.

## 3. Ledger display-name impersonation with non-Ledger domain

```text
index=email
from_display="*Ledger*"
| rex field=from_addr "@(?<from_domain>[^>]+)"
| where NOT match(from_domain, "(?i)ledger\.com$")
| table _time, from_display, from_addr, from_domain, subject, url
```

## 4. Route value in web/proxy logs

```text
index=proxy
uri_path="/alchcemser"
| stats count by src, dest_host, uri_path, http_user_agent
```

## 5. Dynamic-redirect pattern (originating suspicious domain)

```text
index=proxy
| transaction src maxspan=30s
| search dest_host="visit-ledger.at"
| where match(_raw, "wikipedia\.org")
| table _time, src, dest_host, url
```

> This is illustrative. Redirect correlation depends heavily on how your proxy logs
> referrers and sequential requests.

## Notes

- Prefer domain/URL over the Cloudflare IP `172.64.80.1`.
- Preserve `message_id` and Alchemer identifiers privately for abuse reporting.
- Review the [false-positive notes](../../iocs/false-positive-notes.md).
