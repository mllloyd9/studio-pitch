# Adding a Concept Build

Concepts are self-contained demo sites that show the studio's range across industries. They live alongside real client work in the portfolio but are clearly labeled so nothing reads as a fake client result.

## To add a new concept (repeat per build)

1. **Folder:** create `work/<concept-slug>/` with its own `index.html` (+ `style.css` / `script.js` as needed). Each concept can have its own distinct brand/look — that's the point: range.

2. **Concept badge:** add this fixed marker just inside `<body>` (before the nav) so the page can never be mistaken for a real business. Link it back to the studio:
   ```html
   <a href="../../index.html#work" aria-label="A concept by SCS AI — back to studio"
      style="position:fixed;left:16px;bottom:16px;z-index:99999;display:inline-flex;align-items:center;gap:8px;background:rgba(17,16,14,.92);backdrop-filter:blur(8px);border:1px solid rgba(201,161,74,.45);color:#c9a14a;font-family:system-ui,sans-serif;font-size:11px;letter-spacing:.12em;text-transform:uppercase;font-weight:600;padding:9px 14px;border-radius:100px;text-decoration:none;box-shadow:0 10px 30px -10px rgba(0,0,0,.6)">✎&nbsp; Concept · built by SCS AI</a>
   ```

3. **Portfolio card:** add a card to the `.work-grid` in the root `index.html`, with the concept pill:
   ```html
   <a class="work-card reveal" href="work/<concept-slug>/index.html" target="_blank" rel="noopener">
     <div class="work-shot"><img src="assets/work/<concept-slug>.png" alt="<Name> concept"></div>
     <div class="work-body">
       <span class="wtag concept">Concept</span>
       <div class="work-cat"><Industry> · <Type></div>
       <h3><Name></h3>
       <p>One honest line on what it demonstrates.</p>
       <span class="work-link">Open the concept <span class="url">preview</span> →</span>
     </div>
   </a>
   ```

4. **Screenshot:** drop a `assets/work/<concept-slug>.png` (16:10-ish, top-aligned) for the card.

## Rules (non-negotiable)
- **Real client work** gets the `wtag live` pill; **concepts** get `wtag concept`. Never blur the two.
- Concept pages may use illustrative/sample copy, but the Concept badge must make their nature obvious. No presenting a concept as a real business with real customers.
- No fabricated stats/testimonials framed as real on any page that isn't clearly badged a concept.
