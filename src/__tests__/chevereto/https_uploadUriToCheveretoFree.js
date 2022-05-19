require("dotenv").config();
const imgbbUploader = require("../../../lib/cjs");

test("HTTPS: upload uri to chevereto-free", async () => {
  const imageUrl = "https://placekitten.com/g/800/600";
  expect(
    await imgbbUploader({
      apiKey: process.env.CHEVERETO_HTTPS_API_KEY,
      cheveretoHost: process.env.CHEVERETO_HTTPS_HOST,
      imageUrl,
    }).then((res) => Boolean(res.image.url)),
  ).toBe(true);
});
