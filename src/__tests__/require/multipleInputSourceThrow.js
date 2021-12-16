require("dotenv").config();
const path = require("path");
const imagePath = require("../images/imagePath");
const imgbbUploader = require("../../../lib/cjs");
const { fakeWaifu } = require("../utils");

test("passing multiple valid input sources (i.e imagePath + imageUrl) should throw", async () => {
  const filename = await fakeWaifu();
  const imageUrl = "https://picsum.photos/400";
  expect(
    await imgbbUploader({
      apiKey: process.env.API_KEY,
      imagePath: path.join(imagePath, `${filename}.png`),
      imageUrl,
    })
      .then(() => fail())
      .catch((e) => expect(e).toBeInstanceOf(Error)),
  );
});
