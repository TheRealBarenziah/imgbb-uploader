import "dotenv/config";
import imgbbUploader from "../../../lib/cjs";
import { randomImageUrl } from "../utils";

test("ESM: HTTP: upload uri to chevereto-free", async () => {
  const imageUrl = await randomImageUrl();
  expect(
    await imgbbUploader({
      apiKey: process.env.CHEVERETO_HTTP_API_KEY,
      cheveretoHost: process.env.CHEVERETO_HTTP_HOST,
      imageUrl,
    }).then((res) => Boolean(res.image.url)),
  ).toBe(true);
});
