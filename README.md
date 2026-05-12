# You Tiao Mei Web App

Internal web app for **You Tiao Mei Manufacturing Pte. Ltd.** — delivery tracking and order management for the central kitchen at FoodXchange @ Admiralty.

---

## What's inside

- **`index.html`** — Login page and home / app launcher
- **`delivery-dashboard.html`** — Daily delivery tracker by outlet (trays, baskets, cold items)
- **`orders.html`** — Outlet order status and picking lists, synced from Orderspace
- **`fonts/NotoSansSC-Regular.ttf`** — Chinese font for bilingual UI

---

## Tech stack

| Layer | Service |
|---|---|
| Hosting | Cloudflare Pages (static) |
| Auth + Database | Supabase |
| Frontend | Plain HTML + inline JavaScript (no build step) |
| Source control | GitHub |

No `npm install`, no bundler, no framework. Just HTML files that the browser runs.

---

## Making changes

1. Edit the HTML file on GitHub (pencil icon) or locally on your computer.
2. Commit the change.
3. Cloudflare Pages auto-deploys in ~20 seconds.

To test before going live, push to a new branch — Cloudflare will give it its own preview URL (e.g. `test.you-tiao-mei.pages.dev`) without touching production.

---

## Local development

To preview changes on your own computer before pushing:

- **Easiest:** double-click any `.html` file to open it in your browser. Most things will work.
- **Better (recommended for Supabase auth):** open a terminal in the project folder and run:

  ```
  python3 -m http.server 8000
  ```

  Then visit `http://localhost:8000` in your browser. This avoids browser security issues with `file://` URLs.

---

## Configuration

Supabase connection details are inline at the top of each HTML file:

```javascript
const SUPA_URL = 'https://hnfgqjlbfrhqsuvtahvp.supabase.co';
const SUPA_KEY = '...';   // anon public key — safe to expose
```

The `anon` key is designed to be public. **Security is enforced by Row Level Security (RLS) policies inside Supabase**, not by hiding the key. Confirm RLS is enabled on every table in the Supabase dashboard → Authentication → Policies.

---

## Supabase tables used

- **`user_roles`** — maps user email to role (`admin`, `editor`, etc.). Used by `index.html` after login.
- *(Add other tables here as the app grows — deliveries, orders, outlets, etc.)*

---

## Languages

The UI supports English and 中文 (Simplified Chinese). The preference is saved in `localStorage` as `ytm_lang`.

---

## Contact

Maintained by Jing Fang — You Tiao Mei Manufacturing Pte. Ltd.
8A Admiralty Street #05-18, FoodXchange @ Admiralty, Singapore 757437
