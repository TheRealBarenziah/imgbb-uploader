require("dotenv").config();
const imgbbUploader = require("../../../lib/cjs");
const { fakeWaifu } = require("../utils");

test("upload base64 string to chevereto-free", async () => {
  const waifu = await fakeWaifu("base64string");
  expect(
    await imgbbUploader({
      apiKey: process.env.CHEVERETO_HTTP_API_KEY,
      cheveretoHost: process.env.CHEVERETO_HTTP_HOST,
      // cheveretoPort: Number(process.env.CHEVERETO_PORT),
      // cheveretoHttps: process.env.CHEVERETO_HTTPS ? true : false,
      base64string: waifu,
    }).then((res) => Boolean(res.image.display_url)),
  ).toBe(true);
});
