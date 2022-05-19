require("dotenv").config();
const imgbbUploader = require("../../../lib/cjs");
const { fakeWaifu } = require("../utils");

test("invalid cheveretoHost should throw properly", async () => {
  const waifu = await fakeWaifu("base64string");
  return await imgbbUploader({
    apiKey: process.env.CHEVERETO_HTTP_API_KEY,
    cheveretoHost: `definitely-not-${process.env.CHEVERETO_HTTP_HOST}`,
    // cheveretoPort: Number(process.env.CHEVERETO_PORT),
    // cheveretoHttps: process.env.CHEVERETO_HTTPS ? true : false,
    base64string: waifu,
  })
    .then((res) => fail(res))
    .catch((e) => expect(e).toBeInstanceOf(Error));
});
