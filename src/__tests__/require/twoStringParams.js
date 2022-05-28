require("dotenv").config();
const path = require("path");
const imagePath = require("../images/imagePath.js");
const { fakeWaifu } = require("../utils");
const imgbbUploader = require("../../../lib/cjs");

test("passing two strings as params", async () => {
  const filename = await fakeWaifu();
  expect(
    await imgbbUploader(process.env.API_KEY, path.join(imagePath, `${filename}.png`)).then((res) =>
      Boolean(res.image.url),
    ),
  ).toBe(true);
});
