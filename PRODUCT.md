# Product

## Register

product

## Users

Kitchen/ops staff at You Tiao Mei Manufacturing's central kitchen (FoodXchange @ Admiralty). They use this on shared devices during active kitchen operations — logging deliveries by outlet, tracking order/picking status synced from Orderspace, managing outlet and user records. Time-pressured, non-technical, mobile/tablet-first.

## Product Purpose

Delivery tracking and order management that replaces manual/paper tracking for the central kitchen: a shared source of truth for daily deliveries (trays, baskets, cold items), outlet order status, and outlet/user administration.

## Brand Personality

Fast, no-nonsense, reliable.

## Anti-references

No specific anti-references given. Default to avoiding generic AI-SaaS scaffolding (gradient hero metrics, glassmorphism, eyebrow labels, identical card grids) per the skill's absolute-ban list — this is an operational tool, not a marketing surface.

## Design Principles

- Speed over decoration: every screen optimized for fast data entry/lookup under time pressure, not visual flourish.
- Clarity for non-technical staff: no jargon, obvious affordances, large tap targets.
- Bilingual EN/中文 as first-class, not an afterthought.
- Preserve production backend when redesigning UI: auth, role gating, Supabase sync/realtime, and existing workflows must survive any visual pass (a past mockup shipped decorative-only "live sync" and had to be rebuilt with the real backend).
- Consistency across pages: shared tokens/components across `index.html`, `delivery-dashboard.html`, `orders.html`, `manage-outlets.html`, `manage-users.html` — no page should imply a different data model than its siblings.

## Accessibility & Inclusion

WCAG AA. Body text contrast already fixed to ≥4.5:1 (was ~3.85:1 on `--text3`, corrected 2026-07-07). Maintain that bar on any new/changed text.
