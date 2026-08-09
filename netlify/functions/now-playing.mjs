// Returns what Ciarán is listening to, or last listened to.
//
// The refresh token is long-lived and must never reach the browser, which is
// the whole reason this runs server-side. Set these in the Netlify UI:
//   SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN
// Generate the refresh token once with `node scripts/spotify-token.mjs`.

const TOKEN_URL = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_URL = "https://api.spotify.com/v1/me/player/currently-playing";
const RECENT_URL = "https://api.spotify.com/v1/me/player/recently-played?limit=1";

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json",
      // Spotify rate limits, and nobody needs second-by-second accuracy.
      "cache-control": "public, max-age=45",
    },
  });

async function getAccessToken() {
  const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN } = process.env;

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      authorization: `Basic ${Buffer.from(
        `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`,
      ).toString("base64")}`,
      "content-type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: SPOTIFY_REFRESH_TOKEN,
    }),
  });

  if (!res.ok) throw new Error(`token exchange failed: ${res.status}`);
  return (await res.json()).access_token;
}

const shape = (track, isPlaying) => ({
  isPlaying,
  title: track.name,
  artist: track.artists.map((a) => a.name).join(", "),
  url: track.external_urls?.spotify,
});

export default async () => {
  const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REFRESH_TOKEN } = process.env;
  if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET || !SPOTIFY_REFRESH_TOKEN) {
    // Not configured yet — the component treats this as "render nothing".
    return json({ configured: false }, 200);
  }

  try {
    const token = await getAccessToken();
    const auth = { headers: { authorization: `Bearer ${token}` } };

    const now = await fetch(NOW_PLAYING_URL, auth);
    // 204 means nothing is playing right now.
    if (now.status === 200) {
      const data = await now.json();
      if (data?.item) return json(shape(data.item, Boolean(data.is_playing)));
    }

    const recent = await fetch(RECENT_URL, auth);
    if (recent.ok) {
      const data = await recent.json();
      const track = data?.items?.[0]?.track;
      if (track) return json(shape(track, false));
    }

    return json({ configured: true, isPlaying: false });
  } catch {
    // A dead Spotify integration should never break the page.
    return json({ configured: false }, 200);
  }
};
