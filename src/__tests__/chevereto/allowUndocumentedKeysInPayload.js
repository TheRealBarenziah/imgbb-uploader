require("dotenv").config();
const imgbbUploader = require("../../../lib/cjs");
const { fakeWaifu } = require("../utils");

test("providing additional custom keys shouldn't throw", async () => {
  const waifu = await fakeWaifu("base64string");
  expect(
    await imgbbUploader({
      apiKey: process.env.CHEVERETO_HTTPS_API_KEY,
      cheveretoHost: process.env.CHEVERETO_HTTPS_HOST,
      base64string: waifu,
      nsfw: 1,
      undocumentedFeature: "ERROR_SUCCESS",
    }).then((res) => Boolean(res.image.url)),
  ).toBe(true);
});
