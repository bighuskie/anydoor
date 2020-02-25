const http = require("http");
const { hostname, port, rootUrl } = require("./config/defalutConfig");
const chalk = require("chalk");
const path = require("path");
const router = require("./helpers/router");

const server = http.createServer((req, res) => {
  const filePath = path.join(rootUrl, req.url);
  router(req, res, filePath);
});

server.listen(port, hostname, () => {
  const address = `http://${hostname}:${port}/`;
  console.info(`Server running at ${chalk.green(address)}`);
});
