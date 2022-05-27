const imgbbUploader = require("../../../lib/cjs");
const { fakeWaifu } = require("../utils");
const tfaker = require("tfaker");

test("passing a base64string & name", async () => {
  const base64waifu = await fakeWaifu("base64string");
  const valarDohaeris = tfaker.firstName();
  expect(
    await imgbbUploader({
      base64string: base64waifu,
      apiKey: process.env.API_KEY,
      name: valarDohaeris,
    }).then((res) => res.image.name),
  ).toStrictEqual(valarDohaeris);
});
