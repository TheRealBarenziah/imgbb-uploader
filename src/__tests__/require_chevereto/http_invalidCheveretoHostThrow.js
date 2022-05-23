require("dotenv").config();
const imgbbUploader = require("../../../lib/cjs");
const { fakeWaifu } = require("../utils");

test("HTTP: invalid cheveretoHost should throw properly", async () => {
  const waifu = await fakeWaifu("base64string");
  return await imgbbUploader({
    apiKey: process.env.CHEVERETO_HTTP_API_KEY,
    cheveretoHost: `definitely-not-${process.env.CHEVERETO_HTTP_HOST}`,
    base64string: waifu,
  })
    .then((res) => fail(res))
    .catch((e) => expect(e).toBeInstanceOf(Error));
});
