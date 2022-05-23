require("dotenv").config();
const imgbbUploader = require("../../../lib/cjs");
const { fakeWaifu } = require("../utils");

test("HTTPS: providing 'cheveretoPort' parameter while server isn't listening on that port should throw gracefully", async () => {
  const waifu = await fakeWaifu("base64string");
  return await imgbbUploader({
    apiKey: process.env.CHEVERETO_HTTPS_API_KEY,
    cheveretoHost: `${process.env.CHEVERETO_HTTPS_HOST}:8443`,
    base64string: waifu,
  })
    .then((res) => fail(res))
    .catch((e) => expect(e).toBeInstanceOf(Error));
});
