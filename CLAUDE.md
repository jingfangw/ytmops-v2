# CLAUDE.md — ytmops-v2

Internal delivery-tracking and order-management dashboard for You Tiao Mei's central kitchen. Plain HTML + inline JS, no build step, deployed via Cloudflare Workers Builds on push to `main`. See `README.md` for deploy/local-dev details.

## Design Context

Full product/design specs live in `PRODUCT.md` and `DESIGN.md` at the repo root (generated via the [Impeccable](https://impeccable.style) design skill). Read both before making UI changes:

- **Register:** product (design serves the workflow, not marketing).
- **North Star:** "The Kitchen Clipboard" — flat, bordered, mono-labeled, ink-on-paper. See `DESIGN.md` for the full color/typography/component system and Do's/Don'ts.
- Any bigger UI update: build an offline mock first (see vault `Standard Workflows`), get approval, then port to the real files — never edit the live pages directly.
