require("dotenv").config();
const imgbbUploader = require("../../../lib/cjs");
const { fakeWaifu } = require("../utils");

test("HTTPS: protocol (the 'https://' bit) is implicit & can be omitted", async () => {
  const waifu = await fakeWaifu("base64string");
  const hostWithoutProtocol = String(process.env.CHEVERETO_HTTPS_HOST).split("https://")[1];
  expect(
    await imgbbUploader({
      apiKey: process.env.CHEVERETO_HTTPS_API_KEY,
      cheveretoHost: hostWithoutProtocol,
      base64string: waifu,
    }).then((res) => Boolean(res.image.url)),
  ).toBe(true);
});
