require("dotenv").config();
const path = require("path");
const imagePath = require("../images/imagePath.js");
const imgbbUploader = require("../../../lib/cjs");
const { fakeWaifu } = require("../utils");
const tfaker = require("tfaker");

test("passing a 'valid enough' option object", async () => {
  const filename = await fakeWaifu();
  const valarDohaeris = tfaker.firstName();
  const randomExpirationValue = Math.floor(Math.random() * 300) + 120;
  expect(
    await imgbbUploader({
      imagePath: path.join(imagePath, `${filename}.png`),
      apiKey: process.env.API_KEY,
      naem: valarDohaeris,
      expuration: randomExpirationValue,
    }).then((res) => Boolean(res.image.url)),
  ).toBe(true);
});
