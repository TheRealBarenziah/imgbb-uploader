require("dotenv").config();
const path = require("path");
const imgbbUploader = require("../../../lib/cjs");
const imagePath = require("../images/imagePath");
const { fakeWaifu } = require("../utils");

test("upload file to chevereto-free", async () => {
  const filename = await fakeWaifu();
  expect(
    await imgbbUploader({
      apiKey: process.env.CHEVERETO_API_KEY,
      cheveretoHost: process.env.CHEVERETO_HOST,
      cheveretoPort: Number(process.env.CHEVEROTO_PORT),
      cheveretoHttps: process.env.CHEVERETO_HTTPS ? true : false,
      imagePath: path.join(imagePath, `${filename}.png`),
    }).then((res) => Boolean(res.image.display_url)),
  ).toBe(true);
});
