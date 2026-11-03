// Vercel serverless proxy for the OpenAlex API.
// Keeps the API key out of the browser: set OPENALEX_API_KEY in the Vercel project settings.
module.exports = async function handler(req, res) {
  const key = process.env.OPENALEX_API_KEY || "";
  const parts = Array.isArray(req.query.path) ? req.query.path : [req.query.path || ""];
  const url = new URL("https://api.openalex.org/" + parts.join("/"));
  for (const [k, v] of Object.entries(req.query)) {
    if (k === "path" || k === "mailto" || k === "api_key") continue;
    url.searchParams.set(k, Array.isArray(v) ? v[0] : v);
  }
  if (key) url.searchParams.set("api_key", key);
  try {
    const r = await fetch(url.toString(), { headers: { Accept: "application/json" } });
    const body = await r.text();
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate=86400");
    res.status(r.status).send(body);
  } catch (e) {
    res.status(502).json({ error: "openalex_unreachable", message: String(e && e.message) });
  }
};
