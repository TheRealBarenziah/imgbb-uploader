const fs = require("fs");
const path = require("path");
const rimraf = require("rimraf");

const rebuild = () => {
  if (fs.existsSync(path.join(__dirname, "lib"))) {
    // if './lib' exists..
    rimraf.sync(path.join(__dirname, "lib")); // .. delete it
  }
  return null; // *Headpat V8*
};

rebuild();
