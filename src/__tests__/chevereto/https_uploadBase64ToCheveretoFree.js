require("dotenv").config();
const imgbbUploader = require("../../../lib/cjs");
const { fakeWaifu } = require("../utils");

test("HTTPS: upload base64 string to chevereto-free", async () => {
  const waifu = await fakeWaifu("base64string");
  expect(
    await imgbbUploader({
      apiKey: process.env.CHEVERETO_HTTPS_API_KEY,
      cheveretoHost: process.env.CHEVERETO_HTTPS_HOST,
      base64string: waifu,
    }).then((res) => Boolean(res.image.url)),
  ).toBe(true);
});
