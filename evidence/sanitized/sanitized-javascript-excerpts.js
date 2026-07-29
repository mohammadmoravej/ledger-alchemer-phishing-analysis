// === SANITIZED JAVASCRIPT EXCERPTS (app.js, 2313 bytes) ===
// Retrieved from: /_next/static/chunks/8165ba880413402f.js
//
// Server Actions identified:
//   createVisitorAction     40a3b322ec0d73d7456813aa62c768fc7caac98afe
//   checkCloakitAction      00bd192fe02899f452d2867b7dca3c8dcaec9a3649
//   setCloakitTrustAction   004900739ba6452813caf656c6f827ef26bad75746
//   getRedirectAction       603789439bb3a7461b6da586b8f7d0aa1ffb1d4bb4
//
// Conceptually deminified application logic:

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

// States: redirecting | no-redirect | error
// User-facing strings:
//   "No redirect URL configured. Set one in the panel."
//   "Something went wrong. Please try again."
