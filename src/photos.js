import { PHOTO_CAPTIONS, GROUP_LABELS, GROUP_ORDER } from "./constants";
import { PHOTO_META } from "./photoMeta";

/*
 * Adding a photo:
 *   drop the file into src/assets/photos/<group>/  and it appears on the site.
 *
 * The folder name is the group. A new folder becomes a new group automatically;
 * give it a nicer display name in GROUP_LABELS, a position in GROUP_ORDER, and
 * a dot in MAP_POINTS if you want it on the map. A group with no map point
 * still shows up in the place list, it just is not plotted.
 *
 * Place and date come from photoMeta.js, which is generated from the photos'
 * own metadata. That is why almost nothing here needs a hand-written caption:
 * "Cobh, Co. Cork, May 2026" is a fact the file already knew.
 *
 * headshot.jpg sits at the top level, outside any group. It is the fixed front
 * photo of the hero pile and is never shuffled away.
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
  const meta = PHOTO_META[key] || {};
  // A hand-written caption wins; otherwise state where and when.
  const caption =
    PHOTO_CAPTIONS[key] ||
    [meta.place, meta.when].filter(Boolean).join(", ") ||
    undefined;
  return { file, group, key, src, caption, place: meta.place, date: meta.date };
});

export const headshot = entries.find(
  (e) => e.group === null && /^headshot\./.test(e.file),
);

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

export const groups = slugs.map((slug) => {
  const photos = grouped
    .filter((e) => e.group === slug)
    .sort((a, b) => (a.date || "").localeCompare(b.date || "") || a.file.localeCompare(b.file));
  return { slug, label: GROUP_LABELS[slug] || titleCase(slug), photos };
});

/** Every grouped photo, oldest first. The wall's default view reads as a timeline. */
export const chronological = groups
  .flatMap((g) => g.photos)
  .sort((a, b) => (a.date || "").localeCompare(b.date || ""));

export const totalPhotos = chronological.length;

/**
 * An even spread across the whole set rather than a random handful, so the
 * default view shows several different places instead of clumping on whichever
 * trip happened to have the most photos.
 */
export function spread(list, count) {
  if (list.length <= count) return list;
  const step = list.length / count;
  return Array.from({ length: count }, (_, i) => list[Math.floor(i * step)]);
}

/** One random photo from each of up to `count` groups, reshuffled per page load. */
export function sampleAcrossGroups(count = 3) {
  const shuffled = [...groups].sort(() => Math.random() - 0.5);
  return shuffled
    .slice(0, count)
    .map((g) => g.photos[Math.floor(Math.random() * g.photos.length)])
    .filter(Boolean);
}
