require("dotenv").config();
const imgbbUploader = require("../../../lib/cjs");

test("passing an url should be feasible", async () => {
  const imageUrl = "https://picsum.photos/400";
  expect(
    await imgbbUploader({
      apiKey: process.env.API_KEY,
      imageUrl,
    }).then((res) => Boolean(res.image.url)),
  ).toBe(true);
});
