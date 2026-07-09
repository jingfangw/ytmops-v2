---
name: ytmops-v2
description: Internal delivery-tracking and order-management dashboard for You Tiao Mei's central kitchen.
colors:
  ink: "#1A1A18"
  ink-hover: "#333333"
  paper: "#F4F1EA"
  surface: "#FFFFFF"
  surface-tint: "#ECEADE"
  border: "#D8D4C6"
  text-secondary: "#4A4A3F"
  text-tertiary: "#6B6B60"
  signal-orange: "#D4522A"
  # State signal trios — base (text/icon), tint (fill), line (border). Used on tags, pills, tint backgrounds.
  state-green: "#2E7D32"      # internal / filled / ok  (aka state-filled-green)
  state-green-tint: "#EAF1EA"
  state-green-line: "#B9D2BA"
  state-amber: "#A8620B"      # external / pending / not-yet-ordered (a pending state, not an error)
  state-amber-tint: "#F4EBD9"
  state-amber-line: "#E1C08A"
  state-red: "#C0392B"        # danger / error / failure (aka signal-red)
  state-red-tint: "#F6E7E5"
  state-red-line: "#E3B7B2"
  whatsapp: "#1E8F4E"         # platform-recognition token only (WhatsApp send buttons)
  whatsapp-hover: "#17703D"
motion:
  ease: "cubic-bezier(0.22, 1, 0.36, 1)"   # shared ease-out for 150–250ms transitions
  focus-ring: "0 0 0 3px rgba(26,26,24,.16)"  # one shared focus-visible ring on every control
typography:
  body:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: "normal"
  label:
    fontFamily: "ui-monospace, 'SF Mono', 'Cascadia Mono', Menlo, monospace"
    fontSize: "11px"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.06em"
  title:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif"
    fontSize: "18px"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "normal"
rounded:
  sm: "4px"
  md: "8px"
  lg: "12px"
  pill: "999px"
  circle: "50%"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "36px"
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "#FFFFFF"
    rounded: "{rounded.md}"
    padding: "12px"
  button-primary-hover:
    backgroundColor: "{colors.ink-hover}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.text-secondary}"
    rounded: "{rounded.md}"
    padding: "8px 14px"
  chip:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-secondary}"
    rounded: "{rounded.pill}"
    padding: "7px 13px"
  chip-active:
    backgroundColor: "{colors.ink}"
    textColor: "#FFFFFF"
    rounded: "{rounded.pill}"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "20px 22px"
  input:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "10px 14px"
---

# Design System: ytmops-v2

## 1. Overview

**Creative North Star: "The Kitchen Clipboard"**

A digitized clipboard, not a startup dashboard: dense, bordered, monospace-labeled, built to be scanned fast under time pressure by kitchen staff mid-shift, not admired. The whole system reads as a paper form that happens to sync in real time — flat surfaces, hairline borders, uppercase mono micro-labels doing the job a printed form's field labels would, color reserved for state (filled vs. not, error vs. ok) rather than decoration. It explicitly rejects the generic AI-SaaS look: no gradient hero metrics, no glassmorphism, no eyebrow labels, no eyeball-catching flourishes — this tool serves an operational workflow (per PRODUCT.md, "design serves the product").

**Key Characteristics:**
- Warm-neutral paper background with near-black ink text and accents — a physical, printed-form feel, not a cool SaaS-app feel.
- Mono labels everywhere secondary/meta info appears (field labels, timestamps, indices, badges) — a distinct "form field" register separate from the sans body/UI text.
- Flat by default; shadow appears only as a hover lift or a modal's real elevation, never decoratively.
- Color is a state signal (filled/unfilled, error, role badge), not a palette exercise — the accent is used sparingly and functionally.

## 2. Colors

A warm, near-monochrome ink-on-paper palette with two functional signal colors layered on top for state, not decoration.

### Primary
- **Ink** (#1A1A18): The one true accent. Primary buttons, active chip state, role badges, focus borders. Near-black rather than a hue — the "brand color" here is confidence and contrast, not a saturated tone.

### Secondary
- **Signal Orange** (#D4522A): A secondary, sparingly-used highlight (`--accent2` / `--orange` in code) for callouts that need to stand apart from the ink/paper base without reaching for red's error connotation.

### Neutral
- **Paper** (#F4F1EA): Page background. A warm cream — deliberate and committed (this is existing, shipped brand identity, not a fresh-project default to second-guess).
- **Surface** (#FFFFFF): Cards, modals, inputs at rest — the "raised paper" layer above the background.
- **Surface Tint** (#ECEADE): A second, slightly warmer neutral for subtle section separation (e.g. `--surface2`).
- **Border** (#D8D4C6): Hairline dividers and card/input borders throughout — the system's only structural line color.
- **Text Secondary** (#4A4A3F): Secondary copy, field labels, descriptions.
- **Text Tertiary** (#6B6B60): The most muted text role — timestamps, index numbers. Fixed to ≥4.5:1 contrast against Paper on 2026-07-07; treat that ratio as a floor, not a starting point, for any new use of this token.

### Named Rules
**The Ink-Only Accent Rule.** There is one true accent color (Ink, near-black) used for primary actions and active state. Signal Orange and Signal Red exist only for specific semantic meaning (secondary highlight, error) — never as decorative alternates to Ink.

**The State-Color Rule.** Color outside the neutral ramp appears only to signal state (a filled delivery row, an error message, an active filter chip) — never as a decorative palette choice. If a color isn't communicating a state, it shouldn't be there.

### State Signal Palette (reconciled 2026-07-09)

Before this pass, three feature surfaces (lock banner, WhatsApp button, order/error tags) each shipped their own undocumented mini-palette, radii drifted off-scale, and `--green` was mistakenly set to grey `#333`. The drift is now reconciled into **three state trios** — each a base (text/icon), a tint (fill background), and a line (border) — so every stateful tag, pill, and tinted panel across all five pages draws from the same source:

| State | Meaning | Base | Tint (fill) | Line (border) |
| --- | --- | --- | --- | --- |
| **Green** | internal / filled / ok | `#2E7D32` | `#EAF1EA` | `#B9D2BA` |
| **Amber** | external / pending / not-yet-ordered | `#A8620B` | `#F4EBD9` | `#E1C08A` |
| **Red** | danger / error / failure | `#C0392B` | `#F6E7E5` | `#E3B7B2` |

Amber is deliberately a **pending** signal, not an error — "Not yet ordered" was recolored red→amber (red now reserved for real failures). These trios are the only sanctioned use of hue outside the neutral ramp; they always carry state meaning per the State-Color Rule.

**Platform token.** `--whatsapp` (#1E8F4E, hover #17703D) is the single exception to the Ink-Only Accent Rule: it exists purely for WhatsApp-send buttons where users recognise the platform green. It is a recognition affordance, not a decorative accent — never reuse it for non-WhatsApp UI.

**Shared focus + motion.** One `--focus-ring` (`0 0 0 3px rgba(26,26,24,.16)`) sits on every interactive control's `:focus-visible` — no per-page focus styling. Transitions use one shared `--ease` (`cubic-bezier(0.22,1,0.36,1)`) at 150–250ms, with a `prefers-reduced-motion` fallback.

## 3. Typography

**Body Font:** -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif
**Label/Mono Font:** ui-monospace, 'SF Mono', 'Cascadia Mono', Menlo, monospace
**Bilingual:** Noto Sans SC (bundled `NotoSansSC-Regular.ttf`) for Chinese text alongside the system sans.

**Character:** A quiet system sans for reading, paired with a mono face for anything that behaves like a form field or a stamp — labels, timestamps, indices, badges. The pairing itself communicates "this is data, that is a label" without extra chrome.

### Hierarchy
- **Title** (700, 18px, 1.3): Page/section headers. Restrained — this system has no hero/display scale; the largest text on any screen is a page title.
- **Body** (500, 14px, 1.5): Primary reading text — form values, card content, buttons.
- **Label** (600, 11px, 1.4, letter-spacing 0.06em, uppercase, mono): Field labels, chip text, badges, meta captions — the system's most distinctive typographic voice.
- **Micro** (500, 9–10px): Index numbers, tiny badges — smallest text in the system, used sparingly.

### Named Rules
**The Mono-Label Rule.** Anything functioning as a form field label, a chip, a badge, or a timestamp is set in mono, uppercase, letter-spaced 0.06em — never the body sans. This is the system's signature typographic tell; don't blur it by setting labels in body sans "for consistency."

## 4. Elevation

Flat by default — nearly every surface (cards, inputs, buttons) is a 1px `border` plus a neutral background, not a shadow. Shadow is reserved for two specific, non-decorative moments: a hover lift on interactive cards, and true overlay elevation for modals/dialogs.

### Shadow Vocabulary
- **Hover Lift** (`box-shadow: 0 2px 12px rgba(0,0,0,0.08)`): Interactive cards (e.g. the home-screen app launcher) on hover, paired with a border-color shift to Ink.
- **Focus Ring** (`box-shadow: 0 0 0 2px rgba(26,26,24,.08)`): Focus-visible state on interactive elements — a soft ink-tinted ring, not a hard outline.
- **Modal Overlay** (`box-shadow: 0 20px 60px rgba(0,0,0,0.15)`): Dialogs and modals — the one place real, heavy elevation is used, because it's genuinely floating above the page.

### Named Rules
**The Flat-Until-It-Floats Rule.** Shadows only appear on things that are actually elevated (a modal) or actively responding to interaction (a hover lift, a focus ring). A static card at rest never has a shadow — its border does the work.

## 5. Components

### Buttons
- **Shape:** 8px radius (`--radius`).
- **Primary** (`.btn-login`): Solid Ink background, white text, 700 weight, full-width in forms, 12px padding.
- **Ghost** (`.btn`, `.btn-ghost`): Transparent background, Border-colored outline, Text Secondary label; the default button style across nav/toolbar actions.
- **Hover / Focus:** Ghost buttons shift border and text color to Ink on hover; primary buttons darken to `--accent-light` (#333333). Transitions are short (0.15s) color/border fades only — no transform or shadow motion on buttons.

### Chips
- **Style:** Pill-shaped (99px radius), mono 11px text, Surface background with Border outline at rest.
- **State:** Active/selected (`.chip.on`) inverts to solid Ink background with white text — the same Ink-as-active-signal logic as buttons and badges.

### Cards / Containers
- **Corner Style:** 12px radius (`--radius-lg`) for cards (login card, home launcher cards); plain 12px for list rows.
- **Background:** Surface white on Paper background — the one consistent "raised paper" layer.
- **Shadow Strategy:** Flat at rest; Hover Lift shadow only on interactive launcher cards (see Elevation).
- **Border:** 1px Border-color on all cards. List rows additionally carry a 3px left border used as a **functional state indicator** (e.g. green when a delivery row is "filled") — this is the one legitimate use of a colored side-stripe in the system: a semantic state flag, not a decorative accent, and should stay that way rather than spreading to non-stateful cards.
- **Internal Padding:** 20–22px for cards; 11–12px for compact list rows.

### Inputs / Fields
- **Style:** Paper-colored background at rest (blends into the form), Border-color outline, 8px radius.
- **Focus:** Background switches to Surface white and border switches to Ink — the field visually "lifts off" the page when active.
- **Labels:** Always the mono Label style (see Typography), positioned above the field.

### Navigation
- Minimal top bar: wordmark/logo, role badge (small Ink-filled pill, uppercase mono, white text), ghost-styled action links (Manage Outlets, Manage Users, Sign out). No persistent side nav; the Home screen is the hub, reached via a circular icon button.

## 6. Do's and Don'ts

### Do:
- **Do** keep the accent to Ink alone for primary/active state; reserve Signal Orange and Signal Red for their specific semantic roles only.
- **Do** set every label, badge, chip, and timestamp in the mono Label style (11px, uppercase, 0.06em tracking) — this is the system's signature, not an incidental choice.
- **Do** keep surfaces flat (border + neutral background) at rest; shadow only for genuine elevation (modals) or active interaction (hover, focus).
- **Do** maintain ≥4.5:1 contrast on Text Tertiary and any body copy against Paper — this was a real, fixed accessibility bug (2026-07-07); don't reintroduce a lighter gray "for elegance."
- **Do** treat the list-row left-border color as a state signal only (filled/unfilled, etc.), never as generic card decoration.

### Don't:
- **Don't** add gradient hero metrics, glassmorphism, or eyebrow labels — this is an operational tool, not a marketing surface (per PRODUCT.md).
- **Don't** introduce a second saturated "brand" accent alongside Ink; the system is intentionally near-monochrome plus functional signal colors.
- **Don't** use `border-left`/`border-right` as a colored decorative stripe on non-stateful cards or callouts — the one existing side-stripe (delivery-row state) is a deliberate exception, not a pattern to extend.
- **Don't** set field labels, chips, or badges in the body sans font "for consistency" — mono is the label register in this system.
- **Don't** add drop shadows to cards or buttons at rest; they should read as flat, bordered paper, not floating UI chrome.
