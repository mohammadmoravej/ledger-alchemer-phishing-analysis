# LinkedIn Post

> ~210 words. Replace `[GitHub case study link]` before posting.

---

I recently investigated a Ledger-themed phishing email that passed SPF, DKIM, and
DMARC—not because Ledger sent it, but because it was delivered through authenticated
third-party infrastructure (Alchemer). That single nuance is the whole lesson: email
authentication validates the *sending service*, not the *brand in the content*.

Four look-alike emails arrived in a 58-minute window, all pointing to a non-Ledger
domain, `visit-ledger.at`. Instead of clicking blindly, I analyzed it defensively—WHOIS,
DNS, TLS, and HTTP—then studied the site's behavior in the browser.

The destination was a Cloudflare-fronted Next.js app. Using Firefox's Network Monitor, I
watched it call Server Actions that created a visitor ID, ran trust/"Cloakit" checks
(probable cloaking), and then chose a redirect destination dynamically. In my session it
sent the browser to Wikipedia.

Important: I entered no credentials, submitted no recovery phrase, bypassed nothing, and
accessed no restricted area. I did not observe a credential-harvesting page—so I don't
claim one. What I can say with high confidence: this is phishing-related redirect
infrastructure with visitor tracking and probable cloaking.

Full write-up (sanitized, evidence-labeled, with defensive guidance):
[GitHub case study link]

#ThreatIntelligence #Phishing #EmailSecurity #DFIR #NextJS #BlueTeam
