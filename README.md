# furry-website

My personal website, as Jecisc, a red dragon from the north of France. It is live at https://jecisc.fr.

It is a single page with sections (Character, Links, Art, Stickers, My art), a 404 page, a theme toggle, and a few easter eggs.

## Technology

- [Astro](https://astro.build) 7 builds the site into plain static HTML, CSS and a bit of JavaScript. There is no server and no database.
- Astro is the only dependency. There is no CSS framework and no UI framework: the styles are plain CSS with variables, and the scripts are plain TypeScript.
- The content (texts, links, artworks, artists) lives in JSON files, so most updates do not touch the code.
- GitHub Actions builds the site and publishes it on GitHub Pages at each push on `main`.
- The domain `jecisc.fr` is registered at OVH. Its DNS points to GitHub Pages.

## Commands

The project needs Node.js 22.23.4 or newer. With nvm: `nvm use 22`.

| Command | What it does |
| --- | --- |
| `npm install` | Installs the dependencies, once after cloning or after a change of `package.json` |
| `npm run dev` | Starts the local server at http://localhost:4321, which reloads on each save |
| `npm run build` | Builds the site into `dist/`, the same way the deployment does. Run it before pushing to catch errors. |
| `npm run preview` | Serves the built `dist/` folder, to check the final result |

## Structure

```
.github/workflows/deploy.yml   Build and deployment on GitHub Pages
public/                        Files served as they are
  CNAME                        The custom domain for GitHub Pages
  favicon.ico, favicon.png, apple-touch-icon.png
  preview.jpg                  The image shown when a link to the site is shared (my portrait by Yacrical)
  decor/                       BMO, animated, used as it is
src/
  assets/                      My original files (not in git, see below), with my own art in Art/
  art/                         The web versions of the artworks and stickers (WebP, at most 1200 pixels)
  data/
    content.json               Texts of the page, colours of my palette, my social links, the sticker pack link
    art.json                   The list of artworks and stickers
    artworks.ts                Loads the files listed in art.json, for the pages and components
    artists.json               Artist name → link to their page
  pages/
    index.astro                The home page, with all its sections
    404.astro                  The page shown for unknown addresses
  layouts/Layout.astro         The HTML around every page, and all the scripts of the site
  components/
    SiteHeader.astro           The header with the navigation and the theme toggle
    Gallery.astro              A grid of artworks with credits, the 18+ blur and the zoom
    Spotlight.astro            The big featured artwork at the top of the Art section
    Carousel.astro             One carousel of my own art, with arrows, a counter and the zoom
    ArtistName.astro           An artist name, linked when artists.json has a link
    SocialIcon.astro           The logos of the social networks
    Hoard.astro                The pile of gold at the bottom of the window (generated, see below)
  styles/global.css            All the styles
astro.config.mjs               Astro settings (the address of the site)
PLAN.md                        Old planning notes from the start of the project
```

`src/assets/` is in `.gitignore` on purpose. It holds the original files: they are large, and some show other people's characters that must never be published. Only the web copies in `src/art/` are committed. Never copy anything from `src/assets/Sky/` into `src/art/` or `public/`.

## Common updates

### Change a text

Most texts are in `src/data/content.json`: my intro, tagline, description, traits, outfits, section intros, the 404 texts and the footer note. Some short captions are written directly in `src/pages/index.astro`, like the hero captions and the petting reactions.

Write in first person: the site speaks as me.

### Change a social link

Edit `socials` in `src/data/content.json`. Each entry has:

- `network` and `handle`: shown on the card.
- `url` (optional): with it, the card opens the profile in a new tab. Without it, a click copies the handle.
- `note` (optional): a short note before the action, like "Not very active".

A new network also needs its logo and colour in `src/components/SocialIcon.astro`. The logos come from [Simple Icons](https://simpleicons.org): copy the `path` of the SVG.

### Add an artwork or a sticker

1. Put the original in `src/assets/`.
2. Make the web copy in `src/art/`, at most 1200 pixels on each side, in WebP. This command does it with sharp, which Astro already installs:

   ```bash
   node -e "import('sharp').then(({ default: sharp }) => sharp(process.argv[1]).resize({ width: 1200, height: 1200, fit: 'inside', withoutEnlargement: true }).webp({ quality: 82, alphaQuality: 90 }).toFile(process.argv[2])).then((info) => console.log('width', info.width, 'height', info.height))" src/assets/the-original.png src/art/the-new-piece.webp
   ```

3. Add an entry to `src/data/art.json`:

   ```json
   {
   	"id": "the-new-piece",
   	"file": "the-new-piece.webp",
   	"artist": "Artist name",
   	"section": "art",
   	"gate": "none"
   }
   ```

   - `section` is where the piece goes: `art` for the art others made of me, `stickers`, or one of the carousels of my own art: `embroidery`, `pencil`, `miniatures` or `other`.
   - `gate` is `none`, or a reason to blur the image until the visitor clicks: `explicit` shows "Peek (18+)", and `arachnid` shows "Spider ahead · Show". New reasons and their labels go in `gateLabels` in `src/data/artworks.ts`. The blur is only a curtain: the file can still be opened by its address.
   - `title` (optional) is the caption of a piece of my own art, like "Seahorse". The art others made of me shows its artist instead.
   - `"featured": true` puts the piece in the big spotlight of the Art section. Only one piece should have it.

4. If the artist is new, add their link to `src/data/artists.json`. The name must be written exactly as in `art.json`.

The order of `art.json` is the order on the page. In a carousel of my art, the first piece is the main picture, shown first.

For my own art, `artist` is `Jecisc`. A new carousel needs a line in `myArtCarousels` in `src/pages/index.astro`, with its title and its `section`.

There is nothing else to do for the image sizes. At each build, Astro makes smaller copies of every file in `src/art/` and each page loads the smallest copy that stays sharp, so the grids load about 0.5 to 1.3 MB instead of 3 MB. The zoom opens the full file. The sizes of these copies are in the components that show the images, next to the `<Image>` tags, with a comment on the width the image is shown at.

### Change the portrait at the top

The portrait is picked at random at each visit. The list of ids is `heroChoices` at the top of `src/pages/index.astro`.

### Change the colours

The width of the page on large screens is `--page-width` at the top of `src/styles/global.css`.

The colours of the site are variables at the top of `src/styles/global.css`: `:root` for the dark theme (the default), `:root[data-theme='light']` for the light theme. Changing a variable changes it everywhere.

The four colours of my palette, in the Character section, are in `palette` in `src/data/content.json`.

## The easter eggs

All their code is in the script of `src/layouts/Layout.astro`, each part with a comment on top.

- **The hoard:** a click on the pile of gold adds a coin or a chocolate.
- **The nap:** after 30 seconds without activity, the portrait shows me asleep.
- **The peeker:** the brick sticker peeks from behind the hoard now and then. It runs away from the cursor, drops coins, and leaves after 15 seconds. If caught, it replaces the portrait until the page is reloaded.
- **Petting:** clicks on the portrait send hearts. After 3, 8 and 14 clicks in a row, a sticker reacts. The stickers and captions are `petReactions` in `src/pages/index.astro`.
- **The console:** the developer tools show a hello and the `feedJecisc()` command, which drops chocolates.
- **BMO** dances on the first brick line.
- **Secrets:** the footer counts the easter eggs found. The list is `secrets` in `Layout.astro`. To count a new easter egg, add a line there and call `announceSecret('its-id')` where it happens. The progress is saved in the visitor's browser (`localStorage`).

"Hide decorations" at the bottom right hides the hoard, the peeker and BMO, for visitors who find them distracting. Visitors who ask their system for less motion get fewer animations.

`Hoard.astro` was generated by a script that is not in the repository. Do not edit its coins by hand. To change how the pile behaves, edit the script in `Layout.astro`.

## Deployment

Pushing on `main` deploys the site. GitHub Actions runs `.github/workflows/deploy.yml`: it installs, builds and publishes `dist/` on GitHub Pages. It takes about a minute. The progress is in the Actions tab of the repository, and a failed build leaves the old version online.

The workflow can also be started by hand from the Actions tab, with "Run workflow".

The domain:

- `public/CNAME` holds `jecisc.fr`. Keep it, or GitHub Pages forgets the domain at the next deployment.
- In the repository settings, Pages uses "GitHub Actions" as the source, with the custom domain `jecisc.fr` and "Enforce HTTPS".
- At OVH, the DNS zone of `jecisc.fr` has the four GitHub Pages `A` records (`185.199.108.153` to `185.199.111.153`), the four `AAAA` records (`2606:50c0:8000::153` to `2606:50c0:8003::153`), and `www` as a `CNAME` to `jecisc.github.io.`

## Tips

- If the local server shows something odd after a big change, stop it with Ctrl+C and start `npm run dev` again.
- When `npm run build` fails, the message names the file and the line.
- JSON does not accept a comma after the last item of a list. That is the most common error when editing the data files.
- To test the easter eggs again from zero, run `localStorage.clear()` in the browser console, then reload.
- The secrets, the theme and "Hide decorations" are saved per browser, so a private window shows the site as a new visitor sees it.
