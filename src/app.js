const yargs = require("yargs");
const Server = require("./index");

const argv = yargs
  .usage("anydoor [options]")
  .option("p", {
    alias: "port",
    describe: "Server Port",
    default: 9090
  })
  .option("h", {
    alias: "hostname",
    describe: "Server Host",
    default: "127.0.0.1"
  })
  .option("d", {
    alias: "rootUrl",
    describe: "Server Root Dir",
    default: process.cwd()
  })
  .version()
  .alias("v", "version")
  .help().argv;

const server = new Server(argv);
server.start();
