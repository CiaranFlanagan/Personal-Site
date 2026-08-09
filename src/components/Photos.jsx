import { useState, useEffect, useMemo, forwardRef } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import PropTypes from "prop-types";
import Section from "./Section";
import PhotoMap from "./PhotoMap";
import { groups, chronological, totalPhotos, spread } from "../photos";
import { PHOTOS_INTRO } from "../constants";

const TILTS = [-1.1, 0.8, -0.6, 1.2, -0.9, 0.7, -1.3, 1.0];
const PREVIEW = 12;

/** Number of wall columns, tracked so photos can be balanced across them. */
const useColumnCount = () => {
  const [n, setN] = useState(() =>
    typeof window === "undefined" || window.innerWidth < 768 ? 2 : 3,
  );
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const sync = () => setN(mq.matches ? 3 : 2);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return n;
};

/*
 * Balanced columns, filled shortest-first using each photo's known aspect
 * ratio. Photos keep their natural shape, so a plain grid leaves ragged gaps
 * under the short ones. CSS columns were tried first and stranded the last
 * photo of a short set beside empty space; this fills evenly because it knows
 * the heights up front, from photoMeta rather than from measuring the DOM.
 */
const columnise = (photos, count) => {
  const cols = Array.from({ length: count }, () => []);
  const heights = new Array(count).fill(0);
  photos.forEach((photo) => {
    const i = heights.indexOf(Math.min(...heights));
    cols[i].push(photo);
    heights[i] += (photo.h || 1000) / (photo.w || 1000);
  });
  return cols;
};

// forwardRef because AnimatePresence's popLayout mode attaches a ref to each
// child to measure it; a plain function component warns and the measurement fails.
const Photo = forwardRef(function Photo({ photo, tilt, onOpen }, ref) {
  return (
    <motion.button
      ref={ref}
      layout
      onClick={onOpen}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1, rotate: tilt }}
      exit={{ opacity: 0, scale: 0.96 }}
      whileHover={{ rotate: 0, scale: 1.03, y: -4, zIndex: 10 }}
      transition={{ type: "spring", stiffness: 280, damping: 26 }}
      className="snapshot block w-full cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon-700 focus-visible:ring-offset-2"
      aria-label={photo.alt ? `Open photo: ${photo.alt}` : "Open photo"}
    >
      <img
        src={photo.src}
        alt={photo.alt || ""}
        width={photo.w}
        height={photo.h}
        loading="lazy"
        decoding="async"
        className="w-full bg-sand"
        draggable="false"
      />
    </motion.button>
  );
});

Photo.propTypes = {
  photo: PropTypes.object.isRequired,
  tilt: PropTypes.number.isRequired,
  onOpen: PropTypes.func.isRequired,
};

const Photos = ({ onOpenPhoto }) => {
  const [active, setActive] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const columns = useColumnCount();

  const select = (slug) => {
    setActive(slug);
    setShowAll(false);
  };

  const shown = useMemo(() => {
    if (active) return groups.find((g) => g.slug === active)?.photos ?? [];
    return showAll ? chronological : spread(chronological, PREVIEW);
  }, [active, showAll]);

  const cols = useMemo(() => columnise(shown, columns), [shown, columns]);
  const activeGroup = groups.find((g) => g.slug === active);

  if (groups.length === 0) return null;

  return (
    <Section id="photos" title="Photos" tinted>
      <p className="-mt-4 mb-6 max-w-md text-sm leading-relaxed text-ink/60">
        {PHOTOS_INTRO}
      </p>

      <PhotoMap groups={groups} active={active} onSelect={select} />

      {/* The map is the nice way in; these are the reliable one, and the only
          one on a phone, where the map labels are too small to read. */}
      <div className="mt-6 flex flex-wrap gap-x-1 gap-y-2">
        {[{ slug: null, label: "Everywhere" }, ...groups].map((g) => {
          const on = active === g.slug;
          return (
            <button
              key={g.label}
              onClick={() => select(g.slug)}
              aria-pressed={on}
              className={`relative rounded-full px-3.5 py-1.5 text-sm transition-colors ${
                on ? "text-paper" : "text-ink/60 hover:text-maroon-700"
              }`}
            >
              {on && (
                <motion.span
                  layoutId="photo-filter-pill"
                  className="absolute inset-0 rounded-full bg-maroon-700"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative">{g.label}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-8 flex items-baseline justify-between gap-4">
        <p className="text-sm text-ink/50">
          {active
            ? `${activeGroup.photos.length} from ${activeGroup.label}`
            : showAll
              ? `All ${totalPhotos}, oldest first`
              : `${shown.length} of ${totalPhotos}`}
        </p>
        {!active && (
          <button
            onClick={() => setShowAll((v) => !v)}
            className="shrink-0 text-sm text-maroon-700 underline decoration-maroon-700/30 underline-offset-4 transition-colors hover:decoration-maroon-700"
          >
            {showAll ? "Show fewer" : `Show all ${totalPhotos}`}
          </button>
        )}
      </div>

      <LayoutGroup>
        <div className="mt-5 flex items-start gap-4 md:gap-5">
          {cols.map((col, ci) => (
            <div
              key={ci}
              className="flex min-w-0 flex-1 flex-col gap-4 md:gap-5"
            >
              <AnimatePresence mode="popLayout" initial={false}>
                {col.map((photo, i) => (
                  <Photo
                    key={photo.key}
                    photo={photo}
                    tilt={TILTS[(ci * 3 + i) % TILTS.length]}
                    onOpen={() => onOpenPhoto(shown, shown.indexOf(photo))}
                  />
                ))}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </LayoutGroup>
    </Section>
  );
};

Photos.propTypes = {
  onOpenPhoto: PropTypes.func.isRequired,
};

export default Photos;
