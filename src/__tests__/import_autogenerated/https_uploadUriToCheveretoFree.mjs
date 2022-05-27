import "dotenv/config";
import imgbbUploader from "../../../lib/esm";
import { randomImageUrl } from "../utils";

test("ESM: HTTPS: upload uri to chevereto-free", async () => {
  const imageUrl = await randomImageUrl();
  expect(
    await imgbbUploader({
      apiKey: process.env.CHEVERETO_HTTPS_API_KEY,
      cheveretoHost: process.env.CHEVERETO_HTTPS_HOST,
      imageUrl,
    }).then((res) => Boolean(res.image.url)),
  ).toBe(true);
});
