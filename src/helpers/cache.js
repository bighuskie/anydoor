const { cache } = require("../config/defalutConfig");

let refreshCache = (stats, res) => {
  const { maxAge, cacheControl, expires, lastModified, etag } = cache;

  if (expires) {
    const time = new Date(Date.now() + maxAge * 1000).toUTCString();
    res.setHeader("Expires", time);
  }

  if (cacheControl) {
    res.setHeader("Cache-Control", `public max-age=${maxAge}`);
  }

  if (lastModified) {
    res.setHeader("Last-Modified", stats.mtime.toUTCString());
  }

  if (etag) {
    res.setHeader("Etag", `${stats.size}-${stats.mtime}`);
  }
};

module.exports = (stats, req, res) => {
  refreshCache(stats, res);
  const lastModified = req.headers["if-modified-since"];
  const etag = req.headers["if-none-match"];
  if (!lastModified && !etag) {
    return false;
  }

  if (lastModified && lastModified !== res.getHeader("Last-Modified")) {
    return false;
  }

  if (etag && etag !== res.getHeader("Etag")) {
    return false;
  }

  return true;
};
