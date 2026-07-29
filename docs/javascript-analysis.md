# JavaScript Analysis

Analysis of the retrieved Next.js chunk, the Server Actions it references, visitor
creation, probable cloaking logic, and dynamic redirect behavior.

---

## 1. Acquisition

```bash
curl https://visit-ledger.at/_next/static/chunks/8165ba880413402f.js \
  -o app.js
```

Observed file size: **2313 bytes**.

> **Figure** — `assets/images/fig-f-javascript-download.png` (and again in
> `...10.29.12 AM.png`): the `curl` transfer meter confirms `app.js` = **2313 bytes**.

```bash
grep -Ei "ledger|wallet|seed|phrase|recover|api|fetch|post|token|email" app.js
```

The output revealed the relevant application logic.

---

## 2. Server Actions identified

```text
createVisitorAction
checkCloakitAction
setCloakitTrustAction
getRedirectAction
```

Observed server reference IDs (opaque identifiers; retained here for completeness — see
also the [raw-excerpts appendix](appendix-raw-excerpts.md)):

```text
createVisitorAction     40a3b322ec0d73d7456813aa62c768fc7caac98afe
checkCloakitAction      00bd192fe02899f452d2867b7dca3c8dcaec9a3649
setCloakitTrustAction   004900739ba6452813caf656c6f827ef26bad75746
getRedirectAction       603789439bb3a7461b6da586b8f7d0aa1ffb1d4bb4
```

---

## 3. Application logic (conceptually deminified)

```javascript
const params = useParams();
const routeValue = Array.isArray(params?.email)
  ? params.email.join("/")
  : params?.email
    ? String(params.email)
    : "";

useEffect(() => {
  if (routeValue === undefined) return;

  let cancelled = false;

  async function run() {
    try {
      const { visitorId } = await createVisitorAction(routeValue);
      if (cancelled) return;

      const cloaking = await checkCloakitAction();
      if (cancelled) return;

      if (!cloaking.allowed && cloaking.redirectUrl) {
        window.location.href = cloaking.redirectUrl;
        return;
      }

      if (cloaking.setTrusted) {
        await setCloakitTrustAction();
      }

      const redirect = await getRedirectAction(visitorId, routeValue);
      if (cancelled) return;

      if (redirect.redirectUrl && redirect.redirectUrl !== "/") {
        window.location.href = redirect.redirectUrl;
        return;
      }

      setState("no-redirect");
    } catch {
      if (!cancelled) setState("error");
    }
  }

  run();

  return () => {
    cancelled = true;
  };
}, [routeValue]);
```

The page displayed these states: `redirecting`, `no-redirect`, `error`.

Observed user-facing strings:

```text
No redirect URL configured. Set one in the panel.
Something went wrong. Please try again.
```

---

## 4. Interpretation

### 4.1 Visitor creation

**FACT:** `createVisitorAction(routeValue)` was called before the redirect decision.

**FACT:** The function returned a `visitorId` during the browser test.

**INFERENCE — High confidence:** The system created or retrieved a visitor-tracking
record.

**UNKNOWN:** The exact fields recorded are unknown.

!!! warning "Not claimed"
    The report does **not** claim the application collected the visitor's IP, operating
    system, browser fingerprint, geolocation, wallet details, or credentials — no direct
    evidence exists for those specific fields.

### 4.2 Cloaking-related function names

**FACT:** The JavaScript included functions named `checkCloakitAction` and
`setCloakitTrustAction`.

**INFERENCE — High confidence:** The application included a trust or allow/deny decision
before final redirection.

**INFERENCE — Moderate to high confidence:** The names are consistent with
cloaking-related logic.

> The client code contained explicit "Cloakit" and trust-related function names and
> conditional redirection logic. This is strongly consistent with a cloaking mechanism,
> although the decision criteria were not observed.

!!! note
    Cloaking is **not** claimed as definitively proven, and the decision criteria (IP,
    geography, user agent, cookie state, timing, etc.) were not observed.

### 4.3 Dynamic redirect

**FACT:** The application called `getRedirectAction(visitorId, routeValue)`.

**FACT:** If a non-root `redirectUrl` was returned, the browser executed
`window.location.href = redirectUrl`.

**INFERENCE — High confidence:** The destination was selected dynamically by server-side
logic rather than hard-coded in the downloaded JavaScript.

### 4.4 Panel reference

**FACT:** The application displayed `No redirect URL configured. Set one in the panel.`

**INFERENCE — Moderate confidence:** Redirect destinations were designed to be
administratively configurable.

**UNKNOWN:** The identity, implementation, and access controls of the referenced panel
were not investigated.
