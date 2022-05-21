require("dotenv").config();
const imgbbUploader = require("../../../lib/cjs");
const { fakeWaifu } = require("../utils");

test("passing invalid API key should throw explicit error", async () => {
  const base64waifu = await fakeWaifu("base64string");
  return await imgbbUploader({
    base64string: base64waifu,
    apiKey: "not-an-apikey-but-stringlength32",
  })
    .then(() => fail())
    .catch((e) => expect(String(e).includes("Faulty payload")).toBe(false));
});

test("passing no API key should throw explicit error", async () => {
  const base64waifu = await fakeWaifu("base64string");
  return await imgbbUploader({
    base64string: base64waifu,
  })
    .then(() => fail())
    .catch((e) => expect(String(e).includes("Faulty payload")).toBe(false));
});
