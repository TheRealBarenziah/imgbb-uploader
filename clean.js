const fs = require("fs");
const path = require("path");
const rimraf = require("rimraf");
const imagePath = require("./src/__tests__/images/imagePath");

const clean = () => {
  // if './lib' or './coverage' exists, delete it
  if (fs.existsSync(path.join(__dirname, "lib"))) {
    rimraf.sync(path.join(__dirname, "lib"));
  }
  if (fs.existsSync(path.join(__dirname, "coverage"))) {
    rimraf.sync(path.join(__dirname, "coverage"));
  }

  // delete randomly generated test images while we're at it
  fs.readdir(imagePath, (err, files) => {
    if (err) console.error(err);
    const filesToDelete = files.filter(
      (filename) => filename !== "imagePath.js",
    );
    filesToDelete.forEach((file) =>
      fs.unlink(path.join(imagePath, file), () => null),
    );
  });
  return null; // *Headpat V8*
};

clean();
