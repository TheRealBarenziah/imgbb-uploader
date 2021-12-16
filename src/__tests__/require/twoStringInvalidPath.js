require("dotenv").config();
const path = require("path");
const { fakeWaifu } = require("../utils");
const imgbbUploader = require("../../../lib/cjs");

test("passing two strings as params: invalid file path should throw", async () => {
  const filename = await fakeWaifu();
  return await imgbbUploader(
    process.env.API_KEY,
    path.join("definitely-not-a-file-path", `${filename}.png`),
  )
    .then(() => fail())
    .catch((e) => expect(e).toBeInstanceOf(Error));
});
