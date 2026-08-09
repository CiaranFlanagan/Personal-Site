import { useEffect, useState } from "react";

/**
 * Renders nothing until Spotify is configured and returns a track. A broken or
 * unconfigured integration should leave no trace on the page.
 */
const NowPlaying = () => {
  const [track, setTrack] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const res = await fetch("/.netlify/functions/now-playing");
        if (!res.ok) return;
        const data = await res.json();
        if (!cancelled && data?.title) setTrack(data);
      } catch {
        // Offline, or running `vite dev` without the Netlify CLI. Stay quiet.
      }
    };

    load();
    const id = setInterval(load, 60_000);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  if (!track) return null;

  return (
    <a
      href={track.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-baseline gap-2 text-sm text-ink/55 transition-colors hover:text-maroon-700"
    >
      <span className="text-xs uppercase tracking-[0.16em] text-maroon-700">
        {track.isPlaying ? "Listening to" : "Last played"}
      </span>
      <span className="group-hover:underline">
        {track.title}, {track.artist}
      </span>
    </a>
  );
};

export default NowPlaying;
