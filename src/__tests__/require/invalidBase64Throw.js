require("dotenv").config();
const imgbbUploader = require("../../../lib/cjs");
const { fakeWaifu } = require("../utils");

test("passing invalid base64 string should throw", async () => {
  const base64waifu = await fakeWaifu("base64string");
  return await imgbbUploader({
    base64string: `uwu!${base64waifu}owo!`,
    apiKey: process.env.API_KEY,
  })
    .then(() => fail())
    .catch((e) => expect(e).toBeInstanceOf(Error));
});
