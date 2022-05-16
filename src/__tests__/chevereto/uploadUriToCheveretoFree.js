require("dotenv").config();
const imgbbUploader = require("../../../lib/cjs");

test("upload uri to chevereto-free", async () => {
  const imageUrl = "https://picsum.photos/400";
  expect(
    await imgbbUploader({
      apiKey: process.env.CHEVERETO_HTTP_API_KEY,
      cheveretoHost: process.env.CHEVERETO_HTTP_HOST,
      // cheveretoPort: Number(process.env.CHEVERETO_PORT),
      // cheveretoHttps: process.env.CHEVERETO_HTTPS ? true : false,
      imageUrl,
    }).then((res) => Boolean(res.image.display_url)),
  ).toBe(true);
});
