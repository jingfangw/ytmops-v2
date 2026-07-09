---
target: delivery-dashboard.html
total_score: 29
p0_count: 0
p1_count: 2
timestamp: 2026-07-08T08-19-57Z
slug: delivery-dashboard-html
---
Method: dual-agent (A: a50aaeb4d48db57b3 · B: a668b821645b4dc29)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | `--green: #333333` is a dark grey, not green — the "live" pulse dot and "✓ Copied!" text don't actually render green |
| 2 | Match System / Real World | 4 | Trays/baskets/pandan terminology, WhatsApp-style generated messages, mono form-field labels genuinely match kitchen-staff mental model |
| 3 | User Control and Freedom | 3 | Locking is reversible, destructive actions gated by confirm; no true undo after delete |
| 4 | Consistency and Standards | 3 | Core button/chip/card system is consistent, but the lock-banner and WhatsApp button break the page's own "Ink + two signal colors" rule |
| 5 | Error Prevention | 3 | Quantity inputs clamped, confirms on clear/lock/unlock/delete, disabled state for non-editable inputs |
| 6 | Recognition Rather Than Recall | 4 | Filter chips show live counts, left-border state color, always-visible totals bar |
| 7 | Flexibility and Efficiency | 3 | `onfocus="this.select()"` speeds re-entry; no bulk edit or keyboard shortcuts |
| 8 | Aesthetic and Minimalist Design | 3 | Flat-by-default followed everywhere except the lock-banner's off-system palette |
| 9 | Error Recovery | 2 | Raw Supabase error text (`'Error: ' + error.message`) surfaced to non-technical staff, English only |
| 10 | Help and Documentation | 1 | No onboarding/tooltips anywhere — likely intentional but zero scaffolding for a first shift |
| **Total** | | **29/40** | **Good** |

## Anti-Patterns Verdict

**Start here.** Does this look AI-generated? **No.** Both assessments independently agree this reads as a deliberately restrained, domain-built tool, not templated AI-SaaS output.

**LLM assessment:** Zero gradients, zero glassmorphism, no hero-metric cards, no decorative eyebrow labels. The one instance that *does* lean toward genre ("AI made this") is `.lock-icon` — a solid-ink circle with a centered 🔒 emoji — the generic "icon-in-a-colored-circle" SaaS motif, combined with emoji-forward generated WhatsApp copy that sits a little oddly next to the stated "fast, no-nonsense, reliable" personality. Mild, not a verdict-changer.

**Deterministic scan:** 25 findings, exit code 2 (findings-present). Breakdown: 1 `side-tab` warning, 19 `design-system-color` advisories, 5 `design-system-radius` advisories.

**Cross-validation — where the two assessments agree:** The detector's 8 undocumented-color hits at lines 105/107 (`#25D366`, `#1fad54`) and 145/148/149/150 (`#EAF3DE`, `#97C459`, `#27500A`, `#3B6D11`) are the *exact same* WhatsApp-button and lock-banner colors Assessment A flagged qualitatively as "color-system drift" (P2/P3 below) — the detector supplies the precise line numbers and hex values backing that call.

**Where the detector caught something the LLM missed:** Two more undocumented-color clusters neither assessment's prose called out individually: lines 78-79 (`#e0b0b0`, `#fee2e2` — a red/error tag treatment) and lines 94-95 (`#E4F0E4`, `#E7C583`, `#C77D0A`, `#FBEFD9` — an order-status badge palette). Both are real DESIGN.md gaps: order/error states have their own undocumented mini-palettes beyond the three colors DESIGN.md currently names. Also 5 `border-radius` values (6px, 40px, 9px) fall outside the documented rounded scale (4/8/12/99/50%) — DESIGN.md's rounded scale was under-specified at generation time, not a code problem.

**False positive (documented and intentional, not drift):** The `side-tab` warning on line 89 (`border-left: 3px solid var(--border)`) is exactly the delivery-row state indicator that DESIGN.md explicitly carves out as a sanctioned exception ("the one legitimate use of a colored side-stripe in the system"). The detector can't see that context — this is expected, not a bug in the detector.

## Overall Impression

A genuinely well-executed, restrained internal tool — the design system in DESIGN.md isn't just aspirational, it's visibly followed on the page that matters most. The gap isn't the core system; it's three places where new feature work (lock banner, WhatsApp share button, order/error tags) shipped its own small undocumented palette instead of extending the existing one, plus one real safety/inclusivity gap: bilingual coverage silently drops out at the single most destructive action in the app (permanent delete).

## What's Working

1. **Real design-system discipline, not just a stated one** — mono-label rule, flat cards, Ink-only accent are followed consistently, not just documented.
2. **The generated WhatsApp-message feature is genuine domain-fit** — bilingual, emoji-formatted, one-tap-copy text blocks that mirror the real paper-dispatch workflow being replaced, not decorative scaffolding.
3. **Real speed optimizations for a shared, time-pressured device** — `onfocus="this.select()"` on quantity fields, disabled/dimmed read-only inputs, live filter counts, date-scoped realtime guards that skip pointless re-renders.

## Priority Issues

**[P1] Bilingual coverage drops out at the single irreversible action.**
- **Why it matters:** PRODUCT.md states bilingual EN/中文 is "first-class, not an afterthought" — yet `deleteDay()`'s confirm text and the entire History-tab chrome (`Edit`, `Delete`, `Loading...`, `No dispatch history yet.`) are hardcoded English, unlike every other confirm dialog in the file.
- **Fix:** Route `deleteDay`/`renderHistory` strings through the same `T[lang]` object already used by `clearAll`/`lockDay`.
- **Suggested command:** `/impeccable harden`

**[P1] Raw backend error strings shown to non-technical staff.**
- **Why it matters:** `lockDay()`/`unlockDay()` surface Supabase's raw driver text via `toast('Error: ' + error.message, ...)`, English-only, mid-shift — directly against PRODUCT.md's "no jargon" principle, and inconsistent with every other hand-written error path in the file.
- **Fix:** Bilingual generic fallback copy; log the real error to console instead.
- **Suggested command:** `/impeccable clarify`

**[P2] Undocumented color drift across three feature surfaces (confirmed by both assessments + exact line numbers).**
- **Why it matters:** The lock-banner (`#EAF3DE`/`#97C459`/`#27500A`/`#3B6D11`, lines 145-150), the WhatsApp button (`#25D366`/`#1fad54`, lines 105/107), and order/error tags (`#e0b0b0`/`#fee2e2` lines 78-79; `#E4F0E4`/`#E7C583`/`#C77D0A`/`#FBEFD9` lines 94-95) each introduce their own palette, undermining DESIGN.md's Ink-Only Accent Rule and State-Color Rule — and the lock-banner's text-on-mint contrast was never run through the 2026-07-07 AA fix.
- **Fix:** Repoint each to the existing token system (e.g. `state-filled-green` for success/lock states); either formally document the WhatsApp-brand green as a sanctioned platform-recognition exception or restyle it to the existing button system; verify contrast on any surviving custom color.
- **Suggested command:** `/impeccable colorize`

**[P2] Toast has no ARIA live region — every transient status message is silent to screen readers.**
- **Why it matters:** `#toast` is the app's only channel for cleared/copied/locked/unlocked/error feedback and carries no `aria-live`/`role="status"` — a structural accessibility gap against the documented WCAG-AA bar, not a contrast tweak.
- **Fix:** Add `role="status" aria-live="polite"` to `#toast`.
- **Suggested command:** `/impeccable harden`

**[P2] Undocumented border-radius values (6px, 40px, 9px) outside the DESIGN.md rounded scale.**
- **Why it matters:** Minor but real drift signal — either these are intentional new shapes that should be added to the token scale, or accidental one-offs.
- **Fix:** Reconcile against `rounded.sm/md/lg/pill/circle`; add any genuinely new step to DESIGN.md rather than leaving it undocumented.
- **Suggested command:** `/impeccable document`

**[P3] A third saturated accent (WhatsApp green) and emoji-forward generated copy vs. the "fast, no-nonsense, reliable" personality.**
- **Why it matters:** Minor tonal mismatch between the restrained visual system and the friendlier copy voice of generated messages and the lock-icon motif.
- **Fix:** Either formally sanction the WhatsApp-green exception in DESIGN.md, or restyle; light copy pass on emoji density.
- **Suggested command:** `/impeccable quieter`

## Persona Red Flags

**Sam (Accessibility):** Toast has no `aria-live` (see P2). Focus-ring treatment is inconsistent — `.qty`, `.tab`, `.home-icon-btn` get the documented Focus Ring, but `.chip`, `.msg-btn`, `.clear-btn`, `.lock-btn`, `.unlock-btn` define no focus style at all, so keyboard-tab styling changes unpredictably across the page. The lock-banner's new green-on-mint text was never checked against the documented contrast bar.

**Riley (Stress-Tester):** `upsertDelivery` does read-then-write with no version check — two staff editing the same outlet/date on two devices can have the local cache desync from a realtime push mid-edit. Rapid date-switching triggers overlapping async chains with no request-token guard, so a stale response can land after a newer one.

**Mei, the Shared-Tablet Kitchen Operator** (project-specific, derived from PRODUCT.md's "kitchen/ops staff... on shared devices... time-pressured, non-technical"): No session timeout or auto-logout exists anywhere — once one person signs in on the shared tablet, every action for the rest of the shift is attributed to that login, not whoever is physically at the tablet. Switching users requires full email+password re-entry with no quick-switch, so time-pressured staff are likely to just not switch accounts.

## Minor Observations

- `document.title` on tab switch always uses the English words "Tracker"/"History" regardless of language.
- Visibility toggling mixes inline `style.display` mutation with class-toggling (`.overlay.open`, `.chip.on`) — a code-hygiene inconsistency, not a user-facing bug.
- `.row-idx` numbers are computed against the unfiltered outlet list, so filtered views show non-contiguous numbers (1, 4, 7…) — likely intentional stable numbering, worth confirming staff don't read it as missing rows.
- `.msg-btn` has no keyboard focus-visible style.

## Questions to Consider

1. If "the whole system reads as a paper form that happens to sync in real time," why does permanently deleting a day's records — the single most emotionally loaded action in the app — drop out of that voice into raw, untranslated English?
2. The design system is precise about *when* color is allowed, yet the banner a manager is most likely to glance at anxiously (day-locked state) is exactly where that rule was abandoned for a fresh palette — did it ship before the rule existed and never get revisited?
3. This app runs on a shared tablet across a shift with no session timeout and no quick-switch — should `locked_by` really be trusted as "who did this," or is it actually just "who logged in that morning"?
