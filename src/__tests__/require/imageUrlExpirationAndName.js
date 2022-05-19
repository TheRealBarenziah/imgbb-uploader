require("dotenv").config();
const imgbbUploader = require("../../../lib/cjs");
const tfaker = require("tfaker");

test("passing an imageUrl, expiration & name", async () => {
  const imageUrl = "https://picsum.photos/400";
  const valarDohaeris = tfaker.firstName();
  const randomExpirationValue = Math.floor(Math.random() * 300) + 120;
  expect(
    await imgbbUploader({
      imageUrl,
      apiKey: process.env.API_KEY,
      name: valarDohaeris,
      expiration: randomExpirationValue,
    }).then((res) => Object({ name: res.image.name, expiration: Number(res.expiration) })),
  ).toStrictEqual({
    name: valarDohaeris,
    expiration: randomExpirationValue,
  });
});
