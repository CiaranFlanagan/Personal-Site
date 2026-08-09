# CLAUDE.md

## What this is

[ciaranflanagan.me](https://ciaranflanagan.me), a single-page personal site. React + Vite + Tailwind, deployed on Netlify from `master`.

It is the front door, not a portfolio project. It is not listed in the resume's PROJECTS section and should not be pitched as an engineering accomplishment. Its job is to be what a recruiter opens after reading the resume, and to carry the personal material the resume has no room for.

## Build and test

```bash
npm run dev             # local dev server on :5173
npm run build           # production build to dist/
npm run lint            # eslint
npm run build:resume    # rebuild public/resume.pdf from ~/resume, phone number stripped
npm run import:photos   # re-import the Photos.app album into src/assets/photos
npm run gen:map         # regenerate the world outline behind the photo map
```

`npm run dev` does not serve Netlify functions. Use `netlify dev` when touching the Spotify endpoint.

**A passing build is not verification.** Every visual bug found in this repo so far was invisible to `npm run build`: an invisible lightbox backdrop (`bg-ink/92`, not a real Tailwind opacity step, so it compiled to nothing), a pile whose back cards were unclickable because the front card covered them, horizontal overflow at 390px and 768px, a caption that briefly described the wrong photo. Drive the actual page in a headless browser and look at the screenshot.

## Copy rules

These are the ones that took several rounds to get right. They matter more than anything else in this file.

- **Plain facts only. Never invent quirks, jokes, or self-deprecation.** A caption reading "I talk with my hands" and a team list ending "in roughly that order, most weeks" were both rejected outright, because he never said either. Inventing charm is the same error as inventing a metric.
- **Do not upgrade his plain statements into prose.** He described his interest in CS as "typical stuff" and biology as "really cool". Rendering that as "I like systems, how the parts fit together and what happens when one of them doesn't" was a thesis he never advanced.
- **Never imply expertise he doesn't have.** An early draft claimed a feel for genomic pipelines. He has taken four biology classes and said so.
- **No em dashes.** Anywhere. Use commas, colons, or a second sentence.
- **Keep it short.** Long paragraphs are where the performing starts.
- His word for the failure mode is **"larpy"**, and for pretension, **"notions"**. Both are accurate. If a line would make him sound witty or wise, cut it.

All copy lives in `src/constants/index.js`. Nothing user-facing is hardcoded in components.

## Photos

**The album is the source of truth, not the folder.** To add a photo, put it in the `website photos` album in Photos.app and run `npm run import:photos`. The script exports the album, reads each photo's own GPS and date, sorts it into a place group, resizes it, and regenerates `src/photoMeta.js`. It rebuilds the group folders from scratch, so removing a photo from the album removes it from the site. It is deterministic: two runs produce byte-identical files.

The folder is still the group at render time, and dropping a file in by hand works, it just gets no place or date.

- A photo somewhere new is reported as **UNPLACED** and the script exits non-zero. Add a row to `PLACES` in `scripts/import-photos.py`. Photos with no GPS at all go in `MANUAL`.
- Anything in `scripts/photo-overrides/<original-filename>.jpg` is used instead of the exported original. That exists because one item in the album is a screenshot of an Instagram post and needed the phone chrome cropped off.
- `headshot.jpg` sits at the top level, outside any group, and is not managed by the script. It is the first photo shown and must stay that way until the user interacts.
- **Captions come from metadata, not from description.** `"Cobh, Co. Cork, May 2026"` is a fact the file already knew. A hand-written entry in `PHOTO_CAPTIONS` overrides it, and should only be added when the file cannot say what the picture is.
- Captions show in the lightbox, not on the wall. Putting them under the photos left a ragged baseline, because only some photos have one worth reading.
- **Do not write captions for photos you cannot identify, and never name people.** Ask.
- **Photos.app strips GPS on export but keeps it in the library.** So the place is read from the library, and the JPGs that ship carry no coordinates. Grouping by place costs nothing in privacy, but do not undo this by copying originals in by hand.

## The map

`PhotoMap.jsx` plots one dot per group over an SVG world outline generated from Natural Earth 110m land (public domain) by `scripts/gen-map.py`. No tiles, no map library, no runtime network calls.

- **It is a filter, not a travel map.** No count of countries, no lines joining the pins, and home is on it alongside everywhere else. That distinction is the whole reason it does not read as a brag. Keep it.
- **Dots are city level, never precise.** Some of these photos were taken at home. A public site should not draw a ring round anyone's house.
- The projection window is cropped to the part of the world the photos are in. A whole globe was mostly empty ocean.
- **`MAP_POINTS` label offsets are placed by hand** because Boston and New York land about 19px apart. `gen-map.py` prints the x/y after a window change; the offsets still need eyeballing.
- Map labels are hidden below `md`. At phone width they are unreadable, so the place buttons underneath are the control there. Those buttons are also the keyboard and screen reader path, so they are not optional decoration.

## Decisions already made, don't undo these

- **No duotone, no display serif at large scale, no dark cinematic hero.** All three were tried. Art-directing a snapshot of a student into a monochrome editorial reads as notions.
- **Photos keep their natural aspect ratio** in the wall. A uniform crop flattened the variety in the album.
- **The wall uses a grid, not CSS columns.** Columns balance vertically and strand the last photo of a short group beside empty space.
- **Clicking the hero pile deals the top photo to the back.** Making each card individually clickable was tried; the cards are stacked full-size boxes and the front one covers all but a sliver of the rest, so almost none of the target was reachable.
- **The Spotify footer renders nothing until configured.** A dead integration must leave no trace on the page.
- **Photos sit above Work, not at the bottom.** They were last on the page and started ~4,000px down, so most visitors never reached the only part of the site that is actually his.
- **The wall shows 12 by default, spread evenly across the whole set.** All 53 is a wall long enough to bury the sections under it, and a random handful clumps on whichever trip had the most photos.
- **The wall is balanced columns computed from known aspect ratios**, not a plain grid and not CSS columns. A grid left ragged gaps under the short photos; CSS columns stranded the last photo of a short set. Heights come from `photoMeta`, so there is no measure-then-reflow.
- **The lightbox steps through the visible set, not every photo.** Filter to Sicily, open one, and the arrows stay in Sicily.
- **The maroon is Galway's and the footer says so once.** Otherwise it is just a colour. It is deliberately not louder than that.

## Deploying

Push to `master` and Netlify rebuilds. Photos and the resume ship through git; if a file is not committed it does not exist on the live site.

`netlify.toml` is checked in and overrides the dashboard. It pins Node 20 and sets cache headers. The two headers differ for a reason: hashed assets under `/assets/*` are immutable for a year because their filenames change with their contents, while `/resume.pdf` must revalidate because it is overwritten at the same URL.

**The published resume is not `~/resume/resume.pdf`.** That file carries a phone number. `npm run build:resume` builds a copy without it and verifies its own work. Never copy the resume PDF across by hand.

## Related

Part of the job-search portfolio. See `~/Code/portfolio/CLAUDE.md`. Project descriptions here should stay consistent with the resume's PROJECTS section and with each repo's README, but the site is allowed to say it in plainer language.
