/* eslint-disable react-refresh/only-export-components --
   These are text helpers, not components. The rule fires because the file is
   .jsx and exports something that is not a component; there is nothing here
   for fast refresh to preserve. */
import { Fragment } from "react";

/*
 * All copy lives in constants as plain strings. This is the smallest thing
 * that lets one of those strings carry a link, using [text](url), without
 * turning the copy file into markup or pulling in a markdown renderer.
 *
 * Use `plain()` anywhere the text has to stay a string: alt text, aria-label,
 * document titles.
 */
const LINK = /\[([^\]]+)\]\(([^)]+)\)/g;

export function withLinks(text) {
  if (!text) return text;

  const out = [];
  let last = 0;

  for (const match of text.matchAll(LINK)) {
    const [full, label, href] = match;
    if (match.index > last) out.push(text.slice(last, match.index));
    out.push(
      <a
        key={`${href}-${match.index}`}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-maroon-700 underline decoration-maroon-700/30 underline-offset-2 transition-[text-decoration-color] hover:decoration-maroon-700"
      >
        {label}
      </a>,
    );
    last = match.index + full.length;
  }

  if (last === 0) return text;
  if (last < text.length) out.push(text.slice(last));

  return out.map((part, i) => <Fragment key={i}>{part}</Fragment>);
}

export function plain(text) {
  return text ? text.replace(LINK, "$1") : text;
}
