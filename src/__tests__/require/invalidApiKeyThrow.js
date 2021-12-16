require("dotenv").config();
const path = require("path");
const imagePath = require("../images/imagePath");
const imgbbUploader = require("../../../lib/cjs");
const { fakeWaifu } = require("../utils");

test("invalid 'apiKey' param in default object should throw", async () => {
  const filename = await fakeWaifu();
  return await imgbbUploader({
    path: path.join(imagePath, `${filename}.png`),
    naniKey: process.env.API_KEY,
  })
    .then(() => fail())
    .catch((e) => expect(e).toBeInstanceOf(Error));
});
