import { useState, forwardRef } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import PropTypes from "prop-types";
import Section from "./Section";
import { groups } from "../photos";

const TILTS = [-1.6, 1.1, -0.7, 1.5, -1.2, 0.8, -1.3, 0.9];

// forwardRef because AnimatePresence's popLayout mode attaches a ref to each
// child to measure it; a plain function component warns and the measurement fails.
const Photo = forwardRef(function Photo({ photo, tilt, onOpen }, ref) {
  const [loaded, setLoaded] = useState(false);

  return (
    <motion.figure
      ref={ref}
      layout
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <motion.button
        onClick={() => onOpen(photo.index)}
        className="snapshot block w-full cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon-700 focus-visible:ring-offset-2"
        initial={false}
        animate={{ rotate: tilt }}
        whileHover={{ rotate: 0, scale: 1.03, y: -4 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        aria-label={photo.caption || "Open photo"}
      >
        {/* Natural aspect ratio: portraits stay portrait. A uniform crop
            flattened the variety in the album. */}
        <img
          src={photo.src}
          alt={photo.caption || ""}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          className={`w-full bg-sand transition-opacity duration-500 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          draggable="false"
        />
      </motion.button>
      {photo.caption && (
        <figcaption className="mt-2.5 text-sm leading-snug text-ink/55">
          {photo.caption}
        </figcaption>
      )}
    </motion.figure>
  );
});

Photo.propTypes = {
  photo: PropTypes.object.isRequired,
  tilt: PropTypes.number.isRequired,
  onOpen: PropTypes.func.isRequired,
};

const Photos = ({ onOpenPhoto }) => {
  const [active, setActive] = useState(null);

  if (groups.length === 0) return null;

  // Counted from the groups, not allPhotos: the headshot sits outside every
  // group, so allPhotos.length was one higher than the number actually shown.
  const total = groups.reduce((n, g) => n + g.photos.length, 0);
  const filters = [{ slug: null, label: "Everywhere", count: total }].concat(
    groups.map((g) => ({ slug: g.slug, label: g.label, count: g.photos.length })),
  );

  const shown = active
    ? groups.find((g) => g.slug === active).photos
    : groups.flatMap((g) => g.photos);

  return (
    <Section id="photos" title="Photos" tinted>
      <div className="mb-8 flex flex-wrap gap-2">
        {filters.map((f) => {
          const on = active === f.slug;
          return (
            <button
              key={f.label}
              onClick={() => setActive(f.slug)}
              aria-pressed={on}
              className={`relative rounded-full px-4 py-1.5 text-sm transition-colors ${
                on ? "text-paper" : "text-ink/65 hover:text-maroon-700"
              }`}
            >
              {/* Shared layoutId slides the filled pill between filters. */}
              {on && (
                <motion.span
                  layoutId="photo-filter-pill"
                  className="absolute inset-0 rounded-full bg-maroon-700"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative">
                {f.label}{" "}
                <span className={on ? "text-paper/60" : "text-ink/35"}>{f.count}</span>
              </span>
            </button>
          );
        })}
      </div>

      <LayoutGroup>
        <motion.div layout className="grid grid-cols-2 items-start gap-5 md:grid-cols-3 md:gap-6">
          <AnimatePresence mode="popLayout">
            {shown.map((photo, i) => (
              <Photo
                key={photo.key}
                photo={photo}
                tilt={TILTS[i % TILTS.length]}
                onOpen={onOpenPhoto}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>
    </Section>
  );
};

Photos.propTypes = {
  onOpenPhoto: PropTypes.func.isRequired,
};

export default Photos;
