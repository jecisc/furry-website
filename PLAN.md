# Jecisc website plan

A personal website for Jecisc, a red dragon fursona from the north of France. Built with Astro, deployed on GitHub Pages, with a custom domain behind Cloudflare.

## Status

- Done: Astro project scaffolded, copied example code removed, art inventoried and reviewed.
- Art review: 35 images kept, one per variation group. Sky (a different character) is excluded. Web copies are in `public/art/`, and the list is in `src/data/art.json`.
- Not done: the design, the structure, the content, and any deployment.

## Character reference

From the reference sheet and the art:

- Species: red dragon, male presentation not stated.
- Traits (from the reference sheet): sarcastic, stubborn, kind, distracted, lazy.
- Look: dark red body, orange belly and birthmark, silver-white horns and spikes, yellow eyes, orange-brown wings, gold bands on the forearms.
- Outfits: underwear, casual grey hoodie, jeans.
- Recurring character: a white fluffy companion, labelled "YCX" in the stickers, sometimes with a red Santa hat. In the couch scene it has green-tipped hair.

## Site structure (proposed, to confirm)

Scope for now: five pages. Fursuit, Stickers and Projects are left out until the owner asks for them.

| Page | Purpose |
| --- | --- |
| Home | Hero with the watercolour portrait, a one-line intro, a short teaser for each page below |
| Character | Description of Jecisc: species, traits, outfits, colours, a short backstory, and the reference sheet once a better one exists |
| Art | A curated selection of the owner's art, with a credit line on each piece and an age gate on gated images |
| Commissions | What the owner offers, prices, status (open or closed), and how to order |
| Links | Socials and contact |

The full art set (35 images) stays in the manifest. The Art page shows a selection, not everything, unless the owner asks for the full set.

## Art direction (to decide)

Three directions drawn from the art, to be chosen before any styling:

1. **Watercolour gallery.** Cream paper background, a serif heading font, soft shadows, art first. Fits the watercolour portrait and the printed prints.
2. **Sticker pop.** Bold rounded shapes, white sticker outlines, crimson and pink accents. Fits the Telegram stickers and the "Pack by Jecisc" logo.
3. **Dark ember.** Near-black background, red and gold accents, cinematic lighting. Fits the dark-background paintings and the cards.

Working palette, estimated from the reference sheet legend and the logo (to verify against the originals):

- Primary red: about `#5a0f0c` (dark) to `#d0102a` (bright)
- Belly orange: about `#b3660a`
- Eye yellow: about `#e4c435`
- Horn cream: about `#fff8e0`
- Sticker pink: about `#e0126e`

Recommendation: direction 1 as the base, with sticker outlines and the crimson accent borrowed from direction 2. This keeps the art in front and still feels like the character.

## Content plan (deferred)

These depend on the structure and design, so they come after them:

- Place the art on each page. The manifest in `src/data/art.json` already lists the 35 kept images with an `artist` field and a `gate` field.
- Credits: confirm which artist credits are right. The folder names were used as credits.
- Age gates: six images are marked. Three explicit (`cai-explicit`, `belvor-explicit`, `cocoline-sketch`), and three suggestive (`cai-huff`, `belvor-nude`, `lay-couch`). A click-through blur only. The files stay reachable by direct URL on a static host.
- Fursuit photos: none in the folder yet.
- Better reference sheet: the current one (`jeciscRef2.png`) is marked as a bad one.
- Bio, real name, socials and pronouns: still needed from the owner.

## Technical choices (to decide later)

- Styling: plain CSS with design tokens, or Tailwind. Adding Tailwind is a new dependency, so it needs approval first.
- Gallery data: `src/data/art.json` read by the pages at build time.
- Images: shrink the web art (about 42 MB now) before the first commit. WebP or a smaller size would help.
- Originals: `src/assets/Fursona/` is git-ignored, so the large originals stay out of the repo.

## Deployment

1. Create the GitHub repository and enable GitHub Pages (owner action).
2. Add a GitHub Actions workflow that builds with Astro and publishes `dist/`.
3. Buy the domain name (owner action).
4. Set up Cloudflare for the domain and its DNS (owner action).
5. Point the custom domain at GitHub Pages and enable HTTPS.
6. Check the live site on desktop and phone.

## Content needed from the owner

Each page needs content that only the owner can supply:

- Character page: a short description of Jecisc in the owner's words. Confirm the species wording and any backstory details.
- Links page: the social accounts to show, with handles and URLs. Email if wanted.
- Commissions page: what is offered, prices or price ranges, whether commissions are open, the process, and any terms of service.
- Art page: which pieces to show. Suggest a short list (for example 6 to 12) and confirm which are gated.
- Home page: a one-line intro and the real name to use, if any.

## Decisions needed from the owner

1. Art direction: direction 1, 2 or 3, or a mix.
2. Pages: confirm the five pages above. Say if Fursuit, Stickers or Projects should be added.
3. Content listed above, starting with the character description and the socials.
