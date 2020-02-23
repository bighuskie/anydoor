const http = require("http");
const config = require("./config/defalutConfig");
const chalk = require("chalk");

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("node.js");
});

server.listen(config.port, config.hostname, () => {
    const address = `http://${config.hostname}:${config.port}/`;
    console.info(`Server running at ${chalk.green(address)}`);
});
