const fs = require("fs");
const path = require("path");
const rimraf = require("rimraf");

const rebuild = () => {
  // if './lib' exists, delete it
  if (fs.existsSync(path.join(__dirname, "lib"))) {
    rimraf.sync(path.join(__dirname, "lib"));
  }
  return null; // *Headpat V8*
};

rebuild();
