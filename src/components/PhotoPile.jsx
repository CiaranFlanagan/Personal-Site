import { useState } from "react";
import { motion } from "framer-motion";
import { headshot, sampleAcrossGroups } from "../photos";
import { withLinks } from "../copy";

/*
 * A pile of prints you flip through. The headshot starts on top; after that it
 * cycles like any other photo.
 *
 * Clicking the pile deals the top photo to the back. An earlier version made
 * each card individually clickable so you could pull one forward, but the cards
 * are stacked full-size boxes and the front one covered all but a sliver of the
 * ones behind, leaving almost nothing to click. Only the front card takes
 * pointer events now, and the whole of it is the target.
 *
 * Offsets are percentages of the card so the pile scales with it. Fixed pixel
 * offsets overflowed the viewport on narrow screens.
 */
const DEPTHS = [
  { rotate: -1.5, x: "0%", y: "0%", scale: 1 },
  { rotate: 7, x: "8%", y: "3%", scale: 0.97 },
  { rotate: -9, x: "-9%", y: "5%", scale: 0.94 },
  { rotate: 13, x: "13%", y: "8%", scale: 0.91 },
  { rotate: -14, x: "-14%", y: "9%", scale: 0.88 },
];

const PhotoPile = () => {
  const [pile] = useState(() =>
    [headshot, ...sampleAcrossGroups(DEPTHS.length - 1)].filter(Boolean),
  );
  const [order, setOrder] = useState(() => pile.map((_, i) => i));

  if (!headshot || pile.length === 0) return null;

  const deal = () => setOrder((prev) => [...prev.slice(1), prev[0]]);
  const front = pile[order[0]];

  return (
    <div className="flex flex-col items-center">
      <div className="relative aspect-square w-full max-w-[16rem] sm:max-w-[19rem] md:max-w-[22rem]">
        {pile.map((photo, pileIndex) => {
          const depth = order.indexOf(pileIndex);
          const pos = DEPTHS[Math.min(depth, DEPTHS.length - 1)];
          const isFront = depth === 0;

          return (
            <motion.button
              key={photo.key}
              onClick={isFront ? deal : undefined}
              tabIndex={isFront ? 0 : -1}
              aria-hidden={!isFront}
              className={`snapshot absolute inset-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon-700 ${
                isFront ? "cursor-pointer" : "pointer-events-none"
              }`}
              initial={false}
              animate={{ ...pos, zIndex: pile.length - depth }}
              whileHover={isFront ? { scale: 1.02, rotate: 0 } : undefined}
              whileTap={isFront ? { scale: 0.98 } : undefined}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              style={{ zIndex: pile.length - depth }}
              aria-label={isFront ? "Next photo" : undefined}
            >
              <div className="h-full w-full overflow-hidden bg-sand">
                <img
                  src={photo.src}
                  alt={isFront ? photo.alt || "" : ""}
                  className="h-full w-full object-cover"
                  draggable="false"
                />
              </div>
            </motion.button>
          );
        })}
      </div>

      <p className="mt-9 min-h-[1.25rem] text-sm text-ink/55">
        {withLinks(front.caption)}
      </p>
    </div>
  );
};

export default PhotoPile;
