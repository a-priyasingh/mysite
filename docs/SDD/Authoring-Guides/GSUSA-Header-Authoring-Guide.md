# GSUSA Header — Content Author Guide

This guide explains how to author and manage the site **Header** in Document Authoring (DA). It is written for content authors — no coding required. It covers what you can edit, where to edit it, and the rules to follow so the header renders correctly.

---

## 1. What the Header Includes

The header appears at the top of every page and contains:

- **Offer / promo bar** (optional) — a dismissible colored bar above the navigation
- **Logo** — links to the homepage
- **For Everyone / For Leaders toggle** — a fixed control (not authored)
- **Main navigation (mega menu)** — the product categories
- **Curated static links** (optional) — extra links inside a category menu (e.g., Gift Guide, Sale)
- **Mega-menu promo image** (optional) — a promotional panel on the right of a category menu
- **Tools** — search, wishlist, mini cart, and sign in/account (added automatically)

**Important:** Most of the header is dynamic. The **product category menu is generated automatically from the commerce catalog** — you do **not** hand-type the category list. You author the *extras*: the offer bar, curated static links, and promo panels.

---

## 2. Where the Header Is Authored

The header is authored **once** in a single document and appears site-wide.

| Item | Where it is authored |
|------|----------------------|
| Header content (offer bar, brand/logo, nav sections) | The **`/nav`** document |
| Mega-menu promo panels | A separate **fragment** document per menu (e.g., `/fragments/uniforms-promo`) |
| Curated static links & promo mapping | **Static Nav** blocks inside the `/nav` document |

You do not edit the header on individual pages — edit `/nav` and publish, and it updates everywhere.

---

## 3. The Offer / Promo Bar (optional)

A colored promotional bar shown above the navigation. To add it, put this content as a section in the `/nav` document, **in this order**:

1. **Message paragraph** — must include the text ` – Use Code:` so it displays correctly on mobile.
   Example: `Free Gift with purchase of a Uniform – Use Code: FREEPURPLEBAG`
2. **Redeem link** (first link) — e.g., `[Redeem Now](/sale)`
3. **Terms link** (second link) — e.g., `[Terms & Conditions](/terms)`

Rules & behavior:
- The sparkle icon and the close (X) button are added automatically — you don't add them.
- A shopper can dismiss the bar; it stays hidden for the rest of their session.
- To remove the offer bar, delete this section from `/nav`.
- On mobile the message splits into rows automatically (that's why the ` – Use Code:` text is required).

---

## 4. The Logo / Brand

In the brand section of `/nav`, provide a **home link** (pointing to `/`). You may also add a logo image.

- The system automatically shows the official Girl Scouts logo, linked to the homepage.
- You mainly need to make sure the home link is present.

---

## 5. Main Navigation (the Category Menu)

- The top-level menu items and their dropdown categories are **pulled automatically from the commerce catalog** — you do not type them in.
- Categories appear in the order set by merchandising in commerce.
- If the catalog is temporarily unavailable, the menu you authored in `/nav` is used as a fallback.

**What this means for you:** to change which categories appear or their order, that is managed in the **commerce catalog** (merchandising), not in DA.

---

## 6. Adding Curated Static Links to a Category Menu (optional)

You can add extra, hand-picked links (that are not catalog categories — e.g., **Gift Guide**, **Sale**) inside an existing category's dropdown. These are authored using a **Static Nav** block in the `/nav` document.

Add a **Static Nav** block (a key/value table) like this:

| Static Nav | |
|---|---|
| Category | /new |
| Group Title | Featured |
| Links | [Gift Guide](/gift-guide) [Sale](/sale) [New Arrivals](/new-arrivals) |
| Promo | /fragments/promo-card |

Field guide:

| Field | Required? | What to enter |
|-------|-----------|---------------|
| **Category** | Yes | The path of the top-level menu you want to add links to (e.g., `/new`). It must match the category's path exactly. |
| **Group Title** | Optional | A heading shown above your links (e.g., "Featured"). Plain text. |
| **Links** | Optional | One or more links; each becomes a row under the group. |
| **Promo** | Optional | The path to a promo fragment for this menu's promo panel (see Section 7). |

Rules & behavior:
- Add **one Static Nav block per group**. You can add several blocks for several groups/categories.
- A block can be **links only**, **promo only** (just Category + Promo), or **both**.
- If the **Category** you enter doesn't match any real menu, that block is **ignored** (nothing breaks, but your links won't show — double-check the path).
- Your curated group appears in both the desktop mega menu and the mobile menu automatically.
- The Static Nav block **never shows as page content** — it's only instructions for the header.

---

## 7. Mega-Menu Promo Panel (optional)

Each category dropdown can show a promotional panel on the right (e.g., a "New Arrivals" banner). This is a **two-step** setup:

**Step 1 — Point the menu at a promo fragment.** In `/nav`, add a Static Nav block with the **Category** and a **Promo** path (promo-only is fine):

| Static Nav | |
|---|---|
| Category | /uniforms |
| Promo | /fragments/uniforms-promo |

**Step 2 — Author the promo fragment.** Create the fragment document (e.g., `/fragments/uniforms-promo`) like any normal DA page — add an image, heading, and a link (or offer cards, etc.). The header sizes and places it automatically on the right side of that menu (desktop only).

Rules & behavior:
- A menu with **no Promo** simply shows its category columns (no error).
- The promo panel shows on **desktop only**; it's hidden in the mobile menu.
- It loads only when a shopper opens that menu, so it doesn't slow the page.

---

## 8. Account / Sign In

For the combined sign-in/sign-up experience to work, the `/nav` document must include:

1. A top-level nav item whose label contains the word **Account**.
2. A submenu under Account whose **last item** is the sign-in trigger (author it as a row, e.g., **Combined Auth**).

The search, wishlist, mini cart, and sign-in controls are added automatically — you don't author those buttons.

---

## 9. What You Do NOT Author

These are built automatically and should not be added by hand:

- Search box, wishlist button, mini cart, and the account/sign-in controls
- The "For Everyone / For Leaders" toggle
- The sparkle and close icons on the offer bar
- The Girl Scouts logo image and the category menu itself (from the catalog)

---

## 10. Quick Reference — Author Checklist

| Task | Where | Required fields |
|------|-------|-----------------|
| Add/edit offer bar | `/nav` section | Message (with ` – Use Code:`), Redeem link, Terms link |
| Set the logo/home link | `/nav` brand section | Home link to `/` |
| Add curated links to a menu | Static Nav block in `/nav` | Category (+ Links) |
| Add a promo panel to a menu | Static Nav block (Category + Promo) + a fragment | Category, Promo path, fragment content |
| Enable Account sign-in | `/nav` menu | An "Account" item with a sign-in submenu row |

---

## 11. Tips & Troubleshooting

- **My curated links don't appear.** Check that the **Category** path in your Static Nav block exactly matches the menu's path (e.g., `/new`). Mismatched categories are ignored.
- **My promo panel doesn't show.** Confirm the **Promo** path points to an existing fragment, and remember the panel is desktop-only.
- **The offer bar looks wrong on mobile.** Make sure the message contains ` – Use Code:` — the system uses that to format the mobile layout.
- **I changed categories but nothing updated.** The category menu comes from the commerce catalog; category changes are made in merchandising, not in DA.
- **Always preview** your `/nav` (and any promo fragments) before publishing — preview reflects exactly what will go live site-wide.

---

*This is an author-facing guide. Technical implementation details (JS files, events, config flags) are documented separately in the Header block README for developers.*
