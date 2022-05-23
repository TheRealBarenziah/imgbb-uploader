require("dotenv").config();
const path = require("path");
const imgbbUploader = require("../../../lib/cjs");
const imagePath = require("../images/imagePath");
const { fakeWaifu } = require("../utils");

test("HTTP: upload file to chevereto-free", async () => {
  const filename = await fakeWaifu();
  expect(
    await imgbbUploader({
      apiKey: process.env.CHEVERETO_HTTP_API_KEY,
      cheveretoHost: process.env.CHEVERETO_HTTP_HOST,
      imagePath: path.join(imagePath, `${filename}.png`),
    }).then((res) => Boolean(res.image.url)),
  ).toBe(true);
});
