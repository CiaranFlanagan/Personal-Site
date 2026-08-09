import PropTypes from "prop-types";

/**
 * Plain section shell: a small heading and its content.
 * `tinted` gives the section its own warm panel, used to set the photo wall
 * apart from the text sections around it.
 */
const Section = ({ id, title, tinted = false, children }) => (
  <section
    id={id}
    className={
      tinted
        ? "-mx-4 my-4 rounded-2xl bg-maroon-100/30 px-4 py-14 sm:-mx-6 sm:px-6 md:py-16"
        : "border-t border-ink/10 py-14 md:py-16"
    }
  >
    <h2 className="text-sm font-semibold uppercase tracking-wider text-maroon-700">
      {title}
    </h2>
    <div className="mt-8">{children}</div>
  </section>
);

Section.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  tinted: PropTypes.bool,
  children: PropTypes.node,
};

export default Section;
