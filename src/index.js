const http = require("http");
const config = require("./config/defalutConfig");
const chalk = require("chalk");
const path = require("path");
const router = require("./helpers/router");

const autoOpen = require("./helpers/autoOpen");

class Server {
  constructor(conf) {
    this.config = Object.assign({}, config, conf);
  }

  start() {
    const { rootUrl, port, hostname } = this.config;
    const server = http.createServer((req, res) => {
      const filePath = path.join(rootUrl, req.url);
      router(req, res, filePath, this.config);
    });

    server.listen(port, hostname, () => {
      const address = `http://${hostname}:${port}/`;
      console.info(`Server running at ${chalk.green(address)}`);
      autoOpen(address);
    });
  }
}

module.exports = Server;
