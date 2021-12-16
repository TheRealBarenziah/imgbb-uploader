require("dotenv").config();
const imgbbUploader = require("../../../lib/cjs");
const { fakeWaifu } = require("../utils");
const tfaker = require("tfaker");

test("passing a base64string, expiration & name", async () => {
  const base64waifu = await fakeWaifu("base64string");
  const valarDohaeris = tfaker.firstName();
  const randomExpirationValue = Math.floor(Math.random() * 300) + 120;
  expect(
    await imgbbUploader({
      base64string: base64waifu,
      apiKey: process.env.API_KEY,
      name: valarDohaeris,
      expiration: randomExpirationValue,
    }).then((res) =>
      Object({ name: res.image.name, expiration: Number(res.expiration) }),
    ),
  ).toStrictEqual({
    name: valarDohaeris,
    expiration: randomExpirationValue,
  });
});
