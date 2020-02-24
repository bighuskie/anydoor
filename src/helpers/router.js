const fs = require("fs");
const { promisify } = require("util");
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);
const { rootUrl } = require("../config/defalutConfig");

const path = require("path");
const handlebars = require("handlebars");
const tplPath = path.join(__dirname, "../templates/dir.tpl");
const tplsource = fs.readFileSync(tplPath, "utf-8");
const template = handlebars.compile(tplsource);

module.exports = async (req, res, filePath) => {
    try {
        const stats = await stat(filePath);
        if (stats.isFile()) {
            res.statusCode = 200;
            res.setHeader("Content-Type", "text/plain");
            fs.createReadStream(filePath).pipe(res);
        } else if (stats.isDirectory()) {
            const files = await readdir(filePath);
            const dir = path.relative(rootUrl, filePath);
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
