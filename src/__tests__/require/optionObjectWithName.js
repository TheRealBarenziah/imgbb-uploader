require("dotenv").config();
const path = require("path");
const imagePath = require("../images/imagePath.js");
const { fakeWaifu } = require("../utils");
const tfaker = require("tfaker");
const imgbbUploader = require("../../../lib/cjs");

test("passing an option object with name as 3rd param", async () => {
  const filename = await fakeWaifu();
  const valarDohaeris = tfaker.firstName();
  expect(
    await imgbbUploader({
      imagePath: path.join(imagePath, `${filename}.png`),
      apiKey: process.env.API_KEY,
      name: valarDohaeris,
    }).then((res) => res.image.name),
  ).toBe(valarDohaeris);
});
