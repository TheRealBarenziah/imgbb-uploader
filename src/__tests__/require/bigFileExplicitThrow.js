const path = require("path");
const imagePath = require("../images/imagePath");
const imgbbUploader = require("../../../lib/cjs");
const { fakeWaifu } = require("../utils");

jest.setTimeout(300000); // here as a bittersweet reminder of ancient times

test("passing file too big should throw explicit error", async () => {
  const filename = await fakeWaifu("bigFile");
  return await imgbbUploader({
    imagePath: path.join(imagePath, `${filename}.png`),
    apiKey: process.env.API_KEY,
  })
    .then((res) => fail(res))
    .catch((e) => expect(String(e).includes("Faulty payload")).toBe(false));
});
