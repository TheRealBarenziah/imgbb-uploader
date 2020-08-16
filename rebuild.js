const fs = require("fs");
const path = require("path");

const rebuild = () => {
  fs.rmdirSync(path.join(__dirname, "lib"), {"recursive": true}); // delete './lib' folder
  fs.mkdirSync(path.join(__dirname, "lib")); // recreate empty './lib' folder
  return 0;
};

rebuild();