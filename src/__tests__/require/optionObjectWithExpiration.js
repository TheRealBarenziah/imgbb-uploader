require("dotenv").config();
const path = require("path");
const imagePath = require("../images/imagePath");
const { fakeWaifu } = require("../utils");
const imgbbUploader = require("../../../lib/cjs");

test("passing an option object with expiration as 3rd param", async () => {
  const filename = await fakeWaifu();
  const randomExpirationValue = Math.floor(Math.random() * 300) + 120;
  expect(
    await imgbbUploader({
      imagePath: path.join(imagePath, `${filename}.png`),
      apiKey: process.env.API_KEY,
      expiration: randomExpirationValue,
    }).then((res) => Number(res.expiration)),
  ).toBe(randomExpirationValue);
});
