import { useEffect, useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import { allPhotos } from "../photos";

/** Full-screen photo viewer. `index` is null when closed. */
const Lightbox = ({ index, onClose, onIndexChange }) => {
  const open = index !== null;
  // Which way the next photo should slide in from.
  const [direction, setDirection] = useState(0);

  const step = useCallback(
    (delta) => {
      setDirection(delta);
      onIndexChange((index + delta + allPhotos.length) % allPhotos.length);
    },
    [index, onIndexChange],
  );

  useEffect(() => {
    if (!open) return;

    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };

    // Stop the page scrolling behind the overlay.
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose, step]);

  const photo = open ? allPhotos[index] : null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[110] flex flex-col items-center justify-center bg-ink/95 p-4 backdrop-blur-md md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={photo.caption || "Photo"}
        >
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute right-5 top-5 z-10 text-2xl text-paper/70 transition-colors hover:text-paper"
          >
            ×
          </button>

          {allPhotos.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  step(-1);
                }}
                aria-label="Previous photo"
                className="absolute left-3 top-1/2 z-10 -translate-y-1/2 px-3 py-2 text-3xl text-paper/60 transition-colors hover:text-paper md:left-8"
              >
                ‹
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  step(1);
                }}
                aria-label="Next photo"
                className="absolute right-3 top-1/2 z-10 -translate-y-1/2 px-3 py-2 text-3xl text-paper/60 transition-colors hover:text-paper md:right-8"
              >
                ›
              </button>
            </>
          )}

          <div className="relative flex max-h-[82vh] w-full items-center justify-center overflow-hidden">
            <AnimatePresence initial={false} mode="wait" custom={direction}>
              <motion.img
                key={photo.src}
                src={photo.src}
                alt={photo.caption || ""}
                className="max-h-[82vh] max-w-full rounded-sm object-contain"
                custom={direction}
                initial={(d) => ({ opacity: 0, x: d > 0 ? 60 : d < 0 ? -60 : 0, scale: 0.98 })}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={(d) => ({ opacity: 0, x: d > 0 ? -60 : d < 0 ? 60 : 0, scale: 0.98 })}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                onClick={(e) => e.stopPropagation()}
                // Flick left or right to move through the set on touch.
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.18}
                onDragEnd={(e, info) => {
                  if (info.offset.x < -80) step(1);
                  else if (info.offset.x > 80) step(-1);
                }}
                draggable="false"
              />
            </AnimatePresence>
          </div>

          <div className="mt-4 flex min-h-[1.5rem] items-center gap-3 text-sm text-paper/70">
            {photo.caption && <span className="max-w-xl text-center">{photo.caption}</span>}
            <span className="text-paper/35">
              {index + 1} / {allPhotos.length}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

Lightbox.propTypes = {
  index: PropTypes.number,
  onClose: PropTypes.func.isRequired,
  onIndexChange: PropTypes.func.isRequired,
};

export default Lightbox;
