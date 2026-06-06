import { Router } from "express";
import https from "https";
import http from "http";

const router = Router();

router.get("/img-proxy", (req, res) => {
  const url = req.query.url as string;

  if (!url) {
    res.status(400).json({ error: "Missing url parameter" });
    return;
  }

  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    res.status(400).json({ error: "Invalid url" });
    return;
  }

  const allowedHosts = ["images.unsplash.com", "plus.unsplash.com"];
  if (!allowedHosts.includes(parsed.hostname)) {
    res.status(403).json({ error: "Host not allowed" });
    return;
  }

  const protocol = parsed.protocol === "https:" ? https : http;

  const options = {
    hostname: parsed.hostname,
    path: parsed.pathname + parsed.search,
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; LumiereJewels/1.0)",
      Accept: "image/webp,image/avif,image/*,*/*;q=0.8",
    },
  };

  const proxyReq = protocol.get(options, (proxyRes) => {
    const contentType = proxyRes.headers["content-type"] ?? "image/jpeg";
    const cacheControl = proxyRes.headers["cache-control"] ?? "public, max-age=86400";

    res.set({
      "Content-Type": contentType,
      "Cache-Control": cacheControl,
      "Access-Control-Allow-Origin": "*",
    });

    res.status(proxyRes.statusCode ?? 200);
    proxyRes.pipe(res);
  });

  proxyReq.on("error", () => {
    if (!res.headersSent) {
      res.status(502).json({ error: "Failed to fetch image" });
    }
  });

  proxyReq.setTimeout(8000, () => {
    proxyReq.destroy();
    if (!res.headersSent) {
      res.status(504).json({ error: "Image fetch timed out" });
    }
  });
});

export default router;
