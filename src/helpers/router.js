const fs = require("fs");
const { promisify } = require("util");
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);

const path = require("path");
const handlebars = require("handlebars");
const tplPath = path.join(__dirname, "../templates/dir.tpl");
const tplsource = fs.readFileSync(tplPath, "utf-8");
const template = handlebars.compile(tplsource);

const MIME = require("../helpers/mime");
const COMPRESS = require("../helpers/compress");
const RANGE = require("../helpers/range");
const ISCACHE = require("../helpers/cache");

module.exports = async (req, res, filePath, config) => {
  try {
    const stats = await stat(filePath);
    if (stats.isFile()) {
      const contentType = MIME(filePath);
      res.setHeader("Content-Type", contentType);

      if (ISCACHE(stats, req, res)) {
        res.statusCode = 304;
        res.end();
        return;
      }

      let rs;
      const { code, start, end } = RANGE(stats.size, req, res);
      if (code === 200) {
        res.statusCode = 200;
        rs = fs.createReadStream(filePath);
      } else {
        res.statusCode = 206;
        rs = fs.createReadStream(filePath, {
          start,
          end
        });
      }
      if (filePath.match(config.compress)) {
        rs = COMPRESS(rs, req, res);
      }
      rs.pipe(res);
    } else if (stats.isDirectory()) {
      const files = await readdir(filePath);
      const dir = path.relative(config.rootUrl, filePath);
      const data = {
        title: path.basename(filePath),
        dir: dir ? `/${dir}` : "",
        files
      };
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html");
      res.end(template(data));
    }
  } catch (error) {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain");
    res.end(`${filePath} is not a directory or file`);
    return;
  }
};
