require("dotenv").config();
const imgbbUploader = require("../../../lib/cjs");
const { fakeWaifu } = require("../utils");

test("HTTPS: invalid cheveretoHost should throw properly", async () => {
  const waifu = await fakeWaifu("base64string");
  return await imgbbUploader({
    apiKey: process.env.CHEVERETO_HTTPS_API_KEY,
    cheveretoHost: `${process.env.CHEVERETO_HTTP_HOST.split("http://")[1]}`,
    base64string: waifu,
  })
    .then((res) => fail(res))
    .catch((e) => expect(e).toBeInstanceOf(Error));
});
