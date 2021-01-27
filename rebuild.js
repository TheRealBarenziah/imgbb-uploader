const fs = require("fs");
const path = require("path");
const rimraf = require("rimraf");

const rebuild = () => {
  // if './lib' exists, delete it
  if (fs.existsSync(path.join(__dirname, "lib"))) {
    rimraf.sync(path.join(__dirname, "lib"));
  } // delete randomly generated test images while we're at it
  const imagePath = path.join(__dirname, "src", "__tests__", "images");
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

rebuild();
