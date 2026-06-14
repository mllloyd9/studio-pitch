# scsai.dev — Continue Here (laptop handoff)

Paste this whole file into a fresh Claude Code session on the laptop, or read it top to bottom. It's self-contained — it does not rely on the desktop's memory.

---

## 0. Fastest way to resume on the laptop

```bash
# clone the two pushed repos
git clone https://github.com/mllloyd9/studio-pitch.git        # the scsai.dev STUDIO site (this handoff lives in _HANDOFF/)
git clone https://github.com/mllloyd9/coliseummotorgroup.git  # the real Coliseum site (publish dir = site/)

# run the studio site locally
cd studio-pitch
python -m http.server 8090 --directory .      # open http://localhost:8090
```

Then say to Claude Code: *"Read `_HANDOFF/CONTINUE.md` and pick up at the Next Work plan."*

---

## 1. What this project is

**scsai.dev** = SCS AI's client-facing **web & brand studio** site. It SELLS the service (custom sites + full brand identity + content/social + care + apps). It is a *separate consumer-facing arm* from the SCS AI platform (scsai.app). Marcus will buy the `scsai.dev` domain (available) and deploy **later** — directive was "build with precision, deploy later."

The site's whole strategy: **it must look like a $20k website to sell $1.5k–$15k builds.** It IS the proof.

- Repo: `mllloyd9/studio-pitch` (branch **`master`**) — was the "Northlight Studio" shell, rebranded to SCS AI.
- One static `index.html` + `assets/` + `work/<concept>/`. No build step. Dev server: `python -m http.server 8090 --directory .`
- `robots: noindex` until launch. Commits are pushed but **nothing is deployed yet.**

## 2. Brand (locked)
- Mark: terracotta **smile-face** (two dots + a bowl) + lowercase **`scs.ai`** wordmark.
- Palette: terracotta **#C8624A**, cream **#FAF6F0**, warm black (#11100e / #1a1614). Type: **Fraunces** (display) + **Inter**.
- Tagline available: "Run the business, not the busywork." Source brand book: `Downloads\new_scs_logos\`.
- **HARD RULE — clean break:** never reference Synergetic, or any prior trading/credit work, on any SCS surface. Trading-era brand packs (Wealth Lab, IC Recovery, Bully Signals, BlueSynergy) are OFF-LIMITS for the portfolio.
- **HARD RULE — no fabrication:** no fake stats, testimonials, client counts, logos, or awards. Real work + honest framing only.

## 3. Portfolio (4 live client + 3 concepts)
Pills: green **"Live site"** vs brass **"Concept"**.
- **Live:** SCS AI (scsai.app, flagship), She Pours (shepoursitup.com), Coliseum (coliseummotorgroup.com), Abundant Living (abundant-living-preview.netlify.app → real domain pointing soon).
- **Concepts (all to be built up further):** FitLife (`work/fitlife/`, local), URSKIN (scs-concepts.onrender.com/urskin), Ardelicious (scs-concepts.onrender.com/ardelicious). Concept pages carry a fixed "Concept · built by SCS AI" badge so demo content never reads as fake. Add more via `work/CONCEPTS.md`.

## 4. Pricing model (factual, market-benchmarked — DONE)
Leads with **consultation**, surfaces an accessible **brand-only from $1,500** so brand-only buyers don't bounce. Then ranges as a guide:
- Web tiers (even steps): **Launch $3,500 / Growth $6,500 / Empire $9,500**.
- **Apps & Platforms:** web app/MVP from **$12k**, business app from **$30k**, multi-brand family from $15k, brand-only from $2,500, integrations from $1,500 scoped.
- **Recurring (the margin):** Care Lite $199 / Care Plus $499 / Content from $750 per month.
- Numbers are tied to real 2026 market data (studio site+brand $5–12k; app dev $10–120k; maintenance $150–500/mo). Strategy: competitive entry wins the deal, recurring is the profit.

## 5. The brutally honest assessment (engineer + designer)
**Gorgeous front end, fragile spine.** The site looks $20k; the operations are held together with CLI deploys and ghost folders. Fix the spine or it stays a demo, not a business.

**Engineering debt / gotchas:**
- **Nothing is on continuous deploy.** Coliseum, Abundant, concepts are all hand-CLI-deployed with NO git connection — sources go missing (we lost the live Coliseum source for an hour). The Coliseum live deploy even points at an orphan Netlify site (`stunning-hummingbird-a1e288`) instead of the `coliseummotorgroup` site that owns the domain.
- **Ghost copies everywhere** in `Downloads\` (old Coliseum Bolt repo, stale folders). Always work from the GitHub clone, never Downloads.
- **Lead capture isn't closed:** consultation form has no real backend yet (Netlify-ready + mailto fallback only), Calendly is a placeholder.
- **Concepts on Render free tier** cold-start slow (~30s) — bad for buyers clicking through.
- Studio site is one ~1,400-line `index.html` — fine now, wants a tiny static generator (Astro/11ty) as concepts/case-studies multiply.

## 6. NEXT WORK (priority order)
1. **Lock the spine** (needs Marcus's **Netlify login** — the one gate): every site → its own git repo → Netlify/Vercel **continuous deploy**; connect the live Coliseum site (`04084328-...`) to its repo and delete the orphan `a490387d`; move concepts off Render; give the consultation form a real destination + auto-reply.
2. **Brand portfolio with watermarked print docs** (highest-ROI NEW surface; sells the $1,500 brand-only buyer). A "Brand Work" gallery: business-card mockups, letterhead flatlays, brand-book spreads, packaging — each with a subtle `scs.ai` watermark, lightbox on click. Seed from real packs: SCS brand book (`Downloads\new_scs_logos\`), `Downloads\Coliseum motor\brand guidelines.pdf`, `Downloads\...\Branding Package Design.pdf`. **← recommended immediate start; needs nothing from Marcus.**
3. **The "magnetic" pass** (with restraint — max effects = tacky): cinematic load moment (smile-mark draws in, headline letter-stagger), **hover = live preview** of each portfolio site (killer for a web studio), scroll-driven storytelling, 3D tilt on cards, terracotta ink-wipe transitions. ALL gated behind `prefers-reduced-motion`, 60fps, strict perf budget.
4. **Case-study pages** (problem → build → result) + concept velocity (a concept template) — ongoing.

## 7. Other repos / state
- **Coliseum** (`mllloyd9/coliseummotorgroup`, branch `main`): the REAL live site. Publish dir = `site/`. Recently added Privacy + Terms pages (drafts — have counsel review). Full visual "beautiful height" redesign still pending (Marcus not yet satisfied — wants real inventory / richer motion / latitude). Source-of-truth lives here now; live site is still the old CLI deploy until continuous deploy is wired.
- **Abundant Living**: live at abundant-living-preview.netlify.app, but its **source is not in git anywhere** (CLI-deployed). To build it up: mirror the live static site into a new repo first (it's recoverable — same play that rescued Coliseum), then elevate.
- **coliseum-build.zip** (`Downloads\`): the full Coliseum source archive incl. raw Higgsfield generation assets (~120MB) — kept out of the repo on purpose.

## 8. Working rules with Marcus
Be direct, no hedging, brutally honest. Show the diff before destructive ops. Find paths to YES. Never fabricate stats/claims. Commit + push after work. He moves fast and wants autonomous building — but confirm pricing changes and anything touching live client sites.

---
*Handoff written 2026-06-14. Studio site + Coliseum are pushed; pull them on the laptop and keep going.*
