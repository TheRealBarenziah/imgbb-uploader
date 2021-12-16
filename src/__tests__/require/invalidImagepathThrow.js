require("dotenv").config();
const path = require("path");
const imagePath = require("../images/imagePath");
const imgbbUploader = require("../../../lib/cjs");
const tfaker = require("tfaker");

test("invalid 'imagePath' in default object should throw", async () => {
  const valarDohaeris = tfaker.firstName();
  const randomFilename = valarDohaeris + Date.now();
  return await imgbbUploader({
    explosionPath: path.join(imagePath, `${randomFilename}.png`),
    apiKey: process.env.API_KEY,
  })
    .then(() => fail())
    .catch((e) => expect(e).toBeInstanceOf(Error));
});
