// One-time helper: turns a Spotify app's client ID/secret into a long-lived
// refresh token for the now-playing function.
//
//   1. Create an app at https://developer.spotify.com/dashboard
//      (Development Mode requires Spotify Premium as of Feb 2026.)
//   2. Add http://127.0.0.1:8888/callback as a Redirect URI.
//   3. SPOTIFY_CLIENT_ID=... SPOTIFY_CLIENT_SECRET=... node scripts/spotify-token.mjs
//   4. Open the printed URL, approve, and copy the refresh token it prints.
//   5. Put all three values in Netlify → Site settings → Environment variables.

import { createServer } from "node:http";

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REDIRECT_URI = "http://127.0.0.1:8888/callback";
const SCOPES = "user-read-currently-playing user-read-recently-played";

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error("Set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET first.");
  process.exit(1);
}

const authUrl =
  "https://accounts.spotify.com/authorize?" +
  new URLSearchParams({
    client_id: CLIENT_ID,
    response_type: "code",
    redirect_uri: REDIRECT_URI,
    scope: SCOPES,
  });

console.log("\nOpen this URL and approve access:\n");
console.log(authUrl + "\n");

const server = createServer(async (req, res) => {
  const url = new URL(req.url, REDIRECT_URI);
  const code = url.searchParams.get("code");
  if (!code) return res.end("No code in callback.");

  const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      authorization: `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString("base64")}`,
      "content-type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: REDIRECT_URI,
    }),
  });

  const data = await tokenRes.json();
  if (!data.refresh_token) {
    console.error("\nNo refresh token returned:", data);
    res.end("Failed — check the terminal.");
    return server.close();
  }

  console.log("\nSPOTIFY_REFRESH_TOKEN=" + data.refresh_token + "\n");
  res.end("Done. You can close this tab and check your terminal.");
  server.close();
});

server.listen(8888, "127.0.0.1");
