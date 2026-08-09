# Personal Site

Source for [ciaranflanagan.me](https://ciaranflanagan.me), a single-page personal site: About, Work, Projects, Photos.

React + Vite + Tailwind CSS, with framer-motion for scroll-in transitions.

## Development

```bash
npm install
npm run dev      # local dev server
npm run build    # production build
npm run lint      # eslint
```

## Content

All copy lives in `src/constants/index.js`; nothing user-facing is hardcoded in components. Experience and project descriptions are kept in sync with `~/resume/resume.tex`, so update both when either changes.

`public/resume.pdf` is a manually-copied snapshot of the résumé PDF, served at `/resume.pdf`. Re-copy it after resume updates.

## Photos

**To add a photo:** drop the file into `src/assets/photos/<group>/`. That's it. The folder name is the group, so a new folder becomes a new group on the site automatically.

```
src/assets/photos/
  headshot.jpg        always the front photo, never shuffled
  ireland/
  sicily/
  arkansas/
  teaching/
```

**To caption one:** add a line to `PHOTO_CAPTIONS` in `src/constants/index.js`, keyed by `"<folder>/<filename>"`. Captions are optional and uncaptioned photos still render.

**To rename or reorder a group:** `GROUP_LABELS` sets the display name, `GROUP_ORDER` sets the position. Neither is required. A group missing from both gets a title-cased name and sorts to the end.

`headshot.jpg` lives at the top level rather than in a group. It is the fixed front photo in the hero fan and is never shuffled away; the photos behind it are drawn at random, one per group, redrawn on load and on Shuffle.

Photos are resized before committing. `sips -Z 1200 in.jpg --out out.jpg -s formatOptions 55` is what the current set was built with.

## Spotify now-playing

The footer shows the current or last-played track. It renders nothing at all until configured, so an unset or broken integration leaves no trace.

Setup, once:

1. Create an app at [developer.spotify.com/dashboard](https://developer.spotify.com/dashboard). Development Mode requires Spotify Premium as of February 2026.
2. Add `http://127.0.0.1:8888/callback` as a Redirect URI.
3. Generate a refresh token:
   ```bash
   SPOTIFY_CLIENT_ID=... SPOTIFY_CLIENT_SECRET=... node scripts/spotify-token.mjs
   ```
4. Put `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET`, and `SPOTIFY_REFRESH_TOKEN` in Netlify, under Site settings then Environment variables.

The refresh token must never reach the browser, which is why this goes through `netlify/functions/now-playing.mjs` rather than being fetched client-side. Note that `npm run dev` does not serve Netlify functions; use `netlify dev` to test it locally.

## Deploying

The site is on Netlify at [ciaranflanagan.me](https://ciaranflanagan.me), built from the `master` branch of this repo. Push to `master` and Netlify rebuilds; there is nothing to upload by hand.

`netlify.toml` holds the build command, publish directory, functions directory, a pinned Node version, and cache headers. It is checked in, so it overrides whatever is configured in the Netlify dashboard.

**Photos and the résumé ship through git.** They are not uploaded separately. `src/assets/photos/**` is bundled by Vite at build time, and `public/resume.pdf` is copied verbatim into `dist`. If a photo is not committed, it does not exist on the live site.

Updating the résumé:

```bash
npm run sync:resume   # copies ~/resume/resume.pdf into public/
git add public/resume.pdf && git commit
```

`/resume.pdf` is served with `must-revalidate` because it is overwritten at the same URL; hashed assets under `/assets/*` are cached for a year since their names change every build.

The Spotify function needs its three environment variables set in the Netlify dashboard. Until they are, the endpoint reports itself unconfigured and the footer renders nothing, so deploying without them is safe.

## Design and copy notes

- **Palette** is Galway GAA maroon on warm paper, carried over from the first version of this site. Tokens are in `tailwind.config.js` (`maroon`, `ink`, `paper`, `sand`).
- **Type** is Inter throughout, at ordinary sizes. Earlier drafts used a display serif at large scale and read as pretentious.
- **No em dashes** anywhere in site copy. Use commas, colons, or a second sentence.
- **Copy states plain facts only.** Do not invent quirks, jokes, or self-deprecation, and do not imply expertise that isn't there. An earlier draft claimed a feel for genomic pipelines and captioned a photo "I talk with my hands"; neither was true.
- **Photos keep their natural aspect ratio** in the wall. A uniform crop flattened the variety in the album.
- The wall uses a grid rather than CSS columns, because columns balance vertically and strand the last photo of a short group beside empty space.
- `Section.jsx` is the shared shell for every section. `tinted` gives a section its own warm panel, used to set the photo wall apart.
