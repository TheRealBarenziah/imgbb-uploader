require("dotenv").config();
const path = require("path");
const imagePath = require("../images/imagePath");
const { fakeWaifu } = require("../utils");
const tfaker = require("tfaker");
const imgbbUploader = require("../../../lib/cjs");

test("passing an option object with name & expiration params", async () => {
  const filename = await fakeWaifu();
  const valarDohaeris = tfaker.firstName();
  const randomExpirationValue = Math.floor(Math.random() * 300) + 120;
  expect(
    await imgbbUploader({
      imagePath: path.join(imagePath, `${filename}.png`),
      apiKey: process.env.API_KEY,
      name: valarDohaeris,
      expiration: randomExpirationValue,
    }).then((res) =>
      Object({
        name: res.image.name,
        expiration: Number(res.expiration),
      }),
    ),
  ).toStrictEqual({
    name: valarDohaeris,
    expiration: randomExpirationValue,
  });
});
