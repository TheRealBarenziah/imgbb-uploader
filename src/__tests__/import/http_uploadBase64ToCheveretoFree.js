import "dotenv/config";
import imgbbUploader from "../../../lib/cjs";
import { fakeWaifu } from "../utils";

test("ESM: HTTP: upload base64 string to chevereto-free", async () => {
  const waifu = await fakeWaifu("base64string");
  expect(
    await imgbbUploader({
      apiKey: process.env.CHEVERETO_HTTP_API_KEY,
      cheveretoHost: process.env.CHEVERETO_HTTP_HOST,
      base64string: waifu,
    }).then((res) => Boolean(res.image.url)),
  ).toBe(true);
});
