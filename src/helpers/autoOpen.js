const { exec } = require("child_process");

module.exports = url => {
  switch (process.platform) {
    case "darwin": //mac平台
      exec(`open ${url}`);
      break;
    case "win32": //window系统
      exec(`start ${url}`);
      break;
    default:
      return;
  }
};
