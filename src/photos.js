import { PHOTO_CAPTIONS, GROUP_LABELS, GROUP_ORDER } from "./constants";

/*
 * Adding a photo:
 *   drop the file into src/assets/photos/<group>/  and it appears on the site.
 *
 * The folder name is the group. A new folder becomes a new group automatically;
 * give it a nicer display name in GROUP_LABELS and a position in GROUP_ORDER if
 * you care about either. Captions are optional, keyed by "<group>/<file>".
 *
 * headshot.jpg sits at the top level, outside any group. It is the fixed front
 * photo and is never shuffled away.
 */
const modules = import.meta.glob("./assets/photos/**/*.{jpg,jpeg,png,webp}", {
  eager: true,
  query: "?url",
  import: "default",
});

const titleCase = (slug) =>
  slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

const entries = Object.entries(modules).map(([path, src]) => {
  const parts = path.replace("./assets/photos/", "").split("/");
  const file = parts.pop();
  const group = parts.length ? parts.join("/") : null;
  const key = group ? `${group}/${file}` : file;
  return { file, group, key, src, caption: PHOTO_CAPTIONS[key] };
});

export const headshot = entries.find((e) => e.group === null && /^headshot\./.test(e.file));

const grouped = entries.filter((e) => e.group !== null);

const slugs = [...new Set(grouped.map((e) => e.group))].sort((a, b) => {
  const ia = GROUP_ORDER.indexOf(a);
  const ib = GROUP_ORDER.indexOf(b);
  // Groups not listed in GROUP_ORDER fall to the end, alphabetically.
  if (ia === -1 && ib === -1) return a.localeCompare(b);
  if (ia === -1) return 1;
  if (ib === -1) return -1;
  return ia - ib;
});

// Flat list backing the lightbox. The headshot is index 0 so it is always
// reachable first.
export const allPhotos = [];
if (headshot) allPhotos.push(headshot);

export const groups = slugs.map((slug) => {
  const photos = grouped
    .filter((e) => e.group === slug)
    .sort((a, b) => a.file.localeCompare(b.file))
    .map((photo) => {
      const withIndex = { ...photo, index: allPhotos.length };
      allPhotos.push(withIndex);
      return withIndex;
    });

  return { slug, label: GROUP_LABELS[slug] || titleCase(slug), photos };
});

if (headshot) headshot.index = 0;

/** One random photo from each of up to `count` groups, reshuffled per page load. */
export function sampleAcrossGroups(count = 3) {
  const shuffled = [...groups].sort(() => Math.random() - 0.5);
  return shuffled
    .slice(0, count)
    .map((g) => g.photos[Math.floor(Math.random() * g.photos.length)])
    .filter(Boolean);
}
