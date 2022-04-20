require("dotenv").config();
const imgbbUploader = require("../../../lib/cjs");
const { fakeWaifu } = require("../utils");

test("upload base64 string to chevereto-free", async () => {
  const waifu = await fakeWaifu("base64string");
  console.log(
    "Number(process.env.CHEVEROTO_PORT) in test ",
    Number(process.env.CHEVEROTO_PORT),
  );
  expect(
    await imgbbUploader({
      apiKey: process.env.CHEVERETO_API_KEY,
      cheveretoHost: process.env.CHEVERETO_HOST,
      cheveretoPort: Number(process.env.CHEVEROTO_PORT),
      cheveretoHttps: process.env.CHEVERETO_HTTPS ? true : false,
      base64string: waifu,
    }).then((res) => Boolean(res.image.display_url)),
  ).toBe(true);
});
