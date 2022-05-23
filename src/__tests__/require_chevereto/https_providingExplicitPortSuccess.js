require("dotenv").config();
const imgbbUploader = require("../../../lib/cjs");
const { fakeWaifu } = require("../utils");

test("HTTPS: providing 'cheveretoPort' parameter while server is listening on that port", async () => {
  const waifu = await fakeWaifu("base64string");
  expect(
    await imgbbUploader({
      apiKey: process.env.CHEVERETO_HTTPS_API_KEY,
      cheveretoHost: `${process.env.CHEVERETO_HTTPS_HOST}:443`,
      base64string: waifu,
    }).then((res) => Boolean(res.image.url)),
  ).toBe(true);
});
