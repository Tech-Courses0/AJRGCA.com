# Product

## Register

brand

## Users

Decision-makers at Indian businesses — founders, finance heads, and operations leads at SMEs and growing companies across Mumbai, Noida, Ahmedabad, and Bangalore — evaluating a Chartered Accountancy firm for advisory, audit, tax, and compliance work. They arrive cautious and comparison-shopping: a CA relationship is high-trust and long-term, so the visitor's job on this site is to decide whether AJRG and Associates is credible, qualified, and the kind of firm they want handling sensitive financial work. They read on desktop and mobile, often outside business hours, and many are experienced professionals who value substance over flash.

## Product Purpose

The marketing site for **AJRG and Associates, Chartered Accountants** (ajrgca.com). It exists to convert considered evaluation into a booked consultation by communicating qualified, partner-led expertise and regulatory rigor without overpromising. Success is a visitor who finishes the page trusting the firm enough to reach out — and a site that does this while staying inside ICAI advertising guidelines (informational, not solicitous) and DPDP-compliant on data handling. The design *is* the product here: a visitor's impression of polish and seriousness is the credibility signal.

## Brand Personality

Assured, precise, quietly premium. Three words: **regal, exacting, trustworthy.** The voice is a senior partner who is confident without being loud — clarity over jargon, specifics over slogans. Emotional goal: a visitor should feel *reassured* and *respected*, the calm of being in capable hands. The signature gesture is restraint with one discovered luxury detail (the liquid-gold accent) — never decoration for its own sake.

## Anti-references

- **Generic SaaS landing template.** Gradient hero, identical icon-heading-text card grids, tiny uppercase tracked eyebrows above every section, hero-metric blocks. The interchangeable AI-landing-page look. This firm is not a startup pitching a product.
- **Cold corporate-blue "Big 4" consultancy.** The interchangeable navy-and-grey stock-photo look with no warmth or point of view. The Royal Minimalist purple-and-gold identity exists specifically to *not* be this.
- (Also avoid: cheap clip-art accounting tropes — stock calculators, handshake photos, dollar-sign motifs, loud "TAX SEASON" banners.)

## Design Principles

1. **Identity-preserving refinement.** Deck-purple ink (`#221042`), regal purple, liquid gold, lavender canvas, and the Playfair Display + Inter pairing are committed brand identity. Experiments push craft, motion, layout, hierarchy, and polish — they stay recognizably the same firm. (Goal: refine within identity, not redesign the brand.)
2. **Earned trust over asserted trust.** Show credentials, standards, and specifics (ICAI registration, partner qualifications, named practice areas) rather than claiming "world-class." Restraint reads as confidence.
3. **One discovered luxury detail, sparingly.** The liquid-gold accent is a signature, not a texture. It marks emphasis words, dividers, and corner details on a clean canvas — never coats a surface.
4. **Compliance is a design constraint, not an afterthought.** Copy stays informational (ICAI), data language stays DPDP-correct, and statutory `TODO`s in `config/site.ts` are never invented to fill a layout.
5. **Substance scales down.** The page must read as credible and legible to an experienced, possibly less tech-fluent business owner on a phone as much as a founder on a large display.

## Accessibility & Inclusion

Target **WCAG 2.1 AA**. Body text ≥4.5:1 against its background (watch the muted purple-greys `--ink-3`/`--ink-4` on the lavender canvas and white-on-purple in dark sections — verify, don't assume); large/bold text ≥3:1. Full keyboard navigability with the existing gold focus ring (already meets AA). Every animation — the liquid-gold flow, FadeIn reveals, the animated counters — needs its `prefers-reduced-motion: reduce` alternative (the global reset is in place; keep it intact for any new motion). Content must be readable and operable, not gated behind a class-triggered reveal that never fires on a headless render.
