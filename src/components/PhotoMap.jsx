import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { LAND, MAP_WIDTH, MAP_HEIGHT } from "../worldPaths";
import { MAP_POINTS } from "../constants";

/*
 * The places the photos come from, plotted.
 *
 * Deliberately not a travel map: no counter of countries, no lines joining the
 * pins, and home is on it alongside everywhere else. It is a control for the
 * wall below, and the dots are sized by how many photos there are rather than
 * by how far away the place is.
 *
 * The projection window is cropped to the part of the world in the album, so
 * most of the ocean and all of the empty hemisphere are gone.
 */

// Big enough to tell apart, small enough that Boston and New York stay separate.
const radius = (count) => 4 + Math.min(count, 20) * 0.32;

const PhotoMap = ({ groups, active, onSelect }) => {
  const plotted = groups.filter((g) => MAP_POINTS[g.slug]);

  return (
    <div className="relative">
      <svg
        viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
        className="w-full"
        role="group"
        aria-label="Places these photos were taken"
      >
        <g className="text-ink">
          {LAND.map((d, i) => (
            <path key={i} d={d} className="fill-current opacity-[0.12]" />
          ))}
        </g>

        {plotted.map((g) => {
          const p = MAP_POINTS[g.slug];
          const on = active === g.slug;
          const r = radius(g.photos.length);

          return (
            <g
              key={g.slug}
              role="button"
              tabIndex={0}
              aria-pressed={on}
              aria-label={`${g.label}, ${g.photos.length} photos`}
              onClick={() => onSelect(on ? null : g.slug)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelect(on ? null : g.slug);
                }
              }}
              className="cursor-pointer focus:outline-none [&:focus-visible>circle:first-child]:opacity-100"
            >
              {/* Focus ring, and the generous invisible hit area behind it. */}
              <circle
                cx={p.x}
                cy={p.y}
                r={r + 9}
                className="fill-none stroke-maroon-700 opacity-0 transition-opacity"
                strokeWidth="2"
              />
              <circle cx={p.x} cy={p.y} r={Math.max(r + 12, 20)} fill="transparent" />

              <motion.circle
                cx={p.x}
                cy={p.y}
                className="fill-maroon-700"
                initial={false}
                animate={{ r: on ? r + 3 : r, opacity: !active || on ? 1 : 0.35 }}
                transition={{ type: "spring", stiffness: 320, damping: 26 }}
              />

              {/* Labels are unreadable once the map is phone width. The place
                  buttons underneath do the job there. */}
              <text
                x={p.x + p.dx}
                y={p.y + p.dy}
                textAnchor={p.anchor}
                fontSize="17"
                className={`hidden select-none md:inline ${
                  on ? "fill-maroon-700 font-medium" : "fill-ink/55"
                }`}
              >
                {g.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

PhotoMap.propTypes = {
  groups: PropTypes.array.isRequired,
  active: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
};

export default PhotoMap;
